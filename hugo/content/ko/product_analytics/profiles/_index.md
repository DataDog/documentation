---
description: 개별 사용자와 사용자 기반의 세그먼트를 분석하고 이해합니다.
further_reading:
- link: /product_analytics/
  tag: 설명서
  text: Product Analytics
title: 프로필 관리 및 사용자 지정 속성 통합
---
## 개요 {#overview}

[사용자 프로필][7] 및 [계정 프로필][8] 페이지에는 제품과 상호 작용하는 사용자 및 계정에 대한 자세한 데이터가 포함되어 있습니다.

이러한 프로필 페이지는 수집된 이벤트에서 추출된 속성과 타사 소스의 정보를 통합합니다. 이러한 속성의 예로는 사용자의 `first_seen` 타임스탬프 또는 사용자 `last_seen_country`의 ISO 코드가 있습니다. 이들은 함께 포괄적이고 중앙 집중화된 프로필을 만드는 데 기여합니다.

이러한 강화된 프로필을 통해 더 정밀한 세분화와 사용자 행동에 대한 심층적인 분석이 가능하며, 시간이 지남에 따라 패턴을 식별하고, 주요 코호트(예: 6개월 후에도 활성 상태인 사용자)를 추적하며, 제품 결정 및 참여 전략의 방향을 수립하는 데 도움이 될 수 있습니다.

## 프로필 {#profiles}

사용자 및 계정 프로필은 RUM SDK를 통해 수집된 RUM 이벤트에서 생성됩니다. `datadogRum.setUser`를 사용하여 [사용자 속성을 설정][2]하고 `datadogRum.setAccount`를 사용하여 [계정 속성][3]을 설정하세요.

사용자 프로필은 `user_id` 속성별로 그룹화되고, 계정 프로필은 `account_id`별로 그룹화됩니다.

인증되지 않은 사용자나 `setUser`를 호출하지 않는 방문자의 경우, RUM SDK는 `usr.anonymous_id`를 사용하여 활동을 자동으로 추적합니다. 자세한 내용은 [인증되지 않은 사용자 추적][9]을 참조하세요.

팀에 가장 중요한 속성을 추가하여 이러한 페이지를 사용자 지정할 수도 있습니다. 프로필 데이터를 필요에 맞게 조정하는 방법을 알아보려면 [사용자 지정 속성 섹션](#use-custom-attributes-to-enrich-profiles)을 참조하세요.


### 사용자 프로필 {#user-profiles}

[사용자 프로필][7] 페이지에는 애플리케이션과 상호 작용하는 사용자가 나열됩니다. 사용자를 선택하면 가장 자주 방문한 페이지, 자주 수행한 작업, 세션 기록 등 해당 사용자의 활동에 관한 자세한 인사이트를 볼 수 있습니다.

{{< img src="product_analytics/user_profile2ui.png" alt="사용자 프로필 페이지 화면입니다." style="width:80%;" >}}

각 프로필에는 사용자를 더 효과적으로 세분화하는 데 도움이 되는 속성이 있습니다. 이러한 속성을 기반으로 전체 텍스트 검색을 수행하거나 정렬 및 필터링할 수 있습니다. 분석 요구 사항과 관련된 속성으로 이 페이지를 사용자 지정할 수도 있습니다. 방법을 알아보려면 [사용자 지정 속성 섹션](#use-custom-attributes-to-enrich-profiles)을 참조하세요.


{{% collapse-content title="사용자 프로필 속성 목록" level="h4" expanded=true id="user-profile-attributes" %}}

<!-- #### User attributes  -->
User ID `REQUIRED`
: `type:string` <br> 고유한 사용자 식별자입니다.<br>

User Email
: `type:string` <br> 사용자의 이메일 주소입니다.

User Name
: `type:string` <br> 사용자의 전체 이름입니다.

<!-- #### Time based attributes  -->
First Seen
: `type:timestamp` <br> 사용자의 첫 번째 세션 날짜입니다.

Last Seen
: `type:timestamp`  <br> 사용자의 가장 최근 세션 날짜입니다.


<!-- #### application based attributes  -->
First Seen Application
: `type:string`  <br> 사용자가 처음 액세스한 애플리케이션의 ID입니다.

Last Seen Application
: `type:string`  <br> 사용자가 마지막으로 액세스한 애플리케이션의 ID입니다.


<!-- #### Geo based attributes  -->
First City
: `type:string` <br> 사용자의 첫 번째 세션이 발생한 도시입니다.

Last City
: `type:string` <br> 사용자의 마지막 세션이 발생한 도시입니다.

First Seen Country
: `type:string` <br> 사용자의 첫 번째 세션이 발생한 국가의 ISO 코드입니다. 국가 코드는 백엔드에 저장되며 국가 이름은 UI에 표시됩니다.

Last Seen Country
: `type:string` <br> 사용자의 마지막 세션이 발생한 국가의 ISO 코드입니다. 국가 코드는 백엔드에 저장되며 국가 이름은 UI에 표시됩니다.

First Region
: `type:string` <br> 사용자의 첫 번째 세션이 발생한 지역입니다.

Last Region
: `type:string` <br> 사용자의 마지막 세션이 발생한 지역입니다.


<!-- #### Device related attributes  -->
First Device Type
: `type:string` <br> 사용자의 첫 번째 세션에서 사용된 기기 유형입니다(예: 데스크톱, 태블릿).

Last Device Type
: `type:string` <br> 사용자의 마지막 세션에서 사용된 기기 유형입니다(예: 데스크톱, 태블릿).


<!-- #### OS related attributes  -->
First OS Name
: `type:string` <br> 사용자의 첫 번째 세션에서 사용된 운영 체제입니다(예: Windows, iOS).

Last OS Name
: `type:string` <br> 사용자의 마지막 세션에서 사용된 운영 체제입니다(예: Windows, iOS).

First OS Version
: `type:string` <br> 사용자의 첫 번째 세션에서 사용된 OS 버전입니다.

Last OS Version
: `type:string` <br> 사용자의 마지막 세션에서 사용된 OS 버전입니다.


<!-- #### Browser related attributes  -->
First Browser Name
: `type:string` <br> 사용자의 첫 번째 세션에서 사용된 브라우저입니다(예: : Chrome, Safari).

Last Browser Name
: `type:string` <br> 사용자의 마지막 세션에서 사용된 브라우저입니다(예: : Chrome, Safari).

First Browser Version
: `type:string` <br> 사용자의 첫 번째 세션에서 사용된 브라우저 버전입니다.

Last Browser Version
: `type:string` <br> 사용자의 마지막 세션에서 사용된 브라우저 버전입니다.

{{% /collapse-content %}}
<br>


### 계정 프로필 {#account-profiles}
계정 프로필 페이지에는 애플리케이션과 상호 작용하는 조직의 목록이 표시됩니다.

{{< img src="product_analytics/account_profile_ui3.png" alt="사용자 프로필 페이지 화면입니다." style="width:80%;" >}}

각 프로필에는 시간이 지남에 따른 계정 활동을 식별하고 추적하는 데 도움이 되는 4개의 기본 속성이 포함되어 있습니다. 이러한 기본 속성은 다음과 같습니다.
- `account_id`
- `account_name`
- `first_seen`
- `last_seen`

계정 프로필 페이지에 추가 속성을 포함하도록 사용자 지정할 수 있습니다. 이를 통해 관측 가능성과 제품 분석 요구 사항에 맞게 보기 화면을 조정할 수 있습니다.



## 사용자 지정 속성을 사용하여 프로필 보강 {#use-custom-attributes-to-enrich-profiles}

### 통합을 사용하여 사용자 지정 속성을 구성하는 방법 {#how-to-configure-custom-attributes-using-integrations}

통합 또는 참조 표를 사용하여 사용자 지정 속성 데이터를 프로필로 자동으로 가져오세요. 이 데이터는 정기적인 일정에 따라 동기화되며 소스 시스템의 최신 값을 반영하여 프로필이 최신 상태로 정확하게 유지되도록 합니다.

[통합 페이지][4] 페이지에서는 사용자 지정 속성과 호환되는 통합을 탐색할 수 있습니다.

이 페이지에서 [{{< ui >}}Custom Attributes{{< /ui >}}][5] 탭을 선택하면 사용자 및 계정 프로필에 대해 가져온 속성을 볼 수 있습니다.

{{< img src="product_analytics/integration_page5.png" alt="Product Analytics와 호환되는 통합을 확인합니다." style="width:80%;" >}}

참조 표나 Salesforce 또는 Snowflake와 같은 통합에서 속성을 가져오려면 {{< ui >}}Add Attributes{{< /ui >}} 버튼을 선택하고 속성이 사용자 프로필용인지 계정 프로필용인지 선택합니다. 그런 다음 안내에 따라 진행하세요.


{{< img src="product_analytics/add_attribute2_button.png" alt="프로필을 보강할 새 속성을 추가합니다." style="width:80%;" >}}


1. 가져올 {{< ui >}}source of the data{{< /ui >}}를 선택합니다.

{{< img src="product_analytics/choose_integration1.png" alt="가져올 데이터의 소스를 선택합니다." style="width:80%;" >}}


2. 원하는 사용자 데이터가 포함된 {{< ui >}}table{{< /ui >}}을 선택합니다.

{{< img src="product_analytics/add_table_and_key3.png" alt="프로필과 병합할 데이터를 선택합니다." style="width:80%;" >}}


3. {{< ui >}}join key{{< /ui >}}와 {{< ui >}}Product Analytics key{{< /ui >}}를 선택하여 표를 프로필과 병합합니다. 그런 다음 목록에서 프로필에 추가할 {{< ui >}}attributes{{< /ui >}}를 선택합니다. 각 행에는 프로필과 일치하도록 조인 키 열의 값이 필요하며, 값이 없는 행은 건너뜁니다. 조인 키 값이 있는 행이 없으면 예약된 동기화는 성공적으로 완료되지만 속성은 가져오지 않습니다. 이런 경우, 조인 키가 표의 올바른 열로 설정되어 있는지 확인하세요.

{{< img src="product_analytics/select_integration_attributes5.png" alt="Snowflake의 Configure import 모달로, 조인 키 구성과 열 이름, 유형, 샘플 값이 표시된 선택 가능한 속성 목록을 보여줍니다." style="width:80%;" >}}


<br>

## 사용자 지정 속성을 쿼리하는 방법 {#how-to-query-your-custom-attributes}

이러한 사용자 지정 속성은 [세그먼트][6]에 먼저 추가하지 않아도 Product Analytics 플랫폼 전체에서 필터링할 수 있습니다. 예를 들어, 100달러를 초과하여 지출한 사용자의 세션 수를 조회하는 분석 차트를 만들 수 있습니다.

{{< img src="product_analytics/query_custom_attribute_analytics3.png" alt="분석 차트에서 사용자 지정 속성을 쿼리합니다." style="width:80%;" >}}


## 추가 자료 {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}


[2]: /ko/real_user_monitoring/application_monitoring/browser/advanced_configuration/?tab=npm#identify-user-session
[3]: https://docs.datadoghq.com/ko/real_user_monitoring/application_monitoring/browser/advanced_configuration/?tab=npm#identify-account
[4]: https://app.datadoghq.com/product-analytics/integrations
[5]: https://app.datadoghq.com/product-analytics/integrations/custom-attributes
[6]: https://app.datadoghq.com/product-analytics/segments
[7]: https://app.datadoghq.com/product-analytics/profiles
[8]: https://app.datadoghq.com/product-analytics/profiles/accounts
[9]: /ko/real_user_monitoring/application_monitoring/browser/advanced_configuration/#track-unauthenticated-users