---
dependencies: []
disable_edit: true
---
# aws_iam_role

## `account_id`
**タイプ**: `STRING`<br>
## `arn`
**タイプ**: `STRING`<br>
**プロバイダー名**: `Arn`<br>
**説明**: ロールを指定する Amazon Resource Name (ARN)。ARN の詳細とポリシーでの使用方法については、<i>IAM ユーザーガイド</i>の <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/Using_Identifiers.html">IAM 識別子</a>を参照してください。<br>
## `assume_role_policy_document`
**タイプ**: `STRING`<br>
**プロバイダー名**: `AssumeRolePolicyDocument`<br>
**説明**: エンティティにロールを引き受ける権限を付与するポリシー。<br>
## `create_date`
**タイプ**: `TIMESTAMP`<br>
**プロバイダー名**: `CreateDate`<br>
**説明**: ロールが作成された日時 (<a href="http://www.iso.org/iso/iso8601">ISO 8601 日付-時間形式</a>)。<br>
## `description`
**タイプ**: `STRING`<br>
**プロバイダー名**: `Description`<br>
**説明**: ユーザーによるロールの説明。<br>
## `max_session_duration`
**タイプ**: `INT32`<br>
**プロバイダー名**: `MaxSessionDuration`<br>
**説明**: 指定されたロールの最大セッション継続時間 (秒単位)。CLI または API を使用してロールを引き受けるユーザーは、オプションの <code>DurationSeconds</code> API パラメーターか <code>duration-seconds</code> CLI パラメーターを使って継続時間を指定することができます。<br>
## `path`
**タイプ**: `STRING`<br>
**プロバイダー名**: `Path`<br>
**説明**: ロールのパス。パスの詳細については、<i>IAM ユーザーガイド</i>の <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/Using_Identifiers.html">IAM 識別子</a>を参照してください。<br>
## `permissions_boundary`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `PermissionsBoundary`<br>
**説明**: ロールの権限境界を設定するために使用されるポリシーの ARN。権限境界の詳細については、<i>IAM ユーザーガイド</i>の <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html">IAM アイデンティティの権限境界</a>を参照してください。<br>
   - `permissions_boundary_arn`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `PermissionsBoundaryArn`<br>
    **説明**: ユーザーまたはロールの権限境界の設定に使用されるポリシーの ARN。<br>
   - `permissions_boundary_type`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `PermissionsBoundaryType`<br>
    **説明**: 権限境界の使用タイプ。エンティティの権限境界としてどのタイプの IAM リソースが使用されるかを示します。このデータ型で使用できる値は <code>Policy</code> のみです。<br>
## `role_id`
**タイプ**: `STRING`<br>
**Provider name**: `RoleId`<br>
**説明**: ロールを識別する安定した一意の文字列。ID の詳細については、<i>IAM ユーザーガイド</i>の <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/Using_Identifiers.html">IAM 識別子</a>を参照してください。<br>
## `role_last_used`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `RoleLastUsed`<br>
**説明**: IAM ロールが最後に使用された時の情報が格納されます。これには、ロールが最後に使用された日時とリージョンが含まれます。アクティビティは、直近の 400 日間についてのみ報告されます。ユーザーのリージョンで過去 1 年以内にこれらの機能がサポートされるようになった場合、この期間は短くなることがあります。400 日前よりもさらに前にロールが使用された可能性はあります。詳しくは、<i>IAM ユーザーガイド</i>の<a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_access-advisor.html#access-advisor_tracking-period">データが追跡されるリージョン</a>を参照してください。<br>
   - `last_used_date`<br>
    **タイプ**: `TIMESTAMP`<br>
    **プロバイダー名**: `LastUsedDate`<br>
    **説明**: ロールが最後に使用された日時 (<a href="http://www.iso.org/iso/iso8601">ISO 8601 日付-時間形式</a>)。IAM 追跡期間内にロールが使用されなかった場合、このフィールドは null になります。追跡期間の詳細については、<i>IAM ユーザーガイド</i>の<a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_access-advisor.html#access-advisor_tracking-period">データが追跡されるリージョン</a>を参照してください。<br>
   - `region`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `Region`<br>
    **説明**: ロールが最後に使用された Amazon Web Services リージョンの名前。<br>
## `role_name`
**タイプ**: `STRING`<br>
**Provider name**: `RoleName`<br>
**説明**: ロールを識別するわかりやすい名前。<br>
## `tags`
**タイプ**: `UNORDERED_LIST_STRING`<br>