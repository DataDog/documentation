---
title: Security Findings Schema Reference
description: "Complete reference for the Security Findings schema, including all attributes, namespaces, and data model for querying vulnerabilities, misconfigurations, and security risks."
disable_toc: true
further_reading:
- link: "/security/cloud_security_management/"
  tag: "Documentation"
  text: "Cloud Security Management"
- link: "/security/code_security/"
  tag: "Documentation"
  text: "Code Security"
- link: "/security/application_security/"
  tag: "Documentation"
  text: "Application Security"
---

## Overview

Security findings in Datadog represent vulnerabilities, misconfigurations, and security risks identified across your infrastructure and applications. Each finding contains structured data organized into namespaces that describe the nature, impact, status, and context of the security issue.

All findings share a common schema that enables unified querying and analysis across different security products.

{{< learning-center-callout header="" btn_title="Learn more" btn_url="/security/guide/security-findings-migration/" hide_image="true" >}}
  Learn about migrating to this new schema so you can avoid any interruptions to your workflows.
{{< /learning-center-callout >}}

## Examples

There are eleven different categories for security findings. Click on a category to view a sample security finding belonging to that category.
{{< tabs >}}
{{% tab "API Security" %}}

```json
{
  "api_endpoint": {
    "method": "GET",
    "operation_name": "http.request",
    "path": "/api/v2/users/{userID}/profile",
    "resource_name": "GET /api/v2/users/{userID}/profile"
  },
  "base_severity": "critical",
  "container_image": {
    "name": "123456789012.dkr.ecr.us-east-1.amazonaws.com/my-app:v1.0.0",
    "registries": [
      "123456789012.dkr.ecr.us-east-1.amazonaws.com"
    ],
    "repo_digests": [
      "sha256:abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890"
    ]
  },
  "description": "The API endpoint exposes user profile data through a route that uses predictable sequential IDs, allowing an attacker to enumerate and access other users' profiles by incrementing the ID parameter.",
  "detection_changed_at": 1738575599859,
  "exposure_time_seconds": 300,
  "finding_id": "AbCdEfGhIjKlMnOpQrStUvWx",
  "finding_type": "api_security",
  "first_seen_at": 1738575592659,
  "is_in_security_inbox": false,
  "last_seen_at": 1738624280889,
  "metadata": {
    "schema_version": "2"
  },
  "origin": [
    "agentless-scanner"
  ],
  "remediation": {
    "is_available": false
  },
  "resource_id": "example-resource-id",
  "resource_name": "example-resource",
  "resource_type": "example_resource_type",
  "rule": {
    "default_rule_id": "def-000-abc",
    "id": "api-sec-001",
    "name": "Read operation on route use predictable IDs",
    "type": "api_security",
    "version": 3
  },
  "service": {
    "name": "chatbot-api"
  },
  "severity": "critical",
  "severity_details": {
    "adjusted": {
      "score": 9.8,
      "value": "Critical",
      "vector": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:C/C:H/I:H/A:H/RC:C"
    },
    "base": {
      "score": 9.8,
      "value": "Critical",
      "vector": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:C/C:H/I:H/A:H/RC:C"
    }
  },
  "status": "open",
  "title": "Read operation on route use predictable IDs",
  "workflow": {
    "auto_closed_at": 1738575600859,
    "automations": {
      "rule_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "rule_name": "mute misconfigs with free text query",
      "rule_type": "mute"
    },
    "due_date": {
      "due_at": 1738575599859,
      "is_overdue": false,
      "rule_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
    },
    "integrations": {
      "cases": {
        "assignee": {
          "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          "name": "Alice"
        },
        "created_at": 1738575599859,
        "created_by": {
          "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          "name": "Alice"
        },
        "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        "jira_issue": {
          "key": "PROJ-12345",
          "status": "To Do",
          "url": "https://your-org.atlassian.net/browse/PROJ-12345"
        },
        "key": "CASE-42",
        "status": "open",
        "updated_at": 1738575599859,
        "updated_by": {
          "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          "name": "Alice"
        }
      }
    },
    "mute": {
      "description": "Free text",
      "expire_at": 1738575599859,
      "is_muted": false,
      "is_muted_by_rule": false,
      "muted_at": 1738575599859,
      "muted_by": {
        "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        "name": "Alice"
      },
      "reason": "Resource deleted"
    },
    "triage": {
      "assignee": {
        "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        "name": "Alice",
        "updated_at": 1738575600859,
        "updated_by": {
          "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          "name": "Alice"
        }
      }
    }
  },
  "tags": [
    "origin:agentless-scanner",
    "source:vulnerability_management"
  ]
}
```

{{% /tab %}}
{{% tab "Attack Path" %}}

```json
{
  "base_severity": "critical",
  "cloud_resource": {
    "account": {
      "account": "Main production account",
      "account_id": "123456789012"
    },
    "cloud_provider": "AWS",
    "cloud_provider_url": "https://us-east-1.console.aws.amazon.com/ec2/home#Instances:instanceId=i-0123456789abcdef0",
    "configuration": {
      "account_id": "123456789012",
      "ami_launch_index": 0,
      "architecture": "x86_64",
      "aws_ami_key": "abcdef0123456789abcdef0123456789",
      "aws_iam_instance_profile_key": "abcdef0123456789abcdef0123456789",
      "aws_subnet_key": "abcdef0123456789abcdef0123456789",
      "aws_vpc_key": "abcdef0123456789abcdef0123456789",
      "block_device_mappings": [
        {
          "device_name": "/dev/sdf",
          "ebs": {
            "attach_time": 1734064859000,
            "delete_on_termination": true,
            "status": "attached",
            "volume_id": "vol-0123456789abcdef0"
          }
        }
      ]
    },
    "display_name": "i-012abcd34efghi56",
    "key": "arn:aws:ec2:us-east-1:123456789012:instance/i-012abcd34efghi56"
  },
  "compliance": {
    "evaluation": "fail"
  },
  "container_image": {
    "name": "123456789012.dkr.ecr.us-east-1.amazonaws.com/my-app:v1.0.0",
    "registries": [
      "123456789012.dkr.ecr.us-east-1.amazonaws.com"
    ],
    "repo_digests": [
      "sha256:abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890"
    ]
  },
  "description": "A publicly accessible EC2 instance with an attached IAM role has overly permissive policies that allow lateral movement to sensitive S3 buckets containing production data.",
  "detection_changed_at": 1738575599859,
  "exposure_time_seconds": 300,
  "finding_id": "AbCdEfGhIjKlMnOpQrStUvWx",
  "finding_type": "attack_path",
  "first_seen_at": 1738575592659,
  "is_in_security_inbox": false,
  "last_seen_at": 1738624280889,
  "metadata": {
    "schema_version": "2"
  },
  "origin": [
    "agentless-scanner"
  ],
  "resource_id": "example-resource-id",
  "resource_name": "example-resource",
  "resource_type": "example_resource_type",
  "risk_details": {
    "is_publicly_accessible": {
      "evidence": {
        "resource_key": "arn:aws:elasticloadbalancing:us-east-1:123456789012:loadbalancer/app/my-alb/1234567890abcdef"
      }
    }
  },
  "rule": {
    "default_rule_id": "def-000-abc",
    "id": "def-000-ap1",
    "name": "EC2 instance with public access and overprivileged IAM role",
    "type": "attack_path",
    "version": 3
  },
  "severity": "critical",
  "severity_details": {
    "adjusted": {
      "score": 9.8,
      "value": "Critical",
      "vector": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:C/C:H/I:H/A:H/RC:C"
    },
    "base": {
      "score": 9.8,
      "value": "Critical",
      "vector": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:C/C:H/I:H/A:H/RC:C"
    }
  },
  "status": "open",
  "title": "Publicly accessible instance with overprivileged IAM role",
  "workflow": {
    "auto_closed_at": 1738575600859,
    "automations": {
      "rule_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "rule_name": "mute misconfigs with free text query",
      "rule_type": "mute"
    },
    "due_date": {
      "due_at": 1738575599859,
      "is_overdue": false,
      "rule_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
    },
    "integrations": {
      "cases": {
        "assignee": {
          "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          "name": "Alice"
        },
        "created_at": 1738575599859,
        "created_by": {
          "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          "name": "Alice"
        },
        "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        "jira_issue": {
          "key": "PROJ-12345",
          "status": "To Do",
          "url": "https://your-org.atlassian.net/browse/PROJ-12345"
        },
        "key": "CASE-42",
        "status": "open",
        "updated_at": 1738575599859,
        "updated_by": {
          "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          "name": "Alice"
        }
      }
    },
    "mute": {
      "description": "Free text",
      "expire_at": 1738575599859,
      "is_muted": false,
      "is_muted_by_rule": false,
      "muted_at": 1738575599859,
      "muted_by": {
        "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        "name": "Alice"
      },
      "reason": "Resource deleted"
    },
    "triage": {
      "assignee": {
        "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        "name": "Alice",
        "updated_at": 1738575600859,
        "updated_by": {
          "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          "name": "Alice"
        }
      }
    }
  },
  "tags": [
    "origin:agentless-scanner",
    "source:vulnerability_management"
  ]
}
```

{{% /tab %}}
{{% tab "Host & Container Vulnerability" %}}

```json
{
  "advisory": {
    "aliases": [
      "CVE-2024-12345"
    ],
    "cve": "CVE-2024-12345",
    "id": "TRIVY-CVE-2024-12345"
  },
  "base_severity": "critical",
  "cloud_resource": {
    "account": {
      "account": "Main production account",
      "account_id": "123456789012"
    },
    "cloud_provider": "AWS",
    "cloud_provider_url": "https://us-east-1.console.aws.amazon.com/ec2/home#Instances:instanceId=i-0123456789abcdef0",
    "configuration": {
      "account_id": "123456789012",
      "ami_launch_index": 0,
      "architecture": "x86_64",
      "aws_ami_key": "abcdef0123456789abcdef0123456789",
      "aws_iam_instance_profile_key": "abcdef0123456789abcdef0123456789",
      "aws_subnet_key": "abcdef0123456789abcdef0123456789",
      "aws_vpc_key": "abcdef0123456789abcdef0123456789",
      "block_device_mappings": [
        {
          "device_name": "/dev/sdf",
          "ebs": {
            "attach_time": 1734064859000,
            "delete_on_termination": true,
            "status": "attached",
            "volume_id": "vol-0123456789abcdef0"
          }
        }
      ]
    },
    "display_name": "i-012abcd34efghi56",
    "key": "arn:aws:ec2:us-east-1:123456789012:instance/i-012abcd34efghi56"
  },
  "container_image": {
    "name": "123456789012.dkr.ecr.us-east-1.amazonaws.com/my-app:v1.0.0",
    "registries": [
      "123456789012.dkr.ecr.us-east-1.amazonaws.com"
    ],
    "repo_digests": [
      "sha256:abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890"
    ]
  },
  "description": "A buffer overflow vulnerability in the Linux kernel allows a local attacker to escalate privileges by exploiting a race condition in the netfilter subsystem.",
  "detection_changed_at": 1738575599859,
  "exposure_time_seconds": 300,
  "finding_id": "AbCdEfGhIjKlMnOpQrStUvWx",
  "finding_type": "host_and_container_vulnerability",
  "first_seen_at": 1738575592659,
  "is_in_security_inbox": false,
  "last_seen_at": 1738624280889,
  "metadata": {
    "schema_version": "2"
  },
  "origin": [
    "agentless-scanner"
  ],
  "package": {
    "name": "linux",
    "normalized_name": "linux",
    "version": "5.4.0-205.225"
  },
  "remediation": {
    "is_available": false
  },
  "resource_id": "example-resource-id",
  "resource_name": "example-resource",
  "resource_type": "example_resource_type",
  "risk_details": {
    "has_exploit_available": {
      "evidence": {
        "exploit_sources": [
          "GitHub"
        ],
        "exploit_urls": [
          "https://github.com/example/POC-CVE-2024-12345"
        ]
      }
    },
    "has_high_exploitability_chance": {
      "evidence": {
        "epss_score": 0.70718,
        "epss_severity": "high"
      }
    },
    "is_publicly_accessible": {
      "evidence": {
        "resource_key": "arn:aws:elasticloadbalancing:us-east-1:123456789012:loadbalancer/app/my-alb/1234567890abcdef"
      }
    }
  },
  "severity": "critical",
  "severity_details": {
    "adjusted": {
      "score": 9.8,
      "value": "Critical",
      "vector": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:C/C:H/I:H/A:H/RC:C"
    },
    "base": {
      "score": 9.8,
      "value": "Critical",
      "vector": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:C/C:H/I:H/A:H/RC:C"
    }
  },
  "status": "open",
  "title": "Buffer overflow in Linux kernel netfilter subsystem",
  "vulnerability": {
    "hash": "abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
    "stack": {
      "ecosystem": "deb"
    }
  },
  "workflow": {
    "auto_closed_at": 1738575600859,
    "automations": {
      "rule_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "rule_name": "mute misconfigs with free text query",
      "rule_type": "mute"
    },
    "due_date": {
      "due_at": 1738575599859,
      "is_overdue": false,
      "rule_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
    },
    "integrations": {
      "cases": {
        "assignee": {
          "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          "name": "Alice"
        },
        "created_at": 1738575599859,
        "created_by": {
          "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          "name": "Alice"
        },
        "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        "jira_issue": {
          "key": "PROJ-12345",
          "status": "To Do",
          "url": "https://your-org.atlassian.net/browse/PROJ-12345"
        },
        "key": "CASE-42",
        "status": "open",
        "updated_at": 1738575599859,
        "updated_by": {
          "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          "name": "Alice"
        }
      }
    },
    "mute": {
      "description": "Free text",
      "expire_at": 1738575599859,
      "is_muted": false,
      "is_muted_by_rule": false,
      "muted_at": 1738575599859,
      "muted_by": {
        "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        "name": "Alice"
      },
      "reason": "Resource deleted"
    },
    "triage": {
      "assignee": {
        "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        "name": "Alice",
        "updated_at": 1738575600859,
        "updated_by": {
          "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          "name": "Alice"
        }
      }
    }
  },
  "tags": [
    "origin:agentless-scanner",
    "source:vulnerability_management"
  ]
}
```

{{% /tab %}}
{{% tab "IaC Misconfiguration" %}}

```json
{
  "base_severity": "critical",
  "cloud_resource": {
    "account": {
      "account": "Main production account",
      "account_id": "123456789012"
    },
    "cloud_provider": "AWS",
    "cloud_provider_url": "https://us-east-1.console.aws.amazon.com/ec2/home#Instances:instanceId=i-0123456789abcdef0",
    "configuration": {
      "account_id": "123456789012",
      "ami_launch_index": 0,
      "architecture": "x86_64",
      "aws_ami_key": "abcdef0123456789abcdef0123456789",
      "aws_iam_instance_profile_key": "abcdef0123456789abcdef0123456789",
      "aws_subnet_key": "abcdef0123456789abcdef0123456789",
      "aws_vpc_key": "abcdef0123456789abcdef0123456789",
      "block_device_mappings": [
        {
          "device_name": "/dev/sdf",
          "ebs": {
            "attach_time": 1734064859000,
            "delete_on_termination": true,
            "status": "attached",
            "volume_id": "vol-0123456789abcdef0"
          }
        }
      ]
    },
    "display_name": "i-012abcd34efghi56",
    "key": "arn:aws:ec2:us-east-1:123456789012:instance/i-012abcd34efghi56"
  },
  "container_image": {
    "name": "123456789012.dkr.ecr.us-east-1.amazonaws.com/my-app:v1.0.0",
    "registries": [
      "123456789012.dkr.ecr.us-east-1.amazonaws.com"
    ],
    "repo_digests": [
      "sha256:abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890"
    ]
  },
  "description": "A Terraform configuration defines an S3 bucket without server-side encryption enabled, leaving stored objects unencrypted at rest.",
  "detection_changed_at": 1738575599859,
  "exposure_time_seconds": 300,
  "finding_id": "AbCdEfGhIjKlMnOpQrStUvWx",
  "finding_type": "iac_misconfiguration",
  "first_seen_at": 1738575592659,
  "git": {
    "author": {
      "authored_at": 1738575599859,
      "email": "alice@example.com",
      "name": "Alice"
    },
    "branch": "main",
    "committer": {
      "committed_at": 1738575599859,
      "email": "bob@example.com",
      "name": "Bob"
    },
    "default_branch": "main",
    "is_default_branch": false,
    "repository_id": "123456789",
    "repository_url": "https://github.com/example-org/terraform/",
    "sha": "abcdef1234567890abcdef1234567890abcdef12"
  },
  "is_in_security_inbox": false,
  "last_seen_at": 1738624280889,
  "metadata": {
    "schema_version": "2"
  },
  "origin": [
    "agentless-scanner"
  ],
  "remediation": {
    "is_available": false
  },
  "resource_id": "example-resource-id",
  "resource_name": "example-resource",
  "resource_type": "example_resource_type",
  "rule": {
    "default_rule_id": "def-000-abc",
    "id": "def-000-iac",
    "name": "S3 bucket should have server-side encryption enabled",
    "type": "cloud_configuration",
    "version": 3
  },
  "severity": "critical",
  "severity_details": {
    "adjusted": {
      "score": 9.8,
      "value": "Critical",
      "vector": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:C/C:H/I:H/A:H/RC:C"
    },
    "base": {
      "score": 9.8,
      "value": "Critical",
      "vector": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:C/C:H/I:H/A:H/RC:C"
    }
  },
  "status": "open",
  "title": "S3 bucket without server-side encryption",
  "vulnerability": {
    "hash": "abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890"
  },
  "workflow": {
    "auto_closed_at": 1738575600859,
    "automations": {
      "rule_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "rule_name": "mute misconfigs with free text query",
      "rule_type": "mute"
    },
    "due_date": {
      "due_at": 1738575599859,
      "is_overdue": false,
      "rule_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
    },
    "integrations": {
      "cases": {
        "assignee": {
          "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          "name": "Alice"
        },
        "created_at": 1738575599859,
        "created_by": {
          "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          "name": "Alice"
        },
        "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        "jira_issue": {
          "key": "PROJ-12345",
          "status": "To Do",
          "url": "https://your-org.atlassian.net/browse/PROJ-12345"
        },
        "key": "CASE-42",
        "status": "open",
        "updated_at": 1738575599859,
        "updated_by": {
          "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          "name": "Alice"
        }
      }
    },
    "mute": {
      "description": "Free text",
      "expire_at": 1738575599859,
      "is_muted": false,
      "is_muted_by_rule": false,
      "muted_at": 1738575599859,
      "muted_by": {
        "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        "name": "Alice"
      },
      "reason": "Resource deleted"
    },
    "triage": {
      "assignee": {
        "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        "name": "Alice",
        "updated_at": 1738575600859,
        "updated_by": {
          "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          "name": "Alice"
        }
      }
    }
  },
  "tags": [
    "origin:agentless-scanner",
    "source:vulnerability_management"
  ]
}
```

{{% /tab %}}
{{% tab "Identity Risk" %}}

```json
{
  "base_severity": "critical",
  "cloud_resource": {
    "account": {
      "account": "Main production account",
      "account_id": "123456789012"
    },
    "cloud_provider": "AWS",
    "cloud_provider_url": "https://us-east-1.console.aws.amazon.com/ec2/home#Instances:instanceId=i-0123456789abcdef0",
    "configuration": {
      "account_id": "123456789012",
      "ami_launch_index": 0,
      "architecture": "x86_64",
      "aws_ami_key": "abcdef0123456789abcdef0123456789",
      "aws_iam_instance_profile_key": "abcdef0123456789abcdef0123456789",
      "aws_subnet_key": "abcdef0123456789abcdef0123456789",
      "aws_vpc_key": "abcdef0123456789abcdef0123456789",
      "block_device_mappings": [
        {
          "device_name": "/dev/sdf",
          "ebs": {
            "attach_time": 1734064859000,
            "delete_on_termination": true,
            "status": "attached",
            "volume_id": "vol-0123456789abcdef0"
          }
        }
      ]
    },
    "display_name": "i-012abcd34efghi56",
    "key": "arn:aws:ec2:us-east-1:123456789012:instance/i-012abcd34efghi56"
  },
  "compliance": {
    "evaluation": "fail"
  },
  "container_image": {
    "name": "123456789012.dkr.ecr.us-east-1.amazonaws.com/my-app:v1.0.0",
    "registries": [
      "123456789012.dkr.ecr.us-east-1.amazonaws.com"
    ],
    "repo_digests": [
      "sha256:abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890"
    ]
  },
  "description": "An IAM user account has not been used in over 90 days and still has active access keys with administrative privileges, creating an unnecessary attack surface.",
  "detection_changed_at": 1738575599859,
  "exposure_time_seconds": 300,
  "finding_id": "AbCdEfGhIjKlMnOpQrStUvWx",
  "finding_type": "identity_risk",
  "first_seen_at": 1738575592659,
  "is_in_security_inbox": false,
  "last_seen_at": 1738624280889,
  "metadata": {
    "schema_version": "2"
  },
  "origin": [
    "agentless-scanner"
  ],
  "resource_id": "example-resource-id",
  "resource_name": "example-resource",
  "resource_type": "example_resource_type",
  "rule": {
    "default_rule_id": "def-000-abc",
    "id": "def-000-idr",
    "name": "IAM user inactive for 90+ days with active access keys",
    "type": "cloud_configuration",
    "version": 3
  },
  "severity": "critical",
  "severity_details": {
    "adjusted": {
      "score": 9.8,
      "value": "Critical",
      "vector": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:C/C:H/I:H/A:H/RC:C"
    },
    "base": {
      "score": 9.8,
      "value": "Critical",
      "vector": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:C/C:H/I:H/A:H/RC:C"
    }
  },
  "status": "open",
  "title": "Inactive IAM user with administrative access keys",
  "workflow": {
    "auto_closed_at": 1738575600859,
    "automations": {
      "rule_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "rule_name": "mute misconfigs with free text query",
      "rule_type": "mute"
    },
    "due_date": {
      "due_at": 1738575599859,
      "is_overdue": false,
      "rule_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
    },
    "integrations": {
      "cases": {
        "assignee": {
          "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          "name": "Alice"
        },
        "created_at": 1738575599859,
        "created_by": {
          "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          "name": "Alice"
        },
        "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        "jira_issue": {
          "key": "PROJ-12345",
          "status": "To Do",
          "url": "https://your-org.atlassian.net/browse/PROJ-12345"
        },
        "key": "CASE-42",
        "status": "open",
        "updated_at": 1738575599859,
        "updated_by": {
          "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          "name": "Alice"
        }
      }
    },
    "mute": {
      "description": "Free text",
      "expire_at": 1738575599859,
      "is_muted": false,
      "is_muted_by_rule": false,
      "muted_at": 1738575599859,
      "muted_by": {
        "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        "name": "Alice"
      },
      "reason": "Resource deleted"
    },
    "triage": {
      "assignee": {
        "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        "name": "Alice",
        "updated_at": 1738575600859,
        "updated_by": {
          "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          "name": "Alice"
        }
      }
    }
  },
  "tags": [
    "origin:agentless-scanner",
    "source:vulnerability_management"
  ]
}
```

{{% /tab %}}
{{% tab "Library Vulnerability" %}}

```json
{
  "advisory": {
    "aliases": [
      "CVE-2024-12345"
    ],
    "cve": "CVE-2024-12345",
    "id": "TRIVY-CVE-2024-67890"
  },
  "base_severity": "critical",
  "container_image": {
    "name": "123456789012.dkr.ecr.us-east-1.amazonaws.com/my-app:v1.0.0",
    "registries": [
      "123456789012.dkr.ecr.us-east-1.amazonaws.com"
    ],
    "repo_digests": [
      "sha256:abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890"
    ]
  },
  "description": "A remote code execution vulnerability in the logging library allows an attacker to execute arbitrary code by sending a crafted log message that exploits unsafe deserialization.",
  "detection_changed_at": 1738575599859,
  "exposure_time_seconds": 300,
  "finding_id": "AbCdEfGhIjKlMnOpQrStUvWx",
  "finding_type": "library_vulnerability",
  "first_seen_at": 1738575592659,
  "git": {
    "author": {
      "authored_at": 1738575599859,
      "email": "alice@example.com",
      "name": "Alice"
    },
    "branch": "main",
    "committer": {
      "committed_at": 1738575599859,
      "email": "bob@example.com",
      "name": "Bob"
    },
    "default_branch": "main",
    "is_default_branch": false,
    "repository_id": "123456789",
    "repository_url": "https://github.com/example-org/terraform/",
    "sha": "abcdef1234567890abcdef1234567890abcdef12"
  },
  "is_in_security_inbox": false,
  "last_seen_at": 1738624280889,
  "metadata": {
    "schema_version": "2"
  },
  "origin": [
    "agentless-scanner"
  ],
  "package": {
    "name": "linux",
    "normalized_name": "linux",
    "scope": "production",
    "version": "5.4.0-205.225"
  },
  "remediation": {
    "is_available": false
  },
  "resource_id": "example-resource-id",
  "resource_name": "example-resource",
  "resource_type": "example_resource_type",
  "risk_details": {
    "has_exploit_available": {
      "evidence": {
        "exploit_sources": [
          "GitHub"
        ],
        "exploit_urls": [
          "https://github.com/example/POC-CVE-2024-12345"
        ]
      }
    },
    "has_high_exploitability_chance": {
      "evidence": {
        "epss_score": 0.70718,
        "epss_severity": "high"
      }
    }
  },
  "service": {
    "name": "chatbot-api"
  },
  "severity": "critical",
  "severity_details": {
    "adjusted": {
      "score": 9.8,
      "value": "Critical",
      "vector": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:C/C:H/I:H/A:H/RC:C"
    },
    "base": {
      "score": 9.8,
      "value": "Critical",
      "vector": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:C/C:H/I:H/A:H/RC:C"
    }
  },
  "status": "open",
  "title": "Remote code execution in logging library",
  "vulnerability": {
    "hash": "abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
    "stack": {
      "ecosystem": "deb"
    }
  },
  "workflow": {
    "auto_closed_at": 1738575600859,
    "automations": {
      "rule_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "rule_name": "mute misconfigs with free text query",
      "rule_type": "mute"
    },
    "due_date": {
      "due_at": 1738575599859,
      "is_overdue": false,
      "rule_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
    },
    "integrations": {
      "cases": {
        "assignee": {
          "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          "name": "Alice"
        },
        "created_at": 1738575599859,
        "created_by": {
          "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          "name": "Alice"
        },
        "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        "jira_issue": {
          "key": "PROJ-12345",
          "status": "To Do",
          "url": "https://your-org.atlassian.net/browse/PROJ-12345"
        },
        "key": "CASE-42",
        "status": "open",
        "updated_at": 1738575599859,
        "updated_by": {
          "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          "name": "Alice"
        }
      }
    },
    "mute": {
      "description": "Free text",
      "expire_at": 1738575599859,
      "is_muted": false,
      "is_muted_by_rule": false,
      "muted_at": 1738575599859,
      "muted_by": {
        "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        "name": "Alice"
      },
      "reason": "Resource deleted"
    },
    "triage": {
      "assignee": {
        "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        "name": "Alice",
        "updated_at": 1738575600859,
        "updated_by": {
          "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          "name": "Alice"
        }
      }
    }
  },
  "tags": [
    "origin:agentless-scanner",
    "source:vulnerability_management"
  ]
}
```

{{% /tab %}}
{{% tab "Misconfiguration" %}}

```json
{
  "base_severity": "critical",
  "cloud_resource": {
    "account": {
      "account": "Main production account",
      "account_id": "123456789012"
    },
    "cloud_provider": "AWS",
    "cloud_provider_url": "https://us-east-1.console.aws.amazon.com/ec2/home#Instances:instanceId=i-0123456789abcdef0",
    "configuration": {
      "account_id": "123456789012",
      "ami_launch_index": 0,
      "architecture": "x86_64",
      "aws_ami_key": "abcdef0123456789abcdef0123456789",
      "aws_iam_instance_profile_key": "abcdef0123456789abcdef0123456789",
      "aws_subnet_key": "abcdef0123456789abcdef0123456789",
      "aws_vpc_key": "abcdef0123456789abcdef0123456789",
      "block_device_mappings": [
        {
          "device_name": "/dev/sdf",
          "ebs": {
            "attach_time": 1734064859000,
            "delete_on_termination": true,
            "status": "attached",
            "volume_id": "vol-0123456789abcdef0"
          }
        }
      ]
    },
    "display_name": "i-012abcd34efghi56",
    "key": "arn:aws:ec2:us-east-1:123456789012:instance/i-012abcd34efghi56"
  },
  "compliance": {
    "evaluation": "fail"
  },
  "container_image": {
    "name": "123456789012.dkr.ecr.us-east-1.amazonaws.com/my-app:v1.0.0",
    "registries": [
      "123456789012.dkr.ecr.us-east-1.amazonaws.com"
    ],
    "repo_digests": [
      "sha256:abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890"
    ]
  },
  "description": "An AWS security group allows unrestricted inbound SSH access from any IP address (0.0.0.0/0), exposing the associated instances to brute-force and unauthorized access attempts.",
  "detection_changed_at": 1738575599859,
  "exposure_time_seconds": 300,
  "finding_id": "AbCdEfGhIjKlMnOpQrStUvWx",
  "finding_type": "misconfiguration",
  "first_seen_at": 1738575592659,
  "is_in_security_inbox": false,
  "last_seen_at": 1738624280889,
  "metadata": {
    "schema_version": "2"
  },
  "origin": [
    "agentless-scanner"
  ],
  "resource_id": "example-resource-id",
  "resource_name": "example-resource",
  "resource_type": "example_resource_type",
  "risk_details": {
    "is_publicly_accessible": {
      "evidence": {
        "resource_key": "arn:aws:elasticloadbalancing:us-east-1:123456789012:loadbalancer/app/my-alb/1234567890abcdef"
      }
    }
  },
  "rule": {
    "default_rule_id": "def-000-abc",
    "id": "def-000-cfg",
    "name": "Security group should not allow unrestricted SSH access",
    "type": "cloud_configuration",
    "version": 3
  },
  "severity": "critical",
  "severity_details": {
    "adjusted": {
      "score": 9.8,
      "value": "Critical",
      "vector": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:C/C:H/I:H/A:H/RC:C"
    },
    "base": {
      "score": 9.8,
      "value": "Critical",
      "vector": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:C/C:H/I:H/A:H/RC:C"
    }
  },
  "status": "open",
  "title": "Security group allows unrestricted SSH access",
  "workflow": {
    "auto_closed_at": 1738575600859,
    "automations": {
      "rule_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "rule_name": "mute misconfigs with free text query",
      "rule_type": "mute"
    },
    "due_date": {
      "due_at": 1738575599859,
      "is_overdue": false,
      "rule_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
    },
    "integrations": {
      "cases": {
        "assignee": {
          "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          "name": "Alice"
        },
        "created_at": 1738575599859,
        "created_by": {
          "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          "name": "Alice"
        },
        "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        "jira_issue": {
          "key": "PROJ-12345",
          "status": "To Do",
          "url": "https://your-org.atlassian.net/browse/PROJ-12345"
        },
        "key": "CASE-42",
        "status": "open",
        "updated_at": 1738575599859,
        "updated_by": {
          "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          "name": "Alice"
        }
      }
    },
    "mute": {
      "description": "Free text",
      "expire_at": 1738575599859,
      "is_muted": false,
      "is_muted_by_rule": false,
      "muted_at": 1738575599859,
      "muted_by": {
        "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        "name": "Alice"
      },
      "reason": "Resource deleted"
    },
    "triage": {
      "assignee": {
        "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        "name": "Alice",
        "updated_at": 1738575600859,
        "updated_by": {
          "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          "name": "Alice"
        }
      }
    }
  },
  "tags": [
    "origin:agentless-scanner",
    "source:vulnerability_management"
  ]
}
```

{{% /tab %}}
{{% tab "Runtime Code Vulnerability" %}}

```json
{
  "base_severity": "critical",
  "container_image": {
    "name": "123456789012.dkr.ecr.us-east-1.amazonaws.com/my-app:v1.0.0",
    "registries": [
      "123456789012.dkr.ecr.us-east-1.amazonaws.com"
    ],
    "repo_digests": [
      "sha256:abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890"
    ]
  },
  "description": "A SQL injection vulnerability was detected at runtime in the application's search endpoint. User-supplied input is concatenated directly into a SQL query without parameterized statements.",
  "detection_changed_at": 1738575599859,
  "exposure_time_seconds": 300,
  "finding_id": "AbCdEfGhIjKlMnOpQrStUvWx",
  "finding_type": "runtime_code_vulnerability",
  "first_seen_at": 1738575592659,
  "git": {
    "author": {
      "authored_at": 1738575599859,
      "email": "alice@example.com",
      "name": "Alice"
    },
    "branch": "main",
    "committer": {
      "committed_at": 1738575599859,
      "email": "bob@example.com",
      "name": "Bob"
    },
    "default_branch": "main",
    "is_default_branch": false,
    "repository_id": "123456789",
    "repository_url": "https://github.com/example-org/terraform/",
    "sha": "abcdef1234567890abcdef1234567890abcdef12"
  },
  "is_in_security_inbox": false,
  "last_seen_at": 1738624280889,
  "metadata": {
    "schema_version": "2"
  },
  "origin": [
    "agentless-scanner"
  ],
  "remediation": {
    "is_available": false
  },
  "resource_id": "example-resource-id",
  "resource_name": "example-resource",
  "resource_type": "example_resource_type",
  "rule": {
    "default_rule_id": "def-000-abc",
    "id": "rtcv-001-sqli",
    "name": "SQL injection detected in application endpoint",
    "type": "application_code_vulnerability",
    "version": 3
  },
  "service": {
    "name": "chatbot-api"
  },
  "severity": "critical",
  "severity_details": {
    "adjusted": {
      "score": 9.8,
      "value": "Critical",
      "vector": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:C/C:H/I:H/A:H/RC:C"
    },
    "base": {
      "score": 9.8,
      "value": "Critical",
      "vector": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:C/C:H/I:H/A:H/RC:C"
    }
  },
  "status": "open",
  "title": "SQL injection in search endpoint",
  "vulnerability": {
    "hash": "abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890"
  },
  "workflow": {
    "auto_closed_at": 1738575600859,
    "automations": {
      "rule_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "rule_name": "mute misconfigs with free text query",
      "rule_type": "mute"
    },
    "due_date": {
      "due_at": 1738575599859,
      "is_overdue": false,
      "rule_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
    },
    "integrations": {
      "cases": {
        "assignee": {
          "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          "name": "Alice"
        },
        "created_at": 1738575599859,
        "created_by": {
          "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          "name": "Alice"
        },
        "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        "jira_issue": {
          "key": "PROJ-12345",
          "status": "To Do",
          "url": "https://your-org.atlassian.net/browse/PROJ-12345"
        },
        "key": "CASE-42",
        "status": "open",
        "updated_at": 1738575599859,
        "updated_by": {
          "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          "name": "Alice"
        }
      }
    },
    "mute": {
      "description": "Free text",
      "expire_at": 1738575599859,
      "is_muted": false,
      "is_muted_by_rule": false,
      "muted_at": 1738575599859,
      "muted_by": {
        "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        "name": "Alice"
      },
      "reason": "Resource deleted"
    },
    "triage": {
      "assignee": {
        "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        "name": "Alice",
        "updated_at": 1738575600859,
        "updated_by": {
          "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          "name": "Alice"
        }
      }
    }
  },
  "tags": [
    "origin:agentless-scanner",
    "source:vulnerability_management"
  ]
}
```

{{% /tab %}}
{{% tab "Secret" %}}

```json
{
  "base_severity": "critical",
  "container_image": {
    "name": "123456789012.dkr.ecr.us-east-1.amazonaws.com/my-app:v1.0.0",
    "registries": [
      "123456789012.dkr.ecr.us-east-1.amazonaws.com"
    ],
    "repo_digests": [
      "sha256:abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890"
    ]
  },
  "description": "An AWS access key was found hardcoded in a configuration file committed to the repository. Exposed credentials can be used to gain unauthorized access to cloud resources.",
  "detection_changed_at": 1738575599859,
  "exposure_time_seconds": 300,
  "finding_id": "AbCdEfGhIjKlMnOpQrStUvWx",
  "finding_type": "secret",
  "first_seen_at": 1738575592659,
  "git": {
    "author": {
      "authored_at": 1738575599859,
      "email": "alice@example.com",
      "name": "Alice"
    },
    "branch": "main",
    "committer": {
      "committed_at": 1738575599859,
      "email": "bob@example.com",
      "name": "Bob"
    },
    "default_branch": "main",
    "is_default_branch": false,
    "repository_id": "123456789",
    "repository_url": "https://github.com/example-org/terraform/",
    "sha": "abcdef1234567890abcdef1234567890abcdef12"
  },
  "is_in_security_inbox": false,
  "last_seen_at": 1738624280889,
  "metadata": {
    "schema_version": "2"
  },
  "origin": [
    "agentless-scanner"
  ],
  "remediation": {
    "is_available": false
  },
  "resource_id": "example-resource-id",
  "resource_name": "example-resource",
  "resource_type": "example_resource_type",
  "rule": {
    "default_rule_id": "def-000-abc",
    "id": "sct-001-aws",
    "name": "AWS access key detected in source code",
    "type": "credential_exposure",
    "version": 3
  },
  "service": {
    "name": "chatbot-api"
  },
  "severity": "critical",
  "severity_details": {
    "adjusted": {
      "score": 9.8,
      "value": "Critical",
      "vector": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:C/C:H/I:H/A:H/RC:C"
    },
    "base": {
      "score": 9.8,
      "value": "Critical",
      "vector": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:C/C:H/I:H/A:H/RC:C"
    }
  },
  "status": "open",
  "title": "Hardcoded AWS access key in configuration file",
  "vulnerability": {
    "hash": "abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890"
  },
  "workflow": {
    "auto_closed_at": 1738575600859,
    "automations": {
      "rule_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "rule_name": "mute misconfigs with free text query",
      "rule_type": "mute"
    },
    "due_date": {
      "due_at": 1738575599859,
      "is_overdue": false,
      "rule_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
    },
    "integrations": {
      "cases": {
        "assignee": {
          "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          "name": "Alice"
        },
        "created_at": 1738575599859,
        "created_by": {
          "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          "name": "Alice"
        },
        "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        "jira_issue": {
          "key": "PROJ-12345",
          "status": "To Do",
          "url": "https://your-org.atlassian.net/browse/PROJ-12345"
        },
        "key": "CASE-42",
        "status": "open",
        "updated_at": 1738575599859,
        "updated_by": {
          "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          "name": "Alice"
        }
      }
    },
    "mute": {
      "description": "Free text",
      "expire_at": 1738575599859,
      "is_muted": false,
      "is_muted_by_rule": false,
      "muted_at": 1738575599859,
      "muted_by": {
        "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        "name": "Alice"
      },
      "reason": "Resource deleted"
    },
    "triage": {
      "assignee": {
        "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        "name": "Alice",
        "updated_at": 1738575600859,
        "updated_by": {
          "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          "name": "Alice"
        }
      }
    }
  },
  "tags": [
    "origin:agentless-scanner",
    "source:vulnerability_management"
  ]
}
```

{{% /tab %}}
{{% tab "Static Code Vulnerability" %}}

```json
{
  "base_severity": "critical",
  "container_image": {
    "name": "123456789012.dkr.ecr.us-east-1.amazonaws.com/my-app:v1.0.0",
    "registries": [
      "123456789012.dkr.ecr.us-east-1.amazonaws.com"
    ],
    "repo_digests": [
      "sha256:abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890"
    ]
  },
  "description": "A cross-site scripting (XSS) vulnerability was found in the application's template rendering. User input is inserted into HTML output without proper escaping, allowing script injection.",
  "detection_changed_at": 1738575599859,
  "exposure_time_seconds": 300,
  "finding_id": "AbCdEfGhIjKlMnOpQrStUvWx",
  "finding_type": "static_code_vulnerability",
  "first_seen_at": 1738575592659,
  "git": {
    "author": {
      "authored_at": 1738575599859,
      "email": "alice@example.com",
      "name": "Alice"
    },
    "branch": "main",
    "committer": {
      "committed_at": 1738575599859,
      "email": "bob@example.com",
      "name": "Bob"
    },
    "default_branch": "main",
    "is_default_branch": false,
    "repository_id": "123456789",
    "repository_url": "https://github.com/example-org/terraform/",
    "sha": "abcdef1234567890abcdef1234567890abcdef12"
  },
  "is_in_security_inbox": false,
  "last_seen_at": 1738624280889,
  "metadata": {
    "schema_version": "2"
  },
  "origin": [
    "agentless-scanner"
  ],
  "remediation": {
    "is_available": false
  },
  "resource_id": "example-resource-id",
  "resource_name": "example-resource",
  "resource_type": "example_resource_type",
  "rule": {
    "default_rule_id": "def-000-abc",
    "id": "sast-001-xss",
    "name": "Reflected XSS via unescaped user input in template",
    "type": "application_code_vulnerability",
    "version": 3
  },
  "service": {
    "name": "chatbot-api"
  },
  "severity": "critical",
  "severity_details": {
    "adjusted": {
      "score": 9.8,
      "value": "Critical",
      "vector": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:C/C:H/I:H/A:H/RC:C"
    },
    "base": {
      "score": 9.8,
      "value": "Critical",
      "vector": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:C/C:H/I:H/A:H/RC:C"
    }
  },
  "status": "open",
  "title": "Cross-site scripting in template rendering",
  "vulnerability": {
    "hash": "abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890"
  },
  "workflow": {
    "auto_closed_at": 1738575600859,
    "automations": {
      "rule_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "rule_name": "mute misconfigs with free text query",
      "rule_type": "mute"
    },
    "due_date": {
      "due_at": 1738575599859,
      "is_overdue": false,
      "rule_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
    },
    "integrations": {
      "cases": {
        "assignee": {
          "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          "name": "Alice"
        },
        "created_at": 1738575599859,
        "created_by": {
          "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          "name": "Alice"
        },
        "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        "jira_issue": {
          "key": "PROJ-12345",
          "status": "To Do",
          "url": "https://your-org.atlassian.net/browse/PROJ-12345"
        },
        "key": "CASE-42",
        "status": "open",
        "updated_at": 1738575599859,
        "updated_by": {
          "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          "name": "Alice"
        }
      }
    },
    "mute": {
      "description": "Free text",
      "expire_at": 1738575599859,
      "is_muted": false,
      "is_muted_by_rule": false,
      "muted_at": 1738575599859,
      "muted_by": {
        "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        "name": "Alice"
      },
      "reason": "Resource deleted"
    },
    "triage": {
      "assignee": {
        "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        "name": "Alice",
        "updated_at": 1738575600859,
        "updated_by": {
          "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          "name": "Alice"
        }
      }
    }
  },
  "tags": [
    "origin:agentless-scanner",
    "source:vulnerability_management"
  ]
}
```

{{% /tab %}}
{{% tab "Workload Activity" %}}

```json
{
  "base_severity": "critical",
  "container_image": {
    "name": "123456789012.dkr.ecr.us-east-1.amazonaws.com/my-app:v1.0.0",
    "registries": [
      "123456789012.dkr.ecr.us-east-1.amazonaws.com"
    ],
    "repo_digests": [
      "sha256:abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890"
    ]
  },
  "description": "A container process executed a binary that was not part of the original container image. This unexpected process execution may indicate a compromised workload or unauthorized modification.",
  "detection_changed_at": 1738575599859,
  "exposure_time_seconds": 300,
  "finding_id": "AbCdEfGhIjKlMnOpQrStUvWx",
  "finding_type": "workload_activity",
  "first_seen_at": 1738575592659,
  "is_in_security_inbox": false,
  "last_seen_at": 1738624280889,
  "metadata": {
    "schema_version": "2"
  },
  "origin": [
    "agentless-scanner"
  ],
  "resource_id": "example-resource-id",
  "resource_name": "example-resource",
  "resource_type": "example_resource_type",
  "rule": {
    "default_rule_id": "def-000-abc",
    "id": "def-000-wka",
    "name": "Process launched from unexpected path in container",
    "type": "workload_security",
    "version": 3
  },
  "severity": "critical",
  "severity_details": {
    "adjusted": {
      "score": 9.8,
      "value": "Critical",
      "vector": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:C/C:H/I:H/A:H/RC:C"
    },
    "base": {
      "score": 9.8,
      "value": "Critical",
      "vector": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:C/C:H/I:H/A:H/RC:C"
    }
  },
  "status": "open",
  "title": "Unexpected process execution in container",
  "workflow": {
    "auto_closed_at": 1738575600859,
    "automations": {
      "rule_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "rule_name": "mute misconfigs with free text query",
      "rule_type": "mute"
    },
    "due_date": {
      "due_at": 1738575599859,
      "is_overdue": false,
      "rule_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
    },
    "integrations": {
      "cases": {
        "assignee": {
          "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          "name": "Alice"
        },
        "created_at": 1738575599859,
        "created_by": {
          "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          "name": "Alice"
        },
        "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        "jira_issue": {
          "key": "PROJ-12345",
          "status": "To Do",
          "url": "https://your-org.atlassian.net/browse/PROJ-12345"
        },
        "key": "CASE-42",
        "status": "open",
        "updated_at": 1738575599859,
        "updated_by": {
          "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          "name": "Alice"
        }
      }
    },
    "mute": {
      "description": "Free text",
      "expire_at": 1738575599859,
      "is_muted": false,
      "is_muted_by_rule": false,
      "muted_at": 1738575599859,
      "muted_by": {
        "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        "name": "Alice"
      },
      "reason": "Resource deleted"
    },
    "triage": {
      "assignee": {
        "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        "name": "Alice",
        "updated_at": 1738575600859,
        "updated_by": {
          "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          "name": "Alice"
        }
      }
    }
  },
  "tags": [
    "origin:agentless-scanner",
    "source:vulnerability_management"
  ]
}
```

{{% /tab %}}
{{< /tabs >}}

## Schema Reference

The following sections describe all available attributes in the Security Findings schema, organized by namespace.

{{% collapse-content title="Core Attributes" level="h3" id="core-attributes" %}}

These attributes are present on all security findings and describe the fundamental nature and status of the finding.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>additional_resources</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@additional_resources</code><br>Additional resources. For example, an AWS EC2 instance can have security groups and Auto Scaling groups as additional resources.</td>
    </tr>
    <tr>
      <td><code>base_severity</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@base_severity</code><br>Base severity level of the finding before any adjustments. Valid values: `critical`, `high`, `medium`, `low`, `info`, `none`, `unknown`.</td>
    </tr>
    <tr>
      <td><code>description</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@description</code><br>Human-readable explanation of the finding. May include Markdown formatting.</td>
    </tr>
    <tr>
      <td><code>detection_changed_at</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@detection_changed_at</code><br>Timestamp in milliseconds (UTC) when the finding's evaluation or detection state last changed.</td>
    </tr>
    <tr>
      <td><code>exposure_time_seconds</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@exposure_time_seconds</code><br>Indicates the time elapsed, in seconds, between when the finding was last closed and when it was first detected.</td>
    </tr>
    <tr>
      <td><code>finding_id</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@finding_id</code><br>Unique identifier of the finding.</td>
    </tr>
    <tr>
      <td><code>finding_type</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@finding_type</code><br>Category of the finding. Valid values: `api_security`, `attack_path`, `runtime_code_vulnerability`, `static_code_vulnerability`, `host_and_container_vulnerability`, `iac_misconfiguration`, `identity_risk`, `library_vulnerability`, `misconfiguration`, `secret`, `workload_activity`.</td>
    </tr>
    <tr>
      <td><code>first_seen_at</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@first_seen_at</code><br>Timestamp in milliseconds (UTC) when the finding was first detected.</td>
    </tr>
    <tr>
      <td><code>is_in_security_inbox</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@is_in_security_inbox</code><br>True if the finding appears in the Security Inbox; false otherwise.</td>
    </tr>
    <tr>
      <td><code>last_detected_at</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@last_detected_at</code><br>Discovery timestamp in milliseconds (UTC) when the last detection was received by the finding platform.</td>
    </tr>
    <tr>
      <td><code>last_seen_at</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@last_seen_at</code><br>Timestamp in milliseconds (UTC) when the finding was most recently detected.</td>
    </tr>
    <tr>
      <td><code>origin</code></td>
      <td>array (string)</td>
      <td><strong>Path:</strong> <code>@origin</code><br>Detection origins that produced the finding, such as agentless scans, APM, SCI (Software Composition Analysis), or CI (Continuous Integration).</td>
    </tr>
    <tr>
      <td><code>related_services</code></td>
      <td>array (string)</td>
      <td><strong>Path:</strong> <code>@related_services</code><br>Services that are inferred from Source Code Integration (for example, for SAST findings).</td>
    </tr>
    <tr>
      <td><code>resource_id</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@resource_id</code><br>Unique identifier of the resource affected by the finding.</td>
    </tr>
    <tr>
      <td><code>resource_name</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@resource_name</code><br>Human-readable name of the resource affected by the finding.</td>
    </tr>
    <tr>
      <td><code>resource_type</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@resource_type</code><br>Type of the resource.</td>
    </tr>
    <tr>
      <td><code>severity</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@severity</code><br>Datadog-adjusted severity level of the finding. Valid values: `critical`, `high`, `medium`, `low`, `info`, `none`, `unknown`.</td>
    </tr>
    <tr>
      <td><code>source_finding_raw_data</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@source_finding_raw_data</code><br>Raw data from third-party integrations that generated the finding.</td>
    </tr>
    <tr>
      <td><code>status</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@status</code><br>Workflow status of the finding. Valid values: `open`, `muted`, `auto_closed`, `resolved`, `in-progress`.</td>
    </tr>
    <tr>
      <td><code>time_to_resolution</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@time_to_resolution</code><br>Time in seconds between when the finding was first detected and when it was resolved.</td>
    </tr>
    <tr>
      <td><code>title</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@title</code><br>Human-readable title for the finding.</td>
    </tr>
  </tbody>
</table>

### Additional Resources

Additional resources. For example, an AWS EC2 instance can have security groups and Auto Scaling groups as additional resources.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>category</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@additional_resources.category</code><br>Category of the additional resource. Valid values: `cloud_resource`, `k8s`, `host`, `service`, `git`, `iac_resource`.</td>
    </tr>
    <tr>
      <td><code>configuration</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@additional_resources.configuration</code><br>Configuration of the additional resource.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Advisory" level="h3" id="advisory" %}}

Ties a vulnerability to a set of specific software versions. Vulnerability findings with advisories indicate that a vulnerable version of the software was detected (typically through SBOMs).

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>aliases</code></td>
      <td>array (string)</td>
      <td><strong>Path:</strong> <code>@advisory.aliases</code><br>Additional identifiers referring to the same vulnerability, created by other entities.</td>
    </tr>
    <tr>
      <td><code>cve</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@advisory.cve</code><br>Primary globally recognized identifier for a security vulnerability, following the `CVE-YYYY-NNNN` format.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@advisory.id</code><br>Internal identifier for the advisory.</td>
    </tr>
    <tr>
      <td><code>modified_at</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@advisory.modified_at</code><br>Timestamp in milliseconds (UTC) when the advisory was last updated.</td>
    </tr>
    <tr>
      <td><code>published_at</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@advisory.published_at</code><br>Timestamp in milliseconds (UTC) when the advisory was published.</td>
    </tr>
    <tr>
      <td><code>summary</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@advisory.summary</code><br>Short summary of the advisory.</td>
    </tr>
    <tr>
      <td><code>type</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@advisory.type</code><br>Type of the advisory. Valid values: `component_with_known_vulnerability`, `unmaintained`, `end_of_life`, `dangerous_workflows`, `risky_license`, `malicious_package`.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Api Endpoint" level="h3" id="api-endpoint" %}}

HTTP endpoint representation.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>method</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@api_endpoint.method</code><br>Method of the endpoint (HTTP verb or gRPC method).</td>
    </tr>
    <tr>
      <td><code>operation_name</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@api_endpoint.operation_name</code><br>Name of the entry point into a service (for example, `http.request`, `grpc.server`).</td>
    </tr>
    <tr>
      <td><code>path</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@api_endpoint.path</code><br>Relative templated path of the endpoint.</td>
    </tr>
    <tr>
      <td><code>request_path</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@api_endpoint.request_path</code><br>Relative path of the endpoint.</td>
    </tr>
    <tr>
      <td><code>resource_name</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@api_endpoint.resource_name</code><br>Internal identification of the endpoint in the format `&lt;method&gt; &lt;path&gt;`.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Cloud Resource" level="h3" id="cloud-resource" %}}

Attributes identifying the cloud resource affected by the finding.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>account</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@cloud_resource.account</code><br>Cloud account that owns the cloud resource (for example, AWS account, Azure subscription, GCP project, OCI tenancy).</td>
    </tr>
    <tr>
      <td><code>category</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@cloud_resource.category</code><br>Category the resource type belongs to.</td>
    </tr>
    <tr>
      <td><code>cloud_provider</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@cloud_resource.cloud_provider</code><br>Cloud provider hosting the resource. Valid values: `aws`, `azure`, `gcp`, `oci`.</td>
    </tr>
    <tr>
      <td><code>cloud_provider_url</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@cloud_resource.cloud_provider_url</code><br>Link to the resource in the cloud provider console.</td>
    </tr>
    <tr>
      <td><code>configuration</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@cloud_resource.configuration</code><br>Configuration of the cloud resource, as returned by the cloud provider.</td>
    </tr>
    <tr>
      <td><code>context</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@cloud_resource.context</code><br>Context for the cloud resource.</td>
    </tr>
    <tr>
      <td><code>display_name</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@cloud_resource.display_name</code><br>Display name of the resource.</td>
    </tr>
    <tr>
      <td><code>key</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@cloud_resource.key</code><br>Canonical Cloud Resource Identifier (CCRID).</td>
    </tr>
    <tr>
      <td><code>public_accessibility_paths</code></td>
      <td>array (string)</td>
      <td><strong>Path:</strong> <code>@cloud_resource.public_accessibility_paths</code><br>Network paths through which the resource is accessible from the public internet.</td>
    </tr>
    <tr>
      <td><code>public_port_ranges</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@cloud_resource.public_port_ranges</code><br>Port ranges on the resource that are exposed to the public internet.</td>
    </tr>
    <tr>
      <td><code>region</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@cloud_resource.region</code><br>Cloud region where the resource is located.</td>
    </tr>
  </tbody>
</table>

### Public Port Ranges

Port ranges on the resource that are exposed to the public internet.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>from_port</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@cloud_resource.public_port_ranges.from_port</code><br>Starting port number of the exposed range.</td>
    </tr>
    <tr>
      <td><code>to_port</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@cloud_resource.public_port_ranges.to_port</code><br>Ending port number of the exposed range.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Code Location" level="h3" id="code-location" %}}

Attributes pinpointing the specific file and line numbers where the finding is located.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>column_end</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@code_location.column_end</code><br>Ending column position.</td>
    </tr>
    <tr>
      <td><code>column_start</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@code_location.column_start</code><br>Starting column position.</td>
    </tr>
    <tr>
      <td><code>filename</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@code_location.filename</code><br>Relative path to the file.</td>
    </tr>
    <tr>
      <td><code>is_test_file</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@code_location.is_test_file</code><br>True if the code file is a test file; false otherwise.</td>
    </tr>
    <tr>
      <td><code>line_end</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@code_location.line_end</code><br>Ending line number.</td>
    </tr>
    <tr>
      <td><code>line_start</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@code_location.line_start</code><br>Starting line number.</td>
    </tr>
    <tr>
      <td><code>symbol</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@code_location.symbol</code><br>Symbol name at the code location.</td>
    </tr>
    <tr>
      <td><code>url</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@code_location.url</code><br>URL to view the file online (for example, in GitHub), highlighting the code location.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Compliance" level="h3" id="compliance" %}}

Information specific to compliance findings, such as compliance rule or evaluation (`pass`/`fail`).

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>evaluation</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@compliance.evaluation</code><br>Compliance evaluation result. Valid values: `pass` (resource is properly configured), `fail` (resource is misconfigured).</td>
    </tr>
    <tr>
      <td><code>frameworks</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@compliance.frameworks</code><br>Compliance frameworks mapped to the finding.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Container Image" level="h3" id="container-image" %}}

-

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>architectures</code></td>
      <td>array (string)</td>
      <td><strong>Path:</strong> <code>@container_image.architectures</code><br>Architectures associated with the container image.</td>
    </tr>
    <tr>
      <td><code>git_repository_url</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@container_image.git_repository_url</code><br>URL of the Git repository for the code used to build the container image. Available only when Source Code Integration is configured.</td>
    </tr>
    <tr>
      <td><code>image_layer_diff_ids</code></td>
      <td>array (string)</td>
      <td><strong>Path:</strong> <code>@container_image.image_layer_diff_ids</code><br>-</td>
    </tr>
    <tr>
      <td><code>image_layer_digests</code></td>
      <td>array (string)</td>
      <td><strong>Path:</strong> <code>@container_image.image_layer_digests</code><br>-</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@container_image.name</code><br>Full name of the container image.</td>
    </tr>
    <tr>
      <td><code>oses</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@container_image.oses</code><br>Operating systems associated with the container image.</td>
    </tr>
    <tr>
      <td><code>registries</code></td>
      <td>array (string)</td>
      <td><strong>Path:</strong> <code>@container_image.registries</code><br>Container registry where the image is stored or was pulled from.</td>
    </tr>
    <tr>
      <td><code>repo_digests</code></td>
      <td>array (string)</td>
      <td><strong>Path:</strong> <code>@container_image.repo_digests</code><br>Repository digests of the container image where the finding was detected.</td>
    </tr>
    <tr>
      <td><code>repository</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@container_image.repository</code><br>Repository of the container image.</td>
    </tr>
    <tr>
      <td><code>tags</code></td>
      <td>array (string)</td>
      <td><strong>Path:</strong> <code>@container_image.tags</code><br>Tag part of the container image name (for example, `latest` or `1.2.3`).</td>
    </tr>
    <tr>
      <td><code>versions</code></td>
      <td>array (string)</td>
      <td><strong>Path:</strong> <code>@container_image.versions</code><br>Versions of the container image where the finding was detected.</td>
    </tr>
  </tbody>
</table>

### Oses

Operating systems associated with the container image.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>name</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@container_image.oses.name</code><br>Operating system name.</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@container_image.oses.version</code><br>Operating system version.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Detection Tool" level="h3" id="detection-tool" %}}

Information about the tool or engine responsible for detecting the finding.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>name</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@detection_tool.name</code><br>Name of the detection tool or engine that generated the finding.</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@detection_tool.version</code><br>Version of the detection tool or engine that generated the finding.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Git" level="h3" id="git" %}}

Git metadata linking a finding to source code context. Includes information about the repository, branch, commit, author, and committer.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>author</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@git.author</code><br>Details about the author of the commit.</td>
    </tr>
    <tr>
      <td><code>branch</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@git.branch</code><br>Name of the Git branch related to the finding.</td>
    </tr>
    <tr>
      <td><code>codeowners</code></td>
      <td>array (string)</td>
      <td><strong>Path:</strong> <code>@git.codeowners</code><br>Code owner teams extracted from the SCM (Source Control Management) provider's CODEOWNERS file on platforms like GitHub.</td>
    </tr>
    <tr>
      <td><code>committer</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@git.committer</code><br>Details about the committer.</td>
    </tr>
    <tr>
      <td><code>default_branch</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@git.default_branch</code><br>Default branch defined for the Git repository.</td>
    </tr>
    <tr>
      <td><code>is_default_branch</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@git.is_default_branch</code><br>True if the current branch is the default branch for the repository; false otherwise.</td>
    </tr>
    <tr>
      <td><code>repository_id</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@git.repository_id</code><br>Normalized identifier of the Git repository.</td>
    </tr>
    <tr>
      <td><code>repository_url</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@git.repository_url</code><br>Git repository URL related to the finding.</td>
    </tr>
    <tr>
      <td><code>repository_visibility</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@git.repository_visibility</code><br>Visibility of the repository. Valid values: `public`, `private`, `not_detected`.</td>
    </tr>
    <tr>
      <td><code>sha</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@git.sha</code><br>Git commit identifier (SHA).</td>
    </tr>
  </tbody>
</table>

### Author

Details about the author of the commit.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>authored_at</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@git.author.authored_at</code><br>Timestamp in milliseconds (UTC) when the original changes were made.</td>
    </tr>
    <tr>
      <td><code>email</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@git.author.email</code><br>Email address of the commit author.</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@git.author.name</code><br>Name of the commit author.</td>
    </tr>
  </tbody>
</table>

### Committer

Details about the committer.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>committed_at</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@git.committer.committed_at</code><br>Timestamp in milliseconds (UTC) when the changes were last significantly modified (for example, during a rebase or amend operation).</td>
    </tr>
    <tr>
      <td><code>email</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@git.committer.email</code><br>Email address of the committer.</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@git.committer.name</code><br>Name of the committer.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Host" level="h3" id="host" %}}

Host information.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>architectures</code></td>
      <td>array (string)</td>
      <td><strong>Path:</strong> <code>@host.architectures</code><br>Architectures associated with the host.</td>
    </tr>
    <tr>
      <td><code>cloud_provider</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@host.cloud_provider</code><br>Cloud provider the host belongs to.</td>
    </tr>
    <tr>
      <td><code>image</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@host.image</code><br>Name of the host image used to build the host (for example, `ami-1234`).</td>
    </tr>
    <tr>
      <td><code>key</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@host.key</code><br>Canonical Cloud Resource Identifier (CCRID).</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@host.name</code><br>Host name.</td>
    </tr>
    <tr>
      <td><code>os</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@host.os</code><br>Attributes of the operating system running on the host.</td>
    </tr>
  </tbody>
</table>

### Os

Attributes of the operating system running on the host.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>name</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@host.os.name</code><br>Operating system name.</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@host.os.version</code><br>Operating system version.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Iac Resource" level="h3" id="iac-resource" %}}

Attributes identifying the Infrastructure as Code (IaC) resource related to the finding.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>platform</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@iac_resource.platform</code><br>IaC (Infrastructure as Code) platform the vulnerability was found on (for example, `terraform`, `kubernetes`).</td>
    </tr>
    <tr>
      <td><code>provider</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@iac_resource.provider</code><br>IaC (Infrastructure as Code) provider where the resource is defined (for example, `aws`, `gcp`, `azure`).</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="K8S" level="h3" id="k8s" %}}

Kubernetes information for findings generated against Kubernetes resources.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>cluster_id</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@k8s.cluster_id</code><br>Kubernetes cluster identifier.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Metadata" level="h3" id="metadata" %}}

Additional metadata about the finding, such as schema version or source context.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>schema_version</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@metadata.schema_version</code><br>Indicates the findings schema version used for the finding. Current version: `2`.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Package" level="h3" id="package" %}}

Package manager information. A package manager automates the installation, upgrading, configuration, and removal of software packages.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>additional_names</code></td>
      <td>array (string)</td>
      <td><strong>Path:</strong> <code>@package.additional_names</code><br>Additional affected package names, if the cloud vulnerability impacted multiple packages derived from the same source package.</td>
    </tr>
    <tr>
      <td><code>declaration</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@package.declaration</code><br>Code locations of the package definition.</td>
    </tr>
    <tr>
      <td><code>dependency_location_text</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@package.dependency_location_text</code><br>-</td>
    </tr>
    <tr>
      <td><code>dependency_type</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@package.dependency_type</code><br>Whether the package is a direct dependency, transitive dependency, or not supported if the information cannot be retrieved.</td>
    </tr>
    <tr>
      <td><code>has_suid</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@package.has_suid</code><br>True if the package has the SUID bit set; false otherwise.</td>
    </tr>
    <tr>
      <td><code>is_running</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@package.is_running</code><br>True if the package is currently running; false otherwise.</td>
    </tr>
    <tr>
      <td><code>is_running_as_root</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@package.is_running_as_root</code><br>True if the package is currently running as root; false otherwise.</td>
    </tr>
    <tr>
      <td><code>loading_type</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@package.loading_type</code><br>Whether the component is always loaded and running (`hot`), running infrequently (`cold`), or loaded on demand (`lazy`).</td>
    </tr>
    <tr>
      <td><code>manager</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@package.manager</code><br>Package management ecosystem or source registry the vulnerable component originates from.</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@package.name</code><br>Name of the package or library where the vulnerability was identified.</td>
    </tr>
    <tr>
      <td><code>normalized_name</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@package.normalized_name</code><br>Normalized name according to the ecosystem of the package or library where the vulnerability was identified.</td>
    </tr>
    <tr>
      <td><code>root_parents</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@package.root_parents</code><br>List of dependencies for which the package is a transitive dependency.</td>
    </tr>
    <tr>
      <td><code>scope</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@package.scope</code><br>Intended usage scope of the package (`production` or `development`).</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@package.version</code><br>Version of the package or library where the vulnerability was identified.</td>
    </tr>
  </tbody>
</table>

### Declaration

Code locations of the package definition.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>block</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@package.declaration.block</code><br>Location of the code that declares the whole dependency declaration.</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@package.declaration.name</code><br>Location of the code that declares the dependency name.</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@package.declaration.version</code><br>Version declared for the root parent.</td>
    </tr>
  </tbody>
</table>

### Block

Location of the code that declares the whole dependency declaration.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>column_end</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@package.declaration.block.column_end</code><br>Ending column position.</td>
    </tr>
    <tr>
      <td><code>column_start</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@package.declaration.block.column_start</code><br>Starting column position.</td>
    </tr>
    <tr>
      <td><code>filename</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@package.declaration.block.filename</code><br>Relative path to the file.</td>
    </tr>
    <tr>
      <td><code>is_test_file</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@package.declaration.block.is_test_file</code><br>True if the code file is a test file; false otherwise.</td>
    </tr>
    <tr>
      <td><code>line_end</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@package.declaration.block.line_end</code><br>Ending line number.</td>
    </tr>
    <tr>
      <td><code>line_start</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@package.declaration.block.line_start</code><br>Starting line number.</td>
    </tr>
    <tr>
      <td><code>symbol</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@package.declaration.block.symbol</code><br>Symbol name at the code location.</td>
    </tr>
    <tr>
      <td><code>url</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@package.declaration.block.url</code><br>URL to view the file online (for example, in GitHub), highlighting the code location.</td>
    </tr>
  </tbody>
</table>

### Name

Location of the code that declares the dependency name.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>column_end</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@package.declaration.name.column_end</code><br>Ending column position.</td>
    </tr>
    <tr>
      <td><code>column_start</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@package.declaration.name.column_start</code><br>Starting column position.</td>
    </tr>
    <tr>
      <td><code>filename</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@package.declaration.name.filename</code><br>Relative path to the file.</td>
    </tr>
    <tr>
      <td><code>is_test_file</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@package.declaration.name.is_test_file</code><br>True if the code file is a test file; false otherwise.</td>
    </tr>
    <tr>
      <td><code>line_end</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@package.declaration.name.line_end</code><br>Ending line number.</td>
    </tr>
    <tr>
      <td><code>line_start</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@package.declaration.name.line_start</code><br>Starting line number.</td>
    </tr>
    <tr>
      <td><code>symbol</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@package.declaration.name.symbol</code><br>Symbol name at the code location.</td>
    </tr>
    <tr>
      <td><code>url</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@package.declaration.name.url</code><br>URL to view the file online (for example, in GitHub), highlighting the code location.</td>
    </tr>
  </tbody>
</table>

### Version

Version declared for the root parent.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>column_end</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@package.declaration.version.column_end</code><br>Ending column position.</td>
    </tr>
    <tr>
      <td><code>column_start</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@package.declaration.version.column_start</code><br>Starting column position.</td>
    </tr>
    <tr>
      <td><code>filename</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@package.declaration.version.filename</code><br>Relative path to the file.</td>
    </tr>
    <tr>
      <td><code>is_test_file</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@package.declaration.version.is_test_file</code><br>True if the code file is a test file; false otherwise.</td>
    </tr>
    <tr>
      <td><code>line_end</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@package.declaration.version.line_end</code><br>Ending line number.</td>
    </tr>
    <tr>
      <td><code>line_start</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@package.declaration.version.line_start</code><br>Starting line number.</td>
    </tr>
    <tr>
      <td><code>symbol</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@package.declaration.version.symbol</code><br>Symbol name at the code location.</td>
    </tr>
    <tr>
      <td><code>url</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@package.declaration.version.url</code><br>URL to view the file online (for example, in GitHub), highlighting the code location.</td>
    </tr>
  </tbody>
</table>

### Root Parents

List of dependencies for which the package is a transitive dependency.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>declaration</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@package.root_parents.declaration</code><br>Location of the code that declares the version of a root parent.</td>
    </tr>
    <tr>
      <td><code>language</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@package.root_parents.language</code><br>Dependency language for which the package is a transitive dependency.</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@package.root_parents.name</code><br>Dependency name for which the package is a transitive dependency.</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@package.root_parents.version</code><br>Dependency version for which the package is a transitive dependency.</td>
    </tr>
  </tbody>
</table>

### Declaration

Location of the code that declares the version of a root parent.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>block</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@package.root_parents.declaration.block</code><br>Location of the code that declares the whole dependency declaration.</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@package.root_parents.declaration.name</code><br>Location of the code that declares the dependency name.</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@package.root_parents.declaration.version</code><br>Version declared for the root parent.</td>
    </tr>
  </tbody>
</table>

### Block

Location of the code that declares the whole dependency declaration.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>column_end</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@package.root_parents.declaration.block.column_end</code><br>Ending column position.</td>
    </tr>
    <tr>
      <td><code>column_start</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@package.root_parents.declaration.block.column_start</code><br>Starting column position.</td>
    </tr>
    <tr>
      <td><code>filename</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@package.root_parents.declaration.block.filename</code><br>Relative path to the file.</td>
    </tr>
    <tr>
      <td><code>is_test_file</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@package.root_parents.declaration.block.is_test_file</code><br>True if the code file is a test file; false otherwise.</td>
    </tr>
    <tr>
      <td><code>line_end</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@package.root_parents.declaration.block.line_end</code><br>Ending line number.</td>
    </tr>
    <tr>
      <td><code>line_start</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@package.root_parents.declaration.block.line_start</code><br>Starting line number.</td>
    </tr>
    <tr>
      <td><code>symbol</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@package.root_parents.declaration.block.symbol</code><br>Symbol name at the code location.</td>
    </tr>
    <tr>
      <td><code>url</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@package.root_parents.declaration.block.url</code><br>URL to view the file online (for example, in GitHub), highlighting the code location.</td>
    </tr>
  </tbody>
</table>

### Name

Location of the code that declares the dependency name.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>column_end</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@package.root_parents.declaration.name.column_end</code><br>Ending column position.</td>
    </tr>
    <tr>
      <td><code>column_start</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@package.root_parents.declaration.name.column_start</code><br>Starting column position.</td>
    </tr>
    <tr>
      <td><code>filename</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@package.root_parents.declaration.name.filename</code><br>Relative path to the file.</td>
    </tr>
    <tr>
      <td><code>is_test_file</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@package.root_parents.declaration.name.is_test_file</code><br>True if the code file is a test file; false otherwise.</td>
    </tr>
    <tr>
      <td><code>line_end</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@package.root_parents.declaration.name.line_end</code><br>Ending line number.</td>
    </tr>
    <tr>
      <td><code>line_start</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@package.root_parents.declaration.name.line_start</code><br>Starting line number.</td>
    </tr>
    <tr>
      <td><code>symbol</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@package.root_parents.declaration.name.symbol</code><br>Symbol name at the code location.</td>
    </tr>
    <tr>
      <td><code>url</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@package.root_parents.declaration.name.url</code><br>URL to view the file online (for example, in GitHub), highlighting the code location.</td>
    </tr>
  </tbody>
</table>

### Version

Version declared for the root parent.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>column_end</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@package.root_parents.declaration.version.column_end</code><br>Ending column position.</td>
    </tr>
    <tr>
      <td><code>column_start</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@package.root_parents.declaration.version.column_start</code><br>Starting column position.</td>
    </tr>
    <tr>
      <td><code>filename</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@package.root_parents.declaration.version.filename</code><br>Relative path to the file.</td>
    </tr>
    <tr>
      <td><code>is_test_file</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@package.root_parents.declaration.version.is_test_file</code><br>True if the code file is a test file; false otherwise.</td>
    </tr>
    <tr>
      <td><code>line_end</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@package.root_parents.declaration.version.line_end</code><br>Ending line number.</td>
    </tr>
    <tr>
      <td><code>line_start</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@package.root_parents.declaration.version.line_start</code><br>Starting line number.</td>
    </tr>
    <tr>
      <td><code>symbol</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@package.root_parents.declaration.version.symbol</code><br>Symbol name at the code location.</td>
    </tr>
    <tr>
      <td><code>url</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@package.root_parents.declaration.version.url</code><br>URL to view the file online (for example, in GitHub), highlighting the code location.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Remediation" level="h3" id="remediation" %}}

Information about the finding's remediation.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>code_update</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@remediation.code_update</code><br>-</td>
    </tr>
    <tr>
      <td><code>codegen</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@remediation.codegen</code><br>Finding status for the code generation platform.</td>
    </tr>
    <tr>
      <td><code>container_image</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@remediation.container_image</code><br>Newer container image version that may remediate the vulnerability.</td>
    </tr>
    <tr>
      <td><code>description</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@remediation.description</code><br>Description of the remediation.</td>
    </tr>
    <tr>
      <td><code>host_image</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@remediation.host_image</code><br>Latest host image version that may remediate the vulnerability.</td>
    </tr>
    <tr>
      <td><code>is_available</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@remediation.is_available</code><br>True if a remediation is currently available for the finding; false otherwise.</td>
    </tr>
    <tr>
      <td><code>microsoft_kb</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@remediation.microsoft_kb</code><br>Remediation strategy using a Microsoft Knowledge Base (KB) article.</td>
    </tr>
    <tr>
      <td><code>package</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@remediation.package</code><br>Remediation package information.</td>
    </tr>
    <tr>
      <td><code>recommended</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@remediation.recommended</code><br>Recommended remediation details.</td>
    </tr>
    <tr>
      <td><code>recommended_type</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@remediation.recommended_type</code><br>Recommended remediation type for the finding.</td>
    </tr>
    <tr>
      <td><code>root_package</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@remediation.root_package</code><br>Remediation root package information.</td>
    </tr>
  </tbody>
</table>

### Code Update

-

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>edits</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@remediation.code_update.edits</code><br>Code changes required to remediate the finding.</td>
    </tr>
  </tbody>
</table>

### Edits

Code changes required to remediate the finding.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>column_end</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@remediation.code_update.edits.column_end</code><br>Ending column position of the code change.</td>
    </tr>
    <tr>
      <td><code>column_start</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@remediation.code_update.edits.column_start</code><br>Starting column position of the code change.</td>
    </tr>
    <tr>
      <td><code>content</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@remediation.code_update.edits.content</code><br>Contents of the code change.</td>
    </tr>
    <tr>
      <td><code>line_end</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@remediation.code_update.edits.line_end</code><br>Ending line number of the code change.</td>
    </tr>
    <tr>
      <td><code>line_start</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@remediation.code_update.edits.line_start</code><br>Starting line number of the code change.</td>
    </tr>
    <tr>
      <td><code>type</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@remediation.code_update.edits.type</code><br>Nature of the code change.</td>
    </tr>
  </tbody>
</table>

### Codegen

Finding status for the code generation platform.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>id</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@remediation.codegen.id</code><br>Identifier used to track the remediation in the code generation backend.</td>
    </tr>
    <tr>
      <td><code>status</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@remediation.codegen.status</code><br>Status of the automated fix generation. Valid values: `generated`, `not_available_non_default_branch`, `not_available_unsupported_tool`, `not_available_unsupported_rule`, `not_available_disabled`, `not_available_git_provider_not_supported`, `not_available_confidence_too_low`, `error`, `not_available_has_deterministic_fixes`, `not_available_unknown_reason`, `not_available_org_not_onboarded`, `not_available_repository_disabled`.</td>
    </tr>
  </tbody>
</table>

### Container Image

Newer container image version that may remediate the vulnerability.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>closest_no_vulnerabilities</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@remediation.container_image.closest_no_vulnerabilities</code><br>Closest container image version with no vulnerabilities.</td>
    </tr>
  </tbody>
</table>

### Closest No Vulnerabilities

Closest container image version with no vulnerabilities.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>image_url</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@remediation.container_image.closest_no_vulnerabilities.image_url</code><br>URL of the container image that may remediate the vulnerability.</td>
    </tr>
    <tr>
      <td><code>layer_digests</code></td>
      <td>array (string)</td>
      <td><strong>Path:</strong> <code>@remediation.container_image.closest_no_vulnerabilities.layer_digests</code><br>Layer digests of the currently vulnerable container image that needs to be upgraded.</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@remediation.container_image.closest_no_vulnerabilities.name</code><br>Name of the container image that may remediate the vulnerability.</td>
    </tr>
    <tr>
      <td><code>tag</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@remediation.container_image.closest_no_vulnerabilities.tag</code><br>Tag of the container image that may remediate the vulnerability.</td>
    </tr>
  </tbody>
</table>

### Host Image

Latest host image version that may remediate the vulnerability.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>latest_major</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@remediation.host_image.latest_major</code><br>Information about the latest Amazon Machine Image (AMI) that may remediate the vulnerability.</td>
    </tr>
  </tbody>
</table>

### Latest Major

Information about the latest Amazon Machine Image (AMI) that may remediate the vulnerability.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>name</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@remediation.host_image.latest_major.name</code><br>Name of the latest Amazon Machine Image (for example, `ami-12345678`) that may remediate the vulnerability.</td>
    </tr>
  </tbody>
</table>

### Microsoft Kb

Remediation strategy using a Microsoft Knowledge Base (KB) article.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>closest_fix_advisory</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@remediation.microsoft_kb.closest_fix_advisory</code><br>The closest patch available to address the current advisory.</td>
    </tr>
  </tbody>
</table>

### Closest Fix Advisory

The closest patch available to address the current advisory.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>article</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@remediation.microsoft_kb.closest_fix_advisory.article</code><br>Article name for the closest patch.</td>
    </tr>
  </tbody>
</table>

### Package

Remediation package information.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@remediation.package.base</code><br>-</td>
    </tr>
    <tr>
      <td><code>closest_no_critical</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@remediation.package.closest_no_critical</code><br>Closest package version with no critical vulnerabilities (based on base score).</td>
    </tr>
    <tr>
      <td><code>closest_no_vulnerabilities</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@remediation.package.closest_no_vulnerabilities</code><br>Closest package version with no vulnerabilities.</td>
    </tr>
    <tr>
      <td><code>latest_no_critical</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@remediation.package.latest_no_critical</code><br>The latest remediation package version with no critical vulnerabilities (based on base score).</td>
    </tr>
    <tr>
      <td><code>latest_no_vulnerabilities</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@remediation.package.latest_no_vulnerabilities</code><br>Latest package version with no vulnerabilities.</td>
    </tr>
  </tbody>
</table>

### Base

-

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>fixed_advisories</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@remediation.package.base.fixed_advisories</code><br>Advisories that the remediation will fix.</td>
    </tr>
    <tr>
      <td><code>has_incomplete_data</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@remediation.package.base.has_incomplete_data</code><br>Flag to indicate whether the remediation may have incomplete dependency data and therefore it may not be 100% accurate</td>
    </tr>
    <tr>
      <td><code>is_auto_solvable</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@remediation.package.base.is_auto_solvable</code><br>Flag to indicate whether the remediation is autosolvable (only recompiling is needed)</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@remediation.package.base.name</code><br>Recommended package name that fixes the finding.</td>
    </tr>
    <tr>
      <td><code>new_advisories</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@remediation.package.base.new_advisories</code><br>Advisories that will appear if the remediation is applied.</td>
    </tr>
    <tr>
      <td><code>original_name</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@remediation.package.base.original_name</code><br>Original name of the recommended package that fixes the finding.</td>
    </tr>
    <tr>
      <td><code>remaining_advisories</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@remediation.package.base.remaining_advisories</code><br>Advisories that will remain unfixed if the remediation is applied.</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@remediation.package.base.version</code><br>Recommended package version that fixes the finding.</td>
    </tr>
  </tbody>
</table>

### Fixed Advisories

Advisories that the remediation will fix.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@remediation.package.base.fixed_advisories.base_severity</code><br>Base severity of the advisory that the remediation will fix.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@remediation.package.base.fixed_advisories.id</code><br>Identifier of the advisory that the remediation will fix.</td>
    </tr>
  </tbody>
</table>

### New Advisories

Advisories that will appear if the remediation is applied.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@remediation.package.base.new_advisories.base_severity</code><br>Base severity of the advisory that the remediation will fix.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@remediation.package.base.new_advisories.id</code><br>Identifier of the advisory that the remediation will fix.</td>
    </tr>
  </tbody>
</table>

### Remaining Advisories

Advisories that will remain unfixed if the remediation is applied.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@remediation.package.base.remaining_advisories.base_severity</code><br>Base severity of the advisory that the remediation will fix.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@remediation.package.base.remaining_advisories.id</code><br>Identifier of the advisory that the remediation will fix.</td>
    </tr>
  </tbody>
</table>

### Closest No Critical

Closest package version with no critical vulnerabilities (based on base score).

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>fixed_advisories</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@remediation.package.closest_no_critical.fixed_advisories</code><br>Advisories that the remediation will fix.</td>
    </tr>
    <tr>
      <td><code>has_incomplete_data</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@remediation.package.closest_no_critical.has_incomplete_data</code><br>Flag to indicate whether the remediation may have incomplete dependency data and therefore it may not be 100% accurate</td>
    </tr>
    <tr>
      <td><code>is_auto_solvable</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@remediation.package.closest_no_critical.is_auto_solvable</code><br>Flag to indicate whether the remediation is autosolvable (only recompiling is needed)</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@remediation.package.closest_no_critical.name</code><br>Recommended package name that fixes the finding.</td>
    </tr>
    <tr>
      <td><code>new_advisories</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@remediation.package.closest_no_critical.new_advisories</code><br>Advisories that will appear if the remediation is applied.</td>
    </tr>
    <tr>
      <td><code>original_name</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@remediation.package.closest_no_critical.original_name</code><br>Original name of the recommended package that fixes the finding.</td>
    </tr>
    <tr>
      <td><code>remaining_advisories</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@remediation.package.closest_no_critical.remaining_advisories</code><br>Advisories that will remain unfixed if the remediation is applied.</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@remediation.package.closest_no_critical.version</code><br>Recommended package version that fixes the finding.</td>
    </tr>
  </tbody>
</table>

### Fixed Advisories

Advisories that the remediation will fix.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@remediation.package.closest_no_critical.fixed_advisories.base_severity</code><br>Base severity of the advisory that the remediation will fix.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@remediation.package.closest_no_critical.fixed_advisories.id</code><br>Identifier of the advisory that the remediation will fix.</td>
    </tr>
  </tbody>
</table>

### New Advisories

Advisories that will appear if the remediation is applied.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@remediation.package.closest_no_critical.new_advisories.base_severity</code><br>Base severity of the advisory that the remediation will fix.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@remediation.package.closest_no_critical.new_advisories.id</code><br>Identifier of the advisory that the remediation will fix.</td>
    </tr>
  </tbody>
</table>

### Remaining Advisories

Advisories that will remain unfixed if the remediation is applied.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@remediation.package.closest_no_critical.remaining_advisories.base_severity</code><br>Base severity of the advisory that the remediation will fix.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@remediation.package.closest_no_critical.remaining_advisories.id</code><br>Identifier of the advisory that the remediation will fix.</td>
    </tr>
  </tbody>
</table>

### Closest No Vulnerabilities

Closest package version with no vulnerabilities.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>fixed_advisories</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@remediation.package.closest_no_vulnerabilities.fixed_advisories</code><br>Advisories that the remediation will fix.</td>
    </tr>
    <tr>
      <td><code>has_incomplete_data</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@remediation.package.closest_no_vulnerabilities.has_incomplete_data</code><br>Flag to indicate whether the remediation may have incomplete dependency data and therefore it may not be 100% accurate</td>
    </tr>
    <tr>
      <td><code>is_auto_solvable</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@remediation.package.closest_no_vulnerabilities.is_auto_solvable</code><br>Flag to indicate whether the remediation is autosolvable (only recompiling is needed)</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@remediation.package.closest_no_vulnerabilities.name</code><br>Recommended package name that fixes the finding.</td>
    </tr>
    <tr>
      <td><code>new_advisories</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@remediation.package.closest_no_vulnerabilities.new_advisories</code><br>Advisories that will appear if the remediation is applied.</td>
    </tr>
    <tr>
      <td><code>original_name</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@remediation.package.closest_no_vulnerabilities.original_name</code><br>Original name of the recommended package that fixes the finding.</td>
    </tr>
    <tr>
      <td><code>remaining_advisories</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@remediation.package.closest_no_vulnerabilities.remaining_advisories</code><br>Advisories that will remain unfixed if the remediation is applied.</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@remediation.package.closest_no_vulnerabilities.version</code><br>Recommended package version that fixes the finding.</td>
    </tr>
  </tbody>
</table>

### Fixed Advisories

Advisories that the remediation will fix.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@remediation.package.closest_no_vulnerabilities.fixed_advisories.base_severity</code><br>Base severity of the advisory that the remediation will fix.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@remediation.package.closest_no_vulnerabilities.fixed_advisories.id</code><br>Identifier of the advisory that the remediation will fix.</td>
    </tr>
  </tbody>
</table>

### New Advisories

Advisories that will appear if the remediation is applied.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@remediation.package.closest_no_vulnerabilities.new_advisories.base_severity</code><br>Base severity of the advisory that the remediation will fix.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@remediation.package.closest_no_vulnerabilities.new_advisories.id</code><br>Identifier of the advisory that the remediation will fix.</td>
    </tr>
  </tbody>
</table>

### Remaining Advisories

Advisories that will remain unfixed if the remediation is applied.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@remediation.package.closest_no_vulnerabilities.remaining_advisories.base_severity</code><br>Base severity of the advisory that the remediation will fix.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@remediation.package.closest_no_vulnerabilities.remaining_advisories.id</code><br>Identifier of the advisory that the remediation will fix.</td>
    </tr>
  </tbody>
</table>

### Latest No Critical

The latest remediation package version with no critical vulnerabilities (based on base score).

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>fixed_advisories</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@remediation.package.latest_no_critical.fixed_advisories</code><br>Advisories that the remediation will fix.</td>
    </tr>
    <tr>
      <td><code>has_incomplete_data</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@remediation.package.latest_no_critical.has_incomplete_data</code><br>Flag to indicate whether the remediation may have incomplete dependency data and therefore it may not be 100% accurate</td>
    </tr>
    <tr>
      <td><code>is_auto_solvable</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@remediation.package.latest_no_critical.is_auto_solvable</code><br>Flag to indicate whether the remediation is autosolvable (only recompiling is needed)</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@remediation.package.latest_no_critical.name</code><br>Recommended package name that fixes the finding.</td>
    </tr>
    <tr>
      <td><code>new_advisories</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@remediation.package.latest_no_critical.new_advisories</code><br>Advisories that will appear if the remediation is applied.</td>
    </tr>
    <tr>
      <td><code>original_name</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@remediation.package.latest_no_critical.original_name</code><br>Original name of the recommended package that fixes the finding.</td>
    </tr>
    <tr>
      <td><code>remaining_advisories</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@remediation.package.latest_no_critical.remaining_advisories</code><br>Advisories that will remain unfixed if the remediation is applied.</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@remediation.package.latest_no_critical.version</code><br>Recommended package version that fixes the finding.</td>
    </tr>
  </tbody>
</table>

### Fixed Advisories

Advisories that the remediation will fix.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@remediation.package.latest_no_critical.fixed_advisories.base_severity</code><br>Base severity of the advisory that the remediation will fix.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@remediation.package.latest_no_critical.fixed_advisories.id</code><br>Identifier of the advisory that the remediation will fix.</td>
    </tr>
  </tbody>
</table>

### New Advisories

Advisories that will appear if the remediation is applied.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@remediation.package.latest_no_critical.new_advisories.base_severity</code><br>Base severity of the advisory that the remediation will fix.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@remediation.package.latest_no_critical.new_advisories.id</code><br>Identifier of the advisory that the remediation will fix.</td>
    </tr>
  </tbody>
</table>

### Remaining Advisories

Advisories that will remain unfixed if the remediation is applied.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@remediation.package.latest_no_critical.remaining_advisories.base_severity</code><br>Base severity of the advisory that the remediation will fix.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@remediation.package.latest_no_critical.remaining_advisories.id</code><br>Identifier of the advisory that the remediation will fix.</td>
    </tr>
  </tbody>
</table>

### Latest No Vulnerabilities

Latest package version with no vulnerabilities.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>fixed_advisories</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@remediation.package.latest_no_vulnerabilities.fixed_advisories</code><br>Advisories that the remediation will fix.</td>
    </tr>
    <tr>
      <td><code>has_incomplete_data</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@remediation.package.latest_no_vulnerabilities.has_incomplete_data</code><br>Flag to indicate whether the remediation may have incomplete dependency data and therefore it may not be 100% accurate</td>
    </tr>
    <tr>
      <td><code>is_auto_solvable</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@remediation.package.latest_no_vulnerabilities.is_auto_solvable</code><br>Flag to indicate whether the remediation is autosolvable (only recompiling is needed)</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@remediation.package.latest_no_vulnerabilities.name</code><br>Recommended package name that fixes the finding.</td>
    </tr>
    <tr>
      <td><code>new_advisories</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@remediation.package.latest_no_vulnerabilities.new_advisories</code><br>Advisories that will appear if the remediation is applied.</td>
    </tr>
    <tr>
      <td><code>original_name</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@remediation.package.latest_no_vulnerabilities.original_name</code><br>Original name of the recommended package that fixes the finding.</td>
    </tr>
    <tr>
      <td><code>remaining_advisories</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@remediation.package.latest_no_vulnerabilities.remaining_advisories</code><br>Advisories that will remain unfixed if the remediation is applied.</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@remediation.package.latest_no_vulnerabilities.version</code><br>Recommended package version that fixes the finding.</td>
    </tr>
  </tbody>
</table>

### Fixed Advisories

Advisories that the remediation will fix.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@remediation.package.latest_no_vulnerabilities.fixed_advisories.base_severity</code><br>Base severity of the advisory that the remediation will fix.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@remediation.package.latest_no_vulnerabilities.fixed_advisories.id</code><br>Identifier of the advisory that the remediation will fix.</td>
    </tr>
  </tbody>
</table>

### New Advisories

Advisories that will appear if the remediation is applied.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@remediation.package.latest_no_vulnerabilities.new_advisories.base_severity</code><br>Base severity of the advisory that the remediation will fix.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@remediation.package.latest_no_vulnerabilities.new_advisories.id</code><br>Identifier of the advisory that the remediation will fix.</td>
    </tr>
  </tbody>
</table>

### Remaining Advisories

Advisories that will remain unfixed if the remediation is applied.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@remediation.package.latest_no_vulnerabilities.remaining_advisories.base_severity</code><br>Base severity of the advisory that the remediation will fix.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@remediation.package.latest_no_vulnerabilities.remaining_advisories.id</code><br>Identifier of the advisory that the remediation will fix.</td>
    </tr>
  </tbody>
</table>

### Root Package

Remediation root package information.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.base</code><br>-</td>
    </tr>
    <tr>
      <td><code>closest_no_critical</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.closest_no_critical</code><br>Closest package version with no critical vulnerabilities (based on base score).</td>
    </tr>
    <tr>
      <td><code>closest_no_vulnerabilities</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.closest_no_vulnerabilities</code><br>Closest package version with no vulnerabilities.</td>
    </tr>
    <tr>
      <td><code>latest_no_critical</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.latest_no_critical</code><br>The latest remediation package version with no critical vulnerabilities (based on base score).</td>
    </tr>
    <tr>
      <td><code>latest_no_vulnerabilities</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.latest_no_vulnerabilities</code><br>Latest package version with no vulnerabilities.</td>
    </tr>
  </tbody>
</table>

### Base

-

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>fixed_advisories</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.base.fixed_advisories</code><br>Advisories that the remediation will fix.</td>
    </tr>
    <tr>
      <td><code>has_incomplete_data</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.base.has_incomplete_data</code><br>Flag to indicate whether the remediation may have incomplete dependency data and therefore it may not be 100% accurate</td>
    </tr>
    <tr>
      <td><code>is_auto_solvable</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.base.is_auto_solvable</code><br>Flag to indicate whether the remediation is autosolvable (only recompiling is needed)</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.base.name</code><br>Recommended package name that fixes the finding.</td>
    </tr>
    <tr>
      <td><code>new_advisories</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.base.new_advisories</code><br>Advisories that will appear if the remediation is applied.</td>
    </tr>
    <tr>
      <td><code>original_name</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.base.original_name</code><br>Original name of the recommended package that fixes the finding.</td>
    </tr>
    <tr>
      <td><code>remaining_advisories</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.base.remaining_advisories</code><br>Advisories that will remain unfixed if the remediation is applied.</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.base.version</code><br>Recommended package version that fixes the finding.</td>
    </tr>
  </tbody>
</table>

### Fixed Advisories

Advisories that the remediation will fix.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.base.fixed_advisories.base_severity</code><br>Base severity of the advisory that the remediation will fix.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.base.fixed_advisories.id</code><br>Identifier of the advisory that the remediation will fix.</td>
    </tr>
  </tbody>
</table>

### New Advisories

Advisories that will appear if the remediation is applied.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.base.new_advisories.base_severity</code><br>Base severity of the advisory that the remediation will fix.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.base.new_advisories.id</code><br>Identifier of the advisory that the remediation will fix.</td>
    </tr>
  </tbody>
</table>

### Remaining Advisories

Advisories that will remain unfixed if the remediation is applied.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.base.remaining_advisories.base_severity</code><br>Base severity of the advisory that the remediation will fix.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.base.remaining_advisories.id</code><br>Identifier of the advisory that the remediation will fix.</td>
    </tr>
  </tbody>
</table>

### Closest No Critical

Closest package version with no critical vulnerabilities (based on base score).

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>fixed_advisories</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.closest_no_critical.fixed_advisories</code><br>Advisories that the remediation will fix.</td>
    </tr>
    <tr>
      <td><code>has_incomplete_data</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.closest_no_critical.has_incomplete_data</code><br>Flag to indicate whether the remediation may have incomplete dependency data and therefore it may not be 100% accurate</td>
    </tr>
    <tr>
      <td><code>is_auto_solvable</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.closest_no_critical.is_auto_solvable</code><br>Flag to indicate whether the remediation is autosolvable (only recompiling is needed)</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.closest_no_critical.name</code><br>Recommended package name that fixes the finding.</td>
    </tr>
    <tr>
      <td><code>new_advisories</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.closest_no_critical.new_advisories</code><br>Advisories that will appear if the remediation is applied.</td>
    </tr>
    <tr>
      <td><code>original_name</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.closest_no_critical.original_name</code><br>Original name of the recommended package that fixes the finding.</td>
    </tr>
    <tr>
      <td><code>remaining_advisories</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.closest_no_critical.remaining_advisories</code><br>Advisories that will remain unfixed if the remediation is applied.</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.closest_no_critical.version</code><br>Recommended package version that fixes the finding.</td>
    </tr>
  </tbody>
</table>

### Fixed Advisories

Advisories that the remediation will fix.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.closest_no_critical.fixed_advisories.base_severity</code><br>Base severity of the advisory that the remediation will fix.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.closest_no_critical.fixed_advisories.id</code><br>Identifier of the advisory that the remediation will fix.</td>
    </tr>
  </tbody>
</table>

### New Advisories

Advisories that will appear if the remediation is applied.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.closest_no_critical.new_advisories.base_severity</code><br>Base severity of the advisory that the remediation will fix.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.closest_no_critical.new_advisories.id</code><br>Identifier of the advisory that the remediation will fix.</td>
    </tr>
  </tbody>
</table>

### Remaining Advisories

Advisories that will remain unfixed if the remediation is applied.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.closest_no_critical.remaining_advisories.base_severity</code><br>Base severity of the advisory that the remediation will fix.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.closest_no_critical.remaining_advisories.id</code><br>Identifier of the advisory that the remediation will fix.</td>
    </tr>
  </tbody>
</table>

### Closest No Vulnerabilities

Closest package version with no vulnerabilities.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>fixed_advisories</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.closest_no_vulnerabilities.fixed_advisories</code><br>Advisories that the remediation will fix.</td>
    </tr>
    <tr>
      <td><code>has_incomplete_data</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.closest_no_vulnerabilities.has_incomplete_data</code><br>Flag to indicate whether the remediation may have incomplete dependency data and therefore it may not be 100% accurate</td>
    </tr>
    <tr>
      <td><code>is_auto_solvable</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.closest_no_vulnerabilities.is_auto_solvable</code><br>Flag to indicate whether the remediation is autosolvable (only recompiling is needed)</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.closest_no_vulnerabilities.name</code><br>Recommended package name that fixes the finding.</td>
    </tr>
    <tr>
      <td><code>new_advisories</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.closest_no_vulnerabilities.new_advisories</code><br>Advisories that will appear if the remediation is applied.</td>
    </tr>
    <tr>
      <td><code>original_name</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.closest_no_vulnerabilities.original_name</code><br>Original name of the recommended package that fixes the finding.</td>
    </tr>
    <tr>
      <td><code>remaining_advisories</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.closest_no_vulnerabilities.remaining_advisories</code><br>Advisories that will remain unfixed if the remediation is applied.</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.closest_no_vulnerabilities.version</code><br>Recommended package version that fixes the finding.</td>
    </tr>
  </tbody>
</table>

### Fixed Advisories

Advisories that the remediation will fix.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.closest_no_vulnerabilities.fixed_advisories.base_severity</code><br>Base severity of the advisory that the remediation will fix.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.closest_no_vulnerabilities.fixed_advisories.id</code><br>Identifier of the advisory that the remediation will fix.</td>
    </tr>
  </tbody>
</table>

### New Advisories

Advisories that will appear if the remediation is applied.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.closest_no_vulnerabilities.new_advisories.base_severity</code><br>Base severity of the advisory that the remediation will fix.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.closest_no_vulnerabilities.new_advisories.id</code><br>Identifier of the advisory that the remediation will fix.</td>
    </tr>
  </tbody>
</table>

### Remaining Advisories

Advisories that will remain unfixed if the remediation is applied.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.closest_no_vulnerabilities.remaining_advisories.base_severity</code><br>Base severity of the advisory that the remediation will fix.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.closest_no_vulnerabilities.remaining_advisories.id</code><br>Identifier of the advisory that the remediation will fix.</td>
    </tr>
  </tbody>
</table>

### Latest No Critical

The latest remediation package version with no critical vulnerabilities (based on base score).

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>fixed_advisories</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.latest_no_critical.fixed_advisories</code><br>Advisories that the remediation will fix.</td>
    </tr>
    <tr>
      <td><code>has_incomplete_data</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.latest_no_critical.has_incomplete_data</code><br>Flag to indicate whether the remediation may have incomplete dependency data and therefore it may not be 100% accurate</td>
    </tr>
    <tr>
      <td><code>is_auto_solvable</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.latest_no_critical.is_auto_solvable</code><br>Flag to indicate whether the remediation is autosolvable (only recompiling is needed)</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.latest_no_critical.name</code><br>Recommended package name that fixes the finding.</td>
    </tr>
    <tr>
      <td><code>new_advisories</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.latest_no_critical.new_advisories</code><br>Advisories that will appear if the remediation is applied.</td>
    </tr>
    <tr>
      <td><code>original_name</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.latest_no_critical.original_name</code><br>Original name of the recommended package that fixes the finding.</td>
    </tr>
    <tr>
      <td><code>remaining_advisories</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.latest_no_critical.remaining_advisories</code><br>Advisories that will remain unfixed if the remediation is applied.</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.latest_no_critical.version</code><br>Recommended package version that fixes the finding.</td>
    </tr>
  </tbody>
</table>

### Fixed Advisories

Advisories that the remediation will fix.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.latest_no_critical.fixed_advisories.base_severity</code><br>Base severity of the advisory that the remediation will fix.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.latest_no_critical.fixed_advisories.id</code><br>Identifier of the advisory that the remediation will fix.</td>
    </tr>
  </tbody>
</table>

### New Advisories

Advisories that will appear if the remediation is applied.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.latest_no_critical.new_advisories.base_severity</code><br>Base severity of the advisory that the remediation will fix.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.latest_no_critical.new_advisories.id</code><br>Identifier of the advisory that the remediation will fix.</td>
    </tr>
  </tbody>
</table>

### Remaining Advisories

Advisories that will remain unfixed if the remediation is applied.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.latest_no_critical.remaining_advisories.base_severity</code><br>Base severity of the advisory that the remediation will fix.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.latest_no_critical.remaining_advisories.id</code><br>Identifier of the advisory that the remediation will fix.</td>
    </tr>
  </tbody>
</table>

### Latest No Vulnerabilities

Latest package version with no vulnerabilities.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>fixed_advisories</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.latest_no_vulnerabilities.fixed_advisories</code><br>Advisories that the remediation will fix.</td>
    </tr>
    <tr>
      <td><code>has_incomplete_data</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.latest_no_vulnerabilities.has_incomplete_data</code><br>Flag to indicate whether the remediation may have incomplete dependency data and therefore it may not be 100% accurate</td>
    </tr>
    <tr>
      <td><code>is_auto_solvable</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.latest_no_vulnerabilities.is_auto_solvable</code><br>Flag to indicate whether the remediation is autosolvable (only recompiling is needed)</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.latest_no_vulnerabilities.name</code><br>Recommended package name that fixes the finding.</td>
    </tr>
    <tr>
      <td><code>new_advisories</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.latest_no_vulnerabilities.new_advisories</code><br>Advisories that will appear if the remediation is applied.</td>
    </tr>
    <tr>
      <td><code>original_name</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.latest_no_vulnerabilities.original_name</code><br>Original name of the recommended package that fixes the finding.</td>
    </tr>
    <tr>
      <td><code>remaining_advisories</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.latest_no_vulnerabilities.remaining_advisories</code><br>Advisories that will remain unfixed if the remediation is applied.</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.latest_no_vulnerabilities.version</code><br>Recommended package version that fixes the finding.</td>
    </tr>
  </tbody>
</table>

### Fixed Advisories

Advisories that the remediation will fix.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.latest_no_vulnerabilities.fixed_advisories.base_severity</code><br>Base severity of the advisory that the remediation will fix.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.latest_no_vulnerabilities.fixed_advisories.id</code><br>Identifier of the advisory that the remediation will fix.</td>
    </tr>
  </tbody>
</table>

### New Advisories

Advisories that will appear if the remediation is applied.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.latest_no_vulnerabilities.new_advisories.base_severity</code><br>Base severity of the advisory that the remediation will fix.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.latest_no_vulnerabilities.new_advisories.id</code><br>Identifier of the advisory that the remediation will fix.</td>
    </tr>
  </tbody>
</table>

### Remaining Advisories

Advisories that will remain unfixed if the remediation is applied.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.latest_no_vulnerabilities.remaining_advisories.base_severity</code><br>Base severity of the advisory that the remediation will fix.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.latest_no_vulnerabilities.remaining_advisories.id</code><br>Identifier of the advisory that the remediation will fix.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Risk" level="h3" id="risk" %}}

Risk-related attributes for the finding. Each key must have a matching key in the `risk_details` namespace.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>has_exploit_available</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk.has_exploit_available</code><br>True if known exploits exist for the finding; false otherwise.</td>
    </tr>
    <tr>
      <td><code>has_high_exploitability_chance</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk.has_high_exploitability_chance</code><br>True if the EPSS (Exploit Prediction Scoring System) score is above 1%; false otherwise.</td>
    </tr>
    <tr>
      <td><code>has_privileged_access</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk.has_privileged_access</code><br>True if the finding's resource is running with elevated privileges or has the ability to assume a privileged role; false otherwise.</td>
    </tr>
    <tr>
      <td><code>has_sensitive_data</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk.has_sensitive_data</code><br>True if the finding has access to a resource that contains sensitive data; false otherwise.</td>
    </tr>
    <tr>
      <td><code>is_authenticated</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk.is_authenticated</code><br>`true` if the API endpoint requires authentication to access, `false` if the endpoint does not require authentication. Omitted if authentication status is unknown.</td>
    </tr>
    <tr>
      <td><code>is_critical_resource</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk.is_critical_resource</code><br>`true` if the affected resource is critical to your business; `false` otherwise.</td>
    </tr>
    <tr>
      <td><code>is_emerging</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk.is_emerging</code><br>`true` if the vulnerability is linked to an advisory classified as an emerging vulnerability, `false` otherwise.</td>
    </tr>
    <tr>
      <td><code>is_exposed_to_attacks</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk.is_exposed_to_attacks</code><br>True if attacks have already been detected on the resource; false otherwise.</td>
    </tr>
    <tr>
      <td><code>is_function_reachable</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk.is_function_reachable</code><br>True if the vulnerable function can be executed; false otherwise.</td>
    </tr>
    <tr>
      <td><code>is_image_running</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk.is_image_running</code><br>True if the image of the finding's resource has running containers or hosts; false otherwise.</td>
    </tr>
    <tr>
      <td><code>is_kernel_running</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk.is_kernel_running</code><br>True if the vulnerability affects the kernel currently running on the host; false otherwise.</td>
    </tr>
    <tr>
      <td><code>is_package_running</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk.is_package_running</code><br>True if the package of the finding's resource is running; false otherwise.</td>
    </tr>
    <tr>
      <td><code>is_production</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk.is_production</code><br>True if the finding's resource is running in production; false otherwise.</td>
    </tr>
    <tr>
      <td><code>is_publicly_accessible</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk.is_publicly_accessible</code><br>True if the finding's resource is publicly accessible; false otherwise.</td>
    </tr>
    <tr>
      <td><code>is_tainted_from_database</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk.is_tainted_from_database</code><br>True if the string is tainted due to originating from an untrusted database source; false otherwise.</td>
    </tr>
    <tr>
      <td><code>is_tainted_from_query_string</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk.is_tainted_from_query_string</code><br>True if the string is tainted with elements derived from an HTTP query string; false otherwise.</td>
    </tr>
    <tr>
      <td><code>is_tainted_from_request_url</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk.is_tainted_from_request_url</code><br>True if the final URL contains tainted parts originating from the request URL; false otherwise.</td>
    </tr>
    <tr>
      <td><code>is_using_sha1</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk.is_using_sha1</code><br>True if SHA1 is used in a weak hash; false otherwise.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Risk Details" level="h3" id="risk-details" %}}

Contextual risk factors that help assess the potential impact of a finding. These fields describe characteristics like exposure, sensitivity, and signs of active exploitation.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>has_exploit_available</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.has_exploit_available</code><br>Information about whether a known exploit exists for the finding advisory.</td>
    </tr>
    <tr>
      <td><code>has_high_exploitability_chance</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.has_high_exploitability_chance</code><br>Evidence and indicators about whether the vulnerability is likely to be exploited based on EPSS (Exploit Prediction Scoring System).</td>
    </tr>
    <tr>
      <td><code>has_privileged_access</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.has_privileged_access</code><br>Evidence and indicators about whether the resource has privileged access.</td>
    </tr>
    <tr>
      <td><code>has_sensitive_data</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.has_sensitive_data</code><br>Evidence and indicators about whether the affected resource has sensitive data.</td>
    </tr>
    <tr>
      <td><code>is_authenticated</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.is_authenticated</code><br>Evidence and indicators about whether the API endpoint requires authentication.</td>
    </tr>
    <tr>
      <td><code>is_critical_resource</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.is_critical_resource</code><br>Evidence and indicators about whether the affected resource is critical.</td>
    </tr>
    <tr>
      <td><code>is_emerging</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.is_emerging</code><br>Evidence and indicators about whether the vulnerability is classified as an emerging vulnerability.</td>
    </tr>
    <tr>
      <td><code>is_exposed_to_attacks</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.is_exposed_to_attacks</code><br>Evidence and indicators about whether the service where the finding was detected is exposed to attacks.</td>
    </tr>
    <tr>
      <td><code>is_function_reachable</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.is_function_reachable</code><br>Evidence and indicators about whether the vulnerable function or module is used in the code.</td>
    </tr>
    <tr>
      <td><code>is_image_running</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.is_image_running</code><br>Evidence and indicators about whether the affected image has running containers or hosts.</td>
    </tr>
    <tr>
      <td><code>is_kernel_running</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.is_kernel_running</code><br>Evidence and indicators about whether the vulnerability affects the kernel currently running on the host.</td>
    </tr>
    <tr>
      <td><code>is_package_running</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.is_package_running</code><br>Evidence and indicators about whether the affected package is running.</td>
    </tr>
    <tr>
      <td><code>is_production</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.is_production</code><br>Evidence and indicators about whether the resource associated with the finding is running in a production environment.</td>
    </tr>
    <tr>
      <td><code>is_publicly_accessible</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.is_publicly_accessible</code><br>Information about whether the affected resource is accessible from the public internet.</td>
    </tr>
    <tr>
      <td><code>is_tainted_from_database</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.is_tainted_from_database</code><br>Information about whether tainted parts originate from a database.</td>
    </tr>
    <tr>
      <td><code>is_tainted_from_query_string</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.is_tainted_from_query_string</code><br>Information about whether the tainted parts originated from a query string.</td>
    </tr>
    <tr>
      <td><code>is_tainted_from_request_url</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.is_tainted_from_request_url</code><br>Information about whether the tainted parts originate from the request URL.</td>
    </tr>
    <tr>
      <td><code>is_using_sha1</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.is_using_sha1</code><br>Information about whether SHA1 is used in a weak hash.</td>
    </tr>
  </tbody>
</table>

### Has Exploit Available

Information about whether a known exploit exists for the finding advisory.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>evidence</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.has_exploit_available.evidence</code><br>Evidence of exploit availability.</td>
    </tr>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.has_exploit_available.impact_cvss</code><br>How the availability of known exploits changes the CVSS scoring. Valid values: `riskier`, `neutral`, `safer`, `unknown`.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk_details.has_exploit_available.value</code><br>True if known exploits exist for the finding; false otherwise.</td>
    </tr>
  </tbody>
</table>

### Evidence

Evidence of exploit availability.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>exploit_sources</code></td>
      <td>array (string)</td>
      <td><strong>Path:</strong> <code>@risk_details.has_exploit_available.evidence.exploit_sources</code><br>Exploit sources associated with the finding (for example, `NIST`, `CISA`, `Exploit-DB`).</td>
    </tr>
    <tr>
      <td><code>exploit_urls</code></td>
      <td>array (string)</td>
      <td><strong>Path:</strong> <code>@risk_details.has_exploit_available.evidence.exploit_urls</code><br>Exploit URLs associated with the finding.</td>
    </tr>
    <tr>
      <td><code>type</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.has_exploit_available.evidence.type</code><br>Type of exploit availability evidence. Valid values: `production_ready`, `poc`, `unavailable`.</td>
    </tr>
  </tbody>
</table>

### Has High Exploitability Chance

Evidence and indicators about whether the vulnerability is likely to be exploited based on EPSS (Exploit Prediction Scoring System).

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>evidence</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.has_high_exploitability_chance.evidence</code><br>Evidence for the EPSS score.</td>
    </tr>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.has_high_exploitability_chance.impact_cvss</code><br>How high exploitability chance affects the CVSS scoring. Valid values: `riskier`, `neutral`, `safer`, `unknown`.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk_details.has_high_exploitability_chance.value</code><br>True if the EPSS score is above 1%; false otherwise.</td>
    </tr>
  </tbody>
</table>

### Evidence

Evidence for the EPSS score.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>epss_score</code></td>
      <td>number</td>
      <td><strong>Path:</strong> <code>@risk_details.has_high_exploitability_chance.evidence.epss_score</code><br>EPSS score as a percentage representing the chance of exploitation.</td>
    </tr>
    <tr>
      <td><code>epss_severity</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.has_high_exploitability_chance.evidence.epss_severity</code><br>EPSS score severity level. Valid values: `Critical`, `High`, `Medium`, `Low`.</td>
    </tr>
    <tr>
      <td><code>threshold</code></td>
      <td>number</td>
      <td><strong>Path:</strong> <code>@risk_details.has_high_exploitability_chance.evidence.threshold</code><br>Minimum EPSS score required for a vulnerability to be considered as having a high exploitability chance.</td>
    </tr>
  </tbody>
</table>

### Has Privileged Access

Evidence and indicators about whether the resource has privileged access.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>evidence</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.has_privileged_access.evidence</code><br>Evidence showing proof of privileged access.</td>
    </tr>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.has_privileged_access.impact_cvss</code><br>How privileged access changes the CVSS scoring. Valid values: `riskier`, `neutral`, `safer`, `unknown`.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk_details.has_privileged_access.value</code><br>True if the resource associated with the finding has privileged access; false otherwise.</td>
    </tr>
  </tbody>
</table>

### Evidence

Evidence showing proof of privileged access.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>resource_key</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@risk_details.has_privileged_access.evidence.resource_key</code><br>Canonical Cloud Resource Identifier with proof of privileged access.</td>
    </tr>
  </tbody>
</table>

### Has Sensitive Data

Evidence and indicators about whether the affected resource has sensitive data.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>evidence</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.has_sensitive_data.evidence</code><br>Evidence supporting the presence of sensitive data.</td>
    </tr>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.has_sensitive_data.impact_cvss</code><br>How sensitive data presence changes the CVSS score. Valid values: `riskier`, `neutral`, `safer`, `unknown`.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk_details.has_sensitive_data.value</code><br>Same as `risk.has_sensitive_data`.</td>
    </tr>
  </tbody>
</table>

### Evidence

Evidence supporting the presence of sensitive data.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>sds_id</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@risk_details.has_sensitive_data.evidence.sds_id</code><br>Identifier of a sensitive data entry that Datadog Sensitive Data Scanner detected.</td>
    </tr>
  </tbody>
</table>

### Is Authenticated

Evidence and indicators about whether the API endpoint requires authentication.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>value</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk_details.is_authenticated.value</code><br>Same as `risk.is_authenticated`.</td>
    </tr>
  </tbody>
</table>

### Is Critical Resource

Evidence and indicators about whether the affected resource is critical.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>evidence</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.is_critical_resource.evidence</code><br>Evidence used to identify the resource as being critical.</td>
    </tr>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.is_critical_resource.impact_cvss</code><br>How resource criticality changes the CVSS score. Valid values: `riskier`, `neutral`, `safer`, `unknown`.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk_details.is_critical_resource.value</code><br>`true` if the resource is critical to your business; `false` otherwise.</td>
    </tr>
  </tbody>
</table>

### Evidence

Evidence used to identify the resource as being critical.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>explanation</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@risk_details.is_critical_resource.evidence.explanation</code><br>Markdown-formatted explanation detailing why the resource or related resource is identified as critical.</td>
    </tr>
    <tr>
      <td><code>related_resource_name</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@risk_details.is_critical_resource.evidence.related_resource_name</code><br>Name of a long-lived critical asset, such as a critical service, that justifies why the affected resource is considered critical.</td>
    </tr>
  </tbody>
</table>

### Is Emerging

Evidence and indicators about whether the vulnerability is classified as an emerging vulnerability.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.is_emerging.impact_cvss</code><br>How emerging vulnerability status affects the CVSS scoring. Valid values: `riskier`, `neutral`, `safer`, `unknown`.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk_details.is_emerging.value</code><br>Same as `risk.is_emerging`.</td>
    </tr>
  </tbody>
</table>

### Is Exposed To Attacks

Evidence and indicators about whether the service where the finding was detected is exposed to attacks.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>evidence</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.is_exposed_to_attacks.evidence</code><br>Evidence for the presence of attacks.</td>
    </tr>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.is_exposed_to_attacks.impact_cvss</code><br>How the resource's exposure affects the CVSS scoring. Valid values: `riskier`, `neutral`, `safer`, `unknown`.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk_details.is_exposed_to_attacks.value</code><br>Same as `risk.is_exposed_to_attacks`.</td>
    </tr>
  </tbody>
</table>

### Evidence

Evidence for the presence of attacks.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>attacks_details</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.is_exposed_to_attacks.evidence.attacks_details</code><br>Details about one of the detected attacks.</td>
    </tr>
    <tr>
      <td><code>trace_example</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.is_exposed_to_attacks.evidence.trace_example</code><br>Example of a trace with attacks detected on the finding's resource.</td>
    </tr>
    <tr>
      <td><code>trace_query</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@risk_details.is_exposed_to_attacks.evidence.trace_query</code><br>Query used to find traces with attacks related to the finding's resource.</td>
    </tr>
  </tbody>
</table>

### Is Function Reachable

Evidence and indicators about whether the vulnerable function or module is used in the code.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>evidence</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.is_function_reachable.evidence</code><br>Evidence used to determine whether the function is reachable.</td>
    </tr>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.is_function_reachable.impact_cvss</code><br>How function reachability changes the CVSS risk assessment. Valid values: `riskier`, `neutral`, `safer`, `unknown`.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk_details.is_function_reachable.value</code><br>True if the function is reachable; false otherwise.</td>
    </tr>
  </tbody>
</table>

### Evidence

Evidence used to determine whether the function is reachable.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>locations</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@risk_details.is_function_reachable.evidence.locations</code><br>Array of code locations where the function is called.</td>
    </tr>
    <tr>
      <td><code>not_supported_reason</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.is_function_reachable.evidence.not_supported_reason</code><br>Reason why reachability analysis is not supported for this finding. Valid values: `language_not_supported`, `vulnerable_symbol_not_available`.</td>
    </tr>
  </tbody>
</table>

### Locations

Array of code locations where the function is called.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>column_end</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@risk_details.is_function_reachable.evidence.locations.column_end</code><br>Ending column position.</td>
    </tr>
    <tr>
      <td><code>column_start</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@risk_details.is_function_reachable.evidence.locations.column_start</code><br>Starting column position.</td>
    </tr>
    <tr>
      <td><code>filename</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@risk_details.is_function_reachable.evidence.locations.filename</code><br>Relative path to the file.</td>
    </tr>
    <tr>
      <td><code>is_test_file</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk_details.is_function_reachable.evidence.locations.is_test_file</code><br>True if the code file is a test file; false otherwise.</td>
    </tr>
    <tr>
      <td><code>line_end</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@risk_details.is_function_reachable.evidence.locations.line_end</code><br>Ending line number.</td>
    </tr>
    <tr>
      <td><code>line_start</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@risk_details.is_function_reachable.evidence.locations.line_start</code><br>Starting line number.</td>
    </tr>
    <tr>
      <td><code>symbol</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@risk_details.is_function_reachable.evidence.locations.symbol</code><br>Symbol name at the code location.</td>
    </tr>
    <tr>
      <td><code>url</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@risk_details.is_function_reachable.evidence.locations.url</code><br>URL to view the file online (for example, in GitHub), highlighting the code location.</td>
    </tr>
  </tbody>
</table>

### Is Image Running

Evidence and indicators about whether the affected image has running containers or hosts.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>evidence</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.is_image_running.evidence</code><br>Evidence showing proof of running containers or hosts.</td>
    </tr>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.is_image_running.impact_cvss</code><br>How running containers or hosts affects the CVSS scoring. Valid values: `riskier`, `neutral`, `safer`, `unknown`.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk_details.is_image_running.value</code><br>True if the image of the finding's resource has running containers or hosts; false otherwise.</td>
    </tr>
  </tbody>
</table>

### Evidence

Evidence showing proof of running containers or hosts.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>detected_at</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@risk_details.is_image_running.evidence.detected_at</code><br>Timestamp when the running containers or hosts were detected.</td>
    </tr>
  </tbody>
</table>

### Is Kernel Running

Evidence and indicators about whether the vulnerability affects the kernel currently running on the host.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>evidence</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.is_kernel_running.evidence</code><br>Evidence showing proof that the vulnerability affects the running kernel.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk_details.is_kernel_running.value</code><br>True if the vulnerability affects the kernel currently running on the host; false otherwise.</td>
    </tr>
  </tbody>
</table>

### Evidence

Evidence showing proof that the vulnerability affects the running kernel.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>kernel_version</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@risk_details.is_kernel_running.evidence.kernel_version</code><br>Version of the kernel currently running on the host.</td>
    </tr>
  </tbody>
</table>

### Is Package Running

Evidence and indicators about whether the affected package is running.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.is_package_running.impact_cvss</code><br>How a running package affects the CVSS scoring. Valid values: `riskier`, `neutral`, `safer`, `unknown`.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk_details.is_package_running.value</code><br>True if the package of the finding's resource is running; false otherwise.</td>
    </tr>
  </tbody>
</table>

### Is Production

Evidence and indicators about whether the resource associated with the finding is running in a production environment.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>evidence</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.is_production.evidence</code><br>The `env` tag value that determines whether the resource is in production.</td>
    </tr>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.is_production.impact_cvss</code><br>How production environment status affects the CVSS scoring. Valid values: `riskier`, `neutral`, `safer`, `unknown`.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk_details.is_production.value</code><br>Same as `risk.is_production`.</td>
    </tr>
  </tbody>
</table>

### Is Publicly Accessible

Information about whether the affected resource is accessible from the public internet.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>evidence</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.is_publicly_accessible.evidence</code><br>Evidence showing proof of access from the internet.</td>
    </tr>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.is_publicly_accessible.impact_cvss</code><br>How public accessibility affects the CVSS scoring. Valid values: `riskier`, `neutral`, `safer`, `unknown`.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk_details.is_publicly_accessible.value</code><br>Same as `risk.is_publicly_accessible`.</td>
    </tr>
  </tbody>
</table>

### Evidence

Evidence showing proof of access from the internet.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>resource_key</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@risk_details.is_publicly_accessible.evidence.resource_key</code><br>Canonical Cloud Resource Identifier of the resource accessible from the internet.</td>
    </tr>
  </tbody>
</table>

### Is Tainted From Database

Information about whether tainted parts originate from a database.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.is_tainted_from_database.impact_cvss</code><br>How database tainting changes the CVSS scoring. Valid values: `riskier`, `neutral`, `safer`, `unknown`.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk_details.is_tainted_from_database.value</code><br>True if the string is tainted due to originating from an untrusted database source; false otherwise.</td>
    </tr>
  </tbody>
</table>

### Is Tainted From Query String

Information about whether the tainted parts originated from a query string.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.is_tainted_from_query_string.impact_cvss</code><br>How query string tainting changes the CVSS scoring. Valid values: `riskier`, `neutral`, `safer`, `unknown`.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk_details.is_tainted_from_query_string.value</code><br>True if the string contains elements derived from an HTTP query string; false otherwise.</td>
    </tr>
  </tbody>
</table>

### Is Tainted From Request Url

Information about whether the tainted parts originate from the request URL.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.is_tainted_from_request_url.impact_cvss</code><br>How request URL tainting changes the CVSS scoring. Valid values: `riskier`, `neutral`, `safer`, `unknown`.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk_details.is_tainted_from_request_url.value</code><br>True if the final URL contains tainted parts originating from the request URL; false otherwise.</td>
    </tr>
  </tbody>
</table>

### Is Using Sha1

Information about whether SHA1 is used in a weak hash.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.is_using_sha1.impact_cvss</code><br>How SHA1 usage changes the CVSS scoring. Valid values: `riskier`, `neutral`, `safer`, `unknown`.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk_details.is_using_sha1.value</code><br>True if SHA1 is used in a weak hash; false otherwise.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Rule" level="h3" id="rule" %}}

How to discover a vulnerability. Vulnerability findings with rules indicate the vulnerability was detected in source code or running code. Rules are also used for non-vulnerability findings such as misconfigurations or API security.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>default_rule_id</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@rule.default_rule_id</code><br>Default rule identifier of the rule. Empty if it's a custom rule.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@rule.id</code><br>Identifier of the rule that generated the finding.</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@rule.name</code><br>Name of the rule that generated the finding.</td>
    </tr>
    <tr>
      <td><code>type</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@rule.type</code><br>Type of the rule that generated the finding.</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@rule.version</code><br>Version of the rule that generated the finding.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Runtime Context" level="h3" id="runtime-context" %}}

Groups attributes related to runtime context.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>span_id</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@runtime_context.span_id</code><br>Span identifier where the finding was detected. Available only for IAST (Interactive Application Security Testing).</td>
    </tr>
    <tr>
      <td><code>stacktrace_id</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@runtime_context.stacktrace_id</code><br>Stack trace identifier where the finding was detected. Available only for IAST (Interactive Application Security Testing).</td>
    </tr>
    <tr>
      <td><code>trace_id</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@runtime_context.trace_id</code><br>Trace identifier where the finding was detected. Available only for IAST (Interactive Application Security Testing).</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Secret" level="h3" id="secret" %}}

-

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>validation_status</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@secret.validation_status</code><br>Result of attempting to validate if the secret is active.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Service" level="h3" id="service" %}}

-

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>git_commit_sha</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@service.git_commit_sha</code><br>Git commit SHA of the latest commit where the finding was detected for the service. Available only when Source Code Integration is configured.</td>
    </tr>
    <tr>
      <td><code>git_repository_url</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@service.git_repository_url</code><br>URL of the Git repository for the service associated with the finding. Available only when Source Code Integration is configured.</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@service.name</code><br>Name of the service where the finding was detected.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Severity Details" level="h3" id="severity-details" %}}

Detailed severity information for the finding, including base and adjusted severity.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>adjusted</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@severity_details.adjusted</code><br>Adjusted severity of the finding after accounting for contextual or environmental factors.</td>
    </tr>
    <tr>
      <td><code>base</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@severity_details.base</code><br>Base severity of the finding as defined by the original rule, advisory, or scanner, before any contextual adjustments.</td>
    </tr>
  </tbody>
</table>

### Adjusted

Adjusted severity of the finding after accounting for contextual or environmental factors.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>score</code></td>
      <td>number</td>
      <td><strong>Path:</strong> <code>@severity_details.adjusted.score</code><br>Numeric severity score (CVSS scale).</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@severity_details.adjusted.value</code><br>Severity level. Valid values: `critical`, `high`, `medium`, `low`, `info`, `none`, `unknown`.</td>
    </tr>
    <tr>
      <td><code>value_id</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@severity_details.adjusted.value_id</code><br>Numeric representation of the severity. Values: `critical` = `10`, `high` = `9`, `medium` = `7`, `low` = `4`, `none` = `0`.</td>
    </tr>
    <tr>
      <td><code>vector</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@severity_details.adjusted.vector</code><br>CVSS vector string.</td>
    </tr>
  </tbody>
</table>

### Base

Base severity of the finding as defined by the original rule, advisory, or scanner, before any contextual adjustments.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>score</code></td>
      <td>number</td>
      <td><strong>Path:</strong> <code>@severity_details.base.score</code><br>Numeric severity score (CVSS scale).</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@severity_details.base.value</code><br>Severity level. Valid values: `critical`, `high`, `medium`, `low`, `info`, `none`, `unknown`.</td>
    </tr>
    <tr>
      <td><code>value_id</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@severity_details.base.value_id</code><br>Numeric representation of the severity. Values: `critical` = `10`, `high` = `9`, `medium` = `7`, `low` = `4`, `none` = `0`.</td>
    </tr>
    <tr>
      <td><code>vector</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@severity_details.base.vector</code><br>CVSS vector string.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Vulnerability" level="h3" id="vulnerability" %}}

Information specific to vulnerabilities.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>confidence</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@vulnerability.confidence</code><br>The assessed likelihood of the vulnerability being a true positive.</td>
    </tr>
    <tr>
      <td><code>confidence_reason</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@vulnerability.confidence_reason</code><br>The rationale behind the assigned confidence level.</td>
    </tr>
    <tr>
      <td><code>cwes</code></td>
      <td>array (string)</td>
      <td><strong>Path:</strong> <code>@vulnerability.cwes</code><br>CWE (Common Weakness Enumeration) identifier associated with the vulnerability. Each entry must use the `CWE-&lt;id&gt;` format (for example, `CWE-416`).</td>
    </tr>
    <tr>
      <td><code>first_commit</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@vulnerability.first_commit</code><br>The commit in which the vulnerability was first introduced.</td>
    </tr>
    <tr>
      <td><code>hash</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@vulnerability.hash</code><br>Vulnerability hash used to correlate the same vulnerability across SCA (Software Composition Analysis) runtime and static analysis.</td>
    </tr>
    <tr>
      <td><code>is_emerging</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@vulnerability.is_emerging</code><br>True if the vulnerability is classified as an emerging threat; false otherwise.</td>
    </tr>
    <tr>
      <td><code>last_commit</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@vulnerability.last_commit</code><br>The commit in which the vulnerability was fixed.</td>
    </tr>
    <tr>
      <td><code>owasp_top10_years</code></td>
      <td>array (integer)</td>
      <td><strong>Path:</strong> <code>@vulnerability.owasp_top10_years</code><br>The years the vulnerability appeared in the OWASP Top 10 list of critical vulnerabilities.</td>
    </tr>
    <tr>
      <td><code>stack</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@vulnerability.stack</code><br>The technological stack where the vulnerability was found.</td>
    </tr>
  </tbody>
</table>

### Stack

The technological stack where the vulnerability was found.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>ecosystem</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@vulnerability.stack.ecosystem</code><br>The package management ecosystem or source registry the vulnerable component originated from.</td>
    </tr>
    <tr>
      <td><code>language</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@vulnerability.stack.language</code><br>The language where the vulnerability was found.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Workflow" level="h3" id="workflow" %}}

All mutable information related to the management of a finding after it was detected. Includes fields that can be updated manually through the UI or automatically through pipelines.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>auto_closed_at</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@workflow.auto_closed_at</code><br>Timestamp in milliseconds (UTC) when the finding was automatically closed by the system.</td>
    </tr>
    <tr>
      <td><code>automations</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@workflow.automations</code><br>Information about any automation rules that apply to the finding.</td>
    </tr>
    <tr>
      <td><code>due_date</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@workflow.due_date</code><br>Due date rule applied to the finding.</td>
    </tr>
    <tr>
      <td><code>integrations</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@workflow.integrations</code><br>Integrations like Jira, Case Management, or ServiceNow used to triage and remediate the finding.</td>
    </tr>
    <tr>
      <td><code>mute</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@workflow.mute</code><br>Muting information and metadata.</td>
    </tr>
    <tr>
      <td><code>triage</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@workflow.triage</code><br>Assignment and status information. Assignment may be synchronized with case or Jira information.</td>
    </tr>
  </tbody>
</table>

### Automations

Information about any automation rules that apply to the finding.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>rule_id</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@workflow.automations.rule_id</code><br>Unique identifier for the automation rule.</td>
    </tr>
    <tr>
      <td><code>rule_name</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@workflow.automations.rule_name</code><br>Human-readable name of the automation rule applying to the finding.</td>
    </tr>
    <tr>
      <td><code>rule_type</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@workflow.automations.rule_type</code><br>Type of the automation rule applying to the finding. Valid values: `mute`, `due_date`, `security_inbox`, `ticket_creation`.</td>
    </tr>
  </tbody>
</table>

### Due Date

Due date rule applied to the finding.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>due_at</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@workflow.due_date.due_at</code><br>Timestamp in milliseconds (UTC) for the finding's due date.</td>
    </tr>
    <tr>
      <td><code>is_overdue</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@workflow.due_date.is_overdue</code><br>True if the due date has been reached; false otherwise.</td>
    </tr>
    <tr>
      <td><code>rule_id</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@workflow.due_date.rule_id</code><br>Unique identifier for the due date rule applied to the finding.</td>
    </tr>
  </tbody>
</table>

### Integrations

Integrations like Jira, Case Management, or ServiceNow used to triage and remediate the finding.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>cases</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@workflow.integrations.cases</code><br>Array of cases attached to the finding.</td>
    </tr>
    <tr>
      <td><code>jira</code></td>
      <td>array (string)</td>
      <td><strong>Path:</strong> <code>@workflow.integrations.jira</code><br>Jira issue keys attached to the finding in the format `&lt;PROJECT&gt;-&lt;NUMBER&gt;` (for example, `PROJ-123`).</td>
    </tr>
  </tbody>
</table>

### Cases

Array of cases attached to the finding.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>assignee</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@workflow.integrations.cases.assignee</code><br>User assigned to the case.</td>
    </tr>
    <tr>
      <td><code>created_at</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@workflow.integrations.cases.created_at</code><br>Timestamp in milliseconds (UTC) when the case was created.</td>
    </tr>
    <tr>
      <td><code>created_by</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@workflow.integrations.cases.created_by</code><br>User who created the case.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@workflow.integrations.cases.id</code><br>Unique identifier of the case in UUID format.</td>
    </tr>
    <tr>
      <td><code>jira_issue</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@workflow.integrations.cases.jira_issue</code><br>Jira issue attached to the case.</td>
    </tr>
    <tr>
      <td><code>key</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@workflow.integrations.cases.key</code><br>Human-readable identifier for the case in the format `PROJECT-NUMBER` (for example, `CSMINV-66`).</td>
    </tr>
    <tr>
      <td><code>servicenow_ticket</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@workflow.integrations.cases.servicenow_ticket</code><br>ServiceNow ticket attached to the case.</td>
    </tr>
    <tr>
      <td><code>status</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@workflow.integrations.cases.status</code><br>Status of the case.</td>
    </tr>
    <tr>
      <td><code>title</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@workflow.integrations.cases.title</code><br>Title of the case.</td>
    </tr>
    <tr>
      <td><code>updated_at</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@workflow.integrations.cases.updated_at</code><br>Timestamp in milliseconds (UTC) when the case was last updated.</td>
    </tr>
    <tr>
      <td><code>updated_by</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@workflow.integrations.cases.updated_by</code><br>User who last updated the case.</td>
    </tr>
  </tbody>
</table>

### Assignee

User assigned to the case.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>id</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@workflow.integrations.cases.assignee.id</code><br>Unique identifier of the user in UUID format.</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@workflow.integrations.cases.assignee.name</code><br>Display name of the user.</td>
    </tr>
  </tbody>
</table>

### Created By

User who created the case.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>id</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@workflow.integrations.cases.created_by.id</code><br>Unique identifier of the user in UUID format.</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@workflow.integrations.cases.created_by.name</code><br>Display name of the user.</td>
    </tr>
  </tbody>
</table>

### Jira Issue

Jira issue attached to the case.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>key</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@workflow.integrations.cases.jira_issue.key</code><br>Jira issue identifier in the format `PROJECT-NUMBER` (for example, `CSMSEC-103991`).</td>
    </tr>
    <tr>
      <td><code>status</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@workflow.integrations.cases.jira_issue.status</code><br>Current status of the Jira issue.</td>
    </tr>
    <tr>
      <td><code>url</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@workflow.integrations.cases.jira_issue.url</code><br>Full URL to the Jira issue.</td>
    </tr>
  </tbody>
</table>

### Servicenow Ticket

ServiceNow ticket attached to the case.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>state</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@workflow.integrations.cases.servicenow_ticket.state</code><br>Current state of the ServiceNow ticket.</td>
    </tr>
    <tr>
      <td><code>sys_id</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@workflow.integrations.cases.servicenow_ticket.sys_id</code><br>ServiceNow 32-character hexadecimal ticket identifier (for example, 9f8c7e2d3b4a5c6d7e8f9a0b1c2d3e4f).</td>
    </tr>
    <tr>
      <td><code>table_name</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@workflow.integrations.cases.servicenow_ticket.table_name</code><br>The name of the table where the ticket is stored; accepted values are incident and em_event.</td>
    </tr>
    <tr>
      <td><code>url</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@workflow.integrations.cases.servicenow_ticket.url</code><br>Direct URL to the ServiceNow ticket.</td>
    </tr>
  </tbody>
</table>

### Updated By

User who last updated the case.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>id</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@workflow.integrations.cases.updated_by.id</code><br>Unique identifier of the user in UUID format.</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@workflow.integrations.cases.updated_by.name</code><br>Display name of the user.</td>
    </tr>
  </tbody>
</table>

### Mute

Muting information and metadata.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>description</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@workflow.mute.description</code><br>Free-text explanation for why the finding was muted.</td>
    </tr>
    <tr>
      <td><code>expire_at</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@workflow.mute.expire_at</code><br>Timestamp in milliseconds (UTC) when the mute expires. If not set, the mute is permanent.</td>
    </tr>
    <tr>
      <td><code>is_muted</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@workflow.mute.is_muted</code><br>True if the finding is muted; false if it is active.</td>
    </tr>
    <tr>
      <td><code>is_muted_by_rule</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@workflow.mute.is_muted_by_rule</code><br>True if the finding is muted by an automation rule; false otherwise. If true, the relevant automation rule is referenced in the workflow.automation section.</td>
    </tr>
    <tr>
      <td><code>muted_at</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@workflow.mute.muted_at</code><br>Timestamp in milliseconds (UTC) when the finding was muted.</td>
    </tr>
    <tr>
      <td><code>muted_by</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@workflow.mute.muted_by</code><br>User who muted the finding.</td>
    </tr>
    <tr>
      <td><code>reason</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@workflow.mute.reason</code><br>Reason provided for muting the finding. Valid values: `none`, `no_pending_fix`, `human_error`, `no_longer_accepted_risk`, `other`, `pending_fix`, `false_positive`, `accepted_risk`, `no_fix`, `duplicate`, `risk_accepted`.</td>
    </tr>
    <tr>
      <td><code>rule_id</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@workflow.mute.rule_id</code><br>Unique identifier for the automation rule that muted the finding. Only set when `is_muted_by_rule` is true.</td>
    </tr>
    <tr>
      <td><code>rule_name</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@workflow.mute.rule_name</code><br>Human-readable name of the automation rule that muted the finding. Only set when `is_muted_by_rule` is true.</td>
    </tr>
  </tbody>
</table>

### Muted By

User who muted the finding.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>id</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@workflow.mute.muted_by.id</code><br>Unique identifier of the user in UUID format.</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@workflow.mute.muted_by.name</code><br>Display name of the user.</td>
    </tr>
  </tbody>
</table>

### Triage

Assignment and status information. Assignment may be synchronized with case or Jira information.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>assignee</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@workflow.triage.assignee</code><br>User assigned to the finding.</td>
    </tr>
    <tr>
      <td><code>time_to_acknowledge_seconds</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@workflow.triage.time_to_acknowledge_seconds</code><br>Time in seconds between when the finding was first detected and the first manual triage action.</td>
    </tr>
  </tbody>
</table>

### Assignee

User assigned to the finding.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>id</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@workflow.triage.assignee.id</code><br>Unique identifier in UUID format for the assignee.</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@workflow.triage.assignee.name</code><br>Display name of the assignee.</td>
    </tr>
    <tr>
      <td><code>updated_at</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@workflow.triage.assignee.updated_at</code><br>Timestamp in milliseconds (UTC) when the assignee was last modified.</td>
    </tr>
    <tr>
      <td><code>updated_by</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@workflow.triage.assignee.updated_by</code><br>User who last modified the assignee.</td>
    </tr>
  </tbody>
</table>

### Updated By

User who last modified the assignee.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>id</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@workflow.triage.assignee.updated_by.id</code><br>Unique identifier of the user in UUID format.</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@workflow.triage.assignee.updated_by.name</code><br>Display name of the user.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

## Tags

Key-value metadata in the format `name:value`. Enables flexible filtering and grouping of findings. Must include at least `source` and `origin`.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
