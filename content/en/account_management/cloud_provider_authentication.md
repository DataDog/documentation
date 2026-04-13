---
title: Cloud-based Authentication
description: Authenticate the Datadog Terraform provider and Datadog Agent using cloud credentials instead of static API keys with AWS STS authentication and identity mapping.
aliases:
    - /account_management/cloud_authentication/
algolia:
  tags: ['cloud authentication', 'aws authentication', 'terraform provider', 'agent authentication', 'delegated auth']
further_reading:
- link: "/getting_started/integrations/terraform/"
  tag: "Documentation"
  text: "Managing Datadog with Terraform"
- link: "/agent/configuration/"
  tag: "Documentation"
  text: "Agent Configuration"
- link: "/account_management/api-app-keys/"
  tag: "Documentation"
  text: "API and Application Keys"
- link: "/integrations/amazon_web_services/"
  tag: "Documentation"
  text: "AWS Integration"
---

{{< callout url="https://www.datadoghq.com/product-preview/cloud-provider-based-authentication/" btn_hidden="false" header="Join the Preview!" >}}
Cloud-based authentication is in Preview. Complete the form to request access.
{{< /callout >}}

## Overview

Cloud-based authentication lets you authenticate the Datadog Terraform provider and the Datadog Agent using cloud credentials instead of static API and application keys.

During the preview period, AWS is the only supported cloud provider.

Cloud-based authentication is available for the following:
- **Terraform provider**: Authenticate Terraform operations using AWS credentials mapped to a Datadog user or service account
- **Datadog Agent**: Authenticate the Agent using AWS credentials to receive automatically managed and rotated API keys

## How it works: AWS authentication process

The authentication process uses the [AWS Security Token Service (STS)][1] to verify your identity.

### Terraform provider authentication flow

1. **Proof generation:** The Datadog Terraform provider creates a signed AWS STS `GetCallerIdentity` request using your current AWS credentials
2. **Proof validation:** Datadog validates the proof by calling AWS STS, which returns your AWS ARN, user ID, and account ID
3. **Identity mapping:** Your AWS identity is mapped to a Datadog service account or user account based on your organization's configuration
4. **Token issue:** If validation succeeds, Datadog issues a temporary JWT token for API access
5. **API authentication:** The token is used for subsequent Datadog API calls

<div class="alert alert-info">If possible, map ARNs to a Datadog service account rather than a user account. Using a service account avoids associating your authentication process with a specific person.</div>

### Agent authentication flow

1. **Credential detection:** The Agent retrieves AWS credentials from the environment it runs in
2. **Proof generation:** The Agent creates a signed AWS STS request to prove access to the credentials
3. **Proof validation:** Datadog validates the signed request against AWS and verifies it against your organization's intake mapping configuration
4. **API key issue:** If validation succeeds, Datadog issues a managed API key that is automatically rotated
5. **Agent configuration:** The Agent uses the issued API key for all subsequent Datadog API calls

<div class="alert alert-info">If the delegated authentication flow fails, the Agent falls back to the API key configured in your <code>datadog.yaml</code> file. This fallback behavior allows you to onboard with limited risk to your existing configuration.</div>

## Set up cloud-based authentication for AWS

**Requirements**:
- Datadog Terraform provider version 3.70 or later.
- You have configured the [Datadog-AWS integration][4] and added your AWS account. See the [AWS Integration docs][3].
- Your account has the `cloud_auth_config_read` and `cloud_auth_config_write` permissions. These permissions are available only after you are onboarded to the preview.

Setting up cloud-provider based authentication for AWS involves two parts:
1. [Configuring your AWS identity mapping in Datadog](#configure-aws-identity-mapping-in-datadog)
2. [Updating your Terraform provider configuration](#update-your-terraform-provider-configuration)

### Configure AWS identity mapping in Datadog

<div class="alert alert-info">For identity mapping to work, your AWS account <strong>must be integrated</strong> with Datadog through the <a href="https://app.datadoghq.com/integrations/amazon-web-services">Datadog-AWS integration</a>. If an AWS account is not integrated, the authentication flow cannot verify the caller, and mapping fails.</div>

First, map your AWS identities (ARNs) to Datadog service accounts or user accounts. During the preview, you must perform the mapping using the Datadog API.

If you need to create IAM roles in AWS, see the [AWS IAM role creation documentation][5].

#### Map an AWS ARN to a Datadog user account
For `account_identifier`, use the email shown in the user's Datadog profile.

**Example**: An API call that maps an AWS ARN to a Datadog user account, `john.doe@myorg.com`.

```bash
# Example: map an AWS ARN to a Datadog User
curl -X POST "{{< region-param key=dd_api code="true" >}}/api/v2/cloud_auth/aws/persona_mapping" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
-d '{
  "data": {
    "type": "aws_cloud_auth_config",
    "attributes": {
      "account_identifier": "john.doe@myorg.com",
      "arn_pattern": "arn:aws:sts::123456789012:assumed-role/terraform-runner"
    }
  }
}'
```

#### Map an AWS ARN to a Datadog service account
For `account_identifier`, you can use either:
- The service account's **UUID**: Go to **Organization settings > Service accounts**, click the service account you want to map, and copy the `service_account_id` from the URL. For example, if the URL ends in `/organization-settings/service-accounts?service_account_id=3fa85f64-5717-4562-b3fc-2c963f66afa6`, then use `3fa85f64-5717-4562-b3fc-2c963f66afa6`.
- The service account's **email address**: Use the email address shown in the service account's details.

**Example**: An API call that maps an AWS ARN to a Datadog service account using the UUID, `3fa85f64-5717-4562-b3fc-2c963f66afa6`.

```bash
# Example: map an AWS ARN to a Datadog Service Account using UUID
curl -X POST "{{< region-param key=dd_api code="true" >}}/api/v2/cloud_auth/aws/persona_mapping" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
-d '{
  "data": {
    "type": "aws_cloud_auth_config",
    "attributes": {
      "account_identifier": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "arn_pattern": "arn:aws:sts::123456789012:assumed-role/terraform-runner"
    }
  }
}'
```

**Example**: An API call that maps an AWS ARN to a Datadog service account using the email address, `terraform-service-account@myorg.com`.

```bash
# Example: map an AWS ARN to a Datadog Service Account using email
curl -X POST "{{< region-param key=dd_api code="true" >}}/api/v2/cloud_auth/aws/persona_mapping" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
-d '{
  "data": {
    "type": "aws_cloud_auth_config",
    "attributes": {
      "account_identifier": "terraform-service-account@myorg.com",
      "arn_pattern": "arn:aws:sts::123456789012:assumed-role/terraform-runner"
    }
  }
}'
```

#### Using wildcards in ARN patterns

ARN patterns support wildcard matching to handle dynamic or variable portions of resource ARNs. This is useful when working with assumed roles that include session identifiers or other variable components.

**Wildcard rules**:
- Wildcards (`*`) are only allowed in the last portion of the resource ARN
- You must specify a specific resource before the wildcard
- Wildcards cannot be placed in the middle of the ARN

**Example**: Match any session assuming the `DatadogTerraformerRole`:

```bash
curl -X POST "{{< region-param key=dd_api code="true" >}}/api/v2/cloud_auth/aws/persona_mapping" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
-d '{
  "data": {
    "type": "aws_cloud_auth_config",
    "attributes": {
      "account_identifier": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "arn_pattern": "arn:aws:sts::123456789012:assumed-role/DatadogTerraformerRole/*"
    }
  }
}'
```

This pattern matches actual assumed role ARNs like:
- `arn:aws:sts::123456789012:assumed-role/DatadogTerraformerRole/run-abcdefghijk`
- `arn:aws:sts::123456789012:assumed-role/DatadogTerraformerRole/session-xyz789`

<div class="alert alert-info">Wildcard matching is particularly useful for CI/CD pipelines where role sessions have dynamically generated identifiers.</div>

#### List existing mappings

```bash
curl -X GET "{{< region-param key=dd_api code="true" >}}/api/v2/cloud_auth/aws/persona_mapping" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}"
```

### Update your Terraform provider configuration

After you configured the identity mapping, update your Datadog Terraform provider configuration to use cloud provider authentication:

#### Remove your existing configuration

```hcl
# Old configuration
provider "datadog" {
  api_key = var.datadog_api_key
  app_key = var.datadog_app_key
}
```

#### Add the new cloud authentication configuration

To get your `org_uuid`, call this endpoint, or click the link (requires an active session in the target org): [{{< region-param key=dd_api >}}/api/v2/current_user][2]

```hcl
# New configuration using AWS authentication
provider "datadog" {
  org_uuid             = var.datadog_org_uuid
  cloud_provider_type  = "aws"
}
```

#### Optional - Specify AWS credentials explicitly
As an alternative to using environment variables or AWS credential files, you can specify AWS credentials directly in your Terraform configuration:

```hcl
provider "datadog" {
  org_uuid              = var.datadog_org_uuid
  cloud_provider_type   = "aws"
  aws_access_key_id     = var.aws_access_key_id
  aws_secret_access_key = var.aws_secret_access_key
  aws_session_token     = var.aws_session_token  # If using temporary credentials
}
```

The Terraform provider automatically uses your configured AWS credentials to authenticate with Datadog.

## Set up cloud-based authentication for the Datadog Agent

Cloud-based authentication for the Agent allows you to authenticate your Agent using AWS credentials instead of managing static API keys. The Agent exchanges an AWS authentication proof for a managed API key that Datadog automatically rotates.

**Requirements**:
- Version `7.78.0` or later of the Datadog Agent.
- The Agent runs in an AWS environment with access to AWS credentials (for example, an EC2 instance with an IAM role, ECS task, or EKS pod).
- You have configured the [Datadog-AWS integration][4] and added your AWS account. See the [AWS Integration docs][3].
- Your account has the `cloud_auth_config_read` and `cloud_auth_config_write` permissions. These permissions are available only after you are onboarded to the preview.

Setting up cloud-based authentication for the Agent involves two parts:
1. [Configuring your AWS intake mapping in Datadog](#configure-aws-intake-mapping-in-datadog)
2. [Updating your Agent configuration](#update-your-agent-configuration)

### Configure AWS intake mapping in Datadog

<div class="alert alert-info">For intake mapping to work, your AWS account <strong>must be integrated</strong> with Datadog through the <a href="https://app.datadoghq.com/integrations/amazon-web-services">Datadog-AWS integration</a>. If an AWS account is not integrated, the authentication flow cannot verify the caller, and mapping fails.</div>

First, configure intake mappings to authorize specific AWS ARN patterns for Agent authentication. Unlike the persona mapping used for Terraform, intake mapping only requires an ARN pattern. No Datadog account identifier is needed, because the Agent authenticates to send data rather than perform user actions.

If you need to create IAM roles in AWS, see the [AWS IAM role creation documentation][5].

#### Create an intake mapping

**Example**: An API call that authorizes Agents running with a specific IAM role to authenticate.

```bash
curl -X POST "{{< region-param key=dd_api code="true" >}}/api/v2/cloud_auth/aws/intake_mapping" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
-d '{
  "data": {
    "type": "aws_cloud_auth_intake_mapping",
    "attributes": {
      "arn_pattern": "arn:aws:sts::123456789012:assumed-role/DatadogAgentRole/*"
    }
  }
}'
```

#### Using wildcards in ARN patterns

ARN patterns support wildcard matching to handle dynamic or variable portions of resource ARNs. This is useful when working with assumed roles that include session identifiers or when you have multiple Agent instances.

**Wildcard rules**:
- Wildcards (`*`) are only allowed in the last portion of the resource ARN
- You must specify a specific resource before the wildcard
- Wildcards cannot be placed in the middle of the ARN

**Example**: Match any session assuming the `DatadogAgentRole`:

```bash
curl -X POST "{{< region-param key=dd_api code="true" >}}/api/v2/cloud_auth/aws/intake_mapping" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
-d '{
  "data": {
    "type": "aws_cloud_auth_intake_mapping",
    "attributes": {
      "arn_pattern": "arn:aws:sts::123456789012:assumed-role/DatadogAgentRole/*"
    }
  }
}'
```

This pattern matches actual assumed role ARNs like:
- `arn:aws:sts::123456789012:assumed-role/DatadogAgentRole/i-0abc123def456`
- `arn:aws:sts::123456789012:assumed-role/DatadogAgentRole/eks-datadog-agent-xyz`

#### List existing intake mappings

```bash
curl -X GET "{{< region-param key=dd_api code="true" >}}/api/v2/cloud_auth/aws/intake_mapping" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}"
```

#### Delete an intake mapping

```bash
curl -X DELETE "{{< region-param key=dd_api code="true" >}}/api/v2/cloud_auth/aws/intake_mapping/<MAPPING_UUID>" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}"
```

### Update your Agent configuration

After you configure the intake mapping, update your Agent configuration to use cloud-based authentication.

#### Global configuration

Add the `delegated_auth` section to your `datadog.yaml` file to enable cloud-based authentication for all Agent data:

```yaml
delegated_auth:
  org_uuid: <YOUR_ORG_UUID>
```

To get your `org_uuid`, call this endpoint, or click the link (requires an active session in the target org): [{{< region-param key=dd_api >}}/api/v2/current_user][2]

The Agent auto-detects if it runs in an AWS environment and uses the available AWS credentials.

#### Provider-specific options

To explicitly configure AWS as your authentication provider and specify provider-specific options, use the `provider` and `aws` subsections:

```yaml
delegated_auth:
  org_uuid: <YOUR_ORG_UUID>
  provider: aws  # Optional: auto-detects if omitted
  aws:
    region: <AWS_REGION>  # Optional: auto-detects from IMDS if omitted or uses global STS
```

Replace `<AWS_REGION>` with the AWS region to use for STS authentication (for example, `us-east-1`).

#### Per-product configuration

You can enable delegated authentication for specific Agent products independently. This is useful when you want to send different data types to different Datadog organizations, or when you only want to use cloud-based authentication for specific products.

To enable delegated authentication for logs only:

```yaml
logs_config:
  delegated_auth:
    org_uuid: <YOUR_ORG_UUID>
```

To use different organizations for different products:

```yaml
delegated_auth:
  org_uuid: <YOUR_GLOBAL_ORG_UUID>
  provider: aws
  aws:
    region: <AWS_REGION>

logs_config:
  delegated_auth:
    org_uuid: <YOUR_LOGS_ORG_UUID>
```

<div class="alert alert-info">Provider-specific settings (such as <code>provider</code> and <code>aws</code>) are only configured in the global <code>delegated_auth</code> section. Per-product sections only support <code>org_uuid</code>.</div>

#### Fallback behavior

If the delegated authentication flow fails for any reason, the Agent automatically falls back to using the API key configured in your `datadog.yaml` file. This fallback behavior provides a safety net during onboarding and protects against authentication service disruptions.

To take advantage of this fallback, keep your existing `api_key` configuration alongside the new `delegated_auth` configuration:

```yaml
api_key: <YOUR_API_KEY>

delegated_auth:
  org_uuid: <YOUR_ORG_UUID>
```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.aws.amazon.com/STS/latest/APIReference/welcome.html
[2]: https://app.datadoghq.com/api/v2/current_user
[3]: /integrations/amazon-web-services/
[4]: https://app.datadoghq.com/integrations/amazon-web-services
[5]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create.html
