---
title: VPC 구성 요소
---
## 개요

VPC 구성 요소를 사용해 Amazon Web Services 아키텍처에서 분리된 가상 네트워크를 표시하세요.

{{< img src="cloudcraft/components-aws/vpc/component-vpc-diagram.png" alt="'VPC' AWS 구성 요소를 보여주는 등축도법 Cloudcraft 다이어그램 스크린샷" responsive="true" style="width:60%;">}}

## 도구 모음

도구 모음을 사용해 구성 요소를 구성하고 사용자 지정할 수 있습니다. 다음 옵션을 사용할 수 있습니다.

- **색상r**: 구성 요소와 강조 항목에 적용할 사전 정의된 색상을 선택하거나 16진수 값을 입력할 수 있습니다. 구성 요소에서는 2D와 3D 모두에 같은 색상을 사용하거나 각각에 다른 색상을 적용할 수 있습니다.
- **Name**: VPC 이름을 만듭니다.
- **Shape**: VPC 모양을 선택합니다.
- **Padding**: VPC 내부 공간의 양을 늘리거나 줄입니다.
- **Peering**: 다른 VPC의 피어링 연결을 보거나 제거하거나 추가합니다.

## API

[Cloudcraft API][1]를 사용해 프로그래밍을 통해 액세스하여 JSON 객체의 아키텍처 다이어그램을 렌더링할 수 있습니다.

### 스키마

다음은 VPC 구성 요소의 JSON 예시입니다.

```json
{
  "type": "vpc",
  "id": "5631f2ca-3d93-4591-a7d9-85d5f0d011eb",
  "region": "us-east-1",
  "name": "cloudcraft-vpc-example",
  "shape": "rectangular",
  "padding": 1.5,
  "nodes": [
    "e99bad32-82f6-49a7-b145-11963a3d7775"
  ],
  "peeringConnections": [
    {
      "id": "1a367d09-beea-4a87-9740-1831c1809d00",
      "name": "Example Peering",
      "accepterVpc": "f38bc8ae-98c1-45c5-b7ad-54e9bb9ee166",
      "hidden": false
    }
  ],
  "color": {
    "isometric": "#03a9f4",
    "2d": "#03a9f4"
  },
  "locked": true
}
```

- **type: vpc**: 구성 요소의 유형입니다.
- **id: string**: `uuid` 형식의 구성 요소 고유 식별자
- **region: string**: 이 VPC가 배포된 AWS 지역입니다. `cn-` 지역 외 전 세계 모든 지역이 지원됩니다.
- **name: string**: VPC 이름입니다.
- **shape: string**: VPC의 모양입니다. 허용되는 값은 `dynamic` 또는 `rectangular`입니다.
- **padding: number**: VPC의 초기 패딩입니다. 기본값은 `1.5`입니다.
- **nodes: array**: VPC 내 구성 요소입니다. 자세한 정보는 [`nodes`에 허용되는 값 ](#accepted-values-for-nodes)을 참고하세요.
- **peeringConnections: array**: 이 VPC에 피어링 연결을 하는 VPC 입니다. 자세한 정보는 [`peeringConnections`에 허용되는 값](#accepted-values-for-peeringconnections)을 참고하세요.
- **color: object**: 구성 요소에 적용할 색
  - **isometric: string**: 3D 보기에서 구성 요소에 적용할 색. 16진수 색이어야 합니다.
  - **2d: string**: 2D 보기에서 구성 요소에 적용할 색. 16진수 색이어야 합니다.
- **locked: boolean**: `true`로 설정하면 애플리케이션을 사용해 변경한 항목은 잠금 해제될 때까지 비활성화 상태입니다.

### `nodes`에 허용된 값

`nodes` 키는 VPC 내 구성 요소에 대한 고유한 식별자 어레이를 허용합니다.

다음 AWS 구성 요소는 VPC 내에 추가할 수 있습니다.

```
asg, ec2, lambda, efs, fsx, elb, subnet, sg, rds, docdb, elasticache, redshift, es, natgateway, internetgateway, vpngateway, customergateway
```

AWS 구성 요소와 함께 다음 일반적인 구성 요소도 VPC 내에 추가할 수 있습니다.

```
block, isotext, icon, image, area
```

### `peeringConnections`에 허용되는 값

`peeringConnections` 키는 JSON 객체로 대표되는 각 피어링 연결을 통해 어레이를 허용합니다.

```
{
  "peeringConnections": [
    {
      "id": "1a367d09-beea-4a87-9740-1831c1809d00",
      "name": "Example Peering",
      "accepterVpc": "f38bc8ae-98c1-45c5-b7ad-54e9bb9ee166",
      "hidden": false
    }
  ]
}
```

- **id: string**: 이 피어링 연결에 대한 `uuid` 형식의 고유한 식별자입니다.
- **name: string**: 이 연결의 이름입니다. 표시되는 방법을 보려면 페이지 상단에서 구성 요소 이미지를 참조하세요.
- **accepterVpc: string**: 허용자 VPC의 `id`입니다.
- **hidden: boolean**: `true`인 경우 피어링 연결이 다이어그램에 표시되지 않습니다. 기본값은 `false`입니다.

[1]: https://developers.cloudcraft.co/