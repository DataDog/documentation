---
title: Severity Scoring
kind: documentation
further_reading:
- link: "/security/misconfigurations/"
  tag: "Documentation"
  text: "Start tracking misconfigurations with CSM Misconfigurations"
- link: "/security/identity_risks/"
  tag: "Documentation"
  text: "Understand your identity landscape with CSM Identity Risks"
- link: "/security/vulnerabilities/"
  tag: "Documentation"
  text: "Learn more about CSM Vulnerabilities"
---

## Cloud Security Management

### Misconfigurations and Identity Risks

Starting in early 2024, all CSM Misconfigurations and Identity Risk rules will migrate to our severity score framework. This framework is designed to compare the likelihood that an adversary will take advantage of a misconfiguration to the risk posed to your environment. By weighting both of these aspects, findings can be prioritized more accurately by their real-world risks. The matrices below show how to compute a misconfiguration's severity score depending on certain criteria.

#### Likelihood

The likelihood component is made up of two subcomponents; The attack vector, the means through which a misconfiguration can be exploited, and the accessibility, if the resource is publicly accessible or not.

|               |                     | Accessibility |          |
|---------------|---------------------|---------------|----------|
|               |                     | **Private**       | **Public**   |
| **Attack Vector** | **Required Privileges** | Low           | Medium   |
|               | **Vulnerability**       | Medium        | High     |
|               | **No Authorization**    | High          | Critical |

The attack vector is determined by the following criteria:

|    Attack Vector    |                                                 Definition                                                |
|:-------------------:|:---------------------------------------------------------------------------------------------------------:|
| Required Privileges | Requires specific privileges or access to abuse.                                                          |
| Vulnerability       | Requires a vulnerable component to abuse, such as a software vulnerability on a compute instance or a leaked password/access key. |
| No Authorization    | Requires no authorization/authentication to abuse.                                                        |

The accessibility is determined by the following criteria:

| Accessibility |                             Definition                             |
|:-------------:|:------------------------------------------------------------------:|
| Private       | The vulnerable component/resource is in a private network.         |
| Public        | The vulnerable component/resource is accessible from the internet. |

#### Impact

The impact component is how damaging the exploitation of the misconfiguration would be to the environment.

|  Impact  |                                                                                                                 Definition                                                                                                                |
|:--------:|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
|    Low   | This misconfiguration is related to security hardening, hygiene, resource metadata, or industry best practice configurations. By itself, this misconfiguration represents little to no impact to the environment.                                                                                                             |
|  Medium  | Abusing this misconfiguration results in an impact to the confidentiality, integrity, or availability of the vulnerable component or its directly associated resources.                                                                   |
|   High   | Abusing this misconfiguration results in an impact to the following: confidentiality, integrity or availability of the vulnerable component and impacts a significant number of other resources (E.G. S3FullAccess, EC2FullAccess, etc.). |
| Critical | Abusing this misconfiguration results in complete control of all resources in the account (E.G. AdministratorAccess)                                                                                                                      |

#### Severity Matrix

These two subcomponent scores combined compute the overall severity score for a misconfiguration.

|            |          | Impact |        |          |          |
|------------|----------|--------|--------|----------|----------|
|            |          | **Low**    | **Medium** | **High**     | **Critical** |
| **Likelihood** | **Low**      | Low    | Low    | Medium   | Medium   |
|            | **Medium**   | Low    | Medium | High     | High     |
|            | **High**     | Medium | High   | High     | Critical |
|            | **Critical** | Medium | High   | Critical | Critical |

#### Examples

To explain how the framework is used here are a few examples.

##### Example 1: SNS Topic should have access restrictions set for subscription

The detection rule for [SNS Topic should have access restrictions set for subscription][1] checks if the SNS topic has a resource-based policy that contains a `Principal` of `*`, and an `Action` with the `sns:Subscribe` permission. This combination would allow anyone the ability to subscribe to the SNS topic and receive its notifications. We score this rule as follows:

- Likelihood: Critical
  - Attack Vector: No Authorization
    - The Attack Vector is marked as "No Authorization" because the resource-based policy contains a `*`. This wildcard permits anyone the ability to act on the resource. No authentication/authorization is required to exploit the misconfiguration.
  - Accessibility: Public
    - The Accessibility is marked as "Public" because the misconfiguration can be exploited over the internet. No specific network access is required.

- Impact: Medium
  - Impact is marked as "Medium" due to the fact that the confidentiality of the resource is impacted. An adversary who has exploited this misconfiguration can receive messages as they are sent by the SNS topic.

- Severity Score: Critical x Medium = High
  - The final severity score is High. This is because a Critical likelihood mixed with a Medium impact results in an overall score of High.

##### Example 2: EC2 instances should enforce IMDSv2

The detection rule for [EC2 instances should enforce IMDSv2][2] checks if an EC2 instance is using the instance metadata service version 1 ([IMDSv1][3]), which is vulnerable to common web application attacks. If exploited, an adversary would be able to access the IAM credentials stored in the IMDS and use them to access resources in the AWS account. We score this rule as follows:

- Likelihood: Medium
  - Attack Vector: Vulnerability
    - The Attack Vector is marked as "Vulnerability". This is because the exploitation of this misconfiguration requires the resource to contain a vulnerable component, such as vulnerable software running on the EC2 instance that can be abused to perform [server side request forgery][4].
  - Accessibility: Private
    - The Accessibility is marked as "Private" because the EC2 instance has not explicitly been made public.

- Impact: Medium
  - Impact is marked as "Medium" due to the impacts to the confidentiality of the EC2 instance. An adversary would be able to access the IMDS and potentially pull IAM credentials associated with the resource.

- Severity Score: Medium x Medium = Medium
  - The final severity score is Medium. This is because a Medium likelihood mixed with a Medium impact results in an overall score of Medium.

### Vulnerabilities

**vulns go here**

## Application Security Management

**ASM goes here**

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/security/default_rules/aws-sns-subscription/
[2]: https://docs.datadoghq.com/security/default_rules/aws-ec2-imdsv2/
[3]: https://hackingthe.cloud/aws/general-knowledge/intro_metadata_service/
[4]: https://hackingthe.cloud/aws/exploitation/ec2-metadata-ssrf/
