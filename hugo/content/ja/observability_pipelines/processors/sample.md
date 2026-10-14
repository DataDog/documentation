---
disable_toc: false
products:
- icon: logs
  name: ログ
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: サンプルプロセッサ
---
{{< product-availability >}}

## 概要{#overview}

このプロセッサは、定義したレートでログから代表的なサブセットをサンプリングし、残りのイベントを破棄します。たとえば、このプロセッサを使用して、ノイズの多い低重要度のサービスからイベントの 20% をサンプリングできます。

サンプリングは、フィルタークエリに一致するイベントにのみ適用され、他のイベントには影響しません。このプロセッサでイベントが破棄された場合、そのイベントは後続のプロセッサに送信されません。

## セットアップ{#setup}

サンプルプロセッサをセットアップするには:
1. [{{< ui >}}filter query{{< /ui >}}] (フィルタークエリ) でクエリを定義します。詳細については、[Logs Search Syntax][1] を参照してください。
    - 指定したフィルタークエリに一致するイベントのみが、指定した保持率でサンプリングされます。
    - サンプリングされたイベントと、フィルタークエリに一致しないイベントは、パイプラインの次のステップに送信されます。
1. 希望するサンプリングレートを [{{< ui >}}Retain{{< /ui >}}] (保持) フィールドに入力します。たとえば、`2` と入力すると、フィルタークエリに一致する全イベントの 2% が保持されます。
1. オプションで、[{{< ui >}}Group By{{< /ui >}}] (グループ化) にフィールドを入力すると、そのフィールドの固有の値ごとに個別のサンプリンググループを作成できます。たとえば、`status:error` と `status:info` は 2 つの固有のフィールド値です。同じフィールドを持つイベントの各バケットが個別にサンプリングされます。分割するフィールドを追加する場合は [{{< ui >}}Add Field{{< /ui >}}] (フィールドを追加) をクリックします。[グループ化の例](#group-by-example)を参照してください。

### グループ化の例 {#group-by-example}

サンプルプロセッサが次のように設定されているとします。
- Filter query: `env:staging`
- Retain: 一致するイベントの `40%`
- Group by: `status` および `service`

{{< img src="observability_pipelines/processors/group-by-example-service.png" alt="値の例を使用したサンプルプロセッサ" style="width:40%;" >}}

この場合、`env:staging` からのイベントが、`status` と `service` の一意の組み合わせごとに 40% ずつ保持されます。以下に例を示します。

- `status:info` と `service:networks` を含むイベントの 40% が保持されます。
- `status:info` と `service:core-web` を含むイベントの 40% が保持されます。
- `status:error` と `service:networks` を含むイベントの 40% が保持されます。
- `status:error` と `service:core-web` を含むイベントの 40% が保持されます。

[1]: /ja/observability_pipelines/search_syntax/logs/