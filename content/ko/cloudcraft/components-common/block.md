---
title: Block 구성 요소
---
## 개요

Block은 사용 가능한 구성 요소 중 가장 기본적인 구성 요소입니다. 이미지 및 아이콘과 함께 아직 제공되지 않는 클라우드 구성 요소를 표현하는 데 사용할 수 있습니다.

{{< img src="cloudcraft/components-common/block/component-block.png" alt="Cloudcraft의 블록 구성 요소의 3D 표현 스크린샷" responsive="true" style="width:60%;">}}

## 도구 모음

도구 모음을 사용해 구성 요소를 구성하고 사용자 지정할 수 있습니다. 다음 옵션을 사용할 수 있습니다.

- **Color**: 미리 정의된 색상을 선택하거나 원하는 색상의 16진수 값을 입력하세요. 2D 및 3D 보기에 같은 색상을 사용하거나 각각 다른 색상을 선택할 수 있습니다.
- **Width**: 블록 구성 요소의 너비를 선택합니다.
- **Height**: 블록 구성 요소의 높이를 선택합니다.
- **Depth**: 블록 구성 요소의 깊이를 선택합니다.

## API

[Cloudcraft API][1]를 사용하여 아키텍처 다이어그램에 프로그래밍 방식으로 액세스하고 JSON 객체로 렌더링할 수 있습니다. 다음은 Block 구성 요소의 JSON 객체 예시입니다.

```json
{
  "type": "block",
  "id": "76cddb57-6368-4e8b-805f-1306f558812b",
  "mapPos": [3, 9],
  "width": 2,
  "height": 1,
  "depth": 2,
  "color": {
    "isometric": "#ececed",
    "2d": "#4286c5"
  },
  "locked": true,
  "link": "blueprint://34b7a049-e92b-4146-b937-7eee9ae788b5"
}
```

- **type: block**: 구성 요소의 유형.
- **id: string**: `uuid` 형식의 구성 요소 고유 식별자
- **mapPos: [number, number]**: 청사진에 있는 구성 요소의 포지션. X와 Y 좌표 쌍을 이용해 표현됩니다.
- **width: number**: 블록 구성 요소의 너비. 기본값은 2.
- **height: number**: 블록 구성 요소의 높이. 기본값은 1.
- **depth: number**: 블록 구성 요소의 깊이. 기본값은 2.
- **color: object**: 구성 요소에 적용할 색
  - **isometric: string**: 3D 보기 구성 요소의 색을 채웁니다. 16진수 색이어야 합니다.
  - **2d: string**: 2D 보기 구성 요소의 색을 채웁니다. 16진수 색이어야 합니다.
- **link: uri**: `blueprint://ID` 형식으로 구성 요소를 다른 다이어그램으로 연결하거나 `https://LINK` 형식으로 외부 웹사이트로 연결합니다.
- **locked: boolean**: True로 설정하면 애플리케이션을 사용해 변경한 항목은 잠금 해제될 때까지 비활성화 상태입니다.

블록 구성 요소는 [VPC][2], [보안 그룹][3] 및 [서브넷][4]에 추가될 수 있습니다.

[1]: https://developers.cloudcraft.co/
[2]: https://help.cloudcraft.co/article/118-component-vpc
[3]: https://help.cloudcraft.co/article/119-component-security-group
[4]: /ko/cloudcraft/components-aws/subnet/