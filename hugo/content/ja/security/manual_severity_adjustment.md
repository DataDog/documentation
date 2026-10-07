---
further_reading:
- link: /security/automation_pipelines/modify_severity/
  tag: ドキュメント
  text: 重大度変更ルール
products:
- icon: cloud-security-management
  name: Cloud Security
  url: /security/cloud_security_management/
- icon: security-code-security
  name: Code Security
  url: /security/code_security/
- icon: app-sec
  name: App and API Protection
  url: /security/application_security/
- icon: security-workload-security
  name: Workload Protection
  url: /security/workload_protection/
title: 重大度の調整
---
{{< product-availability >}}

[重大度変更ルール][1]を作成することなく、組織のビジネスコンテキストを反映するように検出結果の重大度を手動で調整します。

## サポートされている製品 {#supported-products}

以下の製品では、検出結果の重大度を手動で調整できます。

- [Cloud Security][2]
- [Code Security][3]
- [App and API Protection][4]
- [Workload Protection][5]

## 権限 {#permissions}

検出結果の重大度を調整するには、`security_monitoring_findings_write` または `appsec_vm_write` 権限が必要です。Datadog のデフォルトロールおよびきめ細かなロールベースのアクセス制御権限の詳細については、「[ロールベースのアクセス制御][6]」を参照してください。

## 検出結果の重大度を調整する {#adjust-the-severity-of-a-finding}

{{< img src="security/manual_severity_adjustment/finding_side_panel_button.png" alt="オーバーフローメニューで [Adjust Severity](重大度の調整) オプションが強調表示されている検出結果のサイドパネル" style="width:100%;" >}}

1. 検出結果を開きます。
2. [{{< ui >}}Adjust Severity{{< /ui >}}](重大度の調整) をクリックします。[**Adjust Severity**] ダイアログが開きます。
3. 新しい重大度を選択します (例: [**Critical**](重大))。
4. 必要に応じて説明を入力します。
5. [{{< ui >}}Adjust Severity{{< /ui >}}] をクリックします。

特定の基準を満たす検出結果の重大度を自動的に調整する場合は、「[重大度変更ルール][1]」を参照してください。

## 複数の検出結果の重大度を調整する {#adjust-the-severity-of-multiple-findings}

複数の検出結果の重大度を一度に調整するには:

1. 検出結果エクスプローラーで、最大 50 件の検出結果を選択します。
2. [{{< ui >}}Severity{{< /ui >}}](重大) をクリックします。[**Adjust Severity**] ダイアログが開きます。
3. 新しい重大度を選択します (例: [**Critical**](重大))。
4. 必要に応じて説明を入力します。
5. [{{< ui >}}Adjust Severity{{< /ui >}}] をクリックします。

## 変更された検出結果を特定する {#identify-modified-findings}

重大度が手動で調整された検出結果には、エクスプローラーの一覧表示および検出結果のサイドパネルのヘッダーに視覚的なインジケーターが表示されます。インジケーターにカーソルを合わせると、重大度を調整したユーザー、および入力された説明が表示されます。

{{< img src="security/manual_severity_adjustment/severity_pill_popover.png" alt="重大度が引き上げられたことを示す重大度アイコンと、重大度を調整したユーザーおよび入力された説明が表示されているポップオーバー" style="width:65%;" >}}

CVSS スコア (コンテナイメージの脆弱性、ホストの脆弱性、ライブラリの脆弱性、およびランタイムコードの脆弱性) を持つ検出結果については、サイドパネルの重大度セクションに以下の内訳も表示されます。
- 調整前の元の重大度レベル、CVSS スコア、および CVSS ベクトル。
- 調整を行ったユーザーの名前と、入力された説明。
- 最終的な重大度レベルと調整後の CVSS スコア。

{{< img src="security/manual_severity_adjustment/severity_breakdown.png" alt="重大度の内訳 (元の重大度、CVSS スコア、CVSS ベクトル)、調整を行ったユーザー、および最終的な重大度レベルと調整後の CVSS スコアが表示されている検出結果のサイドパネル" style="width:100%;" >}}

## 脆弱性の検出結果と CVSS スコア {#vulnerability-findings-and-cvss-scores}

Datadog によって調整された CVSS スコアを持つ脆弱性の検出結果では、重大度を手動で調整すると、`@severity_details.user_adjusted` に保存されている調整後のスコアも更新されます。更新されたスコアは、対象の重大度の CVSS v3 範囲のほぼ中間に設定されます。

| 対象の重大度 | CVSS v3 範囲 |
|---|---|
| None (なし)| 0.0 |
| Low (低)| 0.1–3.9 |
| Medium (中)| 4.0–6.9 |
| High (高)| 7.0–8.9 |
| Critical | 9.0–10.0 |

元の CVSS ベクトルが変更されることはありません。調整後のスコアに合わせて合成ベクトルが生成されることはありません。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/automation_pipelines/modify_severity/
[2]: https://app.datadoghq.com/security/compliance
[3]: https://app.datadoghq.com/security/code-security
[4]: https://app.datadoghq.com/security/appsec/inventory/finding
[5]: https://app.datadoghq.com/security/workload-protection/findings
[6]: /ja/account_management/rbac/permissions/#cloud-security-platform