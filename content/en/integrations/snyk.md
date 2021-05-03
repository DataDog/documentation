---
categories:
- profiling
- security
description: Profile and report on vulnerabilities with Snyk
doc_link: https://docs.datadoghq.com/integrations/snyk/
dependencies: ["https://github.com/DataDog/documentation/blob/master/content/en/integrations/snyk.md"]
has_logo: true
integration_title: Snyk
is_public: true
kind: integration
name: snyk
public_title: Datadog-Snyk Integration
short_description: Profile and report on vulnerabilities with Snyk
version: '1.0'
integration_id: "snyk"
further_reading:
- link: "https://www.datadoghq.com/partner/snyk/"
  tag: "Partner page"
  text: "Snyk Monitoring with Datadog"
---

## Overview

The Snyk integration allows [Datadog Continuous Profiler][1] to report on vulnerabilities in your Java libraries. The CVE Analysis (Common Vulnerabilities and Exposures) is performed using [Snyk’s Intel Vulnerability DB][2].

## Setup

### Installation

1. Sign up for a [Snyk account][3].

2. Enable the [Datadog Continuous Profiler][1] by following the [setup guide][4]. The integration is only available for Datadog Continues Profiler customers.

3. Install [`datadog-ci`][5] and [`snyk`][6]:

{{< code-block lang="bash" >}}
npm install --save-dev @datadog/datadog-ci snyk
{{< /code-block >}}

4. In your build, [authenticate the Snyk CLI][7]:

{{< code-block lang="bash" >}}
snyk auth ”$YOUR_SNYK_TOKEN”
{{< /code-block >}}

### Configuration

1. In your build, [generate a dependency graph file][8]:

{{< code-block lang="bash" >}}
snyk test --print-deps --json > deps.json
{{< /code-block >}}

If you have a repo with multiple projects, add `--file=<package file>` to the Snyk command. For example, `--file=<pom.xml>`. See the [Snyk documentation][9] for more information.

2. For the most accurate analysis, add version and service tags on your deployment. See [Unified Service Tagging][10] for more information.

3. Finally, upload the dependency graph to Datadog:

{{< code-block lang="bash" >}}
datadog-ci dependencies upload deps.json --source snyk --service <SERVICE> --release-version <VERSION>
{{< /code-block >}}

By default, this command sends requests to Datadog US. To use Datadog EU, set the `DATADOG_SITE` environment variable to `datadoghq.eu`.

A minute or two after you deploy your service, the “Vulnerability” column on the [Profiles][11] page is populated with the highest classification of vulnerability for that service. Details about the CVE vulnerabilities for the service can be found in the Analysis tab on the sidebar (detailed view of the service).

## Troubleshooting

Need help? Contact [Datadog support][12].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/tracing/profiler/
[2]: https://snyk.io/product/vulnerability-database/
[3]: https://snyk.io/signup?utm_medium=Partner&utm_source=Datadog&utm_campaign=Datadog-Profiler-2020
[4]: https://docs.datadoghq.com/tracing/profiler/#getting-started
[5]: https://github.com/DataDog/datadog-ci
[6]: https://support.snyk.io/hc/en-us/articles/360003812538-Install-the-Snyk-CLI
[7]: https://support.snyk.io/hc/en-us/articles/360004008258
[8]: https://support.snyk.io/hc/en-us/articles/360003817357-Snyk-for-Java-Gradle-Maven-#UUID-95b4d4f4-3959-49fe-fffb-d6c9e8160c5a
[9]: https://support.snyk.io/hc/en-us/articles/360003812578-CLI-reference
[10]: https://docs.datadoghq.com/getting_started/tagging/unified_service_tagging/?tab=kubernetes
[11]: https://app.datadoghq.com/profiling
[12]: /help/
