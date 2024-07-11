### Create an Amazon S3 bucket

1. Navigate to [Amazon S3 buckets][401].
1. Click **Create bucket**.
1. Enter a descriptive name for your bucket.
1. Do not make your bucket publicly readable.
1. Optionally, add tags.
1. Click **Create bucket**.

### Set up an IAM policy that allows Workers to write to the S3 bucket

1. Navigate to the [IAM console][402].
1. Select **Policies** in the left side menu.
1. Click **Create policy**.
1. Click **JSON** in the **Specify permissions** section.
1. Copy the below policy and paste it into the **Policy editor**. Replace `<MY_BUCKET_NAME>` and `<MY_BUCKET_NAME_1_/_MY_OPTIONAL_BUCKET_PATH_1>` with the information for the S3 bucket you created earlier.
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
                "Sid": "DatadogRehydrateLogArchivesListBucket",
                "Effect": "Allow",
                "Action": "s3:ListBucket",
                "Resource": "arn:aws:s3:::<MY_BUCKET_NAME>"
            }
        ]
    }
    ```
1. Click **Next**.
1. Enter a descriptive policy name.
1. Optionally, add tags.
1. Click **Create policy**.

[401]: https://s3.console.aws.amazon.com/s3/home
[402]: https://console.aws.amazon.com/iam/