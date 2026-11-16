---
code_lang: envoy-gateway
code_lang_weight: 40
title: Envoy Gateway 호환성 요구 사항
type: multi-code-lang
---
다음 표에는 지정된 Datadog External Processor 이미지 버전에 따른 Envoy Gateway 통합용 App and API Protection 기능이 나열되어 있습니다.

| App and API Protection 기능              | 최소 Datadog External Processor 이미지 버전  |
|------------------------------------------------|---------------------------------------------------|
| 위협 탐지                               | v2.4.0                                            |
| 위협 보호                              | v2.4.0                                            |
| 차단된 요청에 대한 응답 사용자 지정         | v2.4.0                                            |
| 비차단 비동기 모드(관측 가능성) | 지원되지 않음                                     |
| API Security                                   | v2.4.0                                            |
| 독립형 App and API Protection              | v2.4.0                                            |
| 자동 사용자 활동 이벤트 추적         | 지원되지 않음                                     |

### 본문 처리 지원 {#body-processing-support}

Datadog External Processor 서비스는 다음 페이로드 유형에 대한 요청 및 응답 본문 처리를 지원합니다.

| 페이로드 유형 | 최소 Datadog External Processor 이미지 버전  |
|--------------|---------------------------------------------------|
| JSON         | v2.4.0                                            |

## Envoy Gateway 버전 지원 {#envoy-gateway-version-support}

### 지원되는 Envoy Gateway 버전 {#supported-envoy-gateway-versions}

Envoy Gateway는 Envoy Proxy 및 Gateway API를 기반으로 하며 Kubernetes 클러스터 내에서 실행됩니다. Datadog은 EOL이 아닌 Envoy Gateway 버전만 지원합니다. 현재 지원되는 버전 및 업스트림 종속성(Envoy Proxy, Gateway API, Kubernetes)의 목록은 공식 [Envoy Gateway 호환성 매트릭스][1]를 참조하세요.


### Envoy 버전 지원 {#envoy-version-support}

App and API Protection을 위한 Datadog Envoy 통합은 모든 Envoy 버전에 포함되어 있지 않을 수 있는 기능에 의존합니다. 다음 표는 각 Envoy 버전에서 지원하는 기능을 보여줍니다.

| 기능 | 최소 Envoy 버전 |
|---------|-----------------------|
| 외부 처리 필터 | v1.27.0 |
| Observability 모드 | v1.30.0 |

## Datadog Envoy Gateway 통합 지원 {#datadog-envoy-gateway-integration-support}

Linux 버전과 amd64 및 arm64 아키텍처만 지원됩니다.

<div class="alert alert-info">지원되지 않는 기능에 대한 지원이 추가되기를 원하시면
저희에게 알려주세요! <a
href="https://forms.gle/gHrxGQMEnAobukfn7">이 짧은 양식을 작성하여 세부 정보를 보내주세요
</a>.</div>

[1]: https://gateway.envoyproxy.io/news/releases/matrix/