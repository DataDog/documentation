---
last_modified: 2015/04/02
translation_status: complete
language: ja
title: ダッシュボードのテンプレートの作成方法
kind: guide
listorder: 10
sidebar:
  nav:
    - header: ダッシュボードの設定ガイド
    - text: テンプレート機能を有効にする
      href: "#new"
    - text: テンプレート変数の定義
      href: "#def"
    - text: グラフエディターでテンプレート変数を使う方法
      href: "#graph"

---

<!-- <p> Dashboard templating allows you to create dashboards that use variables like <code>$scope</code>
or <code>$redis</code> in place of specific tags or hosts. You can then dynamically explore the metrics
across different sets of tags. Simply select a new variable value in the dropdown menu, and that
value will apply across the dashboard.</p> -->

ダッシュボードのテンプレート機能を使用することによって、特定のタグ、ホスト名、デバイス名の代わりに`$scope` や`$redis`というのような変数を指定し、この変数をドロップダウンメニューで指定することによって、表示するグラフの要素を瞬時に切り替えることができるダッシュボードを組むことができます。

この機能を使うことにより、異なるタグの組み合わせを瞬時に切り替えて、システムの状況を多面的に把握することができるようになります。


<!-- <h3 id="new">Enabling dashboard templating</h3>
<p>To create a new templated dashboard, select the 'Use templated sources for metrics'
checkbox in the dashboard creation menu.</p>

<img src="/static/images/template_new_dash.png" style="width:100%; border:1px solid #777777" />

<p>To add templating to an existing dashboard, click the 'Toggle Templating' icon in an existing dashboard.</p>

<img src="/static/images/toggle_templating.png" style="width:100%; border:1px solid #777777" /> -->

<h3 id="new">テンプレート機能を有効にする</h3>

テンプレート機能を有効にしたダッシュボードを作成するには、`Dashborads` - `New Dashboard` とタブをクリックし、表示された"Create a new Dashboard" ポップアップの中で、他の入力と共に`Use templated sources for metrics`の部分にチェックマークをつけます。

<img src="/static/images/template_new_dash.png" style="width:100%; border:1px solid #777777" />

既存のダッシュボードにテンプレート機能を追加するには、ダッシュボード右上の`Toggle Templating` アイコンをクリックします。　

<img src="/static/images/toggle_templating.png" style="width:100%; border:1px solid #777777" />


<!-- <h3 id="def">Defining new template variables</h3>
<img src="/static/images/redis-tpl-panel.png" style="width:100%; border:1px solid #777777" />
<p>A template variable is defined by a name and optional parameters for 'Tag Group' and 'Default Tag.'  A tag group is a prefix shared among several tags, like <code>redis_port</code> for the tags <code>redis_port:6379</code> and <code>redis_port:6280</code>. Setting a tag group eliminates irrelevant tags from the variable's scope selector.
The 'Default Tag' option determines the initial value for the variable on dashboard load.</p> -->

<h3 id="def">テンプレート変数の定義</h3>

<img src="/static/images/redis-tpl-panel.png" style="width:100%; border:1px solid #777777" />

テンプレート変数は、名前とパラメータの組み合わせで定義されます。
パラメータは、"タググループ"とそのグループに含まれている"初期タグ"の組み合わせで指定します。
タググループの`redis_port`は、`redis_port:6379` や`redis_port:6280`のように、システム内で横断的に使用しているタグの接頭文字列です。
タググループを指定することで、テンプレート変数セレクタのドロップダウンメニューに表示される項目を制限することができます。
又、初期タグは、ダッシュボードのロード時に処理されるメトリクスの検索方法の初期値を指定しています。


<!-- <h3 id="graph">Using template variables in graph editors</h3>
<img src="/static/images/redis-tpl-graph-editor.png" style="width:70%; border:1px solid #777777" />
<p>Once defined, template variables appear alongside normal tag and host options in graph editors.  If you set <code>redis_port:6379</code> as the value of <code>$redis</code>, all graphs defined with <code>$redis</code> will be scoped to <code>redis_port:6379</code>.
</p>
<img src="/static/images/redis-tpl-selector.png" style="width:70%; border:1px solid #777777" /> -->

<h3 id="graph">グラフエディターでテンプレート変数を使う方法</h3>

<img src="/static/images/redis-tpl-graph-editor.png" style="width:70%; border:1px solid #777777" />

設定したテンプレート変数は、一般的なタグ、ホスト名、デバイス名などと共にグラフエディターに表示されるようになります。

<img src="/static/images/redis-tpl-selector.png" style="width:70%; border:1px solid #777777" />

ダッシュボード上のテンプレート変数セレクタで、`$redis` (テンプレート変数)に、`redis_port:6379`を指定すると、グラフエディターで`$redis` と指定してあるグラフは全て`redis_port:6379` を基にしたグラフに書き換えられます。
