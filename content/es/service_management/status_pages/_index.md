---
further_reading:
- link: service_management/incident_management/
  tag: Documentación
  text: Obtén más información sobre la gestión de incidencias
- link: service_management/on-call/
  tag: Documentación
  text: Más información sobre la programación de guardias
title: Páginas de estado
---

{{< callout url="https://www.datadoghq.com/product-preview/status-pages/">}}
Páginas de estado está en Vista Previa.
{{< /callout >}}

## Información general

{{< img src="service_management/status_pages/shopist_status_page_example.png" alt="Ejemplo de page (página) de estado en la que se muestran componentes de servicios con su estado actual y actualizaciones recientes de incident (incidente)" style="width:100%;" >}}

Las páginas de estado forman parte de la serie de respuestas a incidents (incidentes) de Datadog, junto con On-Call e Incident Management. Permiten a tu equipo comunicar de forma proactiva la **disponibilidad del servicio**, **incidents (incidentes)** y **actualizaciones de mantenimiento** a clientes o partes interesadas internas a través de una page (página) web compartible.

Utiliza las páginas de estado para:

* Compartir la disponibilidad de sistemas y funciones críticos
* Comunicar claramente las interrupciones del servicio durante los incidents (incidentes)
* Reducir el volumen de asistencia entrante con actualizaciones proactivas

## Configurar permisos 

Hay tres permisos RBAC que son relevantes para las páginas de estado. Los usuarios con el rol de administrador de Datadog tienen todos los permisos necesarios.

Para crear, actualizar o publicar páginas de estado, debes tener permisos RBAC `status_pages_settings_read`, `status_pages_settings_write` y `status_pages_incident_write`. Para obtener más información, consulta [Control de acceso][1].

| Nombre | Descripción | Función predeterminada |
| :---- | :---- | :---- |
| Configuración de lectura de las páginas de estado (`status_pages_settings_read`) | Mira la lista de páginas de estado, la configuración de cada página de estado, sus incidents (incidentes) y las páginas de estado privadas lanzadas. | Rol de sólo lectura de Datadog |
| Configuración de escritura de las páginas de estado (`status_pages_settings_write`) | Crea e inicia nuevas páginas de estado y configure los parámetros de las páginas de estado. | Rol de administrador de Datadog |
| Escritura de incidents (incidentes) de páginas de estado (`status_pages_incident_write`) | Publicar y actualizar incidents (incidentes). | Rol de administrador de Datadog |

## Crear una página de estado

1. En Datadog, ve a [**Service Management (gestión de servicios) > Páginas de estado**][2].  
1. Haz clic en **Crear página de estado** y sigue el flujo de incorporación:

   | Campo             | Descripción |
   | ----------------- | ----------- |
   | **Visibilidad** | Selecciona quién puede acceder a la Page (página): <br>- **Pública** - Cualquiera con el enlace puede ver <br>- **Privada** - Sólo los usuarios autentificados en tu organización Datadog pueden ver |
   | **Nombre de page (página)** | Se muestra como encabezado de la page (página) (si no se carga ningún logotipo). <br>*Ejemplo: Acme Cloud Platform* |
   | **Prefijo de dominio** | Se utiliza como prefijo de subdominio de tu page (página) de estado. <br>*Ejemplo: shopist → shopist.status.datadoghq.com* <br>- Debe ser **globalmente único** <br>- En minúsculas, alfanumérico y con guión <br>- Puede afectar a los enlaces si se cambia posteriormente |.
   | **Logotipo de la empresa o Favicon** *(opcional)* | Carga un logotipo o favicon para personalizar la apariencia de tu page (página) de estado |
1. (Opcional) [Añadir componentes](#add-components) para mostrar el estado de los servicios individuales.
1. Haz clic en **Guardar parámetros**
   <div class="alert alert-info">Una página de estado <strong>no está en tiempo real</strong> después de guardar tus parámetros. Para que la page (página) esté disponible, <a href="#publish-your-status-page">publica tu página de estado</a>.</div>

## Añadir componentes

{{< img src="/service_management/status_pages/status_page_components.png" alt="Configuración de componentes de la página de estado con el panel de vista previa en tiempo real" style="width:100%;" >}}

Los componentes son los bloques de construcción de tu Page (página) de estado. Cada uno de ellos representa un servicio o función que les interesa a los usuarios. Algunos ejemplos de componentes son:
- Puerta de acceso de API  
- Dashboard web  
- Clúster de bases de datos  
- Servicios para la región de EE.UU.

Puedes añadir componentes a tu page (página) de estado, ya sea en la configuración inicial o a través de los parámetros de la página de estado:

1. Desde tu page (página) de estado, haz clic en **Configuración** y selecciona la pestaña **Componentes**.
1. Crea componentes individuales o un grupo de componentes relacionados. Puede asociar [incidentes](#add-an-incident) a estos componentes para reflejar el efecto en tu page (página) de estado.
1. Selecciona un tipo de visualización:  
   1. Barras y porcentaje de tiempo de actividad  
   1. Sólo barras  
   1. Sólo nombre del componente  

## Publica tu page (página) de estado

Después de guardar la configuración de tu Page (página) de estado, haz clic en **Lanzar page (página) de estado** para que la page (página) esté disponible en tu URL.

Si has seleccionado:
- **Pública**, la page (página) es inmediatamente accesible a todos los visitantes.  
- **Privada**, el acceso está limitado a los usuarios autentificados en tu organización Datadog.

## Añade un incident (incidente)

<div class="alert alert-warning">Los incidents (incidentes) publicados en las páginas de estado no son los mismos que los incidentes declarados en Incident Management de Datadog. Los incidentes de las páginas de estado son mensajes cuidadosamente elaborados que se publican en un sitio web público para comunicar el estado del sistema y pueden englobar varios incidentes internos de Incident Management.</div>

Cuando surja un problema, puedes comunicarlo claramente a través de tu página de estado.

1. Desde una página de estadeo, haz clic en **Publicar incident (incidente)** para abrir un modal "Publicar incident (incidente) de página de estado" y proporcionar:
   | Campo | Descripción |
   | ---- | ---- |
   | **Título** | Descripción breve y clara del incident (incidente) <br> *Ejemplo: Aumento del porcentaje de errores en la región de EE.UU.* |
   | **Estado** | Estado actual del incident (incidente): <br>- Investigando <br>- Identificado <br>- Monitorizando <br>- Resuelto |
   | **Mensaje** *(opcional)* | Detalles adicionales para tus usuarios <br>*Ejemplos: causa conocida, tiempo de resolución esperado* |
   | **Componentes afectados** | Uno o más componentes afectados por el incident (incidente) |
   | **Efecto** | Nivel de efecto por componente: <br>- Operativo <br>- Rendimiento degradado <br>- Interrupción parcial <br>- Interrupción grave |
1. Haz clic en **Publicar incident (incidente)**.

{{< img src="/service_management/status_pages/publish_status_page_incident.png" alt="Captura de pantalla del modal de creación del incident (incidente) de la página de estado con los campos completados" style="width:70%;" >}}

Tras la publicación de un incident (incidente), el incident (incidente):
- Aparece en la lista de páginas de estado en **Incidentes Activos**.
- Actualiza las barras de tiempo de actividad de los componentes afectados.
- Es visible en la línea de tiempo del historial del incident (incidente).

Puedes publicar **actualizaciones** a lo largo del tiempo para mantener informados a los usuarios y luego marcar el incident (incidente) como **Resuelto**.

{{< img src="/service_management/status_pages/live_status_page_incident_history.mp4" alt="Video en el que se muestra la línea de tiempo del historial del incident (incidente) en una página de estado en tiempo real con los incidentes y actualizaciones publicados" video=true >}}

## Configurar un dominio personalizado

Para que coincida con tu marca, tienes la opción de asignar tu página de estado a un dominio personalizado como `status.acme.com`.

1. Desde tu página de estado, haz clic en **Configuración**.  
1. Selecciona **Dominio personalizado**.
1. Sigue las instrucciones para introducir tu dominio y añadir registros DNS.  
1. Datadog detecta automáticamente la configuración DNS y proporciona un certificado SSL.  

<div class="alert alert-warning">Los dominios personalizados requieren acceso a tu proveedor de DNS para añadir un registro CNAME o A.</div>

**Notas**:

- La propagación de DNS puede tardar varios minutos.
- Puedes volver al dominio predeterminado Datadog en cualquier momento.
- Asegúrate de que los cambios de DNS los realice una persona con acceso al registrador de tu dominio.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/account_management/rbac/
[2]: https://app.datadoghq.com/status-pages