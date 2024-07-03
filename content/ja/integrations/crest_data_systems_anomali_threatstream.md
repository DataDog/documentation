---
algolia:
  subcategory: Marketplace Integrations
app_id: crest-data-systems-anomali-threatstream
app_uuid: 40102d95-f0e5-4028-855d-2a6218913a86
assets:
  dashboards:
    Anomali ThreatStream - Incidents: assets/dashboards/crest_data_systems_anomali_threatstream_incidents.json
    Anomali ThreatStream - Observables: assets/dashboards/crest_data_systems_anomali_threatstream_observables.json
    Anomali ThreatStream - Overview: assets/dashboards/crest_data_systems_anomali_threatstream_overview.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: cds.anomali.threatstream.observables.confidence
      metadata_path: metadata.csv
      prefix: cds.anomali.threatstream
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10375
    source_type_name: crest_data_systems_anomali_threatstream
author:
  homepage: https://www.crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- marketplace
- data stores
- alerting
- event management
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_anomali_threatstream
integration_id: crest-data-systems-anomali-threatstream
integration_title: Anomali ThreatStream
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_anomali_threatstream
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: anomali-threatstream
  short_description: Flat fee per month for Anomali ThreatStream integration.
  unit_price: 495.0
public_title: Anomali ThreatStream
short_description: Monitor Anomali ThreatStream Observables & Incident ThreatModel
  events
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Marketplace
  - Category::Data Stores
  - Category::Alerting
  - Category::Event Management
  - Offering::Integration
  - Submitted Data Type::Metrics
  - Submitted Data Type::Events
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Monitor Anomali ThreatStream Observables & Incident ThreatModel events
  media:
  - caption: Anomali ThreatStream - Overview
    image_url: images/crest_data_systems_anomali_threatstream_overview.png
    media_type: image
  - caption: Anomali ThreatStream - Observables - 1
    image_url: images/crest_data_systems_anomali_threatstream_observables_1.png
    media_type: image
  - caption: Anomali ThreatStream - Observables - 2
    image_url: images/crest_data_systems_anomali_threatstream_observables_2.png
    media_type: image
  - caption: Anomali ThreatStream - Incidents
    image_url: images/crest_data_systems_anomali_threatstream_incidents.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Anomali ThreatStream
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Overview

Anomali ThreatStream's threat intelligence management automates the collection and processing of raw data, filters out the noise, and transforms it into relevant, actionable threat intelligence for security teams.

Anomali ThreatStream supports multiple threat models including Actors, Vulnerabilities, Attack Patterns, Malware, Incidents, and more. Threat modeling is a process by which potential threats, such as structural vulnerabilities or the absence of appropriate safeguards, can be identified, enumerated, and countermeasures are prioritized.

Anomali ThreatStream also has support for Observables generating in the environment. An observable is a piece of technical information that can detect a potential threat. They are derived from all data contained in the Intelligence System (Anomali ThreatStream) but are not always contextualized.

This integration monitors `Observables` triggered in Anomali ThreatStream as well as events generated for the `Incident` Threat Model.

## Support

サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから Crest Data にお問い合わせください。

- Support Email: [datadog.integrations@crestdata.ai][5]
- Sales Email: [datadog-sales@crestdata.ai][6]
- Website: [crestdata.ai][3]
- FAQ: [Crest Data Datadog Marketplace Integrations FAQ][10]

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[3]: https://www.crestdata.ai/
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6v7
[5]: mailto:datadog.integrations@crestdata.ai
[6]: mailto:datadog-sales@crestdata.ai
[7]: https://docs.crestdata.ai/datadog-integrations-readme/Anomali_Threatstream.pdf
[8]: https://docs.datadoghq.com/ja/agent/?tab=Linux
[9]: https://docs.datadoghq.com/ja/account_management/api-app-keys/
[10]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-anomali-threatstream" target="_blank">Click Here</a> to purchase this application.