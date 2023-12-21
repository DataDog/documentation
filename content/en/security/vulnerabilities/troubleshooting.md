---
title: Troubleshooting Cloud Security Management Vulnerabilities
kind: documentation
further_reading:
- link: "/security/cloud_security_management/setup/csm_pro/?tab=aws#configure-the-agent-for-containers"
  tag: "Documentation"
  text: "Setting up container image vulnerabilities"
- link: "/security/cloud_security_management/setup/csm_enterprise?tab=aws#configure-the-agent-for-vulnerabilities"
  tag: "Documentation"
  text: "Setting up host vulnerabilities"
- link: "https://www.datadoghq.com/blog/datadog-container-image-view/"
  tag: "Blog"
  text: "Enhance your troubleshooting workflow with Container Images in Datadog Container Monitoring"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Cloud Security Management is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Overview

If you experience issues with Cloud Security Management (CSM) Vulnerabilities, use the following troubleshooting guidelines. If you need further assistance, contact [Datadog support][1].

## Confirm CSM Vulnerabilities is enabled

Review the documentation for [configuring the Agent for vulnerability scanning][2] to ensure your hosts and containers are configured for SBOM (Software Bill of Materials) collection. Additionally, review the [Cloud Security Management][3] in-app instructions to confirm that all steps for the initial setup are complete.

## Prerequisites

Ensure all the [prerequisites][5] are met for CSM Vulnerabilities:

| Component                | Version/Requirement                     |
| ------------------------ | ----------------------------------------|
| [Helm Chart][6]            | v3.33.6 or later (Kubernetes only)      |
| [containerd][7]              | v1.5.6 or later (Kubernetes and hosts only)|

## Disk space requirements

Ensure you have enough free disk space equivalent to the size of your largest container image. This space is needed for the Datadog Agent to scan the container image for vulnerabilities.

## Uncompressed container image layers

The SBOM scan only works with uncompressed container image layers. Certain Kubernetes distributions (such as AWS EKS, minikube, and Kind), configure their container runtime to discard the uncompressed layers, causing the scan to fail.

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

## Environments

- CSM Vulnerabilities is **not** available for the following environments:

  - Windows
  - AWS Fargate 
  - CRI-O runtime


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help/
[2]: /security/cloud_security_management/setup/csm_enterprise?tab=aws#configure-the-agent-for-vulnerabilities
[3]: https://app.datadoghq.com/security/configuration/csm/setup
[4]: https://app.datadoghq.com/metric/summary
[5]: /security/cloud_security_management/setup?tab=csmenterprise#csm-vulnerabilities
[6]: /security/cloud_security_management/troubleshooting
[7]: /containers/kubernetes/installation/?tab=helm