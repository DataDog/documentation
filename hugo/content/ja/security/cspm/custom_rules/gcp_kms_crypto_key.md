---
dependencies: []
disable_edit: true
---
# gcp_kms_crypto_key

## `ancestors`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `create_time`
**タイプ**: `TIMESTAMP`<br>
**プロバイダー名**: `createTime`<br>
**説明**: 出力のみ。この CryptoKey が作成された時間。<br>
## `crypto_key_backend`
**タイプ**: `STRING`<br>
**プロバイダー名**: `cryptoKeyBackend`<br>
**説明**: 不変。この CryptoKey に関連するすべての CryptoKeyVersions のキー素材が存在し、関連するすべての暗号化演算が行われるバックエンド環境のリソース名。CryptoKeyVersions の ProtectionLevel が EXTERNAL_VPC で、リソース名が `projects/*/locations/*/ekmConnections/*` 形式の場合のみ適用可能です。このリストは非網羅的で、将来的に追加の ProtectionLevel に適用される可能性があることに注意してください。<br>
## `destroy_scheduled_duration`
**タイプ**: `STRING`<br>
**プロバイダー名**: `destroyScheduledDuration`<br>
**説明**: 不変。このキーのバージョンが DESTROY_SCHEDULED 状態から DESTROYED に遷移するまでの期間。作成時に指定しない場合、デフォルトの期間は 24 時間です。<br>
## `import_only`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `importOnly`<br>
**説明**: 不変。このキーがインポートされたバージョンのみを含むことができるかどうか。<br>
## `labels`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `name`
**タイプ**: `STRING`<br>
**プロバイダー名**: `name`<br>
**説明**: 出力のみ。`projects/*/locations/*/keyRings/*/cryptoKeys/*` のフォーマットでの、この CryptoKey のリソース名。<br>
## `next_rotation_time`
**タイプ**: `TIMESTAMP`<br>
**プロバイダー名**: `nextRotationTime`<br>
**説明**: next_rotation_time になると、キー管理サービスは自動的に 1. この CryptoKey の新しいバージョンを作成します。2. 新しいバージョンをプライマリーとしてマークします。CreateCryptoKeyVersion と UpdateCryptoKeyPrimaryVersion を使って手動で行ったキーローテーションは next_rotation_time に影響を与えません。目的 ENCRYPT_DECRYPT を持つキーは自動ローテーションをサポートします。それ以外のキーでは、このフィールドは省略しなければなりません。<br>
## `organization_id`
**タイプ**: `STRING`<br>
## `parent`
**タイプ**: `STRING`<br>
## `primary`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `primary`<br>
**説明**: 出力のみ。この CryptoKey が EncryptRequest.name に指定されたときに Encrypt が使用する "プライマリー" CryptoKeyVersion のコピー。CryptoKey のプライマリーバージョンは UpdateCryptoKeyPrimaryVersion によって更新することができます。目的 ENCRYPT_DECRYPT を持つキーはプライマリーを持つことができます。その他のキーでは、このフィールドは省略されます。<br>
   - `algorithm`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `algorithm`<br>
    **説明**: 出力のみ。この CryptoKeyVersion がサポートする CryptoKeyVersionAlgorithm。 <br>
    **可能な値**:<br>
      - `CRYPTO_KEY_VERSION_ALGORITHM_UNSPECIFIED` - 指定なし。<br>
      - `GOOGLE_SYMMETRIC_ENCRYPTION` - 対称型暗号キーを作成します。<br>
      - `RSA_SIGN_PSS_2048_SHA256` - RSASSA-PSS 2048 ビットキーと SHA256 ダイジェスト。<br>
      - `RSA_SIGN_PSS_3072_SHA256` - RSASSA-PSS 3072 ビットキーと SHA256 ダイジェスト。<br>
      - `RSA_SIGN_PSS_4096_SHA256` - RSASSA-PSS 4096 ビットキーと SHA256 ダイジェスト。<br>
      - `RSA_SIGN_PSS_4096_SHA512` - RSASSA-PSS 4096 ビットキーと SHA512 ダイジェスト。<br>
      - `RSA_SIGN_PKCS1_2048_SHA256` - RSASSA-PKCS1-v1_5 と 2048 ビットキーおよび SHA256 ダイジェスト。<br>
      - `RSA_SIGN_PKCS1_3072_SHA256` - RSASSA-PKCS1-v1_5 と 3072 ビットキーおよび SHA256 ダイジェスト。<br>
      - `RSA_SIGN_PKCS1_4096_SHA256` - RSASSA-PKCS1-v1_5 と 4096 ビットキーおよび SHA256 ダイジェスト。<br>
      - `RSA_SIGN_PKCS1_4096_SHA512` - RSASSA-PKCS1-v1_5 と 4096 ビットキーおよび SHA512 ダイジェスト。<br>
      - `RSA_SIGN_RAW_PKCS1_2048` - RSASSA-PKCS1-v1_5 による符号化なし、2048 ビットキーでの署名。<br>
      - `RSA_SIGN_RAW_PKCS1_3072` - RSASSA-PKCS1-v1_5 による符号化なし、3072 ビットキーでの署名。<br>
      - `RSA_SIGN_RAW_PKCS1_4096` - RSASSA-PKCS1-v1_5 による符号化なし、4096 ビットキーでの署名。<br>
      - `RSA_DECRYPT_OAEP_2048_SHA256` - RSAES-OAEP 2048 ビットキーと SHA256 ダイジェスト。<br>
      - `RSA_DECRYPT_OAEP_3072_SHA256` - RSAES-OAEP 3072 ビットキーと SHA256 ダイジェスト。<br>
      - `RSA_DECRYPT_OAEP_4096_SHA256` - RSAES-OAEP 4096 ビットキーと SHA256 ダイジェスト。<br>
      - `RSA_DECRYPT_OAEP_4096_SHA512` - RSAES-OAEP 4096 ビットキーと SHA512 ダイジェスト。<br>
      - `RSA_DECRYPT_OAEP_2048_SHA1` - RSAES-OAEP 2048 ビットキーと SHA1 ダイジェスト。<br>
      - `RSA_DECRYPT_OAEP_3072_SHA1` - RSAES-OAEP 3072 ビットキーと SHA1 ダイジェスト。<br>
      - `RSA_DECRYPT_OAEP_4096_SHA1` - RSAES-OAEP 4096 ビットキーと SHA1 ダイジェスト。<br>
      - `EC_SIGN_P256_SHA256` - NIST P-256 曲線上の ECDSA と SHA256 ダイジェスト。他のハッシュ関数も使用可能です: https://cloud.google.com/kms/docs/create-validate-signatures#ecdsa_support_for_other_hash_algorithms<br>
      - `EC_SIGN_P384_SHA384` - NIST P-384 曲線上の ECDSA と SHA384 ダイジェスト。他のハッシュ関数も使用可能です: https://cloud.google.com/kms/docs/create-validate-signatures#ecdsa_support_for_other_hash_algorithms<br>
      - `EC_SIGN_SECP256K1_SHA256` - 非 NIST の secp256k1 曲線上の ECDSA。この曲線は、HSM 保護レベルでのみサポートされています。他のハッシュ関数も使用可能です: https://cloud.google.com/kms/docs/create-validate-signatures#ecdsa_support_for_other_hash_algorithms<br>
      - `HMAC_SHA256` - 256 ビットキーによる HMAC-SHA256 署名。<br>
      - `HMAC_SHA1` - 160 ビットキーによる HMAC-SHA1 署名。<br>
      - `HMAC_SHA384` - 384 ビットキーによる HMAC-SHA384 署名。<br>
      - `HMAC_SHA512` - 512 ビットキーによる HMAC-SHA512 署名。<br>
      - `HMAC_SHA224` - 224 ビットキーによる HMAC-SHA224 署名。<br>
      - `EXTERNAL_SYMMETRIC_ENCRYPTION` - 外部キーマネージャーによる対称型暗号化を表すアルゴリズム。<br>
   - `attestation`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `attestation`<br>
     **説明**: 出力のみ。キーの作成時に HSM が生成し署名したステートメント。このステートメントを使用して、HSM に保存されているキーの属性を Google とは無関係に検証します。HSM が protection_level であるキーのバージョンにのみ提供されます。<br>
       - `cert_chains`<br>
        **タイプ**: `STRUCT`<br>
        **プロバイダー名**: `certChains`<br>
        **説明**: 出力のみ。認証の有効性を確認するために必要な証明書チェーン<br>
           - `cavium_certs`<br>
            **タイプ**: `UNORDERED_LIST_STRING`<br>
            **プロバイダー名**: `caviumCerts`<br>
            **説明**: 認証に対応する Cavium 証明書チェーン。<br>
           - `google_card_certs`<br>
            **タイプ**: `UNORDERED_LIST_STRING`<br>
            **プロバイダー名**: `googleCardCerts`<br>
            **説明**: 認証に対応する Google カード証明書チェーン。<br>
           - `google_partition_certs`<br>
            **タイプ**: `UNORDERED_LIST_STRING`<br>
            **プロバイダー名**: `googlePartitionCerts`<br>
            **説明**: 認証に対応する Google パーティション証明書チェーン。<br>
       - `format`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `format`<br>
        **説明**: 出力のみ。認証データのフォーマット。<br>
        **可能な値**:<br>
          - `ATTESTATION_FORMAT_UNSPECIFIED` - 指定なし。<br>
          - `CAVIUM_V1_COMPRESSED` - Cavium HSM 認証は、gzip で圧縮されています。このフォーマットは Cavium によって定義され、いつでも変更される可能性があることに注意してください。https://www.marvell.com/products/security-solutions/nitrox-hs-adapters/software-key-attestation.html を参照してください。<br>
          - `CAVIUM_V2_COMPRESSED` - Cavium HSM 認証 V2 は gzip で圧縮されています。これは Cavium のバージョン 3.2-08 で導入された新しいフォーマットです。<br>
   - `create_time`<br>
    **タイプ**: `TIMESTAMP`<br>
    **プロバイダー名**: `createTime`<br>
    **説明**: 出力のみ。この CryptoKeyVersion が作成された時間。<br>
   - `destroy_event_time`<br>
    **タイプ**: `TIMESTAMP`<br>
    **プロバイダー名**: `destroyEventTime`<br>
    **説明**: 出力のみ。この CryptoKeyVersion のキー素材が破棄された時間。状態が DESTROYED である場合のみ存在します。<br>
   - `destroy_time`<br>
    **タイプ**: `TIMESTAMP`<br>
    **プロバイダー名**: `destroyTime`<br>
    **説明**: 出力のみ。この CryptoKeyVersion のキー素材が破棄される予定の時間。状態が DESTROY_SCHEDULED である場合のみ存在します。<br>
   - `external_destruction_failure_reason`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `externalDestructionFailureReason`<br>
    **説明**: 出力のみ。直近の外部破壊失敗の根本原因。状態が EXTERNAL_DESTRUCTION_FAILED である場合のみ表示されます。<br>
   - `external_protection_level_options`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `externalProtectionLevelOptions`<br>
    **説明**: ExternalProtectionLevelOptions には、EXTERNAL 保護レベルと EXTERNAL_VPC 保護レベルに固有の CryptoKeyVersion を構成するための追加フィールドのグループが格納されています。<br>
       - `ekm_connection_key_path`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `ekmConnectionKeyPath`<br>
        **説明**: EkmConnection を使用する場合に、EKM 上の外部キー素材へのパス、例えば "v0/my/key" です。EkmConnection を使用する場合、external_key_uri の代わりにこのフィールドを設定します。<br>
       - `external_key_uri`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `externalKeyUri`<br>
        **説明**: この CryptoKeyVersion が表す外部リソースの URI。<br>
   - `generate_time`<br>
    **タイプ**: `TIMESTAMP`<br>
    **プロバイダー名**: `generateTime`<br>
    **説明**: 出力のみ。この CryptoKeyVersion のキー素材が生成された時間。<br>
   - `generation_failure_reason`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `generationFailureReason`<br>
    **説明**: 出力のみ。直近の生成失敗の根本原因。状態が GENERATION_FAILED である場合のみ表示されます。<br>
   - `import_failure_reason`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `importFailureReason`<br>
    **説明**: 出力のみ。直近のインポート失敗の根本原因。状態が IMPORT_FAILED である場合のみ表示されます。<br>
   - `import_job`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `importJob`<br>
    **説明**: 出力のみ。この CryptoKeyVersion の直近のインポートで使用された ImportJob の名前。基礎となるキー素材がインポートされた場合のみ表示されます。<br>
   - `import_time`<br>
    **タイプ**: `TIMESTAMP`<br>
    **プロバイダー名**: `importTime`<br>
    **説明**: 出力のみ。この CryptoKeyVersion のキー素材が最も最近インポートされた時間。<br>
   - `name`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `name`<br>
    **説明**: 出力のみ。この CryptoKeyVersion のリソース名で、フォーマットは `projects/*/locations/*/keyRings/*/cryptoKeys/*/cryptoKeyVersions/*` です。<br>
   - `protection_level`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `protectionLevel`<br>
    **説明**: 出力のみ。この CryptoKeyVersion でどのように暗号化演算を行うかを記述した ProtectionLevel。<br>
    **可能な値**:<br>
      - `PROTECTION_LEVEL_UNSPECIFIED` - 指定なし。<br>
      - `SOFTWARE` - 暗号演算子はソフトウェアで実行されます。<br>
      - `HSM` - 暗号演算子は、ハードウェアセキュリティモジュールで実行されます。<br>
      - `EXTERNAL` - 暗号演算子は外部キーマネージャーで実行されます。<br>
      - `EXTERNAL_VPC` - 暗号演算子は EKM-over-VPC バックエンドで実行されます。<br>
   - `reimport_eligible`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `reimportEligible`<br>
    **説明**: 出力のみ。ImportCryptoKeyVersionRequest.crypto_key_version でターゲットとして指定された、このキーバージョンが再インポート可能であるかどうか。<br>
   - `state`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `state`<br>
    **説明**: The current state of the CryptoKeyVersion. <br>
    **可能な値**:<br>
      - `CRYPTO_KEY_VERSION_STATE_UNSPECIFIED` - 指定なし。<br>
      - `PENDING_GENERATION` - このバージョンはまだ生成中です。まだ使用、有効化、無効化、破棄することはできません。Cloud KMS は、バージョンの準備ができ次第、このバージョンを自動的に ENABLED にします。<br>
      - `ENABLED` - このバージョンは、暗号演算子として使用することができます。<br>
      - `DISABLED` - このバージョンは使用されないかもしれませんが、キーとなる素材はまだ利用可能で、バージョンを ENABLED 状態に戻すことができます。<br>
      - `DESTROYED` - このバージョンは破棄され、キー素材はもはや保存されません。このバージョンが reimport_eligible で、かつ KeyManagementService.ImportCryptoKeyVersion をコールしてオリジナルのキー素材を再インポートした場合のみ、再び ENABLED となることができます。<br>
      - `DESTROY_SCHEDULED` - このバージョンは破棄される予定で、まもなく破棄されます。RestoreCryptoKeyVersion をコールして、DISABLED 状態に戻してください。<br>
      - `PENDING_IMPORT` - このバージョンはまだインポート中です。まだ使用、有効化、無効化、破棄することはできません。Cloud KMS は、バージョンの準備ができ次第、このバージョンを自動的に ENABLED にします。<br>
      - `IMPORT_FAILED` - このバージョンは正常にインポートされませんでした。使用、有効化、無効化、または破棄することはできません。送信されたキー素材は破棄されました。その他の詳細は CryptoKeyVersion.import_failure_reason に記載されています。<br>
      - `GENERATION_FAILED` - このバージョンは正常に生成されませんでした。使用、有効化、無効化、または破棄することはできません。その他の詳細は CryptoKeyVersion.generation_failure_reason に記載されています。<br>
      - `PENDING_EXTERNAL_DESTRUCTION` - このバージョンは破壊されたので、再び使用したり有効にしたりすることはできません。Cloud KMS は、外部キーマネージャーに存在する対応するキー素材が破壊されるのを待ちます。<br>
      - `EXTERNAL_DESTRUCTION_FAILED` - このバージョンは破壊されたので、再び使用したり有効にしたりすることはできません。しかし、Cloud KMS は、外部キーマネージャーに存在する対応するキー素材が破壊されたことを確認できませんでした。その他の詳細は、CryptoKeyVersion.external_destruction_failure_reason に記載されています。<br>
## `project_id`
**タイプ**: `STRING`<br>
## `project_number`
**タイプ**: `STRING`<br>
## `purpose`
**タイプ**: `STRING`<br>
**プロバイダー名**: `purpose`<br>
**説明**: 不変。この CryptoKey の不変の目的。<br>
**可能な値**:<br>
  - `CRYPTO_KEY_PURPOSE_UNSPECIFIED` - 指定なし。<br>
  - `ENCRYPT_DECRYPT` - この目的のための暗号キーは Encrypt と Decrypt で使用することができます。<br>
  - `ASYMMETRIC_SIGN` - この目的のための暗号キーは AsymmetricSign と GetPublicKey で使用することができます。<br>
  - `ASYMMETRIC_DECRYPT` - この目的のための暗号キーは AsymmetricDecrypt と GetPublicKey で使用することができます。<br>
  - `MAC` - この目的のための暗号キーは MacSign で使用することができます。<br>
## `resource_name`
**タイプ**: `STRING`<br>
## `rotation_period`
**タイプ**: `STRING`<br>
**プロバイダー名**: `rotationPeriod`<br>
**説明**: サービスが自動的にキーをローテーションするとき、next_rotation_time はこの時間だけ進められます。最低でも 24 時間、最大でも 876,000 時間でなければなりません。rotation_period が設定されている場合、next_rotation_time も設定する必要があります。目的 ENCRYPT_DECRYPT を持つキーは自動ローテーションをサポートします。それ以外のキーでは、このフィールドは省略しなければなりません。<br>
## `tags`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `version_template`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `versionTemplate`<br>
**説明**: 新しい CryptoKeyVersion インスタンスの設定を記述したテンプレート。CreateCryptoKeyVersion または自動ローテーションによって作成される新しい CryptoKeyVersion インスタンスのプロパティは、このテンプレートによって制御されます。<br>
   - `algorithm`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `algorithm`<br>
    **説明**: 必須。このテンプレートに基づく CryptoKeyVersion を作成するときに使用するアルゴリズム。後方互換性のため、このフィールドが省略され、かつ CryptoKey.purpose が ENCRYPT_DECRYPT の場合、GOOGLE_SYMMETRIC_ENCRYPTION が暗黙のうちに使用されます。 <br>
    **可能な値**:<br>
      - `CRYPTO_KEY_VERSION_ALGORITHM_UNSPECIFIED` - 指定なし。<br>
      - `GOOGLE_SYMMETRIC_ENCRYPTION` - 対称型暗号キーを作成します。<br>
      - `RSA_SIGN_PSS_2048_SHA256` - RSASSA-PSS 2048 ビットキーと SHA256 ダイジェスト。<br>
      - `RSA_SIGN_PSS_3072_SHA256` - RSASSA-PSS 3072 ビットキーと SHA256 ダイジェスト。<br>
      - `RSA_SIGN_PSS_4096_SHA256` - RSASSA-PSS 4096 ビットキーと SHA256 ダイジェスト。<br>
      - `RSA_SIGN_PSS_4096_SHA512` - RSASSA-PSS 4096 ビットキーと SHA512 ダイジェスト。<br>
      - `RSA_SIGN_PKCS1_2048_SHA256` - RSASSA-PKCS1-v1_5 と 2048 ビットキーおよび SHA256 ダイジェスト。<br>
      - `RSA_SIGN_PKCS1_3072_SHA256` - RSASSA-PKCS1-v1_5 と 3072 ビットキーおよび SHA256 ダイジェスト。<br>
      - `RSA_SIGN_PKCS1_4096_SHA256` - RSASSA-PKCS1-v1_5 と 4096 ビットキーおよび SHA256 ダイジェスト。<br>
      - `RSA_SIGN_PKCS1_4096_SHA512` - RSASSA-PKCS1-v1_5 と 4096 ビットキーおよび SHA512 ダイジェスト。<br>
      - `RSA_SIGN_RAW_PKCS1_2048` - RSASSA-PKCS1-v1_5 による符号化なし、2048 ビットキーでの署名。<br>
      - `RSA_SIGN_RAW_PKCS1_3072` - RSASSA-PKCS1-v1_5 による符号化なし、3072 ビットキーでの署名。<br>
      - `RSA_SIGN_RAW_PKCS1_4096` - RSASSA-PKCS1-v1_5 による符号化なし、4096 ビットキーでの署名。<br>
      - `RSA_DECRYPT_OAEP_2048_SHA256` - RSAES-OAEP 2048 ビットキーと SHA256 ダイジェスト。<br>
      - `RSA_DECRYPT_OAEP_3072_SHA256` - RSAES-OAEP 3072 ビットキーと SHA256 ダイジェスト。<br>
      - `RSA_DECRYPT_OAEP_4096_SHA256` - RSAES-OAEP 4096 ビットキーと SHA256 ダイジェスト。<br>
      - `RSA_DECRYPT_OAEP_4096_SHA512` - RSAES-OAEP 4096 ビットキーと SHA512 ダイジェスト。<br>
      - `RSA_DECRYPT_OAEP_2048_SHA1` - RSAES-OAEP 2048 ビットキーと SHA1 ダイジェスト。<br>
      - `RSA_DECRYPT_OAEP_3072_SHA1` - RSAES-OAEP 3072 ビットキーと SHA1 ダイジェスト。<br>
      - `RSA_DECRYPT_OAEP_4096_SHA1` - RSAES-OAEP 4096 ビットキーと SHA1 ダイジェスト。<br>
      - `EC_SIGN_P256_SHA256` - NIST P-256 カーブ上の ECDSA と SHA256 ダイジェスト。他のハッシュ関数も使用可能です: https://cloud.google.com/kms/docs/create-validate-signatures#ecdsa_support_for_other_hash_algorithms<br>
      - `EC_SIGN_P384_SHA384` - NIST P-384 カーブ上の ECDSA と SHA384 ダイジェスト。他のハッシュ関数も使用可能です: https://cloud.google.com/kms/docs/create-validate-signatures#ecdsa_support_for_other_hash_algorithms<br>
      - `EC_SIGN_SECP256K1_SHA256` - 非 NIST の secp256k1 曲線上の ECDSA。この曲線は、HSM 保護レベルでのみサポートされています。他のハッシュ関数も使用可能です: https://cloud.google.com/kms/docs/create-validate-signatures#ecdsa_support_for_other_hash_algorithms<br>
      - `HMAC_SHA256` - 256 ビットキーによる HMAC-SHA256 署名。<br>
      - `HMAC_SHA1` - 160 ビットキーによる HMAC-SHA1 署名。<br>
      - `HMAC_SHA384` - 384 ビットキーによる HMAC-SHA384 署名。<br>
      - `HMAC_SHA512` - 512 ビットキーによる HMAC-SHA512 署名。<br>
      - `HMAC_SHA224` - 224 ビットキーによる HMAC-SHA224 署名。<br>
      - `EXTERNAL_SYMMETRIC_ENCRYPTION` - 外部キーマネージャーによる対称型暗号化を表すアルゴリズム。<br>
   - `protection_level`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `protectionLevel`<br>
    **説明**: このテンプレートに基づいた CryptoKeyVersion を作成する際に使用する ProtectionLevel。不変。デフォルトは SOFTWARE です。 <br>
    **可能な値**:<br>
      - `PROTECTION_LEVEL_UNSPECIFIED` - 指定なし。<br>
      - `SOFTWARE` - 暗号演算子はソフトウェアで実行されます。<br>
      - `HSM` - 暗号演算子は、ハードウェアセキュリティモジュールで実行されます。<br>
      - `EXTERNAL` - 暗号演算子は外部キーマネージャーで実行されます。<br>
      - `EXTERNAL_VPC` - 暗号演算子は EKM-over-VPC バックエンドで実行されます。<br>