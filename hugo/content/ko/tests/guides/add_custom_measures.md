---
aliases:
- /ko/continuous_integration/guides/add_custom_metrics/
- /ko/tests/guides/add_custom_metrics/
description: 테스트에서 사용자 지정 측정값을 사용하는 방법을 알아보세요.
further_reading:
- link: /tests
  tag: 문서
  text: Test Optimization에 대해 알아보기
- link: /monitors/types/ci
  tag: 문서
  text: CI 모니터링에 대해 알아보기
title: 테스트에 사용자 지정 측정값 추가
---
## 개요 {#overview}

시작하기 전에 [Test Optimization][1]이 해당 언어에 대해 이미 설정되어 있는지 확인하세요. 이 가이드는 테스트에 사용자 지정 측정값을 추가하고 사용하는 방법을 안내합니다.

## 테스트에 사용자 지정 측정값 추가 {#add-the-custom-measure-to-your-test}

테스트에 사용자 지정 측정값을 추가하세요. 네이티브 계측을 사용하면 프로그래밍 방식 API를 사용할 수 있습니다.

{{< tabs >}}
{{% tab "JavaScript/TypeScript" %}}

```javascript
  it('sum function can sum', () => {
    const testSpan = require('dd-trace').scope().active()
    testSpan.setTag('test.memory.rss', process.memoryUsage().rss)
    // test continues normally
    // ...
  })
```

{{% /tab %}}

{{% tab "Java" %}}

사용자 지정 메트릭을 추가하려면 [`opentracing-util`][1] 라이브러리를 프로젝트의 컴파일 시간 종속성으로 포함하세요.

```java
import io.opentracing.Span;
import io.opentracing.util.GlobalTracer;

// ...
// inside your test
final Span span = GlobalTracer.get().activeSpan();
if (span != null) {
  span.setTag("test.memory.usage", 1e8);
}
// test continues normally
// ...
```

[1]: https://mvnrepository.com/artifact/io.opentracing/opentracing-util

{{% /tab %}}

{{% tab "Python" %}}

```python
from ddtrace import tracer
import os, psutil

# Declare `ddspan` as argument to your test
def test_simple_case(ddspan):
    # Set your tags
    process = psutil.Process()
    ddspan.set_tag("test.memory.rss", process.memory_info().rss)
    # test continues normally
    # ...
```

{{% /tab %}}

{{% tab ".NET" %}}

```csharp
// inside your test
var scope = Tracer.Instance.ActiveScope; // from Datadog.Trace;
if (scope != null) {
    scope.Span.SetTag("test.memory.usage", 1e8);
}
// test continues normally
// ...
```

{{% /tab %}}

{{% tab "Ruby" %}}

```ruby
require 'datadog/ci'

# inside your test
Datadog::CI.active_test&.set_tag('test.memory.usage', 1e8)
# test continues normally
# ...
```

{{% /tab %}}

{{% tab "Swift" %}}

```swift
import DatadogSDKTesting

// inside your test
DDTest.current?.setTag(key: "test.memory.usage", value: 1e8)
// test continues normally
// ...
```

{{% /tab %}}

{{% tab "JUnit 보고서 업로드" %}}

`datadog-ci`의 경우 `DD_MEASURES` 환경 변수 또는 `--measures` CLI 인수를 사용하세요.

```
DD_MEASURES="test.memory.usage:1000" datadog-ci junit upload --service my-service --measures test.request.rate:30 report.xml
```

{{% /tab %}}

{{< /tabs >}}

## 패싯 생성 {#create-a-facet}

[{{< ui >}}Test Runs{{< /ui >}} 페이지][2]로 이동하고 패싯 목록에서 {{< ui >}}\+ Add{{< /ui >}}를 클릭하여 테스트에 추가한 사용자 지정 측정값에 대한 패싯을 생성하세요.

{{< img src="/continuous_integration/facet_creation.png" text="Test Runs facet creation" style="width:100%" >}}

패싯 유형이 숫자 값을 나타내는 {{< ui >}}Measure{{< /ui >}}인지 확인합니다.

{{< img src="/continuous_integration/measure_creation.png" text="Test Runs measure creation" style="width:100%" >}}

{{< ui >}}Add{{< /ui >}}를 클릭하여 사용자 지정 측정값 사용을 시작하세요.

## 측정값 변화를 그래프로 나타내기 {#graph-the-evolution-of-your-measure}

{{< ui >}}Timeseries{{< /ui >}} 시각화를 선택하여 시간에 따른 측정값의 변화를 그래프로 나타내세요.

{{< img src="/continuous_integration/plot_measure.png" text="Plot benchmark mean duration" style="width:100%" >}}

예를 들어, 이 시각화를 사용하여 테스트의 메모리 사용량 변화를 추적할 수 있습니다.

## 그래프 내보내기 {#export-your-graph}

{{< ui >}}Export{{< /ui >}} 버튼을 클릭하여 그래프를 [대시보드][3] 또는 [노트북][4]으로 내보내고, 이를 기반으로 [모니터][5]를 생성할 수 있습니다.

{{< img src="/continuous_integration/export_measure.png" text="Export benchmark mean duration graph" style="width:100%" >}}

## 모니터 추가 {#add-a-monitor}

[CI 테스트 모니터][6]를 생성하여 측정값이 특정 임계값을 초과하거나 미달할 경우 알림을 받을 수 있습니다.

{{< img src="/continuous_integration/monitor_measure.png" text="Monitor benchmark mean duration" style="width:100%" >}}

예를 들어, 이러한 유형의 경보를 사용하여 메모리 사용량이 특정 임계값에 도달했음을 알림으로 받을 수 있습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tests/
[2]: https://app.datadoghq.com/ci/test-runs
[3]: /ko/dashboards
[4]: /ko/notebooks
[5]: /ko/monitors
[6]: https://app.datadoghq.com/monitors/create/ci-tests