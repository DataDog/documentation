---
title: 基本の Agent オートディスカバリー
kind: ドキュメント
aliases:
  - /ja/agent/autodiscovery/basic_autodiscovery
further_reading:
  - link: /agent/kubernetes/integrations/
    tag: ドキュメント
    text: オートディスカバリーのインテグレーションテンプレートの作成とロード
  - link: /agent/guide/ad_identifiers/
    tag: ドキュメント
    text: コンテナと該当するインテグレーションテンプレートとの対応
  - link: /agent/guide/autodiscovery-management/
    tag: ドキュメント
    text: Agent オートディスカバリーに含めるコンテナの管理
  - link: /agent/kubernetes/tag/
    tag: ドキュメント
    text: アプリケーションのタグの動的割り当てと収集
  - link: /integrations/faq/integration-setup-ecs-fargate/?tab=rediswebui
    tag: faq
    text: ECS Fargate のインテグレーションセットアップ
  - link: /agent/guide/secrets-management/
    tag: ドキュメント
    text: 機密情報管理
---
## 概要

コンテナ化されたインフラストラクチャーを監視している場合に発生する課題として、コンテナがホストからホストに移動できることがあります。コンテナ化されたシステムの動的な性質により、手動での監視が困難になります。

この問題を解決するには、Datadog のオートディスカバリー機能を使用して、特定のコンテナで実行されているサービスを自動的に識別し、それらのサービスからデータを収集します。コンテナが起動するたびに、Datadog Agent はこの新しいコンテナで実行されているサービスを識別し、対応する監視構成を探して、メトリクスの収集を開始します。

オートディスカバリーを使用すると、Agent チェックの構成テンプレートを定義し、各チェックをどのコンテナに適用するかを指定できます。

Agent はコンテナの作成、廃棄、起動、停止などのイベントを監視します。次に Agent は、イベント発生時に静的チェック構成を有効化、無効化、または再生成します。Agent は、実行中のコンテナを調査する際に、ロードしたいずれかのテンプレートのいずれかの[オートディスカバリーコンテナ識別子][1]にそのコンテナが一致するかどうかをチェックします。一致が見つかると、Agent はそれぞれについて、一致したコンテナの特定の値を[テンプレート変数][2]に代入することにより、静的チェック構成を生成します。さらに、その静的構成を使用してチェックを有効にします。

## オートディスカバリーの動作

{{< img src="agent/autodiscovery/ad_1.png" alt="オートディスカバリーの概要"  style="width:80%;">}}

上の図では、Redis ポッドと Agent ポッドを含む 3 つのポッドを持つホストノードがあります。コンテナをスケジュールする Kubelet は、このノードでバイナリとして実行され、エンドポイント `/metrics` と `/pods` を公開します。10 秒ごとに、Agent は `/pods` をクエリし、Redis 仕様を見つけます。また、Redis ポッド自体に関する情報も表示できます。

この例の Redis 仕様には、次のアノテーションが含まれています。

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

上記の例では、`tags.datadoghq.com` ラベルは、Redis ポッドに発行されるすべてのログとメトリクスのタグとして `env`、`service`、さらには `version` を設定します。
これらの標準ラベルは、[統合サービスタグ付け][3]の一部です。ベストプラクティスとして、Datadog ではタグおよび環境変数の構成には統合サービスタグ付けを使用することをおすすめします。

`check_names` には実行するチェックの名前が含まれ、`init_configs` には最小収集間隔などの構成パラメーターが含まれます。`instances` の各項目は、チェックの 1 つのインスタンスに対して実行するコンフィギュレーションを表します。この例では、`%%host%%` はコンテナの IP が動的に入力されるテンプレート変数であることに注意してください。

これから、Agent は静的チェック構成を生成します。

## セットアップ

インフラストラクチャーのオートディスカバリーを設定するには、次の 2 つの手順が必要です。

1. Datadog Agent に対して[オートディスカバリーを有効にします](#enable-autodiscovery)。
2. 監視するサービスごとに[インテグレーション固有のコンフィギュレーションテンプレート](#インテグレーションテンプレート)を作成します。Datadog は、Apache や Redis を含む[いくつかの一般的なコンテナ化されたサービス][4]の自動コンフィギュレーションテンプレートを提供することに注意してください。

### オートディスカバリーを有効にする

#### ホスト上の Agent で

{{< tabs >}}
{{% tab "Docker" %}}

`datadog.yaml` [構成ファイル][1]に次の構成ブロックを追加します。

```yaml
listeners:
  - name: docker
config_providers:
  - name: docker
    polling: true
```

[1]: /ja/agent/guide/agent-configuration-files/?tab=agentv6#agent-main-configuration-file
{{% /tab %}}
{{% tab "Kubernetes" %}}

`datadog.yaml` [構成ファイル][1]に次の構成ブロックを追加します。

```yaml
listeners:
  - name: kubelet
config_providers:
  - name: kubelet
    polling: true
  # 以前の Docker ラベル構成テンプレートをサポートするために必要
  - name: docker
    polling: true
```

[1]: /ja/agent/guide/agent-configuration-files/?tab=agentv6#agent-main-configuration-file
{{% /tab %}}
{{% tab "ECS Fargate" %}}

ECS Fargate は、ホストでバイナリとして実行している Datadog Agent では監視できません。

{{% /tab %}}
{{< /tabs >}}

#### コンテナとしての Agent で

{{< tabs >}}
{{% tab "Docker" %}}

Docker コンテナに対してオートディスカバリーを自動的に有効にするには、`/var/run/docker.sock` をコンテナ化 Agent にマウントします。Windows では、`\\.\pipe\docker_engine` をマウントします。

{{% /tab %}}
{{% tab "Kubernetes" %}}

Kubernetes ではデフォルトでオートディスカバリーが有効になっています。

これを確認するには、次の環境変数が設定されていることを確認します。

```shell
KUBERNETES=yes
```

{{% /tab %}}
{{% tab "ECS Fargate" %}}

Kubernetes 内のコンテナに対してオートディスカバリーを有効にするには、コンテナ化 Agent を起動するときに次の環境変数を追加します。

```shell
ECS_FARGATE=true
```

{{% /tab %}}
{{< /tabs >}}

### インテグレーションテンプレート

オートディスカバリーが有効になると、Datadog Agent は、デフォルトのオートディスカバリーコンフィギュレーションファイルに基づいて、Apache や Redis を含む[多くのサービスに対して][4]オートディスカバリーを自動的に試行します。

インテグレーションテンプレートは、Kubernetes ポッドアノテーション、Docker ラベル、Agent 内にマウントされた構成ファイル、ConfigMap、および key-value ストアとして、複数の形式で定義できます。

次の例では、ポッドの `env`、`service`、`version` データをタグ付けするために `tags.datadoghq.com` Kubernetes ラベルが使用されています。

Redis インテグレーションテンプレートは、Kubernetes ポッドアノテーションで定義されます。これには、カスタムの `password` パラメーターが含まれ、すべてのログに正しい `source` がタグ付けされます。

```yaml
apiVersion: v1
kind: Pod
metadata:
  ## ポッドの名前
  name: my-redis
  labels:
    ## 統合サービスタグ付けに標準ラベルを設定
    tags.datadoghq.com/redis.env: prod
    tags.datadoghq.com/redis.service: my-redis
    tags.datadoghq.com/redis.version: "6.0.3"
  annotations:
    ## チェックの名前。integrations_core リポジトリの名前に一致
    ad.datadoghq.com/redis.check_names: '["redisdb"]'
    ## 最小収集間隔などのいくつかの構成
    ad.datadoghq.com/redis.init_configs: '[{}]'
    ad.datadoghq.com/redis.instances: |
      [
        ## チェックの 1 つのインスタンスに対して実行する構成
        {
          "host": "%%host%%",
          "port":"6379",
          "password":"%%env_REDIS_PASSWORD%%"
        }
      ]
    ## ログ収集のセットアップ
    ad.datadoghq.com/redis.logs: '[{"source":"redis"}]'
spec:
  containers:
    - name: redis
      image: httpd
      ports:
        - containerPort: 80
```

他のサービスでオートディスカバリーを使用するには、監視するサービスのテンプレートを定義します。詳細については、[オートディスカバリーインテグレーションテンプレート][5]のドキュメントを参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/guide/ad_identifiers/
[2]: /ja/agent/faq/template_variables/
[3]: /ja/getting_started/tagging/unified_service_tagging
[4]: /ja/agent/faq/auto_conf/
[5]: /ja/agent/kubernetes/integrations/
