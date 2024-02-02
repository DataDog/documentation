---
title: Connect your AWS Account to Cloudcraft
kind: documentation
---

Connecting your AWS accounts to Cloudcraft allows you to visualize your infrastructure by reverse-engineering the live environment's service relationships into a system architecture diagram. In addition to automatically generating diagrams, a budget model will also be created, and your imported components will display live status data directly in your diagrams.

This article will walk you through connecting your AWS account to Cloudcraft.

## Requirements

- A Cloudcraft user with the [Owner or Administrator role][1].
- An active [Cloudcraft Pro subscription][2].
- An AWS account with permission to create IAM roles.

## How the live AWS sync works

Cloudcraft uses a [cross-account role to access your AWS environment][3], the secure way to access your AWS environment. As a result, you will need to create a Cloudcraft-specific, read-only role on your AWS account. This role can be revoked at any time.

If having a read-only role with access to all components isn't permissible or violates your company's policies, you also have the option to [attach a stricter minimal access policy][4], only giving read-only access to the resources you want to use with Cloudcraft, further minimizing the amount of data the role can access.

Cloudcraft also doesn't keep any of the live data from your AWS environment; ARNs, which are unique identifiers for resources in AWS, are stored instead, which allow the application to link live data to components at runtime.

The data from your AWS environment is streamed in real-time to your browser via Cloudcraft's own AWS environment and the role-based access, and is stored client-side while you are using the application; when you close the application, the live data is deleted.

While not having write access to your account prevents us from offering certain features—like deleting an EC2 instance on both the diagram and your account—, it's simply a more secure approach.

We implement rigorous security processes and controls in our SOC2 compliance program. You can read more about Cloudcraft's security program and controls on [our security page][5].

## Manage AWS accounts

Head to **User → AWS accounts** inside Cloudcraft.

{{< img src="cloudcraft/getting-started/connect-aws-account-with-cloudcraft/manage-aws-accounts.png" alt="Screenshot of Cloudcraft's user interface for managing AWS accounts for live infrastructure visualization." responsive="true" style="width:100%;">}}

### Add account

At the bottom of the window, click the blue **Add AWS Account** button.

{{< img src="cloudcraft/getting-started/connect-aws-account-with-cloudcraft/add-aws-account.png" alt="Screenshot of Cloudcraft's AWS account integration interface with 'Add AWS Account' button and Cloudcraft account details." responsive="true" style="width:100%;">}}

The next screen will provide step-by-step instructions and a link that configures the read-only IAM role for you. Click the blue **Open the AWS IAM Console to the Create Role page** link.

<section class="alert alert-info">
  <p>If you can't access the <strong>Create Role</strong> page, you may lack <strong>AdministrativeAccess</strong> or sufficient IAM permissions to create a new IAM role. In this case, please have your AWS account's administrator follow this documentation.</p>
</section>

{{< img src="cloudcraft/getting-started/connect-aws-account-with-cloudcraft/open-iam-console.png" alt="Screenshot of instructions for adding an AWS account in Cloudcraft with a focus on opening the AWS IAM Console." responsive="true" style="width:100%;">}}

The link will open the **Create role** page in AWS with a few details already filled, like **Account ID** and **External ID**. Leave **Require MFA** unchecked, and click **Next** at the bottom of the screen.

<section class="alert alert-info">
  <p><strong>Require MFA</strong> must be disabled because it's not applicable for system-to-system access where there is no human involved. The access is instead protected by being limited to access from the Cloucraft AWS account.</p>
</section>

{{< img src="cloudcraft/getting-started/connect-aws-account-with-cloudcraft/create-iam-role.png" alt="AWS Identity and Access Management console screen showing options for selecting trusted entities for role configuration." responsive="true" style="width:100%;">}}

<p>On the next prompt you will be asked to add permissions policies to your role. Type <strong>ReadOnlyAccess</strong> in the search box and press <kbd>Enter</kbd> to filter policies by name.

{{< img src="cloudcraft/getting-started/connect-aws-account-with-cloudcraft/filter-permission-policies.png" alt="AWS interface showing the 'Add Permissions' step with ReadOnlyAccess typed into the search box for filtering roles by policy name." responsive="true" style="width:100%;">}}

AWS has quite a few policies that end with **ReadOnlyAccess**, but the one we're looking for can usually be found on the second page of results. Navigate to that page, select the **ReadOnlyAccess** policy, and click **Next** at the bottom to proceed.

{{< img src="cloudcraft/getting-started/connect-aws-account-with-cloudcraft/read-only-role.png" alt="AWS management console screen showing how to add 'ReadOnlyAccess' policy with pagination controls and 'ReadOnlyAccess' policy highlighted and selected." responsive="true" style="width:100%;">}}

The next screen allows you to name, provide a description for, and review your new IAM role.

{{< img src="cloudcraft/getting-started/connect-aws-account-with-cloudcraft/review-iam-role.png" alt="AWS console IAM role creation screen with fields for naming and describing the new role for Cloudcraft integration." responsive="true" style="width:100%;">}}

You can also add tags to organize, track, or control access for this role. Tagging your role is optional, but feel free to read [tagging best practices][6] and use the feature if you prefer.

If everything looks good to you, click **Create role** button, which will, you guessed it, create the role we just configured.

Click the cloudcraft role from the list of roles that shows up. Look for the **Role ARN** in the **Summary** page of your role, copy it, and head back to Cloudcraft.

{{< img src="cloudcraft/getting-started/connect-aws-account-with-cloudcraft/role-summary.png" alt="AWS IAM role configuration screen showing Role ARN for Cloudcraft integration." responsive="true" style="width:100%;">}}

Back in Cloudcraft, paste the **Role ARN** in the proper field, and give your account a name for later identification.

{{< img src="cloudcraft/getting-started/connect-aws-account-with-cloudcraft/role-arn.png" alt="Screenshot of Cloudcraft's AWS integration setup with Cloudcraft role ARN input and account naming in configuration settings." responsive="true" style="width:100%;">}}

Before saving this account, you can optionally configure team access. Click on the blue button beneath **Team access** and select the teams to share access to the AWS account with.

{{< img src="cloudcraft/getting-started/connect-aws-account-with-cloudcraft/team-access.png" alt="Cloudcraft interface showing Team access options with Cloudcraft, Team Demo, and Cloudcraft Sales + Support team tags." responsive="true" style="width:100%;">}}

Now click the blue **Save Account** link at the bottom of the screen and that's it, your AWS account has been added to Cloudcraft and is ready to be used within the application.

{{< img src="cloudcraft/getting-started/connect-aws-account-with-cloudcraft/account-added.png" alt="Screenshot of Cloudcraft interface for managing AWS accounts with an account added." responsive="true" style="width:100%;">}}

### Edit account

Click the gray pencil icon to the left of the account you want to edit.

{{< img src="cloudcraft/getting-started/connect-aws-account-with-cloudcraft/edit-aws-account.png" alt="Screenshot of Cloudcraft interface for managing AWS cloud accounts highlighting the 'Edit account' icon." responsive="true" style="width:100%;">}}

In this screen you can change details of the account, such as the name, ARN, and team access.

When you are done, click **Save Account**.

### Remove account

Click the gray trash can icon to the right of the account you want to remove.

{{< img src="cloudcraft/getting-started/connect-aws-account-with-cloudcraft/remove-aws-account.png" alt="Screenshot of Cloudcraft interface for managing AWS cloud accounts highlighting the 'Delete account' icon." responsive="true" style="width:100%;">}}

Next, click the red **Remove** button.

{{< img src="cloudcraft/getting-started/connect-aws-account-with-cloudcraft/confirm-account-removal.png" alt="Warning message for removing an AWS cloud account with the name Cloudcraft Development highlighted in the confirmation dialog." responsive="true" style="width:100%;">}}

## Common questions

**Is there is a limit of AWS accounts you can add?**

You can connect an infinite number of AWS accounts to Cloudcraft. There is no limit.

**For AWS organizations, will Cloudcraft automatically add all my AWS accounts?**

No, you would need to add the Cloudcraft role to each individual account under the organization. The AWS organization structure or existing cross-account roles doesn't help at this time.

<hr>

If you have any questions or trouble with the process, [get in touch with our support team][7], and we will be happy to help.

[1]: https://help.cloudcraft.co/article/85-roles-and-permissions
[2]: https://www.cloudcraft.co/pricing
[3]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-user_externalid.html
[4]: https://help.cloudcraft.co/article/64-minimal-iam-policy
[5]: https://www.cloudcraft.co/security
[6]: https://d1.awsstatic.com/whitepapers/aws-tagging-best-practices.pdf
[7]: https://app.cloudcraft.co/app/support
