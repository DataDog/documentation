---
aliases:
- /ko/continuous_integration/setup_pipelines/buildkite
further_reading:
- link: /continuous_integration/pipelines
  tag: 설명서
  text: 파이프라인 실행 결과 및 성능 탐색
- link: /continuous_integration/troubleshooting/
  tag: 설명서
  text: CI 문제 해결
- link: /continuous_integration/pipelines/custom_tags_and_metrics/
  tag: 설명서
  text: 커스텀 태그 및 메트릭을 추가하여 Pipeline Visibility 확장
title: Buildkite 파이프라인에 \u0008트레이스 설정
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">선택하신 사이트({{<region-param key="dd_site_name">}})에서 현재 CIVisibility를 사용할 수 없습니다.</div>
{{< /site-region >}}

## 호환성

- **Partial pipelines**: [부분 재시도][5]와 다운스트림 파이프라인 실행을 표시합니다

- **Manual steps**: 수동으로 트리거된 파이프라인을 표시합니다.

- **Queue time**: 파이프라인의 작업이 처리되기 전에 대기열에 남아있는 시간을 표시합니다.


- **Custom tags and metrics at runtime**: 런타임에 [커스텀 태그][6]와 메트릭을 설정합니다.

## Datadog 통합 설정

[Buildkite][1]에서 Datadog 통합을 활성화하는 단계는 다음과 같습니다.

1. Buildkite의 **Settings > Notification Services**로 이동하여 add a **Datadog Pipeline Visibility** integration을 클릭합니다.
2. 다음 정보와 함께 양식을 작성합니다.
   * **Description**: 추후 해당 통합을 식별할 수 있는 설명을 입력합니다 (예: Datadog CI Visibility integration).
   * **API key**: [Datadog API 키][2] 입니다.
   * **Datadog site**: {{< region-param key="dd_site" code="true" >}}
   * **Pipelines**: 추적하고자 하는 파이프라인이나 파이프라인의 하위 집합을 선택합니다.
   * **Branch filtering**: 모든 브랜치를 추적하려면 비워 둡니다. 또는 추적하려는 브랜치의 하위 집합을 선택합니다.
3. **Add Datadog Pipeline Visibility Notification**을 클릭해 통합을 저장합니다.

### 커스텀 태그 설정

`buildkite-agent meta-data set` 명령을 사용하여 Buildkite 트레이스에 커스텀 태그를 추가할 수 있습니다.
키가 `dd_tags.`로 시작하는 모든 메타데이터 태그는 작업과 파이프라인 스팬에 추가됩니다. 이러한 태그를 사용하여 스트링 패싯을 생성하고 파이프라인을 검색 및 구성할 수 있습니다.

다음 YAML은 팀 이름과 Go 버전으로 태그가 지정된 간단한 파이프라인을 나타냅니다.

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

그 결과, 파이프라인은 다음과 같습니다.

{{< img src="ci/buildkite-custom-tags.png" alt="Buildkite pipeline trace with custom tags" style="width:100%;">}}

`dd-metrics.`로 시작하고 숫자 값을 포함하는 키가 있는 모든 메타데이터는 수치 측정값을 만드는 데 사용할 수 있는 메트릭 태그로 설정됩니다. `buildkite-agent meta-data set` 명령을 사용하여 이러한 태그를 만들 수 있습니다. 예를 들어 파이프라인에서 바이너리 크기를 측정하는 데 사용할 수 있습니다:

```yaml
steps:
  - commands:
    - go build -o dst/binary .
    - ls -l dst/binary | awk '{print \$5}' | tr -d '\n' | buildkite-agent meta-data set "dd_metrics.binary_size"
    label: Go build
```

그 결과, 파이프라인의 파이프라인 스팬에 다음과 같은 태그가 표시됩니다.

- `binary_size: 502` (출력은 파일 크기에 따라 다름)

예를 들어, `binary_size` 값을 사용하여 시간에 따른 바이너리 크기 변화를 플로팅할 수 있습니다.

## Datadog에서 파이프라인 데이터 시각화

파이프라인이 완료되면 [Pipelines][3]과 [Pipeline Executions][4] 페이지가 데이터로 채워집니다.

**참고**: 파이프라인 페이지에는 각 리포지토리의 기본 브랜치 데이터만 표시됩니다.

### 부분 및 다운스트림 파이프라인 보기

**Pipeline Executions** 페이지의 검색창에서 아래 필터를 사용할 수 있습니다.

`Downstream Pipeline`
: 가능한 값: `true`, `false`

`Manually Triggered`
: 가능한 값: `true`, `false`

`Partial Pipeline`
: 가능한 값: `retry`, `paused`, `resumed`

{{< img src="ci/partial_retries_search_tags.png" alt="The Pipeline executions page with Partial Pipeline:retry entered in the search query" style="width:100%;">}}

이러한 필터는 페이지 왼쪽의 패싯 패널을 통해서도 적용할 수 있습니다.
{{< img src="ci/partial_retries_facet_panel.png" alt="The facet panel with Partial Pipeline facet expanded and the value Retry selected, the Partial Retry facet expanded and the value true selected" style="width:40%;">}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://buildkite.com
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/ci/pipelines
[4]: https://app.datadoghq.com/ci/pipeline-executions
[5]: https://docs.datadoghq.com/ko/continuous_integration/pipelines/buildkite/#view-partial-and-downstream-pipelines
[6]: https://docs.datadoghq.com/ko/continuous_integration/pipelines/custom_tags_and_metrics/?tab=linux