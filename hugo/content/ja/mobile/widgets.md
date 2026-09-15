---
description: Datadog ウィジェットを Datadog モバイルアプリのホーム画面またはロック画面に追加して、SLO、インシデント、ダッシュボード、モニター、オンコール情報に素早くアクセスできます。
further_reading:
- link: https://www.datadoghq.com/blog/datadog-mobile-widgets/
  tag: ブログ
  text: Datadog モバイルダッシュボードウィジェットでオンコールエクスペリエンスを改善する
title: モバイルデバイスウィジェット
---
Datadog モバイルアプリは、デバイスのホーム画面またはロック画面での SLO、インシデント、ダッシュボード、オンコール、モニターウィジェットをサポートしています。

## ホーム画面ウィジェット {#home-screen-widgets}
ホーム画面にウィジェットを追加することで、Datadog モバイルアプリを開くことなくリアルタイムの重要な情報に直接素早くアクセスできます。

{{< tabs >}}
{{% tab "iOS" %}}
1. ホーム画面を長押しします。
2. {{< ui >}}Edit{{< /ui >}} をタップし、画面左上の {{< ui >}}Add Widget{{< /ui >}} ボタンをタップします。
2. "Datadog" ウィジェットを検索します。
3. 希望するウィジェットと希望するサイズ (小、中、大) をタップします。
4. {{< ui >}}Add Widget{{< /ui >}} をタップして、ウィジェットのフィールドを設定します。ウィジェットからモバイルアプリにアクセスする際、これらのフィールドがアプリ内でクエリされます。
5. ウィジェットをドラッグ、縮小、または拡大して、ホーム画面上のウィジェットの場所とサイズをカスタマイズします。

{{% /tab %}}
{{% tab "Android" %}}
1. ホーム画面を長押しします。
2. ホーム画面エディターで {{< ui >}}Widgets{{< /ui >}} ボタンをタップします。アプリのショートカットがある場合は、バブルの右上隅にアイコンとしてのみ表示されることがあります。
3. "Datadog" ウィジェットを検索します。
4. 希望するウィジェットをタップし、{{< ui >}}Add{{< /ui >}} をタップします。
4. 好みに合わせてウィジェットのサイズを調整します。
5. ウィジェットをタップして、ウィジェットのフィールドを設定します。ウィジェットからモバイルアプリにアクセスする際、これらのフィールドがアプリ内でクエリされます。

{{% /tab %}}
{{< /tabs >}}

**注**: ウィジェットは 30 分ごとに更新されます。ウィジェットの左上に表示される時間をタップすることで、手動で更新できます。

### インシデントウィジェット {#incident-widgets}
Datadog ウィジェットを使用して、モバイルホーム画面から [オープンインシデント][1] を表示します。問題をより詳細に確認するには、ウィジェットに表示されているオープンインシデントをタップして開き、Datadog モバイルアプリで詳細を確認します。

オープンインシデントウィジェットは、以下のフィルターを使用してカスタマイズすることも可能です。

- 組織
- 重大度レベル
- 影響のあった顧客
- 順序

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="mobile/widgets/ios_incident_widget_may_2025.png" alt="iOS デバイスに表示された Datadog インシデントモバイルウィジェット" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

1. ウィジェットを長押しして構成します。
2. {{< ui >}}Edit Widget{{< /ui >}} をタップします。
2. {{< ui >}}Choose{{< /ui >}} ラベルの横にある {{< ui >}}Organization{{< /ui >}} をタップして、選択した組織からオープンインシデントを取得します。
3. 重大度ラベルの横にある {{< ui >}}SEV-1 and SEV-2{{< /ui >}} をタップして、重大度フィルターを指定します。
4. {{< ui >}}Customer Impacted{{< /ui >}} ラベルの横にある {{< ui >}}Both{{< /ui >}} をタップして、影響のあった顧客のオープンインシデントを絞り込みます。
5. さらに絞り込みを指定するには、{{< ui >}}Type additional filters{{< /ui >}} のテキストボックスに入力します。
6. {{< ui >}}Ordering{{< /ui >}} をタップして、リストアップされるインシデントの順番を指定します。
7. ウィジェットの外側をタップして、選択内容を保存し、構成画面を終了します。

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="mobile/widgets/android_incidents_widget_may_2025.png" alt="Android に表示された Datadog インシデントモバイルウィジェット" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

1. ウィジェットのタイトルをタップして構成します。
2. {{< ui >}}Organization{{< /ui >}} をタップし、選択した組織からオープンインシデントを取得します。
3. {{< ui >}}Severities{{< /ui >}} をタップして重大度フィルターを指定します。
4. {{< ui >}}Customer impacted{{< /ui >}} をタップして、影響のあった顧客のオープンインシデントを絞り込みます。
5. さらに絞り込みを指定するには、{{< ui >}}Query{{< /ui >}} をタップします。
6. {{< ui >}}Sorted by{{< /ui >}} をタップして、リストアップされるインシデントの順番を指定します。
7. {{< ui >}}Save{{< /ui >}} または {{< ui >}}Apply{{< /ui >}} をタップして、選択内容を保存し、構成画面を終了します。
8. ウィジェットを長押しして、好みに合わせてサイズを変更します。

{{% /tab %}}
{{< /tabs >}}

#### 複数の組織のオープンインシデントを表示する {#display-open-incidents-from-multiple-organizations}

複数の組織のオープンインシデントをモバイルホーム画面に表示できます。

{{< tabs >}}
{{% tab "iOS" %}}
- Organization ラベルの横にある {{< ui >}}Choose{{< /ui >}} をタップし、選択した組織からオープンインシデントを取得します。


{{% /tab %}}
{{% tab "Android" %}}

1. ウィジェットのタイトルをタップして構成します。
2. 構成画面で {{< ui >}}Organization{{< /ui >}} をタップします。
3. 新しい組織を選択します (サインインが必要な場合があります)。
4. 好みに合わせてウィジェットのサイズを変更します。
5. {{< ui >}}Save{{< /ui >}} または {{< ui >}}Apply{{< /ui >}} をタップします。


{{% /tab %}}
{{< /tabs >}}

### SLO ウィジェット {#slos-widget}

Datadog ウィジェットを使用して、モバイルホーム画面から [SLO][2] を表示します。組織の SLO をタイムフレームとともにウィジェットとして追加できます。

タイムフレームオプションは次のとおりです。
- 7 日
- 30 日
- 90 日
- 前の週
- 前の月
- 現在までの週
- 現在までの月

SLO ウィジェットをタップすると、デフォルトで開くダッシュボードを指定して、メトリクスの詳細をすばやく調査することもできます。

**注**: デフォルトで開くダッシュボードを指定しない場合、SLO ウィジェットをタップすると Datadog アプリが開きます。

#### SLO ウィジェットを編集する {#edit-an-slos-widget}

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="mobile/widgets/ios_slo_widget_may_2025.png" alt="iOS デバイスに表示された Application Uptime SLO ウィジェット" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

1. ウィジェットを長押しして構成します。
2. {{< ui >}}Edit Widget{{< /ui >}} をタップします。
3. SLO ラベルの横にある {{< ui >}}Choose{{< /ui >}} をタップして、追跡する SLO を選択します。
4. 選択された SLO によっては、{{< ui >}}Timeframe{{< /ui >}} ラベルが表示される場合があります。{{< ui >}}Timeframe{{< /ui >}} ラベルの横にある {{< ui >}}Choose{{< /ui >}} をタップして、SLO の期間を選択します。
5. {{< ui >}}Dashboard to open{{< /ui >}} ラベルの横にある {{< ui >}}Choose{{< /ui >}} をタップして、SLO ウィジェットをタップしたときに開くダッシュボードを選択します。
6. ウィジェットの外側をタップして、選択内容を検証し、構成画面を終了します。


{{% /tab %}}
{{% tab "Android" %}}

{{< img src="mobile/widgets/android_slo_widget_may_2025.png" alt="Android に表示された Application Uptime SLO ウィジェット" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

1. ウィジェットのタイトルをタップして構成します。
2. {{< ui >}}Selected SLO{{< /ui >}} をタップして、追跡する SLO を選択します。
3. {{< ui >}}Selected Time Window{{< /ui >}} をタップして、SLO の期間を選択します。
4. {{< ui >}}Dashboard to open{{< /ui >}} をタップして、SLO ウィジェットをタップしたときに開くダッシュボードを選択します。
5. {{< ui >}}Save{{< /ui >}} または {{< ui >}}Apply{{< /ui >}} をタップして、選択内容を検証し、構成画面を終了します。
6. ウィジェットを長押しして、好みに合わせてサイズを変更します。


{{% /tab %}}
{{< /tabs >}}

#### 複数の組織の SLO を表示する {#display-slos-from-multiple-organizations}

複数の組織の SLO をモバイルホーム画面に表示できます。

{{< tabs >}}
{{% tab "iOS" %}}

ログインしたすべての組織が構成画面に表示されます。組織が表示されない場合は、再度サインインしてください。


{{% /tab %}}
{{% tab "Android" %}}

1. ウィジェットのタイトルをタップして構成します。
2. 構成画面で {{< ui >}}Organization{{< /ui >}} をタップします。
3. 新しい組織を選択します (サインインが必要な場合があります)。
4. 好みに合わせてウィジェットのサイズを変更します。
5. {{< ui >}}Save{{< /ui >}} または {{< ui >}}Apply{{< /ui >}} をタップします。


{{% /tab %}}
{{< /tabs >}}

### モニターウィジェット {#monitors-widget}

Datadog ウィジェットを使用してホーム画面から [モニター][3] を表示します。いずれかのセルをタップして、モニターがすでに入力された状態でアプリの {{< ui >}}Monitor Search{{< /ui >}} 画面を開きます。

**注**: モニターに保存されたビューがない場合、ウィジェットにはデフォルトですべてのモニターが表示されます。

#### モニターウィジェットを編集する {#edit-a-monitors-widget}

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="mobile/widgets/ios_monitor_widget_may_2025.png" alt="iOS 画面に表示された構成済みのモニターウィジェット" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

1. ウィジェットを長押しして構成します。
2.  {{< ui >}}Edit Widget{{< /ui >}} をタップします。
3. 個々の保存されたビューのセルをタップして、選択および選択解除します。
4. 各セルをドラッグアンドドロップして、ビューを並べ替えます。
5. ウィジェットの外側をタップして、選択内容を検証し、構成画面を終了します。


{{% /tab %}}
{{% tab "Android" %}}

{{< img src="mobile/widgets/android_monitor_widget_may_2025.png" alt="Android に表示された構成済みのモニターウィジェット" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

1. ウィジェットのタイトルをタップして構成します。
2. {{< ui >}}Saved Views{{< /ui >}} をタップします。
3. 個々の保存されたビューのセルをタップして、選択および選択解除します。
4. 各セルをドラッグアンドドロップして、ビューを並べ替えます。
5. {{< ui >}}Save{{< /ui >}} または {{< ui >}}Apply{{< /ui >}} をタップして、選択内容を検証し、構成画面を終了します。
6. ウィジェット内をスクロールして、保存されたビューをさらに表示します。ウィジェットを長押しして、好みに合わせてサイズを変更します。


{{% /tab %}}
{{< /tabs >}}

#### 複数の組織のモニターを表示する {#display-monitors-from-multiple-organizations}

同じウィジェット内に複数の組織からのモニターを表示できます。

{{< tabs >}}
{{% tab "iOS" %}}

ログインしているすべての組織が構成画面に表示されます。組織が表示されない場合は、再度サインインが必要になることがあります。


{{% /tab %}}
{{% tab "Android" %}}

1. ウィジェットのタイトルをタップして構成します。
2. 構成画面で {{< ui >}}Organization{{< /ui >}} をタップします。
3. 新しい組織を選択します (サインインが必要な場合があります)。
4. 好みに合わせてウィジェットを編集します。
5. {{< ui >}}Save{{< /ui >}} または {{< ui >}}Apply{{< /ui >}} をタップします。

{{% /tab %}}
{{< /tabs >}}

### ダッシュボードウィジェット {#dashboard-widget}

Datadog ウィジェットを使用してホーム画面から [ダッシュボード][4] を表示します。いずれかのセルをタップして、ダッシュボードが読み込まれた状態でアプリの {{< ui >}}dashboard search{{< /ui >}} 画面を開きます。

#### ダッシュボードウィジェットを編集する {#edit-a-dashboard-widget}

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="mobile/widgets/ios_dashboard_widget_may_2025.png" alt="iOS 画面に表示された構成済みのダッシュボードウィジェット" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

1. ウィジェットを長押しして構成します。
2. {{< ui >}}Edit Widget{{< /ui >}} をタップします。
3. 構成画面から {{< ui >}}Dashboard{{< /ui >}} をタップし、ダッシュボードを選択します。
4. {{< ui >}}Widget{{< /ui >}} をタップして、選択されたダッシュボードから特定のウィジェットを選択します。
5. ウィジェットクエリの {{< ui >}}Period{{< /ui >}} を選択します。
6. ウィジェットの外側をタップして、選択内容を検証し、構成画面を終了します。


{{% /tab %}}
{{% tab "Android" %}}

{{< img src="mobile/widgets/android_dashboard_widget_may_2025.png" alt="Android に表示された構成済みのダッシュボードウィジェット" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

1. ウィジェットのタイトルをタップして構成します。
2. {{< ui >}}Saved Views{{< /ui >}} をタップします。
3. 個々の保存されたビューのセルをタップして、選択および選択解除します。
4. 各セルをドラッグアンドドロップして、ビューを並べ替えます。
5. {{< ui >}}Save{{< /ui >}} または {{< ui >}}Apply{{< /ui >}} をタップして、選択内容を検証し、構成画面を終了します。
6. ウィジェット内をスクロールして、保存されたビューをさらに表示します。ウィジェットを長押しして、好みに合わせてサイズを変更します。


{{% /tab %}}
{{< /tabs >}}

#### 複数の組織のダッシュボードを表示する {#display-dashboards-from-multiple-organizations}

複数の組織のダッシュボードをモバイルホーム画面に表示できます。

{{< tabs >}}
{{% tab "iOS" %}}

ログインしたすべての組織が構成画面に表示されます。組織が表示されない場合は、再度サインインしてください。


{{% /tab %}}
{{% tab "Android" %}}

1. ウィジェットのタイトルをタップして構成します。
2. 構成画面で {{< ui >}}Organization{{< /ui >}} をタップします。
3. 新しい組織を選択します (サインインが必要な場合があります)。
4. 好みに合わせてウィジェットのサイズを変更します。
5. {{< ui >}}Save{{< /ui >}} または {{< ui >}}Apply{{< /ui >}} をタップします。
   
{{% /tab %}}
{{< /tabs >}}

### On-Call ウィジェット {#on-call-widget}

Datadog ウィジェットを使用して、モバイルホーム画面で On-Call シフトと On-Call ページを表示します。

On-Call シフトウィジェットは、以下でフィルタリングしてカスタマイズできます。

- 組織
- 期間

On-Call ページウィジェットは、以下でフィルタリングしてカスタマイズできます。

- 組織
- チーム
- 順序

**注**: On-Call ページウィジェットに、追加のフィルターを設定できます。

#### On-Call シフトウィジェットを編集 {#edit-an-on-call-shift-widget}

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="mobile/widgets/ios_shifts_widget_may_2025.png" alt="iOS 画面に On-Call シフトウィジェットが表示されている、構成済みのホーム画面" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

1. ウィジェットを長押しして構成します。
2. {{< ui >}}Edit Widget{{< /ui >}} をタップして構成画面を表示します。
3. On-Call シフトを表示する {{< ui >}}Organization{{< /ui >}} と {{< ui >}}Period{{< /ui >}} を選択します。
4. ウィジェットの外側をタップして、選択内容を検証し、構成画面を終了します。


{{% /tab %}}
{{% tab "Android" %}}

{{< img src="mobile/widgets/android_shifts_widget_may_2025.png" alt="Android 画面に On-Call シフトウィジェットが表示されている、構成済みのホーム画面" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

1. ウィジェットをタップして構成します。
2. On-Call シフトを表示する {{< ui >}}Organization{{< /ui >}} と {{< ui >}}Time Period{{< /ui >}} を選択します。
3. {{< ui >}}✓{{< /ui >}} をタップして構成を保存します。
4. ウィジェットを長押しして、好みに合わせてサイズを変更します。

{{% /tab %}}
{{< /tabs >}}

#### On-Call ページウィジェットを編集する {#edit-an-on-call-pages-widget}

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="mobile/widgets/ios_pages_widget_may_2025.png" alt="iOS 画面に On-Call ページウィジェットが表示されている、構成済みのホーム画面" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

1. ウィジェットを長押しして構成します。
2. {{< ui >}}Edit Widget{{< /ui >}} をタップして構成画面を表示します。
3. On-Call ページを表示する {{< ui >}}Organization{{< /ui >}}、{{< ui >}}Teams{{< /ui >}}、および {{< ui >}}Order{{< /ui >}} を選択します。
4. 追加のフィルターを入力し、{{< ui >}}Done{{< /ui >}} をタップします。
5. ウィジェットの外側をタップして、選択内容を検証し、構成画面を終了します。


{{% /tab %}}
{{% tab "Android" %}}

{{< img src="mobile/widgets/android_pages_widget_may_2025.png" alt="iOS 画面に On-Call ページウィジェットが表示されている、構成済みのホーム画面" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

1. ウィジェットをタップして構成します。
2. On-Call ページを表示する {{< ui >}}Organization{{< /ui >}}、{{< ui >}}Teams{{< /ui >}}、および {{< ui >}}Sort by{{< /ui >}} を選択します。
3. タップして {{< ui >}}Additional Filter{{< /ui >}} を入力し、{{< ui >}}Save{{< /ui >}} をタップします。
4. 構成が完了したら {{< ui >}}✓{{< /ui >}} をタップします
5. ウィジェットを長押しして、好みに合わせてサイズを変更します。

{{% /tab %}}
{{< /tabs >}}


## ロック画面ウィジェット {#lock-screen-widgets}
{{< img src="mobile/widgets/lockscreen_widget_may_2025.png" alt="iOS 画面に表示された構成済みのロック画面ウィジェット" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

iOS では、On-Call、モニター、SLO、インシデント、およびダッシュボードのロック画面ウィジェットがサポートされています。

1. ロック画面を長押しします。
2. {{< ui >}}Customize{{< /ui >}} をタップし、次に {{< ui >}}Lock Screen{{< /ui >}} をタップします。
3. ロック画面のウィジェットスペースをタップして、{{< ui >}}Add Widgets{{< /ui >}} カードを表示します。
4. スクロールして {{< ui >}}Datadog{{< /ui >}} アプリをタップします。
4. 追加したいロック画面ウィジェットをタップします。
5. ロック画面のウィジェットをタップして、構成パネルを表示します。
6. 選択されたウィジェットに指定されたフィールドに従って、ウィジェットを構成します。
7. ウィジェットをドラッグ、縮小、または拡大して、ロック画面上のウィジェットの場所とサイズをカスタマイズします。

**注**: 新しいウィジェットを追加するには、ロック画面に空きスペースが必要です。ロック画面のウィジェットを削除するには、削除したいウィジェットの左上にある {{< ui >}}\-{{< /ui >}} ボタンをタップします。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/monitors/incident_management
[2]: /ja/dashboards/widgets/slo/#setup
[3]: /ja/monitors/
[4]: /ja/dashboards/
[5]: /ja/incident_response/on-call/