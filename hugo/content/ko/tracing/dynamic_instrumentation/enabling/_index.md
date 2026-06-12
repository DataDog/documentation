---
aliases:
- /ko/dynamic_instrumentation/enabling/
further_reading:
- link: /agent/
  tag: 설명서
  text: Datadog 에이전트 시작하기
private: false
title: 동적 계측 활성화
type: multi-code-lang
---

동적 계측은 Datadog 추적 라이브러리를 지원하는 기능입니다. 애플리케이션에 이미 [트레이스 수집을 위해 APM][1]을 사용하고 있는 경우 추적 라이브러리가 최신 상태인지 확인한 다음 애플리케이션에 대해 동적 계측을 활성화하세요.

아래에서 런타임을 선택하여 애플리케이션에서 동적 계측을 활성화하는 방법을 알아보세요.

{{< card-grid card_width="170px" >}}
  {{< image-card href="/dynamic_instrumentation/enabling/java" src="integrations_logos/java.png" alt="Java" >}}
  {{< image-card href="/dynamic_instrumentation/enabling/python" src="integrations_logos/python.png" alt="Python" >}}
  {{< image-card href="/dynamic_instrumentation/enabling/dotnet" src="integrations_logos/dotnet-core.png" alt="Dotnet" >}}
  {{< image-card href="/dynamic_instrumentation/enabling/dotnet" src="integrations_logos/dotnet-framework.png" alt="Dotnet" >}}
  {{< image-card href="/dynamic_instrumentation/enabling/nodejs" src="integrations_logos/nodejs.png" alt="Node.js" >}}
  {{< image-card href="/dynamic_instrumentation/enabling/ruby" src="integrations_logos/ruby.png" alt="Ruby" >}}
  {{< image-card href="/dynamic_instrumentation/enabling/php" src="integrations_logos/php.png" alt="PHP" >}}
  {{< image-card href="/dynamic_instrumentation/enabling/go" src="integrations_logos/go-metro.png" alt="Go" >}}
{{< /card-grid >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/trace_collection/