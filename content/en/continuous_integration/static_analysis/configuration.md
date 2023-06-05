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

Use the [`@datadog-ci` NPM package][1] to run Static Analysis directly within your CI/CD pipeline. 

## Setup 

To use Datadog Static Analysis, you need to add a `static-analysis.datadog.yml` file to your repository's root directory to specify which rulesets to use.

```yaml
rulesets:
  - <ruleset-name>
  - <ruleset-name>
```

### Example for Python

You can see an example for Python-based repositories:

```yaml
rulesets:
  - python-security
  - python-code-style
  - python-best-practices
```

Configure your [Datadog API and application keys][2] and select from the following CI providers:

{{< tabs >}}
{{% tab "CircleCI Orb" %}}

To run Static Analysis with CircleCI, [follow these instructions for setting up a CircleCI Orb][1].

[1]: /continuous_integration/static_analysis/circleci_orb

{{% /tab %}}
{{% tab "GitHub Actions" %}}

To run Static Analysis with GitHub, [follow these instructions for setting up a GitHub Action][1].

[1]: /continuous_integration/static_analysis/github_actions/

{{% /tab %}}
{{% tab "Other" %}}

If you are not using CircleCI Orbs or GitHub Actions, you can run the Datadog CLI directly in your CI pipeline platform. **Note:** This requires Unzip, Node.js, and Java 17+ to be installed.

The following environment variables should be configured:

| Variable | Required | Description |
|----------|----------|-------------|
| DD_API_KEY | True | Unique key belonging to your organization, more details [here][1]. |
| DD_APP_KEY | True | Unique key scoped users or service accounts with scoped permissions, more details [here][2]. |
| DD_SERVICE | True | Value of the service that this repository contains. |
| DD_SITE | False | The site corresponding to the [Datadog region][3] your organization belongs to. You are currently viewing the documentation for the {{< region-param key="dd_site_name" code="true" >}} site, for which the correct value for this variable would be {{< region-param key="dd_site" code="true" >}} |
| DD_ENV | False | The environment that this repository belongs to. Datadog recommends using `ci` as the value for this variable. |

From here, add the following to your CI pipeline:
```bash
# Install dependencies
npm install -g @datadog/datadog-ci
TEMP_DIR=$(mktemp -d) && curl -L -o $TEMP_DIR -O http://dtdg.co/latest-static-analyzer
unzip $TEMP_DIR/latest-static-analyzer

# Run Analysis (requires a pre-installed JVM)
$TEMP_DIR/cli-1.0-SNAPSHOT/bin/cli --directory . -t true -o results.sarif -f sarif

# Upload results
datadog-ci sarif upload results.sarif --service "$DD_SERVICE" --env "$DD_ENV"
```

[1]: /account_management/api-app-keys/#api-keys
[2]: /account_management/api-app-keys/#application-keys
[3]: /getting_started/site/

{{% /tab %}}
{{< /tabs >}}

### Import third-party Static Analysis results

Datadog supports the ingestion of Static Analysis results from third-party Static Analysis tools that can export their results into the interoperable [SARIF Format][3]. To configure this:

1. Make sure the variables `DD_API_KEY` and `DD_APP_KEY` are defined
2. Install the datadog-ci utility:
   ```bash
   npm install -g @datadog/datadog-ci
   ```
3. Run your code third-party Static Analysis tool that outputs results in the SARIF format
4. Upload the results to Datadog:
   ```bash
   datadog-ci sarif upload $OUTPUT_LOCATION --service <datadog-service> --env <datadog-env>
   ```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.npmjs.com/package/@datadog/datadog-ci
[2]: /account_management/api-app-keys/
[3]: https://www.oasis-open.org/committees/tc_home.php?wg_abbrev=sarif