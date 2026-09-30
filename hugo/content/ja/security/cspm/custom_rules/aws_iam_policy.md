---
dependencies: []
disable_edit: true
---
# aws_iam_policy

## `account_id`
**タイプ**: `STRING`<br>
## `arn`
**タイプ**: `STRING`<br>
**プロバイダー名**: `Arn`<br>
## `attachment_count`
**タイプ**: `INT32`<br>
**プロバイダー名**: `AttachmentCount`<br>
**説明**: ポリシーがアタッチされているエンティティ (ユーザー、グループ、ロール) の数。<br>
## `create_date`
**タイプ**: `TIMESTAMP`<br>
**プロバイダー名**: `CreateDate`<br>
**説明**: ポリシーが作成された日時 (<a href="http://www.iso.org/iso/iso8601">ISO 8601 日付-時間形式</a>)。<br>
## `default_version_id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `DefaultVersionId`<br>
**説明**: デフォルトバージョンとして設定されるポリシーのバージョンの識別子。<br>
## `description`
**タイプ**: `STRING`<br>
**プロバイダー名**: `Description`<br>
**説明**: ポリシーのフレンドリーな説明。この要素は GetPolicy オペレーションに対する応答に含まれます。ListPolicies オペレーションに対する応答には含まれません。<br>
## `is_attachable`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `IsAttachable`<br>
**説明**: ポリシーを IAM ユーザー、グループ、またはロールにアタッチできるかどうかを指定します。<br>
## `path`
**タイプ**: `STRING`<br>
**プロバイダー名**: `Path`<br>
**説明**: ポリシーのパス。パスの詳細については、<i>IAM ユーザーガイド</i>の <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/Using_Identifiers.html">IAM 識別子</a>を参照してください。<br>
## `permissions_boundary_usage_count`
**タイプ**: `INT32`<br>
**プロバイダー名**: `PermissionsBoundaryUsageCount`<br>
**説明**: 権限境界を設定するためにポリシーが使用されるエンティティ (ユーザーおよびロール) の数。 権限境界の詳細については、<i>IAM ユーザーガイド</i>の <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html">IAM アイデンティティの権限境界</a>を参照してください。<br>
## `policy_id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `PolicyId`<br>
**説明**: ポリシーを識別する安定した一意の文字列。ID の詳細については、<i>IAM ユーザーガイド</i>の <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/Using_Identifiers.html">IAM 識別子</a>を参照してください。<br>
## `policy_name`
**タイプ**: `STRING`<br>
**プロバイダー名**: `PolicyName`<br>
**説明**: ポリシーを識別するフレンドリーな名前 (ARN ではない)。<br>
## `policy_role`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `PolicyRole`<br>
   - `role_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `RoleId`<br>
    **説明**: ロールを識別する安定した一意の文字列。ID の詳細については、<i>IAM ユーザーガイド</i>の <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_identifiers.html">IAM 識別子</a>を参照してください。<br>
   - `role_name`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `RoleName`<br>
    **説明**: ロールを識別する名前 (ARN ではなくフレンドリーな名前)。<br>
## `policy_version`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `PolicyVersion`<br>
   - `create_date`<br>
    **タイプ**: `TIMESTAMP`<br>
    **プロバイダー名**: `CreateDate`<br>
    **説明**: ポリシーのバージョンが作成された日時 (ISO 8601 日付-時間形式)。<br>
   - `document`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `Document`<br>
    **説明**: ポリシードキュメント。ポリシードキュメントは、GetPolicyVersion および GetAccountAuthorizationDetails オペレーションに対するレスポンスで返されます。CreatePolicyVersion または ListPolicyVersions オペレーションに対するレスポンスでは返されません。この構造体で返されるポリシードキュメントは、<a href="https://tools.ietf.org/html/rfc3986">RFC 3986</a> に準拠した URL エンコードです。URL デコードメソッドを使用すると、ポリシーをプレーンな JSON テキストに戻すことができます。たとえば、Java を使用している場合、Java SDK の <code>java.net.URLDecoder</code> ユーティリティー クラスの<code>デコード</code>メソッドを使用できます。他の言語や SDK でも、同様の機能が提供されています。<br>
   - `is_default_version`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `IsDefaultVersion`<br>
    **説明**: ポリシーのバージョンをポリシーのデフォルトバージョンとして設定するかどうかを指定します。<br>
   - `version_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `VersionId`<br>
    **説明**: ポリシーのバージョンを表す識別子。ポリシーのバージョン識別子は常に <code>v</code> で始まります (常に小文字)。ポリシーが作成されたとき、最初のポリシーのバージョンは <code>v1</code> です。<br>
## `tags`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `update_date`
**タイプ**: `TIMESTAMP`<br>
**プロバイダー名**: `UpdateDate`<br>
**説明**: ポリシーが最後に更新された日時 (<a href="http://www.iso.org/iso/iso8601">ISO 8601 日付-時間形式</a>)。ポリシーが 1 つのバージョンしかない場合、このフィールドには、ポリシーが作成された日時が含まれます。ポリシーが複数のバージョンを持つ場合、このフィールドには、最新のポリシー バージョンが作成された日時が含まれます。<br>