---
aliases:
- /ko/agent/faq/agent-downgrade
kind: faq
title: 에이전트를 이전 주 버전으로 다운그레이드
---

## 에이전트를 버전 7에서 버전 6로 다운그레이드

{{< tabs >}}
{{% tab "리눅스(Linux)" %}}

먼저 [시스템에서 에이전트 버전 7 제거][1]를 선택합니다.

그런 다음 [버전 6에서 버전 7로 업그레이드][2]의 지시에 따라 다음 에이전트 설치 명령을 실행하여 에이전트를 버전 7에서 버전 6으로 다운그레이드합니다:

```shell
DD_API_KEY="<DATADOG_API_KEY>" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent6.sh)"
```

이 명령은 지원되는 모든 버전의 아마존 리눅스, CentOS, 데비안(Debian), 페도라(Fedora), 레드햇(Red Hat), 우분투(Ubuntu) 및 SUSE에서 작동합니다.

[1]: /ko/agent/guide/how-do-i-uninstall-the-agent/
[2]: /ko/agent/versions/upgrade_to_agent_v6/
{{% /tab %}}
{{% tab "윈도우즈(Windows)" %}}

1. [시스템에서 에이전트 버전 7 제거합니다][1].
2. [Datadog 에이전트 설치 관리자 다운로드합니다][2].
3. `datadog-agent-6-latest.amd64.msi`를 열어 설치 관리자(**Administrator**)를 실행합니다.
4. 지시에 따라 라이센스 계약에 동의한 후 [Datadog API 키][3]를 입력합니다.
5. 설치가 완료되면 Datadog 에이전트 관리자를 시작할 수 있는 옵션이 제공됩니다.

**참고**: 사용 가능한 모든 버전의 윈도우즈(Windows) 설치자에 대한 링크는 [JSON 형식][4]으로 제공됩니다.

[1]: /ko/agent/guide/how-do-i-uninstall-the-agent/
[2]: https://ddagent-windows-stable.s3.amazonaws.com/datadog-agent-6-latest.amd64.msi
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://s3.amazonaws.com/ddagent-windows-stable/installers.json
{{% /tab %}}
{{% tab "MacOS" %}}

먼저 [시스템에서 에이전트 버전 7 제거][1]를 선택합니다.

그런 다음 지침에 따라 [버전 6에서 버전 7로 업그레이드][2]한 경우 `DD_AGENT_MAJOR_VERSION=6`환경 변수와 함께 에이전트 설치 명령을 실행하여 에이전트를 버전 7에서 버전 6으로 다운그레이드합니다:

```shell
DD_AGENT_MAJOR_VERSION=6 DD_API_KEY="<DATADOG_API_KEY>" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_mac_os.sh)"
```

[1]: /ko/agent/guide/how-do-i-uninstall-the-agent/
[2]: /ko/agent/versions/upgrade_to_agent_v6/
{{% /tab %}}
{{< /tabs >}}

## 에이전트를 버전 6에서 버전 5로 다운그레이드

이 가이드는 [업그레이드 안내서][1]을 사용하여 에이전트 버전 6로 업그레이드한 것으로 가정합니다. OS를 선택하여 에이전트를 버전 6에서 버전 5로 다운그레이드하는 방법에 대한 자세한 지침서를 확인하세요:

{{< tabs >}}
{{% tab "리눅스(Linux)" %}}

**데비안 선호 시스템**:

1. https를 통해 다운로드하여 `curl` 및 `gnupg`를 설치할 수 있도록 apt를 설정합니다

    ```shell
    sudo apt-get update
    sudo apt-get install apt-transport-https curl gnupg
    ```

2. 베타 레포를 제거하고 안정된 레포가 있는지 확인합니다:

    ```shell
    sudo rm /etc/apt/sources.list.d/datadog-beta.list
    [ ! -f /etc/apt/sources.list.d/datadog.list ] &&  echo 'deb [signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg] https://apt.datadoghq.com/ stable main' | sudo tee /etc/apt/sources.list.d/datadog.list
    sudo touch /usr/share/keyrings/datadog-archive-keyring.gpg

    curl https://keys.datadoghq.com/DATADOG_APT_KEY_CURRENT.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_C0962C7D.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_F14F620E.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_382E94DE.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    ```

3. 우분투(Ubuntu) 14 이하 또는 데비안(Debian) 8 이하 버전을 실행 중이라면 키링을 `/etc/apt/trusted.gpg.d`로 복사하세요.

   ```shell
   sudo cp /usr/share/keyrings/datadog-archive-keyring.gpg /etc/apt/trusted.gpg.d
   ```

4. 적절한 업데이트 및 에이전트 다운그레이드:

    ```shell
    sudo apt-get update
    sudo apt-get remove datadog-agent
    sudo apt-get install datadog-agent
    ```

5. 백업 동기화 설정 및 자동탐지 템플릿(선택사항)

   설정 또는 템플릿을 변경한 경우 에이전트 버전 5에 대해 이러한 템플릿을 다시 동기화할 수 있습니다.

   **참고**: 에이전트 버전 6 전용 옵션을 지원하도록 설정을 변경한 경우 에이전트 버전 5에서는 작동하지 않습니다.

6. 백싱크 커스텀 점검(선택사항):

   에이전트 6을 테스트하는 동안 변경하거나 새 커스텀 점검을 추가한 경우 에이전트 5에서 다시 실행할 수 있습니다. **참고**: 변경한 검사만 복사하면 됩니다.

    ```shell
    sudo -u dd-agent -- cp /etc/datadog-agent/checks.d/<CHECK>.py /etc/dd-agent/checks.d/
    ```

7. 에이전트 시작하기:

    ```shell
    sudo systemctl restart datadog-agent # Systemd
    sudo /etc/init.d/datadog-agent restart # Upstart
    ```

8. `/etc/datadog-agent`정리(선택사항):

    ```shell
    sudo -u dd-agent -- rm -rf /etc/datadog-agent/
    ```

**레드햇*Red Hat) 선호 시스템**:

1. 시스템에서 베타 Yum 레포를 제거합니다:

    ```shell
    rm /etc/yum.repos.d/datadog-beta.repo
    [ ! -f /etc/yum.repos.d/datadog.repo ] && echo -e '[datadog]\nname = Datadog, Inc.\nbaseurl = https://yum.datadoghq.com/rpm/x86_64/   \nenabled=1\ngpgcheck=1\nrepo_gpgcheck=1\npriority=1\ngpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public\n       https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public\n       https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public\n       https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public' | sudo tee /etc/yum.repos.d/datadog.repo
    ```

    **참조**: [dnf에 버그][1]가 발생하고 있으므로, RHEL/CentOS 8.1에서는 `repo_gpgcheck=1` 대신 `repo_gpgcheck=0`을 사용해주세요.

2. 로컬 yum 캐시를 업데이트하고 에이전트를 다운그레이드합니다

    ```shell
    sudo yum clean expire-cache metadata
    sudo yum check-update
    sudo yum remove datadog-agent
    sudo yum install datadog-agent
    ```

3. 백업 동기화 설정 및 자동탐지 템플릿(선택사항)

   설정 또는 템플릿을 변경한 경우 에이전트 버전 5에 대해 이러한 템플릿을 다시 동기화할 수 있습니다.

   **참고**: 에이전트 버전 6 전용 옵션을 지원하도록 설정을 변경한 경우 에이전트 버전 5에서는 작동하지 않습니다.

4. 백싱크 커스텀 점검(선택사항):

   에이전트 6을 테스트하는 동안 변경하거나 새 커스텀 점검을 추가한 경우 에이전트 5에서 다시 실행할 수 있습니다. **참고**: 변경한 검사만 복사하면 됩니다.

    ```shell
    sudo -u dd-agent -- cp /etc/datadog-agent/checks.d/<CHECK>.py /etc/dd-agent/checks.d/
    ```

5. 에이전트 시작하기:

    ```shell
    sudo systemctl restart datadog-agent # Systemd
    sudo /etc/init.d/datadog-agent restart # Upstart
    ```

6. `/etc/datadog-agent`정리(선택사항):

    ```shell
    sudo -u dd-agent -- rm -rf /etc/datadog-agent/
    ```

[1]: https://bugzilla.redhat.com/show_bug.cgi?id=1792506
{{% /tab %}}
{{% tab "윈도우즈(Windows)" %}}

최신 5.x 버전의 에이전트 설치 관리자 패키지를 실행하면 
[Datadog 에이전트 통합 페이지][1]에서 지침을 확인할 수 있습니다.

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=windows
{{% /tab %}}
{{% tab "MacOS" %}}

1. 실행 중인 경우 systray 앱으로 에이전트를 중지합니다.
2. systray 앱을 종료합니다.
3. Datadog 에이전트 애플리케이션을 제거합니다.
4. 원하는 설치 방법을 사용하여 에이전트 5 DMG 패키지를 설치합니다.

{{% /tab %}}
{{< /tabs >}}

[1]: /ko/agent/guide/upgrade-to-agent-v6/