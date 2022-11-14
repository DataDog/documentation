---
aliases:
- 5df-63s-7g3
- /security_monitoring/default_rules/5df-63s-7g3
- /security_monitoring/default_rules/cis-gcp-1.3.0-1.9
disable_edit: true
integration_id: google_service_account
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: google_service_account
title: Cloud KMS cryptokeys are not anonymously or publicly accessible
type: security_rules
---

## Description

It is recommended that the IAM policy on Cloud KMS `cryptokeys` should restrict anonymous and/or public access.

## Rationale

Granting permissions to `allUsers` or `allAuthenticatedUsers` allows anyone to access the
dataset. Such access might not be desirable if sensitive data is stored at the location. In this
case, ensure that anonymous and/or public access to a Cloud KMS `cryptokey` is not
allowed.

### Default Value:
By default Cloud KMS does not allow access to `allUsers` or `allAuthenticatedUsers`.

### Impact
Removing the binding for `allUsers` and `allAuthenticatedUsers` members denies anonymous and public users access to `cryptokeys`.

`key_ring_name` is the resource ID of the key ring, which is the fully-qualified key ring name. This value is case-sensitive and in the format: `projects/PROJECT_ID/locations/LOCATION/keyRings/KEY_RING`
You can retrieve the key ring resource ID using the Cloud Console:

1. Open the **Cryptographic Keys** page in the Cloud Console.
2. For the key ring whose resource ID you are retrieving, click the kebab menu (3 vertical dots).
3. Click **Copy Resource ID**. The resource ID for the key ring is copied to your clipboard.

`key_name` is the resource ID of the key, which is the fully-qualified CryptoKey name. This value is case-sensitive and in the format: `projects/PROJECT_ID/locations/LOCATION/keyRings/KEY_RING/cryptoKeys/KEY`
You can retrieve the key resource ID using the Cloud Console:

1. Open the **Cryptographic Keys** page in the Cloud Console.
2. Click the name of the key ring that contains the key.
3. For the key ring whose resource ID you are retrieving, click the kebab menu (3 vertical dots).
4. Click **Copy Resource ID**. The resource ID for the key ring is copied to your clipboard.

`role` is the role to remove the member from.

## Remediation

### From the command line

1. List all Cloud KMS `Cryptokeys`.
   ```
   gcloud kms keys list --keyring=[key_ring_name] --location=global --format=json | jq '.[].name'
   ```
2.  To remove access to `allUsers` and `allAuthenticatedUsers`, remove the IAM policy binding for a KMS key using the below command.
   ```
   gcloud kms keys remove-iam-policy-binding [key_name] --keyring=[key_ring_name] --location=global --member='allAuthenticatedUsers' --role='[role]'

   gcloud kms keys remove-iam-policy-binding [key_name] --keyring=[key_ring_name] --location=global --member='allUsers' --role='[role]'
   ```

## References

1. [https://cloud.google.com/sdk/gcloud/reference/kms/keys/remove-iam-policy-binding][1]
2. [https://cloud.google.com/sdk/gcloud/reference/kms/keys/set-iam-policy][2]
3. [https://cloud.google.com/sdk/gcloud/reference/kms/keys/get-iam-policy][3]
4. [https://cloud.google.com/kms/docs/object-hierarchy#key_resource_id][4]

[1]: https://cloud.google.com/sdk/gcloud/reference/kms/keys/remove-iam-policy-binding
[2]: https://cloud.google.com/sdk/gcloud/reference/kms/keys/set-iam-policy
[3]: https://cloud.google.com/sdk/gcloud/reference/kms/keys/get-iam-policy
[4]: https://cloud.google.com/kms/docs/object-hierarchy#key_resource_id
