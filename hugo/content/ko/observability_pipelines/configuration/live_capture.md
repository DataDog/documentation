---
aliases:
- /ko/observability_pipelines/live_capture/
description: Live Capture를 사용하여 Observability Pipelines 파이프라인을 통해 소스가 수신하는 데이터와 프로세서가
  전송하는 데이터를 확인하는 방법을 알아보세요.
disable_toc: false
further_reading:
- link: /observability_pipelines/configuration/set_up_pipelines/
  tag: 설명서
  text: Pipelines 설정하기
- link: https://www.datadoghq.com/blog/observability-pipelines-google-secops/
  tag: 블로그
  text: Observability Pipelines를 사용하여 보안 로그를 Google SecOps UDM으로 정규화
- link: https://www.datadoghq.com/blog/mitre-attack-enrichment-packs-observability-pipelines/
  tag: 블로그
  text: SIEM에 도달하기 전에 MITRE ATT&CK 컨텍스트로 보안 로그 자동 보강
products:
- icon: logs
  name: 로그
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
- icon: metrics
  name: 메트릭
  url: /observability_pipelines/configuration/?tab=metrics#pipeline-types
title: 라이브 캡처
---
{{< product-availability >}}

## 개요 {#overview}

Live Capture를 사용하여 소스가 파이프라인을 통해 전송하는 데이터와 프로세서가 수신 및 전송하는 데이터를 확인하세요.
구체적으로 다음 정보가 표시됩니다.
- 데이터가 수신된 시점의 타임스탬프
- 전송된 데이터 및 해당 데이터의 처리 상태:
    - 수정됨
    - 수정되지 않음
    - 드롭됨
    - 축소됨

Parse JSON 프로세서에 의해 처리되기 전과 후의 로그 `message` 필드를 보여주는 Live Capture 예시

{{< img src="observability_pipelines/live_capture_parse_json.png" alt="Entry 열은 원본 메시지 필드의 값을 표시하고, Exit 열은 JSON으로 파싱된 값을 표시합니다." style="width:100%;" >}}

## 권한 {#permissions}

`Observability Pipelines Live Capture Write` 권한이 있는 사용자만 캡처를 설정할 수 있습니다. `Observability Pipelines Live Capture Read` 권한이 있는 사용자는 이미 캡처된 이벤트만 조회할 수 있습니다. Observability Pipelines 자산에 대한 권한 목록은 [Observability Pipelines 권한][1]을 참조하세요.

관리자는 기본적으로 읽기 및 쓰기 권한을 가집니다. 표준 사용자는 기본적으로 읽기 권한만 가집니다. 기본 Datadog 역할 및 사용자 지정 역할 생성 방법에 대한 자세한 내용은 [Access Control][2]를 참조하세요.

### 방화벽 허용 목록에 도메인 추가{#add-domains-to-firewall-allowlist}

Live Capture를 사용하며 방화벽을 사용 중인 경우, 다음 도메인을 허용 목록에 추가해야 합니다.

- `api.{{< region-param key="dd_site" >}}`
- `obpipeline-intake.{{< region-param key="dd_site" >}}`
- `config.{{< region-param key="dd_site" >}}`

## 이벤트 캡처 {#capture-events}

1. [Observability Pipelines][3]로 이동합니다.
1. 파이프라인을 선택합니다.
1. 이벤트를 캡처하려는 소스 또는 프로세서의 톱니바퀴 아이콘을 클릭합니다.
1. 사이드 패널에서 {{< ui >}}Capture and view events{{< /ui >}}를 선택합니다.
1. {{< ui >}}Capture{{< /ui >}}를 클릭합니다.
1. **추가 설정**:
  {{< img src="observability_pipelines/live_capture_optional_config.png" alt="필터 쿼리, 캡처 기간 및 Worker 선택 옵션을 보여주는 Live Capture 추가 설정 모달" style="width:60%;" >}}
  **참고**: 추가 설정은 모든 활성 Worker가 버전 2.13 이상인 경우에만 사용할 수 있습니다.
    1. 캡처할 이벤트를 지정할 쿼리를 입력합니다. 자세한 내용은 [로그 검색 구문][4] 또는 [메트릭 검색 구문][5]을 참조하세요.
    1. 이벤트를 캡처할 기간을 초 또는 분 단위로 입력합니다.
        - 최소 기간(기간을 지정하지 않을 경우 기본값): 30초
        - 최대 기간: 300초(5분)
    1. 이벤트를 캡처할 Worker를 선택합니다. Worker를 선택하지 않으면 임의의 Worker가 선택됩니다.
1. {{< ui >}}Capture{{< /ui >}}를 클릭하여 이벤트 캡처를 시작합니다.<br>**참고**: 캡처된 이벤트가 UI에 나타나기까지 최대 60초가 걸릴 수 있습니다. 캡처된 데이터는 조회 권한이 있는 모든 사용자에게 표시되며, 72시간 동안 Datadog 플랫폼에 저장됩니다.
1. 캡처가 완료되면 다음을 수행합니다.
    1. 특정 캡처 이벤트를 클릭하여 수신 및 전송된 데이터를 확인합니다. 검색창에서 특정 이벤트를 검색할 수도 있습니다. 검색창 옆의 드롭다운 메뉴를 사용하여 상태(`MODIFIED`, `UNMODIFIED`, `DROPPED`, `REDUCED`)에 따라 이벤트를 표시합니다.
    1. {{< ui >}}Workers - Capture Execution Details{{< /ui >}} 섹션에서 {{< ui >}}View Logs{{< /ui >}}를 클릭하여 캡처에 대한 Worker 로그를 확인합니다.
1. 동일한 구성 요소의 다른 캡처를 보려면 사이드 패널 왼쪽 상단에서 {{< ui >}}Captures{{< /ui >}}를 클릭합니다. **참고**: 다른 캡처를 조회하는 기능은 모든 활성 Worker가 버전 2.13 이상인 경우에만 적용됩니다.
   - 캡처 이벤트 ID, 필터 쿼리, 파이프라인 버전 또는 상태(`in_progress` 또는 `completed`)별로 캡처를 필터링할 수 있습니다.
   - {{< ui >}}Total Events{{< /ui >}} 열에서는 이벤트의 입력과 출력을 모두 포함하여 Worker당 최대 200개의 이벤트를 캡처할 수 있습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/account_management/rbac/permissions/#observability-pipelines
[2]: /ko/account_management/rbac/
[3]: https://app.datadoghq.com/observability-pipelines
[4]: /ko/observability_pipelines/search_syntax/logs
[5]: /ko/observability_pipelines/search_syntax/metrics