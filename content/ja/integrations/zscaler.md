---
app_id: z-scaler
app_uuid: 102476f5-1e00-452f-b841-9e32bb66d4bc
assets:
  dashboards:
    Zscaler Overview: assets/dashboards/zscaler_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: zscaler.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10261
    source_type_name: Zscaler (コミュニティバージョン)
  logs:
    source: zscaler
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Datadog
  sales_email: help@datadoghq.com
  support_email: help@datadoghq.com
categories:
- クラウド
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/zscaler/README.md
description: TODO
display_on_public_website: true
doc_link: https://docs.datadoghq.com/integrations/zscaler/
draft: false
git_integration_title: zscaler
has_logo: true
integration_id: z-scaler
integration_title: Zscaler
integration_version: ''
is_public: true
kind: integration
manifest_version: 2.0.0
name: zscaler
public_title: Zscaler
short_description: Zscaler とのインテグレーションにより、クラウドセキュリティログを提供
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Zscaler とのインテグレーションにより、クラウドセキュリティログを提供
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Zscaler
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

[Zscaler Internet Access][1] (以下、ZIA) は、クラウドからサービスとして提供される安全なインターネットと Web のゲートウェイです。ZIA のログは、[Cloud NSS][2] を使用して HTTPS で Datadog に送信されます。Datadog は ZIA のテレメトリーを取り込み、セキュリティルールの適用やダッシュボードでのデータの視覚化を可能にします。

## 要件

Zscaler Cloud NSS のサブスクリプションが必要です。

## 計画と使用

### ZIA の Web ログ

1. ZIA コンソールから、**Administration** > **Nanolog Streaming Service** に移動します。
2. **Cloud NSS Feeds** タブを選択します。次に、**Add Cloud NSS Feed** をクリックします。
3. ダイアログボックスで、以下の値を入力または選択します。
   * フィード名: `<YOUR_FEED_NAME>`
   * NSS タイプ: `NSS for Web`
   * SIEM タイプ: `Other`
   * バッチサイズ: `16`
   * API URL: `https://http-intake.logs.datadoghq.com/v1/input?ddsource=zscaler`
   * HTTP ヘッダー:
      * キー: `Content-Type`、値: `application/json`
      * キー: `DD-API-KEY`、値: `<YOUR_DATADOG_API_KEY>`
4. **Formatting** で、以下の値を入力または選択します。
   * ログタイプ: `Web log`
   * 出力タイプ: `JSON`
   * フィードエスケープ文字: `\",`
   * フィードの出力形式:
      ```
      \{ "sourcetype" : "zscalernss-web", "event" : \{"datetime":"%d{yy}-%02d{mth}-%02d{dd} %02d{hh}:%02d{mm}:%02d{ss}","reason":"%s{reason}","event_id":"%d{recordid}","protocol":"%s{proto}","action":"%s{action}","transactionsize":"%d{totalsize}","responsesize":"%d{respsize}","requestsize":"%d{reqsize}","urlcategory":"%s{urlcat}","serverip":"%s{sip}","clienttranstime":"%d{ctime}","requestmethod":"%s{reqmethod}","refererURL":"%s{ereferer}","useragent":"%s{eua}","product":"NSS","location":"%s{elocation}","ClientIP":"%s{cip}","status":"%s{respcode}","user":"%s{elogin}","url":"%s{eurl}","vendor":"Zscaler","hostname":"%s{ehost}","clientpublicIP":"%s{cintip}","threatcategory":"%s{malwarecat}","threatname":"%s{threatname}","filetype":"%s{filetype}","appname":"%s{appname}","pagerisk":"%d{riskscore}","department":"%s{edepartment}","urlsupercategory":"%s{urlsupercat}","appclass":"%s{appclass}","dlpengine":"%s{dlpeng}","urlclass":"%s{urlclass}","threatclass":"%s{malwareclass}","dlpdictionaries":"%s{dlpdict}","fileclass":"%s{fileclass}","bwthrottle":"%s{bwthrottle}","servertranstime":"%d{stime}","contenttype":"%s{contenttype}","unscannabletype":"%s{unscannabletype}","deviceowner":"%s{deviceowner}","devicehostname":"%s{devicehostname}"\}\}
      ```
5. **Save** をクリックします。
6. 変更した内容を**有効にします**。

### ZIA ファイアーウォールのログ

1. ZIA コンソールから、**Administration** > **Nanolog Streaming Service** に移動します。
2. **Cloud NSS Feeds** タブを選択します。次に、**Add Cloud NSS Feed** をクリックします。
3. ダイアログボックスで、以下の値を入力または選択します。
   * フィード名: `<YOUR_FEED_NAME>`
   * NSS タイプ: `NSS for Firewall`
   * SIEM タイプ: `Other`
   * バッチサイズ: `16`
   * API URL: `https://http-intake.logs.datadoghq.com/v1/input?ddsource=zscaler`
   * HTTP ヘッダー:
      * キー: `Content-Type`、値: `application/json`
      * キー: `DD-API-KEY`、値: `<YOUR_DATADOG_API_KEY>`
4. **Formatting** で、以下の値を入力または選択します。
   * ログタイプ: `Firewall logs`
   * ファイアーウォールのログタイプ: Full Session Logs
   * フィード出力タイプ: `JSON`
   * フィードエスケープ文字: `\",`
   * フィードの出力形式:
      ```
      \{ "sourcetype" : "zscalernss-fw", "event" :\{"datetime":"%s{time}","user":"%s{elogin}","department":"%s{edepartment}","locationname":"%s{elocation}","cdport":"%d{cdport}","csport":"%d{csport}","sdport":"%d{sdport}","ssport":"%d{ssport}","csip":"%s{csip}","cdip":"%s{cdip}","ssip":"%s{ssip}","sdip":"%s{sdip}","tsip":"%s{tsip}","tunsport":"%d{tsport}","tuntype":"%s{ttype}","action":"%s{action}","dnat":"%s{dnat}","stateful":"%s{stateful}","aggregate":"%s{aggregate}","nwsvc":"%s{nwsvc}","nwapp":"%s{nwapp}","proto":"%s{ipproto}","ipcat":"%s{ipcat}","destcountry":"%s{destcountry}","avgduration":"%d{avgduration}","rulelabel":"%s{erulelabel}","inbytes":"%ld{inbytes}","outbytes":"%ld{outbytes}","duration":"%d{duration}","durationms":"%d{durationms}","numsessions":"%d{numsessions}","ipsrulelabel":"%s{ipsrulelabel}","threatcat":"%s{threatcat}","threatname":"%s{ethreatname}","deviceowner":"%s{deviceowner}","devicehostname":"%s{devicehostname}"\}\}
      ```
5. **Save** をクリックします。
6. 変更した内容を**有効にします**。

### ZIA の DNS ログ

1. ZIA コンソールから、**Administration** > **Nanolog Streaming Service** に移動します。
2. **Cloud NSS Feeds** タブを選択します。次に、**Add Cloud NSS Feed** をクリックします。
3. ダイアログボックスで、以下の値を入力または選択します。
   * フィード名: `<YOUR_FEED_NAME>`
   * NSS タイプ: `NSS for DNS`
   * SIEM タイプ: `Other`
   * バッチサイズ: `16`
   * API URL: `https://http-intake.logs.datadoghq.com/v1/input?ddsource=zscaler`
   * HTTP ヘッダー:
      * キー: `Content-Type`、値: `application/json`
      * キー: `DD-API-KEY`、値: `<YOUR_DATADOG_API_KEY>`
4. **Formatting** で、以下の値を入力または選択します。
   * ログタイプ: `DNS logs`
   * フィード出力タイプ: `JSON`
   * フィードエスケープ文字: `\",`
   * フィードの出力形式:
      ```
      \{ "sourcetype" : "zscalernss-dns", "event" :\{"datetime":"%s{time}","user":"%s{login}","department":"%s{dept}","location":"%s{location}","reqaction":"%s{reqaction}","resaction":"%s{resaction}","reqrulelabel":"%s{reqrulelabel}","resrulelabel":"%s{resrulelabel}","dns_reqtype":"%s{reqtype}","dns_req":"%s{req}","dns_resp":"%s{res}","srv_dport":"%d{sport}","durationms":"%d{durationms}","clt_sip":"%s{cip}","srv_dip":"%s{sip}","category":"%s{domcat}","odeviceowner":"%s{odeviceowner}","odevicehostname":"%s{odevicehostname}"\}\}
      ```
5. **Save** をクリックします。
6. 変更した内容を**有効にします**。

### ZIA トンネルログ

1. ZIA コンソールから、**Administration** > **Nanolog Streaming Service** に移動します。
2. **Cloud NSS Feeds** タブを選択します。次に、**Add Cloud NSS Feed** をクリックします。
3. ダイアログボックスで、以下の値を入力または選択します。
   * フィード名: `<YOUR_FEED_NAME>`
   * NSS タイプ: `NSS for Web`
   * SIEM タイプ: `Other`
   * バッチサイズ: `16`
   * API URL: `https://http-intake.logs.datadoghq.com/v1/input?ddsource=zscaler`
   * HTTP ヘッダー:
      * キー: `Content-Type`、値: `application/json`
      * キー: `DD-API-KEY`、値: `<YOUR_DATADOG_API_KEY>`
4. **Formatting** で、以下の値を入力または選択します。
   * ログタイプ: `Tunnel`
   * フィード出力タイプ: `JSON`
   * フィードエスケープ文字: `\",`
   * フィードの出力形式:
      ```
      \{ "sourcetype" : "zscalernss-tunnel", "event" : \{"datetime":"%s{datetime}","Recordtype":"%s{tunnelactionname}","tunneltype":"IPSEC IKEV %d{ikeversion}","user":"%s{vpncredentialname}","location":"%s{locationname}","sourceip":"%s{sourceip}","destinationip":"%s{destvip}","sourceport":"%d{srcport}","destinationport":"%d{dstport}","lifetime":"%d{lifetime}","ikeversion":"%d{ikeversion}","spi_in":"%lu{spi_in}","spi_out":"%lu{spi_out}","algo":"%s{algo}","authentication":"%s{authentication}","authtype":"%s{authtype}","recordid":"%d{recordid}"\}\}
      ```
5. **Save** をクリックします。
6. 変更した内容を**有効にします**。

### 検証

[Agent の status サブコマンドを実行][7]し、Checks セクションで `zscaler` を探します。

## リアルユーザーモニタリング

### データセキュリティ

Zscaler には、メトリクスは含まれません。

### ヘルプ

Zscaler には、サービスのチェック機能は含まれません。

### ヘルプ

Zscaler には、イベントは含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

[1]: https://www.zscaler.com/products/zscaler-internet-access
[2]: https://help.zscaler.com/zia/about-nanolog-streaming-service
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/ja/help/