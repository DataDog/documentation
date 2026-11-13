---
aliases:
- /ko/observability_pipelines/destinations/splunk_hec/
code_lang: logs
description: Observability Pipelines에서 로그를 위한 Splunk HEC 목적지를 설정하는 방법을 알아보세요.
disable_toc: false
title: Splunk HTTP Event Collector(HEC) 목적지
type: multi-code-lang
weight: 1
---
## 개요 {#overview}

Observability Pipelines의 Splunk HTTP Event Collector(HEC) 목적지를 사용하여 Splunk HEC로 로그를 전송하세요.

**참고**: Observability Pipelines는 gzip(레벨 6) 알고리즘으로 로그를 압축합니다.

## 설정 {#setup}

<div class="alert alert-danger">시크릿 관리의 경우 Splunk HEC 토큰 및 엔드포인트의 식별자만 입력하세요. 실제 값을 입력하지 <b>마세요</b>.</div>

[파이프라인을 설정][5]할 때 Splunk HEC 목적지를 구성하세요. 파이프라인은 [UI][1]에서 설정할 수 있으며, [API][6] 또는 [Terraform][7]을 통해 설정할 수 있습니다. 이 섹션에서 설명한 단계는 UI에서 구성합니다.

파이프라인 UI에서 Splunk HEC 목적지를 선택한 후 다음 단계를 따르세요.

1. {{< ui >}}Token strategy{{< /ui >}} 드롭다운 메뉴에서 다음을 설정합니다.
	- [Splunk HEC 소스][8]를 사용 중이고 소스에서 {{< ui >}}Store HEC token{{< /ui >}}을 활성화한 경우에만 {{< ui >}}From Source{{< /ui >}}를 선택합니다. 그렇지 않으면 오류가 발생하여 Worker 설치를 진행할 수 없습니다. 이 옵션은 Observability Pipelines에서 수신한 토큰을 Splunk HEC 목적지으로 전달합니다.
	- 기본 {{< ui >}}Custom{{< /ui >}} 토큰 전략을 사용하는 경우 토큰의 식별자를 입력하세요. 비워두면 [기본값](#secret-defaults)이 사용됩니다.
1. 엔드포인트 URL의 식별자를 입력합니다. 비워두면 [기본값](#secret-defaults)이 사용됩니다.
1. 드롭다운 메뉴에서 {{< ui >}}Encoding{{< /ui >}}을 선택합니다({{< ui >}}JSON{{< /ui >}} 또는 {{< ui >}}Raw{{< /ui >}}).
	- {{< ui >}}JSON{{< /ui >}}을 선택한 경우, 필요시 {{< ui >}}Add Field{{< /ui >}}를 클릭하여 [인덱싱된 필드][4]로 추출할 필드를 지정하세요. Splunk HTTP Event Collector는 로그를 수집할 때 지정된 필드를 인덱싱합니다.
	- **참고**: {{< ui >}}Raw{{< /ui >}} [엔드포인트 대상](#endpoint-target)은 {{< ui >}}Index Fields{{< /ui >}}를 지원하지 않습니다.

{{% observability_pipelines/secrets_env_var_note %}}

### 선택적 설정 {#optional-settings}

#### Splunk 인덱스{#splunk-index}

데이터를 넣을 Splunk 인덱스의 이름을 입력하세요. 이 인덱스는 HEC에서 허용된 인덱스여야 합니다. 로그의 특정 필드를 기반으로 서로 다른 인덱스로 로그를 라우팅하려면 [템플릿 구문][3]을 참조하세요.

#### 엔드포인트 대상{#endpoint-target}

{{< ui >}}Endpoint Target{{< /ui >}} 드롭다운 메뉴에서 Splunk HEC 엔드포인트를 선택하여 이벤트를 보냅니다.
- {{< ui >}}Event{{< /ui >}}(기본값): 자동 추출된 타임스탬프와 인덱싱된 필드를 지원하는 Splunk의 `/event` HEC 엔드포인트로 이벤트를 보냅니다.
- {{< ui >}}Raw{{< /ui >}}: Splunk의 `/raw` HEC 엔드포인트로 이벤트를 보냅니다.

#### 타임스탬프 자동 추출 {#auto-extract-timestamp}

타임스탬프를 자동으로 추출할지 여부를 선택하세요. `true`로 설정하면 Splunk는 `yyyy-mm-dd hh:mm:ss`의 예상 형식으로 메시지에서 타임스탬프를 추출합니다.

**참고**: {{< ui >}}Raw{{< /ui >}} [엔드포인트 대상](#endpoint-target)은 {{< ui >}}Auto-extract timestamp{{< /ui >}}를 지원하지 않습니다.

#### 소스 유형 재정의 {#sourcetype-override}

`sourcetype`을 설정하여 Splunk의 기본값을 재정의하세요. 기본값은 HEC 데이터의 경우 `httpevent`입니다. 로그의 특정 필드를 기반으로 로그를 다른 소스 유형으로 라우팅하려면 [템플릿 구문][3]을 참조하세요.

#### 버퍼링 {#buffering}

{{% observability_pipelines/destination_buffer %}}

## 시크릿 기본값 {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "시크릿 관리" %}}

{{% observability_pipelines/splunk_hec_secrets %}}

{{% /tab %}}

{{% tab "환경 변수" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/splunk_hec %}}

{{% /tab %}}
{{< /tabs >}}

## 문제 해결 {#troubleshooting}

### 401 Unauthorized 오류 {#401-unauthorized-errors}

{{% observability_pipelines/splunk_hec_unauthorized_error %}}

## 상태 메트릭 {#health-metrics}

모든 목적지에서 내보내는 [구성 요소 메트릭][9] 및 [목적지 버퍼 메트릭][10]에 대해서는 [Pipelines 사용량 메트릭][11] 문서를 참조하세요.

### Splunk HEC 메트릭 {#splunk-hec-metrics}

- `component_id` 태그를 사용하여 개별 구성 요소별로 필터링하거나 그룹화하세요.
- `component_type` 태그는 Splunk HEC 메트릭의 경우 `splunk_hec_logs`입니다.

`pipelines.splunk_pending_acks`
: **설명**: 응답을 기다리는 미해결 Splunk HEC 인덱서 승인 수입니다.
: **메트릭 유형**: 게이지

## 목적지의 작동 방식 {#how-the-destination-works}

### 이벤트 배치 처리{#event-batching}

이벤트 배치는 다음 중 하나의 파라미터를 충족하면 플러시됩니다. 자세한 내용은 [목적지 이벤트 배치 처리][2]를 참조하세요.

| 최대 이벤트 | 최대 크기(MB) | 타임아웃(초)   |
|----------------|-------------------|---------------------|
| 없음           | 1                 | 1                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /ko/observability_pipelines/destinations/#event-batching
[3]: /ko/observability_pipelines/destinations/#template-syntax
[4]: https://help.splunk.com/en/splunk-enterprise/get-started/get-data-in/9.0/get-data-with-http-event-collector/automate-indexed-field-extractions-with-http-event-collector
[5]: /ko/observability_pipelines/configuration/set_up_pipelines/
[6]: /ko/api/latest/observability-pipelines/
[7]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[8]: /ko/observability_pipelines/sources/splunk_hec/
[9]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[10]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#destination-buffer-metrics
[11]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/