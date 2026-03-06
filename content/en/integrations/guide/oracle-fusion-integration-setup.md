---
title: Oracle Fusion Integration Setup
private: true
description: "Configure Oracle Fusion to authorize Datadog to access its REST APIs using OAuth 2.0."
---

{{< callout url="#" header="false" btn_hidden="true" >}}
  The Oracle Fusion integration is in Preview.
{{< /callout >}}

## Overview

Use this guide to give Datadog access to Oracle Fusion REST APIs using OAuth 2.0. The setup process establishes a read-only, least-privilege integration between Datadog and your Fusion instance.

Datadog queries Oracle Fusion REST APIs, including enterprise service scheduler (ESS) logs and data from enterprise resource planning (ERP), human capital management (HCM), supply chain management and manufacturing (SCM), customer experience (CX), and more. To set up the integration, create the following components in your Fusion environment:

1. **Confidential Application**: An OAuth 2.0 client used for secure machine-to-machine authentication.
2. **Integration User**: A dedicated Fusion user with read-only and ESS-related roles, created in Fusion Security Console.
3. **Role Assignments**: Permissions for Datadog to read job logs and REST resources, granted to the integration user.
4. **Datadog tile configuration**: The credentials and URLs collected during setup, entered in the Oracle Fusion integration tile.
5. **Confidential application user assignment** (optional): Associates the integration user with the confidential application so that OAuth tokens carry the correct identity and roles.

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

1. Navigate to **Identity & Security** > **Domains** and open the Identity Domain Console.
2. Navigate to **Applications** > **Add Application** > **Confidential Application**.
3. Enter a name such as `Datadog Fusion Integration`.
4. Under **Resources**, add your Fusion Applications resource server.
5. Select the appropriate scope; for example, `urn:opc:resource:fa:instanceid=<INSTANCE_ID>urn:opc:resource:consumer::all`. This grants the confidential client access to call REST APIs for the Fusion instance.
6. Save and **Activate** the application.
7. Copy the following values to enter in Datadog later:
   - **Client ID**
   - **Client Secret**
   - **Scope**
   - **Token Endpoint (OAuth URL)**: `https://<IDENTITY_DOMAIN>/oauth2/v1/token`

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

| Role | Purpose |
|------|---------|
| ESS Monitor | Read ESS job requests and job logs |
| Integration Specialist | Access ERP Integration REST endpoints |
| ORA_FND_READ_ONLY_ACCESS_ABSTRACT | Read-only access across Fusion functional areas |
| Internal Auditor | Read-only access to audit data |

## Configure the Datadog tile

In the Datadog UI, enter the following values in the Oracle Fusion integration tile:

- **Fusion Base URL**
- **Token Endpoint (OAuth URL)**
- **Client ID**
- **OAuth Scope**
- **Client Secret**

## Link the confidential application to the integration user (optional)

This step may not be required for all environments.

To associate the integration user with the confidential application so that OAuth tokens correctly represent the user:

1. In the Identity Domain Console, navigate to **Applications** > **Datadog Fusion Integration** (your confidential application).
2. Select **Users**.
3. Click **Assign Users**.
4. Select the user created in Fusion Security Console. If the user is not present in the Identity Domain, create a new user with the username set to the client ID from the previous step. Users in the Security Console and the Identity Domain must have the same username.
5. Save.

This association confirms that tokens issued when Datadog authenticates using client credentials carry the identity and roles of the integration user.


[1]: https://docs.oracle.com/en/cloud/saas/applications-common/25d/farca/configure_oauth.html
