---
categories:
- notifications
custom_kind: インテグレーション
dependencies: []
description: 複数のアプリケーションのエラー率を一元的に追跡。
doc_link: https://docs.datadoghq.com/integrations/bugsnag/
draft: false
git_integration_title: bugsnag
has_logo: true
integration_id: bugsnag
integration_title: Bugsnag
integration_version: ''
is_public: true
manifest_version: '1.0'
name: bugsnag
public_title: Datadog-Bugsnag Integration
short_description: Centrally track error rates across your applications as they rise
  and fall.
team: web-integrations
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Bugsnag provides software teams with an automated crash detection platform for their web and mobile applications. Bugsnag automatically captures and alerts you of errors as they happen. Integrate Datadog with Bugsnag to send error notifications to your Datadog event stream.

With this integration:

- Get a summary of the error in your Datadog event stream
- Get notified when a project has a spike in error rates
- Filter notifications by severity and release stage

## セットアップ

### インストール

No installation is required.

### 構成

To integrate Bugsnag with Datadog:

1. Go to **Settings** in [Bugsnag][1] for the project you would like to configure to send notifications to Datadog.
2. Select **Team Notifications** and then **Datadog**.
3. Customize the notifications seen in Datadog by selecting error notification triggers.
   {{< img src="integrations/bugsnag/bugsnag_1.png" alt="bugsnag_notification_setting" popup="true">}}

4. Apply custom filters to your notification triggers to see errors from specific release stages and severities.
   {{< img src="integrations/bugsnag/bugsnag_2.png" alt="bugsnag_filters_setting" popup="true">}}

5. Enter your Datadog API key.
6. Select **Test Notification** to test the configuration. A test error from Bugsnag should appear in Datadog.
7. Save your settings.
8. Add more streams from the same project to see error events based on a different set of notification criteria.

## 収集データ

### メトリクス

The Bugsnag integration does not include metrics.

### イベント

The Bugsnag integration pushes configured Bugsnag errors and alerts to your Datadog event stream.

### サービスチェック

The Bugsnag integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][2].

[1]: https://bugsnag.com
[2]: https://docs.datadoghq.com/ja/help/