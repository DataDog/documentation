---
aliases:
- d48-3e4-43d
cloud: aws
disable_edit: true
kind: documentation
rule_category:
- Cloud Configuration
scope: cloudfront
security: compliance
source: cloudfront
title: Cloudfront distribution is field-level encrypted
type: security_rules
---

## Description

Ensure that AWS CloudFront field-level encryption is enabled.

## Rationale

Field-level encryption ensures sensitive data, such as identification and credit card numbers, is protected across your services and applications.

## Remediation

### Console

Follow the [Setting Up Field-Level Encryption][1] docs to enable field-level encryption.

### CLI

1. Generate a RSA key pair. Run `ssh-keygen -t rsa`.

2. Run `create-public-key` with the generated key.

    {{< code-block lang="bash" filename="create-public-key.sh" >}}
    aws cloudfront create-public-key
        --public-key-config CallerReference="0123456789012",Name="public-key",EncodedKey="-----BEGIN PUBLIC KEY----- ... -----END PUBLIC KEY-----",Comment="Field-level encryption public key."
    {{< /code-block >}}

3. Modify the returned configuration in a new JSON file by setting `PublicKeyID` as your public ID key. Configure any other options you require and save the file.

    {{< code-block lang="json" filename="public-key-id.json" >}}
    {
      "PublicKey": {
        ...
        "Id": "PUBKEYID000000",
        ...
      }
    }
    {{< /code-block >}}

4. Run `create-field-level-encryption-profile` using the path of the configuration file saved in step 3.

    {{< code-block lang="bash" filename="create-field-level-encryption-profile.sh" >}}
    aws cloudfront create-field-level-encryption-profile
        --field-level-encryption-profile-config public-key-id.json
    {{< /code-block >}}

5. Modify the returned configuration in a new JSON file by setting `ProfileID` as your profile ID. Configure any other options you require and save the file.

    {{< code-block lang="json" filename="profile-id.json" >}}
    {
      ...
      "ContentTypeProfileConfig": {
        ...
        "Items": [
          {
            "ProfileId": "ABCD1234567890",
          }
        ]
      }
    }
    {{< /code-block >}}

6. Run `create-field-level-encryption-config` using the path of the configuration file saved in step 5.

    {{< code-block lang="bash" filename="create-field-level-encryption-config.sh" >}}
    aws cloudfront create-field-level-encryption-config
        --field-level-encryption-config profile-id.json
    {{< /code-block >}}

7. Run `get-distribution-config` with your AWS CloudFront distribution ID to retrieve your distribution's configuration information.

    {{< code-block lang="bash" filename="get-distribution-id.sh" >}}
    aws cloudfront get-distribution-config
        --id ID000000000000
    {{< /code-block >}}

8. Modify the returned configuration in a new JSON file by setting `FieldLevelEncryptionID` as your field level encryption ID. Configure any other options you require and save the file.

**Note**: Viewer Protocol Policy and Origin Protocol Policy must both be set to HTTPS.

    {{< code-block lang="json" filename="field-level-encryption-id.json" >}}
    {
      "DistributionConfig": {
        ...
        "Origins": {
          "Items": [
            {
              ...,
              "OriginProtocolPolicy": "https-only",
            },
          ],
            ...
        },
        "DefaultCacheBehavior": {
          "FieldLevelEncryptionId": "ACBD1234567890",
          "ViewerProtocolPolicy" : "https-only"
        },
        ...
      }
    }
    {{< /code-block >}}

9. Run `update-distribution` with your AWS CloudFront distribution `id`, the configuration file saved in step 8, and `etag` to enable field-level encryption.

    {{< code-block lang="bash" filename="update-distribution.sh" >}}
    aws cloudfront update-distribution
        --id ID000000000000
        --distribution-config field-level-encryption-id.json
        --if-match E1000000000000
    {{< /code-block >}}

[1]: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/field-level-encryption.html
