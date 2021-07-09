---
aliases:
  - /ja/a78-b2n-xmd
  - /ja/security_monitoring/default_rules/a78-b2n-xmd
  - /ja/security_monitoring/default_rules/cron_at_job_injection
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
title: Cron AT ジョブの作成
type: security_rules
---
## 目標
システム上で新規 cron ジョブの作成や修正を検知します。

## 戦略
cron は、時間ベースのスケジュールでタスクを実行するタスク管理システムです。サイバーアタッカーが cron ジョブを利用して、システムに入り込んだりシステムブートで悪意のあるコードを実行したりすることがあります。cron ジョブは、遠隔でコードを実行したり、各種ユーザーコンテキストの下でプロセスを実行したりする際にも使用できます。

## トリアージと対応
1. 作成または修正された cron タスクを確認します。
2. cron タスクが、既知のユーザーまたはプロセスによって作成または修正されたかどうかを確認します。
3. 変更内容に同意できない場合は、問題のホストまたはコンテナを停止し、許容可能なコンフィギュレーションへロールバックします。