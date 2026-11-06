---
aliases:
- /ja/service_management/app_builder/expressions
description: App Builder で JavaScript 式を使用して、コンポーネント、クエリ、アプリ状態間のカスタムインタラクションを作成します。
further_reading:
- link: /actions/app_builder/build/
  tag: ドキュメント
  text: アプリの構築
- link: /actions/app_builder/components/
  tag: ドキュメント
  text: コンポーネント
title: JavaScript 式
---
App Builder のどこでも JavaScript (JS) 式を使用して、アプリの各パーツ間でカスタムインタラクションを作成できます。式の入力を開始すると、App Builder はアプリ内の既存のクエリやコンポーネントに基づいて、オートコンプリートの候補を表示します。オートコンプリートの候補をクリックして式で使用するか、キーボードの矢印キーを使用して選択し、Enter キーを押してください。

{{< img src="actions/app_builder/app-builder-variable.png" alt="式として何を入力すればよいかわからない場合は、${ と入力して、利用可能なすべての式が表示される候補メニューを開いてください。" style="width:70%;" >}}

[クエリ後変換][1] のような一部のフィールドでは、デフォルトでコードエディターが表示され、プレーンな JS を受け入れます。その他のすべてのフィールドでは、JS 式を `${}` で囲んでください。たとえば、`textInput0` と `textInput1` という名前の 2 つのテキスト入力コンポーネントの値を、テキストコンポーネントの {{< ui >}}Content{{< /ui >}} プロパティに補間 (および感嘆符を追加) するには、式 `${textInput0.value} ${textInput1.value}!` を使用します。

{{< img src="actions/app_builder/interpolation-2.png" alt="テキストコンポーネントには、それぞれテキスト入力コンポーネントの値から補間された「Hello」と「World」という単語が入力されます。" style="width:70%;" >}}

App Builder は標準のバニラ JavaScript 構文を受け入れますが、以下の点に注意してください。
- 式の計算結果は、コンポーネントまたはクエリのプロパティが期待する結果と一致している必要があります。たとえば、テキストコンポーネントの {{< ui >}}Is Visible{{< /ui >}} プロパティは Boolean を期待します。コンポーネントのプロパティがどのようなデータ型を期待しているかを確認するには、[コンポーネントプロパティを表示する](#view-component-properties)を参照してください。
- コードはアプリ状態に対して読み取り専用でアクセスできますが、App Builder は Document Object Model (DOM) やブラウザ API にアクセスできないサンドボックス環境でコードを実行します。

Bits AI を使用して JS 式を操作することもできます。
   1. {{< ui >}}Build with AI{{< /ui >}}アイコン (**<i class="icon-bits-ai"></i>**) をクリックします。
   1. カスタムプロンプトを入力するか、プロンプト `How can you help me with JavaScript expressions?` を試します。

## コンポーネントプロパティを表示する {#view-component-properties}

式を作成する前に、操作したいコンポーネントで利用可能なプロパティやデフォルト値、現在の値を知っておくと便利です。

コンポーネントで利用可能なプロパティと値は、以下の方法で表示できます。
- {{< ui >}}App State{{< /ui >}}: アプリ内のすべてのコンポーネントとクエリのプロパティと値、および状態変数やダッシュボードテンプレート変数などのグローバル変数を提供します。
- {{< ui >}}Inspect Data{{< /ui >}}: アプリ内の特定のコンポーネントまたはクエリのプロパティと値を提供します。
- {{< ui >}}Admin Console{{< /ui >}}: {{< ui >}}Admin Console{{< /ui >}} の {{< ui >}}Data{{< /ui >}} タブは、アプリ内のすべてのコンポーネントとクエリのプロパティと値を提供します。

{{% collapse-content title="アプリの状態" level="h3" %}}
{{< ui >}}App State{{< /ui >}} にアクセスするには:
1. 左側のサイドパネルで {{< ui >}}App Properties{{< /ui >}} をクリックします。
1. {{< ui >}}App State{{< /ui >}} セクションまで下にスクロールします。

{{< img src="actions/app_builder/app-state-2.png" alt="アプリプロパティの [App State] (アプリの状態) セクション" style="width:50%;" >}}
{{% /collapse-content %}}

{{% collapse-content title="Inspect Data" level="h3" %}}
{{< ui >}}Inspect Data{{< /ui >}} にアクセスするには:
1. 検査するクエリまたはコンポーネントをクリックします。
1. {{< ui >}}Inspect Data{{< /ui >}} セクションまで下にスクロールします。

{{< img src="actions/app_builder/inspect-data-2.png" alt="アプリプロパティの [App State] (アプリの状態) セクション" style="width:80%;" >}}
{{% /collapse-content %}}

{{% collapse-content title="Admin Console" level="h3" %}}
{{< ui >}}Admin Console{{< /ui >}} にアクセスするには:
1. 歯車 ({{< ui >}}Settings{{< /ui >}}) アイコンをクリックし、[{{< ui >}}Admin Console{{< /ui >}}] を選択します。
1. [{{< ui >}}Data{{< /ui >}}] をクリックします。

{{< img src="actions/app_builder/admin-console-2.png" alt="アプリプロパティの [App State] (アプリの状態) セクション" style="width:50%;" >}}
{{% /collapse-content %}}

## カスタムコンポーネントのインタラクション {#custom-component-interactions}

ほとんどの UI コンポーネントには、基本的なアプリの使用をカバーするトグルやテキストの配置などの組み込みオプションが用意されています。コンポーネントにカスタムインタラクションを追加するには、コードエディターのシンボル ({{< ui >}}</>{{< /ui >}}) をクリックし、JS 式を入力します。

### 条件付き表示 {#conditional-visibility}

コンポーネントの可視性を他のコンポーネントに依存させることができます。

たとえば、`textInput0` と `textInput1` という名前の 2 つのテキスト入力コンポーネントに値がある場合にのみテキストコンポーネントを表示したい場合は、{{< ui >}}Is Visible{{< /ui >}} プロパティで `${textInput0.value && textInput1.value}` という式を使用します。

### 条件付きでコンポーネントを無効にする {#disable-a-component-conditionally}

可視性と同様に、他のコンポーネントやアプリのコンテキストなど、アプリの他の側面によって条件が満たされない限り、コンポーネントを無効にすることができます。

#### 可視性に基づいてコンポーネントを無効にする {#disable-a-component-based-on-visibility}

アプリにテキストコンポーネントの内容を使用してメッセージを送信するボタンがある場合、そのテキストコンポーネントが表示されていない限り、ボタンを無効にすることができます。
1. キャンバス上のボタンコンポーネントをクリックします。
1. {{< ui >}}Is Disabled{{< /ui >}} プロパティの横にあるコードエディターのシンボル ({{< ui >}}</>{{< /ui >}}) をクリックします。
1. 式 `${!text0.isVisible}` を追加します。

両方のテキスト入力フィールドに内容がある場合を除き、テキストコンポーネントは非表示になり、ボタンは無効になります。

{{< img src="actions/app_builder/is-disabled.png" alt="両方のテキスト入力フィールドに内容がある場合を除き、テキストコンポーネントは非表示になり、ボタンは無効になります。" style="width:100%;" >}}

#### アプリのコンテキストに基づいてコンポーネントを無効にする {#disable-a-component-based-on-the-app-context}

また、ユーザーが所属するチームなど、アプリのコンテキストに基づいてコンポーネントを無効にすることもできます。

たとえば、製品管理チームに所属するユーザーに対してのみコンポーネントを有効にすることができます。
1. キャンバス上のボタンコンポーネントをクリックします。
1. {{< ui >}}Is Disabled{{< /ui >}} プロパティの横にあるコードエディターのシンボル ({{< ui >}}</>{{< /ui >}}) をクリックします。
1. 式 `${global.user.teams[0].name == 'Product Management'}` を追加します。

### 読み込み中はコンポーネントを無効にする {#disable-a-component-while-loading}

もう一つの一般的なユースケースは、クエリが読み込み状態の間はコンポーネントを無効にすることです。[EC2 管理ブループリント][3] では、`listInstances` クエリの読み込み中、`instanceType` 選択コンポーネントが無効になります。これを実現するために、{{< ui >}}Is Disabled{{< /ui >}} プロパティは式 `${listInstances.isLoading}` を使用します。

{{< img src="actions/app_builder/isloading.png" alt="'instanceType' 選択コンポーネントは、'listInstances' クエリの読み込み中は無効になります。" style="width:100%;" >}}

## カスタムクエリのインタラクション {#custom-query-interactions}

コンポーネントと同様に、JS 式を使用してユーザーの操作に基づきクエリを変更できます。

### ユーザー入力に基づいてクエリ結果をフィルタリングします {#filter-query-results-on-user-input}

[PagerDuty On-call Schedules ブループリント][4] は、ユーザーからの入力に基づいて `listSchedules` クエリの結果をフィルタリングします。ユーザーは `team` および `user` の選択コンポーネントからチームとユーザーを選択します。

`listSchedules` クエリ内では、以下のクエリ後変換によって、`team` および `user` の値に基づいて結果がフィルタリングされます。

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

クエリの {{< ui >}}Run Settings{{< /ui >}} を {{< ui >}}Auto{{< /ui >}} に設定すると、ユーザーが `team` または `user` コンポーネント内の値を変更するたびにクエリが実行されるようになります。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/actions/app_builder/queries/#post-query-transformation
[3]: https://app.datadoghq.com/app-builder/apps/edit?viewMode=edit&template=ec2_instance_manager
[4]: https://app.datadoghq.com/app-builder/apps/edit?viewMode=edit&template=pagerduty_oncall_manager