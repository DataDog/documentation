---
algolia:
  tags:
  - airgap
  - airgapped
  - air gap
  - air gapped
  - air-gap
  - air-gapped
aliases:
- /ko/agent/faq/how-do-i-install-the-agent-on-a-server-with-limited-internet-connectivity/
description: 프록시 구성 및 오프라인 패키지를 포함한 대체 방법을 사용하여 인터넷 액세스가 제한된 서버에 Datadog Agent를 설치합니다.
further_reading:
- link: /agent/
  tag: 문서
  text: Datadog Agent에 대해 자세히 알아보기
- link: /agent/configuration/proxy/
  tag: 문서
  text: 프록시에 대해 자세히 알아보기
title: 인터넷 연결이 제한된 서버에 Agent 설치
---
[Agent 설치 지침][1]에서 제공하는 한 줄 설치 명령이 제대로 작동하려면 몇 가지 다른 엔드포인트에 대한 아웃바운드 HTTPS 액세스가 필요하며, 인터넷 액세스가 제한된 서버에서는 작동하지 않을 수 있습니다. 이러한 엔드포인트는 구체적으로 다음과 같습니다.

* Debian/Ubuntu 시스템 설치의 경우:
  * https://keys.datadoghq.com - Datadog 공개 서명 키 저장소
  * https://apt.datadoghq.com - Datadog APT 패키지 저장소
* RedHat 및 SUSE 기반 시스템 설치의 경우:
  * https://keys.datadoghq.com - Datadog 공개 서명 키 저장소
  * https://yum.datadoghq.com - Datadog RPM 패키지 리포지토리.
* AIX 시스템 설치의 경우:
  * https://dd-agent-aix.s3.amazonaws.com - Datadog AIX 패키지 리포지토리.

인터넷에 직접 액세스할 수 없는 서버의 경우 프록시를 통해 라우팅하도록 Agent를 구성할 수 있습니다. [Agent 프록시 구성][2]을 참조하세요. 아웃바운드 인터넷 연결이 제한된 서버의 경우 서버 OS에 맞는 관련 패키지를 사용하여 Agent를 설치할 수 있습니다. [Agent 설치 지침][1]에는 한 줄 설치 명령 아래에 단계별 지침이 포함되어 있습니다.

대상 시스템이 패키지 리포지토리에 직접 액세스할 수 없는 경우 다른 서버를 사용하여 리포지토리에서 패키지를 다운로드한 다음 대상 시스템으로 전송하여 로컬 설치를 수행하세요.

Agent 6용 RPM 패키지는 [https://yum.datadoghq.com/stable/6/][3]에서, Agent 7용은 [https://yum.datadoghq.com/stable/7/][4]에서 얻을 수 있으며, DEB 패키지는 [https://apt.datadoghq.com/pool/d/da/][5]에서 얻을 수 있습니다.

**참고**: 이 패키지에는 통합의 활성화 여부와 관계없이 Agent와 검사를 실행하는 데 필요한 모든 리소스가 포함되어 있습니다. 필수 요구 사항으로 Python 2.7+ 및 sysstat가 필요하며 활성화된 검사에 따라 다른 종속성이 필수적으로 요구됩니다.

AIX 시스템의 경우 Agent 7은 BFF 패키지로 배포되며 [https://dd-agent-aix.s3.amazonaws.com/stable/][8]에서 얻을 수 있습니다(예: `datadog-agent-7-latest.aix.ppc64.bff`). BFF 패키지는 내장 Python 런타임, OpenSSL 및 기타 종속성을 포함하므로 대상 호스트에 시스템 Python이나 추가 라이브러리가 필요하지 않습니다.

패키지가 대상 시스템으로 전송되면 적절한 패키지 관리자 명령을 사용하여 로컬에서 설치할 수 있습니다. yum의 경우 명령은 다음 패턴을 따릅니다.

```bash
sudo yum localinstall datadog-agent-<AGENT_VERSION>-1.<CPU_ARCHITECTURE>.rpm
```

Debian 기반 배포판에서 현재 디렉터리에 있는 deb 파일을 설치하려면 다음 단계를 따릅니다.

```bash
sudo apt install ./datadog-agent_<AGENT_VERSION>-1_amd64.deb
```

AIX에서 현재 디렉터리에 있는 BFF 파일을 설치하려면 다음 단계를 따릅니다.

```bash
sudo installp -acXYd datadog-agent-7-latest.aix.ppc64.bff datadog-agent
```

설치가 완료되면 `datadog.yaml.example`을 복사하여 `datadog.yaml` 파일을 추가합니다. 그런 다음 조직의 [API 키][6]를 입력하여 `datadog.yaml`을 업데이트합니다. 다음과 같이 단일 명령으로 수행할 수 있습니다.

```bash
sudo sh -c "sed 's/api_key:.*/api_key: <YOUR_DATADOG_API_KEY>/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
```

그런 다음 시스템에 적절한 명령을 사용하여 [Agent를 시작][7]하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /ko/agent/configuration/proxy
[3]: https://yum.datadoghq.com/stable/6
[4]: https://yum.datadoghq.com/stable/7
[5]: https://apt.datadoghq.com/pool/d/da
[6]: https://app.datadoghq.com/organization-settings/api-keys
[7]: /ko/agent/configuration/agent-commands/#start-the-agent
[8]: https://dd-agent-aix.s3.amazonaws.com/stable/