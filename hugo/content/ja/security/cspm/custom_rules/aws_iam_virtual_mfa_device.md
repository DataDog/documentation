---
dependencies: []
disable_edit: true
---
# aws_iam_virtual_mfa_device

## `account_id`
**タイプ**: `STRING`<br>
## `enable_date`
**タイプ**: `TIMESTAMP`<br>
**プロバイダー名**: `EnableDate`<br>
**説明**: 仮想 MFA デバイスが有効化された日時。<br>
## `serial_number`
**タイプ**: `STRING`<br>
**プロバイダー名**: `SerialNumber`<br>
**説明**: <code>VirtualMFADevice</code> に関連付けられたシリアル番号。<br>
## `tags`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `user`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `User`<br>
**説明**: この仮想 MFA デバイスに関連付けられた IAM ユーザー。<br>
   - `arn`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `Arn`<br>
    **説明**: ユーザーを識別する Amazon Resource Name (ARN)。ARN の詳細とポリシーでの使用方法については、<i>IAM ユーザーガイド</i>の <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/Using_Identifiers.html">IAM 識別子</a>を参照してください。<br>
   - `create_date`<br>
    **タイプ**: `TIMESTAMP`<br>
    **プロバイダー名**: `CreateDate`<br>
    **説明**: ユーザーが作成された日時 (<a href="http://www.iso.org/iso/iso8601">ISO 8601 日付-時間形式</a>)。<br>
   - `password_last_used`<br>
    **タイプ**: `TIMESTAMP`<br>
    **プロバイダー名**: `PasswordLastUsed`<br>
    **説明**: ユーザーのパスワードが Amazon Web Services Web サイトへのサインインに使用された最後の日時 (<a href="http://www.iso.org/iso/iso8601">ISO 8601 日付-時間形式</a>)。ユーザーの最終サインイン時間をキャプチャする Amazon Web Services Web サイトのリストについては、<i>IAM ユーザーガイド</i>の<a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/credential-reports.html">資格情報レポート</a>のトピックを参照してください。パスワードが 5 分間のうちに複数回使用された場合は、1 回目の使用に関する情報のみがこのフィールドで返されます。このフィールドが null (値がない) の場合は、ユーザーが一度もパスワードを使ってサインインしていないことを示します。その理由としては、次のことが考えられます。 <ul> <li> ユーザーのパスワードが設定されたことがない。 </li> <li> パスワードは存在するが、2014 年 10 月 20 日に IAM がこの情報のトラッキングを開始してから使用されていない。 </li> </ul> null 値は、ユーザーのパスワードが<i>一度も</i>設定されたことがないことを意味しません。また、現在はユーザーのパスワードは設定されていないが、過去には設定されていたという場合、このフィールドには、直近のパスワードが使用された日時が格納されます。この値は、GetUser と ListUsers のオペレーションでのみ返されます。<br>
   - `path`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `Path`<br>
    **説明**: ユーザーへのパス。パスの詳細については、<i>IAM ユーザーガイドの </i><a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/Using_Identifiers.html">IAM 識別子</a>を参照してください。ユーザーの権限境界の設定に使用されるポリシーの ARN。<br>
   - `permissions_boundary`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `PermissionsBoundary`<br>
    **説明**: 権限境界の詳細については、<i>IAM ユーザーガイド</i>の IAM アイデンティティの権限境界<a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html">を参照してください。<br>
       - `permissions_boundary_arn`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `PermissionsBoundaryArn`<br>
        **説明**: ユーザーまたはロールの権限境界の設定に使用されるポリシーの ARN。<br>
       - `permissions_boundary_type`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `PermissionsBoundaryType`<br>
        **説明**: 権限境界の使用タイプ。エンティティの権限境界としてどのタイプの IAM リソースが使用されるかを示します。このデータ型で使用できる値は <code>Policy</code> のみです。<br>
   - `user_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `UserId`<br>
    **説明**: ユーザーを識別する安定した一意の文字列。ID の詳細については、<i>IAM ユーザーガイド</i>の <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/Using_Identifiers.html">IAM 識別子</a>を参照してください。<br>
   - `user_name`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `UserName`<br>
    **説明**: ユーザーを識別するわかりやすい名前。<br>