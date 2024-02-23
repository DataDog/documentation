---
kind: faq
title: Circle CI 보안 인시던트가 Datadog 에이전트에 미치는 영향
---
<details>
  <summary><strong>페이지 변경로그</strong></summary>

  <table>
    <tr>
        <td><strong>날짜</strong></td>
        <td><strong>설명</strong></td>
    </tr>
    <tr>
        <td>2023년 1월 13일</td>
        <td>초판 발행</td>
    </tr>
    <tr>
        <td>2023년 1월 16일</td>
        <td>업데이트됨 <code>rpm_check</code> 스크립트 버전 1.1.0, 명확성을 위해 편집</td>
    </tr>
    <tr>
        <td>2023년 1월 17일</td>
        <td>업데이트됨 <a href="/resources/sh/rpm_check.sh"><code>rpm_check</code></a> 스크립트 버전 1.2.0, 보다 명확한 식별 및 해결 단계</td>
    </tr>
    <tr>
        <td>2023년 2월 3일</td>
        <td>영향 받은 키로 서명한 에이전트 5 버전이 무엇인지 명확히 알려줌</td>
    </tr>
</table>
</details>

<div class="alert alert-warning"><strong>요약</strong>: RPM 기반 Linux 호스트(RHEL, CentOS, Rocky Linux, AlmaLinux, Amaon Linux, SUSE/SLES, Fedora)를 점검하여 지문 <code>60A389A44A0C32BAE3C03F0B069B56F54172A230</code>으로 신뢰한 키를 모두 찾아 수정합니다.</a></div>

2023년 1월 4일에 Datadog에서 CircleCI 서비스를 이용해 저장한 비밀이 유출되었을 가능성이 있어 [보안 인시던트][1] 조사가 진행 중이라는 알림을 받았습니다. Datadog에서 CircleCI를 통해 저장한 비밀 중 잠재적으로 악용될 소지가 있는 비밀이 하나 있는데, 이는 RMP GNU Privacy Guard(GPG) 프라이빗 서명 키와 전달 구입니다. 이 페이지에서는 이 잠재적인 유출의 의미, 호스트에 취해야 할 조치, 고객 위험을 완화하기 위해 Datadog에서 취한 조치에 관한 정보를 제공합니다.

<div class="alert alert-info">
<strong>참고</strong>: 2023년 1월 16일 현재까지 키가 유출되거나 오용된 증거를 발견하지 못했습니다. 그러나 다음과 같은 예방 조치를 취하고 있습니다.
</div>

## 영향을 받은 키

영향을 받은 RPM GPG 서명 키에는 지문`60A389A44A0C32BAE3C03F0B069B56F54172A230`이 있으며 [당사 서명 키 위치][2]에서 액세스할 수 있습니다. 이 키는 과거에 다음을 서명하는 데 사용되었습니다.

* 에이전트 6 릴리스(v6.13.0(`datadog-agent` 패키지)까지)와 에이전트 5 릴리스(v5.32.8까지)
* 독립 실행형 DogStatsD 6 릴리스 및 독립 실행형 DogStatsD 7 릴리스(v7.23.1(`datadog-dogstatsd`패키지)까지)

<div class="alert alert-info">
<strong>참고</strong>: 공식 Datadog 리포지토리는 손상되지 <strong>않았습니다</strong>. 서명 키가 실제로 유출된 경우 Datadog에서 나온 것처럼 보이는 RPM 패키지를 구성하는 데 사용될 수 있지만, 이러한 패키지를 공식 패키지 리포지토리에 배치하기에는 공간이 충분하지 않습니다. 효과가 있으려면 영향을 받은 키를 가진 가상 공격자가 구성된 RPM 패키지를 호스트에서 사용하는 리포지토리에 업로드할 수 있어야 합니다.
</div>

## 영향을 받은 호스트 찾기

이 문제는 RHEL, CentOS, Rocky Linux, AlmaLinux, Amazon Linux, SUSE/SLES, Fedora를 포함한 **RPM 기반 Linux 분포**를 실행하는 호스트에 영향을 미칠 수 있습니다. macOS, Windows, Debian, Ubuntu 등 다른 운영 체제와 컨테이너 에이전트를 실행하는 호스트는 영향을 받지 않습니다.

시작하기 전에 대용량 인프라스트럭처가 있는 경우 키를 신뢰하는 호스트에 **검색 우선순위를 지정하세요.** 패키지를 설치하고 시간이 지남에 따라 업데이트할 수 있는 다양한 방법이 있으므로 **모든** RPM 기반 리눅스 호스트와 Datadog 패키지를 연결하여 확인하는 것이 좋습니다. 먼저 확인할 호스트의 우선순위를 지정할 수 있도록 다음 지침을 확인하세요. 다음은 영향을 받을 가능성이 **매우 높은** 시나리오입니다.
   * 에이전트 v5 또는 v6
   * 독립 실행형 DogStatsD v6 또는 v7.23.2 이전 버전

   RPM 기반 Linux 호스트의 경우 다음 시나리오에서 영향을 받을 **가능성은 거의 없지만** 만약을 위해 호스트를 확인해보는 것이 좋습니다.
   * 에이전트 v7
   * 독립 실행형 DogStatsD 버전 7.23.2+

   다음 시나리오의 경우 영향을 받지 **않습니다**.
   * macOS, Windows, Debian, Ubuntu에서는 에이전트가 Datadog 패키지와 함께 설치됩니다.
   * 호스트가 컨테이너 에이전트를 사용합니다.

각 호스트가 RPM 데이터베이스나 Datadog 레포 파일 중 하나나 둘 다에서 영향을 받은 키를 신뢰하는지 점검합니다.

1. 다음 명령을 실행해 RPM 데이터베이스를 점검합니다.

   ```bash
   $ rpm -q gpg-pubkey-4172a230-55dd14f6
   ```

   명령이 성공적으로 실행되고 `gpg-pubkey-4172a230-55dd14f6`를 인쇄하면 **호스트가 키를 신뢰하고 작업을 요청합니다**. 0이 아닌 코드로 종료하고 `package gpg-pubkey-4172a230-55dd14f6 is not installed`와 같은 메시지가 출력되며 명령이 실패하면 **호스트는 RPM 데이터베이스의 키를 신뢰하지 않습니다**. 

2. Datadog 레포 파일을 점검합니다. 파일의 기본 위치는 다음과 같습니다.

   - RHEL, CentOS, Rocky Linux, AlmaLinux, Amazon Linux, Fedora: `/etc/yum.repos.d/datadog.repo`
   - OpenSUSE 및 SLES:  `/etc/zypp/repos.d/datadog.repo`

   다음 예제와 같이 레포 파일이 `gpgkey` 항목 아래 `DATADOG_RPM_KEY.public`을 언급하면 **호스트가 영향을 받은 키를 신뢰한다는 뜻이며 조치가 필요합니다**.

   * `https://s3.amazonaws.com/public-signing-keys/DATADOG_RPM_KEY.public`
   * `https://keys.datadoghq.com/DATADOG_RPM_KEY.public`
   * `https://s3.amazonaws.com/yum.datadoghq.com/DATADOG_RPM_KEY.public`
   * `https://yum.datadoghq.com/DATADOG_RPM_KEY.public`

둘 중 하나나 둘 다 키를 신뢰하는 것으로 확인되면 다음 섹션에 안내된 작업을 실행해 영향을 받은 호스트를 보호해야 합니다. 둘 다 키를 신뢰하지 않는 것으로 나오면 추가 작업을 할 필요가 없습니다.

## 영향을 받은 호스트 보안

호스트가 **영향을 받은 키를 신뢰하지 않도록** 하세요. 이전 단계에서 호스트가 키를 신뢰하는 것으로 나타난 경우 다음 단계를 실행하세요.

1. Ansible Datadog 역할과 같은 설정 자동화 도구나 플러그인을 사용하는 경우 [Datadog의 조치](#what-datadog-is-doing)에 안내된 최신 버전으로 업데이트합니다.

   이러한 자동화 도구나 플러그인을 이전 버전 그대로 사용하면 문제가 다시 일어날 위험이 있습니다. 새 고정 버전으로 업데이트할 수 없는 경우 자동화 도구 런북에 수동 키 삭제 단계(3단계 및 4단계)를 추가하고, 런북 순서에서 Datadog 도구와 플러그인 _후_에 실행되도록 설정하세요.

2. 공식 Datadog 설치 스크립트로 설정한 호스트의 경우 최신 버전의 설치 스크립트를 실행하면 키 신뢰를 해제하고 업데이트된 레포 파일을 프로비저닝합니다.

3. `rpm -q gpg-pubkey-4172a230-55dd14f6`을 실행 했음에도 키가 감지되면 RPM 데이터베이스에서 키를 삭제하고 다음 명령을 실행해 신뢰를 중지합니다.

   ```bash
   $ sudo rpm --erase gpg-pubkey-4172a230-55dd14f6
   ```

4. `DATADOG_RPM_KEY.public`이 레포 파일에 포함되어 있는 경우, `DATADOG_RPM_KEY.public`으로 끝나는 `gpgkey` 라인을 제거해 키를 삭제합니다. 레포 파일에서 `gpgkey` 항목이 이것 뿐이라면 `https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public`로 대체합니다. [영향을 받은 키를 더 이상 신뢰하지 않는 다는 것의 의미](#implications-of-no-longer-trusting-the-affected-key) 섹션에서 자세히 확인하세요.

5. 추가 유의 조치로 영향을 받는 호스트에 [이 스크립트][3]를 실행해 Datadog에서 영향 받은 키로 서명하여 빌드한 패키지가 있는지 확인합니다.

   ```bash
   $ curl -o /tmp/rpm_check.sh https://docs.datadoghq.com/resources/sh/rpm_check.sh && chmod +x /tmp/rpm_check.sh
   $ /tmp/rpm_check.sh
   ```

   이 스크립트를 실행하면 영향을 받은 키로 서명하여 설치된 Datadog 패키지가 Datadog가 빌드한 것이 맞는지 확인하고, 영향을 받은 키로 서명한 패키지 중에 Datadog가 빌드한 것이 아닌 패키지가 있는지 검색합니다.

   출력에 `[ ERROR ]`로 시작하는 행이 포함된 경우 전체 스크립트 출력과 함께 **[Datadog 지원팀][4]에 보고하세요**.

## 영향을 받은 키를 더 이상 신뢰하지 않는다는 것의 의미

해당 호스트가 에이전트 7을 사용하는 경우에는 아무런 영향이 없습니다. 에이전트 7 패키지는 영향을 받은 키로 서명된 적이 없습니다.

이제 호스트에서 다음을 설치할 수 없습니다.
- v6.14.0 이전 버전의 에이전트. 에이전트 v6.14.0이나 v7 이상으로 업그레이드하세요.
- 독립 실행형 DogStatsD v6 또는 v7.24.0 이전 독립 실행형 DogStatsD(`datadog-dogstatsd` 패키지). 독립실행형 DogStatsD 7.24.0+로 업그레이드하세요.
- v5.32.8 이전 에이전트 버전. v5.32.9+를 설치하거나 v6.14.0+이나 v7로 업그레이드하세요.

## Datadog의 조치

[현재 RPM 서명 키][6]인 `C6559B690CA882F023BDF3F63F4D1729FD4BF915`로 서명된 CentOS/RHEL용 [5.32.9-1][5]**새 에이전트 5 RPM**를 릴리스했습니다. RPM은 [에이전트 5 RPM 리포지토리][7]를 통해 사용할 수 있습니다.

RPM 데이터베이스와 Datadog 레포 파일에서 영향을 받은 키를 명시적으로 제거하여 호스트를 안전하게 보호하기 위해 **에이전트 설치 방법**을 새 버전으로 업데이트했습니다.
  * [Datadog Ansible 역할][8] 릴리즈 [4.18.0][9]
  * [Datadog Chef 레시피][10] 출시 [4.16.0][11]
  * [Datadog Puppet 모듈][12] 릴리스 [3.20.0][13]
  * [Datadog SlatStack 공식][14] 릴리즈 [3.5][15]
  * Datadog 에이전트 6/7 Linux 설치 스크립트, 버전 1.13.0으로 2023년 1월 12일 13:00 UTC에 다음 위치에 릴리스됨.
    * [https://s3.amazonaws.com/dd-agent/scripts/install_script_agent6.sh][16]
    * [https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh][17]
    * [https://s3.amazonaws.com/dd-agent/scripts/install_script.sh][18] (사용 중지되어 권고하지 않으나 업데이트 됨.)
  * [Datadog 에이전트 5 Linux 설치 스크립트][19], 2023년 1월 12일 16:25 UTC에 [다운로드 위치][19]에 릴리스됨.



[1]: https://circleci.com/blog/january-4-2023-security-alert/
[2]: https://keys.datadoghq.com/DATADOG_RPM_KEY.public
[3]: /resources/sh/rpm_check.sh
[4]: /ko/help/
[5]: https://yum.datadoghq.com/rpm/x86_64/datadog-agent-5.32.9-1.x86_64.rpm
[6]: https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
[7]: https://yum.datadoghq.com/rpm/x86_64/
[8]: https://github.com/DataDog/ansible-datadog/
[9]: https://github.com/DataDog/ansible-datadog/releases/tag/4.18.0
[10]: https://github.com/DataDog/chef-datadog
[11]: https://github.com/DataDog/chef-datadog/releases/tag/v4.16.0
[12]: https://github.com/DataDog/puppet-datadog-agent
[13]: https://github.com/DataDog/puppet-datadog-agent/releases/tag/v3.20.0
[14]: https://github.com/DataDog/datadog-formula
[15]: https://github.com/DataDog/datadog-formula/releases/tag/3.5
[16]: https://s3.amazonaws.com/dd-agent/scripts/install_script_agent6.sh
[17]: https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh
[18]: https://s3.amazonaws.com/dd-agent/scripts/install_script.sh
[19]: https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh