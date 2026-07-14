---
dependencies: []
disable_edit: true
---
# aws_acm

## `account_id`
**タイプ**: `STRING`<br>
## `certificate_arn`
**タイプ**: `STRING`<br>
**プロバイダー名**: `CertificateArn`<br>
**説明**: 証明書の Amazon Resource Name (ARN)。ARN の詳細については、<i>Amazon Web Services 一般リファレンス</i>の <a href="https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html">Amazon Resource Name (ARN)</a> を参照してください。<br>
## `certificate_authority_arn`
**タイプ**: `STRING`<br>
**プロバイダー名**: `CertificateAuthorityArn`<br>
**説明**: 証明書を発行したプライベート認証局 (CA) の Amazon Resource Name (ARN)。これは次のような形式です。   <code>arn:aws:acm-pca:region:account:certificate-authority/12345678-1234-1234-1234-123456789012</code><br>
## `created_at`
**タイプ**: `TIMESTAMP`<br>
**プロバイダー名**: `CreatedAt`<br>
**説明**: 証明書がリクエストされた時刻。<br>
## `domain_name`
**タイプ**: `STRING`<br>
**プロバイダー名**: `DomainName`<br>
**説明**: 証明書の完全修飾ドメイン名。www.example.com や example.com など。<br>
## `domain_validation_options`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**プロバイダー名**: `DomainValidationOptions`<br>
**説明**: RequestCertificate リクエストの結果として発生する、各ドメイン名の初期検証に関する情報をコンテナで保持します。このフィールドは、証明書タイプが <code>AMAZON_ISSUED</code> の場合のみ存在します。<br>
   - `domain_name`<br>
    **タイプ**: `STRING`<br>
    **Provider name**: `DomainName`<br>
    **説明**: 証明書に記載されている完全修飾ドメイン名 (FQDN)。例: <code>www.example.com</code> または <code>example.com</code><br>
   - `resource_record`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `ResourceRecord`<br>
    **説明**: ドメイン検証のために DNS データベースに追加する CNAME レコードをコンテナで格納します。詳細については、<a href="https://docs.aws.amazon.com/acm/latest/userguide/gs-acm-validate-dns.html">DNS を使用してドメインの所有権を検証する</a>を参照してください。注: 必要な CNAME 情報には、ドメイン名は含まれません。DNS データベースの CNAME レコードにドメイン名を含む場合、検証は失敗します。例えば、「_a79865eb4cd1a6ab990a45779b4e0b96.yourdomain.com」という名前の場合、「_a79865eb4cd1a6ab990a45779b4e0b96」だけを使用する必要があります。<br>
       - `name`<br>
        **タイプ**: `STRING`<br>
        **Provider name**: `Name`<br>
        **説明**: ドメインに作成する DNS レコードの名前。これは ACM から提供されます。<br>
       - `type`<br>
        **タイプ**: `STRING`<br>
        **Provider name**: `Type`<br>
        **説明**: DNS レコードの種類。現在、これは <code>CNAME</code> にすることができます。<br>
       - `value`<br>
        **タイプ**: `STRING`<br>
        **Provider name**: `Value`<br>
        **説明**: DNS データベースに追加する CNAME レコードの値。これは ACM から提供されます。<br>
   - `validation_domain`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `ValidationDomain`<br>
    **説明**: ACM がドメイン検証メールを送信するために使用したドメイン名。<br>
   - `validation_emails`<br>
    **タイプ**: `UNORDERED_LIST_STRING`<br>
    **プロバイダー名**: `ValidationEmails`<br>
    **説明**: ACM がドメイン認証メールを送信するために使用したメールアドレスのリスト。<br>
   - `validation_method`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `ValidationMethod`<br>
    **説明**: ドメイン認証の方法を指定します。<br>
   - `validation_status`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `ValidationStatus`<br>
    **説明**: ドメイン名の検証ステータス。これは以下の値のいずれかとなります。 <ul> <li>  <code>PENDING_VALIDATION</code>  </li> <li>  <code>SUCCESS</code> </li> <li>  <code>FAILED</code> </li> </ul>
## `extended_key_usages`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**プロバイダー名**: `ExtendedKeyUsages`<br>
**説明**: Extended Key Usage X.509 v3 拡張機能オブジェクトのリストが含まれます。各オブジェクトは、証明書公開キーの使用目的を指定し、名前とオブジェクト識別子 (OID) で構成されます。<br>
   - `name`<br>
    **タイプ**: `STRING`<br>
    **Provider name**: `Name`<br>
    **説明**: Extended Key Usage の値の名前。<br>
   - `oid`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `OID`<br>
    **説明**: 拡張機能の値のオブジェクト識別子 (OID)。OID はピリオドで区切られた数字の文字列です。RFC 3280 および RFC 5280 では、以下の OID が定義されています。  <ul> <li>  <code>1.3.6.1.5.5.7.3.1 (TLS_WEB_SERVER_AUTHENTICATION)</code>  </li> <li>  <code>1.3.6.1.5.5.7.3.2 (TLS_WEB_CLIENT_AUTHENTICATION)</code>  </li> <li>  <code>1.3.6.1.5.5.7.3.3 (CODE_SIGNING)</code>  </li> <li>  <code>1.3.6.1.5.5.7.3.4 (EMAIL_PROTECTION)</code>  </li> <li>  <code>1.3.6.1.5.5.7.3.8 (TIME_STAMPING)</code>  </li> <li>  <code>1.3.6.1.5.5.7.3.9 (OCSP_SIGNING)</code>  </li> <li>  <code>1.3.6.1.5.5.7.3.5 (IPSEC_END_SYSTEM)</code>  </li> <li>  <code>1.3.6.1.5.5.7.3.6 (IPSEC_TUNNEL)</code>  </li> <li>  <code>1.3.6.1.5.5.7.3.7 (IPSEC_USER)</code>  </li> </ul>
## `failure_reason`
**タイプ**: `STRING`<br>
**プロバイダー名**: `FailureReason`<br>
**説明**: 証明書リクエストが失敗した理由。この値は、証明書のステータスが <code>FAILED</code> の場合のみ存在します。詳細については、<i>証明書マネージャーユーザーガイド</i>の<a href="https://docs.aws.amazon.com/acm/latest/userguide/troubleshooting.html#troubleshooting-failed">証明書リクエストの失敗</a>を参照してください。<br>
## `imported_at`
**タイプ**: `TIMESTAMP`<br>
**プロバイダー名**: `ImportedAt`<br>
**説明**: 証明書がインポートされた日時。この値は、証明書タイプが <code>IMPORTED</code> の場合のみ存在します。<br>
## `in_use_by`
**タイプ**: `UNORDERED_LIST_STRING`<br>
**プロバイダー名**: `InUseBy`<br>
**説明**: 証明書を使用する Amazon Web Services リソースの ARN のリスト。1 つの証明書を複数の Amazon Web Services リソースで使用することができます。<br>
## `issued_at`
**タイプ**: `TIMESTAMP`<br>
**プロバイダー名**: `IssuedAt`<br>
**説明**: 証明書が発行された時間。この値は、証明書のタイプが <code>AMAZON_ISSUED</code> の場合のみ存在します。<br>
## `issuer`
**タイプ**: `STRING`<br>
**プロバイダー名**: `Issuer`<br>
**説明**: 証明書を発行し、署名した認証局の名前。<br>
## `key_algorithm`
**タイプ**: `STRING`<br>
**プロバイダー名**: `KeyAlgorithm`<br>
**説明**: 公開キーとプライベートキーのペアを生成するために使用されたアルゴリズム。<br>
## `key_usages`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**プロバイダー名**: `KeyUsages`<br>
**説明**: Key Usage X.509 v3 拡張機能のオブジェクトのリスト。各オブジェクトは、証明書に含まれる公開キーの目的を特定するための文字列値です。使用可能な拡張機能の値には、<code>DIGITAL_SIGNATURE</code>、<code>KEY_ENCIPHERMENT</code>、<code>NON_REPUDIATION</code> などがあります。<br>
   - `name`<br>
    **タイプ**: `STRING`<br>
    **Provider name**: `Name`<br>
    **説明**: Key Usage 拡張機能名を含む文字列値。<br>
## `not_after`
**タイプ**: `TIMESTAMP`<br>
**プロバイダー名**: `NotAfter`<br>
**説明**: この時間より後は証明書は無効になります。<br>
## `not_before`
**タイプ**: `TIMESTAMP`<br>
**プロバイダー名**: `NotBefore`<br>
**説明**: この時間より前は証明書は無効になります。<br>
## `options`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `Options`<br>
**説明**: 証明書を透明化ログに追加するかどうかを指定する値。証明書の透明性を確保することで、誤って発行された SSL 証明書や悪意のある SSL 証明書を検出することが可能になります。ブラウザは、ログに記録されていない証明書に対して、エラーメッセージを表示することで対応することがあります。ログは暗号化された安全なものです。<br>
   - `certificate_transparency_logging_preference`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `CertificateTransparencyLoggingPreference`<br>
    **説明**: <code>DISABLED</code> オプションを指定することで、証明書の透過性ロギングをオプトアウトすることができます。<code>ENABLED</code> を指定することでオプトインできます。<br>
## `renewal_eligibility`
**タイプ**: `STRING`<br>
**プロバイダー名**: `RenewalEligibility`<br>
**説明**: 証明書が更新の対象であるかどうかを指定します。現在、RenewCertificate コマンドで更新できるのは、エクスポートしたプライベート証明書のみです。<br>
## `renewal_summary`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `RenewalSummary`<br>
**説明**: 証明書の ACM の<a href="https://docs.aws.amazon.com/acm/latest/userguide/acm-renewal.html">マネージドリニューアル</a>のステータスに関する情報が含まれます。このフィールドは、証明書タイプが <code>AMAZON_ISSUED</code> の場合のみ存在します。<br>
   - `domain_validation_options`<br>
    **タイプ**: `UNORDERED_LIST_STRUCT`<br>
    **プロバイダー名**: `DomainValidationOptions`<br>
    **説明**: ACM の<a href="https://docs.aws.amazon.com/acm/latest/userguide/acm-renewal.html">マネージドリニューアル</a>に関連する、証明書内の各ドメイン名の検証に関する情報が含まれます。これは、RequestCertificate リクエストの結果として発生する最初の検証とは異なります。このフィールドは、証明書のタイプが <code>AMAZON_ISSUED</code> の場合のみ存在します。<br>
       - `domain_name`<br>
        **タイプ**: `STRING`<br>
        **Provider name**: `DomainName`<br>
        **説明**: 証明書に記載されている完全修飾ドメイン名 (FQDN)。例: <code>www.example.com</code> または <code>example.com</code><br>
       - `resource_record`<br>
        **タイプ**: `STRUCT`<br>
        **プロバイダー名**: `ResourceRecord`<br>
        **説明**: ドメイン検証のために DNS データベースに追加する CNAME レコードをコンテナで格納します。詳細については、<a href="https://docs.aws.amazon.com/acm/latest/userguide/gs-acm-validate-dns.html">DNS を使用してドメインの所有権を検証する</a>を参照してください。注: 必要な CNAME 情報には、ドメイン名は含まれません。DNS データベースの CNAME レコードにドメイン名を含む場合、検証は失敗します。例えば、「_a79865eb4cd1a6ab990a45779b4e0b96.yourdomain.com」という名前の場合、「_a79865eb4cd1a6ab990a45779b4e0b96」だけを使用する必要があります。<br>
           - `name`<br>
            **タイプ**: `STRING`<br>
            **Provider name**: `Name`<br>
            **説明**: ドメインに作成する DNS レコードの名前。これは ACM から提供されます。<br>
           - `type`<br>
            **タイプ**: `STRING`<br>
            **Provider name**: `Type`<br>
            **説明**: DNS レコードの種類。現在、これは <code>CNAME</code> にすることができます。<br>
           - `value`<br>
            **タイプ**: `STRING`<br>
            **Provider name**: `Value`<br>
            **説明**: DNS データベースに追加する CNAME レコードの値。これは ACM から提供されます。<br>
       - `validation_domain`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `ValidationDomain`<br>
        **説明**: ACM がドメイン検証メールを送信するために使用したドメイン名。<br>
       - `validation_emails`<br>
        **タイプ**: `UNORDERED_LIST_STRING`<br>
        **プロバイダー名**: `ValidationEmails`<br>
        **説明**: ACM がドメイン認証メールを送信するために使用したメールアドレスのリスト。<br>
       - `validation_method`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `ValidationMethod`<br>
        **説明**: ドメイン認証の方法を指定します。<br>
       - `validation_status`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `ValidationStatus`<br>
        **説明**: ドメイン名の検証ステータス。これは以下の値のいずれかとなります。 <ul> <li>  <code>PENDING_VALIDATION</code>  </li> <li>  <code>SUCCESS</code> </li> <li>  <code>FAILED</code> </li> </ul>
   - `renewal_status`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `RenewalStatus`<br>
    **説明**: 証明書の ACM の<a href="https://docs.aws.amazon.com/acm/latest/userguide/acm-renewal.html">マネージドリニューアル</a>のステータス。<br>
   - `renewal_status_reason`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `RenewalStatusReason`<br>
    **説明**: 更新リクエストに失敗した理由。<br>
   - `updated_at`<br>
    **タイプ**: `TIMESTAMP`<br>
    **プロバイダー名**: `UpdatedAt`<br>
    **説明**: 更新のサマリーが最後に更新された時刻。<br>
## `revocation_reason`
**タイプ**: `STRING`<br>
**プロバイダー名**: `RevocationReason`<br>
**説明**: 証明書が無効にされた理由。この値は、証明書のステータスが <code>REVOKED</code> のときのみ存在します。<br>
## `revoked_at`
**タイプ**: `TIMESTAMP`<br>
**プロバイダー名**: `RevokedAt`<br>
**説明**: 証明書が無効にされた時刻。この値は、証明書のステータスが <code>REVOKED</code> のときのみ存在します。<br>
## `serial`
**タイプ**: `STRING`<br>
**プロバイダー名**: `Serial`<br>
**説明**: 証明書のシリアル番号。<br>
## `signature_algorithm`
**タイプ**: `STRING`<br>
**プロバイダー名**: `SignatureAlgorithm`<br>
**説明**: 証明書に署名するために使用されたアルゴリズム。<br>
## `status`
**タイプ**: `STRING`<br>
**Provider name**: `Status`<br>
**説明**: 証明書のステータス。証明書は、トラブルシューティングトピック<a href="https://docs.aws.amazon.com/acm/latest/userguide/troubleshooting-failed.html">証明書のリクエストに失敗しました</a>で説明されている理由で失敗しない限り、リクエストされると PENDING_VALIDATION のステータスになります。ACM は証明書の検証を 72 時間繰り返し試行し、その後タイムアウトします。証明書のステータスが FAILED または VALIDATION_TIMED_OUT の場合、リクエストを削除し、<a href="https://docs.aws.amazon.com/acm/latest/userguide/dns-validation.html">DNS 検証</a>または<a href="https://docs.aws.amazon.com/acm/latest/userguide/email-validation.html">メール検証</a>で問題を修正し、再度試行します。検証に成功すると、証明書はステータス ISSUED になります。<br>
## `subject`
**タイプ**: `STRING`<br>
**プロバイダー名**: `Subject`<br>
**説明**: 証明書に含まれる公開キーに関連するエンティティの名前。<br>
## `subject_alternative_names`
**タイプ**: `UNORDERED_LIST_STRING`<br>
**プロバイダー名**: `SubjectAlternativeNames`<br>
**説明**: 証明書に含まれる 1 つまたは複数のドメイン名 (サブジェクト代替名)。このリストには、証明書に含まれる公開キーにバインドされているドメイン名が含まれます。サブジェクト代替名には、証明書の正規ドメイン名 (CN) と、Web サイトへの接続に使用できる追加のドメイン名が含まれます。<br>
## `tags`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `type`
**タイプ**: `STRING`<br>
**Provider name**: `Type`<br>
**説明**: 証明書の発行元。ACM から提供された証明書の場合、この値は <code>AMAZON_ISSUED</code> となります。ImportCertificate を使用してインポートした証明書の場合、この値は <code>IMPORTED</code> です。ACM はインポートした証明書の<a href="https://docs.aws.amazon.com/acm/latest/userguide/acm-renewal.html">マネージドリニューアル</a>を提供しません。インポートする証明書と ACM が提供する証明書の違いの詳細については、<i>証明書マネージャーユーザーガイド</i>の<a href="https://docs.aws.amazon.com/acm/latest/userguide/import-certificate.html">証明書のインポート</a>を参照してください。<br>