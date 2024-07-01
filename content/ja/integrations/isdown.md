---
"app_id": "isdown"
"app_uuid": "22560cfe-27cc-492f-a978-64dfcdc3b3c0"
"assets":
  "dashboards":
    "IsDown": assets/dashboards/isdown_overview.json
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": true
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10323"
    "source_type_name": IsDown
  "oauth": assets/oauth_clients.json
"author":
  "homepage": "https://isdown.app"
  "name": IsDown
  "sales_email": sales@isdown.app
  "support_email": support@isdown.app
"categories":
- notifications
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/isdown/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "isdown"
"integration_id": "isdown"
"integration_title": "IsDown"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "isdown"
"public_title": "IsDown"
"short_description": "IsDown helps companies monitor all third-party status pages in one place"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Notifications"
  - "Offering::Integration"
  - "Submitted Data Type::Events"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": IsDown helps companies monitor all third-party status pages in one place
  "media":
  - "caption": IsDown and Datadog Flow
    "image_url": images/isdown_datadog_flow.jpg
    "media_type": image
  - "caption": IsDown Dashboards
    "image_url": images/isdown_dashboards.jpg
    "media_type": image
  - "caption": Datadog Dashboard
    "image_url": images/isdown_datadog_dashboard.jpg
    "media_type": image
  "overview": "README.md#Overview"
  "resources":
  - "resource_type": blog
    "url": "https://www.datadoghq.com/blog/track-provider-outages-isdown-datadog/"
  "support": "README.md#Support"
  "title": IsDown
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

[IsDown][1] is a status page aggregator and outage monitoring tool that helps businesses monitor their dependencies. You can provide your team real-time monitoring and instant notifications for outages in all your tools and cloud providers. IsDown monitors more than 2000 status pages.

With this integration, you can receive alerts from third-party dependencies in Datadog, monitor business critical services, and understand the frequency of outages all within the out-of-the-box dashboard.

## Setup

1. Use your existing account or create a new one in [IsDown][1].
2. Log in to your account and go to the **Notifications** page.
3. Click on the checkbox to select Datadog and then click **Connect to Datadog**.
4. You are then redirected to Datadog to authorize the application. IsDown creates an API key that only has access to what IsDown needs to send events and service checks to Datadog.
5. After authorization you are redirected to IsDown.
6. Select the services to monitor.
7. Configure any desired notification settings for each service.


### Uninstallation

1. Go to the **Notifications** page in IsDown.
2. Unselect Datadog and click **Save**.
3. Ensure that all API keys associated with this integration have been disabled by searching for IsDown on the [API Keys management page][2] in Datadog.


## Data Collected

### Service Checks
{{< get-service-checks-from-git "isdown" >}}


### Events

IsDown sends events for each outage that happens in the services you monitor. It sends two types of events, one for the start of the outage and one for the end of the outage. The events are sent with the following attributes:
- Title: The name of the service with the outage.
- Text: The description of the outage.
- Tags: `isdown` and `isdown:service_name`.

## Troubleshooting

Need help? Contact [IsDown support][4].

## Further reading

Additional helpful documentation, links, and articles:

[Track service provider outages with IsDown and Datadog][5]

[1]: https://isdown.app
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: assets/service_checks.json
[4]: mailto:support@isdown.app
[5]: https://www.datadoghq.com/blog/track-provider-outages-isdown-datadog/

