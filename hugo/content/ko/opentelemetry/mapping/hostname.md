---
aliases:
- /ko/opentelemetry/schema_semantics/hostname/
further_reading:
- link: /opentelemetry/
  tag: 설명서
  text: Datadog의 OpenTelemetry 지원
title: OpenTelemetry 시맨틱 규칙을 호스트 이름에 매핑하기
---
## 개요 {#overview}

OpenTelemetry는 호스트 이름과 관련된 리소스 속성에 대한 특정 시맨틱 규칙을 정의합니다. 모든 신호 유형의 OpenTelemetry Protocol(OTLP) 페이로드에 알려진 호스트 이름 리소스 속성이 있는 경우 Datadog은 이러한 규칙을 준수하고 해당 값을 호스트 이름으로 사용하려고 합니다. 기본 호스트 이름 확인 알고리즘은 다른 Datadog 제품과의 호환성을 고려하여 설계되었지만 필요하면 재정의할 수 있습니다.

이 알고리즘은 Datadog OTLP Intake, [Datadog Exporter][3], [Datadog Agent의 OTLP 수집 파이프라인][2] 및 [DDOT Collector][5]에서 사용됩니다. Collector를 실행하면 [리소스 탐지 프로세서][1]가 알고리즘에 필요한 리소스 속성을 추가합니다. 경로별 지침은 [호스트 이름 및 태깅][4]을 참조하세요.

## 호스트 이름 결정에 사용되는 규칙 {#conventions-used-to-determine-the-hostname}

규칙은 리소스 속성에서 다음 순서로 확인되며 첫 번째로 유효한 호스트 이름이 사용됩니다. 유효한 규칙이 없으면 폴백 호스트 이름 로직이 사용됩니다. 이 폴백 로직은 제품마다 다릅니다.

1. Datadog 전용 규칙인 `host` 및 `datadog.host.name`을 확인합니다.
1. AWS, Azure 및 GCP의 클라우드 공급자별 규칙을 확인합니다.
1. Kubernetes 전용 규칙을 확인합니다.
1. 특정 규칙을 찾을 수 없으면 `host.id` 및 `host.name`을 폴백으로 사용합니다.

다음 섹션에서는 각 규칙 세트에 대해 더 자세히 설명합니다.

### 일반 호스트 이름 시맨틱 규칙 {#general-hostname-semantic-conventions}

`host` 및 `datadog.host.name` 규칙은 Datadog 전용 규칙입니다. 이 규칙들은 가장 먼저 고려되며 일반적인 OpenTelemetry 시맨틱 규칙을 사용하여 탐지된 호스트 이름을 재정의하는 데 사용할 수 있습니다. `host`가 먼저 확인되고 `host`가 설정되지 않은 경우 `datadog.host.name`이 확인됩니다.

`datadog.host.name` 규칙은 네임스페이스가 지정되어 있고 다른 벤더별 동작과 충돌할 가능성이 낮으므로 사용하는 것이 좋습니다.

OpenTelemetry Collector를 사용할 때 `transform` 프로세서를 사용하여 파이프라인에서 `datadog.host.name` 규칙을 설정할 수 있습니다. 예를 들어, 특정 파이프라인의 모든 메트릭, 트레이스 및 로그에서 호스트 이름을 `my-custom-hostname`으로 설정하려면 다음 구성을 사용하세요.

```yaml
transform:
  metric_statements: &statements
    - context: resource
      statements:
        - set(attributes["datadog.host.name"], "my-custom-hostname")
  trace_statements: *statements # Use the same statements as in metrics
  log_statements:   *statements # Use the same statements as in metrics
```

파이프라인에 `transform` 프로세서를 추가하세요.

백엔드에서 호스트 이름을 중복 제거하는 방식 때문에 간혹 호스트의 별칭이 표시될 수 있습니다. 이로 인해 문제가 발생하면 지원팀에 문의하세요.

### 클라우드 공급자별 규칙 {#cloud-provider-specific-conventions}

`cloud.provider` 리소스 속성은 클라우드 공급자를 결정하는 데 사용됩니다. 추가 리소스 속성은 각 플랫폼의 호스트 이름을 결정하는 데 사용됩니다. `cloud.provider` 또는 예상되는 리소스 속성 중 하나라도 누락된 경우 다음 규칙 세트를 확인합니다.

#### Amazon Web Services {#amazon-web-services}

`cloud.provider`의 값이 `aws`인 경우 다음 규칙을 확인합니다.

1. 페이로드가 ECS Fargate 작업에서 전송된 것인지 확인하려면 `aws.ecs.launchtype`을 확인합니다. 그렇다면 `task_arn` 태그 이름과 함께 `aws.ecs.task.arn`을 식별자로 사용합니다.
1. 그렇지 않으면 `host.id`를 호스트 이름으로 사용하세요. 이는 EC2 인스턴스 ID와 일치합니다.

#### Google Cloud {#google-cloud}

`cloud.provider`의 값이 `gcp`인 경우 다음 규칙을 확인하세요.

1. `host.name`과 `cloud.account.id`를 모두 사용할 수 있고 예상되는 형식인지 확인한 다음 `host.name`에서 접두사를 제거하고 두 값을 병합하여 호스트 이름을 만듭니다.

#### Azure {#azure}

`cloud.provider`의 값이 `azure`인 경우 다음 규칙을 확인하세요.

1. `host.id`를 사용할 수 있고 예상되는 형식이면 호스트 이름으로 사용합니다.
1. 그렇지 않으면 `host.name`을 폴백으로 사용합니다.

### Kubernetes 전용 규칙 {#kubernetes-specific-conventions}

`k8s.node.name` 및 클러스터 이름을 사용할 수 있는 경우 호스트 이름은 `<node name>-<cluster name>`으로 설정됩니다. `k8s.node.name`만 사용할 수 있으면 호스트 이름이 노드 이름으로 설정됩니다.

클러스터 이름을 가져오려면 다음 규칙을 확인하세요.

1. `k8s.cluster.name`을 확인하고 값이 있으면 사용합니다.
2. `cloud.provider`가 `azure`로 설정된 경우 `azure.resourcegroup.name`에서 클러스터 이름을 추출합니다.
3. `cloud.provider`가 `aws`로 설정된 경우 `ec2.tag.kubernetes.io/cluster/`로 시작하는 첫 번째 리소스 속성에서 클러스터 이름을 추출합니다.

### `host.id` 및 `host.name` {#hostid-and-hostname}

위의 규칙이 하나도 없는 경우 `host.id` 및 `host.name` 리소스 속성을 그대로 사용하여 호스트 이름이 결정됩니다. `host.id`가 먼저 확인되고 `host.id`가 설정되지 않은 경우 `host.name`이 확인됩니다.

**참고:** OpenTelemetry 사양에 따르면 `host.id` 및 `host.name`에는 특정 환경에서 다른 Datadog 제품이 사용하는 값과 일치하지 않는 값이 설정될 수 있습니다. 여러 Datadog 제품을 사용하여 동일한 호스트를 모니터링하는 경우 일관성을 유지하기 위해 `datadog.host.name`을 사용하여 호스트 이름을 재정의해야 할 수 있습니다.

## 인프라 속성 프로세서 {#infra-attributes-processor}

[인프라 속성 프로세서][6]는 레이블 또는 주석을 기반으로 Kubernetes 태그 추출을 자동화하고 이러한 태그를 트레이스, 메트릭 및 로그의 리소스 속성으로 할당합니다. 인프라 속성 프로세서가 올바른 속성과 호스트 이름을 추출하려면 다음 [속성][7](예: `container.id`)이 설정되어 있어야 합니다.

인프라 속성 프로세서는 속성에서 추출된 호스트 이름을 Agent 호스트 이름으로 재정의하도록 구성할 수도 있습니다.

```
processors:
 infraattributes:
   allow_hostname_override: true
```

**참고**: 이 설정은 DDOT Collector에서만 사용할 수 있습니다. 

## 폴백 호스트 이름 로직 {#fallback-hostname-logic}

리소스 속성에서 유효한 호스트 이름을 찾을 수 없는 경우 수집 경로에 따라 동작이 달라집니다. 

{{< tabs >}}
{{% tab "Datadog 익스포터" %}}

폴백 호스트 이름 로직이 사용됩니다. 이 로직은 
다음 소스를 확인하여 다른 Datadog 제품과 호환되는 Datadog Exporter 실행 머신의 호스트 이름을 생성합니다.

1. Datadog Exporter 구성의 `hostname` 필드
1. 클라우드 공급자 API
1. Kubernetes 호스트 이름
1. 정규화된 도메인 이름
1. 운영 체제 호스트 이름

이로 인해 [게이트웨이 배포][1]에서 잘못된 호스트 이름이 생성될 수 있습니다. 이를 방지하려면 파이프라인에서 `resource detection` 프로세서를 사용하여 호스트 이름이 정확하게 확인되도록 하세요.

[1]: https://opentelemetry.io/docs/collector/deployment/gateway/
{{% /tab %}}
{{% tab "Datadog Agent의 OTLP 수집 파이프라인" %}}

Datadog Agent 호스트 이름이 사용됩니다. 자세한 내용은 [Datadog에서 Agent 호스트 이름을 결정하는 방법][1]을 참조하세요.

[1]: /ko/agent/faq/how-datadog-agent-determines-the-hostname/
{{% /tab %}}
{{< /tabs >}}

## 잘못된 호스트 이름 {#invalid-hostnames}

다음 호스트 이름은 유효하지 않은 것으로 간주되어 폐기됩니다.
- `0.0.0.0`
- `127.0.0.1`
- `localhost`
- `localhost.localdomain`
- `localhost6.localdomain6`
- `ip6-localhost`

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/resourcedetectionprocessor#resource-detection-processor
[2]: /ko/opentelemetry/interoperability/otlp_ingest_in_the_agent
[3]: /ko/opentelemetry/setup/collector_exporter/datadog_exporter/
[4]: /ko/opentelemetry/config/hostname_tagging/#hostname-recommendations
[5]: /ko/opentelemetry/migrate/ddot_collector/
[6]: https://github.com/DataDog/datadog-agent/tree/main/comp/otelcol/otlp/components/processor/infraattributesprocessor
[7]: https://github.com/DataDog/datadog-agent/tree/main/comp/otelcol/otlp/components/processor/infraattributesprocessor#expected-attributes