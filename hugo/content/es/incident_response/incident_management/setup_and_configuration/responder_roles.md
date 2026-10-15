---
aliases:
- /es/incident_response/incident_management/setup_and_configuration/responder_types/
- /es/service_management/incident_management/incident_settings/responder_types/
- /es/incident_response/incident_management/incident_settings/responder_types
further_reading:
- link: /incident_response/incident_management/investigate/describe/#response-team
  tag: Documentación
  text: Describa un incidente
title: Roles de respondedor
---
## Descripción general {#overview}

Asignar roles específicos, como Comandante de incidentes o Líder de comunicaciones, permite una respuesta más organizada y estructurada. Las Notifications y responsabilidades pueden dirigirse a las personas adecuadas de inmediato, lo que ayuda a reducir la confusión y los retrasos.

La configuración de roles de respondedor le permite crear roles personalizados para [asignar a sus respondedores de incidentes][1] y especificar si esos roles deben ser ocupados por una persona o por varias personas por incidente. Estos roles no están relacionados con el sistema de [Access Control basado en roles (RBAC)][2].

## Roles {#roles}

Los roles de respondedor ayudan a sus respondedores a comprender cuáles son sus responsabilidades en un incidente según las definiciones de su propio proceso de respuesta a incidentes. De forma predeterminada, existen dos roles:

1. `Incident Commander` - La persona responsable de dirigir el equipo de respuesta
2. `Responder` - Una persona que contribuye activamente a investigar un incidente y a resolver su problema subyacente

**Nota:** El rol de respondedor `Incident Commander` aparece en la Configuración de incidentes para que pueda personalizar su descripción. `Incident Commander` no puede eliminarse como rol de respondedor, ni puede cambiarse su nombre o su estado como `One person role`. El `Responder` rol es un rol genérico de respaldo si a un respondedor no se le asigna otro rol diferente, y no aparece en la Configuración de incidentes.

## Crear un rol de respondedor {#create-a-responder-role}

1. Vaya a [**Configuración de incidentes > Roles de respondedor**][3].
1. Haga clic en **+ Agregar rol de respondedor**, debajo de la tabla.
2. Asigne un nombre a su nuevo rol de respondedor.
3. Elija si el rol de respondedor es `One person role` o `Multi person role`. Un `One person role` puede ser ocupado por una sola persona por incidente, mientras que un `Multi person role` puede ser ocupado por un número ilimitado de personas por incidente.
4. Asigne una descripción al rol de respondedor. Esta descripción aparece en la interfaz de usuario para seleccionar un rol que asignar a sus compañeros de equipo.
5. Haga clic en **Guardar**.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/incident_response/incident_management/investigate/response_team
[2]: /es/account_management/rbac/?tab=datadogapplication#pagetitle
[3]: https://app.datadoghq.com/incidents/settings#Responder-Types