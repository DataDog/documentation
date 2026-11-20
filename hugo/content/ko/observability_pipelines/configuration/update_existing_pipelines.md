---
aliases:
- /ko/observability_pipelines/update_existing_pipelines/
disable_toc: false
title: 기존 파이프라인 업데이트
---
## 개요 {#overview}

Observability Pipelines의 기존 파이프라인의 경우, Observability Pipelines UI에서 소스 설정, 대상 설정 및 프로세서에 대한 변경 사항을 업데이트하고 배포할 수 있습니다. 하지만 환경 변수를 사용 중이고 소스 및 대상 환경 변수를 업데이트하려는 경우, 새 값으로 Worker를 수동 업데이트해야 합니다.

이 문서에서는 UI에서 파이프라인을 업데이트하는 방법을 설명합니다. [파이프라인 업데이트][2] API 또는 [datadog_observability_pipeline][3] Terraform 리소스를 사용하여 기존 파이프라인을 업데이트할 수도 있습니다.

UI에서 업데이트한 파이프라인을 프로그램 방식으로 배포하는 방법은 [파이프라인 구성을 JSON 또는 Terraform으로 내보내기][4]를 참조하세요.

## 기존 파이프라인 업데이트 {#update-an-existing-pipeline}

1. [Observability Pipelines][1]로 이동합니다.
1. 업데이트하려는 파이프라인을 선택합니다.
1. 오른쪽 상단 모서리에 있는 {{< ui >}}Edit Pipeline{{< /ui >}}을 클릭합니다.
1. 파이프라인을 변경합니다.
	- 타일에 표시된 소스 또는 대상 설정을 업데이트하거나 프로세서를 업데이트 및 추가하는 경우, 변경 사항을 적용한 후 {{< ui >}}Deploy Changes{{< /ui >}}를 클릭합니다.
	- 소스 또는 대상 환경 변수를 업데이트하려면 {{< ui >}}Go to Worker Installation Steps{{< /ui >}}를 클릭하고, [소스 또는 대상 환경 변수 업데이트](#update-source-or-destination-environment-variables)를 참고하여 지침을 확인하세요.
1. 소스, 대상 또는 해당 보안 비밀을 추가, 업데이트 또는 삭제하는 경우, 변경 사항이 적용되도록 `sudo systemctl restart observability-pipelines-worker`와 같은 명령을 사용하여 Worker를 다시 시작해야 합니다.

### 소스 또는 대상 환경 변수 업데이트 {#update-source-or-destination-environment-variables}

Worker 설치 페이지에서:
1. {{< ui >}}Choose your installation platform{{< /ui >}} 드롭다운 메뉴에서 플랫폼을 선택합니다.
1. 소스 환경 변수를 업데이트하려면 소스에 대한 정보를 업데이트합니다.
{{< tabs >}}
{{% tab "Amazon Data Firehose" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/amazon_data_firehose %}}

{{% /tab %}}
{{% tab "Amazon S3" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/amazon_s3 %}}

{{% /tab %}}
{{% tab "Datadog Agent" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/datadog_agent %}}

{{% /tab %}}
{{% tab "Fluent" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/fluent %}}

{{% /tab %}}
{{% tab "Google Pub/Sub" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/google_pubsub %}}

{{% /tab %}}
{{% tab "HTTP 클라이언트" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/http_client %}}

{{% /tab %}}
{{% tab "HTTP 서버" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/http_server %}}

{{% /tab %}}
{{% tab "Kafka" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/kafka %}}

{{% /tab %}}
{{% tab "Logstash" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/logstash %}}

{{% /tab %}}
{{% tab "MySQL" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/mysql %}}

{{% /tab %}}
{{% tab "OpenTelemetry" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/opentelemetry %}}

{{% /tab %}}
{{% tab "Prometheus" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/prometheus %}}

{{% /tab %}}
{{% tab "Socket" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/socket %}}

{{% /tab %}}
{{% tab "Splunk HEC" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/splunk_hec %}}

{{% /tab %}}
{{% tab "Splunk TCP" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/splunk_tcp %}}

{{% /tab %}}
{{% tab "Sumo Logic" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/sumo_logic %}}

{{% /tab %}}
{{% tab "Syslog" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/syslog %}}

{{% /tab %}}
{{% tab "WebSocket" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/websocket %}}

{{% /tab %}}
{{< /tabs >}}
1. 대상 환경 변수를 업데이트하려면 대상에 대한 정보를 업데이트합니다.
{{< tabs >}}
{{% tab "Amazon OpenSearch" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/amazon_opensearch %}}

{{% /tab %}}
{{% tab "Amazon Security Lake" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/amazon_security_lake %}}

{{% /tab %}}
{{% tab "ClickHouse" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/clickhouse %}}

{{% /tab %}}
{{% tab "CrowdStrike NG-SIEM" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/crowdstrike_ng_siem %}}

{{% /tab %}}
{{% tab "Databricks" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/databricks_zerobus %}}

{{% /tab %}}
{{% tab "Datadog Logs" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/datadog %}}

{{% /tab %}}
{{% tab "Datadog 메트릭" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/datadog %}}

{{% /tab %}}
{{% tab "Datadog Archives" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/datadog_archives_amazon_s3 %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/datadog_archives_google_cloud_storage %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/datadog_archives_azure_storage %}}

{{% /tab %}}
{{% tab "Elasticsearch" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/elasticsearch %}}

{{% /tab %}}
{{% tab "Google Pub/Sub" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/google_pubsub %}}

{{% /tab %}}
{{% tab "Google SecOps" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/chronicle %}}

{{% /tab %}}
{{% tab "HTTP 클라이언트" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/http_client %}}

{{% /tab %}}
{{% tab "Kafka" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/kafka %}}

{{% /tab %}}
{{% tab "Microsoft Sentinel" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/microsoft_sentinel %}}

{{% /tab %}}
{{% tab "New Relic" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/new_relic %}}

{{% /tab %}}
{{% tab "OpenSearch" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/opensearch %}}

{{% /tab %}}
{{% tab "OpenTelemetry" %}}

**메트릭**

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/opentelemetry_metrics %}}

**Traces**

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/opentelemetry_traces %}}

{{% /tab %}}
{{% tab "Prometheus" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/prometheus %}}

{{% /tab %}}
{{% tab "SentinelOne" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/sentinelone %}}

{{% /tab %}}
{{% tab "Socket" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/socket %}}

{{% /tab %}}
{{% tab "Splunk HEC" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/splunk_hec %}}

{{% /tab %}}
{{% tab "Sumo Logic" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/sumo_logic %}}

{{% /tab %}}
{{% tab "Syslog" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/syslog %}}

{{% /tab %}}
{{< /tabs >}}

1. 환경에 맞는 지침에 따라 Worker를 업데이트합니다.
{{< tabs >}}
{{% tab "Docker" %}}

{{% observability_pipelines/configure_existing_pipelines/install_worker/docker %}}

{{% /tab %}}
{{% tab "Kubernetes" %}}

{{% observability_pipelines/configure_existing_pipelines/install_worker/kubernetes %}}

{{% /tab %}}
{{% tab "Linux(APT)" %}}

{{% observability_pipelines/configure_existing_pipelines/install_worker/linux_apt %}}

{{% /tab %}}
{{% tab "Linux(RPM)" %}}

{{% observability_pipelines/configure_existing_pipelines/install_worker/linux_rpm %}}

{{% /tab %}}
{{% tab "CloudFormation" %}}

{{% observability_pipelines/configure_existing_pipelines/install_worker/cloudformation %}}

{{% /tab %}}
{{< /tabs >}}

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /ko/api/latest/observability-pipelines/#update-a-pipeline
[3]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/observability_pipeline
[4]: /ko/observability_pipelines/configuration/export_pipeline_configuration/