---
assets:
  dashboards: {}
  monitors: {}
  service_checks: /assets/service_checks.json
categories:
  - os & system
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/reboot_required/README.md'
display_name: Reboot Required
git_integration_title: reboot_required
guid: e7eed0e7-0acd-47c9-b684-3190828517ce
integration_id: reboot-required
integration_title: Reboot Required
is_public: true
kind: integration
maintainer: support@krugerheavyindustries.com
manifest_version: 1.0.0
name: reboot_required
public_title: Datadog-Reboot Required インテグレーション
short_description: ソフトウェアのアップデートの後に再起動が必要なシステムを監視
support: contrib
supported_os:
  - linux
---
## 概要

パッケージを自動インストールするように構成された Linux システムが、自動的に再起動するようには構成されていない場合があります (手動で再起動時間を設定する方がよい場合もあります)。このチェックは、再起動が適切なタイミングで実行されない場合に、アラートを発行できるようにします。

## セットアップ

### インストール

Agent v6.8 以降を使用している場合は、以下の手順に従って、ホストに Reboot Required チェックをインストールしてください。[バージョン 6.8 以前の Agent][2] または [Docker Agent][3] でチェックをインストールする場合は、[コミュニティインテグレーションのインストール][1]に関する Agent のガイドを参照してください。

1. [開発ツールキット][4]をインストールします。
2. integrations-extras リポジトリを複製します。

    ```
    git clone https://github.com/DataDog/integrations-extras.git.
    ```

3. `ddev` 構成を `integrations-extras/` パスで更新します。

    ```
    ddev config set extras ./integrations-extras
    ```

4. `reboot_required` パッケージをビルドします。

    ```
    ddev -e release build reboot_required
    ```

5. [Datadog Agent をダウンロードして起動][5]します。
6. 次のコマンドを実行して、Agent でインテグレーション Wheel をインストールします。

    ```
    datadog-agent integration install -w <PATH_OF_REBOOT_REQUIRED_ARTIFACT_>/<REBOOT_REQUIRED_ARTIFACT_NAME>.whl
    ```

7. [他のパッケージ化されたインテグレーション][6]と同様にインテグレーションを構成します。

### コンフィグレーション

1. [Agent の構成ディレクトリ][7]のルートにある `conf.d/` フォルダーの `reboot_required.d/conf.yaml` ファイルを編集します。
  使用可能なすべての構成オプションの詳細については、[サンプル reboot_required.d/conf.yaml][8] を参照してください。

2. エージェントの dd-agent (Datadog Agent を実行するユーザー) が書き込み可能なディレクトリを、このチェックで使用するために作成します。デフォルトの `/var/run/dd-agent` が理想的です。以下のスニペットで十分です。

    ```
    sudo mkdir /var/run/dd-agent
    sudo chown dd-agent:dd-agent /var/run/dd-agent
    ```

3. [Agent を再起動します][9]。

### 検証

[Agent の `status` サブコマンドを実行][9]し、Checks セクションの `reboot_required` を探します。

## 収集データ

### メトリクス

メトリクスは収集されません。

### イベント

reboot_required チェックには、イベントは含まれません。

## サービスのチェック

Datadog でこれらのサービスチェックのアラート条件を作成するには、[Create Monitor][10] ページで 'Integration' ではなく 'Custom Check' を選択します。

**`system.reboot_required`**

チェックは次の内容を返します。

* 再起動が必要ない、あるいは `days_warning` や `days_critical` より小さい場合は、`OK`。
* `days_warning` 日より長い間、再起動が要求されている場合は、`WARNING`。
* `days_critical` 日より長い間、再起動が要求されている場合は、`CRITICAL`。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][11]までお問合せください。

[1]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent
[2]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[3]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[4]: https://docs.datadoghq.com/ja/developers/integrations/new_check_howto/#developer-toolkit
[5]: https://app.datadoghq.com/account/settings#agent
[6]: https://docs.datadoghq.com/ja/getting_started/integrations
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[8]: https://github.com/DataDog/integrations-extras/blob/master/reboot_required/datadog_checks/reboot_required/data/conf.yaml.example
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#service-status
[10]: https://app.datadoghq.com/monitors#/create
[11]: http://docs.datadoghq.com/help


{{< get-dependencies >}}