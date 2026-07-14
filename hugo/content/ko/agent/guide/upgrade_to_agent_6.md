---
aliases:
- /ko/agent/faq/upgrade-to-agent-v6
- /ko/agent/versions/upgrade_to_agent_v6/
- /ko/agent/guide/upgrade-to-agent-v6
private: true
title: Agent v6으로 업그레이드
---

<div class="alert alert-info">
에이전트 v7을 사용할 수 있습니다. <a href="/agent/versions/upgrade_to_agent_v7">최신 버전으로 업그레이드하여</a> 모든 새로운 기능을 활용하세요.
</div>

## Agent 6으로 업그레이드

Agent v5가 이미 설치되어 있는 경우, 새 Agent를 자동으로 설치하거나 업그레이드할 수 있는 스크립트를 사용할 수 있습니다. 이 스크립트는 패키지 리포지토리를 설정하고 Agent 패키지를 자동으로 설치합니다. 업그레이드 시, 가져오기 도구는 이전 버전에서 기존 `datadog.conf`를 검색하고 Agent를 변환하며 새 v6 형식에 따라 구성을 확인합니다. 아래에서 플랫폼을 선택하면 구체적인 가이드를 확인할 수 있습니다. [DMG 패키지를 다운로드하여 수동으로 설치](#manual-upgrade)하거나 [한 줄 설치 스크립트](#one-step-upgrade)를 사용할 수 있습니다.

## 원스텝 업그레이드

{{< tabs >}}
{{% tab "Linux" %}}

Agent v6 설치 프로그램은 업그레이드 중에 v5 구성을 자동으로 변환할 수 있습니다.

다음 명령은 Amazon Linux, CentOS, Debian, Fedora, Red Hat, Ubuntu, SUSE에서 작동합니다.`DD_UPGRADE=true bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent6.sh)"`

**참고:** 가져오기 프로세스는 **커스텀** Agent 점검을 자동으로 이동하지 않습니다. 이는 의도된 동작이며, Datadog은 기본적으로 완전한 하위 호환성을 보장하지 않습니다.

{{% /tab %}}
{{% tab "Windows" %}}

Windows 플랫폼에는 단계별 설치가 없습니다. [수동 업그레이드](#manual-upgrade)를 참고하세요.

{{% /tab %}}
{{% tab "MacOS" %}}

Agent v6 설치 프로그램은 업그레이드 중에 v5 구성을 자동으로 변환할 수 있습니다.

```shell
DD_UPGRADE=true bash -c "$(curl -L https://install.datadoghq.com/scripts/install_mac_os.sh)"
```

**참고:** 가져오기 프로세스는 **커스텀** Agent 점검을 자동으로 이동하지 않습니다. 이는 의도된 동작이며, Datadog은 기본적으로 완전한 하위 호환성을 보장하지 않습니다.

{{% /tab %}}
{{< /tabs >}}

## 수동 업그레이드

{{< tabs >}}
{{% tab "Linux" %}}

아래에서 수동 업그레이드 가이드를 확인하세요.

- [Agent 6으로 업그레이드](#upgrade-to-agent-6)
- [원스텝 업그레이드](#one-step-upgrade)
- [수동 업그레이드](#manual-upgrade)
  - [Amazon Linux](#amazon-linux)
  - [CentOS](#centos)
  - [Debian](#debian)
  - [Fedora](#fedora)
  - [Red Hat](#red-hat)
  - [Ubuntu](#ubuntu)
  - [SUSE](#suse)

### Amazon Linux

1. 다음의 콘텐츠로 `/etc/yum.repos.d/datadog.repo`를 생성해 시스템에 Datadog의 Yum 저장소를 구성합니다.
    ```ini
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

2. 로컬 Yum 리포지토리를 업데이트하고 Agent를 설치합니다.
    ```shell
    sudo yum makecache
    sudo yum install datadog-agent
    ```

3. 예제 구성을 해당 위치에 복사한 뒤, API 키를 입력합니다.
    ```shell
    sudo sh -c "sed 's/api_key:.*/api_key: <YOUR_API_KEY>/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
    ```

4. `import` 명령을 사용하여 Agent 구성 경로와 형식을 Agent v5에서 Agent v6로 전환합니다. 이 명령은 기존 v5 `datadog.conf`를 파싱하고, 구성 옵션을 새로운 v6 `datadog.yaml` 형식으로 변환합니다. 또한 현재 활성화된 점검의 구성 파일도 복사합니다.
    ```shell
    sudo -u dd-agent -- datadog-agent import /etc/dd-agent/ /etc/datadog-agent/
    ```

5. Agent를 (다시) 시작합니다.

    * Amazon Linux 2.0:
    ```shell
    sudo systemctl restart datadog-agent.service
    ```

    * Amazon Linux 1.0:
    ```shell
    sudo initctl start datadog-agent
    ```

### CentOS

1. 다음의 콘텐츠로 `/etc/yum.repos.d/datadog.repo`를 생성해 시스템에 Datadog의 Yum 저장소를 구성합니다.
    ```ini
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

   **참고**: [dnf에서 버그][1]가 발생하므로 CentOS 8.1에서는 `repo_gpgcheck=1` 대신 `repo_gpgcheck=0`을 사용하세요.

2. 로컬 Yum 리포지토리를 업데이트하고 Agent를 설치합니다.
    ```shell
    sudo yum makecache
    sudo yum remove datadog-agent-base
    sudo yum install datadog-agent
    ```

3. 예제 구성을 해당 위치에 복사한 뒤, API 키를 입력합니다.
    ```shell
    sudo sh -c "sed 's/api_key:.*/api_key: <YOUR_API_KEY>/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
    ```

4. `import` 명령을 사용하여 Agent 구성 경로와 형식을 Agent v5에서 Agent v6로 전환합니다. 이 명령은 기존 v5 `datadog.conf`를 파싱하고 구성 옵션을 새로운 v6 `datadog.yaml` 형식으로 변환합니다. 또한 현재 활성화된 점검의 구성 파일도 복사합니다.
    ```shell
    sudo -u dd-agent -- datadog-agent import /etc/dd-agent/ /etc/datadog-agent/
    ```

5. Agent를 재시작합니다.

    * Centos 7 이상:
    ```shell
    sudo systemctl restart datadog-agent.service
    ```

    * Centos 6:
    ```shell
    sudo initctl restart datadog-agent
    ```

### Debian

1. APT의 HTTPS 지원을 활성화하고 `curl` 및 `gnupg`를 설치합니다.
    ```shell
    sudo apt-get update
    sudo apt-get install apt-transport-https curl gnupg
    ```

2. 시스템에 Datadog API 리포지토리를 설정하고 Datadog의 APT 키를 가져옵니다.
    ```shell
    sudo sh -c "echo 'deb [signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg] https://apt.datadoghq.com/ stable 6' > /etc/apt/sources.list.d/datadog.list"
    sudo touch /usr/share/keyrings/datadog-archive-keyring.gpg

    curl https://keys.datadoghq.com/DATADOG_APT_KEY_CURRENT.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_06462314.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_C0962C7D.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_F14F620E.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_382E94DE.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    ```

3. Debian 8 이하를 실행하는 경우 키링을 `/etc/apt/trusted.gpg.d`에 복사하세요.

   ```shell
   sudo cp /usr/share/keyrings/datadog-archive-keyring.gpg /etc/apt/trusted.gpg.d
   ```

4. 로컬 APT 캐시를 업데이트하고 Agent를 설치합니다.
    ```shell
    sudo apt-get update
    sudo apt-get install datadog-agent datadog-signing-keys
    ```

5. 예제 구성을 해당 위치에 복사한 뒤, API 키를 입력합니다.
    ```shell
    sudo sh -c "sed 's/api_key:.*/api_key: <YOUR_API_KEY>/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
    ```

6. `import` 명령을 사용하여 Agent 구성 경로와 형식을 Agent v5에서 Agent v6로 전환합니다. 이 명령은 기존 v5 `datadog.conf`를 파싱하고 구성 옵션을 새로운 v6 `datadog.yaml` 형식으로 변환합니다. 또한 현재 활성화된 점검의 구성 파일도 복사합니다.
    ```shell
    sudo -u dd-agent -- datadog-agent import /etc/dd-agent/ /etc/datadog-agent/
    ```

7. Agent를 시작합니다.
    ```shell
    sudo service datadog-agent start
    ```

### Fedora

1. 다음의 콘텐츠로 `/etc/yum.repos.d/datadog.repo`를 생성해 시스템에 Datadog의 Yum 저장소를 구성합니다.
    ```ini
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

2. 로컬 Yum 리포지토리를 업데이트하고 Agent를 설치합니다.
    ```shell
    sudo yum makecache
    sudo yum remove datadog-agent-base
    sudo yum install datadog-agent
    ```

3. 예제 구성을 해당 위치에 복사한 뒤, API 키를 입력합니다.
    ```shell
    sudo sh -c "sed 's/api_key:.*/api_key: <YOUR_API_KEY>/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
    ```

4. `import` 명령을 사용하여 Agent 구성 경로와 형식을 Agent v5에서 Agent v6로 전환합니다. 이 명령은 기존 v5 `datadog.conf`를 파싱하고 구성 옵션을 새로운 v6 `datadog.yaml` 형식으로 변환합니다. 또한 현재 활성화된 점검의 구성 파일도 복사합니다.
    ```shell
    sudo -u dd-agent -- datadog-agent import /etc/dd-agent/ /etc/datadog-agent/
    ```

5. 에이전트 재시작
    ```shell
    sudo systemctl restart datadog-agent.service
    ```

### Red Hat

1. 다음의 콘텐츠로 `/etc/yum.repos.d/datadog.repo`를 생성해 시스템에 Datadog의 Yum 저장소를 구성합니다.
    ```ini
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

   **참고**: [dnf에서 버그][1]가 발생하므로 RHEL 8.1에서는 `repo_gpgcheck=1` 대신 `repo_gpgcheck=0`을 사용하세요.

2. 로컬 Yum 리포지토리를 업데이트하고 Agent를 설치하세요.
    ```shell
    sudo yum makecache
    sudo yum remove datadog-agent-base
    sudo yum install datadog-agent
    ```

3. 예제 구성을 해당 위치에 복사한 뒤, API 키를 입력하세요
    ```shell
    sudo sh -c "sed 's/api_key:.*/api_key: <YOUR_API_KEY>/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
    ```

4. `import` 명령을 사용하여 Agent 구성 경로와 형식을 Agent v5에서 Agent v6로 전환합니다. 이 명령은 기존 v5 `datadog.conf`를 파싱하고 구성 옵션을 새로운 v6 `datadog.yaml` 형식으로 변환합니다. 또한 현재 활성화된 점검의 구성 파일도 복사합니다.
    ```shell
    sudo -u dd-agent -- datadog-agent import /etc/dd-agent/ /etc/datadog-agent/
    ```

5. Agent를 재시작합니다.

    * Red Hat 7 이상:
    ```shell
    sudo systemctl restart datadog-agent.service
    ```

    * Red Hat 6:
    ```shell
    sudo initctl restart datadog-agent
    ```

### Ubuntu

1. APT에 대한 HTTPS 지원을 활성화하고 `curl` 및 `gnupg`를 설치합니다.
    ```shell
    sudo apt-get update
    sudo apt-get install apt-transport-https curl gnupg
    ```

2. 시스템에 Datadog API 리포지토리를 설정하고 Datadog의 APT 키를 가져옵니다.
    ```shell
    sudo sh -c "echo 'deb [signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg] https://apt.datadoghq.com/ stable 6' > /etc/apt/sources.list.d/datadog.list"
    sudo touch /usr/share/keyrings/datadog-archive-keyring.gpg

    curl https://keys.datadoghq.com/DATADOG_APT_KEY_CURRENT.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_06462314.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_C0962C7D.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_F14F620E.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_382E94DE.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    ```

3. Ubuntu 14 이하를 실행하는 경우 키링을 `/etc/apt/trusted.gpg.d`에 복사하세요.

   ```shell
   sudo cp /usr/share/keyrings/datadog-archive-keyring.gpg /etc/apt/trusted.gpg.d
   ```

4. 로컬 APT 캐시를 업데이트하고 Agent를 설치합니다.
    ```shell
    sudo apt-get update
    sudo apt-get install datadog-agent datadog-signing-keys
    ```

5. 예제 구성을 해당 위치에 복사한 뒤, API 키를 입력합니다.
    ```shell
    sudo sh -c "sed 's/api_key:.*/api_key: <YOUR_API_KEY>/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
    ```

6. `import` 명령을 사용하여 Agent 구성 경로와 형식을 Agent v5에서 Agent v6로 전환합니다. 이 명령은 기존 v5 `datadog.conf`를 파싱하고, 구성 옵션을 새로운 v6 `datadog.yaml` 형식으로 변환합니다. 또한 현재 활성화된 점검의 구성 파일도 복사합니다.
    ```shell
    sudo -u dd-agent -- datadog-agent import /etc/dd-agent/ /etc/datadog-agent/
    ```

7. Agent를 시작합니다.

    * Ubuntu 16.04 이상:
    ```shell
    sudo systemctl start datadog-agent
    ```

    * Ubuntu 14.04 이하:
    ```shell
    sudo initctl start datadog-agent
    ```

### SUSE

1. 다음과 같이 `/etc/zypp/repos.d/datadog.repo`를 생성하여 Datadog의 Yum 리포지토리를 시스템에 설정합니다.
  ```ini
  [datadog]
  name=Datadog, Inc.
  enabled=1
  baseurl=https://yum.datadoghq.com/suse/stable/6/x86_64
  type=rpm-md
  gpgcheck=1
  repo_gpgcheck=1
  gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
         https://keys.datadoghq.com/DATADOG_RPM_KEY_4F09D16B.public
         https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
         https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
         https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
  ```

2. 로컬 Zypper 리포지토리를 업데이트하고 Agent를 설치합니다.
  ```shell
  sudo zypper refresh
  sudo rpm --import https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
  sudo rpm --import https://keys.datadoghq.com/DATADOG_RPM_KEY_4F09D16B.public
  sudo rpm --import https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
  sudo rpm --import https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
  sudo rpm --import https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
  sudo zypper install datadog-agent
  ```

3. 예제 구성을 해당 위치에 복사한 뒤, API 키를 입력합니다.
  ```shell
  sudo sh -c "sed 's/api_key:.*/api_key: <YOUR_API_KEY>/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
  ```

4. `import` 명령을 사용하여 Agent 구성 경로와 형식을 Agent v5에서 Agent v6로 전환합니다. 이 명령은 기존 v5 `datadog.conf`를 파싱하고 구성 옵션을 새로운 v6 `datadog.yaml` 형식으로 변환합니다. 또한 현재 활성화된 점검의 구성 파일도 복사합니다.
    ```shell
    sudo -u dd-agent -- datadog-agent import /etc/dd-agent/ /etc/datadog-agent/
    ```

5. Agent를 재시작합니다.
  ```shell
  sudo systemctl restart datadog-agent.service
  ```

[1]: https://bugzilla.redhat.com/show_bug.cgi?id=1792506
{{% /tab %}}
{{% tab "Windows" %}}

[사용 가능한 최신 버전][1]을 다운로드하고 설치 패키지를 실행합니다.

`import` 명령을 사용하여 Agent 구성 경로와 형식을 Agent v5에서 Agent v6로 전환합니다. 이 명령은 기존 v5 `datadog.conf`를 파싱하고, 구성 옵션을 새로운 v6 `datadog.yaml` 형식으로 변환합니다. 또한 현재 활성화된 점검의 구성 파일도 복사합니다.

`datadog-agent import <OLD_CONFIGURATION_DIRECTORY> <DESTINATION_DIRECTORY>`

설명:

* `<OLD_CONFIGURATION_DIRECTORY>`는 `datadog.conf` 파일을 포함하는 디렉터리입니다.
* `<DESTINATION_DIRECTORY>`는 가져온 `datadog.yaml`이 작성되는 디렉터리입니다( `<OLD_CONFIGURATION_DIRECTORY>`와 같은 디렉터리를 사용할 수 있습니다).

**참고**: 업그레이드 시 `datadog.conf`는 `datadog.yaml`로 자동으로 업그레이드됩니다.

[1]: https://s3.amazonaws.com/ddagent-windows-stable/datadog-agent-6-latest.amd64.msi
{{% /tab %}}
{{% tab "MacOS" %}}

1. 최신 Agent 버전의 DMG 패키지를 다운로드하세요. 리포지토리의 [릴리스 페이지][9]의 목록에 있는 최신 macOS 릴리스를 사용하세요.
2. DMG 패키지를 설치합니다.
3. API 키를 `/opt/datadog-agent/etc/datadog.yaml`에 추가합니다.
4. `import` 명령을 사용하여 Agent 구성 경로와 형식을 Agent v5에서 Agent v6로 전환합니다. 이 명령은 기존 v5 `datadog.conf`를 파싱하고 구성 옵션을 새로운 v6 `datadog.yaml` 형식으로 변환합니다. 또한 현재 활성화된 점검의 구성 파일도 복사합니다.
    `datadog-agent import /opt/datadog-agent/etc/ /opt/datadog-agent/etc/`

그런 다음 Datadog Agent 애플리케이션을 시작하고(시작하면 시스템 트레이에 표시됩니다) Agent를 관리할 수 있습니다. Agent v6에는 Agent 구성 파일 등을 편집할 수 있는 웹 기반 GUI가 포함되어 있습니다.

https://github.com/DataDog/datadog-agent/releases

{{% /tab %}}
{{< /tabs >}}