---
app_id: openshift
app_uuid: e92e309f-7bdc-4ff4-91d4-975497526325
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check:
      - openshift.clusterquota.cpu.requests.used
      - openshift.clusterquota.cpu.used
      metadata_path: metadata.csv
      prefix: openshift.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10024
    source_type_name: OpenShift
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 컨테이너
- 쿠버네티스(Kubernetes)
- 로그 수집
- 네트워크
- 오케스트레이션
- 프로비저닝
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/openshift/README.md
display_on_public_website: true
draft: false
git_integration_title: openshift
integration_id: openshift
integration_title: OpenShift
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: openshift
public_title: OpenShift
short_description: 큰 아이디어를 위한 쿠버네티스(Kubernetes) 플랫폼
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Containers
  - Category::Kubernetes
  - Category::Log Collection
  - Category::Network
  - Category::Orchestration
  - Category::Provisioning
  - Supported OS::Linux
  - Offering::Integration
  configuration: README.md#Setup
  description: 큰 아이디어를 위한 쿠버네티스(Kubernetes) 플랫폼
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: OpenShift
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->
## 개요

레드햇(Red Hat) OpenShift는 엔터프라이즈 애플리케이션 개발 및 배포를 위한 쿠버네티스(Kubernetes) 컨테이너 오케스트레이터에 기반한 오픈 소스 컨테이너 애플리케이션 플랫폼입니다.

> 본 README에서는 에이전트에서 OpenShift 전용 메트릭 수집을 활성화하는 데 필요한 설정을 설명합니다. 여기에 설명된 데이터는 [`kubernetes_apiserver` 점검][1]이 수집합니다. 해당 점검을 설정하여 `openshift.*` 메트릭을 수집합니다.

## 설정

### 설치

본 코어는 OpenShift 3.11 및 OpenShift 4 모두 지원하나 OpenShift 4에서 가장 잘 작동합니다.

에이전트를 설치하려면, 일반 쿠버네티스(Kubernetes) 지침은 [에이전트 설치 지침][2]을, OpenShift 설정 예제는 [쿠버네티스(Kubernetes) 배포 페이지][3]를 참조하세요.

또는 [Datadog 오퍼레이터][4]를 사용하여 Datadog 에이전트를 설치 및 관리할 수 있습니다. Datadog 오퍼레이터는 OpenShift [OperatorHub][5]로 설치할 수 있습니다.

### 보안 컨텍스트 제약 조건 설정

위의 설치 지침에 링크된 방법 중 하나로 Datadog 에이전트를 배포하는 경우, 데이터를 수집하려면 에이전트 및 클러스터 에이전트에 대한 보안 컨텍스트 제약 조건(SCC)을 포함해야 합니다. 배포와 관련된 하단 지침을 따르세요.

{{< tabs >}}
{{% tab "Operator" %}}

OpenShift에서 Datadog 오퍼레이터 및 `DatadogAgent` 리소스를 설치하는 방법에 관한 지침은 [OpenShift 설치 지침][1]을 참조하세요.

오퍼레이터 라이프사이클 관리자(OLM)를 사용하여 오퍼레이터를 배포하는 경우, OpenShift에 있는 필수 기본 SCC가 `datadog-agent-scc` 서비스 계정과 자동 연결됩니다. 그런 다음 노드 에이전트 및 클러스터 에이전트 포드에서 본 서비스 계정을 참조하여 `DatadogAgent` CustomResourceDefinition으로 Datadog 컴포넌트를 배포할 수 있습니다.

더 많은 예제는 [배포][2] 페이지와 [오퍼레이터 리포지토리][3]를 참조하세요.

[1]: https://github.com/DataDog/datadog-operator/blob/main/docs/install-openshift.md
[2]: https://docs.datadoghq.com/ko/containers/kubernetes/distributions/?tab=datadogoperator#Openshift
[3]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/datadog-agent-on-openshift.yaml
{{% /tab %}}
{{% tab "Helm" %}}

Datadog 에이전트의 `values.yaml`에서 직접 SCC를 생성할 수 있습니다. `agents` 및 `clusterAgent` 섹션에 다음 블록 파라미터를 추가하여 각 SCC를 생성합니다.

```yaml
datadog:
  #(...)

agents:
  podSecurity:
    securityContextConstraints:
      create: true

clusterAgent:
  podSecurity:
    securityContextConstraints:
      create: true
```

에이전트를 처음 배포할 때 적용하거나, 먼저 변경한 다음 `helm upgrade`를 실행하여 SCC를 적용합니다.

더 많은 예제는 [배포][1] 페이지와 [Helm 리포지토리][2]를 참조하세요.

[1]: https://docs.datadoghq.com/ko/containers/kubernetes/distributions/?tab=datadogoperator#Openshift
[2]: https://github.com/DataDog/helm-charts/blob/main/examples/datadog/agent_on_openshift_values.yaml
{{% /tab %}}
{{% tab "Daemonset" %}}

요구 사항과 클러스터의 [보안 제약 조건][1]에 따라 다음 세 가지 배포 시나리오가 지원됩니다.

- [제한된 SCC 작업](#restricted-scc-operations)
- [호스트 네트워크 SCC 작업](#host)
- [모든 기능에 대한 커스텀 Datadog SCC](#custom-datadog-scc-for-all-features)

| 보안 컨텍스트 제약 조건   | [제한됨](#restricted-scc-operations) | [호스트 네트워크](#host) | [커스텀](#custom-datadog-scc-for-all-features) |
|--------------------------------|------------------------------------------|-----------------------|------------------------------------------------|
| 쿠버네티스(Kubernetes) 레이어 모니터링    | 지원됨                                | 지원됨             | 지원됨                                             |
| 쿠버네티스(Kubernetes) 기반 자동탐지 | 지원됨                                | 지원됨             | 지원됨                                             |
| DogStatsD 수집               | 지원되지 않음                            | 지원됨             | 지원됨                                             |
| 애플리케이션 성능 모니터링(APM) 트레이스 수집               | 지원되지 않음                            | 지원됨             | 지원됨                                             |
| 로그 네트워크 수집            | 지원되지 않음                            | 지원됨             | 지원됨                                             |
| 호스트 네트워크 메트릭           | 지원되지 않음                            | 지원됨             | 지원됨                                             |
| 도커(Docker) 레이어 모니터링        | 지원되지 않음                            | 지원되지 않음         | 지원됨                                             |
| 컨테이너 로그 수집      | 지원되지 않음                            | 지원되지 않음         | 지원됨                                             |
| 실시간 컨테이너 모니터링      | 지원되지 않음                            | 지원되지 않음         | 지원됨                                             |
| 실시간 프로세스 모니터링        | 지원되지 않음                            | 지원되지 않음         | 지원됨                                             |

#### 제한된 SCC 작업

본 모드를 사용하면 [`datadog-agent` DaemonSet][2]에 특별한 권한을 부여할 필요가 없으며, kubelet 및 API서버에 액세스하는 데 필요한 [RBAC][3] 권한 외에는 특별한 권한을 부여할 필요가 없습니다. [kubelet 전용 템플릿][4]으로 시작하세요.

DogStatsD, 애플리케이션 성능 모니터링(APM), 로그의 권장 수집 방법은 Datadog 에이전트를 호스트 포트에 바인딩하는 것입니다. 이렇게 하면 대상 IP가 일정하게 유지되며 애플리케이션에서 쉽게 검색할 수 있습니다. 기본 제한 OpenShift SCC는 호스트 포트 바인딩을 허용하지 않습니다. 자체 IP에서 수신 대기하도록 에이전트를 설정할 수 있지만, 사용자가 애플리케이션에서 해당 IP를 검색해야 합니다.

에이전트는 `sidecar` 실행 모드에서 작동하도록 지원하여 애플리케이션 포드에서 에이전트를 실행해 보다 쉽게 검색할 수 있도록 도와드립니다.

#### 호스트

표준 `hostnetwork` 또는 `hostaccess` SCC를 사용하거나 직접 생성하여 포드에 `allowHostPorts` 권한을 추가합니다. 이러한 경우, 포드 사양에 다음 관련 포트 바인딩을 추가합니다.

```yaml
ports:
  - containerPort: 8125
    name: dogstatsdport
    protocol: UDP
  - containerPort: 8126
    name: traceport
    protocol: TCP
```

[1]: https://docs.openshift.com/enterprise/3.0/admin_guide/manage_scc.html
[2]: https://docs.datadoghq.com/ko/agent/kubernetes/daemonset_setup/
[3]: https://docs.datadoghq.com/ko/agent/kubernetes/daemonset_setup/?tab=k8sfile#configure-rbac-permissions
[4]: https://github.com/DataDog/datadog-agent/blob/master/Dockerfiles/manifests/agent-kubelet-only.yaml
{{% /tab %}}
{{< /tabs >}}

#### 모든 기능을 위한 커스텀 Datadog

기본적으로 Helm 차트와 Datadog 오퍼레이터가 SCC를 관리합니다. 대신 직접 관리하려면 활성화한 기능에 따른 올바른 설정을 포함해야 합니다.

SELinux가 허용 모드이거나 비활성화되어 있는 경우, 모든 기능을 활용하려면 `hostaccess` SCC를 활성화하세요.
SELinux가 강제 모드인 경우, Datadog 에이전트 포드에 [`spc_t` 유형][6]을 부여할 것을 권장합니다. 에이전트를 배포하기 위해서 [Datadog 에이전트 서비스 계정 생성][8] 후에 적용할 수 있는 다음 [Datadog 에이전트 SCC][7]를 사용할 수 있습니다. 이는 다음 권한을 부여합니다.

- `allowHostPorts: true`: DogStatsD / 애플리케이션 성능 모니터링(APM) / 로그 수집을 노드 IP에 바인딩합니다.
- `allowHostPID: true`: Unix 소켓이 제출한 DogStatsD 메트릭에 대한 출처 감지를 활성화합니다.
- `volumes: hostPath`: 도커(Docker) 소켓과 호스트 `proc` 및 `cgroup` 폴더에 액세스하여 메트릭을 수집합니다.
- `SELinux type: spc_t`: 도커(Docker) 소켓과 모든 프로세스의 `proc` 및 `cgroup` 폴더에 액세스하여 메트릭을 수집합니다. 자세한 내용은 [최고 권한 컨테이너 개념 도입][6]을 참조하세요.

<div class="alert alert-info">
<code>사용자</code> 섹션에 <code>system:serviceaccount<datadog-agent namespace><datadog-agent service account name></code>를 추가하여 <a href="https://docs.datadoghq.com/agent/kubernetes/daemonset_setup/?tab=k8sfile#configure-rbac-permissions">datadog 에이전트 서비스 계정</a>을 새로 생성한 <a href="https://github.com/DataDog/datadog-agent/blob/master/Dockerfiles/manifests/openshift/scc.yaml">datadog 에이전트 SCC</a>에 추가하는 것을 잊지 마세요.
</div>

<div class="alert alert-danger">
<b>OpenShift 4.0+:</b> 지원되는 클라우드 공급자에서 OpenShift 설치 관리자를 사용하는 경우, <code>scc.yaml</code> 매니페스트에서 <code>allowHostNetwork: true</code>로 SCC를 배포하고, 에이전트 설정에서 <code>hostNetwork: true</code>로 호스트 태그 및 별칭을 가져와야 합니다. 그렇지 않으면 포드 네트워크에서 메타데이터 서버에 대한 액세스가 제한됩니다.
</div>

**참고**: 도커(Docker) 소켓은 루트 그룹이 소유하므로, 도커(Docker) 메트릭을 가져오려면 에이전트의 권한을 상향시켜야 할 수도 있습니다. 루트 사용자로 에이전트 프로세스를 실행하려면 다음을 사용하여 SCC를 설정합니다.

```yaml
runAsUser:
  type: RunAsAny
```

### 로그 수집

Datadog 에이전트의 로그 수집은 OpenShift에서 다른 쿠버네티스(Kubernetes) 클러스터와 거의 동일하게 설정됩니다. Datadog 오퍼레이터와 Helm 차트는 `/var/log/pods` 디렉토리에 마운트되며, Datadog 에이전트 포드는 각 호스트에 있는 포드와 컨테이너의 로그를 모니터링하는 데 사용합니다. 그러나 Datadog 오퍼레이터를 사용하려면 추가 SELinux 옵션을 적용하여 에이전트가 해당 로그 파일을 읽을 수 있는 권한을 부여해야 합니다.

자세한 기본 정보는 [쿠버네티스(Kubernetes) 로그 수집][9]을, 설정 예시는 [배포][3] 페이지를 참조하세요.

### APM

쿠버네티스(Kubernetes)에는 애플리케이션 포드에서 Datadog 에이전트 포드로 데이터를 라우팅하는 세 가지 중요 옵션이 있습니다. Unix 도메인 소켓(UDS), HostIP:HostPort 옵션(TCP/IP), 쿠버네티스(Kubernetes) 서비스입니다. Datadog 오퍼레이터와 Helm 차트는 리소스 효율이 가장 높기 때문에, 기본적으로 UDS 옵션을 사용합니다. 그러나 에이전트 포드와 애플리케이션 포드 모두에서 권한 승격된 SCC 및 SELinux 옵션이 필요하기 때문에 해당 옵션은 OpenShift에서는 제대로 동작하지 않습니다.

Datadog은 이를 방지하기 위해 UDS 옵션을 명시적 비활성화할 것을 권장합니다. 이를 통해 어드미션 컨트롤러가 해당 설정을 삽입하는 것을 방지할 수 있습니다.

자세한 기본 정보는 [쿠버네티스(Kubernetes) 애플리케이션 성능 모니터링(APM) - 트레이스 수집][10]을, 설정 예시는 [배포][3] 페이지를 참조하세요.

### 검증

[kubernetes_apiserver][1] 참조

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "openshift" >}}


### 이벤트

OpenShift 점검은 이벤트를 포함하지 않습니다.

### 서비스 점검

OpenShift 점검은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 고객 지원팀][11]에 문의하세요.


[1]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/kubernetes_apiserver.d/conf.yaml.example
[2]: https://docs.datadoghq.com/ko/containers/kubernetes/installation
[3]: https://docs.datadoghq.com/ko/containers/kubernetes/distributions/?tab=datadogoperator#Openshift
[4]: https://github.com/DataDog/datadog-operator/
[5]: https://docs.openshift.com/container-platform/4.10/operators/understanding/olm-understanding-operatorhub.html
[6]: https://developers.redhat.com/blog/2014/11/06/introducing-a-super-privileged-container-concept
[7]: https://github.com/DataDog/datadog-agent/blob/master/Dockerfiles/manifests/openshift/scc.yaml
[8]: https://docs.datadoghq.com/ko/agent/kubernetes/daemonset_setup/?tab=k8sfile#configure-rbac-permissions
[9]: https://docs.datadoghq.com/ko/agent/kubernetes/log/?tab=daemonset
[10]: https://docs.datadoghq.com/ko/containers/kubernetes/apm
[11]: https://docs.datadoghq.com/ko/help/