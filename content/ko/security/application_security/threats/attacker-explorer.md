---
disable_toc: false
further_reading:
- link: /security/application_security/threats/protection
  tag: 설명서
  text: 보호
title: Attacker Explorer
---

이 가이드에서는 **Attacker Explorer**를 사용하여 Flagged Attackers를 조사하고 차단하는 방법을 설명합니다.

## 개요

Datadog 애플리케이션 보안 관리(ASM)는 공격자를 의심스러운 것으로 식별하고 플래그를 지정합니다. [Attacker Explorer][1]를 사용하면 공격자를 조사하고 조치를 취할 수 있습니다.


### 정의

- **Suspicious Attackers:** 지난 24시간 동안 최대 임계값까지 공격 트래픽을 보낸 IP 주소입니다.

- **Flagged Attackers:** 지난 24시간 동안 Suspicious Attackers 임계값을 초과하는 공격 트래픽을 보낸 IP 주소입니다.  Flagged Attackers를 조사하고 차단해야 합니다.

<div class="alert alert-info"><strong>Flagged Attackers</strong> 및 <strong>Suspicious Attackers</strong>는 상호 배타적입니다. 한 IP는 동시에 두 상태로 있을 수 없습니다.</div>

### Attacker Explorer가 Signal 및 Trace Explorer와 다른 점

다음을 통해 다양한 탐색기 간의 차이점을 확인하세요. 

- **Protect:** ASM Protection 구성을 사용한 자동 차단. 사용자는 첫 번째 자동 차단 조치로 공격 도구를 차단해야 합니다. 공격 도구를 차단하면 SQLi, 명령 주입, SSRF 등 OWASP 위협에 대한 일반적인 취약점 발견이 줄어듭니다.
- **Reactive:** 관찰된 위협에 대응해 Signals 또는 Attackers Explorer를 사용하여 차단합니다.

{{< img src="security/application_security/threats/attacker-explorer/attacker_explorer_nav.png" alt="ASM Attacker Explorer 탐색 스크린샷"  >}}

각 탐색기는 특정 사용 사례에 중점을 둡니다.

- **Signal Explorer**: 크리덴셜 스터핑 공격, 명령 주입 등 실행 가능한 경고 목록입니다. 신호에는 워크플로 기능, 설명, 심각도 및 상호 연관된 트레이스가 있습니다. 상호 작용에는 사용자 할당 워크플로, 자동화된 보호, 분석, 검색 및 Trace Explore로의 피버팅이 포함됩니다.
- **Trace Explorer**: 로그인 또는 공격 페이로드와 같은 비즈니스 로직 이벤트에 대한 증거 목록입니다. 상호작용에는 분석과 검색이 포함됩니다.
- **Attacker Explorer**: Flagged 및 Suspicious Attackers 목록. 상호작용에는 다음이 포함됩니다.
  - 공격자 분석 및 차단을 위한 일괄 조치
  - 공격자 기록 드릴다운
  - 검색
  - 다른 Explorer에 피버팅 


### 공격자 탐색 및 필터링

공격자를 조사하기 위해 [Attacker Explorer][1]로 이동합니다.

{{< img src="security/application_security/threats/attacker-explorer/attacker_explorer_default_view2.png" alt="ASM Attacker Explorer"  >}}

Attacker Explorer에는 두 가지 섹션이 있습니다.

1. 패싯과 검색. 이를 통해 서비스 또는 공격자 속성별로 트래픽을 필터링할 수 있습니다.
2. 보안 메트릭이 있는 공격자 목록.


### IP 조사

IP의 기록과 속성을 보려면 행을 클릭합니다.

{{< img src="security/application_security/threats/attacker-explorer/ip_drawer.png" alt="ASM Attacker Explorer를 사용해 IP 주소 조사"  >}}

IP 서랍에서 IP를 차단하거나 Passlist에 추가할 수 있습니다.

### Attacker Explorer를 이용한 차단 모범 사례

1. 계정 탈취 공격: IP 주소를 차단하는 데 짧은 기간을 사용합니다.
2. 활동을 관찰하되 차단을 방지하려면 모니터링되는 패스리스트에 승인된 스캐너를 추가하세요.
3. 모바일 ISP를 주의해서 차단하세요. 이러한 네트워크에는 단일 IP 주소 뒤에 수많은 사용자와 모바일 장치가 있을 수 있습니다.

## 개별 IP 차단

개별 IP를 일시적 또는 영구적으로 차단하려면 다음을 수행하세요.

{{< img src="security/application_security/threats/attacker-explorer/block_ip_address.png" alt="ASM Attacker Explorer로 IP 차단"  >}}

1. 행에서 `Block`을 클릭합니다.
2. 차단 기간을 선택합니다.

## IP 일괄 차단

Attacker Explorer의 **Compare and Block** 옵션을 사용하여 여러 IP를 선택하고 일시적 또는 영구적으로 차단할 수 있습니다.

**Compare and Block**은 안전하고 확실하게 차단할 수 있도록 IP에 대한 메트릭을 제공합니다. 예를 들어, **Similarity Overview**, **Activity**입니다. (후반부에서 자세히 설명)

IP를 일괄적으로 비교하고 차단하려면 다음을 수행하세요.
1. 검색 또는 패싯을 사용하여 Attacker 목록을 필터링합니다.
2. 여러 IP를 선택합니다.
3. **Compare and Block** 옵션을 선택합니다.

   다음 예에서는 선택한 IP가 동일한 위치에 있으며 서로 관련되어 있는 것으로 보입니다. **Compare and Block** 옵션은 선택된 IP 주소에 대한 메트릭과 속성을 표시하는 **Block selected attackers** 보기를 엽니다.

    {{< img src="security/application_security/threats/attacker-explorer/attacker_explorer_review_groups2.png" alt="ASM Attacker Explorer 그룹 차단 스크린샷"  >}}

4. 공격자를 차단하려면 **Block**을 클릭합니다.

## 선택된 공격자 메트릭 차단 

 **Compare and Block** 옵션을 선택하면 **Block selected attackers** 보기가 열리고 선택한 IP 주소에 대한 메트릭과 속성이 표시됩니다.

{{< img src="security/application_security/threats/attacker-explorer/attacker_explorer_review_groups2.png" alt="ASM Attacker Explorer 그룹 차단 스크린샷"  >}}

<div class="alert alert-info"><strong>Similarity Overview</strong> 및 <strong>Activity</strong>에 대한 메트릭의 범위는 지난 30일입니다.</a></div>

**Block selected attackers** 보기 메트릭에 대해 다음 섹션에서 확인하세요.

### 선택된 IP

탐색기에서 선택한 IP가 포함되어 있습니다. IP를 선택 취소하면 메트릭 섹션과 **Block** 작업에서 해당 IP가 제거됩니다.

### Similarity Overview

각 열은 안전하고 확실하게 차단할 수 있도록 도와줍니다. 제공된 속성은 ASM의 Attacker Similarity 기능에서도 사용됩니다.

ASNs
: 자율 시스템 번호. 다수의 IP 주소를 사용한 공격은 동일한 ASN에서 시작될 수 있으며, 특히 공격이 데이터 센터 및 클라우드 IP에서 시작되는 경우 더욱 그렇습니다.

사용자 에이전트
: 공격자, 상업용 스캐너 및 자체 소프트웨어는 예측 가능한 사용자 에이전트를 사용하여 차단에 포함하거나 제외해야 하는 항목을 정합니다.

위치
: 회사에는 트래픽을 허용하는 국가를 결정하는 정책이나 서비스 가능한 시장이 있을 수 있습니다.

도메인
: ASN의 소유자입니다. 이는 조직이 여러 ASN을 소유한 경우에 유용합니다.

IP 당 사용자
: 해당 IP에서 인증한 사용자 수입니다. 로그인 수가 많은 IP는 로드 밸런서이거나 회사 사이트와 같이 동일한 위치에 있는 많은 사용자를 나타낼 수 있습니다.

### Activity

활동 기간은 30일입니다.

#### 신호

선택한 시간 동안 IP 주소와 연결된 신호입니다.

#### 트레이스

선택한 시간 동안 IP 주소와 연결된 트레이스입니다.

정상 트래픽은 샘플링된 APM 트래픽이며 비즈니스 로직이나 공격 트래픽 감지가 없는 트레이스입니다.

공격 트래픽은 비즈니스 로직을 포함한 모든 ASM 트레이스입니다.

### 차단

이렇게 하면 지정된 기간 동안 [Denylist][2]에 IP 주소가 추가됩니다.


[1]: https://app.datadoghq.com/security/appsec/attackers
[2]: https://app.datadoghq.com/security/appsec/denylist
[3]: https://app.datadoghq.com/security/appsec/passlist