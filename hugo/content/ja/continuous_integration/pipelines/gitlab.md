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
| [Custom spans][26] | Custom spans | Configure custom spans for your pipelines. |

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

<div class="alert alert-danger"><strong>Note</strong>: Due to a <a href="https://gitlab.com/gitlab-org/gitlab/-/issues/335218">bug</a> in early versions of GitLab, the Datadog integration cannot be enabled at <strong>group or instance</strong> level on <strong>GitLab versions < 14.1</strong>, even if the option is available on GitLab's UI</div>

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
**Settings > CI/CD > Runners** に移動して、該当するランナーを編集することで UI からタグを追加します。
{{% /tab %}}

{{% tab "GitLab &lt; 15.8" %}}
ランナーの `config.toml` を更新することでタグを追加します。または、**Settings > CI/CD > Runners** に移動して、該当するランナーを編集することで UI からタグを追加します。
{{% /tab %}}
{{< /tabs >}}

これらのステップの後、CI Visibility は各ジョブにホスト名を追加します。メトリクスを見るには、トレースビューでジョブスパンをクリックします。ドロワーに、ホストメトリクスを含む **Infrastructure** という新しいタブが表示されます。

#### Instance and Docker Autoscaler executors
CI Visibility は、"Instance" および "Docker Autoscaler" エグゼキューターについてもインフラストラクチャーメトリクスをサポートしています。詳細については、[GitLab ジョブとインフラストラクチャーメトリクスの相関付けに関するガイド][18]を参照してください。

#### Other executors

CI Visibility does not support Infrastructure metrics for other executors such as the Kubernetes executor.

### パイプライン失敗時のエラーメッセージの表示

エラーメッセージは GitLab のバージョン 15.2.0 以降でサポートされています。

GitLab パイプラインの実行に失敗した場合、特定のパイプライン実行内の `Errors` タブの下の各エラーは、GitLab からのエラータイプに関連するメッセージを表示します。

{{< img src="ci/ci_gitlab_failure_reason_new.png" alt="GitLab の失敗の理由" style="width:100%;">}}

各エラータイプに関連するメッセージとドメインについては、以下の表を参照してください。リストにないエラータイプは、`Job failed` というエラーメッセージと `unknown` というエラードメインになります。

| エラーの種類 | エラーメッセージ | エラードメイン |
| :---  |    :----:   |  ---: |
|  unknown_failure  |  原因不明で失敗  |  不明
|  config_error  |  CI/CD コンフィギュレーションファイルのエラーによる失敗 |  ユーザー
|  external_validation_failure  |  外部パイプラインの検証に失敗  |  不明
|  user_not_verified  |  ユーザーが認証されていないため、パイプラインが失敗した  |  ユーザー
|  activity_limit_exceeded  |  パイプラインのアクティビティ制限を超過した  |  プロバイダー
|  size_limit_exceeded  |  パイプラインのサイズ制限を超過した  |  プロバイダー
|  job_activity_limit_exceeded  |  パイプラインのジョブアクティビティ制限を超過した  |  プロバイダー
|  deployments_limit_exceeded  |  パイプラインのデプロイ制限を超過した  |  プロバイダー
|  project_deleted  |  このパイプラインに関連するプロジェクトが削除された  |  プロバイダー
|  api_failure  |  API の失敗  |  プロバイダー
|  stuck_or_timeout_failure  |  パイプラインが停止している、またはタイムアウトしている  |  不明
|  runner_system_failure  |  ランナーシステムの不具合による失敗  |  プロバイダー
|  missing_dependency_failure  |  依存関係がないため失敗  |  不明
|  runner_unsupported  |  未対応のランナーのため失敗  |  プロバイダー
|  stale_schedule  |  スケジュールが古くなったため失敗  |  プロバイダー
|  job_execution_timeout  |  ジョブのタイムアウトによる失敗  |  不明
|  archived_failure  |  アーカイブの失敗  |  プロバイダー
|  unmet_prerequisites  |  前提条件が満たされていないため失敗  |  不明
|  scheduler_failure  |  スケジュール不具合による失敗  |  プロバイダー
|  data_integrity_failure  |  データ整合性のため失敗  |  プロバイダー
|  forward_deployment_failure  |  デプロイメントの失敗  |  不明
|  user_blocked  |  ユーザーによってブロックされた  |  ユーザー
|  ci_quota_exceeded  |  CI の割り当て超過  |  プロバイダー
|  pipeline_loop_detected  |  パイプラインループを検出  |  ユーザー
|  builds_disabled  |  ビルド無効  |  ユーザー
|  deployment_rejected  |  デプロイメントが拒否された  |  ユーザー
|  protected_environment_failure  |  環境に関する失敗  |  プロバイダー
|  secrets_provider_not_found  |  シークレットプロバイダーが見つからない  |  ユーザー
|  reached_max_descendant_pipelines_depth  |  子孫パイプラインの最大値に到達  |  ユーザー
|  ip_restriction_failure  |  IP 制限の失敗  |  プロバイダー

<!-- | ---------- | ---------- | ---------- | -->
<!-- | :---        |    :----:   |          ---: | -->

## ジョブログ収集を有効にする

以下の GitLab バージョンは、ジョブログの収集をサポートしています。

* GitLab.com (SaaS)
* GitLab >= 15.3 (self-hosted) only if you are using [object storage to store job logs][7]
* GitLab >= 14.8 (self-hosted) by enabling the `datadog_integration_logs_collection` feature flag

<div class="alert alert-info"><strong>Note</strong>: Logs are billed separately from CI Visibility.</div>

<div class="alert alert-info"><strong>Note</strong>: Job log collection is not available for <a href="https://docs.datadoghq.com/data_security/pci_compliance/?tab=logmanagement">PCI-compliant organizations</a>.</div>

Job logs are collected in [Log Management][9] and are automatically correlated with the GitLab pipeline in CI Visibility. Log files larger than one GiB are truncated.

For more information about processing job logs collected from the GitLab integration, see the [Processors documentation][17].

ジョブログの収集を有効にするには

{{< tabs >}}
{{% tab "GitLab.com" %}}
1. Click the **Enable job logs collection** checkbox in the GitLab integration **Settings > Integrations > Datadog**.
2. **Save changes** をクリックします。
{{% /tab %}}

{{% tab "GitLab &gt;&equals; 15.3" %}}
<div class="alert alert-danger">Datadog は、事前に署名された期間限定の URL を使って、GitLab ログの<a href="https://docs.gitlab.com/ee/administration/job_artifacts.html#using-object-storage">オブジェクトストレージ</a>からログファイルを直接ダウンロードします。
これは、Datadog サーバーがストレージにアクセスするためには、ストレージにネットワークの制限がかかっていてはいけないことを意味します。
<a href="https://docs.gitlab.com/ee/administration/object_storage.html#amazon-s3">エンドポイント</a>が設定されている場合は、一般にアクセス可能な URL に解決される必要があります。</div>

1. Click **Enable job logs collection** checkbox in the GitLab integration under **Settings > Integrations > Datadog**.
2. **Save changes** をクリックします。

{{% /tab %}}

{{% tab "GitLab &gt;&equals; 14.8" %}}
<div class="alert alert-danger">Datadog は、事前に署名された期間限定の URL を使って、GitLab ログの<a href="https://docs.gitlab.com/ee/administration/job_artifacts.html#using-object-storage">オブジェクトストレージ</a>からログファイルを直接ダウンロードします。
これは、Datadog サーバーがストレージにアクセスするためには、ストレージにネットワークの制限がかかっていてはいけないことを意味します。
<a href="https://docs.gitlab.com/ee/administration/object_storage.html#amazon-s3">エンドポイント</a>が設定されている場合は、一般にアクセス可能な URL に解決される必要があります。</div>

1. Enable the `datadog_integration_logs_collection` [feature flag][1] in your GitLab. This allows you to see the **Enable job logs collection** checkbox in the GitLab integration under **Settings > Integrations > Datadog**.
2. Click **Enable job logs collection**.
3. **Save changes** をクリックします。

[1]: https://docs.gitlab.com/ee/administration/feature_flags.html
{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-info"><strong>注</strong>: ログは CI Visibility とは別に課金されます。ログの保持、除外、インデックスの構成は、ログの設定で行います。GitLab ジョブのログは <code>Datadog.product:cipipeline</code> と <code>source:gitlab</code> のタグで識別できます。</div>

## 参考資料

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
[26]: /ja/glossary/#custom-span