---
description: ターミナル セッションを記録し、Datadog で分析し、CoTerm のバリデーション レイヤーによって危険なターミナル コマンドから保護します。
further_reading:
- link: https://www.datadoghq.com/blog/introducing-coterm/
  tag: ブログ
  text: Datadog CoTerm でターミナル セッションをライブ配信、記録、ログ化
title: Datadog CoTerm
---

Datadog CoTerm は、ターミナル セッションを記録し、ターミナル コマンドに検証レイヤーを追加できる CLI ユーティリティです。

{{< img src="coterm/hero.png" alt="Datadog 内の Terminal Session というタイトルのページ。ターミナル セッションを示す埋め込み動画。シーク バーで動画の再生を制御。" style="width:100%;" >}}

CoTerm でできること:

- **ターミナル セッションを記録し、Datadog でこれらの記録を分析**。

   ターミナル セッションを調査することで、システムやセキュリティ インシデントがどのように発生し、どのように対処されたかのコンテキストが得られます。
- **危険なターミナル コマンドの誤実行から保護**。

   CoTerm はターミナル コマンドをインターセプトし、リスクの高いコマンドを実行する前に警告します。さらに厳密な監査と統制が必要な場合は、CoTerm を [Datadog Case Management][3] と併用することで、特に影響の大きいコマンドに対して承認を必須にできます。

セキュリティのため、CoTerm は [Sensitive Data Scanner][2] を使用して、パスワードや API キーなどの機密データを検出し、難読化します。

## 開始する

{{< whatsnext desc="このセクションには次のページが含まれます:" >}}
  {{< nextlink href="/coterm/install">}}<u>インストール</u>: CoTerm をインストールし、Datadog のアカウントへのアクセスを許可します。{{< /nextlink >}}
  {{< nextlink href="/coterm/usage">}}<u>使用方法</u>: CoTerm CLI を使用し、自動記録を設定して、危険なコマンドから保護します。{{< /nextlink >}}
  {{< nextlink href="/coterm/rules">}}<u>構成ルール</u>: CoTerm が特定のコマンドをどのように扱うかについて、柔軟に設定可能なルールを定義します。{{< /nextlink >}}
{{< /whatsnext >}}

## Datadog でターミナル セッションをレビューする

記録済みのターミナル セッションとプロセス データを Datadog で確認できます:

- **リプレイとして**: ビデオ風のプレーヤーで [ターミナル セッション][6] を視聴します。
- **イベントとして**: [Event Explorer][4] では、記録された各コマンドがイベントとして表示されます。
- **ログとして**: [Log Explorer][5] では、ターミナル セッションを複数行のログとして扱い、全文検索やクエリを実行できます。

## 既知の制限

- 記録されるセッションの最大継続時間は約 24 時間です。
- 機密データが複数行にまたがる場合、[機密データのマスキング][2] が失敗することがあります。
- Linux では、`seccomp` ベースのトレーシングにより、記録中に権限を昇格させることはできません。

## 関連情報

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /ja/security/sensitive_data_scanner/
[3]: /ja/service_management/case_management/
[4]: http://app.datadoghq.com/event/explorer?query=source%3Acoterm_process_info
[5]: https://app.datadoghq.com/logs?query=service%3Addcoterm
[6]: https://app.datadoghq.com/terminal-streams