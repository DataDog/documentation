---
aliases:
  - /ja/xt5-0xp-nsj
  - /ja/security_monitoring/default_rules/xt5-0xp-nsj
  - /ja/security_monitoring/default_rules/critical_binaries
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
title: 重要なシステムバイナリ
type: security_rules
---
## 説明
重要なシステムバイナリへの変更を検出します。

## 根拠
PCI-DSS は、カード支払い業界のコンプライアンスフレームワークです。クレジットカードのデータや、主要なクレジットカード会社からの取引を扱う一切のシステムは、PCI-DSS を遵守しなくてはなりません。PCI-DSS フレームワークのコントロール 11.5 には、「重要なシステムファイル、コンフィギュレーションファイル、コンテンツファイルに加えられた認証されていない修正 (変更、追加、削除など) について、担当者の注意を喚起」しなくてはならないと記載されています。Linux では、重要なシステムバイナリは通常、`/bin/`、`/sbin/`、`/usr/sbin/` のいずれかに保管されています。このルールにより、これらのディレクトリへ加えられたあらゆる修正を追跡できます。

## 修復
1. どのユーザーまたはプロセスが重要なシステムバイナリを変更したのかを確認します。
2. 変更が認証されていない場合、そして変更が安全であることを確認できない場合は、問題のホストまたはコンテナを許容可能なコンフィギュレーションへロールバックします。