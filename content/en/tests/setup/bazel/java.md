---
title: Bazel Rules for Java Tests
description: Configure Test Optimization for Java test targets in Bazel.
code_lang: java
type: multi-code-lang
code_lang_weight: 10
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


Datadog provides official Bazel rules for Java Test Optimization. Use `dd_topt_java_test` to configure Java test targets to run with the Datadog Java tracer and write Test Optimization payloads during Bazel test execution.

## Compatibility

Use the following minimum versions:

| Component | Version |
|---|---|
| `datadog-rules-test-optimization` | `>=1.2.0` |
| `datadog-rules-test-optimization-java` | `>=1.2.0` |
| Java runtime example | `>=17` |
| `dd-java-agent` example | `>=1.60.0` |

The Datadog Bazel rule is the official Test Optimization setup path for Java tests that run with Bazel.

## Prerequisites

Before setting up Test Optimization for Java tests in Bazel:

- Configure a Datadog API key in your CI secret store.
- Set `DD_SITE` to your Datadog site, such as `datadoghq.com`.
- Use a Bazel workspace that can resolve the `datadog-rules-test-optimization` module.
- Make the `dd-java-agent` JAR available to Bazel.

## Add modules

Add the core module and the Java companion module to `MODULE.bazel`:

```starlark
bazel_dep(name = "datadog-rules-test-optimization", version = "1.2.0")
git_override(
    module_name = "datadog-rules-test-optimization",
    remote = "https://github.com/DataDog/rules_test_optimization.git",
    commit = "69953536d4ef1252c8181c267d16c61263f0aa4c",
)

bazel_dep(name = "datadog-rules-test-optimization-java", version = "1.2.0")
git_override(
    module_name = "datadog-rules-test-optimization-java",
    remote = "https://github.com/DataDog/rules_test_optimization.git",
    commit = "69953536d4ef1252c8181c267d16c61263f0aa4c",
    strip_prefix = "modules/java",
)
```

Use the same commit SHA for the core module and the Java companion module.

## Use `WORKSPACE` mode

If Bzlmod is disabled, declare the core repository in `WORKSPACE`. Then use the public Java helper to declare the Java companion repository:

```starlark
load("@bazel_tools//tools/build_defs/repo:git.bzl", "git_repository")

git_repository(
    name = "datadog-rules-test-optimization",
    remote = "https://github.com/DataDog/rules_test_optimization.git",
    commit = "69953536d4ef1252c8181c267d16c61263f0aa4c",
)

load(
    "@datadog-rules-test-optimization//tools/java:workspace_repositories.bzl",
    "datadog_java_test_optimization_workspace_repositories",
)

datadog_java_test_optimization_workspace_repositories(
    rto_commit = "69953536d4ef1252c8181c267d16c61263f0aa4c",
    rules_java_repo_name = "rules_java",
)
```

The consuming repository owns Java rules, Java toolchains, test framework dependencies, and the `dd-java-agent` artifact.

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
    runtime_name = "java",
    runtime_version = "17",
)

use_repo(topt, "test_optimization_data")
```

Declare the `dd-java-agent` JAR as a Bazel file dependency. The `dd_topt_java_test` macro requires an `agent_jar` label:

```starlark
http_file = use_repo_rule("@bazel_tools//tools/build_defs/repo:http.bzl", "http_file")

http_file(
    name = "dd_java_agent",
    downloaded_file_path = "dd-java-agent.jar",
    urls = ["https://repo1.maven.org/maven2/com/datadoghq/dd-java-agent/1.60.0/dd-java-agent-1.60.0.jar"],
)
```

## Add doctor and uploader targets

Add a doctor and uploader pair. In large repositories, put these targets in a lightweight package such as `//tools/test_optimization`.

```starlark
load("@datadog-rules-test-optimization//tools/core:test_optimization_targets.bzl", "dd_test_optimization_targets")

dd_test_optimization_targets(
    name = "test_optimization",
    sync_repo_name = "test_optimization_data",
    expected_targets = [
        "//java/pkg:pkg_java_test",
    ],
)
```

This macro creates:

- `//tools/test_optimization:dd_test_optimization_doctor`
- `//tools/test_optimization:dd_upload_payloads`

## Configure Java test targets

Use `dd_topt_java_test` in package `BUILD.bazel` files:

```starlark
load("@datadog-rules-test-optimization-java//:topt_java_test.bzl", "dd_topt_java_test")
load("@test_optimization_data//:export.bzl", "topt_data")

java_library(
    name = "pkg_lib",
    srcs = ["Hello.java"],
)

dd_topt_java_test(
    name = "pkg_java_test",
    srcs = ["HelloTest.java"],
    deps = [":pkg_lib"],
    test_class = "com.example.pkg.HelloTest",
    stage_sources = True,
    topt_data = topt_data,
    agent_jar = "@dd_java_agent//file",
)
```

The macro injects the Datadog Java tracer with `-javaagent` and adds the agent JAR to test runtime data. It also enables Test Optimization for the Java test process and configures payloads to be written as JSON files under `TEST_UNDECLARED_OUTPUTS_DIR`.

### Optional parameters

`dd_topt_java_test` accepts the following optional parameters:

| Parameter | Default | Description |
|---|---|---|
| `stage_sources` | `false` | When `true`, stages the target's direct `srcs` into test runfiles so the Java tracer can populate the `test.source.file`, `test.source.start`, and `test.source.end` tags. Without it, tests still pass and upload payloads, but source location metadata is absent. |
| `java_test_rule` | `java_test` | Overrides the underlying `java_test` rule. Set this only when you wrap a custom test macro. See [Use a repository-owned Java wrapper](#use-a-repository-owned-java-wrapper). |

## Use a repository-owned Java wrapper

If your repository already owns a Java test wrapper, pass it with `java_test_rule`:

```starlark
load("@datadog-rules-test-optimization-java//:topt_java_test.bzl", "dd_topt_java_test")
load("@test_optimization_data//:export.bzl", "topt_data")
load("//tools/build:java_test.bzl", "repo_java_test")

dd_topt_java_test(
    name = "pkg_java_test",
    srcs = ["HelloTest.java"],
    deps = [":pkg_lib"],
    test_class = "com.example.pkg.HelloTest",
    java_test_rule = repo_java_test,
    stage_sources = True,
    topt_data = topt_data,
    agent_jar = "@dd_java_agent//file",
)
```

The repository wrapper must preserve the `env`, `jvm_flags`, `data`, `tags`, and visibility values passed by `dd_topt_java_test`, and it must run a real Java test process. Keep repository-specific feature flags, scheduling, flaky-test policy, and framework selection in the wrapper layer.

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
bazel test --config=test-optimization //java/pkg:pkg_java_test
bazel run --config=test-optimization //tools/test_optimization:dd_test_optimization_doctor
bazel run --config=test-optimization //tools/test_optimization:dd_upload_payloads -- --dry-run --validate-enrichment
DD_API_KEY=<DATADOG_API_KEY> DD_SITE=<DATADOG_SITE> bazel run --config=test-optimization //tools/test_optimization:dd_upload_payloads
```

Do not pass upload credentials, upload endpoints, or `DD_GIT_*` values through `--test_env`.

## Multi-service setup

Use the multi-sync extension when one Bazel workspace reports Java tests for more than one Datadog service:

```starlark
topt = use_extension(
    "@datadog-rules-test-optimization//tools/core:test_optimization_multi_sync.bzl",
    "test_optimization_multi_sync_extension",
)

topt.test_optimization_multi_sync(
    name = "test_optimization_data",
    services = ["java-service-a", "java-service-b"],
    runtime_name = "java",
    runtime_version = "17",
)

use_repo(
    topt,
    "test_optimization_data",
    "test_optimization_data_java_service_a",
    "test_optimization_data_java_service_b",
)
```

In test targets, pass `topt_data_by_service` and select the service:

```starlark
load("@test_optimization_data//:export.bzl", "topt_data_by_service")

dd_topt_java_test(
    name = "pkg_java_test",
    srcs = ["HelloTest.java"],
    test_class = "com.example.pkg.HelloTest",
    stage_sources = True,
    topt_data = topt_data_by_service,
    topt_service = "java_service_a",
    agent_jar = "@dd_java_agent//file",
)
```

## Known limitations

- [Test Impact Analysis][1] for Bazel is not supported.
- `dd_topt_java_test` requires an `agent_jar` label.
- Automatic [coverage configuration][2] for Bazel is not supported.

## Troubleshooting

### The test target fails because `agent_jar` is missing

This can happen when `dd_topt_java_test` does not receive a label that points to the Datadog Java tracer JAR.

To fix this issue, declare the JAR with `http_file`, `maven_install`, or a repository-owned filegroup, and pass the label to `agent_jar`.

### Tests run but Datadog does not show results

This can happen when the test target uses the raw `java_test` rule. It can also happen when payload files were not downloaded locally, or when the uploader did not receive the synced context data.

To fix this issue:

1. Confirm the target uses `dd_topt_java_test`.
1. For remote execution, add `test:test-optimization --remote_download_outputs=all` to `.bazelrc`.
1. Run the doctor target before upload.
1. Run uploader dry-run enrichment validation before the real upload.

### The doctor reports missing Git metadata

This can happen when repository URL, commit SHA, branch, or tag metadata is not available during metadata sync.

To fix this issue, pass Git metadata through `--repo_env`, not `--test_env`.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tests/test_impact_analysis/
[2]: /code_coverage/configuration/
