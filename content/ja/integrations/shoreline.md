---
"app_id": "shoreline-integration"
"app_uuid": "90e1b0ed-0907-4973-929c-7e7f1be0c4f4"
"assets":
  "oauth": assets/oauth_clients.json
"author":
  "homepage": "https://shoreline.io/"
  "name": Shoreline.io
  "sales_email": sales@shoreline.io
  "support_email": support@shoreline.io
"categories":
- automation
- incidents
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/shoreline/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "shoreline"
"integration_id": "shoreline-integration"
"integration_title": "Shoreline.io"
"integration_version": ""
"is_public": true
"kind": "integration"
"manifest_version": "2.0.0"
"name": "shoreline"
"public_title": "Shoreline.io"
"short_description": "Build automations to repair triggered monitors"
"supported_os":
- linux
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Automation"
  - "Category::Incidents"
  - "Offering::UI Extension"
  - "Supported OS::Linux"
  "configuration": "README.md#Setup"
  "description": Build automations to repair triggered monitors
  "media":
  - "caption": Remediation dashboard
    "image_url": images/remediation_dashboard.png
    "media_type": image
  - "caption": Example of remediation automation setup
    "image_url": images/automate_remediation.png
    "media_type": image
  - "caption": Example of fleetwide interactive debugging and repair
    "image_url": images/fleetwide_interactive_debugging_and_repair.png
    "media_type": image
  - "caption": Example of fleetwide linux command details
    "image_url": images/fleetwide_linux_command_details.png
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Shoreline.io
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

Shoreline incident automation enables DevOps and Site Reliability Engineers (SREs) to interactively **debug at scale** and quickly **build remediations** to eliminate repetitive work.

The debug and repair feature allows you to execute commands in real-time across your server farm without needing to SSH into the servers individually. Execute anything that can be typed into the Linux command prompt such as Linux commands, shell scripts, and calls to cloud provider APIs, and turn these debug sessions into automations connected to Datadog monitors.

The Shoreline App automatically executes the automation when the monitor is triggered, significantly reducing Mean Time To Repair (MTTR) and manual work.

Shoreline helps everyone on call be as good as your best SRE. Shoreline arms your on-call team with debugging tools and approved remediation actions, helping you fix incidents faster with fewer escalations and ensuring that incidents are fixed correctly the first time with fewer mistakes.

To get started, set up a trial account on [Shoreline][1].
## セットアップ

### インストール

Follow the steps below to configure the integration:

1. Download the Shoreline Agent.
2. Install the Datadog integration from this tile to get access to the App.
2. Configure the Datadog-Shoreline App.


#### Shoreline Agent

An Agent is an efficient, non-intrusive process running in the background of your monitored hosts. Agents collect, aggregate, and send data from the host and all connected pods and containers to Shoreline's backend, which uses the data to create metrics.

Agents serve as the secure link between Shoreline and your environment's resources. Agents can execute actions on your behalf, from simple Linux commands to remediation playbooks. Operational language statements pass an API request through Shoreline's backend and to the relevant Agents which execute the command across targeted resources.

Agents receive commands from Shoreline's backend and take automatic remediation steps based on the alarms, actions, and bots you configure. These objects work in tandem to monitor your fleet and dispatch the appropriate response if something goes wrong.

Install Shoreline Agents on every host you want Shoreline to monitor and act upon. 

To install the Shoreline Agent, follow one of three methods:

1. [Kubernetes][2]
2. [Kubernetes with Helm][3]
3. [Virtual Machines][4]


#### Configuring the app

To configure the Datadog-Shoreline App in Shoreline, you need your Datadog API and application keys, and to define the Dashboard name and Webhook name.

For example:
![integration_example][5]

For in-depth instructions on configuring the app, see the [Datadog-Shoreline documentation][6].

## Support

Need help? Contact [Datadog support][7].

## Further reading

For more information, see the [Shoreline documentation][8].


[1]: https://shoreline.io/datadog?source=DatadogIntTile
[2]: https://docs.shoreline.io/installation/kubernetes
[3]: https://docs.shoreline.io/installation/kubernetes#install-with-helm
[4]: https://docs.shoreline.io/installation/virtual-machines
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/shoreline/images/integrate_shoreline_and_datadog.png
[6]: https://docs.shoreline.io/integrations/datadog
[7]: https://docs.datadoghq.com/help/
[8]: https://docs.shoreline.io/

