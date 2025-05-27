##### Metric forwarding resources

![A diagram of the OCI resources mentioned in this page and displaying the flow of data](images/OCI_metrics_integration_diagram.png)

This integration creates an OCI [connector hub][1], [function app][2], and secure networking infrastructure to forward OCI metrics to Datadog. The ORM stack for these resources creates a function container repository for the region in the tenancy, and the Docker image is pushed to it to be used by the function.

##### IAM resources

![A diagram of the OCI resources and workflow used for integration authentication](images/OCI_auth_workflow_diagram.png)

This integration creates:

 * A dynamic group with `resource.type = 'serviceconnectors'`, to enable access to the connector hub.
 * A user called **DatadogROAuthUser**, which Datadog uses to read tenancy resources.
 * A group to which the created user is added for policy access.
 * A user called **DatadogAuthWriteUser**, which is used to push Docker images for the function.
 * A write access group that the `DatadogAuthWriteUser` is added to, for pushing images through policy access.
 * A policy in the root compartment to allow connector hubs to read metrics and invoke functions. This policy also gives the created user group read access to both the tenancy resources and write access group, to push images. The following statements are added to the policy:

```text
Allow dynamic-group Default/<GROUP_NAME> to read metrics in tenancy
Allow dynamic-group Default/<GROUP_NAME> to use fn-function in tenancy
Allow dynamic-group Default/<GROUP_NAME> to use fn-invocation in tenancy
Allow group Default/<USER_GROUP_NAME> to read all-resources in tenancy
Allow group Default/<WRITE_USER_GROUP_NAME> to manage repos in tenancy where ANY {request.permission = 'REPOSITORY_READ', request.permission = 'REPOSITORY_UPDATE', request.permission = 'REPOSITORY_CREATE'}
```

[1]: https://docs.oracle.com/iaas/Content/connector-hub/home.htm
[2]: https://docs.oracle.com/iaas/Content/Functions/Concepts/functionsconcepts.htm#applications