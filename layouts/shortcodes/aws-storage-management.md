Storage Management needs the following permissions to enable S3 Inventory on source buckets and read the generated reports from destination buckets:

| Resource Type | Permissions                        |
| ------------- | ---------------------------------- |
| aws:s3:bucket | s3:GetAccelerateConfiguration,<br>s3:GetAnalyticsConfiguration,<br>s3:GetBucket*,<br>s3:GetEncryptionConfiguration,<br>s3:GetInventoryConfiguration,<br>s3:GetLifecycleConfiguration,<br>s3:GetMetricsConfiguration,<br>s3:GetObject, // **Note**: This can be scoped to the destination buckets and prefixes<br>s3:GetReplicationConfiguration,<br>s3:ListAllMyBuckets,<br>s3:ListBucket, // **Note**: This can be scoped to the destination buckets and prefixes<br>s3:PutBucketNotification |

