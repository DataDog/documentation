<div class="alert alert-danger">The <b>mask</b> action is only available for logs.</div>

When you set up or edit a scanner rule, there is an **Action on Match** section where you can set the rule to use the **mask** action for matched sensitive data. The **mask** action obfuscates the sensitive data, but users with the `Data Scanner Unmask` permission can de-obfuscate (unmask) and view the data in Datadog.

**Notes**:
- Unmasking can only be performed on indexed logs within Datadog.
- Masked data that is accessed programmatically, such as by using the API or Terraform, or within archives, always appears obfuscated and cannot be unmasked.
- Unmasking does not work on rehydrated logs.
- Datadog does not recommend using the **mask** action for credentials, unless you have a plan to respond to and rotate all leaked credentials.

To unmask sensitive data, navigate to the [Summary page][101], click on a scanning rule, and then click on a log. If you have permission to see masked data, that data has an eye icon next to it. Click the eye icon to reveal the data. You can also use the [Log Explorer][102] to view your masked log data.

[101]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/summary
[102]: https://app.datadoghq.com/logs