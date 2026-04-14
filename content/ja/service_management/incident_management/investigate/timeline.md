---
further_reading:
- link: /service_management/incident_management/investigate/
  tag: ドキュメント
  text: インシデントの調査
title: タイムライン
---

## 概要

{{< img src="/service_management/incidents/investigate/timeline/timeline_tab.png" alt="Timeline タブを表示しているインシデントの例" style="width:100%;" >}}

Incident Timeline は、インシデント対応中に行われた作業の主要な情報源です。アクションが実行されるたびに、タイムラインに新しいセルが時系列順で追加され、変更内容、変更を行った人物、その時刻が記録されます。

デフォルトでは、タイムラインのセルは `oldest first` でソートされていますが、タイムライン上部のボタンを使用して `newest first` に変更できます。

## コンテンツ タイプ

各セルには、そのセルが保持する情報の種類を示すコンテンツ タイプが設定されています。

|  コンテンツ タイプ      | 説明                                                                                            |
| ------------------ | ------------------------------------------------------------------------------------------------------ |
| Responder note     | インシデントの対応者が手動で記述したノート。Responder note には次のサブタイプがあります。<br>- *Graph*: Datadog グラフを 1 つ以上含む<br>- *Link*: ハイパーリンクを含む<br>- *Code*: コード ブロック用 Markdown 構文で囲まれたテキストを含む
| Incident update    | ステータスや重大度を含むインシデントのプロパティ、またはその影響範囲に加えられた変更。
| Integration update | Incident Management 製品の [インテグレーション][1] 経由で行われた変更。
| Task               | Incident Details ページの **Remediation** セクションで行われたタスクの変更。
| Notification sent  | インシデント対応者が手動で通知を送信した際の更新。

### Responder notes

Incident Details ページのセクション タブ下にあるテキスト ボックスから、タイムラインへ直接 Responder note を追加できます。さらに、[Slack からタイムラインへ追加][2] することも可能です。ノート作成時にタイムスタンプを調整することで、タイムライン上の過去の適切な位置に重要な情報を残せます。

自身が作成した Responder note は、内容とタイムスタンプの編集や削除が行えます。また、特定セルへのリンクをコピーしてチーム メイトと共有することもできます。

### Graph セル

グラフ定義は、[Organization Settings][3] で共有 URL が有効になっている場合、その共有 URL で保存されます。グラフ セルがタイムラインに追加されてから 24 時間は、Dashboards や Notebooks などと同様のインタラクティブなホバー状態を利用できます。24 時間経過後は、グラフが表示していた内容を静的な画像として保存し、データ保持期間の短いグラフでも後から閲覧できるようにします。

### 画像

Datadog でホストする画像をアップロードするには、タイムライン上部のテキスト ボックスに画像ファイルをドラッグ & ドロップします。これにより、画像がタイムライン上の個別セルとして追加されます。

既存セルに画像を追加することも可能です:
{{< img src="/service_management/incidents/investigate/timeline/timeline_cell_add_image.png" alt="画像の説明" style="width:100%;" >}}
1. 鉛筆アイコンをクリックしてセルを編集します。
2. 画像アイコンをクリックし、ファイル ディレクトリから画像を選択します。
3. 以下のいずれかの方法で画像をアップロードできます。
    * アップロード エリアへ画像ファイルをドロップする
    * **Choose File** をクリックし、ファイル ディレクトリから画像を選択する
    * 画像の公開 URL を貼り付ける

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/service_management/incident_management/#integrations
[2]: /ja/integrations/slack/?tab=slackapplicationus#using-datadog-incidents
[3]: https://app.datadoghq.com/organization-settings/public-sharing/settings