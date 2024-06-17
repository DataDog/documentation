#### Amazon S3

1. Enter the S3 bucket name for the S3 bucket you created earlier.
1. Enter the AWS region the S3 bucket is in.
1. Enter the key prefix. Prefixes are useful for partitioning objects, such as by creating an object key that stores objects under a particular directory. If using a prefix for this purpose, it must end in `/` to act as a directory path. A trailing `/` is not automatically added.
1. Select the storage class for your S3 bucket in the **Storage Class** dropdown menu.

Your AWS access key ID and AWS secret access key is set as environment variables when you install the Worker later.