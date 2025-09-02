---
further_reading:
- link: /security/cloud_security_management/setup
  tag: ドキュメント
  text: Cloud Security Management の設定
- link: /security/cloud_security_management/misconfigurations
  tag: ドキュメント
  text: CSM Misconfigurations
- link: /security/cloud_security_management/identity_risks
  tag: ガイド
  text: CSM Identity Risks
title: Setting up IaC Scanning for Cloud Security Management
---

{{< callout url="https://www.datadoghq.com/product-preview/iac-security/" >}}
  Static Infrastructure as Code (IaC) scanning is in Preview. To request access, complete the form.
{{< /callout >}}

Cloud Security Management (CSM) で Infrastructure as Code (IaC) スキャンを有効化するには、以下の手順に従ってください。IaC スキャンは、[CSM Misconfigurations][1] および [CSM Identity Risks][2] で利用できます。

<div class="alert alert-info">静的 IaC スキャンは、バージョン管理の GitHub と IaC の Terraform をサポートしています。</div>

## GitHub インテグレーションをセットアップする

組織用の GitHub App を作成するための[手順][3]に従ってください。

<div class="alert alert-info">IaC スキャンを使用するには、GitHub App に <code>Contents</code> と <code>Pull Requests</code> に対する <code>Read & Write</code> 権限を付与する必要があります。これらの権限は、すべてのリポジトリまたは選択したリポジトリに適用できます。
</div>

## リポジトリで IaC スキャンを有効化する

GitHub インテグレーションのセットアップが完了したら、GitHub アカウントのリポジトリに対して IaC スキャンを有効化します。

1. [CSM Setup ページ][4]で、**Source Code Integrations** セクションを展開します。
2. 構成したい GitHub アカウントの **Configure** をクリックします。
3. IaC を有効にするには:
    - すべてのリポジトリ: **Enable Infrastructure as Code (IaC) Scanning** をオンに切り替えます。
    - 個別のリポジトリ: 対象のリポジトリで **IAC Scanning** オプションをオンに切り替えます。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/cloud_security_management/misconfigurations
[2]: /ja/security/cloud_security_management/identity_risks
[3]: /ja/integrations/github/#link-a-repository-in-your-organization-or-personal-account
[4]: https://app.datadoghq.com/security/configuration/csm/setup