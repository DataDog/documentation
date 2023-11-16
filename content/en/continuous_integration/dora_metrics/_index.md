---
title: DORA Metrics
kind: documentation
description: Learn how to use DORA metrics to improve and measure software development.
is_beta: true
further_reading:
- link: "/continuous_integration/pipelines"
  tag: "Documentation"
  text: "Learn about Pipeline Visibility"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">CI Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

{{< callout url="https://forms.gle/Eqq6uXfGjYxmqpjDA" header="false" >}}
DORA Metrics are in private beta for <a href="https://docs.datadoghq.com/continuous_integration/pipelines/">CI Pipeline Visibility</a> customers. To request access, complete the form.
{{< /callout >}}

## Overview

DevOps Research and Assessment (DORA) metrics are [four key metrics][1] used to indicate the velocity and stability of software development. 

Deployment Frequency
: How often an organization successfully releases to production.

Lead Time for Changes
: The amount of time it takes a commit to get into production.

Change Failure Rate
: The percentage of deployments causing a failure in production.

Time to Restore Service
: How long it takes an organization to recover from a failure in production.

Defining and tracking DORA metrics can help you identify areas of improvement for your team or organization's software delivery speed and quality.

## Set up DORA Metrics

### Deployment frequency

Submit a deployment by viewing the [endpoint specification][2] for a sample payload and using the [DORA Metrics API][3].

You are required to add the following deployment attributes:

- `service`
- `started_at`
- `finished_at`

You can optionally add the following deployment attributes:

- `env` to accurately filter your DORA metrics by environment.
- `repository_url` and `commit_sha` must both be present if you would like your deployment to be factored into [change lead time](#lead-time-for-changes).

### Lead time for changes

Change lead time, or lead time for changes, is calculated as the time from creation of the first commit to when that commit's deployment is finished.

Run the `datadog-ci git-metadata upload` command using the [`datadog-ci`][3] CLI tool to submit git commit data for every commit push. If you are using the [GitHub integration][4], you do not need to run this command.

Submit a deployment using the [DORA Metrics API][3] and include `repository_url` and `commit_sha` attributes.

<div class="alert alert-warning">If you are deploying from a different repository than where your commits are taking place or triggering deployments from a third party, your commit data may be missing.</div>

### Change failure rate

Change failure rate is calculated as the number of incident events divided by the sum of deployments.

Submit a deployment by viewing the [endpoint specification][2] for a sample payload and using the [DORA Metrics API][3].

Submit an incident by viewing the [endpoint specification][2] for a sample payload and using the [DORA Metrics API][3].

You are required to add the following incident attributes:

- `service`
- `started_at`

You can optionally add the following deployment attributes:

- `severity`
- `env` to accurately filter your DORA metrics by environment.

### Time to restore service

Mean time to restore (MTTR) is calculated as the duration distribution for incident-solved events.

You are required to add the following incident attributes:

- `service`
- `finished_at`

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://cloud.google.com/blog/products/devops-sre/using-the-four-keys-to-measure-your-devops-performance
[2]: /api/latest/dora-metrics
[3]: https://www.npmjs.com/package/@datadog/datadog-ci
[4]: /integrations/github/
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: https://app.datadoghq.com/organization-settings/application-keys
[7]: https://github.com/DataDog/datadog-ci/blob/master/README.md
[8]: /continuous_integration/guides/flaky_test_management/
[9]: https://docs.github.com/en/rest/checks
[10]: https://app.datadoghq.com/integrations/github
[11]: https://docs.datadoghq.com/integrations/github/
