---
title: Set Up Code Coverage
description: "Configure Code Coverage by integrating with GitHub or GitLab, setting permissions, creating PR Gates, and uploading coverage reports."
further_reading:
  - link: "/code_coverage"
    tag: "Documentation"
    text: "Code Coverage"
  - link: "/code_coverage/configuration"
    tag: "Documentation"
    text: "Configure Code Coverage"
  - link: "/code_coverage/data_collected"
    tag: "Documentation"
    text: "Learn what data is collected for Code Coverage"
  - link: "/code_coverage/monorepo_support"
    tag: "Documentation"
    text: "Learn how Code Coverage supports large monorepos"
---

{{< callout url="http://datadoghq.com/product-preview/code-coverage/" >}}
Code Coverage is in Preview. This product replaces Test Optimization's <a href="https://docs.datadoghq.com/tests/code_coverage">code coverage</a> feature, which is being deprecated. Complete the form to request access for the new Code Coverage product.
{{< /callout >}}

Setting up Code Coverage involves the following steps:

1. Configure the integration with your [source code provider](#integrate-with-source-code-provider) in the Datadog UI.
2. Configure code coverage [data access permissions](#data-access-permissions) in Datadog.
3. Optionally, configure a [PR Gate](#pr-gates) to block pull requests based on coverage thresholds.
4. Update your CI pipeline to [upload code coverage reports](#upload-code-coverage-reports) to Datadog.

## Integrate with source code provider

Code Coverage supports the following:

{{< tabs >}}
{{% tab "GitHub" %}}

Follow instructions in the [GitHub integration documentation][1] on how to connect your GitHub repositories to Datadog.

Code Coverage requires the following GitHub App permissions:
| Permission | Access Level | Purpose |
|---|---|---|
| Contents | Read | Show source code in the detailed coverage UI. |
| Pull Requests | Write | Show PR data in coverage UI and write PR comments. |
| Checks | Write | Create coverage PR Gates. |

The following webhooks are required:
| Webhook | Purpose |
|---|---|
| Pull request | Receive PR data updates. |
| Pull request review | Receive PR data updates. |
| Pull request review comment | Receive PR data updates. |
| Push | Receive Git commit metadata. |

If everything is configured correctly, a green check mark is displayed in Datadog's [GitHub Integration][2] page:
{{< img src="/code_coverage/github_app_success.png" alt="GitHub App integration success check" style="width:100%" >}}

<div class="alert alert-info">If you have a Datadog-managed Marketplace App or a custom app with default settings, the required permissions and webhooks are included.</div>

[1]: /integrations/github/#github-apps-1
[2]: https://app.datadoghq.com/integrations/github/configuration
{{% /tab %}}
{{% tab "Gitlab" %}}

Follow instructions in the [Gitlab Source Code integration documentation][1] on how to connect your Gitlab repositories to Datadog.

See [Datadog Source Code Integration Guide][2] for additional context.

[1]: /integrations/gitlab-source-code/
[2]: /integrations/guide/source-code-integration/?tab=gitlabsaasonprem#connect-your-git-repositories-to-datadog
[2]: https://app.datadoghq.com/integrations/gitlab-source-code

{{% /tab %}}
{{% tab "Azure DevOps" %}}

Follow instructions in the [Datadog Source Code Integration Guide][1] on how to connect your Azure DevOps repositories to Datadog
using [Azure DevOps Source Code integration][2].

[1]: /integrations/guide/source-code-integration/?tab=azuredevopssaasonly#connect-your-git-repositories-to-datadog
[2]: https://app.datadoghq.com/integrations/azure-devops-source-code/

{{% /tab %}}
{{< /tabs >}}

See [Data Collected][1] for details on what data is collected from your source code provider.

## Data access permissions

If you are using [custom roles][2] rather than [Datadog-managed roles][3], be sure to enable the `Code Coverage Read` permission for the roles that need to view code coverage data.

Navigate to [Roles settings][4], click `Edit` on the role you need, add the `Code Coverage Read` permission to the role, and save the changes.

## PR Gates

If you wish to gate on PR coverage, configure PR Gates rules in Datadog.

Navigate to [PR Gates rule creation][5] and configure a rule to gate on total or patch coverage.

## Upload code coverage reports

Update your CI pipeline to upload code coverage report files to Datadog. This involves installing and running the `datadog-ci` CLI in your CI environment.

See [Data Collected][6] for details on what data is collected during code coverage report upload.

### Supported coverage report formats

Datadog supports the following coverage data formats—expand for examples:

{{% collapse-content title="LCOV" level="h4" expanded=false id="lcov" %}}
{{< code-block lang="text" >}}
TN:
SF:src/example.c
FN:3,add
FNDA:5,add
FNF:1
FNH:1
DA:3,5
DA:4,5
DA:5,5
DA:8,0
DA:9,0
LF:5
LH:3
BRDA:4,0,0,5
BRDA:4,0,1,0
BRF:2
BRH:1
end_of_record
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="Go Coverprofile" level="h4" expanded=false id="go-coverprofile" %}}
{{< code-block lang="text" >}}
mode: atomic
example/calculator.go:51.148,53.2 1 0
example/calculator.go:55.190,61.15 3 0
example/calculator.go:61.15,64.3 2 0
example/calculator.go:66.2,67.16 2 0
example/calculator.go:67.16,69.3 1 0
example/clients/api_client.go:27.87,31.2 3 2
example/clients/api_client.go:34.85,36.2 1 3
example/clients/api_client.go:39.126,44.2 4 3
example/clients/api_client.go:47.106,50.2 2 3
example/notifications/notifier.go:49.79,51.2 1 3
example/notifications/notifier.go:60.33,69.2 1 0
example/notifications/notifier.go:79.131,86.15 3 2
example/notifications/notifier.go:104.3,104.10 1 3
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="Cobertura XML" level="h4" expanded=false id="cobertura-xml" %}}
{{< code-block lang="xml" >}}
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE coverage SYSTEM "http://cobertura.sourceforge.net/xml/coverage-04.dtd">
<coverage lines-valid="5" lines-covered="3" line-rate="0.6" branches-valid="2" branches-covered="1" branch-rate="0.5" timestamp="1690658886" version="1.9">
  <sources>
    <source>src</source>
  </sources>
  <packages>
    <package name="example" line-rate="0.6" branch-rate="0.5">
      <classes>
        <class name="Example" filename="example/Example.java" line-rate="0.6" branch-rate="0.5">
          <methods>
            <method name="add" signature="(II)I" line-rate="1.0" branch-rate="1.0">
              <lines>
                <line number="3" hits="5"/>
                <line number="4" hits="5" branch="true" condition-coverage="50% (1/2)"/>
                <line number="5" hits="5"/>
              </lines>
            </method>
          </methods>
          <lines>
            <line number="3" hits="5"/>
            <line number="4" hits="5" branch="true" condition-coverage="50% (1/2)"/>
            <line number="5" hits="5"/>
            <line number="8" hits="0"/>
            <line number="9" hits="0"/>
          </lines>
        </class>
      </classes>
    </package>
  </packages>
</coverage>
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="Jacoco XML" level="h4" expanded=false id="jacoco-xml" %}}
{{< code-block lang="xml" >}}
<?xml version="1.0" encoding="UTF-8"?>
<report name="Example">
  <sessioninfo id="SessionId" start="1690658886000" dump="1690658887000"/>
  <package name="example">
    <sourcefile name="Example.java">
      <line nr="3" mi="0" ci="5"/>
      <line nr="4" mi="0" ci="5" mb="1" cb="1"/>
      <line nr="5" mi="0" ci="5"/>
      <line nr="8" mi="1" ci="0"/>
      <line nr="9" mi="1" ci="0"/>
    </sourcefile>
  </package>
</report>
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="Clover XML" level="h4" expanded=false id="clover-xml" %}}
{{< code-block lang="xml" >}}
<coverage generated="1661852015">
    <project timestamp="1661852015">
        <file name="/var/www/html/src/App/Console/CronjobRunnerCommand.php">
            <class name="App\Console\CronjobRunnerCommand" namespace="global">
                <metrics complexity="3" methods="3" coveredmethods="0" conditionals="0" coveredconditionals="0" statements="4" coveredstatements="0" elements="7" coveredelements="0"/>
            </class>
            <line num="18" type="method" name="__construct" visibility="public" complexity="1" crap="2" count="0"/>
            <line num="20" type="stmt" count="1"/>
            <line num="27" type="stmt" count="0"/>
            <line num="30" type="method" name="execute" visibility="protected" complexity="1" crap="2" count="0"/>
            <line num="32" type="stmt" count="0"/>
            <metrics loc="35" ncloc="35" classes="1" methods="3" coveredmethods="0" conditionals="0" coveredconditionals="0" statements="4" coveredstatements="0" elements="7" coveredelements="0"/>
        </file>
        <file name="/var/www/html/src/App/Console/CronjobRunnerCommand2.php">
            <line num="42" type="stmt" count="1"/>
        </file>
    </project>
</coverage>
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="OpenCover XML" level="h4" expanded=false id="opencover-xml" %}}
{{< code-block lang="xml" >}}
<?xml version="1.0" encoding="utf-8"?>
<CoverageSession xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <Modules>
    <Module hash="ABC123">
      <ModulePath>Example.dll</ModulePath>
      <Files>
        <File uid="1" fullPath="src\example\Example.cs" />
      </Files>
      <Classes>
        <Class>
          <Methods>
            <Method visited="true" cyclomaticComplexity="1" sequenceCoverage="100">
              <FileRef uid="1"/>
              <SequencePoints>
                <SequencePoint vc="5" sl="3" />
                <SequencePoint vc="5" sl="4" />
                <SequencePoint vc="5" sl="5" />
                <SequencePoint vc="0" sl="9" />
              </SequencePoints>
              <BranchPoints>
                <BranchPoint vc="5" sl="4" path="0"/>
                <BranchPoint vc="0" sl="4" path="1"/>
              </BranchPoints>
            </Method>
          </Methods>
        </Class>
      </Classes>
    </Module>
  </Modules>
</CoverageSession>
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="Simplecov JSON" level="h4" expanded=false id="simplecov-json" %}}
{{< code-block lang="json" >}}
{
  "meta": {
    "simplecov_version": "0.21.2"
  },
  "coverage": {
    "/path/to/file1.rb": {
      "lines": [
        null,
        1,
        2,
        0,
        null,
        1,
        null,
        null,
        null,
        "ignored",
        "ignored",
        "ignored",
        null
      ],
      "branches": []
    },
    "/path/to/file2.rb": {
      "lines": [1, 1, null, 0, 1],
      "branches": []
    }
  }
}
{{< /code-block >}}
{{% /collapse-content %}}

### Install the datadog-ci CLI

Install the [`datadog-ci`][7] CLI globally using `npm`:

{{< code-block lang="shell" >}}
npm install -g @datadog/datadog-ci
{{< /code-block >}}

#### Standalone binary

If installing Node.js in the CI is an issue, standalone binaries are provided with [Datadog CI releases][8]. Only _linux-x64_, _linux-arm64_, _darwin-x64_, _darwin-arm64_ (MacOS) and _win-x64_ (Windows) are supported. To install, run the following from your terminal:

{{< tabs >}}
{{% tab "Linux" %}}
{{< code-block lang="shell" >}}
curl -L --fail "https://github.com/DataDog/datadog-ci/releases/latest/download/datadog-ci_linux-x64" --output "/usr/local/bin/datadog-ci" && chmod +x /usr/local/bin/datadog-ci
{{< /code-block >}}

Then run any command with `datadog-ci`:
{{< code-block lang="shell" >}}
datadog-ci version
{{< /code-block >}}
{{% /tab %}}

{{% tab "MacOS" %}}
{{< code-block lang="shell" >}}
curl -L --fail "https://github.com/DataDog/datadog-ci/releases/latest/download/datadog-ci_darwin-x64" --output "/usr/local/bin/datadog-ci" && chmod +x /usr/local/bin/datadog-ci
{{< /code-block >}}

Then run any command with `datadog-ci`:
{{< code-block lang="shell" >}}
datadog-ci version
{{< /code-block >}}
{{% /tab %}}

{{% tab "Windows" %}}
{{< code-block lang="powershell" >}}
Invoke-WebRequest -Uri "https://github.com/DataDog/datadog-ci/releases/latest/download/datadog-ci_win-x64" -OutFile "datadog-ci.exe"
{{< /code-block >}}

Then run any command with `Start-Process -FilePath "datadog-ci.exe"`:
{{< code-block lang="powershell" >}}
Start-Process -FilePath "./datadog-ci.exe" -ArgumentList version
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

#### Docker image

Alternatively, you can update your CI job to run in a container based on the [Datadog CI Docker image][13].
The image comes with `datadog-ci` preinstalled and ready to use.

### Uploading coverage reports

<div class="alert alert-info">
Datadog automatically aggregates all reports for the same commit on the backend. You don't need to merge coverage reports before uploading them.
</div>

To upload your code coverage reports to Datadog, run the following command. Provide a valid [Datadog API key][9] (`DD_API_KEY`), and one or more file paths to either the coverage report files directly or directories containing them:

{{< tabs >}}
{{% tab "GitHub Actions" %}}
<pre>
<code class="language-yaml" data-lang="yaml">
steps:
- name: Upload coverage reports to Datadog
  run: datadog-ci coverage upload .
  env:
    DD_API_KEY: ${{ secrets.DD_API_KEY }}
    DD_SITE: {{< region-param key="dd_site" >}}
</code>
</pre>
{{% /tab %}}
{{% tab "Gitlab" %}}
<pre>
<code class="language-yaml" data-lang="yaml">
test:
  stage: test
  script:
    - ... # run your tests and generate coverage reports
    - datadog-ci coverage upload . # make sure to add the DD_API_KEY CI/CD variable
</code>
</pre>
{{% /tab %}}
{{% tab "Azure Pipelines" %}}
<code class="language-yaml" data-lang="yaml">
- script: datadog-ci coverage upload --format=clover coverage/clover.xml
  displayName: 'Upload coverage to Datadog'
  env:
    DD_API_KEY: $(DD_API_KEY)
    DD_SITE: 'datadoghq.com'
</code>
{{% /tab %}}
{{< /tabs >}}

The command recursively searches the specified directories for supported coverage report files, so specifying the current directory (`.`) is usually sufficient.
See the [`datadog-ci` documentation][10] for more details on the `datadog-ci coverage upload` command.

Shortly after the code coverage report upload is finished, Datadog adds a PR comment with code coverage percentage values.
You can also view your coverage data aggregated by pull request in the [Code Coverage page][11] in Datadog, with the ability to examine individual files and lines of code.

{{< img src="/code_coverage/pr_details.png" text="Code Coverage PR details page in Datadog" style="width:100%" >}}

## Troubleshooting

### Coverage upload command does not detect coverage report files

The `datadog-ci coverage upload` command automatically detects supported coverage report files in the specified directories using heuristics, such as file names and extensions.
If your coverage report files do not match expected patterns, the command might not detect them automatically. In this case, specify the report format and provide the file paths as positional arguments. For example:

{{< code-block lang="shell" >}}
datadog-ci coverage upload --format=lcov \
  src/coverage-reports/unit-tests/coverage.info \
  src/coverage-reports/e2e-tests/coverage.info
{{< /code-block >}}

### Coverage upload fails with "Format could not be detected" error

The `datadog-ci coverage upload` command automatically detects the format of the coverage report files based on their content and file extension.
If the command fails with the following error:
```
Invalid coverage report file [...]: format could not be detected
```
specify the format explicitly using the `--format` option, like this:

{{< code-block lang="shell" >}}
datadog-ci coverage upload --format=cobertura reports/cobertura.xml
{{< /code-block >}}

### Coverage upload outputs "Could not sync git metadata" error

Git metadata upload is only required if you can't integrate your CI provider directly with Datadog.
If you are using a [source code provider integration][12], such as Datadog GitHub app or Gitlab integration, you can disable the git metadata upload by passing the `--skip-git-metadata-upload=1` flag to the `datadog-ci coverage upload` command, like this:

{{< code-block lang="shell" >}}
datadog-ci coverage upload --skip-git-metadata-upload=1 .
{{< /code-block >}}

### Datadog UI does not show changed files in the PR view

By default, the "Changed files" table only contains executable source code files that are present in the uploaded coverage reports.
Select **Non-executable files** or **All** in the table header to display all files that were changed in the PR, regardless of whether they are executable or not.

{{< img src="/code_coverage/non_executable_files.png" text="In Changed files, you have the option to select Non-executable on the table header" style="width:100%" >}}

If a source code file is mistakenly marked as non-executable, it is probably missing from your uploaded coverage reports.
Make sure that you are uploading all of your relevant reports, and double-check your coverage tool configuration to verify that coverage data is collected for all applicable files.

Test sources are not considered executable files as they are not part of the production codebase being measured for coverage.

### Datadog UI shows incorrect file paths

Code Coverage relies on the file paths in coverage reports to be either absolute or relative to the repository root.
If the paths in your report are relative to a different directory in your repository, specify the correct base path (relative to the repo root) with the `--base-path` option when running the `datadog-ci coverage upload` command, like this:

{{< code-block lang="shell" >}}
datadog-ci coverage upload --base-path=frontend/src .
{{< /code-block >}}

### Discrepancy between Datadog UI and coverage report values

Datadog automatically merges coverage reports for the same commit.
As a result, the coverage percentage displayed in the Datadog UI may differ from the values in your individual coverage reports, especially if those reports contain overlapping or duplicate source code file entries.

If you use an external tool (such as [ReportGenerator](https://reportgenerator.io/)) to merge coverage reports before uploading to Datadog,
ensure your merged reports do not contain duplicate source code file entries.
Datadog deduplicates overlapping files across reports, which can result in differences between your original coverage values and the merged values displayed in the Datadog UI.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /code_coverage/data_collected/#source-code-provider-integration
[2]: /account_management/rbac/permissions/#custom-roles
[3]: /account_management/rbac/permissions/#managed-roles
[4]: https://app.datadoghq.com/organization-settings/roles
[5]: https://app.datadoghq.com/ci/pr-gates/rule/create
[6]: /code_coverage/data_collected/#code-coverage-report-upload
[7]: https://www.npmjs.com/package/@datadog/datadog-ci
[8]: https://github.com/DataDog/datadog-ci/releases
[9]: https://app.datadoghq.com/organization-settings/api-keys
[10]: https://github.com/DataDog/datadog-ci/blob/master/packages/datadog-ci/src/commands/coverage/README.md
[11]: https://app.datadoghq.com/ci/code-coverage
[12]: #integrate-with-source-code-provider
[13]: https://hub.docker.com/r/datadog/ci
