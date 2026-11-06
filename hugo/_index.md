---
description: 사용자 기반의 세그먼트를 분석하여 파악할 수 있습니다.
further_reading:
- link: /product_analytics/
  tag: 설명서
  text: Product Analytics
- link: https://learn.datadoghq.com/courses/getting-started-product-analytics
  tag: 학습 센터
  text: Product Analytics 시작하기
- link: https://www.datadoghq.com/blog/product-analytics-account-segments/
  tag: 블로그
  text: Product Analytics 계정 세그먼트로 계정 수준의 이탈 위험 조사하기
title: 세그먼트
---
## 개요 {#overview}

세그먼트화는 특성이나 행동을 기반으로 특정 사용자 또는 계정 그룹에 집중할 수 있도록 도와줍니다. 세그먼트화를 통해 인사이트를 발견하고 트렌드를 파악하며 제품에 대한 데이터 기반 의사결정을 내릴 수 있습니다.

예를 들어, 구매 금액, 특정 국가 내 활동 또는 체험 상태별로 사용자를 세그먼트화할 수 있습니다. ARR(연간 반복 매출)이나 시작 날짜와 같은 속성별로 계정을 세그먼트화할 수도 있습니다.

세그먼트를 만든 후에는 차트와 Dashboards에서 재사용하여 그룹 간의 행동 차이를 비교할 수 있습니다.

## 세그먼트 만들기 {#build-a-segment}

세그먼트를 만들려면 다음 단계를 따르세요.

1. [{{< ui >}}Digital Experience Monitoring{{</ ui >}} > {{< ui >}}Product Analytics{{</ ui >}} > {{< ui >}}Users{{</ ui >}} > {{< ui >}}Segments{{</ ui >}}][1]로 이동하여 {{< ui >}}Create Segment{{< /ui >}}를 클릭합니다.
1. {{< ui >}}New Segment{{< /ui >}}를 세그먼트 이름으로 바꿉니다. 필요시 {{< ui >}}Add a description{{< /ui >}}을 클릭합니다.
1. {{< ui >}}Show{{< /ui >}} 옆의 토글을 사용하여 세그먼트에 포함할 프로필 유형을 선택합니다.
   - {{< ui >}}Users{{< /ui >}}: 개별 사용자의 세그먼트를 만듭니다.
   - {{< ui >}}Accounts{{< /ui >}}: 계정(조직)의 세그먼트를 만듭니다. [계정 세그먼트](#segment-accounts) 섹션을 참조하세요.

   <div class="alert alert-info">세그먼트는 사용자 프로필이나 계정 프로필 중 하나만 반환하며, 둘 다 반환하지는 않습니다.</div>

1. 하나 이상의 필터를 추가합니다.
   - {{< ui >}}Add Property{{< /ui >}}: 이메일, 마지막 접속 시간 또는 가져온 사용자 지정 속성과 같은 속성별로 사용자나 계정을 매칭합니다. [속성 및 이벤트별 필터링](#segment-pana) 섹션을 참조하세요.
   - {{< ui >}}Add Event{{< /ui >}}: 선택한 기간 동안 사용자 또는 계정이 수행한 작업에 따라 사용자 또는 계정을 매칭합니다. 사용자가 전환했거나 이탈한 단일 이벤트 또는 다단계 퍼널을 사용하세요. [속성 및 이벤트별 필터링](#segment-pana)을 참조하세요.
   - {{< ui >}}Import CSV{{< /ui >}}: 포함하거나 제외할 ID가 저장된 CSV 파일을 업로드하여 이미 보유한 목록과 매칭합니다. [CSV 파일 가져오기](#segment-csv) 섹션을 참조하세요.

   필터는 AND로 결합됩니다. 대신 일치 항목을 제외하려면 필터의 연산자를 예를 들어 **did**에서 **did not**으로 변경하세요.

   {{< img src="product_analytics/segmentation/segment_editor.png" alt="세그먼트 이름 필드, 표시 설정, 속성·이벤트·CSV 가져오기를 추가하는 버튼이 있는 Create Segment 페이지입니다." style="width:100%;">}}

1. {{< ui >}}Save Segment{{< /ui >}}를 클릭합니다.

{{% collapse-content title="속성 및 이벤트별 필터링" level="h3" expanded=false id="segment-pana" %}}

속성 및 이벤트 필터를 결합하여 관심 있는 사용자에 집중할 수 있습니다.

- **속성 필터**는 국가, 요금제, 가입 날짜와 같은 속성을 기준으로 조건에 맞는 사용자를 매칭합니다. 가져온 사용자 지정 속성도 기준으로 사용할 수 있습니다. 예를 들어, `have the property plan is premium`입니다. 사용자 지정 속성을 가져오려면 [사용자 및 계정 프로필][3]을 참조하세요.
- **이벤트 필터**는 선택한 시간 프레임 동안 사용자가 수행한 작업에 따라 사용자를 매칭합니다. 단일 이벤트를 사용하거나 {{< ui >}}Add step{{< /ui >}}을 클릭하여 사용자가 전환했거나 이탈한 다단계 퍼널을 구축하세요. 예를 들어, `did convert after Sign up → Start trial`입니다. 국가 또는 장치 유형과 같은 속성을 기준으로 이벤트 범위를 줄이려면 {{< ui >}}Add filter{{< /ui >}}를 클릭하세요.

필터를 추가하면 {{< ui >}}Dynamic segment{{< /ui >}} 미리보기에 일치하는 사용자가 나열됩니다.

예를 들어, 지난 3개월 동안 **In Stock** 버튼을 클릭한 브라질 사용자를 세그먼트화하려면 다음 단계를 따르세요.

1. {{< ui >}}Add Event{{< /ui >}}를 클릭하고 `"In Stock" Clicked` 작업을 선택합니다.
1. 기간을 {{< ui >}}Past 3 Months{{< /ui >}}로 설정합니다.
1. {{< ui >}}Add filter{{< /ui >}}를 클릭하고 `Country is Brazil`로 필터링합니다.

{{< img src="product_analytics/segmentation/pana_example_checkout_brazil.png" alt="지난 3개월 동안 In Stock 버튼을 클릭한 브라질 사용자 세그먼트와 조건에 맞는 사용자의 미리보기입니다." style="width:100%;">}}

#### 예시: 구매 전에 이탈한 사용자 찾기 {#example-find-users-who-left-before-buying}

장바구니를 조회했지만 결제하지 않은 모바일 사용자를 찾으려면 다음 단계를 따르세요.

1. {{< ui >}}Add Event{{< /ui >}}를 클릭하고 `Cart` 보기를 선택합니다.
1. {{< ui >}}Add step{{< /ui >}}을 클릭하고 {{< ui >}}then did not{{< /ui >}}을 선택한 다음 `Checkout Button Clicked` 작업을 선택합니다.
1. 기간을 설정합니다(예: **1 Day** 이내, {{< ui >}}Past 1 Day{{< /ui >}} 중 언제든지).
1. {{< ui >}}Add Property{{< /ui >}}를 클릭하고 `Last Device Type is Mobile`로 필터링합니다.

{{< img src="product_analytics/segmentation/user_profile_example_3.png" alt="장바구니를 조회한 뒤 1일 이내에 결제 버튼을 클릭하지 않은 모바일 사용자 세그먼트와 조건에 맞는 사용자의 미리보기입니다." style="width:100%">}}

[{{< ui >}}User Profiles{{< /ui >}}][2] 페이지에서 시작할 수도 있습니다. 사용자를 필터링한 다음 {{< ui >}}Create Segment{{< /ui >}}를 클릭합니다. 필터가 이미 적용된 상태로 세그먼트 편집기가 열립니다.

{{% /collapse-content %}}

{{% collapse-content title="CSV 파일 가져오기" level="h3" expanded=false id="segment-csv" %}}

설문조사, 실험 또는 CRM에서 얻은 사용자 목록이 있는 경우 이 목록을 CSV 파일로 업로드하여 세그먼트로 전환할 수 있습니다.

자체 파일에서 세그먼트를 만들려면 다음 단계를 따르세요.

1. {{< ui >}}Import CSV{{< /ui >}}를 클릭하고 CSV 파일을 업로드합니다.
1. {{< ui >}}column{{< /ui >}} 옆에서 `id`와 같이 사용자 ID나 이메일이 포함된 파일의 열을 선택합니다.
1. {{< ui >}}with{{< /ui >}} 옆에서 {{< ui >}}User Id (@usr.id){{< /ui >}}와 같이 매칭할 Product Analytics 속성을 선택합니다.
1. 파일에 있는 사용자를 제외하려면 {{< ui >}}matching{{< /ui >}}을 클릭한 다음 {{< ui >}}not matching{{< /ui >}}을 선택하여 제외합니다.

파일에는 Product Analytics의 `usr.id` 또는 `usr.email` 속성과 일치하는 사용자 ID나 사용자 이메일이 포함된 열이 있어야 합니다.

{{< img src="product_analytics/segmentation/segment_link_csv_1.png" alt="segment-test-users.csv의 id 열이 User Id(@usr.id)와 일치하는 사용자를 읽어오는 CSV 가져오기 필터입니다. 필터가 강조 표시되어 있습니다." style="width:100%">}}

{{% /collapse-content %}}

{{% collapse-content title="계정 세그먼트" level="h3" expanded=false id="segment-accounts" %}}

계정 세그먼트는 조직이나 회사와 같은 계정을 속성 또는 사용자가 수행한 이벤트에 따라 그룹화합니다. 특정 금액 이상의 ARR을 가진 계정이나 특정 기능을 채택한 계정과 같은 그룹을 분석하는 데 사용합니다.

계정 세그먼트를 만들려면 다음 단계를 따르세요.

1. {{< ui >}}Show{{< /ui >}} 옆에서 토글을 {{< ui >}}Users{{< /ui >}}에서 {{< ui >}}Accounts{{< /ui >}}로 전환합니다.
1. 하나 이상의 필터를 추가합니다.
   - {{< ui >}}Add Property{{< /ui >}}: ARR, 시작 날짜, 계정 ID 또는 가져온 계정 속성과 같은 계정 속성별로 필터링합니다. 사용자 지정 속성을 가져오려면 [사용자 및 계정 프로필][3]을 참조하세요.
   - {{< ui >}}Add Event{{< /ui >}}: 최소 1명의 사용자가 지정된 이벤트를 수행한 계정을 포함합니다.
   - {{< ui >}}Import CSV{{< /ui >}}: 계정 ID 열이 있는 CSV 파일을 업로드합니다. ID는 Product Analytics의 계정 ID 속성에 매핑됩니다.
1. {{< ui >}}Save Segment{{< /ui >}}를 클릭합니다.

{{% /collapse-content %}}

## Product Analytics 전반에서 세그먼트 사용 {#use-segments-across-product-analytics}

Pathways, Analytics Explorer, Funnels, Retention을 포함한 모든 Product Analytics 보기를 세그먼트별로 필터링할 수 있습니다.

세그먼트별로 보기를 필터링하려면 다음 단계를 따르세요.
1. {{< ui >}}Add filter{{< /ui >}}를 클릭합니다.
2. {{< ui >}}Segments{{< /ui >}} 탭을 선택한 다음 세그먼트를 선택합니다. 세그먼트가 나열되지 않으면 {{< ui >}}Create new segment{{< /ui >}}를 클릭합니다.

{{< img src="product_analytics/segmentation/segments_from_pana.png" alt="Product Analytics 페이지에서 열린 Add filter 메뉴로, Segments 탭이 강조 표시되어 있고 선택할 수 있는 저장된 세그먼트 목록이 표시되어 있습니다." style="width:80%;">}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/product-analytics/segments
[2]: https://app.datadoghq.com/product-analytics/profiles
[3]: /ko/product_analytics/profiles