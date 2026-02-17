---
title: File share 구성 요소
---

## 개요

File Share 구성 요소를 사용하여 Azure 환경에서 파일 스토리지 서비스를 표시하고 시각화합니다.

{{< img src="cloudcraft/components-azure/file-share/component-file-share-diagram.png" alt="상호 연결된 Azure 구성 요소를 보여주는 아이소메트릭 Cloudcraft 다이어그램의 스크린샷." responsive="true" style="width:60%;">}}

## 도구 모음

도구 모음을 사용해 구성 요소를 구성하고 사용자 지정할 수 있습니다. 다음 옵션을 사용할 수 있습니다.

- **Color**: 3D 보기 구성 요소의 강조 및 채우기 색상을 선택합니다.
- **Tier**: 파일 스토리지 서비스의 스토리지 티어를 선택합니다.
- **Redundancy**: 주요 및 보조 지역에서 데이터를 복제하는 방법을 선택합니다.
- **Data at-rest (GB)**: 파일 서비스에 프로비저닝된 크기를 입력합니다.
- **Snapshots (GB)**: 스냅샷에 사용할 수 있는 총 데이터 볼륨을 입력합니다.
- **Metadata at-rest (GB)**: 파일 시스템 메타데이터에 사용된 총 데이터 볼륨을 입력합니다.

## API

[Cloudcraft API][1]를 사용하여 아키텍처 다이어그램에 프로그래밍 방식으로 액세스하고 JSON 객체로 렌더링할 수 있습니다. 다음은 File Share 구성 요소의 JSON 객체 예시입니다.

### 스키마

```json
{
    "type": "azurefiles",
    "id": "70cc1d82-30e1-4c62-bd29-634f72cd21cf",
    "region": "eastus",
    "mapPos": [2,6],
    "tier": "Standard",
    "redundancy": "LRS",
    "dataGb": 0,
    "snapshotsGb": 0,
    "metadataGb": 0,
    "color": {
        "isometric": null,
        "2d": null
    },
    "accentColor": {
        "isometric": null,
        "2d": null
    },
    "link": "https://azure.microsoft.com/products/storage/files/",
    "locked": true
}

```

- **type: string**: 구성 요소 유형. 이 구성 요소의 값은 `azurefiles`(문자열)이어야 함.
- **id: string, uuid**: 구성 요소의 고유 식별자입니다. API에서는 내부적으로 UUID v4를 사용하나 다른 고유 식별자도 사용할 수 있습니다/
- **resourceId: string**: Azure 구성 요소 내 전역 고유 식별자
- **region: string**: 구성 요소의 Azure 리전. API가 중국을 제외한 전역 리전을 지원합니다.
- **mapPos: array**: 청사진에 있는 구성 요소 포지션. API에서는 포지션을 표현하기 위해 고유 X와 Y 좌표 쌍을 사용합니다.
- **tier: string**: 스토리지 서비스의 스토리지 티어로 `Premium`, `Hot`, `Cool`, `Standard`로 구성됩니다. 기본값은 `Standard`.
- **redundancy: string**: 지역 간 데이터 복제 방법의 중복성 옵션. 허용값: `LRS`, `ZRS`, `GRS`,  `GZRS`. 기본값은 `LRS`.
- **dataGb: number**: 파일 서비스에 프로비저닝된 크기(기가바이트). 기본값 `0`.
- **snapshotGb: number**: 스냅샷에 사용 가능한 총 데이터 볼륨(기가바이트). 기본값은 `0`.
- **metadataGb: number**: 파일 시스템 메타데이터에 사용된 총 데이터 볼륨(기가바이트). 기본값은 `0`.
- **color: object**: 구성 요소에 적용할 색
  - **isometric: string**: 구성 요소 바디의 3D 보기에 적용할 16진수 색. 기본값은 `#CEE0F5`
  - **2d: string**: 구성 요소의 2D 보기에 적용할 16진수 색. 기본값은 `null`
- **accentColor: object**: 구성 요소 로고의 강조 색
  - **isometric: string**: 구성 요소 로고의 3D 보기에 적용할 16진수 색. 기본값은 `#0078D4`
  - **2d: string**: 구성 요소 로고의 2D 보기에 적용할 16진수 색. 기본값은 `null`
- **link: string, uri**: 구성 요소를 다른 다이어그램 또는 외부 웹사이트로 연결할 URL. `blueprint://` 또는 `https://` 형식 중 하나를 사용할 수 있습니다.
- **locked: boolean**: 웹 인터페이스를 통해 포지션 변경을 허용할지 여부 결정. 기본값은 `false`

[1]: https://developers.cloudcraft.co/