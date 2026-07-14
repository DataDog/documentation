---
title: RDS 구성 요소
---
## 개요

RDS 구성 요소를 사용해 Amazon Web Services 아키텍처의 관계 데이터베이스 표시하기

{{< img src="cloudcraft/components-aws/rds/component-rds-diagram.png" alt="'RDS' AWS 구성 요소를 보여주는 등축도법 Cloudcraft 다이어그램 스크린샷" responsive="true" style="width:60%;">}}

## 도구 모음
도구 모음을 사용해 구성 요소를 구성하고 사용자 지정할 수 있습니다. 다음 옵션을 사용할 수 있습니다.

- **색상r**: 구성 요소와 강조 항목에 적용할 사전 정의된 색상을 선택하거나 16진수 값을 입력할 수 있습니다. 구성 요소에서는 2D와 3D 모두에 같은 색상을 사용하거나 각각에 다른 색상을 적용할 수 있습니다.
- **Role**: RDS 인스턴스 역할
- **Engine**: RDS 인스턴스에서 사용되는 데이터베이스 엔진 선택합니다.
- **Min capacity unit**: Aurora 용량 단위 최소량. 서버리스 역할에서만 사용할 수 있습니다.
- **Max capacity unit**: Aurora 용량 단위 최대량. 서버리스 역할에서만 사용할 수 있습니다.
- **Instance type**: 인스턴스 종류. 인스턴스 종류를 바꾸면 툴바에 나타나는 하드웨어 상세 정보가 하이퍼바이저에서 사용되는 것을 반영하도록 변경됩니다.
- **Size**: 인스턴스 규모. 인스턴스 종류와 마찬가지로, 툴바에 나타나는 하드웨어 상세 정보가 규모를 반영하도록 변경됩니다.
- **Deployment option**: 인스턴스 배포 유형. Single-AZ 또는 Multi-AZ Standby.
- **Billing option**: 인스턴스에서 사용하는 가격 모델

## API

[Cloudcraft API][1]를 사용해 프로그래밍을 통해 액세스하여 JSON 개체의 아키텍처 다이어그램을 렌더링할 수 있습니다.

### 스키마

RDS 구성 요소의 JSON 예시입니다.

```json
{
  "type": "rds",
  "id": "f184b0b6-c732-4881-841c-68477f7eb365",
  "region": "us-east-1",
  "mapPos": [-3,3],
  "role": "primary",
  "engine": "mariadb",
  "instanceType": "r6g",
  "instanceSize": "large",
  "multiAZ": false,
  "minimumCapacityUnit": 2,
  "maximumCapacityUnit": 2,
  "billingOptions": {
    "type": "ri",
    "leaseContractLength": 12,
    "purchaseOption": "No Upfront"
  },
  "color": {
    "isometric": "#ececed",
    "2d": "#3b48cc"
  },
  "accentColor": {
    "isometric": "#4286c5",
    "2d": "#ffffff"
  },
  "link": "https://aws.amazon.com/rds/",
  "locked": true
}
```

- **type: rds**: 구성 요소 유형
- **id: string**: `uuid` 형식의 구성 요소 고유 식별자
- **region: string**: RDS 인스턴스가 배포되는 AWS 리전. `cn-` 리전을 제외한 모든 리전을 지원합니다.
- **mapPos: [number, number]**: 청사진에 있는 구성 요소의 포지션. X와 Y 좌표 쌍을 이용해 표현됩니다.
- **role: string**: RDS 인스턴스에 사용할 역할. 허용하는 값에는 `primary`, `standby`, `readReplica`, `serverless`가 있습니다.
- **engine: string**: RDS 인스턴스용 데이터베이스 엔진. 자세한 정보는 [`engine`에서 허용된 값](#accepted-values-for-engine)을 참고하세요.
- **instanceType: string**: 인스턴스 유형. 자세한 정보는 [`instanceType`에서 허용된 값](#accepted-values-for-instancetype)을 참고하세요.
- **instanceSize: string**: 인스턴스 규모. 자세한 정보는 [`instanceSize`에서 허용된 값](#accepted-values-for-instancesize)을 참고하세요.
- **multiAZ: boolean**: `true`인 경우, 데이터베이스가 여러 AWS 가용 영역에 배포됩니다. `role`을 `serverless`로 설정하면 이용할 수 없습니다.
- **minimumCapacityUnit: number**: Aurora 용량 단위의 최소량. `role`이 `serverless`로 설정된 경우에만 적용할 수 있습니다.
- **maximumCapacityUnit: number**: Aurora 용량 단위의 최대량. `role`이 `serverless`로 설정된 경우에만 적용할 수 있습니다.
- **billingOptions: object**: 인스턴스에 사용되는 요금 모델. 자세한 내용은 [`billingOptions`에 허용된 값](#accepted-values-for-billingoptions)을 참고하세요.
- **color: object**: 구성 요소에 적용할 색
  - **isometric: string**: 3D 보기에서 구성 요소에 적용할 색. 16진수 색이어야 합니다.
  - **2d: string**: 2D 보기에서 구성 요소에 적용할 색. 16진수 색이어야 합니다.
- **accentColor: object**: 블록에 있는 구성 요소 로고의 강조색
  - **isometric: string**: 3D 보기의 구성 요소 강조색. 16진수 색이어야 합니다.
  - **2d: string**: 2D 보기의 구성 요소 강조색. 16진수 색이어야 합니다.
- **link: uri**: `blueprint://ID` 형식을 사용해 구성 요소를 다른 다이어그램으로 연결하거나 `https://LINK` 형식을 사용해 외부 웹사이트로 연결합니다.
- **locked: boolean**: `true`로 설정하면 애플리케이션을 사용해 변경한 항목은 잠금 해제될 때까지 비활성화 상태입니다.

RDS 구성 요소를 [VPCs][2], [보안 그룹][3], [서브넷4]에 추가할 수 있습니다.

## `engine`에 허용된 값

`engine` 키는 다음 값을 허용합니다.

```
none, aurora-mysql, aurora-postgresql, mysql, mariadb, postgresql, oracle, sqlserver-ex, sqlserver-web, sqlserver-se, sqlserver-ee
```

**참고**: `role`이 `serverless`로 설정되어 있으면 `engine` 키에서 `none`, `aurora-mysql`, `aurora-postgresql`만 허용합니다.

## `instanceType`에 허용된 값

`instanceType` 키에서는 다음 값을 허용합니다.

```
m1, m2, m3, m4, m6g, r5, r5b, r6g, t1, t2, t3, x1, x1e, z1d
```

## `instanceSize`에서 허용된 값

`instanceSize` 키에서는 다음 값을 허용합니다.

```
micro, small, medium, large, xlarge, 2xlarge, 4xlarge, 8xlarge, 12xlarge, 16xlarge, 24xlarge, 32xlarge
```

## `billingOptions`에 허용된 값

`billingOptions` 키는 Cloudcraft 웹 애플리케이션에서 허용하는 현재 청구 옵션을 모두 허용합니다.

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