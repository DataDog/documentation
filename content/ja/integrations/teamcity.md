---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - configuration & deployment
  - autodiscovery
creates_events: true
ddtype: チェック
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/teamcity/README.md'
display_name: Teamcity
git_integration_title: teamcity
guid: b390dd3f-47d5-4555-976a-36722833f000
integration_id: teamcity
integration_title: Teamcity
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: teamcity.
name: teamcity
process_signatures:
  - teamcity-server.sh
  - teamcity-server
public_title: Datadog-Teamcity インテグレーション
short_description: ビルドを追跡し、各デプロイのパフォーマンス上の影響を調査。
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

このチェックは、正常なビルドに関連するイベントを監視し、それらのイベントを Datadog に送信します。

多くの Agent チェックとは異なり、このチェックはメトリクスを収集せずに、イベントのみを収集します。

## セットアップ

### インストール

Teamcity チェックは [Datadog Agent][2] パッケージに含まれています。Teamcity サーバーに追加でインストールする必要はありません。

### コンフィギュレーション

#### Teamcity の準備

[Teamcity のドキュメント][3]に従って、ゲストログインを有効にします。

#### ホスト

ホストで実行されている Agent 用にこのチェックを構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[コンテナ化](#containerized)セクションを参照してください。

[Agent の構成ディレクトリ][4]のルートにある `conf.d/` フォルダーの `teamcity.d/conf.yaml` を編集します。使用可能なすべての構成オプションの詳細については、[サンプル teamcity.d/conf.yaml][5] を参照してください。

```yaml
init_config:

instances:
  - name: My Website
    server: teamcity.mycompany.com

    # 追跡するビルド構成の内部ビルド ID
    build_configuration: MyWebsite_Deploy
```

追跡する各ビルド構成の `instances` に上のような項目を追加します。

[Agent を再起動][6]すると、Teamcity イベントが収集され、Datadog に送信されます。

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

| パラメーター            | 値                                                                                             |
| -------------------- | ------------------------------------------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `teamcity`                                                                                        |
| `<INIT_CONFIG>`      | 空白または `{}`                                                                                     |
| `<INSTANCE_CONFIG>`  | `{"name": "<BUILD_NAME>", "server":"%%host%%", "build_configuration":"<BUILD_CONFIGURATION_ID>"}` |

### 検証

[Agent の `status` サブコマンドを実行][7]し、Checks セクションで `teamcity` を探します。

## 収集データ

### メトリクス

Teamcity チェックには、メトリクスは含まれません。

### イベント

正常なビルドを表す Teamcity イベントが Datadog アプリケーションに転送されます。

### サービスのチェック

Teamcity チェックには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

## その他の参考資料

- [TeamCity と Datadog を使用して、コード変更がパフォーマンスに与える影響を追跡する][9]

[1]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://confluence.jetbrains.com/display/TCD9/Enabling+Guest+Login
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-core/blob/master/teamcity/datadog_checks/teamcity/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://docs.datadoghq.com/ja/help
[9]: https://www.datadoghq.com/blog/track-performance-impact-of-code-changes-with-teamcity-and-datadog