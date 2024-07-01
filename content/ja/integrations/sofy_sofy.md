---
"app_id": "sofy"
"app_uuid": "eea6fdbc-2f8d-4483-bbd3-767818b1c25a"
"assets":
  "dashboards":
    "Sofy Overview": assets/dashboards/sofy_sofy_overview.json
  "integration":
    "auto_install": true
    "metrics":
      "check": sofy.step.cpu_utilization
      "metadata_path": metadata.csv
      "prefix": sofy.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10353"
    "source_type_name": Sofy
  "oauth": assets/oauth_clients.json
"author":
  "homepage": "https://sofy.ai"
  "name": Sofy
  "sales_email": devops@sofy.ai
  "support_email": devops@sofy.ai
  "vendor_id": sofy
"categories":
- testing
- mobile
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/sofy_sofy/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "sofy_sofy"
"integration_id": "sofy"
"integration_title": "Sofy"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "sofy_sofy"
"pricing": []
"public_title": "Sofy"
"short_description": "Monitors device metrics during automated test case runs"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  - "Category::Testing"
  - "Category::Mobile"
  - "Offering::Integration"
  - "Submitted Data Type::Metrics"
  "configuration": "README.md#Setup"
  "description": Monitors device metrics during automated test case runs
  "media":
  - "caption": Connect Sofy with Datadog
    "image_url": images/datadog_connect.png
    "media_type": image
  - "caption": Enable Application to Send Metrics
    "image_url": images/datadog_monitoring.png
    "media_type": image
  - "caption": Sofy Device Metrics
    "image_url": images/datadog_metrics.png
    "media_type": image
  - "caption": No Code Automated Testcase Test run
    "image_url": images/datadog_testperform.png
    "media_type": image
  "overview": "README.md#Overview"
  "resources":
  - "resource_type": blog
    "url": "https://www.datadoghq.com/blog/sofy-mobile-tests/"
  - "resource_type": documentation
    "url": "https://docs.sofy.ai"
  "support": "README.md#Support"
  "title": Sofy
  "uninstallation": "README.md#Uninstallation"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

Sofy is a no-code platform for creating automated tests on mobile apps. Users can integrate with their CI/CD pipelines to execute tests on real devices and view the results of their functional tests, along with performance metrics.

This integration provides deeper insight into your testing process by visualizing key metrics and trends such as load time, network, memory utilization, and CPU. The out-of-the-box dashboard provides real-time visibility into your Sofy test results, enabling you to monitor and analyze performance over time, and make data-driven decisions to improve overall software quality.

## Data Collected
### Metrics

See [metadata.csv][1] for the full list of metrics provided by this check.


## Setup
To set up the Sofy integration:

1. Go to your [Datadog Integrations page][2] and click on the Sofy tile.

2. Go to the **Configuration** tab and click **Install Integration** at the bottom.

3. Click **Connect Accounts** to redirect to the [Integration tab][3] under Account Settings in Sofy.

4. Log into [Sofy][4], then click the **Connect** button on the Datadog tile to begin the integration process.

5. Sofy will prompt you to follow a series of OAuth steps to authorize the integration with Datadog. Follow these steps carefully, making sure to grant the necessary permissions to allow Sofy to send data to Datadog.

6. Once the integration is complete, navigate to the App Manager page by selecting it from the left-hand menu. From there, click on the monitoring tab on the right-hand side of the page. Enable Datadog monitoring for the selected app by toggling the appropriate switch.

7. Sofy now starts sending data to Datadog after each run in the selected app, allowing you to monitor and analyze the results in real time.


## Uninstallation
* Ensure that all API keys associated with this integration have been disabled by searching for Sofy on the [API Keys management page][5] in Datadog.

## Support
Need help? Contact [Sofy support][6].

## Further Reading
Additional helpful documentation, links, and articles:
* [Monitor your mobile tests with Sofy's offering in the Datadog Marketplace][7]
* [Sofy Documentation][8]


[1]: https://github.com/DataDog/integrations-extras/blob/master/sofy_sofy/metadata.csv
[2]: https://app.datadoghq.com/integrations
[3]: https://portal.sofy.ai/app/user-settings?selectedTab=integration
[4]: https://portal.sofy.ai
[5]: https://app.datadoghq.com/organization-settings/api-keys?filter=Sofy
[6]: https://support.sofy.ai/support/tickets/new
[7]: https://www.datadoghq.com/blog/sofy-mobile-tests/
[8]: https://docs.sofy.ai

