---
dependencies: []
disable_edit: true
---
# aws_s3_bucket

## `account_id`
**タイプ**: `STRING`<br>
## `bucket_arn`
**タイプ**: `STRING`<br>
## `bucket_versioning`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `GetBucketVersioningOutput`<br>
   - `mfa_delete`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `MFADelete`<br>
    **説明**: バケットのバージョン管理構成で、MFA 削除が有効かどうかを指定します。この要素は、バケットが MFA 削除で構成されている場合にのみ返されます。バケットが一度もそのように構成されていない場合、このエレメントは返されません。<br>
   - `status`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `Status`<br>
    **説明**: バケットのバージョン管理状態。<br>
## `bucket_website`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `GetBucketWebsiteOutput`<br>
   - `error_document`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `ErrorDocument`<br>
    **説明**: 4XX クラスのエラーに使用する Web サイトエラー文書のオブジェクトキー名。<br>
       - `key`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `Key`<br>
        **説明**: 4XX クラスのエラーが発生したときに使用するオブジェクトキー名。 <important> XML リクエストを使用する場合、特殊文字 (キャリッジリターンなど) を含むオブジェクトキーに対して置換を行う必要があります。詳しくは、<a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-keys.html#object-key-xml-related-constraints">XML 関連のオブジェクトキー制約</a>を参照してください。 </important><br>
   - `index_document`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `IndexDocument`<br>
    **説明**: Web サイトのインデックスドキュメントの名前 (例: <code>index.html</code>)。<br>
       - `suffix`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `Suffix`<br>
        **説明**: Web サイトのエンドポイントにあるディレクトリへのリクエストに付加されるサフィックス (例えば、サフィックスが index.html で samplebucket/images/ にリクエストをした場合、返されるデータは images/index.html というキーネームのオブジェクトになります)。サフィックスは空であってはならず、またスラッシュ文字を含んではいけません。 <important> XML リクエストを使用する場合、特殊文字 (キャリッジリターンなど) を含むオブジェクトキーに対して置換を行う必要があります。詳しくは、<a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-keys.html#object-key-xml-related-constraints">XML 関連のオブジェクトキー制約</a>を参照してください。 </important><br>
   - `redirect_all_requests_to`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `RedirectAllRequestsTo`<br>
    **説明**: Amazon S3 バケットの Web サイトエンドポイントへの全リクエストのリダイレクト動作を指定します。<br>
       - `host_name`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `HostName`<br>
        **説明**: リクエストがリダイレクトされるホストの名前。<br>
       - `protocol`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `Protocol`<br>
        **説明**: リクエストをリダイレクトするときに使用するプロトコル。デフォルトは元のリクエストで使用されたプロトコルです。<br>
   - `routing_rules`<br>
    **タイプ**: `UNORDERED_LIST_STRUCT`<br>
    **プロバイダー名**: `RoutingRules`<br>
    **説明**: リダイレクトが適用されるタイミングやリダイレクトの動作を定義するルール。<br>
       - `condition`<br>
        **タイプ**: `STRUCT`<br>
        **プロバイダー名**: `Condition`<br>
        **説明**: 指定されたリダイレクトが適用されるために満たすべき条件を記述するためのコンテナ。例えば、1. リクエストが <code>/docs</code> フォルダ内のページである場合、<code>/documents</code> フォルダにリダイレクトします。2. リクエストの結果が HTTP エラー 4xx の場合、エラー処理が可能な別のホストにリダイレクトします。<br>
           - `http_error_code_returned_equals`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `HttpErrorCodeReturnedEquals`<br>
            **説明**: リダイレクトが適用される際の HTTP エラーコード。エラー発生時、エラーコードがこの値と等しい場合、指定されたリダイレクトが適用されます。親要素の <code>Condition</code> を指定し、兄弟要素の <code>KeyPrefixEquals</code> を指定しない場合は必須です。両方が指定されている場合は、両方が true であることがリダイレクトの適用条件となります。<br>
           - `key_prefix_equals`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `KeyPrefixEquals`<br>
            **説明**: リダイレクトが適用されるときのオブジェクトキー名のプレフィックス。たとえば、<code>ExamplePage.html</code> に対するリクエストをリダイレクトするには、 キーのプレフィックスは <code>ExamplePage.html</code> になります。<code>docs/</code> というプレフィックスを持つすべてのページのリクエストをリダイレクトする場合は、 プレフィックスは <code>/docs</code> となり、<code>docs/</code> フォルダに含まれるすべてのオブジェクトを特定することになります。親要素 <code>Condition</code> を指定し、兄弟要素 <code>HttpErrorCodeReturnedEquals</code> を指定しない場合は必須です。両方の条件が指定されている場合、リダイレクトを適用するには両方が true である必要があります。 <important> XML リクエストを使用する場合、特殊文字 (キャリッジリターンなど) を含むオブジェクトキーに対して置換を行う必要があります。詳しくは、<a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-keys.html#object-key-xml-related-constraints">XML 関連のオブジェクトキー制約</a>を参照してください。 </important><br>
       - `redirect`<br>
        **タイプ**: `STRUCT`<br>
        **プロバイダー名**: `Redirect`<br>
        **説明**: リダイレクト情報のコンテナ。リクエストを別のホスト、別のページ、別のプロトコルにリダイレクトすることができます。エラーが発生した場合に、別のエラーコードを返すように指定することができます。<br>
           - `host_name`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `HostName`<br>
            **説明**: リダイレクトリクエストで使用するホスト名。<br>
           - `http_redirect_code`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `HttpRedirectCode`<br>
            **説明**: レスポンスに使用する HTTP リダイレクトコード。兄弟のいずれかが存在する場合は不要です。<br>
           - `protocol`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `Protocol`<br>
            **説明**: リクエストをリダイレクトするときに使用するプロトコル。デフォルトは元のリクエストで使用されたプロトコルです。<br>
           - `replace_key_prefix_with`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `ReplaceKeyPrefixWith`<br>
            **説明**: リダイレクトリクエストで使用するオブジェクトキーのプレフィックス。たとえば、プレフィックスが <code>docs/</code> (<code>docs/</code> フォルダにあるオブジェクト) のすべてのページのリクエストを <code>documents/</code> にリダイレクトするには、<code>KeyPrefixEquals</code> を <code>docs/</code> に設定し、Redirect で <code>ReplaceKeyPrefixWith</code> を <code>/documents</code> に設定して条件ブロックを作成します。兄弟のどちらかが存在する場合は不要です。<code>ReplaceKeyWith</code> が指定されていない場合のみ存在できます。 <important> XML リクエストを使用する場合、特殊文字 (キャリッジリターンなど) を含むオブジェクトキーに対して置換を行う必要があります。詳しくは、<a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-keys.html#object-key-xml-related-constraints">XML 関連のオブジェクトキー制約</a>を参照してください。 </important><br>
           - `replace_key_with`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `ReplaceKeyWith`<br>
            **説明**: リダイレクトリクエストで使用する特定のオブジェクトキー。例えば、<code>error.html</code> へのリダイレクトリクエスト。兄弟のいずれかが存在する場合は必要ありません。<code>ReplaceKeyPrefixWith</code> が提供されていない場合のみ存在できます。 <important> XML リクエストを使用する場合、特殊文字 (キャリッジリターンなど) を含むオブジェクトキーに対して置換を行う必要があります。詳しくは、<a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-keys.html#object-key-xml-related-constraints">XML 関連のオブジェクトキー制約</a>を参照してください。 </important><br>
## `creation_date`
**タイプ**: `TIMESTAMP`<br>
**プロバイダー名**: `CreationDate`<br>
**説明**: バケットが作成された日付。この日付は、バケットポリシーの編集など、バケットに変更を加える際に変更される可能性があります。<br>
## `grants`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**プロバイダー名**: `Grants`<br>
**説明**: 付与のリスト。<br>
   - `grantee`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `Grantee`<br>
    **説明**: 権限を付与される人。<br>
       - `display_name`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `DisplayName`<br>
        **説明**: 付与先のスクリーンネーム。<br>
       - `email_address`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `EmailAddress`<br>
        **説明**:付与先のメールアドレス。 <note> 付与先を指定するためのメールアドレスの使用は、以下の Amazon Web Services リージョンでのみサポートされています。  <ul> <li> アメリカ東部 (北バージニア) </li> <li> アメリカ西部 (北カリフォルニア) </li> <li>  アメリカ西部 (オレゴン州) </li> <li>  アジア太平洋 (シンガポール) </li> <li> アジア太平洋 (シドニー) </li> <li> アジア太平洋 (東京) </li> <li> ヨーロッパ (アイルランド) </li> <li> 南アメリカ (サンパウロ) </li> </ul> Amazon S3 がサポートするすべてのリージョンとエンドポイントのリストについては、Amazon Web Services 一般リファレンスの<a href="https://docs.aws.amazon.com/general/latest/gr/rande.html#s3_region">リージョンとエンドポイント</a>を参照してください。 </note><br>
       - `id`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `ID`<br>
        **説明**: 付与先の正規のユーザー ID。<br>
       - `type`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `Type`<br>
        **説明**: 付与先の種類<br>
       - `uri`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `URI`<br>
        **説明**: 付与先グループの URI。<br>
   - `permission`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `Permission`<br>
    **説明**: 付与先に与えれた権限を指定します。<br>
## `logging_enabled`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `LoggingEnabled`<br>
   - `target_bucket`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `TargetBucket`<br>
    **説明**: Amazon S3 にサーバーのアクセスログを保存するバケットを指定します。ログが記録されているバケットと同じバケットを含む、所有する任意のバケットにログを配信させることができます。また、複数のバケットを構成して、同じターゲットバケットにログを配信することができます。この場合、配信されたログファイルをキーで区別できるように、配信元バケットごとに異なる <code>TargetPrefix</code> を選択する必要があります。<br>
   - `target_grants`<br>
    **タイプ**: `UNORDERED_LIST_STRUCT`<br>
    **プロバイダー名**: `TargetGrants`<br>
    **説明**: 付与情報のコンテナ。Object Ownership のバケットオーナー強制設定を使用するバケットは、対象付与をサポートしません。詳細については、<i>Amazon S3 ユーザーガイド</i>の<a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/enable-server-access-logging.html#grant-log-delivery-permissions-general">サーバーアクセスログの配信に関する権限</a>を参照してください。<br>
       - `grantee`<br>
        **タイプ**: `STRUCT`<br>
        **プロバイダー名**: `Grantee`<br>
        **説明**: 権限を付与される人のコンテナ。<br>
           - `display_name`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `DisplayName`<br>
            **説明**: 付与先のスクリーンネーム。<br>
           - `email_address`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `EmailAddress`<br>
            **説明**:付与先のメールアドレス。 <note> 付与先を指定するためのメールアドレスの使用は、以下の Amazon Web Services リージョンでのみサポートされています。  <ul> <li> アメリカ東部 (北バージニア) </li> <li> アメリカ西部 (北カリフォルニア) </li> <li>  アメリカ西部 (オレゴン州) </li> <li>  アジア太平洋 (シンガポール) </li> <li> アジア太平洋 (シドニー) </li> <li> アジア太平洋 (東京) </li> <li> ヨーロッパ (アイルランド) </li> <li> 南アメリカ (サンパウロ) </li> </ul> Amazon S3 がサポートするすべてのリージョンとエンドポイントのリストについては、Amazon Web Services 一般リファレンスの<a href="https://docs.aws.amazon.com/general/latest/gr/rande.html#s3_region">リージョンとエンドポイント</a>を参照してください。 </note><br>
           - `id`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `ID`<br>
            **説明**: 付与先の正規のユーザー ID。<br>
           - `type`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `Type`<br>
            **説明**: 付与先の種類<br>
           - `uri`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `URI`<br>
            **説明**: 付与先グループの URI。<br>
       - `permission`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `Permission`<br>
        **説明**: バケットに対して付与先に割り当てられたログ取得権限。<br>
   - `target_prefix`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `TargetPrefix`<br>
    **説明**: すべてのログオブジェクトキーのプレフィックス。複数の Amazon S3 バケットからのログファイルを 1 つのバケットに格納する場合、どのログファイルがどのバケットから来たかを区別するためにプレフィックスを使用することができます。<br>
## `name`
**タイプ**: `STRING`<br>
**プロバイダー名**: `Name`<br>
**説明**: バケットの名前。<br>
## `owner`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `Owner`<br>
**説明**: バケット所有者の表示名と ID を格納するコンテナ。<br>
   - `display_name`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `DisplayName`<br>
    **説明**: 所有者の表示名を格納するコンテナ。<br>
   - `id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `ID`<br>
    **説明**: 所有者の ID を格納するコンテナ。<br>
## `policy_status`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `PolicyStatus`<br>
   - `is_public`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `IsPublic`<br>
    **説明**: このバケットのポリシーのステータス。<code>TRUE</code> は、このバケットが公開されていることを表します。<code>FALSE</code> は、このバケットが公開されていないことを表します。<br>
## `public_access_block_configuration`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `PublicAccessBlockConfiguration`<br>
   - `block_public_acls`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `BlockPublicAcls`<br>
    **説明**: Amazon S3 がこのバケットとこのバケットのオブジェクトのパブリックアクセスコントロールリスト (ACL) をブロックするかどうかを指定します。この要素を <code>TRUE</code> に設定すると、次のような動作になります: <ul> <li> PUT Bucket ACL および PUT Object ACL の呼び出しは、指定された ACL がパブリックの場合、失敗します。 </li> <li> PUT Object の呼び出しは、リクエストにパブリック ACL が含まれている場合、失敗します。 </li> <li> PUT Bucket の呼び出しは、リクエストにパブリック ACL が含まれている場合、失敗します。 </li> </ul> この設定を有効にしても、既存のポリシーや ACL には影響しません。<br>
   - `block_public_policy`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `BlockPublicPolicy`<br>
    **説明**: Amazon S3 がこのバケットに対してパブリックバケットポリシーをブロックすべきかどうかを指定します。この要素を <code>TRUE</code> に設定すると、指定されたバケットポリシーがパブリックアクセスを許可している場合、Amazon S3 は PUT Bucket ポリシーへの呼び出しを拒否します。 この設定を有効にすると、既存のバケットポリシーには影響しません。<br>
   - `ignore_public_acls`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `IgnorePublicAcls`<br>
    **説明**: Amazon S3 が、このバケットとこのバケットのオブジェクトのパブリック ACL を無視するかどうかを指定します。この要素を <code>TRUE</code> に設定すると、Amazon S3 は、このバケットとこのバケットのオブジェクトのすべてのパブリック ACL を無視するようになります。 この設定を有効にすると、既存の ACL の永続性に影響を与えず、新しいパブリック ACL の設定を防ぐこともできません。<br>
   - `restrict_public_buckets`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `RestrictPublicBuckets`<br>
    **説明**: Amazon S3 が、このバケットに対してパブリックバケットポリシーを制限すべきかどうかを指定します。この要素を <code>TRUE</code> に設定すると、バケットにパブリックポリシーがある場合、このバケットへのアクセスが、このアカウント内の Amazon Web Service プリンシパルおよび認可されたユーザーのみに制限されます。この設定を有効にすると、特定のアカウントへの非公開の委任を含む、任意のパブリックバケットポリシー内のパブリックおよびクロスアカウントアクセスがブロックされることを除いて、以前に保存したバケットポリシーに影響を与えません。<br>
## `server_side_encryption_configuration`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `ServerSideEncryptionConfiguration`<br>
   - `rules`<br>
    **タイプ**: `UNORDERED_LIST_STRUCT`<br>
    **プロバイダー名**: `Rules`<br>
    **説明**: 特定のサーバー側の暗号化構成ルールに関する情報を格納するコンテナ。<br>
       - `apply_server_side_encryption_by_default`<br>
        **タイプ**: `STRUCT`<br>
        **プロバイダー名**: `ApplyServerSideEncryptionByDefault`<br>
        **説明**: バケット内の新しいオブジェクトに適用される、デフォルトのサーバー側の暗号化を指定します。PUT Object リクエストでサーバー側の暗号化を指定しなかった場合、このデフォルトの暗号化が適用されます。<br>
           - `kms_master_key_id`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `KMSMasterKeyID`<br>
            **説明**: Amazon Web Services Key Management Service (KMS) の顧客のデフォルトの暗号化に使用する Amazon Web Services KMS キー ID。このパラメーターは、<code>SSEAlgorithm</code> が <code>aws:kms</code> に設定されている場合のみ許可されます。キー ID または KMS キーの Amazon Resource Name (ARN) を指定することができます。ただし、クロスアカウントまたは Amazon Web Services サービスの操作で暗号化を使用する場合、完全修飾された KMS キー ARN を使用する必要があります。詳細については、<a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/bucket-encryption.html#bucket-encryption-update-bucket-policy">クロスアカウントの操作で暗号化を使用する</a>を参照してください。   <b>例:</b>  <ul> <li> Key ID: <code>1234abcd-12ab-34cd-56ef-1234567890ab</code>  </li> <li> Key ARN: <code>arn:aws:kms:us-east-2:111122223333:key/1234abcd-12ab-34cd-56ef-1234567890ab</code>  </li> </ul> <important> Amazon S3 は対称 KMS キーのみをサポートし、非対称 KMS キーはサポートしません。詳細については、<i>Amazon Web Services Key Management Service デベロッパーガイド</i>の<a href="https://docs.aws.amazon.com/kms/latest/developerguide/symmetric-asymmetric.html">対称キーと非対称キーの使用</a>を参照してください。 </important><br>
           - `sse_algorithm`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `SSEAlgorithm`<br>
            **説明**: デフォルトの暗号化に使用するサーバー側の暗号化アルゴリズム。<br>
       - `bucket_key_enabled`<br>
        **タイプ**: `BOOLEAN`<br>
        **プロバイダー名**: `BucketKeyEnabled`<br>
        **説明**: Amazon S3 が、バケット内の新しいオブジェクトに対して、KMS (SSE-KMS) を使用したサーバー側の暗号化でS3バケットキーを使用するかどうかを指定します。既存のオブジェクトは影響を受けません。<code>BucketKeyEnabled</code> 要素を <code>true</code> に設定すると、Amazon S3 は S3 バケットキーを使用するようになります。デフォルトでは、S3 バケットキーは有効ではありません。詳細については、<i>Amazon S3 ユーザーガイド</i>の <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/bucket-key.html">Amazon S3 バケットキー</a>を参照してください。<br>
## `tags`
**タイプ**: `UNORDERED_LIST_STRING`<br>