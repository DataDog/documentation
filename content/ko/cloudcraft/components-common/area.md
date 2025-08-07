---
title: Area 구성 요소
---
## 개요

Area 구성 요소는 대규모 다이어그램을 디자인 및 구성하는 데 가장 적합합니다. Text  Label 구성 요소와 함께 서브넷 및 IP 주소를 시각적으로 나타내고 퍼블릭 및 프라이빗 클라우드 아키텍처를 구분하거나 기타 다른 용도로 사용할 수 있습니다.

{{< img src="cloudcraft/components-common/area/component-area.png" alt="Cloudcraft의 이미지 구성 요소의 3D 표현 스크린샷" responsive="true" style="width:60%;">}}

## 도구 모음

도구 모음을 사용해 구성 요소를 구성하고 사용자 지정할 수 있습니다. 다음 옵션을 사용할 수 있습니다.

- **Fill color**: Area 구성 요소의 중앙을 채울 사전 정의된 색을 선택하거나 색상의 16진수 값을 입력합니다. 2D와 3D 보기 모두에 같은 색을 적용하거나 각각 다른 색을 적용할 수 있습니다.
- **Raise**: Area 구성 요소를 다른 영역 위에 위치시킵니다.
- **Lower**: Area 구성 요소를 다른 영역 아래에 위치시킵니다.
- **Edge color**: Area 구성 요소의 가장자리를 채울 사전 정의된 색을 선택하거나 색상의 16진수 값을 입력합니다. 2D와 3D 보기 모두에 같은 색을 적용하거나 각각 다른 색을 적용할 수 있습니다.
- **Add shadow**: 가장자리에 그림자를 추가하거나 삭제하여 대비감을 높입니다.

## API

[Cloudcraft API][1]로 프로그래밍 방식으로 액세스하고 아키텍처 다이어그램을 JSON 객체로 렌더링합니다. 다음은 Area 구성 요소의 JSON 객체 예시입니다.

```json
{
  "type": "area",
  "id": "09659366-c3b1-479f-9b4d-37c5753e1674",
  "mapPos": [2, 9],
  "points": [
    [0, 0],
    [4, 0],
    [4, 3],
    [0, 3]
  ],
  "shadow": true,
  "color": {
    "2d": "#e6e7e8",
    "isometric": "#e6e7e8"
  },
  "borderColor": {
    "2d": "#ffffff",
    "isometric": "#ffffff"
  },
  "link": "blueprint://6f6b20d9-1332-4141-bb74-0e3af3f61801",
  "locked": true
}
```

- **type: area**: 구성 요소의 유형입니다.
- **id: string**: `uuid` 형식의 구성 요소 고유 식별자입니다.
- **mapPos: [number, number]**: 청사진에 있는 구성 요소의 포지션. X와 Y 좌표 쌍을 이용해 표현됩니다.
- **shadow: boolean**: True로 설정되어 있으면 영역의 가장자리에 그림자를 추가해 대비감을 올립니다. 기본값은 False입니다.
- **points: [number, number]**: 영역의 가장자리를 생성하는 데 사용하는 포인트의 위치입니다.
- **color: object**: 구성 요소에 적용할 색입니다.
  - **isometric: string**: 3D 보기 구성 요소의 색을 채웁니다. 16진수 색이어야 합니다.
  - **2d: string**: 2D 보기 구성 요소의 색을 채웁니다. 16진수 색이어야 합니다.
- **borderColor: object**: 영역의 가장자리 색상입니다.
  - **isometric: string**: 3D 보기의 영역 가장자리 색상입니다. 16진수 색이어야 합니다.
  - **2d: string**: 2D 보기의 영역 가장자리 색상입니다. 16진수 색이어야 합니다.
- **link: uri**: `blueprint://ID` 형식으로 구성 요소를 다른 다이어그램으로 연결하거나 `https://LINK` 형식으로 외부 웹사이트로 연결합니다.
- **locked: boolean**: True로 설정하면 애플리케이션을 사용해 변경한 항목은 잠금 해제될 때까지 비활성화 상태입니다.

[1]: https://developers.cloudcraft.co/