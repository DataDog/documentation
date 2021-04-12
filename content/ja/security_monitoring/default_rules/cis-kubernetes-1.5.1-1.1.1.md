---
aliases:
  - /ja/mdi-ze8-gbk
control: 1.1.1
disable_edit: true
framework: cis-kubernetes
kind: ドキュメント
rule_category:
  - ランタイムエージェント
scope: Kubernetes
security: コンプライアンス
source: Kubernetes
title: API サーバーのポッド仕様ファイルパーミッションが 644 またはこれより厳しい制限付きである
type: security_rules
---
## 説明

API サーバーのポッド仕様ファイルに 644 またはこれより厳しい制限のパーミッションがあることを確認

## 根拠

API サーバーのポッド仕様ファイルは、API サーバーの行動を決定するさまざまなパラメーターを制御します。このファイルパーミッションに制限を設定し、ファイルの統合性を維持する必要があります。ファイルの書き込みは、システムの管理者のみ可能とします。

## 監査

マスターノードで (システム上のファイルの場所に基づいて) 以下のコマンドを実行します。

```bash
stat -c %a /etc/kubernetes/manifests/kube-apiserver.yaml
```

アクセス許可が `644` 以上に制限されていることを確認します。

## 修復

下記のコマンドを (システムのファイル場所に応じて) マスターノードで実行します。例: `chmod 644 /etc/kubernetes/manifests/kube-apiserver.yaml`

## 影響

なし

## デフォルト値

デフォルトで、`kube-apiserver.yaml` ファイルにはパーミッション 640 があります。

## リファレンス

1. https://kubernetes.io/docs/admin/kube-apiserver/

## CIS Controls

バージョン 6

5.1 管理者特権の最小化および慎重な使用 - 管理者特権を最小化し、要求があった時のみ管理者アカウントを使用します。異常動作に対する、管理者のみが実行できる機能およびモニターの使用にフォーカスした監査に実装。

バージョン 7

5.2 セキュアな画像の維持 - 組織の承認済みコンフィギュレーションに基づき、社内の全システムにおいてセキュアな画像およびテンプレートを維持します。以下の画像またはテンプレートを使用した新規のシステム開発または既存のシステムは、違反とみなされます。