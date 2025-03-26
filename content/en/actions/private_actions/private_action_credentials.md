---
title: Handling Private Action Credentials
aliases:
- service_management/workflows/private_actions/private_action_credentials
- service_management/app_builder/private_actions/private_action_credentials
disable_toc: false
---

{{< callout url="https://www.datadoghq.com/product-preview/private-actions/" btn_hidden="false" header="Join the Preview!">}}
Private Actions are in Preview. Use this form to request access today.
{{< /callout >}}

## Overview

Private actions allow your Datadog workflows and apps to interact with services hosted on your private network without exposing your services to the public internet. To use private actions, you must install a private action runner on a host in your network and pair the runner with a Datadog Connection. For more information on setting up a runner and pairing it with a connection, see [Private Actions][1].

Some private actions, such as Jenkins and PostgreSQL, require credentials to function. To configure credentials for a private action, you must:
1. Create a JSON file for the credential and use the JSON structure provided in [Credential files](#credential-files). Alternatively, you can use the default JSON file automatically generated during runner bootstrap (located by default at `/etc/dd-action-runner/credentials/`)
2. Store your credential files in the configuration directory you created during setup.
3. Specify the path to the credential in the runner's connection. Use the path to the credential on the container. For example: `/etc/dd-action-runner/credentials/jenkins_token.json`.

## Credential files

{{< tabs >}}
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

Include all credentials in a single file.

In the runner's connection, specify the location of the credential file on the private action runner's container. In this example, all three credentials are stored in a single file. Replace the capitalized example values with your credentials.

{{< code-block lang="json" filename="/etc/dd-action-runner/credentials/postgresql_token.json" disable_copy="false" collapsible="true" >}}
{
        "auth_type": "Token Auth",
        "credentials": [
                {
                        "tokenName": "host",
                        "tokenValue": "YOUR_HOST_NAME"
                },
                {
                        "tokenName": "port",
                        "tokenValue": "YOUR_PORT"
                },
                {
                        "tokenName": "user",
                        "tokenValue": "YOUR_USER"
                },
                {
                        "tokenName": "password",
                        "tokenValue": "YOUR_PASSWORD"
                },
                {
                        "tokenName": "database",
                        "tokenValue": "YOUR_DATABASE_NAME"
                },
                {
                        "tokenName": "sslmode",
                        "tokenValue": "disable"
                },
                {
                        "tokenName": "applicationName",
                        "tokenValue": "YOUR_APPLICATION_NAME"
                },
                {
                        "tokenName": "searchPath",
                        "tokenValue": "YOUR_SEARCH_PATH"
                }
        ]
}
{{< /code-block >}}

In the runner's connection, specify the location of the credential file on the private action runner's container. Your PostgreSQL connection points to the same path for all credentials. In this example, the credential file is stored at `/etc/dd-action-runner/credentials/postgresql_token.json` on the runner.

{{< img src="service_management/par-postgresql-credentials.png" alt="The path to the credential file is '/etc/dd-action-runner/credentials/postgresql_token.json`'" style="width:80%;" >}}

[101]: https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNECT-HOST
[102]: https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNECT-PORT
[103]: https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNECT-USER
[104]: https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNECT-PASSWORD
[105]: https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNECT-DBNAME
[106]: https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNECT-SSLMODE
[107]: https://www.postgresql.org/docs/current/runtime-config-logging.html#GUC-APPLICATION-NAME
[108]: https://www.postgresql.org/docs/15/ddl-schemas.html#DDL-SCHEMAS-PATH
{{% /tab %}}

{{% tab "Jenkins" %}}

The Jenkins connection accepts the following credentials:

|  Credential    | Required    | Description |
| -------------  | ----------- | ----------- |
| `domain` | Yes | The domain of the Jenkins server that you want to connect to. |
| `username` | Yes | The username of the Jenkins user that you want to use to authenticate with the Jenkins server. This user must have the necessary permissions to perform the actions you want your runner to perform. |
| `token` | Yes | The API token of the Jenkins user that you want to use to authenticate with the Jenkins server. This user must have the necessary permissions to perform the actions you want to perform. You can generate an API token in the Jenkins user settings. |

You can include all credentials in a single file or store each credential in a separate file.

Include all credentials in a single file.

In the runner's connection, specify the location of the credential file on the private action runner's container. In this example, all three credentials are stored in a single file. Replace the capitalized example values with your credentials.

{{< code-block lang="json" filename="/etc/dd-action-runner/credentials/jenkins_token.json" disable_copy="false" collapsible="true" >}}
{
        "auth_type": "Token Auth",
        "credentials": [
                {
                        "tokenName": "username",
                        "tokenValue": "YOUR_USERNAME"
                },
                {
                        "tokenName": "token",
                        "tokenValue": "YOUR_TOKEN"
                },
                {
                        "tokenName": "domain",
                        "tokenValue": "YOUR_DOMAIN"
                }
        ]
}
{{< /code-block >}}

In the runner's connection, specify the location of the credential file on the private action runner's container. Your Jenkins connection points to the same path for all credentials. In this example, the credential file is stored at `/etc/dd-action-runner/credentials/jenkins_token.json` on the runner.

{{< img src="service_management/par-jenkins-credentials.png" alt="The path to the credential file is '/etc/dd-action-runner/credentials/jenkins_token.json'" style="width:80%;" >}}

{{% /tab %}}

{{% tab "HTTP action" %}}

### Basic authentication

Basic authentication for the HTTP connection requires a credential file with a username and a password.

Replace `USERNAME` and `PASSWORD` with your username and password.

{{< code-block lang="json" filename="/etc/dd-action-runner/credentials/http_basic.json" disable_copy="false" collapsible="true" >}}
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

In the runner's connection, specify the location of the credential file on the private action runner's container. In this example, the credential file is stored at `/etc/dd-action-runner/credentials/http_basic.json` on the runner.

{{< img src="service_management/par-http-basic-credentials.png" alt="The path to the credential file is '/etc/dd-action-runner/credentials/http_basic.json'" style="width:80%;" >}}

### Token authentication

Token authentication for the HTTP connection requires a credential file with an array of token names and values.

The example below includes two tokens named `TOKEN1` and `TOKEN2`. Replace the example token names and values with your token names and values.

{{< code-block lang="json" filename="/etc/dd-action-runner/credentials/http_token.json" disable_copy="false" collapsible="true" >}}
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

In the runner's connection, specify the location of the credential file on the private action runner's container. In this example, the credential file is stored at `/etc/dd-action-runner/credentials/http_token.json` on the runner.

{{< img src="service_management/par-http-token-credentials.png" alt="The path to the credential file is '/etc/dd-action-runner/credentials/http_token.json'" style="width:80%;" >}}

[101]: https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNSTRING-URIS
{{% /tab %}}

{{% tab "GitLab" %}}

The GitLab connection accepts the following credentials:

|  Credential    | Required    | Description |
| -------------  | ----------- | ----------- |
| `baseURL` | Yes | The URL of your self-managed GitLab instance. For more information, see [GitLab API documentation][201]. |
| `gitlabApiToken` | Yes | The API token to authenticate with your GitLab instance. You can generate this token in your GitLab user settings. |

Include all credentials in a single file.

In the runner's connection, specify the location of the credential file on the private action runner's container. In this example, all credentials are stored in a single file. Replace the capitalized example values with your credentials.

{{< code-block lang="json" filename="/etc/dd-action-runner/credentials/gitlab_token.json" disable_copy="false" collapsible="true" >}}
{
        "auth_type": "Token Auth",
        "credentials": [
                {
                        "tokenName": "gitlabApiToken",
                        "tokenValue": "YOUR_API_TOKEN"
                },
                {
                        "tokenName": "baseURL",
                        "tokenValue": "YOUR_GITLAB_URL"
                }
        ]
}
{{< /code-block >}}

In the runner's connection, specify the location of the credential file on the private action runner's container. Your GitLab connection points to the same path for all credentials. In this example, the credential file is stored at `/etc/dd-action-runner/credentials/gitlab_token.json` on the runner.

{{< img src="service_management/par-gitlab-credentials.png" alt="The path to the credential file is '/etc/dd-action-runner/credentials/gitlab_token.json'" style="width:80%;" >}}

[201]: https://docs.gitlab.com/ee/api/
{{% /tab %}}

{{< /tabs >}}

[1]: /actions/private_actions