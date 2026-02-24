---
title: Create ServiceNow Tickets for Cloud Security Issues
further_reading:
  - link: "/security/cloud_security_management/guide"
    tag: "Documentation"
    text: Cloud Security Guides
  - link: "/integrations/servicenow/"
    tag: "Documentation"
    text: Datadog ServiceNow Integration
  - link: "/service_management/case_management/"
    tag: "Documentation"
    text: Case Management
aliases:
  - /security/cloud_security_management/guide/servicenow
products:
  - name: Cloud Security Misconfigurations
    url: /security/cloud_security_management/misconfigurations/
    icon: cloud-security-management
  - name: Cloud Security Identity Risks
    url: /security/cloud_security_management/identity_risks/
    icon: cloud-security-management
---

{{< product-availability >}}

Use the [ServiceNow integration][1] to create ServiceNow tickets for resources impacted by a Cloud Security issue. You can create a new ticket from one or more findings, or attach findings to an existing ticket. Linked findings and tickets are tracked together through [Case Management][2]. Changes made in ServiceNow—including status, priority, and comments—sync back to Datadog automatically.

**Notes**:
- To create ServiceNow tickets, you must have the `security_monitoring_findings_write` permission. See [Role Based Access Control][3] for more information about Datadog's default roles and granular role-based access control permissions available for Cloud Security.
- You can select up to 25 findings per ticket creation or attachment request.
- Findings already linked to another case are automatically detached before being linked to the new ticket.

## Configure the ServiceNow integration

To create ServiceNow tickets for Cloud Security issues, configure the [ServiceNow integration][4] in Case Management:

1. Go to [**Service Management > Case Management > Projects**][5] and select your project.
2. Open **Settings > Integrations > ServiceNow**.
3. Enable the integration and enter the following:
   - **Instance name**: your ServiceNow subdomain (for example, `example` for `example.service-now.com`)
   - **Assignment group**: the ServiceNow group that tickets are assigned to

## Create a ServiceNow ticket for impacted resources

{{< tabs >}}

{{% tab "Cloud Security Misconfigurations" %}}

To create a ServiceNow ticket for one or more resources impacted by a misconfiguration:

1. On the [Misconfigurations explorer][1], select a misconfiguration.
2. Under **Resources Impacted**, select one or more findings.
3. On the **Actions** dropdown menu, select **Create ServiceNow Ticket**.
4. Optionally customize the title, description, and priority. If left blank, Datadog generates them from the finding data:
   - **Title**: derived from finding severity, resource, and title
   - **Priority**: mapped from finding severity (critical → P1, high → P2, medium → P3, low → P4, informational → P5)
   - **Due date**: set to the earliest due date across the selected findings
5. Click **Create**.

A Datadog case is created and a ServiceNow incident is opened in your configured instance, assigned to the configured assignment group. After the ticket is created, a link to the ServiceNow incident is displayed on the side panel.

[1]: https://app.datadoghq.com/security/compliance

{{% /tab %}}

{{% tab "Cloud Security Identity Risks" %}}

To create a ServiceNow ticket for one or more resources impacted by an identity risk:

1. On the [Identity Risks explorer][1], select an identity risk.
2. Under **Resources Impacted**, select one or more findings.
3. On the **Actions** dropdown menu, select **Create ServiceNow Ticket**.
4. Optionally customize the title, description, and priority. If left blank, Datadog generates them from the finding data:
   - **Title**: derived from finding severity, resource, and title
   - **Priority**: mapped from finding severity (critical → P1, high → P2, medium → P3, low → P4, informational → P5)
   - **Due date**: set to the earliest due date across the selected findings
5. Click **Create**.

A Datadog case is created and a ServiceNow incident is opened in your configured instance, assigned to the configured assignment group. After the ticket is created, a link to the ServiceNow incident is displayed on the side panel.

[1]: https://app.datadoghq.com/security/identities

{{% /tab %}}

{{< /tabs >}}

## Attach findings to an existing ServiceNow ticket

Use this flow when a ServiceNow incident already exists and you want to link Datadog findings to it.

1. On the findings explorer, select one or more findings.
2. On the **Actions** dropdown menu, select **Attach to ServiceNow Ticket**.
3. Paste the URL of the existing ServiceNow incident. Supported formats:
   - `https://<INSTANCE_NAME>.service-now.com/incident.do?sys_id=<SYS_ID>`
   - `https://<INSTANCE_NAME>.service-now.com/now/nav/ui/classic/params/target/incident.do?sys_id=<SYS_ID>`
   - `https://<INSTANCE_NAME>.service-now.com/nav_to.do?uri=incident.do?sys_id=<SYS_ID>`
4. Click **Attach**.

The result depends on whether the ServiceNow ticket is already linked to a Datadog case:

| Scenario | Result |
|---|---|
| Ticket is not linked to a case | A case is created and linked to the existing ServiceNow ticket |
| Ticket is linked to a case in the same project | The selected findings are added to that existing case |
| Ticket is linked to a case in a different project | An error is returned |

**Notes**:
- The instance in the provided URL must match the instance configured in your project's ServiceNow integration settings.
- Only ServiceNow incident URLs are supported (`incident.do`). Problem and change request URLs are not accepted.
- The `sys_id` parameter must be a valid 32-character hexadecimal string.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/servicenow/
[2]: /service_management/case_management/
[3]: /account_management/rbac/permissions/#cloud-security-platform
[4]: https://app.datadoghq.com/integrations/servicenow
[5]: https://app.datadoghq.com/cases
