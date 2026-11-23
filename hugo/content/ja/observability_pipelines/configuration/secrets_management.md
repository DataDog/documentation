---
description: Observability Pipelines Worker がシークレットマネージャーからシークレットを取得するように設定する方法を学習します。
disable_toc: false
further_reading:
- link: /observability_pipelines/configuration/set_up_pipelines/"
  tag: ドキュメント
  text: パイプラインをセットアップする
- link: /observability_pipelines/configuration/install_the_worker"
  tag: ドキュメント
  text: Worker をインストールする
title: シークレット管理
---
## 概要{#overview}

Observability Pipelines Worker は、次のシークレット管理ソリューションと統合することにより、シークレットを安全に管理する上で役立ちます。

- AWS Secrets Manager
- AWS Systems Manager
- Azure Key Vault
- HashiCorp Vault
- JSON ファイル
- YAML ファイル

**注**:
- Kubernetes Secrets を使用する場合は、[シークレットのキー値ペアをコンテナ環境変数として構成する][6]の手順に従い、Observability Pipelines Worker の環境変数としてシークレットをセットアップしてください。
- パイプラインをセットアップし、Observability Pipelines Worker をインストールする際に、シークレット識別子を入力してから環境変数を使用することを選択した場合、環境変数は入力された識別子となり、`DD_OP` が前に付加されます。たとえば、パスワード識別子に `PASSWORD_1` を入力した場合、そのパスワードの環境変数は `DD_OP_PASSWORD_1` になります。

## シークレットを取得するように Observability Pipelines Worker を構成する{#configure-the-worker-to-retrieve-secrets}

{{% collapse-content title="AWS Secrets Manager" level="h3" expanded=false id="aws-secrets-manager" %}}

#### AWS インスタンスプロファイルのセットアップ{#set-up-an-aws-instance-profile}

AWS によりすべての環境変数とセッションプロファイルが処理されるため、Datadog は [インスタンスプロファイルメソッド][1]を使用してシークレットを取得することを推奨しています。セットアップ手順については、公式の [AWS Secrets Manager ドキュメント][2]を参照してください。

#### Observability Pipelines Worker が AWS Secrets Manager を使用するように構成する{#configure-the-worker-to-use-aws-secrets-manager}

{{< tabs >}}
{{% tab "Docker または Linux" %}}
[Observability Pipelines Worker をインストール][1]した後、AWS Secrets Manager を使用してシークレットを解決するように Observability Pipelines Worker の[ブートストラップファイル][2]を構成します。

```yaml
backend_type: aws
backend_config:
  aws_session:
    aws_region: <region_name>
```

[1]: /ja/observability_pipelines/configuration/install_the_worker/?interface=ui&platform=docker&secrets_source=secrets_management
[2]: /ja/observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/

{{% /tab %}}
{{% tab "Kubernetes" %}}
[Observability Pipelines Worker をインストールする][1]前に、ブートストラップ構成を Helm チャート `values.yaml` ファイルの [`datadog.bootstrap.config`][2] セクションに追加します。

```yaml
bootstrap:
  config:
    secret:
      backend_type: aws
      backend_config:
        aws_session:
          aws_region: <region_name>
```

[1]: /ja/observability_pipelines/configuration/install_the_worker/?interface=ui&platform=kubernetes&secrets_source=secrets_management
[2]: https://github.com/DataDog/helm-charts/blob/main/charts/observability-pipelines-worker/values.yaml#L46

{{% /tab %}}
{{< /tabs >}}

次の `aws_session` 設定が利用可能です。

| 設定 | 説明 |
| ----- | ----- |
| aws_region | AWS リージョン |
| aws_profile | AWS セッションプロファイル |
| aws_role_arn | AWS sts:AssumeRole ARN |
| aws_external_id | AWS sts:AssumeRole ExternalId |
| aws_access_key_id | AWS IAM ユーザーアクセスキー ID |
| aws_secret_access_key | AWS IAM ユーザーアクセスキーシークレット |

ほとんどの場合、Secrets Manager シークレットをホストしているリージョンに対応するように `aws_region` を指定する必要があります。

単一の文字列を処理する場合、バックエンド構成設定 `force_string: true` はシークレットを文字列値として強制変換します。

{{% /collapse-content %}}
{{% collapse-content title="AWS Systems Manager" level="h3" expanded=false id="aws-systems-manager" %}}

#### AWS インスタンスプロファイルのセットアップ {#set-up-an-aws-instance-profile-1}

AWS によりすべての環境変数とセッションプロファイルが処理されるため、Datadog は [インスタンスプロファイルメソッド][1]を使用してシークレットを取得することを推奨しています。セットアップ手順については、[AWS Systems Manager Parameter Store][4] の公式ドキュメントを参照してください。

#### Observability Pipelines Worker が AWS Systems Manager を使用するように構成する {#configure-the-worker-to-use-aws-systems-manager}

{{< tabs >}}
{{% tab "Docker または Linux" %}}
[Observability Pipelines Worker をインストール][1]した後、AWS Systems Manager を使用してシークレットを解決するように Observability Pipelines Worker の[ブートストラップファイル][2]を構成してください。

```yaml
secret:
  backend_type: aws_parameter_store
  backend_config:
    aws_session:
      aws_region: <region_name>
```

[1]: /ja/observability_pipelines/configuration/install_the_worker/?interface=ui&platform=docker&secrets_source=secrets_management
[2]: /ja/observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/

{{% /tab %}}
{{% tab "Kubernetes" %}}
[Observability Pipelines Worker をインストールする][1]前に、ブートストラップ構成を Helm チャート `values.yaml` ファイルの [`datadog.bootstrap.config`][2] セクションに追加します。

```yaml
bootstrap:
  config:
    secret:
      backend_type: aws_parameter_store
      backend_config:
        aws_session:
          aws_region: <region_name>
```

[1]: /ja/observability_pipelines/configuration/install_the_worker/?interface=ui&platform=kubernetes&secrets_source=secrets_management
[2]: https://github.com/DataDog/helm-charts/blob/main/charts/observability-pipelines-worker/values.yaml#L46

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}
{{% collapse-content title="Azure Key Vault" level="h3" expanded=false id="azure-key-vault" %}}

#### Azure 認証をセットアップする {#set-up-azure-authentication}

Datadog は、Azure での認証にマネージド ID を使用することを推奨しています。これにより、クラウドリソースを AMI アカウントに関連付けることができ、Observability Pipelines Worker の構成ファイルに機密情報を記載する必要がなくなります。

#### マネージド ID を作成する {#create-a-managed-identity}

Key Vault にアクセスするには、マネージド ID を作成し、VM に割り当てます。次に、そのマネージド ID がシークレットにアクセスできるように、Key Vault で適切なロール割り当てを構成します。

#### Observability Pipelines Worker が Azure Key Vault を使用するように構成する {#configure-the-worker-to-use-azure-key-vault}

{{< tabs >}}
{{% tab "Docker または Linux" %}}
[Observability Pipelines Worker をインストール][1]した後、Observability Pipelines Worker の [ブートストラップファイル][2] を構成して、Azure Key Vault を使用してシークレットを解決してください。

```yaml
backend_type: azure
backend_config:
  keyvaulturl: <key_vault_url>
```

[1]: /ja/observability_pipelines/configuration/install_the_worker/?interface=ui&platform=docker&secrets_source=secrets_management
[2]: /ja/observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/

{{% /tab %}}
{{% tab "Kubernetes" %}}
[Observability Pipelines Worker をインストールする][1]前に、ブートストラップ構成を Helm チャート `values.yaml` ファイルの [`datadog.bootstrap.config`][2] セクションに追加します。

```yaml
bootstrap:
  config:
    secret:
      backend_type: azure
      backend_config:
        keyvaulturl: <key_vault_url>
```

[1]: /ja/observability_pipelines/configuration/install_the_worker/?interface=ui&platform=kubernetes&secrets_source=secrets_management
[2]: https://github.com/DataDog/helm-charts/blob/main/charts/observability-pipelines-worker/values.yaml#L46

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}
{{% collapse-content title="HashiCorp Vault" level="h3" expanded=false id="hashicorp-vault" %}}

#### HashiCorp Vault をセットアップする {#set-up-hashicorp-vault}

1. HashiCorp Vault を実行します。詳細については、公式の [HashiCorp Vault ドキュメント][5] を参照してください。
2. Vault からシークレットを取得するための権限を付与するポリシーを記述します。`*.hcl` ファイルを作成し、Secrets Engine バージョン 1 を使用する場合は、次の権限を含めます。

    ```
    path "<your mount path>/<additional subpath>" {
      capabilities = ["read"]
    }
    ```

   Secrets Engine バージョン 2 を使用する場合は、次の権限が必要です。

    ```
    path "<your_mount_path>/data/<additional_subpath>" {
      capabilities = ["read"]
    }

    /*
    Datadog needs access to mount information to check the Secrets Engine version
    number. If access isn't granted, version 1 is assumed.
    */
    path "sys/mounts" {
      capabilities = ["read"]
    }
    ```

3. `vault policy write <policy_name> <path_to_*.hcl_file>` を実行します。
4. Vault の認証方法を選択します。AWS インスタンスプロファイルメソッドを使用する場合は、`vault auth enable aws` を実行します。

#### AWS に接続されたマシン用に AWS インスタンスプロファイルをセットアップする {#set-up-an-aws-instance-profile-for-an-aws-connected-machine}

AWS に接続されたマシンから HashiCorp Vault を実行している場合、Datadog は [AWS インスタンスプロファイルメソッド][1]を使用して認証することを推奨しています。

#### Observability Pipelines Worker が HashiCorp Vault を使用するように構成する {#configure-the-worker-to-use-hashicorp-vault}

{{< tabs >}}
{{% tab "Docker または Linux" %}}
[Observability Pipelines Worker をインストール][1]した後、HashiCorp Vault でシークレットを解決するように Observability Pipelines Worker の[ブートストラップファイル][2]を構成してください。

```yaml
secret:
  backend_type: vault
  backend_config:
    vault_address: http://myvaultaddress.net
    vault_tls_config:
      # ... TLS settings if applicable
    vault_session:
      vault_auth_type: aws
      # ... additional session settings
```

[1]: /ja/observability_pipelines/configuration/install_the_worker/?interface=ui&platform=docker&secrets_source=secrets_management
[2]: /ja/observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/

{{% /tab %}}
{{% tab "Kubernetes" %}}
[Observability Pipelines Worker をインストールする][1]前に、ブートストラップ構成を Helm チャート `values.yaml` ファイルの [`datadog.bootstrap.config`][2] セクションに追加します。

```yaml
bootstrap:
  config:
    secret:
      backend_type: vault
      backend_config:
        vault_address: http://myvaultaddress.net
        vault_tls_config:
          # ... TLS settings if applicable
        vault_session:
          vault_auth_type: aws
          # ... additional session settings
```

[1]: /ja/observability_pipelines/configuration/install_the_worker/?interface=ui&platform=kubernetes&secrets_source=secrets_management
[2]: https://github.com/DataDog/helm-charts/blob/main/charts/observability-pipelines-worker/values.yaml#L46

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}
{{% collapse-content title="JSON ファイル" level="h3" expanded=false id="json-file" %}}

#### 必要なファイル権限 {#file-permissions-required}

ファイルバックエンドには、構成された JSON ファイルに対する**読み取り**権限のみが必要です。この権限がローカルの Observability Pipelines Worker ユーザーに付与される必要があります。

#### Observability Pipelines Worker が JSON ファイルシークレットバックエンドを使用するように構成する{#configure-the-worker-to-use-a-json-file-secret-backend}

{{< tabs >}}
{{% tab "Docker または Linux" %}}
[Observability Pipelines Worker をインストール][1]した後、JSON ファイルでシークレットを解決するように Observability Pipelines Worker の[ブートストラップファイル][2]を構成してください。

```yaml
secret:
  backend_type: json
  backend_config:
    file_path: /path/to/json/file.json
```

#### JSON シークレットファイルを作成する{#create-a-json-secrets-file}

識別子とそのシークレット値を格納するファイル `/path/to/json/file.json` を作成します。

```json
{
  "us1_api": "<api_key>",
  "secret_identifier1": "<secret1>"
}
```

[1]: /ja/observability_pipelines/configuration/install_the_worker/?interface=ui&platform=docker&secrets_source=secrets_management
[2]: /ja/observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/


{{% /tab %}}
{{% tab "Kubernetes" %}}
`secretFileContents` を構成するためにファイルを渡すことはできませんが、シークレットと識別子のマッピングを Helm チャート `values.yaml` ファイルの [`datadog.bootstrap.secretFileContents`][1] セクションに追加することはできます。

```yaml
bootstrap:
  secretFileContents:
    us1_api: "<api_key>"
    secret_identifier1: "<secret1>"
```

[1]: https://github.com/DataDog/helm-charts/blob/main/charts/observability-pipelines-worker/values.yaml#L46

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}
{{% collapse-content title="YAML ファイル" level="h3" expanded=false id="yaml-file" %}}

#### 必要なファイル権限 {#file-permissions-required-1}

ファイルバックエンドには、設定された YAML ファイルに対する **読み取り**権限のみが必要です。この権限がローカルの Observability Pipelines Worker ユーザーに付与される必要があります。

#### Observability Pipelines Worker が YAML ファイルシークレットバックエンドを使用するように構成する {#configure-the-worker-to-use-a-yaml-file-secret-backend}

{{< tabs >}}
{{% tab "Docker または Linux" %}}
[Observability Pipelines Worker をインストール][1]した後、YAML ファイルでシークレットを解決するように Observability Pipelines Worker の [ブートストラップファイル][2] を構成してください。

```
secret:
  backend_type: yaml
  backend_config:
    file_path: /path/to/yaml/file.yaml
```

#### YAML シークレットファイルを作成する{#create-a-yaml-secrets-file}

識別子とそのシークレット値を格納するファイル `/path/to/yaml/file.yaml` を作成します。

```
# /path/to/yaml/file.yaml

us1_api: "<api_key>"
secret_identifier1: "<secret1>"
```

[1]: /ja/observability_pipelines/configuration/install_the_worker/?interface=ui&platform=docker&secrets_source=secrets_management
[2]: /ja/observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/

{{% /tab %}}
{{% tab "Kubernetes" %}}

`secretFileContents` を構成するためにファイルを渡すことはできませんが、シークレットと識別子のマッピングを Helm チャート `values.yaml` ファイルの [`datadog.bootstrap.secretFileContents`][1] セクションに追加することはできます。

```yaml
bootstrap:
  secretFileContents:
    us1_api: "<api_key>"
    secret_identifier1: "<secret1>"
```

[1]: https://github.com/DataDog/helm-charts/blob/main/charts/observability-pipelines-worker/values.yaml#L46

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

## 実行時のシークレットのリフレッシュ{#refresh-secrets-at-runtime}

Observability Pipelines Workerは、起動時および設定の再読み込み時にシークレットを解決します。Observability Pipelines Worker を再起動せずにローテーションされたシークレット値を取得するには、`SIGHUP` シグナルを送信してください。

**注**: ローテーションされたシークレットの値が無効な場合、再読み込みは失敗します。Datadog は、Observability Pipelines Worker またはノードごとに再読み込みを順次実行し、続行する前に Observability Pipelines Worker の健全性を確認することを推奨しています。

{{< tabs >}}
{{% tab "Docker または Linux" %}}
Worker プロセスに `SIGHUP` を送信します:

```shell
kill -HUP <worker_pid>
```

{{% /tab %}}
{{% tab "Kubernetes" %}}
各 Pod 内の Worker プロセスに `SIGHUP` を送信します:

```shell
kubectl exec <pod_name> -- kill -HUP 1
```

{{% /tab %}}
{{< /tabs >}}

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-ec2_instance-profiles.html
[2]: https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html
[3]: /ja/observability_pipelines/configuration/install_the_worker/?interface=ui&platform=docker&secrets_source=secrets_management
[4]: https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html
[5]: https://developer.hashicorp.com/
[6]: https://kubernetes.io/docs/tasks/inject-data-application/distribute-credentials-secure/#configure-all-key-value-pairs-in-a-secret-as-container-environment-variables