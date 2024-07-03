---
app_id: sentry
app_uuid: c5e6ea68-6042-405f-abda-1e4fced494ee
assets:
  integration:
    auto_install: true
    events:
      creates_events: true
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 56
    source_type_name: Sentry
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- collaboration
- issue tracking
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: sentry
integration_id: sentry
integration_title: Sentry
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: sentry
public_title: Sentry
short_description: See Sentry exceptions in your Datadog event stream.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Collaboration
  - Category::Issue Tracking
  configuration: README.md#Setup
  description: See Sentry exceptions in your Datadog event stream.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/datadog-sentry-integration-collaborative-bug-fixing/
  support: README.md#Troubleshooting
  title: Sentry
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
{{< img src="integrations/sentry/sentry.png" alt="sentry イベント" popup="true">}}

## 概要

Sentry は、セルフホスト型およびクラウド型のアプリケーションパフォーマンスモニタリングとエラー追跡を提供し、ソフトウェアチームがより明確な情報を把握し、迅速に解決し、継続的に学習できるようにします。

Datadog Sentry インテグレーションは、Sentry イベントを自動的に Datadog イベントストリームに転送し、エラーやバグ修正の検索やコメント、Sentry エラーと他のシステムのメトリクスやデータとの相関付けを可能にします。

## セットアップ

### インストール

次の手順で Sentry インテグレーションをセットアップします。

1. Sentry にログインします。
2. **Settings > Projects** に移動し、適切なプロジェクトを選択します。
3. 左側で、**Legacy Integrations** を選択します。
4. **Webhooks integration** までスクロールダウンし、スライダートグルをクリックしてインテグレーションを有効化し、次に **Configure Plugin** をクリックします。
5. **Callback URLs’** の下に、インテグレーションタイルからコピーしたコールバック URL を入力します。
6. **Save changes** をクリックします。
7. 必要に応じて、**Enable Plugin** をクリックしてインテグレーションを有効にします。

デフォルトでは、Sentry は、(既にログに記録された例外の新しいインスタンスではなく) 新しい例外が発生するたびに、Webhook にイベントデータを ping します。別の (または追加の) トリガーが必要な場合は、プロジェクト設定の Alerts セクションで構成できます。

### エラーにホスト名を追加する (オプション)

Sentry が報告するサーバー名が Datadog が認識するホスト名と一致しないことがあります。これを解決するには、各イベントにアタッチされている `server_name` タグにカスタム値を設定します。

Sentry のデフォルトの `server_name` の値を保持したまま、別のホスト名を使用するには、イベントに `hostname` タグを設定します。特定の言語については、Sentry の [タグのカスタマイズ][1]のドキュメントを参照してください。

## トラブルシューティング

### Datadog で Sentry のエラーが消えている

Datadog から Sentry のエラーが消えている場合、Sentry Webhook がトリガーされていない可能性があります。これは以下のシナリオが原因であることが考えられます。

**規則がトリガーされた場合にのみ、アラートが送信される**。<br>
たとえば、規則条件が「イベントが最初に表示されたとき」である場合、新しい問題が作成されるまで、アラートはディスパッチされません。プロジェクトが受信している問題のユニーク数によっては、少し時間がかかります。

**通知インテグレーションが無効化されている**。<br>
通知インテグレーションが、規則アクションで特定のサービスとして有効化されている、または「すべての有効化されたサービス」に含まれていることを確認してください。

## 参考資料

- [Datadog の Sentry インテグレーションによる共同バグ修正][2]

[1]: https://docs.sentry.io/platforms/java/enriching-events/tags/
[2]: https://www.datadoghq.com/blog/datadog-sentry-integration-collaborative-bug-fixing/