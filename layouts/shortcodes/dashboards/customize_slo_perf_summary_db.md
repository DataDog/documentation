To customize your SLO Performance Summary Dashboard, click **Configure** in the dashboard and select **Clone dashboard**. The default dashboard is configured based on the `service` tag that's been added to SLOs. You can update the dashboard to be based on any [SLO tag][300] by taking the following steps:

- Update the configuration for every widget in the default dashboard to use your desired tag, instead of `service`
- Add a [template variable][301] based on your desired tag (or replace the existing `service` template variable)


For instance, if you have added a `journey` tag to your SLOs, you can clone the SLO Performance Summary Dashboard and customize it to be based on the `journey` tag:

<figure class="text-center">
  <video width="80%" controls>
    <source src="{{ .Site.Params.img_url }}images/service_management/service_level_objectives/ootb_dashboard/slo-dashboard-flow.mp4" type="video/mp4">
    OOTB SLO Dashboard by Journey Tag.
  </video>
</figure>

[300]: /service_management/service_level_objectives/#slo-tags
[301]: /dashboards/template_variables/#add-a-template-variable