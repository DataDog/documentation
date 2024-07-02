---
title: Automate Snapshots of Cloud Accounts via the Cloudcraft API
---

## 概要

Web アプリケーションからアクセスできる Cloudcraft の **Auto Layout** 機能は、AWS 環境の図を自動生成する強力なツールです。この機能により、ドキュメント作成プロセスが大幅に効率化され、新しいチームメンバーのオンボーディングが容易になります。

このガイドでは、一般的なコマンドラインユーティリティと Cloudcraft 開発者 API を使用してこの機能を利用するための詳しいアプローチを説明します。

<div class="alert alert-info">AWS アカウントと Azure アカウントの追加とスキャン、および Cloudcraft の開発者 API の使用は、Pro 契約者のみが利用できます。詳しくは <a href="https://www.cloudcraft.co/pricing">Cloudcraft の料金ページ</a>をご覧ください。</div>

## 前提条件

- 有効な [Cloudcraft Pro サブスクリプション][1]。
- 読み書き権限を持つ API キー。
- スキャンしたい AWS または Azure アカウントのアカウント ID。
- Unix ライクな環境 (Linux、macOS、Windows Subsystem for Linux) へのアクセス。
- コマンドライン操作に精通していること。
- API 利用に関する基本的な知識。

## アカウントのスナップショットを取得する

まずは、[Snapshot AWS account][2] または [Snapshot Azure account][3] エンドポイントを使用して、AWS または Azure アカウントのスナップショットを作成します。このプロセスは、Cloudcraft UI の **Scan Now** ボタンの機能を反映し、スナップショットを JSON 形式で出力します。

ターミナルで以下のコマンドを実行します。

{{< code-block lang="shell" >}}
curl \
  --url 'https://api.cloudcraft.co/PROVIDER/account/ACCOUNT_ID/REGION/json' \
  --tlsv1.2 \
  --proto '=https' \
  --silent \
  --header "Authorization: Bearer API_KEY"
{{< /code-block >}}

`PROVIDER` は例えば `azure` や `aws` などのクラウドプロバイダー、`ACCOUNT_ID` は Cloudcraft の AWS または Azure アカウントの ID、`REGION` は希望のスキャンリージョン、`API_KEY` は Cloudcraft API キーに置き換えます。

コマンドを実行すると、AWS アカウントスナップショットの JSON 表現が表示されます。この出力を直接ファイルに保存するには、以下のコマンドを使用します。

{{< code-block lang="shell" >}}
curl \
  --url 'https://api.cloudcraft.co/PROVIDER/account/ACCOUNT_ID/REGION/json' \
  --tlsv1.2 \
  --proto '=https' \
  --silent \
  --header "Authorization: Bearer API_KEY" > '/tmp/account-infra.json'
{{< /code-block >}}

スナップショットは一時ディレクトリに `account-infra.json` というファイル名で保存されます。

## 新しいブループリントを生成する

次に、[Create blueprint][4] API エンドポイントを使用して、Cloudcraft アカウントで新しいブループリントを作成します。保存されたスナップショットデータは、このリクエストのペイロードとして機能します。

ターミナルで以下のコマンドを実行します。

{{< code-block lang="shell" >}}
curl \
  --request 'POST' \
  --url 'https://api.cloudcraft.co/blueprint' \
  --tlsv1.2 \
  --proto '=https' \
  --silent \
  --header 'Content-Type: application/json' \
  --header "Authorization: Bearer API_KEY" \
  --data '@/tmp/account-infra.json'
{{< /code-block >}}

`API_KEY` は実際の Cloudcraft API キーに置き換えてください。

完了すると、クラウドインフラストラクチャーを反映した新しいブループリントが Cloudcraft アカウントに作成され、手動で **Scan Now** ボタンと **Auto Layout** ボタンを使用した場合の効果が再現されます。

ご不明な点やトラブルがございましたら、[Cloudcraft のサポートチームまでご連絡ください][5]。

[1]: https://www.cloudcraft.co/pricing
[2]: /cloudcraft/api/aws-accounts/#snapshot-aws-account
[3]: /cloudcraft/api/azure-accounts/#snapshot-an-azure-account
[4]: /cloudcraft/api/blueprints/#create-a-blueprint
[5]: https://app.cloudcraft.co/app/support
