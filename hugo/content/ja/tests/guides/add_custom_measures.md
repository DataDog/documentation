---
aliases:
- /ja/continuous_integration/guides/add_custom_metrics/
- /ja/tests/guides/add_custom_metrics/
description: テストでカスタムメジャーを使用する方法を紹介します。
further_reading:
- link: /tests
  tag: ドキュメント
  text: Test Optimization について
- link: /monitors/types/ci
  tag: ドキュメント
  text: CI モニターについて
title: テストにカスタムメジャーを追加する
---
## 概要 {#overview}

開始する前に、お使いの言語で [Test Optimization][1] がすでに設定されていることを確認してください。このガイドでは、テストにカスタムメジャーを追加して使用する方法について説明します。

## カスタムメジャーをテストに追加する {#add-the-custom-measure-to-your-test}

カスタムメジャーをテストに追加します。ネイティブインスツルメンテーションでは、プログラマティック API を使用できます。

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

カスタムメトリクスを追加するには、[`opentracing-util`][1] ライブラリをコンパイル時の依存関係としてプロジェクトに追加します。

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

{{% tab "JUnit レポートのアップロード" %}}

`datadog-ci` の場合、`DD_MEASURES` 環境変数または `--measures` CLI 引数を使用します。

```
DD_MEASURES="test.memory.usage:1000" datadog-ci junit upload --service my-service --measures test.request.rate:30 report.xml
```

{{% /tab %}}

{{< /tabs >}}

## ファセットを作成する {#create-a-facet}

テストに追加したカスタムメジャーのファセットを作成するには、[{{< ui >}}Test Runs{{< /ui >}} ページ][2]に移動し、ファセットリストの {{< ui >}}\+ Add{{< /ui >}} をクリックします。

{{< img src="/continuous_integration/facet_creation.png" text="Test Runs facet creation" style="width:100%" >}}

ファセットのタイプが数値を表す {{< ui >}}Measure{{< /ui >}} であることを確認します。

{{< img src="/continuous_integration/measure_creation.png" text="Test Runs measure creation" style="width:100%" >}}

カスタムメジャーの使用を開始するには、{{< ui >}}Add{{< /ui >}} をクリックします。

## メジャーの推移をグラフ化する {#graph-the-evolution-of-your-measure}

{{< ui >}}Timeseries{{< /ui >}} の視覚化を選択することで、時系列でのメジャーの推移をプロットできます。

{{< img src="/continuous_integration/plot_measure.png" text="Plot benchmark mean duration" style="width:100%" >}}

たとえば、この視覚化を使用して、テストのメモリ使用量の推移を追跡することができます。

## グラフをエクスポートする {#export-your-graph}

グラフを[ダッシュボード][3]や[ノートブック][4]にエクスポートし、{{< ui >}}Export{{< /ui >}} ボタンをクリックすると、それに基づいて[モニター][5]を作成することができます。

{{< img src="/continuous_integration/export_measure.png" text="Export benchmark mean duration graph" style="width:100%" >}}

## モニターを追加する {#add-a-monitor}

[CI テストモニター][6]を作成して、メジャーの値が特定のしきい値を上回ったり下回ったりした場合にアラートを受けます。

{{< img src="/continuous_integration/monitor_measure.png" text="Monitor benchmark mean duration" style="width:100%" >}}

たとえば、このタイプのアラートは、メモリ使用量が特定のしきい値に達したことを知らせるために使用できます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tests/
[2]: https://app.datadoghq.com/ci/test-runs
[3]: /ja/dashboards
[4]: /ja/notebooks
[5]: /ja/monitors
[6]: https://app.datadoghq.com/monitors/create/ci-tests