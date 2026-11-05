---
description: 가시성, 귀속, 방지에 대한 모범 사례를 적용하여 사용자 지정 메트릭 볼륨과 비용을 관리하세요.
further_reading:
- link: /metrics/custom_metrics/
  tag: 설명서
  text: 사용자 지정 메트릭에 대해 더 알아보기
- link: /account_management/billing/custom_metrics/?tab=countrate
  tag: 설명서
  text: 사용자 지정 메트릭 청구
- link: /metrics/metrics-without-limits/
  tag: 설명서
  text: Metrics without Limits™
- link: /metrics/volume/
  tag: 설명서
  text: 메트릭 볼륨 관리
- link: https://www.datadoghq.com/blog/custom-metrics-governance/
  tag: 블로그
  text: 엔드투엔드 사용자 지정 메트릭 거버넌스 모범 사례
- link: https://www.datadoghq.com/blog/govern-custom-metrics/
  tag: 블로그
  text: FinOps 엔지니어를 위한 사용자 지정 메트릭 거버넌스 가이드
- link: https://learn.datadoghq.com/courses/metrics-governance
  tag: 학습 센터
  text: 메트릭 거버넌스
title: 사용자 지정 메트릭 거버넌스 모범 사례
---
## 개요 {#overview}

클라우드 기반 애플리케이션은 방대한 양의 데이터를 생성하고 관측 가능성 관련 비용을 크게 증가시킬 수 있습니다. 결과적으로 조직은 해당 예산 항목을 줄여야 한다는 압박을 느끼게 됩니다. 관측 가능성 관련 비용을 줄이기 위해 메트릭 수집을 줄이는 방법을 선택하는 팀이 많지만, 중앙 집중식 SRE 및 관측 가능성 담당 팀의 경우에는 효과적인 사용자 지정 메트릭 거버넌스가 가시성을 완전히 차단하는 것이 아니라 모니터링 효율성을 높여야 합니다.

이 가이드에서는 효과적인 메트릭 거버넌스의 세 가지 핵심 구성 요소인 **가시성 및 귀속**, **실행 가능한 사용자 지정 메트릭 거버넌스**, **모니터링 및 방지**를 통해 사용자 지정 메트릭 볼륨을 관리하는 모범 사례를 소개합니다. Datadog에서 제공하는 도구를 활용해서 이러한 핵심 구성 요소를 언제나 비용 효율적으로 관측하는 방법을 알아보세요.
- [메트릭 사용량과 비용 파악 및 이해](#visibility-and-attribution)
- [최대 비용 동인 식별](#account-level-visibility)
- [어떤 팀이나 서비스가 가장 큰 비용 요인을 발생시키는지 파악](#team-level-visibility-and-attribution)
- [가치가 낮고 사용되지 않는 메트릭의 비용 절감](#value-based-metrics-governance)
- [초과 사용이 발생하기 전에 사용량 모니터링 및 제어](#monitoring-and-prevention)

Datadog의 사용자 지정 메트릭 거버넌스 도구에 대한 [대화형 가이드][17]를 확인해 보세요. 

## 전제 조건 {#prerequisites}

<div class="alert alert-danger">일부 제품 기능을 사용하려면 관리자 수준의 액세스 권한이 필요합니다.</div> 

{{< whatsnext desc="이 가이드의 내용은 독자가 사용자 지정 메트릭의 다음 개념을 숙지하고 있다는 전제하에 작성되었습니다." >}}
    {{< nextlink href="/metrics/custom_metrics/" >}}사용자 지정 메트릭이란 무엇일까요?{{< /nextlink >}}
    {{< nextlink href="/account_management/billing/custom_metrics/?tab=countrate" >}}사용자 지정 메트릭 청구 방식{{< /nextlink >}}
{{< /whatsnext >}}


## 가시성 및 귀속 {#visibility-and-attribution}

사용자 지정 메트릭 볼륨과 비용을 관리하기 위한 첫 번째 단계는 주요 메트릭 비용 요인이 무엇인지 파악하고 해당 요인을 각 소유자에게 귀속시키는 것입니다. 

이 섹션에 소개된 단계를 참고해서 전체 계정의 월간 메트릭 사용량을 검토하고 팀이나 선택한 태그 키별로 계정 사용량 내역을 확인하세요.

### 계정 수준의 가시성 {#account-level-visibility}

<div class="alert alert-danger">Plan & Usage 페이지에 액세스하려면 <a href="https://docs.datadoghq.com/account_management/rbac/?tab=datadogapplication">Datadog Admin 역할</a>이 할당된 상태여야 합니다.</div>

[Plan & Usage][1]는 계정의 청구 가능한 월간 사용자 지정 메트릭 사용량을 기본적으로 요약해서 보여주며, 비용, 소진율 및 상위 사용자 지정 메트릭 항목에 관한 자세한 정보를 제공합니다.

   1. [Plan & Usage 페이지][2]에서 *Usage Summary* 섹션까지 아래로 스크롤합니다.
   1. {{< ui >}}Custom Metrics{{< /ui >}} 탭을 클릭하여 조직의 청구 가능한 사용자 지정 메트릭 사용량, 사용량 추세 및 상위 사용자 지정 메트릭 항목을 확인합니다.
   1. *\<MONTH YEAR\>의 상위 사용자 지정 메트릭*까지 아래로 스크롤하여 상위 사용자 지정 메트릭이 비용에서 차지하는 비율(%)과 메트릭 항목을 확인합니다.

[Metrics without Limits™][4]를 사용할 때는 어떤 메트릭이 계정의 월간 사용량 및 비용에서 가장 큰 비율을 차지하는지 먼저 파악하는 것이 좋습니다. 이 정보에 기초하여 팀, 서비스, 조직 또는 기타 태그 속성을 기준으로 해당 메트릭을 제출하는 원천을 확인할 수 있습니다.

추가적으로, [사용량 귀속][3] 정보를 검토하여 계정의 청구 가능한 사용량 전체 내역을 태그 키별로 확인하세요. 이를 통해 팀, 서비스 또는 애플리케이션과 같은 태그별로 최대 비용 요인을 식별할 수 있습니다. 

**참고**: 사용량 귀속은 Enterprise 플랜에 포함된 고급 기능입니다. 그 외의 플랜을 이용하고 있다면 계정 담당자나 Customer Success에 문의해서 이 기능을 요청해야 합니다.

#### 메트릭 수준의 가시성 {#metric-level-visibility}

{{< img src="metrics/tagsexplorer.png" alt="급증하는 메트릭 항목에 대한 Custom Metrics Tags Cardinality Explorer" style="width:80%;">}}

계정의 월간 사용량 및 비용을 증가시키는 메트릭 항목을 확인하고 나면 메트릭 세부 정보 사이드 패널로 이동하여 Custom Metrics Tags Cardinality Explorer를 사용할 수 있습니다. 이는 특정 메트릭의 카디널리티 급증을 유발하고 있는 태그 키를 보여줍니다. 고유 태그 값의 수가 크게 증가하는 스팸성 또는 제한 없는 태그 키가 원인일 가능성이 높습니다. Metrics without Limits™를 사용하여 이러한 태그 키를 제외하고 즉시 비용을 절감하세요.

### 팀 수준의 가시성 및 귀속 {#team-level-visibility-and-attribution}

팀 수준의 가시성을 통해 계정 관리자는 어떤 팀에 책임이 있는지 파악할 수 있습니다. 더 중요한 것은 팀이 메트릭 볼륨에 미치는 영향을 이해하고 줄일 수 있는 기회가 생긴다는 점입니다.

개별 팀은 팀에서 제출하는 메트릭과 태그에 얼마나 많은 비용이 드는지 잘 알지 못할 수도 있습니다. 그래서 사용량을 제어하거나 사용량 증가를 제한할 필요성을 크게 느끼지 못합니다. 모든 직원이 자신의 사용량을 파악하고, 해당 볼륨과 관련 비용을 관리하는 데 주도적인 역할을 할 수 있는 권한이 있음을 인지하는 것이 중요합니다.

#### 최대 사용자 지정 메트릭의 원천 찾기 {#find-the-source-of-your-largest-custom-metrics}
<div class="alert alert-danger">Plan & Usage 페이지에 액세스하려면 <a href="https://docs.datadoghq.com/account_management/rbac/?tab=datadogapplication">Datadog Admin 역할</a>이 할당된 상태여야 합니다.</div>

{{< img src="metrics/guide/custom_metrics_governance/team_attribution_plan_usage_table.png" alt="Top Custom Metrics 표를 통해 Plan & Usage 페이지에서 Metrics Summary로 이동하세요." style="width:90%;" >}}

상위 사용자 지정 메트릭 항목을 담당하는 팀이나 서비스를 확인하는 방법

1. [Plan & Usage 페이지][2]에서 *Usage Summary* 섹션까지 아래로 스크롤합니다.
1. {{< ui >}}Custom Metrics{{< /ui >}} 탭을 클릭하여 조직의 청구 가능한 사용량, 사용량 추세 및 상위 사용자 지정 메트릭을 확인합니다.
1. *<MONTH YEAR>*의 상위 사용자 지정 메트릭 표 아래에서 상위 사용자 지정 메트릭의 {{< ui >}}See in Metrics Summary{{< /ui >}} 아이콘을 클릭합니다. 그러면 메트릭 세부 정보 측면 패널이 열려 있는 *Metrics Summary* 페이지로 이동합니다. 
1. 사이드 패널에서 *태그* 섹션까지 아래로 스크롤하여 팀 및 서비스와 같은 관련 태그를 조회합니다.

#### 팀의 사용자 지정 메트릭 조회 {#view-your-teams-custom-metrics}

모든 팀이 실시간으로 비용 급증을 유발하는 메트릭을 파악하고 비용 최적화 조치가 다른 팀의 가시성에 영향을 주지 않는다는 확신을 가질 수 있어야 합니다.

팀에서 제출한 현재 데이터 보고 대상 메트릭 항목을 모두 확인하려면 [Metrics Summary 페이지][6]로 이동하여 {{< ui >}}Filter by Tag Value{{< /ui >}} 필드에 태그 키와 값의 쌍(예: `team:dev` 또는 `service:demo`)을 입력하세요.

#### 청구 금액에 가장 큰 영향을 미치는 팀별 메트릭 식별 {#identify-any-teams-metrics-that-have-the-biggest-impact-on-your-bill}

조직의 모든 사용자는 [Metrics Volume Management 페이지][7]에서 기본으로 제공되는 실시간 예상 사용자 지정 메트릭 사용량을 확인할 수 있습니다. Datadog의 지능형 인사이트는 비용 최적화 조치를 집중해야 할 메트릭을 파악하는 데 도움을 줍니다. Metrics Volume Management와 Metrics without Limits™를 함께 사용하여 인덱싱된 사용자 지정 메트릭 사용량을 제어하고 정확도를 유지하면서 비용을 절감하세요.

Metrics Volume Management를 사용하면 조직에서 사용량이 가장 많은 메트릭과 사용량이 급증하는 메트릭 항목(예상치 못한 초과 사용의 원인일 가능성이 높음)을 확인할 수 있습니다.

{{< img src="metrics/guide/custom_metrics_governance/volume_management_page_2025-01-27.png" alt="Metrics Volume Management 페이지" style="width:90%;" >}}

자세한 내용은 [Metrics Volume Management][8] 설명서를 참조하세요.

## 가치 기반 메트릭 거버넌스 {#value-based-metrics-governance}

효과적인 사용자 지정 메트릭 거버넌스는 모니터링 효율성을 높여야 합니다. 사용량을 파악하고 그 원천과 연결한 후, 메트릭을 줄이기 위한 조치를 취하세요. 

이 섹션에서는 팀이 실제로 활용하는 가시성을 유지하면서 관측 가능성에 지출한 비용에서 얻는 투자 수익률과 가치를 극대화하기 위해 취할 수 있는 조치를 알아봅니다.

### Metrics without Limits™ {#metrics-without-limits}

Datadog의 [Metrics without Limits™][4]는 메트릭 수집과 인덱싱을 분리하는 업계 최초의 비용 관리 기능입니다. 모든 메트릭이 항상 동일한 가치를 지닌 것은 아니죠. Metrics without Limits™를 사용하면 가치 있는 메트릭에만 비용을 지불하면 됩니다. 

쿼리를 위해 보존하려는 태그 구성을 설정하여 모든 메트릭 항목에 대해 인덱싱된 사용자 지정 메트릭 볼륨을 줄이세요. 그러면 비용을 절감하고 구성된 메트릭의 수학적 정확성을 유지할 수 있습니다(코드 수준의 변경 없이 모두 플랫폼 내에서 수행).

{{< img src="metrics/volume/reduce_metric_vol_cost_tags_03142025.png" alt="Metrics Volume Management와 Metrics without Limits™를 사용하여 태그 구성을 통해 허용 목록을 제한하는 방식으로 볼륨을 줄이는 예시" style="width:80%;" >}}

Metrics without Limits™를 사용하면 Datadog은 자동으로 다음 기능을 제공합니다.
- 관측 가능성 관련 비용에서 얻는 투자 수익률과 가치를 극대화할 수 있도록, (Datadog의 지능형 쿼리 인사이트에 기반하여) 활발하게 쿼리되는 태그와 자산에 사용된 태그를 분석해 제공하는 최신 권장 태그 구성
- Datadog에 제출된 메트릭에 대한 모든 사용자 상호 작용(인앱 및 API 모두)을 지속적으로 계산하고 분석하여 권장 태그 구성이 항상 관련성을 유지하도록 하는 지능형 쿼리 인사이트
- 새 데이터에 대한 태그 가시성 복원을 위해 언제든지 변경 사항을 롤백할 수 있는 기능 롤백해도 이전에 제외한 태그는 백필되지 않습니다.

Datadog의 메트릭 거버넌스 모범 사례에 따라, [상위 사용자 지정 메트릭](#identify-metrics-that-have-the-biggest-impact-on-monthly-bill)에 Metrics without Limits를 사용하는 것부터 시작하는 것이 좋습니다.

자세한 내용은 [Metrics without Limits™][4] 설명서를 참조하세요.

### RBAC를 통한 관측 가능성을 저하시키는 의도치 않은 구성 방지 {#prevent-unintentional-configurations-that-reduce-observability-with-rbac}

Metrics without Limits™를 사용하면 사용자는 더 적은 데이터를 인덱싱하여 메트릭 비용을 절감할 수 있습니다. 구성을 잘못 사용하면 의도치 않은 사용량 급증이나 더 이상 인덱싱되지 않는 태그로 인한 가시성 손실이 발생할 수 있습니다. 예기치 않은 변경을 방지하려면 [RBAC 권한][9]을 사용하세요. 기존 사용자 역할을 편집하여 `metrics_tags_write` 권한을 포함하거나 사용자 지정 역할을 생성할 수 있습니다. 이를 통해 조직은 메트릭 [카디널리티][10]에 영향을 줄 수 있는 멤버와 Metrics without Limits™ 태그 구성을 변경할 수 있는 멤버를 보다 적절하게 제어할 수 있습니다.

Datadog은 모든 Metrics without Limits™ 구성에 대한 [감사 추적][11]을 제공하여 구성 내용과 구성을 수행한 사용자를 자세히 기록하므로 사용자 지정 메트릭 사용량의 급증 또는 급락 원인을 파악할 수 있습니다. 감사 추적 이벤트를 조회하려면 [Events Explorer][12]에 다음 쿼리를 입력하세요.

```
tags:audit "Queryable tag configuration" 
```

{{< img src="/metrics/guide/custom_metrics_governance/metrics_rbac_audit_trail_query.png" alt="메트릭 감사 추적 쿼리가 포함된 Event Explorer" style="width:90%;" >}}

### 쿼리되지 않는 미사용 메트릭으로 인한 비용 절감 {#reduce-costs-from-unqueried-and-unused-metrics}

#### 쿼리되지 않는 메트릭 {#unqueried-metrics}

비용을 절감하면서 중요한 가시성을 잃지 않으려면 {{< ui >}}Query Activity{{< /ui >}} 패싯을 사용하세요. 이를 통해 팀이 실제로 사용하며 활발히 쿼리되는 메트릭과 Datadog 내 또는 API를 통해 어디에서도 쿼리되지 않는 메트릭을 구분할 수 있습니다. Datadog의 지능형 쿼리 인사이트는 모든 메트릭에 대한 전체 사용자 상호 작용(Datadog 내 또는 API를 통해)을 지속적으로 계산하고 분석하여 쿼리되지 않는 메트릭을 식별하는 데 도움이 됩니다.

**참고**: 쿼리되지 않는 메트릭은 자산(대시보드, 노트북, 모니터 및 SLO)에 대한 쿼리에 사용될 수 있습니다. 정해진 기간 내에 자산이 사용되지 않으면 해당 메트릭이 쿼리되지 않은 것으로 간주됩니다.

#### 미사용 메트릭 {#unused-metrics}

[Related Assets 패싯][16]을 사용하여 의도치 않은 부작용 없이 비용을 절감할 수도 있습니다. 이를 통해 어떤 자산(대시보드, 노트북, 모니터 및 SLO)에서도 사용되지 않는 메트릭을 식별할 수 있습니다. 이후 사용자는 정보에 입각하여 메트릭 구성에 대한 결정을 내릴 수 있습니다.

#### 쿼리되지 않는 모든 미사용 메트릭 식별 {#identify-all-unqueried-and-unused-metrics}

[Related Assets 패싯][16]을 사용하여 Datadog에서 사용되지 않는 메트릭에 대한 가시성을 확보하면 뜻하지 않게 자산을 손상시키는 일 없이 비용을 절감할 수 있습니다. 이 패싯을 사용하면 대시보드, 노트북, 모니터 및 SLO에서 어떤 메트릭이 사용되는지 확인할 수 있으므로 정보에 입각하여 메트릭 구성에 대한 결정을 내릴 수 있습니다.

조직의 쿼리되지 않는 미사용 메트릭이 모두 나와 있는 목록을 확인하세요.

1. [Metrics Summary 페이지][6]에서 왼쪽의 {{< ui >}}Query Activity{{< /ui >}} 패싯을 찾습니다. 원하는 기간(30일, 60일, 90일)을 선택합니다.
2. 왼쪽에서 {{< ui >}}Related Assets{{< /ui >}} 패싯을 찾아 {{< ui >}}Not used in any asset{{< /ui >}} 항목을 선택합니다.
3. 왼쪽에서 {{< ui >}}Configuration{{< /ui >}} 패싯을 찾아 {{< ui >}}All Tags{{< /ui >}} 항목을 선택합니다. 이 세 가지 패싯을 조합하면 자산에서 쿼리되거나 사용되지 않으며 아직 사용자 지정 태그 구성이 없는 모든 메트릭의 목록을 확인할 수 있습니다.

4. 결과에 나온 메트릭 항목 표를 검토해 보세요. 패턴이 있나요, 아니면 특정 서비스에서 제출된 것인가요? 쿼리되지 않은 메트릭과 관련된 태그를 찾으세요.
5. (선택 사항) 메트릭 표 위의 {{< ui >}}Export as CSV{{< /ui >}}를 클릭하면 이 목록을 내보낼 수 있습니다.

   개발자에게 필요하지 않은 메트릭을 확인한 후, Metrics without Limits™를 사용해서 이러한 미사용 메트릭의 사용자 지정 메트릭 볼륨과 관련 비용을 안전하게 줄일 수 있습니다. 

{{< img src="metrics/guide/custom_metrics_governance/manage_tags_fm_metrics_summary_2025-01-27.png" alt="Manage tags 선택 항목이 강조 표시된 Configure Metrics 드롭다운 메뉴" style="width:90%;" >}}

6. [Metrics Summary 페이지][6] 상단에서 {{< ui >}}Configure Metrics{{< /ui >}} 드롭다운 메뉴를 클릭합니다.
7. {{< ui >}}Manage tags{{< /ui >}}를 선택해서 [Metrics without Limits™ Tag 구성 모달][13]을 열어 여러 메트릭을 일괄 구성합니다.
8. 구성하려는 메트릭의 메트릭 네임스페이스 접두사를 지정합니다.
9. {{< ui >}}Include tags{{< /ui >}}를 선택된 상태로 둡니다. 여기에는 자산(대시보드, 노트북, 모니터 및 SLO), Metrics Explorer 또는 API를 통해 활발하게 쿼리된 모든 태그가 포함됩니다.
10. {{< ui >}}Save{{< /ui >}}를 클릭합니다.

수천 명의 사용자 지정 메트릭 고객에 대한 Datadog의 지능형 쿼리 인사이트를 기반으로, 쿼리되지 않은 메트릭에 **Metrics without Limits™를 사용하면 평균적인 고객의 사용자 지정 메트릭 사용량을 최대 70%까지 줄일 수 있음을** 확인했습니다.

### 메트릭의 상대적 유용성 이해 {#understand-the-relative-utility-of-your-metrics}

지난 30일, 60일, 90일 동안 메트릭이 쿼리되지 않았더라도, 팀에서는 여전히 인시던트 관리 및 중단 복구를 위해 해당 메트릭을 유용하게 사용할 수 있습니다. 반대로, 팀이 활발하게 쿼리되는 기존의 메트릭을 충분히 활용하지 못하고 있을 수도 있습니다. 따라서 메트릭의 상대적 유용성을 이해하는 것이 거버넌스 워크플로에서 권장되는 다음 단계입니다. 

Datadog의 Metrics without Limits™는 [Metrics Related Assets][15] 사이드 패널을 통해 활발하게 쿼리되는 메트릭의 가치를 평가할 수 있는 인사이트를 기본으로 제공하는 기능 제품군입니다. 메트릭 관련 자산은 특정 메트릭을 쿼리하는 대시보드, 노트북, 모니터링 또는 SLO와 같은 모든 Datadog 자산을 의미합니다. {{< ui >}}Tags{{< /ui >}} 열을 사용하여 자산에 사용되는 특정 태그를 식별하고, Metrics without Limits™로 최적화할 때 가시성을 유지하세요. 관련 자산의 인기도와 수량을 사용하여 조직 내 메트릭 유용성을 평가하고 데이터를 중심으로 의사결정을 내리세요. 팀이 기존 메트릭을 사용하여 관측 가능성 비용에서 더 많은 가치를 창출하는 방법을 정확하게 이해하세요. 

{{< img src="metrics/related_assets_08_05_2025.png" alt="Related Assets 섹션이 표시된 메트릭 세부 정보 사이드 패널 예시 메트릭을 3개의 대시보드에 적용한 상태" style="width:100%;" >}}

메트릭의 관련 자산을 조회하는 방법
1. 메트릭 항목을 클릭하여 세부 정보 사이드 패널을 엽니다.
1. 사이드 패널에서 {{< ui >}}Related Assets{{< /ui >}}라는 제목의 섹션으로 스크롤합니다.
1. 드롭다운 버튼을 클릭하여 원하는 관련 자산 유형(대시보드, 모니터링, 노트북, SLO)을 조회합니다. 검색창을 사용하여 특정 자산을 확인할 수 있습니다.
   

## 모니터링 및 방지 {#monitoring-and-prevention}
이 섹션에서는 다음과 같은 방법을 알아봅니다. 
- 전체 계정의 사용자 지정 메트릭 초과 사용 및 급증에 대한 경보 설정
- 향후 메트릭 증가를 예측하고 전체 사용량이 예상에서 벗어나는 상황에 대한 경보 설정
- 특정 메트릭의 카디널리티가 사용자 정의 임계값을 초과하거나 비정상적으로 급증하는 상황에 대한 경보 설정
계정의 메트릭 사용량과 해당 비용에 대한 책임이 있는 팀을 파악하고 나면, 사용자 지정 메트릭 사용량이 특정 임계값을 초과하면 경보를 보내도록 모니터링을 설정하세요. 사용자 지정 메트릭 사용량 급증 알림을 수신해서 의도치 않은 요금 급증을 방지하세요.

Datadog은 [추정 사용자 지정 메트릭 사용량][15]을 측정하는 메트릭을 기본으로 제공합니다. 이러한 메트릭을 대시보드 시각화 및 모니터링 경보에 사용할 수 있습니다. 

| 사용량 유형                    | 메트릭                                   | 설명 |
|-------------------------------|------------------------------------------| ----------- |
| Indexed Custom Metrics        | `datadog.estimated_usage.metrics.custom`, `datadog.estimated_usage.metrics.custom.by_metric`,  `datadog.estimated_usage.metrics.custom.by_tag` | 고유한 Indexed Custom Metrics(지난 1시간 동안의 내역) |
| 수집된 사용자 지정 메트릭       | `datadog.estimated_usage.metrics.custom.ingested`, `datadog.estimated_usage.metrics.custom.ingested.by_metric`, `datadog.estimated_usage.metrics.custom.ingested.by_tag` | 수집된 고유한 사용자 지정 메트릭(지난 1시간 동안의 내역) |

### 사용자 지정 메트릭 사용량 급증을 모니터링하여 초과 사용 방지 {#monitor-spikes-in-custom-metric-usage-to-prevent-overages}

{{< img src="metrics/guide/custom_metrics_governance/estimated_usage_metric_monitor.png" alt="추정 사용량 메트릭과 임계값 700,000을 사용한 메트릭 모니터링 구성 예시" style="width:80%;" >}}

대시보드 시계열 위젯이나 메트릭 모니터링을 사용하여 메트릭 항목별로 실시간으로 추정 사용자 지정 메트릭 사용량 내역을 확인할 수도 있습니다. `datadog.estimated_usage.metrics.custom.by_metric` 메트릭을 사용하여 모니터링을 설정하고 각 메트릭 항목의 볼륨을 항상 최신 상태로 파악하세요. 

### 추가 모니터링 사용 사례 {#additional-monitoring-use-cases}
경보를 받으면 Metrics Volume Management 페이지에서 사용량이 급증하는 메트릭의 태그 키를 확인하고, Metrics without Limits™를 사용하여 메트릭 사용량 급증을 유발하는 비정상적인 태그 키를 바로 삭제하세요. 이를 통해 의도치 않은 요금 급증을 즉시 해결할 수 있습니다. 
{{< whatsnext desc="추정 사용량 메트릭으로 모니터링을 설정할 수 있는 추가 사용 사례" >}}
    {{< nextlink href="/monitors/types/change-alert/" >}}볼륨이 특정 비율 이상으로 변할 때 경보를 받도록 설정합니다.{{< /nextlink >}}
    {{< nextlink href="/monitors/types/anomaly/" >}}사용량이 비정상적으로 변할 때 경보를 받도록 설정합니다.{{< /nextlink >}}
    {{< nextlink href="/monitors/types/forecasts/" >}}향후 메트릭 증가를 예측하고 전체 사용량이 예상에서 벗어나면 경보를 받도록 설정합니다.{{< /nextlink >}}

{{< /whatsnext >}}

## 모범 사례 요약 {#summary-of-best-practices}

1. 먼저 사용량이 가장 많은 메트릭 항목을 확인한 다음(Top Custom Metrics 표 또는 Metrics Volume 페이지 참조), Metrics without Limits™를 사용하여 이러한 상위 메트릭의 볼륨을 가장 비용 효율적인 수준으로 최적화합니다. 
2. Metrics Volume Management 페이지를 사용하여 기존 사용자 지정 메트릭 사용량 급증의 원인이 된 메트릭 항목 중 증가폭이 가장 큰 항목을 확인합니다.
3. 즉각적인 비용 절감을 위해 쿼리되지 않는 사용자 지정 메트릭을 식별하고 Metrics without Limits™를 사용하여 이러한 메트릭의 태그 구성을 비워 둡니다.
4. Datadog이 기본으로 제공하는 추정 사용자 지정 메트릭 사용량 메트릭 중 하나를 사용하여 사용자 지정 메트릭 사용량에 대한 모니터링을 설정합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/account_management/plan_and_usage/
[2]: https://app.datadoghq.com/billing/usage
[3]: /ko/account_management/billing/usage_attribution/
[4]: /ko/metrics/metrics-without-limits/
[5]: https://app.datadoghq.com/billing/usage-attribution?view=table
[6]: https://app.datadoghq.com/metric/summary
[7]: https://app.datadoghq.com/metric/volume
[8]: /ko/metrics/volume/
[9]: https://docs.datadoghq.com/ko/account_management/rbac/permissions/?tab=ui#metrics
[10]: /ko/glossary/#cardinality
[11]: /ko/account_management/audit_trail/
[12]: https://app.datadoghq.com/event/explorer
[13]: https://app.datadoghq.com/metric/volume?bulk_manage_tags=true&facet.query_activity=-queried&sort=volume_total
[14]: https://docs.datadoghq.com/ko/metrics/metrics-without-limits/#configuration-of-tags-for-a-single-metric
[15]: /ko/metrics/summary/#metrics-related-assets
[16]: /ko/metrics/summary/#facet-panel
[17]: https://tour.datadoghq.com/psl/swa0y11