---
title: Severity Scoring
further_reading:
- link: "/security/cloud_security_management/misconfigurations/"
  tag: "Documentation"
  text: "Start tracking misconfigurations with CSM Misconfigurations"
- link: "/security/cloud_security_management/identity_risks/"
  tag: "Documentation"
  text: "Understand your identity landscape with CSM Identity Risks"
- link: "/security/cloud_security_management/vulnerabilities/"
  tag: "Documentation"
  text: "Learn more about CSM Vulnerabilities"
---

Accurate severity scores help security teams understand the risks that vulnerabilities pose to their environment. This guide explains how Cloud Security Management (CSM) uses different measures of severity to calculate the scores.

## CSM severity scoring framework

CSM Misconfigurations, CSM Identity Risks, and Security Inbox misconfigurations use the CSM severity scoring framework to determine the severity of a finding. The framework compares the likelihood that an adversary would take advantage of a misconfiguration to the risk posed to your environment. By weighting both of these aspects, findings can be prioritized more accurately by real-world risks. The matrices below show how a misconfiguration's severity score is computed based on its likelihood of abuse and impact.

### Likelihood

The likelihood component is made up of two subcomponents:

* **Attack vector**: The means through which a misconfiguration can be exploited.
* **Accessibility**: If the resource is publicly accessible or not.

#### Attack vector 

The attack vector is determined by the following criteria:

|    Attack Vector    |                                                              Definition                                                              |
|:-------------------:|:------------------------------------------------------------------------------------------------------------------------------------:|
| Required Privileges |                                           Requires specific privileges or access to abuse.                                           |
|    Vulnerability    | Requires a vulnerable component to abuse, such as a software vulnerability on a compute instance or a leaked password or access key. |
|  No Authorization   |                                        Requires no authorization or authentication to abuse.                                         |

#### Accessibility

Accessibility is determined by the following criteria:

| Accessibility |                              Definition                               |
|:-------------:|:---------------------------------------------------------------------:|
|    Private    |     The vulnerable component or resource is in a private network.     |
|    Public     | The vulnerable component or resource is accessible from the internet. |

#### Likelihood score

Together, the attack vector and accessibility determine the Likelihood score:

| Attack Vector           | Accessibility |                 |
|-------------------------|---------------|-----------------|
|                         | **Private**   | **Public**      |
| **Required Privileges** | Improbable    | Possible        |
| **Vulnerability**       | Possible      | Probable        |
| **No Authorization**    | Probable      | Highly Probable |

### Impact

The impact component is how damaging the exploitation of the misconfiguration would be to the environment.

|  Impact  |                                                                                                                 Definition                                                                                                                |
|:--------:|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
|    Low   | This misconfiguration is related to security hardening, hygiene, resource metadata, or industry best practice configurations. By itself, this misconfiguration represents little to no impact to the environment.                                                                                                             |
|  Medium  | Abusing this misconfiguration results in an impact to the confidentiality, integrity, or availability of the vulnerable component or its directly associated resources.                                                                   |
|   High   | Abusing this misconfiguration results in an impact to the confidentiality, integrity, or availability of the vulnerable component and impacts a significant number of other resources. For example, an identity with the `S3FullAccess` policy attached. |
| Critical | Abusing this misconfiguration results in complete control of all resources in the account. For example, an identity with the `AdministratorAccess` policy attached. |

### Severity scoring matrix

The likelihood and impact components are used to compute the overall severity score for a misconfiguration.

| Likelihood          | Impact  |            |          |              |
|---------------------|---------|------------|----------|--------------|
|                     | **Low** | **Medium** | **High** | **Critical** |
| **Improbable**      | Low     | Low        | Medium   | Medium       |
| **Possible**        | Low     | Medium     | High     | High         |
| **Probable**        | Medium  | High       | High     | Critical     |
| **Highly Probable** | Medium  | High       | Critical | Critical     |

### Examples

To explain how the framework is used here are a few examples.

#### Example 1: SNS Topic should have access restrictions set for subscription

The detection rule for [SNS Topic should have access restrictions set for subscription][1] checks if the SNS topic has a resource-based policy that contains a `Principal` of `*`, and an `Action` with the `sns:Subscribe` permission. This combination gives anyone the ability to subscribe to the SNS topic and receive its notifications. 

Using the CSM severity scoring framework, the rule would be scored as follows:

- **Likelihood score**: Highly Probable
  - **Attack vector**: No Authorization
    - The Attack Vector is marked as "No Authorization" because the resource-based policy contains a `*`. This wildcard grants anyone the ability to act on the resource. No authentication or authorization is required to exploit the misconfiguration.
  - **Accessibility**: Public
    - Accessibility is marked as "Public" because the misconfiguration can be exploited over the internet through its resource-based policy. No specific network access is required.
- **Impact**: Medium
  - Impact is marked as "Medium" due to the fact that the confidentiality of the resource is impacted. An adversary who exploits this misconfiguration can receive messages sent by the SNS topic.
- **Severity score**: Highly Probable x Medium = High
  - The final severity score is High. This is because a Highly Probable likelihood mixed with a Medium impact results in an overall score of High.

#### Example 2: EC2 instances should enforce IMDSv2

The detection rule for [EC2 instances should enforce IMDSv2][2] checks if an EC2 instance is using the Instance Metadata Service Version 1 ([IMDSv1][3]), which is vulnerable to common web application attacks. If exploited, an adversary can obtain access to the IAM credentials stored in the IMDS and use them to access resources in the AWS account.

Using the CSM severity scoring framework, the rule would be scored as follows:

- **Likelihood score**: Possible
  - **Attack vector**: Vulnerability
    - The attack vector is marked as "Vulnerability". This is because the exploitation of this misconfiguration requires the resource to contain a vulnerable component, such as vulnerable software running on the EC2 instance that can be abused to perform [server side request forgery][4] attacks.
  - **Accessibility**: Private
    - Accessibility is marked as "Private", because the EC2 instance has not explicitly been made public.
- **Impact**: Medium
  - Impact is marked as "Medium" due to the impacts to the confidentiality of the EC2 instance. An adversary would be able to access the IMDS and potentially pull IAM credentials associated with the resource.
- **Severity score**: Possible x Medium = Medium
  - The final severity score is "Medium". This is because a possible likelihood mixed with a Medium impact results in an overall score of Medium.

## CVSS 3.0

CSM Vulnerabilities uses Common Vulnerability Scoring System version 3.0 ([CVSS 3.0][5]) to determine a base score for a vulnerability. It then modifies the base score to take into account the following:

- Whether the underlying infrastructure is running and how wide-spread the impact is.
- The environment in which the underlying infrastructure is running. For example, if the environment is not production, the severity is downgraded.
- Whether there is an active exploit for a given vulnerability from sources such as [CISA KEV catalog][6].
- The exploitation probability, calculated and verified using [EPSS][7].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/security/default_rules/aws-sns-subscription/
[2]: https://docs.datadoghq.com/security/default_rules/aws-ec2-instance-ec2-instances-should-enforce-imdsv2/
[3]: https://hackingthe.cloud/aws/general-knowledge/intro_metadata_service/
[4]: https://hackingthe.cloud/aws/exploitation/ec2-metadata-ssrf/
[5]: https://www.first.org/cvss/v3-0/
[6]: https://www.cisa.gov/known-exploited-vulnerabilities-catalog
[7]: https://www.first.org/epss/
