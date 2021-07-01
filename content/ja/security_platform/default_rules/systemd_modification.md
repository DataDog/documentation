---
aliases:
  - /ja/cz4-vmk-ju2
  - /ja/security_monitoring/default_rules/cz4-vmk-ju2
  - /ja/security_monitoring/default_rules/systemd_modification
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
title: Systemd の修正
type: security_rules
---
## 目標
システムサービスへの変更を検出します。

## 戦略
特に実環境では、Amazon EC2 には AMIs、Azure では VM イメージまたは GCP イメージといったように、標準イメージに基づいてシステムを生成する必要があります。Systemd は Linux 製品の多くで、既定のサービスマネジャーとなっています。Systemd はバックグラウンドの処理やサービスのライフサイクルを管理しており、サイバーアタッカーがシステム内に侵入し続けた状態を確立するために利用されることがあります。サイバーアタッカーは、既存の Systemd サービスにコードを送り込んだり、新規のサービスをを作成したりします。Systemd サービスはシステムブートで起動できるため、アタッカーのコードがシステムリブートを通して残れるのです。

## トリアージと対応
1. 修正または作成されたサービスを確認します。
2. 対象のサービスが既知のものであり、既知のユーザーやプロセスによって修正されたかどうかを確認します。
3. 変更内容に同意できない場合は、問題のホストを停止し、許容可能なコンフィギュレーションへロールバックします。