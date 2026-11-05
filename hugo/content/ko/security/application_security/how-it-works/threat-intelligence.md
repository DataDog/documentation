---
aliases:
- /ko/security/application_security/threats/threat-intelligence
further_reading:
- link: https://www.datadoghq.com/blog/cloud-siem-enterprise-security
  tag: 블로그
  text: 'Datadog Cloud SIEM: 보안 운영의 혁신을 주도하다'
title: Threat Intelligence
---
## 개요 {#overview}

이 항목에서는 App and API Protection(AAP)을 위한 [위협 인텔리전스][1]에 대해 설명합니다.

Datadog은 AAP에 적합한 내장형 위협 인텔리전스 [데이터셋][1]을 제공합니다. 이는 보안 활동에 대한 조치를 취할 때 추가 증거를 제시하고, 일부 비즈니스 로직 탐지에 대한 탐지 임계값을 낮춥니다. 

또한 AAP는 *사용자 보유 위협 인텔리전스 활용*을 지원합니다. 이 기능은 비즈니스별 위협 인텔리전스를 통해 탐지를 보강합니다. 

## 모범 사례 {#best-practices}

Datadog은 위협 인텔리전스를 사용하기 위해 다음 방법을 권장합니다.

1. 비즈니스 로직 위협(예: 크리덴셜 스터핑)에 대한 탐지 규칙 임계값을 낮춥니다. 사용자는 기본 [크리덴셜 스터핑][6] 규칙을 복제하고 필요에 맞게 수정할 수 있습니다.
2. 위협 인텔리전스를 보안 활동에 대한 평판 지표로 사용합니다.

Datadog은 __ 다음을 권장하지 않습니다.
1. 해당 보안 활동이 없는 위협 인텔리전스 트레이스를 차단합니다. IP 주소 뒤에는 여러 개의 호스트가 있을 수 있습니다. 주거용 프록시 탐지는 해당 IP 뒤에 있는 호스트에 의해 관련 활동이 관찰되었음을 의미합니다. 멀웨어나 프록시를 실행하는 호스트가 서비스 통신 호스트와 동일함을 보장하지 않습니다.
2. 모든 위협 인텔리전스 카테고리를 차단합니다. 이는 기업 VPN의 양성 트래픽을 포함하고 악의적이지 않은 트래픽을 차단합니다.

## AAP의 위협 인텔리전스 필터링 {#filtering-on-threat-intelligence-in-aap}

사용자는 패싯 및 검색 창을 사용하여 Signals 및 Traces 탐색기에서 위협 인텔리전스를 필터링할 수 있습니다.

특정 소스로 플래그가 지정된 모든 트레이스를 검색하려면 소스 이름과 함께 다음 쿼리를 사용하세요.

    @threat_intel.results.source.name:<SOURCE_NAME> 

모든 소스의 위협 인텔리전스가 포함된 모든 트레이스를 쿼리하려면 다음 쿼리를 사용하세요.

    @appsec.threat_intel:true 

## 사용자 보유 위협 인텔리전스 활용 {#bring-your-own-threat-intelligence}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-warning">이 기능은 다음에서 지원되지 않습니다. {{< region-param key="dd_site_name" >}}</div>
{{< /site-region >}}

AAP는 Datadog Reference Tables에 저장된 위협 인텔리전스 침해 지표를 통해 트레이스를 보강 및 검색하는 기능을 지원합니다. [Reference Tables][2]을 사용하면 메타데이터를 Datadog에 이미 있는 정보와 결합할 수 있습니다.

자세한 내용은 [사용자 보유 위협 인텔리전스 활용][14] 가이드를 참조하세요.


## 사용자 인터페이스의 위협 인텔리전스 {#threat-intelligence-in-the-user-interface}

AAP Traces Explorer에서 트레이스를 볼 때 `@appsec` 속성 아래의 위협 인텔리전스 데이터를 확인할 수 있습니다. `category` 및 `security_activity` 속성이 모두 설정되어 있습니다.

<!-- {{< img src="security/application_security/threats/threat_intel/threat_intel_appsec.png" alt="위협 인텔리전스 데이터가 포함된 appsec 속성 예시">}} -->

`@threat_intel.results` 아래의 어떤 소스에서 일치하는지에 대한 세부 정보가 항상 표시됩니다.

 <!-- {{< img src="security/application_security/threats/threat_intel/threat_intel_generic.png" alt="위협 인텔리전스 데이터가 포함된 threat_intel 속성 예시">}} -->

## 추가 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/security/threat_intelligence/#threat-intelligence-sources
[2]: /ko/integrations/guide/reference-tables
[3]: /ko/security/threat_intelligence/#threat-intelligence-facets
[4]: https://app.datadoghq.com/reference-tables/create
[5]: https://app.datadoghq.com/security/configuration/threat-intel
[6]: https://app.datadoghq.com/security/appsec/detection-rules?query=type%3Aapplication_security%20defaultRuleId%3Adef-000-yk4
[7]: /ko/security/threat_intelligence#threat-intelligence-categories
[8]: /ko/security/threat_intelligence#threat-intelligence-intents
[9]: https://app.datadoghq.com/security/appsec/traces
[10]: /ko/integrations/guide/reference-tables/?tab=manualupload#create-a-reference-table
[11]: /ko/integrations/guide/reference-tables/?tab=amazons3#create-a-reference-table
[12]: /ko/integrations/guide/reference-tables/?tab=azurestorage#create-a-reference-table
[13]: /ko/integrations/guide/reference-tables/?tab=googlecloudstorage#create-a-reference-table
[14]: /ko/security/guide/byoti_guide