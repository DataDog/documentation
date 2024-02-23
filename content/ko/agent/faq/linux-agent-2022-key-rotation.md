---
aliases:
- /ko/agent/guide/linux-agent-2022-key-rotation
kind: 가이드
private: true
title: 2022 Linux 에이전트 키 회전
---

Datadog에서는 Datadog의 에이전트 패키지에 서명하는 데 사용되는 키와 인증서를 주기적으로 회전해 일반적인 모범 사례로 운영합니다. 에이전트 RPM 및 DEB 패키지에 서명하는 데 사용되는 아래 GPG 키는 2022년 6월에 사용이 종료되고 2022년 4월에 회전됩니다.

- 해시 [`A4C0B90D7443CF6E4E8AA341F1068E14E09422B3`][1]이 있는 RPM 서명 키는 2022년 4월 11일 UTC 12:00에 회전되고 해시 [`C6559B690CA882F023BDF3F63F4D1729FD4BF915`][2]가 있는 키로 교체됩니다. 해당 날짜(6.36 및 7.36) 이후에 출시된 첫 RPM의 경우 새 키가 있어야 신뢰를 얻고 설치할 수 있습니다.
- 해시 [`A2923DFF56EDA6E76E55E492D3A80E30382E94DE`][3]가 있는 DEB 서명 키는 2022년 5월 2일 UTC 12:00에 회전되고 해시 [`D75CEA17048B9ACBF186794B32637D44F14F620E`][4]가 있는 키로 교체됩니다. APT에서 레포 메타데이터 서명을 점검하기 때문에 이 날짜까지 새 키를 신뢰해야 `apt.datadoghq.com`에서 에이전트의 향후 버전이나 기존 버전을 설치할 수 있습니다.

Datadog의 RPM이나 DEB 패키지를 사용하는 고객의 경우, 회전 후에 시스템에 새 키를 가져와 에이전트를 설치하거나 업그레이드하려면 이를 수동으로 작업해야 할 수 있습니다.

<div class="alert alert-info">
<strong>참고</strong>: "
이미 실행 중인 에이전트의 기능에는 영향을 미치지 않으며, 최신 버전의 에이전트를 설치하거나 업그레이드할 때만 해당 됩니다. 또 도커화된 Linux 에이전트, Windows나 macOS 에이전트에도 영향을 주지 않습니다.
</div>

## 새 GPG 키를 자동으로 신뢰하도록 하는 설치 방법

다음 설치 방법의 하나를 사용하면 호스트가 새 키를 자동으로 신뢰합니다(추가 작업 불필요).

- [에이전트 설치 스크립트][5] 버전 1.6.0+(2021년 7월 26일 출시)
- [Chef 쿡북][6] 버전 4.11.0+(2021년 8월 10일 출시)
- [Ansible 역할][7] 버전 4.10.0+(2021년 5월 25일 출시)
- [Puppet 모듈][8] 버전 3.13.0+(2021년 8월 11일 출시)
- [SaltStack Formula][9] 버전 3.4+(2021년 8월 12일 출시)
- [Heroku 빌드팩][10] 버전 1.26+(2021년 5월 26일 출시)
- [Elastic Beanstalk][11] 2021년 3월 29일 이후 업데이트된 구성 템플릿(`gpgkey`아래 `DATADOG_RPM_KEY_FD4BF915.public`을 포함해야 함)
- 컨테이너화된 에이전트(Docker/Kubernetes) 모든 버전
- Windows/MacOS 에이전트 모든 버전

또 `apt.datadoghq.com` 리포지토리에서 `apt`을 통해 DEB 에이전트 버전 6.35.1+이나 버전 7.35.1+ 패키지를 설치하면 [`datadog-signing-keys`패키지](#datadog-signing-keys-package) 버전 1.1.0이 설치되어 호스트가 새 키를 자동으로 신뢰하게 됩니다. `datadog-signing-keys`버전 1.1.0 이상이 설치되어 있으면 추가 작업이 필요하지 않습니다. 이전 버전인 [버전 1.1.0](#datadog-signing-keys-version-110) `datadog-signing-keys`버전에서는 키 회전이 보장되지 않습니다.

다른 리포지토리에서 DEB 에이전트 패키지를 설치하거나 `apt`를 사용하지 않는 경우(또는 레포지토리 메타데이터 서명을 확인하는 유사 도구) 시스템에서 Datadog 서명 키를 확인할 필요가 없습니다(추가 작업 불필요). 이 경우, [`datadog-signing-keys`패키지](#the-datadog-signing-keys-package)의 장점을 사용할 수 있습니다.

호스트가 새 서명 키를 신뢰하는지 확실하지 않은 경우 [점검](#check-if-a-host-trusts-the-new-gpg-key)할 수 있습니다.

위에 안내된 설치 방법이나 DEB 패키지의 이전 버전을 실행하는 호스트의 경우 설치 방법을 최신 버전으로 업데이트하는 것이 좋습니다. 또는 Debian이나 Ubuntu 사용자는 에이전트를 7.31.0+ 버전으로 업데이트할 수 있습니다. 또는 키를 [수동으로 업데이트](#manual-update)할 수 있습니다.

## 새 키가 회전되기 전에 신뢰를 확인하지 않으면 어떻게 되나요?

새 키를 신뢰하지 않고 `apt.datadoghq.com`/`yum.datadoghq.com`에서 `apt`,`yum`,`dnf`,`zypper`를 사용해 에이전트 패키지를 설치하거나 업그레이드하려고 하면 오류가 발생합니다.

다음과 같은 오류가 발생할 수 있습니다.

```
E: 'https://apt.datadoghq.com stable Release' 리포지토리가 서명되지 않았습니다.
```
```
E: 'datadog-agent' 패키지에 설치 후보가 없습니다
```
```
공용 키가 없어 다음 서명을 인증할 수 없습니다: NO_PUBKEY
```
```
"Datadog, Inc." 리포지토리에 있는 GPG 키 목록이 이미 설치되어 있지만 이 패키지에 맞지 않습니다.
이 리포지토리에 올바른 키 URL이 구성되어 있는지 점검하세요.
```
```
datadog-agent-7.35.1-1.x86_64.rpm의 공용 키가 설치되어 있지 않습니다. 실패 패키지: datadog-agent-1:7.35.1-1.x86_64
```
```
오류: GPG 점검 실패
```

`apt`의 경우 새로 릴리스된 에이전트 버전과 기존 에이전트 버전에 모두 적용되며, `yum`,`dnf`, `zypper`의 경우 `datadog.repo`파일에 `repo_gpgcheck=0`가 설정되어 있는 한 기존 에이전트 버전을 설치할 수 있습니다.

이 키 회전은 패키지를 수동으로 다운로드하고 `dpkg`또는 `rpm`를 사용하여 설치하는 경우에는 영향을 주지 않습니다. 이로 인해 `rpm` 경고가 발생할 수 있습니다.

## 수동 업데이트

Datadog에서는 위의 [설치 방식](#install-methods-that-automatic-trust-the-gpg-key) 중 하나를 사용하는 것을 권장합니다. 위 방법의 하나를 사용할 수 없을 경우에는 다음 지침에 따라 수동으로 새 키를 다운로드하고 신뢰하세요.

{{< tabs >}}
{{% tab "Debian/Ubuntu" %}}

호스트에서 다음 명령을 실행하세요.

```bash
$ curl -o /tmp/DATADOG_APT_KEY_F14F620E https://keys.datadoghq.com/DATADOG_APT_KEY_F14F620E.public
$ sudo apt-key add /tmp/DATADOG_APT_KEY_F14F620E
$ sudo touch /usr/share/keyrings/datadog-archive-keyring.gpg
$ cat /tmp/DATADOG_APT_KEY_F14F620E | sudo gpg --import --batch --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg
$ sudo chmod a+r /usr/share/keyrings/datadog-archive-keyring.gpg
```

{{% /tab %}}
{{% tab "RedHat/CentOS/SUSE" %}}

호스트에서 다음 명령을 실행하세요.

```
$ curl -o /tmp/DATADOG_RPM_KEY_FD4BF915 https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
$ sudo rpm --import /tmp/DATADOG_RPM_KEY_FD4BF915
```

{{% /tab %}}
{{< /tabs >}}

## 호스트가 새 GPG 키를 신뢰하는지 점검

{{< tabs >}}
{{% tab "Debian/Ubuntu" %}}

호스트는 다음 조건 중 하나가 true인 경우 새 키를 신뢰합니다.

- `/usr/share/keyrings/datadog-archive-keyring.gpg` 파일이 있고 Datadog 소스 목록 파일(일반적으로 `/etc/apt/sources.list.d/datadog.list`)에 `[signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg]` 옵션이 포함되어 있습니다.
- Datadog 소스 목록 파일에 `signed-by`옵션이 없으나 `datadog-signing-keys` 버전 1.1.0 이상이 설치되어 있어 `/etc/apt/trusted.gpg.d/datadog-archive-keyring.gpg` 파일이 있습니다.

지원되는 [설치 방법](#install-methods-that-automatically-trust-the-new-gpg-key)으로 설치하거나 [`datadog-signing-keys` 패키지](#the-datadog-signing-keys-package)를 설치하면 `/usr/share/keyrings/datadog-archive-keyring.gpg` 파일과 `/etc/apt/trusted.gpg.d/datadog-archive-keyring.gpg` 파일(선택 사항)이 생성됩니다. [위에 안내된 설치 방법 버전](#install-methods-that-automatically-trust-the-gpg-key) 중 하나를 사용하지 않는 경우, `datadog-signing-keys`[버전 1.1.0](#datadog-signing-keys-version-110) 이상이 설치되어 있는지 확인하세요.

{{% /tab %}}
{{% tab "RedHat/CentOS/SUSE" %}}

호스트에서 다음 명령을 실행하세요.

```bash
$ rpm -qa | grep gpg-pubkey-fd4bf915
```

신뢰하는 키의 경우 명령어에 코드가 0으로 끝나며 다음 출력이 표시됩니다.

```
gpg-pubkey-fd4bf915-5f573efe
```

다른 경우에는 명령어에 코드가 0이 아닌 것으로 끝나며 다음 출력이 표시됩니다.

또는 `datadog.repo`파일에 `gpgkey` 항목 중 하나로 `https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public`이 포함되어 있는지 확인하세요. 이 키 파일은 사용되는 즉시 새 키로 업데이트됩니다.

{{% /tab %}}
{{< /tabs >}}

## `datadog-signing-keys`패키지

<div class="alert alert-info"><strong>참고</strong>: 이 섹션은 DEB 에이전트 패키지 사용자에게만 적용됩니다.</div>

에이전트 버전 6.31.0과 버전 7.31.0 이후 Datadog DEB 패키지 모두는 `datadog-signing-keys`패키지에 소프트 종속성을 가지고 있으며 에이전트 버전 6.35.1과 버전 7.35.1 이후 Datadog DEB 패키지 모두는 `datadog-signing-keys`패키지 버전 `1.1.0`에 소프트 종속성을 가지고 있습니다.

설치 시 이 패키지:

- `/usr/share/keyrings/datadog-archive-keyring.gpg` 키링에 APT 키를 구성하고, 필요한 경우 `/etc/apt/trusted.gpg.d/datadog-archive-keyring.gpg`에도 구성합니다. **이를 통해 APT 리포지토리 서명 키를 신뢰할 수 있습니다.**  키 회전에 대비하려면 패키지 [`datadog-signing-keys`버전 1.1.0](#datadog-signing-keys-version-110)을 사용하는 것을 권장합니다.
- Datadog 패키지에 [`debsig-verify`정책][12]를 설정합니다. 이를 통해 로컬에서 개별 DEB 패키지의 서명을 확인할 수 있습니다.

예를 들어, 로컬에 다운로드한 DEB 패키지를 Datadog가 작성하고 서명한 것인지 확인하려면 다음 명령을 실행합니다.

  ```bash
  $ debsig-verify datadog-dogstatsd_7.34.0-1_amd64.deb
  ```

검증에 성공하면 상태 표시에 `debsig-verify`가 종료되고 `0` 상태와 함께 `debsig: Verified package from 'Datadog, Inc.' (Datadog).` 메시지가 표시됩니다. 버전 6.26.0/7.26.0 이후부터 Datadog DEB 패키지에 서명이 내장되어 있기 때문에 이전 버전에서는 이 검증이 작동하지 않습니다.

에이전트 버전 6.31.0+/7.31.0+에서 `datadog-signing-keys`의 패키지 종속성이 선택 사항이기 때문에 다음과 같은 경우 설치되지 않을 수 있습니다.

- Datadog 리포지토리를 APT 소스로 설정하지 않고 에이전트 DEB 패키지를 수동으로 다운로드해 설치합니다.
- `datadog-signing-keys` 패키지를 미러링하지 않고 에이전트 DEB 패키지를 내 APT 리포지토리로 미러링합니다.
- APT 구성이 권장 패키지를 설치하지 않도록 설정도어 있습니다. 예를 들어 ` --no-install-recommends` or by having `APT::Install-Recommends "0"` in `apt.conf` `apt`로 실행했습니다.

처음 두 가지 방법은 Datadog의 레포지토리 메타데이터를 확인할 필요가 없으므로 키 회전에 영향을 주지 않습니다. 그러나 `datadog-signing-keys`패키지에 포함된 `debsig-verify` 정책 파일을 사용하는 것이 도움이 될 수 있습니다.

세 번째 방법에서는 `apt`를 통해 `apt.datadoghq.com`에서 에이전트 패키지를 설치하는 경우 `datadog-signing-keys`패키지를 명시적으로 설치해야 합니다. 또는 지원되는 [설치 방법](#install-methods-that-automatic-trust-the-new-gpg-key) 중 하나를 사용해야 합니다.

### datadog-signing-keys 버전 1.1.0

<div class="alert alert-info"><strong>참고</strong>: 이 섹션은 DEB 에이전트 패키지 사용자에게만 적용됩니다.</div>

1.1.0 이전 `datadog-signing-keys` 버전에서는 다음과 같은 코너 케이스를 처리하지 않습니다.

* Ubuntu >= 16 및 Debian >= 9에서는 `/usr/share/keyrings/datadog-archive-keyring.gpg`만 생성되고 `/etc/apt/trusted.gpg.d/datadog-archive-keyring.gpg`는 생성되지 않습니다.
* APT 소스 목록 파일(예: `/etc/apt/sources.list.d/datadog.list`)에 `[signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg]` 옵션이 없으면 APT가 새 키에 관한 정보를 얻을 수 없습니다. 따라서 키 회전 후 Datadog 리포지토리의 모든 작업이 실패합니다.

`datadog-signing-keys` 버전 1.1.0에서는 `/etc/apt/sources.list.d/datadog.list`에 적절한 `signed-by` 옵션이 포함되어 있지 않는 경우 `/etc/apt/trusted.gpg.d/datadog-archive-keyring.gpg`를 생성해 이 문제를 해결합니다. 위 코너 케이스도 이렇게 해결됩니다.

기본 Datadog 소스를 사용하면서 지원 중인 최신 [설치 방법](#install-methods-that-automatic-trust-the-gpg-key)을 사용한 경우, 항상 적절한 `signed-by` 옵션이 설정되어 있기 때문에 이 문제에 영향을 받지 않습니다. Datadog에서는 모든 사용자가 `datadog-signing-keys` 1.1.0으로 업그레이드하여 새로운 키 회전에 대비할 것을 권장합니다. `apt.datadoghq.com` 리포지토리에서 `apt`를 통해 DEB 에이전트 버전 6.35.1+이나 버전 7.35.1+를 설치하면 `datadog-signing-keys` 1.1.0을 설치할 수 있습니다.

## 에이전트 v5 사용자에게 미치는 영향

DEB 기반 시스템(Debian/Ubuntu)에서 에이전트 v5를 사용하는 경우에도 회전 날짜 이후에 에이전트를 설치하거나 업그레이드하려면 새 서명 키를 신뢰해야 합니다. RPM 기반 시스템(RedHat/CentOS/SUSE)에서 에이전트 v5를 사용하는 경우에는 이 회전의 영향을 받지 않습니다.

**참고**: 에이전트 v5는 2021년 1월 1일에 서비스가 종료된 Python 2를 사용합니다. Datadog에서는 [에이전트 v7로 업그레이드][13]할 것을 권장합니다.

[1]: https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
[2]: https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
[3]: https://keys.datadoghq.com/DATADOG_APT_KEY_382E94DE.public
[4]: https://keys.datadoghq.com/DATADOG_APT_KEY_F14F620E.public
[5]: https://s3.amazonaws.com/dd-agent/scripts/install_script.sh
[6]: https://github.com/DataDog/chef-datadog
[7]: https://github.com/DataDog/ansible-datadog
[8]: https://github.com/DataDog/puppet-datadog-agent
[9]: https://github.com/DataDog/datadog-formula
[10]: https://github.com/DataDog/heroku-buildpack-datadog
[11]: https://docs.datadoghq.com/ko/integrations/amazon_elasticbeanstalk
[12]: https://manpages.ubuntu.com/manpages/jammy/man1/debsig-verify.1.html
[13]: https://app.datadoghq.com/account/settings/agent/latest