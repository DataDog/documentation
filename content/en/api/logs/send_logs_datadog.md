---
title: Send Logs over HTTP
type: apicontent
order: 23.1
external_redirect: /api/#send-logs-over-http
---

## Send Logs over HTTP

| Item             | Description                                                                                                           |
| ------           | ---------                                                                                                             |
| Protocol         | http: 80<br>https: 443                                                                                                |
| Host             | For Datadog US: `http-intake.logs.datadoghq.com` <br> For Datadog EU: `http-intake.logs.datadoghq.eu`                 |
| Path             | `/v1/input/<DATADOG_API_KEY>`                                                                                         |
| Query parameters | Query parameters available are the reserved log attribute. `?ddtags=<TAGS>&ddsource=<SOURCE>&service=<SERVICE>&hostname=<HOSTNAME>` |
| Method           | `POST`                                                                                                                |
| Content Type     | Available content type are: `text/plain`, `application/json`, `application/logplex-1`                                 |
