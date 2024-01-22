---
further_reading:
- link: /containers/kubernetes/installation
  tag: 설명서
  text: 쿠버네티스에 Datadog 에이전트 설치하기
kind: documentation
title: DaemonSet를 사용하여 Kubernetes에 Datadog Agent를 수동으로 설치 및 설정
---

## 설치
DaemonSets를 사용하여 모든 노드(또는 [nodeSelectors][1]를 사용하여 특정 노드)에 Datadog Agent를 배포할 수 있습니다.

Datadog 에이전트를 쿠버네티스 클러스터에 설치하려면:

1. **에이전트 권한을 설정합니다**: 쿠버네티스에 역할 기반 액세스 제어(RBAC)가 활성화되어 있는 경우, Datadog 에이전트 서비스 계정에 대한 RBAC 권한을 설정합니다. 쿠버네티스 1.6 이상부터는 RBAC가 기본적으로 활성화됩니다. 다음 명령으로 적절한 ClusterRole, ServiceAccount, ClusterRoleBinding을 생성합니다:

    ```shell
    kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/rbac/clusterrole.yaml"

    kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/rbac/serviceaccount.yaml"

    kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/rbac/clusterrolebinding.yaml"
    ```

   **참고**: 이러한 RBAC 설정은 `default`네임스페이스를 위한 것입니다. 커스텀 네임스페이스인 경우 적용하기 전에 `namespace` 매개 변수를 업데이트하세요.


2. **Datadog 에이전트 매니페스트를 생성합니다**. 다음 템플릿 중 하나를 사용하여 `datadog-agent.yaml` 매니페스트를 생성하세요:

    | 메트릭                        | 로그                          | APM                             | 프로세스                       | NPM                             | 보안                        | Linux                   | Windows                              |
    |---------------------------------|---------------------------------|---------------------------------|---------------------------------|---------------------------------|---------------------------------|-------------------------|--------------------------------------|
    | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> | [매니페스트 템플릿][2]  | [매니페스트템플릿][3] (보안 없음) |
    | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |                                 |                                 |                                 |             [매니페스트 템플릿][4]  | [매니페스트 템플릿][5]               |
    | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |                                 |                                 |                                 |                                 | [매니페스트 템플릿][6]  | [매니페스트 템플릿][7]               |
    | <i class="icon-check-bold"></i> |                                 | <i class="icon-check-bold"></i> |                                 |                                 |                                 | [매니페스트 템플릿][8]  | [매니페스트 템플릿][9]               |
    |                                 |                                 |                                 |                                 | <i class="icon-check-bold"></i> |                                 | [매니페스트 템플릿[10] | 템플릿 없음                  |
    | <i class="icon-check-bold"></i> |                                 |                                 |                                 |                                 |                                 | [매니페스트 템플릿][11] | [매니페스트 템플릿][12]              |

   트레이스 수집을 완전히 활성화하려면 [애플리케이션 포드 설정에 추가 단계가 필요합니다][13]. 각 기능을 개별적으로 활성화하는 방법은 [로그][14], [APM][15], [프로세스][16], [네트워크 성능 모니터링][17], [보안][18] 설명서 페이지를 참조하세요.

   **참고**: 이러한 매니페스트는 `default` 네임스페이스를 위한 것입니다. 커스텀 네임스페이스인 경우 `metadata.namespace` 매개 변수를 업데이트한 후에 적용하세요.

3. `secret-api-key.yaml` 매니페스트에서 `PUT_YOUR_BASE64_ENCODED_API_KEY_HERE`를 base64로 인코딩된 [Datadog API 키][19]로 바꿉니다. API 키의 base64 버전을 얻으려면 다음을 실행하세요:

    ```shell
    echo -n '<Your API key>' | base64
    ```
4. `datadog-agent-all-features.yaml` 매니페스트 템플릿을 사용하는 경우: `secret-cluster-agent-token.yaml` 매니페스트에서 `PUT_A_BASE64_ENCODED_RANDOM_STRING_HERE`을 base64로 인코딩된 임의의 문자열로 바꿉니다. base64 버전을 얻으려면 다음을 실행합니다.

    ```shell
    echo -n 'Random string' | base64
    ```

   **참고**: 클러스터 에이전트 간 통신을 보호하려면 임의 문자열에 영숫자 32자 이상이 포함되어야 합니다.

5. `datadog-agent.yaml` 매니페스트에서 `DD_SITE` 환경 변수를 사용하여 **Datadog 사이트**를 {{< region-param key="dd_site" code="true" >}}로 설정합니다.

   **참고**: `DD_SITE` 환경 변수가 명시적으로 설정되지 않은 경우 기본값은 `US` 사이트 `datadoghq.com`입니다. 다른 사이트 중 하나를 사용하는 경우 잘못된 API 키 메시지가 표시됩니다. 사용 중인 사이트에 대한 적합한 도움말을 확인하려면 [문서 사이트 선택기][20]를 사용하세요.

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

TCP를 통한 APM 트레이스 수집을 활성화하려면 DaemonSet 설정 파일을 열고 다음을 편집하세요.

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

- **Agent 버전 7.17 이하를 사용하는 경우** 위의 단계 외에도 `datadog.yaml` 트레이스 Agent 매니페스트 `env`섹션에서 `DD_APM_NON_LOCAL_TRAFFIC` 및 `DD_APM_ENABLED` 변수를 `true`로 설정합니다.

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

**경고**: 이 `hostPort` 파라미터는 호스트의 포트를 엽니다. 방화벽이 애플리케이션 또는 신뢰할 수 있는 소스로부터의 액세스만 허용하는지 확인하세요. 네트워크 플러그인이 `hostPorts`를 지원하지 않는 경우, Agent 파드 사양에 `hostNetwork: true`를 추가하세요. 이렇게 하면 호스트의 네트워크 네임스페이스가 Datadog Agent와 공유됩니다. 이것은 또한 컨테이너에서 열린 모든 포트가 호스트에서 열린다는 것을 의미합니다. 호스트와 컨테이너 모두에서 포트를 사용하는 경우, 동일한 네트워크 네임스페이스를 공유하기 때문에 포트가 충돌하고 파드가 시작되지 않습니다. 일부 Kubernetes 설치는 이를 허용하지 않습니다.


{{% /tab %}}
{{% tab "Unix 도메인 소켓 (UDS)" %}}

UDS를 통해 APM 트레이스 수집을 활성화하려면 DaemonSet 설정 파일을 열고 다음을 편집하세요.

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

**참고**: 이 옵션은 Windows에서는 지원되지 않습니다. 대신 [Helm][22] 옵션을 사용하세요.

DaemonSet로 로그 수집을 활성화하려면:

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

   **참고**: `DD_CONTAINER_EXCLUDE_LOGS`를 설정하면 Datadog Agent가 자체 로그를 수집하고 보내는 것을 방지할 수 있습니다. Datadog Agent 로그를 수집하려면 이 파라미터를 제거하세요. 자세한 내용은 [컨테이너 무시를 위한 환경 변수][21]를 참조하세요. OpenShift 환경 내에서 ImageStreams를 사용하는 경우 로그를 수집하도록 컨테이너 `name`과 함께 `DD_CONTAINER_INCLUDE_LOGS`를 설정합니다. 이러한 Exclude/Include 파라미터 값은 모두 정규식을 지원합니다.

2. 재시작 또는 네트워크 문제 발생 시 컨테이너 로그의 손실을 방지하기 위해 `pointerdir` 볼륨을 마운트합니다. 또한, `/var/log/pods`는 이 디렉토리에 대한 심볼릭 링크이므로 `/var/lib/docker/containers`를 마운트하여 Kubernetes 로그 파일을 통해 로그를 수집합니다:

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

   `pointerdir`는 Agent가 로그를 수집하는 모든 컨테이너에 대한 포인터가 있는 파일을 저장하는 데 사용됩니다. 이는 Agent를 다시 시작하거나 네트워크 문제가 발생했을 때 로그 손실을 방지합니다.

### 권한 없음

(선택 사항) 권한 없는 설치를 실행하려면 [파드 템플릿][2]에 다음을 추가합니다:

```yaml
  spec:
    securityContext:
      runAsUser: <USER_ID>
      supplementalGroups:
        - <DOCKER_GROUP_ID>
```

`<USER_ID>`는 에이전트를 실행할 UID이며, `<DOCKER_GROUP_ID>`는 도커 또는 컨테이너화된 소켓을 소유한 그룹 ID입니다.

Agent가 루트 사용자가 아닌 사용자로 실행되는 경우 `/var/lib/docker/containers` 에 포함된 로그 파일을 직접 읽을 수 없습니다. 이 경우 Agent 컨테이너에 Docker 소켓을 마운트하여 Docker daemon에서 컨테이너 로그를 가져와야 합니다.



### Cluster Agent 이벤트 수집

Datadog Cluster Agent가 Kubernetes 이벤트를 수집하도록 하려면 다음 단계를 사용하세요.

1. `leader_election` 변수 또는 `DD_LEADER_ELECTION` 환경 변수를 `false`로 설정하여 Node Agent에서 리더 선출을 비활성화합니다.

2. Cluster Agent 배포 파일에서 `DD_COLLECT_KUBERNETES_EVENTS` 및 `DD_LEADER_ELECTION` 환경 변수를 `true`로 설정합니다.

      ```yaml
        - name: DD_COLLECT_KUBERNETES_EVENTS
          value: "true"
        - name: DD_LEADER_ELECTION
          value: "true"
      ```

위 단계에 설명된 대로 리더 선출을 설정할 때 단 하나의 Cluster Agent가 이벤트를 수집하도록 합니다.

대신 Node Agent에서 Kubernetes 이벤트를 수집하려면 Agent 매니페스트에서 환경 변수`DD_COLLECT_KUBERNETES_EVENTS` 및 `DD_LEADER_ELECTION`을 `true`로 설정합니다.

```yaml
- name: DD_COLLECT_KUBERNETES_EVENTS
  value: "true"
- name: DD_LEADER_ELECTION
  value: "true"
```

## 환경 변수

다음은 DaemonSet을 사용하는 Datadog Agent에 사용할 수 있는 환경 변수 목록입니다.

### 글로벌 옵션

| 환경 변수         | 설명                                                                                                                                                                                                                                                                                                                                      |
|----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_API_KEY`         | Datadog API 키(**필수**)                                                                                                                                                                                                                                                                                                              |
| `DD_ENV`             | 내보내기한 모든 데이터에 글로벌 `env` 태그 설정                                                                                                                                                                                                                                                                                                  |
| `DD_HOSTNAME`        | 모든 메트릭에 대해 사용할 수 있는 호스트 이름(자동 감지 실패)                                                                                                                                                                                                                                                                                             |
| `DD_TAGS`            | 공백으로 구분된 호스트 태그. 예: `simple-tag-0 tag-key-1:tag-value-1`                                                                                                                                                                                                                                                                 |
| `DD_SITE`            | 메트릭, 트레이스 및 로그가 도달하는 사이트입니다. `DD_SITE`은(는) {{< region-param key="dd_site" code="true">}}입니다. 기본값은 `datadoghq.com`입니다.                                                                                                                                                                                               |
| `DD_DD_URL`          | 메트릭 제출을 위한 URL을 재정의하는 옵션 설정입니다.                                                                                                                                                                                                                                                                                      |
| `DD_URL` (6.36+/7.36+)            | `DD_DD_URL`에 대한 별칭입니다. `DD_DD_URL`이(가) 이미 설정된 경우 무시합니다.                                                                                                                                                                                                                                                                                    |
| `DD_CHECK_RUNNERS`   | Agent는 기본적으로 동시에 모든 검사를 실행합니다(기본값 = `4` 러너). 순차적으로 검사를 실행하려면 값을 `1`로 설정합니다. 많은 수의 검사(또는 느린 검사)을 실행해야 하는 경우 `collector-queue` 구성 요소가 늦게 작동해 상태 검사에 실패할 수 있습니다. 또한, 동시에 검사를 실행할 수 있도록 러너 개수를 늘릴 수 있습니다. |
| `DD_LEADER_ELECTION` | 클러스터에서 Agent의 여러 인스턴스가 실행되는 경우 이 변수를 `true`로 설정하여 이벤트 중복 수집을 방지합니다.                                                                                                                                                                                                                         |

### 프록시 설정

Agent v6.4.0(및 Trace Agent를 위한 v6.5.0)으로 시작하여 Agent 프록시 설정을 다음 환경 변수로 덮어쓸 수 있습니다.

| 환경 변수             | 설명                                                            |
|--------------------------|------------------------------------------------------------------------|
| `DD_PROXY_HTTP`          | `http` 요청에 대해 프록시로 사용할 HTTP URL.                     |
| `DD_PROXY_HTTPS`         | `https` 요청에 대해 프록시로 사용할 HTTPS URL.                   |
| `DD_PROXY_NO_PROXY`      | 프록시를 사용하지 않아야 하는 공백으로 구분된 URL 목록.      |
| `DD_SKIP_SSL_VALIDATION` |  Agent가 Datadog에 연결 시 문제가 있는 경우 테스트할 수 있는 옵션입니다. |

프록시 설정에 대한 자세한 내용은 [Agent v6 프록시 문서][23]를 참조하세요.



### DogStatsD (커스텀 메트릭)

[StatsD 프로토콜][24]을 사용하여 커스텀 메트릭을 보냅니다.

| 환경 변수                     | 설명                                                                                                                                                |
|----------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` | 다른 컨테이너에서 DogStatsD 패킷 수신 (커스텀 메트릭 전송에 필요)                                                                       |
| `DD_HISTOGRAM_PERCENTILES`       | 계산을 위한 히스토그램 백분위수(공백으로 구분)입니다. 기본값은 `0.95`입니다.                                                                         |
| `DD_HISTOGRAM_AGGREGATES`        | 히스토그램은 계산을 위해 집계됩니다(공백으로 구분). 기본값은 `"max median avg count"`입니다.                                                          |
| `DD_DOGSTATSD_SOCKET`            | 수신할 Unix 소켓 경로입니다. `rw`(으)로 마운트된 볼륨이어야 합니다.                                                                                    |
| `DD_DOGSTATSD_ORIGIN_DETECTION`  | Unix 소켓 메트릭을 위한 컨테이너 감지 및 태깅을 활성화합니다.                                                                                            |
| `DD_DOGSTATSD_TAGS`              | 이 DogStatsD 서버가 수신한 모든 메트릭, 이벤트 및 서비스 검사에 추가할 태그입니다. 예: `"env:golden group:retrievers"` |

[Unix 도메인 소켓을 통한 DogStatsD][25]에 대해 자세히 알아보세요.

### 태깅

Datadog은 자동으로 쿠버네티스(Kubernetes)에서 일반적인 태그를 수집합니다. 더 많은 태그를 추출하려면 다음 옵션을 사용하세요.

| 환경 변수                            | 설명             |
|-----------------------------------------|-------------------------|
| `DD_KUBERNETES_POD_LABELS_AS_TAGS`      | 파드 라벨 추출      |
| `DD_KUBERNETES_POD_ANNOTATIONS_AS_TAGS` | 파드 주석 추출 |

자세한 내용은 [Kubernetes 태그 추출][26] 문서를 참조하세요.

### 컨테이너 무시

로그 수집, 메트릭 수집 및 자동 탐지에서 컨테이너를 제외합니다. Datadog은 기본적으로 쿠버네티스(Kubernetes) 및 OpenShift `pause` 컨테이너를 제외합니다. 이 허용 목록과 차단 목록은 자동 탐지에만 적용됩니다. 트레이스와 DogStatsD는 영향을 받지 않습니다. 이러한 환경 변수는 값의 정규 표현을 지원합니다.

| 환경 변수                   | 설명                                                                                                                                                                                                                        |
|--------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_CONTAINER_INCLUDE`         | 포함할 컨테이너 허용 목록입니다(공백으로 구분). `.*`을(를) 사용하여 모두 포함합니다. 예: `"image:image_name_1 image:image_name_2"`, `image:.*`                                                                              |
| `DD_CONTAINER_EXCLUDE`         | 제외할 컨테이너 차단 목록입니다(공백으로 구분). `.*`을(를) 사용해 모두 제외합니다. 예: `"image:image_name_3 image:image_name_4"`, `image:.*`                                                                              |
| `DD_CONTAINER_INCLUDE_METRICS` | 포함하려는 메트릭의 컨테이너 허용 목록입니다.                                                                                                                                                                         |
| `DD_CONTAINER_EXCLUDE_METRICS` | 제외하려는 메트릭의 컨테이너 차단 목록입니다.                                                                                                                                                                         |
| `DD_CONTAINER_INCLUDE_LOGS`    | 포함하려는 로그의 컨테이너 허용 목록입니다.                                                                                                                                                                            |
| `DD_CONTAINER_EXCLUDE_LOGS`    | 제외하려는 로그의 컨테이너 차단 목록입니다.                                                                                                                                                                            |
| `DD_AC_INCLUDE`                | **사용 중단됨**. 포함하려는 컨테이너 허용 목록입니다(공백으로 구분). `.*`을(를) 사용하여 모두 포함합니다. 예: `"image:image_name_1 image:image_name_2"`, `image:.*`                                                              |
| `DD_AC_EXCLUDE`                | **사용 중단됨** 제외하려는 컨테이너 차단 목록입니다(공백으로 구분). `.*`을(를) 사용해 모두 제외합니다. 예: `"image:image_name_3 image:image_name_4"`(**참고**: 이 변수는 자동 탐지에만 허용됨), `image:.*` |

추가 예제는 [Container Discover Management][27] 페이지에서 확인할 수 있습니다.

**참고**: `kubernetes.containers.running`, `kubernetes.pods.running`, `docker.containers.running`, `.stopped`, `.running.total` 및 `.stopped.total` 메트릭은 이러한 설정의 영향을 받지 않습니다. 모든 컨테이너가 집계됩니다.

### 자동 탐지

| 환경 변수                 | 설명                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
|------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_LISTENERS`               | 실행할 자동 탐지 리스너.                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `DD_EXTRA_LISTENERS`         | 추가로 실행할 자동 탐지 리스너. `datadog.yaml` 설정 파일의 `listeners` 섹션에 정의된 변수에 추가됩니다.                                                                                                                                                                                                                                                                                                                                    |
| `DD_CONFIG_PROVIDERS`        |  Agent가 검사 설정을 수집하기 위해 호출해야 하는 공급자입니다. 사용 가능한 공급자는 다음과 같습니다: <br>`kubelet` - 파드 주석에 포함된 템플릿을 처리합니다. <br>`docker` - 컨테이너 라벨에 포함된 템플릿을 처리합니다. <br>`clusterchecks` - Cluster Agent에서 클러스터 레벨 검사 설정을 검색합니다. <br>`kube_services` - 클러스터 검사를 위해 Kubernetes 서비스를 감시합니다. |
| `DD_EXTRA_CONFIG_PROVIDERS`  | 추가로 사용할 자동 탐지 설정 공급자. `datadog.yaml` 설정 파일의 `config_providers` 섹션에 정의된 변수에 추가됩니다. |

### 기타

| 환경 변수                        | 설명                                                                                                                                                                                                                                                         |
|-------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_PROCESS_AGENT_CONTAINER_SOURCE` | 단일 소스를 강제로 적용하기 위해 컨테이너 소스 자동 감지를 재정의합니다. 예: `"docker"`, `"ecs_fargate"`, `"kubelet"`. Agent v7.35.0부터는 더 이상 필요하지 않습니다.                                                                                                     |
| `DD_HEALTH_PORT`                    | 이를 `5555`로 설정하여 포트 `5555`에서 Agent 상태 검사를 표시합니다.                                                                                                                                                                                                 |
| `DD_CLUSTER_NAME`                   | 커스텀 Kubernetes 클러스터 식별자를 설정하여 호스트 별칭 충돌을 방지합니다. 클러스터 이름은 최대 40자까지 입력할 수 있으며 다음과 같은 제한이 있습니다: 소문자, 숫자 및 하이픈만 사용할 수 있으며, 문자로 시작해야 합니다. 또한, 숫자 또는 문자로 끝나야 합니다. |


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
[17]: /ko/network_monitoring/performance/setup/
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