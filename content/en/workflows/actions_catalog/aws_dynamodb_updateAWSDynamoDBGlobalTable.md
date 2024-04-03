---
bundle: com.datadoghq.aws.dynamodb
bundle_title: AWS DynamoDB
description: Updates a global table.
icon:
  integration_id: amazon-dynamodb
  type: integration_logo
input: '#/$defs/UpdateAWSDynamoDBGlobalTableInputs'
inputFieldOrder:
- region
- resourceId
- AttributeDefinitions
- BillingMode
- GlobalSecondaryIndexes
- WriteProvisionedThroughputSettings
- Replicas
- SSESpecification
- StreamSpecification
- TimeToLiveSpecification
keywords:
- modify
- put
- set
- update
output: '#/$defs/UpdateAWSDynamoDBGlobalTableOutputs'
permissions:
- dynamodb:Describe*
- dynamodb:CreateTableReplica
- dynamodb:UpdateTable
- dynamodb:UpdateTimeToLive
- dynamodb:UpdateContinuousBackups
- dynamodb:UpdateContributorInsights
- dynamodb:ListTagsOfResource
- dynamodb:Query
- dynamodb:Scan
- dynamodb:UpdateItem
- dynamodb:PutItem
- dynamodb:GetItem
- dynamodb:DeleteItem
- dynamodb:BatchWriteItem
- dynamodb:DeleteTable
- dynamodb:DeleteTableReplica
- dynamodb:UpdateItem
- dynamodb:TagResource
- dynamodb:UntagResource
- dynamodb:EnableKinesisStreamingDestination
- dynamodb:DisableKinesisStreamingDestination
- dynamodb:DescribeTableReplicaAutoScaling
- dynamodb:UpdateTableReplicaAutoScaling
- application-autoscaling:DeleteScalingPolicy
- application-autoscaling:DeleteScheduledAction
- application-autoscaling:DeregisterScalableTarget
- application-autoscaling:Describe*
- application-autoscaling:PutScalingPolicy
- application-autoscaling:PutScheduledAction
- application-autoscaling:RegisterScalableTarget
- kms:CreateGrant
- kms:Describe*
- kms:Get*
- kms:List*
- kms:RevokeGrant
- cloudwatch:PutMetricData
source: amazon-dynamodb
stability: dev
title: Update global table
---

Updates a global table.

{{< workflows >}}
