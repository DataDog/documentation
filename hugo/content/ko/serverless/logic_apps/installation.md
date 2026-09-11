---
description: Datadog Azure Automated Log Forwarding와 선택적 APM 보존 필터를 사용하여 Azure Logic
  Apps에 대한 트레이스 및 로그 전달을 설정합니다.
further_reading:
- link: /integrations/azure/
  tag: 설명서
  text: Azure 통합
- link: /logs/guide/azure-automated-log-forwarding/
  tag: 설명서
  text: Azure Automated Log Forwarding
title: Azure Logic Apps용 Serverless Monitoring 설치
---
{{< callout url="https://www.datadoghq.com/product-preview/serverless-monitoring-for-azure-logic-apps/"
 btn_hidden="false" header="미리 보기에 참여하세요!">}}
Azure Logic Apps용 Serverless Monitoring은 미리 보기로 제공되고 있습니다. 액세스를 요청하려면 양식을 작성하세요.
{{< /callout >}}

Azure Logic Apps는 완전 관리형 서비스이므로 Datadog Agent를 Logic Apps에 직접 설치할 수 없습니다. 하지만 Datadog은 Azure 진단 로그를 통해 Logic Apps를 모니터링할 수 있습니다.

## 전제 조건 {#prerequisites}

- [Azure Automated Log Forwarding][1] 서비스가 설치되어 있어야 합니다.

## 설정 {#setup}

### 1. Datadog Azure Automated Log Forwarding 설치 {#1-install-datadog-azure-automated-log-forwarding}

[Azure Automated Log Forwarding 가이드][1]의 지침에 따라 서비스를 설치하고 의도한 리소스 로그를 필터링하기 위한 태그를 설정합니다. 설치가 완료되면 모든 새 Logic Apps는 진단 로그를 Datadog으로 보내도록 로그 전달이 자동으로 구성됩니다.

**참고**: Azure Automated Log Forwarding 서비스는 각 Logic App에 `datadog_log_forwarding_<ID>`이라는 진단 설정을 생성합니다. 이 설정은 워크플로 실행 로그를 캡처하여 Datadog으로 전달합니다.

### 2. 태그 구성(선택 사항이지만 권장됨) {#2-configure-tags-optional-but-recommended}

Datadog에서 워크플로를 구성하고 필터링하려면 Logic Apps에 `service` 및 `env` 태그를 추가합니다.

1. Azure Portal에서 Logic App을 여세요.
2. {{< ui >}}Tags{{< /ui >}} 섹션으로 이동하세요.
3. 다음 태그를 추가하세요.
   - `env`: 환경 이름(예: `dev`, `staging` 또는 `prod`)
   - `service`: Logic App의 서비스 이름입니다.

{{< img src="serverless/logic_apps/tags_configuration.png" alt="env 및 service 태그를 보여주는 Azure Logic App 태그 구성" style="width:100%;" >}}

`env` 태그는 Datadog에서 트레이스를 확인하기 위해 필수이며, 설정하지 않으면 기본값은 `dev`입니다. `service` 태그는 설정하지 않으면 Logic App의 워크플로 이름이 기본값으로 지정됩니다.

### 3. 워크플로 호출 {#3-invoke-the-workflow}

로그 전달을 구성한 후, Logic App 워크플로를 몇 번 호출하여 실행 데이터를 생성하세요.

### 4. Datadog에서 트레이스 확인 {#4-verify-traces-in-datadog}

Datadog APM의 Live Search를 사용하여 트레이스가 수신되고 있는지 확인하세요.

1. Datadog에서 [APM > Traces][4]로 이동하세요.
2. `operation_name:azure.logicapps` 쿼리를 사용하여 Logic Apps 트레이스를 필터링하세요.
3. Live Search는 샘플링 없이 모든 스팬을 반환하므로, 실행이 완료된 후 실행 데이터를 확인할 수 있습니다.

{{< img src="serverless/logic_apps/apm_live_search.png" alt="Datadog APM Live Search에서 azure.logicapps 트레이스를 표시합니다." style="width:100%;" >}}

## 추가 구성 {#additional-configuration}

### APM 스팬에 대한 보존 필터 추가(권장){#add-a-retention-filter-for-apm-spans-recommended}

기본 라이브 검색 기간 이후에도 보존할 트레이스를 지정하려면 보존 필터를 추가하세요.

1. Datadog에서 {{< ui >}}Retention Filters{{< /ui >}}를 검색(Cmd+K를 누르고 'retention filters'를 입력)합니다.
2. {{< ui >}}Add Retention Filter{{< /ui >}}를 클릭하세요.
3. 필터 쿼리를 `operation_name:azure.logicapps`으로 설정하세요.
4. `service:<SERVICE_NAME>` 및 `env:<ENV_NAME>`과 같이 서비스에 대한 추가 필터를 추가하세요.
5. 필요에 따라 보존율을 구성하세요.

{{< img src="serverless/logic_apps/retention_filter_search.png" alt="Datadog에서 Retention Filters 검색하기" style="width:80%;" >}}

{{< img src="serverless/logic_apps/retention_filter_configuration.png" alt="operation_name:azure.logicapps 쿼리로 보존 필터 구성하기" style="width:100%;" >}}

보존 필터에 서비스 및 env 태그를 추가하면 중요한 환경과 서비스에 대한 트레이스만 보존하여 비용을 절감할 수 있습니다.

자세한 내용은 [트레이스 보존][5]을 참조하세요.

### 로그 인덱스 추가(권장) {#add-a-log-index-recommended}

이전 Logic Apps 로그를 검색하고 분석하려면 전용 로그 인덱스를 만드세요.

1. Datadog에서 {{< ui >}}Indexes{{< /ui >}}검색(Cmd+K를 누르고 'index'를 입력)합니다.
2. {{< ui >}}Logs{{< /ui >}} > {{< ui >}}Configuration{{< /ui >}} > {{< ui >}}Indexes{{< /ui >}}로 이동합니다.
3. {{< ui >}}New Index{{< /ui >}}을 클릭하세요.
4. 필터를 `@properties.resource.workflowId:*`로 설정하세요.
5. 인덱스 이름 및 보존 설정을 구성하세요.

{{< img src="serverless/logic_apps/log_index_search.png" alt="Datadog에서 로그 인덱스 검색하기" style="width:80%;" >}}

{{< img src="serverless/logic_apps/log_index_configuration.png" alt="workflowId 필터로 로그 인덱스 구성하기" style="width:100%;" >}}

{{% serverless/log_to_trace_indexing_note %}}

자세한 내용은 [로그 인덱스][6]를 참조하세요.

## Datadog에서 Logic App 트레이스 확인 {#see-your-logic-app-traces-in-datadog}

Logic App을 호출한 후:

1. Datadog에서 [{{< ui >}}APM > Traces{{< /ui >}}][4]로 이동하세요.
2. 페이지 오른쪽 상단에서 {{< ui >}}Live Search{{< /ui >}}를 선택하세요.
3. `operation_name:azure.logicapps`를 검색하여 트레이스를 찾으세요.

트레이스가 보이지 않으면 [문제 해결][7]을 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/logs/guide/azure-automated-log-forwarding/
[3]: /ko/integrations/azure/
[4]: https://app.datadoghq.com/apm/traces?query=operation_name%3Aazure.logicapps
[5]: /ko/tracing/trace_pipeline/trace_retention/
[6]: /ko/logs/log_configuration/indexes/
[7]: /ko/serverless/logic_apps/troubleshooting