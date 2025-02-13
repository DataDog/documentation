---
title: Set up Static Code Analysis (SAST)
description: Learn about Datadog Static Code Analysis to scan code for quality issues and security vulnerabilities before your code reaches production.
aliases:
- /continuous_integration/static_analysis
- /static_analysis
is_beta: false
algolia:
  tags: ['static analysis', 'static analysis rules', 'static application security testing', 'SAST']
---

{{% site-region region="gov" %}}
<div class="alert alert-danger">
    Code Security is not available for the {{< region-param key="dd_site_name" >}} site.
</div>
{{% /site-region %}}

## Overview
To set up Datadog SCA in-app, navigate to [**Security** > **Code Security**][1].

## Select where to run Static Code Analysis scans

### Scan with Datadog-hosted scanning

For GitHub repositories, you can run Datadog Static Code Analysis scans directly on Datadog's infrastructure. To get started, navigate to the [**Code Security** page][1].

### Scan in CI pipelines
Datadog Static Code Analysis runs in your CI pipelines using the [`datadog-ci` CLI][8].

First, configure your Datadog API and application keys. Add `DD_APP_KEY` and `DD_API_KEY` as secrets. Please ensure your Datadog application key has the `code_analysis_read` scope.

Next, run Static Code Analysis by following instructions for your chosen CI provider below.

{{< whatsnext desc="See instructions based on your CI provider:">}}
    {{< nextlink href="security/code_security/static_analysis/circleci_orbs" >}}CircleCI Orbs{{< /nextlink >}}
    {{< nextlink href="security/code_security/static_analysis/github_actions" >}}GitHub Actions{{< /nextlink >}}
    {{< nextlink href="security/code_security/static_analysis/generic_ci_providers" >}}Generic CI Providers{{< /nextlink >}}
{{< /whatsnext >}}

## Select your source code management provider
Datadog Static Code Analysis supports all source code management providers, with native support for GitHub.
### Set up the GitHub integration
If GitHub is your source code management provider, you must configure a GitHub App using the [GitHub integration tile][9] and set up the [source code integration][10] to see inline code snippets and enable [pull request comments][11].

When installing a GitHub App, the following permissions are required to enable certain features:

- `Content: Read`, which allows you to see code snippets displayed in Datadog
- `Pull Request: Read & Write`, which allows Datadog to add feedback for violations directly in your pull requests using [pull request comments][11], as well as open pull requests to [fix vulnerabilities][12]

### Other source code management providers
If you are using another source code management provider, configure Static Code Analysis to run in your CI pipelines using the `datadog-ci` CLI tool and [upload the results](#upload-third-party-static-analysis-results-to-datadog) to Datadog.
You **must** run an analysis of your repository on the default branch before results can begin appearing on the **Code Security** page.

## Customize your configuration
By default, Datadog Static Code Analysis scans your repositories with [Datadog's rulesets][6] for your programming language(s). To customize which rulesets you want to apply and where, add a `static-analysis.datadog.yml` file to your repository's **root directory**.

You can include the following **global** options in the `static-analysis.datadog.yml` file:

| Name               | Description                                                                                | Required | Default |
|--------------------|--------------------------------------------------------------------------------------------|----------|---------|
| `rulesets`         | A list of ruleset names and configurations. [View all available rulesets][6].              | `true`   |         |
| `ignore`           | A list of path prefixes and glob patterns to ignore. Matching files will not be analyzed.  | `false`  |         |
| `only`             | A list of path prefixes and glob patterns to analyze. Only matching files will be analyzed.| `false`  |         |
| `ignore-gitignore` | Do not use paths listed in the `.gitignore` file to skip analysis on certain files.        | `false`  | `false` |
| `max-file-size-kb` | Ignore files larger than the specified size (in kB units).                                    | `false`  | `200`   |

You can include the following **ruleset** options in the `static-analysis.datadog.yml` file:

| Name               | Description                                                                                                          | Required |
|--------------------|----------------------------------------------------------------------------------------------------------------------|----------|
| `rules`            | A list of rule configurations for rules belonging to ruleset.                                                        | `false`  |
| `ignore`           | A list of path prefixes and glob patterns to ignore for this specific ruleset. Matching files will not be analyzed.  | `false`  |
| `only`             | A list of path prefixes and glob patterns to analyze for this specific ruleset. Only matching files will be analyzed.| `false`  |

You can include the following **rule** options in the `static-analysis.datadog.yml` file:

| Name               | Description                                                                                                          | Required |
|--------------------|----------------------------------------------------------------------------------------------------------------------|----------|
| `ignore`           | A list of path prefixes and glob patterns to ignore for this specific rule. Matching files will not be analyzed.     | `false`  |
| `only`             | A list of path prefixes and glob patterns to analyze for this specific rule. Only matching files will be analyzed.   | `false`  |
| `arguments`        | A map of values for rules that support customizable arguments.                                                       | `false`  |

The map in the `arguments` field uses an argument's name as its key, and the values are either strings or maps:

* To set a value for the whole repository, you can specify it as a string.
* To set different values for different subtrees in the repository, you can specify them as a map from a subtree prefix to the value that the argument will have within that subtree.

The full structure of the `static-analysis.datadog.yml` file is as follows:

```yaml
rulesets:
  - ruleset-name
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

Example configuration file:

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
      max-class-lines:
        arguments:
          # Set different thresholds for the max-class-lines rule in different subtrees
          max-lines:
            # Set the rule's threshold to 200 lines by default (root path of the repo)
            /: 200
            # Set the rule's threshold to 100 lines in src/main/backend
            src/main/backend: 100
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

### Ignoring violations
#### Ignore for a repository
Add an ignore rule in your `static-analysis.datadog.yml` file. The example below ignores the rule `javascript-express/reduce-server-fingerprinting` for all directories.

```
rulesets:
  - javascript-express:
    rules:
      reduce-server-fingerprinting:
        ignore: "**"
```

#### Ignore for a file or directory
Add an ignore rule in your `static-analysis.datadog.yml` file. The example below ignores the rule `javascript-express/reduce-server-fingerprinting` for this file. For more information on how to ignore by path, see the [Customize your configuration section](#customize-your-configuration).

```
rulesets:
  - javascript-express:
    rules:
      reduce-server-fingerprinting:
        ignore: "ad-server/src/app.js"
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

## Link results to Datadog services and teams
### Link results to services
Datadog associates static code and library scan results with relevant services by using the following mechanisms:

1. [Identifying the code location associated with a service using the Service Catalog.](#identifying-the-code-location-in-the-service-catalog)
2. [Detecting usage patterns of files within additional Datadog products.](#detecting-file-usage-patterns)
3. [Searching for the service name in the file path or repository.](#detecting-service-name-in-paths-and-repository-names)

If one method succeeds, no further mapping attempts are made. Each mapping method is detailed below.

#### Identifying the code location in the Service Catalog

The [schema version `v3`][14] and later of the Service Catalog allows you to add the mapping of your code location for your service. The `codeLocations` section specifies the location of the repository containing the code and its associated paths.

The `paths` attribute is a list of globs that should match paths in the repository.

{{< code-block lang="yaml" filename="entity.datadog.yaml" collapsible="true" >}}
apiVersion: v3
kind: service
metadata:
  name: my-service
datadog:
  codeLocations:
    - repositoryURL: https://github.com/myorganization/myrepo.git
      paths:
        - path/to/service/code/**
{{< /code-block >}}


#### Detecting file usage patterns

Datadog detects file usage in additional products such as Error Tracking and associate
files with the runtime service. For example, if a service called `foo` has
a log entry or a stack trace containing a file with a path `/modules/foo/bar.py`,
it associates files `/modules/foo/bar.py` to service `foo`.

#### Detecting service name in paths and repository names

Datadog detects service names in paths and repository names, and associates the file with the service if a match is found.

For a repository match, if there is a service called `myservice` and
the repository URL is `https://github.com/myorganization/myservice.git`, then,
it associates `myservice` to all files in the repository.

If no repository match is found, Datadog attempts to find a match in the
`path` of the file. If there is a service named `myservice`, and the path is `/path/to/myservice/foo.py`, the file is associated with `myservice` because the service name is part of the path. If two services are present
in the path, the service name closest to the filename is selected.


### Link results to teams

Datadog automatically associates the team attached to a service when a violation or vulnerability is detected. For example, if the file `domains/ecommerce/apps/myservice/foo.py`
is associated with `myservice`, then the team `myservice` will be associated to any violation
detected in this file.

If no services or teams are found, Datadog uses the `CODEOWNERS` file in your repository. The `CODEOWNERS` file determines which team owns a file in your Git provider. 

**Note**: You must accurately map your Git provider teams to your [Datadog teams][10] for this feature to function properly.

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
[14]: https://docs.datadoghq.com/service_catalog/service_definitions/v3-0/