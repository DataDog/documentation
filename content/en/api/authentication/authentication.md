---
title: Authentication
type: apicontent
order: 2
external_redirect: /api/#authentication
---
## Authentication
All requests to Datadog's API must be authenticated. Requests that write data require *reporting access* and require an `API key`. Requests that read data require *full access* and also require an `application key`.

By default, the Datadog API authenticates against the Datadog US site. If you are on the Datadog EU site, make sure to add `api_host` to  your options parameters. 

[Manage your account's API and application keys][1].

[1]: https://app.datadoghq.com/account/settings#api
