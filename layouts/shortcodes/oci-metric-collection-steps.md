To forward your OCI metrics to Datadog:
   - [Enter tenancy info](#enter-tenancy-info)
   - [Create OCI policy stack](#create-oci-policy-stack) in the home region of your tenancy to create a Datadog auth user, group, and policies
   - [Enter DatadogROAuthUser info](#enter-datadogroauthuser-info) in Datadog
   - [Create OCI metric forwarding stack](#create-oci-metric-forwarding-stack) for every tenancy region you want to forward metrics from

For a visual representation of this architecture, see the [Architecture section](#architecture).