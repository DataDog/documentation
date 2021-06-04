---
categories:
  - provisioning
  - configuration & deployment
ddtype: チェック
dependencies: []
description: Puppet の実行を追跡。失敗、成功、大きな変更を把握。
doc_link: 'https://docs.datadoghq.com/integrations/puppet/'
draft: false
git_integration_title: puppet
has_logo: true
integration_id: puppet
integration_title: Puppet
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: puppet
public_title: Datadog-Puppet インテグレーション
short_description: Puppet の実行を追跡。失敗、成功、大きな変更を把握。
version: '1.0'
---
## 概要

Puppet を Datadog に接続して、以下のことができます。

- Puppet Agent の実行に関するリアルタイムのレポートを取得できます。
- すべてのサーバーで Puppet のキーパフォーマンスメトリクスを追跡できます。
- 失敗した Puppet の実行をすばやく特定してチームで議論できます。

## セットアップ

### インストール

Puppet で Datadog Agent をインストールするには、GitHub の [Datadog Puppet Agent リポジトリ][1]を参照してください。

## 収集データ

### メトリクス
{{< get-metrics-from-git "puppet" >}}


### イベント

Puppet インテグレーションには、失敗、成功、変更された、および変更されていないリソースに関するステータスイベントが含まれます。

### サービスのチェック

Puppet インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://github.com/datadog/puppet-datadog-agent
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/puppet/puppet_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/