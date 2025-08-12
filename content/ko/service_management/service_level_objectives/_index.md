---
aliases:
- /ko/monitors/monitor_uptime_widget/
- /ko/monitors/slos/
- /ko/monitors/service_level_objectives/
description: SLO 상태 추적
further_reading:
- link: https://www.datadoghq.com/blog/slo-monitoring-tracking/
  tag: 블로그
  text: Datadog을 사용하여 SLO의 상태 및 오류 예산 추적
- link: https://learn.datadoghq.com/courses/intro-to-slo
  tag: 학습 센터
  text: 서비스 수준 목표(Service Level Objectives)에 대한 소개
- link: https://www.datadoghq.com/blog/service-page/
  tag: 블로그
  text: 서비스 원격 측정, 오류 추적, SLO 등
- link: https://www.datadoghq.com/blog/monitor-service-performance-with-slo-alerts/
  tag: 블로그
  text: SLO 경보를 이용해 서비스 성능 사전 예방 모니터링
- link: https://www.datadoghq.com/blog/slo-key-questions/
  tag: 블로그
  text: SLO 설정 시 고려해야 할 주요 질문
- link: https://dtdg.co/fe
  tag: 기초 활성화
  text: 효과적인 모니터와 SLO를 생성하는 대화형 세션에 참여하세요.
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_level_objective
  tag: 외부 사이트
  text: Terraform을 사용한 SLO 생성 및 관리
title: 서비스 수준 목표(Service Level Objectives)
---

{{< jqmath-vanilla >}}

<br />

## 개요

서비스 수준 목표(Service Level Objectives) 또는 SLO는 사이트 안정성 엔지니어링 툴킷의 핵심이며, 애플리케이션 성능에 대해 명확한 목표를 정의할 수 있는 프레임 워크를 제공합니다. 이를 통해 각 팀이 일관된 고객 경험을 제공하고 기능 개발과 플랫폼 안정성의 균형을 유지하며 내부 및 외부 사용자와의 커뮤니케이션을 개선할 수 있도록 합니다. 

## 주요 용어

서비스 수준 표시기(SLI)
: 서비스 성능 또는 신뢰성에 대한 정량적 측정입니다. Datadog SLO에서 SLI는 하나의 메트릭 또는 하나 이상의 모니터의 집합입니다.

서비스 수준 목표(SLO)
: 특정 기간 동안의 SLI에 대한 목표 백분율.

서비스 수준 계약 (SLA)
: 서비스에 대한 고객의 기대치와 서비스 제공자가 이를 달성하지 못할 시 발생하는 결과를 규정하는 고객과 서비스 제공자 사이의 명시적 또는 암묵적 합의.

오류 예산
: SLO 목표 백분율(100% - 목표 백분율)에서 파생되며, 제품 개발에 투자되는 불확실성이 높은 양.

## SLO 유형

SLO를 생성할 때 다음 유형 중에서 선택할 수 있습니다:
- **메트릭 기반 SLO**: SLI 계산을 개수 기반으로 하고자 할 때 사용할 수 있으며, SLI는 총 이벤트 합계를 좋은 이벤트 합계로 나눠 계산됩니다.
- **모니터링-기반 SLO**: SLI 계산을 시간 기반으로 하고자 할 때 사용할 수 있으며, SLI는 모니터링 가동 시간을 기반으로 합니다. 모니터링-기반 SLO는 신규 또는 기존 Datadog 모니터링을 기반으로 해야 하며, 모든 조정은 기본 모니터링 을 통해 이루어져야 합니다(SLO 생성을 통해서는 할 수 없음).
- **타임 슬라이스 SLO**: 시간 기반 SLI 계산을 원할 때 사용할 수 있으며, SLI는 커스텀 가동 시간 정의(시스템이 정상 동작한 시간을 총 시간으로 나눈 값)를 기반으로 합니다. 타임 슬라이스 SLO에는 Datadog 모니터 , 다양한 메트릭 필터 및 임계값을 사용해 볼 수 있으며 SLO를 만드는 동안 다운타임을 즉시 탐색할 수 있습니다.

전체 비교는 [SLO 유형 비교][1] 차트를 참조하세요.

## 설정

Datadog 의 [서비스 수준 목표(서비스 수준 목표) 상태 페이지][2]를 사용하여 새 SLO를 만들거나 기존의 모든 SLO를 보고 관리할 수 있습니다. 

### 구성

1. [SLO 상태 페이지][2]에서 **새 SLO +**를 선택합니다.
2. SLO 유형을 선택합니다. [메트릭-기반][3], [모니터링하다-기반][4] 또는 [시간 슬라이스][5] 중 한 가지 유형으로 SLO를 만들 수 있습니다: 
3. SLO의 목표 및 시간 창(지난 7일, 30일 또는 90일)을 설정합니다. Datadog은 규정된 SLA보다 더 엄격하게 목표를 설정할 것을 권장합니다. 두 개 이상의 시간 창을 설정할 시 기본으로 사용할 시간 창을 선택합니다. 이 시간 창은 SLO 목록에 표시되며, 기본적으로 최단 시간 창이 선택됩니다.
4. 마지막으로 SLO 제목을 입력하고 설명과 링크 및 태그를 추가한 후 저장합니다. 

서비스 수준 목표(SLO)를 설정한 후 [서비스 수준 목표 목록 보기][2]에서 선택하여 세부 정보 사이드 패널을 엽니다. 사이드 패널에는 각 SLO의 목표에 대한 전체 상태 비율과 남은 오류 예산이 표시되며, 상태 표시줄(모니터링 기반 SLO) 또는 막대 그래프(메트릭 기반 SLO)로 SLI의 이력이 표시됩니다. 하나의 [다중 알림 모니터링][6]을 사용하여 그룹화된 모니터링 기반 SLO를 만들거나 [`sum by` 절][7]을 사용하여 그룹화된 메트릭 기반 SLO를 생성한 경우 전체 상태 비율 및 남은 오류 예산과 함께 각 개별 그룹에 대한 상태 비율 및 남은 오류 예산이 함께 표시됩니다.

**예:** 가용 영역 당 지연 시간 추적을 위해 모니터 기반 SLO를 생성하는 경우 전체 SLO 및 SLO가 추적 중인 각 개별 가용 영역에 대한 상태 백분율과 남은 오류 예산이 표시됩니다.

**참고:** 남은 오류 예산은 백분율로 표시되며 다음 공식을 사용하여 계산됩니다:

$$\text"error budget remaining" = 100 * {\text"current status" - \text" target"} / { 100 - \text"target"}$$

### SLO 목표 설정

오류 예산 및 오류 예산 경고를 효율적으로 활용하려면 SLO 목푯값을 100% 미만으로 설정해야 합니다.

100% 목표를 설정한다는 것은 오류 예산이 100%—SLO 목표와 같기 때문에 0%의 오류 예산을 갖는다는 것을 의미합니다. 허용 가능한 위험을 나타내는 오류 예산을 확인함으로써 고객 대면 서비스 안정성 유지와 기능 개발 투자라는 상충되는 우선순위를 조정할 수 있습니다. 또한 목푯값이 100%인 SLO는  SLO 경보 평가에서 0의 오류로 분류됩니다.

**참고:** SLO에 대해 지정할 수 있는 소수 자릿수는 SLO 유형과 선택한 시간 창에 따라 다릅니다. 각 SLO 유형에 대한 자세한 내용은 아래 링크를 참조하세요.

[모니터링 기반 SLO][8]: 7일 및 30일 목표의 경우 소수점 둘째 자리까지 허용되며, 90일 목표의 경우 소수점 셋째 자리까지 허용됩니다.

[메트릭 기반 SLO][9]: 모든 대상에 소수점 이하 세 자리까지 허용됩니다.

## SLO 편집

SLO를 편집하려면 목록 보기에서 SLO의 행 위에 마우스를 올려놓고 행 오른쪽에 나타나는 연필 아이콘을 클릭하거나 행을 클릭하여 세부 정보 사이드 패널을 연 후 패널 오른쪽 상단에 있는 톱니 모양 아이콘에서 편집 버튼을 선택합니다.

## 권한

### 역할 기반 액세스

모든 사용자는 연결된 [역할][10]에 관계없이 SLO 및 [SLO 상태 수정](#slo-status-corrections)을 볼 수 있습니다. `slos_write` 권한이 있는 역할에 연결된 사용자만 SLO를 만들고, 수정하고, 삭제할 수 있습니다.

상태 수정을 생성, 편집 및 삭제하려면 사용자에게 `slos_corrections` 권한이 필요합니다. 이 권한이 있는 사용자는 해당 SLO를 편집할 수 있는 권한이 없더라도 상태 수정을 할 수 있습니다. 전체 권한에 대한 목록 내용은 [RBAC 문서][11]를 참조하세요.

### 세분화된 액세스 제어

편집할 수 있는 [역할][10]의 목록 을 지정하여 개별 SLO에 대한 액세스를 제한합니다. 

{{< img src="service_management/service_level_objectives/slo_set_permissions.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="SLO permissions option in the cog menu">}}

1. SLO를 클릭하면 세부 정보 사이드 패널이 열립니다. 
1. 패널 오른쪽 상단의 톱니바퀴 아이콘을 클릭합니다. 
1. **권한**을 선택하세요.
1. **액세스 제한**을 클릭하세요.
1. 대화 상자가 업데이트되어 기본적으로 **뷰어** 액세스 권한이 있는 조직 구성원을 표시합니다.
1. 드롭다운을 사용하여 SLO를 수정할 수 있는 역할, 팀 또는 사용자를 하나 이상 선택합니다.
1. **Add**를 클릭합니다.
1. 대화상자가 업데이트되어 선택한 역할에 **편집자** 권한이 있는지 표시합니다.
1. **Save**를 클릭합니다

SLO에 대한 수정 액세스 권한을 유지하려면 저장하기 전에 자신이 구성원인 역할을 하나 이상 포함해야 합니다. 액세스 제어( 목록 )의 사용자는 역할을 추가할 수 있으며 자신이 아닌 다른 역할만 제거할 수 있습니다.

**참고**: 사용자는 모니터링에 대한 쓰기 권한이 없더라도 모든 모니터링에 대한 SLO를 생성할 수 있습니다. 마찬가지로, 사용자는 SLO에 대한 쓰기 권한이 없더라도 SLO 알림을 생성할 수 있습니다. 모니터에 대한 RBAC 권한에 대한 자세한 내용은 [RBAC 설명서][12] 또는 [모니터에 대한 RBAC 설정 방법 가이드][13]를 참조하세요.

## SLO 검색

[서비스 수준 목표 상태 페이지][2]에서는 모든 SLO의 고급 검색을 실행하여 검색 결과에서 SLO를 찾고, 보고, 수정하고, 복제하거나 삭제할 수 있습니다.

고급 검색을 사용하면 다양한 SLO의 속성을 조합해 SLO를 조회할 수 있습니다.

* `name` 및  `description`- 본문 검색
* `time window` - 7일, 30일, 90일
* `type` -  메트릭, 모니터 
* `creator`
* `tags` - 데이터 센터, env, 서비스, 팀 등.

검색을 실행하려면 왼쪽 측면의 패싯 체크박스와 상단에 있는 검색 창을 사용하세요. 박스를 선택하면 검색 창이 해당 쿼리로 업데이트됩니다. 마찬가지로 검색 창의 쿼리를 수정할 때(또는 처음부터 새로 작성할 때) 체크박스를 통해 변경할 수 있습니다. 쿼리 결과는 쿼리를 편집할 때 실시간으로 업데이트되며, 검색 버튼은 사용되지 않습니다.

## SLO 보기

SLO를 *모든* 태그를 설정별로 그룹화하여 데이터의 요약 보기를 확인하세요. 각 상태(위반, 경고, 정상, 데이터 없음)에 있는 SLO의 수를 서비스, 팀, 사용자 여정, 계층 또는 기타 설정된 태그별로 그룹화하여 빠르게 분석할 수 있습니다.

{{< img src="service_management/service_level_objectives/slo_group_by_new.png" alt="팀으로 그룹화된 SLO 요약 보기" style="width:100%;" >}}

*상태* 및 *오류 예산* 열을 기준으로 SLO를 정렬하여 주의가 필요한 SLO의 우선순위를 정하세요. SLO 목록에는 [설정](#configuration)에서 선택한 기본 기간 동안의 SLO에 대한 세부 정보가 표시됩니다. 다른 모든 설정 기간은 개별 사이드 패널에서 볼 수 있습니다. 해당 표 행을 클릭하여 SLO 세부정보 사이드 패널을 엽니다.

**참고**: 모바일 기기 홈 화면에서 [Datadog 모바일 앱][14]을 다운로드하여 [Apple 앱 스토어][15] 및 [Google Play 스토어][16]에서 SLO를 확인할 수 있습니다.

{{< img src="service_management/service_level_objectives/slos-mobile.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="iOS 및 Android의 SLO">}}

### SLO 태그

SLO 태그는 [SLO 상태 페이지][2]에서 필터링하거나, [SLO 저장 보기][17]를 만들거나, SLO를 그룹화하는 데 사용할 수 있습니다. 태그는 다음과 같은 방법으로 SLO에 추가할 수 있습니다:

- SLO를 생성하거나 편집할 때 태그를 추가할 수 있습니다.
- SLO 목록 보기에서 *수정 태그* 및 *[팀 수정][18]* 드롭다운 옵션을 사용하여 태그를 일괄적으로 추가 및 업데이트할 수 있습니다.

{{< img src="service_management/service_level_objectives/slo_bulk_tag.png" alt="대량 태그 편집을 위해 SLO 목록 페이지에 태그 편집 드롭다운 표시" >}}

### SLO 기본 페이지

SLO 목록 보기에서 기본 SLO 페이지가 나타납니다.

기본 페이지는 다음을 포함합니다:

- 비어 있는 검색 쿼리
- 조직에서 정의된 모든 SLO 목록
- 왼쪽 패싯 목록에서 사용 가능한 패싯 목록

### 저장된 페이지

저장된 페이지를 사용하면 다음을 공유하여 SLO에 대한 맞춤 검색을 SLO 목록 보기에 저장하고 팀과 공유할 수 있습니다:

- 검색 쿼리
- 패싯의 선택된 하위 집합

목록 보기에서 SLO의 하위 집합을 조회한 후 해당 쿼리를 저장된 페이지에 추가할 수 있습니다.

#### 저장된 페이지 추가 

저장된 페이지를 추가하려면:

1. SLO를 조회합니다.
2. 페이지 상단 왼쪽에 있는 **페이지 저장 +**을 클릭합니다.
3. 페이지의 이름을 입력하고 저장합니다.

#### 저장된 페이지 불러오기

저장된 페이지를 불러오려면 페이지 왼쪽 상단에 있는 **페이지 보기** 버튼을 눌러 *저장된 페이지* 패널을 열고 목록에서 선택합니다. 또는 *저장된 페이지* 패널 상단에 있는 *저장된 페이지 필터링*을 통해 검색할 수도 있습니다.

#### 저장된 페이지 공유

목록에 있는 저장된 페이지 위에 마우스를 놓으면 하이퍼링크 아이콘이 나타납니다. 아이콘을 클릭해 링크를 복사한 후 팀원들과 공유할 수 있습니다.

#### 저장된 페이지 관리

저장된 페이지를 선택하고 쿼리를 수정한 다음 *저장된 페이지* 패널에서 *업데이트* 버튼을 클릭하여 업데이트합니다. 저장된 페이지의 이름을 변경하거나 삭제하려면 *저장된 페이지* 패널에서 행 위로 마우스를 움직여 연필 아이콘 또는 휴지통 아이콘을 클릭합니다.

## SLO 및 SLO 상태 수정 감사 이벤트

SLO 감사 이벤트 를 통해 [이벤트 탐색기][27] 또는 SLO 세부정보의 **감사 내역** 탭을 사용하여 SLO 설정 내역을 추적할 수 있습니다. 감사 이벤트 는 SLO 또는 SLO 상태 설정을 생성, 수정 또는 삭제할 때마다 이벤트 탐색기에 추가됩니다. 각 이벤트에는 SLO 또는 SLO 상태 수정의 설정에 대한 정보가 포함되어 있으며, 스트리밍은 시간 경과에 따른 설정 변경 내역을 제공합니다.

### SLO 오딧 이벤트

각 이벤트에는 다음과 같은 SLO 설정 정보가 포함됩니다:

- 이름
- 설명
- 목표 백분율 및 시간 창
- 데이터 원본 (모니터 ID 또는 메트릭 쿼리)

이벤트 탐색기에는 세 가지 유형의 SLO 오딧 이벤트가 표시됩니다:

- `SLO Created` 이벤트 생성 시 SLO 설정 정보 표시
- `SLO Modified` 이벤트 수정 동안 변경된 설정 정보 표시
- `SLO Deleted` 이벤트 SLO가 삭제되기 전의 설정 정보를 표시합니다.

### 상태 수정 감사 이벤트

각 이벤트에는 다음과 같은 SLO 상태 수정 설정 정보가 포함되어 있습니다:

- SLO 이름
- 표준 시간대를 사용한 상태 수정 시작 및 종료 시간
- 상태 수정 카테고리

이벤트 탐색기에 세 가지 유형의 SLO 상태 수정 감사 이벤트가 표시됩니다:

- `SLO Correction Created` 이벤트 생성 시 상태 수정 설정 정보 표시
- `SLO Correction Modified` 이벤트 수정하는 동안 변경된 설정 정보 표시
- `SLO Correction Deleted` 이벤트 상태 수정이 삭제되기 전의 설정 정보를 표시합니다.

모든 SLO 감사 이벤트 의 전체 목록을 보려면 이벤트 탐색기에 검색 쿼리 `tags:(audit AND slo)`를 입력하세요. 특정 SLO에 대한 이벤트 감사 목록을 보려면 원하는 SLO의 ID와 함께 `tags:audit,slo_id:<SLO ID>`를 입력합니다. [Datadog 이벤트 API ][19]를 사용하여 프로그래밍 방식으로 이벤트 탐색기를 쿼리할 수도 있습니다.

**참고:** UI에 이벤트가 나타나지 않으면 이벤트 탐색기의 시간 범위를 지난 7일과 같이 더 긴 기간으로 설정해야 합니다.

{{< img src="service_management/service_level_objectives/slo-audit-events.png" alt="SLO 감사 이벤트" >}}

또한 SLO 세부정보의 '감사 내역' 탭 을 사용하여 개별 SLO에 대한 모든 감사 이벤트 를 볼 수도 있습니다:

{{< img src="service_management/service_level_objectives/slo_audit_history_tab.png" alt="SLO 세부정보 감사 기록 탭" >}}

[이벤트 모니터][28]를 사용하면 알림을 설정하여 SLO 감사 이벤트를 추적할 수 있습니다. 예를 들어 특정 SLO의 설정 가 수정될 때 알림을 받으려면 이벤트 모니터링을 설정하여 태그 `audit,slo_id:<SLO ID>`를 통해 `[SLO Modified]` 텍스트를 추적합니다.

## SLO 위젯

{{< learning-center-callout header="Try Creating Business-Critical Insights Using 대시보드 and SLOs in the Learning Center" btn_title="Enroll Now" btn_url="https://learn.datadoghq.com/courses/대시보드-slos">}}
  실제 클라우드 컴퓨팅 용량과 Datadog 평가판 계정으로 비용 없이 학습하세요. 지금 등록하여 대시보드 을 구축하여 SLO를 추적하는 방법에 대해 자세히 알아보세요.
{{< /learning-center-callout >}}

SLO를 생성한 후에는 대시보드 및 위젯 을 통해 데이터를 시각화할 수 있습니다. 
  - SLO 위젯를 사용하여 단일 SLO의 상태를 시각화하세요.
  - SLO 목록 위젯을 사용하여 SLO 집합을 시각화하세요.
  - 시계열과 스칼라(쿼리 값, 상단 목록, 표, 변경) 위젯으로 15개월 분량의 메트릭 기반 SLO 데이터를 [SLO 데이터 소스][20]로 그래프화하세요.

SLO 위젯에 대한 자세한 내용은 [SLO 위젯][21] 및 [SLO 목록 위젯 ][22] 페이지를 참조하세요. SLO 데이터 소스에 대한 자세한 내용은 [대시보드][20]에서 [과거 SLO 데이터 그래프 작성하기] 가이드를 참조하세요.

## SLO 상태 수정

상태 수정을 통해 SLO 상태 및 오류 예산 계산에서 특정 기간만 제외할 수 있습니다. 이는 다음을 의미합니다:
- 예약된 유지 보수와 같이 예상되는 다운타임으로 인해 오류 예산이 고갈되는 것을 방지할 수 있습니다.
- SLO를 준수하지 않아도 되는 영업 외 시간을 제외할 수 있습니다.
- 배포로 인한 일시적 문제가 SLO에 부정적인 영향을 미치지 않도록 보장합니다.

수정을 적용하면 지정한 기간이 SLO의 계산에서 제외됩니다.
- 모니터 기반 SLO의 경우 수정 시간 창은 계산되지 않습니다.
- 메트릭 기반 SLO인 경우 수정 창의 모든 양호한 이벤트와 불량 이벤트는 계산되지 않습니다.
- 타임 슬라이스 SLO의 경우 수정 기간은 가동 시간으로 처리됩니다.

임시 조정을 위한 일회성 수정 또는 정기적인 주기로 발생하는 예측 가능한 조정을 위한 반복 수정을 만들 수 있는 옵션이 있습니다. 일회성 수정에는 시작 시간과 종료 시간이 필요하지만 반복 수정에는 시작 시간, 기간 및 간격이 필요합니다. 반복 수정은 [iCalendar RFC 5545의 RRULE 사양][24]을 기반으로 합니다. 지원되는 규칙은 `FREQ`, `INTERVAL`, `COUNT`, `UNTIL` 입니다. 수정을 무한정 반복해야 하는 경우 반복 수정의 종료 날짜를 부수적인 것으로 지정합니다. 

어떠한 수정 유형이든 수정 사유를 나타내는 수정 카테고리를 반드시 선택해야 합니다. 사용 가능한 카테고리는 `Scheduled Maintenance`, `Outside Business Hours`, `Deployment`, `Other`입니다. 필요시 설명을 추가할 수 있습니다.

각 SLO는 쿼리 성능을 보장하기 위해 수정 제한을 두고 있습니다. 이러한 제한은 SLO 당 지난 90일에만 적용되므로 지난 90일 이전 기간에 대한 수정은 제한에 포함되지 않습니다. 이는 다음을 의미합니다:
- 일회성 수정에 대한 종료 시간이 지난 90일 이전인 경우 제한에 포함됩니다.
- 반복 수정의 최종 반복 종료 시간이 지난 90일 이전인 경우 제한에 포함되지 않습니다.

SLO 당 90일 제한은 다음과 같습니다:

| 수정 유형   | SLO 당 제한 |
| ----------------- | ------------- |
| 1회          | 100           |
| 매일 반복    | 2             |
| 매주 반복  | 3             |
| 매달 반복 | 5             |

SLO의 사이드 패널에서 `Correct Status`, [SLO 상태 수정 API][25] 또는 [Terraform 리소스][26]를 선택하여 UI를 통해 상태 수정을 설정할 수 있습니다.

{{< img src="service_management/service_level_objectives/slo-corrections-ui.png" alt="SLO 수정 UI" style="width:80%;">}}

#### UI에서 액세스하기

UI에서 SLO 상태 수정에 액세스하려면:

1. 새 SLO를 만들거나 기존 SLO를 클릭합니다.
2. SLO의 세부 정보 사이드 패널 보기로 이동합니다.
3. 도구 아이콘 아래에서 **상태 수정**을 선택하여 **상태 수정* 생성 모드에 액세스합니다.
4. **시간 수정 창 선택**에서 `One-Time`과 `Recurring` 중에 선택한 후 수정할 기간을 지정합니다.
5. **Correction Type**을 선택하세요.
6. 필요 시 *참고 사항*을 추가하세요.
7. **수정 적용**을 클릭하세요.

수정한 내용을 편집하거나 삭제하려면 SLO 세부 사이드 패널 보기 상단에 있는 **수정** 탭을 클릭하세요.

## SLO 캘린더 보기

SLO 캘린더 보기는 [SLO 상태 페이지][2]에서 사용할 수 있습니다. 오른쪽 상단에서 '기본' 보기에서 '주별' 또는 '월별' 보기로 전환하면 12개월간의 과거 SLO 상태 데이터를 볼 수 있습니다. 캘린더 보기는 메트릭 기반 SLO 및 타임슬라이스 SLO에 대해 지원됩니다.

{{< img src="service_management/service_level_objectives/slo-calendar-view-cropped.png" alt="SLO 캘린더 보기" >}}

## SLO CSV 내보내기

{{< callout url="https://forms.gle/GQkcHDqaL5qWMss38" btn_hidden="false" header="SLO CSV 내보내기 기능 시도">}}
CSV 내보내기 기능은 비공개 베타 버전입니다. 양식을 작성하여 액세스를 요청하세요.
{{< /callout >}}

'주별' 또는 '월별' 캘린더 보기로 전환하면 [SLO 상태 페이지][2]에서 SLO CSV 내보내기 기능을 사용할 수 있습니다. 이러한 보기에서 새로운 'CSV로 내보내기' 옵션에 액세스하여 다음 정보가 포함된 과거 SLO 데이터의 CSV를 다운로드할 수 있습니다:

- SLO ID, 이름 및 유형
- SLO 태그
- SLO 대상
- 과거 SLO 상태 값

{{< img src="service_management/service_level_objectives/slo-csv-export.png" alt="SLO 캘린더 보기">}}

다음 기간 동안 CSV 내보내기를 사용할 수 있습니다.

- **주간:** SLO 상태는 달력 기준 주(일요일 오전 12시~토요일 오후 11시 59분)를 기준으로 합니다.
- **월별:** SLO 상태는 달력 기준 월(매월 1일 오전 12시 - 매월 말일 오후 11시 59분)을 기준으로 합니다.

이 시간은 Datadog 에서 사용자의 표준 시간대 설정을 기준으로 합니다.

SLO 상태는 SLO 유형에 따라 계산됩니다:
- **메트릭-기반 SLO:** 기간 동안 전체 이벤트 중 양호한 이벤트 비율
- **타임슬라이스 SLO:** 해당 기간의 총 분량 중 양호한 분량의 비율

**참고**:

- 내보내는 SLO는 검색 쿼리 을 기반으로 합니다.
- 캘린더 보기는 메트릭-기반 및 타임 슬라이스 SLO에 대해 지원됩니다. 모니터링하다 -기반 SLO를 내보내는 경우 SLO의 상태 기록 데이터는 포함되지 않고 SLO ID와 이름만 CSV에 포함됩니다.
- 내보내기당 SLO는 1,000개로 제한됩니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/service_management/service_level_objectives/guide/slo_types_comparison/
[2]: https://app.datadoghq.com/slo
[3]: /ko/service_management/service_level_objectives/metric/
[4]: /ko/service_management/service_level_objectives/monitor/
[5]: /ko/service_management/service_level_objectives/time_slice/
[6]: /ko/monitors/types/metric/?tab=threshold#alert-grouping
[7]: /ko/service_management/service_level_objectives/metric/#define-queries
[8]: /ko/service_management/service_level_objectives/monitor/#set-your-slo-targets
[9]: /ko/service_management/service_level_objectives/metric/#set-your-slo-targets
[10]: /ko/account_management/rbac/
[11]: /ko/account_management/rbac/permissions/#service-level-objectives/
[12]: /ko/account_management/rbac/permissions/#monitors
[13]: /ko/monitors/guide/how-to-set-up-rbac-for-monitors/
[14]: /ko/mobile
[15]: https://apps.apple.com/app/datadog/id1391380318
[16]: https://play.google.com/store/apps/details?id=com.datadog.app
[17]: /ko/service_management/service_level_objectives/#saved-views
[18]: /ko/account_management/teams/#associate-resources-with-team-handles
[19]: /ko/api/latest/events/
[20]: /ko/dashboards/guide/slo_data_source/
[21]: /ko/dashboards/widgets/slo/
[22]: /ko/dashboards/widgets/slo_list/
[23]: /ko/monitors/types/event/
[24]: https://icalendar.org/iCalendar-RFC-5545/3-8-5-3-recurrence-rule.html
[25]: /ko/api/latest/service-level-objective-corrections/
[26]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/slo_correction
[27]: /ko/service_management/events/explorer/
[28]: /ko/monitors/types/event/