---
dependencies: []
disable_edit: true
---
# aws_acm

## `account_id`
**Type**: `STRING`<br>
## `certificate_arn`
**Type**: `STRING`<br>
**Provider name**: `CertificateArn`<br>
**Description**: The Amazon Resource Name (ARN) of the certificate. For more information about ARNs, see <a href="https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html">Amazon Resource Names (ARNs)</a> in the <i>Amazon Web Services General Reference</i>.<br>
## `certificate_authority_arn`
**Type**: `STRING`<br>
**Provider name**: `CertificateAuthorityArn`<br>
**Description**: The Amazon Resource Name (ARN) of the private certificate authority (CA) that issued the certificate. This has the following format:   <code>arn:aws:acm-pca:region:account:certificate-authority/12345678-1234-1234-1234-123456789012</code><br>
## `created_at`
**Type**: `TIMESTAMP`<br>
**Provider name**: `CreatedAt`<br>
**Description**: The time at which the certificate was requested.<br>
## `domain_name`
**Type**: `STRING`<br>
**Provider name**: `DomainName`<br>
**Description**: The fully qualified domain name for the certificate, such as www.example.com or example.com.<br>
## `domain_validation_options`
**Type**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `DomainValidationOptions`<br>
**Description**: Contains information about the initial validation of each domain name that occurs as a result of the RequestCertificate request. This field exists only when the certificate type is <code>AMAZON_ISSUED</code>.<br>
   - `domain_name`<br>
    **Type**: `STRING`<br>
    **Provider name**: `DomainName`<br>
    **Description**: A fully qualified domain name (FQDN) in the certificate. For example, <code>www.example.com</code> or <code>example.com</code>.<br>
   - `resource_record`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `ResourceRecord`<br>
    **Description**: Contains the CNAME record that you add to your DNS database for domain validation. For more information, see <a href="https://docs.aws.amazon.com/acm/latest/userguide/gs-acm-validate-dns.html">Use DNS to Validate Domain Ownership</a>. Note: The CNAME information that you need does not include the name of your domain. If you include your domain name in the DNS database CNAME record, validation fails. For example, if the name is "_a79865eb4cd1a6ab990a45779b4e0b96.yourdomain.com", only "_a79865eb4cd1a6ab990a45779b4e0b96" must be used.<br>
       - `name`<br>
        **Type**: `STRING`<br>
        **Provider name**: `Name`<br>
        **Description**: The name of the DNS record to create in your domain. This is supplied by ACM.<br>
       - `type`<br>
        **Type**: `STRING`<br>
        **Provider name**: `Type`<br>
        **Description**: The type of DNS record. Currently this can be <code>CNAME</code>.<br>
       - `value`<br>
        **Type**: `STRING`<br>
        **Provider name**: `Value`<br>
        **Description**: The value of the CNAME record to add to your DNS database. This is supplied by ACM.<br>
   - `validation_domain`<br>
    **Type**: `STRING`<br>
    **Provider name**: `ValidationDomain`<br>
    **Description**: The domain name that ACM used to send domain validation emails.<br>
   - `validation_emails`<br>
    **Type**: `UNORDERED_LIST_STRING`<br>
    **Provider name**: `ValidationEmails`<br>
    **Description**: A list of email addresses that ACM used to send domain validation emails.<br>
   - `validation_method`<br>
    **Type**: `STRING`<br>
    **Provider name**: `ValidationMethod`<br>
    **Description**: Specifies the domain validation method.<br>
   - `validation_status`<br>
    **Type**: `STRING`<br>
    **Provider name**: `ValidationStatus`<br>
    **Description**: The validation status of the domain name. This can be one of the following values: <ul> <li>  <code>PENDING_VALIDATION</code>  </li> <li>  <code>SUCCESS</code> </li> <li>  <code>FAILED</code> </li> </ul>
## `extended_key_usages`
**Type**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `ExtendedKeyUsages`<br>
**Description**: Contains a list of Extended Key Usage X.509 v3 extension objects. Each object specifies a purpose for which the certificate public key can be used and consists of a name and an object identifier (OID).<br>
   - `name`<br>
    **Type**: `STRING`<br>
    **Provider name**: `Name`<br>
    **Description**: The name of an Extended Key Usage value.<br>
   - `oid`<br>
    **Type**: `STRING`<br>
    **Provider name**: `OID`<br>
    **Description**: An object identifier (OID) for the extension value. OIDs are strings of numbers separated by periods. The following OIDs are defined in RFC 3280 and RFC 5280.  <ul> <li>  <code>1.3.6.1.5.5.7.3.1 (TLS_WEB_SERVER_AUTHENTICATION)</code>  </li> <li>  <code>1.3.6.1.5.5.7.3.2 (TLS_WEB_CLIENT_AUTHENTICATION)</code>  </li> <li>  <code>1.3.6.1.5.5.7.3.3 (CODE_SIGNING)</code>  </li> <li>  <code>1.3.6.1.5.5.7.3.4 (EMAIL_PROTECTION)</code>  </li> <li>  <code>1.3.6.1.5.5.7.3.8 (TIME_STAMPING)</code>  </li> <li>  <code>1.3.6.1.5.5.7.3.9 (OCSP_SIGNING)</code>  </li> <li>  <code>1.3.6.1.5.5.7.3.5 (IPSEC_END_SYSTEM)</code>  </li> <li>  <code>1.3.6.1.5.5.7.3.6 (IPSEC_TUNNEL)</code>  </li> <li>  <code>1.3.6.1.5.5.7.3.7 (IPSEC_USER)</code>  </li> </ul>
## `failure_reason`
**Type**: `STRING`<br>
**Provider name**: `FailureReason`<br>
**Description**: The reason the certificate request failed. This value exists only when the certificate status is <code>FAILED</code>. For more information, see <a href="https://docs.aws.amazon.com/acm/latest/userguide/troubleshooting.html#troubleshooting-failed">Certificate Request Failed</a> in the <i>Certificate Manager User Guide</i>.<br>
## `imported_at`
**Type**: `TIMESTAMP`<br>
**Provider name**: `ImportedAt`<br>
**Description**: The date and time when the certificate was imported. This value exists only when the certificate type is <code>IMPORTED</code>.<br>
## `in_use_by`
**Type**: `UNORDERED_LIST_STRING`<br>
**Provider name**: `InUseBy`<br>
**Description**: A list of ARNs for the Amazon Web Services resources that are using the certificate. A certificate can be used by multiple Amazon Web Services resources.<br>
## `issued_at`
**Type**: `TIMESTAMP`<br>
**Provider name**: `IssuedAt`<br>
**Description**: The time at which the certificate was issued. This value exists only when the certificate type is <code>AMAZON_ISSUED</code>.<br>
## `issuer`
**Type**: `STRING`<br>
**Provider name**: `Issuer`<br>
**Description**: The name of the certificate authority that issued and signed the certificate.<br>
## `key_algorithm`
**Type**: `STRING`<br>
**Provider name**: `KeyAlgorithm`<br>
**Description**: The algorithm that was used to generate the public-private key pair.<br>
## `key_usages`
**Type**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `KeyUsages`<br>
**Description**: A list of Key Usage X.509 v3 extension objects. Each object is a string value that identifies the purpose of the public key contained in the certificate. Possible extension values include <code>DIGITAL_SIGNATURE</code>, <code>KEY_ENCIPHERMENT</code>, <code>NON_REPUDIATION</code>, and more.<br>
   - `name`<br>
    **Type**: `STRING`<br>
    **Provider name**: `Name`<br>
    **Description**: A string value that contains a Key Usage extension name.<br>
## `not_after`
**Type**: `TIMESTAMP`<br>
**Provider name**: `NotAfter`<br>
**Description**: The time after which the certificate is not valid.<br>
## `not_before`
**Type**: `TIMESTAMP`<br>
**Provider name**: `NotBefore`<br>
**Description**: The time before which the certificate is not valid.<br>
## `options`
**Type**: `STRUCT`<br>
**Provider name**: `Options`<br>
**Description**: Value that specifies whether to add the certificate to a transparency log. Certificate transparency makes it possible to detect SSL certificates that have been mistakenly or maliciously issued. A browser might respond to certificate that has not been logged by showing an error message. The logs are cryptographically secure.<br>
   - `certificate_transparency_logging_preference`<br>
    **Type**: `STRING`<br>
    **Provider name**: `CertificateTransparencyLoggingPreference`<br>
    **Description**: You can opt out of certificate transparency logging by specifying the <code>DISABLED</code> option. Opt in by specifying <code>ENABLED</code>.<br>
## `renewal_eligibility`
**Type**: `STRING`<br>
**Provider name**: `RenewalEligibility`<br>
**Description**: Specifies whether the certificate is eligible for renewal. At this time, only exported private certificates can be renewed with the RenewCertificate command.<br>
## `renewal_summary`
**Type**: `STRUCT`<br>
**Provider name**: `RenewalSummary`<br>
**Description**: Contains information about the status of ACM's <a href="https://docs.aws.amazon.com/acm/latest/userguide/acm-renewal.html">managed renewal</a> for the certificate. This field exists only when the certificate type is <code>AMAZON_ISSUED</code>.<br>
   - `domain_validation_options`<br>
    **Type**: `UNORDERED_LIST_STRUCT`<br>
    **Provider name**: `DomainValidationOptions`<br>
    **Description**: Contains information about the validation of each domain name in the certificate, as it pertains to ACM's <a href="https://docs.aws.amazon.com/acm/latest/userguide/acm-renewal.html">managed renewal</a>. This is different from the initial validation that occurs as a result of the RequestCertificate request. This field exists only when the certificate type is <code>AMAZON_ISSUED</code>.<br>
       - `domain_name`<br>
        **Type**: `STRING`<br>
        **Provider name**: `DomainName`<br>
        **Description**: A fully qualified domain name (FQDN) in the certificate. For example, <code>www.example.com</code> or <code>example.com</code>.<br>
       - `resource_record`<br>
        **Type**: `STRUCT`<br>
        **Provider name**: `ResourceRecord`<br>
        **Description**: Contains the CNAME record that you add to your DNS database for domain validation. For more information, see <a href="https://docs.aws.amazon.com/acm/latest/userguide/gs-acm-validate-dns.html">Use DNS to Validate Domain Ownership</a>. Note: The CNAME information that you need does not include the name of your domain. If you include your domain name in the DNS database CNAME record, validation fails. For example, if the name is "_a79865eb4cd1a6ab990a45779b4e0b96.yourdomain.com", only "_a79865eb4cd1a6ab990a45779b4e0b96" must be used.<br>
           - `name`<br>
            **Type**: `STRING`<br>
            **Provider name**: `Name`<br>
            **Description**: The name of the DNS record to create in your domain. This is supplied by ACM.<br>
           - `type`<br>
            **Type**: `STRING`<br>
            **Provider name**: `Type`<br>
            **Description**: The type of DNS record. Currently this can be <code>CNAME</code>.<br>
           - `value`<br>
            **Type**: `STRING`<br>
            **Provider name**: `Value`<br>
            **Description**: The value of the CNAME record to add to your DNS database. This is supplied by ACM.<br>
       - `validation_domain`<br>
        **Type**: `STRING`<br>
        **Provider name**: `ValidationDomain`<br>
        **Description**: The domain name that ACM used to send domain validation emails.<br>
       - `validation_emails`<br>
        **Type**: `UNORDERED_LIST_STRING`<br>
        **Provider name**: `ValidationEmails`<br>
        **Description**: A list of email addresses that ACM used to send domain validation emails.<br>
       - `validation_method`<br>
        **Type**: `STRING`<br>
        **Provider name**: `ValidationMethod`<br>
        **Description**: Specifies the domain validation method.<br>
       - `validation_status`<br>
        **Type**: `STRING`<br>
        **Provider name**: `ValidationStatus`<br>
        **Description**: The validation status of the domain name. This can be one of the following values: <ul> <li>  <code>PENDING_VALIDATION</code>  </li> <li>  <code>SUCCESS</code> </li> <li>  <code>FAILED</code> </li> </ul>
   - `renewal_status`<br>
    **Type**: `STRING`<br>
    **Provider name**: `RenewalStatus`<br>
    **Description**: The status of ACM's <a href="https://docs.aws.amazon.com/acm/latest/userguide/acm-renewal.html">managed renewal</a> of the certificate.<br>
   - `renewal_status_reason`<br>
    **Type**: `STRING`<br>
    **Provider name**: `RenewalStatusReason`<br>
    **Description**: The reason that a renewal request was unsuccessful.<br>
   - `updated_at`<br>
    **Type**: `TIMESTAMP`<br>
    **Provider name**: `UpdatedAt`<br>
    **Description**: The time at which the renewal summary was last updated.<br>
## `revocation_reason`
**Type**: `STRING`<br>
**Provider name**: `RevocationReason`<br>
**Description**: The reason the certificate was revoked. This value exists only when the certificate status is <code>REVOKED</code>.<br>
## `revoked_at`
**Type**: `TIMESTAMP`<br>
**Provider name**: `RevokedAt`<br>
**Description**: The time at which the certificate was revoked. This value exists only when the certificate status is <code>REVOKED</code>.<br>
## `serial`
**Type**: `STRING`<br>
**Provider name**: `Serial`<br>
**Description**: The serial number of the certificate.<br>
## `signature_algorithm`
**Type**: `STRING`<br>
**Provider name**: `SignatureAlgorithm`<br>
**Description**: The algorithm that was used to sign the certificate.<br>
## `status`
**Type**: `STRING`<br>
**Provider name**: `Status`<br>
**Description**: The status of the certificate. A certificate enters status PENDING_VALIDATION upon being requested, unless it fails for any of the reasons given in the troubleshooting topic <a href="https://docs.aws.amazon.com/acm/latest/userguide/troubleshooting-failed.html">Certificate request fails</a>. ACM makes repeated attempts to validate a certificate for 72 hours and then times out. If a certificate shows status FAILED or VALIDATION_TIMED_OUT, delete the request, correct the issue with <a href="https://docs.aws.amazon.com/acm/latest/userguide/dns-validation.html">DNS validation</a> or <a href="https://docs.aws.amazon.com/acm/latest/userguide/email-validation.html">Email validation</a>, and try again. If validation succeeds, the certificate enters status ISSUED.<br>
## `subject`
**Type**: `STRING`<br>
**Provider name**: `Subject`<br>
**Description**: The name of the entity that is associated with the public key contained in the certificate.<br>
## `subject_alternative_names`
**Type**: `UNORDERED_LIST_STRING`<br>
**Provider name**: `SubjectAlternativeNames`<br>
**Description**: One or more domain names (subject alternative names) included in the certificate. This list contains the domain names that are bound to the public key that is contained in the certificate. The subject alternative names include the canonical domain name (CN) of the certificate and additional domain names that can be used to connect to the website.<br>
## `tags`
**Type**: `UNORDERED_LIST_STRING`<br>
## `type`
**Type**: `STRING`<br>
**Provider name**: `Type`<br>
**Description**: The source of the certificate. For certificates provided by ACM, this value is <code>AMAZON_ISSUED</code>. For certificates that you imported with ImportCertificate, this value is <code>IMPORTED</code>. ACM does not provide <a href="https://docs.aws.amazon.com/acm/latest/userguide/acm-renewal.html">managed renewal</a> for imported certificates. For more information about the differences between certificates that you import and those that ACM provides, see <a href="https://docs.aws.amazon.com/acm/latest/userguide/import-certificate.html">Importing Certificates</a> in the <i>Certificate Manager User Guide</i>.<br>
