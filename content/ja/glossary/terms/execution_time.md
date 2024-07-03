---
core_product:
- apm
title: execution time
---
In APM, execution time is the total time that a span is considered active, or not waiting for a child span to complete.

Execution time is calculated by adding up the time that a span is active, meaning it has no child spans. For non-concurrent work, this is straightforward. In the following image, the execution time for Span 1 is $\D1 + \D2 + \D3$. The execution time for Spans 2 and 3 are their respective widths.

{{< img src="tracing/visualization/execution-time1.png" style="width:50%;" alt="Execution time" >}}

When child spans are concurrent, execution time is calculated by dividing the overlapping time by the number of concurrently active spans. In the following image, Spans 2 and 3 are concurrent (both are children of Span 1), overlapping for the duration of Span 3, so the execution time of Span 2 is $\D2 ÷ 2 + \D3$, and the execution time of Span 3 is $\D2 ÷ 2$.

{{< img src="tracing/visualization/execution-time2.png" style="width:50%;" alt="Execution time for concurrent work" >}}