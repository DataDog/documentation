---
code_lang: ruby
code_lang_weight: 30
title: Requisitos de compatibilidad de Ruby
type: multi-code-lang
---
## Las capacidades de Code Security admiten {#code-security-capabilities-support}

Las siguientes capacidades de Code Security son compatibles con la biblioteca de Ruby, para la versión del tracer especificada:

| Capacidad de Code Security                    | Versión mínima del tracer de Ruby |
| ------------------------------------------- | ----------------------------|
| Software Composition Analysis (SCA) en tiempo de ejecución | 1.11.0                      |
| Análisis de código en tiempo de ejecución (IAST)                | no es compatible               |

<div class="alert alert-info">Si desea ver soporte añadido para cualquiera de las capacidades no compatibles, o para su framework de Ruby, ¡háganoslo saber! Complete <a href="https://forms.gle/gHrxGQMEnAobukfn7">este breve formulario para enviar los detalles</a>.</div>

### Tipos de despliegue compatibles {#supported-deployment-types}
| Tipo              | Software Composition Analysis (SCA) en tiempo de ejecución | Análisis de código en tiempo de ejecución (IAST)        |
|------------------ | ------------------------------------------- | ----------------------------------- |
| Docker            | <i class="icon-check-bold"></i>             | <i class="icon-check-bold"></i>     |
| Kubernetes        | <i class="icon-check-bold"></i>             | <i class="icon-check-bold"></i>     |
| Amazon ECS        | <i class="icon-check-bold"></i>             | <i class="icon-check-bold"></i>     |
| AWS Fargate       | <i class="icon-check-bold"></i>             | Vista previa (1.15.0)                    |
| AWS Lambda        |                                             |                                     |

## Compatibilidad de lenguaje y framework {#language-and-framework-compatibility}

**Intérpretes de Ruby compatibles**
La biblioteca de Datadog para Ruby admite la versión más reciente de la gema para los siguientes intérpretes de Ruby:

- [MRI][2] versiones 2.5 y posteriores

Estos son compatibles con las siguientes arquitecturas:
- Linux (GNU) x86-64, aarch64
- Alpine Linux (musl) x86-64, aarch64
- macOS (Darwin) x86-64, arm64

### Servidores web compatibles {#supported-web-servers}
- Etiquetas para la solicitud HTTP (código de estado, método, etc.)
- Rastreo distribuido para ver los flujos de ataque a través de sus aplicaciones

##### Notas sobre la capacidad de Code Security {#code-security-capability-notes}
- **Software Composition Analysis (SCA) en tiempo de ejecución** es compatible con todos los marcos de trabajo.
- **Análisis de código en tiempo de ejecución (IAST)** no es compatible

### Compatibilidad con marcos de trabajo de red {#networking-framework-compatibility}

##### Notas sobre la capacidad de Code Security {#code-security-capability-notes-1}
- **Software Composition Analysis (SCA) en tiempo de ejecución** es compatible con todos los marcos de trabajo.
- **Análisis de código en tiempo de ejecución (IAST)** no es compatible

### Compatibilidad con Datastore {#data-store-compatibility}

**El rastreo de Datastore proporciona:**

- información de consultas (por ejemplo, una cadena de consulta saneada)
- captura de errores y traza de pila

##### Notas sobre la capacidad de Code Security {#code-security-capability-notes-2}
- **Software Composition Analysis (SCA) en tiempo de ejecución** es compatible con todas las bases de datos.
- **Análisis de código en tiempo de ejecución (IAST)** no es compatible

[1]: /es/tracing/trace_collection/compatibility/ruby/
[2]: https://www.ruby-lang.org/