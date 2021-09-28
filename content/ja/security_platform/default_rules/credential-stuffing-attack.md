---
aliases:
  - /ja/clw-d08-ehj
  - /ja/security_monitoring/default_rules/clw-d08-ehj
  - /ja/security_monitoring/default_rules/credential-stuffing-attack
category: 認証
disable_edit: true
integration_id: ''
kind: documentation
rule_category:
  - ログの検出
security: attack
tactic: TA0006-credential-access
technique: T1110-brute-force
template: 'true'
title: クレデンシャルスタッフィング攻撃
type: security_rules
---
### 目標
クレデンシャルスタッフィング攻撃によるアカウント乗っ取り（ATO）を検出。

クレデンシャルスタッフィング攻撃は、ユーザーアカウントを危険にさらすことによって最初のアクセスを取得するために使用されます。

攻撃者は、以前のユーザーデータベースの侵害、フィッシングの試み、またはその他の手段から、侵害されたユーザー名とパスワードのリストを取得します。次に、ユーザー名とパスワードのリストを使用して、アプリケーションのアカウントへのログインを試みます。

攻撃者は、負荷分散の目的で攻撃の負荷を分散したり、検出を困難にしたり、ブロックを困難にしたりするために、複数の IP アドレスを使用してアプリケーションを標的にするのが一般的です。

### 戦略
**成功した試行を判別するには:** 同じ IP アドレスから一定期間内に少なくとも 25 人の一意のユーザーからの多数の失敗したログインとあるユーザーの少なくとも 1 回の成功したログインを検出します。

**失敗した試行を判別するには:** 同じ IP アドレスから一定期間内に少なくとも 10 人の一意のユーザーからの多数の失敗したログインを検出します。

### トリアージと対応

[この Datadog Runbook](https://app.datadoghq.com/notebook/credentialstuffingrunbook) を使用して、調査に役立ててください。

1. それが本物の攻撃なのか誤検知なのかを判断する
2. 侵害されたユーザーを特定する
3. 侵害されたユーザーアカウントを修正する