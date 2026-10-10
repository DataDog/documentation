---
code_lang: ruby
code_lang_weight: 30
title: 루비(Ruby) 호환성 요구 사항
type: multi-code-lang
---
## Code Security 기능 지원 {#code-security-capabilities-support}

다음은 지정된 트레이서 버전에서 Ruby 라이브러리가 지원하는 Code Security 기능입니다.

| Code Security 기능                    | 최소 Ruby 트레이서 버전 |
| ------------------------------------------- | ----------------------------|
| 런타임 Software Composition Analysis(SCA) | 1.11.0                      |
| 런타임 코드 분석(IAST)                | 지원되지 않음               |

<div class="alert alert-info">지원되지 않는 기능이나 사용 중인 Ruby 프레임워크에 대한 지원이 추가되기를 원하시면 알려주세요! 세부 정보를 보내려면 <a href="https://forms.gle/gHrxGQMEnAobukfn7">이 간단한 양식을 작성하세요</a>.</div>

### 지원되는 배포 유형 {#supported-deployment-types}
| 유형              | Runtime Software Composition Analysis(SCA) | 런타임 코드 분석(IAST)        |
|------------------ | ------------------------------------------- | ----------------------------------- |
| Docker            | <i class="icon-check-bold"></i>             | <i class="icon-check-bold"></i>     |
| Kubernetes        | <i class="icon-check-bold"></i>             | <i class="icon-check-bold"></i>     |
| Amazon ECS        | <i class="icon-check-bold"></i>             | <i class="icon-check-bold"></i>     |
| AWS Fargate       | <i class="icon-check-bold"></i>             | 미리 보기(1.15.0)                    |
| AWS Lambda        |                                             |                                     |

## 언어 및 프레임워크 호환성 {#language-and-framework-compatibility}

**지원되는 Ruby 인터프리터**
Datadog Ruby 라이브러리는 다음 Ruby 인터프리터에 대해 최신 gem을 지원합니다.

- [MRI][2] 버전 2.5 이상

다음 아키텍처에서 지원됩니다.
- Linux (GNU) x86-64, aarch64
- Alpine Linux (musl) x86-64, aarch64
- macOS (Darwin) x86-64, arm64

### 지원되는 웹 서버 {#supported-web-servers}
- HTTP 요청 태그(상태 코드, 메서드 등)
- 분산 트레이싱을 사용하여 애플리케이션의 공격 흐름 확인

##### Code Security 기능 참고 사항 {#code-security-capability-notes}
- **Runtime Software Composition Analysis(SCA)**는 모든 프레임워크에서 지원됩니다.
- **Runtime Code Analysis(IAST)**는 지원되지 않습니다

### 네트워킹 프레임워크 호환성 {#networking-framework-compatibility}

##### Code Security 기능 참고 사항 {#code-security-capability-notes-1}
- **Runtime Software Composition Analysis(SCA)**는 모든 프레임워크에서 지원됩니다.
- **Runtime Code Analysis(IAST)**는 지원되지 않습니다

### Datastore 호환성{#data-store-compatibility}

**Datastore 추적은 다음을 제공합니다.**

- 쿼리 정보(예: 새니타이즈된 쿼리 문자열)
- 오류 및 스택 트레이스 캡처

##### Code Security 기능 참고 사항 {#code-security-capability-notes-2}
- **Runtime Software Composition Analysis(SCA)**는 모든 데이터베이스에서 지원됩니다.
- **Runtime Code Analysis(IAST)**는 지원되지 않습니다

[1]: /ko/tracing/trace_collection/compatibility/ruby/
[2]: https://www.ruby-lang.org/