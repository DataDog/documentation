---
title: Monorepo Support in Code Coverage
description: "Learn how Code Coverage supports large monorepos"
further_reading:
  - link: "/code_coverage/setup"
    tag: "Documentation"
    text: "Set up Code Coverage"
  - link: "https://www.datadoghq.com/software-catalog/"
    tag: "Documentation"
    text: "Datadog Software Catalog"
---

{{< callout url="http://datadoghq.com/product-preview/code-coverage/" >}}
Code Coverage is in Preview. This product replaces Test Optimization's <a href="https://docs.datadoghq.com/tests/code_coverage">code coverage</a> feature, which is being deprecated. Complete the form to request access for the new Code Coverage product.
{{< /callout >}}

## Overview

For large monorepos containing multiple projects or components, or where multiple teams collaborate, viewing code coverage data for the entire repository may not provide actionable insights. Code Coverage supports splitting coverage data by services and code owners, allowing you to:

- View total coverage, patch coverage, and detailed coverage data for individual services, components, or code owner teams within a monorepo
- Set up PR gates that apply to specific services or code owners
- Track coverage trends for individual services and code owner teams over time

Code Coverage automatically calculates separate coverage metrics for each service and code owner based on the file paths that belong to that service or are owned by that team.

## Ways to split coverage data

Code Coverage provides two ways to split coverage data in a monorepo:

### By service

1. **[Software Catalog][1] integration** (recommended): Automatically use service definitions from Datadog Software Catalog
2. **Manual configuration**: Define services using a YAML configuration file in your repository

### By code owner

Automatically split coverage by code owner teams based on the `CODEOWNERS` file in your repository.

These methods can be used together. Service splitting and code owner splitting work independently—you can have coverage split by both services and code owners simultaneously. For service definitions, Software Catalog integration takes priority over manual configuration. Coverage is calculated for up to 200 services and code owners per coverage report, with a total limit of 2000 services across your organization.

## Software Catalog integration

If you use [Software Catalog][1], Code Coverage automatically uses the `codeLocations` attribute from your service definitions to calculate coverage for each service.

<div class="alert alert-info">Using Software Catalog for service definitions is the recommended approach, as code locations configured in Software Catalog can be used by multiple Datadog products, including Code Coverage, Error Tracking, and Code Security. Use manual configuration only when Software Catalog integration is not available.</div>

### How Software Catalog integration works

When you define services in Software Catalog with `codeLocations` pointing to your repository, Code Coverage automatically:
1. Reads the service definitions from Software Catalog
2. Calculates coverage for each service based on the specified paths
3. Displays coverage data in the Code Coverage UI

No additional configuration is needed in your repository.

### Service definition example

<div class="alert alert-info">You can add or update service definitions by adding YAML files to your repository, using the Datadog UI, enabling automatic service discovery, or importing from a third-party integration. See the <a href="/internal_developer_portal/software_catalog/set_up/">Software Catalog documentation</a> for more details.</div>

{{< code-block lang="yaml" filename="service.datadog.yml" >}}
apiVersion: v3
kind: service
metadata:
  name: checkout-service
datadog:
  codeLocations:
    - repositoryURL: https://github.com/my-org/my-monorepo.git
      paths:
        - services/checkout/**
        - shared/payment/**
        - shared/cart/**
{{< /code-block >}}

See the [Service Definition documentation][4] for complete details on the service definition format and available options.

## Code owner-based splitting

Code Coverage can automatically split coverage data based on the `CODEOWNERS` file in your repository. Code owner splitting works independently from service splitting—coverage can be split by both services and code owners simultaneously.

### How code owner-based splitting works

When a `CODEOWNERS` file is present, Code Coverage:
1. Reads the code owner assignments from your repository
2. Groups file paths by code owner team
3. Calculates separate coverage metrics for each team's owned code

This happens automatically without requiring any configuration file.

### Requirements for code owner-based splitting

- A `CODEOWNERS` file must exist in your repository (typically at `.github/CODEOWNERS`, `docs/CODEOWNERS`, or `CODEOWNERS` in the root)
- Source code provider integration must be configured (see [Setup][2])
- Code owner teams must be properly formatted according to your source code provider's requirements

## Manual service configuration

<div class="alert alert-info">Manual service configuration should only be used when you cannot use Software Catalog integration. Software Catalog is the preferred method because code locations defined there can be utilized by multiple Datadog products.</div>

To manually define services, add a `services` section to the `code-coverage.datadog.yml` file in your repository. See [Configuration][6] for file format details, configuration options, pattern syntax, and examples.

## View coverage data for services and code owners

After services or code owners are configured, coverage data becomes available filtered by service or code owner for any coverage reports uploaded after the configuration changes.

On the Branch overview, Pull Request details, and Commit details pages in [Code Coverage UI][5], use the **Code Owner** or **Service** selector dropdown at the top to:
- View coverage metrics or detailed coverage data filtered to a specific service or code owner
- Identify which files belong to each service or are owned by specific teams
- Compare coverage across different services or code owners
- View coverage trends over time for a specific service or code owner

{{< img src="/code_coverage/pr_codeowners.png" text="Code Coverage PR details page with Code owners selector in Datadog" style="width:100%" >}}

## Set up PR Gates for services and code owners

You can configure [PR Gates][7] to enforce coverage thresholds for specific services or code owners.

### Creating a service or code owner-specific gate

1. Navigate to [PR Gates rule creation][3].
2. Configure the coverage threshold (total or patch coverage).
3. In the **per service** or **per code owner** field, select one or more services or code owner teams the gate should apply to.
4. Save the rule.

{{< img src="/code_coverage/pr_gate_codeowners.png" text="Code Coverage PR gate creation page in Datadog" style="width:100%" >}}

### How service and code owner gates work

- **With services or code owners specified**: The gate evaluates coverage separately for each selected service or code owner team. When multiple services or code owners are specified, each is evaluated independently against the threshold. The gate does not combine coverage across services or code owners.
- **Without services or code owners specified**: The gate evaluates coverage for the entire repository.

### Example configurations

**Enforce high coverage for backend services:**

{{< img src="/code_coverage/pr_gate_backend_services.png" text="Code Coverage PR gate configured for backend services" style="width:100%" >}}

**Require all new code in frontend to be tested:**

{{< img src="/code_coverage/pr_gate_frontend.png" text="Code Coverage PR gate configured for frontend services" style="width:100%" >}}

**Enforce coverage for specific team's code:**

{{< img src="/code_coverage/pr_gate_codeowners_team.png" text="Code Coverage PR gate configured for a specific team" style="width:100%" >}}

### Multiple gates per repository

You can create multiple gates for the same repository, each applying to different services or code owners. This allows you to enforce different coverage standards for different parts of your monorepo or for different teams.

## Troubleshooting

### Software Catalog services are not appearing in the UI

When using Software Catalog integration, changes to service definitions in Software Catalog may take up to 10 minutes to synchronize with Code Coverage. After creating or updating service definitions in Software Catalog:

1. Verify that the service definition in Software Catalog includes `codeLocations` with the correct `repositoryURL`.
2. Ensure the paths specified in `codeLocations` match the actual file structure.
3. Wait up to 10 minutes for the changes to propagate.
4. Upload a new coverage report after the synchronization completes.

Software Catalog is queried when processing coverage reports, so changes only take effect for newly uploaded reports.

### Manual service configuration not taking effect

If manually configured services don't appear in the UI:

1. Ensure the `code-coverage.datadog.yml` file is at the repository root.
2. Validate the YAML syntax (use a YAML validator to check for errors).
3. Verify that source code provider integration is properly configured (see [Setup][2]).
4. Upload a new coverage report after adding or modifying the configuration file.

The configuration file is read when processing coverage reports, so changes only take effect for newly uploaded reports.

### Coverage values don't match expected service or code owner boundaries

Check that:
1. Path patterns in your configuration correctly match the intended files
2. Paths in coverage reports are relative to the repository root (as expected by Code Coverage)

If paths in coverage reports are relative to a subdirectory, use the `--base-path` option when uploading:
{{< code-block lang="shell" >}}
datadog-ci coverage upload --base-path=src .
{{< /code-block >}}

### Coverage not calculated for some services or code owners

Code Coverage has the following limits:

- **Per-report limit (200)**: Up to 200 services and code owners combined per coverage report
- **Organization-wide service limit (2000)**: Up to 2000 services total across all repositories in your organization

If you exceed these limits, coverage is not calculated for services or code owners beyond the limit.

To stay within limits:
1. Consolidate related services into broader categories.
2. Remove unused or redundant service definitions.

### Code owner-based coverage not appearing

Confirm that:
1. A `CODEOWNERS` file exists in the standard location (`.github/CODEOWNERS`, `docs/CODEOWNERS`, or `CODEOWNERS` in the root)
2. Source code provider integration has access to read the file (see [Setup][2])
3. The code owner format follows your provider's syntax requirements
4. At least one coverage report has been uploaded after the `CODEOWNERS` file was added or updated

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /service_catalog/
[2]: /code_coverage/setup
[3]: https://app.datadoghq.com/ci/pr-gates/rule/create?dataSource=code_coverage
[4]: /service_catalog/service_definition_api/
[5]: https://app.datadoghq.com/ci/code-coverage
[6]: /code_coverage/configuration
[7]: /pr_gates
