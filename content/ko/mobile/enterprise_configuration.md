---
aliases:
- /ko/service_management/enterprise-configuration
further_reading:
- link: /monitors/
  tag: 설명서
  text: 경고
- link: /dashboards/
  tag: 설명서
  text: 대시보드
- link: https://www.datadoghq.com/blog/datadog-mobile-widgets/
  tag: 블로그
  text: Datadog 모바일 대시보드 위젯으로 온콜 경험 개선
title: 엔터프라이즈 설정
---
Datadog Mobile App은 [AppConfig][1] 및 AppConfig와 호환되는 모바일 기기 관리(MDM) 제공업체와 완벽하게 호환됩니다.

## 지원되는 기능

모바일 앱은 [iOS][2] 및 [Android][3]의 모든 기본 MDM 기능을 지원하며, 다음과 같은 전용 기능도 지원합니다,

| 키 | 설명 |유형|기본값| 
|---------|---------|-----|-----|
|`datadogDefaultLoginOrganizationUUID`|로그인 시 파라미터로 전달된 조직 UUID `dd_oid`를 정의합니다.|문자열|null|
|`datadogDefaultLoginOrganizationPublicID`|로그인 시 파라미터로 전달되는 `public_id`([관리되는 조직 목록 조회용 API 엔드포인트][4]를 통해 사용 가능)를 정의합니다. `datadogDefaultLoginOrganizationUUID`가 설정되어 있으면 `public_id`보다 우선합니다.|문자열|null|
|`disableSharing`|앱에서 콘텐츠 공유를 비활성화합니다.|Boolean|false|
|`disableHomeScreenWidgets`|홈 화면 위젯 액세스를 비활성화합니다(대신 'disabled by your organization'이 표시됩니다).|Boolean|false|

기본 기능에 관해 자세히 알아보려면 모바일 기기 관리 제공업체의 설명서를 참조하세요.

## 사용 사례

### 조직별 로그인 옵션
조직에 전용 하위 도메인이 있거나 사용자 인증 전용 옵션이 있는 경우, 모바일 앱에서 전용 모바일 앱 로그인 페이지를 표시하도록 조직 정보를 설정할 수 있습니다. 예를 들어, 모바일 앱에서 Google SSO 및 이메일/비밀번호 인증을 비활성화하거나 전용 SAML 로그인 버튼을 추가할 수 있습니다. 

`datadogDefaultLoginOrganizationPublicID` 또는 `datadogDefaultLoginOrganizationUUID`를 설정하여 로그인 시 파라미터로 전달되는 기본 조직을 식별할 수 있으며, 둘 다 설정된 경우 `datadogDefaultLoginOrganizationUUID`가 우선합니다.

`datadogDefaultLoginOrganizationPublicID`는 API를 통해서 사용할 수 있습니다.

`datadogDefaultLoginOrganizationUUID`는 **Personal Settings > My Organizations**의 **Log in to Mobile App**를 클릭해 사용할 수 있습니다.

### 사용자로부터 데이터 유출 방지
사용자의 데이터 유출 위험이 우려되는 경우, 표준 설정에서 복사/붙여넣기 및 스크린샷을 비활성화할 수 있습니다([iOS][2] 및 [Android][3]의 경우). 데이터 유출의 위험을 보다 완화하기 위해, Datadog Mobile App은 재량에 따라 활성화할 수 있는 다음 기능을 제공해 드립니다.

- **Disabling sharing from the app**을 적용하면 Datadog 모바일 앱 제품 페이지에서 공유 버튼이 모두 삭제됩니다.
    *참고*: 모바일 앱 공유 버튼은 관련 제품 페이지로 연결되는 링크를 생성하며, 해당 링크를 보려면 인증이 필요합니다. 모바일 앱에서 공유를 비활성화하면 모바일 앱을 활용한 Teams 공동 작업이 방해받을 수도 있으므로 기본 제어 기능으로로도 충분한지 고려해 보세요.
- **Disabling home-screen widgets**을 적용하면 홈 화면 위젯에 모니터, 인시던트, SLO 또는 대시보드의 실제 데이터 대신 'Disabled by your organization'이 표시됩니다.

### 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.appconfig.org/
[2]: https://www.appconfig.org/ios.html
[3]: https://www.appconfig.org/android.html
[4]: https://docs.datadoghq.com/ko/api/latest/organizations/#list-your-managed-organizations