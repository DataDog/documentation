---
title: Authentication
type: apicontent
order: 2
external_redirect: /api/#authentication
---
## Authentication
All requests to Datadog's API must be authenticated. Requests that write data require *reporting access* and require an `API key`. Requests that read data require *full access* and also require an `application key`.

**Note**: All Datadog API Clients are configured by default to consume Datadog US site APIs. If you are on the Datadog EU site, make sure to configure `api_host` to `https://api.datadoghq.eu` in the options parameters. 

[Manage your account's API and application keys][1].

[1]: https://app.datadoghq.com/account/settings#api
