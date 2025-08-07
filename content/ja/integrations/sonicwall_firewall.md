---
app_id: sonicwall-firewall
app_uuid: f29dd27d-2c3b-46f0-a872-7e0d861aff54
assets:
  dashboards:
    Sonicwall Firewall - Anti Spam: assets/dashboards/sonicwall_firewall_anti_spam.json
    Sonicwall Firewall - Network: assets/dashboards/sonicwall_firewall_network.json
    Sonicwall Firewall - Overview: assets/dashboards/sonicwall_firewall_overview.json
    Sonicwall Firewall - Security Services: assets/dashboards/sonicwall_firewall_security_services.json
    Sonicwall Firewall - User: assets/dashboards/sonicwall_firewall_user.json
    Sonicwall Firewall - VPN: assets/dashboards/sonicwall_firewall_vpn.json
    Sonicwall Firewall and Firewall Settings: assets/dashboards/sonicwall_firewall_and_firewall_settings.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 27315184
    source_type_name: Sonicwall Firewall
  logs:
    source: sonicwall-firewall
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- ログの収集
- security
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/sonicwall_firewall/README.md
display_on_public_website: true
draft: false
git_integration_title: sonicwall_firewall
integration_id: sonicwall-firewall
integration_title: Sonicwall ファイアウォール
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: sonicwall_firewall
public_title: Sonicwall ファイアウォール
short_description: SonicWall Firewall のログからインサイトを得る。
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Log Collection
  - Category::Security
  - Offering::Integration
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Sonicwall ファイアウォールログのインサイトを取得
  media:
  - caption: SonicWall Firewall - 概要
    image_url: images/sonicwall_firewall_overview.png
    media_type: image
  - caption: SonicWall Firewall - ネットワーク
    image_url: images/sonicwall_firewall_network.png
    media_type: image
  - caption: SonicWall Firewall - セキュリティサービス
    image_url: images/sonicwall_firewall_security_services.png
    media_type: image
  - caption: SonicWall Firewall - ユーザー
    image_url: images/sonicwall_firewall_user.png
    media_type: image
  - caption: SonicWall Firewall - VPN
    image_url: images/sonicwall_firewall_vpn.png
    media_type: image
  - caption: SonicWall Firewall - アンチスパム
    image_url: images/sonicwall_firewall_anti_spam.png
    media_type: image
  - caption: SonicWall Firewall - ファイアウォールとファイアウォールの設定
    image_url: images/sonicwall_firewall_and_firewall_settings.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Sonicwall ファイアウォール
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->
## 概要

[SonicWall Firewall][1] は、さまざまなサイバー脅威から組織を保護するように設計されたネットワークセキュリティソリューションです。高度なセキュリティ機能、高いパフォーマンス、拡張性を備えており、あらゆる規模の企業に適しています。SonicWall Firewall は、安全で効率的なネットワークトラフィック管理を実現しながら、新たな脅威に対するリアルタイムの保護を提供できることで知られています。

このインテグレーションは、SonicWall Firewall が syslog を介して共有するあらゆる種類のログを強化し、可視化します。syslog で受信したログについての詳細なインサイトは、標準搭載のダッシュボードと検出ルールで表示されます。


## セットアップ

### インストール

SonicWall Firewall インテグレーションをインストールするには、以下の Linux コマンドを実行して Agent をインストールします。 

**注**: このステップは Agent のバージョンが 7.58.0 以上の場合は不要です。

  ```shell
  sudo -u dd-agent -- datadog-agent integration install datadog-sonicwall-firewall==1.0.0
  ```

詳細については、[インテグレーション管理][2]のドキュメントを参照してください。

### 構成

#### ログ収集

1.  Datadog Agent ではデフォルトでログ収集は無効になっています。`datadog.yaml` ファイルで有効化してください。
    ```yaml
    logs_enabled: true
    ```

2. SonicWall Firewall のログ収集を開始するには、次のコンフィギュレーションブロックを `sonicwall_firewall.d/conf.yaml` に追加します。

    ```yaml
    logs:
      - type: udp
        port: <udp_port>
        source: sonicwall-firewall
    ```

    利用可能な設定オプションは、[サンプル sonicwall_firewall.d/conf.yaml][3] を参照してください。

    **注**:  SonicWall Firewall の [syslog サーバー][4] を `<udp_port>` で設定してください。

    以下のオプションを使用して、ファイアウォールで Syslog サーバーを設定します。

    - **名前または IP アドレス**: このインテグレーションを実行している Datadog Agent のアドレス。
    - **ポート**: このインテグレーションで構成されている Syslog ポート (UDP)。
    - **サーバー種別**: Syslog サーバー。
    - **Syslog 形式**: Enhanced Syslog。
    - **Syslog ID**: 複数のファイアウォール間で区別が必要な場合は、このデフォルト値 (ファイアウォール) を変更します。

    デフォルトの時刻を UTC に設定します。

    - **デバイス** > **ログ** > **Syslog** で **Syslog 設定** タブを選択し、**Syslog のタイムスタンプを UTC で表示する** を有効にします。**Accept** をクリックして時刻を UTC に設定します。

    追加構成

    - **デバイス** > **ログ** > **設定**で、**ログレベル**と**警告レベル**を選択して、異なる種類のログを取得することができます。

3. [Agent を再起動します][5]。

#### SonicWall Firewall と Datadog ログパイプラインで UTC 以外のタイムゾーンを指定する方法
Datadog はデフォルトで、すべてのログが UTC タイムゾーンであると想定しています。SonicWall Firewall のログのタイムゾーンが UTC でない場合は、SonicWall Firewall の Datadog パイプラインで正しいタイムゾーンを指定してください。

SonicWall Firewall パイプラインでタイムゾーンを変更する方法:

1. Datadog アプリの [**Pipelines** ページ][6]に移動します。

2. **Filter Pipelines** の検索ボックスに `SonicWall Firewall` と入力します。

3. SonicWall Firewall パイプラインにカーソルを合わせ、**clone** ボタンをクリックします。これにより、SonicWall Firewall パイプラインの編集可能なクローンが作成されます。

4. 次の手順で Grok Parser を編集します。

   - クローンされたパイプライン内で「Grok Parser: Parsing Sonicwall FireWall time」という名前のプロセッサを探します。パイプラインにカーソルを合わせて **Edit** をクリックします。
   - **Define parsing rules** のセクションで: 
      - ルールを変更し、SonicWall Firewall サーバーのタイムゾーンに対応する [TZ 識別子][7]を指定します。例として、タイムゾーンが IST の場合は `' z'` を `Asia/Calcutta` に変更します。
      - 例えば、既存のルールが以下の場合:

          ```shell
          rule %{date("yyyy-MM-dd HH:mm:ss z"):timestamp}
          ```

        IST タイムゾーンに変更した後のルールは次のようになります:

          ```shell
          rule %{date("yyyy-MM-dd HH:mm:ss", "Asia/Calcutta"):timestamp}
          ```

      - 既存のログサンプルを更新するには、**log samples** のセクションで:
        - 既存の値から UTC を削除します。
        - 例えば、既存の値が以下の場合:

              ```shell
              2024-09-11 06:30:00 UTC
              ```

              The updated value is:
              ```shell
              2024-09-11 06:30:00
              ```

    - **Update** をクリックします。

### 検証

[Agent の status サブコマンドを実行][8]し、Checks セクションで `sonicwall_firewall` を探します。

## 収集データ

### ログ

|         形式          | ログの種類    |
| --------------------    | -------------- |
| CEF (Enhanced Syslog)   | All          |

### メトリクス

SonicWall Firewall インテグレーションにはメトリクスは含まれていません。

### イベント

SonicWall Firewall インテグレーションにはイベントは含まれていません。

### サービスチェック
{{< get-service-checks-from-git "sonicwall_firewall" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。

[1]: https://www.sonicwall.com/
[2]: https://docs.datadoghq.com/ja/agent/guide/integration-management/?tab=linux#install
[3]: https://github.com/DataDog/integrations-core/blob/master/sonicwall_firewall/datadog_checks/sonicwall_firewall/data/conf.yaml.example
[4]: https://www.sonicwall.com/support/knowledge-base/how-can-i-configure-a-syslog-server-on-a-sonicwall-firewall/170505984096810
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://app.datadoghq.com/logs/pipelines
[7]: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-core/blob/master/sonicwall_firewall/assets/service_checks.json
[10]: https://docs.datadoghq.com/ja/help/