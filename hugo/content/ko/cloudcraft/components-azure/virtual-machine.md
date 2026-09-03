---
title: 가상 머신 구성 요소
---

## 개요

가상 머신 구성 요소를 사용하여 Azure 환경에서 가상 머신을 표현하고 시각화할 수 있습니다.

{{< img src="cloudcraft/components-azure/virtual-machine/component-virtual-machine-diagram.png" alt="상호 연결된 Azure 가상 머신 구성 요소를 보여주는 등축도법 Cloudcraft 다이어그램의 스크린샷입니다." responsive="true" style="width:60%;">}}

## 도구 모음

도구 모음을 사용해 구성 요소를 구성하고 사용자 지정할 수 있습니다. 다음 옵션을 사용할 수 있습니다.

- **Color**: 3D 보기 구성 요소의 강조 및 채우기 색상을 선택합니다.
- **플랫폼**: 가상 머신의 플랫폼을 선택합니다. 지원되는 옵션은 윈도우즈(Windows) 및 리눅스(Linux)입니다.
- **티어**: 가상 머신의 서비스 레벨 티어를 선택합니다.
- **시리즈**: 가상 머신 시리즈를 선택합니다. 이 옵션은 사용 가능한 인스턴스 유형에 영향을 줍니다.
- **인스턴스**: 가상 머신의 인스턴스 유형을 선택합니다. 인스턴스 유형을 변경하면 하이퍼바이저가 사용하는 것을 반영하여 도구 모음에 표시되는 하드웨어 세부 정보도 변경됩니다.

## API

[Cloudcraft API][1]를 사용하여 프로그래밍 방식으로 아키텍처 다이어그램에 액세스하고 JSON 객체로 렌더링할 수 있습니다. 다음은 가상 머신 컴포넌트의 JSON 객체 예시입니다.

### 스키마

```json
{
    "type": "azurevm",
    "id": "c46c4a24-e3b5-4830-9217-0276e92ac927",
    "resourceId": "/subscriptions/451da5fc-e712-4a34-b236-3c6992a1c2c0/resourceGroups/VMGROUP1/providers/Microsoft.Compute/virtualMachines/hello",
    "region": "eastus",
    "mapPos": [4.5, 7.5],
    "platform": "linux",
    "tier": "Standard",
    "instance": "B1ms",
    "reservationTerm": "OnDemand",
    "color": {
        "isometric": "#ececed",
        "2d": null
    },
    "accentColor": {
        "isometric": "#4286c5",
        "2d": null
    },
    "link": "https://azure.microsoft.com/products/virtual-machines/",
    "locked": true
}

```

- **유형: 문자열**: 컴포넌트의 유형입니다. 이 컴포넌트에 대해 `azurevm` 값의 문자열이어야 합니다.
- **id: string, uuid**: 구성 요소의 고유 식별자입니다. API에서는 내부적으로 UUID v4를 사용하나 다른 고유 식별자도 사용할 수 있습니다/
- **resourceId: string**: Azure 구성 요소 내 전역 고유 식별자
- **region: string**: 구성 요소의 Azure 리전. API가 중국을 제외한 전역 리전을 지원합니다.
- **mapPos: array**: 청사진에 있는 구성 요소 포지션. API에서는 포지션을 표현하기 위해 고유 X와 Y 좌표 쌍을 사용합니다.
- **플랫폼: 문자열*: 가상 머신의 플랫폼입니다. `windows` 또는 `linux` 두 값 중 하나를 허용합니다. 기본값은 `linux`입니다.
- **티어: 문자열**: 가상 머신의 서비스 레벨 티어입니다. `Low Priority` , `Standard`, `Basic`의 세 가지 값 중 하나를 허용합니다. 기본값은 `Standard`입니다.
- **인스턴스: 문자열**: 가상 컴퓨터의 인스턴스 유형입니다. [자세한 내용은 Microsoft Learn을 참조하세요][2]. 기본값은 `A1 v2`입니다.
- **color: object**: 구성 요소에 적용할 색
  - **isometric: string**: 구성 요소의 3D 보기에 적용할 16진수 색. 기본값은 `#ececed`입니다.
  - **2d: string**: 구성 요소의 2D 보기에 적용할 16진수 색. 기본값은 `null`입니다.
- **accentColor: object**: 구성 요소 로고의 강조 색
  - **isometric: string**: 3D 보기에서 구성 요소 로고에 적용할 16진수 색. 기본값은 `#4286c5`입니다.
  - **2d: string**: 구성 요소 로고의 2D 보기에 적용할 16진수 색. 기본값은 `null`입니다.
- **link: string, uri**: 구성 요소를 다른 다이어그램 또는 외부 웹사이트로 연결할 URL. `blueprint://` 또는 `https://` 형식 중 하나를 사용할 수 있습니다.
- **locked: boolean**: 웹 인터페이스를 통해 포지션 변경을 허용할지 여부 결정. 기본값은 `false`입니다.

[1]: https://developers.cloudcraft.co/
[2]: https://learn.microsoft.com/en-us/azure/virtual-machines/sizes