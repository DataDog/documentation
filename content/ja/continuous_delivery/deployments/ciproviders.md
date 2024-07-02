---
title: Monitor CI Providers Deployments
description: Learn how to monitor deployments from CI Providers in Datadog CD Visibility.
is_beta: true
further_reading:
- link: /continuous_delivery/deployments
  tag: Documentation
  text: Learn about Deployment Visibility
- link: /continuous_delivery/explorer
  tag: Documentation
  text: Learn how to query and visualize deployment executions
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">CD Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLScNhFEUOndGHwBennvUp6-XoA9luTc27XBwtSgXhycBVFM9yA/viewform?usp=sf_link" header="false" >}}
CD Visibility for CI providers deployments is in private beta. To request access, complete the form.
{{< /callout >}}

## Overview

[Deployments][10] can be performed in your continuous integration (CI) pipelines. Typically, these pipelines have a deployment step that is executed after the source code is tested and the image is built.

If you are executing deployments using a CI provider, you can monitor your deployments with Deployment Visibility. Ensure the following requirements are met:

1. You are using [Pipeline Visibility][1] to monitor your CI pipelines.
2. Your CI provider supports the **Custom tags and metrics at runtime** feature, which allows you to add [user-defined text and numerical tags][2] to pipelines and jobs in Pipeline Visibility. 
3. You are executing deployments in a CI job (or a [related level][9] in your CI provider). The concept of a CI job may vary depending on your provider. For more information about how Datadog defines a CI job, see the [Terminology section][9].

## Setup

<div class="alert alert-info">
The setup requires the <a href="https://www.npmjs.com/package/@datadog/datadog-ci"> <code>datadog-ci</code> CLI </a> version `2.26.0` or later.
</div>

CD Visibility をセットアップするには、デプロイメントを実行している CI ジョブ内で `datadog-ci deployment mark` コマンドを使用します。

2 つの環境変数が必要です。

1. `DD_API_KEY`: [Datadog API キー][4]を指定します。
2. `DD_BETA_COMMANDS_ENABLED`: 1 に設定します。

Optionally, you can set `DD_SITE` environment variable to a specific [Datadog site][3]. Your site is {{< region-param key="dd_site" code="true" >}}.

以下のパラメーターを使用して、`datadog-ci deployment mark` コマンドによって生成されるデプロイメントイベントをリッチ化することができます。

| パラメーター       | 説明                                                                                                                             |
|-----------------|-----------------------------------------------------------------------------------------------------------------------------------------|
| `--env`         | このデプロイメントが実行される環境。例えば `prod` です。                                                             |
| `--service`     | The name of the service being deployed. For example, `transaction-service`. This option requires `datadog-ci` version `2.31.1` or later |
| `--revision`    | デプロイされているリビジョンまたはバージョン。例えば、`1.0.0` や `v123-456` です。                                                     |
| `--is-rollback` | デプロイメントがロールバックであることを指定します。                                                                                            |
| `--tags`        | `key:value` 形式のキーと値のペアの配列。これらのタグは、Datadog に表示されるデプロイメントイベントに追加されます。                   |

`--no-fail` (デフォルト: `false`) を使用すると、データの送信に問題があった場合にデプロイメントコマンドが失敗しないようにすることができます。

If you are using GitHub Actions as your CI provider, see the [section below][11] for additional considerations.

CI ジョブにコマンドを追加すると、パイプラインが実行された後に [**Deployments** ページ][5]と [Deployment Executions Explorer][6] にデータが反映されます。詳細については、[デプロイメントの検索と管理][7]および [CD Visibility Explorer のドキュメント][8]を参照してください。

### 例

この一連のコマンドは、CI ジョブがバージョン `1.0.0` の `prod` 環境へのデプロイメントを実行することを指定します。

```shell
export DD_BETA_COMMANDS_ENABLED=1
export DD_API_KEY="<YOUR_API_KEY>"
export DD_SITE={{< region-param key="dd_site" >}}

datadog-ci deployment mark --env prod --revision 1.0.0
```

この一連のコマンドは、CI ジョブが `prod` 環境へのロールバックデプロイメントを実行することを指定します。

```shell
export DD_BETA_COMMANDS_ENABLED=1
export DD_API_KEY="<YOUR_API_KEY>"
export DD_SITE={{< region-param key="dd_site" >}}

datadog-ci deployment mark --env prod --is-rollback
```

この一連のコマンドは、CI ジョブが `prod` 環境へのデプロイメントを実行することを指定し、デプロイメントイベントに `team:backend` と `reason:scheduled` タグを追加します。

```shell
export DD_BETA_COMMANDS_ENABLED=1
export DD_API_KEY="<YOUR_API_KEY>"
export DD_SITE={{< region-param key="dd_site" >}}

datadog-ci deployment mark --env prod --tags team:backend --tags reason:scheduled
```

## Mark GitHub Actions jobs as deployments

To mark GitHub jobs as deployments, `datadog-ci CLI` version `2.29.0` or higher is required.
If the job name does not match the entry defined in the workflow configuration file (the GitHub [job ID][12]),
the `DD_GITHUB_JOB_NAME` environment variable needs to be exposed, pointing to the job name. For example:
1. If the job name is changed using the [name property][13]:
    ```yaml
    jobs:
      deploy:
        name: My deployment job name
        env:
          DD_GITHUB_JOB_NAME: My deployment job name
        steps:
        - run: datadog-ci deployment mark ...
    ```
2. If the [matrix strategy][14] is used, several job names are generated by GitHub by adding the matrix values at the end of the job name,
   `DD_GITHUB_JOB_NAME` 環境変数は、マトリックス値次第となります。

    ```yaml
    jobs:
      deployment:
        strategy:
          matrix:
            env: [dev, staging]
        env:
          DD_GITHUB_JOB_NAME: deployment (${{ matrix.env }})
        steps:
        - run: datadog-ci deployment mark ...
    ```

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /continuous_integration/pipelines/
[2]: /continuous_integration/pipelines/custom_tags_and_measures/
[3]: /getting_started/site/
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: https://app.datadoghq.com/ci/deployments
[6]: https://app.datadoghq.com/ci/deployments/executions
[7]: /continuous_delivery/search
[8]: /continuous_delivery/explorer
[9]: /continuous_integration/pipelines/#terminology
[10]: /continuous_delivery/deployments
[11]: /continuous_delivery/deployments/ciproviders#mark-github-actions-jobs-as-deployments
[12]: https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_id
[13]: https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#name
[14]: https://docs.github.com/en/actions/using-jobs/using-a-matrix-for-your-jobs#using-a-matrix-strategy

