---
aliases:
- /ja/security/cloud_security_management/guide/jira
further_reading:
- link: /security/cloud_security_management/guide
  tag: Documentation
  text: Cloud Security Management Guides
- link: /integrations/jira/
  tag: Documentation
  text: Datadog Jira Integration
products:
- icon: cloud-security-management
  name: CSM Misconfigurations
  url: /security/cloud_security_management/misconfigurations/
- icon: cloud-security-management
  name: CSM Identity Risks
  url: /security/cloud_security_management/identity_risks/
title: Create Jira Issues for Cloud Security Management Issues
---

{{< product-availability >}}

Use the [Jira integration][1] to create Jira issues for resources that are impacted by a Cloud Security Management (CSM) security issue. Jira for Cloud Security Management is available for [CSM Misconfigurations][3] and [CSM Identity Risks][4].

**注**:
- To create Jira issues, you must have the `security_monitoring_findings_write` permission. See [Role Based Access Control][2] for more information about Datadog's default roles and granular role-based access control permissions available for CSM.
- At this time, you can create only one Jira issue per finding.

## Configure the Jira integration

To create Jira issues for CSM security issues, you must configure the [Jira integration][5]. For detailed instructions, see the [Jira][1] integration docs.

## Create a Jira issue for impacted resources

{{< tabs >}}

{{% tab "CSM Misconfigurations" %}}

To create a Jira issue for one or more resources impacted by a misconfiguration:

1. On the [Misconfigurations Explorer][1], select a misconfiguration.
2. Under **Resources Impacted**, select one or more findings.
3. On the **Actions** dropdown menu that appears on top, select **Create Jira Issue**.
4. Choose whether to create a single issue or multiple issues (one issue for each resource).
5. Jira アカウントを選択します。
6. Select the Jira project you want to assign the issue to.
7. Select the issue type from the available options. Depending on the issue type, you may be required to enter additional information.
8. Click **Create Issue**.

You can also create a Jira issue from the standalone issue side panel.

1. On the [Misconfigurations Explorer][1], set the Group By filter to **Resources**.
2. Select a resource.
3. On the **Misconfigurations** tab, select a misconfiguration.
4. Click **Create Jira Issue**.
5. Jira アカウントを選択します。
6. Select the Jira project you want to assign the issue to.
7. Select the issue type from the available options. Depending on the issue type, you may be required to enter additional information.
8. Click **Create Issue**.

After you create the issue, a link to the Jira issue is displayed on the side panel.

[1]: https://app.datadoghq.com/security/compliance

{{% /tab %}}

{{% tab "CSM Identity Risks" %}}

To create a Jira issue for one or more resources impacted by an identity risk:

1. On the [Identity Risks Explorer][1], select an identity risk.
2. Under **Resources Impacted**, select one or more findings.
3. On the **Actions** dropdown menu that appears on top, select **Create Jira Issue**.
4. Choose whether to create a single issue or multiple issues (one issue for each resource).
5. Jira アカウントを選択します。
6. Select the Jira project you want to assign the issue to.
7. Select the issue type from the available options. Depending on the issue type, you may be required to enter additional information.
8. Click **Create Issue**.

You can also create a Jira issue from the standalone issue side panel.

1. On the [Identity Risks Explorer][1], set the Group By filter to **Resources**.
2. Select a resource.
3. On the **Misconfigurations** tab, select an identity risk.
4. Click **Create Jira Issue**.
5. Jira アカウントを選択します。
6. Select the Jira project you want to assign the issue to.
7. Select the issue type from the available options. Depending on the issue type, you may be required to enter additional information.
8. Click **Create Issue**.

After you create the issue, a link to the Jira issue is displayed on the side panel.

[1]: https://app.datadoghq.com/security/identities

{{% /tab %}}

{{< /tabs >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/jira/
[2]: /ja/account_management/rbac/permissions/#cloud-security-platform
[3]: /ja/security/cloud_security_management/misconfigurations/
[4]: /ja/security/cloud_security_management/identity_risks/
[5]: https://app.datadoghq.com/integrations/jira?search=jira