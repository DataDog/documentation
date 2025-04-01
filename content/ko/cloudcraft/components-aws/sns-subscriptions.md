---
title: SNS 구독 구성 요소
---
## 개요

SNS 구독 구성 요소를 사용하여 Amazon Web Service 아키텍처에서 SNS 구독을 시각화할 수 있습니다.

{{< img src="cloudcraft/components-aws/sns-subscriptions/component-sns-subscriptions-diagram.png" alt="상호 연결된 AWS 구성 요소를 보여주는 등축도법 Cloudcraft 다이어그램 스크린샷" responsive="true" style="width:60%;">}}

## 도구 모음

도구 모음을 사용해 구성 요소를 구성하고 사용자 지정할 수 있습니다. 다음 옵션을 사용할 수 있습니다.

- **Color**: 구성 요소 바디를 채울 색상과 심볼을 강조할 색상을 선택합니다. 2D와 3D 보기에 같은 색을 적용하거나 각각 다른 색을 선택할 수 있습니다.
- **Notifications/mo (K)**: 월별 알림 수를 천 단위로 입력합니다.
- **Notification type**: SNS 구성 요소의 알림 유형을 선택합니다.

## API

[Cloudcraft API][1]를 사용해 프로그래밍을 통해 액세스하여 JSON 개체의 아키텍처 다이어그램을 렌더링할 수 있습니다.

### 스키마

다음은 SNS 구독 구성 요소의 JSON 개체 예시입니다.

```
{
    "type": "snssubscriptions",
    "id": "ba29170b-5015-419f-b617-86fe788bafcb",
    "region": "us-east-1",
    "mapPos": [0,8],
    "notifications": 1,
    "notificationType": "mobile"
    "color": {
        "isometric": "#ECECED",
        "2d": "#CC2264"
    },
    "accentColor": {
        "isometric": "#4286C5",
        "2d": "#FFFFFF"
    },
    "link": "https://aws.amazon.com/sns/",
    "locked": true
}
```

- **type: string**: 구성 요소 유형입니다. 이 구성 요소에서는 문자열 값 `snssubscriptions`이어야 합니다.
- **id: string, uuid**: 구성 요소의 고유 식별자입니다. API에서는 내부적으로 UUID v4를 사용하나 다른 고유 식별자도 사용할 수 있습니다/
- **arn: string**: AWS 내 전역 고유 식별자([Amazon Resource Names][2])
- **region: string**: 구성 요소의 AWS 리전. [AWS China를 제외][3]한 글로벌 리전을 모두 지원합니다.
- **mapPos: array**: 청사진에 있는 구성 요소 포지션. X와 Y 좌표 쌍을 이용해 표현합니다.
- **notifications: number**: 천 단위로 표현한 월별 알림 수입니다. 기본값은 `1`입니다.
- **notificationType: string**: NSN 알림 유형입니다. 자세한 정보는 [`notificationType`에 허용되는 값](#accepted-values-for-notificationType)을 참고하세요. 기본값은 `mobile`입니다.
- **color: object**: 구성 요소에 적용할 색
  - **isometric: string**: 구성 요소의 3D 보기에 적용할 16진수 색. 기본값은 `#ECECED`입니다.
  - **2d: string**: 구성 요소 바디의 2D 보기에 적용할 16진수 색. 기본값은 `#CC2264`입니다.
- **accentColor: object**: 구성 요소 로고의 강조 색
  - **isometric: string**: 3D 보기에서 구성 요소 로고에 적용할 16진수 색. 기본값은 `#4286C5`입니다.
  - **2d: string**: 2D 보기에서 구성 요소의 로고에 적용할 16진수 색. 기본값은 `#FFFFFF`입니다.
- **link: string, uri**: 구성 요소를 다른 다이어그램 또는 외부 웹사이트로 연결할 URL. `blueprint://` 또는 `https://` 형식 중 하나를 사용할 수 있습니다.
- **locked: boolean**: 웹 인터페이스를 통해 포지션 변경을 허용할지 여부 결정. 기본값은 `false`입니다.

## `notificationType`에 허용된 값

`notificationType` 키는 다음 값을 허용합니다.

```
mobile, sms, email, emil-json, http, https, sqs, lambda
```

[1]: https://developers.cloudcraft.co/
[2]: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
[3]: https://help.cloudcraft.co/article/110-scan-error-aws-china-region