---
description: 入力パラメーターを使用すると、同じアプリを複数のダッシュボードやノートブックに埋め込み、インスタンスごとに異なる構成を使用できます。
disable_toc: false
title: 入力パラメーター
---
入力パラメーターを使用すると、同じアプリを複数のダッシュボードやノートブックに埋め込み、インスタンスごとに異なる構成を使用できます。

## アプリ例 {#example-app}

入力パラメーターの一般的な使用例は、dev、staging、production などのさまざまな環境に合わせてアプリを再利用およびカスタマイズすることです。下のスクリーンショットでは、1 つのアプリがダッシュボードに 2 回埋め込まれています。左側のアプリはデモ環境のモニターを表示し、右側のアプリはステージング環境のモニターについて同じ情報を表示しています。ブループリント [How to: Input Parameters][3] を複製して、このアプリを自由に試すことができます。

{{< img src="/actions/app_builder/embedded_apps/example-input-parameters-dashboard.png" alt="異なる入力パラメーターが選択された 2 つの埋め込みアプリ" style="width:100%;" >}}

## 入力パラメーターの作成 {#create-an-input-parameter}

1. [App Builder][1] でアプリを選択し、{{< ui >}}Edit{{< /ui >}} をクリックします。
1. {{< ui >}}App Properties{{< /ui >}} アイコンをクリックします ({{< img src="actions/app_builder/embedded_apps/app_properties_icon.png" inline="true" width="12px" style="position:relative; bottom:1px;">}})。
1. プラスアイコン (<i class="icon-plus-2" style="position:relative; top:2px;font-size: 12px; max-width: 12px"></i>) をクリックして、入力パラメーターを追加します。
1. 新しい入力パラメーターをクリックして、その要素を構成します。
    - {{< ui >}}Parameter Name{{< /ui >}}
    - {{< ui >}}Display Name{{< /ui >}} (オプション) 
    - {{< ui >}}Data Type{{< /ui >}}
    - {{< ui >}}Allowed Values{{< /ui >}}
    - {{< ui >}}Default Value{{< /ui >}}
    - {{< ui >}}Description{{< /ui >}} (オプション) 
1. {{< ui >}}Save{{< /ui >}} をクリックします。

### 入力パラメーターの例 {#example-input-parameter}

この入力パラメーターの例では、さまざまなステージング環境で同じアプリを表示しています。

{{< img src="/actions/app_builder/embedded_apps/example-input-parameters-configuration.png" alt="アプリ内で構成された入力パラメーターの例" style="width:35%;" >}}

## 入力パラメーターの使用 {#use-input-parameters}

<div class="alert alert-info">入力パラメーターを持つアプリは、ダッシュボードやノートブックで最適に機能します。アプリを Self-Service Actions に追加することはできますが、構成した入力パラメーターを選択することはできません。
</div>

入力パラメーターを持つアプリを埋め込むには、

1. [App Builder][1] で、入力パラメーターが構成されているアプリを選択します。
1. {{< ui >}}Add to a dashboard{{< /ui >}} をクリックします。
1. ダッシュボードを選択し、{{< ui >}}Save and Open{{< /ui >}} をクリックします。
1. ダッシュボードで、アプリにカーソルを合わせ、{{< ui >}}Edit{{< /ui >}} アイコン ({{< img src="icons/pencil.png" inline="true" style="width:14px;">}}) をクリックします。
1. {{< ui >}}Input Parameters{{< /ui >}} セクションで、入力パラメーターを選択します。
{{< img src="/actions/app_builder/embedded_apps/example-input-params-configuring-in-dashboard.png" alt="入力パラメーターが丸で囲まれた編集モードのアプリの例" style="width:80%;" >}}
1. {{< ui >}}Save{{< /ui >}} をクリックします。

## アプリの再利用 {#reuse-an-app}

アプリをダッシュボードやノートブックに埋め込んだ後、コピーを作成して異なるコンテキストで再利用できます。
1. 埋め込みアプリを選択します。
1. {{< ui >}}Options{{< /ui >}} アイコン (<i class="icon-kebab-wui" style="position:relative; top:2px;font-size: 12px; max-width: 12px"></i>) をクリックし、{{< ui >}}Clone{{< /ui >}} をクリックします。
    - または、アプリを選択してコピー＆ペーストのキーボードショートカットを使用することもできます。
1. [上記][2]の手順に従って、別の入力パラメーターを選択します。

[1]: https://app.datadoghq.com/app-builder/apps/list
[2]: /ja/actions/app_builder/embedded_apps/input_parameters/#use-input-parameters
[3]: https://app.datadoghq.com/app-builder/apps/edit?template=how_to_input_parameters&viewMode=templatePreview