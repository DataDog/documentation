---
title: Isolate Outliers in Monolithic Services
kind: guide
further_reading:
- link: "/profiler"
  tag: "Documentation"
  text: "Datadog Continuous Profiler"
- link: "/profiler/compare_profiles/"
  tag: "Documentation"
  text: "Comparing Profiles"
---

## Overview

When investigating the performance of a monolithic application -- that is, a single service that has multiple uses -- you usually need to find which parts of the code base are using the most resources. The APM Service page showing top endpoints might be a logical first place to look, but the data there is focused on the number of requests and their duration, not the impact those requests have on compute resources available on your backend. 

Instead, use the Continuous Profiler's ability to filter flame graphs by endpoint usage. This allows you to both see the top resource-consuming endpoints at a glance, as well as examine which functions are taking up the most resources for each particular endpoint.

This guide describes how to use the Datadog Continuous Profiler to investigate these kinds of problems.

## CPU bursts

The first step in a performance investigation is to identify anomalies in resource usage over time. Consider the following graph of CPU utilization over the past hour for the service `product-recommendation`:

{{< img src="profiler/guide-monolithic-outliers/1-outliers-monolith-cpu-usage.png" alt="" style="width:100%;" >}}

This doesn't provide concrete pointers to the answers, but you can see some anomalous peaks in CPU usage. 

Select the **Show - Avg of** dropdown (highlighted) and change the graph to show `CPU Cores for Top Endpoints` instead. This graph shows how different parts of the application contribute differently to the overall CPU utilization:

{{< img src="profiler/guide-monolithic-outliers/2-outliers-monolith-cpu-top-endpoints.png" alt="" style="width:100%;" >}}


The yellow peaks show that the `GET /store_history` endpoint has some intermittent usage corresponding to the anomalies identified above. However, the peaks might be due to differences in traffic to that endpoint. To understand if profiles can provide further insights, change the metric to `CPU - Average Time Per Call for Top Endpoints`:

{{< img src="profiler/guide-monolithic-outliers/3-outliers-monolith-cpu-avg-time-per-call.png" alt="" style="width:100%;" >}}

Now you can see that there is an intermittent spike in CPU utilization where _each call_ to `GET /store_history` takes on average three seconds of CPU time, rather than the increase being because of more calls.

So, the CPU utilization spikes are not due to an increase in traffic but rather an increase in CPU usage per request. 

## Isolate the impact of endpoints

To figure out what is causing increased CPU usage each time `GET /store_history` is called, look at the profiling flame graph for this endpoint during one of the spikes. Select a time range where `GET /store_history` is showing more CPU utilization, scoping the profiling page to that time range. Then switch to the **Flame Graph** visualization to see the methods using the CPU at this time:

{{< img src="profiler/guide-monolithic-outliers/4-outliers-monolith-flame-graph.png" alt="Your image description" style="width:100%;" >}}

To better understand why the `GET /store_history` endpoint in particular is using more CPU, look at the table on the right-hand side, where you can see the endpoint is second from the top. Select just that row to focus the flame graph specifically on the CPU utilization caused by the `GET /store_history` endpoint. 

Because you are investigating resource usage per request, also change the value in the drop-down menu at top of the table to `CPU Time per Endpoint Call`, to show the average resource usage per call to that endpoint instead of the average resource usage per minute.

## Comparing flame graphs

Now that the graph shows data for the right time and endpoint, you probably have enough data to understand what is causing the spike in CPU utilization. But if not, you can compare the flame graph for the spike with a time when utilization was more acceptable.

To see if there are differences in which methods are using a lot of CPU time between a spike and normal usage, click **Compare** (on the far right side of the search field) and select `Previous 15 minutes`. This opens the Comparison view. 

The view shows two graphs, labeled `A` and `B`, each representing a time range for CPU utilization per call for `GET /store_history`. Adjust the time selector for `A` so that it is scoped to a period with low CPU utilization per call:

{{< img src="profiler/guide-monolithic-outliers/5-outliers-monolith-compare-flame-graphs.png" alt="Your image description" style="width:100%;" >}}

The comparison shows the different methods causing CPU utilization on the right side (timeframe `B` during the spike) that are not used at all in timeframe `A` (normal CPU). The culprit, `Product.loadAssets(int)`, is causing the spikes. 

To fix the problem, optimize the method. Looking at the method code, the signature is `Product(int id, String name, boolean shouldLoadAssets)` and you do not need to load assets for the response to the `GET /store_history` endpoint. This implies that there is a bug further up the call stack that improperly instructs the `Product` constructor to load assets.

Fix that bug and verify that the spikes go away, using the timeseries graphs discussed earlier.

## Isolate the impact of operations (Java)

There are other attributes available in the profiler. For example, you can filter and group a flame graph by operation names, rather than by functions or threads. For a monolithic application this can be more helpful, as it can more directly state which resources are utilizing more CPU, even if they are shared between endpoints.

The APM `Trace operation` attribute lets you filter and group a flame graph with the same granularity as what's in the traces for the selected endpoints. This is a good middle between the high granularity of threads or methods, and the low granularity of entire endpoints. To isolate operations, select `Trace Operation` from the **CPU time by** drop-down: 

{{< img src="profiler/guide-monolithic-outliers/7-outliers-monolith-trace-operation.png" alt="Your image description" style="width:100%;" >}}

Now you can see that the `ModelTraining` operation is taking more CPU time than its primary use in the `GET /train` endpoint, so it must be used in other places. Click on it to find out where else it is used. In this case, `ModelTraining` is also use by `POST /update_model`.

## Isolate your own business logic (Java)

Endpoint and operation isolation is available in your profiles by default, but you may want to isolate a different piece of logic. For example, if the monolith is sensitive to specific customers, you can add a custom filtering to the profiles:

{{< code-block lang="java" >}}
try (var scope = Profiling.get().newScope()) {
   scope.setContextValue("customer_name", <the customer name value>);
   <logic goes here>
}
{{< /code-block >}}




## Further reading

{{< partial name="whats-next/whats-next.html" >}}