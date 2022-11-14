---
aliases:
- bdv-1hj-qoq
- /security_monitoring/default_rules/bdv-1hj-qoq
- /security_monitoring/default_rules/aws-ecr-new-public-image
disable_edit: true
iaas: aws
integration_id: ecr
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: ecr
security: attack
source: cloudtrail
tactic: TA0010-exfiltration
technique: T1567-exfiltration-over-web-service
title: New Public Repository Container Image detected in AWS ECR
type: security_rules
---

## Goal
Detect when a new image is uploaded to the public ECR. This could be a potential exfil route of data from the cloud. Could be a supply chain effect as well if a company hosts their containers here for consumers.

NOTE: Amazon ECR requires that users have permission to make calls to the `ecr-public:GetAuthorizationToken` and `sts:GetServiceBearerToken` API through an IAM policy before they can authenticate to a registry and push any images to an Amazon ECR repository.

## Strategy
Detect when `@evt.name:PutImage` is used against the `ecr-public.amazonaws.com` API. 

## Triage & Response
1. Check that `{{@responseElements.image.imageId.imageDigest}}` is a valid sha256 hash for the container image with a tag of `{{@responseElements.image.imageId.imageTag}}` in the `{{@responseElements.image.repositoryName}}` repository on AWS Account `{{@usr.account_id}}`.
2. If the hash is not valid for that container image, determine if the container image was placed there for a malicious purpose.
