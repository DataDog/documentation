---
title: GitLab パイプラインでトレースを設定する
kind: documentation
further_reading:
    - link: /continuous_integration/explore_pipelines
      tag: ドキュメント
      text: パイプラインの実行結果とパフォーマンスを確認する
    - link: /continuous_integration/troubleshooting/
      tag: ドキュメント
      text: トラブルシューティング CI
---


GitLab CI パイプラインのトレースを有効にするには、リリース `13.7.0` 以降、[機能フラグ][2]の下に隠れている[ネイティブインテグレーション][1]を使用することができます。

GitLab.com ユーザーであり、このインテグレーションを早期に採用したい場合は、GitLab で[サポートチケットを開き][3]、アカウントで Datadog インテグレーションを有効にすることをリクエストしてください。

独自の GitLab インストールを管理していて、バージョンが十分に新しい場合は、インストールの種類に応じて GitLab の [Rails Runner][4] を使用する次のコマンドを実行することで、機能フラグを自分で有効にできます。

Omnibus インストールの場合:

{{< code-block lang="shell" >}}
sudo gitlab-rails runner "Feature.enable(:datadog_ci_integration)"
{{< /code-block >}}

ソースからのインストールの場合:

{{< code-block lang="shell" >}}
sudo -u git -H bundle exec rails runner -e production "Feature.enable(:datadog_ci_integration)"
{{< /code-block >}}

[Kubernetes デプロイ][5]の場合:

{{< code-block lang="shell" >}}
kubectl exec -it <task-runner-pod-name> -- /srv/gitlab/bin/rails runner "Feature.enable(:datadog_ci_integration)"
{{< /code-block >}}

機能フラグを有効にしたら、インスツルメントするプロジェクトごとに **Settings > Integrations > Datadog** に移動して、プロジェクトごとにインテグレーションを構成します。アクティブとしてマークし、有効な [API キー][6]を貼り付けます。

__注:__ 現在サポートされているのは `datadoghq.com` のみです。

オプションのパラメーターがいくつかあります。
- _service_: この GitLab インスタンスのすべてのトレースのサービス名を設定します。デフォルトは `gitlab-ci` です。複数の GitLab インスタンスを使用している場合に便利です。
- _env_: この GitLab インスタンスのすべてのトレースに環境タグを設定します。環境ごとに GitLab インスタンスをグループ化する必要がある高度なセットアップで役立ちます。

*Test settings* ボタンを使用してインテグレーションをテストします。成功したら、*Save changes* をクリックしてインテグレーションのセットアップを完了します。

## Webhook を介したインテグレーション

ネイティブの Datadog インテグレーションを使用する代わりに、[Webhook][7] を使用してパイプラインデータを Datadog に送信できます。

**注**: 推奨されるアプローチで、積極的に開発されているのはネイティブの Datadog インテグレーションです。Webhook は、ネイティブの Datadog インテグレーションオプションを使用できない場合にのみ使用してください (たとえば、古いバージョンの GitLab を使用していて、アップグレードできない場合)。

リポジトリ (または GitLab インスタンス設定) の **Settings > Webhooks** に移動し、新しい Webhook を追加します。
* **URL**: `https://webhooks-http-intake.logs.datadoghq.com/v1/input/<API_KEY>` (ここの `<API_KEY>` は[こちら][6]で取得できます)
* **Secret Token**: 空白のままにします
* **Trigger**: `Job events` と `Pipeline events` を選択します。

カスタムの `env` または `service` パラメーターを設定するには、Webhook の URL でクエリパラメーターを使用します: `?env=<YOUR_ENV>&service=<YOUR_SERVICE_NAME>`

## Datadog でパイプラインデータを視覚化する

インテグレーションが正常に構成されたら、パイプラインが終了した後、[Pipelines][8] ページと [Pipeline Executions][9] ページの両方にデータの入力が開始されます。

**注**: Pipelines ページには、各リポジトリのデフォルトブランチのデータのみが表示されます。


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.gitlab.com/ee/integration/
[2]: https://docs.gitlab.com/ee/administration/feature_flags.html
[3]: https://support.gitlab.com/
[4]: https://docs.gitlab.com/ee/administration/operations/rails_console.html#using-the-rails-runner
[5]: https://docs.gitlab.com/ee/administration/troubleshooting/kubernetes_cheat_sheet.html#gitlab-specific-kubernetes-information
[6]: https://app.datadoghq.com/account/settings#api
[7]: https://docs.gitlab.com/ee/user/project/integrations/webhooks.html
[8]: https://app.datadoghq.com/ci/pipelines
[9]: https://app.datadoghq.com/ci/pipeline-executions
