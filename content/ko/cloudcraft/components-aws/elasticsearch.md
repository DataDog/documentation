---
title: Elasticsearch 구성 요소
---
## 개요

Elasticsearch 구성 요소를 사용하여 Amazon Web Services 아키텍처에서 Elasticsearch 클러스터를 표시하세요.

{{< img src="cloudcraft/components-aws/elasticsearch/component-elasticsearch-diagram.png" alt="'Elasticsearch' AWS 구성 요소를 표시하는 등축도법 Cloudcraft 다이어그램의 스크린샷" responsive="true" style="width:60%;">}}

## 도구 모음

도구 모음을 사용해 구성 요소를 구성하고 사용자 지정할 수 있습니다. 다음 옵션을 사용할 수 있습니다.

- **Color**: 구성 요소와 강조 항목에 적용할 사전 정의된 색상을 선택하거나 16진수 값을 입력할 수 있습니다. 구성 요소에서는 2D와 3D 모두에 같은 색상을 사용하거나 각각에 다른 색상을 적용할 수 있습니다.
- **Role**: Elasticsearch 인스턴스의 규칙을 선택합니다.
- **Instance count**: Elasticsearch 클러스터의 인스턴스 수를 입력합니다.
- **Instance type**: 인스턴스 유형을 선택합니다. 인스턴스 유형을 변경하면 툴바에 표시되는 하드웨어 세부 정보가 하이퍼바이저에서 사용되는 항목을 반영합니다.
- *Size**: 인스턴스의 크기를 선택합니다. 인스턴스 유형과 마찬가지로 도구 모음에 표시되는 하드웨어 세부 정보가 크기를 반영합니다.
- **Billing option**: 인스턴스에서 사용하는 가격 모델

## API

[Cloudcraft API][1]를 사용해 프로그래밍을 통해 액세스하여 JSON 개체의 아키텍처 다이어그램을 렌더링할 수 있습니다.

### 스키마

다음은 Elasticsearch 구성 요소의 JSON 객체 예시입니다.

```json
{
  "type": "es",
  "id": "5f8df311-0641-410e-b427-89b7dc5e5b84",
  "region": "us-west-2",
  "mapPos": [0,10],
  "role": "data",
  "instanceCount": 2,
  "instanceType": "t3",
  "instanceSize": "medium",
  "billingOptions": {
    "type": "ri",
    "leaseContractLength": 36,
    "purchaseOption": "Partial Upfront"
  },
  "color": {
    "isometric": "#ececed",
    "2d": "#693cc5"
  },
  "accentColor": {
    "isometric": "#4286c5",
    "2d": "#ffffff"
  },
  "link": "https://aws.amazon.com/elasticsearch-service/",
  "locked": true
}
```

- **type: es**: 구성 요소의 유형입니다.
- **id: string**: `uuid` 형식의 구성 요소 고유 식별자
- **region: string**:: Elasticsearch 인스턴스가 배포된 AWS 지역입니다. `cn-` 지역을 제외한 전 세계 모든 지역이 지원됩니다.
- **mapPos: [number, number]**: 청사진에 있는 구성 요소의 포지션. X와 Y 좌표 쌍을 이용해 표현됩니다.
- **role: string**: Elasticsearch 인스턴스에 사용되는 역할입니다. 허용되는 값은 `data` 및 `master`입니다.
- **instanceCount: number**: Elasticsearch 클러스터의 인스턴스 수입니다. 기본값은 `1`입니다.
- **instanceType: string**: 인스턴스 유형입니다. 자세한 정보는 [`instanceType`에 허용되는 값](#accepted-values-for-instancetype)을 참조하세요.
- **instanceSize: string**: 인스턴스 규모. 자세한 정보는 [`instanceSize`에서 허용된 값](#accepted-values-for-instancesize)을 참고하세요.
- **billingOptions: object**: 인스턴스에 사용되는 요금 모델. 자세한 내용은 [`billingOptions`에 허용된 값](#accepted-values-for-billingoptions)을 참고하세요.
- **color: object**: 구성 요소에 적용할 색
  - **isometric: string**: 3D 보기에서 구성 요소에 적용할 색. 16진수 색이어야 합니다.
  - **2d: string**: 2D 보기에서 구성 요소에 적용할 색. 16진수 색이어야 합니다.
- **accentColor: object**: 블록에 있는 구성 요소 로고의 강조색
  - **isometric: string**: 3D 보기의 구성 요소 강조색. 16진수 색이어야 합니다.
  - **2d: string**: 2D 보기의 구성 요소 강조색. 16진수 색이어야 합니다.
- **link: uri**: `blueprint://ID` 형식을 사용하여 구성 요소를 다른 다이어그램에 연결하거나 `https://LINK` 형식을 사용하여 외부 웹사이트에 연결합니다.
- **locked: boolean**: `true`로 설정하면 애플리케이션을 사용해 변경한 항목은 잠금 해제될 때까지 비활성화 상태입니다.

Elasticsearch 구성 요소는 [VPC][2], [보안 그룹][3], [서브넷][4]에 추가할 수 있습니다.

## `instanceType`에 허용된 값

`instanceType` 키에서는 다음 값을 허용합니다.

```
c4, c5, i2, i3, m3, m4, m5, r3, r4, r5, t2, t3, ultrawarm1
```

## `instanceSize`에서 허용된 값

`instanceSize` 키에서는 다음 값을 허용합니다.

```
micro, small, medium, large, xlarge, 2xlarge, 4xlarge, 8xlarge, 9xlarge, 10xlarge, 12xlarge, 16xlarge, 18xlarge, 24xlarge, 32xlarge
```

## `billingOptions`에 허용된 값

`billingOptions` 키는 Cloudcraft 웹 애플리케이션에서 허용하는 모든 빌링 옵션을 지원합니다.

- 온디맨드
- 예약된 인스턴스

`billingOptions` 개체에서 각 옵션이 다르게 표현됩니다.

### 온디맨드

```json
{
  "billingOptions": {
    "type": "od",
    "utilization": 1
  }
}
```

- **type: od**: 온디맨드의 요금 옵션은 항상 `od`입니다.
- **utilization: number**: 부동 소수점은 해당 월의 인스턴스 사용량을 표현합니다.

### 예약된 인스턴스

```json
{
  "billingOptions": {
    "type": "ri",
    "leaseContractLength": 36,
    "purchaseOption": "Partial Upfront"
  }
}
```

- **type: ri**: 예약된 인스턴스의 요금 옵션은 항상 `ri`입니다.
- **leaseContractLength: number**: 인스턴스가 예약된 기간. 허용되는 값은 `12` 또는 `36`입니다.
- **purchaseOption: string**: 인스턴스의 구매 옵션. 허용된 값은 `No Upfront`, `Partial Upfront`, `All Upfront`입니다.

[1]: https://developers.cloudcraft.co/
[2]: /ko/cloudcraft/components-aws/vpc/
[3]: /ko/cloudcraft/components-aws/security-group/
[4]: /ko/cloudcraft/components-aws/subnet/