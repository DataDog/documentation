1. Accédez à [Amazon S3][101]. Créez un compartiment S3 vers lequel vos archives seront envoyées. Assurez-vous que votre compartiment n'est pas accessible au public.

2. Créez une stratégie avec les autorisations suivantes. Prenez soin de modifier le nom du compartiment afin qu'il corresponde au compartiment S3 que vous avez créé précédemment.

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