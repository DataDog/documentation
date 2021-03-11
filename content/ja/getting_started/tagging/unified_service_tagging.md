---
title: 統合サービスタグ付け
kind: ドキュメント
aliases:
  - /ja/getting_started/tagging/unified_service_tagging
further_reading:
  - link: /getting_started/tagging/using_tags
    tag: Documentation
    text: Datadog アプリでのタグの使用方法
  - link: /tracing/version_tracking
    tag: Documentation
    text: Datadog APM 内の Version タグを使用してデプロイを監視する
  - link: 'https://www.datadoghq.com/blog/autodiscovery-docker-monitoring/'
    tag: ブログ
    text: オートディスカバリーの詳細
---
## 概要
統合サービスタグ付けは、3 つの[予約済みタグ][1]である `env`、`service`、`version` を使用して Datadog テレメトリを結び付けます。

これら 3 つのタグを使用すると、次のことができます。

- バージョンでフィルタリングされたトレースおよびコンテナメトリクスでデプロイへの影響を特定する
- 一貫性のあるタグを使用して、トレース、メトリクス、ログ間をシームレスに移動する
- Datadog アプリ内で統一された方法で環境またはバージョンに基づいてサービスデータを表示する

{{< img src="tagging/unified_service_tagging/overview.gif" alt="統合サービスタグ付け"  >}}

### 要件

- 統合サービスタグ付けには、[Datadog Agent][2] のセットアップが必要です。

- 統合サービスタグ付けには、[予約済みタグ][1]の新しいコンフィギュレーションに対応するトレーサーのバージョンが必要です。詳細は、言語別の[セットアップ手順][3]をご覧ください。

- 統合サービスタグ付けには、タグの構成に関する知識が必要です。タグの構成方法がわからない場合は、コンフィギュレーションに進む前に、[タグの概要][4]および[タグの付け方][5]のドキュメントをお読みください。

## コンフィギュレーション

統合サービスタグ付けのコンフィギュレーションを開始するには、環境を選択します。

- [コンテナ化](#containerized-environment)
- [非コンテナ化](#non-containerized-environment)

### コンテナ化環境

コンテナ化環境では、`env`、`service`、`version` は、サービスの環境変数またはラベル（Kubernetes のデプロイやポッドラベル、Docker コンテナラベルなど）を介して設定されます。Datadog Agent はこのタグ付けコンフィギュレーションを検出し、コンテナから収集するデータに適用します。

コンテナ化環境で統合サービスタグ付けをセットアップするには

1. [オートディスカバリー][6]を有効にします。これにより、Datadog Agent は特定のコンテナで実行されているサービスを自動的に識別し、そのサービスからデータを収集して、環境変数を `env`、`service`、`version` タグにマッピングできます。

2. [Docker][7] を使用している場合は、Agent がコンテナの [Docker ソケット][8]にアクセスできることを確認してください。これにより、Agent は環境変数を検出し、それを標準タグにマッピングできます。

4. 以下に詳述する完全なコンフィギュレーションまたは部分的なコンフィギュレーションのいずれかに基づいて環境を構成します。

#### コンフィギュレーション

{{< tabs >}}
{{% tab "Kubernetes" %}}

##### 完全なコンフィギュレーション

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

##### 部分的なコンフィギュレーション

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
これらのラベルは、ポッドレベルの Kubernetes CPU、メモリ、ネットワーク、ディスクメトリクスをカバーし、[Kubernetes の Downward API][1] を介してサービスのコンテナに `DD_ENV`、`DD_SERVICE`、`DD_VERSION` を挿入するために使用できます。

ポッドごとに複数のコンテナがある場合は、コンテナごとに標準ラベルを指定できます。

```yaml
tags.datadoghq.com/<container-name>.env
tags.datadoghq.com/<container-name>.service
tags.datadoghq.com/<container-name>.version
```

###### ステートメトリクス

[Kubernetes ステートメトリクス][2]を構成するには:

1. [コンフィギュレーションファイル][3]で `join_standard_tags` を `true` に設定します。

2. 同じ標準ラベルを親リソース (デプロイなど) のラベルのコレクションに追加します。

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

[APM トレーサー][4]および [StatsD クライアント][5]環境変数を構成するには、[Kubernetes の Downward API][1] を以下の形式で使用します。

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

[1]: https://kubernetes.io/docs/tasks/inject-data-application/downward-api-volume-expose-pod-information/#capabilities-of-the-downward-api
[2]: /ja/agent/kubernetes/data_collected/#kube-state-metrics
[3]: https://github.com/DataDog/integrations-core/blob/master/kubernetes_state/datadog_checks/kubernetes_state/data/conf.yaml.example#L70
[4]: /ja/tracing/send_traces/
[5]: /ja/integrations/statsd/
{{% /tab %}}

{{% tab "Docker" %}}
##### 完全なコンフィギュレーション

コンテナの `DD_ENV`、`DD_SERVICE`、`DD_VERSION` 環境変数と対応する Docker ラベルを設定して、統合サービスタグ付けの全範囲を取得します。

`service` と `version` の値は Dockerfile で指定できます。

```yaml
ENV DD_SERVICE <SERVICE>
ENV DD_VERSION <VERSION>

LABEL com.datadoghq.tags.service="<SERVICE>"
LABEL com.datadoghq.tags.version="<VERSION>"
```

`env` はデプロイ時に決定される可能性が高いため、後で環境変数を挿入してラベルを付けることができます。

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

##### 部分的なコンフィギュレーション

サービスが Datadog 環境変数を必要としない場合 (たとえば、Redis、PostgreSQL、NGINX などのサードパーティソフトウェアや、APM によってトレースされないアプリケーション)、Docker ラベルを使用できます。

```yaml
com.datadoghq.tags.env
com.datadoghq.tags.service
com.datadoghq.tags.version
```

完全なコンフィギュレーションで説明したように、これらのラベルは Dockerfile で設定するか、コンテナを起動するための引数として設定できます。

{{% /tab %}}

{{% tab "ECS" %}}
##### 完全なコンフィギュレーション

コンテナのランタイム環境で、`DD_ENV`、`DD_SERVICE`、`DD_VERSION` 環境変数と対応する Docker ラベルを設定して、統合サービスタグ付けの全範囲を取得します。たとえば、ECS タスク定義を通じて、このコンフィギュレーションをすべて 1 か所で設定できます。

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

"dockerLabels": {
  "com.datadoghq.tags.env": "<ENV>",
  "com.datadoghq.tags.service": "<SERVICE>",
  "com.datadoghq.tags.version": "<VERSION>"
  }
]
```

##### 部分的なコンフィギュレーション

サービスが Datadog 環境変数を必要としない場合 (たとえば、Redis、PostgreSQL、NGINX などのサードパーティソフトウェアや、APM によってトレースされないアプリケーション)、ECS タスク定義で Docker ラベルを使用できます。

```
"dockerLabels": {
  "com.datadoghq.tags.env": "<ENV>",
  "com.datadoghq.tags.service": "<SERVICE>",
  "com.datadoghq.tags.version": "<VERSION>"
}
```

{{% /tab %}}
{{< /tabs >}}

### 非コンテナ化環境

サービスのバイナリまたは実行可能ファイルをどのように構築およびデプロイするかによって、環境変数を設定するためのオプションをいくつか利用できる場合があります。ホストごとに 1 つ以上のサービスを実行する可能性があるため、これらの環境変数のスコープを単一プロセスにすることをお勧めします。

[トレース][9]、[ログ][10]、[StatsD メトリクス][11]のサービスのランタイムから直接送信されるすべてのテレメトリーのコンフィギュレーションの単一ポイントを形成するには、次のいずれかを実行します。

1. 実行可能ファイルのコマンドで環境変数をエクスポートします。

    `DD_ENV=<env> DD_SERVICE=<service> DD_VERSION=<version> /bin/my-service`

2. または、[Chef][12]、[Ansible][13]、または別のオーケストレーションツールを使用して、サービスの systemd または initd コンフィギュレーションファイルに `DD` 環境変数を設定します。これにより、サービスプロセスが開始されると、その変数にアクセスできるようになります。

{{< tabs >}}
{{% tab "トレース" %}}

統合サービスタグ付けのトレースを構成する場合

1. `DD_ENV` で [APM トレーサー][1]を構成し、トレースを生成しているアプリケーションに `env` の定義を近づけます。このメソッドを使用すると、`env` タグをスパンメタデータのタグから自動的に取得できます。

2. `DD_VERSION` でスパンを構成して、トレーサーに属するサービス (通常は `DD_SERVICE`) に属するすべてのスパンにバージョンを追加します。これは、サービスが外部サービスの名前でスパンを作成する場合、そのスパンはタグとして `version` を受信しないことを意味します。

   バージョンがスパンに存在する限り、そのスパンから生成されたメトリクスをトレースするために追加されます。バージョンは、手動でコード内に追加するか、APM トレーサーによって自動的に追加できます。構成すると、少なくともこれらは APM および [Dogstatsd クライアント][2]によって使用され、トレースデータと StatsD メトリクスに `env`、`service`、`version` でタグ付けします。有効にすると、APM トレーサーはこの変数の値もログに挿入します。

   **注: スパンごとに 1 つのサービスしか存在できません。**トレースメトリクスには、通常、単一のサービスもあります。ただし、ホストのタグで異なるサービスが定義されている場合、その構成されたサービスタグは、そのホストから発行されたすべてのトレースメトリクスに表示されます。

[1]: /ja/tracing/setup/
[2]: /ja/developers/dogstatsd/
{{% /tab %}}

{{% tab "ログ" %}}

[接続されたログとトレース][1]を使用している場合、APM トレーサーでサポートされている場合は、自動ログ挿入を有効にします。APM トレーサーは、自動的に `env`、`service`、`version` をログに挿入するため、他の場所でこれらのフィールドを手動で構成する必要がなくなります。

**注**: PHP Tracer は、ログの統合サービスタグ付けのコンフィギュレーションをサポートしていません。

[1]: /ja/tracing/connect_logs_and_traces/
{{% /tab %}}

{{% tab "カスタムメトリクス" %}}

タグは、[カスタム statsd メトリクス][1]の付加のみの方法で追加されます。たとえば、`env` に 2 つの異なる値がある場合、メトリクスは両方の環境でタグ付けされます。1 つのタグが同じ名前の別のタグをオーバーライドする順序はありません。

サービスが `DD_ENV`、`DD_SERVICE`、`DD_VERSION` にアクセスできる場合、DogStatsD クライアントは対応するタグをカスタムメトリクスに自動的に追加します。

**注**: .NET および PHP 用の Datadog DogStatsD クライアントは、まだこの機能をサポートしていません。

[1]: /ja/developers/metrics/
{{% /tab %}}

{{% tab "システムメトリクス" %}}

インフラストラクチャーのメトリクスには `env` と `service` も追加することができます。

非コンテナ環境におけるサービスメトリクスのタグ付けコンフィギュレーションは、Agent と密接な関係にあります。
このコンフィギュレーションによってサービスプロセスの各呼び出しが変更されないことを考慮すると、`version` をコンフィギュレーションに追加することは推奨されません。

##### ホスト毎の単一サービス

Agent の[メインコンフィギュレーションファイル][1]に、以下のコンフィギュレーションを適用します。

```yaml
env: <ENV>
tags:
    - service:<SERVICE>
```

この設定により、Agent が送信するすべてのデータに対する `env` と `service` のタグ付けの一貫性が保証されます。

##### ホスト毎の複数のサービス

Agent の[メインコンフィギュレーションファイル][1]に、以下のコンフィギュレーションを適用します。

```yaml
env: <ENV>
```

[プロセスチェック][2]を構成して、CPU、メモリー、ディスクの処理レベルの入出力メトリクスで一意の `service` タグを取得することができます。

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

**注**: Agent のメインコンフィギュレーションファイルで既に `service` タグをグローバルに設定している場合は、プロセスのメトリクスが 2 つのサービスにタグ付けされます。
これによってメトリクスの解釈に相違が生じることがあるため、
`service` タグはプロセスチェックのコンフィギュレーションのみで構成することをお勧めします。

[1]: /ja/agent/guide/agent-configuration-files
[2]: /ja/integrations/process
{{% /tab %}}
{{< /tabs >}}

### サーバーレス環境

#### AWS Lambda 関数

AWS Lambda ベースのサーバーレスアプリケーションの構築およびデプロイ方法により、`env`、`service`、`version` タグをメトリクス、トレース、およびログに適用する方法はいくつかあります。

*注*: これらのタグは、環境変数の代わりに AWS リソースタグにより指定されます。特に、`DD_ENV`、`DD_SERVICE`、`DD_VERSION` の環境変数には対応していません。

{{< tabs >}}

{{% tab "Serverless Framework" %}}

[タグ][1]オプションを使用して Lambda 関数をタグ付けします。

```yaml
# serverless.yml
service: service-name
provider:
  name: aws
  # タグをすべての関数に適用するには
  tags:
    env: "<ENV>"
    service: "<SERVICE>"
    version: "<VERSION>"

functions:
  hello:
    # この関数は、上記で構成されたサービスレベルのタグを継承します
    handler: handler.hello
  world:
    # この関数は、タグを上書きします
    handler: handler.users
    tags:
      env: "<ENV>"
      service: "<SERVICE>"
      version: "<VERSION>"
```

[Datadog サーバーレスプラグイン][2]がインストールされている場合、プラグインがサーバーレスアプリケーション定義の `service` 値と `stage` 値を使用して、Lambda 関数に `service` タグと `env` タグを自動的にタグ付けします（`service` または `env` タグがすでに存在する場合を除く）。

[1]: https://www.serverless.com/framework/docs/providers/aws/guide/functions#tags
[2]: https://docs.datadoghq.com/ja/serverless/serverless_integrations/plugin
{{% /tab %}}

{{% tab "AWS SAM" %}}

[タグ][1]オプションを使用して Lambda 関数をタグ付けします。

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31
Resources:
  MyLambdaFunction:
    Type: AWS::Serverless::Function
    Properties:
      Tags:
        env: "<ENV>"
        service: "<SERVICE>"
        version: "<VERSION>"
```

[Datadog サーバーレスマクロ][2]がインストールされている場合は、`service` および `env` タグをパラーメーターとして指定することも可能です。

```yaml
Transform:
  - AWS::Serverless-2016-10-31
  - Name: DatadogServerless
    Parameters:
      service: "<SERVICE>"
      env: "<ENV>"
```


[1]: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-resource-function.html#sam-function-tags
[2]: https://docs.datadoghq.com/ja/serverless/serverless_integrations/macro
{{% /tab %}}

{{% tab "AWS CDK" %}}

[タグのクラス][1]を使用して、アプリ、スタックまたは個別の Lambda 関数をタグ付けします。[Datadog サーバーレスマクロ][2]がインストールされている場合は、`service` および `env` タグをパラーメーターとして指定することも可能です。

```javascript
import * as cdk from "@aws-cdk/core";

class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    this.addTransform("DatadogServerless");

    new cdk.CfnMapping(this, "Datadog", {
      mapping: {
        Parameters: {
          service: "<SERVICE>",
          env: "<ENV>",
        },
      },
    });
  }
}
```


[1]: https://docs.aws.amazon.com/cdk/latest/guide/tagging.html
[2]: https://docs.datadoghq.com/ja/serverless/serverless_integrations/macro
{{% /tab %}}

{{% tab "Custom" %}}

[Lambda 関数のタグ付け][1]に関する AWS のガイドに従い、`env`、`service`、`version` タグを適用します。


[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-tags.html
{{% /tab %}}

{{< /tabs >}}

CloudFormation スタックで、[Datadog Forwarder][14] 用に `DdFetchLambdaTags` オプションが `true` に設定されていることを確認します。バージョン `3.19.0` 以降、このオプションはデフォルトで `true` になっています。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/getting_started/tagging/#defining-tags
[2]: /ja/getting_started/agent
[3]: /ja/tracing/setup
[4]: /ja/getting_started/tagging/
[5]: /ja/getting_started/tagging/assigning_tags?tab=noncontainerizedenvironments
[6]: /ja/getting_started/agent/autodiscovery
[7]: /ja/agent/docker/integrations/?tab=docker
[8]: /ja/agent/docker/?tab=standard#optional-collection-agents
[9]: /ja/getting_started/tracing/
[10]: /ja/getting_started/logs/
[11]: /ja/integrations/statsd/
[12]: https://www.chef.io/
[13]: https://www.ansible.com/
[14]: /ja/serverless/forwarder/