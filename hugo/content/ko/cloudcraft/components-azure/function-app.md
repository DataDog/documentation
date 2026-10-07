---
title: 함수 앱 구성 요소
---

## 개요

함수 앱 구성 요소를 사용하여 Azure 환경에서 Azure Functions 그룹을 표현 및 가시화할 수 있습니다.

{{< img src="cloudcraft/components-azure/function-app/component-function-app-diagram.png" alt="상호 연결된 Azure 컴포넌트를 보여주는 등축도법 Cloudcraft 다이어그램 스크린샷" responsive="true" style="width:60%;">}}

## 도구 모음

도구 모음을 사용해 구성 요소를 구성하고 사용자 지정할 수 있습니다. 다음 옵션을 사용할 수 있습니다.

- **Color**: 3D 보기 구성 요소의 강조 및 채우기 색상을 선택합니다.
- **Tier**: 함수 앱의 호스팅 플랜을 선택합니다.
- **vCPU**: 함수에서 사용하는 평균 컴퓨팅 단위 수를 입력합니다.
- **Memory (GB)**: 함수에서 사용되는 평균 메모리 양을 기가바이트 단위로 입력합니다.
- **Duration (ms)**: 밀리초 단위로 평균 함수 기간을 입력합니다.
- **Executions (MM/m)**: 월별 함수 호출 수를 백만 단위로 입력합니다.

## API

[Cloudcraft API][1]를 사용해 프로그래밍을 통해 액세스하여 아키텍처 다이어그램을 JSON 개체로 렌더링할 수 있습니다.  다음은 함수 앱 구성 요소의 JSON 개체 예시입니다.

### 스키마

```json
{
  "type": "azurefunctionapp",
  "id": "939f0381-96aa-4e44-bc04-7993a121384e",
  "resourceId": "/subscriptions/76f00a52-98a8-4e61-892c-bb327ded2352/resourceGroups/CLOUDCRAFT/providers/Microsoft.Web/sites/doc-functions",
  "region": "eastus",
  "mapPos": [1, 8],
  "tier": "consumption",
  "vcpu": 1,
  "memoryGB": 0.5,
  "durationMS": 1000,
  "executionsMM": 3,
  "color": {
    "isometric": "#ececed",
    "2d": null
  },
  "accentColor": {
    "isometric": "#4286c5",
    "2d": null
  },
  "link": "https://azure.microsoft.com/en-us/products/functions/",
  "locked": true
}
```

- **type: string**: 구성 요소 유형. 이 구성 요소의 `azurefunctionapp` 값 문자열이어야 합니다.
- **id: string, uuid**: 구성 요소의 고유 식별자입니다. API에서는 내부적으로 UUID v4를 사용하나 다른 고유 식별자도 사용할 수 있습니다/
- **resourceId: string**: Azure 구성 요소 내 전역 고유 식별자
- **region: string**: 구성 요소의 Azure 리전. API가 중국을 제외한 전역 리전을 지원합니다.
- **mapPos: array**: 청사진에 있는 구성 요소 포지션. API에서는 포지션을 표현하기 위해 고유 X와 Y 좌표 쌍을 사용합니다.
- **tier: string**: 앱의 호스팅 플랜입니다. `consumption` 또는 `premium` 두 값 중 하나를 허용합니다. 기본값은 `consumption`입니다.
- **vcpu: number**: 함수에서 사용하는 평균 컴퓨팅 단위 수입니다. 기본값은 `1` 입니다.
- **memoryGB: number**: 함수에서 사용하는 평균 메모리 양을 기가바이트로 표현합니다. 기본값은 `0.5`입니다.
- **durationMS: number**: 밀리초 단위로 평균 함수 기간을 표현합니다. 기본값은 `1000`입니다.
- **executionsMM: number**: 월별 호출 수를 백만 단위로 표현합니다. 기본값은 `3`입니다.
- **color: object**: 구성 요소에 적용할 색
  - **isometric: string**: 구성 요소의 3D 보기에 적용할 16진수 색. 기본값은 `#ececed`입니다.
  - **2d: string**: 구성 요소의 2D 보기에 적용할 16진수 색. 기본값은 `null`입니다.
- **accentColor: object**: 구성 요소 로고의 강조 색
  - **isometric: string**: 구성 요소 로고의 3D 보기에 적용할 16진수 색. 기본값은 `#1490df`입니다.
  - **2d: string**: 구성 요소 로고의 2D 보기에 적용할 16진수 색. 기본값은 `null`입니다.
- **link: string, uri**: 구성 요소를 다른 다이어그램 또는 외부 웹사이트로 연결할 URL. `blueprint://` 또는 `https://` 형식 중 하나를 사용할 수 있습니다.
- **locked: boolean**: 웹 인터페이스를 통해 포지션 변경을 허용할지 여부 결정. 기본값은 `false`입니다.

[1]: https://developers.cloudcraft.co/