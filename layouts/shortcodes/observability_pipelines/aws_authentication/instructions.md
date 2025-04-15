To set up AWS authentication:

1. Create an IAM role if you don't have one already. The role needs, at a minimum, these [permissions](#permissions) to interact with the component. See [Create a role to delegate permissions to an IAM user][10101] for more information.
1. In your AWS configuration file, create a new profile using the `role_arn` from the role you created in step 1.
1. When installing the Observability Pipelines Worker, ensure you set the `AWS_PROFILE` and `AWS_CONFIG_FILE` environment variables. The `AWS_CONFIG_FILE` variable is the path to your AWS configuration file. Set `AWS_PROFILE` to the name of the profile you created in step 2. See [Configuration and credential file setting in the AWS CLI][10101] for more information. This is an example of a profile configuration:
    ```
    [profile profile_name]
    region = us-east-1
    output = json
    role_arn = arn:aws:iam::123456789:role/MyRole
    source_profile = default
    ```

[10101]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-user.html
[10102]: https://docs.aws.amazon.com/cli/v1/userguide/cli-configure-files.html