---
algolia:
  tags:
  - uninstall
  - uninstalling
aliases:
- /ko/guides/basic_agent_usage/amazonlinux/
- /ko/guides/basic_agent_usage/centos/
- /ko/guides/basic_agent_usage/deb/
- /ko/agent/basic_agent_usage/install_debian_5/
- /ko/guides/basic_agent_usage/fedora/
- /ko/guides/basic_agent_usage/redhat/
- /ko/guides/basic_agent_usage/suse/
- /ko/guides/basic_agent_usage/ubuntu/
- /ko/agent/basic_agent_usage/alma/
- /ko/agent/basic_agent_usage/amazonlinux/
- /ko/agent/basic_agent_usage/centos/
- /ko/agent/basic_agent_usage/deb/
- /ko/agent/basic_agent_usage/fedora/
- /ko/agent/basic_agent_usage/oracle/
- /ko/agent/basic_agent_usage/redhat/
- /ko/agent/basic_agent_usage/ubuntu/
- /ko/agent/basic_agent_usage/suse/
- /ko/agent/basic_agent_usage/rocky/
- /ko/agent/basic_agent_usage/linux/
further_reading:
- link: /logs/
  tag: Documentation
  text: 로그 수집
- link: /infrastructure/process/
  tag: Documentation
  text: 프로세스 수집
- link: /tracing/
  tag: Documentation
  text: 트레이스 수집
- link: /agent/architecture/#agent-architecture
  tag: Documentation
  text: Agent 아키텍처 자세히 알아보기
- link: /agent/configuration/network#configure-ports
  tag: Documentation
  text: 인바운드 포트 구성
platform: Linux
title: Linux
---
## 개요

이 페이지에서는 Linux 환경용 Datadog Agent의 기본적인 기능을 간략하게 설명합니다. 지원되는 Linux 배포판 및 버전의 전체 목록은 [지원 플랫폼][5] 문서를 참조하세요.

## Agent 설치
Linux에 Agent를 설치하려면 [Fleet Automation의 인앱 지침][6]을 따르고, 생성된 스크립트를 호스트에서 실행하세요.

{{< img src="/agent/basic_agent_usage/linux_img_july_25.png" alt="Linux 호스트에서 실행하는 Datadog Agent에 대한 인앱 설치 단계입니다." style="width:90%;">}}


## Agent 구성
Datadog Agent 구성 파일은 `/etc/datadogagent/datadog.yaml`에 있습니다. 이 YAML 파일에는 다음과 같은 데이터를 Datadog에 전송하는 데 사용되는 호스트 전체 연결의 세부 정보가 포함되어 있습니다.
 `api_key`: 조직의 [Datadog API 키][7]
 `site`: 대상 Datadog 지역(예: `datadoghq.com`, `datadoghq.eu`, `ddoggov.com`)
 `proxy`: 아웃바운드 트래픽에 대한 HTTP/HTTPS 프록시 엔드포인트([Datadog Agent 프록시 구성][8] 참조)
 기본 태그, 로그 레벨 및 Datadog 구성

`/etc/datadogagent/datadog.yaml.example`에 있는 완전 주석형 참조 파일에는 사용 가능한 모든 옵션이 나열되어 있어 비교하거나 복사하여 붙여넣을 수 있습니다. 또는 사용 가능한 모든 구성 옵션은 샘플 `config_template.yaml` 파일을 참조하세요.

### 통합 파일
통합을 위한 구성 파일은 `/etc/datadogagent/conf.d/`에 있습니다. 각 통합에는 `<INTEGRATION>.d/`라는 자체 하위 디렉터리가 있으며, 여기에는 다음이 포함됩니다.
 `conf.yaml`: 통합이 메트릭과 로그를 수집하는 방식을 제어하는 활성 구성
 `conf.yaml.example`: 지원되는 키와 기본값을 설명하는 샘플


## 명령어

| 설명   | 명령어               |
|||
| 서비스형 Agent 시작           | `sudo systemctl start datadogagent`                   |
| 서비스형 Agent 중지    | `sudo systemctl stop datadogagent`                    |
| 서비스형 Agent 재시작 | `sudo systemctl restart datadogagent`                 |
| Agent 서비스의 상태            | `sudo systemctl status datadogagent`                  |
| 실행 중인 Agent의 상태 페이지       | `sudo datadogagent status`                            |
| 플레어 전송                         | `sudo datadogagent flare`                             |
| 명령어 사용법 표시              | `sudo datadogagent help`                            |
| 검사 실행                        | `sudo datadogagent check <CHECK_NAME>` |

**참고**: `CentOS/RHEL 6` 또는 `SUSE 11`과 같은 upstart 기반 시스템의 경우, `systemctl <action>`을 `<action>`으로 교체하세요. 예를 들어, `SUSE 11` 시스템에서 서비스형 Agent를 시작할 때는 `sudo start datadogagent`를 사용하세요.


## Agent 제거

Agent를 제거하려면 적절한 Linux 환경에 따라 다음의 명령어를 실행하세요.


### CentOS, Rocky, AlmaLinux, Amazon Linux, Oracle Linux 및 Red Hat의 경우

```shell
sudo yum remove datadog-agent
```

### Debian, Ubuntu의 경우

```shell
sudo apt-get remove datadog-agent -y
```

### SUSE의 경우

```shell
sudo zypper remove datadog-agent
```

<div class="alert alert-info">

**위의 명령어는 Agent를 제거하지만 다음 항목은 제거하지 않습니다**.
* `datadog.yaml` 구성 파일
* `/etc/datadog-agent` 구성 폴더에 있는 사용자 생성 파일
* `/opt/datadog-agent` 폴더에 있는 사용자 생성 파일
* `dd-agent` 사용자
* Datadog 로그 파일

**이들 요소를 제거하려면 Agent를 제거한 후 이 명령을 실행하세요.**

```shell
sudo userdel dd-agent \
&& sudo rm -rf /opt/datadog-agent/ \
&& sudo rm -rf /etc/datadog-agent/ \
&& sudo rm -rf /var/log/datadog/
```

`Debian` 및 `Ubuntu`의 경우 남은 Agent 아티팩트를 제거하려면 다음을 실행하세요.

```shell
sudo apt-get remove --purge datadog-agent -y
```

</div>


### Single Step APM Instrumentation 제거
Single Step APM Instrumentation으로 Agent를 설치한 경우, Agent를 제거하려면 [추가 명령을 실행][9]하여 APM Instrumentation을 제거해야 합니다. [특정 환경][10]에 대한 단계를 따르세요.


## 문제 해결

자세한 단계는 [Agent 문제 해결][2]을 참조하세요.

## 임베디드 Agent 사용하기

Agent는 `/opt/datadog-agent/embedded/`에 임베디드 Python 환경을 포함합니다. `python` 및 `pip`처럼 일반적으로 사용하는 바이너리는 `/opt/datadog-agent/embedded/bin/`에 있습니다.

자세한 정보가 필요하신 분은 [임베디드 Agent에 패키지를 추가][3]하는 방법 안내서를 참조하시기 바랍니다.


## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=aws
[2]: /ko/agent/troubleshooting/
[3]: /ko/extend/guide/custompythonpackage/
[4]: /ko/integrations/
[5]: /ko/agent/supported_platforms/?tab=linux
[6]: https://app.datadoghq.com/fleet/installagent/latest?platform=linux
[7]: https://app.datadoghq.com/organizationsettings/apikeys
[8]: https://docs.datadoghq.com/ko/agent/configuration/proxy/
[9]: /ko/tracing/trace_collection/automatic_instrumentation/singlestepapm/
[10]: /ko/tracing/trace_collection/automatic_instrumentation/singlestepapm/linux