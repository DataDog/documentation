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
{{< site-region region="us,eu" >}}
## 互換性

サポートされている GitLab バージョン:
* GitLab.com (SaaS)
* GitLab >= 14.1 (セルフホスト)

追加のコンフィギュレーションでサポートされているその他のバージョン:
* GitLab >= 13.7.0 (セルフホスト)、`datadog_ci_integration` 機能フラグを有効にします。

## Datadog インテグレーションの構成

{{< tabs >}}
{{% tab "GitLab.com" %}}

インスツルメントするプロジェクトまたはグループごとに、**Settings > Integrations > Datadog** に移動して、[プロジェクト][1]または[グループ][2]のインテグレーションを構成します。

[1]: https://docs.gitlab.com/ee/user/admin_area/settings/project_integration_management.html#use-custom-settings-for-a-group-or-project-integration
[2]: https://docs.gitlab.com/ee/user/admin_area/settings/project_integration_management.html#manage-group-level-default-settings-for-a-project-integration
{{% /tab %}}
{{% tab "GitLab &gt;&equals; 14.1" %}}

インスツルメントするプロジェクトまたはグループごとに、**Settings > Integrations > Datadog** に移動して、[プロジェクト][1]または[グループ][2]のインテグレーションを構成します。

**Admin > Settings > Integrations > Datadog** に移動して、GitLab [インスタンス][3]レベルでインテグレーションをアクティブ化することもできます。

[1]: https://docs.gitlab.com/ee/user/admin_area/settings/project_integration_management.html#use-custom-settings-for-a-group-or-project-integration
[2]: https://docs.gitlab.com/ee/user/admin_area/settings/project_integration_management.html#manage-group-level-default-settings-for-a-project-integration
[3]: https://docs.gitlab.com/ee/user/admin_area/settings/project_integration_management.html#manage-instance-level-default-settings-for-a-project-integration
{{% /tab %}}
{{% tab "GitLab &lt; 14.1" %}}

`datadog_ci_integration` [機能フラグ][1]を有効にして、インテグレーションをアクティブ化します。インストールの種類に応じて、GitLab の [Rails Runner][2] を使用する次のコマンドのいずれかを実行します。

**Omnibus インストール**

{{< code-block lang="shell" >}}
sudo gitlab-rails runner "Feature.enable(:datadog_ci_integration)"
{{< /code-block >}}

**ソースインストールから**

{{< code-block lang="shell" >}}
sudo -u git -H bundle exec rails runner \
  -e production \
  "Feature.enable(:datadog_ci_integration)"
{{< /code-block >}}

**Kubernetes インストール**

{{< code-block lang="shell" >}}
kubectl exec -it <task-runner-pod-name> -- \
  /srv/gitlab/bin/rails runner "Feature.enable(:datadog_ci_integration)"
{{< /code-block >}}

次に、インスツルメントするプロジェクトごとに **Settings > Integrations > Datadog** に移動して、[プロジェクト][3]でインテグレーションを構成します。

<div class="alert alert-warning"><strong>注</strong>: GitLab の初期バージョンの<a href="https://gitlab.com/gitlab-org/gitlab/-/issues/335218">バグ</a>により、GitLab の UI でオプションが使用可能であっても、<strong>GitLab バージョン 14.1 未満</strong>では<strong>グループまたはインスタンス</strong>レベルで Datadog インテグレーションを有効にできません。</div>

[1]: https://docs.gitlab.com/ee/administration/feature_flags.html
[2]: https://docs.gitlab.com/ee/administration/operations/rails_console.html#using-the-rails-runner
[3]: https://docs.gitlab.com/ee/user/admin_area/settings/project_integration_management.html#use-custom-settings-for-a-group-or-project-integration
{{% /tab %}}
{{< /tabs >}}

インテグレーションコンフィギュレーション設定を入力します。

**Active**
: インテグレーションを有効にします。

**Datadog site**
: データを送信する [Datadog サイト][1]を指定します。<br/>
**デフォルト**: `datadoghq.com`<br/>
**選択したサイト**: {{< region-param key="dd_site" code="true" >}}<br/>
**可能な値**: `datadoghq.com`、`datadoghq.eu`

**API URL** (オプション)
: データを直接送信するために使用される API URL をオーバーライドできます。これは、高度なシナリオでのみ使用されます。<br/>
**デフォルト**: (空、オーバーライドなし)

**API key**
: データを送信するときに使用する API キーを指定します。Datadog の Integrations セクションの [APIs タブ][2]で生成できます。

**Service** (オプション)
: インテグレーションによって生成された各スパンにアタッチするサービス名を指定します。これを使用して、GitLab インスタンスを区別します。<br/>
**デフォルト**: `gitlab-ci`

**Env** (オプション)
: インテグレーションによって生成された各スパンに接続する環境 (`env` タグ) を指定します。これを使用して、GitLab インスタンスのグループを区別します (例: ステージングまたは本番)。<br/>
**デフォルト**: `none`

**Test settings** ボタンを使用してインテグレーションをテストできます (プロジェクトでインテグレーションを構成する場合にのみ使用できます)。成功したら、**Save changes** をクリックしてインテグレーションのセットアップを完了します。

{{< site-region region="us,eu" >}}
## Webhook を介したインテグレーション

ネイティブの Datadog インテグレーションを使用する代わりに、[Webhook][1] を使用してパイプラインデータを Datadog に送信できます。

<div class="alert alert-info"><strong>注</strong>: ネイティブの Datadog インテグレーションは、推奨されるアプローチであり、積極的に開発中のオプションです。</div>

リポジトリ (または GitLab インスタンス設定) の **Settings > Webhooks** に移動し、新しい Webhook を追加します。
{{< site-region region="us" >}}
* **URL**: `https://webhooks-http-intake.logs.datadoghq.com/api/v2/webhook/?dd-api-key=<API_KEY>` ここで、`<API_KEY>` は [Datadog API キー][1]です。
* **Secret Token**: 空白のままにします
* **Trigger**: `Job events` と `Pipeline events` を選択します。

[1]: https://app.datadoghq.com/account/settings#api
{{< /site-region >}}
{{< site-region region="eu" >}}
* **URL**: `https://webhooks-http-intake.logs.datadoghq.eu/api/v2/webhook/?dd-api-key=<API_KEY>` ここで、`<API_KEY>` は [Datadog API キー][1]です。
* **Secret Token**: 空白のままにします
* **Trigger**: `Job events` と `Pipeline events` を選択します。

[1]: https://app.datadoghq.eu/account/settings#api
{{< /site-region >}}

カスタムの `env` または `service` パラメーターを設定するには、Webhook の URL で他のクエリパラメーターを追加します: `&env=<YOUR_ENV>&service=<YOUR_SERVICE_NAME>`

[1]: https://docs.gitlab.com/ee/user/project/integrations/webhooks.html
{{< /site-region >}}

## Datadog でパイプラインデータを視覚化する

インテグレーションが正常に構成されたら、パイプラインが終了した後、[Pipelines][4] ページと [Pipeline Executions][5] ページにデータが入力されます。

**注**: Pipelines ページには、各リポジトリのデフォルトブランチのデータのみが表示されます。


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/getting_started/site/
[2]: https://app.datadoghq.com/account/settings#api
[3]: https://docs.gitlab.com/ee/user/project/integrations/webhooks.html
[4]: https://app.datadoghq.com/ci/pipelines
[5]: https://app.datadoghq.com/ci/pipeline-executions
{{< /site-region >}}
{{< site-region region="us3,gov" >}}
選択した Datadog サイト ({{< region-param key="dd_site_name" >}}) は、現時点ではサポートされていません。
{{< /site-region >}}