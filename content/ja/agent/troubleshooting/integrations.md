---
title: インテグレーションの稼働
kind: documentation
aliases:
  - /ja/integrations/faq/issues-getting-integrations-working
---
Datadog には、Agent の YAML ファイルからセットアップを行う[インテグレーション][1]があります。

以下は、インテグレーションのインストールに関する簡単なトラブルシューティングガイドです。

1. [info コマンド][2]を実行します。
2. [info コマンド][2]にインテグレーションが表示されますか？

    **表示されない場合**

      1. コンフィギュレーションファイルをチェックし、保存場所と名前が正しいことを確認します。
      2. YAML パーサーでコンフィギュレーションファイルをチェックし、構文が正しいことを確認します。サンプルファイルはこちらから確認できます。
      3. ファイルを移動または変更した場合は、[Agent を再起動][3]し、info コマンドを再度実行して表示を確認します。

    **表示される場合**

      1. Metrics Explorer をチェックし、ホストのシステムメトリクスが表示されているか確認します。たとえば、Agent を実行しており、そのインテグレーションセットアップを含むホストの `system.cpu.user` を探します。
      2. それでもメトリクスが表示されない場合は、エラーログを確認し、info コマンドのアウトプットと共にエラーログを [Datadog サポートチーム][4]まで送信してください。

[1]: /ja/integrations
[2]: /ja/agent/guide/agent-commands/#agent-status-and-information
[3]: /ja/agent/guide/agent-commands/#start-stop-restart-the-agent
[4]: /ja/help