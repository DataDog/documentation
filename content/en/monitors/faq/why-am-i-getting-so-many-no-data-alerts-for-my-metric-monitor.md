---
title: Why am I getting so many "No Data" Alerts for my Metric Monitor
kind: faq
further_reading:
- link: "monitors/notifications"
  tag: "Documentation"
  text: "Configure your monitor notifications"
- link: "monitors/downtimes"
  tag: "Documentation"
  text: "Schedule a downtime to mute a monitor"
---

*No Data* Alerts are a great way to be notified when an Integration/application is no longer submitting metrics to Datadog.  
When utilizing a [Metric Monitor][1] for a metric that isn't always reported at the same frequency or is reported with a timestamp slightly in the past, such as a metric from the [AWS Integration][2], you may receive No Data alerts despite seeing these values in Datadog.
There are a couple Monitor configuration options that can be edited to properly evaluate over these types of metrics:

{{< img src="monitors/faq/AWS_Monitor_Config.png" alt="AWS monitor config" responsive="true" >}}

1. The first section of this image displays that this metric: `aws.ec2.cpuutilization` is coming in with a slight delay.  
This is due to the limitations on how soon this metric is available from Cloudwatch.

2. This option is the [Require a Full Window of Data][3] (or the ability to not require).  
This option is typically recommended for metrics being reported by the Datadog Agent and ones that are coming in with the current timestamp. For slightly backfilled metrics, this option can cause No Data events or have the Monitor skip the current evaluation period due to the values not being present at the time the monitor evaluates. For this reason we recommend all sparse metrics or metrics that don't report at the same frequency to use the option "Do Not [Require a Full Window of Data][3]".

3. The last option here is the Delay Evaluation.  
Since Monitors perform an evaluation every minute, it is looking back on the past X minutes of data. For backfilled metrics, like those coming from AWS, the monitor may be looking at a period of time when the data is not in Datadog. This causes false No Data alerts. Setting this field allows you to have the monitor wait, 900 seconds, so that the AWS metrics have 900 seconds to be available within Datadog before the monitor begins evaluation.

Contact [us][4] should you experience any issues.

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/monitor_types/metric
[2]: /integrations/amazon_web_services
[3]: /monitors/faq/what-is-the-do-not-require-a-full-window-of-data-for-evaluation-monitor-parameter
[4]: /help
