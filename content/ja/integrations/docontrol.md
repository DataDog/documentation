---
"app_id": "docontrol"
"app_uuid": "7622c46e-bade-44ce-99e1-a3529bf4fc04"
"assets": {}
"author":
  "homepage": "https://www.docontrol.io/"
  "name": DoControl
  "sales_email": sales@docontrol.io
  "support_email": support@docontrol.io
"categories":
- automation
- log collection
- security
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/docontrol/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "docontrol"
"integration_id": "docontrol"
"integration_title": "DoControl"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "docontrol"
"public_title": "DoControl"
"short_description": "SaaS Data Security - modernizing DLP and CASB to Secure SaaS Data"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Automation"
  - "Category::Log Collection"
  - "Category::Security"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": SaaS Data Security - modernizing DLP and CASB to Secure SaaS Data
  "media":
  - "caption": Use DoControl's security automated workflows to create sophisticated, flexible and granular business logic with Datadog's log and incident capabilities.
    "image_url": images/dc-dd-01.png
    "media_type": image
  - "caption": DoControl consolidates end-user activity events and asset metadata across your SaaS apps to provide a centralized view of all SaaS activity and asset exposure.
    "image_url": images/dc-dd-02.png
    "media_type": image
  - "caption": DoControl provides deep actionable insights and visibility into your entire SaaS app ecosystem.
    "image_url": images/dc-dd-03.png
    "media_type": image
  - "caption": DoControl integrates with the most popular SaaS apps in multi-segments, including apps that fall into the categories of Collaboration, CRM, Communication, Dev tools, HR, IdP, EDR and more.
    "image_url": images/dc-dd-04.png
    "media_type": image
  - "caption": DoControl provides a broad catalog of pre-established, ready-to-use playbooks, representing common threat models and mission critical use cases to protect.
    "image_url": images/dc-dd-05.png
    "media_type": image
  - "caption": DoControl's cross-SaaS anomaly detection mechanism triggers contextual alerts to reduce incident response time and provide auto-remediate measures.
    "image_url": images/dc-dd-06.png
    "media_type": image
  - "caption": DoControl provides visibility into and enables remediation for the inventories of all your SaaS apps, including 3rd party apps (OAuth apps) - a major threat vector.
    "image_url": images/dc-dd-07.png
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": DoControl
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

This integration allows [DoControl][1] customers to forward their DoControl-related logs and events to Datadog through automated security workflows.

## Setup

To set up this integration, you must have an active [DoControl account][2]. You must also have proper [admin permissions][3] in Datadog.

### Installation

No installation is required on your host.

### Use Datadog actions in DoControl's workflows

You must create a Datadog API key and an application key to use as input parameters for Datadog actions in DoControl.

#### Create an API key in Datadog

1. Use Datadog's [Add an API key][4] documentation to create an API key. Give the key a meaningful name such as `DoControl`.
2. Copy the `Key` and save it.


#### Create an application key in Datadog

1. Use Datadog's [Add application keys][5] documentation to create an application key.
2. Copy and save your application key.

![Get_DD_Application_Key][6]


#### Create a Datadog integration in DoControl

1. In DoControl, navigate to [Dashboard->Settings->Workflows->Secrets][7], and add your Datadog API key as a new secret.

   ![DC_Secrets][8]

2. Create a new Workflow from a pre-established [**playbook**][9] or from [**scratch**][10].

   ![DC_WF_Create][11]

3. Design and edit your business logic by dragging and dropping actions onto the canvas, configuring the steps, and connecting them.

4. From the Actions bar, under **Utilities**, you can drag and drop Datadog actions into your Workflow, such as **Send logs** or **Create incident**.

   ![DC_Utils][12]

5. Configure the actions to refer to the DD-API-KEY stored as a secret in Step 1 above, and the DD-APPLICATION-KEY obtained in [Create an application key in Datadog](#create-an-application-key-in-datadog). 

   ![DC_DD_conf][13]

Learn more about DoControl in the [DoControl documentation][14].




## Support

Need help? Contact [Datadog support][15] or [DoControl support][16].


[1]: https://www.docontrol.io/
[2]: https://www.docontrol.io/demo
[3]: https://docs.datadoghq.com/account_management/rbac/permissions/
[4]: https://docs.datadoghq.com/account_management/api-app-keys/#add-an-api-key-or-client-token
[5]: https://docs.datadoghq.com/account_management/api-app-keys/#add-application-keys
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/docontrol/images/Get_DD_Application_Key.png
[7]: https://app.docontrol.io/settings/workflows?tab=Secrets
[8]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/docontrol/images/DC_Secrets.png
[9]: https://app.docontrol.io/workflowV2/playbooks?filter=by_use_case&use_case=all
[10]: https://app.docontrol.io/workflowV2/workflow/new/workflow-editor
[11]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/docontrol/images/DC_WF_Create.png
[12]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/docontrol/images/DC_Utils.png
[13]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/docontrol/images/DC_DD_conf.png
[14]: https://docs.docontrol.io/docontrol-user-guide/the-docontrol-console/workflows-beta/designing-and-editing-workflows/defining-workflow-and-action-settings#action-categories
[15]: https://docs.datadoghq.com/help/
[16]: mailto:support@docontrol.io

