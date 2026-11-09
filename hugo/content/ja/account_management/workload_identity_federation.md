---
algolia:
  tags:
  - workload identity federation
  - cloud authentication
  - aws authentication
  - terraform provider
  - agent authentication
  - delegated auth
aliases:
- /ja/account_management/cloud_authentication/
- /ja/account_management/cloud_provider_authentication/
description: AWS STS 認証と ID マッピングを使用して静的な API キーの代わりにクラウド認証情報を使用し、Workload Identity
  Federation で Datadog Terraform プロバイダーと Datadog Agent を認証します。
further_reading:
- link: /getting_started/integrations/terraform/
  tag: ドキュメント
  text: Datadog を Terraform で管理する
- link: /agent/configuration/
  tag: ドキュメント
  text: Agent 構成
- link: /account_management/api-app-keys/
  tag: ドキュメント
  text: API キーとアプリケーションキー
- link: /integrations/amazon_web_services/
  tag: ドキュメント
  text: AWS インテグレーション
title: ワークロードアイデンティティフェデレーション
---
## 概要 {#overview}

Workload Identity Federation を使用すると、静的な API キーやアプリケーションキーの代わりにクラウド認証情報を使用して、Datadog Terraform プロバイダーと Datadog Agent を認証できます。

現在サポートされているクラウドプロバイダーは AWS のみです。

Workload Identity Federation は、以下で使用できます。

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
<ul>
<li><b>Terraform プロバイダー</b>: Datadog ユーザーまたはサービスアカウントにマッピングされた AWS 認証情報を使用して、Terraform 操作を認証します。すべての顧客が利用できます。</li>
<li><b>Datadog Agent </b>: AWS 認証情報を使用して Agent を認証し、自動的に管理およびローテーションされる API キーを受け取ります。</li>
</ul>
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<ul>
<li><b>Terraform プロバイダー</b>: Datadog ユーザーまたはサービスアカウントにマッピングされた AWS 認証情報を使用して、Terraform 操作を認証します。すべての顧客が利用できます。</li>
</ul>
{{< /site-region >}}

## 仕組み: AWS 認証プロセス {#how-it-works-aws-authentication-process}

認証プロセスでは、[AWS Security Token Service (STS)][1] を使用して ID を検証します。

### Terraform プロバイダーの認証フロー {#terraform-provider-authentication-flow}

1. **証明の生成:** Datadog Terraform プロバイダーは、現在の AWS 認証情報を使用して署名付き AWS STS `GetCallerIdentity` リクエストを作成します。
2. **証明の検証:** Datadog は AWS STS を呼び出して証明を検証し、AWS ARN、ユーザー ID、アカウント ID を取得します。
3. **ID マッピング:** AWS ID は、組織の設定に基づいて Datadog サービスアカウントまたはユーザーアカウントにマッピングされます。
4. **トークンの発行:** 検証が成功すると、Datadog は API アクセス用の一時的な JWT トークンを発行します。
5. **API 認証:** このトークンは、その後の Datadog API 呼び出しに使用されます。

<div class="alert alert-info">可能であれば、ARN をユーザーアカウントではなく Datadog サービスアカウントにマッピングします。サービスアカウントを使用することで、認証プロセスが特定の個人に関連付けられることを回避できます。</div>

### Agent 認証フロー {#agent-authentication-flow}

1. **認証情報の検出:** Agent は、実行環境から AWS 認証情報を取得します。
2. **証明の生成:** Agent は、認証情報へのアクセスを証明するために署名付き AWS STS リクエストを作成します。
3. **証明の検証:** Datadog は署名付きリクエストを AWS に対して検証し、組織のインテークマッピング構成と照らし合わせて確認します。
4. **API キーの発行:** 検証が成功すると、Datadog は自動的にローテーションされる管理対象 API キーを発行します。
5. **Agent の構成:** Agent は、発行された API キーをその後のすべての Datadog API 呼び出しに使用します。

<div class="alert alert-info">委任認証フローが失敗した場合、Agent はファイルに構成されている API キーに <code>datadog.yaml</code> フォールバックします。このフォールバック動作により、既存の構成に対するリスクを抑えながらオンボーディングを進めることができます。</div>

## Workload Identity Federation for AWS をセットアップする {#set-up-workload-identity-federation-for-aws}

**要件**:
- Datadog Terraform プロバイダーのバージョン 3.70 以降。
- [Datadog-AWS インテグレーション][4]を構成し、AWS アカウントを追加していること。[AWS インテグレーションのドキュメント][3]を参照してください。
- アカウントに `workload_identity_federation_config_read` および `workload_identity_federation_config_write` 権限が付与されていること。

Workload Identity Federation for AWS のセットアップは、次の 2 つのパートで構成されます。
1. [Datadog での AWS ID マッピングの構成](#configure-aws-identity-mapping-in-datadog)
2. [Terraform プロバイダー構成の更新](#update-your-terraform-provider-configuration)

### Datadog での AWS ID マッピングの構成 {#configure-aws-identity-mapping-in-datadog}

<div class="alert alert-info"> ID マッピングが機能するには、AWS アカウントが <a href="https://app.datadoghq.com/integrations/amazon-web-services">Datadog-AWS インテグレーション</a>を通じて Datadog と<strong>統合されている必要があります</strong>。AWS アカウントが統合されていない場合、認証フローで呼び出し元を検証できず、マッピングが失敗します。</div>

AWS ID (ARN) を Datadog サービスアカウントまたはユーザーアカウントにマッピングします。ID マッピングは、UI または API を使用して構成します。

AWS で IAM ロールを作成する必要がある場合は、[AWS IAM ロール作成ドキュメント][5]を参照します。

#### UI の使用 {#using-the-ui}

[**Organization Settings** > **Workload Identity Federation**][6] に移動し、**Identity Mappings** タブをクリックします。各マッピングは、特定の Datadog ユーザーまたはサービスアカウントの権限をクラウドロールに付与します。

{{< img src="account_management/workload_identity_federation/identity-mappings-list.png" alt="Workload Identity Federation ページの Identity Mappings タブ。Org UUID フィールドと、Datadog ユーザーおよびサービスアカウントにマッピングされた AWS ARN パターンのリストが表示されています。" style="width:100%;" >}}

<div class="alert alert-warning">Datadog では、IAM ロール ARN ではなく、<strong>assumed-role ARN</strong> を Source Pattern フィールドに入力する必要があります。これら 2 つの形式は異なります。</div>
<ul>
<li><strong>IAM ロール ARN</strong> (AWS コンソールに表示):<code>arn:aws:iam::123456789012:role/my-role</code></li>
<li> <strong>Assumed-role ARN </strong> (Datadog で必須):<code>arn:aws:sts::123456789012:assumed-role/my-role/session-name</code></li>
</ul>
ワークロードの assumed-role ARN を確認するには、ワークロード環境から <code>aws sts get-caller-identity</code> を実行し、レスポンスの <code>Arn</code> フィールドの値を使用します。

ID マッピングを作成するには、次の手順を行います。

1. {{< ui >}}\+ New Mapping{{< /ui >}} をクリックします。
2. **Cloud Provider** を選択します。
3. **Source Pattern (ARN)** を入力します。ワイルドカードパターンには、assumed-role ARN 形式と `*` を使用します (例: `arn:aws:sts::123456789012:assumed-role/terraform-runner/*`)。
4. **Target Identity** を検索して選択します。これは、このクラウド ID が認証を行う Datadog ユーザーまたはサービスアカウントです。
5. {{< ui >}}Create Mapping{{< /ui >}} をクリックします。

{{< img src="account_management/workload_identity_federation/identity-mapping-create.png" alt="クラウドプロバイダー、Source Pattern ARN、Target Identity の各フィールドが表示され、ワイルドカードパターンのサポートについて説明するヘルプテキストが含まれている [Create Identity Mapping] ダイアログ" style="width:70%;" >}}

<div class="alert alert-info">アクセス権が特定の個人に紐付けられないよう、ユーザーアカウントよりもサービスアカウントを使用することを推奨します。</div>

#### API の使用 {#using-the-api}

##### AWS ARN を Datadog ユーザーアカウントにマッピングする {#map-an-aws-arn-to-a-datadog-user-account}
`account_identifier` については、ユーザーの Datadog プロフィールに表示されているメールアドレスを使用します。

**例**: AWS ARN を Datadog ユーザーアカウントにマッピングする API 呼び出し (`john.doe@myorg.com`)。

```bash
# Example: map an AWS ARN to a Datadog User
curl -X POST "{{< region-param key=dd_api code="true" >}}/api/v2/cloud_auth/aws/persona_mapping" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
-d '{
  "data": {
    "type": "aws_cloud_auth_config",
    "attributes": {
      "account_identifier": "john.doe@myorg.com",
      "arn_pattern": "arn:aws:sts::123456789012:assumed-role/terraform-runner"
    }
  }
}'
```

##### AWS ARN を Datadog サービスアカウントにマッピングする {#map-an-aws-arn-to-a-datadog-service-account}
`account_identifier` については、次のいずれかを使用します。
- サービスアカウントの **UUID**: {{< ui >}}Organization settings{{< /ui >}} > {{< ui >}}Service accounts{{< /ui >}} に移動し、マッピングするサービスアカウントをクリックして、URL から `service_account_id` をコピーします。たとえば、URL が `/organization-settings/service-accounts?service_account_id=3fa85f64-5717-4562-b3fc-2c963f66afa6` で終わる場合は、`3fa85f64-5717-4562-b3fc-2c963f66afa6` を使用します。
- サービスアカウントの**メールアドレス**: サービスアカウントの詳細に表示されているメールアドレスを使用します。

**例**: UUID を使用して AWS ARN を Datadog サービスアカウントにマッピングする API 呼び出し (`3fa85f64-5717-4562-b3fc-2c963f66afa6`)。

```bash
# Example: map an AWS ARN to a Datadog Service Account using UUID
curl -X POST "{{< region-param key=dd_api code="true" >}}/api/v2/cloud_auth/aws/persona_mapping" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
-d '{
  "data": {
    "type": "aws_cloud_auth_config",
    "attributes": {
      "account_identifier": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "arn_pattern": "arn:aws:sts::123456789012:assumed-role/terraform-runner"
    }
  }
}'
```

**例**: メールアドレスを使用して AWS ARN を Datadog サービスアカウントにマッピングする API 呼び出し (`terraform-service-account@myorg.com`)。

```bash
# Example: map an AWS ARN to a Datadog Service Account using email
curl -X POST "{{< region-param key=dd_api code="true" >}}/api/v2/cloud_auth/aws/persona_mapping" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
-d '{
  "data": {
    "type": "aws_cloud_auth_config",
    "attributes": {
      "account_identifier": "terraform-service-account@myorg.com",
      "arn_pattern": "arn:aws:sts::123456789012:assumed-role/terraform-runner"
    }
  }
}'
```

##### ARN パターンでのワイルドカードの使用 {#using-wildcards-in-arn-patterns}

ARN パターンはワイルドカードマッチングをサポートしており、リソース ARN の動的または可変部分を処理できます。これは、セッション識別子やその他の可変コンポーネントを含む引き受けロールを扱う場合に便利です。

**ワイルドカードのルール**:
- ワイルドカード (`*`) は、リソース ARN の最後の部分でのみ使用できます。
- ワイルドカードの前に特定のリソースを指定する必要があります。
- ワイルドカードを ARN の途中に配置することはできません。

**例**: `DatadogTerraformerRole` を引き受ける任意のセッションに一致させます。

```bash
curl -X POST "{{< region-param key=dd_api code="true" >}}/api/v2/cloud_auth/aws/persona_mapping" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
-d '{
  "data": {
    "type": "aws_cloud_auth_config",
    "attributes": {
      "account_identifier": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "arn_pattern": "arn:aws:sts::123456789012:assumed-role/DatadogTerraformerRole/*"
    }
  }
}'
```

このパターンは、次のような実際の引き受けロール ARN に一致します。
- `arn:aws:sts::123456789012:assumed-role/DatadogTerraformerRole/run-abcdefghijk`
- `arn:aws:sts::123456789012:assumed-role/DatadogTerraformerRole/session-xyz789`

<div class="alert alert-info">ワイルドカードマッチングは、ロールセッションに動的に生成された識別子が含まれる CI/CD パイプラインで特に役立ちます。</div>

##### 既存のマッピングの一覧表示 {#list-existing-mappings}

```bash
curl -X GET "{{< region-param key=dd_api code="true" >}}/api/v2/cloud_auth/aws/persona_mapping" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}"
```

### Terraform プロバイダー構成の更新 {#update-your-terraform-provider-configuration}

ID マッピングを構成した後、Datadog Terraform プロバイダーの構成を更新して Workload Identity Federation を使用します。

#### 既存の構成の削除 {#remove-your-existing-configuration}

```hcl
# Old configuration
provider "datadog" {
  api_key = var.datadog_api_key
  app_key = var.datadog_app_key
}
```

#### 新しい Workload Identity Federation 構成の追加 {#add-the-new-workload-identity-federation-configuration}

`org_uuid` を取得するには、[**Organization Settings** > **Workload Identity Federation**][6] ページで直接確認するか、次のエンドポイントを呼び出します (ターゲット組織でのアクティブなセッションが必要です): [{{< region-param key=dd_api >}}/api/v2/current_user][2]

```hcl
# New configuration using AWS authentication
provider "datadog" {
  org_uuid             = var.datadog_org_uuid
  cloud_provider_type  = "aws"
}
```

#### オプション: AWS 認証情報の明示的な指定 {#optional-specify-aws-credentials-explicitly}
環境変数や AWS 認証情報ファイルを使用する代わりに、Terraform 構成で AWS 認証情報を直接指定することもできます。

```hcl
provider "datadog" {
  org_uuid              = var.datadog_org_uuid
  cloud_provider_type   = "aws"
  aws_access_key_id     = var.aws_access_key_id
  aws_secret_access_key = var.aws_secret_access_key
  aws_session_token     = var.aws_session_token  # If using temporary credentials
}
```

Terraform プロバイダーは、構成された AWS 認証情報を使用して Datadog に対する認証を自動的に行います。

## Datadog Agent の Workload Identity Federation の設定 {#set-up-workload-identity-federation-for-the-datadog-agent}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Datadog Agent の Workload Identity Federation は、選択された <a href="/getting_started/site">Datadog サイト</a> ({{< region-param key="dd_site_name" >}}) では利用できません。</div>
{{< /site-region >}}

Agent の Workload Identity Federation を使用すると、静的な API キーを管理する代わりに、AWS 認証情報を使用して Agent を認証できます。Agent は、AWS 認証証明を、Datadog が自動的にローテーションする管理対象 API キーと交換します。

### 要件 {#requirements}

- Agent が AWS 認証情報を取得する方法に基づく、サポートされている Agent のバージョンとタイプ。[サポートされている Agent のバージョンと AWS 認証情報](#supported-agent-versions-and-aws-credentials) を参照してください。
- AWS 認証情報へのアクセス権を持つ AWS 環境で実行されている Agent (例: IAM ロールを持つ EC2 インスタンス、ECS タスク、EKS Pod)。
- AWS アカウントが追加された、構成済みの [Datadog-AWS インテグレーション][4]。
- `workload_identity_federation_config_read` および `workload_identity_federation_config_write` 権限。

####  サポートされている Agent のバージョンと AWS 認証情報 {#supported-agent-versions-and-aws-credentials}

Workload Identity Federation のサポートは、Agent のバージョン、Agent のタイプ、および Agent が AWS 認証情報を取得する方法によって異なります。

| Agent が AWS 認証情報を取得する方法 | Agent 7.78-7.81 | Agent 7.82 | Agent 7.83+ |
|---|---|---|---|
|  環境変数 (`AWS_ACCESS_KEY_ID`、`AWS_SECRET_ACCESS_KEY`) |  すべての Agent | すべての Agent | すべての Agent |
| EC2 インスタンスメタデータサービス (IMDS) ロール | Core Agent のみ | Core Agent のみ | すべての Agent |
| EKS IRSA (`AWS_ROLE_ARN`、`AWS_WEB_IDENTITY_TOKEN_FILE`) | サポートされていません | Core Agent のみ | すべての Agent |
| ECS タスクロールまたは EKS Pod Identity (`AWS_CONTAINER_CREDENTIALS_*`) | サポートされていません | Core Agent のみ | すべての Agent |

**Core Agent**: Agent、Cluster Agent、Process Agent、Security Agent、System Probe、およびインストーラー。

**すべての Agent**: Core Agent に加え、Trace Agent、スタンドアロン DogStatsD、Private Action Runner、IoT Agent、および Heroku Agent。

OpenTelemetry Collector (`otel-agent`) は Workload Identity Federation をサポートしていません。現在サポートされているクラウドプロバイダーは AWS のみです。Azure、Google Cloud、および汎用 OIDC プロバイダーはサポートされていません。

<div class="alert alert-info">サポートされていない Agent タイプ、クラウドプロバイダー、または認証情報の提供方法を使用している場合は、<a href="/help/"> Datadog サポートに機能リクエストを送信します</a>。</div>

Agent の Workload Identity Federation を設定するには、次の 2 つのステップを実行します。
1. [Datadog での AWS インテークマッピングの構成](#configure-aws-intake-mapping-in-datadog)
2. [Agent 構成の更新](#update-your-agent-configuration)

### Datadog で AWS インテークマッピングを構成する {#configure-aws-intake-mapping-in-datadog}

<div class="alert alert-info">インテークマッピングを機能させるには、AWS アカウントが <a href="https://app.datadoghq.com/integrations/amazon-web-services">Datadog-AWS インテグレーション</a>を通じて Datadog と<strong>統合されている必要があります</strong>。AWS アカウントが統合されていない場合、認証フローで呼び出し元を検証できず、マッピングが失敗します。</div>

インテークマッピングを構成して、Agent 認証のために特定の AWS ARN パターンを許可します。ID マッピングとは異なり、インテークマッピングでは ARN パターンのみが必要です。Agent はユーザーアクションの実行ではなくデータの送信のために認証を行うため、Datadog アカウント識別子は不要です。Datadog は、基盤となる API キーを自動的にプロビジョニング、構成、およびローテーションします。

AWS で IAM ロールを作成する必要がある場合は、[AWS IAM ロール作成ドキュメント][5]を参照します。

#### UI の使用 {#using-the-ui-1}

[**Organization Settings** > **Workload Identity Federation**][6] に移動し、**Intake Mappings** タブをクリックします。

{{< img src="account_management/workload_identity_federation/intake-mappings-list.png" alt="Workload Identity Federation ページの Intake Mappings タブ。Org UUID フィールドと、Agent 認証が許可されている AWS ARN パターンのリストが表示されています。" style="width:100%;" >}}

<div class="alert alert-warning">Datadog では、IAM ロール ARN ではなく、<strong>assumed-role ARN</strong> を Source Pattern フィールドに入力する必要があります。これら 2 つの形式は異なります。</div>
<ul>
<li><strong>IAM ロール ARN</strong> (AWS コンソールに表示):<code>arn:aws:iam::123456789012:role/my-role</code></li>
<li> <strong>Assumed-role ARN </strong> (Datadog で必須):<code>arn:aws:sts::123456789012:assumed-role/my-role/session-name</code></li>
</ul>
ワークロードの assumed-role ARN を確認するには、ワークロード環境から <code>aws sts get-caller-identity</code> を実行し、レスポンスの <code>Arn</code> フィールドの値を使用します。

インテークマッピングを作成するには、次の手順を行います。

1. {{< ui >}}\+ New Mapping{{< /ui >}} をクリックします。
2. **Cloud Provider** を選択します。
3. **Source Pattern (ARN)** を入力します。ワイルドカードパターンには、assumed-role ARN 形式と `*` を使用します (例: `arn:aws:sts::123456789012:assumed-role/DatadogAgentRole/*`)。
4. {{< ui >}}Create Mapping{{< /ui >}} をクリックします。

{{< img src="account_management/workload_identity_federation/intake-mapping-create.png" alt="クラウドプロバイダーと Source Pattern ARN の各フィールドが表示され、ワイルドカードパターンのサポートについて説明するヘルプテキストが含まれている [Create Intake Mapping] ダイアログ" style="width:70%;" >}}

#### API の使用 {#using-the-api-1}

##### インテークマッピングの作成 {#create-an-intake-mapping}

**例**: 特定の IAM ロールで実行されている Agent の認証を許可する API 呼び出し。

```bash
curl -X POST "{{< region-param key=dd_api code="true" >}}/api/v2/cloud_auth/aws/intake_mapping" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
-d '{
  "data": {
    "type": "aws_cloud_auth_intake_mapping",
    "attributes": {
      "arn_pattern": "arn:aws:sts::123456789012:assumed-role/DatadogAgentRole/*"
    }
  }
}'
```

##### ARN パターンでのワイルドカードの使用 {#using-wildcards-in-arn-patterns-1}

ARN パターンはワイルドカードマッチングをサポートしており、リソース ARN の動的または可変部分を処理できます。これは、セッション識別子を含む引き受けロールを扱う場合や、複数の Agent インスタンスがある場合に便利です。

**ワイルドカードのルール**:
- ワイルドカード (`*`) は、リソース ARN の最後の部分でのみ使用できます。
- ワイルドカードの前に特定のリソースを指定する必要があります。
- ワイルドカードを ARN の途中に配置することはできません。

**例**: `DatadogAgentRole` を引き受ける任意のセッションに一致させます。

```bash
curl -X POST "{{< region-param key=dd_api code="true" >}}/api/v2/cloud_auth/aws/intake_mapping" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
-d '{
  "data": {
    "type": "aws_cloud_auth_intake_mapping",
    "attributes": {
      "arn_pattern": "arn:aws:sts::123456789012:assumed-role/DatadogAgentRole/*"
    }
  }
}'
```

このパターンは、次のような実際の引き受けロール ARN に一致します。
- `arn:aws:sts::123456789012:assumed-role/DatadogAgentRole/i-0abc123def456`
- `arn:aws:sts::123456789012:assumed-role/DatadogAgentRole/eks-datadog-agent-xyz`

##### 既存のインテークマッピングの一覧表示 {#list-existing-intake-mappings}

```bash
curl -X GET "{{< region-param key=dd_api code="true" >}}/api/v2/cloud_auth/aws/intake_mapping" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}"
```

##### インテークマッピングの削除 {#delete-an-intake-mapping}

```bash
curl -X DELETE "{{< region-param key=dd_api code="true" >}}/api/v2/cloud_auth/aws/intake_mapping/<MAPPING_UUID>" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}"
```

### Agent 構成の更新 {#update-your-agent-configuration}

インテークマッピングを構成した後、Agent 構成を更新して Workload Identity Federation を使用します。

#### グローバル構成 {#global-configuration}

すべての Agent データに対して Workload Identity Federation を有効にするには、`datadog.yaml` ファイルに `delegated_auth` セクションを追加します。

```yaml
delegated_auth:
  org_uuid: <YOUR_ORG_UUID>
```

`org_uuid` を取得するには、[**Organization Settings** > **Workload Identity Federation**][6] ページで直接確認するか、次のエンドポイントを呼び出します (ターゲット組織でのアクティブなセッションが必要です): [{{< region-param key=dd_api >}}/api/v2/current_user][2]

Agent は、AWS 環境で実行されているかどうかを自動検出し、利用可能な AWS 認証情報を使用します。

#### プロバイダー固有のオプション {#provider-specific-options}

AWS を認証プロバイダーとして明示的に構成し、プロバイダー固有のオプションを指定するには、`provider` および `aws` のサブセクションを使用します。

```yaml
delegated_auth:
  org_uuid: <YOUR_ORG_UUID>
  provider: aws  # Optional: auto-detects if omitted
  aws:
    region: <AWS_REGION>  # Optional: auto-detects from IMDS if omitted or uses global STS
```

`<AWS_REGION>` を、STS 認証に使用する AWS リージョン (例: `us-east-1`) に置き換えます。

#### 製品ごとの構成 {#per-product-configuration}

特定の Agent 製品に対して、個別に委任認証を有効にできます。これは、異なるデータ型を異なる Datadog 組織に送信する場合や、特定の製品に対してのみ Workload Identity Federation を使用する場合に便利です。

ログに対してのみ委任認証を有効にするには、

```yaml
logs_config:
  delegated_auth:
    org_uuid: <YOUR_ORG_UUID>
```

製品ごとに異なる組織を使用するには、

```yaml
delegated_auth:
  org_uuid: <YOUR_GLOBAL_ORG_UUID>
  provider: aws
  aws:
    region: <AWS_REGION>

logs_config:
  delegated_auth:
    org_uuid: <YOUR_LOGS_ORG_UUID>
```

<div class="alert alert-info">プロバイダー固有の設定 ( <code>provider</code> や <code>aws</code>など) は、グローバルな <code>delegated_auth</code> セクションでのみ構成されます。製品ごとのセクションでは、 <code>org_uuid</code>のみがサポートされます。</div>

#### フォールバック動作{#fallback-behavior}

何らかの理由で委任認証フローが失敗した場合、Agent は `datadog.yaml` ファイルに構成された API キーを使用するように自動的にフォールバックします。このフォールバック動作は、オンボーディング中のセーフティネットとして機能し、認証サービスの中断から保護します。

このフォールバックを利用するには、既存の `api_key` 構成を新しい `delegated_auth` 構成と併用します。

```yaml
api_key: <YOUR_API_KEY>

delegated_auth:
  org_uuid: <YOUR_ORG_UUID>
```

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.aws.amazon.com/STS/latest/APIReference/welcome.html
[2]: https://app.datadoghq.com/api/v2/current_user
[3]: /ja/integrations/amazon-web-services/
[4]: https://app.datadoghq.com/integrations/amazon-web-services
[5]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create.html
[6]: https://app.datadoghq.com/organization-settings/workload-identity-federation