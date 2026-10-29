---
description: Datadog의 공개 아티팩트에 대한 CVE 및 취약성 정보를 조회하세요.
further_reading:
- link: https://www.datadoghq.com/blog/datadog-public-artifact-vulnerabilities-openvex/
  tag: 블로그
  text: Datadog의 OpenVEX 평가로 CVE 노이즈 줄이기
title: 공개 아티팩트 취약성
---
공개 아티팩트 취약성 페이지에서 Datadog의 공개 아티팩트 및 라이브러리에 대한 취약성 및 대응 정보를 조회할 수 있습니다. 다음 항목을 조회하는 데 사용하세요.

- 특정 아티팩트에 영향을 미치는 취약성(이미지/버전별)
- 특정 CVE의 영향을 받는 아티팩트
- 각 취약성에 대한 상태, 근거, 영향 및 조치 문구

## 액세스 방법 {#how-to-access}

{{< ui >}}Public Artifact Vulnerabilities{{< /ui >}}의 도움말 페이지에서 공개 아티팩트 취약성 페이지에 액세스할 수 있습니다.

## 페이지 사용{#using-the-page}

### 아티팩트별 조회{#look-up-by-artifact}

아티팩트 뷰를 사용하여 특정 제품군, 이미지 및 버전(예: Datadog Agent 이미지 버전 7.52.0)에 대한 모든 취약성을 조회하세요.

- {{< ui >}}Family{{< /ui >}}: {{< ui >}}Agent platform{{< /ui >}}, {{< ui >}}APM library injection{{< /ui >}}, {{< ui >}}Private action runners{{< /ui >}}, {{< ui >}}Telemetry collectors{{< /ui >}}, {{< ui >}}Serverless{{< /ui >}}, {{< ui >}}Private deployments{{< /ui >}} 또는 {{< ui >}}Build & CI{{< /ui >}}와 같은 카테고리를 선택하세요. 선택 항목에 따라 {{< ui >}}Image{{< /ui >}} 드롭다운의 옵션이 제한됩니다.
- {{< ui >}}Image{{< /ui >}}: 선택한 제품군에서 이미지를 선택하세요. 목록은 사용 가능한 공개 아티팩트를 기반으로 작성됩니다.
- {{< ui >}}Version{{< /ui >}}: 선택한 이미지의 버전을 선택하세요. 버전은 최신순으로 정렬됩니다.

표가 로드되고 해당 이미지 및 버전에 영향을 미치는 취약성별로 한 행씩 표시됩니다.

<div class="alert alert-tip">현재 결과를 필터링하려면 {{< ui >}}Find CVE in artifacts{{< /ui >}}를 클릭하지 말고 검색 상자에 키워드를 입력하세요.</div>

{{< img src="data_security/public_artifact_vulnerabilities/artifact-view.png" alt="아티팩트별 조회" style="width:100%;" >}}

**표 열(이미지/버전별):**

| 열 | 목적 |
|--------|---------|
| 심각도 | 취약성의 심각도입니다(예: Critical, High, Medium, Low, Info). |
| 취약성 | CVE 또는 취약성 식별자 및 이름입니다. |
| 플랫폼 | 적용 가능한 플랫폼입니다. 플랫폼 값 위로 마우스를 가져가면 FIPS 및 비 FIPS 빌드를 포함하여 해당 플랫폼이 포함하는 특정 변형을 확인할 수 있습니다. |
| 상태 | 현재 상태입니다(예: Not affected, Affected, Fixed, Under investigation). |
| 추가 정보 | CVE 상태에 대한 추가 정보 및 필요한 경우 상태에 대한 근거입니다. 예를 들어 상태가 component_not_present인 경우, 이 열은 CVE가 아티팩트에 영향을 미치지 않는 이유와 해당 결론에 도달한 방법을 설명합니다. 'Under investigation'과 같은 일부 상태는 영향이 아직 분석 중이기 때문에 추가 정보가 없습니다. |

### CVE별 조회 {#look-up-by-cve}

CVE 뷰를 사용하여 특정 취약성의 영향을 받는 아티팩트와 버전 및 각각의 상태를 확인하세요.

1. 표 상단의 검색 상자에 하나 이상의 CVE ID를 입력하세요(예: `CVE-2024-1234` 또는 여러 개인 경우 `CVE-2024-1234, CVE-2024-5678`).
2. {{< ui >}}Find CVE in artifacts{{< /ui >}}를 클릭합니다.

표가 CVE 모드로 전환되고 CVE, 아티팩트 및 버전 조합당 하나의 행이 표시됩니다.

<div class="alert alert-tip">현재 결과를 필터링하려면 {{< ui >}}Find CVE in artifacts{{< /ui >}}를 클릭하지 말고 검색 상자에 키워드를 입력하세요.</div>

{{< img src="data_security/public_artifact_vulnerabilities/cve-view.png" alt="CVE별 조회" style="width:100%;" >}}

**표 열(CVE별):**

| 열 | 목적 |
|--------|---------|
| CVE | CVE ID입니다. |
| 아티팩트 이름 | 아티팩트의 이름(예: 에이전트, 라이브러리 이름)입니다. |
| 버전 | 아티팩트의 버전입니다. |
| 플랫폼 | 적용 가능한 플랫폼입니다. 플랫폼 값 위로 마우스를 가져가면 FIPS 및 비 FIPS 빌드를 포함하여 해당 플랫폼이 포함하는 특정 변형을 확인할 수 있습니다. |
| 상태 | 이 CVE/아티팩트/버전에 대한 상태입니다(예: 영향 없음, 영향 있음, 수정됨, 조사 중). |
| 추가 정보 | CVE 상태에 대한 추가 정보 및 필요한 경우 상태에 대한 근거입니다. |


## 사용 가능한 아티팩트(이미지) {#available-artifacts-images}

**이미지** 드롭다운은 추적되는 공개 아티팩트 목록에서 채워집니다. 공개 아티팩트 취약성은 추적되는 공개 이미지의 **최신 10개 버전**을 지원합니다. 예상되는 아티팩트가 누락된 경우 [Datadog 지원팀][1]에 문의하여 추가를 요청하세요.

## 페이지의 옵션 및 작업 {#options-and-actions-on-the-page}

| 옵션 또는 작업 | 설명 |
|------------------|-------------|
| {{< ui >}}Search / global filter{{< /ui >}} | 텍스트를 기준으로 표 행을 필터링합니다. '이미지/버전별' 모드에서는 {{< ui >}}Find CVE in artifacts{{< /ui >}}를 클릭하여 CVE 조회를 실행하기 전에 동일한 검색 상자를 사용합니다. |
| {{< ui >}}Find CVE in artifacts{{< /ui >}} | 현재 검색 상자 값을 사용하여 CVE 조회를 실행합니다(쉼표로 구분된 CVE ID 지원). CVE별 조회 시에만 해당합니다. |
| {{< ui >}}Pagination{{< /ui >}} | 표 페이지 매김을 사용하여 대규모 결과 집합을 페이지별로 탐색합니다(예: 페이지당 50개 행). |
| {{< ui >}}Resizable columns{{< /ui >}} | 가독성을 위해 열 너비를 조정할 수 있습니다. |

[1]: /ko/help

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}