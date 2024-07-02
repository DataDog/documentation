---
"app_id": "uptycs"
"app_uuid": "d27ee4b6-649d-42bd-b7ac-fb40537d7031"
"assets":
  "dashboards":
    "Uptycs Events Dashboard": assets/dashboards/uptycs.json
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": true
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10400"
    "source_type_name": Uptycs
"author":
  "homepage": "https://www.uptycs.com"
  "name": Uptycs
  "sales_email": sales@uptycs.com
  "support_email": support@uptycs.com
"categories":
- cloud
- collaboration
- alerting
- compliance
- security
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/uptycs/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "uptycs"
"integration_id": "uptycs"
"integration_title": "Uptycs"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "uptycs"
"public_title": "Uptycs"
"short_description": "Collect alerts and detection from Uptycs"
"supported_os": []
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Cloud"
  - "Category::Collaboration"
  - "Category::Alerting"
  - "Category::Compliance"
  - "Category::Security"
  - "Offering::Integration"
  - "Submitted Data Type::Events"
  "configuration": "README.md#Setup"
  "description": Collect alerts and detection from Uptycs
  "media":
  - "caption": Uptycs events dashboard
    "image_url": images/integration_dashboard_1.png
    "media_type": image
  - "caption": Uptycs events per host trend graph
    "image_url": images/integration_dashboard_2.png
    "media_type": image
  - "caption": Uptycs detection as a Datadog event
    "image_url": images/data_collected_1.png
    "media_type": image
  - "caption": Uptycs alert as a Datadog event
    "image_url": images/data_collected_2.png
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Uptycs
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

Uptycs mitigates risk by prioritizing your responses to threats, vulnerabilities, misconfigurations, sensitive data exposure, and compliance requirements across your modern attack surface, making this information accessible through a single user interface and data model. This includes the capability to correlate threat activity as it traverses on-premises and cloud boundaries, providing a more comprehensive enterprise-wide security posture.

Looking for acronym coverage? We've got you covered with CNAPP, CWPP, CSPM, KSPM, CIEM, CDR, and XDR. Start with your Detection Cloud, utilize Google-like search, and the attack surface coverage you need today.

For more information, see the [Uptycs website][1].

The Uptycs integration enables you to ingest your Uptycs alerts and detections into Datadog events.

### Alert Details

Each alert contains the following main components:
   1. Title
   2. Description
   3. Id: Uptycs alert ID.
   4. Uptycs alert code.
   5. Alert severity.
   6. Alert key and value.
   7. Asset details: Asset ID and host name.
   8. Uptycs URL to navigate to the Uptycs platform.

### Detection Details

Each detection contains the following main components:
   1. Title or Name
   2. Id: Uptycs detection ID.
   3. Score: Uptycs calculated score.
   4. Alerts: List of Alerts associated with the detection.
   5. Events: List of Events associated with the detection.
   5. Attack Matrix: Techniques associated with the alerts and events.
   7. Asset details: Asset ID and host name.
   8. Uptycs URL to navigate to the Uptycs platform.

## セットアップ

To set up this integration, you must have an Uptycs account. If you are not an Uptycs customer, [contact us][2] for an Uptycs account.
You'll also need Datadog API keys.

### 構成

1. Create a [Datadog API key][3].
2. Create a Datadog Integration Destination on the Uptycs platform using your Datadog API key:
   1. Go to Configuration > Destinations.
   2. Click on New destination.
   3. Select **Datadog** destination type.
   4. Provide a name for the destination, your Datadog domain, and your API key. You can also add custom templates for alerts or detections in the template field.

      ![Integration setup part 1][4]

   5. Click **Save**.
3. Once the destination is set up, create a forwarding rule for it.
   1. Go to Configuration > Detection Forwarding Rules > New rule
   2. Provide a name and description, then choose the relevant criteria for the rule.
   3. In the 'Destinations' options, select the newly created destination.

      ![Integration setup part 2][5]

   4. Select Enable Rule and click **Save**.
4. The created destination can be used for alert forwarding.
   1. Go to Configuration > Alert Rules.
   2. Select an Alert Rule or bulk select several rules.
   3. In the 'Destinations' options, select the newly created destination.
   4. Select the options for 'Notify on Every Alert' and 'Close After Delivery'.

      ![Integration setup part 3][6]

   5. Click **Save**.
6. Once Uptycs generates an alert or detection, it will be delivered as a Datadog Event.

## トラブルシューティング

Need help? Contact [Support][7].

[1]: https://www.uptycs.com
[2]: https://www.uptycs.com/about/contact/
[3]: https://docs.datadoghq.com/account_management/api-app-keys/#add-an-api-key-or-client-token
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/uptycs/images/integration_setup_1.png
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/uptycs/images/integration_setup_2.png
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/uptycs/images/integration_setup_3.png
[7]: mailto:support@uptycs.com

