---
title: API リファレンス V1
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

### はじめに

[API キー][1]で API を認証します。これはエンドポイントと[アプリケーションキー][2]によって異なります。

API を実行するには、[![Postmanで実行][3]](https://app.getpostman.com/run-collection/bf4ac0b68b8ff47419c1#?env%5BDatadog%20Authentication%5D=W3sia2V5IjoiYXBwbGljYXRpb25fa2V5IiwidmFsdWUiOiIiLCJlbmFibGVkIjp0cnVlfSx7ImtleSI6ImFwaV9rZXkiLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWV9XQ==)

[API の使用][4]でエンドポイントについて説明しています。

**注**: cURL コードの例は、BASH および GNU Core Utilities を使用することを想定したものです。macOS をお使いの場合は [Homebrew package manager][5] から Coreutils をダウンロードして、コマンド `brew install coreutils` でインストールできます。

### クライアントライブラリ

デフォルトでは、Datadog API Docs には cURL で例が示されています。各エンドポイントの公式[クライアントライブラリ][6]言語から 1 つを選択すると、選択したライブラリのコード例を閲覧できます。各ライブラリをインストールするには、

{{< programming-lang-wrapper langs="java,python,python-beta,ruby,ruby-beta,go" >}}

{{< programming-lang lang="java" >}}
#### インストール
Maven - この依存関係をプロジェクトの POM に追加します。
```xml
<dependency>
  <groupId>com.datadoghq</groupId>
  <artifactId>datadog-api-client</artifactId>
  <version>1.0.0</version>
  <scope>compile</scope>
</dependency>
```

Gradle - この依存関係をプロジェクトのビルドファイルに追加します。
```gradle
compile "com.datadoghq:datadog-api-client:1.0.0"
```

#### 使用方法

```java
import com.datadog.api.<VERSION>.client.ApiClient;
import com.datadog.api.<VERSION>.client.ApiException;
import com.datadog.api.<VERSION>.client.Configuration;
import com.datadog.api.v2.client.auth.*;
import com.datadog.api.v2.client.model.*;
import com.datadog.api.<VERSION>.client.api.*;
```
**注**: 使用するエンドポイントに応じて、`<VERSION>` を v1 または v2 に置き換えてください。

#### 例

例を実行するための Maven `pom.xml`:
```xml
<project>
  <modelVersion>4.0.0</modelVersion>
  <groupId>com.example</groupId>
  <artifactId>example</artifactId>
  <version>1</version>
  <dependencies>
    <dependency>
      <groupId>com.datadoghq</groupId>
      <artifactId>datadog-api-client</artifactId>
      <version>1.0.0-beta.9</version>
      <scope>compile</scope>
    </dependency>
  </dependencies>
</project>
```
`CLASSPATH` 変数がすべての依存関係を含むことを確認してください。

```sh
export CLASSPATH=$(mvn -q exec:exec -Dexec.executable=echo -Dexec.args="%classpath")
```

例を実行するための Gradle `build.gradle`:
```gradle
plugins {
    id 'java'
    id 'application'
}

repositories {
    jcenter()
}

dependencies {
    implementation 'com.datadoghq:datadog-api-client:1.0.0-beta.9'
}

application {
    mainClassName = 'Example.java'
}
```
`gradle run` コマンドで例を実行します。

{{< /programming-lang >}}

{{< programming-lang lang="python" >}}
#### インストール
```sh
pip install datadog
```
#### 使用方法
```python
import datadog
```
{{< /programming-lang >}}

{{< programming-lang lang="python-beta" >}}
#### インストール
```console
pip3 install datadog-api-client --pre
```
#### 使用方法
```python
import datadog_api_client
```
{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}
#### インストール
```sh
gem install dogapi
```
#### 使用方法
```ruby
require 'dogapi'
```
{{< /programming-lang >}}

{{< programming-lang lang="ruby-beta" >}}
#### インストール
```sh
gem install datadog_api_client -v 1.0.0.beta.2 --pre
```
#### 使用方法
```ruby
require 'datadog_api_client'
```
{{< /programming-lang >}}

{{< programming-lang lang="go" >}}
#### インストール
```sh
go get github.com/DataDog/datadog-api-client-go
```
#### 使用方法
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
[7]: /ja/getting_started/application/