---
aliases:
- /ko/developers/metrics/unix_socket/
description: 유닉스 도메인 소켓을 통한 DogStatsD 사용 설명서
further_reading:
- link: developers/dogstatsd
  tag: 설명서
  text: DogStatsD 소개
- link: developers/libraries
  tag: 설명서
  text: 공식 및 커뮤니티에서 생성한 API 및 DogStatsD 클라이언트 라이브러리
kind: 설명서
title: 유닉스 도메인 소켓을 통한 DogStatsD
---

버전 6.0부터 에이전트는 UDP 트랜스포트의 대안으로 유닉스 도메인 소켓(UDS)을 사용하여 메트릭을 수집할 수 있습니다.

UDP는 `localhost`에서 잘 작동하지만 컨테이너화된 환경에서는 설정하기가 어려울 수 있습니다. 유닉스 도메인 소켓을 사용하면 Datadog 에이전트 컨테이너의 IP에 관계없이 소켓 파일로 연결을 설정할 수 있습니다. 또한 다음과 같은 이점을 제공합니다:

- 네트워킹 스택을 건너 뛰면 트래픽이 많을 때 성능이 크게 향상됩니다.
- UDP에는 오류 처리가 없지만 UDS를 사용하면 에이전트가 삭제된 패킷과 연결 오류를 감지함과 동시에 차단 없이 사용이 가능합니다.
- DogStatsD는 메트릭의 출처가 된 컨테이너를 감지하고 그에 따라 해당 메트릭에 태그를 지정할 수 있습니다.

## 작동 방식

유닉스 도메인 소켓은 연결을 설정하기 위해 `IP:port` 페어을 사용하는 대신 플레이스홀더 소켓 파일을 사용합니다. 연결이 열리면 데이터는 UDP 트랜스포트와 동일한 [데이터그램 형식][1]으로 전송됩니다. 에이전트가 다시 시작되면 기존 소켓이 삭제되고 새 소켓으로 대체됩니다. 클라이언트 라이브러리는 이 변경 사항을 감지하고 새 소켓에 원활하게 연결합니다.

**참고**:

* 설계상 UDS 트래픽은 호스트에 로컬이므로, 메트릭을 전송하는 모든 호스트에서 Datadog 에이전트가 실행되어야 합니다.
* Windows에서는 UDS가 지원되지 않습니다.

## 설정

유닉스 도메인 소켓으로 DogStatsD를 설정하려면 `dogstatsd_socket` 매개 변수를 통해 DogStatsD 서버를 활성화합니다. 그런 다음 코드에서 [DogStatsD 클라이언트](#dogstatsd-client-configuration)를 설정합니다.

에이전트 DogStatsD UDS를 활성화합니다:

{{< tabs >}}
{{% tab "Host" %}}

1. 리스닝 소켓으로 사용할 DogStatsD 소켓 파일을 생성합니다. 예를 들면 다음과 같습니다.
   ```shell
   sudo mkdir -p /var/run/datadog/
   ```
1. `dd-agent` 사용자에게 다음 소켓 파일 읽기 및 쓰기 권한이 있는지 확인하세요.
   ```shell
   sudo chown dd-agent:dd-agent /var/run/datadog/
   ```
1. 다음 [에이전트의 기본 설정 파일][1]을 편집합니다.
   1. `use_dogstatsd`를 `true`로 설정합니다.
   1. `dogstatsd_socket`를 DogStatsD가 리스닝 소켓을 생성하는 경로로 설정합니다.

      ```yaml
      ## @param dogstatsd_socket - string - optional - default: ""
      ## Listen for Dogstatsd metrics on a Unix Socket (*nix only).
      ## Set to a valid and existing filesystem path to enable.
      #
      dogstatsd_socket: '/var/run/datadog/dsd.socket'
      ```
1. [에이전트를 재시작합니다][2].


[1]: /ko/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[2]: /ko/agent/configuration/agent-commands/
{{% /tab %}}
{{% tab "Docker" %}}

1. 에이전트 컨테이너에서 `DD_DOGSTATSD_SOCKET=<YOUR_UDS_PATH>` 환경 변수를 사용하여 소켓 경로를 설정합니다.

2. 양쪽에 호스트 디렉토리를 마운트하여 애플리케이션 컨테이너에서 소켓 파일에 액세스할 수 있도록 합니다 (애플리케이션 컨테이너에서는 읽기 전용, 에이전트 컨테이너에서는 읽기-쓰기). 개별 소켓 대신 상위 폴더를 마운트하면 DogStatsD가 다시 시작될 때 소켓 통신이 지속될 수 있습니다:

    - `-v /var/run/datadog:/var/run/datadog`로 에이전트 컨테이너를 시작합니다.
    - `-v /var/run/datadog:/var/run/datadog:ro`로 애플리케이션 컨테이너를 시작합니다.

{{% /tab %}}
{{% tab "Kubernetes" %}}

1. 에이전트 컨테이너에서 `DD_DOGSTATSD_SOCKET=<YOUR_UDS_PATH>` 환경 변수를 사용해 소켓 경로를 설정합니다. (예: `/var/run/datadog/dsd.socket`).

2. 양쪽에 호스트 디렉토리를 마운트하여 애플리케이션 컨테이너에서 소켓 파일에 액세스할 수 있도록 합니다 (애플리케이션 컨테이너에서는 읽기 전용, 에이전트 컨테이너에서는 읽기-쓰기). 개별 소켓 대신 상위 폴더를 마운트하면 DogStatsD가 다시 시작될 때 소켓 통신이 지속될 수 있습니다.

    - `datadog-agent` 컨테이너에 소켓 폴더를 마운트합니다:

        ```yaml
        volumeMounts:
            - name: dsdsocket
              mountPath: /var/run/datadog
            ##...
        volumes:
            - hostPath:
                  path: /var/run/datadog/
              name: dsdsocket
        ```

    - 애플리케이션 컨테이너에 동일한 폴더를 노출하세요:

        ```yaml
        volumeMounts:
            - name: dsdsocket
              mountPath: /var/run/datadog
              readOnly: true
            ## ...
        volumes:
            - hostPath:
                  path: /var/run/datadog/
              name: dsdsocket
        ```

      **참고**: 애플리케이션 컨테이너에서 소켓에 대한 쓰기 권한이 필요한 경우 `readOnly: true`를 제거합니다.

{{% /tab %}}
{{% tab "EKS Fargate" %}}

1. 에이전트 컨테이너에서 `DD_DOGSTATSD_SOCKET=<YOUR_UDS_PATH>` 환경 변수를 사용해 소켓 경로를 설정합니다. (예: `/var/run/datadog/dsd.socket`).

2. 양쪽에 호스트 디렉토리를 마운트하여 애플리케이션 컨테이너에서 소켓 파일에 액세스할 수 있도록 합니다 (애플리케이션 컨테이너에서는 읽기 전용, 에이전트 컨테이너에서는 읽기-쓰기). 개별 소켓 대신 상위 폴더를 마운트하면 DogStatsD가 다시 시작될 때 소켓 통신이 지속될 수 있습니다.

    - 빈 폴더를 포드 사양에 마운트합니다:

        ```yaml
        volumes:
            - emptyDir: {}
              name: dsdsocket
        ```

    - `datadog-agent` 컨테이너에 소켓 폴더를 마운트합니다:

        ```yaml
        volumeMounts:
            - name: dsdsocket
              mountPath: /var/run/datadog
        ```

    - 애플리케이션 컨테이너에 동일한 폴더를 노출하세요:

        ```yaml
        volumeMounts:
            - name: dsdsocket
              mountPath: /var/run/datadog
              readOnly: true
        ```

      **참고**: 애플리케이션 컨테이너에서 소켓에 대한 쓰기 권한이 필요한 경우 `readOnly: true`를 제거합니다.

{{% /tab %}}
{{< /tabs >}}

### netcat으로 테스트

셸 스크립트에서 메트릭을 보내거나 DogStatsD가 소켓에서 수신 대기 중인지 테스트하려면 `netcat`을 사용합니다. Debian에서 `netcat-openbsd`나 RHEL에서 `nmap-ncat` 등 대부분의 `netcat` 구현은 `-U` 플래그가 있는 유닉스 소켓 트래픽을 지원합니다:

```shell
echo -n "custom.metric.name:1|c" | nc -U -u -w1 /var/run/datadog/dsd.socket
```

### 출처 감지

출처 감지를 사용하면 DogStatsD가 컨테이너 메트릭의 출처를 감지하고, 메트릭에 자동으로 태그를 지정할 수 있습니다. 이 모드를 활성화하면 UDS가 수신하는 모든 메트릭은 자동 탐지 메트릭과 동일한 컨테이너 태그로 태그가 지정됩니다.

{{< tabs >}}
{{% tab "Host" %}}

1. [에이전트의 기본 설정 파일][1]에서 `dogstatsd_origin_detection` 옵션을 활성화합니다:

    ```yaml
    ## @param dogstatsd_origin_detection - boolean - optional - default: false
    ## When using Unix Socket, DogStatsD can tag metrics
    ## with container metadata. If running DogStatsD in a container,
    ## host PID mode (for example, with --pid=host) is required.
    #
    dogstatsd_origin_detection: true
    ```

2. 선택 사항 - 출처 감지를 사용하여 수집된 메트릭에 대해 [태그 카디널리티][2]를 설정하려면 매개 변수 `dogstatsd_tag_cardinality`를 `low` (기본값), `orchestrator`, 또는 `high`로 설정합니다:

    ```yaml
    ## @param dogstatsd_tag_cardinality - string - optional - default: low
    ## Configure the level of granularity of tags to send for DogStatsD
    ## metrics and events. Choices are:
    ##   * low: add tags about low-cardinality objects
    ##     (clusters, hosts, deployments, container images, ...)
    ##   * orchestrator: add tags about pods (Kubernetes),
    ##     or tasks (ECS or Mesos) -level of cardinality
    ##   * high: add tags about high-cardinality objects
    ##     (individual containers, user IDs in requests, etc.)
    ##
    ## WARNING: Sending container tags for DogStatsD metrics may create
    ## more metrics (one per container instead of one per host).
    ## This may impact your custom metrics billing.
    #
    dogstatsd_tag_cardinality: low
    ```

3. [에이전트를 재시작합니다][3].


[1]: /ko/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[2]: /ko/getting_started/tagging/assigning_tags/#environment-variables
[3]: /ko/agent/configuration/agent-commands/
{{% /tab %}}
{{% tab "Docker" %}}

1. 에이전트 컨테이너에 `DD_DOGSTATSD_ORIGIN_DETECTION=true` 환경 변수를 설정합니다.

2. 선택 사항 - 출처 감지를 사용하여 수집된 메트릭에 대해 [태그 카디널리티][2]를 설정하려면 매개 변수 `DD_DOGSTATSD_TAG_CARDINALITY`를 `low` (기본값), `orchestrator`, 또는 `high`로 설정합니다:

컨테이너 내부에서 실행하는 경우, 출처 감지가 안정적으로 작동하려면 호스트의 PID 네임스페이스에서 DogStatsD를 실행해야 합니다. `--pid=host` flag. This is supported by ECS with the parameter `"pidMode": "host"`를 컨테이너의 작업 정의에 추가하여 도커에서 활성화합니다. 이 옵션은 Fargate에서는 지원되지 않습니다. 자세한 내용은 [PID 모드][2]에 대한 AWS 설명서를 참조하세요.


[1]: /ko/getting_started/tagging/assigning_tags/#environment-variables
[2]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html#task_definition_pidmode
{{% /tab %}}
{{% tab "Kubernetes" %}}

1. 에이전트 컨테이너에서 `DD_DOGSTATSD_ORIGIN_DETECTION` 환경 변수를 true로 설정합니다.

    ```yaml
    # (...)
    env:
        # (...)
        - name: DD_DOGSTATSD_ORIGIN_DETECTION
          value: 'true'
    ```

2. 포드 템플릿 사양에서 `hostPID: true`를 설정합니다:

    ```yaml
    # (...)
    spec:
        # (...)
        hostPID: true
    ```

3. 선택 사항 - 출처 감지를 사용하여 수집된 메트릭에 대해 [태그 카디널리티][2]를 설정하려면 매개 변수 `DD_DOGSTATSD_TAG_CARDINALITY`를 `low` (기본값), `orchestrator`, 또는 `high`로 설정합니다:

    ```yaml
    # (...)
    env:
        # (...)
        - name: DD_DOGSTATSD_TAG_CARDINALITY
          value: 'low'
    ```

[1]: /ko/getting_started/tagging/assigning_tags/#environment-variables
{{% /tab %}}
{{% tab "EKS Fargate" %}}

1. 에이전트 컨테이너에서 `DD_DOGSTATSD_ORIGIN_DETECTION` 환경 변수를 true로 설정합니다.

    ```yaml
    # (...)
    env:
        # (...)
        - name: DD_DOGSTATSD_ORIGIN_DETECTION
          value: 'true'
    ```

2. 포드 템플릿 사양에서 `shareProcessNamespace: true`를 설정합니다:

    ```yaml
    # (...)
    spec:
        # (...)
        shareProcessNamespace: true
    ```

3. 선택 사항 - 출처 감지를 사용하여 수집된 메트릭에 대해 [태그 카디널리티][2]를 설정하려면 매개 변수 `DD_DOGSTATSD_TAG_CARDINALITY`를 `low` (기본값), `orchestrator`, 또는 `high`로 설정합니다:

    ```yaml
    # (...)
    env:
        # (...)
        - name: DD_DOGSTATSD_TAG_CARDINALITY
          value: 'low'
    ```

[1]: /ko/getting_started/tagging/assigning_tags/#environment-variables
{{% /tab %}}
{{< /tabs >}}

**참고: ** `container_id`, `container_name`, `pod_name` 태그는 너무 많은 [커스텀 메트릭][2]이 생성되지 않도록 하기 위해 기본적으로 추가되지 않습니다.

## DogStatsD 클라이언트 설정

### 클라이언트 라이브러리

다음 공식 DogStatsD 클라이언트 라이브러리는 기본적으로 UDS 트래픽을 지원합니다. UDS 트래픽을 활성화하는 방법은 라이브러리 설명서를 참조하세요. **참고**: UDP와 마찬가지로 트래픽이 많을 때 성능을 개선하려면 클라이언트 사이드 버퍼링을 활성화하는 것이 좋습니다:

| 언어 | 라이브러리                              |
| -------- | ------------------------------------ |
| Golang   | [DataDog/datadog-go][3]              |
| 자바(Java)     | [DataDog/java-dogstatsd-client][4]   |
| 파이썬(Python)   | [DataDog/datadogpy][5]               |
| 루비(Ruby)     | [DataDog/dogstatsd-ruby][6]          |
| PHP      | [DataDog/php-datadogstatsd][7]       |
| C#       | [DataDog/dogstatsd-csharp-client][8] |

### socat 프록시

애플리케이션 또는 클라이언트 라이브러리가 UDS 트래픽을 지원하지 않는 경우, `socat`을 실행하여 UDP 포트 `8125` 에서 수신 대기하고 요청을 소켓에 프록시합니다:

```shell
socat -s -u UDP-RECV:8125 UNIX-SENDTO:/var/run/datadog/dsd.socket
```

추가 구현 옵션 생성에 대한 지침은 [datadog-agent GitHub 위키][9]를 참조하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/metrics/custom_metrics/dogstatsd_metrics_submission/
[2]: /ko/metrics/custom_metrics/
[3]: https://github.com/DataDog/datadog-go#unix-domain-sockets-client
[4]: https://github.com/DataDog/java-dogstatsd-client#unix-domain-socket-support
[5]: https://github.com/DataDog/datadogpy#instantiate-the-dogstatsd-client-with-uds
[6]: https://github.com/DataDog/dogstatsd-ruby#configuration
[7]: https://github.com/DataDog/php-datadogstatsd
[8]: https://github.com/DataDog/dogstatsd-csharp-client#unix-domain-socket-support
[9]: https://github.com/DataDog/datadog-agent/wiki/Unix-Domain-Sockets-support