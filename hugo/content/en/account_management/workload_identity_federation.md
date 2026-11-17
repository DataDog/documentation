---
title: Workload Identity Federation
description: Authenticate to the Datadog API, the Datadog Agent, GitHub Actions workflows, HCP Terraform runs, and workloads with their own OIDC identity provider with Workload Identity Federation, using AWS, GitHub, HCP Terraform, or custom OIDC credentials instead of static API and application keys.
aliases:
    - /account_management/cloud_authentication/
    - /account_management/cloud_provider_authentication/
algolia:
  tags: ['workload identity federation', 'cloud authentication', 'aws authentication', 'terraform provider', 'agent authentication', 'github actions', 'hcp terraform', 'terraform cloud', 'dynamic provider credentials', 'custom oidc', 'delegated auth']
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

Workload Identity Federation lets you authenticate to the Datadog API, the Datadog Agent, GitHub Actions workflows, HCP Terraform runs, and workloads with their own OIDC identity provider using AWS, GitHub, HCP Terraform, or custom OIDC credentials instead of static API and application keys.

This page covers setup for four identity providers: AWS (for Datadog API calls and the Agent), GitHub (for GitHub Actions), HCP Terraform (for HCP Terraform runs), and custom OIDC providers (for other workloads).

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
<p>Workload Identity Federation is available for the following:</p>
<ul>
<li><b>Datadog API</b>: Authenticate API calls using AWS credentials mapped to a Datadog user or service account. The Datadog Terraform provider and the Go API client support this flow. Available for all customers.</li>
<li><b>Datadog Agent</b>: Authenticate the Agent using AWS credentials to receive automatically managed and rotated API keys.</li>
<li><b>GitHub Actions</b>: Authenticate a workflow by exchanging its GitHub OIDC token for a short-lived Datadog credential. In Preview.</li>
<li><b>HCP Terraform</b>: Authenticate the Datadog Terraform provider in HCP Terraform runs using dynamic provider credentials. In Preview.</li>
<li><b>Custom OIDC providers</b>: Authenticate any workload that has an OIDC token from an identity provider you register. In Preview, by request.</li>
</ul>
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Workload Identity Federation is not available for the selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## How it works: AWS authentication process

The authentication process uses the [AWS Security Token Service (STS)][1] to verify your identity.

### API authentication flow

1. **Proof generation:** The client (for example, the Datadog Terraform provider) creates a signed AWS STS `GetCallerIdentity` request using your current AWS credentials
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
- Datadog Terraform provider version 3.70 or later, or the Datadog Go API client (`datadog-api-client-go`) version 2.44.0 or later.
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
To find the assumed-role ARN for your workload, run <code>aws sts get-caller-identity</code> from your workload environment and use the value in the <code>Arn</code> field of the response.

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

A GitHub Actions workflow exchanges its GitHub OIDC token for a short-lived Datadog credential. You do not need to store static API or application keys as GitHub secrets. Two mapping types are available:

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
4. Under **Claim Matchers**, click {{< ui >}}Add claim{{< /ui >}} for each claim that a workflow's OIDC token must match. See [Match claims safely](#match-claims-safely).
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

The official [Datadog Workload Identity Federation GitHub Action][7] exchanges the workflow's OIDC token for a Datadog credential. Pin a released tag such as `@v1`.

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

The action requests the GitHub OIDC token for the audience `datadog/<org_uuid>`. Set `org_uuid` to the organization where you created the mapping. For an intake mapping, use the `intake` entry point. It takes the same inputs and outputs an `api_key` for sending telemetry.

#### Run the Datadog Terraform provider from GitHub Actions

The Datadog Terraform provider (version 4.11.0 or later) accepts the identity action's `access_token` as a bearer token. Set the `DD_BEARER_TOKEN` environment variable in the step that runs Terraform:

```yaml
      - name: Terraform apply
        env:
          DD_BEARER_TOKEN: ${{ steps.wif.outputs.access_token }}
        run: terraform apply -auto-approve
```

Leave `api_key`, `app_key`, and `cloud_provider_type` unset in the provider block so the provider uses the bearer token. For sites other than US1, also set the provider's `api_url`.

## Set up Workload Identity Federation for HCP Terraform

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Workload Identity Federation for HCP Terraform is not available for the selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

<div class="alert alert-warning">Workload Identity Federation for HCP Terraform is in Preview and is available on commercial sites only. It is not available on US1-FED or US2-FED.</div>

An [HCP Terraform][8] (formerly Terraform Cloud) run exchanges its workload identity token for a short-lived Datadog credential, using HCP Terraform [dynamic provider credentials][9]. You do not need to store static API or application keys as workspace variables. The run authenticates as the Datadog user or service account in an identity mapping. HCP Terraform supports identity mappings only, not intake mappings.

HCP Terraform workload identity tokens are accepted from the `app.terraform.io` and `app.eu.terraform.io` issuers. Self-hosted Terraform Enterprise is not supported. Runs triggered from a local Terraform CLI do not receive a workload identity token.

**Requirements**:
- Datadog Terraform provider version 4.26.0 or later.
- Your account has the `workload_identity_federation_write` permission to create mappings.
- If your workspace uses self-hosted HCP Terraform agents, agent version 1.12.0 or later.

Setting up Workload Identity Federation for HCP Terraform involves three parts:
1. [Creating an HCP Terraform mapping in Datadog](#create-an-hcp-terraform-mapping-in-datadog)
2. [Setting the audience variable in HCP Terraform](#set-the-audience-variable-in-hcp-terraform)
3. [Configuring the Datadog Terraform provider](#configure-the-datadog-terraform-provider-for-hcp-terraform)

### Create an HCP Terraform mapping in Datadog

HCP Terraform mappings match the `sub` claim of the run's workload identity token. The claim has the format `organization:<ORG>:project:<PROJECT>:workspace:<WORKSPACE>:run_phase:<PHASE>`, where `<PHASE>` is `plan` or `apply`.

#### Using the UI

1. Navigate to [**Organization Settings** > **Workload Identity Federation**][6] and click the **Identity Mappings** tab.
2. Click {{< ui >}}\+ New Mapping{{< /ui >}}.
3. Select **HCP Terraform** as the **Identity Provider**.
4. Choose the HCP Terraform region that matches the hostname in your HCP Terraform organization URL: **Global (app.terraform.io)** or **Europe (app.eu.terraform.io)**.
5. Enter your **HCP Terraform organization**, and select a **Project**, **Workspace**, and **Run phase**. Choose **All projects**, **All workspaces**, or **Plan and apply** to match any value.
6. Choose the Datadog identity the run authenticates as: an existing user or service account, or a new service account.
7. Click {{< ui >}}Create Mapping{{< /ui >}}.

After the mapping is created, the dialog shows the audience value to set in HCP Terraform.

#### Using the API

Create mappings with the `/api/v2/wif/terraform/persona_mapping` endpoint. It takes the `issuer_url` of your HCP Terraform region (`https://app.terraform.io` or `https://app.eu.terraform.io`), a `sub_pattern`, and the `account_identifier` of the target Datadog user or service account.

**Example**: An API call that maps `apply` runs from one HCP Terraform workspace to a Datadog service account, `terraform-service-account@myorg.com`.

```bash
# Example: map an HCP Terraform workspace to a Datadog service account
curl -X POST "{{< region-param key=dd_api code="true" >}}/api/v2/wif/terraform/persona_mapping" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
-d '{
  "data": {
    "type": "terraform_cloud_auth_config",
    "attributes": {
      "issuer_url": "https://app.terraform.io",
      "sub_pattern": "organization:my-org:project:my-project:workspace:datadog-prod:run_phase:apply",
      "account_identifier": "terraform-service-account@myorg.com"
    }
  }
}'
```

The response includes an `audience` attribute with the value `datadog/<YOUR_ORG_UUID>`. Use this value in the next step.

**Sub pattern rules**:
- Use `*` to match any value for an entire segment, for example `workspace:*`. A `*` inside a segment, such as `workspace:prod-*`, is matched literally.
- The organization segment cannot be `*`.
- A pattern that duplicates an existing mapping, or that can match the same token as a mapping bound to a different Datadog identity, is rejected.

For the full request and response schemas, see the [Cloud Authentication API reference](https://docs.datadoghq.com/api/latest/cloud-authentication/).

### Set the audience variable in HCP Terraform

In HCP Terraform, add an environment variable to the workspace, or to a variable set applied to it:

| Key | Value | Category |
|---|---|---|
| `TFC_WORKLOAD_IDENTITY_AUDIENCE_DATADOG` | `datadog/<YOUR_ORG_UUID>` | Environment variable |

HCP Terraform then injects a workload identity token for that audience into each run as `TFC_WORKLOAD_IDENTITY_TOKEN_DATADOG`. Do not set that variable yourself.

### Configure the Datadog Terraform provider for HCP Terraform

The provider detects the HCP Terraform workload identity token and exchanges it for a Datadog credential. Leave `api_key`, `app_key`, and `cloud_provider_type` unset, and do not set `DD_API_KEY`, `DD_APP_KEY`, or `DD_BEARER_TOKEN` in the workspace, because explicit credentials take precedence over the workload identity token.

```hcl
provider "datadog" {
  # Set api_url to your Datadog site. The HCP Terraform region does not select it.
  api_url = "{{< region-param key=dd_api code="true" >}}/"
}
```

To test the mapping, start a plan-only run in the workspace. If the run fails to authenticate, check that the run's `sub` claim matches the mapping's sub pattern and run phase, and that the audience variable matches the value from the mapping.

For other options, including untagged tokens and custom token tags, see the provider's [dynamic provider credentials guide][10].

## Set up Workload Identity Federation for a custom OIDC provider

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Workload Identity Federation for custom OIDC providers is not available for the selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

{{< callout url="/help/" header="Request access to custom OIDC providers" >}}
Workload Identity Federation for custom OIDC providers is in Preview and is available on commercial sites only. To request access, contact Datadog Support and include the issuer URL of your OIDC provider.
{{< /callout >}}

Any workload that can obtain a signed OIDC token from an identity provider you control, such as a CI system, a Kubernetes cluster, or a corporate identity provider, can exchange that token for a short-lived Datadog credential. Use a custom OIDC provider when your workload's identity provider is not AWS, GitHub Actions, or HCP Terraform. Those providers have dedicated setups on this page, and their issuers are rejected as custom OIDC providers.

Two mapping types are available:

- **Identity mapping**: the workload receives a Datadog access token for calling Datadog API endpoints as a Datadog user or service account.
- **Intake mapping**: the workload receives a Datadog API key for sending telemetry such as logs and metrics.

**Requirements**:
- Access to custom OIDC providers is enabled for your Datadog organization.
- Your account has the `workload_identity_federation_write` permission to create providers and mappings.
- Your identity provider publishes its signing keys over HTTPS, through an OIDC discovery document or a JWKS URL, and signs tokens with an RS, ES, or PS algorithm.
- The workload's tokens carry your Datadog organization UUID, either in a `dd_org_uuid` claim or as an audience of the form `datadog/<YOUR_ORG_UUID>`. Your organization UUID is shown on the [**Organization Settings** > **Workload Identity Federation**][6] page.

Setting up Workload Identity Federation for a custom OIDC provider involves three parts:
1. [Registering the OIDC provider in Datadog](#register-the-oidc-provider-in-datadog)
2. [Creating a custom OIDC mapping](#create-a-custom-oidc-mapping)
3. [Exchanging the workload's token for a Datadog credential](#exchange-the-workloads-token-for-a-datadog-credential)

### Register the OIDC provider in Datadog

A provider tells Datadog how to validate tokens from your identity provider. The token's `iss` claim must exactly match the provider's issuer URL. Providers cannot be edited. To change a provider, delete it and create a new one. A provider cannot be deleted while a mapping references it.

#### Using the UI

1. Navigate to [**Organization Settings** > **Workload Identity Federation**][6] and click the **OIDC Providers** tab.
2. Click {{< ui >}}Add Provider{{< /ui >}}.
3. Enter a **Name** and the **Issuer URL**.
4. Under **Key discovery**, select **OIDC discovery** to read signing keys from the issuer's discovery document, or **Direct JWKS URL** and enter the **JWKS URL**.
5. Under **Org routing**, choose whether tokens identify your Datadog organization with a `dd_org_uuid` claim or a `datadog/<YOUR_ORG_UUID>` audience.
6. Enter one or more **Audiences** that tokens must carry.
7. Optionally, add **Required claims** that every token from this provider must match.
8. Click {{< ui >}}Create Provider{{< /ui >}}.

#### Using the API

Create providers with the `/api/v2/wif/oidc/provider` endpoint.

```bash
# Example: register an OIDC provider that uses OIDC discovery
curl -X POST "{{< region-param key=dd_api code="true" >}}/api/v2/wif/oidc/provider" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
-d '{
  "data": {
    "type": "custom_oidc_provider_config",
    "attributes": {
      "provider_name": "ci-idp",
      "issuer_url": "https://idp.example.com",
      "discovery_type": "oidc_discovery",
      "audiences": ["datadog/<YOUR_ORG_UUID>"],
      "org_uuid_source": "aud"
    }
  }
}'
```

| Attribute | Description |
|---|---|
| `provider_name` | Required. A name for the provider, unique in your organization. |
| `issuer_url` | Required. The HTTPS issuer URL, unique in your organization. Must use a DNS hostname and cannot contain credentials or a query string. |
| `discovery_type` | Required. `oidc_discovery` or `direct_jwks`. |
| `jwks_url` | Required when `discovery_type` is `direct_jwks`. |
| `audiences` | Required. At least one audience that tokens must carry. |
| `org_uuid_source` | `dd_org_uuid` (default) reads the organization UUID from the `dd_org_uuid` claim. `aud` also accepts a `datadog/<YOUR_ORG_UUID>` audience, which must be listed in `audiences`. |
| `required_claims` | Claim matchers that every token from this provider must pass, in addition to its mapping's matchers. Uses the same format as [mapping claim matchers](#match-claims-safely-for-custom-oidc). |

<div class="alert alert-warning">If your issuer is shared by many tenants, such as <code>accounts.google.com</code> or <code>gitlab.com</code>, add a <code>required_claims</code> entry with <code>exact</code> mode that pins a claim identifying your tenant. Without it, tokens from other tenants of the same issuer could match your mappings.</div>

### Create a custom OIDC mapping

Custom OIDC mappings match claims from the workload's token and reference a registered provider.

#### Using the UI

1. Navigate to [**Organization Settings** > **Workload Identity Federation**][6] and click the **Identity Mappings** tab (for API access) or the **Intake Mappings** tab (for telemetry).
2. Click {{< ui >}}\+ New Mapping{{< /ui >}}.
3. Select **Custom OIDC** as the **Identity Provider**, then select the **OIDC Provider** you registered.
4. Under **Claim Matchers**, add each claim that the workload's token must match. See [Match claims safely](#match-claims-safely-for-custom-oidc).
5. For an identity mapping, select the Datadog user or service account the workload authenticates as.
6. Click {{< ui >}}Create Mapping{{< /ui >}}.

#### Using the API

Create mappings with the `/api/v2/wif/oidc/persona_mapping` (identity) and `/api/v2/wif/oidc/intake_mapping` (intake) endpoints. Both take the `provider_id` of a registered provider and a `claim_matchers` list. Identity mappings also take the `account_uuid` of the target Datadog user or service account.

**Example**: An API call that maps a CI pipeline's tokens to a Datadog service account.

```bash
# Example: map tokens for one CI project to a Datadog service account
curl -X POST "{{< region-param key=dd_api code="true" >}}/api/v2/wif/oidc/persona_mapping" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
-d '{
  "data": {
    "type": "custom_oidc_identity_mapping",
    "attributes": {
      "provider_id": "<PROVIDER_ID>",
      "account_uuid": "<SERVICE_ACCOUNT_UUID>",
      "claim_matchers": [
        { "claim": "sub", "mode": "glob", "values": ["project:my-team/deploy:*"] },
        { "claim": "environment", "mode": "exact", "values": ["production"] }
      ]
    }
  }
}'
```

For the full request and response schemas, see the [Cloud Authentication API reference](https://docs.datadoghq.com/api/latest/cloud-authentication/).

### Match claims safely for custom OIDC

Each claim matcher has a `claim` name, a `mode`, and a list of `values`. A token must pass every matcher in a mapping. A matcher passes when the claim equals any one of its values.

- **`exact`** (default): case-sensitive string equality.
- **`glob`**: matches the whole claim value. `*` matches any run of characters, including `/`. `?` matches one character. There is no escaping.

Every mapping must include at least one `exact` matcher, or a `glob` matcher whose values each have at least three literal characters before the first wildcard. You cannot match on `iss`, `aud`, `exp`, `iat`, `nbf`, `jti`, or `dd_org_uuid`. Datadog validates those claims separately.

<div class="alert alert-warning">Glob patterns can over-match, because <code>*</code> also matches <code>/</code>. A pattern like <code>project:my-team*</code> also matches <code>project:my-team-other/...</code>. Match exact values where you can, and pin the claims that identify your workload most narrowly.</div>

### Exchange the workload's token for a Datadog credential

No Datadog client library or integration exchanges custom OIDC tokens for you. Your workload calls the exchange endpoint directly, sending its OIDC token with the `oidc-` prefix in the `Authorization` header.

**Identity mapping**: request a Datadog access token, then use it as a bearer token.

```bash
DD_ACCESS_TOKEN=$(curl -fsS -X POST "{{< region-param key=dd_api code="true" >}}/api/v2/delegated-token" \
  -H "Authorization: Delegated oidc-${OIDC_TOKEN}" \
  | jq -r '.data.attributes.access_token')

curl -fsS "{{< region-param key=dd_api code="true" >}}/api/v2/current_user" \
  -H "Authorization: Bearer ${DD_ACCESS_TOKEN}"
```

The access token is short-lived. The response's `expires` attribute gives its expiration time. Request a new token when it expires.

**Intake mapping**: request a Datadog API key for sending telemetry.

```bash
DD_API_KEY=$(curl -fsS -X POST "{{< region-param key=dd_api code="true" >}}/api/v2/intake-key" \
  -H "Authorization: Delegated oidc-${OIDC_TOKEN}" \
  | jq -r '.data.attributes.api_key')
```

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
To find the assumed-role ARN for your workload, run <code>aws sts get-caller-identity</code> from your workload environment and use the value in the <code>Arn</code> field of the response.

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
[7]: https://github.com/DataDog/datadog-workload-identity-federation-github-action
[8]: https://developer.hashicorp.com/terraform/cloud-docs
[9]: https://developer.hashicorp.com/terraform/cloud-docs/dynamic-provider-credentials
[10]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/guides/dynamic_provider_credentials
