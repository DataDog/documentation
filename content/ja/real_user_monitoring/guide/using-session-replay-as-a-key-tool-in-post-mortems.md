---
further_reading:
- link: https://www.datadoghq.com/blog/analyze-user-experience-frustration-signals-with-rum/
  tag: blog
  text: Datadog フラストレーションシグナルによるユーザーのペインポイントの検出
- link: https://docs.datadoghq.com/notebooks/
  tag: documentation
  text: ノートブック
title: セッションリプレイをポストモーテムのキーツールとして活用する
---

## 概要

セッションリプレイは、ユーザー分析とエラーの視覚的な再現の間のギャップを埋めるものです。このガイドでは、デベロッパーがポストモーテムをドキュメント化する際に、視覚的な補助としてセッションリプレイを活用する方法を例として説明します。

## RUM を使って、ユーザーの問題がどの程度広がっているかを確認する

この例では、多くのユーザーが **Checkout** ボタンをクリックしたときに問題が発生したと訴えていることに気づきました。[RUM フラストレーションシグナルダッシュボード][1]を調査した結果、このエラータイプがわずか 1 週間で 3,000 件近く発生していることが RUM エクスプローラーで確認されました。

{{< img src="real_user_monitoring/guide/using-session-replay-in-post-mortems/identify-widespread-user-issue-1.png" alt="RUM を使用して、あるエラータイプのインスタンスが 1 週間に何回発生したかを特定する" style="width:100%;">}}

## セッションリプレイでユーザーの問題を見る
上記のクエリからセッションをクリックした後、セッションリプレイを見ることで、このエラーの発生をライブで確認し、その前後でユーザーが何をしたかを観察することができます。

{{< img src="real_user_monitoring/guide/using-session-replay-in-post-mortems/watch-user-issue.png" alt="セッションリプレイでユーザーの問題体験を確認する" style="width:100%;">}}

## ノートブックへの共有
この問題を調査している他のチームメンバーがこのコンテキストを見ることができるように、共有ボタンを使ってこの特定のセッションリプレイをノートブックに共有することができます。

{{< img src="real_user_monitoring/guide/using-session-replay-in-post-mortems/share-to-notebook.png" alt="セッションリプレイのビデオをポストモーテムノートブックに保存して共有する" style="width:60%;">}}

セッションリプレイをノートブックに送信することで、解説を加えたり、このインシデントの他のテレメトリーデータを分析したり、ポストモーテムをドキュメント化したりすることができます。

**注**: ポストモーテムノートブックのテンプレートが[こちら][2]にあります。

## ポストモーテムのドキュメント化
リプレイをノートブックに共有した後、調査のドキュメントを作成することができます。

{{< img src="real_user_monitoring/guide/using-session-replay-in-post-mortems/document-the-post-mortem.png" alt="ノートブックでは、リプレイの動作に関するコンテキストを追加したり、適切なグラフを含めたり、コメントで関係者をタグ付けしたりします" style="width:100%;">}}

リプレイの動作に関するコンテキストを追加し、影響を受けたユーザーの総数など、問題を最適に表現するために適切なグラフをもたらすことができます。

また、ノートブックにコメントを追加することで、見るべき関係者をタグ付けすることができます。このケースでは、この機能を担当するプロダクトマネージャーをタグ付けし、バックログに修正が追加されたことを確認しています。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/blog/analyze-user-experience-frustration-signals-with-rum/
[2]: https://app.datadoghq.com/notebook/template/7/postmortem-ir-xxxx-outage-name