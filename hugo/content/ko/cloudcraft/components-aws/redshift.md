---
title: Redshift 컴포넌트
---
## 개요

Redshift 컴포넌트를 사용하여 Amazon Web Services 아키텍처의 데이터 웨어하우스를 나타냅니다.

{{< img src="cloudcraft/components-aws/redshift/component-redshift-diagram.png" alt="'Redshift' AWS 컴포넌트를 보여주는 등축도법 Cloudcraft 다이어그램의 스크린샷." responsive="true" style="width:60%;">}}

## 도구 모음

도구 모음을 사용해 구성 요소를 구성하고 사용자 지정할 수 있습니다. 다음 옵션을 사용할 수 있습니다.

- **색상r**: 구성 요소와 강조 항목에 적용할 사전 정의된 색상을 선택하거나 16진수 값을 입력할 수 있습니다. 구성 요소에서는 2D와 3D 모두에 같은 색상을 사용하거나 각각에 다른 색상을 적용할 수 있습니다.
- **Nodes**: Redshift 클러스터의 노드 수를 입력합니다.
- **Instance type**: Redshift 인스턴스 종류를 선택합니다. 인스턴스 종류를 바꾸면 툴바에 나타나는 하드웨어 상세 정보가 하이퍼바이저에서 사용되는 것을 반영하도록 변경됩니다.
- **Size**: Redshift 인스턴스의 규모를 선택합니다. 인스턴스 종류와 마찬가지로, 툴바에 나타나는 하드웨어 상세 정보가 규모를 반영하도록 변경됩니다.

## API

[Cloudcraft API][1]를 사용해 프로그래밍을 통해 액세스하여 JSON 개체의 아키텍처 다이어그램을 렌더링할 수 있습니다.

### 스키마

다음은 Redshift 컴포넌트의 JSON 예시입니다.

```json
{
  "type": "redshift",
  "id": "c1aa0ae1-8e0d-466d-a8a8-51cc9b8a6b35",
  "region": "us-west-2",
  "mapPos": [1,2],
  "nodeCount": 2,
  "instanceType": "ra3",
  "instanceSize": "xlplus",
  "color": {
    "isometric": "#80b1dc",
    "2d": "#000000"
  },
  "accentColor": {
    "isometric": "#03a9f4",
    "2d": "#03a9f4"
  },
  "link": "https://aws.amazon.com/redshift/",
  "locked": true
}
```

- **type: redshift**: 컴포넌트 유형입니다.
- **id: string**: `uuid` 형식의 구성 요소 고유 식별자
- **region: string**: Redshift 인스턴스가 배포되는 AWS 리전입니다. `cn-` 리전을 제외한 모든 글로벌 리전을 지원합니다.
- **mapPos: [number, number]**: 청사진에 있는 컴포넌트의 포지션. X와 Y 좌표 쌍을 이용해 표현됩니다.
- **nodeCount: number**: Redshift 클러스터의 노드 수입니다. 기본값은 `1`입니다.
- **instanceType: string**: 인스턴스 유형. 자세한 정보는 [`instanceType`에서 허용된 값](#accepted-values-for-instancetype)을 참고하세요.
- **instanceSize: string**: 인스턴스 규모. 자세한 정보는 [`instanceSize`에서 허용된 값](#accepted-values-for-instancesize)을 참고하세요.
- **color: object**: 구성 요소에 적용할 색
  - **isometric: string**: 3D 보기에서 구성 요소에 적용할 색. 16진수 색이어야 합니다.
  - **2d: string**: 2D 보기에서 구성 요소에 적용할 색. 16진수 색이어야 합니다.
- **accentColor: object**: 블록에 있는 구성 요소 로고의 강조색
  - **isometric: string**: 3D 보기의 구성 요소 강조색. 16진수 색이어야 합니다.
  - **2d: string**: 2D 보기의 구성 요소 강조색. 16진수 색이어야 합니다.
- **link: uri**: `blueprint://ID` 형식을 사용해 구성 요소를 다른 다이어그램으로 연결하거나 `https://LINK` 형식을 사용해 외부 웹사이트로 연결합니다.
- **locked: boolean**: `true`로 설정하면 어플리케이션을 사용한 컴포넌트 변경은 잠금 해제 시까지 비활성화됩니다.

Redshift 컴포넌트를 [VPCs][2], [보안 그룹][3], [서브넷][4]에 추가할 수 있습니다.

## `instanceType`에 허용된 값

`instanceType` 키에서는 다음 값을 허용합니다.

```
dc1, dc2, ds1, ds2, ra3
```

## `instanceSize`에서 허용된 값

`instanceSize` 키에서는 다음 값을 허용합니다.

```
large, xlarge, xlplus, 4xlarge, 8xlarge, 16xlarge
```

[1]: https://developers.cloudcraft.co/
[2]: /ko/cloudcraft/components-aws/vpc/
[3]: /ko/cloudcraft/components-aws/security-group/
[4]: /ko/cloudcraft/components-aws/subnet/