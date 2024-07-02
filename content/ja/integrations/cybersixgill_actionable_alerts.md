---
"app_id": "cybersixgill-actionable-alerts"
"app_uuid": "b27feb80-b06f-4200-981a-e91a031d62e6"
"assets":
  "dashboards":
    "cybersixgill": assets/dashboards/cybersixgill_actionable_alerts_overview.json
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": true
    "metrics":
      "check": []
      "metadata_path": metadata.csv
      "prefix": cybersixgill_actionable_alerts.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10342"
    "source_type_name": cybersixgill_actionable_alerts
"author":
  "homepage": "https://www.cybersixgill.com/"
  "name": Cybersixgill
  "sales_email": info@cybersixgill.com
  "support_email": support@cyebrsixgill.com
"categories":
- security
- event management
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/cybersixgill_actionable_alerts/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "cybersixgill_actionable_alerts"
"integration_id": "cybersixgill-actionable-alerts"
"integration_title": "Cybersixgill Actionable Alerts"
"integration_version": "1.0.1"
"is_public": true
"manifest_version": "2.0.0"
"name": "cybersixgill_actionable_alerts"
"public_title": "Cybersixgill Actionable Alerts"
"short_description": "Monitor the activity of assets and provide real-time alerts on incoming threats"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Offering::Integration"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  - "Category::Security"
  - "Category::Event Management"
  - "Submitted Data Type::Events"
  "configuration": "README.md#Setup"
  "description": Monitor the activity of assets and provide real-time alerts on incoming threats
  "media":
  - "caption": Dashboard image of alerts count
    "image_url": images/dashboard_count.PNG
    "media_type": image
  - "caption": Dashboard image of events list with title
    "image_url": images/dashboard_emerging_alerts_count.PNG
    "media_type": image
  - "caption": Dashboard image of emerging alerts count
    "image_url": images/dashboard_events_list.PNG
    "media_type": image
  - "caption": Dashboard image of imminent alerts count
    "image_url": images/dashboard_imminent_alerts_count.PNG
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Cybersixgill Actionable Alerts
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview
The Cybersixgill actionable alerts check monitors critical assets across the deep, dark, and surface web such as IP addresses, domains, vulnerabilities, and VIPs. Receive alerts with context including severity, threat type, description, post snippet, recommendations, and assessments. This integration provides an out-of-the-box dashboard to prioritize and respond to threats.

## Setup


### Installation

To install the Cybersixgill actionable alerts check on your host:
1. Install the [developer tool][1] on any machine.
2. To build the package, run the command: `ddev release build cybersixgill_actionable_alerts`.
3. [Install the Datadog Agent][2] on your host.
4. Once the Agent is installed, run the following command to install the integration:
```
datadog-agent integration install -t datadog-cybersixgill-actionable-alerts==1.0.1
```

### Configuration
5. Reach out to [Cybersixgill Support][3] and request access to the Cybersixgill Developer Platform.
6. Receive the welcome email with access to the Cybersixgill developer platform.
7. Within the Cybersixgill developer platform, create the Client ID and Client secret.
8. Copy the Client ID and Client secret and paste them into the Configuration.yaml file.
9. Provide the minimum collection interval in seconds. For example, `min_collection_interval: 3600`

### Validation
Verify that Cybersixgill events are generated in the [Datadog Events Explorer][4].

## 収集データ

### Service Checks
{{< get-service-checks-from-git "cybersixgill_actionable_alerts" >}}


### Events
This integration sends API-type events to Datadog.

## Troubleshooting
Need help? Contact [Cybersixgill support][3].


[1]: https://docs.datadoghq.com/developers/integrations/new_check_howto/?tab=configurationtemplate#configure-the-developer-tool
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: mailto:support@cybersixgill.com
[4]: https://app.datadoghq.com/event/explorer
[5]: https://github.com/DataDog/integrations-extras/blob/master/cybersixgill_actionable_alerts/assets/service_checks.json

