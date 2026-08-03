---
title: Example Implementations
description: Enterprise access control implementation templates for four common organizational archetypes.
further_reading:
- link: "/account_management/rbac/"
  tag: "Documentation"
  text: "Access Control (RBAC)"
- link: "/account_management/rbac/data_access"
  tag: "Documentation"
  text: "Data Access Control"
- link: "/account_management/rbac/granular_access"
  tag: "Documentation"
  text: "Granular Access Control"
- link: "/getting_started/teams/"
  tag: "Documentation"
  text: "Getting Started with Teams"
- link: "https://registry.terraform.io/providers/DataDog/datadog/latest/docs"
  tag: "Documentation"
  text: "Datadog Terraform Provider"
---

## Overview

These four implementation templates show what a fully implemented access strategy looks like, including which mechanisms are in use, how roles and teams are structured, and how the layers work together. They represent common organization archetypes, not specific companies. Use them as a starting point for your own implementation.

## Choose your template

Use the following questions to identify which patterns are most relevant to you:

| Question | If yes, look at... |
| :---- | :---- |
| **Do you have regulated data that must be invisible to certain user groups?** | [Template 1 (Financial)](#template-1-large-financial-institution)<br>[Template 2 (Regulated Multi-BU)](#template-2-regulated-enterprise-with-multiple-business-units) |
| **Do you have hard compliance boundaries requiring complete data isolation between divisions?** | [Template 2 (Regulated Multi-BU)](#template-2-regulated-enterprise-with-multiple-business-units) |
| **Do you have high API key volume and many automation pipelines?** | [Template 3 (Large Tech Company)](#template-3-large-technology-company) |
| **Do you serve multiple internal tenants or clients on a shared platform?** | [Template 4 (Platform Provider)](#template-4-government-agency--platform-provider) |
| **Do you manage configuration through Terraform or similar IaC tools?** | [Template 4 (Platform Provider)](#template-4-government-agency--platform-provider) |
| **Do you operate many orgs and need consistent access controls across them?** | [Template 4 (Platform Provider)](#template-4-government-agency--platform-provider) |

## Template 1: Large Financial Institution

### Profile

A global financial services company with 15,000 Datadog users across retail banking, investment banking, wealth management, and insurance divisions. Operates in a single Datadog org with 150 Teams mapped to business lines. Subject to SOC 2, PCI DSS, and multiple national financial regulators. Uses Okta for identity with SCIM provisioning.

### Access strategy

| Layer | Implementation |
| :---- | :---- |
| **Org structure** | Single org with Data Access Control for data segregation between divisions, preserving cross-division incident investigation capabilities. |
| **Custom roles** | 5 roles: Read Only (auditors and compliance), Standard User (most engineers), Platform Admin, Restricted User (contractors), and Trading Floor (elevated Logs access for regulated data). Automatic Updates configured to follow the Standard role template. |
| **Identity** | SCIM from Okta. Each division has its own Okta group mapped to a Datadog Team. Role assignment is based on Okta group membership, with quarterly access reviews driven by compliance. |
| **Data restrictions** | Data Access Control datasets for trading data (`data_sensitivity:trading`) restricted to the Trading and Compliance teams. Separate dataset for PII-tagged data (`data_sensitivity:pii`) restricted to the Privacy team. Standard Data Access Control (not Strict Mode). |
| **Asset protections** | All production Monitors and operational Dashboards restricted to the owning Team for Edit access. A "Platform Governance" team has override Edit access across all assets. |
| **Keys and tokens** | Service accounts for each CI/CD pipeline. Application keys scoped to specific API endpoints. API keys per team. 90-day rotation cadence for application keys, enforced through Terraform. |
| **Auditing** | Audit Trail enabled with alerts on role changes, key creation, and Data Access Control policy modifications. Quarterly access review reports generated for regulators. |

### Key takeaway

Data Access Control lets this organization keep a single org for connected observability while maintaining strict data boundaries between divisions. The critical success factor is consistent tagging at ingestion. Without reliable `data_sensitivity` tags, Data Access Control cannot enforce the boundaries.

## Template 2: Regulated Enterprise with Multiple Business Units

### Profile

A multinational conglomerate with 8,000 Datadog users across 5 major divisions: aerospace and defense, commercial electronics, healthcare, transportation, and energy. Each division has its own compliance regime (ITAR for defense, HIPAA for healthcare, SOX for energy). Operates across 12 Datadog orgs organized under a parent org. Uses Entra ID (Azure AD) with SAML mapping and supplementary SCIM.

### Access strategy

| Layer | Implementation |
| :---- | :---- |
| **Org structure** | 12 child orgs. The defense division requires complete data isolation even for metadata, justifying a separate org. Other divisions share orgs by region and business function. Parent org used for centralized billing and executive dashboards through Cross-Org Visibility. |
| **Custom roles** | Each child org has 4-5 custom roles tailored to its compliance requirements. The defense org uses a minimal custom role that strips all write permissions for non-engineering staff. The healthcare org has a dedicated HIPAA Analyst role with access to PHI-tagged data. |
| **Identity** | SAML from Entra ID, with per-division Conditional Access policies. Defense division requires MFA and managed-device attestation. SCIM for team membership. |
| **Data restrictions** | Defense org uses Data Access Control Strict Mode. All data is hidden by default, and users are explicitly granted access to specific datasets. Healthcare org uses standard Data Access Control with restricted datasets for PHI-tagged telemetry. Commercial divisions use standard Data Access Control for service-based data segregation. |
| **Asset protections** | Each org manages its own asset access policies. Production Monitors in the defense and healthcare orgs are restricted to Edit by the owning Team plus the division's security team. |
| **Cross-org** | Parent org has Cross-Org Visibility enabled for executive dashboards showing system health across all divisions. Organization Groups (Preview) for centralizing policies across child orgs. |
| **Keys and tokens** | All keys managed through Terraform. Defense org uses a hardened Terraform pipeline with approval gates for any key or role change. Service accounts used exclusively. No human-owned application keys. |

### Key takeaway

Multi-org is justified here because of hard compliance boundaries. Regulations create strict data isolation and residency requirements. The defense division's use of Strict Mode reflects the default-deny requirement of its regulatory environment. Cross-Org Visibility keeps centralized reporting functional without compromising isolation.

## Template 3: Large Technology Company

### Profile

A global technology company with 12,000 Datadog users running a large-scale payment processing and commerce platform. Operates a single org representing 20 major product lines. Uses a proprietary identity system integrated with the Teams API and Terraform. Heavy API usage with over 500 active application keys and 200 service accounts.

### Access strategy

| Layer | Implementation |
| :---- | :---- |
| **Org structure** | Single org representing 20 major product lines. Data Access Control and Teams provide internal boundaries within each org. Two additional orgs used for sandbox and non-prod environments. |
| **Custom roles** | 5 custom roles, standardized across the company through Terraform modules: Read Only, Standard, Platform, Organization Admin, Contractor. Automatic Updates enabled for the non-Contractor roles. |
| **Identity** | Proprietary IdP integrated with Teams API and Terraform. Team membership synced nightly from the internal service ownership registry. Role assignment managed through a Terraform module that reads from the central employee directory. |
| **Data restrictions** | Standard Data Access Control separating product lines on sensitive key telemetry types (Logs, RUM, Cloud Costs). Restricted datasets created based on service, with cross-team access granted through explicit dataset assignments. Contractor users are restricted to a narrow set of services defined in their contract scope. |
| **Asset protections** | All production Monitors restricted to the owning Team. Dashboards are broadly viewable but Edit-restricted. A "Platform SRE" team has override access for incident response. |
| **Keys and tokens** | One API key per Team. Service accounts for all automation. Application keys scoped to specific API operations. Quarterly audits to identify and revoke unused keys. |

### Key takeaway

Per-Team API keys and quarterly audits are essential for managing governance at this scale. Data Access Control, Teams, and granular access provide boundaries within the org.

## Template 4: Government Agency / Platform Provider

### Profile

A large government agency or managed service provider with 5,000 Datadog users operating a shared observability platform for approximately 200 internal agencies, departments, or client tenants. Operates 3 Datadog orgs segmented by environment (production, staging, development), but each org contains data from many distinct tenants that must be isolated from each other. Uses Entra ID integrated through a ServiceNow CMDB, with Terraform managing all configuration.

### Access strategy

| Layer | Implementation |
| :---- | :---- |
| **Org structure** | 3 orgs by environment, not by tenant. Within-org segmentation through Teams and Data Access Control provides tenant isolation. This avoids the management overhead of 200+ separate orgs while still maintaining strict boundaries. |
| **Custom roles** | 5 roles: Read Only (auditors), Standard User, Platform Admin, Organization Admin, Restricted Observer (for stakeholders who need limited visibility into a single tenant's data). The Platform Admin role includes an override that bypasses team-based asset restrictions. |
| **Identity** | Complex identity chain: Entra ID syncs user groups to ServiceNow CMDB. CMDB records determine the user's Datadog org, Team, and Role. Changes flow through ServiceNow approval workflows before being applied to Datadog with Terraform. SAML attribute mapping provides the initial login provisioning. |
| **Data restrictions** | Standard Data Access Control with datasets per tenant agency, defined by the `agency` tag. Each agency's Team has access only to their own data. The platform team has access to infrastructure-level data across all tenants for capacity planning and incident response. |
| **Asset protections** | Each agency's Monitors and Dashboards restricted to their Team for Edit access. Critical shared infrastructure Monitors (network, DNS, shared compute) restricted to the Platform team. An admin override team ("Platform Governance") is included in all asset access lists to prevent lockout. |
| **Keys and tokens** | All API keys and service accounts managed through Terraform with a ServiceNow approval gate. One API key per agency for data submission. Service accounts for shared automation pipelines. No human application keys permitted. All API access goes through service accounts with SATs. |
| **Managing as code** | All roles, Teams, Data Access Control datasets, granular access policies, and keys defined in Terraform. Changes go through code review and ServiceNow approval before being applied. This is essential at this scale: manual configuration across 200 tenant boundaries would be unsustainable. |

### Key takeaway

Within-org segmentation (Teams + Data Access Control) can replace multi-org isolation when the tenant boundaries are organizational, not regulatory. The CMDB-driven identity chain and Terraform-managed configuration are required at this scale. The admin override team is a critical safety net that should be established before any asset restrictions are applied.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
