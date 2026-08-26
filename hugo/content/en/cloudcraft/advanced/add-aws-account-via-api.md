---
title: Add AWS accounts via the Cloudcraft API
---

Cloudcraft currently doesn't offer a way to add multiple AWS accounts at once using the web interface, but you can do so via [the API][1].

<div class="alert alert-info">The ability to add and scan AWS accounts, as well as to use Cloudcraft's developer API, is only available to Pro subscribers. Check out <a href="https://www.cloudcraft.co/pricing">Cloudcraft's pricing page</a> for more information.</div>

## Prerequisites

Before you begin, make sure you have the following:

- A Cloudcraft user with the [Owner or Administrator role][2].
- An active [Cloudcraft Pro subscription][3].
- An AWS account with permission to create IAM roles.
- A Unix-like environment, such as Linux, macOS, or WSL on Windows with cURL and [the AWS CLI][4] installed.
- A basic understanding of the command-line interface.
- A basic understanding of how to use APIs.

## Getting the AWS IAM role parameters

Start by using the [Get my AWS IAM Role parameters][5] endpoint of Cloudcraft's API and saving the response.

To accomplish this, open the command line and enter the following cURL command:

{{< code-block lang="shell" >}}
curl \
  --url 'https://api.cloudcraft.co/aws/account/iamParameters' \
  --tlsv1.2 \
  --proto '=https' \
  --compressed \
  --silent \
  --header "Authorization: Bearer ${API_KEY}"
{{< /code-block >}}

Replace `API_KEY` with your Cloudcraft API key. The response should look something like this:

{{< code-block lang="json" filename="cloudcraft-response.json" >}}
{
  "accountId": "1234567890",
  "externalId": "ex53e827-a724-4a2a-9fec-b13761540785",
  "awsConsoleUrl": "https://console.aws.amazon.com/iam/home?#/roles..."
}
{{< /code-block >}}

Save a copy of the `accountId` and `externalId` fields, as you'll need them when creating the IAM role in the next step.

## Creating the IAM role

Next, use the _create-role_ command in the AWS CLI to create the IAM role.

{{< code-block lang="shell" >}}
aws iam create-role \
  --role-name 'cloudcraft' \
  --description 'Programmatically created IAM role for use with Cloudcraft.' \
  --max-session-duration '3600' \
  --assume-role-policy-document '{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Principal":{"AWS":"arn:aws:iam::ACCOUNT_ID:root"},"Action":"sts:AssumeRole","Condition":{"StringEquals":{"sts:ExternalId":"EXTERNAL_ID"}}}]}' \
  --query 'Role.Arn' \
  --output 'text'
{{< /code-block >}}

Replace `ACCOUNT_ID` and `EXTERNAL_ID` with the values you got in the previous step.

If successful, a response with the role's account ARN is displayed. Save this value for later.

However, the role has no permission attached to it yet. To connect the `ReadOnlyAccess` role, use the `attach-role-policy` command in the AWS CLI.

{{< code-block lang="shell" >}}
aws iam attach-role-policy \
  --role-name 'cloudcraft' \
  --policy-arn 'arn:aws:iam::aws:policy/ReadOnlyAccess'
{{< /code-block >}}

**Note**: If you gave the role a different name in the previous step, make sure you replace _cloudcraft_ with the name you used.

## Adding the AWS account to Cloudcraft

Finally, once you've created the IAM role, you can add the AWS account to Cloudcraft. You can do that by using the ARN of the role you created and calling [Cloudcraft's developer API][7].

{{< code-block lang="shell" >}}
curl \
  --url 'https://api.cloudcraft.co/aws/account' \
  --tlsv1.2 \
  --proto '=https' \
  --silent \
  --header 'Content-Type: application/json' \
  --header "Authorization: Bearer ${API_KEY}" \
  --data-raw '{"name":"AWS_ACCOUNT_NAME","roleArn":"ROLE_ARN","region":"us-east-1"}' \
{{< /code-block >}}

Replace `AWS_ACCOUNT_NAME` with the name you want the account to have in Cloudcraft and `ROLE_ARN` with the ARN of the role you created in the previous step. You must also replace `us-east-1` with the region you want the account to be checked from, and `API_KEY` with your API key.

After you successfully add the account, you can use the same command to add additional accounts to Cloudcraft.

[1]: https://developers.cloudcraft.co/
[2]: https://help.cloudcraft.co/article/85-roles-and-permissions
[3]: https://www.cloudcraft.co/pricing
[4]: https://aws.amazon.com/cli/
[5]: https://developers.cloudcraft.co/#aa18999e-f6da-4628-96bd-49d5a286b928
[6]: https://app.cloudcraft.co/support
[7]: https://developers.cloudcraft.co
