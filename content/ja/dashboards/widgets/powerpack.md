---
disable_toc: false
further_reading:
- link: /dashboards/guide/powerpacks-best-practices/
  tag: Guide
  text: Scale Graphing Expertise with Powerpacks
- link: https://www.datadoghq.com/blog/standardize-dashboards-powerpacks-datadog/
  tag: Blog
  text: Save dashboard widgets in reusable groups with Powerpacks
- link: /dashboards/widgets/group/
  tag: Documentation
  text: Group Widget
- link: /dashboards/graphing_json/
  tag: Documentation
  text: Building Dashboards using JSON
title: Powerpack Widget
---

## 概要

<div class="alert alert-info">パワーパックウィジェットはスクリーンボードではサポートされていません。</div>

パワーパックは、再利用可能なダッシュボードの構成要素として、グラフ作成の専門知識を拡張するウィジェットのテンプレート化されたグループです。パワーパックは、プリセット (Datadog が作成し、すべてのお客様が利用可能) またはカスタム (ユーザーが作成し、組織内でのみ利用可能) のいずれかです。パワーパックのベストプラクティスの詳細については、 [パワーパックでグラフ作成の専門知識を拡張する][1]ガイドを参照してください。

## セットアップ

### パワーパックの作成

ダッシュボードの既存のグループからパワーパックを作成します。

{{< img src="dashboards/widgets/powerpack/group_header_icons.png" alt="Save as Powerpack アイコンオプションをハイライトしたダッシュボードグループヘッダーアイコン" style="width:80%;" >}}

1. ダッシュボードグループのヘッダーから、"Save as Powerpack" アイコンをクリックします。
1. 組織に公開するパワーパックの詳細を記入してください。
1. パワーパックを整理するために "Add Search Categories" の下にタグを追加します。これにより、チームメンバーは自分のダッシュボードに追加する正しいパワーパックを見つけることができます。
1. パワーパックのユーザーに構成可能なフィルターを選択します。

**注**: パワーパックを作成すると、元のグループはパワーパックのインスタンスに置き換えられます。

### パワーパックの更新

パワーパックへの変更は、パワーパックが使用されているすべてのダッシュボードで同期されます。

パワーパックの外観やレイアウトを変更するには
1. ヘッダーにカーソルを合わせ、ケバブメニューをクリックします。
1. パワーパックアクションメニューから **Edit Powerpack Layout** を選択します。
1. パワーパックのレイアウトや個々のウィジェットに必要な変更を加え、**Confirm Changes** を選択します。
1. このパワーパックが複数のダッシュボードで使用されている場合、この更新の影響を受けるパワーパックのインスタンスを確認するプロンプトが表示されます。

{{< img src="dashboards/widgets/powerpack/powerpack_actions_menu.png" alt="パワーパックヘッダーのケバブからアクセスするパワーパックとパワーパックインスタンスを更新するアクションメニューオプション" style="width:80%;" >}}

パワーパックの詳細を変更するには
1. ヘッダーにカーソルを合わせ、ケバブメニューをクリックします。
1. パワーパックアクションメニューから **Edit Powerpack Details** を選択します。
1. パワーパック情報、検索カテゴリー、フィルター構成を変更し、**Update Powerpack** を選択します。
1. このパワーパックが複数のダッシュボードで使用されている場合、この更新の影響を受けるパワーパックのインスタンスを確認するプロンプトが表示されます。

**注**: パワーパックの更新や権限の変更を行うには、[編集権限](#powerpack-permissions)が必要です。

## パワーパックの使用

### パワーパックインスタンスの追加
パワーパックを作成すると、そのパワーパックのインスタンスを複数のダッシュボードに追加できます。

パワーパックインスタンスをダッシュボードに追加するには
1. 利用可能なパワーパックを検索するには、ウィジェットトレイの "Powerpacks" タブをクリックします。定義済みのタグだけでなく、テキストでも検索できます。
1. ダッシュボードに追加したいパワーパックをクリックして、パワーパックインスタンスの構成を開きます。
1. フィルターの値とフィルターの制御方法を選択します。
    * パワーパックフィルター - 選択された値は、パワーパックインスタンス内のウィジェットに適用されます。
    * ダッシュボードフィルター - ダッシュボードテンプレート変数によって制御されます。
1. **Confirm** をクリックします。

### パワーパックインスタンスのカスタマイズ

パワーパックインスタンスへの変更は、他のダッシュボードの他のパワーパックインスタンスには適用**されません**。

ダッシュボードに表示されるパワーパックインスタンスをカスタマイズするには
1. インスタンスヘッダーのケバブメニューをクリックします。
1. インスタンスアクションメニューから **Edit Display Options** を選択します。
1. ヘッダーの新しいスタイルオプションを選択したり、グループタイトルを更新したり、パワーパックで使用するフィルターを構成したりできます。
1. パワーパックインスタンスのタグ値を構成します。ダッシュボードのテンプレート変数として使用するには、**Add to dashboard** をチェックします。

{{< img src="dashboards/widgets/powerpack/instance_configuration_modal.png" alt="パワーパックインスタンスの構成オプション" style="width:100%;" >}}

## パワーパック権限

パワーパックの編集権限を変更するには
1. ヘッダーにカーソルを合わせ、ケバブメニューをクリックします。
1. パワーパックアクションメニューから **Modify Permissions** を選択します。
1. どのユーザーがパワーパックの編集権限を持つかを更新します。

## API

このウィジェットは **[Dashboards API][2]** で使用できます。[ウィジェット JSON スキーマ定義][3]については、以下の表を参照してください。

{{< dashboards-widgets-api >}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/dashboards/guide/powerpacks-best-practices/
[2]: /ja/api/latest/dashboards/
[3]: /ja/dashboards/graphing_json/widget_json/