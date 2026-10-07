---
title: AKS Workload 구성 요소
---

## 개요

AKS Workload 구성 요소를 사용하여 Azure 환경에서 Kubernetes 워크로드를 나타내고 시각화합니다.

{{< img src="cloudcraft/components-azure/aks-workload/component-aks-workload-diagram.png" alt="상호 연결된 Azure 구성 요소를 보여주는 아이소메트릭 Cloudcraft 다이어그램 스크린샷." responsive="true" style="width:60%;">}}

## 도구 모음

도구 모음을 사용해 구성 요소를 구성하고 사용자 지정할 수 있습니다. 다음 옵션을 사용할 수 있습니다.

- **Color**: 구성 요소와 강조 항목에 적용할 색을 선택을 선택합니다. 2D와 3D 보기에 같은 색을 적용하거나 각각 다른 색을 선택할 수 있습니다.
- **Name**: AKS 워크로드의 이름을 입력합니다.
- **Type**: 클러스터 내부의 워크로드 유형을 선택합니다.

## API

[Cloudcraft API][1]를 사용하여 아키텍처 다이어그램에 프로그래밍 방식으로 액세스하고 JSON 객체로 렌더링할 수 있습니다. 다음은 AKS Workload 구성 요소의 JSON 객체 예시입니다.

### 스키마

```json
{
    "type": "azureaksworkload",
    "id": "2d432a67-4b2b-4040-8e4b-19c513bc2491",
    "resourceId": "/subscriptions/2dedf330-e79d-4b8e-82b9-13f6fa619bbb/resourceGroups/DOC-RESOURCE-GROUP/providers/Microsoft.ContainerService/managedClusters/doc-cluster/workloads/default/deployment/doc-agent",
    "region": "eastus",
    "mapPos": [2,3.25],
    "mapSize": [4,4],
    "nodes": [
        "375083c7-8212-4af6-859b-15fdc9da777d",
        "42062b69-bb14-4e05-87db-fa10cb408d5a",
        "26440a62-c06e-48f0-8c03-c5a3a2004050",
        "28efba36-1f3f-48ef-a1df-0d5473bcbf6e"
    ],
    "name": "AKS Workload",
    "workloadType": "deployment",
    "color": {
        "isometric": "#CEE0F5",
        "2d": "#CEE0F5"
    },
    "accentColor": {
        "isometric": "#0078D4",
        "2d": "#0078D4"
    },
    "link": "https://azure.microsoft.com/products/kubernetes-service",
    "locked": true
}
```

- **type: string**: 구성 요소 유형. 이 구성 요소에 대한 값은 `azureaksworkload`(문자열).
- **id: string, uuid**: 구성 요소의 고유 식별자입니다. API에서는 내부적으로 UUID v4를 사용하나 다른 고유 식별자도 사용할 수 있습니다.
- **resourceId: string**: Azure 구성 요소 내 전역 고유 식별자
- **region: string**: 구성 요소의 Azure 리전. API가 중국을 제외한 전역 리전을 지원합니다.
- **mapPos: array**: 청사진에 있는 구성 요소 포지션. API에서는 포지션을 표현하기 위해 고유 X와 Y 좌표 쌍을 사용합니다.
- **mapSize: array**: 청사진에 있는 구성 요소 크기입니다. API에서는 고유한 너비와 높이 쌍을 사용해 크기를 표현합니다.
- **nodes: array**: 워크로드 내부의 애플리케이션 컨테이너. [AKS Pod 구성 요소][2]의 고유 식별자 배열을 허용합니다.
- **name: string**: 워크로드 이름. 기본값은 `AKS Workload`
- **workloadType: string**: 클러스터 내부의 워크로드 유형. [자세한 내용은 아래 참조](#accepted-values-for-workloadType). 기본값은 `deployment`.
- **color: object**: 구성 요소에 적용할 색
  - **isometric: string**: 구성 요소 바디의 3D 보기에 적용할 16진수 색. 기본값은 `#CEE0F5`입니다.
  - **2d: string**: 구성 요소의 2D 보기에 적용할 16진수 색. 기본값은 `#CEE0F5`입니다.
- **accentColor: object**: 구성 요소 로고의 강조 색
  - **isometric: string**: 3D 보기에서 구성 요소 로고에 적용할 16진수 색상. 기본값은 `#0078D4`.
  - **2d: string**: 구성 요소 로고의 2D 보기에 적용할 16진수 색. 기본값은 `#0078D4`입니다.
- **link: string, uri**: 구성 요소를 다른 다이어그램 또는 외부 웹사이트로 연결할 URL. `blueprint://` 또는 `https://` 형식 중 하나를 사용할 수 있습니다.
- **locked: boolean**: 웹 인터페이스를 통해 포지션 변경을 허용할지 여부 결정. 기본값은 `false`입니다.

## `workloadType`에 허용되는 값

`workloadType` 키는 다음 문자열 값을 허용합니다.

```
deployment, statefulSet, daemonSet, job, cronJob
```

[1]: https://developers.cloudcraft.co/
[2]: https://help.cloudcraft.co/article/218-component-aks-pod