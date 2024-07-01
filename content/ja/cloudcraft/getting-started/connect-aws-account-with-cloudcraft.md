---
title: Connect your AWS Account to Cloudcraft
---

Connecting your AWS accounts to Cloudcraft allows you to visualize your infrastructure by reverse-engineering the live environment's service relationships into a system architecture diagram. In addition to automatically generating diagrams, a budget model will also be created, and your imported components will display live status data directly in your diagrams. There is no limit on the number of AWS accounts you can connect to Cloudcraft.

**Note**: For AWS organizations, you must manually add the Cloudcraft role to each individual account in the organization.

This article walks you through connecting your AWS account to Cloudcraft.

## Requirements

- A Cloudcraft user with the [Owner or Administrator role][1].
- An active [Cloudcraft Pro subscription][2].
- An AWS account with permission to create IAM roles.

## How the live AWS sync works

Cloudcraft uses a [cross-account role to securely access your AWS environment][3]. As a result, you need to create a Cloudcraft-specific, read-only role in your AWS account. This role can be revoked at any time.

If having a read-only role with access to all components isn't permissible or violates your company's policies, you also have the option to [attach a stricter minimal access policy][4], only giving read-only access to the resources you want to use with Cloudcraft, further minimizing the amount of data the role can access.

Cloudcraft doesn't keep any of the live data from your AWS environment. Instead, it stores ARNs, which are unique identifiers for resources in AWS. This allows the application to link live data to components at runtime.

The data from your AWS environment is streamed in real-time to your browser via Cloudcraft's own AWS environment via role-based access, and is only stored client-side while you are using the application. When you close the application, the live data is deleted.

While not having write access to your account prevents Cloudcraft from offering certain features—like deleting an EC2 instance on both the diagram and your account—it's simply a more secure approach.

Cloudcraft implements rigorous security processes and controls for the SOC2 compliance program. You can read more about Cloudcraft's security program and controls on [the security page][5].

## Manage AWS accounts

### Add account

1. In Cloudcraft, navigate to **User** > **AWS accounts**.
2. At the bottom of the modal, click **Add AWS Account**.
3. The next page provides step-by-step instructions. Click **Open the AWS IAM Console to the Create Role page** to configures the read-only IAM role in AWS.

<div class="alert alert-info">If you can't access the <strong>Create Role</strong> page, you may lack <strong>AdministrativeAccess</strong> or sufficient IAM permissions to create a new IAM role. If this is the case, contact your AWS account's administrator and have them complete the following steps.</div>

4. On the **Create role** page in AWS, leave **Require MFA** unchecked, and click **Next**.

<div class="alert alert-info"><strong>Require MFA</strong> must be disabled as it's not applicable for system-to-system access where there is no human involved. Access is instead protected by being limited to access from the Cloucraft AWS account.</div>

{{< img src="cloudcraft/getting-started/connect-aws-account-with-cloudcraft/create-iam-role.png" alt="AWS Identity and Access Management console screen showing options for selecting trusted entities for role configuration." responsive="true" style="width:100%;">}}

5. Next, add permissions policies to your role. Type **ReadOnlyAccess** in the search box and press **Enter** to filter policies by name.
6. Select the **ReadOnlyAccess** policy that provides read-only access to AWS services and resources, then click **Next**.

{{< img src="cloudcraft/getting-started/connect-aws-account-with-cloudcraft/read-only-role.png" alt="AWS management console page with the 'ReadOnlyAccess' policy highlighted and selected." responsive="true" style="width:100%;">}}

7. Enter a name and description for the IAM role. You can also add tags to organize, track, or control access for the role. Tagging your role is optional. For tagging best practices, see [Best Practices for Tagging AWS Resources][6].
8. Click **Create role**.
9. Select the `cloudcraft` role from the list of roles. On the **Summary** page, copy the **Role ARN**.

{{< img src="cloudcraft/getting-started/connect-aws-account-with-cloudcraft/role-summary.png" alt="AWS IAM role configuration screen showing Role ARN for Cloudcraft integration." responsive="true" style="width:100%;">}}

10. In Cloudcraft, paste the ARN in the **Role ARN** field, and enter a name for your account.
11. Optionally, configure team access by clicking the blue button beneath **Team access** and selecting the teams you want to share access to the AWS account with.

{{< img src="cloudcraft/getting-started/connect-aws-account-with-cloudcraft/team-access.png" alt="Cloudcraft interface showing Team access options with Cloudcraft, Team Demo, and Cloudcraft Sales + Support team tags." responsive="true" style="width:100%;">}}

12. Click **Save Account**.

### Edit account

To edit an account, click the gray pencil icon to the left of the account you want to edit. You can change details of the account, such as the name, ARN, and team access.

When you are done, click **Save Account**.

### Remove account

To remove an account, click the trash can icon to the right of the account you want to remove, then click **Remove**.

[1]: /cloudcraft/account-management/roles-and-permissions/
[2]: https://www.cloudcraft.co/pricing
[3]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-user_externalid.html
[4]: /cloudcraft/advanced/minimal-iam-policy/
[5]: https://www.cloudcraft.co/security
[6]: https://docs.aws.amazon.com/whitepapers/latest/tagging-best-practices/tagging-best-practices.html
