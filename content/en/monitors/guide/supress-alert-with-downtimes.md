---
title: Suppress alerts with Downtimes
kind: guide
further_reading:
- link: "api/v1/downtimes/"
  tag: "Documentation"
  text: "Downtime API reference"
- link: "/monitors/downtimes/"
  tag: "Documentation"
  text: "Downtime documentation"
---


## Overview

Use Downtimes to eliminate unnecessary alerts during scheduled maintenance, testing, or auto-scaling events.
Use the [Downtime API][1] to manage advanced maintenance schedules format, or to dynamically mute monitors, for example when resizing cloud instances.

This guide describes how to configure downtimes for the following use cases:

* [Downtime over the weekend](#downtime-over-the-week-end)
* [Downtime outside of business hours](#downtime-outside-of-business-hours)
* [Recurring downtime on nth weekday of the month](#recurring-downtime-on-nth-weekday-of-the-month)

## Prerequisites

Since this guide describes the usage of the API, you will need an API key and an application key with admin privileges. These are available in your [Datadog account API key page][2].
Replace all occurrences of `<DATADOG_API_KEY>` and `<DATADOG_APP_KEY>` with your Datadog API key and your Datadog application key, respectively.

This guide also assumes that you have a terminal with `CURL` and have reviewed the main [Downtime documentation page][3]

## Examples

### Downtime over the weekend

If you monitor services used only during the week, such as your company's ERP or accounting software, you may want to receive alerts only during the week.
With the following API call, you can mute alert during the weekend for all monitors over the `env:prod` tag. 

{{< tabs >}}
{{% tab "API " %}}

```bash
curl -X POST "https://api.<DATADOG_SITE>/api/v1/downtime" \
-H "Content-type: application/json" \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d '{"scope": "env:prod","start":"1613779200","end":"1613865599", "recurrence": {"type": "weeks","period": 1,"week_days": ["Sat","Sun"]}}'
```

Replace the placeholder value `<DATADOG_SITE>` with {{< region-param key="dd_site" code="true" >}}. Replace the `start` and `end` parameter to match your wanted schedule. For example:

* `start=$(date +%s)`
* `end=$(date -v+24H +%s)`

And then in the cURL command, use: `"start": '"${start}"'`.

**Response:**

```json
{
	"recurrence": {
		"until_date": null,
		"until_occurrences": null,
		"week_days": ["Sat", "Sun"],
		"type": "weeks",
		"period": 1
	},
	"end": 1613865599,
	"monitor_tags": ["*"],
	"child_id": null,
	"canceled": null,
	"monitor_id": null,
	"org_id": 1111111,
	"disabled": false,
	"start": 1613779200,
	"creator_id": 987654321,
	"parent_id": null,
	"timezone": "UTC",
	"active": false,
	"scope": ["env:prod"],
	"message": null,
	"downtime_type": 2,
	"id": 123456789,
	"updater_id": null
}
```

{{% /tab %}}
{{% tab "UI" %}}

Open the [manage Downtime page][1] and add a new downtime. Select `recurring`:

{{< img src="monitors/guide/downtimes_weekend.jpg" alt="Downtimes over the week end" style="width:60%;" >}}

[1]: https://app.datadoghq.com/monitors#downtime
{{% /tab %}}
{{< /tabs >}}

### Downtime outside of business hours

Using the same example, you may want to also mute this service during the weekdays outside of business hours.

With the following API call, you can mute alerts every weekday from 8pm to 6am:

{{< tabs >}}
{{% tab "API " %}}

```bash
curl -X POST "https://api.<DATADOG_SITE>/api/v1/downtime" \
-H "Content-type: application/json" \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d '{"scope": "env:prod","start":"1613844000","end":"1613887200", "recurrence": {"type": "days","period": 1}}'
```
Replace the placeholder value `<DATADOG_SITE>` with {{< region-param key="dd_site" code="true" >}}. Replace the `start` and `end` parameter to match your wanted schedule.

**Response:**

```json
{
	"recurrence": {
		"until_date": null,
		"until_occurrences": null,
		"week_days": null,
		"type": "days",
		"period": 1
	},
	"end": 1613887200,
	"monitor_tags": ["*"],
	"child_id": null,
	"canceled": null,
	"monitor_id": null,
	"org_id": 1111111,
	"disabled": false,
	"start": 1613844000,
	"creator_id": 987654321,
	"parent_id": null,
	"timezone": "UTC",
	"active": false,
	"scope": ["env:prod"],
	"message": null,
	"downtime_type": 2,
	"id": 123456789,
	"updater_id": null
}
```

{{% /tab %}}
{{< /tabs >}}


### Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/api/v1/downtimes/
[2]: https://docs.datadoghq.com/api/v1/authentication/
[3]: https://docs.datadoghq.com/monitors/downtimes/?tab=bymonitorname
