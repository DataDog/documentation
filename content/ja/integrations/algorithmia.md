---
app_id: algorithmia
app_uuid: 09ef6f74-1555-4082-a69e-b5cf21ec4512
assets:
  dashboards:
    Algorithmia: assets/dashboards/algorithmia.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: algorithmia.duration_milliseconds
      metadata_path: metadata.csv
      prefix: algorithmia.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10128
    source_type_name: Algorithmia
  monitors:
    Algorithmia: assets/monitors/algorithm_duration.json
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Algorithmia
  sales_email: support@algorithmia.io
  support_email: support@algorithmia.io
categories:
- metrics
- ai/ml
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/algorithmia/README.md
display_on_public_website: true
draft: false
git_integration_title: algorithmia
integration_id: algorithmia
integration_title: Algorithmia
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: algorithmia
public_title: Algorithmia
short_description: Monitor metrics for machine learning models in production
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Metrics
  - Category::AI/ML
  - Supported OS::Linux
  configuration: README.md#Setup
  description: Monitor metrics for machine learning models in production
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Algorithmia
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

[Algorithmia][1] is an MLOps platform that includes capabilities for data
scientists, application developers, and IT operators to deploy, manage, govern,
and secure machine learning and other probabilistic models in production.

![Algorithmia Insights in Datadog][2]

Algorithmia Insights is a feature of Algorithmia Enterprise and provides a
metrics pipeline that can be used to instrument, measure, and monitor your
machine learning models. Use cases for monitoring inference-related metrics from
machine learning models include detecting model drift, data drift, model bias,
etc.

This integration allows you to stream operational metrics as well as
user-defined, inference-related metrics from Algorithmia to Kafka to the metrics
API in Datadog.

## セットアップ

1. From your Algorithmia instance, configure Algorithmia Insights to connect to
   a Kafka broker (external to Algorithmia).

2. See the [Algorithmia Integrations repository][3]
   to install, configure, and start the Datadog message forwarding service used
   in this integration, which forwards metrics from a Kafka topic to the
   metrics API in Datadog.


### Validation

1. From Algorithmia, query an algorithm that has Insights enabled.
2. In the Datadog interface, navigate to the **Metrics** summary page.
3. Verify that the metrics from Insights are present in Datadog by filtering for
   `algorithmia`.

### Streaming metrics

This integration streams metrics from Algorithmia when a model that has Insights
enabled is queried. Each log entry includes operational metrics and
inference-related metrics.

The `duration_milliseconds` metric is one of the operational metrics that is
included in the default payload from Algorithmia. To help you get started, this
integration also includes a dashboard and monitor for this default metric.

Additional metrics can include any user-defined, inference-related metrics that
are specified in Algorithmia by the algorithm developer. User-defined metrics
depend on your specific machine learning framework and use case, but might
include values such as prediction probabilities from a regression model in
scikit-learn, confidence scores from an image classifier in TensorFlow, or input
data from incoming API requests. **Note**: The message forwarding script
provided in this integration prefixes user-defined metrics with
`algorithmia.` in Datadog.

## 収集データ

### メトリクス
{{< get-metrics-from-git "algorithmia" >}}


### サービスチェック

The Algorithmia check does not include any service checks.

### イベント

The Algorithmia check does not include any events.

## トラブルシューティング

Need help? Contact [Algorithmia support][5].

[1]: https://algorithmia.com/
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/algorithmia/images/algorithmia-insights-datadog.png
[3]: https://github.com/algorithmiaio/integrations
[4]: https://github.com/DataDog/integrations-extras/blob/master/algorithmia/metadata.csv
[5]: https://algorithmia.com/contact