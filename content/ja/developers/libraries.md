---
title: ライブラリ
kind: documentation
aliases:
  - /ja/libraries/
  - /ja/developers/faq/monitoring-akka/
---
## API と DogStatsD クライアントライブラリ

<mrk mid="5" mtype="seg">次の表に、Datadog 公式およびコミュニティ寄稿の[DogStatsD][1]クライアントライブラリを示します。</mrk><mrk mid="6" mtype="seg"/>

{{< classic-libraries-table >}}

## APM と分散型トレーシングクライアントライブラリ

次の表は、Datadog の公式およびコミュニティ寄稿の[トレース][2]クライアントライブラリの一覧です。

{{< tracing-libraries-table >}}

## ログ管理クライアントライブラリ

次の表は、Datadog の公式およびコミュニティ寄稿のログ管理クライアントライブラリの一覧です。

{{< log-libraries-table >}}

## Datadog クライアントコミュニティライブラリ

### ダッシュボードバックアップ

<mrk mid="13" mtype="seg"/><mrk mid="14" mtype="seg"/>

| 言語   | ライブラリ          | Author          |
|------------|------------------|-----------------|
| JavaScript | [dog-watcher][4] | [Brightcove][5] |
| Ruby       | [doggy][6]       | [Shopify][7]    |
| Ruby       | [kennel][8]      | [Zendesk][9]    |

### モニターの管理

Datadog [API][3] を使用してモニターを維持、管理、またはバックアップするために利用できる複数のコミュニティプロジェクトがあります。

| 言語  | ライブラリ          | Author               |
|-----------|------------------|----------------------|
| Python    | [DogPush][10]              | [TrueAccord][11]     |
| Ruby      | [barkdog][12]              | [codenize-tools][13] |
| Ruby      | [interferon][14]           | [Airbnb][15]         |
| Ruby      | [dogwatch][16]             | [Rapid7][17]         |
| Terraform | [Terraform][18]            | [Terraform][19]      |
| Terraform | [datadog-to-terraform][20] | [Intercom][21]       |

## コミュニティのインテグレーション

### Ansible

公式の Ansible インテグレーションに加えて、[ansible-modules-extras][23] リポジトリの[監視セクション][22]には、Datadog とやり取りするモジュールが含まれています。

### Aptible

Enclave は Datadog アカウントにメトリクスを送信します。方法については、[専用の Aptible ヘルプセンター][24]を参照してください。

### Auth0

[この拡張機能][25]は、Auth0 ログを取得して Datadog に送信します。

### CLI 管理

コマンドラインインターフェイスからダッシュボードやモニターをバックアップ/復元したり、ユーザーを構成するための[ツールセット][26]です。

### Consul

[このライブラリ][27]を使用して、[DogStatsD][1] から Datadog に consul サービス数を公開できます。

### Dogscaler

[Dogscaler][28] を使用すると、Datadog クエリの結果に基づいて自動スケーリンググループをスケールアップできます。

### Dynatrace

この[プラグイン][29]は、Dynatrace メジャーをチャートから Datadog へ送信します。

### FreeSwitch

[FreeSwitch ESL][30] アプリケーションが DogStatsD API を使用して Datadog へ統計情報をエクスポートするために使用します。開発元は [WiMacTel][31] です。

### Google Analytics

[Bithaus][33] の[このライブラリ][32]を使用すると、Google Analytics から Datadog API 経由で Datadog にデータを取り込むことができます。

### Heroku

Heroku は、dyno メトリクスをログから生成します。ログをメトリクスに変換して Datdog に送信するために、以下のログドレインのいずれかを使用します。Heroku のログの Datadog への送信方法については、[こちらのページ][34]を参照してください。

* [Oz][36] による Nodejs 版 [Heroku Datadog ログドレイン][35]
* [Apiary][38] による Go 版 [Heroku Datadog ログドレイン][37]

### Jira

Jira にデータをポーリングし、Datadog にメトリクスとしてアップロードするための[ツール][39]です。

### K6

Load Impact が開発した負荷およびパフォーマンスの回帰テストツールである K6 は、[DogStatsD][1] を使用してテスト結果を Datadog に送信できます。この機能を有効にするには、[チュートリアル][40]を参照してください。

### LaunchDarkly

変更を Datadog イベントとして記録する [LaunchDarkly][41] webhook ハンドラー。

### Logstash 出力

* [Datadog の Logstash 出力][42]
* [DogStatsD の Logstash 出力][43]

### Moogsoft

Datadog 通知を取り込む Moogsoft [リスナー][44]。

### NGINX LUA

* LUA スクリプトの [nginx_lua_datadog][46] モジュールを使用して、NGINX 構成から[カスタムメトリクス][45]を直接送信します。
* [lua-resty-dogstatsd][47] は [mediba inc][48] によって開発された拡張機能で、[DogStatsD][1] プロトコルへのメトリクス、イベント、サービスチェックの送信を可能にします。lua-resty-dogstatsd は GPLv3 としてリリースされ、nginx コソケット API に依存しています。

### OpenVPN

* OpenVPN [帯域幅使用量][49]とアクティブな接続の数を Datadog に送信します。
* OpenVPN [ライセンス情報][50]を Datadog に送信します。

### Phusion Passenger

[Stevenson Jean-Pierre][52] が作成した [passenger-datadog-monitor][51] を使用して、Phusion の Passenger サーバーからヘルスメトリクスを送信します。

### Pid-stats

この[ライブラリ][53]を使用すると、pid ファイルを指定して StatsD からプロセス情報を生成できます。これは [GitterHQ][54] によって作成されました。

### Saltstack

* [Datadog Saltstack Formula][55]
* [Luca Cipriani][57] が作成した [Datadog Saltstack][56]。

### Sensu

これらの Sensu [ハンドラー][58]を使用して、メトリクスとイベントの両方を Datadog に自動的に送信します。

### StackStorm

この StackStorm Datadog [インテグレーションパック][59]は、Datadog のアクションインテグレーションを提供します。

### Winston

Winston Datadog [転送][60]。

## コミュニティ Agent ポート

### FreeBSD

[FreeBSD dd-agent ポート][61]

### NixOS

[dd-agent nixpkg][62]

Datadog ライブラリを作成し、このページに追加する場合は、[code@datadoghq.com][63] にメールを送信してください。

[1]: /ja/developers/metrics/dogstatsd_metrics_submission/
[2]: /ja/tracing/
[3]: /ja/api/
[4]: https://github.com/brightcove/dog-watcher
[5]: https://www.brightcove.com
[6]: https://github.com/Shopify/doggy
[7]: https://www.shopify.com
[8]: https://github.com/grosser/kennel
[9]: https://www.zendesk.com
[10]: https://github.com/trueaccord/DogPush
[11]: https://github.com/trueaccord
[12]: https://github.com/codenize-tools/barkdog
[13]: https://github.com/codenize-tools
[14]: https://github.com/airbnb/interferon
[15]: https://github.com/airbnb
[16]: https://github.com/rapid7/dogwatch
[17]: https://github.com/rapid7
[18]: https://www.terraform.io/docs/providers/datadog/r/monitor.html
[19]: https://www.terraform.io
[20]: https://github.com/intercom/datadog-to-terraform
[21]: https://github.com/intercom
[22]: https://docs.ansible.com/ansible/2.9/modules/list_of_monitoring_modules.html
[23]: https://github.com/ansible/ansible-modules-extras
[24]: https://www.aptible.com/documentation/enclave/reference/metrics/metric-drains/datadog.html
[25]: https://github.com/BetaProjectWave/auth0-logs-to-datadog
[26]: https://github.com/keirans/datadog-management
[27]: https://github.com/zendesk/consul2dogstats
[28]: https://github.com/cvent/dogscaler
[29]: https://github.com/Dynatrace/Dynatrace-AppMon-Datadog-Plugin
[30]: https://github.com/wimactel/FreeSwitch-DataDog-Metrics
[31]: https://github.com/wimactel
[32]: https://github.com/bithauschile/datadog-ga
[33]: https://blog.bithaus.cl/2016/04/20/realtime-google-analytics-metrics-in-datadog
[34]: /ja/logs/guide/collect-heroku-logs/
[35]: https://github.com/ozinc/heroku-datadog-drain
[36]: https://web.oz.com/
[37]: https://github.com/apiaryio/heroku-datadog-drain-golang
[38]: https://apiary.io
[39]: https://github.com/evernote/jiradog
[40]: https://blog.loadimpact.com/how-to-send-k6-metrics-to-datadog
[41]: https://github.com/meetup/launch-dogly
[42]: https://www.elastic.co/guide/en/logstash/current/plugins-outputs-datadog.html
[43]: https://github.com/brigade/logstash-output-dogstatsd
[44]: https://docs.moogsoft.com/AIOps.6.2.0/Datadog-Solution-Pak_13737047.html
[45]: /ja/developers/metrics/custom_metrics/
[46]: https://github.com/simplifi/ngx_lua_datadog
[47]: https://github.com/dailymotion/lua-resty-dogstatsd
[48]: http://www.mediba.jp
[49]: https://github.com/byronwolfman/dd-openvpn
[50]: https://github.com/denniswebb/datadog-openvpn
[51]: https://github.com/Sjeanpierre/passenger-datadog-monitor
[52]: https://github.com/Sjeanpierre
[53]: https://github.com/gitterHQ/pid-stats
[54]: https://github.com/gitterHQ
[55]: https://github.com/DataDog/datadog-formula
[56]: https://gist.github.com/mastrolinux/6175280
[57]: https://gist.github.com/mastrolinux
[58]: https://github.com/sensu-plugins/sensu-plugins-datadog
[59]: https://github.com/StackStorm-Exchange/stackstorm-datadog
[60]: https://github.com/sparkida/winston-datadog
[61]: https://github.com/urosgruber/dd-agent-FreeBSD
[62]: https://github.com/NixOS/nixpkgs/tree/master/pkgs/tools/networking/dd-agent
[63]: mailto:code@datadoghq.com
[64]: https://www.dailymotion.com/us