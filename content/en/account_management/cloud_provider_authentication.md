---
title: Cloud-based Authentication
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

The preview only supports **AWS**, with other cloud providers planned for future releases.

## AWS authentication process

The authentication process uses the [AWS Security Token Service (STS)][1] to verify your identity:

1. **Proof generation:** The Datadog Terraform provider creates a signed AWS STS `GetCallerIdentity` request using your current AWS credentials
2. **Proof validation:** Datadog validates the proof by calling AWS STS, which returns your AWS ARN, user ID, and account ID
3. **Identity mapping:** Your AWS identity is mapped to a Datadog service account or user account based on your organization's configuration
4. **Token issue:** If validation succeeds, Datadog issues a temporary JWT token for API access
5. **API authentication:** The token is used for subsequent Datadog API calls

**Note:** If possible, map ARNs to a Datadog service account rather than a user account. Using a service account avoids associating your authentication process with a specific person.

## AWS setup

**Requirements:** Datadog Terraform provider version 3.70 or later.

Setting up cloud-provider based authentication for AWS involves two parts: configuring your AWS identity mapping in Datadog, and updating your Terraform provider configuration.

### Configure AWS identity mapping in Datadog

First, map your AWS identities (ARNs) to Datadog service accounts or user accounts. During the preview, you must perform the mapping using the Datadog API.

#### Create an AWS identity mapping

```bash
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

#### List existing mappings

```bash
curl -X GET "{{< region-param key=dd_api code="true" >}}/api/v2/cloud_auth/aws/persona_mapping" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}"
```

**Note:** To use these APIs, you need the `cloud_auth_config_read` and `cloud_auth_config_write` permissions. These permissions are available only after being onboarded to the preview.

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

```hcl
# New configuration using AWS authentication
provider "datadog" {
  org_uuid             = var.datadog_org_uuid
  cloud_provider_type  = "aws"
}
```

**Note:** To get your `org_uuid`, call this endpoint, or click the link (requires an active session in the target org): [{{< region-param key=dd_api >}}/api/v2/current_user][2]

#### Specify AWS credentials explicitly
Optionally, you can specify AWS credentials directly in your Terraform configuration instead of using environment variables or AWS credential files:

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
