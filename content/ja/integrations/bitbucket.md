---
"categories":
- "Source Control"
- "Collaboration"
- "issue tracking"
"custom_kind": "integration"
"dependencies": []
"description": "See which commits and pull requests affect performance across your services."
"doc_link": "https://docs.datadoghq.com/integrations/bitbucket/"
"draft": false
"further_reading":
- "link": "https://www.datadoghq.com/blog/understand-code-changes-impact-system-performance-bitbucket-datadog/"
  "tag": "Blog"
  "text": "Bitbucket + Datadog: See how code changes impact your infrastructure"
"git_integration_title": "bitbucket"
"has_logo": true
"integration_id": "bitbucket"
"integration_title": "Bitbucket"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "bitbucket"
"public_title": "Datadog-Bitbucket Integration"
"short_description": "See which commits and pull requests affect performance across your services."
"team": "web-integrations"
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
{{< img src="integrations/bitbucket/integrations-bitbucket.mp4" alt="integrations bitbucket" video="true" >}}

## Overview

Capture commits and pull requests events directly from Bitbucket Cloud or Server to:

- Keep track of code changes in real time
- Add code change markers on all of your dashboards
- Discuss code changes with your team

Once the integration is set up, items you select (commits and/or pull requests) populate in your Datadog Event Stream.

**Examples**:

- When commits are made.
- When a PR is created.
- When a comment is made/deleted on a PR.

## Setup

### Installation

See Bitbucket's documentation to [Manage webhooks][1] for any Bitbucket behaviors you want to track in Datadog. Set the webhook URL to:

```text
https://app.datadoghq.com/intake/webhook/bitbucket?api_key=<YOUR_DATADOG_API_KEY>
```

See Bitbucket's documentation to [Manage IP addresses][2] ensure you have the correct IP ranges allow-listed for outgoing connections so events are received as expected. 

### Configuration

The [Bitbucket integration][3] is configured through the integration tile.

1. Enter the full name of each repository you want to monitor. If the URL for your repository is `https://bitbucket.org/groupname/reponame`, then enter `groupname/reponame` in the **Repository** textbox.
2. Select the type of events to send to Datadog:

    - Bitbucket Cloud: choose from the full list of triggers (Commits, Pull Requests, or Issues).
    - Bitbucket Server: select Commits or Pull Requests.

3. Click **Update Configuration**.

### Validation

Each entry in the integration tile is validated when you enter it.

## Use case

Overlay Bitbucket events on your dashboard graphs by typing `sources:bitbucket` in the top left search bar. See the example GIF at the top of this page.

## Data Collected

### Metrics

The Bitbucket integration does not include any metric.

### Events

Bitbucket events, including commits and pull requests from both Bitbucket Cloud and Server, are forwarded to Datadog.

### Service Checks

The Bitbucket integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][4].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://confluence.atlassian.com/bitbucket/manage-webhooks-735643732.html
[2]: https://support.atlassian.com/organization-administration/docs/ip-addresses-and-domains-for-atlassian-cloud-products/
[3]: https://app.datadoghq.com/integrations/bitbucket
[4]: https://docs.datadoghq.com/help/

