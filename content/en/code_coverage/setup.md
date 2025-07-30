---
title: Set Up Code Coverage
further_reading:
  - link: "/code_coverage"
    tag: "Documentation"
    text: "Code Coverage"
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

See the [GitHub integration documentation][1] for detailed instructions for integrating with GitHub.

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

<div class="alert alert-info">If you have a Datadog-managed Marketplace App or a custom app with default settings, the required permissions and webhooks are included.</div>

[1]: /integrations/github/#github-apps-1
{{% /tab %}}
{{< /tabs >}}

## Data access permissions

If you are using [custom roles][1] rather than [Datadog-managed roles][2], be sure to enable the `Code Coverage Read` permission for the roles that need to view code coverage data.

Navigate to [Roles settings][3], click `Edit` on the role you need, add the `Code Coverage Read` permission to the role, and save the changes.

## PR Gates

If you wish to gate on PR coverage, configure PR Gates rules in Datadog.

Navigate to [PR Gates rule creation][4] and configure a rule to gate on total or patch coverage.

## Upload code coverage reports

Update your CI pipeline to upload code coverage report files to Datadog.

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

Install the [`datadog-ci`][5] CLI globally using `npm`:

{{< code-block lang="shell" >}}
npm install -g @datadog/datadog-ci
{{< /code-block >}}

#### Standalone binary

If installing Node.js in the CI is an issue, standalone binaries are provided with [Datadog CI releases][6]. Only _linux-x64_, _linux-arm64_, _darwin-x64_, _darwin-arm64_ (MacOS) and _win-x64_ (Windows) are supported. To install, run the following from your terminal:

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

### Uploading coverage reports

To upload your code coverage reports to Datadog, run the following command, providing a valid [DD API key][7] and one or more file paths to either the coverage report files directly or directories containing them:

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
[1]: https://docs.github.com/en/actions/learn-github-actions/expressions#always
{{% /tab %}}
{{< /tabs >}}

Provided directories are recursively searched for supported coverage report files, so specifying the current directory `.` is usually sufficient.
See the [Datadog CI CLI documentation][8] for more details on the `datadog-ci coverage upload` command.

If everything is configured correctly, you will see a PR comment from Datadog with code coverage percentage values shortly after the code coverage upload is finished.
You will also be able to view your coverage data aggregated by pull request in the [Code Coverage page][9] in Datadog, with the ability to drill down into individual files and lines of code.

{{< img src="/code_coverage/pr_details.png" text="Code Coverage PR details page in Datadog" style="width:100%" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/rbac/permissions/#custom-roles
[2]: /account_management/rbac/permissions/#managed-roles
[3]: https://app.datadoghq.com/organization-settings/roles
[4]: https://app.datadoghq.com/ci/pr-gates/rule/create
[5]: https://www.npmjs.com/package/@datadog/datadog-ci
[6]: https://github.com/DataDog/datadog-ci/releases
[7]: https://app.datadoghq.com/organization-settings/api-keys
[8]: https://github.com/DataDog/datadog-ci/blob/master/src/commands/coverage/README.md
[9]: https://app.datadoghq.com/ci/code-coverage
