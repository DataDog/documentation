---
further_reading:
- link: /integrations/guide/jmx_integrations/
  tag: 설명서
  text: 어떤 통합에서 Jmxfetch를 사용합니까?
kind: faq
title: Log4Shell로 인한 원격 코드 실행 위험 완화
---

버전 7.17.0/버전 6.17.0 버전과 버전 7.32.2/버전 6.32.2 버전 사이에서 Datadog 에이전트를 사용하는 경우 Log4Shell(CVE-2021-44228 및 CVE-2021-45046)이 나타내는 취약성의 영향을 받을 수 있습니다. 버전 7.17.0/버전 6.17.0 이전 버전의 에이전트를 사용하는 경우 log4j를 JMS Appender(에이전트에서 지원되지 않지만 지원하는 옵션을 선택한 경우 Appender를 실행 중지합니다)에 로그에 기록하도록 설정하지 않는 한 취약성의 영향을 받지 않아야 합니다.

**이 취약성을 완화하는 가장 좋은 방법은 Datadog 에이전트를 버전 7.32.3(버전 6.32.3) 이상으로 업그레이드하는 것입니다.**

사용 중인 에이전트 버전이 확실하지 않으면 [에이전트 버전이 취약한지 보기](#seeing-if-your-agent-version-is-vulnerable)를 참조하세요.

## 에이전트 업그레이드

호스트 또는 컨테이너에 있는 두 개의 보조 버전 간에 Datadog 에이전트 코어를 업데이트하려면 [플랫폼에 대한 설치 명령][1]을 실행합니다.

## 에이전트 버전을 업그레이드할 수 없는 경우

지금 에이전트를 업그레이드할 수 없는 경우 이러한 지침을 사용하여 [JndiLookup.class 삭제](#delete-jndilookupclass) 또는 [환경 변수 구현](#set-log4j_format_msg_no_lookups-environment-variable)(JMXFetch 프로세스의 `LOG4J_FORMAT_MSG_NO_LOOKUPS="true"` 또는 에이전트 프로세스)를 통해 취약성을 일부 완화할 수 있습니다.

# JndiLookup.class 삭제

**이 취약성을 완화하는 가장 좋은 방법은 Datadog 에이전트를 버전 7.32.3(버전 6.32.3) 이상으로 업그레이드하는 것입니다.**

JndiLookup. class를 제거합니다 [CVE-2021-44228 및 CVE-2021-45046][2].

**참고**: 7.32.3/6.32.3에는 완화가 필요하지 않습니다. 이 버전에서 JMXFetch는 CVE-2021-45046 또는 CVE-2021-44228의 영향을 받지 않는 log4j 버전 2.12.2를 사용합니다.

### 리눅스 및 맥OS

다음 코드를 bash 스크립트`jndi_cleanup.sh`로 저장한 다음 스크립트를 실행하여 제공된 jmxfetch.jar를 제자리에 패치합니다.

```bash
#!/bin/bash

YUM_CMD=$(which yum)
APT_GET_CMD=$(which apt-get)

TARGET="/opt/datadog-agent/bin/agent/dist/jmx/jmxfetch.jar"
JNDI_CLASS="org/apache/logging/log4j/core/lookup/JndiLookup.class"

set -e

VALIDATE=0
if [ $# -eq 1 ]; then
    case "$1" in
        -c)
            VALIDATE=1 ;;
        *)
            echo "$1 is not a supported option"
            exit 1 ;;
    esac
fi

if ! command -v zip &> /dev/null
then

    if [[ ! -z $YUM_CMD ]]; then
        yum install zip
    elif [[ ! -z $APT_GET_CMD ]]; then
        apt-get update
        apt-get -y install zip
    fi
fi

if [ $VALIDATE -eq 0 ]; then
    zip -q -d $TARGET $JNDI_CLASS
else
    if [ -z $(zip -sf /opt/datadog-agent/bin/agent/dist/jmx/jmxfetch.jar  | grep -i jndilookup.class) ]; then
        echo "The $TARGET JAR is now safe to run.";
    else
        echo "The $TARGET JAR is not safe to run as it still contains $JNDI_CLASS!";
        exit 1;
    fi
fi

exit 0;

```

스크립트를 실행할 수 있도록 합니다:
```bash
chmod +x ./jndi_cleanup.sh
```

다음을 실행하여 jmxfetch.jar에서 JndiLogger.class를 제거합니다:

```bash
sudo ./jndi_cleanup.sh
```

다음을 실행하여 JndiLogger. class 가 제거되었는지 확인합니다:

```bash
.\jndi_cleanup.sh -c
```

작업이 성공적으로 수행된 경우 예상되는 결과는 다음과 같습니다:

```
The C:\Program Files\Datadog\Datadog Agent\embedded\agent\dist\jmx\jmxfetch.jar is now safe to run.
```

마지막으로 `sudo systemctl restart datadog-agent`(리눅스 systemd 기반 시스템), `sudo restart datadog-agent`(리눅스 신생 기반 시스템) 또는 메뉴 모음(macOS)의 Datadog 에이전트 앱을 사용하여 Datadog 에이전트 서비스를 다시 시작합니다.

### 윈도우즈(Windows)

다음 PowerShell 코드를 `jndi_cleanup.ps1`로 저장합니다.

```powershell
Param(
    [Parameter(Mandatory=$false)]
    [Switch]$Validate

)

[Reflection.Assembly]::LoadWithPartialName('System.IO.Compression')

$zipfile = "C:\Program Files\Datadog\Datadog Agent\embedded\agent\dist\jmx\jmxfetch.jar"
$files   = "JndiLookup.class"

$stream = New-Object IO.FileStream($zipfile, [IO.FileMode]::Open)
$update_mode   = [IO.Compression.ZipArchiveMode]::Update
$read_mode   = [IO.Compression.ZipArchiveMode]::Read

if ($Validate -eq $true) {
    $mode = $read_mode
} else {
    $mode = $update_mode
}

$zip    = New-Object IO.Compression.ZipArchive($stream, $mode)

if ($Validate -eq $true) {
    $found = New-Object System.Collections.Generic.List[System.Object]
    ($zip.Entries | ? { $files -contains $_.Name }) | % { $found.Add($_.Name) }

    if ($found.Count -eq 0) {
        Write-Output "The $zipfile is now safe to run."
    } else {
        Write-Output "Dangerous file still present, something failed during the JNDI cleanup."
    }
} else {
    ($zip.Entries | ? { $files -contains $_.Name }) | % { $_.Delete() }
}

$zip.Dispose()
$stream.Close()
$stream.Dispose()
```

**elevated**(관리자로 실행) PowerShell에서 패치를 적용하기 전에 Datadog 에이전트 서비스를 중지합니다:

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" stopservice
```

패치를 적용하여 jmxfetch.jar에서 JndiLogger.class를 제거합니다:

```powershell
.\jndi_cleanup.ps1
```

다음을 실행하여 JndiLogger. class 가 제거되었는지 확인합니다:

```powershell
.\jndi_cleanup.ps1 -Validate
```

작업이 성공적으로 수행된 경우 예상되는 결과는 다음과 같습니다:

```
The C:\Program Files\Datadog\Datadog Agent\embedded\agent\dist\jmx\jmxfetch.jar is now safe to run.
```

마지막으로 Datadog 에이전트 서비스를 시작하여 변경 사항을 적용합니다.

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" start-service
```

### AIX

`Jmxfetch.jar`는 AIX 에이전트 설치 번들에 포함되어 있지만 `jmxfetch`코드를 실행하는 AIX 에이전트에는 코드가 없습니다. `jmxfetch`프로세스를 수동으로 시작하지 않는 경우에는 `jmxfetch.jar`가 사용되지 않으므로 `/opt/datadog-agent/bin/agent/dist/jmx/jmxfetch.jar`에서 삭제할 수 있습니다.

### 컨테이너화된 에코시스템

Datadog 에이전트를 컨테이너(쿠버네티스(Kubernetes), 노마드 또는 바닐라 도커(Docker)등)로 실행하고 JMX 버전(이미지 이름은 `-jmx`로 끝남)을 사용하는 경우에는 Datadog 에이전트의 커스텀 이미지를 작성해야 합니다.

다음 도커 파일을 사용하여 커스텀 이미지를 작성합니다:

```
ARG AGENT_VERSION=7.32.2

FROM gcr.io/datadoghq/agent:$AGENT_VERSION-jmx

RUN apt update && apt install zip -y

RUN zip -q -d /opt/datadog-agent/bin/agent/dist/jmx/jmxfetch.jar org/apache/logging/log4j/core/lookup/JndiLookup.class

RUN apt purge zip -y
```

도커 파일이 있는 곳에서 빌드, 태그 및 커스텀 이미지를 컨테이너 레지스트리로 푸시합니다.

예를 들어 `7.21.1`가 실행 중인 경우

```
docker build -t <Your_Container_Registry>/agent:7.21.1-jmx-patched --build-arg AGENT_VERSION=7.21.1 .
docker push <Your_Container_Registry>/agent:7.21.1-jmx-patched
```

그런 다음 패치가 적용된 이 이미지를 클러스터에서 사용합니다.

NB: 이것은 리눅스에서만 작동하며 이미지를 구축하는 머신의 아키텍처를 사용합니다. 여러 아키텍처를 지원해야 하는 경우 전용 머신이나 `Docker buildx`등의 도구를 사용합니다.


# LOG4J_FORMAT_MSG_NO_LOOKUPS 환경변수 설정

**이 취약성을 완화하는 가장 좋은 방법은 Datadog 에이전트를 버전 7.32.3(버전 6.32.3) 이상으로 업그레이드하는 것입니다.**

**참고**: 버전 7.32.2 또는 버전 6.32.2를 실행 중인 경우에는 이러한 단계를 엄격하게 수행할 필요가 없습니다. 에이전트 버전 7.32.2(및 버전 6.32.2)[프로퍼티][3]에서 동일한 결과를 얻는 jmxfetch를 시작합니다. 그러나 제일 좋은 옵션은 Datadog 에이전트를 버전 7.32.3(버전 6.32.3) 이상으로 업그레이드하는 것입니다.

**참고**: `LOG4J_FORMAT_MSG_NO_LOOKUPS`환경 변수를 `true`로 설정하면 원격 코드 실행 위험이 줄어들지만 완전히 완화하지 않습니다.

## 호스트 설치

리눅스에서 명령어는 init 시스템과 분포에 따라 달라집니다:

### Systemd 기반 시스템:

#### 레드햇(RedHat)/CentOS 7 및 8; 아마존 리눅스 2; SUSE 12+; 우분투(Ubuntu) 16.04+/데비안(Debian) 8+

1. `/etc/systemd/system/datadog-agent.service.d/log4j_override.conf` 에서 다음 내용으로 재정의 파일을 만듭니다:
    ```
    [Service]
    Environment="LOG4J_FORMAT_MSG_NO_LOOKUPS=true"
    ```
2. systemd 서비스 정의를 다시 로드합니다:`sudo systemctl daemon-reload`
3. datadog-agent 서비스를 다시 시작합니다:`sudo systemctl restart datadog-agent`


### Upstart 기반 시스템

리눅스 분포에 따라 명령이 다릅니다:

#### 우분투(Ubuntu) 14.04

1. 다음 위치에서 다음 내용으로 재정의 파일을 만듭니다:`/etc/init/datadog-agent.override`
    ```
    env LOG4J_FORMAT_MSG_NO_LOOKUPS=true
    ```
2. Datadog 에이전트 서비스를 중지하고 시작합니다:`sudo stop datadog-agent && sudo start datadog-agent`

**참고**: `restart`는 서비스 설정 변경을 선택하지 않으므로 `start`및 `stop`를 사용합니다.

#### 레드햇(RedHat)/CentOS 6; 아마존 리눅스 1:

1. 기존 `/etc/init/datadog-agent.conf` 파일의 끝에 다음 행을 추가합니다:
    ```
    env LOG4J_FORMAT_MSG_NO_LOOKUPS=true
    ```
2. Datadog 에이전트 서비스를 중지하고 시작합니다:`sudo stop datadog-agent && sudo start datadog-agent`

**참고**: `restart`가 서비스 설정 변경을 선택하지 않으므로 `start`및 `stop`를 사용합니다.

**참고**: 에이전트를 다시 설치, 업그레이드 또는 다운그레이드할 때 `/etc/init/datadog-agent.conf`파일을 덮어씁니다. 에이전트를 버전 7.32.3/버전 6.32.3 이상으로 업그레이드할 때까지 에이전트를 업그레이드, 다운그레이드 또는 재설치할 경우 이 단계를 다시 실행해야 합니다.

### 윈도우즈(Windows)

1. 시스템에서 관리자 PowerShell을 실행합니다.
2. 다음 스니펫을 실행합니다:
    ```
    [Environment]::SetEnvironmentVariable("LOG4J_FORMAT_MSG_NO_LOOKUPS", "true", "Machine")
    ```
3. Datadog 에이전트 서비스를 다시 시작하여 변경 사항을 적용합니다.

**참고**: 이는 호스트에서 실행 중인 모든 JVM에 적용됩니다.

### AIX

`Jmxfetch.jar`는 AIX 에이전트 설치 번들에 포함되어 있지만 `jmxfetch`코드를 실행하는 AIX 에이전트에는 코드가 없습니다. `jmxfetch`프로세스를 수동으로 시작하지 않는 경우에는 `jmxfetch.jar`가 사용되지 않으므로 `/opt/datadog-agent/bin/agent/dist/jmx/jmxfetch.jar`에서 삭제할 수 있습니다.

수동으로 `jmxfetch.jar`를 실행하는 경우 자바(Java) 프로세스에 다음 플래그를 전달합니다:`‐Dlog4j2.formatMsgNoLookups=True`


## 컨테이너화 Agent

**참고**: LOG4J_FORMAT_MSG_NO_LOOKUPS 환경 변수를 true로 설정하면 원격 코드 실행의 위험이 감소하지만 완전히 완화하지 않습니다.

### 도커(Docker) (리눅스 및 윈도우즈(Windows))

datadog-에이전트 컨테이너를 실행할 때 `docker run`명령에 추가하여 다음 환경 변수를 지정합니다: `-e LOG4J_FORMAT_MSG_NO_LOOKUPS="true"`

### 쿠버네티스(Kubernetes)

`agent`컨테이너 또는 모든 Datadog 컨테이너에 환경 변수`LOG4J_FORMAT_MSG_NO_LOOKUPS="true"`를 설정합니다. 공식 Datadog Helm 차트를 사용하여 다음과 같이 `datadog.env`값 아래의 목록에 환경 변수를 추가합니다:

```
datadog:
  env:
    - name: "LOG4J_FORMAT_MSG_NO_LOOKUPS"
      value: "true"
```

## 에이전트 버전이 취약한지 확인

### 대시보드 포함

Datadog 에이전트(>= 6.17.0 - <= 6.32.2; >= 7.17.0 - <= 7.32.2)가 Log4j 취약 버전에서 실행되지 않는 권장 버전(6.32.3/7.32.3 이상)인지 확인하려면 [가져오기][4] 다음 대시보드 템플릿을 Datadog 계정으로 이동합니다:

[**Datadog Agent Version Check dashboard template**][5]
</br>
</br>
{{< img src="agent/faq/dashboard.png" alt="Datadog Agent Version Check dashboard showing vulnerable Agents" >}}

여러 Datadog 계정 또는 호스트에 대해 이 대시보드의 여러 버전을 만들려면 대시보드 API를 사용하여 생성 프로세스를 자동화할 수 있습니다. JSON 파일이 저장된 디렉토리에서 다음 명령을 실행합니다:

```curl
curl -X POST "https://api.datadoghq.com/api/v1/dashboard" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
-d @DatadogAgentVersionCheck.json
```

**참고**: Datadog 에이전트 버전 점검 대시보드에는 이전 버전의 Datadog 에이전트(버전 5)가 표시되지 않으므로 해당 버전이 취약하지 않습니다.

### CLI 포함

에이전트 CLI `version`하위 명령을 사용하여 특정 에이전트 버전 정보를 점검할 수도 있습니다. 자세한 내용은 [에이전트 CLI 설명서][6]을 참조하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://logging.apache.org/log4j/2.x/security.html
[3]: https://github.com/DataDog/datadog-agent/blob/main/CHANGELOG.rst#7322--6322
[4]: /ko/dashboards/#copy-import-or-export-dashboard-json
[5]: /resources/json/agent-version-dashboard.json
[6]: /ko/agent/configuration/agent-commands/?tab=agentv6v7#other-commands