---
further_reading:
- link: agent/
  tag: 설명서
  text: Datadog Agent
private: true
title: Datadog Agent 5 설치
---
이 가이드는 Agent 5 설치에 대해 다룹니다. Datadog은 최신 기능을 사용하려면 Agent 7을 설치하거나 Agent 7로 업그레이드하는 것이 좋습니다. 최신 버전의 Agent 설치에 대한 정보는 [Agent 7 설치 지침][1]을 따르세요. 이전 버전에서 Agent 7로 업그레이드하는 방법에 대한 정보는 [Datadog Agent v7로 업그레이드][2]를 참조하세요.

## macOS {#macos}

### Agent 설치 {#install-the-agent}

#### 명령줄 {#command-line}

다음 명령에서 `MY_API_KEY`를 사용자의 Datadog API 키로 바꾼 후 실행합니다.
{{< code-block lang="shell" >}}
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/osx/install.sh)"
{{< /code-block >}}

Agent를 관리하려면 `datadog-agent` 명령을 사용하세요. `datadog-agent` 바이너리의 기본 위치는 `/usr/local/bin`입니다. `/opt/datadog-agent/etc/conf.d`에서 통합을 활성화하거나 비활성화합니다.

#### GUI {#gui}

1. [DMG 패키지][3]를 다운로드하여 설치합니다.
1. `/opt/datadog-agent/etc/datadog.conf`에 다음 줄을 추가하고 `MY_API_KEY`를 사용자의 Datadog API 키로 바꿉니다.
   {{< code-block lang="shell" >}}
api_key:MY_API_KEY
{{< /code-block >}}

Agent를 관리하려면 시스템 트레이의 Datadog Agent 앱을 사용하세요. `/opt/datadog-agent/etc/conf.d`에서 통합을 활성화하거나 비활성화합니다.

### Agent 실행 동작 {#agent-run-behavior}

기본적으로 Agent는 로그인 시 실행됩니다. 시스템 트레이의 Datadog Agent 앱을 사용하여 비활성화할 수 있습니다. 부팅 시 Agent를 실행하려면 다음 명령을 사용하세요.
{{< code-block lang="shell" >}}
sudo cp '/opt/datadog-agent/etc/com.datadoghq.agent.plist' /Library/LaunchDaemons
sudo launchctl load -w /Library/LaunchDaemons/com.datadoghq.agent.plist
{{< /code-block >}}

### 제거 {#uninstall}

1. 트레이에서 뼈 모양 아이콘을 사용하여 Datadog Agent를 중지하고 닫습니다.
1. Application 폴더에서 Datadog 애플리케이션을 휴지통으로 드래그합니다.
1. 다음을 실행합니다.

   ```shell
   sudo rm -rf /opt/datadog-agent
   sudo rm -rf /usr/local/bin/datadog-agent
   sudo rm -rf ~/.datadog-agent/** # to remove broken symlinks
   ```

부팅 시 Agent가 실행되도록 선택적 설치 명령을 실행한 경우 다음 명령을 실행하여 제거를 완료합니다.

```shell
sudo launchctl unload -w /Library/LaunchDaemons/com.datadoghq.agent.plist
sudo rm /Library/LaunchDaemons/com.datadoghq.agent.plist
```

## Windows {#windows}

### Agent 설치 {#install-the-agent-1}

#### GUI {#gui-1}

Datadog Agent 설치 프로그램을 다운로드하여 실행합니다.
- [64비트 설치 프로그램][4].
- [32비트 설치 프로그램][5]. 32비트 설치는 Agent 버전 5.10.1까지만 지원됩니다.

사용 가능한 모든 Windows 설치 프로그램 버전 링크는 [JSON 형식][6]으로 제공됩니다.

#### 명령줄 {#command-line-1}

1. Agent를 다운로드합니다.
   - 새로 설치하는 경우 [Datadog Agent 설치 프로그램][4]을 다운로드합니다.
   - Datadog Agent 5.12.0 미만 버전에서 업그레이드하는 경우 [EXE 설치 방법][7]을 따르세요.
1. 설치 프로그램을 다운로드한 디렉터리의 `cmd.exe` 셸에서 다음 명령을 실행합니다. `MY_API_KEY`를 사용자의 Datadog API 키로 바꿉니다.
   {{< code-block lang="shell" >}}
start /wait msiexec /qn /i ddagent-cli-latest.msi APIKEY="MY_API_KEY"
{{< /code-block >}}
   필요시 `TAG` 및 `HOSTNAME` 값을 추가합니다.

#### Azure에 배포 {#deployment-to-azure}

Azure에 Agent를 설치하려면 [Microsoft Azure 설명서][8]를 따르세요.

### 5.12의 새로운 업그레이드 절차 {#new-upgrade-procedure-for-512}

5.12 이전 버전의 Windows Agent를 실행 중인 기존 고객의 경우 장치를 업그레이드하기 위해 추가 단계가 필요할 수 있습니다. 구체적으로, 최신 Agent는 '머신별' 설치 방식입니다. 이전 버전의 Agent는 기본적으로 '사용자별' 방식이었습니다. Chef로 배포하는 경우 추가 단계가 필요할 수 있습니다. 자세한 내용은 [Windows Agent 설치][9]를 참조하세요.

### 제거 {#uninstall-1}

Windows에서 Agent를 제거하는 방법에는 두 가지가 있습니다. 두 방법 모두 Agent를 제거하지만, 호스트의 `C:\ProgramData\Datadog` 구성 폴더는 제거하지 않습니다.

**참고**: v5.12.0 미만 버전의 Agent인 경우 Agent를 설치할 때 사용한 **원래 계정**으로 Agent를 제거해야 합니다. 그렇지 않으면 깔끔하게 제거되지 않을 수 있습니다.

### 프로그램 추가 또는 제거 {#add-or-remove-programs}

1. **CTRL** 및 **Esc** 키를 누르거나 Windows 키를 사용하여 Windows 검색을 실행합니다.
1. `add`를 검색하고 {{< ui >}}Add or remove programs{{< /ui >}}를 클릭합니다.
1. `Datadog Agent`를 검색하고 {{< ui >}}Uninstall{{< /ui >}}을 클릭합니다.

### PowerShell {#powershell}

**참고:** 아래 명령을 사용하려면 WinRM을 활성화하세요.

재부팅하지 않고 Agent를 제거하려면 다음 PowerShell 명령을 사용합니다.

```powershell
start-process msiexec -Wait -ArgumentList ('/log', 'C:\uninst.log', '/norestart', '/q', '/x', (Get-CimInstance -ClassName Win32_Product -Filter "Name='Datadog Agent'" -ComputerName .).IdentifyingNumber)
```

## Linux 및 Unix {#linux-and-unix}

{{< tabs >}}

{{% tab "Debian" %}}
### 단일 단계 설치 {#one-step-install}

단일 단계 명령은 Datadog Agent용 APT 패키지를 설치하고 비밀번호 입력을 요청합니다. 컴퓨터에 Agent가 아직 설치되어 있지 않은데 설치 후 자동으로 시작되지 않도록 하려면, 명령을 실행하기 전에 `DD_INSTALL_ONLY=true`를 명령 앞에 추가하세요.

다음 명령에서 `MY_API_KEY`를 사용자의 Datadog API 키로 바꾼 후 실행합니다.

```shell
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh)"
```

### 다단계 설치 {#multi-step-install}

1. APT가 HTTPS를 통해 다운로드할 수 있도록 설정하고 `curl` 및 `gnupg`를 설치합니다.
   ```shell
   sudo apt-get update
   sudo apt-get install apt-transport-https curl gnupg
   ```
1. 시스템에 Datadog Debian 리포지토리를 설정하고 Datadog 아카이브 키링을 생성합니다.
   ```shell
   sudo sh -c "echo 'deb [signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg] https://apt.datadoghq.com/ stable main' > /etc/apt/sources.list.d/datadog.list"
   sudo touch /usr/share/keyrings/datadog-archive-keyring.gpg
   sudo chmod a+r /usr/share/keyrings/datadog-archive-keyring.gpg

   curl https://keys.datadoghq.com/DATADOG_APT_KEY_CURRENT.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
   curl https://keys.datadoghq.com/DATADOG_APT_KEY_06462314.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
   curl https://keys.datadoghq.com/DATADOG_APT_KEY_C0962C7D.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
   curl https://keys.datadoghq.com/DATADOG_APT_KEY_F14F620E.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
   curl https://keys.datadoghq.com/DATADOG_APT_KEY_382E94DE.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
   ```
1. Debian 8 이하 버전을 실행 중인 경우 키링을 `/etc/apt/trusted.gpg.d`에 복사합니다.
   ```shell
   sudo cp -a /usr/share/keyrings/datadog-archive-keyring.gpg /etc/apt/trusted.gpg.d/
   ```

1. 로컬 APT 리포지토리를 업데이트하고 Agent를 설치합니다.
   ```shell
   sudo apt-get update
   sudo apt-get install datadog-agent datadog-signing-keys
   ```

1. 다음 명령을 실행하여 예시 구성을 제자리에 복사합니다. `MY_API_KEY`를 사용자의 Datadog API 키로 바꿉니다.
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key:MY_API_KEY /' /etc/dd-agent/datadog.conf.example > /etc/dd-agent/datadog.conf"
   ```

1. Agent를 시작합니다.
   ```shell
   sudo /etc/init.d/datadog-agent start
   ```

{{% /tab %}}

{{% tab "Ubuntu" %}}
### 단일 단계 설치 {#one-step-install-1}

단일 단계 명령은 Datadog Agent용 APT 패키지를 설치하고 비밀번호 입력을 요청합니다. 컴퓨터에 Agent가 아직 설치되어 있지 않은데 설치 후 자동으로 시작되지 않도록 하려면, 명령을 실행하기 전에 `DD_INSTALL_ONLY=true`를 명령 앞에 추가하세요.

다음 명령에서 `MY_API_KEY`를 사용자의 Datadog API 키로 바꾼 후 실행합니다.

```shell
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh)"
```

### 다단계 설치 {#multi-step-install-1}

1. APT가 HTTPS를 통해 다운로드할 수 있도록 설정하고 `curl` 및 `gnupg`를 설치합니다.
   ```shell
   sudo apt-get update
   sudo apt-get install apt-transport-https curl gnupg
   ```
1. 시스템에 Datadog Debian 리포지토리를 설정하고 Datadog 아카이브 키링을 생성합니다.
   ```shell
   sudo sh -c "echo 'deb [signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg] https://apt.datadoghq.com/ stable main' > /etc/apt/sources.list.d/datadog.list"
   sudo touch /usr/share/keyrings/datadog-archive-keyring.gpg
   sudo chmod a+r /usr/share/keyrings/datadog-archive-keyring.gpg

   curl https://keys.datadoghq.com/DATADOG_APT_KEY_CURRENT.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
   curl https://keys.datadoghq.com/DATADOG_APT_KEY_06462314.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
   curl https://keys.datadoghq.com/DATADOG_APT_KEY_C0962C7D.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
   curl https://keys.datadoghq.com/DATADOG_APT_KEY_F14F620E.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
   curl https://keys.datadoghq.com/DATADOG_APT_KEY_382E94DE.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
   ```
1. Debian 8 이하 버전을 실행 중인 경우 키링을 `/etc/apt/trusted.gpg.d`에 복사합니다.
   ```shell
   sudo cp -a /usr/share/keyrings/datadog-archive-keyring.gpg /etc/apt/trusted.gpg.d/
   ```

1. 로컬 APT 리포지토리를 업데이트하고 Agent를 설치합니다.
   ```shell
   sudo apt-get update
   sudo apt-get install datadog-agent datadog-signing-keys
   ```

1. 다음 명령을 실행하여 예시 구성을 제자리에 복사합니다. `MY_API_KEY`를 사용자의 Datadog API 키로 바꿉니다.
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key:MY_API_KEY /' /etc/dd-agent/datadog.conf.example > /etc/dd-agent/datadog.conf"
   ```

1. Agent를 시작합니다.
   ```shell
   sudo /etc/init.d/datadog-agent start
   ```

### 제거 {#uninstall-2}

Agent를 제거하려면 다음 명령을 실행하세요.

```shell
sudo apt-get remove datadog-agent -y
```

이 명령은 Agent를 제거하지만 다음 항목은 제거하지 않습니다.

* `datadog.yaml` 구성 파일
* `/etc/dd-agent` 구성 폴더 내 사용자 생성 파일
* `/opt/datadog-agent` 폴더 내 사용자 생성 파일
* `dd-agent` 사용자
* Datadog 로그 파일

이러한 요소도 제거하려면 Agent를 제거한 후 이 명령을 실행하세요.

```shell
sudo apt-get --purge remove datadog-agent -y
```

{{% /tab %}}

{{% tab "Amazon Linux" %}}
### 단일 단계 설치 {#one-step-install-2}

단일 단계 명령은 Datadog Agent용 YUM 패키지를 설치하고 비밀번호 입력을 요청합니다. 컴퓨터에 Agent가 아직 설치되어 있지 않은데 설치 후 자동으로 시작되지 않도록 하려면, 명령을 실행하기 전에 `DD_INSTALL_ONLY=true`를 명령 앞에 추가하세요.

다음 명령에서 `MY_API_KEY`를 사용자의 Datadog API 키로 바꾼 후 실행합니다.

```shell
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh)"
```

### 다단계 설치 {#multi-step-install-2}

1. 다음 내용으로 `/etc/yum.repos.d/datadog.repo`를 생성하여 Datadog YUM 리포지토리를 설정합니다.
   ```conf
   [datadog]
   name=Datadog, Inc.
   baseurl=https://yum.datadoghq.com/rpm/x86_64/
   enabled=1
   gpgcheck=1
   gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
   ```

   **참고**: i386/i686 아키텍처에서는 'x86_64'를 'i386'으로 바꾸세요..

1. 로컬 yum 리포지토리를 업데이트하고 Agent를 설치합니다.
   ```shell
   sudo yum makecache
   sudo yum install datadog-agent
   ```
1. 예시 구성을 제자리에 복사합니다. `MY_API_KEY`를 사용자의 Datadog API 키로 바꿉니다.
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key:MY_API_KEY /' /etc/dd-agent/datadog.conf.example > /etc/dd-agent/datadog.conf"
   ```

1. Agent를 다시 시작합니다.
   ```shell
   sudo /etc/init.d/datadog-agent restart
   ```


### 제거 {#uninstall-3}

Agent를 제거하려면 다음 명령을 실행하세요.

```shell
sudo yum remove datadog-agent
```

이 명령은 Agent를 제거하지만 다음 항목은 제거하지 않습니다.

* `datadog.yaml` 구성 파일
* `/etc/dd-agent` 구성 폴더 내 사용자 생성 파일
* `/opt/datadog-agent` 폴더 내 사용자 생성 파일
* `dd-agent` 사용자
* Datadog 로그 파일

이러한 요소도 제거하려면 Agent를 제거한 후 이 명령을 실행하세요.

```shell
sudo userdel dd-agent \
&& sudo rm -rf /opt/datadog-agent/ \
&& sudo rm -rf /etc/dd-agent/ \
&& sudo rm -rf /var/log/datadog/
```
{{% /tab %}}

{{% tab "CentOS 및 Red Hat" %}}
### 단일 단계 설치 {#one-step-install-3}

단일 단계 명령은 Datadog Agent용 YUM 패키지를 설치하고 비밀번호 입력을 요청합니다. 컴퓨터에 Agent가 아직 설치되어 있지 않은데 설치 후 자동으로 시작되지 않도록 하려면, 명령을 실행하기 전에 `DD_INSTALL_ONLY=true`를 명령 앞에 추가하세요.

다음 명령에서 `MY_API_KEY`를 사용자의 Datadog API 키로 바꾼 후 실행합니다.

```shell
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh)"
```

### 다단계 설치 {#multi-step-install-3}

1. 다음 내용으로 `/etc/yum.repos.d/datadog.repo`를 생성하여 Datadog YUM 리포지토리를 설정합니다.
   ```conf
   [datadog]
   name=Datadog, Inc.
   baseurl=https://yum.datadoghq.com/rpm/x86_64/
   enabled=1
   gpgcheck=1
   gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
   ```

   **참고**: i386/i686 아키텍처에서는 'x86_64'를 'i386'으로 바꾸세요..

1. 로컬 YUM 리포지토리를 업데이트하고 Agent를 설치합니다.
   ```shell
   sudo yum makecache
   sudo yum remove datadog-agent-base 
   sudo yum install datadog-agent
   ```
1. 예시 구성을 제자리에 복사합니다. `MY_API_KEY`를 사용자의 Datadog API 키로 바꿉니다.
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key:MY_API_KEY /' /etc/dd-agent/datadog.conf.example > /etc/dd-agent/datadog.conf"
   ```

1. Agent를 다시 시작합니다.
   ```shell
   sudo /etc/init.d/datadog-agent restart
   ```

### 제거 {#uninstall-4}

Agent를 제거하려면 다음 명령을 실행하세요.

```shell
sudo yum remove datadog-agent
```

이 명령은 Agent를 제거하지만 다음 항목은 제거하지 않습니다.

* `datadog.yaml` 구성 파일
* `/etc/dd-agent` 구성 폴더 내 사용자 생성 파일
* `/opt/datadog-agent` 폴더 내 사용자 생성 파일
* `dd-agent` 사용자
* Datadog 로그 파일

이러한 요소도 제거하려면 Agent를 제거한 후 이 명령을 실행하세요.

```shell
sudo userdel dd-agent \
&& sudo rm -rf /opt/datadog-agent/ \
&& sudo rm -rf /etc/dd-agent/ \
&& sudo rm -rf /var/log/datadog/
```

{{% /tab %}}

{{% tab "Fedora" %}}
### 단일 단계 설치 {#one-step-install-4}

단일 단계 명령은 Datadog Agent용 YUM 패키지를 설치하고 비밀번호 입력을 요청합니다. 컴퓨터에 Agent가 아직 설치되어 있지 않은데 설치 후 자동으로 시작되지 않도록 하려면, 명령을 실행하기 전에 `DD_INSTALL_ONLY=true`를 명령 앞에 추가하세요.

다음 명령에서 `MY_API_KEY`를 사용자의 Datadog API 키로 바꾼 후 실행합니다.

```shell
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh)"
```

### 다단계 설치 {#multi-step-install-4}

1. 다음 내용으로 `/etc/yum.repos.d/datadog.repo`를 생성하여 Datadog YUM 리포지토리를 설정합니다.
   ```conf
   [datadog]
   name=Datadog, Inc.
   baseurl=https://yum.datadoghq.com/rpm/x86_64/
   enabled=1
   gpgcheck=1
   gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
   ```

   **참고**: i386/i686 아키텍처에서는 'x86_64'를 'i386'으로 바꾸세요..

1. 로컬 YUM 리포지토리를 업데이트하고 Agent를 설치합니다.
   ```shell
   sudo yum makecache
   sudo yum install datadog-agent
   ```
1. 예시 구성을 제자리에 복사합니다. `MY_API_KEY`를 사용자의 Datadog API 키로 바꿉니다.
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key:MY_API_KEY /' /etc/dd-agent/datadog.conf.example > /etc/dd-agent/datadog.conf"
   ```

1. Agent를 다시 시작합니다.
   ```shell
   sudo /etc/init.d/datadog-agent restart
   ```

### 제거 {#uninstall-5}

Agent를 제거하려면 다음 명령을 실행하세요.

```shell
sudo yum remove datadog-agent
```

이 명령은 Agent를 제거하지만 다음 항목은 제거하지 않습니다.

* `datadog.yaml` 구성 파일
* `/etc/dd-agent` 구성 폴더 내 사용자 생성 파일
* `/opt/datadog-agent` 폴더 내 사용자 생성 파일
* `dd-agent` 사용자
* Datadog 로그 파일

이러한 요소도 제거하려면 Agent를 제거한 후 이 명령을 실행하세요.

```shell
sudo userdel dd-agent \
&& sudo rm -rf /opt/datadog-agent/ \
&& sudo rm -rf /etc/dd-agent/ \
&& sudo rm -rf /var/log/datadog/
```

{{% /tab %}}

{{% tab "SUSE" %}}
### 단일 단계 설치 {#one-step-install-5}

단일 단계 명령은 Datadog Agent용 YUM 패키지를 설치하고 비밀번호 입력을 요청합니다. 컴퓨터에 Agent가 아직 설치되어 있지 않은데 설치 후 자동으로 시작되지 않도록 하려면, 명령을 실행하기 전에 `DD_INSTALL_ONLY=true`를 명령 앞에 추가하세요.

다음 명령에서 `MY_API_KEY`를 사용자의 Datadog API 키로 바꾼 후 실행합니다.

```shell
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh)"
```

### 다단계 설치 {#multi-step-install-5}

1. 다음 내용으로 `/etc/yum.repos.d/datadog.repo`를 생성하여 Datadog YUM 리포지토리를 설정합니다.
   ```conf
   [datadog]
   name=Datadog, Inc.
   enabled=1
   baseurl=https://yum.datadoghq.com/suse/rpm/x86_64
   type=rpm-md
   gpgcheck=1
   repo_gpgcheck=0
   gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
   gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
   ```

1. 로컬 zypper 리포지토리를 업데이트하고 Agent를 설치합니다.
   ```shell
   sudo zypper refresh
   sudo zypper install datadog-agent
   ```
1. 예시 구성을 제자리에 복사합니다. `MY_API_KEY`를 사용자의 Datadog API 키로 바꿉니다.
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key: MY_API_KEY/' /etc/dd-agent/datadog.conf.example > /etc/dd-agent/datadog.conf"
   ```

1. Agent를 다시 시작합니다.
   ```shell
   sudo /etc/init.d/datadog-agent restart
   ```

### 제거 {#uninstall-6}

Agent를 제거하려면 다음 명령을 실행하세요.

```shell
sudo zypper remove datadog-agent
```

이 명령은 Agent를 제거하지만 다음 항목은 제거하지 않습니다.
* `datadog.yaml` 구성 파일
* `/etc/dd-agent` 구성 폴더 내 사용자 생성 파일
* `/opt/datadog-agent` 폴더 내 사용자 생성 파일
* `dd-agent` 사용자
* Datadog 로그 파일

이러한 요소도 제거하려면 Agent를 제거한 후 이 명령을 실행하세요.

```shell
sudo userdel dd-agent \
&& sudo rm -rf /opt/datadog-agent/ \
&& sudo rm -rf /etc/dd-agent/ \
&& sudo rm -rf /var/log/datadog/
```


{{% /tab %}}

{{% tab "AIX" %}}
**참고**: 이 탭에서는 레거시 Datadog UNIX Agent를 다룹니다. 최신 기능과 지속적인 지원을 위해 [AIX용 Agent 7][3]을 설치하거나 해당 버전으로 업그레이드하는 것이 좋습니다. Agent 7이 지원하는 AIX 버전은 [지원되는 플랫폼][4]을 참조하세요.

### 단일 단계 설치 {#one-step-install-6}

단일 단계 설치 명령은 Datadog Agent용 최신 BFF 패키지를 설치하며 필요한 경우 비밀번호 입력을 요청합니다. 컴퓨터에 Agent가 아직 설치되어 있지 않은데 설치 후 자동으로 시작되지 않도록 하려면, 명령을 실행하기 전에 `DD_INSTALL_ONLY=true`를 명령 앞에 추가하세요.

다음 명령에서 `MY_API_KEY`를 사용자의 Datadog API 키로 바꾼 후 실행합니다.

```shell
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh)"
```

### 이전 설치에서 업그레이드 {#upgrade-from-a-previous-installation}

기존 구성을 유지하면서 Agent를 설치하려면 다음 명령을 실행하세요.

```shell
DD_UPGRADE=true ksh -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-unix-agent/master/scripts/install_script.sh)"
```

자세한 내용은 [AIX용 Datadog UNIX Agent][1]를 참조하세요.

### 다단계 설치 {#multi-step-install-6}

1. [datadog-unix-agent][2] 리포지토리 릴리스에서 원하는 BFF를 다운로드합니다.
1. `installp`를 사용하여 root 권한으로 아티팩트를 설치합니다.
   ```shell
   installp -aXYgd datadog-unix-agent-latest.powerpc.aix..bff datadog-unix-agent
   ```
1. 기존 구성 파일이 없는 경우 예시 구성을 복사하여 배치합니다. `MY_API_KEY`를 사용자의 Datadog API 키로 바꿉니다.
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key: MY_API_KEY/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
   ```
1. Datadog Agent에 올바른 권한이 있는지 확인합니다.
   ```shell
   sudo sh -c "chown dd-agent:dd-agent /etc/datadog-agent/datadog.yaml && chmod 660 /etc/datadog-agent/datadog.yaml"
   ```
1. Agent 서비스를 중지합니다.
   ```shell
   sudo stopsrc -s datadog-agent
   ```
1. Agent 서비스가 중지되었는지 확인합니다.
   ```
   sudo lssrc -s datadog-agent
   ```
1. Agent 서비스를 다시 시작합니다.
   ```shell
   sudo startsrc -s datadog-agent
   ```

### 제거 {#uninstall-7}

Agent를 제거하려면 다음 명령을 실행하세요.

설치된 Agent를 제거하려면 다음 `installp` 명령을 실행하세요.

```shell
installp -e dd-aix-uninstall.log -uv datadog-unix-agent
```

참고: Agent 제거 로그는 `dd-aix-install.log` 파일에서 찾을 수 있습니다. 이 로깅을 비활성화하려면 제거 명령에서 `-e` 파라미터를 제거하세요.

[1]: /ko/agent/guide/install-unix-agent-aix/#installation
[2]: https://github.com/DataDog/datadog-unix-agent/releases
[3]: /ko/agent/supported_platforms/aix/
[4]: /ko/agent/supported_platforms/?tab=aix
{{% /tab %}}

{{< /tabs >}}

## 클라우드 및 컨테이너 {#cloud-and-containers}

{{< tabs >}}
{{% tab "Kubernetes" %}}
## Agent 설치 {#install-the-agent-2}
### DaemonSet를 사용하여 설치 {#install-with-daemonsets}

Kubernetes >= 1.1.0을 실행 중인 경우 [DaemonSet][1]를 활용하여 모든 노드에 Datadog Agent를 자동으로 배포할 수 있습니다.

1. API 키가 포함된 시크릿을 생성합니다. 이 시크릿은 Datadog Agent를 배포하기 위한 매니페스트에 사용됩니다. `MY_API_KEY`를 사용자의 Datadog API 키로 바꿉니다.
   ```shell
   kubectl create secret generic datadog-secret --from-literal api-key =" MY_API_KEY"
   ```

1. `dd-agent.yaml`이라는 이름의 다음 매니페스트를 생성합니다.

   ```yaml
   apiVersion: extensions/v1beta1
   kind: DaemonSet
   metadata:
   name: dd-agent
   spec:
   template:
      metadata:
         labels:
         app: dd-agent
         name: dd-agent
      spec:
         containers:
         - image: gcr.io/datadoghq/docker-dd-agent:latest
         imagePullPolicy: Always
         name: dd-agent
         ports:
            - containerPort: 8125
               name: dogstatsdport
               protocol: UDP
         env:
            - name: DD_API_KEY
               valueFrom:
               secretKeyRef:
                  name: datadog-secret
                  key: api-key
            - name: KUBERNETES
               value: "yes"
            - name: SD_BACKEND
               value: docker
            # Uncomment this variable if the agent has issues reaching kubelet
            # - name: KUBERNETES_KUBELET_HOST
            #   valueFrom:
            #     fieldRef:
            #       fieldPath: status.hostIP  # Kubernetes >= 1.7
            #       # or
            #       # fieldPath: spec.nodeName  # Kubernetes < 1.7
         resources:
            requests:
               memory: "256Mi"
               cpu: "200m"
            limits:
               memory: "256Mi"
               cpu: "200m"
         volumeMounts:
            - name: dockersocket
               mountPath: /var/run/docker.sock
            - name: procdir
               mountPath: /host/proc
               readOnly: true
            - name: cgroups
               mountPath: /host/sys/fs/cgroup
               readOnly: true
         livenessProbe:
            exec:
               command:
               - ./probe.sh
            initialDelaySeconds: 15
            periodSeconds: 5
         volumes:
         - hostPath:
               path: /var/run/docker.sock
            name: dockersocket
         - hostPath:
               path: /proc
            name: procdir
         - hostPath:
               path: /sys/fs/cgroup
            name: cgroups
   ```

1. DaemonSet를 배포합니다.
   ```shell
   kubectl create -f dd-agent.yaml
   ```

<div class="alert alert-info">이 매니페스트는 Autodiscovery의 자동 구성 기능을 활성화합니다. 자동 구성을 비활성화하려면 <code>SD_BACKEND</code> 환경 변수 정의를 제거하세요. Autodiscovery를 구성하는 방법을 알아보려면 <a href="https://docs.datadoghq.com/containers/kubernetes/integrations/?tab=kubernetesadv2">Kubernetes Integrations Autodiscovery</a>를 참조하세요.</div>

### Docker 컨테이너로 Agent 실행 {#run-the-agent-as-a-docker-container}

Kubernetes 1.1.0 이상 버전을 실행 중이 아니거나 DaemonSet를 사용하지 않으려면 모니터링하려는 각 노드에서 Agent를 Docker 컨테이너로 실행하세요. 다음 명령에서 `MY_API_KEY`를 사용자의 Datadog API 키로 바꾼 후 실행합니다.

```shell
docker run -d --name dd-agent -h `hostname` -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro -e API_KEY=MY_API_KEY -e KUBERNETES=yes -e SD_BACKEND=docker gcr.io/datadoghq/docker-dd-agent:latest
```

## Custom Metrics 전송 {#send-custom-metrics}

DogStatsD를 사용하여 [Custom Metrics][2]를 전송할 계획이라면 다음 단계를 따르세요.
1. 매니페스트의 `ports` 섹션에 `hostPort`를 추가하여 컨테이너의 StatsD 포트를 노드의 IP 주소에 바인딩합니다.
   ```yaml
   ports:
     - containerPort: 8125
       hostPort: 8125
       name: dogstatsdport
       protocol: UDP
   ```

1. 노드의 IP로 UDP 패킷을 전송하도록 클라이언트 라이브러리를 구성합니다. 브리지 네트워킹을 사용하는 경우 애플리케이션 컨테이너의 기본 게이트웨이가 노드의 IP와 일치합니다. Downward API를 사용하여 노드의 호스트 이름을 환경 변수로 노출할 수도 있습니다.

## Agent 구성 사용자 지정 {#customize-your-agent-configuration}

Agent 구성을 사용자 지정하려면 Agent 5 [docker-dd-agent][3] 리포지토리의 설명서를 참조하세요. Autodiscovery 구성을 조정하려면 [Kubernetes Integrations Autodiscovery][4]를 참조하세요. Autodiscovery를 비활성화하려면 매니페스트에서 `SD_BACKEND` 환경 변수를 제거하세요.

메트릭, 서비스 검사 및 이벤트 수집에 대한 자세한 내용은 [Kubernetes 통합][5] 설명서를 참조하세요.

[1]: https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/
[2]: /ko/metrics/custom_metrics
[3]: https://github.com/DataDog/docker-dd-agent
[4]: /ko/containers/kubernetes/integrations/?tab=kubernetesadv2
[5]: /ko/integrations/kubernetes/

{{% /tab %}}

{{% tab "Docker" %}}
### 단일 단계 설치 {#one-step-install-7}

단일 단계 설치는 호스트를 모니터링하기 위해 Datadog Agent를 포함하는 Docker 컨테이너를 실행합니다. Docker 통합과 자동 구성 모드의 Autodiscovery는 기본적으로 활성화되어 있습니다. Autodiscovery를 비활성화하려면 단일 단계 설치 명령에서 `SD_BACKEND` 변수를 제거하세요.

#### Amazon Linux {#amazon-linux}
다음 명령에서 `MY_API_KEY`를 사용자의 Datadog API 키로 바꾼 후 실행합니다.

```shell
docker run -d --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /cgroup/:/host/sys/fs/cgroup:ro -e API_KEY=MY_API_KEY -e SD_BACKEND=docker gcr.io/datadoghq/docker-dd-agent:latest
```

#### 기타 운영 체제 {#other-operating-systems}
다음 명령에서 `MY_API_KEY`를 사용자의 Datadog API 키로 바꾼 후 실행합니다.

```shell
docker run -d --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro -e API_KEY=MY_API_KEY -e SD_BACKEND=docker gcr.io/datadoghq/docker-dd-agent:latest
```

#### 문제 해결 {#troubleshooting}

단일 단계 설치 명령이 작동하지 않는 경우 시스템이 `cgroup` 디렉터리를 예상치 못한 위치에 마운트했거나 메모리 관리에 CGroups를 사용하지 않을 수 있습니다. Docker 검사에 성공하려면 CGroups가 필요합니다. CGroups를 활성화하려면 [docker-dd-agent][1] 리포지토리의 설명서를 참조하세요. 예상치 못한 `cgroup` 디렉터리 위치로 인해 검사에 실패하는 경우 다음 단계를 따르세요.

1. `mount | grep "cgroup type tmpfs"`를 실행하여 `cgroup` 디렉터리의 위치를 검색합니다.
1. 단일 단계 설치 명령에서 `/sys/fs/cgroup`의 첫 번째 항목을 `cgroup` 디렉터리의 위치로 바꿉니다.

### Custom Metrics 전송 {#send-custom-metrics-1}

DogStatsD를 사용하여 Custom Metrics를 전송하려면 다음 단계를 따르세요.
1. 설치 명령에 `-p 8125:8125/udp` 옵션을 추가합니다. 이렇게 하면 컨테이너의 StatsD 포트가 호스트의 IP 주소에 바인딩됩니다.
1. 호스트의 IP 주소로 UDP 패킷을 전송하도록 클라이언트 라이브러리를 구성합니다.

### Agent 구성 사용자 지정 {#customize-your-agent-configuration-1}

Agent 구성을 사용자 지정하려면 Agent 5 [docker-dd-agent][2] 리포지토리의 설명서를 참조하세요. Autodiscovery 구성을 조정하려면 [Docker Integrations Autodiscovery][3]를 참조하세요. Autodiscovery를 비활성화하려면 단일 단계 설치 명령에서 `SD_BACKEND` 환경 변수를 제거하세요.

[1]: https://github.com/DataDog/docker-dd-agent?tab=readme-ov-file#cgroups
[2]: https://github.com/DataDog/docker-dd-agent
[3]: https://docs.datadoghq.com/ko/containers/docker/integrations/?tabs=docker

{{% /tab %}}

{{% tab "CoreOS" %}}
CoreOS Container Linux 실행은 Docker 런타임으로 지원됩니다. 설치 지침은 [Docker][1]를 참조하세요.

Kubernetes에서 CoreOS Tectonic을 실행하려면 [Kubernetes][2]를 참조하세요.

[1]: ?tab=docker#cloud-and-containers
[2]: ?tab=kubernetes#cloud-and-containers

{{% /tab %}}

{{% tab "OpenShift" %}}
OpenShift에 Datadog을 설치하는 방법에 대한 정보는 [datadog-openshift][1] 리포지토리를 참조하세요.

[1]: https://github.com/DataDog/datadog-openshift

{{% /tab %}}

{{% tab "Cloud Foundry" %}}
<div class="alert alert-info">Datadog Agent BOSH 릴리스는 Ubuntu 및 Red Hat stemcell에서만 작동합니다.</a></div>

1. Datadog Agent 릴리스를 BOSH Director에 업로드합니다.

   ```shell
   # BOSH CLI v1
   bosh upload release https://cloudfoundry.datadoghq.com/datadog-agent/datadog-agent-boshrelease-latest.tgz

   # BOSH CLI v2
   bosh upload-release https://cloudfoundry.datadoghq.com/datadog-agent/datadog-agent-boshrelease-latest.tgz
   ```

2. 런타임 구성에서 Datadog을 애드온으로 구성합니다. `MY_API_KEY`를 사용자의 Datadog API 키로 바꿉니다.

   ```yaml
   # runtime.yml
   ---
   releases:
   - name: datadog-agent
      version: $UPLOADED_VERSION # e.g. 1.0.5140

   addons:
   - name: datadog
   jobs:
   - name: dd-agent
      release: datadog-agent
   properties:
      dd:
         use_dogstatsd: yes
         dogstatsd_port: 18125 # Many Cloud Foundry deployments have their own StatsD listening on port 8125
         api_key: MY_API_KEY
         tags: ["my-cloud-foundry-deployment"] # optional. Add any tags you wish
         # Optionally, enable any Agent Checks here
         # integrations:
         #   directory:
         #     init_config: {}
         #     instances:
         #       directory: "."
   ```

3. 사용자의 런타임 구성에 런타임을 추가합니다.

   ```shell
   # BOSH cli v1
   bosh update runtime-config runtime.yml

   # BOSH cli v2
   bosh update-runtime-config runtime.yml
   ```

4. 기존 배포를 재배포합니다.
   ```shell
   # BOSH cli v1
   bosh deployment myDeployment.yml
   bosh -n deploy

   # BOSH cli v2
   bosh -n -d myDeployment deploy myDeployment.yml
   ```

{{% /tab %}}

{{< /tabs >}}

## 구성 관리 {#configuration-management}

{{< tabs >}}
{{% tab "Ansible" %}}

<div class="alert alert-info">Datadog Ansible 컬렉션은 대부분의 Debian, RHEL 기반 및 SUSE 기반 Linux 배포판, macOS, Windows를 지원합니다.<br>Ansible 버전 2.10 이상이 필요합니다.</div>

### 전제 조건 {#prerequisites}

#### Windows {#windows-1}
Datadog Ansible 컬렉션을 사용하여 Windows 호스트를 관리하려면 먼저 `ansible.windows` 컬렉션을 설치해야 합니다.

```shell
ansible-galaxy collection install ansible.windows
```

#### openSUSE 및 SLES {#opensuse-and-sles}

Datadog Ansible 컬렉션을 사용하여 openSUSE/SLES 호스트를 관리하려면 먼저 `community.general` 컬렉션을 설치해야 합니다.

```shell
ansible-galaxy collection install community.general
```

### Datadog 설치 {#install-datadog}

1. Ansible 서버에 Ansible Galaxy의 Datadog Ansible 컬렉션을 설치합니다.
   ```shell
   ansible-galaxy collection install datadog.dd
   ```
   - Datadog Ansible 컬렉션은 Red Hat에서 공식 인증을 받은 [Red Hat Automation Hub][1]를 통해서도 제공됩니다.
   - 이 컬렉션은 설치하는 것이 좋습니다. 필요한 경우 [독립형 역할][2]을 사용하여 Datadog을 설치할 수도 있습니다.

2. 호스트에 Datadog Agent를 배포하려면 플레이북에 Datadog 역할과 API 키를 추가합니다. `MY_API_KEY`를 사용자의 Datadog API 키로 바꿉니다.
   ```yaml
   - hosts: servers
   tasks:
      - name: Import the Datadog Agent role from the Datadog collection
         import_role:
         name: datadog.dd.agent
   vars:
      datadog_api_key: "MY_API_KEY"
      datadog_agent_major_version: 5
   ```

   Agent가 호스트를 그룹화할 수 있도록 하려면 Datadog Agent가 추적 중인 노드 호스트 이름만 사용하세요. 다음 명령을 사용하여 Agent가 추적 중인 호스트 이름을 검사할 수 있습니다.

   ```shell
   service datadog-agent info
   ```

## 특정 Agent 검사 {#specific-agent-checks}

노드 중 하나에서 특정 Agent 검사 또는 통합을 사용하려면 `datadog_checks` 변수를 사용할 수 있습니다. 다음은 프로세스 검사의 예시입니다.

```yaml
- hosts: servers
  tasks:
    - name: Import the Datadog Agent role from the Datadog collection
      import_role:
        name: datadog.dd.agent
  vars:
    datadog_api_key: "MY_API_KEY"
    datadog_agent_major_version: 5
    datadog_checks:
      process:
        init_config:
        instances:
          - name: ssh
            search_string: ['ssh', 'sshd']
          - name: syslog
            search_string: ['rsyslog']
            cpu_check_interval: 0.2
            exact_match: true
            ignore_denied_access: true
```

[독립형 역할][3]에 대한 Github 리포지토리에서 Agent 역할 사용에 대한 더 많은 예시를 찾을 수 있습니다.

### 메트릭 및 이벤트 {#metrics-and-events}

Ansible 실행 후 Datadog에서 메트릭과 이벤트를 가져오려면 Ansible 콜백 프로젝트의 [Github 페이지][4]를 참조하세요.

[1]: https://console.redhat.com/ansible/automation-hub/repo/published/datadog/dd/
[2]: /ko/agent/guide/ansible_standalone_role/#ansible-role-versus-ansible-collection
[3]: https://github.com/DataDog/ansible-datadog/#role-variables
[4]: https://github.com/DataDog/ansible-datadog-callback

{{% /tab %}}
{{% tab "Puppet" %}}
<div class="alert alert-info">이 <code>datadog_agent</code> 모듈은 Linux 노드만 지원합니다.<br>Puppet Agent 버전 2.7 이상이 필요합니다.</a></div>

1. [Puppet Forge][1]의 `datadog_agent` 모듈을 Puppet 서버에 설치합니다.
   - 새로 설치하려면 `module install command`를 실행하세요.
     ```shell
     puppet module install datadog-datadog_agent
     ```
   - 모듈이 이미 설치되어 있으면 업그레이드하세요.
     ```shell
     puppet module upgrade datadog-datadog_agent
     ```

2. 노드에 Datadog Agent를 배포하려면 이 파라미터화된 클래스를 매니페스트에 추가합니다. `MY_API_KEY`를 사용자의 Datadog API 키로 바꿉니다.
   ```puppet
   node "db1.mydomain.com" {
      class { "datadog_agent":
         api_key => "MY_API_KEY"
      }
   }
   ```

   Agent가 호스트를 그룹화할 수 있도록 하려면 Datadog Agent가 추적 중인 노드 호스트 이름만 사용하세요. 다음 명령을 사용하여 Agent가 추적 중인 호스트 이름을 검사할 수 있습니다.

   ```shell
   service datadog-agent info
   ```

3. Puppet 서버에서 Datadog으로의 보고를 활성화합니다.
   1. `/etc/puppet/puppet.conf`에 다음 파라미터를 추가합니다.
      ```conf
      [master]
      report = true
      reports = datadog_reports
      pluginsync = true

      [agent]
      report = true
      pluginsync = true
      ```
   1. 매니페스트에서 Puppet 서버에 `puppet_run_reports` 옵션을 추가합니다. 예를 들면 다음과 같습니다.
      ```puppet
      node "puppet" {
         class { "datadog_agent":
            api_key            => "MY_API_KEY",
            puppet_run_reports => true
            }
      }
      ```
1. Puppet 서버에서 Puppet을 실행하여 필요한 모든 종속성을 설치합니다.
1. Puppet 서버를 다시 시작하여 Datadog에서 Puppet 데이터 수신을 시작합니다.

## 특정 Agent 검사 {#specific-agent-checks-1}

노드 중 하나에서 특정 Agent 검사를 사용하거나 통합을 사용하려면 관련 [통합 매니페스트][2]에서 코드 샘플을 확인하세요. 다음은 Elasticsearch 통합의 예시입니다.

```puppet
node "elastic-node1.mydomain.com" {
    class { "datadog_agent":
        api_key => ""
    }
    include "datadog_agent::integrations::elasticsearch"
}
```

[1]: https://forge.puppetlabs.com/modules/datadog/datadog_agent/readme
[2]: https://github.com/DataDog/puppet-datadog-agent/tree/main/manifests/integrations

{{% /tab %}}

{{% tab "Chef" %}}

<div class="alert alert-info">Chef 버전 10.14.x 이상이 필요합니다.</a></div>

1. Datadog 쿡북을 추가합니다.
   - [Berkshelf][1]를 사용하는 경우 Berksfile에 쿡북을 추가합니다.
      ```shell
      cookbook 'datadog'
      ```

   - Berkshelf를 사용하지 않는 경우 Knife를 사용하여 리포지토리에 쿡북을 설치합니다.
     ```shell
     knife cookbook site install datadog 
     ```

1. 역할, 환경 또는 다른 레시피 중 하나에 Datadog 관련 속성을 설정합니다. `MY_API_KEY`를 사용자의 Datadog API 키로 바꿉니다.
   ```chef
   node.default['datadog']['api_key'] = "MY_API_KEY"
   # Use an existing application key or create a new one for Chef
   node.default['datadog']['application_key'] = "Generate Application Key"
   ```

1. 업데이트된 쿡북을 Chef 서버에 업로드합니다.
   ```shell
   berks upload
   # or
   knife cookbook upload datadog
   knife cookbook list | grep datadog && 
   echo -e "e[0;32mdatadog cookbook - OKe[0m" ||
   echo -e "e[0;31mmissing datadog cookbook - OKe[0m"
   ```

1. 노드의 `run_list` 또는 `role`에 쿡북을 추가합니다.
   ```chef
   "run_list": [
    "recipe[datadog::dd-agent]"
   ]
   ```

1. 예약된 다음 `chef-client` 실행을 기다립니다.

[1]: https://docs.chef.io/workstation/berkshelf/

{{% /tab %}}

{{% tab "SaltStack" %}}

<div class="alert alert-info">Datadog Saltstack 수식은 Debian 기반 및 RedHat 기반 시스템만 지원합니다.<br><br>
다음 지침은 기본 Salt 환경에 Datadog 수식을 추가합니다. 다른 Salt 환경에 추가하려면 <code>base</code> 에 대한 참조를 Salt 환경의 이름으로 바꾸세요.</div>

<!-- vale Datadog.inclusive = NO -->

### `gitfs_remotes` {#install-using-gitfs-remotes}를 사용하여 설치
1. Salt Master 구성 파일(기본값 `/etc/salt/master`)의 `gitfs_remotes` 옵션을 사용하여 Salt Master 노드의 기본 환경에 [Datadog 수식][1]을 설치합니다.
   ```yaml
   fileserver_backend:
   - roots # Active by default, necessary to be able to use the local salt files we define in the next steps
   - gitfs # Adds gitfs as a fileserver backend to be able to use gitfs_remotes

   gitfs_remotes:
   - https://github.com/DataDog/datadog-formula.git:
     - saltenv:
       - base:
       - ref: 3.0 # Pin here the version of the formula you want to use
   ```

1. Salt Master 서비스를 다시 시작합니다.
   ```shell
   systemctl restart salt-master
   ```
   또는 
   ```shell
   service salt-master restart
   ```

### Datadog 수식을 복제하여 설치 {#install-by-cloning-the-datadog-formula}

1. Salt Master 노드에서 [Datadog 수식][1]을 복제합니다.
   ```shell
   mkdir -p /srv/formulas && cd /srv/formulas git clone https://github.com/DataDog/datadog-formula.git
   ```
1. 복제한 수식을 Salt Master 구성 파일(기본값: `/etc/salt/master`)의 `file_roots`에서 기본 환경에 추가합니다.
   ```yaml
   file_roots:
     base:
       - /srv/salt/
       - /srv/formulas/datadog-formula/
   ```

## 호스트에 Agent 배포 {#deploy-the-agent-to-your-hosts}

1. 상위 파일(기본값 `/srv/salt/top.sls`)에 Datadog 수식을 추가합니다.
   ```yaml
   base:
     '*':
       - datadog
   ```

1. pillar 디렉터리(기본값 `/srv/pillar/`)에 `datadog.sls` pillar 파일을 추가하고 API 키를 추가합니다. `MY_API_KEY`를 사용자의 Datadog API 키로 바꿉니다.
   ```yaml
   datadog:
     config:
       api_key: MY_API_KEY
     install_settings:
       agent_version: <AGENT5_VERSION>
   ```

1. `datadog.sls` pillar 파일을 최상위 pillar 파일(기본값 `/srv/pillar/top.sls`)에 추가합니다.
   ```yaml
   base:
     '*':
       - datadog
   ```

1. 호스트 중 하나에서 특정 Agent 검사를 실행하거나 통합을 사용하려면 checks 변수를 사용할 수 있습니다. 다음은 디렉터리 통합에 대한 예시입니다.
   ```yaml
   datadog:
     config:
       api_key: MY_API_KEY
     install_settings:
       agent_version: <AGENT5_VERSION>
     checks:
       directory:
         config:
           instances:
             - directory: "/srv/pillar"
               name: "pillars"
   ```         

로그 구성, 검사 예시 및 고급 사용 사례는 formula의 [Github 리포지토리][1]를 참조하세요.
<!-- vale Datadog.inclusive = YES -->
[1]: https://github.com/DataDog/datadog-formula
{{% /tab %}}

{{< /tabs >}}

## 소스에서 설치 {#install-from-source}

<div class="alert alert-info">Linux에서 Datadog Agent에는 Python 2.7과 <code>sysstat</code> 가 필요합니다.</div>

단일 단계 소스 설치 스크립트를 사용하고 `MY_API_KEY`를 사용자의 Datadog API 키로 바꿉니다.

```shell
DD_API_KEY=MY_API_KEY sh -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/setup_agent.sh)"
``` 

이 스크립트는 Agent를 `~/.datadog-agent`에 있는 독립적인 샌드박스에 설치합니다.

설치를 영구적으로 유지하려면 `$sandbox_dir`을 현재 작업 디렉터리로 설정한 상태에서 `$sandbox_dir/bin/agent`를 실행하도록 `init` 데몬을 설정하세요. 샌드박스 디렉터리는 이식 가능하며 파일 시스템의 어느 위치에서나 실행할 수 있습니다. 샌드박스 디렉터리는 기본적으로 `~/.datadog-agent`로 설정되어 있습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[2]: /ko/agent/versions/upgrade_to_agent_v7/
[3]: https://install.datadoghq.com/datadog-agent-5.11.3-1.dmg
[4]: https://s3.amazonaws.com/ddagent-windows-stable/ddagent-cli-latest.msi
[5]: https://s3.amazonaws.com/ddagent-windows-stable/ddagent-32bit-cli.msi
[6]: https://s3.amazonaws.com/ddagent-windows-stable/installers.json
[7]: https://s3.amazonaws.com/ddagent-windows-stable/ddagent-cli-latest.exe
[8]: /ko/integrations/azure/
[9]: https://github.com/DataDog/dd-agent/wiki/Windows-Agent-Installation