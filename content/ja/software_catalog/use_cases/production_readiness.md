---
aliases:
- /ja/tracing/software_catalog/use_cases/production_readiness
further_reading:
- link: /infrastructure/
  tag: ドキュメント
  text: Infrastructure Monitoring
- link: /software_catalog/scorecards/
  tag: ドキュメント
  text: Scorecards
- link: /cloud_cost_management/
  tag: ドキュメント
  text: Cloud Cost Management
title: 本番運用の準備状況を評価する
---

Software Catalog を使用すると、モニタリング カバレッジの評価、ガバナンスのベスト プラクティスの順守、セキュリティやコスト最適化の機会の特定により、サービスが本番運用に対応していることを確認できます。

## モニタリング カバレッジを評価する

Software Catalog を使用すると、次のことができます:
- モニタリングや可観測性データが不足しているサービスを特定する。
- SLO や Monitor の未設定、オーナー不在のサービスなどのギャップを検出する。
- タグ付けのベスト プラクティスの順守を強制し、クロス テレメトリのインサイトを可能にするための設定を検証する。

[Software Catalog][3] でサービスをクリックして詳細なサイド パネルを開き、Setup Guidance タブを見つけます。このセクションでは、Monitor と SLO と Error Tracking などの Datadog 機能を活用するために必要な設定がサービスに施されているかどうかを確認できます。また、トレースやログなどの重要なテレメトリ データを収集できるよう、サービスが適切に構成されているかどうかも確認できます。

{{< img src="tracing/software_catalog/production-readiness-setup-guidance.png" alt="サービスの Setup Guidance タブ。サービスの構成の完了度と推奨される設定手順を表示。" style="width:100%;" >}}

**注**: この表はサービスのアクティビティを反映しており、製品の課金状況ではありません。たとえば、あるサービスが長期間にわたってインフラストラクチャー メトリクスを送信していない場合、ホストやコンテナでそのサービスが稼働していても、Infrastructure Monitoring には "Not Detected" と表示されることがあります。

## ガバナンスと可観測性

### Scorecards で健全性とパフォーマンスを追跡する

[Scorecards][1] は、チームやサービス全体のベスト プラクティスを俯瞰的に可視化し、効果的なコミュニケーションと、サービスの健全性およびパフォーマンスを改善するための意思決定を支援します。Software Catalog でメタデータが定義されているサービスは、Production Readiness と Observability Best Practices と Ownership & Documentation の合否基準に基づいて自動評価されます。

{{< img src="tracing/software_catalog/production-readiness-governance-and-obs.png" alt="Production Readiness と Observability Best Practices と Ownership and Documentation のデフォルト スコア カードと、各項目のパーセント スコア。" style="width:100%;" >}}

### Security タブで脆弱性に対処する

Software Catalog の Security タブを使用すると、サービスの依存関係に存在する脆弱性の特定と是正が行えます。さらに、このビューでは、どのサービスが攻撃の主要な標的になっているか、重大な脅威にさらされているかも把握できます。

{{< img src="tracing/software_catalog/security-tab.png" alt="Software Catalog の Security タブ ビュー。各サービスの脆弱性リスクと攻撃露出を表示。" style="width:100%;" >}}

特定のサービスのセキュリティ詳細を確認するには、次のいずれかを実行します:

- Software Catalog でサービスをクリックしてサイド パネルを開き、Security タブを見つけます。

  {{< img src="tracing/software_catalog/production-readiness-security.png" alt="単一のサービスに対する Security タブ。脆弱性リスクと攻撃露出の詳細を表示。" style="width:100%;" >}}

- **Service Page** で Security タブを開きます。サービス名にカーソルを合わせて **Service Page** を選択するか、サイド パネル右上の **Service Page** ボタンを使用します。

### Costs タブで支出を最適化する

Costs タブでは、[Cloud Cost Management][2] によって、非効率やコスト削減の機会、経時的なトレンドを特定できます。コスト データとサービス メトリクスを 1 か所に集約することで、エンジニアリング上の変更が全体のクラウド支出に与える影響を理解できます。

{{< img src="tracing/software_catalog/production-readiness-cost-changes.png" alt="Software Catalog の Costs ビュー。サービスごとの総コストと時間変化を表示。" style="width:100%;" >}}

特定のサービスのコスト詳細を確認するには、次のいずれかを実行します:

- Software Catalog でサービスをクリックしてサイド パネルを開き、Costs タブを見つけます。
- **Service Page** で Costs タブを開きます。サービス名にカーソルを合わせて **Service Page** を選択するか、サイド パネル右上の **Service Page** ボタンを使用します。


## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/software_catalog/scorecards/
[2]: /ja/cloud_cost_management/
[3]: https://app.datadoghq.com/software