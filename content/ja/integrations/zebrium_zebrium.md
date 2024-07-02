---
"algolia":
  "subcategory": Marketplace Integrations
"app_id": "zebrium-zebrium"
"app_uuid": "3e2a6d39-2057-4cb5-bc0e-5610a43afaf7"
"assets": {}
"author":
  "homepage": "https://www.zebrium.com"
  "name": Zebrium
  "sales_email": hello@zebrium.com
  "support_email": support@zebrium.com
  "vendor_id": zebrium
"categories":
- notifications
- automation
- marketplace
"custom_kind": "インテグレーション"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "zebrium_zebrium"
"integration_id": "zebrium-zebrium"
"integration_title": "Zebrium Root Cause as a Service"
"integration_version": ""
"is_public": true
"legal_terms":
  "eula": assets/eula.pdf
"manifest_version": "2.0.0"
"name": "zebrium_zebrium"
"pricing":
- "billing_type": tag_count
  "includes_assets": true
  "metric": datadog.marketplace.zebrium.zebrium
  "product_id": zebrium
  "short_description": Pricing for Zebrium is based on log event volume
  "tag": core
  "unit_label": Million log events ingested
  "unit_price": !!float "0.3"
"public_title": "Zebrium Root Cause as a Service"
"short_description": "Zebrium shows the root cause of problems directly on your dashboards"
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
  - "Category::Notifications"
  - "Category::Automation"
  - "Category::Marketplace"
  - "Offering::Software License"
  "configuration": "README.md#Setup"
  "description": Zebrium shows the root cause of problems directly on your dashboards
  "media":
  - "caption": "Video: Root Cause Finder for Datadog."
    "image_url": images/Zebrium_Root_Cause_as_a_Service_thumb.png
    "media_type": video
    "vimeo_id": !!int "703040365"
  - "caption": Zebrium widget showing two root cause detections (red dot on vertical lines).
    "image_url": images/Zebrium_Root_Cause_Finder_Widget.png
    "media_type": image
  - "caption": Zebrium root cause summary shown in a side panel.
    "image_url": images/Zebrium_Root_Cause_Finder_With_Side_Panel.png
    "media_type": image
  - "caption": Zebrium root cause report Details (Zebrium UI).
    "image_url": images/Zebrium_Root_Cause_Report_Details.png
    "media_type": image
  "overview": "README.md#Overview"
  "resources":
  - "resource_type": blog
    "url": "https://www.datadoghq.com/blog/find-the-root-cause-faster-with-zebrium/"
  "support": "README.md#Support"
  "title": Zebrium Root Cause as a Service
  "uninstallation": "README.md#Uninstallation"
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要

**Datadog Marketplace で Zebrium SaaS ライセンスにサインアップしてください。**

問題があることは分かっていても、その原因が分からない場合、[Zebrium][1] は Datadog のダッシュボードに直接根本原因を自動的に表示するように動作します。Zebrium のソリューションは、ログに機械学習を適用しますが、手動でデータを学習させたり、ルールを設定したりする必要はなく、24 時間以内に精度を達成することができます。

Zebrium の使用方法は簡単です。トラブルシューティングを行う際、あちこち調べるのではなく、Datadog のダッシュボードで Zebrium アプリにスクロールし、対応する検出を見るだけでいいのです。

Once you are a Zebrium customer, you can begin using the two points of integration between Zebrium and Datadog: 1) a Zebrium Datadog App with a custom dashboard widget and 2) a Datadog integration that sends in events and metrics from Zebrium. For installation, visit the [Integrations page][4] and search for Zebrium.

## サポート

サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから Zebrium にお問い合わせください。

- メール: [support@zebrium.com][2]

### その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Datadog と Zebrium で根本原因を迅速に発見][5]

[1]: https://www.zebrium.com
[2]: mailto:support@zebrium.com
[3]: https://cloud.zebrium.com
[4]: https://app.datadoghq.com/integrations
[5]: https://www.datadoghq.com/blog/find-the-root-cause-faster-with-zebrium/

---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、<a href="https://app.datadoghq.com/marketplace/app/zebrium-zebrium" target="_blank">こちらをクリック</a>してください。
