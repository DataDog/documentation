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

Datadog provides official Bazel rules for Test Optimization. Use these rules to configure Bazel test targets. The rules read Test Optimization metadata, write local payload files during test execution, and upload test results to Datadog after Bazel tests complete. See all rules in the [`DataDog/rules_test_optimization` repository](https://github.com/DataDog/rules_test_optimization).

The Bazel integration keeps Datadog metadata fetches outside test execution. During module or repository resolution, Bazel fetches Test Optimization metadata from Datadog and exposes it through a generated repository. During test execution, language-specific macros pass the metadata location to the test process and configure payloads to be written under `TEST_UNDECLARED_OUTPUTS_DIR`. After tests finish, run the doctor and uploader targets with `bazel run`.

[Test Impact Analysis][1] and automatic [coverage configuration][5] are not supported for Bazel.

## Language setup pages

Use the language-specific setup page for your Bazel test targets:

{{< card-grid card_width="75px" >}}
  {{< image-card href="/tests/setup/bazel/java/" src="integrations_logos/java_avatar.svg" alt="Java" >}}
  {{< image-card href="/tests/setup/bazel/python/" src="integrations_logos/python_avatar.svg" alt="Python" >}}
  {{< image-card href="/tests/setup/bazel/go/" src="integrations_logos/golang-avatar.png" alt="Go" >}}
{{< /card-grid >}}

## Compatibility

This section includes setup pages for the following language test targets:

| Language | Bazel macro | Notes |
|---|---|---|
| Java | `dd_topt_java_test` | Requires a `dd-java-agent` JAR label. See [Java compatibility][2]. |
| Python | `dd_topt_py_test` | Supports the managed `pytest` runner and repository-owned pytest wrappers. See [Python compatibility][3]. |
| Go | `dd_topt_go_test` | Use `test_optimization` mode for the faster standard-library `testing` path, or `general` mode for broader Orchestrion support. See [Go compatibility][4]. |

Use `datadog-rules-test-optimization` version `1.3.0` or later. When a setup snippet uses `git_override`, use the full commit SHA for the release you select.

## How the Bazel setup flow works

For detailed setup guides, see the [language-specific setup pages](#language-setup-pages). On a high level, the Bazel setup has four parts:

1. Add the `datadog-rules-test-optimization` module and the companion module for your language to `MODULE.bazel`.
1. Configure a sync repository with your Datadog service name, runtime name, and runtime version.
1. Replace the language test rule with the Datadog Bazel macro for each instrumented test target.
1. Run tests, validate local payloads with the doctor target, validate enrichment with the uploader dry run, and then upload payloads.

For CI with remote cache or remote execution, configure Bazel to materialize Test Optimization outputs and zip undeclared test outputs:

```text
test:test-optimization --remote_download_minimal
test:test-optimization --remote_download_regex=.*test[.]outputs.*
test:test-optimization --zip_undeclared_test_outputs
```

Do not add a fixed `--build_event_json_file` path to a shared `.bazelrc` block. In CI, create a unique Bazel Build Event Protocol (BEP) JSON file for each `bazel test` invocation. Pass the file to the test command with `--build_event_json_file=<path>`, and pass the same file to the doctor and uploader with `--bep-json=<path>`.

## Upload payloads

Run the upload flow after your Bazel tests complete. Replace `//tools/test_optimization` with the package where you declared the doctor and uploader targets.

For local development where `bazel-testlogs` contains fresh `test.outputs` directories, run:

```bash
bazel test --config=test-optimization //...
bazel run --config=test-optimization //tools/test_optimization:dd_test_optimization_doctor
bazel run --config=test-optimization //tools/test_optimization:dd_upload_payloads -- --dry-run --validate-enrichment
DD_API_KEY=<DATADOG_API_KEY> DD_SITE=<DATADOG_SITE> bazel run --config=test-optimization //tools/test_optimization:dd_upload_payloads
```

For CI with remote cache or remote execution, pass the matching BEP file to the doctor and uploader:

```bash
BEP_JSON="$(mktemp -t bazel-bep.XXXXXX.json)"
ARTIFACT_STAGING_DIR="$(mktemp -d -t dd-test-optimization-artifacts.XXXXXX)"

bazel test --config=test-optimization --build_event_json_file="$BEP_JSON" //...
bazel run --config=test-optimization //tools/test_optimization:dd_test_optimization_doctor -- \
  --bep-json="$BEP_JSON" \
  --freshness-source=bep \
  --freshness-mode=required \
  --artifact-source=bep \
  --artifact-staging-dir="$ARTIFACT_STAGING_DIR"
bazel run --config=test-optimization //tools/test_optimization:dd_upload_payloads -- \
  --dry-run \
  --validate-enrichment \
  --bep-json="$BEP_JSON" \
  --freshness-source=bep \
  --freshness-mode=required \
  --artifact-source=bep \
  --artifact-staging-dir="$ARTIFACT_STAGING_DIR"
DD_API_KEY=<DATADOG_API_KEY> DD_SITE=<DATADOG_SITE> bazel run --config=test-optimization //tools/test_optimization:dd_upload_payloads -- \
  --bep-json="$BEP_JSON" \
  --freshness-source=bep \
  --freshness-mode=required \
  --artifact-source=bep \
  --artifact-staging-dir="$ARTIFACT_STAGING_DIR"
```

Keep remote artifact downloads disabled unless the BEP file points to remote-only artifacts that Bazel did not materialize locally. For HTTP or HTTPS `outputs.zip` artifacts, add `--remote-artifacts=download` or `--remote-artifacts=required`. For custom remote artifact providers, configure `--bep-artifact-downloader=<path>`.

Do not pass `DD_API_KEY`, `DD_SITE`, `DD_GIT_*`, or upload endpoint variables through `--test_env`. Forward sync metadata with `--repo_env`, and pass upload credentials only to the uploader runtime.

## Collect diagnostic reports

When you need to share diagnostics with Datadog Support, run the doctor with `--support-bundle` after tests complete:

```bash
bazel run --config=test-optimization //tools/test_optimization:dd_test_optimization_doctor -- \
  --support-bundle .topt/reports/dd-test-optimization-support.zip
```

For CI runs that use BEP-based freshness or artifact staging, pass the same `--bep-json`, `--freshness-*`, and `--artifact-*` flags to the support-bundle command.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tests/test_impact_analysis/
[2]: /tests/setup/bazel/java/#compatibility
[3]: /tests/setup/bazel/python/#compatibility
[4]: /tests/setup/bazel/go/#compatibility
[5]: /code_coverage/configuration/
