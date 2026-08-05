---
aliases:
- /ko/tracing/trace_collection/admission_controller/
- /ko/tracing/trace_collection/library_injection_local/
- /ko/tracing/trace_collection/automatic_instrumentation/single-step-apm/
further_reading:
- link: /tracing/metrics/runtime_metrics/
  tag: 설명서
  text: 런타임 메트릭 활성화하기
- link: /tracing/guide/injectors
  tag: 설명서
  text: 단일 단계 계측에서의 인젝터 동작 이해하기
- link: /tracing/trace_collection/automatic_instrumentation/single-step-apm/troubleshooting/
  tag: 설명서
  text: 단일 단계 APM 문제 해결하기
- link: https://learn.datadoghq.com/courses/troubleshooting-apm-instrumentation-on-a-host
  tag: 학습 센터
  text: 호스트에서 APM 계측 문제 해결하기
- link: /tracing/guide/local_sdk_injection
  tag: 설명서
  text: 로컬 SDK 주입을 사용한 애플리케이션 계측
- link: https://www.datadoghq.com/blog/datadog-csi-driver/
  tag: 블로그
  text: Datadog의 CSI 드라이버로 보안 Kubernetes 환경에 고성능 관측 가능성 실현
- link: https://www.datadoghq.com/blog/rum-apm-single-step
  tag: 블로그
  text: 단일 명령으로 Java 앱에 대한 엔드투엔드 가시성 활성화
title: 단일 단계 APM 계측
---
## 개요 {#overview}

SSI(단일 단계 계측)는 추가 구성 없이 Datadog SDK를 자동으로 설치하여 온보딩 시간을 며칠에서 몇 분으로 단축합니다.

작동 방식에 대해 더 알아보려면 [단일 단계 계측을 위한 인젝터 가이드][8]를 참조하세요.

## 전제 조건 {#prerequisites}

1. 애플리케이션에서 사용자 정의 계측 코드를 제거하고 재시작하세요. 사용자 정의 계측이 감지되면 SSI는 자동으로 비활성화됩니다.
1. 지원되는 언어, 운영 체제 및 아키텍처에 대한 [SSI 호환성 가이드][18]를 검토하여 환경 호환성을 확인하세요.

## 애플리케이션 전반에 걸쳐 SDK 계측 {#instrument-sdks-across-applications}

**APM 계측**이 활성화된 상태에서 [Datadog Agent를 설치하거나 업데이트][1]하면, Agent는 지원되는 프로세스에 Datadog SDK를 로드하여 애플리케이션을 계측합니다. 이를 통해 코드 변경 없이 서비스에서 트레이스 데이터를 캡처하고 전송하여 분산 트레이싱을 할 수 있습니다.

계측 후 필요시 다음을 수행할 수 있습니다.
- [UST(Unified Service Tag) 구성][14]
- Continuous Profiler 또는 Application Security Monitoring과 같은 추가 SDK 종속 제품 및 기능을 활성화합니다.

다음 타일 중 하나를 클릭하여 배포 유형에 대한 SSI 설정 방법을 알아보세요.

{{< card-grid card_width="170px" image_width="200" >}}
  {{< image-card href="linux/" src="integrations_logos/linux.png" alt="linux" >}}
  {{< image-card href="docker/" src="integrations_logos/docker.png" alt="docker" >}}
  {{< image-card href="kubernetes/" src="integrations_logos/kubernetes.png" alt="kubernetes" >}}
  {{< image-card href="windows/" src="integrations_logos/windows.png" alt="windows" >}}
{{< /card-grid >}}

<br>

## 문제 해결 {#troubleshooting}

SSI를 사용한 APM 활성화와 관련한 문제가 발생하는 경우, [SSI 문제 해결 가이드][15]를 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /ko/tracing/metrics/runtime_metrics/
[3]: /ko/internal_developer_portal/catalog/
[4]: /ko/tracing/glossary/#instrumentation
[5]: /ko/containers/cluster_agent/admission_controller/
[6]: /ko/tracing/trace_collection/automatic_instrumentation/single-step-apm/compatibility
[7]: /ko/tracing/trace_collection/custom_instrumentation/
[8]: /ko/tracing/guide/injectors
[9]: /ko/tracing/trace_collection/automatic_instrumentation/single-step-apm/kubernetes/?tab=installingwithdatadogoperator#configure-instrumentation-for-namespaces-and-pods
[10]: /ko/tracing/trace_collection/library_config/
[11]: /ko/tracing/metrics/runtime_metrics/
[12]: /ko/internal_developer_portal/catalog/
[13]: /ko/tracing/glossary/#instrumentation
[14]: /ko/getting_started/tagging/unified_service_tagging
[15]: /ko/tracing/trace_collection/automatic_instrumentation/single-step-apm/troubleshooting
[16]: /ko/tracing/trace_collection/custom_instrumentation/
[17]: /ko/tracing/trace_collection/library_config/application_monitoring_yaml/
[18]: /ko/tracing/trace_collection/automatic_instrumentation/single-step-apm/compatibility/