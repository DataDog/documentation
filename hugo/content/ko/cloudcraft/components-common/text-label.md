---
title: 텍스트 레이블 구성 요소
---

## 개요

텍스트 레이블 구성 요소를 사용해 구성 요소, 아이콘, 다이어그램 영역에 레이블을 지정하여 가독성과 시각 효과를 높일 수 있습니다.

{{< img src="cloudcraft/components-common/text-label/component-text-label.png" alt="Cloudcraft 텍스트 레이블 구성 요소의 3D 표현 스크린샷" responsive="true" style="width:60%;">}}

## 도구 모음

도구 모음을 사용해 구성 요소를 구성하고 사용자 지정할 수 있습니다. 다음 옵션을 사용할 수 있습니다.

- **Color**: 사전 정의된 색을 선택하거나 색의 16 진수 값을 입력할 수 있습니다. 2D와 3D 보기 모두에 같은 색을 적용하거나 각각 다른 색을 적용할 수 있습니다.
- **Toggle 3D/2D projection**: 3D 또는 2D 보기의 레이블을 표시합니다.
- **Toggle flat/standing projection**: 레이블을 가로 또는 세로로 표시합니다. 2D 프로젝션이 토글되어 있으면 사용할 수 없습니다.
- **Size**: 텍스트 레이블 크기입니다. 최댓값은 112입니다.
- **Rotate item**: 텍스트 레이블 구성 요소를 회전하여 방향을 바굽니다.
- **Outline**: 텍스트 레이블에 윤곽선을 추가하여 색 대비 정도를 높입니다.

## API

[Cloudcraft API][1]를 사용해 프로그래밍을 통해 액세스하여 아키텍처 다이어그램을 JSON 개체로 렌더링할 수 있습니다.  다음은 텍스트 레이블 구성 요소의 JSON 개체 예시입니다.

```json
{
  "type": "isotext",
  "id": "8f2a0f5f-c373-42dd-b4df-f06f455f5f94",
  "mapPos": [3.5, 9],
  "text": "Hello world!",
  "textSize": 56,
  "isometric": true,
  "standing": false,
  "direction": "down",
  "outline": true,
  "color": {
    "2d": "#000000",
    "isometric": "#000000"
  },
  "link": "https://blog.cloudcraft.co/welcome-to-cloudcraft/",
  "locked": true
}
```

- **type: isotext**: 구성 요소 유형입니다.
- **id: string**: `uuid` 형식의 구성 요소 고유 식별자
- **mapPos: [number, number]**: 청사진에 있는 구성 요소의 포지션. X와 Y 좌표 쌍을 이용해 표현됩니다.
- **text: string**: 레이블에 사용된 텍스트입니다.
- **textSize: number**: 텍스트 레이블 크기입니다. 기본값은 25입니다.
- **isometric: boolean**: True로 설정되어 있으면 3D 프로젝션을 사용해 레이블이 표시되고, False로 설정되어 있으면 레이블이 3D 프로젝션으로 표시됩니다. 기본값은 True입니다.
- **standing: boolean**: True로 설정되어 있으면 레이블이 가로가 아니라 세로로 표시됩니다. 기본값은 False입니다.
- **direction: string**: 레이블의 회전 또는 방향을 지정합니다. 허용되는 값은 `down, up, right, left`이며, 기본값은 `down`입니다.
- **outline: boolean**: True로 설정되어 있으면 텍스트 윤곽선을 추가해 색 대비를 정도를 올립니다. 기본값은 False입니다.
- **color: object**: 구성 요소에 적용할 색
  - **isometric: string**: 3D 보기 구성 요소의 색을 채웁니다. 16진수 색이어야 합니다.
  - **2d: string**: 2D 보기 구성 요소의 색을 채웁니다. 16진수 색이어야 합니다.
- **link: uri**: `blueprint://ID` 형식으로 구성 요소를 다른 다이어그램으로 연결하거나 `https://LINK` 형식으로 외부 웹사이트로 연결합니다.
- **locked: boolean**: True로 설정하면 애플리케이션을 사용해 변경한 항목은 잠금 해제될 때까지 비활성화 상태입니다.

[1]: https://developers.cloudcraft.co/