---
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - os & system
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/reboot_required/README.md'
display_name: Reboot required
draft: false
git_integration_title: reboot_required
guid: e7eed0e7-0acd-47c9-b684-3190828517ce
integration_id: reboot-required
integration_title: Reboot Required
is_public: true
kind: インテグレーション
maintainer: support@krugerheavyindustries.com
manifest_version: 1.0.0
name: reboot_required
public_title: Datadog-Reboot Required インテグレーション
short_description: ソフトウェアアップデートの後に再起動が必要なシステムを監視
support: contrib
supported_os:
  - linux
---
## 概要

パッケージを自動インストールするように構成された Linux システムが、自動的に再起動するようには構成されていない場合があります (手動で再起動時間を設定する方がよい場合もあります)。このチェックは、再起動が適切なタイミングで実行されない場合に、アラートを発行できるようにします。

## セットアップ

### インストール

Agent v6.8 以降を使用している場合は、以下の手順に従って、ホストに Reboot Required チェックをインストールしてください。[バージョン 6.8 以前の Agent][2] または [Docker Agent][3] でチェックをインストールする場合は、[コミュニティインテグレーションのインストール][1]に関する Agent のガイドを参照してください。

1. [Datadog Agent をダウンロードして起動][4]します。
2. 次のコマンドを実行して、Agent でインテグレーション Wheel をインストールします。

   ```shell
   datadog-agent integration install -t datadog-reboot_required==<INTEGRATION_VERSION>
   ```

3. [他のパッケージ化されたインテグレーション][5]と同様にインテグレーションを構成します。

### コンフィギュレーション

1. [Agent のコンフィギュレーションディレクトリ][6]のルートにある `conf.d/` フォルダーの `reboot_required.d/conf.yaml` を編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル reboot_required.d/conf.yaml][7] を参照してください。

2. エージェントの dd-agent (Datadog Agent を実行するユーザー) が書き込み可能なディレクトリを、このチェックで使用するために作成します。デフォルトの `/var/run/dd-agent` が理想的です。以下のスニペットで十分です。

   ```shell
   sudo mkdir /var/run/dd-agent
   sudo chown dd-agent:dd-agent /var/run/dd-agent
   ```

3. [Agent を再起動します][8]。

### 検証

[Agent の `status` サブコマンドを実行][9]し、Checks セクションの `reboot_required` を探します。

## 収集データ

### メトリクス

メトリクスは収集されません。

### イベント

reboot_required チェックには、イベントは含まれません。

### サービスのチェック
{{< get-service-checks-from-git "reboot_required" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][11]までお問合せください。


[1]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/
[2]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[3]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[4]: https://app.datadoghq.com/account/settings#agent
[5]: https://docs.datadoghq.com/ja/getting_started/integrations/
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[7]: https://github.com/DataDog/integrations-extras/blob/master/reboot_required/datadog_checks/reboot_required/data/conf.yaml.example
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#service-status
[10]: https://github.com/DataDog/integrations-extras/blob/master/reboot_required/assets/service_checks.json
[11]: http://docs.datadoghq.com/help