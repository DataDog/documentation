---
aliases:
- /ja/intelligent_test_runner/troubleshooting
further_reading:
- link: /intelligent_test_runner
  tag: ドキュメント
  text: Test Impact Analysis について
title: Test Impact Analysis トラブルシューティング
---

## 概要

このページでは、Test Impact Analysis に関する問題のトラブルシューティングに役立つ情報を提供します。さらにヘルプが必要な場合は、[Datadog サポート][1]にお問い合わせください。

## Test Impact Analysis が動作していない

[Test Impact Analysis][2] は、コミット履歴と過去のテスト実行時のコードカバレッジ情報を分析し、どのテストを実行する必要があり、どのテストをスキップするのが安全かを判断することで動作します。Test Impact Analysis が正しく動作するためには、最小限の情報が存在する必要があります。

- テストを実行するホスト上で、`git` 実行可能ファイルが利用可能である必要があります。
- リポジトリには、過去 1 か月間に少なくとも 2 回のコミット履歴が必要です。
- 過去のコミットでテストコードカバレッジを収集している必要があり、これは Test Impact Analysis が有効になっているテスト実行で発生します。
- git clone にはコミット履歴とツリー履歴が含まれていなければなりません。Test Impact Analysis は、履歴を含まないシャロー git クローン (`git clone --depth=1`) をアンシャローしようとしますが、古いバージョンの git ではうまくいかないかもしれません。自動的なアンシャローには、一部の CI プロバイダーで追加のセットアップが必要になる場合があります(例えば、Harness CI では、パイプラインで確実に git コマンドを実行できるようにするために、[追加の構成][3]が必要です)。CI ジョブがシャロー git クローンを使用している場合は、次のコマンドを使用して部分的な git クローンを使用するように変更できます: `git clone --filter=blob:none`

これらの制限により、Test Impact Analysis を初めて有効にした場合、スキップされたテストが確認できず、コードカバレッジが自動的に収集されるため、テストの実行時間が通常より遅くなる場合があります。

Test Impact Analysis は、過去 1 か月間のコミット履歴とテストコードカバレッジ情報のみを考慮します。さらに、コミット後 1 週間以上経過したコードカバレッジ情報は考慮されません。

### GitHub の UI を通じてフォークを同期する

[GitHub の UI からフォークの同期を行う][4]と、生成された同期コミットに対してすべてのテストが実行されてしまいます。

### プルリクエストイベントによってトリガーされた GitHub Actions CI でカバレッジを収集する

GitHub Actions CI で [`pull_request` トリガー][5]を使用して実行されたテストは、そのプルリクエストのブランチ内でのその後のコミットではスキップされない場合があります。 このトリガーは、Test Impact Analysis では考慮されない新しいマージコミットを使用して変更を導入します。

### コミットをまとめてマージする

コミットをベースブランチに統合するために[まとめてマージ][6]すると、機能ブランチの git 履歴が失われることになります。その結果、Test Impact Analysis が最近機能ブランチでスキップされたベースブランチのテストをスキップしない可能性があります。

## Test Impact Analysis が誤ってテストをスキップしてしまう

Test Impact Analysis は、コードカバレッジに基づいてテストの影響度分析を行い、あるコミットやコミットのセットによってどのテストが影響を受けるかを判断します。この戦略は大部分のテストに有効ですが、Test Impact Analysis が実行すべきテストをスキップしてしまうシナリオも知られています。

- ライブラリの依存関係の変更。
- コンパイラーオプションの変更。
- 外部サービスの変更。
- データ駆動型テストにおけるデータファイルの変更。

これらのケースを含むコミットを作成する場合、Git のコミットメッセージのどこかに `ITR:NoSkip` (大文字小文字を区別しません) を追加すれば、Test Impact Analysis でテストスキップを強制的に無効にすることができます。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/help/
[2]: /ja/tests/test_impact_analysis/
[3]: https://developer.harness.io/kb/continuous-integration/articles/using_git_credentials_from_codebase_connector_in_ci_pipelines_run_step/
[4]: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork#syncing-a-fork-branch-from-the-web-ui
[5]: https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#pull_request
[6]: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/about-pull-request-merges#squash-and-merge-your-commits