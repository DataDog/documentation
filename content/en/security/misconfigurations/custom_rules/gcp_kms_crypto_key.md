---
dependencies: []
disable_edit: true
---
# gcp_kms_crypto_key

## `ancestors`
**Type**: `UNORDERED_LIST_STRING`<br>
## `create_time`
**Type**: `TIMESTAMP`<br>
**Provider name**: `createTime`<br>
**Description**: Output only. The time at which this CryptoKey was created.<br>
## `crypto_key_backend`
**Type**: `STRING`<br>
**Provider name**: `cryptoKeyBackend`<br>
**Description**: Immutable. The resource name of the backend environment where the key material for all CryptoKeyVersions associated with this CryptoKey reside and where all related cryptographic operations are performed. Only applicable if CryptoKeyVersions have a ProtectionLevel of EXTERNAL_VPC, with the resource name in the format `projects/*/locations/*/ekmConnections/*`. Note, this list is non-exhaustive and may apply to additional ProtectionLevels in the future.<br>
## `destroy_scheduled_duration`
**Type**: `STRING`<br>
**Provider name**: `destroyScheduledDuration`<br>
**Description**: Immutable. The period of time that versions of this key spend in the DESTROY_SCHEDULED state before transitioning to DESTROYED. If not specified at creation time, the default duration is 24 hours.<br>
## `import_only`
**Type**: `BOOLEAN`<br>
**Provider name**: `importOnly`<br>
**Description**: Immutable. Whether this key may contain imported versions only.<br>
## `labels`
**Type**: `UNORDERED_LIST_STRING`<br>
## `name`
**Type**: `STRING`<br>
**Provider name**: `name`<br>
**Description**: Output only. The resource name for this CryptoKey in the format `projects/*/locations/*/keyRings/*/cryptoKeys/*`.<br>
## `next_rotation_time`
**Type**: `TIMESTAMP`<br>
**Provider name**: `nextRotationTime`<br>
**Description**: At next_rotation_time, the Key Management Service will automatically: 1. Create a new version of this CryptoKey. 2. Mark the new version as primary. Key rotations performed manually via CreateCryptoKeyVersion and UpdateCryptoKeyPrimaryVersion do not affect next_rotation_time. Keys with purpose ENCRYPT_DECRYPT support automatic rotation. For other keys, this field must be omitted.<br>
## `organization_id`
**Type**: `STRING`<br>
## `parent`
**Type**: `STRING`<br>
## `primary`
**Type**: `STRUCT`<br>
**Provider name**: `primary`<br>
**Description**: Output only. A copy of the "primary" CryptoKeyVersion that will be used by Encrypt when this CryptoKey is given in EncryptRequest.name. The CryptoKey's primary version can be updated via UpdateCryptoKeyPrimaryVersion. Keys with purpose ENCRYPT_DECRYPT may have a primary. For other keys, this field will be omitted.<br>
   - `algorithm`<br>
    **Type**: `STRING`<br>
    **Provider name**: `algorithm`<br>
    **Description**: Output only. The CryptoKeyVersionAlgorithm that this CryptoKeyVersion supports. <br>
    **Possible values**:<br>
      - `CRYPTO_KEY_VERSION_ALGORITHM_UNSPECIFIED` - Not specified.<br>
      - `GOOGLE_SYMMETRIC_ENCRYPTION` - Creates symmetric encryption keys.<br>
      - `RSA_SIGN_PSS_2048_SHA256` - RSASSA-PSS 2048 bit key with a SHA256 digest.<br>
      - `RSA_SIGN_PSS_3072_SHA256` - RSASSA-PSS 3072 bit key with a SHA256 digest.<br>
      - `RSA_SIGN_PSS_4096_SHA256` - RSASSA-PSS 4096 bit key with a SHA256 digest.<br>
      - `RSA_SIGN_PSS_4096_SHA512` - RSASSA-PSS 4096 bit key with a SHA512 digest.<br>
      - `RSA_SIGN_PKCS1_2048_SHA256` - RSASSA-PKCS1-v1_5 with a 2048 bit key and a SHA256 digest.<br>
      - `RSA_SIGN_PKCS1_3072_SHA256` - RSASSA-PKCS1-v1_5 with a 3072 bit key and a SHA256 digest.<br>
      - `RSA_SIGN_PKCS1_4096_SHA256` - RSASSA-PKCS1-v1_5 with a 4096 bit key and a SHA256 digest.<br>
      - `RSA_SIGN_PKCS1_4096_SHA512` - RSASSA-PKCS1-v1_5 with a 4096 bit key and a SHA512 digest.<br>
      - `RSA_SIGN_RAW_PKCS1_2048` - RSASSA-PKCS1-v1_5 signing without encoding, with a 2048 bit key.<br>
      - `RSA_SIGN_RAW_PKCS1_3072` - RSASSA-PKCS1-v1_5 signing without encoding, with a 3072 bit key.<br>
      - `RSA_SIGN_RAW_PKCS1_4096` - RSASSA-PKCS1-v1_5 signing without encoding, with a 4096 bit key.<br>
      - `RSA_DECRYPT_OAEP_2048_SHA256` - RSAES-OAEP 2048 bit key with a SHA256 digest.<br>
      - `RSA_DECRYPT_OAEP_3072_SHA256` - RSAES-OAEP 3072 bit key with a SHA256 digest.<br>
      - `RSA_DECRYPT_OAEP_4096_SHA256` - RSAES-OAEP 4096 bit key with a SHA256 digest.<br>
      - `RSA_DECRYPT_OAEP_4096_SHA512` - RSAES-OAEP 4096 bit key with a SHA512 digest.<br>
      - `RSA_DECRYPT_OAEP_2048_SHA1` - RSAES-OAEP 2048 bit key with a SHA1 digest.<br>
      - `RSA_DECRYPT_OAEP_3072_SHA1` - RSAES-OAEP 3072 bit key with a SHA1 digest.<br>
      - `RSA_DECRYPT_OAEP_4096_SHA1` - RSAES-OAEP 4096 bit key with a SHA1 digest.<br>
      - `EC_SIGN_P256_SHA256` - ECDSA on the NIST P-256 curve with a SHA256 digest.<br>
      - `EC_SIGN_P384_SHA384` - ECDSA on the NIST P-384 curve with a SHA384 digest.<br>
      - `EC_SIGN_SECP256K1_SHA256` - ECDSA on the non-NIST secp256k1 curve. This curve is only supported for HSM protection level.<br>
      - `HMAC_SHA256` - HMAC-SHA256 signing with a 256 bit key.<br>
      - `HMAC_SHA1` - HMAC-SHA1 signing with a 160 bit key.<br>
      - `HMAC_SHA384` - HMAC-SHA384 signing with a 384 bit key.<br>
      - `HMAC_SHA512` - HMAC-SHA512 signing with a 512 bit key.<br>
      - `HMAC_SHA224` - HMAC-SHA224 signing with a 224 bit key.<br>
      - `EXTERNAL_SYMMETRIC_ENCRYPTION` - Algorithm representing symmetric encryption by an external key manager.<br>
   - `attestation`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `attestation`<br>
    **Description**: Output only. Statement that was generated and signed by the HSM at key creation time. Use this statement to verify attributes of the key as stored on the HSM, independently of Google. Only provided for key versions with protection_level HSM.<br>
       - `cert_chains`<br>
        **Type**: `STRUCT`<br>
        **Provider name**: `certChains`<br>
        **Description**: Output only. The certificate chains needed to validate the attestation<br>
           - `cavium_certs`<br>
            **Type**: `UNORDERED_LIST_STRING`<br>
            **Provider name**: `caviumCerts`<br>
            **Description**: Cavium certificate chain corresponding to the attestation.<br>
           - `google_card_certs`<br>
            **Type**: `UNORDERED_LIST_STRING`<br>
            **Provider name**: `googleCardCerts`<br>
            **Description**: Google card certificate chain corresponding to the attestation.<br>
           - `google_partition_certs`<br>
            **Type**: `UNORDERED_LIST_STRING`<br>
            **Provider name**: `googlePartitionCerts`<br>
            **Description**: Google partition certificate chain corresponding to the attestation.<br>
       - `format`<br>
        **Type**: `STRING`<br>
        **Provider name**: `format`<br>
        **Description**: Output only. The format of the attestation data. <br>
        **Possible values**:<br>
          - `ATTESTATION_FORMAT_UNSPECIFIED` - Not specified.<br>
          - `CAVIUM_V1_COMPRESSED` - Cavium HSM attestation compressed with gzip. Note that this format is defined by Cavium and subject to change at any time. See https://www.marvell.com/products/security-solutions/nitrox-hs-adapters/software-key-attestation.html.<br>
          - `CAVIUM_V2_COMPRESSED` - Cavium HSM attestation V2 compressed with gzip. This is a new format introduced in Cavium's version 3.2-08.<br>
   - `create_time`<br>
    **Type**: `TIMESTAMP`<br>
    **Provider name**: `createTime`<br>
    **Description**: Output only. The time at which this CryptoKeyVersion was created.<br>
   - `destroy_event_time`<br>
    **Type**: `TIMESTAMP`<br>
    **Provider name**: `destroyEventTime`<br>
    **Description**: Output only. The time this CryptoKeyVersion's key material was destroyed. Only present if state is DESTROYED.<br>
   - `destroy_time`<br>
    **Type**: `TIMESTAMP`<br>
    **Provider name**: `destroyTime`<br>
    **Description**: Output only. The time this CryptoKeyVersion's key material is scheduled for destruction. Only present if state is DESTROY_SCHEDULED.<br>
   - `external_protection_level_options`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `externalProtectionLevelOptions`<br>
    **Description**: ExternalProtectionLevelOptions stores a group of additional fields for configuring a CryptoKeyVersion that are specific to the EXTERNAL protection level and EXTERNAL_VPC protection levels.<br>
       - `ekm_connection_key_path`<br>
        **Type**: `STRING`<br>
        **Provider name**: `ekmConnectionKeyPath`<br>
        **Description**: The path to the external key material on the EKM when using EkmConnection e.g., "v0/my/key". Set this field instead of external_key_uri when using an EkmConnection.<br>
       - `external_key_uri`<br>
        **Type**: `STRING`<br>
        **Provider name**: `externalKeyUri`<br>
        **Description**: The URI for an external resource that this CryptoKeyVersion represents.<br>
   - `generate_time`<br>
    **Type**: `TIMESTAMP`<br>
    **Provider name**: `generateTime`<br>
    **Description**: Output only. The time this CryptoKeyVersion's key material was generated.<br>
   - `import_failure_reason`<br>
    **Type**: `STRING`<br>
    **Provider name**: `importFailureReason`<br>
    **Description**: Output only. The root cause of the most recent import failure. Only present if state is IMPORT_FAILED.<br>
   - `import_job`<br>
    **Type**: `STRING`<br>
    **Provider name**: `importJob`<br>
    **Description**: Output only. The name of the ImportJob used in the most recent import of this CryptoKeyVersion. Only present if the underlying key material was imported.<br>
   - `import_time`<br>
    **Type**: `TIMESTAMP`<br>
    **Provider name**: `importTime`<br>
    **Description**: Output only. The time at which this CryptoKeyVersion's key material was most recently imported.<br>
   - `name`<br>
    **Type**: `STRING`<br>
    **Provider name**: `name`<br>
    **Description**: Output only. The resource name for this CryptoKeyVersion in the format `projects/*/locations/*/keyRings/*/cryptoKeys/*/cryptoKeyVersions/*`.<br>
   - `protection_level`<br>
    **Type**: `STRING`<br>
    **Provider name**: `protectionLevel`<br>
    **Description**: Output only. The ProtectionLevel describing how crypto operations are performed with this CryptoKeyVersion. <br>
    **Possible values**:<br>
      - `PROTECTION_LEVEL_UNSPECIFIED` - Not specified.<br>
      - `SOFTWARE` - Crypto operations are performed in software.<br>
      - `HSM` - Crypto operations are performed in a Hardware Security Module.<br>
      - `EXTERNAL` - Crypto operations are performed by an external key manager.<br>
      - `EXTERNAL_VPC` - Crypto operations are performed in an EKM-over-VPC backend.<br>
   - `reimport_eligible`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `reimportEligible`<br>
    **Description**: Output only. Whether or not this key version is eligible for reimport, by being specified as a target in ImportCryptoKeyVersionRequest.crypto_key_version.<br>
   - `state`<br>
    **Type**: `STRING`<br>
    **Provider name**: `state`<br>
    **Description**: The current state of the CryptoKeyVersion. <br>
    **Possible values**:<br>
      - `CRYPTO_KEY_VERSION_STATE_UNSPECIFIED` - Not specified.<br>
      - `PENDING_GENERATION` - This version is still being generated. It may not be used, enabled, disabled, or destroyed yet. Cloud KMS will automatically mark this version ENABLED as soon as the version is ready.<br>
      - `ENABLED` - This version may be used for cryptographic operations.<br>
      - `DISABLED` - This version may not be used, but the key material is still available, and the version can be placed back into the ENABLED state.<br>
      - `DESTROYED` - This version is destroyed, and the key material is no longer stored. This version may only become ENABLED again if this version is reimport_eligible and the original key material is reimported with a call to KeyManagementService.ImportCryptoKeyVersion.<br>
      - `DESTROY_SCHEDULED` - This version is scheduled for destruction, and will be destroyed soon. Call RestoreCryptoKeyVersion to put it back into the DISABLED state.<br>
      - `PENDING_IMPORT` - This version is still being imported. It may not be used, enabled, disabled, or destroyed yet. Cloud KMS will automatically mark this version ENABLED as soon as the version is ready.<br>
      - `IMPORT_FAILED` - This version was not imported successfully. It may not be used, enabled, disabled, or destroyed. The submitted key material has been discarded. Additional details can be found in CryptoKeyVersion.import_failure_reason.<br>
## `project_id`
**Type**: `STRING`<br>
## `project_number`
**Type**: `STRING`<br>
## `purpose`
**Type**: `STRING`<br>
**Provider name**: `purpose`<br>
**Description**: Immutable. The immutable purpose of this CryptoKey. <br>
**Possible values**:<br>
  - `CRYPTO_KEY_PURPOSE_UNSPECIFIED` - Not specified.<br>
  - `ENCRYPT_DECRYPT` - CryptoKeys with this purpose may be used with Encrypt and Decrypt.<br>
  - `ASYMMETRIC_SIGN` - CryptoKeys with this purpose may be used with AsymmetricSign and GetPublicKey.<br>
  - `ASYMMETRIC_DECRYPT` - CryptoKeys with this purpose may be used with AsymmetricDecrypt and GetPublicKey.<br>
  - `MAC` - CryptoKeys with this purpose may be used with MacSign.<br>
## `resource_name`
**Type**: `STRING`<br>
## `rotation_period`
**Type**: `STRING`<br>
**Provider name**: `rotationPeriod`<br>
**Description**: next_rotation_time will be advanced by this period when the service automatically rotates a key. Must be at least 24 hours and at most 876,000 hours. If rotation_period is set, next_rotation_time must also be set. Keys with purpose ENCRYPT_DECRYPT support automatic rotation. For other keys, this field must be omitted.<br>
## `tags`
**Type**: `UNORDERED_LIST_STRING`<br>
## `version_template`
**Type**: `STRUCT`<br>
**Provider name**: `versionTemplate`<br>
**Description**: A template describing settings for new CryptoKeyVersion instances. The properties of new CryptoKeyVersion instances created by either CreateCryptoKeyVersion or auto-rotation are controlled by this template.<br>
   - `algorithm`<br>
    **Type**: `STRING`<br>
    **Provider name**: `algorithm`<br>
    **Description**: Required. Algorithm to use when creating a CryptoKeyVersion based on this template. For backwards compatibility, GOOGLE_SYMMETRIC_ENCRYPTION is implied if both this field is omitted and CryptoKey.purpose is ENCRYPT_DECRYPT. <br>
    **Possible values**:<br>
      - `CRYPTO_KEY_VERSION_ALGORITHM_UNSPECIFIED` - Not specified.<br>
      - `GOOGLE_SYMMETRIC_ENCRYPTION` - Creates symmetric encryption keys.<br>
      - `RSA_SIGN_PSS_2048_SHA256` - RSASSA-PSS 2048 bit key with a SHA256 digest.<br>
      - `RSA_SIGN_PSS_3072_SHA256` - RSASSA-PSS 3072 bit key with a SHA256 digest.<br>
      - `RSA_SIGN_PSS_4096_SHA256` - RSASSA-PSS 4096 bit key with a SHA256 digest.<br>
      - `RSA_SIGN_PSS_4096_SHA512` - RSASSA-PSS 4096 bit key with a SHA512 digest.<br>
      - `RSA_SIGN_PKCS1_2048_SHA256` - RSASSA-PKCS1-v1_5 with a 2048 bit key and a SHA256 digest.<br>
      - `RSA_SIGN_PKCS1_3072_SHA256` - RSASSA-PKCS1-v1_5 with a 3072 bit key and a SHA256 digest.<br>
      - `RSA_SIGN_PKCS1_4096_SHA256` - RSASSA-PKCS1-v1_5 with a 4096 bit key and a SHA256 digest.<br>
      - `RSA_SIGN_PKCS1_4096_SHA512` - RSASSA-PKCS1-v1_5 with a 4096 bit key and a SHA512 digest.<br>
      - `RSA_SIGN_RAW_PKCS1_2048` - RSASSA-PKCS1-v1_5 signing without encoding, with a 2048 bit key.<br>
      - `RSA_SIGN_RAW_PKCS1_3072` - RSASSA-PKCS1-v1_5 signing without encoding, with a 3072 bit key.<br>
      - `RSA_SIGN_RAW_PKCS1_4096` - RSASSA-PKCS1-v1_5 signing without encoding, with a 4096 bit key.<br>
      - `RSA_DECRYPT_OAEP_2048_SHA256` - RSAES-OAEP 2048 bit key with a SHA256 digest.<br>
      - `RSA_DECRYPT_OAEP_3072_SHA256` - RSAES-OAEP 3072 bit key with a SHA256 digest.<br>
      - `RSA_DECRYPT_OAEP_4096_SHA256` - RSAES-OAEP 4096 bit key with a SHA256 digest.<br>
      - `RSA_DECRYPT_OAEP_4096_SHA512` - RSAES-OAEP 4096 bit key with a SHA512 digest.<br>
      - `RSA_DECRYPT_OAEP_2048_SHA1` - RSAES-OAEP 2048 bit key with a SHA1 digest.<br>
      - `RSA_DECRYPT_OAEP_3072_SHA1` - RSAES-OAEP 3072 bit key with a SHA1 digest.<br>
      - `RSA_DECRYPT_OAEP_4096_SHA1` - RSAES-OAEP 4096 bit key with a SHA1 digest.<br>
      - `EC_SIGN_P256_SHA256` - ECDSA on the NIST P-256 curve with a SHA256 digest.<br>
      - `EC_SIGN_P384_SHA384` - ECDSA on the NIST P-384 curve with a SHA384 digest.<br>
      - `EC_SIGN_SECP256K1_SHA256` - ECDSA on the non-NIST secp256k1 curve. This curve is only supported for HSM protection level.<br>
      - `HMAC_SHA256` - HMAC-SHA256 signing with a 256 bit key.<br>
      - `HMAC_SHA1` - HMAC-SHA1 signing with a 160 bit key.<br>
      - `HMAC_SHA384` - HMAC-SHA384 signing with a 384 bit key.<br>
      - `HMAC_SHA512` - HMAC-SHA512 signing with a 512 bit key.<br>
      - `HMAC_SHA224` - HMAC-SHA224 signing with a 224 bit key.<br>
      - `EXTERNAL_SYMMETRIC_ENCRYPTION` - Algorithm representing symmetric encryption by an external key manager.<br>
   - `protection_level`<br>
    **Type**: `STRING`<br>
    **Provider name**: `protectionLevel`<br>
    **Description**: ProtectionLevel to use when creating a CryptoKeyVersion based on this template. Immutable. Defaults to SOFTWARE. <br>
    **Possible values**:<br>
      - `PROTECTION_LEVEL_UNSPECIFIED` - Not specified.<br>
      - `SOFTWARE` - Crypto operations are performed in software.<br>
      - `HSM` - Crypto operations are performed in a Hardware Security Module.<br>
      - `EXTERNAL` - Crypto operations are performed by an external key manager.<br>
      - `EXTERNAL_VPC` - Crypto operations are performed in an EKM-over-VPC backend.<br>
