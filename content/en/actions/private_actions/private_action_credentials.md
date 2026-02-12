---
title: Handling Private Action Credentials
description: Configure credentials for private actions including HTTP, Jenkins, PostgreSQL, MongoDB, and Temporal authentication methods.
aliases:
- service_management/workflows/private_actions/private_action_credentials
- service_management/app_builder/private_actions/private_action_credentials
disable_toc: false
---

## Overview

Private actions allow your Datadog workflows and apps to interact with services hosted on your private network without exposing your services to the public internet. To use private actions, you must install a private action runner on a host in your network and pair the runner with a Datadog Connection. For more information on setting up a runner and pairing it with a connection, see [Private Actions][1].

Some private actions, such as Jenkins and PostgreSQL, require credentials to function. To configure credentials for a private action, you must:
1. Navigate to the directory where you stored your runner's configuration (default: `config/credentials/`).
2. In this directory, create a JSON file using the JSON structure provided in Credential files. Alternatively, edit the default JSON file automatically generated during runner bootstrap.
   - **Note**: These files are available to the runner in its `/etc/dd-action-runner/config/credentials/` directory.
3. Specify the path to the credential in the runner's connection. Use the path to the file on the container. For example: `/etc/dd-action-runner/config/credentials/jenkins_token.json`.

## Credential files

{{< tabs >}}
{{% tab "HTTP" %}}

HTTP supports three authentication methods:

- **Basic authentication**: Use when your HTTP server requires username and password authentication.
- **Token authentication**: Use when your HTTP server requires one or more custom tokens in headers or query parameters.
- **No authentication**: Use when your HTTP server does not require authentication.

### Basic authentication

Basic authentication requires a credential file with a username and a password:

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

Replace `USERNAME` and `PASSWORD` with your username and password.

In the runner's connection, specify the location of the credential file on the private action runner's container. In this example, the credential file is stored at `/etc/dd-action-runner/config/credentials/http_basic.json`.

{{< img src="service_management/par-http-basic-credentials.png" alt="The path to the credential file is '/etc/dd-action-runner/config/credentials/http_basic.json'" style="width:80%;" >}}

### Token authentication

Token authentication requires a credential file with an array of token names and values:

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

Replace `TOKEN1`, `TOKEN2`, `VALUE1`, and `VALUE2` with your token names and values.

In the runner's connection, specify the location of the credential file on the private action runner's container. In this example, the credential file is stored at `/etc/dd-action-runner/config/credentials/http_token.json`.

{{< img src="service_management/par-http-token-credentials.png" alt="The path to the credential file is '/etc/dd-action-runner/config/credentials/http_token.json'" style="width:80%;" >}}

### No authentication

This connection type is suitable for HTTP endpoints that do not require authentication.

To configure this connection, specify the endpoint URL:

{{< img src="service_management/par-http-no-auth-credentials.png" alt="An HTTP connection without authentication" style="width:80%;" >}}

[101]: https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNSTRING-URIS
{{% /tab %}}

{{% tab "GitLab" %}}

The GitLab connection accepts the following credentials:

|  Credential    | Required    | Description |
| -------------  | ----------- | ----------- |
| `baseURL` | Yes | The URL of your self-managed GitLab instance. For more information, see [GitLab API documentation][201]. |
| `gitlabApiToken` | Yes | The API token to authenticate with your GitLab instance. Generate this token in your GitLab user settings. |

Include all credentials in a single file:

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



Replace `GITLAB_API_TOKEN` and `GITLAB_URL` with your credentials.

In the runner's connection, specify the location of the credential file on the private action runner's container. In this example, the credential file is stored at `/etc/dd-action-runner/config/credentials/gitlab_token.json`.

{{< img src="service_management/par-gitlab-credentials.png" alt="The path to the credential file is '/etc/dd-action-runner/config/credentials/gitlab_token.json'" style="width:80%;" >}}

[201]: https://docs.gitlab.com/ee/api/
{{% /tab %}}

{{% tab "Jenkins" %}}

The Jenkins connection accepts the following credentials:

|  Credential    | Required    | Description |
| -------------  | ----------- | ----------- |
| `domain` | Yes | The domain of the Jenkins server that you want to connect to. |
| `username` | Yes | The username of the Jenkins user that you want to use to authenticate with the Jenkins server. This user must have the necessary permissions to perform the actions you want your runner to perform. |
| `token` | Yes | The API token of the Jenkins user that you want to use to authenticate with the Jenkins server. This user must have the necessary permissions to perform the actions you want to perform. You can generate an API token in the Jenkins user settings. |

Include all credentials in a single file:


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

Replace `USERNAME`, `API_TOKEN`, and `DOMAIN` with your credentials.


In the runner's connection, specify the location of the credential file on the private action runner's container. In this example, the credential file is stored at `/etc/dd-action-runner/config/credentials/jenkins_token.json`.

{{< img src="service_management/par-jenkins-credentials.png" alt="The path to the credential file is '/etc/dd-action-runner/config/credentials/jenkins_token.json'" style="width:80%;" >}}

{{% /tab %}}

{{% tab "MongoDB" %}}

MongoDB supports two authentication methods:

- **SRV authentication**: Use when connecting to MongoDB Atlas or when you need automatic replica set discovery and failover. This method uses a DNS SRV record to automatically discover all members of a replica set.
- **Standard authentication**: Use when connecting directly to a MongoDB server or when you need to specify the exact host and port.

### SRV authentication

The MongoDB SRV authentication requires the following credentials:

|  Credential    | Required    | Description |
| -------------  | ----------- | ----------- |
| `username` | Yes | The MongoDB username for authentication. |
| `password` | Yes | The MongoDB password for authentication. |
| `srvHost` | Yes | The SRV host for MongoDB Atlas or replica set discovery. |
| `database` | No | The name of the database to connect to. |

Include all credentials in a single file:

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

Replace `USERNAME`, `PASSWORD`, `SRV_HOST`, and `DATABASE` with your credentials.

In the runner's connection, specify the location of the credential file on the private action runner's container. In this example, the credential file is stored at `/etc/dd-action-runner/config/credentials/mongodb_srv_token.json`.

{{< img src="service_management/par-mongodb-srv-credentials.png" alt="The path to the credential file is '/etc/dd-action-runner/config/credentials/mongodb_srv_token.json'" style="width:80%;" >}}

### Standard authentication

The MongoDB Standard authentication accepts the following credentials:

|  Credential    | Required    | Description |
| -------------  | ----------- | ----------- |
| `username` | Yes | The MongoDB username for authentication. |
| `password` | Yes | The MongoDB password for authentication. |
| `host` | Yes | The hostname of the MongoDB server. |
| `port` | Yes | The port number of the MongoDB server. |
| `database` | No | The name of the database to connect to. |
| `authSource` | No | The database containing the user's credentials. Specify if the user is created in a different database than `admin`. |
| `authMechanism` | No | The authentication mechanism to use. Specify if a specific authentication mechanism is required. |

Include all credentials in a single file:

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

Replace `USERNAME`, `PASSWORD`, `HOST`, `PORT`, `DATABASE`, `AUTH_SOURCE`, and `AUTH_MECHANISM` with your credentials.

In the runner's connection, specify the location of the credential file on the private action runner's container. In this example, the credential file is stored at `/etc/dd-action-runner/config/credentials/mongodb_standard_token.json`.

{{< img src="service_management/par-mongodb-standard-credentials.png" alt="The path to the credential file is '/etc/dd-action-runner/config/credentials/mongodb_standard_token.json'" style="width:80%;" >}}

{{% /tab %}}


{{% tab "PostgreSQL" %}}

The PostgreSQL connection accepts the following credentials:

|  Credential    | Required    | Description |
| -------------  | ----------- | ----------- |
| `host` | Yes | The name of the host to connect to. For more information, see [the official PostGreSQL documentation][101]. |
| `port` | Yes | The port number to connect to at the server host, or socket filename extension for UNIX-domain connections. For more information, see [the official PostGreSQL documentation][102]. |
| `user` | Yes | The PostgreSQL user name to connect as.<br><br>For more information, see [the official PostGreSQL documentation][103]. |
| `password` | Yes | The password to use if the server demands password authentication. <br><br>For more information, see [the official PostGreSQL documentation][104]. |
| `database` | Yes | The database name. For more information, see [the official PostGreSQL documentation][105]. |
| `sslmode` | Yes | This option determines whether or with what priority a secure SSL TCP/IP connection is negotiated with the server.<br><br>Available options are `require` and `disable`.<br><br>For more information, see [the official PostGreSQL documentation][106]. |
| `applicationName` | No | The name of the application connecting to the PostGreSQL server. For more information, see [the official PostGreSQL documentation][107]. |
| `searchPath` | No | Set a schema search path. For more information, see [the official PostGreSQL documentation][108]. |

Include all credentials in a single file:


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

Replace the example values with your credentials.


In the runner's connection, specify the location of the credential file on the private action runner's container. In this example, the credential file is stored at `/etc/dd-action-runner/config/credentials/postgresql_token.json`.

{{< img src="service_management/par-postgresql-credentials.png" alt="The path to the credential file is '/etc/dd-action-runner/config/credentials/postgresql_token.json`'" style="width:80%;" >}}

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

The Temporal supports three authentication methods:

- **mTLS authentication**: Use for the most secure communication with two-way server to client certificate authentication.
- **TLS authentication**: Use for secure communication with server certificate authentication.
- **No authentication**: Use for unencrypted communication (not recommended for production environments).

### mTLS authentication

The Temporal mTLS authentication requires the following credentials:

|  Credential    | Required    | Description |
| -------------  | ----------- | ----------- |
| `serverAddress` | Yes | The server address (hostname and optional port). If undefined, port defaults to 7233. |
| `serverNameOverride` | Yes | The server name that overrides the target name (SNI) used for TLS host name checking. This can be useful when you have a reverse proxy in front of a temporal server and want to override the SNI to route traffic to the appropriate backend based on custom rules. |
| `serverRootCACertificate` | Yes | The root CA certificate used by the server. If not set, and if the server's certificate is issued by a trusted authority, verification will still succeed (for example, if using a cloud provider like AWS, Google Cloud, or Azure, which issue server certificates through trusted, recognized CAs). |
| `clientCertPairCrt` | Yes | The client certificate for connecting with mTLS. |
| `clientCertPairKey` | Yes | The client key for connecting with mTLS. |

Include all credentials in a single file:

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

Replace `SERVER_ADDRESS`, `SERVER_NAME_OVERRIDE`, `SERVER_ROOT_CA_CERTIFICATE`, `CLIENT_CERTIFICATE`, and `CLIENT_KEY` with your credentials.

In the runner's connection, specify the location of the credential file on the private action runner's container. In this example, the credential file is stored at `/etc/dd-action-runner/config/credentials/temporal_mTLS_token.json`.

{{< img src="service_management/par-temporal-mtls-credentials.png" alt="The path to the credential file is '/etc/dd-action-runner/config/credentials/temporal_mTLS_token.json'" style="width:80%;" >}}

### TLS authentication

The Temporal TLS authentication requires the following credentials:

|  Credential    | Required    | Description |
| -------------  | ----------- | ----------- |
| `serverAddress` | Yes | The server address (hostname and optional port). If undefined, port defaults to 7233. |
| `serverNameOverride` | Yes | The server name that overrides the target name (SNI) used for TLS host name checking. This can be useful when you have a reverse proxy in front of a temporal server and want to override the SNI to route traffic to the appropriate backend based on custom rules. |
| `serverRootCACertificate` | Yes | The root CA certificate used by the server. If not set, and if the server's certificate is issued by a trusted authority, verification will still succeed (for example, if using a cloud provider like AWS, Google Cloud, or Azure, which issue server certificates through trusted, recognized CAs). |

Include all credentials in a single file:

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

Replace `SERVER_ADDRESS`, `SERVER_NAME_OVERRIDE`, and `SERVER_ROOT_CA_CERTIFICATE` with your credentials.

In the runner's connection, specify the location of the credential file on the private action runner's container. In this example, the credential file is stored at `/etc/dd-action-runner/config/credentials/temporal_TLS_token.json`.

{{< img src="service_management/par-temporal-tls-credentials.png" alt="The path to the credential file is '/etc/dd-action-runner/config/credentials/temporal_TLS_token.json'" style="width:80%;" >}}

### No authentication

This connection type uses unencrypted communication and is not recommended for production environments. It should only be used in development environments or for testing connections. For production use, consider using either the TLS or mTLS authentication types.

The connection type requires the following credentials:

|  Credential    | Required    | Description |
| -------------  | ----------- | ----------- |
| `address` | Yes | The server hostname and optional port. Port defaults to 7233 if address contains only host. |


For this connection type, you do not need to create a credential file since the address is not a secret and is stored directly in Datadog. To configure, provide the server address:

{{< img src="service_management/par-temporal-no-tls-credentials.png" alt="An unsecured temporal connection" style="width:80%;" >}}

{{% /tab %}}

{{< /tabs >}}

[1]: /actions/private_actions
