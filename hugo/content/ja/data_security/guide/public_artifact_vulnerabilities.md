---
description: Datadog の公開アーティファクトの CVE および脆弱性情報を検索します。
further_reading:
- link: https://www.datadoghq.com/blog/datadog-public-artifact-vulnerabilities-openvex/
  tag: ブログ
  text: Datadog の OpenVEX 評価を使用して CVE のノイズを削減する
title: 公開アーティファクトの脆弱性
---
[Public Artifact Vulnerabilities] (公開アーティファクトの脆弱性) ページでは、Datadog の公開アーティファクトおよびライブラリの脆弱性と対応に関する情報を確認できます。このページを使用して、以下について調べます。

- 特定のアーティファクトに影響を与える脆弱性 (イメージ/バージョン別)
- 特定の CVE の影響を受けるアーティファクト
- 各脆弱性のステータス、正当化理由、影響、およびアクションステートメント

## アクセス方法 {#how-to-access}

[Public Artifact Vulnerabilities] ページには、[{{< ui >}}Public Artifact Vulnerabilities{{< /ui >}}] の [Help] (ヘルプ) ページからアクセスできます。

## ページの使用方法 {#using-the-page}

### アーティファクトで検索 {#look-up-by-artifact}

アーティファクトビューを使用すると、特定のファミリー、イメージ、およびバージョン (例: Datadog Agent イメージバージョン 7.52.0) のすべての脆弱性を確認できます。

- [{{< ui >}}Family{{< /ui >}}] (ファミリー): [{{< ui >}}Agent platform{{< /ui >}}] (Agent プラットフォーム)、[{{< ui >}}APM library injection{{< /ui >}}] (ライブラリインジェクション)、[{{< ui >}}Private action runners{{< /ui >}}] (ランナー)、[{{< ui >}}Telemetry collectors{{< /ui >}}] (テレメトリコレクター)、[{{< ui >}}Serverless{{< /ui >}}] (サーバーレス)、[{{< ui >}}Private deployments{{< /ui >}}] (非公開デプロイ)、または [{{< ui >}}Build & CI{{< /ui >}}] (ビルドおよび CI) などのカテゴリーを選択します。選択すると、[{{< ui >}}Image{{< /ui >}}] (イメージ) ドロップダウンが絞り込まれます。
- [{{< ui >}}Image{{< /ui >}}]: 選択したファミリーからイメージを選択します。このリストは、利用可能な公開アーティファクトから作成されます。
- [{{< ui >}}Version{{< /ui >}}] (バージョン): 選択したイメージのバージョンを選択します。バージョンは新しい順に並べ替えられます。

テーブルが読み込まれ、そのイメージとバージョンに影響する脆弱性が 1 行に 1 つずつ表示されます。

<div class="alert alert-tip">現在の結果をフィルタリングするには、[{{< ui >}}Find CVE in artifacts{{< /ui >}}] (アーティファクトで CVE を検索) をクリックせずに検索ボックスにキーワードを入力します。</div>

{{< img src="data_security/public_artifact_vulnerabilities/artifact-view.png" alt="アーティファクトで検索" style="width:100%;" >}}

**テーブル列 (イメージ/バージョン別):**

| 列 | 目的 |
|--------|---------|
| [Severity] (重大度) | 脆弱性の重大度 (例: [Critical] (重大)、[High] (高)、[Medium] (中)、[Low] (低)、[Info] (情報))。|
| [Vulnerability] (脆弱性) | CVE または脆弱性の識別子と名前。|
| [Platform] (プラットフォーム) | 該当するプラットフォーム。プラットフォームの値にカーソルを合わせると、FIPS ビルドや非 FIPS ビルドなど、そのプラットフォームで対応している特定のバリアントが表示されます。|
| [Status] (ステータス) | 現在のステータス (例: [Not affected] (影響なし)、[Affected] (影響あり)、[Fixed] (修正済み)、[Under investigation] (調査中))。|
| [Additional Information] (追加情報) | CVE のステータスに関する詳細情報、および必要に応じてステータスの正当化理由。たとえば、ステータスが component_not_present の場合、この列で、その CVE がアーティファクトに影響を与えない理由とその結論に至った経緯が説明されます。[Under investigation] などの一部のステータスでは、影響が分析中であるため、追加情報は示されません。|

### CVE で検索 {#look-up-by-cve}

CVE ビューを使用して、特定の脆弱性の影響を受けるアーティファクトとバージョン、およびそれぞれのステータスを確認できます。

1. テーブル上部の検索ボックスに、1 つ以上の CVE ID を入力します (例: `CVE-2024-1234`、複数指定する場合は `CVE-2024-1234, CVE-2024-5678`)。
2. [{{< ui >}}Find CVE in artifacts{{< /ui >}}] (アーティファクトの CVE) をクリックします。

テーブルが CVE モードに切り替わり、CVE、アーティファクト、およびバージョンの組み合わせが 1 行に 1 つずつ表示されます。

<div class="alert alert-tip">現在の結果をフィルタリングするには、[{{< ui >}}Find CVE in artifacts{{< /ui >}}] をクリックせずに検索ボックスにキーワードを入力します。</div>

{{< img src="data_security/public_artifact_vulnerabilities/cve-view.png" alt="CVE で検索" style="width:100%;" >}}

**テーブル列 (CVE 別):**

| 列 | 目的 |
|--------|---------|
| [CVE] | CVE の ID。 |
| [Artifact Name] (アーティファクト名) | アーティファクトの名前 (例: agent、library name)。|
| [Version] | アーティファクトのバージョン。|
| [Platform] | 該当するプラットフォーム。プラットフォームの値にカーソルを合わせると、FIPS ビルドや非 FIPS ビルドなど、そのプラットフォームで対応している特定のバリアントが表示されます。|
| [Status] | この CVE/アーティファクト/バージョンのステータス (例: [Not affected]、[Affected]、[Fixed]、[Under investigation])。|
| [Additional Information] (追加情報) | CVE のステータスに関する詳細情報、および必要に応じてステータスの正当化理由。|


## 利用可能なアーティファクト (イメージ) {#available-artifacts-images}

[**Image**] ドロップダウンには、追跡対象の公開アーティファクトのリストからイメージが取り込まれます。[Public Artifact Vulnerabilities] には、追跡対象の公開イメージのうち、**最新の 10 バージョン**が示されます。期待されるアーティファクトが見つからない場合は、[Datadog サポート][1] にアーティファクトの追加を依頼してください。

## ページに示されるオプションとアクション {#options-and-actions-on-the-page}

| オプションまたはアクション | 説明 |
|------------------|-------------|
| [{{< ui >}}Search / global filter{{< /ui >}}] (検索/グローバルフィルター) | 任意のテキストでテーブルの行をフィルタリングします。[by image/version] (イメージ/バージョン別) モードでは、[{{< ui >}}Find CVE in artifacts{{< /ui >}}] をクリックして CVE の検索を実行する前に、同じ検索ボックスが使用されます。|
| [{{< ui >}}Find CVE in artifacts{{< /ui >}}] | 現在の検索ボックスの値を使用して CVE の検索を実行します (カンマ区切りの CVE ID がサポートされます)。CVE で検索する場合にのみ使用できます。|
| [{{< ui >}}Pagination{{< /ui >}}] (ページネーション) | 大規模な結果セットを移動する際に、テーブルのページネーションを使用します (例: 1 ページあたり 50 行)。|
| [{{< ui >}}Resizable columns{{< /ui >}}] (サイズ変更可能な列) | 読みやすくするために、列の幅を変更できます。|

[1]: /ja/help

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}