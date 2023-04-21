---
title: Set up Tracing on a GitLab Pipeline
kind: documentation
aliases:
  - /continuous_integration/setup_pipelines/gitlab
further_reading:
    - link: "/continuous_integration/pipelines"
      tag: "Documentation"
      text: "Explore Pipeline Execution Results and Performance"
    - link: "/continuous_integration/troubleshooting/"
      tag: "Documentation"
      text: "Troubleshooting CI"
    - link: "/continuous_integration/pipelines/custom_tags_and_metrics/"
      tag: "Documentation"
      text: "Extend Pipeline Visibility by adding custom tags and metrics"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">CI Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

## Compatibility

- **Supported GitLab versions**:
  - GitLab.com (SaaS)
  - GitLab >= 14.1 (self-hosted)
  - GitLab >= 13.7.0 (self-hosted) by enabling the `datadog_ci_integration` feature flag

- **Partial pipelines**: View [partially retried][11] and downstream pipeline executions

- **Manual steps**: View manually triggered pipelines

- **Queue time**: View amount of time pipeline jobs wait in the queue before processing

- **Logs correlation**: Correlate pipeline spans to logs and [enable job log collection][12]

- **Infrastructure metric correlation**: Correlate pipelines to [infrastructure host metrics][14] for self-hosted GitLab runners

- **Custom spans**: Configure custom spans

- **Custom pre-defined tags**: Configure [custom tags][10] and metrics at runtime

- **Parameters**: Set custom `env` or `service` [parameters][13]

- **Pipeline failure reasons**: Identify pipeline failure reasons from [error messages][15]

## Configure the Datadog integration

{{< tabs >}}
{{% tab "GitLab.com" %}}

Configure the integration on a [project][1] or [group][2] by going to **Settings > Integrations > Datadog** for each project or group you want to instrument.

[1]: https://docs.gitlab.com/ee/user/admin_area/settings/project_integration_management.html#use-custom-settings-for-a-group-or-project-integration
[2]: https://docs.gitlab.com/ee/user/admin_area/settings/project_integration_management.html#manage-group-level-default-settings-for-a-project-integration
{{% /tab %}}
{{% tab "GitLab &gt;&equals; 14.1" %}}

Configure the integration on a [project][1] or [group][2] by going to **Settings > Integrations > Datadog** for each project or group you want to instrument.

You can also activate the integration at the GitLab [instance][3] level, by going to **Admin > Settings > Integrations > Datadog**.

[1]: https://docs.gitlab.com/ee/user/admin_area/settings/project_integration_management.html#use-custom-settings-for-a-group-or-project-integration
[2]: https://docs.gitlab.com/ee/user/admin_area/settings/project_integration_management.html#manage-group-level-default-settings-for-a-project-integration
[3]: https://docs.gitlab.com/ee/user/admin_area/settings/project_integration_management.html#manage-instance-level-default-settings-for-a-project-integration
{{% /tab %}}
{{% tab "GitLab &lt; 14.1" %}}

Enable the `datadog_ci_integration` [feature flag][1] to activate the integration. Run one of the following commands, which use GitLab's [Rails Runner][2], depending on your installation type:

**Omnibus installations**

{{< code-block lang="shell" >}}
sudo gitlab-rails runner "Feature.enable(:datadog_ci_integration)"
{{< /code-block >}}

**From source installations**

{{< code-block lang="shell" >}}
sudo -u git -H bundle exec rails runner \
  -e production \
  "Feature.enable(:datadog_ci_integration)"
{{< /code-block >}}

**Kubernetes installations**

{{< code-block lang="shell" >}}
kubectl exec -it <task-runner-pod-name> -- \
  /srv/gitlab/bin/rails runner "Feature.enable(:datadog_ci_integration)"
{{< /code-block >}}

Then, configure the integration on a [project][3] by going to **Settings > Integrations > Datadog** for each project you want to instrument.

<div class="alert alert-warning"><strong>Note</strong>: Due to a <a href="https://gitlab.com/gitlab-org/gitlab/-/issues/335218">bug</a> in early versions of GitLab, the Datadog integration cannot be enabled at <strong>group or instance</strong> level on <strong>GitLab versions < 14.1</strong>, even if the option is available on GitLab's UI</div>

[1]: https://docs.gitlab.com/ee/administration/feature_flags.html
[2]: https://docs.gitlab.com/ee/administration/operations/rails_console.html#using-the-rails-runner
[3]: https://docs.gitlab.com/ee/user/admin_area/settings/project_integration_management.html#use-custom-settings-for-a-group-or-project-integration
{{% /tab %}}
{{< /tabs >}}

Fill in the integration configuration settings:

**Active**
: Enables the integration.

**Datadog site**
: Specifies which [Datadog site][1] to send data to.<br/>
**Default**: `datadoghq.com`<br/>
**Selected site**: {{< region-param key="dd_site" code="true" >}}<br/>

**API URL** (optional)
: Allows overriding the API URL used for sending data directly, only used in advanced scenarios.<br/>
**Default**: (empty, no override)

**API key**
: Specifies which API key to use when sending data. You can generate one in the [APIs tab][2] of the Integrations section on Datadog.

**Service** (optional)
: Specifies which service name to attach to each span generated by the integration. Use this to differentiate between GitLab instances.<br/>
**Default**: `gitlab-ci`

**Env** (optional)
: Specifies which environment (`env` tag) to attach to each span generated by the integration. Use this to differentiate between groups of GitLab instances (for example: staging or production).<br/>
**Default**: `none`

**Tags** (optional)
: Specifies any custom tags to attach to each span generated by the integration. Provide one tag per line in the format: `key:value`.<br/>
**Default**: (empty, no additional tags)<br/>
**Note**: Available only in GitLab.com and GitLab >= 14.8 self-hosted.

You can test the integration with the **Test settings** button (only available when configuring the integration on a project). After it's successful, click **Save changes** to finish the integration set up.

## Integrate through webhooks

As an alternative to using the native Datadog integration, you can use [webhooks][3] to send pipeline data to Datadog.

<div class="alert alert-info"><strong>Note</strong>: The native Datadog integration is the recommended approach and the option that is actively under development.</div>

Go to **Settings > Webhooks** in your repository (or GitLab instance settings), and add a new webhook:

- **URL**: <code>https://webhook-intake.{{< region-param key="dd_site" >}}/api/v2/webhook/?dd-api-key=<API_KEY></code> where `<API_KEY>` is your [Datadog API key][2].
- **Secret Token**: leave blank
- **Trigger**: Select `Job events` and `Pipeline events`.

To set custom `env` or `service` parameters, add more query parameters in the webhooks URL: `&env=<YOUR_ENV>&service=<YOUR_SERVICE_NAME>`

### Set custom tags

To set custom tags to all the pipeline and job spans generated by the integration, add to the **URL** a URL-encoded query parameter `tags`, with `key:value` pairs separated by commas. If a key:value pair contains any commas, surround it with quotes. For example, to add `key1:value1,"key2: value with , comma",key3:value3`, the following string would need to be appended to the **Webhook URL**:

`?tags=key1%3Avalue1%2C%22key2%3A+value+with+%2C+comma%22%2Ckey3%3Avalue3`

## Visualize pipeline data in Datadog

After the integration is successfully configured, the [Pipelines][4] and [Pipeline Executions][5] pages populate with data after the pipelines finish.

**Note**: The Pipelines page shows data for only the default branch of each repository.

### Partial and downstream pipelines

In the **Pipeline Executions** page, you can use the filters below in the search bar:

`Downstream Pipeline`
: Possible values: `true`, `false`

`Manually Triggered`
: Possible values: `true`, `false`

`Partial Pipeline`
: Possible values: `retry`, `paused`, `resumed`

{{< img src="ci/partial_retries_search_tags.png" alt="The Pipeline executions page with Partial Pipeline:retry entered in the search query" style="width:100%;">}}

These filters can also be applied through the facet panel on the left hand side of the page.
{{< img src="ci/partial_retries_facet_panel.png" alt="The facet panel with Partial Pipeline facet expanded and the value Retry selected, the Partial Retry facet expanded and the value true selected" style="width:40%;">}}


### Correlate infrastructure metrics to jobs

If you are using self-hosted GitLab runners, you can correlate jobs with the infrastructure that is running them.
For this feature to work, the GitLab runner must have a tag of the form `host:<hostname>`. Tags can be added while
[registering a new runner][6]. For existing runners, add tags by updating the runner's `config.toml`. Or add tags
through the UI by going to **Settings > CI/CD > Runners** and editing the appropriate runner.

After these steps, CI Visibility adds the hostname to each job. To see the metrics, click on a job span in the trace
view. In the drawer, a new tab named **Infrastructure** appears which contains the host metrics.

### View error messages for pipeline failures

Error messages are supported for GitLab versions 15.2.0 and above.

For failed GitLab pipeline executions, each error under the `Errors` tab within a specific pipeline execution displays a message associated with the error type from GitLab.

{{< img src="ci/ci_gitlab_failure_reason_new.png" alt="GitLab Failure Reason" style="width:100%;">}}

See the table below for the message and domain correlated with each error type. Any unlisted error type will lead to the error message of `Job failed` and error domain of `unknown`.

| Error Type | Error Message | Error Domain |
| :---  |    :----:   |  ---: |
|  unknown_failure  |  Failed due to unknown reason  |  unknown
|  config_error  |  Failed due to error on CI/CD configuration file |  user
|  external_validation_failure  |  Failed due to external pipeline validation  |  unknown
|  user_not_verified  |  The pipeline failed due to the user not being verified  |  user
|  activity_limit_exceeded  |  The pipeline activity limit was exceeded  |  provider
|  size_limit_exceeded  |  The pipeline size limit was exceeded  |  provider
|  job_activity_limit_exceeded  |  The pipeline job activity limit was exceeded  |  provider
|  deployments_limit_exceeded  |  The pipeline deployments limit was exceeded  |  provider
|  project_deleted  |  The project associated with this pipeline was deleted  |  provider
|  api_failure  |  API Failure  |  provider
|  stuck_or_timeout_failure  |  Pipeline is stuck or timed out  |  unknown
|  runner_system_failure  |  Failed due to runner system failure  |  provider
|  missing_dependency_failure  |  Failed due to missing dependency  |  unknown
|  runner_unsupported  |  Failed due to unsupported runner  |  provider
|  stale_schedule  |  Failed due to stale schedule  |  provider
|  job_execution_timeout  |  Failed due to job timeout  |  unknown
|  archived_failure  |  Archived failure  |  provider
|  unmet_prerequisites  |  Failed due to unmet prerequisite  |  unknown
|  scheduler_failure  |  Failed due to schedule failure  |  provider
|  data_integrity_failure  |  Failed due to data integrity  |  provider
|  forward_deployment_failure  |  Deployment failure  |  unknown
|  user_blocked  |  Blocked by user  |  user
|  ci_quota_exceeded  |  CI quota exceeded  |  provider
|  pipeline_loop_detected  |  Pipeline loop detected  |  user
|  builds_disabled  |  Build disabled  |  user
|  deployment_rejected  |  Deployment rejected  |  user
|  protected_environment_failure  |  Environment failure  |  provider
|  secrets_provider_not_found  |  Secret provider not found  |  user
|  reached_max_descendant_pipelines_depth  |  Reached max descendant pipelines  |  user
|  ip_restriction_failure  |  IP restriction failure  |  provider

<!-- | ---------- | ---------- | ---------- | -->
<!-- | :---        |    :----:   |          ---: | -->

## Enable job log collection (beta)

The following GitLab versions support collecting job logs:
* GitLab.com (SaaS)
* GitLab >= 14.8 (self-hosted) only if using [object storage to store job logs][7]

To enable collection of job logs:

1. Enable the `datadog_integration_logs_collection` [feature flag][8] in your GitLab self-hosted or GitLab.com account. This reveals the `Enable logs collection` option in the Datadog integration.
2. Enable the `Enable logs collection` option and save the changes.

Job logs are collected in the [Logs][9] product and automatically correlated with the GitLab pipeline within CI Visibility.

<div class="alert alert-info"><strong>Note</strong>: Logs are billed separately from CI Visibility</div>

Log files larger than 1GiB are truncated.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/site/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://docs.gitlab.com/ee/user/project/integrations/webhooks.html
[4]: https://app.datadoghq.com/ci/pipelines
[5]: https://app.datadoghq.com/ci/pipeline-executions
[6]: https://docs.gitlab.com/runner/register/
[7]: https://docs.gitlab.com/ee/administration/job_artifacts.html#using-object-storage
[8]: https://docs.gitlab.com/ee/administration/feature_flags.html
[9]: /logs/
[10]: /continuous_integration/pipelines/gitlab/?tab=gitlabcom#set-custom-tags
[11]: http://docs.datadoghq.com/continuous_integration/pipelines/gitlab/?tab=gitlabcom#partial-and-downstream-pipelines
[12]: http://docs.datadoghq.com/continuous_integration/pipelines/gitlab/?tab=gitlabcom#enable-job-log-collection-beta
[13]: http://docs.datadoghq.com/continuous_integration/pipelines/gitlab/?tab=gitlabcom#integrating-through-webhooks
[14]: /continuous_integration/pipelines/gitlab/?tab=gitlabcom#correlate-infrastructure-metrics-to-jobs
[15]: /continuous_integration/pipelines/gitlab/?tab=gitlabcom#view-error-messages-for-pipeline-failures