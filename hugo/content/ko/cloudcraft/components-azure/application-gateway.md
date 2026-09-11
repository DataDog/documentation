---
title: Application Gateway 컴포넌트
---

## 개요

Application Gateway 컴포넌트를 사용해 Azure 환경에서 어플리케이션 게이트웨이를 표시 및 시각화할 수 있습니다.

{{< img src="cloudcraft/components-azure/application-gateway/component-application-gateway-diagram.png" alt="Azure 애플리케이션 게이트웨이 컴포넌트와 상호 연결된 웹 앱 컴포넌트를 보여주는 등축도법 Cloudcraft 다이어그램의 스크린샷." responsive="true" style="width:60%;">}}

## 도구 모음

도구 모음을 사용해 구성 요소를 구성하고 사용자 지정할 수 있습니다. 다음 옵션을 사용할 수 있습니다.

- **Color**: 3D 보기 구성 요소의 강조 및 채우기 색상을 선택합니다.
- **Tier**: 애플리케이션 게이트웨이의 서비스 수준을 선택합니다.
- **Size**: 애플리케이션 게이트웨이의 크기를 선택합니다. 본 옵션은 표준 및 WAF 티어에서만 사용할 수 있습니다.
- **Instances**: 고가용성 시나리오 인스턴스 수를 입력합니다. 본 옵션은 Standard 및 WAF 티어에서만 사용할 수 있습니다.
- **Compute units**: 애플리케이션 게이트웨이가 소모하는 컴퓨팅 용량 측정치를 입력니다. 본 옵션은 표준 V2 및 WAF V2 티어에서만 사용할 수 있습니다.
- **Compute units**: 애플리케이션 게이트웨이 영구 연결 수를 입력합니다. 본 옵션은 표준 V2 및 WAF V2 티어에서만 사용할 수 있습니다.
- **Throughput(Mbps)**: 애플리케이션 게이트웨이의 초당 처리량을 메가비트 단위로 입력합니다. 본 옵션은 Standard V2 및 WAF V2 티어에서만 사용할 수 있습니다.
- **Data processed(GB)**: 애플리케이션 게이트웨이의 월별 데이터 처리 총량을 기가바이트 단위로 입력합니다.
- **Outbound data processed(GB)**: 애플리케이션 게이트웨이의 월별 아웃바운드 데이터 처리 총량을 기가바이트 단위로 입력합니다.

## API

[Cloudcraft API][1]를 사용해 프로그래밍을 통해 액세스하여 아키텍처 다이어그램을 JSON 오브젝트로 렌더링할 수 있습니다. 다음은 애플리케이션 게이트웨이 컴포넌트의 JSON 오브젝트 예시입니다.

### 스키마

```json
{
    "type": "azureappgw",
    "id": "900c9832-31d6-460a-9065-762fe63ec83c",
    "resourceId": "/subscriptions/c74c5de5-0170-405b-954a-e6491cf0c838/resourceGroups/CLOUDCRAFT/providers/Microsoft.Network/applicationGateways/DocTeamGateway",
    "region": "eastus",
    "mapPos": [1, 8],
    "tier": "Standard",
    "size": "Small",
    "instances": 2,
    "computeUnits": 0,
    "persistentConnections": 0,
    "throughput": 0,
    "dataProcessed": 0,
    "outboundDataTransfer": 0,
    "color": {
        "isometric": "#CEE0F5",
        "2d": null
    },
    "accentColor": {
        "isometric": "#0078D4",
        "2d": null
    },
    "link": "https://azure.microsoft.com/products/application-gateway",
    "locked": true
}
```

- **type: string**: 컴포넌트 유형. 이 컴포넌트의 `azureappgw` 값 문자열이어야 합니다.
- **id: string, uuid**: 구성 요소의 고유 식별자입니다. API에서는 내부적으로 UUID v4를 사용하나 다른 고유 식별자도 사용할 수 있습니다/
- **resourceId: string**: Azure 구성 요소 내 전역 고유 식별자
- **region: string**: 구성 요소의 Azure 리전. API가 중국을 제외한 전역 리전을 지원합니다.
- **mapPos: array**: 청사진에 있는 구성 요소 포지션. API에서는 포지션을 표현하기 위해 고유 X와 Y 좌표 쌍을 사용합니다.
- **tier: string**: 애플리케이션 게이트웨이의 서비스 레벨 티어입니다. `Standard` , `Standard V2`, `WAF` 또는 `WAF V2`의 네 가지 값 중 하나를 허용합니다. 기본값은 `Standard V2`입니다.
- **size: string**: 애플리케이션 게이트웨이의 크기입니다. `Small` , `Medium` 또는 `Large`의 세 가지 값 중 하나를 허용합니다. 기본값은 `Medium`입니다.
- **instances: number**: 애플리케이션 게이트웨이 인스턴스 수입니다. 기본값은 `2`입니다.
- **computeUnits: number**: 애플리케이션 게이트웨이가 소비하는 컴퓨팅 용량치의 측정값입니다. 기본값은 `0`입니다.
- **persistentConnections: number**: 애플리케이션 게이트웨이 영구 연결 수입니다. 기본값은 `0`입니다.
- **throughput: number**: 초당 메가비트로 표현한 애플리케이션 게이트웨이의 처리량입니다. 기본값은 `0`입니다.
- **dataProcessed: number**: 애플리케이션 게이트웨이가 처리한 월별 데이터 총량(기가바이트)입니다. 기본값은 `0`입니다.
- **outboundDataTransfer: number**: 애플리케이션 게이트웨이가 처리한 월별 아웃바운드 데이터 총량(기가바이트)입니다. 기본값은 `0`입니다.
- **color: object**: 구성 요소에 적용할 색
  - **isometric: string**: 구성 요소 바디의 3D 보기에 적용할 16진수 색. 기본값은 `#CEE0F5`입니다.
  - **2d: string**: 구성 요소의 2D 보기에 적용할 16진수 색. 기본값은 `null`입니다.
- **accentColor: object**: 구성 요소 로고의 강조 색
  - **isometric: string**: 구성 요소 로고의 3D 보기에 적용할 16진수 색. 기본값은 `#0078D4`입니다.
  - **2d: string**: 구성 요소 로고의 2D 보기에 적용할 16진수 색. 기본값은 `null`입니다.
- **link: string, uri**: 구성 요소를 다른 다이어그램 또는 외부 웹사이트로 연결할 URL. `blueprint://` 또는 `https://` 형식 중 하나를 사용할 수 있습니다.
- **locked: boolean**: 웹 인터페이스를 통해 포지션 변경을 허용할지 여부 결정. 기본값은 `false`입니다.

[1]: https://developers.cloudcraft.co/