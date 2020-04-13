---
categories:
- Collaboration
ddtype: crawler
dependencies: []
description: Be notified of Datadog alerts and events in Microsoft Teams.
doc_link: https://docs.datadoghq.com/integrations/microsoft_teams/
git_integration_title: microsoft_teams
has_logo: true
integration_title: Microsoft Teams
is_public: true
kind: integration
manifest_version: '1.0'
name: microsoft_teams
public_title: Datadog-Microsoft Teams Integration
short_description: Be notified of Datadog alerts and events in Microsoft Teams.
version: '1.0'
---

## Overview

Integrate with Microsoft Teams to:

* Be notified of Datadog alerts and events in Microsoft Teams
* Share messages and graphs with your Microsoft Teams team

## Setup
To integrate Datadog with a Microsoft Teams channel:

1. Choose the `...` button next to the channel name in the list of channels and then choose `Connectors`.

    {{< img src="integrations/microsoft_teams/microsoft_team_step_1.png" alt="Microsoft Teams step 1" responsive="true">}}

2. Search for Datadog and click on `Configure`.

    {{< img src="integrations/microsoft_teams/microsoft_team_step_2.png" alt="Microsoft Teams step 2" responsive="true">}}

3. If you have a sub-domain, enter the sub-domain of your account, if you don't have one, enter `app`. Click **Visit site to install**. This redirects you back to Datadog.

    {{< img src="integrations/microsoft_teams/microsoft_team_step_3.png" alt="Microsoft Teams step 3" responsive="true">}}

4. In the Microsoft Teams integrations tile, under the configuration tab, click on the `Connect to Office 365` button to complete the installation.

    {{< img src="integrations/microsoft_teams/microsoft_team_step_4.png" alt="Microsoft Teams step 1" responsive="true">}}

5. Replace the `auto-generated` team name with any desired name.

    {{< img src="integrations/microsoft_teams/microsoft_team_step_5.png" alt="Microsoft Teams step 1" responsive="true">}}

You can now use the [`@-notification` feature][1] with your Microsoft team name.

## Data Collected
### Metrics

The Microsoft Teams integration does not provide any metrics.

### Events

The Microsoft Teams integration does not include any events.

### Service Checks
The Microsoft Teams integration does not include any service checks.

## Troubleshooting

### Using the Teams Web UI
SSO may interfere with setting up the Teams integration. If the integration is not showing the `Connect to Office 365` button, try the setup steps using the Teams web UI.

Need help? Contact [Datadog support][2].



{{< get-dependencies >}}
[1]: https://docs.datadoghq.com/developers/faq/what-do-notifications-do-in-datadog/
[2]: https://docs.datadoghq.com/help/
