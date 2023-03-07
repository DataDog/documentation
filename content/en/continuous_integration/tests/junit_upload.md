---
title: Uploading JUnit test report files to Datadog
kind: documentation
aliases:
  - /continuous_integration/setup_tests/junit_upload
further_reading:
    - link: "/continuous_integration/tests"
      tag: "Documentation"
      text: "Explore Test Results and Performance"
    - link: "/continuous_integration/troubleshooting/"
      tag: "Documentation"
      text: "Troubleshooting CI"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">
The selected Datadog site ({{< region-param key="dd_site_name" >}}) is not supported.
</div>
{{< /site-region >}}

<div class="alert alert-warning"><strong>Note</strong>: Datadog recommends the native instrumentation of tests over uploading JUnit XML files, as the native instrumentation provides more accurate time results, supports distributed traces on integration tests, and supports structured stack traces.</div>

JUnit test report files are XML files that contain test execution information, such as test and suite names, pass or fail status, duration, and sometimes error logs. Although introduced by the [JUnit][1] testing framework, many other popular frameworks are able to output results using this format.

If your testing framework can generate JUnit XML test reports, you can use these as a lightweight alternative to [instrumenting your tests natively][2] using Datadog tracers. Test results imported from JUnit XML reports appear alongside test data reported by tracers.

## Installing the Datadog CI CLI

Install the [`datadog-ci`][3] CLI globally using `npm`:

{{< code-block lang="bash" >}}
npm install -g @datadog/datadog-ci
{{< /code-block >}}

### Standalone binary (beta)

<div class="alert alert-warning"><strong>Note</strong>: The standalone binaries are in <strong>beta</strong> and their stability is not guaranteed.</div>

If installing Node.js in the CI is an issue, standalone binaries are provided with [Datadog CI releases][4]. Only _linux-x64_, _darwin-x64_ (MacOS) and _win-x64_ (Windows) are supported. To install, run the following from your terminal:

{{< tabs >}}
{{% tab "Linux" %}}
{{< code-block lang="bash" >}}
curl -L --fail "https://github.com/DataDog/datadog-ci/releases/latest/download/datadog-ci_linux-x64" --output "/usr/local/bin/datadog-ci" && chmod +x /usr/local/bin/datadog-ci
{{< /code-block >}}

Then run any command with `datadog-ci`:
{{< code-block lang="bash" >}}
datadog-ci version
{{< /code-block >}}

{{% /tab %}}

{{% tab "MacOS" %}}
{{< code-block lang="bash" >}}
curl -L --fail "https://github.com/DataDog/datadog-ci/releases/latest/download/datadog-ci_darwin-x64" --output "/usr/local/bin/datadog-ci" && chmod +x /usr/local/bin/datadog-ci
{{< /code-block >}}

Then run any command with `datadog-ci`:
{{< code-block lang="bash" >}}
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

{{< code-block lang="bash" >}}
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

{{< code-block lang="bash" >}}
$(./run-tests.sh); export tests_exit_code=$?
datadog-ci junit upload --service service_name ./junit.xml
if [ $tests_exit_code -ne 0 ]; then exit $tests_exit_code; fi
{{< /code-block >}}

{{% /tab %}}

{{< /tabs >}}

**Note:** Reports larger than 250 MiB may not be processed completely, resulting in missing tests or logs. For the best experience ensure that the reports are under 250 MiB.

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

`--xpath-tag`
: Key and xpath expression in the form `key=expression`. These provide a way to customize tags for test in the file (the `--xpath-tag` parameter can be specified multiple times).<br/>
See [Providing metadata with XPath expressions][9] for more details on the supported expressions.<br/>
**Default**: (none)<br/>
**Example**: `test.suite=/testcase/@classname`<br/>
**Note**: Tags specified using `--xpath-tag` and with `--tags` or `DD_TAGS` environment variable are merged. xpath-tag gets the highest precedence, as the value is usually different for each test.

`--logs` **(beta)**
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

Positional arguments
: The file paths or directories in which the JUnit XML reports are located. If you pass a directory, the CLI looks for all `.xml` files in it.

The following environment variables are supported:

`DATADOG_API_KEY` (Required)
: [Datadog API key][5] used to authenticate the requests.<br/>
**Default**: (none)

Additionally, configure the Datadog site to use the selected one ({{< region-param key="dd_site_name" >}}):

`DATADOG_SITE` (Required)
: The [Datadog site][7] to upload results to.<br/>
**Default**: `datadoghq.com`<br/>
**Selected site**: {{< region-param key="dd_site" code="true" >}}

## Collecting repository and commit metadata

Datadog uses Git information for visualizing your test results and grouping them by repository and commit. Git metadata is collected by the Datadog CI CLI from CI provider environment variables and the local `.git` folder in the project path, if available. To read this directory, the [`git`][8] binary is required.

If you are running tests in non-supported CI providers or with no `.git` folder, you can set the Git information manually using environment variables. These environment variables take precedence over any auto-detected information. Set the following environment variables to provide Git information:

`DD_GIT_REPOSITORY_URL`
: URL of the repository where the code is stored. Both HTTP and SSH URLs are supported.<br/>
**Example**: `git@github.com:MyCompany/MyApp.git`, `https://github.com/MyCompany/MyApp.git`

`DD_GIT_BRANCH`
: Git branch being tested. Leave empty if providing tag information instead.<br/>
**Example**: `develop`

`DD_GIT_TAG`
: Git tag being tested (if applicable). Leave empty if providing branch information instead.<br/>
**Example**: `1.0.1`

`DD_GIT_COMMIT_SHA`
: Full commit hash.<br/>
**Example**: `a18ebf361cc831f5535e58ec4fae04ffd98d8152`

`DD_GIT_COMMIT_MESSAGE`
: Commit message.<br/>
**Example**: `Set release number`

`DD_GIT_COMMIT_AUTHOR_NAME`
: Commit author name.<br/>
**Example**: `John Smith`

`DD_GIT_COMMIT_AUTHOR_EMAIL`
: Commit author email.<br/>
**Example**: `john@example.com`

`DD_GIT_COMMIT_AUTHOR_DATE`
: Commit author date in ISO 8601 format.<br/>
**Example**: `2021-03-12T16:00:28Z`

`DD_GIT_COMMIT_COMMITTER_NAME`
: Commit committer name.<br/>
**Example**: `Jane Smith`

`DD_GIT_COMMIT_COMMITTER_EMAIL`
: Commit committer email.<br/>
**Example**: `jane@example.com`

`DD_GIT_COMMIT_COMMITTER_DATE`
: Commit committer date in ISO 8601 format.<br/>
**Example**: `2021-03-12T16:00:28Z`

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


## Providing metadata with XPath expressions

In addition to the `--tags` CLI parameter and the `DD_TAGS` environment variable, which apply custom tags globally to all tests included the uploaded XML report, the `--xpath-tag` parameter provides custom rules to add tags from different attributes within the XML to each test.

The parameter provided must have the format `key=expression`, where `key` is the name of the custom tag to be added and `expression` is a valid [XPath][10] expression within the ones supported.

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

{{< code-block lang="bash" >}}
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

{{< code-block lang="bash" >}}
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

{{< code-block lang="bash" >}}
datadog-ci junit upload --service service_name \
  --xpath-tag custom_tag=/testcase/..//property[@name=\'prop\'] ./junit.xml
{{< /code-block >}}

**Note:** The name must be in quotes. Bash requires quotes to be escaped using a backslash, for example `[@name='prop']` must be entered as `[@name=\'prop\'].
{{% /tab %}}

{{< /tabs >}}

## Providing metadata through `<property>` elements

Another way to provide additional tags to specific tests is including `<property name="dd_tags[key]" value="value">` elements within the `<testsuite>` or `<testcase>` elements. If you add these tags to a `<testcase>` element, they are stored in its test span. If you add the tags to a `<testsuite>` element, they are stored in all of that suite's test spans.

To be processed, the `name` attribute in the `<property>` element must have the format `dd_tags[key]`, where `key` is the name of the custom tag to be added. Other properties are ignored.

**Example**: Adding tags to a `<testcase>` element

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

**Example**: Adding tags to a `<testsuite>` element

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

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://junit.org/junit5/
[2]: https://docs.datadoghq.com/continuous_integration/tests/
[3]: https://www.npmjs.com/package/@datadog/datadog-ci
[4]: https://github.com/DataDog/datadog-ci/releases
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: /logs/
[7]: /getting_started/site/
[8]: https://git-scm.com/downloads
[9]: #providing-metadata-with-xpath-expressions
[10]: https://www.w3schools.com/xml/xpath_syntax.asp
