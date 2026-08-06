---
title: VPN gateway 컴포넌트
---

## 개요

**VPN Gatewa** 컴포넌트를 사용해 Azure 환경에서 비공개 연결을 표시 및 시각화할 수 있습니다.

{{< img src="cloudcraft/components-azure/vpn-gateway/component-vpn-gateway-diagram.png" alt="상호 연결된 Azure 컴포넌트를 보여주는 등축도법 Cloudcraft 다이어그램의 스크린샷." responsive="true" style="width:60%;">}}


## 도구 모음

도구 모음을 사용해 구성 요소를 구성하고 사용자 지정할 수 있습니다. 다음 옵션을 사용할 수 있습니다.

- **Color**: 구성 요소와 강조 항목에 적용할 색을 선택을 선택합니다. 2D와 3D 보기에 같은 색을 적용하거나 각각 다른 색을 선택할 수 있습니다.
- **Gateway type**: 표시할 가상 네트워크 게이트웨이의 유형을 선택합니다.
- **SKU**: 표시할 가상 네트워크 게이트웨이의 SKU를 선택합니다.
- **S2S tunnels**: 가상 네트워크 게이트웨이의 S2S 터널 수를 입력합니다. VPN 게이트웨이에만 사용할 수 있습니다.
- **P2S tunnels**: 가상 네트워크 게이트웨이의 P2S 터널 수를 입력합니다. VPN 게이트웨이에만 사용할 수 있습니다.
- **Rotate item**: 컴포넌트를 90도 회전하여 방향을 바꿉니다.

## API

[Cloudcraft API][1]를 사용해 프로그래밍을 통해 액세스하여 아키텍처 다이어그램을 JSON 오브젝트로 렌더링할 수 있습니다. 다음은 VPN 게이트웨이 컴포넌트의 JSON 오브젝트 예시입니다.

### 스키마

```json
{
    "type": "azurevngw",
    "id": "817a218d-8556-4e8f-b32c-b13e454b9106",
    "region": "eastus",
    "mapPos": [6,9.25],
    "gatewayType": "Vpn",
    "tier": "Basic",
    "s2sTunnels": 0,
    "p2sTunnels": 0,
    "direction": "down",
    "color": {
        "isometric": "#CEE0F5",
        "2d": null
    },
    "accentColor": {
        "isometric": "#0078D4",
        "2d": null
    },
    "link": "https://azure.microsoft.com/products/vpn-gateway",
    "locked": true
}
```

- **type: string**: 컴포넌트 유형. 이 컴포넌트의 `azurevngw` 값 문자열이어야 합니다.
- **id: string, uuid**: 구성 요소의 고유 식별자입니다. API에서는 내부적으로 UUID v4를 사용하나 다른 고유 식별자도 사용할 수 있습니다/
- **resourceId: string**: Azure 구성 요소 내 전역 고유 식별자
- **region: string**: 구성 요소의 Azure 리전. API가 중국을 제외한 전역 리전을 지원합니다.
- **mapPos: array**: 청사진에 있는 구성 요소 포지션. API에서는 포지션을 표현하기 위해 고유 X와 Y 좌표 쌍을 사용합니다.
- **gatewayType: string**: 표시하려는 가상 네트워크 게이트웨이의 유형입니다. `Vpn` 또는 `ExpressRoute` 두 값 중 하나를 허용합니다. 기본값은 `Vpn`입니다.
- **tier: string**: 가상 네트워크 게이트웨이의 티어입니다. [자세한 내용은 Microsoft Learn을 참조하세요][2]. 기본값은 `gatewayType`에 따라 달라지며 `Basic` 또는 `Standard`입니다.
- **s2sTunnels: number**: 가상 네트워크 게이트웨이의 S2S 터널 수입니다. 기본값은 `0`입니다.
- **p2sTunnels: number**: 가상 네트워크 게이트웨이의 P2S 터널 수입니다. 기본값은 `0`입니다.
- **direction: string**: 컴포넌트의 방향을 지정합니다. `right` 또는 `down` 두 값 중 하나를 허용합니다. 기본값은 `down`입니다.
- **color: object**: 구성 요소에 적용할 색
  - **isometric: string**: 구성 요소 바디의 3D 보기에 적용할 16진수 색. 기본값은 `#CEE0F5`입니다.
  - **2d: string**: 구성 요소의 2D 보기에 적용할 16진수 색. 기본값은 `null`입니다.
- **accentColor: object**: 구성 요소 로고의 강조 색
  - **isometric: string**: 구성 요소 로고의 3D 보기에 적용할 16진수 색. 기본값은 `#0078D4`입니다.
  - **2d: string**: 구성 요소 로고의 2D 보기에 적용할 16진수 색. 기본값은 `null`입니다.
- **link: string, uri**: 구성 요소를 다른 다이어그램 또는 외부 웹사이트로 연결할 URL. `blueprint://` 또는 `https://` 형식 중 하나를 사용할 수 있습니다.
- **locked: boolean**: 웹 인터페이스를 통해 포지션 변경을 허용할지 여부 결정. 기본값은 `false`입니다.

[1]: https://developers.cloudcraft.co/
[2]: https://learn.microsoft.com/en-us/azure/vpn-gateway/vpn-gateway-about-vpn-gateway-settings#gwsku