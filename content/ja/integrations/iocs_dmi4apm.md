---
"algolia":
  "subcategory": Marketplace Integrations
"app_id": "iocs-dmi4apm"
"app_uuid": "29b4a34d-e40d-4975-ba55-4fc019685959"
"assets":
  "integration":
    "auto_install": false
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": iocs_dmi4apm.ioconnect.dmi4apm.agent
      "metadata_path": metadata.csv
      "prefix": iocs_dmi4apm.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "9762172"
    "source_type_name": iocs_dmi4apm
"author":
  "homepage": "https://www.ioconnectservices.com/"
  "name": IO Connect Services
  "sales_email": dmi@ioconnectservices.com
  "support_email": support_ddp@ioconnectservices.com
  "vendor_id": ioconnect
"categories":
- cloud
- marketplace
- developer tools
"custom_kind": "インテグレーション"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "iocs_dmi4apm"
"integration_id": "iocs-dmi4apm"
"integration_title": "Mule®  for APM"
"integration_version": ""
"is_public": true
"legal_terms":
  "eula": assets/eula.pdf
"manifest_version": "2.0.0"
"name": "iocs_dmi4apm"
"pricing":
- "billing_type": tag_count
  "includes_assets": false
  "metric": datadog.marketplace.ioconnect.dmi4apm.agent
  "product_id": dmi4apm
  "short_description": Priced per each host
  "tag": hosts-unmute-a-host
  "unit_label": host
  "unit_price": !!int "50"
"public_title": "Mule® Integration for APM"
"short_description": "Datadog MuleSoft Integration for Application Performance Monitoring"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Cloud"
  - "Category::Marketplace"
  - "Category::Developer Tools"
  - "Offering::Integration"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  - "Submitted Data Type::Traces"
  "configuration": "README.md#Setup"
  "description": Datadog MuleSoft Integration for Application Performance Monitoring
  "media":
  - "caption": "DMI4APM: Traces logs"
    "image_url": images/dmi_apm_logs.png
    "media_type": image
  - "caption": "DMI4APM: Trace details"
    "image_url": images/dmi_apm_trace.png
    "media_type": image
  - "caption": "DMI4APM: Traces list"
    "image_url": images/dmi_apm_traces.png
    "media_type": image
  - "caption": "DMI4APM: Distributed span"
    "image_url": images/dmi_distributed_span.png
    "media_type": image
  - "caption": "DMI4APM: Distributed span trace"
    "image_url": images/dmi_distributed_trace.png
    "media_type": image
  - "caption": "DMI4APM: Span  list"
    "image_url": images/dmi_distributed.png
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Mule® Integration for APM
  "uninstallation": "README.md#Uninstallation"
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要
MuleSoft is a software company specializing in integration and API management solutions. Their main product, Anypoint Platform, is an integration platform that enables developers to connect applications, data, and devices across on-premises and cloud environments.

This integration captures APM traces from MuleSoft applications and provides insights about application performance and issues. APM traces allow developers and operations teams to gain deep visibility into the performance of these integration and identify bottlenecks, errors, and performance degradation in real time.

### **Datadog Mule 4 コネクタを使用して Mule アプリケーションをインスツルメントします**


Use the Datadog Connector for Mule 4 with Datadog APM to gain visibility by using out-of-the-box performance dashboards.

スパンを使用して、フロー内の操作のパフォーマンスを必要に応じて詳細に測定します。

また、トランザクション内で生成されたログを 1 つのトレースに関連付けて、パフォーマンスの最適化またはトラブルシューティングの範囲を絞り込みます。


## サポート

For support or feature requests, contact IO Connect Services Support through the following channels:

- Email: [support_ddp@ioconnectservices.com][2]

[1]: https://app.datadoghq.com/account/settings#agent/overview
[2]: mailto:support_ddp@ioconnectservices.com
[3]: https://docs.datadoghq.com/agent/autodiscovery/integrations
[4]: https://docs.datadoghq.com/agent/guide/agent-commands/#restart-the-agent
[5]: https://docs.datadoghq.com/agent/guide/agent-commands/?tab=agentv6v7#agent-information
---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/iocs-dmi4apm" target="_blank">Click Here</a> to purchase this application.
