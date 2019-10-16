---
integration_title: Cloud Foundry
name: cloudfoundry
kind: インテグレーション
git_integration_title: cloud_foundry
newhlevel: true
updated_for_agent: 6
description: Cloud Foundry VM と、それが実行するジョブの健全性を追跡
is_public: true
public_title: Datadog-Cloud Foundry インテグレーション
short_description: Cloud Foundry VM と、それが実行するジョブの健全性を追跡
categories:
  - provisioning
  - configuration & deployment
  - log collection
doc_link: /integrations/cloud_foundry/
ddtype: check
---
## 概要

任意の Cloud Foundry デプロイから Datadog にメトリクスとイベントを送信できます。そのデータは、デプロイ内のすべてのノードの健全性と可用性の追跡、ノードで実行されているジョブの監視、Loggregator Firehose からのメトリクスの収集などに役立ちます。このページでは、[Cloud Foundry 上のアプリケーション](#monitor-your-applications-on-cloud-foundry)や [Cloud Foundry クラスター](#monitor-your-cloud-foundry-cluster)の監視方法を説明します。

Cloud Foundry と Datadog のインテグレーションは、主に 3 つの要素から構成されます。まず、Buildback を使用してアプリケーションからカスタムメトリクスを収集します。次に、BOSH Release を使用してプラットフォームからメトリクスを収集します。最後に、Loggregator Firehose Nozzle を使用してインフラストラクチャーから他のすべてのメトリクスを収集します。

Pivotal Cloud Foundry の場合は、Ops Manager で Datadog インテグレーションタイルをインストールこともできます。

* [PCF のための Datadog クラスター監視][1]
* [PCF のための Datadog アプリケーション監視][2]

## Cloud Foundry 上のアプリケーションの監視

Cloud Foundry アプリケーションを監視するには、**Datadog Cloud Foundry Buildpack** を使用します。これは、Cloud Foundry 用の [supply ビルドパック][3]で、アプリを実行するコンテナに [Datadog DogStatsD バイナリ][4]と Datadog Agent をインストールします。

### セットアップ

#### Cloud Foundry <1.12

このビルドパックは、バージョン `1.12` で導入された Cloud Foundry [マルチビルドパック][5]機能を使用します。

これより前のバージョンの Cloud Foundry には、この機能のバックポートが[ビルドパック][6]として提供されています。Datadog のビルドパックを使用するには、このバックポートをインストールして構成する必要があります。

1. **マルチビルドパックのバックポートをアップロードします。**
  最新の[マルチビルドパックリリース][6]をダウンロードして、Cloud Foundry 環境にアップロードします。

    ```shell
    cf create-buildpack multi-buildpack ./multi-buildpack-v-x.y.z.zip 99 --enable
    ```

2. **アプリケーションにマルチビルドパックマニフェストを追加します。**
  [multi-buildpack back-port リポジトリ][7]で詳述されているように、`multi-buildpack.yml` ファイルをアプリケーションのルートに作成し、環境に合わせて構成します。Datadog Cloud Foundry Buildpack と通常のビルドパックへのリンクを追加します。

      ```yaml
      buildpacks:
        - "https://cloudfoundry.datadoghq.com/datadog-cloudfoundry-buildpack/datadog-cloudfoundry-buildpack-3.1.0.zip"
        - "https://github.com/cloudfoundry/ruby-buildpack#v1.7.18" # Replace this with your regular buildpack
      ```

    Datadog Buildpack の URL は次のとおりです。

    - `https://cloudfoundry.datadoghq.com/datadog-cloudfoundry-buildpack/datadog-cloudfoundry-buildpack-latest.zip`
    - `https://cloudfoundry.datadoghq.com/datadog-cloudfoundry-buildpack/datadog-cloudfoundry-buildpack-x.y.z.zip`

    ここでは `latest` バージョンは使用しないでください (`x.y.z` を特定のバージョンに置き換えます)。

    **重要**: 通常のビルドパックが最終的なビルドパックとして機能するには、マニフェストの最後に置かれる必要があります。ビルドパックの詳細については、[Cloud Foundry のドキュメント][8]を参照してください。

3. **マルチビルドパックを使用してアプリケーションをプッシュします。**
  このアプリケーションで `multi-buildpack` がビルドパックとして選択されるようにします。

    ```shell
    cf push <YOUR_APP> -b multi-buildpack
    ```

#### Cloud Foundry >=  1.12

1. **Datadog Cloud Foundry Buildpack をアップロードします。**
  最新の Datadog [ビルドパックリリース][9]をダウンロードして、Cloud Foundry 環境にアップロードします。

    ```shell
    cf create-buildpack datadog-cloudfoundry-buildpack ./datadog-cloudfoundry-buildpack-latest.zip
    ```

2. **Datadog ビルドパックと通常のビルドパックを使用してアプリケーションをプッシュします。**
  複数のビルドパックを使用してアプリケーションをプッシュするプロセスは、[Cloud Foundry のドキュメント][8]に説明されています。

    ```shell
    cf push <YOUR_APP> --no-start -b binary_buildpack
    cf v3-push <YOUR_APP> -b datadog-cloudfoundry-buildpack -b <YOUR-BUILDPACK-1> -b <YOUR-FINAL-BUILDPACK>
    ```

  **重要**: これまで 1 つのビルドパックを使用していた場合、それが最終的なビルドパックとして機能するには、それを最後にロードする必要があります。ビルドパックの詳細については、[Cloud Foundry のドキュメント][8]を参照してください。

#### Meta-Buildpack **(非推奨)**

[メタビルドパック][10]を使用している場合は、Datadog のビルドパックをそのままデコレータとして使用できます。

**注**: [メタビルドパック][10]は[マルチビルドパック][6]に置き換えられ、Pivotal によって非推奨にされています。Datadog は、将来のリリースでメタビルドパックのサポートを終了する可能性があります。

### コンフィグレーション

#### メトリクスの収集

**環境内に API キーを設定してビルドパックを有効にします。**

```shell
# 環境変数を設定します
cf set-env <YOUR_APP> DD_API_KEY <DD_API_KEY>
# アプリケーションが新しい環境変数を適用してビルドパックを使用するように、アプリケーションを再ステージングします
cf restage <YOUR_APP>
```

#### トレースの収集

Datadog Trace Agent (APM) はデフォルトで有効になっています。特定の言語でのセットアップの詳細については、[APM のセットアップ][11]を参照してください。

####         - containerPort: 8126
          hostPort: 8126
          name: traceport
          protocol: TCP

##### ログ収集の有効化

Cloud Foundry 上のアプリケーションからのログの収集を開始するには、ビルドパックに含まれている Agent をアクティブにし、ログ収集を有効にする必要があります。

```
cf set-env <YOUR_APP_NAME> RUN_AGENT true
cf set-env <YOUR_APP_NAME> DD_LOGS_ENABLED true
# Agent コアチェックを無効にしてシステムメトリクス収集を無効にします
cf set-env <YOUR_APP_NAME> DD_ENABLE_CHECKS false
# Container Stdout/Stderr をローカルポートにリダイレクトして、Agent がログを収集するようにします
cf set-env <YOUR_APP_NAME> STD_LOG_COLLECTION_PORT <PORT>
# 目的のポートからログを収集するように Agent を構成し、ソースとサービスの値を設定します
cf set-env <YOUR_APP_NAME> LOGS_CONFIG '[{"type":"tcp","port":"<PORT>","source":"<SOURCE>","service":"<SERVICE>"}]'
# アプリケーションが新しい環境変数を適用してビルドパックを使用するように、アプリケーションを再ステージングします
cf restage <YOUR_APP_NAME>
```

##### ログ収集の構成

以下のパラメーターを使用して、ログ収集を構成します。

| パラメーター                 | 説明                                                                                                                                |
|---------------------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| `STD_LOG_COLLECTION_PORT` | `stdout`/`stderr` からログを収集する場合に使用する必要があります。対応するローカルポート値に `stdout`/`stderr` ストリームをリダイレクトします。 |
| `LOGS_CONFIG`             | このオプションを使用して、ローカル TCP ポートをリスニングするように Agent を構成し、`service` および `source` パラメーターの値を設定します。          |

**例**:

`app01` という名前の Java アプリケーションが Cloud Foundry で実行されています。以下の構成は、コンテナ `stdout`/`stderr` をローカルポート `10514` にリダイレクトします。次に、そのポートからログを収集するように Agent を構成し、`service` と `source` に適切な値を設定します。

```
# Stdout/Stderr をポート 10514 にリダイレクトします
cf set-env app01 STD_LOG_COLLECTION_PORT 10514
# ポート 10514 をリスニングするように Agent を構成します
cf set-env app01 LOGS_CONFIG '[{"type":"tcp","port":"10514","source":"java","service":"app01"}]'
```

##### プロキシの構成が誤っている場合の通知

Agent v6.12+ では、ビルドパックで[プロキシ構成][12]を使用すると、接続を確立できるかどうかが確認されます。ログ収集は、このテスト結果に応じて開始されます。

接続の確立に失敗してログ収集が開始されなかった場合は、Datadog イベントストリームに以下のようなイベントが送信されます。これらのイベントを追跡して、構成を誤ったビルドパックがデプロイされたときに通知されるようにモニターをセットアップしてください。

{{< img src="integrations/cloud_foundry/logs_misconfigured_proxy.png" alt="cloud-foundry-log-misconfigured_proxy" responsive="true" >}}

### ビルド

このビルドパックをビルドするには、関連ファイルを編集し、`./build` スクリプトを実行します。これをアップロードするには、`./upload` を実行します。

### DogStatsD

詳細については、[DogStatsD に関するドキュメント][13]を参照してください。幅広いアプリケーションと互換性がある [DogStatsD ライブラリがリスト][14]されています。

## Cloud Foundry クラスターの監視

Datadog とのインテグレーションには 2 つのポイントがあり、それぞれ異なる目標を実現します。

* **Datadog Agent BOSH リリース** - Datadog Agent をデプロイのすべてのノードにインストールし、システム、ネットワーク、ディスクのメトリクスを追跡します。その他の Agent チェックを任意に有効にします。
* **Datadog Firehose Nozzle** - 1 つ以上の Datadog Firehose Nozzle ジョブをデプロイします。これらのジョブはデプロイの Loggregator Firehose を活用し、すべての非コンテナメトリクスを Datadog に送信します。

<div class="alert alert-warning">
これらのインテグレーションは Cloud Foundry デプロイ管理者向けです。エンドユーザー向けではありません。
</div>

### 前提条件

動作する Cloud Foundry デプロイと、それを管理する BOSH Director へのアクセス権を持つ必要があります。また、各インテグレーションをデプロイするために BOSH CLI が必要です。メジャーバージョン CLI-[v1][15] または [v2][16] のいずれかを使用できます。

### Datadog Agent BOSH リリースのインストール

Datadog は、BOSH リリースとしてパッケージ化された Datadog Agent のタールボールを提供します。最新リリースを BOSH Director にアップロードしてから、デプロイのすべてのノードに[アドオン][17]としてインストールします (Director が BOSH Agent をすべてのノードにデプロイする方法と同じ)。

#### Datadog のリリースを BOSH Director にアップロード

```
# BOSH CLI v1
bosh upload release https://cloudfoundry.datadoghq.com/datadog-agent/datadog-agent-boshrelease-latest.tgz

# BOSH CLI v2
bosh upload-release -e <BOSH_ENV> https://cloudfoundry.datadoghq.com/datadog-agent/datadog-agent-boshrelease-latest.tgz
```

独自のリリースを作成する場合は、[Datadog Agent BOSH リリースリポジトリ][18]を参照してください。

#### BOSH Director で Agent をアドオンとして構成

BOSH Director のランタイム構成ファイル (例: `runtime.yml`) に以下を追加します。

```
---
releases:
  - name: datadog-agent
    version: <VERSION_YOU_UPLOADED> # 実際のバージョン ('latest' ではなく x.y.z) を指定します

addons:
- name: datadog
  jobs:
  - name: dd-agent
    release: datadog-agent
  properties:
    dd:
      use_dogstatsd: true
      dogstatsd_port: 18125       # 多くの CF デプロイでは既にポート 8125 が StatsD です
      api_key: <DD_API_KEY>
      tags: ["<KEY:VALUE>"]       # 任意のタグ
      generate_processes: true    # プロセスチェックを有効にするため
```

以前にアップロードした `datadog-agent` のバージョンを確認するには、`bosh releases` を実行します。

#### runtime.yml のロード

以前に構成された `runtime-config` があるかをチェックするには、以下を実行します。

```
# BOSH CLI v1
`bosh runtime-config`

# BOSH CLI v2
bosh -e <BOSH_ENV> runtime-config
```

Bosh v2 では、`runtime.yml` ファイルが空の場合は、`No runtime config` という応答が表示されます。

#### 追加の Agent チェックの有効化

次の例のように、デプロイ全体で有効にする追加の Agent チェックごとに、`properties.dd.integrations` キーの下にその構成を追加します。

```
  properties:
    dd:
      integrations:
        directory:
          init_config: {}
          instances:
            directory: "."
        #process:
        #  init_config: {}
        #...
```

各チェック名の下の構成は、Agent の conf.d ディレクトリにある独自ファイルでチェックを構成する場合と同様になります。

`runtime.yml` 内で行った構成は、すべてのノードに適用されます。デプロイ内のノードの一部に対してチェックを構成することはできません。

デフォルトのチェック (システム、ネットワーク、ディスク、ntp) の構成をカスタマイズするには、Datadog Agent BOSH リリースの[すべての構成オプション][19]を参照してください。

#### ランタイム構成と Director の同期

```
# BOSH CLI v1
bosh update runtime-config runtime.yml

# BOSH CLI v2
bosh update-runtime-config -e <BOSH_ENV> runtime.yml
```

#### Cloud Foundry デプロイの再デプロイ

```
# BOSH CLI v1
bosh deployment <YOUR_DEPLOYMENT_MANIFEST>.yml
bosh -n deploy --recreate

# BOSH CLI v2
bosh -n -d <YOUR_DEPLOYMENT> -e <BOSH_ENV> deploy --recreate <YOUR_DEPLOYMENT_MANIFEST>.yml
```

ランタイム構成はグローバルに適用されるため、BOSH は、デプロイ内のすべてのノードを再デプロイします。デプロイが複数ある場合は、すべてのデプロイを再デプロイすることで、すべての場所に Datadog Agent がインストールされます。

#### すべての場所に Agent がインストールされたかどうかの確認

Agent のインストールが正常に行われたかをチェックするには、Datadog の[ホストマップページ][20]で `cloudfoundry` による絞り込みを行います。Agent BOSH リリースは、各ホストに汎用の `cloudfoundry` タグを付けます。次のスクリーンショットに示すように、オプションで `bosh_job` などのタグを使用してホストをグループ化してください。

{{< img src="integrations/cloud_foundry/cloud-foundry-host-map.png" alt="cloud-foundry-host-map" responsive="true" >}}

いずれかのホストをクリックしてズームインし、六角形の中の **system** をクリックして、Datadog がメトリクスを受信していることを確認します。

{{< img src="integrations/cloud_foundry/cloud-foundry-host-map-detail.png" alt="cloud-foundry-host-map-detail" responsive="true" >}}

### Datadog Firehose Nozzle のデプロイ

Datadog は Datadog Firehose Nozzle の BOSH リリースを提供します。このリリースを Director にアップロードしたら、既存のデプロイに Nozzle を追加するか、Nozzle のみを含む新しいデプロイを作成します。以下の手順は、Loggregator Firehose が動作している既存の Cloud Foundry デプロイにリリースを追加する例です。

#### Datadog のリリースを BOSH Director にアップロード

```
# BOSH CLI v1
bosh upload release http://cloudfoundry.datadoghq.com/datadog-firehose-nozzle/datadog-firehose-nozzle-release-latest.tgz

# BOSH CLI v2
bosh upload-release -e <BOSH_ENV> http://cloudfoundry.datadoghq.com/datadog-firehose-nozzle/datadog-firehose-nozzle-release-latest.tgz
```

独自のリリースを作成する場合は、[Datadog Firehose Nozzle リリースリポジトリ][21]を参照してください。

#### UAA クライアントの構成

UAA 構成を含むマニフェストで、Datadog Nozzle のための新しいクライアントを追加し、ジョブが Firehose にアクセスできるようにします。

```
uaa:
  clients:
    datadog-firehose-nozzle:
      access-token-validity: 1209600
      authorities: doppler.firehose,cloud_controller.admin_read_only
      authorized-grant-types: client_credentials
      override: true
      scope: doppler.firehose,cloud_controller.admin_read_only
      secret: <YOUR_SECRET>
```

デプロイを再デプロイしてユーザーを追加します。

#### Nozzle ジョブの追加

メイン Cloud Foundry デプロイのマニフェスト (例: cf-manifest.yml) で、1 つ以上の Nozzle ジョブを構成します。

```
jobs:
#- instances: 4
#  name: some_other_job
#  ...
- instances: 1            # add more instances if one job cannot keep up with the Firehose
  name: datadog_nozzle_z1
  networks:
    - name: cf1           # some network you've configured elsewhere in the manifest
  resource_pool: small_z1 # some resource_pool you've configured elsewhere in the manifest
  templates:
    - name: datadog-firehose-nozzle
      release: datadog-firehose-nozzle
  properties:
    datadog:
      api_key: <YOUR_DATADOG_API_KEY>
      api_url: https://api.datadoghq.com/api/v1/series
      flush_duration_seconds: 15 # seconds between flushes to Datadog. Default is 15.
    loggregator:
      # do NOT append '/firehose' or even a trailing slash to the URL; 'ws://<host>:<port>' works
      traffic_controller_url: <LOGGREGATOR_URL> # e.g. ws://traffic-controller.your-cf-domain.com:8081
    nozzle:
      deployment: <DEPLOYMENT_NAME>    # tags each firehose metric with 'deployment:<DEPLOYMENT_NAME>'
      subscription_id: datadog-nozzle  # can be anything (firehose streams data evenly to all jobs using the same subscription_id)
      # disable_access_control: true   # for development only
      # insecure_ssl_skip_verify: true # for development only; enable if your UAA does not use a verifiable cert
    uaa:
      client: datadog-firehose-nozzle # client name you just configured
      client_secret: <SECRET_YOU_JUST_CONFIGURED>
      url: <UAA_URL> # e.g. https://uaa.your-cf-domain.com:8443
```

使用できるすべての構成オプションについては、[Datadog Firehose Nozzle リポジトリ][22]を参照してください。

同じマニフェストに、Datadog Nozzle リリース名とバージョンを追加します。

```
releases:
# - name: <SOME_OTHER_RELEASE>
#   version: <x.y.z>
# ...
  - name: datadog-firehose-nozzle
    version: <VERSION_YOU_UPLOADED> # 実際のバージョン ('latest' ではなく x.y.z) を指定します
```

以前にアップロードした `datadog-firehose-nozzle` のバージョンを確認するには、`bosh releases` を実行します。

#### デプロイの再デプロイ

```
# BOSH CLI v1
bosh deployment cf-manifest.yml
bosh -n deploy --recreate

# BOSH CLI v2
bosh -n -d cf-manifest -e <BOSH_ENV> deploy --recreate cf-manifest.yml
```

#### Nozzle が収集していることの確認

Datadog の[メトリクスエクスプローラー][23]ページで、`cloudfoundry.nozzle` で始まるメトリクスを検索します。

{{< img src="integrations/cloud_foundry/cloud-foundry-nozzle-metrics.png" alt="cloudfoundry.nozzle.metrics" responsive="true" >}}

## 収集データ

### メトリクス

次のメトリクスが Datadog Firehose Nozzle (`cloudfoundry.nozzle`) によって送信されます。Datadog Agent リリースは、特殊な独自メトリクスを送信しません。Director ランタイム構成で構成した Agent チェックから通常のメトリクスだけ (およびデフォルトで[システム][24]、[ネットワーク][25]、[ディスク][26]、[ntp][27] の各メトリクス) が送信されます。

Datadog Firehose Nozzle は、CounterEvent (イベントではなくメトリクスとして)、ValueMetrics、および ContainerMetrics のみを収集します。ログメッセージとエラーは無視されます。

{{< get-metrics-from-git "cloud_foundry" >}}

[1]: https://network.pivotal.io/products/datadog
[2]: https://network.pivotal.io/products/datadog-application-monitoring
[3]: https://docs.cloudfoundry.org/buildpacks/understand-buildpacks.html#supply-script
[4]: /ja/developers/dogstatsd
[5]: https://docs.cloudfoundry.org/buildpacks/use-multiple-buildpacks.html
[6]: https://github.com/cloudfoundry/multi-buildpack
[7]: https://github.com/cloudfoundry/multi-buildpack#usage
[8]: https://docs.cloudfoundry.org/buildpacks/understand-buildpacks.html
[9]: https://cloudfoundry.datadoghq.com/datadog-cloudfoundry-buildpack/datadog-cloudfoundry-buildpack-latest.zip
[10]: https://github.com/cf-platform-eng/meta-buildpack
[11]: /ja/tracing/setup
[12]: https://docs.datadoghq.com/ja/agent/logs/proxy
[13]: /ja/developers/dogstatsd
[14]: /ja/libraries
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