---
title: Partials and Shortcodes
draft: True
---

This document catalogs Hugo partials and English shortcodes that contain actual Hugo templating code (docs tooling).

**Plain markdown content files have been excluded** - this catalog only shows files with Hugo template syntax.

## Summary: All Used Partials and Shortcodes (Tooling Only)

This table lists partials and shortcodes with Hugo templating that are referenced in at least one document.

**Total used items**: 229

| Type | Path | Uses | Description |
|------|------|-----:|-------------|
| Shortcode | `layouts/shortcodes/partial.html` | 1979 | Includes a partial template within content. |
| Partial | `layouts/partials/whats-next/whats-next.html` | 1929 | Renders a "What's Next" section with links from the page's further_reading front matter parameter. |
| Shortcode | `layouts/shortcodes/img.html` | 1377 | Renders responsive images with lazy loading and proper alt text. |
| Shortcode | `layouts/shortcodes/try-rule-banner.html` | 1111 | Displays banner notification. |
| Shortcode | `layouts/shortcodes/try-rule-cta.html` | 1111 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/tab.html` | 628 | Defines individual tab within a tabs shortcode. |
| Shortcode | `layouts/shortcodes/tabs.html` | 628 | Creates tabbed content sections. |
| Shortcode | `layouts/shortcodes/code-block.html` | 282 | Renders syntax-highlighted code blocks. |
| Shortcode | `layouts/shortcodes/nextlink.html` | 225 | Creates a navigation link to the next page. |
| Shortcode | `layouts/shortcodes/whatsnext.html` | 224 | Displays "What's Next" navigation links. |
| Shortcode | `layouts/shortcodes/region-param.html` | 223 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/callout.html` | 190 | Displays a callout or alert box. |
| Shortcode | `layouts/shortcodes/collapse-content.html` | 150 | Creates collapsible/expandable content sections. |
| Shortcode | `layouts/shortcodes/site-region.html` | 126 | Shows site/region-specific content based on user selection. |
| Shortcode | `layouts/shortcodes/include-markdown.html` | 73 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/product-availability.html` | 73 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/X.html` | 62 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/serverless-init-troubleshooting.en.md` | 39 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/learning-center-callout.html` | 36 | Displays callout or alert box. |
| Shortcode | `layouts/shortcodes/programming-lang-wrapper.html` | 34 | Normalize code lang tabs, these are curated manually and may be inconsistent |
| Shortcode | `layouts/shortcodes/programming-lang.html` | 34 | Normalize lang param, these are curated manually and may be inconsistent |
| Shortcode | `layouts/shortcodes/serverless-init-install.html` | 33 | We can't use the collapse-content.html shortcode inside of another shortcode. |
| Shortcode | `layouts/shortcodes/tooltip.html` | 33 | Get shortcode parameters |
| Shortcode | `layouts/shortcodes/dashboards-widgets-api.html` | 30 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/gcr-service-label.md` | 25 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/latest-lambda-layer-version.html` | 23 | Output the latest version of a specific Lambda layer. These version numbers are updated by Automa... |
| Shortcode | `layouts/shortcodes/jqmath-vanilla.html` | 22 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/serverless-init-env-vars-sidecar.html` | 20 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/serverless-init-configure.html` | 19 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/serverless-init-env-vars-in-container.html` | 19 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/translate.html` | 19 | attempts to load a data file at the same path/filename as md file e.g content/foo/bar.md will try... |
| Shortcode | `layouts/shortcodes/appsec-integration.html` | 17 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/appsec-integrations.html` | 17 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/dsm-tracer-version.html` | 14 | Output minimal and recommended tracer versions for DSM |
| Shortcode | `layouts/shortcodes/gcr-install-sidecar-datadog-ci.md` | 13 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/gcr-install-sidecar-other.md` | 13 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/gcr-install-sidecar-terraform.md` | 13 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/mapping-table.html` | 11 | Renders a data table. |
| Shortcode | `layouts/shortcodes/synthetics-variables.en.md` | 11 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/vimeo.html` | 10 | Hugo template tooling |
| Partial | `layouts/partials/security-platform/CSW-billing-note.html` | 9 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/get-metrics-from-git.html` | 9 | Some edge cases the metadata is from a non-integration source, we get the JSON from websites-sources |
| Shortcode | `layouts/shortcodes/otel-custom-instrumentation-lang.en.md` | 9 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/synthetics-alerting-monitoring.en.md` | 9 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/synthetics_grace_permissions.md` | 9 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/synthetics-api-tests-snippets.en.md` | 8 | Hugo template tooling |
| Partial | `layouts/partials/app_and_api_protection/callout.html` | 7 | Displays a callout or alert box. |
| Shortcode | `layouts/shortcodes/aca-install-sidecar-arm-template.md` | 7 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/aca-install-sidecar-bicep.md` | 7 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/aca-install-sidecar-datadog-ci.md` | 7 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/aca-install-sidecar-terraform.md` | 7 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/app_and_api_protection_java_overview.md` | 7 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/app_and_api_protection_navigation_menu.html` | 7 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/app_and_api_protection_python_overview.md` | 7 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/ci-git-metadata.en.md` | 7 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/ci-itr-activation-instructions.en.md` | 7 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/dbm-postgres-agent-config-examples.en.md` | 7 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/gcr-install-sidecar-yaml.md` | 7 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/h2.html` | 7 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/multifilter-search.html` | 7 | Astrojs component that renders a table with search and optional filtering capabilities. Input dat... |
| Shortcode | `layouts/shortcodes/openapi-ref-docs.html` | 7 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/otel-api-troubleshooting.en.md` | 7 | Hugo template tooling |
| Partial | `layouts/partials/security-platform/WP-billing-note.html` | 6 | Hugo template tooling |
| Partial | `layouts/partials/trace_collection/python/supported_runtimes.html` | 6 | Hugo template tooling |
| Partial | `layouts/partials/trace_collection/python/supported_versions.html` | 6 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/app-and-api-protection-ruby-overview.md` | 6 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/app_and_api_protection_python_navigation_menu.html` | 6 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/ci-agent.en.md` | 6 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/ci-autoinstrumentation.en.md` | 6 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/container-languages.html` | 6 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/lambda-install-cdk.html` | 6 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/svl-lambda-fips.md` | 6 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/app_and_api_protection_php_overview.md` | 5 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/beta-callout.html` | 5 | Displays callout or alert box. |
| Shortcode | `layouts/shortcodes/dbm-mysql-agent-config-examples.en.md` | 5 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/gcr-jobs-retention-filter.html` | 5 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/app_and_api_protection_php_navigation_menu.html` | 4 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/dbm-sqlserver-agent-config-examples.en.md` | 4 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/get-service-checks-from-git.html` | 4 | if the page is a draft we can skip |
| Shortcode | `layouts/shortcodes/otel-network-requirements.en.md` | 4 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/rum-browser-auto-instrumentation-update-user-attributes.md` | 4 | Hugo template tooling |
| Partial | `layouts/partials/continuous_integration/ci-pipelines-getting-started.html` | 3 | Hugo template tooling |
| Partial | `layouts/partials/continuous_integration/ci-tests-setup.html` | 3 | Hugo template tooling |
| Partial | `layouts/partials/dynamic_instrumentation/dynamic-instrumentation-languages.html` | 3 | Hugo template tooling |
| Partial | `layouts/partials/rum/rum-feature-flag-tracking.html` | 3 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/aas-workflow-linux.en.md` | 3 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/android-otel-note.en.md` | 3 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/app-and-api-protection-ruby-setup-options.md` | 3 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/app_and_api_protection_java_setup_options.md` | 3 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/app_and_api_protection_php_setup_options.html` | 3 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/app_and_api_protection_python_setup_options.md` | 3 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/ci-details.html` | 3 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/cloud-sec-cloud-infra.en.md` | 3 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/cloud-siem-aws-cloudtrail-enable.en.md` | 3 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/dbm-mongodb-agent-setup-kubernetes.en.md` | 3 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/get-npm-integrations.html` | 3 | Get language-specific data file |
| Shortcode | `layouts/shortcodes/op-updating-deployment-modes.en.md` | 3 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/otel-overview-exporter.en.md` | 3 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/otel-overview-native.en.md` | 3 | Hugo template tooling |
| Partial | `layouts/partials/apm/apm-compatibility.html` | 2 | Conditional Android and iOS cards (no compatibility or library_config pages for these as of 12/22... |
| Partial | `layouts/partials/app_and_api_protection/python/capabilities.html` | 2 | Hugo template tooling |
| Partial | `layouts/partials/cloud_cost/getting-started.html` | 2 | Hugo template tooling |
| Partial | `layouts/partials/continuous_integration/ci-itr-setup.html` | 2 | Hugo template tooling |
| Partial | `layouts/partials/data_streams/setup-languages.html` | 2 | Hugo template tooling |
| Partial | `layouts/partials/data_streams/setup-technologies.html` | 2 | Hugo template tooling |
| Partial | `layouts/partials/feature_flags/feature_flags_client.html` | 2 | Hugo template tooling |
| Partial | `layouts/partials/feature_flags/feature_flags_server.html` | 2 | Hugo template tooling |
| Partial | `layouts/partials/profiling/profiling-languages.html` | 2 | Hugo template tooling |
| Partial | `layouts/partials/requests.html` | 2 | get lang specific data file |
| Shortcode | `layouts/shortcodes/apm-ootb-graphs.en.md` | 2 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/asm-protection-page-configuration.en.md` | 2 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/beta-callout-private.html` | 2 | Displays callout or alert box. |
| Shortcode | `layouts/shortcodes/cloud-siem-aws-setup-cloudformation.en.md` | 2 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/dbm-mongodb-agent-config-replica-set.en.md` | 2 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/dbm-mongodb-agent-config-sharded-cluster.en.md` | 2 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/dbm-mongodb-agent-data-collected.en.md` | 2 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/header-list.html` | 2 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/hipaa-customers.en.md` | 2 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/mainland-china-disclaimer.en.md` | 2 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/notifications-email.en.md` | 2 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/notifications-integrations.en.md` | 2 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/otel-custom-instrumentation.en.md` | 2 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/private-action-runner-version.html` | 2 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/sdk-version.html` | 2 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/sds-mask-action.md` | 2 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/synthetics-worker-version.html` | 2 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/vrl-functions.html` | 2 | Hugo template tooling |
| Partial | `layouts/partials/api/sdk-languages.html` | 1 | Hugo template tooling |
| Partial | `layouts/partials/apm/apm-connect-logs-and-traces.html` | 1 | Hugo template tooling |
| Partial | `layouts/partials/apm/apm-containers.html` | 1 | Hugo template tooling |
| Partial | `layouts/partials/apm/apm-languages.html` | 1 | Displays a grid of clickable language cards/logos for APM tracing documentation. |
| Partial | `layouts/partials/apm/apm-manual-instrumentation-custom.html` | 1 | Hugo template tooling |
| Partial | `layouts/partials/apm/apm-manual-instrumentation.html` | 1 | Hugo template tooling |
| Partial | `layouts/partials/apm/apm-opentracing-custom.html` | 1 | Hugo template tooling |
| Partial | `layouts/partials/apm/apm-otel-instrumentation-custom.html` | 1 | Hugo template tooling |
| Partial | `layouts/partials/apm/apm-otel-instrumentation.html` | 1 | Hugo template tooling |
| Partial | `layouts/partials/apm/apm-proxies.html` | 1 | Hugo template tooling |
| Partial | `layouts/partials/apm/apm-runtime-metrics-containers.html` | 1 | Hugo template tooling |
| Partial | `layouts/partials/apm/apm-single-step.html` | 1 | Hugo template tooling |
| Partial | `layouts/partials/apm/otel-instrumentation.html` | 1 | Hugo template tooling |
| Partial | `layouts/partials/cloud_cost/cost-integrations.html` | 1 | Hugo template tooling |
| Partial | `layouts/partials/cloud_storage_monitoring/storage-monitoring-setup.html` | 1 | Hugo template tooling |
| Partial | `layouts/partials/cloudcraft/sdk-languages.html` | 1 | Hugo template tooling |
| Partial | `layouts/partials/code_security/languages-getting-started.html` | 1 | Hugo template tooling |
| Partial | `layouts/partials/code_security/sca-lang-support.html` | 1 | Hugo template tooling |
| Partial | `layouts/partials/continuous_delivery/cd-getting-started.html` | 1 | First row with 3 tiles |
| Partial | `layouts/partials/continuous_testing/ct-getting-started.html` | 1 | Hugo template tooling |
| Partial | `layouts/partials/csm/csm-agent-tiles.html` | 1 | Hugo template tooling |
| Partial | `layouts/partials/data_jobs/setup-platforms-spark.html` | 1 | Hugo template tooling |
| Partial | `layouts/partials/data_jobs/setup-platforms.html` | 1 | Hugo template tooling |
| Partial | `layouts/partials/dynamic_instrumentation/symbol-database-languages.html` | 1 | Renders tabbed content. |
| Partial | `layouts/partials/error_tracking/error-tracking-handled-errors.html` | 1 | Hugo template tooling |
| Partial | `layouts/partials/error_tracking/error-tracking-mobile.html` | 1 | Hugo template tooling |
| Partial | `layouts/partials/getting_started/continuous_testing/providers.html` | 1 | Hugo template tooling |
| Partial | `layouts/partials/logs/logs-cloud.html` | 1 | Hugo template tooling |
| Partial | `layouts/partials/logs/logs-containers.html` | 1 | Hugo template tooling |
| Partial | `layouts/partials/logs/logs-languages.html` | 1 | Hugo template tooling |
| Partial | `layouts/partials/ndm/ndm_integrations.html` | 1 | Hugo template tooling |
| Partial | `layouts/partials/ndm/sd-wan.html` | 1 | Hugo template tooling |
| Partial | `layouts/partials/ndm/virtualization.html` | 1 | Hugo template tooling |
| Partial | `layouts/partials/observability_pipelines/use_cases.html` | 1 | Hugo template tooling |
| Partial | `layouts/partials/platforms/platforms.html` | 1 | Renders platform selection interface with categorized platform icons. |
| Partial | `layouts/partials/profiling/profiling-troubleshooting.html` | 1 | Hugo template tooling |
| Partial | `layouts/partials/reference_tables/ref-tables-saas-integrations.html` | 1 | Renders a data table. |
| Partial | `layouts/partials/rum/rum-browser-setup.html` | 1 | Hugo template tooling |
| Partial | `layouts/partials/rum/rum-correlate-rum-and-logs.html` | 1 | Hugo template tooling |
| Partial | `layouts/partials/rum/rum-error-tracking-mobile.html` | 1 | Hugo template tooling |
| Partial | `layouts/partials/rum/rum-getting-started-setup.html` | 1 | Hugo template tooling |
| Partial | `layouts/partials/rum/rum-getting-started.html` | 1 | Hugo template tooling |
| Partial | `layouts/partials/security-platform/appsec-languages-code-security.html` | 1 | Hugo template tooling |
| Partial | `layouts/partials/security-platform/appsec-languages-sca.html` | 1 | Hugo template tooling |
| Partial | `layouts/partials/security-platform/appsec-languages.html` | 1 | Hugo template tooling |
| Partial | `layouts/partials/security-platform/appsec-libraries-serverless.html` | 1 | Hugo template tooling |
| Partial | `layouts/partials/serverless/getting-started-languages.html` | 1 | Hugo template tooling |
| Partial | `layouts/partials/serverless/google-cloud-run-workloads.html` | 1 | TODO(@nhulston) replace with Cloud Run jobs when available; gen 2 functions will link to gen 1 docs. |
| Partial | `layouts/partials/serverless/lambda-managed-instances-runtimes.html` | 1 | Hugo template tooling |
| Partial | `layouts/partials/serverless/serverless-apm-recommendations.html` | 1 | Hugo template tooling |
| Partial | `layouts/partials/support/support.html` | 1 | Displays contact options (support platform, live chat, Slack) and learning resources. |
| Partial | `layouts/partials/synthetics/network-layers.html` | 1 | Hugo template tooling |
| Partial | `layouts/partials/workload-protection/wp-agent-tiles.html` | 1 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/aas-workflow-windows.en.md` | 1 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/aca-container-options.html` | 1 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/agent-config.html` | 1 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/agent-dual-shipping.en.md` | 1 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/api-scopes.html` | 1 | For each scope find the common tags and group them together |
| Shortcode | `layouts/shortcodes/appsec-getstarted.en.md` | 1 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/asm-protect.en.md` | 1 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/aws-permissions.md` | 1 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/classic-libraries-table.html` | 1 | get lang specific data file |
| Shortcode | `layouts/shortcodes/cloud-siem-content-packs.html` | 1 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/cloud-siem-supported-ocsf.html` | 1 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/community-libraries-table.html` | 1 | get lang specific data file |
| Shortcode | `layouts/shortcodes/csm-setup-aws.en.md` | 1 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/csm-setup-google-cloud.en.md` | 1 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/csm-windows-setup.en.md` | 1 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/dbm-alwayson-cloud-hosted.en.md` | 1 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/dbm-amazon-documentdb-agent-config-replica-set.en.md` | 1 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/dbm-mongodb-agent-config-standalone.en.md` | 1 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/dbm-sqlserver-agent-setup-windows.en.md` | 1 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/expression-language-evaluator.html` | 1 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/expression-language-simulator.html` | 1 | Add a notice at the top to indicate this is a static illustration |
| Shortcode | `layouts/shortcodes/filter_by_reference_tables.en.md` | 1 | Renders a data table. |
| Shortcode | `layouts/shortcodes/gcr-container-options.html` | 1 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/google-cloud-integrations.md` | 1 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/integration-assets-reference.en.md` | 1 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/integration_categories.en.md` | 1 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/integration_categories.md` | 1 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/integrations.html` | 1 | manual mappings of integration to pmm categories - WEB-6040 |
| Shortcode | `layouts/shortcodes/log-libraries-table.html` | 1 | get lang specific data file |
| Shortcode | `layouts/shortcodes/op-datadog-archives-s3-setup.en.md` | 1 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/permissions.html` | 1 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/related-logs-supported-resources.html` | 1 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/sci-dd-git-env-variables.en.md` | 1 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/sci-dd-setuptools-unified-python.en.md` | 1 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/sci-dd-tags-bundled-node-js.en.md` | 1 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/sci-dd-tags-env-variable.en.md` | 1 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/sci-dd-tracing-library.en.md` | 1 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/sds-scanning-rule.en.md` | 1 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/sds-suppressions.en.md` | 1 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/semantic-color.en.md` | 1 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/semantic-color.html` | 1 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/semantic-color.md` | 1 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/serverless-libraries-table.html` | 1 | get lang specific data file |
| Shortcode | `layouts/shortcodes/synthetics-alerting-monitoring-network-path.en.md` | 1 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/table.html` | 1 | Renders a data table. |
| Shortcode | `layouts/shortcodes/tracing-libraries-table.html` | 1 | get lang specific data file |
| Shortcode | `layouts/shortcodes/uninstall-agent.html` | 1 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/version.html` | 1 | Hugo template tooling |
| Shortcode | `layouts/shortcodes/vrl-errors.html` | 1 | Hugo template tooling |


---

## Partials (Tooling Only)

**Total**: 188 partials with Hugo templating

**Excluded**: 0 plain markdown files

**Referenced in content**: 73 partials

### Partials Reference Table

| Partial Path | Referenced By | Documentation URL |
|--------------|---------------|-------------------|
| `layouts/partials/actions/private_actions_list.html` | _No references found_ | - |
| `layouts/partials/api/api-toolbar.html` | _No references found_ | - |
| `layouts/partials/api/arguments-data.html` | _No references found_ | - |
| `layouts/partials/api/arguments.html` | _No references found_ | - |
| `layouts/partials/api/code-example.html` | _No references found_ | - |
| `layouts/partials/api/curl.html` | _No references found_ | - |
| `layouts/partials/api/endpoint-visibility.html` | _No references found_ | - |
| `layouts/partials/api/get-endpoint.html` | _No references found_ | - |
| `layouts/partials/api/intro.html` | _No references found_ | - |
| `layouts/partials/api/load-specs.html` | _No references found_ | - |
| `layouts/partials/api/openapi-code-curl.html` | _No references found_ | - |
| `layouts/partials/api/openapi-code-example.html` | _No references found_ | - |
| `layouts/partials/api/openapi-code-go.html` | _No references found_ | - |
| `layouts/partials/api/openapi-code-java.html` | _No references found_ | - |
| `layouts/partials/api/openapi-code-javascript.html` | _No references found_ | - |
| `layouts/partials/api/openapi-code-python.html` | _No references found_ | - |
| `layouts/partials/api/openapi-code-ruby.html` | _No references found_ | - |
| `layouts/partials/api/permissions.html` | _No references found_ | - |
| `layouts/partials/api/regions.html` | _No references found_ | - |
| `layouts/partials/api/request-body.html` | _No references found_ | - |
| `layouts/partials/api/response.html` | _No references found_ | - |
| `layouts/partials/api/sdk-languages.html` | `content/en/api/latest/_index.md` | https://docs.datadoghq.com/api/latest/ |
| `layouts/partials/apm/apm-compatibility.html` | `content/en/tracing/trace_collection/compatibility/_index.md` | https://docs.datadoghq.com/tracing/trace_collection/compatibility/ |
| `layouts/partials/apm/apm-compatibility.html` | `content/en/tracing/trace_collection/library_config/_index.md` | https://docs.datadoghq.com/tracing/trace_collection/library_config/ |
| `layouts/partials/apm/apm-connect-logs-and-traces.html` | `content/en/tracing/other_telemetry/connect_logs_and_traces/_index.md` | https://docs.datadoghq.com/tracing/other_telemetry/connect_logs_and_traces/ |
| `layouts/partials/apm/apm-containers.html` | `content/en/tracing/trace_collection/dd_libraries/_index.md` | https://docs.datadoghq.com/tracing/trace_collection/dd_libraries/ |
| `layouts/partials/apm/apm-context-propagation.html` | _No references found_ | - |
| `layouts/partials/apm/apm-inapp.html` | _No references found_ | - |
| `layouts/partials/apm/apm-languages.html` | `content/en/tracing/trace_collection/dd_libraries/_index.md` | https://docs.datadoghq.com/tracing/trace_collection/dd_libraries/ |
| `layouts/partials/apm/apm-manual-instrumentation-custom.html` | `content/en/tracing/trace_collection/custom_instrumentation/_index.md` | https://docs.datadoghq.com/tracing/trace_collection/custom_instrumentation/ |
| `layouts/partials/apm/apm-manual-instrumentation.html` | `content/en/tracing/trace_collection/custom_instrumentation/dd_libraries/_index.md` | https://docs.datadoghq.com/tracing/trace_collection/custom_instrumentation/dd_libraries/ |
| `layouts/partials/apm/apm-opentracing-custom.html` | `content/en/tracing/trace_collection/custom_instrumentation/_index.md` | https://docs.datadoghq.com/tracing/trace_collection/custom_instrumentation/ |
| `layouts/partials/apm/apm-opentracing.html` | _No references found_ | - |
| `layouts/partials/apm/apm-otel-instrumentation-custom.html` | `content/en/tracing/trace_collection/custom_instrumentation/_index.md` | https://docs.datadoghq.com/tracing/trace_collection/custom_instrumentation/ |
| `layouts/partials/apm/apm-otel-instrumentation.html` | `content/en/tracing/trace_collection/custom_instrumentation/otel_instrumentation/_index.md` | https://docs.datadoghq.com/tracing/trace_collection/custom_instrumentation/otel_instrumentation/ |
| `layouts/partials/apm/apm-proxies.html` | `content/en/tracing/trace_collection/proxy_setup/_index.md` | https://docs.datadoghq.com/tracing/trace_collection/proxy_setup/ |
| `layouts/partials/apm/apm-runtime-metrics-containers.html` | `content/en/tracing/metrics/runtime_metrics/_index.md` | https://docs.datadoghq.com/tracing/metrics/runtime_metrics/ |
| `layouts/partials/apm/apm-runtime-metrics.html` | _No references found_ | - |
| `layouts/partials/apm/apm-single-step.html` | `content/en/tracing/trace_collection/single-step-apm/_index.md` | https://docs.datadoghq.com/tracing/trace_collection/single-step-apm/ |
| `layouts/partials/apm/otel-instrumentation.html` | `content/en/opentelemetry/instrument/api_support/_index.md` | https://docs.datadoghq.com/opentelemetry/instrument/api_support/ |
| `layouts/partials/app_and_api_protection/callout.html` | `content/en/security/application_security/setup/dotnet/_index.md` | https://docs.datadoghq.com/security/application_security/setup/dotnet/ |
| `layouts/partials/app_and_api_protection/callout.html` | `content/en/security/application_security/setup/java/_index.md` | https://docs.datadoghq.com/security/application_security/setup/java/ |
| `layouts/partials/app_and_api_protection/callout.html` | `content/en/security/application_security/setup/nginx/_index.md` | https://docs.datadoghq.com/security/application_security/setup/nginx/ |
| `layouts/partials/app_and_api_protection/callout.html` | `content/en/security/application_security/setup/nginx/ingress-controller.md` | https://docs.datadoghq.com/security/application_security/setup/nginx/ingress-controller/ |
| `layouts/partials/app_and_api_protection/callout.html` | `content/en/security/application_security/setup/nodejs/_index.md` | https://docs.datadoghq.com/security/application_security/setup/nodejs/ |
| `layouts/partials/app_and_api_protection/callout.html` | `content/en/security/application_security/setup/php/_index.md` | https://docs.datadoghq.com/security/application_security/setup/php/ |
| `layouts/partials/app_and_api_protection/callout.html` | `content/en/security/application_security/setup/python/_index.md` | https://docs.datadoghq.com/security/application_security/setup/python/ |
| `layouts/partials/app_and_api_protection/python/capabilities.html` | `content/en/security/application_security/setup/compatibility/python.md` | https://docs.datadoghq.com/security/application_security/setup/compatibility/python/ |
| `layouts/partials/app_and_api_protection/python/capabilities.html` | `content/en/security/application_security/setup/python/compatibility.md` | https://docs.datadoghq.com/security/application_security/setup/python/compatibility/ |
| `layouts/partials/app_and_api_protection/python/overview.html` | _No references found_ | - |
| `layouts/partials/badge.html` | _No references found_ | - |
| `layouts/partials/breadcrumbs.html` | _No references found_ | - |
| `layouts/partials/canonical.html` | _No references found_ | - |
| `layouts/partials/cloud_cost/cost-integrations.html` | `content/en/cloud_cost_management/setup/saas_costs.md` | https://docs.datadoghq.com/cloud_cost_management/setup/saas_costs/ |
| `layouts/partials/cloud_cost/getting-started.html` | `content/en/cloud_cost_management/setup/saas_costs.md` | https://docs.datadoghq.com/cloud_cost_management/setup/saas_costs/ |
| `layouts/partials/cloud_cost/getting-started.html` | `content/en/cloud_cost_management/tags/tag_explorer.md` | https://docs.datadoghq.com/cloud_cost_management/tags/tag_explorer/ |
| `layouts/partials/cloud_storage_monitoring/storage-monitoring-setup.html` | `content/en/infrastructure/storage_management/_index.md` | https://docs.datadoghq.com/infrastructure/storage_management/ |
| `layouts/partials/cloudcraft/sdk-languages.html` | `content/en/cloudcraft/api/_index.md` | https://docs.datadoghq.com/cloudcraft/api/ |
| `layouts/partials/code-lang-tabs.html` | _No references found_ | - |
| `layouts/partials/code_analysis/ide-plugins.html` | _No references found_ | - |
| `layouts/partials/code_analysis/languages-getting-started.html` | _No references found_ | - |
| `layouts/partials/code_analysis/sca-getting-started.html` | _No references found_ | - |
| `layouts/partials/code_security/ide-plugins.html` | _No references found_ | - |
| `layouts/partials/code_security/languages-getting-started.html` | `content/en/security/code_security/static_analysis/_index.md` | https://docs.datadoghq.com/security/code_security/static_analysis/ |
| `layouts/partials/code_security/sca-lang-support.html` | `content/en/security/code_security/software_composition_analysis/_index.md` | https://docs.datadoghq.com/security/code_security/software_composition_analysis/ |
| `layouts/partials/continuous_delivery/cd-getting-started.html` | `content/en/continuous_delivery/_index.md` | https://docs.datadoghq.com/continuous_delivery/ |
| `layouts/partials/continuous_integration/ci-itr-setup.html` | `content/en/getting_started/test_impact_analysis/_index.md` | https://docs.datadoghq.com/getting_started/test_impact_analysis/ |
| `layouts/partials/continuous_integration/ci-itr-setup.html` | `content/en/tests/test_impact_analysis/setup/_index.md` | https://docs.datadoghq.com/tests/test_impact_analysis/setup/ |
| `layouts/partials/continuous_integration/ci-pipelines-getting-started.html` | `content/en/continuous_integration/_index.md` | https://docs.datadoghq.com/continuous_integration/ |
| `layouts/partials/continuous_integration/ci-pipelines-getting-started.html` | `content/en/continuous_integration/pipelines/_index.md` | https://docs.datadoghq.com/continuous_integration/pipelines/ |
| `layouts/partials/continuous_integration/ci-pipelines-getting-started.html` | `content/en/getting_started/ci_visibility/_index.md` | https://docs.datadoghq.com/getting_started/ci_visibility/ |
| `layouts/partials/continuous_integration/ci-tests-setup.html` | `content/en/getting_started/test_optimization/_index.md` | https://docs.datadoghq.com/getting_started/test_optimization/ |
| `layouts/partials/continuous_integration/ci-tests-setup.html` | `content/en/tests/_index.md` | https://docs.datadoghq.com/tests/ |
| `layouts/partials/continuous_integration/ci-tests-setup.html` | `content/en/tests/setup/_index.md` | https://docs.datadoghq.com/tests/setup/ |
| `layouts/partials/continuous_testing/ct-getting-started.html` | `content/en/continuous_testing/_index.md` | https://docs.datadoghq.com/continuous_testing/ |
| `layouts/partials/csm/csm-agent-tiles.html` | `content/en/security/cloud_security_management/setup/agent/_index.md` | https://docs.datadoghq.com/security/cloud_security_management/setup/agent/ |
| `layouts/partials/csm/csm-enterprise-agent-tiles.html` | _No references found_ | - |
| `layouts/partials/csm/csm-pro-agent-tiles.html` | _No references found_ | - |
| `layouts/partials/csm/csm-ws-agent-tiles.html` | _No references found_ | - |
| `layouts/partials/css.html` | _No references found_ | - |
| `layouts/partials/data_jobs/setup-platforms-spark.html` | `content/en/data_observability/jobs_monitoring/_index.md` | https://docs.datadoghq.com/data_observability/jobs_monitoring/ |
| `layouts/partials/data_jobs/setup-platforms.html` | `content/en/data_observability/jobs_monitoring/_index.md` | https://docs.datadoghq.com/data_observability/jobs_monitoring/ |
| `layouts/partials/data_streams/setup-languages.html` | `content/en/data_streams/_index.md` | https://docs.datadoghq.com/data_streams/ |
| `layouts/partials/data_streams/setup-languages.html` | `content/en/data_streams/setup/_index.md` | https://docs.datadoghq.com/data_streams/setup/ |
| `layouts/partials/data_streams/setup-technologies.html` | `content/en/data_streams/_index.md` | https://docs.datadoghq.com/data_streams/ |
| `layouts/partials/data_streams/setup-technologies.html` | `content/en/data_streams/setup/_index.md` | https://docs.datadoghq.com/data_streams/setup/ |
| `layouts/partials/dbm/dbm-data-collected.html` | _No references found_ | - |
| `layouts/partials/dbm/dbm-getting-started-managed.html` | _No references found_ | - |
| `layouts/partials/dbm/dbm-getting-started.html` | _No references found_ | - |
| `layouts/partials/dbm/dbm-setup-documentdb.html` | _No references found_ | - |
| `layouts/partials/dbm/dbm-setup-mongodb.html` | _No references found_ | - |
| `layouts/partials/dbm/dbm-setup-mysql.html` | _No references found_ | - |
| `layouts/partials/dbm/dbm-setup-oracle.html` | _No references found_ | - |
| `layouts/partials/dbm/dbm-setup-postgres.html` | _No references found_ | - |
| `layouts/partials/dbm/dbm-setup-sql-server.html` | _No references found_ | - |
| `layouts/partials/dynamic_instrumentation/dynamic-instrumentation-languages.html` | `content/en/tracing/live_debugger/_index.md` | https://docs.datadoghq.com/tracing/live_debugger/ |
| `layouts/partials/dynamic_instrumentation/dynamic-instrumentation-languages.html` | `content/en/tracing/trace_collection/dynamic_instrumentation/_index.md` | https://docs.datadoghq.com/tracing/trace_collection/dynamic_instrumentation/ |
| `layouts/partials/dynamic_instrumentation/dynamic-instrumentation-languages.html` | `content/en/tracing/trace_collection/dynamic_instrumentation/enabling/_index.md` | https://docs.datadoghq.com/tracing/trace_collection/dynamic_instrumentation/enabling/ |
| `layouts/partials/dynamic_instrumentation/symbol-database-languages.html` | `content/en/tracing/trace_collection/dynamic_instrumentation/symdb/_index.md` | https://docs.datadoghq.com/tracing/trace_collection/dynamic_instrumentation/symdb/ |
| `layouts/partials/error_tracking/error-tracking-handled-errors.html` | `content/en/error_tracking/backend/capturing_handled_errors/_index.md` | https://docs.datadoghq.com/error_tracking/backend/capturing_handled_errors/ |
| `layouts/partials/error_tracking/error-tracking-mobile.html` | `content/en/error_tracking/frontend/mobile/_index.md` | https://docs.datadoghq.com/error_tracking/frontend/mobile/ |
| `layouts/partials/feature_flags/feature_flags_client.html` | `content/en/feature_flags/client/_index.md` | https://docs.datadoghq.com/feature_flags/client/ |
| `layouts/partials/feature_flags/feature_flags_client.html` | `content/en/getting_started/feature_flags/_index.md` | https://docs.datadoghq.com/getting_started/feature_flags/ |
| `layouts/partials/feature_flags/feature_flags_server.html` | `content/en/feature_flags/server/_index.md` | https://docs.datadoghq.com/feature_flags/server/ |
| `layouts/partials/feature_flags/feature_flags_server.html` | `content/en/getting_started/feature_flags/_index.md` | https://docs.datadoghq.com/getting_started/feature_flags/ |
| `layouts/partials/footer-js-dd-docs-methods.html` | _No references found_ | - |
| `layouts/partials/footer-scripts.html` | _No references found_ | - |
| `layouts/partials/footer/footer.html` | _No references found_ | - |
| `layouts/partials/getting_started/continuous_testing/providers.html` | `content/en/getting_started/continuous_testing/_index.md` | https://docs.datadoghq.com/getting_started/continuous_testing/ |
| `layouts/partials/global-modals/global-modals.html` | _No references found_ | - |
| `layouts/partials/graphingfunctions.md` | _No references found_ | - |
| `layouts/partials/grouped-item-listings.html` | _No references found_ | - |
| `layouts/partials/head_scripts/google-site-tag.html` | _No references found_ | - |
| `layouts/partials/head_scripts/google-tag-manager.html` | _No references found_ | - |
| `layouts/partials/head_scripts/hotjar.html` | _No references found_ | - |
| `layouts/partials/head_scripts/marketo.html` | _No references found_ | - |
| `layouts/partials/header-scripts.html` | _No references found_ | - |
| `layouts/partials/header/header.html` | _No references found_ | - |
| `layouts/partials/home-header.html` | _No references found_ | - |
| `layouts/partials/hreflang.html` | _No references found_ | - |
| `layouts/partials/icon.html` | _No references found_ | - |
| `layouts/partials/img-resource.html` | _No references found_ | - |
| `layouts/partials/img.html` | _No references found_ | - |
| `layouts/partials/imgurl.html` | _No references found_ | - |
| `layouts/partials/integration-labels/integration-labels.html` | _No references found_ | - |
| `layouts/partials/integrations-carousel/integrations-carousel-modal.html` | _No references found_ | - |
| `layouts/partials/integrations-carousel/integrations-carousel.html` | _No references found_ | - |
| `layouts/partials/integrations-logo.html` | _No references found_ | - |
| `layouts/partials/language-region-select.html` | _No references found_ | - |
| `layouts/partials/logs/logs-cloud.html` | `content/en/logs/log_collection/_index.md` | https://docs.datadoghq.com/logs/log_collection/ |
| `layouts/partials/logs/logs-containers.html` | `content/en/logs/log_collection/_index.md` | https://docs.datadoghq.com/logs/log_collection/ |
| `layouts/partials/logs/logs-languages.html` | `content/en/logs/log_collection/_index.md` | https://docs.datadoghq.com/logs/log_collection/ |
| `layouts/partials/markdoc-assets.html` | _No references found_ | - |
| `layouts/partials/menulink.html` | _No references found_ | - |
| `layouts/partials/meta-http-equiv.html` | _No references found_ | - |
| `layouts/partials/meta.html` | _No references found_ | - |
| `layouts/partials/nav/left-nav-api.html` | _No references found_ | - |
| `layouts/partials/nav/left-nav-partners.html` | _No references found_ | - |
| `layouts/partials/nav/left-nav.html` | _No references found_ | - |
| `layouts/partials/ndm/ndm_integrations.html` | `content/en/network_monitoring/devices/integrations.md` | https://docs.datadoghq.com/network_monitoring/devices/integrations/ |
| `layouts/partials/ndm/sd-wan.html` | `content/en/network_monitoring/devices/integrations.md` | https://docs.datadoghq.com/network_monitoring/devices/integrations/ |
| `layouts/partials/ndm/virtualization.html` | `content/en/network_monitoring/devices/integrations.md` | https://docs.datadoghq.com/network_monitoring/devices/integrations/ |
| `layouts/partials/noindex.html` | _No references found_ | - |
| `layouts/partials/observability_pipelines/use_cases.html` | `content/en/observability_pipelines/legacy/setup/_index.md` | https://docs.datadoghq.com/observability_pipelines/legacy/setup/ |
| `layouts/partials/opentelemetry/otel-runtime-metrics.html` | _No references found_ | - |
| `layouts/partials/page-edit-body.html` | _No references found_ | - |
| `layouts/partials/page-edit.html` | _No references found_ | - |
| `layouts/partials/partners/banner.html` | _No references found_ | - |
| `layouts/partials/platforms/platforms.html` | `content/en/agent/_index.md` | https://docs.datadoghq.com/agent/ |
| `layouts/partials/prefetch.html` | _No references found_ | - |
| `layouts/partials/preload.html` | _No references found_ | - |
| `layouts/partials/preview_banner/preview_banner.html` | _No references found_ | - |
| `layouts/partials/profiling/profiling-languages.html` | `content/en/profiler/_index.md` | https://docs.datadoghq.com/profiler/ |
| `layouts/partials/profiling/profiling-languages.html` | `content/en/profiler/enabling/_index.md` | https://docs.datadoghq.com/profiler/enabling/ |
| `layouts/partials/profiling/profiling-troubleshooting.html` | `content/en/profiler/profiler_troubleshooting/_index.md` | https://docs.datadoghq.com/profiler/profiler_troubleshooting/ |
| `layouts/partials/profiling/profiling-unmanaged-code.html` | _No references found_ | - |
| `layouts/partials/questions/questions.html` | _No references found_ | - |
| `layouts/partials/rbac-permissions-table.html` | _No references found_ | - |
| `layouts/partials/reference_tables/ref-tables-cloud-object-storage.html` | _No references found_ | - |
| `layouts/partials/reference_tables/ref-tables-saas-integrations.html` | `content/en/reference_tables/_index.md` | https://docs.datadoghq.com/reference_tables/ |
| `layouts/partials/region-param.html` | _No references found_ | - |
| `layouts/partials/related-groups.html` | _No references found_ | - |
| `layouts/partials/requests.html` | `content/en/developers/_index.md` | https://docs.datadoghq.com/developers/ |
| `layouts/partials/requests.html` | `content/en/integrations/guide/requests.md` | https://docs.datadoghq.com/integrations/guide/requests/ |
| `layouts/partials/return-to-group-link.html` | _No references found_ | - |
| `layouts/partials/rum/rum-browser-setup.html` | `content/en/real_user_monitoring/application_monitoring/browser/setup/server/_index.md` | https://docs.datadoghq.com/real_user_monitoring/application_monitoring/browser/setup/server/ |
| `layouts/partials/rum/rum-correlate-rum-and-logs.html` | `content/en/real_user_monitoring/correlate_with_other_telemetry/logs/_index.md` | https://docs.datadoghq.com/real_user_monitoring/correlate_with_other_telemetry/logs/ |
| `layouts/partials/rum/rum-error-tracking-mobile.html` | `content/en/real_user_monitoring/error_tracking/mobile/_index.md` | https://docs.datadoghq.com/real_user_monitoring/error_tracking/mobile/ |
| `layouts/partials/rum/rum-feature-flag-tracking.html` | `content/en/real_user_monitoring/feature_flag_tracking/_index.md` | https://docs.datadoghq.com/real_user_monitoring/feature_flag_tracking/ |
| `layouts/partials/rum/rum-feature-flag-tracking.html` | `content/en/real_user_monitoring/feature_flag_tracking/setup.md` | https://docs.datadoghq.com/real_user_monitoring/feature_flag_tracking/setup/ |
| `layouts/partials/rum/rum-feature-flag-tracking.html` | `content/en/real_user_monitoring/guide/setup-feature-flag-data-collection.md` | https://docs.datadoghq.com/real_user_monitoring/guide/setup-feature-flag-data-collection/ |
| `layouts/partials/rum/rum-getting-started-mobile-advanced.html` | _No references found_ | - |
| `layouts/partials/rum/rum-getting-started-mobile-data-collected.html` | _No references found_ | - |
| `layouts/partials/rum/rum-getting-started-mobile-setup.html` | _No references found_ | - |
| `layouts/partials/rum/rum-getting-started-mobile-supported-versions.html` | _No references found_ | - |
| `layouts/partials/rum/rum-getting-started-setup.html` | `content/en/real_user_monitoring/application_monitoring/_index.md` | https://docs.datadoghq.com/real_user_monitoring/application_monitoring/ |
| `layouts/partials/rum/rum-getting-started.html` | `content/en/real_user_monitoring/_index.md` | https://docs.datadoghq.com/real_user_monitoring/ |
| `layouts/partials/rum/rum-mobile-integrated-libraries.html` | _No references found_ | - |
| `layouts/partials/rum/rum-troubleshooting-mobile.html` | _No references found_ | - |
| `layouts/partials/search-mobile.html` | _No references found_ | - |
| `layouts/partials/search.html` | _No references found_ | - |
| `layouts/partials/security-platform/CSW-billing-note.html` | `content/en/security/cloud_security_management/_index.md` | https://docs.datadoghq.com/security/cloud_security_management/ |
| `layouts/partials/security-platform/CSW-billing-note.html` | `content/en/security/cloud_security_management/setup/agent/_index.md` | https://docs.datadoghq.com/security/cloud_security_management/setup/agent/ |
| `layouts/partials/security-platform/CSW-billing-note.html` | `content/en/security/cloud_security_management/setup/agent/docker.md` | https://docs.datadoghq.com/security/cloud_security_management/setup/agent/docker/ |
| `layouts/partials/security-platform/CSW-billing-note.html` | `content/en/security/cloud_security_management/setup/agent/ecs_ec2.md` | https://docs.datadoghq.com/security/cloud_security_management/setup/agent/ecs_ec2/ |
| `layouts/partials/security-platform/CSW-billing-note.html` | `content/en/security/cloud_security_management/setup/agent/kubernetes.md` | https://docs.datadoghq.com/security/cloud_security_management/setup/agent/kubernetes/ |
| `layouts/partials/security-platform/CSW-billing-note.html` | `content/en/security/cloud_security_management/setup/agent/linux.md` | https://docs.datadoghq.com/security/cloud_security_management/setup/agent/linux/ |
| `layouts/partials/security-platform/CSW-billing-note.html` | `content/en/security/cloud_security_management/setup/agent/windows.md` | https://docs.datadoghq.com/security/cloud_security_management/setup/agent/windows/ |
| `layouts/partials/security-platform/CSW-billing-note.html` | `content/en/security/cloud_security_management/setup/cloud_integrations.md` | https://docs.datadoghq.com/security/cloud_security_management/setup/cloud_integrations/ |
| `layouts/partials/security-platform/CSW-billing-note.html` | `content/en/security/cloud_security_management/setup/supported_deployment_types.md` | https://docs.datadoghq.com/security/cloud_security_management/setup/supported_deployment_types/ |
| `layouts/partials/security-platform/WP-billing-note.html` | `content/en/security/workload_protection/setup/agent/_index.md` | https://docs.datadoghq.com/security/workload_protection/setup/agent/ |
| `layouts/partials/security-platform/WP-billing-note.html` | `content/en/security/workload_protection/setup/agent/docker.md` | https://docs.datadoghq.com/security/workload_protection/setup/agent/docker/ |
| `layouts/partials/security-platform/WP-billing-note.html` | `content/en/security/workload_protection/setup/agent/ecs_ec2.md` | https://docs.datadoghq.com/security/workload_protection/setup/agent/ecs_ec2/ |
| `layouts/partials/security-platform/WP-billing-note.html` | `content/en/security/workload_protection/setup/agent/kubernetes.md` | https://docs.datadoghq.com/security/workload_protection/setup/agent/kubernetes/ |
| `layouts/partials/security-platform/WP-billing-note.html` | `content/en/security/workload_protection/setup/agent/linux.md` | https://docs.datadoghq.com/security/workload_protection/setup/agent/linux/ |
| `layouts/partials/security-platform/WP-billing-note.html` | `content/en/security/workload_protection/setup/agent/windows.md` | https://docs.datadoghq.com/security/workload_protection/setup/agent/windows/ |
| `layouts/partials/security-platform/appsec-languages-code-security.html` | `content/en/security/code_security/iast/setup/compatibility/_index.md` | https://docs.datadoghq.com/security/code_security/iast/setup/compatibility/ |
| `layouts/partials/security-platform/appsec-languages-sca.html` | `content/en/security/code_security/software_composition_analysis/setup_runtime/compatibility/_index.md` | https://docs.datadoghq.com/security/code_security/software_composition_analysis/setup_runtime/compatibility/ |
| `layouts/partials/security-platform/appsec-languages.html` | `content/en/security/application_security/setup/compatibility/_index.md` | https://docs.datadoghq.com/security/application_security/setup/compatibility/ |
| `layouts/partials/security-platform/appsec-libraries-serverless.html` | `content/en/security/application_security/setup/compatibility/serverless.md` | https://docs.datadoghq.com/security/application_security/setup/compatibility/serverless/ |
| `layouts/partials/security-platform/appsec-serverless.html` | _No references found_ | - |
| `layouts/partials/serverless/getting-started-languages.html` | `content/en/serverless/aws_lambda/instrumentation/_index.md` | https://docs.datadoghq.com/serverless/aws_lambda/instrumentation/ |
| `layouts/partials/serverless/google-cloud-run-workloads.html` | `content/en/serverless/google_cloud_run/_index.md` | https://docs.datadoghq.com/serverless/google_cloud_run/ |
| `layouts/partials/serverless/lambda-managed-instances-runtimes.html` | `content/en/serverless/aws_lambda/managed_instances.md` | https://docs.datadoghq.com/serverless/aws_lambda/managed_instances/ |
| `layouts/partials/serverless/serverless-apm-recommendations.html` | `content/en/serverless/aws_lambda/distributed_tracing.md` | https://docs.datadoghq.com/serverless/aws_lambda/distributed_tracing/ |
| `layouts/partials/serverless/serverless-guide.html` | _No references found_ | - |
| `layouts/partials/serverless/serverless-setup.html` | _No references found_ | - |
| `layouts/partials/sidenav/api-sidenav.html` | _No references found_ | - |
| `layouts/partials/sidenav/main-sidenav.html` | _No references found_ | - |
| `layouts/partials/sidenav/partners-sidenav.html` | _No references found_ | - |
| `layouts/partials/site_support_banner/site_support_banner.html` | _No references found_ | - |
| `layouts/partials/static_analysis/try-rule-modal.html` | _No references found_ | - |
| `layouts/partials/support/support.html` | `content/en/help.md` | https://docs.datadoghq.com/help/ |
| `layouts/partials/synthetics/network-layers.html` | `content/en/synthetics/api_tests/_index.md` | https://docs.datadoghq.com/synthetics/api_tests/ |
| `layouts/partials/table-of-contents/scraped-toc.html` | _No references found_ | - |
| `layouts/partials/table-of-contents/table-of-contents.html` | _No references found_ | - |
| `layouts/partials/trace_collection/python/supported_runtimes.html` | `content/en/security/application_security/setup/compatibility/python.md` | https://docs.datadoghq.com/security/application_security/setup/compatibility/python/ |
| `layouts/partials/trace_collection/python/supported_runtimes.html` | `content/en/security/application_security/setup/python/compatibility.md` | https://docs.datadoghq.com/security/application_security/setup/python/compatibility/ |
| `layouts/partials/trace_collection/python/supported_runtimes.html` | `content/en/security/code_security/iast/setup/_index.md` | https://docs.datadoghq.com/security/code_security/iast/setup/ |
| `layouts/partials/trace_collection/python/supported_runtimes.html` | `content/en/security/code_security/iast/setup/compatibility/python.md` | https://docs.datadoghq.com/security/code_security/iast/setup/compatibility/python/ |
| `layouts/partials/trace_collection/python/supported_runtimes.html` | `content/en/security/code_security/software_composition_analysis/setup_runtime/compatibility/python.md` | https://docs.datadoghq.com/security/code_security/software_composition_analysis/setup_runtime/compatibility/python/ |
| `layouts/partials/trace_collection/python/supported_runtimes.html` | `content/en/tracing/trace_collection/compatibility/python.md` | https://docs.datadoghq.com/tracing/trace_collection/compatibility/python/ |
| `layouts/partials/trace_collection/python/supported_versions.html` | `content/en/security/application_security/setup/compatibility/python.md` | https://docs.datadoghq.com/security/application_security/setup/compatibility/python/ |
| `layouts/partials/trace_collection/python/supported_versions.html` | `content/en/security/application_security/setup/python/compatibility.md` | https://docs.datadoghq.com/security/application_security/setup/python/compatibility/ |
| `layouts/partials/trace_collection/python/supported_versions.html` | `content/en/security/code_security/iast/setup/_index.md` | https://docs.datadoghq.com/security/code_security/iast/setup/ |
| `layouts/partials/trace_collection/python/supported_versions.html` | `content/en/security/code_security/iast/setup/compatibility/python.md` | https://docs.datadoghq.com/security/code_security/iast/setup/compatibility/python/ |
| `layouts/partials/trace_collection/python/supported_versions.html` | `content/en/security/code_security/software_composition_analysis/setup_runtime/compatibility/python.md` | https://docs.datadoghq.com/security/code_security/software_composition_analysis/setup_runtime/compatibility/python/ |
| `layouts/partials/trace_collection/python/supported_versions.html` | `content/en/tracing/trace_collection/compatibility/python.md` | https://docs.datadoghq.com/tracing/trace_collection/compatibility/python/ |
| `layouts/partials/translate_status_banner/translate_status_banner.html` | _No references found_ | - |
| `layouts/partials/video.html` | _No references found_ | - |
| `layouts/partials/whats-next/whats-next.html` | `content/en/account_management/audit_trail/_index.md` | https://docs.datadoghq.com/account_management/audit_trail/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/account_management/audit_trail/events.md` | https://docs.datadoghq.com/account_management/audit_trail/events/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/account_management/audit_trail/forwarding_audit_events.md` | https://docs.datadoghq.com/account_management/audit_trail/forwarding_audit_events/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/account_management/audit_trail/guides/track_dashboard_access_and_configuration_changes.md` | https://docs.datadoghq.com/account_management/audit_trail/guides/track_dashboard_access_and_configuration_changes/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/account_management/audit_trail/guides/track_monitor_access_and_configuration_changes.md` | https://docs.datadoghq.com/account_management/audit_trail/guides/track_monitor_access_and_configuration_changes/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/account_management/authn_mapping/_index.md` | https://docs.datadoghq.com/account_management/authn_mapping/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/account_management/billing/ci_visibility.md` | https://docs.datadoghq.com/account_management/billing/ci_visibility/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/account_management/billing/incident_response.md` | https://docs.datadoghq.com/account_management/billing/incident_response/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/account_management/billing/rum.md` | https://docs.datadoghq.com/account_management/billing/rum/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/account_management/billing/usage_attribution.md` | https://docs.datadoghq.com/account_management/billing/usage_attribution/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/account_management/billing/usage_metrics.md` | https://docs.datadoghq.com/account_management/billing/usage_metrics/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/account_management/cloud_provider_authentication.md` | https://docs.datadoghq.com/account_management/cloud_provider_authentication/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/account_management/faq/okta.md` | https://docs.datadoghq.com/account_management/faq/okta/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/account_management/governance_console/_index.md` | https://docs.datadoghq.com/account_management/governance_console/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/account_management/guide/access-your-support-ticket.md` | https://docs.datadoghq.com/account_management/guide/access-your-support-ticket/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/account_management/guide/hourly-usage-migration.md` | https://docs.datadoghq.com/account_management/guide/hourly-usage-migration/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/account_management/guide/manage-datadog-with-terraform.md` | https://docs.datadoghq.com/account_management/guide/manage-datadog-with-terraform/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/account_management/guide/usage-attribution-migration.md` | https://docs.datadoghq.com/account_management/guide/usage-attribution-migration/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/account_management/multi_organization.md` | https://docs.datadoghq.com/account_management/multi_organization/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/account_management/org_settings.md` | https://docs.datadoghq.com/account_management/org_settings/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/account_management/org_settings/domain_allowlist.md` | https://docs.datadoghq.com/account_management/org_settings/domain_allowlist/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/account_management/org_settings/domain_allowlist_api.md` | https://docs.datadoghq.com/account_management/org_settings/domain_allowlist_api/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/account_management/org_settings/oauth_apps.md` | https://docs.datadoghq.com/account_management/org_settings/oauth_apps/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/account_management/org_settings/service_accounts.md` | https://docs.datadoghq.com/account_management/org_settings/service_accounts/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/account_management/org_switching.md` | https://docs.datadoghq.com/account_management/org_switching/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/account_management/plan_and_usage/cost_details.md` | https://docs.datadoghq.com/account_management/plan_and_usage/cost_details/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/account_management/rbac/_index.md` | https://docs.datadoghq.com/account_management/rbac/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/account_management/rbac/data_access.md` | https://docs.datadoghq.com/account_management/rbac/data_access/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/account_management/rbac/permissions.md` | https://docs.datadoghq.com/account_management/rbac/permissions/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/account_management/safety_center.md` | https://docs.datadoghq.com/account_management/safety_center/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/account_management/saml/_index.md` | https://docs.datadoghq.com/account_management/saml/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/account_management/saml/activedirectory.md` | https://docs.datadoghq.com/account_management/saml/activedirectory/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/account_management/saml/auth0.md` | https://docs.datadoghq.com/account_management/saml/auth0/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/account_management/saml/entra.md` | https://docs.datadoghq.com/account_management/saml/entra/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/account_management/saml/google.md` | https://docs.datadoghq.com/account_management/saml/google/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/account_management/saml/lastpass.md` | https://docs.datadoghq.com/account_management/saml/lastpass/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/account_management/saml/okta.md` | https://docs.datadoghq.com/account_management/saml/okta/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/account_management/saml/safenet.md` | https://docs.datadoghq.com/account_management/saml/safenet/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/account_management/saml/troubleshooting.md` | https://docs.datadoghq.com/account_management/saml/troubleshooting/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/account_management/scim/_index.md` | https://docs.datadoghq.com/account_management/scim/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/account_management/scim/okta.md` | https://docs.datadoghq.com/account_management/scim/okta/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/account_management/teams/github.md` | https://docs.datadoghq.com/account_management/teams/github/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/account_management/users/_index.md` | https://docs.datadoghq.com/account_management/users/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/actions/agents/_index.md` | https://docs.datadoghq.com/actions/agents/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/actions/app_builder/_index.md` | https://docs.datadoghq.com/actions/app_builder/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/actions/app_builder/build.md` | https://docs.datadoghq.com/actions/app_builder/build/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/actions/app_builder/components/_index.md` | https://docs.datadoghq.com/actions/app_builder/components/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/actions/app_builder/components/custom_charts.md` | https://docs.datadoghq.com/actions/app_builder/components/custom_charts/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/actions/app_builder/components/react_renderer.md` | https://docs.datadoghq.com/actions/app_builder/components/react_renderer/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/actions/app_builder/components/reusable_modules.md` | https://docs.datadoghq.com/actions/app_builder/components/reusable_modules/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/actions/app_builder/components/tables.md` | https://docs.datadoghq.com/actions/app_builder/components/tables/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/actions/app_builder/embedded_apps/_index.md` | https://docs.datadoghq.com/actions/app_builder/embedded_apps/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/actions/app_builder/events.md` | https://docs.datadoghq.com/actions/app_builder/events/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/actions/app_builder/expressions.md` | https://docs.datadoghq.com/actions/app_builder/expressions/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/actions/app_builder/queries.md` | https://docs.datadoghq.com/actions/app_builder/queries/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/actions/app_builder/saved_actions.md` | https://docs.datadoghq.com/actions/app_builder/saved_actions/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/actions/app_builder/variables.md` | https://docs.datadoghq.com/actions/app_builder/variables/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/actions/connections/_index.md` | https://docs.datadoghq.com/actions/connections/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/actions/connections/http.md` | https://docs.datadoghq.com/actions/connections/http/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/actions/datastores/_index.md` | https://docs.datadoghq.com/actions/datastores/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/actions/datastores/auth.md` | https://docs.datadoghq.com/actions/datastores/auth/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/actions/datastores/create.md` | https://docs.datadoghq.com/actions/datastores/create/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/actions/datastores/trigger.md` | https://docs.datadoghq.com/actions/datastores/trigger/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/actions/datastores/use.md` | https://docs.datadoghq.com/actions/datastores/use/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/actions/forms/_index.md` | https://docs.datadoghq.com/actions/forms/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/actions/private_actions/_index.md` | https://docs.datadoghq.com/actions/private_actions/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/actions/private_actions/use_private_actions.md` | https://docs.datadoghq.com/actions/private_actions/use_private_actions/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/actions/workflows/_index.md` | https://docs.datadoghq.com/actions/workflows/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/actions/workflows/access_and_auth.md` | https://docs.datadoghq.com/actions/workflows/access_and_auth/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/actions/workflows/actions/_index.md` | https://docs.datadoghq.com/actions/workflows/actions/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/actions/workflows/actions/flow_control.md` | https://docs.datadoghq.com/actions/workflows/actions/flow_control/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/actions/workflows/build.md` | https://docs.datadoghq.com/actions/workflows/build/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/actions/workflows/expressions.md` | https://docs.datadoghq.com/actions/workflows/expressions/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/actions/workflows/limits.md` | https://docs.datadoghq.com/actions/workflows/limits/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/actions/workflows/saved_actions.md` | https://docs.datadoghq.com/actions/workflows/saved_actions/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/actions/workflows/test_and_debug.md` | https://docs.datadoghq.com/actions/workflows/test_and_debug/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/actions/workflows/track.md` | https://docs.datadoghq.com/actions/workflows/track/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/actions/workflows/trigger.md` | https://docs.datadoghq.com/actions/workflows/trigger/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/actions/workflows/variables.md` | https://docs.datadoghq.com/actions/workflows/variables/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/administrators_guide/_index.md` | https://docs.datadoghq.com/administrators_guide/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/administrators_guide/build.md` | https://docs.datadoghq.com/administrators_guide/build/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/administrators_guide/getting_started.md` | https://docs.datadoghq.com/administrators_guide/getting_started/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/administrators_guide/plan.md` | https://docs.datadoghq.com/administrators_guide/plan/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/administrators_guide/run.md` | https://docs.datadoghq.com/administrators_guide/run/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/agent/_index.md` | https://docs.datadoghq.com/agent/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/agent/architecture.md` | https://docs.datadoghq.com/agent/architecture/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/agent/configuration/_index.md` | https://docs.datadoghq.com/agent/configuration/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/agent/configuration/agent-commands.md` | https://docs.datadoghq.com/agent/configuration/agent-commands/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/agent/configuration/agent-log-files.md` | https://docs.datadoghq.com/agent/configuration/agent-log-files/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/agent/configuration/agent-status-page.md` | https://docs.datadoghq.com/agent/configuration/agent-status-page/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/agent/configuration/dual-shipping.md` | https://docs.datadoghq.com/agent/configuration/dual-shipping/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/agent/configuration/fips-compliance.md` | https://docs.datadoghq.com/agent/configuration/fips-compliance/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/agent/configuration/network.md` | https://docs.datadoghq.com/agent/configuration/network/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/agent/configuration/proxy.md` | https://docs.datadoghq.com/agent/configuration/proxy/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/agent/configuration/proxy_squid.md` | https://docs.datadoghq.com/agent/configuration/proxy_squid/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/agent/configuration/secrets-management.md` | https://docs.datadoghq.com/agent/configuration/secrets-management/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/agent/faq/agent-5-sectigo-root-ca-rotation.md` | https://docs.datadoghq.com/agent/faq/agent-5-sectigo-root-ca-rotation/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/agent/faq/agent_v6_changes.md` | https://docs.datadoghq.com/agent/faq/agent_v6_changes/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/agent/faq/error-restarting-agent-already-listening-on-a-configured-port.md` | https://docs.datadoghq.com/agent/faq/error-restarting-agent-already-listening-on-a-configured-port/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/agent/faq/fips_proxy.md` | https://docs.datadoghq.com/agent/faq/fips_proxy/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/agent/faq/host-metrics-with-the-container-agent.md` | https://docs.datadoghq.com/agent/faq/host-metrics-with-the-container-agent/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/agent/faq/log4j_mitigation.md` | https://docs.datadoghq.com/agent/faq/log4j_mitigation/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/agent/faq/proxy_example_haproxy.md` | https://docs.datadoghq.com/agent/faq/proxy_example_haproxy/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/agent/faq/proxy_example_nginx.md` | https://docs.datadoghq.com/agent/faq/proxy_example_nginx/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/agent/fleet_automation/_index.md` | https://docs.datadoghq.com/agent/fleet_automation/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/agent/fleet_automation/remote_management.md` | https://docs.datadoghq.com/agent/fleet_automation/remote_management/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/agent/guide/agent-v6-python-3.md` | https://docs.datadoghq.com/agent/guide/agent-v6-python-3/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/agent/guide/datadog-agent-manager-windows.md` | https://docs.datadoghq.com/agent/guide/datadog-agent-manager-windows/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/agent/guide/datadog-disaster-recovery.md` | https://docs.datadoghq.com/agent/guide/datadog-disaster-recovery/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/agent/guide/environment-variables.md` | https://docs.datadoghq.com/agent/guide/environment-variables/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/agent/guide/gcp-private-service-connect.md` | https://docs.datadoghq.com/agent/guide/gcp-private-service-connect/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/agent/guide/heroku-ruby.md` | https://docs.datadoghq.com/agent/guide/heroku-ruby/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/agent/guide/how-do-i-uninstall-the-agent.md` | https://docs.datadoghq.com/agent/guide/how-do-i-uninstall-the-agent/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/agent/guide/install-agent-5.md` | https://docs.datadoghq.com/agent/guide/install-agent-5/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/agent/guide/install-agent-6.md` | https://docs.datadoghq.com/agent/guide/install-agent-6/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/agent/guide/installing-the-agent-on-a-server-with-limited-internet-connectivity.md` | https://docs.datadoghq.com/agent/guide/installing-the-agent-on-a-server-with-limited-internet-connectivity/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/agent/guide/private-link.md` | https://docs.datadoghq.com/agent/guide/private-link/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/agent/guide/python-3.md` | https://docs.datadoghq.com/agent/guide/python-3/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/agent/guide/setup_remote_config.md` | https://docs.datadoghq.com/agent/guide/setup_remote_config/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/agent/guide/upgrade.md` | https://docs.datadoghq.com/agent/guide/upgrade/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/agent/guide/upgrade_agent_fleet_automation.md` | https://docs.datadoghq.com/agent/guide/upgrade_agent_fleet_automation/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/agent/guide/use-community-integrations.md` | https://docs.datadoghq.com/agent/guide/use-community-integrations/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/agent/guide/version_differences.md` | https://docs.datadoghq.com/agent/guide/version_differences/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/agent/guide/why-should-i-install-the-agent-on-my-cloud-instances.md` | https://docs.datadoghq.com/agent/guide/why-should-i-install-the-agent-on-my-cloud-instances/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/agent/iot/_index.md` | https://docs.datadoghq.com/agent/iot/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/agent/logs/_index.md` | https://docs.datadoghq.com/agent/logs/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/agent/logs/advanced_log_collection.md` | https://docs.datadoghq.com/agent/logs/advanced_log_collection/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/agent/logs/agent_tags.md` | https://docs.datadoghq.com/agent/logs/agent_tags/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/agent/logs/auto_multiline_detection.md` | https://docs.datadoghq.com/agent/logs/auto_multiline_detection/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/agent/logs/auto_multiline_detection_legacy.md` | https://docs.datadoghq.com/agent/logs/auto_multiline_detection_legacy/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/agent/logs/proxy.md` | https://docs.datadoghq.com/agent/logs/proxy/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/agent/supported_platforms/_index.md` | https://docs.datadoghq.com/agent/supported_platforms/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/agent/supported_platforms/aix.md` | https://docs.datadoghq.com/agent/supported_platforms/aix/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/agent/supported_platforms/linux.md` | https://docs.datadoghq.com/agent/supported_platforms/linux/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/agent/supported_platforms/osx.md` | https://docs.datadoghq.com/agent/supported_platforms/osx/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/agent/supported_platforms/sccm.md` | https://docs.datadoghq.com/agent/supported_platforms/sccm/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/agent/supported_platforms/source.md` | https://docs.datadoghq.com/agent/supported_platforms/source/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/agent/supported_platforms/windows.md` | https://docs.datadoghq.com/agent/supported_platforms/windows/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/agent/troubleshooting/_index.md` | https://docs.datadoghq.com/agent/troubleshooting/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/agent/troubleshooting/agent_check_status.md` | https://docs.datadoghq.com/agent/troubleshooting/agent_check_status/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/agent/troubleshooting/autodiscovery.md` | https://docs.datadoghq.com/agent/troubleshooting/autodiscovery/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/agent/troubleshooting/config.md` | https://docs.datadoghq.com/agent/troubleshooting/config/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/agent/troubleshooting/debug_mode.md` | https://docs.datadoghq.com/agent/troubleshooting/debug_mode/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/agent/troubleshooting/high_memory_usage.md` | https://docs.datadoghq.com/agent/troubleshooting/high_memory_usage/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/agent/troubleshooting/integrations.md` | https://docs.datadoghq.com/agent/troubleshooting/integrations/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/agent/troubleshooting/permissions.md` | https://docs.datadoghq.com/agent/troubleshooting/permissions/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/agent/troubleshooting/send_a_flare.md` | https://docs.datadoghq.com/agent/troubleshooting/send_a_flare/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/ai_agents_console/_index.md` | https://docs.datadoghq.com/ai_agents_console/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/api/latest/_index.md` | https://docs.datadoghq.com/api/latest/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/bits_ai/_index.md` | https://docs.datadoghq.com/bits_ai/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/bits_ai/bits_ai_dev_agent/_index.md` | https://docs.datadoghq.com/bits_ai/bits_ai_dev_agent/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/bits_ai/bits_ai_sre/_index.md` | https://docs.datadoghq.com/bits_ai/bits_ai_sre/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/bits_ai/chat_with_bits_ai.md` | https://docs.datadoghq.com/bits_ai/chat_with_bits_ai/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/bits_ai/mcp_server.md` | https://docs.datadoghq.com/bits_ai/mcp_server/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/bits_ai/mcp_server/setup/_index.md` | https://docs.datadoghq.com/bits_ai/mcp_server/setup/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/change_tracking/_index.md` | https://docs.datadoghq.com/change_tracking/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/change_tracking/feature_flags.md` | https://docs.datadoghq.com/change_tracking/feature_flags/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/cloud_cost_management/_index.md` | https://docs.datadoghq.com/cloud_cost_management/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/cloud_cost_management/allocation/_index.md` | https://docs.datadoghq.com/cloud_cost_management/allocation/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/cloud_cost_management/allocation/bigquery.md` | https://docs.datadoghq.com/cloud_cost_management/allocation/bigquery/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/cloud_cost_management/allocation/container_cost_allocation.md` | https://docs.datadoghq.com/cloud_cost_management/allocation/container_cost_allocation/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/cloud_cost_management/allocation/custom_allocation_rules.md` | https://docs.datadoghq.com/cloud_cost_management/allocation/custom_allocation_rules/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/cloud_cost_management/allocation/tag_pipelines.md` | https://docs.datadoghq.com/cloud_cost_management/allocation/tag_pipelines/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/cloud_cost_management/cost_changes/_index.md` | https://docs.datadoghq.com/cloud_cost_management/cost_changes/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/cloud_cost_management/cost_changes/anomalies.md` | https://docs.datadoghq.com/cloud_cost_management/cost_changes/anomalies/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/cloud_cost_management/datadog_costs.md` | https://docs.datadoghq.com/cloud_cost_management/datadog_costs/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/cloud_cost_management/planning/_index.md` | https://docs.datadoghq.com/cloud_cost_management/planning/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/cloud_cost_management/planning/budgets.md` | https://docs.datadoghq.com/cloud_cost_management/planning/budgets/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/cloud_cost_management/planning/commitment_programs.md` | https://docs.datadoghq.com/cloud_cost_management/planning/commitment_programs/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/cloud_cost_management/recommendations/_index.md` | https://docs.datadoghq.com/cloud_cost_management/recommendations/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/cloud_cost_management/recommendations/custom_recommendations.md` | https://docs.datadoghq.com/cloud_cost_management/recommendations/custom_recommendations/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/cloud_cost_management/reporting/_index.md` | https://docs.datadoghq.com/cloud_cost_management/reporting/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/cloud_cost_management/reporting/explorer.md` | https://docs.datadoghq.com/cloud_cost_management/reporting/explorer/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/cloud_cost_management/reporting/scheduled_reports.md` | https://docs.datadoghq.com/cloud_cost_management/reporting/scheduled_reports/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/cloud_cost_management/setup/aws.md` | https://docs.datadoghq.com/cloud_cost_management/setup/aws/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/cloud_cost_management/setup/azure.md` | https://docs.datadoghq.com/cloud_cost_management/setup/azure/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/cloud_cost_management/setup/custom.md` | https://docs.datadoghq.com/cloud_cost_management/setup/custom/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/cloud_cost_management/setup/google_cloud.md` | https://docs.datadoghq.com/cloud_cost_management/setup/google_cloud/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/cloud_cost_management/setup/oracle.md` | https://docs.datadoghq.com/cloud_cost_management/setup/oracle/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/cloud_cost_management/setup/saas_costs.md` | https://docs.datadoghq.com/cloud_cost_management/setup/saas_costs/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/cloud_cost_management/tags/_index.md` | https://docs.datadoghq.com/cloud_cost_management/tags/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/cloud_cost_management/tags/multisource_querying.md` | https://docs.datadoghq.com/cloud_cost_management/tags/multisource_querying/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/cloud_cost_management/tags/tag_explorer.md` | https://docs.datadoghq.com/cloud_cost_management/tags/tag_explorer/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/cloudcraft/_index.md` | https://docs.datadoghq.com/cloudcraft/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/cloudprem/_index.md` | https://docs.datadoghq.com/cloudprem/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/cloudprem/configure/ingress.md` | https://docs.datadoghq.com/cloudprem/configure/ingress/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/cloudprem/configure/pipelines.md` | https://docs.datadoghq.com/cloudprem/configure/pipelines/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/cloudprem/ingest/agent.md` | https://docs.datadoghq.com/cloudprem/ingest/agent/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/cloudprem/ingest/api.md` | https://docs.datadoghq.com/cloudprem/ingest/api/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/cloudprem/ingest/observability_pipelines.md` | https://docs.datadoghq.com/cloudprem/ingest/observability_pipelines/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/cloudprem/install/aws_eks.md` | https://docs.datadoghq.com/cloudprem/install/aws_eks/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/cloudprem/install/docker.md` | https://docs.datadoghq.com/cloudprem/install/docker/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/cloudprem/introduction/architecture.md` | https://docs.datadoghq.com/cloudprem/introduction/architecture/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/cloudprem/introduction/network.md` | https://docs.datadoghq.com/cloudprem/introduction/network/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/cloudprem/operate/search_logs.md` | https://docs.datadoghq.com/cloudprem/operate/search_logs/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/cloudprem/operate/sizing.md` | https://docs.datadoghq.com/cloudprem/operate/sizing/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/cloudprem/operate/troubleshooting.md` | https://docs.datadoghq.com/cloudprem/operate/troubleshooting/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/code_coverage/_index.md` | https://docs.datadoghq.com/code_coverage/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/code_coverage/configuration.md` | https://docs.datadoghq.com/code_coverage/configuration/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/code_coverage/data_collected.md` | https://docs.datadoghq.com/code_coverage/data_collected/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/code_coverage/setup.md` | https://docs.datadoghq.com/code_coverage/setup/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/containers/_index.md` | https://docs.datadoghq.com/containers/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/containers/amazon_ecs/_index.md` | https://docs.datadoghq.com/containers/amazon_ecs/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/containers/amazon_ecs/apm.md` | https://docs.datadoghq.com/containers/amazon_ecs/apm/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/containers/amazon_ecs/data_collected.md` | https://docs.datadoghq.com/containers/amazon_ecs/data_collected/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/containers/amazon_ecs/logs.md` | https://docs.datadoghq.com/containers/amazon_ecs/logs/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/containers/amazon_ecs/managed_instances.md` | https://docs.datadoghq.com/containers/amazon_ecs/managed_instances/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/containers/amazon_ecs/tags.md` | https://docs.datadoghq.com/containers/amazon_ecs/tags/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/containers/autoscaling/_index.md` | https://docs.datadoghq.com/containers/autoscaling/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/containers/bits_ai_kubernetes_remediation.md` | https://docs.datadoghq.com/containers/bits_ai_kubernetes_remediation/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/containers/cluster_agent/_index.md` | https://docs.datadoghq.com/containers/cluster_agent/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/containers/cluster_agent/admission_controller.md` | https://docs.datadoghq.com/containers/cluster_agent/admission_controller/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/containers/cluster_agent/clusterchecks.md` | https://docs.datadoghq.com/containers/cluster_agent/clusterchecks/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/containers/cluster_agent/commands.md` | https://docs.datadoghq.com/containers/cluster_agent/commands/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/containers/cluster_agent/endpointschecks.md` | https://docs.datadoghq.com/containers/cluster_agent/endpointschecks/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/containers/cluster_agent/setup.md` | https://docs.datadoghq.com/containers/cluster_agent/setup/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/containers/datadog_operator/_index.md` | https://docs.datadoghq.com/containers/datadog_operator/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/containers/datadog_operator/crd_monitor.md` | https://docs.datadoghq.com/containers/datadog_operator/crd_monitor/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/containers/docker/_index.md` | https://docs.datadoghq.com/containers/docker/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/containers/docker/apm.md` | https://docs.datadoghq.com/containers/docker/apm/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/containers/docker/log.md` | https://docs.datadoghq.com/containers/docker/log/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/containers/docker/prometheus.md` | https://docs.datadoghq.com/containers/docker/prometheus/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/containers/docker/tag.md` | https://docs.datadoghq.com/containers/docker/tag/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/containers/guide/ad_identifiers.md` | https://docs.datadoghq.com/containers/guide/ad_identifiers/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/containers/guide/auto_conf.md` | https://docs.datadoghq.com/containers/guide/auto_conf/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/containers/guide/autodiscovery-examples.md` | https://docs.datadoghq.com/containers/guide/autodiscovery-examples/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/containers/guide/autodiscovery-with-jmx.md` | https://docs.datadoghq.com/containers/guide/autodiscovery-with-jmx/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/containers/guide/aws-batch-ecs-fargate.md` | https://docs.datadoghq.com/containers/guide/aws-batch-ecs-fargate/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/containers/guide/cluster_agent_autoscaling_metrics.md` | https://docs.datadoghq.com/containers/guide/cluster_agent_autoscaling_metrics/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/containers/guide/cluster_agent_disable_admission_controller.md` | https://docs.datadoghq.com/containers/guide/cluster_agent_disable_admission_controller/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/containers/guide/compose-and-the-datadog-agent.md` | https://docs.datadoghq.com/containers/guide/compose-and-the-datadog-agent/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/containers/guide/container-discovery-management.md` | https://docs.datadoghq.com/containers/guide/container-discovery-management/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/containers/guide/container-images-for-docker-environments.md` | https://docs.datadoghq.com/containers/guide/container-images-for-docker-environments/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/containers/guide/kubernetes-legacy.md` | https://docs.datadoghq.com/containers/guide/kubernetes-legacy/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/containers/guide/manage-datdadogpodautoscaler-with-terraform.md` | https://docs.datadoghq.com/containers/guide/manage-datdadogpodautoscaler-with-terraform/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/containers/guide/operator-advanced.md` | https://docs.datadoghq.com/containers/guide/operator-advanced/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/containers/guide/operator-eks-addon.md` | https://docs.datadoghq.com/containers/guide/operator-eks-addon/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/containers/guide/readonly-root-filesystem.md` | https://docs.datadoghq.com/containers/guide/readonly-root-filesystem/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/containers/guide/template_variables.md` | https://docs.datadoghq.com/containers/guide/template_variables/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/containers/kubernetes/_index.md` | https://docs.datadoghq.com/containers/kubernetes/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/containers/kubernetes/apm.md` | https://docs.datadoghq.com/containers/kubernetes/apm/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/containers/kubernetes/appsec.md` | https://docs.datadoghq.com/containers/kubernetes/appsec/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/containers/kubernetes/csi_driver.md` | https://docs.datadoghq.com/containers/kubernetes/csi_driver/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/containers/kubernetes/data_collected.md` | https://docs.datadoghq.com/containers/kubernetes/data_collected/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/containers/kubernetes/distributions.md` | https://docs.datadoghq.com/containers/kubernetes/distributions/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/containers/kubernetes/installation.md` | https://docs.datadoghq.com/containers/kubernetes/installation/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/containers/kubernetes/integrations.md` | https://docs.datadoghq.com/containers/kubernetes/integrations/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/containers/kubernetes/log.md` | https://docs.datadoghq.com/containers/kubernetes/log/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/containers/kubernetes/prometheus.md` | https://docs.datadoghq.com/containers/kubernetes/prometheus/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/containers/kubernetes/tag.md` | https://docs.datadoghq.com/containers/kubernetes/tag/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/containers/troubleshooting/_index.md` | https://docs.datadoghq.com/containers/troubleshooting/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/containers/troubleshooting/admission-controller.md` | https://docs.datadoghq.com/containers/troubleshooting/admission-controller/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/containers/troubleshooting/cluster-agent.md` | https://docs.datadoghq.com/containers/troubleshooting/cluster-agent/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/containers/troubleshooting/cluster-and-endpoint-checks.md` | https://docs.datadoghq.com/containers/troubleshooting/cluster-and-endpoint-checks/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/containers/troubleshooting/hpa.md` | https://docs.datadoghq.com/containers/troubleshooting/hpa/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/containers/troubleshooting/log-collection.md` | https://docs.datadoghq.com/containers/troubleshooting/log-collection/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/continuous_delivery/_index.md` | https://docs.datadoghq.com/continuous_delivery/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/continuous_delivery/deployments/_index.md` | https://docs.datadoghq.com/continuous_delivery/deployments/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/continuous_delivery/deployments/argocd.md` | https://docs.datadoghq.com/continuous_delivery/deployments/argocd/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/continuous_delivery/deployments/ciproviders.md` | https://docs.datadoghq.com/continuous_delivery/deployments/ciproviders/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/continuous_delivery/explorer/_index.md` | https://docs.datadoghq.com/continuous_delivery/explorer/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/continuous_delivery/explorer/facets.md` | https://docs.datadoghq.com/continuous_delivery/explorer/facets/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/continuous_delivery/explorer/saved_views.md` | https://docs.datadoghq.com/continuous_delivery/explorer/saved_views/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/continuous_delivery/explorer/search_syntax.md` | https://docs.datadoghq.com/continuous_delivery/explorer/search_syntax/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/continuous_delivery/features/code_changes_detection.md` | https://docs.datadoghq.com/continuous_delivery/features/code_changes_detection/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/continuous_delivery/features/rollbacks_detection.md` | https://docs.datadoghq.com/continuous_delivery/features/rollbacks_detection/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/continuous_integration/_index.md` | https://docs.datadoghq.com/continuous_integration/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/continuous_integration/explorer/_index.md` | https://docs.datadoghq.com/continuous_integration/explorer/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/continuous_integration/explorer/export.md` | https://docs.datadoghq.com/continuous_integration/explorer/export/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/continuous_integration/explorer/facets.md` | https://docs.datadoghq.com/continuous_integration/explorer/facets/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/continuous_integration/explorer/saved_views.md` | https://docs.datadoghq.com/continuous_integration/explorer/saved_views/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/continuous_integration/explorer/search_syntax.md` | https://docs.datadoghq.com/continuous_integration/explorer/search_syntax/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/continuous_integration/guides/identify_highest_impact_jobs_with_critical_path.md` | https://docs.datadoghq.com/continuous_integration/guides/identify_highest_impact_jobs_with_critical_path/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/continuous_integration/guides/infrastructure_metrics_with_gitlab.md` | https://docs.datadoghq.com/continuous_integration/guides/infrastructure_metrics_with_gitlab/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/continuous_integration/guides/ingestion_control.md` | https://docs.datadoghq.com/continuous_integration/guides/ingestion_control/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/continuous_integration/guides/pipeline_data_model.md` | https://docs.datadoghq.com/continuous_integration/guides/pipeline_data_model/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/continuous_integration/guides/use_ci_jobs_failure_analysis.md` | https://docs.datadoghq.com/continuous_integration/guides/use_ci_jobs_failure_analysis/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/continuous_integration/pipelines/_index.md` | https://docs.datadoghq.com/continuous_integration/pipelines/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/continuous_integration/pipelines/awscodepipeline.md` | https://docs.datadoghq.com/continuous_integration/pipelines/awscodepipeline/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/continuous_integration/pipelines/azure.md` | https://docs.datadoghq.com/continuous_integration/pipelines/azure/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/continuous_integration/pipelines/buildkite.md` | https://docs.datadoghq.com/continuous_integration/pipelines/buildkite/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/continuous_integration/pipelines/circleci.md` | https://docs.datadoghq.com/continuous_integration/pipelines/circleci/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/continuous_integration/pipelines/codefresh.md` | https://docs.datadoghq.com/continuous_integration/pipelines/codefresh/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/continuous_integration/pipelines/custom.md` | https://docs.datadoghq.com/continuous_integration/pipelines/custom/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/continuous_integration/pipelines/custom_commands.md` | https://docs.datadoghq.com/continuous_integration/pipelines/custom_commands/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/continuous_integration/pipelines/custom_tags_and_measures.md` | https://docs.datadoghq.com/continuous_integration/pipelines/custom_tags_and_measures/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/continuous_integration/pipelines/github.md` | https://docs.datadoghq.com/continuous_integration/pipelines/github/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/continuous_integration/pipelines/gitlab.md` | https://docs.datadoghq.com/continuous_integration/pipelines/gitlab/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/continuous_integration/pipelines/jenkins.md` | https://docs.datadoghq.com/continuous_integration/pipelines/jenkins/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/continuous_integration/pipelines/teamcity.md` | https://docs.datadoghq.com/continuous_integration/pipelines/teamcity/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/continuous_integration/search/_index.md` | https://docs.datadoghq.com/continuous_integration/search/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/continuous_integration/troubleshooting.md` | https://docs.datadoghq.com/continuous_integration/troubleshooting/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/continuous_testing/_index.md` | https://docs.datadoghq.com/continuous_testing/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/continuous_testing/cicd_integrations/_index.md` | https://docs.datadoghq.com/continuous_testing/cicd_integrations/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/continuous_testing/cicd_integrations/gitlab.md` | https://docs.datadoghq.com/continuous_testing/cicd_integrations/gitlab/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/continuous_testing/cicd_integrations/jenkins.md` | https://docs.datadoghq.com/continuous_testing/cicd_integrations/jenkins/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/continuous_testing/environments/_index.md` | https://docs.datadoghq.com/continuous_testing/environments/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/continuous_testing/environments/multiple_env.md` | https://docs.datadoghq.com/continuous_testing/environments/multiple_env/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/continuous_testing/environments/proxy_firewall_vpn.md` | https://docs.datadoghq.com/continuous_testing/environments/proxy_firewall_vpn/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/continuous_testing/guide/view-continuous-testing-test-runs-in-test-optimization.md` | https://docs.datadoghq.com/continuous_testing/guide/view-continuous-testing-test-runs-in-test-optimization/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/continuous_testing/settings/_index.md` | https://docs.datadoghq.com/continuous_testing/settings/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/continuous_testing/troubleshooting.md` | https://docs.datadoghq.com/continuous_testing/troubleshooting/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/coscreen/_index.md` | https://docs.datadoghq.com/coscreen/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/coterm/_index.md` | https://docs.datadoghq.com/coterm/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/coterm/install.md` | https://docs.datadoghq.com/coterm/install/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/coterm/rules.md` | https://docs.datadoghq.com/coterm/rules/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/coterm/usage.md` | https://docs.datadoghq.com/coterm/usage/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/dashboards/_index.md` | https://docs.datadoghq.com/dashboards/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/dashboards/change_overlays/_index.md` | https://docs.datadoghq.com/dashboards/change_overlays/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/dashboards/configure/_index.md` | https://docs.datadoghq.com/dashboards/configure/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/dashboards/functions/_index.md` | https://docs.datadoghq.com/dashboards/functions/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/dashboards/functions/interpolation.md` | https://docs.datadoghq.com/dashboards/functions/interpolation/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/dashboards/functions/rate.md` | https://docs.datadoghq.com/dashboards/functions/rate/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/dashboards/functions/rollup.md` | https://docs.datadoghq.com/dashboards/functions/rollup/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/dashboards/functions/timeshift.md` | https://docs.datadoghq.com/dashboards/functions/timeshift/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/dashboards/graph_insights/_index.md` | https://docs.datadoghq.com/dashboards/graph_insights/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/dashboards/graph_insights/correlations.md` | https://docs.datadoghq.com/dashboards/graph_insights/correlations/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/dashboards/graph_insights/watchdog_explains.md` | https://docs.datadoghq.com/dashboards/graph_insights/watchdog_explains/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/dashboards/guide/apm-stats-graph.md` | https://docs.datadoghq.com/dashboards/guide/apm-stats-graph/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/dashboards/guide/compatible_semantic_tags.md` | https://docs.datadoghq.com/dashboards/guide/compatible_semantic_tags/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/dashboards/guide/consistent_color_palette.md` | https://docs.datadoghq.com/dashboards/guide/consistent_color_palette/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/dashboards/guide/context-links.md` | https://docs.datadoghq.com/dashboards/guide/context-links/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/dashboards/guide/embeddable-graphs-with-template-variables.md` | https://docs.datadoghq.com/dashboards/guide/embeddable-graphs-with-template-variables/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/dashboards/guide/getting_started_with_wildcard_widget.md` | https://docs.datadoghq.com/dashboards/guide/getting_started_with_wildcard_widget/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/dashboards/guide/graphing_json.md` | https://docs.datadoghq.com/dashboards/guide/graphing_json/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/dashboards/guide/how-weighted-works.md` | https://docs.datadoghq.com/dashboards/guide/how-weighted-works/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/dashboards/guide/is-read-only-deprecation.md` | https://docs.datadoghq.com/dashboards/guide/is-read-only-deprecation/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/dashboards/guide/powerpacks-best-practices.md` | https://docs.datadoghq.com/dashboards/guide/powerpacks-best-practices/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/dashboards/guide/rollup-cardinality-visualizations.md` | https://docs.datadoghq.com/dashboards/guide/rollup-cardinality-visualizations/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/dashboards/guide/slo_data_source.md` | https://docs.datadoghq.com/dashboards/guide/slo_data_source/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/dashboards/guide/slo_graph_query.md` | https://docs.datadoghq.com/dashboards/guide/slo_graph_query/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/dashboards/guide/tv_mode.md` | https://docs.datadoghq.com/dashboards/guide/tv_mode/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/dashboards/guide/unit-override.md` | https://docs.datadoghq.com/dashboards/guide/unit-override/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/dashboards/guide/using_vega_lite_in_wildcard_widgets.md` | https://docs.datadoghq.com/dashboards/guide/using_vega_lite_in_wildcard_widgets/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/dashboards/guide/version_history.md` | https://docs.datadoghq.com/dashboards/guide/version_history/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/dashboards/guide/wildcard_examples.md` | https://docs.datadoghq.com/dashboards/guide/wildcard_examples/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/dashboards/list/_index.md` | https://docs.datadoghq.com/dashboards/list/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/dashboards/querying/_index.md` | https://docs.datadoghq.com/dashboards/querying/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/dashboards/sharing/_index.md` | https://docs.datadoghq.com/dashboards/sharing/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/dashboards/sharing/graphs.md` | https://docs.datadoghq.com/dashboards/sharing/graphs/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/dashboards/sharing/scheduled_reports.md` | https://docs.datadoghq.com/dashboards/sharing/scheduled_reports/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/dashboards/sharing/shared_dashboards.md` | https://docs.datadoghq.com/dashboards/sharing/shared_dashboards/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/dashboards/template_variables.md` | https://docs.datadoghq.com/dashboards/template_variables/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/dashboards/widgets/_index.md` | https://docs.datadoghq.com/dashboards/widgets/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/dashboards/widgets/alert_graph.md` | https://docs.datadoghq.com/dashboards/widgets/alert_graph/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/dashboards/widgets/alert_value.md` | https://docs.datadoghq.com/dashboards/widgets/alert_value/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/dashboards/widgets/bar_chart.md` | https://docs.datadoghq.com/dashboards/widgets/bar_chart/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/dashboards/widgets/change.md` | https://docs.datadoghq.com/dashboards/widgets/change/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/dashboards/widgets/check_status.md` | https://docs.datadoghq.com/dashboards/widgets/check_status/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/dashboards/widgets/configuration/_index.md` | https://docs.datadoghq.com/dashboards/widgets/configuration/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/dashboards/widgets/distribution.md` | https://docs.datadoghq.com/dashboards/widgets/distribution/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/dashboards/widgets/free_text.md` | https://docs.datadoghq.com/dashboards/widgets/free_text/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/dashboards/widgets/funnel.md` | https://docs.datadoghq.com/dashboards/widgets/funnel/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/dashboards/widgets/geomap.md` | https://docs.datadoghq.com/dashboards/widgets/geomap/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/dashboards/widgets/group.md` | https://docs.datadoghq.com/dashboards/widgets/group/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/dashboards/widgets/heatmap.md` | https://docs.datadoghq.com/dashboards/widgets/heatmap/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/dashboards/widgets/hostmap.md` | https://docs.datadoghq.com/dashboards/widgets/hostmap/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/dashboards/widgets/iframe.md` | https://docs.datadoghq.com/dashboards/widgets/iframe/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/dashboards/widgets/image.md` | https://docs.datadoghq.com/dashboards/widgets/image/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/dashboards/widgets/list.md` | https://docs.datadoghq.com/dashboards/widgets/list/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/dashboards/widgets/monitor_summary.md` | https://docs.datadoghq.com/dashboards/widgets/monitor_summary/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/dashboards/widgets/note.md` | https://docs.datadoghq.com/dashboards/widgets/note/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/dashboards/widgets/pie_chart.md` | https://docs.datadoghq.com/dashboards/widgets/pie_chart/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/dashboards/widgets/powerpack.md` | https://docs.datadoghq.com/dashboards/widgets/powerpack/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/dashboards/widgets/profiling_flame_graph.md` | https://docs.datadoghq.com/dashboards/widgets/profiling_flame_graph/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/dashboards/widgets/query_value.md` | https://docs.datadoghq.com/dashboards/widgets/query_value/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/dashboards/widgets/retention.md` | https://docs.datadoghq.com/dashboards/widgets/retention/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/dashboards/widgets/run_workflow.md` | https://docs.datadoghq.com/dashboards/widgets/run_workflow/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/dashboards/widgets/sankey.md` | https://docs.datadoghq.com/dashboards/widgets/sankey/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/dashboards/widgets/scatter_plot.md` | https://docs.datadoghq.com/dashboards/widgets/scatter_plot/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/dashboards/widgets/service_summary.md` | https://docs.datadoghq.com/dashboards/widgets/service_summary/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/dashboards/widgets/slo.md` | https://docs.datadoghq.com/dashboards/widgets/slo/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/dashboards/widgets/slo_list.md` | https://docs.datadoghq.com/dashboards/widgets/slo_list/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/dashboards/widgets/split_graph.md` | https://docs.datadoghq.com/dashboards/widgets/split_graph/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/dashboards/widgets/table.md` | https://docs.datadoghq.com/dashboards/widgets/table/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/dashboards/widgets/timeseries.md` | https://docs.datadoghq.com/dashboards/widgets/timeseries/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/dashboards/widgets/top_list.md` | https://docs.datadoghq.com/dashboards/widgets/top_list/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/dashboards/widgets/topology_map.md` | https://docs.datadoghq.com/dashboards/widgets/topology_map/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/dashboards/widgets/treemap.md` | https://docs.datadoghq.com/dashboards/widgets/treemap/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/dashboards/widgets/types/_index.md` | https://docs.datadoghq.com/dashboards/widgets/types/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/dashboards/widgets/wildcard.md` | https://docs.datadoghq.com/dashboards/widgets/wildcard/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/data_observability/jobs_monitoring/_index.md` | https://docs.datadoghq.com/data_observability/jobs_monitoring/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/data_observability/jobs_monitoring/airflow.md` | https://docs.datadoghq.com/data_observability/jobs_monitoring/airflow/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/data_observability/jobs_monitoring/databricks.md` | https://docs.datadoghq.com/data_observability/jobs_monitoring/databricks/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/data_observability/jobs_monitoring/dataproc.md` | https://docs.datadoghq.com/data_observability/jobs_monitoring/dataproc/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/data_observability/jobs_monitoring/dbt.md` | https://docs.datadoghq.com/data_observability/jobs_monitoring/dbt/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/data_observability/jobs_monitoring/emr.md` | https://docs.datadoghq.com/data_observability/jobs_monitoring/emr/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/data_observability/jobs_monitoring/kubernetes.md` | https://docs.datadoghq.com/data_observability/jobs_monitoring/kubernetes/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/data_observability/jobs_monitoring/openlineage/_index.md` | https://docs.datadoghq.com/data_observability/jobs_monitoring/openlineage/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/data_observability/jobs_monitoring/openlineage/datadog_agent_for_openlineage.md` | https://docs.datadoghq.com/data_observability/jobs_monitoring/openlineage/datadog_agent_for_openlineage/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/data_observability/quality_monitoring/_index.md` | https://docs.datadoghq.com/data_observability/quality_monitoring/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/data_observability/quality_monitoring/business_intelligence/_index.md` | https://docs.datadoghq.com/data_observability/quality_monitoring/business_intelligence/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/data_observability/quality_monitoring/business_intelligence/metabase.md` | https://docs.datadoghq.com/data_observability/quality_monitoring/business_intelligence/metabase/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/data_observability/quality_monitoring/business_intelligence/powerbi.md` | https://docs.datadoghq.com/data_observability/quality_monitoring/business_intelligence/powerbi/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/data_observability/quality_monitoring/business_intelligence/sigma.md` | https://docs.datadoghq.com/data_observability/quality_monitoring/business_intelligence/sigma/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/data_observability/quality_monitoring/business_intelligence/tableau.md` | https://docs.datadoghq.com/data_observability/quality_monitoring/business_intelligence/tableau/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/data_observability/quality_monitoring/data_warehouses/_index.md` | https://docs.datadoghq.com/data_observability/quality_monitoring/data_warehouses/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/data_observability/quality_monitoring/data_warehouses/bigquery.md` | https://docs.datadoghq.com/data_observability/quality_monitoring/data_warehouses/bigquery/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/data_observability/quality_monitoring/data_warehouses/databricks.md` | https://docs.datadoghq.com/data_observability/quality_monitoring/data_warehouses/databricks/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/data_observability/quality_monitoring/data_warehouses/snowflake.md` | https://docs.datadoghq.com/data_observability/quality_monitoring/data_warehouses/snowflake/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/data_security/_index.md` | https://docs.datadoghq.com/data_security/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/data_security/agent.md` | https://docs.datadoghq.com/data_security/agent/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/data_security/cloud_siem.md` | https://docs.datadoghq.com/data_security/cloud_siem/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/data_security/data_retention_periods.md` | https://docs.datadoghq.com/data_security/data_retention_periods/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/data_security/hipaa_compliance.md` | https://docs.datadoghq.com/data_security/hipaa_compliance/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/data_security/kubernetes.md` | https://docs.datadoghq.com/data_security/kubernetes/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/data_security/logs.md` | https://docs.datadoghq.com/data_security/logs/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/data_security/pci_compliance.md` | https://docs.datadoghq.com/data_security/pci_compliance/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/data_security/real_user_monitoring.md` | https://docs.datadoghq.com/data_security/real_user_monitoring/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/data_security/synthetics.md` | https://docs.datadoghq.com/data_security/synthetics/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/data_streams/_index.md` | https://docs.datadoghq.com/data_streams/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/data_streams/manual_instrumentation.md` | https://docs.datadoghq.com/data_streams/manual_instrumentation/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/data_streams/setup/language/dotnet.md` | https://docs.datadoghq.com/data_streams/setup/language/dotnet/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/data_streams/setup/language/go.md` | https://docs.datadoghq.com/data_streams/setup/language/go/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/data_streams/setup/language/java.md` | https://docs.datadoghq.com/data_streams/setup/language/java/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/data_streams/setup/language/nodejs.md` | https://docs.datadoghq.com/data_streams/setup/language/nodejs/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/data_streams/setup/language/python.md` | https://docs.datadoghq.com/data_streams/setup/language/python/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/data_streams/setup/language/ruby.md` | https://docs.datadoghq.com/data_streams/setup/language/ruby/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/database_monitoring/_index.md` | https://docs.datadoghq.com/database_monitoring/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/database_monitoring/architecture.md` | https://docs.datadoghq.com/database_monitoring/architecture/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/database_monitoring/connect_dbm_and_apm.md` | https://docs.datadoghq.com/database_monitoring/connect_dbm_and_apm/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/database_monitoring/guide/sql_alwayson.md` | https://docs.datadoghq.com/database_monitoring/guide/sql_alwayson/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/database_monitoring/guide/sql_deadlock.md` | https://docs.datadoghq.com/database_monitoring/guide/sql_deadlock/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/database_monitoring/guide/sql_extended_events.md` | https://docs.datadoghq.com/database_monitoring/guide/sql_extended_events/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/database_monitoring/query_metrics.md` | https://docs.datadoghq.com/database_monitoring/query_metrics/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/database_monitoring/query_samples.md` | https://docs.datadoghq.com/database_monitoring/query_samples/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/database_monitoring/recommendations.md` | https://docs.datadoghq.com/database_monitoring/recommendations/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/database_monitoring/setup_mongodb/mongodbatlas.md` | https://docs.datadoghq.com/database_monitoring/setup_mongodb/mongodbatlas/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/database_monitoring/setup_mysql/aurora.md` | https://docs.datadoghq.com/database_monitoring/setup_mysql/aurora/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/database_monitoring/setup_mysql/azure.md` | https://docs.datadoghq.com/database_monitoring/setup_mysql/azure/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/database_monitoring/setup_mysql/gcsql.md` | https://docs.datadoghq.com/database_monitoring/setup_mysql/gcsql/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/database_monitoring/setup_mysql/rds.md` | https://docs.datadoghq.com/database_monitoring/setup_mysql/rds/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/database_monitoring/setup_mysql/selfhosted.md` | https://docs.datadoghq.com/database_monitoring/setup_mysql/selfhosted/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/database_monitoring/setup_oracle/autonomous_database.md` | https://docs.datadoghq.com/database_monitoring/setup_oracle/autonomous_database/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/database_monitoring/setup_oracle/exadata.md` | https://docs.datadoghq.com/database_monitoring/setup_oracle/exadata/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/database_monitoring/setup_oracle/rac.md` | https://docs.datadoghq.com/database_monitoring/setup_oracle/rac/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/database_monitoring/setup_oracle/rds.md` | https://docs.datadoghq.com/database_monitoring/setup_oracle/rds/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/database_monitoring/setup_oracle/selfhosted.md` | https://docs.datadoghq.com/database_monitoring/setup_oracle/selfhosted/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/database_monitoring/setup_postgres/alloydb.md` | https://docs.datadoghq.com/database_monitoring/setup_postgres/alloydb/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/database_monitoring/setup_postgres/aurora.md` | https://docs.datadoghq.com/database_monitoring/setup_postgres/aurora/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/database_monitoring/setup_postgres/azure.md` | https://docs.datadoghq.com/database_monitoring/setup_postgres/azure/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/database_monitoring/setup_postgres/gcsql.md` | https://docs.datadoghq.com/database_monitoring/setup_postgres/gcsql/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/database_monitoring/setup_postgres/rds/_index.md` | https://docs.datadoghq.com/database_monitoring/setup_postgres/rds/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/database_monitoring/setup_postgres/rds/quick_install.md` | https://docs.datadoghq.com/database_monitoring/setup_postgres/rds/quick_install/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/database_monitoring/setup_postgres/selfhosted.md` | https://docs.datadoghq.com/database_monitoring/setup_postgres/selfhosted/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/database_monitoring/setup_postgres/supabase.md` | https://docs.datadoghq.com/database_monitoring/setup_postgres/supabase/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/database_monitoring/setup_sql_server/azure.md` | https://docs.datadoghq.com/database_monitoring/setup_sql_server/azure/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/database_monitoring/setup_sql_server/gcsql.md` | https://docs.datadoghq.com/database_monitoring/setup_sql_server/gcsql/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/database_monitoring/setup_sql_server/rds.md` | https://docs.datadoghq.com/database_monitoring/setup_sql_server/rds/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/database_monitoring/setup_sql_server/selfhosted.md` | https://docs.datadoghq.com/database_monitoring/setup_sql_server/selfhosted/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/datadog_cloudcraft/_index.md` | https://docs.datadoghq.com/datadog_cloudcraft/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/datadog_cloudcraft/overlays/_index.md` | https://docs.datadoghq.com/datadog_cloudcraft/overlays/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/datadog_cloudcraft/overlays/ccm.md` | https://docs.datadoghq.com/datadog_cloudcraft/overlays/ccm/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/datadog_cloudcraft/overlays/infrastructure.md` | https://docs.datadoghq.com/datadog_cloudcraft/overlays/infrastructure/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/datadog_cloudcraft/overlays/observability.md` | https://docs.datadoghq.com/datadog_cloudcraft/overlays/observability/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/datadog_cloudcraft/overlays/security.md` | https://docs.datadoghq.com/datadog_cloudcraft/overlays/security/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/ddsql_editor/_index.md` | https://docs.datadoghq.com/ddsql_editor/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/ddsql_reference/_index.md` | https://docs.datadoghq.com/ddsql_reference/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/ddsql_reference/ddsql_preview.md` | https://docs.datadoghq.com/ddsql_reference/ddsql_preview/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/ddsql_reference/ddsql_preview/ddsql_use_cases.md` | https://docs.datadoghq.com/ddsql_reference/ddsql_preview/ddsql_use_cases/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/ddsql_reference/ddsql_preview/reference_tables.md` | https://docs.datadoghq.com/ddsql_reference/ddsql_preview/reference_tables/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/deployment_gates/_index.md` | https://docs.datadoghq.com/deployment_gates/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/deployment_gates/explore.md` | https://docs.datadoghq.com/deployment_gates/explore/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/deployment_gates/setup.md` | https://docs.datadoghq.com/deployment_gates/setup/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/developers/_index.md` | https://docs.datadoghq.com/developers/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/developers/authorization/_index.md` | https://docs.datadoghq.com/developers/authorization/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/developers/authorization/oauth2_endpoints.md` | https://docs.datadoghq.com/developers/authorization/oauth2_endpoints/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/developers/authorization/oauth2_in_datadog.md` | https://docs.datadoghq.com/developers/authorization/oauth2_in_datadog/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/developers/community/_index.md` | https://docs.datadoghq.com/developers/community/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/developers/custom_checks/prometheus.md` | https://docs.datadoghq.com/developers/custom_checks/prometheus/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/developers/custom_checks/write_agent_check.md` | https://docs.datadoghq.com/developers/custom_checks/write_agent_check/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/developers/dogstatsd/_index.md` | https://docs.datadoghq.com/developers/dogstatsd/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/developers/dogstatsd/data_aggregation.md` | https://docs.datadoghq.com/developers/dogstatsd/data_aggregation/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/developers/dogstatsd/datagram_shell.md` | https://docs.datadoghq.com/developers/dogstatsd/datagram_shell/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/developers/dogstatsd/dogstatsd_mapper.md` | https://docs.datadoghq.com/developers/dogstatsd/dogstatsd_mapper/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/developers/dogstatsd/high_throughput.md` | https://docs.datadoghq.com/developers/dogstatsd/high_throughput/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/developers/dogstatsd/unix_socket.md` | https://docs.datadoghq.com/developers/dogstatsd/unix_socket/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/developers/faq/is-there-an-alternative-to-dogstatsd-and-the-api-to-submit-metrics-threadstats.md` | https://docs.datadoghq.com/developers/faq/is-there-an-alternative-to-dogstatsd-and-the-api-to-submit-metrics-threadstats/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/developers/faq/legacy-openmetrics.md` | https://docs.datadoghq.com/developers/faq/legacy-openmetrics/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/developers/guide/custom-python-package.md` | https://docs.datadoghq.com/developers/guide/custom-python-package/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/developers/guide/data-collection-resolution.md` | https://docs.datadoghq.com/developers/guide/data-collection-resolution/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/developers/guide/what-best-practices-are-recommended-for-naming-metrics-and-tags.md` | https://docs.datadoghq.com/developers/guide/what-best-practices-are-recommended-for-naming-metrics-and-tags/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/developers/ide_plugins/idea/_index.md` | https://docs.datadoghq.com/developers/ide_plugins/idea/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/developers/ide_plugins/idea/code_security.md` | https://docs.datadoghq.com/developers/ide_plugins/idea/code_security/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/developers/ide_plugins/idea/live_debugger.md` | https://docs.datadoghq.com/developers/ide_plugins/idea/live_debugger/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/developers/ide_plugins/idea/logs.md` | https://docs.datadoghq.com/developers/ide_plugins/idea/logs/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/developers/ide_plugins/vscode/_index.md` | https://docs.datadoghq.com/developers/ide_plugins/vscode/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/developers/integrations/_index.md` | https://docs.datadoghq.com/developers/integrations/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/developers/integrations/agent_integration.md` | https://docs.datadoghq.com/developers/integrations/agent_integration/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/developers/integrations/api_integration.md` | https://docs.datadoghq.com/developers/integrations/api_integration/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/developers/integrations/build_integration.md` | https://docs.datadoghq.com/developers/integrations/build_integration/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/developers/integrations/check_references.md` | https://docs.datadoghq.com/developers/integrations/check_references/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/developers/integrations/create-a-cloud-siem-detection-rule.md` | https://docs.datadoghq.com/developers/integrations/create-a-cloud-siem-detection-rule/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/developers/integrations/create-an-integration-dashboard.md` | https://docs.datadoghq.com/developers/integrations/create-an-integration-dashboard/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/developers/integrations/create-an-integration-monitor-template.md` | https://docs.datadoghq.com/developers/integrations/create-an-integration-monitor-template/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/developers/integrations/log_pipeline.md` | https://docs.datadoghq.com/developers/integrations/log_pipeline/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/developers/integrations/marketplace_offering.md` | https://docs.datadoghq.com/developers/integrations/marketplace_offering/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/developers/service_checks/agent_service_checks_submission.md` | https://docs.datadoghq.com/developers/service_checks/agent_service_checks_submission/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/developers/service_checks/dogstatsd_service_checks_submission.md` | https://docs.datadoghq.com/developers/service_checks/dogstatsd_service_checks_submission/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/dora_metrics/_index.md` | https://docs.datadoghq.com/dora_metrics/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/dora_metrics/calculation/_index.md` | https://docs.datadoghq.com/dora_metrics/calculation/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/dora_metrics/change_failure_detection/_index.md` | https://docs.datadoghq.com/dora_metrics/change_failure_detection/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/dora_metrics/data_collected/_index.md` | https://docs.datadoghq.com/dora_metrics/data_collected/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/dora_metrics/setup/_index.md` | https://docs.datadoghq.com/dora_metrics/setup/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/dora_metrics/setup/deployments.md` | https://docs.datadoghq.com/dora_metrics/setup/deployments/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/dora_metrics/setup/failures.md` | https://docs.datadoghq.com/dora_metrics/setup/failures/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/error_tracking/_index.md` | https://docs.datadoghq.com/error_tracking/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/error_tracking/auto_assign.md` | https://docs.datadoghq.com/error_tracking/auto_assign/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/error_tracking/backend/_index.md` | https://docs.datadoghq.com/error_tracking/backend/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/error_tracking/backend/capturing_handled_errors/_index.md` | https://docs.datadoghq.com/error_tracking/backend/capturing_handled_errors/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/error_tracking/backend/exception_replay.md` | https://docs.datadoghq.com/error_tracking/backend/exception_replay/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/error_tracking/backend/getting_started/_index.md` | https://docs.datadoghq.com/error_tracking/backend/getting_started/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/error_tracking/backend/getting_started/dd_libraries.md` | https://docs.datadoghq.com/error_tracking/backend/getting_started/dd_libraries/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/error_tracking/backend/getting_started/single_step_instrumentation.md` | https://docs.datadoghq.com/error_tracking/backend/getting_started/single_step_instrumentation/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/error_tracking/backend/logs.md` | https://docs.datadoghq.com/error_tracking/backend/logs/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/error_tracking/dynamic_sampling.md` | https://docs.datadoghq.com/error_tracking/dynamic_sampling/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/error_tracking/explorer.md` | https://docs.datadoghq.com/error_tracking/explorer/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/error_tracking/frontend/_index.md` | https://docs.datadoghq.com/error_tracking/frontend/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/error_tracking/frontend/browser.md` | https://docs.datadoghq.com/error_tracking/frontend/browser/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/error_tracking/frontend/logs.md` | https://docs.datadoghq.com/error_tracking/frontend/logs/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/error_tracking/frontend/mobile/android.md` | https://docs.datadoghq.com/error_tracking/frontend/mobile/android/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/error_tracking/frontend/mobile/expo.md` | https://docs.datadoghq.com/error_tracking/frontend/mobile/expo/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/error_tracking/frontend/mobile/ios.md` | https://docs.datadoghq.com/error_tracking/frontend/mobile/ios/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/error_tracking/frontend/replay_errors.md` | https://docs.datadoghq.com/error_tracking/frontend/replay_errors/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/error_tracking/guides/sentry_sdk.md` | https://docs.datadoghq.com/error_tracking/guides/sentry_sdk/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/error_tracking/issue_correlation.md` | https://docs.datadoghq.com/error_tracking/issue_correlation/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/error_tracking/issue_states.md` | https://docs.datadoghq.com/error_tracking/issue_states/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/error_tracking/issue_team_ownership.md` | https://docs.datadoghq.com/error_tracking/issue_team_ownership/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/error_tracking/manage_data_collection.md` | https://docs.datadoghq.com/error_tracking/manage_data_collection/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/error_tracking/regression_detection.md` | https://docs.datadoghq.com/error_tracking/regression_detection/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/error_tracking/suspect_commits.md` | https://docs.datadoghq.com/error_tracking/suspect_commits/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/error_tracking/suspected_causes.md` | https://docs.datadoghq.com/error_tracking/suspected_causes/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/events/_index.md` | https://docs.datadoghq.com/events/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/events/correlation/_index.md` | https://docs.datadoghq.com/events/correlation/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/events/correlation/analytics.md` | https://docs.datadoghq.com/events/correlation/analytics/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/events/correlation/configuration.md` | https://docs.datadoghq.com/events/correlation/configuration/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/events/correlation/intelligent.md` | https://docs.datadoghq.com/events/correlation/intelligent/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/events/correlation/patterns.md` | https://docs.datadoghq.com/events/correlation/patterns/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/events/explorer/_index.md` | https://docs.datadoghq.com/events/explorer/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/events/explorer/attributes.md` | https://docs.datadoghq.com/events/explorer/attributes/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/events/explorer/facets.md` | https://docs.datadoghq.com/events/explorer/facets/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/events/explorer/notifications.md` | https://docs.datadoghq.com/events/explorer/notifications/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/events/explorer/saved_views.md` | https://docs.datadoghq.com/events/explorer/saved_views/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/events/explorer/searching.md` | https://docs.datadoghq.com/events/explorer/searching/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/events/guides/_index.md` | https://docs.datadoghq.com/events/guides/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/events/guides/agent.md` | https://docs.datadoghq.com/events/guides/agent/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/events/guides/dogstatsd.md` | https://docs.datadoghq.com/events/guides/dogstatsd/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/events/guides/migrating_to_new_events_features.md` | https://docs.datadoghq.com/events/guides/migrating_to_new_events_features/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/events/guides/recommended_event_tags.md` | https://docs.datadoghq.com/events/guides/recommended_event_tags/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/events/guides/usage.md` | https://docs.datadoghq.com/events/guides/usage/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/events/pipelines_and_processors/_index.md` | https://docs.datadoghq.com/events/pipelines_and_processors/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/events/triage_inbox.md` | https://docs.datadoghq.com/events/triage_inbox/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/feature_flags/_index.md` | https://docs.datadoghq.com/feature_flags/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/feature_flags/client/_index.md` | https://docs.datadoghq.com/feature_flags/client/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/feature_flags/client/android.md` | https://docs.datadoghq.com/feature_flags/client/android/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/feature_flags/client/ios.md` | https://docs.datadoghq.com/feature_flags/client/ios/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/feature_flags/client/javascript.md` | https://docs.datadoghq.com/feature_flags/client/javascript/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/feature_flags/client/react.md` | https://docs.datadoghq.com/feature_flags/client/react/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/feature_flags/feature_flag_mcp_server.md` | https://docs.datadoghq.com/feature_flags/feature_flag_mcp_server/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/feature_flags/server/_index.md` | https://docs.datadoghq.com/feature_flags/server/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/feature_flags/server/dotnet.md` | https://docs.datadoghq.com/feature_flags/server/dotnet/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/feature_flags/server/go.md` | https://docs.datadoghq.com/feature_flags/server/go/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/feature_flags/server/java.md` | https://docs.datadoghq.com/feature_flags/server/java/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/feature_flags/server/nodejs.md` | https://docs.datadoghq.com/feature_flags/server/nodejs/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/feature_flags/server/python.md` | https://docs.datadoghq.com/feature_flags/server/python/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/feature_flags/server/ruby.md` | https://docs.datadoghq.com/feature_flags/server/ruby/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/getting_started/_index.md` | https://docs.datadoghq.com/getting_started/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/getting_started/agent/_index.md` | https://docs.datadoghq.com/getting_started/agent/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/getting_started/application/_index.md` | https://docs.datadoghq.com/getting_started/application/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/getting_started/ci_visibility/_index.md` | https://docs.datadoghq.com/getting_started/ci_visibility/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/getting_started/containers/autodiscovery.md` | https://docs.datadoghq.com/getting_started/containers/autodiscovery/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/getting_started/containers/datadog_operator.md` | https://docs.datadoghq.com/getting_started/containers/datadog_operator/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/getting_started/continuous_testing/_index.md` | https://docs.datadoghq.com/getting_started/continuous_testing/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/getting_started/dashboards/_index.md` | https://docs.datadoghq.com/getting_started/dashboards/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/getting_started/database_monitoring/_index.md` | https://docs.datadoghq.com/getting_started/database_monitoring/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/getting_started/feature_flags/_index.md` | https://docs.datadoghq.com/getting_started/feature_flags/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/getting_started/incident_management/_index.md` | https://docs.datadoghq.com/getting_started/incident_management/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/getting_started/integrations/_index.md` | https://docs.datadoghq.com/getting_started/integrations/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/getting_started/integrations/aws.md` | https://docs.datadoghq.com/getting_started/integrations/aws/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/getting_started/integrations/azure.md` | https://docs.datadoghq.com/getting_started/integrations/azure/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/getting_started/integrations/google_cloud.md` | https://docs.datadoghq.com/getting_started/integrations/google_cloud/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/getting_started/integrations/terraform.md` | https://docs.datadoghq.com/getting_started/integrations/terraform/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/getting_started/internal_developer_portal/_index.md` | https://docs.datadoghq.com/getting_started/internal_developer_portal/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/getting_started/logs/_index.md` | https://docs.datadoghq.com/getting_started/logs/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/getting_started/monitors/_index.md` | https://docs.datadoghq.com/getting_started/monitors/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/getting_started/notebooks/_index.md` | https://docs.datadoghq.com/getting_started/notebooks/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/getting_started/opentelemetry/_index.md` | https://docs.datadoghq.com/getting_started/opentelemetry/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/getting_started/profiler/_index.md` | https://docs.datadoghq.com/getting_started/profiler/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/getting_started/search/_index.md` | https://docs.datadoghq.com/getting_started/search/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/getting_started/search/product_specific_reference.md` | https://docs.datadoghq.com/getting_started/search/product_specific_reference/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/getting_started/security/application_security.md` | https://docs.datadoghq.com/getting_started/security/application_security/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/getting_started/security/cloud_security_management.md` | https://docs.datadoghq.com/getting_started/security/cloud_security_management/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/getting_started/security/cloud_siem.md` | https://docs.datadoghq.com/getting_started/security/cloud_siem/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/getting_started/session_replay/_index.md` | https://docs.datadoghq.com/getting_started/session_replay/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/getting_started/site/_index.md` | https://docs.datadoghq.com/getting_started/site/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/getting_started/support/_index.md` | https://docs.datadoghq.com/getting_started/support/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/getting_started/synthetics/_index.md` | https://docs.datadoghq.com/getting_started/synthetics/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/getting_started/synthetics/api_test.md` | https://docs.datadoghq.com/getting_started/synthetics/api_test/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/getting_started/synthetics/browser_test.md` | https://docs.datadoghq.com/getting_started/synthetics/browser_test/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/getting_started/synthetics/private_location.md` | https://docs.datadoghq.com/getting_started/synthetics/private_location/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/getting_started/tagging/_index.md` | https://docs.datadoghq.com/getting_started/tagging/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/getting_started/tagging/assigning_tags.md` | https://docs.datadoghq.com/getting_started/tagging/assigning_tags/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/getting_started/tagging/unified_service_tagging.md` | https://docs.datadoghq.com/getting_started/tagging/unified_service_tagging/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/getting_started/tagging/using_tags.md` | https://docs.datadoghq.com/getting_started/tagging/using_tags/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/getting_started/test_impact_analysis/_index.md` | https://docs.datadoghq.com/getting_started/test_impact_analysis/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/getting_started/test_optimization/_index.md` | https://docs.datadoghq.com/getting_started/test_optimization/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/getting_started/tracing/_index.md` | https://docs.datadoghq.com/getting_started/tracing/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/getting_started/workflow_automation/_index.md` | https://docs.datadoghq.com/getting_started/workflow_automation/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/gpu_monitoring/_index.md` | https://docs.datadoghq.com/gpu_monitoring/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/gpu_monitoring/fleet.md` | https://docs.datadoghq.com/gpu_monitoring/fleet/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/gpu_monitoring/setup.md` | https://docs.datadoghq.com/gpu_monitoring/setup/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/gpu_monitoring/summary.md` | https://docs.datadoghq.com/gpu_monitoring/summary/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/incident_response/_index.md` | https://docs.datadoghq.com/incident_response/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/incident_response/case_management/_index.md` | https://docs.datadoghq.com/incident_response/case_management/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/incident_response/case_management/automation_rules.md` | https://docs.datadoghq.com/incident_response/case_management/automation_rules/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/incident_response/case_management/create_case.md` | https://docs.datadoghq.com/incident_response/case_management/create_case/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/incident_response/case_management/customization.md` | https://docs.datadoghq.com/incident_response/case_management/customization/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/incident_response/case_management/notifications_integrations.md` | https://docs.datadoghq.com/incident_response/case_management/notifications_integrations/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/incident_response/case_management/projects.md` | https://docs.datadoghq.com/incident_response/case_management/projects/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/incident_response/case_management/settings.md` | https://docs.datadoghq.com/incident_response/case_management/settings/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/incident_response/case_management/view_and_manage/_index.md` | https://docs.datadoghq.com/incident_response/case_management/view_and_manage/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/incident_response/incident_management/_index.md` | https://docs.datadoghq.com/incident_response/incident_management/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/incident_response/incident_management/analytics.md` | https://docs.datadoghq.com/incident_response/incident_management/analytics/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/incident_response/incident_management/datadog_clipboard.md` | https://docs.datadoghq.com/incident_response/incident_management/datadog_clipboard/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/incident_response/incident_management/describe.md` | https://docs.datadoghq.com/incident_response/incident_management/describe/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/incident_response/incident_management/follow-ups.md` | https://docs.datadoghq.com/incident_response/incident_management/follow-ups/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/incident_response/incident_management/incident_ai.md` | https://docs.datadoghq.com/incident_response/incident_management/incident_ai/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/incident_response/incident_management/incident_settings/automations.md` | https://docs.datadoghq.com/incident_response/incident_management/incident_settings/automations/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/incident_response/incident_management/incident_settings/integrations.md` | https://docs.datadoghq.com/incident_response/incident_management/incident_settings/integrations/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/incident_response/incident_management/incident_settings/notification_rules.md` | https://docs.datadoghq.com/incident_response/incident_management/incident_settings/notification_rules/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/incident_response/incident_management/incident_settings/responder_types.md` | https://docs.datadoghq.com/incident_response/incident_management/incident_settings/responder_types/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/incident_response/incident_management/incident_settings/templates.md` | https://docs.datadoghq.com/incident_response/incident_management/incident_settings/templates/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/incident_response/incident_management/integrations/_index.md` | https://docs.datadoghq.com/incident_response/incident_management/integrations/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/incident_response/incident_management/integrations/google_chat.md` | https://docs.datadoghq.com/incident_response/incident_management/integrations/google_chat/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/incident_response/incident_management/integrations/jira.md` | https://docs.datadoghq.com/incident_response/incident_management/integrations/jira/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/incident_response/incident_management/integrations/microsoft_teams/_index.md` | https://docs.datadoghq.com/incident_response/incident_management/integrations/microsoft_teams/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/incident_response/incident_management/integrations/servicenow.md` | https://docs.datadoghq.com/incident_response/incident_management/integrations/servicenow/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/incident_response/incident_management/integrations/slack/_index.md` | https://docs.datadoghq.com/incident_response/incident_management/integrations/slack/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/incident_response/incident_management/integrations/status_pages.md` | https://docs.datadoghq.com/incident_response/incident_management/integrations/status_pages/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/incident_response/incident_management/integrations/statuspage.md` | https://docs.datadoghq.com/incident_response/incident_management/integrations/statuspage/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/incident_response/incident_management/investigate/_index.md` | https://docs.datadoghq.com/incident_response/incident_management/investigate/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/incident_response/incident_management/investigate/timeline.md` | https://docs.datadoghq.com/incident_response/incident_management/investigate/timeline/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/incident_response/incident_management/notification.md` | https://docs.datadoghq.com/incident_response/incident_management/notification/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/incident_response/incident_management/response_team.md` | https://docs.datadoghq.com/incident_response/incident_management/response_team/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/incident_response/on-call/_index.md` | https://docs.datadoghq.com/incident_response/on-call/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/incident_response/on-call/automations.md` | https://docs.datadoghq.com/incident_response/on-call/automations/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/incident_response/on-call/cross_org_paging.md` | https://docs.datadoghq.com/incident_response/on-call/cross_org_paging/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/incident_response/on-call/guides/migrate-your-pagerduty-resources-to-on-call.md` | https://docs.datadoghq.com/incident_response/on-call/guides/migrate-your-pagerduty-resources-to-on-call/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/incident_response/on-call/guides/migrating-from-your-current-providers.md` | https://docs.datadoghq.com/incident_response/on-call/guides/migrating-from-your-current-providers/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/incident_response/on-call/profile_settings.md` | https://docs.datadoghq.com/incident_response/on-call/profile_settings/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/incident_response/on-call/routing_rules.md` | https://docs.datadoghq.com/incident_response/on-call/routing_rules/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/incident_response/on-call/schedules.md` | https://docs.datadoghq.com/incident_response/on-call/schedules/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/incident_response/on-call/teams.md` | https://docs.datadoghq.com/incident_response/on-call/teams/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/incident_response/on-call/triggering_pages/_index.md` | https://docs.datadoghq.com/incident_response/on-call/triggering_pages/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/incident_response/status_pages/_index.md` | https://docs.datadoghq.com/incident_response/status_pages/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/infrastructure/_index.md` | https://docs.datadoghq.com/infrastructure/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/infrastructure/containermap.md` | https://docs.datadoghq.com/infrastructure/containermap/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/infrastructure/containers/_index.md` | https://docs.datadoghq.com/infrastructure/containers/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/infrastructure/containers/amazon_elastic_container_explorer.md` | https://docs.datadoghq.com/infrastructure/containers/amazon_elastic_container_explorer/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/infrastructure/containers/configuration.md` | https://docs.datadoghq.com/infrastructure/containers/configuration/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/infrastructure/containers/container_images.md` | https://docs.datadoghq.com/infrastructure/containers/container_images/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/infrastructure/containers/kubernetes_resource_utilization.md` | https://docs.datadoghq.com/infrastructure/containers/kubernetes_resource_utilization/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/infrastructure/end_user_device_monitoring/_index.md` | https://docs.datadoghq.com/infrastructure/end_user_device_monitoring/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/infrastructure/end_user_device_monitoring/setup.md` | https://docs.datadoghq.com/infrastructure/end_user_device_monitoring/setup/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/infrastructure/hostmap.md` | https://docs.datadoghq.com/infrastructure/hostmap/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/infrastructure/list.md` | https://docs.datadoghq.com/infrastructure/list/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/infrastructure/process/_index.md` | https://docs.datadoghq.com/infrastructure/process/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/infrastructure/process/increase_process_retention.md` | https://docs.datadoghq.com/infrastructure/process/increase_process_retention/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/infrastructure/resource_catalog/_index.md` | https://docs.datadoghq.com/infrastructure/resource_catalog/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/infrastructure/resource_catalog/policies/_index.md` | https://docs.datadoghq.com/infrastructure/resource_catalog/policies/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/infrastructure/resource_catalog/resource_changes/_index.md` | https://docs.datadoghq.com/infrastructure/resource_catalog/resource_changes/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/infrastructure/storage_management/azure_blob_storage.md` | https://docs.datadoghq.com/infrastructure/storage_management/azure_blob_storage/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/integrations/faq/integration-setup-ecs-fargate.md` | https://docs.datadoghq.com/integrations/faq/integration-setup-ecs-fargate/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/integrations/faq/pivotal_architecture.md` | https://docs.datadoghq.com/integrations/faq/pivotal_architecture/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/integrations/faq/postgres-custom-metric-collection-explained.md` | https://docs.datadoghq.com/integrations/faq/postgres-custom-metric-collection-explained/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/integrations/faq/troubleshooting-jmx-integrations.md` | https://docs.datadoghq.com/integrations/faq/troubleshooting-jmx-integrations/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/integrations/faq/view-jmx-data-in-jconsole-and-set-up-your-jmx-yaml-to-collect-them.md` | https://docs.datadoghq.com/integrations/faq/view-jmx-data-in-jconsole-and-set-up-your-jmx-yaml-to-collect-them/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/integrations/guide/adaptive-cloudwatch-polling.md` | https://docs.datadoghq.com/integrations/guide/adaptive-cloudwatch-polling/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/integrations/guide/application-monitoring-vmware-tanzu.md` | https://docs.datadoghq.com/integrations/guide/application-monitoring-vmware-tanzu/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose.md` | https://docs.datadoghq.com/integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/integrations/guide/aws-manual-setup.md` | https://docs.datadoghq.com/integrations/guide/aws-manual-setup/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/integrations/guide/aws-marketplace-datadog-trial.md` | https://docs.datadoghq.com/integrations/guide/aws-marketplace-datadog-trial/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/integrations/guide/aws-organizations-setup.md` | https://docs.datadoghq.com/integrations/guide/aws-organizations-setup/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/integrations/guide/aws-terraform-setup.md` | https://docs.datadoghq.com/integrations/guide/aws-terraform-setup/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/integrations/guide/azure-advanced-configuration.md` | https://docs.datadoghq.com/integrations/guide/azure-advanced-configuration/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/integrations/guide/azure-cloud-adoption-framework.md` | https://docs.datadoghq.com/integrations/guide/azure-cloud-adoption-framework/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/integrations/guide/azure-graph-api-permissions.md` | https://docs.datadoghq.com/integrations/guide/azure-graph-api-permissions/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/integrations/guide/azure-integrations.md` | https://docs.datadoghq.com/integrations/guide/azure-integrations/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/integrations/guide/azure-native-integration.md` | https://docs.datadoghq.com/integrations/guide/azure-native-integration/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/integrations/guide/azure-resource-manager.md` | https://docs.datadoghq.com/integrations/guide/azure-resource-manager/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/integrations/guide/cloud-foundry-setup.md` | https://docs.datadoghq.com/integrations/guide/cloud-foundry-setup/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/integrations/guide/cloud-metric-delay.md` | https://docs.datadoghq.com/integrations/guide/cloud-metric-delay/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/integrations/guide/cluster-monitoring-vmware-tanzu.md` | https://docs.datadoghq.com/integrations/guide/cluster-monitoring-vmware-tanzu/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/integrations/guide/collect-sql-server-custom-metrics.md` | https://docs.datadoghq.com/integrations/guide/collect-sql-server-custom-metrics/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/integrations/guide/error-datadog-not-authorized-sts-assume-role.md` | https://docs.datadoghq.com/integrations/guide/error-datadog-not-authorized-sts-assume-role/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/integrations/guide/events-from-sns-emails.md` | https://docs.datadoghq.com/integrations/guide/events-from-sns-emails/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/integrations/guide/fips-integrations.md` | https://docs.datadoghq.com/integrations/guide/fips-integrations/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/integrations/guide/freshservice-tickets-using-webhooks.md` | https://docs.datadoghq.com/integrations/guide/freshservice-tickets-using-webhooks/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/integrations/guide/gcp-metric-discrepancy.md` | https://docs.datadoghq.com/integrations/guide/gcp-metric-discrepancy/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/integrations/guide/hcp-consul.md` | https://docs.datadoghq.com/integrations/guide/hcp-consul/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/integrations/guide/high_availability.md` | https://docs.datadoghq.com/integrations/guide/high_availability/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/integrations/guide/jmx_integrations.md` | https://docs.datadoghq.com/integrations/guide/jmx_integrations/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/integrations/guide/microsoft_teams_troubleshooting.md` | https://docs.datadoghq.com/integrations/guide/microsoft_teams_troubleshooting/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/integrations/guide/mongo-custom-query-collection.md` | https://docs.datadoghq.com/integrations/guide/mongo-custom-query-collection/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/integrations/guide/mysql-custom-queries.md` | https://docs.datadoghq.com/integrations/guide/mysql-custom-queries/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/integrations/guide/prometheus-host-collection.md` | https://docs.datadoghq.com/integrations/guide/prometheus-host-collection/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/integrations/guide/prometheus-metrics.md` | https://docs.datadoghq.com/integrations/guide/prometheus-metrics/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/integrations/guide/requests.md` | https://docs.datadoghq.com/integrations/guide/requests/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/integrations/guide/servicenow-cmdb-enrichment-setup.md` | https://docs.datadoghq.com/integrations/guide/servicenow-cmdb-enrichment-setup/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/integrations/guide/servicenow-itom-itsm-setup.md` | https://docs.datadoghq.com/integrations/guide/servicenow-itom-itsm-setup/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/integrations/guide/servicenow-service-graph-connector-setup.md` | https://docs.datadoghq.com/integrations/guide/servicenow-service-graph-connector-setup/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/integrations/guide/source-code-integration.md` | https://docs.datadoghq.com/integrations/guide/source-code-integration/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/integrations/guide/use-bean-regexes-to-filter-your-jmx-metrics-and-supply-additional-tags.md` | https://docs.datadoghq.com/integrations/guide/use-bean-regexes-to-filter-your-jmx-metrics-and-supply-additional-tags/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/internal_developer_portal/_index.md` | https://docs.datadoghq.com/internal_developer_portal/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/internal_developer_portal/campaigns/_index.md` | https://docs.datadoghq.com/internal_developer_portal/campaigns/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/internal_developer_portal/developer_homepage.md` | https://docs.datadoghq.com/internal_developer_portal/developer_homepage/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/internal_developer_portal/eng_reports/_index.md` | https://docs.datadoghq.com/internal_developer_portal/eng_reports/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/internal_developer_portal/eng_reports/custom_reports.md` | https://docs.datadoghq.com/internal_developer_portal/eng_reports/custom_reports/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/internal_developer_portal/eng_reports/dora_metrics.md` | https://docs.datadoghq.com/internal_developer_portal/eng_reports/dora_metrics/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/internal_developer_portal/eng_reports/reliability_overview.md` | https://docs.datadoghq.com/internal_developer_portal/eng_reports/reliability_overview/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/internal_developer_portal/eng_reports/scorecards_performance.md` | https://docs.datadoghq.com/internal_developer_portal/eng_reports/scorecards_performance/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/internal_developer_portal/external_provider_status.md` | https://docs.datadoghq.com/internal_developer_portal/external_provider_status/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/internal_developer_portal/integrations.md` | https://docs.datadoghq.com/internal_developer_portal/integrations/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/internal_developer_portal/onboarding_guide.md` | https://docs.datadoghq.com/internal_developer_portal/onboarding_guide/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/internal_developer_portal/overview_pages.md` | https://docs.datadoghq.com/internal_developer_portal/overview_pages/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/internal_developer_portal/plugins.md` | https://docs.datadoghq.com/internal_developer_portal/plugins/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/internal_developer_portal/scorecards/_index.md` | https://docs.datadoghq.com/internal_developer_portal/scorecards/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/internal_developer_portal/scorecards/custom_rules.md` | https://docs.datadoghq.com/internal_developer_portal/scorecards/custom_rules/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/internal_developer_portal/scorecards/scorecard_configuration.md` | https://docs.datadoghq.com/internal_developer_portal/scorecards/scorecard_configuration/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/internal_developer_portal/scorecards/using_scorecards.md` | https://docs.datadoghq.com/internal_developer_portal/scorecards/using_scorecards/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/internal_developer_portal/self_service_actions/_index.md` | https://docs.datadoghq.com/internal_developer_portal/self_service_actions/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/internal_developer_portal/self_service_actions/software_templates.md` | https://docs.datadoghq.com/internal_developer_portal/self_service_actions/software_templates/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/internal_developer_portal/software_catalog/_index.md` | https://docs.datadoghq.com/internal_developer_portal/software_catalog/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/internal_developer_portal/software_catalog/endpoints/_index.md` | https://docs.datadoghq.com/internal_developer_portal/software_catalog/endpoints/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/internal_developer_portal/software_catalog/endpoints/explore_endpoints.md` | https://docs.datadoghq.com/internal_developer_portal/software_catalog/endpoints/explore_endpoints/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/internal_developer_portal/software_catalog/endpoints/monitor_endpoints.md` | https://docs.datadoghq.com/internal_developer_portal/software_catalog/endpoints/monitor_endpoints/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/internal_developer_portal/software_catalog/entity_model/_index.md` | https://docs.datadoghq.com/internal_developer_portal/software_catalog/entity_model/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/internal_developer_portal/software_catalog/entity_model/ai-generated-systems.md` | https://docs.datadoghq.com/internal_developer_portal/software_catalog/entity_model/ai-generated-systems/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/internal_developer_portal/software_catalog/entity_model/custom_entities.md` | https://docs.datadoghq.com/internal_developer_portal/software_catalog/entity_model/custom_entities/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/internal_developer_portal/software_catalog/entity_model/native_entities.md` | https://docs.datadoghq.com/internal_developer_portal/software_catalog/entity_model/native_entities/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/internal_developer_portal/software_catalog/set_up/_index.md` | https://docs.datadoghq.com/internal_developer_portal/software_catalog/set_up/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/internal_developer_portal/software_catalog/set_up/create_entities.md` | https://docs.datadoghq.com/internal_developer_portal/software_catalog/set_up/create_entities/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/internal_developer_portal/software_catalog/set_up/discover_entities.md` | https://docs.datadoghq.com/internal_developer_portal/software_catalog/set_up/discover_entities/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/internal_developer_portal/software_catalog/set_up/import_entities.md` | https://docs.datadoghq.com/internal_developer_portal/software_catalog/set_up/import_entities/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/internal_developer_portal/software_catalog/troubleshooting.md` | https://docs.datadoghq.com/internal_developer_portal/software_catalog/troubleshooting/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/internal_developer_portal/use_cases/api_management.md` | https://docs.datadoghq.com/internal_developer_portal/use_cases/api_management/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/internal_developer_portal/use_cases/appsec_management.md` | https://docs.datadoghq.com/internal_developer_portal/use_cases/appsec_management/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/internal_developer_portal/use_cases/cloud_cost_management.md` | https://docs.datadoghq.com/internal_developer_portal/use_cases/cloud_cost_management/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/internal_developer_portal/use_cases/dependency_management.md` | https://docs.datadoghq.com/internal_developer_portal/use_cases/dependency_management/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/internal_developer_portal/use_cases/dev_onboarding.md` | https://docs.datadoghq.com/internal_developer_portal/use_cases/dev_onboarding/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/internal_developer_portal/use_cases/incident_response.md` | https://docs.datadoghq.com/internal_developer_portal/use_cases/incident_response/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/internal_developer_portal/use_cases/pipeline_visibility.md` | https://docs.datadoghq.com/internal_developer_portal/use_cases/pipeline_visibility/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/internal_developer_portal/use_cases/production_readiness.md` | https://docs.datadoghq.com/internal_developer_portal/use_cases/production_readiness/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/llm_observability/_index.md` | https://docs.datadoghq.com/llm_observability/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/llm_observability/data_security_and_rbac.md` | https://docs.datadoghq.com/llm_observability/data_security_and_rbac/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/llm_observability/evaluations/_index.md` | https://docs.datadoghq.com/llm_observability/evaluations/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/llm_observability/evaluations/custom_llm_as_a_judge_evaluations.md` | https://docs.datadoghq.com/llm_observability/evaluations/custom_llm_as_a_judge_evaluations/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/llm_observability/evaluations/external_evaluations.md` | https://docs.datadoghq.com/llm_observability/evaluations/external_evaluations/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/llm_observability/evaluations/managed_evaluations/_index.md` | https://docs.datadoghq.com/llm_observability/evaluations/managed_evaluations/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/llm_observability/evaluations/ragas_evaluations.md` | https://docs.datadoghq.com/llm_observability/evaluations/ragas_evaluations/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/llm_observability/evaluations/submit_nemo_evaluations.md` | https://docs.datadoghq.com/llm_observability/evaluations/submit_nemo_evaluations/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/llm_observability/experiments/_index.md` | https://docs.datadoghq.com/llm_observability/experiments/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/llm_observability/guide/ragas_quickstart.md` | https://docs.datadoghq.com/llm_observability/guide/ragas_quickstart/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/llm_observability/instrumentation/_index.md` | https://docs.datadoghq.com/llm_observability/instrumentation/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/llm_observability/instrumentation/api.md` | https://docs.datadoghq.com/llm_observability/instrumentation/api/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/llm_observability/instrumentation/auto_instrumentation.md` | https://docs.datadoghq.com/llm_observability/instrumentation/auto_instrumentation/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/llm_observability/instrumentation/sdk.md` | https://docs.datadoghq.com/llm_observability/instrumentation/sdk/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/llm_observability/monitoring/agent_monitoring.md` | https://docs.datadoghq.com/llm_observability/monitoring/agent_monitoring/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/llm_observability/monitoring/cluster_map.md` | https://docs.datadoghq.com/llm_observability/monitoring/cluster_map/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/llm_observability/monitoring/llm_observability_and_apm.md` | https://docs.datadoghq.com/llm_observability/monitoring/llm_observability_and_apm/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/llm_observability/monitoring/mcp_client.md` | https://docs.datadoghq.com/llm_observability/monitoring/mcp_client/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/llm_observability/monitoring/metrics.md` | https://docs.datadoghq.com/llm_observability/monitoring/metrics/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/llm_observability/monitoring/prompt_tracking.md` | https://docs.datadoghq.com/llm_observability/monitoring/prompt_tracking/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/llm_observability/monitoring/querying.md` | https://docs.datadoghq.com/llm_observability/monitoring/querying/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/llm_observability/quickstart.md` | https://docs.datadoghq.com/llm_observability/quickstart/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/llm_observability/terms/_index.md` | https://docs.datadoghq.com/llm_observability/terms/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/_index.md` | https://docs.datadoghq.com/logs/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/error_tracking/_index.md` | https://docs.datadoghq.com/logs/error_tracking/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/explorer/_index.md` | https://docs.datadoghq.com/logs/explorer/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/explorer/advanced_search.md` | https://docs.datadoghq.com/logs/explorer/advanced_search/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/explorer/analytics/_index.md` | https://docs.datadoghq.com/logs/explorer/analytics/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/explorer/analytics/patterns.md` | https://docs.datadoghq.com/logs/explorer/analytics/patterns/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/explorer/analytics/transactions.md` | https://docs.datadoghq.com/logs/explorer/analytics/transactions/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/explorer/calculated_fields/_index.md` | https://docs.datadoghq.com/logs/explorer/calculated_fields/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/explorer/calculated_fields/extractions.md` | https://docs.datadoghq.com/logs/explorer/calculated_fields/extractions/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/explorer/calculated_fields/formulas.md` | https://docs.datadoghq.com/logs/explorer/calculated_fields/formulas/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/explorer/export.md` | https://docs.datadoghq.com/logs/explorer/export/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/explorer/facets.md` | https://docs.datadoghq.com/logs/explorer/facets/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/explorer/live_tail.md` | https://docs.datadoghq.com/logs/explorer/live_tail/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/explorer/saved_views.md` | https://docs.datadoghq.com/logs/explorer/saved_views/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/explorer/search.md` | https://docs.datadoghq.com/logs/explorer/search/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/explorer/search_syntax.md` | https://docs.datadoghq.com/logs/explorer/search_syntax/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/explorer/side_panel.md` | https://docs.datadoghq.com/logs/explorer/side_panel/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/explorer/visualize.md` | https://docs.datadoghq.com/logs/explorer/visualize/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/explorer/watchdog_insights.md` | https://docs.datadoghq.com/logs/explorer/watchdog_insights/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/faq/how-to-investigate-a-log-parsing-issue.md` | https://docs.datadoghq.com/logs/faq/how-to-investigate-a-log-parsing-issue/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/faq/logs_cost_attribution.md` | https://docs.datadoghq.com/logs/faq/logs_cost_attribution/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/faq/why-not-to-use-tcp-for-log-collection.md` | https://docs.datadoghq.com/logs/faq/why-not-to-use-tcp-for-log-collection/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/guide/access-your-log-data-programmatically.md` | https://docs.datadoghq.com/logs/guide/access-your-log-data-programmatically/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/guide/analyze_ecommerce_ops.md` | https://docs.datadoghq.com/logs/guide/analyze_ecommerce_ops/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/guide/analyze_finance_operations.md` | https://docs.datadoghq.com/logs/guide/analyze_finance_operations/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/guide/analyze_login_attempts.md` | https://docs.datadoghq.com/logs/guide/analyze_login_attempts/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/guide/apigee.md` | https://docs.datadoghq.com/logs/guide/apigee/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/guide/aws-account-level-logs.md` | https://docs.datadoghq.com/logs/guide/aws-account-level-logs/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/guide/aws-eks-fargate-logs-with-kinesis-data-firehose.md` | https://docs.datadoghq.com/logs/guide/aws-eks-fargate-logs-with-kinesis-data-firehose/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/guide/azure-automated-log-forwarding.md` | https://docs.datadoghq.com/logs/guide/azure-automated-log-forwarding/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/guide/azure-event-hub-log-forwarding.md` | https://docs.datadoghq.com/logs/guide/azure-event-hub-log-forwarding/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/guide/azure-manual-log-forwarding.md` | https://docs.datadoghq.com/logs/guide/azure-manual-log-forwarding/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/guide/best-practices-for-log-management.md` | https://docs.datadoghq.com/logs/guide/best-practices-for-log-management/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/guide/build-custom-reports-using-log-analytics-api.md` | https://docs.datadoghq.com/logs/guide/build-custom-reports-using-log-analytics-api/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/guide/collect-google-cloud-logs-with-push.md` | https://docs.datadoghq.com/logs/guide/collect-google-cloud-logs-with-push/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/guide/collect-multiple-logs-with-pagination.md` | https://docs.datadoghq.com/logs/guide/collect-multiple-logs-with-pagination/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/guide/commonly-used-log-processing-rules.md` | https://docs.datadoghq.com/logs/guide/commonly-used-log-processing-rules/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/guide/container-agent-to-tail-logs-from-host.md` | https://docs.datadoghq.com/logs/guide/container-agent-to-tail-logs-from-host/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/guide/correlate-logs-with-metrics.md` | https://docs.datadoghq.com/logs/guide/correlate-logs-with-metrics/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/guide/custom-log-file-with-heightened-read-permissions.md` | https://docs.datadoghq.com/logs/guide/custom-log-file-with-heightened-read-permissions/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/guide/delete_logs_with_sensitive_data.md` | https://docs.datadoghq.com/logs/guide/delete_logs_with_sensitive_data/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/guide/detect-unparsed-logs.md` | https://docs.datadoghq.com/logs/guide/detect-unparsed-logs/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/guide/ease-troubleshooting-with-cross-product-correlation.md` | https://docs.datadoghq.com/logs/guide/ease-troubleshooting-with-cross-product-correlation/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/guide/flex_compute.md` | https://docs.datadoghq.com/logs/guide/flex_compute/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/guide/fluentbit.md` | https://docs.datadoghq.com/logs/guide/fluentbit/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/guide/getting-started-lwl.md` | https://docs.datadoghq.com/logs/guide/getting-started-lwl/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/guide/google-cloud-log-forwarding.md` | https://docs.datadoghq.com/logs/guide/google-cloud-log-forwarding/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/guide/google-cloud-logging-recommendations.md` | https://docs.datadoghq.com/logs/guide/google-cloud-logging-recommendations/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/guide/how-to-set-up-only-logs.md` | https://docs.datadoghq.com/logs/guide/how-to-set-up-only-logs/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/guide/lambda-logs-collection-troubleshooting-guide.md` | https://docs.datadoghq.com/logs/guide/lambda-logs-collection-troubleshooting-guide/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/guide/log-collection-troubleshooting-guide.md` | https://docs.datadoghq.com/logs/guide/log-collection-troubleshooting-guide/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/guide/log-parsing-best-practice.md` | https://docs.datadoghq.com/logs/guide/log-parsing-best-practice/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/guide/logs-not-showing-expected-timestamp.md` | https://docs.datadoghq.com/logs/guide/logs-not-showing-expected-timestamp/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/guide/logs-rbac-permissions.md` | https://docs.datadoghq.com/logs/guide/logs-rbac-permissions/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/guide/logs-rbac.md` | https://docs.datadoghq.com/logs/guide/logs-rbac/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/guide/logs-show-info-status-for-warnings-or-errors.md` | https://docs.datadoghq.com/logs/guide/logs-show-info-status-for-warnings-or-errors/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/guide/manage-sensitive-logs-data-access.md` | https://docs.datadoghq.com/logs/guide/manage-sensitive-logs-data-access/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/guide/mechanisms-ensure-logs-not-lost.md` | https://docs.datadoghq.com/logs/guide/mechanisms-ensure-logs-not-lost/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/guide/reduce_data_transfer_fees.md` | https://docs.datadoghq.com/logs/guide/reduce_data_transfer_fees/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/guide/remap-custom-severity-to-official-log-status.md` | https://docs.datadoghq.com/logs/guide/remap-custom-severity-to-official-log-status/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/guide/send-aws-services-logs-with-the-datadog-kinesis-firehose-destination.md` | https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-kinesis-firehose-destination/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function.md` | https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/guide/sending-events-and-logs-to-datadog-with-amazon-eventbridge-api-destinations.md` | https://docs.datadoghq.com/logs/guide/sending-events-and-logs-to-datadog-with-amazon-eventbridge-api-destinations/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/guide/setting-file-permissions-for-rotating-logs.md` | https://docs.datadoghq.com/logs/guide/setting-file-permissions-for-rotating-logs/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/log_collection/_index.md` | https://docs.datadoghq.com/logs/log_collection/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/log_collection/agent_checks.md` | https://docs.datadoghq.com/logs/log_collection/agent_checks/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/log_collection/android.md` | https://docs.datadoghq.com/logs/log_collection/android/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/log_collection/csharp.md` | https://docs.datadoghq.com/logs/log_collection/csharp/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/log_collection/flutter.md` | https://docs.datadoghq.com/logs/log_collection/flutter/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/log_collection/go.md` | https://docs.datadoghq.com/logs/log_collection/go/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/log_collection/ios.md` | https://docs.datadoghq.com/logs/log_collection/ios/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/log_collection/java.md` | https://docs.datadoghq.com/logs/log_collection/java/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/log_collection/kotlin_multiplatform.md` | https://docs.datadoghq.com/logs/log_collection/kotlin_multiplatform/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/log_collection/nodejs.md` | https://docs.datadoghq.com/logs/log_collection/nodejs/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/log_collection/php.md` | https://docs.datadoghq.com/logs/log_collection/php/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/log_collection/python.md` | https://docs.datadoghq.com/logs/log_collection/python/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/log_collection/reactnative.md` | https://docs.datadoghq.com/logs/log_collection/reactnative/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/log_collection/roku.md` | https://docs.datadoghq.com/logs/log_collection/roku/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/log_collection/ruby.md` | https://docs.datadoghq.com/logs/log_collection/ruby/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/log_collection/unity.md` | https://docs.datadoghq.com/logs/log_collection/unity/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/log_configuration/_index.md` | https://docs.datadoghq.com/logs/log_configuration/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/log_configuration/archive_search.md` | https://docs.datadoghq.com/logs/log_configuration/archive_search/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/log_configuration/archives.md` | https://docs.datadoghq.com/logs/log_configuration/archives/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/log_configuration/attributes_naming_convention.md` | https://docs.datadoghq.com/logs/log_configuration/attributes_naming_convention/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/log_configuration/flex_logs.md` | https://docs.datadoghq.com/logs/log_configuration/flex_logs/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/log_configuration/forwarding_custom_destinations.md` | https://docs.datadoghq.com/logs/log_configuration/forwarding_custom_destinations/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/log_configuration/indexes.md` | https://docs.datadoghq.com/logs/log_configuration/indexes/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/log_configuration/logs_to_metrics.md` | https://docs.datadoghq.com/logs/log_configuration/logs_to_metrics/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/log_configuration/parsing.md` | https://docs.datadoghq.com/logs/log_configuration/parsing/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/log_configuration/pipeline_scanner.md` | https://docs.datadoghq.com/logs/log_configuration/pipeline_scanner/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/log_configuration/pipelines.md` | https://docs.datadoghq.com/logs/log_configuration/pipelines/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/log_configuration/processors.md` | https://docs.datadoghq.com/logs/log_configuration/processors/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/logs/log_configuration/rehydrating.md` | https://docs.datadoghq.com/logs/log_configuration/rehydrating/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/metrics/advanced-filtering.md` | https://docs.datadoghq.com/metrics/advanced-filtering/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/metrics/composite_metrics_queries.md` | https://docs.datadoghq.com/metrics/composite_metrics_queries/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/metrics/custom_metrics/_index.md` | https://docs.datadoghq.com/metrics/custom_metrics/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/metrics/custom_metrics/agent_metrics_submission.md` | https://docs.datadoghq.com/metrics/custom_metrics/agent_metrics_submission/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/metrics/custom_metrics/dogstatsd_metrics_submission.md` | https://docs.datadoghq.com/metrics/custom_metrics/dogstatsd_metrics_submission/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/metrics/custom_metrics/historical_metrics.md` | https://docs.datadoghq.com/metrics/custom_metrics/historical_metrics/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/metrics/custom_metrics/powershell_metrics_submission.md` | https://docs.datadoghq.com/metrics/custom_metrics/powershell_metrics_submission/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/metrics/derived-metrics.md` | https://docs.datadoghq.com/metrics/derived-metrics/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/metrics/distributions.md` | https://docs.datadoghq.com/metrics/distributions/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/metrics/explorer.md` | https://docs.datadoghq.com/metrics/explorer/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/metrics/guide/agent-filtering-for-dogstatsd-custom-metrics.md` | https://docs.datadoghq.com/metrics/guide/agent-filtering-for-dogstatsd-custom-metrics/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/metrics/guide/calculating-the-system-mem-used-metric.md` | https://docs.datadoghq.com/metrics/guide/calculating-the-system-mem-used-metric/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/metrics/guide/custom_metrics_governance.md` | https://docs.datadoghq.com/metrics/guide/custom_metrics_governance/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/metrics/guide/different-aggregators-look-same.md` | https://docs.datadoghq.com/metrics/guide/different-aggregators-look-same/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/metrics/guide/dynamic_quotas.md` | https://docs.datadoghq.com/metrics/guide/dynamic_quotas/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/metrics/guide/interpolation-the-fill-modifier-explained.md` | https://docs.datadoghq.com/metrics/guide/interpolation-the-fill-modifier-explained/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/metrics/guide/micrometer.md` | https://docs.datadoghq.com/metrics/guide/micrometer/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/metrics/guide/rate-limit.md` | https://docs.datadoghq.com/metrics/guide/rate-limit/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/metrics/guide/why-does-zooming-out-a-timeframe-also-smooth-out-my-graphs.md` | https://docs.datadoghq.com/metrics/guide/why-does-zooming-out-a-timeframe-also-smooth-out-my-graphs/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/metrics/metrics-without-limits.md` | https://docs.datadoghq.com/metrics/metrics-without-limits/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/metrics/nested_queries.md` | https://docs.datadoghq.com/metrics/nested_queries/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/metrics/open_telemetry/_index.md` | https://docs.datadoghq.com/metrics/open_telemetry/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/metrics/open_telemetry/otlp_metric_types.md` | https://docs.datadoghq.com/metrics/open_telemetry/otlp_metric_types/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/metrics/open_telemetry/query_metrics.md` | https://docs.datadoghq.com/metrics/open_telemetry/query_metrics/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/metrics/overview.md` | https://docs.datadoghq.com/metrics/overview/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/metrics/summary.md` | https://docs.datadoghq.com/metrics/summary/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/metrics/types.md` | https://docs.datadoghq.com/metrics/types/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/metrics/units.md` | https://docs.datadoghq.com/metrics/units/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/metrics/volume.md` | https://docs.datadoghq.com/metrics/volume/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/mobile/_index.md` | https://docs.datadoghq.com/mobile/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/mobile/datadog_for_intune.md` | https://docs.datadoghq.com/mobile/datadog_for_intune/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/mobile/enterprise_configuration.md` | https://docs.datadoghq.com/mobile/enterprise_configuration/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/mobile/guide/setup_mobile_device.md` | https://docs.datadoghq.com/mobile/guide/setup_mobile_device/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/mobile/push_notification.md` | https://docs.datadoghq.com/mobile/push_notification/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/mobile/shortcut_configurations.md` | https://docs.datadoghq.com/mobile/shortcut_configurations/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/mobile/widgets.md` | https://docs.datadoghq.com/mobile/widgets/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/monitors/_index.md` | https://docs.datadoghq.com/monitors/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/monitors/configuration/_index.md` | https://docs.datadoghq.com/monitors/configuration/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/monitors/downtimes/_index.md` | https://docs.datadoghq.com/monitors/downtimes/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/monitors/downtimes/examples.md` | https://docs.datadoghq.com/monitors/downtimes/examples/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/monitors/draft/_index.md` | https://docs.datadoghq.com/monitors/draft/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/monitors/faq/can-i-send-sms-notifications-in-datadog.md` | https://docs.datadoghq.com/monitors/faq/can-i-send-sms-notifications-in-datadog/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/monitors/guide/add-a-minimum-request-threshold-for-error-rate-alerts.md` | https://docs.datadoghq.com/monitors/guide/add-a-minimum-request-threshold-for-error-rate-alerts/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/monitors/guide/adjusting-no-data-alerts-for-metric-monitors.md` | https://docs.datadoghq.com/monitors/guide/adjusting-no-data-alerts-for-metric-monitors/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/monitors/guide/alert-on-no-change-in-value.md` | https://docs.datadoghq.com/monitors/guide/alert-on-no-change-in-value/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/monitors/guide/alert_aggregation.md` | https://docs.datadoghq.com/monitors/guide/alert_aggregation/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/monitors/guide/clean_up_monitor_clutter.md` | https://docs.datadoghq.com/monitors/guide/clean_up_monitor_clutter/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/monitors/guide/composite_use_cases.md` | https://docs.datadoghq.com/monitors/guide/composite_use_cases/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/monitors/guide/create-cluster-alert.md` | https://docs.datadoghq.com/monitors/guide/create-cluster-alert/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/monitors/guide/create-monitor-dependencies.md` | https://docs.datadoghq.com/monitors/guide/create-monitor-dependencies/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/monitors/guide/custom_schedules.md` | https://docs.datadoghq.com/monitors/guide/custom_schedules/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/monitors/guide/github_gating.md` | https://docs.datadoghq.com/monitors/guide/github_gating/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/monitors/guide/history_and_evaluation_graphs.md` | https://docs.datadoghq.com/monitors/guide/history_and_evaluation_graphs/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/monitors/guide/how-to-set-up-rbac-for-monitors.md` | https://docs.datadoghq.com/monitors/guide/how-to-set-up-rbac-for-monitors/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/monitors/guide/how-to-update-anomaly-monitor-timezone.md` | https://docs.datadoghq.com/monitors/guide/how-to-update-anomaly-monitor-timezone/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/monitors/guide/integrate-monitors-with-statuspage.md` | https://docs.datadoghq.com/monitors/guide/integrate-monitors-with-statuspage/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/monitors/guide/monitor-ephemeral-servers-for-reboots.md` | https://docs.datadoghq.com/monitors/guide/monitor-ephemeral-servers-for-reboots/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/monitors/guide/monitor_aggregators.md` | https://docs.datadoghq.com/monitors/guide/monitor_aggregators/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/monitors/guide/monitor_best_practices.md` | https://docs.datadoghq.com/monitors/guide/monitor_best_practices/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/monitors/guide/monitoring-sparse-metrics.md` | https://docs.datadoghq.com/monitors/guide/monitoring-sparse-metrics/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/monitors/guide/non_static_thresholds.md` | https://docs.datadoghq.com/monitors/guide/non_static_thresholds/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/monitors/guide/notification-message-best-practices.md` | https://docs.datadoghq.com/monitors/guide/notification-message-best-practices/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/monitors/guide/on_missing_data.md` | https://docs.datadoghq.com/monitors/guide/on_missing_data/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/monitors/guide/prevent-alerts-from-monitors-that-were-in-downtime.md` | https://docs.datadoghq.com/monitors/guide/prevent-alerts-from-monitors-that-were-in-downtime/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/monitors/guide/recovery-thresholds.md` | https://docs.datadoghq.com/monitors/guide/recovery-thresholds/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/monitors/guide/reduce-alert-flapping.md` | https://docs.datadoghq.com/monitors/guide/reduce-alert-flapping/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/monitors/guide/scoping_downtimes.md` | https://docs.datadoghq.com/monitors/guide/scoping_downtimes/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/monitors/guide/set-up-an-alert-for-when-a-specific-tag-stops-reporting.md` | https://docs.datadoghq.com/monitors/guide/set-up-an-alert-for-when-a-specific-tag-stops-reporting/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/monitors/guide/troubleshooting-monitor-alerts.md` | https://docs.datadoghq.com/monitors/guide/troubleshooting-monitor-alerts/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/monitors/manage/_index.md` | https://docs.datadoghq.com/monitors/manage/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/monitors/manage/check_summary.md` | https://docs.datadoghq.com/monitors/manage/check_summary/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/monitors/manage/search.md` | https://docs.datadoghq.com/monitors/manage/search/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/monitors/notify/_index.md` | https://docs.datadoghq.com/monitors/notify/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/monitors/notify/notification_rules.md` | https://docs.datadoghq.com/monitors/notify/notification_rules/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/monitors/notify/variables.md` | https://docs.datadoghq.com/monitors/notify/variables/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/monitors/quality/_index.md` | https://docs.datadoghq.com/monitors/quality/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/monitors/settings/_index.md` | https://docs.datadoghq.com/monitors/settings/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/monitors/status/events.md` | https://docs.datadoghq.com/monitors/status/events/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/monitors/status/graphs.md` | https://docs.datadoghq.com/monitors/status/graphs/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/monitors/status/status_legacy.md` | https://docs.datadoghq.com/monitors/status/status_legacy/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/monitors/status/status_page.md` | https://docs.datadoghq.com/monitors/status/status_page/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/monitors/templates/_index.md` | https://docs.datadoghq.com/monitors/templates/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/monitors/types/_index.md` | https://docs.datadoghq.com/monitors/types/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/monitors/types/analysis.md` | https://docs.datadoghq.com/monitors/types/analysis/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/monitors/types/anomaly.md` | https://docs.datadoghq.com/monitors/types/anomaly/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/monitors/types/apm.md` | https://docs.datadoghq.com/monitors/types/apm/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/monitors/types/audit_trail.md` | https://docs.datadoghq.com/monitors/types/audit_trail/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/monitors/types/change-alert.md` | https://docs.datadoghq.com/monitors/types/change-alert/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/monitors/types/ci.md` | https://docs.datadoghq.com/monitors/types/ci/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/monitors/types/cloud_cost.md` | https://docs.datadoghq.com/monitors/types/cloud_cost/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/monitors/types/cloud_network_monitoring.md` | https://docs.datadoghq.com/monitors/types/cloud_network_monitoring/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/monitors/types/composite.md` | https://docs.datadoghq.com/monitors/types/composite/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/monitors/types/custom_check.md` | https://docs.datadoghq.com/monitors/types/custom_check/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/monitors/types/error_tracking.md` | https://docs.datadoghq.com/monitors/types/error_tracking/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/monitors/types/event.md` | https://docs.datadoghq.com/monitors/types/event/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/monitors/types/forecasts.md` | https://docs.datadoghq.com/monitors/types/forecasts/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/monitors/types/host.md` | https://docs.datadoghq.com/monitors/types/host/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/monitors/types/integration.md` | https://docs.datadoghq.com/monitors/types/integration/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/monitors/types/log.md` | https://docs.datadoghq.com/monitors/types/log/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/monitors/types/metric.md` | https://docs.datadoghq.com/monitors/types/metric/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/monitors/types/netflow.md` | https://docs.datadoghq.com/monitors/types/netflow/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/monitors/types/network.md` | https://docs.datadoghq.com/monitors/types/network/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/monitors/types/outlier.md` | https://docs.datadoghq.com/monitors/types/outlier/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/monitors/types/process.md` | https://docs.datadoghq.com/monitors/types/process/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/monitors/types/process_check.md` | https://docs.datadoghq.com/monitors/types/process_check/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/monitors/types/real_user_monitoring.md` | https://docs.datadoghq.com/monitors/types/real_user_monitoring/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/monitors/types/service_check.md` | https://docs.datadoghq.com/monitors/types/service_check/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/monitors/types/slo.md` | https://docs.datadoghq.com/monitors/types/slo/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/monitors/types/synthetic_monitoring.md` | https://docs.datadoghq.com/monitors/types/synthetic_monitoring/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/monitors/types/watchdog.md` | https://docs.datadoghq.com/monitors/types/watchdog/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/network_monitoring/_index.md` | https://docs.datadoghq.com/network_monitoring/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/network_monitoring/cloud_network_monitoring/_index.md` | https://docs.datadoghq.com/network_monitoring/cloud_network_monitoring/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/network_monitoring/cloud_network_monitoring/glossary.md` | https://docs.datadoghq.com/network_monitoring/cloud_network_monitoring/glossary/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/network_monitoring/cloud_network_monitoring/guide/detecting_a_network_outage.md` | https://docs.datadoghq.com/network_monitoring/cloud_network_monitoring/guide/detecting_a_network_outage/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/network_monitoring/cloud_network_monitoring/guide/detecting_application_availability.md` | https://docs.datadoghq.com/network_monitoring/cloud_network_monitoring/guide/detecting_application_availability/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/network_monitoring/cloud_network_monitoring/guide/manage_traffic_costs_with_cnm.md` | https://docs.datadoghq.com/network_monitoring/cloud_network_monitoring/guide/manage_traffic_costs_with_cnm/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/network_monitoring/cloud_network_monitoring/network_analytics.md` | https://docs.datadoghq.com/network_monitoring/cloud_network_monitoring/network_analytics/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/network_monitoring/cloud_network_monitoring/network_health.md` | https://docs.datadoghq.com/network_monitoring/cloud_network_monitoring/network_health/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/network_monitoring/cloud_network_monitoring/network_map.md` | https://docs.datadoghq.com/network_monitoring/cloud_network_monitoring/network_map/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/network_monitoring/cloud_network_monitoring/setup.md` | https://docs.datadoghq.com/network_monitoring/cloud_network_monitoring/setup/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/network_monitoring/cloud_network_monitoring/supported_cloud_services/aws_supported_services.md` | https://docs.datadoghq.com/network_monitoring/cloud_network_monitoring/supported_cloud_services/aws_supported_services/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/network_monitoring/cloud_network_monitoring/supported_cloud_services/azure_supported_services.md` | https://docs.datadoghq.com/network_monitoring/cloud_network_monitoring/supported_cloud_services/azure_supported_services/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/network_monitoring/cloud_network_monitoring/supported_cloud_services/gcp_supported_services.md` | https://docs.datadoghq.com/network_monitoring/cloud_network_monitoring/supported_cloud_services/gcp_supported_services/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/network_monitoring/cloud_network_monitoring/tags_reference.md` | https://docs.datadoghq.com/network_monitoring/cloud_network_monitoring/tags_reference/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/network_monitoring/devices/_index.md` | https://docs.datadoghq.com/network_monitoring/devices/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/network_monitoring/devices/config_management.md` | https://docs.datadoghq.com/network_monitoring/devices/config_management/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/network_monitoring/devices/geomap.md` | https://docs.datadoghq.com/network_monitoring/devices/geomap/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/network_monitoring/devices/glossary.md` | https://docs.datadoghq.com/network_monitoring/devices/glossary/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/network_monitoring/devices/guide/_index.md` | https://docs.datadoghq.com/network_monitoring/devices/guide/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/network_monitoring/devices/guide/build-ndm-profile.md` | https://docs.datadoghq.com/network_monitoring/devices/guide/build-ndm-profile/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/network_monitoring/devices/guide/cluster-agent.md` | https://docs.datadoghq.com/network_monitoring/devices/guide/cluster-agent/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/network_monitoring/devices/guide/device_profiles.md` | https://docs.datadoghq.com/network_monitoring/devices/guide/device_profiles/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/network_monitoring/devices/guide/tags-with-regex.md` | https://docs.datadoghq.com/network_monitoring/devices/guide/tags-with-regex/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/network_monitoring/devices/integrations.md` | https://docs.datadoghq.com/network_monitoring/devices/integrations/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/network_monitoring/devices/ping.md` | https://docs.datadoghq.com/network_monitoring/devices/ping/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/network_monitoring/devices/profiles.md` | https://docs.datadoghq.com/network_monitoring/devices/profiles/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/network_monitoring/devices/setup.md` | https://docs.datadoghq.com/network_monitoring/devices/setup/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/network_monitoring/devices/snmp_metrics.md` | https://docs.datadoghq.com/network_monitoring/devices/snmp_metrics/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/network_monitoring/devices/snmp_traps.md` | https://docs.datadoghq.com/network_monitoring/devices/snmp_traps/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/network_monitoring/devices/supported_devices.md` | https://docs.datadoghq.com/network_monitoring/devices/supported_devices/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/network_monitoring/devices/syslog.md` | https://docs.datadoghq.com/network_monitoring/devices/syslog/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/network_monitoring/devices/topology.md` | https://docs.datadoghq.com/network_monitoring/devices/topology/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/network_monitoring/devices/troubleshooting.md` | https://docs.datadoghq.com/network_monitoring/devices/troubleshooting/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/network_monitoring/devices/vpn_monitoring.md` | https://docs.datadoghq.com/network_monitoring/devices/vpn_monitoring/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/network_monitoring/dns/_index.md` | https://docs.datadoghq.com/network_monitoring/dns/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/network_monitoring/netflow/_index.md` | https://docs.datadoghq.com/network_monitoring/netflow/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/network_monitoring/network_path/_index.md` | https://docs.datadoghq.com/network_monitoring/network_path/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/network_monitoring/network_path/guide/traceroute_variants.md` | https://docs.datadoghq.com/network_monitoring/network_path/guide/traceroute_variants/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/network_monitoring/network_path/list_view.md` | https://docs.datadoghq.com/network_monitoring/network_path/list_view/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/network_monitoring/network_path/path_view.md` | https://docs.datadoghq.com/network_monitoring/network_path/path_view/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/network_monitoring/network_path/setup.md` | https://docs.datadoghq.com/network_monitoring/network_path/setup/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/notebooks/_index.md` | https://docs.datadoghq.com/notebooks/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/notebooks/advanced_analysis/_index.md` | https://docs.datadoghq.com/notebooks/advanced_analysis/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/notebooks/advanced_analysis/getting_started.md` | https://docs.datadoghq.com/notebooks/advanced_analysis/getting_started/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/notebooks/guide/template_variables_analysis_notebooks.md` | https://docs.datadoghq.com/notebooks/guide/template_variables_analysis_notebooks/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/notebooks/guide/version_history.md` | https://docs.datadoghq.com/notebooks/guide/version_history/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/observability_pipelines/_index.md` | https://docs.datadoghq.com/observability_pipelines/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/observability_pipelines/configuration/_index.md` | https://docs.datadoghq.com/observability_pipelines/configuration/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/observability_pipelines/configuration/explore_templates.md` | https://docs.datadoghq.com/observability_pipelines/configuration/explore_templates/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/observability_pipelines/configuration/install_the_worker/_index.md` | https://docs.datadoghq.com/observability_pipelines/configuration/install_the_worker/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/observability_pipelines/configuration/install_the_worker/advanced_worker_configurations.md` | https://docs.datadoghq.com/observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/observability_pipelines/configuration/install_the_worker/run_multiple_pipelines_on_a_host.md` | https://docs.datadoghq.com/observability_pipelines/configuration/install_the_worker/run_multiple_pipelines_on_a_host/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/observability_pipelines/configuration/live_capture.md` | https://docs.datadoghq.com/observability_pipelines/configuration/live_capture/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/observability_pipelines/configuration/set_up_pipelines.md` | https://docs.datadoghq.com/observability_pipelines/configuration/set_up_pipelines/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/observability_pipelines/destinations/sentinelone.md` | https://docs.datadoghq.com/observability_pipelines/destinations/sentinelone/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/observability_pipelines/guide/get_started_with_the_custom_processor.md` | https://docs.datadoghq.com/observability_pipelines/guide/get_started_with_the_custom_processor/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/observability_pipelines/guide/remap_reserved_attributes.md` | https://docs.datadoghq.com/observability_pipelines/guide/remap_reserved_attributes/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/observability_pipelines/guide/strategies_for_reducing_log_volume.md` | https://docs.datadoghq.com/observability_pipelines/guide/strategies_for_reducing_log_volume/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/observability_pipelines/guide/upgrade_your_filter_queries_to_the_new_search_syntax.md` | https://docs.datadoghq.com/observability_pipelines/guide/upgrade_your_filter_queries_to_the_new_search_syntax/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/observability_pipelines/legacy/_index.md` | https://docs.datadoghq.com/observability_pipelines/legacy/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/observability_pipelines/legacy/configurations.md` | https://docs.datadoghq.com/observability_pipelines/legacy/configurations/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/observability_pipelines/legacy/guide/control_log_volume_and_size.md` | https://docs.datadoghq.com/observability_pipelines/legacy/guide/control_log_volume_and_size/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/observability_pipelines/legacy/guide/ingest_aws_s3_logs_with_the_observability_pipelines_worker.md` | https://docs.datadoghq.com/observability_pipelines/legacy/guide/ingest_aws_s3_logs_with_the_observability_pipelines_worker/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/observability_pipelines/legacy/guide/route_logs_in_datadog_rehydratable_format_to_Amazon_S3.md` | https://docs.datadoghq.com/observability_pipelines/legacy/guide/route_logs_in_datadog_rehydratable_format_to_Amazon_S3/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/observability_pipelines/legacy/guide/sensitive_data_scanner_transform.md` | https://docs.datadoghq.com/observability_pipelines/legacy/guide/sensitive_data_scanner_transform/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/observability_pipelines/legacy/guide/set_quotas_for_data_sent_to_a_destination.md` | https://docs.datadoghq.com/observability_pipelines/legacy/guide/set_quotas_for_data_sent_to_a_destination/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/observability_pipelines/legacy/setup/_index.md` | https://docs.datadoghq.com/observability_pipelines/legacy/setup/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/observability_pipelines/legacy/setup/datadog.md` | https://docs.datadoghq.com/observability_pipelines/legacy/setup/datadog/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/observability_pipelines/legacy/setup/datadog_with_archiving.md` | https://docs.datadoghq.com/observability_pipelines/legacy/setup/datadog_with_archiving/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/observability_pipelines/legacy/setup/splunk.md` | https://docs.datadoghq.com/observability_pipelines/legacy/setup/splunk/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/observability_pipelines/legacy/troubleshooting.md` | https://docs.datadoghq.com/observability_pipelines/legacy/troubleshooting/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/observability_pipelines/legacy/working_with_data.md` | https://docs.datadoghq.com/observability_pipelines/legacy/working_with_data/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/observability_pipelines/monitoring_and_troubleshooting/monitoring_pipelines.md` | https://docs.datadoghq.com/observability_pipelines/monitoring_and_troubleshooting/monitoring_pipelines/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics.md` | https://docs.datadoghq.com/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/observability_pipelines/monitoring_and_troubleshooting/worker_cli_commands.md` | https://docs.datadoghq.com/observability_pipelines/monitoring_and_troubleshooting/worker_cli_commands/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/observability_pipelines/packs/_index.md` | https://docs.datadoghq.com/observability_pipelines/packs/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/observability_pipelines/packs/okta.md` | https://docs.datadoghq.com/observability_pipelines/packs/okta/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/observability_pipelines/packs/palo_alto_firewall.md` | https://docs.datadoghq.com/observability_pipelines/packs/palo_alto_firewall/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/observability_pipelines/processors/_index.md` | https://docs.datadoghq.com/observability_pipelines/processors/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/observability_pipelines/processors/custom_processor.md` | https://docs.datadoghq.com/observability_pipelines/processors/custom_processor/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/observability_pipelines/processors/edit_fields.md` | https://docs.datadoghq.com/observability_pipelines/processors/edit_fields/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/observability_pipelines/processors/filter.md` | https://docs.datadoghq.com/observability_pipelines/processors/filter/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/observability_pipelines/processors/parse_xml.md` | https://docs.datadoghq.com/observability_pipelines/processors/parse_xml/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/observability_pipelines/rehydration.md` | https://docs.datadoghq.com/observability_pipelines/rehydration/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/observability_pipelines/scaling_and_performance/handling_load_and_backpressure.md` | https://docs.datadoghq.com/observability_pipelines/scaling_and_performance/handling_load_and_backpressure/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/observability_pipelines/sources/_index.md` | https://docs.datadoghq.com/observability_pipelines/sources/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/observability_pipelines/sources/datadog_agent.md` | https://docs.datadoghq.com/observability_pipelines/sources/datadog_agent/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/observability_pipelines/sources/opentelemetry.md` | https://docs.datadoghq.com/observability_pipelines/sources/opentelemetry/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/opentelemetry/_index.md` | https://docs.datadoghq.com/opentelemetry/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/opentelemetry/compatibility.md` | https://docs.datadoghq.com/opentelemetry/compatibility/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/opentelemetry/config/_index.md` | https://docs.datadoghq.com/opentelemetry/config/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/opentelemetry/config/environment_variable_support.md` | https://docs.datadoghq.com/opentelemetry/config/environment_variable_support/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/opentelemetry/config/log_collection.md` | https://docs.datadoghq.com/opentelemetry/config/log_collection/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/opentelemetry/config/otlp_receiver.md` | https://docs.datadoghq.com/opentelemetry/config/otlp_receiver/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/opentelemetry/correlate/_index.md` | https://docs.datadoghq.com/opentelemetry/correlate/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/opentelemetry/correlate/dbm_and_traces.md` | https://docs.datadoghq.com/opentelemetry/correlate/dbm_and_traces/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/opentelemetry/correlate/metrics_and_traces.md` | https://docs.datadoghq.com/opentelemetry/correlate/metrics_and_traces/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/opentelemetry/getting_started/_index.md` | https://docs.datadoghq.com/opentelemetry/getting_started/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/opentelemetry/getting_started/otel_demo_to_datadog.md` | https://docs.datadoghq.com/opentelemetry/getting_started/otel_demo_to_datadog/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/opentelemetry/guide/combining_otel_and_datadog_metrics.md` | https://docs.datadoghq.com/opentelemetry/guide/combining_otel_and_datadog_metrics/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/opentelemetry/guide/otlp_delta_temporality.md` | https://docs.datadoghq.com/opentelemetry/guide/otlp_delta_temporality/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/opentelemetry/guide/otlp_histogram_heatmaps.md` | https://docs.datadoghq.com/opentelemetry/guide/otlp_histogram_heatmaps/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/opentelemetry/ingestion_sampling.md` | https://docs.datadoghq.com/opentelemetry/ingestion_sampling/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/opentelemetry/instrument/_index.md` | https://docs.datadoghq.com/opentelemetry/instrument/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/opentelemetry/instrument/api_support/_index.md` | https://docs.datadoghq.com/opentelemetry/instrument/api_support/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/opentelemetry/instrument/api_support/dotnet/logs.md` | https://docs.datadoghq.com/opentelemetry/instrument/api_support/dotnet/logs/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/opentelemetry/instrument/api_support/dotnet/metrics.md` | https://docs.datadoghq.com/opentelemetry/instrument/api_support/dotnet/metrics/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/opentelemetry/instrument/api_support/nodejs/logs.md` | https://docs.datadoghq.com/opentelemetry/instrument/api_support/nodejs/logs/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/opentelemetry/instrument/api_support/nodejs/metrics.md` | https://docs.datadoghq.com/opentelemetry/instrument/api_support/nodejs/metrics/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/opentelemetry/instrument/api_support/python/logs.md` | https://docs.datadoghq.com/opentelemetry/instrument/api_support/python/logs/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/opentelemetry/instrument/api_support/python/metrics.md` | https://docs.datadoghq.com/opentelemetry/instrument/api_support/python/metrics/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/opentelemetry/instrument/api_support/ruby/metrics.md` | https://docs.datadoghq.com/opentelemetry/instrument/api_support/ruby/metrics/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/opentelemetry/instrument/instrumentation_libraries.md` | https://docs.datadoghq.com/opentelemetry/instrument/instrumentation_libraries/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/opentelemetry/instrument/otel_sdks.md` | https://docs.datadoghq.com/opentelemetry/instrument/otel_sdks/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/opentelemetry/integrations/_index.md` | https://docs.datadoghq.com/opentelemetry/integrations/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/opentelemetry/integrations/apache_metrics.md` | https://docs.datadoghq.com/opentelemetry/integrations/apache_metrics/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/opentelemetry/integrations/datadog_extension.md` | https://docs.datadoghq.com/opentelemetry/integrations/datadog_extension/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/opentelemetry/integrations/haproxy_metrics.md` | https://docs.datadoghq.com/opentelemetry/integrations/haproxy_metrics/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/opentelemetry/integrations/iis_metrics.md` | https://docs.datadoghq.com/opentelemetry/integrations/iis_metrics/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/opentelemetry/integrations/kubernetes_metrics.md` | https://docs.datadoghq.com/opentelemetry/integrations/kubernetes_metrics/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/opentelemetry/integrations/mysql_metrics.md` | https://docs.datadoghq.com/opentelemetry/integrations/mysql_metrics/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/opentelemetry/integrations/nginx_metrics.md` | https://docs.datadoghq.com/opentelemetry/integrations/nginx_metrics/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/opentelemetry/integrations/podman_metrics.md` | https://docs.datadoghq.com/opentelemetry/integrations/podman_metrics/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/opentelemetry/integrations/runtime_metrics/_index.md` | https://docs.datadoghq.com/opentelemetry/integrations/runtime_metrics/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/opentelemetry/integrations/spark_metrics.md` | https://docs.datadoghq.com/opentelemetry/integrations/spark_metrics/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/opentelemetry/integrations/trace_metrics.md` | https://docs.datadoghq.com/opentelemetry/integrations/trace_metrics/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/opentelemetry/mapping/_index.md` | https://docs.datadoghq.com/opentelemetry/mapping/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/opentelemetry/mapping/host_metadata.md` | https://docs.datadoghq.com/opentelemetry/mapping/host_metadata/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/opentelemetry/mapping/hostname.md` | https://docs.datadoghq.com/opentelemetry/mapping/hostname/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/opentelemetry/mapping/metrics_mapping.md` | https://docs.datadoghq.com/opentelemetry/mapping/metrics_mapping/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/opentelemetry/mapping/semantic_mapping.md` | https://docs.datadoghq.com/opentelemetry/mapping/semantic_mapping/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/opentelemetry/mapping/service_entry_spans.md` | https://docs.datadoghq.com/opentelemetry/mapping/service_entry_spans/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/opentelemetry/migrate/collector_0_120_0.md` | https://docs.datadoghq.com/opentelemetry/migrate/collector_0_120_0/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/opentelemetry/migrate/ddot_collector.md` | https://docs.datadoghq.com/opentelemetry/migrate/ddot_collector/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/opentelemetry/migrate/migrate_operation_names.md` | https://docs.datadoghq.com/opentelemetry/migrate/migrate_operation_names/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/opentelemetry/reference/_index.md` | https://docs.datadoghq.com/opentelemetry/reference/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/opentelemetry/reference/concepts.md` | https://docs.datadoghq.com/opentelemetry/reference/concepts/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/opentelemetry/reference/otel_metrics.md` | https://docs.datadoghq.com/opentelemetry/reference/otel_metrics/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/opentelemetry/reference/trace_ids.md` | https://docs.datadoghq.com/opentelemetry/reference/trace_ids/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/opentelemetry/setup/_index.md` | https://docs.datadoghq.com/opentelemetry/setup/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/opentelemetry/setup/agent.md` | https://docs.datadoghq.com/opentelemetry/setup/agent/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/opentelemetry/setup/collector_exporter/_index.md` | https://docs.datadoghq.com/opentelemetry/setup/collector_exporter/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/opentelemetry/setup/collector_exporter/deploy.md` | https://docs.datadoghq.com/opentelemetry/setup/collector_exporter/deploy/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/opentelemetry/setup/collector_exporter/install.md` | https://docs.datadoghq.com/opentelemetry/setup/collector_exporter/install/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/opentelemetry/setup/ddot_collector/_index.md` | https://docs.datadoghq.com/opentelemetry/setup/ddot_collector/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/opentelemetry/setup/ddot_collector/custom_components.md` | https://docs.datadoghq.com/opentelemetry/setup/ddot_collector/custom_components/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/opentelemetry/setup/ddot_collector/install/kubernetes_daemonset.md` | https://docs.datadoghq.com/opentelemetry/setup/ddot_collector/install/kubernetes_daemonset/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/opentelemetry/setup/ddot_collector/install/kubernetes_gateway.md` | https://docs.datadoghq.com/opentelemetry/setup/ddot_collector/install/kubernetes_gateway/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/opentelemetry/setup/ddot_collector/install/linux.md` | https://docs.datadoghq.com/opentelemetry/setup/ddot_collector/install/linux/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/opentelemetry/setup/otlp_ingest/_index.md` | https://docs.datadoghq.com/opentelemetry/setup/otlp_ingest/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/opentelemetry/setup/otlp_ingest/logs.md` | https://docs.datadoghq.com/opentelemetry/setup/otlp_ingest/logs/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/opentelemetry/setup/otlp_ingest/metrics.md` | https://docs.datadoghq.com/opentelemetry/setup/otlp_ingest/metrics/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/opentelemetry/setup/otlp_ingest/traces.md` | https://docs.datadoghq.com/opentelemetry/setup/otlp_ingest/traces/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/opentelemetry/setup/otlp_ingest_in_the_agent.md` | https://docs.datadoghq.com/opentelemetry/setup/otlp_ingest_in_the_agent/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/opentelemetry/troubleshooting.md` | https://docs.datadoghq.com/opentelemetry/troubleshooting/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/partners/cloud_cost_management/aws.md` | https://docs.datadoghq.com/partners/cloud_cost_management/aws/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/pr_gates/_index.md` | https://docs.datadoghq.com/pr_gates/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/pr_gates/setup/_index.md` | https://docs.datadoghq.com/pr_gates/setup/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/product_analytics/_index.md` | https://docs.datadoghq.com/product_analytics/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/product_analytics/charts/_index.md` | https://docs.datadoghq.com/product_analytics/charts/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/product_analytics/charts/analytics_explorer/_index.md` | https://docs.datadoghq.com/product_analytics/charts/analytics_explorer/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/product_analytics/charts/analytics_explorer/events.md` | https://docs.datadoghq.com/product_analytics/charts/analytics_explorer/events/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/product_analytics/charts/analytics_explorer/export.md` | https://docs.datadoghq.com/product_analytics/charts/analytics_explorer/export/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/product_analytics/charts/analytics_explorer/group.md` | https://docs.datadoghq.com/product_analytics/charts/analytics_explorer/group/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/product_analytics/charts/analytics_explorer/visualize.md` | https://docs.datadoghq.com/product_analytics/charts/analytics_explorer/visualize/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/product_analytics/charts/chart_basics.md` | https://docs.datadoghq.com/product_analytics/charts/chart_basics/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/product_analytics/charts/funnel_analysis.md` | https://docs.datadoghq.com/product_analytics/charts/funnel_analysis/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/product_analytics/charts/pathways.md` | https://docs.datadoghq.com/product_analytics/charts/pathways/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/product_analytics/charts/retention_analysis.md` | https://docs.datadoghq.com/product_analytics/charts/retention_analysis/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/product_analytics/dashboards.md` | https://docs.datadoghq.com/product_analytics/dashboards/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/product_analytics/experimentation/_index.md` | https://docs.datadoghq.com/product_analytics/experimentation/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/product_analytics/experimentation/defining_metrics.md` | https://docs.datadoghq.com/product_analytics/experimentation/defining_metrics/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/product_analytics/experimentation/minimum_detectable_effect.md` | https://docs.datadoghq.com/product_analytics/experimentation/minimum_detectable_effect/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/product_analytics/experimentation/reading_results.md` | https://docs.datadoghq.com/product_analytics/experimentation/reading_results/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/product_analytics/guide/monitor-utm-campaigns-in-product-analytics.md` | https://docs.datadoghq.com/product_analytics/guide/monitor-utm-campaigns-in-product-analytics/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/product_analytics/guide/rum_and_product_analytics.md` | https://docs.datadoghq.com/product_analytics/guide/rum_and_product_analytics/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/product_analytics/profiles.md` | https://docs.datadoghq.com/product_analytics/profiles/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/product_analytics/segmentation/_index.md` | https://docs.datadoghq.com/product_analytics/segmentation/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/product_analytics/troubleshooting.md` | https://docs.datadoghq.com/product_analytics/troubleshooting/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/profiler/_index.md` | https://docs.datadoghq.com/profiler/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/profiler/automated_analysis.md` | https://docs.datadoghq.com/profiler/automated_analysis/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/profiler/compare_profiles.md` | https://docs.datadoghq.com/profiler/compare_profiles/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/profiler/connect_traces_and_profiles.md` | https://docs.datadoghq.com/profiler/connect_traces_and_profiles/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/profiler/enabling/_index.md` | https://docs.datadoghq.com/profiler/enabling/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/profiler/enabling/ddprof.md` | https://docs.datadoghq.com/profiler/enabling/ddprof/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/profiler/enabling/dotnet.md` | https://docs.datadoghq.com/profiler/enabling/dotnet/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/profiler/enabling/full_host.md` | https://docs.datadoghq.com/profiler/enabling/full_host/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/profiler/enabling/go.md` | https://docs.datadoghq.com/profiler/enabling/go/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/profiler/enabling/java.md` | https://docs.datadoghq.com/profiler/enabling/java/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/profiler/enabling/nodejs.md` | https://docs.datadoghq.com/profiler/enabling/nodejs/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/profiler/enabling/php.md` | https://docs.datadoghq.com/profiler/enabling/php/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/profiler/enabling/python.md` | https://docs.datadoghq.com/profiler/enabling/python/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/profiler/enabling/ruby.md` | https://docs.datadoghq.com/profiler/enabling/ruby/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/profiler/enabling/supported_versions.md` | https://docs.datadoghq.com/profiler/enabling/supported_versions/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/profiler/guide/_index.md` | https://docs.datadoghq.com/profiler/guide/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/profiler/guide/isolate-outliers-in-monolithic-services.md` | https://docs.datadoghq.com/profiler/guide/isolate-outliers-in-monolithic-services/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/profiler/guide/save-cpu-in-production-with-go-pgo.md` | https://docs.datadoghq.com/profiler/guide/save-cpu-in-production-with-go-pgo/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/profiler/guide/solve-memory-leaks.md` | https://docs.datadoghq.com/profiler/guide/solve-memory-leaks/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/profiler/profile_types.md` | https://docs.datadoghq.com/profiler/profile_types/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/profiler/profile_visualizations.md` | https://docs.datadoghq.com/profiler/profile_visualizations/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/profiler/profiler_troubleshooting/ddprof.md` | https://docs.datadoghq.com/profiler/profiler_troubleshooting/ddprof/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/profiler/profiler_troubleshooting/dotnet.md` | https://docs.datadoghq.com/profiler/profiler_troubleshooting/dotnet/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/profiler/profiler_troubleshooting/go.md` | https://docs.datadoghq.com/profiler/profiler_troubleshooting/go/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/profiler/profiler_troubleshooting/java.md` | https://docs.datadoghq.com/profiler/profiler_troubleshooting/java/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/profiler/profiler_troubleshooting/nodejs.md` | https://docs.datadoghq.com/profiler/profiler_troubleshooting/nodejs/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/profiler/profiler_troubleshooting/php.md` | https://docs.datadoghq.com/profiler/profiler_troubleshooting/php/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/profiler/profiler_troubleshooting/python.md` | https://docs.datadoghq.com/profiler/profiler_troubleshooting/python/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/profiler/profiler_troubleshooting/ruby.md` | https://docs.datadoghq.com/profiler/profiler_troubleshooting/ruby/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/_index.md` | https://docs.datadoghq.com/real_user_monitoring/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/application_monitoring/android/advanced_configuration.md` | https://docs.datadoghq.com/real_user_monitoring/application_monitoring/android/advanced_configuration/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/application_monitoring/android/application_launch_monitoring.md` | https://docs.datadoghq.com/real_user_monitoring/application_monitoring/android/application_launch_monitoring/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/application_monitoring/android/data_collected.md` | https://docs.datadoghq.com/real_user_monitoring/application_monitoring/android/data_collected/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/application_monitoring/android/error_tracking.md` | https://docs.datadoghq.com/real_user_monitoring/application_monitoring/android/error_tracking/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/application_monitoring/android/integrated_libraries.md` | https://docs.datadoghq.com/real_user_monitoring/application_monitoring/android/integrated_libraries/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/application_monitoring/android/jetpack_compose_instrumentation.md` | https://docs.datadoghq.com/real_user_monitoring/application_monitoring/android/jetpack_compose_instrumentation/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/application_monitoring/android/monitoring_app_performance.md` | https://docs.datadoghq.com/real_user_monitoring/application_monitoring/android/monitoring_app_performance/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/application_monitoring/android/sdk_performance_impact.md` | https://docs.datadoghq.com/real_user_monitoring/application_monitoring/android/sdk_performance_impact/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/application_monitoring/android/setup.md` | https://docs.datadoghq.com/real_user_monitoring/application_monitoring/android/setup/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/application_monitoring/android/troubleshooting.md` | https://docs.datadoghq.com/real_user_monitoring/application_monitoring/android/troubleshooting/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/application_monitoring/browser/advanced_configuration.md` | https://docs.datadoghq.com/real_user_monitoring/application_monitoring/browser/advanced_configuration/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/application_monitoring/browser/collecting_browser_errors.md` | https://docs.datadoghq.com/real_user_monitoring/application_monitoring/browser/collecting_browser_errors/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/application_monitoring/browser/data_collected.md` | https://docs.datadoghq.com/real_user_monitoring/application_monitoring/browser/data_collected/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/application_monitoring/browser/frustration_signals.md` | https://docs.datadoghq.com/real_user_monitoring/application_monitoring/browser/frustration_signals/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/application_monitoring/browser/monitoring_page_performance.md` | https://docs.datadoghq.com/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/application_monitoring/browser/monitoring_resource_performance.md` | https://docs.datadoghq.com/real_user_monitoring/application_monitoring/browser/monitoring_resource_performance/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/application_monitoring/browser/optimizing_performance/_index.md` | https://docs.datadoghq.com/real_user_monitoring/application_monitoring/browser/optimizing_performance/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/application_monitoring/browser/setup/_index.md` | https://docs.datadoghq.com/real_user_monitoring/application_monitoring/browser/setup/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/application_monitoring/browser/setup/client.md` | https://docs.datadoghq.com/real_user_monitoring/application_monitoring/browser/setup/client/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/application_monitoring/browser/setup/server/_index.md` | https://docs.datadoghq.com/real_user_monitoring/application_monitoring/browser/setup/server/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/application_monitoring/browser/setup/server/apache.md` | https://docs.datadoghq.com/real_user_monitoring/application_monitoring/browser/setup/server/apache/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/application_monitoring/browser/setup/server/ibm.md` | https://docs.datadoghq.com/real_user_monitoring/application_monitoring/browser/setup/server/ibm/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/application_monitoring/browser/setup/server/java.md` | https://docs.datadoghq.com/real_user_monitoring/application_monitoring/browser/setup/server/java/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/application_monitoring/browser/setup/server/nginx.md` | https://docs.datadoghq.com/real_user_monitoring/application_monitoring/browser/setup/server/nginx/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/application_monitoring/browser/setup/server/windows_iis.md` | https://docs.datadoghq.com/real_user_monitoring/application_monitoring/browser/setup/server/windows_iis/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/application_monitoring/browser/tracking_user_actions.md` | https://docs.datadoghq.com/real_user_monitoring/application_monitoring/browser/tracking_user_actions/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/application_monitoring/browser/troubleshooting.md` | https://docs.datadoghq.com/real_user_monitoring/application_monitoring/browser/troubleshooting/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/application_monitoring/flutter/advanced_configuration.md` | https://docs.datadoghq.com/real_user_monitoring/application_monitoring/flutter/advanced_configuration/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/application_monitoring/flutter/data_collected.md` | https://docs.datadoghq.com/real_user_monitoring/application_monitoring/flutter/data_collected/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/application_monitoring/flutter/error_tracking.md` | https://docs.datadoghq.com/real_user_monitoring/application_monitoring/flutter/error_tracking/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/application_monitoring/flutter/integrated_libraries.md` | https://docs.datadoghq.com/real_user_monitoring/application_monitoring/flutter/integrated_libraries/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/application_monitoring/flutter/setup.md` | https://docs.datadoghq.com/real_user_monitoring/application_monitoring/flutter/setup/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/application_monitoring/flutter/troubleshooting.md` | https://docs.datadoghq.com/real_user_monitoring/application_monitoring/flutter/troubleshooting/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/application_monitoring/ios/advanced_configuration.md` | https://docs.datadoghq.com/real_user_monitoring/application_monitoring/ios/advanced_configuration/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/application_monitoring/ios/application_launch_monitoring.md` | https://docs.datadoghq.com/real_user_monitoring/application_monitoring/ios/application_launch_monitoring/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/application_monitoring/ios/data_collected.md` | https://docs.datadoghq.com/real_user_monitoring/application_monitoring/ios/data_collected/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/application_monitoring/ios/monitoring_app_performance.md` | https://docs.datadoghq.com/real_user_monitoring/application_monitoring/ios/monitoring_app_performance/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/application_monitoring/ios/sdk_performance_impact.md` | https://docs.datadoghq.com/real_user_monitoring/application_monitoring/ios/sdk_performance_impact/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/application_monitoring/ios/setup.md` | https://docs.datadoghq.com/real_user_monitoring/application_monitoring/ios/setup/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/application_monitoring/ios/supported_versions.md` | https://docs.datadoghq.com/real_user_monitoring/application_monitoring/ios/supported_versions/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/application_monitoring/ios/troubleshooting.md` | https://docs.datadoghq.com/real_user_monitoring/application_monitoring/ios/troubleshooting/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/application_monitoring/kotlin_multiplatform/_index.md` | https://docs.datadoghq.com/real_user_monitoring/application_monitoring/kotlin_multiplatform/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/application_monitoring/kotlin_multiplatform/advanced_configuration.md` | https://docs.datadoghq.com/real_user_monitoring/application_monitoring/kotlin_multiplatform/advanced_configuration/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/application_monitoring/kotlin_multiplatform/data_collected.md` | https://docs.datadoghq.com/real_user_monitoring/application_monitoring/kotlin_multiplatform/data_collected/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/application_monitoring/kotlin_multiplatform/integrated_libraries.md` | https://docs.datadoghq.com/real_user_monitoring/application_monitoring/kotlin_multiplatform/integrated_libraries/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/application_monitoring/kotlin_multiplatform/setup.md` | https://docs.datadoghq.com/real_user_monitoring/application_monitoring/kotlin_multiplatform/setup/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/application_monitoring/kotlin_multiplatform/troubleshooting.md` | https://docs.datadoghq.com/real_user_monitoring/application_monitoring/kotlin_multiplatform/troubleshooting/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/application_monitoring/mobile_vitals/_index.md` | https://docs.datadoghq.com/real_user_monitoring/application_monitoring/mobile_vitals/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/application_monitoring/react_native/advanced_configuration.md` | https://docs.datadoghq.com/real_user_monitoring/application_monitoring/react_native/advanced_configuration/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/application_monitoring/react_native/data_collected.md` | https://docs.datadoghq.com/real_user_monitoring/application_monitoring/react_native/data_collected/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/application_monitoring/react_native/error_tracking.md` | https://docs.datadoghq.com/real_user_monitoring/application_monitoring/react_native/error_tracking/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/application_monitoring/react_native/integrated_libraries.md` | https://docs.datadoghq.com/real_user_monitoring/application_monitoring/react_native/integrated_libraries/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/application_monitoring/react_native/setup/codepush.md` | https://docs.datadoghq.com/real_user_monitoring/application_monitoring/react_native/setup/codepush/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/application_monitoring/react_native/setup/expo.md` | https://docs.datadoghq.com/real_user_monitoring/application_monitoring/react_native/setup/expo/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/application_monitoring/react_native/setup/reactnative.md` | https://docs.datadoghq.com/real_user_monitoring/application_monitoring/react_native/setup/reactnative/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/application_monitoring/react_native/troubleshooting.md` | https://docs.datadoghq.com/real_user_monitoring/application_monitoring/react_native/troubleshooting/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/application_monitoring/roku/advanced_configuration.md` | https://docs.datadoghq.com/real_user_monitoring/application_monitoring/roku/advanced_configuration/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/application_monitoring/roku/data_collected.md` | https://docs.datadoghq.com/real_user_monitoring/application_monitoring/roku/data_collected/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/application_monitoring/roku/error_tracking.md` | https://docs.datadoghq.com/real_user_monitoring/application_monitoring/roku/error_tracking/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/application_monitoring/roku/setup.md` | https://docs.datadoghq.com/real_user_monitoring/application_monitoring/roku/setup/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/application_monitoring/unity/advanced_configuration.md` | https://docs.datadoghq.com/real_user_monitoring/application_monitoring/unity/advanced_configuration/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/application_monitoring/unity/data_collected.md` | https://docs.datadoghq.com/real_user_monitoring/application_monitoring/unity/data_collected/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/application_monitoring/unity/error_tracking.md` | https://docs.datadoghq.com/real_user_monitoring/application_monitoring/unity/error_tracking/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/application_monitoring/unity/setup.md` | https://docs.datadoghq.com/real_user_monitoring/application_monitoring/unity/setup/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/application_monitoring/unity/troubleshooting.md` | https://docs.datadoghq.com/real_user_monitoring/application_monitoring/unity/troubleshooting/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/application_monitoring/web_view_tracking/_index.md` | https://docs.datadoghq.com/real_user_monitoring/application_monitoring/web_view_tracking/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/correlate_with_other_telemetry/_index.md` | https://docs.datadoghq.com/real_user_monitoring/correlate_with_other_telemetry/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/correlate_with_other_telemetry/apm/_index.md` | https://docs.datadoghq.com/real_user_monitoring/correlate_with_other_telemetry/apm/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/correlate_with_other_telemetry/llm_observability/_index.md` | https://docs.datadoghq.com/real_user_monitoring/correlate_with_other_telemetry/llm_observability/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/correlate_with_other_telemetry/logs/_index.md` | https://docs.datadoghq.com/real_user_monitoring/correlate_with_other_telemetry/logs/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/correlate_with_other_telemetry/profiling/_index.md` | https://docs.datadoghq.com/real_user_monitoring/correlate_with_other_telemetry/profiling/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/error_tracking/_index.md` | https://docs.datadoghq.com/real_user_monitoring/error_tracking/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/error_tracking/mobile/expo.md` | https://docs.datadoghq.com/real_user_monitoring/error_tracking/mobile/expo/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/error_tracking/mobile/flutter.md` | https://docs.datadoghq.com/real_user_monitoring/error_tracking/mobile/flutter/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/error_tracking/mobile/ios.md` | https://docs.datadoghq.com/real_user_monitoring/error_tracking/mobile/ios/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/error_tracking/mobile/kotlin-multiplatform.md` | https://docs.datadoghq.com/real_user_monitoring/error_tracking/mobile/kotlin-multiplatform/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/error_tracking/mobile/reactnative.md` | https://docs.datadoghq.com/real_user_monitoring/error_tracking/mobile/reactnative/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/error_tracking/mobile/roku.md` | https://docs.datadoghq.com/real_user_monitoring/error_tracking/mobile/roku/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/explorer/_index.md` | https://docs.datadoghq.com/real_user_monitoring/explorer/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/explorer/events.md` | https://docs.datadoghq.com/real_user_monitoring/explorer/events/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/explorer/export.md` | https://docs.datadoghq.com/real_user_monitoring/explorer/export/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/explorer/group.md` | https://docs.datadoghq.com/real_user_monitoring/explorer/group/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/explorer/saved_views.md` | https://docs.datadoghq.com/real_user_monitoring/explorer/saved_views/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/explorer/search.md` | https://docs.datadoghq.com/real_user_monitoring/explorer/search/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/explorer/search_syntax.md` | https://docs.datadoghq.com/real_user_monitoring/explorer/search_syntax/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/explorer/visualize.md` | https://docs.datadoghq.com/real_user_monitoring/explorer/visualize/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/explorer/watchdog_insights.md` | https://docs.datadoghq.com/real_user_monitoring/explorer/watchdog_insights/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/feature_flag_tracking/_index.md` | https://docs.datadoghq.com/real_user_monitoring/feature_flag_tracking/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/feature_flag_tracking/setup.md` | https://docs.datadoghq.com/real_user_monitoring/feature_flag_tracking/setup/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/feature_flag_tracking/using_feature_flags.md` | https://docs.datadoghq.com/real_user_monitoring/feature_flag_tracking/using_feature_flags/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/guide/alerting-with-conversion-rates.md` | https://docs.datadoghq.com/real_user_monitoring/guide/alerting-with-conversion-rates/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/guide/alerting-with-rum.md` | https://docs.datadoghq.com/real_user_monitoring/guide/alerting-with-rum/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/guide/best-practices-for-rum-sampling.md` | https://docs.datadoghq.com/real_user_monitoring/guide/best-practices-for-rum-sampling/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/guide/best-practices-tracing-native-ios-android-apps.md` | https://docs.datadoghq.com/real_user_monitoring/guide/best-practices-tracing-native-ios-android-apps/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/guide/browser-sdk-upgrade.md` | https://docs.datadoghq.com/real_user_monitoring/guide/browser-sdk-upgrade/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/guide/compute-apdex-with-rum-data.md` | https://docs.datadoghq.com/real_user_monitoring/guide/compute-apdex-with-rum-data/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/guide/connect-session-replay-to-your-third-party-tools.md` | https://docs.datadoghq.com/real_user_monitoring/guide/connect-session-replay-to-your-third-party-tools/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/guide/define-services-and-track-ui-components-in-your-browser-application.md` | https://docs.datadoghq.com/real_user_monitoring/guide/define-services-and-track-ui-components-in-your-browser-application/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/guide/devtools-tips.md` | https://docs.datadoghq.com/real_user_monitoring/guide/devtools-tips/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/guide/enable-rum-shopify-store.md` | https://docs.datadoghq.com/real_user_monitoring/guide/enable-rum-shopify-store/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/guide/enable-rum-squarespace-store.md` | https://docs.datadoghq.com/real_user_monitoring/guide/enable-rum-squarespace-store/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/guide/enable-rum-woocommerce-store.md` | https://docs.datadoghq.com/real_user_monitoring/guide/enable-rum-woocommerce-store/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/guide/enrich-and-control-rum-data.md` | https://docs.datadoghq.com/real_user_monitoring/guide/enrich-and-control-rum-data/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/guide/identify-bots-in-the-ui.md` | https://docs.datadoghq.com/real_user_monitoring/guide/identify-bots-in-the-ui/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/guide/initialize-your-native-sdk-before-react-native-starts.md` | https://docs.datadoghq.com/real_user_monitoring/guide/initialize-your-native-sdk-before-react-native-starts/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/guide/mobile-sdk-deprecation-policy.md` | https://docs.datadoghq.com/real_user_monitoring/guide/mobile-sdk-deprecation-policy/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/guide/mobile-sdk-multi-instance.md` | https://docs.datadoghq.com/real_user_monitoring/guide/mobile-sdk-multi-instance/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/guide/mobile-sdk-upgrade.md` | https://docs.datadoghq.com/real_user_monitoring/guide/mobile-sdk-upgrade/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/guide/monitor-capacitor-applications-using-browser-sdk.md` | https://docs.datadoghq.com/real_user_monitoring/guide/monitor-capacitor-applications-using-browser-sdk/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/guide/monitor-electron-applications-using-browser-sdk.md` | https://docs.datadoghq.com/real_user_monitoring/guide/monitor-electron-applications-using-browser-sdk/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/guide/monitor-hybrid-react-native-applications.md` | https://docs.datadoghq.com/real_user_monitoring/guide/monitor-hybrid-react-native-applications/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/guide/monitor-kiosk-sessions-using-rum.md` | https://docs.datadoghq.com/real_user_monitoring/guide/monitor-kiosk-sessions-using-rum/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/guide/monitor-your-nextjs-app-with-rum.md` | https://docs.datadoghq.com/real_user_monitoring/guide/monitor-your-nextjs-app-with-rum/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/guide/monitor-your-rum-usage.md` | https://docs.datadoghq.com/real_user_monitoring/guide/monitor-your-rum-usage/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/guide/remotely-configure-rum-using-launchdarkly.md` | https://docs.datadoghq.com/real_user_monitoring/guide/remotely-configure-rum-using-launchdarkly/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/guide/retention_filter_best_practices.md` | https://docs.datadoghq.com/real_user_monitoring/guide/retention_filter_best_practices/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/guide/sampling-browser-plans.md` | https://docs.datadoghq.com/real_user_monitoring/guide/sampling-browser-plans/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/guide/send-rum-custom-actions.md` | https://docs.datadoghq.com/real_user_monitoring/guide/send-rum-custom-actions/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/guide/session-replay-for-solutions.md` | https://docs.datadoghq.com/real_user_monitoring/guide/session-replay-for-solutions/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/guide/session-replay-service-worker.md` | https://docs.datadoghq.com/real_user_monitoring/guide/session-replay-service-worker/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/guide/setup-feature-flag-data-collection.md` | https://docs.datadoghq.com/real_user_monitoring/guide/setup-feature-flag-data-collection/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/guide/setup-rum-deployment-tracking.md` | https://docs.datadoghq.com/real_user_monitoring/guide/setup-rum-deployment-tracking/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/guide/shadow-dom.md` | https://docs.datadoghq.com/real_user_monitoring/guide/shadow-dom/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/guide/tracking-rum-usage-with-usage-attribution-tags.md` | https://docs.datadoghq.com/real_user_monitoring/guide/tracking-rum-usage-with-usage-attribution-tags/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/guide/understanding-the-rum-event-hierarchy.md` | https://docs.datadoghq.com/real_user_monitoring/guide/understanding-the-rum-event-hierarchy/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/guide/upload-javascript-source-maps.md` | https://docs.datadoghq.com/real_user_monitoring/guide/upload-javascript-source-maps/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/guide/using-session-replay-as-a-key-tool-in-post-mortems.md` | https://docs.datadoghq.com/real_user_monitoring/guide/using-session-replay-as-a-key-tool-in-post-mortems/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/operations_monitoring.md` | https://docs.datadoghq.com/real_user_monitoring/operations_monitoring/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/ownership_of_views.md` | https://docs.datadoghq.com/real_user_monitoring/ownership_of_views/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/platform/_index.md` | https://docs.datadoghq.com/real_user_monitoring/platform/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/platform/dashboards/_index.md` | https://docs.datadoghq.com/real_user_monitoring/platform/dashboards/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/platform/dashboards/errors.md` | https://docs.datadoghq.com/real_user_monitoring/platform/dashboards/errors/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/platform/dashboards/performance.md` | https://docs.datadoghq.com/real_user_monitoring/platform/dashboards/performance/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/platform/dashboards/testing_and_deployment.md` | https://docs.datadoghq.com/real_user_monitoring/platform/dashboards/testing_and_deployment/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/platform/dashboards/usage.md` | https://docs.datadoghq.com/real_user_monitoring/platform/dashboards/usage/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/platform/generate_metrics.md` | https://docs.datadoghq.com/real_user_monitoring/platform/generate_metrics/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/rum_without_limits/_index.md` | https://docs.datadoghq.com/real_user_monitoring/rum_without_limits/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/rum_without_limits/metrics.md` | https://docs.datadoghq.com/real_user_monitoring/rum_without_limits/metrics/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/real_user_monitoring/rum_without_limits/retention_filters.md` | https://docs.datadoghq.com/real_user_monitoring/rum_without_limits/retention_filters/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/reference_tables/_index.md` | https://docs.datadoghq.com/reference_tables/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/remote_configuration/_index.md` | https://docs.datadoghq.com/remote_configuration/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/_index.md` | https://docs.datadoghq.com/security/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/account_takeover_protection.md` | https://docs.datadoghq.com/security/account_takeover_protection/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/ai_guard/_index.md` | https://docs.datadoghq.com/security/ai_guard/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/ai_guard/onboarding.md` | https://docs.datadoghq.com/security/ai_guard/onboarding/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/application_security/_index.md` | https://docs.datadoghq.com/security/application_security/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/application_security/api-inventory/_index.md` | https://docs.datadoghq.com/security/application_security/api-inventory/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/application_security/exploit-prevention.md` | https://docs.datadoghq.com/security/application_security/exploit-prevention/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/application_security/how-it-works/threat-intelligence.md` | https://docs.datadoghq.com/security/application_security/how-it-works/threat-intelligence/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/application_security/policies/custom_rules.md` | https://docs.datadoghq.com/security/application_security/policies/custom_rules/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/application_security/policies/library_configuration.md` | https://docs.datadoghq.com/security/application_security/policies/library_configuration/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/application_security/security_signals/_index.md` | https://docs.datadoghq.com/security/application_security/security_signals/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/application_security/security_signals/attacker_clustering.md` | https://docs.datadoghq.com/security/application_security/security_signals/attacker_clustering/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/application_security/security_signals/attacker_fingerprint.md` | https://docs.datadoghq.com/security/application_security/security_signals/attacker_fingerprint/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/application_security/setup/aws/fargate/_index.md` | https://docs.datadoghq.com/security/application_security/setup/aws/fargate/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/application_security/setup/aws/lambda/_index.md` | https://docs.datadoghq.com/security/application_security/setup/aws/lambda/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/application_security/setup/aws/lambda/dotnet.md` | https://docs.datadoghq.com/security/application_security/setup/aws/lambda/dotnet/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/application_security/setup/aws/lambda/go.md` | https://docs.datadoghq.com/security/application_security/setup/aws/lambda/go/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/application_security/setup/aws/lambda/java.md` | https://docs.datadoghq.com/security/application_security/setup/aws/lambda/java/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/application_security/setup/aws/lambda/nodejs.md` | https://docs.datadoghq.com/security/application_security/setup/aws/lambda/nodejs/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/application_security/setup/aws/lambda/python.md` | https://docs.datadoghq.com/security/application_security/setup/aws/lambda/python/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/application_security/setup/aws/lambda/ruby.md` | https://docs.datadoghq.com/security/application_security/setup/aws/lambda/ruby/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/application_security/setup/azure/app-service/_index.md` | https://docs.datadoghq.com/security/application_security/setup/azure/app-service/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/application_security/setup/compatibility/_index.md` | https://docs.datadoghq.com/security/application_security/setup/compatibility/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/application_security/setup/docker/_index.md` | https://docs.datadoghq.com/security/application_security/setup/docker/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/application_security/setup/dotnet/aws-fargate.md` | https://docs.datadoghq.com/security/application_security/setup/dotnet/aws-fargate/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/application_security/setup/dotnet/docker.md` | https://docs.datadoghq.com/security/application_security/setup/dotnet/docker/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/application_security/setup/dotnet/dotnet.md` | https://docs.datadoghq.com/security/application_security/setup/dotnet/dotnet/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/application_security/setup/dotnet/kubernetes.md` | https://docs.datadoghq.com/security/application_security/setup/dotnet/kubernetes/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/application_security/setup/dotnet/linux.md` | https://docs.datadoghq.com/security/application_security/setup/dotnet/linux/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/application_security/setup/dotnet/windows.md` | https://docs.datadoghq.com/security/application_security/setup/dotnet/windows/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/application_security/setup/envoy.md` | https://docs.datadoghq.com/security/application_security/setup/envoy/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/application_security/setup/gcp/cloud-run/_index.md` | https://docs.datadoghq.com/security/application_security/setup/gcp/cloud-run/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/application_security/setup/gcp/cloud-run/dotnet.md` | https://docs.datadoghq.com/security/application_security/setup/gcp/cloud-run/dotnet/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/application_security/setup/gcp/cloud-run/go.md` | https://docs.datadoghq.com/security/application_security/setup/gcp/cloud-run/go/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/application_security/setup/gcp/cloud-run/java.md` | https://docs.datadoghq.com/security/application_security/setup/gcp/cloud-run/java/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/application_security/setup/gcp/cloud-run/nodejs.md` | https://docs.datadoghq.com/security/application_security/setup/gcp/cloud-run/nodejs/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/application_security/setup/gcp/cloud-run/php.md` | https://docs.datadoghq.com/security/application_security/setup/gcp/cloud-run/php/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/application_security/setup/gcp/cloud-run/python.md` | https://docs.datadoghq.com/security/application_security/setup/gcp/cloud-run/python/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/application_security/setup/gcp/cloud-run/ruby.md` | https://docs.datadoghq.com/security/application_security/setup/gcp/cloud-run/ruby/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/application_security/setup/gcp/service-extensions.md` | https://docs.datadoghq.com/security/application_security/setup/gcp/service-extensions/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/application_security/setup/go/dockerfile.md` | https://docs.datadoghq.com/security/application_security/setup/go/dockerfile/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/application_security/setup/go/sdk.md` | https://docs.datadoghq.com/security/application_security/setup/go/sdk/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/application_security/setup/go/setup.md` | https://docs.datadoghq.com/security/application_security/setup/go/setup/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/application_security/setup/haproxy.md` | https://docs.datadoghq.com/security/application_security/setup/haproxy/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/application_security/setup/java/aws-fargate.md` | https://docs.datadoghq.com/security/application_security/setup/java/aws-fargate/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/application_security/setup/java/docker.md` | https://docs.datadoghq.com/security/application_security/setup/java/docker/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/application_security/setup/java/kubernetes.md` | https://docs.datadoghq.com/security/application_security/setup/java/kubernetes/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/application_security/setup/java/linux.md` | https://docs.datadoghq.com/security/application_security/setup/java/linux/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/application_security/setup/java/macos.md` | https://docs.datadoghq.com/security/application_security/setup/java/macos/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/application_security/setup/java/windows.md` | https://docs.datadoghq.com/security/application_security/setup/java/windows/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/application_security/setup/kubernetes/_index.md` | https://docs.datadoghq.com/security/application_security/setup/kubernetes/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/application_security/setup/kubernetes/envoy-gateway.md` | https://docs.datadoghq.com/security/application_security/setup/kubernetes/envoy-gateway/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/application_security/setup/kubernetes/gateway-api.md` | https://docs.datadoghq.com/security/application_security/setup/kubernetes/gateway-api/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/application_security/setup/kubernetes/istio.md` | https://docs.datadoghq.com/security/application_security/setup/kubernetes/istio/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/application_security/setup/linux/_index.md` | https://docs.datadoghq.com/security/application_security/setup/linux/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/application_security/setup/macos/_index.md` | https://docs.datadoghq.com/security/application_security/setup/macos/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/application_security/setup/nginx/linux.md` | https://docs.datadoghq.com/security/application_security/setup/nginx/linux/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/application_security/setup/nodejs/aws-fargate.md` | https://docs.datadoghq.com/security/application_security/setup/nodejs/aws-fargate/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/application_security/setup/nodejs/docker.md` | https://docs.datadoghq.com/security/application_security/setup/nodejs/docker/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/application_security/setup/nodejs/kubernetes.md` | https://docs.datadoghq.com/security/application_security/setup/nodejs/kubernetes/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/application_security/setup/nodejs/linux.md` | https://docs.datadoghq.com/security/application_security/setup/nodejs/linux/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/application_security/setup/nodejs/macos.md` | https://docs.datadoghq.com/security/application_security/setup/nodejs/macos/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/application_security/setup/nodejs/windows.md` | https://docs.datadoghq.com/security/application_security/setup/nodejs/windows/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/application_security/setup/php/aws-fargate.md` | https://docs.datadoghq.com/security/application_security/setup/php/aws-fargate/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/application_security/setup/php/docker.md` | https://docs.datadoghq.com/security/application_security/setup/php/docker/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/application_security/setup/php/kubernetes.md` | https://docs.datadoghq.com/security/application_security/setup/php/kubernetes/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/application_security/setup/php/linux.md` | https://docs.datadoghq.com/security/application_security/setup/php/linux/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/application_security/setup/php/troubleshooting.md` | https://docs.datadoghq.com/security/application_security/setup/php/troubleshooting/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/application_security/setup/python/aws-fargate.md` | https://docs.datadoghq.com/security/application_security/setup/python/aws-fargate/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/application_security/setup/python/docker.md` | https://docs.datadoghq.com/security/application_security/setup/python/docker/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/application_security/setup/python/kubernetes.md` | https://docs.datadoghq.com/security/application_security/setup/python/kubernetes/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/application_security/setup/python/linux.md` | https://docs.datadoghq.com/security/application_security/setup/python/linux/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/application_security/setup/python/macos.md` | https://docs.datadoghq.com/security/application_security/setup/python/macos/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/application_security/setup/python/troubleshooting.md` | https://docs.datadoghq.com/security/application_security/setup/python/troubleshooting/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/application_security/setup/python/windows.md` | https://docs.datadoghq.com/security/application_security/setup/python/windows/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/application_security/setup/ruby/aws-fargate.md` | https://docs.datadoghq.com/security/application_security/setup/ruby/aws-fargate/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/application_security/setup/ruby/docker.md` | https://docs.datadoghq.com/security/application_security/setup/ruby/docker/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/application_security/setup/ruby/kubernetes.md` | https://docs.datadoghq.com/security/application_security/setup/ruby/kubernetes/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/application_security/setup/ruby/linux.md` | https://docs.datadoghq.com/security/application_security/setup/ruby/linux/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/application_security/setup/ruby/macos.md` | https://docs.datadoghq.com/security/application_security/setup/ruby/macos/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/application_security/setup/windows/_index.md` | https://docs.datadoghq.com/security/application_security/setup/windows/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/application_security/terms.md` | https://docs.datadoghq.com/security/application_security/terms/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/application_security/troubleshooting.md` | https://docs.datadoghq.com/security/application_security/troubleshooting/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/application_security/waf-integration.md` | https://docs.datadoghq.com/security/application_security/waf-integration/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/audit_trail.md` | https://docs.datadoghq.com/security/audit_trail/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/automation_pipelines/_index.md` | https://docs.datadoghq.com/security/automation_pipelines/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/automation_pipelines/mute.md` | https://docs.datadoghq.com/security/automation_pipelines/mute/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/automation_pipelines/security_inbox.md` | https://docs.datadoghq.com/security/automation_pipelines/security_inbox/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/automation_pipelines/set_due_date.md` | https://docs.datadoghq.com/security/automation_pipelines/set_due_date/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/cloud_security_management/_index.md` | https://docs.datadoghq.com/security/cloud_security_management/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/cloud_security_management/guide/custom-rules-guidelines.md` | https://docs.datadoghq.com/security/cloud_security_management/guide/custom-rules-guidelines/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/cloud_security_management/guide/identify-unauthorized-anomalous-procs.md` | https://docs.datadoghq.com/security/cloud_security_management/guide/identify-unauthorized-anomalous-procs/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/cloud_security_management/guide/public-accessibility-logic.md` | https://docs.datadoghq.com/security/cloud_security_management/guide/public-accessibility-logic/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/cloud_security_management/guide/resource_evaluation_filters.md` | https://docs.datadoghq.com/security/cloud_security_management/guide/resource_evaluation_filters/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/cloud_security_management/guide/writing_rego_rules.md` | https://docs.datadoghq.com/security/cloud_security_management/guide/writing_rego_rules/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/cloud_security_management/identity_risks/_index.md` | https://docs.datadoghq.com/security/cloud_security_management/identity_risks/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/cloud_security_management/misconfigurations/compliance_rules.md` | https://docs.datadoghq.com/security/cloud_security_management/misconfigurations/compliance_rules/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/cloud_security_management/misconfigurations/custom_rules.md` | https://docs.datadoghq.com/security/cloud_security_management/misconfigurations/custom_rules/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/cloud_security_management/misconfigurations/findings/_index.md` | https://docs.datadoghq.com/security/cloud_security_management/misconfigurations/findings/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/cloud_security_management/misconfigurations/findings/export_misconfigurations.md` | https://docs.datadoghq.com/security/cloud_security_management/misconfigurations/findings/export_misconfigurations/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/cloud_security_management/misconfigurations/frameworks_and_benchmarks/_index.md` | https://docs.datadoghq.com/security/cloud_security_management/misconfigurations/frameworks_and_benchmarks/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/cloud_security_management/misconfigurations/frameworks_and_benchmarks/custom_frameworks.md` | https://docs.datadoghq.com/security/cloud_security_management/misconfigurations/frameworks_and_benchmarks/custom_frameworks/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/cloud_security_management/misconfigurations/frameworks_and_benchmarks/supported_frameworks.md` | https://docs.datadoghq.com/security/cloud_security_management/misconfigurations/frameworks_and_benchmarks/supported_frameworks/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/cloud_security_management/misconfigurations/kspm.md` | https://docs.datadoghq.com/security/cloud_security_management/misconfigurations/kspm/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/cloud_security_management/review_remediate/jira.md` | https://docs.datadoghq.com/security/cloud_security_management/review_remediate/jira/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/cloud_security_management/review_remediate/mute_issues.md` | https://docs.datadoghq.com/security/cloud_security_management/review_remediate/mute_issues/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/cloud_security_management/review_remediate/workflows.md` | https://docs.datadoghq.com/security/cloud_security_management/review_remediate/workflows/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/cloud_security_management/security_graph.md` | https://docs.datadoghq.com/security/cloud_security_management/security_graph/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/cloud_security_management/setup/_index.md` | https://docs.datadoghq.com/security/cloud_security_management/setup/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/cloud_security_management/setup/agentless_scanning/_index.md` | https://docs.datadoghq.com/security/cloud_security_management/setup/agentless_scanning/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/cloud_security_management/setup/agentless_scanning/deployment_methods.md` | https://docs.datadoghq.com/security/cloud_security_management/setup/agentless_scanning/deployment_methods/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/cloud_security_management/setup/agentless_scanning/enable.md` | https://docs.datadoghq.com/security/cloud_security_management/setup/agentless_scanning/enable/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/cloud_security_management/setup/iac_remediation.md` | https://docs.datadoghq.com/security/cloud_security_management/setup/iac_remediation/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/cloud_security_management/severity_scoring.md` | https://docs.datadoghq.com/security/cloud_security_management/severity_scoring/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/cloud_security_management/troubleshooting/threats.md` | https://docs.datadoghq.com/security/cloud_security_management/troubleshooting/threats/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/cloud_security_management/troubleshooting/vulnerabilities.md` | https://docs.datadoghq.com/security/cloud_security_management/troubleshooting/vulnerabilities/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/cloud_security_management/vulnerabilities/_index.md` | https://docs.datadoghq.com/security/cloud_security_management/vulnerabilities/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/cloud_siem/_index.md` | https://docs.datadoghq.com/security/cloud_siem/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/cloud_siem/detect_and_monitor/_index.md` | https://docs.datadoghq.com/security/cloud_siem/detect_and_monitor/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/cloud_siem/detect_and_monitor/custom_detection_rules/_index.md` | https://docs.datadoghq.com/security/cloud_siem/detect_and_monitor/custom_detection_rules/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/cloud_siem/detect_and_monitor/custom_detection_rules/sequence.md` | https://docs.datadoghq.com/security/cloud_siem/detect_and_monitor/custom_detection_rules/sequence/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/cloud_siem/detect_and_monitor/historical_jobs.md` | https://docs.datadoghq.com/security/cloud_siem/detect_and_monitor/historical_jobs/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/cloud_siem/detect_and_monitor/mitre_attack_map.md` | https://docs.datadoghq.com/security/cloud_siem/detect_and_monitor/mitre_attack_map/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/cloud_siem/detect_and_monitor/version_history.md` | https://docs.datadoghq.com/security/cloud_siem/detect_and_monitor/version_history/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/cloud_siem/guide/automate-the-remediation-of-detected-threats.md` | https://docs.datadoghq.com/security/cloud_siem/guide/automate-the-remediation-of-detected-threats/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/cloud_siem/guide/aws-config-guide-for-cloud-siem.md` | https://docs.datadoghq.com/security/cloud_siem/guide/aws-config-guide-for-cloud-siem/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/cloud_siem/guide/azure-config-guide-for-cloud-siem.md` | https://docs.datadoghq.com/security/cloud_siem/guide/azure-config-guide-for-cloud-siem/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/cloud_siem/guide/google-cloud-config-guide-for-cloud-siem.md` | https://docs.datadoghq.com/security/cloud_siem/guide/google-cloud-config-guide-for-cloud-siem/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/cloud_siem/guide/monitor-authentication-logs-for-security-threats.md` | https://docs.datadoghq.com/security/cloud_siem/guide/monitor-authentication-logs-for-security-threats/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/cloud_siem/guide/oci-config-guide-for-cloud-siem.md` | https://docs.datadoghq.com/security/cloud_siem/guide/oci-config-guide-for-cloud-siem/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/cloud_siem/ingest_and_enrich/_index.md` | https://docs.datadoghq.com/security/cloud_siem/ingest_and_enrich/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/cloud_siem/ingest_and_enrich/content_packs.md` | https://docs.datadoghq.com/security/cloud_siem/ingest_and_enrich/content_packs/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/cloud_siem/ingest_and_enrich/open_cybersecurity_schema_framework/_index.md` | https://docs.datadoghq.com/security/cloud_siem/ingest_and_enrich/open_cybersecurity_schema_framework/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/cloud_siem/ingest_and_enrich/open_cybersecurity_schema_framework/ocsf_processor.md` | https://docs.datadoghq.com/security/cloud_siem/ingest_and_enrich/open_cybersecurity_schema_framework/ocsf_processor/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/cloud_siem/ingest_and_enrich/threat_intelligence.md` | https://docs.datadoghq.com/security/cloud_siem/ingest_and_enrich/threat_intelligence/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/cloud_siem/respond_and_report/_index.md` | https://docs.datadoghq.com/security/cloud_siem/respond_and_report/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/cloud_siem/respond_and_report/security_operational_metrics.md` | https://docs.datadoghq.com/security/cloud_siem/respond_and_report/security_operational_metrics/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/cloud_siem/triage_and_investigate/_index.md` | https://docs.datadoghq.com/security/cloud_siem/triage_and_investigate/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/cloud_siem/triage_and_investigate/entities_and_risk_scoring.md` | https://docs.datadoghq.com/security/cloud_siem/triage_and_investigate/entities_and_risk_scoring/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/cloud_siem/triage_and_investigate/investigate_security_signals.md` | https://docs.datadoghq.com/security/cloud_siem/triage_and_investigate/investigate_security_signals/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/cloud_siem/triage_and_investigate/investigator.md` | https://docs.datadoghq.com/security/cloud_siem/triage_and_investigate/investigator/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/cloud_siem/triage_and_investigate/ioc_explorer.md` | https://docs.datadoghq.com/security/cloud_siem/triage_and_investigate/ioc_explorer/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/code_security/_index.md` | https://docs.datadoghq.com/security/code_security/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/code_security/iac_security/_index.md` | https://docs.datadoghq.com/security/code_security/iac_security/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/code_security/iac_security/exclusions.md` | https://docs.datadoghq.com/security/code_security/iac_security/exclusions/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/code_security/iac_security/setup.md` | https://docs.datadoghq.com/security/code_security/iac_security/setup/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/code_security/iast/_index.md` | https://docs.datadoghq.com/security/code_security/iast/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/code_security/iast/setup/dotnet.md` | https://docs.datadoghq.com/security/code_security/iast/setup/dotnet/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/code_security/iast/setup/java.md` | https://docs.datadoghq.com/security/code_security/iast/setup/java/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/code_security/iast/setup/nodejs.md` | https://docs.datadoghq.com/security/code_security/iast/setup/nodejs/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/code_security/iast/setup/python.md` | https://docs.datadoghq.com/security/code_security/iast/setup/python/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/code_security/secret_scanning/_index.md` | https://docs.datadoghq.com/security/code_security/secret_scanning/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/code_security/software_composition_analysis/_index.md` | https://docs.datadoghq.com/security/code_security/software_composition_analysis/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/code_security/software_composition_analysis/setup_runtime/compatibility/_index.md` | https://docs.datadoghq.com/security/code_security/software_composition_analysis/setup_runtime/compatibility/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/code_security/static_analysis/_index.md` | https://docs.datadoghq.com/security/code_security/static_analysis/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/code_security/static_analysis/ai_enhanced_sast.md` | https://docs.datadoghq.com/security/code_security/static_analysis/ai_enhanced_sast/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/code_security/static_analysis/generic_ci_providers.md` | https://docs.datadoghq.com/security/code_security/static_analysis/generic_ci_providers/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/code_security/static_analysis/setup/_index.md` | https://docs.datadoghq.com/security/code_security/static_analysis/setup/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/detection_rules/_index.md` | https://docs.datadoghq.com/security/detection_rules/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/guide/aws_fargate_config_guide.md` | https://docs.datadoghq.com/security/guide/aws_fargate_config_guide/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/guide/findings-schema.md` | https://docs.datadoghq.com/security/guide/findings-schema/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/guide/security-findings-migration.md` | https://docs.datadoghq.com/security/guide/security-findings-migration/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/notifications/_index.md` | https://docs.datadoghq.com/security/notifications/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/notifications/rules.md` | https://docs.datadoghq.com/security/notifications/rules/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/notifications/variables.md` | https://docs.datadoghq.com/security/notifications/variables/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/security_inbox.md` | https://docs.datadoghq.com/security/security_inbox/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/sensitive_data_scanner/_index.md` | https://docs.datadoghq.com/security/sensitive_data_scanner/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/sensitive_data_scanner/guide/investigate_sensitive_data_findings.md` | https://docs.datadoghq.com/security/sensitive_data_scanner/guide/investigate_sensitive_data_findings/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/sensitive_data_scanner/guide/redact_all_emails_except_from_specific_domain_logs.md` | https://docs.datadoghq.com/security/sensitive_data_scanner/guide/redact_all_emails_except_from_specific_domain_logs/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/sensitive_data_scanner/guide/redact_uuids_in_logs.md` | https://docs.datadoghq.com/security/sensitive_data_scanner/guide/redact_uuids_in_logs/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/sensitive_data_scanner/scanning_rules/_index.md` | https://docs.datadoghq.com/security/sensitive_data_scanner/scanning_rules/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/sensitive_data_scanner/scanning_rules/custom_rules.md` | https://docs.datadoghq.com/security/sensitive_data_scanner/scanning_rules/custom_rules/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/sensitive_data_scanner/scanning_rules/library_rules.md` | https://docs.datadoghq.com/security/sensitive_data_scanner/scanning_rules/library_rules/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/sensitive_data_scanner/setup/_index.md` | https://docs.datadoghq.com/security/sensitive_data_scanner/setup/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/sensitive_data_scanner/setup/cloud_storage.md` | https://docs.datadoghq.com/security/sensitive_data_scanner/setup/cloud_storage/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/sensitive_data_scanner/setup/telemetry_data.md` | https://docs.datadoghq.com/security/sensitive_data_scanner/setup/telemetry_data/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/suppressions.md` | https://docs.datadoghq.com/security/suppressions/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/threat_intelligence.md` | https://docs.datadoghq.com/security/threat_intelligence/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/threats/investigate_agent_events.md` | https://docs.datadoghq.com/security/threats/investigate_agent_events/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/threats/security_signals.md` | https://docs.datadoghq.com/security/threats/security_signals/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/threats/workload_security_rules/_index.md` | https://docs.datadoghq.com/security/threats/workload_security_rules/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/threats/workload_security_rules/custom_rules.md` | https://docs.datadoghq.com/security/threats/workload_security_rules/custom_rules/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/workload_protection/_index.md` | https://docs.datadoghq.com/security/workload_protection/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/workload_protection/inventory/coverage_map.md` | https://docs.datadoghq.com/security/workload_protection/inventory/coverage_map/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/workload_protection/inventory/serverless.md` | https://docs.datadoghq.com/security/workload_protection/inventory/serverless/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/workload_protection/linux_expressions.md` | https://docs.datadoghq.com/security/workload_protection/linux_expressions/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/security/workload_protection/windows_expressions.md` | https://docs.datadoghq.com/security/workload_protection/windows_expressions/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/serverless/_index.md` | https://docs.datadoghq.com/serverless/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/serverless/aws_lambda/_index.md` | https://docs.datadoghq.com/serverless/aws_lambda/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/serverless/aws_lambda/configuration.md` | https://docs.datadoghq.com/serverless/aws_lambda/configuration/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/serverless/aws_lambda/deployment_tracking.md` | https://docs.datadoghq.com/serverless/aws_lambda/deployment_tracking/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/serverless/aws_lambda/distributed_tracing.md` | https://docs.datadoghq.com/serverless/aws_lambda/distributed_tracing/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/serverless/aws_lambda/instrumentation/_index.md` | https://docs.datadoghq.com/serverless/aws_lambda/instrumentation/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/serverless/aws_lambda/instrumentation/dotnet.md` | https://docs.datadoghq.com/serverless/aws_lambda/instrumentation/dotnet/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/serverless/aws_lambda/instrumentation/go.md` | https://docs.datadoghq.com/serverless/aws_lambda/instrumentation/go/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/serverless/aws_lambda/instrumentation/java.md` | https://docs.datadoghq.com/serverless/aws_lambda/instrumentation/java/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/serverless/aws_lambda/instrumentation/nodejs.md` | https://docs.datadoghq.com/serverless/aws_lambda/instrumentation/nodejs/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/serverless/aws_lambda/instrumentation/python.md` | https://docs.datadoghq.com/serverless/aws_lambda/instrumentation/python/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/serverless/aws_lambda/instrumentation/ruby.md` | https://docs.datadoghq.com/serverless/aws_lambda/instrumentation/ruby/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/serverless/aws_lambda/lwa.md` | https://docs.datadoghq.com/serverless/aws_lambda/lwa/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/serverless/aws_lambda/managed_instances.md` | https://docs.datadoghq.com/serverless/aws_lambda/managed_instances/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/serverless/aws_lambda/opentelemetry.md` | https://docs.datadoghq.com/serverless/aws_lambda/opentelemetry/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/serverless/aws_lambda/profiling.md` | https://docs.datadoghq.com/serverless/aws_lambda/profiling/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/serverless/aws_lambda/remote_instrumentation.md` | https://docs.datadoghq.com/serverless/aws_lambda/remote_instrumentation/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/serverless/aws_lambda/securing_functions.md` | https://docs.datadoghq.com/serverless/aws_lambda/securing_functions/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/serverless/aws_lambda/troubleshooting.md` | https://docs.datadoghq.com/serverless/aws_lambda/troubleshooting/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/serverless/azure_app_service/_index.md` | https://docs.datadoghq.com/serverless/azure_app_service/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/serverless/azure_app_service/linux_code.md` | https://docs.datadoghq.com/serverless/azure_app_service/linux_code/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/serverless/azure_app_service/windows_code.md` | https://docs.datadoghq.com/serverless/azure_app_service/windows_code/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/serverless/azure_container_apps/_index.md` | https://docs.datadoghq.com/serverless/azure_container_apps/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/serverless/azure_container_apps/in_container/dotnet.md` | https://docs.datadoghq.com/serverless/azure_container_apps/in_container/dotnet/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/serverless/azure_container_apps/in_container/go.md` | https://docs.datadoghq.com/serverless/azure_container_apps/in_container/go/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/serverless/azure_container_apps/in_container/java.md` | https://docs.datadoghq.com/serverless/azure_container_apps/in_container/java/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/serverless/azure_container_apps/in_container/nodejs.md` | https://docs.datadoghq.com/serverless/azure_container_apps/in_container/nodejs/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/serverless/azure_container_apps/in_container/php.md` | https://docs.datadoghq.com/serverless/azure_container_apps/in_container/php/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/serverless/azure_container_apps/in_container/python.md` | https://docs.datadoghq.com/serverless/azure_container_apps/in_container/python/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/serverless/azure_container_apps/in_container/ruby.md` | https://docs.datadoghq.com/serverless/azure_container_apps/in_container/ruby/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/serverless/azure_container_apps/sidecar/dotnet.md` | https://docs.datadoghq.com/serverless/azure_container_apps/sidecar/dotnet/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/serverless/azure_container_apps/sidecar/go.md` | https://docs.datadoghq.com/serverless/azure_container_apps/sidecar/go/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/serverless/azure_container_apps/sidecar/java.md` | https://docs.datadoghq.com/serverless/azure_container_apps/sidecar/java/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/serverless/azure_container_apps/sidecar/nodejs.md` | https://docs.datadoghq.com/serverless/azure_container_apps/sidecar/nodejs/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/serverless/azure_container_apps/sidecar/php.md` | https://docs.datadoghq.com/serverless/azure_container_apps/sidecar/php/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/serverless/azure_container_apps/sidecar/python.md` | https://docs.datadoghq.com/serverless/azure_container_apps/sidecar/python/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/serverless/azure_container_apps/sidecar/ruby.md` | https://docs.datadoghq.com/serverless/azure_container_apps/sidecar/ruby/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/serverless/google_cloud_run/_index.md` | https://docs.datadoghq.com/serverless/google_cloud_run/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/serverless/google_cloud_run/containers/_index.md` | https://docs.datadoghq.com/serverless/google_cloud_run/containers/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/serverless/google_cloud_run/containers/in_container/dotnet.md` | https://docs.datadoghq.com/serverless/google_cloud_run/containers/in_container/dotnet/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/serverless/google_cloud_run/containers/in_container/go.md` | https://docs.datadoghq.com/serverless/google_cloud_run/containers/in_container/go/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/serverless/google_cloud_run/containers/in_container/java.md` | https://docs.datadoghq.com/serverless/google_cloud_run/containers/in_container/java/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/serverless/google_cloud_run/containers/in_container/nodejs.md` | https://docs.datadoghq.com/serverless/google_cloud_run/containers/in_container/nodejs/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/serverless/google_cloud_run/containers/in_container/php.md` | https://docs.datadoghq.com/serverless/google_cloud_run/containers/in_container/php/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/serverless/google_cloud_run/containers/in_container/python.md` | https://docs.datadoghq.com/serverless/google_cloud_run/containers/in_container/python/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/serverless/google_cloud_run/containers/in_container/ruby.md` | https://docs.datadoghq.com/serverless/google_cloud_run/containers/in_container/ruby/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/serverless/google_cloud_run/containers/sidecar/dotnet.md` | https://docs.datadoghq.com/serverless/google_cloud_run/containers/sidecar/dotnet/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/serverless/google_cloud_run/containers/sidecar/go.md` | https://docs.datadoghq.com/serverless/google_cloud_run/containers/sidecar/go/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/serverless/google_cloud_run/containers/sidecar/java.md` | https://docs.datadoghq.com/serverless/google_cloud_run/containers/sidecar/java/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/serverless/google_cloud_run/containers/sidecar/nodejs.md` | https://docs.datadoghq.com/serverless/google_cloud_run/containers/sidecar/nodejs/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/serverless/google_cloud_run/containers/sidecar/php.md` | https://docs.datadoghq.com/serverless/google_cloud_run/containers/sidecar/php/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/serverless/google_cloud_run/containers/sidecar/python.md` | https://docs.datadoghq.com/serverless/google_cloud_run/containers/sidecar/python/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/serverless/google_cloud_run/containers/sidecar/ruby.md` | https://docs.datadoghq.com/serverless/google_cloud_run/containers/sidecar/ruby/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/serverless/google_cloud_run/functions/dotnet.md` | https://docs.datadoghq.com/serverless/google_cloud_run/functions/dotnet/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/serverless/google_cloud_run/functions/go.md` | https://docs.datadoghq.com/serverless/google_cloud_run/functions/go/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/serverless/google_cloud_run/functions/java.md` | https://docs.datadoghq.com/serverless/google_cloud_run/functions/java/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/serverless/google_cloud_run/functions/nodejs.md` | https://docs.datadoghq.com/serverless/google_cloud_run/functions/nodejs/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/serverless/google_cloud_run/functions/python.md` | https://docs.datadoghq.com/serverless/google_cloud_run/functions/python/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/serverless/google_cloud_run/functions/ruby.md` | https://docs.datadoghq.com/serverless/google_cloud_run/functions/ruby/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/serverless/google_cloud_run/jobs/dotnet.md` | https://docs.datadoghq.com/serverless/google_cloud_run/jobs/dotnet/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/serverless/google_cloud_run/jobs/go.md` | https://docs.datadoghq.com/serverless/google_cloud_run/jobs/go/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/serverless/google_cloud_run/jobs/java.md` | https://docs.datadoghq.com/serverless/google_cloud_run/jobs/java/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/serverless/google_cloud_run/jobs/nodejs.md` | https://docs.datadoghq.com/serverless/google_cloud_run/jobs/nodejs/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/serverless/google_cloud_run/jobs/python.md` | https://docs.datadoghq.com/serverless/google_cloud_run/jobs/python/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/serverless/guide/azure_app_service_linux_code_wrapper_script.md` | https://docs.datadoghq.com/serverless/guide/azure_app_service_linux_code_wrapper_script/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/serverless/guide/azure_app_service_linux_containers_serverless_init.md` | https://docs.datadoghq.com/serverless/guide/azure_app_service_linux_containers_serverless_init/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/serverless/guide/datadog_forwarder_go.md` | https://docs.datadoghq.com/serverless/guide/datadog_forwarder_go/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/serverless/guide/datadog_forwarder_node.md` | https://docs.datadoghq.com/serverless/guide/datadog_forwarder_node/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/serverless/guide/datadog_forwarder_python.md` | https://docs.datadoghq.com/serverless/guide/datadog_forwarder_python/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/serverless/guide/datadog_forwarder_ruby.md` | https://docs.datadoghq.com/serverless/guide/datadog_forwarder_ruby/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/serverless/guide/extension_motivation.md` | https://docs.datadoghq.com/serverless/guide/extension_motivation/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/serverless/guide/opentelemetry.md` | https://docs.datadoghq.com/serverless/guide/opentelemetry/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/serverless/guide/serverless_package_too_large.md` | https://docs.datadoghq.com/serverless/guide/serverless_package_too_large/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/serverless/guide/serverless_tagging.md` | https://docs.datadoghq.com/serverless/guide/serverless_tagging/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/serverless/guide/serverless_tracing_and_bundlers.md` | https://docs.datadoghq.com/serverless/guide/serverless_tracing_and_bundlers/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/serverless/guide/serverless_tracing_and_webpack.md` | https://docs.datadoghq.com/serverless/guide/serverless_tracing_and_webpack/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/serverless/guide/serverless_warnings.md` | https://docs.datadoghq.com/serverless/guide/serverless_warnings/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/serverless/guide/step_functions_cdk.md` | https://docs.datadoghq.com/serverless/guide/step_functions_cdk/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/serverless/step_functions/_index.md` | https://docs.datadoghq.com/serverless/step_functions/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/serverless/step_functions/merge-step-functions-lambda.md` | https://docs.datadoghq.com/serverless/step_functions/merge-step-functions-lambda/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/serverless/step_functions/redrive.md` | https://docs.datadoghq.com/serverless/step_functions/redrive/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/service_level_objectives/_index.md` | https://docs.datadoghq.com/service_level_objectives/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/service_level_objectives/error_budget.md` | https://docs.datadoghq.com/service_level_objectives/error_budget/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/service_level_objectives/guide/slo-checklist.md` | https://docs.datadoghq.com/service_level_objectives/guide/slo-checklist/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/service_level_objectives/guide/slo_types_comparison.md` | https://docs.datadoghq.com/service_level_objectives/guide/slo_types_comparison/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/service_level_objectives/metric.md` | https://docs.datadoghq.com/service_level_objectives/metric/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/service_level_objectives/monitor.md` | https://docs.datadoghq.com/service_level_objectives/monitor/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/service_level_objectives/time_slice.md` | https://docs.datadoghq.com/service_level_objectives/time_slice/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/session_replay/_index.md` | https://docs.datadoghq.com/session_replay/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/session_replay/browser/_index.md` | https://docs.datadoghq.com/session_replay/browser/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/session_replay/browser/dev_tools.md` | https://docs.datadoghq.com/session_replay/browser/dev_tools/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/session_replay/browser/privacy_options.md` | https://docs.datadoghq.com/session_replay/browser/privacy_options/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/session_replay/browser/setup_and_configuration.md` | https://docs.datadoghq.com/session_replay/browser/setup_and_configuration/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/session_replay/browser/troubleshooting.md` | https://docs.datadoghq.com/session_replay/browser/troubleshooting/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/session_replay/heatmaps.md` | https://docs.datadoghq.com/session_replay/heatmaps/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/session_replay/mobile/_index.md` | https://docs.datadoghq.com/session_replay/mobile/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/session_replay/mobile/app_performance.md` | https://docs.datadoghq.com/session_replay/mobile/app_performance/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/session_replay/mobile/troubleshooting.md` | https://docs.datadoghq.com/session_replay/mobile/troubleshooting/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/session_replay/playlists.md` | https://docs.datadoghq.com/session_replay/playlists/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/sheets/_index.md` | https://docs.datadoghq.com/sheets/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/sheets/guide/logs_analysis.md` | https://docs.datadoghq.com/sheets/guide/logs_analysis/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/sheets/guide/rum_analysis.md` | https://docs.datadoghq.com/sheets/guide/rum_analysis/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/standard-attributes/_index.md` | https://docs.datadoghq.com/standard-attributes/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/_index.md` | https://docs.datadoghq.com/synthetics/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/api_tests/_index.md` | https://docs.datadoghq.com/synthetics/api_tests/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/api_tests/dns_tests.md` | https://docs.datadoghq.com/synthetics/api_tests/dns_tests/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/api_tests/grpc_tests.md` | https://docs.datadoghq.com/synthetics/api_tests/grpc_tests/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/api_tests/http_tests.md` | https://docs.datadoghq.com/synthetics/api_tests/http_tests/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/api_tests/icmp_tests.md` | https://docs.datadoghq.com/synthetics/api_tests/icmp_tests/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/api_tests/ssl_tests.md` | https://docs.datadoghq.com/synthetics/api_tests/ssl_tests/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/api_tests/tcp_tests.md` | https://docs.datadoghq.com/synthetics/api_tests/tcp_tests/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/api_tests/udp_tests.md` | https://docs.datadoghq.com/synthetics/api_tests/udp_tests/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/api_tests/websocket_tests.md` | https://docs.datadoghq.com/synthetics/api_tests/websocket_tests/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/browser_tests/_index.md` | https://docs.datadoghq.com/synthetics/browser_tests/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/browser_tests/advanced_options.md` | https://docs.datadoghq.com/synthetics/browser_tests/advanced_options/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/browser_tests/app-that-requires-login.md` | https://docs.datadoghq.com/synthetics/browser_tests/app-that-requires-login/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/browser_tests/test_results.md` | https://docs.datadoghq.com/synthetics/browser_tests/test_results/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/browser_tests/test_steps.md` | https://docs.datadoghq.com/synthetics/browser_tests/test_steps/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/explore/_index.md` | https://docs.datadoghq.com/synthetics/explore/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/explore/results_explorer/_index.md` | https://docs.datadoghq.com/synthetics/explore/results_explorer/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/explore/results_explorer/export.md` | https://docs.datadoghq.com/synthetics/explore/results_explorer/export/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/explore/results_explorer/saved_views.md` | https://docs.datadoghq.com/synthetics/explore/results_explorer/saved_views/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/explore/results_explorer/search.md` | https://docs.datadoghq.com/synthetics/explore/results_explorer/search/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/explore/results_explorer/search_runs.md` | https://docs.datadoghq.com/synthetics/explore/results_explorer/search_runs/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/explore/results_explorer/search_syntax.md` | https://docs.datadoghq.com/synthetics/explore/results_explorer/search_syntax/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/explore/saved_views.md` | https://docs.datadoghq.com/synthetics/explore/saved_views/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/guide/api_test_timing_variations.md` | https://docs.datadoghq.com/synthetics/guide/api_test_timing_variations/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/guide/authentication-protocols.md` | https://docs.datadoghq.com/synthetics/guide/authentication-protocols/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/guide/browser-tests-passkeys.md` | https://docs.datadoghq.com/synthetics/guide/browser-tests-passkeys/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/guide/browser-tests-totp.md` | https://docs.datadoghq.com/synthetics/guide/browser-tests-totp/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/guide/browser-tests-using-shadow-dom.md` | https://docs.datadoghq.com/synthetics/guide/browser-tests-using-shadow-dom/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/guide/canvas-content-javascript.md` | https://docs.datadoghq.com/synthetics/guide/canvas-content-javascript/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/guide/clone-test.md` | https://docs.datadoghq.com/synthetics/guide/clone-test/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/guide/create-api-test-with-the-api.md` | https://docs.datadoghq.com/synthetics/guide/create-api-test-with-the-api/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/guide/custom-javascript-assertion.md` | https://docs.datadoghq.com/synthetics/guide/custom-javascript-assertion/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/guide/email-validation.md` | https://docs.datadoghq.com/synthetics/guide/email-validation/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/guide/explore-rum-through-synthetics.md` | https://docs.datadoghq.com/synthetics/guide/explore-rum-through-synthetics/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/guide/http-tests-with-hmac.md` | https://docs.datadoghq.com/synthetics/guide/http-tests-with-hmac/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/guide/identify_synthetics_bots.md` | https://docs.datadoghq.com/synthetics/guide/identify_synthetics_bots/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/guide/kerberos-authentication.md` | https://docs.datadoghq.com/synthetics/guide/kerberos-authentication/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/guide/manage-browser-tests-through-the-api.md` | https://docs.datadoghq.com/synthetics/guide/manage-browser-tests-through-the-api/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/guide/manually-adding-chrome-extension.md` | https://docs.datadoghq.com/synthetics/guide/manually-adding-chrome-extension/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/guide/monitor-https-redirection.md` | https://docs.datadoghq.com/synthetics/guide/monitor-https-redirection/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/guide/monitor-usage.md` | https://docs.datadoghq.com/synthetics/guide/monitor-usage/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/guide/otp-email-synthetics-test.md` | https://docs.datadoghq.com/synthetics/guide/otp-email-synthetics-test/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/guide/popup.md` | https://docs.datadoghq.com/synthetics/guide/popup/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/guide/recording-custom-user-agent.md` | https://docs.datadoghq.com/synthetics/guide/recording-custom-user-agent/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/guide/reusing-browser-test-journeys.md` | https://docs.datadoghq.com/synthetics/guide/reusing-browser-test-journeys/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/guide/rum-to-synthetics.md` | https://docs.datadoghq.com/synthetics/guide/rum-to-synthetics/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/guide/step-duration.md` | https://docs.datadoghq.com/synthetics/guide/step-duration/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/guide/synthetic-test-retries-monitor-status.md` | https://docs.datadoghq.com/synthetics/guide/synthetic-test-retries-monitor-status/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/guide/synthetic-tests-caching.md` | https://docs.datadoghq.com/synthetics/guide/synthetic-tests-caching/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/guide/testing-file-upload-and-download.md` | https://docs.datadoghq.com/synthetics/guide/testing-file-upload-and-download/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/guide/uptime-percentage-widget.md` | https://docs.datadoghq.com/synthetics/guide/uptime-percentage-widget/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/guide/using-synthetic-metrics.md` | https://docs.datadoghq.com/synthetics/guide/using-synthetic-metrics/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/guide/version_history.md` | https://docs.datadoghq.com/synthetics/guide/version_history/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/mobile_app_testing/_index.md` | https://docs.datadoghq.com/synthetics/mobile_app_testing/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/mobile_app_testing/devices.md` | https://docs.datadoghq.com/synthetics/mobile_app_testing/devices/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/mobile_app_testing/mobile_app_tests/advanced_options.md` | https://docs.datadoghq.com/synthetics/mobile_app_testing/mobile_app_tests/advanced_options/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/mobile_app_testing/mobile_app_tests/restricted_networks.md` | https://docs.datadoghq.com/synthetics/mobile_app_testing/mobile_app_tests/restricted_networks/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/mobile_app_testing/mobile_app_tests/results.md` | https://docs.datadoghq.com/synthetics/mobile_app_testing/mobile_app_tests/results/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/mobile_app_testing/mobile_app_tests/steps.md` | https://docs.datadoghq.com/synthetics/mobile_app_testing/mobile_app_tests/steps/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/mobile_app_testing/mobile_app_tests/webview.md` | https://docs.datadoghq.com/synthetics/mobile_app_testing/mobile_app_tests/webview/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/mobile_app_testing/settings/_index.md` | https://docs.datadoghq.com/synthetics/mobile_app_testing/settings/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/multistep.md` | https://docs.datadoghq.com/synthetics/multistep/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/network_path_tests/_index.md` | https://docs.datadoghq.com/synthetics/network_path_tests/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/notifications/_index.md` | https://docs.datadoghq.com/synthetics/notifications/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/notifications/advanced_notifications.md` | https://docs.datadoghq.com/synthetics/notifications/advanced_notifications/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/notifications/conditional_alerting.md` | https://docs.datadoghq.com/synthetics/notifications/conditional_alerting/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/notifications/statuspage.md` | https://docs.datadoghq.com/synthetics/notifications/statuspage/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/notifications/template_variables.md` | https://docs.datadoghq.com/synthetics/notifications/template_variables/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/platform/_index.md` | https://docs.datadoghq.com/synthetics/platform/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/platform/apm/_index.md` | https://docs.datadoghq.com/synthetics/platform/apm/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/platform/dashboards/_index.md` | https://docs.datadoghq.com/synthetics/platform/dashboards/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/platform/dashboards/api_test.md` | https://docs.datadoghq.com/synthetics/platform/dashboards/api_test/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/platform/dashboards/browser_test.md` | https://docs.datadoghq.com/synthetics/platform/dashboards/browser_test/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/platform/dashboards/test_summary.md` | https://docs.datadoghq.com/synthetics/platform/dashboards/test_summary/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/platform/metrics/_index.md` | https://docs.datadoghq.com/synthetics/platform/metrics/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/platform/private_locations/_index.md` | https://docs.datadoghq.com/synthetics/platform/private_locations/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/platform/private_locations/configuration.md` | https://docs.datadoghq.com/synthetics/platform/private_locations/configuration/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/platform/private_locations/dimensioning.md` | https://docs.datadoghq.com/synthetics/platform/private_locations/dimensioning/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/platform/private_locations/monitoring.md` | https://docs.datadoghq.com/synthetics/platform/private_locations/monitoring/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/platform/settings/_index.md` | https://docs.datadoghq.com/synthetics/platform/settings/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/platform/test_coverage/_index.md` | https://docs.datadoghq.com/synthetics/platform/test_coverage/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/test_suites/_index.md` | https://docs.datadoghq.com/synthetics/test_suites/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/synthetics/troubleshooting/_index.md` | https://docs.datadoghq.com/synthetics/troubleshooting/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tests/_index.md` | https://docs.datadoghq.com/tests/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tests/browser_tests.md` | https://docs.datadoghq.com/tests/browser_tests/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tests/code_coverage.md` | https://docs.datadoghq.com/tests/code_coverage/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tests/containers.md` | https://docs.datadoghq.com/tests/containers/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tests/correlate_logs_and_tests/_index.md` | https://docs.datadoghq.com/tests/correlate_logs_and_tests/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tests/developer_workflows.md` | https://docs.datadoghq.com/tests/developer_workflows/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tests/explorer/_index.md` | https://docs.datadoghq.com/tests/explorer/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tests/explorer/export.md` | https://docs.datadoghq.com/tests/explorer/export/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tests/explorer/facets.md` | https://docs.datadoghq.com/tests/explorer/facets/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tests/explorer/saved_views.md` | https://docs.datadoghq.com/tests/explorer/saved_views/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tests/explorer/search_syntax.md` | https://docs.datadoghq.com/tests/explorer/search_syntax/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tests/flaky_management/_index.md` | https://docs.datadoghq.com/tests/flaky_management/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tests/flaky_tests/_index.md` | https://docs.datadoghq.com/tests/flaky_tests/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tests/flaky_tests/auto_test_retries.md` | https://docs.datadoghq.com/tests/flaky_tests/auto_test_retries/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tests/flaky_tests/early_flake_detection.md` | https://docs.datadoghq.com/tests/flaky_tests/early_flake_detection/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tests/guides/add_custom_measures.md` | https://docs.datadoghq.com/tests/guides/add_custom_measures/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tests/network.md` | https://docs.datadoghq.com/tests/network/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tests/repositories.md` | https://docs.datadoghq.com/tests/repositories/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tests/setup/dotnet.md` | https://docs.datadoghq.com/tests/setup/dotnet/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tests/setup/go.md` | https://docs.datadoghq.com/tests/setup/go/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tests/setup/java.md` | https://docs.datadoghq.com/tests/setup/java/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tests/setup/javascript.md` | https://docs.datadoghq.com/tests/setup/javascript/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tests/setup/junit_xml.md` | https://docs.datadoghq.com/tests/setup/junit_xml/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tests/setup/python.md` | https://docs.datadoghq.com/tests/setup/python/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tests/setup/ruby.md` | https://docs.datadoghq.com/tests/setup/ruby/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tests/setup/swift.md` | https://docs.datadoghq.com/tests/setup/swift/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tests/swift_tests.md` | https://docs.datadoghq.com/tests/swift_tests/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tests/test_health.md` | https://docs.datadoghq.com/tests/test_health/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tests/test_impact_analysis/_index.md` | https://docs.datadoghq.com/tests/test_impact_analysis/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tests/test_impact_analysis/how_it_works.md` | https://docs.datadoghq.com/tests/test_impact_analysis/how_it_works/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tests/test_impact_analysis/setup/dotnet.md` | https://docs.datadoghq.com/tests/test_impact_analysis/setup/dotnet/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tests/test_impact_analysis/setup/go.md` | https://docs.datadoghq.com/tests/test_impact_analysis/setup/go/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tests/test_impact_analysis/setup/java.md` | https://docs.datadoghq.com/tests/test_impact_analysis/setup/java/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tests/test_impact_analysis/setup/javascript.md` | https://docs.datadoghq.com/tests/test_impact_analysis/setup/javascript/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tests/test_impact_analysis/setup/python.md` | https://docs.datadoghq.com/tests/test_impact_analysis/setup/python/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tests/test_impact_analysis/setup/ruby.md` | https://docs.datadoghq.com/tests/test_impact_analysis/setup/ruby/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tests/test_impact_analysis/setup/swift.md` | https://docs.datadoghq.com/tests/test_impact_analysis/setup/swift/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tests/test_impact_analysis/troubleshooting/_index.md` | https://docs.datadoghq.com/tests/test_impact_analysis/troubleshooting/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tests/troubleshooting/_index.md` | https://docs.datadoghq.com/tests/troubleshooting/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/_index.md` | https://docs.datadoghq.com/tracing/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/code_origin/_index.md` | https://docs.datadoghq.com/tracing/code_origin/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/configure_data_security/_index.md` | https://docs.datadoghq.com/tracing/configure_data_security/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/error_tracking/_index.md` | https://docs.datadoghq.com/tracing/error_tracking/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/error_tracking/error_tracking_assistant.md` | https://docs.datadoghq.com/tracing/error_tracking/error_tracking_assistant/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/faq/trace_sampling_and_storage.md` | https://docs.datadoghq.com/tracing/faq/trace_sampling_and_storage/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/glossary/_index.md` | https://docs.datadoghq.com/tracing/glossary/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/guide/alert_anomalies_p99_database.md` | https://docs.datadoghq.com/tracing/guide/alert_anomalies_p99_database/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/guide/apm_dashboard.md` | https://docs.datadoghq.com/tracing/guide/apm_dashboard/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/guide/aws_payload_tagging.md` | https://docs.datadoghq.com/tracing/guide/aws_payload_tagging/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/guide/configuring-primary-operation.md` | https://docs.datadoghq.com/tracing/guide/configuring-primary-operation/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/guide/ddsketch_trace_metrics.md` | https://docs.datadoghq.com/tracing/guide/ddsketch_trace_metrics/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/guide/ingestion_sampling_use_cases.md` | https://docs.datadoghq.com/tracing/guide/ingestion_sampling_use_cases/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/guide/injectors.md` | https://docs.datadoghq.com/tracing/guide/injectors/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/guide/instrument_custom_method.md` | https://docs.datadoghq.com/tracing/guide/instrument_custom_method/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/guide/latency_investigator.md` | https://docs.datadoghq.com/tracing/guide/latency_investigator/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/guide/leveraging_diversity_sampling.md` | https://docs.datadoghq.com/tracing/guide/leveraging_diversity_sampling/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/guide/monitor-kafka-queues.md` | https://docs.datadoghq.com/tracing/guide/monitor-kafka-queues/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/guide/remote_config.md` | https://docs.datadoghq.com/tracing/guide/remote_config/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/guide/resource_based_sampling.md` | https://docs.datadoghq.com/tracing/guide/resource_based_sampling/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/guide/send_traces_to_agent_by_api.md` | https://docs.datadoghq.com/tracing/guide/send_traces_to_agent_by_api/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/guide/service_overrides.md` | https://docs.datadoghq.com/tracing/guide/service_overrides/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/guide/setting_primary_tags_to_scope.md` | https://docs.datadoghq.com/tracing/guide/setting_primary_tags_to_scope/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/guide/setting_up_APM_with_cpp.md` | https://docs.datadoghq.com/tracing/guide/setting_up_APM_with_cpp/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/guide/setting_up_apm_with_kubernetes_service.md` | https://docs.datadoghq.com/tracing/guide/setting_up_apm_with_kubernetes_service/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/guide/slowest_request_daily.md` | https://docs.datadoghq.com/tracing/guide/slowest_request_daily/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/guide/span_and_trace_id_format.md` | https://docs.datadoghq.com/tracing/guide/span_and_trace_id_format/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/guide/trace-php-cli-scripts.md` | https://docs.datadoghq.com/tracing/guide/trace-php-cli-scripts/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/guide/trace_ingestion_volume_control.md` | https://docs.datadoghq.com/tracing/guide/trace_ingestion_volume_control/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/guide/trace_queries_dataset.md` | https://docs.datadoghq.com/tracing/guide/trace_queries_dataset/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/guide/tutorial-enable-go-aws-ecs-ec2.md` | https://docs.datadoghq.com/tracing/guide/tutorial-enable-go-aws-ecs-ec2/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/guide/tutorial-enable-go-aws-ecs-fargate.md` | https://docs.datadoghq.com/tracing/guide/tutorial-enable-go-aws-ecs-fargate/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/guide/tutorial-enable-go-containers.md` | https://docs.datadoghq.com/tracing/guide/tutorial-enable-go-containers/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/guide/tutorial-enable-go-host.md` | https://docs.datadoghq.com/tracing/guide/tutorial-enable-go-host/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/guide/tutorial-enable-java-admission-controller.md` | https://docs.datadoghq.com/tracing/guide/tutorial-enable-java-admission-controller/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/guide/tutorial-enable-java-aws-ecs-ec2.md` | https://docs.datadoghq.com/tracing/guide/tutorial-enable-java-aws-ecs-ec2/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/guide/tutorial-enable-java-aws-ecs-fargate.md` | https://docs.datadoghq.com/tracing/guide/tutorial-enable-java-aws-ecs-fargate/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/guide/tutorial-enable-java-aws-eks.md` | https://docs.datadoghq.com/tracing/guide/tutorial-enable-java-aws-eks/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/guide/tutorial-enable-java-container-agent-host.md` | https://docs.datadoghq.com/tracing/guide/tutorial-enable-java-container-agent-host/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/guide/tutorial-enable-java-containers.md` | https://docs.datadoghq.com/tracing/guide/tutorial-enable-java-containers/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/guide/tutorial-enable-java-gke.md` | https://docs.datadoghq.com/tracing/guide/tutorial-enable-java-gke/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/guide/tutorial-enable-java-host.md` | https://docs.datadoghq.com/tracing/guide/tutorial-enable-java-host/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/guide/tutorial-enable-python-container-agent-host.md` | https://docs.datadoghq.com/tracing/guide/tutorial-enable-python-container-agent-host/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/guide/tutorial-enable-python-containers.md` | https://docs.datadoghq.com/tracing/guide/tutorial-enable-python-containers/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/guide/tutorial-enable-python-host.md` | https://docs.datadoghq.com/tracing/guide/tutorial-enable-python-host/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/guide/users-accounts.md` | https://docs.datadoghq.com/tracing/guide/users-accounts/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/guide/week_over_week_p50_comparison.md` | https://docs.datadoghq.com/tracing/guide/week_over_week_p50_comparison/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/live_debugger/_index.md` | https://docs.datadoghq.com/tracing/live_debugger/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/metrics/_index.md` | https://docs.datadoghq.com/tracing/metrics/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/metrics/metrics_namespace.md` | https://docs.datadoghq.com/tracing/metrics/metrics_namespace/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/metrics/runtime_metrics/_index.md` | https://docs.datadoghq.com/tracing/metrics/runtime_metrics/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/other_telemetry/_index.md` | https://docs.datadoghq.com/tracing/other_telemetry/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/other_telemetry/connect_logs_and_traces/dotnet.md` | https://docs.datadoghq.com/tracing/other_telemetry/connect_logs_and_traces/dotnet/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/other_telemetry/connect_logs_and_traces/go.md` | https://docs.datadoghq.com/tracing/other_telemetry/connect_logs_and_traces/go/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/other_telemetry/connect_logs_and_traces/java.md` | https://docs.datadoghq.com/tracing/other_telemetry/connect_logs_and_traces/java/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/other_telemetry/connect_logs_and_traces/nodejs.md` | https://docs.datadoghq.com/tracing/other_telemetry/connect_logs_and_traces/nodejs/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/other_telemetry/connect_logs_and_traces/opentelemetry.md` | https://docs.datadoghq.com/tracing/other_telemetry/connect_logs_and_traces/opentelemetry/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/other_telemetry/connect_logs_and_traces/php.md` | https://docs.datadoghq.com/tracing/other_telemetry/connect_logs_and_traces/php/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/other_telemetry/connect_logs_and_traces/python.md` | https://docs.datadoghq.com/tracing/other_telemetry/connect_logs_and_traces/python/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/other_telemetry/connect_logs_and_traces/ruby.md` | https://docs.datadoghq.com/tracing/other_telemetry/connect_logs_and_traces/ruby/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/recommendations/_index.md` | https://docs.datadoghq.com/tracing/recommendations/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/services/deployment_tracking.md` | https://docs.datadoghq.com/tracing/services/deployment_tracking/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/services/inferred_entity_remapping_rules.md` | https://docs.datadoghq.com/tracing/services/inferred_entity_remapping_rules/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/services/inferred_services.md` | https://docs.datadoghq.com/tracing/services/inferred_services/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/services/resource_page.md` | https://docs.datadoghq.com/tracing/services/resource_page/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/services/service_override_removal.md` | https://docs.datadoghq.com/tracing/services/service_override_removal/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/services/service_page.md` | https://docs.datadoghq.com/tracing/services/service_page/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/services/services_map.md` | https://docs.datadoghq.com/tracing/services/services_map/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/_index.md` | https://docs.datadoghq.com/tracing/trace_collection/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/automatic_instrumentation/dd_libraries/migrate/python/v4.md` | https://docs.datadoghq.com/tracing/trace_collection/automatic_instrumentation/dd_libraries/migrate/python/v4/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/automatic_instrumentation/dd_libraries/rust.md` | https://docs.datadoghq.com/tracing/trace_collection/automatic_instrumentation/dd_libraries/rust/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/compatibility/_index.md` | https://docs.datadoghq.com/tracing/trace_collection/compatibility/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/compatibility/cpp.md` | https://docs.datadoghq.com/tracing/trace_collection/compatibility/cpp/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/compatibility/dotnet-core.md` | https://docs.datadoghq.com/tracing/trace_collection/compatibility/dotnet-core/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/compatibility/dotnet-framework.md` | https://docs.datadoghq.com/tracing/trace_collection/compatibility/dotnet-framework/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/compatibility/go.md` | https://docs.datadoghq.com/tracing/trace_collection/compatibility/go/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/compatibility/java.md` | https://docs.datadoghq.com/tracing/trace_collection/compatibility/java/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/compatibility/nodejs.md` | https://docs.datadoghq.com/tracing/trace_collection/compatibility/nodejs/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/compatibility/php.md` | https://docs.datadoghq.com/tracing/trace_collection/compatibility/php/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/compatibility/php_v0.md` | https://docs.datadoghq.com/tracing/trace_collection/compatibility/php_v0/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/compatibility/python.md` | https://docs.datadoghq.com/tracing/trace_collection/compatibility/python/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/compatibility/rust.md` | https://docs.datadoghq.com/tracing/trace_collection/compatibility/rust/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/configure_apm_features_linux.md` | https://docs.datadoghq.com/tracing/trace_collection/configure_apm_features_linux/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/custom_instrumentation/_index.md` | https://docs.datadoghq.com/tracing/trace_collection/custom_instrumentation/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/custom_instrumentation/android/dd-api.md` | https://docs.datadoghq.com/tracing/trace_collection/custom_instrumentation/android/dd-api/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/custom_instrumentation/android/otel.md` | https://docs.datadoghq.com/tracing/trace_collection/custom_instrumentation/android/otel/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/custom_instrumentation/cpp/dd-api.md` | https://docs.datadoghq.com/tracing/trace_collection/custom_instrumentation/cpp/dd-api/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/custom_instrumentation/dd_libraries/_index.md` | https://docs.datadoghq.com/tracing/trace_collection/custom_instrumentation/dd_libraries/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/custom_instrumentation/dotnet/dd-api.md` | https://docs.datadoghq.com/tracing/trace_collection/custom_instrumentation/dotnet/dd-api/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/custom_instrumentation/dotnet/otel.md` | https://docs.datadoghq.com/tracing/trace_collection/custom_instrumentation/dotnet/otel/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/custom_instrumentation/elixir.md` | https://docs.datadoghq.com/tracing/trace_collection/custom_instrumentation/elixir/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/custom_instrumentation/go/dd-api.md` | https://docs.datadoghq.com/tracing/trace_collection/custom_instrumentation/go/dd-api/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/custom_instrumentation/go/migration.md` | https://docs.datadoghq.com/tracing/trace_collection/custom_instrumentation/go/migration/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/custom_instrumentation/java/dd-api.md` | https://docs.datadoghq.com/tracing/trace_collection/custom_instrumentation/java/dd-api/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/custom_instrumentation/java/otel.md` | https://docs.datadoghq.com/tracing/trace_collection/custom_instrumentation/java/otel/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/custom_instrumentation/nodejs/dd-api.md` | https://docs.datadoghq.com/tracing/trace_collection/custom_instrumentation/nodejs/dd-api/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/custom_instrumentation/nodejs/otel.md` | https://docs.datadoghq.com/tracing/trace_collection/custom_instrumentation/nodejs/otel/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/custom_instrumentation/opentracing/android.md` | https://docs.datadoghq.com/tracing/trace_collection/custom_instrumentation/opentracing/android/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/custom_instrumentation/opentracing/dotnet.md` | https://docs.datadoghq.com/tracing/trace_collection/custom_instrumentation/opentracing/dotnet/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/custom_instrumentation/otel_instrumentation/_index.md` | https://docs.datadoghq.com/tracing/trace_collection/custom_instrumentation/otel_instrumentation/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/custom_instrumentation/php/dd-api.md` | https://docs.datadoghq.com/tracing/trace_collection/custom_instrumentation/php/dd-api/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/custom_instrumentation/php/otel.md` | https://docs.datadoghq.com/tracing/trace_collection/custom_instrumentation/php/otel/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/custom_instrumentation/python/dd-api.md` | https://docs.datadoghq.com/tracing/trace_collection/custom_instrumentation/python/dd-api/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/custom_instrumentation/python/otel.md` | https://docs.datadoghq.com/tracing/trace_collection/custom_instrumentation/python/otel/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/custom_instrumentation/ruby/dd-api.md` | https://docs.datadoghq.com/tracing/trace_collection/custom_instrumentation/ruby/dd-api/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/custom_instrumentation/ruby/otel.md` | https://docs.datadoghq.com/tracing/trace_collection/custom_instrumentation/ruby/otel/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/custom_instrumentation/rust.md` | https://docs.datadoghq.com/tracing/trace_collection/custom_instrumentation/rust/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/custom_instrumentation/swift.md` | https://docs.datadoghq.com/tracing/trace_collection/custom_instrumentation/swift/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/dd_libraries/android.md` | https://docs.datadoghq.com/tracing/trace_collection/dd_libraries/android/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/dd_libraries/cpp.md` | https://docs.datadoghq.com/tracing/trace_collection/dd_libraries/cpp/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/dd_libraries/dotnet-core.md` | https://docs.datadoghq.com/tracing/trace_collection/dd_libraries/dotnet-core/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/dd_libraries/dotnet-framework.md` | https://docs.datadoghq.com/tracing/trace_collection/dd_libraries/dotnet-framework/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/dd_libraries/go.md` | https://docs.datadoghq.com/tracing/trace_collection/dd_libraries/go/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/dd_libraries/ios.md` | https://docs.datadoghq.com/tracing/trace_collection/dd_libraries/ios/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/dd_libraries/java.md` | https://docs.datadoghq.com/tracing/trace_collection/dd_libraries/java/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/dd_libraries/nodejs.md` | https://docs.datadoghq.com/tracing/trace_collection/dd_libraries/nodejs/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/dd_libraries/php.md` | https://docs.datadoghq.com/tracing/trace_collection/dd_libraries/php/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/dd_libraries/python.md` | https://docs.datadoghq.com/tracing/trace_collection/dd_libraries/python/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/dynamic_instrumentation/_index.md` | https://docs.datadoghq.com/tracing/trace_collection/dynamic_instrumentation/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/dynamic_instrumentation/enabling/_index.md` | https://docs.datadoghq.com/tracing/trace_collection/dynamic_instrumentation/enabling/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/dynamic_instrumentation/enabling/dotnet.md` | https://docs.datadoghq.com/tracing/trace_collection/dynamic_instrumentation/enabling/dotnet/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/dynamic_instrumentation/enabling/go.md` | https://docs.datadoghq.com/tracing/trace_collection/dynamic_instrumentation/enabling/go/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/dynamic_instrumentation/enabling/java.md` | https://docs.datadoghq.com/tracing/trace_collection/dynamic_instrumentation/enabling/java/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/dynamic_instrumentation/enabling/nodejs.md` | https://docs.datadoghq.com/tracing/trace_collection/dynamic_instrumentation/enabling/nodejs/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/dynamic_instrumentation/enabling/php.md` | https://docs.datadoghq.com/tracing/trace_collection/dynamic_instrumentation/enabling/php/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/dynamic_instrumentation/enabling/python.md` | https://docs.datadoghq.com/tracing/trace_collection/dynamic_instrumentation/enabling/python/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/dynamic_instrumentation/enabling/ruby.md` | https://docs.datadoghq.com/tracing/trace_collection/dynamic_instrumentation/enabling/ruby/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/dynamic_instrumentation/sensitive-data-scrubbing.md` | https://docs.datadoghq.com/tracing/trace_collection/dynamic_instrumentation/sensitive-data-scrubbing/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/dynamic_instrumentation/symdb/_index.md` | https://docs.datadoghq.com/tracing/trace_collection/dynamic_instrumentation/symdb/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/library_config/cpp.md` | https://docs.datadoghq.com/tracing/trace_collection/library_config/cpp/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/library_config/dotnet-core.md` | https://docs.datadoghq.com/tracing/trace_collection/library_config/dotnet-core/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/library_config/dotnet-framework.md` | https://docs.datadoghq.com/tracing/trace_collection/library_config/dotnet-framework/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/library_config/go.md` | https://docs.datadoghq.com/tracing/trace_collection/library_config/go/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/library_config/java.md` | https://docs.datadoghq.com/tracing/trace_collection/library_config/java/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/library_config/nodejs.md` | https://docs.datadoghq.com/tracing/trace_collection/library_config/nodejs/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/library_config/php.md` | https://docs.datadoghq.com/tracing/trace_collection/library_config/php/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/library_config/python.md` | https://docs.datadoghq.com/tracing/trace_collection/library_config/python/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/library_config/ruby.md` | https://docs.datadoghq.com/tracing/trace_collection/library_config/ruby/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/library_config/rust.md` | https://docs.datadoghq.com/tracing/trace_collection/library_config/rust/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/proxy_setup/_index.md` | https://docs.datadoghq.com/tracing/trace_collection/proxy_setup/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/proxy_setup/apigateway.md` | https://docs.datadoghq.com/tracing/trace_collection/proxy_setup/apigateway/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/proxy_setup/envoy.md` | https://docs.datadoghq.com/tracing/trace_collection/proxy_setup/envoy/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/proxy_setup/httpd.md` | https://docs.datadoghq.com/tracing/trace_collection/proxy_setup/httpd/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/proxy_setup/istio.md` | https://docs.datadoghq.com/tracing/trace_collection/proxy_setup/istio/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/proxy_setup/kong.md` | https://docs.datadoghq.com/tracing/trace_collection/proxy_setup/kong/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/proxy_setup/nginx.md` | https://docs.datadoghq.com/tracing/trace_collection/proxy_setup/nginx/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/runtime_config/_index.md` | https://docs.datadoghq.com/tracing/trace_collection/runtime_config/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/single-step-apm/_index.md` | https://docs.datadoghq.com/tracing/trace_collection/single-step-apm/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/single-step-apm/compatibility.md` | https://docs.datadoghq.com/tracing/trace_collection/single-step-apm/compatibility/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/single-step-apm/docker.md` | https://docs.datadoghq.com/tracing/trace_collection/single-step-apm/docker/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/single-step-apm/kubernetes.md` | https://docs.datadoghq.com/tracing/trace_collection/single-step-apm/kubernetes/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/single-step-apm/linux.md` | https://docs.datadoghq.com/tracing/trace_collection/single-step-apm/linux/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/single-step-apm/troubleshooting.md` | https://docs.datadoghq.com/tracing/trace_collection/single-step-apm/troubleshooting/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/single-step-apm/windows.md` | https://docs.datadoghq.com/tracing/trace_collection/single-step-apm/windows/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/span_links/_index.md` | https://docs.datadoghq.com/tracing/trace_collection/span_links/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/trace_context_propagation/_index.md` | https://docs.datadoghq.com/tracing/trace_collection/trace_context_propagation/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/trace_context_propagation/ruby_v1.md` | https://docs.datadoghq.com/tracing/trace_collection/trace_context_propagation/ruby_v1/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_collection/tracing_naming_convention/_index.md` | https://docs.datadoghq.com/tracing/trace_collection/tracing_naming_convention/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_explorer/_index.md` | https://docs.datadoghq.com/tracing/trace_explorer/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_explorer/query_syntax.md` | https://docs.datadoghq.com/tracing/trace_explorer/query_syntax/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_explorer/search.md` | https://docs.datadoghq.com/tracing/trace_explorer/search/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_explorer/span_tags_attributes.md` | https://docs.datadoghq.com/tracing/trace_explorer/span_tags_attributes/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_explorer/tag_analysis.md` | https://docs.datadoghq.com/tracing/trace_explorer/tag_analysis/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_explorer/trace_queries.md` | https://docs.datadoghq.com/tracing/trace_explorer/trace_queries/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_explorer/trace_view.md` | https://docs.datadoghq.com/tracing/trace_explorer/trace_view/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_explorer/visualize.md` | https://docs.datadoghq.com/tracing/trace_explorer/visualize/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_pipeline/adaptive_sampling.md` | https://docs.datadoghq.com/tracing/trace_pipeline/adaptive_sampling/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_pipeline/generate_metrics.md` | https://docs.datadoghq.com/tracing/trace_pipeline/generate_metrics/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_pipeline/ingestion_controls.md` | https://docs.datadoghq.com/tracing/trace_pipeline/ingestion_controls/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_pipeline/ingestion_mechanisms.md` | https://docs.datadoghq.com/tracing/trace_pipeline/ingestion_mechanisms/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_pipeline/metrics.md` | https://docs.datadoghq.com/tracing/trace_pipeline/metrics/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/trace_pipeline/trace_retention.md` | https://docs.datadoghq.com/tracing/trace_pipeline/trace_retention/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/troubleshooting/_index.md` | https://docs.datadoghq.com/tracing/troubleshooting/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/troubleshooting/correlated-logs-not-showing-up-in-the-trace-id-panel.md` | https://docs.datadoghq.com/tracing/troubleshooting/correlated-logs-not-showing-up-in-the-trace-id-panel/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/troubleshooting/go_compile_time.md` | https://docs.datadoghq.com/tracing/troubleshooting/go_compile_time/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/troubleshooting/quantization.md` | https://docs.datadoghq.com/tracing/troubleshooting/quantization/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/troubleshooting/tracer_debug_logs.md` | https://docs.datadoghq.com/tracing/troubleshooting/tracer_debug_logs/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/tracing/troubleshooting/tracer_startup_logs.md` | https://docs.datadoghq.com/tracing/troubleshooting/tracer_startup_logs/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/universal_service_monitoring/_index.md` | https://docs.datadoghq.com/universal_service_monitoring/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/universal_service_monitoring/additional_protocols.md` | https://docs.datadoghq.com/universal_service_monitoring/additional_protocols/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/universal_service_monitoring/guide/using_usm_metrics.md` | https://docs.datadoghq.com/universal_service_monitoring/guide/using_usm_metrics/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/universal_service_monitoring/setup.md` | https://docs.datadoghq.com/universal_service_monitoring/setup/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/watchdog/_index.md` | https://docs.datadoghq.com/watchdog/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/watchdog/faq/root-cause-not-showing.md` | https://docs.datadoghq.com/watchdog/faq/root-cause-not-showing/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/watchdog/faulty_cloud_saas_api_detection.md` | https://docs.datadoghq.com/watchdog/faulty_cloud_saas_api_detection/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/watchdog/impact_analysis.md` | https://docs.datadoghq.com/watchdog/impact_analysis/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/watchdog/insights.md` | https://docs.datadoghq.com/watchdog/insights/ |
| `layouts/partials/whats-next/whats-next.html` | `content/en/watchdog/rca.md` | https://docs.datadoghq.com/watchdog/rca/ |
| `layouts/partials/workload-protection/wp-agent-tiles.html` | `content/en/security/workload_protection/setup/agent/_index.md` | https://docs.datadoghq.com/security/workload_protection/setup/agent/ |
| `layouts/partials/workload-protection/wp-enterprise-agent-tiles.html` | _No references found_ | - |
| `layouts/partials/workload-protection/wp-pro-agent-tiles.html` | _No references found_ | - |
| `layouts/partials/workload-protection/wp-ws-agent-tiles.html` | _No references found_ | - |

### Partial Descriptions


## layouts/partials/actions/private_actions_list.html

Hugo template tooling


**No references found**


## layouts/partials/api/api-toolbar.html

Hugo template tooling


**No references found**


## layouts/partials/api/arguments-data.html

Hugo template tooling


**No references found**


## layouts/partials/api/arguments.html

Hugo template tooling


**No references found**


## layouts/partials/api/code-example.html

Go, Python, Ruby, Typescript, Java etc.


**No references found**


## layouts/partials/api/curl.html

Hugo template tooling


**No references found**


## layouts/partials/api/endpoint-visibility.html

we have multiple versions for this endpoint


**No references found**


## layouts/partials/api/get-endpoint.html

If we have an enum for the site variable, we have several regions


**No references found**


## layouts/partials/api/intro.html

need this because hugo sometimes duplicates <p> when using markdownify


**No references found**


## layouts/partials/api/load-specs.html

Hugo template tooling


**No references found**


## layouts/partials/api/openapi-code-curl.html

Hugo template tooling


**No references found**


## layouts/partials/api/openapi-code-example.html

Hugo template tooling


**No references found**


## layouts/partials/api/openapi-code-go.html

Hugo template tooling


**No references found**


## layouts/partials/api/openapi-code-java.html

Hugo template tooling


**No references found**


## layouts/partials/api/openapi-code-javascript.html

Hugo template tooling


**No references found**


## layouts/partials/api/openapi-code-python.html

Hugo template tooling


**No references found**


## layouts/partials/api/openapi-code-ruby.html

Hugo template tooling


**No references found**


## layouts/partials/api/permissions.html

Hugo template tooling


**No references found**


## layouts/partials/api/regions.html

Hugo template tooling


**No references found**


## layouts/partials/api/request-body.html

Hugo template tooling


**No references found**


## layouts/partials/api/response.html

Hugo template tooling


**No references found**


## layouts/partials/api/sdk-languages.html

Hugo template tooling


**Used in 1 document(s)**


## layouts/partials/apm/apm-compatibility.html

Conditional Android and iOS cards (no compatibility or library_config pages for these as of 12/22/23)


**Used in 2 document(s)**


## layouts/partials/apm/apm-connect-logs-and-traces.html

Hugo template tooling


**Used in 1 document(s)**


## layouts/partials/apm/apm-containers.html

Hugo template tooling


**Used in 1 document(s)**


## layouts/partials/apm/apm-context-propagation.html

Hugo template tooling


**No references found**


## layouts/partials/apm/apm-inapp.html

Hugo template tooling


**No references found**


## layouts/partials/apm/apm-languages.html

Displays a grid of clickable language cards/logos for APM tracing documentation.


**Used in 1 document(s)**


## layouts/partials/apm/apm-manual-instrumentation-custom.html

Hugo template tooling


**Used in 1 document(s)**


## layouts/partials/apm/apm-manual-instrumentation.html

Hugo template tooling


**Used in 1 document(s)**


## layouts/partials/apm/apm-opentracing-custom.html

Hugo template tooling


**Used in 1 document(s)**


## layouts/partials/apm/apm-opentracing.html

Hugo template tooling


**No references found**


## layouts/partials/apm/apm-otel-instrumentation-custom.html

Hugo template tooling


**Used in 1 document(s)**


## layouts/partials/apm/apm-otel-instrumentation.html

Hugo template tooling


**Used in 1 document(s)**


## layouts/partials/apm/apm-proxies.html

Hugo template tooling


**Used in 1 document(s)**


## layouts/partials/apm/apm-runtime-metrics-containers.html

Hugo template tooling


**Used in 1 document(s)**


## layouts/partials/apm/apm-runtime-metrics.html

Hugo template tooling


**No references found**


## layouts/partials/apm/apm-single-step.html

Hugo template tooling


**Used in 1 document(s)**


## layouts/partials/apm/otel-instrumentation.html

Hugo template tooling


**Used in 1 document(s)**


## layouts/partials/app_and_api_protection/callout.html

Displays a callout or alert box.


**Used in 7 document(s)**


## layouts/partials/app_and_api_protection/python/capabilities.html

Hugo template tooling


**Used in 2 document(s)**


## layouts/partials/app_and_api_protection/python/overview.html

Hugo template tooling


**No references found**


## layouts/partials/badge.html

Displays status or feature badges.


**No references found**


## layouts/partials/breadcrumbs.html

Renders breadcrumb navigation.


**No references found**


## layouts/partials/canonical.html

Hugo template tooling


**No references found**


## layouts/partials/cloud_cost/cost-integrations.html

Hugo template tooling


**Used in 1 document(s)**


## layouts/partials/cloud_cost/getting-started.html

Hugo template tooling


**Used in 2 document(s)**


## layouts/partials/cloud_storage_monitoring/storage-monitoring-setup.html

Hugo template tooling


**Used in 1 document(s)**


## layouts/partials/cloudcraft/sdk-languages.html

Hugo template tooling


**Used in 1 document(s)**


## layouts/partials/code-lang-tabs.html

Creates tabbed code examples across multiple programming languages.


**No references found**


## layouts/partials/code_analysis/ide-plugins.html

Hugo template tooling


**No references found**


## layouts/partials/code_analysis/languages-getting-started.html

Hugo template tooling


**No references found**


## layouts/partials/code_analysis/sca-getting-started.html

Hugo template tooling


**No references found**


## layouts/partials/code_security/ide-plugins.html

Hugo template tooling


**No references found**


## layouts/partials/code_security/languages-getting-started.html

Hugo template tooling


**Used in 1 document(s)**


## layouts/partials/code_security/sca-lang-support.html

Hugo template tooling


**Used in 1 document(s)**


## layouts/partials/continuous_delivery/cd-getting-started.html

First row with 3 tiles


**Used in 1 document(s)**


## layouts/partials/continuous_integration/ci-itr-setup.html

Hugo template tooling


**Used in 2 document(s)**


## layouts/partials/continuous_integration/ci-pipelines-getting-started.html

Hugo template tooling


**Used in 3 document(s)**


## layouts/partials/continuous_integration/ci-tests-setup.html

Hugo template tooling


**Used in 3 document(s)**


## layouts/partials/continuous_testing/ct-getting-started.html

Hugo template tooling


**Used in 1 document(s)**


## layouts/partials/csm/csm-agent-tiles.html

Hugo template tooling


**Used in 1 document(s)**


## layouts/partials/csm/csm-enterprise-agent-tiles.html

Hugo template tooling


**No references found**


## layouts/partials/csm/csm-pro-agent-tiles.html

Hugo template tooling


**No references found**


## layouts/partials/csm/csm-ws-agent-tiles.html

Hugo template tooling


**No references found**


## layouts/partials/css.html

Hugo template tooling


**No references found**


## layouts/partials/data_jobs/setup-platforms-spark.html

Hugo template tooling


**Used in 1 document(s)**


## layouts/partials/data_jobs/setup-platforms.html

Hugo template tooling


**Used in 1 document(s)**


## layouts/partials/data_streams/setup-languages.html

Hugo template tooling


**Used in 2 document(s)**


## layouts/partials/data_streams/setup-technologies.html

Hugo template tooling


**Used in 2 document(s)**


## layouts/partials/dbm/dbm-data-collected.html

Hugo template tooling


**No references found**


## layouts/partials/dbm/dbm-getting-started-managed.html

Hugo template tooling


**No references found**


## layouts/partials/dbm/dbm-getting-started.html

Hugo template tooling


**No references found**


## layouts/partials/dbm/dbm-setup-documentdb.html

Hugo template tooling


**No references found**


## layouts/partials/dbm/dbm-setup-mongodb.html

Hugo template tooling


**No references found**


## layouts/partials/dbm/dbm-setup-mysql.html

Hugo template tooling


**No references found**


## layouts/partials/dbm/dbm-setup-oracle.html

Hugo template tooling


**No references found**


## layouts/partials/dbm/dbm-setup-postgres.html

Hugo template tooling


**No references found**


## layouts/partials/dbm/dbm-setup-sql-server.html

Hugo template tooling


**No references found**


## layouts/partials/dynamic_instrumentation/dynamic-instrumentation-languages.html

Hugo template tooling


**Used in 3 document(s)**


## layouts/partials/dynamic_instrumentation/symbol-database-languages.html

Renders tabbed content.


**Used in 1 document(s)**


## layouts/partials/error_tracking/error-tracking-handled-errors.html

Hugo template tooling


**Used in 1 document(s)**


## layouts/partials/error_tracking/error-tracking-mobile.html

Hugo template tooling


**Used in 1 document(s)**


## layouts/partials/feature_flags/feature_flags_client.html

Hugo template tooling


**Used in 2 document(s)**


## layouts/partials/feature_flags/feature_flags_server.html

Hugo template tooling


**Used in 2 document(s)**


## layouts/partials/footer-js-dd-docs-methods.html

Hugo template tooling


**No references found**


## layouts/partials/footer-scripts.html

isProd is equivalent to preview, live environments hugo defaults to environment development with hugo server


**No references found**


## layouts/partials/footer/footer.html

get lang specific data file


**No references found**


## layouts/partials/getting_started/continuous_testing/providers.html

Hugo template tooling


**Used in 1 document(s)**


## layouts/partials/global-modals/global-modals.html

Renders modal dialog.


**No references found**


## layouts/partials/graphingfunctions.md

Hugo template tooling


**No references found**


## layouts/partials/grouped-item-listings.html

If first word/only word is 3 letters long e.g aws or gcp then lets capitalize


**No references found**


## layouts/partials/head_scripts/google-site-tag.html

Global site tag (gtag.js) - Google Analytics


**No references found**


## layouts/partials/head_scripts/google-tag-manager.html

End Google Tag Manager


**No references found**


## layouts/partials/head_scripts/hotjar.html

Hugo template tooling


**No references found**


## layouts/partials/head_scripts/marketo.html

Hugo template tooling


**No references found**


## layouts/partials/header-scripts.html

isProd is equivalent to preview, live environments hugo defaults to environment development with hugo server


**No references found**


## layouts/partials/header/header.html

Hugo template tooling


**No references found**


## layouts/partials/home-header.html

get lang specific data file


**No references found**


## layouts/partials/hreflang.html

{{/* ------------------ Description: ------------------ Output the hreflang tag on each language version we build.. However do not output this in the english or localized page in the scenario where a 


**No references found**


## layouts/partials/icon.html

Hugo template tooling


**No references found**


## layouts/partials/img-resource.html

Hugo template tooling


**No references found**


## layouts/partials/img.html

Renders responsive images with lazy loading and proper alt text.


**No references found**


## layouts/partials/imgurl.html

Hugo template tooling


**No references found**


## layouts/partials/integration-labels/integration-labels.html

Hugo template tooling


**No references found**


## layouts/partials/integrations-carousel/integrations-carousel-modal.html

Renders modal dialog.


**No references found**


## layouts/partials/integrations-carousel/integrations-carousel.html

Hugo template tooling


**No references found**


## layouts/partials/integrations-logo.html

{{/* ------------------ Description: ------------------ Builds a string to the integration logo. :param basename: string of integration name without any variant or extension e.g "aws" or "amazon-ecs" 


**No references found**


## layouts/partials/language-region-select.html

dropdown-item hrefs are updated asynchronously in async-loading.js


**No references found**


## layouts/partials/logs/logs-cloud.html

Hugo template tooling


**Used in 1 document(s)**


## layouts/partials/logs/logs-containers.html

Hugo template tooling


**Used in 1 document(s)**


## layouts/partials/logs/logs-languages.html

Hugo template tooling


**Used in 1 document(s)**


## layouts/partials/markdoc-assets.html

Hugo template tooling


**No references found**


## layouts/partials/menulink.html

only ja pages on corp


**No references found**


## layouts/partials/meta-http-equiv.html

Hugo template tooling


**No references found**


## layouts/partials/meta.html

Schema.org markup for Google+


**No references found**


## layouts/partials/nav/left-nav-api.html

if no api menu in other languages fallback to english


**No references found**


## layouts/partials/nav/left-nav-partners.html

if no partners menu in other languages fallback to english


**No references found**


## layouts/partials/nav/left-nav.html

Hugo template tooling


**No references found**


## layouts/partials/ndm/ndm_integrations.html

Hugo template tooling


**Used in 1 document(s)**


## layouts/partials/ndm/sd-wan.html

Hugo template tooling


**Used in 1 document(s)**


## layouts/partials/ndm/virtualization.html

Hugo template tooling


**Used in 1 document(s)**


## layouts/partials/noindex.html

Hugo template tooling


**No references found**


## layouts/partials/observability_pipelines/use_cases.html

Hugo template tooling


**Used in 1 document(s)**


## layouts/partials/opentelemetry/otel-runtime-metrics.html

Hugo template tooling


**No references found**


## layouts/partials/page-edit-body.html

Hugo template tooling


**No references found**


## layouts/partials/page-edit.html

Hugo template tooling


**No references found**


## layouts/partials/partners/banner.html

Displays banner notification.


**No references found**


## layouts/partials/platforms/platforms.html

Renders platform selection interface with categorized platform icons.


**Used in 1 document(s)**


## layouts/partials/prefetch.html

Hugo template tooling


**No references found**


## layouts/partials/preload.html

Hugo template tooling


**No references found**


## layouts/partials/preview_banner/preview_banner.html

Displays banner notification.


**No references found**


## layouts/partials/profiling/profiling-languages.html

Hugo template tooling


**Used in 2 document(s)**


## layouts/partials/profiling/profiling-troubleshooting.html

Hugo template tooling


**Used in 1 document(s)**


## layouts/partials/profiling/profiling-unmanaged-code.html

Hugo template tooling


**No references found**


## layouts/partials/questions/questions.html

get lang specific data file


**No references found**


## layouts/partials/rbac-permissions-table.html

Renders a data table.


**No references found**


## layouts/partials/reference_tables/ref-tables-cloud-object-storage.html

Renders a data table.


**No references found**


## layouts/partials/reference_tables/ref-tables-saas-integrations.html

Renders a data table.


**Used in 1 document(s)**


## layouts/partials/region-param.html

Hugo template tooling


**No references found**


## layouts/partials/related-groups.html

Hugo template tooling


**No references found**


## layouts/partials/requests.html

get lang specific data file


**Used in 2 document(s)**


## layouts/partials/return-to-group-link.html

Hugo template tooling


**No references found**


## layouts/partials/rum/rum-browser-setup.html

Hugo template tooling


**Used in 1 document(s)**


## layouts/partials/rum/rum-correlate-rum-and-logs.html

Hugo template tooling


**Used in 1 document(s)**


## layouts/partials/rum/rum-error-tracking-mobile.html

Hugo template tooling


**Used in 1 document(s)**


## layouts/partials/rum/rum-feature-flag-tracking.html

Hugo template tooling


**Used in 3 document(s)**


## layouts/partials/rum/rum-getting-started-mobile-advanced.html

Hugo template tooling


**No references found**


## layouts/partials/rum/rum-getting-started-mobile-data-collected.html

Hugo template tooling


**No references found**


## layouts/partials/rum/rum-getting-started-mobile-setup.html

Hugo template tooling


**No references found**


## layouts/partials/rum/rum-getting-started-mobile-supported-versions.html

Hugo template tooling


**No references found**


## layouts/partials/rum/rum-getting-started-setup.html

Hugo template tooling


**Used in 1 document(s)**


## layouts/partials/rum/rum-getting-started.html

Hugo template tooling


**Used in 1 document(s)**


## layouts/partials/rum/rum-mobile-integrated-libraries.html

Hugo template tooling


**No references found**


## layouts/partials/rum/rum-troubleshooting-mobile.html

Hugo template tooling


**No references found**


## layouts/partials/search-mobile.html

Hugo template tooling


**No references found**


## layouts/partials/search.html

Hugo template tooling


**No references found**


## layouts/partials/security-platform/CSW-billing-note.html

Hugo template tooling


**Used in 9 document(s)**


## layouts/partials/security-platform/WP-billing-note.html

Hugo template tooling


**Used in 6 document(s)**


## layouts/partials/security-platform/appsec-languages-code-security.html

Hugo template tooling


**Used in 1 document(s)**


## layouts/partials/security-platform/appsec-languages-sca.html

Hugo template tooling


**Used in 1 document(s)**


## layouts/partials/security-platform/appsec-languages.html

Hugo template tooling


**Used in 1 document(s)**


## layouts/partials/security-platform/appsec-libraries-serverless.html

Hugo template tooling


**Used in 1 document(s)**


## layouts/partials/security-platform/appsec-serverless.html

Hugo template tooling


**No references found**


## layouts/partials/serverless/getting-started-languages.html

Hugo template tooling


**Used in 1 document(s)**


## layouts/partials/serverless/google-cloud-run-workloads.html

TODO(@nhulston) replace with Cloud Run jobs when available; gen 2 functions will link to gen 1 docs.


**Used in 1 document(s)**


## layouts/partials/serverless/lambda-managed-instances-runtimes.html

Hugo template tooling


**Used in 1 document(s)**


## layouts/partials/serverless/serverless-apm-recommendations.html

Hugo template tooling


**Used in 1 document(s)**


## layouts/partials/serverless/serverless-guide.html

Hugo template tooling


**No references found**


## layouts/partials/serverless/serverless-setup.html

Hugo template tooling


**No references found**


## layouts/partials/sidenav/api-sidenav.html

Hugo template tooling


**No references found**


## layouts/partials/sidenav/main-sidenav.html

Hugo template tooling


**No references found**


## layouts/partials/sidenav/partners-sidenav.html

Hugo template tooling


**No references found**


## layouts/partials/site_support_banner/site_support_banner.html

Displays banner notification.


**No references found**


## layouts/partials/static_analysis/try-rule-modal.html

Renders modal dialog.


**No references found**


## layouts/partials/support/support.html

Displays contact options (support platform, live chat, Slack) and learning resources.


**Used in 1 document(s)**


## layouts/partials/synthetics/network-layers.html

Hugo template tooling


**Used in 1 document(s)**


## layouts/partials/table-of-contents/scraped-toc.html

Renders a data table.


**No references found**


## layouts/partials/table-of-contents/table-of-contents.html

Renders a data table.


**No references found**


## layouts/partials/trace_collection/python/supported_runtimes.html

Hugo template tooling


**Used in 6 document(s)**


## layouts/partials/trace_collection/python/supported_versions.html

Hugo template tooling


**Used in 6 document(s)**


## layouts/partials/translate_status_banner/translate_status_banner.html

if this ja/fr page is older than the english its out of date


**No references found**


## layouts/partials/video.html

Embeds video content with proper formatting.


**No references found**


## layouts/partials/whats-next/whats-next.html

Renders a "What's Next" section with links from the page's further_reading front matter parameter.


**Used in 1929 document(s)**


## layouts/partials/workload-protection/wp-agent-tiles.html

Hugo template tooling


**Used in 1 document(s)**


## layouts/partials/workload-protection/wp-enterprise-agent-tiles.html

Hugo template tooling


**No references found**


## layouts/partials/workload-protection/wp-pro-agent-tiles.html

Hugo template tooling


**No references found**


## layouts/partials/workload-protection/wp-ws-agent-tiles.html

Hugo template tooling


**No references found**


---

## Shortcodes (Tooling Only, English)

**Total**: 290 English shortcodes with Hugo templating

**Excluded**: 217 plain markdown files

**Referenced in content**: 156 shortcodes

### Shortcodes Reference Table

| Shortcode Path | Referenced By | Documentation URL |
|----------------|---------------|-------------------|
| `layouts/shortcodes/X.html` | `content/en/account_management/rbac/granular_access.md` | https://docs.datadoghq.com/account_management/rbac/granular_access/ |
| `layouts/shortcodes/X.html` | `content/en/agent/guide/agent-5-debug-mode.md` | https://docs.datadoghq.com/agent/guide/agent-5-debug-mode/ |
| `layouts/shortcodes/X.html` | `content/en/agent/supported_platforms/_index.md` | https://docs.datadoghq.com/agent/supported_platforms/ |
| `layouts/shortcodes/X.html` | `content/en/agent/troubleshooting/debug_mode.md` | https://docs.datadoghq.com/agent/troubleshooting/debug_mode/ |
| `layouts/shortcodes/X.html` | `content/en/cloud_cost_management/allocation/container_cost_allocation.md` | https://docs.datadoghq.com/cloud_cost_management/allocation/container_cost_allocation/ |
| `layouts/shortcodes/X.html` | _...and 57 more_ | - |
| `layouts/shortcodes/aap/aap_and_api_protection_dotnet_navigation_menu.html` | _No references found_ | - |
| `layouts/shortcodes/aap/aap_and_api_protection_dotnet_overview.md` | _No references found_ | - |
| `layouts/shortcodes/aap/aap_and_api_protection_dotnet_setup_options.md` | _No references found_ | - |
| `layouts/shortcodes/aap/aap_and_api_protection_nodejs_navigation_menu.html` | _No references found_ | - |
| `layouts/shortcodes/aap/aap_and_api_protection_nodejs_overview.md` | _No references found_ | - |
| `layouts/shortcodes/aap/aap_and_api_protection_nodejs_remote_config_activation.md` | _No references found_ | - |
| `layouts/shortcodes/aap/aap_and_api_protection_nodejs_setup_options.md` | _No references found_ | - |
| `layouts/shortcodes/aas-workflow-linux.en.md` | `content/en/serverless/azure_app_service/linux_code.md` | https://docs.datadoghq.com/serverless/azure_app_service/linux_code/ |
| `layouts/shortcodes/aas-workflow-linux.en.md` | `content/en/serverless/guide/azure_app_service_linux_code_wrapper_script.md` | https://docs.datadoghq.com/serverless/guide/azure_app_service_linux_code_wrapper_script/ |
| `layouts/shortcodes/aas-workflow-linux.en.md` | `content/en/serverless/guide/azure_app_service_linux_containers_serverless_init.md` | https://docs.datadoghq.com/serverless/guide/azure_app_service_linux_containers_serverless_init/ |
| `layouts/shortcodes/aas-workflow-windows.en.md` | `content/en/serverless/azure_app_service/windows_code.md` | https://docs.datadoghq.com/serverless/azure_app_service/windows_code/ |
| `layouts/shortcodes/absLangUrl.html` | _No references found_ | - |
| `layouts/shortcodes/aca-container-options.html` | `content/en/serverless/azure_container_apps/_index.md` | https://docs.datadoghq.com/serverless/azure_container_apps/ |
| `layouts/shortcodes/aca-install-sidecar-arm-template.md` | `content/en/serverless/azure_container_apps/sidecar/dotnet.md` | https://docs.datadoghq.com/serverless/azure_container_apps/sidecar/dotnet/ |
| `layouts/shortcodes/aca-install-sidecar-arm-template.md` | `content/en/serverless/azure_container_apps/sidecar/go.md` | https://docs.datadoghq.com/serverless/azure_container_apps/sidecar/go/ |
| `layouts/shortcodes/aca-install-sidecar-arm-template.md` | `content/en/serverless/azure_container_apps/sidecar/java.md` | https://docs.datadoghq.com/serverless/azure_container_apps/sidecar/java/ |
| `layouts/shortcodes/aca-install-sidecar-arm-template.md` | `content/en/serverless/azure_container_apps/sidecar/nodejs.md` | https://docs.datadoghq.com/serverless/azure_container_apps/sidecar/nodejs/ |
| `layouts/shortcodes/aca-install-sidecar-arm-template.md` | `content/en/serverless/azure_container_apps/sidecar/php.md` | https://docs.datadoghq.com/serverless/azure_container_apps/sidecar/php/ |
| `layouts/shortcodes/aca-install-sidecar-arm-template.md` | _...and 2 more_ | - |
| `layouts/shortcodes/aca-install-sidecar-bicep.md` | `content/en/serverless/azure_container_apps/sidecar/dotnet.md` | https://docs.datadoghq.com/serverless/azure_container_apps/sidecar/dotnet/ |
| `layouts/shortcodes/aca-install-sidecar-bicep.md` | `content/en/serverless/azure_container_apps/sidecar/go.md` | https://docs.datadoghq.com/serverless/azure_container_apps/sidecar/go/ |
| `layouts/shortcodes/aca-install-sidecar-bicep.md` | `content/en/serverless/azure_container_apps/sidecar/java.md` | https://docs.datadoghq.com/serverless/azure_container_apps/sidecar/java/ |
| `layouts/shortcodes/aca-install-sidecar-bicep.md` | `content/en/serverless/azure_container_apps/sidecar/nodejs.md` | https://docs.datadoghq.com/serverless/azure_container_apps/sidecar/nodejs/ |
| `layouts/shortcodes/aca-install-sidecar-bicep.md` | `content/en/serverless/azure_container_apps/sidecar/php.md` | https://docs.datadoghq.com/serverless/azure_container_apps/sidecar/php/ |
| `layouts/shortcodes/aca-install-sidecar-bicep.md` | _...and 2 more_ | - |
| `layouts/shortcodes/aca-install-sidecar-datadog-ci.md` | `content/en/serverless/azure_container_apps/sidecar/dotnet.md` | https://docs.datadoghq.com/serverless/azure_container_apps/sidecar/dotnet/ |
| `layouts/shortcodes/aca-install-sidecar-datadog-ci.md` | `content/en/serverless/azure_container_apps/sidecar/go.md` | https://docs.datadoghq.com/serverless/azure_container_apps/sidecar/go/ |
| `layouts/shortcodes/aca-install-sidecar-datadog-ci.md` | `content/en/serverless/azure_container_apps/sidecar/java.md` | https://docs.datadoghq.com/serverless/azure_container_apps/sidecar/java/ |
| `layouts/shortcodes/aca-install-sidecar-datadog-ci.md` | `content/en/serverless/azure_container_apps/sidecar/nodejs.md` | https://docs.datadoghq.com/serverless/azure_container_apps/sidecar/nodejs/ |
| `layouts/shortcodes/aca-install-sidecar-datadog-ci.md` | `content/en/serverless/azure_container_apps/sidecar/php.md` | https://docs.datadoghq.com/serverless/azure_container_apps/sidecar/php/ |
| `layouts/shortcodes/aca-install-sidecar-datadog-ci.md` | _...and 2 more_ | - |
| `layouts/shortcodes/aca-install-sidecar-terraform.md` | `content/en/serverless/azure_container_apps/sidecar/dotnet.md` | https://docs.datadoghq.com/serverless/azure_container_apps/sidecar/dotnet/ |
| `layouts/shortcodes/aca-install-sidecar-terraform.md` | `content/en/serverless/azure_container_apps/sidecar/go.md` | https://docs.datadoghq.com/serverless/azure_container_apps/sidecar/go/ |
| `layouts/shortcodes/aca-install-sidecar-terraform.md` | `content/en/serverless/azure_container_apps/sidecar/java.md` | https://docs.datadoghq.com/serverless/azure_container_apps/sidecar/java/ |
| `layouts/shortcodes/aca-install-sidecar-terraform.md` | `content/en/serverless/azure_container_apps/sidecar/nodejs.md` | https://docs.datadoghq.com/serverless/azure_container_apps/sidecar/nodejs/ |
| `layouts/shortcodes/aca-install-sidecar-terraform.md` | `content/en/serverless/azure_container_apps/sidecar/php.md` | https://docs.datadoghq.com/serverless/azure_container_apps/sidecar/php/ |
| `layouts/shortcodes/aca-install-sidecar-terraform.md` | _...and 2 more_ | - |
| `layouts/shortcodes/account_management/audit_events.html` | _No references found_ | - |
| `layouts/shortcodes/agent-config.html` | `content/en/getting_started/logs/_index.md` | https://docs.datadoghq.com/getting_started/logs/ |
| `layouts/shortcodes/agent-dual-shipping.en.md` | `content/en/agent/configuration/dual-shipping.md` | https://docs.datadoghq.com/agent/configuration/dual-shipping/ |
| `layouts/shortcodes/android-otel-note.en.md` | `content/en/real_user_monitoring/guide/best-practices-tracing-native-ios-android-apps.md` | https://docs.datadoghq.com/real_user_monitoring/guide/best-practices-tracing-native-ios-android-apps/ |
| `layouts/shortcodes/android-otel-note.en.md` | `content/en/tracing/trace_collection/custom_instrumentation/android/dd-api.md` | https://docs.datadoghq.com/tracing/trace_collection/custom_instrumentation/android/dd-api/ |
| `layouts/shortcodes/android-otel-note.en.md` | `content/en/tracing/trace_collection/dd_libraries/android.md` | https://docs.datadoghq.com/tracing/trace_collection/dd_libraries/android/ |
| `layouts/shortcodes/api-scopes.html` | `content/en/api/latest/scopes/_index.md` | https://docs.datadoghq.com/api/latest/scopes/ |
| `layouts/shortcodes/apicode.html` | _No references found_ | - |
| `layouts/shortcodes/apicontent.html` | _No references found_ | - |
| `layouts/shortcodes/apm-ootb-graphs.en.md` | `content/en/tracing/services/resource_page.md` | https://docs.datadoghq.com/tracing/services/resource_page/ |
| `layouts/shortcodes/apm-ootb-graphs.en.md` | `content/en/tracing/services/service_page.md` | https://docs.datadoghq.com/tracing/services/service_page/ |
| `layouts/shortcodes/apm-ssi-uninstall-linux.en.md` | _No references found_ | - |
| `layouts/shortcodes/app-and-api-protection-ruby-overview.md` | `content/en/security/application_security/setup/ruby/_index.md` | https://docs.datadoghq.com/security/application_security/setup/ruby/ |
| `layouts/shortcodes/app-and-api-protection-ruby-overview.md` | `content/en/security/application_security/setup/ruby/aws-fargate.md` | https://docs.datadoghq.com/security/application_security/setup/ruby/aws-fargate/ |
| `layouts/shortcodes/app-and-api-protection-ruby-overview.md` | `content/en/security/application_security/setup/ruby/docker.md` | https://docs.datadoghq.com/security/application_security/setup/ruby/docker/ |
| `layouts/shortcodes/app-and-api-protection-ruby-overview.md` | `content/en/security/application_security/setup/ruby/kubernetes.md` | https://docs.datadoghq.com/security/application_security/setup/ruby/kubernetes/ |
| `layouts/shortcodes/app-and-api-protection-ruby-overview.md` | `content/en/security/application_security/setup/ruby/linux.md` | https://docs.datadoghq.com/security/application_security/setup/ruby/linux/ |
| `layouts/shortcodes/app-and-api-protection-ruby-overview.md` | _...and 1 more_ | - |
| `layouts/shortcodes/app-and-api-protection-ruby-setup-options.md` | `content/en/security/application_security/setup/ruby/docker.md` | https://docs.datadoghq.com/security/application_security/setup/ruby/docker/ |
| `layouts/shortcodes/app-and-api-protection-ruby-setup-options.md` | `content/en/security/application_security/setup/ruby/kubernetes.md` | https://docs.datadoghq.com/security/application_security/setup/ruby/kubernetes/ |
| `layouts/shortcodes/app-and-api-protection-ruby-setup-options.md` | `content/en/security/application_security/setup/ruby/linux.md` | https://docs.datadoghq.com/security/application_security/setup/ruby/linux/ |
| `layouts/shortcodes/app_and_api_protection_java_overview.md` | `content/en/security/application_security/setup/java/_index.md` | https://docs.datadoghq.com/security/application_security/setup/java/ |
| `layouts/shortcodes/app_and_api_protection_java_overview.md` | `content/en/security/application_security/setup/java/aws-fargate.md` | https://docs.datadoghq.com/security/application_security/setup/java/aws-fargate/ |
| `layouts/shortcodes/app_and_api_protection_java_overview.md` | `content/en/security/application_security/setup/java/docker.md` | https://docs.datadoghq.com/security/application_security/setup/java/docker/ |
| `layouts/shortcodes/app_and_api_protection_java_overview.md` | `content/en/security/application_security/setup/java/kubernetes.md` | https://docs.datadoghq.com/security/application_security/setup/java/kubernetes/ |
| `layouts/shortcodes/app_and_api_protection_java_overview.md` | `content/en/security/application_security/setup/java/linux.md` | https://docs.datadoghq.com/security/application_security/setup/java/linux/ |
| `layouts/shortcodes/app_and_api_protection_java_overview.md` | _...and 2 more_ | - |
| `layouts/shortcodes/app_and_api_protection_java_setup_options.md` | `content/en/security/application_security/setup/java/docker.md` | https://docs.datadoghq.com/security/application_security/setup/java/docker/ |
| `layouts/shortcodes/app_and_api_protection_java_setup_options.md` | `content/en/security/application_security/setup/java/kubernetes.md` | https://docs.datadoghq.com/security/application_security/setup/java/kubernetes/ |
| `layouts/shortcodes/app_and_api_protection_java_setup_options.md` | `content/en/security/application_security/setup/java/linux.md` | https://docs.datadoghq.com/security/application_security/setup/java/linux/ |
| `layouts/shortcodes/app_and_api_protection_navigation_menu.html` | `content/en/security/application_security/setup/dotnet/aws-fargate.md` | https://docs.datadoghq.com/security/application_security/setup/dotnet/aws-fargate/ |
| `layouts/shortcodes/app_and_api_protection_navigation_menu.html` | `content/en/security/application_security/setup/java/aws-fargate.md` | https://docs.datadoghq.com/security/application_security/setup/java/aws-fargate/ |
| `layouts/shortcodes/app_and_api_protection_navigation_menu.html` | `content/en/security/application_security/setup/java/docker.md` | https://docs.datadoghq.com/security/application_security/setup/java/docker/ |
| `layouts/shortcodes/app_and_api_protection_navigation_menu.html` | `content/en/security/application_security/setup/java/kubernetes.md` | https://docs.datadoghq.com/security/application_security/setup/java/kubernetes/ |
| `layouts/shortcodes/app_and_api_protection_navigation_menu.html` | `content/en/security/application_security/setup/java/linux.md` | https://docs.datadoghq.com/security/application_security/setup/java/linux/ |
| `layouts/shortcodes/app_and_api_protection_navigation_menu.html` | _...and 2 more_ | - |
| `layouts/shortcodes/app_and_api_protection_php_navigation_menu.html` | `content/en/security/application_security/setup/php/aws-fargate.md` | https://docs.datadoghq.com/security/application_security/setup/php/aws-fargate/ |
| `layouts/shortcodes/app_and_api_protection_php_navigation_menu.html` | `content/en/security/application_security/setup/php/docker.md` | https://docs.datadoghq.com/security/application_security/setup/php/docker/ |
| `layouts/shortcodes/app_and_api_protection_php_navigation_menu.html` | `content/en/security/application_security/setup/php/kubernetes.md` | https://docs.datadoghq.com/security/application_security/setup/php/kubernetes/ |
| `layouts/shortcodes/app_and_api_protection_php_navigation_menu.html` | `content/en/security/application_security/setup/php/linux.md` | https://docs.datadoghq.com/security/application_security/setup/php/linux/ |
| `layouts/shortcodes/app_and_api_protection_php_overview.md` | `content/en/security/application_security/setup/php/_index.md` | https://docs.datadoghq.com/security/application_security/setup/php/ |
| `layouts/shortcodes/app_and_api_protection_php_overview.md` | `content/en/security/application_security/setup/php/aws-fargate.md` | https://docs.datadoghq.com/security/application_security/setup/php/aws-fargate/ |
| `layouts/shortcodes/app_and_api_protection_php_overview.md` | `content/en/security/application_security/setup/php/docker.md` | https://docs.datadoghq.com/security/application_security/setup/php/docker/ |
| `layouts/shortcodes/app_and_api_protection_php_overview.md` | `content/en/security/application_security/setup/php/kubernetes.md` | https://docs.datadoghq.com/security/application_security/setup/php/kubernetes/ |
| `layouts/shortcodes/app_and_api_protection_php_overview.md` | `content/en/security/application_security/setup/php/linux.md` | https://docs.datadoghq.com/security/application_security/setup/php/linux/ |
| `layouts/shortcodes/app_and_api_protection_php_setup_options.html` | `content/en/security/application_security/setup/php/docker.md` | https://docs.datadoghq.com/security/application_security/setup/php/docker/ |
| `layouts/shortcodes/app_and_api_protection_php_setup_options.html` | `content/en/security/application_security/setup/php/kubernetes.md` | https://docs.datadoghq.com/security/application_security/setup/php/kubernetes/ |
| `layouts/shortcodes/app_and_api_protection_php_setup_options.html` | `content/en/security/application_security/setup/php/linux.md` | https://docs.datadoghq.com/security/application_security/setup/php/linux/ |
| `layouts/shortcodes/app_and_api_protection_python_navigation_menu.html` | `content/en/security/application_security/setup/python/aws-fargate.md` | https://docs.datadoghq.com/security/application_security/setup/python/aws-fargate/ |
| `layouts/shortcodes/app_and_api_protection_python_navigation_menu.html` | `content/en/security/application_security/setup/python/docker.md` | https://docs.datadoghq.com/security/application_security/setup/python/docker/ |
| `layouts/shortcodes/app_and_api_protection_python_navigation_menu.html` | `content/en/security/application_security/setup/python/kubernetes.md` | https://docs.datadoghq.com/security/application_security/setup/python/kubernetes/ |
| `layouts/shortcodes/app_and_api_protection_python_navigation_menu.html` | `content/en/security/application_security/setup/python/linux.md` | https://docs.datadoghq.com/security/application_security/setup/python/linux/ |
| `layouts/shortcodes/app_and_api_protection_python_navigation_menu.html` | `content/en/security/application_security/setup/python/macos.md` | https://docs.datadoghq.com/security/application_security/setup/python/macos/ |
| `layouts/shortcodes/app_and_api_protection_python_navigation_menu.html` | _...and 1 more_ | - |
| `layouts/shortcodes/app_and_api_protection_python_overview.md` | `content/en/security/application_security/setup/python/_index.md` | https://docs.datadoghq.com/security/application_security/setup/python/ |
| `layouts/shortcodes/app_and_api_protection_python_overview.md` | `content/en/security/application_security/setup/python/aws-fargate.md` | https://docs.datadoghq.com/security/application_security/setup/python/aws-fargate/ |
| `layouts/shortcodes/app_and_api_protection_python_overview.md` | `content/en/security/application_security/setup/python/docker.md` | https://docs.datadoghq.com/security/application_security/setup/python/docker/ |
| `layouts/shortcodes/app_and_api_protection_python_overview.md` | `content/en/security/application_security/setup/python/kubernetes.md` | https://docs.datadoghq.com/security/application_security/setup/python/kubernetes/ |
| `layouts/shortcodes/app_and_api_protection_python_overview.md` | `content/en/security/application_security/setup/python/linux.md` | https://docs.datadoghq.com/security/application_security/setup/python/linux/ |
| `layouts/shortcodes/app_and_api_protection_python_overview.md` | _...and 2 more_ | - |
| `layouts/shortcodes/app_and_api_protection_python_setup_options.md` | `content/en/security/application_security/setup/python/docker.md` | https://docs.datadoghq.com/security/application_security/setup/python/docker/ |
| `layouts/shortcodes/app_and_api_protection_python_setup_options.md` | `content/en/security/application_security/setup/python/kubernetes.md` | https://docs.datadoghq.com/security/application_security/setup/python/kubernetes/ |
| `layouts/shortcodes/app_and_api_protection_python_setup_options.md` | `content/en/security/application_security/setup/python/linux.md` | https://docs.datadoghq.com/security/application_security/setup/python/linux/ |
| `layouts/shortcodes/appsec-getstarted-standalone.md` | _No references found_ | - |
| `layouts/shortcodes/appsec-getstarted-with-rc.en.md` | _No references found_ | - |
| `layouts/shortcodes/appsec-getstarted.en.md` | `content/en/security/application_security/setup/dotnet/dotnet.md` | https://docs.datadoghq.com/security/application_security/setup/dotnet/dotnet/ |
| `layouts/shortcodes/appsec-integration.html` | `content/en/security/application_security/setup/_index.md` | https://docs.datadoghq.com/security/application_security/setup/ |
| `layouts/shortcodes/appsec-integration.html` | `content/en/security/application_security/setup/aws/fargate/_index.md` | https://docs.datadoghq.com/security/application_security/setup/aws/fargate/ |
| `layouts/shortcodes/appsec-integration.html` | `content/en/security/application_security/setup/aws/lambda/_index.md` | https://docs.datadoghq.com/security/application_security/setup/aws/lambda/ |
| `layouts/shortcodes/appsec-integration.html` | `content/en/security/application_security/setup/docker/_index.md` | https://docs.datadoghq.com/security/application_security/setup/docker/ |
| `layouts/shortcodes/appsec-integration.html` | `content/en/security/application_security/setup/dotnet/_index.md` | https://docs.datadoghq.com/security/application_security/setup/dotnet/ |
| `layouts/shortcodes/appsec-integration.html` | _...and 12 more_ | - |
| `layouts/shortcodes/appsec-integrations.html` | `content/en/security/application_security/setup/_index.md` | https://docs.datadoghq.com/security/application_security/setup/ |
| `layouts/shortcodes/appsec-integrations.html` | `content/en/security/application_security/setup/aws/fargate/_index.md` | https://docs.datadoghq.com/security/application_security/setup/aws/fargate/ |
| `layouts/shortcodes/appsec-integrations.html` | `content/en/security/application_security/setup/aws/lambda/_index.md` | https://docs.datadoghq.com/security/application_security/setup/aws/lambda/ |
| `layouts/shortcodes/appsec-integrations.html` | `content/en/security/application_security/setup/docker/_index.md` | https://docs.datadoghq.com/security/application_security/setup/docker/ |
| `layouts/shortcodes/appsec-integrations.html` | `content/en/security/application_security/setup/dotnet/_index.md` | https://docs.datadoghq.com/security/application_security/setup/dotnet/ |
| `layouts/shortcodes/appsec-integrations.html` | _...and 12 more_ | - |
| `layouts/shortcodes/argument.html` | _No references found_ | - |
| `layouts/shortcodes/asm-protect.en.md` | `content/en/security/application_security/how-it-works/_index.md` | https://docs.datadoghq.com/security/application_security/how-it-works/ |
| `layouts/shortcodes/asm-protection-page-configuration.en.md` | `content/en/security/application_security/policies/_index.md` | https://docs.datadoghq.com/security/application_security/policies/ |
| `layouts/shortcodes/asm-protection-page-configuration.en.md` | `content/en/security/application_security/policies/library_configuration.md` | https://docs.datadoghq.com/security/application_security/policies/library_configuration/ |
| `layouts/shortcodes/aws-permissions.md` | `content/en/integrations/guide/aws-manual-setup.md` | https://docs.datadoghq.com/integrations/guide/aws-manual-setup/ |
| `layouts/shortcodes/aws-resource-collection-cloud-cost-management.md` | _No references found_ | - |
| `layouts/shortcodes/aws-resource-collection-cloud-security-monitoring.md` | _No references found_ | - |
| `layouts/shortcodes/aws-resource-collection-cloudcraft.md` | _No references found_ | - |
| `layouts/shortcodes/aws-resource-collection-network-performance-monitoring.md` | _No references found_ | - |
| `layouts/shortcodes/aws-resource-collection-permissions.md` | _No references found_ | - |
| `layouts/shortcodes/aws-resource-collection-resource-catalog.md` | _No references found_ | - |
| `layouts/shortcodes/aws-resource-collection-upcoming-permissions.md` | _No references found_ | - |
| `layouts/shortcodes/beta-callout-private.html` | `content/en/tracing/trace_collection/dynamic_instrumentation/enabling/go.md` | https://docs.datadoghq.com/tracing/trace_collection/dynamic_instrumentation/enabling/go/ |
| `layouts/shortcodes/beta-callout-private.html` | `content/en/tracing/trace_collection/dynamic_instrumentation/enabling/ruby.md` | https://docs.datadoghq.com/tracing/trace_collection/dynamic_instrumentation/enabling/ruby/ |
| `layouts/shortcodes/beta-callout.html` | `content/en/error_tracking/frontend/replay_errors.md` | https://docs.datadoghq.com/error_tracking/frontend/replay_errors/ |
| `layouts/shortcodes/beta-callout.html` | `content/en/tracing/error_tracking/error_tracking_assistant.md` | https://docs.datadoghq.com/tracing/error_tracking/error_tracking_assistant/ |
| `layouts/shortcodes/beta-callout.html` | `content/en/tracing/trace_collection/dynamic_instrumentation/symdb/_index.md` | https://docs.datadoghq.com/tracing/trace_collection/dynamic_instrumentation/symdb/ |
| `layouts/shortcodes/beta-callout.html` | `content/en/tracing/trace_collection/dynamic_instrumentation/symdb/dotnet.md` | https://docs.datadoghq.com/tracing/trace_collection/dynamic_instrumentation/symdb/dotnet/ |
| `layouts/shortcodes/beta-callout.html` | `content/en/tracing/trace_collection/dynamic_instrumentation/symdb/python.md` | https://docs.datadoghq.com/tracing/trace_collection/dynamic_instrumentation/symdb/python/ |
| `layouts/shortcodes/callout.html` | `content/en/account_management/cloud_provider_authentication.md` | https://docs.datadoghq.com/account_management/cloud_provider_authentication/ |
| `layouts/shortcodes/callout.html` | `content/en/account_management/delete_data.md` | https://docs.datadoghq.com/account_management/delete_data/ |
| `layouts/shortcodes/callout.html` | `content/en/account_management/org_settings/cross_org_visibility_api.md` | https://docs.datadoghq.com/account_management/org_settings/cross_org_visibility_api/ |
| `layouts/shortcodes/callout.html` | `content/en/account_management/org_settings/domain_allowlist.md` | https://docs.datadoghq.com/account_management/org_settings/domain_allowlist/ |
| `layouts/shortcodes/callout.html` | `content/en/account_management/org_settings/domain_allowlist_api.md` | https://docs.datadoghq.com/account_management/org_settings/domain_allowlist_api/ |
| `layouts/shortcodes/callout.html` | _...and 185 more_ | - |
| `layouts/shortcodes/ccm-details.html` | _No references found_ | - |
| `layouts/shortcodes/ci-agent.en.md` | `content/en/tests/setup/dotnet.md` | https://docs.datadoghq.com/tests/setup/dotnet/ |
| `layouts/shortcodes/ci-agent.en.md` | `content/en/tests/setup/go.md` | https://docs.datadoghq.com/tests/setup/go/ |
| `layouts/shortcodes/ci-agent.en.md` | `content/en/tests/setup/java.md` | https://docs.datadoghq.com/tests/setup/java/ |
| `layouts/shortcodes/ci-agent.en.md` | `content/en/tests/setup/javascript.md` | https://docs.datadoghq.com/tests/setup/javascript/ |
| `layouts/shortcodes/ci-agent.en.md` | `content/en/tests/setup/python.md` | https://docs.datadoghq.com/tests/setup/python/ |
| `layouts/shortcodes/ci-agent.en.md` | _...and 1 more_ | - |
| `layouts/shortcodes/ci-autoinstrumentation.en.md` | `content/en/tests/setup/dotnet.md` | https://docs.datadoghq.com/tests/setup/dotnet/ |
| `layouts/shortcodes/ci-autoinstrumentation.en.md` | `content/en/tests/setup/go.md` | https://docs.datadoghq.com/tests/setup/go/ |
| `layouts/shortcodes/ci-autoinstrumentation.en.md` | `content/en/tests/setup/java.md` | https://docs.datadoghq.com/tests/setup/java/ |
| `layouts/shortcodes/ci-autoinstrumentation.en.md` | `content/en/tests/setup/javascript.md` | https://docs.datadoghq.com/tests/setup/javascript/ |
| `layouts/shortcodes/ci-autoinstrumentation.en.md` | `content/en/tests/setup/python.md` | https://docs.datadoghq.com/tests/setup/python/ |
| `layouts/shortcodes/ci-autoinstrumentation.en.md` | _...and 1 more_ | - |
| `layouts/shortcodes/ci-details.html` | `content/en/continuous_integration/pipelines/_index.md` | https://docs.datadoghq.com/continuous_integration/pipelines/ |
| `layouts/shortcodes/ci-details.html` | `content/en/profiler/enabling/supported_versions.md` | https://docs.datadoghq.com/profiler/enabling/supported_versions/ |
| `layouts/shortcodes/ci-details.html` | `content/en/tests/_index.md` | https://docs.datadoghq.com/tests/ |
| `layouts/shortcodes/ci-git-metadata.en.md` | `content/en/tests/setup/dotnet.md` | https://docs.datadoghq.com/tests/setup/dotnet/ |
| `layouts/shortcodes/ci-git-metadata.en.md` | `content/en/tests/setup/java.md` | https://docs.datadoghq.com/tests/setup/java/ |
| `layouts/shortcodes/ci-git-metadata.en.md` | `content/en/tests/setup/javascript.md` | https://docs.datadoghq.com/tests/setup/javascript/ |
| `layouts/shortcodes/ci-git-metadata.en.md` | `content/en/tests/setup/junit_xml.md` | https://docs.datadoghq.com/tests/setup/junit_xml/ |
| `layouts/shortcodes/ci-git-metadata.en.md` | `content/en/tests/setup/python.md` | https://docs.datadoghq.com/tests/setup/python/ |
| `layouts/shortcodes/ci-git-metadata.en.md` | _...and 2 more_ | - |
| `layouts/shortcodes/ci-itr-activation-instructions.en.md` | `content/en/tests/test_impact_analysis/setup/dotnet.md` | https://docs.datadoghq.com/tests/test_impact_analysis/setup/dotnet/ |
| `layouts/shortcodes/ci-itr-activation-instructions.en.md` | `content/en/tests/test_impact_analysis/setup/go.md` | https://docs.datadoghq.com/tests/test_impact_analysis/setup/go/ |
| `layouts/shortcodes/ci-itr-activation-instructions.en.md` | `content/en/tests/test_impact_analysis/setup/java.md` | https://docs.datadoghq.com/tests/test_impact_analysis/setup/java/ |
| `layouts/shortcodes/ci-itr-activation-instructions.en.md` | `content/en/tests/test_impact_analysis/setup/javascript.md` | https://docs.datadoghq.com/tests/test_impact_analysis/setup/javascript/ |
| `layouts/shortcodes/ci-itr-activation-instructions.en.md` | `content/en/tests/test_impact_analysis/setup/python.md` | https://docs.datadoghq.com/tests/test_impact_analysis/setup/python/ |
| `layouts/shortcodes/ci-itr-activation-instructions.en.md` | _...and 2 more_ | - |
| `layouts/shortcodes/classic-libraries-table.html` | `content/en/developers/community/libraries.md` | https://docs.datadoghq.com/developers/community/libraries/ |
| `layouts/shortcodes/cloud-sec-cloud-infra.en.md` | `content/en/security/cloud_security_management/misconfigurations/compliance_rules.md` | https://docs.datadoghq.com/security/cloud_security_management/misconfigurations/compliance_rules/ |
| `layouts/shortcodes/cloud-sec-cloud-infra.en.md` | `content/en/security/cloud_security_management/misconfigurations/frameworks_and_benchmarks/supported_frameworks.md` | https://docs.datadoghq.com/security/cloud_security_management/misconfigurations/frameworks_and_benchmarks/supported_frameworks/ |
| `layouts/shortcodes/cloud-sec-cloud-infra.en.md` | `content/en/security/default_rules/_index.md` | https://docs.datadoghq.com/security/default_rules/ |
| `layouts/shortcodes/cloud-siem-aws-cloudtrail-enable.en.md` | `content/en/security/cloud_security_management/setup/cloudtrail_logs.md` | https://docs.datadoghq.com/security/cloud_security_management/setup/cloudtrail_logs/ |
| `layouts/shortcodes/cloud-siem-aws-cloudtrail-enable.en.md` | `content/en/security/cloud_siem/guide/aws-config-guide-for-cloud-siem.md` | https://docs.datadoghq.com/security/cloud_siem/guide/aws-config-guide-for-cloud-siem/ |
| `layouts/shortcodes/cloud-siem-aws-cloudtrail-enable.en.md` | `content/en/security/guide/aws_fargate_config_guide.md` | https://docs.datadoghq.com/security/guide/aws_fargate_config_guide/ |
| `layouts/shortcodes/cloud-siem-aws-setup-cloudformation.en.md` | `content/en/security/cloud_security_management/setup/cloudtrail_logs.md` | https://docs.datadoghq.com/security/cloud_security_management/setup/cloudtrail_logs/ |
| `layouts/shortcodes/cloud-siem-aws-setup-cloudformation.en.md` | `content/en/security/cloud_siem/guide/aws-config-guide-for-cloud-siem.md` | https://docs.datadoghq.com/security/cloud_siem/guide/aws-config-guide-for-cloud-siem/ |
| `layouts/shortcodes/cloud-siem-content-packs.html` | `content/en/security/cloud_siem/ingest_and_enrich/content_packs.md` | https://docs.datadoghq.com/security/cloud_siem/ingest_and_enrich/content_packs/ |
| `layouts/shortcodes/cloud-siem-supported-ocsf.html` | `content/en/security/cloud_siem/ingest_and_enrich/open_cybersecurity_schema_framework/_index.md` | https://docs.datadoghq.com/security/cloud_siem/ingest_and_enrich/open_cybersecurity_schema_framework/ |
| `layouts/shortcodes/cloud_siem/add_reference_tables.en.md` | _No references found_ | - |
| `layouts/shortcodes/cloud_siem/anomaly_query.en.md` | _No references found_ | - |
| `layouts/shortcodes/cloud_siem/enable_decrease_severity.en.md` | _No references found_ | - |
| `layouts/shortcodes/cloud_siem/new_value_query.en.md` | _No references found_ | - |
| `layouts/shortcodes/cloud_siem/set_conditions_severity_notify_only.en.md` | _No references found_ | - |
| `layouts/shortcodes/cloud_siem/set_conditions_third_party.en.md` | _No references found_ | - |
| `layouts/shortcodes/code-block.html` | `content/en/account_management/guide/relevant-usage-migration.md` | https://docs.datadoghq.com/account_management/guide/relevant-usage-migration/ |
| `layouts/shortcodes/code-block.html` | `content/en/account_management/org_settings/cross_org_visibility_api.md` | https://docs.datadoghq.com/account_management/org_settings/cross_org_visibility_api/ |
| `layouts/shortcodes/code-block.html` | `content/en/actions/app_builder/components/custom_charts.md` | https://docs.datadoghq.com/actions/app_builder/components/custom_charts/ |
| `layouts/shortcodes/code-block.html` | `content/en/actions/app_builder/embedded_apps/_index.md` | https://docs.datadoghq.com/actions/app_builder/embedded_apps/ |
| `layouts/shortcodes/code-block.html` | `content/en/actions/app_builder/expressions.md` | https://docs.datadoghq.com/actions/app_builder/expressions/ |
| `layouts/shortcodes/code-block.html` | _...and 277 more_ | - |
| `layouts/shortcodes/collapse-content.html` | `content/en/actions/app_builder/components/_index.md` | https://docs.datadoghq.com/actions/app_builder/components/ |
| `layouts/shortcodes/collapse-content.html` | `content/en/actions/app_builder/expressions.md` | https://docs.datadoghq.com/actions/app_builder/expressions/ |
| `layouts/shortcodes/collapse-content.html` | `content/en/actions/app_builder/queries.md` | https://docs.datadoghq.com/actions/app_builder/queries/ |
| `layouts/shortcodes/collapse-content.html` | `content/en/actions/private_actions/use_private_actions.md` | https://docs.datadoghq.com/actions/private_actions/use_private_actions/ |
| `layouts/shortcodes/collapse-content.html` | `content/en/agent/configuration/secrets-management.md` | https://docs.datadoghq.com/agent/configuration/secrets-management/ |
| `layouts/shortcodes/collapse-content.html` | _...and 145 more_ | - |
| `layouts/shortcodes/collapse.html` | _No references found_ | - |
| `layouts/shortcodes/community-libraries-table.html` | `content/en/developers/community/libraries.md` | https://docs.datadoghq.com/developers/community/libraries/ |
| `layouts/shortcodes/container-languages.html` | `content/en/serverless/azure_container_apps/in_container/_index.md` | https://docs.datadoghq.com/serverless/azure_container_apps/in_container/ |
| `layouts/shortcodes/container-languages.html` | `content/en/serverless/azure_container_apps/sidecar/_index.md` | https://docs.datadoghq.com/serverless/azure_container_apps/sidecar/ |
| `layouts/shortcodes/container-languages.html` | `content/en/serverless/google_cloud_run/containers/in_container/_index.md` | https://docs.datadoghq.com/serverless/google_cloud_run/containers/in_container/ |
| `layouts/shortcodes/container-languages.html` | `content/en/serverless/google_cloud_run/containers/sidecar/_index.md` | https://docs.datadoghq.com/serverless/google_cloud_run/containers/sidecar/ |
| `layouts/shortcodes/container-languages.html` | `content/en/serverless/google_cloud_run/functions/_index.md` | https://docs.datadoghq.com/serverless/google_cloud_run/functions/ |
| `layouts/shortcodes/container-languages.html` | _...and 1 more_ | - |
| `layouts/shortcodes/csm-fargate-eks-sidecar.en.md` | _No references found_ | - |
| `layouts/shortcodes/csm-prereqs-enterprise-ws.en.md` | _No references found_ | - |
| `layouts/shortcodes/csm-prereqs-workload-security.en.md` | _No references found_ | - |
| `layouts/shortcodes/csm-prereqs.en.md` | _No references found_ | - |
| `layouts/shortcodes/csm-setup-aws.en.md` | `content/en/security/cloud_security_management/setup/cloud_integrations.md` | https://docs.datadoghq.com/security/cloud_security_management/setup/cloud_integrations/ |
| `layouts/shortcodes/csm-setup-google-cloud.en.md` | `content/en/security/cloud_security_management/setup/cloud_integrations.md` | https://docs.datadoghq.com/security/cloud_security_management/setup/cloud_integrations/ |
| `layouts/shortcodes/csm-windows-setup.en.md` | `content/en/security/cloud_security_management/setup/agent/windows.md` | https://docs.datadoghq.com/security/cloud_security_management/setup/agent/windows/ |
| `layouts/shortcodes/dashboards-widgets-api.html` | `content/en/dashboards/widgets/alert_graph.md` | https://docs.datadoghq.com/dashboards/widgets/alert_graph/ |
| `layouts/shortcodes/dashboards-widgets-api.html` | `content/en/dashboards/widgets/alert_value.md` | https://docs.datadoghq.com/dashboards/widgets/alert_value/ |
| `layouts/shortcodes/dashboards-widgets-api.html` | `content/en/dashboards/widgets/change.md` | https://docs.datadoghq.com/dashboards/widgets/change/ |
| `layouts/shortcodes/dashboards-widgets-api.html` | `content/en/dashboards/widgets/check_status.md` | https://docs.datadoghq.com/dashboards/widgets/check_status/ |
| `layouts/shortcodes/dashboards-widgets-api.html` | `content/en/dashboards/widgets/distribution.md` | https://docs.datadoghq.com/dashboards/widgets/distribution/ |
| `layouts/shortcodes/dashboards-widgets-api.html` | _...and 25 more_ | - |
| `layouts/shortcodes/dashboards-widgets-list.html` | _No references found_ | - |
| `layouts/shortcodes/data_streams/dsm-confluent-connectors.md` | _No references found_ | - |
| `layouts/shortcodes/data_streams/monitoring-rabbitmq-pipelines.md` | _No references found_ | - |
| `layouts/shortcodes/dbm-alwayson-cloud-hosted.en.md` | `content/en/database_monitoring/setup_sql_server/rds.md` | https://docs.datadoghq.com/database_monitoring/setup_sql_server/rds/ |
| `layouts/shortcodes/dbm-amazon-documentdb-agent-config-replica-set.en.md` | `content/en/database_monitoring/setup_documentdb/amazon_documentdb.md` | https://docs.datadoghq.com/database_monitoring/setup_documentdb/amazon_documentdb/ |
| `layouts/shortcodes/dbm-amazon-documentdb-agent-config-sharded-cluster.en.md` | _No references found_ | - |
| `layouts/shortcodes/dbm-mongodb-agent-config-replica-set.en.md` | `content/en/database_monitoring/setup_mongodb/mongodbatlas.md` | https://docs.datadoghq.com/database_monitoring/setup_mongodb/mongodbatlas/ |
| `layouts/shortcodes/dbm-mongodb-agent-config-replica-set.en.md` | `content/en/database_monitoring/setup_mongodb/selfhosted.md` | https://docs.datadoghq.com/database_monitoring/setup_mongodb/selfhosted/ |
| `layouts/shortcodes/dbm-mongodb-agent-config-sharded-cluster.en.md` | `content/en/database_monitoring/setup_mongodb/mongodbatlas.md` | https://docs.datadoghq.com/database_monitoring/setup_mongodb/mongodbatlas/ |
| `layouts/shortcodes/dbm-mongodb-agent-config-sharded-cluster.en.md` | `content/en/database_monitoring/setup_mongodb/selfhosted.md` | https://docs.datadoghq.com/database_monitoring/setup_mongodb/selfhosted/ |
| `layouts/shortcodes/dbm-mongodb-agent-config-standalone.en.md` | `content/en/database_monitoring/setup_mongodb/selfhosted.md` | https://docs.datadoghq.com/database_monitoring/setup_mongodb/selfhosted/ |
| `layouts/shortcodes/dbm-mongodb-agent-data-collected.en.md` | `content/en/database_monitoring/setup_mongodb/mongodbatlas.md` | https://docs.datadoghq.com/database_monitoring/setup_mongodb/mongodbatlas/ |
| `layouts/shortcodes/dbm-mongodb-agent-data-collected.en.md` | `content/en/database_monitoring/setup_mongodb/selfhosted.md` | https://docs.datadoghq.com/database_monitoring/setup_mongodb/selfhosted/ |
| `layouts/shortcodes/dbm-mongodb-agent-setup-kubernetes.en.md` | `content/en/database_monitoring/setup_documentdb/amazon_documentdb.md` | https://docs.datadoghq.com/database_monitoring/setup_documentdb/amazon_documentdb/ |
| `layouts/shortcodes/dbm-mongodb-agent-setup-kubernetes.en.md` | `content/en/database_monitoring/setup_mongodb/mongodbatlas.md` | https://docs.datadoghq.com/database_monitoring/setup_mongodb/mongodbatlas/ |
| `layouts/shortcodes/dbm-mongodb-agent-setup-kubernetes.en.md` | `content/en/database_monitoring/setup_mongodb/selfhosted.md` | https://docs.datadoghq.com/database_monitoring/setup_mongodb/selfhosted/ |
| `layouts/shortcodes/dbm-mysql-agent-config-examples.en.md` | `content/en/database_monitoring/setup_mysql/aurora.md` | https://docs.datadoghq.com/database_monitoring/setup_mysql/aurora/ |
| `layouts/shortcodes/dbm-mysql-agent-config-examples.en.md` | `content/en/database_monitoring/setup_mysql/azure.md` | https://docs.datadoghq.com/database_monitoring/setup_mysql/azure/ |
| `layouts/shortcodes/dbm-mysql-agent-config-examples.en.md` | `content/en/database_monitoring/setup_mysql/gcsql.md` | https://docs.datadoghq.com/database_monitoring/setup_mysql/gcsql/ |
| `layouts/shortcodes/dbm-mysql-agent-config-examples.en.md` | `content/en/database_monitoring/setup_mysql/rds.md` | https://docs.datadoghq.com/database_monitoring/setup_mysql/rds/ |
| `layouts/shortcodes/dbm-mysql-agent-config-examples.en.md` | `content/en/database_monitoring/setup_mysql/selfhosted.md` | https://docs.datadoghq.com/database_monitoring/setup_mysql/selfhosted/ |
| `layouts/shortcodes/dbm-postgres-agent-config-examples.en.md` | `content/en/database_monitoring/setup_postgres/alloydb.md` | https://docs.datadoghq.com/database_monitoring/setup_postgres/alloydb/ |
| `layouts/shortcodes/dbm-postgres-agent-config-examples.en.md` | `content/en/database_monitoring/setup_postgres/aurora.md` | https://docs.datadoghq.com/database_monitoring/setup_postgres/aurora/ |
| `layouts/shortcodes/dbm-postgres-agent-config-examples.en.md` | `content/en/database_monitoring/setup_postgres/azure.md` | https://docs.datadoghq.com/database_monitoring/setup_postgres/azure/ |
| `layouts/shortcodes/dbm-postgres-agent-config-examples.en.md` | `content/en/database_monitoring/setup_postgres/gcsql.md` | https://docs.datadoghq.com/database_monitoring/setup_postgres/gcsql/ |
| `layouts/shortcodes/dbm-postgres-agent-config-examples.en.md` | `content/en/database_monitoring/setup_postgres/rds/_index.md` | https://docs.datadoghq.com/database_monitoring/setup_postgres/rds/ |
| `layouts/shortcodes/dbm-postgres-agent-config-examples.en.md` | _...and 2 more_ | - |
| `layouts/shortcodes/dbm-sqlserver-agent-config-examples.en.md` | `content/en/database_monitoring/setup_sql_server/azure.md` | https://docs.datadoghq.com/database_monitoring/setup_sql_server/azure/ |
| `layouts/shortcodes/dbm-sqlserver-agent-config-examples.en.md` | `content/en/database_monitoring/setup_sql_server/gcsql.md` | https://docs.datadoghq.com/database_monitoring/setup_sql_server/gcsql/ |
| `layouts/shortcodes/dbm-sqlserver-agent-config-examples.en.md` | `content/en/database_monitoring/setup_sql_server/rds.md` | https://docs.datadoghq.com/database_monitoring/setup_sql_server/rds/ |
| `layouts/shortcodes/dbm-sqlserver-agent-config-examples.en.md` | `content/en/database_monitoring/setup_sql_server/selfhosted.md` | https://docs.datadoghq.com/database_monitoring/setup_sql_server/selfhosted/ |
| `layouts/shortcodes/dbm-sqlserver-agent-setup-kubernetes.en.md` | _No references found_ | - |
| `layouts/shortcodes/dbm-sqlserver-agent-setup-windows.en.md` | `content/en/database_monitoring/setup_sql_server/selfhosted.md` | https://docs.datadoghq.com/database_monitoring/setup_sql_server/selfhosted/ |
| `layouts/shortcodes/detection-rules.html` | _No references found_ | - |
| `layouts/shortcodes/dsm-tracer-version.html` | `content/en/data_streams/setup/language/dotnet.md` | https://docs.datadoghq.com/data_streams/setup/language/dotnet/ |
| `layouts/shortcodes/dsm-tracer-version.html` | `content/en/data_streams/setup/language/go.md` | https://docs.datadoghq.com/data_streams/setup/language/go/ |
| `layouts/shortcodes/dsm-tracer-version.html` | `content/en/data_streams/setup/language/java.md` | https://docs.datadoghq.com/data_streams/setup/language/java/ |
| `layouts/shortcodes/dsm-tracer-version.html` | `content/en/data_streams/setup/language/nodejs.md` | https://docs.datadoghq.com/data_streams/setup/language/nodejs/ |
| `layouts/shortcodes/dsm-tracer-version.html` | `content/en/data_streams/setup/language/python.md` | https://docs.datadoghq.com/data_streams/setup/language/python/ |
| `layouts/shortcodes/dsm-tracer-version.html` | _...and 9 more_ | - |
| `layouts/shortcodes/expression-language-evaluator.html` | `content/en/tracing/trace_collection/dynamic_instrumentation/expression-language.md` | https://docs.datadoghq.com/tracing/trace_collection/dynamic_instrumentation/expression-language/ |
| `layouts/shortcodes/expression-language-simulator.html` | `content/en/tracing/trace_collection/dynamic_instrumentation/expression-language.md` | https://docs.datadoghq.com/tracing/trace_collection/dynamic_instrumentation/expression-language/ |
| `layouts/shortcodes/filter_by_reference_tables.en.md` | `content/en/logs/explorer/advanced_search.md` | https://docs.datadoghq.com/logs/explorer/advanced_search/ |
| `layouts/shortcodes/gcr-container-options.html` | `content/en/serverless/google_cloud_run/containers/_index.md` | https://docs.datadoghq.com/serverless/google_cloud_run/containers/ |
| `layouts/shortcodes/gcr-install-sidecar-datadog-ci.md` | `content/en/serverless/google_cloud_run/containers/sidecar/dotnet.md` | https://docs.datadoghq.com/serverless/google_cloud_run/containers/sidecar/dotnet/ |
| `layouts/shortcodes/gcr-install-sidecar-datadog-ci.md` | `content/en/serverless/google_cloud_run/containers/sidecar/go.md` | https://docs.datadoghq.com/serverless/google_cloud_run/containers/sidecar/go/ |
| `layouts/shortcodes/gcr-install-sidecar-datadog-ci.md` | `content/en/serverless/google_cloud_run/containers/sidecar/java.md` | https://docs.datadoghq.com/serverless/google_cloud_run/containers/sidecar/java/ |
| `layouts/shortcodes/gcr-install-sidecar-datadog-ci.md` | `content/en/serverless/google_cloud_run/containers/sidecar/nodejs.md` | https://docs.datadoghq.com/serverless/google_cloud_run/containers/sidecar/nodejs/ |
| `layouts/shortcodes/gcr-install-sidecar-datadog-ci.md` | `content/en/serverless/google_cloud_run/containers/sidecar/php.md` | https://docs.datadoghq.com/serverless/google_cloud_run/containers/sidecar/php/ |
| `layouts/shortcodes/gcr-install-sidecar-datadog-ci.md` | _...and 8 more_ | - |
| `layouts/shortcodes/gcr-install-sidecar-other.md` | `content/en/serverless/google_cloud_run/containers/sidecar/dotnet.md` | https://docs.datadoghq.com/serverless/google_cloud_run/containers/sidecar/dotnet/ |
| `layouts/shortcodes/gcr-install-sidecar-other.md` | `content/en/serverless/google_cloud_run/containers/sidecar/go.md` | https://docs.datadoghq.com/serverless/google_cloud_run/containers/sidecar/go/ |
| `layouts/shortcodes/gcr-install-sidecar-other.md` | `content/en/serverless/google_cloud_run/containers/sidecar/java.md` | https://docs.datadoghq.com/serverless/google_cloud_run/containers/sidecar/java/ |
| `layouts/shortcodes/gcr-install-sidecar-other.md` | `content/en/serverless/google_cloud_run/containers/sidecar/nodejs.md` | https://docs.datadoghq.com/serverless/google_cloud_run/containers/sidecar/nodejs/ |
| `layouts/shortcodes/gcr-install-sidecar-other.md` | `content/en/serverless/google_cloud_run/containers/sidecar/php.md` | https://docs.datadoghq.com/serverless/google_cloud_run/containers/sidecar/php/ |
| `layouts/shortcodes/gcr-install-sidecar-other.md` | _...and 8 more_ | - |
| `layouts/shortcodes/gcr-install-sidecar-terraform.md` | `content/en/serverless/google_cloud_run/containers/sidecar/dotnet.md` | https://docs.datadoghq.com/serverless/google_cloud_run/containers/sidecar/dotnet/ |
| `layouts/shortcodes/gcr-install-sidecar-terraform.md` | `content/en/serverless/google_cloud_run/containers/sidecar/go.md` | https://docs.datadoghq.com/serverless/google_cloud_run/containers/sidecar/go/ |
| `layouts/shortcodes/gcr-install-sidecar-terraform.md` | `content/en/serverless/google_cloud_run/containers/sidecar/java.md` | https://docs.datadoghq.com/serverless/google_cloud_run/containers/sidecar/java/ |
| `layouts/shortcodes/gcr-install-sidecar-terraform.md` | `content/en/serverless/google_cloud_run/containers/sidecar/nodejs.md` | https://docs.datadoghq.com/serverless/google_cloud_run/containers/sidecar/nodejs/ |
| `layouts/shortcodes/gcr-install-sidecar-terraform.md` | `content/en/serverless/google_cloud_run/containers/sidecar/php.md` | https://docs.datadoghq.com/serverless/google_cloud_run/containers/sidecar/php/ |
| `layouts/shortcodes/gcr-install-sidecar-terraform.md` | _...and 8 more_ | - |
| `layouts/shortcodes/gcr-install-sidecar-yaml.md` | `content/en/serverless/google_cloud_run/containers/sidecar/dotnet.md` | https://docs.datadoghq.com/serverless/google_cloud_run/containers/sidecar/dotnet/ |
| `layouts/shortcodes/gcr-install-sidecar-yaml.md` | `content/en/serverless/google_cloud_run/containers/sidecar/go.md` | https://docs.datadoghq.com/serverless/google_cloud_run/containers/sidecar/go/ |
| `layouts/shortcodes/gcr-install-sidecar-yaml.md` | `content/en/serverless/google_cloud_run/containers/sidecar/java.md` | https://docs.datadoghq.com/serverless/google_cloud_run/containers/sidecar/java/ |
| `layouts/shortcodes/gcr-install-sidecar-yaml.md` | `content/en/serverless/google_cloud_run/containers/sidecar/nodejs.md` | https://docs.datadoghq.com/serverless/google_cloud_run/containers/sidecar/nodejs/ |
| `layouts/shortcodes/gcr-install-sidecar-yaml.md` | `content/en/serverless/google_cloud_run/containers/sidecar/php.md` | https://docs.datadoghq.com/serverless/google_cloud_run/containers/sidecar/php/ |
| `layouts/shortcodes/gcr-install-sidecar-yaml.md` | _...and 2 more_ | - |
| `layouts/shortcodes/gcr-jobs-retention-filter.html` | `content/en/serverless/google_cloud_run/jobs/dotnet.md` | https://docs.datadoghq.com/serverless/google_cloud_run/jobs/dotnet/ |
| `layouts/shortcodes/gcr-jobs-retention-filter.html` | `content/en/serverless/google_cloud_run/jobs/go.md` | https://docs.datadoghq.com/serverless/google_cloud_run/jobs/go/ |
| `layouts/shortcodes/gcr-jobs-retention-filter.html` | `content/en/serverless/google_cloud_run/jobs/java.md` | https://docs.datadoghq.com/serverless/google_cloud_run/jobs/java/ |
| `layouts/shortcodes/gcr-jobs-retention-filter.html` | `content/en/serverless/google_cloud_run/jobs/nodejs.md` | https://docs.datadoghq.com/serverless/google_cloud_run/jobs/nodejs/ |
| `layouts/shortcodes/gcr-jobs-retention-filter.html` | `content/en/serverless/google_cloud_run/jobs/python.md` | https://docs.datadoghq.com/serverless/google_cloud_run/jobs/python/ |
| `layouts/shortcodes/gcr-service-label.md` | `content/en/serverless/google_cloud_run/containers/in_container/dotnet.md` | https://docs.datadoghq.com/serverless/google_cloud_run/containers/in_container/dotnet/ |
| `layouts/shortcodes/gcr-service-label.md` | `content/en/serverless/google_cloud_run/containers/in_container/go.md` | https://docs.datadoghq.com/serverless/google_cloud_run/containers/in_container/go/ |
| `layouts/shortcodes/gcr-service-label.md` | `content/en/serverless/google_cloud_run/containers/in_container/java.md` | https://docs.datadoghq.com/serverless/google_cloud_run/containers/in_container/java/ |
| `layouts/shortcodes/gcr-service-label.md` | `content/en/serverless/google_cloud_run/containers/in_container/nodejs.md` | https://docs.datadoghq.com/serverless/google_cloud_run/containers/in_container/nodejs/ |
| `layouts/shortcodes/gcr-service-label.md` | `content/en/serverless/google_cloud_run/containers/in_container/php.md` | https://docs.datadoghq.com/serverless/google_cloud_run/containers/in_container/php/ |
| `layouts/shortcodes/gcr-service-label.md` | _...and 20 more_ | - |
| `layouts/shortcodes/get-metrics-from-git.html` | `content/en/containers/amazon_ecs/data_collected.md` | https://docs.datadoghq.com/containers/amazon_ecs/data_collected/ |
| `layouts/shortcodes/get-metrics-from-git.html` | `content/en/containers/docker/data_collected.md` | https://docs.datadoghq.com/containers/docker/data_collected/ |
| `layouts/shortcodes/get-metrics-from-git.html` | `content/en/containers/kubernetes/data_collected.md` | https://docs.datadoghq.com/containers/kubernetes/data_collected/ |
| `layouts/shortcodes/get-metrics-from-git.html` | `content/en/integrations/system.md` | https://docs.datadoghq.com/integrations/system/ |
| `layouts/shortcodes/get-metrics-from-git.html` | `content/en/integrations/tcp_rtt.md` | https://docs.datadoghq.com/integrations/tcp_rtt/ |
| `layouts/shortcodes/get-metrics-from-git.html` | _...and 4 more_ | - |
| `layouts/shortcodes/get-npm-integrations.html` | `content/en/network_monitoring/cloud_network_monitoring/supported_cloud_services/aws_supported_services.md` | https://docs.datadoghq.com/network_monitoring/cloud_network_monitoring/supported_cloud_services/aws_supported_services/ |
| `layouts/shortcodes/get-npm-integrations.html` | `content/en/network_monitoring/cloud_network_monitoring/supported_cloud_services/azure_supported_services.md` | https://docs.datadoghq.com/network_monitoring/cloud_network_monitoring/supported_cloud_services/azure_supported_services/ |
| `layouts/shortcodes/get-npm-integrations.html` | `content/en/network_monitoring/cloud_network_monitoring/supported_cloud_services/gcp_supported_services.md` | https://docs.datadoghq.com/network_monitoring/cloud_network_monitoring/supported_cloud_services/gcp_supported_services/ |
| `layouts/shortcodes/get-service-checks-from-git.html` | `content/en/containers/docker/data_collected.md` | https://docs.datadoghq.com/containers/docker/data_collected/ |
| `layouts/shortcodes/get-service-checks-from-git.html` | `content/en/containers/kubernetes/data_collected.md` | https://docs.datadoghq.com/containers/kubernetes/data_collected/ |
| `layouts/shortcodes/get-service-checks-from-git.html` | `content/en/integrations/system.md` | https://docs.datadoghq.com/integrations/system/ |
| `layouts/shortcodes/get-service-checks-from-git.html` | `content/en/network_monitoring/devices/data.md` | https://docs.datadoghq.com/network_monitoring/devices/data/ |
| `layouts/shortcodes/get-units-from-git.html` | _No references found_ | - |
| `layouts/shortcodes/google-cloud-integrations.md` | `content/en/getting_started/integrations/google_cloud.md` | https://docs.datadoghq.com/getting_started/integrations/google_cloud/ |
| `layouts/shortcodes/h2.html` | `content/en/api/latest/_index.md` | https://docs.datadoghq.com/api/latest/ |
| `layouts/shortcodes/h2.html` | `content/en/api/latest/rate-limits/_index.md` | https://docs.datadoghq.com/api/latest/rate-limits/ |
| `layouts/shortcodes/h2.html` | `content/en/api/latest/using-the-api/_index.md` | https://docs.datadoghq.com/api/latest/using-the-api/ |
| `layouts/shortcodes/h2.html` | `content/en/api/v1/rate-limits/_index.md` | https://docs.datadoghq.com/api/v1/rate-limits/ |
| `layouts/shortcodes/h2.html` | `content/en/api/v1/using-the-api/_index.md` | https://docs.datadoghq.com/api/v1/using-the-api/ |
| `layouts/shortcodes/h2.html` | _...and 2 more_ | - |
| `layouts/shortcodes/h3.html` | _No references found_ | - |
| `layouts/shortcodes/header-list.html` | `content/en/agent/guide/_index.md` | https://docs.datadoghq.com/agent/guide/ |
| `layouts/shortcodes/header-list.html` | `content/en/integrations/guide/_index.md` | https://docs.datadoghq.com/integrations/guide/ |
| `layouts/shortcodes/hipaa-customers.en.md` | `content/en/data_security/hipaa_compliance.md` | https://docs.datadoghq.com/data_security/hipaa_compliance/ |
| `layouts/shortcodes/hipaa-customers.en.md` | `content/en/data_security/logs.md` | https://docs.datadoghq.com/data_security/logs/ |
| `layouts/shortcodes/img.html` | `content/en/account_management/api-app-keys.md` | https://docs.datadoghq.com/account_management/api-app-keys/ |
| `layouts/shortcodes/img.html` | `content/en/account_management/audit_trail/_index.md` | https://docs.datadoghq.com/account_management/audit_trail/ |
| `layouts/shortcodes/img.html` | `content/en/account_management/audit_trail/forwarding_audit_events.md` | https://docs.datadoghq.com/account_management/audit_trail/forwarding_audit_events/ |
| `layouts/shortcodes/img.html` | `content/en/account_management/audit_trail/guides/track_dashboard_access_and_configuration_changes.md` | https://docs.datadoghq.com/account_management/audit_trail/guides/track_dashboard_access_and_configuration_changes/ |
| `layouts/shortcodes/img.html` | `content/en/account_management/audit_trail/guides/track_monitor_access_and_configuration_changes.md` | https://docs.datadoghq.com/account_management/audit_trail/guides/track_monitor_access_and_configuration_changes/ |
| `layouts/shortcodes/img.html` | _...and 1372 more_ | - |
| `layouts/shortcodes/include-markdown.html` | `content/en/cloud_cost_management/cost_changes/monitors.md` | https://docs.datadoghq.com/cloud_cost_management/cost_changes/monitors/ |
| `layouts/shortcodes/include-markdown.html` | `content/en/continuous_testing/metrics/_index.md` | https://docs.datadoghq.com/continuous_testing/metrics/ |
| `layouts/shortcodes/include-markdown.html` | `content/en/continuous_testing/results_explorer/_index.md` | https://docs.datadoghq.com/continuous_testing/results_explorer/ |
| `layouts/shortcodes/include-markdown.html` | `content/en/error_tracking/frontend/collecting_browser_errors.md` | https://docs.datadoghq.com/error_tracking/frontend/collecting_browser_errors/ |
| `layouts/shortcodes/include-markdown.html` | `content/en/error_tracking/frontend/mobile/flutter.md` | https://docs.datadoghq.com/error_tracking/frontend/mobile/flutter/ |
| `layouts/shortcodes/include-markdown.html` | _...and 68 more_ | - |
| `layouts/shortcodes/insert-example-links.html` | _No references found_ | - |
| `layouts/shortcodes/integration-assets-reference.en.md` | `content/en/developers/integrations/check_references.md` | https://docs.datadoghq.com/developers/integrations/check_references/ |
| `layouts/shortcodes/integration-assets.en.md` | _No references found_ | - |
| `layouts/shortcodes/integration-items.html` | _No references found_ | - |
| `layouts/shortcodes/integration_categories.en.md` | `content/en/developers/integrations/check_references.md` | https://docs.datadoghq.com/developers/integrations/check_references/ |
| `layouts/shortcodes/integration_categories.md` | `content/en/developers/integrations/check_references.md` | https://docs.datadoghq.com/developers/integrations/check_references/ |
| `layouts/shortcodes/integrations.html` | `content/en/integrations/_index.md` | https://docs.datadoghq.com/integrations/ |
| `layouts/shortcodes/is_loggedin.html` | _No references found_ | - |
| `layouts/shortcodes/jqmath-vanilla.html` | `content/en/cloud_cost_management/allocation/container_cost_allocation.md` | https://docs.datadoghq.com/cloud_cost_management/allocation/container_cost_allocation/ |
| `layouts/shortcodes/jqmath-vanilla.html` | `content/en/continuous_testing/settings/_index.md` | https://docs.datadoghq.com/continuous_testing/settings/ |
| `layouts/shortcodes/jqmath-vanilla.html` | `content/en/dashboards/guide/rollup-cardinality-visualizations.md` | https://docs.datadoghq.com/dashboards/guide/rollup-cardinality-visualizations/ |
| `layouts/shortcodes/jqmath-vanilla.html` | `content/en/dora_metrics/calculation/_index.md` | https://docs.datadoghq.com/dora_metrics/calculation/ |
| `layouts/shortcodes/jqmath-vanilla.html` | `content/en/dora_metrics/change_failure_detection/_index.md` | https://docs.datadoghq.com/dora_metrics/change_failure_detection/ |
| `layouts/shortcodes/jqmath-vanilla.html` | _...and 17 more_ | - |
| `layouts/shortcodes/lambda-install-cdk.html` | `content/en/serverless/aws_lambda/instrumentation/dotnet.md` | https://docs.datadoghq.com/serverless/aws_lambda/instrumentation/dotnet/ |
| `layouts/shortcodes/lambda-install-cdk.html` | `content/en/serverless/aws_lambda/instrumentation/go.md` | https://docs.datadoghq.com/serverless/aws_lambda/instrumentation/go/ |
| `layouts/shortcodes/lambda-install-cdk.html` | `content/en/serverless/aws_lambda/instrumentation/java.md` | https://docs.datadoghq.com/serverless/aws_lambda/instrumentation/java/ |
| `layouts/shortcodes/lambda-install-cdk.html` | `content/en/serverless/aws_lambda/instrumentation/nodejs.md` | https://docs.datadoghq.com/serverless/aws_lambda/instrumentation/nodejs/ |
| `layouts/shortcodes/lambda-install-cdk.html` | `content/en/serverless/aws_lambda/instrumentation/python.md` | https://docs.datadoghq.com/serverless/aws_lambda/instrumentation/python/ |
| `layouts/shortcodes/lambda-install-cdk.html` | _...and 1 more_ | - |
| `layouts/shortcodes/latest-lambda-layer-version.html` | `content/en/llm_observability/instrumentation/sdk.md` | https://docs.datadoghq.com/llm_observability/instrumentation/sdk/ |
| `layouts/shortcodes/latest-lambda-layer-version.html` | `content/en/meta/lambda-layer-version.md` | https://docs.datadoghq.com/meta/lambda-layer-version/ |
| `layouts/shortcodes/latest-lambda-layer-version.html` | `content/en/security/application_security/setup/aws/lambda/dotnet.md` | https://docs.datadoghq.com/security/application_security/setup/aws/lambda/dotnet/ |
| `layouts/shortcodes/latest-lambda-layer-version.html` | `content/en/security/application_security/setup/aws/lambda/go.md` | https://docs.datadoghq.com/security/application_security/setup/aws/lambda/go/ |
| `layouts/shortcodes/latest-lambda-layer-version.html` | `content/en/security/application_security/setup/aws/lambda/java.md` | https://docs.datadoghq.com/security/application_security/setup/aws/lambda/java/ |
| `layouts/shortcodes/latest-lambda-layer-version.html` | _...and 18 more_ | - |
| `layouts/shortcodes/learning-center-callout.html` | `content/en/cloud_cost_management/_index.md` | https://docs.datadoghq.com/cloud_cost_management/ |
| `layouts/shortcodes/learning-center-callout.html` | `content/en/containers/kubernetes/_index.md` | https://docs.datadoghq.com/containers/kubernetes/ |
| `layouts/shortcodes/learning-center-callout.html` | `content/en/containers/kubernetes/apm.md` | https://docs.datadoghq.com/containers/kubernetes/apm/ |
| `layouts/shortcodes/learning-center-callout.html` | `content/en/containers/kubernetes/appsec.md` | https://docs.datadoghq.com/containers/kubernetes/appsec/ |
| `layouts/shortcodes/learning-center-callout.html` | `content/en/continuous_integration/_index.md` | https://docs.datadoghq.com/continuous_integration/ |
| `layouts/shortcodes/learning-center-callout.html` | _...and 31 more_ | - |
| `layouts/shortcodes/link-ext.html` | _No references found_ | - |
| `layouts/shortcodes/link-github.html` | _No references found_ | - |
| `layouts/shortcodes/log-libraries-table.html` | `content/en/developers/community/libraries.md` | https://docs.datadoghq.com/developers/community/libraries/ |
| `layouts/shortcodes/mainland-china-disclaimer.en.md` | `content/en/integrations/guide/aws-manual-setup.md` | https://docs.datadoghq.com/integrations/guide/aws-manual-setup/ |
| `layouts/shortcodes/mainland-china-disclaimer.en.md` | `content/en/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function.md` | https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/ |
| `layouts/shortcodes/mapping-table.html` | `content/en/opentelemetry/integrations/apache_metrics.md` | https://docs.datadoghq.com/opentelemetry/integrations/apache_metrics/ |
| `layouts/shortcodes/mapping-table.html` | `content/en/opentelemetry/integrations/docker_metrics.md` | https://docs.datadoghq.com/opentelemetry/integrations/docker_metrics/ |
| `layouts/shortcodes/mapping-table.html` | `content/en/opentelemetry/integrations/haproxy_metrics.md` | https://docs.datadoghq.com/opentelemetry/integrations/haproxy_metrics/ |
| `layouts/shortcodes/mapping-table.html` | `content/en/opentelemetry/integrations/host_metrics.md` | https://docs.datadoghq.com/opentelemetry/integrations/host_metrics/ |
| `layouts/shortcodes/mapping-table.html` | `content/en/opentelemetry/integrations/iis_metrics.md` | https://docs.datadoghq.com/opentelemetry/integrations/iis_metrics/ |
| `layouts/shortcodes/mapping-table.html` | _...and 6 more_ | - |
| `layouts/shortcodes/mdoc/en/real_user_monitoring/session_replay/mobile/privacy_options.mdoc.md` | _No references found_ | - |
| `layouts/shortcodes/mdoc/en/real_user_monitoring/session_replay/setup_and_configuration.mdoc.md` | _No references found_ | - |
| `layouts/shortcodes/multifilter-search.html` | `content/en/cloud_cost_management/recommendations/_index.md` | https://docs.datadoghq.com/cloud_cost_management/recommendations/ |
| `layouts/shortcodes/multifilter-search.html` | `content/en/network_monitoring/devices/supported_devices.md` | https://docs.datadoghq.com/network_monitoring/devices/supported_devices/ |
| `layouts/shortcodes/multifilter-search.html` | `content/en/opentelemetry/mapping/metrics_mapping.md` | https://docs.datadoghq.com/opentelemetry/mapping/metrics_mapping/ |
| `layouts/shortcodes/multifilter-search.html` | `content/en/opentelemetry/mapping/semantic_mapping.md` | https://docs.datadoghq.com/opentelemetry/mapping/semantic_mapping/ |
| `layouts/shortcodes/multifilter-search.html` | `content/en/security/sensitive_data_scanner/scanning_rules/library_rules.md` | https://docs.datadoghq.com/security/sensitive_data_scanner/scanning_rules/library_rules/ |
| `layouts/shortcodes/multifilter-search.html` | _...and 2 more_ | - |
| `layouts/shortcodes/nextlink.html` | `content/en/account_management/audit_trail/guides/_index.md` | https://docs.datadoghq.com/account_management/audit_trail/guides/ |
| `layouts/shortcodes/nextlink.html` | `content/en/account_management/billing/_index.md` | https://docs.datadoghq.com/account_management/billing/ |
| `layouts/shortcodes/nextlink.html` | `content/en/account_management/billing/apm_tracing_profiler.md` | https://docs.datadoghq.com/account_management/billing/apm_tracing_profiler/ |
| `layouts/shortcodes/nextlink.html` | `content/en/account_management/guide/_index.md` | https://docs.datadoghq.com/account_management/guide/ |
| `layouts/shortcodes/nextlink.html` | `content/en/account_management/guide/access-your-support-ticket.md` | https://docs.datadoghq.com/account_management/guide/access-your-support-ticket/ |
| `layouts/shortcodes/nextlink.html` | _...and 220 more_ | - |
| `layouts/shortcodes/notifications-email.en.md` | `content/en/monitors/notify/_index.md` | https://docs.datadoghq.com/monitors/notify/ |
| `layouts/shortcodes/notifications-email.en.md` | `content/en/security/notifications/_index.md` | https://docs.datadoghq.com/security/notifications/ |
| `layouts/shortcodes/notifications-integrations.en.md` | `content/en/monitors/notify/_index.md` | https://docs.datadoghq.com/monitors/notify/ |
| `layouts/shortcodes/notifications-integrations.en.md` | `content/en/security/notifications/_index.md` | https://docs.datadoghq.com/security/notifications/ |
| `layouts/shortcodes/observability_pipelines/configure_existing_pipelines/destination_env_vars/google_pubsub.en.md` | _No references found_ | - |
| `layouts/shortcodes/observability_pipelines/configure_existing_pipelines/install_worker/amazon_eks.en.md` | _No references found_ | - |
| `layouts/shortcodes/observability_pipelines/configure_existing_pipelines/install_worker/azure_aks.en.md` | _No references found_ | - |
| `layouts/shortcodes/observability_pipelines/configure_existing_pipelines/install_worker/cloudformation.en.md` | _No references found_ | - |
| `layouts/shortcodes/observability_pipelines/configure_existing_pipelines/install_worker/docker.en.md` | _No references found_ | - |
| `layouts/shortcodes/observability_pipelines/configure_existing_pipelines/install_worker/google_gke.en.md` | _No references found_ | - |
| `layouts/shortcodes/observability_pipelines/configure_existing_pipelines/install_worker/kubernetes.md` | _No references found_ | - |
| `layouts/shortcodes/observability_pipelines/configure_log_archive/amazon_s3/connect_s3_to_datadog_log_archives.en.md` | _No references found_ | - |
| `layouts/shortcodes/observability_pipelines/configure_log_archive/amazon_s3/instructions.en.md` | _No references found_ | - |
| `layouts/shortcodes/observability_pipelines/configure_log_archive/azure_storage/instructions.en.md` | _No references found_ | - |
| `layouts/shortcodes/observability_pipelines/configure_log_archive/google_cloud_storage/instructions.en.md` | _No references found_ | - |
| `layouts/shortcodes/observability_pipelines/destination_settings/chronicle.en.md` | _No references found_ | - |
| `layouts/shortcodes/observability_pipelines/destination_settings/datadog_archives_amazon_s3.en.md` | _No references found_ | - |
| `layouts/shortcodes/observability_pipelines/destination_settings/datadog_archives_azure_storage.en.md` | _No references found_ | - |
| `layouts/shortcodes/observability_pipelines/destination_settings/datadog_archives_google_cloud_storage.en.md` | _No references found_ | - |
| `layouts/shortcodes/observability_pipelines/destination_settings/datadog_archives_note.en.md` | _No references found_ | - |
| `layouts/shortcodes/observability_pipelines/destination_settings/microsoft_sentinel.md` | _No references found_ | - |
| `layouts/shortcodes/observability_pipelines/destination_settings/splunk_hec.en.md` | _No references found_ | - |
| `layouts/shortcodes/observability_pipelines/install_worker/amazon_eks.en.md` | _No references found_ | - |
| `layouts/shortcodes/observability_pipelines/install_worker/azure_aks.en.md` | _No references found_ | - |
| `layouts/shortcodes/observability_pipelines/install_worker/cloudformation.en.md` | _No references found_ | - |
| `layouts/shortcodes/observability_pipelines/install_worker/docker.en.md` | _No references found_ | - |
| `layouts/shortcodes/observability_pipelines/install_worker/google_gke.en.md` | _No references found_ | - |
| `layouts/shortcodes/observability_pipelines/install_worker/kubernetes.md` | _No references found_ | - |
| `layouts/shortcodes/observability_pipelines/install_worker/linux_rpm.en.md` | _No references found_ | - |
| `layouts/shortcodes/observability_pipelines/lambda_forwarder/deploy_forwarder.md` | _No references found_ | - |
| `layouts/shortcodes/observability_pipelines/log_source_configuration/amazon_data_firehose.md` | _No references found_ | - |
| `layouts/shortcodes/observability_pipelines/log_source_configuration/datadog_agent.en.md` | _No references found_ | - |
| `layouts/shortcodes/observability_pipelines/log_source_configuration/datadog_agent_kubernetes.en.md` | _No references found_ | - |
| `layouts/shortcodes/observability_pipelines/log_source_configuration/splunk_hec.en.md` | _No references found_ | - |
| `layouts/shortcodes/observability_pipelines/log_source_configuration/splunk_tcp.en.md` | _No references found_ | - |
| `layouts/shortcodes/observability_pipelines/log_source_configuration/sumo_logic.en.md` | _No references found_ | - |
| `layouts/shortcodes/observability_pipelines/log_source_configuration/syslog.en.md` | _No references found_ | - |
| `layouts/shortcodes/observability_pipelines/metrics/buffer.en.md` | _No references found_ | - |
| `layouts/shortcodes/observability_pipelines/metrics/component.en.md` | _No references found_ | - |
| `layouts/shortcodes/observability_pipelines/metrics_types.en.md` | _No references found_ | - |
| `layouts/shortcodes/observability_pipelines/multiple_processors.md` | _No references found_ | - |
| `layouts/shortcodes/observability_pipelines/prerequisites/amazon_data_firehose.md` | _No references found_ | - |
| `layouts/shortcodes/observability_pipelines/prerequisites/amazon_security_lake.md` | _No references found_ | - |
| `layouts/shortcodes/observability_pipelines/prerequisites/datadog_agent.en.md` | _No references found_ | - |
| `layouts/shortcodes/observability_pipelines/prerequisites/datadog_agent_destination_only.en.md` | _No references found_ | - |
| `layouts/shortcodes/observability_pipelines/prerequisites/splunk_hec.en.md` | _No references found_ | - |
| `layouts/shortcodes/observability_pipelines/prerequisites/splunk_hec_destination_only.en.md` | _No references found_ | - |
| `layouts/shortcodes/observability_pipelines/prerequisites/sumo_logic.en.md` | _No references found_ | - |
| `layouts/shortcodes/observability_pipelines/prerequisites/sumo_logic_destination_only.en.md` | _No references found_ | - |
| `layouts/shortcodes/observability_pipelines/processors/add_env_vars.en.md` | _No references found_ | - |
| `layouts/shortcodes/observability_pipelines/processors/add_hostname.en.md` | _No references found_ | - |
| `layouts/shortcodes/observability_pipelines/processors/add_processors.en.md` | _No references found_ | - |
| `layouts/shortcodes/observability_pipelines/processors/add_processors_sds.en.md` | _No references found_ | - |
| `layouts/shortcodes/observability_pipelines/processors/custom_processor.md` | _No references found_ | - |
| `layouts/shortcodes/observability_pipelines/processors/dedupe.en.md` | _No references found_ | - |
| `layouts/shortcodes/observability_pipelines/processors/enrichment_table.en.md` | _No references found_ | - |
| `layouts/shortcodes/observability_pipelines/processors/filter_syntax.en.md` | _No references found_ | - |
| `layouts/shortcodes/observability_pipelines/processors/filter_syntax_metrics.en.md` | _No references found_ | - |
| `layouts/shortcodes/observability_pipelines/processors/generate_metrics.en.md` | _No references found_ | - |
| `layouts/shortcodes/observability_pipelines/processors/grok_parser.en.md` | _No references found_ | - |
| `layouts/shortcodes/observability_pipelines/processors/parse_json.en.md` | _No references found_ | - |
| `layouts/shortcodes/observability_pipelines/processors/parse_xml.md` | _No references found_ | - |
| `layouts/shortcodes/observability_pipelines/processors/quota.en.md` | _No references found_ | - |
| `layouts/shortcodes/observability_pipelines/processors/reduce.en.md` | _No references found_ | - |
| `layouts/shortcodes/observability_pipelines/processors/remap.en.md` | _No references found_ | - |
| `layouts/shortcodes/observability_pipelines/processors/sample.en.md` | _No references found_ | - |
| `layouts/shortcodes/observability_pipelines/processors/sds_custom_rules.md` | _No references found_ | - |
| `layouts/shortcodes/observability_pipelines/processors/sds_library_rules.md` | _No references found_ | - |
| `layouts/shortcodes/observability_pipelines/processors/split_array.md` | _No references found_ | - |
| `layouts/shortcodes/observability_pipelines/processors/tags_processor.md` | _No references found_ | - |
| `layouts/shortcodes/observability_pipelines/set_up_pipelines/add_another_set_of_processors_and_destinations.en.md` | _No references found_ | - |
| `layouts/shortcodes/observability_pipelines/source_settings/kafka.md` | _No references found_ | - |
| `layouts/shortcodes/observability_pipelines/use_case_images/archive_logs.en.md` | _No references found_ | - |
| `layouts/shortcodes/observability_pipelines/use_case_images/dual_ship_logs.en.md` | _No references found_ | - |
| `layouts/shortcodes/observability_pipelines/use_case_images/generate_metrics.en.md` | _No references found_ | - |
| `layouts/shortcodes/observability_pipelines/use_case_images/log_enrichment.en.md` | _No references found_ | - |
| `layouts/shortcodes/observability_pipelines/use_case_images/log_volume_control.en.md` | _No references found_ | - |
| `layouts/shortcodes/observability_pipelines/use_case_images/sensitive_data_redaction.en.md` | _No references found_ | - |
| `layouts/shortcodes/observability_pipelines/use_case_images/split_logs.en.md` | _No references found_ | - |
| `layouts/shortcodes/op-datadog-archives-s3-setup.en.md` | `content/en/observability_pipelines/legacy/setup/datadog_with_archiving.md` | https://docs.datadoghq.com/observability_pipelines/legacy/setup/datadog_with_archiving/ |
| `layouts/shortcodes/op-updating-deployment-modes.en.md` | `content/en/observability_pipelines/legacy/setup/_index.md` | https://docs.datadoghq.com/observability_pipelines/legacy/setup/ |
| `layouts/shortcodes/op-updating-deployment-modes.en.md` | `content/en/observability_pipelines/legacy/setup/datadog.md` | https://docs.datadoghq.com/observability_pipelines/legacy/setup/datadog/ |
| `layouts/shortcodes/op-updating-deployment-modes.en.md` | `content/en/observability_pipelines/legacy/setup/datadog_with_archiving.md` | https://docs.datadoghq.com/observability_pipelines/legacy/setup/datadog_with_archiving/ |
| `layouts/shortcodes/openapi-ref-docs.html` | `content/en/cloudcraft/api/_index.md` | https://docs.datadoghq.com/cloudcraft/api/ |
| `layouts/shortcodes/openapi-ref-docs.html` | `content/en/cloudcraft/api/aws-accounts/_index.md` | https://docs.datadoghq.com/cloudcraft/api/aws-accounts/ |
| `layouts/shortcodes/openapi-ref-docs.html` | `content/en/cloudcraft/api/azure-accounts/_index.md` | https://docs.datadoghq.com/cloudcraft/api/azure-accounts/ |
| `layouts/shortcodes/openapi-ref-docs.html` | `content/en/cloudcraft/api/blueprints/_index.md` | https://docs.datadoghq.com/cloudcraft/api/blueprints/ |
| `layouts/shortcodes/openapi-ref-docs.html` | `content/en/cloudcraft/api/budgets/_index.md` | https://docs.datadoghq.com/cloudcraft/api/budgets/ |
| `layouts/shortcodes/openapi-ref-docs.html` | _...and 2 more_ | - |
| `layouts/shortcodes/opentelemetry/otel-sdks.md` | _No references found_ | - |
| `layouts/shortcodes/otel-api-troubleshooting.en.md` | `content/en/opentelemetry/instrument/api_support/dotnet/logs.md` | https://docs.datadoghq.com/opentelemetry/instrument/api_support/dotnet/logs/ |
| `layouts/shortcodes/otel-api-troubleshooting.en.md` | `content/en/opentelemetry/instrument/api_support/dotnet/metrics.md` | https://docs.datadoghq.com/opentelemetry/instrument/api_support/dotnet/metrics/ |
| `layouts/shortcodes/otel-api-troubleshooting.en.md` | `content/en/opentelemetry/instrument/api_support/nodejs/logs.md` | https://docs.datadoghq.com/opentelemetry/instrument/api_support/nodejs/logs/ |
| `layouts/shortcodes/otel-api-troubleshooting.en.md` | `content/en/opentelemetry/instrument/api_support/nodejs/metrics.md` | https://docs.datadoghq.com/opentelemetry/instrument/api_support/nodejs/metrics/ |
| `layouts/shortcodes/otel-api-troubleshooting.en.md` | `content/en/opentelemetry/instrument/api_support/python/logs.md` | https://docs.datadoghq.com/opentelemetry/instrument/api_support/python/logs/ |
| `layouts/shortcodes/otel-api-troubleshooting.en.md` | _...and 2 more_ | - |
| `layouts/shortcodes/otel-custom-instrumentation-lang.en.md` | `content/en/tracing/trace_collection/custom_instrumentation/android/dd-api.md` | https://docs.datadoghq.com/tracing/trace_collection/custom_instrumentation/android/dd-api/ |
| `layouts/shortcodes/otel-custom-instrumentation-lang.en.md` | `content/en/tracing/trace_collection/custom_instrumentation/android/otel.md` | https://docs.datadoghq.com/tracing/trace_collection/custom_instrumentation/android/otel/ |
| `layouts/shortcodes/otel-custom-instrumentation-lang.en.md` | `content/en/tracing/trace_collection/custom_instrumentation/dotnet/otel.md` | https://docs.datadoghq.com/tracing/trace_collection/custom_instrumentation/dotnet/otel/ |
| `layouts/shortcodes/otel-custom-instrumentation-lang.en.md` | `content/en/tracing/trace_collection/custom_instrumentation/go/otel.md` | https://docs.datadoghq.com/tracing/trace_collection/custom_instrumentation/go/otel/ |
| `layouts/shortcodes/otel-custom-instrumentation-lang.en.md` | `content/en/tracing/trace_collection/custom_instrumentation/ios/otel.md` | https://docs.datadoghq.com/tracing/trace_collection/custom_instrumentation/ios/otel/ |
| `layouts/shortcodes/otel-custom-instrumentation-lang.en.md` | _...and 4 more_ | - |
| `layouts/shortcodes/otel-custom-instrumentation.en.md` | `content/en/tracing/trace_collection/custom_instrumentation/otel_instrumentation/_index.md` | https://docs.datadoghq.com/tracing/trace_collection/custom_instrumentation/otel_instrumentation/ |
| `layouts/shortcodes/otel-custom-instrumentation.en.md` | `content/en/tracing/trace_collection/custom_instrumentation/ruby/otel.md` | https://docs.datadoghq.com/tracing/trace_collection/custom_instrumentation/ruby/otel/ |
| `layouts/shortcodes/otel-network-requirements.en.md` | `content/en/opentelemetry/config/environment_variable_support.md` | https://docs.datadoghq.com/opentelemetry/config/environment_variable_support/ |
| `layouts/shortcodes/otel-network-requirements.en.md` | `content/en/opentelemetry/setup/ddot_collector/install/kubernetes_daemonset.md` | https://docs.datadoghq.com/opentelemetry/setup/ddot_collector/install/kubernetes_daemonset/ |
| `layouts/shortcodes/otel-network-requirements.en.md` | `content/en/opentelemetry/setup/ddot_collector/install/kubernetes_gateway.md` | https://docs.datadoghq.com/opentelemetry/setup/ddot_collector/install/kubernetes_gateway/ |
| `layouts/shortcodes/otel-network-requirements.en.md` | `content/en/opentelemetry/setup/ddot_collector/install/linux.md` | https://docs.datadoghq.com/opentelemetry/setup/ddot_collector/install/linux/ |
| `layouts/shortcodes/otel-overview-exporter.en.md` | `content/en/opentelemetry/instrument/api_support/python/logs.md` | https://docs.datadoghq.com/opentelemetry/instrument/api_support/python/logs/ |
| `layouts/shortcodes/otel-overview-exporter.en.md` | `content/en/opentelemetry/instrument/api_support/python/metrics.md` | https://docs.datadoghq.com/opentelemetry/instrument/api_support/python/metrics/ |
| `layouts/shortcodes/otel-overview-exporter.en.md` | `content/en/opentelemetry/instrument/api_support/ruby/metrics.md` | https://docs.datadoghq.com/opentelemetry/instrument/api_support/ruby/metrics/ |
| `layouts/shortcodes/otel-overview-native.en.md` | `content/en/opentelemetry/instrument/api_support/dotnet/metrics.md` | https://docs.datadoghq.com/opentelemetry/instrument/api_support/dotnet/metrics/ |
| `layouts/shortcodes/otel-overview-native.en.md` | `content/en/opentelemetry/instrument/api_support/nodejs/logs.md` | https://docs.datadoghq.com/opentelemetry/instrument/api_support/nodejs/logs/ |
| `layouts/shortcodes/otel-overview-native.en.md` | `content/en/opentelemetry/instrument/api_support/nodejs/metrics.md` | https://docs.datadoghq.com/opentelemetry/instrument/api_support/nodejs/metrics/ |
| `layouts/shortcodes/partial.html` | `content/en/account_management/audit_trail/_index.md` | https://docs.datadoghq.com/account_management/audit_trail/ |
| `layouts/shortcodes/partial.html` | `content/en/account_management/audit_trail/events.md` | https://docs.datadoghq.com/account_management/audit_trail/events/ |
| `layouts/shortcodes/partial.html` | `content/en/account_management/audit_trail/forwarding_audit_events.md` | https://docs.datadoghq.com/account_management/audit_trail/forwarding_audit_events/ |
| `layouts/shortcodes/partial.html` | `content/en/account_management/audit_trail/guides/track_dashboard_access_and_configuration_changes.md` | https://docs.datadoghq.com/account_management/audit_trail/guides/track_dashboard_access_and_configuration_changes/ |
| `layouts/shortcodes/partial.html` | `content/en/account_management/audit_trail/guides/track_monitor_access_and_configuration_changes.md` | https://docs.datadoghq.com/account_management/audit_trail/guides/track_monitor_access_and_configuration_changes/ |
| `layouts/shortcodes/partial.html` | _...and 1974 more_ | - |
| `layouts/shortcodes/pci-apm.en.md` | _No references found_ | - |
| `layouts/shortcodes/pci-logs.en.md` | _No references found_ | - |
| `layouts/shortcodes/permissions.html` | `content/en/account_management/rbac/permissions.md` | https://docs.datadoghq.com/account_management/rbac/permissions/ |
| `layouts/shortcodes/private-action-runner-version.html` | `content/en/actions/private_actions/run_script.md` | https://docs.datadoghq.com/actions/private_actions/run_script/ |
| `layouts/shortcodes/private-action-runner-version.html` | `content/en/actions/private_actions/update_private_action_runner.md` | https://docs.datadoghq.com/actions/private_actions/update_private_action_runner/ |
| `layouts/shortcodes/product-availability.html` | `content/en/ddsql_reference/_index.md` | https://docs.datadoghq.com/ddsql_reference/ |
| `layouts/shortcodes/product-availability.html` | `content/en/ddsql_reference/ddsql_preview.md` | https://docs.datadoghq.com/ddsql_reference/ddsql_preview/ |
| `layouts/shortcodes/product-availability.html` | `content/en/observability_pipelines/destinations/amazon_opensearch.md` | https://docs.datadoghq.com/observability_pipelines/destinations/amazon_opensearch/ |
| `layouts/shortcodes/product-availability.html` | `content/en/observability_pipelines/destinations/amazon_s3.md` | https://docs.datadoghq.com/observability_pipelines/destinations/amazon_s3/ |
| `layouts/shortcodes/product-availability.html` | `content/en/observability_pipelines/destinations/amazon_security_lake.md` | https://docs.datadoghq.com/observability_pipelines/destinations/amazon_security_lake/ |
| `layouts/shortcodes/product-availability.html` | _...and 68 more_ | - |
| `layouts/shortcodes/programming-lang-wrapper.html` | `content/en/api/latest/_index.md` | https://docs.datadoghq.com/api/latest/ |
| `layouts/shortcodes/programming-lang-wrapper.html` | `content/en/cloudcraft/api/_index.md` | https://docs.datadoghq.com/cloudcraft/api/ |
| `layouts/shortcodes/programming-lang-wrapper.html` | `content/en/containers/amazon_ecs/apm.md` | https://docs.datadoghq.com/containers/amazon_ecs/apm/ |
| `layouts/shortcodes/programming-lang-wrapper.html` | `content/en/containers/docker/apm.md` | https://docs.datadoghq.com/containers/docker/apm/ |
| `layouts/shortcodes/programming-lang-wrapper.html` | `content/en/developers/dogstatsd/_index.md` | https://docs.datadoghq.com/developers/dogstatsd/ |
| `layouts/shortcodes/programming-lang-wrapper.html` | _...and 29 more_ | - |
| `layouts/shortcodes/programming-lang.html` | `content/en/api/latest/_index.md` | https://docs.datadoghq.com/api/latest/ |
| `layouts/shortcodes/programming-lang.html` | `content/en/cloudcraft/api/_index.md` | https://docs.datadoghq.com/cloudcraft/api/ |
| `layouts/shortcodes/programming-lang.html` | `content/en/containers/amazon_ecs/apm.md` | https://docs.datadoghq.com/containers/amazon_ecs/apm/ |
| `layouts/shortcodes/programming-lang.html` | `content/en/containers/docker/apm.md` | https://docs.datadoghq.com/containers/docker/apm/ |
| `layouts/shortcodes/programming-lang.html` | `content/en/developers/dogstatsd/_index.md` | https://docs.datadoghq.com/developers/dogstatsd/ |
| `layouts/shortcodes/programming-lang.html` | _...and 29 more_ | - |
| `layouts/shortcodes/region-param.html` | `content/en/account_management/_index.md` | https://docs.datadoghq.com/account_management/ |
| `layouts/shortcodes/region-param.html` | `content/en/account_management/authn_mapping/_index.md` | https://docs.datadoghq.com/account_management/authn_mapping/ |
| `layouts/shortcodes/region-param.html` | `content/en/account_management/cloud_provider_authentication.md` | https://docs.datadoghq.com/account_management/cloud_provider_authentication/ |
| `layouts/shortcodes/region-param.html` | `content/en/account_management/faq/help-my-password-email-never-came-through.md` | https://docs.datadoghq.com/account_management/faq/help-my-password-email-never-came-through/ |
| `layouts/shortcodes/region-param.html` | `content/en/account_management/multi_organization.md` | https://docs.datadoghq.com/account_management/multi_organization/ |
| `layouts/shortcodes/region-param.html` | _...and 218 more_ | - |
| `layouts/shortcodes/related-links.html` | _No references found_ | - |
| `layouts/shortcodes/related-logs-supported-resources.html` | `content/en/security/cloud_security_management/guide/related-logs.md` | https://docs.datadoghq.com/security/cloud_security_management/guide/related-logs/ |
| `layouts/shortcodes/rum-browser-auto-instrumentation-update-user-attributes.md` | `content/en/real_user_monitoring/application_monitoring/browser/setup/server/apache.md` | https://docs.datadoghq.com/real_user_monitoring/application_monitoring/browser/setup/server/apache/ |
| `layouts/shortcodes/rum-browser-auto-instrumentation-update-user-attributes.md` | `content/en/real_user_monitoring/application_monitoring/browser/setup/server/ibm.md` | https://docs.datadoghq.com/real_user_monitoring/application_monitoring/browser/setup/server/ibm/ |
| `layouts/shortcodes/rum-browser-auto-instrumentation-update-user-attributes.md` | `content/en/real_user_monitoring/application_monitoring/browser/setup/server/nginx.md` | https://docs.datadoghq.com/real_user_monitoring/application_monitoring/browser/setup/server/nginx/ |
| `layouts/shortcodes/rum-browser-auto-instrumentation-update-user-attributes.md` | `content/en/real_user_monitoring/application_monitoring/browser/setup/server/windows_iis.md` | https://docs.datadoghq.com/real_user_monitoring/application_monitoring/browser/setup/server/windows_iis/ |
| `layouts/shortcodes/sa-rule-list.html` | _No references found_ | - |
| `layouts/shortcodes/sci-dd-git-env-variables.en.md` | `content/en/integrations/guide/source-code-integration.md` | https://docs.datadoghq.com/integrations/guide/source-code-integration/ |
| `layouts/shortcodes/sci-dd-setuptools-unified-python.en.md` | `content/en/integrations/guide/source-code-integration.md` | https://docs.datadoghq.com/integrations/guide/source-code-integration/ |
| `layouts/shortcodes/sci-dd-tags-bundled-node-js.en.md` | `content/en/integrations/guide/source-code-integration.md` | https://docs.datadoghq.com/integrations/guide/source-code-integration/ |
| `layouts/shortcodes/sci-dd-tags-env-variable.en.md` | `content/en/integrations/guide/source-code-integration.md` | https://docs.datadoghq.com/integrations/guide/source-code-integration/ |
| `layouts/shortcodes/sci-dd-tracing-library.en.md` | `content/en/integrations/guide/source-code-integration.md` | https://docs.datadoghq.com/integrations/guide/source-code-integration/ |
| `layouts/shortcodes/sdk-version.html` | `content/en/api/latest/_index.md` | https://docs.datadoghq.com/api/latest/ |
| `layouts/shortcodes/sdk-version.html` | `content/en/developers/integrations/python.md` | https://docs.datadoghq.com/developers/integrations/python/ |
| `layouts/shortcodes/sds-mask-action.md` | `content/en/logs/guide/manage-sensitive-logs-data-access.md` | https://docs.datadoghq.com/logs/guide/manage-sensitive-logs-data-access/ |
| `layouts/shortcodes/sds-mask-action.md` | `content/en/security/sensitive_data_scanner/setup/telemetry_data.md` | https://docs.datadoghq.com/security/sensitive_data_scanner/setup/telemetry_data/ |
| `layouts/shortcodes/sds-scanning-rule.en.md` | `content/en/security/sensitive_data_scanner/setup/telemetry_data.md` | https://docs.datadoghq.com/security/sensitive_data_scanner/setup/telemetry_data/ |
| `layouts/shortcodes/sds-suppressions.en.md` | `content/en/security/sensitive_data_scanner/setup/telemetry_data.md` | https://docs.datadoghq.com/security/sensitive_data_scanner/setup/telemetry_data/ |
| `layouts/shortcodes/security-products/link-findings-to-datadog-services-and-teams.en.md` | _No references found_ | - |
| `layouts/shortcodes/semantic-color.en.md` | `content/en/dashboards/guide/compatible_semantic_tags.md` | https://docs.datadoghq.com/dashboards/guide/compatible_semantic_tags/ |
| `layouts/shortcodes/semantic-color.html` | `content/en/dashboards/guide/compatible_semantic_tags.md` | https://docs.datadoghq.com/dashboards/guide/compatible_semantic_tags/ |
| `layouts/shortcodes/semantic-color.md` | `content/en/dashboards/guide/compatible_semantic_tags.md` | https://docs.datadoghq.com/dashboards/guide/compatible_semantic_tags/ |
| `layouts/shortcodes/serverless-init-configure.html` | `content/en/serverless/azure_container_apps/in_container/dotnet.md` | https://docs.datadoghq.com/serverless/azure_container_apps/in_container/dotnet/ |
| `layouts/shortcodes/serverless-init-configure.html` | `content/en/serverless/azure_container_apps/in_container/go.md` | https://docs.datadoghq.com/serverless/azure_container_apps/in_container/go/ |
| `layouts/shortcodes/serverless-init-configure.html` | `content/en/serverless/azure_container_apps/in_container/java.md` | https://docs.datadoghq.com/serverless/azure_container_apps/in_container/java/ |
| `layouts/shortcodes/serverless-init-configure.html` | `content/en/serverless/azure_container_apps/in_container/nodejs.md` | https://docs.datadoghq.com/serverless/azure_container_apps/in_container/nodejs/ |
| `layouts/shortcodes/serverless-init-configure.html` | `content/en/serverless/azure_container_apps/in_container/php.md` | https://docs.datadoghq.com/serverless/azure_container_apps/in_container/php/ |
| `layouts/shortcodes/serverless-init-configure.html` | _...and 14 more_ | - |
| `layouts/shortcodes/serverless-init-env-vars-in-container.html` | `content/en/serverless/azure_container_apps/in_container/dotnet.md` | https://docs.datadoghq.com/serverless/azure_container_apps/in_container/dotnet/ |
| `layouts/shortcodes/serverless-init-env-vars-in-container.html` | `content/en/serverless/azure_container_apps/in_container/go.md` | https://docs.datadoghq.com/serverless/azure_container_apps/in_container/go/ |
| `layouts/shortcodes/serverless-init-env-vars-in-container.html` | `content/en/serverless/azure_container_apps/in_container/java.md` | https://docs.datadoghq.com/serverless/azure_container_apps/in_container/java/ |
| `layouts/shortcodes/serverless-init-env-vars-in-container.html` | `content/en/serverless/azure_container_apps/in_container/nodejs.md` | https://docs.datadoghq.com/serverless/azure_container_apps/in_container/nodejs/ |
| `layouts/shortcodes/serverless-init-env-vars-in-container.html` | `content/en/serverless/azure_container_apps/in_container/php.md` | https://docs.datadoghq.com/serverless/azure_container_apps/in_container/php/ |
| `layouts/shortcodes/serverless-init-env-vars-in-container.html` | _...and 14 more_ | - |
| `layouts/shortcodes/serverless-init-env-vars-sidecar.html` | `content/en/serverless/azure_container_apps/sidecar/dotnet.md` | https://docs.datadoghq.com/serverless/azure_container_apps/sidecar/dotnet/ |
| `layouts/shortcodes/serverless-init-env-vars-sidecar.html` | `content/en/serverless/azure_container_apps/sidecar/go.md` | https://docs.datadoghq.com/serverless/azure_container_apps/sidecar/go/ |
| `layouts/shortcodes/serverless-init-env-vars-sidecar.html` | `content/en/serverless/azure_container_apps/sidecar/java.md` | https://docs.datadoghq.com/serverless/azure_container_apps/sidecar/java/ |
| `layouts/shortcodes/serverless-init-env-vars-sidecar.html` | `content/en/serverless/azure_container_apps/sidecar/nodejs.md` | https://docs.datadoghq.com/serverless/azure_container_apps/sidecar/nodejs/ |
| `layouts/shortcodes/serverless-init-env-vars-sidecar.html` | `content/en/serverless/azure_container_apps/sidecar/php.md` | https://docs.datadoghq.com/serverless/azure_container_apps/sidecar/php/ |
| `layouts/shortcodes/serverless-init-env-vars-sidecar.html` | _...and 15 more_ | - |
| `layouts/shortcodes/serverless-init-install.html` | `content/en/serverless/azure_container_apps/in_container/dotnet.md` | https://docs.datadoghq.com/serverless/azure_container_apps/in_container/dotnet/ |
| `layouts/shortcodes/serverless-init-install.html` | `content/en/serverless/azure_container_apps/in_container/go.md` | https://docs.datadoghq.com/serverless/azure_container_apps/in_container/go/ |
| `layouts/shortcodes/serverless-init-install.html` | `content/en/serverless/azure_container_apps/in_container/java.md` | https://docs.datadoghq.com/serverless/azure_container_apps/in_container/java/ |
| `layouts/shortcodes/serverless-init-install.html` | `content/en/serverless/azure_container_apps/in_container/nodejs.md` | https://docs.datadoghq.com/serverless/azure_container_apps/in_container/nodejs/ |
| `layouts/shortcodes/serverless-init-install.html` | `content/en/serverless/azure_container_apps/in_container/php.md` | https://docs.datadoghq.com/serverless/azure_container_apps/in_container/php/ |
| `layouts/shortcodes/serverless-init-install.html` | _...and 28 more_ | - |
| `layouts/shortcodes/serverless-init-troubleshooting.en.md` | `content/en/serverless/azure_container_apps/in_container/dotnet.md` | https://docs.datadoghq.com/serverless/azure_container_apps/in_container/dotnet/ |
| `layouts/shortcodes/serverless-init-troubleshooting.en.md` | `content/en/serverless/azure_container_apps/in_container/go.md` | https://docs.datadoghq.com/serverless/azure_container_apps/in_container/go/ |
| `layouts/shortcodes/serverless-init-troubleshooting.en.md` | `content/en/serverless/azure_container_apps/in_container/java.md` | https://docs.datadoghq.com/serverless/azure_container_apps/in_container/java/ |
| `layouts/shortcodes/serverless-init-troubleshooting.en.md` | `content/en/serverless/azure_container_apps/in_container/nodejs.md` | https://docs.datadoghq.com/serverless/azure_container_apps/in_container/nodejs/ |
| `layouts/shortcodes/serverless-init-troubleshooting.en.md` | `content/en/serverless/azure_container_apps/in_container/php.md` | https://docs.datadoghq.com/serverless/azure_container_apps/in_container/php/ |
| `layouts/shortcodes/serverless-init-troubleshooting.en.md` | _...and 34 more_ | - |
| `layouts/shortcodes/serverless-libraries-table.html` | `content/en/developers/community/libraries.md` | https://docs.datadoghq.com/developers/community/libraries/ |
| `layouts/shortcodes/site-region.html` | `content/en/account_management/_index.md` | https://docs.datadoghq.com/account_management/ |
| `layouts/shortcodes/site-region.html` | `content/en/account_management/api-app-keys.md` | https://docs.datadoghq.com/account_management/api-app-keys/ |
| `layouts/shortcodes/site-region.html` | `content/en/account_management/org_settings/service_accounts.md` | https://docs.datadoghq.com/account_management/org_settings/service_accounts/ |
| `layouts/shortcodes/site-region.html` | `content/en/account_management/saml/_index.md` | https://docs.datadoghq.com/account_management/saml/ |
| `layouts/shortcodes/site-region.html` | `content/en/account_management/saml/configuration.md` | https://docs.datadoghq.com/account_management/saml/configuration/ |
| `layouts/shortcodes/site-region.html` | _...and 121 more_ | - |
| `layouts/shortcodes/svl-lambda-fips.md` | `content/en/serverless/aws_lambda/instrumentation/dotnet.md` | https://docs.datadoghq.com/serverless/aws_lambda/instrumentation/dotnet/ |
| `layouts/shortcodes/svl-lambda-fips.md` | `content/en/serverless/aws_lambda/instrumentation/go.md` | https://docs.datadoghq.com/serverless/aws_lambda/instrumentation/go/ |
| `layouts/shortcodes/svl-lambda-fips.md` | `content/en/serverless/aws_lambda/instrumentation/java.md` | https://docs.datadoghq.com/serverless/aws_lambda/instrumentation/java/ |
| `layouts/shortcodes/svl-lambda-fips.md` | `content/en/serverless/aws_lambda/instrumentation/nodejs.md` | https://docs.datadoghq.com/serverless/aws_lambda/instrumentation/nodejs/ |
| `layouts/shortcodes/svl-lambda-fips.md` | `content/en/serverless/aws_lambda/instrumentation/python.md` | https://docs.datadoghq.com/serverless/aws_lambda/instrumentation/python/ |
| `layouts/shortcodes/svl-lambda-fips.md` | _...and 1 more_ | - |
| `layouts/shortcodes/synthetics-alerting-monitoring-network-path.en.md` | `content/en/synthetics/network_path_tests/_index.md` | https://docs.datadoghq.com/synthetics/network_path_tests/ |
| `layouts/shortcodes/synthetics-alerting-monitoring.en.md` | `content/en/synthetics/api_tests/dns_tests.md` | https://docs.datadoghq.com/synthetics/api_tests/dns_tests/ |
| `layouts/shortcodes/synthetics-alerting-monitoring.en.md` | `content/en/synthetics/api_tests/grpc_tests.md` | https://docs.datadoghq.com/synthetics/api_tests/grpc_tests/ |
| `layouts/shortcodes/synthetics-alerting-monitoring.en.md` | `content/en/synthetics/api_tests/http_tests.md` | https://docs.datadoghq.com/synthetics/api_tests/http_tests/ |
| `layouts/shortcodes/synthetics-alerting-monitoring.en.md` | `content/en/synthetics/api_tests/icmp_tests.md` | https://docs.datadoghq.com/synthetics/api_tests/icmp_tests/ |
| `layouts/shortcodes/synthetics-alerting-monitoring.en.md` | `content/en/synthetics/api_tests/ssl_tests.md` | https://docs.datadoghq.com/synthetics/api_tests/ssl_tests/ |
| `layouts/shortcodes/synthetics-alerting-monitoring.en.md` | _...and 4 more_ | - |
| `layouts/shortcodes/synthetics-api-tests-snippets.en.md` | `content/en/synthetics/api_tests/dns_tests.md` | https://docs.datadoghq.com/synthetics/api_tests/dns_tests/ |
| `layouts/shortcodes/synthetics-api-tests-snippets.en.md` | `content/en/synthetics/api_tests/grpc_tests.md` | https://docs.datadoghq.com/synthetics/api_tests/grpc_tests/ |
| `layouts/shortcodes/synthetics-api-tests-snippets.en.md` | `content/en/synthetics/api_tests/http_tests.md` | https://docs.datadoghq.com/synthetics/api_tests/http_tests/ |
| `layouts/shortcodes/synthetics-api-tests-snippets.en.md` | `content/en/synthetics/api_tests/icmp_tests.md` | https://docs.datadoghq.com/synthetics/api_tests/icmp_tests/ |
| `layouts/shortcodes/synthetics-api-tests-snippets.en.md` | `content/en/synthetics/api_tests/ssl_tests.md` | https://docs.datadoghq.com/synthetics/api_tests/ssl_tests/ |
| `layouts/shortcodes/synthetics-api-tests-snippets.en.md` | _...and 3 more_ | - |
| `layouts/shortcodes/synthetics-variables.en.md` | `content/en/synthetics/api_tests/dns_tests.md` | https://docs.datadoghq.com/synthetics/api_tests/dns_tests/ |
| `layouts/shortcodes/synthetics-variables.en.md` | `content/en/synthetics/api_tests/grpc_tests.md` | https://docs.datadoghq.com/synthetics/api_tests/grpc_tests/ |
| `layouts/shortcodes/synthetics-variables.en.md` | `content/en/synthetics/api_tests/http_tests.md` | https://docs.datadoghq.com/synthetics/api_tests/http_tests/ |
| `layouts/shortcodes/synthetics-variables.en.md` | `content/en/synthetics/api_tests/icmp_tests.md` | https://docs.datadoghq.com/synthetics/api_tests/icmp_tests/ |
| `layouts/shortcodes/synthetics-variables.en.md` | `content/en/synthetics/api_tests/ssl_tests.md` | https://docs.datadoghq.com/synthetics/api_tests/ssl_tests/ |
| `layouts/shortcodes/synthetics-variables.en.md` | _...and 6 more_ | - |
| `layouts/shortcodes/synthetics-worker-version.html` | `content/en/getting_started/synthetics/private_location.md` | https://docs.datadoghq.com/getting_started/synthetics/private_location/ |
| `layouts/shortcodes/synthetics-worker-version.html` | `content/en/synthetics/platform/private_locations/_index.md` | https://docs.datadoghq.com/synthetics/platform/private_locations/ |
| `layouts/shortcodes/synthetics_grace_permissions.md` | `content/en/synthetics/api_tests/dns_tests.md` | https://docs.datadoghq.com/synthetics/api_tests/dns_tests/ |
| `layouts/shortcodes/synthetics_grace_permissions.md` | `content/en/synthetics/api_tests/grpc_tests.md` | https://docs.datadoghq.com/synthetics/api_tests/grpc_tests/ |
| `layouts/shortcodes/synthetics_grace_permissions.md` | `content/en/synthetics/api_tests/http_tests.md` | https://docs.datadoghq.com/synthetics/api_tests/http_tests/ |
| `layouts/shortcodes/synthetics_grace_permissions.md` | `content/en/synthetics/api_tests/icmp_tests.md` | https://docs.datadoghq.com/synthetics/api_tests/icmp_tests/ |
| `layouts/shortcodes/synthetics_grace_permissions.md` | `content/en/synthetics/api_tests/ssl_tests.md` | https://docs.datadoghq.com/synthetics/api_tests/ssl_tests/ |
| `layouts/shortcodes/synthetics_grace_permissions.md` | _...and 4 more_ | - |
| `layouts/shortcodes/tab.html` | `content/en/account_management/audit_trail/forwarding_audit_events.md` | https://docs.datadoghq.com/account_management/audit_trail/forwarding_audit_events/ |
| `layouts/shortcodes/tab.html` | `content/en/account_management/authn_mapping/_index.md` | https://docs.datadoghq.com/account_management/authn_mapping/ |
| `layouts/shortcodes/tab.html` | `content/en/account_management/billing/custom_metrics.md` | https://docs.datadoghq.com/account_management/billing/custom_metrics/ |
| `layouts/shortcodes/tab.html` | `content/en/account_management/org_settings/domain_allowlist_api.md` | https://docs.datadoghq.com/account_management/org_settings/domain_allowlist_api/ |
| `layouts/shortcodes/tab.html` | `content/en/account_management/rbac/_index.md` | https://docs.datadoghq.com/account_management/rbac/ |
| `layouts/shortcodes/tab.html` | _...and 623 more_ | - |
| `layouts/shortcodes/table.html` | `content/en/real_user_monitoring/guide/proxy-rum-data.mdoc.md` | https://docs.datadoghq.com/real_user_monitoring/guide/proxy-rum-data.mdoc/ |
| `layouts/shortcodes/tabs.html` | `content/en/account_management/audit_trail/forwarding_audit_events.md` | https://docs.datadoghq.com/account_management/audit_trail/forwarding_audit_events/ |
| `layouts/shortcodes/tabs.html` | `content/en/account_management/authn_mapping/_index.md` | https://docs.datadoghq.com/account_management/authn_mapping/ |
| `layouts/shortcodes/tabs.html` | `content/en/account_management/billing/custom_metrics.md` | https://docs.datadoghq.com/account_management/billing/custom_metrics/ |
| `layouts/shortcodes/tabs.html` | `content/en/account_management/org_settings/domain_allowlist_api.md` | https://docs.datadoghq.com/account_management/org_settings/domain_allowlist_api/ |
| `layouts/shortcodes/tabs.html` | `content/en/account_management/rbac/_index.md` | https://docs.datadoghq.com/account_management/rbac/ |
| `layouts/shortcodes/tabs.html` | _...and 623 more_ | - |
| `layouts/shortcodes/tag-set-examples.html` | _No references found_ | - |
| `layouts/shortcodes/tile-nav.html` | _No references found_ | - |
| `layouts/shortcodes/tooltip.html` | `content/en/agent/guide/datadog-disaster-recovery.md` | https://docs.datadoghq.com/agent/guide/datadog-disaster-recovery/ |
| `layouts/shortcodes/tooltip.html` | `content/en/agent/guide/setup_remote_config.md` | https://docs.datadoghq.com/agent/guide/setup_remote_config/ |
| `layouts/shortcodes/tooltip.html` | `content/en/change_tracking/_index.md` | https://docs.datadoghq.com/change_tracking/ |
| `layouts/shortcodes/tooltip.html` | `content/en/cloud_cost_management/allocation/container_cost_allocation.md` | https://docs.datadoghq.com/cloud_cost_management/allocation/container_cost_allocation/ |
| `layouts/shortcodes/tooltip.html` | `content/en/cloud_cost_management/planning/commitment_programs.md` | https://docs.datadoghq.com/cloud_cost_management/planning/commitment_programs/ |
| `layouts/shortcodes/tooltip.html` | _...and 28 more_ | - |
| `layouts/shortcodes/tracing-libraries-table.html` | `content/en/developers/community/libraries.md` | https://docs.datadoghq.com/developers/community/libraries/ |
| `layouts/shortcodes/translate.html` | `content/en/account_management/billing/custom_metrics.md` | https://docs.datadoghq.com/account_management/billing/custom_metrics/ |
| `layouts/shortcodes/translate.html` | `content/en/administrators_guide/plan.md` | https://docs.datadoghq.com/administrators_guide/plan/ |
| `layouts/shortcodes/translate.html` | `content/en/administrators_guide/run.md` | https://docs.datadoghq.com/administrators_guide/run/ |
| `layouts/shortcodes/translate.html` | `content/en/agent/guide/why-should-i-install-the-agent-on-my-cloud-instances.md` | https://docs.datadoghq.com/agent/guide/why-should-i-install-the-agent-on-my-cloud-instances/ |
| `layouts/shortcodes/translate.html` | `content/en/getting_started/application/_index.md` | https://docs.datadoghq.com/getting_started/application/ |
| `layouts/shortcodes/translate.html` | _...and 14 more_ | - |
| `layouts/shortcodes/try-rule-banner.html` | `content/en/security/code_security/static_analysis/static_analysis_rules/apex-code-style/avoid-global.md` | https://docs.datadoghq.com/security/code_security/static_analysis/static_analysis_rules/apex-code-style/avoid-global/ |
| `layouts/shortcodes/try-rule-banner.html` | `content/en/security/code_security/static_analysis/static_analysis_rules/apex-code-style/class-name.md` | https://docs.datadoghq.com/security/code_security/static_analysis/static_analysis_rules/apex-code-style/class-name/ |
| `layouts/shortcodes/try-rule-banner.html` | `content/en/security/code_security/static_analysis/static_analysis_rules/apex-code-style/function-name.md` | https://docs.datadoghq.com/security/code_security/static_analysis/static_analysis_rules/apex-code-style/function-name/ |
| `layouts/shortcodes/try-rule-banner.html` | `content/en/security/code_security/static_analysis/static_analysis_rules/apex-code-style/hardcoded-record-id.md` | https://docs.datadoghq.com/security/code_security/static_analysis/static_analysis_rules/apex-code-style/hardcoded-record-id/ |
| `layouts/shortcodes/try-rule-banner.html` | `content/en/security/code_security/static_analysis/static_analysis_rules/apex-code-style/inverted-boolean-logic.md` | https://docs.datadoghq.com/security/code_security/static_analysis/static_analysis_rules/apex-code-style/inverted-boolean-logic/ |
| `layouts/shortcodes/try-rule-banner.html` | _...and 1106 more_ | - |
| `layouts/shortcodes/try-rule-cta.html` | `content/en/security/code_security/static_analysis/static_analysis_rules/apex-code-style/avoid-global.md` | https://docs.datadoghq.com/security/code_security/static_analysis/static_analysis_rules/apex-code-style/avoid-global/ |
| `layouts/shortcodes/try-rule-cta.html` | `content/en/security/code_security/static_analysis/static_analysis_rules/apex-code-style/class-name.md` | https://docs.datadoghq.com/security/code_security/static_analysis/static_analysis_rules/apex-code-style/class-name/ |
| `layouts/shortcodes/try-rule-cta.html` | `content/en/security/code_security/static_analysis/static_analysis_rules/apex-code-style/function-name.md` | https://docs.datadoghq.com/security/code_security/static_analysis/static_analysis_rules/apex-code-style/function-name/ |
| `layouts/shortcodes/try-rule-cta.html` | `content/en/security/code_security/static_analysis/static_analysis_rules/apex-code-style/hardcoded-record-id.md` | https://docs.datadoghq.com/security/code_security/static_analysis/static_analysis_rules/apex-code-style/hardcoded-record-id/ |
| `layouts/shortcodes/try-rule-cta.html` | `content/en/security/code_security/static_analysis/static_analysis_rules/apex-code-style/inverted-boolean-logic.md` | https://docs.datadoghq.com/security/code_security/static_analysis/static_analysis_rules/apex-code-style/inverted-boolean-logic/ |
| `layouts/shortcodes/try-rule-cta.html` | _...and 1106 more_ | - |
| `layouts/shortcodes/uninstall-agent.html` | `content/en/agent/guide/how-do-i-uninstall-the-agent.md` | https://docs.datadoghq.com/agent/guide/how-do-i-uninstall-the-agent/ |
| `layouts/shortcodes/version.html` | `content/en/opentelemetry/setup/ddot_collector/custom_components.md` | https://docs.datadoghq.com/opentelemetry/setup/ddot_collector/custom_components/ |
| `layouts/shortcodes/vimeo.html` | `content/en/actions/workflows/_index.md` | https://docs.datadoghq.com/actions/workflows/ |
| `layouts/shortcodes/vimeo.html` | `content/en/continuous_integration/_index.md` | https://docs.datadoghq.com/continuous_integration/ |
| `layouts/shortcodes/vimeo.html` | `content/en/dashboards/functions/algorithms.md` | https://docs.datadoghq.com/dashboards/functions/algorithms/ |
| `layouts/shortcodes/vimeo.html` | `content/en/logs/_index.md` | https://docs.datadoghq.com/logs/ |
| `layouts/shortcodes/vimeo.html` | `content/en/network_monitoring/cloud_network_monitoring/_index.md` | https://docs.datadoghq.com/network_monitoring/cloud_network_monitoring/ |
| `layouts/shortcodes/vimeo.html` | _...and 5 more_ | - |
| `layouts/shortcodes/vrl-errors.html` | `content/en/observability_pipelines/legacy/reference/processing_language/errors.md` | https://docs.datadoghq.com/observability_pipelines/legacy/reference/processing_language/errors/ |
| `layouts/shortcodes/vrl-functions.html` | `content/en/observability_pipelines/legacy/reference/processing_language/functions.md` | https://docs.datadoghq.com/observability_pipelines/legacy/reference/processing_language/functions/ |
| `layouts/shortcodes/vrl-functions.html` | `content/en/observability_pipelines/processors/custom_processor.md` | https://docs.datadoghq.com/observability_pipelines/processors/custom_processor/ |
| `layouts/shortcodes/whatsnext.html` | `content/en/account_management/audit_trail/guides/_index.md` | https://docs.datadoghq.com/account_management/audit_trail/guides/ |
| `layouts/shortcodes/whatsnext.html` | `content/en/account_management/billing/_index.md` | https://docs.datadoghq.com/account_management/billing/ |
| `layouts/shortcodes/whatsnext.html` | `content/en/account_management/billing/apm_tracing_profiler.md` | https://docs.datadoghq.com/account_management/billing/apm_tracing_profiler/ |
| `layouts/shortcodes/whatsnext.html` | `content/en/account_management/guide/_index.md` | https://docs.datadoghq.com/account_management/guide/ |
| `layouts/shortcodes/whatsnext.html` | `content/en/account_management/guide/access-your-support-ticket.md` | https://docs.datadoghq.com/account_management/guide/access-your-support-ticket/ |
| `layouts/shortcodes/whatsnext.html` | _...and 219 more_ | - |
| `layouts/shortcodes/wistia.html` | _No references found_ | - |

### Shortcode Descriptions


## layouts/shortcodes/X.html

Hugo template tooling


**Used in 62 document(s)**


## layouts/shortcodes/aap/aap_and_api_protection_dotnet_navigation_menu.html

Hugo template tooling


**No references found**


## layouts/shortcodes/aap/aap_and_api_protection_dotnet_overview.md

Hugo template tooling


**No references found**


## layouts/shortcodes/aap/aap_and_api_protection_dotnet_setup_options.md

Hugo template tooling


**No references found**


## layouts/shortcodes/aap/aap_and_api_protection_nodejs_navigation_menu.html

Hugo template tooling


**No references found**


## layouts/shortcodes/aap/aap_and_api_protection_nodejs_overview.md

Hugo template tooling


**No references found**


## layouts/shortcodes/aap/aap_and_api_protection_nodejs_remote_config_activation.md

Hugo template tooling


**No references found**


## layouts/shortcodes/aap/aap_and_api_protection_nodejs_setup_options.md

Hugo template tooling


**No references found**


## layouts/shortcodes/aas-workflow-linux.en.md

Hugo template tooling


**Used in 3 document(s)**


## layouts/shortcodes/aas-workflow-windows.en.md

Hugo template tooling


**Used in 1 document(s)**


## layouts/shortcodes/absLangUrl.html

Hugo template tooling


**No references found**


## layouts/shortcodes/aca-container-options.html

Hugo template tooling


**Used in 1 document(s)**


## layouts/shortcodes/aca-install-sidecar-arm-template.md

Hugo template tooling


**Used in 7 document(s)**


## layouts/shortcodes/aca-install-sidecar-bicep.md

Hugo template tooling


**Used in 7 document(s)**


## layouts/shortcodes/aca-install-sidecar-datadog-ci.md

Hugo template tooling


**Used in 7 document(s)**


## layouts/shortcodes/aca-install-sidecar-terraform.md

Hugo template tooling


**Used in 7 document(s)**


## layouts/shortcodes/account_management/audit_events.html

convert description text with brackets into hyperlinks


**No references found**


## layouts/shortcodes/agent-config.html

Hugo template tooling


**Used in 1 document(s)**


## layouts/shortcodes/agent-dual-shipping.en.md

Hugo template tooling


**Used in 1 document(s)**


## layouts/shortcodes/android-otel-note.en.md

Hugo template tooling


**Used in 3 document(s)**


## layouts/shortcodes/api-scopes.html

For each scope find the common tags and group them together


**Used in 1 document(s)**


## layouts/shortcodes/apicode.html

Hugo template tooling


**No references found**


## layouts/shortcodes/apicontent.html

Hugo template tooling


**No references found**


## layouts/shortcodes/apm-ootb-graphs.en.md

Hugo template tooling


**Used in 2 document(s)**


## layouts/shortcodes/apm-ssi-uninstall-linux.en.md

Hugo template tooling


**No references found**


## layouts/shortcodes/app-and-api-protection-ruby-overview.md

Hugo template tooling


**Used in 6 document(s)**


## layouts/shortcodes/app-and-api-protection-ruby-setup-options.md

Hugo template tooling


**Used in 3 document(s)**


## layouts/shortcodes/app_and_api_protection_java_overview.md

Hugo template tooling


**Used in 7 document(s)**


## layouts/shortcodes/app_and_api_protection_java_setup_options.md

Hugo template tooling


**Used in 3 document(s)**


## layouts/shortcodes/app_and_api_protection_navigation_menu.html

Hugo template tooling


**Used in 7 document(s)**


## layouts/shortcodes/app_and_api_protection_php_navigation_menu.html

Hugo template tooling


**Used in 4 document(s)**


## layouts/shortcodes/app_and_api_protection_php_overview.md

Hugo template tooling


**Used in 5 document(s)**


## layouts/shortcodes/app_and_api_protection_php_setup_options.html

Hugo template tooling


**Used in 3 document(s)**


## layouts/shortcodes/app_and_api_protection_python_navigation_menu.html

Hugo template tooling


**Used in 6 document(s)**


## layouts/shortcodes/app_and_api_protection_python_overview.md

Hugo template tooling


**Used in 7 document(s)**


## layouts/shortcodes/app_and_api_protection_python_setup_options.md

Hugo template tooling


**Used in 3 document(s)**


## layouts/shortcodes/appsec-getstarted-standalone.md

Hugo template tooling


**No references found**


## layouts/shortcodes/appsec-getstarted-with-rc.en.md

Hugo template tooling


**No references found**


## layouts/shortcodes/appsec-getstarted.en.md

Hugo template tooling


**Used in 1 document(s)**


## layouts/shortcodes/appsec-integration.html

Hugo template tooling


**Used in 17 document(s)**


## layouts/shortcodes/appsec-integrations.html

Hugo template tooling


**Used in 17 document(s)**


## layouts/shortcodes/argument.html

Hugo template tooling


**No references found**


## layouts/shortcodes/asm-protect.en.md

Hugo template tooling


**Used in 1 document(s)**


## layouts/shortcodes/asm-protection-page-configuration.en.md

Hugo template tooling


**Used in 2 document(s)**


## layouts/shortcodes/aws-permissions.md

Hugo template tooling


**Used in 1 document(s)**


## layouts/shortcodes/aws-resource-collection-cloud-cost-management.md

Hugo template tooling


**No references found**


## layouts/shortcodes/aws-resource-collection-cloud-security-monitoring.md

Hugo template tooling


**No references found**


## layouts/shortcodes/aws-resource-collection-cloudcraft.md

Hugo template tooling


**No references found**


## layouts/shortcodes/aws-resource-collection-network-performance-monitoring.md

Hugo template tooling


**No references found**


## layouts/shortcodes/aws-resource-collection-permissions.md

Hugo template tooling


**No references found**


## layouts/shortcodes/aws-resource-collection-resource-catalog.md

Hugo template tooling


**No references found**


## layouts/shortcodes/aws-resource-collection-upcoming-permissions.md

Hugo template tooling


**No references found**


## layouts/shortcodes/beta-callout-private.html

Displays callout or alert box.


**Used in 2 document(s)**


## layouts/shortcodes/beta-callout.html

Displays callout or alert box.


**Used in 5 document(s)**


## layouts/shortcodes/callout.html

Displays a callout or alert box.


**Used in 190 document(s)**


## layouts/shortcodes/ccm-details.html

Hugo template tooling


**No references found**


## layouts/shortcodes/ci-agent.en.md

Hugo template tooling


**Used in 6 document(s)**


## layouts/shortcodes/ci-autoinstrumentation.en.md

Hugo template tooling


**Used in 6 document(s)**


## layouts/shortcodes/ci-details.html

Hugo template tooling


**Used in 3 document(s)**


## layouts/shortcodes/ci-git-metadata.en.md

Hugo template tooling


**Used in 7 document(s)**


## layouts/shortcodes/ci-itr-activation-instructions.en.md

Hugo template tooling


**Used in 7 document(s)**


## layouts/shortcodes/classic-libraries-table.html

get lang specific data file


**Used in 1 document(s)**


## layouts/shortcodes/cloud-sec-cloud-infra.en.md

Hugo template tooling


**Used in 3 document(s)**


## layouts/shortcodes/cloud-siem-aws-cloudtrail-enable.en.md

Hugo template tooling


**Used in 3 document(s)**


## layouts/shortcodes/cloud-siem-aws-setup-cloudformation.en.md

Hugo template tooling


**Used in 2 document(s)**


## layouts/shortcodes/cloud-siem-content-packs.html

Hugo template tooling


**Used in 1 document(s)**


## layouts/shortcodes/cloud-siem-supported-ocsf.html

Hugo template tooling


**Used in 1 document(s)**


## layouts/shortcodes/cloud_siem/add_reference_tables.en.md

Renders a data table.


**No references found**


## layouts/shortcodes/cloud_siem/anomaly_query.en.md

Hugo template tooling


**No references found**


## layouts/shortcodes/cloud_siem/enable_decrease_severity.en.md

Hugo template tooling


**No references found**


## layouts/shortcodes/cloud_siem/new_value_query.en.md

Hugo template tooling


**No references found**


## layouts/shortcodes/cloud_siem/set_conditions_severity_notify_only.en.md

Links shared with set_conditions.md


**No references found**


## layouts/shortcodes/cloud_siem/set_conditions_third_party.en.md

Hugo template tooling


**No references found**


## layouts/shortcodes/code-block.html

Renders syntax-highlighted code blocks.


**Used in 282 document(s)**


## layouts/shortcodes/collapse-content.html

Creates collapsible/expandable content sections.


**Used in 150 document(s)**


## layouts/shortcodes/collapse.html

Creates collapsible content section.


**No references found**


## layouts/shortcodes/community-libraries-table.html

get lang specific data file


**Used in 1 document(s)**


## layouts/shortcodes/container-languages.html

Hugo template tooling


**Used in 6 document(s)**


## layouts/shortcodes/csm-fargate-eks-sidecar.en.md

Hugo template tooling


**No references found**


## layouts/shortcodes/csm-prereqs-enterprise-ws.en.md

Hugo template tooling


**No references found**


## layouts/shortcodes/csm-prereqs-workload-security.en.md

Hugo template tooling


**No references found**


## layouts/shortcodes/csm-prereqs.en.md

Hugo template tooling


**No references found**


## layouts/shortcodes/csm-setup-aws.en.md

Hugo template tooling


**Used in 1 document(s)**


## layouts/shortcodes/csm-setup-google-cloud.en.md

Hugo template tooling


**Used in 1 document(s)**


## layouts/shortcodes/csm-windows-setup.en.md

Hugo template tooling


**Used in 1 document(s)**


## layouts/shortcodes/dashboards-widgets-api.html

Hugo template tooling


**Used in 30 document(s)**


## layouts/shortcodes/dashboards-widgets-list.html

Hugo template tooling


**No references found**


## layouts/shortcodes/data_streams/dsm-confluent-connectors.md

Hugo template tooling


**No references found**


## layouts/shortcodes/data_streams/monitoring-rabbitmq-pipelines.md

Hugo template tooling


**No references found**


## layouts/shortcodes/dbm-alwayson-cloud-hosted.en.md

Hugo template tooling


**Used in 1 document(s)**


## layouts/shortcodes/dbm-amazon-documentdb-agent-config-replica-set.en.md

Hugo template tooling


**Used in 1 document(s)**


## layouts/shortcodes/dbm-amazon-documentdb-agent-config-sharded-cluster.en.md

Hugo template tooling


**No references found**


## layouts/shortcodes/dbm-mongodb-agent-config-replica-set.en.md

Hugo template tooling


**Used in 2 document(s)**


## layouts/shortcodes/dbm-mongodb-agent-config-sharded-cluster.en.md

Hugo template tooling


**Used in 2 document(s)**


## layouts/shortcodes/dbm-mongodb-agent-config-standalone.en.md

Hugo template tooling


**Used in 1 document(s)**


## layouts/shortcodes/dbm-mongodb-agent-data-collected.en.md

Hugo template tooling


**Used in 2 document(s)**


## layouts/shortcodes/dbm-mongodb-agent-setup-kubernetes.en.md

Hugo template tooling


**Used in 3 document(s)**


## layouts/shortcodes/dbm-mysql-agent-config-examples.en.md

Hugo template tooling


**Used in 5 document(s)**


## layouts/shortcodes/dbm-postgres-agent-config-examples.en.md

Hugo template tooling


**Used in 7 document(s)**


## layouts/shortcodes/dbm-sqlserver-agent-config-examples.en.md

Hugo template tooling


**Used in 4 document(s)**


## layouts/shortcodes/dbm-sqlserver-agent-setup-kubernetes.en.md

Hugo template tooling


**No references found**


## layouts/shortcodes/dbm-sqlserver-agent-setup-windows.en.md

Hugo template tooling


**Used in 1 document(s)**


## layouts/shortcodes/detection-rules.html

Hugo template tooling


**No references found**


## layouts/shortcodes/dsm-tracer-version.html

Output minimal and recommended tracer versions for DSM


**Used in 14 document(s)**


## layouts/shortcodes/expression-language-evaluator.html

Hugo template tooling


**Used in 1 document(s)**


## layouts/shortcodes/expression-language-simulator.html

Add a notice at the top to indicate this is a static illustration


**Used in 1 document(s)**


## layouts/shortcodes/filter_by_reference_tables.en.md

Renders a data table.


**Used in 1 document(s)**


## layouts/shortcodes/gcr-container-options.html

Hugo template tooling


**Used in 1 document(s)**


## layouts/shortcodes/gcr-install-sidecar-datadog-ci.md

Hugo template tooling


**Used in 13 document(s)**


## layouts/shortcodes/gcr-install-sidecar-other.md

Hugo template tooling


**Used in 13 document(s)**


## layouts/shortcodes/gcr-install-sidecar-terraform.md

Hugo template tooling


**Used in 13 document(s)**


## layouts/shortcodes/gcr-install-sidecar-yaml.md

Hugo template tooling


**Used in 7 document(s)**


## layouts/shortcodes/gcr-jobs-retention-filter.html

Hugo template tooling


**Used in 5 document(s)**


## layouts/shortcodes/gcr-service-label.md

Hugo template tooling


**Used in 25 document(s)**


## layouts/shortcodes/get-metrics-from-git.html

Some edge cases the metadata is from a non-integration source, we get the JSON from websites-sources


**Used in 9 document(s)**


## layouts/shortcodes/get-npm-integrations.html

Get language-specific data file


**Used in 3 document(s)**


## layouts/shortcodes/get-service-checks-from-git.html

if the page is a draft we can skip


**Used in 4 document(s)**


## layouts/shortcodes/get-units-from-git.html

Hugo template tooling


**No references found**


## layouts/shortcodes/google-cloud-integrations.md

Hugo template tooling


**Used in 1 document(s)**


## layouts/shortcodes/h2.html

Hugo template tooling


**Used in 7 document(s)**


## layouts/shortcodes/h3.html

Hugo template tooling


**No references found**


## layouts/shortcodes/header-list.html

Hugo template tooling


**Used in 2 document(s)**


## layouts/shortcodes/hipaa-customers.en.md

Hugo template tooling


**Used in 2 document(s)**


## layouts/shortcodes/img.html

Renders responsive images with lazy loading and proper alt text.


**Used in 1377 document(s)**


## layouts/shortcodes/include-markdown.html

Hugo template tooling


**Used in 73 document(s)**


## layouts/shortcodes/insert-example-links.html

Hugo template tooling


**No references found**


## layouts/shortcodes/integration-assets-reference.en.md

Hugo template tooling


**Used in 1 document(s)**


## layouts/shortcodes/integration-assets.en.md

Hugo template tooling


**No references found**


## layouts/shortcodes/integration-items.html

Hugo template tooling


**No references found**


## layouts/shortcodes/integration_categories.en.md

Hugo template tooling


**Used in 1 document(s)**


## layouts/shortcodes/integration_categories.md

Hugo template tooling


**Used in 1 document(s)**


## layouts/shortcodes/integrations.html

manual mappings of integration to pmm categories - WEB-6040


**Used in 1 document(s)**


## layouts/shortcodes/is_loggedin.html

Hugo template tooling


**No references found**


## layouts/shortcodes/jqmath-vanilla.html

Hugo template tooling


**Used in 22 document(s)**


## layouts/shortcodes/lambda-install-cdk.html

Hugo template tooling


**Used in 6 document(s)**


## layouts/shortcodes/latest-lambda-layer-version.html

Output the latest version of a specific Lambda layer. These version numbers are updated by Automation from the Serverless Onboarding team.


**Used in 23 document(s)**


## layouts/shortcodes/learning-center-callout.html

Displays callout or alert box.


**Used in 36 document(s)**


## layouts/shortcodes/link-ext.html

Hugo template tooling


**No references found**


## layouts/shortcodes/link-github.html

Hugo template tooling


**No references found**


## layouts/shortcodes/log-libraries-table.html

get lang specific data file


**Used in 1 document(s)**


## layouts/shortcodes/mainland-china-disclaimer.en.md

Hugo template tooling


**Used in 2 document(s)**


## layouts/shortcodes/mapping-table.html

Renders a data table.


**Used in 11 document(s)**


## layouts/shortcodes/mdoc/en/real_user_monitoring/session_replay/mobile/privacy_options.mdoc.md

Pages using this partial must declare these filters: content_filters: - trait_id: platform option_group_id: rum_sdk_platform_options_v2 label: "SDK"


**No references found**


## layouts/shortcodes/mdoc/en/real_user_monitoring/session_replay/setup_and_configuration.mdoc.md

Pages using this partial must declare these filters: content_filters: - trait_id: platform option_group_id: rum_session_replay_sdk_options label: "SDK"


**No references found**


## layouts/shortcodes/multifilter-search.html

Astrojs component that renders a table with search and optional filtering capabilities. Input data (multifiltersearch) can be sourced from a "resource" argument or Page frontmatter. @param multifilter


**Used in 7 document(s)**


## layouts/shortcodes/nextlink.html

Creates a navigation link to the next page.


**Used in 225 document(s)**


## layouts/shortcodes/notifications-email.en.md

Hugo template tooling


**Used in 2 document(s)**


## layouts/shortcodes/notifications-integrations.en.md

Hugo template tooling


**Used in 2 document(s)**


## layouts/shortcodes/observability_pipelines/configure_existing_pipelines/destination_env_vars/google_pubsub.en.md

Hugo template tooling


**No references found**


## layouts/shortcodes/observability_pipelines/configure_existing_pipelines/install_worker/amazon_eks.en.md

Hugo template tooling


**No references found**


## layouts/shortcodes/observability_pipelines/configure_existing_pipelines/install_worker/azure_aks.en.md

Hugo template tooling


**No references found**


## layouts/shortcodes/observability_pipelines/configure_existing_pipelines/install_worker/cloudformation.en.md

Hugo template tooling


**No references found**


## layouts/shortcodes/observability_pipelines/configure_existing_pipelines/install_worker/docker.en.md

Hugo template tooling


**No references found**


## layouts/shortcodes/observability_pipelines/configure_existing_pipelines/install_worker/google_gke.en.md

Hugo template tooling


**No references found**


## layouts/shortcodes/observability_pipelines/configure_existing_pipelines/install_worker/kubernetes.md

Hugo template tooling


**No references found**


## layouts/shortcodes/observability_pipelines/configure_log_archive/amazon_s3/connect_s3_to_datadog_log_archives.en.md

Hugo template tooling


**No references found**


## layouts/shortcodes/observability_pipelines/configure_log_archive/amazon_s3/instructions.en.md

Hugo template tooling


**No references found**


## layouts/shortcodes/observability_pipelines/configure_log_archive/azure_storage/instructions.en.md

Hugo template tooling


**No references found**


## layouts/shortcodes/observability_pipelines/configure_log_archive/google_cloud_storage/instructions.en.md

Hugo template tooling


**No references found**


## layouts/shortcodes/observability_pipelines/destination_settings/chronicle.en.md

Hugo template tooling


**No references found**


## layouts/shortcodes/observability_pipelines/destination_settings/datadog_archives_amazon_s3.en.md

Hugo template tooling


**No references found**


## layouts/shortcodes/observability_pipelines/destination_settings/datadog_archives_azure_storage.en.md

Hugo template tooling


**No references found**


## layouts/shortcodes/observability_pipelines/destination_settings/datadog_archives_google_cloud_storage.en.md

Hugo template tooling


**No references found**


## layouts/shortcodes/observability_pipelines/destination_settings/datadog_archives_note.en.md

Hugo template tooling


**No references found**


## layouts/shortcodes/observability_pipelines/destination_settings/microsoft_sentinel.md

Hugo template tooling


**No references found**


## layouts/shortcodes/observability_pipelines/destination_settings/splunk_hec.en.md

Hugo template tooling


**No references found**


## layouts/shortcodes/observability_pipelines/install_worker/amazon_eks.en.md

Hugo template tooling


**No references found**


## layouts/shortcodes/observability_pipelines/install_worker/azure_aks.en.md

Hugo template tooling


**No references found**


## layouts/shortcodes/observability_pipelines/install_worker/cloudformation.en.md

Hugo template tooling


**No references found**


## layouts/shortcodes/observability_pipelines/install_worker/docker.en.md

Hugo template tooling


**No references found**


## layouts/shortcodes/observability_pipelines/install_worker/google_gke.en.md

Hugo template tooling


**No references found**


## layouts/shortcodes/observability_pipelines/install_worker/kubernetes.md

Hugo template tooling


**No references found**


## layouts/shortcodes/observability_pipelines/install_worker/linux_rpm.en.md

Hugo template tooling


**No references found**


## layouts/shortcodes/observability_pipelines/lambda_forwarder/deploy_forwarder.md

Hugo template tooling


**No references found**


## layouts/shortcodes/observability_pipelines/log_source_configuration/amazon_data_firehose.md

Hugo template tooling


**No references found**


## layouts/shortcodes/observability_pipelines/log_source_configuration/datadog_agent.en.md

Hugo template tooling


**No references found**


## layouts/shortcodes/observability_pipelines/log_source_configuration/datadog_agent_kubernetes.en.md

Hugo template tooling


**No references found**


## layouts/shortcodes/observability_pipelines/log_source_configuration/splunk_hec.en.md

Hugo template tooling


**No references found**


## layouts/shortcodes/observability_pipelines/log_source_configuration/splunk_tcp.en.md

Hugo template tooling


**No references found**


## layouts/shortcodes/observability_pipelines/log_source_configuration/sumo_logic.en.md

Hugo template tooling


**No references found**


## layouts/shortcodes/observability_pipelines/log_source_configuration/syslog.en.md

Hugo template tooling


**No references found**


## layouts/shortcodes/observability_pipelines/metrics/buffer.en.md

Hugo template tooling


**No references found**


## layouts/shortcodes/observability_pipelines/metrics/component.en.md

Hugo template tooling


**No references found**


## layouts/shortcodes/observability_pipelines/metrics_types.en.md

Hugo template tooling


**No references found**


## layouts/shortcodes/observability_pipelines/multiple_processors.md

Hugo template tooling


**No references found**


## layouts/shortcodes/observability_pipelines/prerequisites/amazon_data_firehose.md

Hugo template tooling


**No references found**


## layouts/shortcodes/observability_pipelines/prerequisites/amazon_security_lake.md

Hugo template tooling


**No references found**


## layouts/shortcodes/observability_pipelines/prerequisites/datadog_agent.en.md

Hugo template tooling


**No references found**


## layouts/shortcodes/observability_pipelines/prerequisites/datadog_agent_destination_only.en.md

Hugo template tooling


**No references found**


## layouts/shortcodes/observability_pipelines/prerequisites/splunk_hec.en.md

Hugo template tooling


**No references found**


## layouts/shortcodes/observability_pipelines/prerequisites/splunk_hec_destination_only.en.md

Hugo template tooling


**No references found**


## layouts/shortcodes/observability_pipelines/prerequisites/sumo_logic.en.md

Hugo template tooling


**No references found**


## layouts/shortcodes/observability_pipelines/prerequisites/sumo_logic_destination_only.en.md

Hugo template tooling


**No references found**


## layouts/shortcodes/observability_pipelines/processors/add_env_vars.en.md

Hugo template tooling


**No references found**


## layouts/shortcodes/observability_pipelines/processors/add_hostname.en.md

Hugo template tooling


**No references found**


## layouts/shortcodes/observability_pipelines/processors/add_processors.en.md

Hugo template tooling


**No references found**


## layouts/shortcodes/observability_pipelines/processors/add_processors_sds.en.md

Hugo template tooling


**No references found**


## layouts/shortcodes/observability_pipelines/processors/custom_processor.md

Hugo template tooling


**No references found**


## layouts/shortcodes/observability_pipelines/processors/dedupe.en.md

Hugo template tooling


**No references found**


## layouts/shortcodes/observability_pipelines/processors/enrichment_table.en.md

10172 link is used in multiple shortcodes, so if it is changed, make sure to update those shortcodes using find and replace


**No references found**


## layouts/shortcodes/observability_pipelines/processors/filter_syntax.en.md

Hugo template tooling


**No references found**


## layouts/shortcodes/observability_pipelines/processors/filter_syntax_metrics.en.md

Hugo template tooling


**No references found**


## layouts/shortcodes/observability_pipelines/processors/generate_metrics.en.md

Hugo template tooling


**No references found**


## layouts/shortcodes/observability_pipelines/processors/grok_parser.en.md

Hugo template tooling


**No references found**


## layouts/shortcodes/observability_pipelines/processors/parse_json.en.md

Hugo template tooling


**No references found**


## layouts/shortcodes/observability_pipelines/processors/parse_xml.md

Hugo template tooling


**No references found**


## layouts/shortcodes/observability_pipelines/processors/quota.en.md

Hugo template tooling


**No references found**


## layouts/shortcodes/observability_pipelines/processors/reduce.en.md

Hugo template tooling


**No references found**


## layouts/shortcodes/observability_pipelines/processors/remap.en.md

Hugo template tooling


**No references found**


## layouts/shortcodes/observability_pipelines/processors/sample.en.md

Hugo template tooling


**No references found**


## layouts/shortcodes/observability_pipelines/processors/sds_custom_rules.md

Hugo template tooling


**No references found**


## layouts/shortcodes/observability_pipelines/processors/sds_library_rules.md

Hugo template tooling


**No references found**


## layouts/shortcodes/observability_pipelines/processors/split_array.md

Hugo template tooling


**No references found**


## layouts/shortcodes/observability_pipelines/processors/tags_processor.md

Hugo template tooling


**No references found**


## layouts/shortcodes/observability_pipelines/set_up_pipelines/add_another_set_of_processors_and_destinations.en.md

Hugo template tooling


**No references found**


## layouts/shortcodes/observability_pipelines/source_settings/kafka.md

Hugo template tooling


**No references found**


## layouts/shortcodes/observability_pipelines/use_case_images/archive_logs.en.md

Hugo template tooling


**No references found**


## layouts/shortcodes/observability_pipelines/use_case_images/dual_ship_logs.en.md

Hugo template tooling


**No references found**


## layouts/shortcodes/observability_pipelines/use_case_images/generate_metrics.en.md

Hugo template tooling


**No references found**


## layouts/shortcodes/observability_pipelines/use_case_images/log_enrichment.en.md

Hugo template tooling


**No references found**


## layouts/shortcodes/observability_pipelines/use_case_images/log_volume_control.en.md

Hugo template tooling


**No references found**


## layouts/shortcodes/observability_pipelines/use_case_images/sensitive_data_redaction.en.md

Hugo template tooling


**No references found**


## layouts/shortcodes/observability_pipelines/use_case_images/split_logs.en.md

Hugo template tooling


**No references found**


## layouts/shortcodes/op-datadog-archives-s3-setup.en.md

Hugo template tooling


**Used in 1 document(s)**


## layouts/shortcodes/op-updating-deployment-modes.en.md

Hugo template tooling


**Used in 3 document(s)**


## layouts/shortcodes/openapi-ref-docs.html

Hugo template tooling


**Used in 7 document(s)**


## layouts/shortcodes/opentelemetry/otel-sdks.md

Hugo template tooling


**No references found**


## layouts/shortcodes/otel-api-troubleshooting.en.md

Hugo template tooling


**Used in 7 document(s)**


## layouts/shortcodes/otel-custom-instrumentation-lang.en.md

Hugo template tooling


**Used in 9 document(s)**


## layouts/shortcodes/otel-custom-instrumentation.en.md

Hugo template tooling


**Used in 2 document(s)**


## layouts/shortcodes/otel-network-requirements.en.md

Hugo template tooling


**Used in 4 document(s)**


## layouts/shortcodes/otel-overview-exporter.en.md

Hugo template tooling


**Used in 3 document(s)**


## layouts/shortcodes/otel-overview-native.en.md

Hugo template tooling


**Used in 3 document(s)**


## layouts/shortcodes/partial.html

Includes a partial template within content.


**Used in 1979 document(s)**


## layouts/shortcodes/pci-apm.en.md

Hugo template tooling


**No references found**


## layouts/shortcodes/pci-logs.en.md

Hugo template tooling


**No references found**


## layouts/shortcodes/permissions.html

Hugo template tooling


**Used in 1 document(s)**


## layouts/shortcodes/private-action-runner-version.html

Hugo template tooling


**Used in 2 document(s)**


## layouts/shortcodes/product-availability.html

Hugo template tooling


**Used in 73 document(s)**


## layouts/shortcodes/programming-lang-wrapper.html

Normalize code lang tabs, these are curated manually and may be inconsistent


**Used in 34 document(s)**


## layouts/shortcodes/programming-lang.html

Normalize lang param, these are curated manually and may be inconsistent


**Used in 34 document(s)**


## layouts/shortcodes/region-param.html

Hugo template tooling


**Used in 223 document(s)**


## layouts/shortcodes/related-links.html

Hugo template tooling


**No references found**


## layouts/shortcodes/related-logs-supported-resources.html

Hugo template tooling


**Used in 1 document(s)**


## layouts/shortcodes/rum-browser-auto-instrumentation-update-user-attributes.md

Hugo template tooling


**Used in 4 document(s)**


## layouts/shortcodes/sa-rule-list.html

Hugo template tooling


**No references found**


## layouts/shortcodes/sci-dd-git-env-variables.en.md

Hugo template tooling


**Used in 1 document(s)**


## layouts/shortcodes/sci-dd-setuptools-unified-python.en.md

Hugo template tooling


**Used in 1 document(s)**


## layouts/shortcodes/sci-dd-tags-bundled-node-js.en.md

Hugo template tooling


**Used in 1 document(s)**


## layouts/shortcodes/sci-dd-tags-env-variable.en.md

Hugo template tooling


**Used in 1 document(s)**


## layouts/shortcodes/sci-dd-tracing-library.en.md

Hugo template tooling


**Used in 1 document(s)**


## layouts/shortcodes/sdk-version.html

Hugo template tooling


**Used in 2 document(s)**


## layouts/shortcodes/sds-mask-action.md

Hugo template tooling


**Used in 2 document(s)**


## layouts/shortcodes/sds-scanning-rule.en.md

Hugo template tooling


**Used in 1 document(s)**


## layouts/shortcodes/sds-suppressions.en.md

Hugo template tooling


**Used in 1 document(s)**


## layouts/shortcodes/security-products/link-findings-to-datadog-services-and-teams.en.md

Hugo template tooling


**No references found**


## layouts/shortcodes/semantic-color.en.md

Hugo template tooling


**Used in 1 document(s)**


## layouts/shortcodes/semantic-color.html

Hugo template tooling


**Used in 1 document(s)**


## layouts/shortcodes/semantic-color.md

Hugo template tooling


**Used in 1 document(s)**


## layouts/shortcodes/serverless-init-configure.html

Hugo template tooling


**Used in 19 document(s)**


## layouts/shortcodes/serverless-init-env-vars-in-container.html

Hugo template tooling


**Used in 19 document(s)**


## layouts/shortcodes/serverless-init-env-vars-sidecar.html

Hugo template tooling


**Used in 20 document(s)**


## layouts/shortcodes/serverless-init-install.html

We can't use the collapse-content.html shortcode inside of another shortcode.


**Used in 33 document(s)**


## layouts/shortcodes/serverless-init-troubleshooting.en.md

Hugo template tooling


**Used in 39 document(s)**


## layouts/shortcodes/serverless-libraries-table.html

get lang specific data file


**Used in 1 document(s)**


## layouts/shortcodes/site-region.html

Shows site/region-specific content based on user selection.


**Used in 126 document(s)**


## layouts/shortcodes/svl-lambda-fips.md

Hugo template tooling


**Used in 6 document(s)**


## layouts/shortcodes/synthetics-alerting-monitoring-network-path.en.md

Hugo template tooling


**Used in 1 document(s)**


## layouts/shortcodes/synthetics-alerting-monitoring.en.md

Hugo template tooling


**Used in 9 document(s)**


## layouts/shortcodes/synthetics-api-tests-snippets.en.md

Hugo template tooling


**Used in 8 document(s)**


## layouts/shortcodes/synthetics-variables.en.md

Hugo template tooling


**Used in 11 document(s)**


## layouts/shortcodes/synthetics-worker-version.html

Hugo template tooling


**Used in 2 document(s)**


## layouts/shortcodes/synthetics_grace_permissions.md

Hugo template tooling


**Used in 9 document(s)**


## layouts/shortcodes/tab.html

Defines individual tab within a tabs shortcode.


**Used in 628 document(s)**


## layouts/shortcodes/table.html

Renders a data table.


**Used in 1 document(s)**


## layouts/shortcodes/tabs.html

Creates tabbed content sections.


**Used in 628 document(s)**


## layouts/shortcodes/tag-set-examples.html

Hugo template tooling


**No references found**


## layouts/shortcodes/tile-nav.html

Hugo template tooling


**No references found**


## layouts/shortcodes/tooltip.html

Get shortcode parameters


**Used in 33 document(s)**


## layouts/shortcodes/tracing-libraries-table.html

get lang specific data file


**Used in 1 document(s)**


## layouts/shortcodes/translate.html

attempts to load a data file at the same path/filename as md file e.g content/foo/bar.md will try look for data/foo/bar.yaml


**Used in 19 document(s)**


## layouts/shortcodes/try-rule-banner.html

Displays banner notification.


**Used in 1111 document(s)**


## layouts/shortcodes/try-rule-cta.html

Hugo template tooling


**Used in 1111 document(s)**


## layouts/shortcodes/uninstall-agent.html

Hugo template tooling


**Used in 1 document(s)**


## layouts/shortcodes/version.html

Hugo template tooling


**Used in 1 document(s)**


## layouts/shortcodes/vimeo.html

Hugo template tooling


**Used in 10 document(s)**


## layouts/shortcodes/vrl-errors.html

Hugo template tooling


**Used in 1 document(s)**


## layouts/shortcodes/vrl-functions.html

Hugo template tooling


**Used in 2 document(s)**


## layouts/shortcodes/whatsnext.html

Displays "What's Next" navigation links.


**Used in 224 document(s)**


## layouts/shortcodes/wistia.html

Hugo template tooling


**No references found**
