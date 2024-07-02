---
"algolia":
  "subcategory": Marketplace Integrations
"app_id": "crest-data-systems-sysdig"
"app_uuid": "b3e22bb7-8fb1-45d5-ad65-2f63d6a42a79"
"assets":
  "dashboards":
    "CDS Activity Audit Overview": assets/dashboards/cds_sysdig_activity_audit_overview.json
    "CDS Audit Tap Overview": assets/dashboards/cds_sysdig_audittap_overview.json
    "CDS Policy Events Overview": assets/dashboards/cds_sysdig_policy_events_overview.json
  "integration":
    "auto_install": false
    "configuration": {}
    "events":
      "creates_events": true
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10366"
    "source_type_name": crest_data_systems_sysdig
"author":
  "homepage": "https://www.crestdata.ai"
  "name": Crest Data
  "sales_email": datadog-sales@crestdata.ai
  "support_email": datadog.integrations@crestdata.ai
  "vendor_id": crest-data-systems
"categories":
- marketplace
- data stores
- containers
- kubernetes
- security
"custom_kind": "インテグレーション"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "crest_data_systems_sysdig"
"integration_id": "crest-data-systems-sysdig"
"integration_title": "Sysdig"
"integration_version": ""
"is_public": true
"legal_terms":
  "eula": assets/EULA.pdf
"manifest_version": "2.0.0"
"name": "crest_data_systems_sysdig"
"pricing":
- "billing_type": flat_fee
  "includes_assets": true
  "product_id": sysdig
  "short_description": Flat fee per month for sysdig integration.
  "unit_price": !!float "1995.0"
"public_title": "Sysdig"
"short_description": "Visualize Sysdig Syslog data"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Marketplace"
  - "Category::Data Stores"
  - "Category::Containers"
  - "Category::Kubernetes"
  - "Category::Security"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  - "Offering::Integration"
  - "Submitted Data Type::Logs"
  "configuration": "README.md#Setup"
  "description": Visualize Sysdig Syslog data
  "media":
  - "caption": CDS Sysdig - Policy Events Overview
    "image_url": images/cds_sysdig_policy_events_overview.png
    "media_type": image
  - "caption": CDS Sysdig - Audit Tap Overview
    "image_url": images/cds_sysdig_audittap_overview.png
    "media_type": image
  - "caption": CDS Sysdig - Activity Audit Overview
    "image_url": images/cds_sysdig_activity_audit_overview.png
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Sysdig
  "uninstallation": "README.md#Uninstallation"
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->



## Overview

* Sysdig is a unified data platform that provides a powerful and comprehensive solution for monitoring, security, and troubleshooting in containerized and cloud-native environments. Monitor, secure, and troubleshoot your hosts, Kubernetes clusters, and workloads.
* Sysdig Secure enables teams to secure builds; detect and respond to runtime threats; and continuously manage cloud configurations, permissions, and compliance.

This integration collects logs from **Event Forwarding Data Sources** listed below:

*  Runtime Policy Events
*  Activity Audit
*  Audit Tap

## トラブルシューティング

* If you see **Permission denied** error while port binding in agent logs, please follow the below instructions:

   1. Binding to a port number under 1024 requires elevated permissions. Follow the instructions below to set this up.

      - Grant access to port using the setcap command:

         ```
         sudo setcap CAP_NET_BIND_SERVICE=+ep /opt/datadog-agent/bin/agent/agent
         ```

      - Verify the setup is correct by running the getcap command:

         ```
         sudo getcap /opt/datadog-agent/bin/agent/agent
         ```
         With the expected output:

         ```
         /opt/datadog-agent/bin/agent/agent = cap_net_bind_service+ep
         ```
         **Note**: Re-run this setcap command every time you upgrade the Agent.

   2. [Restart the Agent][3].

* Make sure that traffic should be bypassed from the configured port if the firewall is enabled.

* If you see **Port <PORT-NO\> Already in Use** error please follow the below instructions (Example given below is for PORT-NO = 514):

    * On systems with Syslog, if the Agent is listening for Sysdig logs on port 514, the following error can appear in the Agent logs: **Can't start UDP forwarder on port 514: listen udp :514: bind: address already in use**.

    * This is happening because by default, Syslog is listening on port 514. To resolve this error, Syslog can be disabled, or the Agent can listen on the available port, which is not occupied by other services. 

## Support

サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから Crest Data にお問い合わせください。

- Support Email: [datadog.integrations@crestdata.ai][2]
- Sales Email: [datadog-sales@crestdata.ai][7]
- Website: [crestdata.ai][1]
- FAQ: [Crest Data Datadog Marketplace Integrations FAQ][11]


[1]: https://www.crestdata.ai/
[2]: mailto:datadog.integrations@crestdata.ai
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[4]: https://docs.sysdig.com/en/docs/sysdig-secure/secure-events/event-forwarding/forwarding-to-syslog/#configure-syslog-event-forwarding
[5]: https://docs.sysdig.com/en/docs/administration/administration-settings/certificates-management/
[6]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[7]: mailto:datadog-sales@crestdata.ai
[8]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/?tab=agentv6v7
[9]: https://docs.crestdata.ai/datadog-integrations-readme/Sysdig.pdf
[10]: https://docs.datadoghq.com/agent/?tab=Linux
[11]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-sysdig" target="_blank">Click Here</a> to purchase this application.
