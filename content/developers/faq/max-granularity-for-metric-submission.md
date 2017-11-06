---
title: Max Granularity for Metric Submission
kind: faq
customnav: main_references
---

## Question

From reading through the datadog docs, it looks like datadog supports a maximum granularity of 1 data point per second (although it does note that we should only submit points every 15 seconds). Is there a maximum throughput for custom metrics via the API?

## Answer 

Yes, Datadog supports a maximum granularity of 1 second. So if you used Datadog's HTTP API and submitted those metrics every second, you would see the one second granularity in the Datadog App. 

However, you may want to consider using the statsd protocol which is a great setup to fire many metrics via UDP and monitor your application code without implementing blocking HTTP calls in the code. In this example, data would be sampled in your application code, transmitted via UDP to the dogstatsd server (embedded in the dd-agent) that will then aggregate and send data to the Datadog API endpoint. For instance, if you have a counter incremented once per second, instead of making 10 separate http API calls, the dogstatsd server would aggregate it and then send it in one API call (the default flush interval is 10 seconds for statsd).

You can read more about the dogstatsd setup [here](/developers/dogstatsd).
You can also read more about the dd-agent architecture [here](/Agent).