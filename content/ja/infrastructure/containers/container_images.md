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
title: コンテナイメージビュー
---

## 概要

Datadog の[コンテナイメージビュー][1]は、環境で使用されているすべてのイメージに関する重要な洞察を提供し、それらのデプロイメントの足跡を評価するのに役立ちます。また、複数のコンテナに影響する可能性のあるセキュリティやパフォーマンスの問題を検出して修正することもできます。インフラストラクチャーの健全性に影響するイメージの問題をトラブルシューティングするために、コンテナイメージの詳細を他のコンテナデータと一緒に表示することができます。さらに、[Cloud Security Management][2] (CSM) からコンテナイメージに見つかった脆弱性を表示し、セキュリティ対策の効率化に役立てることができます。

{{< img src="security/vulnerabilities/container_images.png" alt="脆弱性をハイライトするコンテナイメージビューとコンテナ列のソート機能" width="100%">}}

[コンテナイメージのトレンドビュー][9]は、コンテナ化されたインフラストラクチャー内のすべてのイメージに関するおおまかな洞察を提供します。コンテナイメージのトレンドメトリクスは、数週間から数か月にわたるセキュリティ態勢やデプロイのフットプリントに関する重要なポイントを把握するのに役立ちます。

{{< img src="infrastructure/containerimages/container_image_trends.png" alt="イメージサイズ、イメージの経過時間、脆弱性、および実行中のコンテナ数のメトリクスをハイライトするコンテナイメージのトレンドビュー" width="100%">}}

## コンテナイメージビューの構成

コンテナイメージビューのイメージは、いくつかの異なるソース (Live Containers、Image Collection、Amazon ECR) から収集されます。以下の手順では、これらの各ソースからのイメージを有効にする方法を説明します。

### ライブコンテナ

ライブコンテナ収集を有効にするには、[コンテナ][3]のドキュメントを参照してください。このドキュメントには、Process Agent の有効化、コンテナの除外と包含に関する情報が記載されています。

### イメージの収集

Datadog はコンテナイメージのメタデータを収集し、関連するコンテナや [Cloud Security Management][8] (CSM) の脆弱性に関するデバッグのコンテキストを強化します。

#### コンテナイメージ収集の有効化

{{< tabs >}}
{{% tab "Kubernetes (Operator)" %}}

Datadog Operator v1.3.0 以降では、イメージ収集がデフォルトで有効になっています。古いバージョンの Datadog Operator を使用している場合は、v1.3.0 以降にアップデートすることをお勧めします。


{{% /tab %}}

{{% tab "Kubernetes (Helm)" %}}

Datadog Helm chart v3.46.0 以降では、イメージ収集は[デフォルトで有効][1]になっています。これを確認するには、または以前のバージョンの Helm chart を使用している場合は、`datadog-values.yaml` で `datadog.containerImageCollection.enabled` が `true` に設定されていることを確認してください。

```yaml
datadog:
  containerImageCollection:
    enabled: true
```
[1]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml#L651
{{% /tab %}}

{{% tab "ECS EC2" %}}

[ECS EC2 インスタンス][1]でコンテナイメージの収集を有効にするには、`datadog-agent` コンテナ定義に以下の環境変数を追加します。

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

#### SBOM 収集の有効化

以下の手順では、CSM Vulnerabilities の [Software Bill of Materials][5] (SBOM) 収集を有効にします。SBOM 収集は、コンテナイメージの脆弱性の自動検出を可能にします。脆弱性は 1 時間ごとに評価され、コンテナに対してスキャンされます。コンテナイメージの脆弱性管理は、[CSM Pro および Enterprise プラン][10]に含まれています。

**注**: CSM Vulnerabilities 機能は AWS Fargate または Windows 環境では利用できません。

{{< tabs >}}
{{% tab "Kubernetes (Operator)" %}}

`datadog-agent.yaml` ファイルの spec セクションに以下を追加します。

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
      host:
        enabled: true
```

{{% /tab %}}

{{% tab "Kubernetes (Helm)" %}}

Helm のコンフィギュレーションファイル `datadog-values.yaml` に以下を追加します。

```yaml
datadog:
  sbom:
    containerImage:
      enabled: true
    host:
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
              },
              {
                "name": "DD_SBOM_HOST_ENABLED",
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

## コンテナイメージのトレンド構成

コンテナイメージのトレンド構成モーダルを使用し、**Enable Container Image Metric Collection** を切り替えて、イメージメトリクスの生成をオンにします。

イメージメトリクスは、[Live Containers](#live-containers) および [Image Check](#image-collection) ソースから収集されます。上記と同じ手順に従って、インフラストラクチャー全体でこれらの収集が有効になっていることを確認し、トレンドビューを最大限に活用してください。

{{< img src="infrastructure/containerimages/container_image_trends_configuration_modal.png" alt="コンテナイメージのトレンド構成モーダル" width="100%">}}

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
