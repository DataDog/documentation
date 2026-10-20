---
title: Dashboards
description: Manage all your dashboards, as well as access to your shared dashboards, through the API. See the Dashboards page for more information.
breadcrumbs: Docs > API > Dashboards
---

> For the complete documentation index, see [llms.txt](https://docs.datadoghq.com/llms.txt).

# Dashboards

Manage all your dashboards, as well as access to your shared dashboards, through the API. See the [Dashboards page](https://docs.datadoghq.com/dashboards.md) for more information.

## [Create a new dashboard](https://docs.datadoghq.com/api/latest/dashboards/create-a-new-dashboard.md)

| Datadog site      | API endpoint                                        |
| ----------------- | --------------------------------------------------- |
| app.datadoghq.com | POST https://api.datadoghq.com/api/v1/dashboard     |
| us3.datadoghq.com | POST https://api.us3.datadoghq.com/api/v1/dashboard |
| us5.datadoghq.com | POST https://api.us5.datadoghq.com/api/v1/dashboard |
| app.datadoghq.eu  | POST https://api.datadoghq.eu/api/v1/dashboard      |
| ap1.datadoghq.com | POST https://api.ap1.datadoghq.com/api/v1/dashboard |
| ap2.datadoghq.com | POST https://api.ap2.datadoghq.com/api/v1/dashboard |
| app.ddog-gov.com  | POST https://api.ddog-gov.com/api/v1/dashboard      |

## [Get a dashboard](https://docs.datadoghq.com/api/latest/dashboards/get-a-dashboard.md)

| Datadog site      | API endpoint                                                      |
| ----------------- | ----------------------------------------------------------------- |
| app.datadoghq.com | GET https://api.datadoghq.com/api/v1/dashboard/{dashboard_id}     |
| us3.datadoghq.com | GET https://api.us3.datadoghq.com/api/v1/dashboard/{dashboard_id} |
| us5.datadoghq.com | GET https://api.us5.datadoghq.com/api/v1/dashboard/{dashboard_id} |
| app.datadoghq.eu  | GET https://api.datadoghq.eu/api/v1/dashboard/{dashboard_id}      |
| ap1.datadoghq.com | GET https://api.ap1.datadoghq.com/api/v1/dashboard/{dashboard_id} |
| ap2.datadoghq.com | GET https://api.ap2.datadoghq.com/api/v1/dashboard/{dashboard_id} |
| app.ddog-gov.com  | GET https://api.ddog-gov.com/api/v1/dashboard/{dashboard_id}      |

## [Get all dashboards](https://docs.datadoghq.com/api/latest/dashboards/get-all-dashboards.md)

| Datadog site      | API endpoint                                       |
| ----------------- | -------------------------------------------------- |
| app.datadoghq.com | GET https://api.datadoghq.com/api/v1/dashboard     |
| us3.datadoghq.com | GET https://api.us3.datadoghq.com/api/v1/dashboard |
| us5.datadoghq.com | GET https://api.us5.datadoghq.com/api/v1/dashboard |
| app.datadoghq.eu  | GET https://api.datadoghq.eu/api/v1/dashboard      |
| ap1.datadoghq.com | GET https://api.ap1.datadoghq.com/api/v1/dashboard |
| ap2.datadoghq.com | GET https://api.ap2.datadoghq.com/api/v1/dashboard |
| app.ddog-gov.com  | GET https://api.ddog-gov.com/api/v1/dashboard      |

## [Update a dashboard](https://docs.datadoghq.com/api/latest/dashboards/update-a-dashboard.md)

| Datadog site      | API endpoint                                                      |
| ----------------- | ----------------------------------------------------------------- |
| app.datadoghq.com | PUT https://api.datadoghq.com/api/v1/dashboard/{dashboard_id}     |
| us3.datadoghq.com | PUT https://api.us3.datadoghq.com/api/v1/dashboard/{dashboard_id} |
| us5.datadoghq.com | PUT https://api.us5.datadoghq.com/api/v1/dashboard/{dashboard_id} |
| app.datadoghq.eu  | PUT https://api.datadoghq.eu/api/v1/dashboard/{dashboard_id}      |
| ap1.datadoghq.com | PUT https://api.ap1.datadoghq.com/api/v1/dashboard/{dashboard_id} |
| ap2.datadoghq.com | PUT https://api.ap2.datadoghq.com/api/v1/dashboard/{dashboard_id} |
| app.ddog-gov.com  | PUT https://api.ddog-gov.com/api/v1/dashboard/{dashboard_id}      |

## [Delete a dashboard](https://docs.datadoghq.com/api/latest/dashboards/delete-a-dashboard.md)

| Datadog site      | API endpoint                                                         |
| ----------------- | -------------------------------------------------------------------- |
| app.datadoghq.com | DELETE https://api.datadoghq.com/api/v1/dashboard/{dashboard_id}     |
| us3.datadoghq.com | DELETE https://api.us3.datadoghq.com/api/v1/dashboard/{dashboard_id} |
| us5.datadoghq.com | DELETE https://api.us5.datadoghq.com/api/v1/dashboard/{dashboard_id} |
| app.datadoghq.eu  | DELETE https://api.datadoghq.eu/api/v1/dashboard/{dashboard_id}      |
| ap1.datadoghq.com | DELETE https://api.ap1.datadoghq.com/api/v1/dashboard/{dashboard_id} |
| ap2.datadoghq.com | DELETE https://api.ap2.datadoghq.com/api/v1/dashboard/{dashboard_id} |
| app.ddog-gov.com  | DELETE https://api.ddog-gov.com/api/v1/dashboard/{dashboard_id}      |

## [Delete dashboards](https://docs.datadoghq.com/api/latest/dashboards/delete-dashboards.md)

| Datadog site      | API endpoint                                          |
| ----------------- | ----------------------------------------------------- |
| app.datadoghq.com | DELETE https://api.datadoghq.com/api/v1/dashboard     |
| us3.datadoghq.com | DELETE https://api.us3.datadoghq.com/api/v1/dashboard |
| us5.datadoghq.com | DELETE https://api.us5.datadoghq.com/api/v1/dashboard |
| app.datadoghq.eu  | DELETE https://api.datadoghq.eu/api/v1/dashboard      |
| ap1.datadoghq.com | DELETE https://api.ap1.datadoghq.com/api/v1/dashboard |
| ap2.datadoghq.com | DELETE https://api.ap2.datadoghq.com/api/v1/dashboard |
| app.ddog-gov.com  | DELETE https://api.ddog-gov.com/api/v1/dashboard      |

## [Restore deleted dashboards](https://docs.datadoghq.com/api/latest/dashboards/restore-deleted-dashboards.md)

| Datadog site      | API endpoint                                         |
| ----------------- | ---------------------------------------------------- |
| app.datadoghq.com | PATCH https://api.datadoghq.com/api/v1/dashboard     |
| us3.datadoghq.com | PATCH https://api.us3.datadoghq.com/api/v1/dashboard |
| us5.datadoghq.com | PATCH https://api.us5.datadoghq.com/api/v1/dashboard |
| app.datadoghq.eu  | PATCH https://api.datadoghq.eu/api/v1/dashboard      |
| ap1.datadoghq.com | PATCH https://api.ap1.datadoghq.com/api/v1/dashboard |
| ap2.datadoghq.com | PATCH https://api.ap2.datadoghq.com/api/v1/dashboard |
| app.ddog-gov.com  | PATCH https://api.ddog-gov.com/api/v1/dashboard      |

## [Create a shared dashboard](https://docs.datadoghq.com/api/latest/dashboards/create-a-shared-dashboard.md)

| Datadog site      | API endpoint                                               |
| ----------------- | ---------------------------------------------------------- |
| app.datadoghq.com | POST https://api.datadoghq.com/api/v1/dashboard/public     |
| us3.datadoghq.com | POST https://api.us3.datadoghq.com/api/v1/dashboard/public |
| us5.datadoghq.com | POST https://api.us5.datadoghq.com/api/v1/dashboard/public |
| app.datadoghq.eu  | POST https://api.datadoghq.eu/api/v1/dashboard/public      |
| ap1.datadoghq.com | POST https://api.ap1.datadoghq.com/api/v1/dashboard/public |
| ap2.datadoghq.com | POST https://api.ap2.datadoghq.com/api/v1/dashboard/public |
| app.ddog-gov.com  | POST https://api.ddog-gov.com/api/v1/dashboard/public      |

## [Get a shared dashboard](https://docs.datadoghq.com/api/latest/dashboards/get-a-shared-dashboard.md)

| Datadog site      | API endpoint                                                      |
| ----------------- | ----------------------------------------------------------------- |
| app.datadoghq.com | GET https://api.datadoghq.com/api/v1/dashboard/public/{token}     |
| us3.datadoghq.com | GET https://api.us3.datadoghq.com/api/v1/dashboard/public/{token} |
| us5.datadoghq.com | GET https://api.us5.datadoghq.com/api/v1/dashboard/public/{token} |
| app.datadoghq.eu  | GET https://api.datadoghq.eu/api/v1/dashboard/public/{token}      |
| ap1.datadoghq.com | GET https://api.ap1.datadoghq.com/api/v1/dashboard/public/{token} |
| ap2.datadoghq.com | GET https://api.ap2.datadoghq.com/api/v1/dashboard/public/{token} |
| app.ddog-gov.com  | GET https://api.ddog-gov.com/api/v1/dashboard/public/{token}      |

## [Update a shared dashboard](https://docs.datadoghq.com/api/latest/dashboards/update-a-shared-dashboard.md)

| Datadog site      | API endpoint                                                      |
| ----------------- | ----------------------------------------------------------------- |
| app.datadoghq.com | PUT https://api.datadoghq.com/api/v1/dashboard/public/{token}     |
| us3.datadoghq.com | PUT https://api.us3.datadoghq.com/api/v1/dashboard/public/{token} |
| us5.datadoghq.com | PUT https://api.us5.datadoghq.com/api/v1/dashboard/public/{token} |
| app.datadoghq.eu  | PUT https://api.datadoghq.eu/api/v1/dashboard/public/{token}      |
| ap1.datadoghq.com | PUT https://api.ap1.datadoghq.com/api/v1/dashboard/public/{token} |
| ap2.datadoghq.com | PUT https://api.ap2.datadoghq.com/api/v1/dashboard/public/{token} |
| app.ddog-gov.com  | PUT https://api.ddog-gov.com/api/v1/dashboard/public/{token}      |

## [Send shared dashboard invitation email](https://docs.datadoghq.com/api/latest/dashboards/send-shared-dashboard-invitation-email.md)

| Datadog site      | API endpoint                                                                  |
| ----------------- | ----------------------------------------------------------------------------- |
| app.datadoghq.com | POST https://api.datadoghq.com/api/v1/dashboard/public/{token}/invitation     |
| us3.datadoghq.com | POST https://api.us3.datadoghq.com/api/v1/dashboard/public/{token}/invitation |
| us5.datadoghq.com | POST https://api.us5.datadoghq.com/api/v1/dashboard/public/{token}/invitation |
| app.datadoghq.eu  | POST https://api.datadoghq.eu/api/v1/dashboard/public/{token}/invitation      |
| ap1.datadoghq.com | POST https://api.ap1.datadoghq.com/api/v1/dashboard/public/{token}/invitation |
| ap2.datadoghq.com | POST https://api.ap2.datadoghq.com/api/v1/dashboard/public/{token}/invitation |
| app.ddog-gov.com  | POST https://api.ddog-gov.com/api/v1/dashboard/public/{token}/invitation      |

## [Get all invitations for a shared dashboard](https://docs.datadoghq.com/api/latest/dashboards/get-all-invitations-for-a-shared-dashboard.md)

| Datadog site      | API endpoint                                                                 |
| ----------------- | ---------------------------------------------------------------------------- |
| app.datadoghq.com | GET https://api.datadoghq.com/api/v1/dashboard/public/{token}/invitation     |
| us3.datadoghq.com | GET https://api.us3.datadoghq.com/api/v1/dashboard/public/{token}/invitation |
| us5.datadoghq.com | GET https://api.us5.datadoghq.com/api/v1/dashboard/public/{token}/invitation |
| app.datadoghq.eu  | GET https://api.datadoghq.eu/api/v1/dashboard/public/{token}/invitation      |
| ap1.datadoghq.com | GET https://api.ap1.datadoghq.com/api/v1/dashboard/public/{token}/invitation |
| ap2.datadoghq.com | GET https://api.ap2.datadoghq.com/api/v1/dashboard/public/{token}/invitation |
| app.ddog-gov.com  | GET https://api.ddog-gov.com/api/v1/dashboard/public/{token}/invitation      |

## [Revoke a shared dashboard URL](https://docs.datadoghq.com/api/latest/dashboards/revoke-a-shared-dashboard-url.md)

| Datadog site      | API endpoint                                                         |
| ----------------- | -------------------------------------------------------------------- |
| app.datadoghq.com | DELETE https://api.datadoghq.com/api/v1/dashboard/public/{token}     |
| us3.datadoghq.com | DELETE https://api.us3.datadoghq.com/api/v1/dashboard/public/{token} |
| us5.datadoghq.com | DELETE https://api.us5.datadoghq.com/api/v1/dashboard/public/{token} |
| app.datadoghq.eu  | DELETE https://api.datadoghq.eu/api/v1/dashboard/public/{token}      |
| ap1.datadoghq.com | DELETE https://api.ap1.datadoghq.com/api/v1/dashboard/public/{token} |
| ap2.datadoghq.com | DELETE https://api.ap2.datadoghq.com/api/v1/dashboard/public/{token} |
| app.ddog-gov.com  | DELETE https://api.ddog-gov.com/api/v1/dashboard/public/{token}      |

## [Revoke shared dashboard invitations](https://docs.datadoghq.com/api/latest/dashboards/revoke-shared-dashboard-invitations.md)

| Datadog site      | API endpoint                                                                    |
| ----------------- | ------------------------------------------------------------------------------- |
| app.datadoghq.com | DELETE https://api.datadoghq.com/api/v1/dashboard/public/{token}/invitation     |
| us3.datadoghq.com | DELETE https://api.us3.datadoghq.com/api/v1/dashboard/public/{token}/invitation |
| us5.datadoghq.com | DELETE https://api.us5.datadoghq.com/api/v1/dashboard/public/{token}/invitation |
| app.datadoghq.eu  | DELETE https://api.datadoghq.eu/api/v1/dashboard/public/{token}/invitation      |
| ap1.datadoghq.com | DELETE https://api.ap1.datadoghq.com/api/v1/dashboard/public/{token}/invitation |
| ap2.datadoghq.com | DELETE https://api.ap2.datadoghq.com/api/v1/dashboard/public/{token}/invitation |
| app.ddog-gov.com  | DELETE https://api.ddog-gov.com/api/v1/dashboard/public/{token}/invitation      |
