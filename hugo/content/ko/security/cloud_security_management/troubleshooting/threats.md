---
aliases:
- /ko/security_platform/cloud_workload_security/troubleshooting/
- /ko/security_platform/cloud_security_management/troubleshooting/
further_reading:
- link: /security/cloud_security_management/troubleshooting/vulnerabilities
  tag: 설명서
  text: CSM Vulnerabilities 트러블슈팅
title: Cloud Security Management Threats 트러블슈팅
---

## 개요

Cloud Security Management (CSM) Threats와 관련된 문제가 발생하는 경우 다음 트러블슈팅 지침을 따르세요. 추가 지원이 필요한 경우 [Datadog 지원팀][1]에 문의하세요.

## Security Agent 플레어

[Agent 플레어][1]와 마찬가지로 하나의 플레어 명령으로 Datadog 지원팀에 필요한 문제 해결 정보를 보낼 수 있습니다.

플레어는 업로드하기 전에 확인을 요청하므로 Security Agent가 콘텐츠를 보내기 전에 검토할 수 있습니다.

아래 명령에서 Datadog 지원 케이스 ID가 있는 경우 `<CASE_ID>`를 해당 ID로 바꾼 다음 연결된 이메일 주소를 입력합니다.

케이스 ID가 없는 경우 Datadog에 로그인하는 데 사용된 이메일 주소를 입력하여 새 지원 케이스를 생성합니다.

| 플랫폼     | 명령어                                                                             |
| --------     | -------                                                                             |
| Docker       | `docker exec -it datadog-agent security-agent flare <CASE_ID>`                      |
| 쿠버네티스(Kubernetes)   | `kubectl exec -it <POD_NAME> -c security-agent -- security-agent flare <CASE_ID>`   |
| 호스트         | `sudo /opt/datadog-agent/embedded/bin/security-agent flare <CASE_ID>`               |

## Agent 자체 테스트

`security-agent`와 `system-probe` 간의 통신이 예상대로 작동하고 Cloud Security Management Threats (CSM Threats)가 시스템 이벤트를 감지할 수 있는지 확인하려면 다음 명령을 실행하여 자체 테스트를 수동으로 트리거할 수 있습니다.

| 플랫폼     | 명령어                                                                             |
| --------     | -------                                                                             |
| Docker       | `docker exec -it datadog-agent security-agent runtime self-test`                    |
| 쿠버네티스(Kubernetes)   | `kubectl exec -it <POD_NAME> -c security-agent -- security-agent runtime self-test` |
| 호스트         | `sudo /opt/datadog-agent/embedded/bin/security-agent runtime self-test`             |

자체 테스트 절차에서는 일부 임시 파일과 규칙을 생성하여 이를 모니터링한 다음 해당 규칙을 트리거하여 이벤트가 올바르게 전파되는지 확인합니다.

규칙이 전파되면 다음 응답이 나타납니다.
```
Runtime self test: OK
```

이제 Log Explorer의 `runtime-security-agent`에서 들어오는 이벤트를 볼 수 있습니다.

{{< img src="security/cws/self_test_logs.png" alt="Log Explorer의 자체 테스트 이벤트" style="width:90%;">}}

## 커스텀 Kubernetes 네트워크 플러그인과의 호환성

CSM Threats의 네트워크 기반 탐지는 Linux 커널의 트래픽 제어 하위 시스템에 의존합니다. 이 하위 시스템은 여러 공급업체가 "clsact" ingress qdisc에서 필터를 삽입, 교체 또는 삭제하려고 시도하는 경우 경쟁 조건을 발생시키는 것으로 알려져 있습니다.  CSM Threats가 올바르게 구성되었는지 확인하려면 아래 체크리스트를 따르세요.

* 공급업체가 eBPF 트래픽 제어 분류자를 활용하는지 확인하세요. 그렇지 않은 경우 이 단락을 무시해도 됩니다.
* 네트워크 패킷에 대한 액세스 권한을 부여한 후 공급업체가 TC_ACT_OK 또는 TC_ACT_UNSPEC를 반환하는지 확인하세요. TC_ACT_UNSPEC를 반환하는 경우 이 단락을 무시할 수 있습니다.
* 공급업체가 eBPF 분류자를 어떤 우선순위에 연결하는지 확인하세요.
  * 우선순위 1을 사용하는 경우 CSM Threats 네트워크 탐지는 컨테이너 내부에서 작동하지 않습니다.
  * 우선순위 2~10을 사용하는 경우 `runtime_security_config.network.classifier_priority`를 공급업체가 선택한 우선순위보다 엄격하게 낮은 숫자로 구성해야 합니다.
  * 우선순위 11 이상을 사용하는 경우 이 단락을 무시할 수 있습니다.

예를 들어, 새 파드가 시작될 때 발생할 수 있는 Datadog Agent(버전 7.36 ~ 7.39.1, 7.39.2는 제외)와 Cilium 1.9 이하의 알려진 경쟁이 있습니다. 경쟁으로 인해 Cilium이 구성된 방식에 따라 파드 내부의 연결이 끊어질 수 있습니다.

궁극적으로 문제 발생을 방지하도록 Datadog Agent 또는 타사 공급업체를 구성할 수 없는 경우 아래 단계에 따라 네트워크 기반 CSM Threats 탐지를 비활성화해야 합니다.

* 호스트 기반 설치의 `system-probe.yaml` 구성 파일에 다음 파라미터를 추가합니다.
```yaml
runtime_security_config:
  network:
    enabled: false
```
* 공개 Helm 차트를 사용하여 Datadog Agent를 배포하는 경우 다음 값을 추가합니다.
```yaml
datadog:
  securityAgent:
    runtime:
      network:
        enabled: false
```
* Datadog Agent 컨테이너를 수동으로 배포하는 경우 다음 환경 변수를 추가합니다.
```bash
DD_RUNTIME_SECURITY_CONFIG_NETWORK_ENABLED=false
```
## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/agent/troubleshooting/send_a_flare/?tab=agentv6v7