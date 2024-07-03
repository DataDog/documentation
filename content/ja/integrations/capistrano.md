---
categories:
- automation
- configuration & deployment
- developer tools
- orchestration
- provisioning
custom_kind: インテグレーション
dependencies: []
description: デプロイをキャプチャおよび検索し、主要メトリクスのグラフに重ねて表示。
doc_link: https://docs.datadoghq.com/integrations/capistrano/
draft: false
git_integration_title: capistrano
has_logo: true
integration_id: capistrano
integration_title: Capistrano
integration_version: ''
is_public: true
manifest_version: '1.0'
name: capistrano
public_title: Datadog-Capistrano Integration
short_description: Capture and search for deploys, overlay them onto key metrics graphs.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

[Capistrano][1] is a remote server automation and deployment tool written in Ruby.

Install the Capistrano Datadog integration to:

- Capture and search for deploy events in your event stream
- Overlay deploy events with other metrics within dashboards to identify which deploys affect your application's performance

Once you enable this integration for a given `Capfile`, each Capistrano task that completes is submitted as an event to Datadog. Role information and logging output are submitted too.

## セットアップ

### インストール

Install the `dogapi` Ruby gem:

```shell
sudo gem install dogapi --version ">=1.10.0"
```

### 構成

Add the following to the beginning of any `Capfile` whose tasks you want to send to Datadog:

```text
require "capistrano/datadog"
set :datadog_api_key, "${your_api_key}"
```

### Validation

After you've configured your `Capfile` and have run at least one Capistrano task:

1. Navigate to your [events stream][2].
2. Either enter `sources:capistrano` in the Search bar, or click 'Capistrano' in the FROM list of integrations on the left.
3. Either enter `priority:all` in the Search bar, or click 'All' in the PRIORITY list on the left. Capistrano tasks are submitted with Low priority by default, so they do not display using the default events stream view (Normal priority).

{{< img src="integrations/capistrano/capistranoevents.mp4" video="true" >}}

## 収集データ

### メトリクス

The Capistrano integration does not include any metric.

### イベント

The Capistrano integration does not include any events.

### サービスチェック

The Capistrano integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][3].

[1]: http://capistranorb.com
[2]: https://app.datadoghq.com/event/stream
[3]: https://docs.datadoghq.com/ja/help/