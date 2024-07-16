### Create an IAM user

Create an IAM user and attach the IAM policy you created earlier to it.

1. Navigate to the [IAM console][501].
1. Select **Users** in the left side menu.
1. Click **Create user**.
1. Enter a username.
1. Click **Next**.
1. Select **Attach policies directly**.
1. Choose the IAM policy you created earlier to attach to the new IAM user.
1. Click **Next**.
1. Optionally, add tags.
1. Click **Create user**.

Create access credentials for the new IAM user. The AWS access key and AWS secret access key are added later as environment variables when you install the Observability Pipelines Worker.

[501]: https://console.aws.amazon.com/iam/