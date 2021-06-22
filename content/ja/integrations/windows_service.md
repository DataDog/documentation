---
aliases:
  - /ja/integrations/winservices
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - os & system
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/windows_service/README.md'
display_name: Windows Service
draft: false
git_integration_title: windows_service
guid: 2289acf0-e413-4384-83f7-88157b430805
integration_id: windows-service
integration_title: Windows Services
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: windows_service.
name: windows_service
public_title: Datadog-Windows Services インテグレーション
short_description: Windows Service の状態を監視。
support: コア
supported_os:
  - windows
---
## 概要

このチェックは、Windows Service の状態を監視し、サービスチェックを Datadog に送信します。

## セットアップ

### インストール

Windows Service チェックは [Datadog Agent][1] パッケージに含まれています。Windows ホストに追加でインストールする必要はありません。

### コンフィギュレーション

[Agent のコンフィギュレーションディレクトリ][2]のルートにある `conf.d/` フォルダーの `windows_service.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル windows_service.d/conf.yaml][3] を参照してください。サンプルコンフィギュレーションは以下の通りです。

```yaml
init_config:

instances:

    ## @param services  - 文字列のリスト - 必須
    ## Dnscache、wmiApSrv など、監視するサービスのリスト。
    ##
    ## いずれかのサービスが `ALL` に設定されると、SCM に登録されたすべてのサービスが監視されます。
    ##
    ## これは、service.* が設定された場合と同様に、service で始まるすべてのサービスに一致します。
    ## 完全一致には、^service$ を使用します。
    #
    # - services:
    #    - <SERVICE_NAME_1>
    #    - <SERVICE_NAME_2>
  - services:
      - wmiApSrv
      - SNMPTRAP

    ## @param disable_legacy_service_tag - boolean - optional - default: false
    ## 名前が変更されたタグ `service` の `windows_service` への送信を停止して
    ## 関連する非推奨の警告を無効化するかどうかを選択します。
    #
    # disable_legacy_service_tag: false
    disable_legacy_service_tag: true

    ## @param tags - key:value 要素のリスト - オプション
    ## このインテグレーションによって送信されるすべてのサービスチェックにアタッチされるタグのリスト。
    ##
    ## タグ付けの詳細は、https://docs.datadoghq.com/tagging を参照してください
    #
    # tags:
    #   - <KEY_1>:<VALUE_1>
    #   - <KEY_2>:<VALUE_2>
    tags:
      - provider:amazon
```

サービス名は、表示名 (例: `WMI Performance Adapter`) **ではなく**、`services.msc` プロパティフィールドに表示される名前 (例: `wmiApSrv`) を指定してください。スペースを含む名前の場合は、名前全体を二重引用符で囲みます (例: "Bonjour Service")。**注**: Datadog では、スペースはアンダースコアに置き換えられます。

[Agent を再起動][4]すると、サービスの監視と、Datadog へのサービスチェックの送信が開始されます。

#### メトリクスの収集

Windows Service チェックでは[カスタムメトリクス][5]を送信することができますが、これはお客様の[課金][6]に影響します。

### 検証

[Agent の status サブコマンドを実行][7]し、Checks セクションで `windows_service` を探します。

## 収集データ

### メトリクス

Windows Service チェックには、メトリクスは含まれません。

### イベント

Windows Service チェックには、イベントは含まれません。

### サービスのチェック

**windows_service.state**:<br>
Agent は、`services` で構成された各 Windows Service に対して、'service:<service_name>' のタグを付けてサービスチェックを送信します。各サービスチェックは、Windows のステータスに応じて以下のステータスを取ります。

| Windows のステータス   | windows_service.state |
| ---------------- | --------------------- |
| Stopped          | CRITICAL              |
| Start Pending    | WARNING               |
| Stop Pending     | WARNING               |
| Running          | OK                    |
| Continue Pending | WARNING               |
| Pause Pending    | WARNING               |
| Paused           | WARNING               |
| Unknown          | UNKNOWN               |

権限の制限または不正確な名前により Agent がサービスにアクセスできない場合、サービスチェックは `UNKNOWN` を報告します。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

## その他の参考資料

- [Windows Server 2012 の監視][9]
- [Windows Server 2012 メトリクスの収集方法][10]
- [Datadog を使用した Windows Server 2012 の監視][11]

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/windows_service/datadog_checks/windows_service/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ja/developers/metrics/custom_metrics/
[6]: https://docs.datadoghq.com/ja/account_management/billing/custom_metrics/
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://docs.datadoghq.com/ja/help/
[9]: https://www.datadoghq.com/blog/monitoring-windows-server-2012
[10]: https://www.datadoghq.com/blog/collect-windows-server-2012-metrics
[11]: https://www.datadoghq.com/blog/windows-server-monitoring