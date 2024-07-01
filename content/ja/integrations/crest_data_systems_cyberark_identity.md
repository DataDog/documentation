---
"algolia":
  "subcategory": Marketplace Integrations
"app_id": "crest-data-systems-cyberark-identity"
"app_uuid": "20b047e7-182f-4a90-b250-ba4405d3bc15"
"assets":
  "dashboards":
    "CyberArk Identity Application Dashboard": assets/dashboards/cds_cyberark_identity_application_overview.json
    "CyberArk Identity MFA Dashboard": assets/dashboards/cds_cyberark_identity_mfa_details_security_overview.json
    "CyberArk Identity User and Endpoint Dashboard": assets/dashboards/cds_cyberark_identity_user_and_endpoint_details.json
  "integration":
    "auto_install": false
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": true
    "metrics":
      "check": cds.cyberark.identity.device.available_device_capacity
      "metadata_path": metadata.csv
      "prefix": cds.cyberark.identity
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10377"
    "source_type_name": crest_data_systems_cyberark_identity
"author":
  "homepage": "https://crestdata.ai"
  "name": Crest Data
  "sales_email": datadog-sales@crestdata.ai
  "support_email": datadog.integrations@crestdata.ai
  "vendor_id": crest-data-systems
"categories":
- marketplace
- security
- event management
"custom_kind": "integration"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "crest_data_systems_cyberark_identity"
"integration_id": "crest-data-systems-cyberark-identity"
"integration_title": "CyberArk Identity"
"integration_version": ""
"is_public": true
"legal_terms":
  "eula": assets/EULA.pdf
"manifest_version": "2.0.0"
"name": "crest_data_systems_cyberark_identity"
"pricing":
- "billing_type": tag_count
  "includes_assets": true
  "metric": datadog.marketplace.crest_data_systems.cyberark.identity
  "product_id": cyberark-identity
  "short_description": Per CyberArk Identity User per month
  "tag": user_id
  "unit_label": CyberArk Identity User
  "unit_price": !!float "1.0"
"public_title": "CyberArk Identity"
"short_description": "Monitor CyberArk Identity's MFA, Device, User, and Application information."
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
  - "Category::Security"
  - "Category::Event Management"
  - "Offering::Integration"
  - "Submitted Data Type::Metrics"
  - "Submitted Data Type::Events"
  - "Submitted Data Type::Logs"
  "configuration": "README.md#Setup"
  "description": Monitor CyberArk Identity's MFA, Device, User, and Application information.
  "media":
  - "caption": CyberArk Identity MFA Dashboard
    "image_url": images/crest_data_systems_cyberark_identity_mfa_details.png
    "media_type": image
  - "caption": CyberArk Identity User and Endpoint Dashboard
    "image_url": images/crest_data_systems_cyberark_identity_user_and_endpoint_details.png
    "media_type": image
  - "caption": CyberArk Identity Application Dashboard
    "image_url": images/crest_data_systems_cyberark_identity_application_overview.png
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": CyberArk Identity
  "uninstallation": "README.md#Uninstallation"
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Overview

CyberArk Identity provides a secure platform for managing application access, endpoints, and your network infrastructure. CyberArk Identity also offers adaptive analytics, auditing of user activity, and built-in and custom reports, which are available through the Identity Administration portal.

**Features of CyberArk Identity include the following:**

* **Automated Access Provisioning:** Dynamically provision and revoke access to corporate resources.
* **Identity Orchestration:** Simplify and automate complex identity processes.
* **Compliance Controls:** Establish organization-wide compliance and access attestation controls.
* **Comprehensive Reporting:** Use audit reports and detailed dashboards to gain visibility into access permissions and entitlements.

* This integration uses CyberArk Identity as the source to collect the data related to users, devices, application, and MFA details from the portal by utilizing the CyberArk Identity's redrock query endpoint.


## Support

For support or feature requests, contact Crest Data through the following channels:

- Support Email: [datadog.integrations@crestdata.ai][5]
- Sales Email: [datadog-sales@crestdata.ai][6]
- Website: [crestdata.ai][3]
- FAQ: [Crest Data Datadog Marketplace Integrations FAQ][12]

[1]: https://docs.datadoghq.com/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[2]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[3]: https://www.crestdata.ai/
[4]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/?tab=agentv6v7
[5]: mailto:datadog.integrations@crestdata.ai
[6]: mailto:datadog-sales@crestdata.ai
[7]: https://docs.cyberark.com/Product-Doc/OnlineHelp/Idaptive/Latest/en/Content/Integrations/SIEM/SIEM.htm?TocPath=Administrator%7CIntegrations%7C_____4#Step1AddandconfiguretheOAuth2ClientAppintheIdentityAdministrationportal
[8]: https://docs.cyberark.com/Product-Doc/OnlineHelp/Idaptive/Latest/en/Content/Integrations/SIEM/SIEM.htm?TocPath=Administrator%7CIntegrations%7C_____4#Step2CreateaSIEMuserandaserviceaccountrole
[9]: https://docs.crestdata.ai/datadog-integrations-readme/CyberArk_Identity.pdf
[10]: https://docs.datadoghq.com/agent/?tab=Linux
[11]: https://docs.datadoghq.com/account_management/api-app-keys/
[12]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-cyberark-identity" target="_blank">Click Here</a> to purchase this application.
