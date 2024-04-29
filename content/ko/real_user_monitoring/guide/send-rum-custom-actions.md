---
aliases:
- /ko/real_user_monitoring/guide/send-custom-user-actions/
beta: true
description: 커스텀 작업을 전송하여 사용자 상호 작용 수집을 연장하는 방법을 알아보세요.
further_reading:
- link: /real_user_monitoring/explorer
  tag: 설명서
  text: RUM 탐색기에서 RUM 데이터 시각화
kind: 가이드
private: true
title: 실제 사용자 모니터링(RUM) 커스텀 작업 전송
---
## 개요

실제 사용자 모니터링(RUM)은 웹 애플리케이션에서 [자동으로 작업을 수집][1]합니다. 형식 완성 및 비즈니스 트랜잭션 등 추가 이벤트와 타이밍을 수집할 수 있습니다.

커스텀 RUM 작업을 사용하면 모든 관련 컨텍스트와 함께 흥미로운 이벤트를 모니터링할 수 있습니다. 예를 들어, Datadog 브라우저 SDK는 전자상거래 웹사이트에서 사용자가 결제 버튼을 누르면 (장바구니 내 항목 수, 항목 목록, 장바구니 항목의 총 합계) 등 사용자 결제 정보를 수집할 수 있습니다.  

## 코드 계측

`addAction` API를 사용하여 RUM 작업을 생성합니다. 작업에 이름을 만들고 자바스크립트(Javascript) 개체 형식으로 컨텍스트 속성을 추가합니다.

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

`onReady` 콜백을 통해 API 호출을 래핑하였는지 확인하세요.

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

API 호출 이전에 `window.DD_RUM`를 체크하였는지 확인하세요.

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

## 속성에서 패싯 및 단위 생성

커스텀 작업을 생성한 코드를 배포한 후, 해당 코드는 [RUM 탐색기][3]의 **작업** 탭에 표시됩니다.

커스텀 작업을 필터링하려면, `Action Target Name` 속성: `@action.target.name:<ACTION_NAME>`을 사용합니다.

아래 예는 다음 필터(`@action.target.name:checkout`)를 사용합니다.

{{< img src="real_user_monitoring/guide/send-custom-user-actions/facet-from-user-action.mp4" alt="커스텀 RUM 작업에 대한 패싯 생성" video=true style="width:100%;">}}

작업을 클릭하면 메타데이터가 포함된 측면 패널이 나타납니다. **커스텀 속성** 섹션에서 작업 속성을 찾고 클릭하여 해당 속성에 대한 패싯 또는 단위를 생성할 수 있습니다.

고유한 값(ID)에 대한 패싯, 타이밍과 지연 등 정량적 값에 대한 측정값을 사용합니다. 예를 들어. 장바구니 항목에 대한 패싯과 장바구니 값에 대한 측정값을 생성합니다.

## RUM 탐색기에서 속성 사용

[RUM 탐색기][3]에서 패싯 및 측정값과 함께 작업 속성을 사용하여 대시보드 위젯, 모니터와 고급 쿼리를 빌드할 수 있습니다.

다음 예시는 지난 2일간 국가별 평균 장바구니 값을 표시합니다. **내보내기** 버튼을 클릭하여 검색 쿼리를 대시보드 위젯이나 모니터로 내보냅니다.

{{< img src="real_user_monitoring/guide/send-custom-user-actions/custom-action-analytics.png" alt="RUM 탐색기에서 RUM 작업 사용" style="width:100%;">}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/real_user_monitoring/browser/data_collected/?tab=useraction#action-attributes
[2]: /ko/real_user_monitoring/browser/advanced_configuration/#replace-global-context
[3]: /ko/real_user_monitoring/explorer