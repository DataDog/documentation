---
description: Aprovisione organizaciones de prueba de Datadog para clientes directamente
  desde una organización de administración.
title: Aprovisionamiento de organizaciones de prueba
---
## Descripción general {#overview}

Una organización de administración con la capacidad de aprovisionador de organizaciones de prueba habilitada puede aprovisionar organizaciones de prueba de Datadog para clientes potenciales directamente. Esto acelera la ejecución de compromisos de prueba de concepto a escala. La oportunidad subyacente aún debe registrarse en Datadog, para que el acuerdo se rastree y se acredite al socio; consulte [Incorporación de un nuevo cliente][4] para conocer el proceso completo. Las organizaciones de prueba creadas de esta manera funcionan durante 30 días, en lugar del período de prueba estándar de 14 días.

{{< img src="partners/multi_tenant_billing/trial_org_provisioning.png" alt="Página de aprovisionamiento de organizaciones de prueba en la página de inicio de la organización de administración." style="width:100%;" >}}

Si la página {{< ui >}}Trial Org Provisioning{{< /ui >}} no está disponible en la organización de administración, comuníquese con [partner-support@datadoghq.com][1] para que se habilite esta capacidad.

## Aprovisionar una organización de prueba {#provision-a-trial-org}

1. Inicie sesión en la organización de administración. La página {{< ui >}}Trial Org Provisioning{{< /ui >}} aparece como la página de inicio. Para volver a ella desde cualquier otra parte de la organización de administración, haga clic en el logotipo de Datadog en la parte superior izquierda.
2. Complete el formulario:

    | Campo | Requerido | Descripción |
    |---|---|---|
    | Región | Sí | `ap1`, `eu1`, `us1`, `us3` o `us5`. Haga coincidir el proveedor de nube, la geografía y las necesidades de cumplimiento del cliente siempre que sea posible; utilice `us1` de forma predeterminada si no hay requisitos específicos. |
    | Nombre de la organización de prueba | Sí | No debe exceder los 32 caracteres. |
    | Nombre del cliente | Sí | El cliente final para el que es esta organización de prueba. |
    | Notas del socio | No | Cualquier contexto que valga la pena compartir con el equipo de cuenta de Datadog. |
    | Lista de invitados | Sí | Correos electrónicos separados por comas para invitar a la nueva organización con el rol de administrador. |

3. Haga clic en {{< ui >}}Submit{{< /ui >}}.

La organización de prueba se crea inmediatamente. El panel de resultados muestra el nombre, el ID de organización y el mensaje de estado de la nueva organización.

## Busque el ID de la organización de prueba {#find-the-trial-org-id}

Si no se capturó el ID de organización del panel de resultados, recupérelo iniciando sesión en la organización de prueba y abriendo la consola de JavaScript del navegador:

```javascript
JSON.parse(document.querySelector('#_current_user_json').value).org.id
```

Un bookmarklet también funciona: cree un marcador llamado `Get Datadog Org ID` con lo siguiente como su URL, luego haga clic en él desde cualquier página de la organización de prueba para mostrar el ID en una alerta del navegador:

```javascript
javascript:(function() {var orgId = JSON.parse(document.querySelector('#_current_user_json').value).org.id; alert("Datadog Org ID is " + orgId);})();
```

## Después del aprovisionamiento {#after-provisioning}

El uso de una organización de prueba no es visible desde la organización de administración por sí sola. Comparta el nombre y el ID de la nueva organización de prueba con el equipo de cuentas del socio para que se pueda asociar con la oportunidad registrada en el [Portal de socios][2]. La organización del cliente se conecta a la organización de administración, y su uso se vuelve visible, una vez que tiene un contrato activo asociado con la asociación.

## ¿Qué sigue? {#whats-next}

Consulte [Visibilidad de uso y costos][3] para saber cómo aparecen los datos de uso y costos desde la organización de administración una vez que la organización del cliente está conectada.

[1]: mailto:partner-support@datadoghq.com
[2]: https://partners.datadoghq.com
[3]: /es/partners/multi_tenant_billing/cost-and-usage-visibility/
[4]: /es/partners/multi_tenant_billing/customer-onboarding/