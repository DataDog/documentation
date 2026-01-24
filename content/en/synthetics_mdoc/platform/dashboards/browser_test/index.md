---
title: Synthetic Browser Test Performance Dashboard
description: Learn about the out-of-the-box Synthetic browser test performance dashboard.
breadcrumbs: >-
  Docs > Synthetic Testing and Monitoring > Platform > Synthetic Dashboards >
  Synthetic Browser Test Performance Dashboard
sourceUrl: >-
  https://docs.datadoghq.com/synthetics/platform/dashboards/browser_test/index.html
---

# Synthetic Browser Test Performance Dashboard

## Overview{% #overview %}

The [browser test performance dashboard](https://app.datadoghq.com/dash/integration/30697/synthetics---browser-test-performance) provides insights about your browser test runs, browser analysis, web performance, and events. It shows:

- **Synthetic browser test analysis**: See a breakdown of success rate by browser type, a list of browser test alerts, and average test duration by browser type and location.

  {% image
     source="https://datadog-docs.imgix.net/images/synthetics/dashboards/browser_test_analysis.1b021f58ee327eed212b855a86e75186.png?auto=format"
     alt="Browser test analysis section of the Synthetic Browser test performance dashboard" /%}

- **Synthetic test web performance**: If you have Datadog RUM enabled, use the [RUM integration](https://docs.datadoghq.com/synthetics/guide/explore-rum-through-synthetics/) to examine core web vitals and a list of third-party provider test resources.

  {% image
     source="https://datadog-docs.imgix.net/images/synthetics/dashboards/browser_test_web_performance.4ffda79887c18b38319c50361a3c2c7d.png?auto=format"
     alt="Synthetic test web performance section of the Synthetic Monitoring Browser test performance dashboard" /%}

- **Events**: Explore outstanding events from your Synthetic test alerts.

  {% image
     source="https://datadog-docs.imgix.net/images/synthetics/dashboards/browser_test_events.06952fe851e78190f46616b28b2e13a6.png?auto=format"
     alt="Events section of the Synthetic Monitoring Browser test performance dashboard" /%}

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/dashboards/browser_test_performance.648855cfaf62d5cc3cb8b2f3490f1032.png?auto=format"
   alt="Out-of-the-box Synthetic Monitoring Browser test performance dashboard" /%}

For more information about the data displayed, see [Synthetic Monitoring Metrics](https://docs.datadoghq.com/synthetics/metrics/).

## Further Reading{% #further-reading %}

- [Learn about the Synthetic Monitoring & Testing Results Explorer](https://docs.datadoghq.com/continuous_testing/explorer/)
