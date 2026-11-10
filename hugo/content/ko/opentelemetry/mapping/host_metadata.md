---
aliases:
- /ko/opentelemetry/guide/host_metadata/
- /ko/opentelemetry/schema_semantics/host_metadata/
further_reading:
- link: /opentelemetry/
  tag: 설명서
  text: Datadog의 OpenTelemetry 지원
title: 인프라 목록 호스트 정보
---
<div class="alert alert-info">
이 기능은 미리 보기로 제공되고 있습니다. 피드백이 있으면 <a href="/help/">Datadog 지원팀</a>에 문의해 주세요.
</div>

## 개요 {#overview}

권장되는 OpenTelemetry Collector 구성은 호스트 메트릭 수신기 및 리소스 탐지 프로세서로 호스트 메타데이터를 수집한 다음 Datadog Extension을 통해 Collector의 정보를 보고합니다. [인프라 목록][6]에서 이러한 호스트를 확인할 수 있습니다. 각 호스트에서 Collector를 Agent로 실행하는 경우를 비롯한 대부분의 배포에서는 호스트 정보가 자동으로 채워지므로 이 페이지에 설명된 수동 구성 프로세스를 따를 필요가 없습니다.

<div class="alert alert-info">이 페이지에 설명된 수동 구성은 주로 Datadog으로 내보내는 Collector가 보고 대상 호스트와 별도로 실행되는 <a href="https://opentelemetry.io/docs/collector/deployment/gateway/">게이트웨이 배포</a>를 위한 것입니다. 이러한 설정에서는 정확한 호스트 메타데이터가 Datadog에 전송되도록 리소스에 명시적으로 태그를 지정합니다. 각 호스트에서 Collector를 Agent로 실행하는 경우 호스트 메타데이터가 기본적으로 수집되므로 이 구성을 건너뛸 수 있습니다.</div>

모든 신호 유형에서 [`Resource` 필드][1]를 통해 호스트 시스템 정보를 OTLP 형식으로 전송합니다. Datadog은 게이트웨이 배포를 포함한 모든 [배포 패턴][9]에서 이 정보를 지원합니다.

Datadog은 [OpenTelemetry 시맨틱 규칙][2]을 사용하여 호스트의 시스템 정보를 인식합니다. [호스트 메트릭 설정][3] 지침에 따라 필요한 메트릭과 리소스 속성을 Datadog으로 전송합니다. 또는 인프라에 가장 적합한 방식으로 이 정보를 수동으로 전송할 수 있습니다.

## 기능 사용 설정 {#opting-in-to-the-feature}

게이트웨이 배포에서 또는 호스트 메타데이터에 사용할 리소스를 수동으로 제어하려면 호스트 정보가 포함된 모든 OTLP 페이로드에서 `datadog.host.use_as_metadata` 리소스 속성을 `true`로 설정합니다.

리소스에 [호스트 식별 속성][10]이 있고 `datadog.host.use_as_metadata` 속성이 `true`로 설정되어 있으면 해당 리소스의 인프라 목록 정보가 채워집니다.

메타데이터에 사용할 리소스를 명시적으로 지정하려면 관련 호스트 정보가 있는 모든 리소스에 불리언 리소스 속성 `datadog.host.use_as_metadata`를 추가합니다.

예를 들어, 메트릭, 트레이스, 로그의 모든 리소스에 대해 이를 설정하려면 다음 구성으로 [변환 프로세서][7]를 사용합니다.

```yaml
processors:
  transform:
    metric_statements:
      - context: resource
        statements:
          - set(attributes["datadog.host.use_as_metadata"], true)
    trace_statements:
      - context: resource
        statements:
          - set(attributes["datadog.host.use_as_metadata"], true)
    log_statements:
      - context: resource
        statements:
          - set(attributes["datadog.host.use_as_metadata"], true)
```

모든 파이프라인의 `processors` 목록에 이 프로세서를 추가합니다.

모든 리소스에 호스트 식별 속성을 명시적으로 지정해야 합니다. [호스트 메트릭 권장 설정][3]에서는 이 작업이 기본적으로 수행됩니다.

## 지원되는 규칙 {#supported-conventions}

Datadog은 리소스 속성 수준 시맨틱 규칙과 시스템 메트릭 수준 시맨틱 규칙을 모두 지원합니다. 지원되는 리소스 속성 시맨틱 규칙은 주로 [`host.` 네임스페이스][4] 및 [`os.` 네임스페이스][8]에 속합니다. 지원되는 모든 시스템 메트릭 수준 시맨틱 규칙은 [`system.` 네임스페이스][5]에 속합니다.

### 일반 시스템 규칙 {#general-system-conventions}

| 시맨틱 규칙                         | 유형               | 앱 내 필드 |
|---------------------------------------------|--------------------|--------------|
| [*다양한 호스트 식별 속성*][10] | 리소스 속성 | 호스트 이름     |
| `os.description`                            | 리소스 속성 | OS           |

### CPU 규칙 {#cpu-conventions}

| 시맨틱 규칙         | 유형               | 앱 내 필드       |
|-----------------------------|--------------------|--------------------|
| `host.cpu.vendor.id`        | 리소스 속성 | 공급업체 ID          |
| `host.cpu.model.name`       | 리소스 속성 | 모델 이름         |
| `host.cpu.cache.l2.size`    | 리소스 속성 | 캐시 크기         |
| `host.cpu.family`           | 리소스 속성 | 제품군             |
| `host.cpu.model.id`         | 리소스 속성 | 모델              |
| `host.cpu.stepping`         | 리소스 속성 | 스테핑           |
| `system.cpu.logical.count`  | 시스템 메트릭      | 논리 프로세서 |
| `system.cpu.physical.count` | 시스템 메트릭      | 코어              |
| `system.cpu.frequency`      | 시스템 메트릭      | MHz                |

### 네트워크 규칙 {#network-conventions}

| 시맨틱 규칙 | 유형               | 앱 내 필드              |
|---------------------|--------------------|---------------------------|
| `host.ip`           | 리소스 속성 | IP 주소 및 IPv6 주소 |
| `host.mac`          | 리소스 속성 | Mac 주소               |

### OpenTelemetry Collector를 사용하여 이러한 규칙 수집 {#collecting-these-conventions-with-the-opentelemetry-collector}

OpenTelemetry Collector로 이러한 규칙을 수집하려면 [호스트 메트릭 권장 설정][3]을 구성합니다. 호스트 메트릭 수신기는 모든 관련 메트릭을 수집하고, 리소스 탐지 프로세서는 모든 관련 리소스 속성을 수집합니다.

**참고:** 모니터링하려는 호스트에서 실행 중인 Collector에 이러한 프로세서와 수신기를 추가해야 합니다. 게이트웨이 호스트는 원격 호스트에서 이 정보를 수집하지 않습니다.


## 표준 클라우드 리소스 ID {#canonical-cloud-resource-ids}

표준 클라우드 리소스 ID(CCRID)는 클라우드 리소스를 고유하게 식별하기 위해 클라우드 공급자가 할당한 리소스 ID입니다. 다양한 관측 가능성 데이터 유형에 CCRID를 추가하면 이를 사용하여 특정 클라우드 리소스의 여러 데이터 유형을 일관되게 연결할 수 있습니다. 모든 클라우드 리소스 유형에서 동일한 형식으로 CCRID를 추가할 수 있습니다. CCRID를 광범위하게 추가하고 도입하면 고객과 내부 팀의 다양한 사용 사례에 적용할 수 있습니다.

CCRID를 활성화하면 모든 리소스 유형에서 리소스와 관련 메트릭, 트레이스 및 로그 간에 이동할 수 있어 컨텍스트를 전환할 필요 없이 동일한 워크플로에서 리소스를 엔드투엔드로 확인할 수 있습니다.

이 기능을 사용하려면 모든 OTLP 페이로드에서 `datadog.ccrid` 리소스 속성을 CCRID 값으로 설정합니다.

클라우드별 식별자 형식은 다음과 같습니다.
| 클라우드   | 식별자 유형    | 예시                                                                                                                                      |
|---------|--------------------|----------------------------------------------------------------------------------------------------------------------------------------------|
| AWS     | ARN                | `arn:aws:ec2:us-east-1:123456789012:instance/i-abcdefghi`                                                                                    |
| Azure   | 리소스 ID        | `/subscriptions/12345678-1234-5678-1234-567891234567/resourcegroups/exampleResourceGroup/Microsoft.Compute/virtualMachines/exampleVM`        |
| GCP     | CAI 리소스 이름  | `//compute.googleapis.com/projects/example-project/locations/us-central1/instances/my-instance`                                              |
| OCI     | OCID               | `ocid1.instance.oc1.eu-frankfurt-1.exampleuniqueid`                                                                                          |

CCRID 구성 방법:
 * [AWS (EC2 Instance)][13]: `arn:aws:ec2:{region}:{accountId}:instance/{instanceId}`. 
    이 명령을 사용하여 `instanceId`를 검색합니다.
    ```shell
    ec2metadata --instance-id
    ```
 * [Azure][11]: `/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName}`
 * GCP: `//compute.googleapis.com/projects/{projectID}/zones/{zoneName}/instances/{instanceName}"`
 * OCI/Oracle: `http://169.254.169.254/opc/v2/instance/id`에서 [요청을 전송][12]하여 CCRID를 가져올 수 있습니다.


예를 들어, 메트릭, 트레이스 및 로그의 모든 리소스에 대해 AWS CCRID를 설정하려면 다음 구성을 사용하여 [변환 프로세서][2]를 설정합니다.

```yaml
processors:
  transform:
    metric_statements:
      - context: resource
        statements:
          - set(attributes["datadog.ccrid"], "arn:aws:ec2:us-east-1:123456789012:instance/i-abcdefghi")
    trace_statements:
      - context: resource
        statements:
          - set(attributes["datadog.ccrid"], "arn:aws:ec2:us-east-1:123456789012:instance/i-abcdefghi")
    log_statements:
      - context: resource
        statements:
          - set(attributes["datadog.ccrid"], "arn:aws:ec2:us-east-1:123456789012:instance/i-abcdefghi")
```

OpenTelemetry 시맨틱 규칙에서는 [cloud.resource_id][14] 속성도 정의하며, 이 속성은 [속성 프로세서][15]를 사용하여 구성에서 매핑할 수 있습니다.

예: 

```yaml
processors:
  attributes/example:
    actions:
      - key: datadog.ccrid
        from_attribute: cloud.resource_id
        action: upsert
```


## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/docs/concepts/glossary/#resource
[2]: https://opentelemetry.io/docs/concepts/semantic-conventions/
[3]: /ko/opentelemetry/collector_exporter/host_metrics
[4]: https://opentelemetry.io/docs/specs/semconv/resource/host/
[5]: https://opentelemetry.io/docs/specs/semconv/system/system-metrics/
[6]: /ko/infrastructure/list/
[7]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/transformprocessor#transform-processor
[8]: https://opentelemetry.io/docs/specs/semconv/resource/os/
[9]: https://opentelemetry.io/docs/collector/deployment/
[10]: /ko/opentelemetry/schema_semantics/hostname/
[11]: https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/move-resource-group-and-subscription?tabs=azure-cli
[12]: https://docs.oracle.com/en-us/iaas/Content/Compute/Tasks/gettingmetadata.htm
[13]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-policies-for-amazon-ec2.html#policy-syntax
[14]: https://opentelemetry.io/docs/specs/semconv/registry/attributes/cloud/#cloud-resource-id
[15]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/attributesprocessor