---
title: Getting Started in Datadog
kind: documentation
further_reading:
    - link: 'https://learn.datadoghq.com/course/view.php?id=2'
      tag: 'Learning Center'
      text: 'Introduction to Datadog'
---

This page gives a high level overview of the capabilities for the Datadog [US site][1] and [EU site][2].

**Note**: The navigation of the Datadog application switches based on browser width. It's possible to get three different types of navigation. To change navigation types, adjust the width of your browser.

## Integrations

{{< img src="getting_started/integrations.png" alt="integrations"  >}}

- Datadog has over 400+ integrations [officially listed][3].
- Custom integrations are available [via the Datadog API][4].
- The Agent is [open source][5].
- Once integrations have been configured, all data is treated the same throughout Datadog, whether it is living in a datacenter or in an online service.

## Infrastructure

{{< img src="getting_started/infrastructure.png" alt="infrastructure"  >}}

- All machines show up in the [infrastructure list][6].
- You can see the tags applied to each machine. Tagging allows you to indicate which machines have a particular purpose.
- Datadog attempts to automatically categorize your servers. If a new machine is tagged, you can immediately see the stats for that machine based on what was previously set up for that tag. [Read more on tagging][7].

## Host Map

{{< img src="getting_started/hostmap-overview.png" alt="hostmap overview"  >}}

[The Host Map][8] can be found under the Infrastructure menu. It offers the ability to:

- Quickly visualize your environment
- Identify outliers
- Detect usage patterns
- Optimize resources

To learn more about the Host Map, visit the [Host Map dedicated documentation page][8].

## Events

{{< img src="getting_started/event_stream.png" alt="Event stream"  >}}

[The Event Stream][9] is based on the same conventions as a blog:

- Any event in the stream can be commented on.
- Can be used for distributed [teams][10] and maintaining the focus of an investigation.
- You can [filter][11] by `user`, `source`, `tag`, `host`, `status`, `priority`, and `incident`.

For each incident, users can:

- Increase/decrease priority
- Comment
- See similar incidents
- [@ notify team members][12], who receive an email
- `@support-datadog` to ask for [assistance][13]

{{< img src="getting_started/event_stream_event.png" alt="event stream event"  style="width:70%;">}}

## Dashboards

{{< img src="getting_started/dashboard.png" alt="dashboard"  >}}

[Dashboards][14] contain graphs with real-time performance metrics.

- Synchronous mousing across all graphs in a [screenboard][15].
- Vertical bars are events. They put a metric into context.
- Click and drag on a graph to zoom in on a particular timeframe.
- As you hover over the graph, the event stream moves with you.
- Display by zone, host, or total usage.
- Datadog exposes a JSON editor for the graph, allowing for [arithmetic][16] and [functions][17] to be applied to metrics.
- Share a graph snapshot that appears in the stream.
- Graphs can be embedded in an iframe. This enables you to give a 3rd party access to a live graph without also giving access to your data or any other information.

## Monitors

[Monitors][18] provide alerts and notifications based on metric thresholds, integration availability, network endpoints, and more.

- Use any metric reporting to Datadog
- Set up multi-alerts (by device, host, etc.)
- Use `@` in alert messages to direct notifications to the right people
- Schedule downtimes to suppress notifications for system shutdowns, off-line maintenance, etc.

{{< img src="getting_started/application/metric_monitor.png" alt="alert setup" >}}

## Time frames
Many views in Datadog can be scoped to a specific time frame. Time controls include a list of common time frames and a calendar picker for quick selection.

<div class="alert alert-warning">
  Incrementing time frames via keyboard and entering custom time frames is in beta. If you have feedback, contact <a href="https://docs.datadoghq.com/help">Datadog support</a>.
</div>

To increment by month, day, year, hour, or minute, highlight a portion of the time frame and use the `[↑]` and `[↓]` keys :

{{< img src="getting_started/increment_time_with_arrow_keys.mp4" alt="Increment time with arrow keys" video="true" width="500" >}}

You can also type or paste custom ranges and timestamps—including ones copied from elsewhere in Datadog:

{{< img src="getting_started/copy_and_paste_time_frame.mp4" alt="Copy and paste time frame" video="true" >}}

Both fixed and relative ranges are supported:

{{< img src="getting_started/type_custom_fixed_time_frame.mp4" alt="Type custom fixed time frame" video="true" >}}

{{< img src="getting_started/type_custom_relative_time_frame.mp4" alt="Type custom relative time frame" video="true" >}}

### Supported time syntaxes

#### Fixed dates

| Format                       | Examples                                         |
|------------------------------|--------------------------------------------------|
| `{MMM/MMMM} D`               | Jan 1<br>January 1                               |
| `M/D`                        | 1&#8203;/&#8203;1                                |
| `M-D`                        | 1-1                                              |
| `M/D/{YY/YYYY}`              | 1/1/19<br> 1/1/2019                              |
| `M-D-{YY/YYYY}`              | 1-1-19<br> 1-1-2019                              |
| `{MMM/MMMM} D, h:mm a`       | Jan 1, 1:00 pm<br>January 1, 1:00 pm             |
| `{MMM/MMMM} D, YYYY, h:mm a` | Jan 1, 2019, 1:00 pm<br>January 1, 2019, 1:00 pm |
| `h:mm a`                     | 1:00 pm                                          |
| Unix seconds timestamp       | 1577883600                                       |
| Unix milliseconds timestamp  | 1577883600000                                    |

* Any fixed date can be entered as part of a range. Examples:
  * `1577883600 - 1578009540`
  * `Jan 1 - Jan 2`
  * `6:00 am - 1:00 pm`
* Whitespace around the range separator is optional.

#### Relative dates

| Format          | Examples                                                       | Notes                                                                              |
|-----------------|---------------------------|-------------------------------------------------------------------------------|
| `N{unit}`       | 3m<br>3 min<br>3h<br>3 hours<br>3d<br>3 days<br>3mo<br>3 months | Displays the past N units (e.g., the past 3 months) |
| `today`       |                                                                  | Displays the current calendar day until now |
| `yesterday`   |                                                                  | Displays the full previous calendar day             |
| `this month`  |                                                                  | Displays the current calendar month until now       |
| `last month`  |                                                                  | Displays the full previous calendar month           |
| `this year`   |                                                                  | Displays the current calendar year until now       |
| `last year`   |                                                                  | Displays the full previous calendar year            |

* Entering `today`, `yesterday`, `this month`, or `this year` will pause the time frame. (You can’t have a fixed start date with a relative end date.)
* The following strings are accepted for any `{unit}`:
  * Minutes: `m`, `min`, `mins`, `minute`, `minutes`
  * Hours: `h`, `hr`, `hrs`, `hour`, `hours`
  * Days: `d`, `day`, `days`
  * Months: `mo`, `mos`, `mon`, `mons`, `month`, `months`

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com
[2]: https://app.datadoghq.eu
[3]: http://www.datadoghq.com/integrations
[4]: /api
[5]: https://github.com/DataDog/dd-agent
[6]: /infrastructure
[7]: /tagging
[8]: /infrastructure/hostmap
[9]: /events
[10]: /account_management/users
[11]: https://www.datadoghq.com/blog/filter-datadog-events-stream-pinpoint-events-infrastructure
[12]: /events/#@-notifications
[13]: /help
[14]: /dashboards
[15]: /dashboards/screenboard
[16]: /dashboards/functions
[17]: https://www.datadoghq.com/blog/rank-filter-performance-monitoring-metrics-top-function
[18]: /monitors
