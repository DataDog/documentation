---
title: Code Coverage
further_reading:
  - link: "/code_coverage/setup"
    tag: "Documentation"
    text: "Set up Code Coverage"
algolia:
  tags: ["code coverage"]
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Code Coverage is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

{{< callout url="http://datadoghq.com/product-preview/code-coverage/" >}}
Code Coverage is in Preview. This product replaces Test Optimization's <a href="https://docs.datadoghq.com/tests/code_coverage">code coverage</a> feature, which is being deprecated. Complete the form to request access for the new Code Coverage product.
{{< /callout >}}

[Code Coverage][1] lets you upload coverage reports to Datadog, visualize aggregated coverage data for pull requests, and block merges based on configurable coverage thresholds.

For setup instructions, see [Set up Code Coverage][2].

{{< img src="/code_coverage/pr_details.png" text="Code Coverage PR details page in Datadog" style="width:100%" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/code-coverage
[2]: /code_coverage/setup

