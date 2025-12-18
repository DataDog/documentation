---
title: Set up Static Code Analysis (SAST)
description: Learn about Datadog Static Code Analysis to scan code for quality issues and security vulnerabilities before your code reaches production.
aliases:
- /continuous_integration/static_analysis
- /static_analysis
- /security/code_security/static_analysis/circleci_orbs/
- /code_analysis/static_analysis/setup/
is_beta: false
algolia:
  tags: ['static analysis', 'static analysis rules', 'static application security testing', 'SAST']
---

{{% site-region region="gov" %}}
<div class="alert alert-warning">
    Code Security is not available for the {{< region-param key="dd_site_name" >}} site.
</div>
{{% /site-region %}}

## Overview
To set up Datadog SAST in-app, navigate to [**Security** > **Code Security**][1].

## Select where to run Static Code Analysis scans
### Scan with Datadog-hosted scanning

You can run Datadog Static Code Analysis (SAST) scans directly on Datadog infrastructure. Supported repository types include:
- [GitHub][18] (excluding repositories that use [Git Large File Storage][17])
- [GitLab.com and GitLab Self-Managed][20]
- [Azure DevOps][19]

To get started, navigate to the [**Code Security** page][1].

### Scan in CI pipelines
Datadog Static Code Analysis runs in your CI pipelines using the [`datadog-ci` CLI][8].

First, configure your Datadog API and application keys. Add `DD_APP_KEY` and `DD_API_KEY` as secrets. Please ensure your Datadog application key has the `code_analysis_read` scope.

Next, run Static Code Analysis by following instructions for your chosen CI provider below.

{{< whatsnext desc="See instructions based on your CI provider:">}}
    {{< nextlink href="security/code_security/static_analysis/github_actions" >}}GitHub Actions{{< /nextlink >}}
    {{< nextlink href="security/code_security/static_analysis/generic_ci_providers" >}}Generic CI Providers{{< /nextlink >}}
{{< /whatsnext >}}

## Select your source code management provider
Datadog Static Code Analysis supports all source code management providers, with native support for GitHub, GitLab, and Azure DevOps.

{{< tabs >}}
{{% tab "GitHub" %}}

Configure a GitHub App with the [GitHub integration tile][1] and set up the [source code integration][2] to enable inline code snippets and [pull request comments][3].

When installing a GitHub App, the following permissions are required to enable certain features:

- `Content: Read`, which allows you to see code snippets displayed in Datadog
- `Pull Request: Read & Write`, which allows Datadog to add feedback for violations directly in your pull requests using [pull request comments][3], as well as open pull requests to [fix vulnerabilities][4]
- `Checks: Read & Write`, which allows you to create checks on SAST violations to block pull requests

[1]: /integrations/github/#link-a-repository-in-your-organization-or-personal-account
[2]: /integrations/guide/source-code-integration
[3]: /security/code_security/dev_tool_int/github_pull_requests
[4]: /security/code_security/dev_tool_int/

{{% /tab %}}
{{% tab "GitLab" %}}

See the [GitLab source code setup instructions][1] to connect GitLab repositories to Datadog. Both GitLab.com and Self-Managed instances are supported.

[1]: /integrations/gitlab-source-code/#setup 

{{% /tab %}}
{{% tab "Azure DevOps" %}}

**Note:** Your Azure DevOps integrations must be connected to a Microsoft Entra tenant. Azure DevOps Server is **not** supported.

See the [Azure source code setup instructions][4] to connect Azure DevOps repositories to Datadog.

[1]: https://app.datadoghq.com/security/configuration/code-security/setup
[2]: https://portal.azure.com/#view/Microsoft_AAD_RegisteredApps/ApplicationsListBlade
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: /integrations/azure-devops-source-code/#setup
[5]: /getting_started/site/

{{% /tab %}}
{{% tab "Other" %}}

If you are using another source code management provider, configure Static Code Analysis to run in your CI pipelines using the `datadog-ci` CLI tool and [upload the results](#upload-third-party-static-analysis-results-to-datadog) to Datadog.
You **must** run an analysis of your repository on the default branch before results can begin appearing on the **Code Security** page.

{{% /tab %}}
{{< /tabs >}}

## Customize your configuration

By default, Datadog Static Code Analysis (SAST) scans your repositories with [Datadog's default rulesets][6] for your programming language(s). You can customize which rulesets or rules to run or ignore, in addition to other parameters. You can customize these settings locally in your repository or within the Datadog App.

### Configuration locations

Datadog Static Code Analysis (SAST) can be configured within Datadog and/or by using a file within your repository's **root directory**.

There are three levels of configuration:

* Org-level configuration (Datadog)
* Repository-level configuration (Datadog)
* Repository-level configuration (Repo File)

<div class="alert alert-danger">
By default, when no configuration is defined at the org or repo level, Datadog uses a default configuration with all default rules enabled. If you define an org-level configuration without default rules, default rules are not used. If want to use default rules in this scenario, you must enable them.
</div>

All three locations use the same YAML format for configuration. These configurations are merged **in order** using an overlay/patch merge method.

#### Default rulesets (baseline configuration)

All three configuration methods described below customize the **same default rulesets**.  
Use the configuration file below as your baseline when configuring rules at the Org level, Repo level, or through a Repo file.

You can paste and edit the YAML content below directly into:

- **Org-level configuration (Datadog)**  
- **Repository-level configuration (Datadog)**  

or create the file:

- **`static-analysis.datadog.yaml`** in the root of your repository (required only for the *Repository-level configuration file* option).

To customize rulesets, **remove any rulesets you do not want to apply**:

```yaml
schema-version: v1
rulesets:
  - apex-code-style
  - apex-security
  - csharp-best-practices
  - csharp-code-style
  - csharp-security
  - csharp-inclusive
  - docker-best-practices
  - github-actions
  - go-best-practices
  - go-inclusive
  - go-security
  - java-best-practices
  - java-code-style
  - java-security
  - javascript-best-practices
  - javascript-browser-security
  - javascript-code-style
  - javascript-inclusive
  - javascript-common-security
  - javascript-express
  - javascript-node-security
  - jsx-react
  - kotlin-security
  - kotlin-inclusive
  - kotlin-code-style
  - kotlin-best-practices
  - php-best-practices
  - php-security
  - python-best-practices
  - python-code-style
  - python-django
  - python-flask
  - python-inclusive
  - python-pandas
  - python-security
  - ruby-code-style
  - ruby-security
  - ruby-best-practices
  - rails-best-practices
  - swift-code-style
  - swift-security
  - swift-inclusive
  - tsx-react
  - typescript-best-practices
  - typescript-browser-security
  - typescript-code-style
  - typescript-common-security
  - typescript-express
  - typescript-inclusive
  - typescript-node-security
````

#### How org-level, repo-level, and file-level settings interact

All configuration levels use the same YAML format. These configurations are merged in order using an **overlay/patch merge method**.

For example, consider the following two YAML files:

**File 1:**

```yaml
rulesets:
 - A
   rules:
      foo:
        ignore: ["**"]
        args: ["my_arg1", "my_arg2"]
```

**File 2:**

```yaml
rulesets:
 - A
    rules:
        foo:
            ignore: ["my_ignored_file.file"]
        bar:
            only: ["the_only_file.file"]
 - B

```

If these YAML files were merged in order (first File 1, then File 2), the result would be:

```yaml
rulesets:
 - A
    rules:
        foo:
            ignore: ["my_ignored_file.file"]
            args: ["my_arg1", "my_arg2"]
        bar:
            only: ["the_only_file.file"]
 - B


```

As you can see, the `ignore: ["**"]` from File 1 was **overlayed** by the `ignore: ["my_ignored_file.file"]` value from File 2 due to merge order. This happened because there was a conflict and the second file's value took precedence due to merge order. The `args` field from File 1 is retained because the second file does not override it.

#### Org level configuration

{{< img src="/security/code_security/org-wide-configuration2.png" alt="Rule created" style="width:100%;" >}}

Configurations at the org level apply to all repositories that are being analyzed and is a good place to define rules that must run or global paths/files to be ignored.

#### Repository level configuration

{{< img src="/security/code_security/org-wide-configuration2.png" alt="Rule created" style="width:100%;" >}}

Configurations at the repository level apply only to the repository selected. These configurations are merged with the org configuration, with the repository configuration taking precedence. Repository level configurations are a good place to define overrides for repository specific details, or add rules that are specific to only that repo for example.

#### Repository level configuration (file)

In addition to the configurations provided for the Org and Repository level, you can also define a configuration at the root of your repo in the form of ``static-analysis.datadog.yml``. This file takes precedence over the Repository level configuration defined in Datadog. Repository level file configurations are a useful method to change rule configs and iterate on setup and testing.

### Configuration format

The following configuration format applies to all configuration locations: Org level, Repository level, and Repository level (file).

The full structure of a configuration is as follows:

```yaml
rulesets:
  - ruleset-name # A ruleset we want to run with default configurations
  - ruleset-name:
    # Only apply this ruleset to the following paths/files
    only:
      - "path/example"
      - "**/*.file"
    # Do not apply this ruleset in the following paths/files
    ignore:
      - "path/example"
      - "**/*.file"
  - ruleset-name:
    rules:
      rule-name:
        # Only apply this rule to the following paths/files
        only:
          - "path/example"
          - "**/*.file"
        # Do not apply this rule to the following paths/files
        ignore:
          - "path/example"
          - "**/*.file"
        arguments:
          # Set the rule's argument to value.
          argument-name: value
      rule-name:
        arguments:
          # Set different argument values in different subtrees
          argument-name:
            # Set the rule's argument to value_1 by default (root path of the repo)
            /: value_1
            # Set the rule's argument to value_2 for specific paths
            path/example: value_2
# Only analyze any ruleset in the following paths/files
only:
  - "path/example"
  - "**/*.file"
# Do not analyze any ruleset in the following paths/files
ignore:
  - "path/example"
  - "**/*.file"
```




The YAML configuration file supports the following top-level keys:

| **Property** | **Type** | **Description**                                                                                                              | **Default** |
| ------------------ | -------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| `rulesets`       | Array          | A list of rulesets to analyze. Each element can be either a ruleset name (string) or an object with detailed configuration. | *Required*      |
| `only`           | Array          | A list of file paths or glob patterns. If provided, only matching files are analyzed across all rulesets.                      | None              |
| `ignore`         | Array          | A list of file paths or glob patterns to exclude from analysis across all rulesets.                                                | None              |

*Note:* The `only` and `ignore` keys here act as file filters that apply to the entire configuration file.

---

## Ruleset configuration

Each entry in the `rulesets` array can be defined in one of two ways:

1. **Simple Ruleset Declaration:** A plain string (for example, `ruleset-name`) indicates that the ruleset should run with its default settings.
2. **Detailed Ruleset Object:** An object where the key is the ruleset name and the value is an object containing additional configuration. The available properties for a detailed ruleset are:

| **Property** | **Type** | **Description**                                                                               | **Default** |
| ------------------ | -------------- | --------------------------------------------------------------------------------------------------- | ----------------- |
| `only`           | Array          | File paths or glob patterns. Only files matching these patterns will be processed for this ruleset. | None              |
| `ignore`         | Array          | File paths or glob patterns to exclude from analysis for this ruleset.                              | None              |
| `rules`          | Object         | A mapping of individual rule names to their configuration objects.                                  | None              |

---

## Rule configuration

Within a ruleset's `rules` property, each rule is defined by its name and configuration. The properties available for each rule are:

| **Property** | **Type** | **Description**                                                                              | **Default** |
| ------------------ | -------------- | -------------------------------------------------------------------------------------------------- | ----------------- |
| `only`           | Array          | File paths or glob patterns. The rule will only be applied to files matching these patterns.       | None              |
| `ignore`         | Array          | File paths or glob patterns to exclude from the rule's application.                               | None              |
| `arguments`      | Object         | Parameters and values for the rule. Values can be scalars or specified on a per-path basis. | None              |

---

## Argument configuration

Rule arguments can be defined in one of two formats:

1. **Static Value:** Directly assign a value to an argument.

   ```yaml
   arguments:
     argument-name: value
   ```
2. **Path-Specific Mapping:**
   Define different values based on file paths. Use the special key `/` to denote the default value (applicable at the repository root).

   ```yaml
   arguments:
     argument-name:
       /: value_default
       path/example: value_specific
   ```

| **Key**     | **Type** | **Description**                                                     | **Default** |
| ----------------- | -------------- | ------------------------------------------------------------------------- | ----------------- |
| `/`             | Any            | The default argument value when no specific path is matched.              | None              |
| `specific path` | Any            | The argument value for files matching the specified path or glob pattern. | None              |

---



Example configuration:

```yaml
rulesets:
  - python-best-practices
  - python-security
  - python-code-style:
    rules:
      max-function-lines:
        # Do not apply the rule max-function-lines to the following files
        ignore:
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
          # Set the rule's severity to INFO by default
          /: INFO
          # Set the rule's severity to NONE in tests/
          tests: NONE
  - python-inclusive
  - python-django:
    # Only apply the python-django ruleset to the following paths
    only:
      - "src/main/backend"
      - "src/main/django"
    # Do not apply the python-django ruleset in files matching the following pattern
    ignore:
      - "src/main/backend/util/*.py"
# Only analyze source files
only:
  - "src/main"
  - "src/tests"
  - "**/*.py"
# Do not analyze third-party or generated files
ignore:
  - "lib/third_party"
  - "**/*.generated.py"
  - "**/*.pb.py"
```


| Name                 | Description                                                                                 | Required  | Default   |
| -------------------- | ------------------------------------------------------------------------------------------- | --------- | --------- |
| `rulesets`         | A list of ruleset names and configurations.[View all available rulesets][6].                | `true`  |           |
| `ignore`           | A list of path prefixes and glob patterns to ignore. Matching files will not be analyzed.   | `false` |           |
| `only`             | A list of path prefixes and glob patterns to analyze. Only matching files will be analyzed. | `false` |           |
| `ignore-gitignore` | Do not use paths listed in the `.gitignore` file to skip analysis on certain files.       | `false` | `false` |
| `max-file-size-kb` | Ignore files larger than the specified size (in kB units).                                  | `false` | `200`   |

You can include the following **ruleset** options in the `static-analysis.datadog.yml` file:

| Name       | Description                                                                                                           | Required  |
| ---------- | --------------------------------------------------------------------------------------------------------------------- | --------- |
| `rules`  | A list of rule configurations for rules belonging to ruleset.                                                         | `false` |
| `ignore` | A list of path prefixes and glob patterns to ignore for this specific ruleset. Matching files will not be analyzed.   | `false` |
| `only`   | A list of path prefixes and glob patterns to analyze for this specific ruleset. Only matching files will be analyzed. | `false` |

You can include the following **rule** options in the `static-analysis.datadog.yml` file:

| Name          | Description                                                                                                        | Required  |
| ------------- | ------------------------------------------------------------------------------------------------------------------ | --------- |
| `ignore`    | A list of path prefixes and glob patterns to ignore for this specific rule. Matching files will not be analyzed.   | `false` |
| `only`      | A list of path prefixes and glob patterns to analyze for this specific rule. Only matching files will be analyzed. | `false` |
| `arguments` | A map of values for rules that support customizable arguments. See the syntax below.                               | `false` |
| `severity`  | Override the rule's severity. See the syntax below.                                                                | `false` |
| `category`  | Override the rule's category. See the syntax below.                                                                | `false` |

The map in the `arguments` field uses an argument's name as its key, and the values are either strings or maps:

* To set a value for the whole repository, you can specify it as a string.
* To set different values for different subtrees in the repository, you can specify them as a map from a subtree prefix to the value that the argument will have within that subtree.

The `severity` field can take a string or a map:

* To set the severity for the whole repository, specify it as one of the following strings: `ERROR`, `WARNING`, `NOTICE`, or `NONE`.
* To set different severities for different subtrees in the repository, you can specify them as a map from a subtree prefix to the severity for that subtree.

The `category` field can take a string with one of the following values: `BEST_PRACTICES`, `CODE_STYLE`, `ERROR_PRONE`, `PERFORMANCE`, or `SECURITY`. You can only specify one category for the whole repository.

### Ignoring violations

#### Ignore for a repository
Add an ignore rule in your `static-analysis.datadog.yml` file. The example below ignores the rule `javascript-express/reduce-server-fingerprinting` for all directories.

```
rulesets:
  - javascript-express:
    rules:
      reduce-server-fingerprinting:
        ignore:
          - "**"
```

#### Ignore for a file or directory
Add an ignore rule in your `static-analysis.datadog.yml` file. The example below ignores the rule `javascript-express/reduce-server-fingerprinting` for this file. For more information on how to ignore by path, see the [Customize your configuration section](#customize-your-configuration).

```
rulesets:
  - javascript-express:
    rules:
      reduce-server-fingerprinting:
        ignore:
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

For example, in the following JavaScript code snippet, the line `my_foo = 1` is analyzed by all rules except for the `javascript-code-style/assignment-name` rule, which tells the developer to use [camelCase][6] instead of [snake_case][7].

```javascript
// no-dd-sa:javascript-code-style/assignment-name
my_foo = 1
myBar = 2
```

## Link findings to Datadog services and teams

Datadog associates code and library scan results with Datadog services and teams so that findings automatically route to the appropriate owners. This enables service-level visibility, ownership-based workflows, and faster remediation.

To determine which service a vulnerability belongs to, Datadog evaluates several mapping mechanisms in the order listed below. **Each vulnerability is mapped with one method only:** if a mapping mechanism succeeds for a particular finding, Datadog does not attempt the remaining mechanisms for that finding.

<div class="alert alert-danger">
Using service definitions that include code locations in the Software Catalog is the only way to explicitly control how static findings are mapped to services. The additional mechanisms described below—such as Error Tracking usage patterns and naming-based inference—are not user-configurable and depend on existing data from other Datadog products. Because of this, these mechanisms may not provide consistent mappings for organizations not using these products.
</div>

### Mapping using the Software Catalog (recommended)

Services in the Software Catalog can declare the parts of the codebase that belong to them using the `codeLocations` field. This field is available in the **Software Catalog [schema version `v3`][14]** and allows a service to specify:

* a repository URL

{{< code-block lang="yaml" filename="entity.datadog.yaml" collapsible="true" >}}
apiVersion: v3
kind: service
metadata:
  name: billing-service
  owner: billing-team
datadog:
  codeLocations:
    - repositoryURL: https://github.com/org/myrepo.git
{{< /code-block >}}

* one or more code paths inside that repository

{{< code-block lang="yaml" filename="entity.datadog.yaml" collapsible="true" >}}
apiVersion: v3
kind: service
metadata:
  name: billing-service
  owner: billing-team
datadog:
  codeLocations:
    - repositoryURL: https://github.com/org/myrepo.git
      paths:
        - path/to/service/code/**
{{< /code-block >}}

If you want all the files in a repository to be associated with a service, you can use the glob `**` as follows:

{{< code-block lang="yaml" filename="entity.datadog.yaml" collapsible="true" >}}
apiVersion: v3
kind: service
metadata:
  name: billing-service
  owner: billing-team
datadog:
  codeLocations:
    - repositoryURL: https://github.com/org/myrepo.git
      paths:
        - path/to/service/code/**
    - repositoryURL: https://github.com/org/billing-service.git
      paths:
        - "**"
{{< /code-block >}}

The schema for this field is described in the [Software Catalog entity model][21].

Datadog will go through all your Software Catalog definitions and check whether your finding’s file path matches. For a finding to be mapped to a service through `codeLocations`, it must contain a file path. Some findings may not contain a file path; in those cases, Datadog cannot evaluate `codeLocations` for that finding, and this mechanism is skipped.

<div class="alert alert-danger">
Services defined with a **Software Catalog schema v2.x** do **not** support `codeLocations`. Existing definitions can be upgraded to the v3 schema in the [Software Catalog][22]. Once the migration is complete, changes may take up to 24 hours to apply to findings. If you are unable to upgrade to v3, Datadog will fall back to alternative linking techniques (described below). These rely on less precise heuristics, so accuracy may vary depending on the Code Security product and your use of other Datadog features.
</div>

#### Example (v3 schema)

{{< code-block lang="yaml" filename="entity.datadog.yaml" collapsible="true" >}}
apiVersion: v3
kind: service
metadata:
  name: billing-service
  owner: billing-team
datadog:
  codeLocations:
    - repositoryURL: https://github.com/org/myrepo.git
      paths:
        - path/to/service/code/**
    - repositoryURL: https://github.com/org/billing-service.git
      paths:
        - "**"
{{< /code-block >}}

#### SAST finding

If a vulnerability appeared in `github.com/org/myrepo` at `/src/billing/models/payment.py`, then using the `codeLocations` for `billing-service` Datadog would add `billing-service` as an owning service. If your service defines an `owner` (see above), then Datadog will link that team to the finding too. In this case, the finding would be linked to the `billing-team`.

#### SCA finding

If a library was declared in `github.com/org/myrepo` at `/go.mod`, then Datadog would not match it to `billing-service`. 

If it was instead declared in `github.com/org/billing-service` at `/go.mod`, then Datadog would match it to `billing-service` due to the `“**”` catch-all glob. Consequently, Datadog would link the finding to the `billing-team`.

**Datadog will attempt to map a single finding to as many services as possible. If no matches are found, Datadog will continue onto our next linking method.**

### When the Software Catalog cannot determine the service

If the Software Catalog does not provide a match—either because the finding’s file path does not match any `codeLocations`, or because the service uses the v2.x schema—Datadog evaluates whether **Error Tracking** can identify the service associated with the code. Datadog uses only the last 30 days of Error Tracking data due to product [data-retention limits][23].

When Error Tracking processes stack traces, those traces often include **file paths**.
For example, if an error occurs in: `/foo/bar/baz.py`
Datadog inspects the directory: `/foo/bar`

Datadog then checks whether the finding’s **file path** resides under that directory.

**If the finding file is under the same directory:**

  - Datadog treats this as a strong indication that the vulnerability belongs to the same service
  - The finding inherits the **service** and **team** associated with that error in Error Tracking

**If this mapping succeeds, Datadog stops here.**

### Service inference from file paths or repository names

When neither of the above strategies cannot determine the service, Datadog inspects naming patterns in the repository and file paths.

Datadog evaluates:

  - whether the **file path** contains identifiers matching a known service
  - whether the **repository name** corresponds to a service name

When using the finding’s file path, Datadog performs a reverse search on each path segment until it finds a matching service or exhausts all options. For example, if a finding occurs in `github.com/org/checkout-service` at `/foo/bar/baz/main.go`, Datadog will take the last path segment, `main`, to see if any Software Catalog service uses that name. If a match exists, the finding is attributed to that service. If not, the process continues with `baz`, then `bar`, and so forth.

If we have exhausted all options, Datadog will check whether the repository name, `checkout-service`, matches a Software Catalog service name. If no match was found, Datadog was unsuccessful at linking your finding using Software Catalog.

This mechanism ensures that findings still receive meaningful service attribution when no explicit metadata exists.

### Link findings to teams through Code Owners

If Datadog was able to link your finding to a service using the above strategies, then the team that owns that service (if defined) would automatically be associated with that finding. Whether Datadog was able to successfully link a finding to a service (and a Datadog team) or not, Datadog will use the `CODEOWNERS` information from your finding’s repository to link Datadog and GitHub teams to your findings.

**Note**: You must accurately map your Git provider teams to your [Datadog Teams][24] for team attribution to function properly.

## Diff-aware scanning

Diff-aware scanning enables Datadog's static analyzer to only scan the files modified by a commit in a feature branch. It accelerates scan time significantly by not having the analysis run on every file in the repository for every scan. To enable diff-aware scanning in your CI pipeline, follow these steps:

1. Make sure your `DD_APP_KEY`, `DD_SITE` and `DD_API_KEY` variables are set in your CI pipeline.
2. Add a call to `datadog-ci git-metadata upload` before invoking the static analyzer. This command ensures that Git metadata is available to the Datadog backend. Git metadata is required to calculate the number of files to analyze.
3. Ensure that the datadog-static-analyzer is invoked with the flag `--diff-aware`.

Example of commands sequence (these commands must be invoked in your Git repository):
```bash
datadog-ci git-metadata upload

datadog-static-analyzer -i /path/to/directory -g -o sarif.json -f sarif –-diff-aware <...other-options...>
```

**Note:** When a diff-aware scan cannot be completed, the entire directory is scanned.

## Upload third-party static analysis results to Datadog

<div class="alert alert-info">
  SARIF importing has been tested for Snyk, CodeQL, Semgrep, Checkov, Gitleaks, and Sysdig. Reach out to <a href="/help">Datadog Support</a> if you experience any issues with other SARIF-compliant tools.
</div>

You can send results from third-party static analysis tools to Datadog, provided they are in the interoperable [Static Analysis Results Interchange Format (SARIF) Format][2]. Node.js version 14 or later is required.

To upload a SARIF report:

1. Ensure the [`DD_API_KEY` and `DD_APP_KEY` variables are defined][4].
2. Optionally, set a [`DD_SITE` variable][7] (this defaults to `datadoghq.com`).
3. Install the `datadog-ci` utility:

   ```bash
   npm install -g @datadog/datadog-ci
   ```

4. Run the third-party static analysis tool on your code and output the results in the SARIF format.
5. Upload the results to Datadog:

   ```bash
   datadog-ci sarif upload $OUTPUT_LOCATION
   ```

## SARIF Support Guidelines

Datadog supports ingestion of third-party SARIF files that are compliant with [the 2.1.0 SARIF schema][15]. The SARIF
schema is used differently by static analyzer tools. If you want to send third-party SARIF files to Datadog, please
ensure they comply with the following details:

 - The violation location is specified through the `physicalLocation` object of a result.
    - The `artifactLocation` and it's `uri` **must be relative** to the repository root.
    - The `region` object is the part of the code highlighted in the Datadog UI.
 - The `partialFingerprints` is used to uniquely identify a finding across a repository.
 - `properties` and `tags` adds more information:
    - The tag `DATADOG_CATEGORY` specifies the category of the finding. Acceptable values are `SECURITY`, `PERFORMANCE`, `CODE_STYLE`, `BEST_PRACTICES`, `ERROR_PRONE`.
    - The violations annotated with the category `SECURITY` are surfaced in the Vulnerabilities explorer and the Security tab of the repository view.
 - The `tool` section must have a valid `driver` section with a `name` and `version` attributes.

For example, here's an example of a SARIF file processed by Datadog:


```json

{
    "runs": [
        {
            "results": [
                {
                    "level": "error",
                    "locations": [
                        {
                            "physicalLocation": {
                                "artifactLocation": {
                                    "uri": "missing_timeout.py"
                                },
                                "region": {
                                    "endColumn": 76,
                                    "endLine": 6,
                                    "startColumn": 25,
                                    "startLine": 6
                                }
                            }
                        }
                    ],
                    "message": {
                        "text": "timeout not defined"
                    },
                    "partialFingerprints": {
                        "DATADOG_FINGERPRINT": "b45eb11285f5e2ae08598cb8e5903c0ad2b3d68eaa864f3a6f17eb4a3b4a25da"
                    },
                    "properties": {
                        "tags": [
                            "DATADOG_CATEGORY:SECURITY",
                            "CWE:1088"
                        ]
                    },
                    "ruleId": "python-security/requests-timeout",
                    "ruleIndex": 0
                }
            ],
            "tool": {
                "driver": {
                    "informationUri": "https://www.datadoghq.com",
                    "name": "<tool-name>",
                    "rules": [
                        {
                            "fullDescription": {
                                "text": "Access to remote resources should always use a timeout and appropriately handle the timeout and recovery. When using `requests.get`, `requests.put`, `requests.patch`, etc. - we should always use a `timeout` as an argument.\n\n#### Learn More\n\n - [CWE-1088 - Synchronous Access of Remote Resource without Timeout](https://cwe.mitre.org/data/definitions/1088.html)\n - [Python Best Practices: always use a timeout with the requests library](https://www.codiga.io/blog/python-requests-timeout/)"
                            },
                            "helpUri": "https://link/to/documentation",
                            "id": "python-security/requests-timeout",
                            "properties": {
                                "tags": [
                                    "CWE:1088"
                                ]
                            },
                            "shortDescription": {
                                "text": "no timeout was given on call to external resource"
                            }
                        }
                    ],
                    "version": "<tool-version>"
                }
            }
        }
    ],
    "version": "2.1.0"
}
```

## SARIF to CVSS severity mapping

The [SARIF format][15] defines four severities: none, note, warning, and error.
However, Datadog reports violations and vulnerabilities severity using the [Common Vulnerability Scoring System][16] (CVSS),
which defined five severities: critical, high, medium, low and none.

When ingesting SARIF files, Datadog maps SARIF severities into CVSS severities using the mapping rules below.


| SARIF severity | CVSS severity |
|----------------|---------------|
| Error          | Critical      |
| Warning        | High          |
| Note           | Medium        |
| None           | Low           |

## Data Retention

Datadog stores findings in accordance with our [Data Rentention Periods](https://docs.datadoghq.com/data_security/data_retention_periods/). Datadog does not store or retain customer source code.

<!-- ## Further Reading

{{< partial name="whats-next/whats-next.html" >}} -->

[1]: https://app.datadoghq.com/security/configuration/code-security/setup
[2]: https://www.oasis-open.org/committees/tc_home.php?wg_abbrev=sarif
[3]: /developers/ide_plugins/idea/#static-analysis
[4]: /account_management/api-app-keys/
[6]: /security/code_security/static_analysis/static_analysis_rules
[7]: /getting_started/site/
[8]: https://github.com/DataDog/datadog-ci
[9]: /integrations/github/#link-a-repository-in-your-organization-or-personal-account
[10]: /integrations/guide/source-code-integration
[11]: /security/code_security/dev_tool_int/github_pull_requests
[12]: /security/code_security/dev_tool_int/github_pull_requests#fixing-a-vulnerability-directly-from-datadog
[13]: https://docs.github.com/en/actions/security-for-github-actions/security-guides
[14]: https://docs.datadoghq.com/software_catalog/service_definitions/v3-0/
[15]: https://docs.oasis-open.org/sarif/sarif/v2.1.0/sarif-v2.1.0.html
[16]: https://www.first.org/cvss/
[17]: https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-git-large-file-storage
[18]: /security/code_security/static_analysis/setup/?tab=github#select-your-source-code-management-provider
[19]: /security/code_security/static_analysis/setup/?tab=azuredevops#select-your-source-code-management-provider
[20]: /security/code_security/static_analysis/setup/?tab=gitlab#select-your-source-code-management-provider
[21]: https://docs.datadoghq.com/internal_developer_portal/software_catalog/entity_model/?tab=v30#codelocations
[22]: https://docs.datadoghq.com/internal_developer_portal/software_catalog/entity_model/?tab=v30#migrating-to-v30
[23]: https://docs.datadoghq.com/data_security/data_retention_periods/
[24]: https://docs.datadoghq.com/account_management/teams/
