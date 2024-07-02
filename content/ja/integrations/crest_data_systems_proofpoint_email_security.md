---
"algolia":
  "subcategory": Marketplace Integrations
"app_id": "crest-data-systems-proofpoint-email-security"
"app_uuid": "4e419332-b689-486b-ae36-09abecd41a9e"
"assets":
  "dashboards":
    "Crest Proofpoint - Isolation Dashboard": assets/dashboards/cds_proofpoint_isolation.json
    "Crest Proofpoint - TAP Dashboard": assets/dashboards/cds_proofpoint_tap.json
    "Crest Proofpoint On Demand - Email Security": assets/dashboards/cds_proofpoint_on_demand_email_security.json
    "Crest Proofpoint On Demand - TLS Overview": assets/dashboards/cds_proofpoint_on_demand_tls_overview.json
  "integration":
    "auto_install": false
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": true
    "metrics":
      "check": cds.proofpoint.tap.messages_blocked.spamScore
      "metadata_path": metadata.csv
      "prefix": cds.proofpoint
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10379"
    "source_type_name": crest_data_systems_proofpoint_email_security
  "monitors":
    "[Proofpoint Email Security] Service Check Monitor": assets/monitors/cds_service_check_monitor.json
"author":
  "homepage": "https://crestdata.ai"
  "name": Crest Data
  "sales_email": datadog-sales@crestdata.ai
  "support_email": datadog.integrations@crestdata.ai
  "vendor_id": crest-data-systems
"categories":
- marketplace
- data stores
- event management
"custom_kind": "インテグレーション"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "crest_data_systems_proofpoint_email_security"
"integration_id": "crest-data-systems-proofpoint-email-security"
"integration_title": "Proofpoint Email Security"
"integration_version": ""
"is_public": true
"legal_terms":
  "eula": assets/EULA.pdf
"manifest_version": "2.0.0"
"name": "crest_data_systems_proofpoint_email_security"
"pricing":
- "billing_type": tag_count
  "includes_assets": true
  "metric": datadog.marketplace.crest_data_systems_proofpoint_email_security
  "product_id": proofpoint-email-security
  "short_description": Per registered Proofpoint user
  "tag": webhooks-integration
  "unit_label": Registered Proofpoint users
  "unit_price": !!float "1.0"
"public_title": "Proofpoint Email Security"
"short_description": "Monitors Proofpoint TAP, Proofpoint On-Demand, and Proofpoint Isolation"
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
  - "Category::Marketplace"
  - "Category::Data Stores"
  - "Category::Event Management"
  - "Offering::Integration"
  - "Submitted Data Type::Metrics"
  - "Submitted Data Type::Events"
  - "Submitted Data Type::Logs"
  "configuration": "README.md#Setup"
  "description": Monitors Proofpoint TAP, Proofpoint On-Demand, and Proofpoint Isolation
  "media":
  - "caption": Crest Proofpoint - TAP Dashboard
    "image_url": images/crest_data_systems_proofpoint_tap_1.png
    "media_type": image
  - "caption": Crest Proofpoint - TAP Dashboard
    "image_url": images/crest_data_systems_proofpoint_tap_2.png
    "media_type": image
  - "caption": Crest Proofpoint On Demand - Email Security
    "image_url": images/crest_data_systems_proofpoint_on_demand_email_security_1.png
    "media_type": image
  - "caption": Crest Proofpoint On Demand - Email Security
    "image_url": images/crest_data_systems_proofpoint_on_demand_email_security_2.png
    "media_type": image
  - "caption": Crest Proofpoint On Demand - Email Security
    "image_url": images/crest_data_systems_proofpoint_on_demand_email_security_3.png
    "media_type": image
  - "caption": Crest Proofpoint On Demand - TLS Overview
    "image_url": images/crest_data_systems_proofpoint_on_demand_tls_1.png
    "media_type": image
  - "caption": Crest Proofpoint On Demand - TLS Overview
    "image_url": images/crest_data_systems_proofpoint_on_demand_tls_2.png
    "media_type": image
  - "caption": Crest Proofpoint - Isolation
    "image_url": images/crest_data_systems_proofpoint_isolation.png
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Proofpoint Email Security
  "uninstallation": "README.md#Uninstallation"
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Overview

The Proofpoint email security integration monitors and visualizes [Proofpoint TAP][7], [Proofpoint on Demand][8], and [Proofpoint Isolation][9].

### Proofpoint Targeted Attack Protection (TAP)

**Proofpoint Targeted Attack Protection (TAP)** is an advanced threat protection solution designed to safeguard organizations from targeted attacks in today's evolving security landscape. TAP combines advanced technologies, threat intelligence, and real-time analysis to provide comprehensive protection against email-based threats, including advanced malware, phishing attacks, and social engineering techniques. It also helps detect, mitigate, and block advanced threats that target people through email. The solution detects attacks that use malicious attachments and URLs to install malware or trick users into sharing their passwords and other sensitive information.

### Proofpoint on Demand

**Proofpoint on Demand** is a comprehensive cloud-based cybersecurity platform designed to safeguard businesses from various cyber threats. It offers a diverse array of services, such as email security, threat intelligence, information protection, and compliance solutions. It enables you to make informed decisions and take necessary steps to enhance your overall security posture. Additionally, the app provides insightful details about the encryption status of your communication, further enhancing your understanding of data protection measures.

#### Key features of Proofpoint on Demand

* **Email traffic monitoring:** Monitor the flow of messages to proactively identify and prevent spam, phishing attempts, and other email-related threats.
* **Compliance monitoring:** Monitor email communications to ensure adherence to internal policies and external regulations, such as Data Loss Prevention (DLP), Domain-based Message Authentication, Reporting, and Conformance (DMARC), and other applicable guidelines.
* **Incident investigation:** Conduct thorough investigations of potential security incidents by leveraging email security and compliance data. This includes tracing the origins of security threats and assessing their impact.
* **User behavior monitoring:** Keep a close eye on email-related behavior to detect any signs of insider threats or unauthorized access attempts.

### Proofpoint Isolation

**Proofpoint Isolation** is designed to enhance cybersecurity by isolating and protecting users from potentially malicious content. The primary goal is to prevent users from interacting directly with harmful or suspicious content, thereby reducing the risk of cyber threats.

This integration monitors:
- `Messages Blocked and Delivered` and `Clicks Blocked and Permitted` that are processed by Proofpoint TAP server.
- Message type data using Proofpoint on Demand Log Service as the source and utilizes the secure WebSocket (WSS) protocol.
- User's web browsing and email activity by the Proofpoint Isolation Server.


## Support

サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから Crest Data にお問い合わせください。

- Support Email: [datadog.integrations@crestdata.ai][5]
- Sales Email: [datadog-sales@crestdata.ai][6]
- Website: [crestdata.ai][3]
- FAQ: [Crest Data Datadog Marketplace Integrations FAQ][14]

[1]: https://docs.datadoghq.com/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[2]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[3]: https://www.crestdata.ai/
[4]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/?tab=agentv6v7
[5]: mailto:datadog.integrations@crestdata.ai
[6]: mailto:datadog-sales@crestdata.ai
[7]: https://www.proofpoint.com/us/products/advanced-threat-protection/targeted-attack-protection
[8]: https://www.proofpoint.com/us/products/email-security-and-protection/email-protection
[9]: https://www.proofpoint.com/us/products/cloud-security/isolation
[10]: https://proofpointisolation.com
[11]: https://docs.crestdata.ai/datadog-integrations-readme/Proofpoint_Email_Security.pdf
[12]: https://docs.datadoghq.com/agent/?tab=Linux
[13]: https://docs.datadoghq.com/account_management/api-app-keys/
[14]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-proofpoint-email-security" target="_blank">Click Here</a> to purchase this application.
