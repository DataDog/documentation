---
"aliases":
- "/integrations/github_apps"
"categories":
- "collaboration"
- "developer tools"
- "issue tracking"
- "source control"
"custom_kind": "インテグレーション"
"dependencies": []
"description": "GitHub と Datadog を接続し、サービスのパフォーマンスに影響を与えるコミットやプルリクエストを監視する"
"doc_link": "https://docs.datadoghq.com/integrations/github/"
"draft": false
"further_reading":
- "link": "https://www.datadoghq.com/blog/collect-github-audit-logs-alerts-datadog/"
  "tag": "ブログ"
  "text": "Datadog で GitHub の監査ログを収集し、アラートをスキャンする"
- "link": "https://www.datadoghq.com/blog/github-source-code-integration/"
  "tag": "ブログ"
  "text": "Datadog の GitHub とソースコードのインテグレーションを使用して、トラブルシューティングを効率化する"
- "link": "https://www.datadoghq.com/blog/github-actions-service-catalog/"
  "tag": "ブログ"
  "text": "私は GitHub Actions を Datadog のサービスカタログに使っています。あなたもそうするべきですよ"
- "link": "https://docs.datadoghq.com/integrations/guide/source-code-integration/"
  "tag": "Documentation"
  "text": "Datadog のソースコードインテグレーションについて"
- "link": "https://docs.datadoghq.com/tracing/service_catalog/setup/#store-and-edit-service-definitions-in-github"
  "tag": "Documentation"
  "text": "サービスカタログで GitHub インテグレーションを利用する方法について"
- "link": "https://docs.datadoghq.com/serverless/configuration/?tab=serverlessframework#link-errors-to-your-source-code"
  "tag": "Documentation"
  "text": "サーバーレスモニタリングにおける GitHub インテグレーションの使用方法について"
"git_integration_title": "github"
"has_logo": true
"integration_id": "github"
"integration_title": "GitHub"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "github"
"public_title": "GitHub Integration"
"short_description": "Connect GitHub with Datadog."
"team": "web-integrations"
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Set up the GitHub integration to configure GitHub Apps and GitHub Actions, secure access for your repositories, and collect advanced telemetry (such as audit logs, vulnerability reports, secret scanning, and repository statistics).

{{< img src="integrations/github/repo_configuration.png" alt="The Repository Configuration tab on the GitHub integration tile" popup="true" style="width:100%;">}}

You can use the Datadog [source code integration][1] to see code snippets in your stack traces, link stack traces to source code in GitHub for your [Lambda functions][2], show test result summaries from pull request comments in [CI Visibility][3], and access multiple service definitions in GitHub from the [Service Catalog][4].

## セットアップ

<div class="alert alert-info">
Follow these instructions to install GitHub Apps and grant permissions to Datadog. Depending on the permissions granted, you can set up the source code integration, see code snippets in stack traces, view collected telemetry such as audit logs, access GitHub Actions in CI Visibility, and more.
</div>

### Link a repository in your organization or personal account

If you are an admin in your GitHub organization, you can configure GitHub Apps.

1. In the [GitHub integration tile][5], navigate to the **Repo Configuration** tab.
2. Click **Link GitHub Account** to create a new GitHub App.
3. In **Configure**, either select **Organization** and enter a name for your organization, or select **Personal Account**.

   Optionally, specify the URL of your GitHub Enterprise Server instance (version 2.22 or above) and ensure Datadog servers can connect to your Enterprise instance. Server IPs are available in the Webhooks section of [IP Ranges][6].

4. In **Edit Permissions**, enable Datadog read permissions for issues, pull requests, and contents. You must select at least one permission.
5. Click **Create App in GitHub**, then you are prompted to enter a GitHub App name in GitHub.
6. Enter a name in the GitHub App name field and click **Create GitHub App**.
7. In the **Configuration** tab, click **Install GitHub App** and **Install & Authorize**.

Your GitHub App displays in the integration tile. To enable inline code snippets in stack traces, see [Setting Up Source Code Integration][1].

### ノートブック

If you have granted your GitHub App read permissions for issues and pull requests, GitHub issues and pull requests automatically generate a preview hoverbox with details including the commit history, author, and date in [Notebooks][7].

{{< img src="integrations/guide/github_apps/notebooks-links-to-git.png" alt="Links to Git" style="width:90%;">}}

1. Navigate to **Notebooks** > **New Notebook**.
2. Add a **Text** cell and mention an issue or pull request on GitHub in the **Edit** field, for example: `https://github.com/project/repository/pull/#`.
3. Click **Done**, then the GitHub icon appears next to your linked issue or pull request.
4. Click **Connect to Preview** and **Authorize**.
5. Hover over the linked issue or pull request to see the description preview.

### Audit Logs

Audit logs encompass all activities and events across a GitHub organization. Upon an application's installation, allow for **Organization Administration** permissions to have read access. This enables the application to begin collecting GitHub's audit stream as logs on behalf of the GitHub organization.

**Note**: A GitHub Enterprise account is required to collect audit logs.

Follow the instructions on [Setting up streaming to Datadog][8] in the GitHub documentation to forward your audit logs to Datadog. For more information about Audit Logs, see the GitHub documentation for [Audit log actions][9].

## 収集データ

### メトリクス

The GitHub integration collects Code Scan Alert and Secret Scan Alert metrics. These metrics provide an overview of the organization's Alert state by categorizing their state, repo, and secret type. They also provide long-term insights on Alert trends and their general progress.

{{< get-metrics-from-git "github_telemetry" >}}

To start collecting these metrics, select the respective permissions for read access upon the application's installation. To opt-out of Code Scan or Secret Scan metrics, find the corresponding organization in the **Telemetery** tab on the integration tile, click the toggle for the respective sections, and click **Update Account**.

### イベント

<div class="alert alert-info">
Follow these instructions to configure webhooks in GitHub and Datadog, allowing events to appear in the Events Explorer.
</div>

#### Add a webhook in GitHub

1. In your GitHub project, navigate to **Settings** > **Webhooks**.
2. Click **Add webhook**.
3. Add the following URL in the **Payload URL** field: `https://{{< region-param key="dd_full_site" code="true" >}}/intake/webhook/github?api_key=<DATADOG_API_KEY>`. Don't forget to replace `<DATADOG_API_KEY>` with [your Datadog API Key][10].
4. Select `application/json` in the **Content type** dropdown menu.
5. Optionally, add a secret in the **Secret** field.
6. In the **Which events would you like to trigger this webhook?** section, click **Let me select individual events.** and select from the following supported options to send [events][11] to Datadog:

   | Event Name | Event Actions |
   |---|---|
   | [Branch or tag creation][12] |  |
   | [Commit comments][13] |  |
   | [Issue comments][14] | The following actions are supported: <br><br>- [`created`][15]<br>- [`deleted`][16]<br>- [`edited`][17] |
   | [Issues][18] | The following actions are supported: <br><br>- [`assigned`][19]<br>- [`closed`][20]<br>- [`deleted`][21]<br>- [`demilestoned`][22]<br>- [`edited`][23]<br>- [`labeled`][24]<br>- [`locked`][25]<br>- [`milestoned`][26]<br>- [`opened`][27]<br>- [`pinned`][28]<br>- [`reopened`][29]<br>- [`transferred`][30]<br>- [`unassigned`][31]<br>- [`unlabeled`][32]<br>- [`unlocked`][33]<br>- [`unpinned`][34] |
   | [Pull request review comments][35] | The following actions are supported: <br><br>- [`created`][36]<br>- [`deleted`][37]<br>- [`edited`][38] |
   | [Pull requests][39] | The following actions are supported: <br><br>- [`opened`][40]<br>- [`closed`][41]<br>- [`labeled`][42]<br>- [`edited`][43]<br>- [`assigned`][44]<br>- [`unassigned`][45]<br>- [`reopened`][46] |
   | [Pushes][47] |  |
   | [Repositories][48] | The following actions are supported: <br><br>- [`archived`][49]<br>- [`created`][50]<br>- [`deleted`][51]<br>- [`edited`][52]<br>- [`privatized`][53]<br>- [`publicized`][54]<br>- [`renamed`][55]<br>- [`transferred`][56]<br>- [`unarchived`][57] |
   | [Security and analysis][58] |  |
   | [Team adds][59] |  |

7. Select **Active** to receive event details when the hook is triggered.
8. Click **Add webhook** to save the webhook.

#### Add a webhook in Datadog

1. In the [GitHub integration tile][5], navigate to the **Webhooks** tab.
2. Specify the repositories and branches you want to monitor for each repository. To add all repositories for a user or organization, use wildcards (`*`). You can use wildcards on branch names. For example, `dev-*` includes all branches starting with `dev-`.

   To gather all events related to the `master` branch of the `DataDog/documentation` GitHub repository, you can enter `DataDog/documentation` in the **Repository** field and `master` in the **Branches** field.

   If you wanted to gather all events related to **all** `master` branches from the DataDog organization, enter `DataDog/*` in the **Repository** field and `master` in the **Branches** field.
   Note: When using a wildcard for the repository name, you must specify the user or organization. For example, '*' is not a valid repository name, but 'DataDog/*' is.

3. Click the checkboxes for **Commits** and **Issues** to be alerted of these events.
4. Click **Update Configuration** to save the webhook configuration.

Once you have added webhooks in the **Webhooks** tab on the integration tile, events in the GitHub repositories you specified above start to appear in the [Events Explorer][60]. For more information, see the [Events Explorer documentation][61].

To filter events coming from GitHub, select **Github** in the **Source** facet menu under **Core**, or enter `source:github` in the search query. The bar chart of events automatically updates as you edit the search query.

### サービスチェック

The GitHub integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][62].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/integrations/guide/source-code-integration/
[2]: https://docs.datadoghq.com/serverless/configuration/?tab=serverlessframework#link-errors-to-your-source-code
[3]: https://docs.datadoghq.com/continuous_integration/guides/pull_request_comments/
[4]: https://docs.datadoghq.com/tracing/service_catalog/setup/#store-and-edit-service-definitions-in-github
[5]: https://app.datadoghq.com/integrations/github/
[6]: https://docs.datadoghq.com/api/latest/ip-ranges/
[7]: https://app.datadoghq.com/notebook
[8]: https://docs.github.com/en/enterprise-cloud@latest/admin/monitoring-activity-in-your-enterprise/reviewing-audit-logs-for-your-enterprise/streaming-the-audit-log-for-your-enterprise#setting-up-streaming-to-datadog
[9]: https://docs.github.com/en/organizations/keeping-your-organization-secure/managing-security-settings-for-your-organization/reviewing-the-audit-log-for-your-organization#audit-log-actions
[10]: https://app.datadoghq.com/organization-settings/api-keys
[11]: https://docs.github.com/en/webhooks-and-events/webhooks/webhook-events-and-payloads
[12]: https://docs.github.com/en/webhooks-and-events/webhooks/webhook-events-and-payloads#create
[13]: https://docs.github.com/en/webhooks-and-events/webhooks/webhook-events-and-payloads#commit_comment
[14]: https://docs.github.com/en/webhooks-and-events/webhooks/webhook-events-and-payloads#issue_comment
[15]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=created#issue_comment
[16]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=deleted#issue_comment
[17]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=edited#issue_comment
[18]: https://docs.github.com/en/webhooks-and-events/webhooks/webhook-events-and-payloads#issues
[19]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=assigned#issues
[20]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=closed#issues
[21]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=deleted#issues
[22]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=demilestoned#issues
[23]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=edited#issues
[24]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=labeled#issues
[25]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=locked#issues
[26]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=milestoned#issues
[27]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=opened#issues
[28]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=pinned#issues
[29]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=reopened#issues
[30]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=transferred#issues
[31]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=unassigned#issues
[32]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=unlabeled#issues
[33]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=unlocked#issues
[34]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=unpinned#issues
[35]: https://docs.github.com/en/webhooks-and-events/webhooks/webhook-events-and-payloads#pull_request_review_comment
[36]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=created#pull_request_review_comment
[37]: hhttps://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=deleted#pull_request_review_comment
[38]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=edited#pull_request_review_comment
[39]: https://docs.github.com/en/webhooks-and-events/webhooks/webhook-events-and-payloads#pull_request
[40]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=opened#pull_request
[41]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=closed#pull_request
[42]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=labeled#pull_request
[43]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=edited#pull_request
[44]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=assigned#pull_request
[45]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=unassigned#pull_request
[46]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=reopened#pull_request
[47]: https://docs.github.com/en/webhooks-and-events/webhooks/webhook-events-and-payloads#push
[48]: https://docs.github.com/en/webhooks-and-events/webhooks/webhook-events-and-payloads#repository
[49]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=archived#repository
[50]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=created#repository
[51]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=deleted#repository
[52]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=edited#repository
[53]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=privatized#repository
[54]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=publicized#repository
[55]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=renamed#repository
[56]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=transferred#repository
[57]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=unarchived#repository
[58]: https://docs.github.com/en/webhooks-and-events/webhooks/webhook-events-and-payloads#security_and_analysis
[59]: https://docs.github.com/en/webhooks-and-events/webhooks/webhook-events-and-payloads#team_add
[60]: https://app.datadoghq.com/event/explorer/
[61]: https://docs.datadoghq.com/events/explorer/
[62]: https://docs.datadoghq.com/help/

