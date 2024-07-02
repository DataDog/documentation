---
title: Assigning Owners to APIs
is_beta: true
further_reading:
- link: /tracing/service_catalog/
  tag: Documentation
  text: Datadog Service Catalog
---

<!-- image TKTK -->

## 所有者の割り当て

API カタログでは、各 API がエンドポイントのグループを表す API レベルで所有権を管理します。API の所有者は*チーム*と呼ばれます。

API を所有しているチームは API ページ、エンドポイントサイドパネル、**Explorer** テーブルで見つけることができます。チームは `Orders` のような名前を持つピル形式で表示されます。チーム名をクリックすると、チームメンバーや連絡先リンクなどの詳細が表示されます。チームの詳細は、特定のエンドポイントに関連するインシデントを解決するのに便利です。

{{< img src="tracing/api_catalog/api-catalog-endpoint-owners.png" alt="エンドポイント詳細ページのチーム詳細パネル。エンドポイントを所有するチームの名前と通信情報が表示されます" style="width:100%;" >}}

Datadog UI から所有者を割り当てるには

1. [API エンドポイントが登録されていること][1]を確認します。
2. **API** 列から、所有者を割り当てたい API をクリックします。
3. 左上の **N/A** 表示の横にある鉛筆アイコンをクリックします。
4. リストからチームを選択します。
5. **Confirm** をクリックします。

API 仕様ファイル内で所有者を割り当てるには

1. チーム名を `x-datadog.teamHandle` プロパティに追加します。
   {{< highlight yaml "hl_lines=6-7" >}}
openapi: 3.0.2
info:
 title: API Name
 description: API Description
 version: 1.0.0
x-datadog:
 teamHandle: <dd-team>
{{< /highlight >}}
2. [OpenAPI/Swagger ファイルをインポート][2]します。

<!--## Assess monitoring gaps TKTK -->

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /api_catalog/add_entries/
[2]: /api_catalog/add_entries/#import-openapiswagger-file