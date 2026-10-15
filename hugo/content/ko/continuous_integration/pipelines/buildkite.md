---
aliases:
- /ko/continuous_integration/setup_pipelines/buildkite
further_reading:
- link: /continuous_integration/pipelines
  tag: 설명서
  text: 파이프라인 실행 결과 및 성능 탐색
- link: /continuous_integration/troubleshooting/
  tag: 설명서
  text: CI Visibility 문제 해결
- link: /continuous_integration/pipelines/custom_tags_and_measures/
  tag: 설명서
  text: 사용자 지정 태그 및 측정값을 추가하여 Pipeline Visibility 확장
title: Buildkite용 CI Visibility 설정
---
## 개요 {#overview}

[Buildkite][1]은 자체 인프라에서 빌드를 실행할 수 있는 지속적 통합 및 배포 플랫폼으로, 클라우드에서 오케스트레이션을 관리하면서 보안을 완전히 제어하고 빌드 환경을 사용자 지정할 수 있습니다.

Buildkite용 CI Visibility를 설정하여 리소스 사용량을 최적화하고, 오버헤드를 줄이며, 소프트웨어 개발 수명 주기의 속도와 품질을 개선합니다.

### 호환성 {#compatibility}

| Pipeline Visibility | 플랫폼 | 정의 |
|---|---|---|
| [부분 재시도][9] | 부분 파이프라인 | 부분적으로 재시도된 파이프라인 실행을 확인합니다. |
| 인프라 메트릭 연결 | 인프라 메트릭 연결 | Buildkite Agent의 작업을 [인프라 호스트 메트릭][6]과 연결합니다. |
| [수동 단계][12] | 수동 단계 | 수동으로 트리거된 파이프라인을 확인합니다. |
| [대기 시간][13] | 대기 시간 | 파이프라인 작업이 처리되기 전까지 대기열에서 기다리는 시간을 확인합니다. |
| [사용자 지정 태그][10] [및 런타임 측정값][11] | 런타임 시 사용자 지정 태그 및 측정값 | 런타임 시 [사용자 지정 태그 및 측정값][6]을 설정합니다. |
| [사용자 지정 스팬][14] | 사용자 지정 스팬 | 파이프라인의 사용자 지정 스팬을 설정합니다. |
| [임계 경로의 CI 작업 필터링][17] | 임계 경로의 CI 작업 필터링 | 임계 경로에 있는 작업별로 필터링합니다. |
| [실행 시간][18] | 실행 시간  | 파이프라인이 작업을 실행하는 데 소요된 시간을 확인합니다. |
| 로그 연결 | 로그 연결 | 파이프라인 및 작업 스팬을 로그와 연결하고 [작업 로그 수집][20]을 활성화합니다. |


### 용어 {#terminology}

이 표는 Datadog CI Visibility와 Buildkite 간의 개념 매핑 관계를 보여줍니다.

| Datadog                    | Buildkite                       |
|----------------------------|---------------------------------|
| 파이프라인                   | 빌드(파이프라인 실행) |
| 작업                        | 작업(단계 실행)       |

## Datadog 통합 구성 {#configure-the-datadog-integration}

[Buildkite][1]에 대한 Datadog 통합을 설정하려면 다음 단계를 따르세요.

1. Buildkite에서 {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Notification Services{{< /ui >}}로 이동하여 {{< ui >}}Add{{< /ui >}} 옆의 {{< ui >}}Datadog Pipeline Visibility{{< /ui >}} 버튼을 클릭합니다.
2. 양식에 다음 정보를 입력합니다.
   * {{< ui >}}Description{{< /ui >}}: 나중에 통합을 식별하는 데 도움이 되는 설명(예: `Datadog CI Visibility integration`)
   * {{< ui >}}API key{{< /ui >}}: [Datadog API 키][2]
   * {{< ui >}}Datadog site{{< /ui >}}: `{{< region-param key="dd_site" code="true" >}}`
   * {{< ui >}}Pipelines{{< /ui >}}: 추적하고자 하는 파이프라인이나 파이프라인의 하위 집합을 선택합니다.
   * {{< ui >}}Branch filtering{{< /ui >}}: 모든 브랜치를 추적하려면 비워 둡니다. 또는 추적하려는 브랜치의 하위 집합을 선택합니다.
3. {{< ui >}}Add Datadog Pipeline Visibility Notification{{< /ui >}}을 클릭하여 통합을 저장합니다.

### 작업 로그 수집 {#collect-job-logs}

Buildkite Agent의 작업 로그를 OpenTelemetry 로그 형식으로 [Datadog OTLP 로그 엔드포인트][23]에 내보냅니다. 내보내기를 활성화하려면 Buildkite의 [OpenTelemetry 작업 로그 내보내기 설명서][22]를 따르세요.

Datadog은 CI Visibility와 별도로 로그 비용을 청구합니다. [Log Management][21]에서 로그 보존, 제외 필터 및 인덱스를 구성합니다. 이러한 규칙의 적용 범위를 Buildkite 로그로 제한하려면 `datadog.product:cipipeline` 및 `source:buildkite` 태그를 기준으로 필터링합니다.

{{% collapse-content title="Datadog Buildkite 통합(레거시)" level="h4" expanded=false id="legacy-buildkite-integration-job-log-collection" %}}

Datadog Buildkite 통합은 작업 로그를 수집하기 위한 레거시 방식입니다. OpenTelemetry를 사용할 수 없는 경우 Datadog 담당자에게 문의합니다.

설치 및 구성 지침은 [Buildkite 통합 설명서][19]를 참조하세요.

<div class="alert alert-warning">이 통합은 Buildkite API를 통해 작업 로그를 검색합니다. 로그를 수집하면 Buildkite API 요청 한도의 상당 부분을 소진할 수 있습니다.</div>

{{% /collapse-content %}}

## 고급 구성 {#advanced-configuration}

### 사용자 지정 태그 설정 {#set-custom-tags}

`buildkite-agent meta-data set`명령을 사용하여 Buildkite 트레이스에 사용자 지정 태그를 추가할 수 있습니다.
키가 `dd_tags.`로 시작하는 모든 메타데이터 태그가 작업 및 파이프라인 스팬에 추가됩니다. 이러한
태그를 사용하면 파이프라인을 검색하고 정리하는 데 사용할 문자열 패싯을 만들 수 있습니다.

다음 YAML은 팀 이름과 Go 버전을 나타내는 태그가
설정된 간단한 파이프라인의 예시입니다.

```yaml
steps:
  - command: buildkite-agent meta-data set "dd_tags.team" "backend"
  - command: go version | buildkite-agent meta-data set "dd_tags.go.version"
    label: Go version
  - commands: go test ./...
    label: Run tests
```

다음 태그는 루트 스팬과 Datadog의 관련 작업 스팬에 표시됩니다.

- `team: backend`
- `go.version: go version go1.17 darwin/amd64` (출력은 러너에 따라 다름)

결과 파이프라인은 다음과 같습니다.

{{< img src="ci/buildkite-custom-tags.png" alt="사용자 지정 태그가 포함된 Buildkite 파이프라인 트레이스" style="width:100%;">}}

키가 `dd-measures.`로 시작하고 숫자 값을 포함하는 메타데이터는
숫자형 측정값을 생성하는 데 사용할 수 있는 메트릭 태그로 설정됩니다.

`buildkite-agent meta-data set` 명령을 사용하여 이러한 태그를 생성할 수 있습니다.

예를 들어, 다음 명령을 사용하여 파이프라인에서 바이너리 크기를 측정할 수 있습니다.

```yaml
steps:
  - commands:
    - go build -o dst/binary .
    - ls -l dst/binary | awk '{print \$5}' | tr -d '\n' | buildkite-agent meta-data set "dd_measures.binary_size"
    label: Go build
```

그 결과, 파이프라인의 파이프라인 스팬에 다음과 같은 태그가 표시됩니다.

- `binary_size: 502`(출력은 파일 크기에 따라 다름)

예를 들어, `binary_size` 값을 사용하여 시간에 따른 바이너리 크기 변화를 그래프로 표시할 수 있습니다.

### 인프라 메트릭을 작업과 상호 연관시키기 {#correlate-infrastructure-metrics-to-jobs}

Buildkite Agent를 사용하는 경우 작업과 해당 작업이 실행되는 인프라를 연결할 수 있습니다.
이 기능을 사용하려면 Buildkite Agent가 실행되는 호스트에 [Datadog Agent][7]를 설치합니다.

## 부분 및 다운스트림 파이프라인 조회 {#view-partial-and-downstream-pipelines}

다음 필터를 사용하여 [CI Visibility 탐색기][15]에서 검색 쿼리를 사용자 지정할 수 있습니다.

{{< img src="ci/partial_retries_search_tags.png" alt="검색 쿼리에 Partial Pipeline:retry가 입력된 Pipelines 실행 페이지" style="width:100%;">}}

| 패싯 이름 | 패싯 ID | 가능한 값 |
|---|---|---|
| 다운스트림 파이프라인 | `@ci.pipeline.downstream` | `true`, `false` |
| 수동 트리거 | `@ci.is_manual` | `true`, `false` |
| 부분 파이프라인 | `@ci.partial_pipeline` | `retry`, `paused`, `resumed` |

페이지 왼쪽의 패싯 패널을 사용하여 이러한 필터를 적용할 수도 있습니다.

{{< img src="ci/partial_retries_facet_panel.png" alt="Partial Pipeline 패싯이 확장되고 값 Retry가 선택되어 있고, Partial Retry 패싯이 확장되고 true 값이 선택된 패싯 패널" style="width:20%;">}}

## Datadog에서 파이프라인 데이터 시각화 {#visualize-pipeline-data-in-datadog}

파이프라인이 완료되면 [**CI Pipeline List**][3]와 [**Executions**][4] 페이지가 채워집니다.

{{< ui >}}CI Pipeline List{{< /ui >}} 페이지에는 각 리포지토리의 기본 브랜치 데이터만 표시됩니다. 자세한 내용은 [CI 파이프라인 검색 및 관리][16]를 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://buildkite.com
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/ci/pipelines
[4]: https://app.datadoghq.com/ci/pipeline-executions
[5]: /ko/continuous_integration/pipelines/buildkite/#view-partial-and-downstream-pipelines
[6]: /ko/continuous_integration/pipelines/custom_tags_and_measures/?tab=linux
[7]: /ko/agent/
[8]: /ko/continuous_integration/pipelines/buildkite/#correlate-infrastructure-metrics-to-jobs
[9]: /ko/glossary/#partial-retry
[10]: /ko/glossary/#custom-tag
[11]: /ko/glossary/#custom-measure
[12]: /ko/glossary/#manual-step
[13]: /ko/glossary/#queue-time
[14]: /ko/glossary/#custom-span
[15]: /ko/continuous_integration/explorer
[16]: /ko/continuous_integration/search/#search-for-pipelines
[17]: /ko/continuous_integration/guides/identify_highest_impact_jobs_with_critical_path/
[18]: /ko/glossary/#pipeline-execution-time
[19]: /ko/integrations/buildkite/
[20]: /ko/continuous_integration/pipelines/buildkite/#collect-job-logs
[21]: /ko/logs/
[22]: https://buildkite.com/docs/agent/self-hosted/monitoring-and-observability/tracing#exporting-job-logs-as-opentelemetry-logs
[23]: /ko/opentelemetry/setup/otlp_ingest/logs/