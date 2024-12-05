---
further_reading:
- link: /agent/troubleshooting/debug_mode/
  tag: Agent 트러블슈팅
  text: Agent 디버그 모드
title: Agent 런타임 설정 관리
---

Agent 6.19/7.19 이상의 버전을 실행 중이라면 Agent에서 설정 변경을 적용하기 위해 재시작하지 않고도 런타임 설정의 일부를 동적으로 변경할 수 있습니다.

**참조**: 동적으로 변경한 사항은 지속해서 유지되지 않습니다. Agent를 재시작하면 변경 사항을 잃게 됩니다.

명령어 `config list-runtime`를 사용하면 런타임에 변경 가능한 설정 파라미터 목록이 표시됩니다.

| 플랫폼   | 명령어                                                |
|------------|--------------------------------------------------------|
| 도커(Docker)     | `docker exec datadog-agent agent config list-runtime`  |
| 맥OS(macOS)      | `datadog-agent config list-runtime`                    |
| CentOS     | `sudo datadog-agent config list-runtime`               |
| 데비안(Debian)     | `sudo datadog-agent config list-runtime`               |
| 쿠버네티스(Kubernetes) | `kubectl exec <POD_NAME> agent config list-runtime`    |
| 페도라(Fedora)     | `sudo datadog-agent config list-runtime`               |
| 레드햇(Redhat)     | `sudo datadog-agent config list-runtime`               |
| SUSE       | `sudo datadog-agent config list-runtime`               |
| 소스     | `sudo datadog-agent config list-runtime`               |
| 윈도우즈(Windows)    | 전용 [윈도우즈(Windows) 가이드][1]를 참조하세요       |

런타임에 변경할 수 있는 파라미터 중 하나는 로그 레벨입니다. Agent 설정을 파기한 다음 Agent를 실행 중인 컨테이너를 재생성하지 않는 한 설정을 변경할 수 없는 컨테이너화 환경의 디버그 목적으로 유용한 옵션입니다. 쿠버네티스 배포 환경에서 동적으로 로그 레벨을 설정하려면 다음의 명령어를 호출하세요.

```text
kubectl exec <POD_NAME> agent config set log_level debug
```

`config get <SETTING>`을 사용하면 현재 런타임에 수정 가능한 설정값을 가져올 수 있습니다. 예를 들어, 다음을 실행하여 리눅스 시스템의 현재 로그 레벨을 확인합니다.

```text
sudo datadog-agent config get log_level
```

`config` 명령어를 사용하면 구성 완료된 런타임 설정이 표시됩니다.


## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/agent/basic_agent_usage/windows/#agent-v6