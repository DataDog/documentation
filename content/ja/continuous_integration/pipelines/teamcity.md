---
aliases:
- /ja/continuous_integration/setup_pipelines/teamcity
further_reading:
- link: /continuous_integration/pipelines
  tag: ドキュメント
  text: パイプラインの実行結果とパフォーマンスを確認する
- link: /continuous_integration/troubleshooting/
  tag: ドキュメント
  text: トラブルシューティング CI
title: TeamCity パイプラインでトレースを設定する
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択したサイト ({{< region-param key="dd_site_name" >}}) では、現時点では CI Visibility は利用できません。</div>
{{< /site-region >}}

## 互換性

- **対応する TeamCity のバージョン**: 2021.2 以降

- **部分的なリトライ**: 部分的にリトライされたパイプライン実行を表示

- **キュー時間**: パイプラインのジョブが処理されるまでのキュー時間を表示

- **パイプラインの障害理由**: エラーメッセージからパイプラインの障害原因を特定

## Datadog インテグレーションの構成

[TeamCity][1] と Datadog CI Visibility のインテグレーションは、TeamCity プラグインで提供されています。
インテグレーションを有効にするには
1. TeamCity サーバーで、**Administration** -> **Plugins** -> **Browse Plugin Repository** にアクセスして、[Datadog CI Integration プラグイン][5]をダウンロードします。
2. まだ持っていない場合は、ビルドチェーンの最後のビルドとして [TeamCity 複合ビルド][6]を追加します。このビルドは、ビルドチェーンの現在の最後のビルドに依存し、他のビルドに依存しない必要があります。最後のビルドとして複合ビルドを持たないビルドチェーンは、プラグインによって無視されます。以下は、`Aggregating Results` が最後の複合ビルドである、期待されるビルドチェーンの一例です。
{{< img src="ci/teamcity_build_chain.png" alt="最後に複合ビルドがある TeamCity ビルドチェーン" style="width:90%;">}}
最終的な複合ビルドは、VCS Root がアタッチされ、[VCS Trigger][13] が設定され、バージョン管理設定が適切に行われている必要があります。
3. TeamCity プロジェクトでは、以下の構成パラメーターが必要です。
   * **datadog.ci.api.key**: [Datadog API キー][2]。
   * **datadog.ci.site**: {{< region-param key="dd_site" code="true" >}}。
   * **datadog.ci.enabled**: `true` (`false` を使用すると、特定のプロジェクトでプラグインを無効にすることができます)。

   これらの構成パラメーターは、TeamCity サブプロジェクトまたは [TeamCity ルートプロジェクト][10]のいずれかに追加することができます。ルートプロジェクトに追加すると、そのすべてのサブプロジェクトに伝搬されます。たとえば、すべてのプロジェクトでプラグインを有効にするには、ルートプロジェクトに **datadog.ci.enabled** を `true` という値で追加します。構成パラメーターの定義に関する詳細は、[TeamCity Project Hierarchy][9] のドキュメントを参照してください。
4. プラグインを有効にするには、**Administration** -> **Plugins** ページで **Enable uploaded plugins** をクリックします。
または、TeamCity サーバーを再起動します。

## Datadog でパイプラインデータを視覚化

パイプライン終了後、[Pipelines][3] と [Pipeline Executions][4] のページでデータを表示します。

**注**: Pipelines ページには、各リポジトリの[デフォルトブランチ][12]のデータのみが表示されます。

## Git ユーザー情報の構成

このプラグインは、[TeamCity ユーザー名スタイル][7]に基づいて、Git の作者名とメールを取得します。Datadog では、**Author Name and Email** または **Author Email** のいずれかのユーザー名スタイルを使用することを推奨しています。他のユーザー名スタイル (**UserId** または **Author Name**) のいずれかが使用されている場合、プラグインはユーザー名に `@Teamcity` を付加して、ユーザーのメールを自動的に生成します。例えば、**UserId** ユーザー名スタイルが使われていて、Git の作者のユーザー名が `john.doe` の場合、プラグインは `john.doe@Teamcity` を Git 作者のメールとして生成します。ユーザー名スタイルは [VCS Roots][11] で定義されており、VCS Root 設定で変更することができます。

<div class="alert alert-danger"><strong>注:</strong> Git の作者メールアドレスは<a href="https://www.datadoghq.com/pricing/?product=ci-visibility#ci-visibility" target="_blank">請求</a>のために使用されるため、メールアドレスを提供しないユーザー名スタイル (<strong>UserId</strong> または <strong>Author Name</strong>) を使用すると、コストが発生する可能性があります。使用例についてご質問がある場合は、<a href="https://docs.datadoghq.com/help/" target="_blank">Datadog のサポートチームまでご連絡ください</a>。
</div>

## プラグインリポジトリ

Datadog CI Integration プラグインの[ソースコード][8]は、Apache 2.0 ライセンスでオープンソース化されています。

## トラブルシューティング

Datadog CI Integration プラグインによって生成されたすべてのログは `teamcity-server.log` ファイルに保存され、TeamCity Server から **Administration** -> **Diagnostic** -> **Server Logs** にアクセスしてアクセスすることが可能です。これらのログを確認することで、プラグインに関する問題についての追加情報を得ることができます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.jetbrains.com/teamcity/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/ci/pipelines
[4]: https://app.datadoghq.com/ci/pipeline-executions
[5]: https://plugins.jetbrains.com/plugin/20852-datadog-ci-integration
[6]: https://www.jetbrains.com/help/teamcity/composite-build-configuration.html
[7]: https://www.jetbrains.com/help/teamcity/git.html#General+Settings
[8]: https://github.com/DataDog/ci-teamcity-plugin
[9]: https://www.jetbrains.com/help/teamcity/project.html#Project+Hierarchy
[10]: https://www.jetbrains.com/help/teamcity/project.html#Root+Project
[11]: https://www.jetbrains.com/help/teamcity/vcs-root.html
[12]: https://docs.datadoghq.com/ja/continuous_integration/troubleshooting/#the-default-branch-is-not-correct
[13]: https://www.jetbrains.com/help/teamcity/configuring-vcs-triggers.html#Trigger+build+on+changes+in+snapshot+dependencies