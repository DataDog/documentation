---
"algolia":
  "subcategory": Marketplace Integrations
"app_id": "performetriks-composer"
"app_uuid": "b1b4d663-f81a-4892-8aef-5dd67b40a37f"
"assets": {}
"author":
  "homepage": "https://www.performetriks.com/composer-datadog-product-guide"
  "name": Performetriks
  "sales_email": composer@performetriks.com
  "support_email": composer@performetriks.com
  "vendor_id": performetriks
"categories":
- marketplace
"custom_kind": "インテグレーション"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "performetriks_composer"
"integration_id": "performetriks-composer"
"integration_title": "Composer"
"integration_version": ""
"is_public": true
"legal_terms":
  "eula": assets/EULA.pdf
"manifest_version": "2.0.0"
"name": "performetriks_composer"
"pricing":
- "billing_type": flat_fee
  "includes_assets": true
  "product_id": composer
  "short_description": Monthly flat fee for Performetriks Composer
  "unit_price": !!int "99"
"public_title": "Composer"
"short_description": "Configuration management for your Datadog environment"
"supported_os":
- linux
- macos
- windows
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Supported OS::Linux"
  - "Supported OS::macOS"
  - "Supported OS::Windows"
  - "Category::Marketplace"
  - "Offering::Integration"
  "configuration": "README.md#Setup"
  "description": Configuration management for your Datadog environment
  "media":
  - "caption": Composer is a Configuration tool to simplify administrative tasks in Datadog and provide a configuration management solution for all config settings.
    "image_url": images/composervideo.png
    "media_type": video
    "vimeo_id": !!int "692276988"
  - "caption": Composer reduces complexity and increases efficiency when dealing with version management of your Datadog configuration. You can quickly find out if there have been changes in the configuration and easily reset them.
    "image_url": images/composer1.png
    "media_type": image
  - "caption": Composer reduces complexity and increases efficiency when dealing with version management of your Datadog configuration. You can quickly find out if there have been changes in the configuration and easily reset them.
    "image_url": images/composer2.png
    "media_type": image
  - "caption": Composer simplifies Datadog admin tasks through introducing Version Management for Datadog, identifying changes in tenants, and automating manual tasks such as the creation of applications, dashboards, and management zones from templates.
    "image_url": images/composer3.png
    "media_type": image
  "overview": "README.md#Overview"
  "resources":
  - "resource_type": blog
    "url": "https://www.datadoghq.com/blog/manage-datadog-configurations-as-code-with-performetriks/"
  "support": "README.md#Support"
  "title": Composer
  "uninstallation": "README.md#Uninstallation"
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要
Performetriks Composer は、Datadog 環境全体のコンフィギュレーションを管理することができるツールです。Composer は、Datadog のコンフィギュレーションを文書化して保存したり、Datadog 環境でのコンフィギュレーションエラーを発見して解決するための迅速かつ容易な方法を提供します。

### Composer の使用例

**Datadog のコンフィギュレーションをバックアップ**

Datadog の環境がいくつあっても、Composer を使えば、すべてのコンフィギュレーションアイテムのバックアップを作成することができます。アドホックにバックアップを開始することも、CI/CD パイプラインからバックアップを完全に自動化することも可能です。

**ソフトウェアコンフィギュレーション管理システムへのチェックイン**

Composer では、モニタリングのコンフィギュレーションをコードとして管理し、そのコードをリポジトリにチェックすることで、すべてのモニタリング設定の記録を確保することができます。

**変更点を探す**

複数の管理者が Datadog 環境を管理する場合、設定が調整されたときに全員が知っており、同意していることを確認する必要があります。Composer は、常にバックアップが利用可能であることを保証し、管理者が最新の変更を検出できるようにすることで、このプロセスを簡素化します。

**コンフィギュレーションの復元**

モニタリングコンフィギュレーションのエラーを発見するのは困難ですが、Composer はこのプロセスを劇的に簡素化します。作成されたバックアップから最新の Datadog のコンフィギュレーションを選択し、数秒以内にミスを元に戻すことができます。

**コンフィギュレーションのアップロード**

最近では、コードとしてのモニタリングが主流になっています。Composer を使えば、モニタリングの設定をコードリポジトリに保存し、変更を追跡して、既存または新しい Datadog 環境にこれらの設定をアップロードすることができます。

## サポート

サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから Performetriks にお問い合わせください。

- メール: [composer@performetriks.com][2]

### その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Datadog Marketplace の Performetriks の製品を使って Datadog の構成をコードとして保存・管理する][3]

[1]: https://docs.datadoghq.com/account_management/api-app-keys/
[2]: mailto:composer@performetriks.com
[3]: https://www.datadoghq.com/blog/manage-datadog-configurations-as-code-with-performetriks/

---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、<a href="https://app.datadoghq.com/marketplace/app/performetriks-composer" target="_blank">こちらをクリック</a>してください。
