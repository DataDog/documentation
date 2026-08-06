---
aliases:
- /ko/agent/custom_python_package
- /ko/agent/faq/custom_python_package
further_reading:
- link: /logs/
  tag: 설명서
  text: Collect your logs
- link: /infrastructure/process/
  tag: 설명서
  text: Collect your processes
- link: /tracing/
  tag: 설명서
  text: Collect your traces
title: 에이전트에 커스텀 Python 패키지 추가하기
---

{{< tabs >}}
{{% tab "리눅스(Linux)" %}}

Agent는 `/opt/datadog-agent/embedded/`에 임베디드 파이썬(Python) 환경을 포함합니다. `python`, `pip`처럼 일반적으로 사용하는 바이너리는 `/opt/datadog-agent/embedded/bin/`에 있습니다.

Python 패키지를 내장된 `pip`를 이용해 설치합니다:

```shell
sudo -Hu dd-agent /opt/datadog-agent/embedded/bin/pip install <PACKAGE_NAME>
```

{{% /tab %}}
{{% tab "macOS" %}}

Agent는 `/opt/datadog-agent/embedded/`에 임베디드 파이썬(Python) 환경을 포함합니다. `python`, `pip`처럼 일반적으로 사용하는 바이너리는 `/opt/datadog-agent/embedded/bin/`에 있습니다.

Python 패키지를 내장된 `pip`를 이용해 설치합니다 :

```shell
sudo /opt/datadog-agent/embedded/bin/pip install <PACKAGE_NAME>
```

{{% /tab %}}

{{% tab "Windows" %}}

커스텀 Python 패키지는 **고급**(관리자 권한으로 실행) PowerShell 명령줄에서 다음 명령으로 에이전트에 내장된 Python을 사용하여 설치할 수 있습니다:

에이전트 버전 6.12 이상인 경우:

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\embedded<PYTHON_MAJOR_VERSION>\python" -m pip install <PACKAGE_NAME>
```

에이전트 버전 6.11 미만인 경우:

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\embedded\python" -m pip install <PACKAGE_NAME>
```

또는 다음 위치에서 찾을 수 있는 라이브러리 압축 폴더에 패키지를 추가할 수 있습니다.

```
%ProgramFiles%\Datadog\Datadog Agent\files
```

그런 다음 [에이전트를 재시작합니다][1].

{{< img src="agent/windows_python_package.png" alt="windows python 패키지" >}}

[1]: /ko/agent/basic_agent_usage/windows/
{{% /tab %}}
{{< /tabs >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}