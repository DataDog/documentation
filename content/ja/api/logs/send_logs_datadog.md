---
title: HTTP を使用したログの送信
type: apicontent
order: 23.1
external_redirect: "/api/#send-logs-over-http"
---

## HTTP を使用したログの送信

| 項目             | 説明                                                                                                           |
| ------           | ---------                                                                                                             |
| プロトコル         | http: 80<br>https: 443                                                                                                |
| ホスト             | Datadog US の場合: `http-intake.logs.datadoghq.com` <br> Datadog EU の場合: `http-intake.logs.datadoghq.eu`                 |
| パス             | `/v1/input/<DATADOG_API_KEY>`                                                                                         |
| クエリパラメーター | 使用できるクエリパラメーターは、予約済みログ属性です。`?ddtags=<TAGS>&ddsource=<SOURCE>&service=<SERVICE>&hostname=<HOSTNAME>` |
| メソッド           | `POST`                                                                                                                |
| コンテンツタイプ     | 使用できるコンテンツタイプは、`text/plain`、`application/json`、`application/logplex-1` です                                 |
