---
aliases:
- /ja/security/vulnerabilities/troubleshooting/
further_reading:
- link: /security/cloud_security_management/setup/csm_pro/?tab=aws#configure-the-agent-for-containers
  tag: Documentation
  text: Setting up container image vulnerabilities
- link: /security/cloud_security_management/setup/csm_enterprise/?tab=aws#hosts
  tag: Documentation
  text: Setting up host vulnerabilities
- link: https://www.datadoghq.com/blog/datadog-container-image-view/
  tag: Blog
  text: Enhance your troubleshooting workflow with Container Images in Datadog Container
    Monitoring
title: Troubleshooting Cloud Security Management Vulnerabilities
---

## 概要

If you experience issues with Cloud Security Management (CSM) Vulnerabilities, use the following troubleshooting guidelines. If you need further assistance, contact [Datadog support][1].

## Error messages

### Disk space requirements

最大のコンテナイメージのサイズに等しいディスクの空き容量があることを確認してください。この空き容量は、Datadog Agent がコンテナイメージの脆弱性をスキャンするために必要です (デフォルトでは 1 GB)。

The resulting error appears as:
```sh
Error: failed to check current disk usage: not enough disk space to safely collect sbom, 192108482560 available, 1073741824000 required
```

回避策: 

- 利用可能なディスク容量を少なくとも 1 GB に増やしてください。イメージが 1 GB を超える場合は、それに応じてディスク容量を増やしてください。
- すべてのイメージが 1 GB 未満の場合、環境変数 `DD_SBOM_CONTAINER_IMAGE_MIN_AVAILABLE_DISK` を使用して、デフォルトの Agent 要求ディスク容量を減らすことができます (デフォルト値は 1GB です)。

### Uncompressed container image layers

The SBOM scan only works with uncompressed container image layers. Certain Kubernetes distributions (such as AWS EKS, minikube, and kind), configure their container runtime to discard the uncompressed layers, causing the scan to fail.

The resulting error appears as:

```sh
ERROR | (pkg/workloadmeta/collectors/internal/containerd/image_sbom_trivy.go:80 in func2) | Failed to generate SBOM for containerd image: unable to marshal report to sbom format, err: analyze error: failed to analyze layer:  : unable to get uncompressed layer
```

The workaround for this issue is to set the configuration option `discard_unpacked_layers=false` in the containerd configuration file.

## View related metrics

1. Go to **[Metrics > Summary][4]** in Datadog.
2. Search for the following metrics to aid in troubleshooting:
    -  `datadog.agent.sbom_attempts`: Tracks sbom collection attempts by `source` and `type`.
    -  `datadog.agent.sbom_generation_duration`: Measures the time that it takes to generate SBOMs in seconds.
    -  `datadog.agent.sbom_errors`: Number of sbom failures by `source`, `type`, and `reason`.
    -  `datadog.agent.export_size`: The size of the archive written on disk. 

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/help/
[2]: /ja/security/cloud_security_management/setup/csm_enterprise?tab=aws#configure-the-agent-for-vulnerabilities
[3]: https://app.datadoghq.com/security/configuration/csm/setup
[4]: https://app.datadoghq.com/metric/summary