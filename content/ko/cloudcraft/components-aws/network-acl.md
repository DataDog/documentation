---
title: Network ACL
---

## 개요

네트워크 ACL 컴포넌트를 사용하여 Amazon Web Services 아키텍처의 네트워크 액세스 제어 목록을 시각화하세요.

{{< img src="cloudcraft/components-aws/network-acl/component-network-acl-diagram.png" alt="'네트워크 ACL' AWS 컴포넌트를 보여주는 아이소메트릭 Cloudcraft 다이어그램의 스크린샷." responsive="true" style="width:60%;">}}

## 도구 모음

도구 모음을 사용해 구성 요소를 구성하고 사용자 지정할 수 있습니다. 다음 옵션을 사용할 수 있습니다.

- **Visibility**: 다이어그램에서 컴포넌트의 가시성을 전환합니다.
- **Color**: 구성 요소와 강조 항목에 적용할 색을 선택을 선택합니다. 2D와 3D 보기에 같은 색을 적용하거나 각각 다른 색을 선택할 수 있습니다.
- **Name**: NACL에 이름을 지정합니다.
- **Shape**: 컴포넌트의 모양을 선택합니다.
- **Padding**: 컴포넌트 내부의 공간을 늘리거나 줄입니다.
- **Rules**: NACL에 대한 인바운드 및 아웃바운드 규칙을 확인합니다.

## API

[Cloudcraft API][1]를 사용해 프로그래밍을 통해 액세스하여 JSON 개체의 아키텍처 다이어그램을 렌더링할 수 있습니다.

### 스키마

다음은 네트워크 ACL 컴포넌트의 JSON 예입니다.

```json
{
    "type": "networkacl",
    "id": "acl-0mqj0d4dxpmf9iru3",
    "arn": "arn:aws:ec2:us-east-1:762056483071:network-acl/acl-0mqj0d4dxpmf9iru3",
    "region": "us-east-1",
    "visible": true,
    "name": "acl-0mqj0d4dxpmf9iru3",
    "shape": "rectangular",
    "padding": 2,
    "nodes": [
        "1ae68ef4-f3cb-4e07-8660-2a4a4bc30e36",
        "subnet-0752f314ffbf0126e"
    ],
    "inboundRules": [
        {
            "ruleNumber": 100,
            "protocol": "-1",
            "portRange": "0",
            "target": "0.0.0.0/0",
            "targetType": "ip",
            "access": "allow"
        },
        {
            "ruleNumber": 32767,
            "protocol": "-1",
            "portRange": "0",
            "target": "0.0.0.0/0",
            "targetType": "ip",
            "access": "deny"
        }
    ],
    "outboundRules": [
        {
            "ruleNumber": 100,
            "protocol": "-1",
            "portRange": "0",
            "target": "0.0.0.0/0",
            "targetType": "ip",
            "access": "allow"
        },
        {
            "ruleNumber": 32767,
            "protocol": "-1",
            "portRange": "0",
            "target": "0.0.0.0/0",
            "targetType": "ip",
            "access": "deny"
        }
    ],
    "color": {
        "isometric": "#5698ff",
        "2d": "#5698ff"
    },
    "link": "https://aws.amazon.com/",
    "locked": true
}
```

- **type: string**: 구성 요소 유형입니다.
- **id: 문자열**: 문자열 `acl-` 뒤에 무작위 17자리 영숫자 문자열이 오는 컴포넌트의 고유 식별자.
- **arn: string**: AWS 구성 요소 내 전역 고유 식별자([Amazon Resource Names][2]).
- **region: 문자열**: 컴포넌트에 대한 AWS 리전. `cn-` 리전을 제외한 모든 글로벌 리전이 지원됩니다.
- **visible: 부울**: `false`이면, 컴포넌트가 다이어그램에서 반투명해집니다. 기본값은 `true`.
- **name: 문자열**: NACL 이름.
- **shape: 문자열**: 컴포넌트의 모양. `dynamic` 또는 `rectangular`를 사용할 수 있으며, 기본값은 `retangular`.
- **padding: 숫자**: 컴포넌트의 패딩 값. 기본값은 `2`.
- **nodes: 배열**: NACL 내부에 있는 컴포넌트 ID의 배열.
- **inboundRules: 배열**: NACL 내부 컴포넌트의 수신 트래픽에 대한 규칙.
  - **ruleNumber: 숫자**: NACL의 규칙 번호.
  - **protocol: 문자열**: 규칙에 대한 프로토콜. "모두"를 의미하는 `-1` 또는 특정 프로토콜 사용 가능.
  - **portRange: 문자열**: 트래픽에 대한 수신 포트 또는 포트 범위.
  - **target: 문자열**: 트래픽 소스(CIDR 범위).
  - **targetType: 문자열**: 규칙에 대한 대상 유형. 허용 값은 `ip` 또는 `ipv6`.
  - **access: 문자열**: 규칙에 대한 액세스 유형. 허용 값은 `allow` 또는 `deny`.
- **outboundRules: 문자열**: NACL 내부 컴포넌트의 발신 트래픽에 대한 규칙.
  - **ruleNumber: 숫자**: NACL의 규칙 번호.
  - **protocol: 문자열**: 규칙에 대한 프로토콜. "모두"를 의미하는 `-1` 또는 특정 프로토콜 사용 가능.
  - **portRange: 문자열**: 트래픽에 대한 수신 포트 또는 포트 범위.
  - **target: 문자열**: 트래픽의 목적지(CIDR 범위).
  - **targetType: 문자열**: 규칙의 대상 유형. 허용 값은 `ip` 또는 `ipv6`.
  - **access: 문자열**: 규칙에 대한 액세스 유형. 허용 값은 `allow` 또는 `deny`.
- **color: object**: 구성 요소에 적용할 색
  - **isometric: string**: 3D 보기에서 구성 요소에 적용할 색입니다. 16진수 색이어야 합니다. 기본값은 `#ECECED`입니다.
  - **2d: string**: 2D 보기에서 구성 요소에 적용할 색입니다. 16진수 색이어야 합니다. 기본값은 `#CC2264`입니다.
- **link: uri**: `blueprint://ID` 형식을 사용해 구성 요소를 다른 다이어그램으로 연결하거나 `https://LINK` 형식을 사용해 외부 웹사이트로 연결합니다.
- **locked: boolean**: `true`로 설정하면 애플리케이션을 사용해 변경한 항목은 잠금 해제될 때까지 비활성화 상태입니다.

[1]: /ko/cloudcraft/api/
[2]: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html