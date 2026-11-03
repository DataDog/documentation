---
aliases:
- /ko/service_management/workflows/private_actions/private_action_credentials
- /ko/service_management/app_builder/private_actions/private_action_credentials
- /ko/actions/private_actions/private_action_credentials/
description: HTTP, Jenkins, PostgreSQL, MongoDB 및 Temporal 인증 방법을 포함한 Private Actions용
  자격 증명을 구성합니다.
disable_toc: false
title: Private Action 증명 처리하기
---
## 개요 {#overview}

Private Actions를 사용하면 Datadog 워크플로 및 앱이 서비스를 공용 인터넷에 노출하지 않고 프라이빗 네트워크에 호스팅된 서비스와 상호 작용할 수 있습니다. Private Actions를 사용하려면 네트워크의 호스트에 Private Actions 러너를 설치하고 해당 러너를 Datadog Connection과 페어링해야 합니다. 러너 설정 및 Connection과의 페어링에 대한 자세한 내용은 [Private Actions][1]를 참조하세요.

Jenkins 및 PostgreSQL과 같은 일부 Private Actions는 작동하기 위해 자격 증명이 필요합니다. Private Action의 자격 증명을 구성하려면 다음 단계를 따르세요.
1. 러너의 구성이 저장된 디렉터리로 이동합니다(기본값: `config/credentials/`).
2. 이 디렉터리에서 Credential files에 제공된 JSON 구조를 사용하여 JSON 파일을 생성합니다. 또는 러너 부트스트랩 중에 자동으로 생성된 기본 JSON 파일을 편집합니다.
   - **참고**: 이 파일들은 러너의 `/etc/dd-action-runner/config/credentials/` 디렉터리에서 사용할 수 있습니다.
3. 러너의 Connection에 자격 증명 경로를 지정합니다. 컨테이너의 파일 경로를 사용하세요. 예: `/etc/dd-action-runner/config/credentials/jenkins_token.json`.

## 자격 증명 파일 {#credential-files}

{{< tabs >}}
{{% tab "HTTP" %}}

HTTP는 세 가지 인증 방법을 지원합니다.

- **기본 인증**: HTTP 서버에 사용자 이름과 비밀번호 인증이 필요할 때 사용합니다.
- **토큰 인증**: HTTP 서버에 헤더나 쿼리 파라미터의 하나 이상의 사용자 지정 토큰이 필요할 때 사용합니다.
- **인증 없음**: HTTP 서버에 인증이 필요하지 않을 때 사용합니다.

### 기본 인증 {#basic-authentication}

기본 인증을 사용하려면 사용자 이름과 비밀번호가 포함된 자격 증명 파일이 필요합니다.

{{< code-block lang="json" filename="/etc/dd-action-runner/config/credentials/http_basic.json" disable_copy="false" collapsible="true" >}}
{
	"auth_type": "Basic Auth",
	"credentials": [
		{
			"username": "USERNAME",
			"password": "PASSWORD"
		}
	]
}
{{< /code-block >}}

`USERNAME` 및 `PASSWORD`를 사용자 이름과 비밀번호로 바꿉니다.

러너의 Connection에서 Private Action 러너 컨테이너에 있는 자격 증명 파일의 위치를 지정하세요. 이 예시에서 자격 증명 파일은 `/etc/dd-action-runner/config/credentials/http_basic.json`에 저장됩니다.

{{< img src="actions/private_actions/par-http-basic-credentials.png" alt="자격 증명 파일의 경로는 '/etc/dd-action-runner/config/credentials/http_basic.json'입니다." style="width:80%;" >}}

### 토큰 인증 {#token-authentication}

토큰 인증을 사용하려면 토큰 이름과 값의 배열이 포함된 자격 증명 파일이 필요합니다.

{{< code-block lang="json" filename="/etc/dd-action-runner/config/credentials/http_token.json" disable_copy="false" collapsible="true" >}}
{
	"auth_type": "Token Auth",
	"credentials": [
		{
			"tokenName": "TOKEN1",
			"tokenValue": "VALUE1"
		},
		{
			"tokenName": "TOKEN2",
			"tokenValue": "VALUE2"
		}
	]
}
{{< /code-block >}}

`TOKEN1`, `TOKEN2`, `VALUE1` 및 `VALUE2`를 토큰 이름과 값으로 바꿉니다.

러너의 Connection에서 Private Action 러너 컨테이너에 있는 자격 증명 파일의 위치를 지정하세요. 이 예시에서 자격 증명 파일은 `/etc/dd-action-runner/config/credentials/http_token.json`에 저장됩니다.

{{< img src="actions/private_actions/par-http-token-credentials.png" alt="자격 증명 파일의 경로는 '/etc/dd-action-runner/config/credentials/http_token.json'입니다." style="width:80%;" >}}

### 인증 없음 {#no-authentication}

이 연결 유형은 인증이 필요하지 않은 HTTP 엔드포인트에 적합합니다.

이 Connection을 구성하려면 엔드포인트 URL을 지정하세요.

{{< img src="actions/private_actions/par-http-no-auth-credentials.png" alt="인증이 없는 HTTP 연결" style="width:80%;" >}}

{{% /tab %}}

{{% tab "GitLab" %}}

GitLab 연결은 다음 자격 증명을 허용합니다.

|  자격 증명    | 필수    | 설명 |
| -------------  | ----------- | ----------- |
| `baseURL` | 예 | 자체 관리형 GitLab 인스턴스의 URL입니다. 자세한 내용은 [GitLab API 문서][201]를 참조하세요. |
| `gitlabApiToken` | 예 | GitLab 인스턴스를 인증하기 위한 API 토큰입니다. GitLab 사용자 설정에서 이 토큰을 생성하세요. |

모든 자격 증명을 하나의 파일에 포함합니다.

{{< code-block lang="json" filename="/etc/dd-action-runner/config/credentials/gitlab_token.json" disable_copy="false" collapsible="true" >}}
{
        "auth_type": "Token Auth",
        "credentials": [
                {
                        "tokenName": "gitlabApiToken",
                        "tokenValue": "GITLAB_API_TOKEN"
                },
                {
                        "tokenName": "baseURL",
                        "tokenValue": "GITLAB_URL"
                }
        ]
}
{{< /code-block >}}



`GITLAB_API_TOKEN` 및 `GITLAB_URL`을 자격 증명으로 바꾸세요.

러너의 Connection에서 Private Action 러너 컨테이너에 있는 자격 증명 파일의 위치를 지정하세요. 이 예시에서 자격 증명 파일은 `/etc/dd-action-runner/config/credentials/gitlab_token.json`에 저장됩니다.

{{< img src="actions/private_actions/par-gitlab-credentials.png" alt="자격 증명 파일의 경로는 '/etc/dd-action-runner/config/credentials/gitlab_token.json'입니다." style="width:80%;" >}}

[201]: https://docs.gitlab.com/ee/api/
{{% /tab %}}

{{% tab "Jenkins" %}}

Jenkins 연결은 다음 자격 증명을 허용합니다.

|  자격 증명    | 필수    | 설명 |
| -------------  | ----------- | ----------- |
| `domain` | 예 | 연결하려는 Jenkins 서버의 도메인입니다. |
| `username` | 예 | Jenkins 서버에 인증하는 데 사용할 Jenkins 사용자의 사용자 이름입니다. 이 사용자에게는 러너가 수행할 액션에 필요한 권한이 있어야 합니다. |
| `token` | 예 | Jenkins 서버에 인증하는 데 사용할 Jenkins 사용자의 API 토큰입니다. 이 사용자에게는 수행하려는 작업을 실행하는 데 필요한 권한이 있어야 합니다. Jenkins 사용자 설정에서 API 토큰을 생성할 수 있습니다. |

모든 자격 증명을 하나의 파일에 포함합니다.


{{< code-block lang="json" filename="/etc/dd-action-runner/config/credentials/jenkins_token.json" disable_copy="false" collapsible="true" >}}
{
        "auth_type": "Token Auth",
        "credentials": [
                {
                        "tokenName": "username",
                        "tokenValue": "USERNAME"
                },
                {
                        "tokenName": "token",
                        "tokenValue": "API_TOKEN"
                },
                {
                        "tokenName": "domain",
                        "tokenValue": "DOMAIN"
                }
        ]
}
{{< /code-block >}}

`USERNAME`, `API_TOKEN` 및 `DOMAIN`을 자격 증명으로 바꾸세요.


러너의 Connection에서 Private Action 러너 컨테이너에 있는 자격 증명 파일의 위치를 지정하세요. 이 예시에서 자격 증명 파일은 `/etc/dd-action-runner/config/credentials/jenkins_token.json`에 저장됩니다.

{{< img src="actions/private_actions/par-jenkins-credentials.png" alt="자격 증명 파일의 경로는 '/etc/dd-action-runner/config/credentials/jenkins_token.json'입니다." style="width:80%;" >}}

{{% /tab %}}

{{% tab "MongoDB" %}}

MongoDB는 두 가지 인증 방법을 지원합니다.

- **SRV 인증**: MongoDB Atlas에 연결하거나 자동 복제본 세트 검색 및 장애 조치가 필요할 때 사용합니다. 이 방법은 DNS SRV 레코드를 사용하여 복제본 세트의 모든 멤버를 자동으로 검색합니다.
- **표준 인증**: MongoDB 서버에 직접 연결하거나 정확한 호스트와 포트를 지정해야 할 때 사용합니다.

### SRV 인증 {#srv-authentication}

MongoDB SRV 인증에는 다음 자격 증명이 필요합니다.

|  자격 증명    | 필수    | 설명 |
| -------------  | ----------- | ----------- |
| `username` | 예 | 인증을 위한 MongoDB 사용자 이름입니다. |
| `password` | 예 | 인증을 위한 MongoDB 비밀번호입니다. |
| `srvHost` | 예 | MongoDB Atlas 또는 복제본 세트 검색을 위한 SRV 호스트입니다. |
| `database` | 아니요 | 연결할 데이터베이스의 이름입니다. |

모든 자격 증명을 하나의 파일에 포함합니다.

{{< code-block lang="json" filename="/etc/dd-action-runner/config/credentials/mongodb_srv_token.json" disable_copy="false" collapsible="true" >}}
{
        "auth_type": "Token Auth",
        "credentials": [
                {
                        "tokenName": "username",
                        "tokenValue": "USERNAME"
                },
                {
                        "tokenName": "password",
                        "tokenValue": "PASSWORD"
                },
                {
                        "tokenName": "srvHost",
                        "tokenValue": "SRV_HOST"
                },
                {
                        "tokenName": "database",
                        "tokenValue": "DATABASE"
                }
        ]
}
{{< /code-block >}}

`USERNAME`, `PASSWORD`, `SRV_HOST` 및 `DATABASE`를 자격 증명으로 바꾸세요.

러너의 Connection에서 Private Action 러너 컨테이너에 있는 자격 증명 파일의 위치를 지정하세요. 이 예시에서 자격 증명 파일은 `/etc/dd-action-runner/config/credentials/mongodb_srv_token.json`에 저장됩니다.

{{< img src="actions/private_actions/par-mongodb-srv-credentials.png" alt="자격 증명 파일의 경로는 '/etc/dd-action-runner/config/credentials/mongodb_srv_token.json'입니다." style="width:80%;" >}}

### 표준 인증 {#standard-authentication}

MongoDB 표준 인증은 다음 자격 증명을 허용합니다.

|  자격 증명    | 필수    | 설명 |
| -------------  | ----------- | ----------- |
| `username` | 예 | 인증을 위한 MongoDB 사용자 이름입니다. |
| `password` | 예 | 인증을 위한 MongoDB 비밀번호입니다. |
| `host` | 예 | MongoDB 서버의 호스트 이름입니다. |
| `port` | 예 | MongoDB 서버의 포트 번호입니다. |
| `database` | 아니요 | 연결할 데이터베이스의 이름입니다. |
| `authSource` | 아니요 | 사용자의 자격 증명이 포함된 데이터베이스입니다. 사용자가 `admin`과 다른 데이터베이스에 생성된 경우 이를 지정하세요. |
| `authMechanism` | 아니요 | 사용할 인증 메커니즘입니다. 특정 인증 메커니즘이 필요한 경우 이를 지정하세요. |

모든 자격 증명을 하나의 파일에 포함합니다.

{{< code-block lang="json" filename="/etc/dd-action-runner/config/credentials/mongodb_standard_token.json" disable_copy="false" collapsible="true" >}}
{
        "auth_type": "Token Auth",
        "credentials": [
                {
                        "tokenName": "username",
                        "tokenValue": "USERNAME"
                },
                {
                        "tokenName": "password",
                        "tokenValue": "PASSWORD"
                },
                {
                        "tokenName": "host",
                        "tokenValue": "HOST"
                },
                {
                        "tokenName": "port",
                        "tokenValue": "PORT"
                },
                {
                        "tokenName": "database",
                        "tokenValue": "DATABASE"
                },
                {
                        "tokenName": "authSource",
                        "tokenValue": "AUTH_SOURCE"
                },
                {
                        "tokenName": "authMechanism",
                        "tokenValue": "AUTH_MECHANISM"
                }
        ]
}
{{< /code-block >}}

`USERNAME`, `PASSWORD`, `HOST`, `PORT`, `DATABASE`, `AUTH_SOURCE` 및 `AUTH_MECHANISM`을 자격 증명으로 바꾸세요.

러너의 Connection에서 Private Action 러너 컨테이너에 있는 자격 증명 파일의 위치를 지정하세요. 이 예시에서 자격 증명 파일은 `/etc/dd-action-runner/config/credentials/mongodb_standard_token.json`에 저장됩니다.

{{< img src="actions/private_actions/par-mongodb-standard-credentials.png" alt="자격 증명 파일의 경로는 '/etc/dd-action-runner/config/credentials/mongodb_standard_token.json'입니다." style="width:80%;" >}}

{{% /tab %}}


{{% tab "PostgreSQL" %}}

PostgreSQL 연결에서는 다음 자격 증명을 허용합니다.

|  자격 증명    | 필수    | 설명 |
| -------------  | ----------- | ----------- |
| `host` | 예 | 연결할 호스트의 이름입니다. 자세한 내용은 [공식 PostGreSQL 문서][101]를 참조하세요. |
| `port` | 예 | 서버 호스트에서 연결할 포트 번호 또는 UNIX 도메인 연결을 위한 소켓 파일 이름 확장자입니다. 자세한 내용은 [공식 PostGreSQL 문서][102]를 참조하세요. |
| `user` | 예 | 연결할 PostgreSQL 사용자 이름입니다.<br><br>자세한 내용은 [공식 PostGreSQL 문서][103]를 참조하세요. |
| `password` | 예 | 서버가 암호 인증을 요구할 경우 사용할 암호입니다. <br><br>자세한 내용은 [공식 PostGreSQL 문서][104]를 참조하세요. |
| `database` | 예 | 데이터베이스 이름입니다. 자세한 내용은 [공식 PostGreSQL 문서][105]를 참조하세요. |
| `sslmode` | 예 | 이 옵션은 서버와 보안 SSL TCP/IP 연결을 협상할지 여부와 우선순위를 결정합니다.<br><br>사용 가능한 옵션은 `require` 및 `disable`입니다.<br><br>자세한 내용은 [공식 PostGreSQL 문서][106]를 참조하세요. |
| `applicationName` | 아니요 | PostGreSQL 서버에 연결하는 애플리케이션의 이름입니다. 자세한 내용은 [공식 PostGreSQL 문서][107]를 참조하세요. |
| `searchPath` | 아니요 | 스키마 검색 경로를 설정합니다. 자세한 내용은 [공식 PostGreSQL 문서][108]를 참조하세요. |

모든 자격 증명을 하나의 파일에 포함합니다.


{{< code-block lang="json" filename="/etc/dd-action-runner/config/credentials/postgresql_token.json" disable_copy="false" collapsible="true" >}}
{
        "auth_type": "Token Auth",
        "credentials": [
                {
                        "tokenName": "host",
                        "tokenValue": "HOST_NAME"
                },
                {
                        "tokenName": "port",
                        "tokenValue": "PORT"
                },
                {
                        "tokenName": "user",
                        "tokenValue": "USER"
                },
                {
                        "tokenName": "password",
                        "tokenValue": "PASSWORD"
                },
                {
                        "tokenName": "database",
                        "tokenValue": "DATABASE_NAME"
                },
                {
                        "tokenName": "sslmode",
                        "tokenValue": "require"
                },
                {
                        "tokenName": "applicationName",
                        "tokenValue": "APPLICATION_NAME"
                },
                {
                        "tokenName": "searchPath",
                        "tokenValue": "SEARCH_PATH"
                }
        ]
}
{{< /code-block >}}

예시 값을 자격 증명으로 바꾸세요.


러너의 Connection에서 Private Action 러너 컨테이너에 있는 자격 증명 파일의 위치를 지정하세요. 이 예시에서 자격 증명 파일은 `/etc/dd-action-runner/config/credentials/postgresql_token.json`에 저장됩니다.

{{< img src="actions/private_actions/par-postgresql-credentials.png" alt="자격 증명 파일의 경로는 '/etc/dd-action-runner/config/credentials/postgresql_token.json'입니다." style="width:80%;" >}}

[101]: https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNECT-HOST
[102]: https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNECT-PORT
[103]: https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNECT-USER
[104]: https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNECT-PASSWORD
[105]: https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNECT-DBNAME
[106]: https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNECT-SSLMODE
[107]: https://www.postgresql.org/docs/current/runtime-config-logging.html#GUC-APPLICATION-NAME
[108]: https://www.postgresql.org/docs/15/ddl-schemas.html#DDL-SCHEMAS-PATH
{{% /tab %}}

{{% tab "Temporal" %}}

Temporal은 세 가지 인증 방법을 지원합니다.

- **mTLS 인증**: 양방향 서버-클라이언트 인증서 인증을 통한 가장 안전한 통신에 사용합니다.
- **TLS 인증**: 서버 인증서 인증을 통한 안전한 통신에 사용합니다.
- **인증 없음**: 암호화되지 않은 통신에 사용합니다(프로덕션 환경에서는 권장되지 않습니다).

### mTLS 인증 {#mtls-authentication}

Temporal mTLS 인증에는 다음 자격 증명이 필요합니다.

|  자격 증명    | 필수    | 설명 |
| -------------  | ----------- | ----------- |
| `serverAddress` | 예 | 서버 주소(호스트 이름 및 선택적 포트)입니다. 정의되지 않은 경우 포트는 기본값인 7233으로 설정됩니다. |
| `serverNameOverride` | 예 | TLS 호스트 확인에 사용되는 대상 이름(SNI)을 재정의하는 서버 이름입니다. 이 기능은 Temporal 서버 앞에 리버스 프록시가 있고 사용자 지정 규칙에 따라 트래픽을 적절한 백엔드로 라우팅하기 위해 SNI를 재정의하려는 경우 유용할 수 있습니다. |
| `serverRootCACertificate` | 예 | 서버에서 사용하는 루트 CA 인증서입니다. 설정하지 않아도 서버 인증서가 신뢰할 수 있는 기관에서 발급된 경우에는 검증에 성공합니다(예: 신뢰할 수 있는 공인 CA를 통해 서버 인증서를 발급하는 AWS, Google Cloud 또는 Azure와 같은 클라우드 공급자를 사용하는 경우). |
| `clientCertPairCrt` | 예 | mTLS 연결을 위한 클라이언트 인증서입니다. |
| `clientCertPairKey` | 예 | mTLS 연결을 위한 클라이언트 키입니다. |

모든 자격 증명을 하나의 파일에 포함합니다.

{{< code-block lang="json" filename="/etc/dd-action-runner/config/credentials/temporal_mTLS_token.json" disable_copy="false" collapsible="true" >}}
{
        "auth_type": "Token Auth",
        "credentials": [
                {
                        "tokenName": "serverAddress",
                        "tokenValue": "SERVER_ADDRESS"
                },
                {
                        "tokenName": "serverNameOverride",
                        "tokenValue": "SERVER_NAME_OVERRIDE"
                },
                {
                        "tokenName": "serverRootCACertificate",
                        "tokenValue": "SERVER_ROOT_CA_CERTIFICATE"
                },
                {
                        "tokenName": "clientCertPairCrt",
                        "tokenValue": "CLIENT_CERTIFICATE"
                },
                {
                        "tokenName": "clientCertPairKey",
                        "tokenValue": "CLIENT_KEY"
                }
        ]
}
{{< /code-block >}}

`SERVER_ADDRESS`, `SERVER_NAME_OVERRIDE`, `SERVER_ROOT_CA_CERTIFICATE`, `CLIENT_CERTIFICATE` 및 `CLIENT_KEY`를 자격 증명으로 바꾸세요.

러너의 Connection에서 Private Action 러너 컨테이너에 있는 자격 증명 파일의 위치를 지정하세요. 이 예시에서 자격 증명 파일은 `/etc/dd-action-runner/config/credentials/temporal_mTLS_token.json`에 저장됩니다.

{{< img src="actions/private_actions/par-temporal-mtls-credentials.png" alt="자격 증명 파일의 경로는 '/etc/dd-action-runner/config/credentials/temporal_mTLS_token.json'입니다." style="width:80%;" >}}

### TLS 인증 {#tls-authentication}

Temporal TLS 인증에는 다음 자격 증명이 필요합니다.

|  자격 증명    | 필수    | 설명 |
| -------------  | ----------- | ----------- |
| `serverAddress` | 예 | 서버 주소(호스트 이름 및 선택적 포트)입니다. 정의되지 않은 경우 포트는 기본값인 7233으로 설정됩니다. |
| `serverNameOverride` | 예 | TLS 호스트 확인에 사용되는 대상 이름(SNI)을 재정의하는 서버 이름입니다. 이 기능은 Temporal 서버 앞에 리버스 프록시가 있고 사용자 지정 규칙에 따라 트래픽을 적절한 백엔드로 라우팅하기 위해 SNI를 재정의하려는 경우 유용할 수 있습니다. |
| `serverRootCACertificate` | 예 | 서버에서 사용하는 루트 CA 인증서입니다. 설정하지 않아도 서버 인증서가 신뢰할 수 있는 기관에서 발급된 경우에는 검증에 성공합니다(예: 신뢰할 수 있는 공인 CA를 통해 서버 인증서를 발급하는 AWS, Google Cloud 또는 Azure와 같은 클라우드 공급자를 사용하는 경우). |

모든 자격 증명을 하나의 파일에 포함합니다.

{{< code-block lang="json" filename="/etc/dd-action-runner/config/credentials/temporal_TLS_token.json" disable_copy="false" collapsible="true" >}}
{
        "auth_type": "Token Auth",
        "credentials": [
                {
                        "tokenName": "serverAddress",
                        "tokenValue": "SERVER_ADDRESS"
                },
                {
                        "tokenName": "serverNameOverride",
                        "tokenValue": "SERVER_NAME_OVERRIDE"
                },
                {
                        "tokenName": "serverRootCACertificate",
                        "tokenValue": "SERVER_ROOT_CA_CERTIFICATE"
                }
        ]
}
{{< /code-block >}}

`SERVER_ADDRESS`, `SERVER_NAME_OVERRIDE` 및 `SERVER_ROOT_CA_CERTIFICATE`를 자격 증명으로 바꾸세요.

러너의 Connection에서 Private Action 러너 컨테이너에 있는 자격 증명 파일의 위치를 지정하세요. 이 예시에서 자격 증명 파일은 `/etc/dd-action-runner/config/credentials/temporal_TLS_token.json`에 저장됩니다.

{{< img src="actions/private_actions/par-temporal-tls-credentials.png" alt="자격 증명 파일의 경로는 '/etc/dd-action-runner/config/credentials/temporal_TLS_token.json'입니다." style="width:80%;" >}}

### 인증 없음 {#no-authentication-1}

이 연결 유형은 암호화되지 않은 통신을 사용하며 프로덕션 환경에는 권장되지 않습니다. 개발 환경이나 연결 테스트에만 사용해야 합니다. 프로덕션 환경에서는 TLS 또는 mTLS 인증 유형을 사용하는 것이 좋습니다.

이 연결 유형에는 다음 자격 증명이 필요합니다.

|  자격 증명    | 필수    | 설명 |
| -------------  | ----------- | ----------- |
| `address` | 예 | 서버 호스트 이름 및 선택적 포트입니다. 주소에 호스트만 포함된 경우 포트는 기본값 7233으로 설정됩니다. |


이 연결 유형의 경우 주소는 시크릿이 아니며 Datadog에 직접 저장되므로 자격 증명 파일을 생성할 필요가 없습니다. 구성하려면 서버 주소를 입력하세요.

{{< img src="actions/private_actions/par-temporal-no-tls-credentials.png" alt="보안되지 않은 Temporal 연결" style="width:80%;" >}}

{{% /tab %}}

{{< /tabs >}}

[1]: /ko/actions/private_actions