---
title: Instrument a custom method to get deep visibility into your business logic
kind: guide
further_reading:
- link: "/tracing/guide/alert_anomalies_p99_database/"
  tag: "3 mins"
  text: "Alert on anomalous p99 latency of a database service"
- link: "/tracing/guide/week_over_week_p50_comparison/"
  tag: "2 mins"
  text: "Compare a service’s latency to the previous week"
- link: "/tracing/guide/slowest_request_daily/"
  tag: "3 mins"
  text: "Debug the slowest trace on the slowest endpoint of a web service"
- link: "/tracing/guide/"
  tag: ""
  text: "All guides"
---

_8 minutes to complete_

{{< img src="tracing/guide/custom_span/custom_span_1.png" alt="Analytics View"  style="width:90%;">}}

To provide you with deep visibility into your business logic, Datadog APM allows you to customize the spans that make up your traces based on your needs and implementation. This empowers you to trace any method in your codebase and even specific components within methods. You can use this to optimize and monitor critical areas of your application at the granularity that works for you.

Datadog instruments many frameworks out-of-the-box, such as web services, databases, and caches, and enables you to instrument your own business logic to have the exact visibility you need. By creating spans for methods, you can optimize timing and track errors using the APM flame graph and monitors.

## Instrumenting your code

**Follow the example to get your code instrumented**.

These examples walk through tracing the entire `BackupLedger.write` method to measure its execution time and status. `BackupLedger.write` is an action that saves the current state of a transaction ledger in memory before making a call to a payments database to post a new customer charge. This happens when the `charge` endpoint of the payments service is hit:

{{< img src="tracing/guide/custom_span/custom_span_2.png" alt="Analytics View"  style="width:90%;">}}

The `http.request POST /charge/` span is taking a lot of time without having any direct child spans. This is a clue that this request requires further instrumentation to gain better insights into its behavior. Depending on the programming language you are using, you need to decorate your functions differently:
{{< programming-lang-wrapper langs="java,python,ruby,go,nodejs,.NET,php" >}}
{{< programming-lang lang="java" >}}

In Java, Datadog APM allows you to instrument your code to generate custom spans—either by using method decorators, or by instrumenting specific code blocks.

**Instument a method with a decorator**:

This example adds a span to the `BackupLedger.write` method, which adds new rows to a transaction ledger. One span is added to track all posted transactions as a single unit.

```java
import datadog.trace.api.Trace

public class BackupLedger {

  // Use @Trace annotation to trace custom methods
  @Trace
  public void write(List<Transaction> transactions) {
    for (Transaction transaction : transactions) {
      ledger.put(transaction.getId(), transaction);
    }

    // [...]
  }
}
```

**Instrument a specific code block**:

This example adds child spans to the `BackupLedger.write` span created above. This method adds a child span for every transaction in the ledger and a [custom tag][1] with the specific transaction ID.

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
      // Note: The scope in the try with resource block below
      // will be automatically closed at the end of the code block.
      // If you do not use a try with resource statement, you need
      // to call scope.close().
      try (Scope scope = tracer.buildSpan("BackupLedger.persist").startActive(true)) {
        // Add custom metadata to the span
        scope.span().setTag("transaction.id", transaction.getId());
        ledger.put(transaction.getId(), transaction);
      }
    }

    // [...]
  }
}
```

[1]: /tracing/guide/add_span_md_and_graph_it/
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

In Python, Datadog APM allows you to instrument your code to generate custom spans—either by using method decorators, or by instrumenting specific code blocks.

**Instument a method with a decorator**:

This example adds a span to the `BackupLedger.write` method, which adds new rows to a transaction ledger. One span is added to track all posted transactions as a single unit.

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

**Instrument a specific code block**:

This example adds child spans to the `BackupLedger.write` span created above. This method adds a child span for every transaction in the ledger and a [custom tag][1] with the specific transaction ID.

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

[1]: /tracing/guide/add_span_md_and_graph_it/
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

  In Ruby, Datadog APM allows you to instrument your code to generate custom spans by instrumenting specific code blocks.

  This example creates a new span for the call to the `BackupLedger.write` method and a child span for every transaction posted to the ledger with a [custom tag][1] with the specific transaction ID.

```ruby
require 'ddtrace'

class BackupLedger

  def write(transactions)
    # Use global `Datadog::Tracing.trace` to trace blocks of inline code
    Datadog::Tracing.trace('BackupLedger.write') do |method_span|
      transactions.each do |transaction|
        Datadog::Tracing.trace('BackupLedger.persist') do |span|
          # Add custom metadata to the "persist_transaction" span
          span.set_tag('transaction.id', transaction.id)
          ledger[transaction.id] = transaction
        end
      end
    end

    # [...]
  end
end
```

[1]: /tracing/guide/add_span_md_and_graph_it/
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

  In Go, Datadog APM allows you to instrument your code to generate custom spans by instrumenting specific code blocks.

  This example creates a new span for every transaction posted to the ledger and adds a [custom tag][1] with the specific transaction ID to the span.

```go
package ledger

import "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"

// [...]

func (bl *BackupLedger) write(ctx context.Context, transactions []*Transaction) (err error) {
  // Trace the `write` function and capture the error if present
  span, ctx := tracer.StartSpanFromContext(ctx, "BackupLedger.write")
  defer func() {
    span.Finish(tracer.WithError(err))
  }()

  for _, t := range transactions {
    if err := bl.persistTransaction(ctx, t); err != nil {
      return err
    }
  }
  return nil
}

// persistTransaction is an inner function you may want to Trace. You can use the
// same approach as before because the `ctx` you pass down includes out-of-the-box span
// references to create a parent/child relationships.
func (bl *BackupLedger) persistTransaction(ctx context.Context, transaction *Transaction) error {
  id := transaction.ID
  span, _ := tracer.StartSpanFromContext(ctx, "BackupLedger.persist", tracer.Tag("transaction_id", id))
  defer span.Finish()

  if t, ok := bl.transactions[id]; ok {
    return errors.New("duplicate entry")
  }
  bl.transactions[id] = transaction
  return nil
}
```

[1]: /tracing/guide/add_span_md_and_graph_it/
{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}

  In Node.js, Datadog APM allows you to instrument your code to generate custom spans by instrumenting specific code blocks.

This example creates a new span for the call to the `BackupLedger.write` method and a child span for every transaction posted to the ledger with a [custom tag][1] with the specific transaction ID.

```javascript
const tracer = require('dd-trace')

function write (transactions) {
  // Use `tracer.trace` context manager to trace blocks of inline code
  tracer.trace('BackupLedger.write', () => {
    for (const transaction of transactions) {
      // Add custom metadata to the "persist_transaction" span
      span.setTag('transaction.id', transaction.id)
      this.ledger[transaction.id] = transaction
    }
  })

  // [...]
}
```

[1]: /tracing/guide/add_span_md_and_graph_it/
{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}

  In .NET, Datadog APM allows you to instrument your code to generate custom spans by instrumenting specific code blocks.

This example creates a new span for every transaction posted to the ledger and adds a [custom tag][1] with the specific transaction ID to the span.

```csharp
using Datadog.Trace;

public void Write(List<Transaction> transactions)
{
    // Use global tracer to trace blocks of inline code
    using (var scope = Tracer.Instance.StartActive("BackupLedger.write"))
    {
        foreach (var transaction in transactions)
        {
            using (var scope = Tracer.Instance.StartActive("BackupLedger.persist"))
            {
                // Add custom metadata to the span
                scope.Span.SetTag("transaction.id", transaction.Id);
                this.ledger[transaction.Id] = transaction;
            }
        }
    }

    // [...]
}
```

[1]: /tracing/guide/add_span_md_and_graph_it/
{{< /programming-lang >}}
{{< programming-lang lang="php" >}}

In PHP, Datadog APM allows you to instrument your code to generate custom spans—either by using method wrappers, or by instrumenting specific code blocks.

**Instrument a method with a wrapper**:

This example adds a span to the `BackupLedger.write` method, which adds new rows to a transaction ledger. One span is added to track all posted transactions as a single unit by using the `DDTrace\trace_method()` function.

```php
<?php
  class BackupLedger {

    public function write(array $transactions) {
      foreach ($transactions as $transaction) {
        $this->transactions[$transaction->getId()] = $transaction;
      }

      # [...]
    }
  }

  // For ddtrace < v0.47.0 use \dd_trace_method()
  \DDTrace\trace_method('BackupLedger', 'write', function (\DDTrace\SpanData $span) {
    // SpanData::$name defaults to 'ClassName.methodName' if not set (>= v0.47.0)
    $span->name = 'BackupLedger.write';
    // SpanData::$resource defaults to SpanData::$name if not set (>= v0.47.0)
    $span->resource = 'BackupLedger.write';
    $span->service = 'php';
  });
?>
```

**Instrument a specific code block**:

This example adds child spans to the `BackupLedger.write` span created above. This method adds a child span for every transaction in the ledger and a [custom tag][1] with the specific transaction ID.

```php
<?php
  class BackupLedger {

    public function write(array $transactions) {
      foreach ($transactions as $transaction) {
        // Use global tracer to trace blocks of inline code
        $scope = \DDTrace\GlobalTracer::get()->startActiveSpan('BackupLedger.persist');

        // Add custom metadata to the span
        $scope->getSpan()->setTag('transaction.id', $transaction->getId());
        $this->transactions[$transaction->getId()] = $transaction;

        // Close the span
        $scope->close();
      }

      # [...]
    }
  }

  // For ddtrace < v0.47.0 use \dd_trace_method()
  \DDTrace\trace_method('BackupLedger', 'write', function (\DDTrace\SpanData $span) {
    // SpanData::$name defaults to 'ClassName.methodName' if not set (>= v0.47.0)
    $span->name = 'BackupLedger.write';
    // SpanData::$resource defaults to SpanData::$name if not set (>= v0.47.0)
    $span->resource = 'BackupLedger.write';
    $span->service = 'php';
  });
?>
```

[1]: /tracing/guide/add_span_md_and_graph_it/
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

## Leverage the Datadog UI to see your new custom spans

Now that you have instrumented your business logic, it's time to see the results in the Datadog APM UI.

1. Go to the **[Service List][1]**, identify the service you added custom spans to, and then go to the **Service Page**. On the service page, click on the **specific resource** you added, change the time filter to `The past 15 minutes`, and scroll down to the span summary table:

    {{< img src="tracing/guide/custom_span/custom_span_3.png" alt="Span Summary Table"  style="width:90%;">}}

    *You should now be able to find the new spans you've added*

The span summary table provides aggregate information about the spans that make up your traces. Here you can identify spans that repeat an abnormal amount of times indicating some looping or database access inefficiency (like the [`n+1` issue][2]).

2. Scroll down to the **Traces list** and click into one of your traces.

    {{< img src="tracing/guide/custom_span/custom_span_4.png" alt="Analytics View"  style="width:90%;">}}

You've now successfully added custom spans to your codebase, making them available on the flame graph and in [App Analytics][3]. This is the first step towards taking full advantage of Datadog's tools. You can now [add custom tags to your spans][4] to make them even more powerful.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/services
[2]: https://bojanv91.github.io/posts/2018/06/select-n-1-problem
[3]: https://app.datadoghq.com/apm/analytics
[4]: /tracing/guide/add_span_md_and_graph_it/
