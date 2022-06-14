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
- https://github.com/DataDog/integrations-extras/blob/master/sendmail/README.md
display_name: Sendmail
draft: false
git_integration_title: sendmail
guid: 4d4f72c7-c8c5-4e7a-b281-32c2d462c7c8
integration_id: sendmail
integration_title: Sendmail
integration_version: 1.0.0
is_public: true
kind: integration
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

Sendmail チェックは [Datadog Agent][2] パッケージに含まれていないため、お客様自身でインストールする必要があります。

### インストール

Agent v7.21 / v6.21 以降の場合は、下記の手順に従い Sendmail チェックをホストにインストールします。Docker Agent または 上記バージョン以前の Agent でインストールする場合は、[コミュニティインテグレーションの使用][3]をご参照ください。

1. 以下のコマンドを実行して、Agent インテグレーションをインストールします。

   ```shell
   datadog-agent integration install -t datadog-sendmail==<INTEGRATION_VERSION>
   ```

2. コアの[インテグレーション][4]と同様にインテグレーションを構成します。

### コンフィギュレーション

1. sendmail のパフォーマンスデータの収集を開始するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `sendmail.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル sendmail.d/conf.yaml][5] を参照してください。

2. [Agent を再起動します][6]。

### 検証

[Agent の status サブコマンドを実行][7]し、Checks セクションで `sendmail` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "sendmail" >}}


### イベント

Sendmail には、イベントは含まれません。

### サービスのチェック
{{< get-service-checks-from-git "sendmail" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。


[1]: https://www.proofpoint.com/us/open-source-email-solution
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/ja/getting_started/integrations/
[5]: https://github.com/DataDog/integrations-extras/blob/master/sendmail/datadog_checks/sendmail/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/sendmail/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/sendmail/assets/service_checks.json
[10]: https://docs.datadoghq.com/ja/help/