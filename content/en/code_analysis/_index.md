---
title: Code Analysis
kind: documentation
description: Learn about Datadog Code Analysis.
is_beta: true
further_reading:
- link: "https://www.datadoghq.com/blog/monitor-ci-pipelines/"
  tag: "Blog"
  text: "Monitor all your CI pipelines with Datadog"
- link: "/integrations/guide/source-code-integration/"
  tag: "Documentation"
  text: "Learn about the Source Code Integration"
- link: "/code_analysis/static_analysis"
  tag: "Documentation"
  text: "Learn about Static Analysis"
---

## Overview

{{% site-region region="gov" %}}
<div class="alert alert-danger">
    Code Analysis is not available for the {{< region-param key="dd_site_name" >}} site.
</div>
{{% /site-region %}}

Code Analysis is Static Analysis and Software Composition Analysis (SCA) combined.

You can search and manage code violations and library dependencies for any service in Datadog.

Code Vulnerabilities
: Identify and address risks in code security.

Code Quality
: Identify and address poor practices in code quality.

Library Vulnerabilities
: Identify and address security in libraries.

Library List
: Identify and remove prohibited libraries.

## Setup

{{< tabs >}}
{{% tab "Static Analysis" %}}

To run Static Analysis, [see the documentation][101].

[101]: /code_analysis/static_analysis

{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/static-analysis
[2]: https://www.npmjs.com/package/@datadog/datadog-ci
[3]: /integrations/github/
[4]: /account_management/api-app-keys/
[5]: https://www.oasis-open.org/committees/tc_home.php?wg_abbrev=sarif
[6]: /code_analysis/rules
[103]: /getting_started/site/
