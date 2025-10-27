---
title: Cloud-based Authentication
description: Authenticate the Datadog Terraform provider using cloud credentials instead of static API keys with AWS STS authentication and identity mapping.
aliases:
    - /account_management/cloud_authentication/
algolia:
  tags: ['cloud authentication', 'aws authentication', 'terraform provider']
further_reading:
- link: "/getting_started/integrations/terraform/"
  tag: "Documentation"
  text: "Managing Datadog with Terraform"
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

Cloud-based authentication lets you authenticate the Datadog Terraform provider using cloud credentials instead of static API and application keys.

During the preview period, AWS is the only supported cloud provider.

## How it works: AWS authentication process

The authentication process uses the [AWS Security Token Service (STS)][1] to verify your identity:

1. **Proof generation:** The Datadog Terraform provider creates a signed AWS STS `GetCallerIdentity` request using your current AWS credentials
2. **Proof validation:** Datadog validates the proof by calling AWS STS, which returns your AWS ARN, user ID, and account ID
3. **Identity mapping:** Your AWS identity is mapped to a Datadog service account or user account based on your organization's configuration
4. **Token issue:** If validation succeeds, Datadog issues a temporary JWT token for API access
5. **API authentication:** The token is used for subsequent Datadog API calls


<div class="alert alert-info">If possible, map ARNs to a Datadog service account rather than a user account. Using a service account avoids associating your authentication process with a specific person.</div>

## Set up cloud-based authentication for AWS

**Requirements**:
- Datadog Terraform provider version 3.70 or later.
- You have configured the [Datadog-AWS integration][4] and added your AWS account. See the [AWS Integration docs][3].
- The `cloud_auth_config_read` and `cloud_auth_config_write` permissions. These permissions are available only after you are onboarded to the preview.

Setting up cloud-provider based authentication for AWS involves two parts: 
1. [Configuring your AWS identity mapping in Datadog](#configure-aws-identity-mapping-in-datadog)
2. [Updating your Terraform provider configuration](#update-your-terraform-provider-configuration)

### Configure AWS identity mapping in Datadog

<div class="alert alert-info">For identity mapping to work, your AWS account <strong>must be integrated</strong> with Datadog through the <a href="https://app.datadoghq.com/integrations/amazon-web-services">Datadog-AWS integration</a>. If an AWS account is not integrated, the authentication flow cannot verify the caller, and mapping fails.</div>

First, map your AWS identities (ARNs) to Datadog service accounts or user accounts. During the preview, you must perform the mapping using the Datadog API.

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
To get a service account's `account_identifier`, go to **Organization settings > Service accounts**, click the service account you want to map, and copy the `service_account_id` from the URL. For example, if the URL ends in `/organization-settings/service-accounts?service_account_id=3fa85f64-5717-4562-b3fc-2c963f66afa6`, then use `3fa85f64-5717-4562-b3fc-2c963f66afa6` as an account identifier for your service account.

**Example**: An API call that maps an AWS ARN to a Datadog service account, `3fa85f64-5717-4562-b3fc-2c963f66afa6`.

```bash
# Example: map an AWS ARN to a Datadog Service Account
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

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.aws.amazon.com/STS/latest/APIReference/welcome.html
[2]: https://app.datadoghq.com/api/v2/current_user
[3]: /integrations/amazon-web-services/
[4]: https://app.datadoghq.com/integrations/amazon-web-services