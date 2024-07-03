---
app_id: vercel
app_uuid: 3ee4a2db-aea9-4663-93a9-d5758f71ba9d
assets:
  dashboards:
    Vercel: assets/dashboards/vercel_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: vercel.requests
      metadata_path: metadata.csv
      prefix: vercel.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10213
    source_type_name: Vercel
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Datadog
  sales_email: help@datadoghq.com
  support_email: help@datadoghq.com
categories:
- cloud
- configuration & deployment
- network
- provisioning
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/vercel/README.md
display_on_public_website: true
draft: false
git_integration_title: vercel
integration_id: vercel
integration_title: Vercel
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: vercel
public_title: Vercel
short_description: Monitor your serverless applications running on Vercel
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Configuration & Deployment
  - Category::Network
  - Category::Provisioning
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Monitor your serverless applications running on Vercel
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Vercel
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


![datadog-integration][1]

## Overview

[Vercel][2] is a deployment and collaboration platform that enables frontend developers to build high-performance websites and applications. Vercel is also the creator of Next.js, a React framework developed in collaboration with engineers at Google and Facebook in 2016. Vercel users can leverage a built-in deployment tool that manages the build and rendering process, as well as a proprietary [Edge Network][3] that caches their sites for fast retrieval. Additionally, Vercel offers [Serverless Functions][4], which allow users to deploy serverless code to accomplish essential backend processes like user authentication, form submission, and database queries.

Integrate Vercel with Datadog to:

- View and parse your application logs using [Datadog's Log Management][5]
- See the number of requests and 4xx/5xx HTTP errors to your serverless applications and APIs running on Vercel
- Monitor frontend performance with [Datadog Synthetics][6]

## セットアップ

- [Configure the Vercel integration][7]

## 収集データ

### メトリクス

The Vercel integration does not include any metrics.

### サービスチェック

The Vercel integration does not include any service checks.

### イベント

The Vercel integration does not include any events.

## トラブルシューティング

Need help? Contact [Datadog support][8].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/vercel/images/logo-full-black.png
[2]: https://vercel.com/
[3]: https://vercel.com/docs/edge-network/overview
[4]: https://vercel.com/docs/serverless-functions/introduction
[5]: /ja/logs/
[6]: /ja/synthetics/
[7]: https://app.datadoghq.com/setup/vercel
[8]: /ja/help/