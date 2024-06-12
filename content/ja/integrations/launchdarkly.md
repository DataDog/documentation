---
app_id: launchdarkly
app_uuid: 7144d0c5-42f2-4cc5-b562-5f77debc0c52
assets:
  dashboards:
    launchdarkly: assets/dashboards/launchdarkly.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: launchdarkly_relay.connections_env_platformCategory_userAgent
      metadata_path: metadata.csv
      prefix: launchdarkly_relay.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10025
    source_type_name: LaunchDarkly
author:
  homepage: https://launchdarkly.com
  name: LaunchDarkly
  sales_email: sales@launchdarkly.com
  support_email: support@launchdarkly.com
categories:
- 構成 & デプロイ
- notifications
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/launchdarkly/README.md
display_on_public_website: true
draft: false
git_integration_title: launchdarkly
integration_id: launchdarkly
integration_title: LaunchDarkly
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: launchdarkly
public_title: LaunchDarkly
short_description: 機能リリースとインフラストラクチャーの変更を自信を持ってコントロールすることができます。
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Configuration & Deployment
  - Category::Notifications
  - Offering::Integration
  - Offering::UI Extension
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: 機能リリースとインフラストラクチャーの変更を自信を持ってコントロールすることができます。
  media:
  - caption: LaunchDarkly の概要を説明します。
    image_url: images/video-thumbnail.png
    media_type: ビデオ
    vimeo_id: 637675972
  - caption: LaunchDarkly のフラグウィジェットとイベントインテグレーションで構成された LaunchDarkly ダッシュボード。
    image_url: images/dashboard.png
    media_type: image
  - caption: フラグ変更サイドパネルを開けた LaunchDarkly ダッシュボード。
    image_url: images/toggle-flag.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: LaunchDarkly
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要


{{% site-region region="gov" %}}
**Datadog {{< region-param key="dd_site_name" >}} サイトでは LaunchDarkly インテグレーションはサポートされていません**。
{{% /site-region %}}


LaunchDarkly は、Datadog と以下のインテグレーションを提供しています。

### イベントインテグレーション

Datadog の [LaunchDarkly][1] イベントインテグレーションは、モニタリングダッシュボードにフラグイベントマーカーをもたらし、顧客のサービスやシステムに対する LaunchDarkly 機能のデプロイの効果を確認することができるようにします。例えば、デプロイされた機能が原因でサービスが遅くなった場合、Datadog 内でその原因を確認することができます。

### 機能フラグ追跡インテグレーション

LaunchDarkly の機能フラグ追跡インテグレーションは、RUM データを機能フラグで強化し、パフォーマンスの監視と行動の変化を可視化します。どのユーザーにユーザーエクスペリエンスが表示され、それがユーザーのパフォーマンスに悪影響を及ぼしているかどうかを判断します。

### ダッシュボードウィジェット

LaunchDarkly のダッシュボードウィジェットでは、サブセット機能のフラグターゲティングトグルを Datadog ダッシュボードに固定し、1 つのウィンドウから機能の稼働を監視・実行することができます。

### リレープロキシメトリクスのインテグレーション

[LaunchDarkly Relay Proxy][2] を使用している場合、アクティブ接続や累積接続などのメトリクスを Datadog にエクスポートするように構成することができます。

## 計画と使用

### イベントインテグレーション

LaunchDarkly イベントインテグレーションは、Datadog の管理者が作成できる [Datadog API キー][3]を使用します。Datadog API キーを取得したら、[Datadog インテグレーションの LaunchDarkly ドキュメント][4]を参照して、Datadog 用の LaunchDarkly イベントインテグレーションを設定する方法を学びます。

### 機能フラグ追跡の設定

機能フラグ追跡は、RUM ブラウザ SDK で利用可能です。詳細なセットアップ方法は、[RUM での機能フラグデータの概要][5]ガイドをご覧ください。

1. ブラウザ RUM SDK バージョン 4.25.0 以上に更新します。
2. RUM SDK を初期化し、`["feature_flags"]` で `enableExperimentalFeatures` 初期化パラメーターを構成します。
3. LaunchDarkly の SDK を初期化し、以下に示すコードのスニペットを使用して、Datadog へのインスペクターレポート機能フラグ評価を作成します。

```
const client = LDClient.initialize("<APP_KEY>", "<USER_ID>", {
  inspectors: [
    {
      type: "flag-used",
      name: "dd-inspector",
      method: (key: string, detail: LDClient.LDEvaluationDetail) => {
        datadogRum.addFeatureFlagEvaluation(key, detail.value);
      },
    },
  ],
});
```

### ダッシュボードウィジェット

1. [LaunchDarkly インテグレーションタイル][6]で、LaunchDarkly インテグレーションがインストールされていることを確認します。
1. Datadog で、既存のダッシュボードに移動するか、新しいダッシュボードを作成します。
1. **Add Widgets** ボタンを押すと、ウィジェットドローワが表示されます。
1. **LaunchDarkly** と検索すると、ウィジェットドローワの **Apps** セクションに LaunchDarkly ウィジェットが見つかります。
1. LaunchDarkly ウィジェットアイコンをクリックまたはドラッグしてダッシュボードに追加し、**LaunchDarkly editor** モーダルを開きます。
1. LaunchDarkly アカウントを接続するには、**Connect** ボタンを押します。新しいウィンドウが開き、Datadog を認証するよう促されます。
1. **Authorize** をクリックすると、Datadog に戻ります。
1. 次に、**LaunchDarkly editor** で、以下のウィジェットオプションを構成します。

   - **LaunchDarkly project**: ダッシュボードウィジェットに関連付けたい LaunchDarkly プロジェクトの名前です。
   - **LaunchDarkly environment**: ダッシュボードウィジェットに関連付けたい LaunchDarkly 環境の名前です。
   - **Environment template variable**: **LaunchDarkly environment** オプションを上書きするために使用されるオプションの [Datadog テンプレート変数][7]です。
   - **LaunchDarkly tag filter**: オプションの `+` 区切りリストタグで、ウィジェットに表示される機能フラグをフィルタリングすることができます。複数のタグが含まれている場合、含まれているすべてのタグにマッチするフラグのみがウィジェットに表示されます。省略された場合は、プロジェクトのすべての機能フラグがウィジェットに表示されます。
   - **Sort**: ウィジェットに表示されるフラグの順番。デフォルトは **Newest** です。

1. オプションでウィジェットのタイトルを指定します。
1. **Save** を押して、Datadog ダッシュボードウィジェットの構成を完了します。

### Relay Proxy メトリクス

Relay Proxy の[メトリクスインテグレーションのドキュメント][8]に従って、この機能を構成することができます。

## リアルユーザーモニタリング

### データセキュリティ

LaunchDarkly Relay Proxy は、以下のメトリクスを Datadog に送信するように構成することができます。

- **`connections`**: SDK から Relay Proxy への現在存在するストリーム接続数。
- **`newconnections`**: Relay Proxy が起動してからのストリーム接続の累積数。
- **`requests`**: Relay Proxy のすべての[サービスエンドポイント][9] (ステータスエンドポイントを除く) が起動してから受け取ったリクエストの累積数。

### ヘルプ

LaunchDarkly イベントインテグレーションは、LaunchDarkly から Datadog にフラグ、プロジェクト、環境イベントを送信します。

### ヘルプ

LaunchDarkly インテグレーションには、サービスのチェック機能は含まれません。

## Agent

ご不明な点は、[Datadog のサポートチーム][10]までお問い合わせください。

## その他の参考資料

[LaunchDarkly][1] と [Datadog イベントインテグレーション][4]の詳細をご覧ください。

[1]: https://launchdarkly.com
[2]: https://docs.launchdarkly.com/home/relay-proxy
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://docs.launchdarkly.com/integrations/datadog/events
[5]: https://docs.datadoghq.com/ja/real_user_monitoring/guide/setup-feature-flag-data-collection/
[6]: https://app.datadoghq.com/integrations/launchdarkly
[7]: https://docs.datadoghq.com/ja/dashboards/template_variables/
[8]: https://github.com/launchdarkly/ld-relay/blob/v6/docs/metrics.md
[9]: https://github.com/launchdarkly/ld-relay/blob/v6/docs/endpoints.md
[10]: https://docs.datadoghq.com/ja/help/