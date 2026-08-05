---
aliases:
- /ko/security/application_security/threats/setup/compatibility/ruby
title: Ruby 호환성 요구 사항
---

## App 및 API Protection 기능

다음 App 및 API Protection 기능은 지정된 트레이서 버전의 Ruby 라이브러리에서 지원됩니다.

| App 및 API Protection 기능                  | 최소 Ruby 트레이서 버전 |
| -------------------------------------------------- | --------------------------- |
| Threat Detection                                   | 1.9.0                       |
| Threat Protection                                  | 1.11.0                      |
| 차단된 요청에 대한 응답 사용자 지정             | 1.15.0                      |
| 자동 사용자 활동 이벤트 추적             | 1.14.0                      |
| API Security                                       | 2.17.0                      |

Ruby에서 모든 지원되는 App 및 API Protection 기능을 사용하려면 최소 트레이서 버전이 2.17.0이어야 합니다.

### 지원되는 배포 유형

| 유형              | 위협 탐지 지원 |
|------------------ | ------------------------ |
| Docker            | {{< X >}}                |
| Kubernetes        | {{< X >}}                |
| Amazon ECS        | {{< X >}}                |
| AWS Fargate       | {{< X >}}                |
| AWS Lambda        |                          |
| Google Cloud Run  |                          |

## 언어 및 프레임워크 호환성

### 지원되는 Ruby 인터프리터

Datadog Ruby 트레이싱 라이브러리는 오픈 소스입니다. 자세한 내용은 [GitHub 리포지토리][1]를 참조하세요.

- MRI 버전 2.5~3.5
- JRuby 버전 9.2.21.0+ 및 9.4

다음 아키텍처에서 지원됩니다.

- Linux (GNU) x86-64, aarch64
- Alpine Linux (musl) x86-64, aarch64
- macOS (Darwin) x86-64, arm64

App 및 API Protection 기능을 사용하려면 Datadog Agent 버전이 v7.41.1 이상이어야 합니다.

## Integrations

Ruby 트레이서는 다음 프레임워크, ORM 및 라이브러리를 지원합니다.

### 웹 및 API 프레임워크

- Rails
- Sinatra
- Grape

### ORMs

- ActiveRecord

### HTTP 클라이언트

- Faraday
- Excon
- RestClient

### 기타

- GraphQL
- Rack


[1]: https://github.com/DataDog/dd-trace-rb