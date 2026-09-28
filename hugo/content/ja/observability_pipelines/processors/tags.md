---
aliases:
- /ja/observability_pipelines/processors/tag_control/logs/
description: タグプロセッサを使用して、Datadog Agent からのログの Datadog タグ配列内で特定のタグを除外または含める方法を学びます。
disable_toc: false
products:
- icon: logs
  name: ログ
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: タグプロセッサ
---
{{< product-availability >}}

## 概要 {#overview}

Datadog Agent から送信されるログについては、このプロセッサを使用して Datadog タグ配列 (`ddtags`) 内の特定のタグを除外または含めます。除外されたタグや含まれなかったタグは破棄され、送信されるログのボリュームが削減される場合があります。

**注**: このプロセッサは、`ddtags` 配列に既に存在するタグのみを保持または破棄します。ログに新しいタグや属性が追加されることはありません。ログに新しい属性を追加するには、[Edit Fields][3] プロセッサを使用します。

## セットアップ {#setup}

プロセッサーをセットアップするには、

1. [{{< ui >}}filter query{{< /ui >}}] (フィルタークエリ) を定義します。詳細については、[Logs Search Syntax][2]を参照してください。
   - フィルターに一致するログのみが処理されます。
   - フィルタークエリに一致するかどうかにかかわらず、すべてのログがパイプラインの次のステップに送信されます。
1. 必要に応じて、{{< ui >}}Configure tags{{< /ui >}} セクションに Datadog タグ配列を入力します。サポートされている形式は `["key:value", "key"]` です。`key:value`形式の詳細については、[Define Tags][1]を参照してください。
1.  {{< ui >}}Configure tags{{< /ui >}}セクションで、{{< ui >}}Exclude tags{{< /ui >}} または {{< ui >}}Include tags{{< /ui >}} を選択します。前のステップでタグ配列を指定した場合は、設定するタグキーを選択します。タグキーを手動で追加することもできます。**注**: 最大 100 個のタグを選択できます。

[1]: /ja/getting_started/tagging/#define-tags
[2]: /ja/observability_pipelines/search_syntax/logs/
[3]: /ja/observability_pipelines/processors/edit_fields/