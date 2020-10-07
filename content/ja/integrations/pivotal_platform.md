---
integration_title: Pivotal Platform
name: pivotal_platform
kind: インテグレーション
git_integration_title: pivotal_platform
newhlevel: true
updated_for_agent: 6
description: Pivotal Platform（元 Cloud Foundry）VMと、それが実行するジョブの健全性を追跡します。
is_public: true
public_title: Datadog-Pivotal Platform インテグレーション
short_description: Pivotal Platform（元 Cloud Foundry）VMと、それが実行するジョブの健全性を追跡します。
categories:
  - プロビジョニング
  - 構成 & デプロイ
  - ログの収集
dependencies:
  - 'https://github.com/DataDog/documentation/blob/master/content/en/integrations/pivotal_platform.md'
aliases:
  - /ja/integrations/cloud_foundry/
doc_link: /ja/integrations/pivotal_platform/
ddtype: check
---
## 概要

任意の Pivotal Platform（元 Cloud Foundry）デプロイから Datadog にメトリクスとイベントを送信できます。そのデータは、デプロイ内のすべてのノードの健全性と可用性の追跡、ノードで実行されているジョブの監視、Loggregator Firehose からのメトリクスの収集などに役立ちます。このページでは、[Pivotal Platform 上のアプリケーション](#monitor-your-applications-on-pivotal-platform)や [Pivotal Platform クラスター](#monitor-your-pivotal-platform-cluster)の監視方法を説明します。

Pivotal Platform と Datadog のインテグレーションは、主に 3 つの要素から構成されます。まず、ビルドパックを使用してアプリケーションからカスタムメトリクスを収集します。次に、BOSH Release を使用してプラットフォームからメトリクスを収集します。最後に、Loggregator Firehose Nozzle を使用してインフラストラクチャーから他のすべてのメトリクスを収集します。

Pivotal Platform の場合は、Ops Manager で Datadog インテグレーションタイルをインストールこともできます。

- [Pivotal Platform のための Datadog クラスター監視][1]
- [Pivotal Platform のための Datadog アプリケーション監視][2]

## PKS

PKS 環境では、Datadog [クラスター監視タイル][1]と [pivotal_pks][3] インテグレーションを一緒に使用してクラスターを監視できます。

kubelet クラスターベースのワークロードの場合、[pivotal_pks インテグレーション][3]を利用して Datadog Agent をワーカーにインストールします。

[クラスター監視タイル][1]を使用して、PKS 環境内の各非ワーカー VM に Datadog Agent をインストールします。PAS がインストールされていない環境では、タイルの `Resource Config` セクションを選択し、`datadog-firehose-nozzle` の `instances` を `0` に設定します。

## Pivotal Platform 上のアプリケーションの監視

Pivotal Platform アプリケーションを監視するには、**Datadog Pivotal Platform Buildpack** を使用します。これは、Pivotal Platform 用の [supply ビルドパック][4]で、アプリを実行するコンテナに [Datadog DogStatsD バイナリ][5]と Datadog Agent をインストールします。

### セットアップ

#### Pivotal Platform < 1.12

このビルドパックは、バージョン `1.12` で導入された Pivotal Platform [マルチビルドパック][6]機能を使用します。

これより前のバージョンの Pivotal Platform には、この機能のバックポートが[ビルドパック][7]として提供されています。Datadog のビルドパックを使用するには、このバックポートをインストールして構成する必要があります。

1. **マルチビルドパックのバックポートをアップロードします。**最新の[マルチビルドパックリリース][7]をダウンロードして、Pivotal Platform 環境にアップロードします。

    ```shell
    cf create-buildpack multi-buildpack ./multi-buildpack-v-x.y.z.zip 99 --enable
    ```

2. **アプリケーションにマルチビルドパックマニフェストを追加します。**[マルチビルドパックバックポートリポジトリ][8]で説明されているように、アプリケーションのルートに `multi-buildpack.yml` ファイルを作成し、環境に合わせて構成します。Datadog Pivotal Platform Buildpack と通常のビルドパックへのリンクを追加します。

    ```yaml
    buildpacks:
      - "https://cloudfoundry.datadoghq.com/datadog-cloudfoundry-buildpack/datadog-cloudfoundry-buildpack-3.1.0.zip"
      - "https://github.com/cloudfoundry/ruby-buildpack#v1.7.18" # Replace this with your regular buildpack
    ```

    Datadog Buildpack の URL は次のとおりです。

      - `https://cloudfoundry.datadoghq.com/datadog-cloudfoundry-buildpack/datadog-cloudfoundry-buildpack-latest.zip`
      - `https://cloudfoundry.datadoghq.com/datadog-cloudfoundry-buildpack/datadog-cloudfoundry-buildpack-x.y.z.zip`

      ここでは `latest` バージョンは使用しないでください (`x.y.z` を特定のバージョンに置き換えます)。

      **重要**: 通常のビルドパックが最終的なビルドパックとして機能するには、マニフェストの最後に置かれる必要があります。ビルドパックの詳細については、[Pivotal Platform のドキュメント][9]を参照してください。

3. **マルチビルドパックでアプリケーションをプッシュします**。`multi-buildpack` が、アプリケーション用に Pivotal Platform によって選択されたビルドパックであることを確認します。

    ```shell
    cf push <YOUR_APP> -b multi-buildpack
    ```

#### Pivotal Platform >= 1.12

1. **Datadog Pivotal Platform Buildpack をアップロードします。**最新の Datadog [ビルドパックリリース][10]をダウンロードして、Pivotal Platform 環境にアップロードします。

    ```shell
    cf create-buildpack datadog-cloudfoundry-buildpack ./datadog-cloudfoundry-buildpack-latest.zip
    ```

2. **Datadog ビルドパックと通常のビルドパックを使用してアプリケーションをプッシュします。**複数のビルドパックを使用してアプリケーションをプッシュするプロセスは、[Pivotal Platform のドキュメント][9]に説明されています。

    ```shell
    cf push <YOUR_APP> --no-start -b binary_buildpack
    cf v3-push <YOUR_APP> -b datadog-cloudfoundry-buildpack -b <YOUR-BUILDPACK-1> -b <YOUR-FINAL-BUILDPACK>
    ```

   **重要**: これまで 1 つのビルドパックを使用していた場合、それが最終的なビルドパックとして機能するには、それを最後にロードする必要があります。ビルドパックの詳細については、[Pivotal Platform のドキュメント][9]を参照してください。

#### Meta-Buildpack **(非推奨)**

[メタビルドパック][11]を使用している場合は、Datadog のビルドパックをそのままデコレータとして使用できます。

**注**: [メタビルドパック][11]は[マルチビルドパック][7]に置き換えられ、Pivotal によって非推奨にされています。Datadog は、将来のリリースでメタビルドパックのサポートを終了する可能性があります。

### コンフィギュレーション

#### メトリクスの収集

**環境内に API キーを設定してビルドパックを有効にします。**

```shell
# 環境変数を設定します
cf set-env <アプリ> DD_API_KEY <DATADOG_API_キー>
# アプリケーションが新しい環境変数を適用してビルドパックを使用するように、アプリケーションを再ステージングします
cf restage <アプリ>
```

#### トレースの収集

Datadog Trace Agent (APM) はデフォルトで有効になっています。特定の言語でのセットアップの詳細については、[APM のセットアップ][12]を参照してください。

#### ログの収集

##### ログ収集の有効化

Pivotal Platform 上のアプリケーションからのログの収集を開始するには、ビルドパックに含まれている Agent をアクティブにし、ログ収集を有効にする必要があります。

```text
cf set-env <アプリ名> RUN_AGENT true
cf set-env <アプリ名> DD_LOGS_ENABLED true
# Agent コアチェックを無効にしてシステムメトリクス収集を無効にします
cf set-env <アプリ名> DD_ENABLE_CHECKS false
# Container Stdout/Stderr をローカルポートにリダイレクトして、Agent がログを収集するようにします
cf set-env <アプリ名> STD_LOG_COLLECTION_PORT <ポート>
# 目的のポートからログを収集するように Agent を構成し、ソースとサービスの値を設定します
cf set-env <アプリ名> LOGS_CONFIG '[{"type":"tcp","port":"<ポート>","source":"<ソース>","service":"<サービス>"}]'
# アプリケーションが新しい環境変数を適用してビルドパックを使用するように、アプリケーションを再ステージングします
cf restage <アプリ名>
```

##### ログ収集の構成

以下のパラメーターを使用して、ログ収集を構成します。

| パラメーター                 | 説明                                                                                                                                |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `STD_LOG_COLLECTION_PORT` | `stdout`/`stderr` からログを収集する場合に使用する必要があります。対応するローカルポート値に `stdout`/`stderr` ストリームをリダイレクトします。 |
| `LOGS_CONFIG`             | このオプションを使用して、ローカル TCP ポートをリスニングするように Agent を構成し、`service` および `source` パラメーターの値を設定します。          |

**例**:

`app01` という名前の Java アプリケーションが Pivotal Platform で実行されています。以下の構成は、コンテナ `stdout`/`stderr` をローカルポート `10514` にリダイレクトします。次に、そのポートからログを収集するように Agent を構成し、`service` と `source` に適切な値を設定します。

```text
# Stdout/Stderr をポート 10514 にリダイレクトします
cf set-env app01 STD_LOG_COLLECTION_PORT 10514
# ポート 10514 をリスニングするように Agent を構成します
cf set-env app01 LOGS_CONFIG '[{"type":"tcp","port":"10514","source":"java","service":"app01"}]'
```

##### プロキシの構成が誤っている場合の通知

Agent v6.12+ では、ビルドパックで[プロキシ構成][13]を使用すると、接続を確立できるかどうかが確認されます。ログ収集は、このテスト結果に応じて開始されます。

接続の確立に失敗してログ収集が開始されなかった場合は、Datadog イベントストリームに以下のようなイベントが送信されます。これらのイベントを追跡して、構成を誤ったビルドパックがデプロイされたときに通知されるようにモニターをセットアップしてください。

{{< img src="integrations/cloud_foundry/logs_misconfigured_proxy.png" alt="cloud-foundry-log-misconfigured_proxy"  >}}

### ビルド

このビルドパックをビルドするには、関連ファイルを編集し、`./build` スクリプトを実行します。これをアップロードするには、`./upload` を実行します。

### DogStatsD

詳細については、[DogStatsD に関するドキュメント][5]を参照してください。幅広いアプリケーションと互換性がある [DogStatsD ライブラリがリスト][14]されています。

## Pivotal Platform クラスターの監視

Datadog とのインテグレーションには 2 つのポイントがあり、それぞれ異なる目標を実現します。

- **Datadog Agent BOSH リリース** - Datadog Agent をデプロイのすべてのノードにインストールし、システム、ネットワーク、ディスクのメトリクスを追跡します。その他の Agent チェックを任意に有効にします。
- **Datadog Firehose Nozzle** - 1 つ以上の Datadog Firehose Nozzle ジョブをデプロイします。これらのジョブはデプロイの Loggregator Firehose を活用し、すべての非コンテナメトリクスを Datadog に送信します。

<div class="alert alert-warning">
これらのインテグレーションは Pivotal Platform デプロイ管理者向けです。エンドユーザー向けではありません。
</div>

### 前提条件

動作する Cloud Foundry デプロイと、それを管理する BOSH Director へのアクセス権を持つ必要があります。また、各インテグレーションをデプロイするために BOSH CLI が必要です。メジャーバージョン CLI-[v1][15] または [v2][16] のいずれかを使用できます。

### Datadog Agent BOSH リリースのインストール

Datadog は、BOSH リリースとしてパッケージ化された Datadog Agent のタールボールを提供します。最新リリースを BOSH Director にアップロードしてから、デプロイのすべてのノードに[アドオン][17]としてインストールします (Director が BOSH Agent をすべてのノードにデプロイする方法と同じ)。

#### Datadog のリリースを BOSH Director にアップロード

```text
# BOSH CLI v1
bosh upload release https://cloudfoundry.datadoghq.com/datadog-agent/datadog-agent-boshrelease-latest.tgz

# BOSH CLI v2
bosh upload-release -e <BOSH_環境> https://cloudfoundry.datadoghq.com/datadog-agent/datadog-agent-boshrelease-latest.tgz
```

独自のリリースを作成する場合は、[Datadog Agent BOSH リリースリポジトリ][18]を参照してください。

#### BOSH Director で Agent をアドオンとして構成

BOSH Director のランタイム構成ファイル (例: `runtime.yml`) に以下を追加します。

```text
---
releases:
  - name: datadog-agent
    version: <アップロードしたバージョン> # 実際のバージョン ('latest' ではなく x.y.z) を指定します

addons:
- name: datadog
  jobs:
  - name: dd-agent
    release: datadog-agent
  properties:
    dd:
      use_dogstatsd: true
      dogstatsd_port: 18125       # 多くの CF デプロイでは既にポート 8125 が StatsD です
      api_key: <DATADOG_API_キー>
      tags: ["<キー:値>"]       # 任意のタグ
      generate_processes: true    # プロセスチェックを有効にするため
```

以前にアップロードした `datadog-agent` のバージョンを確認するには、`bosh releases` を実行します。

#### runtime.yml のロード

以前に構成された `runtime-config` があるかをチェックするには、以下を実行します。

```text
# BOSH CLI v1
`bosh runtime-config`

# BOSH CLI v2
bosh -e <BOSH_環境> runtime-config
```

Bosh v2 では、`runtime.yml` ファイルが空の場合は、`No runtime config` という応答が表示されます。

#### 追加の Agent チェックの有効化

次の例のように、デプロイ全体で有効にする追加の Agent チェックごとに、`properties.dd.integrations` キーの下にその構成を追加します。

```yaml
properties:
    dd:
        integrations:
            directory:
                init_config: {}
                instances:
                    directory: '.'
            #process:
            #  init_config: {}
            #...
```

各チェック名の下の構成は、Agent の conf.d ディレクトリにある独自ファイルでチェックを構成する場合と同様になります。

`runtime.yml` 内で行った構成は、すべてのノードに適用されます。デプロイ内のノードの一部に対してチェックを構成することはできません。

デフォルトのチェック (システム、ネットワーク、ディスク、ntp) の構成をカスタマイズするには、Datadog Agent BOSH リリースの[すべての構成オプション][19]を参照してください。

#### ランタイム構成と Director の同期

```text
# BOSH CLI v1
bosh update runtime-config runtime.yml

# BOSH CLI v2
bosh update-runtime-config -e <BOSH_環境> runtime.yml
```

#### Pivotal Platform デプロイの再デプロイ

```text
# BOSH CLI v1
bosh deployment <デプロイマニフェスト>.yml
bosh -n deploy --recreate

# BOSH CLI v2
bosh -n -d <デプロイ> -e <BOSH_環境> deploy --recreate <デプロイマニフェスト>.yml
```

ランタイム構成はグローバルに適用されるため、BOSH は、デプロイ内のすべてのノードを再デプロイします。デプロイが複数ある場合は、すべてのデプロイを再デプロイすることで、すべての場所に Datadog Agent がインストールされます。

#### すべての場所に Agent がインストールされたかどうかの確認

Agent のインストールが正常に行われたかをチェックするには、Datadog の[ホストマップページ][20]で `cloudfoundry` による絞り込みを行います。Agent BOSH リリースは、各ホストに汎用の `cloudfoundry` タグを付けます。次のスクリーンショットに示すように、オプションで `bosh_job` などのタグを使用してホストをグループ化してください。

{{< img src="integrations/cloud_foundry/cloud-foundry-host-map.png" alt="cloud-foundry-host-map"  >}}

いずれかのホストをクリックしてズームインし、六角形の中の **system** をクリックして、Datadog がメトリクスを受信していることを確認します。

{{< img src="integrations/cloud_foundry/cloud-foundry-host-map-detail.png" alt="cloud-foundry-host-map-detail"  >}}

### Datadog Firehose Nozzle のデプロイ

Datadog は Datadog Firehose Nozzle の BOSH リリースを提供します。このリリースを Director にアップロードしたら、既存のデプロイに Nozzle を追加するか、Nozzle のみを含む新しいデプロイを作成します。以下の手順は、Loggregator Firehose が動作している既存の Pivotal Platform デプロイにリリースを追加する例です。

#### Datadog のリリースを BOSH Director にアップロード

```text
# BOSH CLI v1
bosh upload release http://cloudfoundry.datadoghq.com/datadog-firehose-nozzle/datadog-firehose-nozzle-release-latest.tgz

# BOSH CLI v2
bosh upload-release -e <BOSH_環境> http://cloudfoundry.datadoghq.com/datadog-firehose-nozzle/datadog-firehose-nozzle-release-latest.tgz
```

独自のリリースを作成する場合は、[Datadog Firehose Nozzle リリースリポジトリ][21]を参照してください。

#### UAA クライアントの構成

UAA 構成を含むマニフェストで、Datadog Nozzle のための新しいクライアントを追加し、ジョブが Firehose にアクセスできるようにします。

```yaml
uaa:
    clients:
        datadog-firehose-nozzle:
            access-token-validity: 1209600
            authorities: doppler.firehose,cloud_controller.admin_read_only
            authorized-grant-types: client_credentials
            override: true
            scope: doppler.firehose,cloud_controller.admin_read_only
            secret: <シークレット>
```

デプロイを再デプロイしてユーザーを追加します。

#### Nozzle ジョブの追加

メイン Pivotal Platform デプロイのマニフェスト (例: cf-manifest.yml) で、1 つ以上の Nozzle ジョブを構成します。

```yaml
jobs:
#- instances: 4
#  name: 他のジョブ
#  ...
# 1 つのジョブが Firehose に対応できない場合は、インスタンスを追加します
- instances: 1
  name: datadog_nozzle_z1
  networks:
    # マニフェストの他の場所で構成したネットワーク
    - name: cf1
  # マニフェストの他の場所で構成した resource_pool
  resource_pool: small_z1
  templates:
    - name: datadog-firehose-nozzle
      release: datadog-firehose-nozzle
  properties:
    datadog:
      api_key: "<DATADOG_API_キー>"
      api_url: https://api.datadoghq.com/api/v1/series
      # Datadog へのフラッシュ間の秒数。デフォルトは 15 です。
      flush_duration_seconds: 15
    loggregator:
      # URL に '/firehose' や末尾のスラッシュを追加しないでください。'ws://<ホスト>:<ポート>' は機能します
      # 例: ws://traffic-controller.your-cf-domain.com:8081
      traffic_controller_url: "<LOGGREGATOR_URL>"
    nozzle:
      # 各 Firehose メトリクスに 'deployment:<デプロイ名>' のタグを付けます
      deployment: "<デプロイ名>"
      # 何でもかまいません（Firehose は同じ subscription_id を使用するすべてのジョブにデータを均等にストリーミングします）
      subscription_id: datadog-nozzle
      # 開発専用
      # disable_access_control: true
      # 開発専用。UAA が検証可能な証明書を使用しない場合は有効にします
      # insecure_ssl_skip_verify: true
    uaa:
      client: datadog-firehose-nozzle # 構成したクライアント名
      client_secret: "<構成したシークレット>"
      url: <UAA_URL> # 例: https://uaa.your-cf-domain.com:8443
```

使用できるすべての構成オプションについては、[Datadog Firehose Nozzle リポジトリ][22]を参照してください。

同じマニフェストに、Datadog Nozzle リリース名とバージョンを追加します。

```yaml
releases:
    # - name: "<他のリリース>"
    #   version: <x.y.z>
    # ...
    - name: datadog-firehose-nozzle
      version: '<アップロードしたバージョン>' # 実際のバージョン ('latest' ではなく x.y.z) を指定します
```

以前にアップロードした `datadog-firehose-nozzle` のバージョンを確認するには、`bosh releases` を実行します。

#### デプロイの再デプロイ

```text
# BOSH CLI v1
bosh deployment cf-manifest.yml
bosh -n deploy --recreate

# BOSH CLI v2
bosh -n -d cf-manifest -e <BOSH_環境> deploy --recreate cf-manifest.yml
```

#### Nozzle が収集していることの確認

Datadog の[メトリクスエクスプローラー][23]ページで、`cloudfoundry.nozzle` で始まるメトリクスを検索します。

{{< img src="integrations/cloud_foundry/cloud-foundry-nozzle-metrics.png" alt="cloudfoundry.nozzle.metrics"  >}}

## 収集データ

### メトリクス

次のメトリクスが Datadog Firehose Nozzle (`cloudfoundry.nozzle`) によって送信されます。Datadog Agent リリースは、特殊な独自メトリクスを送信しません。Director ランタイム構成で構成した Agent チェックから通常のメトリクスだけ (およびデフォルトで[システム][24]、[ネットワーク][25]、[ディスク][26]、[NTP][27] の各メトリクス) が送信されます。

Datadog Firehose Nozzle は、CounterEvent (イベントではなくメトリクスとして)、ValueMetrics、および ContainerMetrics のみを収集します。ログメッセージとエラーは無視されます。

メトリクスのリストは、PCF のバージョンおよびデプロイにより異なります。Datadog では、collects counter and gauge metrics emitted from the [Loggregator v2 API][28] から送信されるカウンターおよびゲージのメトリクスを収集します。デフォルトで送信されるメトリクスの一覧は、[PCF ドキュメント][29]を参照してください。

{{< get-metrics-from-git "cloud_foundry" >}}

[1]: https://network.pivotal.io/products/datadog
[2]: https://network.pivotal.io/products/datadog-application-monitoring
[3]: /ja/integrations/pivotal_pks/
[4]: https://docs.cloudfoundry.org/buildpacks/understand-buildpacks.html#supply-script
[5]: /ja/developers/metrics/dogstatsd_metrics_submission/
[6]: https://docs.cloudfoundry.org/buildpacks/use-multiple-buildpacks.html
[7]: https://github.com/cloudfoundry/multi-buildpack
[8]: https://github.com/cloudfoundry/multi-buildpack#usage
[9]: https://docs.cloudfoundry.org/buildpacks/understand-buildpacks.html
[10]: https://cloudfoundry.datadoghq.com/datadog-cloudfoundry-buildpack/datadog-cloudfoundry-buildpack-latest.zip
[11]: https://github.com/cf-platform-eng/meta-buildpack
[12]: /ja/tracing/setup/
[13]: /ja/agent/logs/proxy/
[14]: /ja/libraries/
[15]: https://bosh.io/docs/bosh-cli.html
[16]: https://bosh.io/docs/cli-v2.html#install
[17]: https://bosh.io/docs/runtime-config.html#addons
[18]: https://github.com/DataDog/datadog-agent-boshrelease
[19]: https://github.com/DataDog/datadog-agent-boshrelease/blob/master/jobs/dd-agent/spec
[20]: https://app.datadoghq.com/graphing/infrastructure/hostmap
[21]: https://github.com/DataDog/datadog-firehose-nozzle-release
[22]: https://github.com/DataDog/datadog-firehose-nozzle-release/blob/master/jobs/datadog-firehose-nozzle/spec
[23]: https://app.datadoghq.com/metric/explorer
[24]: /ja/integrations/system/#metrics
[25]: /ja/integrations/network/#metrics
[26]: /ja/integrations/disk/#metrics
[27]: /ja/integrations/ntp/#metrics
[28]: https://github.com/cloudfoundry/loggregator-api
[29]: https://docs.cloudfoundry.org/running/all_metrics.html