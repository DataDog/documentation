---
"app_id": "atlassian-audit-records"
"app_uuid": "05aefffe-837f-414d-a550-b43ed99d24c2"
"assets":
  "dashboards":
    "confluence-audit-records": assets/dashboards/confluence_audit_records_overview.json
    "jira-audit-records": assets/dashboards/jira_audit_records_overview.json
  "integration":
    "auto_install": false
    "events":
      "creates_events": false
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10390"
    "source_type_name": Atlassian Audit Records
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- log collection
- security
"custom_kind": "インテグレーション"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "atlassian_audit_records"
"integration_id": "atlassian-audit-records"
"integration_title": "Atlassian Audit Records"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "atlassian_audit_records"
"public_title": "Atlassian Audit Records"
"short_description": "Jira & Confluence Audit Records"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Log Collection"
  - "Category::Security"
  - "Submitted Data Type::Logs"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Jira & Confluence Audit Records
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Atlassian Audit Records
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->


## Overview


**Note**: This integration is currently in **beta**.
> Reach out to <a href="https://docs.datadoghq.com/help/">Datadog support</a> with any feedback.


Atlassian's [Jira][1] and [Confluence][2] audit records provide comprehensive records of significant activities across user management, project and space configuration, system settings, and authentication events.

This integration brings these audit logs into Datadog, allowing you to manage risks, understand operational trends, and secure your Atlassian environments more effectively with [Cloud SIEM][3]. In addition, you can:
- Control your Jira and Confluence data retention.
- Build custom widgets and dashboards.
- Set up detection rules that trigger specific actions.
- Cross-reference Jira and Confluence events with the data from other services.

These logs include information around:
- **User Management**: Creation, deletion, and modification of user accounts. This includes password changes, group membership changes, and changes in user permissions.
- **Project Configuration**: Creation, deletion, and updates to projects, including changes to project roles, workflows, issue types, and project permissions.
- **Space and Page Activities**: Creation, deletion, and updates to spaces and pages. This might include changes to space permissions, page edits, and moves.
- **System Configuration**: Changes to Jira and Confluence settings, such as general configurations, global permissions, application links, and add-on settings.
- **Authentication and Authorization**: Login attempts (successful and failed), logout events, and changes to access control lists.

After parsing your Jira and Confluence logs, Datadog then populates the Jira Audit Records and Confluence Audit Records dashboards with insights into security-related events. Widgets include toplists that show the most frequent and infrequent events, and a geolocation map that shows you the country of origin of sign-in attempts.

## セットアップ

1. From the **Configure** tab of the Atlassian Audit Records tile, click the **Add Atlassian Account** button.
2. Follow the instructions on the Atlassian Audit Records tile to authenticate the integration using OAuth with an Atlassian Administrators Account. 

### インストール


## 収集データ

### メトリクス

Atlassian Audit Records does not include any metrics.

### Service Checks

Atlassian Audit Records does not include any service checks.

### Events

Atlassian Audit Records does not include any events.

### Logs

Datadog’s Atlassian Audit Records integration collects logs using [Jira's Audit Record API][1], [Confluence's Audit Record API][2], or both, which generate logs related to user activity that allow insight into:

- Which users are making requests in Jira, Confluence, or both
- What type of requests are being made
- The total number of requests made

For more granular details on the properties included in each log visit the [Response Section of Confluence Audit Records API Docs][2] or the [Response Section of the Jira Audit Records API Docs][1]. To view these categories in the docs linked above, use the following steps: 
1. In the **Response** section underneath **AuditRecords
Container** for a list of audit records, click the **Show child properties** button. A list of Child properties for the API response appears.
2. Click the arrow next to **Records**.
3. Click the **Show child properties** button that appears.
4. Another list of child properties included in each log appears. You can then click the dropdown next to each log key to learn more.  

## Troubleshooting

#### After I click Authorize, I get error messages from Atlassian

If you select a log type that your account doesn't have access to, you may see an error screen from Atlassian with the message:

```
Something went wrong 
Close this page and try again, or raise a support request.
```

In this case, navigate back to the Atlassian tile in Datadog. Then, select the log type that your account can access and reauthorize the account.


#### I'm authenticated to an account, but I'm not seeing logs from all environments. 
Currently, you have to authenticate for each site separately. For example, if you're an administrator for multiple sites, you'd need to authenticate for each site separately which is an [Atlassian known issue][4]. 

#### Is CORS allowlisting supported? 
Yes, for more details see [this section][5] of the Atlassian Docs.

Need help?
- Contact [Datadog support][6].
- Contact Atlassian through their [Developer Resources][2].



[1]: https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-audit-records/#api-group-audit-records
[2]: https://developer.atlassian.com/cloud/confluence/rest/v1/api-group-audit/#api-group-audit
[3]: https://www.datadoghq.com/product/cloud-siem/
[4]: https://developer.atlassian.com/cloud/jira/platform/oauth-2-3lo-apps/#known-issues
[5]: https://developer.atlassian.com/cloud/jira/platform/oauth-2-3lo-apps/#is-cors-whitelisting-supported-
[6]: https://docs.datadoghq.com/help/

