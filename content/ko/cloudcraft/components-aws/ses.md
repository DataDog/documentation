---
title: SES 구성 요소
---
## 개요

SES 구성 요소를 사용하여 Amazon Web Services 아키텍처에서 트랜잭션 및 마케팅 이메일 서비스를 표시합니다.

{{< img src="cloudcraft/components-aws/ses/component-ses-diagram.png" alt="'SES' AWS 구성 요소를 보여주는 아이소메트릭 Cloudcraft 다이어그램 스크린샷." responsive="true" style="width:60%;">}}

## 도구 모음

도구 모음을 사용해 구성 요소를 구성하고 사용자 지정할 수 있습니다. 다음 옵션을 사용할 수 있습니다.

- **Color**: 구성 요소와 강조 항목에 적용할 사전 정의된 색상을 선택하거나 16진수 값을 입력할 수 있습니다. 구성 요소에서는 2D와 3D 모두에 같은 색상을 사용하거나 각각에 다른 색상을 적용할 수 있습니다.
- **Emails/month(K)**: 매달 전송되는 이메일 수를 천 단위로 입력합니다.

## API

[Cloudcraft API][1]를 사용해 프로그래밍을 통해 액세스하여 JSON 개체의 아키텍처 다이어그램을 렌더링할 수 있습니다.

### 스키마

다음은 SES 구성 요소의 JSON 예입니다.

```json
{
  "type": "ses",
  "id": "11f3e4bc-f827-48b6-9d9c-73e99ca3e289",
  "region": "us-west-2",
  "mapPos": [0,10],
  "emailsOut": 400,
  "color": {
    "isometric": "#0a1538",
    "2d": "#0a1538"
  },
  "accentColor": {
    "isometric": "#2457f2",
    "2d": "#2457f2"
  },
  "link": "https://aws.amazon.com/ses/",
  "locked": true
}
```

- **type: ses**: 구성 요소 유형.
- **id: string**: `uuid` 형식의 구성 요소 고유 식별자
- **region: string**: SES가 배포된 AWS 리전. `cn-` 지역을 제외한 모든 글로벌 지역이 지원됩니다.
- **mapPos: [number, number]**: 청사진에 있는 구성 요소의 포지션. X와 Y 좌표 쌍을 이용해 표현됩니다.
- **emailsOut: number**: 매달 전송되는 이메일 수(천 단위). 기본값은 `10`.
- **color: object**: 구성 요소에 적용할 색
  - **isometric: string**: 3D 보기에서 구성 요소에 적용할 색. 16진수 색이어야 합니다.
  - **2d: string**: 2D 보기에서 구성 요소에 적용할 색. 16진수 색이어야 합니다.
- **accentColor: object**: 블록에 있는 구성 요소 로고의 강조색
  - **isometric: string**: 3D 보기의 구성 요소 강조색. 16진수 색이어야 합니다.
  - **2d: string**: 2D 보기의 구성 요소 강조색. 16진수 색이어야 합니다.
- **link: uri**: `blueprint://ID` 형식을 사용해 구성 요소를 다른 다이어그램으로 연결하거나 `https://LINK` 형식을 사용해 외부 웹사이트로 연결합니다.
- **locked: boolean**: `true`로 설정하면 어플리케이션을 통한 컴포넌트 변경은 잠금 해제 시까지 비활성화됩니다.

[1]: https://developers.cloudcraft.co/