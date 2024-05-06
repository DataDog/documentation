---
aliases:
- /ja/developers/faq/using-postman-with-datadog-apis
- /ja/getting_started/using-postman-with-datadog-apis
- /ja/developers/guide/using-postman-with-datadog-apis
kind: documentation
title: Datadog API と Postman の使用
---

## 概要

Datadog API を使用すると、Datadog との間でデータをやり取りできます。Datadog API は、リソース指向の URL とステータスコードを使用してリクエストの成功または失敗を示し、すべてのリクエストから JSON を返します。

この記事では、[Postman][1] を使用して Datadog への API 呼び出しを実行する方法を説明します。記事内では、Datadog API 内で使用可能なアクションを示し、Postman を使用して `GET`、`POST`、`PUT`、および `DELETE` を実行するための高度な概要を提供します。

## 前提条件

以下が必要です。

- Datadog のアクティブな実装。
- Datadog [API キーとアプリケーションキー][2]へのアクセス権。
- API 構造と JSON 書式設定に関する基礎知識。
- [無料の Postman アカウント][3]。

## セットアップ

### Postman に Datadog コレクションをインポート

[Postman へのログイン][4]から始めます。Datadog は [Postman アプリケーションをダウンロードすること][5]をお勧めします。

</br>
<div class="postman-run-button"
data-postman-action="collection/fork"
data-postman-visibility="public"
data-postman-var-1="20651290-809b13c1-4ada-46c1-af65-ab276c434068"
data-postman-collection-url="entityId=20651290-809b13c1-4ada-46c1-af65-ab276c434068&entityType=collection&workspaceId=bf049f54-c695-4e91-b879-0cad1854bafa"></div>
<script type="text/javascript">
  (function (p,o,s,t,m,a,n) {
    !p[s] && (p[s] = function () { (p[t] || (p[t] = [])).push(arguments); });
    !o.getElementById(s+t) && o.getElementsByTagName("head")[0].appendChild((
      (n = o.createElement("script")),
      (n.id = s+t), (n.async = 1), (n.src = m), n
    ));
  }(window, document, "_pm", "PostmanRunObject", "https://run.pstmn.io/button.js"));
</script>

</br>このコレクションは  Web 用 Postman またはお使いの Postman アプリケーションで動作します。読み込みに数秒かかることがあります。

**注**: API キーとアプリケーションキーの値を使って、Datadog API コレクションの**コレクション変数**を構成します。

### Postman 環境のセットアップ

Postman コレクションをインポートすると、Postman の左ペインに、使用できるすべての Datadog API 呼び出しの一覧がフォルダーごとに構造化されて表示されます。

#### Go

認証用に Datadog の API キーとアプリケーションキーを[コレクション変数][6]に追加します。

以下の手順に従って環境をセットアップします。

1. Datadog API コレクションを選択します。

2. **Variables** タブをクリックします。

3. `api_key` および `application_key` 変数の **Current value** フィールドに、それぞれ有効な Datadog API キーとアプリケーションキーを入力します。

4. **Save** をクリックします。

{{< img src="getting_started/postman/collection_variables.png" alt="変数 api_key と application_key collection が構成された Datadog API コレクション" style="width:100%;">}}

#### API エンドポイントに切り替える

`https://api.datadoghq.com` 以外の Datadog サイトにアクセスしている場合、別のエンドポイント URL にアクセスするには Postman コレクションに切り替える必要があります。

選択したサイト ({{< region-param key="dd_site_name" >}}) へのインスタンスを更新するには、以下の手順に従います。

1. 左ペインの Datadog API コレクションフォルダーで、メニュー (3 点リーダー) をクリックし、**Edit** を選択します。

    {{< img src="getting_started/postman/view-more-actions.png" alt="他のアクションを表示">}}

2. **Variables** タブで、`datadoghq.com` の値を持つ `site` 変数の選択を解除し、{{< region-param key="dd_site" code="true" >}} の値を持つ `site` を選択します。

3. **Update** をクリックします。

## コレクションの使用

セットアップが完了したら、いつでも API 呼び出しを行うことができます。Postman -> Datadog フォルダーには、[Datadog API リファレンス][7]に一覧表示されている各 API カテゴリタイプのサブフォルダーがあります。このサブフォルダーを展開すると、HTTP メソッドと API 呼び出し名を確認できます。

### ビルダー

コレクション内の API 呼び出しをクリックすると、右側の `Builder` ペインにロードされます。このペインで API 呼び出しを送信し、返されたステータス、応答時間、および API 応答コードを確認できます。

{{< img src="getting_started/postman/apiGetCalls.png" alt="Postman API の応答" style="width:70%;">}}

### 説明

エンドポイント名をクリックすると、エンドポイントの説明と、すべての必須/オプションパラメーターが表示されるため、容易にリクエストを構築できます。

{{< img src="getting_started/postman/description.mp4" alt="Postman の説明" video="true" >}}

### Params

**Params** タブには、API 呼び出しに存在するすべてのパラメーターと値が表示されます。ここでは、パラメーターと値を追加できます。使用可能な引数は、[Datadog API ドキュメント][8]の対応するセクションで確認してください。

{{< img src="getting_started/postman/parameters.png" alt="Postman のパラメーター" style="width:70%;">}}

このタブは、API 呼び出しの `param1:value1&param2:value2` 構造を表示する代わりに使用できます。

**注**:

- params テーブルでは、アンパサンド (&) とコロン (:) は不要です。Postman によって挿入されます。
- すべてのプレースホルダーは `<PLACEHOLDER>` の形式に従います。プレースホルダーはクエリを実行する前に置き換える必要があります。

[1]: https://www.postman.com/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://identity.getpostman.com/signup
[4]: https://identity.getpostman.com/login
[5]: https://www.postman.com/downloads/
[6]: https://learning.postman.com/docs/sending-requests/variables/variables/#defining-collection-variables
[7]: /ja/api/latest/#api-reference
[8]: /ja/api/