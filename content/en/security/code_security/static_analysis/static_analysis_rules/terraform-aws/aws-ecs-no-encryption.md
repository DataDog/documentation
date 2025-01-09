---
aliases:
- /continuous_integration/static_analysis/rules/terraform-aws/aws-ecs-no-encryption
- /static_analysis/rules/terraform-aws/aws-ecs-no-encryption
dependencies: []
disable_edit: true
group_id: terraform-aws
meta:
  category: Security
  id: terraform-aws/aws-ecs-no-encryption
  language: Terraform
  severity: Warning
  severity_rank: 2
title: Ensure ECS is using encryption
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `terraform-aws/aws-ecs-no-encryption`

**Language:** Terraform

**Severity:** Warning

**Category:** Security

## Description
This rule is designed to enforce the use of encryption in the Elastic Container Service (ECS). ECS is a highly scalable, high-performance container orchestration service that supports Docker containers and allows you to easily run and scale containerized applications on AWS. Ensuring the use of encryption is vital for securing your data and maintaining the integrity of your applications.

This rule has an important role in protecting sensitive data. When data is encrypted, it is transformed into an unreadable format that can only be deciphered with the correct encryption key. Therefore, even if an unauthorized party gains access to the data, they are not be able to understand it without the key. This is particularly crucial for applications that handle sensitive user data.

To comply with this rule and ensure good coding practices, you should enable encryption in your `aws_ecs_task_definition` resource. This can be done by setting the `transit_encryption` field to `"ENABLED"` in the `efs_volume_configuration` block. For example: `transit_encryption = "ENABLED"`. This ensures that data in transit is always encrypted, providing an additional layer of security to your ECS applications.

## Non-Compliant Code Examples
```terraform
resource "aws_ecs_task_definition" "mytask" {
  family = "service"
  container_definitions = file("task-definition.json")

  volume {
    name = "storage"
    efs_volume_configuration {
      file_system_id = aws_efs_file_system.fs.id
    }
  }
}
```

```terraform
resource "aws_ecs_task_definition" "mytask" {
  family = "service"
  container_definitions = file("task-definition.json")

  volume {
    name = "storage"
    efs_volume_configuration {
      file_system_id = aws_efs_file_system.fs.id
      transit_encryption = "DISABLED"
    }
  }
}
```

## Compliant Code Examples
```terraform
resource "aws_ecs_task_definition" "mytask" {
  family = "service"
  container_definitions = file("task-definition.json")

  volume {
    name = "storage"
    efs_volume_configuration {
      file_system_id = aws_efs_file_system.fs.id
      transit_encryption = "ENABLED"
    }
  }
}
```
