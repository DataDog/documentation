---
title: Database Monitoring Monitor
---


## 개요

[Database Monitoring(DBM)][1] 모니터 유형을 사용하면 DBM에 표시된 데이터의 모니터와 알림을 생성할 수 있습니다. 지정된 기간에 DBM 이벤트 유형이 미리 정의된 임계값에서 벗어날 때 이러한 모니터에서 알림을 보내도록 구성할 수 있습니다.

일반적인 모니터링 시나리오는 다음과 같습니다.
- [대기 인원수 쿼리](#number-of-waiting-queries)
- [주어진 기간을 초과하는 쿼리 개수](#queries-exceeding-30-seconds)
- [설명 플랜 비용의 중대한 변경 사항](#change-in-explain-plan-cost)

단계별 안내는 [모니터 예시](#example-monitors)를 참조하세요.

## 모니터 생성

새 DBM을 생성하려면 Datadog에서 새 DBM 모니터를 생성합니다.  UI에서 [**Monitors** > **New Monitor** > **Database Monitoring**][2]로 이동합니다.

<div class="alert alert-info"><strong>참고</strong>: 계정당 기본 제한은 1,000개의 DBM 모니터입니다. 이 제한에 도달하는 경우 <a href="/monitors/설정/?탭=thresholdalert#multi-alert">다중 알림을</a> 사용하거나 <a href="/도움/도움말/">지원팀에 문의하여</a> 계정 제한을 해제하세요.</div>

## 검색 쿼리 정의

참고: 쿼리가 변경되면 검색 모음 위의 차트가 업데이트됩니다.

### 공통 모니터 유형

모니터를 처음부터 새로 생성하지 않으려면(#creating-monitors-from-scratch), 미리 정의된 다음 모니터 유형 중 하나를 사용할 수 있습니다.
- 대기 중 쿼리
- 장기 실행 쿼리

{{< img src="database_monitoring/dbm_event_monitor/dbm_common_monitor_types.png" alt="대기 중인 쿼리 및 장기 실행 쿼리와 관련된 OOTB 모니터 예시" style="width:80%;" >}}

이러한 기존 모니터링 유형 및 기타 유형에 관한 피드백은 고객 성공 관리자 또는 [고객지원팀][9]에 공유해 주시기 바랍니다.

### 처음부터 새 모니터 생성하기

1. **Query Samples** 또는 **Explain Plans**를 모니터링할지 결정한 다음 드롭다운 메뉴에서 해당 옵션을 선택합니다.

{{< img src="database_monitoring/dbm_event_monitor/dbm_event_monitor_data_types.png" alt="Database Monitoring 모니타 유형에서 사용 가능한 각기 다른 데이터 소스를 표시하는 드롬다운 메뉴" style="width:80%;" >}}

2. <a href="https://docs.datadoghq.com/database_monitoring/query_samples/">DBM 쿼리 샘플</a> 활동에서와 동일한 로직을 사용하여 검색 쿼리를 구성하고 계획 탐색기를 설명합니다. 즉, 검색창에 포함할 **패싯**을 하나 이상 선택해야 합니다. 예를 들어 `postgresadmin` 사용자가 실행한 대기 중인 쿼리에 관해 알림을 보내려는 경우 검색창은 다음을 표시합니다.

{{< img src="database_monitoring/dbm_event_monitor/dbm_example_query_no_group_by.png" alt="검색창에 두 개의 패싯이 포함된 검색 쿼리 예시" style="width:80%;" >}}

참고: 패싯의 **고유 값 개수** 알림을 설정한 모니터입니다.

3. 또한 여러 차원으로 DBM 이벤트를 그룹화하는 옵션도 있습니다. 쿼리와 일치하는 모든 DBM 이벤트는 최대 **5개의 패싯** 값에 따라 함께 그룹화할 수 있습니다. 기능별로 그룹화하면 **알림 그룹화 전략**을 설정할 수도 있습니다.
    * **Simple Alert**: Simple Alert(단순 알림)는 모든 보고 소스를 집계하므로 하나 또는 여러 그룹 값이 임계값을 위반하면 하나의 알림이 트리거됩니다. 이 전략을 사용하여 알림 노이즈를 줄일 수 있습니다.
    * **Multi Alert**: Multi Alert(다중 알림)는 파라미터 그룹에 따라 각 소스에 알림을 적용하므로 설정된 조건을 충족하는 각 그룹에 이벤트 알림이 생성됩니다. 예를 들어 쿼리를 `@db.user`로 그룹화하고 다중 알림 집계 유형을 선택하면 정의한 대로 알림을 트리거하는 각 데이터베이스 사용자에 대해 별도의 알림을 받을 수 있습니다.

### 경고 조건 설정

1. 쿼리 결과가 `above`, `above or equal to`, `below`, `below or equal to` 또는 정의한 임계값 일 때마다 알림이 트리거되도록 설정합니다. 이 보기에서 옵션 설정에 관한 도움말을 보려면 [모니터 설정][5]을 참조하세요.
2. 예를 들어 `evaluate as zero`, `show NO DATA`, `show NO DATA and notify` 또는 `show OK`와 같이 5분 동안 데이터가 없을 때 원하는 동작을 결정합니다.

#### 데이터 없음 및 목표 미만 알림

애플리케이션이 DBM 이벤트 전송을 중단했을 때 알림을 수신하려면 조건을 `below 1`로 설정하세요. 이 알림은 모든 집계 그룹에서 지정된 기간에 모니터 쿼리와 일치하는 DBM 이벤트가 없는 경우 트리거됩니다.

모니터를 임의의 차원(태그 또는 패싯)으로 분할하고 `below` 조건을 사용하는 경우, 알림는 **if 및 only if**의 경우에만 트리거됩니다.
1. 특정 그룹의 DBM 이벤트가 있지만 개수가 임계값 아래입니다.
2. DBM 이벤트가 어떤 그룹에도 존재하지 않습니다.

#### 고급 알림 조건

평가 지연과 같은 고급 알림 옵션에 관한 자세한 내용은 [모니터 설정][3]을 참조하세요.

### 알림
**알림 및 자동화 설정** 섹션에 관한 자세한 내용은 [알림][4]을 참조하세요.

## 모니터 예시

### 대기 중인 쿼리 개수

이 모니터는 대기 중인 쿼리 수가 지정된 임계값을 초과했는지 여부를 감지합니다.

{{< img src="database_monitoring/dbm_event_monitor/waiting_queries_monitor.png" alt="대기 중인 데이터베이스 쿼리 개수를 모니터링하기 위해 설정된 메트릭 쿼리" style="width:80%;" >}}

#### 모니터 쿼리 빌드하기

1. Datadog에서 [**Monitors > New Monitor > Database Monitoring**][2]으로 이동합니다.
1. **Common monitor types** 상자에서 *Waiting Queries**를 클릭합니다. 

#### 알림 임계값 설정하기

1. 일반적인 값의 범위에 대한 컨텍스트를 얻으려면 차트 상단의 드롭다운 메뉴를 사용하여 기간을 **Past 1 Month**로 설정합니다.
1. **Alert threshold** 상자에 선택한 알림 임계값을 입력합니다. 예를 들어 차트에서 대기 중인 쿼리 수가 `3000` 이하로 유지되는 경우 **Alert threshold**을 `4000`으로 설정하여 비정상적인 활동을 표시할 수 있습니다. 설정에 관한 자세한 내용은 [알림 조건 설정][6] 및 [고급 알림 조건][3]을 참조하세요.
1. 차트의 빨간색 음영 영역을 사용하여 알림이 너무 드물게 또는 너무 자주 트리거되지 않는지 확인하고 필요에 따라 임계값 값을 조정합니다.

#### 알림 설정하기

1. **Configure notifications and automations** 아래에 알림 메시지를 작성합니다. 자세한 지침은 [알림][4]을 참조하세요. 이 텍스트를 메시지 본문으로 사용할 수 있습니다.
{{< code-block lang="text" >}}
{{#is_alert}}
{host.name}}에서 대기 중인 쿼리가 {{threshold}}를 초과했습니다. 
해당 값은 {{value}}입니다.
{{/is_alert}}

{{#is_recovery}}
{{host.name}}에서 대기 중인 쿼리 개수가 {{threshold}}를 초과했으며
복원되었습니다.
{{/is_recovery}}
{{< /code-block >}}
1. **Notify your services and your team members** 상자에서 이름을 입력하고 선택하여 알림 수신자에 자신을 추가합니다.

#### 모니터 확인 및 저장하기

1. 모니터 설정을 확인하려면 **Test Notifications**를 클릭합니다. **Alert**를 선택하여 테스트 알림을 트리거한 다음 **Run Test**을 클릭합니다.
1. **Create**을 클릭하여 모니터를 저장합니다.

### 쿼리 30초 초과

이 모니터는 장기 실행 쿼리 수가 주어진 임계값을 초과했는지 감지합니다.

{{< img src="database_monitoring/dbm_event_monitor/long_running_queries_monitor.png" alt="장기 실행 데이터베이스 쿼리 개수를 모니터링하기 위해 설정된 메트릭 쿼리" style="width:80%;" >}}

#### 모니터 쿼리 빌드하기

1. Datadog에서 [***Monitors > New Monitor > Database Monitoring**][2]으로 이동합니다.
1. **Common monitor types**에서 **Long Running Queries**를 클릭합니다.
1. 쿼리 필터를 **Duration:>30s**로 업데이트합니다.

#### 알림 임계값 설정하기

1. 일반적인 값의 범위에 대한 컨텍스트를 얻으려면 차트 상단의 드롭다운 메뉴를 사용하여 기간을 **Past 1 Month**로 설정합니다.
1. **Alert threshold** 상자에 선택한 알림 임계값을 입력합니다. 예를 들어, 차트의 값이 `2000` 미만인 경우 **Alert threshold**을 `2500`으로 설정하여 비정상적인 활동을 표시할 수 있습니다. 설정과 관련한 자세한 내용은 [알림 조건 설정][6] 및 [고급 알림 조건][3]을 참조하세요.
1. 차트의 빨간색 음영 영역을 사용하여 알림이 너무 드물게 또는 너무 자주 트리거되지 않는지 확인하고 필요에 따라 임계값 값을 조정합니다.

#### 알림 설정하기

1. **Configure notifications and automations** 아래에 알림 메시지를 작성합니다. 자세한 지침은 [알림][4]을 참조하세요. 이 텍스트를 메시지 본문으로 사용할 수 있습니다.
{{< code-block lang="text" >}}
{{#IS_ALERT}}
기간이 30초를 초과하는 쿼리 수가 초과되었습니다. 
{{host.name}}의 {{threshold}} 값: {{value}}
{{/IS_ALERT}}

{{#is_recovery}}
{{host.name}}에서 30초 기간을 초과한 쿼리 개수입니다. 
임계값 {{threshold}}을 초과하여 복원되었습니다.
{{/is_recovery}}
{{< /code-block >}}
1. **Notify your services and your team members** 상자에서 이름을 입력하고 선택하여 알림 수신자에 자신을 추가합니다.

#### 모니터링 확인 및 저장하기

1. 모니터 설정을 확인하려면 **Test Notifications**를 클릭합니다. **Alert**를 선택하여 테스트 알림을 트리거한 다음 **Run Test**을 클릭합니다.
1. **Create**을 클릭하여 모니터를 저장합니다.

### 설명-플랜 비용 변경

{{< img src="database_monitoring/dbm_event_monitor/explain_plan_cost_monitor.png" alt="매일 평균 설명-플랜 비용 변화를 추적하도록 설정된 모니터" style="width:80%;" >}}

이 모니터는 두 개의 쿼리 결과를 비교하여 일일 평균 설명 계획 비용의 상당한 변화가 있는 경우 이를 감지합니다.

- 쿼리 **a**는 현재 설명 플랜 비용을 반영합니다.
- 쿼리 **b**는 1주일 전 설명 플랜 비용을 반영합니다.

예를 들어 연속되는 두 월요일을 비교할 수 있습니다.

변경이 미미한 경우에는 모니터에서 시간별 평균을 반영하거나, 오늘과 어제의 차이를 비교하거나, 호스트 대신 쿼리 서명을 그룹화할 수 있습니다.

#### 첫 번째 모니터 쿼리 빌드하기

1. Datadog에서 [**Monitors > New Monitor > Database Monitoring**][2]으로 이동합니다.
1. **Define the search query**에서 다음과 같이 업데이트합니다.
    - **Query Samples**을 **Explain Plans**으로 변경합니다.
    - __*__를 **Explain Plan Cost (@db.plan.cost)**로 변경합니다. 필드에 "cost"를 입력하면 자동 완성 옵션이 채워집니다.
    - **(everything)**을  **Host (host)**로 변경합니다.
1. **∑** 버튼을 클릭하고 **rollup**를 입력하면 자동으로 필드가 채워집니다. **moving_rollup**을 선택합니다.

#### 두 번째 모니터 쿼리 빌드하기

1. **Add Query** 추가를 클릭하여 쿼리 **b**, 쿼리 **a**의 복사본을 만듭니다.
1. **a + b**를 **a - b**로 변경합니다. 쿼리 두 개가 일시적으로 동일하므로 이 값은 차트에 0으로 표시됩니다.
1. 쿼리에서 **∑** 버튼을 클릭하고 **Timeshift > Week before**를 선택합니다. 이렇게 하면 지난 주와 현재 사이의 중요한 변경 사항을 감지하도록 모니터를 설정할 수 있습니다.

#### 알림 임계값 설정

1. 차트 상단의 드롭다운 메뉴에서 기간을 **Past 1 Month**로 확장하면 주별 일반적인 비용 변화에 관한 컨텍스트를 확인할 수 있습니다.
1. **alert threshold** 상자에 선택한 알림 임계값 입력합니다. 예를 들어 차트에서 설명 플랜 비용의 차이가 `8000` 미만으로 유지되는 경우 **alert threshold**를 `9000`으로 설정하여 비정상적인 활동을 표시할 수 있습니다. 설정에 대한 자세한 내용은 [알림 조건 설정][6] 및 [고급 알림 조건][3]을 참조하세요. 
1. 차트의 빨간색 음영 영역을 사용하여 알림이 너무 드물게 또는 너무 자주 트리거되지 않는지 확인하고 필요에 따라 임계값 값을 조정합니다.

#### 알림 설정하기

1. **Configure notifications and automations** 아래에 알림 메시지를 작성합니다. 자세한 지침은 [알림][4]을 참조하세요. 이 텍스트를 메시지 본문으로 사용할 수 있습니다.
{{< code-block lang="text" >}}
{{#is_alert}}
{{host.name}}에서 설명-플랜 비용 일일 평균이 최소 {{threshold}}만큼 증가했습니다.
1주일 전과 비교 시 {{value}} 값입니다.
{{/is_alert}}

{{#is_recovery}}
{{host.name}}의 일일 평균 설명 플랜 비용이 지난주 동일 비용 대비  {{threshold}} 이내로 복원되었습니다..
{{/is_recovery}}
{{< /code-block >}}
1. **Notify your services and your team members** 상자에서 이름을 입력하고 선택하여 알림 수신자에 자신을 추가합니다.

#### 모니터 확인 및 저장하기

1. 모니터 설정을 확인하려면 **Test Notifications**를 클릭합니다. **Alert**를 선택하여 테스트 알림을 트리거한 다음 **Run Test**을 클릭합니다.
1. **Create**을 클릭하여 모니터를 저장합니다.


[1]: /ko/database_monitoring/
[2]: https://app.datadoghq.com/monitors/create/database-monitoring
[3]: /ko/monitors/create/configuration/#advanced-alert-conditions
[4]: /ko/monitors/notify/
[5]: /ko/monitors/configuration/?tab=thresholdalert#thresholds
[6]: /ko/monitors/configuration/?tab=thresholdalert#set-alert-conditions
[7]: /ko/monitors/configuration/?tab=thresholdalert#configure-notifications-and-automations
[8]: https://app.datadoghq.com/databases/list
[9]: /ko/help/