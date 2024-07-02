---
"app_id": "google-cloud-armor"
"app_uuid": "a48ba755-80f5-4d7d-bcde-2239af983021"
"assets":
  "dashboards":
    "google-cloud-armor": assets/dashboards/google_cloud_armor_overview.json
  "integration":
    "auto_install": false
    "events":
      "creates_events": false
    "metrics":
      "check":
      - gcp.networksecurity.https.request_count
      "metadata_path": metadata.csv
      "prefix": gcp.networksecurity.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10410"
    "source_type_name": Google Cloud Armor
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- google cloud
- network
- security
"custom_kind": "インテグレーション"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "google_cloud_armor"
"integration_id": "google-cloud-armor"
"integration_title": "Google Cloud Armor"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "google_cloud_armor"
"public_title": "Google Cloud Armor"
"short_description": "See Google Cloud Armor metrics, events, and logs in Datadog"
"supported_os": []
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Google Cloud"
  - "Category::Network"
  - "Category::Security"
  - "Submitted Data Type::Metrics"
  - "Submitted Data Type::Logs"
  - "Submitted Data Type::Events"
  "configuration": "README.md#Setup"
  "description": See Google Cloud Armor metrics, events, and logs in Datadog
  "media": []
  "overview": "README.md#Overview"
  "resources":
  - "resource_type": blog
    "url": "https://www.datadoghq.com/blog/network-attacks-google-cloud-armor/"
  "support": "README.md#Support"
  "title": Google Cloud Armor
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->


## 概要

[Google Cloud Armor][1] helps protect Google Cloud deployments from multiple types of threats, including distributed denial-of-service (DDoS) attacks and application attacks like cross-site scripting (XSS) and SQL injection (SQLi).

Armor’s Managed Protection is the managed application protection service that helps protect web applications and services from distributed DDoS attacks and other threats from the internet. Managed Protection features always-on protections for load balancers, and gives access to WAF rules.

Google Cloud Armor is integrated automatically with Security Command Center and exports two findings to the Security Command Center dashboard: Allowed Traffic Spike and Increasing Deny Ratio. 

Enable this integration along with the Google Cloud Security Command Center Integration to visualize DDoS threats to your Google Cloud environment in Datadog. With this integration, Datadog collects important security events from your Google Cloud network security configurations and metrics from Google Cloud Armor.

This integration delivers insight into the user activity of changes to cloud resources and every request evaluated by a security policy - from audit logs to request logs.


## セットアップ

### インストール

1. Before you start, ensure the following APIs are enabled for the projects you want to collect Google Cloud Armor events for:
* [Cloud Resource Manager API][2]
* [Google Cloud Billing API][3]
* [Google Cloud Monitoring API][4]
* [Google Cloud Security Command Center API][5]

2. Since Google Cloud Armor events are streamlined as findings to Google Security Command Center, make sure Google Cloud Armor is enabled in the Security Command Center at your Google Cloud console. For more information, see [Configuring Security Command Center][6].

3. Next, enable the collection of security findings on the [main Google Cloud Platform integration][7].

### 構成

To collect Google Cloud Armor metrics, configure the main Google Cloud integration.

To collect Google Cloud Armor events, you need to add the Security Center Findings Viewer role to the service account.
Install the Google Cloud Security Command Center integration, and enable collection of security findings on the main Google Cloud integration.

To set up logs forwarding from your Google Cloud environment to Datadog, see the [Log Collection][8] section.

Audit logs can be forwarded through standard log forwarding. These audit logs use the Google Cloud
resource types `gce_backend_service` and `network_security_policy`. To include only audit logs,
use filters such as `protoPayload.@type="type.googleapis.com/google.cloud.audit.AuditLog"` while
creating the log sink.

Request logs can be forwarded through standard log forwarding. These logs are automatically collected
in Google Cloud Load Balancing logs. Use filters such as
`jsonPayload.enforcedSecurityPolicy.outcome="DENY"` while creating the log sink to view requests
denied by a security policy.

## 収集データ

### メトリクス
{{< get-metrics-from-git "google_cloud_armor" >}}


### サービスチェック

The Google Cloud Armor integration does not include any service checks.

### イベント

The Google Cloud Armor integration does not include any events.

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Monitor network attacks with Google Cloud Armor and Datadog][11]

[1]: https://app.datadoghq.com/integrations/google-cloud-armor
[2]: https://console.cloud.google.com/apis/library/cloudresourcemanager.googleapis.com
[3]: https://console.cloud.google.com/apis/library/cloudbilling.googleapis.com
[4]: https://console.cloud.google.com/apis/library/monitoring.googleapis.com
[5]: https://console.cloud.google.com/apis/library/securitycenter.googleapis.com
[6]: https://console.cloud.google.com/security/command-center/overview
[7]: https://app.datadoghq.com/integrations/google-cloud-platform
[8]: https://docs.datadoghq.com/integrations/google_cloud_platform/#log-collection
[9]: https://github.com/DataDog/integrations-internal-core/blob/main/google_cloud_armor/metadata.csv
[10]: https://docs.datadoghq.com/help/
[11]: https://www.datadoghq.com/blog/network-attacks-google-cloud-armor/

