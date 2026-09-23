---
description: App and API Protection의 Threat Protection을 통해 실시간으로 애플리케이션 및 API 공격을
  탐지, 조사, 차단하세요.
further_reading:
- link: https://www.datadoghq.com/blog/datadog-exploit-prevention/
  tag: 블로그
  text: Datadog Exploit Prevention을 통해 제로데이 공격으로부터 애플리케이션 보호
title: Threat Protection
---
[App and API Protection][1](AAP)의 Threat Protection을 사용하여 애플리케이션 및 API에 대한 공격을 탐지하고, 이에 대해 조사를 수행하고, 실시간으로 악성 트래픽을 차단하세요.

시작하려면 서비스에서 보안 트레이스를 보고하도록 [AAP 설정][2]를 진행합니다. 그러면 AAP가 실시간 애플리케이션 트래픽에서 위협을 탐지하고 이에 대응할 수 있도록 처리합니다.

## Threat Protection 작동 방식 {#how-threat-protection-works}

Threat Protection은 모두 실시간 애플리케이션 트래픽 데이터를 기반으로 하는 여러 기능을 통합합니다. Threat Protection을 통해 다음을 수행할 수 있습니다.

- [보안 시그널][3]로 위협을 탐지하고 조사합니다. Datadog은 탐지 규칙에서 위협을 탐지하면 보안 시그널을 생성하므로 시그널 탐색기에서 공격을 분류, 필터링, 조사할 수 있습니다.
- [정책][4]을 통해 공격 및 공격자를 차단합니다. Datadog UI에서 수동으로 또는 자동화된 규칙을 통해 실시간으로 악성 IP 주소와 사용자를 차단합니다.
- [익스플로잇 방지][5]로 코드 내 익스플로잇 시도를 중지합니다. 실행 중인 애플리케이션 내에서 제로데이 공격을 포함한 취약점 익스플로잇 시도를 탐지하고 차단합니다.
- [WAF 통합][6]을 통해 보호 범위를 경계까지 확장합니다. 심층 방어 접근 방식 적용을 위해 인앱 보호와 AWS WAF와 같은 엣지 방어를 결합합니다.
- [계정 탈취 방지][7]를 통해 사용자 계정을 보호합니다. 크리덴셜 스터핑 등 계정 탈취 공격을 탐지 및 완화하고 계정이 탈취된 사용자를 차단합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/security/application_security/
[2]: /ko/security/application_security/setup/
[3]: /ko/security/application_security/threat_protection/security_signals/
[4]: /ko/security/application_security/threat_protection/policies/
[5]: /ko/security/application_security/threat_protection/exploit-prevention/
[6]: /ko/security/application_security/threat_protection/waf-integration/
[7]: /ko/security/application_security/threat_protection/account_takeover_protection/