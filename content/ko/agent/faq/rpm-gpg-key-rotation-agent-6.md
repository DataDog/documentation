---
kind: faq
title: RPM GPG 키 회전
---

<div class="alert alert-warning">
이 페이지에서는 2019년 키 회전과 관련한 내용을 안내합니다. 2022년 키 회전과 관련된 내용은 <a href="/agent/faq/linux-agent-2022-key-rotation">2022년 Linux 에이전트 키 회전 </a> 설명서를 참고하세요.
</div>


버전 6.14.0부터는 에이전트 RPM 패키지가 다른 GPG 키로 서명됩니다. Datadog에서는 GPG 키를 주기적으로 업데이트해 모범 사례를 유지합니다.

[Datadog Yum 저장소][1]에 있는 RPM 패키지를 사용하는 호스트가 이 변경 사항의 영향을 받으며, 호스트의 키링에 연결된 공개 키를 가져와 키를 신뢰해야 합니다.

키를 신뢰하지 않고 에이전트 패키지를 설치하거나 업그레이드하려고 하면 패키지를 설치할 때 `NOKEY`오류가 발생합니다.

관련 공개 키 지문은 `A4C0B90D7443CF6E4E8AA341F1068E14E09422B3`입니다.

다음 공식 지원되는 설치 방법 중 하나를 선택해 최신 버전을 사용하는 경우, 호스트에서 키를 자동으로 신뢰하므로 추가 작업이 필요하지 않습니다.

* [에이전트 설치 페이지][2]
* [Chef 쿡북][3]
* [Ansible 역할][4]
* [Puppet 모듈][5]
* [SaltStack Formula][6]

## 호스트가 GPG 키를 신뢰하는지 점검

특정 호스트가 키를 신뢰하는지 점검하려면 호스트에서 다음 명령을 실행합니다.

```bash
rpm -q gpg-pubkey-e09422b3
```

키 신뢰가 확인되면 명령어가 0으로 종료되며 다음이 출력됩니다.

```bash
gpg-pubkey-e09422b3-57744e9e
```

신뢰가 확인되지 않으면 종료 코드가 0이 아닌 다른 것으로 끝나며 다음 출력이 반환됩니다.

```bash
package gpg-pubkey-e09422b3 is not installed
```

## GPG 키 신뢰

호스트가 이미 키를 신뢰하거나. 최신 버전을 공식적인 설치 방법으로 설치한 경우에는 이 단계가 필요하지 않습니다.

### 명령어 가져오기

호스트에서 다음 명령을 실행합니다.

```bash
$ curl -o /tmp/DATADOG_RPM_KEY_CURRENT.public https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
$ curl -o /tmp/DATADOG_RPM_KEY_B01082D3.public https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
$ curl -o /tmp/DATADOG_RPM_KEY_FD4BF915.public https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
$ curl -o /tmp/DATADOG_RPM_KEY_E09422B3.public https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public

$ rpm --import /tmp/DATADOG_RPM_KEY_CURRENT.public
$ rpm --import /tmp/DATADOG_RPM_KEY_B01082D3.public
$ rpm --import /tmp/DATADOG_RPM_KEY_FD4BF915.public
$ rpm --import /tmp/DATADOG_RPM_KEY_E09422B3.public
```

그 후 [호스트가 GPG 키를 신뢰하는지 점검](#Check-if-a-host-trusts-the-gpg-key)에 안내된 단계를 따라 키가 신뢰되는지 점검합니다.

### Yum 리포지토리 파일 업데이트

CentOS, RHEL 및 Amazon Linux에서 Yum 리포지토리 파일을 사용해 Datadog 리포지토리(`datadog.repo`)를 정의하는 경우, 업데이트를 통해 키를 신뢰할 수 있는 키로 추가합니다.

{{< tabs >}}
{{% tab "Agent v7" %}}

```conf
[datadog]
name = Datadog, Inc.
baseurl = https://yum.datadoghq.com/stable/7/x86_64/
enabled=1
gpgcheck=1
repo_gpgcheck=1
gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
       https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
       https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
       https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
```

{{% /tab %}}
{{% tab "Agent v6" %}}

```conf
[datadog]
name = Datadog, Inc.
baseurl = https://yum.datadoghq.com/stable/6/x86_64/
enabled=1
gpgcheck=1
repo_gpgcheck=1
gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
       https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
       https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
       https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
```

{{% /tab %}}
{{< /tabs >}}

 **참조**: RHEL/CentOS 8.1에서는  [dnf에 버그][7]가 있기 때문에 `repo_gpgcheck=1` 대신 `repo_gpgcheck=0`을 사용해야 합니다.

**참고**: 이 방식은 SUSE 기반 시스템에서 작동하지 않습니다. 대신 [커맨드 가져오기](#import-command)를 사용합니다.

[1]: https://yum.datadoghq.com
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://github.com/DataDog/chef-datadog
[4]: https://github.com/DataDog/ansible-datadog
[5]: https://github.com/DataDog/puppet-datadog-agent
[6]: https://github.com/DataDog/datadog-formula
[7]: https://bugzilla.redhat.com/show_bug.cgi?id=1792506