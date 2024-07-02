---
"categories":
- "collaboration"
- "developer tools"
- "issue tracking"
- "source control"
"custom_kind": "インテグレーション"
"dependencies": []
"description": "自己ホスト型 Git サーバーから Datadog へコミットとプルリクエストを送信。"
"doc_link": "https://docs.datadoghq.com/integrations/git/"
"draft": false
"git_integration_title": "git"
"has_logo": true
"integration_id": "git"
"integration_title": "Git"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "git"
"public_title": "Datadog-Git Integration"
"short_description": "Send commits and pull requests from your self-hosted Git server to Datadog."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
{{< img src="integrations/git/git_event.png" alt="Git event" popup="true">}}

## Overview

Capture Git commits directly from your Git server to:

- Keep track of code changes in real time.
- Add code change markers on all your dashboards.
- Discuss code changes with your team.

## Setup

### Installation

1. Create a new application key for Git: [Generate Application Key][1]

2. Download the Datadog Git webhook:

    ```shell
    sudo easy_install dogapi
    curl -L https://raw.github.com/DataDog/dogapi/master/examples/git-post-receive-hook > post-receive
    ```

3. Set up Git with your [Datadog keys][1]:

    ```shell
    git config datadog.api <YOUR_DATADOG_API_KEY>
    git config datadog.application <YOUR_DATADOG_APP_KEY>
    ```

4. Activate the hook in your Git repository with the `<GIT_REPOSITORY_NAME>`:

    ```shell
    install post-receive <GIT_REPOSITORY_NAME>/.git/hooks/post-receive
    ```

5. [Install the Datadog-Git Integration][2]

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://app.datadoghq.com/integrations/git

