---
aliases:
- /es/developers/integrations/create-an-integration-detection-rule
description: Aprende a crear una regla de detección Cloud SIEM para tu integración.
further_reading:
- link: https://docs.datadoghq.com/security/cloud_siem/log_detection_rules
  tag: Documentación
  text: Reglas de detección de logs
title: Crear una regla de detección Cloud SIEM
---

## Información general

[Datadog Cloud SIEM (Información de seguridad y gestión de eventos)][1] unifica los equipos de desarrolladores, de operaciones y de seguridad a través de una sola plataforma. Datadog proporciona un conjunto de reglas de detección listas para utilizar para muchas funciones e integraciones. Consulta estas reglas en tu [lista de reglas de detección SIEM][2].

Crea una regla de detección lista para utilizar para ayudar a los usuarios a encontrar información sobre la seguridad a través de tu integración de Datadog. Esta guía muestra los pasos para la creación de una regla de detección Cloud SIEM y las prácticas recomendadas que deben seguirse durante el proceso de creación.

Para crear una integración de Datadog, consulta la sección de [creación de una nueva integración][3].

## Crear una regla de detección
### Crear un esquema JSON para reglas de detección

1. En **Detection Rules** (Reglas de detección), [crea una nueva regla][4].


2. Sigue las [prácticas recomendadas](#configuration-best-practices) de esta guía para configurar tu regla de detección.

3. Haz clic en **Export to JSON** (Exportar a JSON).

4. Guarda el archivo JSON y nómbralo según el título de tu regla de detección. Por ejemplo, `your_integration_name_rule_name.json`.

5. En el archivo JSON de la regla de detección, añade y rellene `partnerRuleId` y elimina el atributo `isEnabled`. Para obtener más información, consulta [Prácticas de configuración recomendadas](#configuration-best-practices).

### Abrir una solicitud de extracción

1. Guarda el archivo JSON de la regla de detección en la carpeta `assets/security` de tu integración.

2. Abre una solicitud de extracción (PR) para actualizar la carpeta de la integración correspondiente en el [repositorio GitHub `integrations-extras`][5] o el [repositorio Github `Marketplace`][6]. La PR debe incluir tu archivo JSON de reglas de detección, junto con cualquier nuevo archivo de integración.

3. Datadog aprueba y combina la PR y tu monitor recomendado para la integración se envía a producción.

## Verificar tu regla de detección en producción

Para ver la regla de detección lista para utilizar, el cuadro de integración relevante debe ser `Installed` en Datadog y Cloud SIEM debe estar habilitado. 

1. Busca tu regla de detección en la [lista de reglas de detección][2] y expándela. 
2. Asegúrate de que tus logotipos se muestran correctamente.
3. Comprueba que la regla está habilitada.

## Prácticas de configuración recomendadas

Además de la definición de la regla de detección, el campo `partnerRuleId` es obligatorio para las reglas de detección aportadas por socios. El campo `isEnabled` debe eliminarse, ya que no se aplica a las reglas de detección aportadas por socios.

|      | Descripción    | Ejemplos |
| ---  | ----------- | ----------- |
|partnerRuleId | Identificador único para la regla, que sigue el formato `ext-00*-***`, donde * puede ser cualquier carácter alfanumérico. | `ext-003-bzd` |

### Ejemplo de una regla de detección bien definida

Selección de un tipo de regla y definición de consultas de búsqueda:

{{< img src="developers/integrations/SIEM_detection_rule_top.png" alt="Pasos 1 a 3 en un formulario de creación de reglas de detección rellenado" style="width:90%;" >}}

Establecer casos de reglas y escribir el mensaje de notificación:

{{< img src="developers/integrations/SIEM_detection_rule_bottom.png" alt="Pasos 4 a 5 en un formulario de creación de reglas de detección rellenado" style="width:90%;" >}}

Para obtener más información, consulta la documentación sobre la [configuración de una regla de detección][7].

## Comprender los mensajes de validación

### Análisis JSON de reglas
```
File=<FILE_PATH> in collection=<COLLECTION> is an invalid JSON: error=<ERROR>
```
Este error significa que el JSON ubicado en `<FILE_PATH>` se considera un JSON inválido

### ID de regla/Nombre de regla
```
partnerRuleId is empty for rule name="<RULE_NAME>" - partnerRuleId=<NEW_RULE_ID> is available
```
Se requiere un `partnerRuleId` para cada regla y este no está presente. Utiliza el `<NEW_RULE_ID>` generado. 

```
partnerRuleId=<RULE_ID> is in the incorrect format for rule name="<RULE_NAME>", it must follow the format=^[a-z0-9]{3}-[a-z0-9]{3}-[a-z0-9]{3}$ - partnerRuleId=<NEW_RULE_ID> is available
```
El nombre de la regla no tiene el formato correcto. Utiliza el `partnerRuleId: <NEW_RULE_ID>` generado para solucionar el problema.

```
Duplicate partnerRuleId=<RULE_ID> for rule name="<RULE_NAME>" - <RULE_ID_KEY> must be unique and it is already used in rule_ids="<RULE_IDS>" - <RULE_ID_KEY>=<NEW_RULE_ID> is available
```
Cada `partnerRuleId` debe ser único. El ID actual ya está siendo utilizado. El `partnerRuleId` recientemente generado está disponible.

```
Duplicate name="<RULE_NAME>" for <RULE_ID_KEY>=<RULE_ID> - name must be unique.
```
Cada nombre de regla debe ser único. El nombre actual ya está siendo utilizado. Actualiza el nombre de la regla para que sea único.

### Etiquetas (tags) MITRE
```
The rule with partnerRuleId=<RULE_ID> contains a MITRE tag tactic but it does not contain the tag `security:attack`, please add it
```
Cuando una regla contiene una etiqueta MITRE `tactic:<TAG_VALUE>` , la etiqueta `security:attack` debe añadirse a la lista de etiquetas.

```
The MITRE tactic/technique tag=<TAG> for partnerRuleId=<RULE_ID> appears to be incorrect (i.e. it does not exist in the MITRE framework).
```
La etiqueta de táctica/técnica `<TAG>` mostrada no sigue el [marco MITRE](https://attack.mitre.org/). Selecciona una etiqueta MITRE válida

### Cases
```
The case status <CASE_STATUS> for <RULE_ID_KEY>=<RULE_ID> is incorrect, it should be one of <STATUS_LIST>.
```
El estado del caso debe ser `CRITICAL`, `HIGH`, `MEDIUM`, `LOW` o `INFO`.

```
The case ordering for partnerRuleId=<RULE_ID> is incorrect, please modify to order cases from the highest severity to the lowest.
```
Cada definición de regla debe ordenarse por gravedad decreciente. Reordena los casos como `CRITICAL`, `HIGH`, `MEDIUM`, `LOW` y `INFO`.

### Etiquetas de origen
```
source=<SOURCE> in the tags of the rule with partnerRule=<RULE_ID> is not supported by Datadog documentation.
```
Ponte en contacto con Datadog para abordar el problema.

### Validación del contenido de las reglas/Actualización de las reglas
```
<RULE_ID_KEY>=<RULE_ID> name="<RULE_NAME>" - error=<ERROR>
```
Ponte en contacto con Datadog para abordar el problema.

```
Internal failure for <RULE_ID_KEY>=<RULE_ID> name="<RULE_NAME>"- Contact Datadog Team
```
Ponte en contacto con Datadog para abordar el problema.


## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/es/security/cloud_siem/
[2]: https://app.datadoghq.com/security/rules?deprecated=hide&groupBy=tactic&product=siem&sort=rule_name 
[3]: https://docs.datadoghq.com/es/developers/integrations/agent_integration/
[4]: https://app.datadoghq.com/security/rules/new?product=siem
[5]: https://github.com/DataDog/integrations-extras 
[6]: https://github.com/DataDog/marketplace
[7]: https://docs.datadoghq.com/es/security/cloud_siem/log_detection_rules