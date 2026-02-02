---
title: Secrets Management
description: Learn how to set up the Worker to retrieve secrets from your secrets manager.
disable_toc: false
further_reading:
- link: /observability_pipelines/configuration/set_up_pipelines/"
  tag: "Documentation"
  text: "Set up pipelines"
- link: /observability_pipelines/configuration/install_the_worker"
  tag: "Documentation"
  text: "Install the Worker"
---

## Overview

The Observability Pipelines Worker helps you securely manage your secrets by integrating with the following secrets management solution:

- AWS Secrets Manager
- AWS Systems Manager
- Azure Key Vault
- HashiCorp Vault
- JSON File
- YAML File

## Configure the Worker to retrieve secrets

{{% collapse-content title="AWS Secrets Manager" level="h4" expanded=false id="aws-secrets-manager" %}}

#### Set up an AWS instance profile

Datadog recommends using the [instance profile method][1] of retrieving secrets because AWS handles all environment variables and session profiles for you. See the official [AWS Secrets Manager documentation][2] for setup instructions.

#### Configure the Worker to use AWS Secrets Manager

{{< tabs >}}
{{% tab "Docker or Linux" %}}
After you [install the Worker][1], configure the Worker's [bootstrap file][2] to resolve secrets using AWS Secrets Manager:

```yaml
backend_type: aws.secrets
backend_config:
  aws_session:
    aws_region: <region_name>
```

[1]: /observability_pipelines/configuration/install_the_worker/?tab=docker#install-the-worker
[2]: /observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/

{{% /tab %}}
{{% tab "Kubernetes" %}}
Before you [install the Worker][1], add the bootstrap configuration to the [`datadog.bootstrap.config`][2] section of the Helm chart `values.yaml` file:

```yaml
bootstrap:
  config:
    secret:
      backend_type: aws.secrets
      backend_config:
        aws_session:
          aws_region: <region_name>
```

[1]: /observability_pipelines/configuration/install_the_worker/?tab=kubernetes#install-the-worker
[2]: https://github.com/DataDog/helm-charts/blob/main/charts/observability-pipelines-worker/values.yaml#L46

{{% /tab %}}
{{< /tabs >}}

The following `aws_session` settings are available:

| Setting | Description |
| ----- | ----- |
| aws_region | AWS Region |
| aws_profile | AWS Session Profile |
| aws_role_arn | AWS sts:AssumeRole ARN |
| aws_external_id | AWS sts:AssumeRole ExternalId |
| aws_access_key_id | AWS IAM User Access Key ID |
| aws_secret_access_key | AWS IAM User Access Key Secret |

In most cases, you need to specify `aws_region` to correspond to the region hosting the Secrets Manager secret.

When handling single strings, the backend configuration setting `force_string: true` coerces the secret as a string value.

{{% /collapse-content %}}
{{% collapse-content title="AWS Systems Manager" level="h4" expanded=false id="aws-systems-manager" %}}

#### Set up an AWS instance profile

Datadog recommends using the [instance profile method][1] of retrieving secrets because AWS handles all environment variables and session profiles for you. See the official [AWS Systems Manager Parameter Store][4] documentation for setup instructions.

#### Configure the Worker to use AWS Systems Manager

{{< tabs >}}
{{% tab "Docker or Linux" %}}
After you [install the Worker][1], configure the Worker's [bootstrap file][2] to resolve secrets using AWS Systems Manager:

```yaml
secret:
  backend_type: aws_parameter_store
  backend_config:
    aws_session:
      aws_region: <region_name>
```

[1]: /observability_pipelines/configuration/install_the_worker/?tab=docker#install-the-worker
[2]: /observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/

{{% /tab %}}
{{% tab "Kubernetes" %}}
Before you [install the Worker][1], add the bootstrap configuration to the [`datadog.bootstrap.config`][2] section of the Helm chart `values.yaml` file:

```yaml
bootstrap:
  config:
    secret:
      backend_type: aws_parameter_store
      backend_config:
        aws_session:
          aws_region: <region_name>
```

[1]: /observability_pipelines/configuration/install_the_worker/?tab=kubernetes#install-the-worker
[2]: https://github.com/DataDog/helm-charts/blob/main/charts/observability-pipelines-worker/values.yaml#L46

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}
{{% collapse-content title="Azure Key Vault" level="h4" expanded=false id="azure-key-vault" %}}

#### Set up Azure authentication

Datadog recommends using Managed Identities to authenticate with Azure. This allows you to associate cloud resources with AMI accounts and removes the need to put sensitive information in your Worker configuration file.

#### Create a managed identity

To access your Key Vault, create a Managed Identity and assign it to your VM. Then, configure the appropriate role assignment on the Key Vault to allow the managed identity to access the secrets.

#### Configure the Worker to use Azure Key Vault

{{< tabs >}}
{{% tab "Docker or Linux" %}}
After you [install the Worker][1], configure the Worker's [bootstrap file][2] to resolve secrets using Azure Key Vault:

```yaml
backend_type: azure.keyvault
backend_config:
  keyvaulturl: <key_vault_url>
```

[1]: /observability_pipelines/configuration/install_the_worker/?tab=docker#install-the-worker
[2]: /observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/

{{% /tab %}}
{{% tab "Kubernetes" %}}
Before you [install the Worker][1], add the bootstrap configuration to the [`datadog.bootstrap.config`][2] section of the Helm chart `values.yaml` file:

```yaml
bootstrap:
  config:
    secret:
      backend_type: azure.keyvault
      backend_config:
        keyvaulturl: <key_vault_url>
```

[1]: /observability_pipelines/configuration/install_the_worker/?tab=kubernetes#install-the-worker
[2]: https://github.com/DataDog/helm-charts/blob/main/charts/observability-pipelines-worker/values.yaml#L46

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}
{{% collapse-content title="HashiCorp Vault" level="h4" expanded=false id="hashicorp-vault" %}}

#### Set up HashiCorp Vault

1. Run your HashiCorp Vault. See the official [HashiCorp Vault documentation][5] for more information.
2. Write a policy that gives the permission to pull secrets from your vault. Create a `*.hcl` file, and include the following permission if you are using Secrets Engine Version 1:

    ```
    path "<your mount path>/<additional subpath>" {
      capabilities = ["read"]
    }
    ```

   If you are using Secrets Engine Version 2, the following permissions are needed:

    ```
    path "<your_mount_path>/data/<additional_subpath>" {
      capabilities = ["read"]
    }

    /*
    Datadog needs access to mount information to check the Secrets Engine version
    number. If access isn't granted, version 1 is assumed.
    */
    path "sys/mounts" {
      capabilities = ["read"]
    }
    ```

3. Run `vault policy write <policy_name> <path_to_*.hcl_file>`.
4. Choose the method of authenticating to your vault. If using the AWS instance profile method, run `vault auth enable aws`.

#### Set up an AWS instance profile for an AWS-connected machine

Datadog recommends that you authenticate using the [instance profile method][1] if you are running your HashiCorp Vault from an AWS-connected machine.

#### Configure the Worker to use HashiCorp Vault

{{< tabs >}}
{{% tab "Docker or Linux" %}}
After you [install the Worker][1], configure the Worker's [bootstrap file][2] to resolve secrets with HashiCorp Vault:

```yaml
secret:
  backend_type: vault
  backend_config:
    vault_address: http://myvaultaddress.net
    vault_tls_config:
      # ... TLS settings if applicable
    vault_session:
      vault_auth_type: aws
      # ... additional session settings
```

[1]: /observability_pipelines/configuration/install_the_worker/?tab=docker#install-the-worker
[2]: /observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/

{{% /tab %}}
{{% tab "Kubernetes" %}}
Before you [install the Worker][1], add the bootstrap configuration to the [`datadog.bootstrap.config`][2] section of the Helm chart `values.yaml` file:

```yaml
bootstrap:
  config:
    secret:
      backend_type: vault
      backend_config:
        vault_address: http://myvaultaddress.net
        vault_tls_config:
          # ... TLS settings if applicable
        vault_session:
          vault_auth_type: aws
          # ... additional session settings
```

[1]: /observability_pipelines/configuration/install_the_worker/?tab=kubernetes#install-the-worker
[2]: https://github.com/DataDog/helm-charts/blob/main/charts/observability-pipelines-worker/values.yaml#L46

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}
{{% collapse-content title="JSON File" level="h4" expanded=false id="json-file" %}}

#### File permissions required

The file backend only requires **read** permissions for the configured JSON files. These permissions must be granted to the local Worker user.

#### Configure the Worker to use a JSON file secret backend

{{< tabs >}}
{{% tab "Docker or Linux" %}}
After you [install the Worker][1], configure the Worker's [bootstrap file][2] to resolve secrets with a JSON file:

```yaml
secret:
  backend_type: json
  backend_config:
    file_path: /path/to/json/file.json
```

#### Create a JSON secrets file

Create the file `/path/to/json/file.json` to store the identifiers and their secret values:

```json
{
  "us1_api": "<api_key>",
  "secret_identifier1": "<secret1>"
}
```

[1]: /observability_pipelines/configuration/install_the_worker/?tab=docker#install-the-worker
[2]: /observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/


{{% /tab %}}
{{% tab "Kubernetes" %}}
Before you [install the Worker][1], add your identifier and secrets mapping to the [`datadog.bootstrap.secretFileContents`][2] section of the Helm chart `values.yaml` file:

```yaml
bootstrap:
  secretFileContents:
    us1_api: "<api_key>"
    secret_identifier1: "<secret1>"
```

[1]: /observability_pipelines/configuration/install_the_worker/?tab=docker#install-the-worker
[2]: https://github.com/DataDog/helm-charts/blob/main/charts/observability-pipelines-worker/values.yaml#L46

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}
{{% collapse-content title="YAML File" level="h4" expanded=false id="yaml-file" %}}

#### File permissions required

The file backend only requires **read** permissions for the configured YAML files. These permissions must be granted to the local Worker user.

#### Configure the Worker to use a YAML file secret backend

{{< tabs >}}
{{% tab "Docker or Linux" %}}
After you [install the Worker][1], configure the Worker's [bootstrap file][2] to resolve secrets with a YAML file:

```
secret:
  backend_type: yaml
  backend_config:
    file_path: /path/to/yaml/file.yaml
```

#### Create a YAML secrets file

Create the file `/path/to/yaml/file.yaml` to store the identifiers and their secret values:

```
# /path/to/yaml/file.yaml

us1_api: "<api_key>"
secret_identifier1: "<secret1>"
```

[1]: /observability_pipelines/configuration/install_the_worker/?tab=docker#install-the-worker
[2]: /observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/

{{% /tab %}}
{{% tab "Kubernetes" %}}
Before you [install the Worker][1], add your identifier and secrets mapping to the [`datadog.bootstrap.secretFileContents`][2] section of the Helm chart `values.yaml` file:

```yaml
bootstrap:
  secretFileContents:
    us1_api: "<api_key>"
    secret_identifier1: "<secret1>"
```

[1]: /observability_pipelines/configuration/install_the_worker/?tab=kubernetes#install-the-worker
[2]: https://github.com/DataDog/helm-charts/blob/main/charts/observability-pipelines-worker/values.yaml#L46

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-ec2_instance-profiles.html
[2]: https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html
[3]: /observability_pipelines/configuration/install_the_worker/?tab=docker#install-the-worker
[4]: https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html
[5]: https://developer.hashicorp.com/
