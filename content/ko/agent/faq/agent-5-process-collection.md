---
kind: faq
private: true
title: 에이전트 v5를 사용한 프로세스 수집
---

## 표준 에이전트 설정

**실시간 프로세스는 Datadog 에이전트 버전 5.16.0 이상에서 사용할 수 있습니다.**
플랫폼별 자세한 내용은 표준 [에이전트 설치 지침서][1]를 참고하세요.

**참고**: 에이전트의 소스 설치 방법에는 실시간 프로세스를 사용할 수 없습니다.

Datadog 에이전트가 설치되면 다음 위치에서 [설정 파일][2]을 편집하여 실시간 프로세스 수집을 실행하세요.

```text
/etc/dd-agent/datadog.conf
```

다음 행을 `[Main]` 섹션에 추가합니다.

```yaml
    process_agent_enabled: true
```

설정이 완료되면 [에이전트 재시작][3]을 누릅니다.
**참고**: 표준 설치에서 컨테이너 정보를 수집하려면 `dd-agent` 사용자에게 `docker.sock` 접근 권한이 있어야 합니다.

## Docker 컨테이너

Datadog 에이전트 이미지 버전 5.16.0 이상으로 업데이트:

    $ docker pull gcr.io/datadoghq/docker-dd-agent

[docker-dd-agent][4]의 지침에 따라 다른 커스텀 설정과 함께 다음 특성을 전달하세요.

```text
-v /etc/passwd:/etc/passwd:ro
-e DD_PROCESS_AGENT_ENABLED=true
```

## Kubernetes DaemonSet

DaemonSet를 생성하는 데 사용되는 [dd-agent.yaml][5] 매니페스트에서 다음 환경 변수, 볼륨 마운트 및 볼륨을 추가합니다.

```yaml
 env:
    - name: DD_PROCESS_AGENT_ENABLED
      value: "true"
  volumeMounts:
    - name: passwd
      mountPath: /etc/passwd
      readOnly: true
  volumes:
    - hostPath:
        path: /etc/passwd
      name: passwd
```

자세한 설명서는 표준 [DaemonSEt 설치][6] 및 [docker-dd-agent][4] 정보 페이지를 참고하세요.

[1]: https://app.datadoghq.com/account/settings/agent/5?platform=overview
[2]: /ko/agent/faq/where-is-the-configuration-file-for-the-agent/
[3]: /ko/agent/configuration/agent-commands/#start-stop-restart-the-agent
[4]: https://github.com/DataDog/docker-dd-agent
[5]: https://github.com/DataDog/docker-dd-agent#configuration-files
[6]: /ko/agent/kubernetes/