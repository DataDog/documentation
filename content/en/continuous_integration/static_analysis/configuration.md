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
- link: "/integrations/github/"
  tag: "Documentation"
  text: "Learn about the GitHub Integration"
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

This example demonstrates which rulesets are specified for Python-based repositories:

```yaml
rulesets:
  - python-code-style
  - python-best-practices
  - python-inclusive
```

Configure your [Datadog API and application keys][2] and select from the following CI providers.

{{< tabs >}}
{{% tab "CircleCI Orb" %}}

To run Static Analysis with CircleCI, [follow these instructions for setting up a CircleCI Orb][101].

[101]: /continuous_integration/static_analysis/circleci_orb

{{% /tab %}}
{{% tab "GitHub Actions" %}}

To run Static Analysis with GitHub, [follow these instructions for setting up a GitHub Action][101].

[101]: /continuous_integration/static_analysis/github_actions/

{{% /tab %}}
{{% tab "Other" %}}

If you are not using CircleCI Orbs or GitHub Actions, you can run the Datadog CLI directly in your CI pipeline platform. 

### Requirements

This requires you to install UnZip, Node.js, and Java 17 or later.

Configure the following environment variables:

| Name         | Description                                                                                                                | Required |
|--------------|----------------------------------------------------------------------------------------------------------------------------|----------|
| `DD_API_KEY` | Your Datadog API key. This key is created by your [Datadog organization][101] and should be stored as a secret.              | True     |
| `DD_APP_KEY` | Your Datadog application key. This key is created by your [Datadog organization][102] and should be stored as a secret.      | True     |

Provide the following inputs:

| Name         | Description                                                                                                                | Required | Default         |
|--------------|----------------------------------------------------------------------------------------------------------------------------|----------|-----------------|
| `service` | The service you want your results tagged with.                                                                                | True     |                 |
| `env`     | The environment you want your results tagged with. Datadog recommends using `ci` as the value for this input.                                                                           | False    | `none`          |
| `site`    | The [Datadog site][103] to send information to. Your Datadog site is {{< region-param key="dd_site" code="true" >}}.                                                                                 | False    | {{< region-param key="dd_site" code="true" >}}  |

Add the following to your CI pipeline:

```bash
# Install dependencies
npm install -g @datadog/datadog-ci
TEMP_DIR=$(mktemp -d) && curl -L -o $TEMP_DIR -O http://dtdg.co/latest-static-analyzer
unzip $TEMP_DIR/latest-static-analyzer

# Run Static Analysis (requires a pre-installed JVM)
$TEMP_DIR/cli-1.0-SNAPSHOT/bin/cli --directory . -t true -o results.sarif -f sarif

# Upload results
datadog-ci sarif upload results.sarif --service "$DD_SERVICE" --env "$DD_ENV"
```

[101]: /account_management/api-app-keys/#api-keys
[102]: /account_management/api-app-keys/#application-keys
[103]: /getting_started/site/

{{% /tab %}}
{{< /tabs >}}

### Import third-party Static Analysis results

Datadog supports ingesting Static Analysis results from third-party Static Analysis tools that can export results into the interoperable [Static Analysis Results Interchange Format (SARIF) Format][3]. 

To upload a SARIF report:

1. Ensure the [`DD_API_KEY` and `DD_APP_KEY` variables are defined][2].
2. Install the `datadog-ci` utility:
   
   ```bash
   npm install -g @datadog/datadog-ci
   ```

3. Run your third-party Static Analysis tool on your code which outputs results in the SARIF format.
4. Upload the results to Datadog:

   ```bash
   datadog-ci sarif upload $OUTPUT_LOCATION --service <datadog-service> --env <datadog-env>
   ```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.npmjs.com/package/@datadog/datadog-ci
[2]: /account_management/api-app-keys/
[3]: https://www.oasis-open.org/committees/tc_home.php?wg_abbrev=sarif