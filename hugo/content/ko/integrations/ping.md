---
app_id: ping
app_uuid: 841c9313-628f-4861-ad0b-2d12c37ee571
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: network.ping.response_time
      metadata_path: metadata.csv
      prefix: network.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10200
    source_type_name: Ping
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: 커뮤니티
  sales_email: jim.stanton@datadoghq.com
  support_email: jim.stanton@datadoghq.com
categories:
- 개발 툴
- 네트워크
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/ping/README.md
display_on_public_website: true
draft: false
git_integration_title: ping
integration_id: ping
integration_title: Ping
integration_version: 1.0.2
is_public: true
manifest_version: 2.0.0
name: ping
public_title: Ping
short_description: 원격 호스트 연결을 모니터링합니다.
supported_os:
- 리눅스
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Developer Tools
  - Category::Network
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - 제공::통합
  configuration: README.md#Setup
  description: 원격 호스트 연결을 모니터링합니다.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Ping
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

이 점검은 시스템 [Ping][1] 명령을 사용하여 호스트의 도달 가능성을 테스트합니다.
또한 점검에서 목적지 호스트로 보낸 메시지의 왕복 시간도 선택적으로 측정합니다.

Ping은 대상 호스트로 인터넷 제어 메시지 프로토콜(ICMP) 에코 요청 패킷을 전송하고 ICMP 에코 응답을 기다리는 방식으로 작동합니다.

이 점검 는 ICMP 패킷을 생성하려면 원시 소켓이 필요하므로 ICMP 에코 요청 자체를 생성하는 대신 시스템 ping 명령을 사용합니다. 원시 소켓을 생성하려면 루트 권한이 필요하지만 에이전트에는 루트 권한이 없습니다. ping 명령은 `setuid` 액세스 플래그를 사용하여 상승된 권한으로 실행하므로 이 문제를 피할 수 있습니다.

** 윈도우즈(Windows) 사용자를 위한 참고 사항**: 설치된 윈도우즈(Windows) 의 언어가 영어로 설정되어 있지 않으면 이 점검이 제대로 작동하지 않을 수 있습니다.

## 설정

[Datadog 에이전트][2] 패키지에는 Ping 점검이 포함되어 있지 않으므로 설치해야 합니다.

### 설치

에이전트 v7.21+ / v6.21+의 경우, 아래 지침에 따라 호스트에 Ping 점검을 설치하세요. 도커(Docker) 에이전트 또는 이전 버전의 에이전트 에 설치하려면 [커뮤니티 통합][3]을 참조하세요.

1. 다음 명령 중 하나를 실행하여 에이전트 통합을 설치합니다:

   ```shell
   # Linux
   sudo -u dd-agent -- datadog-agent integration install -t datadog-ping==<INTEGRATION_VERSION>

   # Windows
   agent.exe integration install -t datadog-ping==<INTEGRATION_VERSION>
   ```
2. 사용 중인 OS에 따라 `ping` 바이너리를 설치합니다. 예를 들어 우분투(Ubuntu) 에 대해 다음 명령을 실행합니다.
   ```shell
   apt-get install iputils-ping
   ```

3. 통합을 코어 [통합][4]과 유사하게 설정하세요.

### 구성

1. 에이전트의 설정 디렉토리 루트에 있는 `conf.d/` 폴더에 있는 `ping.d/conf.yaml` 파일을 편집하여 Ping 성능 데이터 수집을 시작합니다. 사용 가능한 모든 설정 옵션은 [샘플 ping.d/conf.yaml][5]을 참조하세요.

2. [Agent를 재시작합니다][6].

### 검증

[에이전트 상태 하위 명령][7]을 실행하고 점검 섹션에서 `ping`을 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "ping" >}}


### 이벤트

Ping 점검은 이벤트를 포함하지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "ping" >}}


## 트러블슈팅

### `SubprocessOutputEmptyError: get_subprocess_output expected output but had none` 오류
Ping 통합 을 실행하는 동안 다음과 같은 오류가 표시될 수 있습니다.

```
      Traceback (most recent call last):
        File "/opt/datadog-agent/embedded/lib/python3.8/site-packages/datadog_checks/base/checks/base.py", line 1006, in run
          self.check(instance)
        File "/opt/datadog-agent/embedded/lib/python3.8/site-packages/datadog_checks/ping/ping.py", line 65, in check
          lines = self._exec_ping(timeout, host)
        File "/opt/datadog-agent/embedded/lib/python3.8/site-packages/datadog_checks/ping/ping.py", line 48, in _exec_ping
          lines, err, retcode = get_subprocess_output(
        File "/opt/datadog-agent/embedded/lib/python3.8/site-packages/datadog_checks/base/utils/subprocess_output.py", line 56, in get_subprocess_output
          out, err, returncode = subprocess_output(cmd_args, raise_on_empty_output, env=env)
      _util.SubprocessOutputEmptyError: get_subprocess_output expected output but had none.
```

Ping 통합은 에이전트에 기본적으로 포함되어 있지 않기 때문에 `ping` 바이너리도 에이전트에 포함되어 있지 않습니다. 통합을 성공적으로 실행하려면 `ping` 바이너리를 직접 설치해야 합니다. 


도움이 필요하신가요? [Datadog 고객 지원팀][10]에 문의해주세요.


[1]: https://en.wikipedia.org/wiki/Ping_%28networking_utility%29
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ko/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/ko/getting_started/integrations/
[5]: https://github.com/DataDog/integrations-extras/blob/master/ping/datadog_checks/ping/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#service-status
[8]: https://github.com/DataDog/integrations-extras/blob/master/ping/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/ping/assets/service_checks.json
[10]: https://docs.datadoghq.com/ko/help/