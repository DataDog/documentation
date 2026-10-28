---
aliases:
- /ko/security/application_security/threats/setup/threat_detection/envoy
- /ko/security/application_security/threats_detection/envoy
- /ko/security/application_security/setup/threat_detection/envoy
- /ko/security/application_security/setup/standalone/envoy
code_lang: envoy
code_lang_weight: 50
further_reading:
- link: https://github.com/DataDog/dd-trace-go/tree/main/contrib/envoyproxy/go-control-plane/cmd/serviceextensions
  tag: 소스 코드
  text: Envoy 통합의 소스 코드
- link: /security/default_rules/?category=cat-application-security
  tag: 설명서
  text: OOTB App and API Protection 규칙
- link: /security/application_security/troubleshooting
  tag: 설명서
  text: App and API Protection 트러블슈팅
title: Envoy용 App and API Protection 활성화
---
Envoy 프록시에 대해 App and API Protection을 활성화할 수 있습니다. Datadog Envoy 통합은 위협 탐지 및 차단을 지원합니다.

## 전제 조건 {#prerequisites}

- [Datadog Agent][1]는 애플리케이션의 운영 체제나 컨테이너, 클라우드 또는 가상 환경에 맞게 설치 및 설정됩니다.
- [Remote Configuration][2]을 사용하여 Datadog UI에서 공격자를 차단하도록 Agent를 구성하십시오.

## 위협 탐지 활성화 {#enabling-threat-detection}
### 시작하기 {#get-started}

App and API Protection Envoy 통합은 Envoy 외부 처리 필터를 사용합니다.

1. Datadog External Processor Docker 이미지를 사용하여 새 컨테이너를 배포하십시오. 이 이미지는 [Datadog GitHub Registry][5]에서 사용할 수 있습니다.

   이 서비스는 Envoy가 App and API Protection을 통해 요청 및 응답을 분석하도록 통신하는 gRPC 서버입니다.

   Datadog External Processor는 다음과 같은 설정을 제공합니다:
   | 환경 변수                      | 기본값       | 설명                                                                                                                              |
   |-------------------------------------------|---------------------|------------------------------------------------------------------------------------------------------------------------------------------|
   | `DD_SERVICE_EXTENSION_HOST`               | `0.0.0.0`           | gRPC 서버 수신 주소입니다.                                                                                                           |
   | `DD_SERVICE_EXTENSION_PORT`               | `443`               | gRPC 서버 포트입니다.                                                                                                                        |
   | `DD_SERVICE_EXTENSION_HEALTHCHECK_PORT`   | `80`                | 서비스 상태 점검을 위한 HTTP 서버 포트입니다.                                                                                                      |
   | `DD_APPSEC_BODY_PARSING_SIZE_LIMIT`       | `0`                 | 처리할 본문의 최대 크기(바이트)입니다. `0`로 설정하면 본문이 처리되지 않습니다. 권장 값은 `10000000` (10MB)입니다. (본문 처리를 완전히 활성화하려면 외부 처리 필터 구성에서 `allow_mode_override` 옵션도 설정해야 합니다) |
   | `DD_SERVICE_EXTENSION_OBSERVABILITY_MODE` | `false`             | 비동기 분석을 활성화합니다. 또한 차단 기능을 비활성화합니다. (관측 가능성 모드를 완전히 활성화하려면 이 옵션을 외부 처리 필터 구성에서도 설정해야 합니다) |
   | `DD_SERVICE`                              | `serviceextensions` | Datadog UI에 표시되는 서비스 이름입니다.                                                                                                    |

   다음 환경 변수를 사용하여 외부 프로세서에서 트레이스를 수신하도록 Datadog Agent를 구성하세요:

   | 환경 변수                   | 기본값 | 설명                                                                      |
   |----------------------------------------|---------------|----------------------------------------------------------------------------------|
   | `DD_AGENT_HOST`                        | `localhost`   | Datadog Agent의 호스트 이름 또는 IP입니다.                                            |
   | `DD_TRACE_AGENT_PORT`                  | `8126`        | 트레이스 수집용 Datadog Agent 포트입니다.                                  |

2. Envoy 구성을 업데이트하여 [외부 처리 필터][3]를 `http_filters` 목록에 추가하고 `clusters` 섹션에 해당 gRPC 클러스터를 정의하세요. 예를 들면 다음과 같습니다.

#### Http 필터 섹션

   ```yaml
   http_filters:
     # This filter should be the first filter in the filter chain
     - name: envoy.filters.http.ext_proc
       typed_config:
         "@type": type.googleapis.com/envoy.extensions.filters.http.ext_proc.v3.ExternalProcessor
         grpc_service:
           envoy_grpc:
             cluster_name: datadog_aap_ext_proc_cluster

           ## Mandatory: Correctly show the service as an Envoy proxy in the UI.
           initial_metadata:
             - key: x-datadog-envoy-integration
               value: '1'

           ## A timeout configuration for the grpc connection exist but is not useful in our case.
           ## This timeout is for all the request lifetime. A timeout on the route is preferred.
           #timeout: 0s

         ## Optional: Enable fail open mode. Default is false.
         ## Normally, if the external processor fails or times out, the filter fails and Envoy
         ## returns a 5xx error to the downstream client. Setting this to true allows requests
         ## to continue without error if a failure occurs.
         failure_mode_allow: true # It won't cause 5xx error if an error occurs.

         ## Mandatory: Only enable the request and response header modes.
         ## If you want to enable body processing, please see the section below.
         processing_mode:
           request_header_mode: SEND
           response_header_mode: SEND

         ## Optional for headers analysis only but **mandatory** for body processing.
         ## The external processor can dynamically override the processing mode as needed instructing
         ## Envoy to forward request and response bodies to the external processor. Body processing is
         ## enabled when DD_APPSEC_BODY_PARSING_SIZE_LIMIT is set on the external processor container.
         allow_mode_override: true

         ## Optional: Set a timeout by processing message. Default is 200ms.
         ## There is a maxium of 2 messages per requests with headers only and 4 messages maximum
         ## with body processing enabled.
         ## Note: This timeout also includes the data communication between Envoy and the external processor.
         ## Optional: When the body processing is enabled, the timeout should be adjusted to accommodate
         ## the additional possible processing time. Larger payloads will require a longer timeout. 
         #message_timeout: 200ms

         ## Optional: Enable asynchronous mode analysis. Default is false.
         ## This mode will disable all blocking capabilities. The external processor should also be
         ## configured with the DD_SERVICE_EXTENSION_OBSERVABILITY_MODE environment variable.
         ## Beware, there is no flow control implemented in Envoy
         ## (cf https://www.envoyproxy.io/docs/envoy/latest/api-v3/extensions/filters/http/ext_proc/v3/ext_proc.proto#envoy-v3-api-field-extensions-filters-http-ext-proc-v3-externalprocessor-observability-mode)
         #observability_mode: true
         ## Optional: When in asynchronous mode, the message_timeout is not used. This deferred
         ## timeout starts when the http request is finished, to let the External Processor
         ## process all processing messages. Default is 5s.
         #deferred_close_timeout: 5s

     # ... other filters
   ```

#### 클러스터 섹션

   ```yaml
   clusters:
       # ... other clusters
       - name: datadog_aap_ext_proc_cluster
         type: STRICT_DNS
         lb_policy: ROUND_ROBIN
         http2_protocol_options: {}
         transport_socket:
           name: envoy.transport_sockets.tls
           typed_config:
             "@type": type.googleapis.com/envoy.extensions.transport_sockets.tls.v3.UpstreamTlsContext
             sni: "localhost"
         load_assignment:
           cluster_name: datadog_aap_ext_proc_cluster
           endpoints:
             - lb_endpoints:
                 - endpoint:
                     address:
                       socket_address:
                         address: 12.0.0.1 # Replace with the host address of the Datadog External Processor docker image (configured in the next step)
                         port_value: 443
   ```

   **참고**: 제공된 예제 구성을 주의 깊게 읽고 인프라 및 환경에 맞게 조정하십시오. [Envoy 외부 프로세서 문서][4]에서 더 많은 구성 옵션을 찾을 수 있습니다.

3. 검증.

{{% appsec-getstarted-2-plusrisk %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="Signals 탐색기 및 세부 정보, Vulnerabilities 탐색기 및 세부 정보를 보여주는 동영상입니다." video="true" >}}

## Datadog Go Tracer 및 Envoy 통합 {#datadog-go-tracer-and-envoy-integration}

외부 프로세서는 [Datadog Go Tracer][6]를 기반으로 구축되었으며 트레이서의 모든 환경 변수를 상속합니다. [Go SDK 구성][7] 및 [앱 및 API 보호 라이브러리 구성][8]을 참조하세요.

<div class="alert alert-info">
  <strong>참고: </strong>Datadog 외부 프로세서는 Datadog Go Tracer를 기반으로 구축되었으므로 일반적으로 트레이서와 동일한 릴리스 프로세스를 따르며, Docker 이미지는 해당 트레이서 버전으로 태그가 지정됩니다(예:). <code>v2.2.2</code>). 경우에 따라 공식 트레이서 릴리스 사이에 초기 릴리스 버전이 게시될 수 있으며, 이러한 이미지에는 다음과 같은 접미사가 태그로 지정됩니다. <code>-docker.1</code>.
</div>

## 제한 사항 {#limitations}

Envoy 통합에는 다음과 같은 제한 사항이 있습니다.

* Datadog 외부 프로세서 이미지 버전 `v2.2.2` 이상을 사용하는 경우 요청 및 응답 본문 검사가 지원됩니다.

Envoy 통합 호환성에 대한 자세한 내용은 [Envoy 통합 호환성 페이지][9]를 참조하십시오.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent
[2]: /ko/tracing/guide/remote_config
[3]: https://www.envoyproxy.io/docs/envoy/latest/configuration/http/http_filters/ext_proc_filter
[4]: https://www.envoyproxy.io/docs/envoy/latest/api-v3/extensions/filters/http/ext_proc/v3/ext_proc.proto
[5]: https://github.com/DataDog/dd-trace-go/pkgs/container/dd-trace-go%2Fservice-extensions-callout
[6]: https://github.com/DataDog/dd-trace-go
[7]: /ko/tracing/trace_collection/library_config/go/
[8]: /ko/security/application_security/policies/library_configuration/
[9]: /ko/security/application_security/setup/compatibility/envoy