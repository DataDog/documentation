---
description: Datadog의 Internal Developer Portal을 구축하는 플랫폼 및 엔지니어링 리더를 위한 단계별 구현 가이드로,
  계획 및 데이터 소스부터 골든 패스까지 다룹니다.
further_reading:
- link: https://app.datadoghq.com/idp/get-started
  tag: 앱
  text: Datadog에서 IDP 살펴보기
- link: /getting_started/internal_developer_portal/
  tag: 문서
  text: Internal Developer Portal 시작하기
- link: /internal_developer_portal/software_catalog/
  tag: 문서
  text: Catalog
- link: /internal_developer_portal/scorecards/
  tag: 문서
  text: Scorecards
- link: /internal_developer_portal/self_service_actions/
  tag: 문서
  text: Self-Service Actions
- link: /internal_developer_portal/eng_reports/
  tag: 문서
  text: 엔지니어링 보고서
- link: https://www.datadoghq.com/blog/datadog-teams-github-integration
  tag: 블로그
  text: Datadog Teams의 GitHub 통합으로 서비스 소유권을 최신 상태로 유지하기
site_support_id: idp
title: Internal Developer Portal 온보딩
---
## 개요 {#overview}

이 온보딩 가이드는 플랫폼 및 엔지니어링 리더를 대상으로 Datadog Internal Developer Portal(IDP)을 구현하는 단계를 안내합니다.  

권장 사항은 다음과 같습니다.
- 먼저 1~2개 팀을 온보딩해 본 다음 피드백을 적용하여 표준을 개선하세요.  
- 마치 제품처럼 Internal Developer Portal을 정기적으로 개선하세요.  
- IDP 표준을 SLO, CI/CD 파이프라인, 인시던트 워크플로와 같은 다른 이니셔티브와 연계하세요.  

## 1단계: 구현 계획 {#phase-1-plan-your-implementation}

1. **핵심 개념 검토**: [엔터티 모델][2], [Scorecards][3], [Self-service Actions][4]에 대해 알아보세요.  
1. **조직 구조 도입**: [Teams][5]를 설정하고 Datadog에서 계층 구조를 반영합니다.  
1. **온톨로지 정의**: 기존 시스템을 [엔터티 모델][2]에 매핑하여 구조가 Datadog의 스키마와 일치하도록 합니다. 적용할 [엔터티 유형][6] 및 유효성 검사를 결정합니다.

## 2단계: 도구 익히기 {#phase-2-familiarize-yourself-with-tooling}

1. **데이터 소스 식별**: 엔터티를 가져오는 세 가지 방법을 알아보고 [카탈로그][7]의 출처로 무엇을 사용할지 결정합니다.

   - **[Datadog 제품에서 항목 자동 검색][23]**(예: APM, RUM, USM). 인프라 또는 Log Management에서 가져올 수도 있습니다.
   - **외부 시스템에서 가져옵니다**(예: [Backstage][14] 또는 [ServiceNow][15]).  
   - **[입력 항목 직접 생성][24]**을 Datadog UI를 통하거나 GitHub, GitLab, Terraform, Datadog Software Metadata Provider 또는 Service Definition API에서 가져오는 프로그래밍 방식으로 수행합니다.

  **참고**: APM을 사용하는 경우 서비스 재정의에 의존하기보다 [Unified Service Tagging][25] 및 [Inferred Services][26]를 진입점으로 우선 사용하세요.

1. **내부 온보딩 지침 생성**: 태깅 표준, 샘플 `entity.definition.yaml` 파일, 애플리케이션 팀에 대한 기대치를 문서화합니다.  
1. **자동화 탐색**: [API][8] 또는 Terraform 공급자를 사용하여 엔터티, Scorecard, 워크플로를 프로그래밍 방식으로 관리하세요.

## 3단계: 데이터 소스 통합 {#phase-3-integrate-data-sources}

1. **GitOps 방식 관리 채택**: [GitHub 또는 GitLab 연결][13]을 통해 카탈로그를 관리합니다. 사용 가능한 경우 [기존 Backstage 매니페스트 가져오기][14]를 수행합니다.
1. **[ServiceNow에서 가져오기][15]**: ServiceNow CMDB의 CI를 IDP로 동기화합니다.  
1. **On-Call 및 인시던트 도구 연결**: [Jira][9], [PagerDuty][10] 또는 [기타 통합][16]을 구성합니다.

## 4단계: 스키마 사용자 지정 및 확장 {#phase-4-customize-and-extend-schema}

1. **엔터티 정의 표준 설정**: 중요도, 수명 주기 및 환경을 나타내는 방법을 결정합니다. 정의 스키마는 [엔터티 모델][6]을 참조하세요. 
1. **메타데이터 기대치 설정**: [사용자 지정 태그 및 확장 프로그램][18] 포함 여부를 결정합니다. 구성 요소 간의 관계를 정의하는 방법과 자동으로 탐지된 관계를 감사하는 방법을 결정합니다.
1. **내부 지침 점검**: 계측 및 태깅 표준, 샘플 엔터티 정의 매니페스트 등 개발자를 위한 문서를 점검합니다.

## 5단계: 표준 수립 및 전달 {#phase-5-establish-and-communicate-standards}

1. **권장 Scorecards 검토**: [Datadog의 기본 제공 규칙][3]부터 시작합니다. 조직과 관련된 규칙을 선택합니다.
1. **조직별 규칙 추가**: 사용자 지정 보안 검사, 배포 주기 요구 사항 또는 태깅 표준을 통해 [Scorecards 확장][19]을 수행합니다.  
1. **중요도 수준 설정**: 중요도를 나타내기 위해 [규칙을 수준별로 그룹화][20]합니다.

## 6단계: 골든 패스 설정 {#phase-6-set-up-golden-paths}

1. **예시 블루프린트 검토**: 인프라 프로비저닝 및 관리, 프로젝트 스캐폴딩 등에 대한 예시 경로를 보여주는 [셀프 서비스 블루프린트][11]를 탐색합니다. 시험 삼아 조직의 스택에 맞게 블루프린트를 수정해 보세요.
1. **Action Catalog 탐색**: 지원되는 통합을 확인하거나 [HTTP 요청 및 Private Actions][4]를 통해 확장합니다.  
1. **첫 번째 워크플로 게시**: 골든 패스를 구축하고 개발자 피드백을 바탕으로 반복합니다.

## 7단계: 엔지니어링 보고서 탐색 {#phase-7-explore-engineering-reports}

1. **진행 상황 추적**: 내장 [엔지니어링 보고서][12]를 사용하여 프로덕션 준비 상태, 안정성 및 모범 사례 채택 여부를 모니터링합니다.  
1. **참여도 측정**: 내장된 사용량 분석 대시보드를 통해 개발자 참여도를 모니터링합니다.
 
## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[2]: /ko/internal_developer_portal/catalog/entity_model/native_entities/
[3]: /ko/internal_developer_portal/scorecards/
[4]: /ko/internal_developer_portal/self_service_actions/
[5]: /ko/internal_developer_portal/catalog/set_up/ownership
[6]: /ko/internal_developer_portal/catalog/entity_model/
[7]: /ko/internal_developer_portal/catalog/
[8]: /ko/api/latest/software-catalog/
[9]: /ko/integrations/jira/
[10]: /ko/integrations/pagerduty/
[11]: https://app.datadoghq.com/software/self-service-actions
[12]: /ko/internal_developer_portal/eng_reports/
[13]: /ko/internal_developer_portal/catalog/set_up/create_entities/#github-and-gitlab-integrations
[14]: /ko/internal_developer_portal/catalog/set_up/import_entities#entities-from-backstage
[15]: /ko/internal_developer_portal/catalog/set_up/import_entities#import-from-servicenow
[16]: /ko/internal_developer_portal/integrations
[18]: /ko/internal_developer_portal/catalog/entity_model?tab=v30#build-custom-extensions
[19]: /ko/internal_developer_portal/scorecards/custom_rules
[20]: /ko/internal_developer_portal/scorecards/scorecard_configuration#group-rules-into-levels
[23]: /ko/internal_developer_portal/catalog/set_up/discover_entities
[24]: /ko/internal_developer_portal/catalog/set_up/create_entities
[25]: /ko/getting_started/tagging/unified_service_tagging
[26]: /ko/tracing/services/inferred_services