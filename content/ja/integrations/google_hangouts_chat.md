---
"categories":
- collaboration
- notifications
"custom_kind": "integration"
"dependencies": []
"description": "Send Datadog alerts and graphs to your team's Google Chat Space."
"doc_link": "https://docs.datadoghq.com/integrations/google_hangouts_chat/"
"draft": false
"further_reading":
- "link": "https://www.datadoghq.com/blog/google-hangouts-chat-integration/"
  "tag": Blog
  "text": Integrate Datadog with Google Chat
- "link": "https://developers.google.com/hangouts/chat/"
  "tag": External Documentation
  "text": Google Chat
"git_integration_title": "google_hangouts_chat"
"has_logo": true
"integration_id": "google-hangouts-chat"
"integration_title": "Google Chat"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "google_hangouts_chat"
"public_title": "Datadog-Google Chat Integration"
"short_description": "Send Datadog alerts and graphs to your team's Google Chat Space."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Connect Google Chat to Datadog and help your team collaborate by:

- Sharing graphs with your colleagues in your team's private or public spaces.
- Receiving alerts and notifications from Datadog within Google Chat.

## Setup

### Installation

The Google Chat integration is installed with its [integration tile][1] on the Datadog site and by adding the bot to your Google Chat space.

### Configuration

1. Add the Datadog application to your Google Chat space with `@Datadog`. **Note:** [Allowlist the Datadog Chatbot][2] in order to add it to your room.
2. Install the Datadog application in your Google Chat space by typing `@Datadog install`. **Note:** To install for sites other than the default domain (`app.datadoghq.com`), add the domain to this command, such as `@Datadog install mydomain.datadoghq.eu`
3. Follow the bot's prompt to sign in your Datadog account and configure it using the Datadog site.
4. Add the `names` and `urls` of the rooms you want the bot to be able to post to with the [`@-notification` feature][3].

{{% site-region region="us" %}}
### Datadog chatbot command summary
| Command                            | Description                                                                                                                                                                                                                                   |
|------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `@Datadog install (domain)`        | Starts the install workflow. **Note:** If you belong to more than one Datadog account, an **Account selection** page is displayed during the install workflow.                                                                                |
| `@Datadog list installed accounts` | Returns a list of all accounts that have Google Chat installed.                                                                                                                                                                               |
| `@Datadog remove account`          | Starts the workflow to remove Google Chat from a specific Datadog account. A card is returned with uninstall links for all installed accounts. Click the account to uninstall and the Datadog Chatbot responds with the removed account name. |
{{% /site-region %}}

## Uninstalling from Datadog accounts
{{% site-region region="us" %}}
There are three ways to uninstall Google Chat from a Datadog account:
1. Using the `@Datadog remove account` command allows space members to uninstall the chatbot from a selected Datadog Account.
2. Within a Datadog account, remove a space from the Google Chat integration tile.
3. Removing the chatbot from a space also uninstalls it from any installed accounts.
{{% /site-region %}}

{{% site-region region="ap1,us5,us3,eu,gov" %}}
Within a Datadog account, remove a space from the Google Chat integration tile.
{{% /site-region %}}

## Data Collected

### Metrics

The Google Chat integration does not include any metrics.

### Events

The Google Chat integration does not include any events.

### Service Checks

The Google Chat integration does not include any service checks.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations/google_hangouts_chat
[2]: https://support.google.com/a/answer/6089179
[3]: https://docs.datadoghq.com/monitors/notifications/#notification

