---
title: API リファレンス
type: api
further_reading:
  - link: /api/v1/using-the-api/
    tag: Documentation
    text: API の使用
  - link: /api/v1/rate-limits/
    tag: Documentation
    text: レート制限
---
{{< h2 >}}API リファレンス{{< /h2 >}}

Datadog では HTTP REST API を採用しており、リソース指向 URL を使用して API を呼び出します。リクエストの成否はステータスコードで示し、すべてのリクエストに対して JSON オブジェクトを返します。この場合には標準 HTTP 応答コードが使用されます。Datadog API を使用すると、プログラムを通じて Datadog のプラットフォームにアクセスすることができます。

[API キー][1]で API を認証します。これはエンドポイントと[アプリケーションキー][2]に応じて異なります。

デフォルトでは、Datadog API Docs には cURL の例が例示されています。各エンドポイントの公式 [クライアントライブラリ][3]言語からひとつを選び、選択したライブラリのコード例を閲覧できます。

**注**: cURL コードの例は、 BASH および GNU Core Utilities を使用することを想定したものです。macOS をお使いの方は [Homebrew package manager][4 から Coreutils をダウンロードして、次のコマンドでインストールが可能です: `brew install coreutils`

Datadog API を使用するには、 [API][7] を使用するか、[Datadog Postman コレクション][5]をチェックアウトしてください。

代わりにアプリケーションの使用をご希望の場合は、汎用の [「はじめに」ドキュメント][6]開始してください。 

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/account_management/api-app-keys/#api-keys
[2]: https://docs.datadoghq.com/ja/account_management/api-app-keys/#application-keys
[3]: https://docs.datadoghq.com/ja/developers/libraries/
[4]: https://brew.sh
[5]: /ja/getting_started/api
[6]: /ja/getting_started/application/
[7]: /ja/api/v1/using-the-api/