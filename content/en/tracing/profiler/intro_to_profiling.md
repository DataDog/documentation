---
title: Intro to Profiling
kind: Documentation
---

You may have heard that profiling can make your services faster, cheaper, and more reliable, but if you haven't used a profiler before, it can seem like a dark art.

In this guide, we'll explain profiling, then profile a sample service that has a performance problem and see how we can use Continuous Profiler to understand and fix the problem!

## What is Profiling?

A profiler shows how much "work" each function is doing by collecting data about the program as it's running. For example, infrastructure monitoring might show that your app servers are using 80% of their CPU but you may not know why. Profiling could then show you that function `doSomeWork` is using 48% of the CPU, function `renderGraph` is using another 19%, and so on. This is important when working on performance problems because many programs spend a lot of time in very few places and it's often not obvious which places those are. Guessing at which parts of a program to optimize can often cause engineers to spend a lot of time and not get much in the way of results. By using a profiler, we find exactly which parts of the code we should optimize to get the most bang for our buck.

If you've used an APM tool, you might think of profiling like a "deeper" tracer that provides a very fine grained view of your code without needing any instrumentation.

Datadog Continuous Profiler can track various types of "work", including CPU usage, amount and types of objects being allocated in memory, time spent waiting to acquire locks, amount of network or file I/O, and more! The profile types available depend on the language being profiled.

We've got an [example service][1] with a performance problem that you can easily experiment with. The example service has an API which allows searching a "database" of 5000 movies. We'll fix a performance problem with it! This guide shows you the process, but for the full experience you can follow along with your own shell, browser, and IDE.

## Prerequisites

You'll need:
1. [docker-compose][2]
2. A Datadog account and [API key][3] (you don't need an application key). If you don't already have a Datadog account, [sign up for a free trial][4].

## Run the Example

Get the example service up and running with:
```
git clone https://github.com/DataDog/dd-continuous-profiler-example.git
cd dd-continuous-profiler-example
echo "DD_API_KEY=YOUR_API_KEY" > docker.env
docker-compose up -d
```

Once all the containers are built and running, you can jump into a "toolbox" container to explore:
```
docker exec -it dd-continuous-profiler-example_toolbox_1 bash
```

You can try out the API with:
```
curl -s http://movies-api-java:8080/movies?q=wars | jq
```

There's also a Python version of the example service, called `movies-api-py`. If that's more your style, you can adjust the commands throughout the tutorial accordingly.

## Benchmark It

Let's generate more traffic using the ApacheBench tool, [ab][5]. We'll have it run 10 concurrent HTTP clients sending requests for 20 seconds. Still inside the toolbox container:
```
ab -c 10 -t 20 http://movies-api-java:8080/movies?q=the
...
Reported latencies by ab:
Percentage of the requests served within a certain time (ms)
  50%    464
  66%    503
  75%    533
  80%    553
  90%    614
  95%    683
  98%    767
  99%    795
 100%    867 (longest request)
```

## How to Read a Profile

Head on over to [Profile Search][6] and look for a profile covering the period in which we were generating traffic. It may take a minute or so. You'll be able to tell which profile includes the load test because the CPU usage will be higher:

{{< img src="tracing/profiling/intro_to_profiling/list.png" alt="List of profiles" style="width:80%;">}}

When you open it, you'll see a visualization of the profile that looks like this:

{{< img src="tracing/profiling/intro_to_profiling/flame_graph.png" alt="Flame graph">}}

This is a flame graph. The most important things it shows are how much CPU each method used (since this is a CPU profile) and how each method was called. For example, reading from the second row from the top, we see that `Thread.run()` called `QueuedThreadPool$2.run()` (amongst other things), which called `QueuedThreadPool.runjob(Runnable)`, which called `ReservedTheadExecutor$ReservedThread.run()`, and so on.

Zooming in to one area on the bottom of the flame graph, we see this:

{{< img src="tracing/profiling/intro_to_profiling/flame_graph_parse.png" alt="Flame graph parse() frame">}}

The tooltip shows us that roughly 390ms (0.90%) of CPU time was spent within this `parse()` function. `String.length()` is right below `parse()`, which means that `parse()` calls it.

{{< img src="tracing/profiling/intro_to_profiling/flame_graph_length.png" alt="Flame graph String.length() frame">}}

If we hover over `String.length()`, we see it took about 112ms of CPU time. So we can also tell that 278ms seconds were spent directly in `parse()`: 390ms - 112ms. That's visually represented by the part of the `parse()` box that doesn't have anything below it.

It's worth calling out that the flame graph _does not_ represent the progression of time. Looking at this bit of the profile,

{{< img src="tracing/profiling/intro_to_profiling/flame_graph_write.png" alt="Flame graph section with write() frames next to each other">}}

`Gson$1.write()` didn't run before `TypeAdapters$16.write()` but it may not have run after it either. They could have been running concurrently, or the program could have run several calls of one, then several calls of the other, and kept switching back and forth. The flame graph merges together all the times that a program was running the same series of functions so you can tell at a glance which parts of the code were using the most CPU without tons of tiny boxes showing each time a function was called.

{{< img src="tracing/profiling/intro_to_profiling/flame_graph_replyjson.png" alt="Flame graph with mouse over replyJSON()">}}

Zooming back out, we can see that about 87% of CPU usage was within the `replyJSON()` method. And if we look lower down,

{{< img src="tracing/profiling/intro_to_profiling/flame_graph_replyjson_arrows.png" alt="Flame graph with arrows pointing at stack traces below replyJSON()">}}

we can see that `replyJSON()`, and the methods it calls, eventually branch into four main code paths ("stack traces"), each of which run functions that have something to do with sorting and date parsing.

We also see a part of the CPU profile that looks like this:

{{< img src="tracing/profiling/intro_to_profiling/flame_graph_gc.png" alt="Flame graph showing GC (garbage collection)" style="width:60%;">}}

## Profile Types

The fact that it spent almost 6% of CPU time in garbage collection suggests that we may be producing a lot of garbage. So hop over to the Allocated Memory profile type:

{{< img src="tracing/profiling/intro_to_profiling/types.png" alt="Profile type selector" style="width:60%;">}}

On an Allocated Memory profile, the size of the boxes shows how much memory each function allocated, and again, the call stack that led to the function doing the allocating. Here we can see that during this one minute profile, the `replyJSON()` method and other methods that it called, allocated 17.47 GiB, mostly related to the same date parsing code that we saw in the CPU profile above:

{{< img src="tracing/profiling/intro_to_profiling/alloc_flame_graph_replyjson_arrows.png" alt="Flame graph of allocation profile with arrows pointing at stack traces below replyJSON()">}}

## Fixing the Problem

Time to look at the code and see what's going on! Looking again at the CPU flame graph, we can see that these expensive code paths go through a lambda on line 66, which calls `LocalDate.parse()`:

{{< img src="tracing/profiling/intro_to_profiling/flame_graph_sort_lambda.png" alt="Flame graph with mouse over sort lambda">}}

That corresponds to this bit of code in [`dd-continuous-profiler-example/java/src/main/java/movies-api/Server.java`][7], where we see the call to `LocalDate.parse()` on line 66:

{{< img src="tracing/profiling/intro_to_profiling/slow_sort_code.png" alt="Slow sort code">}}

This is the sorting logic in the API, to return results in order of descending release date. It does this by using the release date converted to a `LocalDate` as the sorting key. We could cache these `LocalDate`s so we only parse each movie's release date once rather than on every request, but there's an even easier fix. We can notice that we're parsing dates in ISO 8601 format (yyyy-mm-dd), which means we can sort them as strings and not parse them at all!

Go ahead and replace the whole try/catch with `return m.releaseDate;` like this:

{{< img src="tracing/profiling/intro_to_profiling/optimized_sort_code.png" alt="Optimized sort code">}}

Then rebuild and restart the service:
```
docker-compose build movies-api-java
docker-compose up -d
```

## Re-test

Let's check the results! Generate traffic once more like we did earlier:
```
docker exec -it dd-continuous-profiler-example_toolbox_1 bash
ab -c 10 -t 20 http://movies-api-java:8080/movies?q=the
```

The new results should look something like:
```
Reported latencies by ab:
Percentage of the requests served within a certain time (ms)
  50%     82
  66%    103
  75%    115
  80%    124
  90%    145
  95%    171
  98%    202
  99%    218
 100%    315 (longest request)
```

p99 went from 795ms to 218ms, and overall, this is four to six times faster than before!

If you find the profile containing this new load test and look at the CPU profile, you'll see that the `replyJSON` parts of the flame graph that we were looking at are now a much smaller percentage of the total CPU usage.

{{< img src="tracing/profiling/intro_to_profiling/flame_graph_optimized_replyjson.png" alt="Flame graph with the optimized replyJSON() stack traces">}}

## Clean up

When you're done exploring, you can clean up with:
```
docker-compose down
```

## Saving Money

Improving CPU usage like this can easily translate into saving money. If this had been a real service, this small improvement might have enabled us to scale down to half the servers, potentially saving thousands of dollars a year. Not bad for about 10 minutes of work!

## Improve Your Service

We've only skimmed the surface here but this should give you a sense of how to get started. **[Give it a shot on your services][8]**!

{{< site-region region="us" >}}{{< /site-region >}}
{{< site-region region="eu" >}}{{< /site-region >}}

[1]: https://github.com/DataDog/dd-continuous-profiler-example
[2]: https://docs.docker.com/compose/install/
[3]: https://app.datadoghq.com/account/settings#api
[4]: https://app.datadoghq.com/signup
[5]: https://httpd.apache.org/docs/2.4/programs/ab.html
[6]: https://app.datadoghq.com/profiling?query=env%3Aexample%20service%3Amovies-api-java
[7]: https://github.com/DataDog/dd-continuous-profiler-example/blob/25819b58c46227ce9a3722fa971702fd5589984f/java/src/main/java/movies/Server.java#L66
[8]: /tracing/profiler/getting_started/
