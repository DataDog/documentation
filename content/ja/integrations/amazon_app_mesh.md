---
categories:
- AWS
- クラウド
- ログの収集
- ネットワーク
- トレーシング
creates_events: false
dependencies: []
description: AWS App Mesh はオープンソースのエッジおよびサービスプロキシです。
display_name: AWS App Mesh
draft: false
further_reading:
- link: https://docs.datadoghq.com/integrations/envoy/
  tag: ドキュメント
  text: Envoy インテグレーション
git_integration_title: amazon_app_mesh
guid: 04669673-120b-48c9-a855-06d57d92c7cf
integration_id: amazon-app-mesh
integration_title: AWS App Mesh
integration_version: ''
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: envoy.
metric_to_check: envoy.stats.overflow
name: amazon_app_mesh
public_title: Datadog-AWS App Mesh インテグレーション
short_description: AWS App Mesh はオープンソースのエッジおよびサービスプロキシです。
support: コア
supported_os:
- linux
- mac_os
- windows
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

[AWS App Mesh][1] は、Amazon ECS Fargate クラスターや AWS EKS クラスターで実行するマイクロサービスにアプリケーションレベルのネットワーキングを提供するサービスメッシュです。


## 計画と使用

{{< tabs >}}
{{% tab "EKS" %}}

下記の指示に従って、Envoy と呼ばれる AWS App Mesh のサイドカープロキシのメトリクスの収集を有効にします。デプロイ、後でデプロイをパッチ、AWS App Mesh インジェクターコントローラーを使用、のいずれかの方法を選択してサイドカーを追加します。どの方法を選択しても、下記のステップで実行できます。

#### メトリクスの収集

**前提条件**: [EKS インテグレーション][1]ドキュメントを参考にして、Datadog Agent を Kubernetes クラスターで DaemonSet としてデプロイします。

1. App Mesh の制限により、EKS から Datadog へメトリクスを転送するには Egress フィルターを `Allow External Traffic` に設定する必要があります。

2. クラスターで ConfigMap を作成し、各ポッドに追加されている App Mesh の Envoy サイドカーを自動的に検出します。

    ```yaml
      apiVersion: v1
      kind: ConfigMap
      metadata:
      name: datadog-config
      data:
      envoy: |-
        ad_identifiers:
        - aws-appmesh-envoy
        init_config:
        instances:
        - stats_url: http://%%host%%:9901/stats
          tags:
            - <TAG_KEY>:<TAG_VALUE>  # Example - cluster:eks-appmesh
    ```

3. Datadog Agent の DaemonSet YAML ファイルで `volumeMounts` オブジェクトをアップデートします。

    ```yaml
          volumeMounts:
           - name: datadog-config
             mountPath: /conf.d
    ```

4. Datadog Agent の DaemonSet YAML ファイルで `volumes` オブジェクトをアップデートします。

    ```yaml
         volumes:
          - name: datadog-config
            configMap:
              name: datadog-config
              items:
              - key: envoy
                path: envoy.yaml
    ```

#### 収集データ

{{< site-region region="us3" >}}

ログ収集は、このサイトではサポートされていません。

{{< /site-region >}}

{{< site-region region="us,eu,gov" >}}

ログの収集を有効にするには、[Kubernetes ログ収集の説明][1]に従って Agent の DaemonSet をアップデートします。

[1]: https://docs.datadoghq.com/ja/integrations/ecs_fargate/#log-collection

{{< /site-region >}}

#### トレースの収集

namespace を選択して、`datadog-agent` とサービス (例: `monitoring`) をデプロイします。オプションでこれを使用し、以下のように appmesh-injector をデプロイします。

    ```shell
      helm upgrade -i appmesh-controller eks/appmesh-controller \
      --namespace appmesh-system \
      --set sidecar.logLevel=debug \
      --set tracing.enabled=true \
      --set tracing.provider=datadog \
      --set tracing.address=ref:status.hostIP \
      --set tracing.port=8126
    ```


または、[EKS を使用した App Mesh][2] ドキュメントの説明に従って、オプションの `enable-datadog-tracing=true` や環境変数の `ENABLE_DATADOG_TRACING=true` を使用して appmesh インジェクターをデプロイすることもできます。


[1]: https://docs.datadoghq.com/ja/integrations/amazon_eks/
[2]: https://github.com/aws/aws-app-mesh-examples/blob/master/walkthroughs/eks/base.md#install-app-mesh--kubernetes-components
{{% /tab %}}
{{% tab "ECS Fargate" %}}

#### メトリクスの収集

**前提条件**: [ECS Fargate インテグレーション][1]ドキュメントを参考にして、有効化された App Mesh (Envoy サイドカーがインジェクト済みなど) により Datadog Agent を各 Fargate タスク定義に追加します。

1. App Mesh の制限により、ECS から Datadog へメトリクスを転送するには Egress フィルターを `Allow External Traffic` に設定する必要があります。

2. 下記の Docker ラベルを使用して、Envoy サイドカーと Datadog Agent を含むタスク定義をアップデートします。詳細については、[ECS Fargate インテグレーションのセットアップ][2]をご参照ください。

    ```text
        "dockerLabels": {
              com.datadoghq.ad.instances : [{"stats_url": "http://%%host%%:9901/stats"}]
              com.datadoghq.ad.check_names : ["envoy"]
              com.datadoghq.ad.init_configs : [{}]
            },
    ```

#### 収集データ

{{< site-region region="us3" >}}

ログ収集は、このサイトではサポートされていません。

{{< /site-region >}}

{{< site-region region="us,eu,gov" >}}

[ECS Fargate インテグレーションドキュメント][1]の説明に従って、ログの収集を有効化します。

[1]: https://docs.datadoghq.com/ja/integrations/ecs_fargate/#log-collection

{{< /site-region >}}

#### トレースの収集

1. [ECS Fargate インテグレーション][3]ドキュメントの説明に従って、トレースの収集を有効化します。

AWS App Mesh パラメーター `ENABLE_ENVOY_DATADOG_TRACING` および `DATADOG_TRACER_PORT` を ECS Fargate タスク定義の環境変数として設定します。詳細は [AWS App Mesh][4] ドキュメントを参照してください。


[1]: https://docs.datadoghq.com/ja/integrations/ecs_fargate/
[2]: https://docs.datadoghq.com/ja/integrations/faq/integration-setup-ecs-fargate/
[3]: https://docs.datadoghq.com/ja/integrations/ecs_fargate/#trace-collection
[4]: https://docs.aws.amazon.com/app-mesh/latest/userguide/envoy.html
{{% /tab %}}
{{% tab "ECS EC2" %}}

#### メトリクスの収集

**前提条件**: [ECS インテグレーション][1]ドキュメントを参考にして、有効化された App Mesh (Envoy サイドカーがインジェクト済みなど) により、Datadog Agent を各  ECS EC2 タスク定義に追加します。

1. App Mesh の制限により、ECS から Datadog へメトリクスを転送するには Egress フィルターを `Allow External Traffic` に設定する必要があります。

2. 下記の Docker ラベルを使用して、Envoy サイドカーと Datadog Agent を含むタスク定義をアップデートします。詳細については、[ECS Fargate インテグレーションのセットアップ][2]をご参照ください。

    ```text
        "dockerLabels": {
              com.datadoghq.ad.instances : [{"stats_url": "http://%%host%%:9901/stats"}]
              com.datadoghq.ad.check_names : ["envoy"]
              com.datadoghq.ad.init_configs : [{}]
            },
    ```

#### 収集データ

{{< site-region region="us3" >}}

ログ収集は、このサイトではサポートされていません。

{{< /site-region >}}

{{< site-region region="us,eu,gov" >}}

[ECS インテグレーションドキュメント][1]の説明に従って、ログの収集を有効化します。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_ecs/#log-collection

{{< /site-region >}}

#### トレースの収集

1. [ECS インテグレーション][3]ドキュメントの説明に従って、トレースの収集を有効化します。

2. AWS App Mesh パラメーター `ENABLE_ENVOY_DATADOG_TRACING` および `DATADOG_TRACER_PORT` を ECS タスク定義の環境変数として設定します。詳細は [AWS App Mesh][4] ドキュメントを参照してください。


[1]: https://docs.datadoghq.com/ja/integrations/amazon_ecs/
[2]: https://docs.datadoghq.com/ja/integrations/faq/integration-setup-ecs-fargate/
[3]: https://docs.datadoghq.com/ja/integrations/amazon_ecs/#trace-collection
[4]: https://docs.aws.amazon.com/app-mesh/latest/userguide/envoy.html
{{% /tab %}}
{{< /tabs >}}

## リアルユーザーモニタリング

### データセキュリティ

メトリクス一覧については、[Envoy インテグレーション][2]をご参照ください。

### ヘルプ

AWS  App Mesh インテグレーションには、イベントは含まれません。

### ヘルプ

AWS App Mesh インテグレーションには、サービスチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://aws.amazon.com/app-mesh
[2]: https://docs.datadoghq.com/ja/integrations/envoy/#metrics
[3]: https://docs.datadoghq.com/ja/help/