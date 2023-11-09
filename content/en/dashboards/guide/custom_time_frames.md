---
title: Custom Time Frames
kind: guide
---

Many views in Datadog can be scoped to a specific time frame. Time controls include a list of common time frames and a calendar picker for quick selection.

To increment by month, day, year, hour, or minute, highlight a portion of the time frame and use the `[↑]` and `[↓]` keys:

{{< img src="dashboards/guide/custom_time_frames/increment_with_arrow_keys.mp4" alt="Increment time with arrow keys" video="true" width="500" >}}

You can also type or paste custom dates and timestamps—including ones copied from elsewhere in Datadog:

{{< img src="dashboards/guide/custom_time_frames/copy_and_paste.mp4" alt="Copy and paste time frame" video="true" >}}

Both fixed and relative custom time frames are supported:

{{< img src="dashboards/guide/custom_time_frames/custom_fixed_time_frame.mp4" alt="Type custom fixed time frame" video="true" width="500" >}}

{{< img src="dashboards/guide/custom_time_frames/custom_relative_time_frame.mp4" alt="Type custom relative time frame" video="true" width="500" >}}

**Note**: Queries are run in UTC time, but the query time range is selected according to your browser. Toggle between displaying the default time zone or UTC from the dashboard configure action. For more information, see the [Dashboard Settings][1] documentation.

## Supported syntaxes

### Fixed dates

| Format                       | Examples                                         |
|------------------------------|--------------------------------------------------|
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

Any fixed date can be entered as part of a range. Examples:
  * `1577883600 - 1578009540`
  * `Jan 1 - Jan 2`
  * `6:00 am - 1:00 pm`

### Relative dates

| Format         | Examples                                                                         | Notes                                                     |
|----------------|----------------------------------------------------------------------------------|-----------------------------------------------------------|
| `N{unit}`      | 3m<br>3 min<br>3h<br>3 hours<br>3d<br>3 days<br>3w<br>3 weeks<br>3mo<br>3 months | Displays the past N units, for example: the past 3 months |
| `today`        | Nov 9, 12:00 am - Nov 9, 3:15 pm                                                 | Displays the current calendar day until present           |
| `yesterday`    | Nov 8, 12:00 am - Nov 9, 12:00 am                                                | Displays the full previous calendar day                   |
| `this month`   |                                                                                  | Displays the current calendar month until present         |
| `last month`   |                                                                                  | Displays the full previous calendar month                 |
| `this year`    |                                                                                  | Displays the current calendar year until present          |
| `last year`    |                                                                                  | Displays the full previous calendar year                  |

The following strings are accepted for any `{unit}` in a relative date:
  * Minutes: `m`, `min`, `mins`, `minute`, `minutes`
  * Hours: `h`, `hr`, `hrs`, `hour`, `hours`
  * Days: `d`, `day`, `days`
  * Weeks: `w`, `week`, `weeks`
  * Months: `mo`, `mos`, `mon`, `mons`, `month`, `months`

**Note**: The following timeframes do not update as time passes, they are calculated when entered: `today`, `yesterday`, `this month`, `this year`, and `last year`. 

### Calendar aligned dates

| Format         | Examples                                                                         | Notes                                                     |
|----------------|----------------------------------------------------------------------------------|-----------------------------------------------------------|
| `week to date` |  Nov 6, 12:00 am - Nov 8, 4:52 pm                                                | Displays the week from 12AM Monday until present          |
| `month to date`|  Nov 1, 12:00 am - Nov 8, 4:55 pm                                                | Displays the 1st of the month until present               |

Calendar aligned dates update to reflect the current present day.

## URLs

You can manipulate time queries in the URL of a dashboard.

Consider the following dashboard URL:

```
https://app.datadoghq.com/dash/host/<DASHBOARD_ID>?from_ts=<QUERY_START>&to_ts=<QUERY_END>&live=true
```

* The `from_ts` parameter is the Unix milliseconds timestamp of the query starting time. For example, `1683518770980`.
* The `to_ts` parameter is the Unix milliseconds timestamp of the query ending time. For example, `1683605233205`.
* `live=true` indicates that relative time specifications are retained when a query is saved or shared. You can also use `live=false`.

[1]: /dashboards/#display-utc-time