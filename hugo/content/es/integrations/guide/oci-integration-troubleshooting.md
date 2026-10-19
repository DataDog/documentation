---
description: Pasos para la solución de problemas de la integración OCI de Datadog
further_reading:
- link: https://docs.datadoghq.com/integrations/oracle-cloud-infrastructure/
  tag: Integración
  text: Integración con OCI
title: Solución de problemas de la integración OCI
---
## Descripción general {#overview}

Utilice esta guía para solucionar problemas relacionados con la [integración OCI][1] de Datadog.

## Problemas de integración {#integration-issues}

Consulte los problemas de configuración de su integración OCI en la pestaña **Issues** del [OCI integration tile][2].

## Credenciales no válidas para la clave de API o la clave de aplicación de Datadog {#invalid-datadog-api-or-app-key-credentials}

Esto ocurre cuando la clave de API de Datadog o la clave de aplicación configuradas en el OCI Integration han caducado o no son válidas. Ambas claves se validan durante la aplicación de la pila. Busque el siguiente error en los registros de trabajo de su pila de ORM para confirmar:

```
Error: unexpected response code '403': {"errors":["Forbidden"]}

  with module.integration[0].restapi_object.datadog_tenancy_integration,
  on modules/integration/main.tf line 15, in resource "restapi_object" "datadog_tenancy_integration":
  15: resource "restapi_object" "datadog_tenancy_integration" {
```

Para solucionar esto, genere nuevas credenciales y actualice su implementación de integración:

1. Vaya a [API Keys][6] en la configuración de su organización de Datadog y genere una nueva clave de API.
2. Vaya a [Application Keys][8] en la configuración de su organización de Datadog y genere una nueva clave de aplicación.
3. Actualice su implementación de integración con las nuevas claves y vuelva a aplicarla.

{{< tabs >}}
{{% tab "QuickStart (pila de ORM)" %}}

1. Navegue a [Oracle Resource Manager stacks](https://cloud.oracle.com/resourcemanager/stacks) y localice su pila de Datadog QuickStart.
2. Haga clic en **Edit** en la pila.
3. Haga clic en **Next** para llegar a la página **Configure Variables**.
4. Actualice los valores de **clave de API de Datadog** y **clave de aplicación de Datadog** con las nuevas credenciales.
5. Haga clic en **Next**.
6. Haga clic en **Save changes**.

{{% /tab %}}
{{% tab "Terraform" %}}

1. Actualice los valores de `datadog_api_key` y `datadog_app_key` en su archivo de Terraform `.tf` con las nuevas credenciales.
2. Ejecute `terraform apply` para aplicar la configuración actualizada.

{{% /tab %}}
{{< /tabs >}}

## Faltan los permisos de IAM de OCI necesarios {#required-oci-iam-permissions-are-missing}

Datadog ha recibido un `403` error al consultar OCI, lo que indica que no se han concedido todos los permisos de IAM necesarios.
Verifique la [Policies page][4] en OCI para asegurarse de que las políticas `dd-svc-policy` y `dd-dynamic-group` tengan todos los permisos de **solo lectura** configurados correctamente.

## El arrendamiento de OCI está alcanzando el límite del servicio conector {#oci-tenancy-reaching-service-connector-hub-limit}

Para cada arrendamiento, se requiere al menos un servicio conector por cada cinco compartimentos. [Solicite un aumento del límite del servicio][5] en su cuenta de OCI.

## No se pueden recopilar datos de una o más regiones suscritas {#cannot-collect-data-from-one-or-more-subscribed-regions}

La función de aplicación utilizada para reenviar métricas y registros de Datadog no se encontró.
Para solucionar esto, vuelva a aplicar la pila ORM de integración de Datadog existente en su arrendamiento de OCI. 

**Nota**: Si especificó los OCID de subred en la sección de configuración opcional, asegúrese de que haya un OCID de subred por cada región suscrita. No realice ninguna otra modificación en la pila existente antes de volver a aplicarla.

## No se están recopilando métricas {#metrics-not-being-collected}

Complete las siguientes verificaciones para cada región supervisada:

1. En el compartimento de integración, verifique que la aplicación de función `dd-function-app` exista.
2. En `dd-function-app`, verifique que la función `dd-metrics-forwarder` exista.
3. Si utiliza subredes personalizadas, verifique que cumplan con los [permisos][7] (detallados en la nota después del paso 5).
4. Para cada centro de conectores de servicio de métricas creado por Datadog, confirme que su destino de función sea la función `dd-metrics-forwarder` en `dd-function-app`. Los centros de conectores de métricas creados por Datadog utilizan el formato `dd-metrics-connectorhub-<suffix>`. Si un centro de conectores apunta a una aplicación de función de reenvío diferente, elimínelo y permita que se vuelva a aprovisionar automáticamente.

## Problemas de destrucción de la pila de OCI {#oci-stack-destroy-issues}

Si el trabajo falla o no se puede ejecutar:

1. Clone el [repositorio de integración de OCI][11] e ingrese al directorio del repositorio.
2. Utilice el [script de limpieza de integración de OCI][10] para eliminar los recursos restantes.
3. Establezca las variables requeridas.
4. Revise una ejecución de prueba:

    ```shell
    export OCI_PROFILE="<YOUR_OCI_PROFILE>"
    export COMPARTMENT_OCID="<YOUR_COMPARTMENT_OCID>"
    export TENANCY_OCID="<YOUR_TENANCY_OCID>"

    python3 oci-integration-cleanup/integration_cleanup.py \
      --profile "$OCI_PROFILE" \
      --compartment-ocid "$COMPARTMENT_OCID" \
      --dry-run true
    ```

5. Revise los recursos planificados para su eliminación en la salida de la ejecución de prueba. Si la salida parece correcta, ejecute la limpieza:

    ```shell
    python3 oci-integration-cleanup/integration_cleanup.py \
      --profile "$OCI_PROFILE" \
      --compartment-ocid "$COMPARTMENT_OCID" \
      --confirm-tenancy-id "$TENANCY_OCID" \
      --region-workers <number of regions to be processed in parallel> \
      --dry-run false
    ```

## Versión de integración obsoleta {#outdated-integration-version}

Esto ocurre cuando su pila ORM de integración de Datadog o su módulo de Terraform están desactualizados. Para solucionar esto, actualice su implementación a la versión más reciente y vuelva a aplicarla. Para obtener instrucciones que cubran tanto QuickStart (pila ORM) como Terraform, consulte [Actualizar la integración][8].

¿Aún necesita ayuda? Comuníquese con el [soporte de Datadog][3].

[1]: /es/integrations/oracle-cloud-infrastructure
[2]: https://app.datadoghq.com/integrations?integrationId=oracle-cloud-infrastructure
[3]: /es/help/
[4]: https://cloud.oracle.com/identity/domains/policies
[5]: https://docs.oracle.com/en/cloud/get-started/subscriptions-cloud/mmocs/requesting-service-limit-change.html
[6]: https://app.datadoghq.com/organization-settings/api-keys
[7]: https://docs.datadoghq.com/es/integrations/oracle-cloud-infrastructure/#deploy-the-quickstart-orm-stack
[8]: /es/integrations/oracle-cloud-infrastructure/#update-the-integration
[9]: https://app.datadoghq.com/organization-settings/application-keys
[10]: https://github.com/DataDog/oracle-cloud-integration/tree/master/oci-integration-cleanup#readme
[11]: https://github.com/DataDog/oracle-cloud-integration