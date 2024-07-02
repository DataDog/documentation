---
title: Enhancing Developer Workflows with Datadog 
description: Learn how to use Datadog Test Visibility with additional Datadog features to accelerate your development process.
aliases:
- /continuous_integration/guides/developer_workflows
- /continuous_integration/guides/pull_request_comments
- /continuous_integration/integrate_tests/developer_workflows
- /continuous_integration/tests/developer_workflows
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-github-actions-ci-visibility/"
  tag: Blog
  text: Monitor your GitHub Actions workflows with Datadog CI Visibility
- link: /integrations/github/
  tag: Documentation
  text: GitHub インテグレーションについて
- link: /integrations/guide/source-code-integration
  tag: Documentation
  text: ソースコードインテグレーションについて
- link: /service_management/case_management
  tag: ドキュメント
  text: Learn about Case Management
---

## 概要

{{< site-region region="gov" >}}
<div class="alert alert-warning">Test Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

[Test Visibility][5] integrates with other developer-oriented Datadog products as well as external partners such as GitHub to streamline developer workflows with features including being able to:

- [Enable test summaries in GitHub pull request comments](#test-summaries-in-github-pull-requests)
- [Create and open GitHub issues](#create-and-open-github-issues) 
- [Create Jira issues through Case Management](#create-jira-issues)
- [Open tests in GitHub and your IDE](#open-tests-in-github-and-your-ide)

These features are available for all Test Visibility customers, and they do not require usage of the [Datadog GitHub integration][4].

## Test summaries in GitHub pull requests

Datadog integrates with GitHub to show summaries of test results directly in your pull request comments. Each summary contains an overview of the tests executions, flakiness information, error messages for failed tests, performance regressions, and code coverage changes.

{{< img src="ci/github_comments_light.png" alt="Datadog GitHub pull request comment preview" style="width:100%;">}}

With this information, developers get instant feedback about their tests results, and they can debug any failed or flaky tests without leaving the pull request view.

<div class="alert alert-info">This integration is only available for test services hosted on `github.com`.</div>

### テストサマリーの有効化

以下の手順で、プルリクエストでテストサマリーを有効にすることができます。

1. [GitHub インテグレーション][4]をインストールします。
   1. [GitHub インテグレーションタイル][6]の **Configuration** タブに移動し、**+ Create GitHub App** をクリックします。
   2. アプリケーションにプルリクエストの読み取り権限と書き込み権限を与えます。
2. Enable test summaries for one or more test services. You can do this from the [Test Service Settings page][3] or from the commit/branch page.

### テストサービス設定ページ

1. Navigate to the [Test Service Settings page][3] and search for the test service you want to enable. You can also search by repository.
2. For the desired service, enable the toggle under the **GitHub Comments** column.

{{< img src="ci/enable-settings-github-comments.png" alt="Datadog の Test Service Settings タブで GitHub のコメントを有効にしたテストサービス" style="width:100%;">}}

### コミットまたはブランチページ

1. GitHub コメントを有効にしたいテストサービスのコミットまたはブランチページに移動します。
2. **Settings** アイコンをクリックし、**View Test Service Settings** をクリックします。
3. 新しいプルリクエストにコメントが表示されるように、**Enable GitHub Comments** を選択します。この変更には数分かかる場合があります。

{{< img src="ci/enable-github-comments.png" alt="GitHub コメントのドロップダウンを有効にする" style="width:100%;">}}

Comments only appear on pull requests that were opened before the test run and that have run at least one test for an enabled test service.

## GitHub の課題を作成し、開く

With Test Visibility, you can create and open pre-filled GitHub issues with relevant context into your tests as well as deep links back to Datadog for more streamlined debugging workflows. Creating issues directly from Test Visibility can help you track and maintain accountability for test failures and flaky tests.

### アプリ内エントリーポイント

You can create pre-filled GitHub issues from three areas within Test Visibility:

- [Commit Overview page (from the **Commits** table)](#commit-overview) 
- [Branch Overview page](#branch-overview)
- [Test Details side panel](#test-details-view)

#### コミット概要

コミットの概要ページは、特定のブランチから、または特定のテスト内から発見することができます。

{{< img src="ci/github_issues_commit_overview_updated.png" alt="Datadog GitHub 課題プレビュー" style="width:100%;">}}

From the Commit Overview page, click on any row in the `Failed Tests` or `New Flaky Tests` tables and select **Open issue in GitHub**. 

#### ブランチ概要
From this page, click on any row in the **Flaky Tests** table and select **Open issue in GitHub**.

{{< img src="ci/github_issues_flaky_test_updated.png" alt="Datadog GitHub issues flaky tests table preview" style="width:100%;">}}

#### Test Details View
From within a specific test run, click the **Actions** button and select **Open issue in GitHub**. 

{{< img src="ci/github_issues_detail_light.png" alt="Datadog GitHub issues test detail view preview" style="width:100%;">}}

You also have the option to copy an issue description in Markdown for pasting test details elsewhere. The Markdown description contains information such as the test execution link, service, branch, commit, author, and error. 

{{< img src="ci/github_issues_markdown.png" alt="Copy issue description in Markdown format for GitHub issues" style="width:50%;">}}

### GitHub のサンプル課題
Below is what a pre-filled GitHub issue might look like:
{{< img src="ci/prefilled_github_issue.png" alt="Pre-filled GitHub issue" style="width:80%;">}}

## Create Jira issues

With [Case Management][8], you can create and open pre-filled Jira issues that contain relevant context related to your tests, as well as deep links back to Datadog for more streamlined debugging workflows. Creating issues directly from Test Visibility can help you track and maintain accountability for test failures and flaky tests. 

When you update the status of a Jira issue, the status in Case Management updates and reflects the latest case status.

### アプリ内エントリーポイント

After you have [set up the Jira integration][7], you can create cases from three areas within Test Visibility:

- [Commit Overview page (from the **Commits** table)](#commit-overview-1) 
- [Flaky Tests section](#branch-overview-1)
- [Test Runs side panel](#test-runs-view)

You can manually create a Jira issue from a case in [Case Management][9] by clicking `Shift + J`.

### コミット概要

コミットの概要ページは、特定のブランチから、または特定のテスト内から発見することができます。

{{< img src="continuous_integration/case_failed_test.png" alt="Create a Case Management issue in the Commit Overview page" style="width:100%;">}}

From the Commit Overview page, click on any row in the `Failed Tests` or `New Flaky Tests` tables and select **Create case**. 

#### ブランチ概要
From this page, click on any row in the **Flaky Tests** table and select **Create case**.

{{< img src="continuous_integration/case_flaky_test.png" alt="Create a Case Management issue in the Flaky Tests list" style="width:100%;">}}

#### Test Runs View
From within a specific test run, click the **Actions** button and select **Create case**. 

{{< img src="continuous_integration/case_test_runs.png" alt="Create a Case Management issue in the Test Runs side panel" style="width:100%;">}}

For more information about configuring the Jira integration, see the [Case Management documentation][7].

## GitHub と IDE でテストを開く

### アプリ内エントリーポイント

Datadog でテストが失敗した、あるいは不安定になったことを検出すると、そのテストを GitHub や IDE で開いてすぐに修正するオプションがあります。

Under the **Error Message** section in the **Overview** tab of a test run, click the **View Code** button to view the relevant lines of code for that test within Visual Studio Code, IntelliJ, or GitHub.

{{< img src="continuous_integration/error_message_code.png" alt="An inline code snippet with a button you can click to view the source code in GitHub or an IDE" style="width:100%;">}}

The order of options in this dropdown changes depending on the language your test was written in:

- Java ベースのテストでは IntelliJ が優先される
- JavaScript や Python ベースのテストでは Visual Studio Code が優先される

### Viewing source code in GitHub

Optionally, you can set up the [GitHub integration][10] to open the source code for a failed or flaky test in GitHub.

Under the **Source Code** section in the **Overview** tab of a test run, click the **View on GitHub** button to view the relevant lines of code for that test within GitHub.

{{< img src="continuous_integration/source_code_integration.png" alt="An inline code snippet with a button you can click to view the source code in GitHub or an IDE" style="width:100%;">}}

### IDE プラグインのインストール

IDE plugins and extensions are required to view your test in your IDE. 

- If you do not have the VS Code extension installed, click **View in VS Code** to open the extension directly in VS Code for installation.
- If you do not have the IntelliJ plugin installed, click **View in IntelliJ** to get the extension installation. Compatible Datadog versions can be found on the [Plugin Versions page][2].

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /continuous_integration/guides/pull_request_comments/
[2]: https://plugins.jetbrains.com/plugin/19495-datadog/versions
[3]: https://app.datadoghq.com/ci/settings/test-service
[4]: /integrations/github/
[5]: /continuous_integration/tests/
[6]: https://app.datadoghq.com/integrations/github
[7]: /service_management/case_management/settings/#jira
[8]: /service_management/case_management/view_and_manage#take-action
[9]: https://app.datadoghq.com/cases
[10]: /integrations/github/#link-a-repository-in-your-organization-or-personal-account