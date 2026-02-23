---
description: DaemonSet 배포를 사용해 Kubernetes에서 Datadog Agent 수동 설치 및 구성
further_reading:
- link: /containers/kubernetes/installation
  tag: 설명서
  text: 쿠버네티스에 Datadog 에이전트 설치하기
title: DaemonSet를 사용하여 Kubernetes에 Datadog Agent를 수동으로 설치 및 설정
---

<div class="alert alert-danger">
  Datadog는 DaemonSets을 사용하여 Datadog Agent를 배포하는 것을 권장하지 않습니다. 수동 절차에서 오류가 발생할 수 있기 때문입니다. Datadog는 <a href="/containers/kubernetes/installation">Datadog Operator 또는 Helm</a>을 사용해 Kubernetes에서 Agent를 설치할 것을 권장합니다.
</div>

## 설치
DaemonSets를 사용해 모든 노드(또는 [nodeSelectors를 사용][1]한 특정 노드)에서 Datadog Agent를 배포할 수 있습니다.

Datadog 에이전트를 쿠버네티스 클러스터에 설치하려면:

1. **에이전트 권한을 설정합니다**: 쿠버네티스에 역할 기반 액세스 제어(RBAC)가 활성화되어 있는 경우, Datadog 에이전트 서비스 계정에 대한 RBAC 권한을 설정합니다. 쿠버네티스 1.6 이상부터는 RBAC가 기본적으로 활성화됩니다. 다음 명령으로 적절한 ClusterRole, ServiceAccount, ClusterRoleBinding을 생성합니다:

    ```shell
    kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/rbac/clusterrole.yaml"

    kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/rbac/serviceaccount.yaml"

    kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/rbac/clusterrolebinding.yaml"
    ```

   **참고**: 이러한 RBAC 설정은 `default`네임스페이스를 위한 것입니다. 커스텀 네임스페이스인 경우 적용하기 전에 `namespace` 매개 변수를 업데이트하세요.


2. **Datadog 에이전트 매니페스트를 생성합니다**. 다음 템플릿 중 하나를 사용하여 `datadog-agent.yaml` 매니페스트를 생성하세요:

    | 메트릭                         | 로그                            | APM                             | 프로세스                       | NPM                             | 보안                       | Linux                   | Windows                              |
    |---------------------------------|---------------------------------|---------------------------------|---------------------------------|---------------------------------|---------------------------------|-------------------------|--------------------------------------|
    | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> | [Manifest 템플릿][2]  | [Manifest 템플릿][3] (보안 없음) |
    | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |                                 |                                 |                                 |             [매니페스트 템플릿][4]  | [매니페스트 템플릿][5]               |
    | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |                                 |                                 |                                 |                                 | [Manifest 템플릿][6]  | [Manifest 템플릿][7]               |
    | <i class="icon-check-bold"></i> |                                 | <i class="icon-check-bold"></i> |                                 |                                 |                                 | [Manifest 템플릿][8]  | [Manifest 템플릿][9]               |
    |                                 |                                 |                                 |                                 | <i class="icon-check-bold"></i> |                                 | [Manifest 템플릿][10] | 템플릿 없음                          |
    | <i class="icon-check-bold"></i> |                                 |                                 |                                 |                                 |                                 | [Manifest 템플릿][11] | [Manifest 템플릿][12]              |

     트레이스 수집을 완전히 활성화하려면 [애플리케이션 포드 구성에서 추가 단계가 필요합니다][13]. 각 기능을 개별적으로 활성화하는 방법은 [로그][14], [APM (애플리케이션 성능 모니터링)][15], [프로세스][16], [클라우드 네트워크 모니터링][17], [보안][18] 설명서 페이지도 참조하세요.

   **참고**: 이러한 매니페스트는 `default` 네임스페이스를 위한 것입니다. 커스텀 네임스페이스인 경우 `metadata.namespace` 매개 변수를 업데이트한 후에 적용하세요.

3. `secret-api-key.yaml` 매니페스트에서 `PUT_YOUR_BASE64_ENCODED_API_KEY_HERE`를 base64로 인코딩된 [Datadog API 키][19]로 바꿉니다. API 키의 base64 버전을 얻으려면 다음을 실행하세요:

    ```shell
    echo -n '<Your API key>' | base64
    ```
4. `datadog-agent-all-features.yaml` 매니페스트 템플릿을 사용하는 경우 `secret-cluster-agent-token.yaml` 매니페스트에서 `PUT_A_BASE64_ENCODED_RANDOM_STRING_HERE`를 base64의 임의 문자열로 교체합니다. base64 버전을 가져오려면 다음을 실행합니다.

    ```shell
    echo -n 'Random string' | base64
    ```

   **참고**: 클러스터 에이전트 간 통신을 보호하려면 임의 문자열에 영숫자 32자 이상이 포함되어야 합니다.

5. `datadog-agent.yaml` 매니페스트에서 `DD_SITE` 환경 변수를 사용하여 **Datadog 사이트**를 {{< region-param key="dd_site" code="true" >}}로 설정합니다.

    **참고**: `DD_SITE` 환경 변수가 명시적으로 설정되지 않은 경우 기본값은 `US` 사이트 `datadoghq.com`입니다. 다른 사이트를 사용하는 경우 잘못된 API 키 메시지가 표시됩니다. 사용 중인 사이트에 적합한 설명서를 보려면 [설명서 사이트 선택기][20]를 사용하세요.

6. 명령어와 함께 **데몬셋을 배포합니다**:

    ```shell
    kubectl apply -f datadog-agent.yaml
    ```

7. **확인**: Datadog 에이전트가 사용자 환경에서 데몬셋으로 실행되고 있는지 확인하려면, 다음을 실행합니다:

    ```shell
    kubectl get daemonset
    ```

   에이전트가 배포되면 아래 텍스트와 유사한 출력이 표시되며, `DESIRED`와 `CURRENT`는 클러스터에서 실행 중인 노드 수와 동일합니다.

    ```shell
    NAME      DESIRED   CURRENT   READY     UP-TO-DATE   AVAILABLE   NODE SELECTOR   AGE
    datadog   2         2         2         2            2           <none>          10s
    ```

## 설정

### 트레이스 수집

{{< tabs >}}
{{% tab "TCP" %}}

TCP를 통한 애플리케이션 성능 모니터링(APM) 트레이스 수집을 활성화하려면 DaemonSet 구성 파일을 열고 다음을 편집합니다.

- `trace-agent` 컨테이너 내의 포트 `8126` (호스트에서 에이전트로 트래픽 전달)에서 들어오는 데이터를 허용합니다:
    ```yaml
      # (...)
      containers:
        - name: trace-agent
          # (...)
          ports:
            - containerPort: 8126
              hostPort: 8126
              name: traceport
              protocol: TCP
      # (...)
    ```

- **Agent 버전 7.17 이하**를 사용하는 경우, 위의 단계 외에도 `datadog.yaml` 트레이스 Agent 매니페스트의 `env` 섹션에서 `DD_APM_NON_LOCAL_TRAFFIC` 및 `DD_APM_ENABLED` 변수를 `true`로 설정합니다:

  ```yaml
    # (...)
    containers:
      - name: trace-agent
        # (...)
        env:
          - name: DD_APM_ENABLED
            value: 'true'
          - name: DD_APM_NON_LOCAL_TRAFFIC
            value: "true"
          # (...)
  ```

**경고**: `hostPort` 파라미터는 호스트에서 포트를 엽니다. 방화벽이 애플리케이션 또는 신뢰할 수 있는 소스로부터의 액세스만 허용하는지 확인하세요. 네트워크 플러그인이 `hostPorts`를 지원하지 않는 경우 Agent 포드 사양에 `hostNetwork: true`를 추가하세요. 이렇게 하면 호스트의 네트워크 네임스페이스가 Datadog Agent와 공유됩니다. 또한 컨테이너에서 열린 모든 포트는 호스트에서 열립니다. 포트가 호스트와 컨테이너에서 모두 사용되는 경우, 동일한 네트워크 네임스페이스를 공유하기 때문에 충돌이 발생하고 포드가 시작되지 않습니다. 일부 Kubernetes 설치에서는 이러한 사용을 허용하지 않습니다.


{{% /tab %}}
{{% tab "Unix Domain Socket (UDS)" %}}

UDS를 통해 애플리케이션 성능 모니터링(APM) 트레이스 수집을 활성화하려면 DaemonSet 구성 파일을 열고 다음을 편집합니다.

  ```yaml
    # (...)
    containers:
    - name: trace-agent
      # (...)
      env:
      - name: DD_APM_ENABLED
        value: "true"
      - name: DD_APM_RECEIVER_SOCKET
        value: "/var/run/datadog/apm.socket"
    # (...)
      volumeMounts:
      - name: apmsocket
        mountPath: /var/run/datadog/
    volumes:
    - hostPath:
        path: /var/run/datadog/
        type: DirectoryOrCreate
    # (...)
  ```

이 설정은 호스트에 디렉토리를 생성하고 Agent 내에 마운트합니다. 그런 다음 Agent는 해당 디렉토리에서 `/var/run/datadog/apm.socket`의 `DD_APM_RECEIVER_SOCKET`값과 함께 소켓 파일을 생성하고 수신 대기합니다. 애플리케이션 파드도 유사한 방식으로 이 볼륨을 마운트하고 동일한 소켓에 쓸 수 있습니다.

{{% /tab %}}
{{< /tabs >}}

### 로그 수집

**참고**: 이 옵션은 Windows에서 지원되지 않습니다. 대신 [Helm][22] 옵션을 사용하세요.

DaemonSet으로 로그 수집을 활성화하는 방법:

1. `datadog.yaml` Agent 매니페스트의 *env* 섹션에서 `DD_LOGS_ENABLED` 및 `DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL` 변수를 true로 설정합니다:

    ```yaml
     # (...)
      env:
        # (...)
        - name: DD_LOGS_ENABLED
          value: "true"
        - name: DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL
          value: "true"
        - name: DD_CONTAINER_EXCLUDE_LOGS
          value: "name:datadog-agent"
     # (...)
    ```

    **참고**: `DD_CONTAINER_EXCLUDE_LOGS`를 설정하면 Datadog Agent에서 자체 로그를 수집하고 전송하지 않습니다. Datadog Agent 로그를 수집하려면 이 파라미터를 제거하세요. 자세한 내용은 [컨테이너 무시용 환경 변수][21]를 참조하세요. OpenShift 환경 내에서 ImageStream을 사용하는 경우, `name` 컨테이너와 함께 `DD_CONTAINER_INCLUDE_LOGS`를 설정하여 로그를 수집하세요. 이 두 Exclude/Include 파라미터 값은 모두 정규식을 지원합니다.

2. 재시작 또는 네트워크 문제 시 컨테이너 로그의 손실을 방지하기 위해 `pointerdir` 볼륨을 마운트하고, `/var/log/pods`가 디렉터리의  symlink이므로 Kubernetes 로그 파일을 통해 로그를 수집할 수 있도록 `/var/lib/docker/containers` 볼륨도 마운트합니다.

    ```yaml
      # (...)
        volumeMounts:
          # (...)
          - name: pointerdir
            mountPath: /opt/datadog-agent/run
          - name: logpodpath
           mountPath: /var/log/pods
          # Docker runtime directory, replace this path
          # with your container runtime logs directory,
          # or remove this configuration if `/var/log/pods`
          # is not a symlink to any other directory.
          - name: logcontainerpath
           mountPath: /var/lib/docker/containers
      # (...)
      volumes:
        # (...)
        - hostPath:
            path: /opt/datadog-agent/run
          name: pointerdir
        - hostPath:
            path: /var/log/pods
          name: logpodpath
        # Docker runtime directory, replace this path
        # with your container runtime logs directory,
        # or remove this configuration if `/var/log/pods`
        # is not a symlink to any other directory.
        - hostPath:
            path: /var/lib/docker/containers
          name: logcontainerpath
        # (...)
    ```

    `pointerdir`는 Agent가 로그를 수집하는 모든 컨테이너에 포인터가 있는 파일을 저장하는 데 사용됩니다. 이는 Agent가 재시작되거나 네트워크 문제가 발생했을 때 손실이 없도록 보장하기 위한 것입니다.

### 권한 없음

(선택 사항) 권한 없는 설치를 실행하려면 [포드 템플릿][2]에 다음을 추가하세요.

```yaml
  spec:
    securityContext:
      runAsUser: <USER_ID>
      supplementalGroups:
        - <DOCKER_GROUP_ID>
```

`<USER_ID>`는 에이전트를 실행할 UID이며, `<DOCKER_GROUP_ID>`는 도커 또는 컨테이너화된 소켓을 소유한 그룹 ID입니다.

에이전트가 비루트 사용자로 실행되는 경우 `/var/lib/docker/containers`에 포함된 로그 파일을 직접 읽을 수 없습니다. 이 사례에서는 에이전트 컨테이너에 도커 소켓을 마운트하여 도커 데몬에서 컨테이너 로그를 가져올 수 있도록 해야 합니다.



### Cluster Agent 이벤트 수집

Datadog Cluster Agent에서 Kubernetes 이벤트를 수집하려면 다음 단계를 따르세요.             

1. `leader_election` 변수 또는 `DD_LEADER_ELECTION` 환경 변수를 `false`로 설정하여 노드 Agent 에서 리더 선출을 비활성화합니다.

2. Cluster Agent 배포 파일에서 `DD_COLLECT_KUBERNETES_EVENTS` 및 `DD_LEADER_ELECTION` 환경 변수를 `true`로 설정합니다.

      ```yaml
        - name: DD_COLLECT_KUBERNETES_EVENTS
          value: "true"
        - name: DD_LEADER_ELECTION
          value: "true"
      ```

위 단계에 따라 리더 선출을 구성하여 단 하나의 Cluster Agent가 해당 이벤트를 수집하도록 합니다.

또는 Node Agent에서 Kubernetes 이벤트를 수집하려면 Agent 매니페스트에서 환경 변수 `DD_COLLECT_KUBERNETES_EVENTS` 및 `DD_LEADER_ELECTION`을 `true`로 설정하세요.

```yaml
- name: DD_COLLECT_KUBERNETES_EVENTS
  value: "true"
- name: DD_LEADER_ELECTION
  value: "true"
```

## 환경 변수

다음은 DaemonSet을 사용하여 Datadog Agent에 사용할 수 있는 환경 변수 목록입니다. 

### 전역 옵션

| 환경 변수         | 설명                                                                                                                                                                                                                                                                                                                                      |
|----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_API_KEY`         | Datadog API 키(**필수**)                                                                                                                                                                                                                                                                                                              |
| `DD_ENV`             | 내보내기한 모든 데이터에 글로벌 `env` 태그 설정                                                                                                                                                                                                                                                                                                  |
| `DD_HOSTNAME`        | 모든 메트릭에 대해 사용할 수 있는 호스트 이름(자동 감지 실패)                                                                                                                                                                                                                                                                                             |
| `DD_TAGS`            | 호스트 태그는 공백으로 구분됩니다. 예: `simple-tag-0 tag-key-1:tag-value-1`                                                                                                                                                                                                                                                                 |
| `DD_SITE`            | 메트릭, 추적 및 로그의 대상 사이트입니다. `DD_SITE`는 {{< region-param key="dd_site" code="true">}}입니다. 기본값은 `datadoghq.com`입니다.                                                                                                                                                                                               |
| `DD_DD_URL`          | 제출 메트릭에 대한 URL을 덮어쓰기 위한 추가적인 설정입니다.                                                                                                                                                                                                                                                                                      |
| `DD_URL` (6.36+/7.36+)            | `DD_DD_URL`에 대한 별칭입니다. `DD_DD_URL`이(가) 이미 설정된 경우 무시합니다.                                                                                                                                                                                                                                                                                    |
| `DD_CHECK_RUNNERS`   | Agent는 기본적으로 모든 검사를 동시에 실행합니다(기본값 = `4` 러너). 검사를 순차적으로 실행하려면 값을 `1`로 설정하세요. 많은 수의 검사를 실행해야 하는 경우 (또는 검사 속도가 느린 경우) `collector-queue` 구성 요소가 뒤처져 상태 검사에 실패할 수 있습니다. 러너 수를 늘려 검사를 병렬로 실행할 수 있습니다. |
| `DD_LEADER_ELECTION` | 클러스터에서 Agent 인스턴스가 여러 개 실행 중인 경우 이 변수를 `true`로 설정하여 이벤트 수집 중복을 방지하세요.                                                                                                                                                                                                                         |

### 프록시 설정

Agent v6.4.0(및 Trace Agent는 v6.5.0)부터 다음 환경 변수를 사용하여 Agent 프록시 설정을 재정의할 수 있습니다.

| 환경 변수             | 설명                                                            |
|--------------------------|------------------------------------------------------------------------|
| `DD_PROXY_HTTP`          | `http` 요청에 대해 프록시로 사용할 수 있는 HTTP URL                     |
| `DD_PROXY_HTTPS`         | `https` 요청에 대해 프록시로 사용할 수 있는 HTTPS URL                   |
| `DD_PROXY_NO_PROXY`      | 프록시를 사용하지 않아야 하며, 공백으로 구분된 URL 목록.      |
| `DD_SKIP_SSL_VALIDATION` | Agent가 Datadog에 연결하는 데 문제가 있는 경우 테스트할 옵션입니다. |

프록시 설정에 관한 자세한 내용은 [Agent v6 프록시 설명서][23]를 참조하세요.



### DogStatsD(커스텀 메트릭)

[StatsD 프로토콜][24]을 사용하여 커스텀 메트릭을 전송합니다.

| 환경 변수                     | 설명                                                                                                                                                |
|----------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` | 다른 컨테이너에서 DogStatsD 패킷 수신(커스텀 메트릭 전송에 필요)                                                                       |
| `DD_HISTOGRAM_PERCENTILES`       | 계산을 위한 히스토그램 백분위수(공백으로 구분)입니다. 기본값은 `0.95`입니다.                                                                         |
| `DD_HISTOGRAM_AGGREGATES`        | 히스토그램이 집계되어 계산됩니다(공백으로 구분). 기본값은 `"max median avg count"`입니다.                                                          |
| `DD_DOGSTATSD_SOCKET`            | 수신할 Unix 소켓 경로입니다. `rw`(으)로 마운트된 볼륨이어야 합니다.                                                                                    |
| `DD_DOGSTATSD_ORIGIN_DETECTION`  | Unix 소켓 메트릭을 위한 컨테이너 감지 및 태깅을 활성화합니다.                                                                                            |
| `DD_DOGSTATSD_TAGS`              | 이 DogStatsD 서버가 수신한 모든 메트릭, 이벤트 및 서비스 검사에 추가할 태그입니다. 예: `"env:golden group:retrievers"` |

[Unix 도메인 소켓을 통한 DogStatsD][25]에 대해 자세히 알아보세요.

### 태깅

Datadog는 자동으로 Kubernetes에서 공통 태그를 수집합니다. 더 많은 태그를 추출하려면 다음 옵션을 사용하세요.

| 환경 변수                            | 설명             |
|-----------------------------------------|-------------------------|
| `DD_KUBERNETES_POD_LABELS_AS_TAGS`      | 팟 라벨을 추출합니다.      |
| `DD_KUBERNETES_POD_ANNOTATIONS_AS_TAGS` | 포드 주석 추출 |

자세한 내용은 [Kubernetes 태그 추출][26] 설명서를 참조하세요.

### 컨테이너 무시

로그 수집, 메트릭 수집,  Autodiscovery에서 컨테이너 제외 Datadog는 기본적으로 Kubernetes 및 OpenShift `pause` 컨테이너를 제외합니다. 이러한 허용 목록과 차단 목록은 Autodiscovery에만 적용되며, 추적과 DogStatsD는 영향을 받지 않습니다. 이러한 환경 변수는 값에 정규식을 지원합니다.

| 환경 변수                   | 설명                                                                                                                                                                                                                        |
|--------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_CONTAINER_INCLUDE`         | 포함할 컨테이너의 허용 목록(공백으로 구분)을 입력합니다. 모두 포함하려면 `.*`을 사용합니다. 예:  `"image:image_name_1 image:image_name_2"`, `image:.*`                                                                              |
| `DD_CONTAINER_EXCLUDE`         | 제외할 컨테이너 차단 목록입니다(공백으로 구분). `.*`을(를) 사용해 모두 제외합니다. 예: `"image:image_name_3 image:image_name_4"`, `image:.*`                                                                              |
| `DD_CONTAINER_INCLUDE_METRICS` | 포함하려는 메트릭의 컨테이너 허용 목록입니다.                                                                                                                                                                         |
| `DD_CONTAINER_EXCLUDE_METRICS` | 제외하려는 메트릭의 컨테이너 차단 목록입니다.                                                                                                                                                                         |
| `DD_CONTAINER_INCLUDE_LOGS`    | 포함하려는 로그의 컨테이너 허용 목록입니다.                                                                                                                                                                            |
| `DD_CONTAINER_EXCLUDE_LOGS`    | 제외하려는 로그의 컨테이너 차단 목록입니다.                                                                                                                                                                            |
| `DD_AC_INCLUDE`                | **더 이상 사용되지 않음**. 포함할 컨테이너의 허용 목록(공백으로 구분). 모두 포함하려면 `.*` 사용. 예: `"image:image_name_1 image:image_name_2"`, `image:.*`                                                              |
| `DD_AC_EXCLUDE`                | **더 이상 사용되지 않음**. 제외할 컨테이너의 차단 목록(공백으로 구분). 모두 제외할 때 `.*` 사용. 예: `"image:image_name_3 image:image_name_4"`(**참고**: 이 변수는 Autodiscovery에만 적용), `image:.*` |

추가 예시는 [컨테이너 발견 관리][27] 페이지에서 확인할 수 있습니다.

**참고**: `kubernetes.containers.running`, `kubernetes.pods.running`, `docker.containers.running`, `.stopped`, `.running.total` 및 `.stopped.total` 메트릭은 이러한 설정의 영향을 받지 않습니다. 모든 컨테이너가 집계됩니다.

### 자동탐지

| 환경 변수                 | 설명                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
|------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_LISTENERS`               | 실행할 Autodiscovery 리스너.                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `DD_EXTRA_LISTENERS`         | 실행할 추가 Autodiscovery 리스너. `datadog.yaml` 설정 파일의 `listeners` 섹션에 정의된 변수 외에 추가됩니다.                                                                                                                                                                                                                                                                                                                                    |
| `DD_CONFIG_PROVIDERS`        | Agent에서 확인 구성을 수집하기 위해 호출해야 하는 공급자입니다. 사용 가능한 공급자는 다음과 같습니다. <br>`kubelet` - 포드 주석에 포함된 템플릿을 처리합니다. <br>`docker` - 컨테이너 레이블에 포함된 템플릿을 처리합니다. <br> `clusterchecks` - Cluster Agent에서 레벨 검사 구성을 검색합니다. <br>`kube_services` - 클러스터 검사를 위해 Kubernetes 서비스를 감시합니다. |
| `DD_EXTRA_CONFIG_PROVIDERS`  | 사용 가능한 추가 Autodiscovery 설정 공급자. `datadog.yaml` 설정 파일의 `config_providers` 섹션에 정의된 변수 외에 추가됩니다. |

### 기타

| 환경 변수                        | 설명                                                                                                                                                                                                                                                         |
|-------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_PROCESS_AGENT_CONTAINER_SOURCE` | 컨테이너 소스 자동 감지를 재정의하여 단일 소스를 강제 실행합니다. 예: `"docker"`, `"ecs_fargate"`, `"kubelet"`. Agent v7.35.0 이상에서는 더 이상 필요하지 않습니다.                                                                                                     |
| `DD_HEALTH_PORT`                    | 포트 `5555`에서 Agent 상태 점검을 노출하려면 이를 `5555`로 설정하세요.                                                                                                                                                                                                 |
| `DD_CLUSTER_NAME`                   | 커스텀 쿠버네티스(Kubernetes) 클러스터 식별자를 설정하여 호스트 별칭 출동을 방지합니다. 클러스터 이름은 최대 40자로 제한(소문자, 숫자, 하이픈만)이 적용됩니다. 문자로 시작하고 숫자 또는 문자로 종료되어야 합니다. |


[1]: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#nodeselector
[2]: /resources/yaml/datadog-agent-all-features.yaml
[3]: /resources/yaml/datadog-agent-windows-all-features.yaml
[4]: /resources/yaml/datadog-agent-logs-apm.yaml
[5]: /resources/yaml/datadog-agent-windows-logs-apm.yaml
[6]: /resources/yaml/datadog-agent-logs.yaml
[7]: /resources/yaml/datadog-agent-windows-logs.yaml
[8]: /resources/yaml/datadog-agent-apm.yaml
[9]: /resources/yaml/datadog-agent-windows-apm.yaml
[10]: /resources/yaml/datadog-agent-npm.yaml
[11]: /resources/yaml/datadog-agent-vanilla.yaml
[12]: /resources/yaml/datadog-agent-windows-vanilla.yaml
[13]: /ko/agent/kubernetes/apm/#setup
[14]: /ko/agent/kubernetes/log/
[15]: /ko/agent/kubernetes/apm/
[16]: /ko/infrastructure/process/?tab=kubernetes#installation
[17]: /ko/network_monitoring/cloud_network_monitoring/setup/
[18]: /ko/data_security/agent/
[19]: https://app.datadoghq.com/organization-settings/api-keys
[20]: /ko/getting_started/site/
[21]: /ko/agent/docker/?tab=standard#ignore-containers
[22]: /ko/containers/kubernetes/log
[23]: /ko/agent/configuration/proxy/#agent-v6
[24]: /ko/developers/dogstatsd/
[25]: /ko/developers/dogstatsd/unix_socket/
[26]: /ko/containers/kubernetes/tag/
[27]: /ko/agent/guide/autodiscovery-management/