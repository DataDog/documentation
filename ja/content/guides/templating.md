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

<!-- <h3 id="def">Editing template variables</h3>
<p>To create, edit, and delete template variables click the gear icon at the upper right-hand side of the screen, then select 'Edit Template Variables' from the actions menu.</p>
{{< img src="guides/templating/edit-template-variables.png" >}}

<p>This will open the template variable editing panel.</p>

{{< img src="guides/templating/redis-template-var.png" >}}
<p>A template variable is defined by a name and optional parameters for 'Tag Group' and 'Default Tag.'
A tag group is a prefix shared among several tags, like <code>redis_port</code> for the tags <code>redis_port:6379</code> and <code>redis_port:6380</code>.
Setting a tag group eliminates irrelevant tags from the variable's scope selector, and removes the prefix from the listed values for clarity - so you'll see
<code>6379</code> and <code>6380</code> in the 'Default Tag' dropdown instead.
The 'Default Tag' option determines the initial value for the variable on dashboard load.</p> -->

### テンプレート変数の編集

テンプレート変数を設定、編集、削除するには、ダッシュボード右上隅の歯車のアイコンをクリックし、アクションメニューから'Edit Template Variables'を選択します。

{{< img src="guides/templating/edit-template-variables.png" >}}

この選択により、テンプレート変数エディターを表示します。

{{< img src="guides/templating/redis-template-var.png" >}}

テンプレート変数は、名前と'Tag Group'と'Default Tag'のオプションパラメーターで定義されています。
タググループは、複数のタグに渡り設定されているプレフィックスで、`redis_port:6379`タグや`redis_port:6380`タグの場合の`redis_port`にあたります。
タググループを設定することによって、変数スコープセレクタから不適切なタグを排除することができます。更にリスト内でプレフィックスを非表示にし、視認性を確保します。結果、`6379`や`6380`というような数字が'Default Tag'がドロップダウンメニューに表示されるようになります。
'Default Tag'は、ダッシュボードをロードした際のテンプレート変数のデフォルト値になります。

<!-- <h3 id="graph">Using template variables in graph editors</h3>
{{< img src="guides/templating/redis-tpl-graph-editor.png" >}}
<p>Once defined, template variables appear alongside normal tag and host options in graph editors.  If you set <code>6379</code> as the value of <code>$redis</code>, all graphs defined with <code>$redis</code> will be scoped to <code>redis_port:6379</code>.
</p>
{{< img src="guides/templating/redis-tpl-selected.png" >}} -->

### グラフエディターでテンプレート変数を使う方法

{{< img src="guides/templating/redis-tpl-graph-editor.png" >}}

<!-- Once defined, template variables appear alongside normal tag and host options in graph editors.  If you set <code>6379</code> as the value of <code>$redis</code>, all graphs defined with <code>$redis</code> will be scoped to <code>redis_port:6379</code>. -->

テンプレート変数を設定すると、そのテンプレート変数は一般的なタグ、ホスト名、デバイス名などと共にグラフエディターに表示されるようになります。

{{< img src="guides/templating/redis-tpl-selected.png" >}}

`$redis`の値として`6379`を設定すると、`redis`を指定したすべてのグラフは、`redis_port:6379` を基にしたグラフに書き換えられます。
