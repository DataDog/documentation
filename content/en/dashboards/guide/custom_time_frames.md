---
title: Custom Time Frames
description: Use custom time frame syntaxes including fixed dates, relative dates, and calendar-aligned periods in Datadog dashboards.
---

## Overview

<div class="alert alert-info">Queries are run in UTC time, but the query time frame is selected according to your <strong>browser's time zone</strong>. Toggle between displaying the default time zone or UTC from the dashboard configure action. For more information, see the <a href="/dashboards/configure/#configuration-actions">Dashboard configuration documentation</a>.</div>

Many views in Datadog can be scoped to a specific time frame. Time controls include a list of common time frames and a calendar picker for quick selection.

Time frames can be:

- **Sliding**: Both start and end move forward as time ticks by (for example, `5h` always shows the most recent 5 hours).
- **Growing**: A fixed start with the end tracking "now" (for example, `since Jun 1` shows everything from June 1 until the current time).
- **Fixed**: Both start and end are frozen to specific points in time (for example, `Jan 1 - Jan 2`).

To increment by month, day, year, hour, or minute, highlight a portion of the time frame and use the `[↑]` and `[↓]` keys:

{{< img src="dashboards/guide/custom_time_frames/increment_with_arrow_keys.mp4" alt="Increment time with arrow keys" video="true" width="500" >}}

## Supported syntaxes

### Fixed dates

{{< img src="dashboards/guide/custom_time_frames/custom_fixed_time_frame.mp4" alt="Type custom fixed time frame" video="true" width="500" >}}

| Format                       | Examples                                         |
| ---------------------------- | ------------------------------------------------ |
| `{MMM/MMMM} D`               | Jan 1<br>January 1                               |
| `M/D`                        | 1&#8203;/&#8203;1                                |
| `M-D`                        | 1-1                                              |
| `M/D/{YY/YYYY}`              | 1/1/19<br>1/1/2019                               |
| `M-D-{YY/YYYY}`              | 1-1-19<br>1-1-2019                               |
| `{MMM/MMMM} D, h:mm a`       | Jan 1, 1:00 pm<br>January 1, 1:00 pm             |
| `{MMM/MMMM} D, YYYY, h:mm a` | Jan 1, 2019, 1:00 pm<br>January 1, 2019, 1:00 pm |
| `h:mm a`                     | 1:00 pm                                          |
| Unix seconds timestamp       | 1577883600                                       |
| Unix milliseconds timestamp  | 1577883600000                                    |

Any fixed date can be entered as part of a range. For example:

- `1577883600 - 1578009540`
- `Jan 1 - Jan 2`
- `6:00 am - 1:00 pm`

### Relative dates

Relative dates update over time; they are calculated from the current time.

{{< img src="dashboards/guide/custom_time_frames/custom_relative_time_frame.mp4" alt="Type custom relative time frame" video="true" width="500" >}}

| Format                                             | Description                                                                                                                                                                                                                                                                                          |
| -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `N{unit}`<br> See the list of accepted units below | Displays a sliding window of the past N units. Both start and end move forward with time. For example, **3 mo** (the past 3 months). To create a growing window where the end stays at "now," use the `to now` syntax (for example, `10am to now`). See [Growing time frames](#growing-time-frames). |

The following strings are accepted for any `{unit}` in a relative date:

- Minutes: `m`, `min`, `mins`, `minute`, `minutes`
- Hours: `h`, `hr`, `hrs`, `hour`, `hours`
- Days: `d`, `day`, `days`
- Weeks: `w`, `week`, `weeks`
- Months: `mo`, `mos`, `mon`, `mons`, `month`, `months`

### Growing time frames

Growing time frames have a fixed start and automatically extend to the current time ("now"). They are useful when you want to see everything that has happened since a specific point in time.

{{< img src="dashboards/guide/custom_time_frames/custom_growing_time_frame.mp4" alt="Type custom growing time frame" video="true" width="500" >}}

| Format          | Description                                                                                                 |
| --------------- | ----------------------------------------------------------------------------------------------------------- |
| `{date} to now` | A growing window from `{date}` until now. For example, **Jan 1 to now**.                                    |
| `{date} - now`  | Equivalent to `{date} to now`. For example, **Jan 1 - now**.                                                |
| `since {date}`  | Equivalent to `{date} to now`. For example, **since Jun 1**, **since 5h**, **since 1549116000**.            |
| `from {date}`   | Equivalent to `{date} to now`. For example, **from Jun 1**, **from 5h**.                                    |

The `{date}` in both formats accepts any of the following:

- Relative shorthand (for example, `5h`, `2d`, `3w`)
- Fixed dates (for example, `Jun 1`, `Feb 2 2pm`, `1/15/2024`)
- Unix timestamps in seconds or milliseconds (for example, `1549116000`, `1549116000000`)

### Calendar-aligned dates

Calendar-aligned dates snap to calendar boundaries (such as midnight, start of the week, and start of the month) and update accordingly as time passes.

| Format            | Description                                                                           |
| ----------------- | ------------------------------------------------------------------------------------- |
| `today`           | The current calendar day until present                                                |
| `yesterday`       | The full previous calendar day                                                        |
| `week to date`    | The current week from 12AM Monday until present                                       |
| `month to date`   | The current month from the 1st until present                                          |
| `year to date`    | The current year from January 1 until present                                         |
| `this {unit}`     | The current calendar unit until present. For example, **this month**, **this year**   |
| `last {unit}`     | The full previous calendar unit. For example, **last month**, **last year**           |
| `previous {unit}` | Equivalent to `last {unit}`. For example, **previous week**, **previous month**       |
| `N {units} ago`   | The full calendar unit N periods back. For example, **2 weeks ago**, **3 months ago** |

## URLs

You can manipulate time queries in the URL of a dashboard.

Consider the following dashboard URL:

```
https://app.datadoghq.com/dash/host/<DASHBOARD_ID>?from_ts=<QUERY_START>&to_ts=<QUERY_END>&live=true
```

- The `from_ts` parameter is the Unix milliseconds timestamp of the query starting time. For example, `1683518770980`.
- The `to_ts` parameter is the Unix milliseconds timestamp of the query ending time. For example, `1683605233205`.
- `live=true` indicates that relative time specifications are retained when a query is saved or shared. You can also use `live=false`.
