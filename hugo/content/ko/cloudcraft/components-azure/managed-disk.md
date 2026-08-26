---
title: 관리형 디스크 구성 요소
---

## 개요

관리형 디스크 구성 요소로 Azure 환경에서 관리형 블록 스토리지 볼륨을 표시 및 시각화합니다.

{{< img src="cloudcraft/components-azure/managed-disk/component-managed-disk-diagram.png" alt="상호 연결된 Azure 구성 요소를 나타내는 아이소메트릭 Cloudcraft 다이어그램 스크린샷." responsive="true" style="width:60%;">}}

## 도구 모음

도구 모음을 사용해 구성 요소를 구성하고 사용자 지정할 수 있습니다. 다음 옵션을 사용할 수 있습니다.

- **Color**: 3D 보기 구성 요소의 강조 및 채우기 색상을 선택합니다.
- **Type**: 디스크 유형을 선택합니다.
- **Type**: 디스크 사이즈를 선택합니다.

## API

[Cloudcraft API][1]로 프로그래밍 방식으로 액세스하여 아키텍처 다이어그램을 JSON 객체로 렌더링할 수 있습니다. 다음은 관리형 디스크 구성 요소의 JSON 객체 예시입니다.

### 스키마

```json
{
    "type": "azuredisk",
    "id": "17e69a0d-4632-42bd-a6c1-f3b9213604ea",
    "resourceId": "/subscriptions/b59a176b-3a5d-4cc6-ab8c-585984717c32/resourceGroups/CLOUDCRAFT/providers/Microsoft.Compute/disks/documentation-volume",
    "region": "eastus",
    "mapPos": [-2,12],
    "tier": "P4",
    "diskSizeGb": 32,
    "color": {
        "isometric": "#CEE0F5",
        "2d": "null"
    },
    "accentColor": {
        "isometric": "#0078D4",
        "2d": "null"
    },
    "link": "https://azure.microsoft.com/products/storage/disks",
    "locked": true
}
```

- **type: string**: 구성 요소의 유형. 이 구성 요소의 `azuredisk` 값 문자열이어야 합니다.
- **id: string, uuid**: 구성 요소의 고유 식별자입니다. API에서는 내부적으로 UUID v4를 사용하나 다른 고유 식별자도 사용할 수 있습니다.
- **resourceId: string**: Azure 구성 요소 내 전역 고유 식별자입니다.
- **region: string**: 구성 요소의 Azure 리전. API가 중국을 제외한 전역 리전을 지원합니다.
- **mapPos: array**: 청사진에 있는 구성 요소 포지션. API에서는 포지션을 표현하기 위해 고유 X와 Y 좌표 쌍을 사용합니다.
- **tier: string**: 디스크 유형 티어입니다.
- **diskSizeGb: number**: 디스크에서 사용할 수 있는 스토리지 용량(기가바이트 단위)입니다.
- **color: object**: 구성 요소에 적용할 색
  - **isometric: string**: 구성 요소 바디의 3D 보기에 적용할 16진수 색. 기본값은 `#CEE0F5`입니다.
  - **2d: string**: 구성 요소의 2D 보기에 적용할 16진수 색. 기본값은 `null`입니다.
- **accentColor: object**: 구성 요소 로고의 강조 색
  - **isometric: string**: 구성 요소 로고의 3D 보기에 적용할 16진수 색. 기본값은 `#0078D4`입니다.
  - **2d: string**: 구성 요소 로고의 2D 보기에 적용할 16진수 색. 기본값은 `null`입니다.
- **link: string, uri**: 구성 요소를 다른 다이어그램 또는 외부 웹사이트로 연결할 URL. `blueprint://` 또는 `https://` 형식 중 하나를 사용할 수 있습니다.
- **locked: boolean**: 웹 인터페이스를 통해 포지션 변경을 허용할지 여부 결정. 기본값은 `false`입니다.

[1]: https://developers.cloudcraft.co/