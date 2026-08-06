---
title: Bastion 구성 요소
---

## 개요

Bastion 구성 요소를 사용하면 Azure 환경에서 Bastion 서버를 나타내고 시각화할 수 있습니다.

{{< img src="cloudcraft/components-azure/bastion/component-bastion-diagram.png" alt="상호 연결된 Azure 구성 요소를 보여주는 아이소메트릭 Cloudcraft 다이어그램 스크린샷." responsive="true" style="width:60%;">}}

## 도구 모음

도구 모음을 사용해 구성 요소를 구성하고 사용자 지정할 수 있습니다. 다음 옵션을 사용할 수 있습니다.

- **Color**: 3D 보기 구성 요소의 강조 및 채우기 색상을 선택합니다.
- **Tier**: Bastion 서버의 서비스 수준 티어를 선택합니다.
- **Scale units**: Bastion 서버의 스케일 단위 수를 입력합니다. 이 옵션은 Standard 티어에서만 사용할 수 있습니다.
- **Outbound data transfer(GB)**: Bastion 서버에서 전송된 아웃바운드 데이터의 총 볼륨을 기가바이트 단위로 입력합니다.

## API

[Cloudcraft API][1]를 사용하여 아키텍처 다이어그램에 프로그래밍 방식으로 액세스하고 JSON 객체로 렌더링할 수 있습니다. 다음은 Bastion 구성 요소의 JSON 객체 예시입니다.

### 스키마

```json
{
    "type": "azurebastion",
    "id": "efe6a642-dc6d-4ea3-ab3c-465358f10e15",
    "resourceId": "/subscriptions/14cc8259-0159-45d7-801b-2b209bac6e98/resourceGroups/CLOUDCRAFT/providers/Microsoft.Network/bastionHosts/BastionDoc",
    "region": "eastus",
    "mapPos": [2,10],
    "tier": "Basic",
    "scaleUnits": 1,
    "outboundDataTransfer": 0,
    "color": {
        "isometric": "#CEE0F5",
        "2d": "null"
    },
    "accentColor": {
        "isometric": "#0078D4",
        "2d": "null"
    },
    "link": "https://azure.microsoft.com/products/azure-bastion/",
    "locked": true
}
```

- **type: string**: 구성 요소 유형. 이 구성 요소의 값은 `azurebastion`(문자열)이어야 합니다. 
- **id: string, uuid**: 구성 요소의 고유 식별자입니다. API에서는 내부적으로 UUID v4를 사용하나 다른 고유 식별자도 사용할 수 있습니다.
- **resourceId: string**: Azure 구성 요소 내 전역 고유 식별자
- **region: string**: 구성 요소의 Azure 리전. API가 중국을 제외한 전역 리전을 지원합니다.
- **mapPos: array**: 청사진에 있는 구성 요소 포지션. API에서는 포지션을 표현하기 위해 고유 X와 Y 좌표 쌍을 사용합니다.
- **tier: string**: 서버의 서비스 수준 티어로 `Basic` 또는 `Standard`. 기본값은 `Standard`.
- **scaleUnits: number**: Bastion 서버의 스케일 단위 수.
- **outboundDataTransfer: number**: Bastion 서버에서 전송한 아웃바운드 데이터의 총 볼륨(기가바이트). 기본값은 `0`.
- **color: object**: 구성 요소에 적용할 색
  - **isometric: string**: 구성 요소의 3D 보기에 적용할 16진수 색. 기본값은 `#ececed`입니다.
  - **2d: string**: 구성 요소의 2D 보기에 적용할 16진수 색. 기본값은 `null`입니다.
- **accentColor: object**: 구성 요소 로고의 강조 색
  - **isometric: string**: 3D 보기에서 구성 요소 로고에 사용할 16진수 색상. 기본값은 `#0078d4`.
  - **2d: string**: 구성 요소 로고의 2D 보기에 적용할 16진수 색. 기본값은 `null`입니다.
- **link: string, uri**: 구성 요소를 다른 다이어그램 또는 외부 웹사이트로 연결할 URL. `blueprint://` 또는 `https://` 형식 중 하나를 사용할 수 있습니다.
- **locked: boolean**: 웹 인터페이스를 통해 구성 요소의 위치를 ​​변경할지 여부. 기본값은 `false`.

[1]: https://developers.cloudcraft.co/