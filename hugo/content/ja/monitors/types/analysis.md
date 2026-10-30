---
description: 複数のデータソースのクエリ、データ変換の連結、複雑な SQL クエリの実行をサポートする Analysis モニターを使用して、高度なログ分析に対してアラートを送信します。
further_reading:
- link: /notebooks/advanced_analysis/
  tag: ドキュメント
  text: Notebooks の高度な分析
- link: /monitors/configuration/
  tag: ドキュメント
  text: モニターの構成方法について
- link: /monitors/notify/
  tag: ドキュメント
  text: モニター通知の設定
site_support_id: advanced_analysis
title: Analysis モニター
---
## 概要{#overview}

Analysis モニターは、ノートブック分析および DDSQL 機能へのフルアクセスを提供し、標準のモニターでは見逃される可能性のある複雑なデータパターンに対してアラートを送信できるようにします。Analysis モニターを使用すると、以下のことが可能です。

- 複数のデータソースのクエリ
- データ変換の連結
- 複雑な SQL クエリの実行
- 高度な分析ワークフローの作成

## サポートされているデータソース {#supported-data-sources}

Analysis モニターは、ノートブック分析のセルおよび DDSQL クエリで使用可能なデータソースのサブセットをサポートしています。モニターはクエリを頻繁に評価するため、各データソースは、モニターレベルのクエリ負荷を処理できることが検証された後にのみ有効になります。

以下のデータソースがサポートされています。

- Agent Observability
- 監査
- CI パイプライン
- CI テスト
- イベント
- Agent Observability
- ログ
- メトリクス
- NetFlow
- ネットワーク
- リファレンステーブル
- RUM
- サービスチェック
- スパン

公開済みの分析は、依存するすべてのデータソースもサポートされている場合にのみサポートされます。

Flex Logs に保存されたログは、モニターではサポートされていません。

サポートされていないデータソースは以下のとおりです。
- AI 使用量
- Cloud Cost
- データベースクエリ
- DORA メトリクス
- エラー
- インフラストラクチャーリソース
- モニターグループ、モニター
- Product Analytics
- セキュリティ検出結果
- セキュリティシグナル
- Snowflake クエリ
- Synthetics

サポートされていないデータソースに基づいて構築された公開済みの分析を選択すると、Datadog はそのソース名を記載したエラーを表示します。たとえば、以下のとおりです。

`This query is not monitorable because it's based on an unsupported data source for monitoring: Infrastructure Resources.`

分析が Flex ストレージ内のログに基づいている場合、Datadog は代わりに次のエラーを表示します。

`Dataset is based on Flex logs, which are not supported for monitoring.`

## モニターの作成 {#monitor-creation}

分析モニターは、次の 3 つの方法で作成できます。

### [モニター] ページから {#from-the-monitors-page}

Datadog で[分析モニター][1]を作成するには、メインナビゲーションを使用して次のようにします。{{< ui >}}Monitors{{< /ui >}} > {{< ui >}}New Monitor{{< /ui >}} > {{< ui >}}Analysis{{< /ui >}}

### ノートブックから {#from-a-notebook}

ノートブックから直接分析モニターを作成するには、次の手順を実行します。

1. 目的のクエリを含む分析セルがあるノートブックを開きます。
2. 分析セルで、[{{< ui >}}Send To{{< /ui >}}] をクリックします。
3. [{{< ui >}}Monitors{{< /ui >}}] を選択します。

これにより、探索的な分析をアラート用のモニターに変換できます。

### DDSQL エディターから {#from-the-ddsql-editor}

DDSQL エディターから直接分析モニターを作成するには、次の手順を実行します。

1. [DDSQL エディター][4]を開き、目的のクエリを選択します。
2. {{< ui >}}Save to dashboard{{< /ui >}} の横にあるドロップダウン矢印をクリックします。
3. [{{< ui >}}Create monitor{{< /ui >}}] を選択します。

## クエリを定義する {#define-the-query}

1. **公開済みの分析を選択する**: 利用可能なノートブックまたは DDSQL の公開済みの分析から選択します。
2. **公開済みの分析をフィルタリングする**: 列を基準に結果をフィルタリングします。
3. **結果をプレビューする**: アラート条件を設定する前に、クエリの出力を表示します。

{{< img src="/monitors/monitor_types/analysis/analysis_monitor_config.png" alt="分析モニターの構成例" style="width:100%;" >}}

## アラート条件を設定する {#set-alert-conditions}

クエリの値がしきい値を超えたときにトリガーされるようにモニターを構成し、回復しきい値や評価遅延などの高度なアラートオプションをカスタマイズします。詳細については、[モニターの構成][2]を参照してください。

## 通知 {#notifications}

アラートメッセージの詳細な手順については、[通知][3]を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/create/analysis
[2]: /ja/monitors/configuration/
[3]: /ja/monitors/notify/
[4]: https://app.datadoghq.com/ddsql/editor