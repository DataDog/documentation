1. Enter the S3 bucket name for the S3 bucket you created earlier.
1. Enter the AWS region the S3 bucket is in.
1. Enter the key prefix.
    - Prefixes are useful for partitioning objects. For example, you can use a prefix as an object key to store objects under a particular directory. If using a prefix for this purpose, it must end in `/` to act as a directory path; a trailing `/` is not automatically added.
    - See [template syntax][10051] if you want to route logs to different object keys based on specific fields in your logs.
1. Select the storage class for your S3 bucket in the **Storage Class** dropdown menu.
    - **Note**: [Rehydration][10052] only supports the following storage classes:
        - Standard
        - Intelligent-Tiering, only if [the optional asynchronous archive access tiers][10053] are both disabled.
        - Standard-IA
        - One Zone-IA
    - If you wish to rehydrate from archives in another storage class, you must first move them to one of the supported storage classes above.
1. Optionally, select an AWS authentication option. If you select **Assume role**:
    1. Enter the ARN of the IAM role you want to assume.
    1. Optionally, enter the assumed role session name and external ID.

[10051]: /observability_pipelines/destinations/#template-syntax
[10052]: /logs/log_configuration/rehydrating/
[10053]: https://aws.amazon.com/s3/storage-classes/intelligent-tiering/