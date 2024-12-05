---
aliases:
- /ja/security_platform/cloud_workload_security/getting_started
- /ja/security/cloud_workload_security/getting_started
- /ja/security/cloud_workload_security/setup
- /ja/security/threats/setup
- /ja/security_platform/cspm/getting_started
- /ja/security/cspm/getting_started
- /ja/security/cspm/setup
- /ja/security/misconfigurations/setup
- /ja/security/vulnerabilities/setup
- /ja/security/infrastructure_vulnerabilities/setup/
- /ja/security/cloud_security_management/setup/csm_enterprise
- /ja/security/cloud_security_management/setup/csm_cloud_workload_security
- /ja/security/cloud_security_management/setup/csm_pro
further_reading:
- link: /security/cloud_security_management/setup/supported_deployment_types
  tag: ドキュメント
  text: サポートされるデプロイメントタイプ
- link: /security/cloud_security_management/guide/agent_variables/
  tag: ガイド
  text: Cloud Security Management Agent 変数
title: Cloud Security Management の設定
---

Datadog は、[Cloud Security Management (CSM)][6] のセットアップをサポートするガイド付きワークフローを提供しています。最初のステップは、使用したい機能を選択することです。その後、選択した機能の設定手順に従って構成を行います。

<div class="alert alert-info">以下の手順は、新規の CSM ユーザー向けです。既存ユーザーで追加機能の有効化を希望する場合は、<a href="/security/cloud_security_management/setup/#enable-additional-features">追加機能を有効にする</a>を参照してください。</div>

1. [Cloud Security Management の紹介][10]ページで、**Get Started with Cloud Security Management** をクリックします。
1. [Features][11] ページで、有効にしたい機能を選択します。
1. **Start Using Cloud Security Management** をクリックし、選択内容を確認します。

{{< img src="security/csm/setup/features_selection_new_user2.png" alt="CSM Features ページ" width="100%">}}

選択内容を確認後、[Setup][3] ページが表示されます。このページの指示は選択した機能に基づいてカスタマイズされます。例えば、**Misconfigurations** を有効にすると、**Cloud Accounts** と **Hosts and Containers** セクションのみが表示されます。

次の表は、各機能に応じて Setup ページに表示されるセクションを示しています。

<table>
  <thead>
    <tr>
      <th style="width: 50%;">機能</th>
      <th style="width: 50%;">セットアップページ</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Misconfigurations</td>
      <td>
        <ul style="font-size: 16px;">
          <li><a href="/security/cloud_security_management/setup/cloud_accounts">Cloud Integrations</a></li>
          <li><a href="/security/cloud_security_management/setup/agent">Hosts and Containers</a></li>
          <li><a href="/security/cloud_security_management/setup/cloudtrail_logs">AWS CloudTrail Logs</a></li>
          <li><a href="/security/cloud_security_management/setup/source_code_integrations">Source Code Integrations</a></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Threat Detection</td>
      <td>
        <ul style="font-size: 16px;">
          <li><a href="/security/cloud_security_management/setup/agent">Hosts and Containers</a></li>
          <li><a href="/security/guide/aws_fargate_config_guide/?tab=amazonecs#cloud-security-management">Serverless Resources</a></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Identity Risks (CIEM)<br><em>*要 Misconfigurations</em></td>
      <td>
        <ul style="font-size: 16px;">
          <li><a href="/security/cloud_security_management/setup/cloudtrail_logs">AWS CloudTrail Logs</a></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Host Vulnerability Management</td>
      <td>
        <ul style="font-size: 16px;">
          <li><a href="/security/cloud_security_management/setup/cloud_accounts">Cloud Integrations</a></li>
          <li><a href="/security/cloud_security_management/setup/agent">Hosts and Containers</a></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Container Vulnerability Management</td>
      <td>
        <ul style="font-size: 16px;">
          <li><a href="/security/cloud_security_management/setup/cloud_accounts">Cloud Integrations</a></li>
          <li><a href="/security/cloud_security_management/setup/agent">Hosts and Containers</a></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>AWS CloudTrail Logs<br><em>*要 Cloud SIEM</em></td>
      <td>
        <ul style="font-size: 16px;">
          <li><a href="/security/cloud_security_management/setup/cloudtrail_logs">AWS CloudTrail Logs</a></li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

<div class="alert alert-info">Agentless Scanning のセットアップ方法については、<a href="/security/cloud_security_management/setup/agentless_scanning">CSM Agentless Scanning のセットアップ</a>を参照してください。</div>

{{< partial name="security-platform/CSW-billing-note.html" >}}


## 追加機能を有効にする

[Features][11] ページに戻り、追加したい機能の **Enable** をクリックすることで、いつでも CSM の追加機能を有効にできます。このページはステータスページとしても機能しており、有効な機能や、構成が未完了の機能、未有効の機能が確認できます。

{{< img src="security/csm/setup/features_page.png" alt="CSM Features ページ" width="100%">}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/cloud_security_management/setup/agent
[2]: /ja/security/cloud_security_management/setup/cloud_accounts
[3]: https://app.datadoghq.com/security/configuration/csm/setup
[4]: /ja/security/cloud_security_management/setup/agentless_scanning
[5]: https://app.datadoghq.com/security/csm
[6]: /ja/security/cloud_security_management/
[7]: /ja/security/guide/aws_fargate_config_guide/
[9]: https://app.datadoghq.com/security/getting-started
[10]: https://app.datadoghq.com/security/csm/intro
[11]: https://app.datadoghq.com/security/configuration/csm/features
[12]: /ja/security/cloud_security_management/setup/threat_detection
[13]: /ja/security/cloud_security_management/setup/identity_risks_ciem
[14]: /ja/security/cloud_security_management/setup/host_vulnerability_management
[15]: /ja/security/cloud_security_management/setup/container_vulnerability_management