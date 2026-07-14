1. Navigate to [Amazon S3][101]. Create an S3 bucket to send your archives to. Do not make your bucket publicly readable.

2. Create a policy with the following permissions. Make sure to update the bucket name to the name of the S3 bucket you created earlier.

    ```json
    {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Sid": "DatadogUploadAndRehydrateLogArchives",
          "Effect": "Allow",
          "Action": ["s3:PutObject", "s3:GetObject"],
          "Resource": "arn:aws:s3:::<MY_BUCKET_NAME_1_/_MY_OPTIONAL_BUCKET_PATH_1>/*"
        },
        {
          "Sid": "DatadogUploadAndRehydrateLogArchives",
            "Effect": "Allow",
            "Action": "s3:ListBucket",
            "Resource": "arn:aws:s3:::<MY_BUCKET_NAME>"
        }
      ]
    }
    ```

[101]: https://s3.console.aws.amazon.com/s3/