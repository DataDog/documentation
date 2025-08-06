---
title: Cloud-provider Based Authentication
aliases:
    - /account_management/cloud_authentication/
algolia:
  tags: ['cloud authentication', 'aws authentication', 'terraform provider']
---

{{< callout url="https://www.datadoghq.com/product-preview/cloud-provider-authentication/" btn_hidden="false" header="Join the Preview!" >}}
Cloud-provider based authentication is in Preview. Complete the form to request access.
{{< /callout >}}

## Overview

Cloud-provider based authentication allows you to authenticate the Datadog Terraform provider using cloud provider credentials instead of static API and Application keys. This feature leverages your existing cloud identity and access management systems to provide secure and temporary authentication to Datadog APIs.

The preview supports only **AWS**, with other cloud providers planned for future releases.

## How it works for AWS

The authentication process uses [AWS Security Token Service (STS)](https://docs.aws.amazon.com/STS/latest/APIReference/welcome.html) to verify your identity:

1. **Proof generation**: The Datadog Terraform provider creates a signed AWS STS `GetCallerIdentity` request using your current AWS credentials
2. **Proof validation**: Datadog validates the proof by calling AWS STS, which returns your AWS ARN, User ID, and Account ID
3. **Identity mapping**: Your AWS identity is mapped to a Datadog service account or user account based on your organization's configuration
4. **Token issuance**: If validation succeeds, Datadog issues a temporary JWT token for API access
5. **API authentication**: The token is used for subsequent Datadog API calls

**Note**: We recommend to map your ARNs to a Datadog Service account.

## AWS setup

**Requirements**: Datadog Terraform provider version 3.70 or later.

Setting up cloud-provider based authentication for AWS involves two main steps:

### 1. Configure AWS identity mapping in Datadog

First, you need to map your AWS identities (ARNs) to Datadog service accounts or user accounts. During the preview, this must be done using the Datadog API.

**Create a new AWS identity mapping:**

```bash
curl -X POST "https://api.datadoghq.com/api/v2/cloud_auth/aws/persona_mapping" \
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

**List existing mappings:**

```bash
curl -X GET "https://api.datadoghq.com/api/v2/cloud_auth/aws/persona_mapping" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}"
```

**Note**: To use these APIs, you need the `cloud_auth_config_read` and `cloud_auth_config_write` permissions.

### 2. Update your Terraform provider configuration

After you've configured the identity mapping, update your Datadog Terraform provider configuration to use cloud-provider authentication:

**Replace your existing configuration:**

```hcl
# Old configuration
provider "datadog" {
  api_key = var.datadog_api_key
  app_key = var.datadog_app_key
}
```

**With the new cloud authentication configuration:**

```hcl
# New configuration using AWS authentication
provider "datadog" {
  org_uuid             = var.datadog_org_uuid
  cloud_provider_type  = "aws"
}
```

**Note**: To get your `org_uuid`, call this endpoint or click the link (requires active session in target org):

{{% site-region region="us" %}}
```
https://app.datadoghq.com/api/v2/current_user
```
{{% /site-region %}}

{{% site-region region="eu1" %}}
```
https://app.datadoghq.eu/api/v2/current_user
```
{{% /site-region %}}

{{% site-region region="us3" %}}
```
https://us3.datadoghq.com/api/v2/current_user
```
{{% /site-region %}}

{{% site-region region="us5" %}}
```
https://us5.datadoghq.com/api/v2/current_user
```
{{% /site-region %}}

{{% site-region region="ap1" %}}
```
https://ap1.datadoghq.com/api/v2/current_user
```
{{% /site-region %}}

{{% site-region region="gov" %}}
```
https://app.ddog-gov.com/api/v2/current_user
```
{{% /site-region %}}

**Optional: Specify AWS credentials explicitly:**

If you need to specify AWS credentials directly in your Terraform configuration instead of using environment variables or AWS credential files:

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


## API reference

For detailed API documentation, see:
- [Cloud Authentication Configuration API](/api/latest/cloud-authentication/)
- [Delegated Token Generation API](/api/latest/authentication-tokens/)

## Further reading

- [Managing Datadog with Terraform](/getting_started/integrations/terraform/)
- [API and Application Keys](/account_management/api-app-keys/)
- [AWS Integration](/integrations/amazon_web_services/)