---
algolia:
  tags:
  - api
cascade:
  algolia:
    category: API
    rank: 10
    subcategory: API リファレンス
further_reading:
- link: /api/latest/using-the-api/
  tag: Documentation
  text: API の使用
- link: /api/latest/scopes/
  tag: Documentation
  text: 認証スコープ
- link: /api/latest/rate-limits/
  tag: ドキュメント
  text: レート制限
title: API リファレンス
type: documentation
---

{{< h2 >}}API リファレンス{{< /h2 >}}

Datadog では HTTP REST API を採用しており、リソース指向 URL を使用して API を呼び出します。リクエストの成否はステータスコードで示し、すべてのリクエストに対して JSON オブジェクトを返します。この場合には標準 HTTP 応答コードが使用されます。Datadog API を使用すると、プログラムを通じて Datadog のプラットフォームにアクセスすることができます。

### はじめに

API への認証は、ヘッダー `DD-API-KEY` を用いて [API キー][1]で行います。エンドポイントによっては、ヘッダー `DD-APPLICATION-KEY` を使用した[アプリケーションキー][2]も必要です。

API を試すには [![Postman で実行][3]](https://god.gw.postman.com/run-collection/20651290-809b13c1-4ada-46c1-af65-ab276c434068?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D20651290-809b13c1-4ada-46c1-af65-ab276c434068%26entityType%3Dcollection%26workspaceId%3Dbf049f54-c695-4e91-b879-0cad1854bafa)

**注**: Postman を通して Datadog API を認証するには、Datadog API コレクションに含まれる**コレクション変数**に、Datadog API とアプリケーションキーの値を追加します。

[API の使用][4]でエンドポイントについて説明しています。

**注**: 
   - Datadog API コレクションの **Variables** タブに API とアプリケーションキーの値を追加します。
   - cURL コード例は、BASH と GNU coreutils の使用を前提としています。macOS をお使いの場合は [Homebrew package manager][5] を使って Coreutils をダウンロードして、コマンド `brew install coreutils` でインストールできます。

### クライアントライブラリ

デフォルトでは、Datadog API Docs には cURL で例が示されています。各エンドポイントの公式[クライアントライブラリ][6]言語から 1 つを選択すると、選択したライブラリのコード例を閲覧できます。各ライブラリをインストールするには、

{{< programming-lang-wrapper langs="java,python-legacy,python,ruby-legacy,ruby,go,typescript" class="api-reference" >}}

{{< programming-lang lang="java" >}}
#### インフラストラクチャーリスト
Maven - この依存関係をプロジェクトの POM に追加します。
```xml
<dependency>
  <groupId>com.datadoghq</groupId>
  <artifactId>datadog-api-client</artifactId>
  <version>{{< sdk-version "datadog-api-client-java" >}}</version>
  <scope>compile</scope>
</dependency>
```

Gradle - この依存関係をプロジェクトのビルドファイルに追加します。
```gradle
compile "com.datadoghq:datadog-api-client:{{< sdk-version "datadog-api-client-java" >}}"
```

#### ガイド

```java
import com.datadog.api.client.ApiClient;
import com.datadog.api.client.ApiException;
import com.datadog.api.client.Configuration;
import com.datadog.api.<VERSION>.client.api.*;
import com.datadog.api.<VERSION>.client.model.*;
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
      <version>{{< sdk-version "datadog-api-client-java" >}}</version>
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
    implementation 'com.datadoghq:datadog-api-client:{{< sdk-version "datadog-api-client-java" >}}'
}

application {
    mainClassName = 'Example.java'
}
```
`gradle run` コマンドで例を実行します。

{{< /programming-lang >}}

{{< programming-lang lang="python-legacy" >}}
#### インフラストラクチャーリスト
```sh
pip install datadog
```
#### ガイド
```python
import datadog
```
{{< /programming-lang >}}

{{< programming-lang lang="python" >}}
#### インフラストラクチャーリスト
```console
pip3 install datadog-api-client
```
#### ガイド
```python
import datadog_api_client
```
{{< /programming-lang >}}

{{< programming-lang lang="ruby-legacy" >}}
#### インフラストラクチャーリスト
```sh
gem install dogapi
```
#### ガイド
```ruby
require 'dogapi'
```
{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}
#### インフラストラクチャーリスト
```sh
gem install datadog_api_client -v {{< sdk-version "datadog-api-client-ruby" >}}
```
#### ガイド
```ruby
require 'datadog_api_client'
```
{{< /programming-lang >}}

{{< programming-lang lang="go" >}}
#### インフラストラクチャーリスト
```sh
go mod init main && go get github.com/DataDog/datadog-api-client-go/v2/api/datadog
```
#### ガイド
```go
import (
        "github.com/DataDog/datadog-api-client-go/v2/api/datadog"
        "github.com/DataDog/datadog-api-client-go/v2/api/datadog<VERSION>"
)
```
 **注**: 使用するエンドポイントに応じて、`<VERSION>` を `V1` または `V2` に置き換えてください。
{{< /programming-lang >}}

{{< programming-lang lang="typescript" >}}
#### インフラストラクチャーリスト
パッケージは [@datadog/datadog-api-client][1] の下にあり、NPM または Yarn を介してインストールできます。

```js
# NPM
npm install @datadog/datadog-api-client

# Yarn
yarn add @datadog/datadog-api-client
```

#### ガイド
```js
import { <VERSION> } from 'datadog-api-client';
```
**注**: 使用するエンドポイントに応じて、`<VERSION>` を v1 または v2 に置き換えてください。

[1]: https://www.npmjs.com/package/@datadog/datadog-api-client
{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

または、ライブラリディテクトリを参照します。

{{< partial name="api/sdk-languages.html" >}}
</br>
アプリケーションを使用して開始する場合は、Datadog の一般向けの[「はじめに」ドキュメント][7]をご覧ください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/account_management/api-app-keys/#api-keys
[2]: https://docs.datadoghq.com/ja/account_management/api-app-keys/#application-keys
[3]: https://run.pstmn.io/button.svg
[4]: /ja/api/v1/using-the-api/
[5]: https://brew.sh
[6]: https://docs.datadoghq.com/ja/developers/community/libraries/
[7]: /ja/getting_started/application/