---
title: AWS インテグレーションの更新
type: apicontent
order: 15.03
external_redirect: '/api/#update-an-aws-integration'
---
## AWS インテグレーションの更新

Datadog-Amazon Web Services インテグレーションを更新します。

**クエリパラメーター** [*curl のみ*]:

* **`account_id`** [必須]:

  ダッシュのない**既存**の AWS アカウント ID。クエリパラメーターとして渡す必要があります。
  ロールベースのアカウント構成にのみ必要です。
    AWS アカウント ID の詳細については、[Datadog AWS インテグレーション][1]を参照してください。

* **`role_name`** [必須]:

  **既存**の Datadog のロールの委任名。クエリパラメーターとして渡す必要があります。
  ロールベースのアカウント構成にのみ必要です。
    AWS アカウントのロール名の詳細については、[Datadog AWS インテグレーション構成情報を参照してください][2]。

* **`access_key_id`** [*必須*]:

  **既存**の AWS アクセスキー ID。
  AWS アカウントが GovCloud または China アカウントの場合にのみ必要です。変更する既存の対応するアクセスキー ID を入力します。
  クエリパラメーターとして渡す必要があります。

* **`secret_access_key`** [*必須*]:

  **既存**の AWS シークレットアクセスキー。
  AWS アカウントが GovCloud または China アカウントの場合にのみ必要です。対応するアクセスキー ID を入力します。
  クエリパラメーターとして渡す必要があります。

**CURL 固有の引数**:

* **`account_id`** [*任意*、*curl のみ*]:

  ダッシュのない**新規**の AWS アカウント ID。引数として渡す必要があります。
    AWS アカウント ID の詳細については、[Datadog AWS インテグレーション][1]を参照してください。

* **`role_name`** [*任意*、*curl のみ*]:

  **新規**の Datadog のロールの委任名。引数として渡す必要があります。
    AWS アカウントのロール名の詳細については、[Datadog AWS インテグレーション構成情報を参照してください][2]。

* **`access_key_id`** [*任意*、*curl のみ*]:

  **新規**の AWS アクセスキー ID。
  AWS アカウントが GovCloud または China アカウントの場合にのみ適用されます。

* **`secret_access_key`** [*任意*、*curl のみ*]:

  **新規**の AWS シークレットアクセスキー。
  AWS アカウントが GovCloud または China アカウントの場合にのみ必要です。

**引数**:

* **`account_id`** [*必須*、*Python と Ruby*]:

  ダッシュのない**既存**の AWS アカウント ID。引数として渡す必要があります。
    AWS アカウント ID の詳細については、[Datadog AWS インテグレーション][1]を参照してください。

* **`role_name`** [*必須*、*Python と Ruby*]:

  **既存**の Datadog のロールの委任名。引数として渡す必要があります。
    AWS アカウントのロール名の詳細については、[Datadog AWS インテグレーション構成情報を参照してください][2]。

* **`access_key_id`** [*必須*、*Python と Ruby*]:

  **既存**の AWS アクセスキー ID。
  AWS アカウントが GovCloud または China アカウントの場合にのみ必要です。

* **`secret_access_key`** [*必須*、*Python と Ruby*]:

  **既存**の AWS シークレットアクセスキー。
  AWS アカウントが GovCloud または China アカウントの場合にのみ必要です。

* **`new_account_id`** [*任意*、*Python と Ruby*]:

  ダッシュのない**新規**の AWS アカウント ID。引数として渡す必要があります。
    AWS アカウント ID の詳細については、[Datadog AWS インテグレーション][1]を参照してください。

* **`new_role_name`** [*任意*、*Python と Ruby*]:

  **新規**の Datadog のロールの委任名。引数として渡す必要があります。
    AWS アカウントのロール名の詳細については、[Datadog AWS インテグレーション構成情報を参照してください][2]。

* **`new_access_key_id`** [*任意*、*Python と Ruby*]:

  **新規**の AWS アクセスキー ID。
  AWS アカウントが GovCloud または China アカウントの場合にのみ適用されます。

* **`new_secret_access_key`** [*任意*、*Python と Ruby*]:

  **新規**の AWS シークレットアクセスキー。
  AWS アカウントが GovCloud または China アカウントの場合にのみ適用されます。

* **`filter_tags`** [オプション、デフォルト = **None**]:

    この EC2 タグ (`key:value` 形式) の配列は、EC2 からメトリクスを収集する際に Datadog が使用するフィルターを定義します。`?` (1 文字) や `*` (複数文字) などのワイルドカードも使用できます。
    定義されたタグのいずれかに一致するホストだけが Datadog にインポートされます。それ以外は無視されます。タグの前に `!` を追加することで、指定されたタグに一致するホストを除外することもできます。
    例: `env:production,instance-type:c1.*,!region:us-east-1`
    EC2 のタグ付けの詳細については、[AWS のタグ付けに関するドキュメント][3]を参照してください。

* **`host_tags`** [オプション、デフォルト = **None**]:

    このインテグレーションを介して報告しているすべてのホストおよびメトリクスに追加されるタグ (`key:value` 形式) の配列。

* **`account_specific_namespace_rules`** [オプション、デフォルト = **None**]:

    この AWS アカウントでのみ特定の AWS ネームスペースに対してメトリクスの収集を有効または無効にするためのオブジェクト (`{"namespace1":true/false, "namespace2":true/false}` 形式)。ネームスペースのリストは、`/v1/integration/aws/available_namespace_rules` エンドポイントから取得できます。

[1]: /ja/integrations/amazon_web_services/#configuration
[2]: /ja/integrations/amazon_web_services/#installation
[3]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Using_Tags.html