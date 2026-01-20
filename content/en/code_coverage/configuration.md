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
---

{{< callout url="http://datadoghq.com/product-preview/code-coverage/" >}}
Code Coverage is in Preview. This product replaces Test Optimization's <a href="https://docs.datadoghq.com/tests/code_coverage">code coverage</a> feature, which is being deprecated. Complete the form to request access for the new Code Coverage product.
{{< /callout >}}

## Overview

You can configure code coverage behavior by creating a configuration file named `code-coverage.datadog.yml` or `code-coverage.datadog.yaml` in the root of your repository.

Example configuration file:

```yaml
ignore:
  - "test/**/*"
  - "**/*.pb.go"
```

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

## Ignoring paths

You can exclude specific files or directories from code coverage reporting using the `ignore` field. This is useful for excluding test files, generated code, vendor dependencies, and other files that should not be included in coverage metrics.

```yaml
ignore:
  - "test/**/*"           # Exclude all files in test directory
  - "*.pb.go"             # Exclude all protobuf generated files
  - "vendor/"             # Exclude vendor directory
```

### Exclusion operator

Use the `!` prefix to create negative patterns that **override** ignore rules. This allows you to exclude a broad set of files while including specific exceptions.

```yaml
ignore:
  - "generated/"          # Ignore all generated code
  - "!generated/core/"    # Except core generated files
```

**Important**: Negative patterns take precedence over positive patterns. If any negative pattern matches a file path, that path will _not_ be ignored.

### Examples

#### Exclude test files and generated code

```yaml
ignore:
  - "**/*_test.go"        # Exclude Go test files
  - "**/*.pb.go"          # Exclude protobuf files
  - "vendor/"             # Exclude vendor directory
  - "mocks/"              # Exclude mock files
```

#### Exclude with exceptions

```yaml
ignore:
  - "generated/"          # Ignore all generated code
  - "!generated/core/"    # Except core generated files
  - "test/"               # Ignore test directory
  - "!test/integration/"  # Except integration tests
```

#### Mixed pattern types

```yaml
ignore:
  - "^vendor/.*"          # Regex: exclude vendor (anchored)
  - "**/*.min.js"         # Glob: exclude minified JS files
  - "dist/"               # Prefix: exclude dist directory
  - ".*\\.pb\\.go$"       # Regex: exclude protobuf files
```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
