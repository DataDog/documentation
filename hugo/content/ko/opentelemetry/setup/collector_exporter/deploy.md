---
aliases:
- /ko/opentelemetry/collector_exporter/deployment
further_reading:
- link: /opentelemetry/setup/collector_exporter/datadog_exporter/
  tag: 문서
  text: Datadog Exporter 및 Connector 구성
- link: https://opentelemetry.io/docs/collector/deployment/
  tag: 외부 사이트
  text: OpenTelemetry Collector 배포
- link: https://www.datadoghq.com/architecture/opentelemetry-collector-in-kubernetes/
  tag: 아키텍처 센터
  text: Kubernetes의 OpenTelemetry Collector
title: Datadog Exporter를 활용한 OpenTelemetry Collector 배포하기
---
이 페이지에서는 Datadog Exporter와 함께 OpenTelemetry Collector를 배포하는 다양한 옵션을 안내하며, 이를 통해 트레이스, 메트릭, 로그를 Datadog으로 전송할 수 있습니다.

## Collector 배포 {#deploy-the-collector}

OpenTelemetry Collector는 다양한 인프라 요구 사항에 맞춰 여러 환경에 배포할 수 있습니다. 이 섹션에서는 다음 배포 옵션을 다룹니다.

- [호스트](#on-a-host)
- [Docker](#docker)
- [Kubernetes](#kubernetes)

배포 방식에 따라 특정 기능 및 기능 범위가 달라질 수 있다는 점에 유의하세요. 이러한 차이점에 대한 자세한 내용은 [배포 기반 제한 사항](#deployment-based-limitations)을 참조하세요.

인프라에 가장 적합한 배포 옵션을 선택하고 다음 단계를 수행하세요.

### 호스트 {#on-a-host}

`--config` 파라미터를 사용하여 구성 파일을 지정하고 Collector를 실행하세요.

```shell
otelcontribcol_linux_amd64 --config collector.yaml
```

### Docker {#docker}

{{< tabs >}}
{{% tab "로컬호스트" %}}
OpenTelemetry Collector를 Docker 이미지로 실행하고 동일한 호스트에서 트레이스를 수신하려면 다음을 수행하세요.

1. 게시된 Docker 이미지(예: [`otel/opentelemetry-collector-contrib`][1])를 선택합니다.

2. OpenTelemetry 트레이스가 OpenTelemetry Collector로 전송되도록 컨테이너에서 열어야 할 포트를 결정합니다. 기본적으로 트레이스는 포트 4317의 gRPC를 통해 전송됩니다. gRPC를 사용하지 않는 경우 포트 4318을 사용하세요.

3. `collector.yaml` 파일을 사용하여 컨테이너를 실행하고 필요한 포트를 노출합니다. 예를 들어, 포트 4317을 사용하는 경우 다음과 같습니다.

   ```
   $ docker run \
       -p 4317:4317 \
       --hostname $(hostname) \
       -v $(pwd)/otel_collector_config.yaml:/etc/otelcol-contrib/config.yaml \
       otel/opentelemetry-collector-contrib
   ```


[1]: https://hub.docker.com/r/otel/opentelemetry-collector-contrib/tags
{{% /tab %}}
{{% tab "기타 컨테이너" %}}

OpenTelemetry Collector를 Docker 이미지로 실행하고 다른 컨테이너에서 트레이스를 수신하려면 다음 단계를 수행하세요.

1. Docker 네트워크를 생성합니다.

    ```
    docker network create <NETWORK_NAME>
    ```

2. OpenTelemetry Collector와 애플리케이션 컨테이너를 동일한 네트워크의 일부로 실행합니다.

   ```
   # Run the OpenTelemetry Collector
   docker run -d --name opentelemetry-collector \
       --network <NETWORK_NAME> \
       --hostname $(hostname) \
       -v $(pwd)/otel_collector_config.yaml:/etc/otelcol-contrib/config.yaml \
       otel/opentelemetry-collector-contrib
   ```

   애플리케이션 컨테이너를 실행할 때 환경 변수 `OTEL_EXPORTER_OTLP_ENDPOINT`가 OpenTelemetry Collector에 적절한 호스트 이름을 사용하도록 구성되었는지 확인합니다. 아래 예시에서는 `opentelemetry-collector`입니다.

   ```
   # Run the application container
   docker run -d --name app \
       --network <NETWORK_NAME> \
       --hostname $(hostname) \
       -e OTEL_EXPORTER_OTLP_ENDPOINT=http://opentelemetry-collector:4317 \
       company/app:latest
   ```

{{% /tab %}}
{{< /tabs >}}

### Kubernetes {#kubernetes}

{{< tabs >}}
{{% tab "DaemonSet" %}}

DaemonSet을 사용하는 것은 Kubernetes 환경에서 OpenTelemetry 수집을 구성하는 가장 일반적이고 권장되는 방법입니다. Kubernetes 인프라에 OpenTelemetry Collector와 Datadog Exporter를 배포하려면 다음 단계를 따르세요.

1. 애플리케이션 구성을 포함한 이 [예시 구성][1]을 사용하여 Datadog Exporter가 포함된 OpenTelemetry Collector를 DaemonSet으로 설정합니다.
2. DaemonSet에 필요한 포트가 노출되어 애플리케이션에서 액세스할 수 있는지 확인합니다. [예시][2]의 다음 구성 옵션에서 이러한 포트를 정의합니다.
   ```yaml
   # ...
        ports:
        - containerPort: 4318 # default port for OpenTelemetry HTTP receiver.
          hostPort: 4318
        - containerPort: 4317 # default port for OpenTelemetry gRPC receiver.
          hostPort: 4317
        - containerPort: 8888  # Default endpoint for querying Collector observability metrics.
   # ...
   ```
   <div class="alert alert-info">애플리케이션에 HTTP와 gRPC가 모두 필요하지 않은 경우 구성에서 사용하지 않는 포트를 제거하세요.</div>

1. Datadog 컨테이너 태깅에 사용되는 유용한 Kubernetes 속성을 수집하려면 [예시와 같이][3] 포드 IP를 리소스 속성으로 보고합니다.

   ```yaml
   # ...
           env:
           - name: POD_IP
             valueFrom:
               fieldRef:
                 fieldPath: status.podIP
           # The k8s.pod.ip is used to associate pods for k8sattributes
           - name: OTEL_RESOURCE_ATTRIBUTES
             value: "k8s.pod.ip=$(POD_IP)"
   # ...
   ```

   이렇게 하면 [config map][5]에서 사용되는 [Kubernetes Attributes Processor][4]가 트레이스에 첨부할 필수 메타데이터를 추출할 수 있습니다. 이 메타데이터에 액세스할 수 있도록 추가 [역할][6]을 설정해야 합니다. [예시][1]는 완전한 구성으로 바로 사용할 수 있으며 필요한 역할이 올바르게 설정되어 있습니다.
  
1. 올바른 OTLP 엔드포인트 호스트 이름을 사용하도록 [애플리케이션 컨테이너][7]를 구성합니다. OpenTelemetry Collector가 DaemonSet으로 실행되므로 현재 호스트를 대상으로 지정해야 합니다. [예시 차트][8]와 같이 애플리케이션 컨테이너의 `OTEL_EXPORTER_OTLP_ENDPOINT` 환경 변수를 적절히 설정합니다.

   ```yaml
   # ...
           env:
           - name: HOST_IP
             valueFrom:
               fieldRef:
                 fieldPath: status.hostIP
             # The application SDK must use this environment variable in order to successfully
             # connect to the DaemonSet's collector.
           - name: OTEL_EXPORTER_OTLP_ENDPOINT
             value: "http://$(HOST_IP):4318"
   # ...
   ```
   
  1. 정확한 호스트 정보를 확보할 수 있도록 호스트 메타데이터 수집을 구성합니다. 호스트 메타데이터를 수집하고 전달하도록 DaemonSet을 설정하세요.

     ```yaml
     processors:
       resourcedetection:
         detectors: [system, env]
       k8sattributes:
         # existing k8sattributes config
       transform:
         trace_statements:
           - context: resource
             statements:
               - set(attributes["datadog.host.use_as_metadata"], true)
     ...
     service:
       pipelines:
         traces:
           receivers: [otlp]
           processors: [resourcedetection, k8sattributes, transform, batch]
           exporters: [datadog]
     ```

   이 구성은 `resourcedetection` 프로세서를 사용하여 호스트 메타데이터를 수집하고, `k8sattributes` 프로세서로 Kubernetes 메타데이터를 추가하며, `datadog.host.use_as_metadata` 속성을 `true`로 설정합니다. 자세한 내용은 [OpenTelemetry 시맨틱 규칙을 Infrastructure List 호스트 정보에 매핑][9]을 참조하세요.


[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart
[2]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/daemonset.yaml#L33-L38
[3]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/daemonset.yaml#L48-L57
[4]: https://pkg.go.dev/github.com/open-telemetry/opentelemetry-collector-contrib/processor/k8sattributesprocessor#section-readme
[5]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/configmap.yaml
[6]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/roles.yaml
[7]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/deployment.yaml#L21-L22
[8]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/deployment.yaml#L32-L39
[9]: /ko/opentelemetry/schema_semantics/host_metadata/


{{% /tab %}}
{{% tab "Gateway" %}}

Kubernetes Gateway 배포에서 OpenTelemetry Collector와 Datadog Exporter를 배포하려면 다음 단계를 따르세요.

1. 애플리케이션 구성을 포함한 이 [예시 구성][1]을 사용하여 Datadog Exporter가 포함된 OpenTelemetry Collector를 DaemonSet으로 설정합니다.
2. DaemonSet에 필요한 포트가 노출되어 애플리케이션에서 액세스할 수 있는지 확인합니다. [예시][2]의 다음 구성 옵션에서 이러한 포트를 정의합니다.
   ```yaml
   # ...
        ports:
        - containerPort: 4318 # default port for OpenTelemetry HTTP receiver.
          hostPort: 4318
        - containerPort: 4317 # default port for OpenTelemetry gRPC receiver.
          hostPort: 4317
        - containerPort: 8888  # Default endpoint for querying Collector observability metrics.
   # ...
   ```
   <div class="alert alert-info">애플리케이션에 HTTP와 gRPC가 모두 필요하지 않은 경우 구성에서 사용하지 않는 포트를 제거하세요.</div>

1. Datadog 컨테이너 태깅에 사용되는 유용한 Kubernetes 속성을 수집하려면 [예시와 같이][3] 포드 IP를 리소스 속성으로 보고합니다.

   ```yaml
   # ...
           env:
           - name: POD_IP
             valueFrom:
               fieldRef:
                 fieldPath: status.podIP
           # The k8s.pod.ip is used to associate pods for k8sattributes
           - name: OTEL_RESOURCE_ATTRIBUTES
             value: "k8s.pod.ip=$(POD_IP)"
   # ...
   ```

   이렇게 하면 [config map][5]에서 사용되는 [Kubernetes Attributes Processor][4]가 트레이스에 첨부할 필수 메타데이터를 추출할 수 있습니다. 이 메타데이터에 액세스할 수 있도록 추가 [역할][6]을 설정해야 합니다. [예시][1]는 완전한 구성으로 바로 사용할 수 있으며 필요한 역할이 올바르게 설정되어 있습니다.
  
1. 올바른 OTLP 엔드포인트 호스트 이름을 사용하도록 [애플리케이션 컨테이너][7]를 구성합니다. OpenTelemetry Collector가 DaemonSet으로 실행되므로 현재 호스트를 대상으로 지정해야 합니다. [예시 차트][8]와 같이 애플리케이션 컨테이너의 `OTEL_EXPORTER_OTLP_ENDPOINT` 환경 변수를 적절히 설정합니다.

   ```yaml
   # ...
           env:
           - name: HOST_IP
             valueFrom:
               fieldRef:
                 fieldPath: status.hostIP
             # The application SDK must use this environment variable in order to successfully
             # connect to the DaemonSet's collector.
           - name: OTEL_EXPORTER_OTLP_ENDPOINT
             value: "http://$(HOST_IP):4318"
   # ...
   ```

1. DaemonSet을 변경하여 [현재 사용 중인][10] Datadog Exporter 대신 [OTLP 익스포터][9]를 포함합니다.

   ```yaml
   # ...
   exporters:
     otlp:
       endpoint: "<GATEWAY_HOSTNAME>:4317"
   # ...
   ```

1. 서비스 파이프라인이 [예시에 구성된][11] Datadog 익스포터 대신 이 익스포터를 사용하도록 합니다.

   ```yaml
   # ...
       service:
         pipelines:
           metrics:
             receivers: [hostmetrics, otlp]
             processors: [resourcedetection, k8sattributes, batch]
             exporters: [otlp]
           traces:
             receivers: [otlp]
             processors: [resourcedetection, k8sattributes, batch]
             exporters: [otlp]
   # ...
   ```

   이렇게 하면 각 Agent가 OTLP 프로토콜을 통해 데이터를 Collector Gateway로 전달합니다. 

1. `<GATEWAY_HOSTNAME>`을 OpenTelemetry Collector Gateway 주소로 바꿉니다.

1. [`k8sattributes` 프로세서][12]가 포드 IP를 Gateway Collector로 전달하여 메타데이터를 가져올 수 있도록 구성합니다.

   ```yaml
   # ...
   k8sattributes:
     passthrough: true
   # ...
   ```

   `passthrough` 옵션에 대한 자세한 내용은 [해당 문서][13]를 참조하세요.

1. Gateway Collector 구성에서 Agent의 OTLP 익스포터로 대체된 Datadog Exporter와 동일한 설정을 사용하도록 합니다. 예시(`<DD_SITE>`는 사용 중인 사이트이며 여기서는 {{< region-param key="dd_site" code="true" >}}입니다).

   ```yaml
   # ...
   exporters:
     datadog:
       api:
         site: <DD_SITE>
         key: ${env:DD_API_KEY}
   # ...
   ```
1. 호스트 메타데이터 수집 구성을 구성합니다.
   게이트웨이 배포에서는 Agent Collector에서 호스트 메타데이터를 수집하고 Gateway Collector에서 해당 메타데이터를 유지하도록 해야 합니다. 이렇게 하면 호스트 메타데이터가 Agent에서 수집되어 게이트웨이를 통해 Datadog으로 올바르게 전달됩니다.  
   자세한 내용은 [OpenTelemetry 시맨틱 규칙을 인프라 목록 호스트 정보에 매핑][14]을 참조하세요.

   **Agent Collector 구성**:

   ```yaml
   processors:
     resourcedetection:
       detectors: [system, env]
     k8sattributes:
       passthrough: true

   exporters:
     otlp:
       endpoint: "<GATEWAY_HOSTNAME>:4317"

   service:
     pipelines:
       traces:
         receivers: [otlp]
         processors: [resourcedetection, k8sattributes, transform, batch]
         exporters: [otlp]
   ```

   **Gateway Collector 구성**:

   ```yaml
   processors:
     k8sattributes:
       extract:
         metadata: [node.name, k8s.node.name]

   exporters:
     datadog:
       api:
         key: ${DD_API_KEY}
       hostname_source: resource_attribute

   service:
     pipelines:
       traces:
         receivers: [otlp]
         processors: [k8sattributes, batch]
         exporters: [datadog]
   ```

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart
[2]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/daemonset.yaml#L33-L38
[3]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/daemonset.yaml#L48-L57
[4]: https://pkg.go.dev/github.com/open-telemetry/opentelemetry-collector-contrib/processor/k8sattributesprocessor#section-readme
[5]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/configmap.yaml
[6]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/roles.yaml
[7]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/deployment.yaml#L21-L22
[8]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/deployment.yaml#L32-L39
[9]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/exporter/otlpexporter/README.md#otlp-grpc-exporter
[10]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/configmap.yaml#L56-L59
[11]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/configmap.yaml#L136-L148
[12]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/configmap.yaml#L69
[13]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/k8sattributesprocessor#as-a-gateway
[14]: /ko/opentelemetry/schema_semantics/host_metadata/

{{% /tab %}}
{{% tab "Operator" %}}

OpenTelemetry Operator를 사용하려면 [OpenTelemetry Operator 배포를 위한 공식 문서][1]를 따르세요. 해당 문서의 설명에 따라 Operator와 함께 인증서 관리자도 배포하세요.

다음 OpenTelemetry Collector 표준 Kubernetes 구성 중 하나를 사용하여 Operator를 구성하세요.
* [DaemonSet 배포][2] - 호스트 메트릭을 확실하게 수신하려면 DaemonSet 배포를 사용합니다. 
* [Gateway 배포][3]


[1]: https://github.com/open-telemetry/opentelemetry-operator#readme
[2]: /ko/opentelemetry/collector_exporter/deployment/?tab=daemonset#kubernetes
[3]: /ko/opentelemetry/collector_exporter/deployment/?tab=gateway#kubernetes
{{% /tab %}}

{{< /tabs >}}


## 호스트 이름 확인 {#hostname-resolution}

호스트 이름이 확인되는 방식을 이해하려면 [OpenTelemetry 시맨틱 규칙을 호스트 이름에 매핑][25]을 참조하세요.

## 배포 기반 제한 사항 {#deployment-based-limitations}

OpenTelemetry Collector에는 [두 가지 주요 배포 방법][20]인 Agent와 Gateway가 있습니다. 배포 방법에 따라 다음 구성 요소를 사용할 수 있습니다.

| 배포 모드 | 호스트 메트릭 | Kubernetes 오케스트레이션 메트릭 | 트레이스 | 로그 자동 수집 |
| --- | --- | --- | --- | --- |
| Gateway로 배포 | | {{< X >}} | {{< X >}} | |
| Agent로 배포 | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/datadogexporter
[2]: /ko/tracing/other_telemetry/connect_logs_and_traces/opentelemetry
[3]: https://github.com/open-telemetry/opentelemetry-collector-releases/releases/latest
[4]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/ootb-ec2.yaml
[5]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/
[18]: /ko/tracing/other_telemetry/connect_logs_and_traces/opentelemetry/?tab=python
[19]: https://opentelemetry.io/docs/reference/specification/resource/sdk/#sdk-provided-resource-attributes
[20]: https://opentelemetry.io/docs/collector/deployment/
[21]: https://app.datadoghq.com/integrations/otel
[22]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/hostmetricsreceiver
[23]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver
[24]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/dockerstatsreceiver
[25]: /ko/opentelemetry/schema_semantics/hostname/