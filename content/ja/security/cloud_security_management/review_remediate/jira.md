---
aliases:
- /ja/security/cloud_security_management/guide/jira
further_reading:
- link: /security/cloud_security_management/guide
  tag: ドキュメント
  text: Cloud Security ガイド
- link: /integrations/jira/
  tag: ドキュメント
  text: Datadog Jira インテグレーション
products:
- icon: cloud-security-management
  name: Cloud Security Misconfigurations
  url: /security/cloud_security_management/misconfigurations/
- icon: cloud-security-management
  name: Cloud Security Identity Risks
  url: /security/cloud_security_management/identity_risks/
title: Cloud Security の問題に対して Jira issue を作成する
---

{{< product-availability >}}

[Jira インテグレーション][1] を利用すると、Cloud Security のセキュリティ問題の影響を受けているリソースについて Jira issue を作成できます。Cloud Security 向けの Jira は、[Cloud Security Misconfigurations][3] と [Cloud Security Identity Risks][4] で利用可能です。

**注**:
- Jira issue を作成するには `security_monitoring_findings_write` 権限が必要です。Datadog のデフォルト ロールや、Cloud Security で利用できる詳細なロール ベース アクセス コントロール権限については、[Role Based Access Control][2] を参照してください。
- 現時点では、1 つの指摘につき Jira の課題を 1 つ作成できます。

## Jira インテグレーションの構成

Cloud Security のセキュリティ問題から Jira issue を作成するには、[Jira インテグレーション][5] を設定する必要があります。手順の詳細は [Jira][1] インテグレーション ドキュメントを参照してください。

## 影響を受けたリソースの Jira 課題を作成する

{{< tabs >}}

{{% tab "Cloud Security Misconfigurations" %}}

誤構成の影響を受けた 1 つ以上のリソースの Jira 課題を作成するには、

1. [Misconfigurations エクスプローラー][1] で誤構成を選択します。
2. **Resources Impacted** の下で、1 つまたは複数の指摘を選択します。
3. 上部に表示される **Actions** ドロップダウンメニューで、**Create Jira Issue** を選択します。
4. 単一の課題を作成するか、複数の課題 (リソースごとに 1 つずつ) を作成するかを選択します。
5. Jira アカウントを選択します。
6. その課題を割り当てる Jira プロジェクトを選択します。
7. 利用可能なオプションから課題の種類を選択します。課題の種類によっては、追加情報の入力が必要になる場合があります。
8. **Create Issue** をクリックします。

また、スタンドアロン課題のサイドパネルから Jira 課題を作成することもできます。

1. [Misconfigurations エクスプローラー][1] で、Group By フィルターを **Resources** に設定します。
2. リソースを選択します。
3. **Misconfigurations** タブで、誤構成を選択します。
4. **Create Jira Issue** をクリックします。
5. Jira アカウントを選択します。
6. その課題を割り当てる Jira プロジェクトを選択します。
7. 利用可能なオプションから課題の種類を選択します。課題の種類によっては、追加情報の入力が必要になる場合があります。
8. **Create Issue** をクリックします。

課題を作成すると、サイドパネルに Jira 課題へのリンクが表示されます。

[1]: https://app.datadoghq.com/security/compliance

{{% /tab %}}

{{% tab "Cloud Security Identity Risks" %}}

アイデンティティリスクの影響を受ける 1 つ以上のリソースに関する Jira 課題を作成するには、

1. [Identity Risks エクスプローラー][1] でアイデンティティ リスクを選択します。
2. **Resources Impacted** の下で、1 つまたは複数の指摘を選択します。
3. 上部に表示される **Actions** ドロップダウンメニューで、**Create Jira Issue** を選択します。
4. 単一の課題を作成するか、複数の課題 (リソースごとに 1 つずつ) を作成するかを選択します。
5. Jira アカウントを選択します。
6. その課題を割り当てる Jira プロジェクトを選択します。
7. 利用可能なオプションから課題の種類を選択します。課題の種類によっては、追加情報の入力が必要になる場合があります。
8. **Create Issue** をクリックします。

また、スタンドアロン課題のサイドパネルから Jira 課題を作成することもできます。

1. [Identity Risks エクスプローラー][1] で、Group By フィルターを **Resources** に設定します。
2. リソースを選択します。
3. **Misconfigurations** タブで、アイデンティティリスクを選択します。
4. **Create Jira Issue** をクリックします。
5. Jira アカウントを選択します。
6. その課題を割り当てる Jira プロジェクトを選択します。
7. 利用可能なオプションから課題の種類を選択します。課題の種類によっては、追加情報の入力が必要になる場合があります。
8. **Create Issue** をクリックします。

課題を作成すると、サイドパネルに Jira 課題へのリンクが表示されます。

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