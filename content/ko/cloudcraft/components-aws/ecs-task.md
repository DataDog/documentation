---
title: ECS Task 구성 요소
---
## 개요

ECS Task 구성 요소를 사용하여 Amazon Web Services 아키텍처에서 Amazon ECS 작업을 시각화합니다.

{{< img src="cloudcraft/components-aws/ecs-task/component-ecs-task-diagram.png" alt="상호 연결된 AWS 구성 요소를 보여주는 아이소메트릭 Cloudcraft 다이어그램 스크린샷." responsive="true" style="width:60%;">}}

## 도구 모음

도구 모음을 사용해 구성 요소를 구성하고 사용자 지정할 수 있습니다. 다음 옵션을 사용할 수 있습니다.

- **Color**: 구성 요소 본체의 색상을 선택합니다. 2D 및 3D 보기에 같은 색상을 사용하거나 각각 다른 색상을 사용할 수 있습니다.
- **Launch type**: 독립 실행형 작업의 실행 유형을 선택합니다. 지원되는 옵션은 Fargate와 EC2입니다.
- **CPU**: 작업 수준에서 CPU를 선택합니다. EC2에서는 이 옵션을 사용할 수 없습니다.
- **Memory (GB)**: 작업 수준에서 사용 가능한 메모리 양을 선택합니다. EC2에서는 이 옵션을 사용할 수 없습니다.
- **Storage (GiB)**: 작업에 할당된 스토리지 용량을 기비바이트 단위로 입력합니다. EC2에서는 이 옵션을 사용할 수 없습니다.

## API

[Cloudcraft API][1]를 사용해 프로그래밍을 통해 액세스하여 아키텍처 다이어그램을 JSON 개체로 렌더링할 수 있습니다.

### 스키마

다음은 ECS Task 구성 요소의 JSON 객체 예입니다.

```json
{
    "type": "ecstask",
    "id": "d76098b3-0d07-4362-80c9-018e474bb910",
    "arn": "arn:aws:ecs:us-east-1:746399320916:task/ecs-cluster/9790893504785954834",
    "region": "us-west-2",
    "mapPos": [7.5,3],
    "launchType": "fargate",
    "cpu": "256",
    "memoryGB": "0.5",
    "storageGB": 20,
    "color": {
        "isometric": "#ffeb3b",
        "2d": "#ffeb3b"
    },
    "link": "https://aws.amazon.com/ecs/",
    "locked": true
}
```

- **type: string**: 구성 요소 유형. 이 구성 요소에 대한 값은 `ecstask`(문자열)입니다.
- **id: string, uuid**: 구성 요소의 고유 식별자입니다. API에서는 내부적으로 UUID v4를 사용하나 다른 고유 식별자도 사용할 수 있습니다.
- **arn: string**: AWS 내 전역 고유 식별자([Amazon Resource Names][2])
- **region: string**: 구성 요소의 Azure 지역. API가 [AWS 중국을 제외][3]한 글로벌 지역을 지원합니다.
- **mapPos: array**: 청사진에 있는 구성 요소 포지션. X와 Y 좌표 쌍을 이용해 표현합니다.
- **launchType: string**: 독립 실행형 작업의 실행 유형. `fargate` 또는 `ec2`. 기본값은 `ec2`입니다.
- **cpu: number**: 작업 수준에서 vCPU 수. 자세한 내용은 [CPU에 허용되는 값](#accepted-values-for-cpu) 참조. 기본값은 `256`입니다.
- **memoryGB: number**: 작업 수준에서 메모리 양. 자세한 내용은 [memoryGB에 허용되는 값](#accepted-values-for-memorygb) 참조. 기본값은 `0.5`입니다.
- **storageGB: number**: 해당 작업에 할당된 저장 공간의 크기(기비바이트). 허용값은 `20`과  `200` 사이. 기본값은 `20`입니다.
- **color: object**: 구성 요소에 적용할 색
  - **isometric: string**: 3D 보기에서 구성 요소 본체에 사용할 16진수 색상. EC2의 기본값은 `#ececed`, Fargate의 기본값은  `#3c3c3c`입니다.
  - **2d: string**: 2D 보기에서 구성 요소 본체에 사용할 16진수 색상. 기본값은 `#d86613`입니다.
- **link: string, uri**: 구성 요소를 다른 다이어그램 또는 외부 웹사이트로 연결할 URL. `blueprint://` 또는 `https://` 형식 중 하나를 사용할 수 있습니다.
- **locked: boolean**: 웹 인터페이스를 통해 포지션 변경을 허용할지 여부 결정. 기본값은 `false`입니다.

## `cpu`에 허용된 값

`cpu` 키는 다음 값을 허용합니다.

```
256, 512, 1024, 2048, 4096
```

**참고**: `launchType`을 `ec2`로 설정하면 이 키가 작동하지 않습니다.

## `memoryGB`에 허용됩 값

`memoryGB` 키는 다음 값을 허용합니다.

```
0.5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30
```

**참고*: `launchType`을 `ec2`로 설정하면 이 키는 아무 작업도 수행하지 않습니다.

## `cpu` 및 `memoryGB`에 유효한 조합

`cpu` 및 `memoryGB` 키로 작업의 크기가 결정되나 유효한 값의 조합을 제공해야 합니다.

유효한 조합을 확인하려면 다음 표를 참고하세요.

CPU  | memoryGB
---- | ---------
256  | 0.5, 1, 2
512  | {1..4}
1024 | {2..8}
2048 | {4..16}
4096 | {8..30}

[1]: https://developers.cloudcraft.co/
[2]: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
[3]: /ko/cloudcraft/faq/scan-error-aws-china-region/