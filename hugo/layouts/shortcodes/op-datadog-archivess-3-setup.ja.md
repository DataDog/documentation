1. [Amazon S3][101] に移動します。アーカイブの送信先となる S3 バケットを作成します。バケットを公開状態に設定しないでください。

2. 以下の権限を含むポリシーを作成します。作成した S3 バケットの名前にバケット名を更新してください。

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