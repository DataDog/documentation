---
app_id: reboot-required
app_uuid: 673a1136-68ad-46f4-ba6f-4203df10db6a
assets:
  integration:
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: 再起動が必要です。
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Reboot required
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Community
  sales_email: support@krugerheavyindustries.com
  support_email: support@krugerheavyindustries.com
categories:
- developer tools
- os & system
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/reboot_required/README.md
display_on_public_website: true
draft: false
git_integration_title: reboot_required
integration_id: reboot-required
integration_title: Reboot Required
integration_version: 1.0.0
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: reboot_required
public_title: Reboot Required
short_description: ソフトウェアアップデートの後に再起動が必要なシステムを監視
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Developer Tools
  - Category::OS とシステム
  - Supported OS::Linux
  configuration: README.md#Setup
  description: ソフトウェアアップデートの後に再起動が必要なシステムを監視
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Reboot Required
---



## 概要

パッケージを自動インストールするように構成された Linux システムが、自動的に再起動するようには構成されていない場合があります (手動で再起動時間を設定する方がよい場合もあります)。このチェックは、再起動が適切なタイミングで実行されない場合に、アラートを発行できるようにします。

## セットアップ

Reboot Required チェックは [Datadog Agent][1] パッケージに含まれていないため、お客様自身でインストールする必要があります。

### インストール

Agent v7.21 / v6.21 以降の場合は、下記の手順に従い Reboot Required チェックをホストにインストールします。Docker Agent または 上記バージョン以前の Agent でインストールする場合は、[コミュニティインテグレーションの使用][2]をご参照ください。

1. 以下のコマンドを実行して、Agent インテグレーションをインストールします。

   ```shell
   datadog-agent integration install -t datadog-reboot_required==<INTEGRATION_VERSION>
   ```

2. コアの[インテグレーション][3]と同様にインテグレーションを構成します。

### コンフィギュレーション

1. [Agent のコンフィギュレーションディレクトリ][4]のルートにある `conf.d/` フォルダーの `reboot_required.d/conf.yaml` を編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル reboot_required.d/conf.yaml][5] を参照してください。

2. エージェントの dd-agent (Datadog Agent を実行するユーザー) が書き込み可能なディレクトリを、このチェックで使用するために作成します。デフォルトの `/var/run/dd-agent` が理想的です。以下のスニペットで十分です。

   ```shell
   sudo mkdir /var/run/dd-agent
   sudo chown dd-agent:dd-agent /var/run/dd-agent
   ```

3. [Agent を再起動します][6]。

### 検証

[Agent の `status` サブコマンドを実行][7]し、Checks セクションの `reboot_required` を探します。

## 収集データ

### メトリクス

メトリクスは収集されません。

### イベント

reboot_required チェックには、イベントは含まれません。

### サービスのチェック
{{< get-service-checks-from-git "reboot_required" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。


[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/
[3]: https://docs.datadoghq.com/ja/getting_started/integrations/
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-extras/blob/master/reboot_required/datadog_checks/reboot_required/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#service-status
[8]: https://github.com/DataDog/integrations-extras/blob/master/reboot_required/assets/service_checks.json
[9]: http://docs.datadoghq.com/help