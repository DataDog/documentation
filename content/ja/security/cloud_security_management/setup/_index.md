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
further_reading:
- link: /getting_started/cloud_security_management
  tag: ドキュメント
  text: Cloud Security Management の概要
- link: security/default_rules
  tag: ドキュメント
  text: デフォルトのクラウド構成コンプライアンスルールを探る
- link: https://www.datadoghq.com/blog/datadog-runtime-security/
  tag: ブログ
  text: Datadog クラウドランタイムセキュリティの詳細はこちら
- link: https://www.datadoghq.com/blog/linux-security-threat-detection-datadog/
  tag: ブログ
  text: システムの Linux プロセスからセキュリティ脅威を検出する方法
- link: https://www.datadoghq.com/blog/pwnkit-vulnerability-overview-and-remediation/
  tag: ブログ
  text: 'PwnKit の脆弱性: 概要、検出、対処法'
- link: https://www.datadoghq.com/blog/dirty-pipe-vulnerability-overview-and-remediation/
  tag: ブログ
  text: 'Dirty Pipe の脆弱性: 概要、検出、対処法'
- link: https://www.datadoghq.com/blog/engineering/dirty-pipe-container-escape-poc/
  tag: ブログ
  text: Dirty Pipe の脆弱性を利用したコンテナからの脱却
- link: https://www.datadoghq.com/blog/dns-based-threat-detection/
  tag: ブログ
  text: DNS ベースの脅威検出を使用してネットワーク層で攻撃を捉える
kind: ドキュメント
title: Cloud Security Management の設定
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択した <a href="/getting_started/site">Datadog サイト</a> ({{< region-param key="dd_site_name" >}}) では、Cloud Security Management はサポートされていません。</div>
{{< /site-region >}}

<div class="alert alert-info">Cloud Security Management は、現在、CSM Enterprise、CSM Pro、CSM Workload Security の 3 つのパッケージで別々に提供されています。詳細は、<a href="https://www.datadoghq.com/blog/cloud-security-management-changes/">Datadog Cloud Security Management の変更点</a>をご覧ください。</div>

Cloud Security Management (CSM) は、クラウドインフラストラクチャー全体にわたってリアルタイムの脅威検出と継続的な構成監査を行い、そのすべてを統合ビューで表示することで、シームレスなコラボレーションと迅速な修復を実現します。

CSM には [CSM Enterprise][1]、[CSM Pro][2]、[CSM Workload Security][3] の 3 つのパッケージがあります。各パッケージには、次の表に示すように、特定の機能セットへのアクセスが含まれます。

<table>
    <tr>
        <th>パッケージ</th>
        <th>機能</th>
    </tr>
    <tr>
        <td><a href="/security/cloud_security_management/setup/csm_enterprise">CSM Enterprise</a></td>
        <td><ul><li style="font-size:16px"><a href="/security/threats">脅威</a></li><li style="font-size:16px"><a href="/security/misconfigurations">誤構成 (クラウドアカウントと Agent)</a></li><li style="font-size:16px"><a href="/security/identity_risks">アイデンティティリスク</a></li><li style="font-size:16px"><a href="/security/infrastructure_vulnerabilities">脆弱性 (コンテナイメージとホスト)</a></li></ul></td>
    </tr>
    <tr>
        <td><a href="/security/cloud_security_management/setup/csm_pro">CSM Pro</a></td>
        <td><ul><li style="font-size:16px"><a href="/security/misconfigurations">誤構成 (クラウドアカウント)</a></li><li style="font-size:16px"><a href="/security/infrastructure_vulnerabilities">脆弱性 (コンテナイメージ)</a></li></ul></td>
    </tr>
    <tr>
        <td><a href="/security/cloud_security_management/setup/csm_workload_security">CSM Workload Security</a></td>
        <td><ul><li style="font-size:16px"><a href="/security/threats">脅威</a></li></ul></td>
    </tr>
</table>

**注**: 

- パッケージに含まれていない機能は、[CSM Setup ページ][4]の指示に従っていつでも有効にすることができます。
- CSM Identity Risks と CSM Vulnerabilities はベータ版です。設定方法については、[Cloud Security Management Identity Risks][5] および [Cloud Security Management Vulnerabilities の設定][6]を参照してください。

## 前提条件

{{< tabs >}}
{{% tab "CSM Enterprise" %}}

{{% csm-prereqs-enterprise-ws %}}

{{% /tab %}}

{{% tab "CSM Pro" %}}

[CSM Pro を有効にする][1]には、まず AWS、Azure、Google Cloud Platform の Datadog クラウドアカウントインテグレーションを設定する必要があります。

[1]: /ja/security/cloud_security_management/setup/csm_pro

{{% /tab %}}

{{% tab "CSM Workload Security" %}}

{{% csm-prereqs-enterprise-ws %}}

{{% /tab %}}

{{< /tabs >}}

## 次のステップ

CSM のセットアップを開始するには、Datadog の [**Security** > **Setup**][4] セクションに移動します。ここに、CSM のセットアップと構成の詳細な手順が記載されています。詳細な手順については、[CSM Enterprise][1]、[CSM Pro][2]、[CSM Workload Security][3] のセットアップドキュメントを参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/cloud_security_management/setup/csm_enterprise
[2]: /ja/security/cloud_security_management/setup/csm_pro
[3]: /ja/security/cloud_security_management/setup/csm_workload_security
[4]: https://app.datadoghq.com/security/configuration/csm/setup
[5]: /ja/security/identity_risks/#setup
[6]: /ja/security/infrastructure_vulnerabilities/setup