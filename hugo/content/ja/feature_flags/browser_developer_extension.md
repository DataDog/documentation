---
description: Datadog Browser SDK 開発者用拡張機能を使用して、ブラウザ上で Feature Flags を一覧表示し、ローカルでオーバーライドします。
further_reading:
- link: /feature_flags/client/javascript/
  tag: ドキュメント
  text: JavaScript Feature Flags
- link: /feature_flags/implementation_patterns/local_flag_overrides/
  tag: ドキュメント
  text: マルチプロバイダーパターンによるローカルフラグのオーバーライド
- link: /feature_flags/concepts/variants_and_flag_types/
  tag: ドキュメント
  text: バリアントおよびフラグタイプ
title: ブラウザ開発者用拡張機能
---
## 概要 {#overview}

Chrome の [Datadog Browser SDK 開発者用拡張機能][1] には、**Feature Flags** タブが含まれています。このタブには組織の Feature Flags が一覧表示され、ブラウザ上でローカルにオーバーライドできます。これを使用すると、Datadog でフラグ構成を変更することなく、異なるフラグ値の下でアプリケーションがどのように動作するかを確認できます。

オーバーライドはブラウザにのみ適用されます。これらは Datadog に送信されることはなく、他のユーザーには影響しません。

{{< img src="feature_flags/devtools_extension/flags-tab-overview.png" alt="Feature Flags タブには、Feature Flag Overrides の見出し、US1 の Connected バッジ、フィルター行、およびバリアントボタン付きのフラグのリストが表示されています。" style="width:100%;" >}}

この拡張機能には、Browser SDK の動作を調査するための他のタブも含まれています。このページでは、**Feature Flags** タブについて説明します。

## 前提条件 {#prerequisites}

開始する前に、以下が必要です。

- Google Chrome。
- 商用 [Datadog サイト][2] 上の Datadog 組織における Feature Flags へのアクセス権: US1 (`datadoghq.com`)、US3 (`us3.datadoghq.com`)、US5 (`us5.datadoghq.com`)、EU1 (`datadoghq.eu`)、AP1 (`ap1.datadoghq.com`)、または AP2 (`ap2.datadoghq.com`)。Datadog for Government サイトはサポートされていません。
- [Datadog Feature Flags SDK for JavaScript][3] で計測されたブラウザアプリケーション。
- OpenFeature プロバイダースタックに組み込まれた `DatadogDevtools` ラッパー。[DatadogDevtools ラッパーを追加する](#add-the-datadogdevtools-wrapper)を参照してください。

## 拡張機能をインストールする {#install-the-extension}

Chrome Web Store から [Datadog Browser SDK 開発者用拡張機能][1] をインストールします。

## DatadogDevtools ラッパーを追加する {#add-the-datadogdevtools-wrapper}

`DatadogDevtools` は、別のプロバイダーをラップする OpenFeature プロバイダーです。これは拡張機能が設定したオーバーライドを読み取り、一致するフラグキーに対してそれらを返し、その他のすべての評価をラップしているプロバイダーに委譲します。これがないと、タブに **DatadogDevtools not detected** という通知が表示されます。オーバーライドを設定することは可能ですが、ラッパーが配置されるまでそれらは適用されません。

`DatadogDevtools` を `@datadog/openfeature-browser` からインポートし、プロバイダーを渡し、OpenFeature API を通じてラッパーを登録します。

{{< code-block lang="javascript" >}}
import { DatadogProvider, DatadogDevtools } from '@datadog/openfeature-browser';
import { OpenFeature } from '@openfeature/web-sdk';

const provider = new DatadogProvider({
  applicationId: '<APPLICATION_ID>',
  clientToken: '<CLIENT_TOKEN>',
  site: '<DATADOG_SITE>',
  env: '<ENV_NAME>',
});

await OpenFeature.setProviderAndWait(new DatadogDevtools(provider));
{{< /code-block >}}

`site`を組織が使用している [Datadog サイト][2] に設定します。拡張機能のドロップダウンで選択したものと同じサイトを使用してください。それらが異なる場合、ある組織のフラグリストからバリアントを参照して選択している一方で、アプリケーションは別の組織のリストに対してフラグを解決することになります。

このラッパーはあらゆる OpenFeature プロバイダーを受け入れるため、ローカル開発ビルドで `InMemoryProvider` を介して使用することも可能です。アプリケーションが複数のドメインに対してプロバイダーを登録している場合は、それぞれをラップしてください。

<div class="alert alert-warning">ローカルのオーバーライドは Datadog の Feature Flags の構成をバイパスします。ブラウザストレージへの書き込み権限を持つユーザーであれば誰でも設定可能です。エンドユーザーが本番環境のアプリケーションで Feature Flags の動作を変更できないよう、ラッパーは非本番環境のビルドに限定してください。</div>

### オーバーライドが適用されたことを確認する {#confirm-that-an-override-applied}

`DatadogDevtools` は、プロバイダーの初期化時に一度だけオーバーライドを読み取ります。詳細メソッドでフラグを評価し、値の由来を確認します。オーバーライドされたフラグは、`reason` が `STATIC`、`flagMetadata.overridden` が `true` に設定された状態で解決されます。

{{< code-block lang="javascript" >}}
const client = OpenFeature.getClient();
const details = client.getBooleanDetails('<FLAG_KEY>', false);

console.log(details.value, details.reason, details.flagMetadata.overridden);
{{< /code-block >}}

宣言された型と一致しない値を持つオーバーライドは、初期化時にラッパーが読み取る際に無視され、ブラウザコンソールに警告が記録されます。整数のオーバーライドは整数でなければなりません。

## Feature Flags タブを開く {#open-the-feature-flags-tab}

1. Chrome でアプリケーションを開きます。
2. Chrome DevTools を開きます (Mac の場合は `Cmd+Opt+I`、Windows または Linux の場合は `F12`)。
3. **Browser SDK** パネルを選択します。表示されない場合は、DevTools タブバーのオーバーフローメニュー (`»`) を選択してください。
4. **Feature Flags** タブを選択します。
5. サインインする前に、ドロップダウンから Datadog サイトを選択します。サイトの選択によって、サインイン先およびフラグのリスト元となる Datadog 組織が決まります。次に、**Datadog にサインイン**をクリックします。

{{< img src="feature_flags/devtools_extension/flags-tab-connect.png" alt="Datadog サイトのドロップダウンが US1 に設定され、[Datadog にサインイン] ボタンが表示されている、Feature Flags タブのサインイン画面。" style="width:100%;" >}}

資格情報はブラウザセッションの間保存され、セッションが終了すると消去されます。サインアウトしてセッションを無効にするには、**Disconnect** をクリックします。Datadog の **Organization Settings > Authorized Applications** から、拡張機能のアクセス権を取り消すこともできます。

## フラグの参照とフィルタリング {#browse-and-filter-flags}

このタブには、**Feature Flag Overrides** という見出しと、接続先の Datadog サイトを確認できるバッジが表示されます。リストの上部には、利用可能なフラグの数が表示されます。各フラグには、名前、キー、説明、およびバリアントボタンが表示されます。

リストを絞り込むには、フィルター行を使用します。

| フィルター | 説明 |
| --- | --- |
| **Feature Flags をフィルタリングする** | フラグ名、キー、またはタグを一致させます。|
| **My Feature Flags** | 作成したフラグのみを表示します。|
| **My Teams** | 所属するチームのタグが付いたフラグのみを表示します。|
| **Type** | Boolean、String、Integer、Number、または JSON のフラグのみを表示します。|
| **Tags** | 1 つ以上の選択されたタグを持つフラグのみを表示します。|

## フラグをオーバーライドする {#override-a-flag}

リストからフラグをオーバーライドするには、そのバリアントボタンのいずれかをクリックします。

バリアントとして定義されていない値を設定するには、**カスタムオーバーライドを追加**を展開します。フラグキーを入力し、値のタイプを選択し、値を入力します。すでにオーバーライドがあるキーを適用すると、既存の値が置き換えられます。フラグのタイプと一致しない値は、保存される前に拡張機能の UI で拒否されます。

オーバーライドされたフラグは、一覧表示の上部にある強調表示された**ローカルオーバーライド**セクションに移動し、アクティブな数が表示されます。選択されたバリアントが強調表示され、各行にはその単一のオーバーライドを削除するための元に戻すコントロールがあります。オーバーライドを一括で削除するには、タブの下部にある**すべて消去**をクリックします。[すべてのオーバーライドを消去する](#clear-all-overrides)を参照してください。

オーバーライド行には警告が表示されることもあります。

| 警告 | 説明 |
| --- | --- |
| 赤色で強調表示された行| 保存されたオーバーライドのタイプがフラグのタイプと一致しないため、オーバーライドは適用されません。タイプが一致しないオーバーライドは、プロバイダーの初期化時に無視され、ブラウザコンソールの警告として記録されます。タブには、リロードする前に不一致が表示されます。|
| フラグキーの下の薄いメモ| オーバーライドが設定された後にフラグがアーカイブまたは削除されたため、そのフラグは組織のフラグカタログに存在しなくなりました。オーバーライドは引き続き解決されます。このメモは情報提供を目的としています。|

{{< img src="feature_flags/devtools_extension/flags-tab-local-overrides.png" alt="リストの上部にあるローカルオーバーライドセクションで 2 つのアクティブなオーバーライドが強調表示され、すべて消去およびページを更新ボタンの上に表示されている、Feature Flags タブ。" style="width:100%;" >}}

## アプリケーションにオーバーライドを適用する {#apply-overrides-to-your-application}

オーバーライドは設定した時点で保存されますが、`DatadogDevtools` はプロバイダーが初期化されるときに一度だけ読み込みます。オーバーライドの設定や元に戻す操作は、実行中のページには影響しません。タブの下部にある**ページを更新**をクリックして再読み込みを行うと、新しい値が有効になります。

## オーバーライドを管理する {#manage-overrides}

オーバーライドは、Datadog へのサインイン状態とは無関係に保持されます。サインアウト、DevTools の終了、ブラウザの再起動を行っても、オーバーライドはそのまま残ります。ページにオーバーライドが存在し、かつサインアウトしている場合、接続画面にそのページに保存されているオーバーライドの数が表示されます。また、**すべて消去**も提供されているため、サインインせずに削除することも可能です。

テスト終了後に個別のオーバーライドを元に戻すか、**すべて消去**をクリックしてからページを更新すると、アプリケーションは再び Datadog からフラグを解決するようになります。

### オーバーライドは Datadog サイトごとにスコープ設定される {#overrides-are-scoped-to-a-datadog-site}

オーバーライドは、Datadog サイトごとに個別に保存されます。あるサイトに接続しているときに設定したオーバーライドは、別のサイトに接続しているときには適用されません。

ドロップダウンで別のサイトを選択すると、適用されるオーバーライドが切り替わります。タブには **`<SITE>` のオーバーライドを再読み込みして適用**というバナーが表示されます。ページは再読み込みするまで、読み込んだオーバーライドを引き続き使用します。元のサイトを再度選択すると、そのサイトのオーバーライドが復元されます。サイトを切り替えても、オーバーライドが削除されることはありません。

### すべてのオーバーライドを消去する {#clear-all-overrides}

**すべて消去**は、オーバーライドを一括で削除し、まず確認を求められます。削除される内容は、サインインしているかどうかによって異なります。

| 状態 | スコープ |
| --- | --- |
| サインイン済み | 接続されているサイトのオーバーライドのみを削除します。他のサイトのオーバーライドはそのまま残ります。|
| サインアウト済み | 接続されているサイトがなく、操作のスコープを限定できないため、すべてのサイトのオーバーライドを削除します。確認メッセージにその旨が表示されます。|

オーバーライドを消去した後、タブで再読み込みを促すメッセージが表示されます。再読み込みを行うまで、ページは消去されたオーバーライドを適用し続けます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://chromewebstore.google.com/detail/datadog-browser-sdk-devel/boceobohkgenpcpogecpjlnmnfbdigda
[2]: /ja/getting_started/site/
[3]: /ja/feature_flags/client/javascript/