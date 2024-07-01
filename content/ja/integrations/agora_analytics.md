---
"app_id": "agora-analytics"
"app_uuid": "a752523e-9c3d-458c-a91a-af0c9fae5adc"
"assets":
  "dashboards":
    "Agora Analytics Overview": assets/dashboards/agora_analytics_overview.json
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": false
    "metrics":
      "check":
      - agora.rtc.app_id.online_user
      - agora.rtc.app_id.online_channel
      - agora.rtc.app_id.audio_freeze_rate
      - agora.rtc.app_id.video_freeze_rate
      - agora.rtc.app_id.network_delay_rate
      - agora.rtc.app_id.join_attempt
      - agora.rtc.app_id.join_success_count
      - agora.rtc.app_id.join_success_rate
      - agora.rtc.app_id.join_success_in_5s_rate
      "metadata_path": metadata.csv
      "prefix": agora.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10335"
    "source_type_name": Agora Analytics
"author":
  "homepage": "https://www.agora.io"
  "name": Agora
  "sales_email": sales-us@agora.io
  "support_email": support@agora.io
"categories":
- collaboration
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/agora_analytics/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "agora_analytics"
"integration_id": "agora-analytics"
"integration_title": "Agora Analytics"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "agora_analytics"
"public_title": "Agora Analytics"
"short_description": "View Agora Analytics Collector metrics in Datadog"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Collaboration"
  - "Offering::Integration"
  - "Submitted Data Type::Metrics"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": View Agora Analytics Collector metrics in Datadog
  "media":
  - "caption": Agora Analytics Overview - Dashboard
    "image_url": images/agora_analytics_dashboard.png
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Agora Analytics
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

Agora Analytics tracks and interprets real-time voice and video usage, quality, and performance. Analytics is an extension for Agora's Voice Calling, Video Calling, and Interactive Live Streaming that helps to locate quality issues, find root causes, and fix issues to improve the end-user experience.

This integration sends metrics including usage, quality, and performance data directly to your Datadog account.

## Setup

See the Agora Analytics integration [documentation][1] for details on configuring the Agora Analytics Datadog Connector.

## Data Collected

### Metrics

Agora Analytics emits metrics to Datadog.

### Events

Agora Analytics does not include any events.

### Service Checks

Agora Analytics does not include any service checks.

## Support

Need help? Contact [Agora Support][2].

[1]: https://docs.agora.io/en/agora-analytics/analyze/video-voice-sdk/datadog-integration
[2]: mailto:support@agora.io

