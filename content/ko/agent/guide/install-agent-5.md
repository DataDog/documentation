---
further_reading:
- link: /agent/basic_agent_usage/
  tag: 설명서
  text: 기본 에이전트 사용
title: Datadog 에이전트 5 설치
---

이 가이드에서는 에이전트 5를 설치하는 방법을 안내합니다. Datadog에서는 최신 기능을 사용하기 위해 에이전트 7을 설치하거나 에이전트 7로 업그레이드하기를 권고합니다. 에이전트 최신 버전 설치에 관한 자세한 정보는 [에이전트 7 설치 지침][1]을 따르세요. 이전 버전에서 에이전트 7로 업그레이드하는 방법에 관한 자세한 정보는 [Datadog 에이전트 v7][2]를 참고하세요.

## macOS

### 에이전트 설치

#### 명령줄

`MY_API_KEY`를 내 Datadog API 키로 변경한 후 다음 명령을 실행하세요.
{{< code-block lang="shell" >}}
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/osx/install.sh)"
{{< /code-block >}}


에이전트를 관리하려면 `datadog-agent` 명령을 사용하세요. 기본적으로 `datadog-agent` 이진은 `/usr/local/bin`에 위치합니다. `/opt/datadog-agent/etc/conf.d`에서 통합을 활성화하거나 비활성화할 수 있습니다.

#### GUI

1. [DMG 패키지][3]를 다운로드하고 설치합니다.
1. `/opt/datadog-agent/etc/datadog.conf`에 다음 줄을 추가하고 `MY_API_KEY`를 내 Datadog API 키로 변경합니다.
   {{< code-block lang="shell" >}}
api_key:MY_API_KEY
{{< /code-block >}}

에이전트를 관리하려면 시스템 트레이에 있는 Datadog 에이전트 앱을 사용하세요. `/opt/datadog-agent/etc/conf.d`에서 통합을 활성화하거나 비활성화할 수 있습니다.

### 에이전트 실행 동작

기본값은 로그인하면 에이전트가 바로 실행됩니다. 시스템 트레이에서 Datadog 에이전트 앱을 사용해 이를 비활성화할 수 있습니다. 부팅할 때 에이전트를 실행하고 싶으면 다음 명령을 사용하세요.
{{< code-block lang="shell" >}}
sudo cp '/opt/datadog-agent/etc/com.datadoghq.agent.plist' /Library/LaunchDaemons
sudo launchctl load -w /Library/LaunchDaemons/com.datadoghq.agent.plist
{{< /code-block >}}

## Windows

### 에이전트 설치

#### GUI

Datadog 에이전트 설치 프로그램을 다운로드하고 실행합니다.
- [64비트 설치 프로그램][4].
- [32비트 설치 프로그램][5]. 32비트 설치는 에이전트 버전 5.10.1까지만 지원됩니다.

사용 가능한 모든 버전의 Windows 설치 프로그램 링크는 [JSON 형식으로 제공됩니다][6].

#### 명령줄

1. 에이전트를 다운로드합니다.
   - 새롭게 설치하는 경우에는 [Datadog 에이전트 설치 프로그램][4]을 다운로드하세요.
   - Datadog 에이전트 버전 >5.12.0에서 업그레이드하는 경우에는 [EXE 설치 방법][7]을 사용하세요.
1. `cmd.exe` 셸에서 설치 프로그램을 다운로드 받은 디렉터리에 다음 명령을 실행하세요. `MY_API_KEY`를 내 Datadog API 키로 변경하세요.
   {{< code-block lang="shell" >}}
start /wait msiexec /qn /i ddagent-cli-latest.msi APIKEY="MY_API_KEY"
{{< /code-block >}}
   (선택 사항) `TAG`와 `HOSTNAME` 값을 추가하세요.

#### Azure에 배포

에이전트를 Azure에 설치하려면 [Microsoft Azure 설명서][8]를 따르세요.

### 5.12용 새 업그레이드 절차

Windows 에이전트 5.12 이전 버전을 사용하는 기존 고객의 경우, 디바이스를 업그레이드해야 하는 추가 단계가 있을 수 있습니다. 구체적으로는 최신 에이전트를 "기기별"로 설치해야 합니다. 이전 에이전트 버전의 경우에는 기본값이 "사용자별"로 설치였습니다. Chef를 사용해 배포하는 경우에도 추가 단계가 필요할 수 있습니다. 자세한 정보는 [Windows 에이전트 설치][9]를 참고하세요.

## Linux 및 Unix

{{< tabs >}}

{{% tab "Debian" %}}
### 원스텝 설치

원스텝 명령을 사용하면 Datadog 에이전트의 APT 패키지를 설치하고 패스워드 입력 프롬프트가 나타납니다. 기기에 에이전트를 아직 설치하지 않았고 설치 후 Datadog가 바로 시작되지 않도록 하려면 실행하기 전에 명령 앞에 `DD_INSTALL_ONLY=true`를 추가하세요.

다음 명령을 실행합니다. `MY_API_KEY`를 내 Datadog API 키로 변경하세요.
```shell
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh)"
```

### 멀티 스텝 설치

1. HTTPS를 통해 다운로드하고 `curl` 및 `gnupg`를 설치할 수 있도록 APT를 설정합니다.
   ```shell
   sudo apt-get update
   sudo apt-get install apt-transport-https curl gnupg
   ```
1. 내 시스템에 Datadog Debian 레포를 구성하고 Datadog 아카이브 인증 키를 생성합니다.
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
1. Debian 8 이전 버전을 실행하는 경우 인증 키를 `/etc/apt/trusted.gpg.d`에 복사합니다.
   ```shell
   sudo cp -a /usr/share/keyrings/datadog-archive-keyring.gpg /etc/apt/trusted.gpg.d/
   ```

1. 로컬 APT 레포를 업데이트하고 에이전트를 설치하세요.
   ```shell
   sudo apt-get update
   sudo apt-get install datadog-agent datadog-signing-keys
   ```

1. 다음 명령을 실행하고 config 예시를 복사하여 적절한 필드에 붙여넣으세요. `MY_API_KEY`를 내 Datadog API 키로 변경하세요.
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key:MY_API_KEY /' /etc/dd-agent/datadog.conf.example > /etc/dd-agent/datadog.conf"
   ```

1. 에이전트를 시작합니다.
   ```shell
   sudo /etc/init.d/datadog-agent start
   ```

{{% /tab %}}

{{% tab "Ubuntu" %}}
### 원스텝 설치

원스텝 명령을 사용하면 Datadog 에이전트의 APT 패키지를 설치하고 패스워드 입력 프롬프트가 나타납니다. 기기에 에이전트를 아직 설치하지 않았고 설치 후 Datadog가 바로 시작되지 않도록 하려면 실행하기 전에 명령 앞에 `DD_INSTALL_ONLY=true`를 추가하세요.

다음 명령을 실행합니다. `MY_API_KEY`를 내 Datadog API 키로 변경하세요.
```shell
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh)"
```

### 멀티 스텝 설치

1. HTTPS를 통해 다운로드하고 `curl` 및 `gnupg`를 설치할 수 있도록 APT를 설정합니다.
   ```shell
   sudo apt-get update
   sudo apt-get install apt-transport-https curl gnupg
   ```
1. 내 시스템에 Datadog Debian 레포를 구성하고 Datadog 아카이브 인증 키를 생성합니다.
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
1. Debian 8 이전 버전을 실행하는 경우 인증 키을 `/etc/apt/trusted.gpg.d`에 복사합니다.
   ```shell
   sudo cp -a /usr/share/keyrings/datadog-archive-keyring.gpg /etc/apt/trusted.gpg.d/
   ```

1. 로컬 APT 레포를 업데이트하고 에이전트를 설치하세요.
   ```shell
   sudo apt-get update
   sudo apt-get install datadog-agent datadog-signing-keys
   ```

1. 다음 명령을 실행하고 config 예시를 복사하여 적절한 필드에 붙여넣으세요. `MY_API_KEY`를 내 Datadog API 키로 변경하세요.
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key:MY_API_KEY /' /etc/dd-agent/datadog.conf.example > /etc/dd-agent/datadog.conf"
   ```

1. 에이전트를 시작합니다.
   ```shell
   sudo /etc/init.d/datadog-agent start
   ```

{{% /tab %}}

{{% tab "Amazon Linux" %}}
### 원스텝 설치

원스텝 명령을 사용하면 Datadog 에이전트의 YUM 패키지를 설치하고 패스워드 입력 프롬프트가 나타납니다. 기기에 에이전트를 아직 설치하지 않았고 설치 후 Datadog가 바로 시작되지 않도록 하려면 실행하기 전에 명령 앞에 `DD_INSTALL_ONLY=true`를 추가하세요.

다음 명령을 실행합니다. `MY_API_KEY`를 내 Datadog API 키로 변경하세요.
```shell
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh)"
```

### 멀티 스텝 설치

1. 다음 내용으로 `/etc/yum.repos.d/datadog.repo`를 생성해 Datadog YUM 레포를 설정합니다.
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

1. 로컬 Yum 레포를 업데이트하고 에이전트를 설치하세요.
   ```shell
   sudo yum makecache
   sudo yum install datadog-agent
   ```
1. 예시 config를 적절한 필드에 붙여넣으세요. `MY_API_KEY`를 내 Datadog API 키로 변경하세요.
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key:MY_API_KEY /' /etc/dd-agent/datadog.conf.example > /etc/dd-agent/datadog.conf"
   ```

1. 에이전트를 시작합니다.
   ```shell
   sudo /etc/init.d/datadog-agent restart
   ```
{{% /tab %}}

{{% tab "CentOS 및 Red Hat" %}}
### 원스텝 설치

원스텝 명령을 사용하면 Datadog 에이전트의 YUM 패키지를 설치하고 패스워드 입력 프롬프트가 나타납니다. 기기에 에이전트를 아직 설치하지 않았고 설치 후 Datadog가 바로 시작되지 않도록 하려면 실행하기 전에 명령 앞에 `DD_INSTALL_ONLY=true`를 추가하세요.

다음 명령을 실행합니다. `MY_API_KEY`를 내 Datadog API 키로 변경하세요.
```shell
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh)"
```

### 멀티 스텝 설치

1. 다음 내용으로 `/etc/yum.repos.d/datadog.repo`를 생성해 Datadog YUM 레포를 설정합니다.
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

1. 로컬 YUM 레포를 업데이트하고 에이전트를 설치합니다.
   ```shell
   sudo yum makecache
   sudo yum remove datadog-agent-base 
   sudo yum install datadog-agent
   ```
1. 예시 config를 적절한 필드에 붙여넣으세요. `MY_API_KEY`를 내 Datadog API 키로 변경하세요.
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key:MY_API_KEY /' /etc/dd-agent/datadog.conf.example > /etc/dd-agent/datadog.conf"
   ```

1. 에이전트를 시작합니다.
   ```shell
   sudo /etc/init.d/datadog-agent restart
   ```
{{% /tab %}}

{{% tab "Fedora" %}}
### 원스텝 설치

원스텝 명령을 사용하면 Datadog 에이전트의 YUM 패키지를 설치하고 패스워드 입력 프롬프트가 나타납니다. 기기에 에이전트를 아직 설치하지 않았고 설치 후 Datadog가 바로 시작되지 않도록 하려면 실행하기 전에 명령 앞에 `DD_INSTALL_ONLY=true`를 추가하세요.

다음 명령을 실행합니다. `MY_API_KEY`를 내 Datadog API 키로 변경하세요.
```shell
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh)"
```

### 멀티 스텝 설치

1. 다음 내용으로 `/etc/yum.repos.d/datadog.repo`를 생성해 Datadog YUM 레포를 설정합니다.
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

1. 로컬 YUM 레포를 업데이트하고 에이전트를 설치합니다.
   ```shell
   sudo yum makecache
   sudo yum install datadog-agent
   ```
1. 예시 config를 적절한 필드에 붙여넣으세요. `MY_API_KEY`를 내 Datadog API 키로 변경하세요.
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key:MY_API_KEY /' /etc/dd-agent/datadog.conf.example > /etc/dd-agent/datadog.conf"
   ```

1. 에이전트를 시작합니다.
   ```shell
   sudo /etc/init.d/datadog-agent restart
   ```
{{% /tab %}}

{{% tab "Suse" %}}
### 원스텝 설치

원스텝 명령을 사용하면 Datadog 에이전트의 YUM 패키지를 설치하고 패스워드 입력 프롬프트가 나타납니다. 기기에 에이전트를 아직 설치하지 않았고 설치 후 Datadog가 바로 시작되지 않도록 하려면 실행하기 전에 명령 앞에 `DD_INSTALL_ONLY=true`를 추가하세요.

다음 명령을 실행합니다. `MY_API_KEY`를 내 Datadog API 키로 변경하세요.
```shell
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh)"
```

### 멀티 스텝 설치

1. 다음 내용으로 `/etc/yum.repos.d/datadog.repo`를 생성해 Datadog YUM 레포를 설정합니다.
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

1. 로컬 zypper 레포를 업데이트하고 에이전트를 설치합니다.
   ```shell
   sudo zypper refresh
   sudo zypper install datadog-agent
   ```
1. 예시 config를 적절한 필드에 붙여넣으세요. `MY_API_KEY`를 내 Datadog API 키로 변경하세요.
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key: MY_API_KEY/' /etc/dd-agent/datadog.conf.example > /etc/dd-agent/datadog.conf"
   ```

1. 에이전트를 시작합니다.
   ```shell
   sudo /etc/init.d/datadog-agent restart
   ```
{{% /tab %}}

{{% tab "AIX" %}}
### 원스텝 설치

원스텝 명령을 사용하면 Datadog 에이전트의 최신 BFF 패키지를 설치하고 필요한 경우 패스워드 프롬프트가 나타납니다. 기기에 에이전트를 아직 설치하지 않았고 설치 후 Datadog가 바로 시작되지 않도록 하려면 실행하기 전에 명령 앞에 `DD_INSTALL_ONLY=true`를 추가하세요.

다음 명령을 실행합니다. `MY_API_KEY`를 내 Datadog API 키로 변경하세요.
```shell
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh)"
```

### 이전 설치에서 업그레이드

기존 구성을 유지하면서 에이전트를 설치하려면 다음 명령을 실행하세요.
```shell
DD_UPGRADE=true ksh -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-unix-agent/master/scripts/install_script.sh)"
```

사용할 수 있는 설치 스크립트 환경 변수 전체 목록을 보려면 [AIX용 기본 에이전트 사용][1]을 참고하세요.

### 멀티 스텝 설치

1.  [datadog-unix-agent][2] 레포 릴리스에서 원하는 BFF를 다운로드 받으세요.
1. `installp`를 사용해 아티팩트를 루트로 설치합니다.
   ```shell
   installp -aXYgd datadog-unix-agent-latest.powerpc.aix..bff datadog-unix-agent
   ```
1. 기존 구성 파일이 있는 경우에는 예시 config를 복사해 적절한 필드에 붙여넣으세요. `MY_API_KEY`를 내 Datadog API 키로 변경하세요.
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key: MY_API_KEY/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
   ```
1. Datadog 에이전트에 올바른 권한이 있는지 확인:
   ```shell
   sudo sh -c "chown dd-agent:dd-agent /etc/datadog-agent/datadog.yaml && chmod 660 /etc/datadog-agent/datadog.yaml"
   ```
1. 에이전트 서비스를 중단:
   ```shell
   sudo stopsrc -s datadog-agent
   ```
1. 에이전트 서비스가 중단되었는지 확인:
   ```
   sudo lssrc -s datadog-agent
   ```
1. 에이전트 서비스 재시작:
   ```shell
   sudo startsrc -s datadog-agent
   ```

[1]: /ko/agent/basic_agent_usage/aix/#installation
[2]: https://github.com/DataDog/datadog-unix-agent/releases
{{% /tab %}}

{{< /tabs >}}

## 클라우드 및 컨테이너

{{< tabs >}}
{{% tab "쿠버네티스" %}}
## 에이전트 설치
### DaemonSets로 설치

쿠버네티스 >=1.1.0을 실행하는 중이라면 [DaemonSets][1]를 사용해 Datadog 에이전트를 내 모든 노드에 배포할 수 있습니다.

1. API 키를 포함하는 비밀을 생성하세요. 이 비밀은 매니페스트에서 Datadog 에이전트를 배포하는 데 사용됩니다. `MY_API_KEY`를 내 Datadog API 키로 변경하세요.
   ```shell
   kubectl create secret generic datadog-secret --from-literal api-key =" MY_API_KEY"
   ```

1. 이름이 `dd-agent.yaml`인 다음 매니페스트를 생성하세요.

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

<div class="alert alert-info">이는 자동탐지의 자동 설정 기능을 활성화하는 매니페스트입니다. 자동 설정을 비활성화하려면 <code>SD_BACKEND</code> 환경 변수 정의를 제거하세요. 자동탐지를 구성하는 방법을 알아보려면 <a href="https://docs.datadoghq.com/containers/kubernetes/integrations/?tab=kubernetesadv2">쿠버네티스 통합 자동탐지</a>를 참고하세요.</div>

### 에이전트를 Docker 컨테이너로 실행

사용하는 쿠버네티스 버전이 1.1.0 이상이 아니거나 DaemonSets를 사용하고 싶지 않은 경우에는 에이전트를 모니터링하고 싶은 각 노드에 Docker 컨테이너로 실행하세요. 다음 명령을 실행하고 `MY_API_KEY`를 내 Datadog API 키로 변경하세요.

```shell
docker run -d --name dd-agent -h `hostname` -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro -e API_KEY=MY_API_KEY -e KUBERNETES=yes -e SD_BACKEND=docker gcr.io/datadoghq/docker-dd-agent:latest
```

## 커스텀 메트릭 전송

DogStatsD를 사용해 [커스텀 메트릭][2]을 전송하려면 다음을 따르세요.
1. 매니페스트의 `ports` 섹션에 `hostPort`를 추가해 컨테이너의 StatsD 포트를 노드 IP 주소에 바인딩하세요.
   ```yaml
   ports:
     - containerPort: 8125
       hostPort: 8125
       name: dogstatsdport
       protocol: UDP
   ```

1. UDP 패킷을 노드 IP로 전송하도록 클라이언트 라이브러리를 구성합니다. 브리지 네트워킹을 사용하는 경우 애플리케이션 컨테이너의 기본 게이트웨이가 노드 IP와 일치합니다. 또 하향 API를 사용해 노드의 호스트 이름을 환경 변수로 노출할 수도 있습니다. 

## 에이전트 구성 사용자 지정

에이전트 구성을 사용자 지정하려면 에이전트 5 [docker-dd-agent][3] 레포에 있는 설명서를 참고하세요. 자동탐지 구성을 조정하려면 [쿠버네티스 통합 자동탐지][4]를 참고하세요. 자동탐지를 비활성화하려면 매니페스트에서 `SD_BACKEND` 환경 변수를 제거하세요.

메트릭 수집, 서비스 점검, 이벤트에 관한 정보는 [쿠버네티스 통합][5] 설명서를 참고하세요.

[1]: https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/
[2]: /ko/metrics/custom_metrics
[3]: https://github.com/DataDog/docker-dd-agent
[4]: /ko/containers/kubernetes/integrations/?tab=kubernetesadv2
[5]: /ko/integrations/kubernetes/

{{% /tab %}}

{{% tab "Docker" %}}
### 원스텝 설치

원스텝 설치를 실행하면 Docker 컨테이너가 설치되고, 여기에 Datadog 에이전트의 호스트 모니터링이 포함되어 있습니다. 또 Docker 통합과 자동 config 모드의 자동탐지가 기본적으로 활성화되어 있습니다. 자동탐지를 비활성화하려면 원스텝 설치 명령에서 `SD_BACKEND`를 제거하세요.

#### Ansible
다음 명령을 실행합니다. `MY_API_KEY`를 내 Datadog API 키로 변경하세요.
```shell
docker run -d --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /cgroup/:/host/sys/fs/cgroup:ro -e API_KEY=MY_API_KEY -e SD_BACKEND=docker gcr.io/datadoghq/docker-dd-agent:latest
```

#### 기타 운영체제
다음 명령을 실행합니다. `MY_API_KEY`를 내 Datadog API 키로 변경하세요.
```shell
docker run -d --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro -e API_KEY=MY_API_KEY -e SD_BACKEND=docker gcr.io/datadoghq/docker-dd-agent:latest
```

#### 트러블슈팅

원스텝 설치 명령이 작동하지 않으면 시스템에서 `cgroup` 디렉터리를 예상치 못한 곳에 연결했거나 메모리 관리에 CGroup을 사용하고 있지 않을 수 있습니다. Docker 점검을 하려면 CGroup이 필요합니다. Cgroup을 사용하려면 [docker-dd-agent][1] 레포에 있는 설명서를 참고하세요. 예상치 못한 `cgroup` 디렉터리 위치로 인해 점검이 실패하는 경우에는 다음을 따르세요.

1. `mount | grep "cgroup type tmpfs"`를 실행해 `cgroup` 디렉터리 위치를 얻습니다.
1. 원스텝 설치 명령에서 나오는 첫 번째 `/sys/fs/cgroup`를 `cgroup` 디렉터리 위치로 변경합니다.

### 커스텀 메트릭 전송

DogStatsD를 사용해 커스텀 메트릭을 전송하는 방법:
1. 설치 명령에 `-p 8125:8125/udp` 옵션을 추가합니다. 이는 컨테이너의 StatsD 포트를 호스트 IP 주소에 바인딩합니다.
1. 클라이언트 라이브러리를 구성해 UDP 패킷을 호스트 IP 주소에 전송합니다.

### 에이전트 구성 사용자 지정

에이전트 구성을 사용자 지정하려면 에이전트 5 [docker-dd-agent][2] 레포에 있는 설명서를 참고하세요. 자동탐지 구성을 조정하려면 [Docker 통합 자동탐지][3]를 참고하세요. 자동탐지를 비활성화하려면 원스텝 설치 명령에서 `SD_BACKEND` 환경 변수를 제거하세요.

[1]: https://github.com/DataDog/docker-dd-agent?tab=readme-ov-file#cgroups
[2]: https://github.com/DataDog/docker-dd-agent
[3]: https://docs.datadoghq.com/ko/containers/docker/integrations/?tabs=docker

{{% /tab %}}

{{% tab "CoreOS" %}}
Docker 런타임으로 CoreOS Container Linux를 실행할 수 있습니다. 설치 지침은 [Docker][1]에서 볼 수 있습니다.

쿠버네티스에서 CoreOS Tectonic을 실행하려면 [쿠버네티스][2]를 참고하세요.

[1]: ?tab=docker#cloud-and-containers
[2]: ?tab=kubernetes#cloud-and-containers

{{% /tab %}}

{{% tab "OpenShift" %}}
OpenShift로 Datadog를 실행하는 방법은 [datadog-openshift][1] 레포를 참고하세요.

[1]: https://github.com/DataDog/datadog-openshift

{{% /tab %}}

{{% tab "Cloud Foundry" %}}
<div class="alert alert-info">Datadog 에이전트 BOSH 릴리스는 Ubuntu와 Red Hat 스템셀에서만 작동합니다.</a></div>

1. Datadog 에이전트 릴리스를 BOSH Director에 업로드합니다.

   ```shell
   # BOSH CLI v1
   bosh upload release https://cloudfoundry.datadoghq.com/datadog-agent/datadog-agent-boshrelease-latest.tgz

   # BOSH CLI v2
   bosh upload-release https://cloudfoundry.datadoghq.com/datadog-agent/datadog-agent-boshrelease-latest.tgz
   ```

2. 런타임 config에서 Datadog를 애드온으로 구성합니다. `MY_API_KEY`를 내 Datadog API 키로 변경하세요.

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

3. 런타임 config에 런타임을 추가합니다.

   ```shell
   # BOSH cli v1
   bosh update runtime-config runtime.yml

   # BOSH cli v2
   bosh update-runtime-config runtime.yml
   ```

4. 기존 배포를 다시 배포합니다.
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

<div class="alert alert-info">Datadog Ansible 컬렉션은 Debian, RHEL 기반 및 SUSE 기반 Linux 배포, macOS, Windows를 대부분 지원합니다.<br> Ansible 버전 2.10 이상이 필요합니다.</div>

### 필수 요구 사항

#### Windows
Datadog Ansible Collection을 사용해 Windows 호스트를 관리하기 전에 `ansible.windows` 컬렉션을 먼저 설치해야 합니다.
```shell
ansible-galaxy collection install ansible.windows
```

#### openSUSE 및 SLES

Datadog Ansible Collection을 사용해 openSUSE/SLES 호스트를 관리하기 전에 `community.general` 컬렉션을 먼저 설치해야 합니다.

```shell
ansible-galaxy collection install community.general
```

### Datadog 설치

1. Ansible Galaxy를 사용해 Ansible 서버에 Datadog Ansible 컬렉션을 설치합니다.
   ```shell
   ansible-galaxy collection install datadog.dd
   ```
   - Datadog Ansible 컬렉션은 공식 Red Hat 인증 허브인 [Red Hat Automation Hub][1]에서도 사용할 수 있습니다. 
   - 컬렉션을 설치하는 것이 좋습니다. 필요한 경우 [독립형 역할][2]을 사용해 Datadog를 설치할 수도 있습니다.

2. 호스트에서 Datadog 에이전트를 배포하려면 Datadog 역할과 API 키를 플레이북에 추가하세요. `MY_API_KEY`를 내 Datadog API 키로 변경하세요.
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

   에이전트가 호스트를 함께 그룹화할 수 있도록 Datadog 에이전트가 추적 중인 노드 호스트 이름만 사용하세요. 에이전트가 추적 중인 호스트 이름을 확인하려면 다음 명령을 사용하세요.

   ```shell
   service datadog-agent info
   ```

## 특정 에이전트 점검

노드에 특정 에이전트 점검이나 통합을 사용하려면 `datadog_checks` 변수를 사용할 수 있습니다. 다음은 프로세스 점검 예시입니다.
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

Github 레포에 있는 [독립형 역할][3]에서 에이전트 역할 사용과 관련한 예시를 더 보실 수 있습니다.

### 메트릭 및 이벤트

Ansible 실행 후 Datadog에서 메트릭과 이벤트를 얻으려면 Ansible 콜백 프로젝트의 [Github 페이지][4]를 참고하세요.

[1]: https://console.redhat.com/ansible/automation-hub/repo/published/datadog/dd/
[2]: /ko/agent/guide/ansible_standalone_role/#ansible-role-versus-ansible-collection
[3]: https://github.com/DataDog/ansible-datadog/#role-variables
[4]: https://github.com/DataDog/ansible-datadog-callback

{{% /tab %}}
{{% tab "Puppet" %}}
<div class="alert alert-info"><code>datadog_agent</code> 모듈은 Linux 노드만 지원합니다.<br> Puppet 에이전트 버전 2.7 이상이 필요합니다.</a></div>

1. Puppet의 [Puppet Forge][1]에서 `datadog_agent` 모듈을 설치하세요.
   - 새롭게 설치하는 경우에는 `module install command`를 실행하세요.
     ```shell
     puppet module install datadog-datadog_agent
     ```
   - 모듈이 이미 설치되어 있다면 업그레이드하세요.
     ```shell
     puppet module upgrade datadog-datadog_agent
     ```

2. Datadog 에이전트를 노드에 배포하려면 다음 파라미터화된 클래스를 매니페스트에 추가하세요. `MY_API_KEY`를 내 Datadog API 키로 변경하세요.
   ```puppet
   node "db1.mydomain.com" {
      class { "datadog_agent":
         api_key => "MY_API_KEY"
      }
   }
   ```

   에이전트가 호스트를 함께 그룹화할 수 있도록 Datadog 에이전트가 추적 중인 노드 호스트 이름만 사용하세요. 에이전트가 추적 중인 호스트 이름을 확인하려면 다음 명령을 사용하세요.

   ```shell
   service datadog-agent info
   ```

3. Puppet 서버에서 Datadog로 보고 활성화
   1. `/etc/puppet/puppet.conf`를 다음 파라미터에 추가하세요.
      ```conf
      [master]
      report = true
      reports = datadog_reports
      pluginsync = true

      [agent]
      report = true
      pluginsync = true
      ```
   1. 매니페스트에서 Puppet 서버에 `puppet_run_reports` 옵션을 추가하세요. 다음 예를 참고하세요.
      ```puppet
      node "puppet" {
         class { "datadog_agent":
            api_key            => "MY_API_KEY",
            puppet_run_reports => true
            }
      }
      ```
1. Puppet 서버에서 Puppet을 실행해 필요한 종속성을 모두 설치하세요.
1. Puppet 서버를 다시 시작하면 Datadog에서 Puppet 데이터를 수신하기 시작합니다.

## 특정 에이전트 점검

노드에서 특정 에이전트 점검이나 통합을 사용하려면 [통합 매니페스트][2]에서 관련 코드 예시를 참고하세요. 다음은 elasticsearch 통합의 예시입니다.

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

<div class="alert alert-info">Chef 버전 10.14x 이상이 필요합니다.</a></div>

1. Datadog 쿡북을 추가합니다.
   - [Berkshelf][1]를 사용한다면 Berksfile에 쿡북을 추가하세요.
      ```shell
      cookbook 'datadog'
      ```

   - Berkshelf를 사용하지 않는 경우 Knife를 사용해 내 리포지토리에 쿡북을 설치하세요.
     ```shell
     knife cookbook site install datadog 
     ```

1. 역할, 환경, 또는 다른 레시피에 Datadog용 속성을 설정하세요. `MY_API_KEY`를 내 Datadog API 키로 변경하세요.
   ```chef
   node.default['datadog']['api_key'] = "MY_API_KEY"
   # Use an existing application key or create a new one for Chef
   node.default['datadog']['application_key'] = "Generate Application Key"
   ```

1. Chef 서버에 업데이트된 쿡북을 업로드합니다.
   ```shell
   berks upload
   # or
   knife cookbook upload datadog
   knife cookbook list | grep datadog && 
   echo -e "e[0;32mdatadog cookbook - OKe[0m" ||
   echo -e "e[0;31mmissing datadog cookbook - OKe[0m"
   ```

1. 노드의 `run_list`나 `role`에 쿡북을 추가하세요.
   ```chef
   "run_list": [
    "recipe[datadog::dd-agent]"
   ]
   ```

1. 다음 예약된 `chef-client` 실행을 기다립니다.

[1]: https://docs.chef.io/workstation/berkshelf/

{{% /tab %}}

{{% tab "SaltStack" %}}

<div class="alert alert-info">Datadog Saltstack 포뮬러는 Debian 기반 및 Redhat 기반 시스템만 지원합니다.<br><br>
다음은 Datadog 포뮬러를 기본 Salt 환경에 추가하는 방법입니다. 다른 Salt 환경에 추가하려면 <code>기본</code>에서 참조를 내 Salt 환경 이름으로 바꾸세요.</div>

<!-- vale Datadog.inclusive = NO -->

### `gitfs_remotes`를 사용해 설치
1. 내 Salt Master 노드 기본 환경에서 Salt Master 구성 파일(기본값 `/etc/salt/master`)에 있는 `gitfs_remotes` 옵션을 사용해 [Datadog 포뮬러][1]를 설치하세요.
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

1. Salt Master 서비스를 재시작합니다.
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
1. Salt Master 구성 파일(기본값 `/etc/salt/master`)의 `file_roots`에 있는 기본 환경에 복제한 포뮬러를 추가합니다.
   ```yaml
   file_roots:
     base:
       - /srv/salt/
       - /srv/formulas/datadog-formula/
   ```

## 에이전트를 호스트에 배포

1. Datadog 포뮬러를 상위 파일(기본값 `/srv/salt/top.sls`)에 추가합니다.
   ```yaml
   base:
     '*':
       - datadog
   ```

1. `datadog.sls` 필러 파일을 필러 디렉터리(기본값 `/srv/pillar/`)에 추가하고 API 키를 추가합니다. `MY_API_KEY`를 내 Datadog API 키로 변경하세요.
   ```yaml
   datadog:
     config:
       api_key: MY_API_KEY
     install_settings:
       agent_version: <AGENT5_VERSION>
   ```

1. `datadog.sls` 필러 파일을 상위 필러 파일(기본값 `/srv/pillar/top.sls`)에 추가하세요.
   ```yaml
   base:
     '*':
       - datadog
   ```

1. 호스트에 특정 에이전트 점검이나 통합을 사용하려면 점검 변수를 사용할 수 있습니다. 다음은 디렉터리 통합 예시입니다.
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

로그 구성, 점검 예시, 고급 사용 사례를 보려면 [Github 리포지토리][1]를 참고하세요.
<!-- vale Datadog.inclusive = YES -->
[1]: https://github.com/DataDog/datadog-formula
{{% /tab %}}

{{< /tabs >}}

## 소스에서 설치

<div class="alert alert-info">Datadog 에이전트를 사용하려면 Linux에 Python 2.7과 <code>sysstat</code>이 필요합니다.</div>

원스텝 소스 설치 스크립트를 사용하세요. `MY_API_KEY`를 내 Datadog API 키로 변경하세요.
```shell
DD_API_KEY=MY_API_KEY sh -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/setup_agent.sh)"
``` 

이 스크립트는 에이전트를  `~/.datadog-agent`에 위치한 자체 포함 샌드박스에 설치합니다. 

영구적으로 설치하려면 `init` daemon을 설정하고 현재 실행 중인 디렉터리에서 `$sandbox_dir`를 설정한 후 `$sandbox_dir/bin/agent`를 실행하세요. 샌드박스 디렉터리는 이식 가능하고 파일 시스템에 있는 모든 위치에서 실행 가능합니다. 샌드박스 디렉터리는 기본값으로 `~/.datadog-agent`로 설정되어 있습니다.

## 참고 자료

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
