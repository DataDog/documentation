---
aliases:
- /ja/continuous_integration/setup_pipelines/gitlab
further_reading:
- link: /continuous_integration/pipelines
  tag: ドキュメント
  text: パイプラインの実行結果とパフォーマンスを確認する
- link: /continuous_integration/troubleshooting/
  tag: ドキュメント
  text: CI Visibility のトラブルシューティング
- link: /continuous_integration/pipelines/custom_tags_and_measures/
  tag: ドキュメント
  text: カスタムタグと測定値を追加してパイプラインの可視性を拡張する
title: GitLab パイプラインでトレースを設定する
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">CI Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

## Overview

[GitLab][19] is a DevOps platform that automates the software development lifecycle with integrated CI/CD features, enabling you to deploy applications quickly and securely.

Set up tracing in GitLab to collect data on your pipeline executions, analyze performance bottlenecks, troubleshoot operational issues, and optimize your deployment workflows.

### Compatibility

| Pipeline Visibility | Platform | Definition |
|---|---|---|
| [Running pipelines][25] | Running pipelines | View pipeline executions that are running. Queued or waiting pipelines show with status "Running" on Datadog. |
| [Partial retries][20] | Partial pipelines | View partially retried pipeline executions. |
| [Manual steps][21] | Manual steps | View manually triggered pipelines. |
| [Queue time][22] | Queue time | View the amount of time pipeline jobs sit in the queue before processing. |
| Logs correlation | Logs correlation | Correlate pipeline spans to logs and enable [job log collection][12]. |
| Infrastructure metric correlation | Infrastructure metric correlation | Correlate jobs to [infrastructure host metrics][14] for self-hosted GitLab runners. |
| Custom pre-defined tags | Custom pre-defined tags | Set [custom tags][10] to all generated pipeline, stages, and job spans. |
| [Custom tags][15] [and measures at runtime][16] | Custom tags and measures at runtime | Configure [custom tags and measures][13] at runtime. |
| Parameters | Parameters | Set custom `env` or `service` parameters when a pipeline is triggered. |
| [Pipeline failure reasons][11] | Pipeline failure reasons | Identify pipeline failure reasons from [error messages][15]. |
| [Approval wait time][23] | Approval wait time  | View the amount of time jobs and pipelines wait for manual approvals. |
| [Execution time][24] | Execution time  | View the amount of time pipelines have been running jobs. Gitlab refers to this metric as `duration`. Duration in Gitlab and execution time may show different values. Gitlab does not take into consideration jobs that failed due to certain kinds of failures (such as runner system failures). |

The following GitLab versions are supported:

- GitLab.com (SaaS)
- GitLab >= 14.1 (self-hosted)
- GitLab >= 13.7.0 (self-hosted) with the `datadog_ci_integration` feature flag enabled

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

{{% tab "GitLab &lt; 13.7" %}}

For older versions of GitLab, you can use [webhooks][1] to send pipeline data to Datadog.

<div class="alert alert-info"><strong>Note</strong>: Direct support with webhooks is not under development. Unexpected issues could happen. Datadog recommends that you update GitLab instead.</div>

リポジトリ (または GitLab インスタンス設定) の **Settings > Webhooks** に移動し、新しい Webhook を追加します。

- **URL**: <code>https://webhook-intake.{{< region-param key="dd_site" >}}/api/v2/webhook/?dd-api-key=<API_KEY></code> ここで、`<API_KEY>` は [Datadog API キー][2]です。
- **Secret Token**: 空白のままにします
- **Trigger**: `Job events` と `Pipeline events` を選択します。

カスタムの `env` または `service` パラメーターを設定するには、Webhook の URL で他のクエリパラメーターを追加します: `&env=<YOUR_ENV>&service=<YOUR_SERVICE_NAME>`

**Set custom tags**

インテグレーションによって生成されたすべてのパイプラインとジョブのスパンにカスタムタグを設定するには、**URL** に URL エンコードされたクエリパラメーター `tags` を追加し、`key:value` ペアをカンマで区切って指定します。key:value のペアにカンマが含まれる場合は、引用符で囲んでください。例えば、`key1:value1, "key2: value with , comma",key3:value3` を追加するには、以下の文字列を **Webhook URL** に追記する必要があります。

`?tags=key1%3Avalue1%2C%22key2%3A+value+with+%2C+comma%22%2Ckey3%3Avalue3`

[1]: https://docs.gitlab.com/ee/user/project/integrations/webhooks.html
[2]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{< /tabs >}}

インテグレーションコンフィギュレーション設定を入力します。

**Active**
: インテグレーションを有効にします。

**Datadog site**
: データを送信する [Datadog サイト][1]を指定します。<br/>
**デフォルト**: `datadoghq.com`<br/>
**選択したサイト**: {{< region-param key="dd_site" code="true" >}}<br/>

**API URL** (オプション)
: データを直接送信するために使用される API URL をオーバーライドできます。これは、高度なシナリオでのみ使用されます。<br/>
**デフォルト**: (空、オーバーライドなし)

**API key**
: データを送信するときに使用する API キーを指定します。Datadog の Integrations セクションの [APIs タブ][2]で生成できます。

**Service** (オプション)
: インテグレーションによって生成された各スパンにアタッチするサービス名を指定します。これを使用して、GitLab インスタンスを区別します。<br/>
**デフォルト**: `gitlab-ci`

**Env** (オプション)
: インテグレーションによって生成された各スパンに接続する環境 (`env` タグ) を指定します。これを使用して、GitLab インスタンスのグループを区別します (例: ステージングまたは本番)。<br/>
**デフォルト**: `none`

**タグ** (オプション)
: インテグレーションによって生成された各スパンに付ける任意のカスタムタグを指定します。1 行に 1 つのタグを `key:value` の形式で指定します。<br/>
**デフォルト**: (空、追加タグなし)<br/>
**注**: GitLab.com と GitLab >= 14.8 セルフホスティングでのみ利用可能です。

**Test settings** ボタンを使用してインテグレーションをテストできます (プロジェクトでインテグレーションを構成する場合にのみ使用できます)。成功したら、**Save changes** をクリックしてインテグレーションのセットアップを完了します。


#### Integrate with Datadog Teams
To display and filter the teams associated with your pipelines, add `team:<your-team>` as a custom tag. The custom tag name must match your [Datadog Teams][16] team handle exactly.

## Datadog でパイプラインデータを視覚化する

インテグレーションが正常に構成されたら、パイプラインが終了した後、[CI Pipeline List][7] ページと [Executions][8] ページの両方にデータが入力されます。

Pipelines ページには、各リポジトリのデフォルトブランチのデータのみが表示されます。

### 部分的およびダウンストリームパイプライン

**Executions** ページでは、検索バーで以下のフィルターを使用することができます。

`Downstream Pipeline`
: 可能な値: `true`、`false`

`Manually Triggered`
: 可能な値: `true`、`false`

`Partial Pipeline`
: 可能な値: `retry`

{{< img src="ci/partial_retries_search_tags.png" alt="検索クエリに Partial Pipeline:retry を入力したパイプラインの実行画面" style="width:100%;">}}

これらのフィルターは、ページの左側にあるファセットパネルからも適用することができます。
{{< img src="ci/partial_retries_facet_panel_without_paused.png" alt="Partial Pipeline ファセットが展開され、値 Retry が選択されたファセットパネル、Partial Retry ファセットが展開され、値 true が選択されたファセットパネル" style="width:40%;">}}


### インフラストラクチャーメトリクスとジョブの相関付け

If you are using self-hosted GitLab runners, you can correlate jobs with the infrastructure that is running them. Datadog infrastructure correlation is possible using different methods:

#### Tagging runners with hostname

The GitLab runner must have a tag of the form `host:<hostname>`. Tags can be added while [registering a new runner][6]. As a result, this method is only available when the runner is directly running the job. This excludes executors that are autoscaling the infrastructure in order to run the job
(such as the Kubernetes, Docker Autoscaler, or Instance executors) as it is not possible to add tags dynamically for those runners.

For existing runners:

{{< tabs >}}
{{% tab "GitLab &gt;&equals; 15.8" %}}
Add tags through the UI by going to **Settings > CI/CD > Runners** and editing the appropriate runner.
{{% /tab %}}

{{% tab "GitLab &lt; 15.8" %}}
Add tags by updating the runner's `config.toml`. Or add tags
through the UI by going to **Settings > CI/CD > Runners** and editing the appropriate runner.
{{% /tab %}}
{{< /tabs >}}

After these steps, CI Visibility adds the hostname to each job. To see the metrics, click on a job span in the trace
view. In the drawer, a new tab named **Infrastructure** appears which contains the host metrics.

#### Instance and Docker Autoscaler executors
CI Visibility also supports Infrastructure metrics for "Instance" and "Docker Autoscaler" executors. For more information, see the [Correlate Infrastructure Metrics with GitLab Jobs guide][18].

#### Other executors

CI Visibility does not support Infrastructure metrics for other executors such as the Kubernetes executor.

### View error messages for pipeline failures

Error messages are supported for GitLab versions 15.2.0 and above.

For failed GitLab pipeline executions, each error under the `Errors` tab within a specific pipeline execution displays a message associated with the error type from GitLab.

{{< img src="ci/ci_gitlab_failure_reason_new.png" alt="GitLab Failure Reason" style="width:100%;">}}

See the table below for the message and domain correlated with each error type. Any unlisted error type will lead to the error message of `Job failed` and error domain of `unknown`.

| Error Type | Error Message | Error Domain |
| :---  |    :----:   |  ---: |
|  unknown_failure  |  Failed due to unknown reason  |  不明
|  config_error  |  Failed due to error on CI/CD configuration file |  ユーザー
|  external_validation_failure  |  Failed due to external pipeline validation  |  unknown
|  user_not_verified  |  The pipeline failed due to the user not being verified  |  user
|  activity_limit_exceeded  |  The pipeline activity limit was exceeded  |  プロバイダー
|  size_limit_exceeded  |  The pipeline size limit was exceeded  |  プロバイダー
|  job_activity_limit_exceeded  |  The pipeline job activity limit was exceeded  |  プロバイダー
|  deployments_limit_exceeded  |  The pipeline deployments limit was exceeded  |  プロバイダー
|  project_deleted  |  The project associated with this pipeline was deleted  |  provider
|  api_failure  |  API Failure  |  プロバイダー
|  stuck_or_timeout_failure  |  Pipeline is stuck or timed out  |  不明
|  runner_system_failure  |  Failed due to runner system failure  |  プロバイダー
|  missing_dependency_failure  |  Failed due to missing dependency  |  unknown
|  runner_unsupported  |  Failed due to unsupported runner  |  provider
|  stale_schedule  |  Failed due to stale schedule  |  プロバイダー
|  job_execution_timeout  |  Failed due to job timeout  |  不明
|  archived_failure  |  Archived failure  |  プロバイダー
|  unmet_prerequisites  |  Failed due to unmet prerequisite  |  unknown
|  scheduler_failure  |  Failed due to schedule failure  |  provider
|  data_integrity_failure  |  Failed due to data integrity  |  provider
|  forward_deployment_failure  |  Deployment failure  |  unknown
|  user_blocked  |  Blocked by user  |  ユーザー
|  ci_quota_exceeded  |  CI quota exceeded  |  provider
|  pipeline_loop_detected  |  Pipeline loop detected  |  ユーザー
|  builds_disabled  |  Build disabled  |  user
|  deployment_rejected  |  Deployment rejected  |  ユーザー
|  protected_environment_failure  |  Environment failure  |  provider
|  secrets_provider_not_found  |  Secret provider not found  |  user
|  reached_max_descendant_pipelines_depth  |  Reached max descendant pipelines  |  user
|  ip_restriction_failure  |  IP restriction failure  |  provider

<!-- | ---------- | ---------- | ---------- | -->
<!-- | :---        |    :----:   |          ---: | -->

## Enable job log collection

The following GitLab versions support collecting job logs:

* GitLab.com (SaaS)
* GitLab >= 15.3 (self-hosted) only if you are using [object storage to store job logs][7]
* GitLab >= 14.8 (self-hosted) by enabling the `datadog_integration_logs_collection` feature flag

<div class="alert alert-info"><strong>Note</strong>: Logs are billed separately from CI Visibility.</div>

<div class="alert alert-info"><strong>Note</strong>: Job log collection is not available for <a href="https://docs.datadoghq.com/data_security/pci_compliance/?tab=logmanagement">PCI-compliant organizations</a>.</div>

Job logs are collected in [Log Management][9] and are automatically correlated with the GitLab pipeline in CI Visibility. Log files larger than one GiB are truncated.

For more information about processing job logs collected from the GitLab integration, see the [Processors documentation][17].

To enable collection of job logs:

{{< tabs >}}
{{% tab "GitLab.com" %}}
1. Click the **Enable job logs collection** checkbox in the GitLab integration **Settings > Integrations > Datadog**.
2. Click **Save changes**.
{{% /tab %}}

{{% tab "GitLab &gt;&equals; 15.3" %}}
<div class="alert alert-warning">Datadog downloads log files directly from your GitLab logs <a href="https://docs.gitlab.com/ee/administration/job_artifacts.html#using-object-storage">object storage</a> with temporary pre-signed URLs.
This means that for Datadog servers to access the storage, the storage must not have network restrictions
The <a href="https://docs.gitlab.com/ee/administration/object_storage.html#amazon-s3">endpoint</a>, if set, should resolve to a publicly accessible URL.</div>

1. Click **Enable job logs collection** checkbox in the GitLab integration under **Settings > Integrations > Datadog**.
2. Click **Save changes**.

{{% /tab %}}

{{% tab "GitLab &gt;&equals; 14.8" %}}
<div class="alert alert-warning">Datadog downloads log files directly from your GitLab logs <a href="https://docs.gitlab.com/ee/administration/job_artifacts.html#using-object-storage">object storage</a> with temporary pre-signed URLs.
This means that for Datadog servers to access the storage, the storage must not have network restrictions
The <a href="https://docs.gitlab.com/ee/administration/object_storage.html#amazon-s3">endpoint</a>, if set, should resolve to a publicly accessible URL.</div>

1. Enable the `datadog_integration_logs_collection` [feature flag][1] in your GitLab. This allows you to see the **Enable job logs collection** checkbox in the GitLab integration under **Settings > Integrations > Datadog**.
2. Click **Enable job logs collection**.
3. Click **Save changes**.

[1]: https://docs.gitlab.com/ee/administration/feature_flags.html
{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-info"><strong>Note</strong>: Logs are billed separately from CI Visibility. Log retention, exclusion, and indexes are configured in Logs Settings. Logs for GitLab jobs can be identified by the <code>datadog.product:cipipeline</code> and <code>source:gitlab</code> tags.</div>

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/getting_started/site/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://docs.gitlab.com/ee/user/project/integrations/webhooks.html
[4]: https://app.datadoghq.com/ci/pipelines
[5]: https://app.datadoghq.com/ci/pipeline-executions
[6]: https://docs.gitlab.com/runner/register/
[7]: https://docs.gitlab.com/ee/administration/job_artifacts.html#using-object-storage
[8]: https://docs.gitlab.com/ee/administration/feature_flags.html
[9]: /ja/logs/
[10]: /ja/continuous_integration/pipelines/gitlab/?tab=gitlabcom#set-custom-tags
[11]: /ja/continuous_integration/pipelines/gitlab/?tab=gitlabcom#partial-and-downstream-pipelines
[12]: /ja/continuous_integration/pipelines/gitlab/#enable-job-log-collection
[13]: /ja/continuous_integration/pipelines/custom_tags_and_measures/?tab=linux
[14]: /ja/continuous_integration/pipelines/gitlab/?tab=gitlabcom#correlate-infrastructure-metrics-to-jobs
[15]: /ja/continuous_integration/pipelines/gitlab/?tab=gitlabcom#view-error-messages-for-pipeline-failures
[16]: /ja/account_management/teams/
[17]: /ja/logs/log_configuration/processors/
[18]: /ja/continuous_integration/guides/infrastructure_metrics_with_gitlab
[19]: https://about.gitlab.com/
[20]: /ja/glossary/#partial-retry
[21]: /ja/glossary/#manual-step
[22]: /ja/glossary/#queue-time
[23]: /ja/glossary/#approval-wait-time
[24]: /ja/glossary/#pipeline-execution-time
[25]: /ja/glossary/#running-pipeline