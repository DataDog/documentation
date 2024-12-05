---
title: How does Cloudcraft connect to my AWS account?
---

Cloudcraft uses cross-account roles to access your AWS account, which is considered [the secure way to access your AWS environment][1] by AWS themselves. Because of this, you must create a secure read-only role in your AWS account that is specific to Cloudcraft and can easily be revoked at any time.

To restrict the access that Cloudcraft has even further, you can [create a stricter minimal access policy][2] that gives read-only access to the components you want to use with Cloudcraft, further minimizing the amount of data the Cloudcraft role could theoretically access.

By design, Cloudcraft does not store the data from a live scan of your environment. The generated blueprints only contain the minimal information required for the graphical blueprint representation, as well as ARN identifiers for AWS resources that link the diagram components to the live data at runtime.

The data from your AWS environment is streamed in real-time to your browser via Cloudcraft's own AWS environment using role-based access, and is stored client-side while you are using the application. When you close the application, the live data is removed.

While not having write access to your account prevents Cloudcraft from offering certain features — like deleting an EC2 instance on both the diagram and your account — it is simply a more secure approach.

Cloudcraft implements rigorous security processes and controls as part of the SOC2 compliance program. You can read more about Cloudcraft's security program and controls on the [security page][3].

[1]: http://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-user_externalid.html
[2]: /cloudcraft/advanced/minimal-iam-policy/
[3]: https://www.cloudcraft.co/security
