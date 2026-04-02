---
categories:
- notifications
custom_kind: 통합
dependencies: []
description: 레거시 Pingdom 모니터링 엔드포인트의 기존 설정을 관리하고 마이그레이션하세요.
doc_link: https://docs.datadoghq.com/integrations/pingdom/
draft: false
git_integration_title: pingdom
has_logo: true
integration_id: ''
integration_title: Pingdom Legacy API (V2.1)
integration_version: ''
is_public: true
manifest_version: '1.0'
name: pingdom
public_title: Datadog-Pingdom Legacy API (V2.1) 통합
short_description: 레거시 Pingdom 모니터링 엔드포인트의 기존 설정을 관리하고 마이그레이션하세요.
team: 웹-통합
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

<div class="alert alert-warning">
이 통합은 더 이상 사용되지 않으며, 언제든지 지원이 중단될 수 있습니다. 대신 <a href="https://docs.datadoghq.com/통합/pingdom_v3/" class="alert-link">Datadog Pingdom V3 통합</a>을 사용하세요.
</div>

Datadog에서 Track Pingdom 사용자 중심 성능 메트릭을 통해 다른 관련 이벤트와 메트릭을 연계합니다.

Datadog는 Pingdom 웹사이트의 설정한 모든 사이트에 대해 `response_time` 메트릭을 추적합니다.

Pingdom 이벤트는 관련 [통합 상태 모니터][1]를 설정하여 추가할 수 있습니다.

<div class="alert alert-info">
메트릭은 Starter(스타터) 레벨 이상의 Pingdom 고객만 가져올 수 있습니다.
</div>

## 설정

### 설치

1. Pingdom 통합 타일을 엽니다.
2. Pingdom 계정의 사용자 아이디와 비밀번호를 입력합니다. (팀 계정이 있는 경우 자신의 자격 증명을 사용하고 점검을 가져올 계정을 지정할 수 있습니다.)
3. 점검을 선택 해제하여 일부 점검을 무시하고 일부 태그를 생성될 이벤트에 추가할 수 있습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "pingdom" >}}


### 이벤트

Pingdom 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검

Pingdom 통합은 트랜잭션 점검을 가져오고 이를 서비스 점검으로 보고합니다.

`pingdom.status` 점검의 경우 다음 표는 어떤 Pingdom 트랜잭션 점검 결과가 어떤 Datadog 서비스 점검 결과와 연결되어 있는지 설명합니다.

| Datadog 상태 | Pingdom 상태      |
| -------------- | ------------------- |
| `OK`           | `up`                |
| `CRITICAL`     | `down`              |
| `WARNING`      | `unconfirmed_down`  |
| `UNKNOWN`      | `unknown`, `paused` |

## 트러블슈팅

### 사용자 이름 또는 비밀번호 업데이트 시 오류 발생

Pingdom 자격 증명을 저장할 때 다음과 같은 오류가 표시될 수 있습니다.

`“There was an issue while testing your Pingdom configuration: Not permitted for account type”`.

**(선택 사항) 쿼리할 계정** ** 필드에 Pingdom 계정 소유자의 이메일 주소를 추가한 다음 저장합니다.

[1]: https://app.datadoghq.com/monitors/create/integration
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/pingdom/pingdom_metadata.csv