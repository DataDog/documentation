---
algolia:
  tags:
  - unified service tags
  - unified
  - unified service
  - service tags
description: トレース、メトリクス、ログに通じてテレメトリを、標準化された env、service、version のタグを使って接続し、一貫した監視を実現します。
further_reading:
- link: /getting_started/tagging/using_tags
  tag: ドキュメント
  text: Datadog アプリでのタグの使用方法
- link: /tracing/version_tracking
  tag: ドキュメント
  text: Datadog APM 内の Version タグを使用してデプロイを監視する
- link: https://www.datadoghq.com/blog/autodiscovery-docker-monitoring/
  tag: ブログ
  text: オートディスカバリーの詳細
title: 統合サービスタグ付け
---
## 概要 {#overview}

統合サービスタグ付けは、3 つの[予約済みタグ][1]である `env`、`service`、`version` を使用して Datadog テレメトリを結び付けます。

これら 3 つのタグを使用すると、次のことができます。

- バージョンでフィルタリングされたトレースおよびコンテナメトリクスを使用してデプロイの影響を特定する
- 一貫性のあるタグを使用して、トレース、メトリクス、ログ間をシームレスに移動する
- 統一された方法で環境やバージョンに基づいてサービスデータを表示する

{{< img src="tagging/unified_service_tagging/overview.mp4" alt="統合サービスタグ付け" video=true >}}

**注**:

- `version` タグは、新しいアプリケーションのデプロイごとに変更されることが期待されています。アプリケーションのコードに異なる 2 つのバージョンがあるなら、それらの `version` タグは異なっていなければなりません。
- Autodiscovery ログ構成が存在しない場合、ログの公式サービスは、デフォルトで、コンテナのショートイメージになります。ログの公式サービスをオーバーライドするには、Autodiscovery [Docker ラベル/Pod アノテーション][2] を追加します。たとえば: `"com.datadoghq.ad.logs"='[{"service": "service-name"}]'`
- スパンに関連付けられているホストはデータベース/キャッシュホストではないため、データベースとキャッシュのスパンでは、ホスト情報が除外されます。

### 要件 {#requirements}

- 統合サービスタグ付けには、[Datadog Agent][3] 6.19.x/7.19.x 以上のセットアップが必要です。

- Unified service tagging には、[予約済みタグ][1] の新しい構成をサポートする SDK バージョンが必要です。詳しい情報については、[セットアップ手順][4] に言語ごとに記載されています。


| 言語         | 最小 SDK バージョン |
|--------------|------------|
| .NET    |  1.17.0+       |
| C++    |  0.1.0+       |
| Go         |  1.24.0+       |
| Java   |  0.50.0+      |
| Node    |  0.20.3+       |
| PHP  |  0.47.0+      |
| Python  |  0.38.0+      |
| Ruby  |  0.34.0+      |

- 統合サービスタグ付けでは、タグの構成に関する知識が必要です。タグの構成方法がわからない場合は、構成に進む前に、[タグの概要][1] および [タグの付け方][5] のドキュメントをお読みください。

## 構成 {#configuration}

統合サービスタグ付けの構成を開始するには、環境を選択します。

- [コンテナ化](#containerized-environment)
- [非コンテナ化](#non-containerized-environment)
- [Serverless](#serverless-environment)
- [OpenTelemetry](#opentelemetry)

### コンテナ化環境 {#containerized-environment}

コンテナ化環境において、`env`、`service`、および `version` は、サービスの環境変数またはラベル (Kubernetes の デプロイメントと Pod ラベル、Docker コンテナラベルなど) を通じて設定します。Datadog Agent がこのタグ付け構成を検出し、コンテナから収集したデータに適用します。

コンテナ化環境で統合サービスタグ付けをセットアップするには

1. [オートディスカバリー][6] を有効にするこれにより、Datadog Agent は特定のコンテナで実行されているサービスを自動的に識別し、そのサービスからデータを収集して、環境変数を `env`、`service,`、`version` のタグにマッピングできます。

2. [Docker][2]を使用している場合は、Agent がコンテナの[Docker ソケット][7]にアクセスできることを確認してください。これにより、Agent は環境変数を検出し、それらを標準のタグにマッピングできます。

3. コンテナオーケストレーションサービスに対応する環境は、以下のように完全構成または部分構成のいずれかに基づいて構成します。

#### 構成 {#configuration-1}

{{< tabs >}}
{{% tab "Kubernetes" %}}

[Admission Controller][1] を有効にして Datadog クラスターエージェントをデプロイした場合、Admission Controller はPodマニフェストに変更を加え、必須環境変数のすべてを取り込みます (設定されている変更条件に基づく)。その場合、Podマニフェスト内の `DD_` 環境変数の手動設定は不要です。詳しくは、[Admission Controller のドキュメント][1]を参照してください。

##### 完全な構成 {#full-configuration}

Kubernetes の使用時にすべての統合サービスタグ付けを取得するには、デプロイオブジェクトレベルとポッドテンプレート仕様レベルの両方に環境変数を追加します。

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

OpenTelemetry のリソース属性の環境変数を使用することにより、`env`、`service`、および `version` のタグを設定することもできます。

```yaml
  containers:
  -  ...
     env:
         - name: OTEL_RESOURCE_ATTRIBUTES
           value: "service.name=<SERVICE>,service.version=<VERSION>,deployment.environment=<ENV>"
         - name: OTEL_SERVICE_NAME
           value: "<SERVICE>"
```
<div class="alert alert-danger"> <code>OTEL_SERVICE_NAME</code> 環境変数は、 <code>service.name</code> 属性 ( <code>OTEL_RESOURCE_ATTRIBUTES</code> 環境変数) よりも優先されます。</div>

##### 部分的構成 {#partial-configuration}

###### ポッドレベルのメトリクス {#pod-level-metrics}

ポッドレベルのメトリクスを構成するには、次の標準ラベル (`tags.datadoghq.com`) を Deployment、StatefulSet、または Job のポッド仕様に追加します。

```yaml
template:
  metadata:
    labels:
      tags.datadoghq.com/env: "<ENV>"
      tags.datadoghq.com/service: "<SERVICE>"
      tags.datadoghq.com/version: "<VERSION>" 
```
これらのラベルは、ポッドレベルの Kubernetes CPU、メモリ、ネットワーク、ディスクメトリクスをカバーし、[Kubernetes の Downward API][2] を介してサービスのコンテナに `DD_ENV`、`DD_SERVICE`、`DD_VERSION` を取り込むために使用できます。

ポッドごとに複数のコンテナがある場合は、コンテナごとに標準ラベルを指定できます。

```yaml
tags.datadoghq.com/<container-name>.env
tags.datadoghq.com/<container-name>.service
tags.datadoghq.com/<container-name>.version 
```

###### ステートメトリクス {#state-metrics}

[Kubernetes ステートメトリクス][3]を構成するには:

1. 構成ファイルの中で `join_standard_tags` を `true` に設定します。設定場所については、この [例の構成ファイル][4] を参照してください。

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

###### Datadog SDK と StatsD クライアント {#datadog-sdk-and-statsd-client}

[Datadog SDK][5]および [StatsD クライアント][6]の環境変数を構成するには、[Kubernetes の Downward API][2] を以下の形式で使用します。

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

##### コンテナ化された環境での APM データに対する自動バージョンタグ付け {#automatic-version-tagging-for-apm-data-in-containerized-environments}

<div class="alert alert-info">この機能は、<a href="https://docs.datadoghq.com/tracing/">Application Performance Monitoring (APM)</a> データに対してのみ有効です。</div>

APM で `version` タグを使用して[デプロイを監視][7]したり、[自動障害デプロイ検出][8]を通じて不良なコードデプロイを特定したりできます。

APM データの場合、Datadog は次の優先順位で `version` タグを設定します。手動で `version` を設定した場合、Datadog がその `version` 値をオーバーライドすることはありません。

| 優先順位         | バージョン値 |
|--------------|------------|
| 1    |  {バージョン値}       |
| 2   | {image_tag}_{first_7_digits_of_git_commit_sha}       |
| 3         |  {image_tag} または {first_7_digits_of_git_commit_sha} (どちらか一方のみ利用可能な場合)      |

要件:
- Datadog Agent バージョン 7.52.0 以上
- サービスがコンテナ化された環境で動作しており、新しいバージョンのデプロイを追跡するには `image_tag` で十分な場合、これ以上の構成は不要です
- サービスがコンテナ化された環境で実行されていない場合、または Git SHA を含めたい場合は、[ビルド成果物に Git 情報を埋め込んでください][9]。


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
##### 完全な構成 {#full-configuration-1}

コンテナの ``DD_ENV`、`DD_SERVICE`、`DD_VERSION` 環境変数、および対応する Docker ラベルを設定することにより、統合サービスタグ付けの全範囲を取得します。

Dockerfile には、`service` と `version` の値を指定できます。

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

##### 部分的構成 {#partial-configuration-1}

サービスが Datadog 環境変数を必要としない場合 (例えば、Redis、PostgreSQL、NGINX などのサードパーティソフトウェアや、APM によってトレースされないアプリケーション)、Docker ラベルを使用できます。

```yaml
com.datadoghq.tags.env
com.datadoghq.tags.service
com.datadoghq.tags.version 
```

完全な構成で説明したように、これらのラベルは Dockerfile で設定するか、コンテナを起動するための引数として設定できます。

##### コンテナ化された環境での APM データに対する自動バージョンタグ付け {#automatic-version-tagging-for-apm-data-in-containerized-environments-1}

<div class="alert alert-info">この機能は、<a href="/tracing/">Application Performance Monitoring (APM)</a> データに対してのみ有効です。</div>

APM で `version` タグを使用して[デプロイを監視][1]したり、[自動障害デプロイ検出][2]を通じて不良なコードデプロイを特定したりできます。

APM データの場合、Datadog は次の優先順位で `version` タグを設定します。手動で `version` を設定した場合、Datadog がその `version` 値をオーバーライドすることはありません。

| 優先順位         | バージョン値 |
|--------------|------------|
| 1    |  {バージョン値}       |
| 2   | {image_tag}_{first_7_digits_of_git_commit_sha}       |
| 3         |  {image_tag} または {first_7_digits_of_git_commit_sha} (どちらか一方のみ利用可能な場合)      |

要件:
- Datadog Agent バージョン 7.52.0 以上
- サービスがコンテナ化された環境で動作しており、新しいバージョンのデプロイを追跡するには `image_tag` で十分な場合、これ以上の構成は不要です
- サービスがコンテナ化された環境で実行されていない場合、または Git SHA を含めたい場合は、[ビルド成果物に Git 情報を埋め込んでください][3]。
 

[1]: /ja/tracing/services/deployment_tracking/
[2]: /ja/watchdog/faulty_deployment_detection/
[3]: /ja/integrations/guide/source-code-integration/?tab=go#embed-git-information-in-your-build-artifacts

{{% /tab %}}

{{% tab "ECS" %}}

<div class="alert alert-danger">
ECS Fargate 上で Fluent Bit や FireLens を使用する場合、統合サービスタグ付けはメトリクスとトレースに対してのみ利用可能で、ログ収集には対応していません。
</div>

##### 完全な構成 {#full-configuration-2}

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
<div class="alert alert-danger">
ECS Fargateでは、これらのタグを Datadog Agent コンテナ<strong>ではなく</strong>、アプリケーションコンテナに追加する必要があります。
</div>

##### 部分的構成 {#partial-configuration-2}

サービスが Datadog 環境変数を必要としない場合 (たとえば、Redis、PostgreSQL、NGINX などのサードパーティソフトウェアや、APM によってトレースされないアプリケーション)、ECS タスク定義で Docker ラベルを使用できます。

```
"dockerLabels": {
  "com.datadoghq.tags.env": "<ENV>",
  "com.datadoghq.tags.service": "<SERVICE>",
  "com.datadoghq.tags.version": "<VERSION>"
}
```

##### コンテナ化された環境での APM データに対する自動バージョンタグ付け {#automatic-version-tagging-for-apm-data-in-containerized-environments-2}

<div class="alert alert-info">この機能は、<a href="/tracing/">Application Performance Monitoring (APM)</a> データに対してのみ有効です。</div>

APM で `version` タグを使用して[デプロイを監視][1]したり、[自動障害デプロイ検出][2]を通じて不良なコードデプロイを特定したりできます。

APM データの場合、Datadog は次の優先順位で `version` タグを設定します。手動で `version` を設定した場合、Datadog がその `version` 値をオーバーライドすることはありません。

| 優先順位         | バージョン値 |
|--------------|------------|
| 1    |  {バージョン値}       |
| 2   | {image_tag}_{first_7_digits_of_git_commit_sha}       |
| 3         |  {image_tag} または {first_7_digits_of_git_commit_sha} (どちらか一方のみ利用可能な場合)      |

要件:
- Datadog Agent バージョン 7.52.0 以上
- サービスがコンテナ化された環境で動作しており、新しいバージョンのデプロイを追跡するには `image_tag` で十分な場合、これ以上の構成は不要です
- サービスがコンテナ化された環境で実行されていない場合、または Git SHA を含めたい場合は、[ビルド成果物に Git 情報を埋め込んでください][3]。

[1]: /ja/tracing/services/deployment_tracking/
[2]: /ja/watchdog/faulty_deployment_detection/
[3]: /ja/integrations/guide/source-code-integration/?tab=go#embed-git-information-in-your-build-artifacts

{{% /tab %}}
{{% /tabs %}}

### 非コンテナ化環境 {#non-containerized-environment}

サービスのバイナリまたは実行可能ファイルを構築したりデプロイしたりする方法に応じて、環境変数を設定するためのオプションを利用できる場合があります。ホストごとに 1 つ以上のサービスを実行する可能性があるため、Datadog では、これらの環境変数の範囲を単一プロセスに限定することが推奨されています。

[トレース][8]、[ログ][9]、[RUMリソース][10]、[Synthetic テスト][11]、[StatsD メトリクス][12]、またはシステムメトリクスのサービスのランタイムから直接送信されるすべてのテレメトリーの構成の単一ポイントを形成するには、次のいずれかを実行します。

1. 実行可能ファイルのコマンドで環境変数をエクスポートします。

   ```
   DD_ENV=<env> DD_SERVICE=<service> DD_VERSION=<version> /bin/my-service
   ```

2. または、[Chef][13]、[Ansible][14]、または別のオーケストレーションツールを使用して、サービスの systemd または initd コンフィギュレーションファイルに `DD` 環境変数を設定します。サービスプロセスが開始すると、その変数にアクセスできるようになります。

   {{< tabs >}}
   {{% tab "トレース" %}}

   統合サービスタグ付けのトレースを構成する場合

   1. `DD_ENV` で [Datadog SDK][1]を構成することにより、`env` の定義が、トレースを生成しているアプリケーションに近くなるようにしてください。この方法では、`env` タグがスパンメタデータのタグから自動的に取得されるようになります。

   2. `DD_VERSION` でスパンを構成することにより、SDK に属するサービスに該当するすべてのスパンにバージョンを追加します (一般的に `DD_SERVICE`)。したがって、サービスにより外部サービスの名前でスパンが作成された場合、それらのスパンには `version` がタグとして追加されません。

      バージョンがスパンに存在する限り、それらのスパンから生成されるトレースメトリクスにはそれが追加されます。バージョンは、コード内で手動で追加できます。または、Datadog SDK によって自動的に追加されます。構成されているなら、それらは、トレースデータと StatsD メトリクスに `env`、`service`、および `version` のタグを付けるために、APM および [DogStatsDクライアント][2]によって使用されます。有効にされている場合、Datadog SDK はこれらの変数の値をログに取り込みます。

      **注**: スパンごとに **1 つのサービスのみ**可能です。また、一般にトレースメトリクスでもサービスは単一サービスです。ただし、ホストのタグで異なるサービスが定義されている場合、その構成されたサービスタグは、そのホストから発行されたすべてのトレースメトリクスに表示されます。

[1]: /ja/tracing/setup/
[2]: /ja/extend/dogstatsd/
   {{% /tab %}}

   {{% tab "ログ" %}}

   [接続されているログとトレース][1]を使用している場合、Datadog SDK が自動ログ取り込みをサポートしているなら、それを有効にしてください。その場合、Datadog SDK は`env`、`service`、および `version` をログに自動的に取り込むため、他の場所でこれらのフィールドを手動で構成する必要はありません。

[1]: /ja/tracing/other_telemetry/connect_logs_and_traces/
   {{% /tab %}}

   {{% tab "RUM およびセッションリプレイ" %}}

   [接続された RUM とトレース][1]を使用する場合、初期化ファイルの `service` フィールドにブラウザアプリケーションを指定し、`env` フィールドに環境を定義し、`version` フィールドにバージョンを記載します。

   [RUM アプリケーションを作成する][2]際に、`env` と `service` の名前を確認します。


[1]: /ja/real_user_monitoring/correlate_with_other_telemetry/apm/
[2]: /ja/real_user_monitoring/application_monitoring/browser/setup/
   {{% /tab %}}

   {{% tab "Synthetic" %}}

   [接続された Synthetic ブラウザのテストとトレース][1]をご利用の場合、[Integration Settings ページ][2]の **APM Integration for Browser Tests** のセクションでヘッダー送信先 URL を指定してください。

   ワイルドカードとして `*` を使用することができます (例: `https://*.datadoghq.com`)。

[1]: /ja/synthetics/apm/
[2]: https://app.datadoghq.com/synthetics/settings/integrations
   {{% /tab %}}

   {{% tab "Custom Metrics" %}}

   [カスタム StatsD メトリクス][1]には、付加のみという形でタグが追加されます。たとえば、`env` に異なる 2 つの値がある場合、メトリクスには両方の環境がタグ付けされます。同じ名前のタグが他のタグをオーバーライドする順序はありません。

   サービスが `DD_ENV`、`DD_SERVICE`、`DD_VERSION` にアクセスできる場合、DogStatsD クライアントは対応するタグをカスタムメトリクスに自動的に追加します。

   **注**: .NET および PHP 用の Datadog DogStatsD クライアントは、この機能をサポートしていません。

[1]: /ja/metrics/
   {{% /tab %}}

   {{% tab "システムメトリクス" %}}

   インフラストラクチャーメトリクスに `env` と `service` のタグを追加できます。コンテナ化されていない環境の場合、サービスメトリクスのタグ付けは Agent レベルで構成されます。

   この構成はサービスのプロセスを呼び出すたびに変更されるわけではないので、`version` を追加することは推奨されません。

#### ホスト毎の単一サービス {#single-service-per-host}

Agent の[メインコンフィギュレーションファイル][1]に、以下の構成を適用します。

```yaml
env: <ENV>
tags:
  - service:<SERVICE>
```

この設定により、Agent が送信するすべてのデータに対して `env` と `service` のタグ付けの一貫性が保証されます。

#### ホスト毎の複数のサービス {#multiple-services-per-host}

Agent の[メインコンフィギュレーションファイル][1]に、以下の構成を適用します。

```yaml
env: <ENV>
```

CPU、メモリ、ディスク I/O のメトリクスに一意の `service` タグをプロセスレベルで取得するには、Agent の構成フォルダ (`process.d/conf.yaml` の下の `conf.d` フォルダなど) で[プロセスチェック][2]を構成します。

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

**注**: Agent のメイン構成ファイルでグローバルに `service` タグが設定されている場合、プロセスメトリクスには 2 つのサービスがタグ付けされます。これによりメトリクスの解釈に混乱を招く可能性があるため、`service` タグはプロセスチェックの構成でのみ設定することをお勧めします。

[1]: /ja/agent/configuration/agent-configuration-files
[2]: /ja/integrations/process
    {{% /tab %}}
    {{< /tabs >}}

### サーバーレス環境 {#serverless-environment}

AWS Lambda 関数については、[タグを使った Lambda のテレメトリー接続方法][15]を参照してください。

### OpenTelemetry {#opentelemetry}

OpenTelemetry を使用する場合、以下の[リソース属性][16] を、対応する Datadog 規則にマッピングします。

| OpenTelemetry 規約 | Datadog 規約 |
| --- | --- |
| `deployment.environment` <sup>1</sup>  | `env` |
| `deployment.environment.name` <sup>2</sup> | `env` |
| `service.name` | `service` |
| `service.version` | `version` |

1: `deployment.environment` は [OpenTelemetry セマンティック規約 v1.27.0][17] で非推奨となっており、代わりに `deployment.environment.name` を使うことが推奨されています。 
2: `deployment.environment.name` は Datadog Agent 7.58.0 以上および Datadog Exporter v0.110.0 以上でサポートされています。

<div class="alert alert-danger">Datadog 固有の環境変数 ( <code>DD_SERVICE</code>、<code>DD_ENV</code> 、 <code>DD_VERSION</code> など) は、OpenTelemetry の構成においてデフォルトではサポートされていません。</div>

{{< tabs >}}
{{% tab "環境変数" %}}

環境変数を使用してリソース属性を設定するには、`OTEL_RESOURCE_ATTRIBUTES` に適切な値を設定します。

```shell
export OTEL_RESOURCE_ATTRIBUTES="service.name=my-service,deployment.environment=production,service.version=1.2.3"
```

{{% /tab %}}

{{% tab "SDK" %}}

アプリケーションコードでリソース属性を設定するには、必要な属性を指定して `Resource` を作成し、`TracerProvider` に関連付けます。

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

OpenTelemetry Collector からリソース属性を設定するには、Collector の設定ファイルで[変換プロセッサー (transform processor)][100]を使用します。変換プロセッサーを使用すると、収集したテレメトリデータの属性を Datadog エクスポーターに送信する前に、属性に変更を加えることができます。

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

## 参考資料 {#further-reading}

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
[10]: /ja/real_user_monitoring/correlate_with_other_telemetry/apm/
[11]: /ja/getting_started/synthetics/
[12]: /ja/integrations/statsd/
[13]: https://www.chef.io/
[14]: https://www.ansible.com/
[15]: /ja/serverless/configuration/#connect-telemetry-using-tags
[16]: https://opentelemetry.io/docs/languages/js/resources/
[17]: https://github.com/open-telemetry/semantic-conventions/releases/tag/v1.27.0