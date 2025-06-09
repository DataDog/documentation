---
title: EKS Cluster 구성 요소
---
## 개요

<div class="alert alert-info">Amazon EKS 구성 요소를 스캔하려면 <a href="https://docs.datadoghq.com/cloudcraft/getting-started/connect-amazon-eks-cluster-with-cloudcraft/">보기 전용 권한이 있는 Cloudcraft의 IAM 역할이 있어야 합니다</a>.</div>

EKS Cluster 구성 요소를 사용하여 Amazon Web Services 아키텍처에서 Amazon EKS 클러스터를 시각화합니다.

{{< img src="cloudcraft/components-aws/eks-cluster/component-eks-cluster-diagram.png" alt="상호 연결된 AWS 구성 요소를 보여주는 아이소메트릭 Cloudcraft 다이어그램의 스크린샷." responsive="true" style="width:60%;">}}

## 도구 모음

도구 모음을 사용해 구성 요소를 구성하고 사용자 지정할 수 있습니다. 다음 옵션을 사용할 수 있습니다.

- **Color**: 구성 요소 상단을 채울 색상, 하단 및 로고를 채울 강조 색상을 선택합니다. 2D 및 3D 보기에 같은 색상을 사용하거나 각각 다른 색상을 사용할 수 있습니다.
- **Name**: 클러스터의 이름을 입력합니다.

**EKS Cluster** 구성 요소를 [VPC][1], [보안 그룹][2] 및 [서브넷][3]에 추가할 수도 있습니다.

## API

[Cloudcraft API][1]를 사용해 프로그래밍을 통해 액세스하여 JSON 개체의 아키텍처 다이어그램을 렌더링할 수 있습니다.

### 스키마

다음은 EKS Cluster 구성 요소의 JSON 객체 예입니다.

```json
{
    "type": "ekscluster",
    "id": "0b9f9ea3-2ba7-46fd-bd40-cd694dc38af6",
    "arn": "arn:aws:eks:us-east-1:987867537671:cluster/eks-cluster",
    "region": "us-east-1",
    "mapPos": [2.5,-1.75],
    "name": "EKS Cluster",
    "nodes": [
        "c00c8af0-d409-4a1c-9db4-e2f96128ad56",
        "3d911e8b-2d8e-4cb7-8eb8-61b2e96c75b3"
    ],
    "color": {
        "isometric": "#000000",
        "2d": "#000000"
    },
    "accentColor": {
        "isometric": "#ff5722",
        "2d": "#ff5722"
    },
    "link": "https://aws.amazon.com/eks/",
    "locked": true
}
```

- **type: string**: 구성 요소 유형. 이 구성 요소의 값은 `ekscluster`(문자열).
- **id: string, uuid**: 구성 요소의 고유 식별자입니다. API에서는 내부적으로 UUID v4를 사용하나 다른 고유 식별자도 사용할 수 있습니다/
- **arn: string**: AWS 내 구성 요소에 전역적으로 고유한 식별자([Amazon Resource Names][5]).
- **region: string**: 구성 요소의 AWS 리전. [AWS China를 제외][6]한 전역 리전을 모두 지원합니다.
- **mapPos: array**: 청사진에 있는 구성 요소 포지션. X와 Y 좌표 쌍을 이용해 표현합니다.
- **name: string**: 클러스터 이름. 기본값은 `EKS Cluster`.
- **nodes: array**: 클러스터 내부에서 실행되는 워크로드. [EKS Workload 구성 요소][7]의 고유 식별자 배열을 허용합니다.
- **color: object**: 구성 요소 본체의 상단을 채우는 색상.
  - **isometric: string**: 구성 요소의 3D 보기에 적용할 16진수 색. 기본값은 `#ECECED`입니다.
  - **2d: string**: 2D 보기에서 구성 요소 본체를 채우는 16진수 색상. 기본값은 `#ECECED`.
- **accentColor: object**: 구성 요소 본체 하단과 로고를 채우는 강조 색상.
  - **isometric: string**: 3D 보기에서 구성 요소 본체의 하단과 로고에 사용할 16진수 색상. 기본값은 `#4286C5`.
  - **2d: string**: 2D 보기에서 구성 요소 로고에 사용할 16진수 색상. 기본값은 `#693CC5`.
- **link: string, uri**: 구성 요소를 다른 다이어그램 또는 외부 웹사이트로 연결할 URL. `blueprint://` 또는 `https://` 형식 중 하나를 사용할 수 있습니다.
- **locked: boolean**: 웹 인터페이스를 통해 포지션 변경을 허용할지 여부 결정. 기본값은 `false`입니다.

[1]: /ko/cloudcraft/components-aws/vpc/
[2]: /ko/cloudcraft/components-aws/security-group/
[3]: /ko/cloudcraft/components-aws/subnet/
[4]: https://developers.cloudcraft.co/
[5]: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
[6]: /ko/cloudcraft/faq/scan-error-aws-china-region/
[7]: /ko/cloudcraft/components-aws/eks-workload/