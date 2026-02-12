---
title: ECS Service 구성 요소
---
## 개요

ECS 서비스 구성 요소를 사용하여 Amazon Web Services 아키텍처에서 Amazon ECS 서비스를 시각화합니다.

{{< img src="cloudcraft/components-aws/ecs-service/component-ecs-service-diagram.png" alt="상호 연결된 AWS 구성 요소를 보여주는 아이소메트릭 Cloudcraft 다이어그램 스크린샷." responsive="true" style="width:60%;">}}

## 도구 모음

도구 모음을 사용해 구성 요소를 구성하고 사용자 지정할 수 있습니다. 다음 옵션을 사용할 수 있습니다.

- **Color**: 구성 요소 상단의 색상과 하단의 강조 색상을 선택합니다. 2D 및 3D 보기에 같은 색상을 사용하거나 각각 다른 색상을 사용할 수 있습니다.
- **Name**: 서비스 이름을 입력합니다.

**ECS Service** 구성 요소를 [VPC][1], [보안 그룹][2], [서브넷][3]에 추가할 수도 있습니다.

## API

[Cloudcraft API][1]를 사용하여 아키텍처 다이어그램에 프로그래밍 방식으로 액세스하고 JSON 객체로 렌더링합니다.

### 스키마

다음은 ECS Service 구성 요소의 JSON 예입니다.

```json
{
    "type": "ecsservice",
    "id": "58c88e1f-b9c7-47a0-aed1-ee8324bf0fd0",
    "arn": "arn:aws:ecs:us-east-1:746399320916:service/ecs-service",
    "region": "us-east-1",
    "mapPos": [6,1],
    "name": "ECS Service",
    "nodes": [
        "1005e737-2ccc-4325-abdf-b0f6c5c78ea1",
        "319c40a5-d5f2-4394-8784-f613aa1d313b"
    ],
    "color": {
        "isometric": "#000000",
        "2d": "#000000"
    },
    "accentColor": {
        "isometric": "#03a9f4",
        "2d": "#03a9f4"
    },
    "link": "https://aws.amazon.com/ecs/",
    "locked": true
}
```

- **type: string**: 구성 요소 유형. 이 구성 요소의 값은 `ecsservice`(문자열)이어야 합니다.
- **id: string, uuid**: 구성 요소의 고유 식별자입니다. API에서는 내부적으로 UUID v4를 사용하나 다른 고유 식별자도 사용할 수 있습니다.
- **arn: string**: AWS 내 구성 요소에 전역적으로 고유한 식별자([Amazon Resource Names][5]).
- **region: string**: 구성 요소의 AWS 리전. API는 [AWS China 외][6] 모든 글로벌 지역을 지원합니다.
- **mapPos: array**: 청사진에 있는 구성 요소 포지션. X와 Y 좌표 쌍을 이용해 표현합니다.
- **name: string**: 서비스 이름. 기본값은 `ECS Service`.
- **nodes: array**: 서비스 내부에서 실행되는 작업. 실행 유형이 EC2 또는 Fargate 작업의 고유 식별자 배열을 허용합니다.
- **color: object**: 구성 요소 본문의 상단을 채우는 색상.
  - **isometric: string**: 3D 보기에서 구성 요소 본체에 사용할 16진수 색상. 기본값은 `#ffffff`.
  - **2d: string**: 2D 보기에서 구성 요소 본체에 사용할 16진수 색상. 기본값은 `#ffffff`.
- **accentColor: object**: 구성 요소 본체 하단의 강조색.
  - **isometric: string**: 3D 보기에서 구성 요소 로고에 사용할 16진수 색상. 기본값은 `#4286c5`.
  - **2d: string**: 2D 보기에서 구성 요소 로고에 사용할 16진수 색상. 기본값은 `#693cc5`.
- **link: string, uri**: 구성 요소를 다른 다이어그램 또는 외부 웹사이트로 연결할 URL. `blueprint://` 또는 `https://` 형식 중 하나를 사용할 수 있습니다.
- **locked: boolean**: 웹 인터페이스를 통해 포지션 변경을 허용할지 여부 결정. 기본값은 `false`입니다.

[1]: /ko/cloudcraft/components-aws/vpc/
[2]: /ko/cloudcraft/components-aws/security-group/
[3]: /ko/cloudcraft/components-aws/subnet/
[4]: https://developers.cloudcraft.co/
[5]: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
[6]: /ko/cloudcraft/faq/scan-error-aws-china-region/