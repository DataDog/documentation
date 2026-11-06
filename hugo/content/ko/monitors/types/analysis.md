---
description: 여러 데이터 소스에 대한 쿼리, 데이터 변환 체이닝, 복잡한 SQL 쿼리 실행을 지원하는 분석 모니터를 사용하여 고급 로그
  분석에 관한 경보를 설정하세요.
further_reading:
- link: /notebooks/advanced_analysis/
  tag: 문서
  text: 노트북 고급 분석
- link: /monitors/configuration/
  tag: 문서
  text: 모니터 구성 방법 알아보기
- link: /monitors/notify/
  tag: 문서
  text: 모니터 알림 설정
site_support_id: advanced_analysis
title: 분석 모니터
---
## 개요 {#overview}

분석 모니터는 노트북 분석 및 DDSQL 기능에 대한 전체 액세스 권한을 제공하여 표준 모니터가 놓칠 수 있는 복잡한 데이터 패턴에 대해 경고할 수 있도록 합니다. 분석 모니터를 사용하면 다음을 수행할 수 있습니다.

- 여러 데이터 소스 쿼리
- 데이터 변환 체이닝
- 복잡한 SQL 쿼리 실행
- 정교한 분석 워크플로 생성

## 지원되는 데이터 소스 {#supported-data-sources}

분석 모니터는 노트북 분석 셀 및 DDSQL 쿼리에서 사용할 수 있는 데이터 소스의 하위 집합을 지원합니다. 모니터는 쿼리를 자주 평가하므로, 각 데이터 소스는 모니터 수준의 쿼리 부하를 처리할 수 있음이 검증된 후에만 활성화됩니다.

다음과 같은 데이터 소스가 지원됩니다.

- Agent Observability
- 감사
- CI Pipelines
- CI 테스트
- 이벤트
- Agent Observability
- 로그
- 메트릭
- NetFlow
- 네트워크
- 참조 표
- RUM
- 서비스 검사
- 스팬

게시된 분석은 해당 분석이 의존하는 모든 데이터 소스도 지원되는 경우에만 지원됩니다.

Flex Logs에 저장된 로그는 모니터링을 지원하지 않습니다. 

지원되지 않는 데이터 소스는 다음과 같습니다. 
- AI 사용량
- 클라우드 비용
- 데이터베이스 쿼리
- Dora Metrics
- 오류
- 인프라 리소스
- 모니터 그룹, 모니터
- Product Analytics
- 보안 결과
- 보안 신호
- Snowflake 쿼리
- Synthetics

지원되지 않는 데이터 소스를 기반으로 게시된 분석을 선택하면 Datadog에서 해당 소스 이름을 포함한 오류가 표시됩니다. 예시:

`This query is not monitorable because it's based on an unsupported data source for monitoring: Infrastructure Resources.`

분석이 Flex 스토리지의 로그를 기반으로 하는 경우 Datadog에 대신 이 오류가 표시됩니다.

`Dataset is based on Flex logs, which are not supported for monitoring.`

## 모니터 생성 {#monitor-creation}

분석 모니터를 만드는 방법은 3가지입니다.

### 모니터 페이지에서 {#from-the-monitors-page}

Datadog에서 [분석 모니터][1]를 만들려면 기본 탐색 메뉴에서 {{< ui >}}Monitors{{< /ui >}} > {{< ui >}}New Monitor{{< /ui >}} > {{< ui >}}Analysis{{< /ui >}}로 이동하세요.

### 노트북에서 {#from-a-notebook}

노트북에서 직접 분석 모니터를 만들려면 다음 단계를 따르세요.

1. 원하는 쿼리가 포함된 분석 셀이 있는 노트북을 엽니다.
2. 분석 셀에서 {{< ui >}}Send To{{< /ui >}}를 클릭합니다.
3. {{< ui >}}Monitors{{< /ui >}}를 선택합니다.

이를 통해 탐색적 분석을 경보 모니터링으로 변환할 수 있습니다.

### DDSQL 편집기에서 {#from-the-ddsql-editor}

DDSQL 편집기에서 직접 분석 모니터를 생성하려면 다음 단계를 따르세요.

1. [DDSQL 편집기][4]를 열고 원하는 쿼리를 선택합니다.
2. {{< ui >}}Save to dashboard{{< /ui >}} 옆의 드롭다운 화살표를 클릭합니다.
3. {{< ui >}}Create monitor{{< /ui >}}를 선택합니다.

## 쿼리 정의 {#define-the-query}

1. **게시된 분석 선택**: 사용 가능한 노트북 또는 DDSQL 게시된 분석 중에서 선택합니다.
2. **게시된 분석 필터링**: 열별로 결과를 필터링합니다.
3. **결과 미리 보기**: 경보 조건을 설정하기 전에 쿼리 출력을 확인합니다.

{{< img src="/monitors/monitor_types/analysis/analysis_monitor_config.png" alt="분석 모니터 구성 예시" style="width:100%;" >}}

## 경보 조건 설정 {#set-alert-conditions}

쿼리 값이 임계값을 초과할 때 트리거되도록 모니터를 구성하고, 복구 임계값 및 평가 지연과 같은 고급 경보 옵션을 사용자 지정합니다. 자세한 내용은 [모니터링 구성][2]을 참조하세요.

## 알림 {#notifications}

경보 메시지에 대한 자세한 지침은 [알림][3]을 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/create/analysis
[2]: /ko/monitors/configuration/
[3]: /ko/monitors/notify/
[4]: https://app.datadoghq.com/ddsql/editor