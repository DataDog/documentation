---
aliases:
- /ja/security/vulnerabilities/troubleshooting/
further_reading:
- link: /security/cloud_security_management/setup/csm_pro/?tab=aws#configure-the-agent-for-containers
  tag: ドキュメント
  text: コンテナイメージの脆弱性のセットアップ
- link: /security/cloud_security_management/setup/csm_enterprise/?tab=aws#hosts
  tag: ドキュメント
  text: ホストの脆弱性のセットアップ
- link: https://www.datadoghq.com/blog/datadog-container-image-view/
  tag: ブログ
  text: Datadog Container Monitoring のコンテナイメージによるトラブルシューティングワークフローの強化
title: Cloud Security Management Vulnerabilities のトラブルシューティング
---

## 概要

Cloud Security Management (CSM) Vulnerabilities に関する問題が発生した場合は、以下のトラブルシューティングガイドラインを使用してください。さらにサポートが必要な場合は、[Datadog サポート][1]にお問い合わせください。

## エラーメッセージ

### ディスク容量要件

最大のコンテナイメージのサイズに等しいディスクの空き容量があることを確認してください。この空き容量は、Datadog Agent がコンテナイメージの脆弱性をスキャンするために必要です (デフォルトでは 1 GB)。

その結果、次のようなエラーが表示されます。
```sh
Error: failed to check current disk usage: not enough disk space to safely collect sbom, 192108482560 available, 1073741824000 required
```

回避策: 

- 利用可能なディスク容量を少なくとも 1 GB に増やしてください。イメージが 1 GB を超える場合は、それに応じてディスク容量を増やしてください。
- すべてのイメージが 1 GB 未満の場合、環境変数 `DD_SBOM_CONTAINER_IMAGE_MIN_AVAILABLE_DISK` を使用して、デフォルトの Agent 要求ディスク容量を減らすことができます (デフォルト値は 1GB です)。

### 非圧縮コンテナイメージレイヤー

SBOM スキャンは、非圧縮コンテナイメージレイヤーでのみ動作します。一部の Kubernetes ディストリビューション (AWS EKS、minikube、kind など) では、コンテナランタイムが非圧縮レイヤーを破棄するように構成されているため、スキャンに失敗します。

その結果、次のようなエラーが表示されます。

```sh
ERROR | (pkg/workloadmeta/collectors/internal/containerd/image_sbom_trivy.go:80 in func2) | Failed to generate SBOM for containerd image: unable to marshal report to sbom format, err: analyze error: failed to analyze layer:  : unable to get uncompressed layer
```

この問題の回避策は、containerd コンフィギュレーションファイルで `discard_unpacked_layers=false` という構成オプションを設定することです。

## 関連メトリクスを表示

1. Datadog の **[Metrics > Summary][4]** に移動します。
2. トラブルシューティングに役立つ以下のメトリクスを検索します。
    -  `datadog.agent.sbom_attempts`: sbom 収集の試行を `source` と `type` で追跡します。
    -  `datadog.agent.sbom_generation_duration`: SBOM の生成にかかる時間を秒単位で測定します。
    -  `datadog.agent.sbom_errors`: `source`、`type`、`reason` ごとの sbom の失敗数。
    -  `datadog.agent.export_size`: ディスクに書き込まれるアーカイブのサイズ。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/help/
[2]: /ja/security/cloud_security_management/setup/csm_enterprise?tab=aws#configure-the-agent-for-vulnerabilities
[3]: https://app.datadoghq.com/security/configuration/csm/setup
[4]: https://app.datadoghq.com/metric/summary