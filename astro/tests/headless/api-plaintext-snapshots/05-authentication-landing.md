---
title: Authentication
description: All requests to Datadog’s API must be authenticated. Requests that write data require reporting access and require an API key. Requests that read data…
breadcrumbs: Docs > API > Authentication
---

> For the complete documentation index, see [llms.txt](https://docs.datadoghq.com/llms.txt).

# Authentication

All requests to Datadog’s API must be authenticated.
Requests that write data require reporting access and require an `API key`.
Requests that read data require full access and also require an `application key`.

**Note:** All Datadog API clients are configured by default to consume Datadog US site APIs.
If you are on the Datadog EU site, set the environment variable `DATADOG_HOST` to
`https://api.datadoghq.eu` or override this value directly when creating your client.

[Manage your account’s API and application keys](https://app.datadoghq.com/organization-settings/) in Datadog, and see the [API and Application Keys page](https://docs.datadoghq.com/account_management/api-app-keys/) in the documentation.

## [Validate API key](/api/latest/authentication/validate-api-key/)

| Datadog site      | API endpoint                                          |
| ----------------- | ----------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v1/validate     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v1/validate |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v1/validate |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v1/validate      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v1/validate |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v1/validate |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v1/validate      |
