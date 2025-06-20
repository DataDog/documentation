---
title: 로드 밸런서 구성 요소
---
## 개요

로드 밸런서 구성 요소를 사용해 Amazon Web Services 아키텍처의 애플리케이션과 네트워크 로드 밸런서를 표현할 수 있습니다.

{{< img src="cloudcraft/components-aws/load-balancer/component-load-balancer-diagram.png" alt="로드 밸런서' AWS 구성 요소를 보여주는 등축도법 Cloudcraft 다이어그램 스크린샷" responsive="true" style="width:60%;">}}

## 도구 모음

도구 모음을 사용해 구성 요소를 구성하고 사용자 지정할 수 있습니다. 다음 옵션을 사용할 수 있습니다.

- **색상r**: 구성 요소와 강조 항목에 적용할 사전 정의된 색상을 선택하거나 16진수 값을 입력할 수 있습니다. 구성 요소에서는 2D와 3D 모두에 같은 색상을 사용하거나 각각에 다른 색상을 적용할 수 있습니다.
- **Type**:  탄력적 로드 밸런서 유형, 클래식, 애플리케이션, 또는 네트워크를 선택합니다.
- **Data processed**: 시간별로 처리되는 총 데이터량을 기가바이트로 표현합니다. `classic` 유형에서만 사용할 수 있습니다.
- **LCUs**: 로드 밸런서 용량 단위 수입니다. 애플리케이션 및 네트워크 로드 밸런서에서만 사용할 수 있습니다.

## API

[Cloudcraft API][1]를 사용해 프로그래밍을 통해 액세스하여 JSON 개체의 아키텍처 다이어그램을 렌더링할 수 있습니다.

### 스키마

다음은 Load Balancer 구성 요소의 JSON 예시입니다.

```json
{
  "type": "elb",
  "id": "811ac6d8-bd6b-4d19-8504-d68d6c8381a9",
  "region": "us-east-2",
  "mapPos": [0,10],
  "elbType": "application",
  "dataGb": 10,
  "lcu": 1,
  "color": {
    "2d": "#693cc5",
    "isometric": "#ececed"
  },
  "accentColor": {
    "2d": "#ffffff",
    "isometric": "#4286c5"
  },
  "link": "blueprint://e2fd00f6-84d9-4a40-acf0-ff2ea01ae59c",
  "locked": true
}
```

- **type: elb**: 구성 요소의 유형입니다.
- **id: string**: `uuid` 형식의 구성 요소 고유 식별자
- **region: string**: 로드 밸런서가 배포되는 AWS 리전입니다. `cn-` 리전을 제외한 모든 글로벌 리전에서 지원됩니다.
- **mapPos: [number, number]**: 청사진에 있는 구성 요소의 포지션. X와 Y 좌표 쌍을 이용해 표현됩니다.
- **elbType: string**: 탄력적 로드 밸런서 유형입니다. 허용되는 값은 `classic`, `application`, 또는 `network`입니다.
- **dataGb: number**: 로드 밸런서에서 처리되는 데이터의 총량을 기가바이트로 표현합니다. `classic` 유형의 로드 밸런서에만 적용됩니다.
- **lcu: number**: 로드 밸런서 용량 단위 수입니다. 애플리케이션이나 네트워크 유형의 로드 밸런서에만 적용됩니다.
- **color: object**: 구성 요소에 적용할 색
  - **isometric: string**: 3D 보기에서 구성 요소에 적용할 색. 16진수 색이어야 합니다.
  - **2d: string**: 2D 보기에서 구성 요소에 적용할 색. 16진수 색이어야 합니다.
- **accentColor: obect**: 블록 상단의 구성 요소 로고 디스플레이에 적용할 강조 색입니다.
  - **isometric: string**: 3D 보기의 구성 요소 강조색. 16진수 색이어야 합니다.
  - **2d: string**: 2D 보기의 구성 요소 강조색. 16진수 색이어야 합니다.
- **link: uri**: `blueprint://ID` 형식을 사용해 구성 요소를 다른 다이어그램으로 연결하거나 `https://LINK` 형식을 사용해 외부 웹사이트로 연결합니다.
- **locked: boolean**: `true`로 설정하면 애플리케이션을 사용해 변경한 항목은 잠금 해제될 때까지 비활성화 상태입니다.

[1]: https://developers.cloudcraft.co/