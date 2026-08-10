---
disable_toc: false
further_reading:
- link: /agent/troubleshooting/send_a_flare/
  tag: 에이전트 트러블슈팅
  text: 에이전트 플레어 보내기
- link: /agent/troubleshooting/agent_check_status/
  tag: 에이전트 트러블슈팅
  text: 에이전트 점검의 상태 파악하기
title: CPU 또는 메모리 사용량이 높을 경우
---

몇 가지 요인으로 인해 에이전트 CPU 또는 메모리가 많이 소모될 수 있습니다. 아래 단계를 시도했음에도 계속 문제가 발생하면 [Datadog 지원팀에 문의해 도움을 받으세요](#reach-out-to-datadog-support).

### CPU 또는 메모리 사용량이 많은 일반적인 원인

- 통합에서 수천 개의 메트릭을 반환하거나 많은 수의 점검 인스턴스를 실행하고 있습니다. [`status`CLI 명령][2]을 실행하고 **Collector** 섹션을 선택하면 실행 중인 점검 인스턴스의 요약과 수집된 메트릭 수를 볼 수 있습니다.
- 에이전트의 Python 또는 Go 런타임으로 인해 리소스가 많이 소모됩니다. [실시간 프로세스모니터링][3]을 사용하여 에이전트 프로세스가 메모리나 CPU 양을 예상치 못하게 많이 사용하는지 확인하세요. 또 운영 체제의 작업 관리자를 사용해 에이전트 프로세스 리소스 소모를 확인할 수도 있습니다.
- 에이전트가 많은 수의 프로세스를 모니터링하고 있습니다. 이는 [프로세스 점검 설정 파일][4]에 설정되어 있습니다.
- 에이전트 작업이 Windows 안티 멀웨어 또는 안티바이러스 도구를 트리거하여 CPU 사용량을 높입니다.
- 에이전트가 로그 라인 또는 DogStatsD 메트릭을 많은 양 전달하고 있습니다.

### 리소스 사용을 줄일 수 있는 조정 방법

다음은 리소스 사용을 줄일 수 있는 에이전트 설정 조정 방법입니다.

- 점검 인스턴스가 많거나 메트릭을 많이 수집하는 통합의 경우 통합의 `conf.yaml` 파일에서 `min_collection_interval`을 조정합니다. 일반적으로 에이전트는 각 점검 인스턴스를 10초에서 15초 간격으로 실행합니다. `min_collection_interval`을 60초 이상으로 설정하면 리소스 사용을 줄일 수 있습니다. 점검 수집 간격에 관한 자세한 내용은 [커스텀 에이전트 점검 설명서][5]를 참고하세요.
- 통합이 자동탐지를 사용하도록 설정되어 있는지, 또는 통합이 보다 구체적으로 범위를 지정할 수 있는 와일드카드(`*`)를 사용하고 있는지 점검합니다. 자동탐지에 관한 자세한 내용은 [기본 에이전트 자동탐지][6]를 참고하세요.

## Datadog 지원팀 문의

위의 솔루션 중 어느 것도 사용자의 상황에 적합하지 않으면 [Datadog 지원팀][1]에 문의하세요. [실시간 프로세스 모니터링][3]을 활성화해 에이전트 프로세스가 메모리 또는 CPU를 예상치 못하게 많은 양으로 사용하고 있는지 확인하세요.

티켓을 열 때 문제를 확인하는 방법과 지금까지 어떤 조치를 취했는지에 관한 정보를 포함합니다. 문제를 단일 통합으로 분리할 수 있는지 여부에 따라 다음 섹션 중 하나의 정보를 포함하세요.

### 소비량이 통합 하나에서만 높은 경우

통합 하나에서만 메모리 사용량이 높은 경우 Python 메모리 프로필을 출력해 디버그 레벨 플레어와 함께 보내주세요.
1. 디버그 모드를 활성화하려면 [디버그 모드 설명서를 따르세요][7].
1. 프로필을 전송하려면 플레어 명령에 `--profile 30` 플래그를 추가합니다.
   {{< code-block lang="shell">}}sudo datadog-agent flare --profile 30{{< /code-block >}}
   이 명령은 프로필 정보를 수집하는 동안 실행하는 데 약 30초가 걸립니다.

1. Python 메모리 프로필의 경우 다음 명령 출력을 캡처하세요.
   {{< code-block lang="shell">}}sudo -u dd-agent -- datadog-agent check <check name> -m -t 10{{< /code-block >}}

### 단일 통합과 관련 없이 소비량이 높은 경우

메모리 사용량이 단일 통합과 관련이 없는 경우, 에이전트의 메모리 또는 CPU 사용량이 높은 기간 동안 수집된 프로필과 디버그 수준 플레어를 보내주세요.
1. 디버그 모드를 활성화하려면 [디버그 모드 설명서를 따르세요][7].
1. 프로필을 전송하려면 플레어 명령에 `--profile 30` 플래그를 추가합니다.
   {{< code-block lang="shell">}}sudo datadog-agent flare --profile 30{{< /code-block >}}
   이 명령은 프로파일 정보를 수집하는 동안 실행하는 데 약 30초가 걸립니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/help/
[2]: /ko/agent/basic_agent_usage/#cli
[3]: /ko/infrastructure/process/
[4]: /ko/integrations/process/#configuration
[5]: /ko/developers/write_agent_check/#collection-interval
[6]: /ko/getting_started/containers/#enable-autodiscovery
[7]: /ko/agent/troubleshooting/debug_mode/