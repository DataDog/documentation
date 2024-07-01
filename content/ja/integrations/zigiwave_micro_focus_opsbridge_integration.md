---
"algolia":
  "subcategory": Marketplace Integrations
"app_id": "zigiwave-micro-focus-opsbridge-integration"
"app_uuid": "b904a102-65fe-4e4d-b693-e4ab98086277"
"assets":
  "dashboards":
    "ZigiWave Incidents Dashboard": assets/dashboards/ZigiWaveOpsBridge_DataDogIncidentDashboard.json
"author":
  "homepage": "https://zigiwave.com"
  "name": ZigiWave
  "sales_email": info@zigiwave.com
  "support_email": support@zigiwave.com
  "vendor_id": zigiwave
"categories":
- event management
- incidents
- marketplace
- metrics
"custom_kind": "integration"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "zigiwave_micro_focus_opsbridge_integration"
"integration_id": "zigiwave-micro-focus-opsbridge-integration"
"integration_title": "OpsBridge"
"integration_version": ""
"is_public": true
"legal_terms":
  "eula": assets/eula.pdf
"manifest_version": "2.0.0"
"name": "zigiwave_micro_focus_opsbridge_integration"
"pricing":
- "billing_type": flat_fee
  "includes_assets": true
  "product_id": micro-focus-opsbridge-integration
  "short_description": Monthly license for a pair of connected Datadog/MF OpsBridge instances
  "unit_price": !!float "750.0"
"public_title": "OpsBridge"
"short_description": "No-code integration between Datadog and OpsBridge"
"supported_os":
- linux
- windows
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Event Management"
  - "Category::Incidents"
  - "Category::Marketplace"
  - "Category::Metrics"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Submitted Data Type::Metrics"
  - "Submitted Data Type::Events"
  - "Submitted Data Type::Incidents"
  "configuration": "README.md#Setup"
  "description": No-code integration between Datadog and OpsBridge
  "media":
  - "caption": Available Integration Templates With Datadog
    "image_url": images/datadog_market_2.jpg
    "media_type": image
  - "caption": ZigiOps Topology Dashboard
    "image_url": images/datadog_marketplace_dashboard_6.jpg
    "media_type": image
  - "caption": ZigiOps Metrics Dashboard
    "image_url": images/datadog_marketplace_4.jpg
    "media_type": image
  - "caption": ZigiOps integration for transfering incidents to Datadog
    "image_url": images/OpsBridge-DataDog-Incidents.jpg
    "media_type": image
  - "caption": Datadog Incidents Dashboard
    "image_url": images/ddog_mf_integration-dashboard.jpg
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": OpsBridge
  "uninstallation": "README.md#Uninstallation"
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->



## Overview

ZigiOps is the most flexible, no-code integration platform. The ZigiOps product
helps your businesses identify, report, and resolve issues in your IT 
environments faster than ever. Integrate ZigiOps into your software ecosystem to connect to popular enterprise 
software tools for ITSM, ITOM, and DevOps: Jira, ServiceNow, VMware 
vROps, Micro Focus Ops Bridge, BMC, Cherwell, Splunk, and more.

### Datadog – Micro Focus OBM Integration with ZigiOps

With the ZigiWave Datadog - OpsBridge integration, you can extract incidents from OpsBridge and populate them in Datadog. ZigiOps syncs all fields such as the incident summary, detection method, severity, status, and more. This integration is bi-directional so whenever there is an update in either Datadog or OpsBridge, ZigiOps will automatically send that update to the relevant system.


Datadog Autodiscovery finds hosts that are not in
the OpsBridge database but need to be monitored. ZigiOps takes the host 
information and reports it to OpsBridge RTSM, enriching the topology 
information with data from Datadog. The topology is kept up-to-date with 
regular checks by ZigiOps.

ZigiOps collects Datadog events and reports them to OpsBridge as events.
The platform syncs all related host details such as metrics, topology, and more.

ZigiOps collects Datadog metrics and reports them, along with related host information, to the MF Operations 
Connector. These metrics can then be 
accessed by the OpsBridge Performance Perspective and used for 
building dashboards. 

This integration will give your IT Operations team a bird’s eye view of
your OpsBridge infrastructure and help detect issues before they become real 
problems.

### Topology, Metrics, Events, Incidents

ZigiOps offers fully customizable integration templates for four use cases of the Datadog – Micro Focus OBM integration. The templates help users to quickly start to begin seeing data flow. Users can modify data mappings and filters provided by the templates to fit their use case. We currently have these templates available: OpsBridge events - Datadog incidents, Datadog events - OpsBridge events,  Datadog metrics - OBM metrics, and Datadog hosts - OBM topology. If your use case doesn’t fit any of those templates, you can also create your own integration from scratch. Integration consultants will guide you along the way.

## Support

ZigiWave is dedicated to providing the best customer experience 
for our users.  If you are an existing user, you can submit a ticket from 
support.zigiwave.com or email our team at support@zigiwave.com. 

---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/zigiwave-micro-focus-opsbridge-integration" target="_blank">Click Here</a> to purchase this application.
