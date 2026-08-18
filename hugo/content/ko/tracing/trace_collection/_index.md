---
algolia:
  tags:
  - apm automatic instrumentation
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
- /ko/tracing/trace_collection/automatic_instrumentation
description: Datadog 애플리케이션 성능 모니터링(APM) 시작하기
further_reading:
- link: tracing/trace_collection/compatibility
  tag: 설명서
  text: 호환성 요구 사항
- link: /tracing/glossary/
  tag: 설명서
  text: APM 이용 약관
- link: https://www.datadoghq.com/blog/rum-apm-single-step
  tag: 블로그
  text: 명령 한 개로 Java 앱에 대한 종합적인 가시성 얻기
- link: https://www.datadoghq.com/architecture/instrument-your-app-using-the-datadog-operator-and-admission-controller/
  tag: 아키텍처 센터
  text: Datadog Operator 및 Admission Controller를 사용하여 애플리케이션 계측하기
title: 애플리케이션 계측
---
## 개요 {#overview}
애플리케이션 {{< tooltip glossary="계측" >}} (Datadog APM 사용)에는 다음이 포함됩니다.

1. **SDK 설정**: 애플리케이션에 Datadog SDK를 추가합니다.
2. **스팬 생성**: 관측성 데이터를 {{< tooltip glossary="스팬" >}}으로 캡처합니다.

   SDK가 로드되는 즉시 기본적으로 스팬이 자동 생성됩니다. 이를 **자동 계측**이라고 하며, 대부분의 사용자에게 충분한 가시성을 제공합니다. 더 많은 제어가 필요하면 선택적으로 사용자 지정 스팬을 추가할 수 있습니다.

**참고**: 이 단계는 트레이스를 수신하도록 [Datadog Agent][5]가 설치 및 구성되어 있다고 가정합니다.

{{< img src="tracing/visualization/troubleshooting_pipeline.png" alt="APM 파이프라인">}}

## 시작하기 {#getting-started}

<div class="alert alert-info">
<strong>공급업체 중립적인 계측을 선호하시나요?</strong> Datadog과 함께 OpenTelemetry를 사용하는 방법은 <a href="/opentelemetry/">OpenTelemetry 설명서</a>를 참조하세요.
</div>

### 단일 단계 계측(권장) {#single-step-instrumentation-recommended}

[단일 단계 계측][1](SSI)은 단일 명령으로 Datadog SDK를 자동 설치 및 구성합니다. 그 후 자동 계측이 즉시 지원되는 프레임워크와 라이브러리에서 트레이스를 수집하기 시작하며, 코드 변경은 필요하지 않습니다.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/tracing/trace_collection/single-step-apm/" >}}단일 단계 계측 시작하기{{< /nextlink >}}
{{< /whatsnext >}}

### 수동 설정 및 사용자 지정 스팬 {#manual-setup-and-custom-spans}

관측성 요구가 증가함에 따라 더 많은 제어와 사용자 지정을 추가할 수 있습니다.

**SDK 구성을 완전히 제어하려는 경우:** SDK 동작 및 구성에 대한 세부적인 제어가 필요한 경우 [수동으로 관리되는 Datadog SDK][2]를 사용합니다.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/tracing/trace_collection/dd_libraries/" >}}수동으로 관리되는 Datadog SDK 사용{{< /nextlink >}}
{{< /whatsnext >}}

**코드 변경 없이 사용자 지정 스팬을 추가하려는 경우:** 애플리케이션을 재배포하지 않고 Datadog UI에서 사용자 지정 스팬을 생성하려면 [Dynamic Instrumentation][4]을 사용합니다.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/tracing/trace_collection/dynamic_instrumentation/" >}}Dynamic Instrumentation으로 사용자 지정 스팬 추가{{< /nextlink >}}
{{< /whatsnext >}}

**코드에서 사용자 지정 스팬을 추가하려는 경우:** [코드 기반 사용자 지정 계측][3]을 추가하여 사용자 지정 비즈니스 로직을 계측하거나 애플리케이션별 메타데이터를 스팬에 추가합니다.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/tracing/trace_collection/custom_instrumentation/" >}}코드 기반 계측으로 사용자 지정 스팬 추가{{< /nextlink >}}
{{< /whatsnext >}}

이 옵션들은 함께 사용할 수 있습니다. 예를 들어 단일 단계 계측으로 시작한 후 특정 스팬에 대해 코드 기반 사용자 지정 계측을 추가하거나, 수동으로 관리되는 SDK와 Dynamic Instrumentation을 함께 사용하여 재배포 없이 스팬을 추가할 수 있습니다.

## 상세 비교 {#detailed-comparison}

### SDK 설정 {#sdk-setup}

단일 단계 계측은 대부분의 사용자에게 권장되는 시작 방법입니다. SDK 구성에 대해 더 많은 제어가 필요하면 대신 수동으로 관리되는 SDK를 사용할 수 있습니다.

<table style="width:100%; border-collapse:collapse; border:2px solid #999;">
  <tr style="background-color:#f2f2f2;">
    <th style="border:1px solid #ccc;"></th>
    <th style="border:1px solid #ccc; font-weight:bold;"><a href="/tracing/trace_collection/single-step-apm/">단일 단계 계측</a>(권장)</th>
    <th style="border:1px solid #ccc; font-weight:bold;"><a href="/tracing/trace_collection/dd_libraries/">수동으로 관리되는 SDK</a></th>
  </tr>
  <tr>
    <td style="border:1px solid #ccc; font-weight:bold;">작동 방식</td>
    <td style="border:1px solid #ccc;">Datadog이 단일 명령으로 런타임에 애플리케이션 프로세스에 SDK를 자동 설치하고 로드합니다.</td>
    <td style="border:1px solid #ccc;">애플리케이션 코드 또는 빌드 프로세스에 SDK를 직접 설치하고 구성합니다.</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc; font-weight:bold;">코드 변경 필요 여부</td>
    <td style="border:1px solid #ccc;">아니요</td>
    <td style="border:1px solid #ccc;">예</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc; font-weight:bold;">설정 복잡도</td>
    <td style="border:1px solid #ccc;">낮음 - 최소한의 구성만 필요</td>
    <td style="border:1px solid #ccc;">중간 - 환경 및 빌드 구성 필요</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc; font-weight:bold;">구성 제어</td>
    <td style="border:1px solid #ccc;">선택적 재정의를 지원하는 표준 기본값</td>
    <td style="border:1px solid #ccc;">환경 변수와 코드를 통한 완전한 제어</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc; font-weight:bold;">사용 시점</td>
    <td style="border:1px solid #ccc;">코드 변경 없이 서비스 전반에 걸쳐 빠르고 일관된 계측을 시작할 때</td>
    <td style="border:1px solid #ccc;">SDK 동작 및 구성에 대한 세부적인 제어가 필요할 때</td>
  </tr>
</table>

### 스팬 사용자 지정 {#span-customization}

자동 계측은 지원되는 프레임워크와 라이브러리에 대해 자동으로 스팬을 생성하여 추가 작업 없이 필수적인 관측성을 제공합니다. 사용자 지정 코드 경로에 대한 가시성이 필요하거나 애플리케이션별 데이터로 트레이스를 보강하려는 경우 Dynamic Instrumentation 또는 코드 기반 사용자 지정 계측을 사용하여 사용자 지정 스팬을 추가할 수 있습니다.

<table style="width:100%; border-collapse:collapse; border:2px solid #999;">
  <tr style="background-color:#f2f2f2;">
    <th style="border:1px solid #ccc;"></th>
    <th style="border:1px solid #ccc; font-weight:bold;"><a href="/tracing/trace_collection/dynamic_instrumentation/">Dynamic Instrumentation</a></th>
    <th style="border:1px solid #ccc; font-weight:bold;"><a href="/tracing/trace_collection/custom_instrumentation/">코드 기반 사용자 지정 계측</a></th>
  </tr>
  <tr>
    <td style="border:1px solid #ccc; font-weight:bold;">작동 방식</td>
    <td style="border:1px solid #ccc;">Datadog UI에서 계측 규칙을 구성하며, 규칙은 런타임에 적용됩니다.</td>
    <td style="border:1px solid #ccc;">애플리케이션 코드에 명시적인 트레이싱 API 호출을 추가합니다.</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc; font-weight:bold;">코드 변경 필요 여부</td>
    <td style="border:1px solid #ccc;">아니요</td>
    <td style="border:1px solid #ccc;">예</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc; font-weight:bold;">배포 필요 여부</td>
    <td style="border:1px solid #ccc;">아니요</td>
    <td style="border:1px solid #ccc;">예(스팬 추가 또는 수정 시)</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc; font-weight:bold;">사용 시점</td>
    <td style="border:1px solid #ccc;">코드 변경이나 재배포 없이 사용자 지정 스팬을 추가할 때</td>
    <td style="border:1px solid #ccc;">복잡한 계측 로직이 필요하거나 스팬을 코드에 영구적으로 정의하려는 경우</td>
  </tr>
</table>

## APM 설정 튜토리얼 {#apm-setup-tutorials}

다음 튜토리얼은 자동 계측과 사용자 지정 계측을 모두 사용하여 다양한 인프라 시나리오에서 샘플 애플리케이션에 대한 분산 트레이싱 설정 과정을 안내합니다.

{{< whatsnext desc="언어 및 환경 선택:" >}}
    {{< nextlink href="tracing/guide/tutorial-enable-python-host" >}}<img src="/images/integrations_logos/python-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" /> Datadog Agent와 동일한 호스트에서 Python 애플리케이션에 대한 트레이싱 활성화{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-python-containers" >}}<img src="/images/integrations_logos/python-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" /> 컨테이너에서 Python 애플리케이션 및 Datadog Agent에 대한 트레이싱 활성화{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-python-container-agent-host" >}}<img src="/images/integrations_logos/python-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" /> 컨테이너의 Python 애플리케이션과 호스트의 Agent에 대한 트레이싱 활성화{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-host" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" /> Datadog Agent와 동일한 호스트에서 Java 애플리케이션에 대한 트레이싱 활성화{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-containers" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" /> 컨테이너에서 Java 애플리케이션 및 Datadog Agent에 대한 트레이싱 활성화{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-container-agent-host" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" /> 컨테이너의 Java 애플리케이션과 호스트의 Agent에 대한 트레이싱 활성화{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-gke" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-gke-icon.png" /> GKE에서 Java 애플리케이션에 대한 트레이싱 활성화{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-aws-eks" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-eks-icon.png" /> Amazon EKS에서 Java 애플리케이션에 대한 트레이싱 활성화{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-aws-ecs-ec2" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-ec2-icon.png" /> EC2 기반 Amazon ECS에서 Java 애플리케이션에 대한 트레이싱 활성화{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-aws-ecs-fargate" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-fargate-icon.png" /> Fargate 기반 Amazon ECS에서 Java 애플리케이션에 대한 트레이싱 활성화{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-admission-controller" >}}<img src="/images/integrations_logos/java-avatar.png" /> Admission Controller를 사용하여 Java 애플리케이션에 대한 트레이싱 활성화{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-go-host" >}}<img src="/images/integrations_logos/golang-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" /> Datadog Agent와 동일한 호스트에서 Go 애플리케이션에 대한 트레이싱 활성화{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-go-containers" >}}<img src="/images/integrations_logos/golang-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" /> 컨테이너에서 Go 애플리케이션 및 Datadog Agent에 대한 트레이싱 활성화{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-go-aws-ecs-ec2" >}}<img src="/images/integrations_logos/golang-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-ec2-icon.png" /> EC2 기반 Amazon ECS에서 Go 애플리케이션에 대한 트레이싱 활성화{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-go-aws-ecs-fargate" >}}<img src="/images/integrations_logos/golang-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-fargate-icon.png" /> Fargate 기반 Amazon ECS에서 Go 애플리케이션에 대한 트레이싱 활성화{{< /nextlink >}}

{{< /whatsnext >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/trace_collection/single-step-apm/
[2]: /ko/tracing/trace_collection/dd_libraries/
[3]: /ko/tracing/trace_collection/custom_instrumentation/
[4]: /ko/tracing/trace_collection/dynamic_instrumentation/
[5]: /ko/agent/