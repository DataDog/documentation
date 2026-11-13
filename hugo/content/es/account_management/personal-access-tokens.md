---
aliases:
- /es/account_management/faq/personal-access-tokens/
description: Cree y administre tokens de acceso personal de corta duración y con contexto
  definido para autenticar llamadas a la API de Datadog sin necesidad de vincular
  claves de API y de aplicación.
further_reading:
- link: https://www.datadoghq.com/blog/datadog-api-authentication/
  tag: Blog
  text: Modernice la autenticación de Datadog API con credenciales con contexto definido.
title: Tokens de acceso personal
---
## Descripción general {#overview}

Los tokens de acceso personal (PATs) son un tipo de credencial que autentica las llamadas a Datadog API. A diferencia de las claves de aplicación, los tokens de acceso personal (PATs) no necesitan vincularse con una clave de API. Son de corta duración y tienen un contexto definido por defecto, lo que le brinda un control más estricto sobre a qué puede acceder cada token y cuánto tiempo permanece válido.

Con los tokens de acceso personal (PATs), usted puede:
- Autenticar llamadas a la API con una sola credencial.
- Hacer cumplir el principio de menor privilegio seleccionando solo los contextos que su flujo de trabajo necesita.
- Limite el radio de impacto de las credenciales filtradas mediante valores de tiempo de vida (TTL) obligatorios. Los tokens caducados se revocan automáticamente, por lo que las credenciales inactivas no persisten indefinidamente.
- Separe las funciones reservando las claves de API para el envío de telemetría (Agent, logs, métricas) y utilice PATs para todas las demás llamadas a la API web.

### Comparación de los tokens de acceso personal (PATs) con otros tipos de credenciales {#pats-compared-to-other-credential-types}

| | Personal Access Tokens | Service Access Tokens | claves de aplicación |
|---|---|---|---|
| Autenticación independiente | Sí; no se requiere vinculación con clave de API | Sí; no se requiere vinculación con clave de API | No; requiere una clave de API |
| Contexto definido por defecto | Sí; los contextos son obligatorios | Sí; los contextos son obligatorios | Opcional; sin contexto por defecto |
| Tiempo de vida (TTL) | Obligatorio (de 24 horas a un año) | Opcional; pueden ser de larga duración | Sin caducidad |
| Prefijo identificable | `ddpat_` | `ddsat_` | `ddapp_` (nuevo) |
| Vinculado a | Usuario individual | Cuenta de servicio | Usuario individual o cuenta de servicio |

Para los tokens de acceso de servicio, consulte [Service Access Tokens][7].

## Requisitos previos {#prerequisites}

- Una cuenta de usuario de Datadog con el permiso `user_app_keys`
- El `org_app_keys_write` permiso si desea administrar tokens de acceso personal (PATs) para otros usuarios de la organización

## Crear un token de acceso personal {#create-a-personal-access-token}

1. Vaya a [**Configuración personal** > **Tokens de acceso**][1].
2. Haga clic en {{< ui >}}+ New Access Token{{< /ui >}}.
3. Ingrese un {{< ui >}}Name{{< /ui >}} para el token.
4. Seleccione un {{< ui >}}Expiration Date{{< /ui >}} . La expiración mínima es de 24 horas y la máxima es de un año a partir de la creación.
5. Haga clic en {{< ui >}}Select Scopes{{< /ui >}} para elegir los contextos que definen a qué puede acceder este token. Se requiere al menos un contexto. Otorgue solo los permisos que requiera su flujo de trabajo y, luego, haga clic en {{< ui >}}Save{{< /ui >}}.

<div class="alert alert-warning">Datadog muestra el secreto del token solo una vez al momento de la creación. Cópielo y guárdelo de forma segura. No podrá recuperarlo más tarde.</div>

## Utilice un token de acceso personal {#use-a-personal-access-token}

Los PATs admiten dos métodos de autenticación.

### Encabezado de autorización (recomendado) {#authorization-header-recommended}

Pase el PAT como un token Bearer en el encabezado `Authorization`. Este método no requiere una clave de API:

```bash
curl -X GET "https://api.datadoghq.com/api/v2/users" \
  -H "Authorization: Bearer <YOUR_PAT>"
```

### Encabezado de clave de aplicación {#application-key-header}

Pase el PAT en el encabezado `dd-application-key`. Esto es útil para migrar integraciones existentes que ya utilizan el formato de encabezado de clave de aplicación:

```bash
curl -X GET "https://api.datadoghq.com/api/v2/users" \
  -H "dd-application-key: <YOUR_PAT>"
```

**Nota:** Cuando se proporciona un PAT válido en el encabezado `dd-application-key`, Datadog se autentica solo con el PAT. El encabezado `dd-api-key` es opcional y su valor no se evalúa.

## Restricciones en llamadas a la API autenticadas con PAT {#restrictions-on-pat-authenticated-api-calls}

Para evitar la escalada de privilegios, Datadog restringe lo que puede hacer una llamada a la API autenticada con un PAT. Estas restricciones se aplican independientemente del cliente de API que realice la llamada:

- **Claves de aplicación**: Un PAT no puede crear ni actualizar claves de aplicación. Se permite revocar claves de aplicación.
- **Contextos en tokens nuevos**: Un PAT puede crear o actualizar un PAT o un SAT solo si los contextos del nuevo token son un subconjunto de sus propios contextos.
- **Tiempo de vida (TTL) en tokens nuevos**: Un PAT no puede crear un PAT o un SAT con un TTL que se extienda más allá de su propia expiración.

Una llamada que infrinja una de estas restricciones devuelve una respuesta `403 Forbidden`.

## Administrar tokens de acceso personal {#manage-personal-access-tokens}

### Ver sus tokens {#view-your-tokens}

Navegue a [**Configuración personal** > **Tokens de acceso**][1] para ver todos los PAT asociados con su cuenta, incluyendo sus nombres, alcances, fechas de expiración e información de último uso.

Después de crear un token, un panel de detalles muestra el secreto del token, nombre, ID de token, propietario, contextos y fecha de expiración. Desde este panel, también puede editar o revocar el token.

{{< img src="account_management/personal-access-tokens/pat-details.png" alt="Detalles del token de acceso personal que muestran el secreto del token, nombre, ID de token, propietario, contextos y expiración" style="width:60%;" >}}

### Administrar tokens como administrador {#manage-tokens-as-an-administrator}

Los administradores de la organización con los permisos `org_app_keys_read` y `org_app_keys_write` pueden ver y administrar los PAT de todos los usuarios en la organización desde [**Configuración de la organización** > **Tokens de acceso**][2].

{{< img src="account_management/personal-access-tokens/pat-admin.png" alt="Los administradores de la organización pueden ver y gestionar todos los PAT desde la Configuración de la organización" style="width:80%;" >}}


### Revocar un token {#revoke-a-token}

1. Navegue a [**Configuración personal** > **Tokens de acceso**][1], o [**Configuración de la organización** > **Tokens de acceso**][2] para administradores.
2. Coloque el cursor sobre el token que desea revocar y haga clic en el icono {{< ui >}}Revoke Token{{< /ui >}}.

Los tokens revocados ya no pueden autenticar llamadas a la API. La revocación entra en vigor en cuestión de segundos.

### Editar un token {#edit-a-token}

Puede actualizar el nombre y los contextos de un PAT existente. No puede modificar el TTL después de la creación. Para cambiar el TTL, revoque el token existente y cree un token con la configuración deseada.

## Formato del token {#token-format}

Los PATs utilizan un formato identificable que admite el escaneo de secretos y la gestión de claves:

```
ddpat_<ALIAS>_<SECRET><CHECKSUM>
```

| Componente | Descripción |
|-----------|-------------|
| `ddpat_` | Prefijo que identifica la credencial como un token de acceso personal |
| `<ALIAS>` | Identificador de token codificado en Base62, derivado del UUID del token |
| `<SECRET>` | Secreto generado aleatoriamente de 32 bytes |
| `<CHECKSUM>` | Suma de comprobación CRC32 que sigue el estándar de suma de comprobación de GitHub |

El prefijo identificable y la suma de comprobación permiten la detección automatizada mediante servicios de escaneo de secretos, incluidos GitHub secret scanning, Sensitive Data Scanner y GitGuardian.

## Permisos {#permissions}

Los PATs utilizan los mismos permisos que las claves de aplicación:

| Permiso | Descripción |
|------------|-------------|
| `user_app_keys` | Crear y administrar sus propios PATs |
| `org_app_keys_read` | Ver los PATs de todos los usuarios de la organización |
| `org_app_keys_write` | Crear, editar y revocar PATs para cualquier usuario de la organización |

Para obtener más información sobre los permisos, consulte [Control de acceso basado en roles][3].

## Audit Trail {#audit-trail}

Si [Audit Trail][4] está habilitado para su organización, Audit Trail registra todos los eventos de creación, uso y revocación de PAT. Audit Trail captura el método de autenticación y los metadatos del token para cada llamada a la API realizada con un PAT, lo que brinda a los administradores visibilidad sobre el uso de credenciales en toda la organización.

Para revisar la actividad de los PAT, navegue a [**Seguridad** > **Cumplimiento** > **Audit Trail**][5] y filtre por el método de autenticación de token de acceso personal.

## Referencia de la API {#api-reference}

Administre los PAT mediante programación a través de Datadog API:

| Operación | punto de conexión |
|-----------|----------|
| Listar PATs y SATs | `GET /api/v2/personal_access_tokens` |
| Crear un PAT | `POST /api/v2/personal_access_tokens` |
| Obtener un PAT específico | `GET /api/v2/personal_access_tokens/<PAT_ID>` |
| Actualizar un PAT | `PATCH /api/v2/personal_access_tokens/<PAT_ID>` |
| Revocar un PAT | `DELETE /api/v2/personal_access_tokens/<PAT_ID>` |

El punto de conexión `GET /api/v2/personal_access_tokens` devuelve tanto PATs como SATs en una sola llamada.
Para administrar SATs, consulte [Service Access Tokens][7].

Para obtener la referencia completa de la API, consulte [Key Management][6].

## Retraso en la propagación de claves {#key-propagation-delay}

Los PATs siguen un modelo de consistencia eventual. Después de la creación o revocación, los cambios pueden tardar unos segundos en propagarse en todos los sistemas de Datadog. No utilice un token inmediatamente después de su creación en flujos de trabajo críticos. Implemente una estrategia de reintento con retroceso exponencial corto para manejar errores transitorios durante la ventana de propagación.

[1]: https://app.datadoghq.com/personal-settings/access-tokens
[2]: https://app.datadoghq.com/organization-settings/access-tokens
[3]: /es/account_management/rbac/permissions/
[4]: /es/account_management/audit_trail/
[5]: https://app.datadoghq.com/audit-trail
[6]: /es/api/latest/key-management/
[7]: /es/account_management/service-access-tokens/

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}