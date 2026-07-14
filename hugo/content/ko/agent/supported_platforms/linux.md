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
  tag: 설명서
  text: 로그 수집
- link: /infrastructure/process/
  tag: 설명서
  text: 프로세스 수집
- link: /tracing/
  tag: 설명서
  text: 트레이스 수집
- link: /agent/architecture/#agent-architecture
  tag: 설명서
  text: Agent 아키텍처 자세히 알아보기
- link: /agent/configuration/network#configure-ports
  tag: 설명서
  text: 인바운드 포트 구성
platform: Linux
title: Linux
---
## 개요 {#overview}

이 페이지에서는 Linux 환경용 Datadog Agent의 기본적인 기능을 간략하게 설명합니다. 지원되는 Linux 배포판 및 버전의 전체 목록은 [지원 플랫폼][5] 문서를 참조하세요.

## Agent 설치 {#install-the-agent}
Linux에 Agent 를 설치하려면 [Fleet Automation의 인앱 지침][6]을 따르고, 생성된 스크립트를 호스트에서 실행하세요.

{{< img src="/agent/basic_agent_usage/linux_img_july_25.png" alt="Linux 호스트에서 Datadog Agent에 대한 인앱 설치 단계입니다." style="width:90%;">}}


## Agent 구성 {#configure-the-agent}
Datadog Agent 구성 파일은 `/etc/datadog-agent/datadog.yaml`에 위치해 있습니다. 이 YAML 파일에는 Datadog에 데이터를 전송하는 데 사용되는 호스트 전체 연결 세부 정보가 포함되어 있습니다.
- `api_key`: 조직의 [Datadog API 키][7]
- `site`: 대상 Datadog 리전(예: `datadoghq.com`, `datadoghq.eu`, `ddog-gov.com`, `us2.ddog-gov.com`)
- `proxy`: 아웃바운드 트래픽에 대한 HTTP/HTTPS 프록시 엔드포인트([Datadog Agent 프록시 구성][8] 참조)
-  기본 태그, 로그 레벨 및 Datadog 구성

완전 주석형 참조 파일은 `/etc/datadog-agent/datadog.yaml.example`에 위치해 있으며, 비교하거나 복사하여 붙여넣을 수 있는 모든 사용 가능한 옵션을 나열합니다. 또는 사용 가능한 모든 구성 옵션은 샘플 `config_template.yaml` 파일을 참조하세요.

### 통합 파일 {#integration-files}
통합용 구성 파일은 `/etc/datadog-agent/conf.d/`에 있습니다. 각 통합에는 `<INTEGRATION>.d/`라는 자체 하위 디렉터리가 있으며, 여기에는 다음이 포함됩니다.
- `conf.yaml`: 통합이 메트릭과 로그를 수집하는 방식을 제어하는 활성 구성
- `conf.yaml.example`: 지원되는 키와 기본값을 설명하는 샘플


## 명령어 {#commands}

| 설명   | 명령어               |
|---------------|-----------------------|
| 서비스로 Agent 시작           | `sudo systemctl start datadog-agent`                   |
| 서비스로 실행 중인 Agent 중지    | `sudo systemctl stop datadog-agent`                    |
| 서비스로 실행 중인 Agent 재시작 | `sudo systemctl restart datadog-agent`                 |
| Agent 서비스 상태            | `sudo systemctl status datadog-agent`                  |
| 실행 중인 Agent의 상태 페이지       | `sudo datadog-agent status`                            |
| flare 전송                         | `sudo datadog-agent flare`                             |
| 명령어 사용법 표시              | `sudo datadog-agent --help`                            |
| 검사 실행                        | `sudo -u dd-agent -- datadog-agent check <CHECK_NAME>` |

**참고**: upstart 기반 시스템의 경우, `CentOS/RHEL 6` 또는 `SUSE 11`에서 `systemctl <action>`를 `<action>`으로 교체하십시오. 예를 들어, `SUSE 11` 시스템에서 서비스로 Agent를 시작할 때는 `sudo start datadog-agent`을 사용하십시오.


## Agent 제거 {#uninstall-the-agent}

Agent를 제거하려면 적절한 Linux 환경에 따라 다음의 명령어를 실행하세요.


### CentOS, Rocky, AlmaLinux, Amazon Linux, Oracle Linux 및 Red Hat의 경우 {#for-centos-rocky-almalinux-amazon-linux-oracle-linux-and-red-hat}

```shell
sudo yum remove datadog-agent
```

### Debian, Ubuntu의 경우 {#for-debian-ubuntu}

```shell
sudo apt-get remove datadog-agent -y
```

### SUSE의 경우 {#for-suse}

```shell
sudo zypper remove datadog-agent
```

<div class="alert alert-info">

**위의 명령어는 Agent를 제거하지만 다음 항목은 제거하지 않습니다**:
* `datadog.yaml` 구성 파일
* `/etc/datadog-agent` 구성 폴더 내 사용자 생성 파일
* `/opt/datadog-agent` 폴더 내 사용자 생성 파일
* `dd-agent` 사용자
* Datadog 로그 파일

**이러한 요소를 제거하려면 Agent를 제거한 후 이 명령을 실행하세요.**

```shell
sudo userdel dd-agent \
&& sudo rm -rf /opt/datadog-agent/ \
&& sudo rm -rf /etc/datadog-agent/ \
&& sudo rm -rf /var/log/datadog/
```

`Debian` 및 `Ubuntu`에 대해 남은 Agent 아티팩트를 제거하려면 다음을 실행하세요.

```shell
sudo apt-get remove --purge datadog-agent -y
```

</div>


### Single Step APM Instrumentation 제거 {#uninstall-single-step-apm-instrumentation}
Single Step APM Instrumentation으로 Agent를 설치한 경우, Agent를 제거하려면 [추가 명령을 실행][9]하여 APM Instrumentation을 제거해야 합니다. [특정 환경][10]에 대한 단계를 따르세요.


## 문제 해결 {#troubleshooting}

자세한 단계는 [Agent 문제 해결][2]을 참조하세요.

##  임베디드 Agent 사용하기 {#working-with-the-embedded-agent}

Agent는 `/opt/datadog-agent/embedded/`에 임베디드 Python 환경을 포함하고 있습니다. `/opt/datadog-agent/embedded/bin/` 내에 `python` 및 `pip`와 같은 일반 바이너리가 포함되어 있습니다.

자세한 정보가 필요하신 분은 [임베디드 Agent에 패키지를 추가][3]하는 방법 안내서를 참조하시기 바랍니다.


## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=aws
[2]: /ko/agent/troubleshooting/
[3]: /ko/extend/guide/custom-python-package/
[4]: /ko/integrations/
[5]: /ko/agent/supported_platforms/?tab=linux
[6]: https://app.datadoghq.com/fleet/install-agent/latest?platform=linux
[7]: https://app.datadoghq.com/organization-settings/api-keys
[8]: https://docs.datadoghq.com/ko/agent/configuration/proxy/
[9]: /ko/tracing/trace_collection/automatic_instrumentation/single-step-apm/
[10]: /ko/tracing/trace_collection/automatic_instrumentation/single-step-apm/linux