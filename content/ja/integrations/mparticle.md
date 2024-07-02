---
"categories":
- "mobile"
"custom_kind": "インテグレーション"
"dependencies": []
"description": "アプリのクラッシュの監視と詳細なランタイムパフォーマンスメトリクスの収集。"
"doc_link": "https://docs.datadoghq.com/integrations/mparticle/"
"draft": false
"git_integration_title": "mparticle"
"has_logo": true
"integration_id": "mparticle"
"integration_title": "mParticle"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "mparticle"
"public_title": "Datadog-mParticle Integration"
"short_description": "Monitor app crashes and collect detailed runtime performance metrics."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

mParticle lets you track detailed run-time performance data on your mobile apps. The mParticle SDK automatically collects detailed run-time performance data such as CPU load, memory usage, and battery level. Connect mParticle to Datadog and see the following information in real-time in your Datadog dashboard:

- Crash Reports
- 3rd Party Network Performance Data
- Active Session Details
- Device CPU, Memory, and Battery Utilization

For more information about mParticle, check out [the blog][1] and [their docs][2].

## セットアップ

### インストール

1. Log in to your [mParticle account][3].
2. Navigate to the Services Page by clicking on the paper-airplane icon on the left-hand navigation bar.
3. Click on the Datadog tile to display the settings panel for the Datadog integration.
4. Enter your [Datadog API key][4] into the settings panel and click Save.
5. Toggle the Status to on to forward data to Datadog.

## 収集データ

### メトリクス

See the [mParticle documentation][2] for metrics available with this integration.

### イベント

The mParticle integration does not include any events.

### サービスチェック

The mParticle integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][5].

[1]: https://www.datadoghq.com/blog/track-detailed-run-time-performance-data-with-mparticle-and-datadog/
[2]: https://docs.mparticle.com/integrations/datadog/event/
[3]: https://app.mparticle.com/login?return=
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: https://docs.datadoghq.com/help/

