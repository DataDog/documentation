---
title: API Reference V1
type: api
further_reading:
  - link: /api/v1/using-the-api/
    tag: Documentation
    text: Using the API
  - link: /api/v1/rate-limits/
    tag: Documentation
    text: Rate Limits
---

{{< h2 >}}API Reference V1{{< /h2 >}}

The Datadog API is an HTTP REST API. The API uses resource-oriented URLs to call the API, uses status codes to indicate the success or failure of requests, returns JSON from all requests, and uses standard HTTP response codes. Use the Datadog API to access the Datadog platform programmatically.

Authenticate to the API with an [API key][1], and depending on the endpoint, and [Application key][2].

By default, the Datadog API Docs show examples in cURL. Select one of our official [client libraries][3] languages in each endpoint to see code examples from that library.

**Note**: cURL code examples assume usage of BASH and GNU coreutils. On macOS, you can install coreutils via the [Homebrew package manager][4]: `brew install coreutils`

To quickly get started with the Datadog API, see [Using the API], or check out our [Datadog Postman collection][5].

Trying to get started with the application instead? Check out our general [Getting Started docs][6].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/account_management/api-app-keys/#api-keys
[2]: https://docs.datadoghq.com/account_management/api-app-keys/#application-keys
[3]: https://docs.datadoghq.com/developers/libraries/
[4]: https://brew.sh
[5]: /getting_started/api
[6]: /getting_started/application/
