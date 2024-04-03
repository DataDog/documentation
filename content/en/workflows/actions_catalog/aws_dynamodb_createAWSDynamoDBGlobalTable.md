---
bundle: com.datadoghq.aws.dynamodb
bundle_title: AWS DynamoDB
description: Creates a global table.
icon:
  integration_id: amazon-dynamodb
  type: integration_logo
input: '#/$defs/CreateAWSDynamoDBGlobalTableInputs'
inputFieldOrder:
- region
- AttributeDefinitions
- BillingMode
- GlobalSecondaryIndexes
- KeySchema
- LocalSecondaryIndexes
- WriteProvisionedThroughputSettings
- Replicas
- SSESpecification
- StreamSpecification
- TableName
- TimeToLiveSpecification
output: '#/$defs/CreateAWSDynamoDBGlobalTableOutputs'
permissions:
- dynamodb:CreateTable
- dynamodb:CreateTableReplica
- dynamodb:Describe*
- dynamodb:UpdateTimeToLive
- dynamodb:UpdateContributorInsights
- dynamodb:UpdateContinuousBackups
- dynamodb:ListTagsOfResource
- dynamodb:Query
- dynamodb:Scan
- dynamodb:UpdateItem
- dynamodb:PutItem
- dynamodb:GetItem
- dynamodb:DeleteItem
- dynamodb:BatchWriteItem
- dynamodb:TagResource
- dynamodb:EnableKinesisStreamingDestination
- dynamodb:DisableKinesisStreamingDestination
- dynamodb:DescribeTableReplicaAutoScaling
- dynamodb:UpdateTableReplicaAutoScaling
- dynamodb:TagResource
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
title: Create global table
---

Creates a global table.

{{< workflows >}}
