---
title: How does Cloudcraft connect to my AWS account?
kind: guide
---

Cloudcraft makes use of cross-account roles to access your AWS account, which is considered [the secure way to access your AWS environment](http://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-user_externalid.html) by AWS themselves. Because of this, to use Cloudcraft connected with your AWS account, you need to create a secure read-only role in your AWS account that is specific to Cloudcraft and can easily be revoked at any time.

If you would like to restrict the access that Cloudcraft has even further, you can [create a stricter minimal access policy](https://help.cloudcraft.co/article/64-minimal-iam-policy), only giving read-only access to the components you want to use with Cloudcraft, further minimizing the amount of data the Cloudcraft role could theoretically access.

By design Cloudcraft does not store the data from a live scan of your environment. The generated blueprints only contains the minimal information necessary for the graphical blueprint representation, as well as so called ARN identifiers for AWS resources that link the diagram components to the live data at runtime.

The data from your AWS environment is streamed in real-time to your browser via Cloudcraft's own AWS environment and the role-based access, and is stored client-side while you are using the application; when you close the application, the live data is gone.

While not having write access to your account prevents us from offering certain features — like deleting an EC2 instance on both the diagram and your account —, it is simply a more secure approach.

We implement rigorous security processes and controls as part our SOC2 compliance program. You can read more about Cloudcraft's security program and controls on [our security page](https://www.cloudcraft.co/security).
