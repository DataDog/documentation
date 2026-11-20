---
further_reading:
- link: /account_management/saml/
  tag: 설명서
  text: Datadog 계정용 SAML 설정하기
title: SafeNet SAML IdP
---

## 구성

[메인 SAML 설정 가이드][1]를 따른 다음, [Datadog용 신뢰할 수 있는 SafeNet 액세스(Trusted Access)][2] 문서를 참조해 SafeNet을 SAML IdP로 설정하세요.

## Datadog

* IdP 메타데이터는 SafeNet Trusted Access 콘솔에서 **Download Metadata** 버튼을 눌러 확인할 수 있습니다.
* Datadog에서 **Identity Provider (IdP) Initiated Login** 상자가 선택되었는지 확인하세요.
* Datadog의 [서비스 제공업체(Service Provider) 메타데이터][3]가 필요합니다.

## 인증 확인

### STA 콘솔 사용

Datadog 로그인 URL로 이동합니다. SafeNet Trusted Access 로그인 페이지로 리다이렉트된 후, 주요 디렉터리 로그인 정보를 입력한 다음 2FA를 승인하세요. 이렇게 하면 인증 후 Datadog로 리다이렉트됩니다.

**참조**: IdP를 사용하는 모드에서는 Datadog에서 찾을 수 있는 **어서션 소비자 서비스 URL(Assertion Consumer Service URL)**을 SafeNet Trusted Access 콘솔에 입력하세요.

### STA 사용자 포털 이용

사용자 포털(User Portal) URL로 이동해 STA 사용자 포털 대시보드에 로그인하세요. 대시보드에서 액세스할 수 있는 애플리케이션 목록이 표시됩니다. Datadog 애플리케이션 아이콘을 클릭하면 인증 후 Datadog로 리다이렉트됩니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/account_management/saml/#configure-saml
[2]: https://resources.safenetid.com/help/Datadog/Index.htm
[3]: https://app.datadoghq.com/account/saml/metadata.xml
