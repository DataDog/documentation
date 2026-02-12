---
title: EC2 구성 요소
---
## 개요

EC2 구성 요소를 사용해 Amazon Web Services 아키텍처의 Elastic Compute 인스턴스를 표시합니다.

{{< img src="cloudcraft/components-aws/ec2/component-ec2-diagram.png" alt="EC2 AWS 구성 요소를 보여주는 아이소메트릭 Cloudcraft 다이어그램의 스크린샷." responsive="true" style="width:60%;">}}

## 도구 모음

도구 모음을 사용해 구성 요소를 구성하고 사용자 지정할 수 있습니다. 다음 옵션을 사용할 수 있습니다.

- **Color**: 미리 정의된 색상을 선택하거나 구성 요소와 강조 색상의 16진수 값을 입력합니다. 2D 및 3D 보기에 같은 색상을 사용하거나 각각 다른 색상을 사용할 수 있습니다.
- **Transparency**: EC2 블록이 단색인지 반투명인지 선택합니다.
- **Platform**: Elastic Compute 인스턴스에 사용할 플랫폼을 선택합니다. 라이선스 요금이 있는 플랫폼을 선택하는 경우, 비용 견적이 요금에 포함됩니다.
- **Instance type**: 인스턴스 종류. 인스턴스 종류를 바꾸면 툴바에 나타나는 하드웨어 상세 정보가 하이퍼바이저에서 사용되는 것을 반영하도록 변경됩니다.
- **Size**: 인스턴스 규모. 인스턴스 종류와 마찬가지로, 툴바에 나타나는 하드웨어 상세 정보가 규모를 반영하도록 변경됩니다.
- **Billing option**: 인스턴스에 사용된 유료 모델입니다. 현재 지원되는 옵션은 On-Demand, Reserved Instance, Spot Instance입니다.

## API

[Cloudcraft API][1]를 사용해 프로그래밍을 통해 액세스하여 JSON 객체의 아키텍처 다이어그램을 렌더링할 수 있습니다.

### 스키마

다음은 EC2 블록의 JSON 예입니다.

```json
{
  "type": "ec2",
  "id": "d2ee1b7c-4368-4384-81dc-19c9c7866623",
  "region": "us-west-1",
  "mapPos": [3, 9],
  "transparent": false,
  "platform": "linux",
  "instanceType": "t3a",
  "instanceSize": "xlarge",
  "billingOptions": {
    "type": "si",
    "utilization": 0.42
  },
  "color": {
    "isometric": "#e6e7e8",
    "2d": "#e6e7e8"
  },
  "accentColor": {
    "isometric": "#4286c5",
    "2d": "#4286c5"
  },
  "link": "blueprint://ae6349e1-fa15-41c8-8e89-d201f9fa3cc9",
  "locked": true
}
```

- **type: ec2**: 구성 요소 유형
- **id: string**: `uuid` 형식의 구성 요소 고유 식별자
- **region: string**: EC2 인스턴스가 배포된 AWS 지역. `cn-` 지역을 제외한 모든 글로벌 지역이 지원됩니다.
- **mapPos: [number, number]**: 청사진에 있는 구성 요소의 포지션. X와 Y 좌표 쌍을 이용해 표현됩니다.
- **transparent: boolean**: `true`이면 구성 요소가 3D 보기에서 반투명하게 표시됨. 2D 보기에는 적용되지 않습니다.
- **platform: string**: 인스턴스에 사용된 플랫폼. 자세한 내용은 [플랫폼에 허용되는 값](#accepted-values-for-the-platform)을 참조하세요.
- **instanceType: string**: 인스턴스 유형. 자세한 내용은 [instanceType에 허용되는 값](#accepted-values-for-instancetype)을 참조하세요.
- **instanceSize: string**: 인스턴스 크기. 자세한 내용은 [instanceSize에 허용되는 값](#accepted-values-for-instancesize)을 참조하세요.
- **billingOptions: object**: AWS에서 인스턴스에 사용되는 유료 모델. 자세한 내용은 [billingOptions에 허용되는 값](#accepted-values-for-billingoptions)을 참조하세요.
- **color: object**: 구성 요소에 적용할 색
  - **isometric: string**: 3D 보기에서 구성 요소에 적용할 색. 16진수 색이어야 합니다.
  - **2d: string**: 2D 보기에서 구성 요소에 적용할 색. 16진수 색이어야 합니다.
- **accentColor: object**: 블록 상단의 구성 요소 로고 디스플레이에 적용할 강조 색입니다.
  - **isometric: string**: 3D 보기의 구성 요소 강조색. 16진수 색이어야 합니다.
  - **2d: string**: 2D 보기의 구성 요소 강조색. 16진수 색이어야 합니다.
- **link: uri**: `blueprint://ID` 형식을 사용해 구성 요소를 다른 다이어그램으로 연결하거나 `https://LINK` 형식을 사용해 외부 웹사이트로 연결합니다.
- **locked: boolean**: `true`로 설정하면 어플리케이션을 통한 컴포넌트 변경은 잠금 해제 시까지 비활성화됩니다.

EC2 구성 요소는 [VPC][2], [보안 그룹][3], [자동 확장 그룹][4], [서브넷][5]에 추가할 수 있습니다.

## `platform`에 허용되는 값

`platform` 키는 다음 값을 허용합니다.

```
linux, linuxSQL, linuxSQLWeb, linuxSQLEnterprise, rhel, sles, mswin, mswinSQL, mswinSQLWeb, mswinSQLEnterprise
```

## `instanceType`에 허용된 값

`instanceType` 키에서는 다음 값을 허용합니다.

```
a1, c1, c3, c4, c5, c5a, c5ad, c5d, c5n, c6g, c6gd, c6gn, cc2, cr1, d2, d3, d3en, f1, g2, g3, g3s, g4ad, g4dn, h1, hs1, i2, i3, i3en, inf1, m1, m2, m3, m4, m5, m5a, m5ad, m5d, m5dn, m5n, m5zn, m6g, m6gd, p2, p3, p3dn, p4d, r3, r4, r5, r5a, r5ad, r5b, r5d, r5dn, r5n, r6g, r6gd, t1, t2, t3, t3a, t4g, x1, x1e, z1d
```

## `instanceSize`에서 허용된 값

`instanceSize` 키에서는 다음 값을 허용합니다.

```
micro, nano, small, medium, large, xlarge, 2xlarge, 3xlarge, 4xlarge, 6xlarge, 8xlarge, 9xlarge,  10xlarge, 12xlarge, 16xlarge, 18xlarge, 24xlarge, 32xlarge, metal
```

## `billingOptions`에 허용된 값

`billingOptions` 키는 Cloudcraft에서 허용하는 모든 청구 옵션을 지원합니다.

- 온디맨드
- 예약된 인스턴스
- 스팟 인스턴스

각 옵션은 `billingOptions` 객체에서 다르게 표현됩니다.

### 온디맨드

```
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

```
{
  "billingOptions": {
    "type": "ri",
    "leaseContractLength": 36,
    "purchaseOption": "Partial Upfront",
    "offeringClass": "convertible"
  }
}
```

- **type: ri**: 예약된 인스턴스의 요금 옵션은 항상 `ri`입니다.
- **leaseContractLength: number**: 인스턴스가 예약된 기간. 허용값은 12 또는 36.
- **purchaseOption: string**: 인스턴스의 구매 옵션. 허용된 값은 `No Upfront`, `Partial Upfront`, `All Upfront`입니다.
- **offeringClass: string**: 인스턴스 제공 유형. 허용값은 `standard` 및 `convertible`

### 스팟 인스턴스

```
{
  "billingOptions": {
    "type": "si",
    "utilization": 0.42
  }
}
```

- **type: si**: Spot Instance의 청구 옵션 값은 항상 `si`.
- **utilization: number**: 부동 소수점은 해당 월의 인스턴스 사용량을 표현합니다.

[1]: https://developers.cloudcraft.co/
[2]: /ko/cloudcraft/components-aws/vpc/
[3]: /ko/cloudcraft/components-aws/security-group/
[4]: /ko/cloudcraft/components-aws/auto-scaling-group/
[5]: /ko/cloudcraft/components-aws/subnet/