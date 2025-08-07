---
app_id: pliant
categories:
- 자동화
- compliance
- 알림
- 오케스트레이션
- 프로비저닝
custom_kind: 통합
description: Pliant.io를 통한 IT 프로세스 자동화
integration_version: 1.0.0
media: []
supported_os:
- linux
- 윈도우즈(Windows)
- macos
title: Pliant
---
## 개요

Pliant.io는 로우코드 자동화 워크플로우를 통해 Datadog 알림을 개선하여 진정한 폐쇄형 루프 자동화 솔루션을 만듭니다. 이를 통해 트러블슈팅, 진단 및 자동화된 문제 해결이 가능합니다.

For more integration information, check out the [Pliant](https://pliant.io/) site.

예를 들면 다음과 같습니다:

- 서비스 다시 시작
- 로드 밸런서 설정
- 시스템 프로비저닝
- 디스크 지우기/스토리지 재프로비저닝
- 부하에 대한 대응으로 추가 VM 또는 컨테이너 노드 프로비저닝
- 낮은 부하 시 리소스 할당 해제

## 설정

### 설치

Datadog 알림에서 트리거하려는 워크플로를 하나 이상 만듭니다.

### 설정

#### Pliant

1. **Pliant API 키 만들기** - Pliant에 로그인하고 화면 오른쪽 상단의 사용자 이름을 클릭하면 메뉴가 표시됩니다. "API Keys"를 클릭합니다.

![API Key Menu step1](https://raw.githubusercontent.com/DataDog/integrations-extras/master/pliant/images/step1.png)

2. API 키 화면에서 화면 오른쪽 상단의 "+ Create"를 클릭하고 새 API 키의 제목을 지정합니다. 저장을 클릭하고 API 키를 메모해 두면 테이블에 추가됩니다.

![Create API Key step2](https://raw.githubusercontent.com/DataDog/integrations-extras/master/pliant/images/step2.png)

**Datadog에서 트리거할 Pliant 워크플로우 만들기**

1. Pliant에서 워크플로 탭으로 이동합니다. "+ Create" 및 "Create Flow"를 클릭하여 새 워크플로를 만듭니다. 팝업에서 워크플로의 제목을 지정하고 "Create"를 클릭하여 편집기를 새 워크플로로 실행합니다.

![Create Flow step1-a-](https://raw.githubusercontent.com/DataDog/integrations-extras/master/pliant/images/step1-a-.png)

2. Populate the workflow with actions to take upon receiving the Datadog trigger.

이 예제 워크플로는 "RestartHost"라고 불리며 Datadog 데이터에서 호스트를 다시 시작하여 이 워크플로를 트리거합니다.

이 워크플로는 트리거하는 요청 본문에 따라 처음에 할당된 입력 변수를 사용하여 실행됩니다. 워크플로는 입력 정보를 사용하여 원하는 인프라스트럭처 자동화 작업을 트리거/수행할 수 있습니다. 이 예에서는 Datadog가 특정 파라미터로 자동화 워크플로우를 트리거하는 상황에서 SSH로 호스트를 다시 시작합니다.

- Datadog에서 전송된 데이터로 채워지는 입력 변수를 추가하려면 워크플로 시작 부분에 있는 "확장" 아이콘을 클릭하여 변수 패널을 엽니다. 일치하는 **입력** 변수를 만들려면 모든 입력 변수를 동일한 빈 따옴표(`""`)로 설정합니다. 기본적으로 Datadog는 다음 데이터를 전송합니다.
  ```
  body
  last_updated
  event_type
  title
  date
  org
  id
  ```

초기화되는 추가 출력 변수(`host`, `meta`, `ip`)도 있습니다. 워크플로는 이러한 출력 변수를 할당하고 완료 시 결과 값을 출력합니다. 또한 워크플로의 로직 내에서 내부적으로 사용할 입력 변수도 출력 변수도 아닌 변수를 지정할 수도 있습니다.

![Expand](https://raw.githubusercontent.com/DataDog/integrations-extras/master/pliant/images/expand.png)

3. Datadog에서 HTTP 요청으로 트리거하는 데 사용되는 Pliant 워크플로우의 엔드포인트를 가져오려면 워크플로우 시작 부분에서 "확장" 아이콘을 클릭합니다.

"cURL" > "Temporary Bearer Token"을 클릭하고 방금 생성한 API 키를 선택합니다.

![curl](https://raw.githubusercontent.com/DataDog/integrations-extras/master/pliant/images/curl.png)

![select key](https://raw.githubusercontent.com/DataDog/integrations-extras/master/pliant/images/selectDDkey.png)

Your endpoint is enclosed in double quotes and resembles: ***https://\<YOUR_PLIANT_INSTANCE>/api/v1/trigger/\<YOUR_PLIANT_USERNAME>/User/\<PATH_TO_WORKFLOW>/\<WORKFLOW_NOW>?sync=true&api_key=\<YOUR_API_KEY>***

![endpoint](https://raw.githubusercontent.com/DataDog/integrations-extras/master/pliant/images/endpoint.png)

큰따옴표로 묶인 전체 URL을 복사합니다. 쿼리 파라미터를 포함할 수 있으며 ***https***로 시작합니다. 큰따옴표는 포함하지 마세요.

#### Datadog 설정

1. Datadog 을 열고 왼쪽 사이드바에서 **Integrations** > **Integrations**를 클릭합니다.
   ![integrations](https://raw.githubusercontent.com/DataDog/integrations-extras/master/pliant/images/integrations_.png)

1. 검색 입력창에 "webhooks"을 입력하고 **웹훅** 항목을 클릭하면 설정 창이 나타납니다.
   ![webhookSearch](https://raw.githubusercontent.com/DataDog/integrations-extras/master/pliant/images/webhook_Search.png)

1. "webhooks"로 스크롤합니다. **새로 만들기**를 클릭하여 Pliant 워크플로에 연결할 새 웹훅을 추가합니다. 먼저 "name" 필드에 웹훅의 이름을 지정합니다. 이 예에서는 *RestartHost*라는 이름을 사용합니다.
   ![webhooksConfig2](https://raw.githubusercontent.com/DataDog/integrations-extras/master/pliant/images/webhooksConfig3.png)

4단계에서 복사한 URL을 붙여넣습니다. 예시:

```
https://<YOUR_PLIANT_INSTANCE>/API/v1/trigger/<YOUR_PLIANT_USERNAME>/User/<PATH_TO_WORKFLOW>/<WORKFLOW_NOW>?sync=true&api_key=<YOUR_API_KEY>
```

이를 웹훅 양식의 ***URL*** 필드에 붙여넣습니다.

![webhookForm](https://raw.githubusercontent.com/DataDog/integrations-extras/master/pliant/images/webhookForm.png)

요청 페이로드는 미리 설정되어 있습니다. "ENCODE AS FORM" 상자를 선택하고 저장을 클릭합니다.

`@webhook-RestartHost`의 수신자를 추가하여 Datadog의 모든 알림에 이 통합을 추가합니다. 모니터가 이 알림을 트리거하면 웹훅이 Pliant 워크플로우를 트리거하고 입력 변수가 Datadog에서 Pliant로 전송됩니다.

## 수집한 데이터

### Metrics

Pliant 통합은 메트릭을 제공하지 않습니다.

### 서비스 점검

Pliant 통합에는 서비스 점검이 포함되어 있지 않습니다.

### 이벤트

Pliant 통합에는 이벤트가 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.