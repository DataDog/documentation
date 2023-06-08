---
kind: faq
title: CERTIFICATE_VERIFY_FAILED 오류
---

### 무슨 일이 생긴 건가요?

2020년 5월 30일 토요일 10:48 UTC에 Datadog 증명서 일부에 상호 서명하는 용도로 사용되는 SSL 루트 인증서가 만료되어, 일부 Agent의 Datadog 엔드포인트 연결이 해제되었습니다. 이 루트 증명서는 특정 Agent 버전에 내장되어 있으므로, 연결을 복원하려면 대응 조치가 필요합니다.

### 어느 버전의 Agent가 영향을 받았나요?

3.6.x에서 5.32.6까지의 Agent 버전에 만료된 인증서가 포함되어 있어 영향을 받았습니다.

Agent 버전 6.x 및 7.x는 문제가 없으며, 업데이트할 필요가 없습니다.

### Agent 5.32.7로 업그레이드해 문제 해결하기

64bit 호스트에서 Agent v5.x를 실행하는 경우, Agent 5.32.7 이후로 업그레이드를 권장합니다. 이를 통해 변경 사항을 최소한으로 줄이면서 Agent가 여러 가지 다양한 시나리오에서 계속 기능하도록 할 수 있습니다.

CentOS/레드햇(Red Hat): `sudo yum check-update && sudo yum install datadog-agent`
데비안(Debian)/우분투(Ubuntu): `sudo apt-get update && sudo apt-get install datadog-agent`
버전 5.12.0 이후의 윈도우즈(Windows): Datadog [Agent 인스톨러][1]를 다운로드하세요. `start /wait msiexec /qn /i ddagent-cli-latest.msi`
[Agent 설치 페이지][2]에서 더 많은 플랫폼과 설정 관리 옵션을 자세히 살펴보실 수 있습니다.

32bit 시스템용으로 출시된 최신 호환 Agent는 5.10.1이었습니다. 32bit 호스트의 경우는, '`Fixing without upgrading the Agent`'의 안내를 따라주세요.

### Agent 업그레이드 없이 해결하기

#### 리눅스(Linux)

```shell
sudo rm -f /opt/datadog-agent/agent/datadog-cert.pem && sudo /etc/init.d/datadog-agent restart
```

#### 윈도우즈(Windows)

Agent가 프록시를 사용해 설정된 경우 [아래의 전용 섹션](#windows-agent-5x-configured-to-use-a-proxy-or-the-curl-http-client)을 따라주세요.

*CLI 사용*

Agent `>= 5.12.0`: PowerShell을 사용해 다음과 같이 조치를 취해주세요.

```shell
rm "C:\Program Files\Datadog\Datadog Agent\agent\datadog-cert.pem"
restart-service -Force datadogagent
```

**참조**: Agent 버전이 `<= 5.11`인 경우 위치가 다릅니다.
32bit Agent `<= 5.11` 버전을 64bit 우니도우즈에서 사용하는 경우 다음을 따라주세요.

```shell
rm "C:\Program Files (x86)\Datadog\Datadog Agent\files\datadog-cert.pem"
restart-service -Force datadogagent
```

기타 모든 Agent `<= 5.11` 버전의 경우에는 다음을 따라주세요.

```shell
rm "C:\Program Files\Datadog\Datadog Agent\files\datadog-cert.pem"
restart-service -Force datadogagent
```

*윈도우즈 GUI 사용*

`datadog-cert.pem`을 삭제합니다. 파일 위치는 다음과 같습니다.

* Agent `>=5.12.0`:
  * 64bit 윈도우즈: `C:\Program Files\Datadog\Datadog Agent\agent\`
  * 32bit 윈도우즈: Agent 5.12 이후의 Datadog Agent는 32bit 윈도우즈 시스템을 지원하지 않습니다.
* Agent `<= 5.11.x`:
  * 64bit 윈도우즈: `C:\Program Files (x86)\Datadog\Datadog Agent\files\`
  * 32bit 윈도우즈: `C:\Program Files\Datadog\Datadog Agent\files\`

파일 삭제 후에는 윈도우스 서비스 관리자에서 Datadog 서비스를 재시작하세요.

### Agent 6 또는 7로 업그레이드해 문제 해결하기

[Agent 7][3] 또는 [Agent 6][4]으로 업그레이드하면 이 문제를 해결할 수 있습니다. 단, *하위 호환성이 없는 Agent 6 및 7의 변경 사항에 대해서는 Agent CHANGELOG를 참조하시기 바랍니다.*

### 인증서 삭제 후 Agent 업그레이드하기

Datadog는 Agent를 최신 상태로 유지하고 최신 버전으로 업데이트하시길 권장합니다. 자동 업데이트로 설정된 배포의 경우, v5.32.7로 활성화됩니다.

### SSL로 트래픽 암호화하기

증명서를 삭제해도 SSL로 트래픽을 암호화할 수 있습니다. 증명서는 클라이언트가 사용하기 위한 프리셋이며 SSL 접속의 필수 요건은 아닙니다. Datadog Agent 엔드포인트는 SSL 트래픽만을 받아들입니다.

### 프록시 또는 curl http 클라이언트를 사용하도록 구성된 윈도우즈 Agent 5.x

Agent가 다음과 같이 설정된 경우, 이 섹션은 Windows Agent 5.x(`<= 5.32.6`)에 적용됩니다.

* `datadog.conf`의 `proxy_host` 설정 옵션 또는 `HTTPS_PROXY` 환경 변수로 프록시를 사용, 또는
* `datadog.conf`의 `use_curl_http_client: yes` 설정 옵션으로 curl HTTP 클라이언트를 사용

참조: `datadog.conf`는 `C:\ProgramData\Datadog\datadog.conf`에 있습니다.

이 경우 `datadog-cert.pem`를 삭제하면 Agent가 Datadog로 다시 접속할 수 없습니다. 대신, 다음과 같이 조치를 취해주세요.

* 윈도우즈 Agent v5, `>= 5.12.0`: `datadog-cert.pem` 파일을 5.32.7에 포함된 버전으로 대체합니다. 다음으로 Powershell CLI를 사용하세요.

```shell
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/DataDog/dd-agent/5.32.7/datadog-cert.pem" -OutFile "C:\Program Files\Datadog\Datadog Agent\agent\datadog-cert.pem"
restart-service -Force datadogagent
```

* 윈도우즈 Agent v5, `<= 5.11.x`: Agent가 제공하는 `Datadog Agent Manager` 프로그램을 사용하거나 `datadog.conf` 파일을 직접 편집하여 `datadog.conf`에 다음의 옵션을 설정합니다.
  * 64bit 윈도우즈: `ca_certs: C:\Program Files (x86)\Datadog\Datadog Agent\files\ca-certificates.crt`
  * 32bit 윈도우즈: `ca_certs: C:\Program Files\Datadog\Datadog Agent\files\ca-certificates.crt`

  `datadog.conf`를 업데이트한 후, 윈도우즈 서비스 관리자에서 Datadog 서비스를 재시작하세요.


[1]: https://s3.amazonaws.com/ddagent-windows-stable/ddagent-cli-latest.msi
[2]: https://app.datadoghq.com/account/settings?agent_version=5#agent
[3]: /ko/agent/versions/upgrade_to_agent_v7/?tab=linux#from-agent-v5-to-agent-v7
[4]: /ko/agent/versions/upgrade_to_agent_v6/?tab=linux