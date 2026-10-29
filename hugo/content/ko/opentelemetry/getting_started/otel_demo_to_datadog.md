---
algolia:
  tags:
  - opentelemetry
  - open telemetry
  - otel
  - opentelemetry demo
aliases:
- /ko/opentelemetry/guide/otel_demo_to_datadog
- /ko/opentelemetry/otel_demo_to_datadog
further_reading:
- link: /internal_developer_portal/catalog/
  tag: 설명서
  text: Catalog
- link: /tracing/trace_explorer/
  tag: 설명서
  text: Trace Explorer
- link: /tracing/trace_explorer/trace_queries/
  tag: 설명서
  text: 트레이스 쿼리
- link: /error_tracking/
  tag: 설명서
  text: Error Tracking
title: OpenTelemetry 데모에서 Datadog으로 데이터 전송
---
## 개요 {#overview}

<div class="alert alert-info">이 튜토리얼은 Datadog Exporter와 Datadog Connector를 사용합니다. 새 컬렉터 구성의 경우, Datadog은 <a href="/opentelemetry/setup/collector_exporter/">OpenTelemetry 컬렉터 설정</a>의 OTLP 파이프라인을 권장합니다.</div>

[OpenTelemetry Demo][1]는 커뮤니티에서 개발한 마이크로서비스 데모 애플리케이션으로, OpenTelemetry(OTel)
계측 및 관측 가능성 기능을 시연합니다. 이는 HTTP와 gRPC를 통해 서로 통신하는 여러 마이크로서비스로 구성된 전자상거래 웹 페이지입니다. 모든 서비스는 OpenTelemetry로 계측되며 트레이스, 메트릭 및 로그를 생성합니다.

이 페이지에서는 OpenTelemetry 데모를 배포하고 해당 데이터를 Datadog으로 전송하는 데 필요한 단계를 안내합니다.

## 전제 조건 {#prerequisites}

이 가이드를 완료하려면 다음 사항이 준비되어 있는지 확인하세요.

1. 계정이 없는 경우 [Datadog 계정을 생성][2]하세요.
2. [Datadog API 키][3]를 찾거나 생성합니다.
3. 애플리케이션을 위한 여유 RAM 6GB

Docker 또는 Kubernetes(Helm 사용)를 사용하여 데모를 배포할 수 있습니다. 선호하는 배포 방법을 선택하고 필요한 도구가 설치되어 있는지 확인하세요.

{{< tabs >}}
{{% tab "Docker" %}}

- Docker
- Docker Compose v2.0.0+
- Make(선택 사항)

{{% /tab %}}

{{% tab "Kubernetes" %}}

- Kubernetes 1.24+
- Helm 3.9+
- kubectl이 연결되도록 구성된 활성 Kubernetes 클러스터

{{% /tab %}}
{{< /tabs >}}

## 데모 구성 및 배포 {#configuring-and-deploying-the-demo}

### 리포지토리 복제 {#cloning-the-repository}

`opentelemetry-demo` 리포지토리를 장치에 복제합니다.

```shell
git clone https://github.com/open-telemetry/opentelemetry-demo.git
```

### OpenTelemetry 컬렉터 구성 {#configuring-the-opentelemetry-collector}

데모의 텔레메트리 데이터를 Datadog으로 보내려면 OpenTelemetry 컬렉터 구성에 다음 구성 요소를 추가해야 합니다.

- `Resource Processor`는 `optional`이지만 `deployment.environment.name` 리소스 속성을 설정하는 데 사용되는 권장 구성 요소이며, Datadog은 이를 `env` 태그로 매핑합니다.
- `Datadog Connector` 는 Datadog APM 트레이스 메트릭을 계산합니다.
- `Datadog Exporter` 는 트레이스, 메트릭 및 로그를 Datadog으로 내보냅니다.
- `Datadog Extension` 은 인프라 모니터링 내에서 OpenTelemetry 컬렉터 구성을 조회할 수 있게 해주는 `optional` 구성 요소입니다. (자세한 내용은 [Datadog Extension][13]을 참조하세요.)

이 구성 요소들을 구성하려면 다음 단계를 따르세요.

{{< tabs >}}
{{% tab "Docker" %}}

1. 데모 리포지토리를 엽니다. 루트 폴더에 `docker-compose.override.yml`이라는 파일을 만듭니다.

2. 생성된 파일을 엽니다. 다음 내용을 붙여넣고 [Datadog 사이트][7] 및 [Datadog API 키][8] 환경 변수를 설정합니다.

    ```yaml
    services:
      otel-collector:
        command:
          - "--config=/etc/otelcol-config.yml"
          - "--config=/etc/otelcol-config-extras.yml"
          - "--feature-gates=datadog.EnableOperationAndResourceNameV2"
        environment:
          - DD_SITE_PARAMETER=<Your API Site>
          - DD_API_KEY=<Your API Key>
    ```

3. OpenTelemetry 컬렉터를 구성하려면 `src/otel-collector/otelcol-config-extras.yml`을 열고 파일에 다음을 추가합니다.

    ```yaml
    extensions:
      datadog/extension:
        api:
          site: ${env:DD_SITE_PARAMETER}
          key: ${env:DD_API_KEY}
        http:
          endpoint: "localhost:9875"
          path: "/metadata"

    exporters:
      datadog:
        traces:
          compute_stats_by_span_kind: true
          trace_buffer: 500
        api:
          site: ${env:DD_SITE_PARAMETER}
          key: ${env:DD_API_KEY}
        sending_queue:
          batch:
            min_size: 10
            max_size: 100
            flush_timeout: 10s

    processors:
      resource:
        attributes:
          - key: deployment.environment.name
            value: "otel"
            action: upsert

    connectors:
      datadog/connector:
        traces:
          compute_stats_by_span_kind: true

    service:
      extensions: [datadog/extension]
      pipelines:
        traces:
          receivers: [otlp]
          processors: [resourcedetection, memory_limiter, resource, transform/sanitize_spans]
          exporters: [otlp_grpc/jaeger, debug, spanmetrics, datadog, datadog/connector]
        metrics:
          receivers: [datadog/connector, docker_stats, httpcheck/frontend-proxy, hostmetrics, nginx, otlp, postgresql, redis, spanmetrics]
          processors: [resourcedetection, memory_limiter, resource]
          exporters: [otlp_http/prometheus, debug, datadog]
        logs:
          receivers: [otlp]
          processors: [resourcedetection, memory_limiter, resource]
          exporters: [opensearch, debug, datadog]
    ```

    By default, the collector in the demo application merges the configuration from two files:

    - `src/otel-collector/otelcol-config.yml`: contains the default configuration for the collector.
    - `src/otel-collector/otelcol-config-extras.yml`: used to add extra configuration to the collector.

    <div class="alert alert-info">
    YAML 값을 병합할 때 객체는 병합되고 배열은 대체됩니다.
    그렇기 때문에 실제로 구성된 것보다 파이프라인에 더 많은 구성 요소가 지정되어 있습니다.
    이전 구성은 메인에 구성된 값을 대체하지 않습니다 <code>otelcol-config</code> 파일에서 제거합니다.
    </div>

[7]: /ko/getting_started/site/
[8]: https://app.datadoghq.com/organization-settings/api-keys/

{{% /tab %}}

{{% tab "Kubernetes" %}}

1. Datadog 사이트 및 Datadog API 키 보안 정보를 저장할 `dd-secrets`라는 Secret을 생성합니다.

    ```shell
    kubectl create secret generic dd-secrets --from-literal="DD_SITE_PARAMETER=<Your API Site>" --from-literal="DD_API_KEY=<Your API Key>"
    ```

2. OpenTelemetry [Helm 차트][4]를 리포지토리에 추가하여 OpenTelemetry 데모를 관리하고 배포합니다.

    ```shell
    helm repo add open-telemetry https://open-telemetry.github.io/opentelemetry-helm-charts
    ```

3. 다음 내용을 사용하여 `my-values-file.yml`이라는 파일을 생성합니다.

    ```yaml
    opentelemetry-collector:
      extraEnvsFrom:
        - secretRef:
            name: dd-secrets
      config:
        extensions:
          datadog/extension:
            api:
              site: ${env:DD_SITE_PARAMETER}
              key: ${env:DD_API_KEY}
            http:
              endpoint: "localhost:9875"
              path: "/metadata"
        exporters:
          datadog:
            traces:
              compute_stats_by_span_kind: true
              trace_buffer: 500
            hostname: "otelcol-helm"
            api:
              site: ${env:DD_SITE_PARAMETER}
              key: ${env:DD_API_KEY}
            sending_queue:
              batch:
                min_size: 10
                max_size: 100
                flush_timeout: 10s

        processors:
          resource:
            attributes:
              - key: deployment.environment.name
                value: "otel"
                action: upsert

        connectors:
          datadog/connector:
            traces:
              compute_stats_by_span_kind: true

        service:
          extensions: [health_check, datadog/extension]
          pipelines:
            traces:
              processors: [memory_limiter, resource, resourcedetection, transform]
              exporters: [otlp/jaeger, debug, spanmetrics, datadog, datadog/connector]
            metrics:
              receivers: [datadog/connector, otlp, spanmetrics]
              processors: [memory_limiter, resource, resourcedetection, transform]
              exporters: [otlphttp/prometheus, debug, datadog]
            logs:
              processors: [memory_limiter, resource, resourcedetection, transform]
              exporters: [opensearch, debug, datadog]
    ```

    <div class="alert alert-info">
    YAML 값을 병합할 때 객체는 병합되고 배열은 대체됩니다.
    그렇기 때문에 실제로 구성된 것보다 파이프라인에 더 많은 구성 요소가 지정되어 있습니다.
    이전 구성은 메인에 구성된 값을 대체하지 않습니다 <code>otelcol-config</code> 파일에서 제거합니다.
    </div>

[4]: https://opentelemetry.io/docs/demo/kubernetes-deployment/

{{% /tab %}}
{{< /tabs >}}

### 데모 실행 {#running-the-demo}

{{< tabs >}}
{{% tab "Docker" %}}

make가 설치되어 있다면 다음 명령어를 사용하여 데모를 시작할 수 있습니다.

```shell
make start
```

`make`가 설치되어 있지 않으면 `docker compose` 명령어를 직접 사용할 수 있습니다.

```shell
docker compose --env-file .env --env-file .env.override up --force-recreate --remove-orphans --detach
```

{{% /tab %}}

{{% tab "Kubernetes" %}}

Helm을 사용하여 Kubernetes에 데모 애플리케이션을 배포하려면 다음 명령어를 실행합니다.

```shell
helm install my-otel-demo open-telemetry/opentelemetry-demo --values my-values-file.yml
```

{{% /tab %}}
{{< /tabs >}}

## 애플리케이션 탐색 {#navigating-the-application}

Astronomy Shop 웹 UI에 액세스하여 애플리케이션을 살펴보고 텔레메트리 데이터가 어떻게 생성되는지 관찰할 수 있습니다.

{{< tabs >}}
{{% tab "Docker" %}}

<http://localhost:8080>으로 이동합니다.

{{% /tab %}}

{{% tab "Kubernetes" %}}

1. 로컬 클러스터를 실행 중인 경우 프런트엔드 프록시를 포트 포워딩해야 합니다.

   ```shell
   kubectl port-forward svc/my-otel-demo-frontendproxy 8080:8080
   ```

2. <http://localhost:8080>으로 이동합니다.

{{% /tab %}}
{{< /tabs >}}

## 텔레메트리 데이터 상관관계 {#telemetry-data-correlation}

데모의 모든 서비스에 사용된 계측 단계는 다음에서 확인할 수 있습니다.
OpenTelemetry 기본 문서에서 확인할 수 있습니다.

각 서비스가 구현된 언어와 해당 문서는 다음에서 찾을 수 있습니다.
[언어 기능 참조 표][10]에서 확인할 수 있습니다.

## Datadog에서 OpenTelemetry 데이터 탐색 {#exploring-opentelemetry-data-in-datadog}

OTel 데모가 실행 중일 때, 내장된 부하 생성기가 애플리케이션의 트래픽을 시뮬레이션합니다.
몇 초 후 Datadog에 데이터가 도착하는 것을 확인할 수 있습니다.

### Catalog {#catalog}

OTel 데모에 포함된 모든 서비스를 조회하려면 다음 단계를 따르세요.

1. [{{< ui >}}APM{{< /ui >}} > {{< ui >}}Catalog{{< /ui >}}][11]로 이동합니다.

{{< img src="/getting_started/opentelemetry/otel_demo/software_catalog.png" alt="OpenTelemetry 데모 애플리케이션의 서비스 목록이 표시된 카탈로그 페이지" style="width:90%;" >}}

2. {{< ui >}}Map{{< /ui >}}을 선택하여 서비스가 어떻게 연결되어 있는지 확인합니다. {{< ui >}}Map layout{{< /ui >}}을 {{< ui >}}Cluster{{< /ui >}} 또는 {{< ui >}}Flow{{< /ui >}}로 변경하여 다양한 모드에서 맵을 조회합니다.

{{< img src="/getting_started/opentelemetry/otel_demo/software_catalog_flow.png" alt="모든 서비스가 연결된 Service Map 흐름 보기" style="width:90%;" >}}

3. {{< ui >}}Catalog{{< /ui >}} 보기를 선택한 다음, 서비스를 선택하여 사이드 패널에서 성능 요약을 조회합니다.

{{< img src="/getting_started/opentelemetry/otel_demo/software_catalog_service.png" alt="특정 서비스의 성능 요약 및 설정 안내" style="width:90%;" >}}

### Trace Explorer {#trace-explorer}

OTel 데모에서 수신된 트레이스를 탐색하려면 다음 단계를 따르세요.

1. {{< ui >}}Performance{{< /ui >}} > {{< ui >}}Setup Guidance{{< /ui >}}에서 {{< ui >}}View Traces{{< /ui >}}를 클릭하여 선택한 서비스가 필터로 적용된 Trace Explorer를 엽니다.

{{< img src="/getting_started/opentelemetry/otel_demo/traces_view.png" alt="체크아웃 서비스의 모든 인덱싱된 스팬이 표시된 트레이스 보기" style="width:90%;" >}}

2. 인덱싱된 스팬을 선택하여 이 트랜잭션에 대한 전체 트레이스 세부 정보를 조회합니다.

{{< img src="/getting_started/opentelemetry/otel_demo/trace_waterfall.png" alt="해당 트랜잭션에 속한 모든 스팬이 표시된 트레이스 보기" style="width:90%;" >}}

3. 탭을 탐색하여 추가 세부 정보를 조회합니다.
   - 호스트 메트릭을 보고하는 서비스에 대한 인프라 메트릭입니다.
   - 이미 구현된 서비스에 대한 런타임 메트릭입니다.
   - 이 트레이스와 연관된 로그 항목입니다.
   - 이 트레이스에 연결된 스팬 링크입니다.

### 트레이스 쿼리 {#trace-queries}

Datadog을 사용하면 수신된 OpenTelemetry 데이터를 필터링하고 그룹화할 수 있습니다. 예를 들어, 특정 사용자의 모든 트랜잭션을 찾으려면 트레이스 쿼리를 사용할 수 있습니다.

OTel 데모는 `user.id`를 스팬 태그로 전송하므로, 이를 사용하여 해당 사용자가 트리거한 모든 트랜잭션을 필터링할 수 있습니다.

1. 사이드 패널의 {{< ui >}}Info{{< /ui >}}에서 사용자 ID가 있는 줄 위로 마우스를 가져가 {{< ui >}}cog{{< /ui >}} 아이콘을 클릭한 다음 {{< ui >}}filter by @app.user.id:<user_id>{{< /ui >}}를 선택합니다.

2. 이전 필터를 모두 제거하고 {{< ui >}}@app.user.id{{< /ui >}}만 적용된 상태로 두어 지정된 사용자 ID가 포함된 스팬이 있는 모든 트랜잭션을 조회합니다.

{{< img src="/getting_started/opentelemetry/otel_demo/trace_query.png" alt="특정 app.user.id를 포함하는 모든 스팬을 필터링하는 트레이스 쿼리" style="width:90%;" >}}

### Error Tracking {#error-tracking}

OpenTelemetry Demo에는 오류 시나리오를 시뮬레이션하기 위한 Feature Flag 엔진이 포함되어 있습니다.

1. [http://localhost:8080/feature][12]로 이동하여 사용 가능한 시나리오를 관리합니다. 자세한 내용은 [OpenTelemetry Demo 설명서][5]를 참조하세요.
2. 데모에서 오류가 발생하기 시작하면 Datadog에서 영향을 받는 서비스를 시각화하고 추적할 수 있습니다.

{{< img src="/getting_started/opentelemetry/otel_demo/error_tracking.png" alt="PaymentService Fail Feature Flag 활성화 오류가 표시된 Error Tracking 화면" style="width:90%;" >}}

### OpenTelemetry 컬렉터 구성 {#opentelemetry-collector-configuration}

Datadog Extension을 사용하면 다음 페이지 중 하나에서 Datadog 내의 OpenTelemetry 컬렉터 구성을 조회할 수 있습니다.

- [인프라 목록][14].
- [Resource Catalog][15].

컬렉터가 실행 중인 호스트 이름을 선택하면 전체 구성을 시각화할 수 있습니다.

{{< img src="/getting_started/opentelemetry/otel_demo/collector_full_config.png" alt="Datadog 내에 렌더링된 OpenTelemetry 컬렉터 구성" style="width:90%;" >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-demo
[2]: https://www.datadoghq.com/free-datadog-trial/
[3]: https://app.datadoghq.com/organization-settings/api-keys/
[5]: https://opentelemetry.io/docs/demo/feature-flags/
[10]: https://opentelemetry.io/docs/demo/#language-feature-reference
[11]: https://app.datadoghq.com/services
[12]: http://localhost:8080/feature
[13]: /ko/opentelemetry/integrations/datadog_extension/
[14]: https://app.datadoghq.com/infrastructure
[15]: https://app.datadoghq.com/infrastructure/catalog