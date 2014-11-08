---
title: Guide to Alerting
kind: documentation
sidebar:
  nav:
    - header: Guide to Alerting
    - text: Creating a new alert
      href: "#newalert"
    - text: Choosing a metric
      href: "#choosemetric"
    - text: Change alerts
      href: "#changealerts"
    - text: Simple and Multi alerts
      href: "#simple"
    - text: Alert conditions
      href: "#conditions"
    - text: No-data alerts
      href: "#nodata"
    - text: Autoresolving alerts
      href: "#autoresolve"
    - text: Notifying
      href: "#notify"
    - text: Alerting FAQs
      href: "#faqs"


---

Monitoring all of your infrastructure in one place wouldn't be complete without
the ability to know when critical changes are occurring.
Alerts within Datadog notify you when a metric crosses a threshold; they're flexible,
appear in the event stream, and can be delivered to team members of your choice via email,
Hipchat room, or whoever is 'oncall' in Pagerduty.
To set up an alert, go to the 'Metrics' tab and select 'Manage Monitors'.

![alert 1](/static/images/alert_1.png)

Two subtabs will appear, 'Triggered Monitors' and 'Manage Monitors'.
'Triggered Monitors' are all alerts currently firing. Select 'Manage Monitors' to
create a new alert.

![alert 2](/static/images/alert_2.png)


### Create a New Alert
{: #newalert}

![alert 3](/static/images/alert_3.png)


There are 5 steps to creating an alert

1. Choose the average, minimum, maximum, or sum of a  metric over specific hosts,
tags, regions, devices, etc.
2. Choose a simple or multi alert; <a href="#simple">multi-alerts</a> are flexible
and can be across host, device, role, etc.
3. Set the alert conditions; if the metric was above or below a threshold value on average,
at least once, or at all times during a time span and to be alerted if the metric
is receiving no data.
4. Say what's happening in the alert and @ notify team members.
5. You can also notify specific services.


#### Choosing a Metric
{: #choosemetric}

![alert 4](/static/images/alert_4.png)

To get into detail on how to use alerts, let's take aws.elb.latency as an example.
Let's also say there are 5 hosts, 1 in staging and the rest in prod.

When selecting 'avg' for 'aws.elb.latency', Datadog will be taking the average
from all hosts emitting that metric. If you add a parameter to 'over', say 'env:prod',
it will now stop averaging in anything not tagged 'env:prod'. On the other hand, if you
did 'env:staging' it wouldn't really be averaging because there would be just one host
emitting that metric thus one time series.

When selecting 'max' or 'min', Datadog will take the highest or
lowest point respectively seen from any of the hosts emitting that metric.

Select a 'tag' will limit the metric collection to what you've specified.


#### Change Alerts
{: #changealerts}

![alert 5](/static/images/change_alert.png)

A change alert is triggered when the delta between values is higher than the threshold.

A change alert evaluates the difference between a value N minutes ago and now.
The averaging of the values depends on the timeframe of the alert, e.g. 5m - 30m
alerts calculate against a 1-minute moving average, while 1h - 4h alerts will use a 10-minute moving average.

On each alert evaluation Datadog will calculate the raw difference (not absolute value) between these two values.
An alert is triggered when the delta over time exceeds the limit, where the limit can be a fixed value or a percent of change.

#### Simple and Multi Alerts
{: #simple}

![alert5](/static/images/alert_5.png)

A simple alert aggregates over all reporting sources.
You'll get one alert, when the aggregated value meets the conditions set below.
This works best to monitor a metric from a single host, like avg of system.cpu.iowait
over host:bits, or for an aggregate metric across many hosts, like
sum of nginx.bytes.net over region:us-east.

A multi alert applies the alert to each source, according to your group parameters.
E.g. to alert on disk space you might group by host and device, creating the
query: avg of system.disk.in_use over * by host,device. This will trigger a separate
alert for each device on each host that is running out of space.

#### Alert Conditions
{: #conditions}

![alert 5 1](/static/images/alert_5_1.png)


When setting the alert conditions, ensure that the threshold value you use correctly
matches the unit that are showing in the graph (for example, bytes vs GB). The
'on average' option updates each minute to include the most recent time and dropoff
what’s old (not a “moving average”, really a sliding timeframe). The options for
the time frame are 5, 10, 15, 30, or 60 minutes.


#### No Data Alerts
{: #nodata}

No-data alerts make it possible to be alerted on a host going down by
registering a “simple alert” or “multi alert” for a metric that is expected to be
reported all the time. Thanks to tags and multi-alerts, this still allows
one alert to cover a large number of hosts. You can enable this by selecting
"Notify" in the dropdown beside "if this metric is missing data for more than
your selected timeframe."

On the other hand, if you are monitoring a
metric over an auto-scaling group of hosts that may come and go at any time,
you will get a lot of notifications when hosts are shut down deliberately. In
that case you should not enable notifications for missing data.

This does not entirely encompass host up/down scenarios, because in the
event that the agent died and the host is still up, you would be incorrectly
alerted. We are working towards supporting this with Service Checks, a feature
we hope to release in the near future.

#### Autoresolving Alerts
{: #autoresolve}

![alert auto](/static/images/alert_auto.png)

For some metrics that report periodically across different tags,
it may make sense to have triggered alerts auto-resolve after a certain time
period. For example, if you have a counter that reports only when an error is
fired the alert will never resolve because the metric will never report 0 as
the number of errors. In this case, you may want to set your alert to resolve
after 4 hours of inactivity on that metric.

In most cases this setting will not be useful because you will only want an
alert to resolve once it actually has been fixed. So in the general case it
makes sense to leave this as [Never] so that the alert will only resolve when
the metric falls below the given threshold.

#### Notifying
{: #notify}


![alert 6](/static/images/alert_6.png)

In the final step of setting up an alert, you can give any necessary commentary
for the alert so if it triggers it will alert the correct people with the most context possible.
Each graph delivered via email or in the event stream when an alert triggers is a hyperlink
to that graph at that exact timeframe. In the body of the message you can <a href="/faq/#notify">@notify</a>
members of the team to have it specifically call out to them. You can also do this in
part 5, 'Notify your team'.

### Alerting FAQs
{: #faqs}

Can you alert on a function?
: Not currently, but we're working towards this!

Can you alert on an event?
: Not currently, but we're discussing how we'd like to implement this.
As an alternative you can set up an @ notification in the body of the event which would deliver the
event via email whenever it occurred.
