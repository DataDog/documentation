---
title: Cosmos DB 컴포넌트
---

## 개요

Cosmos DB 컴포넌트를 사용해 Azure 환경에서 서버리스 데이터베이스를 표현 및 시각화할 수 있습니다.

{{< img src="cloudcraft/components-azure/cosmos-db/component-cosmos-db-diagram.png" alt="상호 연결된 Azure 컴포넌트를 보여주는 등축도법 Cloudcraft 다이어그램 스크린샷." responsive="true" style="width:60%;">}}

## 도구 모음

도구 모음을 사용해 구성 요소를 구성하고 사용자 지정할 수 있습니다. 다음 옵션을 사용할 수 있습니다.

- **Color**: 3D 보기 구성 요소의 강조 및 채우기 색상을 선택합니다.
- **API**: API 데이터베이스를 선택합니다.
- **용량 모드**: 데이터베이스 작업의 용량 모드를 선택합니다. PostgreSQL에서는 사용할 수 없습니다.
- **복제 모드**: 데이터베이스의 복제 모드를 선택합니다. PostgreSQL에서는 사용할 수 없습니다.
- **요청 단위**: 초당 요청 단위 수를 입력합니다. PostgreSQL에는 사용할 수 없습니다.
- **스토리지(GiB)**: 데이터베이스의 총 트랜잭션 스토리지 볼륨을 기비바이트 단위로 입력합니다. PostgreSQL에는 사용할 수 없습니다.
- **노드 수**: 워크로드에 사용할 수 있는 작업자 노드 수를 선택합니다. PostgreSQL에서만 사용할 수 있습니다.
- **노드 vCores**: 각 노드에 사용할 수 있는 가상 코어 수를 선택합니다. PostgreSQL에서만 사용할 수 있습니다.
- **노드 스토리지**: 각 노드에 사용할 수 있는 스토리지 양을 선택합니다. PostgreSQL에서만 사용할 수 있습니다.
- **HA**: 데이터베이스 고가용성 모드 실행 여부를 선택합니다. PostgreSQL에서만 사용할 수 있습니다.

## API

[Cloudcraft API][1]를 사용해 프로그래밍을 통해 액세스하여 아키텍처 다이어그램을 JSON 개체로 렌더링할 수 있습니다.  다음은 Cosmos DB 컴포넌트의 JSON 오브젝트 예시입니다.

### 스키마

```json
{
    "type": "azurecosmosdb",
    "id": "c7fcbf73-87b1-48fd-886b-1ccdd38e0076",
    "region": "centralus",
    "mapPos": [-5,11],
    "api": "sql",
    "capacityMode": "provisioned",
    "replicationMode": "standard",
    "requestUnits": 400,
    "storageGb": 1,
    "postgresqlNodes": 1,
    "postgresqlCoordinatorCores": 4,
    "postgresqlCoordinatorStorage": 512,
    "postgresqlWorkerCores": 2,
    "postgresqlWorkerStorage": 128,
    "postgresqlHighAvailability": false,
    "color": {
        "isometric": null,
        "2d": null
    },
    "accentColor": {
        "isometric": null,
        "2d": null
    },
    "link": "https://azure.microsoft.com/products/cosmos-db/",
    "locked": true
}

```

- **type: string**: 구성 컴포넌트 유형. 이 컴포넌트의 `azurecosmosdb` 값 문자열이어야 합니다.
- **id: string, uuid**: 구성 요소의 고유 식별자입니다. API에서는 내부적으로 UUID v4를 사용하나 다른 고유 식별자도 사용할 수 있습니다/
- **resourceId: string**: Azure 구성 요소 내 전역 고유 식별자
- **region: string**: 구성 요소의 Azure 리전. API가 중국을 제외한 전역 리전을 지원합니다.
- **mapPos: array**: 청사진에 있는 구성 요소 포지션. API에서는 포지션을 표현하기 위해 고유 X와 Y 좌표 쌍을 사용합니다.
- **API: string**: 데이터베이스 API. [자세한 내용은 Azure의 Cosmos DB 설명서를 참조하세요][2]. 기본값은 `sql`입니다.
- **capacityMode: string**: 데이터베이스 작업의 용량 모드입니다. `provisioned` 또는 `serverless` 두 값 중 하나를 허용합니다. 기본값은 `provisioned`입니다.
- **replicationMode: string**: 데이터베이스 복제 모드입니다. `standard` , `with-zones`, `multi-master` 세 가지 값 중 하나를 허용합니다. 기본값은 `standard`입니다.
- **requestUnits: number**: 초당 요청 단위 수입니다. 기본값은 `400`입니다.
- **storageGb: string**: 데이터베이스의 트랜잭션 스토리지 총 볼륨(기비바이트)입니다. 기본값은 `1`입니다.
- **postgresqlNodes: number**: 워크로드에 사용할 수 있는 작업자 노드 수입니다. 기본값은 `1`입니다.
- **postgresqlCoordinatorCores: number**: 코디네이터에 사용할 수 있는 가상 코어의 수입니다. 기본값은 `4`입니다.
- **postgresqlCoordinatorStorage: number**: 코디네이터에 사용할 수 있는 스토리지의 양입니다. 기본값은 `512`입니다.
- **postgreesqlWorkerCores: number**: 각 노드에 사용할 수 있는 가상 코어의 수입니다. 기본값은 `2`입니다.
- **postgreesqlWorkerStorage: number**: 각 노드에서 사용할 수 있는 스토리지의 양입니다. 기본값은 `128`입니다.
- **postgresqlHighAvailability: boolean**: 데이터베이스가 고가용성 모드로 실행되는지 여부를 결정합니다. 기본값은 `false`입니다.
- **color: object**: 구성 요소에 적용할 색
  - **isometric: string**: 구성 요소 바디의 3D 보기에 적용할 16진수 색. 기본값은 `#CEE0F5`입니다.
  - **2d: string**: 구성 요소의 2D 보기에 적용할 16진수 색. 기본값은 `null`입니다.
- **accentColor: object**: 구성 요소 로고의 강조 색
  - **isometric: string**: 구성 요소 로고의 3D 보기에 적용할 16진수 색. 기본값은 `#0078D4`입니다.
  - **2d: string**: 구성 요소 로고의 2D 보기에 적용할 16진수 색. 기본값은 `null`입니다.
- **link: string, uri**: 구성 요소를 다른 다이어그램 또는 외부 웹사이트로 연결할 URL. `blueprint://` 또는 `https://` 형식 중 하나를 사용할 수 있습니다.
- **locked: boolean**: 웹 인터페이스를 통해 포지션 변경을 허용할지 여부 결정. 기본값은 `false`입니다.

[1]: https://developers.cloudcraft.co/
[2]: https://learn.microsoft.com/azure/cosmos-db/