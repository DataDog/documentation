---
title: Azure Table 구성 요소
---

## 개요

Azure Table 구성 요소를 사용해 Azure 환경에서 NoSQL 키-값 스토어를 표현 및 시각화할 수 있습니다.

{{< img src="cloudcraft/components-azure/azure-table/component-azure-table-diagram.png" alt="상호 연결된 Azure 구성 요소를 보여주는 등축도법 Cloudcraft 다이어그램 스크린샷" responsive="true" style="width:60%;">}}

## 도구 모음

도구 모음을 사용해 구성 요소를 구성하고 사용자 지정할 수 있습니다. 다음 옵션을 사용할 수 있습니다.

- **Color**: 3D 보기 구성 요소의 강조 및 채우기 색상을 선택합니다.
- **Redundancy**: 주요 및 보조 지역에서 데이터를 복제하는 방법을 선택합니다.
- **Storage (GiB)**: 키값 스토어에서 사용 가능한 총 데이터 볼륨을 기비바이트로 입력합니다.
- *Request Units (10k)**: 요청 수를 만 단위로 입력합니다.

## API

[Cloudcraft API][1]를 사용해 프로그래밍을 통해 액세스하여 아키텍처 다이어그램을 JSON 개체로 렌더링할 수 있습니다.  다음은 Azure Table 구성 요소의 JSON 개체 예시입니다.

### 스키마

```json
{
    "type": "azuretable",
    "id": "e3b7f697-3ae6-4d3b-bd7f-bac3e0cc05ae",
    "region": "northcentralus",
    "mapPos": [1,7.75],
    "redundancy": "LRS",
    "storageGb": 10,
    "requestUnits": 0,
    "color": {
        "isometric": null,
        "2d": null
    },
    "accentColor": {
        "isometric": null,
        "2d": null
    },
    "link": "https://azure.microsoft.com/products/storage/tables/",
    "locked": true
}
```

- **type: string**: 구성 요소 유형. 이 구성 요소의 `azuretable` 값 문자열이어야 합니다.
- **id: string, uuid**: 구성 요소의 고유 식별자입니다. API에서는 내부적으로 UUID v4를 사용하나 다른 고유 식별자도 사용할 수 있습니다.
- **resourceId: string**: Azure 구성 요소 내 전역 고유 식별자
- **region: string**: 구성 요소의 Azure 리전. API가 중국을 제외한 전역 리전을 지원합니다.
- **mapPos: array**: 청사진에 있는 구성 요소 포지션. API에서는 포지션을 표현하기 위해 고유 X와 Y 좌표 쌍을 사용합니다.
- **redundancy: string**: 지역 간에 데이터를 복제하는 방법에 대한 중복성 옵션입니다. `LRS` , `ZRS`, `GRS`, `GZRS`, `RA-GRS` 세 개 값 중 하나를 허용하며 기본값은 `LRS`입니다.
- **storageGb: number**: 키값 스토어에 사용할 수 있는 총 데이터 볼륨(기비바이트)입니다. 기본값은 `0`입니다.
- **requestUnits: number**: 만 단위로 표현한 요청 수입니다. 기본값은 `0`입니다.
- **color: object**: 구성 요소에 적용할 색
  - **isometric: string**: 구성 요소 바디의 3D 보기에 적용할 16진수 색. 기본값은 `#CEE0F5`입니다.
  - **2d: string**: 구성 요소의 2D 보기에 적용할 16진수 색. 기본값은 `null`입니다.
- **accentColor: object**: 구성 요소 로고의 강조 색
  - **isometric: string**: 구성 요소 로고의 3D 보기에 적용할 16진수 색. 기본값은 `#0078D4`입니다.
  - **2d: string**: 구성 요소 로고의 2D 보기에 적용할 16진수 색. 기본값은 `null`입니다.
- **link: string, uri**: 구성 요소를 다른 다이어그램 또는 외부 웹사이트로 연결할 URL. `blueprint://` 또는 `https://` 형식 중 하나를 사용할 수 있습니다.
- **locked: boolean**: 웹 인터페이스를 통해 포지션 변경을 허용할지 여부 결정. 기본값은 `false`입니다.

[1]: https://developers.cloudcraft.co/