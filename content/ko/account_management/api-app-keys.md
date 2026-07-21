---
algolia:
  tags:
  - api key
aliases:
- /ko/account_management/faq/how-do-i-reset-my-application-keys/
- /ko/agent/faq/how-do-i-reset-my-datadog-api-keys/
- /ko/account_management/faq/api-app-key-management/
description: 보안 기능을 사용해 브라우저 애플리케이션의 API 키, 애플리케이션 키, 클라이언트 토큰을 관리하세요.
title: API 및 애플리케이션 키
---
## API 키 {#api-keys}

API 키는 조직에 대해 고유합니다. Datadog Agent가 Datadog에 메트릭 및 이벤트를 제출하려면 [API 키][1]가 필요합니다.

## 애플리케이션 키 {#application-keys}

[애플리케이션 키][2]를 조직의 API 키와 함께 사용하면 사용자가 Datadog의 프로그램 방식 API에 액세스할 수 있습니다. 애플리케이션 키는 키를 생성한 사용자 계정과 연결되며, 기본적으로 키를 생성한 사용자의 권한이 있습니다.

### 일회성 읽기 모드 {#one-time-read-mode}

일회성 읽기(OTR) 모드는 애플리케이션 키 시크릿을 생성 시간에만 표시하도록 제한하는 보안 기능입니다. OTR 모드를 활성화하면 애플리케이션 키가 시크릿이 키를 생성하는 동안 한 번만 표시되며, 보안상 이후에는 검색할 수 없습니다.

#### 신규 조직의 경우 {#for-new-organizations}

2025년 8월 20일 이후에 신규 상위 조직(및 그 하위 조직)에 대하여 생성된 모든 애플리케이션 키에는 기본적으로 OTR 모드가 활성화되어 있습니다. 이 설정은 영구적이며 변경할 수 없습니다.

#### 기존 조직의 경우 {#for-existing-organizations}

조직 관리자가 [**조직 설정** > **애플리케이션 키**][2]에서 OTR 모드를 활성화 또는 비활성화할 수 있습니다. OTR 모드를 활성화한 이후:

- 애플리케이션 키 시크릿은 생성 시 한 번만 표시됨
- 더 이상 애플리케이션 키를 UI 또는 API로 검색할 수 없음
- 활성화한 이후 3개월간 조직 관리자가 설정을 켜기 또는 끄기로 토글할 수 있음
- 3개월 동안 계속 활성화 상태를 유지한 뒤에는 OTR 모드가 영구적으로 설정되고 토글이 제거됨

**권한**: 사용자가 소속 조직의 OTR 모드를 활성화 또는 비활성화하려면 `org_app_keys_write` 및 `org_management` 권한이 모두 있어야 합니다.

### 범위 {#scopes}

조직의 보호와 보안을 강화하기 위해 애플리케이션 키의 승인 범위를 지정하여 좀 더 세분화된 권한을 정의하고, 애플리케이션이 Datadog 데이터에 대해 보유하는 액세스 권한을 최소화할 수 있습니다. 이렇게 하면 애플리케이션에 대한 세분화된 액세스 제어를 적용할 수 있고 관계없는 액세스를 제한하여 보안 취약성을 최소화할 수 있습니다. 예를 들어 대시보드를 읽기만 하는 애플리케이션은 사용자를 관리하거나 조직의 데이터를 삭제하는 데 관리자 권한이 필요하지 않습니다.

애플리케이션 키 범위를 지정할 때 권장되는 모범 사례는 키에 최소한의 특권 및 애플리케이션이 의도한 대로 작동하는 데 필요한 최소 권한을 부여하는 것입니다. 범위가 지정된 애플리케이션 키는 사용자가 지정한 범위만 부여되며, 다른 추가적인 권한은 부여되지 않습니다. 언제든 애플리케이션 키의 권한 부여 범위를 수정할 수 있지만, 그러한 변경 사항이 애플리케이션의 기존 기능이나 액세스에 어떤 영향을 미칠지 고려하세요.

**참고:**

- 애플리케이션 키를 생성 또는 편집할 [권한][3]이 있는 사용자 또는 서비스 계정은 애플리케이션 키의 범위를 지정할 수 있습니다. 사용자가 자체 애플리케이션 키의 범위를 지정하려면 `user_app_keys` 권한이 있어야 하며, 자신이 속한 조직의 임의의 사용자가 소유한 애플리케이션 키의 범위를 지정하려면 `org_app_keys_write` 권한이 있어야 합니다. 사용자에게 서비스 계정의 애플리케이션 키 범위를 지정할 `service_account_write` 권한이 있어야 합니다.
- 애플리케이션 소유자에게 필수 권한이 없으면 애플리케이션에 권한을 부여할 수 없습니다. 이는 본인에게 권한 부여 범위가 없는 애플리케이션 키의 범위를 지정하는 경우도 마찬가지입니다.
- 애플리케이션 키를 작성하거나 애플리케이션에 권한을 부여할 때 권한이 누락되어 발생하는 오류에는 `403 Forbidden` 오류가 표시됩니다. 다양한 오류 응답에 관한 자세한 정보는 [Datadog API][4] 설명서를 참조하세요.
- 사용자의 역할 또는 권한이 변경되더라도 해당 사용자의 애플리케이션 키에 지정된 권한 부여 범위는 변경되지 않습니다.

### 액션 API 액세스 {#actions-api-access}

액션 API에 포함되는 내용:
- [App Builder][5]
- [Actions Connections][6]
- [Workflow Automation][7]

이러한 API와 함께 애플리케이션 키를 사용하려면 애플리케이션 키에서 액션 API 액세스를 활성화해야 합니다. 이 작업은 [UI를 통해서나][2] [API][21]를 사용해 수행할 수 있습니다. 기본적으로 애플리케이션 키를 이러한 API와 함께 사용할 수 없습니다.

{{< img src="account_management/click-enable-actions-api-access.png" alt="액션 API 액세스 활성화 클릭" style="width:80%;" >}}

**참고**: {{< ui >}}Last used{{< /ui >}} 섹션은 [Audit Trail이 활성화되어 있고][22] [`Audit Trail Read`][23] 권한이 있어야만 표시됩니다.

## 클라이언트 토큰 {#client-tokens}

보안상의 이유로, API 키는 브라우저, 모바일 또는 TV 앱에서 데이터를 보내는 데는 사용할 수 없습니다. 클라이언트 측이 노출되기 때문입니다. 대신, 최종 사용자 대상 애플리케이션은 클라이언트 토큰을 사용해 Datadog에 데이터를 보냅니다.

 클라이언트 토큰을 사용해야 데이터 전송이 가능한 클라이언트는 여러 유형이 있습니다. 예시는 다음과 같습니다.
- [웹 브라우저][8], [Android][9], [iOS][10], [React Native][11], [Flutter][12] 및 [Roku][13]의 로그 수집기가 로그를 제출합니다.
- [Real User Monitoring][14] 애플리케이션이 이벤트 및 로그를 제출합니다.

클라이언트 토큰은 조직에 고유합니다. 클라이언트 토큰을 관리하려면 {{< ui >}}Organization Settings{{< /ui >}}로 이동하여 {{< ui >}}Client Tokens{{< /ui >}} 탭을 클릭하세요.

**참고**: 클라이언트 토큰을 생성한 사용자가 비활성화되어도 해당 클라이언트 토큰은 활성 상태로 유지됩니다.

## API 키 또는 클라이언트 토큰 추가 {#add-an-api-key-or-client-token}

Datadog API 키 또는 클라이언트 토큰을 추가하는 방법:

1. 조직 설정으로 이동한 다음 [**API 키**][1] 또는 [**클라이언트 토큰**][15] 탭을 클릭합니다.
2. 무엇을 생성하는지에 따라 {{< ui >}}New Key{{< /ui >}} 또는 {{< ui >}}New Client Token{{< /ui >}} 버튼을 클릭합니다.
3. 키 또는 토큰의 이름을 입력합니다.
4. {{< ui >}}Create API key{{< /ui >}} 또는 {{< ui >}}Create Client Token{{< /ui >}}을 클릭합니다.

{{< img src="account_management/api-key.png" alt="Datadog의 조직 API 키 페이지로 이동" style="width:80%;" >}}

**참고:**

- 조직에 API 키가 하나 이상, 50개 이하로 있어야 합니다.
- 키 이름은 조직 전체에서 고유해야 합니다.

## API 키 또는 클라이언트 토큰 제거 {#remove-api-keys-or-client-tokens}

Datadog API 키 또는 클라이언트 토큰을 제거하려면 키 또는 토큰 목록으로 이동하여 제거하고자 하는 키 또는 토큰 옆에 있는 {{< ui >}}Delete{{< /ui >}} {{< img src="icons/delete.png" inline="true" style="width:14px;">}} 아이콘을 클릭합니다.

## 애플리케이션 키 추가 {#add-application-keys}

Datadog 애플리케이션 키를 추가하려면 [**조직 설정** > **애플리케이션 키**][2]로 이동합니다. 애플리케이션 키를 생성할 [권한][3]이 있는 경우, {{< ui >}}New Key{{< /ui >}}를 클릭합니다.

{{< img src="account_management/app-key.png" alt="Datadog의 조직 애플리케이션 키 페이지로 이동" style="width:80%;" >}}

{{< site-region region="ap2,gov,gov2" >}}
<div class="alert alert-danger">생성 직후 애플리케이션 키를 안전하게 저장해야 합니다. 키 시크릿을 나중에 검색할 수 없기 때문입니다.</div>
{{< /site-region >}}

<div class="alert alert-info">조직에 일회성 읽기(OTR) 모드가 활성화된 경우, 생성 직후 애플리케이션 키를 안전하게 저장해야 합니다. 키 시크릿을 나중에 검색할 수 없기 때문입니다.</div>

**참고:**

- 애플리케이션 키 이름은 비워둘 수 없습니다.

## 애플리케이션 키 제거 {#remove-application-keys}

Datadog 애플리케이션 키를 제거하려면 [**조직 설정** > **애플리케이션 키**][2]로 이동합니다. 애플리케이션 키를 관리할 [권한][3]이 있는 경우, 자신의 키가 표시됩니다. 취소하고자 하는 키 옆에 있는 {{< ui >}}Revoke{{< /ui >}}를 클릭하세요. 모든 조직 애플리케이션 키를 관리할 권한이 있는 경우, 취소하고자 하는 키를 검색한 다음 그 옆에 있는 {{< ui >}}Revoke{{< /ui >}}를 클릭하세요.

## 키 전파 지연 및 최종 일관성 {#key-propagation-delay-and-eventual-consistency}

Datadog의 API 및 애플리케이션 키는 최종 일관성 모델을 따릅니다. Datadog 시스템은 분산형이기 때문에 생성 및 취소와 같은 키 업데이트가 완전히 전파되려면 몇 초 걸릴 수 있습니다.

따라서:

- 중요한 워크플로에서 새 API 또는 애플리케이션 키를 즉시 사용하지 마세요. 전파를 위해 잠깐(몇 초) 기다려 주세요. 전파 기간 중 일시적인 오류를 처리하기 위해 짧은 지수 백오프로 재시도 전략을 구현할 수 있습니다.
- API 키가 활성이고 사용 가능한지 검증하려면 [/api/v1/validate][16] 엔드포인트를 호출합니다.
- 애플리케이션 키가 활성인지 확인하려면 적절한 키 쌍과 함께 `/api/v2/validate_keys` 엔드포인트를 사용합니다.

새로 생성한 키가 완전히 전파되기 전에 사용하려 시도하면 403 Forbidden 또는 401 Unauthorized와 같은 일시적인 인증 오류가 발생할 수 있습니다.

## 애플리케이션 키 범위 지정 {#scope-application-keys}

애플리케이션 키의 권한 부여 범위를 지정하려면 [Datadog API][4] 또는 UI에 애플리케이션 키 생성 또는 편집을 요청합니다. [현재 사용자][17] 또는 [서비스 계정][18]이 소유한 애플리케이션 키의 범위를 지정할 수 있습니다. 이 필드가 지정되지 않은 경우, 애플리케이션 키는 기본적으로 해당 키를 생성한 사용자와 같은 범위 및 권한을 보유하게 됩니다.

**참고:**

- 범위 이름은 대소문자를 구별합니다.

## 여러 API 키 사용 {#using-multiple-api-keys}

조직에 API 키를 여러 개 설정하는 것을 고려해 보세요. 예를 들어 다양한 배포 방식마다 다른 API 키를 사용할 수 있습니다. AWS의 Kubernetes에 Agent를 배포하는 데 하나, Chef를 사용해 온프레미스에 배포하는 데 하나, 대시보드 또는 모니터를 자동화하는 Terraform 스크립트용으로 하나, 로컬로 배포하는 개발자용으로 하나 등입니다.

여러 API 키를 사용하면 보안 대책의 일부로서 키를 회전시킬 수 있고, 특정 키가 부주의로 노출되었거나 해당 키와 연계된 서비스 이용을 중단하고자 하는 경우에 키 권한을 취소할 수 있습니다.

조직에 기본 한도인 50개보다 API 키가 더 많이 필요한 경우, [지원팀][19]에 문의하여 한도 상향을 요청하세요.

## 사용자 계정 비활성화 {#disabling-a-user-account}

사용자의 계정이 비활성화되면 해당 사용자가 생성한 모든 애플리케이션 키가 취소됩니다. 비활성화된 계정이 생성한 모든 API 키는 삭제되지 않고, 여전히 유효합니다.

## 키 양도 {#transferring-keys}

보안상의 이유로 Datadog은 한 사용자의 애플리케이션 키를 다른 사용자에게 양도하지 않습니다. 애플리케이션 키를 공유해야 하는 경우, [서비스 계정][20]을 사용하세요.

## API 또는 애플리케이션 키가 노출된 경우 대처 방법 {#what-to-do-if-an-api-or-application-key-was-exposed}

프라이빗 키가 침해되었거나 공개적으로 노출된 경우, 최대한 빨리 조처하여 계정의 보안을 확보해야 합니다. 해당 키를 포함한 파일을 GitHub와 같은 퍼블릭 사이트에서 제거해도 해당 파일에 이미 다른 사람이 액세스하지 않았다고 보장할 수 **없습니다**.

다음의 절차를 따라 계정을 보호하세요.

**참고:** 활성 키를 취소하면 서비스에 영향이 발생할 수 있습니다. 사용량 범위가 크거나 정해지지 않은 경우, 2~5단계를 고려한 **다음에** 영향을 받은 키를 취소하세요.

1. 영향을 받은 키를 취소합니다.
2. 해당 프라이빗 키를 포함한 코드를 공개적으로 액세스할 수 있는 모든 파일에서 제거합니다.
    - 위생 처리한 파일을 퍼블릭 리포지토리에 게시합니다.
    - 커밋 기록에서 민감한 데이터를 제거합니다.
3. 새 키를 생성합니다.
4. 영향을 받은 서비스를 새 키로 업데이트합니다.
5. 계정에 승인되지 않은 액세스가 있었는지 검토합니다.
    - 최근에 추가된 사용자
    - 새 리소스
    - 역할 또는 권한 변경

비정상적 활동이 확인되었거나 계정 보안 확보에 더 많은 도움이 필요한 경우 [Datadog 지원팀][19]에 문의하세요.

## 문제 해결 {#troubleshooting}

도움이 필요하십니까? [Datadog 지원팀][19]에 문의하세요.

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://app.datadoghq.com/organization-settings/application-keys
[3]: /ko/account_management/rbac/permissions
[4]: /ko/api/latest/key-management/
[5]: /ko/api/latest/app-builder/
[6]: /ko/api/latest/action-connection/
[7]: /ko/api/latest/workflow-automation/
[8]: /ko/logs/log_collection/javascript/
[9]: /ko/logs/log_collection/android/
[10]: /ko/logs/log_collection/ios/
[11]: /ko/logs/log_collection/reactnative/
[12]: /ko/logs/log_collection/flutter/
[13]: /ko/logs/log_collection/roku/
[14]: /ko/real_user_monitoring/
[15]: https://app.datadoghq.com/organization-settings/client-tokens
[16]: /ko/api/latest/authentication/#validate-api-key
[17]: /ko/api/latest/key-management/#create-an-application-key-for-current-user
[18]: /ko/api/latest/service-accounts/
[19]: /ko/help/
[20]: /ko/account_management/org_settings/service_accounts/
[21]: /ko/api/latest/action-connection/#register-a-new-app-key
[22]: /ko/account_management/audit_trail/#setup
[23]: /ko/account_management/rbac/permissions/#compliance