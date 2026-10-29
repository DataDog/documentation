---
aliases:
- /ja/security_monitoring/guide/how-to-setup-security-filters-using-security-monitoring-api/
- /ja/security_platform/guide/how-to-setup-security-filters-using-security-monitoring-api/
- /ja/security_monitoring/guide/how-to-setup-security-filters-using-cloud-siem-api/
- /ja/cloud_siem/guide/how-to-setup-security-filters-using-security-monitoring-api/
- /ja/security_platform/guide/how-to-setup-security-filters-using-cloud-siem-api/
- /ja/security_platform/cloud_siem/guide/how-to-setup-security-filters-using-cloud-siem-api/
- /ja/security/guide/how-to-setup-security-filters-using-security-monitoring-api/
- /ja/security/cloud_siem/guide/how-to-setup-security-filters-using-cloud-siem-api/
description: セキュリティフィルターまたはログインデックスフィルターを設定して、Cloud SIEM の分析対象となる取り込まれたログをカスタマイズします。組織に適用される
  Cloud SIEM 製品、UI および API の設定、サポートされているフィルターフィールドとサポートされていないフィルターフィールド、AWS、Azure、Google
  Cloud、ID プロバイダーに共通のパターンなどについて説明します。
further_reading:
- link: /security/detection_rules/
  tag: ドキュメント
  text: 検出ルール
- link: /security/cloud_siem/ingest_and_enrich/content_packs
  tag: ドキュメント
  text: コンテンツパック
- link: /security/cloud_siem/guide/determine-cloud-siem-product/
  tag: ドキュメント
  text: 組織で使用している Cloud SIEM 製品を確認する
title: Cloud SIEM が分析するログをカスタマイズする
---
## 概要{#overview}

Cloud SIEM は、[検出ルール][1]を使用して取り込まれたログを分析し、脅威を検出します。多くの組織が、[コンテンツパック][7]を利用してどのログを Cloud SIEM で分析するかを管理しています。各コンテンツパックには、対象となるログソースの作成済みのフィルターが含まれています。より詳細に管理する必要がある場合は (たとえば、環境を除外する場合や、カスタムログセットに分析を制限する場合)、ログのフィルタリングを直接設定します。

## フィルタリングツールと設定方法 {#filtering-tools-and-configuration-methods}

利用できるフィルタリングツールと設定方法は、お使いの Cloud SIEM 製品によって異なります。

| Cloud SIEM 製品    | フィルタリングツール                           | 設定方法                                                                                                 |
|-----------------------|------------------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| スタンドアロン            | ログインデックスフィルター (セキュリティフィルターは使用不可) | [ログ設定 UI](#cloud-siem-standalone-filter-the-cloud-siem-index)                                            |
| Flex Logs 付きアドオン | セキュリティフィルター | [UI](#configure-security-filters-in-the-ui-add-on-with-flex-logs) および [API](#configure-security-filters-with-the-api) |
| レガシー | セキュリティフィルター | [API](#configure-security-filters-with-the-api)                                                                       |

保持期間が 12 か月のスタンドアロン製品が、新しい Cloud SIEM 組織のデフォルト製品です。組織で使用している Cloud SIEM 製品が不明な場合は、「[組織で使用している Cloud SIEM 製品を確認する][2]」を参照してください。

<div class="alert alert-info">セキュリティフィルターおよびログインデックスフィルターは、Cloud SIEM によって分析されるログのみを制御します。Workload Protection 用の Datadog Agent (<code>source:runtime-security-agent</code>) および Cloud Security の誤設定 (<code>source:compliance-agent</code>) によって生成されたログは、フィルター設定にかかわらず、分析対象ログとして課金されません。</div>

### Cloud SIEM スタンドアロン: Cloud SIEM インデックスのフィルタリング {#cloud-siem-standalone-filter-the-cloud-siem-index}

Cloud SIEM スタンドアロンでは、セキュリティフィルターを使用しません。スタンドアロン組織は、Cloud SIEM ログインデックスでインデックスフィルターを設定することにより、Cloud SIEM がどのログを分析するのかを制御します。

インデックスフィルターは、どのログをインデックスに取り込むかを指定するクエリです。フィルターに一致しないログはインデックス化されないため、Cloud SIEM によって分析されません。クエリ構文は、標準の Datadog ログ検索構文と同じです。

詳細な設定手順については、ログコンフィギュレーションドキュメントの「[インデックスフィルター][3]」を参照してください。

**このガイドは、Cloud SIEM スタンドアロンには当てはまりません。**

## セキュリティフィルターの仕組み {#how-security-filters-work}

セキュリティフィルターは、取り込まれたログのうち、どのログを Cloud SIEM が分析するのかを指定します。Cloud SIEM は、取り込まれたすべてのログを、有効なすべてのセキュリティフィルターと照合して評価します。

セキュリティフィルターは**含有**です。つまり、ログが少なくとも 1 つの有効なセキュリティフィルターに一致し、かつそのフィルターの除外設定によって除外されない場合に、Datadog はそのログを分析します。セキュリティフィルターは、以下の 3 つの要素で構成されています。

- フィルターが一致するログを選択する**クエリ**。
- 0 個以上の**除外フィルター** (それぞれに独自のクエリがあります)。メインクエリに一致したログのうち、いずれかの除外クエリにも一致したものは、分析対象から除外されます。
- **ステータス** (有効または無効)。無効なフィルターは Cloud SIEM によって無視されますが、後で使用するために保存されたままになります。

Cloud SIEM は、セキュリティフィルターによって分析対象として選択されたかどうかに基づき、取り込まれたすべてのログに `datadog.cloud_siem:true` または `datadog.cloud_siem:false` のタグを付けます。ログエクスプローラーでこのタグを使用すると、特定のログに対するセキュリティフィルターの影響を確認できます。

### セキュリティフィルタークエリの制限 {#limitations-on-security-filter-queries}

Datadog は、Cloud SIEM が GeoIP、脅威インテリジェンス、および OCSF オブザーバブルエンリッチメントを適用する前に、セキュリティフィルターを評価します。エンリッチメントによって入力されるフィールドは、セキュリティフィルターが評価を行う時点ではログに存在しないため、セキュリティフィルターのクエリでそれらを参照することはできません。この制約は、2 とおりの方法で適用されます。

- **フィルター評価時に存在しないフィールド。**これらのフィールドは、Cloud SIEM のすぐに使えるエンリッチメントによってのみ入力され、セキュリティフィルターの後に実行されます。これらのフィールドのいずれかを参照するセキュリティフィルタークエリは、どのログとも一致しません。
  - `network.ip.list`
  - `network.ip.attributes`
  - `network.client.is_private_network_ip`
  - `network.destination.is_private_network_ip`
  - `ocsf.observables`
  - `ocsf.type_uid`

  これらのカテゴリーのデータをフィルタリングするには、`source`、`service`、`host`、タグ、解析されたログ属性など、取り込み時に存在する属性を使用してクエリを書き換えてください。

- **パイプライン構成によって使用可能かどうかが決まるフィールド。**これらのフィールドは、ログパイプラインプロセッサー (セキュリティフィルターの前) または Cloud SIEM のすぐに使えるエンリッチメント (セキュリティフィルターの後) のいずれかによって入力されます。これらのいずれかのフィールドに対するセキュリティフィルタークエリが機能するかどうかは、対応するパイプラインプロセッサーが設定されているかどうかによって決まります。
  - `network.client.geoip` (および `network.client.geoip.country.iso_code` などのサブ属性)
  - `threat_intel.results`
  - `threat_intel.indicators_matched`

  これらのフィールドをセキュリティフィルタークエリで使用できるようにするには、[ログパイプライン][8]で対応する GeoIP または脅威インテリジェンスエンリッチメントプロセッサーを設定してください。プロセッサーを設定すると、セキュリティフィルターが実行される前にフィールドに入力されます。

Cloud SIEM の GeoIP エンリッチメントは、パイプラインの GeoIP プロセッサーと同じ GeoIPFilter および IPinfo データベースを使用するため、どちらのパスで入力されても GeoIP データは同一です。脅威インテリジェンスの回避策は異なります。パイプラインの脅威インテリジェンスエンリッチメントプロセッサーは、ユーザー独自の脅威インテリジェンスソースから値を取得します (設定方法については「[独自の脅威インテリジェンスの持ち込み][9]」を参照してください)。これにより、Cloud SIEM のすぐに使える Datadog 管理の脅威インテリジェンスとは異なる一致のセットが生成されます。Cloud SIEM のすぐに使える脅威インテリジェンスを利用している場合、照合をセキュリティフィルターより上流に移動することはできません。

事前エンリッチメント評価は、セキュリティフィルターにのみ適用されます。検出ルール、抑制ルール、およびシグナルクエリは、エンリッチメント後のログに対して実行されるため、引き続きこれらのフィールドを参照できます。

## UI でセキュリティフィルターを設定する (Flex Logs 付きアドオン){#configure-security-filters-in-the-ui-add-on-with-flex-logs}

**適用対象:** Flex Logs 付き Cloud SIEM アドオン。Cloud SIEM レガシー組織は、[API](#configure-security-filters-with-the-api) を通じてセキュリティフィルターを設定する必要があります。

<div class="alert alert-info">ほとんどのユースケースにおいて、Cloud SIEM の分析対象となるログを管理する最も簡単な方法は、<a href="/security/cloud_siem/ingest_and_enrich/content_packs">コンテンツパック</a>を有効または無効にすることです。各コンテンツパックは独自のセキュリティフィルターを管理しているため、コンテンツパックを切り替えると、対応するフィルターが自動的に追加または削除されます。以下で説明するセキュリティフィルター UI は、コンテンツパックで行うことができる範囲外の微調整やカスタムログ制御のために提供されています。</div>

[{{< ui >}}Security Filters Configuration{{< /ui >}}] (セキュリティフィルターの構成) セクションには、すべてのセキュリティフィルター、そのクエリ、除外設定、およびフィルターが現在有効かどうかが一覧表示されます。セクション下部の [{{< ui >}}Preview{{< /ui >}}] (プレビュー) ペインには、有効なすべてのフィルターが適用された後に Cloud SIEM 分析に到達するログがストリーミングされます。[{{< ui >}}Preview{{< /ui >}}] ペインを使用して、フィルター設定が期待通りの結果を生成することを確認します。

{{< img src="security/cloud_siem/guide/siem_settings_page_security_filters.png" alt="Cloud SIEM 設定ページの [Security Filters Configuration] セクション。[Name] (名前)、[Filters] (フィルター)、[Active] (有効) の列がある設定済みフィルターの一覧が示され、その下に一致するログがストリーミングされる [Preview] ペインが表示されています。" style="width:100%;" >}}

### セキュリティフィルターを作成する {#create-a-security-filter}

1. Datadog で、[{{< ui >}}Security{{< /ui >}}] (セキュリティ) > [{{< ui >}}Cloud SIEM{{< /ui >}}] > [[**Settings**] (設定)][4] に移動します。
1. [**Security Filters Configuration**] セクションまでスクロールし、クリックして展開します。
1. [**Security Filters Configuration**] セクションで、[{{< ui >}}\+ New Security Filter{{< /ui >}}] (+新規セキュリティフィルター) をクリックします。[{{< ui >}}New Security Filter{{< /ui >}}] ウィンドウが開きます。
1. [**New Security Filter**] (新規セキュリティフィルター) ウィンドウで、以下のように入力します。
   - **[Name] (名前):** 短くわかりやすい名前 (例: `AWS CloudTrail`)。
   - **[Query] (クエリ):** Cloud SIEM の分析対象となるログを選択するログクエリ (例: `source:cloudtrail`)。
   - **Exclusion filters (除外フィルター)** (オプション): フィルターの一致対象からログを除外する 1 つ以上の除外クエリ。追加するには、[{{< ui >}}\+ New Exclusion Filter{{< /ui >}}] (+新規除外フィルター) をクリックして除外クエリを入力します。
   - **Filter status (フィルターのステータス):** 保存時にフィルターを有効にする場合は、[{{< ui >}}Active{{< /ui >}}] (有効) に設定します。
1. [**Preview**] ペインで、フィルターが期待通りのログに一致していることを確認します。
1. [{{< ui >}}Save{{< /ui >}}] (保存) をクリックします。

{{< img src="security/cloud_siem/guide/siem_settings_add_security-filter_empty.png" alt="[Name] および [Query] フィールドが空で、除外フィルターが設定されておらず、[Filter status] が [Active] に設定され、[Preview] ペインにライブログの取り込み統計が表示されている [New Security Filter] ダイアログ" style="width:100%;" >}}

### セキュリティフィルターを編集または無効化する {#edit-or-disable-a-security-filter}

1. [**Security Filters Configuration**] セクションで、フィルター行の [**Edit** ] (編集){{< img src="icons/pencil.png" inline="true" style="width:14px;">}} アイコンをクリックします。
2. [**Edit Security Filter**] (セキュリティフィルターの編集) ダイアログで、名前、クエリ、除外、またはフィルターのステータスを更新します。
3. [{{< ui >}}Save{{< /ui >}}] をクリックします。

フィルターを削除せずに無効にするには、[**Filter status**] を [inactive] (無効) に設定します。フィルターは保存されたままになるため、後で再度有効にすることができます。

### セキュリティフィルターを削除する {#delete-a-security-filter}

[**Security Filters Configuration**] セクションで、フィルター行の [**Delete**] (削除) アイコン {{< img src="icons/delete.png" inline="true" style="width:14px;">}} をクリックし、削除を確定します。

組み込みの `all ingested logs` フィルターは削除できませんが、無効にすることはできます。

## API を使用してセキュリティフィルターを設定する {#configure-security-filters-with-the-api}

**適用対象:** Flex Logs 付き Cloud SIEM アドオンおよび Cloud SIEM レガシー。

API を使用する場合は、使用している Cloud SIEM のバージョンを把握しておく必要があります。バージョンによってセキュリティフィルターのロジックが変化し、Cloud SIEM は存在するフィルターのロジックに基づいてのみログを分析します。
- **Flex Logs 付きのアドオン**の場合、最初にオンボーディングしたときにはセキュリティフィルターは存在しません。各コンテンツパックを有効にするとセキュリティフィルターが追加され、Cloud SIEM はログを分析できるようになります。
- **レガシー**の場合は動作が異なります。すべてのログを分析できる、デフォルトフィルターが付属しています。Datadog では、ログの量を削減するために、デフォルトセキュリティフィルターに除外フィルターを追加することを推奨しています。

### Cloud SIEM API の前提条件 {#prerequisites-for-the-cloud-siem-api}

- 管理者ユーザーの API キーとアプリケーションキー。どちらも [Datadog アカウントの API キーページ][5]で入手できます。このセクションの例にある`<DATADOG_API_KEY>` と `<DATADOG_APP_KEY>` を、ご使用の API キーとアプリケーションキーに置き換えてください。
- `curl`が例を実行するマシンにインストールされていること。他の言語の例については、[セキュリティモニタリング API ドキュメント][6]を参照してください。

<div class="alert alert-info">一部のセキュリティフィルター API のペイロードには、 <code>version</code> 属性が含まれています。<code>version</code> はオプションです。省略した場合、API はフィルターの最新バージョンを更新します。既知の特定のバージョンでのみリクエストが成功するようにする場合 (同時変更の上書きを防ぐためなど) は、 <code>version</code> を含めます。</div>

### カスタムセキュリティフィルターを作成する {#create-a-custom-security-filter}

カスタムセキュリティフィルターは、Cloud SIEM の分析対象となるログを指定します。この呼び出しの例では、`source:cloudtrail` に一致するフィルターを作成するため、Cloud SIEM は AWS CloudTrail からのログを分析します。

```bash
curl -L -X POST 'https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/security_monitoring/configuration/security_filters' \
--header 'Content-Type: application/json' \
--header 'DD-API-KEY: <DATADOG_API_KEY>' \
--header 'DD-APPLICATION-KEY: <DATADOG_APP_KEY>' \
--data-raw '{
    "data": {
        "type": "security_filters",
        "attributes": {
            "is_enabled": true,
            "name": "cloudtrail",
            "exclusion_filters": [],
            "filtered_data_type": "logs",
            "query": "source:cloudtrail"
        }
    }
}'
```

レスポンスの例:

```json
{
    "data": {
        "attributes": {
            "is_enabled": true,
            "is_builtin": false,
            "name": "cloudtrail",
            "filtered_data_type": "logs",
            "exclusion_filters": [],
            "version": 1,
            "query": "source:cloudtrail"
        },
        "type": "security_filters",
        "id": "qa6-tzm-rp7"
    }
}
```

### 既存のセキュリティフィルターに除外を追加する {#add-an-exclusion-to-an-existing-security-filter}

除外フィルターを使用して、既存のセキュリティフィルターを絞り込むことができます。これらは、何も設定しない場合、メインのフィルタークエリで処理されるログを除外するために役立ちます。この例では、`env:staging` とタグ付けされたログを除外します。

1. GET を使用して既存のセキュリティフィルターを取得し、フィルターの `id` を確認します。
   ```bash
   curl -L -X GET 'https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/security_monitoring/configuration/security_filters' \
   --header 'Content-Type: application/json' \
   --header 'DD-API-KEY: <DATADOG_API_KEY>' \
   --header 'DD-APPLICATION-KEY: <DATADOG_APP_KEY>'
   ```

   Example response:

   ```json
   {
       "data": [
           {
               "attributes": {
                   "is_enabled": true,
                   "is_builtin": true,
                   "name": "all ingested logs",
                   "filtered_data_type": "logs",
                   "exclusion_filters": [],
                   "version": 1,
                   "query": "*"
               },
               "type": "security_filters",
               "id": "l6l-rmx-mqx"
           }
       ]
   }
   ```

   レスポンスの例では、フィルター `id` は `l6l-rmx-mqx` です。組織ごとに一意のフィルター ID があるため、PATCH を送信する前に必ず現在の `id` を取得してください。
2. フィルターに PATCH を送信して除外を追加します。`<FILTER_ID>` を、リストリクエストによって返された `id` に置き換えます。
   ```bash
   curl -L -X PATCH 'https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/security_monitoring/configuration/security_filters/<FILTER_ID>' \
   --header 'Content-Type: application/json' \
   --header 'DD-API-KEY: <DATADOG_API_KEY>' \
   --header 'DD-APPLICATION-KEY: <DATADOG_APP_KEY>' \
   --data-raw '{
       "data": {
           "attributes": {
                "exclusion_filters": [
                   {
                       "query": "env:staging",
                       "name": "exclude env:staging"
                   }
               ],
               "version": 1
           },
           "type": "security_filters"
       }
   }'
   ```

   Example response:

   ```json
   {
       "data": {
           "attributes": {
               "is_enabled": true,
               "is_builtin": true,
               "name": "all ingested logs",
               "filtered_data_type": "logs",
               "exclusion_filters": [
                   {
                       "query": "env:staging",
                       "name": "exclude env:staging"
                   }
               ],
               "version": 2,
               "query": "*"
           },
           "type": "security_filters",
           "id": "<FILTER_ID>"
       }
   }
   ```

### セキュリティフィルターを無効化する {#disable-a-security-filter}

セキュリティフィルターを有効または無効にすることで、関連するログを分析するかどうかを制御できます。フィルターの `is_enabled` 属性を `false` に設定すると、フィルターを無効にし、削除せずに保持することができます。

```bash
curl -L -X PATCH 'https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/security_monitoring/configuration/security_filters/<FILTER_ID>' \
--header 'Content-Type: application/json' \
--header 'DD-API-KEY: <DATADOG_API_KEY>' \
--header 'DD-APPLICATION-KEY: <DATADOG_APP_KEY>' \
--data-raw '{
    "data": {
        "attributes": {
            "is_enabled": false
        },
        "type": "security_filters"
    }
}'
```

レスポンスの例:

```json
{
    "data": {
        "attributes": {
            "is_enabled": false,
            "is_builtin": true,
            "name": "all ingested logs",
            "filtered_data_type": "logs",
            "exclusion_filters": [
                {
                    "query": "env:staging",
                    "name": "exclude env:staging"
                }
            ],
            "version": 3,
            "query": "*"
        },
        "type": "security_filters",
        "id": "l6l-rmx-mqx"
    }
}
```

### セキュリティフィルターを削除する {#delete-a-security-filter-1}

カスタムセキュリティフィルターを削除するには、フィルター `id` を指定して DELETE リクエストを送信します。

```bash
curl -L -X DELETE 'https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/security_monitoring/configuration/security_filters/<FILTER_ID>' \
--header 'Content-Type: application/json' \
--header 'DD-API-KEY: <DATADOG_API_KEY>' \
--header 'DD-APPLICATION-KEY: <DATADOG_APP_KEY>'
```

リクエストが成功すると、`HTTP 204 No Content` が返されます。

## セキュリティフィルターのトラブルシューティング {#troubleshoot-security-filters}

Cloud SIEM で分析するはずのログからシグナルが生成されない場合は、以下のチェックを順番に実行してください。

1. **セキュリティフィルターで分析対象のログが選択されていることを確認します。**ログエクスプローラーでログを開き、`datadog.cloud_siem` の値をチェックします。
   - タグが `false` の場合、そのログはセキュリティフィルターによって除外されています。フィルターセットを確認し、ログに一致している有効なフィルターが少なくとも 1 つあること、および除外によってログが削除されていないことを確認します。
   - タグが `true` の場合、そのログは分析対象として選択されており、問題はセキュリティフィルターの下流にあります (いずれの検出ルールにも一致していないなど)。
2. **フィルタークエリがサポートされていないフィールドを参照していないかチェックします。**「[セキュリティフィルタークエリの制限](#limitations-on-security-filter-queries)」を参照してください。
   - フィルター評価時に存在しないフィールドに対するクエリは、0 件の一致を返します。
   - パイプライン構成によって使用可能かどうかが決定されるフィールドに対するクエリは、対応するパイプラインプロセッサーが構成されている場合にのみ一致を返します。
3. **すべてのフィルターの総合効果を検証します。**
   - UI で [{{< ui >}}Security Filters Configuration{{< /ui >}}] セクションの [**Preview**] ペインを展開し、有効なすべてのフィルターの適用後に分析に到達するログをストリーミングします。
   - API を使用して `GET` リクエストを送信し、すべてのフィルターを一覧表示して、`query` および `exclusion_filters` の合計ペイロードを確認します。

## セキュリティフィルタークエリに役立つタグと属性 {#useful-tags-and-attributes-for-security-filter-queries}

分析を特定のカテゴリーのログに制限する場合は、セキュリティに関連する重要なユーザー、エンティティ、またはソースを含むログを除外しないように注意してください。このセクションの表に、使用または調整できる一般的なクエリを示します。

### セキュリティフィルタークエリの主なユーザーとエンティティ {#key-users-and-entities-for-security-filter-queries}

| 名前              | クエリ                                           |
| ----------------- | ----------------------------------------------- |
| すべての名前付きイベント  | `@evt.name:*`                                   |
| すべてのクライアント IP    | `@network.client.ip:*`                          |
| すべての宛先 IP | `@network.destination.ip:*`                   |
| すべてのユーザー         | `@usr.id:* OR @usr.name:* OR @usr.email:*`      |
| すべてのホスト         | `host:* OR instance-id:*`                       |

### セキュリティフィルタークエリの主なセキュリティソース {#key-security-sources-for-security-filter-queries}

| 名前                    | クエリ                                            |
| ----------------------- | ------------------------------------------------ |
| AWS セキュリティログ       | `source:(cloudtrail OR guardduty OR route53)`    |
| AWS ネットワークログ        | `source:(vpc OR waf OR elb OR alb)`              |
| Google Cloud ログ       | `source:gcp*`                                    |
| Azure ログ              | `source:azure*`                                  |
| Kubernetes 監査ログ   | `source:kubernetes.audit`                        |
| ID プロバイダーログ  | `source:(okta OR gsuite OR auth0)`               |
| CDN ログ                | `source:(cloudfront OR cloudflare OR fastly)`    |
| Web サーバーログ         | `source:(nginx* OR apache OR iis)`               |

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/default_rules/#cat-cloud-siem
[2]: /ja/security/cloud_siem/guide/determine-cloud-siem-product/
[3]: /ja/logs/log_configuration/indexes/#indexes-filters
[4]: https://app.datadoghq.com/security/configuration/siem/setup
[5]: /ja/account_management/api-app-keys/
[6]: /ja/api/latest/security-monitoring/#get-all-security-filters
[7]: /ja/security/cloud_siem/ingest_and_enrich/content_packs
[8]: /ja/logs/log_configuration/pipelines/
[9]: /ja/security/cloud_siem/ingest_and_enrich/threat_intelligence/