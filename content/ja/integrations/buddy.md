---
app_id: buddy
app_uuid: f9d740e2-31b5-427c-a65b-41984656cc73
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: buddy.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10004
    source_type_name: Buddy
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Buddy
  sales_email: support@buddy.works
  support_email: support@buddy.works
categories:
- automation
- developer tools
- event management
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/buddy/README.md
display_on_public_website: true
draft: false
git_integration_title: buddy
integration_id: buddy
integration_title: Buddy
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: buddy
public_title: Buddy
short_description: One-click delivery automation with working website previews for
  web developers.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Automation
  - Category::Developer Tools
  - Category::Event Management
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: One-click delivery automation with working website previews for web
    developers.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Buddy
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview
Buddy is a continuous integration automation platform that can be used to build, test, and deploy web sites and applications. 

The Buddy integration enables you to:

- Send events about your Buddy deployments to Datadog.
- Correlate deployment details with your Datadog metrics.
- Detect sources of performance spikes in your pipelines.

![datadog-integration][1]

## セットアップ

- In your Datadog account settings go to [Integrations -> APIs][2] and copy the **API Key** token.

- [Sign in to your Buddy account][3] and go to the pipeline with the deployment action that you want to track.

- Click the plus at the end of the pipeline and select **Datadog** in the **Notifications** section.

- Enter the name of your Datadog account and paste the API key that you copied.

- Use [Buddy parameters][4] to define the title of the event and content sent, for example:

```text
# Event title
${'${execution.pipeline.name} execution #${execution.id}'}

# Content
${'${execution.to_revision.revision} - ${execution.to_revision.message}'}
```

- When ready, click **Add action** and run the pipeline. On every successful deployment, Buddy sends an event to Datadog:

![snapshot][5]

## 収集データ

### メトリクス

The Buddy check does not include any metrics.

### イベント

All Buddy deployment events are sent to your [Datadog Event Stream][6]

### サービスチェック

The Buddy check does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][7].

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/buddy/images/datadog-integration.png
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.buddy.works/login
[4]: https://buddy.works/knowledge/deployments/what-parameters-buddy-use
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/buddy/images/snapshot.png
[6]: https://docs.datadoghq.com/ja/events/
[7]: https://docs.datadoghq.com/ja/help/