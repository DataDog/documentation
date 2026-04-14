---
further_reading:
- link: /service_management/incident_management/describe/#response-team
  tag: Documentación
  text: Describir una incidencia
title: Tipos de respondedores
---

## Información general

La asignación de funciones específicas, como encargado de la incidencia o jefe de comunicaciones, permite una respuesta más organizada y estructurada. Las notificaciones y las responsabilidades pueden dirigirse inmediatamente a las personas adecuadas, lo que ayuda a reducir la confusión y los retrasos. 

La configuración de los tipos de respondedores te ofrece la posibilidad de crear funciones personalizadas para [asignar a tus respondedores de incidencias][1] y especificar si esas funciones deben ser desempeñadas por una o varias personas por incidencia. Estos roles no están relacionados con el sistema de [control de acceso basado en roles (RBAC)][2]. 

## Roles

Los tipos de respondedores permiten a tus respondedores entender cuáles son sus responsabilidades en una incidencia basándose en las definiciones de tu propio proceso de respuesta a incidencias. Por defecto hay dos roles:

1. `Incident Commander`: la persona responsable de dirigir el equipo de respuesta 
2. `Responder`: una persona que contribuye activamente a investigar una incidencia y resolver su problema subyacente

**Nota:** El tipo de respondedor `Incident Commander` aparece en la configuración de la incidencia para que puedas personalizar su descripción. `Incident Commander` no se puede eliminar como tipo de respondedor, ni se puede cambiar su nombre o estado como `One person role`. El rol `Responder` es un rol genérico de reserva si a un respondedor no se le asigna otro rol y no aparece en la configuración de la incidencia.

## Crear un tipo de respondedor

1. Navega a [**Incident Settings > Responder Types**][3] (Configuración de la incidencia > Tipos de respondedor).
1. Haz clic en **+ Add Responder Type** (+ Añadir tipo de respondedor), debajo de la tabla.
2. Dale un nombre a tu nuevo tipo de persona involucrada.
3. Elija si el tipo de persona involucrada es un `One person role` o un `Multi person role`. Un `One person role` puede ser ocupado por una sola persona por incidencia, mientras que un `Multi person role` puede ser ocupado por un número ilimitado de personas por incidencia.
4. Asigna una descripción al tipo de persona involucrada. Esta descripción aparece en la interfaz de usuario para seleccionar un rol que asignar a tus compañeros de equipo.
5. Haz clic en **Save** (Guardar).

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/service_management/incident_management/incident_details/#response-team-section
[2]: /es/account_management/rbac/?tab=datadogapplication#pagetitle
[3]: https://app.datadoghq.com/incidents/settings#Responder-Types