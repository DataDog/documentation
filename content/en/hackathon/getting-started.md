---
title: "Getting Started with PRODUCT_NAME"
description: "Learn how to install, configure, and verify PRODUCT_NAME in your environment."
further_reading:
- link: "PLACEHOLDER_LINK"
  tag: Documentation
  text: "PLACEHOLDER_RELATED_DOC_TITLE"
---

## Overview

[PLACEHOLDER: One or two sentences describing what this product or feature does and what value it provides to the user. For example: "Datadog X helps you do Y so that you can Z."]

## Prerequisites

Before you begin, make sure you have the following:

- Administrative access to your system
- A working internet connection
- [PLACEHOLDER: Any additional prerequisites, such as required software versions, permissions, or dependencies]

## Install

[PLACEHOLDER: Brief intro sentence about what the install step accomplishes.]

1. [PLACEHOLDER: Describe the first install step.]
1. [PLACEHOLDER: Describe the second install step.]
1. [PLACEHOLDER: Continue as needed.]

The following parameters are available:

| Parameter | Description | Required |
|-----------|-------------|----------|
| `--system` | [PLACEHOLDER: What this parameter specifies] | Yes |
| `--flag` | [PLACEHOLDER: What this flag does] | No |
| `--config` | [PLACEHOLDER: What this config option does] | No |

## Configure

After installation, configure [PLACEHOLDER: Product Name] by editing the configuration file.

The configuration file (`config.yml`) is located in [PLACEHOLDER: path to configuration directory]. Open the file and set the following values:

```yaml
system:
  enabled: true
  name: "<YOUR_NAME>"
  version: "<VERSION>"
  timeout: <TIMEOUT_IN_SECONDS>
```

| Field | Description |
|-------|-------------|
| `enabled` | Set to `true` to enable [PLACEHOLDER: Product Name]. |
| `name` | [PLACEHOLDER: What this field controls.] |
| `version` | The version of [PLACEHOLDER: Product Name] to use. See [PLACEHOLDER: version reference link]. |
| `timeout` | [PLACEHOLDER: What this controls and what values are valid.] |

After saving the file, [PLACEHOLDER: describe any step needed to apply the configuration, such as restarting a service].

## Verify the installation

Run the following command to verify that [PLACEHOLDER: Product Name] is installed and running correctly:

```shell
verify --check install --flag=<FLAG_VALUE>
```

The expected output is:

```
SUCCESS: Installation verified.
```

If you do not see this output, see [PLACEHOLDER: Troubleshooting guide link] for help diagnosing common issues.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
