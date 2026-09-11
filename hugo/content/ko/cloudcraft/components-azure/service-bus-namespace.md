---
title: Service Bus Namespace 구성 요소
---

## 개요

Service Bus Namespace 구성 요소를 사용하여 Azure 환경에서 클라우드 메시징을 서비스 통합으로 표시하고 시각화할 수 있습니다.

{{< img src="cloudcraft/components-azure/service-bus-namespace/component-service-bus-namespace-diagram.png" alt="상호연결된 Azure 구성 요소를 표시하는 등축도법 Cloudcraft 다이어그램의 스크린샷" responsive="true" style="width:60%;">}}

## 도구 모음

도구 모음을 사용해 구성 요소를 구성하고 사용자 지정할 수 있습니다. 다음 옵션을 사용할 수 있습니다.

- **Color**: 3D 보기 구성 요소의 강조 및 채우기 색상을 선택합니다.
- **Name**: 네임스페이스의 이름을 입력합니다.
- **Tier**: 서비스 버스 네임스페이스에 대한 서비스 티어를 선택합니다.
- **Messaging units**:  네임스페이스에서 사용할 수 있는 메시징 단위 수를 선택합니다. **Premium** 티어에서만 사용할 수 있습니다.

## API

[Cloudcraft API][1]를 사용하여 프로그래밍 방식으로 아키텍처 다이어그램에 액세스하고 JSON 객체로 렌더링할 수 있습니다. 다음은 Service Bus Namespace 구성 요소의 JSON 객체 예시입니다.

### 스키마

```json
{
    "type": "azuresbnamespace",
    "id": "5a5b710a-2a36-421b-9ac9-f94f545f8c46",
    "region": "northcentralus",
    "mapPos": [3,-1],
    "mapSize": [5,5],
    "nodes": [
        "3c9f4d24-3653-4da5-a6a5-e375448aff4e",
        "7f836b25-2a69-4be4-8b35-c0f67480eafd",
        "6bf0b7c5-20c4-46ac-8afb-48ea207c3961",
        "afb6e41c-32c6-4e6f-b11d-6606957e4588"
    ],
    "name": "Namespace",
    "tier": "Basic",
    "messagingUnits": 1,
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

- **type: string**: 구성 요소의 유형입니다. 이 구성 요소의 경우 `azuresbnamespace` 값의 문자열이어야 합니다.
- **id: string, uuid**: 구성 요소의 고유 식별자입니다. API에서는 내부적으로 UUID v4를 사용하나 다른 고유 식별자도 사용할 수 있습니다/
- **resourceId: string**: Azure 구성 요소 내 전역 고유 식별자
- **region: string**: 구성 요소의 Azure 리전. API가 중국을 제외한 전역 리전을 지원합니다.
- **mapPos: array**: 청사진에 있는 구성 요소 포지션. API에서는 포지션을 표현하기 위해 고유 X와 Y 좌표 쌍을 사용합니다.
- **mapSize: array**: 청사진에서 구성 요소의 크기입니다. API는 고유한 X 및 Y 좌표 쌍을 사용하여 크기를 표현합니다.
- **nodes: array**:  네임스페이스에서 실행되는 서비스입니다. [서비스 버스 대기열][2] 및 [서비스 버스 주제][3] 구성 요소에 대한 고유한 식별자 어레이를 허용합니다.
- **name: string**: 네임스페이스 이름입니다. 기본값은 `Namespace`입니다.
- **tier: string**: 네임스페이스에 대한 서비스 계층은 `Basic`, `Standard`, `Premium`의 세 가지 값 중 하나를 허용합니다. 기본값은 `Basic`입니다.
- **messagingUnits: number**: 네임스페이스에 사용할 수 있는 메시징 단위 수입니다. `1`에서 `16`까지의 숫자를 허용합니다. 기본값은 `1`입니다.
- **color: object**: 구성 요소에 적용할 색
  - **isometric: string**: 구성 요소 바디의 3D 보기에 적용할 16진수 색. 기본값은 `#CEE0F5`입니다.
  - **2d: string**: 구성 요소의 2D 보기에 적용할 16진수 색. 기본값은 `null`입니다.
- **accentColor: object**: 구성 요소 로고의 강조 색
  - **isometric: string**: 구성 요소 로고의 3D 보기에 적용할 16진수 색. 기본값은 `#0078D4`입니다.
  - **2d: string**: 구성 요소 로고의 2D 보기에 적용할 16진수 색. 기본값은 `null`입니다.
- **link: string, uri**: 구성 요소를 다른 다이어그램 또는 외부 웹사이트로 연결할 URL. `blueprint://` 또는 `https://` 형식 중 하나를 사용할 수 있습니다.
- **locked: boolean**: 웹 인터페이스를 통해 포지션 변경을 허용할지 여부 결정. 기본값은 `false`입니다.

[1]: https://developers.cloudcraft.co/
[2]: https://help.cloudcraft.co/article/189-component-service-bus-queue
[3]: https://help.cloudcraft.co/article/190-component-service-bus-topic