---
title: Glacier 구성 요소
---
## 개요

Glacier 구성 요소를 사용해 Amazon Web Service 아키텍처의 장기 스토리지 등급 가시화하기

{{< img src="cloudcraft/components-aws/glacier/component-glacier-diagram.png" alt="상호 연결된 AWS 구성 요소를 보여주는 등축도법 Cloudcraft 다이어그램 스크린샷" responsive="true" style="width:60%;">}}

## 도구 모음

도구 모음을 사용해 구성 요소를 구성하고 사용자 지정할 수 있습니다. 다음 옵션을 사용할 수 있습니다.

- **Color**: 구성 요소와 강조 항목에 적용할 색을 선택을 선택합니다. 2D와 3D 보기에 같은 색을 적용하거나 각각 다른 색을 선택할 수 있습니다.
- **스토리지(GB)**: 내 저장소에서 사용 가능한 총 저장소 볼륨을 기가바이트로 입력합니다.
- **Retrieval Type**: 내 저장소의 검색 유형을 선택합니다.
- **Retrieval Req. / mo (K)**: 천 단위로 한 달의 검색 요청 수를 입력합니다.
- **Retrieval Data (GB)**: 기가바이트로 데이터 검색 볼륨을 입력합니다.
- **Upload Req. / mo (K)**: 천 단위로 한 달의 검색 업로드 요청 수를 입력합니다.

## API

[Cloudcraft API][1]를 사용해 프로그래밍을 통해 액세스하여 JSON 개체의 아키텍처 다이어그램을 렌더링할 수 있습니다.

### 스키마

다음은 Glacier 구성 요소의 JSON 예시입니다.

```json
{
    "type": "glaciervault",
    "id": "a3dd25ed-5508-43f3-9041-8bd480906514",
    "region": "us-east-1",
    "mapPos": [4,6],
    "storageDataGb": 10,
    "retrievalType": "standard",
    "retrievalDataGb": 0,
    "retrievalRequests": 0,
    "uploadRequests": 0,
    "color": {
        "isometric": "#ECECED",
        "2d": "#3F8624"
    },
    "accentColor": {
        "isometric": "#4286C5",
        "2d": "#FFFFFF"
    },
    "link": "https://aws.amazon.com/glacier/",
    "locked": true
}
```

- **type: string**: 구성 요소 유형. 이 구성 요소의 `glaciervault` 값 문자열이어야 합니다.
- **id: string, uuid**: 구성 요소의 고유 식별자입니다. API에서는 내부적으로 UUID v4를 사용하나 다른 고유 식별자도 사용할 수 있습니다.
- **arn: string**: AWS 내 전역 고유 식별자([Amazon Resource Names][2])
- **region: string**: 구성 요소의 AWS 리전. [AWS China를 제외][6]한 글로벌 리전을 모두 지원합니다.
- **mapPos: array**: 청사진에 있는 구성 요소 포지션. API에서는 포지션을 표현하기 위해 고유 X와 Y 좌표 쌍을 사용합니다.
- **storageDataGb: number**: Glacier 저장소에 사용할 수 있는 총 스토리지 볼륨 기가바이트. 기본값은 `10`입니다.
- **retrievalType: string**: Glacier 저장소 검색 유형. `expedited`, `standard`, `bulk` 중 하나를 선택할 수 있습니다. 기본값은 `standard`입니다.
- **retrievalDataGb: number**: 검색한 데이터 볼륨 기가바이트. 기본값은 `0`입니다.
- **retrievalRequests: number**: 천 단위로 표현한 한 달의 검색 요청 수. 기본값은 `0`입니다.
- **uploadRequests: number**: 천 단위로 표현한 한 달의 업로드 요청 수. 기본값은 `0`입니다.
- **color: object**: 구성 요소에 적용할 색
  - **isometric: string**: 구성 요소의 3D 보기에 적용할 16진수 색. 기본값은 `#ECECED`입니다.
  - **2d: string**: 구성 요소의 2D 보기에 적용할 16진수 색. 기본값은 `#3F8624`입니다.
- **accentColor: object**: 구성 요소 로고의 강조 색
  - **isometric: string**: 3D 보기에서 구성 요소 로고에 적용할 16진수 색. 기본값은 `#4286C5`입니다.
  - **2d: string**: 2D 보기에서 구성 요소의 로고에 적용할 16진수 색. 기본값은 `#FFFFFF`입니다.
- **link: string, uri**: 구성 요소를 다른 다이어그램 또는 외부 웹사이트로 연결할 URL. `blueprint://` 또는 `https://` 형식 중 하나를 사용할 수 있습니다.
- **locked: boolean**: 웹 인터페이스를 통해 포지션 변경을 허용할지 여부 결정. 기본값은 `false`입니다.

[1]: https://developers.cloudcraft.co/
[2]: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
[3]: /ko/cloudcraft/faq/scan-error-aws-china-region/