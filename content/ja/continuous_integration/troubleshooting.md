---
title: CI の表示に関するトラブルシューティング
kind: documentation
---
### CI プロバイダーをインスツルメントしましたが、Datadog にデータが表示されません

1. 1 つ以上のパイプラインが実行を完了していることを確認します。パイプラインの実行情報は、完了しないと送信されません。
2. [Pipeline Executions][1] セクションに結果が表示されているかどうか確認します。[Pipelines][2] セクションには、git 情報があり、デフォルトのブランチで実行されたパイプラインのみが表示されます。
3. Jenkins をインスツルメントしている場合は、Datadog Agent がマスターホストで実行され、デフォルトの場所 (`localhost:8126`) で利用可能であることを確認します。
4. それでも結果が表示されない場合は、[サポートまでお問い合わせ][3]ください。トラブルシューティングのお手伝いをします。


### テストをインスツルメントしましたが、Datadog にデータが表示されません

1. [Test Runs][4] セクションに結果が表示されているかどうか確認します。[Tests][5] セクションには、git 情報を含むテストのみが表示されます。
2. テストをコンテナ内で実行している場合は、必要な CI プロバイダーの環境変数を転送していることを確認します。詳しくは、[Running tests inside a container][6] セクションをご確認ください。
3. Swift を除くすべての言語では、テストが実行されているホストで Datadog Agent が実行されている (`localhost:8126` でアクセス可能) ことを確認します。他のホスト名およびポートでアクセス可能な場合は、`DD_AGENT_HOST` で設定された適切なホスト名および `DD_AGENT_PORT` 環境変数の適切なポートでテストを実行していることを確認します。
4. それでも結果が表示されない場合は、[サポートまでお問い合わせ][3]ください。トラブルシューティングのお手伝いをします。


[1]: https://app.datadoghq.com/ci/pipeline-executions
[2]: https://app.datadoghq.com/ci/pipelines
[3]: /ja/help/
[4]: https://app.datadoghq.com/ci/test-runs
[5]: https://app.datadoghq.com/ci/test-services
[6]: /ja/continuous_integration/setup_tests/containers/