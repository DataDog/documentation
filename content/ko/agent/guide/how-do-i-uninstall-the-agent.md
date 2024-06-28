---
algolia:
  tags:
  - 설치 제거
aliases:
- /ko/agent/faq/how-do-i-uninstall-the-agent/
further_reading:
- link: /agent/
  tag: 설명서
  text: Datadog 에이전트에 대해 자세히 알아보기
title: 에이전트 설치 제거
---

에이전트를 설치 제거하는 방법을 보려면 전용 플랫폼을 선택하세요.

## Debian 및 Ubuntu

{{< tabs >}}
{{% tab "에이전트 v6 및 v7" %}}
```shell
sudo apt-get remove datadog-agent -y
```

> 이 명령을 사용하면 에이전트가 제거되나 다음은 제거되지 않습니다.

* `datadog.yaml` 구성 파일,
* `/etc/datadog-agent` 구성 폴더 내 사용자가 생성한 파일,
* `/opt/datadog-agent` 폴더 내 사용자가 생성한 파일,
* `dd-agent` 사용자.

> 위와 같은 요소도 제거하고 싶으면 대신 다음 명령을 사용하세요.

```shell
sudo apt-get remove --purge datadog-agent -y
```
{{% /tab %}}

{{% tab "에이전트 v5" %}}
```shell
sudo apt-get remove datadog-agent -y
```

> 이 명령을 사용하면 에이전트가 제거되나 다음은 제거되지 않습니다.
* `datadog.yaml` 구성 파일,
* `/etc/dd-agent` 구성 폴더 내 사용자가 생성한 파일,
* `/opt/datadog-agent` 폴더 내 사용자가 생성한 파일,
* `dd-agent` 사용자.
> 위와 같은 요소도 제거하고 싶으면 대신 다음 명령을 사용하세요.

```shell
sudo apt-get --purge remove datadog-agent -y
```
{{% /tab %}}
{{< /tabs >}}

## CentOS, RHEL, Fedora, Amazon Linux
{{< tabs >}}
{{% tab "에이전트 v6 및 v7" %}}


```shell
sudo yum remove datadog-agent
```

> 이 명령을 사용하면 에이전트가 제거되나 다음은 제거되지 않습니다.
* `datadog.yaml` 구성 파일,
* `/etc/datadog-agent` 구성 폴더 내 사용자가 생성한 파일,
* `/opt/datadog-agent` 폴더 내 사용자가 생성한 파일,
* `dd-agent` 사용자.

> 위와 같은 요소와 Datadog 로그 파일을 제거하고 싶으면 에이전트를 제거한 후 다음 명령을 실행하세요.

```shell
sudo userdel dd-agent \
&& sudo rm -rf /opt/datadog-agent/ \
&& sudo rm -rf /etc/datadog-agent/ \
&& sudo rm -rf /var/log/datadog/
```
{{% /tab %}}

{{% tab "에이전트 v5" %}}
```shell
sudo yum remove datadog-agent
```

> 이 명령을 사용하면 에이전트가 제거되나 다음은 제거되지 않습니다.

* `datadog.yaml` 구성 파일,
* `/etc/dd-agent` 구성 폴더 내 사용자가 생성한 파일,
* `/opt/datadog-agent` 폴더 내 사용자가 생성한 파일,
* `dd-agent` 사용자.

> 위와 같은 요소와 Datadog 로그 파일을 제거하고 싶으면  에이전트를 제거한 후 다음 명령을 실행하세요.

```shell
sudo userdel dd-agent \
&& sudo rm -rf /opt/datadog-agent/ \
&& sudo rm -rf /etc/dd-agent/ \
&& sudo rm -rf /var/log/datadog/
```
{{% /tab %}}
{{< /tabs >}}

## openSUSE 및 SLES
{{< tabs >}}
{{% tab "에이전트 v6 및 v7" %}}
```shell
sudo zypper remove datadog-agent
```

> 이 명령을 사용하면 에이전트가 제거되나 다음은 제거되지 않습니다.
* `datadog.yaml` 구성 파일,
* `/etc/datadog-agent` 구성 폴더 내 사용자가 생성한 파일,
* `/opt/datadog-agent` 폴더 내 사용자가 생성한 파일,
* `dd-agent` 사용자.

> 위와 같은 요소와 Datadog 로그 파일을 제거하고 싶으면 에이전트를 제거한 후 다음 명령을 실행하세요.

```shell
sudo userdel dd-agent \
&& sudo rm -rf /opt/datadog-agent/ \
&& sudo rm -rf /etc/datadog-agent/ \
&& sudo rm -rf /var/log/datadog/
```
{{% /tab %}}

{{% tab "에이전트 v5" %}}

```shell
sudo zypper remove datadog-agent
```

이 명령을 사용하면 에이전트가 제거되나 다음은 제거되지 않습니다.
* `datadog.yaml` 구성 파일,
* `/etc/dd-agent` 구성 폴더 내 사용자가 생성한 파일,
* `/opt/datadog-agent` 폴더 내 사용자가 생성한 파일,
* `dd-agent` 사용자.

 위와 같은 요소와 Datadog 로그 파일을 제거하고 싶으면  에이전트를 제거한 후 다음 명령을 실행하세요.

```shell
sudo userdel dd-agent \
&& sudo rm -rf /opt/datadog-agent/ \
&& sudo rm -rf /etc/dd-agent/ \
&& sudo rm -rf /var/log/datadog/
```
{{% /tab %}}
{{< /tabs >}}
## macOS
{{< tabs >}}
{{% tab "에이전트 v6 및 v7" %}}
**단일 사용자 설치**

에이전트와 에이전트 구성 파일을 모두 삭제하는 방법:
1. 트레이에 있는 뼈다귀 아이콘을 눌러 Datadog 에이전트를 실행 중지하고 종료합니다.
2. Datadog 애플리케이션을 애플리케이션 폴더에서 휴지통으로 드래그합니다.
3. 다음 명령을 실행합니다.
    ```shell
    sudo rm -rf /opt/datadog-agent
    sudo rm -rf /usr/local/bin/datadog-agent
    sudo rm -rf ~/.datadog-agent/**​ #to remove broken symlinks
    launchctl remove com.datadoghq.agent
    sudo rm -rf /var/log/datadog
    ```
4. 변경 사항을 적용하려면 컴퓨터를 재부팅합니다.

**시스템 전체 LaunchDaemon 설치**

에이전트와 에이전트 구성 파일을 모두 삭제하는 방법:
1. Datadog 애플리케이션을 애플리케이션 폴더에서 휴지통으로 드래그합니다.
2. 남은 파일을 제거하려면 다음을 실행합니다.
    ```shell
    sudo rm -rf /opt/datadog-agent
    sudo rm -rf /usr/local/bin/datadog-agent
    sudo rm -rf ~/.datadog-agent/**​ #to remove broken symlinks
    sudo launchctl disable system/com.datadoghq.agent && sudo launchctl bootout system/com.datadoghq.agent
    sudo rm /Library/LaunchDaemons/com.datadoghq.agent.plist
    sudo rm -rf /var/log/datadog
    ```
3. 변경 사항을 적용하려면 컴퓨터를 재부팅합니다.
{{% /tab %}}

{{% tab "에이전트 v5" %}}
1. 트레이에 있는 뼈다귀 아이콘을 눌러 Datadog 에이전트를 실행 중지하고 종료합니다.
2. Datadog 애플리케이션을 애플리케이션 폴더에서 휴지통으로 드래그합니다.
3. 다음을 실행합니다.

```shell
sudo rm -rf /opt/datadog-agent
sudo rm -rf /usr/local/bin/datadog-agent
sudo rm -rf ~/.datadog-agent/** #to remove broken symlinks
```

에이전트가 부팅 시간에 실행되도록 하는 설치 명령 옵션을 실행했을 경우 다음 명령을 실행해 설치 제거를 완료합니다.

```shell
sudo launchctl unload -w /Library/LaunchDaemons/com.datadoghq.agent.plist
sudo rm /Library/LaunchDaemons/com.datadoghq.agent.plist
```

> 이 방법으로 에이전트와 에이전트 구성 파일 모두를 제거할 수 있습니다.
{{% /tab %}}
{{< /tabs >}}

## Windows

{{< tabs >}}
{{% tab "에이전트 v6 및 v7" %}}

Windows에서 에이전트를 설치 제거하는 두 가지 방법이 있습니다. 이 두 방법 모두 에이전트를 제거하나 호스트에 있는 `C:\ProgramData\Datadog` 구성 폴더를 제거하지 않습니다.

### 프로그램 추가 또는 제거

1. **CTRL** 및 **Esc** 키를 누르거나 Windows 키를 사용해 Windows Search를 실행합니다.
1. `add`를 검색하고 **프로그램 추가 또는 제거**를 클릭합니다.
1. `Datadog Agent`를 검색하고 **제거**를 클릭합니다.

### PowerShell

**참고:** WinRM을 활성화해 다음 명령을 사용합니다.

다음 PowerShell 명령의 하나를 사용해 재부팅하지 않고 에이전트를 제거할 수 있습니다.
```powershell
start-process msiexec -Wait -ArgumentList ('/log', 'C:\uninst.log', '/q', '/x', (Get-CimInstance -ClassName Win32_Product -Filter "Name='Datadog Agent'" -ComputerName .).IdentifyingNumber, 'REBOOT=ReallySuppress')
```

`/norestart` 사용:

```powershell
start-process msiexec -Wait -ArgumentList ('/log', 'C:\uninst.log', '/norestart', '/q', '/x', (Get-CimInstance -ClassName Win32_Product -Filter "Name='Datadog Agent'" -ComputerName .).IdentifyingNumber)
```

{{% /tab %}}

{{% tab "에이전트 v5" %}}

Windows에서 에이전트를 설치 제거하는 두 가지 방법이 있습니다. 이 두 방법 모두 에이전트를 제거하나 호스트에 있는 `C:\ProgramData\Datadog` 구성 폴더를 제거하지 않습니다.

> **참고**: 에이전트 < v5.12.0의 경우, 에이전트를 설치할 때 사용한 **원 계정**으로 에이전트를 설치 제거해야 합니다. 그러지 않으면 완벽하게 제거되지 않을 수 있습니다.

### 프로그램 추가 또는 제거

1. **CTRL** 및 **Esc** 키를 누르거나 Windows 키를 사용해 Windows Search를 실행합니다.
1. `add`를 검색하고 **프로그램 추가 또는 제거**를 클릭합니다.
1. `Datadog Agent`를 검색하고 **제거**를 클릭합니다.

### PowerShell

**참고:** WinRM을 활성화해 다음 명령을 사용합니다.

다음 PowerShell 명령을 사용해 재부팅하지 않고 에이전트를 제거할 수 있습니다.

```powershell
start-process msiexec -Wait -ArgumentList ('/log', 'C:\uninst.log', '/norestart', '/q', '/x', (Get-CimInstance -ClassName Win32_Product -Filter "Name='Datadog Agent'" -ComputerName .).IdentifyingNumber)
```

{{% /tab %}}
{{< /tabs >}}