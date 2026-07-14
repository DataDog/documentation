---
title: Service Bus 토픽 구성 요소
---

## 개요

Service Bus 토픽 요소를 사용하여 Azure 환경의 서비스 통합으로 클라우드 메시지를 표현 및 가시화할 수 있습니다.

{{< img src="cloudcraft/components-azure/service-bus-topic/component-service-bus-topic-diagram.png" alt="상호 연결된 Azure 구성 요소를 보여주는 등축도법 Cloudcraft 다이어그램 스크린샷" responsive="true" style="width:60%;">}}

## 도구 모음

도구 모음을 사용해 구성 요소를 구성하고 사용자 지정할 수 있습니다. 다음 옵션을 사용할 수 있습니다.

- **Color**: 3D 보기 구성 요소의 강조 및 채우기 색상을 선택합니다.
- **Tier**: service bus 토픽의 서비스 수준을 선택합니다.
- **Operations (M/month)**: 월별 작업 수를 백만 단위로 입력합니다. 서비스 티어 프리미엄에는 사용할 수 없습니다.
- **Brokered connections**: 토픽의 브로커 연결 수를 입력합니다. 서비스 티어 스탠다드에서만 사용할 수 있습니다.
- **Hybrid connections**: 토픽의 하이브리드 연결 수를 입력합니다. 서비스 티어 스탠다드에서만 사용할 수 있습니다.
- **Data transfer (GB)**: 매월 전송되는 총 데이터 볼륨을 기가바이트 단위로 입력합니다. 서비스 티어 스탠다드에서만 사용할 수 있습니다.
- **Relay hours**: 토픽의 릴레이 시간 수를 입력합니다. 서비스 티어 스탠다드에서만 사용할 수 있습니다.
- **Relay messages (K/mo)**: 토픽의 월별 릴레이 메시지 수를 천 단위로 입력합니다. 서비스 티어 스탠다드에서만 사용할 수 있습니다.

## API

[Cloudcraft API][1]를 사용해 프로그래밍을 통해 액세스하여 아키텍처 다이어그램을 JSON 개체로 렌더링할 수 있습니다.  다음은 Service bus 토픽 구성 요소의 JSON 개체 예시입니다.

### 스키마

```json
{
    "type": "azuresbtopic",
    "id": "3c9f4d24-3653-4da5-a6a5-e375448aff4e",
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

- **type: string**: 구성 요소 유형. 이 구성 요소의 `azuresbtopic` 값 문자열이어야 합니다.
- **id: string, uuid**: 구성 요소의 고유 식별자입니다. API에서는 내부적으로 UUID v4를 사용하나 다른 고유 식별자도 사용할 수 있습니다/
- **resourceId: string**: Azure 구성 요소 내 전역 고유 식별자
- **region: string**: 구성 요소의 Azure 리전. API가 중국을 제외한 전역 리전을 지원합니다.
- **mapPos: array**: 청사진에 있는 구성 요소 포지션. API에서는 포지션을 표현하기 위해 고유 X와 Y 좌표 쌍을 사용합니다.
- **tier: string**: 토픽의 서비스 티어입니다. `Standard` 또는 `Premium` 두 값 중 하나를 허용합니다. 기본값은 `Standard`입니다.
- **operationsPerMonth: number**: 월별 작업 수(백만 단위)입니다. 기본값은 `0`입니다.
- **brokeredConnections: number**: 토픽에 대한 브로커 연결 수입니다. 기본값은 `0`입니다.
- **hybridConnections: number**: 토픽에 대한 하이브리드 연결 수입니다. 기본값은 `0`입니다.
- **dataTransferGb: number**: 매월 전송되는 총 데이터 볼륨(기가바이트)입니다. 기본값은 `0`입니다.
- **relayHours: number**: 토픽의 릴레이 시간 수입니다. 기본값은 `0`입니다.
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