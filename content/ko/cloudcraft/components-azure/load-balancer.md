---
title: Load Balancer 구성 요소
---

## 개요

Load Balancer 구성 요소를 사용하여 Azure 환경에서 로드 밸런서를 나타내고 시각화할 수 있습니다.

{{< img src="cloudcraft/components-azure/load-balancer/component-load-balancer-diagram.png" alt="Azure Load Balancer 구성 요소에 상호 연결된 가상 머신 구성 요소를 보여주는 아이소메트릭 Cloudcraft 다이어그램 스크린샷." responsive="true" style="width:60%;">}}

## 도구 모음

도구 모음을 사용해 구성 요소를 구성하고 사용자 지정할 수 있습니다. 다음 옵션을 사용할 수 있습니다.

- **Color**: 3D 보기 구성 요소의 강조 및 채우기 색상을 선택합니다.
- **SKU**: 로드 밸런서의 티어 수준을 선택합니다.
- **Tier**: 로드 밸런서의 네트워크 티어를 선택합니다. 이 옵션은 Basic 및 Gateway SKU에서는 사용할 수 없습니다.
- **Number of rules**: 설정된 로드 밸런싱 규칙의 수를 입력합니다. 이 옵션은 Gateway SKU에서는 사용할 수 없습니다.
- **Chains**: 로드 밸런서의 체인 시간을 입력합니다. 이 옵션은 Basic 및 Standard SKU에서는 사용할 수 없습니다.
- **Data processed(GB)**: 로드 밸런서에서 한 달 동안 처리하는 총 데이터 볼륨을 기가바이트 단위로 입력합니다.

## API

[Cloudcraft API][1]를 사용하여 아키텍처 다이어그램에 프로그래밍 방식으로 액세스하고 JSON 객체로 렌더링할 수 있습니다. 다음은 Load Balancer 구성 요소의 JSON 객체 예시입니다.

### 스키마

```json
{
  "type": "azurelb",
  "id": "e0faf7c6-546b-44b3-a9c3-82f1c7f6d58f",
  "resourceId": "/subscriptions/6e0770d5-22cb-476a-98e3-3a46b2b2aa8d/resourceGroups/CLOUDCRAFT/providers/Microsoft.Network/loadBalancers/doc-team-lb",
  "region": "eastus",
  "mapPos": [1, 5],
  "skuName": "Standard",
  "tier": "Regional",
  "numberOfRules": 1,
  "chains": 0,
  "dataGb": 0,
  "color": {
    "isometric": "#ECECED",
    "2d": "null"
  },
  "accentColor": {
    "isometric": "#0078D4",
    "2d": "null"
  },
  "link": "https://azure.microsoft.com/products/load-balancer/",
  "locked": true
}
```

- **type: string**: 구성 요소 유형. 이 구성 요소에 대한 값은 `azurelb`(문자열). 
- **id: string, uuid**: 구성 요소의 고유 식별자입니다. API에서는 내부적으로 UUID v4를 사용하나 다른 고유 식별자도 사용할 수 있습니다.
- **resourceId: string**: Azure 구성 요소 내 전역 고유 식별자
- **region: string**: 구성 요소의 Azure 리전. API가 중국을 제외한 전역 리전을 지원합니다.
- **mapPos: array**: 청사진에 있는 구성 요소 포지션. API에서는 포지션을 표현하기 위해 고유 X와 Y 좌표 쌍을 사용합니다.
- **skuName: string**: 로드 밸런서 서비스 수준으로 `Basic`, `Standard`, `Gateway`로 구성됨. 기본값은 `Standard`.
- **tier: string**: 로드 밸런서의 네트워크 티어로 `Regional` 또는 `Global`. 기본값은 `Regional`.
- **numberOfRules: number**: 로드 밸런서 규칙 수. 기본값은 `1`.
- **chains: number**: 로드 밸런서 체인 시간 수. 기본값은 `0`.
- **dataGb: number**: 로드 밸런서가 처리하는 월별 총 데이터 볼륨(기가바이트). 기본값은 `0`.
- **color: object**: 구성 요소에 적용할 색
  - **isometric: string**: 구성 요소의 3D 보기에 적용할 16진수 색. 기본값은 `#ececed`입니다.
  - **2d: string**: 구성 요소의 2D 보기에 적용할 16진수 색. 기본값은 `null`입니다.
- **accentColor: object**: 구성 요소 로고의 강조 색
  - **isometric: string**: 3D 보기에서 구성 요소 로고에 사용할 16진수 색상. 기본값은 `#0078d4`.
  - **2d: string**: 구성 요소 로고의 2D 보기에 적용할 16진수 색. 기본값은 `null`입니다.
- **link: string, uri**: 구성 요소를 다른 다이어그램 또는 외부 웹사이트로 연결할 URL. `blueprint://` 또는 `https://` 형식 중 하나를 사용할 수 있습니다.
- **locked: boolean**: 웹 인터페이스를 통해 포지션 변경을 허용할지 여부 결정. 기본값은 `false`입니다.

[1]: https://developers.cloudcraft.co/