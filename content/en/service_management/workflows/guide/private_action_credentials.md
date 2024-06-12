---
title: Handling Private Action Credentials
kind: guide
disable_toc: false
---

{{< callout url="https://google.com" btn_hidden="false" header="Join the Beta!">}}
Private Actions are in beta. Use this form to request access today.
{{< /callout >}}

## Overview

Private actions such as Jenkins and PostgreSQL require credentials to function.
- Store your credentials in the configuration directory you created during setup.
- Create a separate file for each credential and use the JSON structure in the examples below.
- When you specify the path to the credential in your runner connection, use the path to the credential file on the container.

{{< img src="service_management/private-runner-creds.png" alt="The path to the credential file is '/etc/dd-action-runner/creds/creds.pgpass'" style="width:100%;" >}}

## Credential files

{{< tabs >}}
{{% tab "PostgreSQL" %}}

The PostgreSQL connection requires A PostgreSQL Connection URI credential stored at `/etc/dd-action-runner/creds/creds.pgpass` on the action runner. This example uses the URI: `postgres://usr:password@example_host:5432/example_db`. For information on constructing a PostgreSQL connection URI, see [the official PostgreSQL documentation][101].

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

{{< code-block lang="json" filename="/etc/dd-action-runner/creds/jenkins_creds.json" disable_copy="false" collapsible="true" >}}
{
        "auth_type": "Token Auth",
        "credentials": [
                {
                        "username": "<username>",
                        "token": "<token>",
                        "domain": "<domain>"
                }
        ]
} 
{{< /code-block >}}

If you store the credentials in a single file, use the same path for ...

example image
{{% /collapse-content %}}
{{% collapse-content title="Multiple file example" level="p" %}}
{{% /collapse-content %}}

{{% /tab %}}
{{< /tabs >}}