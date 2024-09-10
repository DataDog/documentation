---
algolia:
  rank: 80
  tags:
  - FIPS
  - FIPS 프록시
  - 준수
  - FedRAMP
  - GovCloud
alias:
- /agent/guide/agent-fips-proxy
disable_toc: false
further_reading:
- link: agent/configuration/proxy
  tag: 설명서
  text: 에이전트 프록시 설정
title: Datadog FIPS 규정 준수
---

{{< site-region region="us,us3,us5,eu,ap1" >}}
<div class="alert alert-warning">Datadog 에이전트 FIPS 프록시는 US1-FED 지역에서만 사용할 수 있습니다.</a></div>
{{< /site-region >}}

Datadog에이전트 FIPS 프록시는 Datadog 에이전트와 Datadog 간의 통신이 FIPS 호환 암호화를 사용하도록 보장합니다.

Datadog에이전트 FIPS 프록시는Datadog 에이전트와 동일한 호스트에 배포되는 별도의 분산 구성 요소입니다. 이 프록시는 에이전트와 Datadog 수신 사이의 중개 역할을 합니다. 에이전트는 FIPS 140-2 검증 암호화를 사용하여 페이로드를 암호화하고 페이로드를 Datadog로 릴레이하는 Datadog에이전트 FIPS 프록시와 통신합니다.

## 지원되는 플랫폼 및 제한 사항

Datadog에이전트 FIPS 프록시의 규정 준수는 검증된 FIPS 140-2 [암호 모듈 - 인증서 #4282][1]의 사용을 기반으로 합니다. 검증된 운영 환경 및 제한 사항과 관련한 자세한 내용은 관련 [보안 정책] [2]을 참고하세요.

**보안 정책 및 광범위한 FIPS 지침을 준수한 운영 환경을 보장하는 것은 사용자의 책임입니다.**

지원되는 플랫폼(64비트 x86):

|||
| ---  | ----------- |
| 베어 메탈 및 VMs | RHEL >= 7<br>Debian >= 8<br>Ubuntu >= 14.04|
| 클라우드 및 컨테이너| Amazon ECS<br>AWS EKS (Helm)|

**참고**: arm64 아키텍처는 베타 버전으로 제공

지원되는 제품(에이전트 7.45+):

- 메트릭
- 로그
- APM 트레이스
- APM 프로필
- 계측 원격측정
- 프로세스
- Orchestrator 탐색기
- 런타임 보안

Datadog에이전트 FIPS 프록시는 다음을 지원하지 **않습니다**:

- 서버리스 모니터링
- 클러스터 에이전트와 노드 에이전트 간 통신
- 에이전트 통합
- GovCloud 이외의 다른 것으로의 아웃바운드 통신

## 필수 요구 조건

- TCP 포트 사용 가능 범위: 9803에서 9818
- Datadog 에이전트 >= v7.41

## FIPS 지원이 포함된 에이전트 설치

{{< tabs >}}
{{% tab "호스트 또는 VM" %}}

### 새 호스트에 에이전트 설치

Datadog에이전트 FIPS 프록시와 함께 Datadog 에이전트를 설치하려면 `DD_FIPS_MODE=1`를 [Datadog 에이전트 통합][1] 페이지의 1단계 설치 지침에 추가합니다. 예:

```shell
DD_API_KEY=<DD_API_KEY> \
DD_SITE="ddog-gov.com" \
DD_FIPS_MODE=1 \
bash -c "$(curl -L \
   https://install.datadoghq.com/scripts/install_script_agent7.sh)"
```

`DD_FIPS_MODE` 환경 변수를 설정하면 에이전트와 함께 FIPS 패키지가 설치되고 에이전트가 프록시를 사용하도록 설정됩니다. 이 방법을 사용하는 경우 추가 설정 단계는 없지만 [설치 확인](#virify-your-installation)을 실행해야 합니다.

### 기존 에이전트에 Datadog 에이전트 FIPS 프록시 추가

기존 에이전트 설치에 Datadog 에이전트 FIPS 프록시를 추가하려면 다음 단계를 실행합니다.

#### Datadog 에이전트 FIPS 프록시 패키지 설치

1. 다음 명령을 실행하여 Datadog 에이전트 FIPS 프록시를 설치합니다:

   Debian:
   ```shell
   apt-get update && apt-get install datadog-fips-proxy
   ```
   RHEL 및 Fedora:
   ```shell
   yum makecache && yum install datadog-fips-proxy
   ```
   SLES:
   ```shell
   zypper refresh datadog && zypper install datadog-fips-proxy
   ```

1. 처음 업그레이드할 때 예제 설정 파일을 알맞은 위치에 복사한 후 프록시를 다시 시작합니다. 업스트림 프록시 설정에 큰 변화가 없는 한 후속 업그레이드에서 설정을 복사할 필요가 없습니다:
   ```shell
   sudo cp /etc/datadog-fips-proxy/datadog-fips-proxy.cfg.example \
      /etc/datadog-fips-proxy/datadog-fips-proxy.cfg
   sudo chown dd-agent:dd-agent \
      /etc/datadog-fips-proxy/datadog-fips-proxy.cfg
   sudo chmod 640 /etc/datadog-fips-proxy/datadog-fips-proxy.cfg
   sudo systemctl restart datadog-fips-proxy
   ```

#### 에이전트에서 Datadog 에이전트 FIPS 프록시를 사용하도록 구성

Datadog 에이전트 FIPS 프록시 패키지는 US1-FED 데이터 센터에서 사용할 수 있도록 미리 설정되어 있습니다. 기존 Datadog 에이전트를 업그레이드하는 경우 프록시를 사용하도록 에이전트를 **반드시** 설정해야 합니다.

프록시를 사용하도록 에이전트를 설정하려면 [에이전트 설정 파일][2]에서 `fips.enabled`를 `true`로 설정하고, `fips.https`를 `false`로 설정하세요.

```yaml
fips:
  enabled: true
  https: false
```

`fips` 설정은 에이전트 버전 >= 7.41에서 사용할 수 있습니다.  설정이 활성화되면 Datadog 에이전트는 지원되는 제품의 모든 통신을 Datadog 에이전트 FIPS 프록시로 재접속합니다. 이 설정은 `dd_url`과 같은 커스텀 URL 옵션을 무시합니다.

`https` 옵션은 에이전트가 HTTP를 사용해 프록시와 통신하기 때문에 `false`로 설정됩니다. Datadog 에이전트 FIPS 프록시는 에이전트와 동일한 호스트에서 실행되며 해당 통신을 보호하기 위해 호스트의 보안에 의존합니다.

**호스트 보안 및 보안 강화는 사용자의 책임입니다.**

<div class="alert alert-warning">에이전트에서 <code>fips.enabled</code> 설정은 기본적으로 <code>false</code>로 설정됩니다. 모든 통신이 Datadog 에이전트 FIPS 프록시를 통해 전달되도록 하려면 <code>true</code>로 설정해야 합니다. <br><br><strong> <code>fips.enabled</code>가 <code>true</code>로 설정되지 않은 경우 FIPS 준수 상태가 아닙니다</strong>.</div>

### 설치 여부 확인

메트릭, 트레이스, 로그가 앱에 올바르게 보고되었는지 확인합니다.

메트릭의 경우 연결 진단 명령을 실행하고 모든 점검이 다음을 통과하는지 확인합니다.

```shell
sudo -u dd-agent datadog-agent diagnose --include connectivity-datadog-core-endpoints
# 에이전트 버전 < 7.48의 경우 다음 명령을 실행합니다.
# sudo -u dd-agent datadog-agent diagnose datadog-connectivity
```

앱에 보고된 메트릭, 트레이스, 로그가 표시되지 않으면 [트러블슈팅](#troubleshooting-a-bare-metal-or-vm-installation) 섹션을 참고하세요.

### 로그 보기

```shell
sudo journalctl -u datadog-fips-proxy
```

#### journald 로그 설정

[로그 관리][3]를 사용하고 Datadog 에이전트 FIPS 프록시 로그를 Datadog로 보내려면 journald에서 로그를 읽도록 Datadog 에이전트를 설정합니다.

1. 에이전트의 [설정 파일][2]에서 로그 에이전트를 활성화하도록 `logs_enabled`를 `true`로 설정하고 [설정 디렉토리][4]에서 `fips_proxy.d/conf.yaml`에 다음 내용으로 파일을 생성합니다.

   ```yaml
   logs:
     - type: journald
       source: datadog-fips-proxy
       include_units:
         - datadog-fips-proxy.service
   ```

1. `dd-agent` 사용자가 `systemd-journal` 그룹에 있는지 확인하세요. 자세한 내용은 [journald 통합][5] 문서를 참고하세요.
1. [에이전트를 재시작합니다][6].

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /ko/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[3]: /ko/logs/
[4]: /ko/agent/configuration/agent-configuration-files/#agent-configuration-directory
[5]: /ko/integrations/journald/#configuration
[6]: /ko/agent/configuration/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}

{{% tab "Amazon EKS의 Helm" %}}
`values.yaml` 파일에 다음 값을 설정하세요.

```yaml
fips:
  enabled: true
  use_https: false
```

`fips` 설정은 에이전트 버전 >= 7.41에서 사용할 수 있습니다. 설정이 활성화되면 Datadog 에이전트는 지원되는 제품의 모든 통신을 Datadog 에이전트 FIPS 프록시로 리디렉션합니다. 이 설정은 다`dd_url`과 같은 커스텀 URL 옵션을 무시합니다.

`use_https` 옵션은 에이전트가 HTTP를 사용하여 프록시와 통신하기 때문에 `false`로 설정됩니다. Datadog 에이전트 FIPS 프록시는 Datadog 에이전트와 동일한 호스트에서 실행되며 해당 통신을 보호하기 위해 호스트 보안에 의존합니다.

**호스트 보안 및 강화는 사용자의 책임입니다.**

<div class="alert alert-warning"> 에이전트에서 <code>fips.enabled</code> 설정은 기본값으로 <code>false</code>로 설정됩니다. 모든 통신이 Datadog 에이전트 FIPS 프록시를 통해 전달되도록 하려면 이 설정이 <code>true</code>로 설정되어야 합니다.<br><br><strong><code>fips.enabled</code>가 <code>true</code>로 설정되지 않은 경우 에이전트는 FIPS 호환되지 않습니다</strong>.</div>


{{% /tab %}}

{{% tab "Amazon ECS" %}}

Amazon  ECS에 FIPS 프록시를 설치하는 방법과 관련한 내용은 [GOVCLUOD 환경용 FIPS 프록시][1]를 참고하세요.

[1]: /ko/containers/amazon_ecs/#fips-proxy-for-govcloud-environments
{{% /tab %}}

{{< /tabs >}}

## 호스트 또는 VM 설치 트러블슈팅

Datadog 에이전트 FIPS 프록시 문제를 해결하려면 다음을 확인합니다:
- Datadog 에이전트 및 Datadog 에이전트 FIPS 프록시가 실행 중입니다.
- Datadog 에이전트는 Datadog 에이전트 FIPS 프록시와 통신할 수 있습니다.
- Datadog 에이전트 FIPS 프록시는 Datadog 수신 엔드포인트와 통신할 수 있습니다.

### 프록시 상태 점검

Datadog 에이전트 FIPS 프록시의 상태에 관한 정보를 얻으려면 다음 명령을 실행합니다.

```shell
sudo systemctl status datadog-fips-proxy
```

프록시가 실행 중인 경우 출력은 다음과 같이 보입니다.
```text
- datadog-fips-proxy.service - Datadog FIPS Proxy
  Loaded: loaded
    (/lib/systemd/system/datadog-fips-proxy.service;
      enabled; vendor preset: enabled)
  Active: active (running) since Tue 2022-07-19 16:21:15 UTC; 1min 6s ago
```

프록시 상태가 `inactive (dead)`인 경우 Datadog 에이전트 FIPS 프록시를 실행합니다.

```shell
sudo systemctl start datadog-fips-proxy
```

프록시 상태가 `failed`인 경우 오류로 인해 Datadog 에이전트 FIPS 프록시를 시작할 수 없습니다. 다음 명령을 실행하고 프록시 로그에서 오류를 검색합니다.

```shell
sudo journalctl -u datadog-fips-proxy --no-pager
```

### 프록시가 소켓을 바인딩할 수 없음

프록시 로그에 `bind socket` 오류가 표시되면 프록시는 호스트에서 이미 사용 중인 포트를 사용하려고 시도합니다. Datadog 에이전트 FIPS 프록시는 9803부터 9818까지 TCP 포트 범위를 사용합니다. 이 범위의 포트는 호스트에서 사용할 수 있어야 하며 다른 서비스에서 사용하지 않아야 합니다.

다음 예제에서는 포트가 이미 사용 중이므로 Datadog 에이전트 FIPS 프록시가 `9804` 포트의 소켓을 바인딩할 수 없습니다.

```text
[경고] (4518) : Frontend metrics-forwarder 시작 중: 소켓을 바인딩할 수 없음(주소가 이미 사용 중) [0.0.0.0:9804]
[경고] (4518) : [/opt/datadog-fips-proxy/embedded/sbin/haproxy.main()] 일부 프로토콜이 수신기를 시작하지 못했습니다. 종료합니다.
```

### 에이전트가 프록시에 연결할 수 없음

네트워크 문제를 점검하려면 `/var/log/datadog/agent.log`의 로그를 점검하거나 다음을 실행합니다.

```shell
datadog-agent diagnose --include connectivity-datadog-core-endpoints
# 에이전트 버전 < 7.48의 경우 다음 명령을 실행합니다:
# datadog-agent diagnose datadog-connectivity
```

다음과 같은 오류를 찾으세요.
```text
연결: 연결 거부, 컨텍스트 마감 시간 초과(헤더를 기다리는 동안 Client.Timeout 초과됨) 또는 피어에서 연결 재설정
```

- [프록시 상태 점검](#Check-the-proxy-status)의 단계에 따라 Datadog 에이전트 FIPS 프록시가 실행 중인지 확인합니다.
- 프록시의 포트 범위가 에이전트의 포트 범위와 일치하는지 확인합니다.

프록시가 실행 중이고 포트 범위가 올바른 경우, 컴퓨터의 로컬 방화벽이 에이전트의 프록시 액세스를 차단하고 있을 수 있습니다. 9804에서 9818까지의 TCP 포트에 연결할 수 있도록 방화벽을 설정합니다.

`curl`을 사용해 프록시에 액세스할 수 있는지 확인할 수 있습니다.

```shell
curl http://localhost:9804/
```

자세한 도움은 [에이전트 트러블슈팅][3]을 참고하세요.

### Datadog 에이전트 FIPS 프록시가 Datadog 수신점에 연결할 수 없음

`502`, `503` 또는 프록시가 빈 응답으로 돌아가는 등의 HTTP 오류가 있는 경우 Datadog 에이전트 FIPS 프록시가 트래픽을 Datadog 백엔드로 전달하지 못할 수 있습니다.

다음을 사용하여 Datadog 에이전트 FIPS 프록시 로그를 확인합니다.

```shell
sudo journalctl -u datadog-fips-proxy --no-pager
```

로그에 다음과 같은 오류가 있는지 점검합니다.

```text
haproxy[292759]: [경고] (292759) : 서버
datadog-api/mothership3 이 중지되었습니다, 이유: 레이어4 시간 초과, vcheck 지속 시간: 2000ms. 활성 서버 0개 및 백업 서버 0개 남음. 활성 세션 0개, 대기열 0개, 대기열 0개 남아 있음.
[경고] (292759) : 백엔드 'datadog-api'에 사용 가능한 서버가 없습니다!
```

또는

```text
haproxy[1808]: [경고] (1808) : 서버
datadog-metrics/mothership2가 중지됨, 이유: 레이어4
연결 문제, 정보: "연결 거부됨", 확인 기간: 0ms. 활성 서버 0개 및 백업 서버 0개 남음. 0
세션이 활성화되고, 0개가 대기열에 있고, 0개가 대기열에 남아 있습니다.
haproxy[1808]: [경고] (1808) : 백엔드 'datadog-metrics' 서버를 사용할 수 없습니다!
```

이러한 오류는 Datadog 에이전트 FIPS 프록시가 방화벽에 의해 차단되었거나 다른 네트워크 문제로 인해 백엔드 시스템에 연결할 수 없음을 나타냅니다. Datadog 에이전트 FIPS 프록시를 사용하려면 Datadog 수신 엔드포인트 인터넷 액세스가 필요합니다. 엔드포인트의 IP 주소는 [API][4]를 통해 찾을 수 있습니다.

에이전트에서 아웃바운드 연결에 관한 자세한 내용은 [네트워크 트래픽][5] 가이드를 참고하세요.

문제에 대해 확실하지 않을 경우 [Datadog 지원팀][6]에 문의하세요.

## 자주 묻는 질문

**1. Datadog 에이전트와 Datadog 에이전트 FIPS 프록시가 동일한 호스트에 있어야 하나요?**

예, FIPS 규정을 준수하려면 Datadog 에이전트 FIPS 프록시와 Datadog 에이전트가 동일한 호스트에 있어야 합니다.
마찬가지로 FIPS 규정을 준수하려면 `datadog.yaml`에서 `fips.enabled` 옵션을 `true`로 설정해야 합니다.

**2. 호스트의 보안 강화는 누가 담당하나요?**

Datadog 고객인 사용자가 호스트 보안과 보안 강화를 담당해야 합니다.

**3. Datadog 에이전트 FIPS 프록시 이미지는 강화되었나요?**

제공된 이미지는 보안을 염두에 두고 제작되었지만 CIS 벤치마크 권장 사항이나 DISASTIG 표준에 따라 평가되지 않았습니다.

**4. 에이전트 송수신 통신 모두에 FIPS가 지원되나요?**

Datadog 에이전트 FIPS 프록시는 에이전트에서 시작해서 Datadog 수신 API 엔드포인트를 대상으로 전달되는 통신만 보호합니다. 즉, 이 솔루션에서는 에이전트에서 종료되거나 에이전트에서 시작되는 다른 통신 형태는 FIPS가 지원되지 않습니다.

**5. 클러스터 에이전트와 노드 에이전트 간의 통신 모두에 FIPS가 지원되나요?**

Datadog 에이전트 FIPS 프록시는 클러스터 에이전트에서 시작해서 Datadog 수신 API 엔드포인트를 대상으로 전달되는 통신만 보호합니다. 즉, 이 솔루션에서는 클러스터 에이전트에서 종료되거나 클러스터 에이전트에서 시작되는 다른 통신 형태는 FIPS가 지원되지 않습니다.

**6. 배포나 테스트 요구에 맞게 Datadog 에이전트 FIPS 프록시를 구축하거나 재설정할 경우 FIPS 규정을 준수하는 것인가요?**

Datadog 에이전트 FIPS 프록시를 재구축, 재구성, 또는 수정하면 기술적으로는 작동할 수 있습니다. 그러나 설명서에 설명된 대로 Datadog 에이전트 FIPS 프록시를 정확히 사용하지 않으면 FIPS 규정을 준수한다고 보장할 수 없습니다.

**7. 위에 안내된 설치 단계를 모두 따르지 않았음에도 Datadog 에이전트가 데이터를 올바르게 전송하고 있습니다. FIPS를 준수하는 설정인가요?**

Datadog 에이전트 FIPS 프록시가 설명한대로 정확히 사용되지 않으면 FIPS를 준수한다고 보장할 수 없습니다.
올바른 구성을 하려면 `fips.enabled` 옵션을 설정해 Datadog 에이전트가 Datadog 에이전트 FIPS 프록시와 통신하도록 하고 Datadog 에이전트 FIPS 프록시를 실행해야 합니다.

**8. Datadog 에이전트 릴리스 버전이 Datadog 에이전트 FIPS 프록시 릴리스 버전과 연결되어 있나요?**

아니요. Datadog 에이전트 FIPS 프록시 릴리스는 Datadog 에이전트 릴리스와 분리되어 있습니다. Datadog 에이전트 및 Datadog 에이전트 FIPS 프록시 모두 최신 버전을 사용해야
Datadog 에이전트 및 Datadog 에이전트 FIPS 프록시에서 지원하는 모든 제품을 사용할 수 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://csrc.nist.gov/projects/cryptographic-module-validation-program/certificate/4282
[2]: https://csrc.nist.gov/CSRC/media/projects/cryptographic-module-validation-program/documents/security-policies/140sp4282.pdf
[3]: /ko/agent/troubleshooting/
[4]: https://ip-ranges.ddog-gov.com/
[5]: /ko/agent/configuration/network/#destinations
[6]: /ko/help/