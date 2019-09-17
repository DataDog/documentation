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

Datadog instruments many frameworks out-of-the-box such as web services, databases and caches and it enables you to instrument your own business logic to have the exact visibility you need. By creating spans for the methods, you can optimize timing and track errors using the APM flamegraph and Datadog monitors.

## Instrument a complete method with decorators

**Follow the example to get your code instrumented**.

These examples walk through tracing the entire `BackupLedger.write` method to measure it's execution time and status. `BackupLedger.write` is an action that saves the current state of our transaction ledger in memory before making a call to our payments database to post a new customer charge. This happens when the `charge` endpoint of our payments service is hit:

{{< img src="tracing/guide/custom_span/custom_span_2.png" alt="Analytics View" responsive="true" style="width:90%;">}}

Note that the `http.request POST /charge/` span is taking a lot of time without having any direct child spans. This is a clue that this request requires further instrumentation to gain better insights into its behavior. Depending on the programming language you are using, you need to decorate your functions differently:


{{< tabs >}}
{{% tab "Java" %}}

```java
import datadog.trace.api.Trace

public class BackupLedger {

  // Use @Trace annotation to trace custom methods
  @Trace
  public void write(List<Transaction> transactions) {
    for (Transaction transaction : transactions) {
      ledger.put(transaction.getId(), transaction);
    }
  }

}
```

{{% /tab %}}
{{% tab "Python" %}}

```python
from ddtrace import tracer

class BackupLedger:

    # Use `tracer.wrap` decorator to trace custom methods
    @tracer.wrap()
    def write(self, transactions):
        for transaction in transactions:
            self.ledger[transaction.id] = transaction

        # [...]
```

{{% /tab %}}
{{% tab "Ruby" %}}

```ruby
class BackupLedger
  def write(transactions)
    Datadog.tracer.trace('BackupLedger.write') do |span|
      transactions.each do |transaction|
        ledger[transaction.id] = transaction
      end
    end
  end
end
```

{{% /tab %}}
{{% tab "Go" %}}


```go
TBD - Go
```

{{% /tab %}}
{{% tab "Node.js" %}}

```javascript
TBD - js
```

{{% /tab %}}
{{% tab ".NET" %}}

Coming Soon. Reach out to [the Datadog support team][1] to learn more.


[1]: https://docs.datadoghq.com/help
{{% /tab %}}
{{% tab "PHP" %}}

```php
class BackupLedger {
  # [...]
  public function write(array $transactions) {
    foreach ($transactions as $transaction) {
      $this->transactions[$transaction->getId()] = $transaction;
    }
    # [...]
  }
}

// Use dd_trace() to trace custom methods
dd_trace('BackupLedger', 'write', function () {
  $tracer = \DDTrace\GlobalTracer::get();
  $scope = $tracer->startActiveSpan('BackupLedger.write');
  dd_trace_forward_call();
  $scope->close();
});
```

{{% /tab %}}
{{< /tabs >}}

## Instrument individual components of your methods for better visibility into their performance

**Follow the example to get your code instrumented**.

In this example walks through adding child spans to the `BackupLedger.write` span created above. This method adds a row to the transaction ledger, saves the entire ledger in memory, and then notifies the service that the ledger is saved. This examples adds spans to track each of the three actions.


{{< tabs >}}
{{% tab "Java" %}}

```java
import datadog.trace.api.Trace;
import io.opentracing.Scope;
import io.opentracing.Tracer;
import io.opentracing.util.GlobalTracer;

public class BackupLedger {

  // Use `@Trace` annotation to trace custom methods
  @Trace
  public void write(List<Transaction> transactions) {
    for (Transaction transaction : transactions) {
      // Use `GlobalTracer` to trace blocks of inline code
      Tracer tracer = GlobalTracer.get();
      try (Scope scope = tracer.buildSpan("BackupLedger.persist").startActive(true)) {
        // Add custom metadata to the span
        scope.span().setTag("transaction.id", transaction.getId());
        ledger.put(transaction.getId(), transaction);
      }
    }
  }

}
```

{{% /tab %}}
{{% tab "Python" %}}

```python
from ddtrace import tracer

class BackupLedger:

    # Use `tracer.wrap` decorator to trace custom methods
    @tracer.wrap()
    def write(self, transactions):
        for transaction in transactions:
            # Use `tracer.trace` context manager to trace blocks of inline code
            with tracer.trace('BackupLedger.persist') as span:
                # Add custom metadata to the "persist_transaction" span
                span.set_tag('transaction.id', transaction.id)
                self.ledger[transaction.id] = transaction

        # [...]
```

{{% /tab %}}
{{% tab "Ruby" %}}

```ruby
class BackupLedger
  def write(transactions)
    Datadog.tracer.trace('BackupLedger.write') do |method_span|
      transactions.each do |transaction|
        Datadog.tracer.trace('BackupLedger.persist') do |span|
          # Add custom metadata to the "persist_transaction" span
          span.set_tag('transaction.id', transaction.id)
          ledger[transaction.id] = transaction
        end
      end
    end
  end
end
```

{{% /tab %}}
{{% tab "Go" %}}

```go
TBD - Go
```

{{% /tab %}}
{{% tab "Node.js" %}}

```javascript
function write (transactions) {
  for (const transaction of transactions) {
    // Use `tracer.trace` context manager to trace blocks of inline code
    tracer.trace('BackupLedger.persist', span => {
      // Add custom metadata to the "persist_transaction" span
      span.setTag('transaction.id', transaction.id)
      this.ledger[transaction.id] = transaction
    })
  }
})
```

{{% /tab %}}
{{% tab ".NET" %}}

```csharp
using Datadog.Trace;

public void Write(List<Transaction> transactions)
{
    foreach (var transaction in transactions)
    {
        // Use global tracer to trace blocks of inline code
        using (var scope = Tracer.Instance.StartActive("BackupLedger.persist"))
        {
            // Add custom metadata to the span
            scope.Span.SetTag("transaction.id", transaction.Id);

            this.ledger[transaction.Id] = transaction;
        }
    }
}
```

{{% /tab %}}
{{% tab "PHP" %}}

```php
class BackupLedger {
  # [...]
  public function write(array $transactions) {
    foreach ($transactions as $transaction) {
      // Use global tracer to trace blocks of inline code
      $scope = \DDTrace\GlobalTracer::get()->startActiveSpan('BackupLedger.persist');
      // Add custom metadata to the span
      $scope->getSpan()->setTag('transaction.id', $transaction->getId());
      $this->transactions[$transaction->getId()] = $transaction;
      $scope->close();
    }
    # [...]
  }
}
```

{{% /tab %}}
{{< /tabs >}}

## Leverage the Datadog UI to see your new custom spans

Now that you have instrumented your business logic, it's time to see the results in the Datadog APM UI.

1. **Go to the [Service List][1]**, identify the service you added custom spans to and **go to the Service Page**, from there, **click on the specific resource** you worked on. Change the time filter to `The past 15 minutes` and scroll down to the Span Summary table:

    {{< img src="tracing/guide/custom_span/custom_span_3.png" alt="Span Summary Table" responsive="true" style="width:90%;">}}

    *You should now be able to find the new spans you've added*

    The Span Summary table is a great way to have an at-a-glance view of aggregate information about the spans that make up your traces. Here you can identify spans that repeat an abnormal amount of times indicating some looping or database access inefficiency (like the `n+1` issue).

2. **Scroll down to the Traces list** and click into one of the traces you see there.

    {{< img src="tracing/guide/custom_span/custom_span_4.png" alt="Analytics View" responsive="true" style="width:90%;">}}

You've now successfully added custom spans to your codebase making them available on the Flamegraph and in [Trace Search & Analytics][2]. This is the first step towards taking full advantage of Datadog's tools. You can now [add custom tags to your spans][3] to make them even more powerful.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/services
[2]: https://app.datadoghq.com/apm/search/analytics
[3]: https://docs.datadoghq.com/tracing/guide/add_span_md_and_graph_it
