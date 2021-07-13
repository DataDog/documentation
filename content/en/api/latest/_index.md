---
title: API Reference
type: api
further_reading:
  - link: /api/latest/using-the-api/
    tag: Documentation
    text: Using the API
  - link: /api/latest/rate-limits/
    tag: Documentation
    text: Rate Limits
---

{{< h2 >}}API Reference{{< /h2 >}}

The Datadog API is an HTTP REST API. The API uses resource-oriented URLs to call the API, uses status codes to indicate the success or failure of requests, returns JSON from all requests, and uses standard HTTP response codes. Use the Datadog API to access the Datadog platform programmatically.

### Getting started

Authenticate to the API with an [API key][1], and depending on the endpoint, an [Application key][2].

To try out the API [![Run in Postman][3]](https://app.getpostman.com/run-collection/b82586cb783eb6f7cf6d?action=collection%2Fimport#?env%5BDatadog%20Authentication%5D=W3sia2V5IjoiYXBwbGljYXRpb25fa2V5IiwidmFsdWUiOiIiLCJlbmFibGVkIjp0cnVlLCJ0eXBlIjoidGV4dCJ9LHsia2V5IjoiYXBpX2tleSIsInZhbHVlIjoiIiwiZW5hYmxlZCI6dHJ1ZSwidHlwZSI6InRleHQifV0=)

[Using the API][4] is a guide to the endpoints.

**Note**: cURL code examples assume usage of BASH and GNU coreutils. On macOS, you can install coreutils via the [Homebrew package manager][5]: `brew install coreutils`

### Client libraries

By default, the Datadog API Docs show examples in cURL. Select one of our official [client libraries][6] languages in each endpoint to see code examples from that library. To install each library:

{{< programming-lang-wrapper langs="java,python-legacy,python,ruby-legacy,ruby,go,typescript" >}}

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
import com.datadog.api.<VERSION>.client.ApiClient;
import com.datadog.api.<VERSION>.client.ApiException;
import com.datadog.api.<VERSION>.client.Configuration;
import com.datadog.api.v2.client.auth.*;
import com.datadog.api.v2.client.model.*;
import com.datadog.api.<VERSION>.client.api.*;
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
go get github.com/DataDog/datadog-api-client-go
```
#### Usage
```go
import "github.com/DataDog/datadog-api-client-go/api/<VERSION>/datadog"
```
 **Note**: Replace `<VERSION>` with v1 or v2, depending on which endpoints you want to use.
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
