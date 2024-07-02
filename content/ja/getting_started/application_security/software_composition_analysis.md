---
title: Getting Started with Software Composition Analysis
kind: documentation
aliases:
- /getting_started/application_security/vulnerability_management
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-software-composition-analysis/"
  tag: Blog
  text: Mitigate vulnerabilities from third-party libraries with Datadog Software Composition Analysis
- link: /code_analysis/software_composition_analysis/
  tag: Documentation
  text: Read more about Software Composition Analysis in source code
- link: /security/application_security/software_composition_analysis
  tag: Documentation
  text: Read more about Software Composition Analysis in ASM libraries
- link: /security/application_security/how-appsec-works
  tag: Documentation
  text: How Application Security Management works
- link: /security/application_security/getting_started
  tag: Documentation
  text: Enabling ASM
- link: "https://securitylabs.datadoghq.com/"
  tag: Security Labs
  text: Security research, reports, tips, and videos from Datadog
- link: "https://www.datadoghq.com/blog/sca-supply-chain-security/"
  tag: ブログ
  text: Beyond vulnerabilities, towards a holistic approach to securing the software supply chain
---


## 概要

Datadog [Software Composition Analysis][1] (SCA) continuously monitors your production environment for vulnerabilities in the open source libraries your applications rely on. You can identify and prioritize the remediation of the highest vulnerabilities by business impact.

This guide walks you through best practices for getting your team up and running with SCA.

## Phase 1: Enable
1. [ASM の互換性][2]を確認し、ご利用のサービスが対応しているかどうかをご確認ください。
2. Enable Software Composition Analysis on your services. 
   - Navigate to the [Quick Start Guide][4].
   - **Enable Vulnerability Detection** を展開表示します。
   - **Start Activation** をクリックします。
   - ASM でセキュリティを確保するサービスを選択します。

   または

   - Navigate to the [Setup][9] page.
   - To enable Software Composition Analysis for static analysis in source code, in **Software Composition Analysis**, click **Get Started**.
     - In **SCA static analysis in source code**, click **See Instructions**.
     - In **SCA runtime analysis in running services**, click **Select Services**.

## Phase 2: Identify
1. **Identify Vulnerabilities**: Navigate to [Vulnerabilities][5].  
   - Sort by `Status`, `Vulnerability Source`, and `Severity`.
   - To switch to the code repository commit point of view, click on the **static** button. To switch to the real-time point of view to the applications already running, click on the **runtime** button.

   {{< img src="/security/application_security/software_composition_analysis/asm_sca_vulnerabilities_2.png" alt="脆弱性を静的またはランタイムでソートして表示している Software Composition Analysis (SCA) エクスプローラーページ。" style="width:100%;" >}}

   それぞれの脆弱性に独自のステータスが設定され、診断結果の優先順位付けと管理に利用できます。

   | ステータス         | 説明                                                                                   |
   | -------------- | ----------------------------------------------------------------------------------------------| 
   |  Open          |  脆弱性が Datadog により検出された場合。                                              |
   |  In Progress   |  ユーザーが脆弱性を In Progress としてマークしたが、引き続き Datadog により脆弱性が検出されている場合。            |
   |  Muted         |  ユーザーが脆弱性を無視し、Open リストに表示されないようにしたが、引き続き Datadog により脆弱性が検出されている場合。
   |  Remediated    |  ユーザーが脆弱性を解決済みとしてマークしたが、引き続き Datadog により脆弱性が確認されている場合。   |
   |  Auto-Closed   |  脆弱性が Datadog により検出されなくなった場合。                                          |                              

   **注**: Remediated と Auto-Closed の脆弱性は、Datadog により再度検出された場合、再度 Open になります。

3. 脆弱性をクリックして、詳細を確認します。パネルが開き、以下の情報が表示されます。
    - 影響を受けているサービス
    - その脆弱性が最後に検出された日付
    - 脆弱性の説明
    - 推奨される修復手順
    - 脆弱性スコア </br> </br>

      {{< img src="getting_started/appsec/appsec-vuln-explorer_3.png" alt="Application Vulnerability Management detailed view of the vulnerability." style="width:100%;" >}}

      **Note**: The severity of a vulnerability within SCA is modified from the base score to take into account the presence of attacks and the business sensitivity of the environment where the vulnerability is detected. For example, if no production environment is detected, the severity is reduced.</br> </br>

      調整後の脆弱性スコアは、各サービスの完全なコンテキストを含んでいます。
        - 元の脆弱性の重大度
        - 不審なリクエストの証拠
        - 機密性の高い環境、インターネットに接続された環境

      重大度は、以下の基準でスコアが決定されます。
      | CVSS スコア    | 定性的評価
      | --------------| -------------------|  
      |   `0.0`         | なし                |
      |   `0.1 - 3.9`   | 低                 |
      |   `4.0 - 6.9`   | 中              |
      |   `7.0 – 8.9`   | 高                |
      |   `9.0 – 10.0`  | 重大            |

4. Optionally, download the library inventory (list of libraries and versions in CycloneDX format) for your service. While viewing the details of a vulnerability, click on [View in Service Catalog][6]. From here you can navigate to the [Security view][7] of your service, and download the library inventory under the [libraries tab][8]. 

## Phase 3: Remediate
1. **対応の優先順位を付け、修復を行います**: [Vulnerability Explorer][5] で、以下の作業を行います。

    - 脆弱性のステータスを変更します。
    - 脆弱性をチームメンバーに割り当て、さらなる検討を行います。
    - Create a Jira issue. To create Jira issues for SCA vulnerabilities, you must configure the Jira integration, and have the `manage_integrations` permission. For detailed instructions, see the [Jira integration][11] documentation, as well as the [Role Based Access Control][10] documentation.
    - Review recommended remediation steps.
    - リンクと情報源を確認し、各脆弱性の背後にあるコンテキストを理解します。

   **注**: 脆弱性に担当者を追加しても、割り当てに関する通知は生成されません。この操作では、脆弱性の注釈として担当者の名前が表示されるのみとなります。

   {{< img src="getting_started/appsec/appsec-vuln-remediation_3.png" alt="Application Vulnerability Management recommended remediation steps of the vulnerability." style="width:100%;" >}}


## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/application_security/vulnerability_management/
[2]: /security/application_security/enabling/compatibility/
[3]: /security/application_security/enabling/
[4]: https://app.datadoghq.com/security/configuration/asm/onboarding
[5]: https://app.datadoghq.com/security/appsec/vm
[6]: https://app.datadoghq.com/services
[7]: /tracing/service_catalog/#security-view
[8]: /tracing/service_catalog/#investigate-a-service
[9]: https://app.datadoghq.com/security/configuration/asm/setup
[10]: /account_management/rbac/permissions/#integrations
[11]: /integrations/jira/
