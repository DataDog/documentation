---
description: Edit Fields プロセッサーを使用して、ログデータのフィールドを追加、削除、または名前変更する方法を学びます。
disable_toc: false
further_reading:
- link: /observability_pipelines/guide/remap_reserved_attributes/
  tag: ドキュメント
  text: 予約済み属性の再マッピング
products:
- icon: logs
  name: ログ
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Edit Fields Processor
---
{{< product-availability >}}

## 概要 {#overview}

Edit Fields プロセッサーは、個々のログデータ内のフィールドを追加、削除、または名前変更できます。このプロセッサーを使用して、ログにコンテキストを追加して情報を充実させたり、価値の低いフィールドを削除してデータ量を削減したり、重要な属性の名前を標準化したりできます。ドロップダウンメニューで {{< ui >}}add field{{< /ui >}}、{{< ui >}}drop field{{< /ui >}}、または {{< ui >}}rename field{{< /ui >}} を選択して開始します。

Edit Fields プロセッサーを使用して属性を再マッピングする方法については、[Remap Reserved Attributes][1] ガイドを参照してください。

## セットアップ {#setup}

### フィールドを追加 {#add-field}
{{< ui >}}add field{{< /ui >}} を使用して、ログに新しいキーと値のペアを追加します。

add field プロセッサーの設定方法
1. [{{< ui >}}filter query{{< /ui >}}] (フィルタークエリ) を定義します。指定されたフィルタークエリに一致するログのみが処理されます。フィルタークエリに一致するかどうかにかかわらず、すべてのログがパイプラインの次のステップに送信されます。詳細については、[検索構文][2]を参照してください。
1. 追加するフィールドと値を入力します。キーにネストされたフィールドを指定するには、[パス表記](#path-notation-example-remap)を使用します: `<OUTER_FIELD>.<INNER_FIELD>`。すべての値は文字列として保存されます。
    **注**: 追加するフィールドがすでに存在する場合、Worker はエラーをログに記録し、既存のフィールドは変更されません。

### フィールドを削除 {#drop-field}

{{< ui >}}drop field{{< /ui >}} を使用して、以下で指定するフィルターに一致するログデータからフィールドを削除します。オブジェクトを削除できるため、このプロセッサーを使用してネストされたキーを削除できます。

drop field プロセッサーの設定方法
1. [{{< ui >}}filter query{{< /ui >}}] (フィルタークエリ) を定義します。指定されたフィルタークエリに一致するログのみが処理されます。フィルタークエリに一致するかどうかにかかわらず、すべてのログがパイプラインの次のステップに送信されます。詳細については、[検索構文][2]を参照してください。
1. 削除するフィールドのキーを入力します。指定したキーにネストされたフィールドを指定するには、[パス表記](#path-notation-example-remap)を使用します: `<OUTER_FIELD>.<INNER_FIELD>`。
    **注**: 指定したキーが存在しない場合、ログは変更されません。

### フィールドをリネーム {#rename-field}

{{< ui >}}rename field{{< /ui >}}を使用して、ログ内のフィールド名を変更します。

rename field プロセッサーの設定方法
1. [{{< ui >}}filter query{{< /ui >}}] (フィルタークエリ) を定義します。指定されたフィルタークエリに一致するログのみが処理されます。フィルタークエリに一致するかどうかにかかわらず、すべてのログがパイプラインの次のステップに送信されます。詳細については、[検索構文][2]を参照してください。
1. {{< ui >}}Source field{{< /ui >}} でリネームするフィールドの名前を入力します。キーにネストされたフィールドを指定するには、[パス表記](#path-notation-example-remap)を使用します: `<OUTER_FIELD>.<INNER_FIELD>`。リネーム後、以下で説明する {{< ui >}}Preserve source tag{{< /ui >}} チェックボックスを有効にしない限り、元のフィールドは削除されます。<br>**注**: 指定したソースキーが存在しない場合、ターゲットにはデフォルトの `null` 値が適用されます。
1. {{< ui >}}Target field{{< /ui >}} に、ソースフィールドの新しい名前を入力します。指定したキーにネストされたフィールドを指定するには、[パス表記](#path-notation-example-remap)を使用します: `<OUTER_FIELD>.<INNER_FIELD>`。<br>**注**: 指定したターゲットフィールドがすでに存在する場合、Worker はエラーをログに記録し、既存のターゲットフィールドを上書きしません。
1. 必要に応じて、元のソースフィールドを保持し、ソースキーの情報を指定したターゲットキーにコピーする場合は、{{< ui >}}Preserve source tag{{< /ui >}} ボックスをオンにします。このボックスをオンにしない場合、ソースキーはリネーム後に削除されます。

### パス表記の例 {#path-notation-example-remap}

{{% observability_pipelines/path_notation %}}

{{% observability_pipelines/path_notation_dots %}}

## 健全性メトリクス{#health-metrics}

すべてのプロセッサーから出力される[コンポーネントメトリクス][3]および[プロセッサーバッファメトリクス][4]については、[Pipelines 使用状況メトリクス][5]のドキュメントを参照してください。Edit Fields プロセッサーのメトリクスでフィルタリングまたはグループ化するには、構成したアクションに応じて、タグ `component_type:add_fields`、`component_type:remove_fields`、または `component_type:rename_fields` を使用します。

[1]: /ja/observability_pipelines/guide/remap_reserved_attributes
[2]: /ja/observability_pipelines/search_syntax/logs/
[3]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[4]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#processor-buffer-metrics
[5]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}