---
title: CD Visibility Explorer Search Syntax
description: Search all of your deployment executions.
further_reading:
- link: /continuous_delivery/search
  tag: Documentation
  text: Filter and group deployments
- link: /continuous_delivery/explorer/facets
  tag: Documentation
  text: Learn about facets
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">CD Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLScNhFEUOndGHwBennvUp6-XoA9luTc27XBwtSgXhycBVFM9yA/viewform?usp=sf_link" header="false" >}}
CD Visibility is in private beta. To request access, complete the form.
{{< /callout >}}

## 概要

クエリフィルターは条件と演算子で構成されます。

条件には 2 種類あります。

* **単一条件**は、1 つの単語です (`test`、`hello` など)。

* **シーケンス**は、二重引用符で囲まれた単語のグループです (`"hello dolly"` など)。

複合クエリで複数の条件を組み合わせるには、以下の大文字と小文字を区別するブール演算子を使用します。

| **演算子** | **説明**                                                                                        | **例**                  |
|--------------|--------------------------------------------------------------------------------------------------------|------------------------------|
| `AND`        | **積**: 両方の条件を含むイベントが選択されます (何も追加しなければ、AND がデフォルトで採用されます)。 | authentication AND failure   |
| `OR`         | **和**: いずれかの条件を含むイベントが選択されます。                                             | authentication OR password   |
| `-`          | **除外**: 以下の用語はイベントに含まれません (個々の生テキスト検索に適用されます)。                                                  | authentication AND -password |

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}