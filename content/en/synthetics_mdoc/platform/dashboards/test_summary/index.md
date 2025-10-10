---
title: Synthetic Test Summary Dashboard
description: Datadog, the leading service for cloud-scale monitoring.
breadcrumbs: >-
  Docs > Synthetic Testing and Monitoring > Platform > Synthetic Dashboards >
  Synthetic Test Summary Dashboard
sourceUrl: >-
  https://docs.datadoghq.com/synthetics/platform/dashboards/test_summary/index.html
---

# Synthetic Test Summary Dashboard

## Overview{% #overview %}

The [test summary dashboard](https://app.datadoghq.com/dash/integration/30696/synthetics---test-summary) provides insights about your Synthetic test runs, Synthetic tests in your CI/CD pipelines, and private locations. It shows:

- **Synthetic monitoring & testing usage**: View a breakdown of your Synthetic test usage by environment, team, and test type.

  {% image
     source="https://datadog-docs.imgix.net/images/synthetics/dashboards/test_summary_dashboard.ff6963d5d22e764281f1e9d74522f9e2.png?auto=format"
     alt="Out-of-the-box Synthetic Monitoring test summary dashboard" /%}

- **Test automation**: View Synthetic test runs in your CI/CD pipelines by type and team.

  {% image
     source="https://datadog-docs.imgix.net/images/synthetics/dashboards/test_automation.cef55daa1d80baa1e3280ca323254408.png?auto=format"
     alt="Continuous Testing and CI/CD Integrations section of the Synthetics test summary dashboard" /%}

- **Private locations**: View the number of Synthetic workers by private location, the average concurrency, and average number of pulled tests.

  {% image
     source="https://datadog-docs.imgix.net/images/synthetics/dashboards/private_locations.1d80b26e3cc687a28c07d4fa8fe7422d.png?auto=format"
     alt="Private locations section of the Synthetic Monitoring test summary dashboard" /%}

For more information about the data displayed, see [Synthetic Monitoring Metrics](https://docs.datadoghq.com/synthetics/metrics/).

## Further Reading{% #further-reading %}

- [Learn about the Synthetic Monitoring & Testing Results Explorer](https://docs.datadoghq.com/continuous_testing/explorer/)
