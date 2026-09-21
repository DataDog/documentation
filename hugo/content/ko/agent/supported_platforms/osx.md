---
algolia:
  tags:
  - uninstall
  - uninstalling
aliases:
- /ko/guides/basic_agent_usage/osx/
- /ko/agent/basic_agent_usage/osx/
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
os: osx
platform: OS X
title: macOS
---
## 개요 {#overview}

이 페이지에서는 macOS용 Datadog Agent의 기본 기능에 대해 설명합니다. 지원되는 macOS 배포판 및 버전의 전체 목록은 [지원 플랫폼][5] 문서를 참조하세요.

## Agent 설치 {#install-the-agent}
macOS에 Agent를 설치하려면 [Fleet Automation의 인앱 지침][6]을 따르고, 생성된 스크립트를 호스트에서 실행하세요.

{{< img src="/agent/basic_agent_usage/macos_img_installation.png" alt="macOS 호스트에 Datadog Agent를 설치하는 인앱 단계입니다." style="width:90%;">}}

<div class="alert alert-info">
Agent는 다음 위치의 샌드박스에 설치됩니다. <code>/opt/datadog-agent</code>. 추가 모니터링을 수행하려면 Agent 사용자에게 <code>_dd-agent</code> 파일 또는 디렉터리에 대한 액세스 권한을 부여하세요.
</div>


## 명령어 {#commands}

`launchctl` 서비스 관리자가 Agent 수명 주기를 제어하며, 다른 명령어는 Agent 바이너리, 시스템 트레이 앱 또는 웹 GUI를 통해 실행할 수 있습니다.


| 설명          | 명령어          |
|----------------------|------------------|
| Agent를 서비스로 시작           | `sudo launchctl kickstart system/com.datadoghq.agent` |
| 서비스로 실행 중인 Agent 중지    | `sudo launchctl kill SIGTERM system/com.datadoghq.agent`  |
| 서비스로 실행 중인 Agent 다시 시작 | `sudo launchctl kickstart -k system/com.datadoghq.agent` |
| Agent 서비스의 상태            | `sudo launchctl print system/com.datadoghq.agent` |
| 실행 중인 Agent의 상태 페이지       | `sudo datadog-agent status` 또는 웹 GUI                    |
| Flare 전송                         | `sudo datadog-agent flare` 또는 웹 GUI                     |
| 명령어 사용법 표시              | `datadog-agent --help`                               |
| 검사 실행                        | `sudo datadog-agent check <CHECK_NAME>`                   |


## 구성 {#configuration}

[Datadog Agent 구성 파일][7]은 `/opt/datadog-agent`에 위치해 있습니다. 이 YAML 파일에는 Datadog에 데이터를 전송하는 데 사용되는 호스트 전체 연결 세부 정보가 포함되어 있습니다.

- `api_key`: 조직의 [Datadog API 키][8]
- `site`: 대상 Datadog 리전(예: `datadoghq.com`, `datadoghq.eu`, `ddog-gov.com`, `us2.ddog-gov.com`)
- `proxy`: 아웃바운드 트래픽에 대한 HTTP/HTTPS 프록시 엔드포인트([Datadog Agent 프록시 구성][9] 참조)
-  기본 태그, 로그 레벨 및 Datadog 구성.

완전 주석형 참조 파일은 `/opt/datadog-agent/etc/datadog.yaml.example`에 위치해 있으며, 비교하거나 복사하여 붙여넣을 수 있는 모든 사용 가능한 옵션을 나열합니다. 또는 GitHub에 있는 [macOS용 Agent 구성 파일 예시][10]를 참조하세요.

### 통합 파일 {#integration-files}
통합용 구성 파일은 `/opt/datadog-agent/etc/conf.d/`에서 찾을 수 있습니다. 각 통합에는 자체 하위 디렉터리인 `<INTEGRATION>.d/`가 있으며, 여기에는 다음이 포함됩니다.
- `conf.yaml`: 통합이 메트릭과 로그를 수집하는 방식을 제어하는 활성 구성
-  `conf.yaml.example`: 지원되는 키와 기본값을 보여주는 샘플



## Agent 제거 {#uninstall-the-agent}

Agent를 제거하려면 다음 스크립트를 실행하세요.

```shell
curl -L https://install.datadoghq.com/scripts/uninstall_mac_os.sh | bash
```

## 문제 해결 {#troubleshooting}

문제 해결 단계를 보려면 [Agent Troubleshooting 문서][2]를 참조하세요.

##  임베디드 Agent 사용하기 {#working-with-the-embedded-agent}

Agent는 `/opt/datadog-agent/embedded/`에 임베디드 Python 환경을 포함하고 있습니다. `/opt/datadog-agent/embedded/bin/` 내에 `python` 및 `pip`와 같은 일반 바이너리가 포함되어 있습니다.

자세한 정보가 필요하신 분은 [임베디드 Agent에 패키지를 추가][3]하는 방법 안내서를 참조하시기 바랍니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=macos
[2]: /ko/agent/troubleshooting/
[3]: /ko/extend/guide/custom-python-package/
[4]: /ko/integrations/
[5]: https://docs.datadoghq.com/ko/agent/supported_platforms/?tab=macos
[6]: https://app.datadoghq.com/fleet/install-agent/latest?platform=macos
[7]: /ko/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[8]: https://app.datadoghq.com/organization-settings/api-keys
[9]: /ko/agent/configuration/proxy/
[10]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/example/datadog-agent_darwin.yaml.example
[11]: https://install.datadoghq.com/scripts/uninstall_mac_os.sh