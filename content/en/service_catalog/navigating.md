---
title: Navigate the Service Catalog
kind: documentation
aliases:
  - /tracing/service_catalog/browsing
  - /service_catalog/browsing
further_reading:
- link: "/tracing/service_catalog/service_definition_api/"
  tag: "Documentation"
  text: "Registering Services with the Service Definition API"
- link: "/tracing/service_catalog/guides/understanding-service-configuration"
  tag: "Guide"
  text: "Understanding Your Service Configuration"
- link: "/tracing/service_catalog/guides/upstream-downstream-dependencies"
  tag: "Guide"
  text: "See Upstream and Downstream Dependencies During an Active Incident"
- link: "/dora_metrics/setup"
  tag: "Guide"
  text: "Get started with DORA metrics"
- link: "https://www.datadoghq.com/blog/manage-service-catalog-categories-with-service-definition-json-schema/"
  tag: "Blog"
  text: "Manage Service Catalog entries with the Service Definition JSON Schema"
- link: "https://www.datadoghq.com/blog/apm-security-view/"
  tag: "Blog"
  text: "Gain visibility into risks, vulnerabilities, and attacks with APM Security View"
- link: "https://www.datadoghq.com/blog/service-catalog-setup/"
  tag: "Blog"
  text: "Easily add tags and metadata to your services using the simplified Service Catalog setup"
- link: "https://www.datadoghq.com/blog/github-actions-service-catalog/"
  tag: "Blog"
  text: "I use GitHub Ac­tions for Data­dog's Service Catalog, and you should, too"
algolia:
  tags: ['service catalog']
---

On the [Service Catalog page][1], see the list of services in your Datadog organization which are either detected from collected data or manually declared by someone [registering the service][2]. To find a particular service, search by its name. To narrow down to only explicitly declared entries, you can search by the **Service Origin** facet and filter by **user-defined**.

## Ownership view

In the **Ownership** tab, you can click the icons in the **Contact** and **Repo** columns and be directed to the tools and projects specified in the service definition. For example, you can access the owning team's Slack channel or GitHub repository containing the service code.

The **Telemetry** column displays what types of telemetry data Datadog is collecting for the service. Clicking on the icons directs you into the corresponding Datadog product view. For example, the Agent sends traces to Datadog, and you can click the **Traces** icon to view them in APM.

Sort the table by **Team** or **On Call** columns to see which services each team is responsible for, and identify services where ownership and responsibility are not specified yet.

## Reliability view

The **Reliability** tab contains information about the stability of your services. Sort the table by clicking on columns in the list to reveal:

- Which services deployed most recently, or have not deployed for a long time.
- Which services are reporting the most errors, and whether they are new issues.
- Which services have ongoing incidents.
- Which services have monitors that are triggered.
- See Mean Time To Restore, Deployment Frequency and Change Failure Rate by integrating with [DORA Metrics][16].

Click the Settings icon on the right hand corner to hide columns from the list.

{{< img src="tracing/service_catalog/svc-cat-reliability.png" alt="Service Catalog Reliability view showing several services and their associated MTTR, deployment metrics, issues, incidents, SLOs, and monitor statuses." style="width:100%;" >}}

## Performance view

The **Performance** tab provides several ways to view how your services are performing and what needs the most attention.

The environment dropdown works as a filter. For example, when you select `env:prod`, the list displays only services that have performance data (APM/USM telemetry) in `env:prod` during the last hour. When you select `env:*`, you can see all environments where a service emits telemetry at a glance, and expand to see detailed performance metrics per environment.
The second dropdown allows you to rescope any APM data you have in the Performance view to the [second primary tag][3] on APM [trace metrics][4]. This dropdown does not affect how many services you see in the list. RUM applications are not associated with specific environments (unlike APM or USM), and are only viewable when you select the `env*` option in the environment dropdown.

You can change the default environment in **APM > Setup & Configuration > Settings**.

{{< img src="tracing/service_catalog/svc-cat-perf-view.png" alt="Performance view filtered on env:* and scoped to cluster-name:*" style="width:100%;" >}}

The performance metrics are tied to services' [primary operations][5]. If a service is only detected by APM, the performance view shows the APM [trace metrics][4]. If a service is only detected by USM, the performance view shows the [USM metrics][6]. If a service is detected by USM and APM, the performance view shows the Trace Metrics instead of USM metrics.

Sort the table by clicking columns to reveal services that:
- Deployed most recently, or have not deployed for a long time
- Are receiving the most requests per second, or are not receiving any traffic
- Have the highest latency at various percentiles
- Have the highest error numbers or rates
- Are running on the most pods, hosts, or serverless environments
- Have related dashboards where you can see more performance data breakdowns, and identify which ones need to have dashboards added to their service definition
- Have the highest or lowest [Apdex scores][7]
- Have monitors that are triggered

Click the Settings icon on the right hand corner to hide metric columns from the list.

## Security view
The **Security tab** provides several ways to assess and improve the security posture of your services. This includes understanding the number and severity of known security vulnerabilities in the open source libraries, and viewing how your services are targeted by attackers. Sort the table by clicking columns to reveal services that:

- Expose known security vulnerabilities, including the individual severities.
- Are receiving the most attack attempts.
- Are targeted by the most attackers.
- Have the most severe threats, where the services are impacted by the attacks.
- Are monitored and protected by [Application Security Management][8]

To access additional details describing security vulnerabilities and signals, click on the service row to open a detailed side panel. Alternatively, click on the pop-over **View Service Details** button, which opens the service page, and in turn, its security tab.

Click the Settings icon on the right hand corner to hide metric columns from the list.

## Costs view
The **Costs tab** provides several ways to understand the costs associated with your services.  Powered by [Cloud Cost Management][9], you can identify potential inefficiencies, saving opportunities, and change over time. Positioning costs data alongside metrics available in Service Catalog can improve visibility into how engineering changes affect overall cloud spend. Sort the table by clicking columns to reveal services that:

- Have the highest amortized AWS costs in the last month
- Show a significant change in the rate of cloud spending over time

For more information on a service's cost changes, click on the service row to open a detailed side panel. To see this information on the Cloud Costs page, click the **View in Analytics** button.

{{< img src="tracing/service_catalog/svc-cat-costs-view.png" alt="Service Catalog Costs view showing several services and their associated cloud cost and monthly change details." style="width:100%;" >}}

This information is only available for Cloud Cost Management customers who have configured the necessary [AWS Integration][10] and [Tag Pipelines][11].

Click the Settings icon on the right hand corner to hide metric columns from the list.

## Software Delivery View
The **Software Delivery tab** provides several ways to assess and improve the pre-production status of your services. This includes understanding the status of your CI pipelines and viewing your static analysis violations. You can:

- View performance of the [CI pipelines][12] related to your services.
- Find security and code quality issues from [Static Analysis][13].
- Easily pivot from Service Catalog to troubleshoot pre-production slowdowns and failures.
- See your Change Lead Time by integrating with [DORA Metrics][16].

To access additional details describing your CI status and static analysis violations, click on a service and see the status of each pipeline and rule violation.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/services
[2]: /tracing/service_catalog/setup/
[3]: /tracing/guide/setting_primary_tags_to_scope/?tab=helm#add-a-second-primary-tag-in-datadog
[4]: /tracing/metrics/metrics_namespace/
[5]: /tracing/guide/configuring-primary-operation/
[6]: /universal_service_monitoring/guide/using_usm_metrics/#usm-metrics-vs-apm-metrics
[7]: /tracing/guide/configure_an_apdex_for_your_traces_with_datadog_apm/
[8]: /security/application_security/how-appsec-works/
[9]: /cloud_cost_management/
[10]: /cloud_cost_management/?tab=aws
[11]: /cloud_cost_management/tag_pipelines
[12]: https://app.datadoghq.com/ci/pipelines
[13]: https://app.datadoghq.com/ci/static-analysis
[15]: /service_management/workflows/actions_catalog/
[16]: /dora_metrics/setup
