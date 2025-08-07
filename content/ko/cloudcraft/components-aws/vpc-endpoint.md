---
title: VPC 엔드포인트 컴포넌트
---
## 개요

VPC 엔드포인트 컴포넌트로 AWS 아키텍처에서 VPC 엔드포인트를 시각화합니다.

{{< img src="cloudcraft/components-aws/vpc-endpoint/component-vpc-endpoint-diagram.png" alt="상호 연결된 AWS 컴포넌트를 나타내는 아이소메트릭 Cloudcraft 다이어그램의 스크린샷." responsive="true" style="width:60%;">}}

## 도구 모음

도구 모음을 사용해 구성 요소를 구성하고 사용자 지정할 수 있습니다. 다음 옵션을 사용할 수 있습니다.

- **Color**: 구성 요소 바디를 채울 색상과 심볼을 강조할 색상을 선택합니다. 2D와 3D 보기에 같은 색을 적용하거나 각각 다른 색을 선택할 수 있습니다.
- **Type**: VPC 엔드포인트 유형을 선택합니다.
- **Data processed(GB)**: 엔드포인트에서 처리한 총 데이터의 양을 기가바이트 단위로 입력합니다. 게이트웨이 유형에는 사용할 수 없습니다.

## API

[Cloudcraft API][1]를 사용해 프로그래밍을 통해 액세스하여 JSON 개체의 아키텍처 다이어그램을 렌더링할 수 있습니다.

### 스키마

다음은 VPC 엔드포인트 컴포넌트의 JSON 객체 예시입니다.

```json
{
    "type": "vpcendpoint",
    "id": "b1c1f99c-4b2b-437c-bcf4-36597da7e369",
    "region": "us-east-1",
    "mapPos": [17,4],
    "endpointType": "interface",
    "dataGb": 10,
    "color": {
        "isometric": "#ECECED",
        "2d": "#693CC5"
    },
    "accentColor": {
        "isometric": null,
        "2d": null
    },
    "locked": true
}
```

- **type: string**: 컴포넌트 유형. 이 컴포넌트의 `vpcendpoint` 값 문자열이어야 합니다.
- **id: string, uuid**: 구성 요소의 고유 식별자입니다. API에서는 내부적으로 UUID v4를 사용하나 다른 고유 식별자도 사용할 수 있습니다.
- **arn: string**: AWS 내 컴포넌트의 전역 고유 식별자로 [Amazon Resource Names][2]라고도 합니다.
- **region: string**: 구성 요소의 AWS 리전. [AWS China를 제외][3]한 글로벌 리전을 모두 지원합니다.
- **mapPos: array**: 청사진에 있는 컴포넌트의 포지션. X와 Y 좌표 쌍으로 표현합니다.
- **endpointType: string**: 엔드포인트의 유형입니다. `interface`, `gateway`, 또는 `gatewayloadbalancer` 중 하나의 옵션을 허용합니다. 기본값은 `interface`입니다.
- **datasetGb: number**: 엔드포인트에서 처리한 총 데이터 볼륨(기가바이트 단위)입니다. 기본값은 `10`입니다.
- **color: object**: 구성 요소에 적용할 색
  - **isometric: string**: 구성 요소의 3D 보기에 적용할 16진수 색. 기본값은 `#ECECED`입니다.
  - **2d: string**: 구성 요소 바디의 2D 보기에 적용할 16진수 색. 기본값은 `#CC2264`입니다.
- **accentColor: object**: 구성 요소 로고의 강조 색
  - **isometric: string**: 3D 보기에서 구성 요소 로고에 적용할 16진수 색. 기본값은 `#4286C5`입니다.
  - **2d: string**: 2D 보기에서 구성 요소의 로고에 적용할 16진수 색. 기본값은 `#FFFFFF`입니다.
- **link: string, uri**: 구성 요소를 다른 다이어그램 또는 외부 웹사이트로 연결할 URL. `blueprint://` 또는 `https://` 형식 중 하나를 사용할 수 있습니다.
- **locked: boolean**: 웹 인터페이스를 통해 포지션 변경을 허용할지 여부 결정. 기본값은 `false`입니다.

[1]: https://developers.cloudcraft.co/
[2]: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
[3]: /ko/cloudcraft/faq/scan-error-aws-china-region/