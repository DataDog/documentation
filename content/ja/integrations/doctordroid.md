---
"app_id": "doctordroid"
"app_uuid": "5e75658c-065e-460f-b9f8-42bf100e361d"
"assets":
  "dashboards":
    "doctor_droid_overview": assets/dashboards/doctor_droid_overview.json
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": true
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10443"
    "source_type_name": doctor_droid
  "oauth": assets/oauth_clients.json
"author":
  "homepage": "https://www.drdroid.io"
  "name": Doctor Droid
  "sales_email": sales@drdroid.io
  "support_email": support@drdroid.io
"categories":
- automation
- incidents
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/doctordroid/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "doctordroid"
"integration_id": "doctordroid"
"integration_title": "Doctor Droid"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "doctordroid"
"public_title": "Doctor Droid"
"short_description": "Analyze your alerts, identify trends, and improve noise and coverage"
"supported_os":
- linux
- macos
- windows
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Supported OS::Linux"
  - "Supported OS::macOS"
  - "Supported OS::Windows"
  - "Category::Automation"
  - "Category::Incidents"
  - "Offering::Integration"
  - "Queried Data Type::Metrics"
  - "Queried Data Type::Logs"
  - "Queried Data Type::Traces"
  - "Queried Data Type::Events"
  - "Queried Data Type::Incidents"
  - "Submitted Data Type::Events"
  "configuration": "README.md#Setup"
  "description": Analyze your alerts, identify trends, and improve noise and coverage
  "media":
  - "caption": Doctor Droid Overview Dashboard
    "image_url": images/doctor_droid_overview.png
    "media_type": image
  - "caption": Trends in Datadog Alert Occurrences
    "image_url": images/alert_occurence_count_trends.png
    "media_type": image
  - "caption": Distribution of Top 5 Alert Occurrences
    "image_url": images/top_5_alerts_distribution.png
    "media_type": image
  - "caption": Top 10 Lifetime Alert Types and Affected Services
    "image_url": images/top_10_lifetime_alert_counts.png
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Doctor Droid
  "uninstallation": "README.md#Uninstallation"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview
Doctor Droid is an alert enrichment & investigation tool that will help your team streamline debugging & diagnosis workflows:
* When an alert is triggered, it automatically fetches metrics from Datadog, Cloud Provider & other observability tools and _surfaces relevant data back to your team_.
* Publishes investigation insights on Datadog dashboard and respective monitors within seconds, allowing for easy access and review within the existing workflow.
* Capability to customize basis your team's requirements and application's architecture.

Our Datadog integration fetches metrics, traces and/or events basis the features you are using within Datadog & the type of investigation required.

## セットアップ

### インストール
1. Navigate to the [Doctor Droid integration tile][1] in Datadog.
1. In the *Configure* tab click **Connect Accounts**. This takes you to the Integrations page within [Doctor Droid][2].
1. In Doctor Droid, navigate to the [integrations page][3] and add the Datadog integration. 
1. Follow the instructions for the Datadog OAuth flow to grant Doctor Droid access to query APM and infrastructure metrics from your Datadog account.

### 構成
After you add the integration, explore your alerts history within Doctor Droid to discover trends. You can create reports and playbooks to enrich your generated alerts data.

## Uninstallation

To remove the Datadog integration from Doctor Droid:
1. Navigate to the [Doctor Droid integrations page][3].
1. Click  **Delete**. 
1. Navigate to the [Datadog integrations page][4]. Find and select the integration tile for Doctor Droid. 
1. From the Doctor Droid integration tile, click the  **Uninstall Integration**  button to uninstall from Datadog. 

After you uninstall this integration, any previous authorizations are revoked.

Additionally, ensure that all API keys associated with this integration have been disabled by searching for the integration name on the [API Keys management page][5].

## Support

Need help? Contact  [Doctor Droid support][6].

[1]: https://app.datadoghq.com/integrations?integrationId=doctordroid
[2]: https://alertops-app.drdroid.io/
[3]: https://alertops-app.drdroid.io/integrations
[4]: https://app.datadoghq.com/integrations
[5]: https://app.datadoghq.com/organization-settings/api-keys?filter=Doctor%20Droid
[6]: mailto:support@drdroid.io

