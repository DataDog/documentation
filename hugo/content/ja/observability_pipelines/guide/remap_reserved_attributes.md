---
description: Observability Pipelines の Edit Fields または Custom Processor を使用して、ホスト、ソース、サービスなどの予約済みログ属性の値を再マッピングする方法を学びます。
disable_toc: false
further_reading:
- link: /observability_pipelines/processors/edit_fields/
  tag: ドキュメント
  text: Edit Fields プロセッサについて
- link: /observability_pipelines/processors/custom_processor/
  tag: ドキュメント
  text: Custom Processor プロセッサについて
title: 予約済み属性の再マッピング
---
## 概要 {#overview}

Observability Pipelines のプロセッサを使用すると、ログフィールドの追加、編集、削除を行うことができます。属性の再マッピングや値の書き換えを行うことで、ログが適切に処理され、標準化されます。ほとんどの処理ユースケースでは、Edit Fields プロセッサを使用してログのフィールドの追加、再マッピング、削除を行います。高度なユースケースでは、Custom Processor を使用して、条件付きでフィールドを変更したり、フィールドの値を書き換えたりします。

Datadog では、[予約済み属性][1]は、プラットフォーム内での特定の処理のために確保されているログフィールドです。予約済み属性には、` host`、`source`、`status`、`service`、`trace_id`、および `message` が含まれます。予約済み属性は、ログを Observability Pipelines の次の送信先にルーティングする際に適用されます。

- Datadog Logs
- Amazon S3 (ログアーカイブ用)
- Azure Blob Storage (ログアーカイブ用)
- Google Cloud Storage (ログアーカイブ用)

Observability Pipelines には、予約済み属性の変更方法に関する制限があります。たとえば、予約済み属性は Rename Field プロセッサを使用して名前を変更することはできません。代わりに再マッピングする必要があります。このガイドでは、予約済み属性の値を再マッピングする手順を説明します。

特定のセットアップで Splunk HEC ソースと Datadog 送信先を使用している場合は、[Splunk HEC ソースと Datadog 送信先を使用する場合のソース属性とサービス属性の再マッピング](#remap-source-and-service-attributes-when-using-the-splunk-hec-source-and-datadog-destination)を参照してください。

## 予約済み属性の値を再マッピングする{#remap-the-value-of-reserved-attributes}

既存の予約済み属性フィールドの値を変更または上書きするために、Datadog は Observability Pipelines を使用した 2 つのアプローチを推奨しています。1 つ目は Edit Fields プロセッサを使用する方法、2 つ目は Custom Processor を使用する方法です。

### 基本的なフィールド割り当てには Edit Fields プロセッサを使用する{#use-an-edit-fields-processor-for-basic-field-assignments}

1. ログから予約済み属性を削除するには、{{< ui >}}Remove field{{< /ui >}} プロセッサを使用します。
2. 正しいフィールド名と値の割り当てで予約済み属性をログに戻すには、{{< ui >}}Add field{{< /ui >}} プロセッサを使用します。

**注**: プロセッサの順序に関しては、正しいフィールドの再マッピングを確実にするために、{{< ui >}}Add Field{{< /ui >}} プロセッサは {{< ui >}}Remove Field{{< /ui >}} プロセッサの直後に配置する必要があります。

#### 例{#example}
次の {{< ui >}}Remove field{{< /ui >}} プロセッサの画像では、名前が適切でない `service` フィールドをログから削除しています。

{{< img src="observability_pipelines/guide/remap_attributes/remove_field_remap.png" alt="Remove field プロセッサで service タグを削除し、Add field プロセッサで値 payment-app を持つ service フィールドを追加" style="width:50%;" >}}

次の {{< ui >}}Add field{{< /ui >}} プロセッサの画像では、正しい値を持つ `service` フィールドを追加し直しています。

{{< img src="observability_pipelines/guide/remap_attributes/add_field_remap.png" alt="Remove field プロセッサで service タグを削除し、Add field プロセッサで値 payment-app を持つ service フィールドを追加" style="width:50%;" >}}

### 動的または手動の割り当てには Custom Processor を使用する{#use-the-custom-processor-for-dynamic-or-manual-assignments}

予約済み属性の値を書き換えるには、{{< ui >}}Custom Processor{{< /ui >}} を使用します。

#### テンプレート構文を使用して別のフィールドの値を参照し、値を動的に割り当てる{#dynamically-assign-the-value-using-template-syntax-to-reference-another-fields-value}

次の Custom Processor スクリプトは、`service` フィールドを書き換え、`app_id` の値を `service` フィールドの値に動的に割り当てます。

```
.service = {{.app_id}}
```

次の例の画像では、入力に値 `wrongstatus` を持つ `service` が表示されています。スクリプトでログを処理した後、出力には値 `streaming-service` を持つ `service` が表示されます。これは `app_id` の値です。

{{< img src="observability_pipelines/guide/remap_attributes/custom_processor_dynamically_assign.png" alt="不適切なステータス値を示す入力と正しいステータスを示す出力が表示された Custom Processor" style="width:100%;" >}}

#### 静的な名前を持つ属性の値を手動で書き換える{#manually-rewrite-the-value-of-an-attribute-with-a-static-name}

次の Custom Processor スクリプトは、`status` フィールドを静的な値 `info` に設定します。

```
.status = "info"
```

次の例の画像では、入力に値 `wrongstatus` を持つ `status` が表示されています。スクリプトでログを処理した後、出力には割り当てられた `info` を持つ `status` が表示されます。

{{< img src="observability_pipelines/guide/remap_attributes/custom_processor_statically_assign.png" alt="不適切なステータス値を示す入力と正しいステータスを示す出力が表示された Custom Processor" style="width:100%;" >}}

## Splunk HEC ソースと Datadog 送信先を使用する場合のソース属性とサービス属性の再マッピング{#remap-source-and-service-attributes-when-using-the-splunk-hec-source-and-datadog-destination}

Splunk HEC ソースと Datadog 送信先を使用している場合は、このセクションの手順に従って `source` や `service` の値を再マッピングします。これらの属性を再マッピングする場合にこの手順に従う必要があるのは、次の理由によるものです。

 - Splunk の `service` は、Datadog では `source` 属性と呼ばれます。
 - Splunk の `sourcetype` は、Datadog では `ddsource` 属性と呼ばれます。

**注**: `env` や `hostname` など、他の予約済み属性を再マッピングする場合は、[予約済み属性の値を再マッピングする](#remap-the-value-of-reserved-attributes)の手順に従ってください。

この手順は、[Custom Processor](#remap-service-and-source-attributes-using-the-custom-processor) または [Edit Fields](#remap-service-and-source-attributes-using-edit-fields) を使用して実行できます。

1. 入力ログの `service` フィールドを `source` フィールド名に再マッピングします。
1. 入力ログの `source` フィールドを `ddsource` フィールド名に再マッピングします。

### Custom Processor を使用してサービス属性とソース属性を再マッピングする{#remap-service-and-source-attributes-using-the-custom-processor}

これは Splunk HEC ソースからの入力ログの例です。

```json
{
  "service": "wrongService"
  "source": "wrongSource"
}
```

これらが Datadog に送信するログに対して正しい値であると仮定します。

```json
{
  "ddsource": "akamai",
  "source": "cdn-logs"
}

Use this Custom Processor script to remap the `service` and `source` to the correct values:

```json
  .source = "cdn-logs"
  .ddsource = "akamai"
  del(.service)
```

スクリプトでログを処理した後、出力は次のようになります。

```json
{
  "ddsource": "akamai",
  "source": "cdn-logs"
}
```

次の例の画像では、入力に値 `wrongstatus` を持つ `source` と `service` が表示されています。スクリプトでログを処理した後、正しい値が表示されます。

{{< img src="observability_pipelines/guide/remap_attributes/custom_processor_splunkhec_dd.png" alt="不適切なステータス値を示す入力と正しいステータスを示す出力が表示された Custom Processor" style="width:100%;" >}}

### Edit Fields を使用してサービス属性とソース属性を再マッピングする{#remap-service-and-source-attributes-using-edit-fields}

これは Splunk HEC ソースからの入力ログの例です。

```json
{
  "service": "wrongService"
  "source": "wrongSource"
}
```

これらが Datadog に送信するログに対して正しい値であると仮定します。

```json
{
  "ddsource": "akamai",
  "source": "cdn-logs"
}
```

`source` 属性と `service` 属性を正しい値に再マッピングするには、次の手順に従います。

1. {{< ui >}}Remove field{{< /ui >}} プロセッサを使用して、`source` フィールドを削除します。
    - `source` フィールドに {{< ui >}}Field to drop{{< /ui >}} と入力します。
    {{< img src="observability_pipelines/guide/remap_attributes/remove_field_source.png" alt="Remove field プロセッサで source フィールドを削除" style="width:50%;" >}}
1. {{< ui >}}Add field{{< /ui >}} プロセッサを使用して、値 `akamai` を持つ `ddsource` フィールドを追加します。
    - `ddsource` フィールドに {{< ui >}}Field to add{{< /ui >}} と入力します。
    - `akamai` フィールドに {{< ui >}}Value to add{{< /ui >}} と入力します。
    {{< img src="observability_pipelines/guide/remap_attributes/add_field_ddsource.png" alt="Add field プロセッサで ddsource フィールドを追加" style="width:50%;" >}}
1. {{< ui >}}Remove field{{< /ui >}} プロセッサを使用して、`service` フィールドを削除します。
    - `service` フィールドに {{< ui >}}Field to drop{{< /ui >}} と入力します。
    {{< img src="observability_pipelines/guide/remap_attributes/remove_field_service.png" alt="Remove field プロセッサで service フィールドを削除" style="width:50%;" >}}
1. {{< ui >}}Add field{{< /ui >}} プロセッサを使用して、値 `cdn-logs` を持つ `source` フィールドを追加します。
    - `source` フィールドに {{< ui >}}Field to add{{< /ui >}} と入力します。
    - `cdn-logs` フィールドに {{< ui >}}Value to add{{< /ui >}} と入力します。
    {{< img src="observability_pipelines/guide/remap_attributes/add_field_source.png" alt="Add field プロセッサで ddsource フィールドを追加" style="width:50%;" >}}


## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/log_configuration/attributes_naming_convention/#reserved-attributes