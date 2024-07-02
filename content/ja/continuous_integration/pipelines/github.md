---
title: Set up Tracing on GitHub Actions Workflows
aliases:
  - /continuous_integration/setup_pipelines/github
further_reading:
    - link: /continuous_integration/pipelines
      tag: Documentation
      text: Explore Pipeline Execution Results and Performance
    - link: /continuous_integration/troubleshooting/
      tag: Documentation
      text: Troubleshooting CI Visibility
    - link: /continuous_integration/pipelines/custom_tags_and_measures/
      tag: Documentation
      text: カスタムタグと測定値を追加してパイプラインの可視性を拡張する
    - link: "https://www.datadoghq.com/blog/datadog-github-actions-ci-visibility/"
      tag: blog
      text: Monitor your GitHub Actions workflows with Datadog CI Visibility
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">The selected Datadog site ({{< region-param key="dd_site_name" >}}) is not supported.</div>
{{< /site-region >}}

## Overview

[GitHub Actions][1] is an automation tool that allows you to build, test, and deploy your code in GitHub. Create workflows that automate every step of your development process, streamlining software updates and enhancing code quality with CI/CD features integrated into your repositories.

Set up tracing in GitHub Actions to track the execution of your workflows, identify performance bottlenecks, troubleshoot operational issues, and optimize your deployment processes.

### Compatibility

| Pipeline Visibility | Platform | Definition |
|---|---|---|
| [Running pipelines][12] | Running pipelines | View pipeline executions that are running. |
| [Partial retries][13] | Partial pipelines | View partially retried pipeline executions. |
| Logs correlation | Logs correlation | Correlate pipeline and job spans to logs and enable [job log collection][10]. |
| Infrastructure metric correlation | Infrastructure metric correlation | Correlate jobs to [infrastructure host metrics][11] for GitHub jobs. |
| [Custom tags][12] [and measures at runtime][13] | Custom tags and measures at runtime | Configure [custom tags and measures][14] at runtime. |
| [Queue time][15] | Queue time | View the amount of time pipeline jobs sit in the queue before processing. |
| [Approval wait time][16] | Approval wait time | View the amount of time workflow runs and workflow jobs wait for manual approvals. |

The following GitHub versions are supported:

- GitHub.com (SaaS)
- GitHub Enterprise Server (GHES) 3.5.0 or later

## Configure the Datadog integration

### Configure a GitHub App

The [GitHub Actions][1] integration uses a private [GitHub App][2] to collect workflow information. If you already have an app, you can
skip to the next section.

1. Go to the [GitHub integration tile][3].
2. Click **Link GitHub Account**.
3. Follow the instructions to configure the integration for a personal or organization account.
4. In **Edit Permissions**, grant `Actions: Read` access.
5. Click **Create App in GitHub** to finish the app creation process GitHub.
6. Give the app a name, for example, `Datadog CI Visibility`.
7. Click **Install GitHub App** and follow the instructions on GitHub.

### Configure tracing for GitHub Actions

After the GitHub App is created and installed, enable CI Visibility on the accounts and/or repositories you want visibility into.

1. Go to the **[Getting Started][4]** page and click on **GitHub**.
2. Click on **Enable Account** for the account you want to enable.
3. Enable CI Visibility for the whole account by clicking **Enable CI Visibility**.
4. Alternatively, you can enable individual repositories by scrolling through the repository list and clicking the **Enable CI Visibility** toggle.

Pipelines appear immediately after enabling CI Visibility for any account or repository.

### Enable log collection

The GitHub Actions CI Visibility integration also allows automatically forwarding workflow job logs to [Datadog Log Management][5].

To enable logs, follow these steps:

1. Go to the **[CI Visibility settings][6]** page.
2. Click on any account that is enabled or has enabled repositories.
3. Click **Enable Job Logs Collection** to enable logs for the whole account.
4. Alternatively, you can enable individual repositories by scrolling through the repository list and clicking the **Enable Job Logs Collection** toggle.

Immediately after toggling logs collection, workflow job logs are forwarded to Datadog Logs. Log files larger than 1GiB are truncated.

<div class="alert alert-info"><strong>Note</strong>: Logs are billed separately from CI Visibility. Log retention, exclusion, and indexes are configured in Logs Settings. Logs for GitHub jobs can be identified by the <code>datadog.product:cipipeline</code> and <code>source:github</code> tags.</div>

### インフラストラクチャーメトリクスとジョブの相関付け

セルフホスト型の GitHub ランナーを使用している場合は、ジョブとそれを実行しているホストを関連付けることができます。これを行うには、GitHub ランナー名が実行されているマシンのホスト名と一致することを確認します。CI Visibility はこれを利用して、インフラストラクチャーのメトリクスにリンクします。メトリクスを見るには、トレースビューでジョブスパンをクリックすると、ウィンドウ内にホストメトリクスを含む **Infrastructure** という新しいタブが表示されます。

## Datadog でパイプラインデータを視覚化する

The [**CI Pipeline List**][7] and [**Executions**][8] pages populate with data after the pipelines finish.

The **CI Pipeline List** page shows data for only the default branch of each repository.

## GitHub Actions のトレースを無効にする

CI Visibility GitHub Actions のインテグレーションを無効にするには、GitHub アプリがワークフロージョブおよびワークフロー実行イベントのサブスクリプションを終了していることを確認します。イベントを削除するには

1. [GitHub Apps][9] のページに移動します。
2. 該当する Datadog GitHub アプリの **Edit > Permission & events** をクリックします (複数のアプリがある場合は、それぞれのアプリでこのプロセスを繰り返す必要があります)。
3. **Subscribe to events** セクションまでスクロールし、**Workflow job** および **Workflow run** が選択されていないことを確認します。


## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.github.com/actions
[2]: https://docs.github.com/developers/apps/getting-started-with-apps/about-apps
[3]: https://app.datadoghq.com/integrations/github/
[4]: https://app.datadoghq.com/ci/setup/pipeline?provider=github
[5]: /logs/
[6]: https://app.datadoghq.com/ci/settings
[7]: https://app.datadoghq.com/ci/pipelines
[8]: https://app.datadoghq.com/ci/pipeline-executions
[9]: https://github.com/settings/apps
[10]: /continuous_integration/pipelines/github/#enable-log-collection
[11]: /continuous_integration/pipelines/github/#correlate-infrastructure-metrics-to-jobs
[12]: /glossary/#running-pipeline
[13]: /glossary/#partial-retry
[14]: /continuous_integration/pipelines/custom_tags_and_measures/?tab=linux
[15]: /glossary/#queue-time
[16]: /glossary/#approval-wait-time