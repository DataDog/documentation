---
title: Configure Test Optimization with Bazel
description: Configure Test Optimization for Bazel test targets with Datadog's official Bazel rules.
further_reading:
    - link: "/tests/setup/"
      tag: "Documentation"
      text: "Configure Test Optimization"
    - link: "/tests/explorer/"
      tag: "Documentation"
      text: "Explore Test Results and Performance"
    - link: "/tests/troubleshooting/"
      tag: "Documentation"
      text: "Troubleshooting Test Optimization"
---

Datadog provides official Bazel rules for Test Optimization. Use these rules to configure Bazel test targets. The rules read Test Optimization metadata, write local payload files during test execution, and upload test results to Datadog after Bazel tests complete.

The Bazel integration keeps Datadog metadata fetches outside test execution. During module or repository resolution, Bazel fetches Test Optimization metadata from Datadog and exposes it through a generated repository. During test execution, language-specific macros pass the metadata location to the test process and configure payloads to be written under `TEST_UNDECLARED_OUTPUTS_DIR`. After tests finish, run the doctor and uploader targets with `bazel run`.

Test Impact Analysis is not supported for Bazel.

## Language setup pages

Use the language-specific setup page for your Bazel test targets:

- [Java tests][1]
- [Python tests][2]
- [Go tests][3]

## Compatibility

This section includes setup pages for the following language test targets:

| Language | Bazel macro | Notes |
|---|---|---|
| Java | `dd_topt_java_test` | Requires a `dd-java-agent` JAR label. |
| Python | `dd_topt_py_test` | Supports the managed `pytest` runner and repository-owned pytest wrappers. |
| Go | `dd_topt_go_test` | Use `test_optimization` mode for the faster standard-library `testing` path, or `general` mode for broader Orchestrion support. |

Use `datadog-rules-test-optimization` version `1.2.0` and the commit pin shown on each language setup page.

## How the Bazel flow works

The Bazel setup has four parts:

1. Add the `datadog-rules-test-optimization` module and the companion module for your language.
1. Configure a sync repository with your Datadog service name, runtime name, and runtime version.
1. Replace the language test rule with the Datadog Bazel macro for each instrumented test target.
1. Run tests, validate local payloads with the doctor target, validate enrichment with the uploader dry run, and then upload payloads.

For remote execution, configure Bazel to download test outputs locally:

```text
test:test-optimization --remote_download_outputs=all
```

Without local `test.outputs` directories, the doctor and uploader cannot inspect payload files after `bazel test`.

## Upload payloads

Run the upload flow after your Bazel tests complete. Replace `//tools/test_optimization` with the package where you declared the doctor and uploader targets:

```bash
bazel test --config=test-optimization //...
bazel run --config=test-optimization //tools/test_optimization:dd_test_optimization_doctor
bazel run --config=test-optimization //tools/test_optimization:dd_upload_payloads -- --dry-run --validate-enrichment
DD_API_KEY=<DATADOG_API_KEY> DD_SITE=<DATADOG_SITE> bazel run --config=test-optimization //tools/test_optimization:dd_upload_payloads
```

Do not pass `DD_API_KEY`, `DD_SITE`, `DD_GIT_*`, or upload endpoint variables through `--test_env`. Forward sync metadata with `--repo_env`, and pass upload credentials only to the uploader runtime.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tests/setup/bazel/java/
[2]: /tests/setup/bazel/python/
[3]: /tests/setup/bazel/go/
