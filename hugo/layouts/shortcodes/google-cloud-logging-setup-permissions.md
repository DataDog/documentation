
You must have the following permissions to complete the setup:

##### In Google Cloud:

- [roles/pubsub.admin][1000]
- [roles/storage.admin][1001]
- [roles/secretmanager.admin][1002]
- [roles/resourcemanager.projectIamAdmin][1003]
- [roles/logging.configWriter][1004]
- [roles/serviceusage.serviceUsageAdmin][1005]
- [roles/dataflow.developer][1006]

##### In Datadog:

Your Datadog user account must have either the Datadog Admin role, or, if using custom roles, the following permissions:

- `api_keys_read`
- `api_keys_write`

[1000]: https://docs.cloud.google.com/iam/docs/roles-permissions/pubsub#pubsub.admin
[1001]: https://docs.cloud.google.com/storage/docs/access-control/iam-roles#storage.admin
[1002]: https://docs.cloud.google.com/iam/docs/roles-permissions/secretmanager#secretmanager.admin
[1003]: https://docs.cloud.google.com/resource-manager/docs/access-control-proj#resourcemanager.projectIamAdmin
[1004]: https://docs.cloud.google.com/iam/docs/roles-permissions/logging#logging.configWriter
[1005]: https://docs.cloud.google.com/iam/docs/roles-permissions/serviceusage#serviceusage.serviceUsageAdmin
[1006]: https://docs.cloud.google.com/dataflow/docs/concepts/access-control#dataflow.developer