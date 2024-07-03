---
algolia:
  subcategory: Marketplace Integrations
app_id: crest-data-systems-cyberark-pam
app_uuid: ababa86d-29f6-4503-b70a-40ef3772d764
assets:
  dashboards:
    'CDS CyberArk PAM : Application Details': assets/dashboards/crest_data_systems_cyberark_pam_application_details.json
    'CDS CyberArk PAM : Audit Logs': assets/dashboards/crest_data_systems_cyberark_pam_audit_logs.json
    'CDS CyberArk PAM : Inventory Overview': assets/dashboards/crest_data_systems_cyberark_pam_inventory_overview.json
    'CDS CyberArk PAM : Safe Details': assets/dashboards/crest_data_systems_cyberark_pam_safe_details.json
    'CDS CyberArk PAM : User, Account, Group Details': assets/dashboards/crest_data_systems_cyberark_pam_user_account_group_details.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: cds.cyberark.pam.safe.retention_days
      metadata_path: metadata.csv
      prefix: cds.cyberark.pam
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 7095797
    source_type_name: crest_data_systems_cyberark_pam
author:
  homepage: https://crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- marketplace
- security
- network
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_cyberark_pam
integration_id: crest-data-systems-cyberark-pam
integration_title: CyberArk PAM
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_cyberark_pam
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.crest_data_systems.cyberark_pam
  product_id: cyberark-pam
  short_description: Per CyberArk PAM User per month
  tag: user_id
  unit_label: CyberArk PAM User
  unit_price: 0.5
public_title: CyberArk PAM
short_description: Monitor CyberArk PAM's data using APIs & syslog
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Marketplace
  - Category::Security
  - Category::Network
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  - Submitted Data Type::Logs
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Monitor CyberArk PAM's data using APIs & syslog
  media:
  - caption: 'CDS CyberArk PAM : Audit Logs'
    image_url: images/crest_data_systems_cyberark_pam_audit_logs_details.png
    media_type: image
  - caption: 'CDS CyberArk PAM : Safe Details'
    image_url: images/crest_data_systems_cyberark_pam_safe_details.png
    media_type: image
  - caption: 'CDS CyberArk PAM : Application Details'
    image_url: images/crest_data_systems_cyberark_pam_application_details.png
    media_type: image
  - caption: 'CDS CyberArk PAM : Inventory Overview'
    image_url: images/crest_data_systems_cyberark_pam_inventory_overview.png
    media_type: image
  - caption: 'CDS CyberArk PAM : User, Account, Group Details'
    image_url: images/crest_data_systems_cyberark_pam_users_groups_accounts_details.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: CyberArk PAM
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Overview

CyberArk Privileged Access Manager (PAM) is a complete lifecycle solution for managing privileged credentials and secrets, and SSH Keys for enterprise. It enables organizations to secure, provision, manage, control, and monitor all activities associated with all types of privileged identities.

Features of CyberArk PAM include the following:

* **Manage Privileged Accounts:** Manage privileged accounts and their activities.
* **Privileged SSO:** Connect to connect to remote systems and applications without knowing or specifying the required password or key.
* **Monitor Sessions:** Secure, control and monitor privileged access to critical systems and applications by using vaulting technology to manage privileged accounts and create detailed session audits and video recordings of all IT administrator privileged sessions on remote machines.
* **Security:** Look for indications of abuse or misuse of the CyberArk platform by monitoring the use of privileged accounts, which are managed by the CyberArk PAM platform as well as accounts that are not managed yet.
* **Reports and Auditing:** Generate reports of the vaulting activities and export this data to third-party tools.

This integration uses CyberArk Privileged Access Manager (PAM) as the source to collect the data related to safes, users, groups, accounts, and applications from the portal by utilizing the CyberArk PAM's REST APIs v13.2. The integration also collects audit logs from the portal with Syslog.

> **Note:** This integration supports CyberArk On-Prem only.

## Support

サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから Crest Data にお問い合わせください。

- Support: [datadog.integrations@crestdata.ai][5]
- Sales: [datadog-sales@crestdata.ai][6]
- Website: [crestdata.ai][3]
- FAQ: [Crest Data Datadog Marketplace Integrations FAQ][12]
## Troubleshooting

Need help? Contact [Datadog support][10].

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[3]: https://www.crestdata.ai/
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6v7
[5]: mailto:datadog.integrations@crestdata.ai
[6]: mailto:datadog-sales@crestdata.ai
[7]: https://docs.cyberark.com/Product-Doc/OnlineHelp/PAS/Latest/en/Content/PASIMP/DV-Integrating-with-SIEM-Applications.htm#ConfigureSIEMintegration
[8]: https://docs.datadoghq.com/ja/agent/?tab=Linux
[9]: https://docs.datadoghq.com/ja/account_management/api-app-keys
[10]: https://docs.datadoghq.com/ja/help/
[11]: https://docs.crestdata.ai/datadog-integrations-readme/CyberArk_PAM.pdf
[12]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf

---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-cyberark-pam" target="_blank">Click Here</a> to purchase this application.