---
title: Instrument a custom method to get deep visibility into your business logic
kind: guide
disable_toc: true
further_reading:
- link: "/tracing/guide/alert_anomalies_p99_database/"
  tag: "3 mins"
  text: "Alert on anomalous p99 latency of a database service"
- link: "tracing/guide/week_over_week_p50_comparison/"
  tag: "2 mins"
  text: "Compare a service’s latency to the previous week"
- link: "/tracing/guide/slowest_request_daily/"
  tag: "3 mins"
  text: "Debug the slowest trace on the slowest endpoint of a web service"
- link: "tracing/guide/"
  tag: ""
  text: "All guides"
---
_8 minutes to complete_

{{< img src="tracing/guide/custom_span/custom_span_1.png" alt="Analytics View" responsive="true" style="width:90%;">}}

  In order to provide you deep visibility into your business logic, Datadog APM allows you to customize the spans that make up your traces based on your needs and implementation. This empowers you to trace any method in your codebase and even specific components within methods. You can use this to optimize and monitor critical areas of your application at the granularity that works for you.

  Custom spans are especially useful when you have methods that perform multiple actions like fetching data from a payments database, sanitizing, processing and verifying the response and finally, returning the results to display to a customer. The database call and sanitization methods are already instrumented automatically, but the processing is entirely tailored to your application. By creating spans for the processing, you can optimize the timing using the APM flamegraph and monitor for errors using Datadog monitors.

  **Note**: when using any framework that is integrated with Datadog APM, your web requests, database queries and cache jobs will be automatically traced.

## Instrument a complete method with decorators

**Follow the example to get your code instrumented**.

  In this example, we'll be tracing the entire `BackupLedger.write` method to measure it's execution time and status. `BackupLedger.write` is an action that saves the current state of our transaction ledger in memory before making a call to our payments database to post a new customer charge. This happens when the `charge` endpoint of our payments service is hit.

  {{< img src="tracing/guide/custom_span/custom_span_2.png" alt="Analytics View" responsive="true" style="width:90%;">}}
  *Notice that the `http.request POST /charge/` span is taking a lot of time without having any direct child spans. This is a clue that we might have to look at this request and instrument methods inside it*

  Depending on the programming language you are you using, you'll need to decorate your functions differently.

  **Note**: Take note of the service and endpoint/resource name you are working on, these will come in handy later in this guide.

{{< tabs >}}
{{% tab "Java" %}}

  Spans are the building blocks of APM Traces. You can quickly instrument entire methods in your code. Follow the code sample below to create a new span that traces your method and incldes it in Traces.

```java
TBD - Java
```

{{% /tab %}}
{{% tab "Python" %}}

  Spans are the building blocks of APM Traces. You can quickly instrument entire methods in your code. Follow the code sample below to create a new span that traces your method and incldes it in Traces.

```python
TBD - Python
```

{{% /tab %}}
{{% tab "Ruby" %}}

  Spans are the building blocks of APM Traces. You can quickly instrument entire methods in your code. Follow the code sample below to create a new span that traces your method and incldes it in Traces.

```ruby
TBD - Ruby
```

{{% /tab %}}
{{% tab "Go" %}}

  Spans are the building blocks of APM Traces. You can quickly instrument entire methods in your code. Follow the code sample below to create a new span that traces your method and incldes it in Traces.

```go
TBD - Go
```

{{% /tab %}}
{{% tab "Node.js" %}}

  Spans are the building blocks of APM Traces. You can quickly instrument entire methods in your code. Follow the code sample below to create a new span that traces your method and incldes it in Traces.

```javascript
TBD - js
```

{{% /tab %}}
{{% tab ".NET" %}}

  Spans are the building blocks of APM Traces. You can quickly instrument entire methods in your code. Follow the code sample below to create a new span that traces your method and incldes it in Traces.

```csharp
TBD - C#
```

{{% /tab %}}
{{% tab "PHP" %}}

  Spans are the building blocks of APM Traces. You can quickly instrument entire methods in your code. Follow the code sample below to create a new span that traces your method and incldes it in Traces.

```php
TBD - PHP
```

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-info">You might have to wait a few minutes between deploying your updated code and seeing the new tags in the Datadog UI</div>

## Instrument individual componenets of your methods to control the precision of your spans

**Follow the example to get your code instrumented**.

  In this example we'll be adding child spans to the `BackupLedger.write` span created above. This method adds a row to the transaction ledger, saves the entire ledger in memory and then notifies the service that the ledger is saved. We'll be adding spans to track each of the three actions.

{{< tabs >}}
{{% tab "Java" %}}

  If you require a precise trace of a small part of your method you can create a new span in your code and trace any specific part of your code. This is helpful in cases where a method performs multiple actions that extend beyond the individual service, like fetching data from a database. There' no need to trace the database call as it should be traced automatically.

```java
TBD - Java
```

{{% /tab %}}
{{% tab "Python" %}}

  If you require a precise trace of a small part of your method you can create a new span in your code and trace any specific part of your code. This is helpful in cases where a method performs multiple actions that extend beyond the individual service, like fetching data from a database. There' no need to trace the database call as it should be traced automatically.
```python
TBD - Python
```

{{% /tab %}}
{{% tab "Ruby" %}}

  If you require a precise trace of a small part of your method you can create a new span in your code and trace any specific part of your code. This is helpful in cases where a method performs multiple actions that extend beyond the individual service, like fetching data from a database. There' no need to trace the database call as it should be traced automatically.

```ruby
TBD - Ruby
```

{{% /tab %}}
{{% tab "Go" %}}

  If you require a precise trace of a small part of your method you can create a new span in your code and trace any specific part of your code. This is helpful in cases where a method performs multiple actions that extend beyond the individual service, like fetching data from a database. There' no need to trace the database call as it should be traced automatically.

```go
TBD - Go
```

{{% /tab %}}
{{% tab "Node.js" %}}

  If you require a precise trace of a small part of your method you can create a new span in your code and trace any specific part of your code. This is helpful in cases where a method performs multiple actions that extend beyond the individual service, like fetching data from a database. There' no need to trace the database call as it should be traced automatically.

```javascript
TBD - js
```

{{% /tab %}}
{{% tab ".NET" %}}

  If you require a precise trace of a small part of your method you can create a new span in your code and trace any specific part of your code. This is helpful in cases where a method performs multiple actions that extend beyond the individual service, like fetching data from a database. There' no need to trace the database call as it should be traced automatically.

```csharp
TBD - C#
```

{{% /tab %}}
{{% tab "PHP" %}}

  If you require a precise trace of a small part of your method you can create a new span in your code and trace any specific part of your code. This is helpful in cases where a method performs multiple actions that extend beyond the individual service, like fetching data from a database. There' no need to trace the database call as it should be traced automatically.

```php
TBD - PHP
```

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-info">You might have to wait a few minutes between deploying your updated code and seeing the new tags in the Datadog UI</div>

## Leverage the Datadog UI to see your new custom spans

  Now that you have instrumented your business logic, it's time to see the results in the Datadog APM UI.

  1. **Go to the Service List**, identify the service you've added custom spans to and **go to the Service Page**, from there, **click on the specific endpoint/resource** you worked on. Change the time filter to `The past 15 minutes` and scroll down to the Span Summary table.

  {{< img src="tracing/guide/custom_span/custom_span_3.png" alt="Span Summary Table" responsive="true" style="width:90%;">}}
    *You should now be able to find the new spans you've added*

  The Span Summary table is a great way to have an at-a-glance view of aggregate information about the spans that make up your traces. Here you can identify spans that repeat an abnormal amount of times indicating some looping or database access inefficiency (like the `n+1` issue).

  2. **Scroll down to the Traces list** and click into one of the traces you see there.

  {{< img src="tracing/guide/custom_span/custom_span_4.png" alt="Analytics View" responsive="true" style="width:90%;">}}

You've now successfully added custom spans to your codebase. This is the first step towards taking full advantage of Datadog's tools. You can now [add custom tags to your spans][1] to make them even more powerful.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/tracing/guide/add_span_md_and_graph_it
