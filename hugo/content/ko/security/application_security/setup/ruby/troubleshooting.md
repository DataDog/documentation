---
title: Ruby App and API Protection 문제 해결
---

## 일반적인 문제

### 표시되는 보안 신호 없음

1. Agent 버전 확인:
   - Datadog Agent v7.41.1 이상이 실행되고 있는지 확인합니다.
   - Agent 상태 확인: `datadog-agent status`
2. Ruby 트레이서 버전 확인:
   - Ruby 트레이서 v1.9.0 이상을 사용하고 있는지 확인합니다.
3. 구성 또는 환경 변수를 확인합니다.

#### 자동 계측을 사용하는 경우

- `DD_APPSEC_ENABLED`가 `true`로 설정되어 있는지 확인합니다.
- Agent가 다른 호스트 또는 포트에서 실행되는 경우 `DD_AGENT_HOST` 및 `DD_AGENT_PORT`를 설정합니다.
- `DD_SERVICE` 및 `DD_ENV`이 적절하게 구성되어 있는지 확인합니다.
- APM 기능을 사용하는 경우 `DD_APM_TRACING_ENABLED=true`를 확인합니다.

#### 구성 파일을 사용하는 경우

- 구성에서 `c.appsec.enabled`가 `true`로 설정되어 있는지 확인합니다.
- `c.tracing.instrument :rails` 및 `c.appsec.instrument :rails`가 구성에 추가되어 있는지 확인합니다.
- `c.service`가 설정되어 있는지 확인합니다.
- APM 기능을 사용하는 경우 `c.tracing.enabled`가 `true`로 설정되어 있는지 확인합니다.

### 성능 영향

1. 높은 지연 시간:
   - Agent 리소스 사용량을 확인합니다.
   - Agent 및 Datadog 간 네트워크 연결을 확인합니다.
   - 샘플링 비율을 조정하는 것을 고려합니다.

2. 높은 메모리 사용량:
   - 필요한 경우 Agent 리소스 한도를 조정합니다.

Ruby 트레이서와 관련된 성능 문제가 의심되는 경우 사용 환경과 해당 문제에 관한 상세 정보를 포함하여 [Datadog Ruby 트레이서 GitHub 리포지토리][4]에서 문제를 생성하세요.

### 여전히 문제가 있으신가요?

여전히 문제가 있는 경우,

1. [Application Security Monitoring 문제 해결 가이드][1]를 확인하세요.
2. [Ruby 트레이서 설명서][2]를 검토하세요.
3. [Datadog 지원팀][3]에 문의하세요.

[1]: /ko/security/application_security/troubleshooting
[2]: /ko/tracing/trace_collection/compatibility/ruby
[3]: /ko/help
[4]: https://github.com/DataDog/dd-trace-rb