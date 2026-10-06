---
aliases:
- /ko/security/application_security/policies/
- /ko/security/application_security/threats/protection
disable_toc: false
title: 정책
---
{{< site-region region="gov" >}}
<div class="alert alert-info">
App and API Protection은 Datadog Government 사이트 US1-FED에서 미리 보기로 제공되고 있습니다.
</div>
{{< /site-region >}}

서비스가 [Remote Configuration이 활성화되고 이를 지원하는 SDK 버전이 있는 Agent][2]를 실행 중인 경우, Agent 또는 SDK 추가 구성 없이도 Datadog UI에서 공격과 공격자를 차단할 수 있습니다.

App and API Protection(AAP) Protect를 사용하면 공격과 공격자를 _차단_하여 속도를 늦출 수 있습니다. 보안 트레이스는 Datadog SDK에 의해 실시간으로 차단됩니다. 차단은 Datadog 플랫폼에 저장되며, 인프라에 배포된 Datadog Agent가 이를 자동으로 안전하게 가져와 서비스에 적용합니다.

## 전제 조건 {#prerequisites}

서비스에서 보호 기능을 사용하는 방법:

- [Datadog Agent를 최소 7.41.1 버전으로 업데이트][3]합니다.
- [AAP를 활성화합니다][1].
- [Remote Configuration을 활성화합니다][2].
- 보호를 활성화하는 데 필요한 최소 버전 이상으로 SDK를 업데이트합니다. 자세한 정보는 [호환성][12]에서 서비스 언어에 해당하는 AAP 기능 지원 섹션을 참조하세요.
- 인증된 사용자 차단을 사용할 계획이라면 [트레이스에 사용자 정보를 추가][4]하세요.

## 공격자(IP 및 인증된 사용자) 차단 {#blocking-attackers-ips-and-authenticated-users}

AAP [보안 신호][5]에서 플래그가 지정된 공격자를 일시적 또는 영구적으로 차단할 수 있습니다.. Signals Explorer에서 신호를 클릭하여 해당 신호를 생성하는 사용자와 IP 주소를 확인하고 필요한 경우 차단하세요.

이후 모든 AAP 보호 서비스는 지정된 기간 동안 차단된 IP 또는 사용자가 수행하는 수신 요청을 차단합니다. 차단된 모든 트레이스에는 `security_response.block_ip` 또는 `security_response.block_user` 태그가 지정되며 [Trace Explorer][6]에 표시됩니다. AAP가 비활성화된 서비스는 보호되지 않습니다. 자세한 정보는 [보안 신호 조사][20]를 참조하세요.

## 공격자 차단을 자동화하여 실시간으로 위협에 대응 {#respond-to-threats-in-real-time-by-automating-attacker-blocking}

공격자를 수동으로 차단하는 것 외에도 자동화 규칙을 구성하여 보안 신호에서 플래그된 공격자를 AAP가 자동으로 차단하도록 할 수 있습니다.

시작하려면 {{< ui >}}Security{{< /ui >}} > {{< ui >}}App & API Protection{{< /ui >}} > {{< ui >}}Policies{{< /ui >}} > [{{< ui >}}Detection Rules{{< /ui >}}][14]로 이동하세요. 규칙을 새로 만들거나 기존 규칙을 편집할 수 있습니다. 예를 들어 크리덴셜 스터핑 공격이 탐지될 때 `Critical` 심각도 신호를 트리거하고 관련 공격자의 IP 주소를 30분 동안 자동으로 차단하는 규칙을 만들 수 있습니다.

**참고**: 인증된 공격자를 차단하려면 서비스에 계측을 적용해야 합니다. 자세한 정보는 [사용자 모니터링 및 보호][15]를 참조하세요.

## 경계에서 공격자 차단 - AAP를 기존 WAF 배포와 통합 {#block-attackers-at-the-perimeter-integrate-aap-with-your-existing-waf-deployments}

Datadog AAP를 사용하면 보안 신호에서 직접, 경계에서 공격자를 차단할 수 있습니다. AAP는 [Workflows][17]와 통합되어 공격자의 IP 주소를 경계 Web Application Firewall(AWS WAF, Cloudflare, Fastly)로 전달하고, 이러한 공격자가 보낸 요청이 고객 환경에 진입하기도 전에 엣지에서 차단되도록 합니다.
사용 가능한 [Blueprints][18]에서 워크플로를 생성하고 AAP의 신호 사이드 패널에서 직접 실행하세요.

## Denylist{#denylist}

영구적 또는 일시적으로 차단된 공격자의 IP 주소와 인증된 사용자는 _Denylist_에 추가됩니다. [Denylist 페이지][7]에서 목록을 관리하세요. Denylist는 IP 범위(CIDR 블록)는 물론 개별 IP 차단도 지원합니다.

**참고**: 기본적으로 Denylist에는 최대 2,500개의 항목(IP 주소, CIDR 범위 및 인증된 사용자를 합쳐서)을 포함할 수 있습니다. 이 한도를 초과하여 추가된 항목은 Datadog UI에서는 허용되지만 적용되는 Denylist 구성에는 포함되지 않으므로 해당 항목에 대한 차단은 적용되지 않습니다. 이 한도로 허용되는 것보다 많은 항목을 차단해야 하는 경우 [Datadog 지원팀][21]에 문의하여 한도 증가를 요청하세요.

## Passlist {#passlist}

_Passlist_를 사용하여 특정 IP 주소가 애플리케이션에 영구적으로 액세스할 수 있도록 허용할 수 있습니다. 예를 들어 내부 IP 주소나 애플리케이션에 대해 정기적으로 보안 감사를 수행하는 IP 주소를 Passlist에 추가할 수 있습니다. 특정 경로를 추가하여 중단 없이 액세스할 수 있도록 할 수도 있습니다. [Passlist 페이지][8]에서 목록을 관리하세요.

## 인앱 WAF로 공격 시도 차단 {#blocking-attack-attempts-with-in-app-waf}

AAP 인앱 WAF(Web Application Firewall)는 경계 기반 WAF의 탐지 기법과 Datadog이 제공하는 풍부한 컨텍스트를 결합하여 팀이 시스템을 안심하고 보호할 수 있도록 지원합니다.

AAP는 애플리케이션의 경로를 파악하고 있으므로 모든 애플리케이션과 트래픽에 반드시 적용할 필요 없이 특정 서비스에 세밀하게 보호 기능을 적용할 수 있습니다. 이러한 컨텍스트 기반 효율성은 검사에 필요한 작업을 줄이고 경계 WAF에 비해 오탐률을 낮춥니다. 대부분의 웹 프레임워크가 구조화된 경로 맵을 제공하므로 별도의 학습 기간이 필요하지 않습니다. AAP를 이용하면 제로데이 취약성이 공개된 직후 해당 취약성에 맞서 보호를 롤아웃하면서, 동시에 취약한 애플리케이션을 타겟팅해 오탐 위험을 제한할 수 있습니다.

### 인앱 WAF가 보안 트레이스를 차단하는 방식 {#how-in-app-waf-blocks-security-traces}

130개 이상의 각 인앱 WAF 규칙에 제공되는 `monitoring` 및 `disabled` 모드 외에도 규칙에는 `blocking` 모드가 있습니다. 각 규칙은 라이브러리가 의심스러운 것으로 판단하는 항목을 정의하기 위해 수신 요청에 대한 조건을 지정합니다. 진행 중인 HTTP 요청이 특정 규칙 패턴과 일치하면 라이브러리가 해당 요청을 차단합니다.

관리형 정책은 각 인앱 WAF 규칙이 일치하는 경우 작동할 모드를 `monitoring`, `blocking` 또는 `disabled`로 정의합니다. AAP는 애플리케이션의 전체 컨텍스트를 파악하고 있으므로 오탐 수를 제한하면서 애플리케이션을 보호하기 위해 적용해야 할 규칙을 판단할 수 있습니다.

세밀하게 제어하려면 Datadog 관리형 정책을 복제하거나 사용자 지정 정책을 생성하고 필요에 맞는 모드를 설정할 수 있습니다. 정책을 `auto-updating`으로 설정하면 Datadog에서 배포하는 최신 탐지 기능을 통해 애플리케이션이 보호됩니다. 정책을 규칙 세트의 특정 버전에 고정하는 것도 가능합니다.

인앱 WAF 규칙을 모드 간에 전환하면 [Remote Configuration이 활성화된][2] 서비스에서는 변경 사항이 거의 실시간으로 반영됩니다. 그 외의 서비스에서는 [인앱 WAF 페이지][9]에서 정책을 업데이트한 다음 [인앱 WAF 규칙 정의][10]를 통해 변경된 동작을 적용할 수 있습니다.

{{< ui >}}Security{{< /ui >}} > {{< ui >}}App & API Protection{{< /ui >}} > {{< ui >}}Policies{{< /ui >}} > [{{< ui >}}In-App WAF{{< /ui >}}][9]로 이동하여 In-App WAF를 관리하세요.

[Trace Explorer][11]에서 `Blocked:true` 패싯을 기준으로 필터링하여 차단된 보안 트레이스를 확인하세요.

<!-- {{< img src="security/application_security/app_sec_blocked.png" alt="Blocked가 true로 설정된 패싯을 사용해 필터링한 AAP Trace Explorer." style="width:100%;" >}} -->

### 인앱 WAF 구성 {#configure-in-app-waf}

1. [**Remote Configuration 활성화**][2]를 통해 AAP가 활성화된 서비스가 인앱 WAF 아래에 표시되게 합니다. 이렇게 해야 Datadog 백엔드에서 인프라의 SDK로 인앱 WAF 구성을 안전하게 푸시할 수 있습니다.

2. **AAP/Remote Configuration이 활성화된 서비스를 정책에 연결합니다**. 서비스에서 Remote Configuration을 활성화한 후 {{< ui >}}Security{{< /ui >}} > {{< ui >}}App & API Protection{{< /ui >}} > {{< ui >}}Policies{{< /ui >}} > [{{< ui >}}In-App WAF{{< /ui >}}][9]로 이동합니다. 서비스는 기본적으로 _Datadog Monitoring-only_ 정책 아래에 표시됩니다. Datadog Monitoring-only는 관리형 정책이며 읽기 전용이므로 개별 규칙의 상태(모니터링, 차단 또는 비활성화)를 수정할 수 없습니다.

   세밀하게 제어해야 하는 경우 사용 가능한 정책 중 하나를 복제하여 규칙 상태를 수정할 수 있는 사용자 지정 정책을 생성하세요. 하나 이상의 서비스를 이 사용자 지정 정책에 연결합니다.

   서비스에 기본적으로 적용되는 정책을 변경하려면 기본 정책을 업데이트할 수 있습니다. 인앱 WAF에서 기본 정책으로 설정할 정책을 클릭한 다음 **Actions** > **Set this policy as default**를 클릭하세요.

## 보호 동작 사용자 지정 {#customize-protection-behavior}

### 차단된 요청에 대한 응답 사용자 지정 {#customize-response-to-blocked-requests}

{{% asm-protection-page-configuration %}}

공격자에게 거부 페이지를 제공할 때의 기본 HTTP 응답 상태 코드는 `403 FORBIDDEN`입니다. 응답을 사용자 지정하려면 {{< ui >}}Security{{< /ui >}} > {{< ui >}}App & API Protection{{< /ui >}} > {{< ui >}}Policies{{< /ui >}} > {{< ui >}}In-App Waf{{< /ui >}} > [{{< ui >}}Custom Responses{{< /ui >}}][16]로 이동하세요.

거부 페이지가 제공될 때 응답 코드를 `200 OK` 또는 `404 NOT FOUND`로 재정의하여 공격자가 탐지 및 차단되었다는 사실을 마스킹할 수도 있습니다(선택 사항).

공격자를 사용자 지정 거부 페이지로 리디렉션하여 중요한 서비스 및 인프라에서 벗어나도록 할 수도 있습니다(선택 사항). 리디렉션 URL과 리디렉션 유형을 지정합니다. 예를 들어 영구 리디렉션(`301` 응답 코드) 또는 임시 리디렉션(`302` 응답 코드)을 지정할 수 있습니다.

### 모든 서비스에서 보호 비활성화(보호 모드 비활성화) {#disable-protection-across-all-services-disabling-protection-mode}

보호 모드는 기본적으로 **켜져** 있으며, **모든** 서비스에서 차단을 빠르게 비활성화할 수 있는 토글입니다. Datadog에서는 보안 신호에서 모든 공격자 요청을 차단하거나, 인앱 WAF에서 보안 트레이스를 차단하는 등 두 개 섹션에서 요청을 차단할 수 있습니다.

정상 사용자가 차단될 가능성을 줄이면서 보호 기능을 세밀하게 적용할 수 있는 것도 중요하지만, 때로는 **모든** 서비스에서 **모든** 차단을 신속하게 중지할 수 있는 간단한 비활성화 스위치가 필요합니다. 보호 기능을 끄려면 {{< ui >}}Security{{< /ui >}} > {{< ui >}}App & API Protection{{< /ui >}} > {{< ui >}}Policies{{< /ui >}} > [{{< ui >}}In-App WAF{{< /ui >}}][9]로 이동하여 **Allow Request Blocking**을 끄세요.

[1]: /ko/security/application_security/setup/
[2]: /ko/tracing/guide/remote_config
[3]: /ko/agent/versions/upgrade_between_agent_minor_versions
[4]: /ko/security/application_security/how-it-works/add-user-info/#adding-authenticated-user-information-to-traces-and-enabling-user-blocking-capability
[5]: https://app.datadoghq.com/security/appsec/signals?query=%40workflow.rule.type%3A%22Application%20Security%22&column=time&order=desc&view=signal
[6]: https://app.datadoghq.com/security/appsec/traces?query=%40appsec.blocked%3Atrue
[7]: https://app.datadoghq.com/security/appsec/denylist
[8]: https://app.datadoghq.com/security/appsec/passlist
[9]: https://app.datadoghq.com/security/appsec/in-app-waf
[10]: /ko/security/application_security/threat_protection/policies/inapp_waf_rules/
[11]: https://app.datadoghq.com/security/appsec/traces
[12]: /ko/security/application_security/setup/compatibility/
[14]: https://app.datadoghq.com/security/appsec/detection-rules
[15]: /ko/security/application_security/how-it-works/add-user-info/?tab=set_user#adding-authenticated-user-information-to-traces-and-enabling-user-blocking-capability
[16]: https://app.datadoghq.com/security/appsec/in-app-waf?config_by=custom-responses
[17]: https://docs.datadoghq.com/ko/actions/workflows/
[18]: https://app.datadoghq.com/workflow/blueprints?selected_category=SECURITY
[20]: /ko/security/application_security/threat_protection/security_signals/
[21]: /ko/help/