---
app_id: steadybit
app_uuid: b1194c36-afd0-47dc-9c0a-11f3ab82f387
assets:
  dashboards:
    Steadybit Chaos Engineering Activity: assets/dashboards/steadybit.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: steadybit.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10321
    source_type_name: Steadybit
author:
  homepage: https://steadybit.com/
  name: Steadybit
  sales_email: sales@steadybit.com
  support_email: support@steadybit.com
categories:
- incidents
- testing
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/steadybit/README.md
display_on_public_website: true
draft: false
git_integration_title: steadybit
integration_id: steadybit
integration_title: Steadybit
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: steadybit
public_title: Steadybit
short_description: Immediately improve your systems' reliability with chaos engineering
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Incidents
  - Category::Testing
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Immediately improve your systems' reliability with chaos engineering
  media:
  - caption: A video showing the Datadog API integration with Steadybit in action.
    image_url: images/steadybit_experiment_editor.png
    media_type: video
    vimeo_id: 782622274
  - caption: Once executed, Datadog monitor statuses are used to control an experiment's
      behavior.
    image_url: images/steadybit_experiment_execution_run_log.png
    media_type: image
  - caption: The status of relevant Datadog monitors is displayed over time within
      Steadybit.
    image_url: images/steadybit_experiment_execution_monitor_status_over_time.png
    media_type: image
  - caption: Steadybit reports events back to Datadog for organization-wide awareness.
    image_url: images/steadybit_events_in_datadog.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Steadybit
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

[Steadybit][1] is a chaos engineering platform allowing you to simulate turbulent conditions in a controlled way, to improve system reliability and guide your organization to better incident management.

The Steadybit integration uses the status of Datadog monitors within chaos engineering experiments. This integration provides your team insight into chaos engineering activity such as the experiment's environment, start and end time, and the result of the experiment through Datadog events.

## セットアップ

The integration between Datadog and Steadybit is done through the [Steadybit Datadog extension][2]. The extension interacts with Datadog's API to gather information about monitors and report events to Datadog.

### Prerequisites

You need a [free or paid Steadybit license][3]. The integration supports Steadybit's SAAS and on-premises offering.

### インストール

Several [installation methods are supported][4]. For the best experience, install the Steadybit Datadog extension through the dedicated Helm chart, as shown below. To learn more about the supported values for `datadog.siteParameter` and `datadog.siteUrl`, see the [Datadog sites][5] page.

```
helm repo add steadybit https://steadybit.github.io/helm-charts
helm repo update

helm upgrade steadybit-extension-datadog \
  --install \
  --wait \
  --timeout 5m0s \
  --create-namespace \
  --namespace steadybit-extension \
  --set datadog.apiKey="{{API_KEY}}" \
  --set datadog.applicationKey="{{APPLICATION_KEY}}" \
  --set datadog.siteParameter="{{SITE_PARAMETER}}" \
  --set datadog.siteUrl="{{SITE_URL}}" \
  steadybit/steadybit-extension-datadog
```

### Validation

Once the Steadybit Datadog extension is running, see a list of Datadog monitors within the *Landscape* tab in Steadybit.

## 収集データ

### メトリクス

Steadybit does not include any metrics.

### サービスチェック

Steadybit does not include any service checks.

### イベント

Steadybit reports events to Datadog indicating chaos engineering activity. All such events carry the `source:steadybit` tag.

## トラブルシューティング

Need help? Contact [Steadybit's support][6].

[1]: https://steadybit.com/?utm_campaign=datadogintegration&utm_source=datadog&utm_medium=integration-readme
[2]: https://hub.steadybit.com/extension/com.steadybit.extension_datadog?utm_campaign=datadogintegration&utm_source=datadog&utm_medium=integration-readme
[3]: https://signup.steadybit.io/?utm_campaign=datadogintegration&utm_source=datadog&utm_medium=integration-readme
[4]: https://hub.steadybit.com/extension/com.steadybit.extension_datadog?utm_campaign=datadogintegration&utm_source=datadog&utm_medium=integration-readme#content-installation
[5]: https://docs.datadoghq.com/ja/getting_started/site/#access-the-datadog-site
[6]: mailto:support@steadybit.com