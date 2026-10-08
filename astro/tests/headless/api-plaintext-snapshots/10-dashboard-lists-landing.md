---
title: Dashboard Lists
description: Interact with your dashboard lists through the API to organize, find, and share all of your dashboards with your team and organization.
breadcrumbs: Docs > API > Dashboard Lists
---

> For the complete documentation index, see [llms.txt](https://docs.datadoghq.com/llms.txt).

# Dashboard Lists

{% alert level="warning" %}
This endpoint is deprecated.
{% /alert %}

Interact with your dashboard lists through the API to
organize, find, and share all of your dashboards with your team and
organization.

## [Get all dashboard lists](/api/latest/dashboard-lists/get-all-dashboard-lists/)

| Datadog site      | API endpoint                                                        |
| ----------------- | ------------------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v1/dashboard/lists/manual     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v1/dashboard/lists/manual |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v1/dashboard/lists/manual |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v1/dashboard/lists/manual      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v1/dashboard/lists/manual |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v1/dashboard/lists/manual |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v1/dashboard/lists/manual      |

## [Create a dashboard list](/api/latest/dashboard-lists/create-a-dashboard-list/)

| Datadog site      | API endpoint                                                         |
| ----------------- | -------------------------------------------------------------------- |
| app.datadoghq.com | **POST** https://api.datadoghq.com/api/v1/dashboard/lists/manual     |
| us3.datadoghq.com | **POST** https://api.us3.datadoghq.com/api/v1/dashboard/lists/manual |
| us5.datadoghq.com | **POST** https://api.us5.datadoghq.com/api/v1/dashboard/lists/manual |
| app.datadoghq.eu  | **POST** https://api.datadoghq.eu/api/v1/dashboard/lists/manual      |
| ap1.datadoghq.com | **POST** https://api.ap1.datadoghq.com/api/v1/dashboard/lists/manual |
| ap2.datadoghq.com | **POST** https://api.ap2.datadoghq.com/api/v1/dashboard/lists/manual |
| app.ddog-gov.com  | **POST** https://api.ddog-gov.com/api/v1/dashboard/lists/manual      |

## [Get a dashboard list](/api/latest/dashboard-lists/get-a-dashboard-list/)

| Datadog site      | API endpoint                                                                  |
| ----------------- | ----------------------------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v1/dashboard/lists/manual/{list_id}     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v1/dashboard/lists/manual/{list_id} |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v1/dashboard/lists/manual/{list_id} |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v1/dashboard/lists/manual/{list_id}      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v1/dashboard/lists/manual/{list_id} |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v1/dashboard/lists/manual/{list_id} |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v1/dashboard/lists/manual/{list_id}      |

## [Update a dashboard list](/api/latest/dashboard-lists/update-a-dashboard-list/)

| Datadog site      | API endpoint                                                                  |
| ----------------- | ----------------------------------------------------------------------------- |
| app.datadoghq.com | **PUT** https://api.datadoghq.com/api/v1/dashboard/lists/manual/{list_id}     |
| us3.datadoghq.com | **PUT** https://api.us3.datadoghq.com/api/v1/dashboard/lists/manual/{list_id} |
| us5.datadoghq.com | **PUT** https://api.us5.datadoghq.com/api/v1/dashboard/lists/manual/{list_id} |
| app.datadoghq.eu  | **PUT** https://api.datadoghq.eu/api/v1/dashboard/lists/manual/{list_id}      |
| ap1.datadoghq.com | **PUT** https://api.ap1.datadoghq.com/api/v1/dashboard/lists/manual/{list_id} |
| ap2.datadoghq.com | **PUT** https://api.ap2.datadoghq.com/api/v1/dashboard/lists/manual/{list_id} |
| app.ddog-gov.com  | **PUT** https://api.ddog-gov.com/api/v1/dashboard/lists/manual/{list_id}      |

## [Delete a dashboard list](/api/latest/dashboard-lists/delete-a-dashboard-list/)

| Datadog site      | API endpoint                                                                     |
| ----------------- | -------------------------------------------------------------------------------- |
| app.datadoghq.com | **DELETE** https://api.datadoghq.com/api/v1/dashboard/lists/manual/{list_id}     |
| us3.datadoghq.com | **DELETE** https://api.us3.datadoghq.com/api/v1/dashboard/lists/manual/{list_id} |
| us5.datadoghq.com | **DELETE** https://api.us5.datadoghq.com/api/v1/dashboard/lists/manual/{list_id} |
| app.datadoghq.eu  | **DELETE** https://api.datadoghq.eu/api/v1/dashboard/lists/manual/{list_id}      |
| ap1.datadoghq.com | **DELETE** https://api.ap1.datadoghq.com/api/v1/dashboard/lists/manual/{list_id} |
| ap2.datadoghq.com | **DELETE** https://api.ap2.datadoghq.com/api/v1/dashboard/lists/manual/{list_id} |
| app.ddog-gov.com  | **DELETE** https://api.ddog-gov.com/api/v1/dashboard/lists/manual/{list_id}      |
