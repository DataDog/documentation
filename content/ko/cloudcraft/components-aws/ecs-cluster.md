---
title: ECS 클러스터 컴포넌트
---
## 개요

EKS 클러스터 컴포넌트로 Amazon Web Services 아키텍처에서 Amazon ECS 클러스터를 시각화합니다.

{{< img src="cloudcraft/components-aws/ecs-cluster/component-ecs-cluster-diagram.png" alt="상호 연결된 AWS 컴포넌트를 보여주는 아이소메트릭 Cloudcraft 다이어그램의 스크린샷." responsive="true" style="width:60%;">}}

## 도구 모음

도구 모음을 사용해 구성 요소를 구성하고 사용자 지정할 수 있습니다. 다음 옵션을 사용할 수 있습니다.

- **Color**: 컴포넌트 상단을 채울 색상과 하단의 강조 색상을 선택합니다. 2D 및 3D 보기에 같은 색상을 사용하거나 각각 다른 색상을 사용할 수 있습니다.
- **Name**: 클러스터의 이름을 입력합니다. 최대 255자의 문자, 숫자, 하이픈, 밑줄을 사용할 수 있습니다.

ECS 클러스터 컴포넌트를 [VPC][1] 및 [서브넷][2]에 추가할 수도 있습니다.

## API

[Cloudcraft API][1]로 프로그래밍을 통해 액세스하여 아키텍처 다이어그램을 JSON 객체로 렌더링할 수 있습니다.

### 스키마

다음은 EKS 클러스터 컴포넌트의 JSON 객체 예시입니다.

```json
{
    "type": "ecscluster",
    "id": "c28296e2-01b1-463c-be6d-fe748a3dba05",
    "arn": "arn:aws:ecs:us-east-1:746399320916:cluster/ecs-cluster",
    "region": "us-east-1",
    "mapPos": [3,-1.75],
    "name": "ECS Cluster",
    "nodes": [
        "35578835-bb50-43f6-b9bc-d9a7ff20f667",
        "adad4f6e-b1dc-4e90-a860-e6c34d1d707a",
        "6321a7c4-db1f-4b47-a2dd-2d4c1a3deaff",
        "bafdae24-a6af-47ad-896d-846d790c8b23",
        "117a0f24-a115-4f12-8627-e8c8b9665d86",
        "c4af84a8-a02d-400e-9277-ad1ed886390f",
        "93a34859-a6ef-451d-96c2-4cfccab86d70",
        "b0e607e8-8b01-492b-b4a0-f4eea35d19f1",
        "085ca535-3b23-420c-a19c-27ae3d11a2ab",
        "eb7cc62b-db25-4ce4-97dd-130bb288512a"
    ],
    "color": {
        "isometric": "#ffeb3b",
        "2d": "#ffeb3b"
    },
    "accentColor": {
        "isometric": "#000000",
        "2d": "#000000"
    },
    "link": "https://aws.amazon.com/ecs/",
    "locked": true
}
```

- **type: string**: 컴포넌트 유형. 이 컴포넌트의 `ecscluster` 값 문자열이어야 합니다.
- **id: string, uuid**: 구성 요소의 고유 식별자입니다. API에서는 내부적으로 UUID v4를 사용하나 다른 고유 식별자도 사용할 수 있습니다.
- **arn: string**: AWS 내 컴포넌트의 전역 고유 식별자로 [Amazon Resource Names][4]라고도 합니다.
- **region: string**: 컴포넌트의 AWS 리전. API는 [AWS 중국을 제외][5]한 글로벌 리전을 모두 지원합니다.
- **mapPos: array**: 블루프린트에 있는 구성 요소 포지션. X와 Y 좌표 쌍을 이용해 표현합니다.
- **name: string**: 클러스터의 이름을 입력합니다. 최대 255자의 문자, 숫자, 하이픈, 밑줄을 사용할 수 있습니다.
- **nodes: array**: 클러스터 내부에서 실행되는 서비스 및 작업. 서비스 및 작업 컴포넌트의 고유 식별자 어레이를 허용합니다.
- **color: object**: 구성 요소 본문의 상단을 채우는 색상.
  - **isometric: string**: 3D 보기에서 컴포넌트 바디에 사용할 16진수 색상. 기본값은 `#ececed`입니다.
  - **2d: string**: 2D 보기에서 컴포넌트 바디에 사용할 16진수 색상. 기본값은 `#ececed`입니다.
- **accentColor: object**: 구성 요소 본체 하단의 강조색입니다.
  - **isometric: string**: 3D 보기에서 구성 요소 로고에 사용할 16진수 색상. 기본값은 `#4286c5`입니다.
  - **2d: string**: 2D 보기에서 구성 요소 로고에 사용할 16진수 색상. 기본값은 `#693cc5`입니다.
- **link: string, uri**: 구성 요소를 다른 다이어그램 또는 외부 웹사이트로 연결할 URL. `blueprint://` 또는 `https://` 형식 중 하나를 사용할 수 있습니다.
- **locked: boolean**: 웹 인터페이스를 통해 포지션 변경을 허용할지 여부 결정. 기본값은 `false`입니다.

[1]: /ko/cloudcraft/components-aws/vpc/
[2]: /ko/cloudcraft/components-aws/subnet/
[3]: https://developers.cloudcraft.co/
[4]: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
[5]: /ko/cloudcraft/faq/scan-error-aws-china-region/