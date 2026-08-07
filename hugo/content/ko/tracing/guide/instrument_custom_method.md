---
further_reading:
- link: /tracing/guide/alert_anomalies_p99_database/
  tag: 3분
  text: 데이터베이스 서비스의 비정상 p99 대기 시간 알림
- link: /tracing/guide/week_over_week_p50_comparison/
  tag: 2 mins
  text: 서비스 대기 시간을 지난 주와 비교
- link: /tracing/guide/slowest_request_daily/
  tag: 3분
  text: 웹 서비스에서 가장 느린 엔드포인트에서 가장 느린 트레이스 디버깅
- link: /tracing/guide/
  tag: ''
  text: 모든 가이드
title: 커스텀 메서드 계측을 통해 비즈니스 논리를 더 깊게 가시화하기
---

_읽는 데 걸리는 시간 8분_

{{< img src="tracing/guide/custom_span/custom_span_1_cropped.png" alt="분석 보기" style="width:90%;">}}

<div class="alert alert-danger"><strong>참고</strong>: 이 페이지에서는 OpenTracing를 사용해 애플리케이션을 커스텀 계측하는 방법을 설명합니다. OpenTracing은 이제 더 이상 사용되지 않습니다. 여기에 나와 있는 내용을 적용할 수는 있으나 내가 사용하는 언어에 따라 <a href="/tracing/trace_collection/otel_instrumentation/">OpenTelemetry로 커스텀 계측</a>에 안내된 지침과 예시를 따르세요.</div>

Datadog APM에서는 내 비즈니스 논리를 더 깊게 가시화하기 위해 내 트레이스를 구성하는 스팬을 필요와 구현에 따라 맞춤화할 수 있는 기능을 제공합니다. 이 기능을 통해 내 코드 베이스에 있는 메서드를 추적할 수 있도록 도와주고, 더 나아가 메서드 안의 특정 구성 요소도 추적할 수 있습니다. 이 방법을 사용해 내게 맞도록 세분화하여 애플리케이션의 중요 영역을 모니터링하고 최적화할 수 있습니다.

Datadog에서는 웹 서비스, 데이터베이스, 캐시 등 다양한 기본 계측 기능을 많이 제공하며, 내 자체 사업 논리를 계측해 내 필요에 딱 맞는 가시화를 제공할 수 있습니다. 메서드 스팬을 생성해 APM 플레임 그래프와 모니터를 사용하여 시간을 최적화하고 오류를 추적할 수 있습니다.

## 내 코드 계측

**내 코드를 계측하려면 예시를 따르세요**.

다음 예시에서는 실행 시간과 상태를 측정하기 위해 `BackupLedger.write` 메서드 전체를 추적하는 방법을 단계별로 설명합니다. `BackupLedger.write`은 새 고객 청구를 게시하기 위해 페이로드 데이터베이스에 호출하기 전에 작업 원장의 현재 상태를 메모리에 저장하는 작업입니다. 결제 서비스의 `charge` 엔드포인트가 연결될 때 이 작업이 실행됩니다.

{{< img src="tracing/guide/custom_span/custom_span_2_cropped.png" alt="분석 보기" style="width:90%;">}}

직접적인 하위 스팬이 없는데 `http.request POST /charge/` 스팬 시간이 오래 걸리는 것을 알 수 있습니다. 이를 통해 이 요청 작업에 관한 인사이트를 얻으려면 더 많은 계측이 필요함을 알 수 있습니다. 사용하는 프로그램 언어에 따라 함수를 다르게 장식해야 합니다.
 {{< programming-lang-wrapper langs="java,python,ruby,go,nodejs,.NET,php" >}}
{{< programming-lang lang="java" >}}

Java의 경우 Datadog APM을 이용해 코드를 계측하고 커스텀 스팬을 생성할 수 있습니다. 이때 메서드 장식자나 특정 코드 블록을 사용할 수 있습니다.

**장식자를 사용해 메서드 계측**:

이 예시에서는 `BackupLedger.write` 메서드에 스팬을 추가하여 거래 원장에 새 행을 추가합니다. 스팬 하나를 추가해 게시된 모든 거래를 단일 단위로 추적합니다.

```java
import datadog.trace.api.Trace

public class BackupLedger {

  // @Trace 주석을 사용해 커스텀 메서드 추적
  @Trace
  public void write(List<Transaction> transactions) {
    for (Transaction transaction : transactions) {
      ledger.put(transaction.getId(), transaction);
    }

    // [...]
  }
}
```

**특정 코드 블록 계측**:

이 예시에서는 위에 생성한 `BackupLedger.write` 스팬에 하위 스팬을 추가합니다. 이 방법에서는 원장의 각 거래마다 하위 스팬을 추가하고 특정 거래 ID로 [커스텀 태그][1]를 추가합니다.

```java
import datadog.trace.api.Trace;
import io.opentracing.Scope;
import io.opentracing.Tracer;
import io.opentracing.util.GlobalTracer;

public class BackupLedger {

  // `@Trace` 주석을 사용해 커스텀 메서드 추적
  @Trace
  public void write(List<Transaction> transactions) {
    for (Transaction transaction : transactions) {
      // `GlobalTracer`를 사용해 인라인 코드 블록 추적
      Tracer tracer = GlobalTracer.get();
      // 참고: 아래 리소스 try 블록 범위는
      // 코드 블록 마지막에 자동으로 종료됩니다.
      // 리소스 문이 있는 try 블록을 사용하지 않을 경우
      // scope.close()를 호출해야 합니다.
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

[1]: /ko/tracing/trace_collection/custom_instrumentation/otel_instrumentation/
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

Python의 경우 Datadog APM을 이용해 코드를 계측하고 커스텀 스팬을 생성할 수 있습니다. 이때 메서드 장식자나 특정 코드 블록을 사용할 수 있습니다.

**장식자를 사용해 메서드 계측**:

이 예시에서는 `BackupLedger.write` 메서드에 스팬을 추가하여 거래 원장에 새 행을 추가합니다. 스팬 하나를 추가해 게시된 모든 거래를 단일 단위로 추적합니다.

```python
from ddtrace import tracer

class BackupLedger:

    # `tracer.wrap` 장식자를 사용해 커스텀 메서드를 추적
    @tracer.wrap()
    def write(self, transactions):
        for transaction in transactions:
            self.ledger[transaction.id] = transaction

        # [...]
```

**특정 코드 블록 계측**:

이 예시에서는 위에 생성한 `BackupLedger.write` 스팬에 하위 스팬을 추가합니다. 이 방법에서는 원장의 각 거래마다 하위 스팬을 추가하고 특정 거래 ID로 [커스텀 태그][1]를 추가합니다.

```python
from ddtrace import tracer

class BackupLedger:

    # `tracer.wrap` 장식자를 사용해 커스텀 메서드 추적
    @tracer.wrap()
    def write(self, transactions):
        for transaction in transactions:
            # `tracer.trace` 컨텍스트 매니저를 사용해 인라인 코드 블록 추적
            with tracer.trace('BackupLedger.persist') as span:
                # "persist_transaction" 스팬에 커스텀 메타데이터 추가
                span.set_tag('transaction.id', transaction.id)
                self.ledger[transaction.id] = transaction

        # [...]
```

[1]: /ko/tracing/trace_collection/custom_instrumentation/otel_instrumentation/
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

Ruby의 경우 Datadog APM을 이용해 코드를 계측하고 특정 코드 블록을 계측해 커스텀 스팬을 생성할 수 있습니다.

이 예시에서는  `BackupLedger.write` 메서드 호출에 새 스팬을 생성하고 원장에 게시된 거래마다 특정 거래 ID가 연결된 [커스텀 태그][1] 하위 스팬을 생성합니다.

```ruby
require 'ddtrace'

class BackupLedger

  def write(transactions)
    # 인라인 코드 블록을 추적할 때 전역 `Datadog::Tracing.trace`을 사용
    Datadog::Tracing.trace('BackupLedger.write') do |method_span|
      transactions.each do |transaction|
        Datadog::Tracing.trace('BackupLedger.persist') do |span|
          # "persist_transaction" 스팬에 커스텀 메타 데이터 추가
          span.set_tag('transaction.id', transaction.id)
          ledger[transaction.id] = transaction
        end
      end
    end

    # [...]
  end
end
```

[1]: /ko/tracing/trace_collection/custom_instrumentation/otel_instrumentation/
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

Go의 경우 Datadog APM을 이용해 코드를 계측하고 특정 코드 블록을 계측해 커스텀 스팬을 생성할 수 있습니다.

이 예시에서는 원장에 게시된 각 거래에 새 스팬을 생성하고 스팬에 특정 거래 ID로 [커스텀 태그][1]를 추가합니다.

```go
package ledger

import "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"

// [...]

func (bl *BackupLedger) write(ctx context.Context, transactions []*Transaction) (err error) {
  // `write` 함수를 추적하고 오류가 있으면 캡처
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

// persistTransaction는 추적해야 하는 내부 함수임.
// 전달한 `ctx`에 기본 스팬이 포함되어 있기 때문에 이전과 동일한 방법을 사용할 수 있음.
// 상위/하위 관계 생성 참조.
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

[1]: /ko/tracing/trace_collection/custom_instrumentation/otel_instrumentation/
{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}

Node.js의 경우 Datadog APM을 이용해 코드를 계측하고 특정 코드 블록을 계측해 커스텀 스팬을 생성할 수 있습니다.

이 예시에서는  `BackupLedger.write` 메서드 호출에 새 스팬을 생성하고 원장에 게시된 거래마다 특정 거래 ID가 연결된 [커스텀 태그][1] 하위 스팬을 생성합니다.

```javascript
const tracer = require('dd-trace')

function write (transactions) {
  // 인라인 코드 블록을 추적할 때 `tracer.trace` 컨텍스트 매니저를 사용
  tracer.trace('BackupLedger.write', () => {
    for (const transaction of transactions) {
      tracer.trace('BackupLedger.persist' , (span) => {
        // "persist_transaction" 스팬에 커스텀 메타데이터 추가
        span.setTag('transaction.id', transaction.id)
        this.ledger[transaction.id] = transaction
      })
    }
  })

  // [...]
}
```

[1]: /ko/tracing/trace_collection/custom_instrumentation/otel_instrumentation/
{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}

.NET의 경우 Datadog APM을 이용해 코드를 계측하고 특정 코드 블록을 계측해 커스텀 스팬을 생성할 수 있습니다.

이 예시에서는 원장에 게시된 각 거래에 새 스팬을 생성하고 스팬에 특정 거래 ID로 [커스텀 태그][1]를 추가합니다.

```csharp
using Datadog.Trace;

public void Write(List<Transaction> transactions)
{
    // 인라인 코드 블록을 추적할 때 전역 추적 사용
    using (var scope = Tracer.Instance.StartActive("BackupLedger.write"))
    {
        foreach (var transaction in transactions)
        {
            using (var scope = Tracer.Instance.StartActive("BackupLedger.persist"))
            {
                // 스팬에 커스텀 메타데이터 추가
                scope.Span.SetTag("transaction.id", transaction.Id);
                this.ledger[transaction.Id] = transaction;
            }
        }
    }

    // [...]
}
```

[1]: /ko/tracing/trace_collection/custom_instrumentation/otel_instrumentation/
{{< /programming-lang >}}
{{< programming-lang lang="php" >}}

PHP의 경우 Datadog APM을 이용해 코드를 계측하고 커스텀 스팬을 생성할 수 있습니다. 이때 메서드 래퍼나 특정 코드 블록을 사용할 수 있습니다.

**래퍼를 사용해 메서드 계측**:

이 예시에서는 `BackupLedger.write` 메서드에 스팬을 추가하여 거래 원장에 새 행을 추가합니다. `DDTrace\trace_method()` 함수를 사용해 스팬 하나를 추가하여 게시된 모든 거래를 단일 단위로 추적합니다.

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

  // ddtrace < v0.47.0의 경우 \dd_trace_method() 사용
  \DDTrace\trace_method('BackupLedger', 'write', function (\DDTrace\SpanData $span) {
    //  (>= v0.47.0)이 아니면 SpanData::$name 기본값이 'ClassName.methodName'이 됨
    $span->name = 'BackupLedger.write';
    // (>= v0.47.0)가 아니면 SpanData::$resource 기본값이 SpanData::$name이 됨
    $span->resource = 'BackupLedger.write';
    $span->service = 'php';
  });
?>
```

**특정 코드 블록 계측**:

이 예시에서는 위에 생성한 `BackupLedger.write` 스팬에 하위 스팬을 추가합니다. 이 방법에서는 원장의 각 거래마다 하위 스팬을 추가하고 특정 거래 ID로 [커스텀 태그][1]를 추가합니다.

```php
<?php
  class BackupLedger {

    public function write(array $transactions) {
      foreach ($transactions as $transaction) {
        // 인라인 코드 블록을 추적할 때 전역 추적을 사용
        $span = \DDTrace\start_span();
        $span->name = 'BackupLedger.persist';

        // 스팬에 커스텀 메타데이터 추가
        $span->meta['transaction.id'] = $transaction->getId();
        $this->transactions[$transaction->getId()] = $transaction;

        // 스팬 닫기
        \DDTrace\close_span();
      }

      # [...]
    }
  }

  // ddtrace < v0.47.0의 경우 \dd_trace_method() 사용
  \DDTrace\trace_method('BackupLedger', 'write', function (\DDTrace\SpanData $span) {
    // (>= v0.47.0)이 아니면 SpanData::$name 기본값이 'ClassName.methodName'이 됨
    $span->name = 'BackupLedger.write';
    // (>= v0.47.0)이 아니면 SpanData::$resource 기본값이 SpanData::$name이 됨
    $span->resource = 'BackupLedger.write';
    $span->service = 'php';
  });
?>
```

[1]: /ko/tracing/trace_collection/custom_instrumentation/otel_instrumentation/
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

## Datadog UI를 활용해 새 커스텀 스팬 보기

내 비즈니스 로직을 계측했으니 이제 Datadog APM UI에서 확인할 차례입니다.

1. **[Service Catalog][1]**로 이동하고 커스텀 스팬을 추가한 서비스를 클릭하여 서비스 페이지를 여세요. 서비스 페이지에서 추가한 **specific resource**를 클릭하고 시간 필터를 `The past 15 minutes`로 변경한 뒤 아래에 있는 스팬 요약 테이블로 이동하세요.

    {{< img src="tracing/guide/custom_span/custom_span_3.png" alt="스팬 요약 테이블" style="width:90%;">}}

스팬 요약 테이블에서는 트레이스를 구성하는 스팬의 집계 정보를 표시합니다. 여기에서 반복 또는 효율성을 떨어뜨리는 데이터베이스 액세스(예: `n+1` 문제][2])를 감지하여 이상하게 반복된 스팬 파악할 수 있습니다.

2. 아래에 있는 **Traces list**로 내려가 내 트레이스 하나를 클릭하세요.

    {{< img src="tracing/guide/custom_span/custom_span_4_cropped.png" alt="분석 보기" style="width:90%;">}}

코드 베이스에 커스텀 스팬을 추가하면 플레임 그래프와 [App Analytics][3]에서 볼 수 있습니다. 그러면 Datadog 도구를 잘 이용할 수 있는 첫 단계를 밟은 셈입니다. 이제 [내 스팬에 커스텀 태그를 추가][4]해 더욱 유용하게 활용할 수 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services
[2]: https://bojanv91.github.io/posts/2018/06/select-n-1-problem
[3]: https://app.datadoghq.com/apm/traces?viz=timeseries
[4]: /ko/tracing/trace_collection/custom_instrumentation/otel_instrumentation/