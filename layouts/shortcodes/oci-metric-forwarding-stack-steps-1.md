The metric forwarding stack must be deployed for **each combination of tenancy and region** to be monitored. For the simplest setup, Datadog recommends creating all the necessary OCI resources with the ORM stack provided below. Alternatively, you can use your existing OCI networking infrastructure.

All resources created by Datadog's ORM stack are deployed to the compartment specified, and for the region currently selected in the top right of the screen.

1. Click the **Create Metric Stack** button on the Datadog OCI integration tile.
2. Accept the Oracle Terms of Use.
3. Leave the **Custom providers** option unchecked.
4. Name the stack and select the compartment to deploy it to.
5. Click **Next**.
6. In the **Datadog API Key** field, enter your [Datadog API key][501] value.

[501]: /organization-settings/api-keys