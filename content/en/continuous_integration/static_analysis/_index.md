---
title: Static Analysis
kind: documentation
description: Learn about Datadog Static Analysis to scan code for quality issues and security vulnerabilities before your code reaches production.
is_beta: true
further_reading:
- link: "https://www.datadoghq.com/blog/monitor-ci-pipelines/"
  tag: "Blog"
  text: "Monitor all your CI pipelines with Datadog"
- link: "/integrations/guide/source-code-integration/"
  tag: "Documentation"
  text: "Learn about the Source Code Integration"
---

## Overview

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

Static Analysis is a clear-box software testing technique that analyzes a program's pre-production code without the need to execute the program, meaning that the program is static because it isn't running. Static Analysis helps you identify maintainability issues and adhere to coding best practices early in the Software Development Life Cycle (SDLC) to ensure only the highest quality code makes it to production. 

Using Static Analysis provides organizations with the following benefits:

* Static Analysis takes the guesswork out of adhering to an organization's code standards, enabling your development team to ship compliant code without significant impacts to developer velocity.
* New developers to an organization are able to onboard faster because Static Analysis enables an organization to maintain a more readable codebase over time.
* An organization's software becomes reliable over time by virtue of the code being more maintainable because the risk of a developer introducing new defects to the code is minimized.

## Integrations

{{< whatsnext desc="With Static Analysis, you can integrate feedback in a supporting CI platform provider, with native integrations for GitHub and CircleCI. See the documentation for information about the following integrations:">}}
    {{< nextlink href="continuous_integration/static_analysis/circleci_orb" >}}CircleCI Orb{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/github_actions" >}}GitHub Actions{{< /nextlink >}}
{{< /whatsnext >}}

## Setup

To use Datadog Static Analysis, add a `static-analysis.datadog.yml` file to your repository's root directory to specify which rulesets to use.

```yaml
rulesets:
  - <ruleset-name>
  - <ruleset-name>
```

For example, for Python rules:

```yaml
rulesets:
  - python-code-style
  - python-best-practices
  - python-inclusive
```

Configure your [Datadog API and application keys][4] and run Static Analysis in the respective CI provider.

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

If you don't use CircleCI Orbs or GitHub Actions, you can run the Datadog CLI directly in your CI pipeline platform. 

Prerequisites:

- UnZip
- Node.js
- Java 17 or later

Configure the following environment variables:

| Name         | Description                                                                                                                | Required |
|--------------|----------------------------------------------------------------------------------------------------------------------------|----------|
| `DD_API_KEY` | Your Datadog API key. This key is created by your [Datadog organization][101] and should be stored as a secret.              | Yes     |
| `DD_APP_KEY` | Your Datadog application key. This key is created by your [Datadog organization][102] and should be stored as a secret.      | Yes     |

Provide the following inputs:

| Name         | Description                                                                                                                | Required | Default         |
|--------------|----------------------------------------------------------------------------------------------------------------------------|----------|-----------------|
| `service` | The name of the service to tag the results with.                                                                                | Yes     |                 |
| `env`     | The environment to tag the results with. `ci` is a helpful value for this input.                                                                           | No    | `none`          |
| `site`    | The [Datadog site][103] to send information to. Your Datadog site is {{< region-param key="dd_site" code="true" >}}.                                                                                 | No    | {{< region-param key="dd_site" code="true" >}}  |

Add the following to your CI pipeline:

```bash
# Install dependencies
npm install -g @datadog/datadog-ci
TEMP_DIR=$(mktemp -d) && curl -L -o $TEMP_DIR -O http://dtdg.co/latest-static-analyzer
unzip $TEMP_DIR/latest-static-analyzer

# Run Static Analysis (requires a pre-installed JVM)
$TEMP_DIR/cli-1.0-SNAPSHOT/bin/cli --directory . -t true -o results.sarif -f sarif

# Upload results
datadog-ci sarif upload results.sarif --service "$DD_SERVICE" --env "$DD_ENV" --site "$DD_SITE"
```

[101]: /account_management/api-app-keys/#api-keys
[102]: /account_management/api-app-keys/#application-keys
[103]: /getting_started/site/

{{% /tab %}}
{{< /tabs >}}

### Upload third-party static analysis results to Datadog

You can send results from third-party static analysis tools to Datadog, provided they are in the interoperable [Static Analysis Results Interchange Format (SARIF) Format][5]. 

To upload a SARIF report:

1. Ensure the [`DD_API_KEY` and `DD_APP_KEY` variables are defined][4].
2. Install the `datadog-ci` utility:
   
   ```bash
   npm install -g @datadog/datadog-ci
   ```

3. Run the third-party static analysis tool on your code and output the results in the SARIF format.
4. Upload the results to Datadog:

   ```bash
   datadog-ci sarif upload $OUTPUT_LOCATION --service <datadog-service> --env <datadog-env> --site <dd-site>
   ```

## Run Static Analysis in a CI pipeline

Datadog Static Analysis runs in your CI pipelines using the [`datadog-ci` CLI][2] and checks your code against Datadog's default rulesets.

### Search and filter results

After you configure your CI pipelines to run the Datadog Static Analyzer, violations appear on the [Static Analysis Results page][1]. To filter your results, use the facets to the left of the list, or search. 

Each violation is associated with a specific commit and branch from your repository on which the CI pipeline ran. The rows represent every violation per commit. 

Click on a violation to open a side panel that contains information about the scope of the violation and where it originated. 

The content of the violation is shown in tabs:

* Source Code: A description of the violation and the lines of code that caused it. To see the offending code snippet, configure the [Datadog GitHub App][3].
* Fix: Where possible, one or more code fixes that can resolve the violation, which you can copy and paste.
* Event: JSON metadata regarding the the Static Analysis violation event.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/static-analysis
[2]: https://www.npmjs.com/package/@datadog/datadog-ci
[3]: /integrations/github/
[4]: /account_management/api-app-keys/
[5]: https://www.oasis-open.org/committees/tc_home.php?wg_abbrev=sarif