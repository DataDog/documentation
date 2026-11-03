---
description: Datadog의 Internal Developer Portal은 실시간 텔레메트리, 메타데이터, 셀프 서비스 워크플로를 통합하여
  소프트웨어 제공을 표준화하고 개발자 경험을 최적화합니다.
disable_toc: false
further_reading:
- link: getting_started/internal_developer_portal/
  tag: 문서
  text: Internal Developer Portal 시작하기
- link: https://www.datadoghq.com/blog/platform-engineering-metrics/
  tag: 블로그
  text: 플랫폼 엔지니어링 팀을 위한 성공 메트릭
- link: https://www.datadoghq.com/blog/datadog-forms
  tag: 블로그
  text: Datadog Forms를 사용하여 엔지니어링 조직 전반에서 피드백을 작업으로 전환하기
- link: https://www.datadoghq.com/blog/software-catalog
  tag: 블로그
  text: Catalog로 개발자 경험 및 협업 개선하기
- link: https://www.datadoghq.com/blog/service-scorecards
  tag: 블로그
  text: Service Scorecards로 서비스 관측 가능성 모범 사례의 우선순위를 지정하고 확산하기
- link: https://www.datadoghq.com/blog/software-catalog-self-service-actions
  tag: 블로그
  text: Datadog Catalog의 Self-Service Actions로 엔지니어링 팀의 역량 강화하기
- link: https://www.datadoghq.com/blog/how-datadog-manages-internal-deployments/
  tag: 블로그
  text: Datadog 인프라 팀이 Service Catalog 및 CI/CD Visibility로 내부 배포를 관리하는 방법
- link: https://www.datadoghq.com/blog/internal-developer-portal/
  tag: 블로그
  text: Datadog IDP로 소프트웨어를 빠르고 자신 있게 배포하기
- link: https://www.datadoghq.com/blog/datadog-backstage-plugin/
  tag: 블로그
  text: Backstage Catalog를 Datadog IDP와 동기화하기
- link: https://www.datadoghq.com/blog/idp-campaigns/
  tag: 블로그
  text: IDP Campaigns를 사용하여 대규모 엔지니어링 이니셔티브 조율하기
- link: https://app.datadoghq.com/idp/get-started
  tag: 앱
  text: Datadog에서 IDP 살펴보기
title: Internal Developer Portal
---
{{< img src="tracing/internal_developer_portal/scrolling_the_catalog.mp4" alt="Internal Developer Portal Catalog 페이지를 스크롤하고, 서비스를 클릭하여 상위 및 하위 서비스가 표시된 종속성 그래프를 보여주는 영상입니다." video=true >}}

## 개요 {#overview}

IDP를 구축하는 것은 [Platform Engineering][7] 모범 사례의 중요한 부분입니다. Datadog의 Internal Developer Portal(IDP)은 실시간 텔레메트리, 메타데이터, 셀프 서비스 워크플로를 통합하여 소프트웨어 제공을 표준화하고 가속화하며 개발자 경험을 최적화하는 완전 관리형 솔루션입니다. 

- 실시간 텔레메트리 기반의 [Catalog][1]는 모든 서비스와 환경을 실시간으로 인벤토리화하고, 소유권 및 운영 컨텍스트에 대한 설명 메타데이터로 각 항목을 보강합니다.
- [Self-Service Actions][2] 및 [Scorecards][3]는 플랫폼 정책을 클릭 한 번으로 수행 가능한 태스크로 변환하여 모든 변경 사항이 관측 가능성, 보안 및 프로덕션 기준을 충족하도록 보장합니다. 
- 내장된 [Engineering Reports][4]는 플랫폼 엔지니어와 리더에게 소프트웨어 품질, 표준 채택 및 개발자 경험에 대한 실시간 가시성을 제공하여 격차를 쉽게 파악하고 데이터 기반 의사결정을 내릴 수 있도록 합니다.

IDP를 처음 사용한다면, 설정 및 기본 사용법을 안내하는 [시작하기 가이드][5]부터 시작하세요.

{{< callout url="https://www.datadoghq.com/product-preview/?product=internal-developer-portal-idp" header="곧 출시될 기능들을 미리 사용해 보려면 등록하세요!" >}}
{{< /callout >}}

## 일반적인 사용 사례 {#common-use-cases}

{{< whatsnext desc=" " >}}
    {{< nextlink href="/internal_developer_portal/use_cases/dev_onboarding" >}}개발자 온보딩 가속화{{< /nextlink >}}
    {{< nextlink href="/internal_developer_portal/use_cases/incident_response" >}}인시던트 대응 개선{{< /nextlink >}}
    {{< nextlink href="/internal_developer_portal/use_cases/dependency_management" >}}종속성 관리 및 매핑{{< /nextlink >}}
    {{< nextlink href="/internal_developer_portal/use_cases/production_readiness" >}}프로덕션 준비 상태 평가{{< /nextlink >}}
{{< /whatsnext >}}

## 주요 기능 {#main-features}

{{< whatsnext desc=" " >}}
    {{< nextlink href="/internal_developer_portal/catalog" >}}Catalog를 통한 관측 가능성, 소유권 및 엔지니어링 지식 중앙 집중화{{< /nextlink >}}
    {{< nextlink href="/internal_developer_portal/scorecards" >}}Scorecards를 통한 대규모 엔지니어링 모범 사례 확산{{< /nextlink >}}
    {{< nextlink href="/internal_developer_portal/self_service_actions" >}}Self-Service Actions를 통한 릴리스 가속화{{< /nextlink >}}
    {{< nextlink href="/internal_developer_portal/eng_reports" >}}Engineering Reports를 통한 안정성 및 Scorecard 규정 준수 추적{{< /nextlink >}}
    {{< nextlink href="/internal_developer_portal/external_provider_status" >}}External Provider Status를 통한 외부 종속성 모니터링{{< /nextlink >}}
{{< /whatsnext >}}

## 팀과 작업하기 {#working-with-teams}

[Datadog Teams][6]를 사용하여 IDP에서 팀 기반 기능을 활성화하세요.

- Datadog에서 팀을 추적하고 외부 정보 소스와 자동으로 동기화하세요. 
- 서비스 및 기타 엔터티의 소유자로 팀을 할당하세요. 
- 팀 간 상위-하위 관계를 구성하도록 [계층 구조][8]를 만드세요.
- IDP 전체에서 팀별로 보기를 필터링하세요(예시: Catalog, Scorecards 및 Engineering Reports).

조직에서 GitHub에서 팀 구조를 관리하는 경우, GitHub Integration for Teams를 사용하여 GitHub 팀을 Datadog과 자동으로 동기화하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/internal_developer_portal/catalog
[2]: /ko/internal_developer_portal/self_service_actions
[3]: /ko/internal_developer_portal/scorecards
[4]: /ko/internal_developer_portal/eng_reports
[5]: /ko/getting_started/internal_developer_portal/
[6]: /ko/account_management/teams/
[7]: https://www.datadoghq.com/knowledge-center/platform-engineering/
[8]: /ko/account_management/teams/manage/#team-hierarchies