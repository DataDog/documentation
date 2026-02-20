---
description: Referencia completa del esquema de hallazgos de seguridad, que incluye
  todos los atributos, espacios de nombres y modelo de datos para la consulta de vulnerabilidades,
  configuraciones erróneas y riesgos de seguridad.
disable_toc: true
further_reading:
- link: /security/cloud_security_management/
  tag: Documentación
  text: Cloud Security Management
- link: /security/code_security/
  tag: Documentación
  text: Code Security
- link: /security/application_security/
  tag: Documentación
  text: Application Security
title: Referencia del esquema de hallazgos de seguridad
---

## Información general

Los hallazgos de seguridad en Datadog representan vulnerabilidades, configuraciones erróneas y riesgos de seguridad identificados en toda tu infraestructura y en tus aplicaciones. Cada hallazgo contiene datos estructurados organizados en espacios de nombres que describen la naturaleza, el impacto, el estado y el contexto del problema de seguridad.

Todos los resultados comparten un esquema que permite la consulta y el análisis unificados de los distintos productos de seguridad.

{{< learning-center-callout header="" btn_title="Obtener más información" btn_url="/security/guide/security-findings-migration/" hide_image="true" >}}
  Obtén más información sobre la migración a este nuevo esquema para evitar interrupciones en tus flujos de trabajo.
{{< /learning-center-callout >}}

## Ejemplos

Existen once categorías diferentes de hallazgos de seguridad. Haz clic en una categoría para ver un ejemplo de hallazgo de seguridad perteneciente a esa categoría.
{{< tabs >}}
{{% tab "Segiridad de la API" %}}

```json
{
  "api_endpoint": {
    "method": "GET",
    "operation_name": "aspnet_core.request",
    "path": "/swagger/v1/swagger.json",
    "resource_name": "GET /swagger/v1/swagger.json"
  },
  "description": "Este endpoint de API expuesto públicamente no implementa la cabecera X-Frame-Options. Esta cabecera permite controlar si un navegador puede mostrar la respuesta en un marco, iframe, incrustación u objeto. Sin esta cabecera, la respuesta de la API podría ser vulnerable a ataques de clickjacking. Solución: Implementar la cabecera X-Frame-Options en todas las respuestas de la API con los valores adecuados. Ejemplo de valores de cabecera: Utiliza DENY para impedir que cualquier dominio apunte al contenido (X-Frame-Options: DENY), o utiliza SAMEORIGIN para permitir que solo apunte a él el mismo sitio (X-Frame-Options: SAMEORIGIN).",
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
    "name": "Cabecera HTTP X-Frame-Options ausente",
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
  "title": "Cabecera HTTP X-Frame-Options ausente",
  "workflow": {
    "mute": {
      "is_muted": false
    }
  }
}
```

{{% /tab %}}
{{% tab "Ruta de ataque" %}}

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
            "title": "Vulnerabilidad Race Condition Time-of-check Time-of-use (TOCTOU) de Apache Tomcat ",
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
  "description": "Las vulnerabilidades no parcheadas en aplicaciones de acceso público pueden aumentar la probabilidad de exponer debilidades, creando un punto de entrada para que los atacantes obtengan acceso no autorizado al pod o contenedor. Conceder capacidades excesivas a un pod o contenedor puede conducir a un movimiento lateral no intencionado a otros contenedores o a los recursos del nodo subyacente. Solución: 1. Revisa cualquier referencia o aviso de vulnerabilidad asociado. 2. Aplica el parche adecuado según las directrices de corrección. Si no hay ningún parche disponible, aplica controles compensatorios como desactivar o eliminar el componente vulnerable. 3. Revisa las configuraciones de contextos de seguridad de tu pod o contenedor Kubernetes para asegurarte de que proporcionan los límites de aislamiento adecuados. Las posibles mitigaciones incluyen el uso de políticas de seguridad de pods de Kubernetes, SELinux, AppArmor o filtros Seccomp",
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
    "name": "Aplicación accesible al público con una vulnerabilidad crítica en un contenedor con privilegios elevados",
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
  "title": "Aplicación accesible al público con una vulnerabilidad crítica en un contenedor con privilegios elevados",
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
{{% tab "Vulnerabilidad de código en tiempo de ejecución" %}}

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
    "name": "Aleatoriedad de debilidades",
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
  "title": "Aleatoriedad de debilidades",
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
{{% tab "Vulnerabilidad de código estático" %}}

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
    "name": "No registrar información confidencial",
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
  "title": "No registrar información confidencial,
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
{{% tab "Vulnerabilidad de hosts y contenedores" %}}

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
  "title": "CVE-2023-26242 encontrado en linux-tools-common 5.15.0-161.171",
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
{{% tab "Configuración errónea IaC" %}}

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
  "description": "Como práctica recomendada, asegúrate de que los espacios de nombres se utilizan correctamente para agrupar y administrar recursos. Los mecanismos de autorización Kubernetes, como RBAC, pueden aplicar políticas que segreguen o restrinjan el acceso de los usuarios a los espacios de nombres. Esta regla analiza los manifiestos del clúster en busca de recursos que especifiquen un espacio de nombres y agrega los espacios de nombres en uso, informándolos para su revisión. Revisa los espacios de nombres informados para confirmar que son necesarios, están configurados correctamente y se rigen por controles de acceso adecuados (por ejemplo, RoleBindings, NetworkPolicies o controladores de admisión). ID de regla: [e84eaf4d-2f45-47b2-abe8-e581b06deb66]",
  "detection_changed_at": 1765825694643,
  "detection_tool": {
    "name": "Análisis IaC en Datadog",
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
    "name": "Asegurarse de que haya límites administrativos entre recursos",
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
  "title": "Espacios de nombre en uso: predeterminado, staging, producción",
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
{{% tab "Riesgo de identidad" %}}

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
  "description": "Esta regla identifica cuándo una Azure Function tiene permisos de nivel administrativo en el contexto de la suscripción. Las asignaciones de roles administrativos de Azure en el contexto de la suscripción conceden amplios privilegios que pueden afectar a todos los recursos de la suscripción. Este amplio acceso aumenta el riesgo de cambios accidentales o malintencionados. Solución: Datadog recomienda reducir los permisos y el contexto de una asignación de funciones al mínimo necesario. Siempre que sea posible, asigna funciones a nivel de grupo de recursos o de recurso individual, y utiliza funciones integradas con privilegios limitados adaptados a los requisitos operativos.",
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
    "name": "La función de Azure tiene privilegios de nivel administrativo en el contexto de la suscripción",
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
  "title": "La función de Azure tiene privilegios de nivel administrativo en el contexto de la suscripción",
  "workflow": {
    "mute": {
      "is_muted": false
    }
  }
}
```

{{% /tab %}}
{{% tab "Vulnerabilidad de la biblioteca" %}}

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
  "title": "Consumo de recursos descontrolado durante la configuración de Apache Commons",
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
{{% tab "Configuración errónea" %}}

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
  "description": "Compartir espacios de nombres de host en Kubernetes plantea riesgos de seguridad al permitir que los pods accedan a espacios de nombres de red, procesos e IPC del host. Para mejorar la seguridad del clúster, no se debe permitir compartir espacios de nombres de host. Solución: 1. Comprueba las especificaciones de tu pod para las configuraciones `hostNetwork`, `hostPID` y `hostIPC`. 2. Asegúrate de que estos campos se configuran como `false` o se eliminan. 3. Aplica los cambios con `kubectl apply -f <manifest-file>`. 4. Comprueba que los pods no comparten espacios de nombres de host",
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
    "name": "Los trabajos no deben compartir el espacio de nombres del host",
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
  "title": "Los trabajos no deben compartir el espacio de nombres del host",
  "workflow": {
    "mute": {
      "is_muted": false
    }
  }
}
```

{{% /tab %}}
{{% tab "Secreto" %}}

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
    "description": "Empareja una secuencia de caracteres que representa un ID de clave de acceso de AWS, que consta de 4 letras mayúsculas que indican el tipo de recurso al que se aplica el ID, seguidas de 16 caracteres alfanuméricos.\n\nEjemplos de formatos de coincidencia:\n- `AIDAJQABLZS4A3QDU576`\n- `AROADBQP57FF2EXAMPLE`",
    "is_available": false
  },
  "resource_id": "abc123def456789012345678901234ab",
  "resource_name": "github.com/example-org/backend-api",
  "resource_type": "repository",
  "rule": {
    "id": "secrets/aws-access-key-id",
    "name": "Analizador de ID de claves de acceso de AWS",
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
  "title": "Analizador de ID de claves de acceso de AWS",
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
{{% tab "Actividad de la carga de trabajo" %}}

```json
{
  "description": "Los compiladores no deben estar presentes ni ejecutarse en contenedores de producción. Las imágenes de contenedor deben crearse con binarios pre-compilados y seguir principios de infraestructura inmutable.",
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
    "name": "Los contenedores no deben ejecutar compiladores",
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
  "title": "Los contenedores no deben ejecutar compiladores",
  "workflow": {
    "mute": {
      "is_muted": false
    }
  }
}
```

{{% /tab %}}
{{< /tabs >}}

## Referencia del esquema

Las siguientes secciones describen todos los atributos disponibles en el esquema de los hallazgos de seguridad, organizados por espacio de nombres.



{{% collapse-content title="Atributos principales" level="h3" id="core-attributes" %}}

Estos atributos están presentes en todos los hallazgos de seguridad y describen la naturaleza fundamental y el estado del hallazgo.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>severity</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@severity</code><br>Nivel de gravedad del hallazgo ajustado por Datadog. Valores válidos: <code>critical</code>, <code>high</code>, <code>medium</code>, <code>low</code>, <code>info</code>, <code>none</code>, <code>unknown</code>.</td>
    </tr>
    <tr>
      <td><code>base_severity</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@base_severity</code><br>Nivel de gravedad básico del hallazgo antes de cualquier ajuste. Valores válidos: <code>critical</code>, <code>high</code>, <code>medium</code>, <code>low</code>, <code>info</code>, <code>none</code>, <code>unknown</code>.</td>
    </tr>
    <tr>
      <td><code>status</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@status</code><br>Estado del flujo de trabajo del hallazgo. Valores válidos: <code>open</code>, <code>muted</code>, <code>auto_closed</code>.</td>
    </tr>
    <tr>
      <td><code>finding_type</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@finding_type</code><br>Categoría del hallazgo. Valores válidos: <code>api_security</code>, <code>attack_path</code>, <code>runtime_code_vulnerability</code>, <code>static_code_vulnerability</code>, <code>host_and_container_vulnerability</code>, <code>iac_misconfiguration</code>, <code>identity_risk</code>, <code>library_vulnerability</code>, <code>misconfiguration</code>, <code>secret</code>, <code>workload_activity</code>.</td>
    </tr>
    <tr>
      <td><code>finding_id</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@finding_id</code><br>Identificador único del hallazgo.</td>
    </tr>
    <tr>
      <td><code>title</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@title</code><br>Título legible del hallazgo.</td>
    </tr>
    <tr>
      <td><code>description</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@description</code><br>Explicación legible del hallazgo. Puede incluir el formato Markdown.</td>
    </tr>
    <tr>
      <td><code>resource_id</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@resource_id</code><br>Identificador único del recurso afectado por e hallazgo.</td>
    </tr>
    <tr>
      <td><code>resource_name</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@resource_name</code><br>Nombre legible del recurso afectado por el hallazgo.</td>
    </tr>
    <tr>
      <td><code>resource_type</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@resource_type</code><br>Tipo de recurso.</td>
    </tr>
    <tr>
      <td><code>first_seen_at</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@first_seen_at</code><br>Marca de tiempo en milisegundos (UTC) de la primera detección del hallazgo.</td>
    </tr>
    <tr>
      <td><code>last_seen_at</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@last_seen_at</code><br>Marca de tiempo en milisegundos (UTC) de la detección más reciente del hallazgo</td>
    </tr>
    <tr>
      <td><code>detection_changed_at</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@detection_changed_at</code><br>Marca de tiempo en milisegundos (UTC) del último cambio de estado de la evaluación o detección del hallazgo</td>
    </tr>
    <tr>
      <td><code>origin</code></td>
      <td>array (string)</td>
      <td><strong>Path:</strong> <code>@origin</code><br>Orígenes de la detección que produjo el hallazgo, como los análisis sin agente, APM, SCI (Software Composition Analysis) o CI (Continuous Integration).</td>
    </tr>
    <tr>
      <td><code>exposure_time_seconds</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@exposure_time_seconds</code><br>Indica el tiempo transcurrido en segundos entre el último cierre del hallazgo y una nueva detección de este.</td>
    </tr>
    <tr>
      <td><code>is_in_security_inbox</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@is_in_security_inbox</code><br>Es true si el hallazgo aparece en la bandeja de entrada de Seguridad, de lo contrario es false.</td>
    </tr>
    <tr>
      <td><code>detection_tool</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@detection_tool</code><br>Información de la herramienta o del motor responsables de la detección del hallazgo.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Flujo de trabajo" level="h3" id="workflow" %}}
 

Toda la información silenciable relacionada con la gestión de un hallazgo tras su detección. Incluye campos que pueden actualizarse manualmente a través de la interfaz de usuario o automáticamente mediante pipelines.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>triage</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@workflow.triage</code><br>Información sobre asignación y estado. La asignación puede estar sincronizada con información de Case o de Jira.</td>
    </tr>
    <tr>
      <td><code>auto_closed_at</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@workflow.auto_closed_at</code><br>Marca de tiempo en milisegundos (UTC) del cierre automático del hallazgo por parte del sistema.</td>
    </tr>
    <tr>
      <td><code>due_date</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@workflow.due_date</code><br>Regla de la fecha límite aplicada al hallazgo.</td>
    </tr>
    <tr>
      <td><code>mute</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@workflow.mute</code><br>Información sobre silenciamiento y metadatos.</td>
    </tr>
    <tr>
      <td><code>automations</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@workflow.automations</code><br>Información sobre cualquier regla de automatización que sea aplicable al hallazgo.</td>
    </tr>
    <tr>
      <td><code>integrations</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@workflow.integrations</code><br>Integraciones como Jira, Case Management o ServiceNow utilizadas para clasificar y corregir el hallazgo.</td>
    </tr>
  </tbody>
</table>

### Clasificación

Información sobre asignación y estado. La asignación puede estar sincronizada con información de Case o de Jira.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>assignee</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@workflow.triage.assignee</code><br>Usuario asignado a este hallazgo.</td>
    </tr>
    <tr>
      <td><code>time_to_acknowledge_seconds</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@workflow.triage.time_to_acknowledge_seconds</code><br>Tiempo en segundos entre la primera detección del hallazgo y la primera acción de clasificación manual.</td>
    </tr>
    <tr>
      <td><code>time_to_resolution_seconds</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@workflow.triage.time_to_resolution_seconds</code><br>Tiempo en segundos entre la primera detección del hallazgo y su resolución.</td>
    </tr>
  </tbody>
</table>

#### Asignatario

Usuario asignado a este hallazgo.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>name</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@workflow.triage.assignee.name</code><br>Mostrar el nombre del asignatario.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@workflow.triage.assignee.id</code><br>Identificador único en formato UUID del asignatario.</td>
    </tr>
    <tr>
      <td><code>updated_at</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@workflow.triage.assignee.updated_at</code><br>Marca de tiempo en milisegundos (UTC) de la última modificación del asignatario.</td>
    </tr>
    <tr>
      <td><code>updated_by</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@workflow.triage.assignee.updated_by</code><br>Usuario que modificó el asignatario por última vez.</td>
    </tr>
  </tbody>
</table>

##### Actualizado por

Usuario que modificó el asignatario por última vez.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>id</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@workflow.triage.assignee.updated_by.id</code><br>Identificador único en formato UUID del usuario que modificó el asignatario por última vez.</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@workflow.triage.assignee.updated_by.name</code><br>Mostrar el nombre del usuario que modificó el asignatario por última vez</td>
    </tr>
  </tbody>
</table>

### Fecha límite

Regla de la fecha límite aplicada al hallazgo.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>due_at</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@workflow.due_date.due_at</code><br>Marca de tiempo en milisegundos (UTC) de la fecha límite del hallazgo.</td>
    </tr>
    <tr>
      <td><code>is_overdue</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@workflow.due_date.is_overdue</code><br>Es true si se alcanzó la fecha límite, de lo contrario es false.</td>
    </tr>
    <tr>
      <td><code>rule_id</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@workflow.due_date.rule_id</code><br>Identificador único de la regla de la fecha límite aplicada a este hallazgo.</td>
    </tr>
  </tbody>
</table>

### Silenciar

Silenciar información y metadatos.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>is_muted</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@workflow.mute.is_muted</code><br>Es true si el hallazgo está silenciado, y es false es si está activo.</td>
    </tr>
    <tr>
      <td><code>reason</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@workflow.mute.reason</code><br>Motivo para silenciar el hallazgo proporcionado. Valores válidos: <code>none</code>, <code>no_pending_fix</code>, <code>human_error</code>, <code>no_longer_accepted_risk</code>, <code>other</code>, <code>pending_fix</code>, <code>false_positive</code>, <code>accepted_risk</code>, <code>no_fix</code>, <code>duplicate</code>, <code>risk_accepted</code>.</td>
    </tr>
    <tr>
      <td><code>description</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@workflow.mute.description</code><br>Explicación en texto libre de por qué se silenció el hallazgo.</td>
    </tr>
    <tr>
      <td><code>expire_at</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@workflow.mute.expire_at</code><br>Marca de tiempo en milisegundos (UTC) del momento en que termina el silenciamiento. Si no se configura, se silencian de forma permanente.</td>
    </tr>
    <tr>
      <td><code>is_muted_by_rule</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@workflow.mute.is_muted_by_rule</code><br>Es true si el hallazgo es silenciado por una regla de automatización, de lo contrario es false. Si es true, la regla de automatización relevante se presenta en la sección de reglas de automatización.</td>
    </tr>
    <tr>
      <td><code>rule_id</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@workflow.mute.rule_id</code><br>Identificador único de la regla de automatización que silenció este hallazgo. Solo se configura si <code>is_muted_by_rule</code> es true.</td>
    </tr>
    <tr>
      <td><code>rule_name</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@workflow.mute.rule_name</code><br>Nombre legible de la regla de automatización que silenció este hallazgo. Solo se configura si <code>is_muted_by_rule</code> es true.</td>
    </tr>
    <tr>
      <td><code>muted_at</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@workflow.mute.muted_at</code><br>Marca de tiempo en milisegundos (UTC) del momento en que se silenció el hallazgo.</td>
    </tr>
    <tr>
      <td><code>muted_by</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@workflow.mute.muted_by</code><br>Usuario que silenció el hallazgo.</td>
    </tr>
  </tbody>
</table>

#### Silenciado por

Usuario que silenció el hallazgo.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>id</code></td>
      <td>cadena</td>
      <td><strong>Ruta de acceso:</strong> <code>@workflow (UI) / proceso (generic).mute.muted_by.id</code><br>Identificador único en formato UUID del usuario que silenció el hallazgo.</td>
    </tr>
    <tr>
      <td><code>nombre</code></td>
      <td>cadena</td>
      <td><strong>Ruta</strong> <code>@workflow (UI) / proceso (generic).mute.muted_by.name</code><br>Nombre para mostrar del usuario que silenció el hallazgo.</td>
    </tr>
  </tbody>
</table>

### Integraciones

Integraciones como Jira, Case Management, o ServiceNow utilizadas para triar y remediar el hallazgo.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>cases</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@workflow.integrations.cases</code><br>Matriz de casos adjuntos al hallazgo.</td>
    </tr>
    <tr>
      <td><code>jira</code></td>
      <td>array (string)</td>
      <td><strong>Path:</strong> <code>@workflow.integrations.jira</code><br>Claves de incidente Jira adjuntos a este hallazgo en el formato <code>PROJECT-NUMBER</code> (por ejemplo, <code>PROJ-123</code>).</td>
    </tr>
    <tr>
      <td><code>pull_requests</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@workflow.integrations.pull_requests</code><br>Solicitudes pull utilizadas para corregir este hallazgo.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Riesgo" level="h3" id="riesgo" %}}

Atributos del hallazgo relacionados con el riesgo. Cada clave debe tener una clave coincidente en el espacio de nombres `risk_details`.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>has_sensitive_data</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk.has_sensitive_data</code><br>Es true si el hallazgo tine acceso al recurso que contiene información confidencial, de lo contrario es false.</td>
    </tr>
    <tr>
      <td><code>is_function_reachable</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk.is_function_reachable</code><br>Es true si se puede ejecutar la función vulnerable, de lo contrario es false.</td>
    </tr>
    <tr>
      <td><code>is_exposed_to_attacks</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk.is_exposed_to_attacks</code><br>Es true si ya se detectaron ataques en este recurso, de lo contrario es false.</td>
    </tr>
    <tr>
      <td><code>has_privileged_access</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk.has_privileged_access</code><br>Es true si el recurso del hallazgo se ejecuta con privilegios elevados o tiene la capacidad de asumir un rol privilegiado, de lo contrario es false.</td>
    </tr>
    <tr>
      <td><code>is_production</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk.is_production</code><br>Es true si el recurso del hallazgo se ejecuta en producción, de lo contrario es false.</td>
    </tr>
    <tr>
      <td><code>is_publicly_accessible</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk.is_publicly_accessible</code><br>Es true si el recurso del hallazgo es accesible al público, de lo contrario es false.</td>
    </tr>
    <tr>
      <td><code>has_exploit_available</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk.has_exploit_available</code><br>Es true si existen exploits conocidos de este hallazgo, de lo contrario es false.</td>
    </tr>
    <tr>
      <td><code>has_high_exploitability_chance</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk.has_high_exploitability_chance</code><br>Es true si la puntuación EPSS (Exploit Prediction Scoring System) score es mayor al 1%, de lo contrario es false.</td>
    </tr>
    <tr>
      <td><code>is_tainted_from_request_url</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk.is_tainted_from_request_url</code><br>Es true si la URL final contiene partes contaminadas provenientes de la URL de la solicitud, de lo contrario es false.</td>
    </tr>
    <tr>
      <td><code>is_tainted_from_query_string</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk.is_tainted_from_query_string</code><br>Es true si la cadena está contaminada por elementos derivados de una cadena de consultas HTTP, de lo contrario es false.</td>
    </tr>
    <tr>
      <td><code>is_tainted_from_database</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk.is_tainted_from_database</code><br>Es true si la cadena está contaminada porque se originó en una fuente de bases de datos no confiable, de lo contrario es false.</td>
    </tr>
    <tr>
      <td><code>is_using_sha1</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk.is_using_sha1</code><br>Es true si SHA1 se utiliza en un hash débil, de lo contrario es false.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Detalles del riesgo" level="h3" id="risk-details" %}}

Factores de riesgo contextuales que ayudan a evaluar el impacto potencial de un hallazgo. Estos campos describen características como la exposición, la sensibilidad y los signos de explotación activa.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>has_sensitive_data</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.has_sensitive_data</code><br>Evidencia e indicadores de si el recurso afectado contiene datos confidenciales.</td>
    </tr>
    <tr>
      <td><code>is_function_reachable</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.is_function_reachable</code><br>Agrupa evidencia e indicadores de si la función o el módulo vulnerable se utiliza en el código.</td>
    </tr>
    <tr>
      <td><code>is_exposed_to_attacks</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.is_exposed_to_attacks</code><br>Agrupa evidencia e indicadores de si el hallazgo detectado está expuesto a ataques.</td>
    </tr>
    <tr>
      <td><code>has_privileged_access</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.has_privileged_access</code><br>Agrupa evidencia e indicadores de si el recurso tiene acceso privilegiado.</td>
    </tr>
    <tr>
      <td><code>is_production</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.is_production</code><br>Agrupa evidencia e indicadores de si el recurso asociado al hallazgo se ejecuta en un entorno de producción.</td>
    </tr>
    <tr>
      <td><code>is_publicly_accessible</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.is_publicly_accessible</code><br>Agrupa información de si el recurso afectado es accesible a través de la internet pública.</td>
    </tr>
    <tr>
      <td><code>has_exploit_available</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.has_exploit_available</code><br>Agrupa información de si existe un exploit conocido para este aviso de hallazgo.</td>
    </tr>
    <tr>
      <td><code>has_high_exploitability_chance</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.has_high_exploitability_chance</code><br>Agrupa evidencia e indicadores de si la vulnerabilidad podría ser explotada basándose en el EPSS (Exploit Prediction Scoring System).</td>
    </tr>
    <tr>
      <td><code>is_tainted_from_request_url</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.is_tainted_from_request_url</code><br>Agrupa información de si las partes contaminadas provienen de la URL de la solicitud.</td>
    </tr>
    <tr>
      <td><code>is_tainted_from_query_string</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.is_tainted_from_query_string</code><br>Agrupa información de si las partes contaminadas provienen de una cadena de consulta.</td>
    </tr>
    <tr>
      <td><code>is_tainted_from_database</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.is_tainted_from_database</code><br>Agrupa información de si las partes contaminadas provienen de una base de datos.</td>
    </tr>
    <tr>
      <td><code>is_using_sha1</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.is_using_sha1</code><br>Agrupa información de si SHA1 se utiliza en un hash débil.</td>
    </tr>
  </tbody>
</table>

### Contiene datos confidenciales

Evidencia e indicadores de si el recurso afectado contiene datos confidenciales.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@risk_details.has_sensitive_data.impact_cvss</code><br>Decribe de qué forma la presencia de datos confidenciales cambia la puntuación CVSS. Valores válidos: <code>riskier</code>, <code>neutral</code>, <code>safer</code>, <code>unknown</code>.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk_details.has_sensitive_data.value</code><br>Igual a <code>risk.has_sensitive_data</code>.</td>
    </tr>
    <tr>
      <td><code>evidence</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.has_sensitive_data.evidence</code><br>Evidencia que demuestra la presencia de datos confidenciales.</td>
    </tr>
  </tbody>
</table>

#### Evidencia

Evidencia que demuestra la presencia de datos confidenciales.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>sds_id</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@risk_details.has_sensitive_data.evidence.sds_id</code><br>Identificador de un ingreso de datos confidenciales detectado por Datadog Sensitive Data Scanner.</td>
    </tr>
  </tbody>
</table>

### Alcance de la función

Agrupa evidencia e indicadores de si la función o módulo vulnerable se utiliza en el código.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@risk_details.is_function_reachable.impact_cvss</code><br>Describe de qué forma el alcance de la función cambia el riesgo CVSS. Valores válidos: <code>riskier</code>, <code>neutral</code>, <code>safer</code>, <code>unknown</code>.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk_details.is_function_reachable.value</code><br>Es true si la función es alcanzable, de lo contrario es false.</td>
    </tr>
    <tr>
      <td><code>evidence</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.is_function_reachable.evidence</code><br>Contiene la evidencia utilizada para determinar si la función es alcanzable.</td>
    </tr>
  </tbody>
</table>

#### Evidencia

Contiene la evidencia utilizada para determinar si la función es alcanzable.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>locations</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.is_function_reachable.evidence.locations</code><br>Matriz de localizaciones de código de donde se llama a la función.</td>
    </tr>
  </tbody>
</table>

##### Localizaciones

Matriz de localizaciones de código de donde se llama a la función.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>filename</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@risk_details.is_function_reachable.evidence.locations.filename</code><br>Nombre del archivo donde está declarada la versión del paquete principal raíz.</td>
    </tr>
    <tr>
      <td><code>line_start</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@risk_details.is_function_reachable.evidence.locations.line_start</code><br>Número de línea en la que empieza la declaración de la versión del paquete principal raíz en el archivo.</td>
    </tr>
    <tr>
      <td><code>column_start</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@risk_details.is_function_reachable.evidence.locations.column_start</code><br>Posición en la columna donde empieza la declaración de la versión del paquete principal raíz en la línea.</td>
    </tr>
    <tr>
      <td><code>line_end</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@risk_details.is_function_reachable.evidence.locations.line_end</code><br>Número de línea en la que termina la declaración de la versión del paquete principal raíz en el archivo.</td>
    </tr>
    <tr>
      <td><code>column_end</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@risk_details.is_function_reachable.evidence.locations.column_end</code><br>Posición en la columna donde termina la declaración de la versión del paquete principal raíz en la línea.</td>
    </tr>
    <tr>
      <td><code>is_test_file</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk_details.is_function_reachable.evidence.locations.is_test_file</code><br>Es true si el archivo de código es un archivo de test, de lo contrario es false.</td>
    </tr>
    <tr>
      <td><code>url</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@risk_details.is_function_reachable.evidence.locations.url</code><br>URL para visualizar el archivo en línea (por ejemplo, en GitHub), donde se resalta la localización del código.</td>
    </tr>
    <tr>
      <td><code>symbol</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@risk_details.is_function_reachable.evidence.locations.symbol</code></td>
    </tr>
  </tbody>
</table>

### Está expuesto a ataques

Agrupa evidencia e indicadores de si el servicio donde se detectó el hallazgo está expuesto a ataques.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@risk_details.is_exposed_to_attacks.impact_cvss</code><br>Describe de qué forma la exposición del recurso afecta a la puntuación CVSS. Valores válidos: <code>riskier</code>, <code>neutral</code>, <code>safer</code>, <code>unknown</code>.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk_details.is_exposed_to_attacks.value</code><br>Igual que <code>risk.is_exposed_to_attacks</code>.</td>
    </tr>
    <tr>
      <td><code>evidence</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.is_exposed_to_attacks.evidence</code><br>Contiene evidencia sobre la presencia de ataques.</td>
    </tr>
  </tbody>
</table>

#### Evidencia

Contiene evidencia sobre la presencia de ataques.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>trace_example</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.is_exposed_to_attacks.evidence.trace_example</code><br>Ejemplo de traza con ataques detectados en el recurso del hallazgo.</td>
    </tr>
    <tr>
      <td><code>trace_query</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@risk_details.is_exposed_to_attacks.evidence.trace_query</code><br>Consulta utilizada para buscar trazas con ataques relacionados con el recurso del hallazgo.</td>
    </tr>
    <tr>
      <td><code>attacks_details</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.is_exposed_to_attacks.evidence.attacks_details</code><br>Contiene detalles sobre uno de los ataques detectados.</td>
    </tr>
  </tbody>
</table>

### Tiene acceso privilegiado

Agrupa evidencia e indicadores de si el recurso tiene acceso privilegiado.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@risk_details.has_privileged_access.impact_cvss</code><br>Describe de qué forma el acceso privilegiado afecta a la puntuación CVSS. Valores válidos: <code>riskier</code>, <code>neutral</code>, <code>safer</code>, <code>unknown</code>.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk_details.has_privileged_access.value</code><br>Es true si el recurso asociado al hallazgo tiene acceso privilegiado, de lo contrario es false.</td>
    </tr>
    <tr>
      <td><code>evidence</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.has_privileged_access.evidence</code><br>Contiene evidencia que demuestra un acceso privilegiado.</td>
    </tr>
  </tbody>
</table>

#### Evidencia

Contiene evidencia que demuestra un acceso privilegiado.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>resource_key</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@risk_details.has_privileged_access.evidence.resource_key</code><br>Identificador canónico de recursos en la nube que demuestra un acceso privilegiado.</td>
    </tr>
  </tbody>
</table>

### En producción

Agrupa evidencia e indicadores de si el recurso asociado al hallazgo se ejecuta en un entorno de producción.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@risk_details.is_production.impact_cvss</code><br>Describe de qué forma un entorno de producción afecta a la puntuación CVSS. Valores válidos: <code>riskier</code>, <code>neutral</code>, <code>safer</code>, <code>unknown</code>.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk_details.is_production.value</code><br>Igual que <code>risk.is_production</code>.</td>
    </tr>
    <tr>
      <td><code>evidence</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.is_production.evidence</code><br>Contiene el valor de etiqueta (tag) <code>env</code> que determina si el recurso está en producción.</td>
    </tr>
  </tbody>
</table>

### Es de acceso público

Agrupa información de si el recurso afectado es accesible desde la internet pública.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@risk_details.is_publicly_accessible.impact_cvss</code><br>Describe de qué forma la accesibilidad pública afecta a la puntuación CVSS. valores válidos: <code>riskier</code>, <code>neutral</code>, <code>safer</code>, <code>unknown</code>.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk_details.is_publicly_accessible.value</code><br>Igual que <code>risk.is_publicly_accessible</code>.</td>
    </tr>
    <tr>
      <td><code>evidence</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.is_publicly_accessible.evidence</code><br>Contiene evidencia que demuestra el acceso desde internet.</td>
    </tr>
  </tbody>
</table>

#### Evidencia

Contiene evidencia que demuestra el acceso desde internet.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>resource_key</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@risk_details.is_publicly_accessible.evidence.resource_key</code><br>Identificador canónico de recursos en la nube del recurso accesible desde internet.</td>
    </tr>
  </tbody>
</table>

### Tiene exploit disponible

Agrupa información de si existe un exploit conocido para este aviso de hallazgo.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@risk_details.has_exploit_available.impact_cvss</code><br>Describe de qué forma la disponibilidad de exploits conocidos afecta a la puntuación CVSS. Valores válidos:<code>riskier</code>, <code>neutral</code>, <code>safer</code>, <code>unknown</code>.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk_details.has_exploit_available.value</code><br>Es true si existen exploits conocidos para este hallazgo, de lo contrario es false.</td>
    </tr>
    <tr>
      <td><code>evidence</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.has_exploit_available.evidence</code><br>Contiene evidencia sobre la disponibilidad de exploits.</td>
    </tr>
  </tbody>
</table>

#### Evidencia

Contiene evidencia sobre la disponibilidad de exploits.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>type</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@risk_details.has_exploit_available.evidence.type</code><br>Tipo de evidencia. Valores válidos: <code>production_ready</code>, <code>poc</code>, <code>unavailable</code>.</td> 
    </tr>
    <tr>
      <td><code>exploit_urls</code></td>
      <td>array (string)</td>
      <td><strong>Path:</strong> <code>@risk_details.has_exploit_available.evidence.exploit_urls</code><br>Enumera las URL de exploits asociadas al hallazgo.</td>
    </tr>
    <tr>
      <td><code>exploit_sources</code></td>
      <td>array (string)</td>
      <td><strong>Path:</strong> <code>@risk_details.has_exploit_available.evidence.exploit_sources</code><br>Enumera fuentes de exploits asociadas al hallazgo (por ejemplo, NIST, CISA, Exploit-DB).</td>
    </tr>
  </tbody>
</table>

### Tiene una alta probabilidad de explotación

Agrupa evidencia e indicadores sobre la probabilidad de que la vulnerabilidad sea explotada basándose en el EPSS (Exploit Prediction Scoring System).

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@risk_details.has_high_exploitability_chance.impact_cvss</code><br>Describe de qué forma la elevada explotabilidad afecta a la puntuación CVSS. Valores válidos: <code>riskier</code>, <code>neutral</code>, <code>safer</code>, <code>unknown</code>.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk_details.has_high_exploitability_chance.value</code><br>Es true si la puntuación EPSS es superior al 1%, de lo contrario es false.</td>
    </tr>
    <tr>
      <td><code>evidence</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@risk_details.has_high_exploitability_chance.evidence</code><br>Contiene evidencia de la puntuación EPSS.</td>
    </tr>
  </tbody>
</table>

#### Evidencia

Contiene evidencia de la puntuación EPSS.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>epss_score</code></td>
      <td>number</td>
      <td><strong>Path:</strong> <code>@risk_details.has_high_exploitability_chance.evidence.epss_score</code><br>Puntuación EPSS como porcentaje que representa la probabilidad de explotación.</td>
    </tr>
    <tr>
      <td><code>epss_severity</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@risk_details.has_high_exploitability_chance.evidence.epss_severity</code><br>Nivel de gravedad de la puntuación EPSS. Valores válidos: <code>Critical</code>, <code>High</code>, <code>Medium</code>, <code>Low</code>.</td>
    </tr>
    <tr>
      <td><code>threshold</code></td>
      <td>number</td>
      <td><strong>Path:</strong> <code>@risk_details.has_high_exploitability_chance.evidence.threshold</code><br>Puntuación EPSS mínima necesaria para que se considere que una vulnerabilidad tiene una elevada probabilidad de explotación.</td>
    </tr>
  </tbody>
</table>

### Está contaminado por la URL de la solicitud

Agrupa información de si las partes contaminadas provienen de la URL de la solicitud.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@risk_details.is_tainted_from_request_url.impact_cvss</code><br>Describe de qué forma la contaminación de la URL de la solicitud cambia la puntuación CVSS. Valores válidos: <code>riskier</code>, <code>neutral</code>, <code>safer</code>, <code>unknown</code>.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk_details.is_tainted_from_request_url.value</code><br>Es true si la URL final contiene partes contaminadas que se originan en la URL de la solicitud, de lo contrario es false.</td>
    </tr>
  </tbody>
</table>

### Está contaminado por la cadena de consulta

Agrupa información de si las partes contaminadas provienen de una cadena de consulta.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@risk_details.is_tainted_from_query_string.impact_cvss</code><br>Describe de qué forma la contaminación de la cadena de consulta cambia la puntuación CVSS: Valores válidos: <code>riskier</code>, <code>neutral</code>, <code>safer</code>, <code>unknown</code>.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk_details.is_tainted_from_query_string.value</code><br>Es true si la cadena contiene elementos derivados de una cadena de consulta HTTP, de lo contrario es false.</td>
    </tr>
  </tbody>
</table>

### Está contaminado por la base de datos

Agrupa información de si las partes contaminadas provienen de una base de datos.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@risk_details.is_tainted_from_database.impact_cvss</code><br>Describe de qué forma la contaminación de la base de datos cambia la puntuación CVSS: Valores válidos: <code>riskier</code>, <code>neutral</code>, <code>safer</code>, <code>unknown</code>.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk_details.is_tainted_from_database.value</code><br>Es true si la cadena está contaminada porque se originó en una fuente de base de datos no confiable, de lo contrario es false.</td>
    </tr>
  </tbody>
</table>

### Utiliza Sha1

Agrupa información de si SHA1 se utiliza en un hash débil.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@risk_details.is_using_sha1.impact_cvss</code><br>Describe de qué forma el uso de SHA1 cambia la puntuación CVSS. Valores válidos: <code>riskier</code>, <code>neutral</code>, <code>safer</code>, <code>unknown</code>.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@risk_details.is_using_sha1.value</code><br>Es true si SHA1 se utiliza en un hash débil, de lo contrario es false.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Regla" level="h3" id="rule" %}}

Describe cómo detectar una vulnerabilidad. Los hallazgos de vulnerabilidades con reglas significan que la vulnerabilidad se detectó en el código fuente o en el código en ejecución. Las reglas también se utilizan para hallazgos no relacionados con vulnerabilidades, como errores de configuración o seguridad de la API.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>type</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@rule.type</code><br>Tipo de regla que generó el hallazgo.</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@rule.name</code><br>Nombre de la regla que generó el hallazgo.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@rule.id</code><br>Identificador de la regla que generó el hallazgo.</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@rule.version</code><br>Versión de la regla que generó el hallazgo.</td>
    </tr>
    <tr>
      <td><code>default_rule_id</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@rule.default_rule_id</code><br>Identificador por defecto de la regla. Las reglas personalizadas no tienen identificadores de reglas por defecto.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Aviso" level="h3" id="advisory" %}}

Vincula una vulnerabilidad a un conjunto de versiones de software específicas. Los hallazgos de vulnerabilidad con avisos significan que se detectó una versión vulnerable del software (normalmente a través de SBOM).

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>id</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@advisory.id</code><br>Identificador interno del aviso.</td>
    </tr>
    <tr>
      <td><code>cve</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@advisory.cve</code><br>Identificador primario reconocido globalmente de una vulnerabilidad de la seguridad, siguiendo el formato <code>CVE-YYYY-NNNN</code>.</td>
    </tr>
    <tr>
      <td><code>aliases</code></td>
      <td>array (string)</td>
      <td><strong>Path:</strong> <code>@advisory.aliases</code><br>Contiene identificadores adicionales que hacen referencia a la misma vulnerabilidad, creados por otras entidades.</td>
    </tr>
    <tr>
      <td><code>published_at</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@advisory.published_at</code><br>Marca de tiempo en milisegundos (UTC) del momento en que se publicó el aviso.</td>
    </tr>
    <tr>
      <td><code>modified_at</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@advisory.modified_at</code><br>Marca de tiempo en milisegundos (UTC) de la última actualización del aviso.</td>
    </tr>
    <tr>
      <td><code>summary</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@advisory.summary</code><br>Breve resumen del aviso.</td>
    </tr>
    <tr>
      <td><code>type</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@advisory.type</code><br>Especifica el tipo de aviso. Valores válidos: <code>component_with_known_vulnerability</code>, <code>unmaintained</code>, <code>end_of_life</code>, <code>dangerous_workflows</code>, <code>risky_license</code>, <code>malicious_package</code>.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Vulnerabilidad" level="h3" id="vulnerability" %}}

Contiene información específica sobre vulnerabilidades.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>cwes</code></td>
      <td>array (string)</td>
      <td><strong>Path:</strong> <code>@vulnerability.cwes</code><br>Identificador CWE (Common Weakness Enumeration) asociado a esta vulnerabilidad. Cada entrada debe utilizar el formato <code>CWE-&lt;id&gt;</code> (por ejemplo, <code>CWE-416</code>).</td>
    </tr>
    <tr>
      <td><code>hash</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@vulnerability.hash</code><br>Hash de la vulnerabilidad utilizado para correlacionar la misma vulnerabilidad en todo el tiempo de ejecución y el análisis estático de SCA (Software Composition Analysis).</td>
    </tr>
    <tr>
      <td><code>first_commit</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@vulnerability.first_commit</code><br>Identifica el commit en el que se introdujo esta vulnerabilidad por primera vez.</td>
    </tr>
    <tr>
      <td><code>last_commit</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@vulnerability.last_commit</code><br>Identifica el commit en el que se corrigió esta vulnerabilidad.</td>
    </tr>
    <tr>
      <td><code>owasp_top10_years</code></td>
      <td>array (integer)</td>
      <td><strong>Path:</strong> <code>@vulnerability.owasp_top10_years</code><br>Indica en qué años apareció la vulnerabilidad en la lista de las 10 principales vulnerabilidades críticas de OWASP.</td>
    </tr>
    <tr>
      <td><code>confidence</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@vulnerability.confidence</code><br>Evalúa la probabilidad de que la vulnerabilidad sea un true positivo. Posibles valores: <code>low</code>, <code>high</code>, <code>not_evaluated</code>.</td>
    </tr>
    <tr>
      <td><code>confidence_reason</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@vulnerability.confidence_reason</code><br>Proporciona la razón detrás del nivel de confianza asignado.</td>
    </tr>
    <tr>
      <td><code>is_emerging</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@vulnerability.is_emerging</code><br>Es true si esta vulnerabilidad se clasifica como una amenaza emergente, de lo contrario es false.</td>
    </tr>
    <tr>
      <td><code>stack</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@vulnerability.stack</code><br>Especifica el stack tecnológico en el que se encontró la vulnerabilidad.</td>
    </tr>
  </tbody>
</table>

### Stack tecnológico

Especifica el stack tecnológico en el que se encontró la vulnerabilidad.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>language</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@vulnerability.stack.language</code><br>Especifica el lenguaje en el que se encontró la vulnerabilidad.</td>
    </tr>
    <tr>
      <td><code>ecosystem</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@vulnerability.stack.ecosystem</code><br>Indica el sistema de gestión de paquetes o el registro fuente donde se originó el componente vulnerable. Posibles valores: <code>pypi</code>, <code>maven</code>, <code>nuget</code>, <code>npm</code>, <code>rubygems</code>, <code>go</code>, <code>packagist</code>, <code>deb</code>, <code>rpm</code>, <code>apk</code>, <code>windows</code>, <code>macos</code>, <code>oci</code>, <code>generic</code>, <code>bottlerocket</code>, <code>conan</code>, <code>crates</code>, <code>none</code>.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Corrección" level="h3" id="remediation" %}}

Agrupa información sobre la corrección del hallazgo.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>codegen</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@remediation.codegen</code><br>Rastrea el estado del hallazgo para la plataforma de generación de códigos.</td>
    </tr>
    <tr>
      <td><code>is_available</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@remediation.is_available</code><br>Es true si hay una corrección actualmente disponible para este hallazgo, de lo contrario es false.</td>
    </tr>
    <tr>
      <td><code>description</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@remediation.description</code><br>Descripción de la corrección.</td>
    </tr>
    <tr>
      <td><code>recommended_type</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@remediation.recommended_type</code><br>Indica el tipo de corrección recomendado para este hallazgo. Posibles valores: <code>package</code>, <code>host_image</code>, <code>container_image</code>, <code>code_update</code>, <code>microsoft_kb</code>, <code>root_package</code>.</td>
    </tr>
    <tr>
      <td><code>recommended</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@remediation.recommended</code><br>Contiene la corrección recomendada.</td>
    </tr>
    <tr>
      <td><code>package</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@remediation.package</code><br>Agrupa información del paquete de corrección.</td>
    </tr>
    <tr>
      <td><code>root_package</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@remediation.root_package</code><br>Agrupa información del paquete de corrección raíz.</td>
    </tr>
    <tr>
      <td><code>host_image</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@remediation.host_image</code><br>Contiene correcciones que sugieren la versión de la imagen de host más reciente que podría corregir la vulnerabilidad.</td>
    </tr>
    <tr>
      <td><code>container_image</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@remediation.container_image</code><br>Contiene correcciones que sugieren una versión de la imagen de host más reciente que podría corregir la vulnerabilidad.</td>
    </tr>
    <tr>
      <td><code>code_update</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@remediation.code_update</code></td>
    </tr>
    <tr>
      <td><code>microsoft_kb</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@remediation.microsoft_kb</code><br>Contiene estrategias de corrección mediante un artículo de la Base de conocimientos de Microsoft.</td>
    </tr>
  </tbody>
</table>

### Codegen

Rastrea el estado del hallazgo para la plataforma de generación de códigos.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>status</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@remediation.codegen.status</code><br>Estado de la generación de correcciones automatizada. valores válidos: <code>generated</code>, <code>not_available_non_default_branch</code>, <code>not_available_unsupported_tool</code>, <code>not_available_unsupported_rule</code>, <code>not_available_confidence_low</code>, <code>not_available_disabled</code>, <code>not_available_git_provider_not_supported</code>, <code>not_available_confidence_too_low</code>, <code>error</code>.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@remediation.codegen.id</code><br>Identificador utilizado para rastrear la corrección en el backend de generación de códigos.</td>
    </tr>
  </tbody>
</table>

### Paquete

Agrupa información del paquete de corrección.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>latest_no_critical</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@remediation.package.latest_no_critical</code><br>Contiene correcciones que sugieren la versión del paquete más reciente sin vulnerabilidades críticas (basado en una puntuación básica).</td>
    </tr>
    <tr>
      <td><code>closest_no_critical</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@remediation.package.closest_no_critical</code><br>Contiene correcciones que sugieren la versión del paquete más parecida sin vulnerabilidades críticas (basado en una puntuación básica).</td>
    </tr>
    <tr>
      <td><code>latest_no_vulnerabilities</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@remediation.package.latest_no_vulnerabilities</code><br>Contiene correcciones que sugieren la versión del paquete más reciente sin vulnerabilidades.</td>
    </tr>
    <tr>
      <td><code>closest_no_vulnerabilities</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@remediation.package.closest_no_vulnerabilities</code><br>Contiene correcciones que sugieren la versión del paquete más parecida sin vulnerabilidades.</td>
    </tr>
    <tr>
      <td><code>base</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@remediation.package.base</code></td>
    </tr>
  </tbody>
</table>

### Paquete raíz

Agrupa información del paquete de corrección raíz.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>latest_no_critical</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.latest_no_critical</code><br>Contiene correcciones que sugieren la versión del paquete más reciente sin vulnerabilidades críticas (basado en una puntuación básica).</td>
    </tr>
    <tr>
      <td><code>closest_no_critical</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.closest_no_critical</code><br>Contiene correcciones que sugieren la versión del paquete más parecida sin vulnerabilidades críticas (basado en una puntuación básica).</td>
    </tr>
    <tr>
      <td><code>latest_no_vulnerabilities</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.latest_no_vulnerabilities</code><br>Contiene correcciones que sugieren la versión del paquete más reciente sin vulnerabilidades.</td>
    </tr>
    <tr>
      <td><code>closest_no_vulnerabilities</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.closest_no_vulnerabilities</code><br>Contiene correcciones que sugieren la versión del paquete más parecida sin vulnerabilidades.</td>
    </tr>
    <tr>
      <td><code>base</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@remediation.root_package.base</code></td>
    </tr>
  </tbody>
</table>

### Imagen de host

Contiene correcciones que sugieren la versión de la imagen de host más reciente que podría corregir la vulnerabilidad.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>latest_major</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@remediation.host_image.latest_major</code><br>Contiene información sobre la imagen de máquina de Amazon (AMI) más reciente que podría corregir la vulnerabilidad.</td>
    </tr>
  </tbody>
</table>

#### Mayor más reciente

Contiene información sobre la imagen de máquina de Amazon (AMI) más reciente que podría corregir la vulnerabilidad.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>name</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@remediation.host_image.latest_major.name</code><br>Nombre de la imagen de máquina de Amazon (AMI) más reciente (por ejemplo, <code>ami-12345678</code>) que podría corregir la vulnerabilidad.</td>
    </tr>
  </tbody>
</table>

### Imagen de contenedor

Contiene correcciones que sugieren una versión de la imagen de contenedor más reciente que podría corregir la vulnerabilidad.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>closest_no_vulnerabilities</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@remediation.container_image.closest_no_vulnerabilities</code><br>Contiene correcciones que sugieren actualizar la imagen de contenedor a una versión más reciente que podría corregir la vulnerabilidad.</td>
    </tr>
  </tbody>
</table>

#### Más parecido sin vulnerabilidades

Contiene sugerencias de corrección para actualizar la imagen de contenedor a una versión más reciente que podría corregir la vulnerabilidad.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>layer_digests</code></td>
      <td>array (string)</td>
      <td><strong>Path:</strong> <code>@remediation.container_image.closest_no_vulnerabilities.layer_digests</code><br>Contiene los digests de capas de la imagen de contenedor actualmente vulnerable que necesita actualización.</td>
    </tr>
    <tr>
      <td><code>image_url</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@remediation.container_image.closest_no_vulnerabilities.image_url</code><br>URL de la imagen de contenedor que podría corregir la vulnerabilidad.</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@remediation.container_image.closest_no_vulnerabilities.name</code><br>Nombre de la imagen de contenedor que podría corregir la vulnerabilidad.</td>
    </tr>
    <tr>
      <td><code>tag</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@remediation.container_image.closest_no_vulnerabilities.tag</code><br>Etiqueta de la imagen de contenedor que podría corregir la vulnerabilidad.</td>
    </tr>
  </tbody>
</table>

### Actualización del código

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>edits</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@remediation.code_update.edits</code><br>Enumera los cambios de código necesarios para corregir el hallazgo.</td>
    </tr>
  </tbody>
</table>

### Base de conocimientos de Microsoft

Contiene estrategias de corrección mediante un artículo de la base de conocimientos de Microsoft (KB).

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>closest_fix_advisory</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@remediation.microsoft_kb.closest_fix_advisory</code><br>Especifica el parche más parecido para responder al aviso actual.</td>
    </tr>
  </tbody>
</table>

#### Aviso de corrección más parecido

Especifica el parche más parecido disponible para responder al aviso actual.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>article</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@remediation.microsoft_kb.closest_fix_advisory.article</code><br>Nombre de artículo del parche más parecido.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Cumplimiento" level="h3" id="compliance" %}}

Contiene información específica de los hallazgos de cumplimiento, como la regla o la evaluación de cumplimiento (aprobada/no aprobada).

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>evaluation</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@compliance.evaluation</code><br>Resultado de la evaluación del cumplimiento. Valores válidos: <code>pass</code> (recurso correctamente configurado), <code>fail</code> (recurso incorrectamente configurado).</td>
    </tr>
    <tr>
      <td><code>frameworks</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@compliance.frameworks</code><br>Enumera los marcos de cumplimiento asignados a este hallazgo.</td>
    </tr>
    <tr>
      <td><code>framework_requirements</code></td>
      <td>array (string)</td>
      <td><strong>Path:</strong> <code>@compliance.framework_requirements</code><br>Enumera los requisitos de este marco de cumplimiento con los que se relaciona este hallazgo.</td>
    </tr>
    <tr>
      <td><code>framework_requirement_controls</code></td>
      <td>array (string)</td>
      <td><strong>Path:</strong> <code>@compliance.framework_requirement_controls</code><br>Enumera los controles del requisito del marco a los que apunta este hallazgo.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Recurso en la nube" level="h3" id="cloud-resource" %}}

Agrupa atributos que identifican el recurso en la nube afectado por el hallazgo.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>tags</code></td>
      <td>array (string)</td>
      <td><strong>Path:</strong> <code>@cloud_resource.tags</code><br>Enumera las etiquestas aplicadas al recurso en la nube.</td>
    </tr>
    <tr>
      <td><code>category</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@cloud_resource.category</code><br>Categoría a la que corresponde el tipo de recurso.</td>
    </tr>
    <tr>
      <td><code>key</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@cloud_resource.key</code><br>Identificador canónico de recursos en la nube (CCRID).</td>
    </tr>
    <tr>
      <td><code>cloud_provider_url</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@cloud_resource.cloud_provider_url</code><br>Enlace al recurso en la consola del proveedor de la nube.</td>
    </tr>
    <tr>
      <td><code>cloud_provider</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@cloud_resource.cloud_provider</code><br>Indica el proveedor de la nube que aloja el recurso. Valores válidos: <code>aws</code>, <code>azure</code>, <code>gcp</code>, <code>oci</code>.</td>
    </tr>
    <tr>
      <td><code>configuration</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@cloud_resource.configuration</code><br>Configuracion del recurso en la nube devuelto por el proveedor de la nube.</td>
    </tr>
    <tr>
      <td><code>context</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@cloud_resource.context</code><br>Contexto del recurso en la nube.</td>
    </tr>
    <tr>
      <td><code>account</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@cloud_resource.account</code><br>Cuenta en la nube propietaria del recurso en la nube (por ejemplo, cuenta AWS, suscripción Azure, proyecto GCP, arrendamiento OCI).</td>
    </tr>
    <tr>
      <td><code>display_name</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@cloud_resource.display_name</code><br>Muestra el nombre del recurso.</td>
    </tr>
    <tr>
      <td><code>region</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@cloud_resource.region</code><br>Región en la nube donde se encuentra el recurso.</td>
    </tr>
    <tr>
      <td><code>public_accessibility_paths</code></td>
      <td>array (string)</td>
      <td><strong>Path:</strong> <code>@cloud_resource.public_accessibility_paths</code><br>Descubre las rutas de red a través de las que el recurso es accesible desde la internet pública.</td>
    </tr>
    <tr>
      <td><code>public_port_ranges</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@cloud_resource.public_port_ranges</code><br>Lista de rangos de puerto del recurso expuestos a la internet pública.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Recurso Iac" level="h3" id="iac-resource" %}}
 

Agrupa atributos que identifican el recurso Infraestructura como Código (IaC) relacionado con el hallazgo.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>provider</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@iac_resource.provider</code><br>Indica el proveedor de IaC (Infraestructura como código) donde está definido el recurso (por ejemplo, <code>aws</code>, <code>gcp</code>, <code>azure</code>). Posibles valores: <code>aws</code>, <code>gcp</code>, <code>azure</code>.</td>
    </tr>
    <tr>
      <td><code>platform</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@iac_resource.platform</code><br>Indica en qué plataforma de IaC (Infraestructura como código) se encontró la vulnerabilidad (por ejemplo, <code>terraform</code>, <code>kubernetes</code>). Possible values: <code>cicd</code>, <code>terraform</code>, <code>kubernetes</code>, <code>cloudformation</code>.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="K8S" level="h3" id="k8s" %}}

Contiene campos Kubernetes para los hallazgos generados en relación con recursos de Kubernetes.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>cluster_id</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@k8s.cluster_id</code><br>Identificador de clústeres Kubernetes.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Host" level="h3" id="host" %}}

Contiene información sobre el host.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
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
      <td><strong>Path:</strong> <code>@host.key</code><br>Identificador canónico de recursos en la nube (CCRID).</td>
    </tr>
    <tr>
      <td><code>cloud_provider</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@host.cloud_provider</code><br>Proveedor de nube al que pertenece el host. Posibles valores: <code>aws</code>, <code>azure</code>, <code>gcp</code>, <code>oci</code>.</td>
    </tr>
    <tr>
      <td><code>image</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@host.image</code><br>Nombre de la imagen de host utilizada para crear el host (por ejemplo, <code>ami-1234</code>).</td>
    </tr>
    <tr>
      <td><code>os</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@host.os</code><br>Agrupa atributos del sistema operativo que se ejecuta en el host.</td>
    </tr>
  </tbody>
</table>

### SO

Agrupa atributos del sistema operativo que se ejecuta en el host.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>name</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@host.os.name</code><br>Nombre del sistema operativo.</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@host.os.version</code><br>Versión del sistema operativo.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Servicio" level="h3" id="service" %}}

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>name</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@service.name</code><br>Nombre del servicio en que se detectó este hallazgo.</td>
    </tr>
    <tr>
      <td><code>git_commit_sha</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@service.git_commit_sha</code><br>SHA de commit Git del commit más reciente donde se detectó este hallazgo del servicio. Solo disponible cuando está configurada la integración del código fuente.</td>
    </tr>
    <tr>
      <td><code>git_repository_url</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@service.git_repository_url</code><br>URL del repositorio Git del servicio asociado a este hallazgo. Solo disponible cuando está configurada la integración del código fuente.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Imagen de contenedor" level="h3" id="container-image" %}}

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>registries</code></td>
      <td>array (string)</td>
      <td><strong>Path:</strong> <code>@container_image.registries</code><br>Indica el registro de contenedor donde está almacenada la imagen o del que fue extraído.</td>
    </tr>
    <tr>
      <td><code>repository</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@container_image.repository</code><br>Repositorio de la imagen de contenedor.</td>
    </tr>
    <tr>
      <td><code>repo_digests</code></td>
      <td>array (string)</td>
      <td><strong>Path:</strong> <code>@container_image.repo_digests</code><br>Digests de repositorio de la imagen de contenedor donde se detectó este hallazgo.</td>
    </tr>
    <tr>
      <td><code>git_repository_url</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@container_image.git_repository_url</code><br>URL del respositorio Git del código utilizado para crear la imagen de contenedor. Solo disponible cuando está configurada la integración del código fuente.</td>
    </tr>
    <tr>
      <td><code>oses</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@container_image.oses</code><br>Sistemas operativos asociados a la imagen de contenedor.</td>
    </tr>
    <tr>
      <td><code>architectures</code></td>
      <td>array (string)</td>
      <td><strong>Path:</strong> <code>@container_image.architectures</code><br>Arquitecturas asociadas a la imagen de contenedor.</td>
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
      <td><strong>Path:</strong> <code>@container_image.name</code><br>Nombre completo de la imagen de contenedor.</td>
    </tr>
    <tr>
      <td><code>tags</code></td>
      <td>array (string)</td>
      <td><strong>Path:</strong> <code>@container_image.tags</code><br>Parte de la etiqueta del nombre de la imagen de contenedor (por ejemplo, <code>latest</code> o <code>1.2.3</code>).</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Git" level="h3" id="git" %}}

Contiene metadatos Git que vinculan un hallazgo al contexto del código fuente. Incluye información sobre el repositorio, la rama, el commit, el autor y el confirmador.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>repository_id</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@git.repository_id</code><br>Identificador normalizado del repositorio Git.</td>
    </tr>
    <tr>
      <td><code>repository_url</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@git.repository_url</code><br>URL del repositorio relacionado con el hallazgo.</td>
    </tr>
    <tr>
      <td><code>repository_visibility</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@git.repository_visibility</code><br>Indica la visibilidad del repositorio. Valores válidos: <code>public</code>, <code>private</code>, <code>not_detected</code>.</td>
    </tr>
    <tr>
      <td><code>branch</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@git.branch</code><br>Nombre de la rama Git relacionada con el hallazgo.</td>
    </tr>
    <tr>
      <td><code>default_branch</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@git.default_branch</code><br>Rama por defecto definida para el repositorio Git.</td>
    </tr>
    <tr>
      <td><code>is_default_branch</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@git.is_default_branch</code><br>Es true si la rama actual es la rama por defecto del repositorio, de lo contrario es false.</td>
    </tr>
    <tr>
      <td><code>sha</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@git.sha</code><br>Identificador del commit Git (SHA).</td>
    </tr>
    <tr>
      <td><code>author</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@git.author</code><br>Contiene detalles del autor del commit.</td>
    </tr>
    <tr>
      <td><code>committer</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@git.committer</code><br>Contiene detalles del confirmador.</td>
    </tr>
    <tr>
      <td><code>codeowners</code></td>
      <td>array (string)</td>
      <td><strong>Path:</strong> <code>@git.codeowners</code><br>Incluye equipos propietarios de código extraídos del archivo CODEOWNERS del proveedor de SCM (Gestión del código fuente) (por ejemplo, GitHub).</td>
    </tr>
  </tbody>
</table>

### Autor

Contiene detalles del autor del commit.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>name</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@git.author.name</code><br>Nombre del autor del commit.</td>
    </tr>
    <tr>
      <td><code>email</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@git.author.email</code><br>Correo electrónico del autor del commit.</td>
    </tr>
    <tr>
      <td><code>authored_at</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@git.author.authored_at</code><br>Marca de tiempo en milisegundos (UTC) del momento en que se realizaron los cambios originales.</td>
    </tr>
  </tbody>
</table>

### Confirmador

Contiene información del confirmador.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>name</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@git.committer.name</code><br>Nombre del confirmador.</td>
    </tr>
    <tr>
      <td><code>email</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@git.committer.email</code><br>Correo electrónica del confirmador.</td>
    </tr>
    <tr>
      <td><code>committed_at</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@git.committer.committed_at</code><br>Marca de tiempo en milisegundos (UTC) del momento en que se realizaron los últimos cambios importantes (por ejemplo, durante una operación rebase o amend).</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Localización del código" level="h3" id="code-location" %}}

Agrupa atributos que señalan los números concretos de archivo y línea en los que se encuentra el hallazgo.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>filename</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@code_location.filename</code><br>Nombre del archivo donde está declarada la versión del paquete principal raíz.</td>
    </tr>
    <tr>
      <td><code>line_start</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@code_location.line_start</code><br>Número de línea en la que empieza la declaración de la versión del paquete principal raíz en el archivo.</td>
    </tr>
    <tr>
      <td><code>column_start</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@code_location.column_start</code><br>Posición en la columna donde empieza la declaración de la versión del paquete principal raíz en la línea.</td>
    </tr>
    <tr>
      <td><code>line_end</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@code_location.line_end</code><br>Número de línea en la que termina la declaración de la versión del paquete principal raíz en el archivo.</td>
    </tr>
    <tr>
      <td><code>column_end</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@code_location.column_end</code><br>Posición en la columna donde termina la declaración de la versión del paquete principal raíz en la línea.</td>
    </tr>
    <tr>
      <td><code>is_test_file</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@code_location.is_test_file</code><br>Es true si el archivo de código es un archivo de test, de lo contrario es false.</td>
    </tr>
    <tr>
      <td><code>url</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@code_location.url</code><br>URL para visualizar el archivo en línea (por ejemplo, en GitHub), donde se resalta la localización del código.</td>
    </tr>
    <tr>
      <td><code>symbol</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@code_location.symbol</code></td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Paquete" level="h3" id="package" %}}

Contiene información del gestor de paquetes. Un gestor de paquetes automatiza la instalación, actualización, configuración y eliminación de paquetes de software.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>name</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@package.name</code><br>Nombre del paquete o de la biblioteca donde se identificó la vulnerabilidad.</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@package.version</code><br>Versión del paquete o de la biblioteca donde se identificó la vulnerabilidad.</td>
    </tr>
    <tr>
      <td><code>additional_names</code></td>
      <td>array (string)</td>
      <td><strong>Path:</strong> <code>@package.additional_names</code><br>Lista de nombres de paquetes afectados cuando una vulnerabilidad de la nube afecta a varios paquetes provenientes del mismo paquete de origen.</td>
    </tr>
    <tr>
      <td><code>normalized_name</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@package.normalized_name</code><br>Nombre normalizado en función del ecosistema del paquete o de la biblioteca donde se identificó la vulnerabilidad.</td>
    </tr>
    <tr>
      <td><code>manager</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@package.manager</code><br>Indica el ecosistema de gestión de paquetes o el registro fuente del que se originó el componente vulnerable. Posibles valores: <code>maven</code>, <code>gradle</code>, <code>npm</code>, <code>yarn</code>, <code>pnpm</code>, <code>requirements</code>, <code>pipfile</code>, <code>pdm</code>, <code>poetry</code>, <code>nuget</code>, <code>bundler</code>, <code>golang</code>, <code>composer</code>, <code>crates</code>, <code>conan</code>, <code>hex</code>, <code>pub</code>, <code>renv</code>, <code>uv</code>, <code>unknown</code>.</td>
    </tr>
    <tr>
      <td><code>dependency_type</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@package.dependency_type</code><br>Indica si el paquete es una dependencia directa, una dependencia transitiva o no compatible, si no es posible recuperar la información. Posibles valores: <code>direct</code>, <code>transitive</code>, <code>not_supported</code>.</td>
    </tr>
    <tr>
      <td><code>loading_type</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@package.loading_type</code><br>Indica si el componente se carga y ejecuta siempre (<code>hot</code>), si se ejecuta con poca frecuencia (<code>cold</code>) o si se carga bajo pedido (<code>lazy</code>). Posibles valores: <code>hot</code>, <code>cold</code>, <code>lazy</code>.</td>
    </tr>
    <tr>
      <td><code>dependency_location_text</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@package.dependency_location_text</code></td>
    </tr>
    <tr>
      <td><code>declaration</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@package.declaration</code><br>Contiene localizaciones de código de la definición del paquete.</td>
    </tr>
    <tr>
      <td><code>scope</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@package.scope</code><br>Indica el contexto de uso previsto del paquete (<code>production</code> or <code>development</code>). Posibles valores: <code>production</code>, <code>development</code>.</td>
    </tr>
    <tr>
      <td><code>root_parents</code></td>
      <td>array (object)</td>
      <td><strong>Path:</strong> <code>@package.root_parents</code><br>Contiene una lista de dependencias para las que este paquete es una dependencia transitiva.</td>
    </tr>
  </tbody>
</table>

### Declaración

Contiene localizaciones de código de la definición del paquete.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>block</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@package.declaration.block</code><br>Contiene la localización del código que declara toda la declaración de dependencia..</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@package.declaration.name</code><br>Contiene la localización del código que declara el nombre de la dependencia.</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>object</td>
      <td><strong>Path:</strong> <code>@package.declaration.version</code><br>Versión declarada del elemento principal raíz.</td>
    </tr>
  </tbody>
</table>

#### Bloque

Contiene la localización del código que declara toda la declaración de dependencia.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>filename</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@package.declaration.block.filename</code><br>Nombre del archivo donde está declarada la versión del paquete principal raíz.</td>
    </tr>
    <tr>
      <td><code>line_start</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@package.declaration.block.line_start</code><br>Número de línea en la que empieza la declaración de la versión del paquete principal raíz en el archivo.</td>
    </tr>
    <tr>
      <td><code>column_start</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@package.declaration.block.column_start</code><br>Posición en la columna donde empieza la declaración de la versión del paquete principal raíz en la línea.</td>
    </tr>
    <tr>
      <td><code>line_end</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@package.declaration.block.line_end</code><br>Número de línea en la que termina la declaración de la versión del paquete principal raíz en el archivo.</td>
    </tr>
    <tr>
      <td><code>column_end</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@package.declaration.block.column_end</code><br>Posición en la columna donde termina la declaración de la versión del paquete principal raíz en la línea.</td>
    </tr>
    <tr>
      <td><code>is_test_file</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@package.declaration.block.is_test_file</code><br>Es true si el archivo de código es un archivo de test, de lo contrario es false.</td>
    </tr>
    <tr>
      <td><code>url</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@package.declaration.block.url</code><br>URL para visualizar el archivo en línea (por ejemplo, en GitHub), donde se resalta la localización del código.</td>
    </tr>
    <tr>
      <td><code>symbol</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@package.declaration.block.symbol</code></td>
    </tr>
  </tbody>
</table>

#### Nombre

Contiene la localización del código que declara el nombre de la dependencia.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>filename</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@package.declaration.name.filename</code><br>Nombre del archivo donde está declarada la versión del paquete principal raíz.</td>
    </tr>
    <tr>
      <td><code>line_start</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@package.declaration.name.line_start</code><br>Número de línea en la que empieza la declaración de la versión del paquete principal raíz en el archivo.</td>
    </tr>
    <tr>
      <td><code>column_start</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@package.declaration.name.column_start</code><br>Posición en la columna donde empieza la declaración de la versión del paquete principal raíz en la línea.</td>
    </tr>
    <tr>
      <td><code>line_end</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@package.declaration.name.line_end</code><br>Número de línea en la que termina la declaración de la versión del paquete principal raíz en el archivo.</td>
    </tr>
    <tr>
      <td><code>column_end</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@package.declaration.name.column_end</code><br>Posición en la columna donde termina la declaración de la versión del paquete principal raíz en la línea.</td>
    </tr>
    <tr>
      <td><code>is_test_file</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@package.declaration.name.is_test_file</code><br>Es true si el archivo de código es un archivo de test, de lo contrario es false.</td>
    </tr>
    <tr>
      <td><code>url</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@package.declaration.name.url</code><br>URL para visualizar el archivo en línea (por ejemplo, en GitHub), donde se resalta la localización del código.</td>
    </tr>
    <tr>
      <td><code>symbol</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@package.declaration.name.symbol</code></td>
    </tr>
  </tbody>
</table>

#### Versión

Versión declarada del elemento principal raíz.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>filename</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@package.declaration.version.filename</code><br>Nombre del archivo donde está declarada la versión del paquete principal raíz.</td>
    </tr>
    <tr>
      <td><code>line_start</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@package.declaration.version.line_start</code><br>Número de línea en la que empieza la declaración de la versión del paquete principal raíz en el archivo.</td>
    </tr>
    <tr>
      <td><code>column_start</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@package.declaration.version.column_start</code><br>Posición en la columna donde empieza la declaración de la versión del paquete principal raíz en la línea.</td>
    </tr>
    <tr>
      <td><code>line_end</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@package.declaration.version.line_end</code><br>Número de línea en la que termina la declaración de la versión del paquete principal raíz en el archivo.</td>
    </tr>
    <tr>
      <td><code>column_end</code></td>
      <td>integer</td>
      <td><strong>Path:</strong> <code>@package.declaration.version.column_end</code><br>Posición en la columna donde termina la declaración de la versión del paquete principal raíz en la línea.</td>
    </tr>
    <tr>
      <td><code>is_test_file</code></td>
      <td>boolean</td>
      <td><strong>Path:</strong> <code>@package.declaration.version.is_test_file</code><br>Es true si el archivo de código es un archivo de test, de lo contrario es false.</td>
    </tr>
    <tr>
      <td><code>url</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@package.declaration.version.url</code><br>URL para visualizar el archivo en línea (por ejemplo, en GitHub), donde se resalta la localización del código.</td>
    </tr>
    <tr>
      <td><code>symbol</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@package.declaration.version.symbol</code></td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Secreto" level="h3" id="secret" %}}

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>validation_status</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@secret.validation_status</code><br>Resultado del intento de confirmación de si el secreto está activo. Posibles valoress: <code>valid</code>, <code>invalid</code>, <code>not_validated</code>, <code>validation_error</code>, <code>not_available</code>.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Endpoint de API" level="h3" id="api-endpoint" %}}

Contiene la representación del endpoint HTTP.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>operation_name</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@api_endpoint.operation_name</code><br>Nombre del punto de entrada a un servicio (por ejemplo, <code>http.request</code>, <code>grpc.server</code>).</td>
    </tr>
    <tr>
      <td><code>path</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@api_endpoint.path</code><br>Ruta relativa al endpoint.</td>
    </tr>
    <tr>
      <td><code>method</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@api_endpoint.method</code><br>Método del endpoint (verbo HTTP o método gRPC).</td>
    </tr>
    <tr>
      <td><code>resource_name</code></td>
      <td>string</td>
      <td><strong>Path:</strong> <code>@api_endpoint.resource_name</code><br>Identificación interna del endpoint en el formato <code>{method} {path}</code>.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

## Etiquetas

Metadatos clave-valor en el formato `name:value`. Permite filtrar y agrupar los hallazgos de forma flexible. Debe incluir al menos `source` y `origin`.



## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}