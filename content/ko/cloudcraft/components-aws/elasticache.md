---
title: ElastiCache 구성 요소
---
## 개요

ElastiCache 구성 요소를 사용하여 Amazon Web Services 아키텍처의 인메모리 캐시 또는 데이터 저장소를 표현하세요.

{{< img src="cloudcraft/components-aws/elasticache/component-elasticache-diagram.png" alt="'ElastiCache' AWS 구성 요소를 표시하는 등축도법 Cloudcraft 다이어그램 스크린샷" responsive="true" style="width:60%;">}}

## 도구 모음

도구 모음을 사용해 구성 요소를 구성하고 사용자 지정할 수 있습니다. 다음 옵션을 사용할 수 있습니다.

- **Colors**: 미리 정의된 색상을 선택하거나 구성 요소의 색상과 액센트에 대한 16진수 값을 입력합니다. 구성 요소의 2D 보기와 3D 보기 모두에 동일한 색상을 사용하거나 각각 다른 색상을 사용할 수 있습니다.
- **Engine**: ElastiCache 인스턴스를 구동하는 데 사용되는 엔진을 선택합니다.
- **Instance type**: 인스턴스 유형을 선택합니다. 인스턴스 유형을 변경하면 툴바에 표시되는 하드웨어 세부 정보가 하이퍼바이저에서 사용되는 항목을 반영합니다.
- **Size**: ElastiCache 인스턴스의 크기를 선택합니다. 인스턴스 유형과 마찬가지로, 도구 모음에 표시되는 하드웨어 세부 정보가 크기를 반영하여 변경됩니다.
- **Billing option**: 인스턴스에서 사용하는 가격 모델

## API

[Cloudcraft API][1]를 사용해 프로그래밍을 통해 액세스하여 아키텍처 다이어그램을 JSON 개체로 렌더링할 수 있습니다.

### 스키마

다음은 ElastiCache 구성 요소의 JSON 객체 예시입니다.

```json
{
  "type": "elasticache",
  "id": "a1cebccc-d9ed-481f-b5e6-1088818ab2c6",
  "region": "us-east-1",
  "mapPos": [-1,12],
  "engine": "memcached",
  "instanceType": "m4",
  "instanceSize": "large",
  "billingOptions": {
    "type": "ri",
    "leaseContractLength": 36,
    "purchaseOption": "Heavy Utilization"
  },
  "color": {
    "isometric": "#d82f27",
    "2d": "#3b48cc"
  },
  "accentColor": {
    "isometric": "#ffffff",
    "2d": "#ffffff"
  },
  "link": "https://aws.amazon.com/elasticache/",
  "locked": true
}
```

- **type: elasticache**: 구성 요소 유형입니다.
- **id: string**: `uuid` 형식의 구성 요소 고유 식별자
- **region: string**: RDS 인스턴스가 배포되는 AWS 리전. `cn-` 리전을 제외한 모든 리전을 지원합니다.
- **mapPos: [number, number]**: 청사진에 있는 구성 요소의 포지션. X와 Y 좌표 쌍을 이용해 표현됩니다.
- **engine: string**: ElastiCache 인스턴스에 사용되는 데이터베이스 엔진입니다. 허용되는 값은 `redis`와 `memcached`입니다.
- **instanceType: string**: 인스턴스 유형. 자세한 정보는 [`instanceType`에서 허용된 값](#accepted-values-for-instancetype)을 참고하세요.
- **instanceSize: string**: 인스턴스 규모. 자세한 정보는 [`instanceSize`에서 허용된 값](#accepted-values-for-instancesize)을 참고하세요.
- **billingOptions: object**: 인스턴스에 사용된 요금제 모델입니다. 자세한 내용은 [`instanceSize`에 허용되는 값](#accepted-values-for-billingoptions)을 참조하세요.
- **color: object**: 구성 요소에 적용할 색
  - **isometric: string**: 3D 보기에서 구성 요소에 적용할 색. 16진수 색이어야 합니다.
  - **2d: string**: 2D 보기에서 구성 요소에 적용할 색. 16진수 색이어야 합니다.
- **accentColor: object**: 블록에 있는 구성 요소 로고의 강조색
  - **isometric: string**: 3D 보기의 구성 요소 강조색. 16진수 색이어야 합니다.
  - **2d: string**: 2D 보기의 구성 요소 강조색. 16진수 색이어야 합니다.
- **link: uri**: `blueprint://ID` 형식을 사용해 구성 요소를 다른 다이어그램으로 연결하거나 `https://LINK` 형식을 사용해 외부 웹사이트로 연결합니다.
- **locked: boolean**: True로 설정하면 애플리케이션을 사용해 변경한 항목은 잠금 해제될 때까지 비활성화 상태입니다.

ElastiCache 구성 요소는 [VPC][2], [보안 그룹][3], [서브넷][4]에 추가할 수 있습니다.

## `instanceType`에 허용된 값

`instanceType` 키에서는 다음 값을 허용합니다.

```
c1, m1, m2, m3, m4, m5, m6g, r3, r4, r5, r6g, t1, t2, t3
```

## `instanceSize`에서 허용된 값

`instanceSize` 키에서는 다음 값을 허용합니다.

```
micro, small, medium, large, xlarge, 2xlarge, 4xlarge, 8xlarge, 10xlarge, 12xlarge, 16xlarge, 24xlarge, 32xlarge
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
    "purchaseOption": "Heavy Utilization"
  }
}
```

- **type: ri**: 예약된 인스턴스의 요금 옵션은 항상 `ri`입니다.
- **leaseContractLength: number**: 인스턴스가 예약된 기간. 허용되는 값은 `12` 또는 `36`입니다.
- **purchaseOption: string**: 인스턴스에 대한 구매 옵션입니다. 허용되는 값은 `Heavy Utilization`, `No Upfront`, `Partial Upfront`, `All Upfront`입니다.

[1]: https://developers.cloudcraft.co/
[2]: /ko/cloudcraft/components-aws/vpc/
[3]: /ko/cloudcraft/components-aws/security-group/
[4]: /ko/cloudcraft/components-aws/subnet/