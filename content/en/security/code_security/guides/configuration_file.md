---
title: Code Security Configuration File Reference
description: Reference documentation for the code-security.datadog.yaml file, including configuration locations, precedence, and file format.
disable_toc: false
---

Datadog Code Security can be configured in Datadog, in a file at the root of your repository, or in both locations.

## Configuration locations

There are three levels of configuration:

* Org-level configuration (Datadog)
* Repository-level configuration (Datadog)
* Repository-level configuration (repo file)

All three configurations use the same YAML format, and they are merged **in order** (see [Configuration precedence and merging](#configuration-precedence-and-merging)).

### Org-level configuration

{{< img src="/security/code_security/org-level-configuration.png" alt="The Datadog Code Security org-level configuration editor." style="width:100%;" >}}

Org-level configurations apply to all repositories in your org. They define org-wide rules and specify global paths or files to ignore.

### Repository-level configuration

{{< img src="/security/code_security/repo-level-configuration.png" alt="The Datadog Code Security repository-level configuration editor." style="width:100%;" >}}

Repository-level configurations apply to a single repository. They override org-level settings or define rules specific to that repo.

### Repository-level configuration (file)

The `code-security.datadog.yaml` file stores configuration at the root of a repository. It takes precedence over org-level and repository-level configurations defined in Datadog, and supports version-controlling configuration alongside your code.

## Configuration precedence and merging

Configurations are merged in the following order, where each level overrides the one before it:

1. **Org-level (Datadog)**
1. **Repo-level (Datadog)**
1. **Repo-level file** (`code-security.datadog.yaml`)

The following merge rules apply:

- **Lists** (`use-rulesets`, `ignore-rulesets`, `ignore-paths`, `only-paths`): Concatenated, with duplicates removed
- **Scalar values** (`use-default-rulesets`, `use-gitignore`, `ignore-generated-files`, `max-file-size-kb`, `category`, and per-path entries for `severity` and `arguments`): The value from the highest-precedence configuration is used
- **Maps** (`ruleset-configs`, `rule-configs`, `arguments`): Recursively merged

The following example shows how configurations are merged:

**Org-level:**

```yaml
schema-version: v1.1
sast:
  use-default-rulesets: false
  use-rulesets:
    - A
  ruleset-configs:
    A:
      rule-configs:
        foo:
          ignore-paths:
            - "path/to/ignore"
          arguments:
            maxCount: 10
sca:
  ignore-paths:
    - "vendor/"
```

**Repo-level:**

```yaml
schema-version: v1.1
sast:
  use-rulesets:
    - B
  ignore-rulesets:
    - C
  ruleset-configs:
    A:
      rule-configs:
        foo:
          arguments:
            maxCount: 22
        bar:
          only-paths:
            - "src"
sca:
  ignore-paths:
    - "third_party/"
```

**Merged result:**

```yaml
schema-version: v1.1
sast:
  use-default-rulesets: false
  use-rulesets:
    - A
    - B
  ignore-rulesets:
    - C
  ruleset-configs:
    A:
      rule-configs:
        foo:
          ignore-paths:
            - "path/to/ignore"
          arguments:
            maxCount: 22
        bar:
          only-paths:
            - "src"
sca:
  ignore-paths:
    - "vendor/"
    - "third_party/"
```

The `maxCount: 22` value from the repo-level configuration overrides the `maxCount: 10` value from the org-level configuration because repo-level settings have higher precedence. All other fields from the org-level configuration are retained because they are not overridden. The `ignore-paths` lists from both levels are concatenated.

## Configuration file format

The configuration file must begin with `schema-version: v1.0` or `schema-version: v1.1`, followed by top-level keys for each product you want to configure. Use `v1.1` to enable SCA support.

```yaml
schema-version: v1.1
sast:
  # Static Code Analysis (SAST) configuration
sca:
  # Software Composition Analysis (SCA) configuration
```

Both sections are optional. You can configure one or both products in the same file.

## Further reading

{{< whatsnext desc="Customize your configuration for each Code Security product:">}}
    {{< nextlink href="/security/code_security/static_analysis/configuration/" >}}Static Code Analysis (SAST){{< /nextlink >}}
    {{< nextlink href="/security/code_security/software_composition_analysis/configuration/" >}}Software Composition Analysis (SCA){{< /nextlink >}}
{{< /whatsnext >}}
