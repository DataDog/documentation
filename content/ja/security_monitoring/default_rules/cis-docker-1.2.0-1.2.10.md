---
aliases:
  - /ja/aty-suc-tsx
control: 1.2.10
disable_edit: true
framework: cis-docker
kind: ドキュメント
rule_category:
  - ランタイムエージェント
scope: docker
security: コンプライアンス
source: docker
title: /etc/docker/daemon.json 監査が構成されている
type: security_rules
---
## 説明

該当する場合は `/etc/docker/daemon.json` を監査します。

## 根拠

Linux ファイルシステムおよびシステムのコールを監査するのと同時に、すべての Docker 関連ファイルおよびディレクトリも監査します。Docker daemon はルート権限で実行しその行動は `/etc/docker/daemon.json` を含むキーファイルやディレクトリに依存します。これにより、Docker daemon のさまざまなパラメーターが保持されるため、監査する必要があるのです。

## 監査

`/etc/docker/daemon.json` ファイルに関連付けられた監査ルールがあることを確認します。`/etc/docker/daemon.json` ファイルのルールを表示するには、次のコマンドを実行します。

```
auditctl -l | grep /etc/docker/daemon.json
```

## 修復

You should add a rule for the `/etc/docker/daemon.json` ファイルに規則を追加する必要があります。たとえば、以下の行を `/etc/audit/audit.rules` ファイルに追加します。

```
-w /etc/docker/daemon.json -k docker 
```

次に、監査 Daemon を再起動します。

```
service auditd restart
```

## 影響

監査により、大きいログファイルが生成されます。定期的にローテーションおよびアーカイブするようにしてください。監査ログ用に別途パーティションを作成すると、ほかの重要なパーティションに必要な容量を残すことができます。

## デフォルト値

デフォルトでは、Docker 関連のファイルおよびディレクトリは監査されません。システムに `/etc/docker/daemon.json` ファイルが存在しないこともあります。その場合、この推奨事項は適用できません。

## リファレンス

1. [https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html/Security_Guide/chap-system_auditing.html][1]
2. [https://docs.docker.com/engine/reference/commandline/dockerd/#daemon-configuration-file][2]

## CIS Controls

バージョン 6.14.6 機密情報に対する詳細監査ログの実行 - 非公開データへのアクセスや機密情報の特別認証に詳細監査ログを実行します。

バージョン 7.14.9 機密データへのアクセスおよび変更に対する詳細監査ログの実行 - 機密データまたは機密データの変更へのアクセスに詳細監査ログを実行します (File Integrity Monitoring、Security Information、Event Monitoring などのツールを使用)。                

[1]: https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html/Security_Guide/chap-system_auditing.html 
[2]: https://docs.docker.com/engine/reference/commandline/dockerd/#daemon-configuration-file