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
    "operation_name": "aspnet_core.request",
    "path": "/swagger/v1/swagger.json",
    "resource_name": "GET /swagger/v1/swagger.json"
  },
  "description": "This publicly exposed API endpoint does not implement the X-Frame-Options header. This header allows to control whether a browser should be allowed to render the response in a frame, iframe, embed, or object. Without this header, the API response could be vulnerable to clickjacking attacks. Remediation: Implement the X-Frame-Options header in all API responses with appropriate values. Example header values: Use DENY to prevent any domain from framing the content (X-Frame-Options: DENY), or use SAMEORIGIN to allow framing only by the same site (X-Frame-Options: SAMEORIGIN).",
  "detection_changed_at": 1766083119000,
  "finding_id": "YXBpLXNlYy1leGFtcGxlLWZpbmRpbmctaWQtMTIzNDU2Nzg5MA==",
  "finding_type": "api_security",
  "first_seen_at": 1766083119000,
  "is_in_security_inbox": false,
  "last_seen_at": 1766090321000,
  "metadata": {
    "schema_version": "2"
  },
  "resource_id": "ZXhhbXBsZS1zZXJ2aWNlfEdFVCAvc3dhZ2dlci92MS9zd2FnZ2VyLmpzb258YXNwbmV0X2NvcmUucmVxdWVzdA==",
  "resource_name": "ZXhhbXBsZS1zZXJ2aWNlfEdFVCAvc3dhZ2dlci92MS9zd2FnZ2VyLmpzb258YXNwbmV0X2NvcmUucmVxdWVzdA==",
  "resource_type": "endpoint",
  "rule": {
    "default_rule_id": "def-000-bh2",
    "id": "def-000-bh2",
    "name": "Missing X-Frame-Options HTTP header",
    "type": "api_security",
    "version": 3
  },
  "service": {
    "name": "example-service"
  },
  "severity": "low",
  "severity_details": {
    "adjusted": {
      "score": 2,
      "value": "low",
      "value_id": 1
    }
  },
  "status": "open",
  "tags": [
    "scored:true",
    "security:compliance",
    "method:get",
    "env:",
    "dd_rule_type:api_security",
    "scope:api-findings",
    "service:example-service",
    "owasp:api8_2023",
    "owasp_url:https://owasp.org/api-security/editions/2023/en/0xa8-security-misconfiguration/"
  ],
  "title": "Missing X-Frame-Options HTTP header",
  "workflow": {
    "mute": {
      "is_muted": false
    }
  }
}
```

{{% /tab %}}
{{% tab "Attack Path" %}}

```json
{
  "cloud_resource": {
    "configuration": {
      "context": {
        "associated_pods": [
          {
            "node_name": "ip-10-0-1-101.ec2.internal",
            "pod_name": "checkout-service-6648f57868-7sn4q",
            "pod_uuid": "a1b2c3d4-e5f6-4042-b0fe-111111111111",
            "service": "checkout-service"
          },
          {
            "node_name": "gke-prod-cluster-default-pool-abc12345-x1y2",
            "pod_name": "checkout-service-9977c988b-2wbt5",
            "pod_uuid": "a1b2c3d4-e5f6-4042-b0fe-222222222222",
            "service": "checkout-service"
          }
        ],
        "public_trace": {
          "hostname": "gke-prod-cluster-default-pool-abc12345-x1y2.c.example-project.internal",
          "image": "gcr.io/example-project/checkout-service",
          "last_seen_trace": "abc123def4560000001234567890abcd",
          "url": "http://checkout-service:8080/health"
        },
        "service": {
          "env": "dev",
          "name": "checkout-service"
        },
        "vulnerabilities": {
          "cve_ids": [
            "CVE-2024-50379",
            "CVE-2024-56337"
          ]
        }
      },
      "dd_computed_attributes": {
        "Vulnerabilities": [
          {
            "cve_ids": [
              "CVE-2024-50379"
            ],
            "cwe_ids": [
              "CWE-502",
              "CWE-367"
            ],
            "exploit_available": false,
            "exploit_sources": [
              "NIST",
              "GitHub"
            ],
            "title": "Apache Tomcat Time-of-check Time-of-use (TOCTOU) Race Condition vulnerability",
            "type": "COMPONENT_WITH_KNOWN_VULNERABILITY",
            "vulnerability_id": "abc123def456789012345678901234ab"
          }
        ],
        "is_publicly_accessible": true
      },
      "external_id": "",
      "seen_at": 1766088954
    },
    "display_name": "checkout-service"
  },
  "compliance": {
    "evaluation": "fail"
  },
  "description": "Unpatched vulnerabilities in publicly accessible applications can increase the likelihood of exposing weaknesses, creating an entry point for attackers to gain unauthorized access to the pod or container. Granting excessive capabilities to a pod or container can lead to unintended lateral movement to other containers or to the underlying node resources. Remediation: 1. Review any associated vulnerability references or advisories. 2. Apply the appropriate patch based on remediation guidance. If no patch is available, apply compensating controls such as disabling or removing the vulnerable component. 3. Review your Kubernetes pod or container security context configurations to ensure they provide proper isolation boundaries. Possible mitigations include using Kubernetes Pod Security Policies, SELinux, AppArmor, or Seccomp filters.",
  "detection_changed_at": 1765692948000,
  "finding_id": "ZXhhbXBsZS1hdHRhY2stcGF0aC1pZC0xMjM0NTY3ODkw",
  "finding_type": "attack_path",
  "first_seen_at": 1765692948000,
  "is_in_security_inbox": true,
  "last_seen_at": 1766088954000,
  "metadata": {
    "schema_version": "2"
  },
  "resource_id": "eyJuYW1lIjoiY2hlY2tvdXQtc2VydmljZSIsImVudiI6ImRldiJ9",
  "resource_name": "checkout-service",
  "resource_type": "service",
  "risk": {
    "is_publicly_accessible": true
  },
  "risk_details": {
    "is_publicly_accessible": {
      "value": true
    }
  },
  "rule": {
    "default_rule_id": "def-000-iqr",
    "id": "def-000-iqr",
    "name": "Publicly accessible application with a critical vulnerability in a container with elevated privileges",
    "type": "cloud configuration",
    "version": 1
  },
  "severity": "critical",
  "severity_details": {
    "adjusted": {
      "score": 9.5,
      "value": "critical",
      "value_id": 4
    }
  },
  "status": "open",
  "tags": [
    "scope:kubernetes",
    "security:compliance",
    "scored:false",
    "dd_rule_type:combination",
    "source:kubernetes",
    "team:backend"
  ],
  "title": "Publicly accessible application with a critical vulnerability in a container with elevated privileges",
  "workflow": {
    "automations": [
      {
        "rule_id": "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee",
        "rule_name": "PCI",
        "rule_type": "due_date"
      },
      {
        "rule_id": "ffffffff-1111-2222-3333-444444444444",
        "rule_name": "Security Inbox Default Misconfiguration Ruleset",
        "rule_type": "security_inbox"
      }
    ],
    "due_date": {
      "due_at": 1766297748000,
      "is_overdue": false,
      "rule_id": "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee"
    },
    "mute": {
      "is_muted": false
    }
  }
}
```

{{% /tab %}}
{{% tab "Runtime Code Vulnerability" %}}

```json
{
  "api_endpoint": {
    "method": "GET",
    "path": "/api/users"
  },
  "base_severity": "low",
  "code_location": {
    "filename": "com.example.app.handlers.UserHandler",
    "symbol": "processRequest"
  },
  "detection_changed_at": 1765803753960,
  "exposure_time_seconds": 22273153,
  "finding_id": "ZXhhbXBsZS1ydW50aW1lLWNvZGUtdnVsbi0xMjM0NTY=",
  "finding_type": "runtime_code_vulnerability",
  "first_seen_at": 1743345105948,
  "git": {
    "repository_id": "github.com/example-org/web-app",
    "repository_url": "github.com/example-org/web-app"
  },
  "is_in_security_inbox": false,
  "last_seen_at": 1765803753960,
  "metadata": {
    "schema_version": "2"
  },
  "origin": [
    "apm"
  ],
  "related_services": [
    "user-service"
  ],
  "remediation": {
    "is_available": true
  },
  "resource_id": "abc123def456789012345678901234ab",
  "resource_name": "user-service",
  "resource_type": "service",
  "risk": {
    "is_production": true
  },
  "risk_details": {
    "is_production": {
      "impact_cvss": "neutral",
      "value": true
    }
  },
  "rule": {
    "id": "weak_randomness",
    "name": "Weak Randomness",
    "type": "weak_randomness"
  },
  "runtime_context": {
    "span_id": "1234567890123456789",
    "stacktrace_id": "4",
    "trace_id": "abcdef1234567890abcdef1234567890"
  },
  "service": {
    "git_repository_url": "github.com/example-org/web-app",
    "name": "user-service"
  },
  "severity": "low",
  "severity_details": {
    "adjusted": {
      "score": 3.7,
      "value": "low",
      "value_id": 1,
      "vector": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:L/I:N/A:N/E:X/RL:X/RC:X/CR:X/IR:X/AR:X/MAV:X/MAC:X/MPR:X/MUI:X/MS:X/MC:X/MI:X/MA:X"
    },
    "base": {
      "score": 3.7,
      "value": "low",
      "value_id": 1,
      "vector": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:L/I:N/A:N"
    }
  },
  "status": "auto_closed",
  "tags": [
    "dd_rule_type:not-empty",
    "env:prod",
    "scored:false",
    "service:user-service",
    "source:datadog",
    "team:backend",
    "origin:apm"
  ],
  "title": "Weak Randomness",
  "vulnerability": {
    "cwes": [
      "CWE-338"
    ],
    "first_commit": "abc123def456789012345678901234567890abcd",
    "hash": "1234567890",
    "last_commit": "def456abc789012345678901234567890123abcd",
    "owasp_top10_years": [
      2021
    ],
    "stack": {
      "language": "jvm"
    }
  },
  "workflow": {
    "auto_closed_at": 1765803753960,
    "mute": {
      "is_muted": false
    }
  }
}
```

{{% /tab %}}
{{% tab "Static Code Vulnerability" %}}

```json
{
  "base_severity": "critical",
  "code_location": {
    "column_end": 71,
    "column_start": 13,
    "filename": "src/Controllers/UserController.cs",
    "is_test_file": false,
    "line_end": 21,
    "line_start": 21
  },
  "detection_changed_at": 1765912051837,
  "detection_tool": {
    "name": "datadog-static-analyzer",
    "version": "0.7.2"
  },
  "exposure_time_seconds": 2946321,
  "finding_id": "ZXhhbXBsZS1zdGF0aWMtY29kZS12dWxuLTEyMzQ1Ng==",
  "finding_type": "static_code_vulnerability",
  "first_seen_at": 1762873392359,
  "git": {
    "default_branch": "main",
    "is_default_branch": true,
    "repository_id": "github.com/example-org/backend-api",
    "repository_url": "github.com/example-org/backend-api",
    "sha": "abc123def456789012345678901234567890abcd"
  },
  "is_in_security_inbox": false,
  "last_seen_at": 1765912051837,
  "metadata": {
    "schema_version": "2"
  },
  "origin": [
    "ci"
  ],
  "remediation": {
    "codegen": {
      "id": "abc123def456789012345678901234567890abcdef123456",
      "status": "not_available_confidence_too_low"
    },
    "is_available": false
  },
  "resource_id": "abc123def456789012345678901234ab",
  "resource_name": "github.com/example-org/backend-api",
  "resource_type": "repository",
  "rule": {
    "id": "csharp-security/ensure-secure-logging",
    "name": "Do not log sensitive information",
    "type": "static_analysis"
  },
  "severity": "critical",
  "severity_details": {
    "adjusted": {
      "score": 9,
      "value": "critical",
      "value_id": 4,
      "vector": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:C/C:H/I:H/A:H/E:X/RL:X/RC:X/CR:X/IR:X/AR:X/MAV:X/MAC:X/MPR:X/MUI:X/MS:X/MC:X/MI:X/MA:X"
    },
    "base": {
      "score": 9,
      "value": "critical",
      "value_id": 4,
      "vector": "CVSS:3.0/AV:N/AC:H/PR:N/UI:N/S:C/C:H/I:H/A:H"
    }
  },
  "status": "auto_closed",
  "tags": [
    "dd_rule_type:not-empty",
    "team:backend",
    "scored:false",
    "source:datadog",
    "origin:ci",
    "env:hosted-scan"
  ],
  "title": "Do not log sensitive information",
  "vulnerability": {
    "confidence": "not_evaluated",
    "cwes": [
      "CWE-778"
    ],
    "first_commit": "abc123def456789012345678901234567890aaaa",
    "hash": "abc123def456789012345678901234567890abcdef12345678901234567890ab",
    "last_commit": "abc123def456789012345678901234567890abcd",
    "owasp_top10_years": [
      2017,
      2021
    ],
    "stack": {
      "language": "csharp"
    }
  },
  "workflow": {
    "auto_closed_at": 1765912051836,
    "mute": {
      "is_muted": false
    }
  }
}
```

{{% /tab %}}
{{% tab "Host & Container Vulnerability" %}}

```json
{
  "advisory": {
    "aliases": [
      "CVE-2023-26242"
    ],
    "cve": "CVE-2023-26242",
    "id": "TRIVY-CVE-2023-26242",
    "modified_at": 1746461731000,
    "published_at": 1676942111000,
    "summary": "CVE-2023-26242 found in linux-tools-common 5.15.0-161.171",
    "type": "component_with_known_vulnerability"
  },
  "base_severity": "high",
  "cloud_resource": {
    "account": "123456789012",
    "cloud_provider": "aws",
    "display_name": "i-0abc123def456789a",
    "region": "us-east-1"
  },
  "detection_changed_at": 1766504273553,
  "finding_id": "ZXhhbXBsZS1ob3N0LXZ1bG4tMTIzNDU2Nzg5MGFiY2RlZg==",
  "finding_type": "host_and_container_vulnerability",
  "first_seen_at": 1766504260849,
  "host": {
    "cloud_provider": "aws",
    "image": "ami-0abc123def456789a",
    "name": "i-0abc123def456789a",
    "os": {
      "name": "ubuntu",
      "version": "22.04"
    }
  },
  "is_in_security_inbox": false,
  "last_seen_at": 1766504273553,
  "metadata": {
    "schema_version": "2"
  },
  "origin": [
    "agentless-scanner"
  ],
  "package": {
    "additional_names": [
      "linux-libc-dev",
      "linux-tools-common"
    ],
    "name": "linux",
    "normalized_name": "linux",
    "version": "5.15.0-161.171"
  },
  "related_services": [
    "exposed_to_attacks:false"
  ],
  "remediation": {
    "is_available": false
  },
  "resource_id": "abc123def456789012345678901234ab",
  "resource_name": "i-0abc123def456789a",
  "resource_type": "host",
  "risk": {
    "has_exploit_available": false,
    "has_high_exploitability_chance": false,
    "is_production": true,
    "is_publicly_accessible": false
  },
  "risk_details": {
    "has_exploit_available": {
      "evidence": {
        "type": "unavailable"
      },
      "impact_cvss": "safer",
      "value": false
    },
    "has_high_exploitability_chance": {
      "evidence": {
        "epss_score": 0.00017,
        "epss_severity": "low"
      },
      "impact_cvss": "safer",
      "value": false
    },
    "is_production": {
      "impact_cvss": "neutral",
      "value": true
    },
    "is_publicly_accessible": {
      "value": false
    }
  },
  "severity": "medium",
  "severity_details": {
    "adjusted": {
      "score": 6.4,
      "value": "medium",
      "value_id": 2,
      "vector": "CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H/E:U/RL:X/RC:X/CR:X/IR:X/AR:X/MAV:X/MAC:H/MPR:X/MUI:X/MS:X/MC:X/MI:X/MA:X"
    },
    "base": {
      "score": 7.8,
      "value": "high",
      "value_id": 3,
      "vector": "CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H"
    }
  },
  "status": "open",
  "tags": [
    "origin:agentless-scanner",
    "package_name:linux",
    "package_version:5.15.0-161.171",
    "fix_available:unavailable",
    "availability-zone:us-east-1e",
    "source:datadog",
    "vulnerability_status:open",
    "scored:false",
    "alias:cve-2023-26242",
    "asset_type:host",
    "os_name:ubuntu",
    "in_production:true",
    "cve:cve-2023-26242",
    "public_exploit_available:false",
    "base_score:7.8",
    "score:6.4",
    "severity:medium",
    "dd_rule_type:not-empty",
    "region:us-east-1",
    "ecosystem:deb",
    "os_version:22.04",
    "base_severity:high",
    "cloud_provider:aws",
    "type:component_with_known_vulnerability",
    "epss_raw_score:0.00017"
  ],
  "title": "CVE-2023-26242 found in linux-tools-common 5.15.0-161.171",
  "vulnerability": {
    "cwes": [
      "CWE-190"
    ],
    "hash": "abc123def456789012345678901234567890abcdef12345678901234567890ab",
    "stack": {
      "ecosystem": "deb"
    }
  },
  "workflow": {
    "mute": {
      "is_muted": false
    }
  }
}
```

{{% /tab %}}
{{% tab "IaC Misconfiguration" %}}

```json
{
  "base_severity": "low",
  "code_location": {
    "column_end": 37,
    "column_start": 1,
    "filename": "k8s/services/templates/api-service.yaml",
    "is_test_file": false,
    "line_end": 5,
    "line_start": 5
  },
  "description": "As a best practice, ensure namespaces are used correctly to group and administer resources. Kubernetes authorization mechanisms, such as RBAC, can enforce policies that segregate or restrict user access to namespaces. This rule scans cluster manifests for resources that specify a namespace and aggregates the namespaces in use, reporting them for review. Review the reported namespaces to confirm they are required, appropriately configured, and governed by suitable access controls (for example, RoleBindings, NetworkPolicies, or admission controllers). Rule ID: [e84eaf4d-2f45-47b2-abe8-e581b06deb66]",
  "detection_changed_at": 1765825694643,
  "detection_tool": {
    "name": "Datadog IaC Scanning",
    "version": "full_scan"
  },
  "exposure_time_seconds": 5097262,
  "finding_id": "ZXhhbXBsZS1pYWMtbWlzY29uZmlnLTEyMzQ1Ng==",
  "finding_type": "iac_misconfiguration",
  "first_seen_at": 1760620587440,
  "git": {
    "default_branch": "main",
    "is_default_branch": true,
    "repository_id": "github.com/example-org/infrastructure",
    "repository_url": "github.com/example-org/infrastructure",
    "sha": "abc123def456789012345678901234567890abcd"
  },
  "iac_resource": {
    "platform": "kubernetes"
  },
  "is_in_security_inbox": false,
  "last_seen_at": 1765825694643,
  "metadata": {
    "schema_version": "2"
  },
  "origin": [
    "ci"
  ],
  "remediation": {
    "codegen": {
      "id": "abc123def456789012345678901234567890abcdef123456",
      "status": "generated"
    },
    "description": "[]",
    "is_available": false
  },
  "resource_id": "Service.api-service",
  "resource_name": "api-service",
  "resource_type": "Service",
  "rule": {
    "id": "e84eaf4d-2f45-47b2-abe8-e581b06deb66",
    "name": "Ensure administrative boundaries between resources",
    "type": "access_control"
  },
  "severity": "low",
  "severity_details": {
    "adjusted": {
      "score": 2.8,
      "value": "low",
      "value_id": 1,
      "vector": "CVSS:3.1/AV:P/AC:L/PR:H/UI:R/S:U/C:L/I:L/A:N/E:X/RL:X/RC:X/CR:X/IR:X/AR:X/MAV:X/MAC:X/MPR:X/MUI:X/MS:X/MC:X/MI:X/MA:X"
    },
    "base": {
      "score": 2.8,
      "value": "low",
      "value_id": 1,
      "vector": "CVSS:3.0/AV:P/AC:L/PR:H/UI:R/S:U/C:L/I:L/A:N"
    }
  },
  "status": "auto_closed",
  "tags": [
    "dd_rule_type:not-empty",
    "team:backend",
    "scored:false",
    "env:hosted-scan",
    "origin:ci",
    "source:datadog"
  ],
  "title": "namespaces in use: default, staging, production",
  "vulnerability": {
    "confidence": "not_evaluated",
    "first_commit": "abc123def456789012345678901234567890aaaa",
    "hash": "abc123def456789012345678901234567890abcdef12345678901234567890ab",
    "last_commit": "abc123def456789012345678901234567890abcd",
    "stack": {
      "language": "yaml"
    }
  },
  "workflow": {
    "auto_closed_at": 1765825694643,
    "mute": {
      "is_muted": false
    }
  }
}
```

{{% /tab %}}
{{% tab "Identity Risk" %}}

```json
{
  "cloud_resource": {
    "account": "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee",
    "category": "serverless",
    "cloud_provider": "azure",
    "configuration": {
      "availability_state": "Normal",
      "azure_app_service_plan_key": "abc123def456789012345678901234ab",
      "azure_function_key": "def456abc789012345678901234567cd",
      "client_affinity_enabled": false,
      "client_cert_enabled": false,
      "client_cert_mode": "Required",
      "container_size": 1536,
      "custom_domain_verification_id": "ABC123DEF456789012345678901234567890ABCDEF123456789012345678901234",
      "daily_memory_time_quota": 0,
      "default_host_name": "my-function-app.azurewebsites.net",
      "enabled": true,
      "enabled_host_names": [
        "my-function-app.azurewebsites.net",
        "my-function-app.scm.azurewebsites.net"
      ],
      "external_id": "/subscriptions/aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee/resourceGroups/example-rg/providers/Microsoft.Web/sites/my-function-app",
      "host_names": [
        "my-function-app.azurewebsites.net"
      ],
      "host_names_disabled": false,
      "https_only": true,
      "hyper_v": false,
      "is_xenon": false,
      "key_vault_reference_identity": "SystemAssigned",
      "kind": "functionapp",
      "last_modified_time_utc": "2025-10-20T18:07:00.17Z",
      "location": "East US",
      "name": "my-function-app",
      "outbound_ip_addresses": "10.0.0.1,10.0.0.2,10.0.0.3",
      "possible_outbound_ip_addresses": "10.0.0.1,10.0.0.2,10.0.0.3,10.0.0.4,10.0.0.5",
      "redundancy_mode": "None",
      "repository_site_name": "my-function-app",
      "reserved": false,
      "resource_group": "example-rg",
      "scm_site_also_stopped": false,
      "server_farm_id": "/subscriptions/aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee/resourceGroups/example-rg/providers/Microsoft.Web/serverfarms/ASP-example",
      "site_config_acr_use_managed_identity_creds": false,
      "site_config_always_on": false,
      "site_config_ftps_state": "FtpsOnly",
      "site_config_function_app_scale_limit": 200,
      "site_config_min_tls_version": "1.2",
      "site_config_net_framework_version": "v6.0",
      "site_config_number_of_workers": 1,
      "site_config_publishing_username": "REDACTED",
      "state": "Running",
      "storage_account_required": false,
      "subscription_id": "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee",
      "subscription_name": "example-subscription",
      "type": "Microsoft.Web/sites",
      "usage_state": "Normal"
    },
    "display_name": "my-function-app",
    "region": "eastus"
  },
  "compliance": {
    "evaluation": "pass"
  },
  "description": "This rule identifies when an Azure Function has administrative level permissions at the subscription scope. Administrative Azure role assignments at the subscription scope grant extensive privileges that can affect all resources within the subscription. This broad access increases the risk of accidental or malicious changes. Remediation: Datadog recommends reducing the permissions and scope of a role assignment to the minimum necessary. Where possible, assign roles at the resource group or individual resource level and use built-in roles with limited privileges tailored to operational requirements.",
  "detection_changed_at": 1766084844000,
  "finding_id": "ZXhhbXBsZS1pZGVudGl0eS1yaXNrLTEyMzQ1Ng==",
  "finding_type": "identity_risk",
  "first_seen_at": 1766084844000,
  "is_in_security_inbox": false,
  "last_seen_at": 1766093845000,
  "metadata": {
    "schema_version": "2"
  },
  "resource_id": "abc123def456789012345678901234ab",
  "resource_name": "my-function-app",
  "resource_type": "azure_function",
  "risk": {
    "has_privileged_access": false
  },
  "risk_details": {
    "has_privileged_access": {
      "value": false
    }
  },
  "rule": {
    "default_rule_id": "def-000-s2l",
    "id": "def-000-s2l",
    "name": "Azure function has admin level privileges at the subscription scope",
    "type": "cloud configuration",
    "version": 5
  },
  "severity": "medium",
  "severity_details": {
    "adjusted": {
      "score": 5.5,
      "value": "medium",
      "value_id": 2
    }
  },
  "status": "open",
  "tags": [
    "scored:true",
    "security:compliance",
    "scope:azure.security",
    "cloud_provider:azure",
    "dd_rule_type:ciem",
    "operating_system:windows",
    "source:azure.security",
    "region:eastus"
  ],
  "title": "Azure function has admin level privileges at the subscription scope",
  "workflow": {
    "mute": {
      "is_muted": false
    }
  }
}
```

{{% /tab %}}
{{% tab "Library Vulnerability" %}}

```json
{
  "advisory": {
    "aliases": [
      "CVE-2025-46392"
    ],
    "cve": "CVE-2025-46392",
    "id": "GHSA-pvp8-3xj6-8c6x",
    "type": "component_with_known_vulnerability"
  },
  "base_severity": "medium",
  "code_location": {
    "column_end": 22,
    "column_start": 9,
    "filename": "test/plugin/scenarios/hystrix-scenario/pom.xml",
    "line_end": 77,
    "line_start": 73
  },
  "detection_changed_at": 1766518394577,
  "finding_id": "ZXhhbXBsZS1saWJyYXJ5LXZ1bG4tMTIzNDU2Nzg5MGFi",
  "finding_type": "library_vulnerability",
  "first_seen_at": 1763488117383,
  "git": {
    "author": {
      "name": "ci-bot"
    },
    "default_branch": "main",
    "is_default_branch": true,
    "repository_id": "github.com/example-org/java-app",
    "repository_url": "github.com/example-org/java-app",
    "sha": "abc123def456789012345678901234567890abcd"
  },
  "is_in_security_inbox": false,
  "last_seen_at": 1766522443454,
  "metadata": {
    "schema_version": "2"
  },
  "origin": [
    "ci"
  ],
  "package": {
    "declaration": {
      "block": {
        "column_end": 22,
        "column_start": 9,
        "filename": "test/plugin/scenarios/hystrix-scenario/pom.xml",
        "line_end": 77,
        "line_start": 73
      },
      "name": {
        "column_end": 37,
        "column_start": 25,
        "filename": "test/plugin/scenarios/hystrix-scenario/pom.xml",
        "line_end": 75,
        "line_start": 75
      },
      "version": {
        "column_end": 39,
        "column_start": 33,
        "filename": "test/plugin/scenarios/hystrix-scenario/pom.xml",
        "line_end": 34,
        "line_start": 34
      }
    },
    "dependency_type": "transitive",
    "manager": "maven",
    "name": "commons-configuration:commons-configuration",
    "normalized_name": "commons-configuration:commons-configuration",
    "root_parents": [
      {
        "declaration": {
          "version": {
            "column_end": 39,
            "column_start": 33,
            "filename": "test/plugin/scenarios/hystrix-scenario/pom.xml",
            "line_end": 34,
            "line_start": 34
          }
        },
        "language": "jvm",
        "name": "com.netflix.hystrix:hystrix-core",
        "version": "1.4.20"
      }
    ],
    "scope": "production",
    "version": "1.8"
  },
  "related_services": [
    "example-service"
  ],
  "remediation": {
    "description": "Try upgrading to a version > 1.10 (if released)",
    "is_available": true,
    "package": {
      "closest_no_vulnerabilities": [
        {
          "fixed_advisories": [
            {
              "base_severity": "medium",
              "id": "GHSA-pvp8-3xj6-8c6x"
            }
          ],
          "name": "org.apache.commons:commons-configuration2",
          "version": "2.10.1"
        }
      ],
      "latest_no_vulnerabilities": [
        {
          "fixed_advisories": [
            {
              "base_severity": "medium",
              "id": "GHSA-pvp8-3xj6-8c6x"
            }
          ],
          "name": "commons-configuration:commons-configuration",
          "version": "20041012.002804"
        }
      ]
    },
    "recommended": {
      "fixed_advisories": [
        {
          "base_severity": "medium",
          "id": "GHSA-pvp8-3xj6-8c6x"
        }
      ],
      "name": "org.apache.commons:commons-configuration2",
      "original_library_name": "commons-configuration:commons-configuration",
      "version": "2.10.1",
      "vulnerable_package": true
    }
  },
  "resource_id": "abc123def456789012345678901234ab",
  "resource_name": "github.com/example-org/java-app",
  "resource_type": "repository",
  "risk": {
    "has_exploit_available": false,
    "has_high_exploitability_chance": false,
    "is_exposed_to_attacks": false,
    "is_function_reachable": false,
    "is_production": true
  },
  "risk_details": {
    "has_exploit_available": {
      "evidence": {
        "type": "unavailable"
      },
      "impact_cvss": "safer",
      "value": false
    },
    "has_high_exploitability_chance": {
      "evidence": {
        "epss_score": 0.00181,
        "epss_severity": "low"
      },
      "impact_cvss": "safer",
      "value": false
    },
    "is_exposed_to_attacks": {
      "impact_cvss": "neutral",
      "value": false
    },
    "is_function_reachable": {
      "value": false
    },
    "is_production": {
      "impact_cvss": "neutral",
      "value": true
    }
  },
  "severity": "low",
  "severity_details": {
    "adjusted": {
      "score": 1.7,
      "value": "low",
      "value_id": 1,
      "vector": "CVSS:4.0/AV:N/AC:L/AT:N/PR:N/UI:N/VC:N/VI:N/VA:L/SC:N/SI:N/SA:N/E:U/MAC:H"
    },
    "base": {
      "score": 6.9,
      "value": "medium",
      "value_id": 2,
      "vector": "CVSS:4.0/AV:N/AC:L/AT:N/PR:N/UI:N/VC:N/VI:N/VA:L/SC:N/SI:N/SA:N/E:U"
    }
  },
  "status": "open",
  "tags": [
    "dd_rule_type:not-empty",
    "team:backend",
    "scored:false",
    "origin:ci",
    "source:datadog",
    "service:example-service"
  ],
  "title": "Apache Commons Configuration Uncontrolled Resource Consumption",
  "vulnerability": {
    "cwes": [
      "CWE-400"
    ],
    "first_commit": "abc123def456789012345678901234567890aaaa",
    "hash": "abc123def456789012345678901234567890abcdef12345678901234567890ab",
    "last_commit": "abc123def456789012345678901234567890abcd",
    "stack": {
      "ecosystem": "maven",
      "language": "jvm"
    }
  },
  "workflow": {
    "mute": {
      "is_muted": false
    }
  }
}
```

{{% /tab %}}
{{% tab "Misconfiguration" %}}

```json
{
  "cloud_resource": {
    "display_name": "batch-processor-job-12345678"
  },
  "compliance": {
    "evaluation": "pass",
    "framework_requirement_controls": [
      "cis-kubernetes/Pod-Security-Standards-Baseline/5.2.4",
      "pci-dss/Install-and-Maintain-Network-Security-Controls/1.5",
      "nist-800-53/System and Communications Protection/SC-28"
    ],
    "framework_requirements": [
      "cis-kubernetes/Pod-Security-Standards-Baseline",
      "pci-dss/Install-and-Maintain-Network-Security-Controls",
      "nist-800-53/System and Communications Protection"
    ],
    "frameworks": [
      {
        "control": "5.2.3",
        "framework": "cis-kubernetes",
        "is_default": true,
        "requirement": "Pod-Security-Standards-Baseline",
        "version": "1.9.0"
      },
      {
        "control": "SC-28",
        "framework": "nist-800-53",
        "is_default": true,
        "requirement": "System and Communications Protection",
        "version": "rev5"
      },
      {
        "control": "1.5",
        "framework": "pci-dss",
        "is_default": true,
        "requirement": "Install-and-Maintain-Network-Security-Controls",
        "version": "4.0.1"
      }
    ]
  },
  "description": "Sharing host namespaces in Kubernetes poses security risks by allowing pods to access the host's network, process, and IPC namespaces. To enhance cluster security, sharing of host namespaces must be disallowed. Remediation: 1. Check your pod specifications for `hostNetwork`, `hostPID`, and `hostIPC` settings. 2. Ensure these fields are set to `false` or removed. 3. Apply changes with `kubectl apply -f <manifest-file>`. 4. Verify that pods do not share host namespaces.",
  "detection_changed_at": 1766095392000,
  "finding_id": "ZXhhbXBsZS1taXNjb25maWd1cmF0aW9uLTEyMzQ1Ng==",
  "finding_type": "misconfiguration",
  "first_seen_at": 1766095392000,
  "is_in_security_inbox": false,
  "k8s": {
    "cluster_id": "prod-gke-cluster-us-central1"
  },
  "last_seen_at": 1766095392000,
  "metadata": {
    "schema_version": "2"
  },
  "resource_id": "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee",
  "resource_name": "batch-processor-job-12345678",
  "resource_type": "kubernetes_job",
  "rule": {
    "default_rule_id": "def-000-qtt",
    "id": "def-000-qtt",
    "name": "Jobs should not share the host namespace",
    "type": "cloud configuration",
    "version": 4
  },
  "severity": "low",
  "severity_details": {
    "adjusted": {
      "score": 2,
      "value": "low",
      "value_id": 1
    }
  },
  "status": "open",
  "tags": [
    "scored:true",
    "kube_cluster_name:prod-gke-cluster-us-central1",
    "scope:kubernetes",
    "security:compliance",
    "framework:cis-kubernetes",
    "framework:pci-dss",
    "framework:nist-800-53",
    "env:dev",
    "namespace:default",
    "kube_distribution:gke",
    "source:kubernetes"
  ],
  "title": "Jobs should not share the host namespace",
  "workflow": {
    "mute": {
      "is_muted": false
    }
  }
}
```

{{% /tab %}}
{{% tab "Secret" %}}

```json
{
  "base_severity": "critical",
  "code_location": {
    "column_end": 33,
    "column_start": 13,
    "filename": "docs/deployment/README.md",
    "is_test_file": false,
    "line_end": 22,
    "line_start": 22
  },
  "detection_changed_at": 1765912291919,
  "detection_tool": {
    "name": "datadog-static-analyzer",
    "version": "0.7.2"
  },
  "exposure_time_seconds": 2831065,
  "finding_id": "ZXhhbXBsZS1zZWNyZXQtMTIzNDU2",
  "finding_type": "secret",
  "first_seen_at": 1762988619532,
  "git": {
    "default_branch": "main",
    "is_default_branch": true,
    "repository_id": "github.com/example-org/backend-api",
    "repository_url": "github.com/example-org/backend-api",
    "sha": "abc123def456789012345678901234567890abcd"
  },
  "is_in_security_inbox": false,
  "last_seen_at": 1765912291919,
  "metadata": {
    "schema_version": "2"
  },
  "origin": [
    "ci"
  ],
  "remediation": {
    "codegen": {
      "id": "abc123def456789012345678901234567890abcdef123456",
      "status": "not_available_confidence_too_low"
    },
    "description": "Matches a sequence of characters representing an AWS Access Key ID, which consists of a 4 uppercase letters indicating the type of resource the ID applies to, followed by 16 alphanumeric characters.\n\nExamples of matching formats:\n- `AIDAJQABLZS4A3QDU576`\n- `AROADBQP57FF2EXAMPLE`",
    "is_available": false
  },
  "resource_id": "abc123def456789012345678901234ab",
  "resource_name": "github.com/example-org/backend-api",
  "resource_type": "repository",
  "rule": {
    "id": "secrets/aws-access-key-id",
    "name": "AWS Access Key ID Scanner",
    "type": "secret"
  },
  "secret": {
    "validation_status": "valid"
  },
  "severity": "critical",
  "severity_details": {
    "adjusted": {
      "score": 9,
      "value": "critical",
      "value_id": 4,
      "vector": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:C/C:H/I:H/A:H/E:X/RL:X/RC:X/CR:X/IR:X/AR:X/MAV:X/MAC:X/MPR:X/MUI:X/MS:X/MC:X/MI:X/MA:X"
    },
    "base": {
      "score": 9,
      "value": "critical",
      "value_id": 4,
      "vector": "CVSS:3.0/AV:N/AC:H/PR:N/UI:N/S:C/C:H/I:H/A:H"
    }
  },
  "status": "auto_closed",
  "tags": [
    "dd_rule_type:not-empty",
    "team:backend",
    "scored:false",
    "source:datadog",
    "origin:ci",
    "env:secrets-hosted-scan"
  ],
  "title": "AWS Access Key ID Scanner",
  "vulnerability": {
    "confidence": "not_evaluated",
    "first_commit": "abc123def456789012345678901234567890aaaa",
    "hash": "abc123def456789012345678901234567890abcdef12345678901234567890ab",
    "last_commit": "abc123def456789012345678901234567890abcd",
    "stack": {
      "language": "markdown"
    }
  },
  "workflow": {
    "auto_closed_at": 1765912291918,
    "mute": {
      "is_muted": false
    }
  }
}
```

{{% /tab %}}
{{% tab "Workload Activity" %}}

```json
{
  "description": "Compilers should not be present or executed in production containers. Container images should be built with pre-compiled binaries and follow immutable infrastructure principles.",
  "detection_changed_at": 1766024414711,
  "finding_id": "ZXhhbXBsZS13b3JrbG9hZC1hY3Rpdml0eS0xMjM0NTY=",
  "finding_type": "workload_activity",
  "first_seen_at": 1766024414711,
  "host": {
    "name": "gke-prod-cluster-default-pool-abc12345.c.example-project.internal"
  },
  "is_in_security_inbox": false,
  "k8s": {
    "cluster_id": "prod-gke-cluster-us-central1"
  },
  "last_seen_at": 1766025229714,
  "metadata": {
    "schema_version": "2"
  },
  "resource_id": "abc123def456789012345678901234567890abcdef12345678901234567890ab",
  "resource_name": "abc123def456789012345678901234567890abcdef12345678901234567890ab",
  "resource_type": "container",
  "rule": {
    "default_rule_id": "def-000-krp",
    "id": "def-000-krp",
    "name": "Containers should not execute compilers",
    "type": "workload_activity",
    "version": 1
  },
  "severity": "medium",
  "severity_details": {
    "adjusted": {
      "score": 5.5,
      "value": "medium",
      "value_id": 2
    }
  },
  "status": "open",
  "tags": [
    "scored:true",
    "dd_rule_type:workload_activity",
    "cloud_provider:gcp",
    "cluster_name:prod-gke-cluster-us-central1",
    "policy:threat-detection",
    "region:us-central1",
    "env:staging",
    "kube_namespace:default",
    "security:compliance",
    "type:exec",
    "rule_id:compiler_in_container",
    "kube_container_name:runner",
    "source:runtime-security-agent",
    "tactic:ta0005-defense-evasion",
    "policy:best-practice"
  ],
  "title": "Containers should not execute compilers",
  "workflow": {
    "mute": {
      "is_muted": false
    }
  }
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
      <td><code>severity</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@severity</code><br>Datadog-adjusted severity level of the finding. Valid values: <code>critical</code>, <code>high</code>, <code>medium</code>, <code>low</code>, <code>info</code>, <code>none</code>, <code>unknown</code>.</td>
    </tr>
    <tr>
      <td><code>base_severity</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@base_severity</code><br>Base severity level of the finding before any adjustments. Valid values: <code>critical</code>, <code>high</code>, <code>medium</code>, <code>low</code>, <code>info</code>, <code>none</code>, <code>unknown</code>.</td>
    </tr>
    <tr>
      <td><code>status</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@status</code><br>Workflow status of the finding. Valid values: <code>open</code>, <code>muted</code>, <code>auto_closed</code>.</td>
    </tr>
    <tr>
      <td><code>finding_type</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@finding_type</code><br>Category of the finding. Valid values: <code>api_security</code>, <code>attack_path</code>, <code>runtime_code_vulnerability</code>, <code>static_code_vulnerability</code>, <code>host_and_container_vulnerability</code>, <code>iac_misconfiguration</code>, <code>identity_risk</code>, <code>library_vulnerability</code>, <code>misconfiguration</code>, <code>secret</code>, <code>workload_activity</code>.</td>
    </tr>
    <tr>
      <td><code>finding_id</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@finding_id</code><br>Unique identifier of the finding.</td>
    </tr>
    <tr>
      <td><code>title</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@title</code><br>Human-readable title for the finding.</td>
    </tr>
    <tr>
      <td><code>description</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@description</code><br>Human-readable explanation of the finding. May include Markdown formatting.</td>
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
      <td><code>first_seen_at</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@first_seen_at</code><br>Timestamp in milliseconds (UTC) when the finding was first detected.</td>
    </tr>
    <tr>
      <td><code>last_seen_at</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@last_seen_at</code><br>Timestamp in milliseconds (UTC) when the finding was most recently detected.</td>
    </tr>
    <tr>
      <td><code>detection_changed_at</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@detection_changed_at</code><br>Timestamp in milliseconds (UTC) when the finding's evaluation or detection state last changed.</td>
    </tr>
    <tr>
      <td><code>origin</code></td>
      <td>array (string)</td>
      <td><strong>Path:</strong> <code>@origin</code><br>Detection origins that produced the finding, such as agentless scans, APM, SCI (Software Composition Analysis), or CI (Continuous Integration).</td>
    </tr>
    <tr>
      <td><code>exposure_time_seconds</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@exposure_time_seconds</code><br>Indicates the time elapsed, in seconds, between when the finding was last closed and when it was detected again.</td>
    </tr>
    <tr>
      <td><code>is_in_security_inbox</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@is_in_security_inbox</code><br>True if the finding appears in the Security Inbox; false otherwise.</td>
    </tr>
    <tr>
      <td><code>detection_tool</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@detection_tool</code><br>Information about the tool or engine responsible for detecting the finding.</td>
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
      <td><code>triage</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@workflow.triage</code><br>Assignment and status information. Assignment may be synchronized with case or Jira information.</td>
    </tr>
    <tr>
      <td><code>auto_closed_at</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@workflow.auto_closed_at</code><br>Timestamp in milliseconds (UTC) when the finding was automatically closed by the system.</td>
    </tr>
    <tr>
      <td><code>due_date</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@workflow.due_date</code><br>Due date rule applied to the finding.</td>
    </tr>
    <tr>
      <td><code>mute</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@workflow.mute</code><br>Muting information and metadata.</td>
    </tr>
    <tr>
      <td><code>automations</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@workflow.automations</code><br>Information about any automation rules that apply to the finding.</td>
    </tr>
    <tr>
      <td><code>integrations</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@workflow.integrations</code><br>Integrations like Jira, Case Management, or ServiceNow used to triage and remediate the finding.</td>
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
      <td><strong>Path:</strong> <code>@workflow.triage.assignee</code><br>User assigned to this finding.</td>
    </tr>
    <tr>
      <td><code>time_to_acknowledge_seconds</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@workflow.triage.time_to_acknowledge_seconds</code><br>Time in seconds between when the finding was first detected and the first manual triage action.</td>
    </tr>
    <tr>
      <td><code>time_to_resolution_seconds</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@workflow.triage.time_to_resolution_seconds</code><br>Time in seconds between when the finding was first detected and when it was resolved.</td>
    </tr>
  </tbody>
</table>

#### Assignee

User assigned to this finding.

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
      <td><strong>Path:</strong> <code>@workflow.triage.assignee.name</code><br>Display name of the assignee.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@workflow.triage.assignee.id</code><br>Unique identifier in UUID format for the assignee.</td>
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

##### Updated By

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
      <td><strong>Path:</strong> <code>@workflow.triage.assignee.updated_by.id</code><br>Unique identifier in UUID format of the user who last modified the assignee.</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@workflow.triage.assignee.updated_by.name</code><br>Display name of the user who last modified the assignee</td>
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
      <td><strong>Path:</strong> <code>@workflow.due_date.rule_id</code><br>Unique identifier for the due date rule applied to this finding.</td>
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
      <td><code>is_muted</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@workflow.mute.is_muted</code><br>True if the finding is muted; false if it is active.</td>
    </tr>
    <tr>
      <td><code>reason</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@workflow.mute.reason</code><br>Reason provided for muting the finding. Valid values: <code>none</code>, <code>no_pending_fix</code>, <code>human_error</code>, <code>no_longer_accepted_risk</code>, <code>other</code>, <code>pending_fix</code>, <code>false_positive</code>, <code>accepted_risk</code>, <code>no_fix</code>, <code>duplicate</code>, <code>risk_accepted</code>.</td>
    </tr>
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
      <td><code>is_muted_by_rule</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@workflow.mute.is_muted_by_rule</code><br>True if the finding is muted by an automation rule; false otherwise. If true, the relevant automation rule is referenced in the workflow.automations section.</td>
    </tr>
    <tr>
      <td><code>rule_id</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@workflow.mute.rule_id</code><br>Unique identifier for the automation rule that muted this finding. Only set when <code>is_muted_by_rule</code> is true.</td>
    </tr>
    <tr>
      <td><code>rule_name</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@workflow.mute.rule_name</code><br>Human-readable name of the automation rule that muted this finding. Only set when <code>is_muted_by_rule</code> is true.</td>
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
  </tbody>
</table>

#### Muted By

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
      <td><strong>Path:</strong> <code>@workflow.mute.muted_by.id</code><br>Unique identifier in UUID format of the user who muted the finding.</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@workflow.mute.muted_by.name</code><br>Display name of the user who muted the finding.</td>
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
      <td><strong>Path:</strong> <code>@workflow.integrations.jira</code><br>Jira issue keys attached to this finding in the format <code>PROJECT-NUMBER</code> (for example, <code>PROJ-123</code>).</td>
    </tr>
    <tr>
      <td><code>pull_requests</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@workflow.integrations.pull_requests</code><br>Pull requests used to remediate this finding.</td>
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
      <td><code>has_sensitive_data</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk.has_sensitive_data</code><br>True if the finding has access to a resource that contains sensitive data; false otherwise.</td>
    </tr>
    <tr>
      <td><code>is_function_reachable</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk.is_function_reachable</code><br>True if the vulnerable function can be executed; false otherwise.</td>
    </tr>
    <tr>
      <td><code>is_exposed_to_attacks</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk.is_exposed_to_attacks</code><br>True if attacks have already been detected on this resource; false otherwise.</td>
    </tr>
    <tr>
      <td><code>has_privileged_access</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk.has_privileged_access</code><br>True if the finding's resource is running with elevated privileges or has the ability to assume a privileged role; false otherwise.</td>
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
      <td><code>has_exploit_available</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk.has_exploit_available</code><br>True if known exploits exist for this finding; false otherwise.</td>
    </tr>
    <tr>
      <td><code>has_high_exploitability_chance</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk.has_high_exploitability_chance</code><br>True if the EPSS (Exploit Prediction Scoring System) score is above 1%; false otherwise.</td>
    </tr>
    <tr>
      <td><code>is_tainted_from_request_url</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk.is_tainted_from_request_url</code><br>True if the final URL contains tainted parts originating from the request URL; false otherwise.</td>
    </tr>
    <tr>
      <td><code>is_tainted_from_query_string</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk.is_tainted_from_query_string</code><br>True if the string is tainted with elements derived from an HTTP query string; false otherwise.</td>
    </tr>
    <tr>
      <td><code>is_tainted_from_database</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk.is_tainted_from_database</code><br>True if the string is tainted due to originating from an untrusted database source; false otherwise.</td>
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
      <td><code>has_sensitive_data</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.has_sensitive_data</code><br>Evidence and indicators about whether the affected resource has sensitive data.</td>
    </tr>
    <tr>
      <td><code>is_function_reachable</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.is_function_reachable</code><br>Groups evidence and indicators about whether the vulnerable function or module is used in the code.</td>
    </tr>
    <tr>
      <td><code>is_exposed_to_attacks</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.is_exposed_to_attacks</code><br>Groups evidence and indicators about whether the service where the finding was detected is exposed to attacks.</td>
    </tr>
    <tr>
      <td><code>has_privileged_access</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.has_privileged_access</code><br>Groups evidence and indicators about whether the resource has privileged access.</td>
    </tr>
    <tr>
      <td><code>is_production</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.is_production</code><br>Groups evidence and indicators about whether the resource associated with the finding is running in a production environment.</td>
    </tr>
    <tr>
      <td><code>is_publicly_accessible</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.is_publicly_accessible</code><br>Groups information about whether the affected resource is accessible from the public internet.</td>
    </tr>
    <tr>
      <td><code>has_exploit_available</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.has_exploit_available</code><br>Groups information about whether a known exploit exists for this finding advisory.</td>
    </tr>
    <tr>
      <td><code>has_high_exploitability_chance</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.has_high_exploitability_chance</code><br>Groups evidence and indicators about whether the vulnerability is likely to be exploited based on EPSS (Exploit Prediction Scoring System).</td>
    </tr>
    <tr>
      <td><code>is_tainted_from_request_url</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.is_tainted_from_request_url</code><br>Groups information about whether the tainted parts originate from the request URL.</td>
    </tr>
    <tr>
      <td><code>is_tainted_from_query_string</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.is_tainted_from_query_string</code><br>Groups information about whether the tainted parts originate from a query string.</td>
    </tr>
    <tr>
      <td><code>is_tainted_from_database</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.is_tainted_from_database</code><br>Groups information about whether tainted parts originate from a database.</td>
    </tr>
    <tr>
      <td><code>is_using_sha1</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.is_using_sha1</code><br>Groups information about whether SHA1 is used in a weak hash.</td>
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
      <td><code>impact_cvss</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@risk_details.has_sensitive_data.impact_cvss</code><br>Describes how sensitive data presence changes the CVSS score. Valid values: <code>riskier</code>, <code>neutral</code>, <code>safer</code>, <code>unknown</code>.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk_details.has_sensitive_data.value</code><br>Same as <code>risk.has_sensitive_data</code>.</td>
    </tr>
    <tr>
      <td><code>evidence</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.has_sensitive_data.evidence</code><br>Evidence supporting the presence of sensitive data.</td>
    </tr>
  </tbody>
</table>

#### Evidence

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
      <td><strong>Path:</strong> <code>@risk_details.has_sensitive_data.evidence.sds_id</code><br>Identifier of a sensitive data entry discovered by Datadog Sensitive Data Scanner.</td>
    </tr>
  </tbody>
</table>

### Is Function Reachable

Groups evidence and indicators about whether the vulnerable function or module is used in the code.

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
      <td>string</td>
      <td><strong>Path:</strong> <code>@risk_details.is_function_reachable.impact_cvss</code><br>Describes how function reachability changes the CVSS risk assessment. Valid values: <code>riskier</code>, <code>neutral</code>, <code>safer</code>, <code>unknown</code>.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk_details.is_function_reachable.value</code><br>True if the function is reachable; false otherwise.</td>
    </tr>
    <tr>
      <td><code>evidence</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.is_function_reachable.evidence</code><br>Contains the evidence used to determine whether the function is reachable.</td>
    </tr>
  </tbody>
</table>

#### Evidence

Contains the evidence used to determine whether the function is reachable.

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
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.is_function_reachable.evidence.locations</code><br>Array of code locations where the function is called.</td>
    </tr>
  </tbody>
</table>

##### Locations

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
      <td><code>filename</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@risk_details.is_function_reachable.evidence.locations.filename</code><br>Name of the file where the root parent package version is declared.</td>
    </tr>
    <tr>
      <td><code>line_start</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@risk_details.is_function_reachable.evidence.locations.line_start</code><br>Line number where the root parent package version declaration starts in the file.</td>
    </tr>
    <tr>
      <td><code>column_start</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@risk_details.is_function_reachable.evidence.locations.column_start</code><br>Column position where the root parent package version declaration starts on the line.</td>
    </tr>
    <tr>
      <td><code>line_end</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@risk_details.is_function_reachable.evidence.locations.line_end</code><br>Line number where the root parent package version declaration ends in the file.</td>
    </tr>
    <tr>
      <td><code>column_end</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@risk_details.is_function_reachable.evidence.locations.column_end</code><br>Column position where the root parent package version declaration ends on the line.</td>
    </tr>
    <tr>
      <td><code>is_test_file</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk_details.is_function_reachable.evidence.locations.is_test_file</code><br>True if the code file is a test file; false otherwise.</td>
    </tr>
    <tr>
      <td><code>url</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@risk_details.is_function_reachable.evidence.locations.url</code><br>URL to view the file online (for example, in GitHub), highlighting the code location.</td>
    </tr>
    <tr>
      <td><code>symbol</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@risk_details.is_function_reachable.evidence.locations.symbol</code></td>
    </tr>
  </tbody>
</table>

### Is Exposed To Attacks

Groups evidence and indicators about whether the service where the finding was detected is exposed to attacks.

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
      <td>string</td>
      <td><strong>Path:</strong> <code>@risk_details.is_exposed_to_attacks.impact_cvss</code><br>Describes how the resource's exposure affects the CVSS scoring. Valid values: <code>riskier</code>, <code>neutral</code>, <code>safer</code>, <code>unknown</code>.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk_details.is_exposed_to_attacks.value</code><br>Same as <code>risk.is_exposed_to_attacks</code>.</td>
    </tr>
    <tr>
      <td><code>evidence</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.is_exposed_to_attacks.evidence</code><br>Contains evidence for the presence of attacks.</td>
    </tr>
  </tbody>
</table>

#### Evidence

Contains evidence for the presence of attacks.

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
      <td><code>trace_example</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.is_exposed_to_attacks.evidence.trace_example</code><br>Example of a trace with attacks detected on the finding's resource.</td>
    </tr>
    <tr>
      <td><code>trace_query</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@risk_details.is_exposed_to_attacks.evidence.trace_query</code><br>Query used to find traces with attacks related to the finding's resource.</td>
    </tr>
    <tr>
      <td><code>attacks_details</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.is_exposed_to_attacks.evidence.attacks_details</code><br>Contains details about one of the detected attacks.</td>
    </tr>
  </tbody>
</table>

### Has Privileged Access

Groups evidence and indicators about whether the resource has privileged access.

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
      <td>string</td>
      <td><strong>Path:</strong> <code>@risk_details.has_privileged_access.impact_cvss</code><br>Describes how privileged access changes the CVSS scoring. Valid values: <code>riskier</code>, <code>neutral</code>, <code>safer</code>, <code>unknown</code>.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk_details.has_privileged_access.value</code><br>True if the resource associated with the finding has privileged access; false otherwise.</td>
    </tr>
    <tr>
      <td><code>evidence</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.has_privileged_access.evidence</code><br>Contains evidence showing proof of privileged access.</td>
    </tr>
  </tbody>
</table>

#### Evidence

Contains evidence showing proof of privileged access.

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

### Is Production

Groups evidence and indicators about whether the resource associated with the finding is running in a production environment.

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
      <td>string</td>
      <td><strong>Path:</strong> <code>@risk_details.is_production.impact_cvss</code><br>Describes how production environment status affects the CVSS scoring. Valid values: <code>riskier</code>, <code>neutral</code>, <code>safer</code>, <code>unknown</code>.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk_details.is_production.value</code><br>Same as <code>risk.is_production</code>.</td>
    </tr>
    <tr>
      <td><code>evidence</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.is_production.evidence</code><br>Contains the <code>env</code> tag value that determines if the resource is in production.</td>
    </tr>
  </tbody>
</table>

### Is Publicly Accessible

Groups information about whether the affected resource is accessible from the public internet.

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
      <td>string</td>
      <td><strong>Path:</strong> <code>@risk_details.is_publicly_accessible.impact_cvss</code><br>Describes how public accessibility affects the CVSS scoring. Valid values: <code>riskier</code>, <code>neutral</code>, <code>safer</code>, <code>unknown</code>.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk_details.is_publicly_accessible.value</code><br>Same as <code>risk.is_publicly_accessible</code>.</td>
    </tr>
    <tr>
      <td><code>evidence</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.is_publicly_accessible.evidence</code><br>Contains evidence showing proof of access from the internet.</td>
    </tr>
  </tbody>
</table>

#### Evidence

Contains evidence showing proof of access from the internet.

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

### Has Exploit Available

Groups information about whether a known exploit exists for this finding advisory.

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
      <td>string</td>
      <td><strong>Path:</strong> <code>@risk_details.has_exploit_available.impact_cvss</code><br>Describes how the availability of known exploits changes the CVSS scoring. Valid values: <code>riskier</code>, <code>neutral</code>, <code>safer</code>, <code>unknown</code>.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk_details.has_exploit_available.value</code><br>True if known exploits exist for this finding; false otherwise.</td>
    </tr>
    <tr>
      <td><code>evidence</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.has_exploit_available.evidence</code><br>Contains evidence about exploit availability.</td>
    </tr>
  </tbody>
</table>

#### Evidence

Contains evidence about exploit availability.

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
      <td><code>type</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@risk_details.has_exploit_available.evidence.type</code><br>Type of evidence. Valid values: <code>production_ready</code>, <code>poc</code>, <code>unavailable</code>.</td>
    </tr>
    <tr>
      <td><code>exploit_urls</code></td>
      <td>array (string)</td>
      <td><strong>Path:</strong> <code>@risk_details.has_exploit_available.evidence.exploit_urls</code><br>Lists exploit URLs associated with the finding.</td>
    </tr>
    <tr>
      <td><code>exploit_sources</code></td>
      <td>array (string)</td>
      <td><strong>Path:</strong> <code>@risk_details.has_exploit_available.evidence.exploit_sources</code><br>Lists exploit sources associated with the finding (for example, NIST, CISA, Exploit-DB).</td>
    </tr>
  </tbody>
</table>

### Has High Exploitability Chance

Groups evidence and indicators about whether the vulnerability is likely to be exploited based on EPSS (Exploit Prediction Scoring System).

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
      <td>string</td>
      <td><strong>Path:</strong> <code>@risk_details.has_high_exploitability_chance.impact_cvss</code><br>Describes how high exploitability chance affects the CVSS scoring. Valid values: <code>riskier</code>, <code>neutral</code>, <code>safer</code>, <code>unknown</code>.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk_details.has_high_exploitability_chance.value</code><br>True if the EPSS score is above 1%; false otherwise.</td>
    </tr>
    <tr>
      <td><code>evidence</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.has_high_exploitability_chance.evidence</code><br>Contains evidence of the EPSS score.</td>
    </tr>
  </tbody>
</table>

#### Evidence

Contains evidence of the EPSS score.

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
      <td>string</td>
      <td><strong>Path:</strong> <code>@risk_details.has_high_exploitability_chance.evidence.epss_severity</code><br>EPSS score severity level. Valid values: <code>Critical</code>, <code>High</code>, <code>Medium</code>, <code>Low</code>.</td>
    </tr>
    <tr>
      <td><code>threshold</code></td>
      <td>number</td>
      <td><strong>Path:</strong> <code>@risk_details.has_high_exploitability_chance.evidence.threshold</code><br>Minimum EPSS score required for a vulnerability to be considered as having a high exploitability chance.</td>
    </tr>
  </tbody>
</table>

### Is Tainted From Request Url

Groups information about whether the tainted parts originate from the request URL.

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
      <td>string</td>
      <td><strong>Path:</strong> <code>@risk_details.is_tainted_from_request_url.impact_cvss</code><br>Describes how request URL tainting changes the CVSS scoring. Valid values: <code>riskier</code>, <code>neutral</code>, <code>safer</code>, <code>unknown</code>.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk_details.is_tainted_from_request_url.value</code><br>True if the final URL contains tainted parts originating from the request URL; false otherwise.</td>
    </tr>
  </tbody>
</table>

### Is Tainted From Query String

Groups information about whether the tainted parts originate from a query string.

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
      <td>string</td>
      <td><strong>Path:</strong> <code>@risk_details.is_tainted_from_query_string.impact_cvss</code><br>Describes how query string tainting changes the CVSS scoring. Valid values: <code>riskier</code>, <code>neutral</code>, <code>safer</code>, <code>unknown</code>.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk_details.is_tainted_from_query_string.value</code><br>True if the string contains elements derived from an HTTP query string; false otherwise.</td>
    </tr>
  </tbody>
</table>

### Is Tainted From Database

Groups information about whether tainted parts originate from a database.

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
      <td>string</td>
      <td><strong>Path:</strong> <code>@risk_details.is_tainted_from_database.impact_cvss</code><br>Describes how database tainting changes the CVSS scoring. Valid values: <code>riskier</code>, <code>neutral</code>, <code>safer</code>, <code>unknown</code>.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk_details.is_tainted_from_database.value</code><br>True if the string is tainted due to originating from an untrusted database source; false otherwise.</td>
    </tr>
  </tbody>
</table>

### Is Using Sha1

Groups information about whether SHA1 is used in a weak hash.

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
      <td>string</td>
      <td><strong>Path:</strong> <code>@risk_details.is_using_sha1.impact_cvss</code><br>Describes how SHA1 usage changes the CVSS scoring. Valid values: <code>riskier</code>, <code>neutral</code>, <code>safer</code>, <code>unknown</code>.</td>
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

Describes how to discover a vulnerability. Vulnerability findings with rules mean the vulnerability was detected in source code or running code. Rules are also used for non-vulnerability findings such as misconfigurations or API security.

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
      <td><code>type</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@rule.type</code><br>Type of the rule that generated the finding.</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@rule.name</code><br>Name of the rule that generated the finding.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@rule.id</code><br>Identifier of the rule that generated the finding.</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@rule.version</code><br>Version of the rule that generated the finding.</td>
    </tr>
    <tr>
      <td><code>default_rule_id</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@rule.default_rule_id</code><br>Default rule identifier of the rule. Custom rules will not have default rule identifiers.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Advisory" level="h3" id="advisory" %}}

Ties a vulnerability to a set of specific software versions. Vulnerability findings with advisories mean a vulnerable version of the software was detected (typically through SBOMs).

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
      <td><strong>Path:</strong> <code>@advisory.id</code><br>Internal identifier for the advisory.</td>
    </tr>
    <tr>
      <td><code>cve</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@advisory.cve</code><br>Primary globally recognized identifier for a security vulnerability, following the <code>CVE-YYYY-NNNN</code> format.</td>
    </tr>
    <tr>
      <td><code>aliases</code></td>
      <td>array (string)</td>
      <td><strong>Path:</strong> <code>@advisory.aliases</code><br>Contains additional identifiers referring to the same vulnerability, created by other entities.</td>
    </tr>
    <tr>
      <td><code>published_at</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@advisory.published_at</code><br>Timestamp in milliseconds (UTC) when the advisory was published.</td>
    </tr>
    <tr>
      <td><code>modified_at</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@advisory.modified_at</code><br>Timestamp in milliseconds (UTC) when the advisory was last updated.</td>
    </tr>
    <tr>
      <td><code>summary</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@advisory.summary</code><br>Short summary of the advisory.</td>
    </tr>
    <tr>
      <td><code>type</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@advisory.type</code><br>Specifies the type of the advisory. Valid values: <code>component_with_known_vulnerability</code>, <code>unmaintained</code>, <code>end_of_life</code>, <code>dangerous_workflows</code>, <code>risky_license</code>, <code>malicious_package</code>.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Vulnerability" level="h3" id="vulnerability" %}}

Contains information specific to vulnerabilities.

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
      <td><code>cwes</code></td>
      <td>array (string)</td>
      <td><strong>Path:</strong> <code>@vulnerability.cwes</code><br>CWE (Common Weakness Enumeration) identifier associated with this vulnerability. Each entry must use the <code>CWE-&lt;id&gt;</code> format (for example, <code>CWE-416</code>).</td>
    </tr>
    <tr>
      <td><code>hash</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@vulnerability.hash</code><br>Vulnerability hash used to correlate the same vulnerability across SCA (Software Composition Analysis) runtime and static analysis.</td>
    </tr>
    <tr>
      <td><code>first_commit</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@vulnerability.first_commit</code><br>Identifies the commit in which this vulnerability was first introduced.</td>
    </tr>
    <tr>
      <td><code>last_commit</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@vulnerability.last_commit</code><br>Identifies the commit in which this vulnerability was fixed.</td>
    </tr>
    <tr>
      <td><code>owasp_top10_years</code></td>
      <td>array (integer)</td>
      <td><strong>Path:</strong> <code>@vulnerability.owasp_top10_years</code><br>Indicates the years the vulnerability appeared in the OWASP Top 10 list of critical vulnerabilities.</td>
    </tr>
    <tr>
      <td><code>confidence</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@vulnerability.confidence</code><br>Assesses the likelihood of the vulnerability being a true positive. Possible values: <code>low</code>, <code>high</code>, <code>not_evaluated</code>.</td>
    </tr>
    <tr>
      <td><code>confidence_reason</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@vulnerability.confidence_reason</code><br>Provides the rationale behind the assigned confidence level.</td>
    </tr>
    <tr>
      <td><code>is_emerging</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@vulnerability.is_emerging</code><br>True if this vulnerability is classified as an emerging threat; false otherwise.</td>
    </tr>
    <tr>
      <td><code>stack</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@vulnerability.stack</code><br>Specifies the technological stack where the vulnerability was found.</td>
    </tr>
  </tbody>
</table>

### Stack

Specifies the technological stack where the vulnerability was found.

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
      <td><code>language</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@vulnerability.stack.language</code><br>Specifies the language where the vulnerability was found.</td>
    </tr>
    <tr>
      <td><code>ecosystem</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@vulnerability.stack.ecosystem</code><br>Indicates the package management ecosystem or source registry from which the vulnerable component originates. Possible values: <code>pypi</code>, <code>maven</code>, <code>nuget</code>, <code>npm</code>, <code>rubygems</code>, <code>go</code>, <code>packagist</code>, <code>deb</code>, <code>rpm</code>, <code>apk</code>, <code>windows</code>, <code>macos</code>, <code>oci</code>, <code>generic</code>, <code>bottlerocket</code>, <code>conan</code>, <code>crates</code>, <code>none</code>.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Remediation" level="h3" id="remediation" %}}

Groups information about the finding's remediation.

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
      <td><code>codegen</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@remediation.codegen</code><br>Tracks finding status for the code generation platform.</td>
    </tr>
    <tr>
      <td><code>is_available</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@remediation.is_available</code><br>True if a remediation is currently available for this finding; false otherwise.</td>
    </tr>
    <tr>
      <td><code>description</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@remediation.description</code><br>Description of the remediation.</td>
    </tr>
    <tr>
      <td><code>recommended_type</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@remediation.recommended_type</code><br>Indicates the recommended remediation type for this finding. Possible values: <code>package</code>, <code>host_image</code>, <code>container_image</code>, <code>code_update</code>, <code>microsoft_kb</code>, <code>root_package</code>.</td>
    </tr>
    <tr>
      <td><code>recommended</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@remediation.recommended</code><br>Contains the recommended remediation.</td>
    </tr>
    <tr>
      <td><code>package</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@remediation.package</code><br>Groups remediation package information.</td>
    </tr>
    <tr>
      <td><code>root_package</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@remediation.root_package</code><br>Groups remediation root package information.</td>
    </tr>
    <tr>
      <td><code>host_image</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@remediation.host_image</code><br>Contains remediation suggesting the latest host image version that may remediate the vulnerability.</td>
    </tr>
    <tr>
      <td><code>container_image</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@remediation.container_image</code><br>Contains remediation suggesting a newer container image version that may remediate the vulnerability.</td>
    </tr>
    <tr>
      <td><code>code_update</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@remediation.code_update</code></td>
    </tr>
    <tr>
      <td><code>microsoft_kb</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@remediation.microsoft_kb</code><br>Contains remediation strategy using a Microsoft Knowledge Base (KB) article.</td>
    </tr>
  </tbody>
</table>

### Codegen

Tracks finding status for the code generation platform.

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
      <td><code>status</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@remediation.codegen.status</code><br>Status of the automated fix generation. Valid values: <code>generated</code>, <code>not_available_non_default_branch</code>, <code>not_available_unsupported_tool</code>, <code>not_available_unsupported_rule</code>, <code>not_available_confidence_low</code>, <code>not_available_disabled</code>, <code>not_available_git_provider_not_supported</code>, <code>not_available_confidence_too_low</code>, <code>error</code>.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@remediation.codegen.id</code><br>Identifier used to track the remediation in the code generation backend.</td>
    </tr>
  </tbody>
</table>

### Package

Groups remediation package information.

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
      <td><code>latest_no_critical</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@remediation.package.latest_no_critical</code><br>Contains remediation suggesting the latest package version with no critical vulnerabilities (based on base score).</td>
    </tr>
    <tr>
      <td><code>closest_no_critical</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@remediation.package.closest_no_critical</code><br>Contains remediation suggesting the closest package version with no critical vulnerabilities (based on base score).</td>
    </tr>
    <tr>
      <td><code>latest_no_vulnerabilities</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@remediation.package.latest_no_vulnerabilities</code><br>Contains remediation suggesting the latest package version with no vulnerabilities.</td>
    </tr>
    <tr>
      <td><code>closest_no_vulnerabilities</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@remediation.package.closest_no_vulnerabilities</code><br>Contains remediation suggesting the closest package version with no vulnerabilities.</td>
    </tr>
    <tr>
      <td><code>base</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@remediation.package.base</code></td>
    </tr>
  </tbody>
</table>

### Root Package

Groups remediation root package information.

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
      <td><code>latest_no_critical</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.latest_no_critical</code><br>Contains remediation suggesting the latest package version with no critical vulnerabilities (based on base score).</td>
    </tr>
    <tr>
      <td><code>closest_no_critical</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.closest_no_critical</code><br>Contains remediation suggesting the closest package version with no critical vulnerabilities (based on base score).</td>
    </tr>
    <tr>
      <td><code>latest_no_vulnerabilities</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.latest_no_vulnerabilities</code><br>Contains remediation suggesting the latest package version with no vulnerabilities.</td>
    </tr>
    <tr>
      <td><code>closest_no_vulnerabilities</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.closest_no_vulnerabilities</code><br>Contains remediation suggesting the closest package version with no vulnerabilities.</td>
    </tr>
    <tr>
      <td><code>base</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.base</code></td>
    </tr>
  </tbody>
</table>

### Host Image

Contains remediation suggesting the latest host image version that may remediate the vulnerability.

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
      <td><strong>Path:</strong> <code>@remediation.host_image.latest_major</code><br>Contains information about the latest Amazon Machine Image (AMI) that may remediate the vulnerability.</td>
    </tr>
  </tbody>
</table>

#### Latest Major

Contains information about the latest Amazon Machine Image (AMI) that may remediate the vulnerability.

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
      <td><strong>Path:</strong> <code>@remediation.host_image.latest_major.name</code><br>Name of the latest Amazon Machine Image (for example, <code>ami-12345678</code>) that may remediate the vulnerability.</td>
    </tr>
  </tbody>
</table>

### Container Image

Contains remediation suggesting a newer container image version that may remediate the vulnerability.

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
      <td><strong>Path:</strong> <code>@remediation.container_image.closest_no_vulnerabilities</code><br>Contains remediation suggesting to upgrade the container image to a newer version that may remediate the vulnerability.</td>
    </tr>
  </tbody>
</table>

#### Closest No Vulnerabilities

Contains remediation suggesting to upgrade the container image to a newer version that may remediate the vulnerability.

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
      <td><code>layer_digests</code></td>
      <td>array (string)</td>
      <td><strong>Path:</strong> <code>@remediation.container_image.closest_no_vulnerabilities.layer_digests</code><br>Contains the layer digests of the currently vulnerable container image that needs to be upgraded.</td>
    </tr>
    <tr>
      <td><code>image_url</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@remediation.container_image.closest_no_vulnerabilities.image_url</code><br>URL of the container image that may remediate the vulnerability.</td>
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

### Code Update

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
      <td><strong>Path:</strong> <code>@remediation.code_update.edits</code><br>Lists the code changes required to remediate the finding.</td>
    </tr>
  </tbody>
</table>

### Microsoft Kb

Contains remediation strategy using a Microsoft Knowledge Base (KB) article.

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
      <td><strong>Path:</strong> <code>@remediation.microsoft_kb.closest_fix_advisory</code><br>Specifies the closest patch available to address the current advisory.</td>
    </tr>
  </tbody>
</table>

#### Closest Fix Advisory

Specifies the closest patch available to address the current advisory.

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

{{% /collapse-content %}}

{{% collapse-content title="Compliance" level="h3" id="compliance" %}}

Contains information specific to compliance findings, such as compliance rule or evaluation (pass/fail).

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
      <td>string</td>
      <td><strong>Path:</strong> <code>@compliance.evaluation</code><br>Compliance evaluation result. Valid values: <code>pass</code> (resource is properly configured), <code>fail</code> (resource is misconfigured).</td>
    </tr>
    <tr>
      <td><code>frameworks</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@compliance.frameworks</code><br>Lists the compliance frameworks mapped to this finding.</td>
    </tr>
    <tr>
      <td><code>framework_requirements</code></td>
      <td>array (string)</td>
      <td><strong>Path:</strong> <code>@compliance.framework_requirements</code><br>Lists the requirements within the compliance framework that this finding relates to.</td>
    </tr>
    <tr>
      <td><code>framework_requirement_controls</code></td>
      <td>array (string)</td>
      <td><strong>Path:</strong> <code>@compliance.framework_requirement_controls</code><br>Lists the controls within the framework requirement that this finding maps to.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Cloud Resource" level="h3" id="cloud-resource" %}}

Groups attributes identifying the cloud resource affected by the finding.

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
      <td><code>tags</code></td>
      <td>array (string)</td>
      <td><strong>Path:</strong> <code>@cloud_resource.tags</code><br>Lists tags applied to the cloud resource.</td>
    </tr>
    <tr>
      <td><code>category</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@cloud_resource.category</code><br>Category the resource type belongs to.</td>
    </tr>
    <tr>
      <td><code>key</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@cloud_resource.key</code><br>Canonical Cloud Resource Identifier (CCRID).</td>
    </tr>
    <tr>
      <td><code>cloud_provider_url</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@cloud_resource.cloud_provider_url</code><br>Link to the resource in the cloud provider console.</td>
    </tr>
    <tr>
      <td><code>cloud_provider</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@cloud_resource.cloud_provider</code><br>Indicates the cloud provider hosting the resource. Valid values: <code>aws</code>, <code>azure</code>, <code>gcp</code>, <code>oci</code>.</td>
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
      <td><code>account</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@cloud_resource.account</code><br>Cloud account that owns the cloud resource (for example, AWS account, Azure subscription, GCP project, OCI tenancy).</td>
    </tr>
    <tr>
      <td><code>display_name</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@cloud_resource.display_name</code><br>Display name of the resource.</td>
    </tr>
    <tr>
      <td><code>region</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@cloud_resource.region</code><br>Cloud region where the resource is located.</td>
    </tr>
    <tr>
      <td><code>public_accessibility_paths</code></td>
      <td>array (string)</td>
      <td><strong>Path:</strong> <code>@cloud_resource.public_accessibility_paths</code><br>Describes the network paths through which the resource is accessible from the public internet.</td>
    </tr>
    <tr>
      <td><code>public_port_ranges</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@cloud_resource.public_port_ranges</code><br>List of port ranges on the resource that are exposed to the public internet.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Iac Resource" level="h3" id="iac-resource" %}}

Groups attributes identifying the Infrastructure as Code (IaC) resource related to the finding.

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
      <td><code>provider</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@iac_resource.provider</code><br>Indicates the IaC (Infrastructure as Code) provider where the resource is defined (for example, <code>aws</code>, <code>gcp</code>, <code>azure</code>). Possible values: <code>aws</code>, <code>gcp</code>, <code>azure</code>.</td>
    </tr>
    <tr>
      <td><code>platform</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@iac_resource.platform</code><br>Indicates which IaC (Infrastructure as Code) platform the vulnerability was found on (for example, <code>terraform</code>, <code>kubernetes</code>). Possible values: <code>cicd</code>, <code>terraform</code>, <code>kubernetes</code>, <code>cloudformation</code>.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="K8S" level="h3" id="k8s" %}}

Contains Kubernetes fields for findings generated against Kubernetes resources.

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

{{% collapse-content title="Host" level="h3" id="host" %}}

Contains host information.

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
      <td><strong>Path:</strong> <code>@host.name</code><br>Host name.</td>
    </tr>
    <tr>
      <td><code>key</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@host.key</code><br>Canonical Cloud Resource Identifier (CCRID).</td>
    </tr>
    <tr>
      <td><code>cloud_provider</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@host.cloud_provider</code><br>Cloud provider the host belongs to. Possible values: <code>aws</code>, <code>azure</code>, <code>gcp</code>, <code>oci</code>.</td>
    </tr>
    <tr>
      <td><code>image</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@host.image</code><br>Name of the host image used to build the host (for example, <code>ami-1234</code>).</td>
    </tr>
    <tr>
      <td><code>os</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@host.os</code><br>Groups attributes of the operating system running on the host.</td>
    </tr>
  </tbody>
</table>

### Os

Groups attributes of the operating system running on the host.

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

{{% collapse-content title="Service" level="h3" id="service" %}}

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
      <td><strong>Path:</strong> <code>@service.name</code><br>Name of the service where this finding was detected.</td>
    </tr>
    <tr>
      <td><code>git_commit_sha</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@service.git_commit_sha</code><br>Git commit SHA of the latest commit where this finding was detected for the service. Available only when Source Code Integration is configured.</td>
    </tr>
    <tr>
      <td><code>git_repository_url</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@service.git_repository_url</code><br>URL of the Git repository for the service associated with this finding. Available only when Source Code Integration is configured.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Container Image" level="h3" id="container-image" %}}

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
      <td><code>registries</code></td>
      <td>array (string)</td>
      <td><strong>Path:</strong> <code>@container_image.registries</code><br>Indicates the container registry where the image is stored or from which it was pulled.</td>
    </tr>
    <tr>
      <td><code>repository</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@container_image.repository</code><br>Repository of the container image.</td>
    </tr>
    <tr>
      <td><code>repo_digests</code></td>
      <td>array (string)</td>
      <td><strong>Path:</strong> <code>@container_image.repo_digests</code><br>Repository digests of the container image where this finding was detected.</td>
    </tr>
    <tr>
      <td><code>git_repository_url</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@container_image.git_repository_url</code><br>URL of the Git repository for the code used to build the container image. Available only when Source Code Integration is configured.</td>
    </tr>
    <tr>
      <td><code>oses</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@container_image.oses</code><br>Operating systems associated with the container image.</td>
    </tr>
    <tr>
      <td><code>architectures</code></td>
      <td>array (string)</td>
      <td><strong>Path:</strong> <code>@container_image.architectures</code><br>Architectures associated with the container image.</td>
    </tr>
    <tr>
      <td><code>image_layer_digests</code></td>
      <td>array (string)</td>
      <td><strong>Path:</strong> <code>@container_image.image_layer_digests</code></td>
    </tr>
    <tr>
      <td><code>image_layer_diff_ids</code></td>
      <td>array (string)</td>
      <td><strong>Path:</strong> <code>@container_image.image_layer_diff_ids</code></td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@container_image.name</code><br>Full name of the container image.</td>
    </tr>
    <tr>
      <td><code>tags</code></td>
      <td>array (string)</td>
      <td><strong>Path:</strong> <code>@container_image.tags</code><br>Tag part of the container image name (for example, <code>latest</code> or <code>1.2.3</code>).</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Git" level="h3" id="git" %}}

Contains Git metadata linking a finding to source code context. Includes information about the repository, branch, commit, author, and committer.

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
      <td>string</td>
      <td><strong>Path:</strong> <code>@git.repository_visibility</code><br>Indicates the visibility of the repository. Valid values: <code>public</code>, <code>private</code>, <code>not_detected</code>.</td>
    </tr>
    <tr>
      <td><code>branch</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@git.branch</code><br>Name of the Git branch related to the finding.</td>
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
      <td><code>sha</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@git.sha</code><br>Git commit identifier (SHA).</td>
    </tr>
    <tr>
      <td><code>author</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@git.author</code><br>Contains details about the author of the commit.</td>
    </tr>
    <tr>
      <td><code>committer</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@git.committer</code><br>Contains details about the committer.</td>
    </tr>
    <tr>
      <td><code>codeowners</code></td>
      <td>array (string)</td>
      <td><strong>Path:</strong> <code>@git.codeowners</code><br>Includes code owner teams extracted from the SCM (Source Control Management) provider's CODEOWNERS file (for example, GitHub).</td>
    </tr>
  </tbody>
</table>

### Author

Contains details about the author of the commit.

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
      <td><strong>Path:</strong> <code>@git.author.name</code><br>Name of the commit author.</td>
    </tr>
    <tr>
      <td><code>email</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@git.author.email</code><br>Email address of the commit author.</td>
    </tr>
    <tr>
      <td><code>authored_at</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@git.author.authored_at</code><br>Timestamp in milliseconds (UTC) when the original changes were made.</td>
    </tr>
  </tbody>
</table>

### Committer

Contains details about the committer.

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
      <td><strong>Path:</strong> <code>@git.committer.name</code><br>Name of the committer.</td>
    </tr>
    <tr>
      <td><code>email</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@git.committer.email</code><br>Email address of the committer.</td>
    </tr>
    <tr>
      <td><code>committed_at</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@git.committer.committed_at</code><br>Timestamp in milliseconds (UTC) when the changes were last significantly modified (for example, during a rebase or amend operation).</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Code Location" level="h3" id="code-location" %}}

Groups attributes pinpointing the specific file and line numbers where the finding is located.

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
      <td><code>filename</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@code_location.filename</code><br>Name of the file where the root parent package version is declared.</td>
    </tr>
    <tr>
      <td><code>line_start</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@code_location.line_start</code><br>Line number where the root parent package version declaration starts in the file.</td>
    </tr>
    <tr>
      <td><code>column_start</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@code_location.column_start</code><br>Column position where the root parent package version declaration starts on the line.</td>
    </tr>
    <tr>
      <td><code>line_end</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@code_location.line_end</code><br>Line number where the root parent package version declaration ends in the file.</td>
    </tr>
    <tr>
      <td><code>column_end</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@code_location.column_end</code><br>Column position where the root parent package version declaration ends on the line.</td>
    </tr>
    <tr>
      <td><code>is_test_file</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@code_location.is_test_file</code><br>True if the code file is a test file; false otherwise.</td>
    </tr>
    <tr>
      <td><code>url</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@code_location.url</code><br>URL to view the file online (for example, in GitHub), highlighting the code location.</td>
    </tr>
    <tr>
      <td><code>symbol</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@code_location.symbol</code></td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Package" level="h3" id="package" %}}

Contains package manager information. A package manager automates the installation, upgrading, configuration, and removal of software packages.

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
      <td><strong>Path:</strong> <code>@package.name</code><br>Name of the package or library where the vulnerability was identified.</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@package.version</code><br>Version of the package or library where the vulnerability was identified.</td>
    </tr>
    <tr>
      <td><code>additional_names</code></td>
      <td>array (string)</td>
      <td><strong>Path:</strong> <code>@package.additional_names</code><br>List of affected package names when a cloud vulnerability impacts multiple packages derived from the same source package.</td>
    </tr>
    <tr>
      <td><code>normalized_name</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@package.normalized_name</code><br>Normalized name according to the ecosystem of the package or library where the vulnerability was identified.</td>
    </tr>
    <tr>
      <td><code>manager</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@package.manager</code><br>Indicates the package management ecosystem or source registry from which the vulnerable component originates. Possible values: <code>maven</code>, <code>gradle</code>, <code>npm</code>, <code>yarn</code>, <code>pnpm</code>, <code>requirements</code>, <code>pipfile</code>, <code>pdm</code>, <code>poetry</code>, <code>nuget</code>, <code>bundler</code>, <code>golang</code>, <code>composer</code>, <code>crates</code>, <code>conan</code>, <code>hex</code>, <code>pub</code>, <code>renv</code>, <code>uv</code>, <code>unknown</code>.</td>
    </tr>
    <tr>
      <td><code>dependency_type</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@package.dependency_type</code><br>Indicates whether this package is a direct dependency, transitive dependency, or not supported if the information cannot be retrieved. Possible values: <code>direct</code>, <code>transitive</code>, <code>not_supported</code>.</td>
    </tr>
    <tr>
      <td><code>loading_type</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@package.loading_type</code><br>Indicates if the component is always loaded and running (<code>hot</code>), running infrequently (<code>cold</code>), or loaded on demand (<code>lazy</code>). Possible values: <code>hot</code>, <code>cold</code>, <code>lazy</code>.</td>
    </tr>
    <tr>
      <td><code>dependency_location_text</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@package.dependency_location_text</code></td>
    </tr>
    <tr>
      <td><code>declaration</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@package.declaration</code><br>Contains code locations of the package definition.</td>
    </tr>
    <tr>
      <td><code>scope</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@package.scope</code><br>Indicates the intended usage scope of the package (<code>production</code> or <code>development</code>). Possible values: <code>production</code>, <code>development</code>.</td>
    </tr>
    <tr>
      <td><code>root_parents</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@package.root_parents</code><br>Contains a list of the dependencies for which this package is a transitive dependency.</td>
    </tr>
  </tbody>
</table>

### Declaration

Contains code locations of the package definition.

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
      <td><strong>Path:</strong> <code>@package.declaration.block</code><br>Contains the location of the code that declares the whole dependency declaration.</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@package.declaration.name</code><br>Contains the location of the code that declares the dependency name.</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@package.declaration.version</code><br>Version declared for the root parent.</td>
    </tr>
  </tbody>
</table>

#### Block

Contains the location of the code that declares the whole dependency declaration.

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
      <td><code>filename</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@package.declaration.block.filename</code><br>Name of the file where the root parent package version is declared.</td>
    </tr>
    <tr>
      <td><code>line_start</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@package.declaration.block.line_start</code><br>Line number where the root parent package version declaration starts in the file.</td>
    </tr>
    <tr>
      <td><code>column_start</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@package.declaration.block.column_start</code><br>Column position where the root parent package version declaration starts on the line.</td>
    </tr>
    <tr>
      <td><code>line_end</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@package.declaration.block.line_end</code><br>Line number where the root parent package version declaration ends in the file.</td>
    </tr>
    <tr>
      <td><code>column_end</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@package.declaration.block.column_end</code><br>Column position where the root parent package version declaration ends on the line.</td>
    </tr>
    <tr>
      <td><code>is_test_file</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@package.declaration.block.is_test_file</code><br>True if the code file is a test file; false otherwise.</td>
    </tr>
    <tr>
      <td><code>url</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@package.declaration.block.url</code><br>URL to view the file online (for example, in GitHub), highlighting the code location.</td>
    </tr>
    <tr>
      <td><code>symbol</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@package.declaration.block.symbol</code></td>
    </tr>
  </tbody>
</table>

#### Name

Contains the location of the code that declares the dependency name.

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
      <td><code>filename</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@package.declaration.name.filename</code><br>Name of the file where the root parent package version is declared.</td>
    </tr>
    <tr>
      <td><code>line_start</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@package.declaration.name.line_start</code><br>Line number where the root parent package version declaration starts in the file.</td>
    </tr>
    <tr>
      <td><code>column_start</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@package.declaration.name.column_start</code><br>Column position where the root parent package version declaration starts on the line.</td>
    </tr>
    <tr>
      <td><code>line_end</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@package.declaration.name.line_end</code><br>Line number where the root parent package version declaration ends in the file.</td>
    </tr>
    <tr>
      <td><code>column_end</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@package.declaration.name.column_end</code><br>Column position where the root parent package version declaration ends on the line.</td>
    </tr>
    <tr>
      <td><code>is_test_file</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@package.declaration.name.is_test_file</code><br>True if the code file is a test file; false otherwise.</td>
    </tr>
    <tr>
      <td><code>url</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@package.declaration.name.url</code><br>URL to view the file online (for example, in GitHub), highlighting the code location.</td>
    </tr>
    <tr>
      <td><code>symbol</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@package.declaration.name.symbol</code></td>
    </tr>
  </tbody>
</table>

#### Version

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
      <td><code>filename</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@package.declaration.version.filename</code><br>Name of the file where the root parent package version is declared.</td>
    </tr>
    <tr>
      <td><code>line_start</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@package.declaration.version.line_start</code><br>Line number where the root parent package version declaration starts in the file.</td>
    </tr>
    <tr>
      <td><code>column_start</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@package.declaration.version.column_start</code><br>Column position where the root parent package version declaration starts on the line.</td>
    </tr>
    <tr>
      <td><code>line_end</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@package.declaration.version.line_end</code><br>Line number where the root parent package version declaration ends in the file.</td>
    </tr>
    <tr>
      <td><code>column_end</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@package.declaration.version.column_end</code><br>Column position where the root parent package version declaration ends on the line.</td>
    </tr>
    <tr>
      <td><code>is_test_file</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@package.declaration.version.is_test_file</code><br>True if the code file is a test file; false otherwise.</td>
    </tr>
    <tr>
      <td><code>url</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@package.declaration.version.url</code><br>URL to view the file online (for example, in GitHub), highlighting the code location.</td>
    </tr>
    <tr>
      <td><code>symbol</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@package.declaration.version.symbol</code></td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Secret" level="h3" id="secret" %}}

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
      <td>string</td>
      <td><strong>Path:</strong> <code>@secret.validation_status</code><br>Result of attempting to validate if the secret is active. Possible values: <code>valid</code>, <code>invalid</code>, <code>not_validated</code>, <code>validation_error</code>, <code>not_available</code>.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Api Endpoint" level="h3" id="api-endpoint" %}}

Contains the HTTP endpoint representation.

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
      <td><code>operation_name</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@api_endpoint.operation_name</code><br>Name of the entry point into a service (for example, <code>http.request</code>, <code>grpc.server</code>).</td>
    </tr>
    <tr>
      <td><code>path</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@api_endpoint.path</code><br>Relative path of the endpoint.</td>
    </tr>
    <tr>
      <td><code>method</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@api_endpoint.method</code><br>Method of the endpoint (HTTP verb or gRPC method).</td>
    </tr>
    <tr>
      <td><code>resource_name</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@api_endpoint.resource_name</code><br>Internal identification of the endpoint in the format <code>{method} {path}</code>.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

## Tags

Key-value metadata in the format `name:value`. Enables flexible filtering and grouping of findings. Must include at least `source` and `origin`.



## Further reading

{{< partial name="whats-next/whats-next.html" >}}
