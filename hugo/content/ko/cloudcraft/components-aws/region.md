---
title: Region
---

## 개요

Region 컴포넌트를 사용하여 Amazon Web Services 아키텍처의 물리적 위치를 나타냅니다.

{{< img src="cloudcraft/components-aws/region/component-region-diagram.png" alt="'Region' AWS component를 보여주는 아이소메트릭 Cloudcraft 다이어그램의 스크린샷." responsive="true" style="width:60%;">}}

## 도구 모음

도구 모음을 사용해 구성 요소를 구성하고 사용자 지정할 수 있습니다. 다음 옵션을 사용할 수 있습니다.

- **Visibility*. 다이어그램에서 컴포넌트의 가시성을 전환합니다.
- **Color**: 구성 요소 바디를 채울 색상과 심볼을 강조할 색상을 선택합니다. 2D와 3D 보기에 같은 색을 적용하거나 각각 다른 색을 선택할 수 있습니다.
- **Padding**. 컴포넌트 테두리와 해당 내용 사이의 간격을 조정하려면 패딩 값을 입력합니다.

## API

[Cloudcraft API][1]를 사용해 프로그래밍을 통해 액세스하여 JSON 개체의 아키텍처 다이어그램을 렌더링할 수 있습니다.

### 스키마

다음은 Region 컴포넌트의 JSON 예입니다.

```json
{
    "type": "region",
    "id": "1063814395",
    "arn":"arn:aws::us-east-1::",
    "region": "us-east-1",
    "visible": true,
    "padding": 2,
    "shape": "rectangular",
    "nodes": [
        "6acd2c2e-60aa-44bd-93e8-aca071ef85ff"
    ],
    "color": {
        "isometric": "#a991e1",
        "2d": "#a991e1"
    },
    "link": "https://aws.amazon.com/",
    "locked": true
}
```

- **type: string**: 구성 요소 유형입니다.
- **id: 문자열**: 임의의 10자리 숫자로 구성된 컴포넌트의 고유 식별자입니다.
- **arn: 문자열**: [Amazon 리소스 이름](https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html)으로 알려진 AWS 내 컴포넌트의 전역적으로 고유한 식별자입니다. Region 컴포넌트는 항상 `arn:aws::region::`과 동일한 더미 ARN 값을 사용합니다.
- **region: 문자열**: AWS 지역 자체. `cn-` 지역을 제외한 모든 전역 지역이 지원됩니다.
- **visible: 부울**: `false`이면 컴포넌트는 다이어그램에서 반투명해집니다.
- **padding: 숫자**: 컴포넌트의 패딩 값입니다.
- **shape: 문자열**: 컴포넌트의 모양. Region 컴포넌트는 `rectangular` 모양만 지원합니다.
- **nodes: 배열**: 지역 내부에 있는 노드 ID의 배열. 노드 ID의 형식은 `uuid`입니다.
- **color: object**: 구성 요소에 적용할 색
  - **isometric: string**: 3D 보기에서 구성 요소에 적용할 색입니다. 16진수 색이어야 합니다. 기본값은 `#ECECED`입니다.
  - **2d: string**: 2D 보기에서 구성 요소에 적용할 색입니다. 16진수 색이어야 합니다. 기본값은 `#CC2264`입니다.
- **link: uri**: `blueprint://ID` 형식을 사용해 구성 요소를 다른 다이어그램으로 연결하거나 `https://LINK` 형식을 사용해 외부 웹사이트로 연결합니다.
- **locked: boolean**: `true`로 설정하면 애플리케이션을 사용해 변경한 항목은 잠금 해제될 때까지 비활성화 상태입니다.