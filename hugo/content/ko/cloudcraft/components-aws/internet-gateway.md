---
title: Internet Gateway 구성 요소
---
## 개요

Internet Gateway 구성 요소를 사용하여 Amazon Web Services 아키텍처에서 인터넷으로의 게이트웨이를 나타냅니다.

{{< img src="cloudcraft/components-aws/internet-gateway/component-internet-gateway-diagram.png" alt="'Internet Gateway' AWS 구성 요소를 보여주는 아이소메트릭 Cloudcraft 다이어그램 스크린샷." responsive="true" style="width:60%;">}}

## 도구 모음

도구 모음을 사용해 구성 요소를 구성하고 사용자 지정할 수 있습니다. 다음 옵션을 사용할 수 있습니다.

- **Color**: 구성 요소와 강조 항목에 적용할 사전 정의된 색상을 선택하거나 16진수 값을 입력할 수 있습니다. 구성 요소에서는 2D와 3D 모두에 같은 색상을 사용하거나 각각에 다른 색상을 적용할 수 있습니다.
- **Rotate**: 구성 요소를 회전하고 방향을 바꿉니다.

## API

[Cloudcraft API][1]를 사용해 프로그래밍을 통해 액세스하여 JSON 개체의 아키텍처 다이어그램을 렌더링할 수 있습니다.

### 스키마

다음은  Internet Gateway 구성 요소의 JSON 예입니다.

```json
{
  "type": "internetgateway",
  "id": "aacf299e-1336-46a3-98d7-3ef75eef8116",
  "region": "us-east-1",
  "mapPos": [-4.25,9],
  "color": {
    "isometric": "#4286c5",
    "2d": "#4286c5"
  },
  "accentColor": {
    "isometric": "#ffffff",
    "2d": "#ffffff"
  },
  "direction": "down",
  "link": "blueprint://b07827f7-2ead-4911-bb78-ddc02dc07b24",
  "locked": true
}
```

- **type: internetgateway**: 구성 요소 유형
- **id: string**: `uuid` 형식의 구성 요소 고유 식별자
- **region: string**: 게이트웨이가 배포된 AWS 지역. `cn-` 지역을 제외한 모든 글로벌 지역이 지원됨.
- **mapPos: [number, number]**: 청사진에 있는 구성 요소의 포지션. X와 Y 좌표 쌍을 이용해 표현됩니다.
- **color: object**: 구성 요소에 적용할 색
  - **isometric: string**: 3D 보기에서 구성 요소에 적용할 색. 16진수 색이어야 합니다.
  - **2d: string**: 2D 보기에서 구성 요소에 적용할 색. 16진수 색이어야 합니다.
- **accentColor: object**: 블록에 있는 구성 요소 로고의 강조색
  - **isometric: string**: 3D 보기의 구성 요소 강조색. 16진수 색이어야 합니다.
  - **2d: string**: 2D 보기의 구성 요소 강조색. 16진수 색이어야 합니다.
- **direction: string**: 구성 요소의 회전 또는 방향을 지정합니다. `down`, `right` 값을 허용합니다. 기본값은 `down`입니다.
- **link: uri**: `blueprint://ID` 형식을 사용하여 구성 요소를 다른 다이어그램에 연결하거나 `https://LINK` 형식을 사용하여 외부 웹사이트에 연결합니다.
- **locked: boolean**: `true`로 설정하면 애플리케이션을 사용해 변경한 항목은 잠금 해제될 때까지 비활성화 상태입니다.

Internet Gateway 구성 요소는 [VPC][2]에만 추가할 수 있습니다.

[1]: https://developers.cloudcraft.co/
[2]: /ko/cloudcraft/components-aws/vpc/