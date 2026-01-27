---
title: Set up DORA Metrics
description: "Configure deployment and failure event data sources for DORA Metrics including APM Deployment Tracking, API, CLI, and incident management."
aliases:
- /continuous_integration/dora_metrics/setup/
- /continuous_integration/dora_metrics/setup/deployments
- /continuous_integration/dora_metrics/setup/incidents
- /dora_metrics/setup/incidents
- /dora_metrics/setup/deployments
- /dora_metrics/setup/failures/
- /dora_metrics/deployments/apm
- /dora_metrics/deployments/deployment_api
- /dora_metrics/deployments
- /dora_metrics/failures/incident_api
- /dora_metrics/failures/pagerduty
- /dora_metrics/failures/
further_reading:
- link: '/dora_metrics/'
  tag: 'Documentation'
  text: 'Learn about DORA Metrics'
- link: '/dora_metrics/calculation'
  tag: 'Documentation'
  text: 'Learn how the DORA metrics are calculated'
- link: '/dora_metrics/change-failure-detection'
  tag: 'Documentation'
  text: 'Learn about Change Failure Detection'
- link: '/tracing/software_catalog'
  tag: 'Documentation'
  text: 'Learn about the Software Catalog'
- link: 'https://github.com/DataDog/datadog-ci'
  tag: 'Source Code'
  text: 'Learn about the datadog-ci CLI tool'
---

## Overview

DORA Metrics tracks and measures your software delivery performance using deployment events. These events power all four key DORA metrics: deployment frequency, change lead time, change failure rate, and time to restore.

To start using DORA Metrics, follow these steps:

1. **[Configure a deployment data source](#configure-a-deployment-data-source)**: Choose how you want to send deployment events to Datadog: through APM Deployment Tracking or the DORA Metrics API/CLI.

2. **[Enrich deployments with commit information](#enrich-deployments-with-commit-information)**: Add Git metadata (repository URL and commit SHA) to your deployment events and synchronize your repository to Datadog to enable change lead time calculations.

3. **[Customize Change Failure Detection](#change-failure-detection)**: DORA Metrics automatically detects failed deployments through rollbacks (redeploying a previous version) and includes default rules for common rollforward patterns like revert PRs and hotfix labels. You can customize these rules to match your team's specific workflows and remediation patterns.

4. **[(Optional) Set up incidents tracking](#optional-incidents-tracking)**: Integrate incident data to correlate detected change failures with production incidents, providing a complete view of how your deployments affect service health.

When configured, deployment events automatically populate your [DORA Metrics dashboard][1] with performance data filtered by team, service, environment, and [custom tags](#custom-tags).

### Limitations

- When you first select a data source option (such as APM Deployment Tracking), DORA Metrics begins populating data from that point forward. If you switch from source A to source B, then back to source A, the historical data from source A is only available from the time it was first selected.
- Deployments of the same service cannot occur at the same second.

[1]: https://app.datadoghq.com/ci/dora
[2]: /software_catalog/

## Configure a deployment data source

DORA Metrics supports the following data sources for deployment events:

{{< tabs >}}
{{% tab "APM Deployment Tracking" %}}

[APM Deployment Tracking][15] can be configured as a data source for deployments in DORA Metrics.

### Requirements

- **APM Deployment Tracking** is enabled as a **Deployments** event data source in [DORA settings][19].
- Your service has [metadata][16] defined in the Software Catalog.
- Your service has [unified service tagging][17] enabled. Deployments are identified using the `version` tag.

For more information about ensuring service deployments that are tracked by APM contribute to change lead time, see [Enrich deployments with commit information](#enrich-deployments-with-commit-information).

[15]: /tracing/services/deployment_tracking
[16]: /software_catalog/adding_metadata
[17]: /getting_started/tagging/unified_service_tagging/?tab=kubernetes
[19]: https://app.datadoghq.com/ci/settings/dora

{{% /tab %}}
{{% tab "API or CLI" %}}

To send your own deployment events, use the [DORA Metrics API][21] or the [`datadog-ci dora deployment`][22] command.

### Requirements

- **datadog-ci CLI / API** is enabled as a **Deployments** event data source in [DORA settings][28].
- The following attributes are required:
  - `started_at`: The time the deployment started.
  - `finished_at`: The time the deployment finished.
  - `service`: The service that was deployed. If the provided service is registered in the [Software Catalog][23] with metadata set up (see [Adding Metadata][24]), the `team` of the service is automatically retrieved and associated with all metrics.

You can optionally add the following attributes to the deployment events:

- `repository_url`: The source code repository of the service. Required for calculating change lead time.
- `commit_sha`: The SHA of the HEAD commit associated with the deployment. Required for calculating change lead time.
- `team`: Associate a deployment with a different `team` than the one found automatically for the service.
- `env`: Filter your DORA metrics by environment on the [DORA Metrics][25] page.
- `id`: Identify a deployment. This attribute is user-generated; when not provided, the endpoint returns a Datadog-generated UUID.
- `version`: The deployment version.
- `custom_tags`: Tags in the form `key:value` that can be used to filter events on the [DORA Metrics][25] page.


### API (cURL) Example

See the [DORA Metrics API reference documentation][26] for the full spec and additional code samples.

For the following example, replace `<DD_SITE>` in the URL with {{< region-param key="dd_site" code="true" >}} and `${DD_API_KEY}` with your [Datadog API Key][27]:
```shell
  curl -X POST "https://api.<DD_SITE>/api/v2/dora/deployment" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "DD-API-KEY: ${DD_API_KEY}" \
  -d @- << EOF
  {
    "data": {
      "attributes": {
        "service": "shopist",
        "started_at": 1693491974000000000,
        "finished_at": 1693491984000000000,
        "git": {
          "commit_sha": "66adc9350f2cc9b250b69abddab733dd55e1a588",
          "repository_url": "https://github.com/organization/example-repository"
        },
        "env": "prod",
        "team": "backend",
        "version": "v1.12.07",
        "custom_tags": ["department:engineering", "app_type:backend"]
      }
    }
  }
EOF
```

### CLI Example

The [`datadog-ci`][22] CLI tool provides a shortcut to send deployment events within your Continuous Integration environment.

For the following example, set the `DD_SITE` environment variable to {{< region-param key="dd_site" code="true" >}} and set the `DD_API_KEY` environment variable to your [Datadog API Key][27]:
```shell
export DD_SITE="<DD_SITE>"
export DD_API_KEY="<DD_API_KEY>"

export deploy_start=`date +%s`
./your-deploy-script.sh
datadog-ci dora deployment --service shopist --env prod \
    --started-at $deploy_start --finished-at `date +%s` \
    --version v1.12.07 --custom-tags department:engineering \
    --custom-tags app_type:backend \
    --git-repository-url "https://github.com/organization/example-repository" \
    --git-commit-sha 66adc9350f2cc9b250b69abddab733dd55e1a588
```

The deployment finish time is automatically set to now if `--finished-at` is not provided.

If the deployment CI job is running on the exact same Git revision that is being deployed, `git-repository-url` and `git-commit-sha` can be omitted and are automatically inferred from the CI context.

The `--skip-git` option can be provided to disable sending the repository URL and commit SHA. When this option is added, the Change Lead Time metric becomes unavailable.

[21]: /api/latest/dora-metrics/#send-a-deployment-event-for-dora-metrics
[22]: https://github.com/DataDog/datadog-ci?tab=readme-ov-file#how-to-install-the-cli
[23]: /tracing/software_catalog
[24]: /tracing/software_catalog/adding_metadata
[25]: https://app.datadoghq.com/ci/dora
[26]: /api/latest/dora-metrics/#send-a-deployment-event-for-dora-metrics
[27]: https://app.datadoghq.com/organization-settings/api-keys
[28]: https://app.datadoghq.com/ci/settings/dora

{{% /tab %}}
{{< /tabs >}}

### Custom tags

If the service associated with the deployment is registered in the [Software Catalog][1] with metadata set up (see [Adding Metadata][2]), the `languages` of the service and any `tags` are automatically retrieved and associated with the event.

[1]: /tracing/software_catalog
[2]: /tracing/software_catalog/adding_metadata

## Enrich deployments with commit information

To enable change lead time calculation, configure Git information for your deployments and synchronize your repository metadata to Datadog. This allows DORA Metrics to track how long commits take from creation to deployment.

### Attach Git information to deployments

Datadog needs access to the Git information (repository URL and commit SHA) of your deployment's head commit SHA. The requirements differ based on your deployment data source:

{{< tabs >}}
{{% tab "APM Deployment Tracking" %}}

For deployments identified through APM Deployment Tracking, ensure your application telemetry is tagged with Git information:

- Enable Git tagging [in APM][101] or see the [Source Code Integration documentation][102]

**Note**: For APM-tracked deployments, change lead time is calculated from commit creation to when the commit is first observed in a new version. The `Deploy Time` metric is not available.

[101]: https://app.datadoghq.com/source-code/setup/apm
[102]: /integrations/guide/source-code-integration/?tab=go#tag-your-telemetry-with-git-information

{{% /tab %}}
{{% tab "API or CLI" %}}

For deployments tracked by the DORA Metrics API or the `datadog-ci dora deployment` command, ensure:

- The attributes `repository_url` and `commit_sha` are included in the deployment events payload

{{% /tab %}}
{{< /tabs >}}

### Synchronize repository metadata to Datadog

Datadog needs access to your repository metadata (commits, file paths) to retrieve all commits deployed between one deployment and the previous one. Choose the synchronization method based on your Git provider:

{{< tabs >}}
{{% tab "GitHub" %}}

<div class="alert alert-danger">
GitHub workflows running on <a href="https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#pull_request"> <code>pull_request</code> trigger </a> are not currently supported by the GitHub integration.
If you are using the <code>pull_request</code> trigger, use the alternative method.
</div>

If the [GitHub integration][1] is not already installed, install it on the [GitHub integration tile][2].

When configuring the GitHub application:
1. Select at least **Read** repository permissions for **Contents** and **Pull Requests**.
2. Subscribe at least to **Push**, **PullRequest** and **PullRequestReview** events.

To confirm that the setup is valid, select your GitHub application in the [GitHub integration tile][2] and verify that the **Datadog Features** table shows **Pull Request Information** meets all requirements.

[1]: https://docs.datadoghq.com/integrations/github/
[2]: https://app.datadoghq.com/integrations/github/
{{% /tab %}}

{{% tab "GitLab" %}}
If the [GitLab integration][1] is not already installed, install it on the [GitHub integration tile][2].

[1]: https://docs.datadoghq.com/integrations/guide/source-code-integration/?tab=gitlabsaasonprem#source-code-management-providers
[2]: https://app.datadoghq.com/integrations/gitlab-source-code?subPath=configuration

**Note**: The scope of the service account's personal access token needs to be at least `read_api`.

### Handling GitLab groups and subgroups

If your repositories are organized under [**GitLab groups or subgroups**][1] (for example,
`https://gitlab.com/my-org/group(/subgroup)/repo`),
the automatic service path detection may not resolve correctly due to GitLab's nested group structure.

To ensure that DORA metrics handle your service's source code paths correctly,
you can use the following configuration in your service definition:

```yaml
extensions:
  datadoghq.com/dora-metrics:
    source_patterns:
      # All paths relative to the repository URL provided with the deployment
      - **
      # or specific paths related to this service (for monorepos)
      - src/apps/shopist/**
      - src/libs/utils/**
```
[1]: https://docs.gitlab.com/user/group/

{{% /tab %}}

{{% tab "Other Git Providers" %}}

You can upload your Git repository metadata with the [`datadog-ci git-metadata upload`][1] command.
When this command is executed, Datadog receives the repository URL, the commit SHA of the current branch, and a list of tracked file paths.

Run this command in CI for every new commit. If a deployment is executed for a specific commit SHA, ensure that the `datadog-ci git-metadata upload` command is run for that commit **before** the deployment event is sent.

<div class="alert alert-danger">
Do not provide the <code>--no-gitsync</code> option to the <code>datadog-ci git-metadata upload</code> command.
When that option is included, the commit information is not sent to Datadog and the change lead time metric is not calculated.
</div>

You can validate the correct setup of the command by checking the command output. An example of a correct output is:
```
Reporting commit 007f7f466e035b052415134600ea899693e7bb34 from repository git@github.com:organization/example-repository.git.
180 tracked file paths will be reported.
✅  Handled in 0.077 seconds.
```

[1]: https://github.com/DataDog/datadog-ci/tree/master/packages/base/src/commands/git-metadata
{{% /tab %}}
{{< /tabs >}}

### Handling multiple services in the same repository

If the source code of multiple services is present in the same repository, further actions are needed to ensure that the change lead time is calculated by taking into account only the commits affecting the specific service being deployed.

To filter the commits measured to only the ones that affect the service, specify the source code glob file path patterns in the [service definition][5].

If the service definition contains a **full** GitHub or GitLab URL to the application folder, a single path pattern is automatically used. The link type must be **repo** and the link name must be either "Source" or the name of the service (`shopist` in the examples below).

**Example (schema version v2.2):**
{{< tabs >}}
{{% tab "GitHub" %}}
```yaml
links:
  - name: shopist
    type: repo
    provider: github
    url: https://github.com/organization/example-repository/tree/main/src/apps/shopist
```
{{% /tab %}}
{{% tab "GitLab" %}}
```yaml
links:
  - name: shopist
    type: repo
    provider: gitlab
    url: https://gitlab.com/organization/example-repository/-/tree/main/src/apps/shopist?ref_type=heads
```
{{% /tab %}}
{{< /tabs >}}

DORA Metrics for the `shopist` service only consider the Git commits that include changes within `src/apps/shopist/**`. You can configure more granular control of the filtering with `extensions[datadoghq.com/dora-metrics]`.

**Example (schema version v2.2):**

```yaml
extensions:
  datadoghq.com/dora-metrics:
    source_patterns:
      - src/apps/shopist/**
      - src/libs/utils/**
```

DORA Metrics for the service `shopist` only consider the Git commits that include changes within `src/apps/shopist/**` or `src/libs/utils/**`.

If the two metadata entries are defined for a service, only `extensions[datadoghq.com/dora-metrics]` is considered to filter the commits.

[5]: /tracing/software_catalog/adding_metadata

## Customize Change Failure Detection

DORA Metrics automatically identifies failed deployments to calculate change failure rate and failed deployment recovery time.

### How it works

[Change Failure Detection][change-failure-detection] operates out-of-the-box by identifying remediation deployments and linking them back to the specific deployment they are remediating.

**Automatic detection (no configuration needed)**:
- **Rollbacks**: Automatically detected when a previously deployed version is redeployed.

**Custom rules (customizable)**:
- **Rollforwards**: Detected through default rules that match common patterns like revert PRs and hotfix labels. You can customize these rules in the [DORA settings][dora-settings] to match your team's specific workflows and remediation patterns.

For detailed information about how detection works and how to customize rules, see the [Change Failure Detection documentation][change-failure-detection].

[dora-settings]: https://app.datadoghq.com/ci/settings/dora
[change-failure-detection]: /dora_metrics/change_failure_detection/

## (Optional) Set up incidents tracking

Integrating incident data provides a comprehensive view of how your deployment activity impacts service health. By tracking incidents alongside automatically detected change failures, you can correlate delivery performance with real-world operational impact and understand the full story of your software delivery's effect on service reliability.

DORA Metrics supports the following options for tracking incidents:

{{< tabs >}}
{{% tab "Datadog Incidents" %}}
DORA Metrics can automatically identify and track failures through [Datadog Incidents][201]. After incidents are declared, DORA uses them to measure change failure rate and time to restore.

**Note**: The time to restore is measured as the total duration an incident spends in the `active` state. For cases like `active` → `stable` → `active` → `stable`, it includes all `active` periods. The time to restore is shown only when an incident is in a `stable` or `resolved` state. If a `resolved` incident is reactivated, the metric is hidden until it's `resolved` again.


### Requirements

- **Incidents** is enabled as a **Failures** event data source in [DORA settings][202].

To avoid having unlabeled failures, Datadog strongly recommends adding the following attributes to incidents:
  - `Teams`
  - `Services`
  - `Envs`: The `Envs` attribute can be added in the [Incident Settings][203] if it doesn't already exist.

If provided with incidents, the `Severity` tag is added to failure events.

**Recommended**: In the [Incident Settings][203], set attributes field `Prompted` to `At Resolution` to ensure you never forget to add these attributes to your incidents.

### Include historical incidents

You can retroactively include incidents from the past two years by selecting **Backfill Data** in the [DORA settings][202], which creates failures from those incidents. Backfilling data can take up to an hour to complete.

[201]: /incident_response/incident_management/
[202]: https://app.datadoghq.com/ci/settings/dora
[203]: https://app.datadoghq.com/incidents/settings?section=property-fields


{{% /tab %}}
{{% tab "PagerDuty" %}}
[PagerDuty][104] is an incident management platform that equips IT teams with immediate incident visibility, enabling proactive and effective responses to maintain operational stability and resilience.

To integrate your PagerDuty account with DORA Metrics:

1. Enable **PagerDuty** as a **Failures** event data source in [DORA settings][111].

1. Navigate to **Integrations > Developer Tools** in PagerDuty and click **Generic Webhooks (v3)**.

1. Click **+ New Webhook** and enter the following details:

     <table>
      <thead>
        <tr>
          <th>Variable</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Webhook URL</td>
          <td>Add <code>https://webhook-intake.{{< region-param key="dd_site" >}}/api/v2/webhook/</code>.</td>
        </tr>
        <tr>
          <td>Scope Type</td>
          <td>Select the scope of which incidents you want to send. You can send incidents for a specific <strong>Service</strong> or <strong>Team</strong>, or all PagerDuty services in your <strong>Account</strong>. Depending on your environment and access level, some scope types may not be available.</td>
        </tr>
        <tr>
          <td>Description</td>
          <td>A description helps distinguish the webhook. Add something like <code>Datadog DORA Metrics integration</code>.</td>
        </tr>
        <tr>
          <td>Event Subscription</td>
          <td>Select the following events:<br>-<code>incident.acknowledged</code><br>-<code>incident.annotated</code><br>-<code>incident.custom_field_values.updated</code><br>-<code>incident.delegated</code><br>-<code>incident.escalated</code><br>-<code>incident.priority_updated</code><br>-<code>incident.reassigned</code><br>-<code>incident.reopened</code><br>-<code>incident.resolved</code><br>-<code>incident.triggered</code><br>-<code>incident.unacknowledged</code></td>
        </tr>
        <tr>
          <td>Custom Headers</td>
          <td>Click <strong>Add custom header</strong>, enter <code>DD-API-KEY</code> as the name, and input your <a href="https://docs.datadoghq.com/api/latest/authentication/#api-keys">Datadog API key</a> as the value.<br><br>Optionally, you can add an environment to all of the PagerDuty incidents sent from the webhook by creating an additional custom header with the name <code>dd_env</code> and the desired environment as the value.</td>
        </tr>
      </tbody>
    </table>

1. To save the webhook, click **Add Webhook**.

The severity of the failure in the DORA Metrics product is based on the [incident priority][106] in PagerDuty.

**Note:** Upon webhook creation, a new secret is created and used to sign all the webhook payloads. That secret is not needed for the integration to work, as the authentication is performed using the API key instead.

### Mapping PagerDuty services to Datadog services

When an incident event is received for a specific [PagerDuty service][101], Datadog attempts to retrieve the related Datadog service and team from any triggering [Datadog monitors][107] and from the [Software Catalog][102].

The matching algorithm works in the following steps:

1. If the PagerDuty incident event was [triggered from a Datadog monitor][107]:
   - If the monitor is in [Multi Alert mode][109], the incident metrics and events are emitted with the `env`, `service`, and `team` from the alerted group.
   - If the monitor has [tags][110] for `env`, `service`, or `team`:
     - `env`: If the monitor has a single `env` tag, the incident metrics and events are emitted with the environment.
     - `service`: If the monitor has one or more `service` tags, the incident metrics and events are emitted with the provided services.
     - `team`: If the monitor has a single `team` tag, the incident metrics and events are emitted with the team.

2. If the service URL of the incident matches the PagerDuty service URL for any services in the Software Catalog:
   - If a single Datadog service matches, the incident metrics and events are emitted with the service and team.
   - If multiple Datadog services match, the incident metrics and events are emitted with the team.

   For more information about setting the PagerDuty service URL for a Datadog service, see [Use Integrations with Software Catalog][103].

3. If the PagerDuty service name of the incident matches a service name in the Software Catalog, the incident metrics and events are emitted with the service and team.
4. If the PagerDuty team name of the incident matches a team name in the Software Catalog, the incident metrics and events are emitted with the team.
5. If the PagerDuty service name of the incident matches a team name in the Software Catalog, the incident metrics and events are emitted with the team.
6. If there have been no matches up to this point, the incident metrics and events are emitted with the PagerDuty service and PagerDuty team provided in the incident.

<div class="alert alert-danger">
If an incident is resolved manually in PagerDuty instead of from a monitor notification, the incident resolution event does not contain monitor information and the first step of the matching algorithm is skipped.
</div>

[101]: https://support.pagerduty.com/docs/services-and-integrations
[102]: /software_catalog/
[103]: /software_catalog/integrations/#pagerduty-integration
[104]: /integrations/pagerduty/
[106]: https://support.pagerduty.com/main/docs/incident-priority
[107]: /integrations/pagerduty/#troubleshooting
[109]: /monitors/configuration/#multi-alert
[110]: /monitors/manage/#monitor-tags
[111]: https://app.datadoghq.com/ci/settings/dora


{{% /tab %}}
{{% tab "API" %}}

To send your own failure events, use the [DORA Metrics API][13]. Failure events are used in order to calculate change failure rate and time to restore.

Include the `finished_at` attribute in a failure event to mark that the failure is resolved. You can send events at the start of the failure and after it has been resolved. Failure events are matched by the `env`, `service` and `started_at` attributes.

### Requirements

- **datadog-ci CLI / API** is enabled as a **Failures** event data source in [DORA settings][15].
- The following attributes are required:
  - `services` or `team` (at least one must be present)
  - `started_at`

You can optionally add the following attributes to the failure events:
- `finished_at` for *resolved failures*. ***Required for calculating time to restore***
- `id` for identifying failures. This attribute is user-generated; when not provided, the endpoint returns a Datadog-generated UUID.
- `name` to describe the failure.
- `severity`
- `env` to filter your DORA metrics by environment on the [**DORA Metrics** page][14].
- `repository_url`
- `commit_sha`
- `version`
- `custom_tags`: Tags in the form `key:value` that can be used to filter events on the [**DORA Metrics** page][14].

See the [DORA Metrics API reference documentation][13] for the full spec and additional code samples.

### API (cURL) Example

For the following configuration, replace `<DD_SITE>` with {{< region-param key="dd_site" >}}:

```shell
curl -X POST "https://api.<DD_SITE>/api/v2/dora/failure" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "DD-API-KEY: ${DD_API_KEY}" \
  -d @- << EOF
  {
    "data": {
      "attributes": {
        "services": ["shopist"],
        "team": "shopist-devs",
        "started_at": 1693491974000000000,
        "finished_at": 1693491984000000000,
        "git": {
          "commit_sha": "66adc9350f2cc9b250b69abddab733dd55e1a588",
          "repository_url": "https://github.com/organization/example-repository"
        },
        "env": "prod",
        "name": "Web server is down failing all requests",
        "severity": "High",
        "version": "v1.12.07",
        "custom_tags": ["department:engineering", "app_type:backend"]
      }
    }
  }
EOF
```

[13]: /api/latest/dora-metrics/#send-a-failure-event-for-dora-metrics
[14]: https://app.datadoghq.com/ci/dora
[15]: https://app.datadoghq.com/ci/settings/dora


{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
