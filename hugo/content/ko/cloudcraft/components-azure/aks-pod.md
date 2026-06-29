---
title: AKS Pod 구성 요소
---

## 개요

AKS Pod 구성 요소를 사용해 Cloudcraft와 함께 사용하는 Azure 환경의 애플리케이션 컨테이너를 표현 및 가시화할 수 있습니다.

{{< img src="cloudcraft/components-azure/aks-pod/component-aks-pod-diagram.png" alt="상호 연결된 AWS 구성 요소를 보여주는 등축도법 Cloudcraft 다이어그램 스크린샷" responsive="true" style="width:60%;">}}

## 도구 모음

도구 모음을 사용해 구성 요소를 구성하고 사용자 지정할 수 있습니다. 다음 옵션을 사용할 수 있습니다.

- **Color**: 구성 요소와 강조 항목에 적용할 색을 선택을 선택합니다. 2D와 3D 보기에 같은 색을 적용하거나 각각 다른 색을 선택할 수 있습니다.

## API

[Cloudcraft API][1]를 사용해 프로그래밍을 통해 액세스하여 아키텍처 다이어그램을 JSON 개체로 렌더링할 수 있습니다.  다음은 AKS Pod 구성 요소의 JSON 개체 예시입니다.

### 스키마

```json
{
    "type": "azureakspod",
    "id": "28efba36-1f3f-48ef-a1df-0d5473bcbf6e",
    "resourceId":"/subscriptions/fd182fc4-48dc-4825-88da-1c1c59c7eab5/resourceGroups/DOC-RESOURCE-GROUP/providers/Microsoft.ContainerService/managedClusters/doc-cluster/pods/default/doc-agent-fdf8f8fb7",
    "region": "eastus",
    "mapPos": [4,5.25],
    "color": {
        "isometric": "#075693",
        "2d": "#075693"
    },
    "accentColor": {
        "isometric": "#2EC8EA",
        "2d": "#2EC8EA"
    },
    "link": "https://azure.microsoft.com/products/kubernetes-service",
    "locked": true
}
```

- **type: string**. 구성 요소 유형. 이 구성 요소의 `azureakspod` 값 문자열이어야 합니다.
- **id: string, uuid**. 구성 요소의 고유 식별자입니다. API에서는 내부적으로 UUID v4를 사용하나 다른 고유 식별자도 사용할 수 있습니다.
- **resourceId: string**. Azure 구성 요소 내 전역 고유 식별자
- **region: string**. 구성 요소의 Azure 리전. API가 중국을 제외한 전역 리전을 지원합니다.
- **mapPos: array**. 청사진에 있는 구성 요소 포지션. API에서는 포지션을 표현하기 위해 고유 X와 Y 좌표 쌍을 사용합니다.
- **color: object**: 구성 요소 바디에 적용할 색입니다.
  - **isometric: string**. 구성 요소 바디의 3D 보기에 적용할 16진수 색. 기본값은 `#075693`입니다.
  - **2d: string**. 구성 요소의 2D 보기에 적용할 16진수 색. 기본값은 `#075693`입니다.
- **accentColor: object**. 구성 요소 로고의 강조 색
  - **isometric: string**. 구성 요소 로고의 3D 보기에 적용할 16진수 색. 기본값은 `#2EC8EA`입니다.
  - **2d: string**. 구성 요소 로고의 2D 보기에 적용할 16진수 색. 기본값은 `#2EC8EA`입니다.
- **link: string, uri**. 구성 요소를 다른 다이어그램 또는 외부 웹사이트로 연결할 URL. `blueprint://` 또는 `https://` 형식 중 하나를 사용할 수 있습니다.
- **locked: boolean**: 웹 인터페이스를 통해 구성 요소의 포지션 변경을 허용할지 여부 결정. 기본값은 `false`입니다.

[1]: https://developers.cloudcraft.co/