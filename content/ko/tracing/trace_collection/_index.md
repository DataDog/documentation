---
aliases:
- /ko/tracing/setup
- /ko/tracing/send_traces/
- /ko/tracing/setup/
- /ko/tracing/environments/
- /ko/tracing/setup/environment
- /ko/tracing/setup/first_class_dimensions
- /ko/tracing/getting_further/first_class_dimensions/
- /ko/agent/apm/
- /ko/tracing/setup_overview/
- /ko/tracing/trace_collection/library_injection_remote
description: Datadog 애플리케이션 성능 모니터링(APM) 시작하기
further_reading:
- link: tracing/trace_collection/compatibility
  tag: 설명서
  text: 호환성 요구사항
title: 애플리케이션 계측
---

## 개요

다음 주요 단계에 따라 Datadog 애플리케이션 성능 모니터링(APM)을 시작합니다.

1. Datadog 에이전트를 설치 및 설정합니다.
2. 애플리케이션을 계측합니다.

<div class="alert alert-info"><strong>설정을 간소화해 보세요!</strong> <a href="https://docs.datadoghq.com/tracing/trace_collection/single-step-apm/">단일 단계 계측</a> 기능으로 한 번에 에이전트를 설치하고 애플리케이션을 계측하세요.</div>

애플리케이션을 계측하면 옵저빌리티 데이터를 에이전트로 전송할 수 있습니다. 에이전트는 데이터를 Datadog 백엔드로 전달하여 UI에 표시합니다.

{{< img src="tracing/visualization/troubleshooting_pipeline.png" alt="APM 파이프라인">}}

## 계측 유형

애플리케이션을 계측하는 두 가지 기본 접근 방식이 존재합니다. 자동 계측과 커스텀 계측입니다 {{< tooltip glossary="instrumentation" >}}.

### 자동 계측

최소한의 수동 단계를 통해 애플리케이션의 {{< tooltip glossary="span" >}}을 생성하세요. 자동으로 애플리케이션을 계측하려면 양 옵션 중 하나를 사용할 수 있습니다.

- [단일 단계 계측 (체험판)][7]: 한 줄 설치 명령을 실행하여 Datadog 에이전트를 설치하고 애플리케이션 성능 모니터링(APM) 을 활성화합니다. 아울러 Linux 호스트, VM 또는 컨테이너의 모든 서비스를 계측합니다.
- [Datadog 라이브러리][8]: Datadog 추적 라이브러리 을 애플리케이션에 추가합니다.

자세한 내용을 확인하려면 [자동 계측][5]을 참조하세요.

### 커스텀 계측

자동 계측으로 캡처되지 않는 사내 코드 또는 복잡한 함수에서 통합 옵저빌리티 데이터를 캡처합니다. 애플리케이션을 커스텀 계측하려면 다음 옵션 중 하나를 사용합니다.

- [Datadog 라이브러리][9]: Datadog 추적 라이브러리를 사용하여 Datadog 내에서 옵저빌리티를 추가 및 사용자 지정합니다.
- [OpenTelemetry API][10]: Datadog 라이브러리에서 OpenTelemetry API 지원을 사용하여 벤더 중립적 계측 코드를 생성합니다.

자세한 내용을 확인하려면 [커스텀 계측][6]을 참조하세요.

{{< callout url="https://www.datadoghq.com/product-preview/service-discovery/" btn_hidden="false" header="체험판에 서비스 검색이 있음">}}
서비스 검색을 이용하면 현재 애플리케이션 모니터링을 전체적으로 관측할 수 있고, 데이터 갭이나 시스템 트레이스 오류 등이 강조 표시되어 있어 편리합니다.
{{< /callout >}}


## 애플리케이션 성능 모니터링 설치 튜토리얼

다음 튜토리얼에서는 Datadog 추적 라이브러리를 사용한 자동 및 커스텀 계측으로 다양한 인프라스트럭처 시나리오에서 샘플 애플리케이션에 대한 분산 추적을 설정하는 방법을 알아봅니다.

{{< whatsnext desc="언어 및 환경 선택하기:" >}}
    {{< nextlink href="tracing/guide/tutorial-enable-python-host" >}}<img src="/images/integrations_logos/python-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" /> Datadog 에이전트와 동일한 호스트에서 파이썬(Python) 애플리케이션 트레이싱 활성화{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-python-containers" >}}<img src="/images/integrations_logos/python-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" /> 컨테이너의 파이썬(Python) 애플리케이션 및 Datadog 에이전트 트레이싱 활성화{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-python-container-agent-host" >}}<img src="/images/integrations_logos/python-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" /> 호스트의 컨테이너 및 애플리케이션의 파이썬(Python) 애플리케이션 트레이싱 활성화{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-host" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" /> Datadog 에이전트와 동일한 호스트에서 Java 애플리케이션 트레이싱 활성화{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-containers" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" /> 컨테이너의 Java 애플리케이션 및 Datadog 에이전트 트레이싱 활성화{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-container-agent-host" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" /> 호스트의 컨테이너 및 애플리케이션의 Java 애플리케이션 트레이싱 활성화{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-gke" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-gke-icon.png" /> GKE에서 Java 애플리케이션 트레이싱 활성화 {{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-aws-eks" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-eks-icon.png" /> AWS EKS에서 Java 애플리케이션 트레이싱 활성화{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-aws-ecs-ec2" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-ec2-icon.png" /> Amazon ECS에서 EC2로 Java 애플리케이션 트레이싱 활성화 {{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-aws-ecs-fargate" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-fargate-icon.png" /> Amazon ECS에서 Fargate로 Java 애플리케이션 트레이싱 활성화{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-admission-controller" >}}<img src="/images/integrations_logos/java-avatar.png" /> 어드미션 컨트롤러로 Java 애플리케이션 트레이싱 활성화{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-go-host" >}}<img src="/images/integrations_logos/golang-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" /> Datadog 에이전트와 동일한 호스트에서 Go 애플리케이션 트레이싱 활성화{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-go-containers" >}}<img src="/images/integrations_logos/golang-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" /> 컨테이너의 Datadog 에이전트 및 Go 애플리케이션 트레이싱 활성화{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-go-aws-ecs-ec2" >}}<img src="/images/integrations_logos/golang-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-ec2-icon.png" /> Amazon ECS에서 EC2로 Go 애플리케이션 트레이싱 활성화{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-go-aws-ecs-fargate" >}}<img src="/images/integrations_logos/golang-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-fargate-icon.png" /> Amazon ECS에서 Fargate로 Go 애플리케이션 트레이싱 활성화{{< /nextlink >}}

{{< /whatsnext >}}
## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/developers/community/libraries/#apm-tracing-client-libraries
[2]: /ko/tracing/trace_collection/library_injection_local/
[4]: /ko/tracing/trace_collection/dd_libraries/
[5]: /ko/tracing/trace_collection/automatic_instrumentation/
[6]: /ko/tracing/trace_collection/custom_instrumentation/
[7]: /ko/tracing/trace_collection/automatic_instrumentation/single-step-apm/
[8]: /ko/tracing/trace_collection/automatic_instrumentation/dd_libraries/
[9]: /ko/tracing/trace_collection/custom_instrumentation/dd_libraries/
[10]: /ko/tracing/trace_collection/custom_instrumentation/otel_instrumentation/