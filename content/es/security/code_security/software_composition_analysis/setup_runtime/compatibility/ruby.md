---
code_lang: ruby
code_lang_weight: 30
title: Requisitos de compatibilidad de Ruby
type: lenguaje de código múltiple
---

## Soporte de las capacidades de Code Security

Las siguientes capacidades de Code Security son compatibles con la librería Ruby, para la versión del rastreador especificado:

| Capacidad de Code Security                    | Versión mínima de rastreador Ruby |
| ------------------------------------------- | ----------------------------|
| Runtime Software Composition Analysis (SCA) | 1.11.0                      |
| Runtime Code Analysis (IAST)                | no compatible               |

<div class="alert alert-info">Si quieres que agreguemos la compatibilidad para alguna función que aún no es compatible, háznoslo saber. Rellena <a href="https://forms.gle/gHrxGQMEnAobukfn7">este breve formulario para enviarnos tu información</a>.</div>

### Tipos de despliegue compatibles
| Tipo              | Runtime Software Composition Analysis (SCA) | Runtime Code Analysis (IAST)        |
|------------------ | ------------------------------------------- | ----------------------------------- |
| Docker            | <i class="icon-check-bold"></i>             | <i class="icon-check-bold"></i>     |
| Kubernetes        | <i class="icon-check-bold"></i>             | <i class="icon-check-bold"></i>     |
| Amazon ECS        | <i class="icon-check-bold"></i>             | <i class="icon-check-bold"></i>     |
| AWS Fargate       | <i class="icon-check-bold"></i>             | Vista previa (1.15.0)                    |
| AWS Lambda        |                                             |                                     |

## Compatibilidad con lenguajes y marcos

**Intérpretes Ruby compatibles**
La librería Ruby de Datadog es compatible con el último gem para los siguientes intérpretes Ruby:

- [MRI][2] versiones 2.1 a 3.1

Son compatibles con las siguientes arquitecturas:
- Linux (GNU) x86-64, aarch64
- Alpine Linux (musl) x86-64, aarch64
- macOS (Darwin) x86-64, arm64

### Servidores web compatibles
- Etiquetas (tags) para la solicitud HTTP (código de estado, método, etc.)
- Rastreo distribuido para visualizar flujos (flows) de ataques en tus aplicaciones

##### Notas sobre la capacidad de Code Security
- **Runtime Software Composition Analysis (SCA)** es compatible con todos los marcos.
- **Runtime Code Analysis (IAST)** no es compatible.

### Compatibilidad de marcos de red

##### Notas sobre la capacidad de Code Security
- **Runtime Software Composition Analysis (SCA)** es compatible con todos los marcos.
- **Runtime Code Analysis (IAST)** no es compatible.

### Compatibilidad con almacenes de datos

**El rastreo de almacenes de datos proporciona:**

- información de consulta (por ejemplo, una cadena de consulta desinfectada)
- captura de errores y stacktraces

##### Notas sobre la capacidad de Code Security
- **Runtime Software Composition Analysis (SCA)** es compatible con todas las bases de datos.
- **Runtime Code Analysis (IAST)** no es compatible.

[1]: /es/tracing/trace_collection/compatibility/ruby/
[2]: https://www.ruby-lang.org/
