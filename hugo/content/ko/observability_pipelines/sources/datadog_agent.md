---
description: Observability Pipelines Worker를 사용하여 Datadog Agent에서 로그, 메트릭 또는 트레이스를
  수집하는 방법을 알아보세요.
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/manage-metrics-cost-control-with-observability-pipelines
  tag: 블로그
  text: Observability Pipelines를 사용하여 환경 내의 메트릭 볼륨과 태그 관리하기
products:
- icon: logs
  name: 로그
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
- icon: metrics
  name: 메트릭
  url: /observability_pipelines/configuration/?tab=metrics#pipeline-types
title: Datadog Agent 소스
---
{{< product-availability >}}

## 개요 {#overview}

Observability Pipelines의 Datadog Agent 소스를 사용하여 Datadog Agent에서 로그 또는 메트릭을 수신하세요.

**참고**:
- Datadog Distribution of OpenTelemetry(DDOT) Collector를 사용하여 로그 또는 메트릭을 수집하는 경우, [OpenTelemetry 소스를 사용하여 해당 데이터를 Observability Pipelines로 전송][4]해야 합니다.
- Datadog Agent는 `source` 및 `tags`가 아닌 `ddsource` 및 `ddtags`로 태그가 지정된 로그와 메트릭을 전송합니다. 이러한 이벤트에 대한 프로세서 쿼리나 필터를 정의할 때는 대신 `ddsource`와 `ddtags`를 사용하세요.

## 전제 조건 {#prerequisites}

{{% observability_pipelines/prerequisites/datadog_agent %}}

## 설정 {#setup}

<div class="alert alert-danger">시크릿 관리: Datadog Agent 주소에 대한 식별자만 입력하고, 해당하는 경우 TLS 키 암호를 입력하세요. 실제 값은 <b>입력하지 마세요</b>. 설정 방법은 <a href="/observability_pipelines/configuration/secrets_management/">시크릿 관리</a>를 참조하세요.</div>

[파이프라인을 설정할 때][1] 이 소스를 설정하세요. 파이프라인은 [UI][6], [API][7] 또는 [Terraform][8]을 사용하여 설정할 수 있습니다. 이 섹션의 지침은 UI에서 소스를 설정하기 위한 것입니다.

파이프라인 UI에서 Datadog Agent 소스를 선택한 후 Datadog Agent 주소에 대한 식별자를 입력하세요. 이 식별자는 `<OPW_HOST>:8282`와 같이 수신 Agent 연결을 위해 Worker가 수신 대기하는 바인드 주소를 참조합니다. 식별자 필드를 비워 두면 [기본값](#secret-defaults)이 사용됩니다.

{{% observability_pipelines/secrets_env_var_note %}}

### 선택 사항 TLS 설정 {#optional-tls-settings}

{{% observability_pipelines/tls_settings %}}

## 시크릿 기본값 {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "시크릿 관리" %}}

- Datadog Agent 주소 식별자:
    - Datadog Agent로부터 로그를 수신하기 위해 Observability Pipelines Worker가 수신 대기하는 바인드 주소를 참조합니다.
    - 기본 식별자는 `SOURCE_DATADOG_AGENT_ADDRESS`입니다.
- Datadog Agent TLS 암호 식별자(TLS가 활성화된 경우):
    - 기본 식별자는 `SOURCE_DATADOG_AGENT_KEY_PASS`입니다.

{{% /tab %}}

{{% tab "환경 변수" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/datadog_agent %}}

{{% /tab %}}
{{< /tabs >}}

## Datadog Agent를 Observability Pipelines Worker에 연결 {#connect-the-datadog-agent-to-the-observability-pipelines-worker}

{{< tabs >}}
{{% tab "로그" %}}

Agent 구성 파일 또는 Agent Helm 차트 값 파일을 사용하여 Datadog Agent를 Observability Pipelines Worker에 연결합니다.

**참고**: Agent가 Docker 컨테이너에서 실행 중인 경우 `DD_CONTAINER_EXCLUDE_LOGS` 환경 변수를 사용하여 Observability Pipelines 로그를 제외해야 합니다. Helm을 사용하는 경우 `datadog.containerExcludeLogs`를 사용합니다. 이렇게 하면 Worker가 자체 로그를 Datadog으로 직접 전송하기 때문에 발생하는 중복 로그를 방지할 수 있습니다. 자세한 내용은 [Docker 로그 수집][1] 또는 [Helm용 환경 변수 설정][2]을 참조하세요.

{{% collapse-content title="Agent 구성 파일" level="h3" expanded=false id="logs-agent-config-file" %}}

{{% observability_pipelines/log_source_configuration/datadog_agent %}}

{{% /collapse-content %}}

{{% collapse-content title="Agent Helm 값 파일" level="h3" expanded=false id="logs-agent-helm-values-file" %}}

{{% observability_pipelines/log_source_configuration/datadog_agent_kubernetes %}}

{{% /collapse-content %}}

[1]: /ko/containers/docker/log/?tab=containerinstallation#linux
[2]: /ko/containers/guide/container-discovery-management/?tab=helm#setting-environment-variables

{{% /tab %}}

{{% tab "메트릭" %}}

Agent 구성 파일 또는 Agent Helm 차트 값 파일을 사용하여 Datadog Agent를 Observability Pipelines Worker에 연결합니다.

**참고**: Agent가 Docker 컨테이너에서 실행 중인 경우 `DD_CONTAINER_EXCLUDE_METRICS` 환경 변수를 사용하여 활용도 및 이벤트 유입/유출 메트릭과 같은 Observability Pipelines 메트릭을 제외해야 합니다. Helm을 사용하는 경우 `datadog.containerExcludeMetrics`를 사용합니다. 이렇게 하면 Worker가 자체 메트릭을 Datadog으로 직접 전송하기 때문에 발생하는 중복 메트릭을 방지할 수 있습니다. 자세한 내용은 [Docker 메트릭 수집][1] 또는 [Helm용 환경 변수 설정][2]을 참조하세요.

{{% collapse-content title="Agent 구성 파일" level="h3" expanded=false id="metrics-agent-config-file" %}}

Datadog Agent 메트릭을 Observability Pipelines Worker로 전송하려면 [Agent 구성 파일][1]을 다음 내용으로 업데이트합니다.

```
observability_pipelines_worker:
  metrics:
    enabled: true
    url: "http://<OPW_HOST>:8383"

```

`<OPW_HOST>`는 Observability Pipelines Worker와 연결된 호스트 IP 주소 또는 로드 밸런서 URL입니다.
- CloudFormation 설치의 경우 `LoadBalancerDNS` CloudFormation 출력을 URL로 사용합니다.
- Kubernetes 설치의 경우 Observability Pipelines Worker 서비스의 내부 DNS 레코드를 사용할 수 있습니다. 예: `http://opw-observability-pipelines-worker.default.svc.cluster.local:<PORT>`.

**참고**: Worker가 포트 8282에서 로그를 수신 대기 중인 경우, 메트릭에는 8383과 같은 다른 포트를 사용해야 합니다.

[Agent를 재시작][2]하면 관측 가능성 데이터가 Worker로 전송되고, 파이프라인에서 처리된 후 Datadog으로 전달됩니다.

[1]: /ko/agent/configuration/agent-configuration-files/
[2]: /ko/agent/configuration/agent-commands/#restart-the-agent

{{% /collapse-content %}}

{{% collapse-content title="Agent Helm 값 파일" level="h3" expanded=false id="metrics-agent-helm-values-file" %}}

Datadog Agent 메트릭을 Observability Pipelines Worker로 전송하려면 Datadog Helm 차트 [datadog-values.yaml][1]을 다음 환경 변수로 업데이트합니다. 자세한 내용은 [Agent 환경 변수][2]를 참조하세요.

```
datadog:
  env:
    - name: DD_OBSERVABILITY_PIPELINES_WORKER_METRICS_ENABLED
      value: true
    - name: DD_OBSERVABILITY_PIPELINES_WORKER_METRICS_URL
      value: "http://<OPW_HOST>:8383"
```

`<OPW_HOST>`는 Observability Pipelines Worker와 연결된 호스트 IP 주소 또는 로드 밸런서 URL입니다.

 Kubernetes 설치의 경우 Observability Pipelines Worker 서비스의 내부 DNS 레코드를 사용할 수 있습니다. 예: `http://opw-observability-pipelines-worker.default.svc.cluster.local:<PORT>`.

**참고**: Worker가 포트 8282에서 로그를 수신 대기 중인 경우, 메트릭에는 8383과 같은 다른 포트를 사용해야 합니다.

[1]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml
[2]: https://docs.datadoghq.com/ko/agent/guide/environment-variables/

{{% /collapse-content %}}

[1]: /ko/containers/docker/data_collected/
[2]: /ko/containers/guide/container-discovery-management/?tab=helm#setting-environment-variables

{{% /tab %}}
{{< /tabs >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/observability_pipelines/configuration/set_up_pipelines/
[4]: /ko/observability_pipelines/sources/opentelemetry/#send-data-from-the-datadog-distribution-of-opentelemetry-collector-to-observability-pipelines
[5]: /ko/observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/
[6]: https://app.datadoghq.com/observability-pipelines
[7]: /ko/api/latest/observability-pipelines/
[8]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline