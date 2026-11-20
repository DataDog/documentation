---
aliases:
- /ja/network_monitoring/devices/guide/device_profiles/
further_reading:
- link: /network_monitoring/devices/profiles/build-ndm-profile/
  tag: ドキュメント
  text: NDM プロファイルの構築 (高度)
- link: /network_monitoring/devices/profiles
  tag: ドキュメント
  text: NDM プロファイルの詳細
site_support_id: snmp_profile_manager
title: デバイスプロファイルの概要
---
## 概要 {#overview}

デバイスプロファイルは、Datadog がネットワークデバイスのグループに対して収集する SNMP メトリクスを定義します。SNMP Profile Manager は、それらのメトリクスを有効化および管理するためのガイド付きエクスペリエンスを提供します。単一のデバイスから始めると、次のことが可能です。

- 利用可能なメトリクスをカテゴリー別に参照し、ワンクリックで有効にします。
- プロファイルでカバーされるデバイスを管理し、利用可能なメトリクスを有効または無効にします。
- AI ガイド付きのバルクメトリクス推奨事項にはメトリクスパックを使用します。
- 組み込みの監査ビューと Agent ヘルスチェックを使用して、プロファイルの変更を直接 Agent に保存およびデプロイします。

高度なプロファイル設定については、[NDM プロファイルを構築する][3]を参照してください。

## 前提条件 {#prerequisites}

- Agent バージョン `7.77.0` 以降。
- [Remote Configuration][14] が組織で有効になっていること。
- 必要な権限:
  - [NDM Device Profiles View][20]: プロファイルページを表示するための読み取り専用アクセスを提供します。(Datadog 標準ロールに含まれています)。
  - [NDM Device Profiles Edit][20]: デバイスプロファイルの編集を許可します。(Datadog 管理者ロールに含まれています)。

## セットアップ {#setup}

1. `datadog.yaml` で `network_devices.default_scan.enabled: true` を設定して、デバイススキャンを有効にします。

   ```yaml
   network_devices:
       default_scan:
         enabled: true
   ```

2. 構成で `use_remote_config_profiles: true` を設定します。

   SNMP Autodiscovery の場合は、`network_devices.autodiscovery` の下の `datadog.yaml` ファイルに以下を追加します。

    ```yaml
    network_devices:
        autodiscovery:
          use_remote_config_profiles: true
    ```

   手動 SNMP チェックの場合、`init_config` の下の `conf.d/snmp.d/conf.yaml` ファイルに以下を追加します。

    ```yaml
    init_config:
      use_remote_config_profiles: true
    ```

  **注**: EXOS 33.1.1 デバイスでは、ファームウェアのバグにより、デバイススキャンが有効になっているとクラッシュする可能性があります。回避策として、デバイススキャンをグローバルに無効にするか (`network_devices.default_scan.enabled: false`)、デバイスのファームウェアをアップグレードしてください。この問題の影響を受けている場合は、[Datadog サポート][21]までお問い合わせください。

3. Agent にカスタムプロファイルがある場合は、[カスタムプロファイルをアップロードする](#upload-custom-profiles)手順に従って、UI にアップロードしてください。

## メトリクスを構成する {#configure-metrics}

SNMP Profile Manager の推奨エントリーポイントは、NDM 内の SNMP デバイスによるものです。各 SNMP デバイスは、カスタムプロファイルまたは Datadog が提供する汎用プロファイルのいずれかのプロファイルと一致します。デバイスからプロファイルを編集すると自動的にカスタムバージョンが作成されるため、ゼロからプロファイルを作成する必要はありません。

1. [{{< ui >}}Infrastructure{{< /ui >}} > {{< ui >}}Network Devices{{< /ui >}}][15] に移動します。
2. SNMP を介して監視されているデバイスをクリックして、デバイスサイドパネルを開きます。
3. {{< ui >}}View all metrics{{< /ui >}} をクリックして、デバイスに対して自動的に収集されているメトリクスのリストを表示します。

   {{< img src="/network_device_monitoring/profile_onboarding/ndm_view_all_metrics.png" alt="[すべてのメトリクスを表示する]ボタンが強調表示された、メトリクスセクションを示す NDM デバイスサイドパネル" style="width:90%;">}}

4. {{< ui >}}Metrics{{< /ui >}} タブが開き、デバイスに対して収集されたすべてのメトリクスが表示されます。左側のサイドバーを使用して、{{< ui >}}Alerting Metrics{{< /ui >}}、{{< ui >}}Starred Metrics{{< /ui >}}、{{< ui >}}Key Metrics{{< /ui >}}、{{< ui >}}Additional Metrics{{< /ui >}} のカテゴリー別に参照します。

   {{< img src="/network_device_monitoring/profile_onboarding/profile_manager_metrics_tab.png" alt="Alerting Metrics、Starred Metrics、Key Metrics、Additional Metrics カテゴリーを含む左側のサイドバーとメトリクスグラフが表示された NDM デバイスのメトリクスタブ" style="width:90%;">}}

5. プロファイルエディターを開いて収集されるメトリクスを管理するには、左側のサイドバーの {{< ui >}}Configure metrics{{< /ui >}} をクリックします。

   {{< img src="/network_device_monitoring/profile_onboarding/ndm_configure_metrics_2026_10.png" alt="左側のサイドバーでメトリクスの構成が強調表示された NDM デバイスのメトリクスタブ" style="width:90%;">}}

   これにより、{{< ui >}}Metrics{{< /ui >}} タブでプロファイルエディターが開き、プロファイルでカバーされるデバイスで利用可能なすべてのメトリクスのリストが、名前、MIB、OID、カテゴリー、互換性別に整理されて表示されます。これは、Datadog がデバイスから収集するデータを管理するための主要なビューです。カテゴリー別にメトリクスリストをフィルタリングするか、検索バーを使用して名前または OID で特定のメトリクスを検索できます。

6. メトリクスを有効にするには、メトリクス名の横にある {{< ui >}}Enable{{< /ui >}} トグルをクリックします。メトリクスを無効にするには、トグルを再度クリックします。プロファイルを保存してデプロイするまで変更は適用されません。

   {{< img src="/network_device_monitoring/profile_onboarding/ndm_profile_editor.png" alt="利用可能なすべてのメトリクスを名前、MIB、OID、カテゴリー、互換性別にリストしたメトリクスタブが表示されている、SNMP Profile Manager のプロファイルエディター" style="width:90%;">}}

### デバイスカバレッジ {#device-coverage}

{{< ui >}}Device Coverage{{< /ui >}} タブには、どのネットワークデバイスがプロファイルに関連付けられているか、およびプロファイルがどのように適用されているかが表示されます。このビューを使用して、デバイスの関連付けを確認し、属性でデバイスをフィルタリングし、SNMP 収集の問題を特定します。

{{< img src="/network_device_monitoring/profile_onboarding/ndm_device_coverage.png" alt="デバイスのリストが、IP アドレス、SysObjectID、タグ、および前回の SNMP ウォークステータスとともに表示されているデバイスカバレッジタブ" style="width:90%;">}}


テーブル上部のフィルターを使用して、SysObjectID、SysType、ベンダー、モデル、デバイスタイプ、またはデバイス名で結果を絞り込むことができます。

プロファイルに関連付けられたデバイスを更新するには、{{< ui >}}Manage Devices{{< /ui >}} をクリックします。そこから以下のことが可能です。

- 追加するデバイスを検索するか、削除するオブジェクト ID を選択します。オブジェクト ID を削除すると、一致するすべてのデバイスがプロファイルのカバレッジから削除されます。
- デバイスタイプ、名前、またはその他の属性でデバイスリストをフィルタリングします。

#### SNMP ウォークステータス {#snmp-walk-status}

{{< ui >}}Last SNMP walk{{< /ui >}} 列は、Datadog がデバイスへのクエリに成功したかどうかを示します。

- **失敗**: SNMP ウォークが正常に完了しませんでした。メトリクスが欠落しているか、不完全である可能性があります。
- **タイムスタンプ**: 最後に成功した SNMP ウォークの日時を示します。

SNMP ウォークが失敗する場合は、以下を確認します。

- デバイスで SNMP が正しく構成されていること。
- ネットワーク接続で SNMP ポーリングが許可されていること。
- 資格情報とポートが正しいこと。

### 高度なオプション {#advanced-options}

{{< ui >}}Advanced Options{{< /ui >}} をクリックして、デバイスメタデータとグローバルタグ構成にアクセスします。これらの設定は、ほとんどのユースケースでは必要ありません。

#### デバイスメタデータ {#device-metadata}

{{< ui >}}Device metadata{{< /ui >}} セクションでは、Datadog が SNMP OID をデバイス属性にマッピングする方法を定義します。各メタデータフィールドは、以下のような標準的なデバイスプロパティに対応しています。

- デバイス名
- ベンダー
- モデル
- OS バージョン
- 場所

値は SNMP OID を使用して定義されます。収集時に Datadog はこれらの OID をクエリしてデバイスメタデータを入力します。例:

- `1.3.6.1.2.1.1.5.0` はデバイス名にマッピングされます。
- `1.3.6.1.2.1.1.1.0`はデバイスの説明にマッピングされます。

このメタデータは、UI でのデバイス詳細を充実させ、フィルタリングとグループ化を可能にし、デバイス間で一貫したタグ付けを提供します。

鉛筆アイコンをクリックして、メタデータフィールドを編集します。メタデータは、検索可能なファセットとして [Network Device Monitoring][15] ページに、またデバイスのサイドパネルに表示されます。

{{< img src="/network_device_monitoring/profile_onboarding/ndm_advanced_options_edit.png" alt="デバイスメタデータが選択されており、デバイス名、ベンダー、場所などのメタデータフィールド名と、それらにマッピングされた SNMP OID 値のテーブルが表示されている高度なオプションタブ。" style="width:90%;">}}

次の表は、メタデータフィールドのさまざまな変更オプションについて説明しています。
| 変更    | 説明                                                                                         |
|-----------------|-----------------------------------------------------------------------------------------------------|
| {{< ui >}}No Modification{{< /ui >}} | デバイスから返された値はそのままタグ値として使用されます。                                |
| {{< ui >}}Format{{< /ui >}}          | これは [mac_address][5] または [ip_address][6] になります。                                                   |
| {{< ui >}}Extract Value{{< /ui >}}   | デバイスから提供された SNMP 値からタグ値を[抽出][7]するために使用される正規表現。|
| {{< ui >}}Mapping{{< /ui >}}         | [プロファイル形式のリファレンス][8]を参照してください。                                                             |

#### グローバルタグ {#global-tags}

{{< ui >}}Global tags{{< /ui >}} を使用して、プロファイルに関連付けられたデバイスのすべてのメトリクスおよびデバイスレベルのメタデータにタグを適用します。グローバルタグは、類似デバイス間でのタグ付けを標準化し、環境、場所、所有権などのコンテキストを追加する上で役立ちます。

{{< img src="/network_device_monitoring/profile_onboarding/ndm_global_tags.png" alt="タグ名とその OID 値のテーブル、およびグローバルタグを追加するボタンが表示されている、グローバルタグが選択された高度なオプションタブ。" style="width:90%;">}}


### メトリクスパックを調査する {#explore-metric-packs}

メトリクスパックは、一括で有効にできる厳選されたメトリクスのセットです。これらは {{< ui >}}Metrics{{< /ui >}} タブからアクセスすることでき、デバイスに基づいた AI ガイド付きの推奨事項を提供します。

{{< img src="/network_device_monitoring/profile_onboarding/ndm_metric_packs.png" alt="メトリクスパックで開始するバナーが上部に表示され、右上隅にメトリクスパックボタンが強調表示されているメトリクスタブ" style="width:90%;">}}

メトリクスパックを追加するには、以下の手順を実行します。

1. {{< ui >}}Metrics{{< /ui >}} タブから、右上隅の {{< ui >}}Metric packs{{< /ui >}} をクリックするか、{{< ui >}}Start with metric packs{{< /ui >}} バナーの {{< ui >}}View All{{< /ui >}} をクリックします。
2. {{< ui >}}Add metric pack{{< /ui >}} モーダルで、利用可能なパックをすべて参照するか、{{< ui >}}Suggested packs{{< /ui >}} をクリックして AI ガイド付きの推奨事項を表示します。
3. パックをクリックして、含まれているメトリクス、グローバルタグ、メタデータをプレビューします。
4. {{< ui >}}Add metric pack{{< /ui >}}をクリックすると、パック内のすべてのメトリクスを一括で有効にできます。

{{< img src="/network_device_monitoring/profile_onboarding/ndm_add_metric_pack.png" alt="左側にパックリスト、右側に選択したパックのメトリクス、グローバルタグ、メタデータのプレビューが表示されている、メトリクスパックの追加モーダル" style="width:90%;">}}

## インベントリページ {#inventory-page}

すべてのプロファイルを 1 か所で表示するには、[{{< ui >}}Infrastructure{{< /ui >}} > {{< ui >}}Network Devices{{< /ui >}} > {{< ui >}}Settings{{< /ui >}}][1] に移動し、左側のサイドバーで {{< ui >}}SNMP Profile Manager{{< /ui >}} をクリックします。このページには、Datadog の標準プロファイルと、作成したカスタムプロファイルの両方が一覧表示されます。

{{< img src="/network_device_monitoring/profile_onboarding/snmp_profile_manager.png" alt="名前、ベンダー、デバイスカバレッジ、最終更新日の各列が表示されたプロファイルリストを示す SNMP Profile Manager ページ" style="width:90%;">}}

{{< ui >}}Device vendor{{< /ui >}} フィルターまたは検索バーを使用して、プロファイル名、ベンダー、またはデバイス名でリストを絞り込みます。**一致するデバイスを持つプロファイルのみを表示する**を切り替えて、関連付けられたデバイスがないプロファイルを非表示にします。

Agent の Remote Config 設定が正しくない場合、ページ上部に警告バナーが表示されます。{{< ui >}}Fix Agents{{< /ui >}} をクリックして問題を解決します。

プロファイルエディターを開くには、任意のプロファイルをクリックします。Datadog が提供するプロファイルの場合、編集を行うと自動的にカスタムバージョンが作成されます。

プロファイル行の右側にある 3 点メニューをクリックして、以下を行います。

- {{< ui >}}Edit profile{{< /ui >}}: そのプロファイルのプロファイルエディターを開きます。
- {{< ui >}}Delete profile{{< /ui >}}: カスタムプロファイルを完全に削除します。
- {{< ui >}}Review related devices{{< /ui >}}: そのプロファイルに一致するデバイスでフィルタリングされた NDM に移動します。

### プロファイルをダウンロードする {#download-profiles}

プロファイルを YAML ファイルとしてダウンロードするには、ページ右上隅の {{< ui >}}Download Profiles{{< /ui >}} をクリックします。これにより、カスタムプロファイルの `yaml` ファイルを含む `.zip` バンドルが生成されます。プロファイルを Agent に手動で適用するには、以下の手順を実行します。

1. 関連する各インストール済み Agent の[プロファイルディレクトリ][13]に `yaml` ファイルを配置します。
2. Datadog Agent を再起動します。
3. NDM が一致デバイスからメトリクスを受信していることを確認します。

### カスタムプロファイルをアップロードする {#upload-custom-profiles}

既存の SNMP プロファイルをプロファイルマネージャーにアップロードするには、以下の手順を実行します。

1. [{{< ui >}}Infrastructure{{< /ui >}} > {{< ui >}}Network Devices{{< /ui >}} > {{< ui >}}Settings{{< /ui >}}][1] に移動し、左側のサイドバーで {{< ui >}}SNMP Profile Manager{{< /ui >}} をクリックします。
2. ページ右上隅の {{< ui >}}Upload Profiles{{< /ui >}} をクリックします。
3. アップロードモーダルで、`.zip` ファイルをドラッグアンドドロップするか、{{< ui >}}browse files{{< /ui >}} をクリックしてファイルを選択します。`.zip` ファイルには、`.yaml` 形式の SNMP プロファイルを 1 つ以上含める必要があります。

   {{< img src="/network_device_monitoring/profile_onboarding/upload_custom_profile_2.png" alt="SNMP プロファイルを含む .yaml 形式の .zip ファイルをアップロードするためのドラッグアンドドロップエリアを備えた、カスタム SNMP プロファイルのアップロードモーダル" style="width:60%;">}}

4. {{< ui >}}Upload profiles{{< /ui >}} をクリックします。

アップロードが完了すると、プロファイルエディターでプロファイルが利用可能になります。その後、他のカスタムプロファイルと同様に、アップロードされたプロファイルのメトリクス、デバイスカバレッジ、詳細オプションを管理できます。

## プロファイルの継承 {#profile-inheritance}

プロファイルの継承はバックグラウンドで自動的に行われます。プロファイルを編集すると、Datadog は一致するプロファイルのカスタム拡張を作成します。継承を手動で構成する必要はありません。Datadog は、継承されたベースプロファイル (`_base.yaml`、`_generic-if.yaml`、`_generic-ip.yaml`、`_generic-ospf.yaml`、`_generic-tcp.yaml`、および `_generic-udp.yaml`) を自動的に含めます。

詳細な継承構成については、[プロファイル形式のリファレンス][3]を参照してください。

## トラブルシューティング {#troubleshooting}

### プロファイルとは{#what-is-a-profile}
* プロファイルとは、デバイスから収集するメタデータ、メトリクス、タグを定義する構成ファイルです。詳細については、[メタデータの定義][17]を参照してください。

### デバイススキャンとは{#what-is-a-device-scan}
* デバイススキャンは、デバイスの完全な SNMP ウォークを実行し、利用可能なすべてのデータを収集して、UI に表示するために Datadog に転送します。このプロセスにより、デバイスで使用可能な OID が特定され、プロファイルエディターで使用可能なメトリクスのリストが作成されます。

### 一致するデバイスがない理由{#why-are-there-no-matching-devices}
一致するデバイスが見つからない場合、以下の理由が考えられます。
  * **プロファイルは適用されているが、一致するデバイスがない**:
    * プロファイルは、SysObjectID を使用してデバイスと照合されます。プロファイルの SysObjectID が監視対象のデバイスのいずれかと一致していることを確認してください。
  * **複数のプロファイルが同じ SysObjectID を持っている**:
    * 複数のプロファイルが同じ SysObjectID を共有している場合、Agent レベルで一致の競合が発生する可能性があります。各 SysObjectID が 1 つのプロファイルのみに割り当てられていることを確認してください。

### デバイスがスキャンされない理由{#why-would-a-device-not-be-scanned}

デバイススキャンが完了するまでに最大 10 分かかる場合があります。スキャンの進行状況は UI で監視することができます。

デバイスがスキャンされない場合、以下の理由が考えられます。

- **デフォルトのデバイススキャンが無効になっている**: デバイススキャンはデフォルトで無効になっています。`datadog.yaml`で `network_devices.default_scan.enabled: true` を設定します。
- **無限ループが検出された**: スキャンで無限ループが検出されたため、終了しました。`next OID 'X' is not after last OID 'Y'` の Agent ログをチェックします。これは一部のデバイスファームウェアで発生する可能性があります。
- **デバイスファームウェア**: デバイススキャンを有効にする前に、[セットアップ](#setup)のファームウェアに関する警告を確認してください。

{{< site-region region="gov,gov2" >}}
- **GovCloud**: デバイススキャンは UI からトリガーできません。デフォルトのデバイススキャンを有効にし (`network_devices.default_scan.enabled: true`)、特定のデバイスに対して Agent から手動でスキャンをトリガーします。
{{< /site-region >}}

### コレクターで Remote Configuration が有効になっていない {#remote-configuration-is-not-enabled-on-collectors}

プロファイルマネージャーには以下が必要です。

- Agent バージョン `7.77.0` 以降
- [Remote Configuration][14] が有効
SNMP 構成における - `use_remote_config_profiles: true`
デバイススキャンの - `network_devices.default_scan.enabled: true`

Remote Configuration が有効になっていない場合、UI を通じてデバイススキャンをトリガーしたり、プロファイルを Agent に同期したりすることはできません。プロファイルを手動で適用するには、[プロファイルをダウンロードする](#download-profiles)を参照してください。

Datadog では、UI ベースの全機能を利用し、Agent の手動操作を最小限に抑えるために、Remote Configuration を有効にすることを推奨しています。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/devices/profiles
[2]: /ja/network_monitoring/devices/profiles/
[3]: https://datadoghq.dev/integrations-core/tutorials/snmp/profile-format/
[5]: https://datadoghq.dev/integrations-core/tutorials/snmp/profile-format/#format-mac_address
[6]: https://datadoghq.dev/integrations-core/tutorials/snmp/profile-format/#format-ip_address
[7]: https://datadoghq.dev/integrations-core/tutorials/snmp/profile-format/#extract_value
[8]: https://datadoghq.dev/integrations-core/tutorials/snmp/profile-format/#mapping-index-to-tag-string-value
[13]: https://github.com/DataDog/integrations-core/tree/master/snmp/datadog_checks/snmp/data/profiles
[14]: /ja/agent/remote_config
[15]: https://app.datadoghq.com/devices
[17]: /ja/network_monitoring/devices/profiles/#metadata-definition-by-profile
[20]: /ja/account_management/rbac/permissions/#network-device-monitoring
[21]: /ja/help/