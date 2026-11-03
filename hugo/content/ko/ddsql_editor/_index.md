---
aliases:
- /ko/dashboards/ddsql_editor/
- /ko/ddsql_editor/getting_started/
description: 태그를 표 열로 지원하는 자연어 또는 DDSQL 구문을 사용하여 인프라 리소스 및 텔레메트리 데이터를 쿼리하십시오.
further_reading:
- link: mcp_server
  tag: 설명서
  text: Datadog MCP Server
- link: ddsql_reference/ddsql_default
  tag: 설명서
  text: DDSQL 참조
- link: https://learn.datadoghq.com/courses/getting-started-ddsql-editor
  tag: 학습 센터
  text: DDSQL 편집기 시작하기
- link: https://www.datadoghq.com/blog/metrics-natural-language-queries/
  tag: 블로그
  text: 자연어 쿼리로 Datadog 메트릭 탐색하기
- link: https://www.datadoghq.com/blog/advanced-analysis-tools/
  tag: 블로그
  text: Datadog에서 고급 분석을 위해 Sheets, DDSQL Editor 및 Notebook을 사용하여 데이터를 탐색하기
title: DDSQL 편집기
---
{{< callout url="https://www.datadoghq.com/product-preview/additional-advanced-querying-data-sources/" header="고급 데이터 소스">}}
아직 지원되지 않는 데이터 소스를 쿼리하려는 경우, 다음 양식을 사용하여 요청을 제출하십시오. 지원되는 데이터 소스의 전체 목록은 <a href="/ddsql_reference/data_directory/">데이터 디렉터리</a>를 참조하십시오.
{{< /callout >}}

## 개요 {#overview}

[DDSQL Editor][1]를 사용하면 자연어 또는 태그 쿼리를 추가로 지원하는 SQL 방언인 [DDSQL](#use-sql-syntax-ddsql)을 사용하여 리소스에 쿼리함으로써 텔레메트리 데이터에 대한 더 깊은 가시성을 확보할 수 있습니다.

DDSQL 쿼리 결과를 내보내 대시보드나 노트북에서 시각화하거나 [DDSQL 작업](#save-and-share-queries)을 통해 Datadog 워크플로에서 자동화할 수도 있습니다.

AI 에이전트에서는 [Datadog MCP Server][9] `ddsql` toolset(미리보기)를 통해 DDSQL 쿼리를 실행할 수 있습니다.

{{< img src="/ddsql_editor/query-results-avg-cpu-usage-by-host.png" alt="Datadog의 DDSQL 페이지에서 호스트별 평균 CPU 사용량을 보여주는 SQL 쿼리 결과" style="width:100%;" >}}

## 자연어로 쿼리 {#query-in-natural-language}

검색 상자에 질문을 입력하면 Datadog이 SQL 쿼리를 생성합니다. 변경 사항을 수락하거나 취소할 수 있으며, 기능을 개선하는 데 도움이 되도록 피드백을 제공할 수 있습니다.

{{< img src="ddsql_editor/natural-language-query-2.png" alt="자연어 검색 상자에 입력된 쿼리" style="width:90%;" >}}

## SQL 구문(DDSQL) 사용 {#use-sql-syntax-ddsql}

[DDSQL][6]은 Datadog 데이터를 위한 쿼리 언어입니다. DDSQL은 `SELECT`와 같은 여러 표준 SQL 연산을 구현하며, [태그][2]와 같은 비정형 데이터에 대한 쿼리도 허용합니다. 직접 `SELECT` 문을 작성하여 원하는 데이터를 정확하게 가져오십시오. 태그를 표 열처럼 쿼리하십시오. 자세한 내용은 [DDSQL Reference][6]를 참조하십시오.

{{< code-block lang="sql" >}}
SELECT instance_type, count(instance_type)
FROM aws.ec2_instance
WHERE tags->'region' = 'us-east-1' -- region is a tag, not a column
GROUP BY instance_type
{{< /code-block >}}

## 텔레메트리 탐색 {#explore-your-telemetry}

Data Explorer에서 쿼리를 보고, 필터링하며, 빌드하십시오.

표 이름을 클릭하여 해당 열과 관계를 확인하십시오:

{{< img src="ddsql_editor/data-tab.png" alt="aws.ec2_instance에 대한 표 정보를 보여주는 데이터 탭" style="width:70%;" >}}

로그와 같은 데이터 소스의 경우 쿼리 빌더를 사용하여 표 함수를 생성하십시오.

## 쿼리 저장 및 공유 {#save-and-share-queries}

유용한 쿼리를 저장하여 나중에 참조하거나 데이터를 CSV로 다운로드하십시오. 측면 패널에서 최근 쿼리나 저장된 쿼리를 찾아 다시 실행하십시오.

{{< img src="/ddsql_editor/save-and-actions.png" alt="저장 및 작업 드롭다운이 강조 표시된 쿼리 결과를 보여주는 DDSQL 편집기 인터페이스" style="width:90%;" >}}

저장된 쿼리의 결과를 다음으로 내보내기:
- 시각화 및 보고를 위한 Dashboard 또는 노트북
- Datadog 워크플로에서 [DDSQL Action](https://app.datadoghq.com/actions/action-catalog#com.datadoghq.dd/com.datadoghq.dd.ddsql/com.datadoghq.dd.ddsql.tableQuery)을 사용하여 자동화하십시오. 이 작업을 통해 다음을 수행할 수 있습니다.
  - [DDSQL 쿼리에서 사용자 지정 메트릭 생성](https://app.datadoghq.com/workflow/blueprints/create-a-metric-from-a-ddsql-query)
  - [DDSQL 쿼리 결과를 프로그래밍 방식으로 내보내기](https://app.datadoghq.com/workflow/blueprints/export-ebs-volumes-not-in-ddsql-as-s3-csv)
  - [리소스 규정 준수 확인을 위한 Slack 메시지 예약](https://app.datadoghq.com/workflow/blueprints/idle-compute-check-via-ddsql-with-slack-updates)
- [DDSQL 쿼리에 대한 경보][8] (로그, 메트릭, RUM, 스팬 및 Product Analytics 전용)

{{< img src="/ddsql_editor/queries-tab-recent-queries.png" alt="DDSQL 편집기의 저장된 쿼리 및 최근 쿼리 목록이 있는 쿼리 탭을 보여주는 측면 패널" style="width:70%;" >}}

## 권한 {#permissions}

DDSQL 편집기 앱에 액세스하려면 사용자는 `ddsql_editor_read` 권한이 필요합니다. 이 권한은 기본적으로 Datadog Read Only 역할에 포함되어 있습니다. 조직에서 사용자 지정 역할을 사용하는 경우 적절한 역할에 이 권한을 추가하십시오. 권한 관리에 대한 자세한 정보는 [RBAC 문서][3]를 참조하십시오.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ddsql/editor
[2]: /ko/ddsql_reference/ddsql_default/#tags
[3]: /ko/account_management/rbac/
[4]: /ko/bits_ai
[5]: /ko/help/
[6]: /ko/ddsql_reference/ddsql_default/
[7]: https://docs.datadoghq.com/ko/ddsql_editor/#save-and-share-queries
[8]: /ko/monitors/types/analysis/
[9]: /ko/mcp_server/