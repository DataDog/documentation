---
title: HTTP リクエストが HTTPS にリダイレクトされることを監視する
further_reading:
  - link: /synthetics/api_tests/http_tests
    tag: ドキュメント
    text: HTTP テストの作成
---
## 概要

HTTP トラフィックが HTTPS にリダイレクトされることを監視することは、ユーザーの API エンドポイントおよびアプリケーションとの接続が暗号化されていることを確認するために重要です。

### HTTPS リダイレクトの監視

設定によっては、生成された **Response Preview** タブの Headers に `location` として、または **Body** に `"https:"===window.location.protocol` として HTTPS へのリダイレクトを識別することが可能です。

HTTP トラフィックが HTTPS にリダイレクトされることを監視するには

1. HTTP テストを作成し、[リクエストを定義][1]します。
2. **Test URL** をクリックします。レスポンスプレビューは、**Request Preview** と **Response Preview** を生成します。
3. HTTPS へのリダイレクトに関するアサーションを追加します。
    - レスポンスプレビューで `location` ヘッダーをクリックして、`location` ヘッダーにアサーションを定義します。例えば、**Headers** で、`http://datadoghq.com` の `location` ヘッダーは、`https://datadoghq.com` です。

    {{< img src="synthetics/guide/monitor-https-redirections/location-header-https.png" alt="レスポンスプレビューの Location ヘッダー" style="width:100%;" >}}
    - または、**+ New Assertion** をクリックして、レスポンス本文にアサーションを定義することもできます。`body` `contains` を選択し、テキストフィールドに `"https:"===window.location.protocol` を貼り付けます。
    {{< img src="synthetics/guide/monitor-https-redirections/https-assertion.png" alt="アサーションの定義" style="width:100%;" >}}

テスト作成ワークフローの残りの部分を完了し、HTTP テストを保存します。

通知を定義すると、HTTP トラフィックが HTTPS に正しくリダイレクトされない場合に、Datadog が警告を出すことができます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/getting_started/synthetics/api_test/#define-request