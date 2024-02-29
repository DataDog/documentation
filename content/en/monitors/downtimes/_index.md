---
title: Downtimes
kind: documentation
description: "Schedule downtimes for your Datadog monitors to prevent alerts during specific time periods"
aliases:
- /monitors/notify/downtimes/
further_reading:
- link: "/monitors/guide/suppress-alert-with-downtimes"
  tag: "Guide"
  text: "Suppress alerts with downtimes"
- link: "/monitors/guide/scoping_downtimes"
  tag: "Guide"
  text: "Scoping downtimes schedules"
- link: "/monitors/"
  tag: "Documentation"
  text: "Create monitors"
- link: "/monitors/notify/"
  tag: "Documentation"
  text: "Monitor notifications"
---

## Overview

Schedule downtimes for system shutdowns, off-line maintenance, or upgrades without triggering your monitors. Downtimes silence all monitors' alerts and notifications, but do not prevent monitor states transitions.

{{< img src="/monitors/downtimes/downtime_overview.png" alt="Example of a downtime" style="width:100%;" >}}

## Setup

{{< tabs >}}

{{% tab "UI" %}}

### Create a new downtime schedule

To schedule a [monitor downtime][1] in Datadog navigate to _Monitors > Manage Downtimes_. Then, click the **Schedule Downtime** button in the upper right.

To mute an individual monitor, click the **Mute** button at the top of the monitor status page. This creates a downtime schedule for that particular monitor.

### Choose what to silence

Apply downtime schedules to specific monitors by [name](#by-monitor-name) or to a broad range of monitors by monitor [tags](#by-monitor-tags). Apply additional filters through the [*Group scope*](#downtime-scope). Click **Preview affected monitors** to see the monitors included. For more examples and use cases see  [Scoping downtimes schedules][2].

**Note**: Any monitor created or edited after the downtime is scheduled is automatically included in the downtime if it matches the scope.

{{< tabs >}}

{{% tab "By Monitor Name" %}}

Search or use the dropdown menu to choose which monitors to silence. If the field is left empty, all monitors are silenced by default. You can also select a scope to constrain your downtime to a specific host, device, or arbitrary tag. Only monitors that have **ALL selected scopes** are silenced.
{{% /tab %}}

{{% tab "By Monitor Tags" %}}

Schedule a downtime based on one or more [monitor tags][3]. The maximum number of tags that can be selected for a single downtime is 32. Each tag can be at most 256 characters long. Only monitors that have **ALL selected tags** are silenced. You can also select scopes for additional constraints.
{{% /tab %}}

{{% /tabs %}}

#### Downtime scope
Use group scope to apply additional filters to your downtime and have more control over which monitors to mute. The group scope of a downtime is matched after the monitor specific target. If you target multiple monitors by using monitor tags, it finds monitors that are tagged before it matches the group scope.

For instance, a monitor is looking at the average latency of all your services. You are planning on running an upgrade on the `web-store` service and are anticipating slow requests and potential errors.

You would like to make sure that `service:web-store` related notifications are muted and other critical alerts for the remaining services are delivered as usual. Enter `service:web-store` in the Downtime's group scope after selecting the monitor targets.

**Note**: this also works with groups that have multiple dimensions, for example `service` and `host`. Creating a Downtime on `service:web-store` would mute all groups that include said service, for example `service:web-store,host:a` or `service:web-store,host:b`.

#### Downtime scope syntax
The Downtime scope query follows the same common [Search Syntax][19] that many other products across the platform support. To include all groups in the scope of a Downtime, type `*` for the `Group scope`. Further examples of group scopes include:

| Downtime group scope | Explanation |
| ------------------- | ---------------------- |
| `service:web-store`       | Mutes all notifications about the `web-store` service. |
| `service:web-store AND env:dev`       | Mutes all notifications about the `web-store` service running on the `dev` environment. |
| `env:(dev OR staging)`       | Mutes any notification related to either the `dev` or `staging` environment. |
| `service:web-store AND env:(dev OR staging)`       | Mutes any notification related to the `web-store` service running in either the `dev` or `staging` environment. |
| `host:authentication-*`       | Mutes any notification that relates to a host whose name is prefixed with `authentication-`. |
| `host:*-prod-cluster`       | Mutes any notification that relates to a host whose name is suffixed with `-prod-cluster`. |
| `host:*-prod-cluster`       | Mutes any notification that relates to a host whose name is suffixed with `-prod-cluster`. |
| `service:webstore AND -env:prod`       | Mutes any notification about the `web-store` service that is **not** running on the `prod` environment. |

#### Downtime scope limitations
There are a few limitations that are **not supported** which include:

* More than two levels of nesting, e.g. `team:app AND (service:auth OR (service:graphics-writer AND (env:prod OR (type:metric AND status:ok))))`, are not supported. At most, Downtimes accept two levels of nesting. Use separate Downtimes instead to break down the logic.
* Negation is only supported for key/value pairs and tags with `OR`. For example, `-key:value` and `-key(A OR B)`. Scopes such as `-service:(A AND B)`, `service:(-A OR -B)`, or `-service(A B)` are not supported.
* Top level ORs are not supported, for example, `service:A OR host:X`. This requires two separate Downtimes.
* Keyless tags, such as `prod AND service:(A or B)` or just `prod`, aren't supported. Tags need to have a key, in this case for example `env:prod`.
* Question mark wildcards: `service:auth?` are not supported. Use `*` instead if you need to use wildcards.
* Invalid characters within the key: `en&v:prod` is not a valid Downtime scope and will be rejected.

### Set a downtime schedule

#### One Time

Set a one time downtime by entering the start date, time, and time zone. Optionally, set an end date and time.

{{< img src="monitors/downtimes/downtime_onetime.jpg" alt="fields for scheduling one time downtime" style="width:90%;">}}

#### Recurring

Recurring downtimes are useful for recurring maintenance windows. Set a recurring downtime by entering the start date, time, time zone, repeat, and duration. Optionally, specify an end date or number of occurrences.

When a single downtime of a recurring downtime ends, the single downtime is cancelled and a new downtime is created with the same constraints and updated start and end times. <br>
**Note**: The original creator is associated with all the newly created downtimes.

{{< img src="monitors/guide/downtime_business_hour_weekend.png" alt="Downtimes configuration using recurring schedule to mute alerts over the outside of business hours and during the weekend" style="width:100%;" >}}

Use [recurrence rules][6] (RRULEs) to define downtimes schedules. Use the official [RRULE generator][7] as a tool to generate recurring rules. A common use case is to use RRULES to define downtimes on specific days of the month, for example, on the third Monday of each month. For more use cases on recurrence, see the guide to [Suppress alerts with Downtimes][8].

**Note**: Attributes specifying the duration in RRULE are not supported (for example, `DTSTART`, `DTEND`, `DURATION`).

## Notifications
### Add a message

Enter a message to notify your team about this downtime. The message field allows standard markdown formatting and Datadog's `@-notification` syntax. See the [Notifications page][9] for more information on formatting options.

### Notify your team

Notify your team by specifying team members or send the message to a service [integration][10]. Datadog sends notifications to the specified destinations whenever the downtime is scheduled, started, cancelled, or expired. These audit notifications allows your team to be aware of the Downtimes in your system.

### Disable first recovery notification

By default, Datadog sends a recovery notification for monitors that trigger **before** a downtime and end up recovering **during** a downtime. This is useful when using third party integrations to automatically close opened incidents. Selecting the checkbox mutes these notifications.

{{< img src="monitors/downtimes/downtime_first_recovery.png" alt="mute first recovery notification" style="width:80%;">}}

The option to disable the first recovery notification is additive between multiple downtimes. For example, if multiple downtimes overlap and mute the same monitor, the first recovery notification is muted if **at least one** downtime checked the option to disable it.

**Note**: This option mutes the **first** recovery notification. If a monitor proceeds to trigger and recover again during a downtime, then the corresponding notifications are always muted, regardless of this option's settings.

## Manage

The [Manage Downtimes page][11] displays the list of active and scheduled downtimes. Select a downtime to view details, edit, or delete it. Details include its creator, its scope, and a list of the monitors it applies to.
Use the facets panel and the search bar to filter the list on the `Creator`, the `Scope`, `Monitor Tags`, or `Active`, `Automuted`, `Recurring` parameters.

{{< img src="monitors/downtimes/downtime_manage.png" alt="manage downtime page" style="width:100%;">}}

### History

Downtime history is viewable on the [Monitor Status][12] page as overlaid on the group transition history, and the [Events explorer][13] by searching for `tags:audit downtime`, or a specific downtime by ID with `tags:audit downtime_id:<DOWNTIME_ID>`.

### Muting

Monitors trigger events when they change between possible states: `ALERT`, `WARNING`, `RESOLVED`, and `NO DATA`. When a monitor is muted or has a scheduled downtime, transitions from `RESOLVED` to another state do **not** trigger events or notifications.

{{< img src="monitors/downtimes/downtime_on_alert.png" alt="Monitor status graph showing state transition to alert during downtime, will not create an alert event" style="width:80%;">}}

**Note**: Muting or un-muting a monitor from the monitor status page does not delete scheduled downtimes associated with the monitor. To edit or delete a downtime, use the [Manage Downtimes][1] page or the [API][14].

### Expiration

By default, if a monitor is in an alert-worthy state (`ALERT`, `WARNING`, or `NO DATA`) when a downtime expires, the monitor triggers a new notification. This applies to monitors that change state during downtime (such as from `OK` to `ALERT`, `WARNING`, or `NO DATA`), and to monitors that already have an alert-worthy state when downtime begins. If a downtime is manually canceled, notifications are not sent, even if the monitor has entered an alert-worthy state.

To override the default behavior, specify which notifications should be sent at the end of downtimes with the options in the "Notify Your Team" section. For downtimes created with the API, the default behavior is to exclude `is_cancelled` option.

{{< img src="monitors/downtimes/downtime_cancel_expire_notification.png" alt="Configure Notify your team section of a monitor with specific downtime conditions" style="width:100%;">}}

**Example 1:** If a monitor is in an alert state *before* downtime starts and *continues* for the duration of downtime:
1. During downtime, notifications for this alert are suppressed.
2. The monitor remains in an alert state (because the conditions are still met).
3. The downtime ends.
4. The alert conditions are still met, so a notification is sent.

**Example 2:** If a monitor is in an alert state *before* a downtime commences and recovers *during* that downtime:
1. The state transitions from `ALERT` to `OK`.
2. The recovery notification is sent during the downtime, but only for the first recovery during that downtime.

### Monitor report

All alerted states are included on the [weekly monitor report][15] even if the monitor is in a downtime.

## Auto-muting

Datadog can proactively mute monitors related to the manual shutdown of certain cloud workloads. The following scenarios of auto-muting for shutdown are supported:

- **[Amazon EC2 instances][16]** and instance termination by AWS autoscaling based on host statuses from the CloudWatch API.
- **[Google Compute Engine (GCE)][17]** instances and instance termination triggered by GCE autoscaling based on host statuses from the GCE API.
- **[Azure VMs][18]**, whether the shutdown was triggered manually or by Azure autoscaling, based on health statuses available through the Azure Resource Health API.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/downtimes
[2]: /monitors/guide/scoping_downtimes
[3]: /monitors/manage/#monitor-tags
[4]: /monitors/manage/search/
[5]: /monitors/configuration/?tab=thresholdalert#alert-grouping
[6]: https://icalendar.org/iCalendar-RFC-5545/3-8-5-3-recurrence-rule.html
[7]: https://icalendar.org/rrule-tool.html
[8]: /monitors/guide/suppress-alert-with-downtimes/
[9]: /monitors/notify/#overview
[10]: /integrations/#cat-notification
[11]: https://app.datadoghq.com/monitors/downtimes
[12]: /monitors/manage/status/
[13]: /service_management/events/explorer
[14]: /api/latest/downtimes/#cancel-a-downtime
[15]: /account_management/#preferences
[16]: /integrations/amazon_ec2/#ec2-automuting
[17]: /integrations/google_compute_engine/#gce-automuting
[18]: /integrations/azure_vm/#automuting-monitors
[19]: /logs/explorer/search_syntax/


{{% \tab }}

{{% tab "API" %}}

## Prerequisites

Since this guide describes the usage of the API, you will need an API key and an application key with admin privileges. These are available in your [Datadog account API key page][2].
Replace all occurrences of `<DATADOG_API_KEY>` and `<DATADOG_APP_KEY>` with your Datadog API key and your Datadog Application key, respectively.

This guide also assumes that you have a terminal with `CURL` and have reviewed the main [Downtime documentation page][3]

## Examples

### Downtime over the weekend

If you monitor services used only during the week, such as your company's ERP or accounting software, you may want to receive alerts only during the week.
With the following API call, you can mute alert during the weekend for all monitors over the `env:prod` tag.

{{< tabs >}}
{{% tab "API " %}}

```shell
curl -X POST "https://api.<DATADOG_SITE>/api/v2/downtime" \
-H "Content-type: application/json" \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d '{"data":{"type":"downtime","attributes":{"monitor_identifier":{"monitor_tags":["*"]},"scope":"env:prod","display_timezone":"Europe/Berlin","message":"","mute_first_recovery_notification":false,"notify_end_types":["expired","canceled"],"notify_end_states":["alert","warn","no data"],"schedule":{"timezone":"Europe/Berlin","recurrences":[{"start":"2023-09-16T00:00","duration":"24h","rrule":"FREQ=WEEKLY;INTERVAL=1;BYDAY=SA,SU"}]}}}'
```

Optionally, add a `message` to your Downtime to let others know the reason and purpose of the Downtime you are creating. For instance, `Muting all monitors in production environment over the weekend`.

Replace the placeholder value `<DATADOG_SITE>` with the site parameter of your Datadog account, see the [Datadog Sites][1] documentation. Replace the `start` and `end` parameter to match your wanted schedule. For example:

* `start=$(date +%s)`
* `end=$(date -v+24H +%s)`

And then in the cURL command, use: `"start": '"${start}"'`.

**Response:**

```json
{
  "data": {
    "id": "16d09s97-1a70-11ee-8319-dasan1997",
    "type": "downtime",
    "attributes": {
      "scope": "env:prod",
      "canceled": null,
      "schedule": {
        "current_downtime": {
          "start": "2023-09-16T22:00:00+00:00",
          "end": "2023-09-17T22:00:00+00:00"
        },
        "timezone": "Europe/Berlin",
        "recurrences": [
          {
            "start": "2023-09-16T00:00",
            "duration": "24h",
            "rrule": "FREQ=WEEKLY;INTERVAL=1;BYDAY=SA,SU"
          }
        ]
      },
      "notify_end_states": ["warn", "alert", "no data"],
      "monitor_identifier": { "monitor_tags": ["*"] },
      "status": "scheduled",
      "display_timezone": "Europe/Berlin",
      "notify_end_types": ["canceled", "expired"],
      "created": "2023-07-04T13:41:06.855440+00:00",
      "modified": "2023-07-04T13:41:06.855440+00:00",
      "mute_first_recovery_notification": false,
      "message": ""
    },
    [..]
  },
  [..]
}

```

[1]: https://docs.datadoghq.com/getting_started/site
{{% /tab %}}
{{% tab "UI" %}}

Open the [Manage Downtime page][1] and schedule a new downtime. Select `recurring`:

{{< img src="monitors/guide/downtimes_weekend.png" alt="Downtimes configuration using recurring schedule to mute alerts over the weekend" style="width:100%;" >}}

[1]: https://app.datadoghq.com/monitors#downtime
{{% /tab %}}
{{< /tabs >}}

### Downtime outside of business hours

Using the same example, you may want to also mute this service during the weekdays outside of business hours.

{{< tabs >}}
{{% tab "API " %}}

With the following API call, you can mute alerts every weekday from 8pm to 6am:

```shell
curl -X POST "https://api.<DATADOG_SITE>/api/v1/downtime" \
-H "Content-type: application/json" \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d '{"data":{"type":"downtime","attributes":{"monitor_identifier":{"monitor_tags":["*"]},"scope":"env:prod","display_timezone":"Europe/Berlin","message":"","mute_first_recovery_notification":false,"notify_end_types":["expired","canceled"],"notify_end_states":["alert","warn","no data"],"schedule":{"timezone":"Europe/Berlin","recurrences":[{"start":"2023-07-10T18:00","duration":"12h","rrule":"FREQ=DAILY;INTERVAL=1"}]}}},"_authentication_token":"b6c9ec89cdff687d29c0ee54923c52f57c9e102a"}'
```

Optionally, add a `message` to your Downtime to let others know the reason and purpose of the Downtime you are creating. Replace the placeholder value `<DATADOG_SITE>` with the site parameter of your Datadog account, see the [Datadog Sites][1] documentation. Replace the `start` and `end` parameter to match your wanted schedule.

**Response:**

```json
{
  "data": {
    "type": "downtime",
    "id": "16d09s97-1a70-11ee-8319-dasan1997",
    "attributes": {
      "message": "",
      "mute_first_recovery_notification": false,
      "canceled": null,
      "scope": "env:prod",
      "monitor_identifier": { "monitor_tags": ["*"] },
      "modified": "2023-07-05T08:12:17.145771+00:00",
      "created": "2023-07-05T08:12:17.145771+00:00",
      "status": "scheduled",
      "display_timezone": "Europe/Berlin",
      "schedule": {
        "recurrences": [
          {
            "duration": "12h",
            "rrule": "FREQ=DAILY;INTERVAL=1",
            "start": "2023-07-10T18:00"
          }
        ],
        "current_downtime": {
          "end": "2023-07-11T04:00:00+00:00",
          "start": "2023-07-10T16:00:00+00:00"
        },
        "timezone": "Europe/Berlin"
      },
      "notify_end_states": ["alert", "warn", "no data"],
      "notify_end_types": ["canceled", "expired"]
    },
    [..]
  },
  [..]
}
```

[1]: https://docs.datadoghq.com/getting_started/site
{{% /tab %}}
{{% tab "UI" %}}

Open the [Manage Downtime page][1] and schedule a new downtime. Select `recurring`:

{{< img src="monitors/guide/downtime_businesshour.png" alt="Downtimes configuration using recurring schedule to mute alerts outside of business hours" style="width:100%;" >}}

[1]: https://app.datadoghq.com/monitors#downtime
{{% /tab %}}
{{< /tabs >}}

### Combined downtime for outside business hours and weekend

For use cases where you only want monitor notifications during business hours, mute monitors during the week as well as during the weekend. This can be combined in a single Downtime. Continuing from the [Downtime outside of business hours](#downtime-outside-of-business-hours) example above:

{{< tabs >}}
{{% tab "API " %}}

With the following API call, you can mute alerts every weekday from 8pm to 6am as well as over the whole weekend:

```bash
curl -X POST "https://api.<DATADOG_SITE>/api/v1/downtime" \
-H "Content-type: application/json" \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d '{"data":{"type":"downtime","attributes":{"monitor_identifier":{"monitor_tags":["*"]},"scope":"env:prod","display_timezone":"Europe/Berlin","message":"","mute_first_recovery_notification":false,"notify_end_types":["expired","canceled"],"notify_end_states":["alert","warn","no data"],"schedule":{"timezone":"Europe/Berlin","recurrences":[{"start":"2023-07-09T18:00","duration":"12h","rrule":"FREQ=WEEKLY;INTERVAL=1;BYDAY=SU,MO,TU,WE,TH,FR"},{"start":"2023-07-09T00:00","duration":"24h","rrule":"FREQ=WEEKLY;INTERVAL=1;BYDAY=SA,SU"}]}}}'
```
Optionally, add a `message` to your Downtime to let others know the reason and purpose of the Downtime you are creating. Replace the placeholder value `<DATADOG_SITE>` with the site parameter of your Datadog account, see the [Datadog Sites][1] documentation. Replace the `start` and `end` parameter to match your wanted schedule.

**Response:**

```json
{
  "data": {
    "type": "downtime",
    "id": "16d09s97-1a70-11ee-8319-dasan1997",
    "attributes": {
      "monitor_identifier": { "monitor_tags": ["*"] },
      "created": "2023-07-05T08:36:00.917977+00:00",
      "message": "",
      "schedule": {
        "current_downtime": {
          "start": "2023-07-08T22:00:00+00:00",
          "end": "2023-07-10T04:00:00+00:00"
        },
        "timezone": "Europe/Berlin",
        "recurrences": [
          {
            "start": "2023-07-09T18:00",
            "duration": "12h",
            "rrule": "FREQ=WEEKLY;INTERVAL=1;BYDAY=SU,MO,TU,WE,TH,FR"
          },
          {
            "start": "2023-07-09T00:00",
            "duration": "24h",
            "rrule": "FREQ=WEEKLY;INTERVAL=1;BYDAY=SA,SU"
          }
        ]
      },
      "notify_end_states": ["alert", "warn", "no data"],
      "status": "scheduled",
      "scope": "env:prod",
      "modified": "2023-07-05T08:36:00.917977+00:00",
      "mute_first_recovery_notification": false,
      "notify_end_types": ["expired", "canceled"],
      "display_timezone": "Europe/Berlin",
      "canceled": null
    },
    [..]
  },
  [..]
}
```

[1]: https://docs.datadoghq.com/getting_started/site
{{% /tab %}}
{{% tab "UI" %}}

Open the [Manage Downtime page][1] and add a new downtime. Select `recurring`:

{{< img src="monitors/guide/downtime_business_hour_weekend.png" alt="Downtimes configuration using recurring schedule to mute alerts over the outside of business hours and during the weekend" style="width:100%;" >}}

[1]: https://app.datadoghq.com/monitors#downtime
{{% /tab %}}
{{< /tabs >}}

### Recurring downtime on the nth weekday of the month

To plan more advanced maintenance schedules, you can use RRULEs.

RRULE - or recurrence rule - is a property name from [iCalendar RFC][4], which is the standard for defining recurring events.

Attributes specifying the duration in `RRULE` are not supported (for example, `DTSTART`, `DTEND`, `DURATION`), see the [RFC][4] for the possible attributes. You can use [this tool][5] to generate RRULEs and paste them into your API call.

**Example**: The ERP app is updated every 2nd Tuesday of the month to apply patches and fixes between 8AM and 10AM. Monitors for this are scoped with `app:erp`, so this is used in the downtime scope.

{{< tabs >}}
{{% tab "API " %}}

The `start` and `end` parameters must match the expected start and end of the recurring rule's first day. So, assuming the first 2nd Tuesday of our rule is Tuesday, July 11th, the start date has to be July 11th 08:00 AM and a duration of two hours needs to be set.

**API call:**

```bash
curl -X POST "https://api.<DATADOG_SITE>/api/v1/downtime" \
-H "Content-type: application/json" \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d '{"data":{"type":"downtime","attributes":{"monitor_identifier":{"monitor_tags":["*"]},"scope":"env:prod","display_timezone":"Europe/Berlin","message":"","mute_first_recovery_notification":false,"notify_end_types":["expired","canceled"],"notify_end_states":["alert","warn","no data"],"schedule":{"timezone":"Europe/Berlin","recurrences":[{"start":"2023-07-11T08:00","duration":"2h","rrule":"FREQ=DAILY;INTERVAL=1;BYDAY=2TU"}]}}}'
```

Replace the placeholder value `<DATADOG_SITE>` with the site parameter of your Datadog account, see the [Datadog Sites][1] documentation. Replace the `start` and `end` parameter to match your wanted schedule.

**Response:**

```json
{
  "data": {
    "type": "downtime",
    "id": "16d09s97-1a70-11ee-8319-dasan1997",
    "attributes": {
      "mute_first_recovery_notification": false,
      "notify_end_types": ["canceled", "expired"],
      "created": "2023-07-05T08:50:19.678427+00:00",
      "display_timezone": "Europe/Berlin",
      "modified": "2023-07-05T08:50:19.678427+00:00",
      "status": "scheduled",
      "canceled": null,
      "notify_end_states": ["warn", "alert", "no data"],
      "message": "",
      "schedule": {
        "recurrences": [
          {
            "duration": "2h",
            "start": "2023-07-11T08:00",
            "rrule": "FREQ=DAILY;INTERVAL=1;BYDAY=2TU"
          }
        ],
        "current_downtime": {
          "end": "2023-07-11T08:00:00+00:00",
          "start": "2023-07-11T06:00:00+00:00"
        },
        "timezone": "Europe/Berlin"
      },
      "scope": "env:prod",
      "monitor_identifier": { "monitor_tags": ["*"] }
    },
    [..]
  },
  [..]
}
```

[1]: https://docs.datadoghq.com/getting_started/site
{{% /tab %}}
{{% tab "UI" %}}

Open the [Manage Downtime page][1] and add a new downtime. Select `recurring` and then select `Use RRULE`.

{{< img src="monitors/downtimes/downtime_guide_rrule.png" alt="Downtimes configuration using recurring RRULE schedule to mute alerts on the 2nd Tuesday of every month" style="width:100%;">}}

[1]: https://app.datadoghq.com/monitors#downtime
{{% /tab %}}
{{< /tabs >}}

### Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/api/v2/downtimes/
[2]: https://docs.datadoghq.com/api/v1/authentication/
[3]: https://docs.datadoghq.com/monitors/downtimes/
[4]: https://icalendar.org/iCalendar-RFC-5545/3-8-5-3-recurrence-rule.html
[5]: https://icalendar.org/rrule-tool.html

{{% \tab %}}
{{% \tabs %}}
