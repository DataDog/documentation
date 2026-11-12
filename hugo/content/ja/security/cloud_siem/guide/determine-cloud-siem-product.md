---
description: Cloud SIEM は、Standalone、Add-on with Flex Logs、および Legacy 製品で利用可能です。このガイドに従って、組織が使用している製品を特定し、各製品で利用可能な機能を比較してください。
title: 組織で使用している Cloud SIEM 製品を確認する
---
## 概要{#overview}
Cloud SIEM は、以下の製品として利用可能です。
- Standalone
  - 12 か月 (365 日、使用量は GB 単位で測定)
  - 15 か月 (450 日、使用量は百万イベント単位で測定)
  <div class="alert alert-info">12 か月の保存期間が導入される前に Standalone を導入した組織の保存期間は 15 か月です。どちらも同じ機能を提供するため、ドキュメントでは両方を Standalone と呼びます。</div>
- Add-on with Flex Logs
- Legacy

Standalone 12 か月は、新しい Cloud SIEM 組織のデフォルト製品です。Standalone では次のようになります。
- 使用量は、分析済みイベント 100 万件ではなく、分析済みログのギガバイト単位で測定されます。
- Cloud SIEM インデックスでインデックス化されたログの取り込みは、個別に請求されるのではなく、分析済みログのコストに含まれます。
- データの保存期間は 15 か月間ではなく、365 日間 (12 か月間) です。

組織が使用している Cloud SIEM 製品を確認するには、2 通りの方法があります。
- [[Plan & Usage] (プランと使用量) ページを確認する](#plan-usage)
- [[Cloud SIEM settings (Cloud SIEM 設定)] ページを確認する](#settings)

各製品に含まれる内容を比較するには、[Cloud SIEM 製品別の機能](#features)を参照してください。

## [Plan & Usage] (プランと使用量) ページを確認する

<div class="alert alert-info">以下に該当する場合には、このオプションを使用できない可能性があります。
  <ul>
    <li>このページへのアクセス権がない</li>
    <li>組織で複数組織が構成されている場合、[Plan & Usage] (プランと使用量) ページはすべてのサブ組織のロールアップとなるため、複数の Cloud SIEM 製品タイルが表示されることがある</li>
  </ul>
  いずれの場合も、<a href="#settings">[Cloud SIEM settings (Cloud SIEM 設定)] ページを確認する</a>セクションの手順に従って、組織がどの製品を使用しているかを確認してください。
</div>

1. Datadog で [{{< ui >}}Plan & Usage{{< /ui >}}](プランと使用量) > [[**Usage & Cost**][1]] (使用量とコスト) ページに移動します。
1. [**Usage Summary**] (使用量のサマリー) セクションまでスクロールし、[{{< ui >}}Security{{< /ui >}}] (セキュリティ) タブをクリックします。
1. 組織が使用している Cloud SIEM 製品を示すタイルを見つけます。
   <table>
     <thead>
       <tr>
         <th style="width:60%">タイル</th>
         <th style="width:40%">製品</th>
       </tr>
     </thead>
     <tbody>
       <tr>
         <td><strong>Security Analyzed and Indexed Logs (Security 分析済みログおよびインデックス化ログ)</strong><br />
           {{< img src="security/cloud_siem/guide/tile_security_analyzed_indexed_logs.png" alt="'Security Analyzed and Indexed Logs' というラベルが付いたタイル。使用量の他に、その使用量がオンデマンドであったかどうかが示されます。" width="50%">}}
         </td>
         <td>Standalone</td>
       </tr>
       <tr>
         <td><strong>Cloud SIEM - Analyzed Logs (Add-On)</strong><br />
           {{< img src="security/cloud_siem/guide/tile_analyzed_logs_add_on.png" alt="'Cloud SIEM - Analyzed Logs (Add-On)' というラベルが付いたたタイル。使用量に加え、その使用量がオンデマンドであったかどうかが示されます。" width="50%">}}
         </td>
         <td>Add-on with Flex Logs</td>
       </tr>
       <tr>
         <td><strong>SIEM - Analyzed Logs</strong><br />
           {{< img src="security/cloud_siem/guide/tile_analyzed_logs.png" alt="'SIEM - Analyzed Logs' というラベルが付いたたタイル。使用量に加え、その使用量がオンデマンドであったかどうかが示されます。" width="50%">}}
         </td>
         <td>Legacy</td>
       </tr>
     </tbody>
   </table>

## [Cloud SIEM settings (Cloud SIEM 設定)] ページを確認する{#settings}

Datadog で [[Cloud SIEM settings]][2] (Cloud SIEM 設定) ページに移動します。このページには [{{< ui >}}Core Configuration{{< /ui >}}] (コア構成) または [{{< ui >}}Settings{{< /ui >}}] (設定) セクションが表示され、組織が使用している Cloud SIEM 製品が示されます。
<table>
  <thead>
    <tr>
      <th style="width:80%">[Settings] (設定) セクション</th>
      <th style="width:20%">製品</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>[<strong>Core Configuration</strong>] (コア構成) セクションと [<strong>Index Configuration</strong>] (インデックス構成)<br />
        {{< img src="security/cloud_siem/guide/config_core_index.png" alt="[Core Configuration] (コア構成) 見出しを含む構成設定。[Core Configuration] (コア構成) には [Index Configuration] (インデックス構成) セクションが含まれています。" width="80%">}}
      </td>
      <td>Standalone</td>
    </tr>
    <tr>
      <td><strong>Core Configuration</strong> section with <strong>Security Filters Configuration</strong><br />
        {{< img src="security/cloud_siem/guide/config_core_security_filters.png" alt="[Core Configuration] (コア構成) 見出しを含む構成設定。[Core Configuration] (コア構成) には [Security Filters Configuration] (Security フィルター構成) セクションが含まれています。" width="80%">}}
      </td>
      <td>Add-on with Flex Logs</td>
    </tr>
    <tr>
      <td><strong>Sources</strong> table<br />
        {{< img src="security/cloud_siem/guide/config_sources.png" alt="[Sources] (ソース) テーブルを含む構成設定" width="80%">}}
      </td>
      <td>Legacy</td>
    </tr>
  </tbody>
</table>

## Cloud SIEM 製品の機能{#features}

以下の表に、各製品で利用可能な Cloud SIEM 機能の一覧を示します。

| 機能 | Standalone | Add-on with Flex Logs | Legacy |
|---------|:----------:|:---------------------:|:------:|
| [コンテンツパック][4] | {{< X >}} | {{< X >}} | {{< X >}} |
| [デフォルトの検出ルールの編集][5] | {{< X >}} | {{< X >}} | {{< X >}} |
| [MITRE ATT&CK Map][6] | {{< X >}} | {{< X >}} | {{< X >}} |
| [セキュリティフィルター][7] | | {{< X >}} | {{< X >}} |
| [ログインデックスフィルター][8] | {{< X >}} | | |
| [MITRE ATT&CK Map コンパクト表示][6] | {{< X >}} | {{< X >}} | |
| [スケジュールルール][9] | {{< X >}} | {{< X >}} | |
| [シーケンス検出][10] | {{< X >}} | {{< X >}} | |
| [過去データジョブ][11] | {{< X >}} | {{< X >}} | |
| [リスクインサイト][12] | {{< X >}} | {{< X >}} | |
| [動的重大度][13] | {{< X >}} | {{< X >}} | |
| [Open Cybersecurity Schema Framework (OCSF)][14] | {{< X >}} | {{< X >}} | |
| [脅威インテリジェンス][15] | {{< X >}} | {{< X >}} | |

製品の特定に関するサポートが必要な場合、または製品に含まれていない機能を利用したい場合は、Datadog アカウントチームまたは [Datadogサポート][3]までお問い合わせください。

[1]: https://app.datadoghq.com/billing/usage
[2]: https://app.datadoghq.com/security/configuration/siem/setup
[3]: /ja/help/
[4]: /ja/security/cloud_siem/ingest_and_enrich/content_packs/
[5]: /ja/security/detection_rules/
[6]: /ja/security/cloud_siem/detect_and_monitor/mitre_attack_map/
[7]: /ja/security/cloud_siem/guide/customize-which-logs-cloud-siem-analyzes/#how-security-filters-work
[8]: /ja/security/cloud_siem/guide/customize-which-logs-cloud-siem-analyzes/#cloud-siem-standalone-filter-the-cloud-siem-index
[9]: /ja/security/cloud_siem/detect_and_monitor/custom_detection_rules/
[10]: /ja/security/cloud_siem/detect_and_monitor/custom_detection_rules/sequence/
[11]: /ja/security/cloud_siem/detect_and_monitor/historical_jobs/
[12]: /ja/security/cloud_siem/triage_and_investigate/entities_and_risk_scoring/
[13]: /ja/security/cloud_siem/detect_and_monitor/dynamic_severity/
[14]: /ja/security/cloud_siem/ingest_and_enrich/open_cybersecurity_schema_framework/
[15]: /ja/security/cloud_siem/ingest_and_enrich/threat_intelligence/