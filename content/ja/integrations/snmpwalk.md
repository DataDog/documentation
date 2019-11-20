---
assets:
  dashboards: {}
  monitors: {}
  service_checks: /assets/service_checks.json
categories:
  - monitoring
  - notification
  - network
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/snmpwalk/README.md'
display_name: Snmpwalk
git_integration_title: snmpwalk
guid: a2864821-994c-4ebb-8532-b6879ea9a9ab
integration_id: snmpwalk
integration_title: SNMP walk
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
name: snmpwalk
public_title: Datadog-SNMP walk インテグレーション
short_description: snmpwalk の説明
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

SNMP walk サービスからメトリクスをリアルタイムに取得して、以下のことができます。

* SNMP walk の状態を視覚化および監視できます。
* SNMP walk のフェイルオーバーとイベントの通知を受けることができます。


## セットアップ

SNMP walk チェックは [Datadog Agent][1] パッケージに**含まれていません**。

### インストール

Agent v6.8 以降を使用している場合は、以下の手順に従って、ホストに SNMP walk チェックをインストールしてください。[バージョン 6.8 以前の Agent][3] または [Docker Agent][4] でチェックをインストールする場合は、[コミュニティインテグレーションのインストール][2]に関する Agent のガイドを参照してください。

1. [開発ツールキット][5]をインストールします。
2. integrations-extras リポジトリを複製します。

    ```
    git clone https://github.com/DataDog/integrations-extras.git.
    ```

3. `ddev` 構成を `integrations-extras/` パスで更新します。

    ```
    ddev config set extras ./integrations-extras
    ```

4. `snmpwalk` パッケージをビルドします。

    ```
    ddev -e release build snmpwalk
    ```

5. [Datadog Agent をダウンロードして起動][6]します。
6. 次のコマンドを実行して、Agent でインテグレーション Wheel をインストールします。

    ```
    datadog-agent integration install -w <PATH_OF_SNMPWALK_ARTIFACT_>/<SNMPWALK_ARTIFACT_NAME>.whl
    ```

7. [他のパッケージ化されたインテグレーション][7]と同様にインテグレーションを構成します。

### コンフィグレーション

1. SNMP walk の[メトリクス](#metrics)の収集を開始するには、[Agent の構成ディレクトリ][8]のルートにある `conf.d/` フォルダーの `snmpwalk.d/conf.yaml` ファイルを編集します。
  使用可能なすべての構成オプションの詳細については、[サンプル snmpwalk.d/conf.yaml][9] を参照してください。

2. [Agent を再起動します][10]

## 検証

[Agent の `status` サブコマンドを実行][11]し、Checks セクションで `snmpwalk` を探します。

## 収集データ
### メトリクス
SNMP walk チェックには、メトリクスは含まれません。

### イベント
SNMP walk チェックには、イベントは含まれません。

### サービスのチェック
**`snmpwalk.can_check`**

チェックは次の内容を返します。

* `snmpwalk` からメトリクスを収集できる場合は `OK`。
* `snmpwalk` からメトリクスを収集するときにエラーを検出した場合は `CRITICAL`。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][12]までお問合せください。

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent
[3]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[4]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[5]: https://docs.datadoghq.com/ja/developers/integrations/new_check_howto/#developer-toolkit
[6]: https://app.datadoghq.com/account/settings#agent
[7]: https://docs.datadoghq.com/ja/getting_started/integrations
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[9]: https://github.com/DataDog/integrations-extras/blob/master/snmpwalk/datadog_checks/snmpwalk/data/conf.yaml.example
[10]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[11]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#service-status
[12]: http://docs.datadoghq.com/help


{{< get-dependencies >}}