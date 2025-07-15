---
title: Timestream 구성 요소
---
## 개요

Timestrea 구성 요소를 사용해 Amazon Web Services 아키텍처에서 서버리스 시계열 데이터베이스를 시각화하여 표현할 수 있습니다.

{{< img src="cloudcraft/components-aws/timestream/component-timestream-diagram.png" alt="상호 연결된 AWS 구성 요소를 보여주는 등축도법 Cloudcraft 다이어그램 스크린샷" responsive="true" style="width:60%;">}}

## 도구 모음

도구 모음을 사용해 구성 요소를 구성하고 사용자 지정할 수 있습니다. 다음 옵션을 사용할 수 있습니다.

- **Color**: 구성 요소 바디를 채울 색상과 심볼을 강조할 색상을 선택합니다. 2D와 3D 보기에 같은 색을 적용하거나 각각 다른 색을 선택할 수 있습니다.
- **Written Data (GB)**: 쓴 데이터 총량을 기가바이트 단위로 입력합니다.
- **Queried Data (GB)**: 쿼리한 데이터 총량을 기가바이트 단위로 입력합니다.
- **Memory Storage/hr (GB)**: 시계열 데이터베이스의 시간당 메모리 용량 총량을 기가바이트 단위로 입력합니다.
- **Magnetic Storage/mo (GB)**: 시계열 데이터베이스에 프로비저닝된 월별 마그네틱 스토리지 총량을 기가바이트 단위로 입력합니다.

## API

[Cloudcraft API][1]를 사용해 프로그래밍을 통해 액세스하여 JSON 개체의 아키텍처 다이어그램을 렌더링할 수 있습니다.

### 스키마

다음은 시계열 구성 요소의 JSON 개체 예시입니다.

```json
{
    "type": "timestream",
    "id": "1d939183-0078-440a-bcf6-6418c9c2e419",
    "region": "us-east-1",
    "mapPos": [6, 6],
    "writeDataGb": 1,
    "scanDataGb": 1,
    "memoryDataGbHr": 10,
    "magneticDataGbMo": 10,
    "color": {
        "isometric": "#ECECED",
        "2d": "#3B48CC"
    },
    "accentColor": {
        "isometric": "#4286C5",
        "2d": "#FFFFFF"
    },
    "link": "https://aws.amazon.com/timestream/",
    "locked": true
}
```

- **type: string**: 구성 요소 유형입니다. 이 구성 요소의 `timestream` 값이어야 합니다.
- **id: string, uuid**: 구성 요소의 고유 식별자입니다. API에서는 내부적으로 UUID v4를 사용하나 다른 고유 식별자도 사용할 수 있습니다/
- **arn: string**: AWS 내 전역 고유 식별자([Amazon Resource Names][2])
- **region: string**: 구성 요소의 AWS 리전. [AWS China를 제외][3]한 글로벌 리전을 모두 지원합니다.
- **mapPos: array**: 청사진에 있는 구성 요소 포지션. X와 Y 좌표 쌍을 이용해 표현합니다.
- **writeDataGb: number**: 기가바이트 단위의 쓴 데이터 총량입니다. 기본값은 `100`입니다.
- **scanDataGb: number**: 기가바이트 단위의 쿼리한 데이터의 총량입니다. 기본값은 `100`입니다.
- **memoryDataGbHr: number**: 기가바이트 단위의 시간당 사용할 수 있는 메모리 스토리지 총량입니다. 기본값은 `1`입니다.
- **magneticDataGbMo: number**: 기가바이트 단위의 데이터베이스에서 사용할 수 있는 월별 마그네틱 스토리지 총량입니다. 기본값은 `1000`입니다.
- **color: object**: 구성 요소에 적용할 색
  - **isometric: string**: 구성 요소의 3D 보기에 적용할 16진수 색. 기본값은 `#ECECED`입니다.
  - **2d: string**: 구성 요소 바디의 2D 보기에 적용할 16진수 색. 기본값은 `##3B48CC`입니다.
- **accentColor: object**: 구성 요소 로고의 강조 색
  - **isometric: string**: 3D 보기에서 구성 요소 로고에 적용할 16진수 색. 기본값은 `#4286C5`입니다.
  - **2d: string**: 2D 보기에서 구성 요소의 로고에 적용할 16진수 색. 기본값은 `#FFFFFF`입니다.
- **link: string, uri**: 구성 요소를 다른 다이어그램 또는 외부 웹사이트로 연결할 URL. `blueprint://` 또는 `https://` 형식 중 하나를 사용할 수 있습니다.
- **locked: boolean**: 웹 인터페이스를 통해 포지션 변경을 허용할지 여부 결정. 기본값은 `false`입니다.

[1]: https://developers.cloudcraft.co/
[2]: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
[3]: /ko/cloudcraft/faq/scan-error-aws-china-region/