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

### Getting Started

Authenticate to the API with an [API key][1], and depending on the endpoint, an [Application key][2].

To try out the API [![Run in Postman][3]](https://app.getpostman.com/run-collection/bf4ac0b68b8ff47419c1#?env%5BDatadog%20Authentication%5D=W3sia2V5IjoiYXBwbGljYXRpb25fa2V5IiwidmFsdWUiOiIiLCJlbmFibGVkIjp0cnVlfSx7ImtleSI6ImFwaV9rZXkiLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWV9XQ==)

[Using the API][4] is a guide to the endpoints.

**Note**: cURL code examples assume usage of BASH and GNU coreutils. On macOS, you can install coreutils via the [Homebrew package manager][5]: `brew install coreutils`

### Client Libraries

By default, the Datadog API Docs show examples in cURL. Select one of our official [client libraries][6] languages in each endpoint to see code examples from that library. To install each library:

{{< programming-lang-wrapper langs="java,python,ruby,go" >}}

{{< programming-lang lang="java" >}}
Maven - Add this dependency to your project's POM:
 ```java
<dependency>
  <groupId>com.datadoghq</groupId>
  <artifactId>datadog-api-client</artifactId>
  <version>1.0.0</version>
  <scope>compile</scope>
</dependency>
 ```

 Gradle - Add this dependency to your project's build file:
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
 **Note**: Replace `<VERSION>` with v1 or v2, depending on which endpoints you want to use.
{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

Or check out the libraries directly:

{{< partial name="api/sdk-languages.html" >}}
</br>
Trying to get started with the application instead? Check out our general [Getting Started docs][7].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/account_management/api-app-keys/#api-keys
[2]: https://docs.datadoghq.com/account_management/api-app-keys/#application-keys
[3]: https://run.pstmn.io/button.svg
[4]: /api/v1/using-the-api/
[5]: https://brew.sh
[6]: https://docs.datadoghq.com/developers/libraries/
[7]: /getting_started/application/ß
