---
title: Code Security Configuration Reference
description: Reference for Datadog Code Security configuration, including the schema, configuration locations, and precedence.
disable_toc: false
further_reading:
- link: /security/code_security/static_analysis/configuration/
  tag: Documentation
  text: Static Code Analysis (SAST) Configuration
- link: /security/code_security/software_composition_analysis/configuration/
  tag: Documentation
  text: Software Composition Analysis (SCA) Configuration
---

Datadog Code Security can be configured in Datadog, in a file at the root of your repository, or in both locations.

## Configuration schema

The configuration file must begin with `schema-version: v1.0` or `schema-version: v1.1`, followed by top-level keys for each product you want to configure. Use `v1.1` to enable SCA support.

```yaml
schema-version: v1.1
sast:
  # Static Code Analysis (SAST) configuration
sca:
  # Software Composition Analysis (SCA) configuration
```

Both the `sast` and `sca` sections are optional. Any configuration location, including the org level, repository level, or repository file, can include one or both sections. For the full schema for each section, see [Static Code Analysis (SAST) Configuration][1] and [Software Composition Analysis (SCA) Configuration][2].

## Where to define configurations

There are three levels of configuration:

* Org-level configuration (Datadog)
* Repository-level configuration (Datadog)
* Repository-level configuration (repo file)

All three locations use the same YAML schema and are merged in order (see [How configurations merge](#how-configurations-merge)).

### Org-level configuration

{{< img src="/security/code_security/org-level-configuration.png" alt="The Datadog Code Security org-level configuration editor." style="width:100%;" >}}

Org-level configurations apply to all repositories in your org. Use org-level configurations to define org-wide rules and specify global paths or files to ignore.

### Repository-level configuration

{{< img src="/security/code_security/repo-level-configuration.png" alt="The Datadog Code Security repository-level configuration editor." style="width:100%;" >}}

Repository-level configurations apply only to the selected repository and take precedence over org-level configurations. They are merged with the org configuration, with repository settings overriding org defaults. Use repository-level configurations to define repository-specific overrides or add rules that apply only to that repository.

### Repository-level configuration (file)

The `code-security.datadog.yaml` file stores configuration at the root of a repository. It takes precedence over org-level and repository-level configurations defined in Datadog. Use this file to customize rule configurations and iterate on setup and testing.

## How configurations merge

Configurations are merged in the following order, from lowest to highest precedence:

1. **Org-level**
1. **Repo-level**
1. **Repo-level file** (`code-security.datadog.yaml`)

For each field in a configuration, merge behavior depends on the field type:

| Field type | Merge behavior | Example fields |
|---|---|---|
| Lists | Concatenated, with duplicates removed | `use-rulesets`, `ignore-rulesets`, `ignore-paths`, `only-paths` |
| Scalar values (strings, numbers, booleans) | The value from the highest-precedence configuration is used | `use-default-rulesets`, `use-gitignore`, `max-file-size-kb`, `category` |
| Maps | Recursively merged | `ruleset-configs`, `rule-configs`, `arguments` |

For the full list of fields, see [Static Code Analysis (SAST) Configuration][1] and [Software Composition Analysis (SCA) Configuration][2].

The following example shows how configurations are merged:

#### Org-level

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

#### Repo-level

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

#### Merged result

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

The example demonstrates each merge rule from the table above:

- **Lists concatenate**: `use-rulesets` merges to `[A, B]`; the SCA `ignore-paths` merges to `["vendor/", "third_party/"]`.
- **Scalars use the highest-precedence value**: `maxCount: 22` (repo-level) overrides `maxCount: 10` (org-level).
- **Maps merge recursively**: The `foo` rule config keeps `ignore-paths` from the org level while applying `maxCount: 22` from the repo level. New entries like `bar` are added from the repo level.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/code_security/static_analysis/configuration/
[2]: /security/code_security/software_composition_analysis/configuration/
