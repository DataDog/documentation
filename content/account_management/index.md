---
title: Account Management 
kind: documentation
autotocdepth: 2
customnav: accountmanagementnav
aliases: 
    - /guides/billing
---

Welcome to the Account Management section where you can learn

* [How to configure SAML][1]
* [How to have multiple Datadog account][2]
* [How to add/disable team members on your Datadog application][3]
* [How to configure your timezone][4]
* [How to edit your email notifications parameter][5]

We occasionally receive questions regarding the specifics of our pricing; the basic plans and the most frequently seen questions can be found below.

## Plan Overview

There are three plans within Datadog:


1. **Free** is only for 5 hosts or less. Free has a single day of data retention. The
    good news is that switching from the Free plan to Pro will not affect your
    setup, so anything you've begun monitoring would not be affected by that status
    change.
1. **Pro** is for 6-999 hosts and comes with 13 months of data retention.
    Pro includes metric alerts and email support.
1. **Enterprise** is for 1,000+ hosts or any number of hosts but needing custom adjustments to what is
    offered in the Pro plan. Enterprise includes phone support and pricing is based on three factors:
    1. Data retention requirements and number of custom metrics (base plan includes 13 months retention,
and 100 custom metrics)
    1. Size of your environment in servers
    1. Payment terms (month to month or annual prepaid)


Custom metrics are supported in every plan. A custom metric is any metric that is not automatically collected by any of [Datadog’s integrations][6] —for example custom checks or API-level metrics from your application. Each host may submit up to 100 custom metrics at no additional cost.

Docker Containers are also supported in every plan. Each host may submit metrics from 10 containers an hour at no additional cost. Additional containers will be billed at $0.002 per container per hour. In addition, Enterprise customers can purchase prepaid containers at $1 per container per month.

Pro and Enterprise data retention is for 13 months at full resolution (maximum is one point per second). For greater data retention needs, please reach out to [sales@datadoghq.com][7].

**Each invoice is determined by the high watermark of concurrently running hosts for that month.**

This is per active host in Datadog, whether or not it's running the agent.

## Billing FAQ

* [How does the usage details page help me understand my monthly usage?](https://help.datadoghq.com/hc/en-us/articles/115004097483-How-does-the-usage-details-page-help-me-understand-my-monthly-usage-)

* [Where do I find an overview of your pricing?](https://help.datadoghq.com/hc/en-us/articles/214616926-Where-do-I-find-an-overview-of-your-pricing-)

* [Do you support hourly pricing?](https://help.datadoghq.com/hc/en-us/articles/216094043-Do-you-support-hourly-pricing-)

* [How will an AWS integration impact my monthly billing?](https://help.datadoghq.com/hc/en-us/articles/214615086-How-will-an-AWS-integration-impact-my-monthly-billing-)

* [How will a Google Cloud integration impact my monthly billing?](https://help.datadoghq.com/hc/en-us/articles/115000568966-How-will-a-Google-Cloud-integration-impact-my-monthly-billing-)

* [How will a VMware vSphere integration impact my monthly billing?](https://help.datadoghq.com/hc/en-us/articles/115001169326-How-will-a-VMware-vSphere-integration-impact-my-monthly-billing-)

* [How will custom metrics impact my monthly bill?](https://help.datadoghq.com/hc/en-us/articles/115001797986-How-will-custom-metrics-impact-my-monthly-bill-)

* [How do you charge for containers?](https://help.datadoghq.com/hc/en-us/articles/218016463-How-do-you-charge-for-containers-)

* [What plan am I signed up for when I use my credit card?](https://help.datadoghq.com/hc/en-us/articles/214609786-What-plan-am-I-signed-up-for-when-I-use-my-credit-card-)

* [How do I update my credit card?](https://help.datadoghq.com/hc/en-us/articles/115002920306-How-do-I-update-my-credit-card-)

* [How are my bills calculated each month?](https://help.datadoghq.com/hc/en-us/articles/216099263-How-are-my-bills-calculated-each-month-)

* [How do I see what I’ll get charged for this current month?](https://help.datadoghq.com/hc/en-us/articles/216095263-How-do-I-see-what-I-ll-get-charged-for-this-current-month-)

* [Do non-reporting or inactive hosts count towards my bill?](https://help.datadoghq.com/hc/en-us/articles/203037549-Do-non-reporting-or-inactive-hosts-count-towards-my-bill-)

* [What are Kubernetes pause containers and will they impact my bill?](https://help.datadoghq.com/hc/en-us/articles/115002102206-What-are-Kubernetes-pause-containers-and-will-they-impact-my-bill-)

* [How can I change the Billing contact?](https://help.datadoghq.com/hc/en-us/articles/203764785-How-can-I-change-the-Billing-contact-)

* [I don't see anything in my billing history](https://help.datadoghq.com/hc/en-us/articles/203844125-I-don-t-see-anything-in-my-billing-history)

* [Where can I get a copy of the invoice?](https://help.datadoghq.com/hc/en-us/articles/203764795-Where-can-I-get-a-copy-of-the-invoice-)


[1]: /account_management/saml 
[2]: /account_management/multi_account
[3]: /account_management/team
[4]: /account_management/settings
[5]: /account_management/settings
[6]: https://www.datadoghq.com/product/integrations/
[7]: mailto:sales@datadoghq.com