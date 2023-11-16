---
aliases:
- /ko/agent/faq/kubernetes-docker-socket-log-collection
further_reading:
- link: /agent/autodiscovery/
  tag: 설명서
  text: Docker 에이전트 자동탐지
- link: /agent/kubernetes/host_setup/
  tag: 설명서
  text: Kubernetes 호스트 설정
- link: /agent/kubernetes/integrations/
  tag: 설명서
  text: 커스텀 통합
kind: faq
title: Docker 소켓을 사용한 로그 수집
---

에이전트는 Docker 소켓과 Kubernetes 로그 파일(Kubernetes에서 자동으로 처리)의 두 가지 방법으로 로그를 수집할 수 있습니다. 다음과 같은 경우 로그 파일 수집을 사용합니다.

* Docker가 런타임이 아니며, **또는**
* 각 노드에서 10개 이상의 컨테이너 사용

Docker API는 한 번에 하나의 컨테이너에서 로그를 가져오도록 최적화되어 있습니다. 동일한 노드에 많은 컨테이너가 있을 경우, Docker 소켓을 통해 로그를 수집하는 것은 파일을 수집하는 것보다 훨씬 많은 리소스를 소비할 수 있습니다.

{{< tabs >}}
{{% tab "DaemonSet" %}}

Docker 소켓을 Datadog 에이전트에 연결합니다.

```yaml
  # (...)
    env:
      - {name: "DD_CRI_SOCKET_PATH", value: "/host/var/run/docker.sock"}
      - {name: "DOCKER_HOST", value: "unix:///host/var/run/docker.sock"}
  # (...)
    volumeMounts:
    #  (...)
      - name: dockersocketdir
        mountPath: /host/var/run
  # (...)
  volumes:
    # (...)
    - hostPath:
        path: /var/run
      name: dockersocketdir
  # (...)
```

**참고**: 포함된 전체 디렉토리 대신 `docker.sock` 소켓만 연결하면 Docker 데몬이 재시작된 후 에이전트가 복구되지 않습니다.

{{% /tab %}}
{{< /tabs >}}

### 단기 컨테이너{#short-lived-container-socket}

Docker 환경의 경우 에이전트는 Docker 이벤트를 통해 컨테이너 업데이트를 실시간으로 수신합니다. 에이전트는 매초마다 컨테이너 레이블(자동탐지)에서 설정을 추출하고 업데이트합니다.
에이전트 v6.14+ 이후 에이전트는 모든 컨테이너(실행 중 또는 중지됨)에 대한 로그를 수집합니다. 즉, 지난 초 동안 시작되고 중지된 단기 컨테이너 로그는 제거되지 않는 한 계속 수집됩니다.