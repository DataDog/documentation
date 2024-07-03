---
app_id: blink
app_uuid: f2bd43a7-bbc5-4f69-89b7-437afbbff9fd
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10316
    source_type_name: Blink
  oauth: assets/oauth_clients.json
author:
  homepage: https://www.blinkops.com/
  name: Blink
  sales_email: support@blinkops.com
  support_email: support@blinkops.com
categories:
- automation
- cloud
- incidents
- notifications
- orchestration
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/blink/README.md
display_on_public_website: true
draft: false
git_integration_title: blink
integration_id: blink
integration_title: Blink
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: blink
public_title: Blink
short_description: Blink is a no-code automation platform for security and infrastructure.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Automation
  - Category::Cloud
  - Category::Incidents
  - Category::Notifications
  - Category::Orchestration
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Blink is a no-code automation platform for security and infrastructure.
  media:
  - caption: Automatically create and update Datadog incidents using interactive Blink
      workflows.
    image_url: images/incident.png
    media_type: image
  - caption: Quickly reference a list of all active Datadog incidents from within
      your Blink automation.
    image_url: images/list-incidents.png
    media_type: image
  - caption: Connect the Blink integration to begin creating automations that take
      action in response to Datadog incidents.
    image_url: images/connection-creation.png
    media_type: image
  - caption: An automatically scheduled Blink Automation creating incidents in Datadog.
    image_url: images/new-incident.png
    media_type: image
  overview: README.md#Overview
  support: support@blinkops.com
  title: Blink
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

[Blink][1] is a low-code/no-code (LCNC) platform that enables automated incident response, cloud-native operations, and security operations workflows. Blink transforms manual tasks into interactive automations backed by the security and reliability of a cloud-native platform. Every script or ticket becomes a fully-managed automation.

The user interface and [automation library][2] come with premade Datadog-based automations and use-cases. Blink helps you achieve better cloud efficiency and more competitive SLA's, with fewer operational bottlenecks.

This out-of-the-box integration enables you to:

- Trigger event-based Blink automations using Datadog incidents.
- Create and update Datadog incidents automatically from within Blink.
- View incidents or events from the Datadog Events Explorer in Blink.
- Automatically enrich and remediate Datadog incidents using Blink automations.

For more information about Blink, see the [Blink documentation][3].

## セットアップ

Visit [our documentation][4] for details on how to connect your Datadog workspace to Blink.

## Uninstallation

To uninstall the integration, simply delete the corresponding Datadog connection in your Blink workspace.

Once deleted, any previous authorizations or access tokens are revoked.

## 収集データ

### イベント

This integration sends events and incidents to Datadog where you can search and update any relevant incidents within Blink. 

### モニター

You can view, modify, and create Datadog monitors in Blink.

### メトリクス

Blink does not include any metrics, however you can query and list metrics from your Datadog environment for use in Blink automations.

## トラブルシューティング

Need help? Contact [Blink support][5].

[1]: https://www.blinkops.com/
[2]: https://library.blinkops.com/automations?vendors=Datadog
[3]: https://www.docs.blinkops.com/docs/integrations/datadog/actions
[4]: https://www.docs.blinkops.com/docs/integrations/datadog
[5]: mailto:support@blinkops.com