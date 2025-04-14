---
aliases:
- /ja/observability_pipelines/guide/sensitive_data_scanner_transform/
disable_toc: false
further_reading:
- link: /observability_pipelines/legacy/setup/
  tag: ドキュメント
  text: 観測可能性パイプラインを設定する
- link: /observability_pipelines/legacy/working_with_data/
  tag: ドキュメント
  text: 観測可能性パイプラインのデータの操作
is_beta: true
private: true
title: (レガシー) Sensitive Data Scanner 変換
---

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLSfnNnV823zAgOCowCYuXJE5cDtRqIipKsYcNpaOo1LKpGfppA/viewform" btn_hidden="false" header="Request Access!">}}
 <code>sensitive_data_scanner</code> トランスフォームは非公開ベータ版です。
{{< /callout >}}

## 概要

クレジットカード番号、銀行ルーティング番号、API キーなどの機密データがログに意図せずに表示されると、組織が財務上およびプライバシー上のリスクにさらされる可能性があります。Observability Pipelines の `sensitive_data_scanner` 変換を使用して、データを異なる宛先にルーティングする前に、機密情報の識別、タグ付け、およびオプションとして機密情報のマスキングやハッシュ化を行います。すぐに使えるスキャンルールを使用して、メールアドレス、クレジットカード番号、API キー、認可トークンなどの一般的なパターンを検出できます。または、正規表現パターンを使用して機密情報に一致するカスタムスキャンルールを作成することもできます。

## `sensitive_data_scanner` 変換をセットアップする

1. [Observability Pipelines][1] に移動します。
1. パイプラインをクリックします。
1. **Edit as Draft** をクリックします。
1. **+ Add Component** をクリックします。
1. **Transforms** タブを選択します。
1. **Sensitive Data Scanner** タイルをクリックします。
1. コンポーネントの名前を入力します。
1. 変換の入力を 1 つ以上選択します。
1. **Add a New Item** をクリックして、データ内のどの機密情報を一致させるかを決定するスキャンルールを追加します。
1. ルールの名前を入力します。
1. **Define action on match** セクションで、一致した情報に対して実行するアクションを選択します。**注**: マスキング、部分的なマスキング、およびハッシュ化はすべて元に戻せないアクションです。
    - 情報をマスキングする場合は、一致したデータを置き換えるテキストを指定します。
    - 情報を部分的にマスキングする場合は、マスキングする文字数を指定し、一致したデータのどの部分をマスキングするかを指定します。
    - **注:** ハッシュ化を選択した場合、一致した UTF-8 バイトは farmhash の 64 ビットフィンガープリントでハッシュ化されます。
1. **Pattern** セクションで、
    - カスタムのスキャンルールを作成するには
      a. **type** ドロップダウンメニューで **Custom** を選択します。
      b. **Define regex** フィールドに、データに対して確認する正規表現パターンを入力します。詳細は、[カスタムルールに正規表現を使用する](#using-regex-for-custom-rules)を参照してください。
    - すぐに使えるスキャンルールを使用するには
      a. **type** ドロップダウンメニューで **Library** を選択します。
      b. **Name** ドロップダウンメニューで使用するスキャンルールを選択します。
1. **Scan entire event or portion of it** セクションで
   a. **Target** ドロップダウンメニューで、**Entire Event** (イベント全体) か **Specific Attributes** (特定の属性) のいずれかをスキャンするように選択します。
    - イベント全体をスキャンする場合、オプションで特定の属性をスキャン対象から除外できます。
    - 特定の属性をスキャンする場合は、スキャンする属性を指定します。
1. オプションで、一致したイベントに関連付ける 1 つ以上のタグを追加します。
1. 別のルールを追加する場合は、**Add a New Item** をクリックし、ステップ 10 から 14 に従います。
1. **Save** をクリックします。

**注**: 追加または更新したルールは、そのルールが定義された後に Observability Pipelines に流入するデータにのみ影響します。

### カスタムルールに正規表現を使用する

`sensitive_data_scanner` 変換は Perl Compatible RegEx (PCRE2) をサポートしていますが、次のパターンはサポートされていません。
  - 後方参照、およびサブマッチ文字列のキャプチャ (ルックアラウンド)
  - 任意のゼロ幅マッチ
  - サブルーチン参照および再帰的パターン
  - 条件付きパターン
  - バックトラック制御動詞
  - \C "シングルバイト" ディレクティブ (UTF-8 の文字列を分割)
  - \R 改行コードのマッチ
  - \K マッチの開始位置のリセットディレクティブ
  - コールアウトおよび埋め込みコード
  - アトミックグループおよび絶対最大量指定子

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/observability-pipelines