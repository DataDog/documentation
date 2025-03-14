---
title: 웹 앱 구성 요소
---

## 개요

웹 앱 구성 요소를 사용하여 Azure 환경의 웹 애플리케이션을 표현 및 가시화할 수 있습니다.

{{< img src="cloudcraft/components-azure/web-app/component-web-app-diagram.png" alt="상호 연결된 Azure 웹 앱 구성 요소를 보여주는 등축도법 Cloudcraft 다이어그램 스크린샷" responsive="true" style="width:60%;">}}

## 도구 모음

도구 모음을 사용해 구성 요소를 구성하고 사용자 지정할 수 있습니다. 다음 옵션을 사용할 수 있습니다.

- **Color**: 3D 보기 구성 요소의 강조 및 채우기 색상을 선택합니다.
- **Platform**: 웹 애플리케이션 플랫폼을 선택합니다. Windows와 Linux 중에서 선택할 수 있습니다.
- **Tier**: 웹 애플리케이션의 서비스 수준을 선택합니다.
- **Instance**: 웹 애플리케이션의 인스턴스를 선택합니다.

## API

[Cloudcraft API][1]를 사용해 프로그래밍을 통해 액세스하여 아키텍처 다이어그램을 JSON 개체로 렌더링할 수 있습니다.  다음은 웹 앱 구성 요소의 JSON 개체 예시입니다.

### 스키마

```json
{
  "type": "azurewebapp",
  "id": "274993bf-646d-4046-a20a-063a243e22b7",
  "resourceId": "/subscriptions/4f02467b-945a-4d06-8789-66b52d1c92a3/resourceGroups/CLOUDCRAFT/providers/Microsoft.Web/sites/docsite#componentType=azurewebapp",
  "region": "eastus",
  "mapPos": [0, 8],
  "platform": "Windows",
  "tier": "Basic",
  "instance": "B1",
  "color": {
      "isometric": "#ececed",
      "2d": null
  },
  "accentColor": {
      "isometric": "#4286c5",
      "2d": null
  },
  "link": "https://azure.microsoft.com/products/app-service/web/",
  "locked": true
}
```

- **type: string**: 구성 요소 유형. 이 구성 요소의 `azurewebapp` 값 문자열이어야 합니다.
- **id: string, uuid**: 구성 요소의 고유 식별자입니다. API에서는 내부적으로 UUID v4를 사용하나 다른 고유 식별자도 사용할 수 있습니다/
- **resourceId: string**: Azure 구성 요소 내 전역 고유 식별자
- **region: string**: 구성 요소의 Azure 리전. API가 중국을 제외한 전역 리전을 지원합니다.
- **mapPos: array**: 청사진에 있는 구성 요소 포지션. API에서는 포지션을 표현하기 위해 고유 X와 Y 좌표 쌍을 사용합니다.
- **platform: string**: 웹 애플리케이션 플랫폼. `Windows` 또는 `Linux` 중 하나를 허용합니다. 기본값은 `Linux`입니다.
- **tier: string**: 웹 애플리케이션 서비스 수준 티어입니다. [자세한 정보는 다음을 참고하세요](#accepted-values-for-tier). 기본값은 `Basic`입니다.
- **instance: string**: 웹 애플리케이션의 인스턴스 유형입니다. [자세한 내용은 다음을 참고하세요](#accepted-values-for-instance). 기본값은 `B1`입니다.
- **color: object**: 구성 요소에 적용할 색
  - **isometric: string**: 구성 요소의 3D 보기에 적용할 16진수 색. 기본값은 `#ececed`입니다.
  - **2d: string**: 구성 요소의 2D 보기에 적용할 16진수 색. 기본값은 `null`입니다.
- **accentColor: object**: 구성 요소 로고의 강조 색
  - **isometric: string**: 3D 보기에서 구성 요소 로고에 적용할 16진수 색. 기본값은 `#4286c5`입니다.
  - **2d: string**: 구성 요소 로고의 2D 보기에 적용할 16진수 색. 기본값은 `null`입니다.
- **link: string, uri**: 구성 요소를 다른 다이어그램 또는 외부 웹사이트로 연결할 URL. `blueprint://` 또는 `https://` 형식 중 하나를 사용할 수 있습니다.
- **locked: boolean**: 웹 인터페이스를 통해 포지션 변경을 허용할지 여부 결정. 기본값은 `false`입니다.

## 티어에 허용된 값

`tier` 키는 다음 값을 허용합니다.

```
Basic, Free, Isolated, "Isolated v2", "Premium v2", "Premium v3", Shared, Standard
```

## 인스턴스에서 허용된 값

`instance` 키에서는 다음 값을 허용합니다.

```
B1, B2, B3, F1, I1, I2, I3, "I1 v2", "I2 v2", "I3 v2", "I4 v2", "I5 v2",
"I6 v2", "P1 v2", "P2 v2", "P3 v2", P0v3, "P1 v3", P1mv3, "P2 v3",
P2mv3, "P3 v3", P3mv3, P4mv3, P5mv3, D1, S1, S2, S3
```

## 티어 및 인스턴스에 유효한 조합

`tier`와 `instance` 키는 함께 작동하여 애플리케이션에 할당된 리소스를 정의합니다. 그러나 유효한 값의 조합을 제공해야 작동합니다.

유효한 조합을 보려면 다음 표를 참고하세요.

티어        | 인스턴스
----------- | ---------
기본       | B1, B2, B3
무료        | F1
Isolated    | I1, I2, I3
Isolated v2 | I1 v2, I2 v2, I3 v2, I4 v2, I5 v2, I6 v2
Premium v2  | P1 v2, P2 v2, P3 v2
Premium v3  | P0v3, P1 v3, P1mv3, P2 v3, P2mv3, P3 v3, P3mv3, P4mv3, P5mv3
Shared      | D1
표준    | S1, S2, S3

[1]: https://developers.cloudcraft.co/