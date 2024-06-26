---
further_reading:
- link: logs/log_configuration/attributes_naming_convention
  tag: 설명서
  text: 로그 관리의 표준 속성에 대해 알아보기
- link: /real_user_monitoring/browser/data_collected
  tag: 설명서
  text: RUM 브라우저용으로 수집된 데이터
- link: /tracing/trace_explorer/query_syntax/
  tag: 설명서
  text: 트레이스 탐색 방법 알아보기
kind: documentation
title: 스팬 태그 시맨틱
---

## 개요
[Datadog 추적 라이브러리][1]는 다양한 라이브러리 계측을 위한 기본 지원을 제공합니다.
이러한 계측은 분산 시스템의 논리적 작업 단위를 나타내는 스팬을 생성합니다.
각 스팬은 시스템에서 발생하는 작업 단위에 대한 추가 정보를 제공하는 [스팬 태그][2]로 구성됩니다. 명명 규칙은 스팬 이벤트에 사용할 수 있는 이름과 콘텐츠에 대해 설명합니다.

## 스팬 태그 명명 규칙
### 코어
다음 스팬 태그는 사용된 계측 및 수행되는 작업 종류를 설명하기 위한 핵심 개념입니다.

| **이름**    | **유형** | **설명**                                                                                                                                                                                                                                                                   |
|-------------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `language`  | `string` | 스팬을 생성하는 데 사용되는 클라이언트 SDK 언어로 다음 중 하나일 수 있습니다. `cpp`, `dotnet`, `go`, `jvm`, `javascript`, `php`, `python`, `ruby`.                                                                                                                                                                                                                                 |
| `env`       | `string` | 실행 중인 프로세스에 대해 `DD_ENV` 환경 변수의 값 또는 사용자 정의된 `env`.                                                                                                                                                                                            |
| `version`   | `string` | 실행 중인 프로세스에 대해 `DD_VERSION` 환경 변수의 값 또는 사용자 정의된 `version`.                                                                                                                                                                                      |
| `span.kind` | `string` | 스팬에서 처리하는 작업 단위 유형을 나타내는 문자열로 다음 중 하나일 수 있습니다. `server`, `client`, `producer`, `consumer` 또는 `internal`.<br> [OpenTelemetry SpanKind 문서][3]에서 자세한 내용을 확인하세요. |
| `component` | `string` | 스팬을 생성한 라이브러리/통합의 이름.                                                                                                                                                                                                                        |

### 네트워크 통신
다음 스팬 태그는 네트워크 통신에 해당하는 작업 단위를 설명하는 데 사용할 수 있습니다.

| **이름**                    | **유형** | **설명**                                                           |
|---------------------------------|----------|---------------------------------------------------------------------------|
| `network.client.ip`             | `string` | 인바운드 연결을 시작한 클라이언트의 IP 주소.        |
| `network.destination.ip`        | `string` | 아웃바운드 연결이 이루어지는 IP 주소.             |
| `network.host.ip`               | `string` | 로컬 호스트 IP 주소.                                                     |
| `network.client.port`           | `number` | 연결을 시작한 클라이언트의 포트.                      |
| `network.destination.port`      | `number` | 아웃바운드 연결의 원격 포트 번호.                             |
| `network.client.name`           | `string` | 인바운드 연결을 시작한 클라이언트의 호스트 이름.          |
| `network.destination.name`      | `string` | 아웃바운드 연결이 이루어지는 원격 호스트 이름 또는 이와 유사한 이름. |
| `network.host.name`             | `string` | 로컬 호스트 이름.                                                            |
| `network.client.transport`      | `string` | 인바운드 연결을 만드는 데 사용되는 전송 프로토콜.                    |
| `network.destination.transport` | `string` | 아웃바운드 연결을 만드는 데 사용되는 전송 프로토콜.                   |

### HTTP 요청
다음 스팬 태그를 사용하여 HTTP 클라이언트 및 서버 스팬을 설명할 수 있습니다.

| **이름**                                | **설명**                                                                                                                                                                                                              |
|---------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `http.status_code`                          | 유형: `string`<br> HTTP 응답 상태 코드.                                                                                                                                                                                                |
| `http.url`                                  | 유형: `string` <br> 난독화된 쿼리 문자열을 포함한 HTTP 요청의 URL. 난독화에 대한 자세한 내용은 [데이터 보안 설정][4]을 참조하세요.                                                         |
| `http.version`                              | 유형: `string` <br> 요청에 사용된 HTTP 버전.                                                                                                                                                                                     |
| `http.method`                               | 유형: `string` <br> 연결을 시작한 클라이언트의 포트.                                                                                                                                                                         |
| `http.route`                                | 유형: `string` <br> 일치하는 경로(경로 템플릿).<br>예: `/users/:userID`                                                                                                                                                              |
| `http.client_ip`                            | 유형: `string` <br> 모든 프록시 뒤에 있는 원래 클라이언트의 IP 주소 (알려진 경우). `X-Forwarded-For`와 같은 헤더에서 발견됨.                                                                                                        |
| `http.useragent`                            | 유형: `string` <br> 요청과 함께 수신된 사용자 에이전트 헤더.                                                                                                                                                                              |
| `http.request.content_length`               | 유형: `number` <br> 요청 페이로드 본문의 크기(바이트).                                                                                                                                                                                |
| `http.response.content_length`              | 유형: `number` <br> 응답 페이로드 본문의 크기(바이트).                                                                                                                                                                                |
| `http.request.content_length_uncompressed`  | 유형: `number` <br> 전송 디코딩 후 압축되지 않은 요청 페이로드 본문의 크기.                                                                                                                                                   |
| `http.response.content_length_uncompressed` | 유형: `number` <br> 전송 디코딩 후 압축되지 않은 응답 페이로드 본문의 크기.                                                                                                                                                  |
| `http.request.headers.*`                    | 유형: `string` <br> 요청 HTTP 헤더. 기본적으로 수집되는 항목은 없지만 필요시 `DD_TRACE_HEADER_TAGS`로 설정할 수 있습니다. 헤더 수집 방법에 대한 자세한 내용은 해당 [라이브러리 설정][5]을 참조하세요.  |
| `http.response.headers.*`                   | 유형:  `string` <br> 응답 HTTP 헤더. 기본적으로 수집되는 항목은 없지만 필요시 `DD_TRACE_HEADER_TAGS`로 설정할 수 있습니다. 헤더 수집 방법에 대한 자세한 내용은 해당 [라이브러리 설정][5]을 참조하세요. |

### 데이터베이스

다음 스팬 태그를 사용하여 데이터베이스 스팬을 설명할 수 있습니다.

| **이름**           | **유형** | **설명**                                                                                              |
|------------------------|----------|--------------------------------------------------------------------------------------------------------------|
| `db.system`            | `string` | 데이터베이스 관리 시스템(사용 중인 DBMS 제품)의 식별자.                                       |
| `db.connection_string` | `string` | 데이터베이스 연결에 사용되는 연결 문자열.                                                        |
| `db.user`              | `string` | 데이터베이스에 액세스한 사용자 이름.                                                                          |
| `db.instance`          | `string` | 연결되는 데이터베이스의 이름.                                                                  |
| `db.statement`         | `string` | 실행 중인 데이터베이스 문.                                                                        |
| `db.operation`         | `string` | 실행 중인 작업의 이름. <br>예: `SELECT`, `findAndModify`, `HMSET`                     |
| `db.sql.table`         | `number` | 데이터베이스 이름(해당되는 경우)을 포함하여 작업이 수행되는 기본 테이블의 이름. |
| `db.row_count`         | `number` | 쿼리 또는 작업의 행/결과 수.                                                      |

특정 데이터베이스 기술에 대한 추가 속성은 접두사 `db.<db.system>`을 사용합니다.

### 메시지 대기열

다음 스팬 태그를 사용하여 메시징 시스템에 해당하는 스팬을 설명할 수 있습니다.

| **이름**                         | **유형** | **설명**                                                                                                                                                                                                                      |
|----------------------------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `messaging.system`               | `string` | 메시징 시스템의 식별자.                                                                                                                                                                                              |
| `messaging.destination`          | `string` | 메시지 대상 이름.                                                                                                                                                                                                        |
| `messaging.destination_kind`     | `string` | 메시지 대상의 종류.                                                                                                                                                                                                     |
| `messaging.protocol`             | `string` | 전송 프로토콜의 이름.                                                                                                                                                                                                  |
| `messaging.protocol_version`     | `string` | 전송 프로토콜의 버전.                                                                                                                                                                                               |
| `messaging.url`                  | `string` | 메시징 시스템에 대한 연결 문자열.                                                                                                                                                                                       |
| `messaging.message_id`           | `string` | 메시징 시스템에서 메시지 식별자로 사용하는 값으로, 문자열로 표시됨.                                                                                                                                      |
| `messaging.conversation_id`      | `string` | 메시지가 속한 대화를 식별하는 대화 ID로, 문자열로 표시됨.                                                                                                                              |
| `messaging.message_payload_size` | `number` | 압축되지 않은 메시지 페이로드의 크기(바이트).                                                                                                                                                                               |
| `messaging.operation`            | `string` | 메시지 소비 종류를 식별하는 문자열. <br>예: `send` (생산자에게 전송된 메시지), `receive` (소비자가 메시지를 수신함) 또는 `process` (이전에 수신한 메시지를 소비자가 처리함). |
| `messaging.consumer_id`          | `string` | 메시지를 받는 소비자의 식별자.                                                                                                                                                                                 |

특정 메시징 시스템의 추가 속성은 접두사 `messaging.<messaging.system>`을 사용합니다.

### 원격 프로시저 호출

다음 스팬 태그는 RMI 또는 gRPC와 같은 원격 프로시저 호출에 해당하는 스팬을 설명하는 데 사용할 수 있습니다.

| **이름**  | **유형** | **설명**                      |
|---------------|----------|--------------------------------------|
| `rpc.system`  | `string` | 원격 시스템의 식별자.    |
| `rpc.service` | `string` | 호출되는 서비스의 이름. |
| `rpc.method`  | `string` | 호출되는 메서드의 이름.  |

### Errors
다음 스팬 태그를 사용하여 스팬과 관련된 오류를 설명할 수 있습니다.

| **이름**    | **유형** | **설명**                                                  |
|-----------------|----------|------------------------------------------------------------------|
| `error.type` | `string` | 오류 유형 또는 종류(또는 경우에 따라 코드).                  |
| `error.message`    | `string` | 이벤트를 설명하는 간결하고 사람이 읽을 수 있는 한 줄짜리 메시지입니다. |
| `error.stack`   | `string` | 오류에 대한 스택 트레이스 또는 보완 정보. |

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/setup_overview/
[2]: /ko/tracing/visualization/#span-tags
[3]: https://opentelemetry.io/docs/reference/specification/trace/api/#spankind
[4]: /ko/tracing/setup_overview/configure_data_security/
[5]: /ko/tracing/trace_collection/library_config/