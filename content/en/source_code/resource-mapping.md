---
title: Kubernetes Resource Mapping for Source Code Integration
description: "Learn how to connect Kubernetes cluster resources to the source code that was used to deploy them using annotations."
---

## Overview

Datadog's source code and resource mapping allow you to connect cluster resources to the source code
that was used to deploy them, using Kubernetes annotations.

## Configuration

`origin.datadoghq.com/location` contains different content depending on how the resources were deployed.

{{< tabs >}}
{{% tab "Raw Kubernetes YAML" %}}
If you deployed resources using `kubectl`, use the following annotation format:

```json
origin.datadoghq.com/location:
{
	"repo": {
		"url": "<repo URL>",
		"targetRevision": "<SHA for commit being deployed>",
		"path": "<file path of the resource>"
	}
}
```

{{% /tab %}}
{{% tab "Helm chart" %}}
If you deployed resources using `helm`, the annotation format you need to use depends on how `helm install` was invoked.
These are the possible ways to do it:

{{% collapse-content title="Chart reference" level="h4" expanded=false id="chart-reference" %}}

Use this option when the chart is stored in the git repo in unpacked form.

Use the installation command `helm install <release> <chart/path>`.

Use the following annotation format:

```json
origin.datadoghq.com/location:
{
  "helm": {
    "repoURL": "<repo where the chart and values.yaml files are stored>",
    "targetRevision": "<commit SHA of repoURL>",
    "valuesPath": ["location of values.yaml files relative to <repoURL>"],
    "chartPath": "<chart/path> relative to <repoURL>"
  }
}
```

{{% /collapse-content %}}
{{% collapse-content title="Path to a packaged chart" level="h4" expanded=false id="path-to-chart" %}}

Use this option when the chart is stored in the git repo in the form of an archive.

Use the installation command `helm install <release> <chart/path/arch-x.y.z.tgz>`.

Use the following annotation format:

```json
origin.datadoghq.com/location:
{
  "helm": {
    "repoURL": "<repo where the chart and values.yaml files are stored>",
    "targetRevision": "<commit SHA of repoURL>",
    "valuesPath": ["location of values.yaml files relative to <repoURL>"],
    "chartPath": "<chart/path/arch-x.y.z.tgz relative to repoURL>"
  }
}
```

{{% /collapse-content %}}
{{% collapse-content title="Path to an unpacked chart directory" level="h4" expanded=false id="path-to-unpacked-chart" %}}

Use this option when the chart is stored somewhere in the current git repo and unpacked during the installation.

Use the installation command `helm install <release> <unpacked/path/dir>`.

Use the following annotation format:

```json
origin.datadoghq.com/location:
{
  "helm": {
    "chartURL": "<URL of the chart>",
    "repoURL": "<repo where the values.yaml files are stored>",
    "targetRevision": "<commit SHA of repoURL>",
    "valuesPath": ["location of values.yaml files relative to <repoURL>"],
    "chartPath": "<unpacked/path/dir relative to repoURL>"
  }
}
```

{{% /collapse-content %}}
{{% collapse-content title="Absolute URL" level="h4" expanded=false id="absolute-url" %}}

Use the installation command `helm install mynginx https://example.com/charts/nginx-1.2.3.tgz`.

Use the following annotation format:

```json
origin.datadoghq.com/location:
{
  "helm": {
    "chartURL": "<URL in the format https://example.com/charts/nginx-1.2.3.tgz>",
    "repoURL": "<repo where the values.yaml files are stored>",
    "targetRevision": "<commit SHA of repoURL>",
    "valuesPath": ["location of values.yaml files relative to <repoURL>"]
  }
}
```

{{% /collapse-content %}}
{{% collapse-content title="Chart reference and repo URL" level="h4" expanded=false id="chart-reference-and-repo" %}}

Use the installation command `helm install --repo https://example.com/charts/ mynginx nginx`.

Use the following annotation format:

```json
origin.datadoghq.com/location:
{
  "helm": {
    "chartURL": "<URL in the format https://example.com/charts/nginx>",
    "repoURL": "<repo where the values.yaml files are stored>",
    "targetRevision": "<commit SHA of repoURL>",
    "valuesPath": ["location of values.yaml files relative to <repoURL>"]
  }
}
```

{{% /collapse-content %}}
{{% collapse-content title="OCI registries" level="h4" expanded=false id="oci-registries" %}}

Use the installation command `helm install mynginx --version 1.2.3 oci://example.com/charts/nginx`.

Use the following annotation format:

```json
origin.datadoghq.com/location:
{
  "helm": {
    "chartURL": "<URL in the format oci://example.com/charts/nginx>",
    "repoURL": "<repo where the values.yaml files are stored>",
    "targetRevision": "<commit SHA of repoURL>",
    "valuesPath": ["location of `values.yaml` files relative to <repoURL>"]
  }
}
```

{{% /collapse-content %}}
{{% /tab %}}
{{< /tabs >}}
