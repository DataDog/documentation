---
aliases:
- /ja/service_management/workflows/private_actions/private_action_credentials
- /ja/service_management/app_builder/private_actions/private_action_credentials
- /ja/actions/private_actions/private_action_credentials/
description: HTTP、Jenkins、PostgreSQL、MongoDB、Temporal 認証メソッドを含む、Private Actions の資格情報を設定します。
disable_toc: false
title: Private Actions 資格情報の処理
---
## 概要 {#overview}

Private Actions を使用すると、パブリックインターネットにサービスを公開することなく、プライベートネットワーク上でホストされているサービスと Datadog のワークフローやアプリをやり取りさせることができます。Private Actions を使用するには、ネットワーク内のホストにプライベートアクションランナーをインストールし、そのランナーを Datadog コネクションとペアリングする必要があります。ランナーのセットアップとコネクションとのペアリングの詳細については、[Private Actions][1]を参照してください。

Jenkins や PostgreSQL など、一部の Private Actions は、機能するために資格情報を必要とします。Private Actions の資格情報を設定するには、次の手順を実行する必要があります。
1. ランナーの構成を保存したディレクトリに移動します（デフォルト: `config/credentials/`）。
2. このディレクトリに、資格情報ファイルで提供されている JSON 構造を使用して JSON ファイルを作成します。または、ランナーのブートストラップ中に自動生成されたデフォルトの JSON ファイルを編集します。
   - **注**: これらのファイルは、ランナーの `/etc/dd-action-runner/config/credentials/` ディレクトリで利用可能です。
3. プライベートアクションランナーのコネクションで資格情報へのパスを指定します。コンテナ上のファイルへのパスを使用してください。たとえば: `/etc/dd-action-runner/config/credentials/jenkins_token.json`。

## 資格情報ファイル {#credential-files}

{{< tabs >}}
{{% tab "HTTP" %}}

HTTP は 3 つの認証メソッドをサポートしています。

- **基本認証**: HTTP サーバーでユーザー名とパスワードによる認証が必要な場合に使用します。
- **トークン認証**: HTTP サーバーでヘッダーまたはクエリパラメータに 1 つ以上のカスタムトークンが必要な場合に使用します。
- **認証なし**: HTTP サーバーで認証が不要な場合に使用します。

### 基本認証 {#basic-authentication}

基本認証には、ユーザー名とパスワードを含む資格情報ファイルが必要です。

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

`USERNAME` と `PASSWORD` を、ユーザー名とパスワードに置き換えてください。

ランナーのコネクションで、プライベートアクションランナーのコンテナ上にある認証情報ファイルの場所を指定してください。この例では、認証情報ファイルは `/etc/dd-action-runner/config/credentials/http_basic.json` に保存されています。

{{< img src="actions/private_actions/par-http-basic-credentials.png" alt="認証情報ファイルへのパスは '/etc/dd-action-runner/config/credentials/http_basic.json' です。" style="width:80%;" >}}

### トークン認証 {#token-authentication}

トークン認証には、トークン名と値の配列を含む認証情報ファイルが必要です。

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

`TOKEN1`、`TOKEN2`、`VALUE1`、および `VALUE2` を、実際のトークン名と値に置き換えてください。

ランナーのコネクションで、プライベートアクションランナーのコンテナ上にある認証情報ファイルの場所を指定してください。この例では、認証情報ファイルは `/etc/dd-action-runner/config/credentials/http_token.json` に保存されています。

{{< img src="actions/private_actions/par-http-token-credentials.png" alt="認証情報ファイルへのパスは '/etc/dd-action-runner/config/credentials/http_token.json' です。" style="width:80%;" >}}

### 認証なし{#no-authentication}

この接続タイプは、認証を必要としない HTTP エンドポイントに適しています。

この接続を設定するには、エンドポイント URL を指定してください。

{{< img src="actions/private_actions/par-http-no-auth-credentials.png" alt="認証なしの HTTP 接続" style="width:80%;" >}}

{{% /tab %}}

{{% tab "GitLab" %}}

GitLab 接続では、以下の認証情報を使用できます。

|  認証情報    | 必須    | 説明 |
| -------------  | ----------- | ----------- |
| `baseURL` | はい | セルフマネージド型 GitLab インスタンスの URL。詳細については、[GitLab API ドキュメント][201]を参照してください。|
| `gitlabApiToken` | はい | GitLab インスタンスで認証するための API トークン。このトークンは、GitLab のユーザー設定で生成してください。|

すべての認証情報を 1 つのファイルに含めてください。

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



`GITLAB_API_TOKEN` と `GITLAB_URL` を認証情報に置き換えます。

ランナーのコネクションで、プライベートアクションランナーのコンテナ上にある認証情報ファイルの場所を指定してください。この例では、認証情報ファイルは `/etc/dd-action-runner/config/credentials/gitlab_token.json` に保存されています。

{{< img src="actions/private_actions/par-gitlab-credentials.png" alt="認証情報ファイルへのパスは '/etc/dd-action-runner/config/credentials/gitlab_token.json' です。" style="width:80%;" >}}

[201]: https://docs.gitlab.com/ee/api/
{{% /tab %}}

{{% tab "Jenkins" %}}

Jenkins 接続では、以下の認証情報を受け入れます。

|  認証情報    | 必須    | 説明 |
| -------------  | ----------- | ----------- |
| `domain` | はい | 接続先の Jenkins サーバーのドメイン。|
| `username` | はい | Jenkins サーバーでの認証に使用する Jenkins ユーザーのユーザー名。このユーザーには、ランナーに実行させるアクションを実行するために必要な権限が必要です。|
| `token` | はい | Jenkins サーバーでの認証に使用する Jenkins ユーザーの API トークン。このユーザーには、実行させるアクションを実行するために必要な権限が必要です。API トークンは Jenkins ユーザー設定で生成できます。|

すべての認証情報を 1 つのファイルに含めてください。


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

`USERNAME`、`API_TOKEN`、および `DOMAIN` を認証情報に置き換えます。


ランナーのコネクションで、プライベートアクションランナーのコンテナ上にある認証情報ファイルの場所を指定してください。この例では、認証情報ファイルは `/etc/dd-action-runner/config/credentials/jenkins_token.json` に保存されています。

{{< img src="actions/private_actions/par-jenkins-credentials.png" alt="認証情報ファイルへのパスは '/etc/dd-action-runner/config/credentials/jenkins_token.json' です。" style="width:80%;" >}}

{{% /tab %}}

{{% tab "MongoDB" %}}

MongoDB は 2 つの認証方法をサポートしています。

- **SRV 認証**: MongoDB Atlas に接続する場合、またはレプリカセットの自動検出とフェイルオーバーが必要な場合に使用します。このメソッドは、DNS SRV レコードを使用して、レプリカセットのすべてのメンバーを自動的に検出します。
- **標準認証**: MongoDB サーバーに直接接続する場合、または正確なホストとポートを指定する必要がある場合に使用します。

### SRV 認証 {#srv-authentication}

MongoDB SRV 認証には、以下の認証情報が必要です。

|  認証情報    | 必須    | 説明 |
| -------------  | ----------- | ----------- |
| `username` | はい | 認証に使用する MongoDB ユーザー名。|
| `password` | はい | 認証用のMongoDBパスワードです。|
| `srvHost` | はい | MongoDB Atlasまたはレプリカセット検出用のSRVホストです。|
| `database` | いいえ | 接続先のデータベース名です。|

すべての認証情報を 1 つのファイルに含めてください。

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

`USERNAME`、`PASSWORD`、`SRV_HOST`、および`DATABASE`を認証情報に置き換えてください。

ランナーのコネクションで、プライベートアクションランナーのコンテナ上にある認証情報ファイルの場所を指定してください。この例では、認証情報ファイルは `/etc/dd-action-runner/config/credentials/mongodb_srv_token.json` に保存されています。

{{< img src="actions/private_actions/par-mongodb-srv-credentials.png" alt="認証情報ファイルのパスは '/etc/dd-action-runner/config/credentials/mongodb_srv_token.json' です。" style="width:80%;" >}}

### 標準認証 {#standard-authentication}

MongoDB標準認証では、以下の認証情報を受け付けます。

|  認証情報    | 必須    | 説明 |
| -------------  | ----------- | ----------- |
| `username` | はい | 認証用のMongoDBユーザー名です。|
| `password` | はい | 認証用のMongoDBパスワードです。|
| `host` | はい | MongoDBサーバーのホスト名です。|
| `port` | はい | MongoDBサーバーのポート番号です。|
| `database` | いいえ | 接続先のデータベース名です。|
| `authSource` | いいえ | ユーザーの認証情報が含まれるデータベースです。`admin`とは異なるデータベースにユーザーが作成されているかどうかを指定します。|
| `authMechanism` | いいえ | 使用する認証メカニズムです。特定の認証メカニズムが必要かどうかを指定します。|

すべての認証情報を 1 つのファイルに含めてください。

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

`USERNAME`、`PASSWORD`、`HOST`、`PORT`、`DATABASE`、`AUTH_SOURCE`、および`AUTH_MECHANISM`を認証情報に置き換えてください。

ランナーのコネクションで、プライベートアクションランナーのコンテナ上にある認証情報ファイルの場所を指定してください。この例では、認証情報ファイルは`/etc/dd-action-runner/config/credentials/mongodb_standard_token.json`に保存されています。

{{< img src="actions/private_actions/par-mongodb-standard-credentials.png" alt="認証情報ファイルのパスは '/etc/dd-action-runner/config/credentials/mongodb_standard_token.json' です。" style="width:80%;" >}}

{{% /tab %}}


{{% tab "PostgreSQL" %}}

PostgreSQL コネクションでは、以下の認証情報を使用できます。

|  認証情報    | 必須    | 説明 |
| -------------  | ----------- | ----------- |
| `host` | はい | 接続先のホスト名。詳しくは、[PostgreSQL 公式ドキュメント][101]をご覧ください。|
| `port` | はい | サーバーホストへの接続に使用するポート番号、または UNIX ドメイン接続用のソケットファイル名拡張子。詳しくは、[PostgreSQL 公式ドキュメント][102]をご覧ください。|
| `user` | はい | 接続に使用する PostgreSQL ユーザー名。<br><br>詳しくは、[PostgreSQL 公式ドキュメント][103]をご覧ください。|
| `password` | はい | サーバーがパスワード認証を要求する場合に使用するパスワード。<br><br>詳しくは、[PostgreSQL 公式ドキュメント][104]をご覧ください。|
| `database` | はい | データベース名。詳しくは、[PostgreSQL 公式ドキュメント][105]をご覧ください。|
| `sslmode` | はい | このオプションは、サーバーとの安全な SSL TCP/IP コネクションをネゴシエートするかどうか、またその優先順位を決定します。<br><br>利用可能なオプションは `require` と `disable` です。<br><br>詳しくは、[PostgreSQL 公式ドキュメント][106]をご覧ください。|
| `applicationName` | いいえ | PostgreSQL サーバーに接続するアプリケーションの名前。詳しくは、[PostgreSQL 公式ドキュメント][107]をご覧ください。|
| `searchPath` | いいえ | スキーマ検索パスを設定してください。詳しくは、[PostgreSQL 公式ドキュメント][108]をご覧ください。|

すべての認証情報を 1 つのファイルに含めてください。


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

例の値を実際の認証情報に置き換えてください。


ランナーのコネクション設定で、プライベートアクションランナーのコンテナ上にある認証情報ファイルの場所を指定してください。この例では、認証情報ファイルは `/etc/dd-action-runner/config/credentials/postgresql_token.json` に保存されています。

{{< img src="actions/private_actions/par-postgresql-credentials.png" alt="認証情報ファイルへのパスは '/etc/dd-action-runner/config/credentials/postgresql_token.json' です。" style="width:80%;" >}}

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

Temporal は 3 つの認証方法をサポートしています。

- **mTLS 認証**: サーバーとクライアント間の双方向証明書認証による、最も安全な通信に使用します。
- **TLS 認証**: サーバー証明書認証による安全な通信に使用します。
- **認証なし**: 暗号化されていない通信に使用します（本番環境では推奨されません）。

### mTLS 認証 {#mtls-authentication}

Temporal mTLS 認証には、以下の認証情報が必要です。

|  認証情報    | 必須    | 説明 |
| -------------  | ----------- | ----------- |
| `serverAddress` | はい | サーバーアドレス（ホスト名およびオプションのポート）。未定義の場合、ポートはデフォルトで 7233 になります。 |
| `serverNameOverride` | はい | TLS ホスト名チェックに使用されるターゲット名（SNI）を上書きするサーバー名。これは、Temporal サーバーの前にリバースプロキシがあり、カスタムルールに基づいてトラフィックを適切なバックエンドにルーティングするために SNI を上書きしたい場合に役立ちます。|
| `serverRootCACertificate` | はい | サーバーによって使用されるルート CA 証明書。設定されていない場合でも、サーバーの証明書が信頼された認証局によって発行されているのであれば、検証は成功します（例: AWS、Google Cloud、Azure などのクラウドプロバイダーを使用している場合。これらは信頼された認識済みの CA を通じてサーバー証明書を発行します）。|
| `clientCertPairCrt` | はい | mTLS で接続するためのクライアント証明書。|
| `clientCertPairKey` | はい | mTLS で接続するためのクライアントキー。|

すべての認証情報を 1 つのファイルに含めてください。

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

`SERVER_ADDRESS`、`SERVER_NAME_OVERRIDE`、`SERVER_ROOT_CA_CERTIFICATE`、`CLIENT_CERTIFICATE`、および `CLIENT_KEY` をご自身の認証情報に置き換えてください。

ランナーのコネクション設定で、プライベートアクションランナーのコンテナ上にある認証情報ファイルの場所を指定してください。この例では、認証情報ファイルは `/etc/dd-action-runner/config/credentials/temporal_mTLS_token.json` に保存されています。

{{< img src="actions/private_actions/par-temporal-mtls-credentials.png" alt="認証情報ファイルへのパスは '/etc/dd-action-runner/config/credentials/temporal_mTLS_token.json' です。" style="width:80%;" >}}

### TLS 認証 {#tls-authentication}

Temporal TLS 認証には、以下の認証情報が必要です。

|  認証情報    | 必須    | 説明 |
| -------------  | ----------- | ----------- |
| `serverAddress` | はい | サーバーアドレス（ホスト名およびオプションのポート）。未定義の場合、ポートはデフォルトで 7233 になります。 |
| `serverNameOverride` | はい | TLSホスト名チェックに使用されるターゲット名を上書きするサーバー名（SNI）。これは、Temporal サーバーの前にリバースプロキシがあり、カスタムルールに基づいてトラフィックを適切なバックエンドにルーティングするために SNI を上書きしたい場合に役立ちます。|
| `serverRootCACertificate` | はい | サーバーによって使用されるルートCA証明書。設定されていない場合でも、サーバーの証明書が信頼された認証局によって発行されているのであれば、検証は成功します（例: AWS、Google Cloud、Azure などのクラウドプロバイダーを使用している場合。これらは信頼された認識済みの CA を通じてサーバー証明書を発行します）。|

すべての認証情報を 1 つのファイルに含めてください。

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

`SERVER_ADDRESS`、`SERVER_NAME_OVERRIDE`、および `SERVER_ROOT_CA_CERTIFICATE` をご自身の認証情報に置き換えてください。

ランナーのコネクション設定で、プライベートアクションランナーのコンテナ上にある認証情報ファイルの場所を指定してください。この例では、認証情報ファイルは `/etc/dd-action-runner/config/credentials/temporal_TLS_token.json` に保存されています。

{{< img src="actions/private_actions/par-temporal-tls-credentials.png" alt="認証情報ファイルへのパスは '/etc/dd-action-runner/config/credentials/temporal_TLS_token.json' です。" style="width:80%;" >}}

### 認証なし{#no-authentication-1}

このコネクションタイプは暗号化されていない通信を使用するため、本番環境での使用は推奨されません。開発環境またはコネクションテストでのみ使用してください。本番環境で使用する場合は、TLSまたはmTLS認証タイプの使用を検討してください。

このコネクションタイプには、以下の認証情報が必要です：

|  認証情報    | 必須    | 説明 |
| -------------  | ----------- | ----------- |
| `address` | はい | サーバーのホスト名およびオプションのポート。アドレスにホストのみが含まれている場合、ポートはデフォルトで7233になります。|


このコネクションタイプでは、アドレスは機密情報ではなくDatadogに直接保存されるため、認証情報ファイルを作成する必要はありません。設定するには、サーバーアドレスを指定してください：

{{< img src="actions/private_actions/par-temporal-no-tls-credentials.png" alt="セキュリティで保護されていないTemporalコネクション" style="width:80%;" >}}

{{% /tab %}}

{{< /tabs >}}

[1]: /ja/actions/private_actions