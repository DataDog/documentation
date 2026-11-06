---
aliases:
- /ko/product_analytics/guide/action_management/
description: 액션 관리를 사용하여 웹 및 모바일 애플리케이션에서 자동 캡처된 액션에 레이블을 지정하세요.
further_reading:
- link: https://learn.datadoghq.com/courses/define-user-behavior-with-labeled-actions-in-product-analytics
  tag: 학습 센터
  text: Product Analytics에서 레이블이 지정된 액션을 사용하여 사용자 행동 정의
- link: https://www.datadoghq.com/blog/rum-product-analytics-bridging-teams
  tag: 블로그
  text: '성능에서 영향까지: 공유 컨텍스트를 통한 프런트엔드 팀 연결하기'
- link: https://www.datadoghq.com/blog/product-analytics-faster-decisions
  tag: 블로그
  text: Datadog Product Analytics로 더 빠르고 나은 제품 결정 내리기
- link: https://www.datadoghq.com/blog/product-data-best-practices
  tag: 블로그
  text: 제품 데이터가 실제로 의미하는 바
title: 액션 관리
---
## 개요 {#overview}
액션 관리는 웹 및 모바일 애플리케이션에서 자동 캡처된 액션에 레이블을 지정하기 위한 노코드 방식입니다. 제품 및 비즈니스 이해관계자는 코드 변경 없이 이벤트를 생성하고 이름을 바꿀 수 있습니다.

레이블이 지정된 액션을 사용하여 다음을 수행하세요.
- CSS 선택기를 타겟팅하여 아직 계측되지 않은 요소를 추적합니다.
- 여러 자동 캡처된 액션이 하나의 의미 있는 사용자 액션을 나타낼 때 이를 단일 이름으로 결합합니다.
- 자동 캡처된 액션의 이름을 팀의 비즈니스 용어에 맞게 변경합니다.

레이블이 지정된 액션을 생성하면 Datadog은 기록된 데이터의 모든 일치하는 상호 작용에 해당 이름을 소급 적용합니다. 여기에는 향후의 새로운 상호 작용뿐만 아니라 과거의 상호 작용도 포함됩니다.

레이블이 지정된 액션은 모든 Product Analytics 차트에서 작동하며 데이터 세트에 대한 신뢰도와 분석 효율성을 높이는 데 도움이 됩니다.

두 가지 레이블 지정 방법을 사용할 수 있습니다.
- [**시각적 레이블 지정**](#visual-labeling): 웹 페이지에서 액션에 레이블을 지정하기 위한 포인트 앤 클릭 인터페이스입니다. Datadog 테스트 레코더 Chrome 확장 프로그램이 필요합니다.
- [**수동 레이블 지정**](#manual-labeling): 브라우저 확장 프로그램 없이 웹 및 모바일 애플리케이션에 대한 액션에 레이블을 지정합니다.

## 시각적 레이블 지정 {#visual-labeling}

시각적 레이블 지정을 사용하려면 [Datadog 테스트 레코더 Chrome 확장 프로그램][1]이 필요합니다. Chrome 웹 스토어를 통해 확장 프로그램을 추가할 수 없는 경우, 확장 프로그램 설치에 대한 [수동 지침][2]을 참조하거나 [수동 레이블 지정](#manual-labeling)을 대신 사용하세요.

1. Datadog의 [액션][3] 페이지로 이동하여 애플리케이션을 선택합니다.
2. {{< ui >}}Visual Labeler{{< /ui >}}를 선택합니다. 레이블이 지정된 액션이 이미 있는 요소는 파란색 점으로 표시됩니다. 이러한 레이블이 지정된 액션의 이름을 자동으로 표시하려면 메뉴에서 확인란을 선택하세요.

   {{< img src="product_analytics/action_management/pana-visual-labeler-toolbar.png" alt="'사이트 탐색' 및 '액션 레이블 지정' 모드를 보여주는 Visual Labeler 도구 모음과 페이지에 있는 다섯 개의 레이블이 지정된 액션의 이름을 표시하는 확인란입니다." style="width:90%;">}}

3. {{< ui >}}Navigate Site{{< /ui >}} 모드를 사용하여 레이블을 지정하려는 액션의 위치로 이동합니다.
4. 액션에 레이블을 지정할 준비가 되면 {{< ui >}}Label Actions{{< /ui >}} 모드로 전환합니다.

### 레이블이 지정된 액션 생성 {#create-a-labeled-action}

1. 레이블을 지정하려는 요소를 클릭합니다. Datadog은 지난 7일 동안 사용자가 해당 요소를 트리거한 횟수를 보여줍니다.
2. 선택 사항: 추가 요소를 클릭하여 레이블이 해당 요소들을 모두 함께 캡처하도록 합니다. 요소를 레이블이 지정된 액션에서 제거하려면 요소 옆의 휴지통 아이콘을 선택하세요.
3. Datadog은 요소를 기반으로 레이블이 지정된 액션의 이름을 제안합니다. 필요에 따라 이름을 편집하세요.
4. 기본적으로 Datadog은 현재 페이지에서만 요소에 대한 클릭을 추적합니다. 모든 페이지에서 요소의 CSS 선택기 일치 항목을 추적하려면 레이블의 세부 정보를 열고 {{< ui >}}Target all pages{{< /ui >}} 확인란을 선택하세요.
5. 선택 사항: 레이블이 일치하는 요소를 변경하거나 구체화하려면 CSS 선택기를 직접 편집합니다.
6. {{< ui >}}Save labeled action{{< /ui >}}을 클릭합니다.

{{< img src="product_analytics/action_management/pana-create-labeled-action-2.png" alt="New Chart CTA Click from Home이라는 이름으로 레이블이 지정된 액션 패널입니다. main navigation이라는 추적된 요소, Target all pages 확인란, 요소에 대한 CSS 선택기, Save labeled action 저장 버튼이 있습니다." style="width:60%;">}}

### 기존 레이블이 지정된 액션 업데이트 {#update-an-existing-labeled-action}

1. 레이블이 지정된 액션이 이미 연결된 요소(파란색 점으로 표시됨)를 클릭합니다.
2. {{< ui >}}Edit{{< /ui >}}을 선택합니다.
3. 추적된 요소를 추가하거나 제거하고, 필요에 따라 이름이나 CSS 선택기를 업데이트합니다.
4. {{< ui >}}Save labeled action{{< /ui >}}을 클릭합니다.

액션을 정의하면 [액션][3] 페이지의 레이블이 지정된 액션 목록에 나타나며, 모든 Product Analytics 차트에서 사용할 수 있습니다.

## 수동 레이블 지정 {#manual-labeling}

수동 레이블 지정은 웹 및 모바일 애플리케이션 모두에서 사용할 수 있으며 Chrome 확장 프로그램이 필요하지 않습니다.

1. Datadog의 [액션][3] 페이지로 이동하여 애플리케이션을 선택합니다. 
2. {{< ui >}}Add Labeled Action{{< /ui >}}을 선택한 다음 {{< ui >}}Create manually{{< /ui >}}를 선택합니다.
3. 레이블 이름, 설명(선택 사항) 및 태그(선택 사항)를 추가합니다.
4. {{< ui >}}Definition{{< /ui >}}에서 추적할 이벤트를 하나 이상 정의합니다.
   - {{< ui >}}Action Type{{< /ui >}}: `click` 또는 `custom` 이벤트. `click` 이벤트의 경우, 클릭 추적을 위한 사용자 지정 CSS 선택기를 지정하거나 CSS 빌더를 사용하여 이벤트를 레이블 지정하여 더욱 세밀하게 제어할 수 있습니다. 
   - {{< ui >}}Action Name{{< /ui >}}: 드롭다운을 사용하여 액션을 선택합니다.
   - {{< ui >}}Page Location{{< /ui >}}: 드롭다운을 사용하여 하나 이상의 페이지를 대상으로 지정합니다.
   {{< ui >}}Add New Definition{{< /ui >}}을 선택하여 정의를 추가합니다.
5. **Save**를 선택합니다.

액션을 정의하면 [액션][3] 페이지의 레이블이 지정된 액션 목록에 나타나며, 모든 Product Analytics 차트에서 사용할 수 있습니다.

## 액션 검색 {#retrieve-your-actions}
액션을 정의한 후 [액션][3] 페이지에서 찾을 수 있습니다. 

{{< img src="product_analytics/action_management/pana-action-list-2.png" alt="레이블이 지정된 액션 목록입니다." style="width:90%;">}}

## 알려진 제한 사항 {#known-limitations}
- 시각적 레이블 지정은 웹 페이지에서만 사용할 수 있습니다. 모바일 애플리케이션에는 수동 레이블 지정을 사용하세요.
- 마우스를 올려야 표시되는 액션에는 레이블을 지정할 수 없습니다. 이 제한 사항이 사용 사례에 영향을 미치는 경우, 향후 개선 사항에 반영될 수 있도록 Customer Success Manager에게 사례를 공유해 주세요.
- 레이블이 지정된 액션을 삭제하면 해당 액션이 사용 중인 대시보드에서도 삭제됩니다.

[1]: https://chromewebstore.google.com/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa
[2]: https://docs.datadoghq.com/ko/synthetics/guide/manually-adding-chrome-extension/
[3]: https://app.datadoghq.com/product-analytics/data-management

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}