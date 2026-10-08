---
aliases:
- /ko/tracing/software_catalog/scorecards
- /ko/tracing/service_catalog/scorecards
- /ko/service_catalog/scorecards
- /ko/software_catalog/scorecards
cascade:
  site_support_id: idp
description: Catalog의 엔터티를 정의된 기준에 따라 자동으로 평가하여 소프트웨어 상태를 측정하고 팀 전반에 걸쳐 엔지니어링 모범 사례를
  장려하세요.
further_reading:
- link: https://www.datadoghq.com/blog/datadog-forms
  tag: 블로그
  text: Datadog Forms를 사용하여 엔지니어링 조직 전반에서 피드백을 작업으로 전환하기
- link: /internal_developer_portal/catalog/
  tag: 문서
  text: Catalog
- link: /api/latest/service-scorecards/
  tag: 문서
  text: Scorecards API
- link: https://www.datadoghq.com/blog/service-scorecards/
  tag: 블로그
  text: Scorecards로 서비스 관측 가능성 모범 사례의 우선순위를 지정하고 확산하기
- link: https://www.datadoghq.com/blog/datadog-custom-scorecards/
  tag: 블로그
  text: 사용자 지정 Scorecards로 모범 사례 공식화하기
- link: /delivery_performance/dora_metrics/
  tag: 문서
  text: Datadog으로 DORA Metrics 추적하기
- link: https://www.datadoghq.com/blog/scorecards-dogfooding/
  tag: 블로그
  text: Scorecards를 사용하여 규모에 맞게 모범 사례를 정의하고 전달하는 방법
title: Scorecards
---
{{< img src="/tracing/software_catalog/scorecard-overview-updated.png" alt="규칙 성능을 강조하는 Scorecards 대시보드" style="width:90%;" >}}

## 개요 {#overview}

Scorecards는 팀이 소프트웨어의 상태와 성능을 측정하고 지속적으로 개선하도록 돕습니다. 플랫폼 엔지니어는 Scorecards를 생성하여 Catalog의 엔터티를 정의된 기준에 따라 자동으로 평가하고 주의가 필요한 영역을 파악할 수 있습니다.

Scorecards 정의 방식을 완전히 제어할 수 있습니다. Datadog 플랫폼에서 제공하는 Production Readiness, Observability Best Practices 및 Documentation & Ownership의 세 가지 핵심 Scorecards 세트 외에도, 기본 규칙을 사용자 지정하거나 팀의 우선순위에 맞고 자체 운영 표준을 반영하는 새로운 규칙을 만들 수 있습니다. 이러한 유연성을 통해 조직의 엔지니어링 문화와 성숙도에 맞춰 Scorecards를 조정할 수 있습니다.

Datadog은 Catalog에 등록된 모든 엔터티에 대해 24시간마다 일련의 합격/불합격 기준에 따라 기본 Scorecards를 평가합니다. 언제든지 이러한 기본 평가를 해제할 수 있습니다. [Scorecards API][1] 또는 [Datadog Workflow Automation][2]을 사용하여 사용자 지정 규칙에 대한 데이터 입력, 평가 기준 및 평가 주기를 구성할 수 있습니다.  

Datadog은 Scorecard 결과를 자동화된 보고서로 요약하여 Slack을 통해 직접 전달할 수 있으므로 팀이 일관된 방향을 유지하고, 개선 사항을 추적하며 격차를 효율적으로 해결하도록 도울 수 있습니다.

{{< callout url="https://www.datadoghq.com/product-preview/?product=internal-developer-portal-idp" header="곧 출시될 기능들을 미리 사용해 보려면 등록하세요!" >}}
{{< /callout >}}

## 시작하기 {#get-started}

{{< whatsnext desc="Scorecards를 설정하고 팀에 어떻게 도움이 될 수 있는지 살펴보세요." >}}
    {{< nextlink href="/internal_developer_portal/scorecards/scorecard_configuration/" >}}Scorecards 구성{{< /nextlink >}}
    {{< nextlink href="/internal_developer_portal/scorecards/custom_rules/" >}}커스텀 규칙 만들기{{< /nextlink >}}
    {{< nextlink href="/internal_developer_portal/scorecards/using_scorecards/" >}}Scorecards로 할 수 있는 작업 알아보기{{< /nextlink >}}
{{< /whatsnext >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/api/latest/service-scorecards/
[2]: /ko/actions/workflows/