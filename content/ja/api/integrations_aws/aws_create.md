---
title: AWS インテグレーションの作成
type: apicontent
order: 15.02
external_redirect: '/api/#create-an-aws-integration'
---
## AWS インテグレーションの作成

Datadog-Amazon Web Services インテグレーションを作成します。

**注**: `POST` メソッドを使用すると、Datadog Organization の既存の構成に新しい構成を**追加**して、インテグレーション構成が更新されます。

##### 引数

* **`account_id`** [必須]:

    AWS アカウント ID (ダッシュを含まない)。
    AWS アカウント ID の詳細については、[Datadog AWS インテグレーション][1]を参照してください。

* **`access_key_id`** [オプション、デフォルト = **None**]:

    AWS アカウントが GovCloud または China アカウントの場合に、対応するアクセスキー ID を入力します。

* **`role_name`** [必須]:

    Datadog ロールの委任名。
    AWS アカウントのロール名の詳細については、[Datadog AWS インテグレーション構成情報を参照してください][2]。

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