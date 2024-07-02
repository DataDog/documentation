---
"app_id": "sym"
"app_uuid": "d81d1dd3-d5e8-4373-98a6-f95b797b3f9d"
"assets":
  "dashboards":
    "Sym Overview": assets/dashboards/sym_overview.json
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": false
    "metrics":
      "check": []
      "metadata_path": metadata.csv
      "prefix": sym.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10396"
    "source_type_name": sym
  "logs":
    "source": sym
  "oauth": assets/oauth_clients.json
"author":
  "homepage": "https://symops.com/"
  "name": Sym
  "sales_email": sales@symops.com
  "support_email": support@symops.com
"categories":
- security
- developer tools
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/sym/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "sym"
"integration_id": "sym"
"integration_title": "Sym"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "sym"
"public_title": "Sym"
"short_description": "Send Sym Audit Logs to Datadog"
"supported_os":
- windows
- macos
- linux
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  - "Supported OS::Linux"
  - "Category::Security"
  - "Category::Developer Tools"
  - "Offering::Integration"
  - "Submitted Data Type::Logs"
  "configuration": "README.md#Setup"
  "description": Send Sym Audit Logs to Datadog
  "media":
  - "caption": A Sym Overview Video
    "image_url": images/sym_video_thumbnail.jpg
    "media_type": video
    "vimeo_id": !!int "846654213"
  - "caption": Sym helps you build access and approval workflows using your native platform engineering tools
    "image_url": images/home_hero_image.png
    "media_type": image
  - "caption": Define and deploy access rules in Terraform
    "image_url": images/define_deploy.jpg
    "media_type": image
  - "caption": Request, approve, and deny anywhere in Slack
    "image_url": images/request_approve.jpg
    "media_type": image
  - "caption": An example of the Sym Overview Dashboard
    "image_url": images/sym_overview_dashboard.png
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Sym
  "uninstallation": "README.md#Uninstallation"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

[Sym][1] is a platform that allows you to define simple automations that turn just-in-time access policies into easy-to-operate workflows, executed in Slack. Define access flows in Terraform, customize and integrate with other systems in code, and use our API or Slack App to request and approve/deny access.

This integration enables customers to send Sym audit logs directly to Datadog using a Sym Log Destination. 

These logs are sent in real time for every event processed by the Sym platform, such as `request` or `approve`.

## セットアップ

### インストール

To set up the Sym integration:
1. From the Sym Datadog Integration tile, click on "Connect Accounts".
2. Datadog will redirect you to Sym to begin the OAuth authorization flow. Enter your Sym Org ID here to continue to log in to Sym.
3. After successfully authorizing, a `sym_log_destination` Terraform resource will display. Copy and paste this into your Sym Terraform Configuration.

### 構成

For more information about configuring your Datadog Log Destination in Terraform, see the [Sym documentation][2].

### Validation

After you have Terraformed your Datadog Log Destination, you can confirm its existence with the following `symflow` CLI command:
```
 symflow resources list sym_log_destination
```

## Uninstallation

- Uninstall the integration by clicking the Uninstall button on the integration tile.
- Once this integration has been uninstalled, any previous authorizations are revoked.
- Additionally, ensure that all API keys associated with this integration have been disabled by searching for the integration name on the API Keys page.

## トラブルシューティング

Need help? Contact us at [support@symops.com][3].

[1]: https://symops.com/
[2]: https://docs.symops.com/docs/datadog
[3]: mailto:support@symops.com

