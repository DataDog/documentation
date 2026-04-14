---
algolia:
  tags:
  - 統合サービスタグ
  - 統合
  - 統合サービス
  - サービスタグ
further_reading:
- link: /getting_started/tagging/using_tags
  tag: Documentation
  text: Datadog アプリでのタグの使用方法
- link: /tracing/version_tracking
  tag: Documentation
  text: Datadog APM 内の Version タグを使用してデプロイを監視する
- link: https://www.datadoghq.com/blog/autodiscovery-docker-monitoring/
  tag: ブログ
  text: オートディスカバリーの詳細
title: 統合サービスタグ付け
---

## 概要

統合サービスタグ付けは、3 つの[予約済みタグ][1]である `env`、`service`、`version` を使用して Datadog テレメトリを結び付けます。

これら 3 つのタグを使用すると、次のことができます。

- バージョンでフィルタリングされたトレースおよびコンテナメトリクスを使用してデプロイの影響を特定する
- 一貫性のあるタグを使用して、トレース、メトリクス、ログ間をシームレスに移動する
- 統一された方法で環境やバージョンに基づいてサービスデータを表示する

{{< img src="tagging/unified_service_tagging/overview.mp4" alt="統合サービスタグ付け" video=true >}}

**注**:

- `version` タグは、新しいアプリケーションのデプロイごとに変更されることが期待されています。アプリケーションのコードに異なる 2 つのバージョンがある場合、それぞれに異なる `version` タグが付けられるべきです。
- オートディスカバリーログの構成が存在しない場合、ログの公式サービスはデフォルトでコンテナのショートイメージになります。ログの公式サービスを上書きするには、オートディスカバリーの [Docker ラベル/ポッドアノテーション][2]を追加します。例: `"com.datadoghq.ad.logs"='[{"service": "service-name"}]'`
- スパンに関連付けられたホストはデータベース/キャッシュホストではないため、ホスト情報はデータベースとキャッシュスパンでは除外されます。

### 要件

- 統合サービスタグ付けには、[Datadog Agent][3] 6.19.x/7.19.x 以上のセットアップが必要です。

- 統合サービスタグ付けには、[予約済みタグ][1]の新しい構成に対応するトレーサーのバージョンが必要です。詳細は、言語別の[セットアップ手順][4]をご覧ください。


| 言語         | トレーサー最小バージョン |
|--------------|------------|
| .NET    |  1.17.0+       |
| C++    |  0.1.0+       |
| Go         |  1.24.0+       |
| Java   |  0.50.0+      |
| Node    |  0.20.3+       |
| PHP  |  0.47.0 以降      |
| Python  |  0.38.0+      |
| Ruby  |  0.34.0+      |

- 統合サービスタグ付けには、タグの構成に関する知識が必要です。タグの構成方法がわからない場合は、構成に進む前に、[タグの概要][1]および[タグの付け方][5]のドキュメントをお読みください。

## 構成

統合サービスタグ付けの構成を開始するには、環境を選択します。

- [コンテナ化](#containerized-environment)
- [非コンテナ化](#non-containerized-environment)
- [サーバーレス](#serverless-environment)
- [OpenTelemetry](#opentelemetry)

### コンテナ化環境

コンテナ化環境では、`env`、`service`、`version` は、サービスの環境変数またはラベル（Kubernetes のデプロイやポッドラベル、Docker コンテナラベルなど）を介して設定されます。Datadog Agent はこのタグ付け構成を検出し、コンテナから収集するデータに適用します。

コンテナ化環境で統合サービスタグ付けをセットアップするには

1. [オートディスカバリー][6]を有効にします。これにより、Datadog Agent は特定のコンテナで実行されているサービスを自動的に識別し、そのサービスからデータを収集して、環境変数を `env`、`service`、`version` タグにマッピングできます。

2. [Docker][2] を使用している場合は、Agent がコンテナの [Docker ソケット][7]にアクセスできることを確認してください。これにより、Agent は環境変数を検出し、それを標準タグにマッピングできます。

3. コンテナオーケストレーションサービスに対応する環境は、以下のように完全構成または部分構成のいずれかに基づいて構成します。

#### 構成

{{< tabs >}}
{{% tab "Kubernetes" %}}

[Admission Controller][1] を有効にして Datadog Cluster Agent をデプロイした場合、Admission Controller はポッドマニフェストを変更し、(構成された変更条件に基づいて) 必要なすべての環境変数を注入します。その場合、ポッドマニフェスト内の `DD_` 環境変数の手動設定は不要になります。詳細は [Admission Controller のドキュメント][1] を参照してください。

##### 完全な構成

Kubernetes の使用時に全範囲の統合サービスタグ付けを取得するには、デプロイオブジェクトレベルとポッドテンプレート仕様レベルの両方に環境変数を追加します。

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    tags.datadoghq.com/env: "<ENV>"
    tags.datadoghq.com/service: "<SERVICE>"
    tags.datadoghq.com/version: "<VERSION>" 
...
template:
  metadata:
    labels:
      tags.datadoghq.com/env: "<ENV>"
      tags.datadoghq.com/service: "<SERVICE>"
      tags.datadoghq.com/version: "<VERSION>" 
  containers:
  -  ...
     env:
          - name: DD_ENV
            valueFrom:
              fieldRef:
                fieldPath: metadata.labels['tags.datadoghq.com/env']
          - name: DD_SERVICE
            valueFrom:
              fieldRef:
                fieldPath: metadata.labels['tags.datadoghq.com/service']
          - name: DD_VERSION 
            valueFrom: 
              fieldRef: 
                fieldPath: metadata.labels['tags.datadoghq.com/version']
```

また、OpenTelemetry Resource Attributes の環境変数を使用して、`env`、`service`、`version` タグを設定することもできます。

```yaml
  containers:
  -  ...
     env:
         - name: OTEL_RESOURCE_ATTRIBUTES
           value: "service.name=<SERVICE>,service.version=<VERSION>,deployment.environment=<ENV>"
         - name: OTEL_SERVICE_NAME
           value: "<SERVICE>"
```
<div class="alert alert-danger"><strong>注</strong>: <code>OTEL_SERVICE_NAME</code> 環境変数は、<code>OTEL_RESOURCE_ATTRIBUTES</code> 環境変数内の <code>service.name</code> 属性より優先されます。</div>

##### 部分構成

###### ポッドレベルのメトリクス

ポッドレベルのメトリクスを構成するには、次の標準ラベル (`tags.datadoghq.com`) を Deployment、StatefulSet、または Job のポッド仕様に追加します。

```yaml
template:
  metadata:
    labels:
      tags.datadoghq.com/env: "<ENV>"
      tags.datadoghq.com/service: "<SERVICE>"
      tags.datadoghq.com/version: "<VERSION>" 
```
これらのラベルは、ポッドレベルの Kubernetes CPU、メモリ、ネットワーク、ディスクメトリクスをカバーし、[Kubernetes の Downward API][2] を介してサービスのコンテナに `DD_ENV`、`DD_SERVICE`、`DD_VERSION` を注入するために使用できます。

ポッドごとに複数のコンテナがある場合は、コンテナごとに標準ラベルを指定できます。

```yaml
tags.datadoghq.com/<container-name>.env
tags.datadoghq.com/<container-name>.service
tags.datadoghq.com/<container-name>.version 
```

###### ステートメトリクス

[Kubernetes ステートメトリクス][3]を構成するには:

1. コンフィギュレーションファイルで、`join_standard_tags` を `true` に設定します。設定場所については、こちらの[コンフィギュレーションファイルの例][4]を参照してください。

2. 同じ標準ラベルを親リソース (`Deployment` など) のラベルのコレクションに追加します。

  ```yaml
  apiVersion: apps/v1
  kind: Deployment
  metadata:
    labels:
      tags.datadoghq.com/env: "<ENV>"
      tags.datadoghq.com/service: "<SERVICE>"
      tags.datadoghq.com/version: "<VERSION>" 
  spec:
    template:
      metadata:
        labels:
          tags.datadoghq.com/env: "<ENV>"
          tags.datadoghq.com/service: "<SERVICE>"
          tags.datadoghq.com/version: "<VERSION>" 
  ```

###### APM トレーサー / StatsD クライアント

[APM トレーサー][5]および [StatsD クライアント][6]の環境変数を構成するには、[Kubernetes の Downward API][2] を以下の形式で使用します。

```yaml
containers:
-  ...
    env:
        - name: DD_ENV
          valueFrom:
            fieldRef:
              fieldPath: metadata.labels['tags.datadoghq.com/env']
        - name: DD_SERVICE
          valueFrom:
            fieldRef:
              fieldPath: metadata.labels['tags.datadoghq.com/service']
        - name: DD_VERSION 
          valueFrom: 
            fieldRef: 
              fieldPath: metadata.labels['tags.datadoghq.com/version'] 
```

##### コンテナ化された環境での APM データに対する自動バージョンタグ付け

<div class="alert alert-info">この機能は、<a href="https://docs.datadoghq.com/tracing/">Application Performance Monitoring (APM)</a> データでのみ有効です。</div>

APM で `version` タグを使用して[デプロイを監視][7]したり、[自動障害デプロイ検出][8]を通じて不良なコードデプロイを特定したりできます。

APM データに対して、Datadog は以下の優先順位で `version` タグを設定します。もし手動で `version` を設定している場合、Datadog はその `version` 値をオーバーライドしません。

| 優先度         | バージョン値 |
|--------------|------------|
| 1    |  {your version value}       |
| 2   | {image_tag}_{first_7_digits_of_git_commit_sha}       |
| 3         |  {image_tag} または {first_7_digits_of_git_commit_sha} (どちらか一方のみ利用可能な場合)      |

要件:
- Datadog Agent バージョン 7.52.0 以上
- サービスがコンテナ化された環境で動作しており、新しいバージョンのデプロイを追跡するには `image_tag` で十分な場合、これ以上の構成は不要です
- サービスがコンテナ化された環境で実行されていない場合、または git SHA も含めたい場合は、[ビルド成果物に Git 情報を埋め込んでください][9]


[1]: /ja/agent/cluster_agent/admission_controller/
[2]: https://kubernetes.io/docs/tasks/inject-data-application/downward-api-volume-expose-pod-information/#capabilities-of-the-downward-api
[3]: /ja/agent/kubernetes/data_collected/#kube-state-metrics
[4]: https://github.com/DataDog/integrations-core/blob/master/kubernetes_state/datadog_checks/kubernetes_state/data/conf.yaml.example
[5]: /ja/tracing/send_traces/
[6]: /ja/integrations/statsd/
[7]: /ja/tracing/services/deployment_tracking/
[8]: /ja/watchdog/faulty_deployment_detection/
[9]: /ja/integrations/guide/source-code-integration/?tab=go#embed-git-information-in-your-build-artifacts

{{% /tab %}}

{{% tab "Docker" %}}
##### 完全な構成

コンテナの `DD_ENV`、`DD_SERVICE`、`DD_VERSION` 環境変数と対応する Docker ラベルを設定して、統合サービスタグ付けの全範囲を取得します。

`service` と `version` の値は Dockerfile で指定できます。

```yaml
ENV DD_SERVICE <SERVICE>
ENV DD_VERSION <VERSION> 

LABEL com.datadoghq.tags.service="<SERVICE>"
LABEL com.datadoghq.tags.version="<VERSION>" 
```

`env` はデプロイ時に決定される可能性が高いため、後で環境変数を注入してラベルを付けることができます。

```shell
docker run -e DD_ENV=<ENV> -l com.datadoghq.tags.env=<ENV> ...
```

デプロイ時にすべてを設定することもできます。

```shell
docker run -e DD_ENV="<ENV>" \
           -e DD_SERVICE="<SERVICE>" \
           -e DD_VERSION="<VERSION>" \ 
           -l com.datadoghq.tags.env="<ENV>" \
           -l com.datadoghq.tags.service="<SERVICE>" \
           -l com.datadoghq.tags.version="<VERSION>" \ 
           ...
```

##### 部分構成

サービスが Datadog 環境変数を必要としない場合 (例えば、Redis、PostgreSQL、NGINX などのサードパーティソフトウェアや、APM によってトレースされないアプリケーション)、Docker ラベルを使用できます。

```yaml
com.datadoghq.tags.env
com.datadoghq.tags.service
com.datadoghq.tags.version 
```

完全な構成で説明したように、これらのラベルは Dockerfile で設定するか、コンテナを起動するための引数として設定できます。

##### コンテナ化された環境での APM データに対する自動バージョンタグ付け

<div class="alert alert-info">この機能は、<a href="/tracing/">Application Performance Monitoring (APM)</a> データでのみ有効です。</div>

APM で `version` タグを使用して[デプロイを監視][1]したり、[自動障害デプロイ検出][2]を通じて不良なコードデプロイを特定したりできます。

APM データに対して、Datadog は以下の優先順位で `version` タグを設定します。もし手動で `version` を設定している場合、Datadog はその `version` 値をオーバーライドしません。

| 優先度         | バージョン値 |
|--------------|------------|
| 1    |  {your version value}       |
| 2   | {image_tag}_{first_7_digits_of_git_commit_sha}       |
| 3         |  {image_tag} または {first_7_digits_of_git_commit_sha} (どちらか一方のみ利用可能な場合)      |

要件:
- Datadog Agent バージョン 7.52.0 以上
- サービスがコンテナ化された環境で動作しており、新しいバージョンのデプロイを追跡するには `image_tag` で十分な場合、これ以上の構成は不要です
- サービスがコンテナ化された環境で実行されていない場合、または git SHA を含めたい場合は、[ビルド成果物に Git 情報を埋め込んでください][3]


[1]: /ja/tracing/services/deployment_tracking/
[2]: /ja/watchdog/faulty_deployment_detection/
[3]: /ja/integrations/guide/source-code-integration/?tab=go#embed-git-information-in-your-build-artifacts

{{% /tab %}}

{{% tab "ECS" %}}

<div class="alert alert-danger">
ECS Fargate 上で Fluent Bit や FireLens を使用する場合、統合サービスタグ付けはメトリクスとトレースに対してのみ利用可能で、ログ収集には対応していません。
</div>

##### 完全な構成

各サービスのコンテナのランタイム環境で、`DD_ENV`、`DD_SERVICE`、`DD_VERSION` (自動バージョンタグ付けでオプション) 環境変数と対応する Docker ラベルを設定して、統合サービスタグ付けの全範囲を取得します。たとえば、ECS タスク定義を通じて、この構成をすべて 1 か所で設定できます。

```
"environment": [
  {
    "name": "DD_ENV",
    "value": "<ENV>"
  },
  {
    "name": "DD_SERVICE",
    "value": "<SERVICE>"
  },
  {
    "name": "DD_VERSION",
    "value": "<VERSION>"
  }

],
"dockerLabels": {
  "com.datadoghq.tags.env": "<ENV>",
  "com.datadoghq.tags.service": "<SERVICE>",
  "com.datadoghq.tags.version": "<VERSION>"
}
```

##### 部分構成

サービスが Datadog 環境変数を必要としない場合 (たとえば、Redis、PostgreSQL、NGINX などのサードパーティソフトウェアや、APM によってトレースされないアプリケーション)、ECS タスク定義で Docker ラベルを使用できます。

```
"dockerLabels": {
  "com.datadoghq.tags.env": "<ENV>",
  "com.datadoghq.tags.service": "<SERVICE>",
  "com.datadoghq.tags.version": "<VERSION>"
}
```

##### コンテナ化された環境での APM データに対する自動バージョンタグ付け

<div class="alert alert-info">この機能は、<a href="/tracing/">Application Performance Monitoring (APM)</a> データでのみ有効です。</div>

APM で `version` タグを使用して[デプロイを監視][1]したり、[自動障害デプロイ検出][2]を通じて不良なコードデプロイを特定したりできます。

APM データに対して、Datadog は以下の優先順位で `version` タグを設定します。もし手動で `version` を設定している場合、Datadog はその `version` 値をオーバーライドしません。

| 優先度         | バージョン値 |
|--------------|------------|
| 1    |  {your version value}       |
| 2   | {image_tag}_{first_7_digits_of_git_commit_sha}       |
| 3         |  {image_tag} または {first_7_digits_of_git_commit_sha} (どちらか一方のみ利用可能な場合)      |

要件:
- Datadog Agent バージョン 7.52.0 以上
- サービスがコンテナ化された環境で動作しており、新しいバージョンのデプロイを追跡するには `image_tag` で十分な場合、これ以上の構成は不要です
- サービスがコンテナ化された環境で実行されていない場合、または git SHA を含めたい場合は、[ビルド成果物に Git 情報を埋め込んでください][3]

[1]: /ja/tracing/services/deployment_tracking/
[2]: /ja/watchdog/faulty_deployment_detection/
[3]: /ja/integrations/guide/source-code-integration/?tab=go#embed-git-information-in-your-build-artifacts

{{% /tab %}}
{{% /tabs %}}

### 非コンテナ化環境

サービスのバイナリまたは実行可能ファイルをどのように構築およびデプロイするかによって、環境変数を設定するためのオプションをいくつか利用できる場合があります。ホストごとに 1 つ以上のサービスを実行する可能性があるため、Datadog ではこれらの環境変数のスコープを単一プロセスにすることをお勧めします。

[トレース][8]、[ログ][9]、[RUMリソース][10]、[Synthetic テスト][11]、[StatsD メトリクス][12]、またはシステムメトリクスのサービスのランタイムから直接送信されるすべてのテレメトリーの構成の単一ポイントを形成するには、次のいずれかを実行します。

1. 実行可能ファイルのコマンドで環境変数をエクスポートします。

   ```
   DD_ENV=<env> DD_SERVICE=<service> DD_VERSION=<version> /bin/my-service
   ```

2. または、[Chef][13]、[Ansible][14]、または別のオーケストレーションツールを使用して、サービスの systemd または initd コンフィギュレーションファイルに `DD` 環境変数を設定します。サービスプロセスが開始すると、その変数にアクセスできるようになります。

   {{< tabs >}}
   {{% tab "トレース" %}}

   統合サービスタグ付けのトレースを構成する場合

   1. `DD_ENV` で [APM トレーサー][1]を構成し、トレースを生成しているアプリケーションに `env` の定義を近づけます。このメソッドを使用すると、`env` タグをスパンメタデータのタグから自動的に取得できます。

   2. `DD_VERSION` でスパンを構成して、トレーサーに属するサービス (通常は `DD_SERVICE`) に属するすべてのスパンにバージョンを追加します。これは、サービスが外部サービスの名前でスパンを作成する場合、そのスパンはタグとして `version` を受信しないことを意味します。

      バージョンがスパンに存在する限り、そのスパンから生成されたメトリクスをトレースするために追加されます。バージョンは、手動でコード内に追加するか、APM トレーサーによって自動的に追加できます。構成すると、これらは APM および [DogStatsD クライアント][2]によって使用され、トレースデータと StatsD メトリクスに `env`、`service`、`version` でタグ付けします。有効にすると、APM トレーサーはこの変数の値もログに注入します。

      **注**: **スパンごとに 1 つのサービス**しか存在できません。トレースメトリクスには、通常、単一のサービスもあります。ただし、ホストのタグで異なるサービスが定義されている場合、その構成されたサービスタグは、そのホストから発行されたすべてのトレースメトリクスに表示されます。

[1]: /ja/tracing/setup/
[2]: /ja/developers/dogstatsd/
   {{% /tab %}}

   {{% tab "ログ" %}}

[接続されたログとトレース][1]を使用している場合、APM トレーサーでサポートされている場合は、自動ログ注入を有効にします。そうすれば、APM トレーサーは、自動的に `env`、`service`、`version` をログに注入するため、他の場所でこれらのフィールドを手動で構成する必要がなくなります。

[1]: /ja/tracing/other_telemetry/connect_logs_and_traces/
   {{% /tab %}}

{{% tab "RUM とセッションリプレイ" %}}

[接続された RUM とトレース][1]を使用する場合、初期化ファイルの `service` フィールドにブラウザアプリケーションを指定し、`env` フィールドに環境を定義し、`version` フィールドにバージョンを記載します。

[RUM アプリケーションを作成する][2]際に、`env` と `service` の名前を確認します。


[1]: /ja/real_user_monitoring/platform/connect_rum_and_traces/
[2]: /ja/real_user_monitoring/browser/setup/
   {{% /tab %}}

   {{% tab "Synthetics" %}}

[接続された Synthetic ブラウザのテストとトレース][1]をご利用の場合、[Integration Settings ページ][2]の **APM Integration for Browser Tests** セクションでヘッダー送信先 URL を指定してください。

ワイルドカードとして `*` を使用することができます。例えば、`https://*.datadoghq.com` のように指定します。

[1]: /ja/synthetics/apm/
[2]: https://app.datadoghq.com/synthetics/settings/integrations
   {{% /tab %}}

{{% tab "カスタムメトリクス" %}}

タグは、[カスタム StatsD メトリクス][1]の付加のみの方法で追加されます。たとえば、`env` に 2 つの異なる値がある場合、メトリクスは両方の環境でタグ付けされます。1 つのタグが同じ名前の別のタグをオーバーライドする順序はありません。

サービスが `DD_ENV`、`DD_SERVICE`、`DD_VERSION` にアクセスできる場合、DogStatsD クライアントは対応するタグをカスタムメトリクスに自動的に追加します。

**注**: .NET および PHP 用の Datadog DogStatsD クライアントは、この機能をサポートしていません。

[1]: /ja/metrics/
   {{% /tab %}}

{{% tab "システムメトリクス" %}}

インフラストラクチャーメトリクスには、`env` タグと `service` タグを追加することができます。コンテナ化されていないコンテキストでは、サービスメトリクスのタグ付けは Agent レベルで構成されます。

この構成はサービスのプロセスを呼び出すたびに変更されるわけではないので、`version` を追加することは推奨されません。

#### ホスト毎の単一サービス

Agent の[メインコンフィギュレーションファイル][1]に、以下の構成を適用します。

```yaml
env: <ENV>
tags:
  - service:<SERVICE>
```

この設定により、Agent が送信するすべてのデータに対する `env` と `service` のタグ付けの一貫性が保証されます。

#### ホスト毎の複数のサービス

Agent の[メインコンフィギュレーションファイル][1]に、以下の構成を適用します。

```yaml
env: <ENV>
```

CPU、メモリ、ディスク I/O のメトリクスに一意の `service` タグをプロセスレベルで取得するには、Agent の構成フォルダ (例えば、`process.d/conf.yaml` 下の `conf.d` フォルダ) で[プロセスチェック][2]を構成します。

```yaml
init_config:
instances:
    - name: web-app
      search_string: ["/bin/web-app"]
      exact_match: false
      service: web-app
    - name: nginx
      search_string: ["nginx"]
      exact_match: false
      service: nginx-web-app
```

**注**: Agent のメインコンフィギュレーションファイルで既に `service` タグをグローバルに設定している場合は、プロセスのメトリクスが 2 つのサービスにタグ付けされます。これによってメトリクスの解釈に相違が生じることがあるため、`service` タグはプロセスチェックの構成のみで構成することをお勧めします。

[1]: /ja/agent/configuration/agent-configuration-files
[2]: /ja/integrations/process
    {{% /tab %}}
    {{< /tabs >}}

### サーバーレス環境

AWS Lambda 関数については、[タグを使った Lambda のテレメトリー接続方法][15]を参照してください。

### OpenTelemetry

OpenTelemetry を使用する場合、以下の[リソース属性][16] を、対応する Datadog 規則にマッピングします。

| OpenTelemetry 規則 | Datadog 規則 |
| --- | --- |
| `deployment.environment` <sup>1</sup>  | `env` |
| `deployment.environment.name` <sup>2</sup> | `env` |
| `service.name` | `service` |
| `service.version` | `version` |

1: `deployment.environment` は [OpenTelemetry セマンティック規約 v1.27.0][17] において `deployment.environment.name` が推奨されるため非推奨となります。
2: `deployment.environment.name` は Datadog Agent 7.58.0+ および Datadog Exporter v0.110.0+ でサポートされています。

<div class="alert alert-danger"><code>DD_SERVICE</code>、<code>DD_ENV</code>、<code>DD_VERSION</code> のような Datadog 固有の環境変数は、OpenTelemetry 構成では既定ではサポートされていません。</div>

{{< tabs >}}
{{% tab "環境変数" %}}

環境変数を使用してリソース属性を設定するには、`OTEL_RESOURCE_ATTRIBUTES` に適切な値を設定します。

```shell
export OTEL_RESOURCE_ATTRIBUTES="service.name=my-service,deployment.environment=production,service.version=1.2.3"
```

{{% /tab %}}

{{% tab "SDK" %}}

アプリケーションコードでリソース属性を設定するには、必要な属性を持つ `Resource` を作成し、`TracerProvider` に関連付けます。

Python を使った例を次に示します。

```python
from opentelemetry.sdk.resources import Resource
from opentelemetry.sdk.trace import TracerProvider

resource = Resource(attributes={
   "service.name": "<SERVICE>",
   "deployment.environment": "<ENV>",
   "service.version": "<VERSION>"
})
tracer_provider = TracerProvider(resource=resource)
```

{{% /tab %}}

{{% tab "コレクター" %}}

OpenTelemetry コレクターからリソース属性を設定するには、コレクターコンフィギュレーションファイルの[変換プロセッサ][100]を使用します。変換プロセッサを使用すると、収集したテレメトリーデータを Datadog エクスポーターに送信する前に、その属性を変更できます。

```yaml
processors:
  transform:
    trace_statements:
      - context: resource
        statements:
          - set(attributes["service.name"], "my-service")
          - set(attributes["deployment.environment"], "production")
          - set(attributes["service.version"], "1.2.3")
...
```

[100]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/transformprocessor

{{% /tab %}}
{{< /tabs >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/getting_started/tagging/
[2]: /ja/agent/docker/integrations/?tab=docker
[3]: /ja/getting_started/agent
[4]: /ja/tracing/setup
[5]: /ja/getting_started/tagging/assigning_tags?tab=noncontainerizedenvironments
[6]: /ja/getting_started/agent/autodiscovery
[7]: /ja/agent/docker/?tab=standard#optional-collection-agents
[8]: /ja/getting_started/tracing/
[9]: /ja/getting_started/logs/
[10]: /ja/real_user_monitoring/platform/connect_rum_and_traces/
[11]: /ja/getting_started/synthetics/
[12]: /ja/integrations/statsd/
[13]: https://www.chef.io/
[14]: https://www.ansible.com/
[15]: /ja/serverless/configuration/#connect-telemetry-using-tags
[16]: https://opentelemetry.io/docs/languages/js/resources/
[17]: https://github.com/open-telemetry/semantic-conventions/releases/tag/v1.27.0