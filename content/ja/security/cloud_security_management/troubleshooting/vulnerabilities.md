---
aliases:
- /ja/security/vulnerabilities/troubleshooting/
further_reading:
- link: /infrastructure/containers/container_images/#enable-sbom-collection
  tag: ドキュメント
  text: Cloud Security Vulnerabilities で SBOM の収集を有効にする
- link: /security/cloud_security_management/setup/csm_enterprise/?tab=aws#hosts
  tag: ドキュメント
  text: ホストの脆弱性のセットアップ
- link: https://www.datadoghq.com/blog/datadog-container-image-view/
  tag: ブログ
  text: Datadog Container Monitoring のコンテナイメージによるトラブルシューティングワークフローの強化
title: Cloud Security Vulnerabilities のトラブルシューティング
---

## 概要

Cloud Security Vulnerabilities に関する問題が発生した場合は、以下のトラブルシューティング ガイドラインに従ってください。さらにサポートが必要な場合は、[Datadog サポート][1]にお問い合わせください。

## エラーメッセージ

### ディスク容量の要件

最大のコンテナイメージのサイズに等しいディスクの空き容量があることを確認してください。この空き容量は、Datadog Agent がコンテナイメージの脆弱性をスキャンするために必要です (デフォルトでは 1 GB)。

表示されるエラーは次のとおりです。
```sh
Error: failed to check current disk usage: not enough disk space to safely collect sbom, 192108482560 available, 1073741824000 required
```

回避策: 

- 利用可能なディスク容量を少なくとも 1 GB に増やしてください。イメージが 1 GB を超える場合は、それに応じてディスク容量を増やしてください。
- すべてのイメージが 1 GB 未満の場合、環境変数 `DD_SBOM_CONTAINER_IMAGE_MIN_AVAILABLE_DISK` を使用して、デフォルトの Agent 要求ディスク容量を減らすことができます (デフォルト値は 1GB です)。

### 非圧縮のコンテナ イメージ レイヤー

SBOM スキャンは、非圧縮のコンテナ イメージ レイヤーに対してのみ動作します。特定の Kubernetes ディストリビューション (AWS EKS、minikube、kind など) では、コンテナ ランタイムが非圧縮レイヤーを破棄するように設定されているため、スキャンが失敗します。

表示されるエラーは次のとおりです。

```sh
ERROR | (pkg/workloadmeta/collectors/internal/containerd/image_sbom_trivy.go:80 in func2) | Failed to generate SBOM for containerd image: unable to marshal report to sbom format, err: analyze error: failed to analyze layer:  : unable to get uncompressed layer
```

この問題の回避策は、次の構成オプションを設定することです:
- containerd の場合: containerd の構成ファイルで `discard_unpacked_layers=false` を設定します。
- Helm の場合: `values.yaml` ファイルで `datadog.sbom.containerImage.uncompressedLayersSupport: true` を設定します。
- Datadog Operator の場合: DatadogAgent CRD で `features.sbom.containerImage.uncompressedLayersSupport` を `true` に設定します。

### GKE のイメージ ストリーミング

Datadog は、Google Kubernetes Engine (GKE) でのイメージ ストリーミングをサポートしていません。GKE でこのオプションを有効にしている場合、Agent はコンテナ SBOM を生成できません。

表示されるエラーは次のとおりです。

```sh
unable to mount containerd image, err: unable to scan image named: {image-name}, image is not unpacked
```

この問題の回避策は、GKE でイメージ ストリーミングを無効にすることです。詳細は、GKE ドキュメントの [Disable Image streaming][5] セクションを参照してください。

## Cloud Security Vulnerabilities を無効にする

Agent の `datadog-values.yaml` ファイルで、以下の構成オプションを `false` に設定します。

```
# datadog-values.yaml ファイル
datadog:
  sbom:
    containerImage:
      enabled: false

      # Google Kubernetes Engine (GKE) または Amazon Elastic Kubernetes (EKS) を使用している場合は、次の行のコメントを解除します
      # uncompressedLayersSupport: true

    # Host Vulnerability Management の有効化
    host:
      enabled: false

    # Container Vulnerability Management の有効化
    # Datadog Helm バージョン `>= 3.46.0` ではイメージ収集がデフォルトで有効です
      containerImageCollection:
        enabled: false
```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/help/
[2]: /ja/security/cloud_security_management/setup/csm_enterprise?tab=aws#configure-the-agent-for-vulnerabilities
[3]: https://app.datadoghq.com/security/configuration/csm/setup
[4]: https://app.datadoghq.com/metric/summary
[5]: https://cloud.google.com/kubernetes-engine/docs/how-to/image-streaming#disable