---
app_id: docontrol
app_uuid: 7622c46e-bade-44ce-99e1-a3529bf4fc04
assets: {}
author:
  homepage: https://www.docontrol.io/
  name: DoControl
  sales_email: sales@docontrol.io
  support_email: support@docontrol.io
categories:
- 自動化
- ログの収集
- セキュリティ
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/docontrol/README.md
display_on_public_website: true
draft: false
git_integration_title: docontrol
integration_id: docontrol
integration_title: DoControl
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: docontrol
public_title: DoControl
short_description: SaaS データセキュリティ - DLP と CASB の最新化による SaaS データの安全性確保
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Automation
  - Category::Log Collection
  - Category::Security
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: SaaS データセキュリティ - DLP と CASB の最新化による SaaS データの安全性確保
  media:
  - caption: DoControl のセキュリティ自動化ワークフローを使用して、Datadog のログとインシデント機能で洗練された柔軟で粒度の細かいビジネスロジックを作成します。
    image_url: images/dc-dd-01.png
    media_type: image
  - caption: DoControl は、SaaS アプリのエンドユーザーアクティビティイベントとアセットのメタデータを統合し、すべての SaaS アクティビティとアセットの露出を一元的に表示します。
    image_url: images/dc-dd-02.png
    media_type: image
  - caption: DoControl は、SaaS アプリのエコシステム全体に対して、アクションにつながる深い洞察と可視性を提供します。
    image_url: images/dc-dd-03.png
    media_type: image
  - caption: DoControl は、コラボレーション、CRM、コミュニケーション、開発ツール、人事、IdP、EDR などのカテゴリに分類されるアプリを含む、マルチセグメントで最も人気のある
      SaaS アプリと統合します。
    image_url: images/dc-dd-04.png
    media_type: image
  - caption: DoControl は、一般的な脅威モデルや保護すべきミッションクリティカルなユースケースを表す、事前に確立されたすぐに使用できるプレイブックの幅広いカタログを提供します。
    image_url: images/dc-dd-05.png
    media_type: image
  - caption: DoControl のクロス SaaS 異常検知メカニズムは、コンテキストに沿ったアラートをトリガーし、インシデントレスポンス時間を短縮し、自動修復対策を提供します。
    image_url: images/dc-dd-06.png
    media_type: image
  - caption: DoControl は、主要な脅威のベクトルであるサードパーティアプリ (OAuth アプリ) を含む、すべての SaaS アプリのインベントリを可視化し、修復を可能にします。
    image_url: images/dc-dd-07.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: DoControl
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

このインテグレーションにより、[DoControl][1] のお客様は、自動化されたセキュリティワークフローを通じて、DoControl 関連のログとイベントを Datadog に転送することができます。

## 計画と使用

このインテグレーションを設定するには、アクティブな [DoControl アカウント][2]が必要です。また、Datadog の適切な[管理者権限][3]も必要となります。

### インフラストラクチャーリスト

ホストでのインストールは必要ありません。

### DoControl のワークフローで Datadog のアクションを使用する

DoControl の Datadog アクションの入力パラメーターとして使用するため、Datadog API キーとアプリケーションキーを作成する必要があります。

#### Datadog で API キーを作成する

1. Datadog の [API キーの追加][4]ドキュメントを使用して、API キーを作成します。キーには `DoControl` のような意味のある名前を付けます。
2. `Key` をコピーして保存します。


#### Datadog でアプリケーションキーを作成する

1. Datadog の[アプリケーションキーの追加][5]ドキュメントを使用して、アプリケーションキーを作成します。
2. アプリケーションキーをコピーして保存します。

![Get_DD_Application_Key][6]


#### DoControl で Datadog インテグレーションを作成する

1. DoControl で、[Dashboard->Settings->Workflows->Secrets][7] に移動し、Datadog API キーを新しいシークレットとして追加します。

   ![DC_Secrets][8]

2. あらかじめ用意された[**プレイブック**][9]から、または[**最初**][10]から新しいワークフローを作成します。

   ![DC_WF_Create][11]

3. アクションをキャンバスにドラッグアンドドロップし、ステップを構成し、それらを接続することによって、ビジネスロジックを設計・編集します。

4. Actions バーから、**Utilities** の下で、**Send logs** や **Create incident** などの Datadog のアクションをワークフローにドラッグアンドドロップすることが可能です。

   ![DC_Utils][12]

5. 上記ステップ 1 でシークレットとして保存した DD-API-KEY と、[Datadog でアプリケーションキーを作成する](#create-an-application-key-in-datadog)で取得した DD-APPLICATION-KEY を参照するようにアクションを構成します。

   ![DC_DD_conf][13]

DoControl については、[DoControl ドキュメント][14]で詳しく説明しています。




## Agent

ヘルプが必要ですか？[Datadog サポート][15]または [DoControl サポート][16]にお問い合わせください。


[1]: https://www.docontrol.io/
[2]: https://www.docontrol.io/demo
[3]: https://docs.datadoghq.com/ja/account_management/rbac/permissions/
[4]: https://docs.datadoghq.com/ja/account_management/api-app-keys/#add-an-api-key-or-client-token
[5]: https://docs.datadoghq.com/ja/account_management/api-app-keys/#add-application-keys
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/docontrol/images/Get_DD_Application_Key.png
[7]: https://app.docontrol.io/settings/workflows?tab=Secrets
[8]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/docontrol/images/DC_Secrets.png
[9]: https://app.docontrol.io/workflowV2/playbooks?filter=by_use_case&use_case=all
[10]: https://app.docontrol.io/workflowV2/workflow/new/workflow-editor
[11]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/docontrol/images/DC_WF_Create.png
[12]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/docontrol/images/DC_Utils.png
[13]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/docontrol/images/DC_DD_conf.png
[14]: https://docs.docontrol.io/docontrol-user-guide/the-docontrol-console/workflows-beta/designing-and-editing-workflows/defining-workflow-and-action-settings#action-categories
[15]: https://docs.datadoghq.com/ja/help/
[16]: mailto:support@docontrol.io