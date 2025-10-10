---
title: Security Group 구성 요소
---
## 개요

Security Group 구성 요소를 사용하여 Amazon Web 서비스 아키텍처에서 보안 그룹을 표시할 수 있습니다.

{{< img src="cloudcraft/components-AWS/security-group/component-security-group-diagram.png" alt="'Security Group' AWS 구성 요소를 보여주는 등축도법 Cloudcraft 다이어그램의 스크린샷." responsive="true" style="width:60%;">}}

## 도구 모음

도구 모음을 사용해 구성 요소를 구성하고 사용자 지정할 수 있습니다. 다음 옵션을 사용할 수 있습니다.

- **색상r**: 구성 요소와 강조 항목에 적용할 사전 정의된 색상을 선택하거나 16진수 값을 입력할 수 있습니다. 구성 요소에서는 2D와 3D 모두에 같은 색상을 사용하거나 각각에 다른 색상을 적용할 수 있습니다.
- **Name**: 보안 그룹의 이름을 만듭니다.
- **Shape**: dynamic 또는 rectangular 중 보안 그룹의 모양을 선택합니다.
- **Padding**: 보안 그룹 내 공간의 양을 늘리거나 줄입니다.
- **Inbound/Outbound**: 보안 그룹 내 구성 요소에 대한 인바운드 및 아웃바운드 규칙을 보거나, 제거하거나 추가합니다.

## API

[Cloudcraft API][1]를 사용해 프로그래밍을 통해 액세스하여 JSON 개체의 아키텍처 다이어그램을 렌더링할 수 있습니다.

### 스키마

다음은 Security Group 구성 요소의 JSON 예시입니다.

```json
{
  "type": "sg",
  "id": "a699dbeb-2fe5-49a5-beea-b24695c247e4",
  "region": "US-EAST-1",
  "name": "cloudcraft-sg-example",
  "모양": "동적",
  "패딩": 1.5,
  "노드": [
    "e99bad32-82f6-49a7-b145-11963a3d7775"
  ],
  "inboundRules": [
    {
      "portRange": "80",
      "프로토콜": "tcp",
      "target": "bc883fec-e97c-4c27-b9a7-64e3d154452b",
      "targetType": "sg",
      "설명": "HTTP 트래픽",
      "hidden": false
    },
    {
      "portRange": "443",
      "프로토콜": "tcp",
      "target": "bc883fec-e97c-4c27-b9a7-64e3d154452b",
      "targetType": "sg",
      "설명": "HTTPS 트래픽",
      "hidden": false
    },
    {
      "portRange": "22",
      "프로토콜": "tcp",
      "target": "65e16268-d9ee-440a-9a4d-29b92520572e",
      "targetType": "sg",
      "설명": "바스티온 서버",
      "hidden": false
    }
  ],
  "아웃바운드 규칙": [
    {
      "portRange": "25",
      "프로토콜": "tcp",
      "target": "199.255.192.0/22",
      "targetType": "IP",
      "설명": "AWS SES",
      "hidden": false
    }
  ],
  "color": {
    "아이소메트릭": "#4286c5",
    "2d": "#4286c5"
  },
  "link": "blueprint://33a8bf46-7326-4999-ba0a-789bcd94f0a2",
  "locked": true
}
```

- **type: sg**: 구성 요소 유형입니다.
- **id: string**: `uuid` 형식의 구성 요소 고유 식별자
- **region: string**: 보안 그룹이 배포되는 AWS 지역입니다. `cn-` 지역을 제외한 전 세계 모든 지역이 지원됩니다.
- **name: string**: 보안 그룹의 이름입니다.
- **shape: string**: 보안 그룹의 모양입니다. 허용되는 값은 `dynamic` 또는 `rectangular`입니다.
- **padding: number**: 보안 그룹의 내부 패딩입니다. 기본값은 `1.5`입니다.
- **nodes: array**: 보안 그룹 내부 구성 요소입니다. 자세한 내용은 [`nodes`](#accepted-values-for-nodes)에 허용되는 값]을 참조하세요.
- **inboundRules: array**: 이 보안 그룹 내 구성 요소에 대한 인바운드 트래픽에 대한 규칙입니다. 자세한 내용은 [`inboundRules` 및 `outboundRules`에 허용되는 값](#accepted-values-for-inboundrules-and-outboundrules)을 참조하세요.
- **outboundRules: array**: 이 보안 그룹 내 구성 요소에 대한 아웃바운드 트래픽에 대한 규칙입니다. 자세한 내용은 [`inboundRules` 및 `outboundRules`에 허용되는 값](#accepted-values-for-inboundrules-and-outboundrules)을 참조하세요.
- **color: object**: 구성 요소에 적용할 색
  - **isometric: string**: 3D 보기에서 구성 요소에 적용할 색. 16진수 색이어야 합니다.
  - **2d: string**: 2D 보기에서 구성 요소에 적용할 색. 16진수 색이어야 합니다.
- **link: uri**: `blueprint://ID` 형식을 사용해 구성 요소를 다른 다이어그램으로 연결하거나 `https://LINK` 형식을 사용해 외부 웹사이트로 연결합니다.
- **locked: boolean**: `true`로 설정하면 애플리케이션을 사용해 변경한 항목은 잠금 해제될 때까지 비활성화 상태입니다.

### `nodes`에 허용된 값

`nodes` 키는 보안 그룹 내 구성 요소에 대한 고유한 식별자 어레이를 허용합니다.

다음 AWS 구성 요소를 보안 그룹에 추가할 수 있습니다.

```
asg, ec2, lambda, efs, fsx, elb, rds, docdb, elasticache, redshift, es
```

AWS 구성 요소와 함께 다음 일반적인 구성 요소도 보안 그룹에 추가할 수 있습니다.

```
block, isotext, icon, image, area
```

### `inboundRules` 및 `outboundRules`에 허용되는 값

`inboundRules` 및 `outboundRules` 키는 JSON 객체로 표현되는 규칙을 통해 어레이를 허용합니다.

```json
{
  "inboundRules": [
    {
      "portRange": "22",
      "protocol": "tcp",
      "target": "192.0.2.0/24",
      "targetType": "ip",
      "description": "RFC 5737",
      "hidden": false
    }
  ],
  "outboundRules": [
    {
      "portRange": "25",
      "protocol": "tcp",
      "target": "199.255.192.0/22",
      "targetType": "ip",
      "description": "AWS SES",
      "hidden": false
    }
  ]
}

```

- **portRange: number**: 이 규칙에 영향을 받는 포트 번호입니다. 예를 들어 `42000-42222`처럼 다수의 포트 또는 단일 포트를 허용합니다.
- **protocol: string**: 이 규칙에 영향을 받는 네트워크 프로토콜입니다.
- **target: string**: 구성 요소의 트래픽 소스인 보안 그룹의 CIDR 또는 `id`입니다.
- **targetType: string**: `target`에 대해 사용되는 소스의 유형입니다. 허용되는 값은 `ip` 또는 `sg`입니다.
- **description: string**: 인바운드 또는 아웃바운드 규칙에 대한 간략한 설명입니다.
- **hidden: boolean**: `true`인 경우 인바운드 또는 아웃바운드 규칙이 다이어그램에 표시되지 않습니다. 표시되는 방법을 보려면 페이지 상단의 구성 요소 이미지를 참조하세요. 기본값은 `false`입니다.

[1]: https://developers.cloudcraft.co/