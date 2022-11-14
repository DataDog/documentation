---
aliases:
- kq2-xck-hec
- /security_monitoring/default_rules/kq2-xck-hec
- /security_monitoring/default_rules/aws-ecr-new-private-image
disable_edit: true
iaas: aws
integration_id: ecr
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: ecr
security: attack
source: cloudtrail
tactic: TA0003-persistence
technique: T1525-implant-internal-image
title: New Private Repository Container Image detected in AWS ECR
type: security_rules
---

## Goal
Detect potential persistence mechanisms being deployed in the AWS Elastic Container Registry (ECR).

NOTE: Amazon ECR requires that users have permission to make calls to the `ecr:GetAuthorizationToken` API through an IAM policy before they can authenticate to a registry and push or pull any images from any Amazon ECR repository.

## Strategy
Detect when `@evt.name:PutImage` is used against the `ecr.amazonaws.com` API. 

## Triage & Response
1. Check that `{{@responseElements.image.imageId.imageDigest}}` is a valid sha256 hash for the container image with a tag of `{{@responseElements.image.imageId.imageTag}}` in the `{{@responseElements.image.repositoryName}}` repository on AWS Account `{{@usr.account_id}}`.
2. If the hash is not valid for that container image, determine if the container image was placed there for a malicious purpose.
