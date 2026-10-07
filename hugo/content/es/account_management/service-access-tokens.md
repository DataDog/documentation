---
description: Cree y administre tokens de acceso de servicio para autenticar llamadas
  a la Datadog API en nombre de una cuenta de servicio, sin depender de credenciales
  de usuario individuales.
further_reading:
- link: /account_management/org_settings/service_accounts/
  tag: Documentación
  text: Cuentas de servicio
- link: /account_management/personal-access-tokens/
  tag: Documentación
  text: Tokens de acceso personal
- link: /account_management/workload_identity_federation/
  tag: Documentación
  text: Federación de identidad de carga de trabajo
- link: https://www.datadoghq.com/blog/datadog-api-authentication/
  tag: Blog
  text: Modernice la autenticación de la Datadog API con credenciales con contexto
    definido
title: Tokens de acceso de servicio
---
## Descripción general {#overview}

Los tokens de acceso de servicio (SAT) son credenciales que autentican las llamadas a la Datadog API en nombre de una
[cuenta de servicio][1]. A diferencia de los [Tokens de acceso personal (PAT)][2], los SAT pertenecen a una cuenta de servicio
en lugar de un usuario individual; permanecen válidos cuando los miembros del equipo se unen o abandonan la organización.

Con los SAT, puede:
- Autenticar flujos de trabajo y scripts automatizados con credenciales que permanecen válidas después de que los miembros del equipo abandonan la organización.
- Crear tokens de larga duración para integraciones estables que no requieren rotación periódica.
- Restringir los tokens al contexto mínimo que requiere su flujo de trabajo.
- Atribuir toda la actividad de la API a la cuenta de servicio propietaria para una clara responsabilidad de auditoría.

### Comparación de los SAT con otros tipos de credenciales {#sats-compared-to-other-credential-types}

| | Tokens de acceso de servicio | Tokens de acceso personal | Claves de aplicación |
|---|---|---|---|
| Propiedad de | Cuenta de servicio | Usuario individual | Usuario individual o cuenta de servicio |
| Tiempo de vida (TTL) | Opcional; 1 día, 1 mes, 1 año, Nunca o Personalizado | Requerido; de 1 día a 1 año | Sin vencimiento |
| Con contexto de forma predeterminada | Sí; los contextos son obligatorios | Sí; los contextos son obligatorios | Opcional; sin contexto de forma predeterminada |
| Autenticación independiente | Sí; no se necesita emparejamiento de clave de API | Sí; no se necesita emparejamiento de clave de API | No; requiere una clave de API |
| Prefijo identificable | `ddsat_` | `ddpat_` | `ddapp_` (nuevo) |
| Visible en | Detalles de la cuenta de servicio, Configuración de la organización > Tokens de acceso | Configuración personal > Tokens de acceso, Configuración de la organización > Tokens de acceso | Configuración personal > Claves de aplicación, Configuración de la organización > Claves de aplicación |

Para los tokens de acceso personal, consulte [Tokens de acceso personal][2].

## Requisitos previos {#prerequisites}

- Una cuenta de servicio de Datadog. Para crear una, consulte [Cuentas de servicio][1].
- El `service_account_write` permiso para crear SATs para una cuenta de servicio que usted administra.
- El `org_app_keys_write` permiso para administrar SATs para cualquier cuenta de servicio en la organización.

## Crear un token de acceso de servicio {#create-a-service-access-token}

1. Vaya a [**Configuración de la organización** > **Cuentas de servicio**][3] y haga clic en una cuenta de servicio.
2. En el panel de detalles, bajo **Tokens de acceso**, haga clic en {{< ui >}}+ New Token{{< /ui >}}.
3. Ingrese un {{< ui >}}Name{{< /ui >}} para el token.
4. Seleccione una {{< ui >}}Expiration Date{{< /ui >}}: **1 día**, **1 mes**, **1 año**, **Nunca**,
   o **Personalizado**. Seleccione **Nunca** para un token sin fecha de vencimiento.
5. Haga clic en {{< ui >}}Select Scopes{{< /ui >}} para definir a qué puede acceder el token. Otorgue solo los
   permisos que requiera su flujo de trabajo, luego haga clic en {{< ui >}}Save{{< /ui >}}.

<div class="alert alert-warning">Datadog muestra el secreto del token solo una vez al momento de la creación.
Cópielo y guárdelo de forma segura. No podrá recuperarlo más tarde.</div>

Después de guardar, un panel de detalles muestra el secreto del token, el nombre, el ID del token, el propietario, los roles del propietario,
la fecha de vencimiento y los contextos.

Si configura un SAT con un vencimiento largo o selecciona **Nunca**, guarde el secreto en un administrador de
secretos, como AWS Secrets Manager, HashiCorp Vault o Azure Key Vault, en lugar de en la fuente
o en archivos de entorno. AWS Secrets Manager admite [rotación administrada para credenciales de cuenta de servicio de Datadog][8].
credenciales de cuenta de servicio de Datadog][8].

## Utilice un token de acceso de servicio {#use-a-service-access-token}

Los SAT admiten dos métodos de autenticación.

### Encabezado de autorización (recomendado) {#authorization-header-recommended}

Pase el SAT como un token Bearer en el encabezado `Authorization`. Este método no requiere una
clave de API:

```bash
curl -X GET "https://api.datadoghq.com/api/v2/users" \
  -H "Authorization: Bearer <YOUR_SAT>"
```

### Encabezado de clave de aplicación {#application-key-header}

Pase el SAT en el encabezado `dd-application-key`:

```bash
curl -X GET "https://api.datadoghq.com/api/v2/users" \
  -H "dd-application-key: <YOUR_SAT>"
```

**Nota:** Cuando se proporciona un SAT válido en el encabezado `dd-application-key`, Datadog se autentica
solo con el SAT. El encabezado `dd-api-key` es opcional y su valor no se evalúa.

## Restricciones en llamadas a la API autenticadas con SAT {#restrictions-on-sat-authenticated-api-calls}

Para evitar la escalada de privilegios, Datadog restringe lo que puede hacer una llamada a la API autenticada con un SAT. Estas restricciones se aplican independientemente del cliente de API que realice la llamada:

- **Claves de aplicación**: Un SAT no puede crear ni actualizar claves de aplicación. Revocar claves de aplicación está permitido.
- **Contextos en nuevos tokens**: Un SAT puede crear o actualizar otro SAT solo si los contextos del nuevo token son un subconjunto de sus propios contextos.
- **Tiempo de vida (TTL) en nuevos tokens**: Un SAT no puede crear un SAT con un TTL que se extienda más allá de su propia expiración.

Una llamada que viola una de estas restricciones devuelve una respuesta `403 Forbidden`.

## Administrar tokens de acceso de servicio {#manage-service-access-tokens}

### Visualización de tokens {#view-tokens}

Los tokens de una cuenta de servicio aparecen en el panel de detalles bajo
[**Configuración de la organización** > **Cuentas de servicio**][3].

{{< img src="account_management/service-access-tokens/sat-service-account-panel.png" alt="El panel de detalles de la cuenta de servicio muestra la sección de Tokens de acceso con dos Tokens de acceso de servicio listados." style="width:80%;" >}}

Los administradores de la organización con el permiso `org_app_keys_read` también pueden visualizar todos los SATs
junto con los Tokens de acceso personal desde [**Configuración de la organización** > **Tokens de acceso**][4].

### Revocar un token {#revoke-a-token}

1. Navegue a [**Configuración de la organización** > **Cuentas de servicio**][3] y haga clic en la cuenta de servicio.
2. En el panel de detalles, coloque el cursor sobre el token y haga clic en {{< ui >}}Revoke{{< /ui >}}.

Alternativamente, revoque un SAT desde [**Configuración de la organización** > **Tokens de acceso**][4].

Los tokens revocados ya no pueden autenticar llamadas a la API. La revocación entra en vigor en cuestión de segundos.

### Editar un token {#edit-a-token}

Puede actualizar el nombre y los contextos de un SAT existente. No puede modificar la fecha de vencimiento
después de la creación. Para cambiar el vencimiento, revoque el token y cree uno nuevo.

## Permisos {#permissions}

| Permiso | Descripción |
|------------|-------------|
| `service_account_write` | Crear SATs para cuentas de servicio que usted administra |
| `org_app_keys_read` | Ver SATs para todas las cuentas de servicio en la organización |
| `org_app_keys_write` | Crear, editar y revocar SATs para cualquier cuenta de servicio |

Para obtener más información, consulte [Access Control basado en roles][5].

## Audit Trail {#audit-trail}

Si [Audit Trail][6] está habilitado, registra toda la creación, el uso y la revocación de SAT.
eventos. Cada llamada a la API autenticada con un SAT se atribuye a la cuenta de servicio propietaria.
Esto brinda a los administradores visibilidad sobre el uso automatizado de credenciales en toda la organización.

Para revisar la actividad de los SAT, navegue a [**Security** > **Compliance** > **Audit Trail**][7] y
filtre por el método de autenticación de Token de acceso de servicio.

## Referencia de la API {#api-reference}

Administre los SAT mediante programación a través de la Datadog API:

| Operación | Punto de conexión |
|-----------|----------|
| Listar SATs | `GET /api/v2/service_accounts/<SERVICE_ACCOUNT_ID>/access_tokens` |
| Crear un SAT | `POST /api/v2/service_accounts/<SERVICE_ACCOUNT_ID>/access_tokens` |
| Obtener un SAT específico | `GET /api/v2/service_accounts/<SERVICE_ACCOUNT_ID>/access_tokens/<TOKEN_ID>` |
| Actualizar un SAT | `PATCH /api/v2/service_accounts/<SERVICE_ACCOUNT_ID>/access_tokens/<TOKEN_ID>` |
| Revocar un SAT | `DELETE /api/v2/service_accounts/<SERVICE_ACCOUNT_ID>/access_tokens/<TOKEN_ID>` |

Para recuperar todos los PAT y SAT de los usuarios y las cuentas de servicio en una sola llamada, utilice el punto de conexión unificado
punto de conexión:

```
GET /api/v2/personal_access_tokens
```

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/account_management/org_settings/service_accounts/
[2]: /es/account_management/personal-access-tokens/
[3]: https://app.datadoghq.com/organization-settings/service-accounts
[4]: https://app.datadoghq.com/organization-settings/access-tokens
[5]: /es/account_management/rbac/permissions/
[6]: /es/account_management/audit_trail/
[7]: https://app.datadoghq.com/audit-trail
[8]: https://aws.amazon.com/about-aws/whats-new/2026/05/secrets-manager-managed-external-secrets-datadog-snowflake/