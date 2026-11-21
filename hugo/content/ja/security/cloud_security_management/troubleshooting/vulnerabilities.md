---
aliases:
- /ja/security/vulnerabilities/troubleshooting/
further_reading:
- link: /infrastructure/containers/container_images/#enable-sbom-collection
  tag: ドキュメント
  text: Cloud Security Vulnerabilities における SBOM 収集の有効化
- link: /security/cloud_security_management/setup/csm_enterprise/?tab=aws#hosts
  tag: ドキュメント
  text: ホストの脆弱性の設定
- link: https://www.datadoghq.com/blog/datadog-container-image-view/
  tag: ブログ
  text: Datadog Container Monitoring の Container Images を使用してトラブルシューティングワークフローを強化する
title: Cloud Security Vulnerabilities のトラブルシューティング
---
## 概要 {#overview}

Cloud Security Vulnerabilities で問題が発生した場合は、次のトラブルシューティングガイドラインを使用します。さらにサポートが必要な場合は、[Datadog サポート][1]にお問い合わせください。

## エラーメッセージ {#error-messages}

### ディスク容量の要件 {#disk-space-requirements}

空きディスク容量が、最も大きいコンテナイメージのサイズと等しいことを確認します。この容量は、Datadog Agent がコンテナイメージの脆弱性をスキャンするために必要です (1 GB はデフォルト)。

発生するエラーは次のとおりです。

```sh
Error: failed to check current disk usage: not enough disk space to safely collect sbom, 192108482560 available, 1073741824000 required
```

回避策:

- 利用可能なディスク容量を少なくとも 1 GB に増やします。イメージが 1 GB を超える場合は、それに応じてディスク容量を増やします。
- すべてのイメージが 1 GB 未満の場合は、環境変数 `DD_SBOM_CONTAINER_IMAGE_MIN_AVAILABLE_DISK` (デフォルト値は 1 GB) を使用して、Agent が要求するデフォルトのディスク容量を減らすことができます。

### 非圧縮コンテナイメージレイヤー {#uncompressed-container-image-layers}

SBOM スキャンは、非圧縮コンテナイメージレイヤーでのみ機能します。特定の Kubernetes ディストリビューション (AWS EKS、minikube、kind など) では、コンテナランタイムが非圧縮レイヤーを破棄するように構成されるため、スキャンが失敗します。

発生するエラーは次のとおりです。

```sh
ERROR | (pkg/workloadmeta/collectors/internal/containerd/image_sbom_trivy.go:80 in func2) | Failed to generate SBOM for containerd image: unable to marshal report to sbom format, err: analyze error: failed to analyze layer:  : unable to get uncompressed layer
```

この問題の回避策は、次の構成オプションを設定することです。
- containerd の場合：containerd の構成ファイルで `discard_unpacked_layers=false` を設定します。
- Helm の場合：`values.yaml` ファイルで `datadog.sbom.containerImage.uncompressedLayersSupport: true` を設定します。
- Datadog Operator の場合：DatadogAgent CRD で `features.sbom.containerImage.uncompressedLayersSupport` を `true` に設定します。

### GKE イメージストリーミング {#gke-image-streaming}

Datadog は、Google Kubernetes Engine (GKE) でのイメージストリーミングをサポートしていません。GKE でそのオプションが有効になっている場合、Agent はコンテナ SBOM を生成できません。

発生するエラーは次のとおりです。

```sh
unable to mount containerd image, err: unable to scan image named: {image-name}, image is not unpacked
```

この問題の回避策は、GKE でイメージストリーミングを無効にすることです。詳細については、GKE ドキュメントの[イメージストリーミングを無効にする][5]セクションを参照してください。

## Cloud Security Vulnerabilities の無効化 {#disable-cloud-security-vulnerabilities}

Agent の `datadog-values.yaml` ファイルで、次の構成設定を `false` に設定します。

```
# datadog-values.yaml file
datadog:
  sbom:
    containerImage:
      enabled: false

      # Uncomment the following line if you are using Google Kubernetes Engine (GKE) or Amazon Elastic Kubernetes (EKS)
      # uncompressedLayersSupport: true

    # Enables Host Vulnerability Management
    host:
      enabled: false

    # Enables Container Vulnerability Management
    # Image collection is enabled by default with Datadog Helm version `>= 3.46.0`
      containerImageCollection:
        enabled: false
```

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/help/
[2]: /ja/security/cloud_security_management/setup/csm_enterprise?tab=aws#configure-the-agent-for-vulnerabilities
[3]: https://app.datadoghq.com/security/configuration/csm/setup
[4]: https://app.datadoghq.com/metric/catalog
[5]: https://cloud.google.com/kubernetes-engine/docs/how-to/image-streaming#disable