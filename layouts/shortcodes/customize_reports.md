To customize your report, click **Configure** and select **Clone dashboard**. The default report is configured based on the `service` tag that's been added to SLOs. You can update the report to be based on any [SLO tag][100] by taking the following steps:

- Update the configuration for every widget in the default report to use your desired tag, instead of `service`
- Add a [template variable][101] based on your desired tag (or replace the existing `service` template variable)

[100]: /service_management/service_level_objectives/#slo-tags
[101]: /dashboards/template_variables/#add-a-template-variable