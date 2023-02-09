---
description: Pivotal Cloud Foundry インテグレーションを手動でセットアップする手順
further_reading:
- link: https://www.datadoghq.com/blog/monitor-tanzu-application-service/
  tag: GitHub
  text: VMware Tanzu Application Service 上で動作するアプリケーションの監視
kind: ガイド
title: Pivotal Cloud Foundry マニュアルセットアップガイド
---

## 概要

Pivotal Cloud Foundry (PCF) デプロイメントは、Datadog にメトリクスやイベントを送信することができます。デプロイメント内のすべてのノードの健全性と可用性を追跡し、それらが実行するジョブを監視し、Loggregator Firehose からメトリクスを収集するなど、さまざまなことが可能です。このページでは、PCF アプリケーションのモニタリングを手動でセットアップする方法を説明します。

PCF と Datadog のインテグレーションには、3 つの主要なコンポーネントがあります。まず、ビルドパックは、アプリケーションからカスタムメトリクスを収集するために使用されます。第二に、BOSH リリースは、プラットフォームからメトリクスを収集します。3 つ目は、Loggregator Firehose Nozzle が、インフラストラクチャーから他のすべてのメトリクスを収集します。詳細については、[Datadog VMware Tanzu Application Service アーキテクチャ][32]ガイドをお読みください。

## アプリケーションを監視する

PCF アプリケーションの監視には、**Datadog Pivotal Cloud Foundry Buildpack** を使用します。これは、Datadog Container Agent、Datadog Trace Agent for APM、Datadog DogStatsD のバイナリファイルを、アプリが動作しているコンテナにインストールする PCF 用の[サプライビルドパック][2]です。

### Pivotal Cloud Foundry < 1.12

Datadog のビルドパックは、バージョン `1.12` で導入された Pivotal Cloud Foundry [Pushing an App with Multiple Buildpacks][3] 機能を使用しています。

古いバージョンの場合、Pivotal Cloud Foundry はこの機能の後方互換バージョンを[マルチビルドパック][4]という形で提供しています。Datadog のビルドパックを使用するには、このバージョンをインストールし、構成する必要があります。

1. マルチビルドパックのバックポートをアップロードします。最新のマルチビルドパックリリースをダウンロードして、Pivotal Cloud Foundry 環境にアップロードします。

    ```shell
    cf create-buildpack multi-buildpack ./multi-buildpack-v-x.y.z.zip 99 --enable
    ```

2. アプリケーションにマルチビルドパックマニフェストを追加します。マルチビルドパックリポジトリの[使用セクション][5]で説明されているように、アプリケーションのルートに `multi-buildpack.yml` ファイルを作成し、環境に合わせて構成します。Datadog Pivotal Cloud Foundry Buildpack と通常のビルドパックへのリンクを追加します。

    ```yaml
    buildpacks:
      - "https://cloudfoundry.datadoghq.com/datadog-cloudfoundry-buildpack/datadog-cloudfoundry-buildpack-3.1.0.zip"
      - "https://github.com/cloudfoundry/ruby-buildpack#v1.7.18" # Replace this with your regular buildpack
    ```

    Datadog Buildpack の URL は次のとおりです。

      - `https://cloudfoundry.datadoghq.com/datadog-cloudfoundry-buildpack/datadog-cloudfoundry-buildpack-latest.zip`
      - `https://cloudfoundry.datadoghq.com/datadog-cloudfoundry-buildpack/datadog-cloudfoundry-buildpack-x.y.z.zip`

      ここでは `latest` バージョンは使用しないでください (`x.y.z` を特定のバージョンに置き換えます)。

      **通常のビルドパックは、マニフェストの中で最後のビルドパックとして動作する必要があります**。詳しくは、[Pivotal Cloud Foundry のビルドパックの仕組み][6]を参照してください。

3. マルチビルドパックでアプリケーションをプッシュします。`multi-buildpack` が、アプリケーション用に Pivotal Cloud Foundry によって選択されたビルドパックであることを確認します。

    ```shell
    cf push <YOUR_APP> -b multi-buildpack
    ```

### Pivotal Cloud Foundry Platform >= 1.12

1. Datadog Pivotal Cloud Foundry Buildpack をアップロードします。[最新の Datadog ビルドパックリリースをダウンロード][7]して、Pivotal Cloud Foundry 環境にアップロードします。

    ```shell
    cf create-buildpack datadog-cloudfoundry-buildpack ./datadog-cloudfoundry-buildpack-latest.zip
    ```

2. Datadog ビルドパックと通常のビルドパックを使用してアプリケーションをプッシュします。複数のビルドパックを使用してアプリケーションをプッシュするプロセスは、[複数のビルドパックでアプリをプッシュする][3]に説明されています。

    ```shell
    cf push <YOUR_APP> --no-start -b binary_buildpack
    cf v3-push <YOUR_APP> -b datadog-cloudfoundry-buildpack -b <YOUR-BUILDPACK-1> -b <YOUR-FINAL-BUILDPACK>
    ```

   **以前に単一のビルドパックを使用していた場合は、それが最後のビルドパックとして機能するように、最後にロードされる必要があります**。詳しくは、[Pivotal Cloud Foundry のビルドパックの仕組み][6]を参照してください。

### Meta-Buildpack **(非推奨)**

[メタビルドパック][8]を使用している場合は、Datadog のビルドパックをそのままデコレータとして使用できます。

**注**: Pivotal はメタビルドパックを非推奨とし、マルチビルドパックを推奨しています。

## PCF クラスターを監視する

Datadog とのインテグレーションには 2 つのポイントがあり、それぞれ異なる目標を実現します。

- **Datadog Agent BOSH リリース** - Datadog Agent をデプロイのすべてのノードにインストールし、システム、ネットワーク、ディスクのメトリクスを追跡します。その他の Agent チェックを任意に有効にします。
- **Datadog Firehose Nozzle** - 1 つ以上の Datadog Firehose Nozzle ジョブをデプロイします。これらのジョブはデプロイの Loggregator Firehose を活用し、すべての非コンテナメトリクスを Datadog に送信します。

<div class="alert alert-warning">
これらのインテグレーションは PCF デプロイ管理者向けです。エンドユーザー向けではありません。
</div>

### 前提条件

動作する Cloud Foundry デプロイと、それを管理する BOSH Director へのアクセス権を持つ必要があります。また、各インテグレーションをデプロイするために BOSH CLI が必要です。メジャーバージョン CLI -- [v1][15] または [v2][16] のいずれかを使用できます。

### Datadog Agent BOSH リリースのインストール

Datadog は、BOSH リリースとしてパッケージ化された Datadog Agent のタールボールを提供します。最新リリースを BOSH Director にアップロードしてから、デプロイのすべてのノードに[アドオン][17]としてインストールします (Director が BOSH Agent をすべてのノードにデプロイする方法と同じ)。

#### Datadog のリリースを BOSH Director にアップロード

```text
# BOSH CLI v1
bosh upload release https://cloudfoundry.datadoghq.com/datadog-agent/datadog-agent-boshrelease-latest.tgz
# BOSH CLI v2
bosh upload-release -e <BOSH_ENV> https://cloudfoundry.datadoghq.com/datadog-agent/datadog-agent-boshrelease-latest.tgz
```

独自のリリースを作成する場合は、[Datadog Agent BOSH リリースリポジトリ][18]を参照してください。

#### BOSH Director で Agent をアドオンとして構成

BOSH Director のランタイム構成ファイル (`runtime.yml`) に以下を追加します。

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

以前にアップロードされた `datadog-agent` のリリースバージョンを確認するには、`bosh releases` を実行します。

#### runtime.yml のロード

以前に構成された `runtime-config` があるかをチェックするには、以下を実行します。

```text
# BOSH CLI v1
`bosh runtime-config`
# BOSH CLI v2
bosh -e <BOSH_ENV> runtime-config
```

BOSH v2 では、`runtime.yml` ファイルが空の場合は、`No runtime config` という応答が表示されます。

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

各チェック名の下の構成は、Agent の `conf.d` ディレクトリにある独自のファイルでチェックを構成するときと同じ形式を使用します。

`runtime.yml` 内で行った構成は、すべてのノードに適用されます。デプロイ内のノードの一部に対してチェックを構成することはできません。

デフォルトのチェック (システム、ネットワーク、ディスク、NTP) の構成をカスタマイズするには、Datadog Agent BOSH リリースの[すべての構成オプション][19]を参照してください。

#### ランタイム構成と BOSH Director の同期

```text
# BOSH CLI v1
bosh update runtime-config runtime.yml
# BOSH CLI v2
bosh update-runtime-config -e <BOSH_ENV> runtime.yml
```

#### PCF デプロイの再デプロイ

```text
# BOSH CLI v1
bosh deployment <YOUR_DEPLOYMENT_MANIFEST>.yml
bosh -n deploy --recreate
# BOSH CLI v2
bosh -n -d <YOUR_DEPLOYMENT> -e <BOSH_ENV> deploy --recreate <YOUR_DEPLOYMENT_MANIFEST>.yml
```

ランタイム構成はグローバルに適用されるため、BOSH は、デプロイ内のすべてのノードを再デプロイします。デプロイが複数ある場合は、すべてのデプロイを再デプロイすることで、すべての場所に Datadog Agent がインストールされます。

#### すべての場所に Agent がインストールされたかどうかの確認

Agent のインストールが成功したかどうかを確認するには、[ホストマップ][20]で `cloudfoundry` でフィルタリングします。Datadog Agent BOSH リリースでは、各ホストに `cloudfoundry` のタグを付けています。オプションとして、以下のスクリーンショットのように、`bosh_job` など、任意のタグでホストをグループ化します。

{{< img src="integrations/cloud_foundry/cloud-foundry-host-map.png" alt="Datadog のホストマップの Filter セクションに cloudfoundry を、Group セクションに bosh_job を入力したもの"  >}}

いずれかのホストをクリックしてズームインし、六角形の中の **system** をクリックして、Datadog がシステムメトリクスを受信していることを確認します。

{{< img src="integrations/cloud_foundry/cloud-foundry-host-map-detail.png" alt="Datadog ホストマップのホストの詳細表示で、システムインテグレーションが選択され、複数のグラフでデータが表示されている様子"  >}}

#### PCF コンテナ内の CAPI メタデータと Cluster Agent タグを収集する

Datadog Agent バージョン `7.40.1` 以降では、PCF コンテナから CAPI メタデータと Datadog Cluster Agent (DCA) タグを収集することができます。アプリケーションラベルとアノテーションは、アプリケーションログ、メトリクス、およびトレースに存在します。

### Datadog Cluster Agent (DCA) BOSH リリースのインストール

Datadog Cluster Agent BOSH リリースは、Cloud Foundry 上で DCA を動作させるための BOSH パッケージです。

このパッケージは、[Datadog Agent BOSH リリース][18]と組み合わせて使用するものです。
Datadog Agent BOSH リリースによって消費される BOSH リンクを提供し、アプリの自動検出やインテグレーションをスケジュールしたり、アプリケーションコンテナやプロセス検出のためのタグ付けが改善されます。詳細については、[GitHub における仕様][33]を参照してください。

#### Datadog の Cluster Agent リリースを BOSH Director にアップロード

```text
# BOSH CLI v1
bosh upload release https://cloudfoundry.datadoghq.com/datadog-cluster-agent/datadog-cluster-agent-boshrelease-latest.tgz
# BOSH CLI v2
bosh upload-release -e <BOSH_ENV> https://cloudfoundry.datadoghq.com/datadog-cluster-agent/datadog-cluster-agent-boshrelease-latest.tgz
```

#### デプロイ
以下のデプロイマニフェストテンプレートの例を使用して、Datadog Cluster Agent をデプロイし、Datadog Agent に公開します。利用可能なプロパティについては、[GitHub における仕様][33]を参照してください。

```yaml
jobs:
- name: datadog-cluster-agent
  release: datadog-cluster-agent
  properties:
    cluster_agent:
      token: <TOKEN>  # 32 文字以上の長さ
      bbs_poll_interval: 10
      warmup_duration: 5
      log_level: INFO
      bbs_ca_crt: <CA_CERTIFICATE>
      bbs_client_crt: <CLIENT_CERTIFICATE>
      bbs_client_key: <CLIENT_PRIVATE_KEY>
  provides:
    datadog-cluster-agent:
      aliases:
        - domain: <DNS_NAME (e.g. datadog-cluster-agent)>
```

**注**: これは、Datadog Cluster Agent サービスの DNS エイリアスを作成し、静的なエイリアスを介してアドレスを取得できるようにします。BOSH DNS エイリアスに関する詳細は、BOSH ドキュメントの[サービスに対するエイリアス](https://bosh.io/docs/dns/#aliases-to-services)を参照してください。

この DNS エイリアスは、以下のテンプレート例に示すように、Datadog Agent ランタイム構成の [`cluster_agent.address`](https://bosh.io/jobs/dd-agent?source=github.com/DataDog/datadog-agent-boshrelease&amp;version=4.0.0#p%3dcluster_agent.address) ジョブプロパティで指定されます。

```yaml
jobs:
- name: datadog-agent
  release: datadog-agent
  properties: 
    ...
    cluster_agent:
      address: <DNS_NAME>
    ...
```

#### インテグレーション構成の発見
Datadog Cluster Agent は、アプリケーションに設定された `AD_DATADOGHQ_COM` 環境変数に基づきインテグレーションを発見します。
この環境変数は、アプリケーションのオートディスカバリー構成テンプレートを含む JSON オブジェクトです。Datadog Cluster Agent は、2 種類の構成を発見してレンダリングすることができます。
  1. ユーザー提供のサービスであれ、サービスブローカーからのサービスであれ、アプリケーションにバインドされるサービスの構成。
  2. アプリケーション内部で動作するサービスの構成 (例: Web サーバー)。

JSON オブジェクトは、サービス名とそのオートディスカバリーテンプレートを関連付けた辞書である必要があります。
```
{
    "<SERVICE_NAME>": {
        "check_names": [<LIST_OF_INTEGRATION_NAMES_TO_CONFIGURE>],
        "init_configs": [<LIST_OF_INIT_CONFIGS>],
        "instances": [<LIST_OF_INSTANCES>],
        "variables": [<LIST_OF_VARIABLES_DEFINITIONS>]
    }
}
```

アプリケーションにバインドされているサービスの場合、`<SERVICE_NAME>` は `cf services` コマンドの出力に表示されているサービスの名前でなければなりません。アプリケーションの中で動作しているサービスの場合、`<SERVICE_NAME>` は何でも構いません。

`variables` キーは、バインドされたサービスが構成テンプレート内のテンプレート変数を解決するためにのみ使用され、環境変数 `VCAP_SERVICES` に設定する値の JSON パスを含める必要があります。これは `cf env <APPLICATION_NAME>` コマンドで検査することができます。

**注:** Datadog Cluster Agent は、オートディスカバリーのための `VCAP_SERVICES` 環境変数で直接利用できるサービスの資格情報を解決することだけが可能です。

##### 例

`AD_DATADOGHQ_COM` 環境変数にあるこのオートディスカバリー構成は、PostgreSQL サービスにバインドされた Web サーバーを実行する Cloud Foundry アプリケーションを例示しています。

```
AD_DATADOGHQ_COM: '{
    "web_server": {
        "check_names": ["http_check"],
        "init_configs": [{}],
        "instances": [
            {
                "name": "My Nginx",
                "url": "http://%%host%%:%%port_p8080%%",
                "timeout": 1
            }
        ]
    }
    "postgres-service-name": {
        "check_names": ["postgres"],
        "init_configs": [{}],
        "instances": [
            {
                "host": "%%host%%",
                "port": 5432,
                "username": "%%username%%",
                "dbname": "%%dbname%%",
                "password": "%%password%%"
            }
        ],
        "variables": {
            "host": "$.credentials.host",
            "username": "$.credentials.Username",
            "password": "$.credentials.Password",
            "dbname": "$.credentials.database_name"
        }
    }
}'
```

この例では、付属の `VCAP_SERVICES` 環境変数を使用しています。

```
VCAP_SERVICES: '{
    "my-postgres-service": [
        {
            "credentials": {
                Password: "1234",
                Username: "User1234",
                host: "postgres.example.com",
                database_name: "my_db",
            },
            "name": "postgres-service-name",
        }
    ]
}'
```

上の例では、最初の項目 `web_server` はアプリケーション内で動作するサービス用の構成です。
`variables` はなく、オートディスカバリーで利用できる `%%host%%` と `%%port%%` テンプレート変数が使用されています。

2 番目の項目 `postgres-service-name` は、アプリケーションにバインドされているサービスの構成です。
テンプレート変数を解決するために、インスタンス構成で使用される値を定義する `variables` 辞書を使用します。
この辞書には、環境変数 `VCAP_SERVICES` で定義されたサービス `postgres-service-name` の変数値がどこにあるかを示す JSONPath オブジェクトが含まれています。

#### キャッシュミス時の CCCache のパフォーマンス向上

Datadog Agent のバージョン `7.40.1` 以降では、CCCache の動作と API コールの回数を制御するために、さらにフラグを追加することができます。

- キャッシュミスの動作を制御する `refresh_on_cache_miss`
- `advanced_tags` を `sidecars_tags` と `isolation_segments_tags` に分割する

#### アプリケーションコンテナやプロセスディスカバリーのタグ付けの改善

2 つのリリースがリンクされると、Datadog Cluster Agent が自動的にクラスターレベルのメタデータを提供し、Node Agent が対応する Cloud Foundry アプリケーションコンテナにタグとしてアタッチします。

### Datadog Firehose Nozzle のデプロイ

Datadog は Datadog Firehose Nozzle の BOSH リリースを提供します。このリリースを Director にアップロードしたら、既存のデプロイに Nozzle を追加するか、Nozzle のみを含む新しいデプロイを作成します。以下の手順は、Loggregator Firehose が動作している既存の PCF デプロイにリリースを追加する例です。

#### Datadog のリリースを BOSH Director にアップロード

```text
# BOSH CLI v1
bosh upload release http://cloudfoundry.datadoghq.com/datadog-firehose-nozzle/datadog-firehose-nozzle-release-latest.tgz
# BOSH CLI v2
bosh upload-release -e <BOSH_ENV> http://cloudfoundry.datadoghq.com/datadog-firehose-nozzle/datadog-firehose-nozzle-release-latest.tgz
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

再デプロイしてユーザーを追加します。

#### Firehose Nozzle ジョブの追加

メイン PCF デプロイのマニフェスト (`cf-manifest.yml`) で、1 つ以上の Nozzle ジョブを構成します。

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

以前にアップロードされた `datadog-firehose-nozzle` のリリースバージョンを確認するには、`bosh releases` を実行します。

#### デプロイの再デプロイ

```text
# BOSH CLI v1
bosh deployment cf-manifest.yml
bosh -n deploy --recreate
# BOSH CLI v2
bosh -n -d cf-manifest -e <BOSH_ENV> deploy --recreate cf-manifest.yml
```

#### Firehose Nozzle がデータを収集していることを確認する

[メトリクスエクスプローラー][23]で、`cloudfoundry.nozzle` で始まるメトリクスを検索します。

{{< img src="integrations/cloud_foundry/cloud-foundry-nozzle-metrics.png" alt="検索バーに cloudfoundry.nozle を入力した Datadog のメトリクスエクスプローラー"  >}}

#### アプリケーションのメタデータプレフィックスを制御する

Firehose Nozzle のアプリメトリクスで、アプリケーションメタデータのプレフィックスを有効または無効にすることができます。

{{< img src="integrations/cloud_foundry/enable_metadata_app_prefix.png" alt="Datadog のインテグレーションタイルの設定で、Enable Metadata App Metrics Prefix のチェックが外れているもの" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[2]: https://docs.cloudfoundry.org/buildpacks/understand-buildpacks.html#supply-script
[3]: https://docs.cloudfoundry.org/buildpacks/use-multiple-buildpacks.html
[4]: https://github.com/cloudfoundry/multi-buildpack
[5]: https://github.com/cloudfoundry/multi-buildpack#usage
[6]: https://docs.cloudfoundry.org/buildpacks/understand-buildpacks.html
[7]: https://cloudfoundry.datadoghq.com/datadog-cloudfoundry-buildpack/datadog-cloudfoundry-buildpack-latest.zip
[8]: https://github.com/cf-platform-eng/meta-buildpack
[15]: https://bosh.io/docs/bosh-cli.html
[16]: https://bosh.io/docs/cli-v2.html#install
[17]: https://bosh.io/docs/runtime-config.html#addons
[18]: https://github.com/DataDog/datadog-agent-boshrelease
[19]: https://github.com/DataDog/datadog-agent-boshrelease/blob/master/jobs/dd-agent/spec
[20]: https://app.datadoghq.com/infrastructure/map
[21]: https://github.com/DataDog/datadog-firehose-nozzle-release
[22]: https://github.com/DataDog/datadog-firehose-nozzle-release/blob/master/jobs/datadog-firehose-nozzle/spec
[23]: https://app.datadoghq.com/metric/explorer
[24]: /ja/integrations/system/#metrics
[25]: /ja/integrations/network/#metrics
[26]: /ja/integrations/disk/#metrics
[27]: /ja/integrations/ntp/#metrics
[28]: https://github.com/cloudfoundry/loggregator-api
[29]: https://docs.cloudfoundry.org/running/all_metrics.html
[30]: /ja/profiler/enabling/
[32]: /ja/integrations/faq/pivotal_architecture
[33]: https://github.com/DataDog/datadog-cluster-agent-boshrelease/blob/master/jobs/datadog-cluster-agent/spec