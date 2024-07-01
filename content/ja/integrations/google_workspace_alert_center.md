---
"categories":
- log collection
- security
"custom_kind": "integration"
"dependencies": []
"description": "Collects logs from Google Workspace Alert Center."
"doc_link": "https://docs.datadoghq.com/integrations/google_workspace_alert_center/"
"draft": false
"further_reading":
- "link": "https://www.datadoghq.com/blog/google-workspace-monitoring"
  "tag": Blog
  "text": Monitor Google Workspace with Datadog
"git_integration_title": "google_workspace_alert_center"
"has_logo": true
"integration_id": ""
"integration_title": "Google Workspace Alert Center"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "google_workspace_alert_center"
"public_title": "Google Workspace Alert Center"
"short_description": "Collects logs from Google Workspace Alert Center."
"team": "web-integrations"
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Alert Center provides a comprehensive view of essential security-related notifications, alerts,
and actions across all of Google Workspace. Integrate the Google Workspace Alert Center with
Datadog to:

- View and parse your alert logs using [Datadog's Logs product][1].
- Set [monitors][2] on [events][3] from your Google Workspace domain.
- Leverage the Datadog [Security Platform][4] to monitor and detect threats across your Google Workspace domain.

## Setup

### Installation

The Datadog Google Workspace Alert Center integration uses service accounts to create
an API connection between Google and Datadog. Below are instructions for creating a service
account and providing Datadog with service account credentials to begin making API calls on
your behalf.

1. Follow the [service account creation and authorization instructions][5]. You need
   super-admin access in order to complete these steps. Note the location where you save the private key JSON file as part of that process. Delegate domain-wide authority to the service account as described, granting the `https://www.googleapis.com/auth/apps.alerts` scope in the process. 
 1. From the `Service account details` page in your GCP console, click the `Create Google Workspace Marketplace-Compatible OAuth Client` button at the bottom of the `Advanced settings` section.
2. Navigate to the [Datadog Google Workspace Alert Center Integration tile][6].
3. On the **Configuration** tab, select _Upload Private Key File_ to integrate this project
   with Datadog. Select the private key JSON file you saved in the first step.
4. Enter the Subject Email, which is the email address for a user or robot account with
   Alert Center access. Do not use the email address associated with the service account itself. 
   The integration impersonates this user when making API calls.

If you want to monitor multiple projects, you can repeat the process above to use multiple
   service accounts.

### Configuration

Custom tags can also be specified per project. These tags are added to every log event
for that project in Datadog.

### Results

Wait at least five minutes to see [logs][1] coming in under the source `google.workspace.alert.center`. You may have to wait
longer if your environment generates Alert Center alerts infrequently.

## Data Collected

### Metrics

This Google Workspace Alert Center does not include metrics data.

### Events

For the full list of log events, see the [Google Workspace Alert Center documentation][7].

### Service Checks

The Google Workspace Alert Center integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][8].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/
[2]: /monitors/monitor_types/
[3]: /events/
[4]: /security_platform/
[5]: https://developers.google.com/identity/protocols/oauth2/service-account
[6]: http://app.datadoghq.com/integrations/google-workspace-alert-center
[7]: https://support.google.com/a/answer/9104586?hl=en&ref_topic=9105077
[8]: https://docs.datadoghq.com/help/

