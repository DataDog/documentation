---
description: Observability Pipelines Worker를 사용하여 Prometheus로 메트릭을 전송하는 방법을 알아보세요.
disable_toc: false
products:
- icon: metrics
  name: 메트릭
  url: /observability_pipelines/configuration/?tab=metrics#pipeline-types
title: Prometheus 목적지
---
{{< product-availability >}}

## 개요 {#overview}

Observability Pipelines의 Prometheus 목적지를 사용하여 Prometheus로 메트릭을 전송하세요.

## 목적지 설정 {#set-up-destination}

<div class="alert alert-danger">시크릿 관리의 경우: 엔드포인트 URL에 대한 식별자와, 해당하는 경우 일반 인증을 위한 사용자 이름 및 비밀번호, 베어러 토큰, TLS 키 암호에 대한 식별자만 입력하세요. 실제 값을 입력하지 <b>마세요</b>.</div>

[파이프라인을 설정][1]할 때 Prometheus 목적지를 구성하세요. 파이프라인은 [UI][2]에서 [API][3] 또는 [Terraform][4]을 사용하여 설정할 수 있습니다. 이 섹션에서 설명한 단계는 UI로 구성했습니다.

파이프라인 UI에서 Prometheus 목적지를 선택한 후 다음 단계를 따르세요.

1. {{< ui >}}Remote Write Endpoint URL{{< /ui >}}에 대한 식별자를 입력합니다. 식별자가 참조하는 엔드포인트 URL의 예시: `http://localhost:9090/api/v1/write` 식별자 필드를 비워 두면 [기본값](#secret-defaults)이 사용됩니다.
1. 인증 방식({{< ui >}}None{{< /ui >}}, {{< ui >}}Basic{{< /ui >}} 또는 {{< ui >}}Bearer{{< /ui >}})을 선택합니다. 선택한 방식에 따라 다음을 설정하세요.
    - {{< ui >}}Basic{{< /ui >}}: 사용자 이름 및 비밀번호에 대한 식별자를 입력합니다. 비워두면 [기본값](#secret-defaults)이 사용됩니다.
    - {{< ui >}}Bearer{{< /ui >}}: 베어러 토큰의 식별자를 입력합니다. 비워두면 [기본값](#secret-defaults)이 사용됩니다.

{{% observability_pipelines/secrets_env_var_note %}}

### 선택적 설정 {#optional-settings}

#### 기본 네임스페이스 {#default-namespace}

전송되는 메트릭의 기본 네임스페이스를 입력하세요. 이 네임스페이스는 메트릭에 기존 네임스페이스가 없는 경우에만 사용됩니다. 또한 메트릭 이름 앞에 밑줄(`_`)로 구분되어 추가됩니다. 네임스페이스는 [Prometheus 명명 규칙][5]을 따라야 합니다.

#### 테넌트 ID {#tenant-id}

발신 요청에 추가할 테넌트 ID를 입력하세요. 이 필드는 [템플릿 구문][6]을 지원하지만, 템플릿에 `prefix-와 같은 리터럴 접두사가 있어야 합니다.{{ tenant_id }}` or `prefix/{{ tenant_id }}`. `{{ tenant_id }}`처럼 리터럴 접두사가 없는 템플릿은 거부되며, Worker는 오류를 기록하고 파이프라인이 시작되지 않습니다.

#### TLS 활성화 {#enable-tls}

{{% observability_pipelines/tls_settings %}}
- (선택 사항) 인증서 유효성 검사에 사용할 서버 이름을 입력하세요. 비워 두면 엔드포인트 URL의 호스트 이름이 사용됩니다.

#### 버퍼링 {#buffering}

{{% observability_pipelines/destination_buffer %}}

## 순서가 맞지 않는 샘플 허용 {#allow-out-of-order-samples}

Worker는 메트릭 순서를 재조정하지 않기 때문에 특정 시리즈의 메트릭을 항상 올바른 순서로 전송하지는 않습니다. 예를 들어, 첫 번째 메트릭 배치에 타임스탬프가 `10:03`, `10:04`, `10:05`인 메트릭이 포함되어 있고 두 번째 배치에 타임스탬프가 `10:01`, `10:02`, `10:06`인 메트릭이 포함되어 있는 경우, Worker는 해당 메트릭을 전송하기 전에 순서를 재조정하지 않습니다.

Prometheus Remote Write 수신기는 순서가 맞지 않는 샘플을 거부하므로, Worker는 Bad Request(`400`) 오류를 기록하며 Remote Write 수신기가 배치 내 일부 유효한 메트릭을 수락했더라도 두 번째 메트릭 배치 전체가 삭제됩니다.

Datadog은 순서가 맞지 않는 샘플이 삭제되지 않도록 Remote Write 수신기에서 이러한 샘플을 허용하도록 설정할 것을 권장합니다.

## 문제 해결 {#troubleshooting}

### 디버그 오류 로그 {#debug-error-logs}

이 목적지에서 `400` 또는 `500` 오류 로그가 표시되면 디버그 로그를 활성화하여 서버에서 반환된 응답을 확인할 수 있습니다. 모든 Worker 모듈이 아니라 이 HTTP 기반 목적지에 대해서만 로그를 활성화하려면 `VECTOR_LOG`를 `info,vector::sinks::util::http=debug`로 설정하세요.

```
docker run -i -e DD_API_KEY=<DATADOG_API_KEY> \
   -e DD_OP_PIPELINE_ID=<PIPELINE_ID> \
   -e VECTOR_LOG=info,vector::sinks::util::http=debug \
   datadog/observability-pipelines-worker run
```

전체 디버그 로그를 활성화하는 방법은 [디버그 로그 활성화][7]를 참조하세요.

## 시크릿 기본값 {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "시크릿 관리" %}}

- Remote Write 엔드포인트 URL 식별자:
	- Remote Write 엔드포인트 URL을 참조합니다. 식별자가 참조하는 엔드포인트 URL의 예시: `http://localhost:9090/api/v1/write`
	- 기본 식별자는 `DESTINATION_PROMETHEUS_REMOTE_WRITE_ENDPOINT`입니다.
- Prometheus TLS 암호 식별자(TLS가 활성화된 경우):
	- 기본 식별자는 `DESTINATION_PROMETHEUS_REMOTE_WRITE_KEY_PASS`입니다.
- 일반 인증을 사용하는 경우:
	- Prometheus 사용자 이름 식별자:
		- 기본 식별자는 `DESTINATION_PROMETHEUS_REMOTE_WRITE_USERNAME`입니다.
	- Prometheus 비밀번호 식별자:
		- 기본 식별자는 `DESTINATION_PROMETHEUS_REMOTE_WRITE_PASSWORD`입니다.
- Bearer 인증을 사용하는 경우:
	- Prometheus Bearer 토큰 식별자:
		- 기본 식별자는 `DESTINATION_PROMETHEUS_REMOTE_WRITE_BEARER_TOKEN`입니다.

{{% /tab %}}

{{% tab "환경 변수" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/prometheus %}}

{{% /tab %}}
{{< /tabs >}}

[1]: /ko/observability_pipelines/configuration/set_up_pipelines/
[2]: https://app.datadoghq.com/observability-pipelines
[3]: /ko/api/latest/observability-pipelines/
[4]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[5]: https://prometheus.io/docs/practices/naming/
[6]: /ko/observability_pipelines/destinations/#template-syntax
[7]: /ko/observability_pipelines/monitoring_and_troubleshooting/troubleshooting/#enable-debug-logs