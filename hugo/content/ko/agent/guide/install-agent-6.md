---
further_reading:
- link: agent/
  tag: 설명서
  text: Datadog Agent
private: true
title: Datadog Agent 6 설치
---
이 가이드는 Agent 6 설치에 대해 다룹니다. Datadog은 최신 기능을 사용하려면 Agent 7을 설치하거나 Agent 7로 업그레이드하는 것이 좋습니다. 최신 버전의 Agent 설치에 대한 정보는 [최신 Agent 설치 지침][1]을 따르세요. 이전 버전에서 Agent 7로 업그레이드하는 방법에 대한 정보는 [Datadog Agent v7로 업그레이드][2]를 참조하세요.

## macOS {#macos}

- Datadog Agent 버전 6에는 macOS 10.12 이상이 필요합니다. 
- Agent 6.34는 macOS 10.12를 지원하는 마지막 릴리스입니다.
- Agent 6.38은 마지막 macOS용 Agent 6 릴리스입니다. 

### Agent 설치 {#install-the-agent}

#### 명령줄 {#command-line}

다음 명령에서 `MY_API_KEY`를 사용자의 Datadog API 키로 바꾼 후 실행합니다.
{{< code-block lang="shell" >}}
DD_AGENT_MAJOR_VERSION=6 DD_API_KEY=MY_API_KEY DD_SITE="${site}" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_mac_os.sh)"
{{< /code-block >}}

Agent는 로그인 시 실행됩니다. 시스템 트레이에서 비활성화할 수 있습니다.

#### LaunchDaemon {#launchdaemon}

Datadog Agent는 `DD_SYSTEMDAEMON_INSTALL=true` 및 `DD_SYSTEMDAEMON_USER_GROUP=username:groupname`을 지정하여 시스템 전체 LaunchDaemon으로 설치할 수 있습니다. `MY_API_KEY`를 사용자의 Datadog API 키로 바꿉니다.

{{< code-block lang="shell" >}}
DD_SYSTEMDAEMON_INSTALL=true DD_SYSTEMDAEMON_USER_GROUP=username:groupname DD_AGENT_MAJOR_VERSION=6 DD_API_KEY=MY_API_KEY DD_SITE="datad0g.com" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_mac_os.sh)"
{{< /code-block >}}

Agent는 시스템 시작 시 실행됩니다. 루트가 아닌 유효한 사용자와 해당 그룹은 `DD_SYSTEMDAEMON_USER_GROUP` 변수를 사용하여 제공해야 합니다. Agent 프로세스는 이 사용자와 그룹 권한으로 실행됩니다.

시스템 전체 LaunchDaemon 설치 시에는 시스템 트레이 앱이 지원되지 않습니다.

#### GUI {#gui}

1. [DMG 패키지][3]를 다운로드하여 설치합니다.
1. `/opt/datadog-agent/etc/datadog.yaml`에 다음 줄을 추가하고 `MY_API_KEY`를 사용자의 Datadog API 키로 바꿉니다.
   {{< code-block lang="shell" >}}
api_key: MY_API_KEY
site: datad0g.com
{{< /code-block >}}

### Agent 관리 {#manage-the-agent}

Agent를 관리하려면 다음 항목을 사용하세요.
- 단일 사용자 설치의 경우 시스템 트레이의 Datadog Agent 앱
- `launchctl`: 시스템 전체 LaunchDaemon 설치의 경우
- `datadog-agent` 명령. 바이너리의 위치는 `/usr/local/bin`입니다.

`/opt/datadog-agent/etc/conf.d.`에서 통합 활성화 또는 비활성화

## Windows {#windows}

릴리스 6.11.0부터 Windows Agent의 코어 및 APM/트레이스 구성 요소는 `LOCAL_SYSTEM` 계정 대신 `ddagentuser` 계정으로 실행되며 설치 시 생성됩니다. Datadog Agent 버전 6.x에서 6.11 이상으로 업그레이드하는 경우 업그레이드 전에 [Windows Agent 사용자][10] 설명서를 검토하세요.

사용 가능한 모든 Windows 설치 프로그램 버전 링크는 [JSON 형식][6]으로 제공됩니다.

### Agent 설치 {#install-the-agent-1}

#### 대화형 {#interactive}

1. [Datadog Agent 설치 프로그램][4]을 다운로드하여 실행합니다.
1. `datadog-agent-6-latest.amd64.msi`를 열어 설치 프로그램을 관리자 권한으로 실행합니다.
1. 안내에 따라 라이선스 계약에 동의하고 Datadog API 키를 입력합니다.
1. Datadog 리전을 입력합니다. {{< region-param key=dd_site code="true" >}}.
1. 메시지가 표시되면 필요시 Datadog Agent Manager를 실행합니다.

#### 무인 {#unattended}

1. [Datadog Agent 설치 프로그램][4]을 다운로드하여 실행합니다.
1. 설치 프로그램을 다운로드한 디렉터리에서 다음 명령 중 하나를 실행하고 `MY_API_KEY`를 사용자의 Datadog API 키로 바꿉니다.
   - 명령 프롬프트:
     {{< code-block lang="shell" >}}
start /wait msiexec /qn /i datadog-agent-6-latest.amd64.msi APIKEY="MY_API_KEY" SITE="datad0g.com"
{{< /code-block >}}
   - Powershell:
     {{< code-block lang="powershell" >}}
Start-Process -Wait msiexec -ArgumentList '/qn /i datadog-agent-6-latest.amd64.msi APIKEY="MY_API_KEY" SITE="datad0g.com"'
{{< /code-block >}}

`HOSTNAME` 및 `TAGS`는 선택 사항입니다. 사용 가능한 모든 옵션은 [Windows Agent 설명서][5]를 참조하세요.

#### Azure에 배포 {#deployment-to-azure}

Azure에 Agent를 설치하려면 [Microsoft Azure 설명서][8]를 따르세요.

## Linux {#linux}

{{< tabs >}}

{{% tab "Debian" %}}
### 단일 단계 설치 {#one-step-install}

단일 단계 명령은 Datadog Agent용 APT 패키지를 설치하고 비밀번호 입력을 요청합니다.
- 컴퓨터에 Agent가 아직 설치되어 있지 않은데 설치 후 자동으로 시작되지 않도록 하려면, 명령을 실행하기 전에 `DD_INSTALL_ONLY=true`를 명령 앞에 추가하세요.
- 기존 Agent 구성 파일이 있는 경우 업데이트 중에 기존 값이 유지됩니다.
- 초기 설치 프로세스 중 일부 Agent 옵션을 구성할 수 있습니다. 자세한 내용은 [install_script 구성 옵션][101]을 검사하세요.

Agent를 설치하려면 `MY_API_KEY`를 Datadog API 키로 바꾼 후 다음 명령을 실행하세요.

```shell
DD_API_KEY=MY_API_KEY DD_SITE="datad0g.com" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent6.sh)"
```

### 다단계 설치 {#multi-step-install}

1. APT가 HTTPS를 통해 다운로드할 수 있도록 설정하고 `curl` 및 `gnupg`를 설치합니다.
   ```shell
   sudo apt-get update
   sudo apt-get install apt-transport-https curl gnupg
   ```
1. 시스템에 Datadog Debian 리포지토리를 설정하고 Datadog 아카이브 키링을 생성합니다.
   ```shell
   sudo sh -c "echo 'deb [signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg] https://apt.datadoghq.com/ stable 6' > /etc/apt/sources.list.d/datadog.list"
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

1. Agent 5.17 이상 버전에서 업그레이드하는 경우 필요시 기존 Agent 5 구성을 가져옵니다.
   ```shell
   sudo -u dd-agent -- datadog-agent import /etc/dd-agent /etc/datadog-agent
   ```

1. 업그레이드 중이 아니며 이전 구성을 사용하지 않으려면 구성 예시를 지정된 위치에 복사하고 Agent를 설치합니다. `MY_API_KEY`를 사용자의 Datadog API 키로 바꿉니다.
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key: MY_API_KEY/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
   ```
1. Datadog 리전을 구성합니다.
   ```shell
   sudo sh -c "sed -i 's/# site:.*/site: datad0g.com/'
                    /etc/datadog-agent/datadog.yaml"
   ```
1. Agent 사용자의 권한이 올바른지 확인합니다.
   ```shell
   sudo sh -c "chown dd-agent:dd-agent /etc/datadog-agent/datadog.yaml && chmod 640 /etc/datadog-agent/datadog.yaml"
   ```
1. Agent를 시작합니다.
   ```shell
   sudo systemctl restart datadog-agent.service
   ```

[101]: https://github.com/DataDog/agent-linux-install-script/blob/main/README.md#agent-configuration-options
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
   sudo sh -c "echo 'deb [signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg] https://apt.datadoghq.com/ stable 6' > /etc/apt/sources.list.d/datadog.list"
   sudo touch /usr/share/keyrings/datadog-archive-keyring.gpg
   sudo chmod a+r /usr/share/keyrings/datadog-archive-keyring.gpg

   curl https://keys.datadoghq.com/DATADOG_APT_KEY_CURRENT.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
   curl https://keys.datadoghq.com/DATADOG_APT_KEY_06462314.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
   curl https://keys.datadoghq.com/DATADOG_APT_KEY_C0962C7D.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
   curl https://keys.datadoghq.com/DATADOG_APT_KEY_F14F620E.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
   curl https://keys.datadoghq.com/DATADOG_APT_KEY_382E94DE.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
   ```
1. Ubuntu 14 이하 버전을 실행 중인 경우 키링을 `/etc/apt/trusted.gpg.d`에 복사합니다.
   ```shell
   sudo cp -a /usr/share/keyrings/datadog-archive-keyring.gpg /etc/apt/trusted.gpg.d/
   ```

1. 로컬 APT 리포지토리를 업데이트하고 Agent를 설치합니다.
   ```shell
   sudo apt-get update
   sudo apt-get install datadog-agent datadog-signing-keys
   ```

1. Agent 5.17 이상 버전에서 업그레이드하는 경우 필요시 기존 Agent 5 구성을 가져옵니다.
   ```shell
   sudo -u dd-agent -- datadog-agent import /etc/dd-agent /etc/datadog-agent
   ```

1. 업그레이드 중이 아니며 이전 구성을 사용하지 않으려면 구성 예시를 지정된 위치에 복사하고 Agent를 설치합니다. `MY_API_KEY`를 사용자의 Datadog API 키로 바꿉니다.
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key: MY_API_KEY/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
   ```
1. Datadog 리전을 구성합니다.
   ```shell
   sudo sh -c "sed -i 's/# site:.*/site: datad0g.com/' /etc/datadog-agent/datadog.yaml"
   ```
1. Agent 사용자의 권한이 올바른지 확인합니다.
   ```shell
   sudo sh -c "chown dd-agent:dd-agent /etc/datadog-agent/datadog.yaml && chmod 640 /etc/datadog-agent/datadog.yaml"
   ```
1. Agent를 시작합니다. 
   - Ubuntu 16.04 이상:
     ```shell
     sudo systemctl restart datadog-agent.service
     ```
   - Ubuntu 14.04:
     ```shell
     sudo initctl start datadog-agent
     ```

{{% /tab %}}

{{% tab "Amazon Linux" %}}
### 단일 단계 설치 {#one-step-install-2}

단일 단계 명령은 Datadog Agent용 YUM 패키지를 설치하고 비밀번호 입력을 요청합니다.
- 컴퓨터에 Agent가 아직 설치되어 있지 않은데 설치 후 자동으로 시작되지 않도록 하려면, 명령을 실행하기 전에 `DD_INSTALL_ONLY=true`를 명령 앞에 추가하세요.
- 기존 Agent 구성 파일이 있는 경우 업데이트 중에 기존 값이 유지됩니다.
- 초기 설치 프로세스 중 일부 Agent 옵션을 구성할 수 있습니다. 자세한 내용은 [install_script 구성 옵션][101]을 검사하세요.

1. 다음 명령에서 `MY_API_KEY`를 사용자의 Datadog API 키로 바꾼 후 실행합니다.
   ```shell
   DD_API_KEY=MY_API_KEY DD_SITE="datad0g.com" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent6.sh)"
   ```

1. Agent 버전 6.39 이하를 Amazon Linux 2022에 설치하는 경우. Agent에는 `libxcrypt-compat` 패키지가 필요합니다.
   ```shell
   dnf install -y libxcrypt-compat
   ```

### 다단계 설치 {#multi-step-install-2}

1. x86_64 호스트에서 다음 구성으로 `/etc/yum.repos.d/datadog.repo`를 생성하여 Datadog YUM 리포지토리를 설정합니다.
   ```conf
   [datadog]
   name=Datadog, Inc.
   baseurl=https://yum.datadoghq.com/stable/6/x86_64/
   enabled=1
   gpgcheck=1
   repo_gpgcheck=1
   gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_4F09D16B.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
   ```

1. arm64 호스트에서 다음 구성으로 `/etc/yum.repos.d/datadog.repo`를 생성하여 Datadog YUM 리포지토리를 설정합니다.
   ```conf
   [datadog]
   name=Datadog, Inc.
   baseurl=https://yum.datadoghq.com/stable/6/aarch64/ 
   enabled=1
   gpgcheck=1
   repo_gpgcheck=1
   gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_4F09D16B.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
   ```

1. Agent 5 또는 6에서 업그레이드하는 경우 더 이상 사용되지 않는 RPM GPG 키를 삭제합니다.
   ```shell
   sudo sh -c 'if rpm -q gpg-pubkey-4172a230-55dd14f6 >/dev/null; then rpm --erase gpg-pubkey-4172a230-55dd14f6; fi'
   ```

1. 로컬 yum 리포지토리를 업데이트하고 Agent를 설치합니다.
   ```shell
   sudo yum makecache
   sudo yum install datadog-agent
   ```

1. Agent 5.17 이상 버전에서 업그레이드하는 경우 필요시 기존 Agent 5 구성을 가져옵니다.
   ```shell
   sudo -u dd-agent -- datadog-agent import /etc/dd-agent /etc/datadog-agent
   ```

1. 업그레이드 중이 아니며 이전 구성을 사용하지 않으려면 구성 예시를 지정된 위치에 복사하고 Agent를 설치합니다. `MY_API_KEY`를 사용자의 Datadog API 키로 바꿉니다.
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key: MY_API_KEY/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
   ```

1. Datadog 리전을 구성합니다.
   ```shell
   sudo sh -c "sed -i 's/# site:.*/site: datad0g.com/' /etc/datadog-agent/datadog.yaml"
   ```
1. Agent 사용자의 권한이 올바른지 확인합니다.
   ```shell
   sudo sh -c "chown dd-agent:dd-agent /etc/datadog-agent/datadog.yaml && chmod 640 /etc/datadog-agent/datadog.yaml"
   ```
1. Agent를 시작합니다. 
   - Amazon Linux 2.0:
     ```shell
     sudo systemctl restart datadog-agent.service
     ```
   - Amazon Linux 1.0:
     ```shell
     sudo initctl start datadog-agent
     ```

[101]: https://github.com/DataDog/agent-linux-install-script/blob/main/README.md#agent-configuration-options
{{% /tab %}}

{{% tab "CentOS 및 RedHat" %}}
### 단일 단계 설치 {#one-step-install-3}

단일 단계 명령은 Datadog Agent용 YUM 패키지를 설치하고 비밀번호 입력을 요청합니다.
- 컴퓨터에 Agent가 아직 설치되어 있지 않은데 설치 후 자동으로 시작되지 않도록 하려면, 명령을 실행하기 전에 `DD_INSTALL_ONLY=true`를 명령 앞에 추가하세요.
- 기존 Agent 구성 파일이 있는 경우 업데이트 중에 기존 값이 유지됩니다.
- 초기 설치 프로세스 중 일부 Agent 옵션을 구성할 수 있습니다. 자세한 내용은 [install_script 구성 옵션][101]을 검사하세요.

다음 명령에서 `MY_API_KEY`를 사용자의 Datadog API 키로 바꾼 후 실행합니다.

```shell
DD_UPGRADE=true DD_SITE="datad0g.com" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent6.sh)"
```

### 다단계 설치 {#multi-step-install-3}

1. 다음 구성으로 `/etc/yum.repos.d/datadog.repo`를 생성하여 Datadog YUM 리포지토리를 설정합니다.
   ```conf
   [datadog]
   name=Datadog, Inc.
   baseurl=https://yum.datadoghq.com/rpm/x86_64/
   enabled=1
   gpgcheck=0
   repo_gpgcheck=1
   gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_4F09D16B.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
   ```

   **참고**: `repo_gpgcheck=0` 옵션은 [DNF의 버그][102]에 대한 해결 방법입니다.

1. Agent 5 또는 Agent 6의 이전 버전에서 업그레이드하는 경우 더 이상 사용되지 않는 RPM GPG 키를 삭제합니다.
   ```shell
   sudo sh -c 'if rpm -q gpg-pubkey-4172a230-55dd14f6 >/dev/null; then rpm --erase gpg-pubkey-4172a230-55dd14f6; fi'
   ```

1. 로컬 yum 리포지토리를 업데이트하고 Agent를 설치합니다.
   ```shell
   sudo yum makecache
   sudo yum remove datadog-agent-base
   sudo yum install datadog-agent
   ```

1. Agent 5.17 이상 버전에서 업그레이드하는 경우 필요시 기존 Agent 5 구성을 가져옵니다.
   ```shell
   sudo -u dd-agent -- datadog-agent import /etc/dd-agent /etc/datadog-agent
   ```

1. 업그레이드 중이 아니며 이전 구성을 사용하지 않으려면 구성 예시를 지정된 위치에 복사하고 Agent를 설치합니다. `MY_API_KEY`를 사용자의 Datadog API 키로 바꿉니다.
   ```shell
   sudo sh -c "sudo sh -c "sed 's/api_key:.*/api_key: .*/api_key: MY_API_KEY/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
   ```

1. Datadog 리전을 구성합니다.
   ```shell
   sudo sh -c "sed -i 's/# site:.*/site: datad0g.com/' /etc/datadog-agent/datadog.yaml"
   ```

1. Agent 사용자의 권한이 올바른지 확인합니다.
   ```shell
   sudo sh -c "chown dd-agent:dd-agent /etc/datadog-agent/datadog.yaml && chmod 640 /etc/datadog-agent/datadog.yaml"
   ```

1. Agent를 시작합니다. 
   - Centos 또는 Red Hat 7 이상:
     ```shell
     sudo systemctl restart datadog-agent.service
     ```
   - Centos 또는 Red Hat 6:
     ```shell
     sudo initctl start datadog-agent
     ```

[101]: https://github.com/DataDog/agent-linux-install-script/blob/main/README.md#agent-configuration-options
[102]: https://bugzilla.redhat.com/show_bug.cgi?id=1792506
{{% /tab %}}

{{% tab "Alma, Oracle 및 Rocky" %}}
### 단일 단계 설치 {#one-step-install-4}

단일 단계 명령은 Datadog Agent용 YUM 패키지를 설치하고 비밀번호 입력을 요청합니다.
- 컴퓨터에 Agent가 아직 설치되어 있지 않은데 설치 후 자동으로 시작되지 않도록 하려면, 명령을 실행하기 전에 `DD_INSTALL_ONLY=true`를 명령 앞에 추가하세요.
- 기존 Agent 구성 파일이 있는 경우 업데이트 중에 기존 값이 유지됩니다.
- 초기 설치 프로세스 중 일부 Agent 옵션을 구성할 수 있습니다. 자세한 내용은 [install_script 구성 옵션][101]을 검사하세요.

다음 명령에서 `MY_API_KEY`를 사용자의 Datadog API 키로 바꾼 후 실행합니다.

```shell
DD_UPGRADE=true DD_SITE="datad0g.com" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent6.sh)"
```

### 다단계 설치 {#multi-step-install-4}

1. 다음 구성으로 `/etc/yum.repos.d/datadog.repo`를 생성하여 Datadog YUM 리포지토리를 설정합니다.
   ```conf
   [datadog]
   name=Datadog, Inc.
   baseurl=https://yum.datadoghq.com/rpm/x86_64/
   enabled=1
   gpgcheck=1
   repo_gpgcheck=1
   gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_4F09D16B.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
   ```

1. Agent 5 또는 Agent 6의 이전 버전에서 업그레이드하는 경우 더 이상 사용되지 않는 RPM GPG 키를 삭제합니다.
   ```shell
   sudo sh -c 'if rpm -q gpg-pubkey-4172a230-55dd14f6 >/dev/null; then rpm --erase gpg-pubkey-4172a230-55dd14f6; fi'
   ```

1. 로컬 yum 리포지토리를 업데이트하고 Agent를 설치합니다.
   ```shell
   sudo yum makecache
   sudo yum remove datadog-agent-base
   sudo yum install datadog-agent
   ```

1. Agent 5.17 이상 버전에서 업그레이드하는 경우 필요시 기존 Agent 5 구성을 가져옵니다.
   ```shell
   sudo -u dd-agent -- datadog-agent import /etc/dd-agent /etc/datadog-agent
   ```

1. 업그레이드 중이 아니며 이전 구성을 사용하지 않으려면 구성 예시를 지정된 위치에 복사하고 Agent를 설치합니다. `MY_API_KEY`를 사용자의 Datadog API 키로 바꿉니다.
   ```shell
   sudo sh -c "sudo sh -c "sed 's/api_key:.*/api_key: .*/api_key: MY_API_KEY/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
   ```

1. Datadog 리전을 구성합니다.
   ```shell
   sudo sh -c "sed -i 's/# site:.*/site: datad0g.com/' /etc/datadog-agent/datadog.yaml"
   ```

1. Agent 사용자의 권한이 올바른지 확인합니다.
   ```shell
   sudo sh -c "chown dd-agent:dd-agent /etc/datadog-agent/datadog.yaml && chmod 640 /etc/datadog-agent/datadog.yaml"
   ```
   
1. Agent를 다시 시작합니다. 
   ```shell
   sudo systemctl restart datadog-agent.service
   ```

[101]: https://github.com/DataDog/agent-linux-install-script/blob/main/README.md#agent-configuration-options
{{% /tab %}}

{{% tab "Fedora" %}}
### 단일 단계 설치 {#one-step-install-5}

단일 단계 명령은 Datadog Agent용 YUM 패키지를 설치하고 비밀번호 입력을 요청합니다.
- 컴퓨터에 Agent가 아직 설치되어 있지 않은데 설치 후 자동으로 시작되지 않도록 하려면, 명령을 실행하기 전에 `DD_INSTALL_ONLY=true`를 명령 앞에 추가하세요.
- 기존 Agent 구성 파일이 있는 경우 업데이트 중에 기존 값이 유지됩니다.
- 초기 설치 프로세스 중 일부 Agent 옵션을 구성할 수 있습니다. 자세한 내용은 [install_script 구성 옵션][101]을 검사하세요.

다음 명령에서 `MY_API_KEY`를 사용자의 Datadog API 키로 바꾼 후 실행합니다.

```shell
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh)"
```

### 다단계 설치 {#multi-step-install-5}

1. 다음 구성으로 `/etc/yum.repos.d/datadog.repo`를 생성하여 Datadog YUM 리포지토리를 설정합니다.
   ```conf
   [datadog]
   name=Datadog, Inc.
   baseurl=https://yum.datadoghq.com/rpm/x86_64/
   enabled=1
   gpgcheck=1
   repo_gpgcheck=1
   gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_4F09D16B.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
   ```

1. Agent 5 또는 Agent 6의 이전 버전에서 업그레이드하는 경우 더 이상 사용되지 않는 RPM GPG 키를 삭제합니다.
   ```shell
   sudo sh -c 'if rpm -q gpg-pubkey-4172a230-55dd14f6 >/dev/null; then rpm --erase gpg-pubkey-4172a230-55dd14f6; fi'
   ```

1. 로컬 yum 리포지토리를 업데이트하고 Agent를 설치합니다.
   ```shell
   sudo yum makecache
   sudo yum install datadog-agent
   ```

1. Agent 5.17 이상 버전에서 업그레이드하는 경우 필요시 기존 Agent 5 구성을 가져옵니다.
   ```shell
   sudo -u dd-agent -- datadog-agent import /etc/dd-agent /etc/datadog-agent
   ```

1. 업그레이드 중이 아니며 이전 구성을 사용하지 않으려면 구성 예시를 지정된 위치에 복사하고 Agent를 설치합니다. `MY_API_KEY`를 사용자의 Datadog API 키로 바꿉니다.
   ```shell
   sudo sh -c "sudo sh -c "sed 's/api_key:.*/api_key: .*/api_key: MY_API_KEY/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
   ```

1. Datadog 리전을 구성합니다.
   ```shell
   sudo sh -c "sed -i 's/# site:.*/site: datad0g.com/' /etc/datadog-agent/datadog.yaml"
   ```

1. Agent 사용자의 권한이 올바른지 확인합니다.
   ```shell
   sudo sh -c "chown dd-agent:dd-agent /etc/datadog-agent/datadog.yaml && chmod 640 /etc/datadog-agent/datadog.yaml"
   ```
   
1. Agent를 다시 시작합니다. 
   ```shell
   sudo systemctl restart datadog-agent.service
   ```

[101]: https://github.com/DataDog/agent-linux-install-script/blob/main/README.md#agent-configuration-options
{{% /tab %}}

{{% tab "SUSE" %}}
### 단일 단계 설치 {#one-step-install-6}

단일 단계 명령은 Datadog Agent용 YUM 패키지를 설치하고 비밀번호 입력을 요청합니다.
- 컴퓨터에 Agent가 아직 설치되어 있지 않은데 설치 후 자동으로 시작되지 않도록 하려면, 명령을 실행하기 전에 `DD_INSTALL_ONLY=true`를 명령 앞에 추가하세요.
- 기존 Agent 구성 파일이 있는 경우 업데이트 중에 기존 값이 유지됩니다.
- 초기 설치 프로세스 중 일부 Agent 옵션을 구성할 수 있습니다. 자세한 내용은 [install_script 구성 옵션][101]을 검사하세요.

다음 명령에서 `MY_API_KEY`를 사용자의 Datadog API 키로 바꾼 후 실행합니다.

```shell
DD_API_KEY=MY_API_KEY DD_SITE="datad0g.com" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent6.sh)"
```

### 다단계 설치 {#multi-step-install-6}

1. 다음 구성으로 `/etc/zypp/repos.d/datadog.repo`를 생성하여 Datadog YUM 리포지토리를 설정합니다.
   ```conf
   [datadog]
   name=Datadog, Inc.
   baseurl=hhttps://yum.datadoghq.com/suse/stable/6/x86_64
   enabled=1
   gpgcheck=1
   repo_gpgcheck=1
   gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_4F09D16B.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
   ```

1. Agent 5 또는 Agent 6의 이전 버전에서 업그레이드하는 경우 더 이상 사용되지 않는 RPM GPG 키를 삭제합니다.
   ```shell
   sudo sh -c 'if rpm -q gpg-pubkey-4172a230-55dd14f6 >/dev/null; then rpm --erase gpg-pubkey-4172a230-55dd14f6; fi'
   ```

1. 로컬 zypper 리포지토리를 업데이트하고 Agent를 설치합니다.
   ```shell
   sudo zypper refresh
   sudo rpm --import https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
   sudo rpm --import https://keys.datadoghq.com/DATADOG_RPM_KEY_4F09D16B.public
   sudo rpm --import https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
   sudo rpm --import https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
   sudo rpm --import https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
   sudo zypper install datadog-agent
   ```

1. Agent 5.17 이상 버전에서 업그레이드하는 경우 필요시 기존 Agent 5 구성을 가져옵니다.
   ```shell
   sudo -u dd-agent -- datadog-agent import /etc/dd-agent /etc/datadog-agent
   ```

1. 업그레이드 중이 아니며 이전 구성을 사용하지 않으려면 구성 예시를 지정된 위치에 복사하고 Agent를 설치합니다. `MY_API_KEY`를 사용자의 Datadog API 키로 바꿉니다.
   ```shell
   sudo sh -c "sudo sh -c "sed 's/api_key:.*/api_key: .*/api_key: MY_API_KEY/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
   ```

1. Datadog 리전을 구성합니다.
   ```shell
   sudo sh -c "sed -i 's/# site:.*/site: datad0g.com/' /etc/datadog-agent/datadog.yaml"
   ```

1. Agent 사용자의 권한이 올바른지 확인합니다.
   ```shell
   sudo sh -c "chown dd-agent:dd-agent /etc/datadog-agent/datadog.yaml && chmod 640 /etc/datadog-agent/datadog.yaml"
   ```
   
1. Agent를 다시 시작합니다. 
   ```shell
   sudo systemctl restart datadog-agent.service
   ```

[101]: https://github.com/DataDog/agent-linux-install-script/blob/main/README.md#agent-configuration-options
{{% /tab %}}

{{< /tabs >}}

## 클라우드 및 컨테이너 {#cloud-and-containers}

{{< tabs >}}

{{% tab "Kubernetes" %}}

Kubernetes 클러스터에서 Datadog Agent를 직접 실행하여 클러스터와 애플리케이션의 메트릭, 트레이스, 로그 수집을 시작할 수 있습니다. Helm 차트, [Datadog Operator][101]를 사용하거나 [DaemonSet][102]으로 직접 Agent를 배포할 수 있습니다. 다양한 배포판에 Datadog Agent를 설치하는 방법에 대한 자세한 내용은 [Kubernetes 배포판 설명서][103]를 참조하세요.

### Datadog Agent 설치 {#installing-the-datadog-agent}

사용자 지정 릴리스 이름 `RELEASE_NAME`을 사용하여 차트를 설치하려면 다음 단계를 따르세요.

1. [Helm을 설치][104]합니다.
1. Datadog Helm 리포지토리를 추가합니다.
   ```shell
   helm repo add datadog https://helm.datadoghq.com
   ```

1. 새로 추가된 차트의 최신 버전을 가져옵니다.
   ```shell
   helm repo update
   ```

1. 빈 `values.yaml` 파일을 만들고 원하는 경우 [기본값][105]을 재정의합니다. 예시는 [Datadog `helm-charts` 리포지토리][106]를 참조하세요. 
1. `MY_API_KEY`를 사용자의 Datadog API 키로 바꾼 다음 Datadog Agent를 배포합니다.
   **Helm v3+ 사용 시**:
   ```shell
   helm install RELEASE_NAME -f datadog-values.yaml --set datadog.site='datad0g.com' --set agents.image.tag='6' --set datadog.apiKey=MY_API_KEY datadog/datadog
   ```

   **Helm v1 또는 v2 사용 시**:
   ```shell
   helm install -f datadog-values.yaml --name RELEASE_NAME --set datadog.site='datad0g.com' --set agents.image.tag='6' --set datadog.apiKey=MY_API_KEY datadog/datadog
   ```

   이 차트는 DaemonSet를 사용하여 클러스터의 모든 노드에 Datadog Agent를 추가합니다. 설치 후 바로 Datadog이 계정에 호스트 및 메트릭 데이터를 보고하기 시작합니다.

### 로그 수집 활성화 {#enabling-log-collection}

Helm을 사용하여 로그 수집을 활성화하려면 다음 로그 수집 구성으로 `datadog-values.yaml` 파일을 업데이트하세요.

```yaml
datadog:
  logs:
    enabled: true
    containerCollectAll: true
```    

그런 다음 Datadog Helm 차트를 업그레이드합니다.

```shell
helm upgrade -f datadog-values.yaml RELEASE_NAME datadog/datadog
```

### 트레이스 수집 활성화 {#enabling-trace-collection}

Kubernetes 환경에서 애플리케이션 트레이스를 수집하는 방법을 알아보려면 전용 [APM 설정 설명서][107]를 따르세요.

### 추가 자료 {#further-reading}

사용 가능한 Agent 기능에 대한 자세한 내용은 [Kubernetes 설명서][108]를 참조하세요.

[101]: /ko/containers/kubernetes/?tab=operator
[102]: /ko/containers/kubernetes/?tab=daemonset
[103]: /ko/containers/kubernetes/distributions/
[104]: https://v3.helm.sh/docs/intro/install/
[105]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml
[106]: https://github.com/DataDog/helm-charts/tree/main/examples/datadog
[107]: https://dd-dev-local.datad0g.com/apm/service-setup?architecture=container-based&collection=Helm%20Chart%20%28Recommended%29&environment=kubernetes
[108]: /ko/containers/kubernetes/
{{% /tab %}}

{{% tab "Docker" %}}
### 단일 단계 설치 {#one-step-install-7}

단일 단계 설치 명령은 호스트를 모니터링하는 Datadog Agent가 포함된 서명된 Docker 컨테이너를 실행합니다. Docker 통합은 기본적으로 활성화되어 있으며 자동 구성 모드의 [Autodiscovery][101]도 마찬가지입니다.

<div class="alert alert-info">노드당 하나의 Datadog Agent만 실행해야 합니다. 여러 Agent를 실행하면 예기치 않은 동작이 발생할 수 있습니다.</a></div>

단일 단계 설치를 수행하려면 다음 명령을 실행하세요. `MY_API_KEY`를 사용자의 Datadog API 키로 바꿉니다.

Amazon Linux v2:

```shell
docker run -d --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /cgroup/:/host/sys/fs/cgroup:ro -e DD_API_KEY=MY_API_KEY -e DD_SITE="datad0g.com" registry.datadoghq.com/agent:6
```

기타 운영 체제:

```shell
docker run -d --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro -e DD_API_KEY=MY_API_KEY -e DD_SITE="datad0g.com" registry.datadoghq.com/agent:6
```

#### 문제 해결 {#troubleshooting}

단일 단계 설치 명령이 작동하지 않는 경우 시스템이 `cgroup` 디렉터리를 예상치 못한 위치에 마운트했거나 메모리 관리에 CGroups를 사용하지 않을 수 있습니다. Docker 검사에 성공하려면 CGroups가 필요합니다. CGroups를 활성화하려면 [설정 설명서][102]를 참조하세요. 

CGroups가 활성화되어 있지만 예상치 못한 `cgroup` 디렉터리 위치로 인해 검사가 실패하는 경우 다음 단계를 따르세요.
1. `mount | grep "cgroup type tmpfs"`를 실행하여 `cgroup` 디렉터리의 위치를 검색합니다.
1. 단일 단계 설치 명령에서 `/sys/fs/cgroup`의 첫 번째 항목을 `cgroup` 디렉터리의 위치로 바꿉니다.

### DogStatsD로 Custom Metrics 전송 {#send-custom-metrics-with-dogstatsd}

기본적으로 DogStatsD는 localhost에 대해서만 수신합니다. 다른 컨테이너에서 DogStatsD 패킷을 수신하려면 다음 단계를 수행하세요.
1. 컨테이너 파라미터에 `-e DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true`를 추가합니다. 
1. 컨테이너 파라미터에 `-p 8125:8125/udp` 옵션을 추가하여 컨테이너의 statsd 포트를 호스트의 IP에 바인딩합니다.
1. 클라이언트 라이브러리를 구성하여 호스트의 IP로 UDP 패킷을 전송합니다.

### Agent 구성 사용자 지정 {#customize-your-agent-configuration}

- Agent 구성에 대한 자세한 내용은 [Docker, containerd 및 Podman용 Docker Agent][103]를 참조하세요.
- Autodiscovery 조정에 대한 자세한 내용은 [Docker Integrations Autodiscovery][104]를 참조하세요.

[101]: /ko/containers/docker/integrations/?tabs=docker
[102]: /ko/containers/docker/?tab=standard#setup
[103]: /ko/containers/docker/?tab=standard
[104]: /ko/containers/docker/integrations/?tab=docker

{{% /tab %}}

{{% tab "CoreOS" %}}
CoreOS Container Linux 실행은 Docker 런타임으로 지원됩니다. 설치 지침은 [Docker][1]를 참조하세요.

Kubernetes에서 CoreOS Tectonic을 실행하려면 [Kubernetes][2]를 참조하세요.

[1]: ?tab=docker#cloud-and-containers
[2]: ?tab=kubernetes#cloud-and-containers

{{% /tab %}}

{{% tab "OpenShift" %}}
버전 6.1부터 Datadog Agent는 OpenShift Origin 및 Enterprise 클러스터 모니터링을 지원합니다. 사용자의 요구 사항과 클러스터의 보안 제약 조건에 따라 다음 3가지 배포 시나리오가 지원됩니다.

- [제한된 SCC 작업][101]
- [호스트 네트워크 SCC 작업][102]
- [모든 기능을 위한 사용자 지정 Datadog][103]

OpenShift를 설치하려면 [Kubernetes 설치 지침](?tab=kubernetes#cloud-and-containers)을 참조하세요. Kubernetes 통합은 기본적으로 OpenShift 3.7.0 이상을 대상으로 합니다. 이전 버전의 OpenShift의 경우 추가 설치 단계를 완료해야 합니다. 자세한 내용은 [OpenShift 통합 설명서][104]를 참조하세요.

[101]: /ko/integrations/openshift/?tab=helm#restricted-scc-operations
[102]: /ko/integrations/openshift/?tab=helm#host
[103]: /ko/integrations/openshift/?tab=helm#custom-datadog-scc-for-all-features
[104]: /ko/integrations/openshift/?tab=helm#installation
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

3. 사용자의 [런타임 구성][101]에 런타임을 추가합니다.

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
   
[101]: https://bosh.io/docs/runtime-config/   
{{% /tab %}}

{{< /tabs >}}

## 구성 관리 {#configuration-management}

{{< tabs >}}
{{% tab "Ansible" %}}

Ansible로 Agent를 설치하려면 Ansible 버전 2.10 이상이 필요합니다.

<div class="alert alert-info">Datadog Ansible 컬렉션은 대부분의 Debian, RHEL 기반 및 SUSE 기반 Linux 배포판, macOS, Windows를 지원합니다.<br></div>

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
   - Datadog Ansible 컬렉션은 Red Hat에서 공식 인증을 받은 [Red Hat Automation Hub][101]를 통해서도 제공됩니다.
   - 이 컬렉션은 설치하는 것이 좋습니다. 필요한 경우 [독립형 역할][102]을 사용하여 Datadog을 설치할 수도 있습니다.

2. 호스트에 Datadog Agent를 배포하려면 플레이북에 Datadog 역할과 API 키를 추가합니다. `MY_API_KEY`를 사용자의 Datadog API 키로 바꿉니다.
   ```yaml
   - hosts: servers
   tasks:
      - name: Import the Datadog Agent role from the Datadog collection
         import_role:
         name: datadog.dd.agent
   vars:
      datadog_api_key: "MY_API_KEY"
      datadog_agent_major_version: 6
      datadog_site: "datad0g.com"
   ```

   Agent가 호스트를 그룹화할 수 있도록 하려면 Datadog Agent가 추적 중인 노드 호스트 이름만 사용하세요. 다음 명령을 사용하여 Agent가 추적 중인 호스트 이름을 검사할 수 있습니다.

   ```shell
   sudo datadog-agent status
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
    datadog_agent_major_version: 6
    datadog_site: "datad0g.com"
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

[독립형 역할][103]에 대한 Github 리포지토리에서 Agent 역할 사용에 대한 더 많은 예시를 찾을 수 있습니다.

### 메트릭 및 이벤트 {#metrics-and-events}

Ansible 실행 후 Datadog에서 메트릭과 이벤트를 가져오려면 Ansible 콜백 프로젝트의 [Github 페이지][104]를 참조하세요.

[101]: https://console.redhat.com/ansible/automation-hub/repo/published/datadog/dd/
[102]: /ko/agent/guide/ansible_standalone_role/#ansible-role-versus-ansible-collection
[103]: https://github.com/DataDog/ansible-datadog/#role-variables
[104]: https://github.com/DataDog/ansible-datadog-callback

{{% /tab %}}
{{% tab "Puppet" %}}
<div class="alert alert-info">버전 2.9.0부터는 <code>datadog_agent</code> 모듈이 Windows 및 Linux 노드를 모두 지원합니다. 이전 버전의 datadog_agent 모듈은 Linux 노드만 지원합니다.</a></div>

## 요구 사항: {#requirements}
- Puppet Open Source 버전4.6 이상 또는 Puppet Enterprise 버전 2016.4 이상이 필요합니다.

## Agent 설치 {#install-the-agent-2}

1. [Puppet Forge][101]의 `datadog_agent` 모듈을 Puppet 서버에 설치합니다.
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
         api_key => "MY_API_KEY",
         datadog_site => "datad0g.com",
         agent_major_version => 6,
      }
   }
   ```

   Agent가 호스트를 그룹화할 수 있도록 하려면 Datadog Agent가 추적 중인 노드 호스트 이름만 사용하세요. 다음 명령을 사용하여 Agent가 추적 중인 호스트 이름을 검사할 수 있습니다.

   ```shell
   sudo datadog-agent status
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
            api_key => "MY_API_KEY",
            datadog_site => "datad0g.com",
            agent_major_version => 6,
            puppet_run_reports => true,
         }
      }
      ```
1. Puppet 서버에서 Puppet을 실행하여 필요한 모든 종속성을 설치합니다.
1. Puppet 서버를 다시 시작하여 Datadog에서 Puppet 데이터 수신을 시작합니다.

## 특정 Agent 검사 {#specific-agent-checks-1}

노드 중 하나에서 특정 Agent 검사를 사용하거나 통합을 사용하려면 관련 [통합 매니페스트][102]에서 코드 샘플을 확인하세요. 다음은 Elasticsearch 통합의 예시입니다.

```puppet
node "elastic-node1.mydomain.com" {
    class { "datadog_agent":
        api_key => "MY_API_KEY",
        datadog_site => "datad0g.com",
        agent_major_version => 6,
    }
    include "datadog_agent::integrations::elasticsearch"
}
```

더 많은 예시와 고급 사용 사례는 [모듈의 GitHub 리포지토리][103]를 참조하세요.

[101]: https://forge.puppetlabs.com/modules/datadog/datadog_agent/readme
[102]: https://github.com/DataDog/puppet-datadog-agent/tree/main/manifests/integrations
[103]: https://github.com/DataDog/puppet-datadog-agent

{{% /tab %}}

{{% tab "Chef" %}}

<div class="alert alert-info">Chef 버전 10.14.x 이상이 필요합니다.</a></div>

1. Datadog 쿡북을 추가합니다.
   - [Berkshelf][101]를 사용하는 경우 Berksfile에 쿡북을 추가합니다.
      ```shell
      cookbook 'datadog', '~> 4.0'
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

   # Enable install for Agent version 6
   node.default['datadog']['agent_major_version'] = 6

   # Set the Datadog site
   node.default['datadog']['site'] = "datad0g.com"
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


자세한 정보와 예시는 [Agent GitHub 리포지토리][102]를 참조하세요.

[101]: https://docs.chef.io/workstation/berkshelf/
[102]: https://github.com/DataDog/chef-datadog

{{% /tab %}}

{{% tab "SaltStack" %}}

<div class="alert alert-info">Datadog Saltstack 수식은 Debian 기반 및 RedHat 기반 시스템만 지원합니다.<br><br>
다음 지침에서는 Datadog 수식을 <code>base</code> Salt 환경에 추가합니다. 다른 Salt 환경에 추가하려면 <code>base</code> 에 대한 참조를 Salt 환경의 이름으로 바꾸세요.</div>

<!-- vale Datadog.inclusive = NO -->

### `gitfs_remotes` {#install-using-gitfs-remotes}를 사용하여 설치
1. Salt Master 구성 파일(기본값 `/etc/salt/master`)의 `gitfs_remotes` 옵션을 사용하여 Salt Master 노드의 기본 환경에 [Datadog 수식][101]을 설치합니다.
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

1. Salt Master 노드에서 [Datadog 수식][101]을 복제합니다.
   ```shell
   mkdir -p /srv/formulas && cd /srv/formulas
   git clone https://github.com/DataDog/datadog-formula.git
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
       agent_version: <AGENT6_VERSION>
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
       agent_version: <AGENT6_VERSION>
     checks:
       directory:
         config:
           instances:
             - directory: "/srv/pillar"
               name: "pillars"
   ```         

로그 구성, 검사 예시 및 고급 사용 사례는 formula의 [GitHub 리포지토리][101]를 참조하세요.
<!-- vale Datadog.inclusive = YES -->
[101]: https://github.com/DataDog/datadog-formula
{{% /tab %}}

{{< /tabs >}}

## 소스에서 설치 {#install-from-source}

Docker를 사용하여 Linux에서 Agent 6 `.deb` 및 `.rpm` 패키지를 빌드하려면 [Agent GitHub 리포지토리의 지침][11]을 따르세요.

또는 [시작하기 지침][12]에 따라 버전 6용 Agent 바이너리를 빌드할 수 있습니다.

## 추가 자료 {#further-reading-1}

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[2]: /ko/agent/versions/upgrade_to_agent_v7/
[3]: https://s3.amazonaws.com/dd-agent/datadogagent.dmg
[4]: https://s3.amazonaws.com/ddagent-windows-stable/datadog-agent-6-latest.amd64.msi
[5]: /ko/agent/basic_agent_usage/windows/
[6]: https://s3.amazonaws.com/ddagent-windows-stable/installers.json
[7]: https://s3.amazonaws.com/ddagent-windows-stable/ddagent-cli-latest.exe
[8]: /ko/integrations/azure/
[9]: https://github.com/DataDog/dd-agent/wiki/Windows-Agent-Installation
[10]: /ko/agent/guide/windows-agent-ddagent-user/
[11]: https://github.com/DataDog/datadog-agent/blob/main/docs/dev/agent_omnibus.md#building-inside-docker-linux-only-recommended
[12]: https://github.com/DataDog/datadog-agent#getting-started