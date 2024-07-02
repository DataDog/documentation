---
"app_id": "notion"
"app_uuid": "0a709534-658c-4d8f-99a3-566dd7cd809b"
"assets":
  "dashboards":
    "notion_events": assets/dashboards/NotionDashboard.json
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": false
    "metrics":
      "check": []
      "metadata_path": metadata.csv
      "prefix": notion.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10361"
    "source_type_name": notion
  "oauth": assets/oauth_clients.json
"author":
  "homepage": "https://www.notion.so/"
  "name": Notion Labs, Inc.
  "sales_email": integrations@makenotion.com
  "support_email": team@makenotion.com
"categories":
- log collection
- collaboration
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/notion/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "notion"
"integration_id": "notion"
"integration_title": "Notion"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "notion"
"public_title": "Notion"
"short_description": "Monitor your Notion workspace events and customize detections in Datadog"
"supported_os":
- any
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Log Collection"
  - "Category::Collaboration"
  - "Supported OS::Any"
  - "Submitted Data Type::Logs"
  - "Offering::Integration"
  "configuration": "README.md#Setup"
  "description": Monitor your Notion workspace events and customize detections in Datadog
  "media":
  - "caption": Setting up the Datadog integration in Notion
    "image_url": images/Notion_DD.png
    "media_type": image
  - "caption": Notion event logs in Datadog
    "image_url": images/Notion_DD_2.png
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Notion
  "uninstallation": "README.md#Uninstallation"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

Notion is a Connected Workspace. It's where modern teams create and share docs, take notes, manage projects, and organize knowledge, all in one place. Install Notion's integration with Datadog to manage and monitor your workspace activity in [Datadog Cloud SIEM][1]. You can import your workspace's audit logs for real-time monitoring, alerting, and analysis. From there, you can detect and investigate potential security issues, suspicious behavior, and troubleshoot access with confidence and ease.

To see the full list of events emitted by Notion, see the [official Notion documentation][2].

## セットアップ

1. Open the Notion tile and click _Install Integration_.

2. Click _Connect Accounts_ to redirect to _Settings & Members_ in Notion.

3. Login to Notion, then navigate to _Connections_ > _Workspace Connections_ > _+Add Connection_ > _Datadog_. 

4. Notion prompts you to follow a series of OAuth steps to authorize the integration with Datadog.

Once connected, Notion starts sending near real-time data to Datadog.

## Uninstallation
Once this integration has been uninstalled, any previous authorizations are revoked.
Additionally, ensure that all API keys associated with this integration have been disabled by searching for the integration name on the [API Keys page][3].

In Notion, navigate to _Setting & Members_ > _Connections_ > _Workspace Connections_ > ... next to _Datadog_ > _Disconnect_.

## Support 
Need help? Contact [Notion Support][4].

[1]: https://docs.datadoghq.com/security/cloud_siem/
[2]: https://www.notion.so/help/audit-log
[3]: https://app.datadoghq.com/organization-settings/api-keys?filter=Notion
[4]: mailto:team@makenotion.com

