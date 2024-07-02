---
"app_id": "google-cloud-security-command-center"
"app_uuid": "200f1a0b-a67f-4096-a322-91aaee4f0de5"
"assets":
  "dashboards":
    "google-cloud-security-command-center": assets/dashboards/google_cloud_security_command_center_overview.json
  "integration":
    "auto_install": false
    "events":
      "creates_events": false
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "371"
    "source_type_name": Google Cloud Security Command Center
  "logs":
    "source": google.security.command.center
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- google cloud
- log collection
- security
"custom_kind": "インテグレーション"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "google_cloud_security_command_center"
"integration_id": "google-cloud-security-command-center"
"integration_title": "Google Cloud Security Command Center"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "google_cloud_security_command_center"
"public_title": "Google Cloud Security Command Center"
"short_description": "Security Command Center is a central vulnerability and threat reporting service."
"supported_os": []
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Google Cloud"
  - "Category::Log Collection"
  - "Submitted Data Type::Logs"
  - "Category::Security"
  "configuration": "README.md#Setup"
  "description": Security Command Center is a central vulnerability and threat reporting service.
  "media": []
  "overview": "README.md#Overview"
  "resources":
  - "resource_type": blog
    "url": "https://www.datadoghq.com/blog/datadog-google-security-command-center/"
  - "resource_type": blog
    "url": "https://www.datadoghq.com/blog/datadog-security-google-cloud/"
  "support": "README.md#Support"
  "title": Google Cloud Security Command Center
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

Google Cloud Security Command Center helps you strengthen your security posture by:
   * Evaluating your security and data attack surface
   * Providing asset inventory and discovery
   * Identifying misconfigurations, vulnerabilities, and threats
   * Helping you mitigate and remediate risks

Security Command Center uses services, such as Event Threat Detection and Security Health Analytics, to detect security issues in your environment. These services scan your logs and resources in Google Cloud, looking for threat indicators, software vulnerabilities, and misconfigurations. Services are also referred to as sources. 
For more information, see [Security sources][1].

When these services detect a threat, vulnerability, or misconfiguration, they issue a finding. A finding is a report or record of an individual threat, vulnerability, or misconfiguration that service has found in your Google Cloud environment. Findings show the issue that was detected, the Google Cloud resource that is affected by the issue, and guidance on how you can address the issue.

## セットアップ

### インストール

Before you start, ensure the following APIs are enabled for the projects you want to collect Google Cloud Security Command Center findings for:
  * [Cloud Resource Manager API][2]
  * [Google Cloud Billing API][3]
  * [Google Cloud Security Command Center API][4]

### Assign role to service accounts
A service account must have this role to retrieve findings from the GCP Security Command Center.
Logs may not show up due to a permissions denied error if this role is not enabled.

Assign the following role:
   * ***Security Center Findings Viewer*** 

**NOTE:** 

If the same project is discovered by multiple service accounts, all attached service accounts
must have [Security Center Findings Viewer Role][5] added.

Failure to comply with this requirement may result in PermissionDenied errors. We will not be able to collect the
Security Findings for this project. Therefore, it is important to ensure that all service accounts have the necessary
permissions to access security findings for any project they are associated with.

### 構成

Google Cloud Security Command Center is included as part of the main [Google Cloud Platform integration][6] package. 
If you haven't already, follow this doc to set up the [Google Cloud Platform integration][7] first.

On the main Google Cloud Platform Integration tile:
1.  Open the Service Account and/or ProjectID corresponding to the project you are looking to pull security findings for.
2.  Under the **Security Findings** tab, Enable collection of security findings using the toggle.

Once enabled, your security findings may take up to ***1 day*** to be collected.

## 収集データ

#### ログ収集

Google Cloud Security Command Center findings are collected as logs with the [Google Cloud Security Command Center Client API][8].

Inside the Datadog Log Explorer, find Google Cloud Security Command Center logs with the following filter:
   * Set ```Findings``` as the **Service**
   * Set ```google.security.command.center``` as the **Source**
   * The log status is **Info**.

### メトリクス

Google Cloud Security Command Center does not include any metrics.

### サービスチェック

Google Cloud Security Command Center does not include any service checks.

### イベント

Google Cloud Security Command Center does not include any events.

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Organize and analyze your Google Cloud security findings with Datadog][10]
- [Datadog Security extends compliance and threat protection capabilities for Google Cloud][11]

[1]: https://cloud.google.com/security-command-center/docs/concepts-security-sources
[2]: https://console.cloud.google.com/apis/library/cloudresourcemanager.googleapis.com
[3]: https://console.cloud.google.com/apis/library/cloudbilling.googleapis.com
[4]: https://console.cloud.google.com/apis/library/securitycenter.googleapis.com
[5]: https://cloud.google.com/security-command-center/docs/access-control-org#securitycenter.findingsViewer
[6]: https://app.datadoghq.com/integrations/google-cloud-platform
[7]: https://docs.datadoghq.com/integrations/google_cloud_platform/
[8]: https://cloud.google.com/security-command-center/docs
[9]: https://docs.datadoghq.com/help/
[10]: https://www.datadoghq.com/blog/datadog-google-security-command-center/
[11]: https://www.datadoghq.com/blog/datadog-security-google-cloud/

