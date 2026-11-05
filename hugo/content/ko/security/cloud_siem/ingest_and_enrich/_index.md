---
disable_toc: false
further_reading:
- link: https://docs.datadoghq.com/getting_started/security/cloud_siem/
  tag: 설명서
  text: Cloud SIEM 시작하기
- link: https://www.datadoghq.com/blog/monitoring-cloudtrail-logs/
  tag: 블로그
  text: AWS CloudTrail 로그 모니터링을 위한 모범 사례
- link: https://www.datadoghq.com/blog/how-to-monitor-authentication-logs/
  tag: 블로그
  text: 인증 로그 모니터링을 위한 모범 사례
- link: https://www.datadoghq.com/blog/ocsf-common-data-model//
  tag: 블로그
  text: Datadog Cloud SIEM에서 OCSF Common Data Model을 사용하여 데이터 정규화
title: 수집 및 보강
---
## 개요 {#overview}

Cloud SIEM 탐지 규칙은 로그와 보안 데이터를 분석하여 위협이 탐지되면 보안 신호를 생성합니다. Cloud SIEM을 활성화한 후, 모니터링하려는 소스의 로그를 수집하고 보강하도록 Datadog을 구성합니다.

## 보안 데이터 수집 {#ingest-security-data}
Datadog에 데이터를 전송하는 가장 쉬운 방법은 Cloud SIEM을 위해 특별히 설계된 통합인 [콘텐츠 팩][1]을 사용하는 것입니다. 각 콘텐츠 팩에는 로그를 수집하도록 통합을 구성하는 방법에 대한 지침과 다음과 같은 구성 요소에 대한 정보가 포함되어 있습니다.

- 탐지 규칙
- 기본 제공 대화형 대시보드
- 구문 분석 도구
- SOAR 워크플로

[콘텐츠 팩][1]은 널리 사용되는 다양한 보안 기술에 제공됩니다.

사용자 지정 로그가 있거나 Cloud SIEM의 [콘텐츠 팩][2] 페이지에 나열되지 않은 데이터 소스가 있는 경우, Datadog의 광범위한 [통합 라이브러리][3]에서 해당 통합이 제공되는지 확인하세요. 사용할 수 없는 경우, 해당 로그를 [사용자 지정 로그][4]로 Cloud SIEM에 전송하여 분석할 수 있습니다.

## 로그 보강 {#enrich-logs}

### 위협 인텔리전스 {#threat-intelligence}

Datadog은 Cloud SIEM 로그를 위한 내장 [위협 인텔리전스][5]를 제공하며, Datadog 참조 표에 저장된 위협 인텔리전스 침해 지표(IoC)를 사용한 보강 및 검색도 지원합니다. 자세한 내용은 [Bring Your Own Threat Intelligence][6]를 참조하세요.

### 뮤트된 지표 {#muted-indicators}

위협 인텔리전스 지표가 조직에 무해한 경우, 이를 뮤트하여 Cloud SIEM이 로그 보강 및 IOC Explorer에서 해당 지표를 `benign`으로 평가하도록 할 수 있습니다. 또한 Datadog은 모든 조직에 대해 뮤트되는 무해한 것으로 알려진 지표의 읽기 전용 목록을 유지 관리합니다. 자세한 내용은 [뮤트된 지표][7]를 참조하세요.

### Open Cybersecurity Framework(OCSF) {#open-cybersecurity-framework-ocsf}

[Open Cybersecurity Framework(OCSF)][8]는 Cloud SIEM에 직접 통합되어 있어, 수집되는 보안 로그가 기본 제공 파이프라인을 통해 OCSF 호환 속성으로 자동 보강됩니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/security/cloud_siem/content_packs/
[2]: https://app.datadoghq.com/security/siem/content-packs
[3]: /ko/integrations/
[4]: /ko/logs/log_collection/
[5]: /ko/security/threat_intelligence/#threat-intelligence-sources
[6]: /ko/security/cloud_siem/threat_intelligence#bring-your-own-threat-intelligence
[7]: /ko/security/cloud_siem/ingest_and_enrich/muted_indicators/
[8]: /ko/security/cloud_siem/open_cybersecurity_schema_framework