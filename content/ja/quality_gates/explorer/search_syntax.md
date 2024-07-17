---
description: すべての Quality Gates またはルール実行を検索します。
further_reading:
- link: /quality_gates/search
  tag: ドキュメント
  text: Quality Gates のフィルタリングとグループ化
- link: /quality_gates/explorer/facets
  tag: ドキュメント
  text: ファセットについて
kind: ドキュメント
title: Quality Gates Explorer の検索構文
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択したサイト ({{< region-param key="dd_site_name" >}}) では現在 Quality Gates は利用できません。</div>
{{< /site-region >}}

{{< callout url="#" btn_hidden="true" >}}
Quality Gates は公開ベータ版です。
{{< /callout >}}

## 概要

クエリフィルターは条件と演算子で構成されます。

条件には 2 種類あります。

* **単一条件**は、1 つの単語です (`test`、`hello` など)。

* **シーケンス**は、二重引用符で囲まれた単語のグループです (`"hello dolly"` など)。

複合クエリで複数の条件を組み合わせるには、以下の大文字と小文字を区別するブール演算子を使用します。

| **演算子** | **説明**                                                                                        | **例**                  |
|--------------|--------------------------------------------------------------------------------------------------------|------------------------------|
| `AND`        | **交差**: 選択されたイベントに両方の項が含まれています。項間に演算子が指定されていない場合、デフォルトは `AND` です。 | `authentication AND failure`   |
| `OR`         | **和**: いずれかの条件を含むイベントが選択されます。                                             | `authentication OR password`   |
| `-`          | **除外**: 以下の用語はイベントに含まれません (個々の生テキスト検索に適用されます)。                                                  | `authentication AND -password` |

## 属性とタグで検索

属性やタグを検索するためにファセットを定義する必要はありません。特定の属性を検索するには、`@` を追加して属性を検索することを指定します。属性検索では大文字と小文字が区別されます。大文字と小文字を区別せずに検索するには、フリーテキスト検索を使用してください。

例えば、`git.repository.name` 属性に興味があり、`Datadog/documentation` という値でフィルターをかけたい場合は、`@git.repository.name:DataDog/documentation` を使用します。

特殊文字を含む属性値を検索するには、バックスラッシュでエスケープするか、二重引用符を使用します。例えば、`hello:world` という値を持つ `my_attribute` という属性の場合、`@my_attribute:hello\:world` または `@my_attribute:"hello:world"` を使って検索します。

特定の 1 つの特殊文字やスペースに対応させるためには、`?` ワイルドカードを使用します。例えば、値が `hello world`、`hello-world`、または `hello_world` の属性 `my_attribute` は、`@my_attribute:hello?world` を使用して検索します。

タグについて詳しくは、[タグの使用方法][2]をご覧ください。

## ワイルドカード

### 複数文字のワイルドカード

複数文字のワイルドカード検索を実行するには、`*` 記号を次のように使用します。

* `service:web*` は、`web` で始まるサービスを持つすべてのログメッセージに一致します。
* `web*` は、`web` で始まるすべてのログメッセージに一致します。
* `*web` は、`web` で終わるすべてのログメッセージに一致します。

ワイルドカード検索は、この構文を使用してタグおよび属性 (ファセット使用の有無を問わない) 内で機能します。次のクエリは、`feature-` で始まるすべてのブランチを返します。

```
branch:feature-*
```

### ワイルドカードを検索

特殊文字を含む、またはエスケープや二重引用符が必要な属性値やタグ値を検索する際には、特定の 1 つの特殊文字やスペースに対応させるために `?` ワイルドカードを使用します。例えば、値が `hello world`、`hello-world`、または  `hello_world`の属性 `my_attribute` を検索するには、`@my_attribute:hello?world` を使用します。
<p> </p>



## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/quality_gates/explorer/facets
[2]: /ja/getting_started/tagging/using_tags
[3]: /ja/infrastructure
[4]: /ja/integrations