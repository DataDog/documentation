---
dependencies: []
disable_edit: true
---
# gcp_iam_policy

## `ancestors`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `audit_configs`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**プロバイダー名**: `auditConfigs`<br>
**説明**: このポリシーのクラウド監査ログの構成を指定します。<br>
   - `audit_log_configs`<br>
    **タイプ**: `UNORDERED_LIST_STRUCT`<br>
    **プロバイダー名**: `auditLogConfigs`<br>
    **説明**: 各種権限のロギングを行うための構成。<br>
       - `exempted_members`<br>
        **タイプ**: `UNORDERED_LIST_STRING`<br>
        **プロバイダー名**: `exemptedMembers`<br>
        **説明**: このタイプの権限でロギングを発生させない ID を指定します。Binding.members と同じフォーマットになります。<br>
       - `log_type`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `logType`<br>
        **説明**: この構成が有効にするログタイプ。 <br>
        **可能な値**:<br>
          - `LOG_TYPE_UNSPECIFIED` - デフォルトのケース。決してこれであってはなりません。<br>
          - `ADMIN_READ` - 管理者が読み取ります。例: CloudIAM getIamPolicy<br>
          - `DATA_WRITE` - データが書き込まれます。例: CloudSQL ユーザーが作成<br>
          - `DATA_READ` - データを読み取ります。例: CloudSQL ユーザーリスト<br>
   - `service`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `service`<br>
    **説明**: 監査ログを有効にするサービスを指定します。例えば、`storage.googleapis.com` や `cloudsql.googleapis.com` などです。`allServices` は、すべてのサービスをカバーする特別な値です。<br>
## `bindings`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**プロバイダー名**: `bindings`<br>
**説明**: `members` のリスト、またはプリンシパルを `role` と関連付けます。オプションで、`bindings` をいつ、どのように適用するかを決める `condition` を指定することができます。それぞれの `bindings` には少なくとも 1 つのプリンシパルが含まれていなければなりません。`Policy` の `bindings` は最大で 1,500 のプリンシパルを参照することができます。これらのプリンシパルは、最大 250 個まで Google グループにすることができます。プリンシパルが出現するたびに、この制限にカウントされます。例えば、`bindings` が 50 の異なるロールを `user:alice@example.com` に与え、他のプリンシパルには与えない場合、`Policy` の `bindings` にさらに 1,450 のプリンシパルを追加することが可能です。<br>
   - `condition`<br>
    **タイプ**: `STRUCT`<br>
    **Provider name**: `condition`<br>
    **説明**: このバインディングに関連づけられた条件。もし条件が `true` と評価された場合、このバインディングは現在のリクエストに適用されます。もし条件が `false` と評価された場合、このバインディングは現在のリクエストに適用されません。しかし、別のロールバインディングがこのバインディングの 1 つ以上のプリンシパルに同じロールを与えるかもしれません。IAM ポリシーでどのリソースが条件をサポートしているかを知るには、[IAM ドキュメント](https://cloud.google.com/iam/help/conditions/resource-policies)を参照してください。<br>
       - `description`<br>
        **タイプ**: `STRING`<br>
        **Provider name**: `description`<br>
        **説明**: オプション。式の説明。UI でカーソルを合わせた時などに、式を説明する長いテキストです。<br>
       - `expression`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `expression`<br>
        **説明**: Common Expression Language の構文で表現された式のテキスト表現。<br>
       - `location`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `location`<br>
        **説明**: オプション。エラー報告用の式の場所を示す文字列 (例: ファイル名、ファイル内の位置)。<br>
       - `title`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `title`<br>
        **説明**: オプション。式のタイトル、つまりその目的を説明する短い文字列。これは、例えば、式を入力する UI で使用することができます。<br>
   - `members`<br>
    **タイプ**: `UNORDERED_LIST_STRING`<br>
    **プロバイダー名**: `members`<br>
    **説明**: Google Cloud リソースへのアクセスをリクエストするプリンシパルを指定します。`members` には以下の値を指定することができます。 <ul> <li>`allUsers`: Google アカウントの有無にかかわらず、インターネットを利用するすべての人を表す特別な識別子。</li> <li>`allAuthenticatedUsers`: Google アカウントまたはサービスアカウントで認証された人を表す特別な識別子。ID フェデレーションによって外部の ID プロバイダー (IdP) から取得した ID は含まれません。</li> <li> `user:{emailid}`: 特定の Google アカウントを表すメールアドレス。例: `alice@example.com`</li> <li>`serviceAccount:{emailid}`: Google サービスのアカウントを表すメールアドレス。例: `my-other-app@appspot.gserviceaccount.com`</li> <li>`serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: [Kubernetes サービスアカウント](https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts)を表す識別子。例: `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`</li> <li>`group:{emailid}`: Google グループを表すメールアドレス。例: `admins@example.com`</li> <li>`deleted:user:{emailid}?uid={uniqueid}`: 最近削除されたユーザーを表すメールアドレス (と一意な識別子)。例: `alice@example.com?uid=123456789012345678901` ユーザーが復旧した場合、この値は `user:{emailid}` に戻り、復旧したユーザーはバインディングのロールを保持します。</li> <li>`deleted:serviceAccount:{emailid}?uid={uniqueid}`: 最近削除されたサービスアカウントを表すメールアドレス (と一意な識別子)。例: `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901` サービスアカウントが削除された場合、この値は `serviceAccount:{emailid}` に戻り、削除されなかったサービスアカウントはバインディングのロールを保持します。</li> <li>`deleted:group:{emailid}?uid={uniqueid}`: 最近削除された Google グループを表すメールアドレス (と一意な識別子)。例: `admins@example.com?uid=123456789012345678901` グループが復旧した場合、この値は `group:{emailid}` に戻り、復旧したグループはバインディングのロールを保持します。</li> <li>`domain:{domain}`: そのドメインのすべてのユーザーを表す G Suite ドメイン (プライマリ)。例: `google.com` や `example.com`</li></ul>
   - `role`<br>
    **タイプ**: `STRING`<br>
    **Provider name**: `role`<br>
    **説明**: `members` のリスト、またはプリンシパルに割り当てられるロール。例えば、`roles/viewer`、`roles/editor`、または `roles/owner` などです。<br>
## `gcp_resource_type`
**タイプ**: `STRING`<br>
**説明**: この iam ポリシーが関連付けられているリソースタイプ。<br>
## `labels`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `member_to_roles`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**プロバイダー名**: `na`<br>
**説明**: 各メンバーと、そのメンバーが属するすべてのメンバーシップとの間のマップ。bindings フィールドから派生したものです。<br>
   - `roles`<br>
    **タイプ**: `UNORDERED_LIST_STRING`<br>
   - `member`<br>
    **タイプ**: `STRING`<br>
## `organization_id`
**タイプ**: `STRING`<br>
## `parent`
**タイプ**: `STRING`<br>
## `project_id`
**タイプ**: `STRING`<br>
## `project_number`
**タイプ**: `STRING`<br>
## `resource_name`
**タイプ**: `STRING`<br>
## `tags`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `version`
**タイプ**: `INT32`<br>
**プロバイダー名**: `version`<br>
**説明**: ポリシーの形式を指定します。有効な値は `0`、`1`、および `3` です。無効な値を指定したリクエストは拒否されます。条件付きロールバインディングに影響を与える操作は、バージョン `3` を指定しなければなりません。この要件は、以下の操作に適用されます。* 条件付きロールバインディングを含むポリシーの取得 * 条件付きロールバインディングのポリシーへの追加 * ポリシーの条件付きロールバインディングの変更 * 条件の有無にかかわらない、条件を含むポリシーからの任意のロールバインディングの削除 **重要:** IAM 条件を使用する場合、`setIamPolicy` を呼ぶたびに `etag` フィールドを含める必要があります。このフィールドを省略すると、IAM はバージョン `3` のポリシーをバージョン `1` のポリシーで上書きすることを許可し、バージョン `3` のポリシーにあるすべての条件が失われます。ポリシーに条件が含まれていない場合、そのポリシーに対する操作は、任意の有効なバージョンを指定するか、フィールドを未設定のままにすることができます。どのリソースが IAM ポリシーで条件をサポートしているかについては、[IAM ドキュメント](https://cloud.google.com/iam/help/conditions/resource-policies) を参照してください。<br>