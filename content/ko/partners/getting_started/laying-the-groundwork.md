---
aliases:
- /ko/partners/laying-the-groundwork/
description: 시작 방법과 초기에 내려야 하는 주요 결정에 관해 알아보세요.
title: 토대 마련하기
---

이 가이드에서는 Datadog 관리형 서비스 공급자가 초기에 내려야 하는 주요 결정에 관해 다룹니다.

## 관리형 서비스 공급자의 주요 고려 사항

서비스 공급자로서 Datadog를 시작하는 방법은 비즈니스 모델과 운영 모델에 따라 다릅니다.

- **비즈니스 모델**: 생각해야 할 핵심 질문은 고객에게 Datadog 액세스 권한을 부여할 것인지 여부입니다. 고객에게 Datadog 액세스 권한을 부여하기로 선택한 경우 다중 조직 계정을 설정하여 클라이언트 데이터를 별도로, 그리고 비공개로 유지하세요.
- **운영 모델**: 또 다른 핵심 고려 사항은 클라이언트 기반이 유사한지 여부입니다. 클라이언트 기반이 유사할 경우 Datadog 조직을 계획적으로 관리하는 것이 클라이언트의 종류가 서로 다를 때에 비해 중요합니다.

위의 사항을 모두 심사숙고 했다면 Datadog를 사용해 MSP 설정의 기반을 마련할 준비가 된 것입니다.

## 사전 필수 조건

Datadog를 서비스 공급자로 설정하는 작업 전, DPN 포털에서 [Datadog 기술 전문가 교육][6] 훈련을 완료하는 것이 좋습니다.

교육과 인증으로 다음 장 주제에 익숙해지면 바로 시작할 수 있습니다.

## 조직 설정

서비스 공급자의 주요 결정 사항 중 하나는 클라이언트 Datadog 계정을 설정하는 방법입니다. 이는 "조직(organization 또는 org)"이라고 합니다. 사용자는 하나 이상의 조직에 연결되고 모니터링되는 리소스는 단일 조직에 연결됩니다. 시작할 때 적절한 조직 구조를 선택하면 서비스 공급자와 클라이언트 모두에게 더욱 빠르게 가치를 창출할 수 있습니다.

### 단일 조직 또는 다중 조직

Datadog는 하나의 상위 조직에서 여러 하위 조직을 관리할 수 있는 기능을 제공합니다. 이는 클라이언트가 서로의 데이터에 액세스하지 못하도록 하기 위해 MSP가 사용하는 일반적인 배포 모델입니다. 다중 조직 설정에서는 단일 하위 조직이 각 클라이언트에 생성되며, 해당 클라이언트는 자신의 하위 조직으로만 액세스가 제한됩니다. 자세한 내용은 [클라이언트 조직 프로비저닝 옵션]](#client-org-provisioning-options)을 참조하세요.

클라이언트에 Datadog 액세스 권한을 부여할 계획이 없고 클라이언트 데이터를 분리해야 하는 엄격한 요구 사항이 없는 경우에는 단일 조직 설정을 사용하세요.

조직 관리에 대한 자세한 내용은 [다중 조직 계정 관리하기][1] 설명서를 참조하세요.

### 개발, 테스트, 프로덕션 조직을 분리해야 할까?

MSP 파트너가 자주 하는 질문은 개발, 테스트, 프로덕션 리소스 환경을 관리할 용도로 각각 별도의 Datadog 조직을 설정해야 하는지 여부입니다.

Datadog에서는 개발, 테스트, 프로덕션 리소스를 분리하는 것을 권장하지 않습니다. 이보다는 동일한 Datadog 조직에서 전체 리소스를 관리하고 태그를 통해 환경을 구분하는 것을 권장합니다. 자세한 내용은 [태깅 전략][20]을 참조하세요.      

## 클라이언트 조직 프로비저닝 옵션

클라이언트의 Datadog 조직을 관리하는 경우, 조직 프로비저닝 프로세스를 제어하고 새 사용자 프로비저닝, 액세스 방법 설정, 역할 기반 액세스 정의, 클라이언트 사용량 관리 등 조직의 관리 기능을 실행할 수 있습니다.

방법:

1. [상위 계정 아래에 하위 조직을 생성합니다.](#create-a-child-organization-under-your-parent-account)
2. [새 하위 조직의 조직 ID를 검색합니다.](#retrieve-the-new-client-orgs-org-id)
3. [새 하위 조직을 상위 계정에서 분리합니다.](#separate-the-new-child-organization-from-your-parent-account)
4. [DPN 포털에 새 클라이언트 세부 정보를 등록합니다.](#register-the-new-client-details-in-the-dpn-portal)
5. [위 1단계에서 생성한 조직 아래에 하위 조직을 만듭니다.](#create-a-new-child-organization-under-the-organization-created-in-step-1-above)

결과:

- 새 클라이언트가 하나 이상의 하위 조직을 관리할 수  있도록 새 상위 조직이 생성됩니다.
- 새 상위 조직과 클라이언트 하위 조직이 등록되고 청구 계약에 첨부됩니다.
- 새 클라이언트 하위 조직에 새 사용자를 프로비저닝하고, 액세스 방법을 설정하며, 역할 기반 액세스를 정의하고, 사용량을 관리할 수 있습니다.

### 상위 계정 아래에 하위 조직 생성하기

이 단계에서 두 가지 옵션을 사용할 수 있습니다.

- UI 사용: [여러 조직 계정 관리하기][1]에 설명된 대로 "New Organization"을 클릭합니다.
- API 사용: [하위 조직 생성][18] 엔드포인트를 사용합니다.

### 새 클라이언트 조직의 조직 ID를 검색합니다.

브라우저의 JavaScript 콘솔을 열고 다음을 입력하면 로그인한 Datadog 조직의 ID를 검색할 수 있습니다.

```javascript
JSON.parse(document.querySelector('#_current_user_json').value).org.id
```

다음 JavaScript 함수가 포함된 `Get Datadog OrgId`라는 이름의 북마크를 만들 수도 있습니다.

```javascript
javascript:(function() {var orgId = JSON.parse(document.querySelector('#_current_user_json').value).org.id; alert("Datadog OrgId is " + orgId);})();
```

그런 다음 Datadog 페이지에서 북마크를 클릭하면 브라우저 알림 상자에 현재 조직 ID가 표시됩니다.

### 새 하위 조직을 상위 계정에서 분리합니다.

이 단계에서 두 가지 옵션을 사용할 수 있습니다.
    - 자체 서비스: [스핀오프 하위 조직][19] API 엔드포인트를 사용하여 새 조직을 독립된 상위 조직으로 만듭니다.
    - 지원: 파트너 영업 관리자에게 문의하여 상위 계정에서 새 조직을 제거하세요.

### DPN 포털에 새로운 클라이언트 세부 정보를 등록합니다.

- [DPN 포털][16]에 로그인하고 거래 대시보드에서 `+Register Deal`을 클릭합니다.

- 새 클라이언트 조직의 조직 ID를 포함하여 새 클라이언트 조직을 등록하려면 새 클라이언트 세부 정보를 입력합니다.

### 위 1단계에서 만든 조직 아래에 새 하위 조직을 생성합니다.

1. [위 1단계](#create-a-child-organization-under-your-parent-account)에서 생성된 조직으로 전환합니다.
2. [위 1단계](#create-a-child-organization-under-your-parent-account)의 지침에 따라 클라이언트 하위 조직을 생성합니다.

## 커스텀 하위 도메인

다수의 조직을 처리할 때 Datadog 환경을 개선하려면 커스텀 하위 도메인 기능을 사용하세요.

기본적으로 모든 Datadog 조직을 Datadog의 액세스 페이지인 [https://app.datadoghq.com][2] 및 [https://app.datadoghq.eu][3]을 통해 액세스할 수 있습니다. 그러나 커스텀 하위 도메인은 각 하위 조직에 고유한 URL을 제공할 수 있습니다(예: `https://account-a.datadoghq.com`).

자세한 내용은 [커스텀 하위 도메인][4]을 참조하세요.

## 사용자 역할 및 커스텀 역할 기반 액세스 제어(RBAC)

보통 MSP 내부 사용자와 클라이언트 사용자 모두 세 가지 [Datadog 기본 역할][5] 중 하나에 명확하게 속하지 않는 경우가 많습니다. 특정 영역에서 사용자 권한을 제한하려면 커스텀 역할을 만드는 것이 좋습니다.

자세한 정보는 다음을 참고하세요.

- [커스텀 역할][6]
- [역할 기반 액세스 제어][7]

## SSO(Single Sign-on) 고려 사항

서비스 공급자는 두 가지 관점에서 SSO를 고려할 수 있습니다.

- 조직용 SSO
- 클라이언트용 SSO

SAML Single Sign-On을 사용하면 인증 메커니즘이 명확하다는 장점이 있습니다. 이에 더해 사용자 프로비저닝 절차를 크게 간소화할 수 있습니다. SAML을 사용하면 수동 또는 프로그래밍 방식으로 사용자를 생성할 필요 없이 JiT(Just-in-time) 사용자 프로비저닝을 사용할 수 있습니다.

SAML 인증은 Datadog 조직 또는 하위 조직에서 사용하도록 설정되어 있으므로 하위 조직마다 서로 다른 SAML 공급자를 사용할 수 있습니다. 그러나 이는 서로 다른 SAML 공급자를 사용하는 두 사용자 그룹이 있는 경우, 각 사용자가 별도의 조직에 있어야 한다는 것을 의미합니다. 다수 조직 설정을 계획할 때 SAML 인증에 관해 고려해야 합니다.

자세한 정보는 다음을 참고하세요.

- 다수 조직 계정에 대한 [SAML 설정][8]을 설정합니다.
- [SAML을 사용한 SSO][9]

## 사용자 관리하기

### 사용자 생성

Datadog는 각 조직에 사용자를 신속하게 프로비저닝할 수 있는 다양한 방법을 제공합니다.

- [UI를 통해 사용자 배치 추가][10]
- [API를 통해 사용자 생성][11]
- SAML과 같은 인증 서비스를 [JiT(Just-in-time) 프로비저닝][12]과 함께 사용하세요.

### 사용자 교육

Datadog의 목표는 사용하기 쉽고 직관적인 서비스를 제공하는 것입니다. 사용자가 처음에 쉽게 제품을 사용할 수 있고, 직접 사용해 나가면서 고급 사용법을 배웁니다.

중요한 제품 정보에 관해 교육을 원하는 사용자는 다음과 같은 유용한 리소스를 사용할 수 있습니다.

- [YouTube Datadog 채널][13]: 새로운 기능이 출시될 때마다 모범 사례와 사용 팁 소개 비디오가 게시됩니다. 또한 Datadog의 YouTube 채널에는 고급 기능 사용법 등 유용한 자료가 많습니다.
- [Datadog 학습 센터][14]: Datadog 학습 센터에서 플랫폼에 관해 자세히 알아볼 수 있습니다. 학습 센터에 등록하면 Datadog 샌드박스 환경이 무료로 자동 프로비저닝되므로 실패를 걱정할 필요 없이 제품을 이용해 볼 수 있습니다.
- [Datadog 블로그][15]: Datadpg 블로그에는 700개 이상의 게시물이 있습니다. Datadog를 사용해 클라이언트 환경에서 핵심 서비스, 도구, 기술을 모니터링하는 방법을 알아보고 최신 제품 릴리스 정보를 확인해 보세요.
- [Datadog Partner Network (DPN) Enablement Center][16]: Datadog 파트너는 DPN에서 서비스 공급자 영업 담당자 및 기술 전문가용 비디오 교육 과정에 액세스할 수 있습니다.

클라이언트용 자체 교육 자료를 제작할 계획이거나 유용한 콘텐츠와 관련한 추천 사항이 있으면 Datadog 파트너 담당자에게 연락해 주시기 바랍니다.

## 다음 단계

가이드의 다음 부분인 [데이터 수집][17]에서는 Datadog의 데이터 전송 방법에 대해 자세히 알아봅니다.

[1]: /ko/account_management/multi_organization/
[2]: https://app.datadoghq.com
[3]: https://app.datadoghq.eu
[4]: /ko/account_management/multi_organization/#custom-sub-domains
[5]: /ko/account_management/rbac/?tab=datadogapplication#datadog-default-roles
[6]: /ko/account_management/rbac/?tab=datadogapplication#custom-roles
[7]: /ko/account_management/rbac/
[8]: /ko/account_management/multi_organization/#set-up-saml
[9]: /ko/account_management/saml/
[10]: /ko/account_management/users/#add-new-members-and-manage-invites
[11]: /ko/api/latest/users/#create-a-user
[12]: /ko/account_management/saml/#just-in-time-jit-provisioning
[13]: https://www.youtube.com/user/DatadogHQ
[14]: https://learn.datadoghq.com/
[15]: https://www.datadoghq.com/blog/
[16]: https://partners.datadoghq.com/
[17]: /ko/partners/data-intake/
[18]: /ko/api/latest/organizations/#create-a-child-organization
[19]: /ko/api/latest/organizations/#spin-off-child-organization
[20]: /ko/partners/data-intake/#tagging-strategy