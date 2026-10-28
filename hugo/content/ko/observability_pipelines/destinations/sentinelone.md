---
description: Observability Pipelines Worker를 사용하여 SentinelOne으로 로그를 전송하는 방법을 알아보십시오.
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/observability-pipelines-sentinelone/
  tag: 블로그
  text: Observability Pipelines로 EDR 로그를 최적화하고 SentinelOne으로 라우팅하십시오.
products:
- icon: logs
  name: 로그
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: SentinelOne 목적지
---
{{< product-availability >}}

## 개요 {#overview}

Observability Pipelines의 SentinelOne 목적지를 사용하여 SentinelOne으로 로그를 전송하십시오.

## 설정 {#setup}

<div class="alert alert-danger">시크릿 관리: 토큰의 식별자만 입력하십시오. 실제 값은 <b>입력하지 마세요.</b></div>

[파이프라인을 설정][4]할 때 SentinelOne 목적지를 구성하십시오. 파이프라인은 [UI][1]에서 설정할 수 있으며, [API][5] 또는 [Terraform][6]을 사용하여 설정할 수 있습니다. 이 섹션에서 설명하는 단계는 UI에서 설정합니다.

파이프라인 UI에서 SentinelOne 목적지를 선택한 후:

1. 토큰의 식별자를 입력하십시오. 비워두면 [기본값](#secret-defaults)이 사용됩니다.
1. 드롭다운 메뉴에서 SentinelOne 로그 환경을 선택하십시오.

{{% observability_pipelines/secrets_env_var_note %}}

### 선택적 버퍼링 {#optional-buffering}

{{% observability_pipelines/destination_buffer %}}

## 시크릿 기본값 {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "시크릿 관리" %}}

- SentinelOne 쓰기 액세스 토큰 식별자:
	- 기본 식별자는 `DESTINATION_SENTINEL_ONE_TOKEN`입니다.

{{% /tab %}}

{{% tab "환경 변수" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/sentinelone %}}

{{% /tab %}}
{{< /tabs >}}

## SentinelOne 클러스터에서 로그를 조회하십시오 {#view-logs-in-a-sentinelone-cluster}

SentinelOne 목적지로 로그를 전송하도록 파이프라인을 설정한 후, SentinelOne 클러스터에서 로그를 조회할 수 있습니다:

1. [S1 콘솔][2]에 로그인합니다.
2. Singularity Data Lake (SDL) {{< ui >}}Search{{< /ui >}} 페이지로 이동합니다. 콘솔에서 액세스하려면 왼쪽 메뉴에서 {{< ui >}}Visibility{{< /ui >}}을 클릭하여 SDL로 이동한 다음, {{< ui >}}Search{{< /ui >}} 탭에 있는지 확인하십시오.
3. 검색 창 옆의 필터가 {{< ui >}}All Data{{< /ui >}}로 설정되어 있는지 확인하십시오.
4. 이 페이지에는 Observability Pipelines에서 SentinelOne으로 전송한 로그가 표시됩니다.

## 상태 메트릭 {#health-metrics}

모든 목적지에서 내보내는 [구성 요소 메트릭][7] 및 [목적지 버퍼 메트릭][8]에 대해서는 [Pipelines 사용량 메트릭][9] 설명서를 참조하세요. Splunk HEC 목적지 메트릭을 필터링하거나 그룹화하려면 `component_type:splunk_hec_logs` 태그를 사용하십시오.

## 목적지의 작동 방식 {#how-the-destination-works}

### 이벤트 배치 처리 {#event-batching}

이벤트 배치는 다음 중 하나의 파라미터를 충족하면 플러시됩니다. 자세한 내용은 [목적지 이벤트 배치 처리][3]를 참조하십시오.

| 최대 이벤트 | 최대 크기(MB) | 타임아웃(초)   |
|----------------|-------------------|---------------------|
| 없음           | 1                 | 1                   |

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/observability-pipelines
[2]: https://usea1-partners.sentinelone.net/login
[3]: /ko/observability_pipelines/destinations/#event-batching
[4]: /ko/observability_pipelines/configuration/set_up_pipelines/
[5]: /ko/api/latest/observability-pipelines/
[6]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[7]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[8]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#destination-buffer-metrics
[9]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/