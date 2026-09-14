---
description: Observability Pipelines의 Edit Fields 또는 Custom Processor를 사용하여 호스트, 소스,
  서비스와 같은 예약된 로그 속성의 값을 리매핑하는 방법을 알아보세요.
disable_toc: false
further_reading:
- link: /observability_pipelines/processors/edit_fields/
  tag: 설명서
  text: Edit Fields 프로세서에 대해 자세히 알아보세요.
- link: /observability_pipelines/processors/custom_processor/
  tag: 설명서
  text: Custom Processor 프로세서에 대해 자세히 알아보세요.
title: 예약 속성 리매핑
---
## 개요 {#overview}

Observability Pipelines 프로세서를 사용하면 로그 필드를 추가, 편집 및 제거할 수 있습니다. 속성을 리매핑하거나 값을 다시 작성하면 로그가 올바르게 처리되고 표준화됩니다. 대부분의 처리 사용 사례에서는 Edit Fields 프로세서를 사용하여 로그에서 필드를 추가, 리매핑 또는 제거하세요. 고급 사용 사례에서는 Custom Processor를 사용하여 필드를 조건부로 수정하거나 필드 값을 다시 작성하세요.

Datadog에서 [예약 속성][1]은 플랫폼 내 특정 처리를 위해 따로 지정된 로그 필드입니다. 예약 속성에는 ` host`, `source`, `status`, `service`, `trace_id` 및 `message`가 포함됩니다. 예약 속성은 로그를 다음 Observability Pipelines 목적지로 라우팅할 때 적용됩니다.

- Datadog Logs
- Amazon S3 (Log Archives용)
- Azure Blob Storage (Log Archives용)
- Google Cloud Storage (Log Archives용)

Observability Pipelines에는 예약 속성을 수정하는 방법에 제한 사항이 있습니다. 예를 들어, 예약 속성은 Rename Field 프로세서를 사용하여 이름을 변경할 수 없으며 대신 리매핑해야 합니다. 이 가이드에서는 예약 속성의 값을 리매핑하는 단계를 설명합니다.

특정 설정에서 Splunk HEC 소스와 Datadog 목적지를 사용하는 경우, [ Splunk HEC 소스 및 Datadog 목적지를 사용할 때 소스 및 서비스 속성 리매핑](#remap-source-and-service-attributes-when-using-the-splunk-hec-source-and-datadog-destination)을 참조하세요.

## 예약 속성 값 리매핑 {#remap-the-value-of-reserved-attributes}

기존 예약 속성 필드의 값을 변경하거나 재정의하려면 Datadog은 Observability Pipelines를 사용하는 두 가지 접근 방식을 권장합니다. 첫 번째는 Edit Fields 프로세서, 두 번째는 Custom Processor를 사용하는 방법입니다.

### 기본 필드 할당에 Edit Fields 프로세서 사용 {#use-an-edit-fields-processor-for-basic-field-assignments}

1. {{< ui >}}Remove field{{< /ui >}} 프로세서를 사용하여 로그에서 예약 속성을 삭제합니다.
2. {{< ui >}}Add field{{< /ui >}} 프로세서를 사용하여 올바른 필드 이름과 값 할당으로 예약 속성을 로그에 다시 추가합니다.

**참고**: 프로세서 순서상 올바른 필드 리매핑을 보장하기 위해 {{< ui >}}Add Field{{< /ui >}} 프로세서는 {{< ui >}}Remove Field{{< /ui >}} 프로세서 바로 다음에 배치해야 합니다.

#### 예시{#example}
아래 {{< ui >}}Remove field{{< /ui >}} 프로세서 이미지는 로그에서 잘못 명명된 `service` 필드를 제거합니다.

{{< img src="observability_pipelines/guide/remap_attributes/remove_field_remap.png" alt="서비스 태그를 삭제하는 필드 제거 프로세서와 payment-app 값으로 서비스 필드를 추가하는 필드 추가 프로세서" style="width:50%;" >}}

아래 {{< ui >}}Add field{{< /ui >}} 프로세서 이미지는 올바른 값으로 `service` 필드를 다시 추가합니다.

{{< img src="observability_pipelines/guide/remap_attributes/add_field_remap.png" alt="서비스 태그를 삭제하는 필드 제거 프로세서와 payment-app 값으로 서비스 필드를 추가하는 필드 추가 프로세서" style="width:50%;" >}}

### 동적 또는 수동 할당에 Custom Processor 사용 {#use-the-custom-processor-for-dynamic-or-manual-assignments}

{{< ui >}}Custom Processor{{< /ui >}}를 사용하여 예약된 속성의 값을 다시 작성하세요.

#### 템플릿 구문을 사용해 다른 필드의 값을 참조하여 동적으로 값 할당 {#dynamically-assign-the-value-using-template-syntax-to-reference-another-fields-value}

다음 Custom Processor 스크립트는 `service` 필드를 다시 작성하고 `app_id`의 값을 `service` 필드의 값으로 동적으로 할당합니다.

```
.service = {{.app_id}}
```

아래 예시 이미지의 입력에는 값이 `wrongstatus`인 `service`이 표시됩니다. 스크립트로 로그를 처리한 후 출력에는 `app_id`의 값인 `streaming-service`가 적용된 `service`이 표시됩니다.

{{< img src="observability_pipelines/guide/remap_attributes/custom_processor_dynamically_assign.png" alt="잘못된 상태 값을 가진 입력과 올바른 상태를 보여주는 출력을 나타내는 Custom Processor" style="width:100%;" >}}

#### 정적 이름을 사용하여 속성 값을 수동으로 다시 작성 {#manually-rewrite-the-value-of-an-attribute-with-a-static-name}

다음 Custom Processor 스크립트는 `status` 필드를 정적 값 `info`로 설정합니다.

```
.status = "info"
```

아래 예시 이미지의 입력에는 값이 `wrongstatus`인 `status`이 표시됩니다. 스크립트로 로그를 처리한 후 출력에는 `info`가 할당된 `status`이 표시됩니다.

{{< img src="observability_pipelines/guide/remap_attributes/custom_processor_statically_assign.png" alt="잘못된 상태 값을 가진 입력과 올바른 상태를 보여주는 출력을 나타내는 Custom Processor" style="width:100%;" >}}

## Splunk HEC 소스와 Datadog 목적지를 사용할 때 소스 및 서비스 속성 리매핑 {#remap-source-and-service-attributes-when-using-the-splunk-hec-source-and-datadog-destination}

Splunk HEC 소스와 Datadog 목적지를 사용하는 경우 이 섹션의 지침에 따라 `source` 및/또는 `service` 값을 리매핑하세요. 다음과 같은 이유로 해당 속성을 리매핑하려면 이 지침을 따라야 합니다.

 - Splunk의 `service`는 Datadog에서 `source` 속성이라고 부르는 값입니다.
 - Splunk의 `sourcetype`는 Datadog에서 `ddsource` 속성이라고 부르는 값입니다.

**참고**: `env` 및 `hostname`과 같은 다른 예약 속성을 리매핑하려면 [예약 속성 값 리매핑](#remap-the-value-of-reserved-attributes) 지침을 따르세요.

[Custom Processor](#remap-service-and-source-attributes-using-the-custom-processor) 또는 [Edit Fields](#remap-service-and-source-attributes-using-edit-fields)를 사용하여 다음을 수행할 수 있습니다.

1. 입력 로그의 `service` 필드를 `source` 필드 이름으로 리매핑합니다.
1. 입력 로그의 `source` 필드를 `ddsource` 필드 이름으로 리매핑합니다.

### Custom Processor를 사용하여 서비스 및 소스 속성 리매핑 {#remap-service-and-source-attributes-using-the-custom-processor}

다음은 Splunk HEC 소스의 입력 로그 예시입니다.

```json
{
  "service": "wrongService"
  "source": "wrongSource"
}
```

Datadog으로 전송되는 로그의 올바른 값이 다음과 같다고 가정합니다.

```json
{
  "ddsource": "akamai",
  "source": "cdn-logs"
}

Use this Custom Processor script to remap the `service` and `source` to the correct values:

```json
  .source = "cdn-logs"
  .ddsource = "akamai"
  del(.service)
```

스크립트로 로그를 처리한 후 출력은 다음과 같습니다.

```json
{
  "ddsource": "akamai",
  "source": "cdn-logs"
}
```

아래 예시 이미지의 입력에는 값이 `wrongstatus`인 `source`와 `service`가 표시됩니다. 스크립트로 로그를 처리한 후 올바른 값이 표시됩니다.

{{< img src="observability_pipelines/guide/remap_attributes/custom_processor_splunkhec_dd.png" alt="잘못된 상태 값을 가진 입력과 올바른 상태를 보여주는 출력을 나타내는 Custom Processor" style="width:100%;" >}}

### Edit Fields를 사용하여 서비스 및 소스 속성 리매핑 {#remap-service-and-source-attributes-using-edit-fields}

다음은 Splunk HEC 소스의 입력 로그 예시입니다.

```json
{
  "service": "wrongService"
  "source": "wrongSource"
}
```

Datadog으로 전송되는 로그의 올바른 값이 다음과 같다고 가정합니다.

```json
{
  "ddsource": "akamai",
  "source": "cdn-logs"
}
```

`source` 및 `service` 속성을 올바른 값으로 다시 매핑하려면 다음을 수행하세요.

1. {{< ui >}}Remove field{{< /ui >}} 프로세서를 사용하여 `source` 필드를 제거합니다.
    - {{< ui >}}Field to drop{{< /ui >}} 필드에 `source`를 입력하세요.
    {{< img src="observability_pipelines/guide/remap_attributes/remove_field_source.png" alt="소스 필드를 제거하는 필드 제거 프로세서" style="width:50%;" >}}
1. {{< ui >}}Add field{{< /ui >}} 프로세서를 사용하여 값이 `akamai`인 `ddsource` 필드를 추가합니다.
    - {{< ui >}}Field to add{{< /ui >}} 필드에 `ddsource`를 입력하세요.
    - {{< ui >}}Value to add{{< /ui >}} 필드에 `akamai`를 입력하세요.
    {{< img src="observability_pipelines/guide/remap_attributes/add_field_ddsource.png" alt="ddsource 필드를 추가하는 필드 추가 프로세서" style="width:50%;" >}}
1. {{< ui >}}Remove field{{< /ui >}} 프로세서를 사용하여 `service` 필드를 제거합니다.
    - {{< ui >}}Field to drop{{< /ui >}} 필드에 `service`를 입력하세요.
    {{< img src="observability_pipelines/guide/remap_attributes/remove_field_service.png" alt="서비스 필드를 제거하는 필드 제거 프로세서" style="width:50%;" >}}
1. {{< ui >}}Add field{{< /ui >}} 프로세서를 사용하여 값이 `cdn-logs`인 `source` 필드를 추가합니다.
    - {{< ui >}}Field to add{{< /ui >}} 필드에 `source`를 입력하세요.
    - {{< ui >}}Value to add{{< /ui >}} 필드에 `cdn-logs`를 입력하세요.
    {{< img src="observability_pipelines/guide/remap_attributes/add_field_source.png" alt="ddsource 필드를 추가하는 필드 추가 프로세서" style="width:50%;" >}}


## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/logs/log_configuration/attributes_naming_convention/#reserved-attributes