---
title: Send Logs over HTTP
type: apicontent
order: 22.1
external_redirect: /api/#send-logs-over-http
---

## Send Logs over HTTP

| Item             | Description                                                                                                           |
| ------           | ---------                                                                                                             |
| Protocol         | http: 80<br>https: 443                                                                                                |
| Host             | For Datadog US: `http-intake.logs.datadoghq.com` <br> For Datadog EU: `http-intake.logs.datadoghq.eu`                 |
| Path             | For API key passed in headers: `/v1/input`<br> For API key passed in path: `/v1/input/<DATADOG_API_KEY>`              |
| Headers          | Header to pass the API key: `DD-API-KEY`                                                                              |
| Query parameters | Query parameters available are the reserved log attribute. `?ddtags=<TAGS>&ddsource=<SOURCE>&service=<SERVICE>&hostname=<HOSTNAME>` |
| Method           | `POST`                                                                                                                |
| Content Type     | Available content type are: `text/plain`, `application/json`, `application/logplex-1`                                 |
**Note**: If an API key is passed in both the headers and the path only the one in the headers is taken into account.
