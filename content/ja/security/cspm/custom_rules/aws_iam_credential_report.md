---
dependencies: []
disable_edit: true
---
# aws_iam_credential_report
詳細は AWS のドキュメントをご参照ください [1]

[1]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_getting-report.html#id_credentials_understanding_the_report_format

## `access_key_1_active`
**タイプ**: `BOOLEAN`<br>
**説明**: ユーザーがアクセスキーを持ち、そのアクセスキーのステータスがアクティブであるとき、この値は TRUE になります。それ以外の場合は FALSE となります。<br>
## `access_key_1_last_rotated`
**タイプ**: `TIMESTAMP`<br>
**説明**: ユーザーのアクセスキーが作成された、または最後に変更された日時 (ISO 8601 日付-時間形式)。ユーザーがアクティブなアクセスキーを持っていない場合、このフィールドの値は N/A (該当なし) です。<br>
## `access_key_1_last_used_date`
**タイプ**: `TIMESTAMP`<br>
**説明**: ユーザーのアクセスキーが AWS API リクエストに署名するために直近で使用された日時 (ISO 8601 日付-時刻形式)。アクセスキーが 15 分間に複数回使用された場合、最初の使用のみがこのフィールドに記録されます。<br>
## `access_key_1_last_used_region`
**タイプ**: `STRING`<br>
**説明**: アクセスキーが最も最近使用された <a href="https://docs.aws.amazon.com/general/latest/gr/rande.html">AWS リージョン</a>。アクセスキーが 15 分間に複数回使用された場合、このフィールドには最初の使用のみが記録されます。<br>
## `access_key_1_last_used_service`
**タイプ**: `STRING`<br>
**説明**: アクセスキーで最も最近アクセスされた AWS サービス。このフィールドの値は、サービスのネームスペースを使用します (例: Amazon S3 は s3、Amazon EC2 は ec2)。アクセスキーが 15 分間に複数回使用された場合、このフィールドには最初の使用のみが記録されます。<br>
## `access_key_2_active`
**タイプ**: `BOOLEAN`<br>
**説明**: ユーザーが 2 つ目のアクセスキーを持ち、2 つ目のキーのステータスがアクティブであるとき、この値は TRUE になります。それ以外の場合は FALSE となります。<br>
## `access_key_2_last_rotated`
**タイプ**: `TIMESTAMP`<br>
**説明**: ユーザーの 2 つ目のアクセスキーが作成された、または最後に変更された日時 (ISO 8601 日付-時間形式)。ユーザーが 2 つ目のアクティブなアクセスキーを持っていない場合、このフィールドの値は N/A (該当なし) です。<br>
## `access_key_2_last_used_date`
**タイプ**: `TIMESTAMP`<br>
**説明**: ユーザーの 2 つ目のアクセスキーが AWS API リクエストに署名するために直近で使用された日時 (ISO 8601 日付-時刻形式)。アクセスキーが 15 分間に複数回使用された場合、最初の使用のみがこのフィールドに記録されます。<br>
## `access_key_2_last_used_region`
**タイプ**: `STRING`<br>
**説明**: ユーザーの 2 つ目のアクセスキーが最も最近使用された <a href="https://docs.aws.amazon.com/general/latest/gr/rande.html">AWS リージョン</a>。アクセスキーが 15 分間に複数回使用された場合、このフィールドには最初の使用のみが記録されます。<br>
## `access_key_2_last_used_service`
**タイプ**: `STRING`<br>
**説明**: ユーザーの 2 つ目のアクセスキーで最も最近アクセスされた AWS サービス。このフィールドの値は、サービスのネームスペースを使用します (例: Amazon S3 は s3、Amazon EC2 は ec2)。アクセスキーが 15 分間に複数回使用された場合、このフィールドには最初の使用のみが記録されます。<br>
## `account_id`
**タイプ**: `STRING`<br>
## `arn`
**タイプ**: `STRING`<br>
**説明**: ユーザーの Amazon Resource Name (ARN)。ARN の詳細については、<a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_identifiers.html#identifiers-arns">IAM ARN</a> を参照してください。<br>
## `cert_1_active`
**タイプ**: `BOOLEAN`<br>
**説明**: ユーザーが X.509 署名証明書を持っていて、その証明書のステータスがアクティブであるとき、この値は TRUE になります。それ以外の場合は FALSE となります。<br>
## `cert_1_last_rotated`
**タイプ**: `TIMESTAMP`<br>
**説明**: ユーザーの署名証明書が作成された、または最後に変更された日時 (ISO 8601 日付-時間形式)。ユーザーがアクティブな署名証明書を持っていない場合、このフィールドの値は N/A (該当なし) です。<br>
## `cert_2_active`
**タイプ**: `BOOLEAN`<br>
**説明**: ユーザーが 2 つ目の X.509 署名証明書を持っていて、その証明書のステータスがアクティブであるとき、この値は TRUE になります。それ以外の場合は FALSE となります。<br>
## `cert_2_last_rotated`
**タイプ**: `TIMESTAMP`<br>
**説明**: ユーザーの 2 つ目の署名証明書が作成された、または最後に変更された日時 (ISO 8601 日付-時間形式)。ユーザーが 2 つ目のアクティブな署名証明書を持っていない場合、このフィールドの値は N/A (該当なし) です。<br>
## `mfa_active`
**タイプ**: `BOOLEAN`<br>
**説明**: ユーザーに対して<a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa.html">多要素認証</a> (MFA) デバイスが有効な場合、この値は TRUE となります。それ以外の場合は FALSE となります。<br>
## `password_enabled`
**タイプ**: `BOOLEAN`<br>
**説明**: ユーザーがパスワードを持っている場合、この値は TRUE になります。AWS アカウントのルートユーザーの場合は、常に not_supported となります。<br>
## `password_last_changed`
**タイプ**: `TIMESTAMP`<br>
**説明**: ユーザーのパスワードが最後に設定された日時 (<a href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601 日付-時間形式</a>)。ユーザーがパスワードを持っていない場合、このフィールドの値は N/A (該当なし) となります。AWS アカウント (ルート) の値は常に not_supported となります。<br>
## `password_last_used`
**タイプ**: `TIMESTAMP`<br>
**説明**: AWS アカウントのルートユーザーまたは IAM ユーザーのパスワードが最後に AWS Web サイトにサインインするために使用された日時 (<a href="https://www.iso.org/iso-8601-date-and-time-format.html">ISO 8601 日付-時間形式</a>)。ユーザーの最終サインイン時間をキャプチャする AWS Web サイトは、AWS Management Console、AWS Discussion Forums、および AWS Marketplace です。パスワードが 5 分間に複数回使用された場合、このフィールドには最初の使用のみが記録されます。<br>
## `password_next_rotation`
**タイプ**: `TIMESTAMP`<br>
**説明**: アカウントにパスワードローテーションを要求する<a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_passwords_account-policy.html">パスワードポリシー</a>がある場合、このフィールドには、ユーザーが新しいパスワードを設定することが要求される日時が格納されます (<a href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601 日付-時間形式</a>)。AWS アカウント (ルート) の値は常に not_supported となります。<br>
## `user`
**タイプ**: `STRING`<br>
**説明**: The friendly name of the user.<br>
## `user_creation_time`
**タイプ**: `TIMESTAMP`<br>
**説明**: ユーザーが作成された日時 (<a href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601 日付-時間形式</a>)。<br>