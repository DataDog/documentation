---
aliases:
- /ko/agent/guide/podman-support-with-docker-integration
title: Podman 컨테이너 런타임과 Docker 통합 사용하기
---

Podman은 Linux 시스템에서 OCI 컨테이너를 개발, 관리 및 실행하기 위한 데몬리스 컨테이너 엔진입니다. 자세한 내용은 [https://podman.io/ ][1]를 참조하세요.

Podman을 사용하면 루트리스 또는 루트풀 컨테이너를 배포할 수 있습니다. 루트리스 컨테이너는 관리자 권한이 없는 사용자가 실행할 수 있는 반면, 루트풀 컨테이너는 루트로 실행되는 컨테이너입니다.
루트리스 컨테이너가 제공하는 주요 이점은 컨테이너가 손상되었을 때 잠재적 공격자가 호스트에 대한 루트 권한을 얻을 수 없다는 것입니다.
Datadog Agent는 루트리스 컨테이너와 루트풀 컨테이너 모두와 함께 작동합니다.

## 요구 사항

* Podman 버전 >= 3.2.0
* Datadog Agent 버전 >= 7.30.0

## Agent를 Podman 루트리스 컨테이너로 베포하기

Agent를 루트리스 Podman 컨테이너로 배포하려면 실행 명령은 [Docker][2]에 사용된 명령과 유사합니다.

주요 차이점은 Agent가 런타임 소켓에 액세스할 수 없기 때문에 Podman DB를 사용하여 필요한 컨테이너 정보를 추출한다는 것입니다. 따라서 Docker 소켓을 마운트하고 `DOCKER_HOST` 설정하는 대신 Podman DB를 마운트해야 합니다(아래 명령어에서 `<PODMAN_DB_PATH>`).
일부 시스템에서는 Podman DB의 경로가 `$HOME/.local/share/containers/storage/libpod/bolt_state.db`이지만 해당 시스템에서는 다를 수 있습니다. 시스템에 따라 아래 명령에서 `<PODMAN_DB_PATH>`를 설정하세요.

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

Agent는 Podman 명령을 실행한 사용자(비관리자)가 관리하는 모든 컨테이너를 감지해아 합니다. 그리고 모든 컨테이너에 대한 `container.*` 메트릭을 내보내야 합니다.

## Agent를 Podman 루트풀 컨테이너로 배포하기

루트풀 컨테이너를 실행할 때는 두 가지 옵션이 있습니다. 위의 예와 같이 루트리스 컨테이너를 사용하는 Podman DB를 사용하거나 Podman 소켓을 사용하는 것입니다.

### Podman DB 사용하기

DB를 사용하여 실행하는 명령어는 위에 제공된 명령어와 동일하지만 루트를 포함하여 사용자마다 DB 경로가 상이합니다. 루트의 경우 `/var/lib/containers/storage/libpod/bolt_state.db`가 일반적이지만 시스템에서 다를 수 있으므로 이에 맞게 `<PODMAN_DB_PATH>`를 설정합니다.

### Podman 소켓 사용하기

Podman 소켓은 Docker 소켓과 호환되므로 Datadog Agent는 Docker에서 실행되는 것처럼 모든 것을 실행합니다. 예를 들어 `docker.*` 메트릭을 방출한다는 의미입니다.

Podman 소켓에 의존하는 Agent를 배포하려면 루트로 실행하세요.
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

두 경우 모두 Agent는 루트별로 관리되는 모든 컨테이너를 탐지하고 모든 컨테이너에 대한 `container.*` 메트릭을 내보내야 합니다.

[1]: https://podman.io/
[2]: /ko/agent/docker