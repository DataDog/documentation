---
title: Bazel Rules for Go Tests
description: Configure Test Optimization for Go test targets in Bazel.
code_lang: go
type: multi-code-lang
code_lang_weight: 60
further_reading:
    - link: "/tests/setup/bazel/"
      tag: "Documentation"
      text: "Configure Test Optimization with Bazel"
    - link: "/tests/explorer/"
      tag: "Documentation"
      text: "Explore Test Results and Performance"
    - link: "/tests/troubleshooting/"
      tag: "Documentation"
      text: "Troubleshooting Test Optimization"
---


Datadog provides official Bazel rules for Go Test Optimization. Guided bootstrap writes a local `dd_go_test` wrapper, managed `rules_go` and Orchestrion wiring, and a Bazel config for Test Optimization. Use `dd_go_test` in package `BUILD.bazel` files after running bootstrap. Use `dd_topt_go_test` directly when you maintain your own wrapper or need to set Datadog attributes such as `orchestrion_mode`.

## Compatibility

The Go Bazel rule supports two Orchestrion modes:

| Mode | Use when |
|---|---|
| `test_optimization` | You want the faster Test Optimization path for tests that use the standard library `testing` package. Guided bootstrap configures this mode. |
| `general` | Your test target needs the broader Orchestrion path, such as tests that use frameworks or patterns outside the standard library `testing` package. |

Use the following minimum versions:

| Component | Version |
|---|---|
| `datadog-rules-test-optimization` | `>=1.3.0` |
| `datadog-rules-test-optimization-go` | `>=1.3.0` |
| `rules_go` | `0.60.0` by default, or `0.61.1` with the `v0_61_1` support line |
| `dd-trace-go` | `>=v2.9.0` |
| Orchestrion | `>=v1.9.0` |

## Prerequisites

Before setting up Test Optimization for Go tests in Bazel:

- Configure a Datadog API key in your CI secret store.
- Set `DD_SITE` to your Datadog site, such as `datadoghq.com`.
- Use a Bazel workspace that can resolve the `datadog-rules-test-optimization` module.
- Use Go modules for the Go package under test.

## Add modules

Add the core module, the Go companion module, and `rules_go` to `MODULE.bazel`:

```starlark
bazel_dep(name = "datadog-rules-test-optimization", version = "1.3.0")
git_override(
    module_name = "datadog-rules-test-optimization",
    remote = "https://github.com/DataDog/rules_test_optimization.git",
    commit = "<RULES_TEST_OPTIMIZATION_RELEASE_COMMIT>",
)

bazel_dep(name = "datadog-rules-test-optimization-go", version = "1.3.0")
git_override(
    module_name = "datadog-rules-test-optimization-go",
    remote = "https://github.com/DataDog/rules_test_optimization.git",
    commit = "<RULES_TEST_OPTIMIZATION_RELEASE_COMMIT>",
    strip_prefix = "modules/go",
)

bazel_dep(name = "rules_go", version = "0.60.0")
```

Use the same release commit SHA for the core module and the Go companion module.

Guided bootstrap writes a managed `rules_go` override and Orchestrion extension block to `MODULE.bazel`. If you do not run guided bootstrap, add the managed block manually:

```starlark
git_override(
    module_name = "rules_go",
    remote = "https://github.com/DataDog/rules_test_optimization.git",
    commit = "<RULES_TEST_OPTIMIZATION_RELEASE_COMMIT>",
    strip_prefix = "third_party/rgo/v0_60_0/base",
)

orchestrion = use_extension("@rules_go//go:extensions.bzl", "orchestrion")
orchestrion.from_source(
    version = "v1.9.0",
    dd_trace_go_version = "v2.9.0",
)
use_repo(orchestrion, "rules_go_orchestrion_tool")
```

If your repository uses `rules_go` `0.61.1`, set `bazel_dep(name = "rules_go", version = "0.61.1")` and use `strip_prefix = "third_party/rgo/v0_61_1/base"` for the managed `rules_go` override.

## Use `WORKSPACE` mode

If Bzlmod is disabled, declare the core repository in `WORKSPACE`. Then use the public Go helper to declare the Go companion repository and the Orchestrion-enabled `rules_go` fork:

```starlark
load("@bazel_tools//tools/build_defs/repo:git.bzl", "git_repository")

git_repository(
    name = "datadog-rules-test-optimization",
    remote = "https://github.com/DataDog/rules_test_optimization.git",
    commit = "<RULES_TEST_OPTIMIZATION_RELEASE_COMMIT>",
)

load(
    "@datadog-rules-test-optimization//tools/go:workspace_repositories.bzl",
    "datadog_go_test_optimization_workspace_repositories",
)

datadog_go_test_optimization_workspace_repositories(
    rto_commit = "<RULES_TEST_OPTIMIZATION_RELEASE_COMMIT>",
    rules_go_repo_name = "io_bazel_rules_go",
)
```

The helper uses the default `rules_go` `0.60.0` support line. If your repository uses `rules_go` `0.61.1`, set `rules_go_upstream = "v0_61_1"` in the `datadog_go_test_optimization_workspace_repositories(...)` call.

## Run guided bootstrap

For a single-service Go workspace, run the guided bootstrap:

```bash
bazel run @datadog-rules-test-optimization-go//:dd_topt_go_bootstrap -- \
  --guided \
  --service <SERVICE_NAME> \
  --runtime-version 1.25.0 \
  --write-bazelrc
```

The bootstrap creates local wrapper targets, managed Bzlmod wiring, and a managed `.bazelrc` config named `test-optimization`. By default, bootstrap uses targeted Go module sync. This updates the Orchestrion and `dd-trace-go` tool requirements without running `go mod tidy` for the whole module. Pass `--dd-trace-go-version` only when your repository must use a different supported `dd-trace-go` version.

If your Go module lives below the workspace root, pass its path:

```bash
bazel run @datadog-rules-test-optimization-go//:dd_topt_go_bootstrap -- \
  --guided \
  --service <SERVICE_NAME> \
  --runtime-version 1.25.0 \
  --go-module-dir path/to/go-module \
  --write-bazelrc
```

## Configure test targets

After bootstrap writes the local wrapper, use the generated `dd_go_test` wrapper in package `BUILD.bazel` files. The wrapper calls `dd_topt_go_test` with `orchestrion_mode = "test_optimization"` and the bootstrap-managed Orchestrion pin files:

```starlark
load("@rules_go//go:def.bzl", "go_library")
load("//tools/build:dd_go_test.bzl", "dd_go_test")

go_library(
    name = "pkg_lib",
    srcs = ["main.go"],
)

dd_go_test(
    name = "pkg_go_test",
    srcs = ["main_test.go"],
    embed = [":pkg_lib"],
)
```

Use `embed = [":pkg_lib"]` so the macro can infer the Go import path from `rules_go` providers and select the matching per-module Test Optimization metadata.

If you use a manual wrapper instead of guided bootstrap, call `dd_topt_go_test` and set `orchestrion_mode = "test_optimization"` for the faster standard-library `testing` path:

```starlark
load("@rules_go//go:def.bzl", "go_library")
load("@datadog-rules-test-optimization-go//:topt_go_test.bzl", "dd_topt_go_test")
load("@test_optimization_data//:export.bzl", "topt_data")

go_library(
    name = "pkg_lib",
    srcs = ["main.go"],
)

dd_topt_go_test(
    name = "pkg_go_test",
    srcs = ["main_test.go"],
    embed = [":pkg_lib"],
    orchestrion_mode = "test_optimization",
    topt_data = topt_data,
)
```

For nested packages, pass module-root pin files with `orchestrion_pin_files` when the BUILD file does not live beside `go.mod`.

For tests that need the broader Orchestrion path, set `orchestrion_mode = "general"` in your manual wrapper or repo-local wrapper:

```starlark
dd_topt_go_test(
    name = "pkg_go_test",
    srcs = ["main_test.go"],
    embed = [":pkg_lib"],
    orchestrion_mode = "general",
    topt_data = topt_data,
)
```

## Run and validate tests

Guided bootstrap writes the managed Bazel config. If you maintain `.bazelrc` manually, add the following test config:

```text
common:test-optimization --repo_env=DD_API_KEY
common:test-optimization --repo_env=DD_SITE
common:test-optimization --repo_env=DD_GIT_REPOSITORY_URL
common:test-optimization --repo_env=DD_GIT_BRANCH
common:test-optimization --repo_env=DD_GIT_TAG
common:test-optimization --repo_env=DD_GIT_COMMIT_SHA
common:test-optimization --repo_env=DD_PR_NUMBER
test:test-optimization --remote_download_minimal
test:test-optimization --remote_download_regex=.*test[.]outputs.*
test:test-optimization --zip_undeclared_test_outputs
```

Run tests with the generated Bazel config:

```bash
bazel test --config=test-optimization //...
bazel run --config=test-optimization //:dd_test_optimization_doctor
bazel run --config=test-optimization //:dd_upload_payloads -- --dry-run --validate-enrichment
DD_API_KEY=<DATADOG_API_KEY> DD_SITE=<DATADOG_SITE> bazel run --config=test-optimization //:dd_upload_payloads
```

For CI with remote cache or remote execution, pass a unique BEP file from each `bazel test` invocation to the doctor and uploader. See the [Bazel upload flow][3].

You do not need to set the Test Optimization runtime variables manually. The `dd_topt_go_test` macro adds them to the generated test target, including:

`DD_CIVISIBILITY_ENABLED`
: Enables Test Optimization for the Go test process.

`DD_TEST_OPTIMIZATION_MANIFEST_FILE`
: Points the Go test process to the synced Test Optimization metadata.

`DD_TEST_OPTIMIZATION_PAYLOADS_IN_FILES`
: Configures payloads to be written as JSON files under `TEST_UNDECLARED_OUTPUTS_DIR`.

If you pass an `env` attribute to `dd_topt_go_test`, keep these variables reserved for the macro.

## Large repositories

For large WORKSPACE repositories, use bootstrap `--workspace-mode` to print repository wiring and write local scaffolding without editing `WORKSPACE`:

```bash
bazel run @datadog-rules-test-optimization-go//:dd_topt_go_bootstrap -- \
  --workspace-mode \
  --print-workspace-snippet \
  --service <SERVICE_NAME> \
  --runtime-version 1.25.0 \
  --sync-repo-name test_optimization_data \
  --rto-commit <RULES_TEST_OPTIMIZATION_RELEASE_COMMIT> \
  --rules-go-repo-name io_bazel_rules_go
```

If your repository uses `rules_go` `0.61.1`, pass `--rules-go-upstream v0_61_1`.

Keep repository-specific scheduling, tags, flaky policy, Docker defaults, and platform constraints in your local wrapper. The optimized wrapper should own only Test Optimization wiring, Orchestrion mode, and pin files.

## Known limitations

- [Test Impact Analysis][1] for Bazel is not supported.
- Automatic [coverage configuration][2] for Bazel is not supported.
- The faster `test_optimization` mode supports tests that use the standard library `testing` package. Use `general` mode for tests that need the broader Orchestrion path.
- Go module pins and Bazel tracer pins must resolve to the same `dd-trace-go` versions.

## Troubleshooting

### The doctor reports missing payloads

This can happen when the instrumented test target did not run. It can also happen when test outputs were not downloaded locally, or when the test target uses the raw `go_test` rule instead of the Datadog wrapper.

To fix this issue:

1. Run the exact `dd_go_test` or `dd_topt_go_test` target before running the doctor.
1. For remote execution, use the BEP-based upload flow on the [Bazel setup page][3].
1. Confirm the target uses `orchestrion_mode = "test_optimization"` or `orchestrion_mode = "general"` when using `dd_topt_go_test` directly.

### The doctor reports `full_bundle_no_match`

This can happen when the macro cannot map the Go test target to a per-module metadata bundle.

To fix this issue, prefer `go_library` plus `embed = [":pkg_lib"]` so the macro can infer the same import path that `rules_go` uses. Use `module_label_override` only when the expected module label is known.

### Go builds fail with a tracer version mismatch

This can happen when Bazel and the local Go module resolve different `dd-trace-go` versions.

To fix this issue, rerun bootstrap with the `dd-trace-go` version used by your workspace:

```bash
bazel run @datadog-rules-test-optimization-go//:dd_topt_go_bootstrap -- \
  --dd-trace-go-version v2.9.0
```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tests/test_impact_analysis/
[2]: /code_coverage/configuration/
[3]: /tests/setup/bazel/#upload-payloads
