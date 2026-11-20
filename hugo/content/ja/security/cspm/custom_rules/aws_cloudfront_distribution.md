---
dependencies: []
disable_edit: true
---
# aws_cloudfront_distribution

## `account_id`
**タイプ**: `STRING`<br>
## `active_trusted_key_groups`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `ActiveTrustedKeyGroups`<br>
**説明**: このディストリビューションで、キーグループを使用してプライベートコンテンツを提供するキャッシュ動作を構成している場合、CloudFront は自動的にこのフィールドをレスポンスに追加します。このフィールドには、署名付き URL や署名付きクッキーの署名を検証するために CloudFront が使用できるキーグループと各キーグループ内の公開キーのリストが含まれています。<br>
   - `enabled`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `Enabled`<br>
    **説明**: このフィールドは、CloudFront が署名付き URL と署名付きクッキーの署名を検証するために使用できる公開キーをキーグループのいずれかが持っている場合、<code>true</code> になります。そうでない場合、このフィールドは <code>false</code> になります。<br>
   - `items`<br>
    **タイプ**: `UNORDERED_LIST_STRUCT`<br>
    **プロバイダー名**: `Items`<br>
    **説明**: CloudFront が署名付き URL や署名付きクッキーの署名を検証するために使用できる、各キーグループ内の公開キーの識別子を含むキーグループのリスト。<br>
       - `key_group_id`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `KeyGroupId`<br>
        **説明**: 公開キーを含むキーグループの識別子。<br>
       - `key_pair_ids`<br>
        **タイプ**: `STRUCT`<br>
        **プロバイダー名**: `KeyPairIds`<br>
           - `items`<br>
            **タイプ**: `UNORDERED_LIST_STRING`<br>
            **プロバイダー名**: `Items`<br>
            **説明**: CloudFront キーペアの識別子のリスト。<br>
           - `quantity`<br>
            **タイプ**: `INT32`<br>
            **プロバイダー名**: `Quantity`<br>
            **説明**: リストに含まれるキーペア識別子の数。<br>
   - `quantity`<br>
    **タイプ**: `INT32`<br>
    **プロバイダー名**: `Quantity`<br>
    **説明**: リストに含まれるキーグループの数。<br>
## `active_trusted_signers`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `ActiveTrustedSigners`<br>
**説明**: <important> <code>TrustedSigners</code> の代わりに <code>TrustedKeyGroups</code> を使用することをお勧めします。 </important> このディストリビューションで、信頼できる署名者を使用してプライベートコンテンツを提供するキャッシュ動作を構成している場合、CloudFront は自動的にこのフィールドをレスポンスに追加します。このフィールドには、署名付き URL や署名付きクッキーの署名を検証するために CloudFront が使用できる、Amazon Web Services アカウント ID のリストと、各アカウントのアクティブな CloudFront キーペアが含まれています。<br>
   - `enabled`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `Enabled`<br>
    **説明**: このフィールドは、リスト内の Amazon Web Services アカウントのいずれかが、CloudFront が署名付き URL と署名付きクッキーの署名を検証するために使用できるアクティブな CloudFront キーペアを持っている場合、<code>true</code> になります。そうでない場合、このフィールドは <code>false</code> になります。<br>
   - `items`<br>
    **タイプ**: `UNORDERED_LIST_STRUCT`<br>
    **プロバイダー名**: `Items`<br>
    **説明**: Amazon Web Services のアカウントと、CloudFront が署名付き URL と署名付きクッキーの署名を検証するために使用できる、各アカウントのアクティブな CloudFront キーペアの識別子のリスト。<br>
       - `aws_account_number`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `AwsAccountNumber`<br>
        **説明**: CloudFront が署名付き URL や署名付きクッキーの署名を検証するために使用できる、アクティブな CloudFront キーペアを含む Amazon Web Services のアカウント番号。キーペアを所有する Amazon Web Services アカウントが、CloudFront ディストリビューションを所有するアカウントと同じ場合、このフィールドの値は <code>self</code> になります。<br>
       - `key_pair_ids`<br>
        **タイプ**: `STRUCT`<br>
        **プロバイダー名**: `KeyPairIds`<br>
        **説明**: CloudFront キーペアの識別子のリスト。<br>
           - `items`<br>
            **タイプ**: `UNORDERED_LIST_STRING`<br>
            **プロバイダー名**: `Items`<br>
            **説明**: CloudFront キーペアの識別子のリスト。<br>
           - `quantity`<br>
            **タイプ**: `INT32`<br>
            **プロバイダー名**: `Quantity`<br>
            **説明**: リストに含まれるキーペア識別子の数。<br>
   - `quantity`<br>
    **タイプ**: `INT32`<br>
    **プロバイダー名**: `Quantity`<br>
    **説明**: リストに含まれる Amazon Web Services のアカウントの数。<br>
## `alias_icp_recordals`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**プロバイダー名**: `AliasICPRecordals`<br>
**説明**: Amazon Web Services の中国向けサービスのお客様が、CloudFront に追加した CNAME として知られる代替ドメイン名でコンテンツを公開する場合、インターネットコンテンツプロバイダー (ICP) レコーダルを申請する必要があります。AliasICPRecordal は、ディストリビューションに関連する CNAME の ICP レコーダルステータスを提供します。ICP レコーダルの詳細については、<i>中国の Amazon Web Services サービスの概要</i>の<a href="https://docs.amazonaws.cn/en_us/aws/latest/userguide/accounts-and-credentials.html">サインアップ、アカウント、および資格情報</a>を参照してください。<br>
   - `cname`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `CNAME`<br>
    **説明**: ディストリビューションに関連付けられたドメイン名。<br>
   - `icp_recordal_status`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `ICPRecordalStatus`<br>
    **説明**: CNAME のインターネットコンテンツプロバイダー (ICP) のレコーダルステータス。ICPRecordalStatus は、中国以外の地域の全ての CNAME (エイリアス) に対して APPROVED に設定されています。 返されるステータスの値は以下の通りです。 <ul> <li>  <b>APPROVED</b> は、関連付けられた CNAME が有効な ICP レコーダル番号を持っていることを示します。複数の CNAME を 1 つのディストリビューションに関連付けることができ、CNAME は異なる ICP レコーダルに対応することができます。APPROVED とマークされるには、つまり、中国リージョンでの使用が有効であるためには、CNAME はそれに関連する ICP レコーダル番号を 1 つ持っていなければなりません。 </li> <li>  <b>SUSPENDED</b> は、関連する CNAME が有効な ICP レコーダル番号を持っていないことを示します。 </li> <li>  <b>PENDING</b> は、CloudFront がディストリビューションに関連付けられた CNAME の ICP レコーダルのステータスを決定できないことを示します。ステータスを決定しようとする際にエラーが発生したためです。この場合、CloudFront は APPROVED または SUSPENDED ステータスを返すので、エラーが解決するかどうか再試行することができます。 </li> </ul>
## `arn`
**タイプ**: `STRING`<br>
**プロバイダー名**: `ARN`<br>
**説明**: ディストリビューションの ARN (Amazon Resource Name)。例: <code>arn:aws:cloudfront::123456789012:distribution/EDFDVBD632BHDS5</code>、ここで <code>123456789012</code> は、Amazon Web Services のアカウント ID です。<br>
## `distribution_config`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `DistributionConfig`<br>
**説明**: ディストリビューションの現在の構成情報。<code>/<i>CloudFront API version</i>/distribution ID/config</code> リソースに <code>GET</code> リクエストを送信します。<br>
   - `aliases`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `Aliases`<br>
    **説明**: このディストリビューションに CNAME (代替ドメイン名) がある場合、その情報を含む複合型。<br>
       - `items`<br>
        **タイプ**: `UNORDERED_LIST_STRING`<br>
        **プロバイダー名**: `Items`<br>
        **説明**: このディストリビューションに関連づけたい CNAME エイリアスがあれば、それを含む複合型。<br>
       - `quantity`<br>
        **タイプ**: `INT32`<br>
        **プロバイダー名**: `Quantity`<br>
        **説明**: このディストリビューションに関連づけたい CNAME エイリアスがあれば、その数。<br>
   - `cache_behaviors`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `CacheBehaviors`<br>
    **説明**: 0 個以上の <code>CacheBehavior</code> 要素を含む複合型。<br>
       - `items`<br>
        **タイプ**: `UNORDERED_LIST_STRUCT`<br>
        **プロバイダー名**: `Items`<br>
        **説明**: オプション: このディストリビューションのキャッシュ動作を含む複合型。<code>Quantity</code> が <code>0</code> であれば、<code>Items</code> を省略できます。<br>
           - `allowed_methods`<br>
            **タイプ**: `STRUCT`<br>
            **プロバイダー名**: `AllowedMethods`<br>
               - `cached_methods`<br>
                **タイプ**: `STRUCT`<br>
                **プロバイダー名**: `CachedMethods`<br>
                   - `items`<br>
                    **タイプ**: `UNORDERED_LIST_STRING`<br>
                    **プロバイダー名**: `Items`<br>
                    **説明**: CloudFront にレスポンスをキャッシュさせたい HTTP メソッドを含む複合型。<br>
                   - `quantity`<br>
                    **タイプ**: `INT32`<br>
                    **プロバイダー名**: `Quantity`<br>
                    **説明**: CloudFront にレスポンスをキャッシュさせたい HTTP メソッドの数。有効な値は <code>2</code> (<code>GET</code> と <code>HEAD</code> リクエストに対するレスポンスをキャッシュする場合) と <code>3</code> (<code>GET</code>、<code>HEAD</code>、<code>OPTIONS</code> リクエストに対するレスポンスをキャッシュする場合) です。<br>
               - `items`<br>
                **タイプ**: `UNORDERED_LIST_STRING`<br>
                **プロバイダー名**: `Items`<br>
                **説明**: CloudFront に処理させ、オリジンに転送させたい HTTP メソッドを含む複合型。<br>
               - `quantity`<br>
                **タイプ**: `INT32`<br>
                **プロバイダー名**: `Quantity`<br>
                **説明**: CloudFront にオリジンに転送させたい HTTP メソッドの数。有効な値は、2 (<code>GET</code> と <code>HEAD</code> リクエストの場合)、3 (<code>GET</code>、<code>HEAD</code>、<code>OPTIONS</code> リクエストの場合)、7 (<code>GET、HEAD、OPTIONS、PUT、PATCH、POST</code>、<code>DELETE</code> リクエストの場合) です。<br>
           - `cache_policy_id`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `CachePolicyId`<br>
            **説明**: このキャッシュ動作にアタッチされているキャッシュポリシーの一意の識別子。詳細については、<i>Amazon CloudFront デベロッパーガイド</i>の<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-the-cache-key.html#cache-key-create-cache-policy">キャッシュポリシーの作成</a>または<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-managed-cache-policies.html">マネージドキャッシュポリシーの使用</a>を参照してください。<code>CacheBehavior</code> には、<code>CachePolicyId</code> または <code>ForwardedValues</code> のいずれかを含める必要があります。<code>CachePolicyId</code> を使用することをお勧めします。<br>
           - `compress`<br>
            **タイプ**: `BOOLEAN`<br>
            **プロバイダー名**: `Compress`<br>
            **説明**: このキャッシュ動作のために、CloudFront に特定のファイルを自動的に圧縮させたいかどうか。必要な場合は true を、必要でない場合は false を指定します。詳細は、<i>Amazon CloudFront デベロッパーガイド</i>の<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/ServingCompressedFiles.html">圧縮されたファイルを提供する</a>を参照してください。<br>
           - `default_ttl`<br>
            **タイプ**: `INT64`<br>
            **プロバイダー名**: `DefaultTTL`<br>
            **説明**: このフィールドは非推奨です。このフィールドの代わりに、キャッシュポリシーの <code>DefaultTTL</code> フィールドを使用することをお勧めします。詳細については、<i>Amazon CloudFront デベロッパーガイド</i>の<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-the-cache-key.html#cache-key-create-cache-policy">キャッシュポリシーの作成</a>または<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-managed-cache-policies.html">マネージドキャッシュポリシーの使用</a>を参照してください。オブジェクトが更新されたかどうかを判断するために、CloudFront がオリジンに別のリクエストを転送する前に、CloudFront キャッシュにオブジェクトを留めておきたいデフォルトの時間です。指定した値は、オリジンがオブジェクトに <code>Cache-Control max-age</code>、<code>Cache-Control s-maxage</code>、<code>Expires</code> などの HTTP ヘッダーを追加しない場合にのみ適用されます。詳細については、<i>Amazon CloudFront デベロッパーガイド</i>の<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Expiration.html">コンテンツがエッジキャッシュに留まる期間 (有効期限) の管理</a>を参照してください。<br>
           - `field_level_encryption_id`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `FieldLevelEncryptionId`<br>
            **説明**: このキャッシュ動作のデータの特定のフィールドを暗号化するために CloudFront に使用させたいフィールドレベルの暗号化構成の <code>ID</code> の値。<br>
           - `forwarded_values`<br>
            **タイプ**: `STRUCT`<br>
            **プロバイダー名**: `ForwardedValues`<br>
            **説明**: このフィールドは非推奨です。このフィールドの代わりに、キャッシュポリシーまたはオリジンリクエストポリシーを使用することをお勧めします。詳細については、<i>Amazon CloudFront デベロッパーガイド</i>の<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/working-with-policies.html">ポリシーを使用する</a>を参照してください。キャッシュキーに値を含める場合は、キャッシュポリシーを使用します。詳しくは、<i>Amazon CloudFront デベロッパーガイド</i>の<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-the-cache-key.html#cache-key-create-cache-policy">キャッシュポリシーの作成</a>または<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-managed-cache-policies.html">マネージドキャッシュポリシーの使用</a>を参照してください。値をオリジンに送信し、キャッシュキーには含めない場合は、オリジンリクエストポリシーを使用します。詳細については、<i>Amazon CloudFront デベロッパーガイド</i>の<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-origin-requests.html#origin-request-create-origin-request-policy">オリジンリクエストポリシーを作成する</a>または<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-managed-origin-request-policies.html">マネージドオリジンリクエストポリシーを使用する</a>を参照してください。<code>CacheBehavior</code> には、<code>CachePolicyId</code> または <code>ForwardedValues</code> のいずれかを含める必要があります。<code>CachePolicyId</code> を使用することをお勧めします。CloudFront がクエリ文字列、クッキー、HTTP ヘッダーをどのように処理するかを指定する複合型です。<br>
               - `cookies`<br>
                **タイプ**: `STRUCT`<br>
                **プロバイダー名**: `Cookies`<br>
                **説明**: このフィールドは非推奨です。このフィールドの代わりに、キャッシュポリシーまたはオリジンリクエストポリシーを使用することをお勧めします。キャッシュキーにクッキーを含めたい場合は、キャッシュポリシーを使用してください。詳しくは、<i>Amazon CloudFront デベロッパーガイド</i>の<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-the-cache-key.html#cache-key-create-cache-policy">キャッシュポリシーの作成</a>を参照してください。クッキーをオリジンに送信し、キャッシュキーには含めない場合は、オリジンリクエストポリシーを使用します。詳細については、<i>Amazon CloudFront デベロッパーガイド</i>の<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-origin-requests.html#origin-request-create-origin-request-policy">オリジンリクエストポリシーの作成</a>を参照してください。CloudFront がクッキーをオリジンに転送するかどうか、転送する場合はどのクッキーを転送するかを指定する複合型です。オリジンへのクッキー転送の詳細については、<i>Amazon CloudFront デベロッパーガイド</i>の <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Cookies.html">CloudFront がクッキーを転送、キャッシュ、ログする方法</a>を参照してください。<br>
                   - `forward`<br>
                    **タイプ**: `STRING`<br>
                    **プロバイダー名**: `Forward`<br>
                    **説明**: このフィールドは非推奨です。このフィールドの代わりに、キャッシュポリシーまたはオリジンリクエストポリシーを使用することをお勧めします。キャッシュキーにクッキーを含めたい場合は、キャッシュポリシーを使用してください。詳しくは、<i>Amazon CloudFront デベロッパーガイド</i>の<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-the-cache-key.html#cache-key-create-cache-policy">キャッシュポリシーの作成</a>を参照してください。クッキーをオリジンに送信し、キャッシュキーには含めない場合は、オリジンリクエストポリシーを使用します。詳細については、<i>Amazon CloudFront デベロッパーガイド</i>の<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-origin-requests.html#origin-request-create-origin-request-policy">オリジンリクエストポリシーの作成</a>を参照してください。このキャッシュ動作のためにオリジンに転送するクッキーを指定します。all、none、または <code>WhitelistedNames</code> 複合型で指定されたクッキーのリストです。Amazon S3 はクッキーを処理しません。キャッシュ動作がリクエストを Amazon S3 オリジンに転送する場合、<code>Forward</code> 要素に none を指定します。<br>
                   - `whitelisted_names`<br>
                    **タイプ**: `STRUCT`<br>
                    **プロバイダー名**: `WhitelistedNames`<br>
                    **説明**: このフィールドは非推奨です。このフィールドの代わりに、キャッシュポリシーまたはオリジンリクエストポリシーを使用することをお勧めします。キャッシュキーにクッキーを含めたい場合は、キャッシュポリシーを使用してください。詳しくは、<i>Amazon CloudFront デベロッパーガイド</i>の<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-the-cache-key.html#cache-key-create-cache-policy">キャッシュポリシーの作成</a>を参照してください。クッキーをオリジンに送信し、キャッシュキーには含めない場合は、オリジンリクエストポリシーを使用します。詳細については、<i>Amazon CloudFront デベロッパーガイド</i>の<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-origin-requests.html#origin-request-create-origin-request-policy">オリジンリクエストポリシーの作成</a>を参照してください。<code>Forward</code> の値に <code>whitelist</code> を指定した場合は必須です。このキャッシュ動作のために CloudFront に何種類のクッキーをオリジンに転送してほしいか、また、選択したクッキーを転送したい場合は、それらのクッキーの名前を指定する複合型です。<code>Forward</code> の値に <code>all</code> または <code>none</code> を指定した場合は、<code>WhitelistedNames</code> を省略します。<code>Forward</code> の値を <code>whitelist</code> から <code>all</code> または <code>none</code> に変更し、<code>WhitelistedNames</code> 要素およびその子要素を削除しない場合、CloudFront はそれらを自動的に削除します。各キャッシュ動作でホワイトリスト化できるクッキー名の現在の上限については、<i>Amazon Web Services 一般リファレンス</i>の <a href="https://docs.aws.amazon.com/general/latest/gr/xrefaws_service_limits.html#limits_cloudfront">CloudFront の上限</a>を参照してください。<br>
                       - `items`<br>
                        **タイプ**: `UNORDERED_LIST_STRING`<br>
                        **プロバイダー名**: `Items`<br>
                        **説明**: クッキー名のリスト。<br>
                       - `quantity`<br>
                        **タイプ**: `INT32`<br>
                        **プロバイダー名**: `Quantity`<br>
                        **説明**: <code>Items</code> リストのクッキー名の数。<br>
               - `headers`<br>
                **タイプ**: `STRUCT`<br>
                **プロバイダー名**: `Headers`<br>
                **説明**: このフィールドは非推奨です。このフィールドの代わりに、キャッシュポリシーまたはオリジンリクエストポリシーを使用することをお勧めします。キャッシュキーにヘッダーを含めたい場合は、キャッシュポリシーを使用してください。詳しくは、<i>Amazon CloudFront デベロッパーガイド</i>の<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-the-cache-key.html#cache-key-create-cache-policy">キャッシュポリシーの作成</a>を参照してください。ヘッダーをオリジンに送信し、キャッシュキーには含めない場合は、オリジンリクエストポリシーを使用します。詳細については、<i>Amazon CloudFront デベロッパーガイド</i>の<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-origin-requests.html#origin-request-create-origin-request-policy">オリジンリクエストポリシーの作成</a>を参照してください。このキャッシュ動作のために CloudFront にオリジンに転送させたい <code>Header</code> (もしあれば) を指定する複合型 (ホワイトリストされたヘッダー)。指定したヘッダーに対して、CloudFront はビューアリクエストのヘッダー値に基づいて、指定したオブジェクトの別バージョンをキャッシュすることもできます。詳細については、<i>Amazon CloudFront デベロッパーガイド</i>の<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/header-caching.html">リクエストヘッダーを基にしたコンテンツのキャッシュ</a>を参照してください。<br>
                   - `items`<br>
                    **タイプ**: `UNORDERED_LIST_STRING`<br>
                    **プロバイダー名**: `Items`<br>
                    **説明**: HTTP ヘッダー名のリスト。<br>
                   - `quantity`<br>
                    **タイプ**: `INT32`<br>
                    **プロバイダー名**: `Quantity`<br>
                    **説明**: <code>Items</code> リストのヘッダー名の数。<br>
               - `query_string`<br>
                **タイプ**: `BOOLEAN`<br>
                **プロバイダー名**: `QueryString`<br>
                **説明**: このフィールドは非推奨です。このフィールドの代わりに、キャッシュポリシーまたはオリジンリクエストポリシーを使用することをお勧めします。キャッシュキーにクエリ文字列を含めたい場合は、キャッシュポリシーを使用してください。詳細については、<i>Amazon CloudFront デベロッパーガイド</i>の<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-the-cache-key.html#cache-key-create-cache-policy">キャッシュポリシーの作成</a>を参照してください。オリジンにクエリ文字列を送信し、キャッシュキーには含めない場合は、オリジンリクエストポリシーを使用します。詳細は、<i>Amazon CloudFront デベロッパーガイド</i>の<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-origin-requests.html#origin-request-create-origin-request-policy">オリジンリクエストポリシーの作成</a>を参照してください。CloudFront がこのキャッシュ動作に関連するオリジンにクエリ文字列を転送し、クエリ文字列パラメーターに基づいてキャッシュを行うかどうかを示しています。CloudFront の動作は、<code>QueryString</code> の値と、<code>QueryStringCacheKeys</code> に指定した値がある場合はその値に依存します。<code>QueryString</code> に true を指定し、<code>QueryStringCacheKeys</code> に何も指定しない場合、CloudFront はすべてのクエリ文字列パラメーターをオリジンに転送し、すべてのクエリ文字列パラメーターに基づいてキャッシュを行います。クエリ文字列パラメーターと値の数によっては、CloudFront がより多くのリクエストをオリジンに転送する必要があるため、パフォーマンスに悪影響が出る可能性があります。<code>QueryString</code> に true を指定し、<code>QueryStringCacheKeys</code> に 1 つ以上の値を指定すると、CloudFront はすべてのクエリ文字列パラメーターをオリジンに転送しますが、指定したクエリ文字列パラメーターにのみ基づいてキャッシュを行います。<code>QueryString</code> に false を指定すると、CloudFront はオリジンにクエリ文字列パラメーターを転送せず、クエリ文字列パラメーターに基づいたキャッシュも行いません。詳しくは、<i>Amazon CloudFront デベロッパーガイド</i>の<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/QueryStringParameters.html">クエリ文字列パラメーターに基づいてキャッシュする CloudFront の構成</a>をご覧ください。<br>
               - `query_string_cache_keys`<br>
                **タイプ**: `STRUCT`<br>
                **プロバイダー名**: `QueryStringCacheKeys`<br>
                **説明**: このフィールドは非推奨です。このフィールドの代わりに、キャッシュポリシーまたはオリジンリクエストポリシーを使用することをお勧めします。キャッシュキーにクエリ文字列を含めたい場合は、キャッシュポリシーを使用してください。詳しくは、<i>Amazon CloudFront デベロッパーガイド</i>の<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-the-cache-key.html#cache-key-create-cache-policy">キャッシュポリシーの作成</a>を参照してください。クエリ文字列をオリジンに送信し、キャッシュキーには含めない場合は、オリジンリクエストポリシーを使用します。詳細については、<i>Amazon CloudFront デベロッパーガイド</i>の<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-origin-requests.html#origin-request-create-origin-request-policy">オリジンリクエストポリシーの作成</a>を参照してください。このキャッシュ動作のために CloudFront にキャッシュに使用させたいクエリ文字列パラメーターに関する情報を含む複合型です。<br>
                   - `items`<br>
                    **タイプ**: `UNORDERED_LIST_STRING`<br>
                    **プロバイダー名**: `Items`<br>
                    **説明**: CloudFront にキャッシュ動作の基準として使用させたいクエリ文字列パラメーターを含むリスト。<code>Quantity</code> が 0 の場合、<code>Items</code> を省略することができます。<br>
                   - `quantity`<br>
                    **タイプ**: `INT32`<br>
                    **プロバイダー名**: `Quantity`<br>
                    **説明**: キャッシュ動作のための <code>whitelisted</code> クエリ文字列パラメーターの数。<br>
           - `function_associations`<br>
            **タイプ**: `STRUCT`<br>
            **プロバイダー名**: `FunctionAssociations`<br>
            **説明**: このキャッシュ動作に関連付けられた CloudFront 関数のリスト。CloudFront 関数をキャッシュ動作に関連付けるには、<code>LIVE</code> ステージに公開する必要があります。<br>
               - `items`<br>
                **タイプ**: `UNORDERED_LIST_STRUCT`<br>
                **プロバイダー名**: `Items`<br>
                **説明**: CloudFront ディストリビューションのキャッシュ動作に関連付けられた CloudFront 関数。CloudFront 関数をキャッシュ動作に関連付けるには、<code>LIVE</code> ステージに公開する必要があります。<br>
                   - `event_type`<br>
                    **タイプ**: `STRING`<br>
                    **プロバイダー名**: `EventType`<br>
                    **説明**: 関数のイベントタイプ、<code>viewer-request</code> または <code>viewer-response</code> のどちらか。CloudFront 関数では、オリジン向けイベントタイプ (<code>origin-request</code> と <code>origin-response</code>) は使用できません。<br>
                   - `function_arn`<br>
                    **タイプ**: `STRING`<br>
                    **プロバイダー名**: `FunctionARN`<br>
                    **説明**: 関数の Amazon Resource Name (ARN)。<br>
               - `quantity`<br>
                **タイプ**: `INT32`<br>
                **プロバイダー名**: `Quantity`<br>
                **説明**: リストに含まれる CloudFront 関数の数。<br>
           - `lambda_function_associations`<br>
            **タイプ**: `STRUCT`<br>
            **プロバイダー名**: `LambdaFunctionAssociations`<br>
            **説明**: キャッシュ動作のための 0 個以上の Lambda@Edge 関数の関連付けを含む複合型。<br>
               - `items`<br>
                **タイプ**: `UNORDERED_LIST_STRUCT`<br>
                **プロバイダー名**: `Items`<br>
                **説明**: <b>オプション</b>: このキャッシュ動作のための <code>LambdaFunctionAssociation</code> アイテムを含む複合型。<code>Quantity</code> が <code>0</code> の場合、<code>Items</code> を省略することができます。<br>
                   - `event_type`<br>
                    **タイプ**: `STRING`<br>
                    **プロバイダー名**: `EventType`<br>
                    **説明**: Lambda@Edge 関数の呼び出しをトリガーとするイベントタイプを指定します。指定できる値は以下の通りです。 <ul> <li>  <code>viewer-request</code>: この関数は、CloudFront がビューアからのリクエストを受信したとき、リクエストされたオブジェクトがエッジキャッシュにあるかどうかを確認する前に実行されます。  </li> <li>  <code>origin-request</code>: この関数は、CloudFront がオリジンにリクエストを送信したときのみ実行されます。リクエストされたオブジェクトがエッジキャッシュにある場合、関数は実行されません。 </li> <li>  <code>origin-response</code>: この関数は、CloudFront がオリジンからレスポンスを受け取った後、そのレスポンスに含まれるオブジェクトをキャッシュする前に実行されます。リクエストされたオブジェクトがエッジキャッシュにある場合、関数は実行されません。 </li> <li>  <code>viewer-response</code>: この関数は、CloudFront がリクエストしたオブジェクトをビューアに返す前に実行されます。この関数は、オブジェクトがすでにエッジキャッシュにあるかどうかに関係なく実行されます。オリジンが HTTP 200 (OK) 以外の HTTP ステータスコードを返した場合、関数は実行されません。 </li> </ul>
                   - `include_body`<br>
                    **タイプ**: `BOOLEAN`<br>
                    **プロバイダー名**: `IncludeBody`<br>
                    **説明**: Lambda@Edge 関数が本文の内容に読み取りアクセスできるようにするためのフラグ。詳細は、Amazon CloudFront デベロッパーガイドの <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-include-body-access.html">Include Body Option を選択してリクエスト本文にアクセスする</a>を参照してください。<br>
                   - `lambda_function_arn`<br>
                    **タイプ**: `STRING`<br>
                    **プロバイダー名**: `LambdaFunctionARN`<br>
                    **説明**: Lambda@Edge 関数の ARN。関数のバージョンの ARN を指定する必要があります。エイリアスや $LATEST を指定することはできません。<br>
               - `quantity`<br>
                **タイプ**: `INT32`<br>
                **プロバイダー名**: `Quantity`<br>
                **説明**: このキャッシュ動作の Lambda@Edge 関数の関連付けの数。<br>
           - `max_ttl`<br>
            **タイプ**: `INT64`<br>
            **プロバイダー名**: `MaxTTL`<br>
            **説明**: このフィールドは非推奨です。このフィールドの代わりに、キャッシュポリシーの <code>MaxTTL</code> フィールドを使用することをお勧めします。詳細については、<i>Amazon CloudFront デベロッパーガイド</i>の<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-the-cache-key.html#cache-key-create-cache-policy">キャッシュポリシーの作成</a>または<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-managed-cache-policies.html">マネージドキャッシュポリシーの使用</a>を参照してください。オブジェクトが更新されたかどうかを判断するために、CloudFront がオリジンに別のリクエストを転送する前に、CloudFront キャッシュにオブジェクトを留めておきたい最大の時間です。指定した値は、オリジンがオブジェクトに <code>Cache-Control max-age</code>、<code>Cache-Control s-maxage</code>、<code>Expires</code> などの HTTP ヘッダーを追加する場合にのみ適用されます。詳細については、<i>Amazon CloudFront デベロッパーガイド</i>の<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Expiration.html">コンテンツがエッジキャッシュに留まる期間 (有効期限) の管理</a>を参照してください。<br>
           - `min_ttl`<br>
            **タイプ**: `INT64`<br>
            **プロバイダー名**: `MinTTL`<br>
            **説明**: このフィールドは非推奨です。このフィールドの代わりに、キャッシュポリシーの <code>MinTTL</code> フィールドを使用することをお勧めします。詳細については、<i>Amazon CloudFront デベロッパーガイド</i>の<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-the-cache-key.html#cache-key-create-cache-policy">キャッシュポリシーの作成</a>または<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-managed-cache-policies.html">マネージドキャッシュポリシーの使用</a>を参照してください。オブジェクトが更新されたかどうかを判断するために、CloudFront がオリジンに別のリクエストを転送する前に、CloudFront キャッシュにオブジェクトを留めておきたい最小の時間です。詳しくは、<i>Amazon CloudFront デベロッパーガイド</i>の<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Expiration.html">コンテンツがエッジキャッシュに留まる期間 (有効期限) の管理</a>を参照してください。CloudFront がすべてのヘッダーをオリジンに転送するように構成する場合、<code>MinTTL</code> に <code>0</code> を指定する必要があります (<code>Headers</code> で <code>Quantity</code> に <code>1</code>、<code>Name</code> に <code>*</code> を指定した場合)。<br>
           - `origin_request_policy_id`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `OriginRequestPolicyId`<br>
            **説明**: このキャッシュ動作にアタッチされているオリジンリクエストポリシーの一意な識別子。詳細については、<i>Amazon CloudFront デベロッパーガイド</i>の<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-origin-requests.html#origin-request-create-origin-request-policy">オリジンリクエストポリシーの作成</a>または<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-managed-origin-request-policies.html">マネージドオリジンリクエストポリシーの使用</a>を参照してください。<br>
           - `path_pattern`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `PathPattern`<br>
            **説明**: 動作を適用するリクエストを指定するパターン (例: <code>images/*.jpg</code>)。CloudFront がビューアリクエストを受け取ると、リクエストされたパスは、キャッシュ動作がディストリビューションに記載されている順番でパスパターンと比較されます。 <note> オプションで、パスパターンの先頭にスラッシュ (<code>/</code>) を含めることができます。例えば、<code>/images/*.jpg</code> のようになります。CloudFront の動作は、先頭の <code>/</code> があってもなくても同じです。 </note> デフォルトのキャッシュ動作のパスパターンは <code>*</code> で、変更することはできません。オブジェクトへのリクエストがどのキャッシュ動作のパスパターンにも一致しない場合、CloudFront はデフォルトのキャッシュ動作の中の動作を適用します。詳細については、<i>Amazon CloudFront デベロッパーガイド</i>の<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-web-values-specify.html#DownloadDistValuesPathPattern">パスパターン</a>を参照してください。<br>
           - `realtime_log_config_arn`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `RealtimeLogConfigArn`<br>
            **説明**: このキャッシュ動作にアタッチされているリアルタイムログ構成の Amazon Resource Name (ARN)。詳細については、<i>Amazon CloudFront デベロッパーガイド</i>の<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/real-time-logs.html">リアルタイムログ</a>を参照してください。<br>
           - `response_headers_policy_id`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `ResponseHeadersPolicyId`<br>
            **説明**: レスポンスヘッダーポリシーの識別子。<br>
           - `smooth_streaming`<br>
            **タイプ**: `BOOLEAN`<br>
            **プロバイダー名**: `SmoothStreaming`<br>
            **説明**: このキャッシュ動作に関連付けられたオリジンを使用して、Microsoft Smooth Streaming 形式のメディアファイルを配信するかどうかを示します。配信する場合は <code>true</code> を、配信しない場合は <code>false</code> を指定します。<code>SmoothStreaming</code> に <code>true</code> を指定した場合でも、コンテンツが <code>PathPattern</code> の値と一致する場合は、このキャッシュ動作を使用して他のコンテンツを配信することができます。<br>
           - `target_origin_id`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `TargetOriginId`<br>
            **説明**: このキャッシュ動作にマッチしたときに CloudFront にリクエストをルーティングさせたいオリジンの <code>ID</code> の値。<br>
           - `trusted_key_groups`<br>
            **タイプ**: `STRUCT`<br>
            **プロバイダー名**: `TrustedKeyGroups`<br>
            **説明**: CloudFront が署名付き URL または署名付きクッキーを検証するために使用できるキーグループのリスト。キャッシュ動作が信頼できるキーグループを含む場合、CloudFront はキャッシュ動作に一致するすべてのリクエストに対して署名付き URL または署名付きクッキーを要求します。URL やクッキーは、対応する公開キーがキーグループにあるプライベートキーで署名されている必要があります。署名付き URL またはクッキーには、CloudFront が署名の検証に使用すべき公開キーに関する情報が含まれています。詳しくは、<i>Amazon CloudFront デベロッパーガイド</i>の<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/PrivateContent.html">プライベートコンテンツの提供</a>を参照してください。<br>
               - `enabled`<br>
                **タイプ**: `BOOLEAN`<br>
                **プロバイダー名**: `Enabled`<br>
                **説明**: このフィールドは、CloudFront が署名付き URL と署名付きクッキーの署名を検証するために使用できる公開キーをリスト内のキーグループのいずれかが持っている場合、<code>true</code> になります。そうでない場合、このフィールドは <code>false</code> になります。<br>
               - `items`<br>
                **タイプ**: `UNORDERED_LIST_STRING`<br>
                **プロバイダー名**: `Items`<br>
                **説明**: キーグループの識別子のリスト。<br>
               - `quantity`<br>
                **タイプ**: `INT32`<br>
                **プロバイダー名**: `Quantity`<br>
                **説明**: リストに含まれるキーグループの数。<br>
           - `trusted_signers`<br>
            **タイプ**: `STRUCT`<br>
            **プロバイダー名**: `TrustedSigners`<br>
            **説明**: <important> <code>TrustedSigners</code> の代わりに <code>TrustedKeyGroups</code> を使用することをお勧めします。 </important> CloudFront が署名付き URL または署名付きクッキーを検証するために使用できる公開キーを持つ、Amazon Web Services のアカウント ID のリストです。キャッシュ動作が信頼できる署名者を含む場合、CloudFront はキャッシュ動作に一致するすべてのリクエストに対して署名付き URL または署名付きクッキーを要求します。URL やクッキーは、信頼できる署名者の Amazon Web Services アカウントにある CloudFront キーペアのプライ ベートキーで署名されている必要があります。署名付き URL またはクッキーには、CloudFront が署名の検証に使用すべき公開キーに関する情報が含まれています。詳しくは、<i>Amazon CloudFront デベロッパーガイド</i>の<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/PrivateContent.html">プライベートコンテンツの提供</a>を参照してください。<br>
               - `enabled`<br>
                **タイプ**: `BOOLEAN`<br>
                **プロバイダー名**: `Enabled`<br>
                **説明**: このフィールドは、CloudFront が署名付き URL と署名付きクッキーの署名を検証するために使用できる公開キーを Amazon Web Services アカウントのいずれかが持っている場合、<code>true</code> になります。そうでない場合、このフィールドは <code>false</code> になります。<br>
               - `items`<br>
                **タイプ**: `UNORDERED_LIST_STRING`<br>
                **プロバイダー名**: `Items`<br>
                **説明**: Amazon Web Services アカウントの識別子のリスト。<br>
               - `quantity`<br>
                **タイプ**: `INT32`<br>
                **プロバイダー名**: `Quantity`<br>
                **説明**: リストに含まれる Amazon Web Services のアカウントの数。<br>
           - `viewer_protocol_policy`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `ViewerProtocolPolicy`<br>
            **説明**: <code>PathPattern</code> で指定されたパスパターンに合致するリクエストがあった場合に、<code>TargetOriginId</code> で指定されたオリジンのファイルにアクセスするためにビューアが利用可能なプロトコル。以下のオプションを指定できます。 <ul> <li>  <code>allow-all</code>: ビューアは HTTP または HTTPS を使用することができます。 </li> <li>  <code>redirect-to-https</code>: ビューアが HTTP リクエストを送信すると、CloudFront は HTTP ステータスコード 301 (Moved Permanently) を HTTPS URL と一緒にビューアに返します。その後、ビューアは新しい URL を使用してリクエストを再送信します。  </li> <li>  <code>https-only</code>: ビューアが HTTP リクエストを送信した場合、CloudFront は HTTP ステータスコード 403 (Forbidden) を返します。  </li> </ul> HTTPS プロトコルの要求の詳細については、<i>Amazon CloudFront デベロッパーガイド</i>の<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-https-viewers-to-cloudfront.html">ビューアと CloudFront 間で HTTPS を要求する</a>を参照してください。 <note> HTTPS を使用してオリジンから取得されたオブジェクトをビューアが取得することを保証する唯一の方法 は、オブジェクトの取得に他のプロトコルを使用しないことです。最近、HTTP から HTTPS に変更した場合は、オブジェクトのキャッシュをクリアすることを推奨します。キャッシュされたオブジェクトは、プロトコルに依存しないためです。つまり、エッジロケーションは、現在のリクエストプロトコルが以前に使用したプロトコルと一致するかどうかに関係なく、キャッシュからオブジェクトを返します。詳細については、<i>Amazon CloudFront デベロッパーガイド</i>の<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Expiration.html">キャッシュの有効期限の管理</a>を参照してください。 </note><br>
       - `quantity`<br>
        **タイプ**: `INT32`<br>
        **プロバイダー名**: `Quantity`<br>
        **説明**: このディストリビューションにおけるキャッシュ動作の数。<br>
   - `caller_reference`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `CallerReference`<br>
    **説明**: リクエストが再生できないことを保証する一意の値 (例えば、日時スタンプ)。<code>CallerReference</code> の値が新しい場合 (<code>DistributionConfig</code> オブジェクトの内容に関係なく)、CloudFront は新しいディストリビューションを作成します。<code>CallerReference</code> の値が、以前にディストリビューションを作成するリクエストで既に送信した値である場合、CloudFront は <code>DistributionAlreadyExists</code> エラーを返します。<br>
   - `comment`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `Comment`<br>
    **説明**: ディストリビューションを説明するためのオプションのコメント。コメントは 128 文字を超えてはいけません。<br>
   - `custom_error_responses`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `CustomErrorResponses`<br>
    **説明**: 以下を制御する複合型。 <ul> <li> CloudFront がビューアにレスポンスを返す前に、4xx と 5xx の範囲の HTTP ステータスコードをカスタムエラーメッセージに置き換えるかどうか。 </li> <li> CloudFront が 4xx と 5xx の範囲の HTTP ステータスコードをキャッシュする期間。 </li> </ul> カスタムエラーページの詳細については、<i>Amazon CloudFront デベロッパーガイド</i>の<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/custom-error-pages.html">エラーレスポンスのカスタマイズ</a>を参照してください。<br>
       - `items`<br>
        **タイプ**: `UNORDERED_LIST_STRUCT`<br>
        **プロバイダー名**: `Items`<br>
        **説明**: カスタムエラーページやキャッシュ期間を指定したい HTTP ステータスコードごとに <code>CustomErrorResponse</code> 要素を含む複合型。<br>
           - `error_caching_min_ttl`<br>
            **タイプ**: `INT64`<br>
            **プロバイダー名**: `ErrorCachingMinTTL`<br>
            **説明**: <code>ErrorCode</code> で指定された HTTP ステータスコードを CloudFront にキャッシュさせる最小時間 (秒単位)。この時間が経過すると、CloudFront はオリジンにクエリを行い、エラーの原因となった問題が解決され、リクエストされたオブジェクトが利用可能になったかどうかを確認します。詳細については、<i>Amazon CloudFront デベロッパーガイド</i>の<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/custom-error-pages.html">エラーレスポンスのカスタマイズ</a>を参照してください。<br>
           - `error_code`<br>
            **タイプ**: `INT32`<br>
            **プロバイダー名**: `ErrorCode`<br>
            **説明**: カスタムエラーページやキャッシュ期間を指定したい HTTP ステータスコード。<br>
           - `response_code`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `ResponseCode`<br>
            **説明**: カスタムエラーページと一緒に CloudFront にビューアに返させたい HTTP ステータスコード。オリジンが CloudFront に返したステータスコードと異なるステータスコードを CloudFront に返させたい理由は様々です。例: <ul> <li> 一部のインターネット機器 (ファイアウォールや企業のプロキシなど) は、HTTP 4xx および 5xx を傍受し、ビューアにレスポンスを返さないようにします。<code>200</code> を代用すれば、通常、レスポンスは傍受されません。 </li> <li> クライアントエラーやサーバーエラーの区別を気にしないのであれば、すべての 4xx または 5xx エラーの <code>ResponseCode</code> として <code>400</code> または <code>500</code> を指定することができます。 </li> <li> 顧客に Web サイトがダウンしていることを悟られないように、<code>200</code> のステータスコード (OK) と静的な Web サイトを返したい場合があります。 </li> </ul> <code>ResponseCode</code> に値を指定する場合、<code>ResponsePagePath</code> にも値を指定する必要があります。<br>
           - `response_page_path`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `ResponsePagePath`<br>
            **説明**: オリジンが <code>ErrorCode</code> で指定された HTTP ステータスコードを返したときに、CloudFront がビューアに返すカスタムエラーページへのパス。たとえば、<code>/4xx-errors/403-forbidden.html</code> です。オブジェクトとカスタムエラーページを異なる場所に保存したい場合、ディストリビューションに以下のようなキャッシュ動作が含まれている必要があります。 <ul> <li> <code>PathPattern</code> の値は、カスタムエラーメッセージのパスと一致します。たとえば、4xx エラー用のカスタムエラーページを Amazon S3 バケットの <code>/4xx-errors</code> というディレクトリに保存したとします。ディストリビューションには、パスパターンがカスタムエラーページへのリクエストをその場所にルーティングするキャッシュ動作、たとえば <code>/4xx-errors/*</code> が含まれている必要があります。  </li> <li> <code>TargetOriginId</code> の値は、カスタムエラーページが含まれるオリジンの <code>ID</code> 要素の値を指定します。 </li> </ul> <code>ResponsePagePath</code> に値を指定する場合、<code>ResponseCode</code> にも値を指定する必要があります。カスタムエラーページは、Amazon S3 バケットに保存することをお勧めします。カスタムエラーページを HTTP サーバーに保存し、サーバーが 5xx エラーを返すようになると、オリジンサーバーが利用できないため、CloudFront はビューアに返したいファイルを取得することができなくなります。<br>
       - `quantity`<br>
        **タイプ**: `INT32`<br>
        **プロバイダー名**: `Quantity`<br>
        **説明**: カスタムエラーページやキャッシュ期間を指定したい HTTP ステータスコードの数。<code>Quantity</code> が <code>0</code> の場合、<code>Items</code> を省略できます。<br>
   - `default_cache_behavior`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `DefaultCacheBehavior`<br>
    **説明**: <code>CacheBehavior</code> 要素を指定しない場合、またはファイルが <code>CacheBehavior</code> 要素の <code>PathPattern</code> の値のいずれとも一致しない場合の既定のキャッシュ動作を記述する複合型。デフォルトのキャッシュ動作は、正確に 1 つ作成する必要があります。<br>
       - `allowed_methods`<br>
        **タイプ**: `STRUCT`<br>
        **プロバイダー名**: `AllowedMethods`<br>
           - `cached_methods`<br>
            **タイプ**: `STRUCT`<br>
            **プロバイダー名**: `CachedMethods`<br>
               - `items`<br>
                **タイプ**: `UNORDERED_LIST_STRING`<br>
                **プロバイダー名**: `Items`<br>
                **説明**: CloudFront にレスポンスをキャッシュさせたい HTTP メソッドを含む複合型。<br>
               - `quantity`<br>
                **タイプ**: `INT32`<br>
                **プロバイダー名**: `Quantity`<br>
                **説明**: CloudFront にレスポンスをキャッシュさせたい HTTP メソッドの数。有効な値は <code>2</code> (<code>GET</code> と <code>HEAD</code> リクエストに対するレスポンスをキャッシュする場合) と <code>3</code> (<code>GET</code>、<code>HEAD</code>、<code>OPTIONS</code> リクエストに対するレスポンスをキャッシュする場合) です。<br>
           - `items`<br>
            **タイプ**: `UNORDERED_LIST_STRING`<br>
            **プロバイダー名**: `Items`<br>
            **説明**: CloudFront に処理させ、オリジンに転送させたい HTTP メソッドを含む複合型。<br>
           - `quantity`<br>
            **タイプ**: `INT32`<br>
            **プロバイダー名**: `Quantity`<br>
            **説明**: CloudFront にオリジンに転送させたい HTTP メソッドの数。有効な値は、2 (<code>GET</code> と <code>HEAD</code> リクエストの場合)、3 (<code>GET</code>、<code>HEAD</code>、<code>OPTIONS</code> リクエストの場合)、7 (<code>GET、HEAD、OPTIONS、PUT、PATCH、POST</code>、<code>DELETE</code> リクエストの場合) です。<br>
       - `cache_policy_id`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `CachePolicyId`<br>
        **説明**: デフォルトのキャッシュ動作にアタッチされているキャッシュポリシーの一意の識別子。詳細については、<i>Amazon CloudFront デベロッパーガイド</i>の<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-the-cache-key.html#cache-key-create-cache-policy">キャッシュポリシーの作成</a>または<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-managed-cache-policies.html">マネージドキャッシュポリシーの使用</a>を参照してください。<code>DefaultCacheBehavior</code> には、<code>CachePolicyId</code> または <code>ForwardedValues</code> のいずれかを含める必要があります。<code>CachePolicyId</code> を使用することをお勧めします。<br>
       - `compress`<br>
        **タイプ**: `BOOLEAN`<br>
        **プロバイダー名**: `Compress`<br>
        **説明**: このキャッシュ動作のために、CloudFront に特定のファイルを自動的に圧縮させたいかどうか。必要な場合は <code>true</code> を、必要でない場合は <code>false</code> を指定します。詳細は、<i>Amazon CloudFront デベロッパーガイド</i>の<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/ServingCompressedFiles.html">圧縮されたファイルを提供する</a>を参照してください。<br>
       - `default_ttl`<br>
        **タイプ**: `INT64`<br>
        **プロバイダー名**: `DefaultTTL`<br>
        **説明**: このフィールドは非推奨です。このフィールドの代わりに、キャッシュポリシーの <code>DefaultTTL</code> フィールドを使用することをお勧めします。詳細については、<i>Amazon CloudFront デベロッパーガイド</i>の<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-the-cache-key.html#cache-key-create-cache-policy">キャッシュポリシーの作成</a>または<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-managed-cache-policies.html">マネージドキャッシュポリシーの使用</a>を参照してください。オブジェクトが更新されたかどうかを判断するために、CloudFront がオリジンに別のリクエストを転送する前に、CloudFront キャッシュにオブジェクトを留めておきたいデフォルトの時間です。指定した値は、オリジンがオブジェクトに <code>Cache-Control max-age</code>、<code>Cache-Control s-maxage</code>、<code>Expires</code> などの HTTP ヘッダーを追加しない場合にのみ適用されます。詳細については、<i>Amazon CloudFront デベロッパーガイド</i>の<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Expiration.html">コンテンツがエッジキャッシュに留まる期間 (有効期限) の管理</a>を参照してください。<br>
       - `field_level_encryption_id`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `FieldLevelEncryptionId`<br>
        **説明**: デフォルトのキャッシュ動作のデータの特定のフィールドを暗号化するために CloudFront に使用させたいフィールドレベルの暗号化構成の <code>ID</code> の値。<br>
       - `forwarded_values`<br>
        **タイプ**: `STRUCT`<br>
        **プロバイダー名**: `ForwardedValues`<br>
        **説明**: このフィールドは非推奨です。このフィールドの代わりに、キャッシュポリシーまたはオリジンリクエストポリシーを使用することをお勧めします。詳細については、<i>Amazon CloudFront デベロッパーガイド</i>の<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/working-with-policies.html">ポリシーを使用する</a>を参照してください。キャッシュキーに値を含める場合は、キャッシュポリシーを使用します。詳しくは、<i>Amazon CloudFront デベロッパーガイド</i>の<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-the-cache-key.html#cache-key-create-cache-policy">キャッシュポリシーの作成</a>または<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-managed-cache-policies.html">マネージドキャッシュポリシーの使用</a>を参照してください。値をオリジンに送信し、キャッシュキーには含めない場合は、オリジンリクエストポリシーを使用します。詳細については、<i>Amazon CloudFront デベロッパーガイド</i>の<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-origin-requests.html#origin-request-create-origin-request-policy">オリジンリクエストポリシーを作成する</a>または<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-managed-origin-request-policies.html">マネージドオリジンリクエストポリシーを使用する</a>を参照してください。<code>DefaultCacheBehavior</code> には、<code>CachePolicyId</code> または <code>ForwardedValues</code> のいずれかを含める必要があります。<code>CachePolicyId</code> を使用することをお勧めします。CloudFront がクエリ文字列、クッキー、HTTP ヘッダーをどのように処理するかを指定する複合型です。<br>
           - `cookies`<br>
            **タイプ**: `STRUCT`<br>
            **プロバイダー名**: `Cookies`<br>
            **説明**: このフィールドは非推奨です。このフィールドの代わりに、キャッシュポリシーまたはオリジンリクエストポリシーを使用することをお勧めします。キャッシュキーにクッキーを含めたい場合は、キャッシュポリシーを使用してください。詳しくは、<i>Amazon CloudFront デベロッパーガイド</i>の<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-the-cache-key.html#cache-key-create-cache-policy">キャッシュポリシーの作成</a>を参照してください。クッキーをオリジンに送信し、キャッシュキーには含めない場合は、オリジンリクエストポリシーを使用します。詳細については、<i>Amazon CloudFront デベロッパーガイド</i>の<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-origin-requests.html#origin-request-create-origin-request-policy">オリジンリクエストポリシーの作成</a>を参照してください。CloudFront がクッキーをオリジンに転送するかどうか、転送する場合はどのクッキーを転送するかを指定する複合型です。オリジンへのクッキー転送の詳細については、<i>Amazon CloudFront デベロッパーガイド</i>の <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Cookies.html">CloudFront がクッキーを転送、キャッシュ、ログする方法</a>を参照してください。<br>
               - `forward`<br>
                **タイプ**: `STRING`<br>
                **プロバイダー名**: `Forward`<br>
                **説明**: このフィールドは非推奨です。このフィールドの代わりに、キャッシュポリシーまたはオリジンリクエストポリシーを使用することをお勧めします。キャッシュキーにクッキーを含めたい場合は、キャッシュポリシーを使用してください。詳しくは、<i>Amazon CloudFront デベロッパーガイド</i>の<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-the-cache-key.html#cache-key-create-cache-policy">キャッシュポリシーの作成</a>を参照してください。クッキーをオリジンに送信し、キャッシュキーには含めない場合は、オリジンリクエストポリシーを使用します。詳細については、<i>Amazon CloudFront デベロッパーガイド</i>の<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-origin-requests.html#origin-request-create-origin-request-policy">オリジンリクエストポリシーの作成</a>を参照してください。このキャッシュ動作のためにオリジンに転送するクッキーを指定します。all、none、または <code>WhitelistedNames</code> 複合型で指定されたクッキーのリストです。Amazon S3 はクッキーを処理しません。キャッシュ動作がリクエストを Amazon S3 オリジンに転送する場合、<code>Forward</code> 要素に none を指定します。<br>
               - `whitelisted_names`<br>
                **タイプ**: `STRUCT`<br>
                **プロバイダー名**: `WhitelistedNames`<br>
                **説明**: このフィールドは非推奨です。このフィールドの代わりに、キャッシュポリシーまたはオリジンリクエストポリシーを使用することをお勧めします。キャッシュキーにクッキーを含めたい場合は、キャッシュポリシーを使用してください。詳しくは、<i>Amazon CloudFront デベロッパーガイド</i>の<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-the-cache-key.html#cache-key-create-cache-policy">キャッシュポリシーの作成</a>を参照してください。クッキーをオリジンに送信し、キャッシュキーには含めない場合は、オリジンリクエストポリシーを使用します。詳細については、<i>Amazon CloudFront デベロッパーガイド</i>の<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-origin-requests.html#origin-request-create-origin-request-policy">オリジンリクエストポリシーの作成</a>を参照してください。<code>Forward</code> の値に <code>whitelist</code> を指定した場合は必須です。このキャッシュ動作のために CloudFront に何種類のクッキーをオリジンに転送してほしいか、また、選択したクッキーを転送したい場合は、それらのクッキーの名前を指定する複合型です。<code>Forward</code> の値に <code>all</code> または <code>none</code> を指定した場合は、<code>WhitelistedNames</code> を省略します。<code>Forward</code> の値を <code>whitelist</code> から <code>all</code> または <code>none</code> に変更し、<code>WhitelistedNames</code> 要素およびその子要素を削除しない場合、CloudFront はそれらを自動的に削除します。各キャッシュ動作でホワイトリスト化できるクッキー名の現在の上限については、<i>Amazon Web Services 一般リファレンス</i>の <a href="https://docs.aws.amazon.com/general/latest/gr/xrefaws_service_limits.html#limits_cloudfront">CloudFront の上限</a>を参照してください。<br>
                   - `items`<br>
                    **タイプ**: `UNORDERED_LIST_STRING`<br>
                    **プロバイダー名**: `Items`<br>
                    **説明**: クッキー名のリスト。<br>
                   - `quantity`<br>
                    **タイプ**: `INT32`<br>
                    **プロバイダー名**: `Quantity`<br>
                    **説明**: <code>Items</code> リストのクッキー名の数。<br>
           - `headers`<br>
            **タイプ**: `STRUCT`<br>
            **プロバイダー名**: `Headers`<br>
            **説明**: このフィールドは非推奨です。このフィールドの代わりに、キャッシュポリシーまたはオリジンリクエストポリシーを使用することをお勧めします。キャッシュキーにヘッダーを含めたい場合は、キャッシュポリシーを使用してください。詳しくは、<i>Amazon CloudFront デベロッパーガイド</i>の<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-the-cache-key.html#cache-key-create-cache-policy">キャッシュポリシーの作成</a>を参照してください。ヘッダーをオリジンに送信し、キャッシュキーには含めない場合は、オリジンリクエストポリシーを使用します。詳細については、<i>Amazon CloudFront デベロッパーガイド</i>の<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-origin-requests.html#origin-request-create-origin-request-policy">オリジンリクエストポリシーの作成</a>を参照してください。このキャッシュ動作のために CloudFront にオリジンに転送させたい <code>Header</code> (もしあれば) を指定する複合型 (ホワイトリストされたヘッダー)。指定したヘッダーに対して、CloudFront はビューアリクエストのヘッダー値に基づいて、指定したオブジェクトの別バージョンをキャッシュすることもできます。詳細については、<i>Amazon CloudFront デベロッパーガイド</i>の<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/header-caching.html">リクエストヘッダーを基にしたコンテンツのキャッシュ</a>を参照してください。<br>
               - `items`<br>
                **タイプ**: `UNORDERED_LIST_STRING`<br>
                **プロバイダー名**: `Items`<br>
                **説明**: HTTP ヘッダー名のリスト。<br>
               - `quantity`<br>
                **タイプ**: `INT32`<br>
                **プロバイダー名**: `Quantity`<br>
                **説明**: <code>Items</code> リストのヘッダー名の数。<br>
           - `query_string`<br>
            **タイプ**: `BOOLEAN`<br>
            **プロバイダー名**: `QueryString`<br>
            **説明**: このフィールドは非推奨です。このフィールドの代わりに、キャッシュポリシーまたはオリジンリクエストポリシーを使用することをお勧めします。キャッシュキーにクエリ文字列を含めたい場合は、キャッシュポリシーを使用してください。詳細については、<i>Amazon CloudFront デベロッパーガイド</i>の<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-the-cache-key.html#cache-key-create-cache-policy">キャッシュポリシーの作成</a>を参照してください。オリジンにクエリ文字列を送信し、キャッシュキーには含めない場合は、オリジンリクエストポリシーを使用します。詳細は、<i>Amazon CloudFront デベロッパーガイド</i>の<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-origin-requests.html#origin-request-create-origin-request-policy">オリジンリクエストポリシーの作成</a>を参照してください。CloudFront がこのキャッシュ動作に関連するオリジンにクエリ文字列を転送し、クエリ文字列パラメーターに基づいてキャッシュを行うかどうかを示しています。CloudFront の動作は、<code>QueryString</code> の値と、<code>QueryStringCacheKeys</code> に指定した値がある場合はその値に依存します。<code>QueryString</code> に true を指定し、<code>QueryStringCacheKeys</code> に何も指定しない場合、CloudFront はすべてのクエリ文字列パラメーターをオリジンに転送し、すべてのクエリ文字列パラメーターに基づいてキャッシュを行います。クエリ文字列パラメーターと値の数によっては、CloudFront がより多くのリクエストをオリジンに転送する必要があるため、パフォーマンスに悪影響が出る可能性があります。<code>QueryString</code> に true を指定し、<code>QueryStringCacheKeys</code> に 1 つ以上の値を指定すると、CloudFront はすべてのクエリ文字列パラメーターをオリジンに転送しますが、指定したクエリ文字列パラメーターにのみ基づいてキャッシュを行います。<code>QueryString</code> に false を指定すると、CloudFront はオリジンにクエリ文字列パラメーターを転送せず、クエリ文字列パラメーターに基づいたキャッシュも行いません。詳しくは、<i>Amazon CloudFront デベロッパーガイド</i>の<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/QueryStringParameters.html">クエリ文字列パラメーターに基づいてキャッシュする CloudFront の構成</a>をご覧ください。<br>
           - `query_string_cache_keys`<br>
            **タイプ**: `STRUCT`<br>
            **プロバイダー名**: `QueryStringCacheKeys`<br>
            **説明**: このフィールドは非推奨です。このフィールドの代わりに、キャッシュポリシーまたはオリジンリクエストポリシーを使用することをお勧めします。キャッシュキーにクエリ文字列を含めたい場合は、キャッシュポリシーを使用してください。詳しくは、<i>Amazon CloudFront デベロッパーガイド</i>の<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-the-cache-key.html#cache-key-create-cache-policy">キャッシュポリシーの作成</a>を参照してください。クエリ文字列をオリジンに送信し、キャッシュキーには含めない場合は、オリジンリクエストポリシーを使用します。詳細については、<i>Amazon CloudFront デベロッパーガイド</i>の<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-origin-requests.html#origin-request-create-origin-request-policy">オリジンリクエストポリシーの作成</a>を参照してください。このキャッシュ動作のために CloudFront にキャッシュに使用させたいクエリ文字列パラメーターに関する情報を含む複合型です。<br>
               - `items`<br>
                **タイプ**: `UNORDERED_LIST_STRING`<br>
                **プロバイダー名**: `Items`<br>
                **説明**: CloudFront にキャッシュ動作の基準として使用させたいクエリ文字列パラメーターを含むリスト。<code>Quantity</code> が 0 の場合、<code>Items</code> を省略することができます。<br>
               - `quantity`<br>
                **タイプ**: `INT32`<br>
                **プロバイダー名**: `Quantity`<br>
                **説明**: キャッシュ動作のための <code>whitelisted</code> クエリ文字列パラメーターの数。<br>
       - `function_associations`<br>
        **タイプ**: `STRUCT`<br>
        **プロバイダー名**: `FunctionAssociations`<br>
        **説明**: このキャッシュ動作に関連付けられた CloudFront 関数のリスト。CloudFront 関数をキャッシュ動作に関連付けるには、<code>LIVE</code> ステージに公開する必要があります。<br>
           - `items`<br>
            **タイプ**: `UNORDERED_LIST_STRUCT`<br>
            **プロバイダー名**: `Items`<br>
            **説明**: CloudFront ディストリビューションのキャッシュ動作に関連付けられた CloudFront 関数。CloudFront 関数をキャッシュ動作に関連付けるには、<code>LIVE</code> ステージに公開する必要があります。<br>
               - `event_type`<br>
                **タイプ**: `STRING`<br>
                **プロバイダー名**: `EventType`<br>
                **説明**: 関数のイベントタイプ、<code>viewer-request</code> または <code>viewer-response</code> のどちらか。CloudFront 関数では、オリジン向けイベントタイプ (<code>origin-request</code> と <code>origin-response</code>) は使用できません。<br>
               - `function_arn`<br>
                **タイプ**: `STRING`<br>
                **プロバイダー名**: `FunctionARN`<br>
                **説明**: 関数の Amazon Resource Name (ARN)。<br>
           - `quantity`<br>
            **タイプ**: `INT32`<br>
            **プロバイダー名**: `Quantity`<br>
            **説明**: リストに含まれる CloudFront 関数の数。<br>
       - `lambda_function_associations`<br>
        **タイプ**: `STRUCT`<br>
        **プロバイダー名**: `LambdaFunctionAssociations`<br>
        **説明**: キャッシュ動作のための 0 個以上の Lambda@Edge 関数の関連付けを含む複合型。<br>
           - `items`<br>
            **タイプ**: `UNORDERED_LIST_STRUCT`<br>
            **プロバイダー名**: `Items`<br>
            **説明**: <b>オプション</b>: このキャッシュ動作のための <code>LambdaFunctionAssociation</code> アイテムを含む複合型。<code>Quantity</code> が <code>0</code> の場合、<code>Items</code> を省略することができます。<br>
               - `event_type`<br>
                **タイプ**: `STRING`<br>
                **プロバイダー名**: `EventType`<br>
                **説明**: Lambda@Edge 関数の呼び出しをトリガーとするイベントタイプを指定します。指定できる値は以下の通りです。 <ul> <li>  <code>viewer-request</code>: この関数は、CloudFront がビューアからのリクエストを受信したとき、リクエストされたオブジェクトがエッジキャッシュにあるかどうかを確認する前に実行されます。  </li> <li>  <code>origin-request</code>: この関数は、CloudFront がオリジンにリクエストを送信したときのみ実行されます。リクエストされたオブジェクトがエッジキャッシュにある場合、関数は実行されません。 </li> <li>  <code>origin-response</code>: この関数は、CloudFront がオリジンからレスポンスを受け取った後、そのレスポンスに含まれるオブジェクトをキャッシュする前に実行されます。リクエストされたオブジェクトがエッジキャッシュにある場合、関数は実行されません。 </li> <li>  <code>viewer-response</code>: この関数は、CloudFront がリクエストしたオブジェクトをビューアに返す前に実行されます。この関数は、オブジェクトがすでにエッジキャッシュにあるかどうかに関係なく実行されます。オリジンが HTTP 200 (OK) 以外の HTTP ステータスコードを返した場合、関数は実行されません。 </li> </ul>
               - `include_body`<br>
                **タイプ**: `BOOLEAN`<br>
                **プロバイダー名**: `IncludeBody`<br>
                **説明**: Lambda@Edge 関数が本文の内容に読み取りアクセスできるようにするためのフラグ。詳細は、Amazon CloudFront デベロッパーガイドの <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-include-body-access.html">Include Body Option を選択してリクエスト本文にアクセスする</a>を参照してください。<br>
               - `lambda_function_arn`<br>
                **タイプ**: `STRING`<br>
                **プロバイダー名**: `LambdaFunctionARN`<br>
                **説明**: Lambda@Edge 関数の ARN。関数のバージョンの ARN を指定する必要があります。エイリアスや $LATEST を指定することはできません。<br>
           - `quantity`<br>
            **タイプ**: `INT32`<br>
            **プロバイダー名**: `Quantity`<br>
            **説明**: このキャッシュ動作の Lambda@Edge 関数の関連付けの数。<br>
       - `max_ttl`<br>
        **タイプ**: `INT64`<br>
        **プロバイダー名**: `MaxTTL`<br>
        **説明**: このフィールドは非推奨です。このフィールドの代わりに、キャッシュポリシーの <code>MaxTTL</code> フィールドを使用することをお勧めします。詳細については、<i>Amazon CloudFront デベロッパーガイド</i>の<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-the-cache-key.html#cache-key-create-cache-policy">キャッシュポリシーの作成</a>または<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-managed-cache-policies.html">マネージドキャッシュポリシーの使用</a>を参照してください。オブジェクトが更新されたかどうかを判断するために、CloudFront がオリジンに別のリクエストを転送する前に、CloudFront キャッシュにオブジェクトを留めておきたい最大の時間です。指定した値は、オリジンがオブジェクトに <code>Cache-Control max-age</code>、<code>Cache-Control s-maxage</code>、<code>Expires</code> などの HTTP ヘッダーを追加する場合にのみ適用されます。詳細については、<i>Amazon CloudFront デベロッパーガイド</i>の<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Expiration.html">コンテンツがエッジキャッシュに留まる期間 (有効期限) の管理</a>を参照してください。<br>
       - `min_ttl`<br>
        **タイプ**: `INT64`<br>
        **プロバイダー名**: `MinTTL`<br>
        **説明**: このフィールドは非推奨です。このフィールドの代わりに、キャッシュポリシーの <code>MinTTL</code> フィールドを使用することをお勧めします。詳細については、<i>Amazon CloudFront デベロッパーガイド</i>の<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-the-cache-key.html#cache-key-create-cache-policy">キャッシュポリシーの作成</a>または<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-managed-cache-policies.html">マネージドキャッシュポリシーの使用</a>を参照してください。オブジェクトが更新されたかどうかを判断するために、CloudFront がオリジンに別のリクエストを転送する前に、CloudFront キャッシュにオブジェクトを留めておきたい最小の時間です。詳しくは、<i>Amazon CloudFront デベロッパーガイド</i>の<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Expiration.html">コンテンツがエッジキャッシュに留まる期間 (有効期限) の管理</a>を参照してください。CloudFront がすべてのヘッダーをオリジンに転送するように構成する場合、<code>MinTTL</code> に <code>0</code> を指定する必要があります (<code>Headers</code> で <code>Quantity</code> に <code>1</code>、<code>Name</code> に <code>*</code> を指定した場合)。<br>
       - `origin_request_policy_id`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `OriginRequestPolicyId`<br>
        **説明**: デフォルトのキャッシュ動作にアタッチされているオリジンリクエストポリシーの一意な識別子。詳細については、<i>Amazon CloudFront デベロッパーガイド</i>の<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-origin-requests.html#origin-request-create-origin-request-policy">オリジンリクエストポリシーの作成</a>または<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-managed-origin-request-policies.html">マネージドオリジンリクエストポリシーの使用</a>を参照してください。<br>
       - `realtime_log_config_arn`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `RealtimeLogConfigArn`<br>
        **説明**: このキャッシュ動作にアタッチされているリアルタイムログ構成の Amazon Resource Name (ARN)。詳細については、<i>Amazon CloudFront デベロッパーガイド</i>の<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/real-time-logs.html">リアルタイムログ</a>を参照してください。<br>
       - `response_headers_policy_id`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `ResponseHeadersPolicyId`<br>
        **説明**: レスポンスヘッダーポリシーの識別子。<br>
       - `smooth_streaming`<br>
        **タイプ**: `BOOLEAN`<br>
        **プロバイダー名**: `SmoothStreaming`<br>
        **説明**: このキャッシュ動作に関連付けられたオリジンを使用して、Microsoft Smooth Streaming 形式のメディアファイルを配信するかどうかを示します。配信する場合は <code>true</code> を、配信しない場合は <code>false</code> を指定します。<code>SmoothStreaming</code> に <code>true</code> を指定した場合でも、コンテンツが <code>PathPattern</code> の値と一致する場合は、このキャッシュ動作を使用して他のコンテンツを配信することができます。<br>
       - `target_origin_id`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `TargetOriginId`<br>
        **説明**: デフォルトのキャッシュ動作を使用したときに CloudFront にリクエストをルーティングさせたいオリジンの <code>ID</code> の値。<br>
       - `trusted_key_groups`<br>
        **タイプ**: `STRUCT`<br>
        **プロバイダー名**: `TrustedKeyGroups`<br>
        **説明**: CloudFront が署名付き URL または署名付きクッキーを検証するために使用できるキーグループのリスト。キャッシュ動作が信頼できるキーグループを含む場合、CloudFront はキャッシュ動作に一致するすべてのリクエストに対して署名付き URL または署名付きクッキーを要求します。URL やクッキーは、対応する公開キーがキーグループにあるプライベートキーで署名されている必要があります。署名付き URL またはクッキーには、CloudFront が署名の検証に使用すべき公開キーに関する情報が含まれています。詳しくは、<i>Amazon CloudFront デベロッパーガイド</i>の<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/PrivateContent.html">プライベートコンテンツの提供</a>を参照してください。<br>
           - `enabled`<br>
            **タイプ**: `BOOLEAN`<br>
            **プロバイダー名**: `Enabled`<br>
            **説明**: このフィールドは、CloudFront が署名付き URL と署名付きクッキーの署名を検証するために使用できる公開キーをリスト内のキーグループのいずれかが持っている場合、<code>true</code> になります。そうでない場合、このフィールドは <code>false</code> になります。<br>
           - `items`<br>
            **タイプ**: `UNORDERED_LIST_STRING`<br>
            **プロバイダー名**: `Items`<br>
            **説明**: キーグループの識別子のリスト。<br>
           - `quantity`<br>
            **タイプ**: `INT32`<br>
            **プロバイダー名**: `Quantity`<br>
            **説明**: リストに含まれるキーグループの数。<br>
       - `trusted_signers`<br>
        **タイプ**: `STRUCT`<br>
        **プロバイダー名**: `TrustedSigners`<br>
        **説明**: <important> <code>TrustedSigners</code> の代わりに <code>TrustedKeyGroups</code> を使用することをお勧めします。 </important> CloudFront が署名付き URL または署名付きクッキーを検証するために使用できる公開キーを持つ、Amazon Web Services のアカウント ID のリストです。キャッシュ動作が信頼できる署名者を含む場合、CloudFront はキャッシュ動作に一致するすべてのリクエストに対して署名付き URL または署名付きクッキーを要求します。URL やクッキーは、信頼できる署名者の Amazon Web Services アカウントにある CloudFront キーペアのプライ ベートキーで署名されている必要があります。署名付き URL またはクッキーには、CloudFront が署名の検証に使用すべき公開キーに関する情報が含まれています。詳しくは、<i>Amazon CloudFront デベロッパーガイド</i>の<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/PrivateContent.html">プライベートコンテンツの提供</a>を参照してください。<br>
           - `enabled`<br>
            **タイプ**: `BOOLEAN`<br>
            **プロバイダー名**: `Enabled`<br>
            **説明**: このフィールドは、CloudFront が署名付き URL と署名付きクッキーの署名を検証するために使用できる公開キーを Amazon Web Services アカウントのいずれかが持っている場合、<code>true</code> になります。そうでない場合、このフィールドは <code>false</code> になります。<br>
           - `items`<br>
            **タイプ**: `UNORDERED_LIST_STRING`<br>
            **プロバイダー名**: `Items`<br>
            **説明**: Amazon Web Services アカウントの識別子のリスト。<br>
           - `quantity`<br>
            **タイプ**: `INT32`<br>
            **プロバイダー名**: `Quantity`<br>
            **説明**: リストに含まれる Amazon Web Services のアカウントの数。<br>
       - `viewer_protocol_policy`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `ViewerProtocolPolicy`<br>
        **説明**: <code>PathPattern</code> で指定されたパスパターンに合致するリクエストがあった場合に、<code>TargetOriginId</code> で指定されたオリジンのファイルにアクセスするためにビューアが利用可能なプロトコル。以下のオプションを指定できます。 <ul> <li>  <code>allow-all</code>: ビューアは HTTP または HTTPS を使用することができます。 </li> <li>  <code>redirect-to-https</code>: ビューアが HTTP リクエストを送信すると、CloudFront は HTTP ステータスコード 301 (Moved Permanently) を HTTPS URL と一緒にビューアに返します。その後、ビューアは新しい URL を使用してリクエストを再送信します。  </li> <li>  <code>https-only</code>: ビューアが HTTP リクエストを送信した場合、CloudFront は HTTP ステータスコード 403 (Forbidden) を返します。  </li> </ul> HTTPS プロトコルの要求の詳細については、<i>Amazon CloudFront デベロッパーガイド</i>の<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-https-viewers-to-cloudfront.html">ビューアと CloudFront 間で HTTPS を要求する</a>を参照してください。 <note> HTTPS を使用してオリジンから取得されたオブジェクトをビューアが取得することを保証する唯一の方法 は、オブジェクトの取得に他のプロトコルを使用しないことです。最近、HTTP から HTTPS に変更した場合は、オブジェクトのキャッシュをクリアすることを推奨します。キャッシュされたオブジェクトは、プロトコルに依存しないためです。つまり、エッジロケーションは、現在のリクエストプロトコルが以前に使用したプロトコルと一致するかどうかに関係なく、キャッシュからオブジェクトを返します。詳細については、<i>Amazon CloudFront デベロッパーガイド</i>の<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Expiration.html">キャッシュの有効期限の管理</a>を参照してください。 </note><br>
   - `default_root_object`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `DefaultRootObject`<br>
    **説明**: ビューアがディストリビューション内のオブジェクト (<code>http://www.example.com/product-description.html</code>) ではなく、ディストリビューションのルート URL (<code>http://www.example.com</code>) をリクエストしたときに、CloudFront にオリジンからリクエストさせたいオブジェクト (例えば <code>index.html</code>)。デフォルトのルートオブジェクトを指定することで、ディストリビューションのコンテンツが公開されるのを回避できます。オブジェクト名だけを指定してください (例: <code>index.html</code>)。オブジェクト名の前に <code>/</code> を付けないでください。ディストリビューションの作成時にデフォルトのルートオブジェクトを指定しない場合は、空の <code>DefaultRootObject</code> 要素を含めてください。既存のディストリビューションからデフォルトのルートオブジェクトを削除するには、ディストリビューションの構成を更新し、空の <code>DefaultRootObject</code> 要素を含めます。デフォルトのルートオブジェクトを置き換えるには、ディストリビューションの構成を更新して、新しいオブジェクトを指定します。デフォルトルートオブジェクトの詳細については、<i>Amazon CloudFront デベロッパーガイド</i>の<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/DefaultRootObject.html">デフォルトルートオブジェクトの作成</a>を参照してください。<br>
   - `enabled`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `Enabled`<br>
    **説明**: このフィールドから、選択したディストリビューションを有効または無効にすることができます。<br>
   - `http_version`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `HttpVersion`<br>
    **説明**: (オプション) ビューアが CloudFront と通信するために使用する最大 HTTP バージョンを指定します。新しい Web ディストリビューションのデフォルト値は http2 です。HTTP/2 をサポートしていないビューアは、自動的に以前の HTTP バージョンを使用します。ビューアと CloudFront が HTTP/2 を使用するには、ビューアが TLS 1.2 以降をサポートし、SNI (Server Name Identification) をサポートする必要があります。一般的に、HTTP/2 を使用してビューアと通信するように CloudFront を構成すると、レイテンシーが減少します。HTTP/2 に最適化することで、パフォーマンスを向上させることができます。詳細については、"http/2 optimization" でインターネット検索してください。<br>
   - `is_ipv6_enabled`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `IsIPV6Enabled`<br>
    **説明**: CloudFront が IPv6 DNS リクエストに対して、ディストリビューションの IPv6 アドレスで応答したい場合は、<code>true</code> を指定します。<code>false</code> を指定すると、CloudFront は IPv6 DNS リクエストに DNS レスポンスコード <code>NOERROR</code> で応答し、IP アドレスは付きません。これにより、ビューアは、ディストリビューション用の IPv4 アドレスに対する 2 つ目のリクエストを送信することができます。 一般的に、コンテンツにアクセスしたい IPv6 ネットワーク上のユーザーがいる場合は、IPv6 を有効にする必要があります。ただし、コンテンツへのアクセスを制限するために署名付き URL または署名付きクッキーを使用している場合、およびコンテンツにアクセスできる IP アドレスを制限するために <code>IpAddress</code> パラメーターを含むカスタムポリシーを使用している場合は、IPv6 を有効にしないでください。一部のコンテンツへのアクセスを IP アドレスで制限し、他のコンテンツへのアクセスを制限しない (またはアクセスを制限するが IP アドレスでは制限しない) 場合、2 つのディストリビューションを作成することができます。詳しくは、<i>Amazon CloudFront デベロッパーガイド</i>の<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-creating-signed-url-custom-policy.html">カスタムポリシーを使用した署名付き URL の作成</a>をご覧ください。Route 53 Amazon Web Services Integration のエイリアスリソースレコードセットを使用して CloudFront ディストリビューションにトラフィックをルーティングしている場合、以下の両方が成立するときは、2 つ目のエイリアスリソースレコードセットを作成する必要があります。 <ul> <li> ディストリビューションで IPv6 を有効にした </li> <li> オブジェクトの URL に代替ドメイン名を使っている </li> </ul> 詳細については、<i>Route 53 Amazon Web Services Integration デベロッパーガイド</i>の<a href="https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-to-cloudfront-distribution.html">ドメイン名を使用して Amazon CloudFront Web 配信にトラフィックをルーティングする</a>を参照してください。Route 53 Amazon Web Services Integration または他の DNS サービスで CNAME リソースレコードセットを作成した場合は、何も変更する必要はありません。CNAME レコードは、ビューアリクエストの IP アドレス形式に関係なく、配信にトラフィックをルーティングします。<br>
   - `logging`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `Logging`<br>
    **説明**: ディストリビューションに対してアクセスログを書き込むかどうかを制御する複合型。ログの詳細については、<i>Amazon CloudFront デベロッパーガイド</i>の<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/AccessLogs.html">アクセスログ</a>を参照してください。<br>
       - `bucket`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `Bucket`<br>
        **説明**: アクセスログを格納する Amazon S3 バケット。例: <code>myawslogbucket.s3.amazonaws.com</code><br>
       - `enabled`<br>
        **タイプ**: `BOOLEAN`<br>
        **プロバイダー名**: `Enabled`<br>
        **説明**: CloudFront が Amazon S3 バケットにアクセスログを保存するかどうかを指定します。ディストリビューション作成時にログを有効にしない場合、または既存のディストリビューションでログを無効にする場合は、<code>Enabled</code> に <code>false</code> を指定し、<code>Bucket</code> と <code>Prefix</code> の要素を空にしたものを指定してください。<code>Enabled</code> に <code>false</code> を指定しても、<code>Bucket</code>、<code>prefix</code>、および <code>IncludeCookies</code> に値を指定した場合、その値は自動的に削除されます。<br>
       - `include_cookies`<br>
        **タイプ**: `BOOLEAN`<br>
        **プロバイダー名**: `IncludeCookies`<br>
        **説明**: CloudFront がアクセスログにクッキーを含めるかどうかを指定し、<code>IncludeCookies</code> には <code>true</code> を指定します。ログにクッキーを含めることを選択した場合、このディストリビューションのキャッシュ動作の構成に関係なく、CloudFront はすべてのクッキーをログに記録します。ディストリビューション作成時にクッキーを含めない場合、または既存のディストリビューションのクッキーを含めないようにする場合は、<code>IncludeCookies</code> に <code>false</code> を指定します。<br>
       - `prefix`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `Prefix`<br>
        **説明**: CloudFront にこのディストリビューションのアクセスログ <code>filenames</code> のプレフィックスとして指定したい文字列 (オプション) (例: <code>myprefix/</code>)。ロギングを有効にしたいが、プレフィックスを指定したくない場合、<code>Logging</code> 要素に空の <code>Prefix</code> 要素を含める必要があります。<br>
   - `origin_groups`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `OriginGroups`<br>
    **説明**: このディストリビューションのオリジングループに関する情報を含む複合型。<br>
       - `items`<br>
        **タイプ**: `UNORDERED_LIST_STRUCT`<br>
        **プロバイダー名**: `Items`<br>
        **説明**: ディストリビューションの項目 (オリジングループ)。<br>
           - `failover_criteria`<br>
            **タイプ**: `STRUCT`<br>
            **プロバイダー名**: `FailoverCriteria`<br>
            **説明**: オリジングループのフェイルオーバー基準に関する情報を含む複合型。<br>
               - `status_codes`<br>
                **タイプ**: `STRUCT`<br>
                **プロバイダー名**: `StatusCodes`<br>
                **説明**: プライマリオリジンから返されたときに、CloudFront が第 2 オリジンにフェイルオーバーするためのトリガーとなるステータスコード。<br>
                   - `items`<br>
                    **タイプ**: `UNORDERED_LIST_INT32`<br>
                    **プロバイダー名**: `Items`<br>
                    **説明**: オリジングループの項目 (ステータスコード)。<br>
                   - `quantity`<br>
                    **タイプ**: `INT32`<br>
                    **プロバイダー名**: `Quantity`<br>
                    **説明**: ステータスコードの数。<br>
           - `id`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `Id`<br>
            **説明**: オリジングループの ID。<br>
           - `members`<br>
            **タイプ**: `STRUCT`<br>
            **プロバイダー名**: `Members`<br>
            **説明**: オリジングループのオリジンに関する情報を含む複合型。<br>
               - `items`<br>
                **タイプ**: `UNORDERED_LIST_STRUCT`<br>
                **プロバイダー名**: `Items`<br>
                **説明**: オリジングループの項目 (オリジン)。<br>
                   - `origin_id`<br>
                    **タイプ**: `STRING`<br>
                    **プロバイダー名**: `OriginId`<br>
                    **説明**: オリジングループのオリジンの ID。<br>
               - `quantity`<br>
                **タイプ**: `INT32`<br>
                **プロバイダー名**: `Quantity`<br>
                **説明**: オリジングループのオリジンの数。<br>
       - `quantity`<br>
        **タイプ**: `INT32`<br>
        **プロバイダー名**: `Quantity`<br>
        **説明**: オリジングループの数。<br>
   - `origins`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `Origins`<br>
    **説明**: このディストリビューションのオリジンに関する情報を含む複合型。<br>
       - `items`<br>
        **タイプ**: `UNORDERED_LIST_STRUCT`<br>
        **プロバイダー名**: `Items`<br>
        **説明**: オリジンのリスト。<br>
           - `connection_attempts`<br>
            **タイプ**: `INT32`<br>
            **プロバイダー名**: `ConnectionAttempts`<br>
            **説明**: CloudFront がオリジンへの接続を試行する回数。最小値は 1、最大値は 3、デフォルト (特に指定しない場合) は 3 です。 カスタムオリジン (静的 Web サイトホスティングで構成された Amazon S3 バケットを含む) の場合、この値は、<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-web-values-specify.html#DownloadDistValuesOriginResponseTimeout">オリジン応答タイムアウト</a>の場合、CloudFront がオリジンから応答を取得しようとする回数を指定することも可能です。詳細については、<i>Amazon CloudFront デベロッパーガイド</i>の<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-web-values-specify.html#origin-connection-attempts">オリジン接続の試行</a>を参照してください。<br>
           - `connection_timeout`<br>
            **タイプ**: `INT32`<br>
            **プロバイダー名**: `ConnectionTimeout`<br>
            **説明**: オリジンへの接続を確立しようとするときにCloudFront が待機する秒数。最小タイムアウトは 1 秒、最大は 10 秒で、デフォルト (特に指定しない場合) は 10 秒です。詳細については、<i>Amazon CloudFront デベロッパーガイド</i>の<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-web-values-specify.html#origin-connection-timeout">オリジン接続タイムアウト</a>を参照してください。<br>
           - `custom_headers`<br>
            **タイプ**: `STRUCT`<br>
            **プロバイダー名**: `CustomHeaders`<br>
            **説明**: CloudFront がオリジンに送信するリクエストに追加する HTTP ヘッダーの名前と値のリスト。詳しくは、<i>Amazon CloudFront デベロッパーガイド</i>の<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/add-origin-custom-headers.html">オリジンリクエストにカスタムヘッダーを追加する</a>をご覧ください。<br>
               - `items`<br>
                **タイプ**: `UNORDERED_LIST_STRUCT`<br>
                **プロバイダー名**: `Items`<br>
                **説明**: <b>オプション</b>: CloudFront がオリジンに転送したいカスタムヘッダーごとに、<code>OriginCustomHeader</code> 要素を 1 つ含むリスト。Quantity が <code>0</code> の場合、<code>Items</code> は省略されます。<br>
                   - `header_name`<br>
                    **タイプ**: `STRING`<br>
                    **プロバイダー名**: `HeaderName`<br>
                    **説明**: CloudFront がオリジンに送信するヘッダーの名前。詳しくは、<i>Amazon CloudFront デベロッパーガイド</i>の<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/forward-custom-headers.html">オリジンリクエストにカスタムヘッダーを追加する</a>を参照してください。<br>
                   - `header_value`<br>
                    **タイプ**: `STRING`<br>
                    **プロバイダー名**: `HeaderValue`<br>
                    **説明**: <code>HeaderName</code> フィールドで指定したヘッダーの値。<br>
               - `quantity`<br>
                **タイプ**: `INT32`<br>
                **プロバイダー名**: `Quantity`<br>
                **説明**: このディストリビューションにカスタムヘッダーがある場合、その数。<br>
           - `custom_origin_config`<br>
            **タイプ**: `STRUCT`<br>
            **プロバイダー名**: `CustomOriginConfig`<br>
            **説明**: このタイプは、1 つの例外を除いて、Amazon S3 バケットでないオリジンを指定するために使用します。Amazon S3 バケットが静的な Web サイトホスティングで構成されている場合、このタイプを使用します。Amazon S3 バケットが静的な Web サイトホスティングで構成されていない場合、代わりに <code>S3OriginConfig</code> タイプを使用します。<br>
               - `http_port`<br>
                **タイプ**: `INT32`<br>
                **プロバイダー名**: `HTTPPort`<br>
                **説明**: CloudFront がオリジンへの接続に使用する HTTP ポート。オリジンがリッスンする HTTP ポートを指定します。<br>
               - `https_port`<br>
                **タイプ**: `INT32`<br>
                **プロバイダー名**: `HTTPSPort`<br>
                **説明**: CloudFront がオリジンへの接続に使用する HTTPS ポート。オリジンがリッスンする HTTPS ポートを指定します。<br>
               - `origin_keepalive_timeout`<br>
                **タイプ**: `INT32`<br>
                **プロバイダー名**: `OriginKeepaliveTimeout`<br>
                **説明**: CloudFront がオリジンへの接続を持続する時間を秒単位で指定します。最小タイムアウトは 1 秒、最大タイムアウトは 60 秒、デフォルト (特に指定しない場合) は 5 秒です。詳細は、<i>Amazon CloudFront デベロッパーガイド</i>の<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-web-values-specify.html#DownloadDistValuesOriginKeepaliveTimeout">オリジンキープアライブタイムアウト</a>を参照してください。<br>
               - `origin_protocol_policy`<br>
                **タイプ**: `STRING`<br>
                **プロバイダー名**: `OriginProtocolPolicy`<br>
                **説明**: CloudFront がオリジンへの接続に使用するプロトコル (HTTP または HTTPS) を指定します。有効な値は以下の通りです。 <ul> <li>  <code>http-only</code> – CloudFront はオリジンへの接続に常に HTTP を使用します。 </li> <li>  <code>match-viewer</code> – CloudFront は、ビューアが CloudFront に接続する際に使用したのと同じプロトコルを使用してオリジンに接続します。 </li> <li>  <code>https-only</code> – CloudFront はオリジンへの接続に常に HTTPS を使用します。 </li> </ul>
               - `origin_read_timeout`<br>
                **タイプ**: `INT32`<br>
                **プロバイダー名**: `OriginReadTimeout`<br>
                **説明**: CloudFront がオリジンからの応答を待つ時間を秒単位で指定します。これは<i>オリジン応答タイムアウト</i>とも呼ばれます。タイムアウトの最小値は 1 秒、最大値は 60 秒、デフォルト (特に指定がない場合) は 30 秒です。詳細については、<i>Amazon CloudFront デベロッパーガイド</i>の<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-web-values-specify.html#DownloadDistValuesOriginResponseTimeout">オリジナル応答タイムアウト</a>を参照してください。<br>
               - `origin_ssl_protocols`<br>
                **タイプ**: `STRUCT`<br>
                **プロバイダー名**: `OriginSslProtocols`<br>
                **説明**: HTTPS でオリジンに接続する際に、CloudFront が使用する最小の SSL/TLS プロトコルを指定します。有効な値には、<code>SSLv3</code>、<code>TLSv1</code>、<code>TLSv1.1</code>、および <code>TLSv1.2</code> が含まれます。詳細については、<i>Amazon CloudFront デベロッパーガイド</i>の<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-web-values-specify.html#DownloadDistValuesOriginSSLProtocols">最小限のオリジン SSL プロトコル</a>を参照してください。<br>
                   - `items`<br>
                    **タイプ**: `UNORDERED_LIST_STRING`<br>
                    **プロバイダー名**: `Items`<br>
                    **説明**: このディストリビューションで許可された SSL/TLS プロトコルを含むリスト。<br>
                   - `quantity`<br>
                    **タイプ**: `INT32`<br>
                    **プロバイダー名**: `Quantity`<br>
                    **説明**: このオリジンとの HTTPS 接続を確立する際に、CloudFront が使用することを許可する SSL/TLS プロトコルの数。<br>
           - `domain_name`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `DomainName`<br>
            **説明**: オリジンのドメイン名。詳細は、<i>Amazon CloudFront デベロッパーガイド</i>の<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-web-values-specify.html#DownloadDistValuesDomainName">オリジンのドメイン名</a>を参照してください。<br>
           - `id`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `Id`<br>
            **説明**: オリジンに対する一意の識別子。この値は、ディストリビューション内で一意である必要があります。この値は、<code>CacheBehavior</code> または <code>DefaultCacheBehavior</code> で <code>TargetOriginId</code> を指定するために使用します。<br>
           - `origin_path`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `OriginPath`<br>
            **説明**: CloudFront がオリジンからコンテンツをリクエストする際に、CloudFront がオリジンドメイン名に付加するオプションのパス。詳細については、<i>Amazon CloudFront デベロッパーガイド</i>の<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-web-values-specify.html#DownloadDistValuesOriginPath">オリジンパス</a>を参照してください。<br>
           - `origin_shield`<br>
            **タイプ**: `STRUCT`<br>
            **プロバイダー名**: `OriginShield`<br>
            **説明**: CloudFront の Origin Shield。Origin Shield を使用することで、オリジンの負荷を軽減することができます。詳しくは、<i>Amazon CloudFront デベロッパーガイド</i>の <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/origin-shield.html">Origin Shield の使用</a>を参照してください。<br>
               - `enabled`<br>
                **タイプ**: `BOOLEAN`<br>
                **プロバイダー名**: `Enabled`<br>
                **説明**: Origin Shield が有効かどうかを指定するフラグ。これが有効な場合、CloudFront はすべてのリクエストを Origin Shield を通してルーティングし、オリジンを保護するのに役立ちます。無効の場合、CloudFront は複数のエッジロケーションやリージョナルエッジキャッシュから直接オリジンにリクエストを送る可能性があります。<br>
               - `origin_shield_region`<br>
                **タイプ**: `STRING`<br>
                **プロバイダー名**: `OriginShieldRegion`<br>
                **説明**: Origin Shield の Amazon Web Services Region。オリジンへのレイテンシーが最も低い Amazon Web Services リージョンを指定します。リージョンを指定する場合は、リージョン名ではなく、リージョンコードを使用します。例えば、US East (Ohio) リージョンは <code>us-east-2</code> と指定します。CloudFront Origin Shield を有効にする場合、Origin Shield 用の Amazon Web Services リージョンを指定する必要があります。指定できる Amazon Web Services リージョンの一覧と、オリジンに最適なリージョンを選択する方法については、<i>Amazon CloudFront デベロッパーガイド</i>の <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/origin-shield.html#choose-origin-shield-region">Origin Shield のための Amazon Web Services リージョンの選択</a>をご覧ください。<br>
           - `s3_origin_config`<br>
            **タイプ**: `STRUCT`<br>
            **プロバイダー名**: `S3OriginConfig`<br>
            **説明**: このタイプは、静的な Web サイトホスティングで構成されていない Amazon S3 バケットであるオリジンを指定するために使用します。静的 Web サイトホスティングで構成された Amazon S3 バケットを含む、他のタイプのオリジンを指定するには、代わりに <code>CustomOriginConfig</code> タイプを使用します。<br>
               - `origin_access_identity`<br>
                **タイプ**: `STRING`<br>
                **プロバイダー名**: `OriginAccessIdentity`<br>
                **説明**: オリジンに関連付ける CloudFront のオリジンアクセスアイデンティティです。オリジンアクセスアイデンティティを使用して、ビューアが CloudFront を通じて Amazon S3 バケット内のオブジェクトに<i>のみ</i>アクセスできるように、オリジンを構成することができます。値の形式は次の通りです: origin-access-identity/cloudfront/<i>ID-of-origin-access-identity</i>  ここで <code> <i>ID-of-origin-access-identity</i> </code> は、オリジンアクセス ID を作成した際に CloudFront が <code>ID</code> 要素に返した値です。ビューアが CloudFront URL または Amazon S3 URL のいずれかを使ってオブジェクトにアクセスできるようにしたい場合、空の <code>OriginAccessIdentity</code> 要素を指定します。既存のディストリビューションからオリジンアクセス ID を削除するには、ディストリビューション構成を更新し、空の <code>OriginAccessIdentity</code> 要素を含めます。アクセス ID を置き換えるには、ディストリビューション構成を更新し、新しいアクセス ID を指定します。オリジンアクセス ID の詳細については、<i>Amazon CloudFront デベロッパーガイド</i>の <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/PrivateContent.html">CloudFront を介したプライベートコンテンツの提供</a>を参照してください。<br>
       - `quantity`<br>
        **タイプ**: `INT32`<br>
        **プロバイダー名**: `Quantity`<br>
        **説明**: このディストリビューションのオリジンの数。<br>
   - `price_class`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `PriceClass`<br>
    **説明**: CloudFront サービスに支払いたい最大価格に対応する価格クラス。<code>PriceClass_All</code> を指定すると、CloudFront はすべての CloudFront エッジロケーションからオブジェクトに対するリクエストに応答します。<code>PriceClass_All</code> 以外の価格クラスを指定した場合、CloudFront は価格クラス内のエッジロケーションの中で最もレイテンシーの低い CloudFront エッジロケーションからオブジェクトを提供します。指定した価格クラスから除外されたリージョンやその近くにいるビューアは、パフォーマンスが低下する可能性があります。価格クラスの詳細については、<i>Amazon CloudFront デベロッパーガイド</i>の <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/PriceClass.html">CloudFront ディストリビューションの価格クラスを選択する</a>を参照してください。価格クラス (価格クラス 100 など) が CloudFront リージョンにどのようにマッピングされるかなど、CloudFront の価格についての情報は、<a href="http://aws.amazon.com/cloudfront/pricing/">Amazon CloudFront Pricing</a> を参照してください。<br>
   - `restrictions`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `Restrictions`<br>
    **説明**: コンテンツの配信を制限する方法を特定するための複合型。<br>
       - `geo_restriction`<br>
        **タイプ**: `STRUCT`<br>
        **プロバイダー名**: `GeoRestriction`<br>
        **説明**: コンテンツが配信される国を制御する複合型。CloudFront は <code>MaxMind</code> GeoIP データベースを使用してユーザーの所在地を決定します。<br>
           - `items`<br>
            **タイプ**: `UNORDERED_LIST_STRING`<br>
            **プロバイダー名**: `Items`<br>
            **説明**: CloudFront にコンテンツを配信する (<code>whitelist</code>)、または配信しない (<code>blacklist</code>) ことを望む国ごとに、<code>Location</code> 要素を含む複合型。<code>Location</code> 要素は、<code>blacklist</code> または <code>whitelist</code> に含めたい国の大文字の国コード (2 文字) です。国ごとに 1 つの <code>Location</code> 要素を含めます。CloudFront と <code>MaxMind</code> はどちらも <code>ISO 3166</code> 国コードを使用します。現在の国のリストと対応するコードについては、<i>国際標準化機構</i>の Web サイトの <code>ISO 3166-1-alpha-2</code> コードを参照してください。また、CloudFront コンソールの国名リストには、国名とコードの両方が含まれているので、それを参照することもできます。<br>
           - `quantity`<br>
            **タイプ**: `INT32`<br>
            **プロバイダー名**: `Quantity`<br>
            **説明**: 地域制限が <code>enabled</code> の場合、<code>whitelist</code> または <code>blacklist</code> に登録されている国の数です。それ以外の場合、有効でない場合、<code>Quantity</code> は <code>0</code> となり、<code>Items</code> を省略することができます。<br>
           - `restriction_type`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `RestrictionType`<br>
            **説明**: 国別にコンテンツの配信を制限したい場合に使用する方法。 <ul> <li>  <code>none</code>: どの地域制限も有効ではなく、これはクライアントの地域によってコンテンツへのアクセスが制限されないことを意味します。 </li> <li>  <code>blacklist</code>: <code>Location</code> 要素では、CloudFront にコンテンツを配信してほしくない国を指定します。 </li> <li>  <code>whitelist</code>: <code>Location</code> 要素では、CloudFront にコンテンツを配信してほしい国を指定します。 </li> </ul>
   - `viewer_certificate`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `ViewerCertificate`<br>
    **説明**: ビューアと通信するためのディストリビューションの SSL/TLS の構成を決定する複合型。<br>
       - `acm_certificate_arn`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `ACMCertificateArn`<br>
        **説明**: ディストリビューションが <code>Aliases</code> (代替ドメイン名または CNAME) を使用し、SSL/TLS 証明書が<a href="https://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html">証明書マネージャ (ACM)</a> に格納されている場合、ACM 証明書の Amazon Resource Name (ARN) を提供します。CloudFront は、US East (N. Virginia) Region (<code>us-east-1</code>) の ACM 証明書のみをサポートしています。ACM 証明書の ARN を指定する場合、<code>MinimumProtocolVersion</code> と <code>SSLSupportMethod</code> の値も指定する必要があります。<br>
       - `certificate`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `Certificate`<br>
        **説明**: このフィールドは非推奨です。代わりに以下のフィールドのいずれかを使用してください。 <ul> <li>  <code>ACMCertificateArn</code>  </li> <li>  <code>IAMCertificateId</code>  </li> <li>  <code>CloudFrontDefaultCertificate</code>  </li> </ul>
       - `certificate_source`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `CertificateSource`<br>
        **説明**: このフィールドは非推奨です。代わりに以下のフィールドのいずれかを使用してください。 <ul> <li>  <code>ACMCertificateArn</code>  </li> <li>  <code>IAMCertificateId</code>  </li> <li>  <code>CloudFrontDefaultCertificate</code>  </li> </ul>
       - `cloud_front_default_certificate`<br>
        **タイプ**: `BOOLEAN`<br>
        **プロバイダー名**: `CloudFrontDefaultCertificate`<br>
        **説明**: ディストリビューションが <code>d111111abcdef8.cloudfront.net</code> のような CloudFront ドメイン名を使用する場合、このフィールドを <code>true</code> に設定します。ディストリビューションが <code>Aliases</code> (代替ドメイン名または CNAME) を使用する場合、このフィールドを <code>false</code> に設定し、以下のフィールドに値を指定します。 <ul> <li>  <code>ACMCertificateArn</code> または <code>IAMCertificateId</code> (片方を指定し、両方を指定しない) </li> <li>  <code>MinimumProtocolVersion</code>  </li> <li>  <code>SSLSupportMethod</code>  </li> </ul>
       - `iam_certificate_id`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `IAMCertificateId`<br>
        **説明**: ディストリビューションが <code>Aliases</code> (代替ドメイン名または CNAME) を使用し、SSL/TLS 証明書が<a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_server-certs.html">アイデンティティとアクセス管理 (IAM)</a> に保存されている場合、IAM 証明書の ID を指定します。IAM 証明書 ID を指定する場合、<code>MinimumProtocolVersion</code> と <code>SSLSupportMethod</code> の値も指定する必要があります。<br>
       - `minimum_protocol_version`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `MinimumProtocolVersion`<br>
        **説明**: ディストリビューションが <code>Aliases</code> (代替ドメイン名または CNAME) を使用している場合、ビューアとの HTTPS 接続に使用する CloudFront のセキュリティポリシーを指定します。セキュリティポリシーは、2 つの設定を決定します。 <ul> <li> CloudFront がビューアとの通信に使用できる最小限の SSL/TLS プロトコル。 </li> <li> CloudFront がビューアに返すコンテンツを暗号化するために使用できる暗号。 </li> </ul> 詳しくは、<i>Amazon CloudFront デベロッパーガイド</i>の<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-web-values-specify.html#DownloadDistValues-security-policy">セキュリティポリシー</a>と<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/secure-connections-supported-viewer-protocols-ciphers.html#secure-connections-supported-ciphers">ビューアと CloudFront 間のサポートされるプロトコルおよび暗号</a>を参照してください。 <note> CloudFront のコンソールでは、この設定を<b>セキュリティポリシー</b>と呼びます。 </note> SNI のみを使用している場合 (<code>SSLSupportMethod</code> を <code>sni-only</code> に設定)、<code>TLSv1</code> 以上を指定する必要があります。ディストリビューションで <code>d111111abcdef8.cloudfront.net</code> などの CloudFront ドメイン名を使用している場合 (<code>CloudFrontDefaultCertificate</code> を <code>true</code> に設定)、ここで設定した値に関わらず CloudFront は自動的にセキュリティポリシーを <code>TLSv1</code> に設定します。<br>
       - `ssl_support_method`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `SSLSupportMethod`<br>
        **説明**: ディストリビューションが <code>Aliases</code> (代替ドメイン名または CNAME) を使用している場合、ディストリビューションが HTTPS 接続を受け入れるビューアを指定します。 <ul> <li>  <code>sni-only</code> – ディストリビューションは、<a href="https://en.wikipedia.org/wiki/Server_Name_Indication">サーバー名表示 (SNI)</a> をサポートするビューアのみから HTTPS 接続を受け付けます。これは推奨されています。ほとんどのブラウザとクライアントが SNI をサポートしています。 </li> <li>  <code>vip</code> – ディストリビューションは、SNI をサポートしていないビューアを含むすべてのビューアからの HTTPS 接続を受け付けます。これは推奨されません。また、CloudFront から追加の月額料金が発生します。 </li> <li>  <code>static-ip</code> - CloudFront チームによってディストリビューションがこの機能に対して有効化されていない限り、この値を指定しないでください。ディストリビューションに静的 IP アドレスが必要なユースケースがある場合は、<a href="https://console.aws.amazon.com/support/home">Amazon Web Services サポートセンター</a>を通じて CloudFront に連絡してください。 </li> </ul> ディストリビューションが <code>d111111abcdef8.cloudfront.net</code> のような CloudFront ドメイン名を使用する場合、このフィールドに値を設定しないでください。<br>
   - `web_acl_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `WebACLId`<br>
    **説明**: このディストリビューションに関連付ける WAF Web ACL を指定する一意の識別子 (存在する場合)。最新バージョンの WAF を使用して作成された Web ACL を指定するには、ACL ARN を使用します。たとえば、<code>arn:aws:wafv2:us-east-1:123456789012:global/webacl/ExampleWebACL/473e64fd-f30b-4765-81a0-62ad96dd167a</code> です。WAF Classic で作成した Web ACL を指定する場合は、<code>473e64fd-f30b-4765-81a0-62ad96dd167a</code> のように、ACL ID を使用します。WAF は、CloudFront に転送される HTTP および HTTPS のリクエストを監視し、コンテンツへのアクセスを制御できる Web アプリケーションファイアウォールです。リクエストの発信元 IP アドレスやクエリ文字列の値など、指定したステータスに基づいて、CloudFront はリクエストされたコンテンツで応答するか、HTTP 403 ステータスコード (Forbidden) で応答するか、いずれかの方法でリクエストに応答します。また、リクエストがブロックされたときに、CloudFront がカスタムエラーページを返すように構成することもできます。WAF の詳細については、<a href="https://docs.aws.amazon.com/waf/latest/developerguide/what-is-aws-waf.html">WAF デベロッパーガイド</a>を参照してください。<br>
## `domain_name`
**タイプ**: `STRING`<br>
**プロバイダー名**: `DomainName`<br>
**説明**: ディストリビューションに対応するドメイン名。例えば、<code>d111111abcdef8.cloudfront.net</code> など。<br>
## `id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `Id`<br>
**説明**: ディストリビューションの識別子。例: <code>EDFDVBD632BHDS5</code>.<br>
## `in_progress_invalidation_batches`
**タイプ**: `INT32`<br>
**プロバイダー名**: `InProgressInvalidationBatches`<br>
**説明**: 現在進行中の無効化バッチの数。<br>
## `last_modified_time`
**タイプ**: `TIMESTAMP`<br>
**プロバイダー名**: `LastModifiedTime`<br>
**説明**: ディストリビューションが最後に修正された日時。<br>
## `status`
**タイプ**: `STRING`<br>
**Provider name**: `Status`<br>
**説明**: このレスポンス要素は、ディストリビューションの現在のステータスを示します。ステータスが <code>Deployed</code> の場合、ディストリビューションの情報は全ての CloudFront エッジロケーションに完全に伝搬されます。<br>
## `tags`
**タイプ**: `UNORDERED_LIST_STRING`<br>