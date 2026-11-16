---
aliases:
- /ja/security/cloud_siem/detect_and_monitor/critical_assets/
further_reading:
- link: /security/cloud_siem/detect_and_monitor/suppressions/
  tag: ドキュメント
  text: 抑制
products:
- icon: siem
  name: Cloud SIEM
  url: /security/cloud_siem/
- icon: cloud-security-management
  name: Workload Protection
  url: /security/workload_protection/
- icon: app-sec
  name: App and API Protection
  url: /security/application_security/
title: 動的重大度
---
{{< product-availability >}}

## 概要 {#overview}

動的重大度では、その影響を受けるアセットに基づいて、セキュリティシグナルの重大度を調整できます。これによりアナリストは、影響を受けるアセットのビジネス上の重要度に応じて、デフォルトの重大度を上げる、下げる、あるいは維持することで、シグナルに優先順位を付けることができます。アセットごとに、重大度レベルの調整やカスタムタグを適用したり、特定のルールにのみ変更が適用されるようにすることができます。

### 仕組み {#how-it-works}

- セキュリティシグナルの重大度レベルを調整するために複数の動的重大度ルールが設定されている場合、そのシグナルは自動的に高い方の重大度レベルを採用します。たとえば、ある動的重大度ルールでは重大度が `MEDIUM` に設定されており、別のルールでは `HIGH` に設定されていた場合、重大度は `HIGH` になります。
- 複数の動的重大度ルールがセキュリティシグナルの重大度レベルに対して同じアクションを実行するように設定されている場合、そのアクションは 1 回のみ適用されます。たとえば、`MEDIUM` に設定されているシグナルの重大度レベルを上げるように設定された動的重大度ルールが 2 つある場合、重大度は一度のみ `HIGH` に上げられ、さらに `CRITICAL` に上げられることはありません。

## 動的重大度ルールを作成する {#create-a-dynamic-severity-rule}

1. Datadog で、[{{< ui >}}Security{{< /ui >}}] (セキュリティ) > [{{< ui >}}Settings{{< /ui >}}] (設定) > [[{{< ui >}}Dynamic Severity{{< /ui >}}] (動的重大度)][1] に移動し、[{{< ui >}}Create Dynamic Severity Rule{{< /ui >}}] (動的重大度ルールの作成) をクリックします。[Create Dynamic Severity Rule] ウィンドウが開きます。
1. [{{< ui >}}Define Asset{{< /ui >}}] (アセットの定義) で、アセットを定義するクエリを入力します。
1. [{{< ui >}}Choose Severity Adjustment{{< /ui >}}] (重大度調整の選択) で、アセットに関連付けられたセキュリティシグナルの重大度をどのように調整するかを選択します。
   - [{{< ui >}}Increase{{< /ui >}}] (上げる) または [{{< ui >}}Decrease{{< /ui >}}] (下げる) を選択して、デフォルトの重大度レベルから重大度を 1 レベル上げるか、下げます。
   - デフォルトの重大度レベルを維持する場合は、[{{< ui >}}Maintain{{< /ui >}}] (維持) を選択します。
   - シグナルに関連付けられた初期の重大度に関係なく、常に特定の重大度レベルを適用するには、その重大度レベルを選択します。
1. (オプション) [{{< ui >}}Details{{< /ui >}}] (詳細) で、動的重大度ルールに適用する説明、タグ、チームを追加します。
1. [{{< ui >}}Select Detection Rules{{< /ui >}}] (検出ルールの選択) で、重大度の変更を絞り込むための特定の検出ルールを入力します。すべての検出ルールに変更を適用する場合は、クエリを `*` に設定します。
1. [{{< ui >}}Save{{< /ui >}}] をクリックします。[Create Dynamic Severity Rule] ウィンドウが閉じ、作成した動的重大度ルールがテーブルに表示されます。ここで、ルールを有効化または無効化することや、Terraform または JSON ファイルとして設定をエクスポートすることができます。

## 動的重大度ルールの影響を受けたシグナルを表示する {#view-the-signals-a-dynamic-severity-rule-affected}

1. Datadog で、[{{< ui >}}Security{{< /ui >}}] > [{{< ui >}}Settings{{< /ui >}}] > [[{{< ui >}}Dynamic Severity{{< /ui >}}]][1] に移動します。
1. 動的重大度ルールの横にある [{{< ui >}}More Options{{< /ui >}}] (その他のオプション) アイコンをクリックし、 {{< img src="icons/kebab.png" inline="true" style="height:1em" >}}[{{< ui >}}Signals affected{{< /ui >}}] (影響を受けたシグナル) をクリックします。シグナルエクスプローラーが新しいタブで開き、影響を受けたシグナルを表示するクエリが事前入力されています。

## セキュリティシグナルで動的重大度データを表示する {#view-dynamic-severity-data-in-security-signals}

動的重大度ルールによって変更されたすべてのセキュリティシグナルにおいて、[{{< ui >}}Adjusted Severity{{< /ui >}}] (調整された重大度) ピルに元の重大度レベルと調整後の重大度レベルの両方が表示されます。そのピルにカーソルを合わせると、動的重大度ルールによって適用された調整を確認できます。
{{< img src="security/security_monitoring/critical_assets_pill.png" alt="CloudTrail シグナルの重大度が [Low] から [Medium] に引き上げられたことを示す、[Adjusted Severity] ピルとポップアップ" style="width:50%;" >}}

セキュリティシグナルの [{{< ui >}}JSON{{< /ui >}}] タブで、`critical_assets_data` オブジェクトを確認することもできます。ここには、関連付けられている動的重大度ルールに関する情報と、それらがシグナルの重大度にどのように影響したかが示されています。
<div class="alert alert-info">動的重大度ルールの重大度レベルが、それより高い重大度レベルによって上書きされた場合、それは <code>critical_assets_data</code> オブジェクトには示されないことがあります。</div>

## 編集権限を制限する {#restrict-edit-permissions}

{{% security-products/dynamic-severity-granular-access %}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/configuration/dynamic-severity