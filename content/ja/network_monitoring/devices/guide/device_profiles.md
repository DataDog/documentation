---
further_reading:
- link: /network_monitoring/devices/guide/build-ndm-profile/
  tag: ドキュメント
  text: NDM プロファイルの作成 (高度)
- link: /network_monitoring/devices/profiles
  tag: ドキュメント
  text: NDM プロファイルについてさらに詳しく
is_beta: true
site_support_id: snmp_profile_manager
title: デバイス プロファイルの利用を開始する
---

{{< callout url="https://www.datadoghq.com/product-preview/easily-onboard-and-start-monitoring-network-devices-to-datadog/" >}}
  SNMP Profile Manager は Preview 提供中です。このフォームからアクセスをリクエストしてください。
{{< /callout >}}

## 概要

デバイス プロファイルは、収集するメトリクスと、それらを Datadog メトリクスへ変換する方法を定義します。各 [プロファイル][2] は、同じベンダーの類似デバイス群を監視することを想定しています。

SNMP Profile Manager テンプレートでは、GUI ベースのガイド付き操作で次のことを行えます。
- デバイス プロファイルをスムーズに作成し、管理する。
- ネットワーク デバイスから収集するタグとメトリクスを指定する。
- 各プロファイルに一致するデバイスを確認する。
- 作成したデバイス プロファイルのスナップショットを [Inventory page](#inventory-page) で確認する。

より高度なプロファイル詳細については、[プロファイル フォーマット リファレンス][3] ページを参照してください。

## 前提条件

- 必要な Agent の最小バージョンは `7.65` 以上です。
- 組織で [Remote Configuration][14] を有効化しておいてください。
- 必要な権限は次のとおりです。
  - [NDM Device Profiles View][20]: プロファイル ページへの読み取り専用アクセスを付与します (Datadog Standard Role に含まれます)。
  - [NDM Device Profiles Edit][20]: デバイス プロファイルの編集を許可します (Datadog Admin Role に含まれます)。
- Remote Configuration を使って [作成したデバイス プロファイルを自動適用する](#apply-a-profile-to-created-devices) には、`datadog-agent/conf.d/snmp.d/conf.yaml` ファイルで次の設定を有効にしてください。

  {{< highlight yaml "hl_lines=5" >}}
    init_config:
      loader: core
      use_device_id_as_hostname: true
      min_collection_interval: 15
      use_remote_config_profiles: true

    instances:
    ......
  {{< /highlight >}}

## セットアップ

### ステップ 1: プロファイルの詳細

  1. [Infrastructure > Network Devices > Configuration][1] に移動して、独自の NDM プロファイルを作成します。
  2. **SNMP Profile Manager > + Create New Profile** をクリックします。すると、下のようなプロファイルの作成ページが表示されます。
     {{< img src="/network_device_monitoring/profile_onboarding/create_profile_3.png" alt="Network Device プロファイルの作成ページ" style="width:100%;">}}

  3. デバイス プロファイルの名前と説明 (任意) を入力します。
  4. `SysObjectID` を選択します。このパラメータで、ネットワーク デバイスをデバイス プロファイルにひも付けます。

     {{< img src="/network_device_monitoring/profile_onboarding/Sys_object_ID_Field_2.png" alt="Sys Object ID のドロップダウンを表示した Network Device プロファイルの作成ページ" style="width:60%;">}}

### ステップ 2: プロファイルの継承

プロファイルの継承を使うと、メタデータ、メトリクス、タグなどの設定を引き継げます。既存のプロファイルを土台にできるため、デバイス プロファイルを増やしていく際の手間が減ります。Datadog は、継承元としていくつかのプロファイル (`_base.yaml`、`_generic-if.yaml`、`_generic-ip.yaml`、`_generic-ospf.yaml`、`_generic-tcp.yaml`、`_generic-udp.yaml`) を自動で含めます。これらは削除しないことを推奨します。

継承プロファイルの一覧は、[サポートされているデバイス プロファイル][16] を参照してください。

1. Datadog の `_base.yaml` プロファイルは保持し、必要に応じて他の Datadog 継承プロファイルも残してください。必要であれば、追加のプロファイルを選んで継承させることもできます。選択した内容に応じて、右側の Inherited Profiles の下に関連フィールドが表示されます。継承されたメトリクス、タグ、メタデータには `Inherited` タグが付きます。

   {{< img src="/network_device_monitoring/profile_onboarding/profile_inheritance.png" alt="プロファイルの継承セクションを表示した Network Device プロファイルの作成ページ" style="width:100%;">}}

    **注**: 親プロファイルで行った変更は、自動的に子プロファイルに反映されます。子プロファイル側で継承した属性 (メトリクス、タグ、メタデータなど) を調整したい場合は、親プロファイルを変更してください。

### ステップ 3: 参照デバイスを選択

参照デバイスを使い、選択したデバイス モデルについて {{< tooltip text="OIDs (Object Identifiers)" tooltip="デバイス上の一意の ID またはアドレスです。ポーリングすると、その値に対応する応答コードが返ります。" >}} を収集する対象デバイスを選択します。**reference devices** フィールドは、[プロファイル詳細](#step-1-profile-details) で指定した `SysObjectID` をもとに事前選択されます。

1. デバイス スキャンを実行する場合は、現在の参照デバイスの選択をそのまま使用できます。必要に応じて、デバイスを追加したり、選択を変更したりすることも可能です。

2. **Scan Devices** をクリックしてステップ 4 に進むと、スキャンが開始されます。

3. スキャンを行わずに進める場合は、**Proceed Manually** をクリックしてください。

  {{< img src="/network_device_monitoring/profile_onboarding/reference_devices.png" alt="参照デバイス セクションを表示した Network Device プロファイルの作成ページ" style="width:100%;">}}

### ステップ 4: 参照デバイスをスキャン

このステップでは、デバイスをスキャンして利用可能なメトリクスを検出します。スキャンを実行すると、デバイスで利用できるメトリクスを一覧で確認でき、メトリクス、メタデータ、タグの入力がしやすくなります。スキャンでは、[Datadog Remote Configuration][14] を用いてデバイスに対して SNMP walk を実行します。

**Scanned Devices** タブには、Remote Configuration または手動でスキャンしたデバイスが表示されます。

  {{< img src="/network_device_monitoring/profile_onboarding/scan_reference_devices_2.png" alt="参照デバイスのスキャン セクションを表示した Network Device プロファイルの作成ページ" style="width:80%;">}}

### ステップ 5: メタデータを定義

Datadog は、多くのデバイスに対して、標準 (OOTB) プロファイルでデバイス名や説明などの妥当なデフォルト値を提供します。これらのデフォルト値は、**Define Metadata** セクションで上書きできます。

  {{< img src="/network_device_monitoring/profile_onboarding/define_metadata_2.png" alt="メタデータ定義セクションを表示した Network Device プロファイルの作成ページ" style="width:80%;">}}

  1. 鉛筆アイコンをクリックして、デフォルトのメタデータ フィールドを編集・変更します。

  2. メタデータは、[Network Device Monitoring (NDM)][15] ページでは検索可能なファセットとして、またデバイスを選択した際のサイド パネルにも表示されます。

     {{< img src="/network_device_monitoring/profile_onboarding/device_metadata_2.png" alt="NDM のサイド パネル (メタデータ セクションを強調表示)" style="width:100%;">}}

### ステップ 6: メトリクスを定義

メトリクスは、デバイス スキャンから追加するか、プロファイル用に新しいメトリクスを手動で作成して追加できます。継承されたメトリクスは、`Inherited` タグ付きで紫色にハイライトされます。

{{< tabs >}}
{{% tab "デバイス スキャン (推奨)" %}}

1. **Device Scan** オプションでメトリクスを定義するには、**Add Metrics** をクリックします。デバイスで利用可能なメトリクスが一覧表示されるモーダルが開きます。
2. メトリクスにカーソルを合わせると、単位や説明が表示され、選びやすくなります。
3. 追加したいメトリクスを選択し、**Add Metric** をクリックします。
4. Define metrics 画面に戻り、追加された新しいメトリクスを確認できます。

   {{< img src="/network_device_monitoring/profile_onboarding/define_metrics_2.mp4" alt="Add Metrics のモーダルでメトリクスを追加し、Define metrics ステップへ戻る様子 (動画)" video=true >}}

{{% /tab %}}

{{% tab "手動" %}}

1. **Manual** オプションでメトリクスを定義するには、**Add Metrics** をクリックします。デバイスで利用可能なメトリクスが一覧表示されるモーダルが開きます。
2. モーダル上部の **Create New Metric** をクリックします。
3. OID (Scalar または Tabular) を指定します。
4. 検索フィールドのドロップダウンをクリックして、OID 名を追加します。検索バーにはオートコンプリート機能があり、入力内容に一致する OID を候補として表示します。名前または OID を手入力することもできます。
5. メトリクス タイプ、スケール ファクター、抽出値 (regex パターン) を選択します。
詳しくは、[スカラー メトリクスの高度なオプション](?tab=manual#scalar-metrics) と [Tabular メトリクスの高度なオプション](?tab=manual#tabular-metrics) を参照してください。
6. **Create** をクリックしてメトリクスを保存します。
7. Define metrics 画面に戻り、追加された新しいメトリクスを確認できます。

**注**: Tabular メトリクスでバリデーション エラーを避けるため、Define metrics 画面で少なくとも 1 つのメトリクス タグを追加してください。

{{< img src="/network_device_monitoring/profile_onboarding/add_metrics_manually.mp4" alt="Add Metrics のモーダルで手動作成によりメトリクスを追加し、Define metrics ステップへ戻る様子 (動画)" video=true >}}

{{% collapse-content title="スカラーの高度なオプション" level="h4" expanded=false %}}

#### スカラー メトリクス

[Metric Type][11]
: `gauge`、`rate`、`monotonic_count`、`monotonic_count_and_rate` のいずれかです。

[Scale Factor][12]
: Datadog に送信する前に、抽出した値にこの係数を乗算します。

[Extract Value][7]
: グローバル タグの [高度なオプション](?tab=manual#global-tags) と同じです。

[7]: https://datadoghq.dev/integrations-core/tutorials/snmp/profile-format/#extract_value
[11]: https://datadoghq.dev/integrations-core/tutorials/snmp/profile-format/#forced-metric-types
[12]: https://datadoghq.dev/integrations-core/tutorials/snmp/profile-format/#scale_factor

{{% /collapse-content %}}

{{% collapse-content title="Tabular メトリクスの高度なオプション" level="h4" expanded=false %}}

#### Tabular メトリクス

Tabular メトリクスへのタグ追加は、[グローバル タグ](#step-7-global-tags) の追加とほぼ同じですが、次の 2 点が追加されます:

1. タグ値の取得元として、`OID` の値かテーブル インデックスの一部を選択します。取得元に `Index` を選んだ場合はインデックス位置を指定し、その要素がタグになります。

    <details>
      <summary><b>Example of using an Index position</b></summary></br>

      Consider a table at `OID 1.2.3.1.1` with two indices. Each row in this table includes a two-number index. Suppose column 3 of a row has `OID 1.2.3.1.1.3.55.12` - here, `1.2.3.1.1` represents the table, `.3` is the column number within the table, and `.55.12` is the index of this specific row (all other columns for this row will also end with `.55.12`). If you establish a tag with the Source set to `Index` and `Index Position` set to 1, the tag's value for metrics from this table row will be `55`; if you set the index position to 2, it will be 12. If you use an index less than 1 or more than the number of indices in the table, the tag will not be populated. 

      See [Using an Index][9] for more information.

    </details>

2. このテーブルのインデックスの一部を使う _別_ のテーブルから取得した値で、表のメトリクス値にタグを付けたい場合は Index Transformation を使用します。これは **一般的なケースではありません**。開始番号と終了番号を持つ変換セグメントを 1 つ以上追加して設定します。これらの番号は元のテーブル インデックスを参照し、新しいテーブル用の新しいインデックス値を作成します。

    <details>
      <summary><b>Example of using Index Transformation</b></summary></br>

      Consider the `CPI-UNITY-MIB` module. It has a `table`, `cpiPduTable`, with details about a specific PDU, and another table, `cpiPduBranchTable`, with information about specific PDU branches. The index of the main table is the PDU's MAC address, such as `6.0.36.155.53.3.246`. The branch table's index is a `branch ID` followed by the `PDU MAC`, therefore a branch table row index might be `1.6.0.36.155.53.3.246`. 
      If you want to report the current on a PDU branch, you could add `cpiPduBranchCurrent` (`OID 1.3.6.1.4.1.30932.1.10.1.3.110.1.3`, from the branch table) as a tabular metric. To tag this metric with the PDU name, add `cpiPduName` as a tag (`OID 1.3.6.1.4.1.30932.1.10.1.2.10.1.3`, from the main table), then add an index transform with `start:1` and `end:7`. This means the branch current metric from the branch table indexed with `1.6.0.36.155.53.3.246` would be tagged using the name from the main table indexed with `6.0.36.155.53.3.246`. 

      For more information see [Using a column from a different table with different indexes][10].

    </details>

[9]: https://datadoghq.dev/integrations-core/tutorials/snmp/profile-format/#using-an-index
[10]: https://datadoghq.dev/integrations-core/tutorials/snmp/profile-format/#using-a-column-from-a-different-table-with-different-indexes 

{{% /collapse-content %}}

{{% /tab %}}
{{< /tabs >}}

### ステップ 7: グローバル タグ

一致するすべてのデバイスにメタデータ、メトリクス、グローバル タグを適用するため、グローバル タグを追加します。グローバル タグは、デバイス スキャンから追加するか、プロファイル用に新しいタグを手動で作成して追加できます。また、このプロファイルから継承されたグローバル タグには `Inherited` タグが表示されます。

{{< tabs >}}
{{% tab "デバイス スキャン (推奨)" %}}

1. **Device Scan** オプションでグローバル タグを定義するには、**+ Add Tags** をクリックします。すると、デバイスで利用可能なタグが一覧表示されるモーダルが開きます。
2. デバイス プロファイルに追加したいタグを 1 つ以上選択し、**Add Tag** をクリックします。
3. Define global tags 画面に戻り、追加された新しいタグを確認して編集できます。

   {{< img src="/network_device_monitoring/profile_onboarding/add_global_tag.mp4" alt="グローバル タグの追加モーダルで新しいタグを追加し、グローバル タグ ステップに戻る様子 (動画)" video=true >}}

{{% /tab %}}

{{% tab "Manual" %}}

1. **Manual** オプションでグローバル タグを定義するには、**+ Add Tags** をクリックします。すると、デバイスで利用可能なタグが一覧表示されるモーダルが開きます。
2. モーダル上部の **Create New Tag** をクリックします。
3. 検索フィールドのドロップダウンを選択して OID 名を追加します。
4. **Modification** のドロップダウンをクリックして変更ルールを追加します。詳しくは [高度なオプション](?tab=manual#global-tags) を参照してください。
5. **Create** をクリックして新しいタグを保存します。
6. Define global tags 画面に戻り、追加された新しいタグを確認できます。

   {{< img src="/network_device_monitoring/profile_onboarding/add_global_tags_manual.mp4" alt="グローバル タグの追加モーダルで手動方式により新しいタグを追加し、グローバル タグ ステップに戻る様子 (動画)" video=true >}}

{{% collapse-content title="高度なオプション" level="h4" expanded=false %}}

#### グローバル タグ:

| Modification    | Description                                                                                         |
|-----------------|-----------------------------------------------------------------------------------------------------|
| No Modification | デバイスから返された値を、そのままタグ値として使用します。                                 |
| Format          | [mac_address][5] または [ip_address][6] を指定できます。                                                    |
| Extract Value   | デバイスが返す SNMP 値からタグ値を [抽出][7] するための正規表現です。 |
| Mapping         | [プロファイル フォーマット リファレンス][8] を参照してください。

[5]: https://datadoghq.dev/integrations-core/tutorials/snmp/profile-format/#format-mac_address
[6]: https://datadoghq.dev/integrations-core/tutorials/snmp/profile-format/#format-ip_address
[7]: https://datadoghq.dev/integrations-core/tutorials/snmp/profile-format/#extract_value
[8]: https://datadoghq.dev/integrations-core/tutorials/snmp/profile-format/#mapping-index-to-tag-string-value

{{% /collapse-content %}}

{{% /tab %}}
{{< /tabs >}}

### 作成したデバイスにプロファイルを適用する

{{< tabs >}}
{{% tab "自動 (推奨)" %}}

デバイス プロファイルに設定オプションを適用したら、**Save and Sync Agents** をクリックして、このプロファイルをすべての NDM Agent に自動適用します。設定は [Remote Configuration][14] によりデバイスへ反映されます。詳細は [前提条件](#prerequisites) を参照してください。

{{< img src="/network_device_monitoring/profile_onboarding/save_sync_agents.png" alt="Save and Sync Agents を実行する最終ステップを示した Network Device プロファイル ページ" style="width:100%;">}}

[14]: /ja/agent/remote_config

{{% /tab %}}

{{% tab "Manual" %}}

1. プロファイルをドラフトとして保存したら、[プロファイル ホーム ページ][4] に戻り、**Download All Profiles** を選択します。すると、作成したプロファイルの `yaml` ファイルを含む `.zip` バンドルをダウンロードできます。
2. 該当する Agent がインストールされている各環境で、`yaml` ファイルを [プロファイル ディレクトリ][13] に配置します。
3. Datadog Agent を再起動します。
4. 作成したプロファイルが正しいことを確認するため、NDM が一致したデバイスから期待どおりにメトリクスを受信していることを確認してください。

{{< img src="/network_device_monitoring/profile_onboarding/profile_download_2.png" alt="Download All Profiles オプションを強調表示した Network Device プロファイル メイン ページ" style="width:100%;">}}

[4]: https://app.datadoghq.com/devices/profiles
[13]: https://github.com/DataDog/integrations-core/tree/master/snmp/datadog_checks/snmp/data/profiles

{{% /tab %}}
{{< /tabs >}}

## Inventory page

[Infrastructure > Network Devices > Configuration][1] に移動すると、デバイス プロファイルの [Inventory][1] ページを表示できます。ここでは、標準 (OOTB) プロファイルの概要に加え、上記の [デバイス プロファイル セットアップ](#setup) で作成したデバイス プロファイルも確認できます。

  {{< img src="/network_device_monitoring/profile_onboarding/device_inventory_page_2.png" alt="Network Device プロファイルの Inventory ページ" style="width:100%;">}}

このページには、次の機能があります:

- **Draft status**: まだ Agent に適用されていない新規プロファイルであることを示します。プロファイルを Agent に適用するには、プロファイルを開いて Agent を同期してください。
いったんプロファイルを適用すると、ドラフト状態には戻せません。

  {{< img src="/network_device_monitoring/profile_onboarding/device_status.png" alt="ドラフト状態のステータスを表示したデバイス プロファイルのスクリーンショット" style="width:50%;">}}

- **Filters**: フィルターには次のオプションがあります:
  - Custom Profiles - ユーザーが作成したデバイス プロファイル。
  - Created by Datadog - Datadog の標準 (OOTB) プロファイル。閲覧でき、独自のカスタム プロファイルを作る際のベースとして利用できます。
  - Draft Profiles - ドラフト モードのデバイス プロファイル。

  {{< img src="/network_device_monitoring/profile_onboarding/device_filters.png" alt="フィルター オプションを表示したデバイス プロファイルの Inventory ページのスクリーンショット" style="width:60%;">}}

- **Create new profile and Download**: **+ Create New Profile** ボタンをクリックするとプロファイル作成フォームが開き、[新しいデバイス プロファイルを作成](#build-device-profiles) できます。download ボタンをクリックすると、作成したプロファイルの `yaml` ファイルを含む `.zip` バンドルを生成してダウンロードします。 <br></br>

  {{< img src="/network_device_monitoring/profile_onboarding/create_profile_download.png" alt="download ボタンと新規プロファイル作成ボタンを表示したデバイス プロファイルの Inventory ページのスクリーンショット" style="width:50%;">}}

- **Kebab menu**: プロファイル右側のケバブ メニューをクリックすると (カスタム プロファイルのみ)、プロファイルを編集、複製、削除できます。さらに、NDM ページの **View related devices** に移動し、プロファイルが適用されているデバイスでフィルタした状態で表示することもできます。<br></br>

  {{< img src="/network_device_monitoring/profile_onboarding/device_kebab_menu.png" alt="右側に Kebab menu を表示したデバイス プロファイルの Inventory ページのスクリーンショット" style="width:40%;">}}

## トラブルシューティング

### プロファイルとは？
* プロファイルは、デバイスから収集するメタデータ、メトリクス、タグを定義する設定ファイルです。詳細は [メタデータ定義][17] を参照してください。

### デバイス スキャンとは？
* デバイス スキャンは、デバイスに対して SNMP walk を完全に実行し、利用可能なデータをすべて収集して Datadog に転送し、UI に表示できるようにします。このプロセスにより、デバイスで利用できる OID を把握し、監視のためにプロファイルへ追加しやすくなります。

### 一致するデバイスが見つからないのはなぜですか？
一致するデバイスが見つからない場合、次の理由が考えられます:
  * **プロファイルがドラフト モードになっている**:
    * ドラフト プロファイルは Agent に適用されません。プロファイルでデバイスの監視を開始するには、Agent に同期する必要があります。これは、プロファイルを開き、[**Save & Sync Agents**](#apply-a-profile-to-created-devices) ボタンをクリックすることで実行できます。
  * **プロファイルは適用されているが、どのデバイスにも一致していない**:
    * プロファイルは SysObjectID を使ってデバイスとマッチングされます。プロファイルに指定した SysObjectID が、監視対象デバイスのうち 1 台以上と一致していることを確認してください。
  * **複数のプロファイルが同じ SysObjectID を持っている**:
    * プロファイルは SysObjectID を使ってデバイスとマッチングされます。複数のプロファイルが同じ SysObjectID を共有していると、Agent レベルでマッチングの競合が発生する可能性があります。各 [SysObjectID](#step-1-profile-details) を 1 つのプロファイルにのみ割り当てるようにしてください。

### デバイスがスキャンされないのはなぜですか？

* デバイス スキャンの完了には最大 10 分かかることがあります。進行状況は UI 上で確認できます。エラーが発生する場合は、スキャンを再実行するか、別の [参照デバイス](#step-3-select-reference-devices) を選択してみてください。

### コレクターで Remote Configuration を有効化していない場合はどうなりますか？

* Agent バージョンが `7.47.0` より前で、ホスト上で [Remote Configuration][18] をまだ手動で有効化していない場合、UI からデバイス スキャンをトリガーしたり、プロファイルを Agent に同期したりできません。ただし、これらの作業は手動で実施できます。 <br /><br>

   デバイスをスキャンするには、UI の案内に従ってください: <br /><br>

   {{< img src="/network_device_monitoring/profile_onboarding/remote_configuration.png" alt="スクリーンショット" style="width:80%;">}}

   または、プロファイルを Agent に手動で適用するには:

     1. プロファイルを保存します。
     2. download ボタンをクリックして、すべてのプロファイルをまとめた zip ファイルを保存します。
     3. [作成したデバイスにプロファイルを手動で適用する][19] セクションの手順に従い、zip ファイルを Agent にアップロードします。

Datadog では、Remote Configuration を有効化することを強く推奨します。これにより UI ベースでスムーズに操作でき、Agent との不要なやり取りも最小限に抑えられます。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/devices/profiles
[2]: /ja/network_monitoring/devices/profiles/
[3]: https://datadoghq.dev/integrations-core/tutorials/snmp/profile-format/
[14]: /ja/agent/remote_config
[15]: https://app.datadoghq.com/devices
[16]: /ja/network_monitoring/devices/supported_devices/
[17]: /ja/network_monitoring/devices/profiles/#metadata-definition-by-profile
[18]: /ja/agent/remote_config/?tab=configurationyamlfile&site=us#setup
[19]: /ja/network_monitoring/devices/guide/device_profiles/?tab=manual#apply-a-profile-to-created-devices
[20]: https://docs.datadoghq.com/ja/account_management/rbac/permissions/#network-device-monitoring