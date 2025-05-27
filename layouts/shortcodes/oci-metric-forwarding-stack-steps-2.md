8. In the **Metrics settings** section, optionally remove any metric namespaces from collection.
9. In the **Metrics compartments** section, enter a comma-separated list of compartment OCIDs to monitor. Any metric namespace filters selected in the previous step are applied to each compartment.
10. In the **Function settings** section, select GENERIC_ARM. Select GENERIC_X86 if deploying in a Japan region.
11. Click **Next**.
12. Click **Create**.
13. Return to the [Datadog OCI integration tile][601] and click **Create Configuration**.

**Notes**:
- By default, only the root compartment is selected, and all of the metric namespaces from Step 8 which are present in the compartment are enabled (up to 50 namespaces are supported per connector hub). If you choose to monitor additional compartments, the namespaces added to them are an intersection of namespaces selected and the namespaces present in the compartment.
- You should manage who has access to the Terraform state files of the resource manager stacks. See the [Terraform State Files section][602] of the Securing Resource Manager page for more information.

[601]: /integrations/oracle-cloud-infrastructure
[602]: https://docs.oracle.com/iaas/Content/Security/Reference/resourcemanager_security.htm#confidentiality__terraform-state