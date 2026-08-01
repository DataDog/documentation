---
title: CI/CD Optimization Guides
private: true
disable_toc: true
cascade:
    algolia:
        rank: 20
        category: Guide
        subcategory: CI/CD Optimization Guides
aliases:
    - /continuous_integration/guides/
    - /tests/guides/
---

This section contains guides for optimizing your CI pipelines and tests. The guides provide background knowledge, steps for advanced use cases, or workflows for specific scenarios.

## CI Pipeline Visibility Guides

{{< whatsnext desc=" " >}}
    {{< nextlink href="/continuous_integration/guides/ingestion_control" >}}Creating exclusion filters for ingestion control{{< /nextlink >}}
    {{< nextlink href="/continuous_integration/guides/pipeline_data_model" >}}Understanding the pipeline data model and execution types{{< /nextlink >}}
    {{< nextlink href="/continuous_integration/guides/infrastructure_metrics_with_gitlab" >}}Correlating infrastructure metrics with GitLab jobs in Datadog{{< /nextlink >}}
    {{< nextlink href="/account_management/billing/ci_visibility/" >}}CI Visibility billing considerations{{< /nextlink >}}
    {{< nextlink href="/continuous_integration/guides/identify_highest_impact_jobs_with_critical_path/" >}}Identify CI jobs on the critical path to reduce pipeline duration{{< /nextlink >}}
    {{< nextlink href="/continuous_integration/guides/use_ci_jobs_failure_analysis/" >}} Use CI jobs failure analysis to identify root causes in failed jobs{{< /nextlink >}}
    {{< nextlink href="/continuous_integration/guides/track_reusable_workflows/" >}}Track GitHub reusable workflow usage with custom tags{{< /nextlink >}}
{{< /whatsnext >}}

## Test Optimization Guides

{{< whatsnext desc=" " >}}
    {{< nextlink href="/tests/guides/add_custom_measures" >}}Add custom measures to your tests{{< /nextlink >}}
    {{< nextlink href="/tests/guides/setup_new_flaky_pr_gate" >}}Set up a new Flaky Test PR Gate{{< /nextlink >}}
    {{< nextlink href="/tests/guides/validate_optimizations" >}}Validate optimizations{{< /nextlink >}}
    {{< nextlink href="/continuous_testing/guide/view-continuous-testing-test-runs-in-test-optimization" >}}View Continuous Testing test runs in Test Optimization{{< /nextlink >}}
    {{< nextlink href="/tests/browser_tests" >}}Instrument Browser tests with RUM{{< /nextlink >}}
    {{< nextlink href="/tests/swift_tests" >}}Instrument Swift tests with RUM{{< /nextlink >}}
    {{< nextlink href="/tests/correlate_logs_and_tests" >}}Correlate logs and tests{{< /nextlink >}}
    {{< nextlink href="/tests/developer_workflows/" >}}Enhance developer workflows with Test Optimization{{< /nextlink >}}
{{< /whatsnext >}}
