---
title: Availability Zone 구성 요소
---
## 개요

Availability Zone 구성 요소를 사용하여 Amazon Web Services 아키텍처의 가용성 영역을 나타냅니다.

{{< img src="cloudcraft/components-aws/availability-zone/component-availability-zone-diagram.png" alt="AWS 구성 요소인 'Availability zone'을 보여주는 아이소메트릭 Cloudcraft 다이어그램의 스크린샷." responsive="true" style="width:60%;">}}

## 도구 모음

도구 모음을 사용해 구성 요소를 구성하고 사용자 지정할 수 있습니다. 다음 옵션을 사용할 수 있습니다.

- **Color**: 미리 정의된 색상을 선택하거나 구성 요소의 색상 값을 16진수로 입력합니다. 2D 및 3D 보기에 같은 색상을 사용하거나 각각 다른 색상을 사용할 수 있습니다.
- **Raise**: 가용성 영역 구성 요소를 다른 가용성 영역 위로 올립니다.
- **Lower**: 가용성 영역 구성 요소를 다른 가용성 영역 아래로 내립니다.

## API

[Cloudcraft API][1]를 사용해 프로그래밍을 통해 액세스하여 JSON 개체의 아키텍처 다이어그램을 렌더링할 수 있습니다.

### 스키마

다음은 Availability Zone 구성 요소의 JSON 객체 예입니다.

```json
{
  "type": "zone",
  "id": "a46cfaf2-ce78-4d44-9a41-a55fc7cd4ceb",
  "region": "us-east-2",
  "mapPos": [-6.75, 10.25],
  "mapSize": [2.5, 2.5],
  "color": {
    "2d": "#000000",
    "isometric": "#000000"
  },
  "link": "blueprint://34b7a049-e92b-4146-b937-7eee9ae788b5",
  "locked": true
}
```

- **type: zone**: 구성 요소 유형
- **id: string**: `uuid` 형식의 구성 요소 고유 식별자
- **region: string**: 가용성 영역이 속한 AWS 리전. `cn-` 리전을 제외한 모든 글로벌 리전이 지원됩니다.
- **mapPos: [number, number]**: 청사진에 있는 구성 요소의 포지션. X와 Y 좌표 쌍을 이용해 표현됩니다.
- **mapSize: [number, number]**. 청사진에서 가용성 영역의 크기
- **color: object**. 가용성 영역에 채울 색상
  - **isometric: string**. 3D 보기에서 구성 요소에 채울 색상. 16진수 색상이어야 합니다.
  - **2d: string**: 2D 보기에서 컴포넌트에 적용할 색상. 16진수 색상이어야 합니다.
- **link: uri**. `blueprint://ID` 형식을 사용하여 구성 요소를 다른 다이어그램에 연결하거나`https://LINK` 형식을 사용하여 외부 웹사이트에 연결합니다.
- **locked: boolean**: `true`로 설정하면 애플리케이션을 통한 구성 요소 변경은 잠금 해제 시까지 비활성화됩니다.

[1]: https://developers.cloudcraft.co/