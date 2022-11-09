---
title: Authentication
---
All requests to Datadog’s API must be authenticated.
Requests that write data require reporting access and require an `API key`.
Requests that read data require full access and also require an `application key`.

**Note:** All Datadog API clients are configured by default to consume Datadog US site APIs.
If you are on the Datadog EU site, set the environment variable `DATADOG_HOST` to
`https://api.datadoghq.eu` or override this value directly when creating your client.

[Manage your account’s API and application keys](https://app.datadoghq.com/account/settings#api).

## Validate API key

Check if the API key (not the APP key) is valid. If invalid, a 403 is returned.

