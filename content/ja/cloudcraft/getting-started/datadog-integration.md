---
title: Datadog インテグレーション
---

## 概要

Datadog と Cloudcraft のインテグレーションにより、ユーザーはクラウドインフラストラクチャーのモニタリングと可視化のワークフローを効率化できます。

Datadog の強力なモニタリングプラットフォームを活用することで、Cloudcraft に Datadog アカウントでログインし、Cloudcraft 上のあらゆるリソースから Datadog の該当ビューへシームレスに移動したり、Datadog ですでに設定されているクラウドアカウントを自動的に Cloudcraft に取り込んで利用したりできます。

## Datadog シングルサインオン (SSO)

Cloudcraft では、Datadog アカウントを使用したサインアップとログインが可能です。このインテグレーションにより、Datadog でのモニタリングデータと Cloudcraft のアーキテクチャ図を連携させる、統一された体験を提供します。

### Datadog SSO でのサインアップ

まずは Cloudcraft のサインアップ時に **Sign up with Datadog** オプションを選択してください。サインアップ後は Datadog の認証情報を使って Cloudcraft にログインできます。これにより、ログインが簡単になり、2 つのプラットフォームをシームレスに連携できます。

Datadog SSO を使用すると、自動的に以下の機能を利用できます。

- **プラットフォーム間の連携機能**: Cloudcraft と Datadog を行き来して、クラウドインフラストラクチャーやそのパフォーマンスをスムーズに分析できます。
- **クラウドアカウントの自動インテグレーション**: Datadog で設定されたクラウドアカウントが自動的に Cloudcraft に追加され、両プラットフォームでインフラストラクチャー全体を把握できます。

### 既存アカウントへの Datadog SSO の有効化

最初に Google SSO や標準のユーザー名とパスワードなど、別のログイン方法でサインアップした場合、Datadog インテグレーションのすべての機能を利用することはできません。Datadog SSO に切り替えるには、[Cloudcraft サポートチーム][1]に連絡してアカウントの移行を依頼してください。

## クラウドアカウントのインテグレーション

<div class="alert alert-info">この機能は Amazon Web Services (AWS) アカウントのみサポートしています。現時点では Azure やその他のクラウドプロバイダとの同期は利用できません。</div>

Cloudcraft と Datadog のインテグレーションにより、Datadog で既に設定されているアカウントを自動的に Cloudcraft に追加でき、クラウドアカウントの管理を効率化します。Cloudcraft 側で追加の設定は不要です。

デフォルトでは、これらのアカウントは Cloudcraft チームの全メンバーと共有され、すべてのメンバーがアクセスできます。

{{< img src="cloudcraft/getting-started/datadog-integration/manage-aws-accounts.png" alt="Datadog インテグレーションを使った Cloudcraft 上の AWS アカウント管理インターフェイス。" responsive="true" style="width:100%;">}}

Cloudcraft でリソースを可視化・図示するには、[Datadog でリソースコレクションを有効にしている][2]ことを確認してください。リソースコレクションが有効になると、Datadog は読み取り専用の API 呼び出しを行うことで AWS アカウントのリソース情報を収集します。Cloudcraft はこの情報を利用してインフラストラクチャーを可視化します。この機能がない場合、AWS アカウントは Cloudcraft に追加されても、図示に使えるリソースはありません。

Datadog に AWS アカウントが未登録の場合は、まず [AWS インテグレーションガイド][3]の手順に従って追加してください。

### Cloudcraft に取り込んだ AWS アカウントを管理する

Datadog から取り込まれた AWS アカウントは、Cloudcraft の **Live** タブにあるアカウントセレクターで Bits アイコンが付けられて表示されます。

{{< img src="cloudcraft/getting-started/datadog-integration/bits-icon.png" alt="Cloudcraft と Datadog のインテグレーションで管理される AWS アカウントを表示するクラウドアカウントセレクター。" responsive="true" style="width:100%;">}}

アカウントが多数ある場合に、必要なものだけに絞りたいときは、可視性設定を使って **Live** タブのアカウントセレクターから特定のアカウントを隠すことができます。

これらのアカウントの可視性設定を管理するには、以下の手順を行います。

1. **User > AWS Accounts** に移動します。
2. アカウント名の横にある **編集アイコン** (鉛筆アイコン) を選択します。
3. **Visibility on Live** オプションを切り替えると、チームへの表示有無を制御できます。

アカウント名を管理するには、以下の手順を行います。

1. **User > AWS Accounts** に移動します。
2. アカウント名の横にある **編集アイコン** (鉛筆アイコン) を選択します。
3. **Name** フィールドでアカウント名を更新します。

<div class="alert alert-info">名前や可視性設定を変更しても、Datadog 側のアカウントには影響しません。</div>

### パフォーマンス上のメリット

Datadog から取り込んだ AWS アカウントは、Cloudcraft に手動で追加したアカウントよりも、Cloudcraft で図を作成するときのパフォーマンスが向上します。これは、Cloudcraft が AWS API の代わりに、Datadog ですでに収集されたデータを使用するためです。

## Bits メニュー

Cloudcraft の Bits メニューは、アーキテクチャ図上の任意のリソースから Datadog の関連情報にアクセスするための入り口です。ログの閲覧、APM トレースの確認、メトリクスの分析など、Bits メニューを使えば、Cloudcraft から Datadog へスムーズでコンテキストに応じたナビゲーションがワンクリックで可能になります。

Bits メニューの使い方について詳しくは、[Bits メニューのドキュメント][4]を参照してください。

[1]: https://app.cloudcraft.co/app/support
[2]: /ja/integrations/amazon_web_services/#resource-collection
[3]: /ja/integrations/amazon_web_services/
[4]: /ja/cloudcraft/getting-started/using-bits-menu/