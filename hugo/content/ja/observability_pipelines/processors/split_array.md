---
description: Split Array プロセッサを使用して、ネストされた配列を個別のイベントに分割し、データのクエリ、フィルタリング、アラート、可視化を行う方法を学びます。
disable_toc: false
products:
- icon: logs
  name: ログ
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Split Array プロセッサ
---
{{< product-availability >}}

## 概要 {#overview}

このプロセッサは、ネストされた配列を個別のイベントに分割することで、配列内のデータをクエリ、フィルタリング、アラート、可視化できるようにします。配列はすでに解析済みである必要があります。たとえば、このプロセッサは `[item_1, item_2]` を処理できますが、`"[item_1, item2]"` は処理できません。配列内の項目は、JSON オブジェクト、文字列、整数、浮動小数点数、またはブール値にすることができます。変更されていないすべてのフィールドが子イベントに追加されます。たとえば、以下の項目を Observability Pipelines Worker に送信する場合、

```json
{
    "host": "my-host",
    "env": "prod",
    "batched_items": [item_1, item_2]
}
```

Split Array プロセッサを使用して、`batched_items` 内の各項目を個別のイベントとして送信します。

```json
{
    "host": "my-host",
    "env": "prod",
    "batched_items": item_1
}
```

```json
{
    "host": "my-host",
    "env": "prod",
    "batched_items": item_2
}
```

より詳細な例については、[配列分割の例](#split-array-example)を参照してください。

## セットアップ {#setup}

このプロセッサを設定するには、

{{< ui >}}Manage arrays to split{{< /ui >}}をクリックして分割する配列を追加するか、分割する既存の配列を編集します。サイドパネルが開きます。

- まだ配列を作成していない場合は、以下の[新しい配列を追加](#add-a-new-array)セクションの説明に従って配列パラメータを入力してください。
- すでに配列を作成済みの場合は、テーブル内の配列の行をクリックして編集または削除します。検索バーを使用して特定の配列を見つけ、その配列を選択して編集または削除します。{{< ui >}}Add Array to Split{{< /ui >}} をクリックして新しい配列を追加します。

### 新しい配列を追加{#add-a-new-array}

1. {{< ui >}}filter query{{< /ui >}} を定義します。詳細については、[ログ検索構文][1]を参照してください。
   - フィルターに一致するログのみが処理されます。
   - フィルタークエリに一致するかどうかにかかわらず、すべてのログがパイプラインの次のステップに送信されます。
1. 配列フィールドへのパスを入力します。サブフィールドに一致させるには、パス表記 `<OUTER_FIELD>.<INNER_FIELD>` を使用します。以下の[パス表記の例](#path-notation-example-split-array)を参照してください。
1. {{< ui >}}Save{{< /ui >}} をクリックします。

### 配列分割の例{#split-array-example}

これはイベントの例です。

```json
{
    "ddtags": ["tag1", "tag2"],
    "host": "my-host",
    "env": "prod",
    "message": {
        "isMessage": true,
        "myfield" : {
            "timestamp":14500000,
            "firstarray":["one", 2]
        },
    },
    "secondarray": [
    {
        "some":"json",
        "Object":"works"
    }, 44]
}
```

プロセッサが配列 `"message.myfield.firstarray"` と `"secondarray"` を分割する場合、`"message.myfield.firstarray"` と `"secondarray",` の値がそれぞれの元の配列の単一の項目になる点を除いて、親イベントと同一の子イベントを出力します。各子イベントは2つの配列から取得した項目の一意の組み合わせであるため、この例では4つの子イベント (2項目 * 2項目 = 4通りの組み合わせ) が作成されます。

```json
{
    "ddtags": ["tag1", "tag2"],
    "host": "my-host",
    "env": "prod",
    "message": {
        "isMessage": true,
        "myfield" : {"timestamp":14500000, "firstarray":"one"},
    },
    "secondarray": {
        "some":"json",
        "Object":"works"
    }
}
```

```json
{
    "ddtags": ["tag1", "tag2"],
    "host": "my-host",
    "env": "prod",
    "message": {
        "isMessage": true,
        "myfield" : {"timestamp":14500000, "firstarray":"one"},
        },
    "secondarray": 44
}
```

```json
{
    "ddtags": ["tag1", "tag2"],
    "host": "my-host",
    "env": "prod",
    "message": {
        "isMessage": true,
        "myfield" : {"timestamp":14500000, "firstarray":2},
        },
    "secondarray": {
            "some":"json",
            "object":"works"
        }
}
```

```json
{
    "ddtags": ["tag1", "tag2"],
    "host": "my-host",
    "env": "prod",
    "message": {
        "isMessage": true,
        "myfield" : {"timestamp":14500000, "firstarray":2},
        },
    "secondarray": 44
}
```

### パス表記の例 {#path-notation-example-split-array}

{{% observability_pipelines/path_notation %}}

{{% observability_pipelines/path_notation_dots %}}

[1]: /ja/observability_pipelines/search_syntax/logs/