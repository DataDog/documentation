---
further_reading:
- link: https://www.datadoghq.com/blog/synthetic-private-location-monitoring-datadog
  tag: 블로그
  text: Datadog을 사용하여 Synthetic 프라이빗 위치 모니터링하기
- link: https://www.datadoghq.com/blog/kerberos-synthetics/
  tag: 블로그
  text: Datadog Synthetic을 사용하여 Kerberos 인증 웹 앱 및 API를 선제적으로 모니터링하기
- link: /synthetics/guide/browser-tests-passkeys
  tag: 가이드
  text: 브라우저 테스트에서 Passkeys에 대해 알아보기
products:
- icon: browser
  name: 브라우저 테스트
  url: /synthetics/browser_tests/
- icon: api
  name: API 테스트
  url: /synthetics/api_tests/
title: Synthetic Monitoring을 위한 Kerberos 인증
---
{{< product-availability names="Browser Tests,API Tests" >}}

## 개요 {#overview}

Datadog Synthetic Monitoring은 Microsoft Active Directory를 사용하는 Kerberos SSO 인증을 통해 웹 애플리케이션 및 API를 선제적으로 모니터링할 수 있습니다. 이를 통해 내부 Windows 사이트의 중요한 사용자 여정 및 HTTP 엔드포인트를 지속적으로 테스트할 수 있습니다.

## 전제 조건 {#prerequisites}

- Windows 프라이빗 위치(관리 위치는 Kerberos 인증을 지원하지 않음)
- Active Directory와 통합된 Kerberos 인증을 사용하는 Windows 사이트(일반적으로 IIS에서 호스팅됨).
- Active Directory 도메인에 조인된 Windows 서버.
- Windows 사이트에 대한 Active Directory 인증 액세스 권한이 있는 도메인 사용자 계정
- Synthetic Monitoring 테스트는 Active Directory로 인증하도록 구성된 Windows 프라이빗 위치에서 실행되어야 합니다. 자세한 내용은 [Windows 프라이빗 위치][1] 필수 구성 요소 문서를 참조하세요.

## 설치 {#installation}

1. Active Directory 도메인에 조인된 Windows 서버에 [Windows 프라이빗 위치][2]를 생성합니다.
2. [Synthetic Monitoring 프라이빗 위치 Worker][3]를 Windows 서비스로 실행되도록 설정합니다.
3. Active Directory 도메인 계정 자격 증명을 사용하도록 프라이빗 위치 서비스를 구성합니다:
   - `services.msc`를 열고 {{< ui >}}Datadog Synthetics Worker{{< /ui >}} > {{< ui >}}Properties{{< /ui >}} > {{< ui >}}log on{{< /ui >}} > {{< ui >}}this account{{< /ui >}}로 이동한 다음, 도메인 계정 자격 증명을 입력합니다.
4. 다음과 같이 테스트를 구성합니다.
   - **브라우저 테스트**: 도메인에 조인된 Windows 호스트에서 직접 실행 중인 브라우저 세션에서 테스트를 기록합니다. 예를 들어, RDP(원격 데스크톱 프로토콜)을 사용하여 Windows 프라이빗 위치에 연결하고 해당 위치에서 기록합니다. Active Directory 도메인 외부의 머신에서 기록하면 Kerberos 자격 증명이 첨부되지 않은 채 공용 인터넷을 통해 요청이 전송되어 로그인하라는 메시지가 표시됩니다.
   - **API 테스트**: {{< ui >}}Kerberos{{< /ui >}} 탭 아래의 {{< ui >}}Domain{{< /ui >}} 필드를 대상 서비스의 전체 SPN(서비스 주체 이름)으로 설정합니다. 예: `HTTP/targetsite.yourdomain.com` 또는 `HTTP/targetsite.yourdomain.com:port`(사이트가 기본 포트가 아닌 포트로 등록된 경우)

{{< img src="synthetics/guide/kerberos-authentication/api_test_kerberos.png" alt="Advanced 옵션이 확장된 상태에서 API 테스트를 생성하고, Authentication 탭과 Kerberos 인증 유형이 강조되어 있습니다." style="width:80%;" >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/synthetics/platform/private_locations?tab=windows#prerequisites
[2]: /ko/synthetics/platform/private_locations?tab=windows#create-your-private-location
[3]: /ko/synthetics/platform/private_locations/?tab=windowsviagui#install-your-private-location