---
title: Troubleshooting Cloud Security Vulnerabilities
aliases:
  - /security/vulnerabilities/troubleshooting/
further_reading:
- link: "/containers/monitoring/container_images/#enable-sbom-collection"
  tag: "Documentation"
  text: "Enable SBOM collection in Cloud Security Vulnerabilities"
- link: "/security/cloud_security_management/setup/agent/"
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

Before scanning a container image, the Datadog Agent checks that the disk has at least the minimum free space set by `DD_SBOM_CONTAINER_IMAGE_MIN_AVAILABLE_DISK`. The default is 10 MB in Agent 7.82 and later, and 1 GB in earlier versions. When the Agent exports the image to disk to scan it, such as with Docker or with containerd in its default mode, the disk must also have free space of at least 120% of the image size.

The resulting error appears as:
```sh
Error: failed to check current disk usage: not enough disk space to safely collect sbom, 5242880 available, 10485760 required
```

Or, for an image export:
```sh
not enough disk space to export the image, 524288000 available, 1258291200 required
```

Workaround:

- Increase the available disk space to at least the `DD_SBOM_CONTAINER_IMAGE_MIN_AVAILABLE_DISK` value. For image exports, also increase it to at least 120% of the size of your largest container image.
- If your disk has less free space than the minimum but enough for your images, decrease the minimum with the `DD_SBOM_CONTAINER_IMAGE_MIN_AVAILABLE_DISK` environment variable.

### Uncompressed container image layers

The SBOM scan only works with uncompressed container image layers. Certain Kubernetes distributions (such as AWS EKS, minikube, and kind), configure their container runtime to discard the uncompressed layers, causing the scan to fail.

The resulting error appears as:

```sh
ERROR | (pkg/workloadmeta/collectors/internal/containerd/image_sbom_trivy.go:80 in func2) | Failed to generate SBOM for containerd image: unable to marshal report to sbom format, err: analyze error: failed to analyze layer:  : unable to get uncompressed layer
```

The workaround for this issue is to set the configuration option:
- For containerd: set `discard_unpacked_layers=false` in the containerd configuration file.
- For Helm: set `datadog.sbom.containerImage.uncompressedLayersSupport: true` in your `values.yaml` file.
- For Datadog Operator: set `features.sbom.containerImage.uncompressedLayersSupport` to `true` in your DatadogAgent CRD.

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
    # Disables Cloud Security Vulnerabilities for container images
    containerImage:
      enabled: false

      # Uncomment the following line if you are using Google Kubernetes Engine (GKE) or Amazon Elastic Kubernetes (EKS)
      # uncompressedLayersSupport: true

    # Disables Cloud Security Vulnerabilities for hosts
    host:
      enabled: false

  # Disables container image collection
  # Datadog Helm chart 3.46.0 and later enables image collection by default
  containerImageCollection:
    enabled: false
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help/
[5]: https://cloud.google.com/kubernetes-engine/docs/how-to/image-streaming#disable
