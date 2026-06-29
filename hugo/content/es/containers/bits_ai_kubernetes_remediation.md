---
description: Detectar y corregir automáticamente los errores de Kubernetes con Bits
  AI Kubernetes Remediation
further_reading:
- link: https://www.datadoghq.com/blog/kubernetes-active-remediation-ai/
  tag: blog
  text: Acelerar la resolución de problemas de Kubernetes con soluciones guiadas por
    IA
title: Bits AI Kubernetes Remediation
---

Bits AI Kubernetes Remediation analiza y corrige errores de Kubernetes en tu infraestructura.

Se admiten los siguientes errores de Kubernetes:
- `CrashLoopBackOff`
- `ErrImagePull`
- `ImagePullBackOff`
- `OOMKilled`
- `CreateContainerError`
- `CreateContainerConfigError`

## Utilización

Puedes iniciar Bits AI Kubernetes Remediation desde varias localizaciones dentro de Datadog:
- **Desde un monitor de Kubernetes**: En la sección _Troubleshooting_ (Solucionar problemas), selecciona una carga de trabajo en _Problematic Workloads_ (Cargas de trabajo problemáticas).
- **Desde [Kubernetes Explorer][2]**: Pasa el cursor sobre un estado de pod con un error para ver más información sobre la alerta y la(s) carga(s) de trabajo afectadas, y haz clic en _Start Remediation_ (Iniciar corrección).
- **Desde la pestaña [Kubernetes Remediation][1]**: Selecciona una carga de trabajo de la lista.

Cualquiera de estas acciones abre un panel lateral de Remediation que muestra:

- Una explicación de la causa raíz basada en la inteligencia artificial, a partir de la telemetría recopilada y los patrones conocidos
- Pasos a seguir recomendados, que puedes [realizar directamente desde Datadog](#remediate-from-datadog)
- Información relacionada en un marco de tiempo ajustable: despliegues recientes, logs de error, eventos Kubernetes, etc., incluidas métricas relevantes basadas en el tipo de problema específico

{{< img src="containers/remediation/side_panel2.png" alt="Panel lateral de Remediation abierto para una carga de trabajo con un error CrashLoopBackOff. Muestra una sección What Happened (¿Qué sucedió?) con una explicación de Bits AI de la causa raíz del error. Más abajo, una sección con los pasos a seguir recomendados, donde el usuario puede inspeccionar el manifiesto de la carga de trabajo. También se muestran las instrucciones paso a paso de una corrección sugerida." style="width:80%;" >}}

### Corregir desde Datadog

{{< callout url="https://www.datadoghq.com/product-preview/kubernetes-remediation/"
 btn_hidden="false" header="Únete a la vista previa">}}
Las correcciones automatizadas de Bits AI Kubernetes Remediation están en vista previa. Para inscribirte, haz clic en <strong>Request Access</strong> (Solicitar acceso) y rellena el formulario.
{{< /callout >}}

Si tus repositorios están [conectados a Datadog][4] y un error puede corregirse cambiando el código en uno de estos repositorios conectados, puedes utilizar Bits AI para realizar la acción de corrección directamente desde Datadog. Para otras situaciones problemáticas, Bits AI proporciona una lista detallada de los pasos a seguir.

{{% collapse-content title="Ejemplo: Aumentar el límite de memoria para un despliegue" level="h4" expanded=true id="example-pr" %}}

{{< img src="containers/remediation/bitsai_action2.mp4" alt="En un panel lateral de Remediation, la sección Recommended Next Steps (Pasos a seguir recomendados) sugiere al usuario 'aumentar el límite de memoria'. El usuario ingresa un nuevo valor de límite de memoria, de 10 a 20 mebibytes. Al hacer clic en Fix with Bits AI (Corregir con Bits AI), se abre un cuadro de diálogo que invita al usuario a seleccionar un repositorio conectado." video="true" style="width:80%;" >}}

Cuando un pod se termina porque el uso de memoria excede su límite, puedes solucionar el error aumentando el límite de memoria de tu contenedor.

1. Haz clic en **Edit Memory Limit** (Editar límite de memoria).
2. Ajusta tu límite para que sea superior al que utiliza normalmente tu contenedor.
3. Haz clic en **Fix with Bits AI** (Corregir con Bits AI).
4. En la siguiente página, selecciona el repositorio donde está definido tu despliegue y revisa los cambios propuestos. Haz clic en **Fix with Bits AI** (Corregir con Bits AI) para crear una solicitud pull.
5. Se te redirige a una [Sesión de código][3] de Bits, donde puedes verificar que el Bits AI Dev Agent ha identificad el archivo de configuración específico donde están definidos tus límites de memoria. Haz clic en **Create Pull Request** (Crear solicitud pull) para iniciar la creación de la solicitud pull.
6. Haz clic en **View Pull Request** (Ver solicitud pull) para ver la solicitud pull en GitHub.
{{% /collapse-content %}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/orchestration/remediation
[2]: https://app.datadoghq.com/orchestration/explorer/pod
[3]: https://app.datadoghq.com/code?tab=my-sessions
[4]: https://docs.datadoghq.com/es/integrations/guide/source-code-integration/?tab=githubsaasonprem#connect-your-git-repositories-to-datadog