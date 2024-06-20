---
further_reading:
- link: /agent/basic_agent_usage/#agent-architecture
  tag: 설명서
  text: 에이전트의 아키텍처에 대해 자세히 알아보기
- link: /agent/configuration/network#configure-ports
  tag: 설명서
  text: 인바운드 포트 설정
- link: https://www.datadoghq.com/blog/announcing-ibm-aix-agent/
  tag: 블로그
  text: Datadog Unix 에이전트로 AIX 모니터링
title: AIX 에이전트 기본 사용법
---

<div class="alert alert-info">
Datadog UNIX Agent는 특정 시스템 아키텍처용으로 개발되고 있으며 Windows, Linux 및 MacOS Agents와 동일하지 않습니다.
</div>

이 페이지에서는 AIX Datadog Unix 에이전트 설치와 설정에 관해 간략히 설명합니다.

**참고:** Datadog Unix 에이전트는 PowerPC 8 이상 및 다음 버전의 AIX를 지원합니다.

* AIX 6.1 TL9 SP6+
* AIX 7.1 TL5 SP3+
* AIX 7.2 TL3 SP0+

## 설치

Datadog 내 [에이전트 다운로드 페이지][1]에서 원스텝 ksh 설치 스크립트를 확인할 수 있습니다. 이 스크립트는 다음 환경 변수를 지원합니다.

* **채널**: 기본값은 stable입니다. 패키지 리포지토리 채널을 지정합니다.
  * 값: `stable`,`beta`,`unstable`
* **버전**: 기본값은 latest입니다. 패키지 버전을 지정합니다.
* **프록시**: 기본값은 none입니다. 프록시 URI를 지정합니다.
  * 예시: `http://proxy.foo.com`
* **PROXY_USER**: 기본값은 비워진 상태입니다. 프록시 서버 사용자 이름을 지정합니다.
* **PROXY_PASSWORD**: 기본값은 비워진 상태입니다. 프록시 서버 비밀번호를 지정합니다. 프로세스/컨테이너 에이전트의 경우 인증 암호를 전달하는 데 이 변수가 필요하며 이름을 바꿀 수 없습니다.
* **이 변수는 **: 기본값은 `false`입니다. TLS 유효성 검사를 건너뛸 수 있습니다.

또는 [이 페이지][2]에서 최신 릴리스의 다운로드 링크를 확인할 수 있습니다.

설치 관리자를 실행하려면 다음을 따르세요(루트로서).

{{< code-block lang="shell" wrap="true" >}}
installp -aXYgd ./datadog-unix-agent-<VERSION>.bff -e dd-aix-install.log datadog-unix-agent
{{< /code-block >}}

`/opt/datadog-agent`에 에이전트를 설치합니다.

### 설치 로그 파일

`dd-aix-install.log` 파일에서 에이전트 설치 로그를 찾을 수 있습니다. 이 로그를 비활성화하려면 설치 명령에서 `-e dd-aix-install.log` 파라미터를 제거합니다.

## 명령어

| 설명                     | 명령(루트로서)           |
|---------------------------------|-----------------------------|
| 에이전트를 서비스로 시작        | `startsrc -s datadog-agent` |
| 서비스로 실행 중인 에이전트 중지 | `stopsrc -s datadog-agent`  |
| 에이전트 서비스 상태         | `lssrc -s datadog-agent`    |
| 실행 중인 에이전트 상태 페이지    | `datadog-agent status`      |
| 플레어 전송                      | `datadog-agent flare`       |
| 명령어 사용법 표시           | `datadog-agent --help`      |

## 설정

에이전트의 설정 파일 및 폴더는 `/etc/datadog-agent/datadog.yaml`에 있습니다.

샘플 설정 파일은 `/etc/datadog-agent/datadog.yaml.example`에 있습니다.

일반적으로 기본 설정에는 Datadog API 키가 필요합니다. 다른 사이트(예: EU 인스턴스)에 메트릭을 제출하려면 `site`설정 옵션을 사용할 수 있습니다.

네트워크 설정에 따라 프록시 설정을 지정해야 하는 경우도 있습니다.

**통합용 설정 파일:**
`/etc/datadog-agent/conf.d/`

## 통합

Unix 에이전트에서는 다음 시스템 메트릭을 수집합니다.

* cpu
* filesystem
* iostat
* load
* memory
* uptime
* disk
* network

또한 다음 통합을 활성화해 추가 메트릭을 수집할 수 있습니다.

* process
* lparstats
* [ibm_was (Websphere Application Server)][3]

제공된 샘플 설정 파일을 복사하고 편집하여 위 통합을 활성화합니다. `/etc/datadog-agent/conf.d`에서 확인할 수 있습니다. YAML 설정 파일 이름은 통합의 이름과 일치해야 합니다. `/etc/datadog-agent/conf.d/<INTEGRATION_NAME>.d/conf.yaml`은 `<INTEGRATION_NAME>` 통합을 활성화하고 해당 구성을 설정합니다. 예시 설정 파일은 `/etc/datadog-agent/conf.d/<INTEGRATION_NAME>.d/conf.yaml.example`에서 확인할 수 있습니다.

**참고**: 사용 가능한 메트릭 중 일부는 Unix 에이전트의 통합과 Linux, Windows, MacOS의 통합 간에 다릅니다. Unix 에이전트를 사용하여 프로세스 및 네트워크 메트릭을 모니터링할 수 있지만 라이브 프로세스 모니터링 및 네트워크 성능 모니터링 기능은 사용할 수 없습니다. 또 Unix 에이전트에서는 로그 관리를 사용할 수 없습니다.

<div class="alert alert-info">Unix 에이전트에는 트레이스 에이전트 구성 요소가 없으므로 애플리케이션 성능 모니터링(APM) 트레이스 및 프로파일링이 지원되지 않습니다.</div>

## DogStatsD 실행

DogStatsD는 커스텀 메트릭을 수집하여 Datadog에 제출할 수 있도록 합니다. DogStatsD는 UDP 포트를 통해 수신하고 DogStatsD 메트릭을 여기에 제출할 수 있습니다. 그런 다음 Datadog에 전달됩니다.

DogStatsD는 에이전트에 정의된 동일한 설정  파일을 사용하며, 여기서 DogStatsD 설정 섹션을 사용할 수 있습니다. DogStatsD 서버는 일반적으로 동일한 에이전트 프로세스 내에서 실행되지만 전용 프로세스가 필요한 경우 독립 실행형 모드에서 실행될 수도 있습니다.

DogStatsD를 활성화하려면 `/etc/datadog-agent/datadog.yaml`을 편집하고  관련 설정 옵션을 설정합니다.

{{< code-block lang="yaml" filename="/etc/datadog-agent/datadog.yaml" >}}
dogstatsd:                        # DogStatsD 구성 옵션
  enabled: true                   # 기본값은 비활성화된 상태
  bind_host: localhost            # 바인딩할 주소
  port: 8125                      # DogStatsD UDP 리스닝 포트
  non_local_traffic: false        # 비로컬 트래픽 리스닝 함
{{< /code-block >}}

**참고:** DogStatsD는 데몬화하지 않고 전경으로 실행됩니다.

Python 감독자로 에이전트를 실행할 수 있는 기능도 있습니다. 이 도구를 잘 알고 있다면 에이전트 데몬을 관리하는 데 편리할 수 있습니다. 에이전트와 DogStatsD 모두에 항목이 있습니다.

## 에이전트 설치 제거

설치된 에이전트를 제거하려면 다음 `installp`명령을 실행합니다.

{{< code-block lang="shell" >}}
installp -e dd-aix-uninstall.log -uv datadog-unix-agent
{{< /code-block >}}

참고: 에이전트 제거 로그는 `dd-aix-install.log` 파일에서 찾을 수 있습니다. 이 로그를 비활성화하려면 제거 명령에서 `-e` 파라미터를 제거합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=aix
[2]: https://github.com/DataDog/datadog-unix-agent/releases
[3]: https://github.com/DataDog/datadog-unix-agent/blob/master/checks/bundled/ibm_was/README.md