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

## サーバーレスクライアントライブラリ

次の表は、Datadog の公式およびコミュニティ寄稿の[サーバーレス][3]クライアントライブラリの一覧です。

{{< serverless-libraries-table >}}

## ログ管理クライアントライブラリ

次の表は、Datadog の公式およびコミュニティ寄稿のログ管理クライアントライブラリの一覧です。

{{< log-libraries-table >}}

## Datadog クライアントコミュニティライブラリ

### ダッシュボードバックアップ

Datadog [API][4] を使用すると、ダッシュボード定義をコードとしてバックアップするスクリプトを作成できます。このバックアップを実行する方法の例として、次のプロジェクトを参照してください。

| 言語   | ライブラリ          | Author          |
|------------|------------------|-----------------|
| JavaScript | [dog-watcher][5] | [Brightcove][6] |
| Ruby       | [doggy][7]       | [Shopify][8]    |
| Ruby       | [kennel][9]      | [Zendesk][10]    |

### モニターの管理

Datadog [API][4] を使用してモニターを維持、管理、またはバックアップするために利用できる複数のコミュニティプロジェクトがあります。

| 言語      | ライブラリ                   | Author               |
|-----------|-----------------------------|----------------------|
| Python    | [DogPush][11]               | [TrueAccord][12]     |
| Ruby      | [barkdog][13]               | [codenize-tools][14] |
| Ruby      | [interferon][15]            | [Airbnb][16]         |
| Ruby      | [dogwatch][17]              | [Rapid7][18]         |
| Terraform | [Terraform][19]             | [Terraform][20]      |
| Terraform | [datadog-to-terraform][21]  | [Intercom][22]       |
| AWS CDK   | [cdk-datadog-resources][23] | [NomadBlacky][24]    |

## コミュニティのインテグレーション

### Ansible

公式の Ansible インテグレーションに加えて、[ansible-modules-extras][25] リポジトリの[監視セクション][26]には、Datadog とやり取りするモジュールが含まれています。

### Aptible

Enclave は Datadog アカウントにメトリクスを送信します。方法については、[専用の Aptible ヘルプセンター][27]を参照してください。

### Auth0

[この拡張機能][28]は、Auth0 ログを取得して Datadog に送信します。

### CLI 管理

コマンドラインインターフェイスからダッシュボードやモニターをバックアップ/復元したり、ユーザーを構成するための[ツールセット][29]です。

### Consul

[このライブラリ][30]を使用して、[DogStatsD][1] から Datadog に consul サービス数を公開できます。

### Dogscaler

[Dogscaler][31] を使用すると、Datadog クエリの結果に基づいて自動スケーリンググループをスケールアップできます。

### Dynatrace

この[プラグイン][32]は、Dynatrace メジャーをチャートから Datadog へ送信します。

### FreeSwitch

[FreeSwitch ESL][33] アプリケーションが DogStatsD API を使用して Datadog へ統計情報をエクスポートするために使用します。開発元は [WiMacTel][34] です。

### Google Analytics

[Bithaus][35] の[このライブラリ][36]を使用すると、Google Analytics から Datadog API 経由で Datadog にデータを取り込むことができます。

### Heroku

Heroku は、dyno メトリクスをログから生成します。ログをメトリクスに変換して Datdog に送信するために、以下のログドレインのいずれかを使用します。Heroku のログの Datadog への送信方法については、[こちらのページ][37]を参照してください。

* [Oz][38] による Nodejs 版 [Heroku Datadog ログドレイン][39]
* [Apiary][40] による Go 版 [Heroku Datadog ログドレイン][41]

### Jira

Jira にデータをポーリングし、Datadog にメトリクスとしてアップロードするための[ツール][42]です。

### K6

Load Impact が開発した負荷およびパフォーマンスの回帰テストツールである K6 は、[DogStatsD][1] を使用してテスト結果を Datadog に送信できます。この機能を有効にするには、[チュートリアル][43]を参照してください。

### LaunchDarkly

変更を Datadog イベントとして記録する [LaunchDarkly][44] webhook ハンドラー。

### Logstash 出力

* [Datadog の Logstash 出力][45]
* [DogStatsD の Logstash 出力][46]

### Moogsoft

Datadog 通知を取り込む Moogsoft [リスナー][47]。

### NGINX LUA

* LUA スクリプトの [nginx_lua_datadog][48] モジュールを使用して、NGINX 構成から[カスタムメトリクス][49]を直接送信します。
* [lua-resty-dogstatsd][50] は、[mediba inc][51] によって開発された拡張機能です (現在は [Dailymotion][52] によってフォークされています)。[DogStatsD][1] プロトコルを介して、メトリクス、イベント、サービスチェックを発行できます。`lua-resty-dogstatsd` は GPLv3 としてリリースされ、Nginx コソケット API に依存しています。

### OpenVPN

* OpenVPN [帯域幅使用量][53]とアクティブな接続の数を Datadog に送信します。
* OpenVPN [ライセンス情報][54]を Datadog に送信します。

### Phusion Passenger

[Stevenson Jean-Pierre][55] が作成した [passenger-datadog-monitor][56] を使用して、Phusion の Passenger サーバーからヘルスメトリクスを送信します。

### Pid-stats

この[ライブラリ][57]を使用すると、pid ファイルを指定して StatsD からプロセス情報を生成できます。これは [GitterHQ][58] によって作成されました。

### Saltstack

* [Datadog Saltstack Formula][59]
* [Luca Cipriani][60] が作成した [Datadog Saltstack][61]。

### Sensu

これらの Sensu [ハンドラー][62]を使用して、メトリクスとイベントの両方を Datadog に自動的に送信します。

### StackStorm

この StackStorm Datadog [インテグレーションパック][63]は、Datadog のアクションインテグレーションを提供します。

### Winston

Winston Datadog [転送][64]。

## コミュニティ Agent ポート

### FreeBSD

[FreeBSD dd-agent ポート][65]

### NixOS

[dd-agent nixpkg][66]

Datadog ライブラリを作成し、このページに追加する場合は、[opensource@datadoghq.com][67] にメールを送信してください。

[1]: /ja/developers/metrics/dogstatsd_metrics_submission/
[2]: /ja/tracing/
[3]: /ja/serverless/
[4]: /ja/api/
[5]: https://github.com/brightcove/dog-watcher
[6]: https://www.brightcove.com
[7]: https://github.com/Shopify/doggy
[8]: https://www.shopify.com
[9]: https://github.com/grosser/kennel
[10]: https://www.zendesk.com
[11]: https://github.com/trueaccord/DogPush
[12]: https://github.com/trueaccord
[13]: https://github.com/codenize-tools/barkdog
[14]: https://github.com/codenize-tools
[15]: https://github.com/airbnb/interferon
[16]: https://github.com/airbnb
[17]: https://github.com/rapid7/dogwatch
[18]: https://github.com/rapid7
[19]: https://www.terraform.io/docs/providers/datadog/r/monitor.html
[20]: https://www.terraform.io
[21]: https://github.com/intercom/datadog-to-terraform
[22]: https://github.com/intercom
[23]: https://github.com/NomadBlacky/cdk-datadog-resources
[24]: https://github.com/NomadBlacky
[25]: https://github.com/ansible/ansible-modules-extras
[26]: https://docs.ansible.com/ansible/2.9/modules/list_of_monitoring_modules.html
[27]: https://www.aptible.com/documentation/enclave/reference/metrics/metric-drains/datadog.html
[28]: https://github.com/BetaProjectWave/auth0-logs-to-datadog
[29]: https://github.com/keirans/datadog-management
[30]: https://github.com/zendesk/consul2dogstats
[31]: https://github.com/cvent/dogscaler
[32]: https://github.com/Dynatrace/Dynatrace-AppMon-Datadog-Plugin
[33]: https://github.com/wimactel/FreeSwitch-DataDog-Metrics
[34]: https://github.com/wimactel
[35]: https://blog.bithaus.cl/2016/04/20/realtime-google-analytics-metrics-in-datadog
[36]: https://github.com/bithauschile/datadog-ga
[37]: /ja/logs/guide/collect-heroku-logs/
[38]: https://web.oz.com/
[39]: https://github.com/ozinc/heroku-datadog-drain
[40]: https://apiary.io
[41]: https://github.com/apiaryio/heroku-datadog-drain-golang
[42]: https://github.com/evernote/jiradog
[43]: https://blog.loadimpact.com/how-to-send-k6-metrics-to-datadog
[44]: https://github.com/meetup/launch-dogly
[45]: https://www.elastic.co/guide/en/logstash/current/plugins-outputs-datadog.html
[46]: https://github.com/brigade/logstash-output-dogstatsd
[47]: https://docs.moogsoft.com/AIOps.6.2.0/Datadog-Solution-Pak_13737047.html
[48]: https://github.com/simplifi/ngx_lua_datadog
[49]: /ja/developers/metrics/custom_metrics/
[50]: https://github.com/dailymotion/lua-resty-dogstatsd
[51]: http://www.mediba.jp
[52]: https://www.dailymotion.com/us
[53]: https://github.com/byronwolfman/dd-openvpn
[54]: https://github.com/denniswebb/datadog-openvpn
[55]: https://github.com/Sjeanpierre
[56]: https://github.com/Sjeanpierre/passenger-datadog-monitor
[57]: https://github.com/gitterHQ/pid-stats
[58]: https://github.com/gitterHQ
[59]: https://github.com/DataDog/datadog-formula
[60]: https://gist.github.com/mastrolinux
[61]: https://gist.github.com/mastrolinux/6175280
[62]: https://github.com/sensu-plugins/sensu-plugins-datadog
[63]: https://github.com/StackStorm-Exchange/stackstorm-datadog
[64]: https://github.com/sparkida/winston-datadog
[65]: https://github.com/urosgruber/dd-agent-FreeBSD
[66]: https://github.com/NixOS/nixpkgs/tree/master/pkgs/tools/networking/dd-agent
[67]: mailto:opensource@datadoghq.com
