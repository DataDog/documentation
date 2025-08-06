---
code_lang: java
code_lang_weight: 0
title: Java 호환성 요구 사항
type: multi-code-lang
---

## Application Security 기능

다음은 특정 트레이서 버전에 대해 Java 라이브러리에서 지원되는 애플리케이션 보안 기능입니다.

| 애플리케이션 보안 기능  | 최소 Java 트레이서 버전 |
| -------------------------------- | ----------------------------|
| 위협 탐지 | 1.8.0  |
| API Security | 1.31.0 |
| Threat Protection| 1.9.0 |
| 차단된 요청에 대한 응답 사용자 지정 | 1.11.0 |
| 소프트웨어 구성 분석(SCA) | 1.1.4 |
| 코드 보안  | 1.15.0|
| 자동 사용자 활동 이벤트 추적 | 1.20.0 |

Java에서 지원되는 모든 애플리케이션 보안 기능을 사용하는 데 필요한 최소 트레이서 버전은 1.31.0입니다.

**참고**: Threat Protection를 사용하려면 명시된 트레이스 최소 버전에 포함된 [Remote Configuration][2]을 활성화해야 합니다.

### 지원되는 배포 유형
| 유형              | Threat Detection 지원 | 소프트웨어 구성 분석 |
|-------------------|--------------------------|-------------------------------|
| Docker            | {{< X >}}                | {{< X >}}                     |
| 쿠버네티스(Kubernetes)        | {{< X >}}                | {{< X >}}                     |
| Amazon ECS        | {{< X >}}                | {{< X >}}                     |
| AWS Fargate       | {{< X >}}                | {{< X >}}                     |
| AWS Lambda        | {{< X >}}                |                               |
| Azure 앱 서비스 | {{< X >}}                | {{< X >}}                     |

**참고**: Azure App Service는 **웹 애플리케이션에서만** 지원됩니다. Application Security는 Azure Functions를 지원하지 않습니다.

## 언어 및 프레임워크 호환성

### 지원되는 Java 버전
Java Tracer는 다음 Oracle JDK 및 OpenJDK JVM 런타임에 대한 자동 계측을 지원합니다.

| JVM 버전 | 운영 체제                                                               | 지원 레벨                       | 트레이서 버전 |
| -------------| ------------------------------------------------------------------------------- | ----------------------------------- | -------------- |
| 8~17      | Windows(x86-64)<br>Linux(glibc, musl)(arm64, x86-64)<br>MacOS(arm64, x86-64)               | 지원됨                | Latest         |


Datadog은 얼리 액세스 버전 Java를 공식 지원하지 않습니다.






### 웹 프레임워크 호환성

- 공격자 소스 HTTP 요청 세부 정보
- HTTP 요청 태그(상태 코드, 메소드 등)
- 분산 추적으로 애플리케이션을 통한 공격 플로 확인

##### Application Security 기능 노트
- **Software Composition Analysis**는 모든 프레임워크에서 지원됩니다.
- **Code Security**가 프레임워크를 지원하지 않는 경우에도 취약한 암호화, 취약한 해싱, 안전하지 않은 쿠키, HttpOnly Flag가 없는 쿠키, SameSite Flag가 없는 쿠키의 취약점을 탐지합니다.



| 프레임워크                  | 버전   | Threat Detection이 지원되나요? | Threat Protection이 지원되나요? |Code Security? |
| ----------------------- | ---------- | --------------- | ---------------------------------------------- | ---------------------------------------------- |
| Grizzly                 | 2.0+       |  {{< X >}} |  {{< X >}} |  {{< X >}} |
| Glassfish               |            |  {{< X >}} |  {{< X >}} |  {{< X >}} |
| Java Servlet | 2.3+, 3.0+ |   {{< X >}} |  {{< X >}} |  {{< X >}} |
| Jetty                   | 7.0-9.x, 10.x    |  {{< X >}} |  {{< X >}} |  {{< X >}} |
| Spring Boot             | 1.5        |  {{< X >}} |  {{< X >}} |  {{< X >}} |
| Spring Web(MVC)        | 4.0+       |  {{< X >}} |  {{< X >}} |  {{< X >}} |
| Spring WebFlux          | 5.0+       |            |            |  {{< X >}} |
| Tomcat                  | 5.5+       |   {{< X >}} |  {{< X >}} |  {{< X >}} |
| Vert.x                  | 3.4~3.9.x  |   {{< X >}} |  {{< X >}} |  {{< X >}} |

**참고**: 많은 애플리케이션 서버가 Servlet과 호환되며 Websphere, Weblogic, JBoss 등이 해당 계측에 자동 포함됩니다. 아울러, Spring Boot(버전 3)와 같은 프레임워크는 대개 Tomcat, Jetty 또는 Netty 등 지원되는 임베디드 애플리케이션 서버를 사용하기 때문에 본질적으로 작동합니다.

<div class="alert alert-info">선호하는 프레임워크가 목록에 없다면 저희에게 알려주세요! <a href="https://forms.gle/gHrxGQMEnAobukfn7">간단한 양식을 작성하여 자세한 내용을 보내주세요</a>.</div>

### 네트워킹 프레임워크 호환성

`dd-java-agent`에는 다음 네트워킹 프레임워크 자동 추적 지원이 포함됩니다.

**네트워킹 추적은 다음을 제공합니다.**

- 애플리케이션을 통한 분산 추적
- 요청 기반 차단

##### Application Security 기능 노트
- **Software Composition Analysis**는 모든 프레임워크에서 지원됩니다.
- **Code Security**가 프레임워크를 지원하지 않는 경우에도 취약한 암호, 취약한 해싱, 안전하지 않은 쿠키, HttpOnly Flag가 없는 쿠키, SameSite Flag가 없는 쿠키의 취약점을 탐지합니다.


| 프레임워크                | 버전    | Threat Detection이 지원되나요? | Threat Protection이 지원되나요? | Code Security? |
| ------------------------ | ----------- | --------------- | ---------------------------------------------- | ---------------------------------------------- |
| Apache HTTP 클라이언트       | 4.0+        |  {{< X >}} |  |  |
| gRPC                     | 1.5+        |  {{< X >}} |  |  |
| HttpURLConnection        | 모두         |  {{< X >}} |  |  |
| Jax RS 클라이언트           | 2.0+        |  {{< X >}} |  {{< X >}} |  {{< X >}}  |
| Jersey 서버            | 1.9-2.29    |  {{< X >}} |  {{< X >}} |  {{< X >}} |
| Netty HTTP 서버        |  3.8+           |  {{< X >}} |    |  |
| RESTEasy                 |  3.0.x          |  {{< X >}} |    |  |
| Spring SessionAwareMessageListener     | 3.1+            |  {{< X >}} |  |  |

<div class="alert alert-info">원하는 프레임워크가 목록에 없다면 저희에게 알려주세요! <a href="https://forms.gle/gHrxGQMEnAobukfn7">간단한 양식을 작성하여 자세한 내용을 보내주세요</a>.</div>

### 데이터 스토어 호환성

`dd-java-agent`에는 다음 데이터베이스 프레임워크/드라이버 자동 추적 지원이 포함됩니다.

**Datastore 추적은 다음을 제공합니다.**

- 요청에서 응답까지 시간 측정
- 쿼리 정보(예: 보안 처리된(sanitized) 쿼리 문자열)
- 오류 및 스택 트레이스 캡처

##### Application Security 기능 노트
- **Software Composition Analysis**는 모든 프레임워크에서 지원됩니다.
- **Threat Protection**는 HTTP 요청(인풋) 레이어에서도 작동하므로, 아래 표에 명시되지 않은 데이터베이스를 포함한 모든 데이터베이스에서 기본적으로 작동합니다.
- 하단의 지원되지 않는 프레임워크를 사용하는 경우, **Code Security**는 SQL Injection 취약점을 탐지하지 않지만 [여기][3]에 명시된 나머지 취약점 유형은 계속 탐지합니다.

| 데이터베이스                | 버전 | Threat Detection이 지원되나요? |  Code Security? |
| ----------------------- | -------- |  ------------------------| ---------------------------------------------------------------- |
| Aerospike               | 4.0+     |  {{< X >}} |   |
| Couchbase               | 2.0+     |  {{< X >}} |   |
| JDBC                    | N/A      |  {{< X >}} |   {{< X >}} |
| MongoDB                 | 3.0~4.0+ |  {{< X >}} |   |

`dd-java-agent`는 다음과 같은 위협 탐지용 일반 JDBC 드라이버와도 호환됩니다.

- Apache Derby
- Firebird SQL
- H2 Database Engine
- HSQLDB
- IBM DB2
- MariaDB
- MSSQL(Microsoft SQL Server)
- MySQL
- Oracle
- Postgres SQL
- ScalikeJDBC

<div class="alert alert-info">원하는 프레임워크가 목록에 없다면 저희에게 알려주세요! <a href="https://forms.gle/gHrxGQMEnAobukfn7">간단한 양식을 작성하여 자세한 내용을 보내주세요</a>.</div>

### 사용자 Authentication Frameworks 호환성

**User Authentication Framework 통합은 다음을 제공합니다.**

- 사용자 ID를 포함한 사용자 로그인 이벤트
- 사용자 로그인 이벤트에 대한 계정 탈취 탐지 모니터링

| 프레임워크         | 최소 Framework 버전 |
|-------------------|---------------------------|
| Spring Security   | 5.5+                      |


[1]: /ko/tracing/trace_collection/compatibility/java/
[2]: /ko/agent/remote_config/?tab=configurationyamlfile#enabling-remote-configuration
[3]: /ko/security/application_security/vulnerability_management/#manage-code-level-vulnerabilities