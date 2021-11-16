---
aliases:
  - /ja/3fe-1fm-dlw
  - /ja/security_monitoring/default_rules/3fe-1fm-dlw
  - /ja/security_monitoring/default_rules/aws-fsx-excessive-file-denied
disable_edit: true
integration_id: amazon-fsx
kind: documentation
rule_category:
  - ログの検出
scope: amazon-fsx
security: attack
source: amazon-fsx
tactic: TA0007-discovery
technique: T1083-file-and-directory-discovery
title: AWS FSx 過度のファイル拒否
type: security_rules
---
## 目標

アクセス権のないファイルへアクセスするユーザーを検出、特定します。

## 戦略

AWS FSx ログを監視し、`@evt.id` が `4656`、`@Event.System.Keywords` が `0x8010000000000000` である場合が 10 回以上発生したことを検出します。

## トリアージと対応
1. ログを検査し、ユーザーがファイル `{{@ObjectName}}` にできるかどうかを決定します。
2. アクセス権が正当でない場合は、ユーザー `({{@usr.id}})` を調査します。