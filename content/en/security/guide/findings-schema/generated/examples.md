---
build:
  render: never
  list: never
---
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
  "resource_id": "api-endpoint-001",
  "resource_name": "GET /api/v2/users/{userID}/profile",
  "resource_type": "api_endpoint",
  "rule": {
    "default_rule_id": "def-000-abc",
    "id": "api-sec-001",
    "name": "Read operations on routes use predictable IDs",
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
  "title": "Read operations on routes use predictable IDs",
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
  "resource_id": "arn:aws:ec2:us-east-1:123456789012:instance/i-012abcd34efghi56",
  "resource_name": "i-012abcd34efghi56",
  "resource_type": "aws_ec2_instance",
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
  "resource_id": "arn:aws:ec2:us-east-1:123456789012:instance/i-012abcd34efghi56",
  "resource_name": "i-012abcd34efghi56",
  "resource_type": "aws_ec2_instance",
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
  "resource_id": "github.com/example-org/terraform/main.tf:aws_s3_bucket.data",
  "resource_name": "aws_s3_bucket.data",
  "resource_type": "terraform_resource",
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
  "resource_id": "arn:aws:iam::123456789012:user/legacy-admin",
  "resource_name": "legacy-admin",
  "resource_type": "aws_iam_user",
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
      "CVE-2024-67890"
    ],
    "cve": "CVE-2024-67890",
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
    "repository_url": "https://github.com/example-org/my-app/",
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
    "name": "lodash",
    "normalized_name": "lodash",
    "scope": "production",
    "version": "4.17.20"
  },
  "remediation": {
    "is_available": false
  },
  "resource_id": "lodash:4.17.20",
  "resource_name": "lodash",
  "resource_type": "software_package",
  "risk_details": {
    "has_exploit_available": {
      "evidence": {
        "exploit_sources": [
          "GitHub"
        ],
        "exploit_urls": [
          "https://github.com/example/POC-CVE-2024-67890"
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
      "ecosystem": "npm"
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
  "resource_id": "arn:aws:ec2:us-east-1:123456789012:security-group/sg-0123456789abcdef0",
  "resource_name": "sg-0123456789abcdef0",
  "resource_type": "aws_security_group",
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
    "repository_url": "https://github.com/example-org/my-app/",
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
  "resource_id": "my-app:/api/search",
  "resource_name": "my-app",
  "resource_type": "application_service",
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
    "repository_url": "https://github.com/example-org/my-app/",
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
  "resource_id": "github.com/example-org/my-app/config/settings.py:42",
  "resource_name": "settings.py",
  "resource_type": "source_code_file",
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
    "repository_url": "https://github.com/example-org/my-app/",
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
  "resource_id": "github.com/example-org/my-app/src/templates/profile.html:18",
  "resource_name": "profile.html",
  "resource_type": "source_code_file",
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
  "resource_id": "k8s-pod:default/my-app-7b9d5c8f4-x2k9m",
  "resource_name": "my-app-7b9d5c8f4-x2k9m",
  "resource_type": "kubernetes_pod",
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
