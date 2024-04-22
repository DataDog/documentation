---
kind: 설명서
title: Docker 로그 수집 문제 해결 가이드
---

Container Agent 또는 로컬에 설치된 Host Agent를 사용하여 Datadog에 새 컨테이너 로그를 보낼 때 자주 발생하는 몇 가지 문제가 있습니다. 이 가이드는 이러한 문제를 해결하는데 도움이 됩니다. 만일 문제가 지속될 경우 [Datadog 지원팀]에 문의하세요. 

## Agent 상태 점검

1. 로깅 Agent에 문제가 있는지 확인하려면 다음 명령을 실행합니다.

    ```
    docker exec -it <CONTAINER_NAME> agent status
    ```

2. 모든 것이 원활하게 실행되면 다음과 같은 상태가 표시됩니다.

    ```
    ==========
    Logs Agent
    ==========
        LogsProcessed: 42
        LogsSent: 42

      container_collect_all
      ---------------------
        Type: docker
        Status: OK
        Inputs: 497f0cc8b673397ed31222c0f94128c27a480cb3b2022e71d42a8299039006fb
    ```

3.  Logs Agent 상태가 위와 같지 않으면 다음 섹션의 문제 해결 팁을 참조하세요.

4. 위 예시와 같은 상태가 표시되지만 여전히 로그를 수신하지 못하는 경우 [상태: 오류 없음](#status-no-errors) 섹션을 참조하세요.

## Logs Agent

### 상태: 실행되지 않음

Agent 상태 명령을 실행할 때 다음 메시지가 표시되는 경우:

```text
==========
Logs Agent
==========

  Logs Agent is not running
```

이는 Agent에서 로깅을 활성화하지 않았음을 의미합니다.

Container Agent에 대한 로깅을 활성화하려면 환경 변수 `DD_LOGS_ENABLED=true`를 설정합니다.

### 처리되거나 전송된 로그 없음

로그 Agent 상태에 통합이 표시되지 않고 `LogsProcessed: 0 and LogsSent: 0`이 표시되는 경우:

```text
==========
Logs Agent
==========
    LogsProcessed: 0
    LogsSent: 0
```

이 상태는 로그가 활성화되었지만 Agent가 수집해야 하는 컨테이너를 지정하지 않았음을 의미합니다.

1. 어떤 환경 변수를 설정했는지 확인하려면 `docker inspect <AGENT_CONTAINER>` 명령을 실행합니다.

2. 다른 컨테이너에서 수집하도록 Agent를 설정하려면 `DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL` 환경 변수를 `true`로 설정합니다.


## 파일 문제에서 Docker 로그 수집

버전 6.33.0/7.33.0+에서는 디스크의 로그 파일에 액세스할 수 있는 한 Agent가 기본적으로 디스크의 로그 파일에서 Docker 로그를 수집합니다. 이 동작을 비활성화하려면 `DD_LOGS_CONFIG_DOCKER_CONTAINER_USE_FILE`을 `false`로 설정합니다.

Agent는 로그 파일 경로에 액세스할 수 없는 경우 Docker 소켓에서 컨테이너를 추적합니다. Agent가 Docker 소켓을 사용하여 특정 컨테이너에서 로그를 수집한 경우 중복 로그 전송을 방지하기 위해 계속해서 수집합니다(Agent 재시작 후 포함). Agent가 파일에서 로그를 수집하도록 하려면 `DD_LOGS_CONFIG_DOCKER_CONTAINER_FORCE_USE_FILE`을 `true`로 설정합니다. 이 설정으로 인해 Datadog에 중복 로그가 나타날 수 있습니다.

파일에서 Docker 컨테이너 로그를 수집할 때 Agent는 Docker 컨테이너 로그가 저장된 디렉터리(Linux의 경우 `/var/lib/docker/containers`)에서 읽을 수 없는 경우 Docker 소켓에서 수집을 대체합니다. 경우에 따라 Datadog Agent가 파일에서 로그를 수집하지 못할 수도 있습니다. 이를 진단하려면 Logs Agent 상태를 확인하고 다음과 유사한 오류를 표시하는 파일 유형 항목을 찾습니다.

```text
    - Type: file
      Identifier: ce0bae54880ad75b7bf320c3d6cac1ef3efda21fc6787775605f4ba8b6efc834
      Path: /var/lib/docker/containers/ce0bae54880ad75b7bf320c3d6cac1ef3efda21fc6787775605f4ba8b6efc834/ce0bae54880ad75b7bf320c3d6cac1ef3efda21fc6787775605f4ba8b6efc834-json.log
      Status: Error: file /var/lib/docker/containers/ce0bae54880ad75b7bf320c3d6cac1ef3efda21fc6787775605f4ba8b6efc834/ce0bae54880ad75b7bf320c3d6cac1ef3efda21fc6787775605f4ba8b6efc834-json.log does not exist
```

이 상태는 Agent가 특정 컨테이너에 대한 로그 파일을 찾을 수 없음을 의미합니다. 이 문제를 해결하려면 Docker 컨테이너 로그가 포함된 폴더가 Datadog Agent 컨테이너에 올바르게 노출되는지 확인하세요. Linux에서는 Agent 컨테이너를 시작하는 명령줄의  `-v /var/lib/docker/containers:/var/lib/docker/containers:ro` 에 해당하지만 Windows에서는`-v c:/programdata/docker/containers:c:/programdata/docker/containers:ro`에 해당합니다. 기본 호스트와 관련된 디렉터리는 Docker 데몬의 특정 설정으로 인해 다를 수 있습니다. 이는 올바른 Docker 볼륨 매핑이 보류되는 문제가 아닙니다. 예를 들어 Docker 데이터 디렉터리가 기본 호스트의 `/data/docker`로 재배치된 경우  `-v /data/docker/containers:/var/lib/docker/containers:ro`를 사용합니다.

로그가 수집되었지만 한 줄이 분할된 것처럼 보이는 경우 Docker 데몬이 [JSON 로깅 드라이버](#your-containers-are-not-using-the-json-logging-driver)를 사용하고 있는지 확인하세요.

**참고:** 호스트에 Agent를 설치하면 Agent에는 `/var/lib/docker/containers`에 대한 액세스 권한이 없습니다. 따라서 호스트에 설치되면 Agent는 Docker 소켓에서 로그를 수집합니다.


### 상태: 보류 중


 Logs Agent 상태가 `Status: Pending`인 경우:

```text
==========
Logs Agent
==========
    LogsProcessed: 0
    LogsSent: 0

  container_collect_all
  ---------------------
    Type: docker
    Status: Pending
```

이 상태는 Logs Agent가 실행 중이지만 컨테이너 로그 수집을 시작하지 않았음을 의미합니다. 여기에는 몇 가지 이유가 있을 수 있습니다.

#### Docker 데몬이 호스트 Agent 이후에 시작됨

7.17 이전 버전의 Agent의 경우 호스트 Agent가 이미 실행 중인 동안 Docker 데몬이 시작되면 Agent를 재시작하여 컨테이너 수집을 다시 트리거합니다.

#### Docker 소켓이 마운트되지 않음

Container Agent가 Docker 컨테이너에서 로그를 수집하려면 Docker 소켓에 대한 액세스 권한이 있어야 합니다. 액세스 권한이 없으면 `agent.log`에 다음 로그가 나타납니다.

```text
2019-10-09 14:10:58 UTC | CORE | INFO | (pkg/logs/input/container/launcher.go:51 in NewLauncher) | Could not setup the docker launcher: Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?
2019-10-09 14:10:58 UTC | CORE | INFO | (pkg/logs/input/container/launcher.go:58 in NewLauncher) | Could not setup the kubernetes launcher: /var/log/pods not found
2019-10-09 14:10:58 UTC | CORE | INFO | (pkg/logs/input/container/launcher.go:61 in NewLauncher) | Container logs won't be collected
```

Docker 소켓에 대한 액세스를 허용하려면 `-v /var/run/docker.sock:/var/run/docker.sock:ro` 옵션을 사용하여 Agent 컨테이너를 다시 시작합니다.

### 상태: 오류 없음

Logs Agent 상태가 [Agent 상태 확인](#check-the-agent-status)의 예와 비슷하나 로그가 여전히 Datadog 플랫폼에 도달하지 않는 경우 다음 중 하나에 문제가 있을 수 있습니다.

* Datadog으로 로그를 전송하는 데 필요한 포트(10516)가 차단되었습니다.
* 컨테이너가 Agent가 예상하는 것과 다른 로깅 드라이버를 사용하고 있습니다.

#### 포트 10516의 아웃바운드 트래픽이 차단되었습니다.

Datadog Agent는 포트 10516을 사용하여 TCP를 통해 Datadog에 로그를 보냅니다. 해당 연결을 사용할 수 없는 경우 로그 전송이 실패하고 그에 따른 오류가 `agent.log` 파일에 기록됩니다.

OpenSSL, GnuTLS 또는 다른 SSL/TLS 클라이언트를 사용하여 연결을 수동으로 테스트할 수 있습니다. OpenSSL의 경우 다음 명령을 실행합니다.

```shell
openssl s_client -connect intake.logs.datadoghq.com:10516
```

GnuTLS의 경우 다음 명령을 실행합니다.

```shell
gnutls-cli intake.logs.datadoghq.com:10516
```

그런 다음 다음과 같은 로그를 보냅니다.

```text
<API_KEY> 테스트 메시지입니다
```

포트 10516을 여는 것이 옵션이 아닌 경우 `DD_LOGS_CONFIG_USE_HTTP` 환경 변수를 `true`로 설정하여 HTTPS를 통해 로그를 보내도록 Datadog Agent를 설정할 수 있습니다.

#### 컨테이너가 JSON 로깅 드라이버를 사용하지 않습니다.

Docker의 기본값은 json 파일 로깅 드라이버이므로  Container Agent는 먼저 이 드라이버에서 읽기를 시도합니다. 컨테이너가 다른 로깅 드라이버를 사용하도록 설정된 경우 Logs Agent는 컨테이너를 성공적으로 찾을 수 있지만 로그를 수집할 수 없음을 나타냅니다. journald 로깅 드라이버에서 읽도록 Container Agent를 설정할 수도 있습니다.

1. 컨테이너가 어떤 로깅 드라이버를 사용하고 있는지 확실하지 않은 경우 `docker inspect <CONTAINER_NAME>`를 사용하여 확인합니다. 컨테이너가 JSON 로깅 드라이버를 사용하는 경우 Docker Inspect에 다음 블록이 나타납니다.

    ```text
    "LogConfig": {
        "Type": "json-file",
        "Config": {}
    },
    ```

2. 컨테이너가 journald 로깅 드라이버로 설정된 경우 Docker Inspect에 다음 블록이 나타납니다.

    ```text
    "LogConfig": {
        "Type": "journald",
        "Config": {}
    },
    ```

3.  journald 로깅 드라이버에서 로그를 수집하려면 [Datadog-Journald 문서에 따라][2]  journald 통합을 설정하세요.

4. [Docker Agent 문서][3]의 지침에 따라 YAML 파일을 컨테이너에 마운트합니다. Docker 컨테이너용 로그 드라이버 설정에 대한 내용은 [이 문서를 참조하세요][4].

## Agent는 대량의 로그(> 1GB)를 유지한 컨테이너에서 로그를 보내지 않습니다.

디스크에 이미 대용량 로그 파일을 저장한 컨테이너에 대해 로그 검색을 시도하는 동안 Docker 데몬에 성능 문제가 발생할 수 있습니다. 이로 인해 Datadog Agent가 Docker 데몬에서 컨테이너 로그를 수집할 때 읽기 시간 초과가 발생할 수 있습니다.

이 문제가 발생하면 Datadog Agent는 30초마다 특정 컨테이너에 대해 `Restarting reader after a read timeout`을 포함하는 로그를 출력하고 실제로 메시지를 로깅하는 동안 해당 컨테이너에서 로그 전송을 중지합니다.

기본 읽기 제한 시간은 30초로 설정되어 있으며, 이 값을 늘리면 Docker 데몬이 Datadog Agent에 응답하는 데 더 많은 시간이 제공됩니다. 이 값은 `logs_config.docker_client_read_timeout` 파라미터를 사용하거나 `DD_LOGS_CONFIG_DOCKER_CLIENT_READ_TIMEOUT` 환경 변수를 사용하여 `datadog.yaml`에서 설정할 수 있습니다. 이 값은 초 단위의 시간입니다. 아래에서 이 값을 60초로 늘리는 예를 확인하세요.

```yaml
logs_config:
  docker_client_read_timeout: 60
```

## Host Agent
### Docker 그룹의 Agent 사용자

Host Agent를 사용하는 경우 Docker 소켓에서 읽을 수 있는 권한을 가지려면 `dd-agent` 사용자를 Docker 그룹에 추가해야 합니다. `agent.log` 파일에 다음 오류 로그가 표시되는 경우:

```text
2019-10-11 09:17:56 UTC | CORE | INFO | (pkg/autodiscovery/autoconfig.go:360 in initListenerCandidates) | docker listener cannot start, will retry: temporary failure in dockerutil, will retry later: could not determine docker server API version: Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Get http://%2Fvar%2Frun%2Fdocker.sock/version: dial unix /var/run/docker.sock: connect: permission denied

2019-10-11 09:17:56 UTC | CORE | ERROR | (pkg/autodiscovery/config_poller.go:123 in collect) | Unable to collect configurations from provider docker: temporary failure in dockerutil, will retry later: could not determine docker server API version: Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Get http://%2Fvar%2Frun%2Fdocker.sock/version: dial unix /var/run/docker.sock: connect: permission denied
```

Docker 사용자 그룹에 호스트 Agent를 추가하려면 `usermod -a -G docker dd-agent` 명령을 수행합니다.

[1]: /ko/help/
[2]: /ko/integrations/journald/#setup
[3]: /ko/agent/docker/?tab=standard#mounting-conf-d
[4]: https://docs.docker.com/config/containers/logging/journald/