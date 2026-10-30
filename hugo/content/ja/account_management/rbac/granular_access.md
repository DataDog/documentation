---
description: dashboards、monitors、Notebooks などの個々の Datadog リソースへのアクセスを、チーム、ロール、またはユーザー単位で制御し、きめ細かな権限管理を実現します。
title: きめ細かなアクセス制御
---
## 個々のリソースへのアクセスを管理する {#manage-access-to-individual-resources}

一部のリソースでは、ロール、[Teams][1]、またはユーザー単位で個々のリソースへのアクセスを制限できます。

組織内のさまざまなプリンシパルを使用してアクセスパターンを制御し、知識の共有とコラボレーションを促進します。
- Teams を使用して、組織内の機能グループへのアクセスをマッピングします。たとえば、dashboard の編集を、それを所有する application team のみに制限します。
- ロールを使用して、ペルソナへのアクセスをマッピングします。たとえば、支払い方法の編集を、請求管理者のみに制限します。
- 個々のユーザーへのアクセス権の割り当ては、必要な場合にのみ行います。


| きめ細かなアクセス制御がサポートされているリソース | チームベースのアクセス | ロールベースのアクセス | ユーザー / サービスアカウントベースのアクセス |
|--------------------------------------------------|-------------------|-------------------|-------------------------------------|
| [Apps][13]                                       | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [AWS Accounts][11]                               | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Azure App Registrations][11]                    | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Work Management projects][10]                   | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Connections][14]                                | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Connection Groups][15]                          | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Cross Org Connections][20]                      | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Dashboards][2]                                  | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Datastores][16]                                 | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Dynamic Severity][26]                           | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Experiments][27]                                | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Feature Flags][25]                              | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Google Service Accounts][11]                    | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Integration Accounts][11]                       | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Integration Services][11]                       | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Integration Webhooks][11]                       | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Logs Pipelines][24]                             | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Monitors][3]                                    | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Notebooks][4]                                   | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Observability Pipelines][23]                    | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [On-Call][22]                                    | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Private Action Runner][18]                      | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Powerpacks][5]                                  | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Reference tables][12]                           | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [RUM apps][19]                                   | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Security rules][6]                              | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Security suppressions][7]                       | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Service Level Objectives][8]                    | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Sheets][21]                                     | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Synthetic テスト][9]                             | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Workflows][17]                                  | {{< X >}}         | {{< X >}}         | {{< X >}}                           |


### 個々のリソースへのアクセスを昇格させる {#elevate-access-to-individual-resources}

`user_access_manage`権限を持つユーザーは、チーム、ロール、ユーザー、またはサービスアカウントに基づく制限をサポートする個々のリソースに対して、自身のアクセス権を昇格させることができます。ロールベースのアクセス制限のみを持つリソースはサポートされていません。アクセス権を取得するには、きめ細かなアクセス制御モーダルで {{< ui >}}Elevate Access{{< /ui >}} ボタンをクリックします。

[1]: /ja/account_management/teams/
[2]: /ja/dashboards/configure/#permissions
[3]: /ja/monitors/configuration/#permissions
[4]: /ja/notebooks/#limit-edit-access
[5]: /ja/dashboards/widgets/powerpack/#powerpack-permissions
[6]: /ja/security/detection_rules/#restrict-edit-permissions
[7]: /ja/security/suppressions/#restrict-edit-permissions
[8]: /ja/service_level_objectives/#permissions
[9]: /ja/synthetics/browser_tests/#permissions
[10]: /ja/incident_response/work_management/settings#granular-access-control
[11]: /ja/getting_started/integrations/#granular-access-control
[12]: /ja/reference_tables/#permissions
[13]: /ja/actions/app_builder/access_and_auth/#restrict-access-to-a-specific-app
[14]: /ja/actions/connections/?tab=workflowautomation#connection-credentials
[15]: /ja/actions/connections/?tab=workflowautomation#connection-groups
[16]: /ja/actions/datastore/
[17]: /ja/actions/workflows/access_and_auth/#restrict-access-on-a-specific-workflow
[18]: /ja/actions/private_actions
[19]: /ja/real_user_monitoring
[20]: /ja/account_management/org_settings/cross_org_visibility/#permissions
[21]: /ja/sheets/#permissions
[22]: /ja/incident_response/on-call/#granular-access-control
[23]: /ja/observability_pipelines/configuration/access_control/
[24]: /ja/logs/log_configuration/pipelines/#pipeline-permissions
[25]: /ja/getting_started/feature_flags/
[26]: /ja/security/cloud_siem/detect_and_monitor/dynamic_severity/#restrict-edit-permissions
[27]: /ja/experiments/