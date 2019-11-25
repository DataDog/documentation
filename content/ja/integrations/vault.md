---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - security
  - 構成 & デプロイ
  - aws
  - google cloud
  - azure
creates_events: true
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/vault/README.md'
display_name: Vault
git_integration_title: vault
guid: d65af827-c818-44ce-9ec3-cd7ead3ac4ce
integration_id: vault
integration_title: Vault
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: vault.
metric_to_check: vault.is_leader
name: vault
public_title: Datadog-Vault インテグレーション
short_description: Vault は機密情報管理サービスアプリケーション
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

このチェックは、[Vault][1] クラスターの健全性とリーダーの変更を監視します。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

Vault チェックは [Datadog Agent][3] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### コンフィグレーション

1. vault のパフォーマンスデータの収集を開始するには、[Agent の構成ディレクトリ][4]のルートにある `conf.d/` フォルダーの `vault.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル vault.d/conf.yaml][5] を参照してください。

2. [Agent を再起動します][6]。

### 検証

[Agent の status サブコマンドを実行][7]し、Checks セクションで `vault` を探します。

## 収集データ
### メトリクス
{{< get-metrics-from-git "vault" >}}


### イベント

`vault.leader_change`:
このイベントは、クラスターリーダーが変更されると発生します。

### サービスのチェック

`vault.can_connect`:
Agent が Vault に接続できない場合は、CRITICAL を返します。それ以外の場合は、OK を返します。

`vault.unsealed`:
Vault がシールされている場合は、CRITICAL を返します。それ以外の場合は、OK を返します。

`vault.initialized`:
Vault がまだ初期化されていない場合は、CRITICAL を返します。それ以外の場合は、OK を返します。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][9]までお問合せください。

## その他の参考資料
お役に立つドキュメント、リンクや記事:

* [Datadog を使用した HashiCorp Vault の監視][10]

[1]: https://www.vaultproject.io
[2]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-core/blob/master/vault/datadog_checks/vault/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/vault/metadata.csv
[9]: https://docs.datadoghq.com/ja/help
[10]: https://www.datadoghq.com/blog/monitor-hashicorp-vault-with-datadog


{{< get-dependencies >}}