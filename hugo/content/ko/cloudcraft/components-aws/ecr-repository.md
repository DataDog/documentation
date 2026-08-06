---
title: ECR Repository 구성 요소
---
## 개요

ECR Repository 구성 요소를 사용하여 Amazon Web Services 아키텍처에서 컨테이너 리포지토리를 시각화할 수 있습니다.

{{< img src="cloudcraft/components-aws/ecr-repository/component-ecr-repository-diagram.png" alt="상호 연결된 AWS 구성 요소를 표시하는 등축도법 Cloudcraft 다이어그램 스크린샷" responsive="true" style="width:60%;">}}

## 도구 모음

도구 모음을 사용해 구성 요소를 구성하고 사용자 지정할 수 있습니다. 다음 옵션을 사용할 수 있습니다.

- **Color**: 구성 요소 바디를 채울 색상과 심볼을 강조할 색상을 선택합니다. 2D와 3D 보기에 같은 색을 적용하거나 각각 다른 색을 선택할 수 있습니다.
- **저장된 데이터(GB)**: 리포지토리에 저장된 데이터의 양을 입력합니다.
- **Private**: 리포지토리가 공개 또는 비공개인지 선택합니다.

## API

[Cloudcraft API][1]를 사용해 프로그래밍을 통해 액세스하여 JSON 개체의 아키텍처 다이어그램을 렌더링할 수 있습니다.

### 스키마

다음은 ECR Repository 구성 요소의 JSON 예시입니다.

```json
{
    "type": "ecr",
    "id": "15e88546-33f3-40d5-b88c-e7cdae335da8",
    "arn": "arn:aws:ecr:us-east-1:728720640411:repository/cloudcraft",
    "region": "us-east-1",
    "mapPos": [7.5,6],
    "storageGB": 1,
    "private": true,
    "color": {
        "isometric": "#ff9800",
        "2d": "#ff9800"
    },
    "accentColor": {
        "isometric": "#ffffff",
        "2d": "#ffffff"
    },
    "link": "https://aws.amazon.com/ecr/",
    "locked": true
}
```

- **type: string**: 구성 요소의 유형입니다. 이 구성 요소에 대해 `ecr` 값의 문자열이어야 합니다.
- **id: string, uuid**: 구성 요소의 고유 식별자입니다. API에서는 내부적으로 UUID v4를 사용하나 다른 고유 식별자도 사용할 수 있습니다/
- **arn: string**: AWS 내 전역 고유 식별자([Amazon Resource Names][2])
- **region: string**: 구성 요소의 Azure 지역. API가 [AWS 중국을 제외][3]한 글로벌 지역을 지원합니다.
- **mapPos: array**: 청사진에 있는 구성 요소 포지션. X와 Y 좌표 쌍을 이용해 표현합니다.
- **storageGB: number**: 레지스트리 내 리포지토리에 저장된 데이터 양으로 단위느 기가바이트입니다. 기본값은 `1`입니다.
- **private: boolean**: 리포지토리가 비공개임을 나타냅니다. 기본값은 `true`입니다.
- **color: object**: 구성 요소에 적용할 색
  - **isometric: string**: 3D 뷰에서 구성 요소 바디의 16진수 색상입니다. 기본값은 `#3F7DDE`입니다.
  - **2d: string**: 구성 요소의 2D 보기에 적용할 16진수 색. 기본값은 `#D86613`입니다.
- **accentColor: object**: 구성 요소 로고의 강조 색
  - **isometric: string**:: 3D 보기에서 구성 요소 로고의 16진수 색상입니다. 기본값은 `#052048`입니다.
  - **2d: string**: 2D 보기에서 구성 요소의 로고에 적용할 16진수 색. 기본값은 `#FFFFFF`입니다.
- **link: string, uri**: 구성 요소를 다른 다이어그램 또는 외부 웹사이트로 연결할 URL. `blueprint://` 또는 `https://` 형식 중 하나를 사용할 수 있습니다.
- **locked: boolean**: 웹 인터페이스를 통해 포지션 변경을 허용할지 여부 결정. 기본값은 `false`입니다.

[1]: https://developers.cloudcraft.co/
[2]: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
[3]: /ko/cloudcraft/faq/scan-error-aws-china-region/