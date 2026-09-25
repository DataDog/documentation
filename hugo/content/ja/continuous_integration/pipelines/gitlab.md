---
aliases:
- /ja/continuous_integration/setup_pipelines/gitlab
further_reading:
- link: /continuous_integration/pipelines
  tag: ドキュメント
  text: パイプラインの実行結果とパフォーマンスを確認する
- link: /continuous_integration/troubleshooting/
  tag: ドキュメント
  text: CI Visibility のトラブルシューティング
- link: /continuous_integration/pipelines/custom_tags_and_measures/
  tag: ドキュメント
  text: カスタムタグと測定値を追加して Pipeline Visibility を拡張する
title: CI Visibility 向け GitLab セットアップ
---
## 概要 {#overview}

[GitLab][18] は、統合された CI/CD 機能を備え、ソフトウェア開発ライフサイクルを自動化する DevOps プラットフォームであり、組み込みのセキュリティ制御を使用してアプリケーションの自動的な継続デプロイを可能にします。

GitLab 向けに CI Visibility をセットアップして、パイプライン実行に関するデータを収集し、パフォーマンスのボトルネックを分析し、運用上の問題をトラブルシューティングし、デプロイワークフローを最適化します。

### 互換性 {#compatibility}

| Pipeline Visibility | プラットフォーム | 定義 |
|---|---|---|
| [Running pipelines][24] | Running pipelines | 稼働中のパイプライン実行を表示します。キューに入っているパイプラインまたは待機中のパイプラインは、Datadog では「Running (稼働中)」ステータスで表示されます。|
| [Running jobs][32] | Running jobs | 現在稼働中のジョブ実行を表示します。|
| [CI jobs failure analysis][28] | CI jobs failure analysis | 関連するログに対して LLM モデルを使用して、失敗した CI ジョブの根本原因を分析します。|
| [Filter CI Jobs on the critical path][29] | Filter CI Jobs on the critical path | クリティカルパスのジョブでフィルタリングします。|
| [Partial retries][19] | Partial pipelines | 部分的に再試行されたパイプライン実行を表示します|
| [Automatic job retries][31] | Automatic job retries | Datadog は、AI エラーモデルによって一時的なものと分類された失敗ジョブを再試行します。|
| [Manual steps][20] | Manual steps | 手動でトリガーされたパイプラインを表示します。|
| [Queue time][21] | Queue time | パイプラインのジョブが処理される前にキューに残っている時間を表示します。|
| Logs correlation | Logs correlation | パイプラインスパンをログに関連付け、[ジョブログの収集][12] を有効にします。|
| Infrastructure metric correlation | Infrastructure metric correlation | セルフホスト型 GitLab Runner のために、ジョブを [インフラストラクチャーホストメトリクス][14] に関連付けます。|
| Custom pre-defined tags | Custom pre-defined tags | 生成されたすべてのパイプライン、ステージ、およびジョブスパンに [カスタムタグ][10] を設定します。|
| [Custom tags][15] [and measures at runtime][16] | Custom tags and measures at runtime | ランタイムの [カスタムタグと測定値][13] を構成します。|
| Parameters | Parameters | パイプラインがトリガーされたときにカスタム `env` パラメーターまたは `service` パラメーターを設定します。|
| [Pipeline failure reasons][11] | Pipeline failure reasons | [エラーメッセージ][15] からパイプラインの障害理由を特定します。|
| [Approval wait time][22] | Approval wait time  | ジョブとパイプラインの手動承認の待ち時間を表示します。|
| [Execution time][23] | Execution time  | パイプラインによるジョブ実行時間を表示します。GitLab ではこのメトリクスは `duration` と呼ばれています。GitLab の期間と実行時間が異なる値を示す場合があります。GitLab は、特定の種類の障害 (Runner システムの障害など) が原因で失敗したジョブを考慮しません。|
| [Custom spans][25] | Custom spans | パイプラインのカスタムスパンを構成します。|

以下の GitLab バージョンに対応しています。

- GitLab.com (SaaS)
- GitLab >= 14.1 (セルフホスト)
- GitLab >= 13.7.0 (セルフホスト) (`datadog_ci_integration` フィーチャーフラグが有効な場合)

### 用語 {#terminology}

次の表に、Datadog CI Visibility と GitLab の概念の対応を示します。

| Datadog                    | GitLab   |
|----------------------------|----------|
| パイプライン                   | パイプライン |
| ステージ                      | ステージ    |
| ジョブ                        | ジョブ      |
| __Datadog では利用不可__ | スクリプト   |

## Datadog インテグレーションの構成 {#configure-the-datadog-integration}

{{< tabs >}}
{{% tab "GitLab.com" %}}

インスツルメントするプロジェクトまたはグループごとに、[{{< ui >}}Settings{{< /ui >}}] (設定) > [{{< ui >}}Integrations{{< /ui >}}] (インテグレーション) > [{{< ui >}}Datadog{{< /ui >}}] に移動して、[プロジェクト][101] または [グループ][102] のインテグレーションを構成します。


インテグレーションコンフィギュレーション設定を入力します。

{{< ui >}}Active{{< /ui >}}
: インテグレーションを有効にします。

{{< ui >}}Datadog site{{< /ui >}}
: データ送信先の [Datadog サイト][103] を指定します。<br/>
**デフォルト**: `datadoghq.com`<br/>
**選択されたサイト**:{{< region-param key="dd_site" code="true" >}}<br/>

{{< ui >}}API URL{{< /ui >}} (オプション)
: データを直接送信するために使用される API URL のオーバーライドを許可します。高度なシナリオでのみ使用されます。<br/>
**デフォルト**: (空、オーバーライドなし)

{{< ui >}}API key{{< /ui >}}
: データ送信時に使用する [Datadog API キー][104] を指定します。

{{< ui >}}Enable CI Visibility{{< /ui >}}
: 、CI Visibility の機能 (パイプラインのトレーシング、クリティカルパスの計算、パフォーマンス監視など) の有効化を制御します。これらの機能を有効にするには、このボックスがオンになっていることを確認してください。

{{< ui >}}Service{{< /ui >}}(オプション)
: このインテグレーションによって生成される各スパンに付加するサービス名を指定します。GitLab インスタンスを区別するために使用します。<br/>
**デフォルト**: `gitlab-ci`

{{< ui >}}Env{{< /ui >}} (オプション)
: このインテグレーションによって生成される各スパンに付加する環境 (`env` タグ) を指定します。GitLab インスタンスのグループ (例: ステージングと本番環境) を区別するために使用します。<br/>
**デフォルト**: `none`

{{< ui >}}Tags{{< /ui >}} (オプション)
: このインテグレーションによって生成される各スパンに付加するカスタムタグを指定します。`key:value` という形式で、1 行につき 1 つのタグを指定します。<br/>
**デフォルト**: (空、追加タグなし)<br/>
**注**: GitLab.com およびセルフホスト型の GitLab 14.8 以上でのみ利用可能です。

[{{< ui >}}Test settings{{< /ui >}}] (設定をテスト) ボタンでインテグレーションをテストできます (プロジェクトでインテグレーションを構成している場合のみ利用可能)。成功したら、[{{< ui >}}Save changes{{< /ui >}}] (保存を変更) をクリックしてインテグレーションのセットアップを完了します。ボタンが失敗した場合は、[{{< ui >}}Save changes{{< /ui >}}] (保存を変更) をクリックし、下の [Recent events] (最近のイベント) セクションで履歴を確認して、最初に送信された Webhook が成功しているかどうかを確認してください。

[101]: https://docs.gitlab.com/ee/user/admin_area/settings/project_integration_management.html#view-projects-that-use-custom-settings
[102]: https://docs.gitlab.com/ee/user/project/integrations/index.html#manage-group-default-settings-for-a-project-integration
[103]: /ja/getting_started/site/
[104]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "GitLab &gt;&equals; 14.1" %}}

インスツルメントするプロジェクトまたはグループごとに、[{{< ui >}}Settings{{< /ui >}}] (設定) > [{{< ui >}}Integrations{{< /ui >}}] (インテグレーション) > [{{< ui >}}Datadog{{< /ui >}}] に移動して、[プロジェクト][101] または [グループ][102] のインテグレーションを構成します。[{{< ui >}}Admin{{< /ui >}}] (管理) > [{{< ui >}}Settings{{< /ui >}}] (設定) > [{{< ui >}}Integrations{{< /ui >}}] (インテグレーション) > [{{< ui >}}Datadog{{< /ui >}}] に移動して、GitLab [インスタンス][103] レベルでインテグレーションをアクティブにすることもできます。

インテグレーションコンフィギュレーション設定を入力します。

{{< ui >}}Active{{< /ui >}}
: インテグレーションを有効にします。

{{< ui >}}Datadog site{{< /ui >}}
: データ送信先の [Datadog サイト][104] を指定します。<br/>
**デフォルト**: `datadoghq.com`<br/>
**選択されたサイト**:{{< region-param key="dd_site" code="true" >}}<br/>

{{< ui >}}API URL{{< /ui >}} (オプション)
: データを直接送信するために使用される API URL のオーバーライドを許可します。高度なシナリオでのみ使用されます。<br/>
**デフォルト**: (空、オーバーライドなし)

{{< ui >}}API key{{< /ui >}}
: データ送信時に使用する [Datadog API キー][105] を指定します。

{{< ui >}}Enable CI Visibility{{< /ui >}}
: 、CI Visibility の機能 (パイプラインのトレーシング、クリティカルパスの計算、パフォーマンス監視など) の有効化を制御します。これらの機能を有効にするには、このボックスがオンになっていることを確認してください。これは GitLab 17.7 以降にのみ存在しており、それ以前のバージョンでは必要ありません。

{{< ui >}}Service{{< /ui >}}(オプション)
: このインテグレーションによって生成される各スパンに付加するサービス名を指定します。GitLab インスタンスを区別するために使用します。<br/>
**デフォルト**: `gitlab-ci`

{{< ui >}}Env{{< /ui >}} (オプション)
: このインテグレーションによって生成される各スパンに付加する環境 (`env` タグ) を指定します。GitLab インスタンスのグループ (例: ステージングと本番環境) を区別するために使用します。<br/>
**デフォルト**: `none`

{{< ui >}}Tags{{< /ui >}} (オプション)
: このインテグレーションによって生成される各スパンに付加するカスタムタグを指定します。`key:value` という形式で、1 行につき 1 つのタグを指定します。<br/>
**デフォルト**: (空、追加タグなし)<br/>
**注**: GitLab.com およびセルフホスト型の GitLab 14.8 以上でのみ利用可能です。

[{{< ui >}}Test settings{{< /ui >}}] (設定をテスト) ボタンでインテグレーションをテストできます (プロジェクトでインテグレーションを構成している場合のみ利用可能)。成功したら、[{{< ui >}}Save changes{{< /ui >}}] (保存を変更) をクリックしてインテグレーションのセットアップを完了します。ボタンが失敗した場合は、[{{< ui >}}Save changes{{< /ui >}}] (保存を変更) をクリックし、下の [Recent events] (最近のイベント) セクションで履歴を確認して、最初に送信された Webhook が成功しているかどうかを確認してください。

[101]: https://docs.gitlab.com/ee/administration/settings/project_integration_management.html#view-projects-that-use-custom-settings
[102]: https://docs.gitlab.com/ee/user/project/integrations/index.html#manage-group-default-settings-for-a-project-integration
[103]: https://docs.gitlab.com/ee/user/admin_area/settings/project_integration_management.html#manage-instance-level-default-settings-for-a-project-integration
[104]: /ja/getting_started/site/
[105]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "GitLab &lt; 14.1" %}}

`datadog_ci_integration` [機能フラグ][101] を有効にして、インテグレーションをアクティブにします。

インストールタイプに応じて、GitLab の [Rails Runner][102] を使用する以下のいずれかのコマンドを実行します。

**Omnibus インストール** から:

{{< code-block lang="shell" >}}
sudo gitlab-rails runner "Feature.enable(:datadog_ci_integration)"
{{< /code-block >}}

**ソースインストール** から:

{{< code-block lang="shell" >}}
sudo -u git -H bundle exec rails runner \
  -e production \
  "Feature.enable(:datadog_ci_integration)"
{{< /code-block >}}

**Kubernetes インストール** から:

{{< code-block lang="shell" >}}
kubectl exec -it <task-runner-pod-name> -- \
  /srv/gitlab/bin/rails runner "Feature.enable(:datadog_ci_integration)"
{{< /code-block >}}

次に、インスツルメントするプロジェクトごとに、[{{< ui >}}Settings{{< /ui >}}] (設定) > [{{< ui >}}Integrations{{< /ui >}}] (インテグレーション) > [{{< ui >}}Datadog{{< /ui >}}] に移動して、[プロジェクト][103] のインテグレーションを構成します。

<div class="alert alert-warning">GitLab の初期バージョンにおける <a href="https://gitlab.com/gitlab-org/gitlab/-/issues/335218">バグ</a>により、<strong>GitLab バージョン < 14.1</strong> では、Datadog インテグレーションを<strong>グループまたはインスタンス</strong>レベルで有効にすることができません。これは、GitLab の UI でこのオプションが使用可能な場合にも該当します。</div>


インテグレーションコンフィギュレーション設定を入力します。

{{< ui >}}Active{{< /ui >}}
: インテグレーションを有効にします。

{{< ui >}}Datadog site{{< /ui >}}
: データ送信先の [Datadog サイト][104] を指定します。<br/>
**デフォルト**: `datadoghq.com`<br/>
**選択されたサイト**:{{< region-param key="dd_site" code="true" >}}<br/>

{{< ui >}}API URL{{< /ui >}} (オプション)
: データを直接送信するために使用される API URL のオーバーライドを許可します。高度なシナリオでのみ使用されます。<br/>
**デフォルト**: (空、オーバーライドなし)

{{< ui >}}API key{{< /ui >}}
: データ送信時に使用する [Datadog API キー][105] を指定します。

{{< ui >}}Service{{< /ui >}}(オプション)
: このインテグレーションによって生成される各スパンに付加するサービス名を指定します。GitLab インスタンスを区別するために使用します。<br/>
**デフォルト**: `gitlab-ci`

{{< ui >}}Env{{< /ui >}} (オプション)
: このインテグレーションによって生成される各スパンに付加する環境 (`env` タグ) を指定します。GitLab インスタンスのグループ (例: ステージングと本番環境) を区別するために使用します。<br/>
**デフォルト**: `none`

{{< ui >}}Tags{{< /ui >}} (オプション)
: このインテグレーションによって生成される各スパンに付加するカスタムタグを指定します。`key:value` という形式で、1 行につき 1 つのタグを指定します。<br/>
**デフォルト**: (空、追加タグなし)<br/>
**注**: GitLab.com およびセルフホスト型の GitLab 14.8 以上でのみ利用可能です。

[{{< ui >}}Test settings{{< /ui >}}] (設定をテスト) ボタンでインテグレーションをテストできます (プロジェクトでインテグレーションを構成している場合のみ利用可能)。成功したら、[{{< ui >}}Save changes{{< /ui >}}] (保存を変更) をクリックしてインテグレーションのセットアップを完了します。ボタンが失敗した場合は、[{{< ui >}}Save changes{{< /ui >}}] (保存を変更) をクリックし、下の [Recent events] (最近のイベント) セクションで履歴を確認して、最初に送信された Webhook が成功しているかどうかを確認してください。

[101]: https://docs.gitlab.com/ee/administration/feature_flags.html
[102]: https://docs.gitlab.com/ee/administration/operations/rails_console.html#using-the-rails-runner
[103]: https://docs.gitlab.com/ee/user/admin_area/settings/project_integration_management.html#use-custom-settings-for-a-group-or-project-integration
[104]: /ja/getting_started/site/
[105]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}

{{% tab "GitLab &lt; 13.7" %}}

<div class="alert alert-danger">Webhook による直接サポートは現在開発されていません。予期しない問題が発生する可能性があります。Datadog では代わりに GitLab を更新することを推奨しています。</div>

GitLab の古いバージョンでは、[Webhook][101] を使用してパイプラインデータを Datadog に送信できます。

リポジトリ (または GitLab インスタンス設定) の [{{< ui >}}Settings{{< /ui >}}] (設定) > [{{< ui >}}Webhooks{{< /ui >}}] に移動し、新しい Webhook を追加します。

- {{< ui >}}URL{{< /ui >}}:<code>https://webhook-intake.{{< region-param key="dd_site" >}}/api/v2/webhook/?dd-api-key=<API_KEY></code> ここで `<API_KEY>` はお使いの [Datadog API キー][102] です。
- {{< ui >}}Secret Token{{< /ui >}} (シークレットトークン): このフィールドは空のままにします。
- {{< ui >}}Trigger{{< /ui >}} (トリガー): `Job events` と `Pipeline events` を選択します。

カスタム `env` または `service` パラメーターを設定するには、Webhook URL にクエリパラメーターを追加します。たとえば、`&env=<YOUR_ENV>&service=<YOUR_SERVICE_NAME>`。

### カスタムタグの設定 {#set-custom-tags}

インテグレーションによって生成されるすべてのパイプラインスパンおよびジョブスパンにカスタムタグを設定するには、`key:value` ペアをカンマ区切りで指定した、URL エンコードされたクエリパラメーター `tags` を URL に追加します。

key:value ペアにカンマが含まれる場合は、引用符で囲んでください。たとえば `key1:value1,"key2: value with , comma",key3:value3` を追加する場合、{{< ui >}}Webhook URL{{< /ui >}} に次の文字列を追加する必要があります: `?tags=key1%3Avalue1%2C%22key2%3A+value+with+%2C+comma%22%2Ckey3%3Avalue3`。

[101]: https://docs.gitlab.com/ee/user/project/integrations/webhooks.html
[102]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{< /tabs >}}

## 高度な構成 {#advanced-configuration}

### パイプライン名の設定 {#set-a-pipeline-name}

デフォルトでは、Datadog は GitLab プロジェクトのパスをパイプライン名として使用します。その結果、同じプロジェクトから [`trigger`][33] キーワードでトリガーされたすべてのダウンストリーム (子) パイプラインは、Datadog では同じ名前で表示されます。

パイプラインにより分かりやすい名前を付けるには、`.gitlab-ci.yml` で GitLab の [`workflow:name`][34] キーワードを使用します。たとえば、ダウンストリームパイプラインに、そのトリガーとなったジョブの名前を付ける場合は、次のようにします。

```yaml
trigger-job:
  trigger:
    include:
      - local: path/to/child-pipeline.yml
  variables:
    CHILD_PIPELINE_NAME: $CI_JOB_NAME
```

子パイプラインの `.gitlab-ci.yml` (またはこのファイルにインクルードされるファイル) で、転送された変数を使用してパイプライン名を設定します。

```yaml
workflow:
  name: '$CHILD_PIPELINE_NAME'
```

**注**: 上記の例ではパイプライン名で変数展開を使用しており、このためには GitLab 16.3 以降が必要です。`workflow:name` 自体は、GitLab 15.11 以降でプレーンな文字列名として利用可能です。パイプライン名は、GitLab 16.1 でパイプライン Webhook ペイロードに追加されて以降、Datadog でのみ表示されます。

### カスタムタグの設定 {#set-custom-tags-1}

GitLab プロジェクトのすべてのパイプラインスパンとジョブスパンにカスタムタグを設定して、トレーサビリティを向上させることができます。詳細については、[カスタムタグとメトリクス][13] を参照してください。

#### Datadog Teams との統合 {#integrate-with-datadog-teams}

パイプラインに関連付けられたチームを表示およびフィルタリングするには、`team:<your-team>` をカスタムタグとして追加します。カスタムタグ名は、[Datadog Teams][16] のチームハンドルと完全に一致している必要があります。

### インフラストラクチャー メトリクスとジョブの相関付け {#correlate-infrastructure-metrics-to-jobs}

セルフホスト型 GitLab Runner を使用している場合、ジョブとそれを実行しているインフラストラクチャーを相関付けることができます。

Datadog インフラストラクチャーの相関付けは、さまざまな方法で行うことができます。

{{< tabs >}}
{{% tab "非オートスケーリングエグゼキューター" %}}
GitLab Runner には `host:<hostname>` という形式のタグが必要です。タグは、[新しい Runner の登録][1] 時に追加できます。その結果、この方法は Runner が直接ジョブを実行している場合にのみ利用可能です。

これには、ジョブを実行するためにインフラストラクチャーをオートスケーリングするエグゼキューター (Kubernetes、Docker Autoscaler、Instance エグゼキューターなど) は含まれません。これは、これらの Runner に対してタグを動的に追加できないためです。

既存の Runner の場合:

- GitLab 15.8 以上: [{{< ui >}}Settings{{< /ui >}}] (設定) > [{{< ui >}}CI/CD{{< /ui >}}] > [{{< ui >}}Runners{{< /ui >}}] に移動し、該当する Runner を編集して、UI からタグを追加します。

- GitLab 15.8 未満: Runner の `config.toml` を更新してタグを追加します。または、[{{< ui >}}Settings{{< /ui >}}] (設定) > [{{< ui >}}CI/CD{{< /ui >}}] > [{{< ui >}}Runners{{< /ui >}}] に移動し、該当する Runner を編集して、UI からタグを追加します。

これらの手順が完了すると、CI Visibility は各ジョブにホスト名を追加します。メトリクスを表示するには、トレースビューでジョブスパンをクリックします。ドロワーに [{{< ui >}}Infrastructure{{< /ui >}}] (インフラストラクチャー) という名前の新しいタブが表示され、ホストメトリクスが含まれます。

[1]: https://docs.gitlab.com/runner/register/
{{% /tab %}}

{{% tab "Docker Autoscaler" %}}
CI Visibility は、ログベースの相関付けにより "Docker Autoscaler" エグゼキューターのインフラストラクチャーメトリクスをサポートしています。これを有効にするには、Datadog がジョブとホストをリンクできるように GitLab ジョブログがインデックス化されていること、およびログに `Instance <hostname> connected` 形式のメッセージが含まれていることを確認してください。GitLab ジョブログには `datadog.product:cipipeline` タグと `source:gitlab` タグが含まれており、これらは [ログインデックス][2] フィルターで使用できます。このシナリオでインフラストラクチャー データを表示するために、ユーザーに [ログの読み取りアクセス権][3] も必要です。詳細については、[GitLab ジョブとインフラストラクチャーメトリクスの相関付けに関するガイド][1] を参照してください。

[1]: /ja/continuous_integration/guides/infrastructure_metrics_with_gitlab
[2]: /ja/logs/indexes/
[3]: /ja/logs/guide/logs-rbac/
{{% /tab %}}

{{% tab "インスタンス" %}}
CI Visibility は、ログベースの相関付けにより「インスタンス」エグゼキューターのインフラストラクチャーメトリクスをサポートしています。これを有効にするには、Datadog がジョブとホストをリンクできるように GitLab ジョブログがインデックス化されていること、およびログに `Instance <hostname> connected` 形式のメッセージが含まれていることを確認してください。GitLab ジョブログには `datadog.product:cipipeline` タグと `source:gitlab` タグが含まれており、これらは [ログインデックス][2] フィルターで使用できます。このシナリオでインフラストラクチャー情報を表示するために、ユーザーに [ログ読み取りアクセス権][3] も必要です。詳細については、[GitLab ジョブとインフラストラクチャーメトリクスの相関付けに関するガイド][1] を参照してください。

[1]: /ja/continuous_integration/guides/infrastructure_metrics_with_gitlab
[2]: /ja/logs/indexes/
[3]: /ja/logs/guide/logs-rbac/
{{% /tab %}}

{{% tab "Kubernetes" %}}
CI Visibility は、Kubernetes エグゼキューターのインフラストラクチャーメトリクスをサポートしています。このため、Datadog Agent が Kubernetes GitLab インフラストラクチャーを監視している必要があります。Kubernetes クラスターに Datadog Agent をインストールするには、[Kubernetes に Datadog Agent をインストールする][1] を参照してください。

Datadog Agent の制限により、Datadog Agent の最小収集間隔よりも短いジョブでは、インフラストラクチャー相関メトリクスが常に表示されるとは限りません。この値を調整するには、[Agent 構成ファイル][2] で `min_collection_interval` を 15 秒未満に設定してください。

[1]: /ja/containers/kubernetes/installation/?tab=datadogoperator
[2]: /ja/agent/configuration/agent-configuration-files/
{{% /tab %}}

{{% tab "その他のエグゼキューター" %}}
CI Visibility は、その他のエグゼキューターのインフラストラクチャーメトリクスをサポートしていません。
{{% /tab %}}

{{< /tabs >}}

### パイプライン失敗時のエラーメッセージの表示{#view-error-messages-for-pipeline-failures}

GitLab パイプラインの実行に失敗した場合、特定のパイプライン実行内の [{{< ui >}}Errors{{< /ui >}}] (エラー) タブの下の各エラーは、GitLab からのエラータイプに関連するメッセージを表示します。

{{< img src="ci/ci_gitlab_failure_reason_new.png" alt="GitLab の失敗理由" style="width:100%;">}}

#### CI ジョブ失敗分析 {#ci-jobs-failure-analysis}

ジョブログの収集が有効な場合、CI Visibility は LLM モデルを使用して、GitLab からの関連ログに基づいて失敗した CI ジョブを分析します。

ジョブ失敗分析を PR コメントに追加することもできます。[PR コメントの使用][30] に関するガイドを参照してください。

詳細については、[CI ジョブ失敗分析の使用][28] に関するガイドを参照してください。

#### GitLab から提供されるエラー {#errors-provided-by-gitlab}

エラーメッセージは GitLab のバージョン 15.2.0 以降でサポートされています。

GitLab から提供されるエラー情報は、`error.provider_message` タグと `error.provider_domain` タグに保存されます。

次の表に、各エラータイプに関連付けられているメッセージとドメインの説明を示します。リストにないエラータイプの場合、`Job failed` エラーメッセージと `unknown` エラードメインになります。

| エラータイプ                       | エラードメイン | エラーメッセージ                                              |
|---------------------------------|--------------|------------------------------------------------------------|
| `unknown_failure`                | 不明      | Failed due to unknown reason. (原因不明で失敗しました。)                            |
| `config_error`                   | ユーザー         | Failed due to error on CI/CD configuration file. (CI/CD コンフィギュレーションファイルのエラーにより失敗しました。)          |
| `external_validation_failure`    | 不明      | Failed due to external pipeline validation. (外部パイプラインの検証に失敗しました。)               |
| `user_not_verified`              | ユーザー         | The pipeline failed due to the user not being verified. (ユーザーが認証されていないため、パイプラインが失敗しました。)   |
| `activity_limit_exceeded`        | プロバイダー     | The pipeline activity limit was exceeded. (パイプラインのアクティビティ制限を超過しました。)                 |
| `size_limit_exceeded`            | プロバイダー     | The pipeline size limit was exceeded. (パイプラインのサイズ制限を超過しました。)                     |
| `job_activity_limit_exceeded`    | provider     | The pipeline job activity limit was exceeded. (パイプラインのジョブアクティビティ制限を超過しました。)             |
| `deployments_limit_exceeded`     | プロバイダー     | The pipeline deployments limit was exceeded. (パイプラインのデプロイ制限を超過しました。)              |
| `project_deleted`                | プロバイダー     | The project associated with this pipeline was deleted. (このパイプラインに関連するプロジェクトが削除されました。)    |
| `api_failure`                    | プロバイダー     |  API failure. (API が失敗しました。)                                              |
| `stuck_or_timeout_failure`       | 不明      | Pipeline is stuck or timed out. (パイプラインが停止しているか、タイムアウトしています。)                           |
| `runner_system_failure`          | プロバイダー     | Failed due to runner system failure. (Runner システムの不具合により失敗しました。)                      |
| `missing_dependency_failure`     | 不明      | Failed due to missing (依存関係がないため失敗しました。)                         |
| `runner_unsupported`             | プロバイダー     | Failed due to unsupported runner. (サポートされていないの Runner が原因で失敗しました。)                         |
| `stale_schedule`                 | プロバイダー     | Failed due to stale schedule (スケジュールが古くなったため失敗しました。)                             |
| `job_execution_timeout`          | 不明      | Failed due to job timeout. (ジョブのタイムアウトが原因で失敗しました。)                               |
| `archived_failure`               | プロバイダー     | Archived failure. (アーカイブが失敗しました。)                                        |
| `unmet_prerequisites`            | 不明      | Failed due to unmet prerequisite. (前提条件が満たされていないため失敗しました。)                         |
| `scheduler_failure`              | プロバイダー     | Failed due to schedule failure. (スケジュール不具合が原因で失敗しました。)                           |
| `data_integrity_failure`         | プロバイダー     | Failed due to data integrity. (データ整合性が原因で失敗しました。)                             |
| `forward_deployment_failure`     | 不明      | Deployment failure. (デプロイメントに失敗しました。)                                       |
| `user_blocked`                   | ユーザー         | Blocked by user. (ユーザーによってブロックされました。)                                          |
| `ci_quota_exceeded`              | プロバイダー     | CI quota exceeded. (CI の割り当てを超過しました。)                                        |
| `pipeline_loop_detected`         | ユーザー         | Pipeline loop detected. (パイプラインループを検出しました。)                                   |
| `builds_disabled`                | ユーザー         | Build disabled. (ビルドが無効です。)                                           |
| `deployment_rejected`            | ユーザー         | Deployment rejected. (デプロイメントが拒否されました。)                                     |
| `protected_environment_failure`  | プロバイダー     | Environment failure. (環境の障害が発生しました。)                                      |
| `secrets_provider_not_found`     | ユーザー         | Secret provider not found. (シークレットプロバイダーが見つかりません。)                                |
| `reached_max_descendant_pipelines_depth` | ユーザー | Reached max descendant pipelines. (子孫パイプラインの最大数に達しました。)                       |
| `ip_restriction_failure`          | プロバイダー | IP restriction failure. (IP 制限が失敗しました。)                                   |

### ジョブログの収集 {#collect-job-logs}

以下の GitLab バージョンは、ジョブログの収集をサポートしています。

* GitLab.com (SaaS)
* GitLab >= 15.3 (セルフホスト) [ジョブログを格納するオブジェクトストレージ][7] を使用している場合のみ
* GitLab >= 14.8 (セルフホスト) `datadog_integration_logs_collection` 機能フラグが有効な場合

ジョブログは [Log Management][9] で収集され、CI Visibility で GitLab パイプラインと自動的に関連付けられます。1GiB を超えるログファイルは切り捨てられます。

ジョブログの収集を有効にするには、次のようにします。

{{< tabs >}}
{{% tab "GitLab.com" %}}
1. GitLab インテグレーションの [{{< ui >}}Settings{{< /ui >}}] (設定) > [{{< ui >}}Integrations{{< /ui >}}] (インテグレーション) > [{{< ui >}}Datadog{{< /ui >}}] の [{{< ui >}}Enable job logs collection{{< /ui >}}] (ジョブログ収集を有効にする) チェックボックスをクリックします。
2. [{{< ui >}}Save changes{{< /ui >}}] (変更を保存) をクリックします。
{{% /tab %}}

{{% tab "GitLab &gt;&equals; 15.3" %}}
<div class="alert alert-danger">Datadog は、事前に署名された期間限定の URL を使用して、GitLab ログの<a href="https://docs.gitlab.com/ee/administration/job_artifacts.html#using-object-storage">オブジェクトストレージ</a>からログファイルを直接ダウンロードします。
これは、Datadog サーバーがストレージにアクセスするためには、ストレージにネットワークの制限がかかっていてはいけないことを意味します。
<a href="https://docs.gitlab.com/ee/administration/object_storage.html#amazon-s3">エンドポイント</a>が設定されている場合、エンドポイントは公開 URL に解決される必要があります。</div>

1. GitLab インテグレーションの [{{< ui >}}Settings{{< /ui >}}] (設定) > [{{< ui >}}Integrations{{< /ui >}}] (インテグレーション) > [{{< ui >}}Datadog{{< /ui >}}] の [{{< ui >}}Enable job logs collection{{< /ui >}}] (ジョブログ収集を有効にする) チェックボックスをクリックします。
2. [{{< ui >}}Save changes{{< /ui >}}] (変更を保存) をクリックします。

{{% /tab %}}

{{% tab "GitLab &gt;&equals; 14.8" %}}
<div class="alert alert-danger">Datadog は、事前に署名された期間限定の URL を使用して、GitLab ログの<a href="https://docs.gitlab.com/ee/administration/job_artifacts.html#using-object-storage">オブジェクトストレージ</a>からログファイルを直接ダウンロードします。
これは、Datadog サーバーがストレージにアクセスするためには、ストレージにネットワークの制限がかかっていてはいけないことを意味します。
<a href="https://docs.gitlab.com/ee/administration/object_storage.html#amazon-s3">エンドポイント</a>が設定されている場合、エンドポイントは公開 URL に解決される必要があります。</div>

1. GitLab で `datadog_integration_logs_collection` [機能フラグ][1] を有効にします。これにより、GitLab インテグレーションの [{{< ui >}}Settings{{< /ui >}}] (設定) > [{{< ui >}}Integrations{{< /ui >}}] (インテグレーション) > [{{< ui >}}Datadog{{< /ui >}}] に [{{< ui >}}Enable job logs collection{{< /ui >}}] (ジョブログ収集を有効にする) チェックボックスが表示されるようになります。
2. [{{< ui >}}Enable job logs collection{{< /ui >}}] (ジョブログ収集を有効にする) をクリックします。
3. [{{< ui >}}Save changes{{< /ui >}}] (変更を保存) をクリックします。

[1]: https://docs.gitlab.com/ee/administration/feature_flags.html
{{% /tab %}}
{{< /tabs >}}

ログは、CI Visibility とは別に課金されます。ログの保持、除外、インデックスは [Log Management][6] で構成されます。GitLab ジョブのログは、`datadog.product:cipipeline` タグと `source:gitlab` タグで確認できます。

GitLab インテグレーションから収集されたジョブログの処理に関する詳細については、[プロセッサのドキュメント][17] を参照してください。

## 部分的パイプラインとダウンストリームパイプラインの表示 {#view-partial-and-downstream-pipelines}

[CI Visibility Explorer][26] で、次のフィルターを使用して検索クエリをカスタマイズできます。

{{< img src="ci/partial_retries_search_tags.png" alt="検索クエリに Partial Pipeline:retry が入力されている [Pipeline executions] (パイプライン実行) ページ" style="width:100%;">}}

| ファセット名 | ファセット ID | 使用可能な値 |
|---|---|---|
| Downstream Pipeline (ダウンストリームパイプライン) | `@ci.pipeline.downstream` | `true`、`false` |
| Manually Triggered (手動トリガー) | `@ci.is_manual` | `true`、`false` |
| Partial Pipeline (部分パイプライン) | `@ci.partial_pipeline` | `retry`、`paused`、`resumed` |

ページの左側にあるファセットパネルを使用して、これらのフィルターを適用することもできます。

{{< img src="ci/partial_retries_facet_panel.png" alt="[Partial Pipeline] (部分パイプライン) ファセットが展開され、値 Retry が選択され、[Partial Retry] (部分的なリトライ) ファセットが展開され、値 true が選択されているファセットパネル" style="width:20%;">}}

## Datadog でパイプラインデータを視覚化する{#visualize-pipeline-data-in-datadog}

インテグレーションが正常に構成されたら、パイプラインが終了した後、[[**CI Pipeline List**] (CI パイプラインリスト)][4] ページと [[**Executions**] (実行)][5] ページにデータが表示されます。

[{{< ui >}}CI Pipeline List{{< /ui >}}] (CI パイプラインリスト) ページには、各リポジトリのデフォルトブランチのデータのみが表示されます。詳しくは、[CI パイプラインの検索と管理][27] を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/getting_started/site/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://docs.gitlab.com/ee/user/project/integrations/webhooks.html
[4]: https://app.datadoghq.com/ci/pipelines
[5]: https://app.datadoghq.com/ci/pipeline-executions
[6]: /ja/logs/guide/best-practices-for-log-management/
[7]: https://docs.gitlab.com/ee/administration/job_artifacts.html#using-object-storage
[8]: https://docs.gitlab.com/ee/administration/feature_flags.html
[9]: /ja/logs/
[10]: /ja/continuous_integration/pipelines/gitlab/?tab=gitlabcom#set-custom-tags
[11]: /ja/continuous_integration/pipelines/gitlab/?tab=gitlabcom#partial-and-downstream-pipelines
[12]: /ja/continuous_integration/pipelines/gitlab/#enable-job-log-collection
[13]: /ja/continuous_integration/pipelines/custom_tags_and_measures/?tab=linux
[14]: /ja/continuous_integration/pipelines/gitlab/?tab=gitlabcom#correlate-infrastructure-metrics-to-jobs
[15]: /ja/continuous_integration/pipelines/gitlab/?tab=gitlabcom#view-error-messages-for-pipeline-failures
[16]: /ja/account_management/teams/
[17]: /ja/logs/log_configuration/processors/
[18]: https://about.gitlab.com/
[19]: /ja/glossary/#partial-retry
[20]: /ja/glossary/#manual-step
[21]: /ja/glossary/#queue-time
[22]: /ja/glossary/#approval-wait-time
[23]: /ja/glossary/#pipeline-execution-time
[24]: /ja/glossary/#running-pipeline
[25]: /ja/glossary/#custom-span
[26]: /ja/continuous_integration/explorer
[27]: /ja/continuous_integration/search/#search-for-pipelines
[28]: /ja/continuous_integration/guides/use_ci_jobs_failure_analysis/
[29]: /ja/continuous_integration/guides/identify_highest_impact_jobs_with_critical_path/
[30]: /ja/continuous_integration/guides/use_ci_jobs_failure_analysis/#using-pr-comments
[31]: /ja/continuous_integration/pipelines/automatic_retries/
[32]: /ja/glossary/#running-job
[33]: https://docs.gitlab.com/ee/ci/yaml/#trigger
[34]: https://docs.gitlab.com/ee/ci/yaml/#workflowname