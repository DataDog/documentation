---
title: Monitors
description: Monitors allow you to watch a metric or check that you care about and notifies your team when a defined threshold has exceeded. For more information, see…
breadcrumbs: Docs > API > Monitors
---

> For the complete documentation index, see [llms.txt](https://docs.datadoghq.com/llms.txt).

# Monitors

[Monitors](https://docs.datadoghq.com/monitors) allow you to watch a metric or check that you care about and
notifies your team when a defined threshold has exceeded.

For more information, see [Creating Monitors](https://docs.datadoghq.com/monitors/create/types/).

**Note:** `curl` commands require [url encoding](https://curl.se/docs/url-syntax.html).

## [Create a monitor](/api/latest/monitors/create-a-monitor/)

| Datadog site      | API endpoint                                          |
| ----------------- | ----------------------------------------------------- |
| app.datadoghq.com | **POST** https://api.datadoghq.com/api/v1/monitor     |
| us3.datadoghq.com | **POST** https://api.us3.datadoghq.com/api/v1/monitor |
| us5.datadoghq.com | **POST** https://api.us5.datadoghq.com/api/v1/monitor |
| app.datadoghq.eu  | **POST** https://api.datadoghq.eu/api/v1/monitor      |
| ap1.datadoghq.com | **POST** https://api.ap1.datadoghq.com/api/v1/monitor |
| ap2.datadoghq.com | **POST** https://api.ap2.datadoghq.com/api/v1/monitor |
| app.ddog-gov.com  | **POST** https://api.ddog-gov.com/api/v1/monitor      |

## [Get all monitors](/api/latest/monitors/get-all-monitors/)

| Datadog site      | API endpoint                                         |
| ----------------- | ---------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v1/monitor     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v1/monitor |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v1/monitor |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v1/monitor      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v1/monitor |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v1/monitor |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v1/monitor      |

## [Edit a monitor](/api/latest/monitors/edit-a-monitor/)

| Datadog site      | API endpoint                                                      |
| ----------------- | ----------------------------------------------------------------- |
| app.datadoghq.com | **PUT** https://api.datadoghq.com/api/v1/monitor/{monitor_id}     |
| us3.datadoghq.com | **PUT** https://api.us3.datadoghq.com/api/v1/monitor/{monitor_id} |
| us5.datadoghq.com | **PUT** https://api.us5.datadoghq.com/api/v1/monitor/{monitor_id} |
| app.datadoghq.eu  | **PUT** https://api.datadoghq.eu/api/v1/monitor/{monitor_id}      |
| ap1.datadoghq.com | **PUT** https://api.ap1.datadoghq.com/api/v1/monitor/{monitor_id} |
| ap2.datadoghq.com | **PUT** https://api.ap2.datadoghq.com/api/v1/monitor/{monitor_id} |
| app.ddog-gov.com  | **PUT** https://api.ddog-gov.com/api/v1/monitor/{monitor_id}      |

## [Get a monitor's details](/api/latest/monitors/get-a-monitor-s-details/)

| Datadog site      | API endpoint                                                      |
| ----------------- | ----------------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v1/monitor/{monitor_id}     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v1/monitor/{monitor_id} |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v1/monitor/{monitor_id} |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v1/monitor/{monitor_id}      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v1/monitor/{monitor_id} |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v1/monitor/{monitor_id} |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v1/monitor/{monitor_id}      |

## [Delete a monitor](/api/latest/monitors/delete-a-monitor/)

| Datadog site      | API endpoint                                                         |
| ----------------- | -------------------------------------------------------------------- |
| app.datadoghq.com | **DELETE** https://api.datadoghq.com/api/v1/monitor/{monitor_id}     |
| us3.datadoghq.com | **DELETE** https://api.us3.datadoghq.com/api/v1/monitor/{monitor_id} |
| us5.datadoghq.com | **DELETE** https://api.us5.datadoghq.com/api/v1/monitor/{monitor_id} |
| app.datadoghq.eu  | **DELETE** https://api.datadoghq.eu/api/v1/monitor/{monitor_id}      |
| ap1.datadoghq.com | **DELETE** https://api.ap1.datadoghq.com/api/v1/monitor/{monitor_id} |
| ap2.datadoghq.com | **DELETE** https://api.ap2.datadoghq.com/api/v1/monitor/{monitor_id} |
| app.ddog-gov.com  | **DELETE** https://api.ddog-gov.com/api/v1/monitor/{monitor_id}      |

## [Check if a monitor can be deleted](/api/latest/monitors/check-if-a-monitor-can-be-deleted/)

| Datadog site      | API endpoint                                                    |
| ----------------- | --------------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v1/monitor/can_delete     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v1/monitor/can_delete |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v1/monitor/can_delete |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v1/monitor/can_delete      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v1/monitor/can_delete |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v1/monitor/can_delete |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v1/monitor/can_delete      |

## [Validate a monitor](/api/latest/monitors/validate-a-monitor/)

| Datadog site      | API endpoint                                                   |
| ----------------- | -------------------------------------------------------------- |
| app.datadoghq.com | **POST** https://api.datadoghq.com/api/v1/monitor/validate     |
| us3.datadoghq.com | **POST** https://api.us3.datadoghq.com/api/v1/monitor/validate |
| us5.datadoghq.com | **POST** https://api.us5.datadoghq.com/api/v1/monitor/validate |
| app.datadoghq.eu  | **POST** https://api.datadoghq.eu/api/v1/monitor/validate      |
| ap1.datadoghq.com | **POST** https://api.ap1.datadoghq.com/api/v1/monitor/validate |
| ap2.datadoghq.com | **POST** https://api.ap2.datadoghq.com/api/v1/monitor/validate |
| app.ddog-gov.com  | **POST** https://api.ddog-gov.com/api/v1/monitor/validate      |

## [Validate an existing monitor](/api/latest/monitors/validate-an-existing-monitor/)

| Datadog site      | API endpoint                                                                |
| ----------------- | --------------------------------------------------------------------------- |
| app.datadoghq.com | **POST** https://api.datadoghq.com/api/v1/monitor/{monitor_id}/validate     |
| us3.datadoghq.com | **POST** https://api.us3.datadoghq.com/api/v1/monitor/{monitor_id}/validate |
| us5.datadoghq.com | **POST** https://api.us5.datadoghq.com/api/v1/monitor/{monitor_id}/validate |
| app.datadoghq.eu  | **POST** https://api.datadoghq.eu/api/v1/monitor/{monitor_id}/validate      |
| ap1.datadoghq.com | **POST** https://api.ap1.datadoghq.com/api/v1/monitor/{monitor_id}/validate |
| ap2.datadoghq.com | **POST** https://api.ap2.datadoghq.com/api/v1/monitor/{monitor_id}/validate |
| app.ddog-gov.com  | **POST** https://api.ddog-gov.com/api/v1/monitor/{monitor_id}/validate      |

## [Get a monitor configuration policy](/api/latest/monitors/get-a-monitor-configuration-policy/)

| Datadog site      | API endpoint                                                            |
| ----------------- | ----------------------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v2/monitor/policy/{policy_id}     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v2/monitor/policy/{policy_id} |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v2/monitor/policy/{policy_id} |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v2/monitor/policy/{policy_id}      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v2/monitor/policy/{policy_id} |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v2/monitor/policy/{policy_id} |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v2/monitor/policy/{policy_id}      |

## [Monitors search](/api/latest/monitors/monitors-search/)

| Datadog site      | API endpoint                                                |
| ----------------- | ----------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v1/monitor/search     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v1/monitor/search |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v1/monitor/search |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v1/monitor/search      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v1/monitor/search |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v1/monitor/search |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v1/monitor/search      |

## [Get all monitor configuration policies](/api/latest/monitors/get-all-monitor-configuration-policies/)

| Datadog site      | API endpoint                                                |
| ----------------- | ----------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v2/monitor/policy     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v2/monitor/policy |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v2/monitor/policy |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v2/monitor/policy      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v2/monitor/policy |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v2/monitor/policy |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v2/monitor/policy      |

## [Monitors group search](/api/latest/monitors/monitors-group-search/)

| Datadog site      | API endpoint                                                       |
| ----------------- | ------------------------------------------------------------------ |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v1/monitor/groups/search     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v1/monitor/groups/search |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v1/monitor/groups/search |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v1/monitor/groups/search      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v1/monitor/groups/search |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v1/monitor/groups/search |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v1/monitor/groups/search      |

## [Create a monitor configuration policy](/api/latest/monitors/create-a-monitor-configuration-policy/)

| Datadog site      | API endpoint                                                 |
| ----------------- | ------------------------------------------------------------ |
| app.datadoghq.com | **POST** https://api.datadoghq.com/api/v2/monitor/policy     |
| us3.datadoghq.com | **POST** https://api.us3.datadoghq.com/api/v2/monitor/policy |
| us5.datadoghq.com | **POST** https://api.us5.datadoghq.com/api/v2/monitor/policy |
| app.datadoghq.eu  | **POST** https://api.datadoghq.eu/api/v2/monitor/policy      |
| ap1.datadoghq.com | **POST** https://api.ap1.datadoghq.com/api/v2/monitor/policy |
| ap2.datadoghq.com | **POST** https://api.ap2.datadoghq.com/api/v2/monitor/policy |
| app.ddog-gov.com  | **POST** https://api.ddog-gov.com/api/v2/monitor/policy      |

## [Unmute a monitor](/api/latest/monitors/unmute-a-monitor/)

| Datadog site      | API endpoint                                                              |
| ----------------- | ------------------------------------------------------------------------- |
| app.datadoghq.com | **POST** https://api.datadoghq.com/api/v1/monitor/{monitor_id}/unmute     |
| us3.datadoghq.com | **POST** https://api.us3.datadoghq.com/api/v1/monitor/{monitor_id}/unmute |
| us5.datadoghq.com | **POST** https://api.us5.datadoghq.com/api/v1/monitor/{monitor_id}/unmute |
| app.datadoghq.eu  | **POST** https://api.datadoghq.eu/api/v1/monitor/{monitor_id}/unmute      |
| ap1.datadoghq.com | **POST** https://api.ap1.datadoghq.com/api/v1/monitor/{monitor_id}/unmute |
| ap2.datadoghq.com | **POST** https://api.ap2.datadoghq.com/api/v1/monitor/{monitor_id}/unmute |
| app.ddog-gov.com  | **POST** https://api.ddog-gov.com/api/v1/monitor/{monitor_id}/unmute      |

## [Edit a monitor configuration policy](/api/latest/monitors/edit-a-monitor-configuration-policy/)

| Datadog site      | API endpoint                                                              |
| ----------------- | ------------------------------------------------------------------------- |
| app.datadoghq.com | **PATCH** https://api.datadoghq.com/api/v2/monitor/policy/{policy_id}     |
| us3.datadoghq.com | **PATCH** https://api.us3.datadoghq.com/api/v2/monitor/policy/{policy_id} |
| us5.datadoghq.com | **PATCH** https://api.us5.datadoghq.com/api/v2/monitor/policy/{policy_id} |
| app.datadoghq.eu  | **PATCH** https://api.datadoghq.eu/api/v2/monitor/policy/{policy_id}      |
| ap1.datadoghq.com | **PATCH** https://api.ap1.datadoghq.com/api/v2/monitor/policy/{policy_id} |
| ap2.datadoghq.com | **PATCH** https://api.ap2.datadoghq.com/api/v2/monitor/policy/{policy_id} |
| app.ddog-gov.com  | **PATCH** https://api.ddog-gov.com/api/v2/monitor/policy/{policy_id}      |

## [Mute a monitor](/api/latest/monitors/mute-a-monitor/)

| Datadog site      | API endpoint                                                            |
| ----------------- | ----------------------------------------------------------------------- |
| app.datadoghq.com | **POST** https://api.datadoghq.com/api/v1/monitor/{monitor_id}/mute     |
| us3.datadoghq.com | **POST** https://api.us3.datadoghq.com/api/v1/monitor/{monitor_id}/mute |
| us5.datadoghq.com | **POST** https://api.us5.datadoghq.com/api/v1/monitor/{monitor_id}/mute |
| app.datadoghq.eu  | **POST** https://api.datadoghq.eu/api/v1/monitor/{monitor_id}/mute      |
| ap1.datadoghq.com | **POST** https://api.ap1.datadoghq.com/api/v1/monitor/{monitor_id}/mute |
| ap2.datadoghq.com | **POST** https://api.ap2.datadoghq.com/api/v1/monitor/{monitor_id}/mute |
| app.ddog-gov.com  | **POST** https://api.ddog-gov.com/api/v1/monitor/{monitor_id}/mute      |

## [Delete a monitor configuration policy](/api/latest/monitors/delete-a-monitor-configuration-policy/)

| Datadog site      | API endpoint                                                               |
| ----------------- | -------------------------------------------------------------------------- |
| app.datadoghq.com | **DELETE** https://api.datadoghq.com/api/v2/monitor/policy/{policy_id}     |
| us3.datadoghq.com | **DELETE** https://api.us3.datadoghq.com/api/v2/monitor/policy/{policy_id} |
| us5.datadoghq.com | **DELETE** https://api.us5.datadoghq.com/api/v2/monitor/policy/{policy_id} |
| app.datadoghq.eu  | **DELETE** https://api.datadoghq.eu/api/v2/monitor/policy/{policy_id}      |
| ap1.datadoghq.com | **DELETE** https://api.ap1.datadoghq.com/api/v2/monitor/policy/{policy_id} |
| ap2.datadoghq.com | **DELETE** https://api.ap2.datadoghq.com/api/v2/monitor/policy/{policy_id} |
| app.ddog-gov.com  | **DELETE** https://api.ddog-gov.com/api/v2/monitor/policy/{policy_id}      |

## [Unmute all monitors](/api/latest/monitors/unmute-all-monitors/) (deprecated)

| Datadog site      | API endpoint                                                 |
| ----------------- | ------------------------------------------------------------ |
| app.datadoghq.com | **POST** https://api.datadoghq.com/v1/monitor/unmute_all     |
| us3.datadoghq.com | **POST** https://api.us3.datadoghq.com/v1/monitor/unmute_all |
| us5.datadoghq.com | **POST** https://api.us5.datadoghq.com/v1/monitor/unmute_all |
| app.datadoghq.eu  | **POST** https://api.datadoghq.eu/v1/monitor/unmute_all      |
| ap1.datadoghq.com | **POST** https://api.ap1.datadoghq.com/v1/monitor/unmute_all |
| ap2.datadoghq.com | **POST** https://api.ap2.datadoghq.com/v1/monitor/unmute_all |
| app.ddog-gov.com  | **POST** https://api.ddog-gov.com/v1/monitor/unmute_all      |

## [Get a monitor notification rule](/api/latest/monitors/get-a-monitor-notification-rule/)

| Datadog site      | API endpoint                                                                     |
| ----------------- | -------------------------------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v2/monitor/notification_rule/{rule_id}     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v2/monitor/notification_rule/{rule_id} |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v2/monitor/notification_rule/{rule_id} |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v2/monitor/notification_rule/{rule_id}      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v2/monitor/notification_rule/{rule_id} |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v2/monitor/notification_rule/{rule_id} |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v2/monitor/notification_rule/{rule_id}      |

## [Mute all monitors](/api/latest/monitors/mute-all-monitors/) (deprecated)

| Datadog site      | API endpoint                                               |
| ----------------- | ---------------------------------------------------------- |
| app.datadoghq.com | **POST** https://api.datadoghq.com/v1/monitor/mute_all     |
| us3.datadoghq.com | **POST** https://api.us3.datadoghq.com/v1/monitor/mute_all |
| us5.datadoghq.com | **POST** https://api.us5.datadoghq.com/v1/monitor/mute_all |
| app.datadoghq.eu  | **POST** https://api.datadoghq.eu/v1/monitor/mute_all      |
| ap1.datadoghq.com | **POST** https://api.ap1.datadoghq.com/v1/monitor/mute_all |
| ap2.datadoghq.com | **POST** https://api.ap2.datadoghq.com/v1/monitor/mute_all |
| app.ddog-gov.com  | **POST** https://api.ddog-gov.com/v1/monitor/mute_all      |

## [Get all monitor notification rules](/api/latest/monitors/get-all-monitor-notification-rules/)

| Datadog site      | API endpoint                                                           |
| ----------------- | ---------------------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v2/monitor/notification_rule     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v2/monitor/notification_rule |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v2/monitor/notification_rule |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v2/monitor/notification_rule      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v2/monitor/notification_rule |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v2/monitor/notification_rule |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v2/monitor/notification_rule      |

## [Create a monitor notification rule](/api/latest/monitors/create-a-monitor-notification-rule/)

| Datadog site      | API endpoint                                                            |
| ----------------- | ----------------------------------------------------------------------- |
| app.datadoghq.com | **POST** https://api.datadoghq.com/api/v2/monitor/notification_rule     |
| us3.datadoghq.com | **POST** https://api.us3.datadoghq.com/api/v2/monitor/notification_rule |
| us5.datadoghq.com | **POST** https://api.us5.datadoghq.com/api/v2/monitor/notification_rule |
| app.datadoghq.eu  | **POST** https://api.datadoghq.eu/api/v2/monitor/notification_rule      |
| ap1.datadoghq.com | **POST** https://api.ap1.datadoghq.com/api/v2/monitor/notification_rule |
| ap2.datadoghq.com | **POST** https://api.ap2.datadoghq.com/api/v2/monitor/notification_rule |
| app.ddog-gov.com  | **POST** https://api.ddog-gov.com/api/v2/monitor/notification_rule      |

## [Update a monitor notification rule](/api/latest/monitors/update-a-monitor-notification-rule/)

| Datadog site      | API endpoint                                                                       |
| ----------------- | ---------------------------------------------------------------------------------- |
| app.datadoghq.com | **PATCH** https://api.datadoghq.com/api/v2/monitor/notification_rule/{rule_id}     |
| us3.datadoghq.com | **PATCH** https://api.us3.datadoghq.com/api/v2/monitor/notification_rule/{rule_id} |
| us5.datadoghq.com | **PATCH** https://api.us5.datadoghq.com/api/v2/monitor/notification_rule/{rule_id} |
| app.datadoghq.eu  | **PATCH** https://api.datadoghq.eu/api/v2/monitor/notification_rule/{rule_id}      |
| ap1.datadoghq.com | **PATCH** https://api.ap1.datadoghq.com/api/v2/monitor/notification_rule/{rule_id} |
| ap2.datadoghq.com | **PATCH** https://api.ap2.datadoghq.com/api/v2/monitor/notification_rule/{rule_id} |
| app.ddog-gov.com  | **PATCH** https://api.ddog-gov.com/api/v2/monitor/notification_rule/{rule_id}      |

## [Delete a monitor notification rule](/api/latest/monitors/delete-a-monitor-notification-rule/)

| Datadog site      | API endpoint                                                                        |
| ----------------- | ----------------------------------------------------------------------------------- |
| app.datadoghq.com | **DELETE** https://api.datadoghq.com/api/v2/monitor/notification_rule/{rule_id}     |
| us3.datadoghq.com | **DELETE** https://api.us3.datadoghq.com/api/v2/monitor/notification_rule/{rule_id} |
| us5.datadoghq.com | **DELETE** https://api.us5.datadoghq.com/api/v2/monitor/notification_rule/{rule_id} |
| app.datadoghq.eu  | **DELETE** https://api.datadoghq.eu/api/v2/monitor/notification_rule/{rule_id}      |
| ap1.datadoghq.com | **DELETE** https://api.ap1.datadoghq.com/api/v2/monitor/notification_rule/{rule_id} |
| ap2.datadoghq.com | **DELETE** https://api.ap2.datadoghq.com/api/v2/monitor/notification_rule/{rule_id} |
| app.ddog-gov.com  | **DELETE** https://api.ddog-gov.com/api/v2/monitor/notification_rule/{rule_id}      |

## [Get a monitor user template](/api/latest/monitors/get-a-monitor-user-template/) (preview)

| Datadog site      | API endpoint                                                                |
| ----------------- | --------------------------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v2/monitor/template/{template_id}     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v2/monitor/template/{template_id} |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v2/monitor/template/{template_id} |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v2/monitor/template/{template_id}      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v2/monitor/template/{template_id} |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v2/monitor/template/{template_id} |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v2/monitor/template/{template_id}      |

## [Get all monitor user templates](/api/latest/monitors/get-all-monitor-user-templates/) (preview)

| Datadog site      | API endpoint                                                  |
| ----------------- | ------------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v2/monitor/template     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v2/monitor/template |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v2/monitor/template |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v2/monitor/template      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v2/monitor/template |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v2/monitor/template |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v2/monitor/template      |

## [Create a monitor user template](/api/latest/monitors/create-a-monitor-user-template/) (preview)

| Datadog site      | API endpoint                                                   |
| ----------------- | -------------------------------------------------------------- |
| app.datadoghq.com | **POST** https://api.datadoghq.com/api/v2/monitor/template     |
| us3.datadoghq.com | **POST** https://api.us3.datadoghq.com/api/v2/monitor/template |
| us5.datadoghq.com | **POST** https://api.us5.datadoghq.com/api/v2/monitor/template |
| app.datadoghq.eu  | **POST** https://api.datadoghq.eu/api/v2/monitor/template      |
| ap1.datadoghq.com | **POST** https://api.ap1.datadoghq.com/api/v2/monitor/template |
| ap2.datadoghq.com | **POST** https://api.ap2.datadoghq.com/api/v2/monitor/template |
| app.ddog-gov.com  | **POST** https://api.ddog-gov.com/api/v2/monitor/template      |

## [Update a monitor user template to a new version](/api/latest/monitors/update-a-monitor-user-template-to-a-new-version/) (preview)

| Datadog site      | API endpoint                                                                |
| ----------------- | --------------------------------------------------------------------------- |
| app.datadoghq.com | **PUT** https://api.datadoghq.com/api/v2/monitor/template/{template_id}     |
| us3.datadoghq.com | **PUT** https://api.us3.datadoghq.com/api/v2/monitor/template/{template_id} |
| us5.datadoghq.com | **PUT** https://api.us5.datadoghq.com/api/v2/monitor/template/{template_id} |
| app.datadoghq.eu  | **PUT** https://api.datadoghq.eu/api/v2/monitor/template/{template_id}      |
| ap1.datadoghq.com | **PUT** https://api.ap1.datadoghq.com/api/v2/monitor/template/{template_id} |
| ap2.datadoghq.com | **PUT** https://api.ap2.datadoghq.com/api/v2/monitor/template/{template_id} |
| app.ddog-gov.com  | **PUT** https://api.ddog-gov.com/api/v2/monitor/template/{template_id}      |

## [Delete a monitor user template](/api/latest/monitors/delete-a-monitor-user-template/) (preview)

| Datadog site      | API endpoint                                                                   |
| ----------------- | ------------------------------------------------------------------------------ |
| app.datadoghq.com | **DELETE** https://api.datadoghq.com/api/v2/monitor/template/{template_id}     |
| us3.datadoghq.com | **DELETE** https://api.us3.datadoghq.com/api/v2/monitor/template/{template_id} |
| us5.datadoghq.com | **DELETE** https://api.us5.datadoghq.com/api/v2/monitor/template/{template_id} |
| app.datadoghq.eu  | **DELETE** https://api.datadoghq.eu/api/v2/monitor/template/{template_id}      |
| ap1.datadoghq.com | **DELETE** https://api.ap1.datadoghq.com/api/v2/monitor/template/{template_id} |
| ap2.datadoghq.com | **DELETE** https://api.ap2.datadoghq.com/api/v2/monitor/template/{template_id} |
| app.ddog-gov.com  | **DELETE** https://api.ddog-gov.com/api/v2/monitor/template/{template_id}      |

## [Validate a monitor user template](/api/latest/monitors/validate-a-monitor-user-template/) (preview)

| Datadog site      | API endpoint                                                            |
| ----------------- | ----------------------------------------------------------------------- |
| app.datadoghq.com | **POST** https://api.datadoghq.com/api/v2/monitor/template/validate     |
| us3.datadoghq.com | **POST** https://api.us3.datadoghq.com/api/v2/monitor/template/validate |
| us5.datadoghq.com | **POST** https://api.us5.datadoghq.com/api/v2/monitor/template/validate |
| app.datadoghq.eu  | **POST** https://api.datadoghq.eu/api/v2/monitor/template/validate      |
| ap1.datadoghq.com | **POST** https://api.ap1.datadoghq.com/api/v2/monitor/template/validate |
| ap2.datadoghq.com | **POST** https://api.ap2.datadoghq.com/api/v2/monitor/template/validate |
| app.ddog-gov.com  | **POST** https://api.ddog-gov.com/api/v2/monitor/template/validate      |

## [Validate an existing monitor user template](/api/latest/monitors/validate-an-existing-monitor-user-template/) (preview)

| Datadog site      | API endpoint                                                                          |
| ----------------- | ------------------------------------------------------------------------------------- |
| app.datadoghq.com | **POST** https://api.datadoghq.com/api/v2/monitor/template/{template_id}/validate     |
| us3.datadoghq.com | **POST** https://api.us3.datadoghq.com/api/v2/monitor/template/{template_id}/validate |
| us5.datadoghq.com | **POST** https://api.us5.datadoghq.com/api/v2/monitor/template/{template_id}/validate |
| app.datadoghq.eu  | **POST** https://api.datadoghq.eu/api/v2/monitor/template/{template_id}/validate      |
| ap1.datadoghq.com | **POST** https://api.ap1.datadoghq.com/api/v2/monitor/template/{template_id}/validate |
| ap2.datadoghq.com | **POST** https://api.ap2.datadoghq.com/api/v2/monitor/template/{template_id}/validate |
| app.ddog-gov.com  | **POST** https://api.ddog-gov.com/api/v2/monitor/template/{template_id}/validate      |
