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


Datadog provides official Bazel rules for Go Test Optimization. The rules build each instrumented test with a Go SDK that [`ddtest instrument`][3] prepares. Your Go module needs no Datadog requirement in `go.mod`, and the instrumentation needs no Go installation on the host. Guided bootstrap writes a local `dd_go_test` wrapper that calls Datadog's `dd_topt_go_test` macro with the recommended Test Optimization defaults. Use `dd_go_test` in package `BUILD.bazel` files after running bootstrap. Use `dd_topt_go_test` directly when you maintain your own wrapper.

## Compatibility

Supported test frameworks:

- `testing` package
- [Testify][4] suites

Use the following minimum versions:

| Component | Version |
|---|---|
| `datadog-rules-test-optimization` | `>=2.0.0` |
| `datadog-rules-test-optimization-go` | `>=2.0.0` |
| `rules_go` | `>=0.59.0` |
| Go | `>=1.25.0` |
| `github.com/DataDog/dd-trace-go/v2`, if your project depends on it | `>=2.10.0` |

The rules pin the `ddtest` release that they use, so you do not need to install `ddtest`.

## Prerequisites

Before setting up Test Optimization for Go tests in Bazel:

- Configure a Datadog API key in your CI secret store.
- Set `DD_SITE` to your Datadog site, such as `datadoghq.com`.
- Use a Bazel workspace that can resolve the `datadog-rules-test-optimization` module.
- Use Go modules for the Go package under test.

## Add modules

Add the core module, the Go companion module, and `rules_go` to `MODULE.bazel`:

```starlark
bazel_dep(name = "datadog-rules-test-optimization", version = "2.0.0")
archive_override(
    module_name = "datadog-rules-test-optimization",
    urls = ["https://github.com/DataDog/rules_test_optimization/releases/download/v2.0.0/rules_test_optimization-2.0.0.tar.gz"],
    sha256 = "2d319918047c031c6e02561e31879681c3c3f999bf8e682c3d4ab1792d021b3f",
    strip_prefix = "rules_test_optimization-2.0.0",
)

bazel_dep(name = "datadog-rules-test-optimization-go", version = "2.0.0")
archive_override(
    module_name = "datadog-rules-test-optimization-go",
    urls = ["https://github.com/DataDog/rules_test_optimization/releases/download/v2.0.0/rules_test_optimization-2.0.0.tar.gz"],
    sha256 = "2d319918047c031c6e02561e31879681c3c3f999bf8e682c3d4ab1792d021b3f",
    strip_prefix = "rules_test_optimization-2.0.0/modules/go",
)

bazel_dep(name = "rules_go", version = "0.60.0")
```

Use the same archive and checksum for the core module and the Go companion module.

## Use `WORKSPACE` mode

If Bzlmod is disabled, declare upstream `rules_go` as `io_bazel_rules_go`, then the core repository. Use the public Go helper to declare the Go companion repository. After the `rules_go` setup, call `topt_go_ddtest_workspace_repositories` to declare the instrumented Go SDK and register its toolchains:

```starlark
load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")

http_archive(
    name = "io_bazel_rules_go",
    integrity = "sha256-htPcj1nSU1JPkzqvLzwFiWywtgX8NbRgwLSwOZlhJMY=",
    urls = ["https://github.com/bazel-contrib/rules_go/releases/download/v0.60.0/rules_go-v0.60.0.zip"],
)

http_archive(
    name = "datadog-rules-test-optimization",
    urls = ["https://github.com/DataDog/rules_test_optimization/releases/download/v2.0.0/rules_test_optimization-2.0.0.tar.gz"],
    sha256 = "2d319918047c031c6e02561e31879681c3c3f999bf8e682c3d4ab1792d021b3f",
    strip_prefix = "rules_test_optimization-2.0.0",
)

load(
    "@datadog-rules-test-optimization//tools/go:workspace_repositories.bzl",
    "datadog_go_test_optimization_workspace_repositories",
)

datadog_go_test_optimization_workspace_repositories(
    rto_commit = "4ee137661f3c1c5360cf5e9a35b286f280837779",
    datadog_fetch = "archive",
    rto_archive_url = "https://github.com/DataDog/rules_test_optimization/releases/download/v2.0.0/rules_test_optimization-2.0.0.tar.gz",
    rto_archive_sha256 = "2d319918047c031c6e02561e31879681c3c3f999bf8e682c3d4ab1792d021b3f",
    rto_archive_prefix = "rules_test_optimization-2.0.0",
)

load("@io_bazel_rules_go//go:deps.bzl", "go_register_toolchains", "go_rules_dependencies")

go_rules_dependencies()

load("@rules_shell//shell:repositories.bzl", "rules_shell_dependencies", "rules_shell_toolchains")

rules_shell_dependencies()

rules_shell_toolchains()

go_register_toolchains(version = "1.25.0")

load(
    "@datadog-rules-test-optimization-go//:topt_go_ddtest_repository.bzl",
    "topt_go_ddtest_workspace_repositories",
)

topt_go_ddtest_workspace_repositories(go_version = "1.25.0")
```

The instrumented Go SDK repositories load `rules_go` under the `io_bazel_rules_go` name, so the helper fails with any other name. To generate the remaining setup, run bootstrap with `--workspace-mode`, as described in [Large repositories](#large-repositories).

## Run guided bootstrap

For a single-service Go workspace, run the guided bootstrap:

```bash
bazel run @datadog-rules-test-optimization-go//:dd_topt_go_bootstrap -- \
  --guided \
  --service <SERVICE_NAME> \
  --runtime-version 1.25.0 \
  --write-bazelrc
```

The bootstrap creates local wrapper targets and a managed `.bazelrc` config named `test-optimization`. It does not change your Go module or run Go commands.

The bootstrap also adds a managed block to `MODULE.bazel` that selects the Go SDK to instrument. `--runtime-version` sets the Go version of that SDK:

```starlark
topt_go_ddtest = use_extension(
    "@datadog-rules-test-optimization-go//:topt_go_ddtest_extension.bzl",
    "topt_go_ddtest",
)
topt_go_ddtest.sdk(go_version = "1.25.0")
```

If you do not use bootstrap, add these lines to the root `MODULE.bazel`, and set up the metadata sync, the `test-optimization` Bazel config, and the doctor and uploader targets as the [installation reference][5] describes. To read the Go version from a `go.mod` file instead, use `topt_go_ddtest.sdk(go_mod = "//:go.mod")`. The directory of the `go.mod` file must be a Bazel package.

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

After bootstrap writes the local wrapper, use the generated `dd_go_test` wrapper in package `BUILD.bazel` files. The wrapper calls `dd_topt_go_test`:

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

In `WORKSPACE` mode, load `go_library` from `@io_bazel_rules_go//go:def.bzl`.

Use `embed = [":pkg_lib"]` so the macro can infer the Go import path from `rules_go` providers and select the matching per-module Test Optimization metadata.

If you use a manual wrapper instead of guided bootstrap, call `dd_topt_go_test`:

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
    topt_data = topt_data,
)
```

## Run and validate tests

Run tests with the generated Bazel config. The config zips test outputs, so the doctor and the uploader read them through the build event file of the test run:

```bash
BEP_FLAGS="--bep-json=$PWD/bep.json --freshness-source=bep --freshness-mode=required --artifact-source=bep --artifact-staging-dir=$PWD/.topt/artifacts"
bazel test --config=test-optimization --build_event_json_file="$PWD/bep.json" //...
bazel run --config=test-optimization //:dd_test_optimization_doctor -- $BEP_FLAGS
bazel run --config=test-optimization //:dd_upload_payloads -- $BEP_FLAGS --dry-run --validate-enrichment
DD_API_KEY=<DATADOG_API_KEY> DD_SITE=<DATADOG_SITE> bazel run --config=test-optimization //:dd_upload_payloads -- $BEP_FLAGS
```

The doctor and the uploader only accept results from tests that ran in this invocation. If every test result comes from the Bazel cache, the doctor reports that there is nothing fresh to validate.

You do not need to set the Test Optimization runtime variables manually. The `dd_topt_go_test` macro adds them to the generated test target, including:

`DD_CIVISIBILITY_ENABLED`
: Enables Test Optimization for the Go test process.

`DD_TEST_OPTIMIZATION_MANIFEST_FILE`
: Points the Go test process to the synced Test Optimization metadata.

`DD_TEST_OPTIMIZATION_PAYLOADS_IN_FILES`
: Configures payloads to be written as JSON files under `TEST_UNDECLARED_OUTPUTS_DIR`.

If you pass an `env` attribute to `dd_topt_go_test`, keep these variables reserved for the macro.

## Large repositories

For large WORKSPACE repositories, use bootstrap `--workspace-mode` to print the full repository wiring. Keep your `io_bazel_rules_go` declaration, and use the rest in place of the block in [Use `WORKSPACE` mode](#use-workspace-mode), because the helper fails if the Go companion repository is already declared. The output does not include the `rules_shell` calls, so keep them after `go_rules_dependencies()`:

```bash
bazel run @datadog-rules-test-optimization-go//:dd_topt_go_bootstrap -- \
  --workspace-mode \
  --print-workspace-snippet \
  --service <SERVICE_NAME> \
  --runtime-version 1.25.0 \
  --sync-repo-name test_optimization_data \
  --rto-commit 4ee137661f3c1c5360cf5e9a35b286f280837779 \
  --datadog-fetch archive \
  --rto-archive-url https://github.com/DataDog/rules_test_optimization/releases/download/v2.0.0/rules_test_optimization-2.0.0.tar.gz \
  --rto-archive-sha256 2d319918047c031c6e02561e31879681c3c3f999bf8e682c3d4ab1792d021b3f \
  --rto-archive-prefix rules_test_optimization-2.0.0
```

Then run bootstrap without `--print-workspace-snippet` to write the local scaffolding. Bootstrap does not edit `WORKSPACE`:

```bash
bazel run @datadog-rules-test-optimization-go//:dd_topt_go_bootstrap -- \
  --workspace-mode \
  --service <SERVICE_NAME> \
  --runtime-version 1.25.0 \
  --sync-repo-name test_optimization_data \
  --write-bazelrc \
  --write-wrapper-template \
  --wrapper-file dd_go_test.bzl
```

Bootstrap does not create the doctor and uploader targets in this mode. Define one pair in a lightweight package such as `//tools/test_optimization`, and use those labels instead of the root targets in [Run and validate tests](#run-and-validate-tests). Use `--write-root-targets` only in small repositories that keep these targets in the root `BUILD` file.

Keep repository-specific scheduling, tags, flaky policy, Docker defaults, and platform constraints in your local wrapper. The optimized wrapper should own only Test Optimization wiring.

### Instrument an existing Go SDK

By default, the rules download the official Go SDK for each exec platform. To instrument an SDK that your repository already declares, map each exec platform to a file at the root of that SDK. Set `go_version` to the version of that SDK:

```starlark
topt_go_ddtest.sdk(
    base_sdk_roots = {"linux_amd64": "@<GO_SDK_REPOSITORY>//:ROOT"},
    exec_platforms = ["linux_amd64"],
    go_version = "1.25.0",
)
```

If the SDK uses Go experiments, list them in `experiments`. In `WORKSPACE` mode, pass the same arguments to `topt_go_ddtest_workspace_repositories`.

### Add SDK variants

An instrumented test builds every Go target below it with an instrumented SDK, including binaries in `data` and exec tools. The default SDK serves targets that do not set an `sdk_version`, and values that match its `go_version`, such as `1`, `1.25`, and `1.25.0`.

If a target below an instrumented test selects another SDK, such as `go_cross_binary(sdk_version = "1.25.0fips")`, add an SDK variant with the same `sdk_version`:

```starlark
topt_go_ddtest.sdk(
    experiments = ["boringcrypto"],
    go_version = "1.25.0",
    sdk_version = "1.25.0fips",
)
```

In `WORKSPACE` mode, pass the variants to `topt_go_ddtest_workspace_repositories`:

```starlark
topt_go_ddtest_workspace_repositories(
    go_version = "1.25.0",
    sdk_variants = [{
        "experiments": ["boringcrypto"],
        "go_version": "1.25.0",
        "sdk_version": "1.25.0fips",
    }],
)
```

## Migrate from Orchestrion

Earlier versions of the rules instrumented Go tests with Orchestrion and a `rules_go` fork. To move a workspace to `ddtest instrument`:

1. Remove the `orchestrion_mode` and `orchestrion_pin_files` attributes from `dd_topt_go_test` calls and wrappers. Builds fail with a migration message while these attributes are set.
1. Remove the `rules_go` override that points to the fork, and the `orchestrion` extension with its `rules_go_orchestrion_tool` repository. In `WORKSPACE` mode, declare upstream `rules_go`, remove the `rules_go_fetch`, `rules_go_upstream`, and `rules_go_variant` arguments of the Go helper, and remove the `dd_topt_go_orchestrion_tool_repo` call.
1. Delete `orchestrion.tool.go` and `orchestrion.yml`, and the Orchestrion and `dd-trace-go` requirements in `go.mod` that only served as pins.
1. Update the modules as shown in [Add modules](#add-modules), and rerun bootstrap without the flags that were removed, such as `--dd-trace-go-version` and `--orchestrion-version`. Bootstrap replaces the managed Orchestrion block in `MODULE.bazel`. In `WORKSPACE` mode, call `topt_go_ddtest_workspace_repositories` as shown in [Use `WORKSPACE` mode](#use-workspace-mode).
1. If an earlier version generated a validation script, regenerate it by rerunning bootstrap with `--write-validation-script`. The old script queries a target of the `rules_go` fork and exits before it runs your tests.
1. If you read `bazel.go.orchestrion.*` keys from target metadata, read `bazel.go.instrumentation.*` and `bazel.go.sdk.*` instead.

## Known limitations

- [Test Impact Analysis][1] for Bazel is not supported.
- Automatic [coverage configuration][2] for Bazel is not supported.
- With Bzlmod, `rules_go` `0.65.0` raises `golang.org/x/mod` and `golang.org/x/sys` in `go_deps` to releases that require Go 1.26. If a target depends on them and your Go SDK is 1.25, use `rules_go` `0.64.2` or earlier.

## Troubleshooting

### The doctor reports missing payloads

This can happen when the instrumented test target did not run. It can also happen when test outputs were not downloaded locally, or when the test target uses the raw `go_test` rule instead of the Datadog wrapper.

To fix this issue:

1. Run the exact `dd_go_test` or `dd_topt_go_test` target before running the doctor.
1. For remote execution, add `test:test-optimization --remote_download_outputs=all` to `.bazelrc`.
1. Confirm that the test command includes `--config=test-optimization`. Without this config, the wrapper builds a raw `go_test`.

### The doctor reports `full_bundle_no_match`

This can happen when the macro cannot map the Go test target to a per-module metadata bundle.

To fix this issue, prefer `go_library` plus `embed = [":pkg_lib"]` so the macro can infer the same import path that `rules_go` uses. Use `module_label_override` only when the expected module label is known.

### The test fails with `need a Go SDK to instrument`

This can happen when the root module has no `topt_go_ddtest.sdk(...)` tag. Tags in other modules are ignored.

To fix this issue, add the tag as shown in [Run guided bootstrap](#run-guided-bootstrap). In `WORKSPACE` mode, call `topt_go_ddtest_workspace_repositories`.

### The build fails with `No instrumented Go SDK matches sdk_version`

This can happen when a target below an instrumented test selects an `sdk_version` that no instrumented SDK serves.

To fix this issue, add an SDK variant with that `sdk_version`. See [Add SDK variants](#add-sdk-variants).

### The fetch fails with `base SDK` and `go_version`

This can happen when the SDK in `base_sdk_roots` has a different version than `go_version`, for example after a `go` directive changes in `go.mod`.

To fix this issue, set `go_version` to the version of the base SDK, or point `base_sdk_roots` at an SDK of that version.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tests/test_impact_analysis/
[2]: /code_coverage/configuration/
[3]: /tests/setup/go/
[4]: https://github.com/stretchr/testify
[5]: https://github.com/DataDog/rules_test_optimization/blob/v2.0.0/docs/Installation_Reference.md
