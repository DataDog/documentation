---
title: PostgreSQL 컴포넌트용 데이터베이스
---

## 개요

PostgreSQL 컴포넌트용 데이터베이스로 Azure 환경에서 PostgreSQL 데이터베이스를 표현 및 시각화합니다.

{{< img src="cloudcraft/components-azure/database-for-postgresql/component-database-for-postgresql-diagram.png" alt="상호 연결된 Azure 컴포넌트를 나타내는 아이소메트릭 Cloudcraft 다이어그램 스크린샷." responsive="true" style="width:60%;">}}

## 도구 모음

도구 모음을 사용해 구성 요소를 구성하고 사용자 지정할 수 있습니다. 다음 옵션을 사용할 수 있습니다.

- **Color**: 3D 보기 컴포넌트 바디의 강조 및 채우기 색상을 선택합니다.
- **Deployment option**: 데이터베이스의 배포 유형을 선택합니다.
- **Tier**: 데이터베이스의 성능 티어를 선택합니다.
- **Instance**: 데이터베이스 인스턴스 종류를 선택합니다. 인스턴스 종류를 바꾸면 툴바에 나타나는 하드웨어 상세 정보가 하이퍼바이저에서 사용되는 것을 반영하도록 변경됩니다.
- **High availability**: 데이터베이스에 대한 고가용성 옵션을 선택합니다. **Deployment option***이 **Flexible server**로 설정된 경우에만 사용할 수 있습니다.
- **Storage (GiB)**: 데이터베이스에서 사용 가능한 총 스토리지 볼륨을 기비바이트로 입력합니다.

## API

[Cloudcraft API][1]를 활용해 프로그래밍 방식으로 액세스하고 아키텍처 다이어그램을 JSON 객체로 렌더링합니다. 다음은 Postgresql 컴포넌트용 데이터베이스의 JSON 객체 예시입니다.

### 스키마

```json
{
    "type": "azurepostgresql",
    "id": "db7da7f6-9d1a-46df-808c-6979e02d5182",
    "region": "northcentralus",
    "mapPos": [5,0],
    "deploymentOption": "Single",
    "tier": "GeneralPurpose",
    "instance": "GP_Gen5_2",
    "storageMB": 20480,
    "haEnabled": false,
    "backupRetention": 7,
    "color": {
        "isometric": null,
        "2d": null
    },
    "accentColor": {
        "isometric": null,
        "2d": null
    },
    "link": "https://azure.microsoft.com/products/postgresql",
    "locked": true
}
```

- **type: string**: 컴포넌트 유형. 이 컴포넌트의 `azurepostgresql` 값 문자열이어야 합니다.
- **id: string, uuid**: 컴포넌트용 고유 식별자입니다. API에서는 내부적으로 UUID v4를 사용하나 다른 고유 스트링도 허용됩니다.
- **resourceId: string**: Azure 구성 요소 내 전역 고유 식별자
- **region: string**: 구성 요소의 Azure 리전. API가 중국을 제외한 전역 리전을 지원합니다.
- **mapPos: array**: 청사진에 있는 구성 요소 포지션. API에서는 포지션을 표현하기 위해 고유 X와 Y 좌표 쌍을 사용합니다.
- **deploymentOption: string**: 데이터베이스의 배포 유형입니다. 기본값은 `Single`입니다.
- **tier: string**: 데이터베이스 성능 티어입니다. 기본값은 `GeneralPurpose`입니다.
- **instance: string**: 데이터베이스의 인스턴스 유형입니다. 기본값은 `GP_Gen5_2`입니다.
- ***storageMB: string**: 데이터베이스에 사용할 수 있는 총 스토리지 볼륨(메가바이트)입니다. 기본값은 `20480`입니다.
- **haEnabled: boolean**: 고가용성 활성화 여부입니다. 기본값은 `false.`입니다.
- **color: object**: 구성 요소에 적용할 색입니다.
  - **isometric: string**: 구성 요소 바디의 3D 보기에 적용할 16진수 색. 기본값은 `#CEE0F5`입니다.
  - **2d: string**: 구성 요소의 2D 보기에 적용할 16진수 색. 기본값은 `null`입니다.
- **accentColor: object**: 구성 요소 로고의 강조 색입니다.
  - **isometric: string**: 구성 요소 로고의 3D 보기에 적용할 16진수 색. 기본값은 `#0078D4`입니다.
  - **2d: string**: 구성 요소 로고의 2D 보기에 적용할 16진수 색. 기본값은 `null`입니다.
- **link: string, uri**: 구성 요소를 다른 다이어그램 또는 외부 웹사이트로 연결할 URL. `blueprint://` 또는 `https://` 형식 중 하나를 사용할 수 있습니다.
- **locked: boolean**: 웹 인터페이스를 통해 포지션 변경을 허용할지 여부 결정. 기본값은 `false`입니다.

[1]: https://developers.cloudcraft.co/