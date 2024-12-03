---
title: Keyspaces 구성 요소
---
## 개요

Keyspaces 구성 요소를 사용해 Amazon Web Service 아키텍처의 Apache Cassandra 호환 데이터베이스 서비스를 가시화합니다.

{{< img src="cloudcraft/components-aws/keyspaces/component-keyspaces-diagram.png" alt="상호 연결된 AWS 구성 요소를 보여주는 등축도법 Cloudcraft 다이어그램 스크린샷" responsive="true" style="width:60%;">}}

## 도구 모음

도구 모음을 사용해 구성 요소를 구성하고 사용자 지정할 수 있습니다. 다음 옵션을 사용할 수 있습니다.

- **Color**: 구성 요소와 강조 항목에 적용할 색을 선택을 선택합니다. 2D와 3D 보기에 같은 색을 적용하거나 각각 다른 색을 선택할 수 있습ㄴ디ㅏ.
- **Capacity mode**: Keyspaces 데이터베이스의 용량 모드를 선택합니다.
- **Writes (millions)**: 데이터베이스에 대한 총 쓰기 볼륨을 백만 단위로 입력합니다.
- **Reads (millions)**: 데이터베이스에 대한 총 읽기 볼륨을 백만 단위로 입력합니다.
- **Quorum %**: `LOCAL_QUORUM` 일관성을 사용하는 읽기 퍼센티지를 입력합니다.
- **Dataset (GB)**: 데이터베이스의 총 데이터 볼륨을 기가바이트 단위로 입력합니다.
- **TTL Deletes (millions)*: TTL 프로세스가 트리거한 `DELETE` 작업의 총 볼륨을 백만 단위로 입력합니다.
- **Point-in-time recovery**: 데이터베이스에 특정 시점 복구를 사용할지 여부를 결정합니다.

## API

[Cloudcraft API][1]를 사용해 프로그래밍을 통해 액세스하여 JSON 개체의 아키텍처 다이어그램을 렌더링할 수 있습니다.

### 스키마

다음은 Keyspaces 구성 요소의 JSON 예시입니다.

```json
{
    "type": "keyspaces",
    "id": "bd6da627-e07c-497e-bdbc-bec11655112a",
    "region": "us-east-1",
    "mapPos": [6,6],
    "capacityMode": "on-demand",
    "writeUnits": 5,
    "readUnits": 5,
    "quorumPercentage": 0,
    "datasetGb": 10,
    "ttlDeletes": 0,
    "pointInTimeRecoveryEnabled": false,
    "color": {
        "isometric": "#ECECED",
        "2d": "#3B48CC"
    },
    "accentColor": {
        "isometric": "#4286C5",
        "2d": "#FFFFFF"
    },
    "link": "https://aws.amazon.com/keyspaces/",
    "locked": true
}
```

- **type: string**: 구성 요소 유형. 이 구성 요소의 `keyspaces` 값 문자열이어야 합니다.
- **id: string, uuid**: 구성 요소의 고유 식별자입니다. API에서는 내부적으로 UUID v4를 사용하나 다른 고유 식별자도 사용할 수 있습니다/
- **arn: string**: AWS 내 전역 고유 식별자([Amazon Resource Names][2])
- **region: string**: 구성 요소의 AWS 리전. [AWS China를 제외][3]한 글로벌 리전을 모두 지원합니다.
- **mapPos: array**: 청사진에 있는 구성 요소 포지션. X와 Y 좌표 쌍을 이용해 표현합니다.
- **capacityMode: string**: Keyspaces 데이터베이스의 용량 모드입니다. `on-demand` 또는 `provisioned` 값 중 하나를 사용할 수 있습니다. 기본값은 `on-demand`입니다.
- **writeUnits: number**: 데이터베이스에 대한 총 쓰기 볼륨(백만)입니다. 기본값은 `5`입니다.
- **readUnits: number**: 데이터베이스에 대한 총 읽기 볼륨(백만)입니다. 기본값은 `5`입니다.
- **quorumPercentage: number**: `LOCAL_QUORUM` 일관성을 사용하는 읽기 퍼센테이지입니다. 기본값은 `0`입니다.
- **datasetGb: number**: 데이터베이스의 총 데이터 볼륨(기가바이트)입니다. 기본값은 `10`입니다.
- **ttlDeletes: number**: TTL 프로세스가 트리거한 `DELETE` 작업의 총 볼륨(백만)입니다. 기본값은 `0`입니다.
- **pointInTimeRecoveryEnabled: boolean**: 데이터베이스에 특정 시점 복구를 사용할지 여부를 결정합니다. 기본값은 `false`입니다.
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