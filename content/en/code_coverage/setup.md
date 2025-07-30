---
title: Set Up Code Coverage
further_reading:
  - link: "/code_coverage"
    tag: "Documentation"
    text: "Code Coverage"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Code Coverage is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

Setting up Code Coverage involves the following steps:

1. Configure integration with your source code provider in the Datadog UI.
2. Configure code coverage data access permissions in Datadog.
3. Optionally, configure a PR Gate to block pull requests based on coverage thresholds.
4. Update your CI pipeline to upload code coverage reports to Datadog.

## Source code provider integration

GitHub is currently the only supported source code provider for Code Coverage.

{{< tabs >}}
{{% tab "GitHub" %}}

Detailed instructions for integrating with GitHub are available in the [GitHub integration documentation][1].

Code Coverage requires the following GitHub App permissions:
| Permission | Access Level | Purpose |
|---|---|---|
| Contents | Read | To show source code in the detailed coverage UI. |
| Pull Requests | Write | To show PR data in coverage UI and to write PR comments |
| Checks | Write | To create coverage PR gates |

The following webhooks are required:
| Webhook | Purpose |
|---|---|
| Pull request | To receive PR data updates |
| Pull request review | To receive PR data updates |
| Pull request review comment | To receive PR data updates |
| Push | To receive git commit metadata |

[1]: /integrations/github/#github-apps-1
{{% /tab %}}
{{< /tabs >}}

## Code coverage data access permissions

If you are using [custom roles][1] rather than [Datadog-managed roles][2], be sure to enable "Code Coverage Read" permission for the roles that need to be able to view code coverage data.

Navigate to [Roles settings][3], find the role you need, click `Edit`, add `Code Coverage Read` permission to the role, and save the changes.

## Code coverage PR gating

If you wish to gate on PR coverage, configure PR gating rules in Datadog.

Navigate to [PR Gates rule creation][4] and configure a rule to gate on total or patch coverage.

## Code Coverage reports upload

Update your CI pipeline to upload code coverage report files to Datadog.

### Supported coverage formats

Datadog supports the following coverage data formats:
<details>
  <summary>LCOV</summary>
  <pre>
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
</pre>
</details>
<details>
  <summary>Cobertura XML</summary>
  <pre>
&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;
&lt;!DOCTYPE coverage SYSTEM &quot;http://cobertura.sourceforge.net/xml/coverage-04.dtd&quot;&gt;
&lt;coverage lines-valid=&quot;5&quot; lines-covered=&quot;3&quot; line-rate=&quot;0.6&quot; branches-valid=&quot;2&quot; branches-covered=&quot;1&quot; branch-rate=&quot;0.5&quot; timestamp=&quot;1690658886&quot; version=&quot;1.9&quot;&gt;
  &lt;sources&gt;
    &lt;source&gt;src&lt;/source&gt;
  &lt;/sources&gt;
  &lt;packages&gt;
    &lt;package name=&quot;example&quot; line-rate=&quot;0.6&quot; branch-rate=&quot;0.5&quot;&gt;
      &lt;classes&gt;
        &lt;class name=&quot;Example&quot; filename=&quot;example/Example.java&quot; line-rate=&quot;0.6&quot; branch-rate=&quot;0.5&quot;&gt;
          &lt;methods&gt;
            &lt;method name=&quot;add&quot; signature=&quot;(II)I&quot; line-rate=&quot;1.0&quot; branch-rate=&quot;1.0&quot;&gt;
              &lt;lines&gt;
                &lt;line number=&quot;3&quot; hits=&quot;5&quot;/&gt;
                &lt;line number=&quot;4&quot; hits=&quot;5&quot; branch=&quot;true&quot; condition-coverage=&quot;50% (1/2)&quot;/&gt;
                &lt;line number=&quot;5&quot; hits=&quot;5&quot;/&gt;
              &lt;/lines&gt;
            &lt;/method&gt;
          &lt;/methods&gt;
          &lt;lines&gt;
            &lt;line number=&quot;3&quot; hits=&quot;5&quot;/&gt;
            &lt;line number=&quot;4&quot; hits=&quot;5&quot; branch=&quot;true&quot; condition-coverage=&quot;50% (1/2)&quot;/&gt;
            &lt;line number=&quot;5&quot; hits=&quot;5&quot;/&gt;
            &lt;line number=&quot;8&quot; hits=&quot;0&quot;/&gt;
            &lt;line number=&quot;9&quot; hits=&quot;0&quot;/&gt;
          &lt;/lines&gt;
        &lt;/class&gt;
      &lt;/classes&gt;
    &lt;/package&gt;
  &lt;/packages&gt;
&lt;/coverage&gt;
</pre>
</details>
<details>
  <summary>Jacoco XML</summary>
  <pre>
&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;
&lt;report name=&quot;Example&quot;&gt;
  &lt;sessioninfo id=&quot;SessionId&quot; start=&quot;1690658886000&quot; dump=&quot;1690658887000&quot;/&gt;
  &lt;package name=&quot;example&quot;&gt;
    &lt;sourcefile name=&quot;Example.java&quot;&gt;
      &lt;line nr=&quot;3&quot; mi=&quot;0&quot; ci=&quot;5&quot;/&gt;
      &lt;line nr=&quot;4&quot; mi=&quot;0&quot; ci=&quot;5&quot; mb=&quot;1&quot; cb=&quot;1&quot;/&gt;
      &lt;line nr=&quot;5&quot; mi=&quot;0&quot; ci=&quot;5&quot;/&gt;
      &lt;line nr=&quot;8&quot; mi=&quot;1&quot; ci=&quot;0&quot;/&gt;
      &lt;line nr=&quot;9&quot; mi=&quot;1&quot; ci=&quot;0&quot;/&gt;
    &lt;/sourcefile&gt;
  &lt;/package&gt;
&lt;/report&gt;
</pre>
</details>
<details>
  <summary>Clover XML</summary>
  <pre>
&lt;coverage generated=&quot;1661852015&quot;&gt;
    &lt;project timestamp=&quot;1661852015&quot;&gt;
        &lt;file name=&quot;/var/www/html/src/App/Console/CronjobRunnerCommand.php&quot;&gt;
            &lt;class name=&quot;App\Console\CronjobRunnerCommand&quot; namespace=&quot;global&quot;&gt;
                &lt;metrics complexity=&quot;3&quot; methods=&quot;3&quot; coveredmethods=&quot;0&quot; conditionals=&quot;0&quot; coveredconditionals=&quot;0&quot; statements=&quot;4&quot; coveredstatements=&quot;0&quot; elements=&quot;7&quot; coveredelements=&quot;0&quot;/&gt;
            &lt;/class&gt;
            &lt;line num=&quot;18&quot; type=&quot;method&quot; name=&quot;__construct&quot; visibility=&quot;public&quot; complexity=&quot;1&quot; crap=&quot;2&quot; count=&quot;0&quot;/&gt;
            &lt;line num=&quot;20&quot; type=&quot;stmt&quot; count=&quot;1&quot;/&gt;
            &lt;line num=&quot;27&quot; type=&quot;stmt&quot; count=&quot;0&quot;/&gt;
            &lt;line num=&quot;30&quot; type=&quot;method&quot; name=&quot;execute&quot; visibility=&quot;protected&quot; complexity=&quot;1&quot; crap=&quot;2&quot; count=&quot;0&quot;/&gt;
            &lt;line num=&quot;32&quot; type=&quot;stmt&quot; count=&quot;0&quot;/&gt;
            &lt;metrics loc=&quot;35&quot; ncloc=&quot;35&quot; classes=&quot;1&quot; methods=&quot;3&quot; coveredmethods=&quot;0&quot; conditionals=&quot;0&quot; coveredconditionals=&quot;0&quot; statements=&quot;4&quot; coveredstatements=&quot;0&quot; elements=&quot;7&quot; coveredelements=&quot;0&quot;/&gt;
        &lt;/file&gt;
        &lt;file name=&quot;/var/www/html/src/App/Console/CronjobRunnerCommand2.php&quot;&gt;
            &lt;line num=&quot;42&quot; type=&quot;stmt&quot; count=&quot;1&quot;/&gt;
        &lt;/file&gt;
    &lt;/project&gt;
&lt;/coverage&gt;
</pre>
</details>
<details>
  <summary>OpenCover XML</summary>
  <pre>
&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
&lt;CoverageSession xmlns:xsi=&quot;http://www.w3.org/2001/XMLSchema-instance&quot;&gt;
  &lt;Modules&gt;
    &lt;Module hash=&quot;ABC123&quot;&gt;
      &lt;ModulePath&gt;Example.dll&lt;/ModulePath&gt;
      &lt;Files&gt;
        &lt;File uid=&quot;1&quot; fullPath=&quot;src\example\Example.cs&quot; /&gt;
      &lt;/Files&gt;
      &lt;Classes&gt;
        &lt;Class&gt;
          &lt;Methods&gt;
            &lt;Method visited=&quot;true&quot; cyclomaticComplexity=&quot;1&quot; sequenceCoverage=&quot;100&quot;&gt;
              &lt;FileRef uid=&quot;1&quot;/&gt;
              &lt;SequencePoints&gt;
                &lt;SequencePoint vc=&quot;5&quot; sl=&quot;3&quot; /&gt;
                &lt;SequencePoint vc=&quot;5&quot; sl=&quot;4&quot; /&gt;
                &lt;SequencePoint vc=&quot;5&quot; sl=&quot;5&quot; /&gt;
                &lt;SequencePoint vc=&quot;0&quot; sl=&quot;9&quot; /&gt;
              &lt;/SequencePoints&gt;
              &lt;BranchPoints&gt;
                &lt;BranchPoint vc=&quot;5&quot; sl=&quot;4&quot; path=&quot;0&quot;/&gt;
                &lt;BranchPoint vc=&quot;0&quot; sl=&quot;4&quot; path=&quot;1&quot;/&gt;
              &lt;/BranchPoints&gt;
            &lt;/Method&gt;
          &lt;/Methods&gt;
        &lt;/Class&gt;
      &lt;/Classes&gt;
    &lt;/Module&gt;
  &lt;/Modules&gt;
&lt;/CoverageSession&gt;
</pre>
</details>
<details>
  <summary>Simplecov JSON</summary>
  <pre>
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

</pre>
</details>

### Installing the Datadog CI CLI

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

<pre>
<code class="language-bash" data-lang="bash">
DD_API_KEY=&lt;api_key&gt; DATADOG_SITE={{< region-param key="dd_site" >}} datadog-ci coverage upload .
</code>
</pre>

Provided directories are recursively searched for supported coverage report files, so specifying the current directory `.` is usually sufficient.
See the [Datadog CI CLI documentation][8] for more details on the `datadog-ci coverage upload` command.

<div class="alert alert-warning">Make sure that this command runs in your CI even when your tests have failed. Usually, when tests fail, the CI job aborts execution, and the upload command does not run.</div>

{{< tabs >}}
{{% tab "GitHub Actions" %}}
Use the [Status check functions][1]:

<pre>
<code class="language-yaml" data-lang="yaml">
steps:
- name: Run tests
  run: ./run-tests.sh
- name: Upload coverage reports to Datadog
  if: always()
  run: datadog-ci coverage upload .
  env:
    DD_API_KEY: ${{ secrets.DD_API_KEY }}
    DD_SITE: {{< region-param key="dd_site" >}}
</code>
</pre>

[1]: https://docs.github.com/en/actions/learn-github-actions/expressions#always
{{% /tab %}}
{{< /tabs >}}

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
