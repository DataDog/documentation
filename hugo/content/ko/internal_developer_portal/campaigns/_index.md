---
description: Scorecard 규칙을 공통 목표 아래에 그룹화하고 엔티티 및 팀 전반의 도입 현황을 추적하여 기간이 정해진 엔지니어링 이니셔티브를
  조율합니다.
further_reading:
- link: /internal_developer_portal/scorecards/
  tag: 설명서
  text: Scorecards 문서
- link: https://www.datadoghq.com/blog/idp-campaigns/
  tag: 블로그
  text: IDP Campaigns을 사용하여 대규모 엔지니어링 이니셔티브 조율
site_support_id: idp
title: 캠페인
---
{{< img src="/tracing/software_catalog/campaign-manage.png" alt="Internal Developer Portal의 캠페인 목록" style="width:90%;" >}}

## 개요 {#overview}

캠페인을 사용하면 [Scorecard][1] 규칙을 공통 목표 아래에 그룹화하고 엔티티 및 팀 전반의 도입 현황을 추적하여 단기 엔지니어링 이니셔티브를 조율할 수 있습니다. 

Scorecards가 장기적인 모범 사례를 정의한다면, 캠페인은 런타임 마이그레이션, 보안 문제 해결 또는 비용 최적화와 같은 기간이 정해진 이니셔티브에 집중할 수 있도록 지원합니다. 마감일을 설정하고, 추적할 규칙을 선택하며, 팀 전반의 완료 현황을 모니터링할 수 있습니다.

Scorecards 페이지의 [**Campaigns** 탭][2]을 사용하여 다음을 수행합니다. 
- 진행 중인 캠패인 및 지난 캠페인을 확인합니다.
- 규칙, 팀 또는 상태별로 진행 상황을 추적합니다.
- 인터페이스에서 직접 팀에 후속 조치를 취합니다. 

서비스가 캠페인에 포함된 경우, 관련 규칙 및 마감일은 Catalog의 엔티티 **Scorecards** 탭과 엔티티 페이지의 **Scorecards** 섹션에 표시됩니다. 이러한 가시성을 통해 팀은 수동으로 알림을 보내거나 외부 문서를 참조하지 않고도 캠페인 목표에 따라 조치를 취할 수 있습니다.

## 캠페인 생성 {#creating-a-campaign}

Scorecards의 [**Campaigns** 탭][2]에서 캠페인을 생성하고 관리합니다. 

**참고:** 캠페인을 생성하려면 Service Catalog Write 및 Work Management Write 권한이 필요합니다. 

{{< img src="/tracing/software_catalog/campaign-creation.png" alt="필드가 입력된 캠페인 생성 페이지" style="width:90%;" >}}

### 1. 캠페인 메타데이터 정의 {#1-define-campaign-metadata}

다음 정보를 입력합니다.
- **이름**: 짧고 설명적인 제목(예: 'GitHub Actions로 마이그레이션')
- **키**: 캠페인에 대한 고유 식별자(기본적으로 자동 생성됨)
- **설명**: 캠페인 목표에 대한 짧은 요약
- **담당자**: 캠페인 추진을 담당하는 팀
- **시작일 및 종료일**: 캠페인 기간(종료일은 선택 사항)
- **범위**: 캠페인이 적용되는 엔터티(예: `kind:service AND tier:1`)

### 2. Scorecard 규칙 선택 {#2-select-scorecard-rules}

캠페인 목표에 부합하는 [기존 Scorecard 규칙][3]을 하나 이상 추가합니다.

### 3. 지침 정의 {#3-define-guidance}

각 규칙에 다음 사항을 선택적으로 포함하세요. 
- 연결된 문서
- [Workflow Automation][4]을 통한 워크플로를 사용하여 실패한 규칙을 자동으로 수정
- 팀이 규정 준수를 위해 따라야 할 단계

## 캠페인 진행 상황 추적 {#tracking-campaign-progress}

캠페인을 생성한 후 캠페인 페이지를 사용하여 도입 현황을 모니터링하고 필요에 따라 후속 조치를 취합니다.

{{< img src="/tracing/software_catalog/campaign-details.png" alt="캠페인 세부 정보, 진행 상황 및 다음 단계를 강조하는 캠페인 페이지" style="width:90%;" >}}

캠페인 페이지에서 다음을 수행할 수 있습니다. 
- 팀 또는 규칙별 전체 완료율 및 진행 상황을 확인합니다.
- 필터를 사용하여 아직 실패한 엔터티, 팀 또는 규칙을 찾습니다.
- 팀 간 도입률을 비교합니다.
- 시간 경과에 따른 진행 상황 추이를 확인합니다.
- 페이지에서 직접 업데이트를 보내거나 후속 작업 항목을 생성합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/internal_developer_portal/scorecards/
[2]: https://app.datadoghq.com/software/scorecards?activeTab=campaigns
[3]: /ko/internal_developer_portal/scorecards/custom_rules#create-custom-rules
[4]: /ko/actions/workflows/