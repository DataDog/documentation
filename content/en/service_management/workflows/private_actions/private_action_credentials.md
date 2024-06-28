---
title: Handling Private Action Credentials
kind: guide
disable_toc: false
---

{{< callout url="https://www.datadoghq.com/private-beta/private-actions/" btn_hidden="false" header="Join the Beta!">}}
Private Actions are in beta. Use this form to request access today.
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

The PostgreSQL connection requires a PostgreSQL Connection URI credential. 

This example uses the URI `postgres://usr:password@example_host:5432/example_db`. For information on constructing a PostgreSQL connection URI, see the [official PostgreSQL documentation][101].

{{< code-block lang="json" filename="/etc/dd-action-runner/creds/creds.pgpass" disable_copy="false" collapsible="true" >}}
{
        "auth_type": "Token Auth",
        "credentials": [
                {
                        "tokenName": "connectionUri",
                        "tokenValue": "postgres://usr:password@example_host:5432/example_db"
                }
        ]
}
{{< /code-block >}}

In the runner's connection, specify the location of the credential file on the private action runner's container. In this example, the credential is stored at `/etc/dd-action-runner/creds/creds.pgpass` on the runner.

{{< img src="service_management/private-runner-creds.png" alt="The path to the credential file is '/etc/dd-action-runner/creds/creds.pgpass'" style="width:80%;" >}}


[101]: https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNSTRING-URIS
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
                        "username": "USERNAME",
                        "token": "TOKEN",
                        "domain": "DOMAIN"
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
                        "username": "USERNAME"
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
                        "token": "TOKEN"
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
                        "domain": "DOMAIN"
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