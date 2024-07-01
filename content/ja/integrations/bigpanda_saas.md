---
"algolia":
  "subcategory": Marketplace Integrations
"app_id": "bigpanda-bigpanda"
"app_uuid": "98cf782f-3d6c-4ea8-8e7b-353da5623794"
"assets":
  "integration":
    "auto_install": false
    "configuration": {}
    "events":
      "creates_events": false
    "metrics":
      "check": []
      "metadata_path": metadata.csv
      "prefix": datadog.marketplace.bigpanda.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10163"
    "source_type_name": BigPanda SaaS
"author":
  "homepage": "https://bigpanda.io"
  "name": BigPanda
  "sales_email": ddogmarketplace@bigpanda.io
  "support_email": support@bigpanda.io
  "vendor_id": bigpanda
"categories":
- alerting
- automation
- incidents
- marketplace
- notifications
- ai/ml
"custom_kind": "integration"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "bigpanda_saas"
"integration_id": "bigpanda-bigpanda"
"integration_title": "BigPanda SaaS Platform"
"integration_version": ""
"is_public": true
"legal_terms":
  "eula": assets/eula.pdf
"manifest_version": "2.0.0"
"name": "bigpanda_saas"
"pricing":
- "billing_type": tag_count
  "includes_assets": true
  "metric": datadog.marketplace.bigpanda.bigpanda
  "product_id": bigpanda
  "short_description": Event Correlation and Automation platform, powered by AIOps
  "tag": node
  "unit_label": Node monitored
  "unit_price": !!float "9.0"
"public_title": "BigPanda SaaS Platform"
"short_description": "Event Correlation and Automation platform, powered by AIOps"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Alerting"
  - "Category::Automation"
  - "Category::Incidents"
  - "Category::Marketplace"
  - "Category::Notifications"
  - "Category::AI/ML"
  - "Offering::Software License"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Event Correlation and Automation platform, powered by AIOps
  "media":
  - "caption": BigPanda Incident Feed -- BigPanda’s Feed shows how all incidents in your view and how they evolve over time.
    "image_url": images/b480d24-Incidents_tab_overview_0.1.png
    "media_type": image
  - "caption": BigPanda Analytics -- BigPanda’s Unified Analytics dashboards provide reports and track KPIs so your team can continously improve.
    "image_url": images/61454f7-The_Unified_Analytics_Tab.png
    "media_type": image
  - "caption": BigPanda Architecture -- BigPanda’s Architecture allows for a 360, unified view of all Monitoring, Changes, and Topology data.
    "image_url": images/958addd-arch.png
    "media_type": image
  "overview": "README.md#Overview"
  "resources":
  - "resource_type": blog
    "url": "https://www.datadoghq.com/blog/bigpanda-datadog-marketplace/"
  - "resource_type": documentation
    "url": "https://docs.bigpanda.io/docs/datadog"
  "support": "README.md#Support"
  "title": BigPanda SaaS Platform
  "uninstallation": "README.md#Uninstallation"
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Overview
BigPanda helps businesses prevent and resolve IT outages with our SaaS platform for Event Correlation and Automation, powered by AIOps. BigPanda automatically collects alerts from Datadog, as well as those from any third-party tool, and correlates them into context-rich incidents that help prevent outages and reduce the pain of incident management.

BigPanda has out-of-the-box integrations with all of Datadog’s monitoring products, including [Infrastructure][5], [Log Management][6], and [APM][7]. These integrations enable the ingestion of alerts and rich topology information to drive correlation and root-cause analysis before incidents become outages. BigPanda also ingests CMDB data from ITSM platforms to provide additional alert enrichment, and a full-stack view of the relationship between services in and out of Datadog.

The end result: IT Ops, NOC, DevOps, and SRE teams are able to quickly get a holistic view of their alerts, and understand the root cause of a poorly-performing application, system or service all while significantly reducing alert noise in users’ environments and improving MTTR.

This offering in the Datadog Marketplace provides access to the BigPanda platform. If you are already a BigPanda customer and need to connect your instance to Datadog, [set up the integration][1].

## Support

For support or feature requests, contact BigPanda through the following channel:

- Email: [support@bigpanda.io][2]

### Further Reading

Additional helpful documentation, links, and articles:

- [Streamline incident management with BigPanda's offering in the Datadog Marketplace][3]
- [BigPanda Documentation][4]

[1]: https://app.datadoghq.com/integrations/bigpanda
[2]: mailto:support@bigpanda.io
[3]: https://www.datadoghq.com/blog/bigpanda-datadog-marketplace/
[4]: https://docs.bigpanda.io/docs/datadog
[5]: https://docs.datadoghq.com/infrastructure
[6]: https://docs.datadoghq.com/logs
[7]: https://docs.datadoghq.com/tracing
---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/bigpanda-bigpanda" target="_blank">Click Here</a> to purchase this application.
