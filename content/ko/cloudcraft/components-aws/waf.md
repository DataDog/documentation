---
title: WAF 구성 요소
---
## 개요

WAF 구성 요소를 사용하여 Amazon Web Services 아키텍처에서 웹 애플리케이션 방화벽을 시각화합니다.

{{< img src="cloudcraft/components-aws/waf/component-waf-diagram.png" alt="상호 연결된 AWS 구성 요소를 보여주는 아이소메트릭 Cloudcraft 다이어그램 스크린샷." responsive="true" style="width:60%;">}}

## 도구 모음

도구 모음을 사용해 구성 요소를 구성하고 사용자 지정할 수 있습니다. 다음 옵션을 사용할 수 있습니다.

-  **Color**: 구성 요소 바디를 채울 색상과 심볼을 강조할 색상을 선택합니다. 2D와 3D 보기에 같은 색을 적용하거나 각각 다른 색을 선택할 수 있습니다.
-  **Rules & Groups**: 웹 ACL당 원하는 규칙과 그룹 수를 입력합니다.
-  **Requests (millions/mo)**: WAF가 매달 받는 웹 요청 수를 백만 단위로 입력합니다.

## API

[Cloudcraft API][1]를 사용해 프로그래밍을 통해 액세스하여 JSON 개체의 아키텍처 다이어그램을 렌더링할 수 있습니다.

### 스키마

다음은 WAF 구성 요소의 JSON 객체 예입니다.

```json
{
    "type": "waf",
    "id": "7334ebd8-e980-45c6-9211-e8f090089c6e",
    "arn": "arn:aws:wafv2:us-east-1:746399320916:global/webacl/webacl-test-cdn/793709d6-e353-4cce-aeb7-b1fa5d8845d4",
    "region": "us-east-1",
    "mapPos": [-1,9],
    "aclCount": 5,
    "ruleCount": 5,
    "requestMillions": 5,
    "color": {
        "isometric": "#000000",
        "2d": "#000000"
    },
    "accentColor": {
        "isometric": "#f44336",
        "2d": "#f44336"
    },
    "link": "https://aws.amazon.com/waf/",
    "locked": true
}
```

- **type: string**: 구성 요소 유형. 이 구성 요소의 값은 `waf`(문자열)이어야 합니다.
- **id: string, uuid**: 구성 요소의 고유 식별자입니다. API에서는 내부적으로 UUID v4를 사용하나 다른 고유 식별자도 사용할 수 있습니다/
- **arn: string**: AWS 내 전역 고유 식별자([Amazon Resource Names][2])
- **region: string**: 구성 요소의 AWS 리전. [AWS China를 제외][3]한 글로벌 리전을 모두 지원합니다.
- **mapPos: array**: 청사진에 있는 구성 요소 포지션. X와 Y 좌표 쌍을 이용해 표현합니다.
- **aclCount: number**: 사용된 웹 액세스 제어 목록 수. 기본값은 `1`.
- **ruleCount: number**: 웹 액세스 제어 목록당 추가된 규칙 수. 기본값은 `0`.
- **requestMillions: number**: 매달 받는 웹 요청 수(백만 단위). 기본값은 `0`.
- **color: object**: 구성 요소에 적용할 색
  - **isometric: string**: 3D 보기에서 구성 요소 본체에 사용할 16진수 색상. 기본값은 `#607D8B`.
  - **2d: string**: 2D 보기에서 구성 요소 본체에 사용할 16진수 색상. 기본값은 `#D6242D`.
- **accentColor: object**: 구성 요소 로고의 강조 색
  - **isometric: string**: 3D 보기에서 구성 요소 로고에 사용할 16진수 색상. 기본값은 `#FF5722`.
  - **2d: string**: 2D 보기에서 구성 요소의 로고에 적용할 16진수 색. 기본값은 `#FFFFFF`입니다.
- **link: string, uri**: 구성 요소를 다른 다이어그램 또는 외부 웹사이트로 연결할 URL. `blueprint://` 또는 `https://` 형식 중 하나를 사용할 수 있습니다.
- **locked: boolean**: 웹 인터페이스를 통해 포지션 변경을 허용할지 여부 결정. 기본값은 `false`입니다.

[1]: https://developers.cloudcraft.co/
[2]: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
[3]: /ko/cloudcraft/faq/scan-error-aws-china-region/