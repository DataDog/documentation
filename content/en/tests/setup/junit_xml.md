---
title: Uploading JUnit test report files to Datadog
code_lang: junit_xml
type: multi-code-lang
code_lang_weight: 60
aliases:
  - /continuous_integration/setup_tests/junit_upload
  - /continuous_integration/tests/junit_upload
  - /continuous_integration/tests/setup/junit_xml
further_reading:
    - link: "/continuous_integration/tests"
      tag: "Documentation"
      text: "Explore Test Results and Performance"
    - link: "/continuous_integration/troubleshooting/"
      tag: "Documentation"
      text: "Troubleshooting CI Visibility"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">
The selected Datadog site ({{< region-param key="dd_site_name" >}}) is not supported.
</div>
{{< /site-region >}}

<div class="alert alert-warning">
  <strong>Note</strong>: Datadog recommends the native instrumentation of tests over uploading JUnit XML files,
  as the native instrumentation provides more accurate time results, supports distributed traces on integration tests
  and other features that are not available with JUnit XML uploads.
  See the <a href="/continuous_integration/tests/#supported-features">Supported Features</a> table for more details.
</div>

## Overview

JUnit test report files are XML files that contain test execution information, such as test and suite names, pass or fail status, duration, and sometimes error logs. Although introduced by the [JUnit][1] testing framework, many other popular frameworks are able to output results using this format.

If your testing framework can generate JUnit XML test reports, you can use these as a lightweight alternative to [instrumenting your tests natively][2] using Datadog tracers. Test results imported from JUnit XML reports appear alongside test data reported by tracers.

## Compatibility

Supported Datadog tracing library:

| Datadog Library | Version |
|---|---|
| `datadog-ci` | >= 2.17.0 |

## Installing the Datadog CI CLI

Install the [`datadog-ci`][3] CLI globally using `npm`:

{{< code-block lang="shell" >}}
npm install -g @datadog/datadog-ci
{{< /code-block >}}


### Standalone binary (beta)

<div class="alert alert-warning"><strong>Note</strong>: The standalone binaries are in <strong>beta</strong> and their stability is not guaranteed.</div>

If installing Node.js in the CI is an issue, standalone binaries are provided with [Datadog CI releases][4]. Only _linux-x64_, _darwin-x64_ (MacOS) and _win-x64_ (Windows) are supported. To install, run the following from your terminal:

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
Invoke-WebRequest -Uri "https://github.com/DataDog/datadog-ci/releases/latest/download/datadog-ci_win-x64.exe" -OutFile "datadog-ci.exe"
{{< /code-block >}}

Then run any command with `Start-Process -FilePath "datadog-ci.exe"`:
{{< code-block lang="powershell" >}}
Start-Process -FilePath "./datadog-ci.exe" -ArgumentList version
{{< /code-block >}}

{{% /tab %}}

{{< /tabs >}}

## Uploading test reports

To upload your JUnit XML test reports to Datadog, run the following command, specifying the name of the service or library that was tested using the `--service` parameter, and one or more file paths to either the XML report files directly or directories containing them:

{{< code-block lang="shell" >}}
datadog-ci junit upload --service <service_name> <path> [<path> ...]
{{< /code-block >}}

Specify a valid [Datadog API key][5] in the `DATADOG_API_KEY` environment variable, and the environment where tests were run (for example, `local` when uploading results from a developer workstation, or `ci` when uploading them from a CI provider) in the `DD_ENV` environment variable. For example:

<pre>
<code>
DD_ENV=ci DATADOG_API_KEY=&lt;api_key&gt; DATADOG_SITE={{< region-param key="dd_site" >}} datadog-ci junit upload \
  --service my-api-service \
  unit-tests/junit-reports e2e-tests/single-report.xml
</code>
</pre>

<div class="alert alert-warning">Make sure that this command runs in your CI even when your tests have failed. Usually, when tests fail, the CI job aborts execution, and the upload command does not run.</div>

{{< tabs >}}

{{% tab "GitHub Actions" %}}
Use the [Status check functions][1]:

{{< code-block lang="yaml" >}}
steps:
  - name: Run tests
    run: ./run-tests.sh
  - name: Upload test results to Datadog
    if: always()
    run: datadog-ci junit upload --service service_name ./junit.xml
{{< /code-block >}}

[1]: https://docs.github.com/en/actions/learn-github-actions/expressions#always
{{% /tab %}}

{{% tab "GitLab" %}}
Use the [`after_script` section][1]:

{{< code-block lang="yaml" >}}
test:
  stage: test
  script:
    - ./run-tests.sh
  after_script:
    - datadog-ci junit upload --service service_name ./junit.xml
{{< /code-block >}}

[1]: https://docs.gitlab.com/ee/ci/yaml/#after_script
{{% /tab %}}

{{% tab "Jenkins" %}}
Use the [`post` section][1]:

{{< code-block lang="groovy" >}}
pipeline {
  agent any
  stages {
    stage('Run tests') {
      steps {
        sh './run-tests.sh'
      }
      post {
        always {
          sh 'datadog-ci junit upload --service service_name ./junit.xml'
        }
      }
    }
  }
}
{{< /code-block >}}

[1]: https://www.jenkins.io/doc/book/pipeline/syntax/#post
{{% /tab %}}

{{% tab "Bash" %}}
If your CI system allows sub-shells:

{{< code-block lang="shell" >}}
$(./run-tests.sh); export tests_exit_code=$?
datadog-ci junit upload --service service_name ./junit.xml
if [ $tests_exit_code -ne 0 ]; then exit $tests_exit_code; fi
{{< /code-block >}}

{{% /tab %}}

{{< /tabs >}}

Reports larger than 250 MiB may not be processed completely, resulting in missing tests or logs. For the best experience, ensure that the reports are under 250 MiB.

## Configuration settings

This is the full list of options available when using the `datadog-ci junit upload` command:

`--service` (Required)
: Name of the service or library under test.<br/>
**Environment variable**: `DD_SERVICE`<br/>
**Example**: `my-api-service`

`--env`
: Environment where tests were run.<br/>
**Environment variable**: `DD_ENV`<br/>
**Example**: `ci`

`--tags`
: Key-value pairs in the form `key:value` to be attached to all tests (the `--tags` parameter can be specified multiple times). When specifying tags using `DD_TAGS`, separate them using commas (for example, `team:backend,priority:high`).<br/>
**Environment variable**: `DD_TAGS`<br/>
**Default**: (none)<br/>
**Example**: `team:backend`<br/>
**Note**: Tags specified using `--tags` and with the `DD_TAGS` environment variable are merged. If the same key appears in both `--tags` and `DD_TAGS`, the value in the environment variable `DD_TAGS` takes precedence.

`--measures`
: Key-value numerical pairs in the form `key:number` to be attached to all tests (the `--measures` parameter can be specified multiple times). When specifying measures using `DD_MEASURES`, separate them using commas (for example, `memory_allocations:13,test_importance:2`).<br/>
**Environment variable**: `DD_MEASURES`<br/>
**Default**: (none)<br/>
**Example**: `memory_allocations:13`<br/>
**Note**: Measures specified using `--measures` and with the `DD_MEASURES` environment variable are merged. If the same key appears in both `--measures` and `DD_MEASURES`, the value in the environment variable `DD_MEASURES` takes precedence.

`--report-tags`
: Key-value pairs in the form `key:value`. Works like the `--tags` parameter but these tags are only applied at the session level and are **not** merged with the environment variable `DD_TAGS`<br/>
**Default**: (none)<br/>
**Example**: `test.code_coverage.enabled:true`<br/>

`--report-measures`
: Key-value pairs in the form `key:123`. Works like the `--measures` parameter but these tags are only applied at the session level and are **not** merged with the environment variable `DD_MEASURES`<br/>
**Default**: (none)<br/>
**Example**: `test.code_coverage.lines_pct:82`<br/>

`--xpath-tag`
: Key and xpath expression in the form `key=expression`. These provide a way to customize tags for test in the file (the `--xpath-tag` parameter can be specified multiple times).<br/>
See [Providing metadata with XPath expressions](#providing-metadata-with-xpath-expressions) for more details on the supported expressions.<br/>
**Default**: (none)<br/>
**Example**: `test.suite=/testcase/@classname`<br/>
**Note**: Tags specified using `--xpath-tag` and with `--tags` or `DD_TAGS` environment variable are merged. xpath-tag gets the highest precedence, as the value is usually different for each test.

`--logs`
: Enable forwarding content from the XML reports as [Logs][6]. The content inside `<system-out>`, `<system-err>`, and `<failure>` is collected as logs. Logs from elements inside a `<testcase>` are automatically connected to the test.<br/>
**Environment variable**: `DD_CIVISIBILITY_LOGS_ENABLED`<br/>
**Default**: `false`<br/>
**Note**: Logs are billed separately from CI Visibility.

`--max-concurrency`
: The number of concurrent uploads to the API.<br/>
**Default**: `20`

`--dry-run`
: Runs the command without actually uploading the file to Datadog. All other checks are performed.<br/>
**Default**: `false`

`--skip-git-metadata-upload`
: Boolean flag used to skip git metadata upload.<br/>
**Default**: `false`<br/>

`--git-repository-url`
: The repository URL to retrieve git metadata from. If it is not passed, the URL is retrieved from the local git repository.<br/>
**Default**: local git repository<br/>
**Example**: `git@github.com:DataDog/documentation.git`<br/>

`--verbose`
: Flag used to add extra verbosity to the output of the command<br/>
**Default**: `false`<br/>

Positional arguments
: The file paths or directories in which the JUnit XML reports are located. If you pass a directory, the CLI looks for all `.xml` files in it.

For more information about `service` and `env` reserved tags, see [Unified Service Tagging][7].

The following environment variables are supported:

`DATADOG_API_KEY` (Required)
: [Datadog API key][5] used to authenticate the requests.<br/>
**Default**: (none)

Additionally, configure the Datadog site to use the selected one ({{< region-param key="dd_site_name" >}}):

`DATADOG_SITE` (Required)
: The [Datadog site][8] to upload results to.<br/>
**Default**: `datadoghq.com`<br/>
**Selected site**: {{< region-param key="dd_site" code="true" >}}

## Collecting Git metadata

{{% ci-git-metadata %}}

## Collecting environment configuration metadata

Datadog uses special dedicated tags to identify the configuration of the environment in which tests run, including the operating system, runtime, and device information, if applicable. When the same test for the same commit runs in more than one configuration (for example, on Windows and on Linux), the tags are used to differentiate the test in failure and flakiness detection.

You can specify these special tags using the `--tags` parameter when calling `datadog-ci junit upload`, or by setting the `DD_TAGS` environment variable.

All of these tags are optional, and only the ones you specify will be used to differentiate between environment configurations.

`test.bundle`
: Used to execute groups of test suites separately.<br/>
**Examples**: `ApplicationUITests`, `ModelTests`

`os.platform`
: Name of the operating system.<br/>
**Examples**: `windows`, `linux`, `darwin`

`os.version`
: Version of the operating system.<br/>
**Examples**: `10.15.4`, `14.3.2`, `95`

`os.architecture`
: Architecture of the operating system.<br/>
**Examples**: `x64`, `x86`, `arm64`

`runtime.name`
: Name of the language interpreter or programming runtime.<br/>
**Examples**: `.NET`, `.NET Core`, `OpenJDK Runtime Environment`, `Java(TM) SE Runtime Environment`, `CPython`

`runtime.version`
: Version of the runtime.<br/>
**Examples**: `5.0.0`, `3.1.7`

`runtime.vendor`
: Name of the runtime vendor where applicable. For example, when using a Java runtime.<br/>
**Examples**: `AdoptOpenJDK`, `Oracle Corporation`

`runtime.architecture`
: Architecture of the runtime.<br/>
**Examples**: `x64`, `x86`, `arm64`

For mobile apps (Swift, Android):

`device.model`
: The model of the device being tested.<br/>
**Examples**: `iPhone11,4`, `AppleTV5,3`

`device.name`
: The name of the device being tested.<br/>
**Examples**: `iPhone 12 Pro Simulator`, `iPhone 13 (QA team)`

## Adding code owners
To add [codeowners][9] information to your JUnit XML tests, you can use the [GitHub integration][10] to read the `CODEOWNERS` file in your repository or provide some additional information manually.

As a result, the JUnit XML tests have a `test.codeowners` tag with the owner of those tests.

### Using the GitHub integration (recommended)

To automatically add the `test.codeowners` tag to your tests, you need to:
1. Have a `CODEOWNERS` file [in one of the allowed locations][11] in your repository.
2. Provide the tests source file in your JUnit XML report. The following plugins do this automatically and add the `file` attribute to the `<testcase>` or `<testsuite>` elements in the XML report:

    * phpunit
    * Most Python plugins (pytest, unittest)
    * Most Ruby plugins (ruby minitest)

    If the XML does not have the `file` attribute, you need to [provide the source file manually](#manually-providing-the-testsourcefile-tag).
   Example of a valid report:

  {{< code-block lang="xml" >}}
  <?xml version="1.0" encoding="UTF-8"?>
  <testsuite name="suite">
    <testcase name="test_with_file" file="src/commands/junit" />
  </testsuite>
  {{< /code-block >}}

3. Enable the [GitHub app][12]. If you do not have a GitHub app, follow the steps in the next section. If you already have
   a GitHub app, enable the `Contents: Read` permission so Datadog can read the `CODEOWNERS` file. Once enabled, wait a few minutes for the changes to take effect.

**Note:** Github is the only supported Git provider.

#### Configure a GitHub App

The JUnit XML uses a private [GitHub App][12] to read the `CODEOWNERS` file.

1. Go to the [GitHub integration tile][13].
2. Click **Link GitHub Account**.
3. Follow the instructions to configure the integration for a personal or organization account.
4. In **Edit Permissions**, grant `Contents: Read` access.
5. Click **Create App in GitHub** to finish the app creation process on GitHub.
6. Give the app a name, for example, `Datadog CI Visibility`.
7. Click **Install GitHub App** and follow the instructions on GitHub.

### Manually providing the `test.source.file` tag
This is an alternative to using the GitHub integration.

For those plugins that do not provide the `file` attribute in the XML report, you can provide the `test.source.file` tag.
There is no need to provide the exact path to a specific file, [you can use any syntax you would use in the CODEOWNERS file][14]
such as `src/myTeamFolder` or `*.md`.

There are multiple ways to provide the `test.source.file` tag:
* Using the [`--tags` parameter or the `DD_TAGS` environment variable](#configuration-settings).

   ```shell
   datadog-ci junit upload --service service-name --tags test.source.file:src/myTeamFolder my_report.xml
   ```

   This adds the `test.source.file` tag to all the tests in the report. All of the tests will have the same owner(s).
* If you want to provide different source files for the same XML report, you can use [property elements](#Providing-metadata-through-property-elements) or set the `file` attribute manually to individual `<testcase>` or `<testsuite>` elements.

## Providing metadata with XPath expressions

In addition to the `--tags` CLI parameter and the `DD_TAGS` environment variable, which apply custom tags globally to all tests included the uploaded XML report, the `--xpath-tag` parameter provides custom rules to add tags from different attributes within the XML to each test.

The parameter provided must have the format `key=expression`, where `key` is the name of the custom tag to be added and `expression` is a valid [XPath][15] expression within the ones supported.

While XPath syntax is used for familiarity, only the following expressions are supported:

`/testcase/@attribute-name`
: The XML attribute from `<testcase attribute-name="value">`.

`/testcase/../@attribute-name`
: The XML attribute from the parent `<testsuite attribute-name="value">` of the current `<testcase>`.

`/testcase/..//property[@name='property-name']`
: The `value` attribute from the `<property name="property-name" value="value">` inside the parent `<testsuite>` of the current `<testcase>`.

`/testcase//property[@name='property-name']`
: The `value` attribute from the `<property name="property-name" value="value">` inside the current `<testcase>`.

Examples:

{{< tabs >}}

{{% tab "Test suite from @classname" %}}
By default, the `test.suite` tag of the tests is read from `<testsuite name="suite name">`. However, some plugins might report a better value in `<testcase classname="TestSuite">`.

To change `test.suite` tags from `value 1`, `value 2` to `SomeTestSuiteClass`, `OtherTestSuiteClass`:

{{< code-block lang="xml" >}}
<?xml version="1.0" encoding="UTF-8"?>
<testsuites>
  <testsuite tests="1" failures="0" time="0.030000" name="value 1">
    <testcase classname="SomeTestSuiteClass" name="test_something" time="0.030000"></testcase>
  </testsuite>
  <testsuite tests="1" failures="0" time="0.021300" name="value 2">
    <testcase classname="OtherTestSuiteClass" name="test_something" time="0.021300"></testcase>
  </testsuite>
</testsuites>
{{< /code-block >}}

{{< code-block lang="shell" >}}
datadog-ci junit upload --service service_name \
  --xpath-tag test.suite=/testcase/@classname ./junit.xml
{{< /code-block >}}

{{% /tab %}}

{{% tab "Tag from attribute" %}}
To add `custom_tag` to each test with values `value 1`, `value 2`:

{{< code-block lang="xml" >}}
<?xml version="1.0" encoding="UTF-8"?>
<testsuites>
  <testsuite tests="1" failures="0" time="0.020000" name="SomeTestSuiteClass">
    <testcase name="test_something" time="0.010000" attr="value 1"></testcase>
    <testcase name="test_other" time="0.010000" attr="value 2"></testcase>
  </testsuite>
</testsuites>
{{< /code-block >}}

{{< code-block lang="shell" >}}
datadog-ci junit upload --service service_name \
  --xpath-tag custom_tag=/testcase/@attr ./junit.xml
{{< /code-block >}}

{{% /tab %}}

{{% tab "Tag from testsuite property" %}}
To add `custom_tag` to each test with values `value 1`, `value 2`:

{{< code-block lang="xml" >}}
<?xml version="1.0" encoding="UTF-8"?>
<testsuites>
  <testsuite tests="1" failures="0" time="0.030000" name="SomeTestSuiteClass">
    <properties>
      <property name="prop" value="value 1"></property>
    </properties>
    <testcase name="test_something" time="0.030000" attr="value 1"></testcase>
  </testsuite>
  <testsuite tests="1" failures="0" time="0.021300" name="OtherTestSuiteClass">
    <properties>
      <property name="prop" value="value 1"></property>
    </properties>
    <testcase name="test_something" time="0.021300" attr="value 1"></testcase>
  </testsuite>
</testsuites>
{{< /code-block >}}

{{< code-block lang="shell" >}}
datadog-ci junit upload --service service_name \
  --xpath-tag custom_tag=/testcase/..//property[@name=\'prop\'] ./junit.xml
{{< /code-block >}}

**Note:** The name must be in quotes. Bash requires quotes to be escaped using a backslash, for example `[@name='prop']` must be entered as `[@name=\'prop\'].
{{% /tab %}}

{{< /tabs >}}

<div class="alert alert-warning">
  When using bash from Git for Windows, define the <strong>MSYS_NO_PATHCONV=1</strong> environment variable.
  Otherwise, any argument starting with <strong>/</strong> will be expanded to a Windows path.
</div>

## Providing metadata through property elements

Another way to provide additional tags to specific tests is including `<property name="dd_tags[key]" value="value">` elements within the `<testsuite>` or `<testcase>` elements. If you add these tags to a `<testcase>` element, they are stored in its test span. If you add the tags to a `<testsuite>` element, they are stored in all of that suite's test spans.

To be processed, the `name` attribute in the `<property>` element must have the format `dd_tags[key]`, where `key` is the name of the custom tag to be added. Other properties are ignored.

**Example**: Adding tags to a `<testcase>` element.

{{< code-block lang="xml" >}}
<?xml version="1.0" encoding="UTF-8"?>
<testsuites>
  <testsuite tests="1" failures="0" time="0.030000" name="SomeTestSuiteClass">
    <testcase classname="SomeTestSuiteClass" name="test_something" time="0.010000">
      <properties>
        <property name="dd_tags[custom_tag]" value="some value"></property>
        <property name="dd_tags[runtime.name]" value="CPython"></property>
      </properties>
    </testcase>
  </testsuite>
</testsuites>
{{< /code-block >}}

**Example**: Adding tags to a `<testsuite>` element.

{{< code-block lang="xml" >}}
<?xml version="1.0" encoding="UTF-8"?>
<testsuites>
  <testsuite tests="1" failures="0" time="0.030000" name="SomeTestSuiteClass">
    <properties>
      <property name="dd_tags[custom_tag]" value="some value"></property>
      <property name="dd_tags[runtime.name]" value="CPython"></property>
    </properties>
    <testcase classname="SomeTestSuiteClass" name="test_something" time="0.010000"></testcase>
  </testsuite>
</testsuites>
{{< /code-block >}}

The values that you send to Datadog are strings, so the facets are displayed in lexicographical order. To send integers instead of strings, use the `--measures` flag and the `DD_MEASURES` environment variable.


## Reporting code coverage

It is possible to report code coverage for a given JUnit report via the `--report-measures` option, by setting the `test.code_coverage.lines_pct` measure:

```shell
datadog-ci junit upload --service my-api-service --report-measures test.code_coverage.lines_pct:82 unit-tests/junit-reports e2e-tests/single-report.xml
```

For more information, see [Code Coverage][16].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://junit.org/junit5/
[2]: https://docs.datadoghq.com/continuous_integration/tests/#setup
[3]: https://www.npmjs.com/package/@datadog/datadog-ci
[4]: https://github.com/DataDog/datadog-ci/releases
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: /logs/
[7]: /getting_started/tagging/unified_service_tagging
[8]: /getting_started/site/
[9]: https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners
[10]: https://docs.datadoghq.com/integrations/github/
[11]: https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners#codeowners-file-location
[12]: https://docs.github.com/developers/apps/getting-started-with-apps/about-apps
[13]: https://app.datadoghq.com/integrations/github/
[14]: https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners#codeowners-syntax
[15]: https://www.w3schools.com/xml/xpath_syntax.asp
[16]: /continuous_integration/tests/code_coverage/?tab=junitreportuploads
