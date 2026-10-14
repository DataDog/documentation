---
aliases:
- /es/service_management/on-call/triggering_pages/live_call_routing/
- /es/incident_response/on-call/triggering_pages/live_call_routing/
further_reading:
- link: /incident_response/on-call/
  tag: Documentación
  text: Datadog On-Call
title: Enrutamiento de llamadas en vivo
---
<div class="alert alert-info">
El enrutamiento de llamadas en vivo es proporcionado por Datadog. Para habilitarlo para su organización, comuníquese con <a href="mailto:support@datadoghq.com">Soporte de Datadog</a>. Incluya su caso de uso y el código de país deseado (por ejemplo, <code>+33</code> para Francia).
</div>


## Descripción general {#overview}

El enrutamiento de llamadas en vivo conecta las llamadas telefónicas con su On-Call Team. Cuando alguien llama a su número dedicado, el sistema gestiona la llamada de acuerdo con su configuración.

Datadog On-Call admite dos tipos de enrutamiento:

- **Enrutamiento de llamadas directas**: Conecta a la persona que llama con un respondedor activo, siguiendo la política de escalamiento para el On-Call Team. Permite la coordinación en tiempo real durante incidentes críticos.
- **Enrutamiento de correo de voz**: Solicita a la persona que llama que deje un mensaje de voz, luego convierte el mensaje de voz en una alerta para el On-Call Team. Útil para personas que llaman sin conocimientos técnicos o proveedores externos que necesitan informar problemas sin una conversación en vivo.

## Configuración {#configuration}

### Configuración básica de ruta {#basic-route-settings}

Cada ruta de llamada en vivo incluye:

- **Nombre**: Una etiqueta descriptiva, como "Incidentes de producción" o "Escalamientos de Security".
- **Número de teléfono**: El número dedicado proporcionado por Datadog para esta ruta.
- **Código de región**: La región geográfica del número de teléfono (por ejemplo, `US` para Estados Unidos).
- **Estado activo**: Si la ruta está aceptando llamadas.
- **Tipo de enrutamiento**: Cómo se manejan las llamadas (consulte [Tipos de enrutamiento](#routing-types)).

### Opciones del teclado {#keypad-options}

Las opciones del teclado ofrecen a las personas que llaman un menú cuando marcan su número de enrutamiento.

Puede configurar hasta nueve opciones por ruta. Cada opción asigna una tecla (1-9) a un On-Call Team y activa el proceso de Page de ese equipo. Para mejorar la usabilidad:
- Utilice la opción 1 para el equipo o la ruta de escalamiento más críticos.
- Agrupe los equipos relacionados bajo teclas adyacentes.
- Mantenga las instrucciones del menú concisas y claras.

## Tipos de enrutamiento {#routing-types}

Datadog On-Call admite dos tipos de enrutamiento: enrutamiento de llamadas directas y enrutamiento de correo de voz.

### Enrutamiento de llamadas directas {#direct-call-routing}

En el enrutamiento de llamadas directas, el sistema sigue la política de escalamiento del On-Call Team para conectar a la persona que llama con el primer respondedor disponible.

Los respondedores deben tener números de teléfono válidos que admitan notificaciones de voz en sus perfiles; On-Call omite a cualquier respondedor que no los tenga.

Los respondedores tienen entonces las siguientes opciones:
- Presione `1` para confirmar la llamada.
- Presione `2` para escalarla.
- Presione `3` para resolverlo.

#### Lógica de escalamiento {#escalation-logic}

Para el enrutamiento directo de llamadas, el escalamiento procede de la siguiente manera:

- **Varios respondedores en el mismo nivel**: Se llama a todos los respondedores simultáneamente. El primero en responder es conectado.
- **El respondedor rechaza una llamada**: El sistema escala inmediatamente al siguiente respondedor.
- **El respondedor no tiene número de teléfono**: El sistema omite al respondedor.
- **Solo se define un nivel de escalamiento**: Si el respondedor no está disponible, se informa a la persona que llama que nadie está disponible y la llamada finaliza.
- **Ningún respondedor tiene números de teléfono válidos**: Se informa a la persona que llama que nadie está disponible y la llamada finaliza.

#### Mejores prácticas {#best-practices}

- Utilice políticas de escalamiento de varios niveles para evitar llamadas perdidas.
- Agregue varios respondedores en niveles críticos para obtener redundancia.
- Pruebe su configuración de enrutamiento regularmente:
  - Pruebe cada opción del teclado para verificar que se enrute al equipo correcto.
  - Simule el comportamiento de escalamiento rechazando o no respondiendo una llamada.
  - Verifique que los números de teléfono de los respondedores sean válidos, accesibles y estén configurados con la configuración de correo de voz adecuada.
  - Verifique que las llamadas se conecten exitosamente con los respondedores disponibles.

### Enrutamiento de correo de voz {#voicemail-routing}

En el enrutamiento de correo de voz, se solicita a las personas que llaman que dejen un mensaje de voz.

#### Mejores prácticas {#best-practices-1}

- Confirme que los miembros del equipo tengan configuradas sus preferencias de notificación para recibir Pages.
- Pruebe su configuración de enrutamiento regularmente:
  - Pruebe cada opción del teclado para verificar que se enrute al equipo correcto.
  - Confirme que las grabaciones de correo de voz se capturen correctamente.
  - Verifique que Pages se creen y se envíen a los miembros del equipo correctos.

## Solución de problemas {#troubleshooting}

### Problemas de ruta {#route-issues}

Si su ruta no está aceptando llamadas:
- Confirme que la ruta esté configurada como activa.
- Confirme que el aprovisionamiento esté completo. Si el aprovisionamiento aún está en curso, comuníquese con [Datadog Support][1].
- Verifique que el número de teléfono esté configurado correctamente para esta ruta.

### Problemas con el teclado {#keypad-problems}

Si una opción del teclado no está enrutando las llamadas correctamente:
- Confirme que cada opción del teclado esté vinculada a un equipo On-Call válido.
- Pruebe cada opción individualmente marcando la ruta y presionando la tecla correspondiente.
- Verifique que su sistema telefónico admita la entrada DTMF (tono de marcado), ya que algunos sistemas VoIP la desactivan de forma predeterminada.

### Enrutamiento directo de llamadas: las llamadas no se conectan o no se crea ninguna Page {#direct-call-routing-calls-not-connecting-or-no-page-created}

Si las llamadas no llegan a un respondedor o no se crea ningún Page:
- Confirme que el On-Call Team tenga una política de escalamiento activa con al menos un nivel de escalamiento definido.
- Verifique que todos los respondedores en la política de escalamiento tengan un número de teléfono válido en su perfil. On-Call omite a los respondedores sin un número de teléfono.
- Verifique que el número de teléfono de cada respondedor admita notificaciones por voz, que esté disponible y que no esté bloqueado ni desviado a un destino no disponible.

### Enrutamiento de correo de voz: el correo de voz no se convierte en un Page {#voicemail-routing-voicemail-not-converting-to-a-page}

Si se deja un correo de voz pero no se crea ningún Page:
- Confirme que el tipo de enrutamiento de la ruta esté configurado en **Enrutamiento de correo de voz**, no en **Enrutamiento de llamadas directas**.
- Verifique que el On-Call Team asignado a la ruta tenga una política de escalamiento activa.
- Confirme que los miembros del equipo tengan configuradas las preferencias de notificación para recibir Pages.
- Verifique que la grabación del correo de voz se haya completado correctamente. Las personas que llaman y cuelgan antes del pitido pueden no dejar una grabación que el sistema pueda procesar.

[1]: /es/help/