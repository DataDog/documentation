---
description: 전체 플릿의 Datadog Agent 및 OpenTelemetry Collector를 조회하고 검사하세요.
further_reading:
- link: /agent/fleet_automation/
  tag: 설명서
  text: Fleet Automation
- link: /agent/troubleshooting/send_a_flare/
  tag: 설명서
  text: flare 전송하기
- link: /containers/kubernetes/installation/
  tag: 설명서
  text: Kubernetes에 Datadog Agent 설치하기
title: Fleet 보기
---
{{< site-region region="gov,gov2" >}}
<div class="alert alert-info">
Fleet View는 Datadog Government 사이트(US1-FED 및 US2-FED)에서 미리 보기로 제공되고 있습니다.<br><br>
Agent 구성, Agent 업그레이드 및 SDK 업그레이드와 같은 추가적인 Fleet Automation 기능은 선택한 Datadog 사이트({{< region-param key=dd_site_name >}})에서 지원되지 않습니다.
</div>
{{< /site-region >}}

[Fleet View][1]를 사용하여 호스트의 관측 가능성 격차, 오래된 Agent 또는 OTel Collector, 통합 문제가 있는 Agent를 파악하세요.

각 Datadog Agent에서 다음을 확인할 수 있습니다.
- Agent 버전
- Agent에 구성되지 않았거나 잘못 구성된 통합이 있는지 여부
- Agent가 모니터링하는 서비스
- Agent의 Remote Configuration 상태
- Agent에서 활성화된 제품
- 구성 변경, 업그레이드 및 flare를 포함한 Agent Audit Trail 이벤트

각 OTel Collector에서 다음을 확인할 수 있습니다.
- Collector 버전
- Collector 배포판
- Collector의 구성 YAML
- Collector의 파이프라인 및 토폴로지 보기

## 전제 조건 {#prerequisites}

- 구성 보기는 버전 7.47.0 이상의 Agent 및 OTel Collector에 대해 기본적으로 활성화되어 있습니다. 이전 버전에서 수동으로 활성화하려면 [Agent 구성 파일][3]에서 `inventories_configuration_enabled`를 `true`로 설정하거나 `DD_INVENTORIES_CONFIGURATION_ENABLED` 환경 변수를 사용하세요.
- Agent 통합 구성은 Agent 버전 7.49.0 이상에서 기본적으로 활성화되어 있습니다. 이전 버전에서 수동으로 활성화하려면 [Agent 구성 파일][3]에서 `inventories_checks_configuration_enabled`를 `true`로 설정하거나 `DD_INVENTORIES_CHECKS_CONFIGURATION_ENABLED` 환경 변수를 사용하세요.

<div class="alert alert-info">Fleet Automation에서는 OpenTelemetry Collector 구성, 파이프라인 및 토폴로지를 표시하려면 <a href="/opentelemetry/integrations/datadog_extension/#setup">Datadog Extension</a>이 필요합니다. 이 페이지에 설명된 OTel Collector 기능을 사용하기 전에 확장 프로그램을 구성하세요.</div>

## Datadog Agent 또는 OpenTelemetry Collector 검사 {#examine-a-datadog-agent-or-opentelemetry-collector}

Datadog Agent 또는 OTel Collector를 선택하여 구성, 연결된 통합, 감사 이벤트 및 원격 flare 전송을 위한 지원 탭을 확인하세요.

{{< img src="agent/fleet_automation/fleet-automation-view-config.png" alt="구성, 연결된 통합 및 감사 이벤트를 보여주는 Agent 세부 정보 패널입니다." style="width:100%;" >}}

## 검색 및 필터링 {#search-and-filter}

Fleet View 상단의 검색창을 사용하여 전체 플릿에서 특정 Agent, OTel Collector 또는 클러스터를 찾으세요. 여기서는 다음을 할 수 있습니다.

- 호스트 이름 또는 클러스터 이름으로 자유 텍스트 검색
- 운영 체제, 환경(`env`), 팀 및 활성화된 제품(`products_enabled`)과 같은 호스트 및 Agent 태그로 필터링

## OTel 파이프라인 시각화 {#visualize-otel-pipelines}

OTel Collector의 {{< ui >}}Configuration{{< /ui >}} 탭에는 {{< ui >}}Pipeline{{< /ui >}} 및 {{< ui >}}Topology{{< /ui >}} 보기가 포함되어 있습니다. 이러한 보기는 텔레메트리가 OTel 파이프라인을 통해 흐르는 방식에 대한 엔드투엔드 가시성을 제공합니다.

이러한 보기에 액세스하려면 다음 단계를 따르세요.

1. [**Fleet Automation**][1]으로 이동합니다.
1. OTel Collector를 필터링합니다.
1. Collector를 선택하여 세부 정보 패널을 엽니다.
1. {{< ui >}}Configuration{{< /ui >}} 탭을 클릭합니다.
1. {{< ui >}}Pipeline{{< /ui >}} 또는 {{< ui >}}Topology{{< /ui >}}를 {{< ui >}}View as{{< /ui >}} 옵션에서 선택합니다.

### 파이프라인 보기 {#pipeline-view}

{{< ui >}}Pipeline{{< /ui >}} 보기는 단일 OTel Collector에 대한 텔레메트리 파이프라인을 표시합니다. 파이프라인 보기를 사용하여 다음을 수행하세요.

- 구성된 수신기, 프로세서 및 익스포터 간의 텔레메트리 라우팅을 검증하세요
- {{< ui >}}Show traffic{{< /ui >}} 토글을 활성화하여 데이터 손실 및 병목 현상과 같은 데이터 흐름 문제를 식별합니다.
- 구성 요소 노드에 표시된 활성 모니터 경보를 검토하여 파이프라인 경보를 조사합니다.

{{< img src="/agent/fleet_automation/fleet-automation-pipeline-view.png" alt="OTel Collector 구성 요소 간의 텔레메트리 라우팅을 보여주는 파이프라인 보기입니다." style="width:100%;" >}}

### 토폴로지 보기 {#topology-view}

{{< ui >}}Topology{{< /ui >}} 보기에서는 DaemonSet 및 게이트웨이로 배포된 OTel Collector 전반의 전달 체인을 표시합니다. 토폴로지 보기를 사용하여 다음을 수행하세요.

- DaemonSet-to-gateway 아키텍처의 Collector 전반에서 텔레메트리 라우팅 검증
- {{< ui >}}Show traffic{{< /ui >}} 토글을 활성화하여 각 에지에 데이터 흐름 속도를 오버레이하고 데이터 손실 및 병목 현상 식별
- Collector 노드에 표시된 활성 모니터 경보를 검토하여 파이프라인 문제 조사

{{< img src="/agent/fleet_automation/fleet-automation-gateway-topology.png" alt="게이트웨이 Collector를 통해 Datadog으로 전달되는 DaemonSet Collector를 보여주는 토폴로지 보기입니다." style="width:100%;" >}}

## Agent Audit Trail 이벤트 보기 {#view-agent-audit-trail-events}

{{< ui >}}Audit Events{{< /ui >}} 탭에는 선택한 Agent와 관련된 Audit Trail 이벤트가 표시됩니다.
이 탭을 사용하여 다음을 수행하세요.
- 구성 변경, API 키 업데이트, 설치, 업그레이드 및 지원 flare 식별
- 변경이 이루어진 시기와 위치 확인

Audit Trail 이벤트 가시성은 플랜에 따라 다릅니다. 조직에서 Audit Trail을 활성화하면 Audit Trail 보존 설정에 따라 최대 90일 동안 Agent 이벤트를 볼 수 있습니다. 조직에서 Audit Trail을 활성화하지 않은 경우 지난 24시간 동안의 이벤트를 볼 수 있습니다.

## 원격 flare 보내기 {#send-a-remote-flare}

Agent에서 Remote Configuration을 활성화하면 Datadog Agent 또는 DDOT Collector에서 flare를 보낼 수 있습니다. 지침은 [Datadog 사이트에서 flare 보내기][2]를 참조하세요.

Remote Configuration이 활성화된 상태에서 Datadog 지원팀에 문의하면 지원팀에서 문제를 더 빠르게 해결할 수 있도록 사용자의 환경에서 flare를 실행할 수 있습니다.

{{< img src="agent/fleet_automation/fleet_automation_remote_flare.png" alt="Send Flare 버튼이 있는 Agent의 지원 탭입니다." style="width:100%;" >}}

## Kubernetes 보기 {#kubernetes-view}

Kubernetes 보기에서는 Kubernetes 환경에서 실행 중인 Datadog Agent와 OTel Collector를 확인할 수 있습니다. 호스트 기반 인프라와 컨테이너화된 인프라 전반의 플릿을 통합하여 보여줍니다.

기본적으로 Fleet View는 인프라를 개별 호스트로 나열합니다. {{< ui >}}View by infra type{{< /ui >}} 토글을 사용하여 Kubernetes 클러스터별로 Agent를 보여주는 [Kubernetes 보기][4]로 전환하세요.

각 행은 [Datadog Operator][5] 또는 Helm 차트로 관리되는 클러스터입니다. 클러스터의 Node Agent, Cluster Agent 및 Cluster Check Runner는 개별 호스트가 아닌 하나의 그룹으로 표시됩니다.

### Kubernetes 보기의 전제 조건 {#prerequisites-for-kubernetes-view}

대부분의 Kubernetes 보기 기능은 버전 요구 사항 없이 사용할 수 있습니다. 특정 기능에는 다음 요구 사항이 적용됩니다.

| 기능 | 요구 사항 |
|---|---|
| `DatadogAgent` 구성 보기 | Datadog Operator v1.24 이상 |
| Helm 차트 값 보기 | Datadog Helm 차트 v3.157.0 이상 |
| 구성 편집 | [Remote Configuration][6] 활성화 및 Datadog Operator v1.27 이상 |
| 클러스터 이름을 설정하지 않고 구성 편집 | Datadog Operator v1.30.0 이상 |
| Cluster Agent에서 통합 보기 | Agent v7.72.0 이상 |
| Cluster Agent에서 통합 상태 보기 | Agent v7.79.0 이상 |

Fleet View에서 구성을 편집하려면 [Operator 구성][7]에서 `remoteConfigEnabled`, `remoteUpdatesEnabled` 및 `createControllerRevisions` 플래그를 설정하세요. 편집하려면 Datadog API 키와 애플리케이션 키도 구성해야 합니다. Fleet View에서 Helm Chart 값을 편집하는 기능은 지원되지 않습니다.

v1.30.0 이전의 Datadog Operator 버전에서는 클러스터 이름(`clusterName`)도 설정해야 합니다. 그렇지 않으면 {{< ui >}}Edit{{< /ui >}} 버튼이 비활성화된 상태로 유지됩니다. Datadog Operator v1.30.0부터는 클러스터 이름이 선택 사항입니다.

Helm 차트로 Datadog Operator를 설치하는 경우 `previewFleetRollouts` 값을 사용하여 필요한 플래그를 함께 활성화할 수 있습니다.

{{< code-block lang="shell" >}}
helm repo add datadog https://helm.datadoghq.com
helm repo update

helm upgrade --install datadog-operator datadog/datadog-operator \
  --set previewFleetRollouts=true \
  --set apiKeyExistingSecret=datadog-secret \
  --set appKeyExistingSecret=datadog-secret \
  --devel
{{< /code-block >}}

`datadog-secret`을 Datadog API 및 애플리케이션 키가 포함된 Kubernetes Secret의 이름으로 바꾸세요. `--devel` 플래그는 차트의 최신 개발 릴리스를 설치합니다.

### Kubernetes 클러스터 보기 {#view-kubernetes-clusters}

클러스터는 클러스터 이름순으로 나열됩니다. 이 표에는 각 클러스터의 이름, 배포 방법(Datadog Operator 또는 Helm), 네임스페이스, Agent 버전, Agent 포드 상태, 준비 상태, 경과 시간 및 재시작 횟수가 나열됩니다.

특정 클러스터를 찾으려면 클러스터 이름으로 [검색](#search-and-filter)할 수 있습니다.

클러스터를 클릭하여 다음을 확인하세요.

- 환경 및 태그와 같은 클러스터 세부 정보
- 클러스터 수준 Agent(Cluster Agent 및 Cluster Check Runner)
- Node Agents

{{< ui >}}Configuration{{< /ui >}} 탭에서 다음 구성을 확인할 수 있습니다.

- **Datadog Operator v1.24 이상**: `DatadogAgent` 사용자 지정 리소스 구성 조회. Datadog Operator v1.27 이상에서는 이 탭에서 구성을 편집할 수도 있습니다.
- **Datadog Helm Chart v3.157.0 이상**: Helm Chart 값을 확인하세요(`values.yaml`).

### 제한 사항 {#limitations}

기본 보기와 비교할 때 Kubernetes 보기에는 다음과 같은 제한 사항이 있습니다.

- 원격 지원 flare를 보낼 수 없습니다.
- 실행 중인 OTel Collector는 확인할 수 있지만 Kubernetes 보기에서는 해당 구성을 확인할 수 없습니다.
- Fleet Automation API 액세스를 사용할 수 없습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/fleet
[2]: /ko/agent/troubleshooting/send_a_flare/#send-a-flare-from-the-datadog-site
[3]: /ko/agent/configuration/agent-configuration-files/
[4]: https://app.datadoghq.com/fleet?view_by=clusters
[5]: /ko/containers/datadog_operator
[6]: /ko/agent/guide/setup_remote_config
[7]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md