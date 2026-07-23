---
description: Datadog RPM 및 DEB 패키지의 2024 GPG 키 로테이션에 관한 정보 및 시스템 업데이트 방법입니다.
title: 2024 Linux 키 로테이션
---

일반적인 모범 사례로 Datadog는 Datadog 에이전트 패키지에 서명하는데 사용되는 키와 인증서를 주기적으로 로테이션합니다. Datadog 패키지에는 다음이 포함됩니다.

- 다양한 유형의 에이전트(`datadog-agent`, `datadog-iot-agent`, `datadog-heroku-agent`, `datadog-dogstatsd`)
- 추가 패키지: 관찰 가능성 파이프라인 작업자(`observability-pipelines-worker`), FIPS 프록시 (`datadog-fips-proxy`) 및 자바(Java), 파이썬(Python), .NET, 루비(Ruby) 및 Node.js(모든 `datadog-apm-*` 패키지)를 위한 애플리케이션 성능 모니터링(APM) 인젝션 및 추적기 라이브러리

위의 RPM 및 DEB 패키지에 서명하는 데 사용되는 다음 GPG 키는 2024년 9월에 수명이 종료됩니다. 교체는 2024년 6월로 예정되어 있습니다.

RPM
: 신뢰할 수 있는 이전 키 해시: [`C6559B690CA882F023BDF3F63F4D1729FD4BF915`][1]
: 새로운 신뢰할 수 있는 키 해시: [`7408BFD56BC5BF0C361AAAE85D88EEA3B01082D3`][2]
: 2024년 6월 이후에는 2024년 6월 이후에 게시된 RPM 릴리스를 설치하기 전에 새 신뢰할 수 있는 키를 설치하세요.

DEB
: 신뢰할 수 있는 이전 키 해시: [`D75CEA17048B9ACBF186794B32637D44F14F620E`][3]
: 신뢰할 수 있는 새로운 키 해시: [`5F1E256061D813B125E156E8E6266D4AC0962C7D`][4]
: APT는 리포지토리 메타데이터 서명을 확인합니다. 2024년 6월 이후에 게시된 `apt.datadoghq.com`에서 APT 릴리스를 설치하기 전에 신뢰할 수 있는 새로운 키를 설치하세요.

Datadog의 RPM 또는 DEB 패키지를 사용 중인 경우, 로테이션이 이루어진 후 시스템에서 새로운 키를 수동으로 가져와 에이전트 패키지를 설치하거나 업그레이드해야 할 수 있습니다. 

<div class="alert alert-info">
키 로테이션은 이미 실행 중인 에이전트의 기능에는 영향을 미치지 않습니다. 에이전트 ,<br><br>도커화된 Linux 에이전트, 윈도우즈(Windows), 또는 macOS 에이전트의 최신 버전 설치 또는 업그레이드 기능만 제한될 뿐 영향을 받지 않습니다.
</div>

## 새 GPG 키를 자동으로 신뢰하도록 하는 설치 방법

다음 설치 방법 중 하나를 사용하는 경우 호스트에서 새 키를 자동으로 신뢰하므로 추가 조치가 필요하지 않습니다.

- [에이전트 설치 스크립트][5] v1.18.0+(2023년 6월 27일 출시)
- [Chef 쿡북][6] v4.18.0+ (2023년 7월 26일 출시)
- [Ansible 역할][7] v4.20.0+(2023년 7월 18일 출시)
- [Ansible 컬렉션][14] v5.0.0+(2023년 7월 18일 출시)
- [Puppet 모듈][8] v3.21.0+(2023년 7월 5일 출시)
- [SaltStack 공식][9] v3.6+(2023년 8월 10일 출시)
- [헤로쿠(Heroku) 빌드팩][10] v2.11+(2023년 6월 15일 출시)
- 2023년 6월 27일 이후 업데이트된 [Elastic Beanstalk][11] 설정 템플릿( `source: https://install.datadoghq.com/scripts/install_script_agent7.sh`)이 포함되어야 합니다.
- 모든 버전의 컨테이너화된 에이전트(도커(Docker)/쿠버네티스(Kubernetes))
- 모든 버전의 윈도우즈(Windows)/MacOS 에이전트

또한 `apt.datadoghq.com` 리포지토리에서 `apt`를 통해 에이전트 v6.48.0+ 또는 v7.48.0+ 패키지를 설치하면 [`datadog-signing-keys` 패키지](#the-Datadog-signing-keys-package) 버전 1.3.1이 설치됩니다. `datadog-signing-keys` 패키지는 자동으로 호스트가 이 새 키를 신뢰하도록 합니다. `datadog-signing-keys` 버전 1.3.1 이상을 설치한 경우 추가 조치가 필요하지 않습니다. `datadog-signing-keys` 버전 1.3.1 이전 버전은 키 로테이션에 대한 완전한 대비를 보장하지 않습니다.

위의 **설치 방법**을 사용하여 Observability Pipelines Worker 또는 애플리케이션 성능 모니터링(APM) 추적기 라이브러리 **를 설치했다면 이미 최신 키가 함께 제공됩니다. 추가 조치가 필요하지 않습니다.

다른 리포지토리에서 에이전트 패키지 DEB를 설치하거나 `apt`(또는 점검 리포지토리 메타데이터 서명을 하는 유사한 툴)를 사용하지 않는 경우 시스템에서 Datadog 서명 키를 알 필요가 없습니다. 추가 조치가 필요하지 않습니다. 그러나 [`datadog-signing-keys` 패키지](#the-Datadog-signing-keys-pakage)가 도움이 될 수 있습니다.

호스트가 가 새 서명 키를 신뢰하는지 확실하지 않은 경우 [점검](#check-if-a-host-trusts-the-new-gpg-key)할 수 있습니다.

위에 나열된 설치 방법의 이전 버전 또는 이전 버전의 DEB 패키지를 실ㅇ행하는 호스트의 경우, Datadog는 설치 방법을 최신 버전으로 업데이트할 것을 권장합니다. 또는 데비안(Debian) 및 우분투(Ubuntu) 사용자의 경우 에이전트를 7.48.0+ 버전으로 업데이트할 수 있습니다. 그렇지 않으면 키를 [수동으로 업데이트](#manual-update)할 수 있습니다.

## 새 키를 로테이션하기 전 키가 신뢰되지 않으면 어떻게 되나요?

새 키가 신뢰 대상으로 분류되지 않는 경우 `apt.datadoghq.com`/`yum.datadoghq.com`에서 `apt`, `yum`, `dnf` 또는 `zypper`를 사용하여 에이전트 패키지를 설치하거나 업그레이드하려고 하면 오류가 발생합니다.

발생할 수 있는 오류는 다음과 같습니다.

```
E: 리포지토리 'https://apt.datadoghq.com stable Release'가 서명되지 않았습니다.
```
```
E: 패키지 'datadog-agent'에 설치 후보자가 없습니다.
```
```
공개 키를 사용할 수 없으므로 다음 서명을 확인할 수 없음: NO_PUBKEY
```
```
"Datadog, Inc." 리포지토리에 대해 나열된 GPG 키가 이미 설치되어 있지만 이 패키지에 대해 올바르지 않습니다.
이 리포지토리에 대해 올바른 키 URL이 설정되어 있는지 확인하세요.
```
```
datadog-agent-7.57.1-1.x86_64.rpm에 대한 공개 키가 설치되어 있지 않습니다. 실패한 패키지: datadog-agent-1:7.57.1-1.x86_64
```
```
오류: GPG 확인 실패
```

`apt`의 경우 새로 출시된 에이전트 버전과 기존 에이전트 버전 모두에 적용됩니다. ,`yum`, `dnf`, `zypper`의 경우 기존 버전의 에이전트가 `datadog.repo` 또는 `datadog-observability-pipelines-worker.repo` 파일에 `repo_gpgcheck=0`이 설정되어 있는 한 여전히 설치할 수 있습니다.

이 키 로테이션은 패키지를 수동으로 다운로드하여 `dpkg` 또는 `rpm`으로 설치하는 설치 작업에 영향을 미치지 않습니다. `rpm`에 대해 경고가 표시될 수 있습니다.

## 수동 업데이트

Datadog는 위의 [설치 방법](#install-methods-that-automatically-trust-the-new-gpg-key) 중 하나를 사용하여 새 GPG 키는 물론 향후 모든 키를 자동으로 신뢰하도록 설정하는 것을 권장합니다. 이 방법을 사용할 수 없는 경우 다음 안내에 따라 새 키를 수동으로 다운로드하고 신뢰할 수 있도록 하세요.

{{< tabs >}}
{{% tab "Debian/Ubuntu" %}}

호스트에서 다음 명령을 실행하세요.

```bash
$ sudo touch /usr/share/keyrings/datadog-archive-keyring.gpg
$ sudo chmod a+r /usr/share/keyrings/datadog-archive-keyring.gpg
$ curl https://keys.datadoghq.com/DATADOG_APT_KEY_C0962C7D.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
$ curl https://keys.datadoghq.com/DATADOG_APT_KEY_C0962C7D.public | sudo apt-key add -
```

{{% /tab %}}
{{% tab "RedHat/CentOS/SUSE" %}}

호스트에서 다음 명령을 실행합니다.

```
$ sudo rpm --import https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
```

{{% /tab %}}
{{< /tabs >}}

## 호스트가 새로운 GPG 키를 신뢰하는지 확인

{{< tabs >}}
{{% tab "Debian/Ubuntu" %}}

호스트는 이러한 조건 중 하나가 참인 경우 새로운 키를 신뢰합니다.

- `/usr/share/keyrings/datadog-archive-keyring.gpg` 파일이 존재하고 Datadog 소스 목록 파일이 `[signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg]` 옵션을 포함합니다.
  - 에이전트 설치의 경우 소스 목록 파일은 보통 `/etc/apt/sources.list.d/datadog.list`입니다.
  - Observability Pipelines Worker 설치의 경오 소스 목록 파일은 보통 `/etc/apt/sources.list.d/datadog-observability-pipelines-worker.list`입니다.
- Datadog 소스 목록 파일은 `signed-by` 옵션을 포함하지 않습니다. 하지만 `datadog-signing-keys` 버전 1.3.1 이상이 설치되면 `/etc/apt/trusted.gpg.d/datadog-archive-keyring.gpg` 파일이 생성됩니다.

파일 `/usr/share/keyrings/datadog-archive-keyring.gpg` 및 `/etc/apt/trusted.gpg.d/datadog-archive-keyring.gpg`(옵션)은 지원되는 [설치 방법](#install-methods-that-automatically-trust-the-new-gpg-key) 또는 [`datadog-signing-keys` 패키지 ](#the-datadog-signing-keys-package)을 설치하여 생성됩니다. 위에 나열된 [설치 방법 버전] 중 하나를 사용하지 않는 한 `datadog-signing-keys` 버전 1.3.1 이상이 설치되어 있는지 확인하세요(#install-methods-that-automatically-trust-the-new-gpg-key).

{{% /tab %}}
{{% tab "RedHat/CentOS/SUSE" %}}

호스트에서 다음 명령을 실행합니다.

```bash
$ rpm -qa | grep gpg-pubkey-b01082d3
```

키가 신뢰 대상인 경우 명령은 종료 코드 0이며 출력은 다음과 같습니다.

```
gpg-pubkey-b01082d3-644161ac
```

아닌 경우, 명령은 0이 아닌 종료 코드를 반환하며 출력을 반환하지 않습니다.

또는 리포지토리 파일에 `gpgkey` 항목 중 하나로 `https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public`이 포함되었는지 확인합니다. 리포지토리 파일은 보통, 에이전트 설치의 경우 `datadog.repo`, Observability Pipelines Worker의 경우 `datadog-observability-pipelines-worker.repo`입니다. `CURRENT` 키 파일은 사용 중이면 바로 새 키로 업데이트됩니다.

{{% /tab %}}
{{< /tabs >}}

## `datadog-signing-keys` 패키지

<div class="alert alert-info">이 섹션은 DEB 에이전트 패키지 사용자에게만 적용됩니다.</div>

에이전트 v6.31.0 및 v7.31.0부터 모든 Datadog DEB 패키지는 `datadog-signing-keys` 패키지에 대한 소프트 종속성을 갖습니다. 다음 버전의 에이전트 패키지는 `datadog-signing-keys` 패키지 버전 `1.3.1`에 대한 소프트 종속성이 있습니다.
- datadog-agent, datadog-iot-agent, datadog-heroku-agent, datadog-dogstatsd, datadog-agent-dbg v6.48.1+ & v7.48.1+
- datadog-fips-proxy v0.5.4+
- observability-pipelines-worker v1.3.1+
- datadog-apm-inject v0.10.7+
- datadog-apm-library-python v1.18.0+
- datadog-apm-library-java v1.19.1+
- datadog-apm-library-dotnet v2.36.0+
- datadog-apm-library-js v4.11.0+
- datadog-apm-library-all v0.3+

설치가 완료되면 이 패키지는 다음을 수행합니다.

- `/usr/share/keyrings/datadog-archive-keyring.gpg` 키링 및 필요한 경우 `/etc/apt/trusted.gpg.d/datadog-archive-keyring.gpg`에서 APT 키를 구성합니다. **이렇게 하면 향후 APT 저장소 서명 키를 신뢰할 수 있습니다.** 패키지 `datadog-signing-keys` 버전 1.3.1을 사용하면 권장 향후 키 로테이션에 대비할 수 있습니다.
- Datadog 패키지에 대해 [`debsig-verify` 정책][12]을 설정합니다. 이렇게 하면 개별 DEB 패키지의 서명을 로컬에서 확인할 수 있습니다.

예를 들어 로컬로 다운로드한 DEB 패키지가 Datadog에서 빌드하고 서명한 것인지 확인하려면 다음 명령을 실행합니다.

  ```bash
  $ debsig-verify datadog-dogstatsd_7.51.0-1_amd64.deb
  ```

확인이 성공하면 `debsig-verify` 상태가 `0`으로 종료되고 메시지를 출력합니다. `debsig: Verified package from 'Datadog, Inc.' (Datadog).` Datadog의 DEB 패키지는  v6.26.0/7.26.0부터 서명을 포함하므로 이 확인은 이전 버전에서는 작동하지 않습니다.

`datadog-signing-keys`에 대한 에이전트 v6.48.0+/7.48.0+의 패키지 종속성은 선택적이므로 다음 경우에 설치하지 않을 수 있습니다.

- Datadog 리포지토리를 APT 소스로 설정하지 않고 에이전트 DEB 패키지를 수동으로 다운로드하여 설치합니다.
- `datadog-signing-keys` 패키지를 미러링하지 않고 에이전트 DEB 패키지를 자체 APT 리포지토리에 미러링합니다.
- APT 설정이 권장 패키지를 설치하지 않도록 설정되어 있습니다. 예를 들어 `apt`를 ` --no-install-recommends`와 함께 실행하거나 `APT::Install-Recommends "0"`을 `apt.conf`로 설정합니다.

처음 두 방법은 Datadog 의 리포지토리 메타데이터에 대한 확인이 필요하지 않으므로 키 로테이션에 영향을 미치지 않습니다. 그러나 `datadog-signing-keys` 패키지에 제공된 `debsig-verify` 정책 파일을 사용하면 도움이 될 수 있습니다.

세 번째 방법은 `apt.datadoghq.com`에서 `apt`로 에이전트 패키지를 설치하는 경우 `datadog-signing-keys` 패키지를 명시적으로 설치해야 합니다. 또는 지원되는 [설치 방법](#install-methods-that-automatically-trust-the-new-gpg-key) 중 하나를 사용할 수 있습니다.

## 에이전트 v5 사용자에게 미치는 영향

에이전트 DEB 기반 시스템(데비안(Debian)/우분투(Ubuntu))의 v5 사용자도 새 서명 키를 신뢰해야 로테이션 날짜 이후에 에이전트 를 설치하거나 업그레이드할 수 있습니다. 에이전트 RPM 기반 시스템(RedHat/CentOS/SUSE)의 v5 사용자는 이번 로테이션의 영향을 받지 않습니다.

**참고**: 에이전트 v5는 2020년 1월 1일에 수명이 종료된 파이썬(Python) 2를 사용합니다. Datadog에서는 [에이전트 v7로 업그레이드][13]할 것을 권장합니다.

[1]: https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
[2]: https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
[3]: https://keys.datadoghq.com/DATADOG_APT_KEY_F14F620E.public
[4]: https://keys.datadoghq.com/DATADOG_APT_KEY_C0962C7D.public
[5]: https://install.datadoghq.com/scripts/install_script_agent7.sh
[6]: https://github.com/DataDog/chef-datadog
[7]: https://github.com/DataDog/ansible-datadog
[8]: https://github.com/DataDog/puppet-datadog-agent
[9]: https://github.com/DataDog/datadog-formula
[10]: https://github.com/DataDog/heroku-buildpack-datadog
[11]: https://docs.datadoghq.com/ko/integrations/amazon_elasticbeanstalk
[12]: https://manpages.ubuntu.com/manpages/jammy/man1/debsig-verify.1.html
[13]: https://app.datadoghq.com/account/settings/agent/latest
[14]: https://github.com/ansible-collections/Datadog