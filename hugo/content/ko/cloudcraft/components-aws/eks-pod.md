---
title: EKS Pod 구성 요소
---
## 개요

<div class="alert alert-info">Amazon EKS 구성 요소를 스캔하려면 <a href="https://docs.datadoghq.com/cloudcraft/getting-started/connect-amazon-eks-cluster-with-cloudcraft/">보기 전용 권한이 있는 Cloudcraft의 IAM 역할이 있어야 합니다</a>.</div>

EKS Pod 구성 요소를 사용해 Amazon Web Services 아키텍처에서 Amazon EKS 컨테이너를 가시화할 수 있습니다.

{{< img src="cloudcraft/components-aws/eks-pod/component-eks-pod-diagram.png" alt="상호 연결된 AWS 구성 요소를 보여주는 등축도법 Cloudcraft 다이어그램 스크린샷" responsive="true" style="width:60%;">}}

## 도구 모음

도구 모음을 사용해 구성 요소를 구성하고 사용자 지정할 수 있습니다. 다음 옵션을 사용할 수 있습니다.

- **Color**: 구성 요소와 강조 항목에 적용할 색을 선택을 선택합니다. 2D와 3D 보기에 같은 색을 적용하거나 각각 다른 색을 선택할 수 있습니다.
- **컴퓨팅**: 작업자 노드 유형을 선택합니다. Fargate와 Node Group 옵션 중에서 선택할 수 있습니다.
- **CPU**: 파드의 vCPU 값을 선택합니다. Node Groups에서는 이 옵션을 사용할 수 없습니다.
- **메모리(GB)**: 파드에 사용할 수 있는 메모리 양을 선택합니다. Node Groups에서는 이 옵션을 사용할 수 없습니다.

## API

[Cloudcraft API][1]를 사용해 프로그래밍을 통해 액세스하여 JSON 개체의 아키텍처 다이어그램을 렌더링할 수 있습니다.

### 스키마

다음은 EKS Pod 구성 요소의 JSON 개체 예시입니다.

```
{
    "type": "ekspod",
    "id": "cc5104b0-1747-441c-a7b7-b760796d475b",
    "region": "us-east-1",
    "mapPos": [6.5,2.5],
    "compute": "fargateProfile",
    "cpu": "0.25",
    "memoryGB": "0.5",
    "color": {
        "isometric": "#ff9800",
        "2d": "#ff9800"
    },
    "accentColor": {
        "isometric": "#000000",
        "2d": "#000000"
    },
    "link": "https://aws.amazon.com/eks/",
    "locked": true
}
```

**EKS Pod** 구성 요소 스키마 표현은 위 형식을 따르며, 이 구성 요소 다이어그램 내 모든 필드를 정의합니다.

- **type: string**: 구성 요소 유형. 이 구성 요소의 `ekspod` 값 문자열이어야 합니다.
- **id: string, uuid**: 구성 요소의 고유 식별자입니다. API에서는 내부적으로 UUID v4를 사용하나 다른 고유 식별자도 사용할 수 있습니다/
- **arn: string**: AWS 내 전역 고유 식별자([Amazon Resource Names][2])
- **region: string**: 구성 요소의 AWS 리전. [AWS China를 제외][3]한 글로벌 리전을 모두 지원합니다.
- **mapPos: array**: 청사진에 있는 구성 요소 포지션. X와 Y 좌표 쌍을 이용해 표현합니다.
- **compute: string**: 파드의 작업자 노드 유형. `fargateProfile` 또는 `nodeGroup` 값 중 하나를 허용합니다. 기본값은 `nodeGroup`입니다.
- **cpu: number**: 파드에 사용할 수 있는 vCPU 수. 자세한 정보는 [`cpu`에 허용된 값](#accepted-values-for-cpu)을 참고하세요. 기본값은 `0.25`입니다.
- **memoryGB: number**: 파드에 사용할 수 있는 메모리 양. 자세한 내용은 [`memoryGB`에 허용된 값](#accepted-values-for-memorygb)을 참고하세요. 기본값은 `0.5`입니다.
- **color: object**: 구성 요소에 적용할 색
  - **isometric: string**: 구성 요소의 3D 보기에 적용할 16진수 색. 기본값은 `#3C3C3C`입니다.
  - **2d: string**: 구성 요소의 2D 보기에 적용할 16진수 색. 기본값은 `#D86613`입니다.
- **accentColor: object**: 구성 요소 로고의 강조 색
  - **isometric: string**: 3D 보기에서 구성 요소 로고에 적용할 16진수 색. 기본값은 `#FF9800`입니다.
  - **2d: string**: 2D 보기에서 구성 요소의 로고에 적용할 16진수 색. 기본값은 `#FFFFFF`입니다.
- **link: string, uri**: 구성 요소를 다른 다이어그램 또는 외부 웹사이트로 연결할 URL. `blueprint://` 또는 `https://` 형식 중 하나를 사용할 수 있습니다.
- **locked: boolean**: 웹 인터페이스를 통해 포지션 변경을 허용할지 여부 결정. 기본값은 `false`입니다.

## `cpu`에 허용된 값

`cpu` 키는 다음 값을 허용합니다.

```
0.25, 0.5, 1, 2, 4
```

**참고**: `compute`이 `fargateProfile`로 설정되어 있을 때만 키가 작동합니다.

## `memoryGB`에 허용된 값

`memoryGB` 키는 다음 값을 허용합니다.

```
0.5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30
```

**참고**: `compute`이 `fargateProfile`로 설정되어 있을 때만 키가 작동합니다.

## `cpu` 및 `memoryGB`에 유효한 조합

`cpu` 및 `memoryGB` 키는 함께 파드의 각 컨테이너에 할당되는 리소스를 결정합니다. 그러나 먼저 유효한 값 조합을 제공해야 합니다.

유효한 조합을 확인하려면 다음 표를 참고하세요.

cpu   | memoryGB
----  | ---------
0.25  | 0.5, 1, 2
0.5   | {1..4}
1     | {2..8}
2     | {4..16}
4     | {8..30}

[1]: https://developers.cloudcraft.co/
[2]: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
[3]: /ko/cloudcraft/faq/scan-error-aws-china-region/