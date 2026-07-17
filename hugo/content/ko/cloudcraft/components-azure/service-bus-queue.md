---
title: Service Bus Queue 구성 요소
---

## 개요

Service Bus Queue 구성 요소를 사용하여 Azure 환경에서 클라우드 메시징을 서비스 통합으로 나타내고 시각화합니다.

{{< img src="cloudcraft/components-azure/service-bus-queue/component-service-bus-queue-diagram.png" alt="상호 연결된 Azure 구성 요소를 보여주는 아이소메트릭 Cloudcraft 다이어그램의 스크린샷." responsive="true" style="width:60%;">}}

## 도구 모음

도구 모음을 사용해 구성 요소를 구성하고 사용자 지정할 수 있습니다. 다음 옵션을 사용할 수 있습니다.

- **Color**: 3D 보기 구성 요소의 강조 및 채우기 색상을 선택합니다.
- **Tier**: 서비스 버스 대기열의 서비스 티어를 선택합니다.
- **작업(M/월)**: 월별 작업 수를 백만 단위로 입력합니다. 프리미엄 티어는 사용할 수 없습니다.
- **Brokered connections**: 대기열의 브로커 연결 수를 입력합니다. Standard 서비스 티어에서만 사용 가능합니다.
- **Hybrid connections**: 대기열의 하이브리드 연결 수를 입력합니다. Standard 서비스 티어에서만 사용 가능합니다.
- **데이터 전송(GB)**: 매월 전송되는 총 데이터 볼륨을 기가바이트 단위로 입력합니다. 서비스 티어 스탠다드에서만 사용할 수 있습니다.
- **Relay hours**: 대기열의 릴레이 시간을 입력합니다. Standard 서비스 티어에서만 사용 가능합니다.
- **릴레이 메시지(K/mo)**: 토픽의 월별 릴레이 메시지 수를 입력합니다. 스탠다드 티어에서만 사용할 수 있습니다.

## API

[Cloudcraft API][1]를 사용하여 아키텍처 다이어그램에 프로그래밍 방식으로 액세스하고 JSON 객체로 렌더링할 수 있습니다. 다음은 서비스 버스 대기열 구성 요소의 JSON 객체 예시입니다.

### 스키마

```json
{
    "type": "azuresbqueue",
    "id": "6bf0b7c5-20c4-46ac-8afb-48ea207c3961",
    "region": "northcentralus",
    "mapPos": [4,2],
    "tier": "Standard",
    "operationsPerMonth": 0,
    "brokeredConnections": 0,
    "hybridConnections": 0,
    "dataTransferGb": 0,
    "relayHours": 0,
    "relayMessages": 0,
    "color": {
        "isometric": null,
        "2d": null
    },
    "accentColor": {
        "isometric": null,
        "2d": null
    },
    "link": "https://azure.microsoft.com/products/service-bus",
    "locked": true
}
```

- **type: string**: 구성 요소 유형. 이 구성 요소의 값은 `azuresbqueue`(문자열).
- **id: string, uuid**: 구성 요소의 고유 식별자입니다. API에서는 내부적으로 UUID v4를 사용하나 다른 고유 식별자도 사용할 수 있습니다.
- **resourceId: string**: Azure 구성 요소 내 전역 고유 식별자
- **region: string**: 구성 요소의 Azure 리전. API가 중국을 제외한 전역 리전을 지원합니다.
- **mapPos: array**: 청사진에 있는 구성 요소 포지션. API에서는 포지션을 표현하기 위해 고유 X와 Y 좌표 쌍을 사용합니다.
- **tier: string**: 대기열의 서비스 티어로 `Basic`, `Standard`, `Premium`으로 구성됩니다. 기본값은 `Standard`.
- **operationsPerMonth: number**: 월별 작업 수(백만 단위)입니다. 기본값은 `0`입니다.
- **brokeredConnections: number**: 대기열의 브로커 연결 수. 기본값은 `0`.
- **hybridConnections: number**: 대기열의 하이브리드 연결 수. 기본값은 `0`.
- **dataTransferGb: number**: 매월 전송되는 총 데이터 볼륨(기가바이트)입니다. 기본값은 `0`입니다.
- **relayHours: number**: 대기열에 대한 릴레이 시간. 기본값은 `0`.
- **relayMessages: number**: 월별 릴레이 메시지 수(천 단위)입니다. 기본값은 `0`입니다.
- **color: object**: 구성 요소에 적용할 색
  - **isometric: string**: 구성 요소 바디의 3D 보기에 적용할 16진수 색. 기본값은 `#CEE0F5`입니다.
  - **2d: string**: 구성 요소의 2D 보기에 적용할 16진수 색. 기본값은 `null`입니다.
- **accentColor: object**: 구성 요소 로고의 강조 색
  - **isometric: string**: 구성 요소 로고의 3D 보기에 적용할 16진수 색. 기본값은 `#0078D4`입니다.
  - **2d: string**: 구성 요소 로고의 2D 보기에 적용할 16진수 색. 기본값은 `null`입니다.
- **link: string, uri**: 구성 요소를 다른 다이어그램 또는 외부 웹사이트로 연결할 URL. `blueprint://` 또는 `https://` 형식 중 하나를 사용할 수 있습니다.
- **locked: boolean**: 웹 인터페이스를 통해 포지션 변경을 허용할지 여부 결정. 기본값은 `false`입니다.

[1]: https://developers.cloudcraft.co/