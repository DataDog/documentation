---
aliases:
- a3b-agh-e1p
- /security_monitoring/default_rules/a3b-agh-e1p
- /security_monitoring/default_rules/cis-gcp-1.3.0-1.7
disable_edit: true
integration_id: google_service_account
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: google_service_account
title: User-managed or external keys for service accounts are rotated every 90 days
  or less
type: security_rules
---

## Description

Service Account keys consist of a key ID (private_key_id) and a private key. These keys are used to sign programmatic requests that users make to Google Cloud services and make them accessible to the particular service account. You should regularly rotate all Service Account keys.

## Rationale

Rotating Service Account keys reduces the opportunity window of an access key associated with a compromised or terminated account being used. Service Account keys should be rotated to ensure that data cannot be accessed with an old key that may have been lost, cracked, or stolen.

Each service account is associated with a key pair managed by Google Cloud Platform (GCP). It is used for service-to-service authentication within GCP. Google rotates the keys daily.

GCP provides the option to create one or more user-managed (also called external) key pairs for use from outside GCP, for example: with Application Default Credentials. When a new key pair is created, the user is required to download the private key, which is not retained by Google. 

With external keys, users are responsible for keeping the private key secure and other management operations such as key rotation. External keys can be managed by the IAM API, the Google Cloud Platform command-line tool, or the Service Accounts page in the Google Cloud Platform Console. GCP facilitates up to 10 external service account keys per service account for key rotation.

## Remediation

Delete any external, user-managed Service Account Keys older than 90 days:
1. In the [Cloud Console][1], navigate to **APIs & Services** > **Credentials**.
2. In the **Service Account Keys** section, click the Delete icon to delete every external, user-managed service account key where the creation date is greater or equal to the past 90 days.

To create an external, user-managed Service Account Key for a Service Account:

1. In the [Cloud Console][1], navigate to **APIs & Services** > **Credentials**. 
2. Click **Create Credentials** and **Service Account Key**.  
3. Select the service account from the drop-down menu for every external, user-managed Service Account key you want to create.
4. Select the desired key type format, such as JSON or P12.
5. Click **Create**, which downloads the private key. Keep this key safe.
6. If prompted, click **Close**.

You are redirected to the **APIs & Services** > **Credentials** page and you can see the new ID displayed in the **Service Account Keys** section.


## Impact

Rotating service account keys breaks communication for dependent applications. Dependent applications need to be configured manually with the new key ID displayed in the **Service Account Keys** section and the user needs to download the private key.

## References

1. https://cloud.google.com/iam/docs/understanding-service-accounts#managing_service_account_keys
2. https://cloud.google.com/sdk/gcloud/reference/iam/service-accounts/keys/list
3. https://cloud.google.com/iam/docs/service-accounts

[1]: https://console.cloud.google.com/apis/credentials
