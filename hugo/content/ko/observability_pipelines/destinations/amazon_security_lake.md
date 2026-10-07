---
description: Observability Pipelines Worker를 사용하여 Amazon Security Lake로 로그를 전송하는 방법을
  알아보세요.
disable_toc: false
products:
- icon: logs
  name: 로그
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Amazon Security Lake 목적지
---
{{< product-availability >}}

## 개요 {#overview}

Observability Pipelines의 Amazon Security Lake 목적지를 사용하여 Amazon Security Lake로 로그를 전송하세요.

## 전제 조건 {#prerequisites}

Amazon Security Lake 목적지를 설정하기 전에 다음을 수행해야 합니다.

{{% observability_pipelines/prerequisites/amazon_security_lake %}}

## 설정 {#setup}

[파이프라인을 설정][6]할 때 Amazon Security Lake 목적지를 구성하세요. 파이프라인은 [UI][1]에서 설정할 수 있으며, [API][7] 또는 [Terraform][8]을 사용하여 설정할 수 있습니다. 이 섹션에서 설명하는 단계는 UI에서 설정합니다.

**참고**:
- Amazon Security Lake 목적지를 추가하면 OCSF 프로세서가 자동으로 추가되어 로그를 Amazon Security Lake로 전송하기 전에 Parquet로 변환할 수 있습니다. 설정 지침은 [OCSF로 리매핑 설명서][3]를 참조하세요.
- OCSF 프로세서에 의해 형식이 지정된 로그만 Parquet로 변환됩니다.

파이프라인 UI에서 Amazon Security Lake 목적지를 선택한 후 다음 단계를 따르세요.

1. S3 버킷 이름을 입력합니다.
1. AWS 리전을 입력합니다.
1. 사용자 지정 소스 이름을 입력합니다.

#### 선택적 설정 {#optional-settings}

##### AWS 인증 {#aws-authentication}

1. [AWS 인증][5] 옵션을 선택하세요.
1. 맡으려는 IAM 역할의 ARN을 입력합니다.
1. 필요시 맡은 역할의 세션 이름과 외부 ID를 입력합니다.

##### TLS 활성화 {#enable-tls}

<div class="alert alert-danger">시크릿 관리의 경우 TLS 키 암호의 식별자만 입력하세요. 실제 값은 <b>입력하지 마세요.</b></div>

{{% observability_pipelines/tls_settings %}}

{{% observability_pipelines/secrets_env_var_note %}}

##### 버퍼링 {#buffering}

{{% observability_pipelines/destination_buffer %}}

## 시크릿 기본값 {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "시크릿 관리" %}}

- Amazon Security Lake TLS 암호 식별자(TLS가 활성화된 경우):
	- 기본 식별자는 `DESTINATION_AWS_SECURITY_LAKE_KEY_PASS`입니다.

{{% /tab %}}

{{% tab "환경 변수" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/amazon_security_lake %}}

{{% /tab %}}
{{< /tabs >}}

## 목적지의 작동 방식 {#how-the-destination-works}

### AWS 인증 {#aws-authentication-1}

{{% observability_pipelines/aws_authentication/instructions %}}

#### 권한 {#permissions}

{{% observability_pipelines/aws_authentication/amazon_security_lake/permissions %}}

### 이벤트 배치 처리 {#event-batching}

이벤트 배치는 다음 중 하나의 파라미터를 충족하면 플러시됩니다. 자세한 내용은 [목적지 이벤트 배치 처리][2]를 참조하세요.

| 최대 이벤트 | 최대 크기(MB) | 시간 초과(초)   |
|----------------|-------------------|---------------------|
| 없음           | 256               | 300                 |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /ko/observability_pipelines/destinations/#event-batching
[3]: /ko/observability_pipelines/processors/remap_ocsf
[5]: /ko/observability_pipelines/destinations/amazon_security_lake/#aws-authentication
[6]: /ko/observability_pipelines/configuration/set_up_pipelines/
[7]: /ko/api/latest/observability-pipelines/
[8]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline