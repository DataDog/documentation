---
further_reading:
- link: /monitors/notify/
  tag: Documentación
  text: Más información sobre notificaciones de monitor
title: Prácticas recomendadas para los mensajes de notificación
---

## Información general

Los monitores son esenciales para el buen funcionamiento de las empresas y los sistemas. Cuando un monitor genera alertas, esto indica que es necesario prestar atención. Sin embargo, detectar un problema es solo la punta del iceberg, es la notificación lo que repercute en gran medida en el tiempo de resolución.

Los mensajes de notificación tienden un puente entre tu sistema de monitorización y los responsables de resolver los problemas. Los mensajes poco claros o mal redactados pueden causar confusión, ralentizar los tiempos de respuesta o dejar problemas sin resolver, mientras que un mensaje claro y procesable ayuda a tu equipo a comprender rápidamente lo que está mal y qué hacer a continuación.

Utiliza esta guía para mejorar tus mensajes en notificación y aprender sobre:
- Principios clave de una comunicación eficaz
- Errores comunes que hay que evitar
- Consejos para crear mensajes que den resultados

Desde los responsables de producto hasta los desarrolladores, este recurso garantiza que las notificaciones mejoren la fiabilidad del sistema y la eficacia del equipo.

## Configuración de notificaciones

El primer paso es configurar la notificación con los campos obligatorios:
* [**Nombre del monitor**](#name), que es también el título de la notificación.
* [**Mensaje del monitor**](#message), que es el cuerpo de la notificación.

{{< img src="/monitors/guide/notification_message_best_practices/monitor_notification_message.png" alt="Configuración de los mensajes de notificación de un monitor" style="width:100%;" >}}

### Nombre

Crea el nombre del monitor de modo que incluya información clave para que la persona responsable comprenda rápidamente el contexto de la alerta. El título del monitor debe ofrecer una descripción clara y concisa de la señal, incluyendo:

* El modo o los modos de fallo o las métricas divergentes
* El recurso que se ve afectado (como centro de datos, Kubernetes clúster, host o servicio)


| Necesita revisión | Título mejorado                          | 
| -------------- | --------------------------------------- | 
| Uso de la memoria   | Elevado uso de memoria en {{pod\_name.name}} |

Si bien ambos ejemplos se refieren a un monitor de consumo de memoria, el título mejorado ofrece una representación exhaustiva con un contexto esencial para una investigación focalizada.

### Mensaje

Las personas responsables de guardia confían en el cuerpo de la notificación para comprender las alertas y actuar en consecuencia. Escribe mensajes concisos, precisos y legibles para ofrecer una mayor claridad.

- Indica con precisión lo que está fallando y enumerar las principales causas raíz.
- Añade un runbook de soluciones para obtener una guía de resolución rápida.
- Incluye enlaces a las páginas pertinentes para ver claramente los siguientes pasos.
- Asegúrate de que las notificaciones se envían a los destinatarios adecuados, ya sea como notificaciones directas mediante correo electrónico o a través de [manejadores de integraciones][1] (como Slack).

Lee las siguientes secciones para explorar las funciones avanzadas que pueden mejorar aún más tus mensajes de monitor.

#### Variables

Las variables de mensajes de monitor son parámetros dinámicos que permiten personalizar los mensajes de notificación con información contextual en tiempo real. Utiliza estas variables para mejorar la claridad de los mensajes y proporcionar un contexto detallado. Existen dos tipos de variables:

| Tipo de variable | Descripción | 
|---------------------|-----------------------------------------------------------------------------------------------------| 
| [Condicional](#conditional-variables) | Utiliza la lógica "if-else" para adaptar el contexto del mensaje en función de ciertas condiciones como el estado del monitor. | 
| [Plantilla](#template-variables) | Enriquece las notificaciones de monitor con información contextual. |

Las variables son especialmente importantes en un monitor de **alerta múltiple**. Cuando se activan, necesitas saber qué grupo es el responsable. Por ejemplo, la monitorización del uso de la CPU por contenedor, agrupado por host. Una variable valiosa es {{host.name}}, que indica qué host activó la alerta.

{{< img src="/monitors/guide/notification_message_best_practices/query_parameters.png" alt="Ejemplo de consulta de monitor de la métrica container.cpu.usage por host" style="width:100%;" >}}

#### Variables condicionales

Estas variables te permiten adaptar el mensaje de notificación implementando una lógica de bifurcación basada en tus necesidades y casos de uso. Utiliza variables condicionales para notificar a diferentes personas/grupos en función del grupo que activó la alerta.

{{< code-block lang="text" >}}
{{#is_exact_match "role.name" "network"}}
  # El contenido muestra si el host que activó la alerta contiene `network` en el nombre del rol y sólo notifica a @network-team@company.com.
  @network-team@company.com
{{/is_exact_match}}
{{< /code-block >}}

Puedes recibir una notificación si el grupo que activó la alerta contiene una cadena específica.  

{{< code-block lang="text" >}}
{{#is_match "datacenter.name" "us"}}
  # El contenido muestra si la región que activó la alerta contiene `us` (como us1 o us3).
  @us.datacenter@company.com 
{{/is_match}}
{{< /code-block >}}

Para obtener más información y ejemplos, consulta la documentación sobre [variables condicionales][2]. 

#### Variables de plantilla

Añade variables de plantilla de monitor para acceder a los metadatos que provocaron la alerta de tu monitor, como {{value}}, pero también a la información relacionada con el contexto de la alerta.

Por ejemplo, si quieres ver el nombre de host, la IP y el valor de la consulta del monitor:
```
The CPU for {{host.name}} (IP:{{host.ip}}) reached a critical value of {{value}}.
```

Para ver la lista de variables de plantilla disponibles, consulta la [documentación][3].

También puedes utilizar variables de plantilla para crear enlaces dinámicos y manejadores que dirijan automáticamente tus notificaciones.
Ejemplo de manejadores:  
```
@slack-{{service.name}} There is an ongoing issue with {{service.name}}.
```

Genera el siguiente resultado cuando el service:ad-server del grupo activa:
```
@slack-ad-server There is an ongoing issue with ad-server.
```
Ejemplo de enlaces:  
```
[https://app.datadoghq.com/dash/integration/system_overview?tpl_var_scope=host:{{host.name](https://app.datadoghq.com/dash/integration/system_overview?tpl_var_scope=host:{{host.name)}}
```

## Ejemplo de mensaje de notificación que cumple las prácticas recomendadas

**\#\# ¿Qué está pasando?**  
El uso de CPU en {{host.name}} superó el umbral definido.

Uso actual de CPU: {{value}}  
Umbral: {{threshold}}  
Hora: {{last\_triggered\_at\_epoch}}

**\#\# Impacto**  
1\. Los clientes experimentan retrasos en el sitio web.  
2\. Tiempos de espera y errores.

**\#\# ¿Por qué?**  
Puede haber varias razones por las que el uso de CPU superó el umbral:

* Aumento del tráfico  
* Problemas de hardware
* Ataque externo

**\#\# ¿Cómo solucionar/resolver el problema?**   
1\. Analiza la carga de trabajo para identificar los procesos con un uso intensivo de CPU.   
  a. para OOM \- \[increase pod limits if too low\](***\<Link\>***)  
2\. Incrementa la capacidad de {{host.name}} añadiendo más réplicas:   
  a. directamente: ***\<Code to do so\>***   
  b. cambiar la configuración a través de \[add more replicas runbook\](***\<Link\>***) 
3\. Comprueba si existen \[Kafka issues\](***\<Link\>***)  
4\. Comprueba si hay otras interrupciones/incidentes (intentos de conexión)


**\#\# Enlaces relacionados**  
\* \[Dashboard de resolución de errores\](***\<Link\>***)  
\* \[Dashboard de la aplicación\](***\<Link\>***)  
\* \[Logs\](***\<Link\>***)  
\* \[Infraestructura\](***\<Link\>***)  
\* \[Información general del pipeline\](***\<Link\>***)  
\* \[Documentación de la aplicación\](***\<Link\>***)  
\* \[Modos de fallo\](***\<Link\>***)  


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/monitors/notify/#integrations
[2]: /es/monitors/notify/variables/?tab=is_alert#conditional-variables
[3]: /es/monitors/notify/variables/?tab=is_alert#template-variables