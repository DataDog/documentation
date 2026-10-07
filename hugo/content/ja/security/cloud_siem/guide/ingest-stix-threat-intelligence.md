---
description: 独自の脅威インテリジェンスを STIX 2.1 バンドルとして Cloud SIEM に送信します。取り込みエンドポイント、認証、サポートされているインジケータータイプとパターン、Datadog
  が各インジケータータイプに対して生成するリファレンステーブル、およびそれらの構成方法や削除方法について説明します。
disable_toc: false
further_reading:
- link: /security/cloud_siem/ingest_and_enrich/threat_intelligence/
  tag: ドキュメント
  text: 独自の脅威インテリジェンスを Cloud SIEM に送信する
- link: /security/threat_intelligence/
  tag: ドキュメント
  text: Datadog Security における脅威インテリジェンス
- link: /security/cloud_siem/triage_and_investigate/ioc_explorer/
  tag: ドキュメント
  text: IOC エクスプローラーを使用してインジケーターを調査する
- link: /reference_tables/
  tag: ドキュメント
  text: リファレンステーブルを作成および管理する
title: STIX 脅威インテリジェンスを取り込む
---
## 概要 {#overview}

組織が脅威インテリジェンスプラットフォーム (TIP) で脅威インテリジェンスを管理している場合は、それを [STIX 2.1][1] バンドルとして Cloud SIEM に送信できます。Cloud SIEM は、取り込まれたインジケーターを使用して [ログを強化][2] し、[IOC エクスプローラー][3] に表示します。

プラットフォームがすでに STIX を生成している場合や、スクリプトまたはスケジュールされたジョブで増分更新をプッシュしたい場合は、STIX インジェストを使用します。インジケーターを CSV ファイルとしてアップロードするか、クラウドストレージから同期する場合は、[独自の脅威インテリジェンスを Cloud SIEM に送信する][2] を参照してください。

## 仕組み {#how-it-works}

STIX 2.1 バンドルを[取り込みエンドポイント](#send-indicators)に送信すると、Datadog はそれを次のように処理します。Datadog での事前構成は不要です。

1. Datadog は、必須の `ti_vendor` ヘッダーからフィードを識別します。
2. Datadog は、フィード内のインジケータータイプごとに 1 つの [リファレンステーブル][4] を生成します。`threat_intel_stix_<TI_VENDOR>_<INDICATOR_TYPE>` という名前です。1 つのバンドルに複数のインジケータータイプを含めることができるため、1 回のリクエストで複数のテーブルにデータを入力できます。
3. Datadog は生成された各テーブルを登録し、Cloud SIEM のリッチ化のために自動的に有効化します。
4. 同じ `ti_vendor` に対するその後のリクエストは、既存のテーブルを更新し、行った設定の選択を保持します。

例えば、IP アドレス、ドメイン、SHA-256 インジケーターを含む `ti_vendor: acme` で送信されたフィードは、次のテーブルを生成します。

| インジケータータイプ | 生成されたリファレンステーブル |
|---|---|
| IP アドレス | `threat_intel_stix_acme_ip_address` |
| ドメイン | `threat_intel_stix_acme_domain` |
| SHA-256 ファイルハッシュ | `threat_intel_stix_acme_sha256` |

テーブルは、最初のリクエストから数分後に利用可能になります。リッチ化は、テーブルが有効になった後に Cloud SIEM が受信したログに適用されるため、それ以前に受信したログには適用されません。

## 前提条件 {#prerequisites}

- 組織で Cloud SIEM が有効になっている。
- Datadog [API キー][5] および [アプリケーションキー][6]。アプリケーションキーには、リファレンステーブル書き込み権限が必要です。

## インジケーターを送信する {#send-indicators}

`POST https://api.{{< region-param key="dd_site" >}}/api/v2/security/threat-intel/stix`

<div class="alert alert-info">エンドポイント URL はサイトによって異なります。組織に適した Datadog サイトを使用します。</div>

### ヘッダー {#headers}

| ヘッダー | 必須 | 説明 |
|---|---|---|
| `DD-API-KEY` | Yes | Datadog API キー。|
| `DD-APPLICATION-KEY` | Yes | リファレンステーブル書き込み権限があるアプリケーションキー。|
| `ti_vendor` | Yes | フィードを識別します。例: プラットフォーム名。10 文字以内で、小文字と数字のみを使用してください。|
| `Content-Type` | Yes | `application/json` |
| `Content-Encoding` | No | 圧縮されたボディを送信するには `gzip` に設定します。他のエンコーディングはサポートされていません。|

### リクエスト本文 {#request-body}

本文は、STIX オブジェクトの STIX 2.1 `bundle` です。各リクエストは増分バッチであり、バンドルには異なるタイプのインジケーターを混在させることができます。

```json
{
  "type": "bundle",
  "id": "bundle--0cde353c-ea5b-4668-9f68-9c3a0e2a0a0e",
  "objects": [
    {
      "type": "indicator",
      "spec_version": "2.1",
      "id": "indicator--a932fcc6-e032-476c-826f-cb970a5a1fff",
      "pattern_type": "stix",
      "pattern": "[ipv4-addr:value = '198.51.100.1']",
      "indicator_types": ["malicious-activity"],
      "valid_from": "2026-01-01T00:00:00Z",
      "valid_until": "2026-12-31T00:00:00Z"
    }
  ]
}
```

エンドポイントには、以下の要件と制限があります。

- バンドルは STIX 2.1 でなければなりません。バンドルに `spec_version` 以外の `2.1` が含まれている場合、Datadog はリクエストを拒否します。個々のオブジェクトに `spec_version` 以外の `2.1` が含まれている場合、Datadog はそのオブジェクトをスキップします。
- リクエスト本文の最大サイズは 50MB です。

### サポートされているインジケータータイプとパターン {#supported-indicator-types-and-patterns}

Datadog は、各インジケーターの STIX `pattern` を読み取って、そのタイプと値を識別します。Cloud SIEM は、IP アドレス (IPv4 および IPv6)、ドメイン、SHA-256 ファイルハッシュを取り込みます。

Datadog は、`=` および `IN` の比較から正確な値を抽出します。また、`OR` 式も受け入れ、各値を個別のインジケーターとしてインポートします。括弧で囲まれた式間の `AND` はサポートされていません。

```json
"pattern": "[ipv4-addr:value = '198.51.100.1'] OR [domain-name:value IN ('example.com', 'example.net')]"
```

否定、範囲、ワイルドカードマッチング、正規表現マッチング、サブネット関係、存在チェック、時間修飾子、または `FOLLOWEDBY` を使用するパターンはサポートされていません。パターンのいずれかの部分でサポートされていない式が使用されている場合、Datadog はそのインジケーターオブジェクトをスキップします。

レスポンスでは、サポートされていないオブジェクトは `unsupported` として、解析できないパターンは `invalid` としてカウントされます。これらのカウントをチェックして、フィードに取り込まれた数をチェックします。

### STIX フィールドがリファレンステーブルの列にマッピングされる方法 {#how-stix-fields-map-to-reference-table-columns}

| リファレンステーブルの列 | 入力元 |
|---|---|
| インジケーター値 | インジケーターの `pattern` から抽出された値。|
| `intention` |  `indicator_types` フィールド。`malicious-activity` は `malicious` にマップされ、`benign` は `benign` にマップされます。その他の値やフィールドが存在しない場合は `suspicious` にマップされます。|
| `source` |  `ti_vendor` ヘッダー。`{"name": "<TI_VENDOR>"}` として保存されます。|
| `category` | `custom` に設定します。|
| `additional_data` | 専用の列がない STIX フィールド。`stix_id`、`created`、`modified`、`valid_from`、`confidence`、`labels`、`indicator_types`、`object_marking_refs`、`kill_chain_phases`、および `external_references` が含まれます。|

オプションの `valid_until` フィールドはインジケーターの有効期限を設定し、Datadog はその時間が経過するとインジケーターを削除します。`valid_until` なしで送信されたインジケーターは、自動で期限が切れることはありません。

### インジケーターの更新と取り消し {#update-and-revoke-indicators}

- インジケーターの詳細を更新するには、更新されたフィールドでインジケーターを再度送信します。Datadog は、そのインジケーター値の既存の行を上書きします。
- インジケーターを削除するには、`"revoked": true` で送信します。Datadog はリファレンステーブルからインジケーターを削除します。

同じバンドルを複数回送信しても、重複する行は作成されません。

### 応答 {#response}

リクエストが成功すると、`200 OK` および Datadog がバンドルをどのように処理したかの概要が返されます。

```json
{
  "data": {
    "type": "threat-intel-stix-ingest",
    "id": "acme",
    "attributes": {
      "accepted": 3,
      "unsupported": 1,
      "invalid": 0
    }
  }
}
```

| 属性 | 説明 |
|---|---|
| `accepted` | Datadog が処理のために受け入れた、サポートされているインジケーターオブジェクトの数。このカウントには、新しいインジケーター、更新、取り消しが含まれます。パターンで `IN` または `OR` を使用する場合、1 つのオブジェクトから複数のインジケーターが生成されることがあります。|
| `unsupported` | Datadog が、タイプ、パターン、またはオブジェクトレベルの STIX バージョンをサポートしていないためにスキップしたインジケーターオブジェクトの数。|
| `invalid` | Datadog がパターンを解析できなかったインジケーターオブジェクトの数。|

`200` レスポンスは、Datadog がバンドルを受け入れたことを意味します。サポートされていないインジケーターや無効なインジケーターは、リクエストの失敗ではなく、これらのカウントに表示されます。カウントをチェックして、フィードが期待どおりに取り込まれたことを確認します。

### リクエスト例 {#example-request}

```shell
curl -X POST "https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/security/threat-intel/stix" \
  --header "DD-API-KEY: <DATADOG_API_KEY>" \
  --header "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" \
  --header "Content-Type: application/json" \
  --header "ti_vendor: acme" \
  --data '{
    "type": "bundle",
    "id": "bundle--0cde353c-ea5b-4668-9f68-9c3a0e2a0a0e",
    "objects": [
      {
        "type": "indicator",
        "spec_version": "2.1",
        "id": "indicator--a932fcc6-e032-476c-826f-cb970a5a1fff",
        "pattern_type": "stix",
        "pattern": "[ipv4-addr:value = '198.51.100.1']",
        "indicator_types": ["malicious-activity"],
        "valid_from": "2026-01-01T00:00:00Z"
      }
    ]
  }'
```

大規模なフィードをより効率的に送信するには、本文を圧縮して `Content-Encoding: gzip` を設定します。

### レート制限 {#rate-limits}

このエンドポイントは、API キーごとに 1 秒あたり 10 件のリクエストを受け付けます。その制限を超えるリクエストは `429 Too Many Requests` レスポンスを受け取ります。

### エラーレスポンス {#error-responses}

| ステータス | 理由 |
|---|---|
| `400 Bad Request` | 本文が有効な JSON ではない、バンドルに `spec_version` 以外の `2.1` が含まれている、`ti_vendor` ヘッダーが欠落しているか無効である、または `Content-Encoding` がサポートされていません。|
| `401 Unauthorized` | リクエストに有効な認証情報が含まれていません。|
| `403 Forbidden` | アプリケーションキーにリファレンステーブル書き込み権限がありません。|
| `413 Request Entity Too Large` | リクエスト本文が 50MB を超えています。|
| `429 Too Many Requests` | リクエストが API キーのレート制限を超えました。|

## 生成されたリファレンステーブルを構成する {#configure-the-generated-reference-tables}

取り込みによって生成されるテーブルは、[脅威インテリジェンス][7] 構成ページで管理します。各テーブルには、Cloud SIEM がログの強化にそのテーブルを使用するかどうかを制御するトグルがあります。そのページを使用して、アクティブなフィードの確認、フィードの一時的な無効化、または取り込みによって無効のままにされたテーブルの有効化を行います。

リッチ化設定は取り込みよりも優先されます。テーブルが存在した後は、その後のリクエストでインジケーターの追加や更新が行われますが、リッチ化の切り替えは行われません。無効にしたテーブルは、再度有効にするまで無効のままです。

STIX 取り込みは、生成されたテーブル内の行を管理します。それらの行への手動の変更は保持されず、その後の取り込みリクエストによって上書きされます。インジケーターを追加、更新、または削除するには、STIX 取り込みエンドポイントを通じて変更を送信します。

取り込まれたインジケーターを調査するには、[リファレンステーブル][8] からテーブルを開くか、[IOC エクスプローラー][3] でインジケーターを検索します。

### リファレンステーブルの制限に達した場合 {#if-you-reach-the-reference-table-limit}

Cloud SIEM は、一度に最大 10 個の脅威インテリジェンステーブルを使用してログを強化します。組織がすでにその制限に達している状態で取り込みがテーブルを生成した場合でも、Datadog はテーブルを作成し、データを入力します。そのテーブルは自動的にリッチ化のために有効化されることはなく、[脅威インテリジェンス][7] ページに無効状態で表示されます。

そのようなテーブルを有効にするには、[脅威インテリジェンス][7] ページで不要になったテーブルを無効にしてから、新しいテーブルを有効にします。

## フィードの取り込みを停止する {#stop-ingesting-a-feed}

リクエストによって取り込みが実行されるため、フィードを削除するには、次の順序で 2 つのステップを実行する必要があります。

1. その `ti_vendor` のバンドルの送信を停止します。
2. Datadog がフィード用に生成したテーブルを [リファレンステーブル][8] から削除します。

この順序でステップを完了してください。同じ `ti_vendor` に対するリクエストがまだ届いている間にテーブルを削除すると、次のリクエストによってテーブルが再生成されます。

何も削除せずにログの強化を停止するには、代わりに [脅威インテリジェンス][7] ページでテーブルを無効にします。これにより、取り込まれたインジケーターを IOC エクスプローラーで利用可能な状態に保ち、後でリッチ化を再開できるようになります。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.oasis-open.org/cti/stix/v2.1/os/stix-v2.1-os.html
[2]: /ja/security/cloud_siem/ingest_and_enrich/threat_intelligence/
[3]: /ja/security/cloud_siem/triage_and_investigate/ioc_explorer/
[4]: /ja/reference_tables/
[5]: /ja/account_management/api-app-keys/#api-keys
[6]: /ja/account_management/api-app-keys/#application-keys
[7]: https://app.datadoghq.com/security/configuration/threat-intel
[8]: https://app.datadoghq.com/reference-tables