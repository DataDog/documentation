---
app_id: rigor
app_uuid: f9ab0c97-235c-4f88-8b92-89eb563e18ba
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: rigor.http.dns_time
      metadata_path: metadata.csv
      prefix: rigor.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10029
    source_type_name: Rigor
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Rigor
  sales_email: support@rigor.com
  support_email: support@rigor.com
categories:
- testing
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/rigor/README.md
display_on_public_website: true
draft: false
git_integration_title: rigor
integration_id: rigor
integration_title: Rigor
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: rigor
public_title: Rigor
short_description: Rigor provides synthetic monitoring and optimization throughout
  dev lifecycle
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Category::Testing
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Rigor provides synthetic monitoring and optimization throughout dev
    lifecycle
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Rigor
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->
## Overview

Rigor provides synthetic monitoring and optimization insights throughout your development lifecycle.

![timeboard][1]

With Rigor, you can collect synthetic, front-end performance metrics and push those metrics into Datadog. You can also push alerts into Datadog as events.

## セットアップ

Rigor has two different integrations with Datadog, a metrics integration and an events integration.

### 構成
#### Metrics collection

As an administrator, click the "Admin Tools" menu in the upper right hand of your screen and select "Integrations".

![admin-menu][2]

Add a new integration, by clicking the "New" button to enable configuration of the integration.

![push-configuration][3]

Add a unique name for this integration and your API key from Datadog. Then choose which tags and metrics you want to send. Some things to remember:

- A normalized version of the check name is included as a default tag.
- For multi-step checks (Real Browser and API Checks), the position of the request that the metrics came from is included.
- Uptime checks include HTTP, Port, and API checks
- Port checks only report the "Response Time" metric
- Not all browsers support all metrics

If you would like Real Browser Checks to report timings from the [User Timings API][4], make sure "Send All User Timings?" is selected. Any marks are reported under the `rigor.real_browser.marks` namespace and measures are reported under the `rigor.real_browser.measures` namespace. **Note**: Selecting this option could send a lot of new series into Datadog, especially if the marks and measures on the site you are testing are dynamically generated.

Once you have configured the integration. You can add to any Real Browser, HTTP, Port, or API check. Just edit the check and go to the "Notifications" tab. Here you can add the integration that you just created.

![add-integration-to-check][5]

#### Events collection

As an administrator, click the "Admin Tools" menu in the upper right hand of your screen and select "Alert Webhooks".

![webhook-menu][6]

Add a new integration, by clicking the "New" button and clicking the Datadog tile.

![webhooks-chooser][7]

Add a unique name for this webhook and make sure to update the triggers with your Datadog API key.

![webhooks-configuration][8]

Once you have configured the integration. You can add to any Real Browser, HTTP, Port, or API check. Just edit the check and go to the "Notifications" tab. Here you can add the webhook that you just created.

![add-webhookto-check][9]

## 収集データ

### メトリクス
{{< get-metrics-from-git "rigor" >}}


### イベント

When a check is configured to alert through a Datadog event, two events types are pushed into Datadog:

- **Failed** - whenever the check fails enough to pass the threshold so that it sends an alert
- **Back online** - whenever the check successfully runs while in an alerting state

![events-example][11]

### サービスチェック

The Rigor integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Rigor support][12].


[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rigor/images/rigor_timeboard_with_metrics.png
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rigor/images/rigor_admin_menu.png
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rigor/images/rigor_integration_configuration.png
[4]: https://developer.mozilla.org/en-US/docs/Web/API/User_Timing_API
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rigor/images/rigor_add_integration_to_check.png
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rigor/images/rigor_webhooks_menu.png
[7]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rigor/images/rigor_webhooks_chooser.png
[8]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rigor/images/rigor_webhooks_configuration.png
[9]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rigor/images/rigor_add_webhook_to_check.png
[10]: https://github.com/DataDog/integrations-extras/blob/master/rigor/metadata.csv
[11]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rigor/images/rigor_events_example.png
[12]: mailto:support@rigor.com