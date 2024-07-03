---
categories:
- Collaboration
- issue tracking
custom_kind: インテグレーション
dependencies: []
description: Datadog イベントストリームでストーリーを参照してコメントを入力。
doc_link: https://docs.datadoghq.com/integrations/pivotal/
draft: false
git_integration_title: pivotal
has_logo: true
integration_id: pivotal
integration_title: Pivotal Tracker
integration_version: ''
is_public: true
manifest_version: '1.0'
name: pivotal
public_title: Datadog-Pivotal Tracker Integration
short_description: See and comment on stories in your Datadog event stream.
team: web-integrations
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

[Pivotal Tracker][1] uses stories to help teams track projects and collaborate throughout different parts of the development cycle, such as building new features, resolving bugs, or addressing technical debt. Connect Pivotal Tracker to Datadog to:

- See and discuss the progress of your stories in the Datadog Events Explorer.
- Correlate and graph story completion with other events and metrics in your system.
- Receive notifications for updates to your stories.

## セットアップ

### インストール

To get Pivotal events in the Datadog Events Explorer, enter the API token generated from your Pivotal [profile page][2].

{{< img src="integrations/pivotal/pivotal_token.png" alt="pivotal token" popup="true">}}

## 収集データ

### メトリクス

The Pivotal Tracker integration does not include any metric.

### イベント

The Pivotal Tracker integration does not include any events.

### サービスチェック

The Pivotal Tracker integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][3].

[1]: https://www.pivotaltracker.com/features
[2]: https://www.pivotaltracker.com/signin
[3]: https://docs.datadoghq.com/ja/help/