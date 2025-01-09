---
aliases:
- /ja/libraries/
- /ja/developers/faq/monitoring-akka/
- /ja/developers/libraries/
title: ライブラリ
---

## API と DogStatsD クライアントライブラリ

<mrk mid="5" mtype="seg">次の表に、Datadog 公式およびコミュニティ寄稿の[DogStatsD][1]クライアントライブラリを示します。</mrk><mrk mid="6" mtype="seg"/>

{{< classic-libraries-table >}}

## APM & Continuous Profiler クライアントライブラリ

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
| Ruby       | [kennel][9]      | [Zendesk][10]    |

### モニターの管理

Datadog [API][4] を使用してモニターを維持、管理、またはバックアップするために利用できる複数のコミュニティプロジェクトがあります。

| 言語  | ライブラリ          | Author               |
|-----------|------------------|----------------------|
| Ruby      | [interferon][15]           | [Airbnb][16]         |
| Terraform | [Terraform][19]            | [Terraform][20]      |
| Terraform | [datadog-to-terraform][21] | [Intercom][22]       |

## コミュニティのインテグレーション

### Ansible

公式の Ansible インテグレーションに加えて、[ansible-modules-extras][24] リポジトリの[監視セクション][23]には、Datadog とやり取りするモジュールが含まれています。

### Aptible

Aptible プラットフォームは、コンテナログとメトリクスを Datadog アカウントに送信することができます。詳細については、[Aptible ヘルプセンター][25]をご参照ください。

### CLI 管理

コマンドラインインターフェイスからダッシュボードやモニターをバックアップ/復元したり、ユーザーを構成するための[ツールセット][27]です。

### Consul

[Consul ライブラリ][28]を使用して、[DogStatsD][1] から Datadog に Consul サービス数を公開できます。

### Dogscaler

[Dogscaler][29] を使用すると、Datadog クエリの結果に基づいて自動スケーリンググループをスケールアップできます。

### FreeSwitch

[FreeSwitch ESL][30] アプリケーションが DogStatsD API を使用して Datadog へ統計情報をエクスポートするために使用します。開発元は [WiMacTel][31] です。

### Heroku

Heroku のログを Datadog に送信する方法については、[Heroku ログの収集][34]をご確認ください。

Heroku で PHP トレーサーやプロファイラーを使用するには、以下のビルドパックを使用します。

* [SpeedCurve][66] によって保守されている [Heroku Datadog PHP Tracer and Profiler Buildpack][65]。

### K6

Load Impact が開発した負荷およびパフォーマンスの回帰テストツールである K6 は、[DogStatsD][1] を使用してテスト結果を Datadog に送信できます。この機能を有効にするには、[チュートリアル][40]を参照してください。

### LaunchDarkly

変更を Datadog イベントとして記録する [LaunchDarkly][41] webhook ハンドラー。

### Logstash 出力

* [Datadog の Logstash 出力][42]
* [DogStatsD の Logstash 出力][43]

### NGINX LUA

* LUA スクリプトの [nginx_lua_datadog][46] モジュールを使用して、NGINX 構成から[カスタムメトリクス][45]を直接送信します。
* [lua-resty-dogstatsd][47] は、[mediba inc][48] によって開発された拡張機能です ([Dailymotion][49] によってフォークされています)。[DogStatsD][1] プロトコルを介して、メトリクス、イベント、サービスチェックを発行できます。`lua-resty-dogstatsd` は GPLv3 としてリリースされ、Nginx コソケット API に依存しています。

### OpenVPN

* OpenVPN [ライセンス情報][51]を Datadog に送信します。

### Phusion Passenger

[Stevenson Jean-Pierre][53] が作成した [passenger-datadog-monitor][52] を使用して、Phusion の Passenger サーバーからヘルスメトリクスを送信します。

### Pid-stats

この[ライブラリ][54]を使用すると、pid ファイルを指定して StatsD からプロセス情報を生成できます。これは [GitterHQ][55] によって作成されました。

### Pulumi
Pulumi 用の Datadog [リソースプロバイダー][67]を使用すると、Datadog リソースを構成することができます。

### SaltStack

* [Datadog SaltStack Formula][56]
* [Luca Cipriani][58] が作成した [Datadog SaltStack][57]。

### Sensu

これらの Sensu [ハンドラー][59]を使用して、メトリクスとイベントの両方を Datadog に自動的に送信します。

### StackStorm

この StackStorm Datadog [インテグレーションパック][60]は、Datadog のアクションインテグレーションを提供します。

### Winston

Winston Datadog [転送][61]。

## コミュニティ Agent ポート

### FreeBSD

[FreeBSD dd-agent ポート][62]

### NixOS

[dd-agent nixpkg][63]

Datadog ライブラリを作成し、このページに追加する場合は、[opensource@datadoghq.com][64] にメールを送信してください。

[1]: /ja/metrics/custom_metrics/dogstatsd_metrics_submission/
[2]: /ja/tracing/
[3]: /ja/serverless/
[4]: /ja/api/
[5]: https://github.com/brightcove/dog-watcher
[6]: https://www.brightcove.com
[9]: https://github.com/grosser/kennel
[10]: https://www.zendesk.com
[14]: https://github.com/codenize-tools
[15]: https://github.com/airbnb/interferon
[16]: https://github.com/airbnb
[19]: https://www.terraform.io/docs/providers/datadog/r/monitor.html
[20]: https://www.terraform.io
[21]: https://github.com/intercom/datadog-to-terraform
[22]: https://github.com/intercom
[23]: https://docs.ansible.com/ansible/2.9/modules/list_of_monitoring_modules.html
[24]: https://github.com/ansible/ansible-modules-extras
[25]: https://www.aptible.com/docs/core-concepts/integrations/datadog
[27]: https://github.com/keirans/datadog-management
[28]: https://github.com/zendesk/consul2dogstats
[29]: https://github.com/cvent/dogscaler
[30]: https://github.com/wimactel/FreeSwitch-DataDog-Metrics
[31]: https://github.com/wimactel
[34]: /ja/logs/guide/collect-heroku-logs/
[40]: https://grafana.com/docs/k6/latest/results-output/real-time/datadog/
[41]: https://github.com/meetup/launch-dogly
[42]: https://www.elastic.co/guide/en/logstash/current/plugins-outputs-datadog.html
[43]: https://github.com/brigade/logstash-output-dogstatsd
[44]: https://docs.moogsoft.com/AIOps.6.2.0/Datadog-Solution-Pak_13737047.html
[45]: /ja/metrics/custom_metrics/
[46]: https://github.com/simplifi/ngx_lua_datadog
[47]: https://github.com/dailymotion/lua-resty-dogstatsd
[48]: http://www.mediba.jp
[49]: https://www.dailymotion.com/us
[51]: https://github.com/denniswebb/datadog-openvpn
[52]: https://github.com/Sjeanpierre/passenger-datadog-monitor
[53]: https://github.com/Sjeanpierre
[54]: https://github.com/gitterHQ/pid-stats
[55]: https://github.com/gitterHQ
[56]: https://github.com/DataDog/datadog-formula
[57]: https://gist.github.com/mastrolinux/6175280
[58]: https://gist.github.com/mastrolinux
[59]: https://github.com/sensu-plugins/sensu-plugins-datadog
[60]: https://github.com/StackStorm-Exchange/stackstorm-datadog
[61]: https://github.com/sparkida/winston-datadog
[62]: https://github.com/urosgruber/dd-agent-FreeBSD
[63]: https://github.com/NixOS/nixpkgs/tree/master/pkgs/tools/networking/dd-agent
[64]: mailto:opensource@datadoghq.com
[65]: https://github.com/SpeedCurve-Metrics/heroku-buildpack-php-ddtrace
[66]: https://www.speedcurve.com/
[67]: https://github.com/pulumi/pulumi-datadog