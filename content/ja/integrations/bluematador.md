---
app_id: blue-matador
app_uuid: b1cfb279-ab1a-4f63-a04f-9c6508d06588
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: bluematador.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10071
    source_type_name: Blue Matador
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Blue Matador
  sales_email: support@bluematador.com
  support_email: support@bluematador.com
categories:
- alerting
- automation
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/bluematador/README.md
display_on_public_website: true
draft: false
git_integration_title: bluematador
integration_id: blue-matador
integration_title: Blue Matador
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: bluematador
public_title: Blue Matador
short_description: Blue Matador automatically sets up and dynamically maintains hundreds
  of alerts
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Alerting
  - Category::Automation
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Blue Matador automatically sets up and dynamically maintains hundreds
    of alerts
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Blue Matador
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

Blue Matador's Datadog integration allows you to send Blue Matador events to the event stream in Datadog.

![eventstream_from_blue_matador][1]

You can use it to enhance your existing dashboards or to correlate with metrics you're collecting in Datadog.

![dashboard][2]

For a full list of events and metrics that Blue Matador monitors and that you can import into Datadog, see their [monitors page][3].

## セットアップ

To get Blue Matador events into Datadog, use a [Datadog API key][4] to create a new notification method in Blue Matador.

**Note**: Already existing events are not imported into Datadog, but new events appear as they occur.

## 収集データ

### メトリクス

The Blue Matador integration does not include any metrics.

### イベント

All events are sent to the Datadog event stream.

### サービスチェック

The Blue Matador integration does not include any service checks.

## トラブルシューティング

Need help? Contact the [maintainer][5] of this integration.

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/bluematador/images/eventstream.png
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/bluematador/images/dashboard.png
[3]: https://www.bluematador.com/monitored-events
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: https://github.com/DataDog/integrations-extras/blob/master/bluematador/manifest.json