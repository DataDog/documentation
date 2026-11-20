---
further_reading:
- link: /security/code_security/iac_security/setup
  tag: ドキュメント
  text: IaC Security をセットアップする
- link: /security/code_security/iac_security/configuration
  tag: ドキュメント
  text: IaC Security を構成する
- link: /security/code_security/iac_security/custom_rules/
  tag: ドキュメント
  text: IaC カスタムルール
- link: https://www.datadoghq.com/blog/github-actions-iac-security/
  tag: ブログ
  text: 'ボットよりも先に CI/CD の誤構成を見つける: Datadog IaC Security による GitHub Actions の保護'
title: IaC セキュリティルール
type: iac_security
---
{{% site-region region="gov,gov2" %}}
<div class="alert alert-danger">この製品は、選択した <a href="/getting_started/site">Datadog サイト</a> ({{< region-param key="dd_site_name" >}}) では利用できません。</div>
{{% /site-region %}}

[Infrastructure as Code (IaC) セキュリティ][1] は、デプロイ前に Infrastructure as Code ファイルの誤構成やセキュリティリスクを特定し、クラウド環境が安全でコンプライアンスを維持できるように支援します。

<div class="alert alert-info">Helm 解決が正しく機能するためには、各チャートディレクトリに依存するチャートが含まれている必要があります。詳細については、Helm ドキュメントの<a href="https://helm.sh/docs/topics/charts/#the-chart-file-structure">チャートファイル構造</a>を参照してください。</div>

組織固有の要件を適用するには、[IaC Custom Rules][2] を参照してください。

[1]: /ja/security/code_security/iac_security/
[2]: /ja/security/code_security/iac_security/custom_rules/

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}