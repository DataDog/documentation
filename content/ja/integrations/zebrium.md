---
"app_id": "zebrium"
"app_uuid": "a1fa9510-af05-4950-ad67-4eed3f14d4bf"
"assets":
  "dashboards":
    "Zebrium Root Cause as a Service Sample Dashboard": assets/dashboards/root_cause_as_a_service_sample_dashboard.json
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": false
    "metrics":
      "check": zebrium.logs.all.count
      "metadata_path": metadata.csv
      "prefix": zebrium.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10272"
    "source_type_name": zebrium
"author":
  "homepage": "https://www.zebrium.com"
  "name": Zebrium
  "sales_email": hello@zebrium.com
  "support_email": support@zebrium.com
"categories":
- automation
- notifications
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/zebrium/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "zebrium"
"integration_id": "zebrium"
"integration_title": "Zebrium RCaaS"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "zebrium"
"public_title": "Zebrium RCaaS"
"short_description": "Discover the root cause of problems directly on your dashboards"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Automation"
  - "Category::Notifications"
  - "Offering::Integration"
  - "Offering::UI Extension"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Discover the root cause of problems directly on your dashboards
  "media":
  - "caption": "Video: Root Cause Finder for Datadog."
    "image_url": images/Zebrium-Root_Cause_as_a_Service_thumb.png
    "media_type": video
    "vimeo_id": !!int "703040365"
  - "caption": Zebrium widget showing two root cause detections (red dot on vertical lines).
    "image_url": images/Zebrium_Root_Cause_Finder_Widget.png
    "media_type": image
  - "caption": Zebrium root cause summary shown in a side panel.
    "image_url": images/Zebrium_Root_Cause_Finder_With_Side_Panel.png
    "media_type": image
  "overview": "README.md#Overview"
  "resources":
  - "resource_type": blog
    "url": "https://www.datadoghq.com/blog/find-the-root-cause-faster-with-zebrium/"
  "support": "README.md#Support"
  "title": Zebrium RCaaS
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

When you know there's a problem and you're not sure what caused it, [Zebrium][1] shows you the root cause directly on your Datadog dashboards. It works by using machine learning on logs, without the need for manual training or setting up any rules, and it achieves accuracy in less than 24 hours. 

Using Zebrium is simple. When troubleshooting a problem, simply add the Zebrium app to your Datadog dashboard and look at the details of the corresponding detection.

Zebrium integrates with Datadog in two ways: 1) a Datadog App with a custom dashboard widget and 2) an events and metrics integration.

### 1) Datadog App

The Zebrium app provides a pre-built, interactive dashboard widget that displays the detected problems over time, and allows you to dig into the Root Cause of these problems (as well as relevant metrics). This method provides the simplest user experience.

### 2) Events and metrics integration

With the integration, Zebrium detection events and metrics are sent directly into Datadog. You can visualize them any way you'd like (sample dashboard provided). This method should be used if you would like to customize how Zebrium data appears on your dashboards.

## Setup

### Events and metrics integration

The Zebrium events and metrics integration uses a [Datadog API key][2], which needs to be created by a Datadog admin. Once you obtain a Datadog API key, see the [Zebrium documentation for Datadog integration][3] to learn how to setup the Zebrium events and metrics integration for Datadog.

### Dashboard widget

1. Click **Install Integration** in the top right of this panel.
2. Navigate to an existing Datadog dashboard or create a new one.
3. Press the **Add Widgets** button to expose the widget drawer.
4. Search for **Zebrium** in the **Apps** section of the widget drawer.
5. Click or drag the ***Zebrium Root Cause Finder*** widget icon to add it to your Datadog dashboard.
6. Open the [Zebrium UI][4] in a new browser tab and  create an access token for your deployment. 
   - Select the hamburger menu in the upper right of the Zebrium UI and choose Access Tokens. 
   - Click the Add Access Token button, provide a name for the token, select the deployment for the token and set role to viewer. 
   - Click Add and copy the token to your clipboard. 
7. In the widget editor in the Datadog UI, enter the following information:
   - **API Endpoint**: this is the absolute URL to the root of your Zebrium instance. It is normally **https://cloud.zebrium.com**.
   - **Token**: Paste the token that you created in step 6 above.
   - **Service Group**: The name of the service group you wish to show data from. Or enter 'All' to show data from all service groups in this deployment. 
9. Optionally give the widget a title.
10. Press **Save** to finish configuring the Datadog dashboard widget.

## Support

Need help? Contact [Datadog Support][5].

## Further reading

Additional helpful documentation, links, and articles:

- [Find the root cause faster with Datadog and Zebrium][6]

[1]: https://www.zebrium.com
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://docs.zebrium.com/docs/monitoring/datadog_autodetect/
[4]: https://cloud.zebrium.com
[5]: http://docs.datadoghq.com/help
[6]: https://www.datadoghq.com/blog/find-the-root-cause-faster-with-zebrium/

