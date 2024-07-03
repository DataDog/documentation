---
algolia:
  subcategory: Marketplace Integrations
app_id: rapdev-msteams
app_uuid: 38da0072-43b5-44e8-a303-1e504bcc0879
assets:
  dashboards:
    MS Teams CQ Call Overview: assets/dashboards/ms_teams_cq_call_overview.json
    MS Teams CQ Lookup Metadata: assets/dashboards/ms_teams_cq_lookup_metadata.json
    MS Teams CQ Lookup Performance Classifiers: assets/dashboards/ms_teams_cq_lookup_performance_classifiers.json
    MS Teams CQ User Devices: assets/dashboards/ms_teams_cq_user_devices.json
    MS Teams CQ User Experience: assets/dashboards/ms_teams_cq_user_experience.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rapdev.msteams.call.duration
      metadata_path: metadata.csv
      prefix: rapdev.msteams.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10297
    source_type_name: RapDev MSTeams
  monitors:
    '[Microsoft Teams] Poor Call Session Audio Performance Qualifier A': assets/monitors/performance_audio_packet_utilization.json
    '[Microsoft Teams] Poor Call Session Audio Performance Qualifier B': assets/monitors/performance_audio_rtt.json
    '[Microsoft Teams] Poor Call Session Audio Performance Qualifier C': assets/monitors/performance_audio_packet_loss.json
    '[Microsoft Teams] Poor Call Session Audio Performance Qualifier D': assets/monitors/performance_audio_average_jitter.json
    '[Microsoft Teams] Poor Call Session Video Performance Qualifier A': assets/monitors/performance_video_frame_loss_percentage.json
    '[Microsoft Teams] Poor Call Session Video Performance Qualifier B': assets/monitors/performance_video_average_frame_rate.json
    '[Microsoft Teams] Poor Call Session Video Performance Qualifier C': assets/monitors/performance_video_fecplr.json
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- collaboration
- marketplace
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_msteams
integration_id: rapdev-msteams
integration_title: Microsoft Teams
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_msteams
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.rapdev.msteams
  product_id: msteams
  short_description: Unit price per meeting participant
  tag: meeting_participant
  unit_label: Meeting Participant
  unit_price: 0.1
public_title: Microsoft Teams
short_description: Monitor Microsoft Teams call quality for users and devices
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Collaboration
  - Category::Marketplace
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Monitor Microsoft Teams call quality for users and devices
  media:
  - caption: Call quality overview
    image_url: images/1.png
    media_type: image
  - caption: Call quality user experience overview
    image_url: images/2.png
    media_type: image
  - caption: Call quality user experience network and audio
    image_url: images/3.png
    media_type: image
  - caption: Call quality user experience audio and video
    image_url: images/4.png
    media_type: image
  - caption: Call quality user devices
    image_url: images/5.png
    media_type: image
  - caption: Performance qualifier lookup table
    image_url: images/6.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Microsoft Teams
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->
## Overview

The RapDev Microsoft Teams integration monitors call quality reports and provides metrics, monitors and dashboards that provide insights into call activity and experience. 

This integration includes 
1. Multiple dashboards
2. Recommended monitors on call quality metrics
3. Metric lookup tables for call metadata and performance qualifiers

The Microsoft Teams integration requires minimum permissions on your Active Directory tenant and is simple to install, enabling your organization to quickly deploy and begin reporting on Microsoft Teams call quality reports.

## Support
For support or feature requests please contact RapDev.io through the following channels: 

 - Email: support@rapdev.io 
 - Chat: [rapdev.io](https://www.rapdev.io/#Get-in-touch)
 - Phone: 855-857-0222 

---

Made with ❤️ in Boston

*This isn't the integration you're looking for? Missing a critical feature for your organization? Drop us a [note](mailto:support@rapdev.io) and we'll build it!!*


---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/rapdev-msteams" target="_blank">Click Here</a> to purchase this application.