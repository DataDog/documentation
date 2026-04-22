---
title: Static Code Analysis (SAST) Configuration
description: Reference documentation for Datadog Static Code Analysis (SAST) configuration, covering ruleset selection, rule customization, severities, and paths.
---

By default, Datadog Static Code Analysis (SAST) scans your repositories with [Datadog's default rulesets][6] for each programming language. You can customize which rulesets and rules run, along with severities, paths, and other parameters. Configure these settings under the `sast` key in the Code Security configuration, either in Datadog or in a `code-security.datadog.yaml` file.

For information on configuration locations, precedence, and merging, see [Code Security Configuration Reference][26].

## Default rulesets

By default, Datadog enables the default rulesets for your repository's programming languages (`use-default-rulesets: true`). To modify the enabled rulesets:

- **Add rulesets**: List them under `use-rulesets`
- **Disable specific rulesets**: List them under `ignore-rulesets`
- **Disable all default rulesets**: Set `use-default-rulesets: false`, then list the desired rulesets under `use-rulesets`

For the full list of default rulesets, see [Static Code Analysis (SAST) Rules][6].

## Configuration format

The following configuration format applies to all configuration locations: org-level, repository-level, and repository-level (file).

The configuration file must begin with `schema-version: v1.0` or `schema-version: v1.1`, followed by a `sast` key containing the analysis configuration. The full structure is as follows:

```yaml
schema-version: v1.0
sast:
  use-default-rulesets: true
  use-rulesets:
    - ruleset-name
  ignore-rulesets:
    # Always ignore these rulesets (even if it is a default ruleset or listed in `use-rulesets`)
    - ignored-ruleset-name
  ruleset-configs:
    ruleset-name:
      # Only apply this ruleset to the following paths/files
      only-paths:
        - "path/example"
        - "**/*.file"
      # Do not apply this ruleset in the following paths/files
      ignore-paths:
        - "path/example/directory"
        - "**/config.file"
      rule-configs:
        rule-name:
          # Only apply this rule to the following paths/files
          only-paths:
            - "path/example"
            - "**/*.file"
          # Do not apply this rule to the following paths/files
          ignore-paths:
            - "path/example/directory"
            - "**/config.file"
          arguments:
            # Set the rule's argument to value.
            argument-name: value
          severity: ERROR
          category: CODE_STYLE
        rule-name:
          arguments:
            # Set different argument values in different subtrees
            argument-name:
              # Set the rule's argument to value_1 by default (root path of the repo)
              /: value_1
              # Set the rule's argument to value_2 for specific paths
              path/example: value_2
  global-config:
    # Only analyze the following paths/files
    only-paths:
      - "path/example"
      - "**/*.file"
    # Do not analyze the following paths/files
    ignore-paths:
      - "path/example/directory"
      - "**/config.file"
    use-gitignore: true
    ignore-generated-files: true
    max-file-size-kb: 200
```

The `sast` key supports the following fields:

| **Property** | **Type** | **Description** | **Default** |
| --- | --- | --- | --- |
| `use-default-rulesets` | Boolean | Whether to enable Datadog default rulesets. | `true` |
| `use-rulesets` | Array | A list of ruleset names to enable. | None |
| `ignore-rulesets` | Array | A list of ruleset names to disable. Takes precedence over `use-rulesets` and `use-default-rulesets`. | None |
| `ruleset-configs` | Object | A map from ruleset name to its configuration. | None |
| `global-config` | Object | Global settings for the repository. | None |

## Ruleset configuration

Each entry in the `ruleset-configs` map configures a specific ruleset. A ruleset does not need to be listed in `use-rulesets` for its configuration to apply; the configuration is used whenever the ruleset is enabled, including through `use-default-rulesets`.

| **Property** | **Type** | **Description** | **Default** |
| --- | --- | --- | --- |
| `only-paths` | Array | File paths or glob patterns. Only files matching these patterns are processed for this ruleset. | None |
| `ignore-paths` | Array | File paths or glob patterns to exclude from analysis for this ruleset. | None |
| `rule-configs` | Object | A map from rule name to its configuration. | None |

## Rule configuration

Each entry in a ruleset's `rule-configs` map configures a specific rule:

| **Property** | **Type** | **Description** | **Default** |
| --- | --- | --- | --- |
| `only-paths` | Array | File paths or glob patterns. The rule is applied only to files matching these patterns. | None |
| `ignore-paths` | Array | File paths or glob patterns to exclude. The rule is not applied to files matching these patterns. | None |
| `arguments` | Object | Parameters and values for the rule. Values can be scalars or defined per path. | None |
| `severity` | String or Object | The rule severity. Valid values: `ERROR`, `WARNING`, `NOTICE`, `NONE`. Can be a single value or defined per path. | None |
| `category` | String | The rule category. Valid values: `BEST_PRACTICES`, `CODE_STYLE`, `ERROR_PRONE`, `PERFORMANCE`, `SECURITY`. | None |

## Argument and severity configuration

Arguments and severity can be defined in one of two formats:

1. **Single value:** Applies to the whole repository.

   ```yaml
   arguments:
     argument-name: value
   severity: ERROR
   ```

2. **Per-path mapping:** Different values for different subtrees. The longest matching path prefix applies. Use `/` as a catch-all default.

   ```yaml
   arguments:
     argument-name:
       /: value_default
       path/example: value_specific
   severity:
     /: WARNING
     path/example: ERROR
   ```

   | **Key** | **Type** | **Description** | **Default** |
   | --- | --- | --- | --- |
   | `/` | Any | The default value when no specific path is matched. | None |
   | `specific path` | Any | The value for files matching the specified path or glob pattern. | None |

The `category` field takes a single string value for the whole repository.

## Global configuration

The `global-config` object controls repository-wide settings:

| **Property** | **Type** | **Description** | **Default** |
| --- | --- | --- | --- |
| `only-paths` | Array | File paths or glob patterns. Only matching files are analyzed. | None |
| `ignore-paths` | Array | File paths or glob patterns to exclude. Matching files are not analyzed. | None |
| `use-gitignore` | Boolean | Whether to include entries from the `.gitignore` file in `ignore-paths`. | `true` |
| `ignore-generated-files` | Boolean | Whether to include common generated file patterns in `ignore-paths`. | `true` |
| `max-file-size-kb` | Number | Maximum file size (in kB) to analyze. Larger files are ignored. | `200` |

Example configuration:

```yaml
schema-version: v1.0
sast:
  use-default-rulesets: false
  use-rulesets:
    - python-best-practices
    - python-security
    - python-code-style
    - python-inclusive
    - python-django
    - custom-python-ruleset
  ruleset-configs:
    python-code-style:
      rule-configs:
        max-function-lines:
          # Do not apply the rule max-function-lines to the following files
          ignore-paths:
            - "src/main/util/process.py"
            - "src/main/util/datetime.py"
          arguments:
            # Set the max-function-lines rule's threshold to 150 lines
            max-lines: 150
          # Override this rule's severity
          severity: NOTICE
        max-class-lines:
          arguments:
            # Set different thresholds for the max-class-lines rule in different subtrees
            max-lines:
              # Set the rule's threshold to 200 lines by default (root path of the repo)
              /: 200
              # Set the rule's threshold to 100 lines in src/main/backend
              src/main/backend: 100
          # Override this rule's severity with different values in different subtrees
          severity:
            # Set the rule's severity to NOTICE by default
            /: NOTICE
            # Set the rule's severity to NONE in tests/
            tests: NONE
    python-django:
      # Only apply the python-django ruleset to the following paths
      only-paths:
        - "src/main/backend"
        - "src/main/django"
      # Do not apply the python-django ruleset in files matching the following pattern
      ignore-paths:
        - "src/main/backend/util/*.py"
  global-config:
    # Only analyze source files
    only-paths:
      - "src/main"
      - "src/tests"
      - "**/*.py"
    # Do not analyze third-party files
    ignore-paths:
      - "lib/third_party"
```

## Legacy configuration

Datadog Static Code Analysis (SAST) previously used a different configuration file (`static-analysis.datadog.yml`) and schema. This schema is deprecated and does not receive new updates, but it is [documented][25] in the `datadog-static-analyzer` repository.

If both files are present, `code-security.datadog.yaml` takes precedence over `static-analysis.datadog.yml`.

### Ignoring violations

#### Ignore for a repository

Add a rule configuration in your `code-security.datadog.yaml` file. The following example ignores the rule `javascript-express/reduce-server-fingerprinting` for all directories.

```yaml
schema-version: v1.0
sast:
  ruleset-configs:
    javascript-express:
      rule-configs:
        reduce-server-fingerprinting:
          ignore-paths:
            - "**"
```

#### Ignore for a file or directory

Add a rule configuration in your `code-security.datadog.yaml` file. The following example ignores the rule `javascript-express/reduce-server-fingerprinting` for a specific file. For more information on how to ignore by path, see [Customize your configuration](#customize-your-configuration).

```yaml
schema-version: v1.0
sast:
  ruleset-configs:
    javascript-express:
      rule-configs:
        reduce-server-fingerprinting:
          ignore-paths:
            - "ad-server/src/app.js"
```

#### Ignore for a specific instance

To ignore a specific instance of a violation, comment `no-dd-sa` above the line of code to ignore. This prevents that line from ever producing a violation. For example, in the following Python code snippet, the line `foo = 1` would be ignored by Static Code Analysis scans.

```python
#no-dd-sa
foo = 1
bar = 2
```

You can also use `no-dd-sa` to only ignore a particular rule rather than ignoring all rules. To do so, specify the name of the rule you wish to ignore in place of `<rule-name>` using this template:

`no-dd-sa:<rule-name>`

For example, in the following JavaScript code snippet, the line `my_foo = 1` is analyzed by all rules except for the `javascript-code-style/assignment-name` rule.

```javascript
// no-dd-sa:javascript-code-style/assignment-name
my_foo = 1
myBar = 2
```

[6]: /security/code_security/static_analysis/static_analysis_rules
[25]: https://github.com/DataDog/datadog-static-analyzer/blob/main/doc/legacy_config.md
[26]: /security/code_security/guides/configuration/
