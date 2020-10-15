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
  - 'https://github.com/DataDog/integrations-extras/blob/master/sendmail/README.md'
display_name: Sendmail
draft: true
git_integration_title: sendmail
guid: 4d4f72c7-c8c5-4e7a-b281-32c2d462c7c8
integration_id: sendmail
integration_title: Sendmail
is_public: false
kind: インテグレーション
maintainer: david.bouchare@datadoghq.com
manifest_version: 1.0.0
metric_prefix: sendmail.
metric_to_check: sendmail.queue.size
name: sendmail
public_title: Datadog-Sendmail インテグレーション
short_description: メールキューを監視する Sendmail インテグレーション
support: contrib
supported_os:
  - linux
---
## 概要

このチェックは、Datadog Agent を通じて [Sendmail][1] を監視します。

## セットアップ

### インストール

Agent v6.8 以降を使用している場合は、以下の手順に従って、ホストに Sendmail チェックをインストールしてください。[バージョン 6.8 以前の Agent][3] または [Docker Agent][4] でチェックをインストールする場合は、[コミュニティインテグレーションのインストール][2]に関する Agent のガイドを参照してください。

1. [開発ツールキット][5]をインストールします。
2. integrations-extras リポジトリを複製します。

   ```shell
   git clone https://github.com/DataDog/integrations-extras.git.
   ```

3. `ddev` 構成を `integrations-extras/` パスで更新します。

   ```shell
   ddev config set extras ./integrations-extras
   ```

4. `sendmail` パッケージをビルドします。

   ```shell
   ddev -e release build sendmail
   ```

5. [Datadog Agent をダウンロードして起動][6]します。
6. 次のコマンドを実行して、Agent でインテグレーション Wheel をインストールします。

   ```shell
   datadog-agent integration install -w <PATH_OF_SENDMAIL_ARTIFACT_>/<SENDMAIL_ARTIFACT_NAME>.whl
   ```

7. [他のパッケージ化されたインテグレーション][7]と同様にインテグレーションを構成します。

### コンフィギュレーション

1. sendmail のパフォーマンスデータの収集を開始するには、Agent の構成ディレクトリのルートにある `conf.d/` フォルダーの `sendmail.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル sendmail.d/conf.yaml][8] を参照してください。

2. [Agent を再起動します][9]。

### 検証

[Agent の status サブコマンドを実行][10]し、Checks セクションで `sendmail` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "sendmail" >}}


### サービスのチェック

`sendmail.returns.output`: sendmail コマンドが出力を返さない場合は CRITICAL を返し、それ以外の場合は OK を返します。

### イベント

Sendmail には、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][12]までお問合せください。

[1]: https://www.proofpoint.com/us/open-source-email-solution
[2]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/
[3]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[4]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[5]: https://docs.datadoghq.com/ja/developers/integrations/new_check_howto/#developer-toolkit
[6]: https://app.datadoghq.com/account/settings#agent
[7]: https://docs.datadoghq.com/ja/getting_started/integrations/
[8]: https://github.com/DataDog/integrations-extras/blob/master/sendmail/datadog_checks/sendmail/data/conf.yaml.example
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[10]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[11]: https://github.com/DataDog/integrations-extras/blob/master/sendmail/metadata.csv
[12]: https://docs.datadoghq.com/ja/help/