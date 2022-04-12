---
title: Uploading JUnit test report files to Datadog
kind: documentation
further_reading:
    - link: "/continuous_integration/explore_tests"
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

JUnit test report files are XML files that contain test execution information, such as test and suite names, pass/fail status, duration, and sometimes error logs. Although it was introduced by the [JUnit][1] testing framework, many other popular frameworks are able to output results using this format.

As an alternative to instrumenting your tests natively using Datadog tracers, which is the recommended option as it provides the most comprehensive test results, you can also upload JUnit XML test reports.

Test results imported from JUnit XML reports appear alongside test data reported by tracers. However, there are some limitations when using this method, such as the lack of distributed traces on integration tests or structured stack traces. For this reason, only use this method if there is no native support for the language or testing framework being used.

## Installing the Datadog CI CLI

Install the [`datadog-ci`][2] CLI globally using `npm`:

{{< code-block lang="bash" >}}
npm install -g @datadog/datadog-ci
{{< /code-block >}}

### Standalone binary (beta)

<div class="alert alert-warning"><strong>Note</strong>: The standalone binaries are in <strong>beta</strong> and their stability is not guaranteed.</div>

If installing NodeJS in the CI is an issue, standalone binaries are provided with [Datadog CI releases][3]. Only _linux-x64_, _darwin-x64_ (MacOS) and _win-x64_ (Windows) are supported. To install, run the following from your terminal:

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

Specify a valid [Datadog API key][4] in the `DATADOG_API_KEY` environment variable, and the environment where tests were run (for example, `local` when uploading results from a developer workstation, or `ci` when uploading them from a CI provider) in the `DD_ENV` environment variable. For example:

<pre>
<code>
DD_ENV=ci DATADOG_API_KEY=&lt;api_key&gt; DATADOG_SITE={{< region-param key="dd_site" >}} datadog-ci junit upload \
  --service my-api-service \
  unit-tests/junit-reports e2e-tests/single-report.xml
</code>
</pre>

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

`--logs` **(beta)**
: Enable forwarding content from the XML reports as [Logs][7]. The content inside `<system-out>`, `<system-err>`, `<failure>` will be loaded. Logs from elements inside a `<testcase>` are automatically connected to test.<br/>
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
: [Datadog API key][4] used to authenticate the requests.<br/>
**Default**: (none)

Additionally, configure the Datadog site to use the selected one ({{< region-param key="dd_site_name" >}}):

`DATADOG_SITE` (Required)
: The [Datadog site][5] to upload results to.<br/>
**Default**: `datadoghq.com`<br/>
**Selected site**: {{< region-param key="dd_site" code="true" >}}

`DD_CIVISIBILITY_LOGS_ENABLED` **(beta)**
: Same as the `--logs` flag: Enable forwarding content from the XML reports as [Logs][7]. The content inside `<system-out>`, `<system-err>`, `<failure>` will be loaded. Logs from elements inside a `<testcase>` are automatically connected to test.<br/>
**Default**: `false`

## Collecting repository and commit metadata

Datadog uses Git information for visualizing your test results and grouping them by repository and commit. Git metadata is collected by the Datadog CI CLI from CI provider environment variables and the local `.git` folder in the project path, if available. To read this directory, the [`git`][6] binary is required.

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

<!-- TODO: uncomment once added in backend
`test.bundle`
: Used to execute groups of test suites separately.<br/>
**Examples**: `ApplicationUITests`, `ModelTests` -->

## Providing metadata through `<property>` elements

In addition to the `--tags` CLI parameter and the `DD_TAGS` environment variable, which apply custom tags globally to all tests included the uploaded XML report, you can provide additional tags to specific tests by including `<property name="dd_tags[key]" value="value">` elements within the `<testsuite>` or `<testcase>` elements. If you add these tags to a `<testcase>` element, they are stored in its test span. If you add the tags to a `<testsuite>` element, they are stored in all of that suite's test spans.

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
[2]: https://www.npmjs.com/package/@datadog/datadog-ci
[3]: https://github.com/DataDog/datadog-ci/releases
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: /getting_started/site/
[6]: https://git-scm.com/downloads
[7]: /logs/
