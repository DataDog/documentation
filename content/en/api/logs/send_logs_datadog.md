---
title: Send Logs over HTTP
type: apicontent
order: 23.1
external_redirect: /api/#send-logs-over-http
---

## Send Logs over HTTP

| Item             | Description                                                                                                                                           |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Protocol         | http: 80<br>https: 443                                                                                                                                |
| Host             | For Datadog US: `http-intake.logs.datadoghq.com` <br> For Datadog EU: `http-intake.logs.datadoghq.eu`                                                 |
| Path             | For API key passed in headers: `/v1/input`<br> For API key passed in path: `/v1/input/<DATADOG_API_KEY>`                                              |
| Headers          | Header to pass the API key: `DD-API-KEY`. If an API key is passed in both the headers and the path only the one in the headers is taken into account. |
| Query parameters | Query parameters available are the reserved log attribute. `?ddtags=<TAGS>&ddsource=<SOURCE>&service=<SERVICE>&hostname=<HOSTNAME>`                   |
| Method           | `POST`                                                                                                                                                |
| Content Type     | Available content type are: `text/plain`, `application/json`, `application/logplex-1`                                                                 |
| Content Encoding | _[optional]_ For compressed content the available content encoding are: `gzip` and `deflate`.                                                         |

See the [log collection documentation][1] to learn more about the different ways to collect logs from your application. If you are logging pure JSON objects, they are parsed automatically by Datadog Log management.

**Note**: When logging pure JSON objects, Datadog has a set of [reserved attributes][2] with a specific behavior.
[1]: /logs/log_collection/
[2]: /logs/log_collection/#reserved-attributes
