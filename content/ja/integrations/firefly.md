---
app_id: firefly
categories:
- automation
- cloud
- 構成とデプロイ
- developer tools
- notifications
custom_kind: integration
description: クラウドを規約に準拠させる
integration_version: 1.0.0
media:
- caption: フルクラウドインベントリ
  image_url: images/FF-inventory.png
  media_type: image
- caption: 自動コード化
  image_url: images/FF-codification.png
  media_type: image
- caption: ドリフトの検出と修正
  image_url: images/FF-fix-drifts.png
  media_type: image
- caption: ポリシー違反の検出と修正
  image_url: images/FF-insights.png
  media_type: image
supported_os:
- linux
- windows
- macos
title: Firefly
---
## 概要

Firefly は、クラウドチームがクラウドのフットプリント (AWS、GCP、Kubernetes、Datadog など) を検出し、リソースを Infrastructure-as-Code に自動的に変換し、ドリフトやポリシー違反を検出し、クラウドを望ましい状態に調整できるようにする、クラウドアセットマネジメントソリューションです。
Firefly は、Datadog のアセットを任意の Infrastructure-as-Code (IaC) ツールのコードとして管理することで、チームが Datadog のアセットを不変、バージョン管理、拡張性、監視状態を維持できるように支援します。

### フルクラウドインベントリ

AWS、K8s、GCP、Okta など、他のクラウドアセットと一緒に、すべての Datadog アセットの完全検索可能なインベントリを取得します。

### 自動コード化

Terraform、Pulumi、Cloudformation、CDK 仕様など、単一または複数の Datadog アセットを自動でコード化します。

### ドリフトの検出と修正

Infrastructure-as-Code と実際のクラウドの状態に差異がある場合、リアルタイムで通知され、ドリフトが発生すると、リポジトリに直接修正をプッシュします。

### ポリシー違反の検出と修正

Firefly の統合ポリシーエンジンにより、危険な構成ミスやコストのかかる使用不足を発見し、カスタムポリシーと既成ポリシーの両方でポリシー違反のアラートを受け取ることができます。

## セットアップ

### Firefly - Datadog インテグレーションの構成

1. Datadog のアプリケーションキーと API キーを新規に作成します。
1. Firefly UI で、**Settings > Integrations > Datadog** に移動します。
1. アプリケーションキーをコピーして、専用の行に貼り付けます。
1. API キーをコピーして、専用の行に貼り付けます。
1. **Done** をクリックします。

## サポート

何か質問はありますか？メール [contact@gofirefly.io](mailto:contact@gofirefly.io) またはアプリ内チャットをご利用ください。