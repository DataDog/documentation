---
title: Bazel Rules for Python Tests
description: Configure Test Optimization for Python test targets in Bazel.
code_lang: python
type: multi-code-lang
code_lang_weight: 30
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


Datadog provides official Bazel rules for Python Test Optimization. Use `dd_topt_py_test` to configure `pytest` targets to read synced Test Optimization metadata and write payloads during Bazel test execution.

## Compatibility

Supported test frameworks:

- `pytest`

Use the following minimum versions:

| Component | Version |
|---|---|
| `datadog-rules-test-optimization` | `>=1.2.0` |
| `datadog-rules-test-optimization-python` | `>=1.2.0` |
| Python runtime example | `>=3.12` |

The repository that consumes the Bazel rule owns Python toolchains, `pytest`, `ddtrace`, and lockfiles.

## Prerequisites

Before setting up Test Optimization for Python tests in Bazel:

- Configure a Datadog API key in your CI secret store.
- Set `DD_SITE` to your Datadog site, such as `datadoghq.com`.
- Use a Bazel workspace that can resolve the `datadog-rules-test-optimization` module.
- Add `pytest` and `ddtrace` to the Python dependency repository used by the test target.

## Add modules

Add the core module and the Python companion module to `MODULE.bazel`:

```starlark
bazel_dep(name = "datadog-rules-test-optimization", version = "1.2.0")
git_override(
    module_name = "datadog-rules-test-optimization",
    remote = "https://github.com/DataDog/rules_test_optimization.git",
    commit = "69953536d4ef1252c8181c267d16c61263f0aa4c",
)

bazel_dep(name = "datadog-rules-test-optimization-python", version = "1.2.0")
git_override(
    module_name = "datadog-rules-test-optimization-python",
    remote = "https://github.com/DataDog/rules_test_optimization.git",
    commit = "69953536d4ef1252c8181c267d16c61263f0aa4c",
    strip_prefix = "modules/python",
)
```

Use the same commit SHA for the core module and the Python companion module.

## Use `WORKSPACE` mode

If Bzlmod is disabled, declare the core repository in `WORKSPACE`. Then use the public Python helper to declare the Python companion repository:

```starlark
load("@bazel_tools//tools/build_defs/repo:git.bzl", "git_repository")

git_repository(
    name = "datadog-rules-test-optimization",
    remote = "https://github.com/DataDog/rules_test_optimization.git",
    commit = "69953536d4ef1252c8181c267d16c61263f0aa4c",
)

load(
    "@datadog-rules-test-optimization//tools/python:workspace_repositories.bzl",
    "datadog_python_test_optimization_workspace_repositories",
)

datadog_python_test_optimization_workspace_repositories(
    rto_commit = "69953536d4ef1252c8181c267d16c61263f0aa4c",
    rules_python_repo_name = "rules_python",
)
```

The consuming repository owns Python toolchains, `pip_parse` or `pip.parse`, `pytest`, `ddtrace`, and lockfiles.

## Configure Test Optimization metadata

Configure a sync repository in `MODULE.bazel`:

```starlark
topt = use_extension(
    "@datadog-rules-test-optimization//tools/core:test_optimization_sync.bzl",
    "test_optimization_sync_extension",
)

topt.test_optimization_sync(
    name = "test_optimization_data",
    service = "<SERVICE_NAME>",
    runtime_name = "python",
    runtime_version = "3.12",
)

use_repo(topt, "test_optimization_data")
```

## Add doctor and uploader targets

Add a doctor and uploader pair. In large repositories, put these targets in a lightweight package such as `//tools/test_optimization`.

```starlark
load("@datadog-rules-test-optimization//tools/core:test_optimization_targets.bzl", "dd_test_optimization_targets")

dd_test_optimization_targets(
    name = "test_optimization",
    sync_repo_name = "test_optimization_data",
    expected_targets = [
        "//python/pkg:pkg_py_test",
    ],
)
```

This macro creates:

- `//tools/test_optimization:dd_test_optimization_doctor`
- `//tools/test_optimization:dd_upload_payloads`

## Configure Python test targets

Use `dd_topt_py_test` in package `BUILD.bazel` files:

```starlark
load("@python_deps//:requirements.bzl", "requirement")
load("@datadog-rules-test-optimization-python//:topt_py_test.bzl", "dd_topt_py_test")
load("@test_optimization_data//:export.bzl", "topt_data")

py_library(
    name = "pkg_lib",
    srcs = ["main.py"],
)

dd_topt_py_test(
    name = "pkg_py_test",
    srcs = glob(["test_*.py"]),
    imports = ["example/python/pkg"],
    deps = [
        ":pkg_lib",
        requirement("ddtrace"),
        requirement("pytest"),
    ],
    topt_data = topt_data,
)
```

By default, `dd_topt_py_test` uses `runner_mode = "managed_pytest"`. In this mode, the macro runs the bundled pytest entry point. It sets `PYTEST_ADDOPTS=--ddtrace` when you have not already configured it, and passes the Test Optimization metadata path to the test process.

## Use a repository-owned pytest wrapper

Use `runner_mode = "consumer_runner"` when your repository already owns a Python test wrapper:

```starlark
load("@python_deps//:requirements.bzl", "requirement")
load("@datadog-rules-test-optimization-python//:topt_py_test.bzl", "dd_topt_py_test")
load("@test_optimization_data//:export.bzl", "topt_data")
load("//tools/build:py_test.bzl", "repo_py_test")

dd_topt_py_test(
    name = "pkg_py_test",
    py_test_rule = repo_py_test,
    runner_mode = "consumer_runner",
    module_identifier = "example.python.pkg",
    srcs = glob(["test_*.py"]),
    deps = [
        requirement("ddtrace"),
        requirement("pytest"),
    ],
    topt_data = topt_data,
)
```

In `consumer_runner` mode, the repository-owned wrapper must execute pytest and keep the environment passed by `dd_topt_py_test`. If your wrapper sets `PYTEST_ADDOPTS`, include `--ddtrace` unless you intentionally disable the plugin with `--no-ddtrace`.

## Run and validate tests

Add the required Bazel config:

```text
common:test-optimization --repo_env=DD_API_KEY
common:test-optimization --repo_env=DD_SITE
common:test-optimization --repo_env=DD_GIT_REPOSITORY_URL
common:test-optimization --repo_env=DD_GIT_BRANCH
common:test-optimization --repo_env=DD_GIT_TAG
common:test-optimization --repo_env=DD_GIT_COMMIT_SHA
common:test-optimization --repo_env=DD_PR_NUMBER
test:test-optimization --remote_download_outputs=all
```

Run tests, validate local payloads, validate enrichment, and upload:

```bash
bazel test --config=test-optimization //python/pkg:pkg_py_test
bazel run --config=test-optimization //tools/test_optimization:dd_test_optimization_doctor
bazel run --config=test-optimization //tools/test_optimization:dd_upload_payloads -- --dry-run --validate-enrichment
DD_API_KEY=<DATADOG_API_KEY> DD_SITE=<DATADOG_SITE> bazel run --config=test-optimization //tools/test_optimization:dd_upload_payloads
```

Do not pass upload credentials, upload endpoints, or `DD_GIT_*` values through `--test_env`.

## Multi-service setup

Use the multi-sync extension when one Bazel workspace reports Python tests for more than one Datadog service:

```starlark
topt = use_extension(
    "@datadog-rules-test-optimization//tools/core:test_optimization_multi_sync.bzl",
    "test_optimization_multi_sync_extension",
)

topt.test_optimization_multi_sync(
    name = "test_optimization_data",
    services = ["py-service-a", "py-service-b"],
    runtime_name = "python",
    runtime_version = "3.12",
)

use_repo(
    topt,
    "test_optimization_data",
    "test_optimization_data_py_service_a",
    "test_optimization_data_py_service_b",
)
```

In test targets, pass `topt_data_by_service` and select the service:

```starlark
load("@test_optimization_data//:export.bzl", "topt_data_by_service")

dd_topt_py_test(
    name = "pkg_py_test",
    srcs = glob(["test_*.py"]),
    imports = ["example/python/pkg"],
    deps = [
        requirement("ddtrace"),
        requirement("pytest"),
    ],
    topt_data = topt_data_by_service,
    topt_service = "py_service_a",
)
```

## Known limitations

- [Test Impact Analysis][1] for Bazel is not supported.
- Automatic [coverage configuration][2] for Bazel is not supported.
- `dd_topt_py_test` supports `pytest`.
- In `consumer_runner` mode, the repository-owned wrapper must run pytest with the ddtrace plugin enabled.

## Troubleshooting

### The target passes but no tests appear in Datadog

This can happen when a custom wrapper does not run pytest with the ddtrace plugin. It can also happen when the wrapper does not preserve the environment from `dd_topt_py_test`, or uses a raw `py_test` target instead of the Datadog macro.

To fix this issue:

1. Confirm the target uses `dd_topt_py_test`.
1. If you use `consumer_runner`, confirm the wrapper runs pytest with `--ddtrace`.
1. Run the doctor target before upload.
1. Run uploader dry-run enrichment validation before the real upload.

### The doctor reports missing payloads

This can happen when the instrumented target did not run, test outputs were not downloaded locally, or payloads were not written under `TEST_UNDECLARED_OUTPUTS_DIR`.

To fix this issue:

1. Run the exact `dd_topt_py_test` target before running the doctor.
1. For remote execution, add `test:test-optimization --remote_download_outputs=all` to `.bazelrc`.
1. Confirm the target depends on both `pytest` and `ddtrace`.

### `consumer_runner` fails during analysis

This can happen when `runner_mode = "consumer_runner"` uses the base `py_test` rule without a repository-owned pytest runner.

To fix this issue, pass your repository's Python test wrapper with `py_test_rule`, pass an explicit `main` that runs pytest with the ddtrace plugin, or use `runner_mode = "managed_pytest"`.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tests/test_impact_analysis/
[2]: /code_coverage/configuration/
