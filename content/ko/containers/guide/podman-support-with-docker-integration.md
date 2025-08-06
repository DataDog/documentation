---
aliases:
- /ko/agent/guide/podman-support-with-docker-integration
title: Podman 컨테이너 런타임과 Docker 통합 사용하기
---

Podman은 Linux 시스템에서 OCI 컨테이너를 개발, 관리, 실행하기 위한 데몬이 없는 컨테이너 엔진입니다. 자세한 내용은 [https://podman.io/][1]에서 확인하세요.

Podman을 사용하면 루트리스 및 루트풀 컨테이너를 배포할 수 있습니다. 루트리스 컨테이너는 관리자 권한이 없는 사용자가 실행할 수 있습니다. 루트풀 컨테이너는 루트로 실행되는 컨테이너를 의미합니다. 루트리스 컨테이너의 주요 이점은 컨테이너가 공격의 대상이 된 경우 호스트에서 잠재적 공격자가 루트 권한을 얻을 수 없다는 데 있습니다.
Datadog Agent는 루트리스 및 루트풀 컨테이너 모두와 함께 작동합니다.

## 필수 조건

* Podman 버전 >= 3.2.0
* Datadog Agent 버전 >= 7.30.0

## 루트리스 Podman 컨테이너로 Agent 배포

Agent를 루트리스 Podman 컨테이너로 배포를 위해 실행할 명령은 [Docker][2]에 사용된 것과 유사합니다.

가장 큰 차이점은 Agent는 런타임 소켓에 액세스할 수 없기 때문에 필요한 컨테이너 정보를 추출하기 위해 Podman DB에 의존한다는 것입니다. 따라서 Docker 소켓을 마운트하고 `DOCKER_HOST`를 설정하는 대신 Podman DB(아래 명령어에서`<PODMAN_DB_PATH>`)를 마운트해야 합니다.
일부 시스템에서는 Podman DB의 경로가 `$HOME/.local/share/containers/storage/libpod/bolt_state.db`지만 시스템마다 다를 수 있습니다. 이에 따라 아래 명령어에서 `<PODMAN_DB_PATH>`를 설정하세요.

```
$ podman run -d --name dd-agent \
    --cgroupns host --pid host \
    -v <PODMAN_DB_PATH>:/var/lib/containers/storage/libpod/bolt_state.db:ro \
    -v /proc/:/host/proc/:ro \
    -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
    -e DD_API_KEY=<API_KEY> \
    -e DD_HOSTNAME=<DD_HOSTNAME> \
    gcr.io/datadoghq/agent:latest
```

Agent는 Podman 명령을 실행했는데 관리자가 아닌 사용자가 관리하는 모든 컨테이너를 감지하고, 해당하는 전체 컨테이너에 `container.*` 메트릭을 전송해야 합니다.

## Podman 루트풀 컨테이너로 Agent 배포

루트리스 컨테이너를 실행할 때는 위의 예제에서와 같이 Podman DB를 사용하거나 Podman 소켓을 사용하는 두 가지 옵션이 있습니다.

### Podman DB 사용하기

DB를 사용해 실행하는 명령은 위에 제공된 명령과 동일합니다. 그러나 루트를 포함해 사용자마다 DB 경로가 다르다는 점에 유의하세요. 루트의 경우 일반적으로 `/var/lib/containers/storage/libpod/bolt_state.db`지만 시스템마다 다를 수 있으므로, 경우에 따라 `<PODMAN_DB_PATH>`를 설정하세요.

### Podman 소켓 사용하기

Podman 소켓은 Docker 소켓과 호환됩니다. 그렇기 때문에 이 경우 Datadog Agent는 Docker에서 실행할 때와 동일하게 모든 것을 실행합니다(예: `Docker.*` 메트릭 전송).

루트로 실행되는 Podman 소켓에 의존하는 Agent를 배포하는 방법:
```
$ podman run -d --name dd-agent \
    --cgroupns host --pid host \
    -v /run/podman/podman.sock:/run/podman/podman.sock:ro \
    -v /proc/:/host/proc/:ro \
    -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
    -e DD_API_KEY=<API_KEY> \
    -e DD_HOSTNAME=<DD_HOSTNAME> \
    -e DOCKER_HOST=unix:///run/podman/podman.sock \
    gcr.io/datadoghq/agent:latest
```

두 경우 모두 Agent는 루트에서 관리하는 모든 컨테이너를 감지하고, 해당하는 모든 컨테이너에 `container.*` 메트릭을 내보내야 합니다.

[1]: https://podman.io/
[2]: /ko/agent/docker