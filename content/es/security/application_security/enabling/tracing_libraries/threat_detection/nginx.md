---
aliases:
- /security_platform/application_security/getting_started/nginx
- /security/application_security/getting_started/nginx
- /security/application_security/enabling/nginx
code_lang: nginx
code_lang_weight: 50
further_reading:
- link: https://github.com/DataDog/nginx-datadog/
  tag: Código fuente
  text: código fuente de la integración de nginx
- link: /security/default_rules/?category=cat-application-security
  tag: Documentación
  text: Normas de Application Security Management predefinidas
- link: /security/application_security/troubleshooting
  tag: Documentación
  text: Solucionar problemas de Application Security Management
title: Habilitación de ASM para Nginx
type: multi-code-lang
---

El módulo de rastreo nginx de Datadog tiene compatibilidad experimental para la detección de amenazas y el bloqueo.

## Habilitación de la detección de amenazas
### Para empezar

1. Verifica que la compilación nginx se realizó con el indicador
   `--with-threads`. La mayoría de las distribuciones incluyen este indicador por defecto.
   Para verificar si la instalación nginx se compiló con compatibilidad de subprocesos, ejecuta la línea `nginx
   -V` and check the `configure arguments` line. Si no encuentras
   `--with-threads` en la salida, deberás volver a compilar nginx con este indicador
   habilitado. Para obtener más información sobre cómo compilar nginx a partir de fuentes, consulta la
   [documentación de nginx][3].

2. **Actualiza tu módulo de biblioteca de rastreo nginx** al menos a la versión 1.2.0. Visita
   la [página de versiones de GitHub][2] y selecciona el artefacto nombrado según el
   patrón "ngx_http_datadog_module-appsec-&lt;amd64/arm64&gt;-&lt;nginx
   version&gt;.so.tgz". Ten en cuenta que este artefacto incluye "appsec" en el nombre.

3. **Habilita ASM en la configuración nginx**.
   Necesitas:
   * definir uno o más grupos de subprocesos con la directiva [`thread_pool`][4],
   * activar explícitamente AppSec con [`datadog_appsec_enabled`][5] y
   * asignar solicitudes a un grupo o grupos de subprocesos definidos con la directiva
     [`datadog_waf_thread_pool_name`][6].

   Por ejemplo:

   ```nginx
   load_module /path/to/ngx_http_datadog_module.so;
   thread_pool waf_thread_pool threads=4 max_queue=128;
   http {
     datadog_appsec_enabled on;
     datadog_waf_thread_pool_name waf_thread_pool;
   }
   ```

   Para obtener más información, consulta la [documentación de referencia][3].

{{% appsec-getstarted-2-plusrisk %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="Vídeo que muestra el explorador de señales y detalles, y el explorador de vulnerabilidades y detalles." video="true" >}}

## Limitaciones

A partir de la versión 1.2.0, la funcionalidad disponible tiene las siguientes limitaciones importantes:

* El cuerpo de la solicitud no se inspecciona, independientemente de su tipo de contenido.

- No existe configuración remota para AppSec. En consecuencia, AppSec excluye la activación con 1 clic (AppSec debe habilitarse o deshabilitarse explícitamente en la configuración nginx). Las reglas no pueden actualizarse/habilitarse/deshabilitarse y se impide el bloqueo de usuarios por dirección IP, ya que la lista no puede transmitirse al módulo nginx.
* No es posible bloquear la solicitud basándose en las características de la
  respuesta, como su código de estado, encabezados o cuerpo.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/nginx-datadog/blob/master/doc/API.md
[2]: https://github.com/DataDog/nginx-datadog/releases
[3]: https://nginx.org/en/docs/configure.html
[4]: https://nginx.org/en/docs/ngx_core_module.html#thread_pool
[5]: https://github.com/DataDog/nginx-datadog/blob/master/doc/API.md#datadog_appsec_enabled-appsec-builds
[6]: https://github.com/DataDog/nginx-datadog/blob/master/doc/API.md#datadog_waf_thread_pool_name-appsec-builds