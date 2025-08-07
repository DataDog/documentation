---
app_id: auth0
categories:
- 인시던트
- 로그 수집
- security
custom_kind: 통합
description: Auth0 이벤트를 확인하고 분석하세요.
media: []
supported_os:
- linux
- 윈도우즈(Windows)
- macos
title: Auth0
---
## 개요

Auth0은 개발팀을 위한 ID 플랫폼으로, 개발자와 기업이 애플리케이션을 보호하는 데 필요한 빌딩 블록을 제공합니다.

이 통합은 Auth0의 로그 스트리밍을 활용하여 로그를 Datadog에 직접 보냅니다. 로그는 Auth0에서 생성될 때 실시간으로 전송되어 고객에게 Auth0 테넌트에 대한 최신 정보를 제공합니다. 이 통합의 주요 이점 중 하나는 트렌드를 식별하기 위해 데이터를 수집하고 시각화하는 기능입니다. 엔지니어링 팀은 이를 사용하여 오류율과 트래픽 데이터를 시각화합니다. 보안팀은 이를 사용하여 인증 트래픽을 시각화하고 위험도가 높은 액션에 대한 경고를 설정합니다.

### 주요 사용 사례

#### 활동을 ID 데이터와 상호 연관시켜 트렌드 파악

ID 데이터는 누가 어떤 활동을 수행했는지에 대한 중요한 인사이트를 제공합니다. 이를 통해 팀은 시스템 전반의 사용자 행동을 더 잘 이해할 수 있습니다.

#### 시스템 아키텍처 및 개발에 대한 결정

시간 경과에 따른 ID 트렌드를 추적함으로써 팀은 제품 개발 및 시스템 아키텍처에 대해 정보에 입각한 결정을 내릴 수 있습니다. 예를 들어 팀은 최대 로그인 시간, 인증 활동 및 지리적 활동 추적을 기반으로 개발 우선 순위를 지정할 수 있습니다.

#### Quickly respond to performance and security incidents

ID 정보를 사용하여 보안 및 성능 사고를 신속하게 식별할 수 있습니다. 예를 들어 로그인 시도 실패가 급증하면 ID 시스템을 표적으로 삼는 가장 일반적인 위협 중 하나인 크리덴셜 스터핑 공격이 진행 중임을 나타낼 수 있습니다.

보안 팀은 임계값을 구성하여 의심스러운 이벤트에 대해 알리는 경고를 설정할 수 있고, 보안 사고에 신속하게 대응할 수 있습니다.

## 설정

All configuration happens on the [Auth0 Dashboard](https://manage.auth0.com).

1. Log in to the [Auth0 Dashboard](https://manage.auth0.com).

1. **Logs** > **Streams**로 이동합니다.

1. **+ Create Stream**을 클릭합니다.

1. Datadog을 선택하고 새 Datadog 이벤트 스트림의 고유한 이름을 입력합니다.

1. 다음 화면에서 Datadog 이벤트 스트림에 대해 다음 설정을 제공합니다.

   | Setting           | Description                                                |
   | ---------------- | ---------------------------------------------------------- |
   | `API Key`        | Enter your [Datadog API key](https://app.datadoghq.com/organization-settings/api-keys).                             |
   | `Region`            | Your [Datadog site](https://docs.datadoghq.com/getting_started/site/). For example, `EU` for app.datadoghq.eu, `US1` for app.datadoghq.com, and `US3` for us3.datadoghq.com. |

1. Save를 클릭하세요.

Auth0이 다음 테넌트 로그를 작성하면 Datadog에서 소스 및 서비스가 `auth0`로 설정된 해당 로그 이벤트의 복사본을 받습니다.

### 검증

Datadog에서 로그 보기

1. **Logs** > **Livetail**로 이동합니다.
1. `source:auth0`를 설정해 Auth0 로그를 확인합니다.

## 수집한 데이터

### 로그 수집

Auth0 logs are collected and sent to Datadog. The types of logs that could be returned are outlined in the [Log Event Type Codes](https://auth0.com/docs/logs/references/log-event-type-codes).

### Metrics

Auth0는 메트릭을 포함하지 않습니다.

### 서비스 점검

Auth0는 서비스 점검을 포함하지 않습니다.

### 이벤트

Auth0는 이벤트를 포함하지 않습니다.

## 트러블슈팅

Need help? Contact [Datadog support](https://docs.datadoghq.com/help/).
Read more about this integration in our [blog post](https://www.datadoghq.com/blog/monitor-auth0-with-datadog/).