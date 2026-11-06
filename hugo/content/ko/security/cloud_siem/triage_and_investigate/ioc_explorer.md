---
further_reading:
- link: /security/threat_intelligence/
  tag: 설명서
  text: 위협 인텔리전스
- link: /security/cloud_siem/ingest_and_enrich/threat_intelligence
  tag: 설명서
  text: 사용자 보유 위협 인텔리전스 활용
- link: https://www.datadoghq.com/blog/recorded-future-content-pack/
  tag: 블로그
  text: Recorded Future 위협 인텔리전스를 Datadog Cloud SIEM과 통합
- link: https://www.datadoghq.com/blog/cloud-siem-whats-new-rsa-2026
  tag: 블로그
  text: 'Cloud SIEM의 새로운 기능: AI 기반 조사, 향상된 위협 인텔리전스, 확장 가능한 보안 운영'
- link: /security/cloud_siem/ingest_and_enrich/muted_indicators/
  tag: 설명서
  text: 뮤트된 지표
title: IOC 탐색기
---
## 개요 {#overview}

IOC(침해 지표)는 IP 주소, 파일 해시, 도메인과 같은 엔터티와 관련된 평판 데이터로, 대응자가 공격 및 잠재적 침해에 대해 정보에 입각한 결정을 내릴 수 있도록 돕습니다. [IOC Explorer][1]는 침해 사례를 분석하고 정렬하며 우선순위를 지정할 수 있는 검색 및 필터링 기능을 갖춘 조사 화면입니다. Signals Explorer와 Logs Explorer에서 관련 일치 항목을 확인하여 잠재적인 침해를 더 자세히 조사할 수도 있습니다.

{{< img src="security/security_monitoring/ioc_explorer_2.png" alt="침해 지표로 표시된 IP 주소를 보여주는 IOC Explorer" style="width:100%;" >}}

## 전제 조건 {#prerequisites}

IOC Explorer에서 데이터를 보려면 다음 조건을 모두 충족해야 합니다.
- 조직이 Cloud SIEM을 구독해야 합니다.
- 침해 지표는 로그 수집 시점에 Datadog에서 사용할 수 있었던 위협 피드에 포함되어 있어야 합니다.
  - IOC Explorer에 콘텐츠가 표시되는 위협 인텔리전스 피드에 대한 자세한 내용은 [위협 인텔리전스 소스][2]를 참조하세요.
- Explorer의 기간은 최근 30일로 고정되어 있습니다. 로그는 해당 기간 내에 생성된 것이어야 합니다. 조직이 최근에 온보딩한 경우, Explorer에는 온보딩 시점부터의 데이터가 표시됩니다.

## IOC Explorer 사용 {#use-the-ioc-explorer}

Datadog에서 IOC Explorer에 액세스하려면 {{< ui >}}Security{{< /ui >}} > {{< ui >}}Cloud SIEM{{< /ui >}} > {{< ui >}}Investigate{{< /ui >}} > [{{< ui >}}IOC Explorer{{< /ui >}}][1]로 이동합니다.

### 침해 지표 쿼리 및 필터링 {#query-and-filter-indicators-of-compromise}

사용자 지정 쿼리를 작성하거나 필터를 적용하여 탐색기에서 조회할 침해 지표를 지정할 수 있습니다. 다음 항목을 기준으로 쿼리하거나 필터링할 수 있습니다.
- 심각도 점수
- 신호 이름
- [위협 인텔리전스 소스][2]
- 태그(점수 산정 엔진의 출력 포함)
- 지표
- [지표 유형][3]
- [위협 인텔리전스 카테고리][4]
- 자율 시스템(AS) 유형
- [일치 항목이 발견된 OCSF 필드](#understand-ocsf-matching)
- [뮤트 상태](#mute-benign-indicators)

또한 Explorer에서 열 제목을 클릭하면 해당 열의 값을 기준으로 정렬할 수 있습니다.

### OCSF 일치 방식 이해 {#understand-ocsf-matching}

{{< ui >}}OCSF Matching{{< /ui >}} 토글을 켜거나 꺼서 Datadog이 IOC 일치 항목을 식별하는 방식을 더 세밀하게 제어할 수 있습니다.
- 정규화된 보안 속성과 연결된 **신뢰도가 더 높은 일치 항목**을 원하면 토글을 **켭니다**.
  
  토글이 켜져 있으면 소스 IP, 목적지 IP 또는 클라이언트 IP와 같이 매핑된 OCSF 필드에 값이 있는 경우에만 Explorer에 IOC 일치 항목이 표시됩니다. 이렇게 하면 일치 결과가 단순히 원시 로그 어딘가에 IOC가 존재한다는 사실이 아니라 데이터의 구조화된 의미를 반영하도록 할 수 있습니다.
- 전체 이벤트 페이로드에 걸쳐 **더 광범위한 위협 헌팅**을 원하면 토글을 **끕니다**.
  
  토글이 꺼져 있으면 메시지 본문이나 기타 자유 형식 필드와 같은 구조화되지 않은 텍스트를 포함하여 이벤트 내 어디에서든 IOC가 발견되면 Explorer에 일치 항목이 표시됩니다.

#### 예시 {#example}

Alice가 Bob에게 보낸 이메일의 메시지 본문에 IOC인 IP 주소 `192.0.2.100`이 언급되어 있습니다.
- OCSF Matching 토글이 **켜져** 있으면 Datadog은 이메일 이벤트의 정규화된 소스 또는 목적지 IP 주소 필드 등 관련 매핑된 OCSF 필드에서 발견된 IOC만 일치 항목으로 식별합니다. `192.0.2.100`이 메시지 본문에만 나타나고 매핑된 OCSF 필드에는 나타나지 않으므로 IOC Explorer에는 표시되지 않습니다.
- OCSF Matching 토글이 **꺼져** 있으면 Datadog은 메시지 본문과 같은 구조화되지 않은 텍스트를 포함하여 전체 이벤트 페이로드를 검색하므로 `192.0.2.100`을 IOC와 일치하는 항목으로 식별합니다. IOC가 IOC Explorer에 표시됩니다.

### 침해 지표에 대한 추가 컨텍스트 확인 {#get-more-context-on-an-indicator-of-compromise}

IOC Explorer에서 침해 지표를 클릭하면 수정 작업의 우선순위를 정하는 데 도움이 되는 다음과 같은 추가 정보를 확인할 수 있습니다.
- 지표에 할당된 카테고리와 해당 지표가 발견된 위협 인텔리전스 피드
- 지표에 할당된 등급 및 해당 등급과 관련된 위협 인텔리전스 피드
- 지표의 심각도 점수 분석
- 관련 소스 및 서비스를 포함하여 지표와 관련된 환경
- 지표가 영향을 미칠 수 있는 관련 항목
- 관련 조사 화면으로 연결되는 링크:
  - [Signals Explorer][6]에서 확인할 수 있는 신호 일치 항목
  - [Log Explorer][7]에서 확인할 수 있는 관련 로그

### 무해한 지표 뮤트 {#mute-benign-indicators}

기업 VPN 송신 IP 주소와 같이 조직에 무해한 지표인 경우, 사이드 패널에서 {{< ui >}}Mute This IoC{{< /ui >}}를 클릭하거나 여러 지표를 선택하여 일괄 뮤트합니다. 뮤트된 지표는 Explorer에 계속 표시되며, 조직에 대한 해당 지표의 위협 인텔리전스 등급은 무해함으로 변경됩니다. {{< ui >}}Custom mute{{< /ui >}} 열과 {{< ui >}}Muted{{< /ui >}} 패싯은 조직에서 뮤트한 지표를 표시하며, {{< ui >}}Muted Indicators{{< /ui >}} 버튼을 클릭하면 모든 활성 뮤트 항목이 나열됩니다. 자세한 내용은 [뮤트된 지표][8]를 참조하세요.

## 심각도 점수 산정 방식 이해 {#understand-severity-scoring}

조사의 우선순위를 적절하게 지정하려면 지표의 심각도 점수에 대한 정확한 컨텍스트를 파악하는 것이 중요합니다. 예를 들어, [IP 주소][5]는 변동성이 높아 자주 재평가해야 할 수 있습니다.

IOC Explorer의 사이드 패널에서 심각도 점수에 영향을 미치는 요인을 확인할 수 있습니다. 심각도 점수는 분류에 따른 기본 점수에서 시작하며, 추가 요인에 따라 증가하거나 감소합니다.
- **분류**: 지표의 카테고리 및 의도에 따른 기본 점수
- **확증**: 지표가 여러 위협 인텔리전스 피드에 표시되는지 여부
- **지속성**: 위협 인텔리전스 피드에서 해당 지표를 보고해 온 기간
- **호스팅 유형**: IP 및 도메인 엔터티 유형에 사용되며, 호스팅 인프라 유형이 공격에 흔히 사용되는지 평가
- **신호 활동**: 지표가 Signals에서 관찰되었는지 여부

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/siem/ioc-explorer
[2]: /ko/security/threat_intelligence/#threat-intelligence-sources
[3]: /ko/security/threat_intelligence/#entity-types
[4]: /ko/security/threat_intelligence/#threat-intelligence-categories
[5]: /ko/security/threat_intelligence/#ip-addresses-dynamic-and-transient
[6]: /ko/security/cloud_siem/triage_and_investigate/investigate_security_signals/#signals-explorer
[7]: /ko/logs/explorer/
[8]: /ko/security/cloud_siem/ingest_and_enrich/muted_indicators/