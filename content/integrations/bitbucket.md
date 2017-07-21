---
title: Datadog-Bitbucket Integration
integration_title: Bitbucket
kind: integration
newhlevel: true
---
## Overview

Capture commits and pull requests events directly from your bitbucket to:

  * Keep track of code changes in real time
  * Add code change markers on all of your dashboards
  * Discuss code changes with your team

We've written extensively about the Bitbucket integration on our [blog][1].

{{< img src="integrations-bitbucket.gif" >}}
Once the integration is complete, whatever you select (commits and/or pull requests) will populate
into your Datadog Event Stream.

* When commits are made
* When a PR is created
* When a comment is made/deleted on a PR

If you view a dashboard, in the top left search bar you can type ```sources:bitbucket``` to see bitbucket events overlayed over your the graphs on that dashboard.

## Installation

See [Bitbucket's documentation][3] and set up webhooks for any Bitbucket behaviors you want to track in Datadog.
Set the webhook URL to: ```https://app.datadoghq.com/intake/webhook/bitbucket?api_key=<YOUR_DATADOG_API_KEY>```

## Configuration

1. Add the [Bitbucket integration][2] in your Datadog application.

2. Enter the full name of each repository you want to monitor. If the URL for your repository is ```https://bitbucket.org/groupname/reponame```, then enter ```groupname/reponame``` in the **Repo full name textbox**.

3. Check which type of events you would like to collect:
    * Commits 
    * Pull Requests
    * Issues  

4. Click **Update Configuration**.

## Validation

Each entry in the integration tile is validated when you enter it. There is nothing else you need to do.



[1]: https://www.datadoghq.com/blog/understand-code-changes-impact-system-performance-bitbucket-datadog/
[2]: https://app.datadoghq.com/account/settings#integrations/bitbucket
[3]: https://confluence.atlassian.com/bitbucket/manage-webhooks-735643732.html
