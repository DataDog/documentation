---
description: Datadog インストールを円滑に稼働させ続けましょう。
further_reading:
- link: getting_started/dashboards/
  tag: ドキュメント
  text: ダッシュボードの概要
title: Datadog インストールの運用と保守
---

[計画][24] と [構築][25] の各セクションでは、目標設定、インテグレーションの戦略立案、本番運用を円滑にするための Datadog 環境の構築と反復について洞察を得ました。次に、運用フェーズについて学びます。このフェーズでは Datadog インストールを効率的に稼働させ続けるために、社内外の一連のタスクを管理します。

## サービス タスク

新しい Datadog インストールは段階的にリリースして、リスクを低減し採用を促進します。本セクションでは、Datadog のユーザー エクスペリエンスを最適化するための項目リリースの順序を示します。IT アーキテクチャの多様性を考慮し、本ガイドは概要的な内容です。主なポイントは次のとおりです:

### 新規インフラストラクチャー インスタンスのオンボーディング

インフラストラクチャーは IT と可観測性の中核要素です。これは Datadog 管理者チームにとって最も主要かつ頻度の高いタスクです。このプラットフォームは適応性が高く、多くのタスクを効率化するツールを提供します。まずは自分たちの環境に合わせて調整しましょう。あなたの IT アーキテクチャには、ハイパーバイザー、ハイパースケーラー、サーバーレス インフラストラクチャーなどのコンポーネントが含まれる可能性があります。

**推奨事項:**

大規模な Agent をリモートで管理するには [Fleet Automation][1] を使用します。新しいインフラストラクチャー要求に備えて各チームを継続的にモニタリングし、早期にフラグを立て、インフラ提供の妥当な拡張にエンジニアリング リソースを集中させましょう。

### 新しいアプリケーション フットプリントのオンボーディング

Datadog へのアプリケーション追加は、Datadog 管理の初期に一般的なタスクです。ローカルの条件に合致し、Datadog の要件を満たす効率的な仕組みを構築してください。最低限、計画フェーズのナレッジ ベースの項目に加えて、次を検討します:

- Universal Service Tag `version` は多くの可視化にとって重要です。これらの高付加価値の可視化を実現するために、自動化され、信頼性が高く、コンプライアンスに準拠した手法を整備しましょう。

- 包括的な [Software Catalog][2] を整備すると、将来多くのメリットが得られます。Software Catalog は Datadog の設計パターンの中核であり、ガバナンス、依存関係、サービス定義のオブジェクトを保持します。

**推奨事項:**
アプリケーションのビルド プロセスに統合された自動バージョン タグ付けを整備しましょう。Software Catalog に注力し、セットアップ ガイダンスに基づいて準備状況をトラッキングしてください。

## 技術的な問題への対応

プラットフォーム アズ ア サービスという構造のため、Datadog は管理者に大きなトラブルシューティングを要求しません。ホスト上の Agent の問題を特定するには、` datadog-agent status` [コマンド][3] を使用します。このコマンドは、対処すべき領域を特定できる、粒度の高い具体的かつ実行可能な情報を出力します。さらに、`datadog-agent flare` コマンドを使用すると、Datadog Support が対処すべき問題を迅速に表面化できます。

**推奨事項:**
初日から `status` と `flare` コマンドを使いましょう。

## 管理タスク

他のエンタープライズ ソフトウェアと同様に、継続的な保守タスクは体系立てて管理し、ローカル ポリシーに準拠させる必要があります。一般的な継続タスクには次が含まれます:

### 使用量の監視

消費量のモニタリングは不可欠であり、その目的のために提供されるツールを採用することも同様に重要です。Datadog には、この機能の基盤となる [推定使用量メトリクス][5] ダッシュボードがあります。すべてのログ、メトリクス、トレースにわたる [推定使用量][6] を可視化する標準ダッシュボードも用意されています。

### Dashboards と Monitors のデプロイ

ユーザーが Datadog に慣れてくると、頻繁に使用される [dashboards][7] や [monitors][8] などの項目について、調整や改善を求められる場合があります。SLO やその他のコンテンツ オブジェクトを含むこれらのコンポーネントは、反復的な開発を前提としており、JSON で記述されています。複製、エクスポート、変更、インポートが可能で、フラット ファイルとして保存できます。さらに、[Terraform プロバイダ][9] やダッシュボードの操作・作成用の [dashboards API][10] も利用できます。

ダッシュボードを作成するときは、構築のプロセスよりも、表示したいコンテンツを優先してください。この創造的なプロセスは、ダッシュボード作成ツールや、製品に同梱されている事前構築済みダッシュボードによって支援されます。{{< translate key="integration_count" >}} 個のインテグレーションごとに用意された各ダッシュボードは、対応するテクノロジーを監視するための付加価値のあるテンプレートです。標準ダッシュボードは、Datadog の経験と規範的な可観測性モデルという利点を提供します。

**推奨事項:**

- 作成するダッシュボードの目的を明確にします。
- [推定使用量メトリクス][6] に基づいて Datadog 使用量の Monitors を設定します。
- 同じ推定使用量メトリクスに対して [Anomaly Monitor または Change Monitor][11] を作成し、Datadog 使用量がスパイクしたときにアラートを送信します。
- 時間を節約するために、他のダッシュボードを [再利用とクローン][12] します。
- 使用量を管理するために [OOTB ダッシュボード][13] を活用します。

一般的な OOTB ダッシュボードの一例は「AWS EC2 Overview Dashboard」です:

{{< img src="/administrators_guide/ec2_overview.png" alt="AWS EC2 Overview Dashboard" style="width:90%;">}}

### API キー ローテーション

Datadog プラットフォームは標準的な RESTful API キー 認証を使用しており、キーのローテーションを含む標準的な [API キー セキュリティ][14] に従うことを推奨します。セキュリティ プロファイルとローテーション運用を最適化するため、これらのキーの割り当てを論理的なワーキング グループで整理することも有益です。

**推奨事項:**

Datadog API と App Keys を自社システムへ組み込み、キー管理を行う。保守しやすいグループにキーを整理します。

### RBAC オブジェクト: Roles、Teams、Permission Sets

Datadog の [RBAC][15] はあなたの SAML プロバイダと、その上流にある AD/LDAP ストアに依存します。AD のユーザー グループをミラーし、標準的なグループ マッピングで Datadog 固有の権限を割り当てることができます。キー バリュー 構造のための具体的なグループ名と属性をやり取りするには、Datadog 管理者と SAML/AD/LDAP 管理者の協業が必要です。

## Datadog Agent の更新

Agent コンポーネントはセキュリティおよび機能強化により定期的に更新されるため、常に最新状態を保つのが最善です。新しいソフトウェアのテストとリリースについては、ローカルの手順に従ってください。

**推奨事項:**

既存のパッチ 管理 標準およびアップグレード ポリシーに Datadog のアップグレードを組み込みましょう。[Datadog リリース フィード][17] を購読し、アップグレードが必要な Agent を把握するために [Fleet Automation ページ][18] を注意深く監視してください。

## サマリー

Datadog の管理には、既存のプロセス 標準にうまく適合するアクティビティがいくつかあります。キー ローテーション、パッチ 更新、オンボーディング、Infrastructure as Code (IaC) など、標準システムに Datadog を組み込みましょう。これらの標準を早い段階で公開し、新しい Datadog インストールの利用開始においてユーザーを案内してください。

## 次のステップ

Datadog インストールの計画、セットアップ、保守に成功したら、継続的な Datadog 活用を支援する以下のリソースを活用してください:

- [Datadog 認定資格を取得する][20]
- [Datadog サポートの利用を開始する][21]
- [Datadog の新機能およびセキュリティ ニュース レターに登録する][22]
- [The Monitor ブログをチェックする][23]

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/fleet_automation/
[2]: /ja/software_catalog/
[3]: /ja/agent/configuration/agent-commands#agent-information
[4]: /ja/agent/troubleshooting/send_a_flare/?tab=agent\#send-a-flare-using-the-flare-command
[5]: https://app.datadoghq.com/dash/integration/31281/estimated-usage-overview?fromUser=false\&refresh_mode=sliding\&view=spans\&from_ts=1721313591456\&to\_ts=1721317191456\&live=true
[6]: /ja/account_management/billing/usage_metrics/
[7]: /ja/dashboards/#overview
[8]: /ja/monitors/
[9]: /ja/getting_started/integrations/terraform/#dashboards
[10]: /ja/api/latest/dashboards/
[11]: /ja/monitors/types/anomaly/
[12]: /ja/getting_started/dashboards/#start-by-reusing-other-dashboards
[13]: https://app.datadoghq.com/dashboard/lists
[14]: /ja/account_management/api-app-keys/#using-multiple-api-keys
[15]: /ja/account_management/rbac/?tab=datadogapplication
[16]: /ja/integrations/
[17]: https://github.com/DataDog/datadog-agent/releases
[18]: https://app.datadoghq.com/fleet
[19]: /ja/api/latest/key-management/
[20]: https://www.datadoghq.com/certification/overview/
[21]: /ja/getting_started/support/
[22]: https://www.datadoghq.com/subscriptions/
[23]: https://www.datadoghq.com/blog/
[24]: /ja/administrators_guide/plan/
[25]: /ja/administrators_guide/build/