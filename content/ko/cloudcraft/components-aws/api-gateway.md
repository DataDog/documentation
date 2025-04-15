---
title: API Gateway 컴포넌트
---
## 개요

API Gateway 컴포넌트를 사용해 Amazon Web Services 아키텍처의 RESTful, HTTP, WebSocket API를 표시합니다.

{{< img src="cloudcraft/components-aws/api-gateway/component-api-gateway-diagram.png" alt="API 게이트웨이' AWS 컴포넌트를 보여주는 등축도법 Cloudcraft 다이어그램 스크린샷." responsive="true" style="width:60%;">}}

## 도구 모음

도구 모음을 사용해 구성 요소를 구성하고 사용자 지정할 수 있습니다. 다음 옵션을 사용할 수 있습니다.

- **Color**: 구성 요소와 강조 항목에 적용할 사전 정의된 색상을 선택하거나 16진수 값을 입력할 수 있습니다. 구성 요소에서는 2D와 3D 모두에 같은 색상을 사용하거나 각각에 다른 색상을 적용할 수 있습니다.
- **Rotate item**: 컴포넌트를 회전하여 방향을 바꿉니다.
- **API Type**: 게이트웨이 API 유형을 선택합니다.
- **M req./month**: 월별 전송 요청 수를 백만 단위로 입력합니다.
- **M min./month**: 분당 전송되는 메시지 수를 백만 단위로 입력합니다. `websocket` 유형의 API에만 사용할 수 있습니다.
- **Cache Memory (GB)**. API 응답을 캐싱하는 데 사용되는 메모리 양을 기가바이트 단위로 선택합니다. `rest` 유형의 API에만 사용할 수 있습니다.

## API

[Cloudcraft API][1]를 사용해 프로그래밍을 통해 액세스하여 JSON 개체의 아키텍처 다이어그램을 렌더링할 수 있습니다.

### 스키마

다음은 API 게이트웨이의 JSON 오브젝트 예시입니다.

```json
{
  "type": "apigateway",
  "id": "5635395f-9441-494d-bcc7-5dd4f5c93ce1",
  "region": "us-east-1",
  "mapPos": [0,10],
  "direction": "down",
  "apiType": "rest",
  "apiCalls": "10",
  "connectionMinutes": 0,
  "cache": 1.6,
  "color": {
    "isometric": "#3c3c3c",
    "2d": "#693cc5"
  },
  "accentColor": {
    "isometric": "#f4b934",
    "2d": "#ffffff"
  },
  "link": "https://aws.amazon.com/api-gateway/",
  "locked": true
}
```

- **type: apigateway**: 컴포넌트 유형입니다.
- **id: string**: `uuid` 형식의 컴포넌트 고유 식별자입니다.
- **region: string**: API 게이트웨이가 배포되는 AWS 리전입니다. `cn-` 리전을 제외한 모든 글로벌 리전을 지원합니다.
- **mapPos: [number, number]**: 청사진에 있는 컴포넌트의 포지션. X와 Y 좌표 쌍을 이용해 표현됩니다.
- **direction: string**: 컴포넌트의 회전 또는 방향을 지정합니다. `down` 또는 `right` 값을 허용합니다. 기본값은 `down`입니다.
- **apiType: string**: 게이트웨이에 사용되는 API 유형입니다. `rest`, `http`, `websocket` 값을 허용합니다.
- **apiCalls: number**: 월별 API 호출 수(백만 단위)입니다. 기본값은 `5`입니다.
- **connectionMinutes: number**: 분당 전송되는 메시지 수(백만 단위)입니다. `apiType`이 `websocket`으로 설정된 경우에만 적용됩니다. 기본값은 `0`입니다.
- **cache: number**: API 응답을 캐싱하는 데 사용되는 메모리 양(기가바이트)입니다. `apiType`이 `rest`로 설정된 경우에만 적용됩니다. 자세한 내용은 [캐시 허용값](#accepted-values-for-cache)을 참조하세요.
- **color: object**: 구성 요소에 적용할 색
  - **isometric: string**: 3D 보기에서 구성 요소에 적용할 색. 16진수 색이어야 합니다.
  - **2d: string**: 2D 보기에서 구성 요소에 적용할 색. 16진수 색이어야 합니다.
- **accentColor: object**: 블록에 있는 구성 요소 로고의 강조색
  - **isometric: string**: 3D 보기의 구성 요소 강조색. 16진수 색이어야 합니다.
  - **2d: string**: 2D 보기의 구성 요소 강조색. 16진수 색이어야 합니다.
- **link: uri**: `blueprint://ID` 형식을 사용해 구성 요소를 다른 다이어그램으로 연결하거나 `https://LINK` 형식을 사용해 외부 웹사이트로 연결합니다.
- **locked: boolean**: `true`로 설정하면 애플리케이션을 사용해 변경한 항목은 잠금 해제될 때까지 비활성화 상태입니다.

## 캐시 허용값

`cache` 키의 기본값은 `1.6`이고 다음 값을 허용합니다.

```
0, 0.5, 1.6, 6.1, 13.5, 28.4, 58.2, 118.0, 237.0
```

[1]: https://developers.cloudcraft.co/