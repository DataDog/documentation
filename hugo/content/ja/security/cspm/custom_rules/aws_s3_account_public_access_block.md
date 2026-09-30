---
dependencies: []
disable_edit: true
---
# aws_s3_account_public_access_block

## `account_id`
**タイプ**: `STRING`<br>
## `block_public_acls`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `BlockPublicAcls`<br>
**説明**: Amazon S3 がこのアカウントのバケットのパブリックアクセスコントロールリスト (ACL) をブロックするかどうかを指定します。この要素を <code>TRUE</code> に設定すると、次のような動作になります: <ul> <li> PUT Bucket acl および PUT Object acl の呼び出しは、指定された ACL がパブリックの場合、失敗します。 </li> <li> PUT Object の呼び出しは、リクエストにパブリック ACL が含まれている場合、失敗します。 </li> <li> PUT Bucket の呼び出しは、リクエストにパブリック ACL が含まれている場合、失敗します。 </li> </ul> <p>この設定を有効にしても、既存のポリシーや ACL には影響しません。これは、Amazon S3 on Outposts ではサポートされていません。</p>
## `block_public_policy`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `BlockPublicPolicy`<br>
**説明**: Amazon S3 がこのアカウントのバケットに対してパブリックバケットポリシーをブロックすべきかどうかを指定します。この要素を <code>TRUE</code> に設定すると、指定されたバケットポリシーがパブリックアクセスを許可している場合、Amazon S3 は PUT Bucket ポリシーへの呼び出しを拒否します。 この設定を有効にすると、既存のバケットポリシーには影響しません。これは、Amazon S3 on Outposts ではサポートされていません。<br>
## `ignore_public_acls`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `IgnorePublicAcls`<br>
**説明**: Amazon S3 が、このアカウントのバケットのパブリック ACL を無視するかどうかを指定します。この要素を <code>TRUE</code> に設定すると、Amazon S3 は、このアカウントのバケットとそれらが含むすべてのオブジェクトのすべてのパブリック ACL を無視するようになります。 この設定を有効にすると、既存の ACL の永続性に影響を与えず、新しいパブリック ACL の設定を防ぐこともできません。これは、Amazon S3 on Outposts ではサポートされていません。<br>
## `restrict_public_buckets`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `RestrictPublicBuckets`<br>
**説明**: Amazon S3 が、このアカウントのバケットに対してパブリックバケットポリシーを制限すべきかどうかを指定します。この要素を <code>TRUE</code> に設定すると、パブリックポリシーを持つバケットへのアクセスが、このアカウント内の Amazon Web Service プリンシパルおよび認可されたユーザーのみに制限されます。この設定を有効にすると、特定のアカウントへの非公開の委任を含む、任意のパブリックバケットポリシー内のパブリックおよびクロスアカウントアクセスがブロックされることを除いて、以前に保存したバケットポリシーに影響を与えません。これは、Amazon S3 on Outposts ではサポートされていません。<br>
## `tags`
**タイプ**: `UNORDERED_LIST_STRING`<br>