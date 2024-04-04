---
further_reading:
- link: https://www.datadoghq.com/blog/oauth/
  tag: 블로그
  text: OAuth로 Datadog 통합 인증하기
- link: /developers/integrations/oauth_for_integrations
  tag: 설명서
  text: 통합용 OAuth 구현하기
- link: /developers/authorization/oauth2_in_datadog/
  tag: 설명서
  text: Datadog OAuth2에 대해 자세히 알아보기
- link: /developers/authorization/oauth2_endpoints
  tag: API
  text: OAuth2 인증 엔드포인트 레퍼런스
title: 인증
type: 설명서
---

## 개요

Datadog은 [OAuth 2.0(OAuth2) 인증 프레임워크][1]로 사용자를 대신하여 제한된 Datadog 리소스에 대한 타사 애플리케이션의 접근을 안전하게 승인할 수 있도록 도와드립니다. 애플리케이션의 접근 권한은 [범위][2]에 의해 결정되며, 사용자는 애플리케이션이 요청하는 세분화된 특정 권한을 명시적으로 부여할 수 있습니다. 

## 클라이언트 및 자격 증명

OAuth2 클라이언트는 사용자를 대신하여 Datadog 리소스에 대한 애플리케이션의 접근을 승인하는 애플리케이션의 구성 요소입니다. OAuth2는 공개와 [기밀][3]의 두 가지 유형의 클라이언트를 정의합니다.

공개 클라이언트
: 일반적으로 브라우저 기반 애플리케이션에 사용되며, 기밀 정보를 저장할 수 없습니다. 공개 클라이언트의 예로는 [UI 확장][4]용 OAuth 클라이언트가 있습니다.

기밀 클라이언트
: 민감한 데이터를 저장할 수 있으며, 인증 요청을 하려면 추가  `client_secret`가 필요합니다. 통합용 OAuth 클라이언트는 기밀 클라이언트입니다.

OAuth 클라이언트를 만들면 클라이언트 자격 증명 세트가 클라이언트 ID 형식으로 발급됩니다. 필요 시 기밀 클라이언트용 클라이언트 암호도 발급됩니다.

클라이언트 ID 
: 인증 요청을 하거나 토큰 엔드포인트에 요청할 때 클라이언트를 식별하는 데 사용됩니다.

클라이언트 암호 
: 암호가 발급된 경우, 해당 암호는 인증 엔드포인트에 요청 시 클라이언트를 인증하는 데 사용됩니다. 클라이언트 암호는 클라이언트 생성 시 한 번만 발급되는 기밀 암호이므로 즉시 복사하여 안전하게 보관하세요. 

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://datatracker.ietf.org/doc/html/rfc6749
[2]: https://docs.datadoghq.com/ko/api/latest/scopes/
[3]: https://datatracker.ietf.org/doc/html/rfc6749#section-3.2.1
[4]: https://docs.datadoghq.com/ko/developers/ui_extensions/#oauth-api-access