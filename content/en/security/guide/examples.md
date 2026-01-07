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
    "id": "DD-UNMAINT#GITHUB.COM/EXAMPLE/DEPRECATED-LIB",
    "modified_at": 1765995600000,
    "published_at": 1709251200000,
    "summary": "Archived repository for github.com/example/deprecated-lib",
    "type": "unmaintained"
  },
  "base_severity": "low",
  "container_image": {
    "architectures": [
      "amd64"
    ],
    "image_layer_diff_ids": [
      "sha256:abc123def456789012345678901234567890abcdef12345678901234567890ab",
      "sha256:def456abc789012345678901234567890abcdef12345678901234567890abcd"
    ],
    "image_layer_digests": [
      "sha256:def456abc789012345678901234567890abcdef12345678901234567890abcd"
    ],
    "name": "docker.io/example-org/web-server",
    "oses": [
      {
        "name": "ubuntu",
        "version": "23.04"
      }
    ],
    "registries": [
      "docker.io"
    ],
    "repo_digests": [
      "sha256:abc123def456789012345678901234567890abcdef123456789012345678abcd"
    ],
    "repository": "example-org/web-server"
  },
  "detection_changed_at": 1766095204457,
  "exposure_time_seconds": 25482896,
  "finding_id": "ZXhhbXBsZS1ob3N0LWNvbnRhaW5lci12dWxuLTEyMzQ1Ng==",
  "finding_type": "host_and_container_vulnerability",
  "first_seen_at": 1740514410349,
  "is_in_security_inbox": false,
  "last_seen_at": 1766095204457,
  "metadata": {
    "schema_version": "2"
  },
  "origin": [
    "agentless-scanner"
  ],
  "package": {
    "additional_names": [
      "github.com/example/deprecated-lib"
    ],
    "name": "github.com/example/deprecated-lib",
    "normalized_name": "github.com/example/deprecated-lib",
    "version": "v0.5.11"
  },
  "remediation": {
    "description": "Update 1 image to docker.io/example-org/web-server:2.0.0",
    "is_available": true
  },
  "resource_id": "abc123def456789012345678901234ab",
  "resource_name": "docker.io/example-org/web-server",
  "resource_type": "image",
  "risk": {
    "is_production": true
  },
  "risk_details": {
    "is_production": {
      "impact_cvss": "neutral",
      "value": true
    }
  },
  "severity": "low",
  "severity_details": {
    "adjusted": {
      "score": 2.7,
      "value": "low",
      "value_id": 1,
      "vector": "CVSS:3.1/AV:P/AC:H/PR:H/UI:R/S:U/C:N/I:L/A:L/E:X/RL:X/RC:X/CR:X/IR:X/AR:X/MAV:X/MAC:X/MPR:X/MUI:X/MS:X/MC:X/MI:X/MA:X"
    },
    "base": {
      "score": 2.7,
      "value": "low",
      "value_id": 1,
      "vector": "CVSS:3.0/AV:P/AC:H/PR:H/UI:R/S:U/C:N/I:L/A:L"
    }
  },
  "status": "auto_closed",
  "tags": [
    "env:dev",
    "origin:agentless-scanner",
    "scored:false",
    "short_name:web-server",
    "os_name:ubuntu",
    "dd_rule_type:not-empty",
    "registry:docker.io",
    "source:datadog",
    "arch:amd64"
  ],
  "title": "Archived repository for github.com/example/deprecated-lib",
  "vulnerability": {
    "hash": "abc123def456789012345678901234567890abcdef12345678901234567890ab",
    "stack": {
      "ecosystem": "go",
      "language": "go"
    }
  },
  "workflow": {
    "auto_closed_at": 1766095204430,
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
    "id": "DD-UNMAINT#GITHUB.COM/EXAMPLE/DEPRECATED-LIB",
    "type": "unmaintained"
  },
  "base_severity": "low",
  "detection_changed_at": 1766095094192,
  "finding_id": "ZXhhbXBsZS1saWJyYXJ5LXZ1bG4tMTIzNDU2",
  "finding_type": "library_vulnerability",
  "first_seen_at": 1747434028807,
  "git": {
    "repository_id": "github.com/example-org/web-app",
    "repository_url": "github.com/example-org/web-app"
  },
  "is_in_security_inbox": false,
  "last_seen_at": 1766095094192,
  "metadata": {
    "schema_version": "2"
  },
  "origin": [
    "apm"
  ],
  "package": {
    "dependency_type": "transitive",
    "loading_type": "hot",
    "name": "github.com/example/deprecated-date-lib",
    "normalized_name": "github.com/example/deprecated-date-lib",
    "root_parents": [
      {
        "language": "go",
        "name": "github.com/example/auth-lib",
        "version": "0.9.24"
      }
    ],
    "scope": "production",
    "version": "0.3.0"
  },
  "remediation": {
    "description": "Avoid the usage of this package, find an equivalent one instead",
    "is_available": false,
    "package": {
      "base": [
        {
          "name": "github.com/example/deprecated-date-lib",
          "version": "Avoid the usage of this package, find an equivalent one instead"
        }
      ]
    }
  },
  "resource_id": "abc123def456789012345678901234ab",
  "resource_name": "orders-service",
  "resource_type": "service",
  "risk": {
    "has_high_exploitability_chance": true,
    "is_exposed_to_attacks": false,
    "is_production": true
  },
  "risk_details": {
    "has_exploit_available": {
      "impact_cvss": "neutral"
    },
    "has_high_exploitability_chance": {
      "impact_cvss": "neutral",
      "value": true
    },
    "is_exposed_to_attacks": {
      "impact_cvss": "neutral",
      "value": false
    },
    "is_production": {
      "impact_cvss": "neutral",
      "value": true
    }
  },
  "service": {
    "git_repository_url": "github.com/example-org/web-app",
    "name": "orders-service"
  },
  "severity": "low",
  "severity_details": {
    "adjusted": {
      "score": 2.7,
      "value": "low",
      "value_id": 1,
      "vector": "CVSS:3.1/AV:P/AC:H/PR:H/UI:R/S:U/C:N/I:L/A:L/E:X/RL:X/RC:X/CR:X/IR:X/AR:X/MAV:X/MAC:X/MPR:X/MUI:X/MS:X/MC:X/MI:X/MA:X"
    },
    "base": {
      "score": 2.7,
      "value": "low",
      "value_id": 1,
      "vector": "CVSS:3.0/AV:P/AC:H/PR:H/UI:R/S:U/C:N/I:L/A:L"
    }
  },
  "status": "open",
  "tags": [
    "service:orders-service",
    "dd_rule_type:not-empty",
    "env:prod",
    "scored:false",
    "source:datadog",
    "team:backend",
    "origin:apm"
  ],
  "title": "Archived repository for github.com/example/deprecated-date-lib",
  "vulnerability": {
    "hash": "abc123def456789012345678901234567890abcdef12345678901234567890ab",
    "stack": {
      "ecosystem": "go",
      "language": "go"
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
