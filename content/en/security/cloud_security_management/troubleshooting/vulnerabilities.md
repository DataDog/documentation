---
title: Troubleshooting Cloud Security Management Vulnerabilities
aliases:
  - /security/vulnerabilities/troubleshooting/
further_reading:
- link: "/security/cloud_security_management/setup/csm_pro/?tab=aws#configure-the-agent-for-containers"
  tag: "Documentation"
  text: "Setting up container image vulnerabilities"
- link: "/security/cloud_security_management/setup/csm_enterprise/?tab=aws#hosts"
  tag: "Documentation"
  text: "Setting up host vulnerabilities"
- link: "https://www.datadoghq.com/blog/datadog-container-image-view/"
  tag: "Blog"
  text: "Enhance your troubleshooting workflow with Container Images in Datadog Container Monitoring"
---

## Overview

If you experience issues with Cloud Security Management (CSM) Vulnerabilities, use the following troubleshooting guidelines. If you need further assistance, contact [Datadog support][1].

## Error messages

### Disk space requirements

Ensure your free disk space is equal to the size of your largest container image. This space is needed for the Datadog Agent to scan the container image for vulnerabilities (1 GB by default).

The resulting error appears as:
```sh
Error: failed to check current disk usage: not enough disk space to safely collect sbom, 192108482560 available, 1073741824000 required
```

Workaround: 

- Increase the available disk space to at least 1 GB. If your images are larger than 1 GB, increase your disk space accordingly.
- If all of your images are smaller than 1 GB, you can decrease the default Agent request disk space with the environment variable: `DD_SBOM_CONTAINER_IMAGE_MIN_AVAILABLE_DISK` (default value 1GB).

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

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help/
[2]: /security/cloud_security_management/setup/csm_enterprise?tab=aws#configure-the-agent-for-vulnerabilities
[3]: https://app.datadoghq.com/security/configuration/csm/setup
[4]: https://app.datadoghq.com/metric/summary