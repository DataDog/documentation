---
code_lang: 파이썬(Python)
code_lang_weight: 50
title: Python 호환성 요구 사항
type: multi-code-lang
---
## 애플리케이션 보안 기능 지원

다음은 지정된 트레이서 버전에 대해 Python 라이브러리에서 지원되는 애플리케이션 보안 기능입니다.

| 애플리케이션 보안 기능  | 최소 Python 트레이서 버전 |
| -------------------------------- | ----------------------------|
| 위협 탐지 | 1.9.0   |
| Threat Protection | 1.10.0  |
| 차단된 요청에 대한 응답 사용자 지정 | 1.19.0 |
| 소프트웨어 구성 분석(SCA) | 1.5.0  |
| 코드 보안         |  평가판  |
| 자동 사용자 활동 이벤트 추적 | 1.17.0 |
| API Security | 2.6.0 |

**참고**: Threat Protection를 사용하려면 명시된 트레이스 최소 버전에 포함된 [Remote Configuration][2]을 활성화해야 합니다.

### 지원되는 배포 유형
| 유형        | 위협 탐지 지원 | 소프트웨어 구성 분석 |
|-------------|--------------------------|-------------------------------|
| Docker      | {{< X >}}                | {{< X >}}                     |
| 쿠버네티스(Kubernetes)  | {{< X >}}                | {{< X >}}                     |
| Amazon ECS  | {{< X >}}                | {{< X >}}                     |
| AWS Fargate | {{< X >}}                | {{< X >}}                     |
| AWS Lambda  | {{< X >}}                |                               |


## 언어 및 프레임워크 호환성

### 지원되는 Python 버전

Python Application Security Client 라이브러리는 다양한 버전의 라이브러리 및 Python 런타임 지원 수준을 명시하는 [버전 관리 정책][3]을 따릅니다.

다음 두 가지 릴리스 브랜치를 지원합니다.

| 릴리스    | 지원 레벨        |
|------------|----------------------|
| `<1`       | 유지 관리           |
| `>=1.0,<2` | 일반 가용성 |

라이브러리는 다음 런타임을 지원합니다.

| OS      | CPU                   | 런타임 | 런타임 버전 | 지원 ddtrace 버전 |
|---------|-----------------------|---------|-----------------|--------------------------|
| Linux   | x86-64, i686, AArch64 | CPython | 2.7, 3.5-3.11   | `<2`                     |
| MacOS   | Intel, Apple Silicon  | CPython | 2.7, 3.5-3.11   | `<2`                     |
| 윈도우즈(Windows) | 64비트, 32비트          | CPython | 2.7, 3.5-3.11   | `<2`                     |


### 웹 프레임워크 호환성

- 공격자 소스 HTTP 요청 세부 정보
- HTTP 요청 태그(상태 코드, 메소드 등)
- Distributed Tracing으로 애플리케이션을 통한 공격 플로 확인

##### Application Security 기능 노트
- **Software Composition Analysis**는 모든 프레임워크에서 지원됩니다.

### 지원 프레임워크


| 프레임워크                | 버전    | Threat Detection이 지원되나요? | Threat Protection이 지원되나요? |
| ------------------------ | ----------- | --------------- | ---------------------------------------------- |
| Django    | 1.8   |  {{< X >}} | {{< X >}}  |
| Flask     | 0.10  |  {{< X >}} | {{< X >}}  |

Flask에서는 쿼리 문자열을 지원하지 않습니다.

<div class="alert alert-info">원하는 프레임워크가 목록에 없다면 저희에게 알려주세요! <a href="https://forms.gle/gHrxGQMEnAobukfn7">간단한 양식을 작성하여 자세한 내용을 보내주세요</a>.</div>

### 데이터 스토어 호환성


**Datastore 추적은 다음을 제공합니다.**

- 요청에서 응답까지의 시간 측정
- 쿼리 정보(예: 보안 처리된(sanitized) 쿼리 문자열)
- 오류 및 스택 트레이스 캡처

##### Application Security 기능 노트
- **Software Composition Analysis**는 모든 프레임워크에서 지원됩니다.
- **Threat Protection**는 HTTP 요청(인풋) 레이어에서도 작동하므로, 아래 표에 명시되지 않은 데이터베이스를 포함한 모든 데이터베이스에서 기본적으로 작동합니다.
Python 라이브러리는 [데이터베이스 API 사양][4]을 지원하며, 모든 일반 SQL 데이터베이스를 지원합니다. 여기에는 SQLite, MySQL, Postgres, MariaDB와 같은 데이터베이스가 포함됩니다.

### 사용자 Authentication Frameworks 호환성

**User Authentication Framework 통합은 다음을 제공합니다.**

- 사용자 ID를 포함한 사용자 로그인 이벤트
- 사용자 로그인 이벤트에 대한 계정 탈취 탐지 모니터링

| 프레임워크         | 프레임워크 버전   |
|-------------------| --------------------------- |
| Django            | 1.11, 2.2, 3.2, >= 4.0

[1]: /ko/tracing/trace_collection/compatibility/python/
[2]: /ko/agent/remote_config/#enabling-remote-configuration
[3]: https://ddtrace.readthedocs.io/en/stable/versioning.html
[4]: https://peps.python.org/pep-0249/