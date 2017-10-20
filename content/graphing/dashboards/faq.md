---
title: Dashboards FAQ
kind: documentation
autotocdepth: 3
hideguides: true
customnav: graphingnav
---

### Dashboard loads very slowly/displays no data, but I'm correctly sending data to Datadog

Does your dashboard or graph take a long time to load? When you look at larger time period, does it take a longer time to load, or even completely fail to load?

This probably means that you submit many different tags for the metrics of your graph.

#### The cause

For a given metric, and for each unique combination of tags with which you send data to Datadog, we create a new record on our backend to store things separately. We do this so that we are able to exactly identify the data you asked for when you query a metric for any specific tag combination.

With a large number of unique tag combinations, it will take a longer time to query and aggregate data on our end. This causes a delay in populating your graph with data. Within a wider time-window, it's likely that there will be even more unique tag combinations, resulting in a longer delay before you see metrics. You may even see no visualization at all when the delay hits the time out.

#### More information

You may find information and examples about unique tag combinations in this article:

http://help.datadoghq.com/hc/en-us/articles/204271775-What-is-a-custom-metric-and-what-is-the-limit-on-the-number-of-custom-metrics-I-can-have-

#### Recommendation

As a consequence, we encourage you to tag your metrics with fewer than 1000 tags for querying purposes.

#### Billing impact

Please also note that the number of custom metrics (where a custom metric refers to a single, unique combination of a metric name, host, and any tags) may count towards your billing. We usually offer a soft limit of 100 custom metrics * # hosts monitored via Datadog.

#### Any questions?

If you plan on continuing to submit more custom metrics than the billing limit in the future, or if you have any questions, please reach out to [us directly](/help)


### Auditing Dashboards

In dashboards, notifications provide the ability to track changes for audit purposes. Any changes made will create an event in the event stream that explains the change and displays the user that made the actual change.

If any changes are made to your dashboards, you can see them with the following event search:

https://app.datadoghq.com/event/stream?per_page=30&query=tags:audit%20status:all

This feature can be enabled by following these simple steps:

At the top right corner of a dashboard, click on the gear icon

{{< img src="graphing/dashboards/faq/enable_notifications.png" alt="enable notifications" responsive="true" >}}

    2. Select 'Notifications' option and enable the notifications

{{< img src="graphing/dashboards/faq/notifications_pop_up.png" alt=" notifications pop up" responsive="true" >}}

Note. This feature is available for both timeboards and screenboards.


### How to Transform a Timeboard to a Screenboard or vice versa ?

To transform a TimeBoard to a ScreenBoard you can use the [script here](https://github.com/DataDog/Miscellany/blob/master/dashconverter.py).

The usage is very simple, you provide the ID of the dashboard you want to convert, and the output will be the URL of the converted dashboard.

This relies on the API get and post methods for [TimeBoards](https://docs.datadoghq.com/api/#timeboards) and [ScreenBoards](https://docs.datadoghq.com/api/#screenboards). 

First, retrieve the ID of the dashboard, you can find it in the URL of the dashboard

{{< img src="graphing/dashboards/faq/id_dashboard.png" alt="ID dashboard" responsive="true" >}}

Here the ID is 66234.

Once you have the ID use the script as follows:

```
python dashconverter.py dashboard_ID 
```

This will automatically detect if you listed a Screenboard or a Timeboard and convert it to the other one.

Note: As the widgets available on both dashboards are different you have a list of widgets which will not be converted, this list includes:

```
['free_text','alert_value','check_status','event_timeline','event_stream','image','note','alert_graph','iframe']
```

Because the Screenboards' widgets have individual time windows, when converting a Timeboard to a Screenboard, all the widgets will be set to 4h. This can be changed with the variable timeframe. Additionally, the size of the widgets is set to the default size, you can modify this with the variables height and width.

You have to enter your API and APP keys in the script for it to work.

A concrete use case for this is to transform this:

{{< img src="graphing/dashboards/faq/screenboard_1.png" alt="screenboard 1" responsive="true" >}}
 
To

{{< img src="graphing/dashboards/faq/timeboard_1.gif" alt="timeboard 1" responsive="true" >}}

Or with the following:

{{< img src="graphing/dashboards/faq/example_1.png" alt="example 1" responsive="true" >}}

transform this :

{{< img src="graphing/dashboards/faq/timeboard_2.gif" alt="timeboard 2" responsive="true" >}}

to this:

{{< img src="graphing/dashboards/faq/screenboard_2.gif" alt="screenboard 2" responsive="true" >}}

Then, you will be given the option to delete the original dashboard.

Note: If you clone an out of the box dashboard, certain widgets might have an old payload which will not comply with the code. You will see a warning in the output of the script and the outdated widget will not be converted.
If you want to get around this, just open the outdated widget (the title will be given in the warning) and save it (no need to modify anything).
Then run the script again. Even if you had several warnings, updating one of the outdated widgets should be enough for all.
If you see this warning, and wish to convert the whole dashboard, do not delete it right away, make sure it is properly up to date first.