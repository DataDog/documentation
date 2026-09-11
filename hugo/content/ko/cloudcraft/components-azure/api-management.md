---
title: API Management 구성 요소
---

## 개요

API Management 구성 요소를 사용하여 Azure 환경 에서 API에 대한 관리 플랫폼을 표현하고 시각화할 수 있습니다.

{{< img src="cloudcraft/components-azure/api-management/component-api-management-diagram.png" alt="상호 연결된 Azure 구성 요소를 보여주는 등축도법 Cloudcraft 다이어그램의 스크린샷." responsive="true" style="width:60%;">}}

## 도구 모음

도구 모음을 사용해 구성 요소를 구성하고 사용자 지정할 수 있습니다. 다음 옵션을 사용할 수 있습니다.

- **Color**: 3D 보기 구성 요소의 강조 및 채우기 색상을 선택합니다.
- **Tier**: API 관리 플랫폼에 대한 서비스 티어를 선택합니다.
- **Calls**: API에 대한 총 호출 수를 입력합니다. **Consumption** 티어에서만 사용할 수 있습니다.
- **Units** API 관리 플랫폼의 단위 수를 입력합니다. **Premium** 티어에서만 사용할 수 있습니다.
- **Self-hosted gateways**: 자체 호스팅된 API 게이트웨이의 수를 입력합니다. **Premium** 티어에서만 사용할 수 있습니다.
- **Rotate item**을 클릭합니다: 청사진을 기준으로 구성 요소를 회전합니다. 3D 뷰에서만 사용할 수 있습니다.

## API

[Cloudcraft API][1]를 사용하여 프로그래밍 방식으로 아키텍처 다이어그램에 액세스하고 JSON 객체로 렌더링하세요. 다음은 API 관리 구성 요소의 JSON 객체 예시입니다.

### 스키마

```json
{
    "type": "azureapimanagement",
    "id": "ccff5631-c1cd-4ed6-8d21-bb60e676fedf",
    "region": "northcentralus",
    "mapPos": [5,0.25],
    "tier": "Consumption",
    "calls": 0,
    "units": 1,
    "gateways": 0,
    "direction": "down",
    "color": {
        "isometric": null,
        "2d": null
    },
    "accentColor": {
        "isometric": null,
        "2d": null
    },
    "link": "https://azure.microsoft.com/products/api-management/",
    "locked": true
}
```

- **type: string**: 구성 요소의 유형입니다. 이 구성 요소의 경우 `azureapimanagement` 값의 문자열이어야 합니다.
- **id: string, uuid**: 구성 요소의 고유 식별자입니다. API에서는 내부적으로 UUID v4를 사용하나 다른 고유 식별자도 사용할 수 있습니다/
- **resourceId: string**: Azure 구성 요소 내 전역 고유 식별자
- **region: string**: 구성 요소의 Azure 리전. API가 중국을 제외한 전역 리전을 지원합니다.
- **mapPos: array**: 청사진에 있는 구성 요소 포지션. API에서는 포지션을 표현하기 위해 고유 X와 Y 좌표 쌍을 사용합니다.
- **tier: string**:  API 관리 플랫폼의 서비스 티어입니다. [자세한 내용은 Azure 설명서를 참조하세요][2]. 기본값은 `Consumption`입니다.
- **calls: number**: API로의 호출 수입니다. 기본값은 `0`입니다.
- **units: number**: API 관리 플랫폼의 단위 수입니다. 기본값은 `1`입니다.
- **gateways: number**: 자체 호스팅된 API 게이트웨이 수입니다. 기본값은 `0`입니다.
- **direction: string**: 청사진을 기준으로 한 구성 요소의 방향입니다. `down` 또는 `right` 두 값 중 하나가 허용됩니다. 기본값은 `down`입니다.
- **color: object**: 구성 요소에 적용할 색
  - **isometric: string**: 3D 뷰에서 구성 요소 바디의 16진수 색상입니다. 기본값은 `#075693`입니다.
  - **2d: string**: 구성 요소의 2D 보기에 적용할 16진수 색. 기본값은 `null`입니다.
- **accentColor: object**: 구성 요소 로고의 강조 색
  - **isometric: string**: 3D 보기에서 구성 요소 로고의 16진수 색상입니다. 기본값은 `#2EC8EA`입니다.
  - **2d: string**: 구성 요소 로고의 2D 보기에 적용할 16진수 색. 기본값은 `null`입니다.
- **link: string, uri**: 구성 요소를 다른 다이어그램 또는 외부 웹사이트로 연결할 URL. `blueprint://` 또는 `https://` 형식 중 하나를 사용할 수 있습니다.
- **locked: boolean**: 웹 인터페이스를 통해 포지션 변경을 허용할지 여부 결정. 기본값은 `false`입니다.

[1]: https://developers.cloudcraft.co/
[2]: https://learn.microsoft.com/en-us/azure/api-management/api-management-features