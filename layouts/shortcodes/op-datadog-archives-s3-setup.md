The sample configuration you download later includes a sink for sending logs to Amazon S3 under a Datadog-rehydratable format. To use this configuration, set up an IAM policy that allows the Workers to write to S3.

1. Go into your AWS console and create an S3 bucket to send your archives to. Do not make your bucket publicly readable.

2. Create a policy with the following permissions. Make sure to update the bucket name in the policy above to match your configuration.
    ```json
    {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Sid": "DatadogUploadLogArchives",
          "Effect": "Allow",
          "Action": ["s3:PutObject"],
          "Resource": [
            "arn:aws:s3:::<MY_BUCKET_NAME_1_/_MY_OPTIONAL_BUCKET_PATH_1>/*",
          ]
        },
        {
          "Sid": "DatadogListLogArchives",
          "Effect": "Allow",
          "Action": ["s3:ListBucket"],
          "Resource": [
            "arn:aws:s3:::<MY_BUCKET_NAME>"
          ]
        }
      ]
    }
    ```
