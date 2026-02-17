---
further_reading:
- link: /service_management/app_builder/build/
  tag: ドキュメント
  text: アプリの構築
- link: /service_management/app_builder/components/
  tag: ドキュメント
  text: コンポーネント
title: JavaScript 式
---

{{< site-region region="gov" >}}
<div class="alert alert-danger">選択した <a href="/getting_started/site">Datadog サイト</a> ({{< region-param key="dd_site_name" >}}) では App Builder はサポートされていません。</div>
{{< /site-region >}}

App Builder の任意の場所で JavaScript (JS) 式を使用して、アプリのさまざまな要素間のカスタムインタラクションを作成できます。式の入力を開始すると、App Builder がアプリ内の既存のクエリとコンポーネントに基づいてオートコンプリートの候補を表示します。オートコンプリートの候補をクリックして式で使用するか、キーボードの矢印キーを使用して Enter キーで選択します。

{{< img src="service_management/app_builder/app-builder-variable.png" alt="式として何を入力すべきかわからない場合は、${ と入力すれば、提案メニューが開き、利用可能なすべての式が表示されます" style="width:70%;" >}}

[ポストクエリ変換][1] のように、一部のフィールドではデフォルトでコードエディターが表示され、プレーンな JS を受け付けます。その他のフィールドでは、JS 式を `${}` で囲みます。例えば、`textInput0` と `textInput1` という 2 つのテキスト入力コンポーネントの値を、テキストコンポーネントの **Content** プロパティに補間し (さらに感嘆符を追加し) たい場合は、`${textInput0.value} ${textInput1.value}!` という式を使用します。

{{< img src="service_management/app_builder/interpolation-2.png" alt="テキストコンポーネントに、テキスト入力コンポーネントの値から補間された「Hello」と「World」が表示されている" style="width:70%;" >}}

App Builder は標準的なバニラ JavaScript の構文を受け付けますが、次の点に注意してください:
- 式の評価結果は、対象のコンポーネントまたはクエリのプロパティが想定する型や値と一致している必要があります。例えば、テキストコンポーネントの **Is Visible** プロパティはブール値を想定します。各プロパティが想定するデータ型は、[コンポーネントのプロパティの確認](#view-component-properties)を参照してください。
- コードはアプリの状態に対する読み取り専用のアクセス権を持っていますが、App Builder は、DOM (Document Object Model) やブラウザ API にアクセスできないサンドボックス環境でコードを実行します。

## コンポーネントのプロパティの確認

式を作成する前に、やり取りするコンポーネントで使用可能なプロパティと、そのデフォルト値または現在の値を知っておくと便利です。

コンポーネントの利用可能なプロパティと値は、以下の方法で確認できます。
- **App State**: アプリ内のすべてのコンポーネントとクエリのプロパティと値、およびステート変数やダッシュボードテンプレート変数などのグローバル変数を確認できます。
- **Inspect Data**: アプリ内の特定のコンポーネントやクエリのプロパティと値を確認できます。
- **Admin Console**: **Admin Console** の **Data** タブでは、アプリ内のすべてのコンポーネントとクエリのプロパティと値を確認できます。

{{% collapse-content title="App State" level="h4" %}}
**App State** にアクセスするには:
1. 左側のサイドパネルにある **App Properties** をクリックします。
1. 下にスクロールして **App State** セクションまで移動します。

{{< img src="service_management/app_builder/app-state-2.png" alt="App Properties の App State セクション" style="width:50%;" >}}
{{% /collapse-content %}}

{{% collapse-content title="Inspect Data" level="h4" %}}
**Inspect Data** にアクセスするには:
1. 調査したいクエリまたはコンポーネントをクリックします。
1. 下にスクロールして **Inspect Data** セクションまで移動します。

{{< img src="service_management/app_builder/inspect-data-2.png" alt="App Properties の App State セクション" style="width:80%;" >}}
{{% /collapse-content %}}

{{% collapse-content title="Admin Console" level="h4" %}}
**Admin Console** にアクセスするには:
1. 歯車 (**Settings**) アイコンをクリックし、**Admin Console** を選択します。
1. **Data** をクリックします。

{{< img src="service_management/app_builder/admin-console-2.png" alt="App Properties の App State セクション" style="width:50%;" >}}
{{% /collapse-content %}}

## コンポーネントのカスタムインタラクション

ほとんどの UI コンポーネントは、基本的なアプリの使い方をカバーする、トグルやテキストの整列などの組み込みオプションを提供します。コンポーネントにカスタムインタラクションを追加するには、コードエディターの記号 (**</>**) をクリックし、JS 式を入力します。

### 条件付き表示

コンポーネントの可視性を他のコンポーネントに依存させることができます。

例えば、`textInput0` と `textInput1` という 2 つのテキスト入力コンポーネントに値があるときだけテキストコンポーネントを表示させたい場合は、**Is Visible** プロパティで `${textInput0.value && textInput1.value}` という式を使用します。

### コンポーネントを条件付きで無効化する

可視性と同様、他のコンポーネントやアプリのコンテキストなど、アプリの他の側面により条件が満たされない場合に、コンポーネントを無効にすることができます。

#### コンポーネントを可視性に基づいて無効化する

アプリに、テキストコンポーネントのコンテンツを使用してメッセージを送信するボタンがある場合、テキストコンポーネントが表示されていない場合にボタンを無効にすることができます。
1. キャンバス上のボタンコンポーネントをクリックします。
1. **Is Disabled** プロパティの横にあるコードエディターの記号 (**</>**) をクリックします。
1. `${!text0.isVisible}` という式を追加します。

両方のテキスト入力フィールドにコンテンツがある場合を除き、テキストコンポーネントは非表示で、ボタンは無効です。

{{< img src="service_management/app_builder/is-disabled.png" alt="両方のテキスト入力フィールドにコンテンツがある場合を除き、テキストコンポーネントは非表示で、ボタンは無効です。" style="width:100%;" >}}

#### コンポーネントをアプリのコンテキストに基づいて無効化する

また、ユーザーが所属するチームなど、アプリのコンテキストに基づいてコンポーネントを無効にすることもできます。

たとえば、Product Management チームに所属するユーザーに対してのみコンポーネントを有効にすることができます。
1. キャンバス上のボタンコンポーネントをクリックします。
1. **Is Disabled** プロパティの横にあるコードエディターの記号 (**</>**) をクリックします。
1. `${global.user.teams[0].name == 'Product Management'}` という式を追加します。

### ロード中にコンポーネントを無効化する

もう一つの一般的な使用例は、クエリがロード状態にある間、コンポーネントを無効にすることです。[EC2 Instance Manager ブループリント][3]では、`listInstances` クエリがロードされている間、`instanceType` 選択コンポーネントが無効になります。これを実現するために、**Is Disabled** プロパティでは `${listInstances.isLoading}` という式を使用します。

{{< img src="service_management/app_builder/isloading.png" alt="listInstances クエリのロード中は instanceType 選択コンポーネントが無効になります。" style="width:100%;" >}}

## クエリのカスタムインタラクション

コンポーネントと同様に、JS 式を使用して、ユーザーインタラクションに基づいてクエリを変更することができます。

### ユーザー入力に基づくクエリ結果のフィルタリング

[PagerDuty On-call Manager ブループリント][4]は、ユーザーからの入力に基づいて `listSchedules` クエリの結果をフィルタリングします。ユーザーは、`team` および `user` 選択コンポーネントからチームとユーザーを選択します。

`listSchedules` クエリの内部では、以下のポストクエリ変換によって、`team` と `user` の値に基づいて結果がフィルタリングされます。

{{< code-block lang="js" disable_copy="true" >}}
return outputs.body.schedules.map( s => {
    return {
        ...s,
        users: s.users.map(u => u.summary),
        teams: s.teams.map(u => u.summary)
    }
}).filter(s => {

        const matchesName = !name.value.length ? true : s.name.toLowerCase().includes(name.value.toLowerCase());
        const matchesTeam = team.value === 'Any Team' ? true : s.teams.includes(team.value);
        const matchesUser = user.value === 'Any User' ? true : s.users.includes(user.value);

        return matchesName && matchesUser && matchesTeam ;
    }) || []
{{< /code-block >}}

クエリの **Run Settings** を **Auto** に設定すると、ユーザーが `team` または `user` コンポーネントの値を変更するたびにクエリが実行されます。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/service_management/app_builder/build/#post-query-transformation
[3]: https://app.datadoghq.com/app-builder/apps/edit?viewMode=edit&template=ec2_instance_manager
[4]: https://app.datadoghq.com/app-builder/apps/edit?viewMode=edit&template=pagerduty_oncall_manager