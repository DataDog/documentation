---
aliases:
- 34s-8js-08d
- /security_monitoring/default_rules/34s-8js-08d
- /security_monitoring/default_rules/cis-gcp-1.3.0-1.17
disable_edit: true
integration_id: google_dataproc_cluster
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: google_dataproc_cluster
title: Dataproc cluster is encrypted using customer-managed encryption key
type: security_rules
---

## Description
When you use Dataproc, cluster and job data is stored on Persistent Disks (PDs) associated
with the Compute Engine VMs in your cluster and in a Cloud Storage staging bucket. This
PD and bucket data is encrypted using a Google-generated data encryption key (DEK) and
key encryption key (KEK). The CMEK feature allows you to create, use, and revoke the key
encryption key (KEK). Google still controls the data encryption key (DEK).

## Rationale
Cloud services offer the ability to protect data related to those services using encryption
keys managed by the customer within Cloud KMS. These encryption keys are called
customer-managed encryption keys (CMEK). When customers protect data in Google Cloud
services with CMEK, the CMEK key is within the customer's control.

## Remediation

### From the console

1. Log in to the GCP Console and navigate to the **Dataproc Cluster** page by visiting [https://console.cloud.google.com/dataproc/clusters][1].
2. Select the project from the projects dropdown list.
3. On the **Dataproc Cluster** page, click on the **Create Cluster** to create a new cluster with customer-managed encryption keys.
4. On the **Create a cluster** page, perform the following steps:
   1. Inside **Set up cluster** section perform these steps:
       1. In the **Name** textbox, provide a name for your cluster.
       2. From **Location** select the location in which you want to deploy a cluster.
       3. Configure other configurations as per your requirements.
   2. Inside **Configure Nodes** and **Customize cluster** section configure the settings as
per your requirements.
   3. Inside the **Manage security** section, perform these steps:
      1. From **Encryption**, select **Customer-managed key**.
      2. Select a customer-managed key from dropdown list.
      3. Ensure that the selected KMS Key has the **Cloud KMS CryptoKey Encrypter/Decrypter** role assigned to the Dataproc Cluster service account (`serviceAccount:service-<project_number>@compute-system.iam.gserviceaccount.com`).
      4. Click on **Create** to create a cluster.
5. Once the cluster is created, migrate all of your workloads from the old cluster to the new cluster and delete the old cluster by performing the following steps:
   1. On the **Clusters** page, select the old cluster and click on **Delete cluster**.
   2. On the **Confirm deletion** window, click **Confirm** to delete the cluster.
6. Repeat the steps above for other Dataproc clusters available in the selected project.
7. Change the project from the project dropdown list and repeat the remediation procedure for other Dataproc clusters available in other projects.

### From the command line
Before creating a cluster, ensure that the selected KMS Key has the **Cloud KMS CryptoKey
Encrypter/Decrypter** role assigned to the Dataproc Cluster service account
(`serviceAccount:service-<project_number>@compute-system.iam.gserviceaccount.com`).

Run the `clusters create` command to create a new cluster with a customer-managed key:

```
gcloud dataproc clusters create <cluster_name> --region=us-central1 --gce-pd-kms-key=<key_resource_name>
```

The above command creates a new cluster in the selected region.
After the cluster is created, migrate all your workloads from the older cluster to the new
cluster and run the `clusters delete` command to delete the cluster:

```
gcloud dataproc clusters delete <cluster_name> --region=us-central1
```

Repeat step no. 1 to create a new Dataproc cluster.
Change the project by running the following command and repeat the remediation procedure
for other projects:

```
gcloud config set project <project_ID>
```

## References
1. [https://cloud.google.com/docs/security/encryption/default-encryption][2]

[1]: https://console.cloud.google.com/dataproc/clusters
[2]: https://cloud.google.com/docs/security/encryption/default-encryption
