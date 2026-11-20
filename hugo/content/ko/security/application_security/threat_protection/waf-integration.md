---
aliases:
- /ko/security/application_security/waf-integration/
- /ko/security/application_security/threats/waf-integration
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/aws-waf-datadog/
  tag: 블로그
  text: Datadog으로 AWS WAF 활동 모니터링
title: WAF 통합
---
웹 애플리케이션과 API를 보호하려면 인앱 모니터링과 경계 방어를 결합한 다층적 접근 방식이 필요합니다. 이러한 상호 보완적 전략을 통해 AWS Web Application Firewall(WAF)을 첫 번째 방어선으로 활용하고, WAF를 통과하는 공격을 차단하기 위해 Exploit Prevention을 사용하는 *심층 방어* App and API Protection 접근 방식을 취할 수 있습니다.

Exploit Prevention과 인앱 WAF의 차이점에 대한 자세한 내용은 [Exploit Prevention과 인앱 WAF 비교][5]를 참조하세요.

### 인앱 모니터링: 분산 트레이싱을 통한 심층 가시성 {#in-app-monitoring-deep-visibility-with-distributed-tracing}

애플리케이션 수준에서 Datadog AAP는 분산 트레이싱을 활용하여 마이크로서비스를 실시간으로 모니터링합니다. AAP 접근 방식은 요청이 다양한 서비스를 통과할 때 요청의 동작에 대한 상세하고 컨텍스트가 풍부한 인사이트를 제공합니다. 이러한 인사이트를 통해 다음과 같은 정교한 위협을 탐지할 수 있습니다.

- SQL 인젝션(SQLi) 및 로컬 파일 포함(LFI) 시도
- 비즈니스 규칙 우회 또는 엣지 케이스 악용과 같은 애플리케이션 로직 남용
- 노출된 엔드포인트의 오용

### 경계 방어: AWS WAF를 사용하여 엣지에서 위협 차단 {#perimeter-defense-blocking-threats-at-the-edge-with-aws-waf}

경계에서 AWS Web Application Firewall(WAF)은 첫 번째 방어선 역할을 하며, 트래픽이 애플리케이션에 도달하기 전에 필터링합니다. 이러한 솔루션은 다음을 차단하는 데 필수적입니다.

- 대규모 봇넷 공격 또는 분산 서비스 거부(DDoS) 공격
- 자격 증명 스터핑이나 스크래핑을 시도하는 악성 봇

### 컨텍스트 기반 적응형 보호의 중요성 {#the-importance-of-contextual-adaptive-protection}

위협의 성격에 따라 인앱 또는 경계 등 적절한 계층에 보호 제어를 적용해야 합니다. 예를 들면 다음과 같습니다.

- 경계 보호 사용 사례: 네트워크 엣지에서 효율적으로 완화할 수 있는 악성 IP 또는 대규모 공격 차단
- 인앱 보호 사용 사례: 취약성 악용, 비즈니스 로직 남용 또는 API 사용의 미묘한 이상 징후 탐지 및 차단

이러한 다층적 접근 방식은 합법적인 트래픽을 보호하는 데 필요한 정밀도를 희생하지 않으면서 위협을 최대한 조기에 무력화합니다.


## AAP와 AWS WAF 통합 {#aws-waf-integration-with-aap}

자세한 설정 지침은 [AWS WAF용 App and API Protection 활성화][6]를 참조하세요.

이 [통합][1]에서 지원하는 두 가지 주요 사용 사례는 다음과 같습니다.

1. Datadog AAP에서 AWS WAF 작업에 대한 가시성을 확보합니다. 예를 들면 다음과 같습니다.
   1. AWS WAF에 의해 허용된 총 요청 수와 차단된 총 요청 수 비교와 같은 메트릭
   2. 개별 AWS WAF 로그를 드릴다운하여 조회합니다([AWS WAF 로그를 Datadog으로 수집][2]해야 합니다).
   3. AWS WAF가 요청을 검사한 방법: 적용된 규칙 및 결정된 사항(허용, 차단 또는 카운트)

   <div class="alert alert-info">AAP는 AWS WAF 로그를 AAP 트레이스로 변환하여 애플리케이션 활동(트레이스)과 AWS WAF 활동(AAP 트레이스로 변환된 로그)을 AAP Trace Explorer에서 조회할 수 있도록 합니다.</div>

   <!-- {{< img src="security/application_security/threats/aws-waf-int-asm.png" alt="Datadog UI의 AWS WAF 통합 세부 정보" style="width:100%;" >}} -->

2. AWS WAF를 활용하여 공격자를 차단합니다.
   1. AWS WAF IP 세트를 Datadog AAP와 연결합니다. 기존 세트를 사용하거나 새로 생성할 수 있습니다. Datadog은 차단된 IP 주소를 이 IP 세트에 추가합니다. AAP [Signals][3] 또는 [Traces][4] 탐색기에서 공격자를 차단할 수 있습니다.

   <!-- {{< img src="/security/application_security/threats/aws-waf-blocked-ips.png" alt="AAP 차단 목록에 추가된 IP" style="width:100%;" >}} -->

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/appsec/protection?use-case=amazon_waf
[2]: /ko/integrations/amazon_waf/#log-collection
[3]: https://app.datadoghq.com/security/appsec/signals?query=@workflow.rule.type:%22Application%20Security%22
[4]: https://app.datadoghq.com/security/appsec/traces
[5]: /ko/security/application_security/#exploit-prevention-vs-in-app-waf
[6]: /ko/security/application_security/setup/aws/waf/