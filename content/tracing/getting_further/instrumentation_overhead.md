---
title: Instrumentation overhead
kind: documentation
further_reading:
- link: "tracing/setup/"
  tag: "Documentation"
  text: Learn how to setup APM tracing with your application
- link: "tracing/visualization/services_list/"
  tag: "Documentation"
  text: Discover the list of services reporting to Datadog
- link: "tracing/visualization/service"
  tag: "Documentation"
  text: Learn more about services in Datadog
- link: "tracing/visualization/resource"
  tag: "Documentation"
  text: Dive into your resource performance and traces
- link: "tracing/visualization/trace"
  tag: "Documentation"
  text: Understand how to read a Datadog Trace
---

Overhead can be broken down into several categories.  The most common categories impacted by tracing are:

* Response time/throughput
* Memory usage

## Java

When writing instrumentation, we optimize each of these categories.  We have [customizable tests][1], to better align with your environment, that can be run to help predict your specific impact.

| Category | Impact* |
|:-------- |:------ | 
|**Response time**| < 0.5 ms per typical trace**.| 
|**Memory (Application Startup)**| About 100 MB increase RSS.|
|**Memory (Under Load)**| No measurable increase in RSS. Objects are all short lived and quickly garbage collected.|
|**Trace Agent CPU usage**| < 5% of the application’s CPU usage.|
|**Trace Agent Memory Usage**|< 50 MB under load.|

### Response Time/Throughput

The performance aspect of your application that is most impactful for customers is the response time -- or how fast a web page loads. There are many variables which influence response time, and in turn overheard:

* Number of spans in a trace
* Number of tags in each span
* Propagation of the trace across threads (async)
* Propagation of the trace across processes (distributed)
* Information gathering done by instrumentation

Each of these have a small fixed cost (<0.5 milliseconds total for a typical trace**), but are all done within the scope of the request. For requests that take more than 10ms, the cost of tracing is typically less than 2%. As response times decrease, the percentage of overhead increases.

Measurements for the overhead can be collected using the following command:

```
./run-perf-test.sh jetty-perftest/build/libs/jetty-perftest-all.jar NoAgent ../build/libs/dd-java-agent.jar
```

When run from this location:  
`https://github.com/DataDog/dd-trace-java/tree/master/dd-java-agent/benchmark-integration`

This test starts a simple instance of Jetty with some additional manual tracing included (which can also be customized to mimic other environments). It accepts requests, sleeps for a configurable amount of time, then returns a response.  

Traffic is sent to the application using *wrk*, which also captures timing info.  

While running this test, additional information is captured about CPU and memory usage of the local running agent.  

### Memory Usage

In a generational garbage collected language like Java, the cost of reclaiming an object’s allocated memory increases with each generation. Objects that are quickly dereferenced can be collected very cheaply, whereas holding an object for even a minute can be expensive if it gets moved into an old generation GC.  

The fact that [dd-java-agent][2] reports the collected traces every second to the local agent means that the objects generated for tracing are very quickly dereferenced and allowed to be garbage collected more efficiently. The [trace agent][3], which collects these traces from the application, is written in Go and able to maintain a low footprint.

### Testing it Out

As with any performance testing, nothing beats running it in a realistic environment.  We recommend you test APM in your staging environment.  Please contact support at [help@datadoghq.com][4] if you run into any concerns about APM performance.

\*   Testing was done using a [sample app][5] on a MacBook pro.  
** A typical trace is single threaded and defined as 3 spans with ~15 tags.

[1]: https://github.com/DataDog/dd-trace-java/tree/master/dd-java-agent/benchmark-integration
[2]: https://github.com/DataDog/dd-trace-java/
[3]: https://github.com/DataDog/datadog-trace-agent/
[4]: /help
[5]: https://github.com/DataDog/dd-trace-java/tree/master/dd-java-agent/benchmark-integration/jetty-perftest