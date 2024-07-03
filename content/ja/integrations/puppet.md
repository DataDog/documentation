---
categories:
- provisioning
- configuration & deployment
custom_kind: インテグレーション
dependencies: []
description: Puppet の実行を追跡。失敗、成功、大きな変更を把握。
doc_link: https://docs.datadoghq.com/integrations/puppet/
draft: false
git_integration_title: puppet
has_logo: true
integration_id: puppet
integration_title: Puppet
integration_version: ''
is_public: true
manifest_version: '1.0'
name: puppet
public_title: Datadog-Puppet Integration
short_description: 'Track Puppet runs: know when they fail, succeed, or make big changes.'
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Connect Puppet to Datadog in order to:

- Get real-time reports on Puppet Agent runs.
- Track key Puppet performance metrics across all your servers.
- Quickly identify and discuss failed Puppet runs with your team

## セットアップ

### インストール

To install the Datadog Agent with Puppet, see the [Datadog Puppet Agent repository][1] on GitHub.

## 収集データ

### メトリクス
{{< get-metrics-from-git "puppet" >}}


### イベント

The Puppet integration includes status events for failure, success, changed, and unchanged resources.

### サービスチェック

The Puppet integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][3].

[1]: https://github.com/datadog/puppet-datadog-agent
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/puppet/puppet_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/