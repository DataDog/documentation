---
further_reading:
- link: https://www.datadoghq.com/blog/datadog-container-image-view/
  tag: ブログ
  text: Datadog Container Monitoring のコンテナイメージによるトラブルシューティングワークフローの強化
- link: /security/cloud_security_management/vulnerabilities
  tag: ドキュメント
  text: Cloud Security Management Vulnerabilities
- link: /security/cloud_security_management/setup/csm_pro/?tab=aws#configure-the-agent-for-containers
  tag: ドキュメント
  text: コンテナイメージの脆弱性のセットアップ
- link: /security/cloud_security_management/troubleshooting/vulnerabilities/
  tag: ドキュメント
  text: Cloud Security Management Vulnerabilities のトラブルシューティング
kind: ドキュメント
title: Container Images View
---

## 概要

Datadog の[コンテナイメージビュー][1]は、環境で使用されているすべてのイメージに関する重要な洞察を提供し、それらのデプロイメントの足跡を評価するのに役立ちます。また、複数のコンテナに影響する可能性のあるセキュリティやパフォーマンスの問題を検出して修正することもできます。インフラストラクチャーの健全性に影響するイメージの問題をトラブルシューティングするために、コンテナイメージの詳細を他のコンテナデータと一緒に表示することができます。さらに、[Cloud Security Management][2] (CSM) からコンテナイメージに見つかった脆弱性を表示し、セキュリティ対策の効率化に役立てることができます。

{{< img src="security/vulnerabilities/container_images.png" alt="脆弱性をハイライトするコンテナイメージビューとコンテナ列のソート機能" width="100%">}}

The [container image trends view][9] provides high-level insights across all of your images in your containerized infrastructure. Container image trends metrics can help you answer key questions about your security posture and deployment footprint over the span of weeks and months.

{{< img src="infrastructure/containerimages/container_image_trends.png" alt="The container images trends view highlighting image size, image age, vulnerabilities and running container count metrics" width="100%">}}

## コンテナイメージビューの構成

コンテナイメージビューのイメージは、いくつかの異なるソース (Live Containers、Image Collection、Amazon ECR) から収集されます。以下の手順では、これらの各ソースからのイメージを有効にする方法を説明します。

### ライブコンテナ

ライブコンテナ収集を有効にするには、[コンテナ][3]のドキュメントを参照してください。このドキュメントには、Process Agent の有効化、コンテナの除外と包含に関する情報が記載されています。

### イメージの収集

Datadog はコンテナイメージのメタデータを収集し、関連するコンテナや [Cloud Security Management][8] (CSM) の脆弱性に関するデバッグのコンテキストを強化します。

#### Enable container image collection

{{< tabs >}}
{{% tab "Kubernetes (Operator)" %}}

In Datadog Operator v1.3.0+, image collection is enabled by default. If you are using an older version of the Datadog Operator, Datadog recommends that you update it to v1.3.0+.


{{% /tab %}}

{{% tab "Kubernetes (Helm)" %}}

In the Datadog Helm chart v3.46.0+, image collection is [enabled by default][1]. To verify this, or if you are using an earlier Helm chart version, ensure that `datadog.containerImageCollection.enabled` is set to `true` in `datadog-values.yaml`.

```yaml
datadog:
  containerImageCollection:
    enabled: true
```
[1]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml#L651
{{% /tab %}}

{{% tab "ECS EC2" %}}

To enable container image collection on your [ECS EC2 instances][1], add the following environment variables to your `datadog-agent` container definition:

```yaml
{
    "containerDefinitions": [
        {
            "name": "datadog-agent",
             ...
            "environment": [
              ...
              {
                "name": "DD_CONTAINER_IMAGE_ENABLED",
                "value": "true"
              }
            ]
        }
    ]
  ...
}
```

[1]: https://docs.datadoghq.com/ja/containers/amazon_ecs/?tab=awscli#setup

{{% /tab %}}

{{% tab "ホスト" %}}

`datadog.yaml` コンフィギュレーションファイルに以下を追加します。

```yaml
container_image:
  enabled: true
```

[1]: /ja/containers/amazon_ecs/?tab=awscli#setup
{{% /tab %}}
{{< /tabs >}}

#### Enable SBOM collection

The following instructions turn on [Software Bill of Materials][5] (SBOM) collection for CSM Vulnerabilities. SBOM collection enables automatic detection of container image vulnerabilities. Vulnerabilities are evaluated and scanned against your containers every hour. Vulnerability management for container images is included in [CSM Pro and Enterprise plans][10].

**注**: CSM Vulnerabilities 機能は AWS Fargate または Windows 環境では利用できません。

{{< tabs >}}
{{% tab "Kubernetes (Operator)" %}}

Add the following to the spec section of your `datadog-agent.yaml` file:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  features:
    # ...
    sbom:
      enabled: true
      containerImage:
        enabled: true
```

{{% /tab %}}

{{% tab "Kubernetes (Helm)" %}}

Add the following to your `datadog-values.yaml` Helm configuration file:

```yaml
datadog:
  sbom:
    containerImage:
      enabled: true
```
[1]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml#L651
{{% /tab %}}

{{% tab "ECS EC2" %}}

[ECS EC2 インスタンス][1]でコンテナイメージの脆弱性スキャンを有効にするには、`datadog-agent` コンテナ定義に以下の環境変数を追加します。

```yaml
{
    "containerDefinitions": [
        {
            "name": "datadog-agent",
             ...
            "environment": [
              ...
              {
                "name": "DD_SBOM_ENABLED",
                "value": "true"
              },
              {
                "name": "DD_SBOM_CONTAINER_IMAGE_ENABLED",
                "value": "true"
              }
            ]
        }
    ]
  ...
}
```

Agent がコンテナイメージから SBOM を抽出できない場合は、コンテナ定義の Agent メモリを増やしてください。

```yaml
{
    "containerDefinitions": [
        {
            "name": "datadog-agent",
            "memory": 256,
            ...
        }
     ]
    ...
}
```
[1]: https://docs.datadoghq.com/ja/containers/amazon_ecs/?tab=awscli#setup

{{% /tab %}}

{{% tab "ホスト" %}}

`datadog.yaml` コンフィギュレーションファイルに以下を追加します。

```yaml
sbom:
  enabled: true
  container_image:
    enabled: true
```

[1]: /ja/containers/amazon_ecs/?tab=awscli#setup
{{% /tab %}}
{{< /tabs >}}

### コンテナレジストリ

#### Amazon Elastic Container Registry (Amazon ECR)

Amazon ECR からコンテナイメージのメタデータのクロールを開始するために、[AWS インテグレーション][4]をセットアップします。

## Configure container images trends

Use the container image trends configuration modal and toggle **Enable Container Image Metric Collection** to turn on image metric generation.

Image metrics are collected from the [Live Containers](#live-containers) and [Image Check](#image-collection) sources. Follow the same instructions as above to ensure that these collections are enabled across your entire infrastructure and take full advantage of the trends view.

{{< img src="infrastructure/containerimages/container_image_trends_configuration_modal.png" alt="The container images trends configuration modal" width="100%">}}

## コンテナイメージのタグ付け

Agent の [extract labels as tags][6] 構成により、コンテナイメージに任意のタグを付け、リッチ化します。これらのタグはコンテナイメージのチェックで選択されます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/container-images
[2]: /ja/security/cloud_security_management
[3]: /ja/infrastructure/containers/?tab=docker#setup
[4]: /ja/integrations/amazon_web_services/
[5]: https://www.cisa.gov/sbom
[6]: /ja/containers/docker/tag/?tab=containerizedagent#extract-labels-as-tags
[8]: /ja/security/cloud_security_management/vulnerabilities
[9]: https://app.datadoghq.com/container-images/image-trends
[10]: https://www.datadoghq.com/pricing/?product=cloud-security-management#products