---
aliases:
- /ja/hostnames
- /ja/graphing/infrastructure/list/
further_reading:
- link: /infrastructure/hostmap/
  tag: ドキュメント
  text: ホストマップ
- link: /infrastructure/livecontainers/
  tag: ドキュメント
  text: コンテナマップ
- link: /infrastructure/process/
  tag: ドキュメント
  text: ライブプロセスモニタリング
title: ホストリスト
---
## 概要 {#overview}

ホストリストは、Agent またはクラウド統合を通じて Datadog に報告しているすべてのホストのライブインベントリを提供します。デフォルトでは、過去 15 分間にアクティビティがあったホストが表示されます。ホストリストを開くには、Datadog の[**インフラストラクチャー > ホスト**][10]に移動します。

このページでは、ホストリストの**新しい**ビューについて説明します。**従来**のビューに切り替えるには、右上隅のトグルを使用します。

{{< img src="infrastructure/index/infra-list-overview-2.png" alt="フィルターパネルが左側にあり、カスタマイズ可能な列を持つホストのリストが表示されるホストリスト。" style="width:100%;">}}

**注**: このリストは、インフラストラクチャーホストの課金を推定するためには使用しないでください。詳細については、[課金][11]ページを参照してください。

## フィルターと検索 {#filter-and-search}

左側のフィルターパネルを使用してホストのリストを絞り込みます。

- **My Teams**: トグルをオンにしてチームに関連するホストのみを表示します。
- **クイックフィルター**: パネル上部のチェックボックスを使用して、クラウドプロバイダー (AWS、Azure、Google Cloud、Oracle、または Alibaba Cloud)、テレメトリソース (Datadog Agent または OpenTelemetry)、オペレーティングシステム (Windows、Linux、または Darwin)、またはハードウェア (GPU) でフィルタリングします。
- **メトリクスのフィルタリング**: メトリクスを選択し、メトリクス値でホストをフィルタリングする値の範囲を定義します。
- **ファセットの検索**: クラウドプロバイダー、環境、リージョン、リソースタイプ、インスタンスタイプ、OS、OS バージョン、Agent、または Docker バージョンなど、任意のホストプロパティまたはタグでフィルタリングします。

リストの上部にある検索ボックスを使用して、[Datadog 検索構文][16]でホストをフィルタリングすることもできます。

## 列のカスタマイズ {#customize-columns}

列を追加、削除、または並べ替えるには、ホストリストの上にある**列**をクリックします。次のいずれかを列として追加できます。

- **ホスト属性**: ホスト名やステータスなど、ホストのプロパティ。
- **タグ**: ホストに適用された任意のタグ。
- **メトリクス**: ホストによって報告された任意のメトリクス。

列を再配置するには、新しい位置にドラッグします。サイズを変更するには、右端をドラッグします。非表示にするには、オフに切り替えます。

{{< img src="infrastructure/index/infra-list-columns.png" alt="ホスト属性、タグ、メトリクスのセクションがあり、各列を表示または非表示にするためのトグルがある列カスタマイズパネル。" style="width:100%;">}}

### 結合列 {#combined-columns}

ホストリストには、複数のデータポイントを結合した 3 つの列が含まれます。

- **構成**: 各ホストのクラウドプロバイダー、オペレーティングシステム、および Datadog Agent のインストール状況。
- **ソフトウェア**: 検出された場合、ホストのウェブサーバー、データベース、キャッシュ、およびコンテナオーケストレーター (Docker や Kubernetes など)。
- **インテグレーション**: ホストで有効になっている Datadog Agent インテグレーション。

## 保存済みビュー {#saved-views}

フィルターと列の構成を保存するには、左上隅の**ビュー**パネルを開き、**新しいビューとして保存**をクリックします。このパネルから、保存済みビューのフィルタリング、並べ替え、編集、スターを付けることを行えます。

{{< img src="infrastructure/index/infra-list-views.png" alt="保存、フィルタリング、並べ替え、編集を行う各オプションがビューパネルに含まれています。" style="width:40%;">}}

## ホストを検査する {#inspect-a-host}

任意のホストをクリックすると、その詳細パネルが開きます。これは [Resource Catalog][15] で使用されるのと同じサイドパネルです。パネルには次のものが含まれます。

- [ホスト名とエイリアス](/agent/faq/how-datadog-agent-determines-the-hostname/#host-aliases)
- [タグ][2]
- [メトリクス][3]
- [コンテナ][4]
- [ログ][5] (有効な場合)
- [Agent 構成](#agent-configuration) (有効な場合)
- [OpenTelemetry Collector 構成](#opentelemetry-collector-configuration) (有効な場合)

{{< img src="infrastructure/index/infra-list-side-panel.png" alt="ホストの概要、メトリクス、コンテナ、プロセス、およびその他のホストデータのセクションが含まれたホストの詳細サイドパネル。" style="width:100%;">}}

### Agent 構成 {#agent-configuration}

ホストの Agent 構成を表示するには、ホストをクリックしてサイドパネルを開き、**Agent** セクションまでスクロールします。インフラストラクチャー全体の Agent 構成を表示および管理するには、[Fleet Automation][12] を使用します。

{{< img src="infrastructure/index/infra-list-agent-config.png" alt="JSON 形式の Agent 構成が表示されたホストのサイドパネルの Agent セクション。" style="width:100%;">}}

### OpenTelemetry Collector 構成 {#opentelemetry-collector-configuration}

[Datadog 拡張機能][14]を OpenTelemetry Collector とともに構成すると、ホストの詳細パネルで Collector の構成やビルド情報を直接表示できます。この拡張機能を使用すると、Datadog から Collector デプロイメントを管理およびデバッグすることもできます。

ホストの OpenTelemetry Collector 構成を表示するには、ホストをクリックしてサイドパネルを開きます。**OTel Collector** セクションまでスクロールして、ビルド情報と完全な Collector 構成を確認します。ホスト名の一致やパイプラインの構成などの詳細なセットアップ手順と要件については、[Datadog 拡張機能に関するドキュメント][14]を参照してください。

{{< img src="infrastructure/index/infra-list-otel-config.png" alt="ビルド情報と Collector 構成が表示された、ホストのサイドパネルの OTel Collector セクション。" style="width:100%;">}}

## エクスポート {#export}

**エクスポート** > **DDSQL エディターで開く**をクリックし、[DDSQL エディター][18]から結果をダウンロードします。ダッシュボード、ノートブック、またはスプレッドシートにエクスポートすることもできます。Datadog にレポートしているホストの JSON 形式のリストを取得するには、以下のいずれかを使用することもできます。

- [ホストの概要レポート][17]。
- [ホスト API エンドポイントの検索][7]。例については、[開発者ガイド][8]を参照してください。

### Agent バージョンを監査する {#audit-agent-versions}

ホスト全体でどの Agent バージョンが実行されているかを監査するには、[get_host_agent_list スクリプト][9]を使用します。このスクリプトは、[ホストの概要レポート][17]を使用して実行中の Agent とそのバージョン番号を出力します。`json_to_csv` スクリプトは、JSON 出力を CSV に変換します。

### Agent なしでホストをリストする {#list-hosts-without-an-agent}

JSON エクスポートを使用して、Agent がインストールされていないAmazon EC2 (RDS を除く) インスタンスのリストを作成することもできます。これらのインスタンスは、Datadog AWS インテグレーションで AWS アカウントを設定すると、ホストリストに表示されます。以下の Python 3 スクリプトがそれらをリストします。

```python
# 3p
import requests

# stdlib
import json
import pprint
import os

api_key = os.environ['DD_API_KEY']
app_key = os.environ['DD_APP_KEY']

url = "https://app.datadoghq.com/reports/v2/overview?\
window=3h&with_apps=true&with_sources=true&with_aliases=true\
&with_meta=true&with_tags=true&api_key=%s&application_key=%s"

infra = json.loads(requests.get(url %(api_key,app_key)).text)

for host in infra['rows']:
    if (('aws' in host['apps']) and ('rds' not in host['apps']) and ('agent' not in host['apps'])):
        try:
            print(f'HOST: {host["name"]} - TAGS: {host["tags_by_source"]}')
        except:
            pass
```

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[2]: /ja/getting_started/tagging/
[3]: /ja/metrics/
[4]: /ja/infrastructure/livecontainers/?tab=helm#overview
[5]: /ja/logs/
[7]: /ja/api/v1/hosts/#get-the-total-number-of-active-hosts
[8]: /ja/extend/guide/query-the-infrastructure-list-via-the-api/
[9]: https://github.com/DataDog/Miscellany/tree/master/get_hostname_agentversion
[10]: https://app.datadoghq.com/infrastructure
[11]: https://docs.datadoghq.com/ja/account_management/billing/
[12]: https://app.datadoghq.com/release-notes/fleet-automation-is-now-generally-available
[14]: /ja/opentelemetry/integrations/datadog_extension/
[15]: /ja/infrastructure/resource_catalog/#investigate-a-host-or-resource
[16]: /ja/getting_started/search/
[17]: https://app.datadoghq.com/reports/v2/overview?metrics=avg%3Aaws.ec2.cpuutilization%2Cavg%3Aazure.vm.percentage_cpu%2Cavg%3Agcp.gce.instance.cpu.utilization%2Cavg%3Asystem.cpu.idle%2Cavg%3Asystem.cpu.iowait%2Cavg%3Asystem.load.norm.15%2Cavg%3Avsphere.cpu.usage%2Cavg%3Avsphere.cpu.usage.avg%2Cavg%3Aalibabacloud.ecs.cpu_utilization.average&with_apps=true&with_sources=true&with_aliases=true&with_meta=true&with_mute_status=true&with_tags=true
[18]: /ja/ddsql_editor/#save-and-share-queries