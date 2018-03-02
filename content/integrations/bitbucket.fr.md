---
categories:
- Source Control
- Collaboration
- issue tracking
ddtype: crawler
description: See which commits and pull requests affect performance across your services.
doc_link: https://docs.datadoghq.com/integrations/bitbucket/
git_integration_title: bitbucket
has_logo: true
integration_title: Bitbucket
is_public: true
kind: integration
manifest_version: '1.0'
name: bitbucket
public_title: Datadog-Bitbucket Integration
short_description: See which commits and pull requests affect performance across your
  services.
version: '1.0'
---

{{< img src="integrations/bitbucket/integrations-bitbucket.gif" alt="integrations bitbucket" responsive="true" popup="true">}}

## Overview

Capture commits and pull requests events directly from your bitbucket to:

  * Keep track of code changes in real time
  * Add code change markers on all of your dashboards
  * Discuss code changes with your team

We've written extensively about the Bitbucket integration on our [blog](https://www.datadoghq.com/blog/understand-code-changes-impact-system-performance-bitbucket-datadog/).
Once the integration is complete, whatever you select (commits and/or pull requests) will populate
into your Datadog Event Stream.

* When commits are made
* When a PR is created
* When a comment is made/deleted on a PR

If you view a dashboard, in the top left search bar you can type ```sources:bitbucket``` to see bitbucket events overlayed over your the graphs on that dashboard.

## Setup
### Installation

See [Bitbucket's documentation](https://confluence.atlassian.com/bitbucket/manage-webhooks-735643732.html) and set up webhooks for any Bitbucket behaviors you want to track in Datadog.
Set the webhook URL to: ```https://app.datadoghq.com/intake/webhook/bitbucket?api_key=<YOUR_DATADOG_API_KEY>```

### Configuration

1. Add the [Bitbucket integration](https://app.datadoghq.com/account/settings#integrations/bitbucket) in your Datadog application.

2. Enter the full name of each repository you want to monitor. If the URL for your repository is ```https://bitbucket.org/groupname/reponame```, then enter ```groupname/reponame``` in the **Repo full name textbox**.

3. Check which type of events you would like to collect:
    * Commits 
    * Pull Requests
    * Issues  

4. Click **Update Configuration**.

### Validation

Each entry in the integration tile is validated when you enter it. There is nothing else you need to do.

## Data Collected
### Metrics

The Bitbucket integration does not include any metric at this time.

### Events

The Bitbucket integration does not include any event at this time.

### Service Checks
The Bitbucket integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)
