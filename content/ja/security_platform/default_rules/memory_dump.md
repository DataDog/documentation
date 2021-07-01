---
aliases:
  - /ja/inr-e2u-vr4
  - /ja/security_monitoring/default_rules/inr-e2u-vr4
  - /ja/security_monitoring/default_rules/memory_dump
control: ''
disable_edit: true
framework: ''
integration_id: ファイル整合性モニタリング
kind: documentation
rule_category:
  - ワークロードセキュリティ
scope: ''
security: コンプライアンス
source: ファイル整合性モニタリング
title: /proc/ のメモリファイルにアクセスがありました
type: security_rules
---
## 目標
サイバー攻撃者は、ターゲットに隣接したホストまたはコンテナへのアクセスが可能なターゲットを特に狙っています。狙いを定めたターゲットにスライド式に移動するために、対象とするホストまたはコンテナへのアクセスを可能にする認証情報を見つけようとしています。この認証情報を見つけるテクニックに、メモリダンピングがあります。システムメモリのコンテンツをディスクへダンプすることで、暗号化されていない認証情報を入手することができるのです。

## 戦略
この検出機能では、Linux の `/proc/` ディレクトリからアクセスできるメモリおよびメモリマップへのアクセスを監視します。

## トリアージと対応
1. この行為が期待したものでない場合は、ホストまたはコンテナを停止し、既知の良質なコンフィギュレーションへとロールバックします。
2. ホスト/コンテナで使用された認証情報をローテーションすることをご検討ください。