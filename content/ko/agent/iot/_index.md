---
further_reading:
- link: /getting_started/agent/
  tag: 설명서
  text: Agent 시작하기
title: IoT Agent
---

## 개요

Datadog IoT Agent는 IoT 기기와 임베디드 애플리케이션의 모니터링에 최적화된 Agent 버전입니다. IoT Agent를 사용하면 디지털 디스플레이에서 보안 기기에 이르기까지, 이미지 탐지 알고리즘을 실행하는 다양한 기기를 모니터링할 수 있습니다.

## 기능

IoT Agent에는 다음과 같은 시스템 점검이 포함됩니다. IoT 기기의 설정은 다른 유형의 호스트와 동일합니다.

- [시스템][1](CPU, IO, 로드, 메모리, 스왑, 업타임 포함)
- [디스크][2]
- [네트워크][3]
- [Systemd][4]
- [NTP][5]

또한 IoT Agent는 다음을 지원합니다.

- 임베디드 [DogStatsD][6] 서버를 사용하는 커스텀 메트릭 수집
- [테일 파일][7], [TCP/UDP][8], [journald][9]를 사용하는 로그 수집

IoT Agent에는 표준 Agent와 함께 사전 패키징된 Python 인터프리터 및 기타 통합 기능이 포함되어 있지 않습니다. 또한 APM, 실시간 프로세스 모니터링 또는 네트워크 성능 모니터링에 대한 추적도 지원하지 않습니다.

## 구성

### 요건

IoT Agent는 x64, arm64(ARMv8), ARMv7 아키텍처에서 실행 중인 Linux 기기에 DEB 및 RPM 패키지로 사용할 수 있습니다.

#### 리소스

일반적으로 IoT 기기는 클라우드 인프라스트럭처 호스트보다 리소스의 제한이 많습니다. IoT Agent는 최소한의 풋프린트(Footprint)로, 네트워크 대역폭을 가능한 한 적게 소모하도록 설계되었습니다.

구체적인 리소스 요건은 사용 상황에 따라 달라집니다. Datadog에서 진행한 IoT Agent(v7.20) 내부 테스트에서는 다음과 같은 사항을 알 수 있었습니다.

- CPU: 0.5% (2 Intel Xeon VCPU를 사용하는 가상 머신(VM))
- 메모리: 36MB
- 네트워크 대역폭: 237bps 업 / 79bps 다운
- 디스크: 63MB

### 설치

#### 자동

사용 중인 운영 체제와 칩셋 아키텍처에 적합한 IoT Agent를 자동으로 다운로드하여 설치하려면 다음 명령어를 사용하세요.

```shell
DD_API_KEY=<YOUR_DD_API_KEY> DD_SITE="{{< region-param key="dd_site" >}}" DD_AGENT_FLAVOR=datadog-iot-agent bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh)"
```

#### 수동

{{< tabs >}}
{{% tab "DEB" %}}

데비안(Debian) 기반의 운영 체제에서 IoT Agent를 수동 설치하려면 다음 명령어를 실행하세요.

1. `apt`를 업데이트하고 `apt-transport-https`를 설치해 HTTPS로 다운로드하고, `curl`과 `gnupg`를 설치해 서명 키를 얻습니다.
    ```bash
    sudo apt-get update
    sudo apt-get install apt-transport-https curl gnupg
    ```

2. 시스템에 Datadog deb 저장소(리포지터리)를 구성하고 Datadog의 APT 키를 내보내기합니다.
    ```bash
    sudo sh -c "echo 'deb [signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg] https://apt.datadoghq.com/ stable 7' > /etc/apt/sources.list.d/datadog.list"
    sudo touch /usr/share/keyrings/datadog-archive-keyring.gpg

    curl https://keys.datadoghq.com/DATADOG_APT_KEY_CURRENT.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_06462314.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_C0962C7D.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_F14F620E.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_382E94DE.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    ```

3. 우분투(Ubuntu) 14 이하 또는 데비안(Debian) 8 이하 버전을 실행 중이라면 키링을 `/etc/apt/trusted.gpg.d`로 복사하세요.

   ```shell
   sudo cp /usr/share/keyrings/datadog-archive-keyring.gpg /etc/apt/trusted.gpg.d
   ```

4. `apt`를 업데이트하고 IoT Agent를 설치합니다.
    ```shell
    sudo apt-get update
    sudo apt-get install datadog-iot-agent datadog-signing-keys
    ```

5. 설정 샘플을 복사하고, 적절한 API 키를 지정합니다.
    ```shell
    DD_API_KEY=<YOUR_DD_API_KEY> ; sudo sh -c "sed 's/api_key:.*/api_key:$DD_API_KEY/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
    ```

6. Datadog 사이트를 {{< region-param key="dd_site" code="true" >}}로 설정합니다. 기본 설정은 `datadoghq.com`입니다.
    ```shell
    sudo sh -c "sed 's/# site:.*/site: <YOUR_DD_SITE>/' /etc/datadog-agent/datadog.yaml > /etc/datadog-agent/datadog.yaml.new && mv /etc/datadog-agent/datadog.yaml.new /etc/datadog-agent/datadog.yaml
    ```

7. IoT Agent 시작하기:
    ```shell
    sudo systemctl restart datadog-agent.service
    ```

{{% /tab %}}
{{% tab "RPM" %}}

RPM 기반의 운영 체제에서 IoT Agent를 수동 설치하려면 다음 명령어를 실행하세요.

1. 다음의 콘텐츠로 `/etc/yum.repos.d/datadog.repo`를 생성해 시스템에 Datadog의 Yum 저장소를 구성합니다.
    ```
    [datadog]
    name = Datadog, Inc.
    baseurl = https://yum.datadoghq.com/stable/7/<HOST_ARCHITECTURE>
    enabled=1
    gpgcheck=1
    repo_gpgcheck=1
    gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_4F09D16B.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
    ```

    **참조**: [dnf에 버그][1]가 발생하고 있으므로, RHEL/CentOS 8.1에서는 `repo_gpgcheck=1` 대신 `repo_gpgcheck=0`을 사용해주세요.

   `baseurl`는 호스트 OS에 따라 결정됩니다.
    - x86_64 - `https://yum.datadoghq.com/stable/7/x86_64/`
    - arm64 - `https://yum.datadoghq.com/stable/7/aarch64/`
    - ARMv7 - `https://yum.datadoghq.com/stable/7/armv7hl/`

2. 로컬 Yum 저장소를 업데이트하고 Agent를 설치하세요.
    ```shell
    sudo yum makecache
    sudo yum install datadog-iot-agent
    ```

3. 설정 샘플을 복사하고, 적절한 API 키를 지정합니다.
    ```shell
    DD_API_KEY=<YOUR_DD_API_KEY> ; sudo sh -c "sed 's/api_key:.*/api_key:$DD_API_KEY/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
    ```

4. Datadog 사이트를 {{< region-param key="dd_site" code="true" >}}로 설정합니다. 기본은 `datadoghq.com`입니다.
    ```shell
    sudo sh -c "sed 's/# site:.*/site: <YOUR_DD_SITE>/' /etc/datadog-agent/datadog.yaml > /etc/datadog-agent/datadog.yaml.new && mv /etc/datadog-agent/datadog.yaml.new /etc/datadog-agent/datadog.yaml
    ```

5. IoT Agent 시작하기:
    ```shell
    sudo systemctl restart datadog-agent.service
    ```

[1]: https://bugzilla.redhat.com/show_bug.cgi?id=1792506
{{% /tab %}}
{{< /tabs >}}

## CLI

IoT Agent는 동일한 [CLI 명령어][10]를 표준 Agent로 지원합니다.

## 삭제

```shell
sudo apt-get remove datadog-iot-agent -y
```

이 명령어를 사용하면 Agent가 삭제되나, 다음은 삭제되지 않습니다.

* `datadog.yaml` 설정 파일
* `/etc/datadog-agent` 설정 폴더에서 사용자가 생성한 파일
* `/opt/datadog-agent` 폴더에서 사용자가 생성한 파일
* `dd-agent` 사용자

이러한 요소까지 삭제하고자 하시는 분은 다음의 명령어를 사용하세요.

```shell
sudo apt-get remove --purge datadog-iot-agent -y
```

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/integrations/system
[2]: /ko/integrations/disk
[3]: /ko/integrations/network
[4]: /ko/integrations/systemd
[5]: /ko/integrations/ntp
[6]: /ko/developers/dogstatsd
[7]: /ko/agent/logs/?tab=tailfiles#custom-log-collection
[8]: /ko/agent/logs/?tab=tcpudp#custom-log-collection
[9]: /ko/agent/logs/?tab=journald#custom-log-collection
[10]: /ko/agent/basic_agent_usage/#cli
