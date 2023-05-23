---
further_reading:
- link: /infrastructure/hostmap/
  tag: 설명서
  text: 호스트맵을 통해 모든 호스트를 한 화면에서 확인하세요.
- link: /infrastructure/process/
  tag: 설명서
  text: 시스템의 모든 레벨에서 발생하는 상황 파악
kind: 설명서
title: 실시간 컨테이너 설정
---



### 쿠버네티스 리소스

[실시간 컨테이너][1]에 대한 쿠버네티스 리소스를 검색하도록 Datadog 에이전트와 클러스터 에이전트를 설정할 수 있습니다. 이 기능을 사용하면 특정 네임스페이스 또는 가용 영역에서 포드, 배포 및 기타 쿠버네티스 컨셉의 상태를 모니터링하고, 배포 내에서 실패한 포드의 리소스 사양을 확인하며, 노드 활동을 관련 로그와 상호 연관시키는 등의 작업을 수행할 수 있습니다.

실시간 컨테이너용 쿠버네티스 리소스는 **에이전트 버전 >= 7.27.0** 및 **클러스터 에이전트 버전 >= 1.11.0**이 필요합니다. 이전 버전의 Datadog 에이전트 및 클러스터 에이전트에 대해서는 [실시간 컨테이너 레거시 설정][4]을 참조하세요.

참고: 쿠버네티스 버전 1.25 이상의 경우, 필요한 최소 클러스터 에이전트 버전은 7.40.0입니다.

{{< tabs >}}
{{% tab "Helm" %}}

공식 [Datadog 헬름 차트][1]를 사용하는 경우:

- 차트 버전 >= 2.10.0을 사용하세요. 또한, 에이전트 및 클러스터 에이전트 버전이 헬름 차트 [values.yaml][2] 파일에 필요한 최소 버전(또는 그 이상)으로 하드코딩되어 있는지 확인하세요.
- 프로세스 에이전트를 활성화합니다. `datadog-values.yaml` 파일을 수정하여 이 작업을 수행할 수 있습니다:

    ```yaml
    datadog:
        # (...)
        processAgent:
            enabled: true
    ```

- 새 릴리스를 배포합니다.

프로세스 에이전트 및 클러스터 에이전트가 쿠버네티스 클러스터 이름을 자동으로 감지할 수 없는 경우 기능이 시작되지 않고 클러스터 에이전트 로그에 다음 경고가 표시됩니다: `Orchestrator explorer enabled but no cluster name set: disabling`. 이 경우, [values.yaml][2]에서 `datadog.clusterName`를 클러스터 이름으로 설정해야 합니다.

[1]: https://github.com/DataDog/helm-charts
[2]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
{{% /tab %}}
{{% tab "DaemonSet" %}}

데몬셋을 설정하기 전에 [클러스터 에이전트][1] 버전 >= 1.11.0이 필요합니다. 클러스터 에이전트가 실행 중이어야 하며 에이전트가 클러스터 에이전트와 통신할 수 있어야 합니다. [클러스터 에이전트 설정][2]을 참조하세요.

1. 다음 환경 변수를 사용하여 클러스터 에이전트 컨테이너를 설정합니다:

    ```yaml
      - name: DD_ORCHESTRATOR_EXPLORER_ENABLED
        value: "true"
    ```

2. 다음 RBAC 사용 권한으로 클러스터 에이전트 클러스터 역할을 설정합니다.

   `apps` 및 `batch` apiGroups의 경우 라이브 컨테이너에는 
   일반적인 쿠버네티스 리소스 (`pods`, `services`,
   `nodes` 등)를 수집하기 위한 권한이 필요합니다. [클러스터
   에이전트 설정]을 따랐다면 RBAC에 있는 것이 일반적이지만 누락된 경우 
   `deployments`, `replicasets` 뒤에 추가해야 합니다:

    ```yaml
      ClusterRole:
      - apiGroups:  # To create the datadog-cluster-id ConfigMap
        - ""
        resources:
        - configmaps
        verbs:
        - create
        - get
        - update
      ...
      - apiGroups:  # Required to get the kube-system namespace UID and generate a cluster ID
        - ""
        resources:
        - namespaces
        verbs:
        - get
      ...
      - apiGroups:  # To collect new resource types
        - "apps"
        resources:
        - deployments
        - replicasets
        - daemonsets
        - statefulsets
        verbs:
        - list
        - get
        - watch
      - apiGroups:
        - "batch"
        resources:
        - cronjobs
        - jobs
        verbs:
        - list
        - get
        - watch
      - apiGroups:
        - ""
        resources:
        - serviceaccounts
        verbs:
        - list
        - get
        - watch
      - apiGroups:
        - rbac.authorization.k8s.io
        resources:
        - roles
        - rolebindings
        - clusterroles
        - clusterrolebindings
        verbs:
        - list
        - get
        - watch
      - apiGroups:
       - networking.k8s.io
       resources:
       - ingresses
       verbs:
       - list
       - watch
      ...
    ```

   이러한 권한은 에이전트 데몬셋 및 클러스터 에이전트 디플로이먼트와 동일한 네임스페이스에서 `datadog-cluster-id` 컨피그맵을 생성하고 쿠버네티스 리소스를 수집하는 데 필요합니다.

   `cluster-id` 컨피그맵이 클러스터 에이전트에 의해 생성되지 않은 경우, 에이전트 포드는 리소스를 수집할 수 없습니다. 이 경우, 클러스터 에이전트 권한을 업데이트하고 해당 포드를 재시작하여 컨피그맵을 생성하도록 한 다음 에이전트 포드를 재시작하세요.

3. 에이전트 데몬셋에서 실행되는 프로세스 에이전트가 실행 중이어야 하며(프로세스 수집을 실행할 필요는 없음), 다음 옵션으로 설정되어야 합니다.

    ```yaml
    - name: DD_ORCHESTRATOR_EXPLORER_ENABLED
      value: "true"
    ```

프로세스 에이전트 및 클러스터 에이전트가 쿠버네티스 클러스터 이름을 자동으로 감지할 수 없는 경우 기능이 시작되지 않고 클러스터 에이전트 로그에 다음 경고가 표시됩니다: `Orchestrator explorer enabled but no cluster name set: disabling`. 이 경우 클러스터 에이전트와 프로세스 에이전트 모두의 `env` 섹션에 다음 옵션을 추가하세요:

  ```yaml
  - name: DD_CLUSTER_NAME
    value: "<YOUR_CLUSTER_NAME>"
  ```

  [1]: /containers/cluster_agent/
  [2]: /containers/cluster_agent/setup/?tab=daemonset#pagetitle

{{% /tab %}}
{{< /tabs >}}

### 리소스 수집 호환성 매트릭스

다음 표에는 수집된 리소스 목록과 각 리소스에 대한 최소 에이전트, 클러스터 에이전트 및 헬름 차트 버전이 나와 있습니다.

| 리소스 | 최소 에이전트 버전 | 최소 클러스터 에이전트 버전* | 최소 헬름 차트 버전 | 최소 쿠버네티스 버전 |
|---|---|---|---|---|
| 클러스터롤바인딩 | 7.27.0 | 1.19.0 | 2.30.9 | 1.14.0 |
| 클러스터롤 | 7.27.0 | 1.19.0 | 2.30.9 | 1.14.0 |
| 클러스터 | 7.27.0 | 1.12.0 | 2.10.0 | 1.17.0 |
| 크론잡 | 7.27.0 | 7.40.0 | 2.15.5 | 1.16.0 |
| 데몬셋 | 7.27.0 | 1.14.0 | 2.16.3 | 1.16.0 |
| 디플로이먼트 | 7.27.0 | 1.11.0 | 2.10.0 | 1.16.0 |
| 인그레스 | 7.27.0 | 1.22.0 | 2.30.7 | 1.21.0 |
| 작업 | 7.27.0 | 1.13.1 | 2.15.5 | 1.16.0 |
| 네임스페이스 | 7.27.0 | 7.41.0 | 2.30.9 | 1.17.0 |
| 노드 | 7.27.0 | 1.11.0 | 2.10.0 | 1.17.0 |
| 퍼시스턴트 볼륨 | 7.27.0 | 1.18.0 | 2.30.4 | 1.17.0 |
| 퍼시스턴트 볼륨 클레임 | 7.27.0 | 1.18.0 | 2.30.4 | 1.17.0 |
| 포드 | 7.27.0 | 1.11.0 | 2.10.0 | 1.17.0 |
| 레플리카셋 | 7.27.0 | 1.11.0 | 2.10.0 | 1.16.0 |
| 롤바인딩 | 7.27.0 | 1.19.0 | 2.30.9 | 1.14.0 |
| 역할 | 7.27.0 | 1.19.0 | 2.30.9 | 1.14.0 |
| 서비스 어카운트 | 7.27.0 | 1.19.0 | 2.30.9 | 1.17.0 |
| 서비스 | 7.27.0 | 1.11.0 | 2.10.0 | 1.17.0 |
| 스테이트풀셋 | 7.27.0 | 1.15.0 | 2.20.1 | 1.16.0 |

**참고**: 버전 1.22 이후 클러스터 에이전트 버전 번호는 버전 7.39.0부터 시작하여 에이전트 릴리스 번호를 따릅니다.

### 리소스에 커스텀 태그 추가

쿠버네티스 리소스에 커스텀 태그를 추가하여 쿠버네티스 리소스 보기 내에서 쉽게 필터링할 수 있습니다.

`DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS` 환경 변수를 통해 부가적인 태그가 추가됩니다.

**참고**: 이 태그는 쿠버네티스 리소스 보기에서만 표시됩니다.

{{< tabs >}}
{{% tab "Helm" %}}

공식 헬름 차트를 사용하는 경우, [values.yaml][1]에서 `agents.containers.processAgent.env`와 `clusterAgent.env`를 설정하여 프로세스 에이전트와 클러스터 에이전트 모두에 환경 변수를 추가합니다. 

```yaml
  agents:
    containers:
      processAgent:
        env:
          - name: "DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS"
            value: "tag1:value1 tag2:value2"
  clusterAgent:
    env:
      - name: "DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS"
        value: "tag1:value1 tag2:value2"
```

그런 다음 새 릴리스를 배포합니다.

{{% /tab %}}
{{% tab "DaemonSet" %}}

프로세스 에이전트와 클러스터 에이전트 컨테이너 모두에서 환경 변수를 설정합니다:

```yaml
- name: DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS
  value: "tag1:value1 tag2:value2"
```

{{% /tab %}}
{{< /tabs >}}

### 컨테이너 포함 또는 제외

컨테이너를 실시간 수집에 포함하거나 제외할 수 있습니다:

- 환경 변수 `DD_CONTAINER_EXCLUDE`를 전달하거나 `datadog.yaml`기본 설정 파일에 `container_exclude:`를 추가하여 컨테이너를 제외합니다.
- `DD_CONTAINER_INCLUDE` 환경 변수를 전달하거나 `datadog.yaml` 기본 설정 파일에 `container_include:`를 추가하여 컨테이너를 포함합니다.

두 인수 모두 **이미지 이름**을 값으로 사용합니다. 정규 표현식도 지원됩니다.

예를 들어, 이름이 *frontend*로 시작하는 컨테이너를 제외한 모든 데비안 이미지를 제외하려면 `datadog.yaml` 파일에 다음 두 개의 설정 줄을 추가합니다:

```yaml
container_exclude: ["image:debian"]
container_include: ["name:frontend.*"]
```

**참고**: 에이전트 5의 경우, 프로세스 에이전트에는 모든 설정 옵션이 필요하므로 `datadog.conf` 기본 설정 파일에 위의 내용을 포함하는 대신 `/etc/datadog-agent/`에 `datadog.yaml` 파일을 추가해야 합니다. 이 설정은 실시간 수집에서의 컨테이너만 제외할 뿐, 자동 탐지에서는 제외하지 않습니다.

### 민감 정보 스크러빙

민감한 데이터의 유출을 방지하기 위해 컨테이너 YAML 파일에서 민감한 단어를 스크러빙할 수 있습니다. 컨테이너 스크러빙은 기본적으로 헬름 차트에서 활성화되어 있으며, 일부 기본적인 민감한 단어가 제공됩니다:

- `password`
- `passwd`
- `mysql_pwd`
- `access_token`
- `auth_token`
- `api_key`
- `apikey`
- `pwd`
- `secret`
- `credentials`
- `stripetoken`

`DD_ORCHESTRATOR_EXPLORER_CUSTOM_SENSITIVE_WORDS` 환경 변수에 단어 목록을 제공하여 민감한 단어를 추가로 설정할 수 있으며, 기본 단어를 덮어쓰지 않습니다.

**참고**: 에이전트가 소문자로 된 패턴과 텍스트를 비교하므로 추가되는 단어는 소문자여야 합니다. 즉, `password`는 `MY_PASSWORD`를 `MY_*******`로 스크러빙하지만  `PASSWORD`는 적용되지 않습니다.

다음 에이전트에 대해 이 환경 변수를 설정해야 합니다:

- process-agent
- cluster-agent

```yaml
env:
    - name: DD_ORCHESTRATOR_EXPLORER_CUSTOM_SENSITIVE_WORDS
      value: "customword1 customword2 customword3"
```

예를 들어, `password`가 민감한 단어이기 때문에 스크러버는 다음 중 `<MY_PASSWORD>`를 별표 문자열인 `***********`로 변경합니다:

```text
password <MY_PASSWORD>
password=<MY_PASSWORD>
password: <MY_PASSWORD>
password::::== <MY_PASSWORD>
```

그러나 스크러버는 민감한 단어가 포함된 경로는 스크러빙하지 않습니다. 예를 들어, `secret`이 민감한 단어이지만 `/etc/vaultd/secret/haproxy-crt.pem`를 `/etc/vaultd/******/haproxy-crt.pem`로 덮어쓰지 않습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/infrastructure/livecontainers/#overview
[4]: /ko/infrastructure/livecontainers/legacy