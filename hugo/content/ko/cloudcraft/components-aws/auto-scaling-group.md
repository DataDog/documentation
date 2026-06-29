---
title: Auto Scaling Group 구성 요소
---
## 개요

Auto Scaling Group 구성 요소를 사용하여 Amazon Web Service 아키텍처에서 Auto Scaling 그룹을 표시할 수 있습니다.

{{< img src="cloudcraft/components-aws/auto-scaling-group/component-auto-scaling-group-diagram.png" alt="'오토 스케일링 그룹' AWS 구성 요소를 보여주는 등축도법 Cloudcraft 다이어그램 스크린샷" responsive="true" style="width:60%;">}}

## 도구 모음

도구 모음을 사용해 구성 요소를 구성하고 사용자 지정할 수 있습니다. 다음 옵션을 사용할 수 있습니다.

- **Color**: 구성 요소에 적용할 사전 정의된 색상을 선택하거나 16진수 값을 입력할 수 있습니다. 구성 요소에서는 2D와 3D 모두에 같은 색상을 사용하거나 각각에 다른 색상을 적용할 수 있습니다.
- **Layout**. 오토 스케일링 그룹의 레이아웃을 선택합니다. "even"을 선택하면 사용할 수 있는 공간에 구성원이 균일하게 표시되며, "manual"을 선택하면 수동으로 구성원의 위치를 지정합니다.

## API

[Cloudcraft API][1]를 사용해 프로그래밍을 통해 액세스하여 아키텍처 다이어그램을 JSON 개체로 렌더링할 수 있습니다.

### 스키마

다음은 Auto Scaling Group 구성 요소의 JSON 개체 예시입니다.

```json
{
  "type": "asg",
  "id": "0998cf01-d22e-4324-83a9-b06ffbd93188",
  "region": "us-east-2",
  "mapPos": [-2.75, 9],
  "mapSize": [3.25, 1],
  "layout": "even",
  "nodes": [
    "056b4f94-fe18-43de-9e55-325d31813a80",
    "d037dd26-252e-4ba0-95f7-e6656cd00413"
  ],
  "color": {
    "2d": "#f5b720",
    "isometric": "#f5b720"
  },
  "link": "blueprint://bbb22829-4abb-4fba-8a25-1896545eb9d1",
  "locked": true
}
```

- **type: asg**: 구성 요소 유형입니다.
- **id: string**: `uuid` 형식의 구성 요소 고유 식별자
- **region: string**: 오토 스케일링 그룹이 배포되는 AWS 리전입니다. `cn-` 리전을 제외한 모든 글로벌 리전에서 지원됩니다.
- **mapPos: [number, number]**: 청사진에 있는 구성 요소의 포지션. X와 Y 좌표 쌍을 이용해 표현됩니다.
- **mapSize: [number, number]**: 청사진의 오토 스케일링 그룹 규모입니다.
- **layout: string**: 오토 스케일링 그룹의 레이아웃입니다. 허용되는 값은 `even` 또는 `manual`입니다.
- **nodes: array**: 오토 스케일링 그룹 내의 EC2 인스턴스입니다. Cloudcraft에서 발행한 EC2 인스턴스의 고유 식별자 어레이로 구성되어 있어야 합니다.
- **color: object**: 구성 요소에 적용할 색
  - **isometric: string**: 3D 보기에서 구성 요소에 적용할 색. 16진수 색이어야 합니다.
  - **2d: string**: 2D 보기에서 구성 요소에 적용할 색. 16진수 색이어야 합니다.
- **link: uri**: `blueprint://ID` 형식을 사용해 구성 요소를 다른 다이어그램으로 연결하거나 `https://LINK` 형식을 사용해 외부 웹사이트로 연결합니다.
- **locked: boolean**: `true`로 설정하면 애플리케이션을 사용해 변경한 항목은 잠금 해제될 때까지 비활성화 상태입니다.

[1]: https://developers.cloudcraft.co/