---
title: Go Tests
code_lang: go
type: multi-code-lang
code_lang_weight: 10
aliases:
  - /continuous_integration/setup_tests/go
  - /continuous_integration/tests/go
  - /continuous_integration/tests/setup/go
further_reading:
    - link: "/continuous_integration/tests/containers/"
      tag: "Documentation"
      text: "Forwarding Environment Variables for Tests in Containers"
    - link: "/continuous_integration/tests"
      tag: "Documentation"
      text: "Explore Test Results and Performance"
    - link: "/tests/test_impact_analysis/go"
      tag: "Documentation"
      text: "Speed up your test jobs with Test Impact Analysis"
    - link: "/continuous_integration/troubleshooting/"
      tag: "Documentation"
      text: "Troubleshooting CI Visibility"
---

## Compatibility

Supported test frameworks:

- `testing` package
- [Testify][3] suites

`ddtest instrument` requires a Go 1.25 or later toolchain and runs on Linux, macOS, and Windows. The `go.mod` file of your project can declare Go 1.21 or later. If your project depends on `github.com/DataDog/dd-trace-go/v2`, use v2.10.0 or later.

<div class="alert alert-info">If you use Bazel to run Go tests, use the Datadog <a href="/tests/setup/bazel/go/">Bazel rules for Go tests</a>.</div>

## Configuring reporting method

To report test results to Datadog, configure how `ddtest instrument` sends them:

{{< tabs >}}

{{% tab "CI Provider with Auto-Instrumentation Support" %}}
{{% ci-autoinstrumentation %}}
{{% /tab %}}

{{% tab "Cloud CI Provider" %}}
{{% ci-agentless %}}
{{% /tab %}}

{{% tab "On-Premises CI Provider" %}}
{{% ci-agent %}}
{{% /tab %}}

{{< /tabs >}}

## Installing ddtest

`ddtest` is a Datadog command-line tool. Its `ddtest instrument` command adds Test Optimization to Go tests at compilation time, without adding dependencies to your project or changing your source code or `go.mod` file.

Install `ddtest` from its [latest release][1]:

```bash
curl -fsSL https://github.com/DataDog/ddtest/releases/latest/download/install.sh | bash
```

In PowerShell, run:

```powershell
irm https://github.com/DataDog/ddtest/releases/latest/download/install.ps1 | iex
```

The install scripts place the executable in `~/.local/bin` and check it against the `SHA256SUMS` file of the release. Add this directory to your `PATH`. In GitHub Actions, the scripts add it for later steps.

To pin a release in CI, pass `--version`:

```bash
curl -fsSL https://github.com/DataDog/ddtest/releases/latest/download/install.sh | bash -s -- --version v1.14.0
```

## Instrumenting tests

To configure `ddtest instrument`, set the following environment variables before starting the test process. For parallel test runners, set them on the parent process so every worker inherits them.

`DD_SERVICE` (Optional)
: Name of the service or library under test.<br/>
**Default**: The repository name

`DD_ENV` (Optional)
: Name of the environment where tests are being run.<br/>
**Default**: `(empty)`<br/>
**Examples**: `local`, `ci`

`DD_CIVISIBILITY_AGENTLESS_ENABLED=true` (Required for Agentless mode)
: Enables Agentless mode to send test results directly to Datadog.<br/>
**Default**: `false`

`DD_API_KEY` (Required for Agentless mode)
: The Datadog API key used to authenticate test result uploads. This variable does not enable Agentless mode.<br/>
**Default**: `(empty)`

`DD_SITE` (Optional for Agentless mode)
: The [Datadog site][2] to upload test results to. Set this configuration when using a site other than US1.<br/>
**Default**: `datadoghq.com`

`DD_TRACE_AGENT_URL` (Only when using the Datadog Agent)
: The Datadog Agent URL for trace collection, in the form `http://hostname:port`.<br/>
**Default**: `http://localhost:8126`

`DD_TEST_SESSION_NAME` (Optional)
: Identifies a group of tests, such as `unit-tests`, `integration-tests`, or `smoke-tests`.<br/>
**Default**: The CI job name and test command, or the test command if the CI job name is unavailable.<br/>
**Example**: `unit-tests`, `integration-tests`, `smoke-tests`

Add `ddtest instrument` in front of your `go test` command, from the Go module that you want to test:

```bash
ddtest instrument go test -race ./...
```

The command keeps the output, exit status, and test cache of `go test`. A package whose result comes from the Go test cache does not report tests. To report every test on every run, add `-count=1`:

```bash
ddtest instrument go test -count=1 ./...
```

For more options, see the [`ddtest instrument` documentation][4].

### Test wrappers

If you run tests with gotestsum, add `ddtest instrument` in front of the gotestsum command:

```bash
ddtest instrument gotestsum --format testname -- ./...
ddtest instrument go tool gotestsum -- ./...
```

For other commands that run `go test`, such as `make` or a script, use the `--go-shim` option:

```bash
ddtest instrument --go-shim make test
```

With `--go-shim`, only a `go` command found on `PATH` reports test results. A script that runs `$GOROOT/bin/go` by its full path, or that sets its own `PATH`, runs `go test` without Test Optimization.

### Migrating from Orchestrion

If you run tests with `orchestrion go test`, replace the command with `ddtest instrument go test`. If you only use Orchestrion for Test Optimization, you can also delete the `orchestrion.tool.go` file and remove the Orchestrion requirement from `go.mod`.

If you also use Orchestrion to trace the application under test, first upgrade `github.com/DataDog/dd-trace-go/v2` to v2.10.0 or later. Keep Orchestrion and add `ddtest instrument` in front of the command:

```bash
ddtest instrument orchestrion go test ./...
```

`ddtest instrument` reports the tests, and Orchestrion instruments the application. By default, `dd-trace-go` spans created during a test join the trace of the test and go to Test Optimization only. To also send them to APM, set `DD_CIVISIBILITY_APM_SPANS_ENABLED=true`.

## Known limitations

- A `go test` command that names test files directly, such as `go test foo_test.go`, runs without instrumentation and prints a warning.
- Tests of the Go standard library are not supported.

[1]: https://github.com/DataDog/ddtest/releases/latest
[2]: /getting_started/site/
[3]: https://github.com/stretchr/testify
[4]: https://github.com/DataDog/ddtest/tree/main/ddto#readme

## Further reading
{{< partial name="whats-next/whats-next.html" >}}
