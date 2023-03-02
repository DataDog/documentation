---
aliases:
- /ja/observability_pipelines/setup/
- /ja/agent/vector_aggregation/
- /ja/integrations/observability_pipelines/integrate_vector_with_datadog/
- /ja/observability_pipelines/integrate_vector_with_datadog/
- /ja/observability_pipelines/integrations/integrate_vector_with_datadog/
- /ja/observability_pipelines/production_deployment_overview/integrate_datadog_and_the_observability_pipelines_worker/
further_reading:
- link: /observability_pipelines/production_deployment_overview/
  tag: ドキュメント
  text: ワーカーを本番環境に持ち込む
kind: ドキュメント
title: APM に Datadog Agent を構成する
---

{{< tabs >}}
{{% tab "Linux" %}}

## 概要

[Debian][2]、[Ubuntu][3]、その他の [Linux][4] ディストリビューションでソフトウェアのインストールと削除を処理するフリーのパッケージマネージャである [Advanced Package Tool][1] (APT) を使用して、観測可能性パイプラインワーカーをインストールします。

## 前提条件

インストールする前に、以下を確認してください。

1. サポートされている Linux アーキテクチャ (x86_64 または AMD64) のいずれかを使用している
2. 有効な [Datadog API キー][5]がある。
3. [観測可能性パイプラインの構成][7]がある。

## APM に Datadog Agent を構成する

<!-- ### Automatic

Datadog は、ワーカーをインストールするために必要なステップを実行するスクリプトを提供しています。以下のコマンドを使用してスクリプトを実行し、`DD_API_KEY` を Datadog API キーに置き換えます。

```
$ DD_API_KEY=<DD_API_KEY> DD_SITE="datadoghq.com" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_observability_pipelines_worker.sh)"
``` -->

### 手動

1. 以下のコマンドを実行し、APT が HTTPS でダウンロードするように設定します。

    ```
    sudo apt-get update
    sudo apt-get install apt-transport-https curl gnupg
    ```

2. 以下のコマンドを実行して、システム上に Datadog の `deb` リポジトリをセットアップし、Datadog のアーカイブキーホルダーを作成します。

    ```
    sudo sh -c "echo 'deb [signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg] https://apt.datadoghq.com/ stable observability-pipelines-worker-1' > /etc/apt/sources.list.d/datadog.list"
    sudo touch /usr/share/keyrings/datadog-archive-keyring.gpg
    sudo chmod a+r /usr/share/keyrings/datadog-archive-keyring.gpg
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_CURRENT.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_382E94DE.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_F14F620E.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    ```

3. 以下のコマンドを実行し、ローカルの `apt` リポジトリを更新し、ワーカーをインストールします。

    ```
    sudo apt-get update
    sudo apt-get install observability-pipelines-worker datadog-signing-keys
    ```

4. 観測可能性パイプラインの構成を保存します。

    ```
    echo "<DD_OP_CONFIG>" > /var/lib/observability-pipelines-worker/observability-pipelines-worker.yaml
    ```

   ここで、`DD_OP_CONFIG` は [観測可能性パイプライン UI][7] で作成した観測可能性パイプラインの構成の内容です。


5. ワーカーを起動します。

    ```
    DD_API_KEY=<DD_API_KEY> DD_OP_CONFIG_KEY=<DD_OP_CONFIG_KEY> observability-pipelines-worker run /var/lib/observability-pipelines-worker/observability-pipelines-worker.yaml
    ```

<!--

## コマンド

| 説明                       | コマンド                                                       |
| --------------------------------- | ------------------------------------------------------------- |
| ワーカーを起動する                  | `sudo service datadog-observability-pipelines-worker start`   |
| ワーカーを停止する                   | `sudo service datadog-observability-pipelines-worker stop`    |
| ワーカーを再起動する                | `sudo service datadog-observability-pipelines-worker restart` |
| ワーカーのステータス              | `sudo service datadog-observability-pipelines-worker status`  |
| 実行中のワーカーのステータスページ | `sudo datadog-observability-pipelines-worker status`          |
| コマンドの使用状況を表示する             | `sudo datadog-observability-pipelines-worker --help`          |
| ワーカーをアンインストールする              | `sudo apt remove datadog-observability-pipelines-worker`      |

-->

## コンフィギュレーション

- ワーカーのコンフィギュレーションファイルは `/etc/observability-pipelines-worker/observability-pipelines-worker.yaml` に格納されています。
- すべての構成オプションについては、構成リファレンスを参照してください。
- 構成例は、[データを活用する][6]および構成リファレンスを参照してください。

[1]: https://en.wikipedia.org/wiki/APT_%28software%29
[2]: https://debian.org/
[3]: https://ubuntu.com/
[4]: https://linux.org/
[5]: /ja/account_management/api-app-keys/#api-keys
[6]: /ja/observability_pipelines/working_with_data/
[7]: https://app.datadoghq.com/observability-pipelines

{{% /tab %}}
{{% tab "Helm" %}}

## 概要

Kubernetes 環境に Helm Chart で観測可能性パイプラインワーカーをインストールします。

## 前提条件

インストールする前に、以下があることを確認してください。

1. Kubernetes バージョン 1.15.0-0 以降。
2. datadog-operator をデプロイするための [Helm][1]。
3. datadog-agent をインストールするための [Kubectl CLI][2]。
4. 有効な [Datadog API キー][3]。
5. 観測可能性パイプラインの構成 ID。

## APM に Datadog Agent を構成する

1. 以下のコマンドを実行し、Datadog 観測可能性パイプラインワーカーリポジトリを Helm リポジトリに追加します。

    ```
    helm repo add datadog https://helm.datadoghq.com
    helm repo update
    ```

2. [観測可能性パイプラインワーカー][4]をインストールします。

    ```
    helm install opw datadog/observability-pipelines-worker
    ```

   特定のリリース名のチャートをインストールしたい場合は、次のコマンドを実行し、<RELEASE_NAME> を特定のリリース名に置き換えてください。

    ```
    helm install --name <RELEASE_NAME> \
        --set datadog.apiKey=<DD_API_KEY> \
        --set datadog.configKey=<DD_OP_CONFIG_KEY> \
        datadog/observability-pipelines-worker
    ```

   Datadog のサイトは、`datadog.site` オプションで設定できます。

    ```
    helm install --name <RELEASE_NAME> \
        --set datadog.apiKey=<DD_API_KEY> \
        --set datadog.configKey=<DD_OP_CONFIG_KEY> \
        datadog/observability-pipelines-worker
    ```

   デフォルトでは、観測可能性パイプラインの API キーと構成キーのシークレットが作成されます。しかし、`datadog.apiKeyExistingSecret` や `datadog.appKeyExistingSecret` を設定することで、手動で作成したシークレットを使用することができます。シークレットの作成方法については、次のステップを参照してください。

   **注**: シークレットを作成する際には、キーフィールドの名前を必ず `api-key` と `config-key` にしてください。

   数分後、Datadog で新しいパイプラインがアクティブになるのが確認できるはずです。

3. Datadog API キーと構成キーを含むシークレットを作成し、提供します。Datadog API キーを含むシークレットを作成するには、以下の `<DATADOG_API_KEY>` を組織の Datadog API キーに置き換えてください。このシークレットは、観測可能性パイプラインワーカーをデプロイするためのマニフェストで使用されます。

    ```
    export DATADOG_SECRET_NAME=datadog-secrets
    kubectl create secret generic $DATADOG_SECRET_NAME \
        --from-literal api-key="<DD_API_KEY>" \
        --from-literal config-key="<DD_OP_CONFIG_KEY>"
    ```

   **注**: これにより、デフォルトネームスペースでシークレットが作成されます。カスタムネームスペースを使用している場合、実行前にコマンドのネームスペースフラグを更新します。

   以下のインストールコマンドは、シークレットを参照しています。

    ```
    helm install --name <RELEASE_NAME> \
        --set datadog.apiKeyExistingSecret=$DATADOG_SECRET_NAME \
        --set datadog.configKeyExistingSecret=$DATADOG_SECRET_NAME \
        datadog/observability-pipelines-worker
    ```

## 値

値の一覧は[この表][5]を参照してください。

[1]: https://helm.sh/ 
[2]: https://kubernetes.io/docs/tasks/tools/install-kubectl/
[3]: /ja/account_management/api-app-keys/#api-keys
[4]: https://artifacthub.io/packages/helm/datadog/observability-pipelines-worker
[5]: https://github.com/DataDog/helm-charts/tree/main/charts/observability-pipelines-worker#values

{{% /tab %}}
{{< /tabs >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}