---
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/log-pipeline-scanner-datadog/
  tag: ブログ
  text: Datadog Log Pipeline Scanner でログ処理を調査する
- link: /logs/log_configuration/pipelines/
  tag: ドキュメント
  text: ログパイプラインについて
- link: /logs/log_configuration/processors/
  tag: ドキュメント
  text: ログプロセッサーについて
kind: ドキュメント
title: パイプラインスキャナー
---

## 概要

Log Pipeline Scanner を使用すると、ログパイプラインをリアルタイムでスキャンし、特定のログをトレースして、どのパイプラインと処理ルールがそのフィールドに変更を加えたかを特定できます。組織は、膨大なログの処理にログパイプラインに依存し、 各チームは、セキュリティ監視、コンプライアンス監査、DevOps など、特定のユースケースに合わせてログを再構築、リッチ化しています。

Pipeline Scanner を使用して、

- パースされていないログ、タグの欠落、ログ構造の予期せぬ変更など、ログ処理の問題をトラブルシューティングします。
- 競合する、または冗長な処理ルールを特定し、削除します。
- ログパイプラインを経由するログがセキュリティおよびコンプライアンス要件を満たしていることを確認します。

{{< img src="logs/log_configuration/pipeline_scanner/pipeline_scanner.png" alt="クエリに一致する 2 つのログ、選択されたログの詳細、クエリされたログを変更している 2 つのパイプラインを表示する Pipeline Scanner" style="width:80%;" >}}

## ログを変更しているパイプラインとプロセッサーの特定

Pipeline Scanner は、検索クエリに一致するログをサンプリングし、それらが通過している異なる処理ステップでアノテーションを付けます。これにより、ログに対するすべての変更を特定できるようになります。

1. [ログエクスプローラー][1]に移動します。
1. どのパイプラインやプロセッサーがログを変更しているかを調べたいログをクリックします。
1. パネル右上の Pipeline Scanner アイコンをクリックします。アイコンにカーソルを合わせると、`View pipelines for similar logs` と表示されます。
    または、ログパネルで属性をクリックし、**Scan pipelines for** を選択します。
1. [Pipeline Scanner][2] ページで、クエリをさらに絞り込むことができます。このクエリはセッション開始後に変更することはできません。
1. **Launch this session** をクリックします。
    次の 15 分間、クエリに一致するログには、どのパイプラインとプロセッサーがそれらのログを変更しているかという情報がタグ付けされます。スキャナーの Live Tail は、どのパイプラインといくつのパイプラインがそれぞれのログに一致するかを示します。
1. ログをクリックすると、そのログに一致するパイプラインとプロセッサーのリストが表示されます。Live Tail はこの時点で一時停止されます。

右側のパネルでパイプラインとプロセッサーを変更できます。変更した内容は、すでに処理されたログには影響しません。更新されたパイプラインとプロセッサーによって変更された新しいログを表示するには、**Play** をクリックします。

Pipeline Scanner には、ログパイプラインページからもアクセスできます。

1. [ログパイプライン][3]に移動します。
2. **Pipeline Scanner** をクリックします。
3. 検査したいログのクエリを定義します。

### 制限

Pipeline Scanner を使用するには `logs_write_pipelines` 権限が必要です。詳細は[ログ管理 RBAC 権限][4]を参照してください。

起動できるセッションの数には以下の制限があります。

- 同時セッションは最大 3 つ。
- 12 時間のスライディングウィンドウで最大 12 セッション。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs
[2]: https://app.datadoghq.com/logs/pipelines?query=source:*
[3]: https://app.datadoghq.com/logs/pipelines
[4]: /ja/account_management/rbac/permissions/#log-management