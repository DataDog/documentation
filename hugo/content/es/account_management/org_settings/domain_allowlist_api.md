---
further_reading:
- link: https://app.datadoghq.com/organization-settings/domain-allowlist
  tag: En la aplicación
  text: Lista de dominios permitidos
- link: /account_management/org_settings/domain_allowlist
  tag: Documentación
  text: Interfaz de usuario de la lista de dominios permitidos
title: API de listas de dominios permitidos
---

{{< callout url="/help/" header="Comenzar con la lista de dominios permitidos" >}}
  La lista de dominios permitidos está disponible para clientes con planes Enterprise. Si estás interesado en esta función, ponte en contacto con el servicio de soporte de Datadog para solicitar acceso.
{{< /callout >}} 

La [Lista de dominios permitidos][1] permite restringir los dominios de correo electrónico a los que se puede enviar notificaciones.

Este documento describe cómo acceder y configurar la Lista de dominios permitidos a través de la API. Para utilizar la interfaz de usuario, consulta [Lista de dominios permitidos][1].

## Obtener lista de dominios permitidos

Devuelve la lista de dominios permitidos y su estado activado o desactivado.

<span style="padding:3px" class="font-semibold text-api-get bg-bg-api-get">GET</span>
https://api.datadoghq.com/api/v2/domain_allowlist

### Solicitud

#### Ejemplo

```bash
curl -X GET "https://api.datadoghq.com/api/v2/domain_allowlist" \
-H "Accept: application/json" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}"
```

### Respuesta

{{< tabs >}}
{{% tab "200" %}}

OK

#### Modelo

| Campo | Tipo | Descripción |
| :----- | :---- | :----------- |
| datos | objeto | Datos de correo electrónico de la Lista de dominios permitidos |
| data.type | enum | Tipo de Lista de dominios permitidos. Valores de enum permitidos: `domain_allowlist`. Por defecto: `domain_allowlist`.|
| data.attributes | objeto | Atributos de la lista de dominios permitidos |
| data.attributes.enabled | Booleano | Si es `true`, la lista de dominios permitidos está activada |
| data.attributes.domains | [cadena] | Lista de dominios en la Lista de dominios permitidos |

{{% /tab %}}
{{% tab "403" %}}

Prohibido

#### Modelo

| Campo | Tipo | Descripción |
| ----- | ---- | ----------- |
| errors \[_required_\] | [cadena] | Lista de errores |

{{% /tab %}}
{{% tab "404" %}}

No se ha encontrado

#### Modelo

| Campo | Tipo | Descripción |
| ----- | ---- | ----------- |
| errors \[_required_\] | [cadena] | Lista de errores |

{{% /tab %}}
{{% tab "429" %}}

Demasiadas solicitudes

#### Modelo

| Campo | Tipo | Descripción |
| ----- | ---- | ----------- |
| errors \[_required_\] | [cadena] | Lista de errores |

{{% /tab %}}
{{< /tabs >}}

#### Ejemplo

```js
{
  "data": {
    "type": "domain_allowlist",
    "attributes": {
      "enabled": true,
      "domains": [
        "@aol.com",
        "@yahoo.com",
        "@gmail.com"
      ]
    }
  }
}
```

## Modificar la lista de dominios permitidos

Activar/desactivar la lista de dominios permitidos y reescribir toda la lista de dominios permitidos con una determinada lista de dominios de correo electrónico.

<span style="padding:3px" class="font-semibold text-api-get bg-bg-api-get">PATCH</span>
https://api.datadoghq.com/api/v2/domain_allowlist

### Solicitud

#### Ejemplo

```bash
curl -X PATCH "https://api.datadog.com/api/v2/domain_allowlist" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
-d @- << EOF

{
  "data": {
    "type": "domain_allowlist",
    "attributes": {
      "enabled": true,
      "domains": [
        "@datadoghq.com",
        "@yahoo.com",
        "@gmail.com"
      ]
    }
  }
}

EOF
```

### Respuesta

{{< tabs >}}
{{% tab "200" %}}

OK

#### Modelo

| Campo | Tipo | Descripción |
| :----- | :---- | :----------- |
| datos | objeto | Datos de correo electrónico de la Lista de dominios permitidos |
| data.type | enum | Tipo de Lista de dominios permitidos. Valores de enum permitidos: `domain_allowlist`. Por defecto: `domain_allowlist`.|
| data.attributes | objeto | Atributos de la lista de dominios permitidos |
| data.attributes.enabled | Booleano | Si es `true`, la lista de dominios permitidos está activada |
| data.attributes.domains | [cadena] | Lista de dominios en la Lista de dominios permitidos |

{{% /tab %}}
{{% tab "403" %}}

Prohibido

#### Modelo

| Campo | Tipo | Descripción |
| ----- | ---- | ----------- |
| errors \[_required_\] | [cadena] | Lista de errores |

{{% /tab %}}
{{% tab "404" %}}

No se ha encontrado

#### Modelo

| Campo | Tipo | Descripción |
| ----- | ---- | ----------- |
| errors \[_required_\] | [cadena] | Lista de errores |

{{% /tab %}}
{{% tab "429" %}}

Demasiadas solicitudes

#### Modelo

| Campo | Tipo | Descripción |
| ----- | ---- | ----------- |
| errors \[_required_\] | [cadena] | Lista de errores |

{{% /tab %}}
{{< /tabs >}}

#### Ejemplo

```js
{
  "data": {
    "type": "domain_allowlist",
    "attributes": {
      "enabled": true,
      "domains": [
        "@datadoghq.com",
        "@yahoo.com",
        "@gmail.com"
      ]
    }
  }
}
```

## Para leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/account_management/org_settings/domain_allowlist