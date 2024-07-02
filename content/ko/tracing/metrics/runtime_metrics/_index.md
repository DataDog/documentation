---
aliases:
- /ko/tracing/advanced/runtime_metrics/
- /ko/tracing/runtime_metrics/
description: 트레이스와 관련된 런타임 메트릭을 통해 애플리케이션 성능에 대한 인사이트를 확보하세요.
kind: 설명서
title: Python
type: multi-code-lang
---

{{< img src="tracing/runtime_metrics/jvm_runtime_trace.png" alt="JVM Runtime Trace" >}}

애플리케이션 성능에 대한 인사이트를 얻기 위해 추적 클라이언트에서 런타임 메트릭 수집을 활성화합니다. 런타임 메트릭은 [서비스][1]의 컨텍스트에서 확인할 수 있고, 특정 요청 시 Trace View에서 상호 연결되며 플랫폼 어디에서나 활용될 수 있습니다. 런타임 메트릭 자동 수집 방법을 알아보려면 아래에서 언어를 선택하세요.

{{< partial name="apm/apm-runtime-metrics.html" >}}
<br>

[1]: /ko/tracing/glossary/#services