---
disable_toc: false
further_reading:
- link: service_management/case_management/create_case
  tag: ドキュメント
  text: ケースの作成
title: プロジェクト
---

{{% site-region region="gov,ap1" %}}
<div class="alert alert-danger">
Case Management is not available in the {{< region-param key=dd_datacenter code="true" >}} site.
</div>
{{% /site-region %}}

## Overview

A project is a container object that holds a set of cases. Organize your work around the groups that make sense to your organization, whether that's teams, services, or initiatives. Cases in each project are isolated from one another, helping you to focus on what's relevant. 

## Create a project

{{< img src="service_management/case_management/projects/projects_create_a_project_cropped.png" alt="Create a new project page under Case management Settings" style="width:100%;" >}}

To create a project:
1. Select **New Project** on the Projects view or click on the **+** icon next to *Your Projects* in the left navigation bar.  
1. Enter a project name and key. Project keys must be between one and 10 characters long. Case ID numbers are prefixed with a combination of letters, for example, `NOC-123`. Project keys are immutable. 
1. Click **Create Project**.

After you create your project, add one or more users or Datadog Teams as members. Projects that you're a member of appear in the **Your Projects** section of the left navigation bar. 

## Join a project

{{< img src="/service_management/case_management/projects/join_a_project_cropped.png" alt="Projects page showing the button options to join a project" style="width:100%;" >}}

Find projects within your organization in the **Projects** view in the left navigation bar. Anyone can view and join any project. Anyone can also create and be assigned cases in any project, regardless of whether they're a member of the project or not. 

## Delete a project

<div class="alert alert-danger">Deleted cases cannot be recovered.</div>

プロジェクトの削除は、プロジェクトの Settings ページから行えます。

プロジェクトを削除すると、そのプロジェクト内のケースもすべて削除されます。ケースを残しておきたい場合、Datadog では、ケースを別のプロジェクトに移動してから削除することをお勧めしています。

プロジェクトを削除すると、そのプロジェクトに関連付けられているイベント相関パターンが自動的に無効になります。Datadog ワークフローを通じたケース作成やモニターの `@case` メンションなど、その他の自動化も、リンクされたプロジェクトを削除すると機能しなくなります。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}