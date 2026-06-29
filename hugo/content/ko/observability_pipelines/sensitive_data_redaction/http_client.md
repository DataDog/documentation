---
disable_toc: false
title: HTTP Client용 민감한 데이터 삭제
---

## 개요

신용 카드 번호, 은행 라우팅 번호, API 키와 같은 민감한 데이터는 종종 로그에 의도치 않게 노출되어 조직을 재무 및 프라이버시 위험에 노출시킬 수 있습니다.

Observability Pipelines로 다른 대상 및 인프라스트럭처 외부로 로그를 라우팅하기 전에 민감한 정보를 식별하고 태그를 설정하거나 옵션으로 삭제하거나 해싱할 수 있습니다. 기본 제공 스캔 규칙으로 이메일 주소, 신용카드 번호, API 키, 인증 토큰 등과 같은 일반 패턴을 감지할 수 있습니다. 또는 정규식 패턴으로 커스텀 스캔 규칙을 생성하고 매칭을 통해 민감한 정보를 식별할 수 있습니다.

{{% observability_pipelines/use_case_images/sensitive_data_redaction %}}

본 문서에서는 다음 단계를 안내합니다.
1. Observability Pipelines를 설정하는 데 필요한 [사전 필수 조건](#prerequisites)
1. [Observability Pipelines 설정하기](#set-up-observability-pipelines)

## 사전 필수 조건

{{% observability_pipelines/prerequisites/http_client %}}

## Observability Pipelines 설정

1. [Observability Pipelines][1]로 이동합니다.
1. **Sensitive Data Redactions** 템플릿을 선택하여 새 파이프라인을 생성합니다.
1. 소스로 **HTTP Client**를 선택합니다.

### 소스 설정하기

{{% observability_pipelines/source_settings/http_client%}}

### 대상 설정하기

선택한 로그 대상에 따라 다음 정보를 입력합니다.

{{< tabs >}}
{{% tab "Datadog" %}}

{{% observability_pipelines/destination_settings/datadog %}}

{{% /tab %}}
{{% tab "Splunk HEC" %}}

{{% observability_pipelines/destination_settings/splunk_hec %}}

{{% /tab %}}
{{% tab "Sumo Logic" %}}

{{% observability_pipelines/destination_settings/sumo_logic %}}

{{% /tab %}}
{{% tab "Syslog" %}}

{{% observability_pipelines/destination_settings/syslog %}}

{{% /tab %}}
{{% tab "Chronicle" %}}

{{% observability_pipelines/destination_settings/chronicle %}}

{{% /tab %}}
{{% tab "Elasticsearch" %}}

{{% observability_pipelines/destination_settings/elasticsearch %}}

{{% /tab %}}
{{% tab "OpenSearch" %}}

{{% observability_pipelines/destination_settings/opensearch %}}

{{% /tab %}}
{{% tab "Amazon OpenSearch" %}}

{{% observability_pipelines/destination_settings/amazon_opensearch %}}

{{% /tab %}}
{{< /tabs >}}

### 프로세서 설정하기

{{% observability_pipelines/processors/intro %}}

{{% observability_pipelines/processors/filter_syntax %}}

{{% observability_pipelines/processors/add_processors_sds %}}

{{< tabs >}}
{{% tab "Filter" %}}

{{% observability_pipelines/processors/filter %}}

{{% /tab %}}
{{% tab "Edit fields" %}}

{{% observability_pipelines/processors/remap %}}

{{% /tab %}}
{{% tab "Sample" %}}

{{% observability_pipelines/processors/sample %}}

{{% /tab %}}
{{% tab "Grok Parser" %}}

{{% observability_pipelines/processors/grok_parser %}}

{{% /tab %}}
{{% tab "Quota" %}}

{{% observability_pipelines/processors/quota %}}

{{% /tab %}}
{{% tab "Reduce" %}}

{{% observability_pipelines/processors/reduce %}}

{{% /tab %}}
{{% tab "Dedupe" %}}

{{% observability_pipelines/processors/dedupe %}}

{{% /tab %}}
{{% tab "Sensitive Data Scanner" %}}

{{% observability_pipelines/processors/sensitive_data_scanner %}}

{{% /tab %}}
{{% tab "Add hostname" %}}

{{% observability_pipelines/processors/add_hostname %}}

{{% /tab %}}
{{% tab "Parse JSON" %}}

{{% observability_pipelines/processors/parse_json %}}

{{% /tab %}}
{{% tab "Enrichment table" %}}

{{% observability_pipelines/processors/enrichment_table %}}

{{% /tab %}}
{{< /tabs >}}

## Observability Pipelines Worker 설치하기
1. **Choose your installation platform** 드롭다운 메뉴에서 플랫폼을 선택합니다.
1. HTTP/S 엔드포인트 URL의 전체 경로를 입력합니다(예: `https://127.0.0.8/logs`). Observability Pipelines Worker는 이 엔드포인트에서 로그 이벤트를 수집합니다.

1. 선택한 각 대상의 환경 변수를 입력합니다. 자세한 내용은 [사전 필수 조건](#prerequisites)을 참조하세요.
{{< tabs >}}
{{% tab "Datadog" %}}

{{% observability_pipelines/destination_env_vars/datadog %}}

{{% /tab %}}
{{% tab "Splunk HEC" %}}

{{% observability_pipelines/destination_env_vars/splunk_hec %}}

{{% /tab %}}
{{% tab "Sumo Logic" %}}

{{% observability_pipelines/destination_env_vars/sumo_logic %}}

{{% /tab %}}
{{% tab "Syslog" %}}

{{% observability_pipelines/destination_env_vars/syslog %}}

{{% /tab %}}
{{% tab "Chronicle" %}}

{{% observability_pipelines/destination_env_vars/chronicle %}}

{{% /tab %}}
{{% tab "Elasticsearch" %}}

{{% observability_pipelines/destination_env_vars/elasticsearch %}}

{{% /tab %}}
{{% tab "OpenSearch" %}}

{{% observability_pipelines/destination_env_vars/opensearch %}}

{{% /tab %}}
{{% tab "Amazon OpenSearch" %}}

{{% observability_pipelines/destination_env_vars/amazon_opensearch %}}

{{% /tab %}}
{{< /tabs >}}
1. 환경에 맞는 지침에 따라 Worker를 설치합니다.
{{< tabs >}}
{{% tab "Docker" %}}

{{% observability_pipelines/install_worker/docker %}}

{{% /tab %}}
{{% tab "Amazon EKS" %}}

{{% observability_pipelines/install_worker/amazon_eks %}}

{{% /tab %}}
{{% tab "Azure AKS" %}}

{{% observability_pipelines/install_worker/azure_aks %}}

{{% /tab %}}
{{% tab "Google GKE" %}}

{{% observability_pipelines/install_worker/google_gke %}}

{{% /tab %}}
{{% tab "Linux (APT)" %}}

{{% observability_pipelines/install_worker/linux_apt %}}

{{% /tab %}}
{{% tab "Linux (RPM)" %}}

{{% observability_pipelines/install_worker/linux_rpm %}}

{{% /tab %}}
{{% tab "CloudFormation" %}}

{{% observability_pipelines/install_worker/cloudformation %}}

{{% /tab %}}
{{< /tabs >}}

[1]: https://app.datadoghq.com/observability-pipelines