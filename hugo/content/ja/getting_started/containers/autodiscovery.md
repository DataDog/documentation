---
aliases:
- /ja/agent/autodiscovery/basic_autodiscovery
- /ja/getting_started/agent/autodiscovery
- /ja/agent/autodiscovery
description: Datadog Agent の Autodiscovery を使用して、コンテナ化されたサービスを自動的に監視します。テンプレートを設定して、コンテナ全体でサービスを動的に検出および監視します。
further_reading:
- link: /agent/kubernetes/integrations/
  tag: ドキュメント
  text: Autodiscovery インテグレーションテンプレートの作成と読み込み
- link: /containers/guide/configure-autodiscovery-with-the-datadoginstrumentation-crd/
  tag: ドキュメント
  text: DatadogInstrumentation CRD を使用した Autodiscovery の設定
- link: /agent/guide/ad_identifiers/
  tag: ドキュメント
  text: コンテナと対応するインテグレーションテンプレートの照合
- link: /agent/guide/autodiscovery-management/
  tag: ドキュメント
  text: Agent Autodiscovery に含めるコンテナの管理
- link: /agent/kubernetes/tag/
  tag: ドキュメント
  text: アプリケーションからタグを動的に割り当てて収集する
- link: /integrations/faq/integration-setup-ecs-fargate/?tab=rediswebui
  tag: faq
  text: ECS Fargate のインテグレーション設定
- link: /agent/configuration/secrets-management/
  tag: ドキュメント
  text: シークレット管理
title: 基本的な Agent Autodiscovery
---
## 概要 {#overview}

コンテナ化されたインフラストラクチャーの監視中に、コンテナがホスト間を移動する可能性があるという課題が生じます。コンテナ化されたシステムは動的な性質を持つため、手動で監視することは困難です。

この問題を解決するために、Datadog の Autodiscovery 機能を使用して、特定のコンテナで実行されているサービスを自動的に識別し、それらのサービスからデータを収集することができます。コンテナが起動するたびに、Datadog Agent はその新しいコンテナでどのサービスが実行されているかを識別し、対応する監視設定を探して、メトリクスの収集を開始します。

Autodiscovery を使用すると、Agent チェックの設定テンプレートを定義し、各チェックをどのコンテナに適用するかを指定できます。

Agent は、コンテナの作成、破棄、開始、停止といったイベントを監視します。その後、Agent はこれらのイベントに応じて、静的なチェック設定を有効化、無効化、および再生成します。Agent は、実行中の各コンテナを検査する際に、そのコンテナが、読み込まれたテンプレートの [Autodiscovery コンテナ識別子][1] のいずれかと一致するかどうかを確認します。一致するたびに、Agent は [テンプレート変数][2] を一致したコンテナ固有の値に置き換えることで、静的なチェック設定を生成します。その後、静的設定を使用してチェックを有効にします。

## 仕組み{#how-it-works}

{{< img src="agent/autodiscovery/ad_1.png" alt="Autodiscovery の概要" style="width:80%;">}}

上の図では、Redis Pod と Agent Pod を含む、3 つの Pod を持つホストノードがあります。コンテナをスケジュールする Kubelet は、このノード上でバイナリとして実行され、エンドポイント `/metrics` と `/pods` を公開します。Agent は 10 秒ごとに `/pods` にクエリを実行し、Redis 仕様を見つけます。また、Redis Pod 自体に関する情報も確認できます。

この例の Redis 仕様には、以下のアノテーションが含まれています。

{{< tabs >}}

{{% tab "AD アノテーション v2 (Agent 7.36 以降)" %}}

```yaml
labels:
  tags.datadoghq.com/redis.env: "prod"
  tags.datadoghq.com/redis.service: "my-redis"
  tags.datadoghq.com/redis.version: "6.0.3"
annotations:
  ad.datadoghq.com/redis.checks: |
    {
      "redisdb": {
        "init_config": {},
        "instances": [
          {
            "host": "%%host%%",
            "port":"6379",
            "password":"%%env_REDIS_PASSWORD%%"
          }
        ]
      }
    }
  ad.datadoghq.com/redis.logs: '[{"source":"redis"}]'
```

上記の例では、`tags.datadoghq.com` ラベルによって、Pod の`redis` コンテナから出力されるすべてのログとメトリクスのタグとして、`env`、`service`、さらには`version` が設定されます。これらの標準ラベルは、[unified service tagging][1] の一部です。ベストプラクティスとして、Datadog ではタグや環境変数を設定する際に unified service tagging を使用することを推奨しています。

チェック設定のアノテーションキーは、`ad.datadoghq.com/<container-name>.checks` の形式に従います。

`redisdb`は、実行するチェックの名前です。`init_config` には、オプションで指定できる最小収集間隔などの設定パラメータがいくつか含まれています。`instances` の各項目は、チェックの 1 インスタンスを実行するための設定を表します。**注**: この例では、`%%host%%` はコンテナの IP で動的に入力されるテンプレート変数です。

[1]: /ja/getting_started/tagging/unified_service_tagging
{{% /tab %}}

{{% tab "AD アノテーション v1" %}}

```yaml
labels:
  tags.datadoghq.com/redis.env: "prod"
  tags.datadoghq.com/redis.service: "my-redis"
  tags.datadoghq.com/redis.version: "6.0.3"
annotations:
  ad.datadoghq.com/redis.check_names: '["redisdb"]'
  ad.datadoghq.com/redis.init_configs: '[{}]'
  ad.datadoghq.com/redis.instances: |
    [
      {
        "host": "%%host%%",
        "port":"6379",
        "password":"%%env_REDIS_PASSWORD%%"
      }
    ]
  ad.datadoghq.com/redis.logs: '[{"source":"redis"}]'
```

上記の例では、`tags.datadoghq.com` ラベルによって、Pod の`redis` コンテナから出力されるすべてのログとメトリクスのタグとして、`env`、`service`、さらには`version` が設定されます。これらの標準ラベルは、[unified service tagging][1] の一部です。ベストプラクティスとして、Datadog ではタグや環境変数を設定する際に unified service tagging を使用することを推奨しています。

チェック設定のアノテーションキーは、`ad.datadoghq.com/<container-name>.check_names`、`ad.datadoghq.com/<container-name>.init_configs`、および`ad.datadoghq.com/<container-name>.instances` の形式に従います。

`check_names`には実行するチェックの名前が含まれ、`init_configs` には最小収集間隔などの設定パラメータが含まれます。`instances` の各項目は、チェックの 1 インスタンスを実行するための設定を表します。**注**: この例では、`%%host%%` はコンテナの IP で動的に入力されるテンプレート変数です。

[1]: /ja/getting_started/tagging/unified_service_tagging
{{% /tab %}}

{{< /tabs >}}

Agent はこれに基づいて静的なチェック設定を生成します。

## 設定 {#setup}

インフラストラクチャーで Autodiscovery を設定するには、次の 2 つの手順が必要です。

1. [Datadog Agent の Autodiscovery を有効にします ](#enable-autodiscovery)。
2. 監視対象の各サービスに対して、[インテグレーション固有の設定テンプレート ](#integration-templates) を作成します。**注**: Datadog には、Apache や Redis など [一般的なコンテナ化サービス][3] 向けの自動設定テンプレートが備わっています。

### Autodiscovery を有効にする {#enable-autodiscovery}

Agent は、到達可能なソケットや API エンドポイント (Docker、containerd、Kubernetes API など) を自動的に検出するだけでなく、Autodiscovery も有効にします。

Autodiscovery が機能しない場合は、`agent status`を実行し、検出された機能を確認してください。

自動検出が失敗した場合や、自動検出された機能を無効にしたい場合は、`datadog.yaml` 内のこれらの設定パラメータを使用して、機能を含めるか除外してください。

```yaml
autoconfig_exclude_features:
- docker
autoconfig_include_features:
- containerd
```

自動検出された機能の完全な一覧は、`datadog.yaml` テンプレートで確認できます。

### インテグレーションテンプレート {#integration-templates}

Autodiscovery が有効になると、Datadog Agent はデフォルトの Autodiscovery 設定ファイルに基づいて、Apache や Redis などの [サービス][3] に対して自動的に Autodiscovery を試行します。

インテグレーションテンプレートは、Kubernetes Pod アノテーション、Docker ラベル、Agent 内にマウントされた設定ファイル、ConfigMap、キーバリュー型ストアなど、複数の形式で定義できます。詳細については、[Autodiscovery インテグレーションテンプレート][4] のドキュメントを参照してください。

Kubernetes では、Pod アノテーションの代わりに、`DatadogInstrumentation`カスタムリソースを使用して特定のワークロード向けのチェックを設定することもできます。[DatadogInstrumentation CRD を使用した Autodiscovery の設定][5] を参照してください。

### 注 {#notes}

Autodiscovery を使用しており、新しいノードにアプリケーションがデプロイされた場合、Datadog にメトリクスが表示されるまでに多少の遅延が発生することがあります。新しいノードに切り替えると、Datadog Agent がアプリケーションからメタデータを収集するために時間がかかります。

## 参考文献 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/guide/ad_identifiers/
[2]: /ja/agent/faq/template_variables/
[3]: /ja/agent/faq/auto_conf/
[4]: /ja/agent/kubernetes/integrations/
[5]: /ja/containers/guide/configure-autodiscovery-with-the-datadoginstrumentation-crd/