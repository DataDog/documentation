---
description: Add Hostname プロセッサを使用して、ログを送信したホストの名前を持つフィールドを追加する方法を学びます。
disable_toc: false
products:
- icon: logs
  name: ログ
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Add Hostname Processor
---
{{< product-availability >}}

## 概要 {#overview}

このプロセッサは、ログを送信したホストの名前を持つフィールドを追加します。(例: `hostname: 613e197f3526`)。**注**: `hostname` がすでに存在する場合、Worker はエラーをスローし、既存の `hostname` を上書きしません。

## セットアップ {#setup}

このプロセッサーをセットアップするには、次のようにします。
- {{< ui >}}filter query{{< /ui >}} を定義します。詳細については、[ログ検索構文][1]を参照してください。
  - 指定されたフィルタークエリに一致するログのみが処理されます。
  - フィルタークエリに一致するかどうかにかかわらず、すべてのログがパイプラインの次のステップに送信されます。

[1]: /ja/observability_pipelines/search_syntax/logs/