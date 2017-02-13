---
last_modified: 2015/04/02
translation_status: complete
language: ja
title: ダッシュボードのテンプレートの作成方法
kind: guide
listorder: 10
---

<!-- Dashboard templating allows you to create dashboards that use variables like <code>$scope</code>
or <code>$redis</code> in place of specific tags or hosts. You can then dynamically explore the metrics
across different sets of tags. Simply select a new variable value in the dropdown menu, and that
value will apply across the dashboard.
-->

ダッシュボードのテンプレート機能を使用することによって、特定のタグ、ホスト名、デバイス名を指定する代わりに`$scope` や`$redis`という変数を指定し、この変数をダッシュボード名下のドロップダウン メニューで切り替えることにより、グラフに表示する要素を瞬時に切り替えることができるダッシュボードを組むことができます。

この機能を使うことにより異なるタグの組み合わせを瞬時に切り替えることができ、瞬時に多面的にシステムの状況を把握することができるようになります。


<!-- ### Editing template variables
{:#def}

To create, edit, and delete template variables click the gear icon at the upper right-hand side of the screen, then select 'Edit Template Variables' from the actions menu.

![][1]
{:style="width:70%;"}

This will open the template variable editing panel.

![][2]
{:style="width:80%;"}

A template variable is defined by a name and optional parameters for 'Tag Group' and 'Default Tag.' A tag group is a prefix shared among several tags, like `redis_port` for the tags `redis_port:6379` and `redis_port:6380`. Setting a tag group eliminates irrelevant tags from the variable's scope selector, and removes the prefix from the listed values for clarity - so you'll see `6379` and `6380` in the 'Default Tag' dropdown instead. The 'Default Tag' option determines the initial value for the variable on dashboard load.
-->

### テンプレート変数の編集
{:#def}

テンプレート変数を設定、編集、削除するには、ダッシュボード右上隅の歯車のアイコンをクリックし、アクションメニューから'Edit Template Variables'  を選択します。

![][1]
{:style="width:70%;"}

テンプレート変数を編集するためのエディターが表示されます。

![][2]
{:style="width:80%;"}

テンプレート変数は、そのテンプレート変数名と'Tag Group'，'Default Tag' のパラメーターで定義します。
タググループは、複数のタグに渡り設定されているプレフィックスの部分になり、`redis_port:6379` タグや`redis_port:6380` タグの場合の`redis_port` にあたります。タググループを設定することによりセレクタから不適切なタグを排除することができ、更に、セレクター内でタグのプレフィックスを非表示にしタグ要素の視認性を向上させます。この効果の結果、`6379`や`6380`というような要素部分のみがのドロップダウンメニューに表示されるようになります。

'Default Tag'は、ダッシュボードをロードした際のテンプレート変数のデフォルト値になります。


<!-- ### Using template variables in graph editors
{:#graph}

![][3]
{:style="width:80%;"}
 -->

### グラフエディターでテンプレート変数を使う方法
{:#graph}

![][3]
{:style="width:80%;"}

<!-- Once defined, template variables appear alongside normal tag and host options in graph editors. If you set `6379` as the value of `$redis`, all graphs defined with `$redis` will be scoped to `redis_port:6379`.

![][4]
{:style="width:85%;"}
-->


テンプレート変数を設定すると、そのテンプレート変数は一般的なタグ、ホスト名、デバイス名などと共にグラフエディターに表示されるようになります。

![][4]
{:style="width:85%;"}

`$redis`の値として`6379`を設定すると、`redis`を指定した全てのグラフは、`redis_port:6379` を基にしたグラフに書き換えられます。

   [1]: /static/images/edit-template-variables.png
   [2]: /static/images/redis-template-var.png
   [3]: /static/images/redis-tpl-graph-editor.png
   [4]: /static/images/redis-tpl-selected.png
