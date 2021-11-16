---
title: Datadog API と Postman の使用
kind: documentation
aliases:
  - /ja/developers/faq/using-postman-with-datadog-apis
  - /ja/getting_started/using-postman-with-datadog-apis
  - /ja/developers/guide/using-postman-with-datadog-apis
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
data-postman-var-1="7274195-66ef21d8-e159-4d7d-8ded-c511e1abe189"
data-postman-collection-url="entityId=7274195-66ef21d8-e159-4d7d-8ded-c511e1abe189&entityType=collection&workspaceId=bf049f54-c695-4e91-b879-0cad1854bafa"
data-postman-param="env%5BDatadog%20Authentication%5D=W3sia2V5IjoiYXBpX2tleSIsInZhbHVlIjoiIiwiZW5hYmxlZCI6dHJ1ZX0seyJrZXkiOiJhcHBsaWNhdGlvbl9rZXkiLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWV9XQ=="></div>
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

### Postman 環境のセットアップ

Postman コレクションをインポートすると、Postman の左ペインに、使用できるすべての Datadog API 呼び出しの一覧がフォルダーごとに構造化されて表示されます。

#### Authentication

コレクションには、[Postman 環境][6]である `Datadog Authentication` が含まれます。ここに Datadog API キーと認証用のアプリケーションキーを追加します。

以下の手順に従って環境をセットアップします。

1. Postman の右上隅にある **Environments** ドロップダウンをクリックします。

2. **Datadog Authentication** を選択します

3. **Datadog Authentication** 環境を編集して Datadog [API キー][2]を `api_key` 変数の初期値および現在値として追加し、お使いの Datadog [アプリケーションキー][2]を `application_key` 変数の初期値および現在値として追加します。

{{< site-region region="eu" >}}

#### EU API エンドポイントに切り替える

デフォルトエンドポイントの URL ではなく、EU リージョンの Datadog サイトにアクセスしている場合は、EU エンドポイント URL `https://api.datadoghq.eu` からアクセスするように Postman コレクションを切り替える必要があります。

以下の手順に従って、EU インスタンスを更新します。

1. 左ペインの Datadog API コレクションフォルダーで、メニュー (3 点リーダー) をクリックし、**Edit** を選択します。

{{< img src="getting_started/postman/view-more-actions.png" alt="他のアクションを表示">}}

2. **Variables** タブで、`datadoghq.com` の値を持つ `site` 変数の選択を解除し、`datadoghq.eu` の変数を持つ `site` を選択します。

{{< img src="getting_started/postman/variables.png" alt="サイト変数の更新">}}

3. **Update** をクリックします。

{{< /site-region >}}

## コレクションの使用

セットアップが完了したら、いつでも API 呼び出しを行うことができます。Postman -> Datadog フォルダーには、[Datadog API リファレンス][7]に一覧表示されている各 API カテゴリタイプのサブフォルダーがあります。このサブフォルダーを展開すると、HTTP メソッドと API 呼び出し名を確認できます。

### ビルダー

コレクション内の API 呼び出しをクリックすると、右側の `Builder` ペインにロードされます。このペインで API 呼び出しを送信し、返されたステータス、応答時間、および API 応答コードを確認できます。

{{< img src="getting_started/postman/apiGetCalls.png" alt="Postman API の応答" style="width:70%;">}}

### 説明

エンドポイント名をクリックすると、エンドポイントの説明と、すべての必須/オプションパラメーターが表示されるため、容易にリクエストを構築できます。

{{< img src="getting_started/postman/description.mp4" alt="Postman の説明" video="true"  >}}

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
[6]: https://learning.postman.com/docs/postman/variables-and-environments/variables/#environments-in-postman
[7]: /ja/api/v1/organizations/
[8]: /ja/api/