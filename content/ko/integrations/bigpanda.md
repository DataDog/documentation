---
aliases: []
categories:
- 알림
- ai/ml
dependencies: []
description: PigPanda로 Datadog 알림의 상관 관계를 수립하고 실행 가능한 인시던트 생성하기
doc_link: https://docs.datadoghq.com/integrations/bigpanda/
draft: false
git_integration_title: bigpanda
has_logo: true
integration_id: ''
integration_title: BigPanda
integration_version: ''
is_public: true
kind: 통합
manifest_version: '1.0'
name: bigpanda
public_title: Datadog-BigPanda 통합
short_description: PigPanda 계정으로 Datadog 알림 보내기.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Datadog와 PigPanda를 연결하면 팀이 다음 장점을 누릴 수 있습니다.

- Datadog으로부터 알림을 받아 정보의 상관 관계 수립

## 설정

### 설치

Datadog 사이트에서 [통합 타이틀][1]을 사용해 PigPanda 통합을 설치할 수 있습니다.

### 설정

1. PigPanda 계정에서 Integrations 페이지로 이동하고 New Integration을 선택하세요.
2. _Datadog_ --> _Add Integration_으로 이동한 후 App Key를 생성하세요.
3. 생성된 Webhoo URL에 필요한 Access Token과 App Key가 포함되어 있습니다.
4. Datadog에서 PigPanda 타이틀로 이동해 _New Account_를 클릭하세요.
5. 원하는 **PigPanda Account Name**을 추가하세요. 이것이 알림 핸들 이름이 됩니다.
6. **Access Token**과 **App Key**를 해당 필드에 붙여 넣으세요.
7. **Endpoint Type**을 선택하세요. 계정의 리전을 선택하거나 커스텀 URL을 설정할 수 있습니다.
8. _Save_를 클릭하세요.

**참고**:
- 현재 PigPanda에서 지원하는 최대 계정 수는 5개입니다.
- **Route All Monitor Events** 옵션을 활성화하고 모니터 이벤트 전체를 자동으로 PigPanda에 보내려면 [Datadog 지원팀][2]으로 문의하세요. 기본값은 **@bigpanda-<account-name>**를 포함한 모니터 이벤트만 전송됩니다.

### 사용량

Datadog으로부터 이벤트를 수신하기 시작하면 BigPanda에서 인시던트를 생성합니다. 인시던트에는 트리거된 모니터와 알림의 원인 조건과 같은 정보가 포함되어 있습니다.
모니터에 변경 사항이 있으면 인시던트가 Active에서 Resolved로 변합니다. Datadog에서 BigPanda로 알림을 보내는 것을 중단하려면 통합 타이틀에서 해당 계정을 제거하세요.

## 수집한 데이터

### 메트릭

BigPanda 통합에는 메트릭이 포함되어 있지 않습니다.

### 이벤트

BigPanda 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 검사

BigPanda 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 고객지원][2]에 문의하세요.

[1]: https://app.datadoghq.com/integrations/bigpanda
[2]: https://docs.datadoghq.com/ko/help/