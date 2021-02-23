---
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - コラボレーション
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/nextcloud/README.md'
display_name: Nextcloud
draft: false
git_integration_title: nextcloud
guid: 852e64eb-93b9-4fb2-8cb2-10041b4045c3
integration_id: nextcloud
integration_title: Nextcloud
is_public: true
kind: インテグレーション
maintainer: emeric.planet@gmail.com
manifest_version: 1.0.0
metric_prefix: nextcloud.
metric_to_check: nextcloud.server.database.size
name: nextcloud
public_title: Datadog-Nextcloud インテグレーション
short_description: Nextcloud インスタンスからの総合的な統計を追跡
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

このチェックは [Nextcloud][1] を監視します。

## セットアップ

### インストール

Agent v6.8 以降を使用している場合は、以下の手順に従って、ホストに Nextcloud チェックをインストールしてください。[バージョン 6.8 以前の Agent][3] または [Docker Agent][4] でチェックをインストールする場合は、[コミュニティインテグレーションのインストール][2]に関する Agent のガイドを参照してください。

1. [Datadog Agent をダウンロードして起動][5]します。
2. 次のコマンドを実行して、Agent でインテグレーション Wheel をインストールします。

   ```shell
   datadog-agent integration install -t datadog-nextcloud==<INTEGRATION_VERSION>
   ```

3. [他のパッケージ化されたインテグレーション][6]と同様にインテグレーションを構成します。

### コンフィギュレーション

1. Nextcloud の[メトリクス](#メトリクス) を収集するには、[Agent のコンフィギュレーションディレクトリ][7]のルートにある `conf.d/` フォルダーの `nextcloud.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル nextcloud.d/conf.yaml][8] を参照してください。

2. [Agent を再起動します][9]

### 検証

[Agent の `status` サブコマンドを実行][10]し、Checks セクションで `nextcloud` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "nextcloud" >}}


### サービスのチェック

**`nextcloud.can_connect`**

チェックは次の内容を返します。

-  Nextcloud が到達可能な場合は、`OK` を返します。
-  Nextcloud が到達不可能な場合は、`CRITICAL` を返します。

### イベント

Nextcloud には、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][12]までお問合せください。

[1]: https://nextcloud.com
[2]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/
[3]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[4]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[5]: https://app.datadoghq.com/account/settings#agent
[6]: https://docs.datadoghq.com/ja/getting_started/integrations/
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[8]: https://github.com/DataDog/integrations-extras/blob/master/nextcloud/datadog_checks/nextcloud/data/conf.yaml.example
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[10]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#service-status
[11]: https://github.com/DataDog/integrations-extras/blob/master/nextcloud/metadata.csv
[12]: https://docs.datadoghq.com/ja/help/