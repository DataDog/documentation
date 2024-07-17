---
title: Generic CI Providers
description: Learn about Datadog Static Analysis to scan code for quality issues and security vulnerabilities before your code reaches production.
is_beta: true
further_reading:
- link: "https://www.datadoghq.com/blog/monitor-ci-pipelines/"
  tag: "Blog"
  text: "Monitor all your CI pipelines with Datadog"
algolia:
  tags: ['static analysis', 'ci pipeline', 'SAST']
---

{{% site-region region="gov" %}}
<div class="alert alert-danger">
    Code Analysis is not available for the {{< region-param key="dd_site_name" >}} site.
</div>
{{% /site-region %}}

{{< callout url="#" btn_hidden="true" header="Try the Beta!" >}}
Code Analysis is in public beta.
{{< /callout >}}

## Overview

If you don't use CircleCI Orbs or GitHub Actions, you can run the Datadog CLI directly in your CI pipeline platform. 

Prerequisites:

- unzip
- Node.js 14 or later

Configure the following environment variables:

| Name         | Description                                                                                                                | Required | Default         |
|--------------|----------------------------------------------------------------------------------------------------------------------------|----------|-----------------|
| `DD_API_KEY` | Your Datadog API key. This key is created by your [Datadog organization][1] and should be stored as a secret.            | Yes      |                 |
| `DD_APP_KEY` | Your Datadog application key. This key is created by your [Datadog organization][2] and should be stored as a secret.    | Yes      |                 |
| `DD_SITE`    | The [Datadog site][3] to send information to. Your Datadog site is {{< region-param key="dd_site" code="true" >}}.       | No       | `datadoghq.com` |

Provide the following inputs:

| Name           | Description                                                                                                                | Required | Default         |
|----------------|----------------------------------------------------------------------------------------------------------------------------|----------|-----------------|
| `service`      | The name of the service to tag the results with.                                                                           | Yes      |                 |
| `env`          | The environment to tag the results with. `ci` is a helpful value for this input.                                           | No       | `none`          |
| `cpu_count`    | Set the number of CPUs used by the analyzer. Defaults to the number of CPUs available.                                     | No       |                 |
| `subdirectory` | The subdirectory path the analysis should be limited to. The path is relative to the root directory of the repository.                  | No       |                 |

To obtain execution time statistics for analyzed files, add a `--performance-statistics` flag to your static analysis command.

Select an analyzer for your architecture and OS from the following options:

| Architecture | OS        | Name                                                    | Link                                                                                                                                          |
|--------------|-----------|---------------------------------------------------------| ----------------------------------------------------------------------------------------------------------------------------------------------|
| `aarch64`    | `Darwin`  | `datadog-static-analyzer-aarch64-apple-darwin.zip`      | [Download](https://github.com/DataDog/datadog-static-analyzer/releases/latest/download/datadog-static-analyzer-aarch64-apple-darwin.zip)      |
| `aarch64`    | `Linux`   | `datadog-static-analyzer-aarch64-unknown-linux-gnu.zip` | [Download](https://github.com/DataDog/datadog-static-analyzer/releases/latest/download/datadog-static-analyzer-aarch64-unknown-linux-gnu.zip) |
| `x86_64`     | `Darwin`  | `datadog-static-analyzer-x86_64-apple-darwin.zip`       | [Download](https://github.com/DataDog/datadog-static-analyzer/releases/latest/download/datadog-static-analyzer-x86_64-apple-darwin.zip)       |
| `x86_64`     | `Linux`   | `datadog-static-analyzer-x86_64-unknown-linux-gnu.zip`  | [Download](https://github.com/DataDog/datadog-static-analyzer/releases/latest/download/datadog-static-analyzer-x86_64-unknown-linux-gnu.zip)  |
| `x86_64`     | `Windows` | `datadog-static-analyzer-x86_64-pc-windows-msvc.zip`    | [Download](https://github.com/DataDog/datadog-static-analyzer/releases/latest/download/datadog-static-analyzer-x86_64-pc-windows-msvc.zip)    |

Add the following to your CI pipeline:

```bash
# Set the Datadog site to send information to
export DD_SITE="datadoghq.com"

# Install dependencies
npm install -g @datadog/datadog-ci 

# Download the latest Datadog static analyzer:
# https://github.com/DataDog/datadog-static-analyzer/releases
DATADOG_STATIC_ANALYZER_URL=https://github.com/DataDog/datadog-static-analyzer/releases/latest/download/datadog-static-analyzer-x86_64-unknown-linux-gnu.zip
curl -L $DATADOG_STATIC_ANALYZER_URL > /tmp/ddog-static-analyzer.zip
unzip /tmp/ddog-static-analyzer.zip -d /tmp
mv /tmp/datadog-static-analyzer /usr/local/datadog-static-analyzer

# Run Static Analysis
/usr/local/datadog-static-analyzer -i . -o /tmp/report.sarif -f sarif

# Upload results
datadog-ci sarif upload /tmp/report.sarif --service <service> --env <env>
```

<div class="alert alert-info">
  This example uses the x86_64 Linux version of Datadog's static analyzer. If you're using a different OS or architecture, you should select it from the table above and update the <code>DATADOG_STATIC_ANALYZER_URL</code> value below. You can view all releases on the <a href="https://github.com/DataDog/datadog-static-analyzer/releases">GitHub Releases</a> page.
</div>

## Diff-aware scanning

<div class="alert alert-warning">
  Diff-aware scanning for Static Analysis is in public beta.
</div>

Diff-aware scanning is a feature that enables Datadog Static Analysis to only scan the files modified by a commit in a feature branch. It accelerates scan time significantly by not having the analysis run on every file in the repository for every scan. To enable diff-aware scanning in your CI pipeline, follow these steps:

1. Make sure your `DD_APP_KEY`, `DD_SITE` and `DD_API_KEY` variables are set in your CI pipeline.
2. Add a call to `datadog-ci git-metadata upload` before invoking the static analyzer. This command ensures that Git metadata is available to the Datadog backend. Git metadata is required to calculate the number of files to analyze.
3. Ensure that the datadog-static-analyzer is invoked with the flag `--diff-aware`.

Example of commands sequence (these commands must be invoked in your Git repository):
```bash
datadog-ci git-metadata upload

datadog-static-analyzer -i /path/to/directory -g -o sarif.json -f sarif –-diff-aware <...other-options...>
```

**Note:** When a diff-aware scan cannot be completed, the fallback will be to scan the entire directory.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/api-app-keys/#api-keys
[2]: /account_management/api-app-keys/#application-keys
[3]: /getting_started/site/
