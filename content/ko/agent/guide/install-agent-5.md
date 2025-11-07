---
further_reading:
- link: /agent/basic_agent_usage/
  tag: 설명서
  text: 에이전트 기본 사용량
private: true
title: Datadog 에이전트 5 설치
---

본 가이드에서는 Agent 5 설치에 관해 알아봅니다. Datadog의 최신 기능을 사용하려면 Agent 7을 설치하거나 업그레이드할 것을 권장합니다. 최신 버전의 Agent 설치에 관한 자세한 내용은 [Agent 7 설치 지침][1]을 따르세요. 이전 버전에서 Agent 7로 업그레이드하는 방법은 [Datadog Agent v7로 업그레이드][2]를 참고하세요.

## macOS

### 에이전트 설치

#### 명령줄

다음 명령을 실행하여 `MY_API_KEY`를 Datadog API 키로 바꿉니다.
{{< code-block lang="shell" >}}
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/osx/install.sh)"
{{< /code-block >}}

Agent를 관리하려면 `datadog-agent` 명령을 사용합니다. 기본적으로 `datadog-agent` 바이너리는 `/usr/local/bin`에 위치합니다. `/opt/datadog-agent/etc/conf.d`에서 통합을 활성화하거나 비활성화합니다.

#### GUI

1. [DMG 패키지[3]를 다운로드하고 설치합니다.
1. `/opt/datadog-agent/etc/datadog.conf`에 다음 줄을 추가하고 `MY_API_KEY`를 Datadog API 키로 바꿉니다.
   {{< code-block lang="shell" >}}
api_key:MY_API_KEY
{{< /code-block >}}

Agent를 관리하려면 시스템 트레이에서 Datadog Agent 앱을 사용합니다. `/opt/datadog-agent/etc/conf.d`에서 통합을 활성화하거나 비활성화합니다.

### Agent 실행 동작

기본적으로 로그인 시 Agent가 실행됩니다. 시스템 트레이에서 Datadog Agent 앱으로 이를 비활성화할 수 있습니다. 부팅 시 Agent를 실행하려면 다음 명령을 사용합니다.
{{< code-block lang="shell" >}}
sudo cp '/opt/datadog-agent/etc/com.datadoghq.agent.plist' /Library/LaunchDaemons
sudo launchctl load -w /Library/LaunchDaemons/com.datadoghq.agent.plist
{{< /code-block >}}

### 설치 제거

1. 트레이에서 뼈 모양 아이콘이 있는 Datadog 에이전트를 중지한 후 종료합니다.
1. Datadog 애플리케이션을 애플리케이션 폴더에서 휴지통으로 드래그합니다.
1. 실행:

   ```shell
   sudo rm -rf /opt/datadog-agent
   sudo rm -rf /usr/local/bin/datadog-agent
   sudo rm -rf ~/.datadog-agent/** # to remove broken symlinks
   ```

옵션 설치 명령을 실행하여 부팅 시 Agent를 실행하는 경우, 다음을 실행하여 제거를 완료합니다.

```shell
sudo launchctl unload -w /Library/LaunchDaemons/com.datadoghq.agent.plist
sudo rm /Library/LaunchDaemons/com.datadoghq.agent.plist
```

## 윈도우즈(Windows)

### 에이전트 설치

#### GUI

Datadog Agent 인스톨러를 다운로드하여 실행합니다.
- [64비트 인스톨러][4].
- [32비트 인스톨러][5]. 32비트 설치는 Agent 버전 5.10.1까지만 지원됩니다.

사용 가능한 모든 버전의 Windows 설치 프로그램 링크는 [JSON 형식으로 제공됩니다][6].

#### 명령줄

1. Agent 다운로드
   - 새로 설치하려면 [Datadog Agent 인스톨러][4]를 다운로드합니다.
   - Datadog Agent 5.12.0 미만 버전에서 업그레이드하는 경우 [EXE 설치 메서드][7]를 사용합니다.
1. 인스톨러를 다운로드한 디렉터리의 `cmd.exe` 셸에서 다음 명령을 실행합니다. `MY_API_KEY`를 Datadog API 키로 바꿉니다.
   {{< code-block lang="shell" >}}
start /wait msiexec /qn /i ddagent-cli-latest.msi APIKEY="MY_API_KEY"
{{< /code-block >}}
   옵션으로 `TAG` 및 `HOSTNAME` 값을 추가합니다.

#### Azure에 배포

Azure에 Agent를 설치하려면 [Microsoft Azure 설명서][8]를 따르세요.

### 5.12 버전 신규 업그레이드 절차

5.12 이전 버전 Windows Agent를 실행하는 기존 고객의 경우, 장치를 업그레이드하는 데 추가 단계가 필요할 수 있습니다. 특히 최신 Agent는 ''머신별' 설치 방식입니다. 이전 버전의 Agent는 기본적으로 '사용자별' 설치 방식이었습니다. 아울러, Chef로 배포하는 경우 추가 단계가 필요할 수 있습니다. 자세한 내용은 [Windows Agent 설치][9]를 참조하세요.

### 설치 제거

Windows에서 Agent를 제거하는 방법에는 두 가지가 있습니다. 두 가지 방법 모두 Agent를 제거하지만 호스트의 `C:\ProgramData\Datadog` 구성 폴더는 제거하지 않습니다.

**참고**: Agent v5.12.0 미만인 경우, Agent를 설치하는 데 사용한 **원본 계정**으로 Agent를 삭제하는 것이 중요합니다. 그렇지 않으면 완전히 삭제되지 않을 수도 있습니다.

### 프로그램 추가 또는 제거

1. **CTRL** 및 **Esc**를 누르거나 Windows 키를 사용하여 Windows Search를 실행합니다.
1. `add`를 검색하고 **Add or remove programs**를 클릭합니다.
1. `Datadog Agent`를 검색하고 **Uninstall**를 클릭합니다.

### PowerShell

**참고:** 아래 명령을 사용하려면 WinRM을 활성화하세요.

재부팅하지 않고 Agent를 제거하려면 다음 PowerShell 명령을 사용합니다.

```powershell
start-process msiexec -Wait -ArgumentList ('/log', 'C:\uninst.log', '/norestart', '/q', '/x', (Get-CimInstance -ClassName Win32_Product -Filter "Name='Datadog Agent'" -ComputerName .).IdentifyingNumber)
```

## Linux 및 Unix

{{< tabs >}}

{{% tab "Debian" %}}
### 원스텝 설치

원스텝 명령은 Datadog Agent용 APT 패키지를 설치하고 비밀번호를 묻는 메시지를 표시합니다. Agent가 시스템에 아직 설치되어 있지 않고 설치 후 자동으로 시작되지 않도록 하려면 Agent를 실행하기 전에 `DD_INSTALL_ONLY=true`를 명령 앞에 추가하세요.

`MY_API_KEY`를 Datadog API 키로 바꿔서 다음 명령을 실행합니다.
```shell
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh)"
```

### 단계별 설치

1. HTTPS를 통해 다운로드하고 `curl`과 `gnupg`를 설치할 수 있도록 APT를 설정합니다.
   ```shell
   sudo apt-get update
   sudo apt-get install apt-transport-https curl gnupg
   ```
1. 시스템에 Datadog Debian 리포지토리를 설정하고 Datadog 아카이브 키링을 만듭니다.
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
1. Debian 8 이하를 실행하는 경우 키링을 `/etc/apt/trusted.gpg.d`에 복사하세요.
   ```shell
   sudo cp -a /usr/share/keyrings/datadog-archive-keyring.gpg /etc/apt/trusted.gpg.d/
   ```

1. 로컬 APT 리포지토리를 업데이트하고 Agent를 설치합니다.
   ```shell
   sudo apt-get update
   sudo apt-get install datadog-agent datadog-signing-keys
   ```

1. 다음 명령을 실행하여 예시 구성을 헤당 위치에 복사합니다. `MY_API_KEY`를 Datadog API 키로 바꿉니다.
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key:MY_API_KEY /' /etc/dd-agent/datadog.conf.example > /etc/dd-agent/datadog.conf"
   ```

1. Agent를 시작합니다.
   ```shell
   sudo /etc/init.d/datadog-agent start
   ```

{{% /tab %}}

{{% tab "Ubuntu" %}}
### 원스텝 설치

원스텝 명령은 Datadog Agent용 APT 패키지를 설치하고 비밀번호를 묻는 메시지를 표시합니다. Agent가 시스템에 아직 설치되어 있지 않고 설치 후 자동으로 시작되지 않도록 하려면 Agent를 실행하기 전에 `DD_INSTALL_ONLY=true`를 명령 앞에 추가하세요.

`MY_API_KEY`를 Datadog API 키로 바꿔서 다음 명령을 실행합니다.
```shell
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh)"
```

### 단계별 설치

1. HTTPS를 통해 다운로드하고 `curl`과 `gnupg`를 설치할 수 있도록 APT를 설정합니다.
   ```shell
   sudo apt-get update
   sudo apt-get install apt-transport-https curl gnupg
   ```
1. 시스템에 Datadog Debian 리포지토리를 설정하고 Datadog 아카이브 키링을 만듭니다.
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
1. Debian 8 이하를 실행하는 경우 키링을 `/etc/apt/trusted.gpg.d`에 복사하세요.
   ```shell
   sudo cp -a /usr/share/keyrings/datadog-archive-keyring.gpg /etc/apt/trusted.gpg.d/
   ```

1. 로컬 APT 리포지토리를 업데이트하고 Agent를 설치합니다.
   ```shell
   sudo apt-get update
   sudo apt-get install datadog-agent datadog-signing-keys
   ```

1. 다음 명령을 실행하여 예제 구성을 복사합니다. `MY_API_KEY`를 Datadog API 키로 바꿉니다.
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key:MY_API_KEY /' /etc/dd-agent/datadog.conf.example > /etc/dd-agent/datadog.conf"
   ```

1. Agent를 시작합니다.
   ```shell
   sudo /etc/init.d/datadog-agent start
   ```

### 설치 제거

에이전트를 삭제하려면 다음 명령을 실행합니다.

```shell
sudo apt-get remove datadog-agent -y
```

이 명령어를 사용하면 Agent가 삭제되나, 다음은 삭제되지 않습니다.

* `datadog.yaml` 설정 파일
* `/etc/dd-agent` 설정 폴더에 있는 사용자 생성 파일
* `/opt/datadog-agent` 폴더에서 사용자가 생성한 파일
* `dd-agent` 사용자
* Datadog 로그 파일

이들 요소도 제거하려면 에이전트 제거 후 이 명령을 실행합니다.

```shell
sudo apt-get --purge remove datadog-agent -y
```

{{% /tab %}}

{{% tab "Amazon Linux" %}}
### 원스텝 설치

원스텝 명령은 Datadog Agent용 YUM 패키지를 설치하고 비밀번호를 묻는 메시지를 표시합니다. Agent가 시스템에 아직 설치되어 있지 않고 설치 후 자동으로 시작되지 않도록 하려면, Agent를 실행하기 전에 `DD_INSTALL_ONLY=true`를 명령 앞에 추가하세요.

`MY_API_KEY`를 Datadog API 키로 바꿔서 다음 명령을 실행합니다.
```shell
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh)"
```

### 단계별 설치

1. 다음에 따라 `/etc/yum.repos.d/datadog.repo`를 생성해 Datadog YUM 리포지토리를 구성합니다.
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

   **참고**: i386/i686 아키텍처의 경우 "x86_64"를 "i386"로 변경하세요.

1. 로컬 Yum 저장소를 업데이트하고 Agent를 설치하세요.
   ```shell
   sudo yum makecache
   sudo yum install datadog-agent
   ```
1. 예시 구성을 해당 위치에 복사합니다. `MY_API_KEY`를 Datadog API 키로 바꿉니다.
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key:MY_API_KEY /' /etc/dd-agent/datadog.conf.example > /etc/dd-agent/datadog.conf"
   ```

1. Agent를 재시작합니다.
   ```shell
   sudo /etc/init.d/datadog-agent restart
   ```


### 설치 제거

에이전트를 삭제하려면 다음 명령을 실행합니다.

```shell
sudo yum remove datadog-agent
```

이 명령어를 사용하면 Agent가 삭제되나, 다음은 삭제되지 않습니다.

* `datadog.yaml` 설정 파일
* `/etc/dd-agent` 설정 폴더에 있는 사용자 생성 파일
* `/opt/datadog-agent` 폴더에서 사용자가 생성한 파일
* `dd-agent` 사용자
* Datadog 로그 파일

이들 요소도 제거하려면 에이전트 제거 후 이 명령을 실행합니다.

```shell
sudo userdel dd-agent \
&& sudo rm -rf /opt/datadog-agent/ \
&& sudo rm -rf /etc/dd-agent/ \
&& sudo rm -rf /var/log/datadog/
```
{{% /tab %}}

{{% tab "CentOS and Red Hat" %}}
### 원스텝 설치

원스텝 명령은 Datadog Agent용 YUM 패키지를 설치하고 비밀번호를 묻는 메시지를 표시합니다. Agent가 시스템에 아직 설치되어 있지 않고 설치 후 자동으로 시작되지 않도록 하려면, Agent를 실행하기 전에 `DD_INSTALL_ONLY=true`를 명령 앞에 추가하세요.

`MY_API_KEY`를 Datadog API 키로 바꿔서 다음 명령을 실행합니다.
```shell
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh)"
```

### 단계별 설치

1. 다음에 따라 `/etc/yum.repos.d/datadog.repo`를 생성해 Datadog YUM 리포지토리를 구성합니다.
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

   **참고**: i386/i686 아키텍처의 경우 "x86_64"를 "i386"로 변경하세요.

1. 로컬 YUM 리포지토리를 업데이트하고 Agent를 설치합니다.
   ```shell
   sudo yum makecache
   sudo yum remove datadog-agent-base 
   sudo yum install datadog-agent
   ```
1. 예시 구성을 헤당 위치에 복사합니다. `MY_API_KEY`를 Datadog API 키로 바꿉니다.
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key:MY_API_KEY /' /etc/dd-agent/datadog.conf.example > /etc/dd-agent/datadog.conf"
   ```

1. Agent를 재시작합니다.
   ```shell
   sudo /etc/init.d/datadog-agent restart
   ```

### 설치 제거

에이전트를 삭제하려면 다음 명령을 실행합니다.

```shell
sudo yum remove datadog-agent
```

이 명령어를 사용하면 Agent가 삭제되나, 다음은 삭제되지 않습니다.

* `datadog.yaml` 설정 파일
* `/etc/dd-agent` 설정 폴더에 있는 사용자 생성 파일
* `/opt/datadog-agent` 폴더에서 사용자가 생성한 파일
* `dd-agent` 사용자
* Datadog 로그 파일

이들 요소도 제거하려면 에이전트 제거 후 이 명령을 실행합니다.

```shell
sudo userdel dd-agent \
&& sudo rm -rf /opt/datadog-agent/ \
&& sudo rm -rf /etc/dd-agent/ \
&& sudo rm -rf /var/log/datadog/
```

{{% /tab %}}

{{% tab "Fedora" %}}
### 원스텝 설치

원스텝 명령은 Datadog Agent용 YUM 패키지를 설치하고 비밀번호를 묻는 메시지를 표시합니다. Agent가 시스템에 아직 설치되어 있지 않고 설치 후 자동으로 시작되지 않도록 하려면, Agent를 실행하기 전에 `DD_INSTALL_ONLY=true`를 명령 앞에 추가하세요.

`MY_API_KEY`를 Datadog API 키로 바꿔서 다음 명령을 실행합니다.
```shell
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh)"
```

### 단계별 설치

1. 다음에 따라 `/etc/yum.repos.d/datadog.repo`를 생성해 Datadog YUM 리포지토리를 구성합니다.
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

   **참고**: i386/i686 아키텍처의 경우 "x86_64"를 "i386"로 변경하세요.

1. 로컬 YUM 리포지토리를 업데이트하고 Agent를 설치합니다.
   ```shell
   sudo yum makecache
   sudo yum install datadog-agent
   ```
1. 예시 구성을 헤당 위치에 복사합니다. `MY_API_KEY`를 Datadog API 키로 바꿉니다.
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key:MY_API_KEY /' /etc/dd-agent/datadog.conf.example > /etc/dd-agent/datadog.conf"
   ```

1. Agent를 재시작합니다.
   ```shell
   sudo /etc/init.d/datadog-agent restart
   ```

### 설치 제거

에이전트를 삭제하려면 다음 명령을 실행합니다.

```shell
sudo yum remove datadog-agent
```

이 명령어를 사용하면 Agent가 삭제되나, 다음은 삭제되지 않습니다.

* `datadog.yaml` 설정 파일
* `/etc/dd-agent` 설정 폴더에 있는 사용자 생성 파일
* `/opt/datadog-agent` 폴더에서 사용자가 생성한 파일
* `dd-agent` 사용자
* Datadog 로그 파일

이들 요소도 제거하려면 에이전트 제거 후 이 명령을 실행합니다.

```shell
sudo userdel dd-agent \
&& sudo rm -rf /opt/datadog-agent/ \
&& sudo rm -rf /etc/dd-agent/ \
&& sudo rm -rf /var/log/datadog/
```

{{% /tab %}}

{{% tab "Suse" %}}
### 원스텝 설치

원스텝 명령은 Datadog Agent용 YUM 패키지를 설치하고 비밀번호를 묻는 메시지를 표시합니다. Agent가 시스템에 아직 설치되어 있지 않고 설치 후 자동으로 시작되지 않도록 하려면, Agent를 실행하기 전에 `DD_INSTALL_ONLY=true`를 명령 앞에 추가하세요.

`MY_API_KEY`를 Datadog API 키로 바꿔서 다음 명령을 실행합니다.
```shell
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh)"
```

### 단계별 설치

1. 다음에 따라 `/etc/yum.repos.d/datadog.repo`를 생성해 Datadog YUM 리포지토리를 구성합니다.
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

1. 로컬 Zypper 리포지토리를 업데이트하고 Agent를 설치합니다.
   ```shell
   sudo zypper refresh
   sudo zypper install datadog-agent
   ```
1. 예시 구성을 헤당 위치에 복사합니다. `MY_API_KEY`를 Datadog API 키로 바꿉니다.
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key: MY_API_KEY/' /etc/dd-agent/datadog.conf.example > /etc/dd-agent/datadog.conf"
   ```

1. Agent를 재시작합니다.
   ```shell
   sudo /etc/init.d/datadog-agent restart
   ```

### 설치 제거

에이전트를 삭제하려면 다음 명령을 실행합니다.

```shell
sudo zypper remove datadog-agent
```

이 명령어를 사용하면 Agent가 삭제되나, 다음은 삭제되지 않습니다.
* `datadog.yaml` 설정 파일
* `/etc/dd-agent` 설정 폴더에 있는 사용자 생성 파일
* `/opt/datadog-agent` 폴더에서 사용자가 생성한 파일
* `dd-agent` 사용자
* Datadog 로그 파일

이들 요소도 제거하려면 에이전트 제거 후 이 명령을 실행합니다.

```shell
sudo userdel dd-agent \
&& sudo rm -rf /opt/datadog-agent/ \
&& sudo rm -rf /etc/dd-agent/ \
&& sudo rm -rf /var/log/datadog/
```


{{% /tab %}}

{{% tab "AIX" %}}
### 원스텝 설치

원스텝 명령은 Datadog Agent용 최신 BFF 패키지를 설치하고 필요 시 비밀번호를 묻는 메시지를 표시합니다. Agent가 시스템에 아직 설치되어 있지 않고 설치 후 자동으로 시작되지 않도록 하려면, Agent를 실행하기 전에 `DD_INSTALL_ONLY=true`를 명령 앞에 추가하세요.

`MY_API_KEY`를 Datadog API 키로 바꿔서 다음 명령을 실행합니다.
```shell
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh)"
```

### 이전 설치에서 업그레이드

기존 구성을 유지하면서 Agent를 설치하려면 다음 명령을 실행합니다.
```shell
DD_UPGRADE=true ksh -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-unix-agent/master/scripts/install_script.sh)"
```

사용 가능한 설치 스크립트 환경 변수의 전체 목록은 [AIX용 기본 Agent 사용법][1]을 참조하세요.

### 단계별 설치

1. [datadog-unix-agent][2] 리포지토리 릴리스에서 선호하는 BFF를 다운로드하세요.
1. `installp`로 루트 권한으로 아티팩트를 설치합니다.
   ```shell
   installp -aXYgd datadog-unix-agent-latest.powerpc.aix..bff datadog-unix-agent
   ```
1. 기존 구성 파일이 없는 경우 예시 구성을 해당 위치에 복사합니다. `MY_API_KEY`를 Datadog API 키로 바꿉니다.
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key: MY_API_KEY/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
   ```
1. Datadog Agent에 올바른 권한이 있는지 확인합니다.
   ```shell
   sudo sh -c "chown dd-agent:dd-agent /etc/datadog-agent/datadog.yaml && chmod 660 /etc/datadog-agent/datadog.yaml"
   ```
1. 서비스형 Agent를 중지합니다.
   ```shell
   sudo stopsrc -s datadog-agent
   ```
1. 서비스형 Agent가 중지되었는지 확인합니다.
   ```
   sudo lssrc -s datadog-agent
   ```
1. 서비스형 Agent를 재시작합니다.
   ```shell
   sudo startsrc -s datadog-agent
   ```

### 설치 제거

에이전트를 삭제하려면 다음 명령을 실행합니다.

설치된 에이전트를 제거하려면 다음 `installp` 명령을 실행하세요.

```shell
installp -e dd-aix-uninstall.log -uv datadog-unix-agent
```

참고: 에이전트 설치 제거 로그는 `dd-aix-install.log` 파일에서 찾을 수 있습니다. 이 로깅을 비활성화하려면 설치 제거 명령에서 '-e' 매개변수를 제거하세요.

[1]: /ko/agent/basic_agent_usage/aix/#installation
[2]: https://github.com/DataDog/datadog-unix-agent/releases
{{% /tab %}}

{{< /tabs >}}

## 클라우드 및 컨테이너

{{< tabs >}}
{{% tab "쿠버네티스" %}}
## 에이전트 설치
### DaemonSets로 설치

Kubernetes 버전 1.1.0 이하를 실행하는 경우, [DaemonSets][1]를 활용하여 Datadog Agent를 모든 노드에 자동 배포할 수 있습니다.

1. API 키가 포함된 시크릿을 생성합니다. 해당 시크릿은 Datadog Agent 배포를 위한 매니페스트에서 사용됩니다. `MY_API_KEY`를 Datadog API 키로 바꿉니다.
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

1. DaemonSet을 배포합니다.
   ```shell
   kubectl create -f dd-agent.yaml
   ```

<div class="alert alert-info">해당 매니페스트는 Autodiscovery 자동 구성 기능을 활성화합니다. 자동 구성을 비활성화하려면 <code>SD_BACKEND</code> 환경 변수 정의를 삭제합니다. Autodiscovery를 구성하는 방법을 알아보려면 <a href="https://docs.datadoghq.com/containers/kubernetes/integrations/?tab=kubernetesadv2">Kubernetes 통합 Autodiscovery</a>를 참조하세요.</div>

### Docker 컨테이너로 Agent 실행

Kubernetes 1.1.0 이상 버전을 실행하지 않거나 DaemonSets를 사용하지 않으려면, 모니터링하려는 각 노드에서 Agent를 Docker 컨테이너로 실행합니다. 다음 명령을 실행하여 `MY_API_KEY`를 Datadog API 키로 바꿉니다.

```shell
docker run -d --name dd-agent -h `hostname` -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro -e API_KEY=MY_API_KEY -e KUBERNETES=yes -e SD_BACKEND=docker gcr.io/datadoghq/docker-dd-agent:latest
```

## 커스텀 메트릭 전송하기

DogStatsD를 사용해 [커스텀 메트릭][2]을 전송하려는 경우
1. 매니페스트의 `ports` 섹션에 `hostPort`를 추가하여 컨테이너의 StatsD 포트를 노드의 IP 주소에 바인딩합니다.
   ```yaml
   ports:
     - containerPort: 8125
       hostPort: 8125
       name: dogstatsdport
       protocol: UDP
   ```

1. 클라이언트 라이브러리가 노드의 IP로 UDP 패킷을 전송하도록 구성합니다. 브리지 네트워킹을 사용하는 경우 애플리케이션 컨테이너의 기본 게이트웨이는 노드의 IP와 일치합니다. 하향 API로 노드의 호스트 이름을 환경 변수로 노출할 수도 있습니다.

## Agent 구성 커스텀하기

Agent 구성을 커스텀하려면 Agent 5 [docker-dd-agent][3] 리포지토리의 문서를 참조하세요. Autodiscovery 구성을 조정하려면 [Kubernetes 통합 Autodiscovery][4]를 참조하세요. Autodiscovery를 비활성화하려면 매니페스트에서 `SD_BACKEND` 환경 변수를 삭제하세요.

메트릭 수집, 서비스 점검, 이벤트에 대한 자세한 내용은 [Kubernetes 통합][5] 문서를 참조하세요.

[1]: https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/
[2]: /ko/metrics/custom_metrics
[3]: https://github.com/DataDog/docker-dd-agent
[4]: /ko/containers/kubernetes/integrations/?tab=kubernetesadv2
[5]: /ko/integrations/kubernetes/

{{% /tab %}}

{{% tab "Docker" %}}
### 원스텝 설치

원스텝 설치는 Datadog Agent가 내장된 Docker 컨테이너를 실행하여 호스트를 모니터링합니다. Docker 통합은 기본적으로 활성화되며, 자동 구성 모드에서는 autodiscovery도 활성화됩니다. autodiscovery를 비활성화하려면 원스텝 설치 명령에서 `SD_BACKEND` 변수를 삭제하세요.

#### Amazon Linux
`MY_API_KEY`를 Datadog API 키로 바꿔서 다음 명령을 실행합니다.
```shell
docker run -d --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /cgroup/:/host/sys/fs/cgroup:ro -e API_KEY=MY_API_KEY -e SD_BACKEND=docker gcr.io/datadoghq/docker-dd-agent:latest
```

#### 기타 운영체제
`MY_API_KEY`를 Datadog API 키로 바꿔서 다음 명령을 실행합니다.
```shell
docker run -d --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro -e API_KEY=MY_API_KEY -e SD_BACKEND=docker gcr.io/datadoghq/docker-dd-agent:latest
```

#### 트러블슈팅

원스텝 설치 명령이 작동하지 않을 경우에는 시스템이 `cgroup` 디렉터리를 예상치 못한 위치에 마운트했거나, 메모리 관리에 CGroup을 사용하지 않기 때문일 수 있습니다. Docker 점검을 성공적으로 실행하려면 CGroup이 필요합니다. CGroup을 활성화하려면 [docker-dd-agent][1] 리포지토리의 문서를 참조하세요. 예상치 못한 `cgroup` 디렉터리 위치로 인해 점검에 실패하는 경우는 다음을 참고하세요.

1. `mount | grep "cgroup type tmpfs"`를 실행해 `cgroup` 디렉터리 위치를 불러옵니다.
1. 원스텝 설치 명령에서 나오는 첫 번째 `/sys/fs/cgroup`를 `cgroup` 디렉터리 위치로 변경합니다.

### 커스텀 메트릭 전송하기

DogStatsD를 사용해 커스텀 메트릭을 전송하는 방법
1. 설치 명령에 `-p 8125:8125/udp` 옵션을 추가합니다. 이렇게 하면 컨테이너의 StatsD 포트가 호스트 IP 주소에 바인딩됩니다.
1. 클라이언트 라이브러리를 구성하여 호스트 IP 주소로 UDP 패킷을 전송합니다.

### Agent 구성 커스텀하기

Agent 구성을 커스텀하려면 Agent 5 [docker-dd-agent][2] 리포지토리의 문서를 참조하세요. Autodiscovery 구성을 조정하려면 [Docker 통합 Autodiscovery][3]를 참조하세요. Autodiscovery를 비활성화하려면 원스텝 설치 명령에서 `SD_BACKEND` 환경 변수를 삭제하세요.

[1]: https://github.com/DataDog/docker-dd-agent?tab=readme-ov-file#cgroups
[2]: https://github.com/DataDog/docker-dd-agent
[3]: https://docs.datadoghq.com/ko/containers/docker/integrations/?tabs=docker

{{% /tab %}}

{{% tab "CoreOS" %}}
CoreOS Container Linux는 Docker 런타임 실행이 지원됩니다. 설치 방법은 [Docker][1] 문서를 참고하세요.

Kubernetes에서 CoreOS Tectonic을 실행하려면 [Kubernetes][2]를 참조하세요.

[1]: ?tab=docker#cloud-and-containers
[2]: ?tab=kubernetes#cloud-and-containers

{{% /tab %}}

{{% tab "OpenShift" %}}
Datadog을 OpenShift에 설치하는 방법에 관한 내용은 [datadog-openshift][1] 리포지토리를 참조하세요.

[1]: https://github.com/DataDog/datadog-openshift

{{% /tab %}}

{{% tab "Cloud Foundry" %}}
<div class="alert alert-info">Datadog Agent BOSH 릴리스는 Ubuntu 및 Red Hat 스템셀에서만 작동합니다.</a></div>

1. BOSH Director에 Datadog Agent 릴리스 업로드

   ```shell
   # BOSH CLI v1
   bosh upload release https://cloudfoundry.datadoghq.com/datadog-agent/datadog-agent-boshrelease-latest.tgz

   # BOSH CLI v2
   bosh upload-release https://cloudfoundry.datadoghq.com/datadog-agent/datadog-agent-boshrelease-latest.tgz
   ```

2. 런타임 구성에서 Datadog을 애드온으로 구성합니다. `MY_API_KEY`를 Datadog API 키로 바꿉니다.

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

3. 런타임 구성에 런타임을 추가합니다.

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

## 설정 관리

{{< tabs >}}
{{% tab "Ansible" %}}

<div class="alert alert-info">Datadog Ansible Collection은 대부분의 Debian, RHEL 기반 및 SUSE 기반 Linux 배포, macOS, Windows를 지원합니다.<br>Ansible 버전 2.10 이상이 필요합니다.</div>

### 사전 필수 조건

#### 윈도우즈(Windows)
Datadog Ansible Collection으로 Windows 호스트를 관리하려면 먼저 `ansible.windows` 컬렉션을 설치합니다.
```shell
ansible-galaxy collection install ansible.windows
```

#### openSUSE 및 SLES

Datadog Ansible Collection으로 openSUSE/SLES 호스트를 관리하려면 먼저 `community.general` 컬렉션을 설치합니다.

```shell
ansible-galaxy collection install community.general
```

### Datadog 설치

1. Ansible 서버의 Ansible Galaxy에서 Datadog Ansible Collection을 설치합니다.
   ```shell
   ansible-galaxy collection install datadog.dd
   ```
   - Datadog Ansible Collection은 Red Hat의 공식 인증을 받은 [Red Hat Automation Hub][1]를 통해서도 제공됩니다.
   - Collection을 설치할 것을 권장합니다. 필요한 경우 [독립 실행 역할][2]로 Datadog을 설치할 수도 있습니다.

2. Datadog Agent를 호스트에 배포하려면 Datadog 역할과 API 키를 플레이북에 추가합니다. `MY_API_KEY`를 Datadog API 키로 바꿉니다.
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

   Agent가 호스트를 그룹화하게 하려면, Datadog Agent이 추적 중인 노드 호스트 이름만 사용합니다. 다음 명령으로 Agent가 추적하는 호스트 이름을 확인할 수 있습니다.

   ```shell
   service datadog-agent info
   ```

## 특정 Agent 점검

노드 중 하나에서 특정 Agent를 점검하거나 통합을 사용하려면 `datadog_checks` 변수를 활용합니다. 다음은 프로세스 점검 예시입니다.
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

[독립 실행 역할][3]에 관한 Github 리포지토리에서 더 많은 Agent 역할 사용 예시를 찾을 수 있습니다.

### 메트릭 및 이벤트

Ansible 실행 후 Datadog에서 메트릭 및 이벤트를 가져오려면 Ansible 콜백 프로젝트의 [Github Page][4]를 참조하세요.

[1]: https://console.redhat.com/ansible/automation-hub/repo/published/datadog/dd/
[2]: /ko/agent/guide/ansible_standalone_role/#ansible-role-versus-ansible-collection
[3]: https://github.com/DataDog/ansible-datadog/#role-variables
[4]: https://github.com/DataDog/ansible-datadog-callback

{{% /tab %}}
{{% tab "Puppet" %}}
<div class="alert alert-info"><code>Datadog_agent</code> 모듈은 Linux 노드만 지원합니다.<br>Puppet Agent 버전 2.7 이상이 필요합니다.</a></div>

1. Puppet의 [Puppet Forge][1]에서 `datadog_agent` 모듈을 설치하세요.
   - 새로 설치하려면 `module install command`를 실행하세요.
     ```shell
     puppet module install datadog-datadog_agent
     ```
   - 모듈이 이미 설치되어 있는 경우 업그레이드합니다.
     ```shell
     puppet module upgrade datadog-datadog_agent
     ```

2. Datadog Agent를 노드에 배포하려면 이 매니페스트에 파라미터화된 클래스를 추가합니다. `MY_API_KEY`를 Datadog API 키로 바꿉니다.
   ```puppet
   node "db1.mydomain.com" {
      class { "datadog_agent":
         api_key => "MY_API_KEY"
      }
   }
   ```

   Agent가 호스트를 그룹화하게 하려면, Datadog Agent이 추적 중인 노드 호스트 이름만 사용합니다. 다음 명령으로 Agent가 추적하는 호스트 이름을 확인할 수 있습니다.

   ```shell
   service datadog-agent info
   ```

3. Puppet 서버에서 Datadog으로 리포트를 활성화합니다.
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
   1. 매니페스트에서 Puppet 서버에 `puppet_run_reports` 옵션을 추가합니다. 예시:
      ```puppet
      node "puppet" {
         class { "datadog_agent":
            api_key            => "MY_API_KEY",
            puppet_run_reports => true
            }
      }
      ```
1. Puppet 서버에서 Puppet을 실행하여 필요한 모든 종속성을 설치합니다.
1. Puppet 서버를 재시작하여 Datadog에서 Puppet 데이터 수신을 시작합니다.

## 특정 Agent 점검

노드 중 하나에서 특정 Agent를 점검하거나 통합을 사용하려면 [통합 매니페스트][2]에서 코드 예시를 확인하세요. 다음은 Elasticsearch 통합 예시입니다.

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
   - [Berkshelf][1]를 사용하는 경우 Berkfile에 쿡북을 추가합니다.
      ```shell
      cookbook 'datadog'
      ```

   - Berkshelf를 사용하지 않는 경우 Knife를 사용하여 리포지토리에 쿡북을 설치합니다.
     ```shell
     knife cookbook site install datadog 
     ```

1. 역할, 환경 또는 다른 레시피에서 Datadog 특정 속성을 설정합니다. `MY_API_KEY`를 Datadog API 키로 바꿉니다.
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

1. 다음 `chef-client` 실행 일정까지 기다립니다.

[1]: https://docs.chef.io/workstation/berkshelf/

{{% /tab %}}

{{% tab "SaltStack" %}}

<div class="alert alert-info">Datadog Saltstack 포뮬러는 Debian 기반 및 RedHat 기반 시스템만 지원합니다.<br><br>
다음 지침은 기본(base) Salt 환경에 Datadog 포뮬러를 추가하는 방법을 설명합니다. 다른 Salt 환경에 추가하려면 <code>기본(base)</code>에 대한 참조를 해당 Salt 환경의 이름으로 교체합니다.</div>

<!-- vale Datadog.inclusive = NO -->

### `gitfs_remotes`를 사용해 설치하기
1. Salt Master 설정 파일(기본 설정: `/etc/salt/master`)에서 `gitfs_remotes` 옵션을 사용하여 Salt Master 노드의 베이스 환경에 [Datadog 포뮬러][1]를 설치합니다.
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

1. Salt Master 서비스를 재시작
   ```shell
   systemctl restart salt-master
   ```
   또는 
   ```shell
   service salt-master restart
   ```

### Datadog 포뮬러를 복제하여 설치

1. Salt Master 노드에 [Datadog 포뮬러][1]를 복제합니다.
   ```shell
   mkdir -p /srv/formulas && cd /srv/formulas git clone https://github.com/DataDog/datadog-formula.git
   ```
1. 복제한 포뮬러를 Salt Master 구성 파일(기본값: `/etc/salt/master`)의 `file_roots` 기본 환경에 추가합니다.
   ```yaml
   file_roots:
     base:
       - /srv/salt/
       - /srv/formulas/datadog-formula/
   ```

## 호스트에 Agent 배포하기

1. Datadog 포뮬러를 상단 파일에 추가합니다(기본값: `/srv/salt/top.sls`).
   ```yaml
   base:
     '*':
       - datadog
   ```

1. `datadog.sls` Pillar 파일을 Pillar 디렉터리(기본값: `/srv/pillar/`)에 추가하고 API 키를 추가합니다. `MY_API_KEY`를 Datadog API 키로 바꿉니다.
   ```yaml
   datadog:
     config:
       api_key: MY_API_KEY
     install_settings:
       agent_version: <AGENT5_VERSION>
   ```

1. `datadog.sls` Pillar 파일을 상단 Pillar 파일(기본값:  `/srv/pillar/top.sls`)에 추가합니다.
   ```yaml
   base:
     '*':
       - datadog
   ```

1. 호스트 중 하나에서 특정 Agent를 점검하거나 통합을 사용하려면 점검 변수를 활용합니다. 다음은 디렉터리 통합의 예시입니다.
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

로그 구성, 점검 예시, 고급 사용 사례는 포뮬러 [Github 리포지토리][1]를 참조하세요.
<!-- vale Datadog.inclusive = YES -->
[1]: https://github.com/DataDog/datadog-formula
{{% /tab %}}

{{< /tabs >}}

## 소스에서 설치

<div class="alert alert-info">Datadog Agent는 Linux에서 Python 2.7 및 <code>sysstat</code>가 필요합니다.</div>

원스텝 소스 설치 스크립트를 사용합니다. `MY_API_KEY`를 Datadog API 키로 바꿉니다.
```shell
DD_API_KEY=MY_API_KEY sh -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/setup_agent.sh)"
``` 

본 스크립트는 `~/.datadog-agent`에 위치한 독립형 샌드박스에 Agent를 설치합니다.

설치를 영구 유지하려면 `init` daemon이 현재 작업 디렉터리에서 `$sandbox_dir`를 설정한 상태로  `$sandbox_dir/bin/agent`를 실행하도록 설정합니다. 샌드박스 디렉터리는 이식 가능하며, 파일 시스템 어느 위치에서나 실행할 수 있습니다. 샌드박스 디렉터리는 기본적으로 `~/.datadog-agent`로 설정되어 있습니다.

## 추가 읽기

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