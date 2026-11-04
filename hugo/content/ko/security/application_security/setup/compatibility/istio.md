---
code_lang: istio
code_lang_weight: 40
title: Istio 호환성 요구 사항
type: multi-code-lang
---
다음 표에는 지정된 Datadog External Processor 이미지 버전에 따른 Istio 통합용 App and API Protection 기능이 나열되어 있습니다.

| App and API Protection 기능              | 최소 Datadog External Processor 이미지 버전  |
|------------------------------------------------|---------------------------------------------------|
| 위협 탐지                               | v1.71.0                                           |
| 위협 보호                              | v1.71.0                                           |
| 차단된 요청에 대한 응답 사용자 지정         | v1.71.0                                           |
| 비차단 비동기 모드(관측 가능성) | v2.1.0                                            |
| API Security                                   | v2.2.2                                            |
| 독립형 App and API Protection              | v2.2.2                                            |
| 자동 사용자 활동 이벤트 추적         | 지원되지 않음                                     |

### 본문 처리 지원 {#body-processing-support}

Datadog External Processor 서비스는 다음 페이로드 유형에 대한 요청 및 응답 본문 처리를 지원합니다.

| 페이로드 유형 | 최소 Datadog External Processor 이미지 버전  |
|--------------|---------------------------------------------------|
| JSON         | v2.2.2                                            |

## Istio 버전 지원 {#istio-version-support}

### 지원되는 Envoy 버전 {#supported-envoy-versions}

Istio의 데이터 플레인은 Envoy를 기반으로 합니다. 다음 표는 Istio 버전과 해당 Envoy 릴리스 브랜치 간의 관계를 보여줍니다.

| Istio 버전 | Envoy 릴리스 브랜치 |
|---------------|----------------------|
| 1.26.x        | release/v1.34        |
| 1.25.x        | release/v1.33        |
| 1.24.x        | release/v1.32        |

Istio와 Envoy 버전 간의 관계에 대한 자세한 내용은 [Istio 설명서][1]에서 확인할 수 있습니다.

### Envoy 버전 지원 {#envoy-version-support}

App and API Protection을 위한 Datadog Envoy 통합은 모든 Envoy 버전에 포함되어 있지 않을 수 있는 기능에 의존합니다. 다음 표는 각 Envoy 버전에서 지원하는 기능을 보여줍니다.

| 기능 | 최소 Envoy 버전 |
|---------|-----------------------|
| 외부 처리 필터 | v1.27.0 |
| Observability 모드 | v1.30.0 |

## Datadog Istio 통합 지원 {#datadog-istio-integration-support}

Linux 버전과 arm64 및 arm64 아키텍처만 지원됩니다.

<div class="alert alert-info">지원되지 않는 기능에 대한 지원이 추가되기를 원하시면
저희에게 알려주세요! 세부 정보를 보내려면 <a
href="https://forms.gle/gHrxGQMEnAobukfn7">이 간단한 양식을
작성하세요</a>.</div>

[1]: https://istio.io/latest/docs/releases/supported-releases/#supported-envoy-versions