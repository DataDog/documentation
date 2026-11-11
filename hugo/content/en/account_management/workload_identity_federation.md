---
title: Workload Identity Federation
description: Authenticate the Datadog Terraform provider, GitHub Actions workflows, and the Datadog Agent with Workload Identity Federation, using cloud and GitHub OIDC credentials instead of static API keys with AWS STS authentication and identity mapping.
aliases:
    - /account_management/cloud_authentication/
    - /account_management/cloud_provider_authentication/
algolia:
  tags: ['workload identity federation', 'cloud authentication', 'aws authentication', 'terraform provider', 'agent authentication', 'github actions', 'delegated auth']
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

## Overview

Workload Identity Federation lets you authenticate the Datadog Terraform provider and the Datadog Agent using cloud credentials instead of static API and application keys.

This page covers setup for two identity providers: AWS (for the Terraform provider and the Agent) and GitHub (for GitHub Actions).

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
<p>Workload Identity Federation is available for the following:</p>
<ul>
<li><b>Terraform provider</b>: Authenticate Terraform operations using AWS credentials mapped to a Datadog user or service account. Available for all customers.</li>
<li><b>Datadog Agent</b>: Authenticate the Agent using AWS credentials to receive automatically managed and rotated API keys.</li>
<li><b>GitHub Actions</b>: Authenticate a workflow by exchanging its GitHub OIDC token for a short-lived Datadog credential. In Preview.</li>
</ul>
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Workload Identity Federation is not available for the selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

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

## Set up Workload Identity Federation for AWS

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Workload Identity Federation is not available for the selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

**Requirements**:
- Datadog Terraform provider version 3.70 or later.
- You have configured the [Datadog-AWS integration][4] and added your AWS account. See the [AWS Integration docs][3].
- Your account has the `workload_identity_federation_read` and `workload_identity_federation_write` permissions.

Setting up Workload Identity Federation for AWS involves two parts:
1. [Configuring your AWS identity mapping in Datadog](#configure-aws-identity-mapping-in-datadog)
2. [Updating your Terraform provider configuration](#update-your-terraform-provider-configuration)

### Configure AWS identity mapping in Datadog

<div class="alert alert-info">For identity mapping to work, your AWS account <strong>must be integrated</strong> with Datadog through the <a href="https://app.datadoghq.com/integrations/amazon-web-services">Datadog-AWS integration</a>. If an AWS account is not integrated, the authentication flow cannot verify the caller, and mapping fails.</div>

Map your AWS identities (ARNs) to Datadog service accounts or user accounts. You can configure identity mappings from the UI or using the API.

If you need to create IAM roles in AWS, see the [AWS IAM role creation documentation][5].

#### Using the UI

Navigate to [**Organization Settings** > **Workload Identity Federation**][6] and click the **Identity Mappings** tab. Each mapping grants a cloud role the permissions of a specific Datadog user or service account.

{{< img src="account_management/workload_identity_federation/identity-mappings-list.png" alt="Identity Mappings tab in the Workload Identity Federation page, showing the Org UUID field and a list of AWS ARN patterns mapped to Datadog users and service accounts" style="width:100%;" >}}

<div class="alert alert-warning">Datadog requires the <strong>assumed-role ARN</strong> in the Source Pattern field, not the IAM role ARN. These two formats are different:</div>
<ul>
<li><strong>IAM role ARN</strong> (shown in the AWS Console): <code>arn:aws:iam::123456789012:role/my-role</code></li>
<li><strong>Assumed-role ARN</strong> (required by Datadog): <code>arn:aws:sts::123456789012:assumed-role/my-role/session-name</code></li>
</ul>
To find the assumed-role ARN for your workload, run <code>aws sts get-caller-identity</code> from your workload environment and use the value in the <code>Arn</code> field of the response. An assumed-role ARN always ends in a session name that changes for every session, and a pattern without a trailing <code>/*</code> matches only that one exact session. End role patterns with <code>/*</code> to match every session that assumes the role.

To create an identity mapping:

1. Click {{< ui >}}\+ New Mapping{{< /ui >}}.
2. Select an **Identity Provider**.
3. Enter a **Source Pattern (ARN)**. Use the assumed-role ARN format and `*` for wildcard patterns (for example, `arn:aws:sts::123456789012:assumed-role/terraform-runner/*`).
4. Search for and select a **Target Identity**. This is the Datadog user or service account this cloud identity authenticates as.
5. Click {{< ui >}}Create Mapping{{< /ui >}}.

{{< img src="account_management/workload_identity_federation/identity-mapping-create.png" alt="Create Identity Mapping dialog with fields for Cloud Provider, Source Pattern ARN, and Target Identity, with a helper text describing wildcard pattern support" style="width:70%;" >}}

<div class="alert alert-info">Prefer service accounts over user accounts to avoid tying access to individuals.</div>

#### Using the API

##### Map an AWS ARN to a Datadog user account
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
      "arn_pattern": "arn:aws:sts::123456789012:assumed-role/terraform-runner/*"
    }
  }
}'
```

##### Map an AWS ARN to a Datadog service account
For `account_identifier`, you can use either:
- The service account's **UUID**: Go to {{< ui >}}Organization settings{{< /ui >}} > {{< ui >}}Service accounts{{< /ui >}}, click the service account you want to map, and copy the `service_account_id` from the URL. For example, if the URL ends in `/organization-settings/service-accounts?service_account_id=3fa85f64-5717-4562-b3fc-2c963f66afa6`, then use `3fa85f64-5717-4562-b3fc-2c963f66afa6`.
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
      "arn_pattern": "arn:aws:sts::123456789012:assumed-role/terraform-runner/*"
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
      "arn_pattern": "arn:aws:sts::123456789012:assumed-role/terraform-runner/*"
    }
  }
}'
```

##### Using wildcards in ARN patterns

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

##### List existing mappings

```bash
curl -X GET "{{< region-param key=dd_api code="true" >}}/api/v2/cloud_auth/aws/persona_mapping" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}"
```

### Update your Terraform provider configuration

After you configure the identity mapping, update your Datadog Terraform provider configuration to use Workload Identity Federation:

#### Remove your existing configuration

```hcl
# Old configuration
provider "datadog" {
  api_key = var.datadog_api_key
  app_key = var.datadog_app_key
}
```

#### Add the new Workload Identity Federation configuration

To get your `org_uuid`, find it directly on the [**Organization Settings** > **Workload Identity Federation**][6] page, or call this endpoint (requires an active session in the target org): [{{< region-param key=dd_api >}}/api/v2/current_user][2]

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

## Set up Workload Identity Federation for GitHub Actions

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Workload Identity Federation for GitHub Actions is not available for the selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

<div class="alert alert-warning">Workload Identity Federation for GitHub Actions is in Preview and is available on commercial sites only. It is not available on US1-FED or US2-FED.</div>

A GitHub Actions workflow exchanges its GitHub OIDC token for a short-lived Datadog credential, so you do not need to store static API or application keys as GitHub secrets. Two mapping types are available:

- **Identity mapping**: the workflow receives a Datadog access token for calling Datadog API endpoints as a Datadog user or service account.
- **Intake mapping**: the workflow receives a Datadog API key for sending telemetry such as logs and metrics.

**Requirements**:
- Your account has the `workload_identity_federation_write` permission to create mappings.
- Your workflow grants the `id-token: write` permission so GitHub can issue its OIDC token.
- Your Datadog organization UUID, shown on the [**Organization Settings** > **Workload Identity Federation**][6] page.

Setting up Workload Identity Federation for GitHub Actions involves two parts:
1. [Creating a GitHub mapping in Datadog](#create-a-github-mapping-in-datadog)
2. [Using the GitHub action in a workflow](#use-the-github-action-in-a-workflow)

### Create a GitHub mapping in Datadog

GitHub mappings match claims from the workflow's OIDC token instead of an AWS ARN pattern.

#### Using the UI

1. Navigate to [**Organization Settings** > **Workload Identity Federation**][6] and click the **Identity Mappings** tab (for API access) or the **Intake Mappings** tab (for telemetry).
2. Click {{< ui >}}\+ New Mapping{{< /ui >}}.
3. Select **GitHub** as the **Identity Provider**.
4. Define the **claim matchers** that determine which workflows the mapping applies to. See [Match claims safely](#match-claims-safely).
5. For an identity mapping, search for and select a **Target Identity**: the Datadog user or service account the workflow authenticates as.
6. Click {{< ui >}}Create Mapping{{< /ui >}}.

#### Using the API

Create mappings with the `/api/v2/wif/github/persona_mapping` (identity) and `/api/v2/wif/github/intake_mapping` (intake) endpoints. Both take a `claim_matchers` object; identity mappings also take the `account_identifier` of the target Datadog user or service account.

**Example**: An API call that maps workflows from one GitHub repository to a Datadog service account, `terraform-service-account@myorg.com`.

```bash
# Example: map a GitHub repository to a Datadog service account
curl -X POST "{{< region-param key=dd_api code="true" >}}/api/v2/wif/github/persona_mapping" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
-d '{
  "data": {
    "type": "github_oidc_auth_config",
    "attributes": {
      "account_identifier": "terraform-service-account@myorg.com",
      "claim_matchers": {
        "sub": "repo:my-org/.*",
        "repository": "my-org/my-repo",
        "repository_owner_id": "123456789"
      }
    }
  }
}'
```

For the full request and response schemas, including the intake mapping endpoint, see the [Cloud Authentication API reference](https://docs.datadoghq.com/api/latest/cloud-authentication/).

### Match claims safely

Claim matchers are regular expressions matched against the full value of each claim in the workflow's OIDC token.

**Required claim**: every mapping must include a `sub` matcher that pins a GitHub owner, such as `repo:my-org/.*`. This scopes the mapping to a single GitHub organization or user.

**Recommended claims**: pin `repository_owner_id` or `repository_id` exactly (these claims accept literal digits only), and narrow the mapping further with `repository` plus `ref` or `environment`. Other supported claims include `workflow`, `workflow_ref`, `job_workflow_ref`, `event_name`, `actor`, and `repository_visibility`.

<div class="alert alert-warning">Wildcards can over-match. A pattern like <code>.*datadoghq.com</code> also matches <code>evildatadoghq.com</code>, because <code>.*</code> matches any prefix. Match exact values, or anchor patterns to a known prefix such as <code>my-org/</code>, instead of using a leading <code>.*</code>.</div>

### Use the GitHub action in a workflow

The official [datadog-workload-identity-federation-github-action](https://github.com/DataDog/datadog-workload-identity-federation-github-action) exchanges the workflow's OIDC token for a Datadog credential. Pin a released tag such as `@v1`.

The action has two entry points, one per mapping type:

| Mapping type | Action path | Output |
|---|---|---|
| Identity mapping | `DataDog/datadog-workload-identity-federation-github-action/identity@v1` | `access_token` |
| Intake mapping | `DataDog/datadog-workload-identity-federation-github-action/intake@v1` | `api_key` |

Both entry points take the same inputs: `org_uuid` (required) and `site` (defaults to `datadoghq.com`).

**Example**: A workflow that uses an identity mapping to call the Datadog API.

```yaml
name: Call the Datadog API

on:
  workflow_dispatch:

permissions: {}

jobs:
  call-api:
    runs-on: ubuntu-latest
    permissions:
      id-token: write  # Needed to federate the OIDC token.
    steps:
      - name: Get Datadog access token
        id: wif
        uses: DataDog/datadog-workload-identity-federation-github-action/identity@v1
        with:
          org_uuid: <YOUR_ORG_UUID>
          site: datadoghq.com

      - name: Fetch the current user profile
        env:
          DD_ACCESS_TOKEN: ${{ steps.wif.outputs.access_token }}
          DD_SITE: datadoghq.com
        run: |
          set -euo pipefail
          curl -fsS \
            -H "Accept: application/json" \
            -H "Authorization: Bearer ${DD_ACCESS_TOKEN}" \
            "https://api.${DD_SITE}/api/v2/current_user"
```

The action requests the GitHub OIDC token for the audience `datadog/<org_uuid>`, so the mapping and the workflow must belong to the same Datadog organization. For an intake mapping, use the `intake` entry point; it takes the same inputs and outputs an `api_key` scoped to the mapping for sending telemetry.

## Set up Workload Identity Federation for the Datadog Agent

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Workload Identity Federation for the Datadog Agent is not available for the selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Workload Identity Federation for the Agent allows you to authenticate your Agent using AWS credentials instead of managing static API keys. The Agent exchanges an AWS authentication proof for a managed API key that Datadog automatically rotates.

### Requirements

- A supported Agent version and type based on how the Agent obtains AWS credentials. See [Supported Agent versions and AWS credentials](#supported-agent-versions-and-aws-credentials).
- An Agent running in an AWS environment with access to AWS credentials (for example, an EC2 instance with an IAM role, an ECS task, or an EKS pod).
- A configured [Datadog-AWS integration][4] with your AWS account added. 
- The `workload_identity_federation_read` and `workload_identity_federation_write` permissions.

#### Supported Agent versions and AWS credentials

Workload Identity Federation support depends on Agent version, Agent type, and how the Agent obtains AWS credentials.

| How the Agent gets AWS credentials | Agent 7.78-7.81 | Agent 7.82 | Agent 7.83+ |
|---|---|---|---|
| Environment variables (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`) | All Agents | All Agents | All Agents |
| EC2 instance metadata service (IMDS) role | Core Agents only | Core Agents only | All Agents |
| EKS IRSA (`AWS_ROLE_ARN`, `AWS_WEB_IDENTITY_TOKEN_FILE`) | Not supported | Core Agents only | All Agents |
| ECS task role or EKS Pod Identity (`AWS_CONTAINER_CREDENTIALS_*`) | Not supported | Core Agents only | All Agents |

**Core Agents**: The Agent, Cluster Agent, Process Agent, Security Agent, System Probe, and the installer. 

**All Agents**: Core Agents plus the Trace Agent, standalone DogStatsD, the Private Action Runner, the IoT Agent, and the Heroku Agent.

The OpenTelemetry Collector (`otel-agent`) does not support Workload Identity Federation. The Agent supports AWS credentials only.

<div class="alert alert-info">For an unsupported Agent type, cloud provider, or way of supplying credentials, <a href="/help/">open a feature request with Datadog Support</a>.</div>

Setting up Workload Identity Federation for the Agent involves two parts:
1. [Configuring your AWS intake mapping in Datadog](#configure-aws-intake-mapping-in-datadog)
2. [Updating your Agent configuration](#update-your-agent-configuration)

### Configure AWS intake mapping in Datadog

<div class="alert alert-info">For intake mapping to work, your AWS account <strong>must be integrated</strong> with Datadog through the <a href="https://app.datadoghq.com/integrations/amazon-web-services">Datadog-AWS integration</a>. If an AWS account is not integrated, the authentication flow cannot verify the caller, and mapping fails.</div>

Configure intake mappings to authorize specific AWS ARN patterns for Agent authentication. Unlike identity mappings, intake mappings only require an ARN pattern. No Datadog account identifier is needed, because the Agent authenticates to send data rather than perform user actions. Datadog automatically provisions, configures, and rotates the underlying API key on your behalf.

If you need to create IAM roles in AWS, see the [AWS IAM role creation documentation][5].

#### Using the UI

Navigate to [**Organization Settings** > **Workload Identity Federation**][6] and click the **Intake Mappings** tab.

{{< img src="account_management/workload_identity_federation/intake-mappings-list.png" alt="Intake Mappings tab in the Workload Identity Federation page, showing the Org UUID field and a list of AWS ARN patterns authorized for Agent authentication" style="width:100%;" >}}

<div class="alert alert-warning">Datadog requires the <strong>assumed-role ARN</strong> in the Source Pattern field, not the IAM role ARN. These two formats are different:</div>
<ul>
<li><strong>IAM role ARN</strong> (shown in the AWS Console): <code>arn:aws:iam::123456789012:role/my-role</code></li>
<li><strong>Assumed-role ARN</strong> (required by Datadog): <code>arn:aws:sts::123456789012:assumed-role/my-role/session-name</code></li>
</ul>
To find the assumed-role ARN for your workload, run <code>aws sts get-caller-identity</code> from your workload environment and use the value in the <code>Arn</code> field of the response. An assumed-role ARN always ends in a session name that changes for every session, and a pattern without a trailing <code>/*</code> matches only that one exact session. End role patterns with <code>/*</code> to match every session that assumes the role.

To create an intake mapping:

1. Click {{< ui >}}\+ New Mapping{{< /ui >}}.
2. Select an **Identity Provider**.
3. Enter a **Source Pattern (ARN)**. Use the assumed-role ARN format and `*` for wildcard patterns (for example, `arn:aws:sts::123456789012:assumed-role/DatadogAgentRole/*`).
4. Click {{< ui >}}Create Mapping{{< /ui >}}.

{{< img src="account_management/workload_identity_federation/intake-mapping-create.png" alt="Create Intake Mapping dialog with fields for Cloud Provider and Source Pattern ARN, with helper text describing wildcard pattern support" style="width:70%;" >}}

#### Using the API

##### Create an intake mapping

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

##### Using wildcards in ARN patterns

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

##### List existing intake mappings

```bash
curl -X GET "{{< region-param key=dd_api code="true" >}}/api/v2/cloud_auth/aws/intake_mapping" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}"
```

##### Delete an intake mapping

```bash
curl -X DELETE "{{< region-param key=dd_api code="true" >}}/api/v2/cloud_auth/aws/intake_mapping/<MAPPING_UUID>" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}"
```

### Update your Agent configuration

After you configure the intake mapping, update your Agent configuration to use Workload Identity Federation.

#### Global configuration

Add the `delegated_auth` section to your `datadog.yaml` file to enable Workload Identity Federation for all Agent data:

```yaml
delegated_auth:
  org_uuid: <YOUR_ORG_UUID>
```

To get your `org_uuid`, find it directly on the [**Organization Settings** > **Workload Identity Federation**][6] page, or call this endpoint (requires an active session in the target org): [{{< region-param key=dd_api >}}/api/v2/current_user][2]

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

You can enable delegated authentication for specific Agent products independently. This is useful when you want to send different data types to different Datadog organizations, or when you only want to use Workload Identity Federation for specific products.

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
[6]: https://app.datadoghq.com/organization-settings/workload-identity-federation
