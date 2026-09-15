---
description: 표, 피벗 테이블, 룩업, 계산 열, 유연한 스프레드시트를 갖춘 익숙한 스프레드시트 인터페이스에서 Datadog 데이터를 분석해
  보세요.
further_reading:
- link: /sheets/functions_operators
  tag: 설명서
  text: 함수 및 연산자
- link: https://www.datadoghq.com/blog/flexible-sheets-cloud-cost-management/
  tag: 블로그
  text: Datadog Sheets의 유연한 스프레드시트로 클라우드 비용을 분석해 보세요.
- link: https://www.datadoghq.com/blog/datadog-forms-sheets-developer-feedback/
  tag: 블로그
  text: Datadog Forms와 Sheets를 사용하여 개발자 피드백을 운영 인사이트로 전환하기
- link: https://www.datadoghq.com/blog/advanced-analysis-tools/
  tag: 블로그
  text: Datadog에서 고급 분석을 위해 Sheets, DDSQL Editor 및 Notebooks를 사용하여 데이터를 탐색해 보세요.
title: Sheets
---
## 개요 {#overview}

Sheets는 Datadog 데이터를 채울 수 있는 스프레드시트 도구로, 전문 기술 지식 없이도 복잡한 분석을 수행하고 보고서를 작성할 수 있습니다. 팀은 Datadog 데이터에 대해 룩업, 피벗 테이블, 계산 등 익숙한 스프레드시트 기능을 사용할 수 있으므로 데이터를 내보내거나 오래된 데이터가 있는 다른 도구를 사용할 필요가 없습니다.

Sheets를 사용하면 익숙한 스프레드시트 인터페이스에서 로그, Real User Monitoring, 클라우드 비용 모니터링 데이터를 조작, 변환 및 분석할 수 있습니다. 다음 탭을 포함할 수 있습니다.

- [{{< ui >}}Table{{< /ui >}}](#table): Datadog 데이터 소스에서 실시간 데이터를 쿼리하고 계산 열, 룩업, 필터를 사용해 데이터를 보강할 수 있습니다.
- [{{< ui >}}Pivot{{< /ui >}}](#pivot): 사용자 정의 차원과 계산을 통해 표의 데이터를 요약하고 집계할 수 있습니다.
- [{{< ui >}}Sheet{{< /ui >}}](#sheet-preview) (미리 보기): 표의 데이터를 직접 참조하는 수식을 작성해 모델과 보고서를 만들고 운영 현황을 추적할 수 있는 유연한 자유 캔버스형 스프레드시트예요.

## 표 {#table}

Sheets에서 새 쿼리를 작성하거나 Logs, RUM, Metrics, Cloud Cost 같은 탐색기 페이지에서 쿼리를 가져와 데이터 표 생성을 시작해 보세요.

### Sheets에서 새 표 추가 {#add-a-new-table-in-sheets}

{{< img src="/sheets/create_table.png" alt="Sheets에서 테이블을 생성하는 모달 창으로, status:error 조건의 Logs 쿼리를 보여줘요." style="width:90%;" >}}

1. [Datadog Sheets 페이지][1]에서 {{< ui >}}New Spreadsheet{{< /ui >}}를 클릭합니다.
1. {{< ui >}}Add Data{{< /ui >}}를 클릭합니다.<br/>
**참고**: 원하는 데이터 소스를 사용할 수 없는 경우 [여기][19]에서 요청하세요.
1. Data 소스를 선택하고 필터링 매개변수를 추가하여 쿼리 작성을 시작합니다.
1. 표시할 열을 선택하고 결과 표를 미리 확인합니다.
1. {{< ui >}}Create Table{{< /ui >}}를 클릭합니다.

### 쿼리를 스프레드시트로 전송합니다.{#transfer-your-query-to-a-spreadsheet}

다1. 지원되는 제품 페이지(예: [로그 탐색기][2])에서 분석하려는 데이터 쿼리를 작성합니다(예: Logs 조회를 `status:error`가 있는 항목으로 필터링).
1.  {{< ui >}}Open in Sheets{{< /ui >}}를 클릭합니다. 표를 생성할 수 있는 제품 페이지 목록은 [지원되는 데이터 소스](#supported-data-sources) 섹션을 살펴보세요.
1.  {{< ui >}}New Spreadsheet{{< /ui >}}를 생성하거나 이 데이터 표를 {{< ui >}}Existing Spreadsheet{{< /ui >}}에 추가할 수 있습니다.
1.  {{< ui >}}Save and Open{{< /ui >}}를 클릭합니다.

### 계산 열{#calculated-columns}

계산 열을 사용해 수식을 추가하고, 로그 메시지 구문을 분석하며, 정규식을 추출하거나 데이터에 비즈니스 로직을 적용할 수 있습니다. 계산 열은 나중에 생성할 피벗 테이블에서 사용할 수 있습니다.

표의 맨 오른쪽 열 헤더에서 Plus 아이콘을 클릭하여 {{< ui >}}Add calculated column{{< /ui >}}합니다. 함수를 입력해 해당 함수의 구문과 설명을 확인합니다. 지원되는 함수 전체 목록은 [Functions and Operators][3] 문서를 살펴보세요.

{{< img src="/sheets/calculated_columns.png" alt="Plus 아이콘으로 추가한 계산 열 및 IFS 함수 예시" style="width:90%;" >}}

### Lookup {#lookup}

Lookup은 기존 데이터를 보강하고 표에 더 많은 맥락을 추가해요. 페이지 상단의 {{< ui >}}Add Lookup{{< /ui >}}를 클릭하여 [Reference Tables][4], 로그 또는 RUM 데이터 등 다른 표나 데이터 소스에서 열을 추가합니다. Lookup은 Excel이나 Google Sheets의 Left Join 또는 vlookup과 유사해요. 공통 열을 기준으로 레코드를 매칭하고 추가 데이터 열을 가져와 기존 Sheets 표의 데이터를 보강해요.

{{< img src="/sheets/lookup.png" alt="참조 테이블에서 가져온 사용자의 팀 메타데이터를 추가하는 Lookup 예시" style="width:90%;" >}}

예를 들어, 사용자 이메일이 포함된 RUM 데이터 표가 있고 이 사용자들이 어떤 팀에 속해 있는지 알고 싶다고 가정해 볼게요. 표의 사용자 이메일 열과 Reference Table의 업무용 이메일 열을 비교하는 Lookup을 추가할 수 있습니다. Lookup은 Reference Table에서 팀 정보를 가져와 스프레드시트에 새 열로 추가해요.

## 피벗 {#pivot}

스프레드시트에 데이터 표를 추가한 후, 피벗 테이블을 사용해 원시 데이터를 분석하고 맥락을 더해 보세요. 피벗 테이블을 사용해 대량의 데이터를 요약하고 맞춤형 표로 구성하세요. 데이터를 분석하여 패턴과 추세를 찾고 비교 결과를 확인하는 데 도움이 돼요. 예를 들어, 100개의 행이 있는 표가 있을 때 피벗 테이블을 사용하면 해당 데이터를 방식이나 지역별로 집계하는 요약 표로 분류할 수 있습니다. 피벗 테이블 생성 방법:
1. 데이터 표가 이미 있는 기존 스프레드시트에서 {{< ui >}}Add Pivot Table{{< /ui >}}를 클릭합니다.
1. , {{< ui >}}Rows{{< /ui >}} 및 {{< ui >}}Columns{{< /ui >}} 섹션에서 로그 상태 등 분석하려는 차원을 선택합니다.
1. 와 {{< ui >}}Calculations{{< /ui >}} 섹션에서 합계, 평균, 개수, 최소값 및 최대값 등 계산에 사용할 차원을 선택합니다.

{{< img src="/sheets/example_pivot_table.png" alt="피벗 테이블 구성 패널 예시" style="width:90%;" >}}

### 시각화 {#visualizations}

피벗 테이블이 생성되면 {{< ui >}}Show Graphs{{< /ui >}}을 클릭하여 최대 6개의 위젯을 추가해 데이터를 그래프로 나타냅니다. 지원되는 위젯 유형에는 {{< ui >}}Top List{{< /ui >}}, {{< ui >}}Treemap{{< /ui >}}, {{< ui >}}Pie Chart{{< /ui >}} 위젯이 포함됩니다. 위젯 제목 위로 마우스를 가져가면 위젯을 삭제, 복제, 확장, 내보내기, 재배치할 수 있습니다. 위젯을 편집하려면 연필 아이콘을 클릭하세요. 편집 옵션을 통해 위젯 유형을 선택하고, 피벗 계산 결과가 여러 개인 경우 그래프로 표시할 항목을 지정하며, 행과 열 및 행 또는 열당 그래프로 나타낼 그룹화 개수를 설정할 수 있습니다.

## Sheet(미리 보기) {#sheet-preview}

{{< callout url="https://www.datadoghq.com/product-preview/flexible-spreadsheets-in-datadog-sheets/">}}
유연한 스프레드시트 생성: 처음부터 자유롭게 시작해 모델을 구축하고 운영 현황을 추적하는 등 다양한 작업을 수행할 수 있도록 설계되었습니다.
{{< /callout >}}

시트는 전체 수식 엔진을 갖춘 유연한 빈 캔버스 스프레드시트예요. 재무 모델 구축, 운영 현황 추적기, 기획 템플릿 제작은 물론 쿼리 기반 워크플로에 맞지 않는 모든 자유 형식 계산 작업에 활용해 보세요.

시트를 추가하려면 스프레드시트 하단의 {{< ui >}}\+{{< /ui >}} 탭을 클릭하고 {{< ui >}}Add Sheet{{< /ui >}}를 선택합니다.

{{< img src="/sheets/flexible_spreadsheet.png" alt="Cloud cost 및 Currency conversion 표 탭을 참조하는 SUMIFS와 VLOOKUP을 활용해 공급업체 모델별 2025년 클라우드 지출을 보여주는 유연한 시트예요." style="width:90%;" >}}

### 셀 참조 {#cell-references}

셀은 열을 문자로, 행을 숫자로 나타내는 표준 A1 기법을 사용하여 참조해요. 예를 들어, `A1`은 첫 번째 셀이고, `B3`는 B열의 세 번째 행이며, `A1:C5`는 A열부터 C열까지, 1행부터 5행까지 걸쳐 있는 범위예요.

| 참조 유형 | 구문 | 설명 |
| -------------- | ------ | ----------- |
| 상대 셀 | `A1` | 수식을 다른 셀로 복사할 때 위치에 따라 자동으로 조정돼요|
| 절대 셀 | `$A$1` | 항상 동일한 셀을 참조해요 |
| 절대 열, 상대 행 | `$A1` | 열은 고정 유지되고; 행은 조정돼요 |
| 상대 열, 절대 행 | `A$1` | 행은 고정 유지되고; 열은 조정돼요 |
| 범위 | `A1:C5` | A1부터 C5까지 모든 셀 |

### 시트 간 참조 {#cross-sheet-references}

동일한 스프레드시트 내 다른 탭의 데이터를 수식에서 직접 참조할 수 있습니다. 시트 이름 뒤에 느낌표를 붙이고 셀 또는 범위를 입력합니다.

```
='My Table'!A1
='Summary'!B2:B20
```

**표** 탭에서 특정 열을 이름으로 참조하려면 `#` 표기법을 사용합니다.

```
='Error Logs'#"duration_ms"
='Table 1'#"status"
```

예를 들어, `=SUM('Error Logs'#"duration_ms")`는 Error Logs 표의 `duration_ms` 열에 있는 모든 값을 합산해요.

### 수식 {#formulas}

Sheet 수식은 [Functions and Operators][3] 페이지에 나열된 모든 함수와 시트에서만 사용할 수 있는 추가적인 Lookup, 통계, 재무 및 기타 함수를 지원해요. 전체 목록은 [Sheet functions][21] 섹션을 살펴보세요.

#### 예시 {#examples}

**시트에서 표 열 집계**

'Error Logs'라는 표 탭의 `duration_ms` 열에 있는 모든 값을 합산해요.

```
=SUM('Error Logs'#"duration_ms")
```

해당 표에서 `status = "error"`를 가진 행의 수를 계산해요.

```
=COUNTIF('Error Logs'#"status","error")
```

**대체 값을 사용한 안전한 Lookup**

참조 테이블에서 사용자의 팀을 조회하고, 일치하는 항목이 없으면 'unknown'을 반환해요.

```
=IFNA(VLOOKUP(A2,'User Directory'!A:B,2,0),"unknown")
```

**인시던트 발생 후 경과 일수**

A2 셀의 타임스탬프를 기준으로 인시던트가 발생한 지 얼마나 지났는지 계산해요.

```
=DATEDIF(A2,TODAY(),"D")&" days ago"
```

**표의 p95 지연 시간**

연결된 표에서 응답 시간의 95백분위수를 가져와요.

```
=PERCENTILE('APM Data'#"duration",0.95)
```

**값을 심각도 등급으로 분류**

```
=IFS(A2>500,"critical",A2>200,"warn",A2>0,"ok",TRUE,"no data")
```

**월 대출 상환액**

연이율 6%, 3년 만기 조건으로 $50,000 대출에 대한 월 상환액을 계산해요.

```
=PMT(0.06/12,36,-50000)
```

### 오류 값 {#error-values}

| <span style="min-width:80px;display:block">오류</span> | 원인 | 처리 방법 |
| -------------------- | ----- | ------------- |
| `#DIV/0!` | 0으로 나누기 | `=IFERROR(A1/B1,0)` |
| `#VALUE!` | 잘못된 인수 유형(예: 수학 함수에 텍스트 전달) | 입력 유형 확인 |
| `#NUM!` | 잘못된 숫자 값(예: `SQRT(-1)` | )`IF` |로 입력 유효성 검사
| `#N/A` | 값을 찾을 수 없음(예: 실패한 `VLOOKUP` | `=IFNA(VLOOKUP(...),"not found")` |)
| `#REF!` | 더 이상 존재하지 않는 셀에 대한 참조 | 수식 업데이트 |
| `#NAME?` | 인식할 수 없는 함수 이름 | 철자 확인 |
| `#ERROR!` | 수식을 구문 분석할 수 없음 | 구문 확인 |

### 셀 서식 {#cell-formatting}

셀 서식은 일반 텍스트, 숫자, 백분율, 통화(USD 또는 EUR) 및 날짜/시간 형식으로 지정할 수 있습니다. 서식 지정은 값이 표시되는 방식에만 영향을 미치며 계산에 사용되는 실제 기본 값은 변경되지 않아요.

### 제한 {#limits}

Sheets의 행 및 열 개수 제한 사항은 다음과 같아요.

| 차원 | 기본값 | 최대값 |
| --------- | ------- | ------- |
| 행 | 1,000 | 2,000 |
| 열 | 26 | 52 |

## 지원되는 데이터 소스 {#supported-data-sources}

{{< callout url="https://www.datadoghq.com/product-preview/additional-advanced-querying-data-sources/" header="고급 데이터 소스">}}
아직 지원되지 않는 데이터 소스를 쿼리하려는 경우, 이 양식을 사용해 제출해 주세요.
{{< /callout >}}

다음 데이터 소스에서 가져온 데이터로 표를 생성하고 분석하세요.

| 데이터 소스          | 제품 페이지       |
| -------------------- | -----------        |
| APM 스팬            | [APM Explorer][18] |
| Audit Trail          | [Audit Trail][15] |
| CI Pipelines         | [CI Visibility][17] |
| Cloud Cost           | [Cloud Cost Analytics][5] |
| 데이터베이스 쿼리     | [Database Monitoring][16] |
| 이벤트               | [Event Management][14] |
| 인프라       | [Host List][6] |
| Agent Observability    | [Agent Observability][13] |
| 로그                 | [Logs Explorer][2] |
| 메트릭              | [Metrics Explorer][7] |
| 제품 분석    | [Product Analytics Events][20] |
| Real User Monitoring | [RUM Explorer][8]  |
| Reference Tables     | [Reference Tables][9] |
| 보안 결과    | [Cloud Security][12] |
| 보안 시그널     | [Security][11] |

## 스프레드시트 구성 {#configuring-a-spreadsheet}

### 권한 {#permissions}

기본적으로 모든 사용자는 스프레드시트에 대한 전체 액세스 권한을 가져요.

세분화된 액세스 제어를 사용하여 특정 스프레드시트를 편집할 수 있는 [roles][10]을 제한하세요.
1. 스프레드시트를 보는 동안 오른쪽 상단의 톱니바퀴 아이콘을 클릭합니다. 설정 메뉴가 열립니다.
1. {{< ui >}}Permissions{{< /ui >}}를 선택합니다.
1. {{< ui >}}Restrict Access{{< /ui >}}를 클릭합니다. 대화 상자가 업데이트되어 조직 구성원이 기본적으로 {{< ui >}}Viewer{{< /ui >}} 액세스 권한이 있는 것으로 표시됩니다.
1.  드롭다운을 사용하여 스프레드시트를 편집할 수 있는 하나 이상의 역할, 팀 또는 사용자를 선택합니다.
2. {{< ui >}}Add{{< /ui >}}를 클릭합니다. 대화 상자가 업데이트되어 선택한 역할에 {{< ui >}}Editor{{< /ui >}} 권한이 있는 것으로 표시됩니다.
1. {{< ui >}}Save{{< /ui >}}를 클릭합니다.

**참고:**스프레드시트 편집 액세스를 유지하려면 저장하기 전에 구성원에게 역할이 최소 한 개가 있어야 합니다.

제한된 스프레드시트에 대한 일반 액세스를 복원하려면 편집 편집 권한이 있어야 합니다. 다음 단계를 따르세요.
1. 스프레드시트를 보는 동안 오른쪽 상단의 톱니바퀴 아이콘을 클릭합니다. 설정 메뉴가 열립니다.
1. {{< ui >}}Permissions{{< /ui >}}를 선택합니다.
1. {{< ui >}}Restore Full Access{{< /ui >}}를 클릭합니다.
1. {{< ui >}}Save{{< /ui >}}를 클릭합니다.


## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/sheets
[2]: https://app.datadoghq.com/logs
[3]: /ko/sheets/functions_operators
[4]: https://docs.datadoghq.com/ko/integrations/guide/reference-tables/?tab=manualupload
[5]: https://app.datadoghq.com/cost
[6]: https://app.datadoghq.com/infrastructure/
[7]: https://app.datadoghq.com/metric/explorer
[8]: https://app.datadoghq.com/rum/sessions
[9]: https://app.datadoghq.com/reference-tables
[10]: /ko/account_management/rbac/
[11]: https://app.datadoghq.com/security
[12]: https://app.datadoghq.com/security/compliance
[13]: https://app.datadoghq.com/llm/applications
[14]: https://app.datadoghq.com/event/explorer
[15]: https://app.datadoghq.com/audit-trail
[16]: https://app.datadoghq.com/databases/queries
[17]: https://app.datadoghq.com/ci/pipelines
[18]: https://app.datadoghq.com/apm/traces
[19]: https://www.datadoghq.com/product-preview/additional-advanced-querying-data-sources/
[20]: https://app.datadoghq.com/product-analytics/events
[21]: /ko/sheets/functions_operators#functions