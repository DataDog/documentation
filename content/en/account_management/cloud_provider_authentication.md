---
title: Cloud-provider Based Authentication
aliases:
    - /account_management/cloud_authentication/
algolia:
  tags: ['cloud authentication', 'aws authentication', 'terraform provider']
---

# Overview

Cloud-provider based authentication allows you to authenticate the Datadog Terraform provider using cloud provider credentials instead of static API and Application keys. This feature leverages your existing cloud identity and access management (IAM) systems to provide secure, temporary authentication to Datadog APIs.

Currently, it only supports **AWS** authentication, with additional cloud providers planned for future releases.

{{< callout url="https://www.datadoghq.com/product-preview/cloud-provider-authentication/" btn_hidden="false" header="Join the Preview!" >}}
Cloud-provider based authentication is in Preview. Complete the form to request access.
{{< /callout >}}

## Benefits

Cloud-provider based authentication offers several advantages over traditional API and Application key authentication:

- **Reduced key management overhead**: Eliminates the need to manage and rotate static API and Application keys,
- **Enhanced security**: Leverages your cloud provider's robust IAM and temporary credential systems,
- **Seamless integration**: Works with your existing cloud roles and policies without additional credential management,

## How it works for AWS

The authentication process uses AWS Security Token Service (STS) to verify your identity:

1. **Proof generation**: The Datadog Terraform provider creates a signed AWS STS `GetCallerIdentity` request using your current AWS credentials
2. **Proof validation**: Datadog validates the proof by calling AWS STS, which returns your AWS ARN, User ID, and Account ID
3. **Identity mapping**: Your AWS identity is mapped to a Datadog user account based on your organization's configuration
4. **Token issuance**: If validation succeeds, Datadog issues a temporary JWT token for API access
5. **API authentication**: The token is used for subsequent Datadog API calls

## AWS Setup

Setting up cloud-provider based authentication for AWS involves two main steps:

### 1. Configure AWS identity mapping in Datadog

First, you need to map your AWS identities (ARNs) to Datadog user accounts. Currently, this must be done using the Datadog API.

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

Once you've configured the identity mapping, update your Datadog Terraform provider configuration to use cloud-provider authentication:

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

The Terraform provider will automatically use your configured AWS credentials to authenticate with Datadog.


## API Reference

For detailed API documentation, see:
- [Cloud Authentication Configuration API](/api/latest/cloud-authentication/)
- [Delegated Token Generation API](/api/latest/authentication-tokens/)

## Further reading

- [Managing Datadog with Terraform](/getting_started/integrations/terraform/)
- [API and Application Keys](/account_management/api-app-keys/)
- [AWS Integration](/integrations/amazon_web_services/)