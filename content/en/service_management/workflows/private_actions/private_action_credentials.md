---
title: Handling Private Action Credentials

disable_toc: false
---

{{< callout url="https://www.datadoghq.com/product-preview/private-actions/" btn_hidden="false" header="Join the Preview!">}}
Private Actions are in Preview. Use this form to request access today.
{{< /callout >}}

## Overview

Private actions allow your Datadog workflows and apps to interact with services hosted on your private network without exposing your services to the public internet. To use private actions, you must use Docker to install a private action runner on a host in your network and pair the runner with a Datadog Connection. For more information on setting up a runner and pairing it with a connection, see [Private Actions for Workflows][1] or [Private Actions for App Builder][2].

Some private actions, such as Jenkins and PostgreSQL, require credentials to function. To configure credentials for a private action, you must:
1. Create a JSON file for the credential and use the JSON structure provided in [Credential files](#credential-files).
2. Store your credential files in the configuration directory you created during setup.
3. Specify the path to the credential in the runner's connection. Use the path to the credential on the container. For example: `/etc/dd-action-runner/creds/jenkins_creds.json`.

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

{{< code-block lang="json" filename="/etc/dd-action-runner/creds/creds.pgpass" disable_copy="false" collapsible="true" >}}
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

In the runner's connection, specify the location of the credential file on the private action runner's container. Your PostgreSQL connection points to the same path for all credentials. In this example, the credential file is stored at `/etc/dd-action-runner/creds/creds.pgpass` on the runner.

{{< img src="service_management/private-runner-creds1.png" alt="The path to the credential file is '/etc/dd-action-runner/creds/creds.pgpass'" style="width:80%;" >}}

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

Jenkins connections require three credentials:
- **username**: The username of the Jenkins user that you want to use to authenticate with the Jenkins server. This user must have the necessary permissions to perform the actions you want to perform.
- **token**: The API token of the Jenkins user that you want to use to authenticate with the Jenkins server. This user must have the necessary permissions to perform the actions you want to perform. You can generate an API token in the Jenkins user settings.
- **domain**: The domain of the Jenkins server that you want to connect to.

You can include all credentials in a single file or store each credential in a separate file.

{{% collapse-content title="Single file example" level="p" %}}

In the runner's connection, specify the location of the credential file on the private action runner's container. In this example, all three credentials are stored in a single file. Replace `USERNAME`, `TOKEN`, and `DOMAIN` with your username, token, and domain.

{{< code-block lang="json" filename="/etc/dd-action-runner/creds/jenkins_creds.json" disable_copy="false" collapsible="true" >}}
{
        "auth_type": "Token Auth",
        "credentials": [
                {
                        "tokenName": "username",
                        "tokenValue": "USERNAME"
                },
                {
                        "tokenName": "token",
                        "tokenValue": "TOKEN"
                },
                {
                        "tokenName": "domain",
                        "tokenValue": "DOMAIN"
                }
        ]
}
{{< /code-block >}}

In the runner's connection, specify the location of the credential file on the private action runner's container. Your Jenkins connection points to the same path for all credentials. In this example, the credential file is stored at `/etc/dd-action-runner/creds/jenkins_creds.json` on the runner.

{{< img src="service_management/single-file-creds.png" alt="All credential paths for the Jenkins connection point to '/etc/dd-action-runner/creds/jenkins_creds.json'" style="width:80%;" >}}

{{% /collapse-content %}}
{{% collapse-content title="Multiple file example" level="p" %}}
In this example, each Jenkins credential is stored in a separate file.

For the username credential, replace `USERNAME` with your username.

{{< code-block lang="json" filename="/etc/dd-action-runner/creds/jenkins_username.json" disable_copy="false" collapsible="true" >}}
{
        "auth_type": "Token Auth",
        "credentials": [
                {
                        "tokenName": "username",
                        "tokenValue": "USERNAME"
                }
        ]
}
{{< /code-block >}}

For the token credential, replace `TOKEN` with your token.

{{< code-block lang="json" filename="/etc/dd-action-runner/creds/jenkins_token.json" disable_copy="false" collapsible="true" >}}
{
        "auth_type": "Token Auth",
        "credentials": [
                {
                        "tokenName": "token",
                        "tokenValue": "TOKEN"
                }
        ]
}
{{< /code-block >}}

For the domain credential, replace `DOMAIN` with your domain.

{{< code-block lang="json" filename="/etc/dd-action-runner/creds/jenkins_domain.json" disable_copy="false" collapsible="true" >}}
{
        "auth_type": "Token Auth",
        "credentials": [
                {
                        "tokenName": "domain",
                        "tokenValue": "DOMAIN"
                }
        ]
}
{{< /code-block >}}

In the runner's connection, specify the location of the credential file on the private action runner's container. Your Jenkins connection points to the path to each credential. In this example, the credential files are stored at the following locations on the runner:
- `/etc/dd-action-runner/creds/jenkins_username.json`
- `/etc/dd-action-runner/creds/jenkins_token.json`
- `/etc/dd-action-runner/creds/jenkins_domain.json`

{{< img src="service_management/multi-file-creds.png" alt="Each path points to the location of the credential file on the runner container" style="width:80%;" >}}

{{% /collapse-content %}}

{{% /tab %}}

{{% tab "HTTP action" %}}

### Basic authentication

Basic authentication for the HTTP connection requires a credential file with a username and a password.

Replace `USERNAME` and `PASSWORD` with your username and password.

{{< code-block lang="json" filename="/etc/dd-action-runner/creds/http_creds.json" disable_copy="false" collapsible="true" >}}
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

In the runner's connection, specify the location of the credential file on the private action runner's container. In this example, the credential file is stored at `/etc/dd-action-runner/creds/http_creds.json` on the runner.

{{< img src="service_management/http-creds.png" alt="The path to the credential file is '/etc/dd-action-runner/creds/http_creds.json'" style="width:80%;" >}}

### Token authentication

Token authentication for the HTTP connection requires a credential file with an array of token names and values.

The example below includes two tokens named `TOKEN1` and `TOKEN2`. Replace the example token names and values with your token names and values.

{{< code-block lang="json" filename="/etc/dd-action-runner/creds/http_creds.json" disable_copy="false" collapsible="true" >}}
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

In the runner's connection, specify the location of the credential file on the private action runner's container. In this example, the credential file is stored at `/etc/dd-action-runner/creds/http_creds.json` on the runner.

[101]: https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNSTRING-URIS
{{% /tab %}}

{{< /tabs >}}

[1]: /service_management/workflows/private_actions
[2]: /service_management/app_builder/private_actions