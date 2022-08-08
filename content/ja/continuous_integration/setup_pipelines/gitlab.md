---
further_reading:
- link: /continuous_integration/explore_pipelines
  tag: ドキュメント
  text: パイプラインの実行結果とパフォーマンスを確認する
- link: /continuous_integration/troubleshooting/
  tag: ドキュメント
  text: トラブルシューティング CI
- link: /continuous_integration/setup_pipelines/custom_tags_and_metrics/
  tag: ドキュメント
  text: カスタムタグとメトリクスを追加してパイプラインの可視性を拡張する
kind: documentation
title: GitLab パイプラインでトレースを設定する
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択したサイト ({{< region-param key="dd_site_name" >}}) では、現時点では CI Visibility は使用できません。</div>
{{< /site-region >}}

## 互換性

対応する GitLab のバージョン:
* GitLab.com (SaaS)
* GitLab >= 14.1 (セルフホスティング)

その他の対応バージョン (追加構成あり):
* GitLab >= 13.7.0 (セルフホスティング)、機能フラグ `datadog_ci_integration` を有効にすることで利用可能です。

## Datadog インテグレーションの構成

{{< tabs >}}
{{% tab "GitLab.com" %}}

[プロジェクト][1]または[グループ][2]でのインテグレーションを構成するには、インスツルメントしたい各プロジェクトまたはグループに対して **Settings > Integrations > Datadog** に移動します。

[1]: https://docs.gitlab.com/ee/user/admin_area/settings/project_integration_management.html#use-custom-settings-for-a-group-or-project-integration
[2]: https://docs.gitlab.com/ee/user/admin_area/settings/project_integration_management.html#manage-group-level-default-settings-for-a-project-integration
{{% /tab %}}
{{% tab "GitLab &gt;&equals; 14.1" %}}

[プロジェクト][1]または[グループ][2]でのインテグレーションを構成するには、インスツルメントしたい各プロジェクトまたはグループに対して **Settings > Integrations > Datadog** に移動します。

また、GitLab [インスタンス][3]レベルで、**Admin > Settings > Integrations > Datadog** にアクセスして、インテグレーションを有効にすることができます。

[1]: https://docs.gitlab.com/ee/user/admin_area/settings/project_integration_management.html#use-custom-settings-for-a-group-or-project-integration
[2]: https://docs.gitlab.com/ee/user/admin_area/settings/project_integration_management.html#manage-group-level-default-settings-for-a-project-integration
[3]: https://docs.gitlab.com/ee/user/admin_area/settings/project_integration_management.html#manage-instance-level-default-settings-for-a-project-integration
{{% /tab %}}
{{% tab "GitLab &lt; 14.1" %}}

`datadog_ci_integration` [機能フラグ][1]を有効にして、インテグレーションを有効にします。インストールの種類に応じて、GitLab の [Rails Runner][2] を使用する次のコマンドのいずれかを実行します。

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

次に、インスツルメントしたい各プロジェクトの **Settings > Integrations > Datadog** で、[プロジェクト][3]単位でインテグレーションを構成します。

<div class="alert alert-warning"><strong>注</strong>: GitLab の初期バージョンの<a href="https://gitlab.com/gitlab-org/gitlab/-/issues/335218">バグ</a>により、<strong>GitLab のバージョン 14.1 未満</strong>では、GitLab の UI でオプションが利用可能であっても、<strong>グループまたはインスタンス</strong>レベルで Datadog インテグレーションを有効にすることができません。</div>

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

**タグ** (オプション)
:  インテグレーションによって生成された各スパンに付ける任意のカスタムタグを指定します。1 行に 1 つのタグを `key:value` の形式で指定します。<br/>
**デフォルト**: (空、追加タグなし)<br/>
**注**: GitLab.com と GitLab >= 14.8 セルフホスティングでのみ利用可能です。

**Test settings** ボタンを使用してインテグレーションをテストできます (プロジェクトでインテグレーションを構成する場合にのみ使用できます)。成功したら、**Save changes** をクリックしてインテグレーションのセットアップを完了します。

## Webhook を介したインテグレーション

ネイティブの Datadog インテグレーションを使用する代わりに、[Webhook][3] を使用してパイプラインデータを Datadog に送信できます。

<div class="alert alert-info"><strong>注</strong>: ネイティブの Datadog インテグレーションは、推奨されるアプローチであり、積極的に開発中のオプションです。</div>

リポジトリ (または GitLab インスタンス設定) の **Settings > Webhooks** に移動し、新しい Webhook を追加します。

- **URL**: <code>https://webhook-intake.{{< region-param key="dd_site" >}}/api/v2/webhook/?dd-api-key=<API_KEY></code> ここで、`<API_KEY>` は [Datadog API キー][2]です。
- **Secret Token**: 空白のままにします
- **Trigger**: `Job events` と `Pipeline events` を選択します。

カスタムの `env` または `service` パラメーターを設定するには、Webhook の URL で他のクエリパラメーターを追加します: `&env=<YOUR_ENV>&service=<YOUR_SERVICE_NAME>`

### カスタムタグの設定

インテグレーションによって生成されたすべてのパイプラインとジョブのスパンにカスタムタグを設定するには、**URL** に URL エンコードされたクエリパラメーター `tags` を追加し、`key:value` ペアをカンマで区切って指定します。key:value のペアにカンマが含まれる場合は、引用符で囲んでください。例えば、`key1:value1, "key2: value with , comma",key3:value3` を追加するには、以下の文字列を **Webhook URL** に追記する必要があります。

`?tags=key1%3Avalue1%2C%22key2%3A+value+with+%2C+comma%22%2Ckey3%3Avalue3`

## Datadog でパイプラインデータを視覚化する

インテグレーションが正常に構成されたら、パイプラインが終了した後、[Pipelines][4] ページと [Pipeline Executions][5] ページにデータが入力されます。

**注**: Pipelines ページには、各リポジトリのデフォルトブランチのデータのみが表示されます。


## ジョブログ収集を有効にする (ベータ版)

以下の GitLab バージョンは、ジョブログの収集をサポートしています。
* GitLab.com (SaaS)
* GitLab >= 14.8 (セルフホスティング) [ジョブログを格納するオブジェクトストレージ][6]を使用している場合のみ

ジョブログの収集を有効にするには

1. GitLab セルフホストまたは GitLab.com アカウントで `datadog_integration_logs_collection` [機能フラグ][7]を有効化します。これにより、Datadog インテグレーションにある `Enable logs collection` オプションが表示されます。
2. `Enable logs collection` オプションを有効にし、変更を保存します。

ジョブログは [Logs][8] 製品に収集され、CI Visibility 内で GitLab パイプラインと自動的に相関が取られます。

<div class="alert alert-info"><strong>注</strong>: Logs は、CI Visibility とは別課金となります。</div>

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/getting_started/site/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://docs.gitlab.com/ee/user/project/integrations/webhooks.html
[4]: https://app.datadoghq.com/ci/pipelines
[5]: https://app.datadoghq.com/ci/pipeline-executions
[6]: https://docs.gitlab.com/ee/administration/job_artifacts.html#using-object-storage
[7]: https://docs.gitlab.com/ee/administration/feature_flags.html
[8]: /ja/logs/