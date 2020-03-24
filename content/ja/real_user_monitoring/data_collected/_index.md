---
title: 収集された RUM データ
kind: documentation
further_reading:
  - link: 'https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/'
    tag: ブログ
    text: リアルユーザーモニタリング
  - link: /real_user_monitoring/explorer/
    tag: ドキュメント
    text: Datadog でビューを検索する
  - link: /real_user_monitoring/explorer/analytics/
    tag: ドキュメント
    text: イベントの分析を構築する
  - link: /logs/processing/attributes_naming_convention/
    tag: ドキュメント
    text: Datadog標準属性
---
{{< whatsnext desc="デフォルトでは、収集されたすべてのデータは 15 日間完全な粒度で保持されます。Datadog Real User Monitoring スクリプトは、5 つの主なタイプのイベントを Datadog に送信します。">}}
  {{< nextlink href="/real_user_monitoring/data_collected/view">}}<u>ビュー</u>: ユーザーがセットアップアプリケーションのページにアクセスするたびに、ビューイベントが作成されます。ユーザーがそのビューに留まっている間、収集されたすべてのデータは `view.id` 属性でそのビューにアタッチされます。{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/data_collected/resource">}}<u>リソース</u>: リソースイベントは、画像、XHR/Fetch、CSS、または JS ライブラリに対して生成できます。名前や関連する読み込み時間など、リソースに関する情報が含まれています。{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/data_collected/long_task">}}<u>ロングタスク</u>: メインスレッドを 50 ミリ秒以上ブロックするブラウザ内のタスクは、ロングタスクと見なされ、特定のイベントが生成されます。{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/data_collected/error">}}<u>エラー</u>: ブラウザからフロントエンドエラーが発生するたびに、RUM はそれをキャッチし、エラーイベントとして Datadog に送信します。{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/data_collected/user_action">}}<u>ユーザーアクション</u>: ユーザーアクションイベントは、特定のユーザーアクションに対して生成できるカスタムイベントです。{{< /nextlink >}}
{{< /whatsnext >}}

## デフォルト属性

以下の 5 つのイベントカテゴリには、デフォルトで属性がアタッチされています。

### コア

| 属性名   | 種類   | 説明                 |
|------------------|--------|-----------------------------|
| `application_id` | string | Datadog アプリケーション ID。 |
| `session_id`     | string | セッション ID。             |

### ビュー属性

| 属性名                 | 種類   | 説明                                                                                                    |
|--------------------------------|--------|----------------------------------------------------------------------------------------------------------------|
| `view.id`                      | string | ページビューごとにランダムに生成された ID。                                                                      |
| `view.url`                     | string | ビューの URL。                                                                                                  |
| `view.referrer`                | string | 現在リクエストされているページへのリンクがたどられた前のウェブページの URL。               |
| `view.url_details.host`        | string | URL の HTTP ホスト部分。                                                                                 |
| `view.url_details.path`        | string | URL の HTTP パス部分。                                                                                 |
| `view.url_details.path_group`  | string | 同様の URL に対して生成された自動 URL グループ。（例: `/dashboard/123` と `/dashboard/456` に対する `/dashboard/?`） |
| `view.url_details.queryString` | object | クエリパラメーターの key/value 属性として分解された、URL の HTTP クエリ文字列部分。                        |

### ユーザーエージェント

[Datadog 標準属性][1]ロジックに続く次のコンテキストは、Datadog に送信されるすべてのイベントに自動的にアタッチされます。

| 属性名                           | 種類   | 説明                                     |
|------------------------------------------|--------|-------------------------------------------------|
| `http.useragent_details.os.family`       | string | User-Agent によって報告された OS ファミリー。       |
| `http.useragent_details.browser.family`  | string | User-Agent によって報告されたブラウザファミリー。  |
| `http.useragent_details.device.family`   | string | User-Agent によって報告されたデバイスファミリー。   |
| `http.useragent_details.device.category` | string | User-Agent によって報告されたデバイスカテゴリ。 |

### 位置情報

以下は、ネットワーク通信で使用される IP アドレスの位置情報に関連する属性です。すべてのフィールドの先頭に `network.client.geoip` または `network.destination.geoip` が付与されます。

| 完全名                                    | 種類   | 説明                                                                                                                          |
|:--------------------------------------------|:-------|:-------------------------------------------------------------------------------------------------------------------------------------|
| `network.client.geoip.country.name`         | string | 国の名前。                                                                                                                  |
| `network.client.geoip.country.iso_code`     | string | 国の [ISO コード][2] (米国は `US`、フランスは `FR` など)。                                                  |
| `network.client.geoip.continent.code`       | string | 大陸の ISO コード (`EU`、`AS`、`NA`、`AF`、`AN`、`SA`、`OC`)                                                                 |
| `network.client.geoip.continent.name`       | string | 大陸名 (`Europe`、`Australia`、`North America`、`Africa`、`Antartica`、`South America`、`Oceania`)                    |
| `network.client.geoip.subdivision.name`     | string | その国で最大規模の地方区分 (米国は `California` 州、フランスは `Sarthe` 県など) |
| `network.client.geoip.subdivision.iso_code` | string | その国で最大規模の地方区分の [ISO コード][2] (米国は `CA`、フランスは `SA` など)    |
| `network.client.geoip.city.name`            | string | 都市名 (`Paris`、`New York` など)                                                                                   |

## 追加属性

デフォルトの属性に加えて、収集されたすべてのイベントに[特定のグローバルコンテキスト][3]を追加できます。これにより、ユーザーのサブセットのデータを分析することができます。ユーザーメール別のグループエラー、パフォーマンスが最も悪い顧客の把握などです。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/processing/attributes_naming_convention
[2]: /ja/logs/processing/attributes_naming_convention/#user-agent-attributes
[3]: /ja/real_user_monitoring/installation/advanced_configuration