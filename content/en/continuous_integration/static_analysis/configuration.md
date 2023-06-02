---
title: Static Analysis Configuration
kind: documentation
description: Learn how to set up Datadog Static Analysis.
is_beta: true
further_reading:
- link: "https://www.datadoghq.com/blog/monitor-ci-pipelines/"
  tag: "Blog"
  text: "Monitor all your CI pipelines with Datadog"
- link: "/continuous_integration/static_analysis/configuration"
  tag: "Documentation"
  text: "Learn how to set up Static Analysis"
- link: "/integrations/guide/source-code-integration/"
  tag: "Documentation"
  text: "Learn about the Source Code Integration"
---

{{% site-region region="us,us3,us5,eu,ap1" %}}
<div class="alert alert-warning">
  Static Analysis is in private beta. Python is the only supported language. To request access, <a href="/help">contact Support</a>.
</div>
{{% /site-region %}}

{{% site-region region="gov" %}}
<div class="alert alert-danger">
    Static Analysis is not available for the {{< region-param key="dd_site_name" >}} site.
</div>
{{% /site-region %}}

## Overview

Use the [`@datadog-ci` NPM package][2] to run Static Analysis tests directly within your CI/CD pipeline. 

## Setup 

### Python

Add a `datadog.yml` file at the root of your project.

Configure your Datadog API and application keys and select from the following CI providers:

{{< tabs >}}
{{% tab "CircleCI Orb" %}}

Text inside tab. [Link references][1] must be inside the tab.

[1]: /agent/guide/agent-commands/

{{% /tab %}}
{{% tab "GitHub Actions" %}}

Text inside tab. [Link references][1] must be inside the tab.

[1]: /agent/guide/agent-commands/

{{% /tab %}}
{{% tab "Other" %}}

Text inside tab. [Link references][1] must be inside the tab.

[1]: /agent/guide/agent-commands/

{{% /tab %}}
{{< /tabs >}}

### Other programming languages

Upload a SARIF report using [`datadog-ci`][2].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/static-analysis
[2]: https://www.npmjs.com/package/@datadog/datadog-ci
[3]: /static_analysis/configuration/