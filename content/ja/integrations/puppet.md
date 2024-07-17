---
categories:
- provisioning
- configuration & deployment
custom_kind: integration
dependencies: []
description: 'Track Puppet runs: know when they fail, succeed, or make big changes.'
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
public_title: Datadog-Puppet インテグレーション
short_description: Puppet の実行を追跡。失敗、成功、大きな変更を把握。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Puppet を Datadog に接続して、以下のことができます。

- Puppet Agent の実行に関するリアルタイムのレポートを取得できます。
- すべてのサーバーで Puppet のキーパフォーマンスメトリクスを追跡できます。
- 失敗した Puppet の実行をすばやく特定してチームで議論できます。

## Setup

### Installation

Puppet で Datadog Agent をインストールするには、GitHub の [Datadog Puppet Agent リポジトリ][1]を参照してください。

## Data Collected

### Metrics
{{< get-metrics-from-git "puppet" >}}


### Events

Puppet インテグレーションには、失敗、成功、変更された、および変更されていないリソースに関するステータスイベントが含まれます。

### Service Checks

Puppet インテグレーションには、サービスのチェック機能は含まれません。

## Troubleshooting

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://github.com/datadog/puppet-datadog-agent
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/puppet/puppet_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/