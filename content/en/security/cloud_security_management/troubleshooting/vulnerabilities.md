---
title: Troubleshooting Cloud Security Vulnerabilities
aliases:
  - /security/vulnerabilities/troubleshooting/
further_reading:
- link: "/infrastructure/containers/container_images/#enable-sbom-collection"
  tag: "Documentation"
  text: "Enable SBOM collection in Cloud Security Vulnerabilities"
- link: "/security/cloud_security_management/setup/csm_enterprise/?tab=aws#hosts"
  tag: "Documentation"
  text: "Setting up host vulnerabilities"
- link: "https://www.datadoghq.com/blog/datadog-container-image-view/"
  tag: "Blog"
  text: "Enhance your troubleshooting workflow with Container Images in Datadog Container Monitoring"
---

## Overview

If you experience issues with Cloud Security Vulnerabilities, use the following troubleshooting guidelines. If you need further assistance, contact [Datadog support][1].

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

The workaround for this issue is to set the configuration option:
- For containerd: set `discard_unpacked_layers=false` in the containerd configuration file.
- For Helm: set `datadog.sbom.containerImage.uncompressedLayersSupport: true` in your `values.yaml` file.
- For Datadog Operator: set `features.sbom.containerImage.uncompressedLayersSupport` to `true` in your Datadog Agent CRD.

### Timeout

Some setups can take a long time to scan, causing it to time out. To ensure each asset is scanned, try increasing the timeout duration.

```sh
Error: unable to marshal report to sbom format, err: analyze error: pipeline error: context deadline exceeded
```

The workaround for this issue is to set the configuration option:
- For Helm: add the following environment variable in datadog.env
```
name: DD_SBOM_CONTAINER_IMAGE_SCAN_TIMEOUT
value: 600 # or higher if required
```

- For Datadog Operator: add to global.env of the Datadog Agent CRD
```
name: DD_SBOM_CONTAINER_IMAGE_SCAN_TIMEOUT
value: 600 # or higher if required
```

### GKE image streaming

Datadog doesn't support image streaming with Google Kubernetes Engine (GKE). If you have that option enabled in GKE, your Agent can't generate container SBOMs.

The resulting error appears as:

```sh
unable to mount containerd image, err: unable to scan image named: {image-name}, image is not unpacked
```

The workaround for this issue is to disable image streaming in GKE. For more information, see the [Disable Image streaming][5] section of the GKE docs.

## Disable Cloud Security Vulnerabilities

In the `datadog-values.yaml` file for the Agent, set the following configuration settings to `false`:

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

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help/
[2]: /security/cloud_security_management/setup/csm_enterprise?tab=aws#configure-the-agent-for-vulnerabilities
[3]: https://app.datadoghq.com/security/configuration/csm/setup
[4]: https://app.datadoghq.com/metric/summary
[5]: https://cloud.google.com/kubernetes-engine/docs/how-to/image-streaming#disable
