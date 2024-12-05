---
aliases:
- /ja/security/misconfigurations/findings/export_misconfigurations
further_reading:
- link: security/default_rules
  tag: ドキュメント
  text: デフォルトの CSM Misconfigurations クラウド構成コンプライアンスルールを調べる
- link: security/cspm/frameworks_and_benchmarks
  tag: ドキュメント
  text: フレームワークおよび業界のベンチマークの詳細
title: 誤構成をエクスポートする
---

[Misconfigurations Explorer][1] から誤構成のリストを CSV としてエクスポートするには、Misconfigurations Explorer の **Download as CSV** をクリックし、エクスポートする誤構成の最大数を選択してから、再度 **Download as CSV** をクリックします。最大で 50,000 件の誤構成をエクスポートできます。

{{< img src="security/cspm/findings/export-csv.png" alt="誤構成を CSV としてエクスポートするためのダイアログボックスと、エクスポートする誤構成の最大数を指定するオプション" style="width:65%;">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/compliance
