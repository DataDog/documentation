---
title: Oracle Fusion Integration Setup
description: "Configure Oracle Fusion to authorize Datadog to access its REST APIs using OAuth 2.0."
site_support_id: oracle_fusion_integration_setup
further_reading:
- link: "https://www.datadoghq.com/blog/oracle-fusion-applications-integration/"
  tag: "Blog"
  text: "Monitor Oracle Fusion Applications with Datadog"
---


## Overview

Use this guide to give Datadog access to Oracle Fusion REST APIs using OAuth 2.0. The setup process establishes a read-only, least-privilege integration between Datadog and your Fusion instance.

Datadog queries Oracle Fusion REST APIs, including enterprise service scheduler (ESS) logs and data from enterprise resource planning (ERP), human capital management (HCM), supply chain management and manufacturing (SCM), and customer experience (CX). To set up the integration, create the following components in your Fusion environment:

1. [**Confidential Application**](#create-a-confidential-application): An OAuth 2.0 client used for secure machine-to-machine authentication.
2. [**Integration User**](#create-a-fusion-integration-user): A dedicated Fusion user with read-only and ESS-related roles, created in Fusion Security Console.
3. [**Role Assignments**](#assign-required-roles): Permissions for Datadog to read job logs and REST resources, granted to the integration user.
4. [**Datadog tile configuration**](#configure-the-datadog-tile): The credentials and URLs collected during setup, entered in the Oracle Fusion integration tile.
After configuration is complete, Datadog obtains OAuth access tokens from your Fusion Identity Domain and uses them to call your Fusion REST APIs.

## Prerequisites

- You have Security Console access in Fusion.
- You have access to the Fusion Identity Domain (OCI IAM) associated with your Fusion instance. Full OCI access is not required.
- Your account has permission to:
  - Create Confidential Applications
  - Create and modify users
  - Assign job roles

## Create a confidential application

Create an OAuth client that Datadog uses to authenticate against your Fusion Identity Domain.

1. Navigate to **Identity & Security** > **Domains** and open the Identity Domain associated with your Oracle Fusion instance.
2. Navigate to **Integrated Applications** > **Add Application** > **Confidential Application**.
3. Enter a name such as `Datadog Fusion Integration` and click **Create**.
4. Navigate to **OAuth Configuration** > **Edit OAuth configuration** and configure the following settings:
   1. Select **Configure this application as a client now** and check **Client credentials** under **Allow grant types**.
   1. Enable **Bypass consent** and allow client IP addresses from anywhere.
   1. Under **Token Issuance Policy**, select **Specific** and toggle **Add Resources** on.
   1. Under **Resources**, select **Add scope** and choose your Fusion application, typically called **Fusion Applications Cloud Service**.
   1. Leave all other fields as default.
5. Save the OAuth configuration changes, then activate the application under **Actions** at the top of the screen.
6. Copy the following values to enter in Datadog later:
   - **Client ID**: Found under **OAuth Configuration** > **General Information**
   - **Client Secret**: Found under **OAuth Configuration** > **Client Secret**
   - **Scope**: Found under **OAuth Configuration** > **Resources** > **Scope**
   - **Token Endpoint (OAuth URL)**: `https://idcs-<IDENTITY_DOMAIN_ID>.identity.oraclecloud.com/oauth2/v1/token`. The identity domain value is found under **Domain Details** > **Domain URL**.

For more information, see [Configure OAuth Using Client Credentials Grant Type][1] in the Oracle documentation.

## Create a Fusion integration user

Datadog accesses Fusion through a dedicated read-only service account. This user carries the roles that control what Datadog can read.

1. In Fusion, navigate to **Security Console** > **Users** > **Create User**.
2. Set the username to exactly match the Client ID generated in the previous step.
3. Assign an email alias to the user. The user does not need to log in manually.
4. Save the user.

## Assign required roles

Grant the following roles to the integration user so that Datadog can read ESS logs and Fusion REST API data. Role names may vary in your Fusion environment.

1. In Fusion, navigate to **Security Console** > **Users** > **Edit User** > **Roles** > **Add Role**.
2. Assign the following roles:

| Role | Code | Purpose |
|------|------|---------|
| ESS Monitor | `ESSMonitor` | Read ESS job requests and job logs |
| Integration Specialist | `ORA_FND_INTEGRATION_SPECIALIST_JOB` | Access ERP Integration REST endpoints |
| Internal Auditor | `ORA_FND_INTERNAL_AUDITOR_JOB` | Read-only access to audit data |

<div class="alert alert-info">The ESS Monitor role cannot be assigned directly to a user. To assign it, navigate to <strong>Security Console</strong> &gt; <strong>Roles</strong> &gt; <strong>Create Role</strong> to create a custom role, add <code>ESSMonitor</code> under <strong>Role Hierarchy</strong>, then assign the new role to the integration user.</div>

## Configure the Datadog tile

In the Datadog UI, enter the following values in the Oracle Fusion integration tile:

- **Fusion Base URL**
- **Token Endpoint (OAuth URL)**
- **Client ID**
- **OAuth Scope**
- **Client Secret**

## Validation

Datadog automatically validates your credentials and displays error messages with suggested remedies if the connection fails.

To confirm the integration is working after your account is created:

- In the [Log Explorer][2], filter by `source:oracle-fusion` to view ESS and audit logs.
- In the [Metrics Explorer][3], search for `oracle.fusion.*` to view Oracle Fusion metrics, such as `oracle.fusion.ess.jobs`.

If the integration is not returning data, verify that you have enabled logging in Fusion. Navigate to **Setup and Maintenance** > **Manage Audit Policies** and set all audit levels to **High**.


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.oracle.com/en/cloud/saas/applications-common/25d/farca/configure_oauth.html
[2]: /logs/explorer/
[3]: /metrics/explorer/
