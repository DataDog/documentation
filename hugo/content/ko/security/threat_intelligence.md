---
aliases:
- /ko/security/threat_intel
description: Datadog의 위협 인텔리전스
further_reading:
- link: /security/application_security/how-it-works/threat-intelligence/
  tag: 설명서
  text: AAP 위협 인텔리전스
- link: /security/cloud_siem/threat_intelligence/
  tag: 설명서
  text: Cloud SIEM 위협 인텔리전스
- link: https://www.datadoghq.com/blog/cloud-security-investigation-ai/
  tag: 블로그
  text: Bits Security Analyst를 사용하여 클라우드 자격 증명 침해를 조사하는 방법
- link: https://www.datadoghq.com/blog/bits-threat-hunting/
  tag: 블로그
  text: Datadog Cloud SIEM으로 위협 헌팅 자동화
products:
- icon: siem
  name: Cloud SIEM
  url: /security/cloud_siem/
- icon: cloud-security-management
  name: Workload Protection
  url: /security/workload_protection/
- icon: app-sec
  name: App and API Protection
  url: /security/application_security/
title: Threat Intelligence
---
{{< product-availability >}}

## 개요 {#overview}

위협 인텔리전스는 대응자가 공격 및 침해에 대해 정보에 입각한 결정을 내릴 수 있도록 돕는 평판 정보입니다.

Datadog은 상용, 오픈 소스 및 사내 위협 인텔리전스 침해 지표를 범주와 의도별로 관리합니다. 위협 인텔리전스는 각 소스별로 최소 하루에 한 번 업데이트됩니다. 이 데이터는 관련 평판 정보를 사용하여 로그와 트레이스를 보강하는 데 사용됩니다.

## 사용자 보유 위협 인텔리전스 활용 {#bring-your-own-threat-intelligence}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-warning">이 기능은 다음에서 지원되지 않습니다. {{< region-param key="dd_site_name" >}}를 실행하세요.</div>
{{< /site-region >}}

Datadog Security는 Datadog Reference Tables에 저장된 위협 인텔리전스 침해 지표를 통해 트레이스를 보강 및 검색하는 기능을 지원합니다. [Reference Tables][2]을 사용하면 메타데이터를 Datadog에 이미 있는 정보와 결합할 수 있습니다.

위협 인텔리전스가 보강 데이터로 유지되는 시간은 소스에 따라 다릅니다.
- OEM 및 통합 기반 피드: 24시간
  - Datadog은 이러한 공급자로부터 최소 하루에 한 번 위협 인텔리전스를 다시 가져오며, 위협 인텔리전스 정보의 유지 여부는 공급자에 따라 다릅니다.
- 사용자 보유 위협 인텔리전스 활용: 인텔리전스를 사용 가능한 상태로 구성한 기간만큼 유지됩니다.

자세한 내용은 [사용자 보유 위협 인텔리전스 활용][3] 가이드를 참조하세요.

## 위협 인텔리전스 수명 주기 {#threat-intelligence-lifecycle}

Datadog은 다음 엔터티 유형 전반에서 위협 인텔리전스를 수집합니다. 각 엔터티 유형은 고유한 특성과 유용한 시간 범위를 가집니다. 이 시간 범위(수명 주기)는 데이터에서 위협 인텔리전스 일치 항목의 중요도를 평가할 때 고려해야 합니다.

### 파일 해시: 고유한 디지털 지문 {#file-hashes-unique-digital-fingerprints}

파일 해시는 특정 파일에 대한 고유한 디지털 지문 역할을 합니다. 파일 해시가 멀웨어로 표시되면 해당 파일의 정확한 콘텐츠가 유해함을 의미합니다. 파일 내용과 연결된 해시의 불변성은 일관된 식별을 보장합니다. 결과적으로, 멀웨어로 태그된 파일 해시는 해당 식별이 참양성이었다면 이 식별을 유지합니다.

### 애플리케이션 패키지: 배포 시 멀웨어 위험 {#application-packages-malware-risk-in-distribution}

불변하는 파일 해시와 달리, 애플리케이션 패키지는 동일한 버전 번호 하에서도 내용과 보안이 달라질 수 있습니다. 악의적인 행위자는 합법적인 패키지를 모방한 유해한 패키지를 업로드하거나, 멀웨어를 도입하여 기존 패키지를 손상시킬 수 있습니다. 악성 패키지의 수명 주기는 종종 길지만, 불변하지는 않습니다.

### 도메인: 임시 서명 {#domains-temporary-signatures}

파일 해시와 달리 악성으로 식별된 도메인은 변경될 수 있습니다. 도메인은 다양한 주체에 의해 수정, 재할당 또는 용도 변경과 같은 과정을 거칠 수 있습니다. 악성 또는 의심스러운 도메인의 수명은 IP 주소에 비해 다소 길지만, 여전히 일시적이고 가변적입니다.

### IP 주소: 동적이고 일시적임 {#ip-addresses-dynamic-and-transient}

IP 주소는 위협 인텔리전스에서 가장 변동성이 큰 요소이며, 종종 24시간 주기로 평판이 변경됩니다. 특히 여러 호스트가 관련될 수 있는 가정용 및 모바일 네트워크에서의 동적 특성을 고려할 때, 상태를 정기적으로 재평가하는 것이 중요합니다. 평판이 낮은 IP 주소에 연결된 모든 호스트가 본질적으로 악성인 것은 아니므로 상관관계 분석의 필요성이 강조됩니다.

## 위협 인텔리전스 모범 사례 {#best-practices-in-threat-intelligence}

위협 인텔리전스에서 평판은 핵심 요소이지만, 다른 증거와 함께 고려되어야 합니다. 몇 가지 예외를 제외하고는 트래픽 차단을 위해 IP 및 도메인 인텔리전스에만 의존하는 것은 권장되지 않습니다. 균형 잡힌 증거 기반 접근 방식이 필수적입니다.

[Detection Rules][1]에 사용되는 위협 인텔리전스는 카테고리(`@threat_intel.results.category`) 및 의도(`@threat_intel.results.intention`)와 같은 Datadog 키를 참조해야 합니다. 다른 키는 사용해서는 안 됩니다.

## 위협 인텔리전스의 투명성 {#transparency-in-threat-intelligence}

Datadog은 탐지와 관련된 외부 위협 인텔리전스 소스에 대한 외부 링크를 제공하여 투명성을 보장합니다. Datadog이 큐레이팅한 위협 인텔리전스는 보강 및 탐지를 위해 Datadog 플랫폼으로 적재됩니다. Datadog은 고객 데이터를 위협 인텔리전스 소스로 전송하지 않습니다.

탐지 및 보강 정보는 UI 및 이벤트 JSON에서 액세스할 수 있습니다.

## 위협 인텔리전스 패싯 {#threat-intelligence-facets}

소스, 카테고리 및 의도는 관련 제품 탐색기에서 패싯 및 필터로 사용할 수 있습니다.

### 위협 인텔리전스 소스 {#threat-intelligence-sources}

| 소스 | 카테고리 | 소스 사용 사례 | 주요 제품 |
|--------|------------|-----------|------------------|
| Datadog Threat Research| 스캐너, Redis 익스플로잇, Docker 익스플로잇, 멀웨어, 무차별 대입 공격자 | 소프트웨어 특정 위협에 초점을 맞춘 허니팟 | AAP, CWS 및 Cloud SIEM |
| [Datadog AAP](https://docs.datadoghq.com/ko/security/application_security/) | 스캐너 | 다수의 AAP 고객을 공격하는 것으로 관찰된 IP 목록 | AAP |
| [Spur](https://spur.us/) | residential_proxy | 크리덴셜 스터핑 및 사기와 관련된 프록시 | AAP 및 Cloud SIEM |
| [Spur](https://spur.us/) | malware_proxy | 멀웨어 명령 및 제어와 관련된 프록시 | Cloud SIEM 및 Workload Protection |
| [Abuse.ch](https://abuse.ch/) Malware Bazaar| 멀웨어 | 호스트의 멀웨어 | CWS |
| [Minerstat](https://minerstat.com/mining-pool-whitelist.txt) | 암호화폐 채굴 | 알려진 채굴 풀을 사용하는 코인마이너 활동| Workload Protection 및 Cloud SIEM |
| Tor | tor | 사용자 활동에 대한 정책 위반 | App and API Protection, Cloud SIEM 및 Workload Protection |
| [Threatfox](https://threatfox.abuse.ch/) | 멀웨어 | 알려진 멀웨어 인프라와 통신하는 호스트 식별 | Cloud SIEM 및 Workload Protection |


### 위협 인텔리전스 카테고리 {#threat-intelligence-categories}

| 카테고리 | 의도 | 엔티티 유형 | 제품 사용 사례 | 주요 제품 |
|----------|----------|--------------|----------|------------------|
| residential_proxy | 의심스러움 | IP 주소 | 크리덴셜 스터핑 및 사기에 대한 평판 | AAP 및 Cloud SIEM |
| botnet_proxy | 의심스러움 | IP 주소 | 봇넷의 일부로서 분산 공격에 기여하는 것에 대한 평판 | AAP 및 Cloud SIEM |
| 멀웨어 | 악성 | 애플리케이션 라이브러리 버전, 파일 해시 | 악성 패키지 및 마이닝 풀과의 통신| CWS |
| 스캐너 | 의심 | IP 주소 | 스캐너에 대한 평판 | App 및 API Protection, Workload Protection 및 Cloud SIEM |
| hosting_proxy | 의심 | IP 주소 | 분산 크리덴셜 스터핑 공격 등 악용 평판이 있는 데이터센터 IP | AAP 및 Cloud SIEM |
| tor | 의심 | IP 주소  | 사용자 활동에 대한 기업 정책 위반 | App 및 API Protection, Workload Protection 및 Cloud SIEM |
| disposable_email | 의심 | 도메인  | 일회용 이메일 주소에서 제품 사용 감지 | AAP |
| corp_vpn | 정상 | IP 주소 | 기업 VPN과 관련된 IP | AAP 및 Cloud SIEM |
| 암호화폐 채굴 | 악성 | IP 주소 | 암호화폐 채굴 활동과 관련된 IP 주소 | AAP, CWS 및 Cloud SIEM |

### 위협 인텔리전스 의도 {#threat-intelligence-intents}

| 의도     | 사용 사례                                     |
|------------|----------------------------------------------|
| 정상     | 기업 VPN 및 정보 강화 |
| 의심 | 낮은 평판                               |
| 악성  | 악성 평판                         |


## 엔터티 유형 {#entity-types}
| 엔터티 유형 | 예시 | 사용 사례 |
|-------------|---------|-----------------------------|
| IP 주소 | 128.66.0.1 | 공격, 명령 및 제어, 스캔 활동과 관련된 IP 주소 식별 |
| 도메인 | example.com, subdomain.example.com | 악성 용도와 관련된 도메인. 멀웨어와 함께 명령 및 제어로 자주 사용됩니다 |
| 애플리케이션 패키지 버전 | (example_package, 1.0.0) | PyPi에서 다운로드한 악성 패키지 식별 |
| 파일 해시 [SHA1, SHA256, ssdeep (Workload Protection 전용)] | 5f7afeeee13aaee6874a59a510b75767156f75d14db0cd4e1725ee619730ccc8 | 멀웨어 또는 침해와 관련된 고유 파일 식별 |

<div class="alert alert-info">위협 인텔리전스 소스 및 카테고리는 구성할 수 없습니다.</div>

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/security/detection_rules/
[2]: /ko/integrations/guide/reference-tables
[3]: /ko/security/guide/byoti_guide