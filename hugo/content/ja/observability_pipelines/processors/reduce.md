---
description: Reduce プロセッサーを使用して、指定したフィールドとマージ戦略に基づいて複数のログイベントを単一のログにグループ化する方法を学びます。
disable_toc: false
products:
- icon: logs
  name: ログ
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Reduce Processor
---
{{< product-availability >}}

## 概要 {#overview}

Reduce プロセッサーは、指定したフィールドと選択したマージ戦略に基づいて、複数のログイベントを単一のログにグループ化します。ログは 10 秒間隔でグループ化されます。その間隔が経過すると、そのグループの縮約されたログがパイプラインの次のステップに送信されます。

## セットアップ {#setup}

reduce プロセッサーのセットアップ手順
1. [{{< ui >}}filter query{{< /ui >}}] (フィルタークエリ) を定義します。指定されたフィルタークエリに一致するログのみが処理されます。縮約されたログと、フィルタークエリに一致しないログが、パイプラインの次のステップに送信されます。詳細については、[検索構文][1]を参照してください。
2. [{{< ui >}}Group By{{< /ui >}}] (グループ化) セクションで、ログをグループ化するフィールドを入力します。
3. [{{< ui >}}Add Group by Field{{< /ui >}}] (グループ化フィールドを追加) をクリックするとフィールドを追加できます。
4. [{{< ui >}}Merge Strategy{{< /ui >}}] (マージ戦略) セクションで次の操作を行います。
   - [{{< ui >}}On Field{{< /ui >}}] (マージフィールド) に、ログをマージするフィールド名を入力します。
   - [{{< ui >}}Apply{{< /ui >}}] (適用) ドロップダウンメニューでマージ戦略を選択します。これは、イベントを結合するために使用される戦略です。利用可能な戦略の説明については、[マージ戦略](#merge-strategies)セクションを参照してください。
   - [{{< ui >}}Add Merge Strategy{{< /ui >}}] (マージ戦略を追加) をクリックして戦略を追加します。

### マージ戦略 {#merge-strategies}

ログイベントを結合する際に使用できるマージ戦略は次のとおりです。


| 名前           | 説明                                                                                                        |
| -------------- | ------------------------------------------------------------------------------------------------------------------ |
| Array (配列)          | 各値を配列に追加します。                                                                                   |
| Concat (連結)         | 各文字列値をスペースで区切って連結します。                                                           |
| Concat newline (連結 (改行区切り)) | 各文字列値を改行で区切って連結します。                                                         |
| Concat raw (連結 (区切りなし))     | 各文字列値を区切りなしで連結します。                                                              |
| Discard (破棄)        | 受信した最初の値以外をすべて破棄します。                                                     |
| Flat unique (ユニーク値を平坦化)    | 受信したすべてのユニーク値の平坦化された配列を作成します。                                                |
| Longest array (最も長い配列)  | 受信した中で最も長い配列を保持します。                                                                        |
| Max (最大)            | 受信した数値の最大値を保持します。                                                                |
| Min (最小)            | 受信した数値の最小値を保持します。                                                                |
| Retain (保持)         | 受信した最後の値以外をすべて破棄します。\`null\` を保持しないことで coalesce として機能します。|
| Shortest array (最も短い配列) | 受信した中で最も短い配列を保持します。                                                                       |
| Sum (合計)            | 受信した数値を合計します。                                                                       |

## 健全性メトリクス {#health-metrics}

すべてのプロセッサーから送信される[コンポーネントメトリクス][2]および[プロセッサーバッファメトリクス][3]については、[Pipelines 使用状況メトリクス][4]のドキュメントを参照してください。

### Reduce メトリクス {#reduce-metrics}

- `component_id` タグを使用して、個々のコンポーネントでフィルタリングまたはグループ化します。
- これらのメトリクスの `component_type` タグは `reduce` です。

`pipelines.stale_events_flushed_total`
: **説明**: プロセッサーがフラッシュした古いイベントの数。
: **メトリクスタイプ**: count

[1]: /ja/observability_pipelines/search_syntax/logs/
[2]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[3]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#processor-buffer-metrics
[4]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/