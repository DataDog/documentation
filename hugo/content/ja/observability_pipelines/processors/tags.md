---
aliases:
- /ja/observability_pipelines/processors/tag_control/logs/
description: Datadog Agent から取得したログについて、タグプロセッサーを使用して Datadog タグ配列内の特定のタグを除外または含める方法を学びます。
disable_toc: false
products:
- icon: logs
  name: ログ
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: タグプロセッサー
---
{{< product-availability >}}

## 概要 {#overview}

Datadog Agent から取得したログについて、このプロセッサーを使用して Datadog タグ (`ddtags`) 配列内の特定のタグを除外または含めることができます。除外されたタグや含まれていないタグは破棄されるため、送信ログの量を削減できる場合があります。

## セットアップ {#setup}

プロセッサーをセットアップするには:

1. {{< ui >}}filter query{{< /ui >}}を定義します。詳細については、[ログ検索構文][2]を参照してください。
   - フィルターに一致するログのみが処理されます。
   - フィルタークエリに一致するかどうかに関係なく、すべてのログがパイプラインの次のステップに送信されます。
1. オプションで、{{< ui >}}Configure tags{{< /ui >}} セクションに Datadog タグ配列を入力します。サポートされている形式は `["key:value", "key"]` です。`key:value` の形式の詳細については、[タグの定義][1]を参照してください。
1. {{< ui >}}Configure tags{{< /ui >}} セクションで、{{< ui >}}Exclude tags{{< /ui >}} または {{< ui >}}Include tags{{< /ui >}} を選択します。前のステップでタグ配列を指定した場合は、構成するタグキーを選択します。タグキーを手動で追加することもできます。**注**: 選択できるタグの数は最大で 100 個までです。

[1]: /ja/getting_started/tagging/#define-tags
[2]: /ja/observability_pipelines/search_syntax/logs/