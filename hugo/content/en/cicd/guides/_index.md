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
    {{< nextlink href="/continuous_integration/guides/ingestion_control" >}}Creating Exclusion Filters for Ingestion Control{{< /nextlink >}}
    {{< nextlink href="/continuous_integration/guides/pipeline_data_model" >}}Understanding the Pipeline Data Model and Execution Types{{< /nextlink >}}
    {{< nextlink href="/continuous_integration/guides/infrastructure_metrics_with_gitlab" >}}Correlating Infrastructure Metrics with GitLab Jobs in Datadog{{< /nextlink >}}
    {{< nextlink href="/account_management/billing/ci_visibility/" >}}CI Visibility Billing Considerations{{< /nextlink >}}
    {{< nextlink href="/continuous_integration/guides/identify_highest_impact_jobs_with_critical_path/" >}}Identify CI Jobs on the Critical Path to Reduce Pipeline Duration{{< /nextlink >}}
    {{< nextlink href="/continuous_integration/guides/use_ci_jobs_failure_analysis/" >}}Use Logs Analysis to Identify Root Causes in Failed CI Jobs{{< /nextlink >}}
    {{< nextlink href="/continuous_integration/guides/track_reusable_workflows/" >}}Track GitHub Reusable Workflow Usage with Custom Tags{{< /nextlink >}}
{{< /whatsnext >}}

## Test Optimization Guides

{{< whatsnext desc=" " >}}
    {{< nextlink href="/tests/guides/add_custom_measures" >}}Add Custom Measures to Your Tests{{< /nextlink >}}
    {{< nextlink href="/tests/guides/setup_new_flaky_pr_gate" >}}Set up a New Flaky Test PR Gate{{< /nextlink >}}
    {{< nextlink href="/tests/guides/validate_optimizations" >}}Validate Optimizations{{< /nextlink >}}
    {{< nextlink href="/tests/guides/test_automation_exclusions" >}}Control Test Automation with Code Annotations{{< /nextlink >}}
    {{< nextlink href="/continuous_testing/guide/view-continuous-testing-test-runs-in-test-optimization" >}}View Continuous Testing Test Runs in Test Optimization{{< /nextlink >}}
{{< /whatsnext >}}
