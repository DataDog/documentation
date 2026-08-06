---
code_lang: dotnet
code_lang_weight: 10
title: .NET 호환성 요구 사항
type: multi-code-lang
---

## 애플리케이션 보안 기능 지원

지정된 트레이서 버전에서 아래 애플리케이션 보안 기능이 .NET 라이브러리에서 지원됩니다.

| 애플리케이션 보안 기능  | 최소 .NET 트레이서 버전 |
| -------------------------------- | ----------------------------|
| 위협 탐지 | 2.23.0|
| Threat Protection  | 2.26.0|
| 차단된 요청에 대한 응답 사용자 지정 | 2.27.0 |
| 소프트웨어 구성 분석(SCA) |  2.16.0  |
| 코드 보안  | 2.42.0  |
| 자동 사용자 활동 이벤트 추적 | 2.32.0 |
| API Security | 2.42.0 |

.NET에서 지원되는 모든 애플리케이션 보안 기능을 사용하는데 필요한 최소 트레이서 버전은 2.42.0입니다.

**참고**: Threat Protection을 사용하려면 [Remote Configuration][3]을 활성화해야 하며, 이는 표기된 최소 트레이서 버전에 포함되어 있습니다.

### 지원되는 배포 유형
| 유형              | 위협 탐지 지원 | 소프트웨어 구성 분석            |
|-------------------|--------------------------|------------------------------------------|
| Docker            | {{< X >}}                | {{< X >}}                                |
| 쿠버네티스(Kubernetes)        | {{< X >}}                | {{< X >}}                                |
| Amazon ECS        | {{< X >}}                | {{< X >}}                                |
| AWS Fargate       | {{< X >}}                | {{< X >}}                                |
| AWS Lambda        | {{< X >}}                |                                          |
| Azure 앱 서비스 | {{< X >}}                | {{< X >}}                                |

**참고**: Azure App Service는 **웹 애플리케이션**에서만 지원됩니다. Azure Functions에서는 Application Security 기능이 지원되지 않습니다.

## 언어 및 프레임워크 호환성

### 지원되는 .NET 버전

| .NET Framework 버전  | Microsoft 지원 종료 | 지원 레벨                       | 패키지 버전             |
| ----------------------- | --------------------- | ----------------------------------- | --------------------------- |
| 4.8.1                   |                       | GA | 최신                      |
| 4.8                     |                       | GA | 최신                      |
| 4.7.2                   |                       | GA | 최신                      |
| 4.7.1                   |                       | GA | 최신                      |
| 4.7                     |                       | GA | 최신                      |
| 4.6.2                   | 2027/01/12            | GA | 최신                      |
| 4.6.1                   | 2022/04/26            | GA | 최신                      |

| .NET Core 버전  | Microsoft 지원 종료 | 지원 레벨                       | 패키지 버전             |
| ----------------------- | --------------------- | ----------------------------------- | --------------------------- |
| 9                     | 2026/04/12            | GA | 최신                      |
| 8                     | 2026/11/10            | GA | 최신                      |
| 7                     | 2024/04/14            | GA | 최신                      |
| 6                     | 2024/11/12            | GA | 최신                      |
| 5                     | 2022/04/10            | GA | 최신                      |
| 3.1                   | 2022/12/13            | GA | 최신                      |
| 3.0                   | 2020/03/03            | GA | 최신                      |
| 2.2                   | 2019/10/23            | GA | 최신                      |
| 2.1                   | 2021/08/21            | GA | 최신                      |


다음 아키텍처에서 지원됩니다.
- Linux (GNU) x64, ARM64 - (.Net Core)
- Alpine Linux (musl) x64, ARM64 - (.Net Core)
- macOS (Darwin) x64, ARM64 - (.Net Core)
- Windows (msvc) x86, x86-64 - (.Net Core 및 .Net Framework)


### 웹 프레임워크 호환성

- 공격자 소스 HTTP 요청 세부 정보
- HTTP 요청 태그(상태 코드, 메소드 등)
- Distributed Tracing으로 애플리케이션을 통한 공격 플로 확인

##### Application Security 기능 노트
- **Software Composition Analysis**는 모든 프레임워크에서 지원됩니다.
- 아래 목록에 사용 중인 프레임워크가 없어도 **Code Security**는 여전히 ​​Insecure Cookie 취약점을 감지합니다.


| 프레임워크                  | Threat Detection이 지원되나요? | Threat Protection이 지원되나요? | Code Security? |
| ----------------------- | --------------- | ---------------------------------------------- | ---------------------------------------------- |
| ASP.NET MVC | {{< X >}}  |{{< X >}}  | {{< X >}} |
| ASP.NET Web API 2 | {{< X >}} | {{< X >}} | {{< X >}}  |

<div class="alert alert-info">원하는 프레임워크가 목록에 없다면 저희에게 알려주세요! <a href="https://forms.gle/gHrxGQMEnAobukfn7">간단한 양식을 작성하여 자세한 내용을 보내주세요</a>.</div>

### 데이터 스토어 호환성

**Datastore 추적은 다음을 제공합니다.**

- SQL 공격 탐지
- 쿼리 정보(예: 보안 처리된(sanitized) 쿼리 문자열)
- 오류 및 스택 트레이스 캡처

##### Application Security 기능 노트
- **Threat Protection**는 HTTP 요청(인풋) 레이어에서도 작동하므로, 아래 표에 명시되지 않은 데이터베이스를 포함한 모든 데이터베이스에서 기본적으로 작동합니다.

| 프레임워크         | Threat Detection이 지원되나요?    | Threat Protection이 지원되나요? | Code Security? |
|-------------------|-----------------|---------------------|---|
| OracleDB         | {{< X >}} |   {{< X >}}    |{{< X >}}    |
| ADO.NET         | {{< X >}} |   {{< X >}}    |{{< X >}}    |
| SQL 서버         | {{< X >}} |   {{< X >}}    |{{< X >}}    |
| MySQL       | {{< X >}} |   {{< X >}}    |{{< X >}}    |
| SQLite         | {{< X >}} |   {{< X >}}    |{{< X >}}    |

### 사용자 Authentication Frameworks 호환성

**User Authentication Frameworks와의 통합**은 다음을 제공합니다.

- 사용자 ID를 포함한 사용자 로그인 이벤트
- 사용자 가입 이벤트(내장 SignInManager를 사용하는 앱)
- 사용자 로그인 이벤트에 대한 계정 탈취 탐지 모니터링

| 프레임워크         |
|-------------------|
| > .Net Core 2.1   |

[1]: /ko/tracing/trace_collection/compatibility/dotnet-core/
[2]: /ko/tracing/trace_collection/compatibility/dotnet-framework/
[3]: /ko/agent/remote_config/#enabling-remote-configuration