---
code_lang: nodejs
code_lang_weight: 50
title: Node.js 호환성 요구 사항
type: multi-code-lang
---
## 애플리케이션 보안 기능 {#application-security-capabilities}

다음은 특정 트레이서 버전에 대해 Node.js 라이브러리에서 지원되는 애플리케이션 보안 기능입니다.

| 애플리케이션 보안 기능        | 최소 Node.js 트레이서 버전                     |
|----------------------------------------|----------------------------------------------------|
| 위협 탐지                       | 4.0.0                                              |
| Threat Protection                      | 4.0.0                                              |
| 차단된 요청에 대한 응답 사용자 지정 | 4.1.0                                              |
| Software Composition Analysis(SCA)    | 4.0.0                                              |
| Code Security                          | Node.js 16 이상에서는 4.18.0, 또는 Node.js 18 이상에서는 5.0.0   |
| 자동 사용자 활동 이벤트 추적 | Node.js 16 이상은 4.4.0                              |
| API 보안                           | Node.js 16 이상에서는 4.30.0, 또는 Node.js 18 이상에서는 5.6.0   |

Node.js에서 지원하는 모든 애플리케이션 보안 기능을 사용하는 데 필요한 최소 트레이서 버전은 4.30.0입니다.


**참고**:
- Threat Protection을 사용하려면 명시된 최소 트레이서 버전에 포함된 [Remote Configuration][2]을 활성화해야 합니다.

### 지원되는 배포 유형 {#supported-deployment-types}
| 유형        | 위협 탐지 지원 | Software Composition Analysis |
|-------------|--------------------------|-------------------------------|
| Docker      | {{< X >}}                | {{< X >}}                     |
| Kubernetes  | {{< X >}}                | {{< X >}}                     |
| Amazon ECS  | {{< X >}}                | {{< X >}}                     |
| AWS Fargate | {{< X >}}                | {{< X >}}                     |
| AWS Lambda  | {{< X >}}                | {{< X >}}                     |

## 언어 및 프레임워크 호환성 {#language-and-framework-compatibility}

### Node.js 버전 지원 {#nodejs-version-support}

Node.js 프로젝트가 LTS 메이저 릴리스 라인에 대한 지원을 중단하면(서비스 종료(EOL) 시), `dd-trace`의 다음 메이저 버전에서도 해당 지원이 중단됩니다.
`dd-trace` 라이브러리에서 해당 Node.js EOL 버전을 지원하는 마지막 메이저 릴리스 라인은 유지 관리 모드로 최소 1년 더 지원합니다.

일부 문제는 `dd-trace`에서 해결할 수 없으며 대신 Node.js에서 해결해야 합니다. 이러한 상황이 발생하고 해당 Node.js 릴리스가 EOL인 경우, EOL이 아닌 다른 릴리스로 이동하지 않고는 문제를 해결할 수 없습니다.
Datadog은 비 LTS Node.js 메이저 릴리스 라인(홀수 버전)에 대한 특정 지원을 제공하기 위해 `dd-trace`의 새 릴리스를 만들지 않습니다.

최상의 지원을 받으려면 항상 최신 LTS 릴리스의 Node.js와 최신 메이저 버전의 `dd-trace`를 실행하세요. 어떤 Node.js 릴리스 라인을 사용하든 해당 릴리스 라인의 최신 Node.js 버전을 사용하여 최신 보안 수정 사항을 적용하세요.

Node.js 릴리스에 대한 자세한 내용은 [공식 Node.js 문서][4]를 참조하세요.



### 운영 체제 지원 {#operating-system-support}

다음 운영 체제는 `dd-trace`에서 공식적으로 지원합니다. 나열되지 않은 운영 체제에서도 작동할 가능성이 높지만, 애플리케이션 보안 기능, 프로파일링, 런타임 메트릭과 같은 일부 기능이 누락될 수 있습니다. 일반적으로 메이저 버전의 초기 릴리스 시점에 활발하게 유지 관리되는 운영 체제는 지원됩니다.


| 운영 체제 | 아키텍처 | 최소 버전                         |
|------------------|---------------|------------------------------------------|
| Linux (glibc)    | arm64, x64    | CentOS 7, Debian 9, RHEL 7, Ubuntu 14.04 |
| Linux (musl)     | arm64, x64    | Alpine 3.13                              |
| macOS            | arm64, x64    | Catalina (10.15)                         |
| Windows          | x64           | Windows 8.1, Windows Server 2012         |





### 웹 프레임워크 호환성 {#web-framework-compatibility}

**웹 프레임워크 통합은 다음을 제공합니다.**

- 공격자 소스 HTTP 요청 세부 정보
- HTTP 요청 태그(상태 코드, 메서드 등)
- 분산 트레이싱을 사용하여 애플리케이션의 공격 흐름 확인

##### 애플리케이션 보안 기능 참고 사항 {#application-security-capability-notes}
- **Software Composition Analysis**는 모든 프레임워크에서 지원됩니다.
- 사용 중인 프레임워크가 아래에 나열되어 있지 않은 경우에도 **Code Security**는 취약한 암호, 취약한 해싱, 안전하지 않은 쿠키, HttpOnly Flag가 없는 쿠키, SameSite Flag가 없는 쿠키의 취약점을 탐지합니다.


| 프레임워크 | 버전 | 위협 탐지 지원 여부 | Threat Protection 지원 여부 | Code Security 지원 여부 |
|-----------|----------|-----------------------------|------------------------------|----------------------------------------------------|
| express   | >=4      | {{< X >}}                   | {{< X >}}                    | {{< X >}}                                          |
| nextjs    | >=11.1   | {{< X >}}                   |                              |                                                    |





<div class="alert alert-info">지원되지 않는 기능이나 사용 중인 Node.js 프레임워크에 대한 지원이 추가되기를 원하시면 알려주세요! 세부 정보를 보내려면 <a href="https://forms.gle/gHrxGQMEnAobukfn7">이 간단한 양식을 작성하세요</a>.</div>


### 네트워킹 프레임워크 호환성 {#networking-framework-compatibility}


**네트워킹 트레이싱은 다음을 제공합니다.**

- 애플리케이션 전반의 분산 트레이싱
- 요청 기반 차단

##### 애플리케이션 보안 기능 참고 사항 {#application-security-capability-notes-1}
- **Software Composition Analysis**는 모든 프레임워크에서 지원됩니다.



| 프레임워크 | 위협 탐지 지원 여부 | Threat Protection 지원 여부 | Code Security 지원 여부 |
|-----------|-----------------------------|------------------------------|----------------------------------------------------|
| http      | {{< X >}}                   | {{< X >}}                    | {{< X >}}                                          |
| https     | {{< X >}}                   | {{< X >}}                    | {{< X >}}                                          |


<div class="alert alert-info">원하는 프레임워크가 목록에 없으면 알려주세요! 세부 정보를 보내려면 <a href="https://forms.gle/gHrxGQMEnAobukfn7">이 간단한 양식을 작성하세요</a>.</div>

### Datastore 호환성{#data-store-compatibility}


**Datastore 트레이싱은 다음을 제공합니다.**

- 요청에서 응답까지의 시간 측정
- 쿼리 정보(예: 새니타이즈된 쿼리 문자열)
- 오류 및 스택 트레이스 캡처

##### 애플리케이션 보안 기능 참고 사항 {#application-security-capability-notes-2}
- **Software Composition Analysis**는 모든 프레임워크에서 지원됩니다.
- **Threat Protection**은 HTTP 요청(입력) 레이어에서도 작동하므로, 아래 표에 나열되지 않은 데이터베이스를 포함해 모든 데이터베이스에서 기본적으로 작동합니다.


| 프레임워크                | 버전  | 위협 탐지 지원 여부 | Threat Protection 지원 여부 | Code Security 지원 여부 |
|--------------------------|-----------|-----------------------------|------------------------------|----------------------------------------------------|
| [@apollo/server][43]     | `>=4`     | {{< X >}}                   | {{< X >}}                    |                                                    |
| [apollo-server-core][44] | `>=3`     | {{< X >}}                   | {{< X >}}                    |                                                    |
| [cassandra-driver][28]   | `>=3`     | {{< X >}}                   | {{< X >}}                    |                                                    |
| [couchbase][29]          | `^2.4.2`  | {{< X >}}                   | {{< X >}}                    |                                                    |
| [elasticsearch][30]      | `>=10`    | {{< X >}}                   | {{< X >}}                    |                                                    |
| [ioredis][31]            | `>=2`     | {{< X >}}                   | {{< X >}}                    |                                                    |
| [knex][32]               | `>=0.8`   | {{< X >}}                   | {{< X >}}                    |                                                    |
| [mariadb][5]             | `>=3`     | {{< X >}}                   | {{< X >}}                    |                                                    |
| [memcached][33]          | `>=2.2`   | {{< X >}}                   | {{< X >}}                    |                                                    |
| [mongodb-core][34]       | `>=2`     | {{< X >}}                   | {{< X >}}                    | {{< X >}}                                          |
| [mysql][35]              | `>=2`     | {{< X >}}                   | {{< X >}}                    | {{< X >}}                                          |
| [mysql2][36]             | `>=1`     | {{< X >}}                   | {{< X >}}                    | {{< X >}}                                          |
| [oracledb][37]           | `>=5`     | {{< X >}}                   | {{< X >}}                    |                                                    |
| [pg][38]                 | `>=4`     | {{< X >}}                   | {{< X >}}                    | {{< X >}}                                          |
| [redis][39]              | `>=0.12`  | {{< X >}}                   | {{< X >}}                    |                                                    |
| [sharedb][40]            | `>=1`     | {{< X >}}                   | {{< X >}}                    |                                                    |
| [tedious][41]            | `>=1`     | {{< X >}}                   | {{< X >}}                    |                                                    |
| [sequelize][42]          | `>=4`     | {{< X >}}                   | {{< X >}}                    | {{< X >}}                                          |


### 사용자 인증 프레임워크 호환성 {#user-authentication-frameworks-compatibility}

**사용자 인증 프레임워크와의 통합은 다음 기능을 제공합니다.**

- 사용자 ID를 포함한 사용자 로그인 이벤트
- 사용자 로그인 이벤트를 모니터링하는 계정 탈취 탐지

| 프레임워크       | 최소 프레임워크 버전 |
|-----------------|---------------------------|
| passport-local  | 1.0.0                     |
| passport-http   | 0.3.0                     |

[1]: /ko/tracing/trace_collection/compatibility/nodejs/
[2]: /ko/tracing/guide/remote_config/
[4]: https://github.com/nodejs/release#release-schedule
[5]: https://github.com/mariadb-corporation/mariadb-connector-nodejs
[28]: https://github.com/datastax/nodejs-driver
[29]: https://github.com/couchbase/couchnode
[30]: https://github.com/elastic/elasticsearch-js
[31]: https://github.com/luin/ioredis
[32]: https://knexjs.org
[33]: https://github.com/3rd-Eden/memcached
[34]: https://www.mongodb.com/docs/drivers/node/current/
[35]: https://github.com/mysqljs/mysql
[36]: https://github.com/sidorares/node-mysql2
[37]: https://oracle.github.io/node-oracledb/
[38]: https://node-postgres.com
[39]: https://github.com/NodeRedis/node_redis
[40]: https://share.github.io/sharedb/
[41]: http://tediousjs.github.io/tedious
[42]: https://github.com/sequelize/sequelize
[43]: https://github.com/apollographql/apollo-server
[44]: https://www.npmjs.com/package/apollo-server-core