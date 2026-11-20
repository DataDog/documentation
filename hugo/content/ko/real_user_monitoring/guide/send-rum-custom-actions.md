---
algolia:
  tags:
  - addaction
aliases:
- /ko/real_user_monitoring/guide/send-custom-user-actions/
beta: true
description: 커스텀 작업을 전송하여 사용자 상호 작용 수집을 연장하는 방법을 알아보세요.
further_reading:
- link: /real_user_monitoring/explorer
  tag: 설명서
  text: RUM 탐색기에서 RUM 데이터 시각화
- link: https://learn.datadoghq.com/courses/custom-data-rum-javascript
  tag: 학습 센터
  text: JavaScript 웹 애플리케이션용 RUM으로 커스텀 데이터 수집
private: true
title: 실제 사용자 모니터링(RUM) 커스텀 작업 전송
---
## 개요 {#overview}

Real User Monitoring은 웹 애플리케이션에서 [작업을 자동으로 수집][1]합니다. 양식 완성 및 비즈니스 트랜잭션과 같은 추가 이벤트와 타이밍을 수집할 수 있습니다.

커스텀 RUM 작업을 통해 모든 관련 컨텍스트와 함께 흥미로운 이벤트를 모니터링할 수 있습니다. 예를 들어, Datadog 브라우저 SDK는 전자상거래 웹사이트에서 사용자가 결제 버튼을 누르면 사용자 결제 정보(장바구니 내 항목 수, 항목 목록, 장바구니 항목의 총 합계 등)을 수집할 수 있습니다.

## 코드 계측 {#instrument-your-code}

`addAction` API를 사용하여 RUM 작업을 생성합니다. 작업에 이름을 만들고, JavaScript 개체 형식으로 컨텍스트 속성을 추가합니다.

다음 예시는 사용자가 결제 버튼을 클릭하면 사용자 장바구니에 대한 상세 정보가 포함된 `checkout` 작업을 생성합니다.

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

function onCheckoutButtonClick(cart) {
    datadogRum.addAction('checkout', {
        'value': cart.value, // for example, 42.12
        'items': cart.items, // for example, ['tomato', 'strawberries']
    })
}
```

{{% /tab %}}
{{% tab "CDN async" %}}

`onReady` 콜백을 통해 API 호출을 래핑했는지 확인하세요.

```javascript
function onCheckoutButtonClick(cart) {
    window.DD_RUM.onReady(function() {
        window.DD_RUM.addAction('checkout', {
            'value': cart.value, // for example, 42.12
            'items': cart.items, // for example, ['tomato', 'strawberries']
        })
    })
}
```

{{% /tab %}}
{{% tab "CDN sync" %}}

API 호출 이전에 `window.DD_RUM`을 체크했는지 확인하세요.

```javascript
window.DD_RUM && window.DD_RUM.addAction('<NAME>', '<JSON_OBJECT>');

function onCheckoutButtonClick(cart) {
    window.DD_RUM && window.DD_RUM.addAction('checkout', {
        'value': cart.value, // for example, 42.12
        'items': cart.items, // for example, ['tomato', 'strawberries']
    })
}
```

{{% /tab %}}
{{< /tabs >}}

현재 페이지 보기 정보, geoIP 데이터 및 브라우저 정보 등 모든 RUM 컨텍스트는 자동으로 [글로벌 컨텍스트 API][2]가 제공한 추가 속성과 함께 자동으로 추가됩니다.

##  속성에서 패싯 및 측정값 생성 {#create-facets-and-measures-on-attributes}

커스텀 작업을 생성하는 코드를 배포한 후, 해당 코드는 [RUM 탐색기][3]의 {{< ui >}}Actions{{< /ui >}} 탭에 표시됩니다.

커스텀 작업을 필터링하려면 `Action Target Name` 속성을 사용합니다`@action.target.name:<ACTION_NAME>`.

아래 예시에서는 다음 필터를 사용합니다. `@action.target.name:checkout`.

{{< img src="real_user_monitoring/guide/send-custom-user-actions/facet-from-user-action-3.mp4" alt="커스텀 RUM 작업에 대한 패싯 생성" video=true style="width:100%;">}}

작업을 클릭하면 메타데이터가 포함된 측면 패널이 나타납니다. {{< ui >}}Custom Attributes{{< /ui >}} 섹션에서 작업 속성을 찾아 해당 속성을 클릭하여 패싯 또는 측정값을 생성할 수 있습니다.

고유 값(ID)에는 패싯을 사용하고, 타이밍 및 지연 시간 등 정량적 값에는 측정값을 사용합니다. 예를 들어, 장바구니 항목에 대한 패싯과 장바구니 금액에 대한 측정값을 생성합니다.

## RUM 탐색기에서 속성 사용 {#use-attributes-in-the-rum-explorer}

[RUM 탐색기][3]에서 패싯 및 측정값과 함께 작업 속성을 사용하여 대시보드 위젯, 모니터와 고급 쿼리를 빌드할 수 있습니다.

다음 예시는 지난 2일간의 국가별 평균 장바구니 금액을 보여줍니다. {{< ui >}}Export{{< /ui >}} 버튼을 클릭하여 검색 쿼리를 대시보드 위젯이나 모니터로 내보냅니다.

{{< img src="real_user_monitoring/guide/send-custom-user-actions/custom-action-analytics-2.png" alt="RUM 탐색기에서 RUM 작업 사용" style="width:100%;">}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/real_user_monitoring/application_monitoring/browser/data_collected/?tab=useraction#action-attributes
[2]: /ko/real_user_monitoring/application_monitoring/browser/advanced_configuration/#replace-global-context
[3]: /ko/real_user_monitoring/explorer