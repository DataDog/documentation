---
title: Code Coverage Configuration
description: "Configure code coverage behavior with a configuration file in your repository."
further_reading:
  - link: "/code_coverage"
    tag: "Documentation"
    text: "Code Coverage"
  - link: "/code_coverage/setup"
    tag: "Documentation"
    text: "Set up Code Coverage"
  - link: "/code_coverage/flags"
    tag: "Documentation"
    text: "Organize coverage data with flags"
---

## Overview

You can configure Code Coverage behavior by creating a configuration file named `code-coverage.datadog.yml` or `code-coverage.datadog.yaml` in the root of your repository.

Example configuration file:

```yaml
schema-version: v1
services:
  - id: frontend
    paths:
      - frontend/
      - shared/ui/**
  - id: backend-api
    paths:
      - backend/api/**
      - backend/.*\.go
ignore:
  - "test/**/*"
  - "**/*.pb.go"
```

## Services configuration

<div class="alert alert-info">Using <a href="/code_coverage/monorepo_support#software-catalog-integration">Software Catalog integration</a> is the recommended approach for defining services, as code locations configured in Software Catalog can be used by multiple Datadog products. Use manual configuration only when Software Catalog integration is not available.</div>

You can define services in your configuration file to split coverage data by service in monorepos. This is useful when multiple projects or teams share a single repository and you want to view coverage metrics for each service independently.

```yaml
schema-version: v1
services:
  - id: frontend
    paths:
      - frontend/**
      - shared/ui/**
  - id: backend-api
    paths:
      - backend/api/**
```

- `schema-version` (required): Must be `v1`
- `services`: List of service definitions
  - `id` (required): Unique identifier for the service
  - `paths` (required): List of path patterns that belong to this service (see [Pattern syntax](#pattern-syntax))

For complete details on monorepo support, including Software Catalog integration and code owner-based splitting, see [Monorepo Support][1].

### Examples

{{% collapse-content title="JavaScript/TypeScript monorepo" level="h4" %}}
{{< code-block lang="yaml" filename="code-coverage.datadog.yml" >}}
schema-version: v1
services:
  - id: web-app
    paths:
      - packages/web/**
      - packages/shared/ui/**
  - id: mobile-app
    paths:
      - packages/mobile/**
      - packages/shared/core/**
  - id: admin-dashboard
    paths:
      - packages/admin/**
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="Multi-language monorepo" level="h4" %}}
{{< code-block lang="yaml" filename="code-coverage.datadog.yml" >}}
schema-version: v1
services:
  - id: backend-service
    paths:
      - services/backend/**
      - services/backend/.*\.go
  - id: frontend-web
    paths:
      - services/frontend/**
      - services/frontend/.*\.(ts|tsx)
  - id: data-processing
    paths:
      - services/data/**
      - scripts/.*\.py
{{< /code-block >}}
{{% /collapse-content %}}

## Ignoring paths

You can exclude specific files or directories from code coverage reporting using the `ignore` field. This is useful for excluding test files, generated code, vendor dependencies, and other files that should not be included in coverage metrics. Path patterns support glob, regex, and prefix matching (see [Pattern syntax](#pattern-syntax)).

```yaml
ignore:
  - "test/**/*"           # Exclude all files in test directory
  - "*.pb.go"             # Exclude all protobuf generated files
  - "vendor/"             # Exclude vendor directory
```

### Exceptions

Add `!` before a pattern to create an exception to your ignore rules. This lets you include specific files or folders that would otherwise be excluded.

```yaml
ignore:
  - "generated/"          # Ignore all generated code
  - "!generated/core/"    # Except core generated files
```

**Important**: Negative patterns take precedence over positive patterns. If any negative pattern matches a file path, that path is _not_ ignored.

### Examples

{{% collapse-content title="Exclude test files and generated code" level="h4" %}}
```yaml
ignore:
  - "**/*_test.go"        # Exclude Go test files
  - "**/*.pb.go"          # Exclude protobuf files
  - "vendor/"             # Exclude vendor directory
  - "mocks/"              # Exclude mock files
```
{{% /collapse-content %}}

{{% collapse-content title="Exclude with exceptions" level="h4" %}}
```yaml
ignore:
  - "generated/"          # Ignore all generated code
  - "!generated/core/"    # Except core generated files
  - "test/"               # Ignore test directory
  - "!test/integration/"  # Except integration tests
```
{{% /collapse-content %}}

{{% collapse-content title="Mixed pattern types" level="h4" %}}
```yaml
ignore:
  - "^vendor/.*"          # Regex: exclude vendor (anchored)
  - "**/*.min.js"         # Glob: exclude minified JS files
  - "dist/"               # Prefix: exclude dist directory
  - ".*\\.pb\\.go$"       # Regex: exclude protobuf files
```
{{% /collapse-content %}}

## Pattern syntax

Configuration options that accept file paths support three types of patterns:

- `regex`
- `glob`
- `path_prefix`

The pattern type is automatically detected based on the syntax you use.

### Regex patterns

Patterns containing regex-specific characters (`+`, `{`, `}`, `|`, `(`, `)`, `^`, `$`, `\`) are treated as regular expressions:

- `".*\\.pb\\.go$"` - Matches files ending with `.pb.go`
- `"^generated/.*"` - Matches files in the generated directory
- `".*_test\\.go$"` - Matches test files

**Note**: Regex patterns are automatically anchored with `^...$` for whole-path matching. Use forward slashes (`/`) as path separators in regex patterns.

### Glob patterns

Patterns containing glob-specific characters (`*`, `?`, `[`, `]`) are treated as glob patterns:

- `"**/*.java"` - Matches all Java files
- `"src/test/**/*"` - Matches all files under src/test
- `"*.pb.go"` - Matches protobuf files in any directory

**Note**: Use `**` to match directories recursively. The pattern `folder/*` matches only direct children, while `folder/**/*` matches all descendants.

### Prefix patterns

Simple path prefixes without special characters are treated as prefix matches:

- `"vendor/"` - Matches all files under vendor directory
- `"third_party/"` - Matches third-party code
- `"generated/"` - Matches generated code

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /code_coverage/monorepo_support
