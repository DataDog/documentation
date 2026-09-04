1. [Amazon S3][101]으로 이동하세요. 아카이브를 보낼 S3 버킷을 생성하세요. 버킷을 공용으로 읽을 수 있도록 설정하지 마세요.

2. 다음 권한으로 정책을 생성하세요. 버킷 이름을 이전에 만든 S3 버킷 이름으로 업데이트해야 합니다.

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