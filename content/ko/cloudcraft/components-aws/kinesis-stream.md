---
title: Kinesis Stream 구성 요소
---
## 개요

Kinesis Stream 구성 요소를 사용하여 Amazon Web Services 아키텍처의 실시간 데이터 스트림을 표현합니다.

{{< img src="cloudcraft/components-aws/kinesis-stream/component-kinesis-stream-diagram.png" alt="'Kinesis Stream' AWS 구성 요소를 보여주는 아이소메트릭 Cloudcraft 다이어그램 스크린샷." responsive="true" style="width:60%;">}}

## 도구 모음

도구 모음을 사용해 구성 요소를 구성하고 사용자 지정할 수 있습니다. 다음 옵션을 사용할 수 있습니다.

- **Color**: 구성 요소와 강조 항목에 적용할 사전 정의된 색상을 선택하거나 16진수 값을 입력할 수 있습니다. 구성 요소에서는 2D와 3D 모두에 같은 색상을 사용하거나 각각에 다른 색상을 적용할 수 있습니다.
- **Rotate item**: Kinesis 구성 요소를 회전하고 방향을 변경합니다.
- **Shards**: Kinesis 데이터 스트림의 샤드 수를 입력합니다.
- **PUT units (M)**: Kinesis 데이터 스트림의 `PUT` 페이로드 단위 수를 백만 단위로 입력합니다.
- **Extended data retention**: Kinesis 데이터 스트림의 저장 기간을 24시간 이상으로 확장합니다.

## API

[Cloudcraft API][1]를 사용해 프로그래밍을 통해 액세스하여 JSON 개체의 아키텍처 다이어그램을 렌더링할 수 있습니다.

### 스키마

다음은 Kinesis Stream 구성 요소의 JSON 예입니다.

```json
{
  "type": "kinesisstream",
  "id": "cc3c417b-3b09-4dff-bc22-52398b86adb6",
  "region": "us-west-2",
  "mapPos": [0,10],
  "direction": "down",
  "shards": 1,
  "putUnits": 500,
  "extendedRetention": true,
  "color": {
    "isometric": "#ececed",
    "2d": "#693cc5"
  },
  "accentColor": {
    "isometric": "#4286c5",
    "2d": "#ffffff"
  },
  "link": "https://aws.amazon.com/kinesis/data-streams/",
  "locked": true
}
```

- **type: kinesisstream**: 구성 요소 유형
- **id: string**: `uuid` 형식의 구성 요소 고유 식별자
- **region: string**: Kinesis 스트림 인스턴스가 배포된 AWS 지역. `cn-` 지역을 제외한 모든 글로벌 지역이 지원됩니다.
- **mapPos: [number, number]**: 청사진에 있는 구성 요소의 포지션. X와 Y 좌표 쌍을 이용해 표현됩니다.
- **direction: string**: 구성 요소의 회전 또는 방향. 허용값은 `down` 및 `right`. 기본값은 `down`입니다.
- **shards: number**: Kinesis 데이터 스트림의 샤드 수. 기본값은 `1`입니다.
- **putUnits: number**: Kinesis 데이터 스트림의 `PUT` 페이로드 단위 수(백만 단위). 기본값은 `500`입니다.
- **extendedRetention: boolean**. `true`이면, Kinesis 데이터 스트림을 24시간 이상 저장함. 기본값은 `false`입니다.
- **color: object**: 구성 요소에 적용할 색
  - **isometric: string**: 3D 보기에서 구성 요소에 적용할 색. 16진수 색이어야 합니다.
  - **2d: string**: 2D 보기에서 구성 요소에 적용할 색. 16진수 색이어야 합니다.
- **accentColor: object**: 블록에 있는 구성 요소 로고의 강조색
  - **isometric: string**: 3D 보기의 구성 요소 강조색. 16진수 색이어야 합니다.
  - **2d: string**: 2D 보기의 구성 요소 강조색. 16진수 색이어야 합니다.
- **link: uri**: `blueprint://ID` 형식을 사용해 구성 요소를 다른 다이어그램으로 연결하거나 `https://LINK` 형식을 사용해 외부 웹사이트로 연결합니다.
- **locked: boolean**: `true`로 설정하면 애플리케이션을 사용해 변경한 항목은 잠금 해제될 때까지 비활성화 상태입니다.

[1]: https://developers.cloudcraft.co/