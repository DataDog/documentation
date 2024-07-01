---
title: API Reference
type: documentation
further_reading:
  - link: /api/latest/using-the-api/
    tag: Documentation
    text: Using the API
  - link: /api/latest/scopes/
    tag: Documentation
    text: Authorization Scopes
  - link: /api/latest/rate-limits/
    tag: Documentation
    text: Rate Limits
cascade:
    algolia:
        rank: 10
        category: API
        subcategory: API Reference
algolia:
  tags: [api]
---

{{< h2 >}}API Reference{{< /h2 >}}

The Datadog API is an HTTP REST API. The API uses resource-oriented URLs to call the API, uses status codes to indicate the success or failure of requests, returns JSON from all requests, and uses standard HTTP response codes. Use the Datadog API to access the Datadog platform programmatically.

### Getting started

Authenticate to the API with an [API key][1] using the header `DD-API-KEY`. For some endpoints, you also need an [Application key][2], which uses the header `DD-APPLICATION-KEY`.

To try out the API [![Run in Postman][3]](https://god.gw.postman.com/run-collection/20651290-809b13c1-4ada-46c1-af65-ab276c434068?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D20651290-809b13c1-4ada-46c1-af65-ab276c434068%26entityType%3Dcollection%26workspaceId%3Dbf049f54-c695-4e91-b879-0cad1854bafa)

**Note**: To authenticate to the Datadog API through Postman, add your Datadog API and Application key values to the **Collection variables** of the Datadog API collection.

[Using the API][4] is a guide to the endpoints.

**Notes**: 
   - Add your API and application key values to the **Variables** tab of the Datadog API Collection.
   - cURL code examples assume usage of BASH and GNU coreutils. On macOS, you can install coreutils with the [Homebrew package manager][5]: `brew install coreutils`

### Client libraries

By default, the Datadog API Docs show examples in cURL. Select one of our official [client libraries][6] languages in each endpoint to see code examples from that library. To install each library:

{{< programming-lang-wrapper langs="java,python-legacy,python,ruby-legacy,ruby,go,typescript" class="api-reference" >}}

{{< programming-lang lang="java" >}}
#### Installation
Maven - Add this dependency to your project's POM:
```xml
<dependency>
  <groupId>com.datadoghq</groupId>
  <artifactId>datadog-api-client</artifactId>
  <version>{{< sdk-version "datadog-api-client-java" >}}</version>
  <scope>compile</scope>
</dependency>
```

Gradle - Add this dependency to your project's build file:
```gradle
compile "com.datadoghq:datadog-api-client:{{< sdk-version "datadog-api-client-java" >}}"
```

#### Usage

```java
import com.datadog.api.client.ApiClient;
import com.datadog.api.client.ApiException;
import com.datadog.api.client.Configuration;
import com.datadog.api.<VERSION>.client.api.*;
import com.datadog.api.<VERSION>.client.model.*;
```
**Note**: Replace `<VERSION>` with v1 or v2, depending on which endpoints you want to use.

#### Examples

Maven `pom.xml` for running examples:
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
Make sure that `CLASSPATH` variable contains all dependencies.

```sh
export CLASSPATH=$(mvn -q exec:exec -Dexec.executable=echo -Dexec.args="%classpath")
```

Gradle `build.gradle` for running examples:
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
Execute example by running `gradle run` command.

{{< /programming-lang >}}

{{< programming-lang lang="python-legacy" >}}
#### Installation
```sh
pip install datadog
```
#### Usage
```python
import datadog
```
{{< /programming-lang >}}

{{< programming-lang lang="python" >}}
#### Installation
```console
pip3 install datadog-api-client
```
#### Usage
```python
import datadog_api_client
```
{{< /programming-lang >}}

{{< programming-lang lang="ruby-legacy" >}}
#### Installation
```sh
gem install dogapi
```
#### Usage
```ruby
require 'dogapi'
```
{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}
#### Installation
```sh
gem install datadog_api_client -v {{< sdk-version "datadog-api-client-ruby" >}}
```
#### Usage
```ruby
require 'datadog_api_client'
```
{{< /programming-lang >}}

{{< programming-lang lang="go" >}}
#### Installation
```sh
go mod init main && go get github.com/DataDog/datadog-api-client-go/v2/api/datadog
```
#### Usage
```go
import (
        "github.com/DataDog/datadog-api-client-go/v2/api/datadog"
        "github.com/DataDog/datadog-api-client-go/v2/api/datadog<VERSION>"
)
```
 **Note**: Replace `<VERSION>` with `V1` or `V2`, depending on which endpoints you want to use.
{{< /programming-lang >}}

{{< programming-lang lang="typescript" >}}
#### Installation
The package is under [@datadog/datadog-api-client][1] and can be installed through NPM or Yarn:

```js
# NPM
npm install @datadog/datadog-api-client

# Yarn
yarn add @datadog/datadog-api-client
```

#### Usage
```js
import { <VERSION> } from 'datadog-api-client';
```
 **Note**: Replace `<VERSION>` with v1 or v2, depending on which endpoints you want to use.

[1]: https://www.npmjs.com/package/@datadog/datadog-api-client
{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

Or check out the libraries directly:

{{< partial name="api/sdk-languages.html" >}}
</br>
Trying to get started with the application instead? Check out Datadogs general [Getting Started docs][7].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/account_management/api-app-keys/#api-keys
[2]: https://docs.datadoghq.com/account_management/api-app-keys/#application-keys
[3]: https://run.pstmn.io/button.svg
[4]: /api/v1/using-the-api/
[5]: https://brew.sh
[6]: https://docs.datadoghq.com/developers/community/libraries/
[7]: /getting_started/application/
