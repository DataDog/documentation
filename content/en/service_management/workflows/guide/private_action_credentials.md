---
title: Handling Private Action Credentials
kind: guide
disable_toc: false
---

{{< callout url="https://google.com" btn_hidden="false" header="Join the Beta!">}}
Private Actions are in beta. Use this form to request access today.
{{< /callout >}}

## Overview

Some private actions such as Jenkins and PostgreSQL require credentials to function.
- Create a JSON file for the credential and use the JSON structure provided in [Credential files](#credential-files).
- Store your credential files in the configuration directory you created during setup.
- When you specify the path to the credential in your runner connection, use the path to the credential file on the container.

{{< img src="service_management/private-runner-creds.png" alt="The path to the credential file is '/etc/dd-action-runner/creds/creds.pgpass'" style="width:80%;" >}}

## Credential files

{{< tabs >}}
{{% tab "PostgreSQL" %}}

The PostgreSQL connection requires a PostgreSQL Connection URI credential. 

In the example below, the credential is stored at `/etc/dd-action-runner/creds/creds.pgpass` on the action runner. This example uses the URI: `postgres://usr:password@example_host:5432/example_db`. For information on constructing a PostgreSQL connection URI, see [the official PostgreSQL documentation][101].

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

[101]: https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNSTRING-URIS
{{% /tab %}}

{{% tab "Jenkins" %}}

Jenkins connections require three credentials:
- **username**: The username of the Jenkins user that you want to use to authenticate with the Jenkins server. This user must have the necessary permissions to perform the actions you want to perform.
- **token**: The API token of the Jenkins user that you want to use to authenticate with the Jenkins server. This user must have the necessary permissions to perform the actions you want to perform. You can generate an API token in the Jenkins user settings.
- **domain**: The domain of the Jenkins server that you want to connect to.

You can include all credentials in a single file or store each credential in a separate file.

{{% collapse-content title="Single file example" level="p" %}}

In this example, all three credentials are stored in a single file. Replace `USERNAME`, `TOKEN`, and `DOMAIN` with your username, token, and domain.

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

Your Jenkins connection points to the same path for all credentials.

{{< img src="service_management/single-file-creds.png" alt="All credential paths for the Jenkins connection point to '/etc/dd-action-runner/creds/jenkins_creds.json'" style="width:80%;" >}}

{{% /collapse-content %}}
{{% collapse-content title="Multiple file example" level="p" %}}
In this example, each Jenkins credential is stored in a separate file.

Replace `USERNAME` with your username.

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

Replace `TOKEN` with your token.

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

Replace `DOMAIN` with your domain.

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

Your Jenkins connection points to path to each credential.

{{< img src="service_management/multi-file-creds.png" alt="All credential paths for the Jenkins connection point to '/etc/dd-action-runner/creds/jenkins_creds.json'" style="width:80%;" >}}

{{% /collapse-content %}}

{{% /tab %}}
{{< /tabs >}}