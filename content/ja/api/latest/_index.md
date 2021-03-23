---
title: API リファレンス
type: api
further_reading:
  - link: /api/latest/using-the-api/
    tag: Documentation
    text: API の使用
  - link: /api/latest/rate-limits/
    tag: Documentation
    text: レート制限
---
{{< h2 >}}API リファレンス{{< /h2 >}}

Datadog では HTTP REST API を採用しており、リソース指向 URL を使用して API を呼び出します。リクエストの成否はステータスコードで示し、すべてのリクエストに対して JSON オブジェクトを返します。この場合には標準 HTTP 応答コードが使用されます。Datadog API を使用すると、プログラムを通じて Datadog のプラットフォームにアクセスすることができます。

### はじめに

[API キー][1]で API を認証します。これはエンドポイントと[アプリケーションキー][2]によって異なります。

API を実行するには、[![Postmanで実行][3]](https://app.getpostman.com/run-collection/bf4ac0b68b8ff47419c1#?env%5BDatadog%20Authentication%5D=W3sia2V5IjoiYXBwbGljYXRpb25fa2V5IiwidmFsdWUiOiIiLCJlbmFibGVkIjp0cnVlfSx7ImtleSI6ImFwaV9rZXkiLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWV9XQ==)

[API の使用][4]でエンドポイントについて説明しています。

**注**: cURL コードの例は、BASH および GNU Core Utilities を使用することを想定したものです。macOS をお使いの場合は [Homebrew package manager][5] から Coreutils をダウンロードして、コマンド `brew install coreutils` でインストールできます。

### クライアントライブラリ

デフォルトでは、Datadog API Docs には cURL で例が示されています。各エンドポイントの公式[クライアントライブラリ][6]言語から 1 つを選択すると、選択したライブラリのコード例を閲覧できます。各ライブラリをインストールするには、

{{< programming-lang-wrapper langs="java,python,ruby,go" >}}

{{< programming-lang lang="java" >}}
Maven - この依存関係をプロジェクトの POM に追加します。
 ```java
<dependency>
  <groupId>com.datadoghq</groupId>
  <artifactId>datadog-api-client</artifactId>
  <version>1.0.0</version>
  <scope>compile</scope>
</dependency>
 ```

 Gradle - この依存関係をプロジェクトのビルドファイルに追加します。
 ```java
compile "com.datadoghq:datadog-api-client:1.0.0"
 ```

{{< /programming-lang >}}

{{< programming-lang lang="python" >}}
 ```python
pip install datadog
 ```

{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}
 ```ruby
gem install dogapi
 ```
{{< /programming-lang >}}

{{< programming-lang lang="go" >}}
 ```go
import "github.com/DataDog/datadog-api-client-go/api/<VERSION>/datadog"
 ```
 **注**: 使用するエンドポイントに応じて、`<VERSION>` を v1 または v2 に置き換えてください。
{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

または、ライブラリディテクトリを参照します。

{{< partial name="api/sdk-languages.html" >}}
</br>
アプリケーションを使用して開始する場合は、一般向けの[「はじめに」ドキュメント][7]をご覧ください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/account_management/api-app-keys/#api-keys
[2]: https://docs.datadoghq.com/ja/account_management/api-app-keys/#application-keys
[3]: https://run.pstmn.io/button.svg
[4]: /ja/api/v1/using-the-api/
[5]: https://brew.sh
[6]: https://docs.datadoghq.com/ja/developers/libraries/
[7]: /ja/getting_started/application/ß