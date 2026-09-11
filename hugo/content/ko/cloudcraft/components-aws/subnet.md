---
title: 서브넷 구성 요소
---

## 개요

서브넷 구성 요소를 사용해 Amazon Web Services 아키텍처에서 서브넷 표시하기

{{< img src="cloudcraft/components-aws/subnet/component-subnet.png" alt="Cloudcraft의 서브넷 AWS 구성 요소의 3D 표현 스크린샷" responsive="true" style="width:60%;">}}


## 도구 모음

도구 모음을 사용해 구성 요소를 구성하고 사용자 지정할 수 있습니다. 다음 옵션을 사용할 수 있습니다.

- **Color**: 구성 요소와 강조 항목에 적용할 사전 정의된 색상을 선택하거나 16진수 값을 입력할 수 있습니다. 구성 요소에서는 2D와 3D 모두에 같은 색상을 사용하거나 각각에 다른 색상을 적용할 수 있습니다.
- **Name**: 서브넷 이름을 지정합니다.
- **Shape**: 서브넷 모양을 선택합니다.
- **Padding**: 서브넷 내부 공간의 양을 늘리거나 줄일 수 있습니다.

## API

[Cloudcraft API][1]를 사용해 프로그래밍을 통해 액세스하여 JSON 개체의 아키텍처 다이어그램을 렌더링할 수 있습니다.

### 스키마

다음은 서브넷 구성 요소의 JSON 개체 예시입니다.

```json
{
  "type": "subnet",
  "id": "838f6f30-9cdd-4c6b-9eb2-dd71b9c64047",
  "region": "us-east-1",
  "name": "example-cloudcraft-sb",
  "shape": "dynamic",
  "padding": 1.5,
  "nodes": [
    "e99bad32-82f6-49a7-b145-11963a3d7775"
  ],
  "color": {
    "isometric": "#000000",
    "2d": "#000000"
  },
  "link": "blueprint://90fb6b0b-f66e-4196-8d16-d68921448fdb",
  "locked": true
}
```

- **type: subnet**: 구성 요소 유형입니다.
- **id: string**: `uuid` 형식의 구성 요소 고유 식별자
- **region: string**: 서브넷이 배포되는 AWS 리전. `cn-` 리전을 제외한 모든 리전을 지원합니다.
- **name: string**: 서브넷 이름
- **shape: string**: 서브넷 모양.  `dynamic` 또는 `rectangular` 값을 사용할 수 있습니다.
- **padding: number**: 서브넷 내부 패딩. 기본값은 `1.5`입니다.
- **nodes: array**: 서브넷 내 구성 요소. 자세한 내용은 [`nodes`의 수용 값](#accepted-values-for-nodes)을 참고하세요.
- **color: object**: 구성 요소에 적용할 색
  - **isometric: string**: 3D 보기에서 구성 요소에 적용할 색. 16진수 색이어야 합니다.
  - **2d: string**: 2D 보기에서 구성 요소에 적용할 색. 16진수 색이어야 합니다.
- **link: uri**: `blueprint://ID` 형식을 사용해 구성 요소를 다른 다이어그램으로 연결하거나 `https://LINK` 형식을 사용해 외부 웹사이트로 연결합니다.
- **locked: boolean**: `true`로 설정하면 애플리케이션을 사용해 변경한 항목은 잠금 해제될 때까지 비활성화 상태입니다.

### `nodes`에 허용된 값

`nodes` 키는 서브넷 내 구성 요소의 고유 식별자 배열을 허용합니다.

서브넷 내에 다음 AWS 구성 요소를 추가할 수 있습니다.

```
asg, ec2, lambda, efs, fsx, elb, rds, docdb, elasticache, redshift, es, natgateway
```

AWS 구성 요소에 더해 서브넷 내에 추가할 수 있는 구성 요소에는 다음이 있습니다.

```
block, isotext, icon, image, area
```

[1]: https://developers.cloudcraft.co/