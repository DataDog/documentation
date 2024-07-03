---
disable_toc: false
further_reading:
- link: /cloud_cost_management/
  tag: Documentation
  text: Cloud Cost Management
- link: /cloud_cost_management/aws
  tag: Documentation
  text: Gain insights into your AWS bill
- link: /cloud_cost_management/azure
  tag: Documentation
  text: Gain insights into your Azure bill
- link: /cloud_cost_management/google_cloud
  tag: Documentation
  text: Gain insights into your Google Cloud bill
is_beta: true
private: true
title: Custom Costs
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Cloud Cost Management is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

{{< beta-callout url="#" btn_hidden="true" >}}
カスタムコストは公開ベータ版です。
{{< /beta-callout >}}

## 概要

Custom Costs allow you to upload *any cost data source* to Datadog, so that you can understand the total cost of your services.

カスタムコストは、事前に定義されたファイル形式 (CSV または JSON) のコストデータを受け入れます。これらのファイルは、[FinOps の FOCUS 仕様][2] に準拠し、[いずれの形式でも複数のファイルをアップロード](#create-a-csv-or-json-file-with-required-fields)することができます。例えば、1 つ以上の行項目 (CSV の場合は行、JSON の場合はオブジェクト) を持つ CSV ファイルまたは JSON ファイルを、必要に応じて組み合わせてアップロードすることが可能です。

行項目は、すべて以下の要件を満たす必要があり、[以下のプロパティ](#collect-the-required-fields)が含まれていなければなりません。

- すべての列名 (CSV)、プロパティ名 (JSON)、値が UTF-8 でエンコードされていること。
- 必須の列名 (CSV) またはプロパティ名 (JSON) がすべて [PascalCase][5] であること。例えば、`"providername"` や `"ProviderNAME"` ではなく、`"ProviderName"` を使用しなければなりません。
- 列名 (CSV) と値、またはプロパティ名 (JSON) と値が、すべて 1,000 文字以下であること。
- NULL やブランク ("") のパラメーター値は認められません。

Additionally, all dates are transformed into UTC timestamps. For example, "2024-01-01" becomes "2024-01-01 00:00:00".

## セットアップ

Datadog でカスタムコストを使用するには、AWS、Azure、または Google Cloud 用に [Cloud Cost Management を構成する][1]必要があります。

### 必須フィールドを収集する

| パラメーター | 説明 | 有効な例 | 無効な例 | 追加要件 |
| ----------| -----------|----------| -----------|----------|
|`ProviderName` | 消費されているサービス。 | Snowflake | "" または NULL|  |
|`ChargeDescription` | サービスのどの側面が課金対象であるかを識別します。 | Database Costs | "" または NULL|  |
|`ChargePeriodStart`| 請求開始日。 | 2023-09-01| 2023-01-01 12:34:56| YYYY-MM-DD 形式で、`ChargePeriodStart` が `ChargePeriodEnd` 以前であること。|
|`ChargePeriodEnd` | Last day of a charge (inclusive).  | 2023-09-30 | 01/01/2023 | YYYY-MM-DD 形式。 |
|`BilledCost`| 請求金額。 |10.00 |NaN | 小数点を含む数値。 |
|`BillingCurrency` | 請求される料金の通貨。 | USD| EUR | 必ず USD を使用すること。 |

### 必須フィールドを持つ CSV または JSON ファイルを作成する

CSV ファイルおよび JSON ファイルは、いずれかの形式または両方の形式で複数アップロードすることができます。同じファイルを 2 回アップロードしてしまうと製品内にコストが重複して表示されるため、注意してください。

{{< tabs >}}
{{% tab "CSV" %}}

The required fields must appear as columns in your CSV in the order listed above. You need to use a comma (`,`) as a separator for your CSV.

有効な CSV の例:

<table>
    <thead>
        <tr>
            <th style="text-align:center;text-transform:none;">ProviderName</th>
            <th style="text-align:center;text-transform:none;">ChargeDescription</th>
            <th style="text-align:center;text-transform:none;">ChargePeriodStart</th>
            <th style="text-align:center;text-transform:none;">ChargePeriodEnd</th>
            <th style="text-align:center;text-transform:none;">BilledCost</th>
            <th style="text-align:center;text-transform:none;">BillingCurrency</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style="text-align:center;text-transform:none;">GitHub</td>
            <td style="text-align:center;text-transform:none;">User Costs</td>
            <td style="text-align:center;text-transform:none;">2023-01-01</td>
            <td style="text-align:center;text-transform:none;">2023-01-31</td>
            <td style="text-align:center;text-transform:none;">300.00</td>
            <td style="text-align:center;text-transform:none;">USD</td>
        </tr>
    </tbody>
</table>


無効な CSV の例 (`ChargePeriodStart` が `ChargeDescription` よりも前にある):

<table>
    <thead>
        <tr>
            <th style="text-align:center;text-transform:none;">ProviderName</th>
            <th style="text-align:center;text-transform:none;">ChargePeriodStart</th>
            <th style="text-align:center;text-transform:none;">ChargeDescription</th>
            <th style="text-align:center;text-transform:none;">ChargePeriodEnd</th>
            <th style="text-align:center;text-transform:none;">BilledCost</th>
            <th style="text-align:center;text-transform:none;">BillingCurrency</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style="text-align:center;text-transform:none;">GitHub</td>
            <td style="text-align:center;text-transform:none;">2023-01-01</td>
            <td style="text-align:center;text-transform:none;">User Costs</td>
            <td style="text-align:center;text-transform:none;">2023-01-31</td>
            <td style="text-align:center;text-transform:none;">300.00</td>
            <td style="text-align:center;text-transform:none;">USD</td>
        </tr>
    </tbody>
</table>


{{% /tab %}}
{{% tab "JSON" %}}

必須フィールドは、[ECMA-404 標準][101]に従って、JSON ファイルのすべてのオブジェクト内に記述される必要があり、すべてのオブジェクトが配列でカプセル化されている必要があります。

有効な JSON ファイルの例:

```json
[
    {
        "ProviderName": "Zoom",
        "ChargeDescription": "Video Usage",
        "ChargePeriodStart": "2023-01-01",
        "ChargePeriodEnd": "2023-12-31",
        "BilledCost": 100.00,
        "BillingCurrency": "USD"
    }
]
```

無効な JSON ファイルの例:

```json
[
    {
        "providername": "Zoom",
        "chargedescription": "Video Usage",
        "chargeperiodstart": "2023-01-01",
        "chargeperiodend": "2023-12-31",
        "billedcost": 100.00,
        "billingcurrency": "USD"
    }
]
```

[101]: https://www.ecma-international.org/publications-and-standards/standards/ecma-404/

{{% /tab %}}
{{< /tabs >}}

### Add optional tags

オプションで、CSV または JSON ファイルの必須フィールドの*後ろ*に、コストを割り当てるためのタグを追加の列としていくつでも追加することができます。

{{< tabs >}}
{{% tab "CSV" %}}

CSV ファイルの場合、1 つのタグごとに 1 つの列を追加します。

有効な CSV ファイルの例:

<table>
    <thead>
        <tr>
            <th style="text-align:center;text-transform:none;">ProviderName</th>
            <th style="text-align:center;text-transform:none;">ChargePeriodStart</th>
            <th style="text-align:center;text-transform:none;">ChargeDescription</th>
            <th style="text-align:center;text-transform:none;">ChargePeriodEnd</th>
            <th style="text-align:center;text-transform:none;">BilledCost</th>
            <th style="text-align:center;text-transform:none;">BillingCurrency</th>
            <th style="text-align:center;text-transform:none;">team</th>
            <th style="text-align:center;text-transform:none;">service</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style="text-align:center;text-transform:none;">GitHub</td>
            <td style="text-align:center;text-transform:none;">2023-01-01</td>
            <td style="text-align:center;text-transform:none;">User Costs</td>
            <td style="text-align:center;text-transform:none;">2023-01-31</td>
            <td style="text-align:center;text-transform:none;">300.00</td>
            <td style="text-align:center;text-transform:none;">USD</td>
            <td style="text-align:center;text-transform:none;">web</td>
            <td style="text-align:center;text-transform:none;">ops</td>
        </tr>
    </tbody>
</table>

</br>

この例では、`BillingCurrency` 列の後に `team` 列と `service` 列が追加され、このコストのタグとして記述されています。

{{% /tab %}}
{{% tab "JSON" %}}

JSON ファイルの場合、`Tags` オブジェクトのプロパティを追加して、このコストに関連する必要なタグをカプセル化します。

有効な JSON ファイルの例:

```json
[
    {
        "ProviderName": "Zoom",
        "ChargeDescription": "Video Usage",
        "ChargePeriodStart": "2023-01-01",
        "ChargePeriodEnd": "2023-12-31",
        "BilledCost": 100.00,
        "BillingCurrency": "USD",
        "Tags": {
            "team": "web",
            "service": "ops"
        }
    }
]
```

この例では、`Tags` オブジェクトのプロパティが追加され、このコストに `team` と `service` タグを割り当てるキーと値のペアが 2 つ追加されています。

{{% /tab %}}
{{< /tabs >}}

### カスタムコストを構成する

After your data is formatted to the requirements above, upload your CSV and JSON files to Cloud Cost Management on [the **Custom Costs Uploaded Files** page][3] or programmatically by using the API.

{{< tabs >}}
{{% tab "UI" %}}

Navigate to [**Infrastructure > Cloud Costs > Settings > Cost Files**][101]. Select **Cost Files** from the Settings dropdown.

{{< img src="cloud_cost/upload_file.png" alt="CSV または JSON ファイルを Datadog にアップロード" style="width:80%" >}}

[101]: https://app.datadoghq.com/cost/settings/cost-files

{{% /tab %}}
{{% tab "API (file)" %}}

To send a file, use the `PUT api/v2/cost/custom_costs` API endpoint.

cURL の例:

```curl
curl -L -X PUT "api.datadoghq.com/api/v2/cost/custom_costs/" \
-H "Content-Type: multipart/form-data" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
-F "file=${file};type=text/json"
```
{{% /tab %}}
{{% tab "API (request)" %}}

Use the `PUT api/v2/cost/custom_costs` endpoint to send the content of the file with the API .

```curl
curl -L -X PUT "api.datadoghq.com/api/v2/cost/custom_costs/" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
-d '${file_content}'
```
{{% /tab %}}
{{< /tabs >}}

Cost data appears after 24 hours.

## コストメトリクスの種類

インジェストしたデータは、以下のコストタイプで視覚化することができます。

| コストタイプ | 説明 |
| ----------| ----------------------------------|
| `custom.cost.amortized` | 期間中に発生したリソースの総コスト。 |
| `custom.cost.basis` | 期間中、使用時に割り当てられたリソースの総コスト。 |

カスタムコストに送信されるコストは、すべてこれらのメトリクスに表示されます。例えば、9 月 1 日に $4 の購入が行われた場合、9 月 1 日から 4 日までの期間において、以下のコストが各メトリクスに割り当てられます。

| 日付 | `custom.cost.basis` | `custom.cost.amortized` |
|---|---|---|
| 9 月 1 日 | 4 ドル | 1 ドル |
| 9 月 2 日 | - | 1 ドル |
| 9 月 3 日 | - | 1 ドル |
| 9 月 4 日 | - | 1 ドル |

## カスタムコストのデータを利用する

カスタムコストのデータは、[**Cloud Costs Analytics** ページ][6]、[クラウドコストタグエクスプローラー][7]、[ダッシュボード][8]、[ノートブック][9]、[モニター][10]で確認できます。カスタムコストのメトリクスを、他のクラウドコストメトリクスや観測可能性メトリクスと組み合わせることも可能です。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/cloud_cost_management
[2]: https://focus.finops.org/#specification
[3]: https://app.datadoghq.com/cost/settings/cost-files
[4]: https://www.ecma-international.org/publications-and-standards/standards/ecma-404/
[5]: https://en.wiktionary.org/wiki/Pascal_case
[6]: https://app.datadoghq.com/cost/analytics
[7]: https://app.datadoghq.com/cost/tags?cloud=custom
[8]: /ja/dashboards
[9]: /ja/notebooks
[10]: /ja/monitors/types/cloud_cost/