---
description: Observability Pipelines Worker를 사용하여 Splunk HTTP Event Collector(HEC)에서
  로그를 수집하는 방법을 알아보세요.
disable_toc: false
products:
- icon: logs
  name: 로그
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Splunk HTTP Event Collector(HEC) 소스
---
{{< product-availability >}}

## 개요 {#overview}

Observability Pipelines의 Splunk HTTP Event Collector(HEC) 소스를 사용하여 Splunk HEC에서 로그를 수신하세요. HEC 토큰을 이벤트 메타데이터로 저장하고 다음을 수행하도록 선택할 수 있습니다.

- 이벤트와 함께 전송된 원래 토큰을 사용하여 Observability Pipelines에서 Splunk HEC로 로그를 전송합니다.
- Enrichment Table 프로세서를 사용하여 메타데이터의 토큰을 기반으로 조회 파일에서 로그 필드를 추가한 다음, 해당 필드의 값을 기반으로 로그를 처리하고 라우팅합니다.

**참고**:
- Worker는 수신한 저장된 HEC 토큰을 다음 구성 요소로 전달합니다.
- 저장된 Splunk HEC 토큰은 [Live Capture][9]에 표시되지 않습니다.
- Splunk Distribution of the OpenTelemetry Collector에서 Observability Pipelines로 [로그를 전송](#send-logs-from-the-splunk-distribution-of-the-opentelemetry-collector-to-observability-pipelines)하려면 Splunk HEC 소스를 사용하세요.

## 전제 조건 {#prerequisites}

{{% observability_pipelines/prerequisites/splunk_hec %}}

## 설정 {#setup}

<div class="alert alert-danger">시크릿 관리: Splunk HEC 주소의 식별자와 해당하는 경우 TLS 키 암호 및 인증 토큰 키만 입력하세요. 실제 값은 <b>입력하지 마세요</b>.</div>

[파이프라인을 설정할 때][1] 이 소스를 설정하세요. 파이프라인은 [UI][6], [API][7] 또는 [Terraform][8]을 사용하여 설정할 수 있습니다. 이 섹션의 지침은 UI에서 소스를 설정하기 위한 것입니다.

파이프라인 UI에서 Splunk HEC 소스를 선택한 후:

1. Splunk HEC 주소의 식별자를 입력하세요. 비워두면 [기본값](#secret-defaults)이 사용됩니다.
1. 다음 중 하나를 수행하려는 경우에만 {{< ui >}}Store HEC token{{< /ui >}}을 활성화하세요.
    - {{< ui >}}From Source{{< /ui >}} 토큰 전략과 함께 Splunk HEC 대상을 사용하세요.
    - Enrichment Table 프로세서를 사용하여 로컬 파일에서 Splunk HEC 토큰을 매핑하세요.

{{% observability_pipelines/secrets_env_var_note %}}

### 선택적 설정 {#optional-settings}

#### TLS 활성화 {#enable-tls}

{{% observability_pipelines/tls_settings %}}

{{% observability_pipelines/tls_settings_mtls %}}

#### 인증 토큰 구성 {#configure-authentication-tokens}

HTTP 요청의 인증 헤더에 Splunk HEC 토큰을 저장하는 경우, 들어오는 HTTP 요청에 유효한 토큰이 있는지 검사하도록 Observability Pipelines를 구성할 수 있습니다. 유효한 토큰이 없는 요청 이벤트는 삭제됩니다.

인증 토큰을 구성하려면 {{< ui >}}Configure authentication tokens{{< /ui >}} 토글을 활성화하세요.

1.  {{< ui >}}Manage Tokens{{< /ui >}}를 클릭한 다음 {{< ui >}}Add Token{{< /ui >}}을 클릭하세요.
1. 토큰 키의 식별자를 입력합니다.<br>**참고**: 환경 변수를 사용하는 경우 이 토큰에 대한 환경 변수는 입력한 식별자 앞에 `DD_OP_`를 붙인 값입니다.
1. (선택 사항) 이 특정 토큰으로 인증에 성공한 로그에 추가 정보를 더하려면 필드와 값을 입력합니다.

## 시크릿 기본값 {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "시크릿 관리" %}}

- Splunk HEC 주소 식별자:
	- Observability Pipelines Worker가 원래 Splunk 인덱서로 전송될 로그를 수신하기 위해 수신 대기하는 바인딩 주소(예: `0.0.0.0:8088`)를 참조합니다.
	- 기본 식별자는 `SOURCE_SPLUNK_HEC_ADDRESS`입니다.
- Splunk HEC TLS 암호 식별자(TLS가 활성화된 경우):
	- 기본 식별자는 `SOURCE_SPLUNK_HEC_KEY_PASS`입니다.

{{% /tab %}}

{{% tab "환경 변수" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/splunk_hec %}}

{{% /tab %}}
{{< /tabs >}}

{{% observability_pipelines/log_source_configuration/splunk_hec %}}

## Splunk Distribution of the OpenTelemetry Collector에서 Observability Pipelines로 로그 전송 {#send-logs-from-the-splunk-distribution-of-the-opentelemetry-collector-to-observability-pipelines}

Splunk Distribution of the OpenTelemetry Collector에서 로그를 전송하려면:

1. 환경에 따라 Splunk OpenTelemetry Collector를 설치하세요.
    - [Kubernetes][2]
    - [Linux][3]
1. [파이프라인 설정][4]에 [Splunk HEC 소스](#set-up-the-source-in-the-pipeline-ui)를 사용하세요.
1. Splunk OpenTelemetry Collector를 구성하세요.
    ```bash
    cp /etc/otel/collector/splunk-otel-collector.conf.example etc/otel/collector/splunk-otel-collector.conf
    ```
    ```bash
    # Splunk HEC endpoint URL, if forwarding to Splunk Observability Cloud
    # SPLUNK_HEC_URL=https://ingest.us0.signalfx.com/v1/log
    # If you're forwarding to a Splunk Enterprise instance running on example.com, with HEC at port 8088:
    SPLUNK_HEC_URL=http://<OPW_HOST>:8088/services/collector
    ```
   -  `<OPW_HOST>`는 Observability Pipelines Worker와 연결된 호스트(또는 로드 밸런서)의 IP 또는 URL입니다.
        - CloudFormation 설치의 경우 `LoadBalancerDNS` CloudFormation 출력에 사용할 올바른 URL이 포함되어 있습니다.
        - Kubernetes 설치의 경우 Observability Pipelines Worker 서비스의 내부 DNS 레코드를 사용할 수 있습니다(예: `opw-observability-pipelines-worker.default.svc.cluster.local`).

**참고**: 방화벽을 사용하는 경우 방화벽이 Splunk OpenTelemetry Collector에서 Worker로의 트래픽을 허용하는지 확인하세요.

[1]: /ko/observability_pipelines/configuration/set_up_pipelines/
[2]: https://help.splunk.com/en/splunk-observability-cloud/manage-data/splunk-distribution-of-the-opentelemetry-collector/get-started-with-the-splunk-distribution-of-the-opentelemetry-collector/collector-for-kubernetes
[3]: https://help.splunk.com/en/splunk-observability-cloud/manage-data/splunk-distribution-of-the-opentelemetry-collector/get-started-with-the-splunk-distribution-of-the-opentelemetry-collector/collector-for-linux
[4]: /ko/observability_pipelines/configuration/set_up_pipelines
[6]: https://app.datadoghq.com/observability-pipelines
[7]: /ko/api/latest/observability-pipelines/
[8]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[9]: /ko/observability_pipelines/configuration/live_capture/