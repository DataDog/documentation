1. Enter your S3 bucket name. If you configured Log Archives, it's the name of the bucket you created earlier.
1. Enter the AWS region the S3 bucket is in.
1. Enter the key prefix.
    - Prefixes are useful for partitioning objects. For example, you can use a prefix as an object key to store objects under a particular directory. If using a prefix for this purpose, it must end in `/` to act as a directory path; a trailing `/` is not automatically added.
    - See [template syntax][10051] if you want to route logs to different object keys based on specific fields in your logs.
     - **Note**: Datadog recommends that you start your prefixes with the directory name and without a lead slash (`/`). For example, `app-logs/` or `service-logs/`.
1. Select the storage class for your S3 bucket in the **Storage Class** dropdown menu. If you are going to archive and rehydrate your logs:
    - **Note**: Rehydration only supports the following [storage classes][10052]:
        - Standard
        - Intelligent-Tiering, only if [the optional asynchronous archive access tiers][10053] are both disabled.
        - Standard-IA
        - One Zone-IA
    - If you wish to rehydrate from archives in another storage class, you must first move them to one of the supported storage classes above.
    - See the [Example destination and log archive setup](#example-destination-and-log-archive-setup) section of this page for how to configure your Log Archive based on your Amazon S3 destination setup.
1. Optionally, select an AWS authentication option. If you are only using the [user or role you created earlier][10054] for authentication, do not select **Assume role**. The **Assume role** option should only be used if the user or role you created earlier needs to assume a different role to access the specific AWS resource and that permission has to be explicitly defined.<br>If you select **Assume role**:
    1. Enter the ARN of the IAM role you want to assume.
    1. Optionally, enter the assumed role session name and external ID.
    - **Note:** The [user or role you created earlier][10054] must have permission to assume this role so that the Worker can authenticate with AWS.
1. Optionally, toggle the switch to enable **Buffering Options**.<br>**Note**: Buffering options is in Preview. Contact your account manager to request access.
	- If left disabled, the maximum size for buffering is 500 events.
	- If enabled:
		1. Select the buffer type you want to set (**Memory** or **Disk**).
		1. Enter the buffer size and select the unit.

#### Example destination and log archive setup

If you enter the following values for your Amazon S3 destination:
- S3 Bucket Name: `test-op-bucket`
- Prefix to apply to all object keys: `op-logs`
- Storage class for the created objects: `Standard`

<figure class="text-center">
<img src="{{ .Site.Params.img_url}}images/observability_pipelines/setup/amazon_s3_destination.png" alt="The Amazon S3 destination setup with the example values" width="40%">
</figure>

Then these are the values you enter for configuring the S3 bucket for Log Archives:

- S3 bucket: `test-op-bucket`
- Path: `op-logs`
- Storage class: `Standard`

<figure class="text-center">
<img src="{{ .Site.Params.img_url}}images/observability_pipelines/setup/amazon_s3_archive.png" alt="The log archive configuration with the example values" width="70%">
</figure>

[10051]: /observability_pipelines/destinations/#template-syntax
[10052]: /logs/log_configuration/archives/?tab=awss3#storage-class
[10053]: https://aws.amazon.com/s3/storage-classes/intelligent-tiering/
[10054]: /observability_pipelines/destinations/amazon_s3/?tab=docker#set-up-an-iam-policy-that-allows-workers-to-write-to-the-s3-bucket