---
title: EKS Workload 컴포넌트
---
## 개요

<div class="alert alert-info">Amazon EKS 구성 요소를 스캔하려면 <a href="https://docs.datadoghq.com/cloudcraft/getting-started/connect-amazon-eks-cluster-with-cloudcraft/">보기 전용 권한이 있는 Cloudcraft의 IAM 역할이 있어야 합니다</a>.</div>

EKS Workload 컴포넌트로 Amazon Web Services 아키텍처에서 Amazon EKS 워크로드를 시각화합니다.

{{< img src="cloudcraft/components-aws/eks-workload/component-eks-workload-diagram.png" alt="상호연결된 AWS 컴포넌트를 보여주는 아이소메트릭 Cloudcraft 다이어그램 스크린샷." responsive="true" style="width:60%;">}}

## 도구 모음

도구 모음을 사용해 구성 요소를 구성하고 사용자 지정할 수 있습니다. 다음 옵션을 사용할 수 있습니다.

- **Color**: 컴포넌트 상단을 채울 색상과 하단의 강조 색상을 선택합니다. 2D 및 3D 보기에 같은 색상을 사용하거나 각각 다른 색상을 사용할 수 있습니다.
- **Name**: 워크로드의 이름을 입력합니다.
- **Type**: 사용할 워크로드 유형을 선택합니다.

## API

[Cloudcraft API][1]를 사용해 프로그래밍을 통해 액세스하여 JSON 개체의 아키텍처 다이어그램을 렌더링할 수 있습니다.

### 스키마

다음은 EKS Workload 컴포넌트의 JSON 오브젝트 예시입니다.

```json
{
    "type": "eksworkload",
    "id": "a5cad956-3366-4582-a73a-2709d53e975f",
    "region": "us-east-1",
    "mapPos": [3.5,-0.75],
    "name": "EKS Workload",
    "workloadType": "deployment",
    "nodes": [
        "cadf6a3f-67d2-4df9-ad40-f892030af58b",
        "a9437fdf-56f9-4c3b-8acf-6f0f37f70980",
        "b15e51da-b99b-4072-b4c4-e9e85df7e285",
        "b5878fa9-bf1a-44d0-bc8d-336f99763fce"
    ],
    "color": {
        "isometric": "#f44336",
        "2d": "#f44336"
    },
    "accentColor": {
        "isometric": "#f44336",
        "2d": "#f44336"
    },
    "link": "https://aws.amazon.com/eks/",
    "locked": true
}
```

- **type: string**: 컴포넌트의 유형. 이 컴포넌트의 `eksworkload` 값 문자열이어야 합니다.
- **id: string, uuid**: 구성 요소의 고유 식별자입니다. API에서는 내부적으로 UUID v4를 사용하나 다른 고유 식별자도 사용할 수 있습니다/
- **arn: string**: AWS 내 전역 고유 식별자([Amazon Resource Names][2])
- **region: string**: 구성 요소의 AWS 리전. [AWS China를 제외][3]한 글로벌 리전을 모두 지원합니다.
- **mapPos: array**: 청사진에 있는 구성 요소 포지션. X와 Y 좌표 쌍을 이용해 표현합니다.
- **name: string**: 워크로드 이름. 기본값은 `EKS Workload`입니다.
- **workloadType: string**: 클러스터의 워크로드 유형입니다. 자세한 내용은 [`workloadType`의 허용값](#accepted-values-for-workloadType)을 참조하세요. 기본값은 `deployment`입니다.
- **nodes: array**: 워크로드에서 실행되는 포트. EKS 포트의 고유 식별 어레이를 허용합니다.
- **color: object**: 구성 요소 본문의 상단을 채우는 색상.
  - **isometric: string**: 3D 보기에서 컴포넌트 바디에 사용할 16진수 색상. 기본값은 `#FFFFFF`입니다.
  - **2d: string**: 2D 보기에서 컴포넌트 바디에 사용할 16진수 색. 기본값은 `#FFFFFF`입니다.
- **accentColor: object**: 구성 요소 본체 하단의 강조색.
  - **isometric: string**: 3D 보기에서 구성 요소 로고에 적용할 16진수 색. 기본값은 `#4286C5`입니다.
  - **2d: string**: 2D 보기에서 구성 요소 로고에 사용할 16진수 색상. 기본값은 `#693CC5`.
- **link: string, uri**: 구성 요소를 다른 다이어그램 또는 외부 웹사이트로 연결할 URL. `blueprint://` 또는 `https://` 형식 중 하나를 사용할 수 있습니다.
- **locked: boolean**: 웹 인터페이스를 통해 포지션 변경을 허용할지 여부 결정. 기본값은 `false`입니다.

## `workloadType`에 허용되는 값

`workloadType` 키는 다음 문자열 값을 허용합니다.

```
deployment, statefulSet, daemonSet, job, cronJob
```

[1]: https://developers.cloudcraft.co/
[2]: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
[3]: /ko/cloudcraft/faq/scan-error-aws-china-region/