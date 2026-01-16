---
further_reading:
- link: agent/
  tag: 설명서
  text: Datadog Agent
private: true
title: Datadog Agent 6 설치하기
---

이 가이드에서는 Agent 6 설치에 대해 다룹니다. Datadog에서는 최신 기능을 위해 Agent 7을 설치하거나 업그레이드할 것을 권장합니다. 최신 버전의 Agent 설치에 대한 자세한 내용은 [최신 Agent 설치 지침][1]을 따르세요. 이전 버전에서 Agent 7로 업그레이드하는 방법은 [Datadog Agent v7로 업그레이드][2]를 참조하세요.

## macOS

- Datadog Agent 버전 6에는 macOS 10.12 이상이 필요합니다.
- Agent 6.34는 macOS 10.12를 지원하는 마지막 릴리스입니다.
- Agent 6.38은 macOS용 마지막 Agent 6 릴리스입니다.

### 에이전트 설치

#### 명령줄

다음 명령을 실행하여 `MY_API_KEY`를 Datadog API 키로 바꿉니다.
{{< code-block lang="shell" >}}
DD_AGENT_MAJOR_VERSION=6 DD_API_KEY=MY_API_KEY DD_SITE="${site}" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_mac_os.sh)"
{{< /code-block >}}

Agent는 로그인 시 실행됩니다. 시스템 트레이에서 비활성화할 수 있습니다.

#### LaunchDaemon

Datadog Agent는 `DD_SYSTEMDAEMON_INSTALL=true` 및 `DD_SYSTEMDAEMON_USER_GROUP=username:groupname`를 지정하여 시스템 전체 LaunchDaemon으로 설치할 수 있습니다. `MY_API_KEY`를 Datadog API 키로 변경하세요.

{{< code-block lang="shell" >}}
DD_SYSTEMDAEMON_INSTALL=true DD_SYSTEMDAEMON_USER_GROUP=username:groupname DD_AGENT_MAJOR_VERSION=6 DD_API_KEY=MY_API_KEY DD_SITE="datad0g.com" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_mac_os.sh)"
{{< /code-block >}}

Agent는 시스템 시작 시 실행됩니다. 루트가 아닌 유효한 사용자 및 해당 그룹은 `DD_SYSTEMDAEMON_USER_GROUP` 변수를 사용하여 제공되어야 합니다. 에이전트 프로세스는 이 사용자 및 그룹에서 실행됩니다.

시스템 전체 LaunchDaemon 설치에서는 시스템 트레이 앱이 지원되지 않습니다.

#### GUI

1. [DMG 패키지[3]를 다운로드하고 설치합니다.
1. `/opt/datadog-agent/etc/datadog.yaml`에 다음 줄을 추가하고 `MY_API_KEY`를 Datadog API 키로 바꿉니다.
   {{< code-block lang="shell" >}}
api_key: MY_API_KEY
site: datad0g.com
{{< /code-block >}}

### Agent 관리하기

Agent를 관리하려면 다음을 사용하세요.
- 단일 사용자 설치의 경우 시스템 트레이에서 Datadog Agent 앱
- 시스템 전체 LaunchDaemon 설치의 경우 `launchctl`
- `datadog-agent`명령. 바이너리는 `/usr/local/bin`에 있습니다.

`/opt/datadog-agent/etc/conf.d.`에서 통합을 활성화하거나 비활성화합니다.

## Windows

릴리스 6.11.0부터 Windows Agent의 핵심 및 APM/트레이스 컴포넌트는 `ddagentuser` 계정에서 실행되며 `LOCAL_SYSTEM` 계정에서 실행되는 대신 설치 시 생성됩니다. Datadog Agent 버전 6.x에서 6.11 이상으로 업그레이드하는 경우 업그레이드하기 전에 [Windows Agent 사용자][10] 문서를 확인하세요.

사용 가능한 모든 버전의 Windows 설치 프로그램 링크는 [JSON 형식으로 제공됩니다][6].

### 에이전트 설치

#### 인터랙티브 방식

1. [Datadog Agent 설치 프로그램][4]을 다운로드하여 실행합니다.
1. `datadog-agent-6-latest.amd64.msi`를 열어 설치 프로그램을 Administrator로 실행합니다.
1. 안내에 따라 라이선스 계약에 동의하고 Datadog API 키를 입력합니다.
1. Datadog 지역을 입력합니다: {{< region-param key=dd_site code="true" >}}.
1. (선택 사항) 메시지가 표시되면 Datadog Agent Manager를 실행합니다.

#### 비상호적인 방식

1. [Datadog Agent 설치 프로그램][4]을 다운로드하여 실행합니다.
1. 설치 프로그램을 다운로드한 디렉터리 내에서 다음 명령 중 하나를 실행하고 `MY_API_KEY`를 Datadog API 키로 바꿉니다.
   - 명령 프롬프트:
     {{< code-block lang="shell" >}}
start /wait msiexec /qn /i datadog-agent-6-latest.amd64.msi APIKEY="MY_API_KEY" SITE="datad0g.com"
{{< /code-block >}}
   - Powershell:
     {{< code-block lang="powershell" >}}
Start-Process -Wait msiexec -ArgumentList '/qn /i datadog-agent-6-latest.amd64.msi APIKEY="MY_API_KEY" SITE="datad0g.com"'
{{< /code-block >}}

`HOSTNAME` 및 `TAGS`는 선택적 값입니다. 사용 가능한 모든 옵션은 [Windows Agent 설명서][5]를 참조하세요.

#### Azure에 배포

Azure에 Agent를 설치하려면 [Microsoft Azure 설명서][8]를 따르세요.

## Linux 및 Unix

{{< tabs >}}

{{% tab "Debian" %}}
### 원스텝 설치

원스텝 명령은 Datadog Agent용 APT 패키지를 설치하고 비밀번호를 묻는 메시지를 표시합니다.
- Agent가 시스템에 아직 설치되어 있지 않고 설치 후 자동으로 시작되지 않도록 하려면 Agent를 실행하기 전에 `DD_INSTALL_ONLY=true`를 명령 앞에 추가하세요.
- 기존 Agent 구성 파일이 있는 경우 업데이트 중에 기존 값이 유지됩니다.
- 초기 설치 프로세스 중에 일부 Agent 옵션을 구성할 수 있습니다. 자세한 내용은 [install_script 구성 옵션][101]을 확인하세요.

Agent를 설치하려면 다음 명령을 실행하고 `MY_API_KEY`를 Datadog API 키로 바꾸세요.
```shell
DD_API_KEY=MY_API_KEY DD_SITE="datad0g.com" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent6.sh)"
```

### 단계별 설치

1. HTTPS를 통해 다운로드하고 `curl`과 `gnupg`를 설치할 수 있도록 APT를 설정합니다.
   ```shell
   sudo apt-get update
   sudo apt-get install apt-transport-https curl gnupg
   ```
1. 시스템에 Datadog Debian 리포지토리를 설정하고 Datadog 아카이브 키링을 만듭니다.
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

1. Debian 8 이하를 실행하는 경우 키링을 `/etc/apt/trusted.gpg.d`에 복사하세요.
   ```shell
   sudo cp -a /usr/share/keyrings/datadog-archive-keyring.gpg /etc/apt/trusted.gpg.d/
   ```

1. 로컬 APT 리포지토리를 업데이트하고 Agent를 설치합니다.
   ```shell
   sudo apt-get update
   sudo apt-get install datadog-agent datadog-signing-keys
   ```

1. (선택 사항) Agent 5.17 이상에서 업그레이드하는 경우 기존 Agent 5 구성을 가져옵니다.
   ```shell
   sudo -u dd-agent -- datadog-agent import /etc/dd-agent /etc/datadog-agent
   ```

1. 업그레이드하지 않고 이전 구성을 사용하지 않으려면 예제 구성을 복사하고 Agent를 설치하세요. `MY_API_KEY`를 Datadog API 키로 바꿉니다.
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key: MY_API_KEY/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
   ```
1. Datadog 지역을 설정합니다.
   ```shell
   sudo sh -c "sed -i 's/# site:.*/site: datad0g.com/'
                    /etc/datadog-agent/datadog.yaml"
   ```
1. Agent 사용자의 권한이 올바른지 확인합니다.
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
   sudo sh -c "echo 'deb [signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg] https://apt.datadoghq.com/ stable 6' > /etc/apt/sources.list.d/datadog.list"
   sudo touch /usr/share/keyrings/datadog-archive-keyring.gpg
   sudo chmod a+r /usr/share/keyrings/datadog-archive-keyring.gpg

   curl https://keys.datadoghq.com/DATADOG_APT_KEY_CURRENT.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
   curl https://keys.datadoghq.com/DATADOG_APT_KEY_06462314.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
   curl https://keys.datadoghq.com/DATADOG_APT_KEY_C0962C7D.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
   curl https://keys.datadoghq.com/DATADOG_APT_KEY_F14F620E.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
   curl https://keys.datadoghq.com/DATADOG_APT_KEY_382E94DE.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
   ```
1. Ubuntu 14 이하를 실행하는 경우 키링을 `/etc/apt/trusted.gpg.d`에 복사하세요.
   ```shell
   sudo cp -a /usr/share/keyrings/datadog-archive-keyring.gpg /etc/apt/trusted.gpg.d/
   ```

1. 로컬 APT 리포지토리를 업데이트하고 Agent를 설치합니다.
   ```shell
   sudo apt-get update
   sudo apt-get install datadog-agent datadog-signing-keys
   ```

1. (선택 사항) Agent 5.17 이상에서 업그레이드하는 경우 기존 Agent 5 구성을 가져옵니다.
   ```shell
   sudo -u dd-agent -- datadog-agent import /etc/dd-agent /etc/datadog-agent
   ```

1. 업그레이드하지 않고 이전 구성을 사용하지 않으려면 예제 구성을 복사하고 Agent를 설치하세요. `MY_API_KEY`를 Datadog API 키로 바꿉니다.
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key: MY_API_KEY/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
   ```
1. Datadog 지역을 구성합니다.
   ```shell
   sudo sh -c "sed -i 's/# site:.*/site: datad0g.com/' /etc/datadog-agent/datadog.yaml"
   ```
1. Agent 사용자의 권한이 올바른지 확인합니다.
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
### 원스텝 설치

원스텝 명령은 Datadog Agent용 YUM 패키지를 설치하고 비밀번호를 묻는 메시지를 표시합니다.
- Agent가 시스템에 아직 설치되어 있지 않고 설치 후 자동으로 시작되지 않도록 하려면 Agent를 실행하기 전에 `DD_INSTALL_ONLY=true`를 명령 앞에 추가하세요.
- 기존 Agent 구성 파일이 있는 경우 업데이트 중에 기존 값이 유지됩니다.
- 초기 설치 프로세스 중에 일부 Agent 옵션을 구성할 수 있습니다. 자세한 내용은 [install_script 구성 옵션][101]을 확인하세요.

1. `MY_API_KEY`를 Datadog API 키로 바꿔서 다음 명령을 실행합니다.
   ```shell
   DD_API_KEY=MY_API_KEY DD_SITE="datad0g.com" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent6.sh)"
   ```

1. For Amazon Linux 2022 installations on Agent version <= 6.39. The Agent requires the `libxcrypt-compat` package:
   ```shell
   dnf install -y libxcrypt-compat
   ```

### Multi-step install

1. On an x86_64 host, set up the Datadog YUM repo by creating `/etc/yum.repos.d/datadog.repo` with the following configuration:
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

1. On an arm64 host, set up the Datadog YUM repo by creating `/etc/yum.repos.d/datadog.repo` with the following configuration:
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

1. If upgrading from Agent 5 or 6, delete the obsolete RPM GPG key:
   ```shell
   sudo sh -c 'if rpm -q gpg-pubkey-4172a230-55dd14f6 >/dev/null; then rpm --erase gpg-pubkey-4172a230-55dd14f6; fi'
   ```

1. Update your local yum repo and install the Agent:
   ```shell
   sudo yum makecache
   sudo yum install datadog-agent
   ```

1. Optionally, if upgrading from Agent 5.17 or higher, import your existing Agent 5 configuration:
   ```shell
   sudo -u dd-agent -- datadog-agent import /etc/dd-agent /etc/datadog-agent
   ```

1. If you're not upgrading and do not want to use an old configuration, copy the example config into place and install the Agent. Replace `MY_API_KEY` with your Datadog API key:
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key: MY_API_KEY/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
   ```

1. Configure the Datadog region:
   ```shell
   sudo sh -c "sed -i 's/# site:.*/site: datad0g.com/' /etc/datadog-agent/datadog.yaml"
   ```
1. Ensure the Agent user's permissions are correct::
   ```shell
   sudo sh -c "chown dd-agent:dd-agent /etc/datadog-agent/datadog.yaml && chmod 640 /etc/datadog-agent/datadog.yaml"
   ```
1. Start the Agent: 
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

{{% tab "CentOS and RedHat" %}}
### One-step install

The one-step command installs the YUM packages for the Datadog Agent and prompts you for your password.
- If the Agent is not already installed on your machine and you don't want it to start automatically after the installation, prepend `DD_INSTALL_ONLY=true` to the command before running it.
- If you have an existing Agent configuration file, existing values are retained during the update.
- You can configure some of the Agent options during the initial install process. For more information, check the [install_script configuration options][101].

Run the following command, replacing `MY_API_KEY` with your Datadog API key:
```shell
DD_UPGRADE=true DD_SITE="datad0g.com" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent6.sh)"
```

### Multi-step install

1. Set up the Datadog YUM repo by creating `/etc/yum.repos.d/datadog.repo` with the following configuration:
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

   **Note**: The `repo_gpgcheck=0` option is a workaround for [a bug in DNF][102].

1. If you're upgrading from Agent 5 or a previous version of Agent 6, delete the obsolete RPM GPG key:
   ```shell
   sudo sh -c 'if rpm -q gpg-pubkey-4172a230-55dd14f6 >/dev/null; then rpm --erase gpg-pubkey-4172a230-55dd14f6; fi'
   ```

1. Update your local yum repo and install the Agent:
   ```shell
   sudo yum makecache
   sudo yum remove datadog-agent-base
   sudo yum install datadog-agent
   ```

1. Optionally, if upgrading from Agent 5.17 or higher, import your existing Agent 5 configuration:
   ```shell
   sudo -u dd-agent -- datadog-agent import /etc/dd-agent /etc/datadog-agent
   ```

1. If you're not upgrading and do not want to use an old configuration, copy the example config into place and install the Agent. Replace `MY_API_KEY` with your Datadog API key:
   ```shell
   sudo sh -c "sudo sh -c "sed 's/api_key:.*/api_key: .*/api_key: MY_API_KEY/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
   ```

1. Configure the Datadog region:
   ```shell
   sudo sh -c "sed -i 's/# site:.*/site: datad0g.com/' /etc/datadog-agent/datadog.yaml"
   ```

1. Ensure the Agent user's permissions are correct::
   ```shell
   sudo sh -c "chown dd-agent:dd-agent /etc/datadog-agent/datadog.yaml && chmod 640 /etc/datadog-agent/datadog.yaml"
   ```

1. Start the Agent: 
   - Centos or Red Hat 7 and higher:
     ```shell
     sudo systemctl restart datadog-agent.service
     ```
   - Centos or Red Hat 6:
     ```shell
     sudo initctl start datadog-agent
     ```

[101]: https://github.com/DataDog/agent-linux-install-script/blob/main/README.md#agent-configuration-options
[102]: https://bugzilla.redhat.com/show_bug.cgi?id=1792506
{{% /tab %}}

{{% tab "Alma, Oracle, and Rocky" %}}
### One-step install

The one-step command installs the YUM packages for the Datadog Agent and prompts you for your password.
- If the Agent is not already installed on your machine and you don't want it to start automatically after the installation, prepend `DD_INSTALL_ONLY=true` to the command before running it.
- If you have an existing Agent configuration file, existing values are retained during the update.
- You can configure some of the Agent options during the initial install process. For more information, check the [install_script configuration options][101].

Run the following command, replacing `MY_API_KEY` with your Datadog API key:
```shell
DD_UPGRADE=true DD_SITE="datad0g.com" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent6.sh)"
```

### Multi-step install

1. Set up the Datadog YUM repo by creating `/etc/yum.repos.d/datadog.repo` with the following configuration:
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

1. If you're upgrading from Agent 5 or a previous version of Agent 6, delete the obsolete RPM GPG key:
   ```shell
   sudo sh -c 'if rpm -q gpg-pubkey-4172a230-55dd14f6 >/dev/null; then rpm --erase gpg-pubkey-4172a230-55dd14f6; fi'
   ```

1. Update your local yum repo and install the Agent:
   ```shell
   sudo yum makecache
   sudo yum remove datadog-agent-base
   sudo yum install datadog-agent
   ```

1. Optionally, if upgrading from Agent 5.17 or higher, import your existing Agent 5 configuration:
   ```shell
   sudo -u dd-agent -- datadog-agent import /etc/dd-agent /etc/datadog-agent
   ```

1. If you're not upgrading and do not want to use an old configuration, copy the example config into place and install the Agent. Replace `MY_API_KEY` with your Datadog API key:
   ```shell
   sudo sh -c "sudo sh -c "sed 's/api_key:.*/api_key: .*/api_key: MY_API_KEY/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
   ```

1. Configure the Datadog region:
   ```shell
   sudo sh -c "sed -i 's/# site:.*/site: datad0g.com/' /etc/datadog-agent/datadog.yaml"
   ```

1. Ensure the Agent user's permissions are correct::
   ```shell
   sudo sh -c "chown dd-agent:dd-agent /etc/datadog-agent/datadog.yaml && chmod 640 /etc/datadog-agent/datadog.yaml"
   ```

1. Restart the Agent: 
   ```shell
   sudo systemctl restart datadog-agent.service
   ```

[101]: https://github.com/DataDog/agent-linux-install-script/blob/main/README.md#agent-configuration-options
{{% /tab %}}

{{% tab "Fedora" %}}
### One-step install

The one-step command installs the YUM packages for the Datadog Agent and prompts you for your password.
- If the Agent is not already installed on your machine and you don't want it to start automatically after the installation, prepend `DD_INSTALL_ONLY=true` to the command before running it.
- If you have an existing Agent configuration file, existing values are retained during the update.
- You can configure some of the Agent options during the initial install process. For more information, check the [install_script configuration options][101].

Run the following command, replacing `MY_API_KEY` with your Datadog API key:
```shell
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh)"
```

### Multi-step install

1. Set up the Datadog YUM repo by creating `/etc/yum.repos.d/datadog.repo` with the following configuration:
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

1. If you're upgrading from Agent 5 or a previous version of Agent 6, delete the obsolete RPM GPG key:
   ```shell
   sudo sh -c 'if rpm -q gpg-pubkey-4172a230-55dd14f6 >/dev/null; then rpm --erase gpg-pubkey-4172a230-55dd14f6; fi'
   ```

1. Update your local yum repo and install the Agent:
   ```shell
   sudo yum makecache
   sudo yum install datadog-agent
   ```

1. Optionally, if upgrading from Agent 5.17 or higher, import your existing Agent 5 configuration:
   ```shell
   sudo -u dd-agent -- datadog-agent import /etc/dd-agent /etc/datadog-agent
   ```

1. If you're not upgrading and do not want to use an old configuration, copy the example config into place and install the Agent. Replace `MY_API_KEY` with your Datadog API key:
   ```shell
   sudo sh -c "sudo sh -c "sed 's/api_key:.*/api_key: .*/api_key: MY_API_KEY/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
   ```

1. Configure the Datadog region:
   ```shell
   sudo sh -c "sed -i 's/# site:.*/site: datad0g.com/' /etc/datadog-agent/datadog.yaml"
   ```

1. Ensure the Agent user's permissions are correct::
   ```shell
   sudo sh -c "chown dd-agent:dd-agent /etc/datadog-agent/datadog.yaml && chmod 640 /etc/datadog-agent/datadog.yaml"
   ```

1. Restart the Agent: 
   ```shell
   sudo systemctl restart datadog-agent.service
   ```

[101]: https://github.com/DataDog/agent-linux-install-script/blob/main/README.md#agent-configuration-options
{{% /tab %}}

{{% tab "Suse" %}}
### One-step install

The one-step command installs the YUM packages for the Datadog Agent and prompts you for your password.
- If the Agent is not already installed on your machine and you don't want it to start automatically after the installation, prepend `DD_INSTALL_ONLY=true` to the command before running it.
- If you have an existing Agent configuration file, existing values are retained during the update.
- You can configure some of the Agent options during the initial install process. For more information, check the [install_script configuration options][101].

Run the following command, replacing `MY_API_KEY` with your Datadog API key:
```shell
DD_API_KEY=MY_API_KEY DD_SITE="datad0g.com" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent6.sh)"
```

### 단계별 설치

1. Set up the Datadog YUM repo by creating `/etc/zypp/repos.d/datadog.repo` with the following configuration:
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

1. If you're upgrading from Agent 5 or a previous version of Agent 6, delete the obsolete RPM GPG key:
   ```shell
   sudo sh -c 'if rpm -q gpg-pubkey-4172a230-55dd14f6 >/dev/null; then rpm --erase gpg-pubkey-4172a230-55dd14f6; fi'
   ```

1. Update your local zypper repo and install the Agent:
   ```shell
   sudo zypper refresh
   sudo rpm --import https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
   sudo rpm --import https://keys.datadoghq.com/DATADOG_RPM_KEY_4F09D16B.public
   sudo rpm --import https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
   sudo rpm --import https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
   sudo rpm --import https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
   sudo zypper install datadog-agent
   ```

1. (선택 사항) Agent 5.17 이상에서 업그레이드하는 경우 기존 Agent 5 구성을 가져옵니다.
   ```shell
   sudo -u dd-agent -- datadog-agent import /etc/dd-agent /etc/datadog-agent
   ```

1. 업그레이드하지 않고 이전 구성을 사용하지 않으려면 예제 구성을 복사하고 Agent를 설치하세요. `MY_API_KEY`를 Datadog API 키로 바꿉니다.
   ```shell
   sudo sh -c "sudo sh -c "sed 's/api_key:.*/api_key: .*/api_key: MY_API_KEY/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
   ```

1. Datadog 지역을 구성합니다
   ```shell
   sudo sh -c "sed -i 's/# site:.*/site: datad0g.com/' /etc/datadog-agent/datadog.yaml"
   ```

1. Agent 사용자의 권한이 올바른지 확인합니다.
   ```shell
   sudo sh -c "chown dd-agent:dd-agent /etc/datadog-agent/datadog.yaml && chmod 640 /etc/datadog-agent/datadog.yaml"
   ```

1. Restart the Agent: 
   ```shell
   sudo systemctl restart datadog-agent.service
   ```

[101]: https://github.com/DataDog/agent-linux-install-script/blob/main/README.md#agent-configuration-options
{{% /tab %}}

{{% tab "AIX" %}}
### 원스텝 설치

The one-step command installs the latest BFF package for the Datadog Agent and prompts you for your password if necessary. Agent가 시스템에 아직 설치되어 있지 않고 설치 후 자동으로 시작되지 않도록 하려면 Agent를 실행하기 전에 `DD_INSTALL_ONLY=true`를 명령 앞에 추가하세요.

`MY_API_KEY`를 Datadog API 키로 바꿔서 다음 명령을 실행합니다.
```shell
DD_API_KEY=MY_API_KEY DD_SITE="datad0g.com" ksh -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-unix-agent/master/scripts/install_script.sh)"
```

### Upgrade from a previous installation

To install the Agent while keeping your existing configuration, run the following command:
```shell
DD_UPGRADE=true DD_SITE="datad0g.com" ksh -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-unix-agent/master/scripts/install_script.sh)"
```

For a full list of the available installation script environment variables, see [Basic Agent Usage for AIX][101].

### 단계별 설치

1. Download the preferred BFF from the [datadog-unix-agent][102] repo releases.

1. Install the artifact as root with `installp`:
   ```shell
   installp -aXYgd datadog-unix-agent-latest.powerpc.aix..bff datadog-unix-agent
   ```

1. If you don't have an existing configuration file, copy the example config into place. Replace `MY_API_KEY` with your Datadog API key:
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key: MY_API_KEY/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
   ```

1. Datadog 지역을 구성합니다
   ```shell
   sudo sh -c "sed \'s/# site:.*/site: datad0g.com/\' /etc/datadog-agent/datadog.yaml > /etc/datadog-agent/datadog.yaml.new && mv /etc/datadog-agent/datadog.yaml.new /etc/datadog-agent/datadog.yaml"
   ```

1. Ensure that the Datadog Agent has the correct permissions:
   ```shell
   sudo sh -c "chown dd-agent:dd-agent /etc/datadog-agent/datadog.yaml && chmod 660 /etc/datadog-agent/datadog.yaml"
   ```

1. Stop the Agent service:
   ```shell
   sudo stopsrc -s datadog-agent
   ```

1. Verify the Agent service has stopped:
   ```
   sudo lssrc -s datadog-agent
   ```

1. Restart the Agent service:
   ```shell
   sudo startsrc -s datadog-agent
   ```

[101]: /ko/agent/basic_agent_usage/aix/#installation
[102]: https://github.com/DataDog/datadog-unix-agent/releases
{{% /tab %}}

{{< /tabs >}}

## Cloud and containers

{{< tabs >}}

{{% tab "Kubernetes" %}}

Run the Datadog Agent directly in your Kubernetes cluster to start collecting your cluster and applications metrics, traces, and logs. You can deploy the Agent with a Helm chart, [the Datadog Operator][101] or directly with [a DaemonSet][102]. For more information about installing the Datadog Agent on different distributions, see the [Kubernetes distributions documentation][103].

### Installing the Datadog Agent

To install the chart with a custom release name `RELEASE_NAME`:

1. [Install Helm][104].
1. Add the Datadog Helm repository:
   ```shell
   helm repo add datadog https://helm.datadoghq.com
   ```

1. Fetch the latest version of newly added charts:
   ```shell
   helm repo update
   ```

1. Create an empty `values.yaml` file, and override any of the [default values][105] if desired. See the [Datadog `helm-charts` repo][106] for examples. 
1. Deploy the Datadog Agent, replacing `MY_API_KEY` with your Datadog API key:
   **With Helm v3+**:
   ```shell
   helm install RELEASE_NAME -f datadog-values.yaml --set datadog.site='datad0g.com' --set agents.image.tag='6' --set datadog.apiKey=MY_API_KEY datadog/datadog
   ```

   **With Helm v1 or v2**:
   ```shell
   helm install -f datadog-values.yaml --name RELEASE_NAME --set datadog.site='datad0g.com' --set agents.image.tag='6' --set datadog.apiKey=MY_API_KEY datadog/datadog
   ```

   This chart adds the Datadog Agent to all nodes in your cluster using a DaemonSet. Soon after installation, Datadog begins to report hosts and metrics data in your account.

### Enabling log collection

To enable log collection with Helm, update your `datadog-values.yaml` file with the following log collection configuration:

```yaml
datadog:
  logs:
    enabled: true
    containerCollectAll: true
```    

Then upgrade your Datadog Helm chart:
```shell
helm upgrade -f datadog-values.yaml RELEASE_NAME datadog/datadog
```

### Enabling trace collection

Follow the dedicated [APM setup documentation][107] to learn how to collect your application traces in a Kubernetes environment.

### Further Reading

For information on available Agent features, see the [Kubernetes documentation][108].

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
### 원스텝 설치

The one-step installation command runs a signed Docker container which embeds the Datadog Agent to monitor your host. The Docker integration is enabled by default, as well as [Autodiscovery][101] in automatic configuration mode.

<div class="alert alert-info">You must not run more than one Datadog Agent per node. Running multiple Agents may result in unexpected behavior.</a></div>

For a one-step install, run the following command. Replace `MY_API_KEY` with your Datadog API key:

On Amazon Linux v2:
```shell
docker run -d --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /cgroup/:/host/sys/fs/cgroup:ro -e DD_API_KEY=MY_API_KEY -e DD_SITE="datad0g.com" gcr.io/datadoghq/agent:6
```

On other operating systems:
```shell
docker run -d --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro -e DD_API_KEY=MY_API_KEY -e DD_SITE="datad0g.com" gcr.io/datadoghq/agent:6
```

#### Troubleshooting

If the one-step installation command does not work, it's possible that your system mounts the `cgroup` directory in an unexpected place or does not use CGroups for memory management. CGroups are required for the Docker check to succeed. To enable CGroups, see [the Setup documentation][102]. 

If CGroups are enabled, but the check is failing because of an unexpected `cgroup` directory location:
1. Run `mount | grep "cgroup type tmpfs"` to retrieve the location of the `cgroup` directory.
1. Replace the first occurrence of `/sys/fs/cgroup` in the one-step installation command with the location of the `cgroup` directory.

### Send custom metrics with DogStatsD

By default, DogStatsD only listens to localhost. To listen to DogStatsD packets from other containers:
1. Add `-e DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true` to the container's parameters. 
1. Bind the container's statsd port to the hosts's IP by adding the `-p 8125:8125/udp` option to the container's parameters.
1. Configure your client library to send UDP packets to the hosts's IP.

### Customize your Agent configuration

- For information on configuring the Agent, see [Docker Agent for Docker, containerd, and Podman][103].
- To tune Autodiscovery, see [Docker Integrations Autodiscovery][104].

[101]: /ko/containers/docker/integrations/?tabs=docker
[102]: /ko/containers/docker/?tab=standard#setup
[103]: /ko/containers/docker/?tab=standard
[104]: /ko/containers/docker/integrations/?tab=docker

{{% /tab %}}

{{% tab "CoreOS" %}}
Running CoreOS Container Linux is supported with the Docker runtime. For installation instructions, see [Docker][1].

To run CoreOS Tectonic on Kubernetes, see [Kubernetes][2].

[1]: ?tab=docker#cloud-and-containers
[2]: ?tab=kubernetes#cloud-and-containers

{{% /tab %}}

{{% tab "OpenShift" %}}
Starting with version 6.1, the Datadog Agent supports monitoring OpenShift Origin and Enterprise clusters. Depending on your needs and the security constraints of your cluster, three deployment scenarios are supported:

- [Restricted SCC operations][101]
- [Host network SCC operations][102]
- [Custom Datadog for all features][103]

To install OpenShift, see the [Kubernetes installation instructions](?tab=kubernetes#cloud-and-containers). The Kubernetes integration targets OpenShift 3.7.0+ by default. For older versions of OpenShift, you must complete additional installation steps. For more information, see the [OpenShift integration documentation][104].

[101]: /ko/integrations/openshift/?tab=helm#restricted-scc-operations
[102]: /ko/integrations/openshift/?tab=helm#host
[103]: /ko/integrations/openshift/?tab=helm#custom-datadog-scc-for-all-features
[104]: /ko/integrations/openshift/?tab=helm#installation
{{% /tab %}}

{{% tab "Cloud Foundry" %}}
<div class="alert alert-info">The Datadog Agent BOSH release only works on Ubuntu and Red Hat stemcells.</a></div>

1. Upload the Datadog Agent release to your BOSH Director:

   ```shell
   # BOSH CLI v1
   bosh upload release https://cloudfoundry.datadoghq.com/datadog-agent/datadog-agent-boshrelease-latest.tgz

   # BOSH CLI v2
   bosh upload-release https://cloudfoundry.datadoghq.com/datadog-agent/datadog-agent-boshrelease-latest.tgz
   ```

2. Configure Datadog as an addon in your runtime config. Replace `MY_API_KEY` with your Datadog API key::

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

3. Add the runtime to your [runtime config][101]:

   ```shell
   # BOSH cli v1
   bosh update runtime-config runtime.yml

   # BOSH cli v2
   bosh update-runtime-config runtime.yml
   ```

4. Redeploy any existing deployments:
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

## Configuration management

{{< tabs >}}
{{% tab "Ansible" %}}

Installing the Agent with Ansible requires Ansible version 2.10 or higher.

<div class="alert alert-info">The Datadog Ansible collection supports most Debian, RHEL-based and SUSE-based Linux distributions, macOS, and Windows.<br></div>

### Prerequisites

#### Windows
Before you can use the Datadog Ansible Collection to manage Windows hosts, you must install the `ansible.windows` collection:
```shell
ansible-galaxy collection install ansible.windows
```

#### openSUSE and SLES

Before you can use the Datadog Ansible Collection to manage openSUSE/SLES hosts, you must install the `community.general` collection:

```shell
ansible-galaxy collection install community.general
```

### Install Datadog

1. Install the Datadog Ansible collection from Ansible Galaxy on your Ansible server:
   ```shell
   ansible-galaxy collection install datadog.dd
   ```
   - The Datadog Ansible collection is also available through the [Red Hat Automation Hub][101] where it is officially certified by Red Hat.
   - Installing the collection is recommended. If needed, you can also install Datadog using the [standalone role][102].

2. To deploy the Datadog Agent on hosts, add the Datadog role and your API key to your playbook. Replace `MY_API_KEY` with your Datadog API key:
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

   To ensure that the Agent can group your hosts together, only use node hostnames that the Datadog Agent is tracking. You can check what hostnames the Agent is tracking using the following command:

   ```shell
   sudo datadog-agent status
   ```

## Specific Agent checks

To use a specific Agent check or integration on one of your nodes, you can use the `datadog_checks` variable. Here is an example for the process check:
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

You can find more examples of the Agent role usage on the GitHub repo for the [standalone role][103].

### Metrics and events

To get metrics and events on Datadog after Ansible runs, see the Ansible callback project's [GitHub page][104].

[101]: https://console.redhat.com/ansible/automation-hub/repo/published/datadog/dd/
[102]: /ko/agent/guide/ansible_standalone_role/#ansible-role-versus-ansible-collection
[103]: https://github.com/DataDog/ansible-datadog/#role-variables
[104]: https://github.com/DataDog/ansible-datadog-callback

{{% /tab %}}
{{% tab "Puppet" %}}
<div class="alert alert-info">Starting with version 2.9.0, the <code>datadog_agent</code> module supports both Windows and Linux nodes. Previous versions of the datadog_agent module only support Linux nodes.</a></div>

## Requirements:
- Requires Puppet Open Source version >= 4.6 or Puppet Enterprise version >= 2016.4

## Install the Agent

1. Install the `datadog_agent` module from the [Puppet Forge][101] on your Puppet server:
   - For fresh installs, run the `module install command`:
     ```shell
     puppet module install datadog-datadog_agent
     ```
   - If the module is already installed, upgrade it:
     ```shell
     puppet module upgrade datadog-datadog_agent
     ```

2. To deploy the Datadog Agent on nodes, add this parametrized class to your manifests. Replace `MY_API_KEY` with your Datadog API key:
   ```puppet
   node "db1.mydomain.com" {
      class { "datadog_agent":
         api_key => "MY_API_KEY",
         datadog_site => "datad0g.com",
         agent_major_version => 6,
      }
   }
   ```

   To ensure that the Agent can group your hosts together, only use node hostnames that the Datadog Agent is tracking. You can check what hostnames the Agent is tracking using the following command:

   ```shell
   sudo datadog-agent status
   ```

3. Enable reporting to Datadog on your Puppet server:
   1. Add the following parameters to `/etc/puppet/puppet.conf`:
      ```conf
      [master]
      report = true
      reports = datadog_reports
      pluginsync = true

      [agent]
      report = true
      pluginsync = true
      ```

   1. In your manifest, add the `puppet_run_reports` option to your Puppet server. For example:
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
1. Run Puppet on your Puppet server to install all necessary dependencies.
1. Restart your Puppet server to begin receiving Puppet data in Datadog.

## Specific Agent checks

To use a specific Agent check or integration on one of your nodes, see the relevant [integration manifest][102] for a code sample. Here is an example for the elasticsearch integration:

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

Refer to the [GitHub repository of the module][103] for more examples and advanced use cases.

[101]: https://forge.puppetlabs.com/modules/datadog/datadog_agent/readme
[102]: https://github.com/DataDog/puppet-datadog-agent/tree/main/manifests/integrations
[103]: https://github.com/DataDog/puppet-datadog-agent

{{% /tab %}}

{{% tab "Chef" %}}

<div class="alert alert-info">Requires Chef version 10.14.x or higher.</a></div>

1. Add the Datadog cookbook:
   - If you are using [Berkshelf][101], add the cookbook to your Berksfile:
      ```shell
      cookbook 'datadog', '~> 4.0'
      ```

   - If you're not using Berkshelf, install the cookbook in to your repository using Knife:
     ```shell
     knife cookbook site install datadog 
     ```

1. Set the Datadog-specific attributes in either a role, environment, or another recipe. Replace `MY_API_KEY` with your Datadog API key:
   ```chef
   node.default['datadog']['api_key'] = "MY_API_KEY"

   # Use an existing application key or create a new one for Chef
   node.default['datadog']['application_key'] = "Generate Application Key"

   # Enable install for Agent version 6
   node.default['datadog']['agent_major_version'] = 6

   # Set the Datadog site
   node.default['datadog']['site'] = "datad0g.com"
   ```

1. Upload the updated cookbook to your Chef server:
   ```shell
   berks upload
   # or
   knife cookbook upload datadog
   knife cookbook list | grep datadog && 
   echo -e "e[0;32mdatadog cookbook - OKe[0m" ||
   echo -e "e[0;31mmissing datadog cookbook - OKe[0m"
   ```

1. Add the cookbook to your node's `run_list` or `role`:
   ```chef
   "run_list": [
    "recipe[datadog::dd-agent]"
   ]
   ```

1. Wait for the next scheduled `chef-client` run.


For more information and examples, see the [Agent GitHub repository][102].

[101]: https://docs.chef.io/workstation/berkshelf/
[102]: https://github.com/DataDog/chef-datadog

{{% /tab %}}

{{% tab "SaltStack" %}}

<div class="alert alert-info">The Datadog Saltstack formula only supports Debian-based and RedHat-based systems.<br><br>
The following instructions add the Datadog formula to the <code>base</code> Salt environment. To add it to another Salt environment, replace references to <code>base</code> with the name of your Salt environment.</div>

<!-- vale Datadog.inclusive = NO -->

### Install using `gitfs_remotes`
1. Install the [Datadog formula][101] in the base environment of your Salt Master node, using the `gitfs_remotes` option in your Salt Master configuration file (by default `/etc/salt/master`):
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

1. Restart your Salt Master service:
   ```shell
   systemctl restart salt-master
   ```
   or 
   ```shell
   service salt-master restart
   ```

### Install by cloning the Datadog formula

1. Clone the [Datadog formula][101] on your Salt Master node:
   ```shell
   mkdir -p /srv/formulas && cd /srv/formulas
   git clone https://github.com/DataDog/datadog-formula.git
   ```
1. Add the cloned formula to the base environment in the `file_roots` of your Salt Master configuration file (by default `/etc/salt/master`):
   ```yaml
   file_roots:
     base:
       - /srv/salt/
       - /srv/formulas/datadog-formula/
   ```

## Deploy the Agent to your hosts

1. Add the Datadog formula to your top file (by default `/srv/salt/top.sls`):
   ```yaml
   base:
     '*':
       - datadog
   ```

1. Add a `datadog.sls` pillar file to your pillar directory (by default `/srv/pillar/`) and add your API key. Replace `MY_API_KEY` with your Datadog API key:
   ```yaml
   datadog:
     config:
       api_key: MY_API_KEY
     install_settings:
       agent_version: <AGENT6_VERSION>
   ```

1. Add the `datadog.sls` pillar file to the top pillar file (by default `/srv/pillar/top.sls`):
   ```yaml
   base:
     '*':
       - datadog
   ```

1. To use a specific Agent check or integration on one of your hosts, you can use the checks variable. Here is an example for the directory integration:
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

Refer to the formula [GitHub repository][101] for logs configuration, check examples, and advanced use cases.
<!-- vale Datadog.inclusive = YES -->
[101]: https://github.com/DataDog/datadog-formula
{{% /tab %}}

{{< /tabs >}}

## Install from source

Follow [the instructions in the Agent GitHub repository][11] to build the Agent 6 `.deb` and `.rpm` packages on Linux with Docker.

Alternatively, you can build the Agent binary for version 6 following the [Getting Started instructions][12].

## Further reading

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