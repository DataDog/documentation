---
title: DocumentDB 컴포넌트
---
## 개요

DocumentDB 컴포넌트를 사용하여 Amazon Web Services 아키텍처의 DocumentDB 클러스터를 나타냅니다.

{{< img src="cloudcraft/components-aws/documentdb/component-documentdb-diagram.png" alt="DocumentDB' AWS 컴포넌트를 보여주는 아이소메트릭 Cloudcraft 다이어그램 스크린샷." responsive="true" style="width:60%;">}}

## 도구 모음

도구 모음을 사용해 구성 요소를 구성하고 사용자 지정할 수 있습니다. 다음 옵션을 사용할 수 있습니다.

- **Color**: 구성 요소와 강조 항목에 적용할 사전 정의된 색상을 선택하거나 16진수 값을 입력할 수 있습니다. 구성 요소에서는 2D와 3D 모두에 같은 색상을 사용하거나 각각에 다른 색상을 적용할 수 있습니다.
- **Role**: DocumentDB 인스턴스의 역할을 선택합니다. 작성자 또는 읽기 권한자를 선택할 수 있습니다.
- **Instance type**: 인스턴스 종류. 인스턴스 종류를 바꾸면 툴바에 나타나는 하드웨어 상세 정보가 하이퍼바이저에서 사용되는 것을 반영하도록 변경됩니다.
- **Size**: 데이터베이스 클러스터의 크기. 인스턴스 유형과 마찬가지로, 툴바에 표시되는 하드웨어 상세 정보가 해당 크기를 반영하도록 변경됩니다.
- **Storage (GiB)**: 클러스터용으로 프로비저닝된 스토리지 양입니다(기비바이트 단위). 작성자 역할만 사용할 수 있습니다.
- **Snapshots (GiB)**: 스냅샷용으로 프로비저닝된 스토리지 양입니다(기비바이트 단위). 작성자 역할만 사용할 수 있습니다.
- **IOPS(백만)**: 클러스터의 월별 I/O 한도입니다(백만 단위). 작성자 역할만 사용할 수 있습니다.

## API

[Cloudcraft API][1]를 사용해 프로그래밍을 통해 액세스하여 JSON 개체의 아키텍처 다이어그램을 렌더링할 수 있습니다.

### 스키마

다음은 DocumentDB 컴포넌트의 JSON 오브젝트 예시입니다.

```json
{
  "type": "docdb",
  "id": "36f18266-2d25-4003-9719-ee64899e2c4e",
  "region": "us-east-1",
  "mapPos": [2,4],
  "role": "writer",
  "instanceType": "t3",
  "instanceSize": "medium",
  "storage": 10,
  "snapshots": 4,
  "iops": "200",
  "color": {
    "isometric": "#ececed",
    "2d": "#3b48cc"
  },
  "accentColor": {
    "isometric": "#4286c5",
    "2d": "#ffffff"
  },
  "link": "blueprint://ae6349e1-fa15-41c8-8e89-d201f9fa3cc9",
  "locked": true
}
```

- **type: docdb**: 컴포넌트의 유형입니다.
- **id: string**: `uuid` 형식의 구성 요소 고유 식별자입니다.
- **region: string**: RDS 인스턴스가 배포되는 AWS 리전. `cn-` 리전을 제외한 모든 리전을 지원합니다.
- **mapPos: [number, number]**: 청사진에 있는 구성 요소의 포지션. X와 Y 좌표 쌍을 이용해 표현됩니다.
- **role: string**: DocumentDB 인스턴스에 사용되는 역할입니다. 허용되는 값은 `writer` 및 `reader`입니다.
- **instanceType: string**: 인스턴스 유형. 허용되는 값은 `r4`, `r5`, `t3`입니다.
- **instanceSize: string**: 데이터베이스 클러스터의 크기. 자세한 정보는 [instanceSize의 허용값](#accepted-values-for-instancesize)을 참조하세요.
- **storage: number**: 클러스터용으로 프로비저닝된 스토리지 양입니다(기비바이트 단위). `role` 역할이 `writer`로 설정된 경우에만 사용할 수 있습니다.
- **snapshots: number**: 스냅샷용으로 프로비저닝된 스토리지 양입니다(기비바이트 단위). `role` 역할이 `writer`로 설정된 경우에만 사용할 수 있습니다.
- **iops: number**: 백만 단위로 표현한 클러스터의 월별 I/O 한도입니다. `role` 역할이 `writer`로 설정된 경우에만 사용할 수 있습니다.
- **color: object**: 구성 요소 바디에 적용할 색입니다.
  - **isometric: string**: 3D 보기에서 구성 요소에 적용할 색. 16진수 색이어야 합니다.
  - **2d: string**: 2D 보기에서 구성 요소에 적용할 색. 16진수 색이어야 합니다.
- **accentColor: object**: 블록에 있는 구성 요소 로고의 강조색입니다.
  - **isometric: string**: 3D 보기의 컴포넌트 강조색. 16진수 색이어야 합니다.
  - **2d: string**: 2D 보기의 컴포넌트 강조색. 16진수 색이어야 합니다.
- **link: uri**. `blueprint://ID` 형식을 사용하여 구성 요소를 다른 다이어그램에 연결하거나`https://LINK` 형식을 사용하여 외부 웹사이트에 연결합니다.
- **locked: boolean**: `true`로 설정하면 어플리케이션을 통한 컴포넌트 변경은 잠금 해제 시까지 비활성화됩니다.

DocumentDB 컴포넌트는 [VPC][2], [보안 그룹][3] 및 [서브넷][4]에 추가할 수 있습니다.

## `instanceSize`에서 허용된 값

`instanceSize` 키에서는 다음 값을 허용합니다.

```
medium, large, xlarge, 2xlarge, 4xlarge, 8xlarge, 12xlarge, 16xlarge, 24xlarge
```

[1]: https://developers.cloudcraft.co/
[2]: /ko/cloudcraft/components-aws/vpc/
[3]: /ko/cloudcraft/components-aws/security-group/
[4]: /ko/cloudcraft/components-aws/subnet/