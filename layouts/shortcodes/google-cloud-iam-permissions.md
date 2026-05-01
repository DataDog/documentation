The Datadog Google Cloud integration uses a Google Cloud service account to collect data through the Google Cloud APIs. Grant the following roles to that service account at the scope you want Datadog to monitor (organization, folder, or project).

| Role | Required or conditional | Scope | Purpose |
|------|-------------------------|-------|---------|
| [Compute Viewer][1] (`roles/compute.viewer`) | Required | Organization, folder, or project | Read access to get and list Compute Engine resources. |
| [Monitoring Viewer][2] (`roles/monitoring.viewer`) | Required | Organization, folder, or project | Read access to monitoring data for metric collection. |
| [Cloud Asset Viewer][3] (`roles/cloudasset.viewer`) | Required | Organization, folder, or project | Read access to cloud asset metadata. |
| [Browser][4] (`roles/browser`) | Required on the default project of the service account only | Default project of the service account | Read access to browse the project hierarchy. Other projects in the scope do not need this role. |
| Service Account Token Creator (`roles/iam.serviceAccountTokenCreator`) | Required | Granted to the Datadog principal, on the service account | Allow Datadog to impersonate the service account. |
| [Service Usage Consumer][5] (`roles/serviceusage.serviceUsageConsumer`) | Conditional | Folder or organization | Required when [per-project cost and API quota attribution][6] is enabled. |

[1]: https://cloud.google.com/compute/docs/access/iam#compute.viewer
[2]: https://cloud.google.com/monitoring/access-control#monitoring_roles
[3]: https://cloud.google.com/iam/docs/understanding-roles#cloudasset.viewer
[4]: https://cloud.google.com/resource-manager/docs/access-control-proj#browser
[5]: https://cloud.google.com/service-usage/docs/access-control#serviceusage.serviceUsageConsumer
[6]: #enable-per-project-cost-and-api-quota-attribution
