---
app_id: auth0
app_uuid: 0c91d12e-f01e-47d9-8a07-4dba1cde4b67
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: auth0.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10098
    source_type_name: Auth0
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Auth0
  sales_email: help@datadoghq.com
  support_email: help@datadoghq.com
categories:
- incidents
- log collection
- security
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/auth0/README.md
display_on_public_website: true
draft: false
git_integration_title: auth0
integration_id: auth0
integration_title: Auth0
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: auth0
public_title: Auth0
short_description: View and analyze your Auth0 events.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Incidents
  - Category::Log Collection
  - Category::Security
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: View and analyze your Auth0 events.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Auth0
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

Auth0 is an identity platform for development teams which provides developers and enterprises with the building blocks they need to secure their applications.


This integration leverages Auth0's Log Streaming to send logs directly to Datadog. The logs are sent in real time as they are generated in Auth0, giving customers up-to-date information about their Auth0 tenant. One of the key benefits of using this integration is the ability to collect and visualize data in order to identify trends. Engineering teams use it to visualize error rates and traffic data. Security teams use it to visualize authorization traffic and set up alerts for high-risk actions.

### Key use cases

#### Correlate activity with identity data to surface trends

Identity data provides crucial insight into who performed what activity. This allows teams to better understand user behavior across their system.

#### Decisions about system architecture and development

By tracking identity trends over time, teams can make informed decisions about product development and system architecture. As an example teams might prioritize development based on tracking peak login times, authentication activity and geographical activity.

####  Quickly respond to performance and security incidents

Identity information can be used to quickly identify security and performance incidents. For instance, massive spikes in unsuccessful login attempts could indicate an ongoing credential stuffing attack, one of the most common threats targeting identity systems.

By configuring thresholds, security teams can set up alerts to notify them when suspicious events take place, allowing them to more quickly respond to security incidents.

## セットアップ

All configuration happens on the [Auth0 Dashboard][1]. 

1. Log in to the [Auth0 Dashboard][1].
2. Navigate to **Logs** > **Streams**.
3. Click **+ Create Stream**.
4. Select Datadog and enter a unique name for your new Datadog Event Stream.
5. On the next screen, provide the following settings for your Datadog Event Stream:


    | Setting          | Description                                                |
    | ---------------- | ---------------------------------------------------------- |
    | `API Key`        | Enter your [Datadog API key][2].                           |
    | `Region`           | Your [Datadog site][3]. For example, `EU` for app.datadoghq.eu, `US1` for app.datadoghq.com, and `US3` for us3.datadoghq.com. |


6. Click Save.

When Auth0 writes the next tenant log, you receive a copy of that log event in Datadog with the source and service set to `auth0`.

### Validation

View logs in Datadog:

1. Navigate to **Logs** > **Livetail**.
2. See Auth0 logs by setting `source:auth0`.

## 収集データ

### Log collection

Auth0 logs are collected and sent to Datadog. The types of logs that could be returned are outlined in the [Log Event Type Codes][4].

### メトリクス

auth0 does not include any metrics.

### サービスチェック

auth0 does not include any service checks.

### イベント

auth0 does not include any events.

## トラブルシューティング

Need help? Contact [Datadog support][5].
Read more about this integration in our [blog post][6].

[1]: https://manage.auth0.com
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://docs.datadoghq.com/ja/getting_started/site/
[4]: https://auth0.com/docs/logs/references/log-event-type-codes
[5]: https://docs.datadoghq.com/ja/help/
[6]: https://www.datadoghq.com/blog/monitor-auth0-with-datadog/