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
further_reading:
- link: /agent/
  tag: 설명서
  text: Datadog Agent에 대해 자세히 알아보기
- link: /agent/configuration/proxy/
  tag: 설명서
  text: 프록시에 대해 자세히 알아보기
title: 인터넷 연결이 제한된 서버에 Agent 설치
---

[Agent 설치 지침][1]에 제공된 한 줄 설치 명령이 제대로 작동하려면 몇 가지 다른 엔드포인트에 대한 아웃바운드 HTTPS 액세스가 필요하며 인터넷 액세스가 제한된 서버에서는 작동하지 않을 수 있습니다. 구체적으로 다음과 같습니다:

* Debian/Ubuntu 시스템 설치의 경우:
  * https://keys.datadoghq.com - Datadog 공개 서명 키 저장소.
  * https://apt.datadoghq.com - Datadog APT 패키지 저장소.
* RedHat 및 SUSE 기반 시스템 설치의 경우:
  * https://keys.datadoghq.com - Datadog 공개 서명 키 저장소.
  * https://yum.datadoghq.com - Datadog RPM 패키지 저장소.

직접 인터넷에 접속할 수 없는 서버의 경우 프록시를 통해 라우팅하도록 Agent를 설정할 수 있습니다([Agent 프록시 설정][2] 참조). 아웃바운드 인터넷 연결이 제한된 서버의 경우, 서버의 OS에 맞는 패키지를 사용하여 Agent를 설치할 수 있습니다. [Agent 설치 지침][1]에는 한 줄 설치 명령 아래에 단계별 지침이 포함되어 있습니다.

대상 시스템이 패키지 리포지토리에 직접 액세스하지 못하도록 차단된 경우 다른 서버를 사용하여 리포지토리에서 패키지를 다운로드한 다음 로컬 설치를 위해 대상 시스템으로 패키지를 전송합니다.

Agent 6에 대한 RPM 패키지는 [https://yum.datadoghq.com/stable/6/ ][3]에서, Agent 7에 대한 RPM 패키지는 [https://yum.datadoghq.com/stable/7/ ][4]에서, DEB 패키지는 [https://apt.datadoghq.com/pool/d/da/ ][5]에서 사용할 수 있습니다.

**참고**: 이 패키지는 Agent 및 검사(통합 활성화 여부)를 실행하는 데 필요한 모든 리소스를 번들로 제공합니다. 좀 더 높은 요구 사항의 경우 Python 2.7+ 및 sysstat가 필요하며, 활성화된 검사에 따라 다른 종속성이 필수입니다.

패키지가 대상 시스템으로 전송되면 해당 패키지 관리자 명령을 사용하여 로컬로 설치할 수 있습니다. yum의 경우 명령은 다음 패턴을 따릅니다:

```bash
sudo yum localinstall datadog-agent-<AGENT_VERSION>-1.<CPU_ARCHITECTURE>.rpm
```

Debian 기반 배포의 경우 현재 디렉토리에 deb 파일을 설치하려면:

```bash
sudo apt install ./datadog-agent_<AGENT_VERSION>-1_amd64.deb
```

설치가 완료되면 `datadog.yaml.example`를 복사하여 `datadog.yaml` 파일을 추가합니다. 그런 다음 조직의 [API 키][6]와 함께 `datadog.yaml`를 업데이트합니다. 이 작업은 단일 명령으로 수행할 수 있습니다:

```bash
sudo sh -c "sed 's/api_key:.*/api_key: <YOUR_DATADOG_API_KEY>/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
```

그런 다음 시스템에 적합한 명령을 사용하여 [Agent][7]를 시작합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /ko/agent/configuration/proxy
[3]: https://yum.datadoghq.com/stable/6
[4]: https://yum.datadoghq.com/stable/7
[5]: https://apt.datadoghq.com/pool/d/da
[6]: https://app.datadoghq.com/organization-settings/api-keys
[7]: /ko/agent/configuration/agent-commands/#start-the-agent