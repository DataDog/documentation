---
aliases:
- /ja/agent/autodiscovery/basic_autodiscovery
- /ja/getting_started/agent/autodiscovery
- /ja/agent/autodiscovery
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
title: 基本の Agent オートディスカバリー
---

## 概要

コンテナ化されたインフラストラクチャーを監視している場合に発生する課題として、コンテナがホストからホストに移動できることがあります。コンテナ化されたシステムの動的な性質により、手動での監視が困難になります。

この問題を解決するには、Datadog のオートディスカバリー機能を使用して、特定のコンテナで実行されているサービスを自動的に識別し、それらのサービスからデータを収集します。コンテナが起動するたびに、Datadog Agent はこの新しいコンテナで実行されているサービスを識別し、対応するモニタリングコンフィギュレーションを探して、メトリクスの収集を開始します。

オートディスカバリーを使用すると、Agent チェックの構成テンプレートを定義し、各チェックをどのコンテナに適用するかを指定できます。

Agent はコンテナの作成、廃棄、起動、停止などのイベントを監視します。次に Agent は、イベント発生時に静的チェック構成を有効化、無効化、または再生成します。Agent は、実行中のコンテナを調査する際に、ロードしたいずれかのテンプレートのいずれかの[オートディスカバリーコンテナ識別子][1]にそのコンテナが一致するかどうかをチェックします。一致が見つかると、Agent はそれぞれについて、一致したコンテナの特定の値を[テンプレート変数][2]に代入することにより、静的チェック構成を生成します。さらに、その静的構成を使用してチェックを有効にします。

## UDS の仕組み

{{< img src="agent/autodiscovery/ad_1.png" alt="オートディスカバリーの概要" style="width:80%;">}}

上の図では、Redis ポッドと Agent ポッドを含む 3 つのポッドを持つホストノードがあります。コンテナをスケジュールする Kubelet は、このノードでバイナリとして実行され、エンドポイント `/metrics` と `/pods` を公開します。10 秒ごとに、Agent は `/pods` をクエリし、Redis 仕様を見つけます。また、Redis ポッド自体に関する情報も表示できます。

この例の Redis 仕様には、次のアノテーションが含まれています。

{{< tabs >}}

{{% tab "AD Annotations v2 (Agent 7.36+)" %}}
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

上記の例では、`tags.datadoghq.com` ラベルは、Redis ポッドに発行されるすべてのログとメトリクスのタグとして `env`、`service`、さらには `version` を設定します。
これらの標準ラベルは、[統合サービスタグ付け][1]の一部です。ベストプラクティスとして、DatadogDatadog ではタグおよび環境変数の構成には統合サービスタグ付けを使用することをおすすめします。

`redisdb` は実行するチェックの名前です。`init_config` には最小収集間隔などの構成パラメーターが含まれ、これはオプションです。`instances` の各項目は、チェックの 1 つのインスタンスに対して実行するコンフィギュレーションを表します。**注**: この例では、`%%host%%` はコンテナの IP が動的に入力されるテンプレート変数です。

[1]: /ja/getting_started/tagging/unified_service_tagging
{{% /tab %}}

{{% tab "AD Annotations v1" %}}
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
これらの標準ラベルは、[統合サービスタグ付け][1]の一部です。ベストプラクティスとして、DatadogDatadog ではタグおよび環境変数の構成には統合サービスタグ付けを使用することをおすすめします。

`check_names` には実行するチェックの名前が含まれ、`init_configs` には最小収集間隔などの構成パラメーターが含まれます。`instances` の各項目は、チェックの 1 つのインスタンスに対して実行するコンフィギュレーションを表します。**注**: この例では、`%%host%%` はコンテナの IP が動的に入力されるテンプレート変数です。

[1]: /ja/getting_started/tagging/unified_service_tagging
{{% /tab %}}

{{< /tabs >}}

これから、Agent は静的チェック構成を生成します。

## セットアップ

インフラストラクチャーのオートディスカバリーを設定するには、次の 2 つの手順が必要です。

1. Datadog Agent に対して[オートディスカバリーを有効にします](#enable-autodiscovery)。
2. 監視するサービスごとに[インテグレーション固有のコンフィギュレーションテンプレート](#インテグレーションテンプレート)を作成します。**注**: Datadog は、Apache や Redis を含む[いくつかの一般的なコンテナ化されたサービス][3]の自動コンフィギュレーションテンプレートを提供します。

### オートディスカバリーを有効にする

Agent は、到達可能なソケットや API エンドポイント (Docker、containerd、Kubernetes APIなど) を自動的に検出するだけでなく、オートディスカバリーを有効化することも可能です。

オートディスカバリーが機能しない場合、`agent status` を実行して検出された機能を確認します。

自動検出に失敗した場合や、自動検出した機能を無効にしたい場合は、`datadog.yaml` に以下の構成パラメーターを記述して、機能を含めたり外したりすることができます。
```yaml
autoconfig_exclude_features:
- docker
autoconfig_include_features:
- containerd
```

自動的に検出された機能の完全なリストは `datadog.yaml` テンプレートで利用できます。

### インテグレーションテンプレート

オートディスカバリーが有効になると、Datadog Agent は、デフォルトのオートディスカバリーコンフィギュレーションファイルに基づいて、Apache や Redis を含む複数の[サービス][3]に対してオートディスカバリーを自動的に試行します。

インテグレーションテンプレートは、Kubernetes ポッドアノテーション、Docker ラベル、Agent 内にマウントされた構成ファイル、ConfigMap、および key-value ストアとして、複数の形式で定義できます。詳しくは、[オートディスカバリーインテグレーションテンプレート][4]のドキュメントをご覧ください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/guide/ad_identifiers/
[2]: /ja/agent/faq/template_variables/
[3]: /ja/agent/faq/auto_conf/
[4]: /ja/agent/kubernetes/integrations/