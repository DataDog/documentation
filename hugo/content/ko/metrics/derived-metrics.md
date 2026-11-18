---
description: 메트릭 쿼리를 대시보드, 모니터, SLO, 노트북 등에서 재사용할 수 있는 새 메트릭으로 저장하세요.
further_reading:
- link: https://www.datadoghq.com/blog/auto-smoother-asap/
  tag: 블로그
  text: 노이즈가 많은 메트릭을 자동으로 평활화하여 추세 파악하기
title: 파생 메트릭
---
## 개요 {#overview}

파생 메트릭을 사용하면 모든 메트릭 쿼리를 새 메트릭으로 저장할 수 있으므로, Datadog에서 메트릭을 다루는 방식을 더욱 간소화하고 최적화할 수 있습니다. 대시보드, 모니터, SLO, 노트북 등에서 복잡한 쿼리를 반복적으로 작성하는 대신 파생 메트릭을 한 번 생성하여 모든 자산에서 재사용할 수 있습니다. 파생 메트릭을 사용하면 다음을 수행할 수 있습니다.

- **쿼리 간소화**: 쿼리를 한 번 정의하고 파생 메트릭으로 저장한 다음 어디서나 재사용합니다.
- **오류 감소 및 일관성 향상**: 수식을 중앙에서 관리하여 오류를 방지하고 팀 간 일관성을 유지합니다.
- **워크플로 가속화**: 코드 변경이나 새 메트릭 제출 없이 Datadog의 기존 메트릭에서 직접 새 메트릭을 생성할 수 있습니다.
- **제어 및 감사 가능성 확보**: 파생 수식을 한 곳에서 관리하고 개선합니다.

**참고**: 파생 메트릭은 쿼리 시점에 동적으로 계산되며 저장되거나 인덱싱되지 않으므로 Custom Metrics로 **청구되지 않습니다**.

## 파생 메트릭 생성 {#create-a-derived-metric}

파생 메트릭을 생성하려면 [{{< ui >}}Metrics > Generate Metrics{{< /ui >}}][1]로 이동한 후 {{< ui >}}\+ New Metric{{< /ui >}}을 클릭하세요.

{{< img src="metrics/derived_metrics/generate_metrics_tab.png" alt="Datadog의 'Generate Metrics' 탭" style="width:90%;" >}}

1. 파생 메트릭의 이름이 `datadog.estimated_usage`로 시작하지 **않도록** 지정합니다. [사용자 지정 메트릭 명명][2]에 설명된 형식을 사용하세요.

2. 기본 메트릭 쿼리를 정의하고, 필요시 수식 상자를 사용하여 메트릭 값에 수행할 수학적 연산을 정의합니다. 

   예를 들어, Kafka 커넥터의 전반적인 안정성을 모니터링하려면 메트릭 `kafka.connect.connector.status.running` 및 `kafka.connect.connector.status.failed`를 사용하여 개별 쿼리 `a` 및 `b`를 생성할 수 있습니다. 그 후 수식 상자에 수식 `(a / (a + b)) * 100`을 입력하세요.

   메트릭 쿼리 정의 방법에 대한 자세한 내용은 [메트릭 쿼리][3]를 참조하세요.

{{< img src="metrics/derived_metrics/derived_metric_query.png" alt="파생 메트릭을 생성하기 위한 Datadog의 메트릭 쿼리" style="width:90%;" >}}

3. {{< ui >}}Create Metric{{< /ui >}}을 클릭합니다.

## 파생 메트릭 업데이트 {#update-a-derived-metric}

파생 메트릭을 업데이트하려면 메트릭 위로 마우스를 가져간 후 오른쪽에 나타나는 {{< ui >}}Edit{{< /ui >}} 아이콘을 클릭하세요. 

**참고**: 기존 메트릭의 이름은 변경할 수 없습니다. 대신 새 메트릭을 만드세요.

## 파생 메트릭 삭제 {#delete-a-derived-metric}

파생 메트릭을 삭제하려면 파생 메트릭 위로 마우스를 가져간 후 오른쪽에 나타나는 {{< ui >}}Delete{{< /ui >}} 아이콘을 클릭하세요. 

## Terraform으로 파생 메트릭 관리 {#manage-derived-metrics-with-terraform}

[`datadog_derived_metric` 리소스][4]를 사용하여 Terraform으로 파생 메트릭 정의를 생성, 업데이트 및 삭제할 수 있습니다.

시작하기 전에 [Datadog Terraform 공급자 구성][5]을 수행하세요. 애플리케이션 키에는 **Metrics Read**(`metrics_read`) 및 **Manage Tags for Metrics**(`metric_tags_write`) 권한이 필요합니다. 자세한 내용은 [API 및 애플리케이션 키][6]를 참조하세요.

예를 들어, Terraform 구성에 이 리소스를 추가하여 CPU 메트릭 2개를 결합합니다.

```hcl
resource "datadog_derived_metric" "cpu_total" {
  name = "custom.cpu.total"
  definition = {
    formula = "a + b"
    queries = [
      {
        name        = "a"
        data_source = "metrics"
        query       = "avg:system.cpu.user{*}"
      },
      {
        name        = "b"
        data_source = "metrics"
        query       = "avg:system.cpu.system{*}"
      },
    ]
  }
}
```

`terraform plan`을 실행하여 변경 사항을 검토한 다음 `terraform apply`를 실행하여 파생 메트릭을 생성합니다.

`definition.formula` 또는 `definition.queries`를 변경하면 기존 정의가 업데이트됩니다. `name`을 변경하면 파생 메트릭이 교체됩니다.

기존 파생 메트릭을 관리하려면 해당 리소스 구성을 추가하고 이름을 기준으로 가져옵니다.

```shell
terraform import datadog_derived_metric.cpu_total "custom.cpu.total"
```

가져온 후 `terraform plan` 및 `terraform apply`를 실행하여 구성된 이름과 정의를 적용하세요. 첫 번째 적용 시 기존 메트릭이 업데이트됩니다. 이후 `name`를 변경하면 해당 메트릭이 교체됩니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/metric/generate-metrics
[2]: /ko/metrics/custom_metrics/#naming-custom-metrics
[3]: /ko/metrics/#querying-metrics
[4]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/derived_metric
[5]: /ko/integrations/terraform/#configuration
[6]: /ko/account_management/api-app-keys/