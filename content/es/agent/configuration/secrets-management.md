---
algolia:
  tags:
  - secretos
  - ejecutable de secretos
  - proveedor de secretos
  - lista de secretos
aliases:
- /es/agent/faq/kubernetes-secrets
- /es/agent/guide/secrets-management
further_reading:
- link: /agent/autodiscovery/
  tag: Documentación
  text: Autodiscovery
title: Gestión de secretos
---

## Información general

El Datadog Agent permite gestionar secretos de forma segura mediante la integración con cualquier solución externa de gestión de secretos (como HashiCorp Vault, AWS Secrets Manager, Azure Key Vault o una solución personalizada). En lugar de codificar valores confidenciales como claves de API o contraseñas en texto plano en los archivos de configuración, el Agent puede recuperarlos dinámicamente en tiempo de ejecución.

### Cómo funciona

Para hacer referencia a un secreto en tu configuración, utiliza la notación `ENC[<secret_id>]`. Esto indica al Agent que resuelva el valor utilizando el ejecutable de recuperación de secretos configurado. El secreto se obtiene y se carga en la memoria, pero nunca se escribe en el disco ni se envía al backend de Datadog.

Por ejemplo, la siguiente configuración muestra dos secretos definidos con `ENC[]`:
```
instances:
  - server: db_prod
    user: "ENC[db_prod_user]"
    password: "ENC[db_prod_password]"
```

El controlador de secreto debe constituir el valor completo del campo YAML y siempre se resuelve como cadenas. Esto significa que configuraciones como `password: "db-ENC[prod_password]"` no se reconocen como secretos.

Puedes utilizar cualquier carácter entre los corchetes de `ENC[]` siempre que el YAML sea válido. Si tu ID de secreto incluye caracteres especiales o es una cadena JSON, asegúrate de escaparlo correctamente. Por ejemplo:
```
"ENC[{\"env\": \"prod\", \"check\": \"postgres\", \"id\": \"user_password\"}]"
```

También es posible utilizar variables de [Autodiscovery][1] en los controladores de secretos. El Agent resuelve estas variables antes de resolver el secreto. Por ejemplo:
```
instances:
  - server: %%host%%
    user: ENC[db_prod_user_%%host%%]
    password: ENC[db_prod_password_%%host%%]
```

**Nota**: No puedes utilizar la sintaxis `ENC[]` en configuraciones de `secret_*` como `secret_backend_command`.

### Requisitos de seguridad del Agent

El Agent ejecuta el ejecutable proporcionado como un subproceso. Los patrones de ejecución difieren en Linux y Windows.

{{< tabs >}}
{{% tab "Linux" %}}

En Linux, el ejecutable debe:

* debe pertenecer al mismo usuario que está ejecutando el Agent (`dd-agent` de forma predeterminada o `root` en un contenedor);
* No debe tener derechos para `group` o `other`.
* debe contar, como mínimo, con derechos de ejecución para el propietario.

{{% /tab %}}
{{% tab "Windows" %}}

En Windows, el ejecutable debe:

* debe tener derechos de lectura/ejecución para `ddagentuser` (el usuario que se utiliza para ejecutar el Agent);
* No debe tener derechos para ningún usuario ni grupo excepto para el grupo `Administrators`, la cuenta incorporada `Local System` o el contexto de usuario del Agent (`ddagentuser` en forma predeterminada)
* Ser una aplicación Win32 válida para que el Agent pueda ejecutarla (por ejemplo, un script de PowerShell o Python no funciona).

{{% /tab %}}
{{< /tabs >}}

**Nota**: El ejecutable comparte las mismas variables de entorno que el Agent.

## Proporcionar un ejecutable de recuperación de secretos

Para recuperar secretos, el Agent utiliza un ejecutable externo que tú le proporcionas. El ejecutable se utiliza cuando se descubren nuevos
secretos y se almacena en caché durante el ciclo de vida del Agent. Si necesitas actualizar o rotar un secreto, debes reiniciar el Agent para recargarlo.

El Agent envía a este ejecutable una carga JSON a través de la entrada estándar que contiene una lista de controladores de secretos. El ejecutable obtiene cada secreto y lo devuelve en formato JSON a través de la salida estándar.

Esto es lo que el Agent envía a tu ejecutable en STDIN:
```
{
  "version": "1.0",
  "secrets": ["secret1", "secret2"]
}
```

* `version` (cadena): la versión del formato.
* `secrets` (lista de cadenas): cada cadena es un controlador de un secreto a recuperar.


El ejecutable debe responder a través de STDOUT:
```
{
  "secret1": {"valor": "valor_descifrado", "error": null},
  "secret2": {"valor": null, "error": "could not fetch the secret"}
}
```

* `value` (cadena): el valor del secreto que se utilizará en las configuraciones. Esto puede ser `null` en caso de error.
* `error` (cadena): un mensaje de error o `null`.

Si un secreto no se resuelve (ya sea devolviendo un código de salida distinto de cero o un error no nulo), el Agent ignora la configuración relacionada.

**Nunca envíes información confidencial a `stderr`**. Si el binario sale con un código de estado diferente al de `0`, el Agent registra la salida de error estándar del ejecutable para facilitar la resolución de problemas.

## Opciones para recuperar secretos

### Opción 1: Utilizar el script incorporado para Kubernetes y Docker

Para entornos en contenedores, las imágenes de contenedor del Datadog Agent incluyen un script incorporado `/readsecret_multiple_providers.sh` a partir de la versión v7.32.0. Este script es compatible con la lectura de secretos de:

* Archivos: utilizar `ENC[file@/path/to/file]`
* Kubernetes Secrets: utilizar `ENC[k8s_secret@namespace/secret-name/key]`

{{< tabs >}}
{{% tab "Helm" %}}

Para utilizar este ejecutable con un Helm chart, configúralo como se indica a continuación:
```yaml
datadog:
  [...]
  secretBackend:
    command: "/readsecret_multiple_providers.sh"
```

{{% /tab %}}
{{% tab "DaemonSet" %}}

Para utilizar este ejecutable, define la variable de entorno `DD_SECRET_BACKEND_COMMAND` como se indica a continuación:
```
DD_SECRET_BACKEND_COMMAND=/readsecret_multiple_providers.sh
```

{{% /tab %}}
{{< /tabs >}}

#### Ejemplo: Lectura de archivos montados

Kubernetes admite [exponer Secretos como archivos][2] en un pod que el Agent puede leer para resolver secretos.

En Kubernetes, puedes montar un Secreto como un volumen así:
```yaml
  containers:
    - name: agent
      #(...)
      volumeMounts:
        - name: secret-volume
          mountPath: /etc/secret-volume
  #(...)
  volumes:
    - name: secret-volume
      secret:
        secretName: test-secret
```

A continuación, puedes hacer referencia al secreto de la siguiente manera:
```
password: ENC[file@/etc/secret-volume/password]
```

**Notas:**
- El secreto debe existir en el mismo espacio de nombres que el pod en el que se va a integrar.
- El script puede acceder a todas las subcarpetas, así como al contenido confidencial de `/var/run/secrets/kubernetes.io/serviceaccount/token`. Por este motivo, Datadog recomienda utilizar una carpeta exclusiva en vez de `/var/run/secrets`.

Los [secretos de enjambre de Docker][3] se montan en la carpeta `/run/secrets`. Por ejemplo, el secreto de Docker `db_prod_passsword` está en `/run/secrets/db_prod_password` en el contenedor del Agent. A esto se haría referencia en la configuración con `ENC[file@/run/secrets/db_prod_password]`.

#### Ejemplo: Lectura de un secreto de Kubernetes en todos los espacios de nombres

Si deseas que el Agent lea un secreto de un espacio de nombres diferente, utiliza el prefijo `k8s_secret@`. Por ejemplo:
```
password: ENC[k8s_secret@database/database-secret/password]
```

En este case (incidencia), debes configurar manualmente RBAC para permitir que la cuenta de servicio del Agent lea el secreto:
```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: datadog-secret-reader
  namespace: database
rules:
  - apiGroups: [""]
    resources: ["secrets"]
    resourceNames: ["database-secret"]
    verbs: ["get", "watch", "list"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: datadog-read-secrets
  namespace: database
subjects:
  - kind: ServiceAccount
    name: datadog-agent
    apiGroup: ""
    namespace: default
roleRef:
  kind: Role
  name: datadog-secret-reader
  apiGroup: ""
```

Este `Role` permite acceder al `Secret: database-secret` en el `Namespace: database`. El `RoleBinding` asocia este permiso a la `ServiceAccount: datadog-agent` en el `Namespace: default`. Es necesario que lo añadas manualmente a tu clúster en lo que respecta a los recursos desplegados.

### Opción 2: Utilizar un ejecutable precompilado

Si estás utilizando un proveedor de secretos estándar como `AWS Secrets Manager`, `AWS SSM` u otro, puedes utilizar el ejecutable [datadog-secret-backend][4] predefinido.

Este es un ejemplo de cómo configurarlo:

1. **Crea tu secreto** en AWS Secrets Manager. Los secretos `ARN` en AWS son el controlador del secretos. Ejemplo:
  ```
  arn:aws:secretsmanager:us-east-2:111122223333:secret:AgentAPIKey
  ```
2. **Otorga a tu instancia EC2 permisos IAM** para leer el secreto:
   ```
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Action": [
           "secretsmanager:GetSecretValue"
         ],
         "Resource": [
           "arn:aws:secretsmanager:us-east-2:111122223333:secret:AgentAPIKey"
         ]
       }
     ]
   }
   ```

3. Descarga la última versión de [datadog-secret-backend][5] en tu instancia EC2 y crea tu configuración `datadog-secret-backend.yaml` junto al binario. En el siguiente ejemplo se muestra una configuración para un backend de tipo `aws.secrets` con el nombre `staging-aws`:
   ```
   backends:
     staging-aws:
       backend_type: aws.secrets
   ```
4. Configura los derechos de acceso correctos para el binario como se describe en [requisitos de seguridad del Agent](#agent-security-requirements):
   ```sh
   chown dd-agent:dd-agent datadog-secret-backend
   chmod 500 datadog-secret-backend
   ```
5. Configura el Agent para que utilice el binario para resolver secretos y utilice el secreto de AWS (aquí como la `api_key`):
   ```
   api_key: ENC[staging-aws:arn:aws:secretsmanager:us-east-2:111122223333:secret:AgentAPIKey]

   secret_backend_command: /path/to/datadog-secret-backend
   ```
   El prefijo `staging-aws:` coincide con la clave definida en la configuración de tu backend.
6. Reinicia el Agent.

Puedes ver qué secretos ha resuelto el Agent ejecutando el comando `datadog-agent secrets` localmente en tu instancia EC2.

### Opción 3: Crear tu propio ejecutable personalizado

También puedes crear tu propio ejecutable de recuperación de secretos utilizando cualquier lenguaje. El único requisito es que siga el formato de entrada/salida descrito anteriormente.

He aquí un ejemplo Go que devuelve secretos ficticios:
```go
package main

import (
  "encoding/json"
  "fmt"
  "io/ioutil"
  "os"
)

type secretsPayload struct {
  Secrets []string `json:secrets`
  Version int      `json:version`
}

func main() {
  data, err := ioutil.ReadAll(os.Stdin)

  if err != nil {
    fmt.Fprintf(os.Stderr, "Could not read from stdin: %s", err)
    os.Exit(1)
  }
  secrets := secretsPayload{}
  json.Unmarshal(data, &secrets)

  res := map[string]map[string]string{}
  for _, handle := range secrets.Secrets {
    res[handle] = map[string]string{
      "value": "decrypted_" + handle,
    }
  }

  output, err := json.Marshal(res)
  if err != nil {
    fmt.Fprintf(os.Stderr, "could not serialize res: %s", err)
    os.Exit(1)
  }
  fmt.Printf(string(output))
}
```

Esto transforma tu configuración:

```yaml
instances:
  - server: db_prod
    user: ENC[db_prod_user]
    password: ENC[db_prod_password]
```

En lo siguiente en la memoria:

```yaml
instances:
  - server: db_prod
    user: decrypted_db_prod_user
    password: decrypted_db_prod_password
```

## Actualización de claves de API/aplicación en tiempo de ejecución

A partir de la versión v7.67 del Agent, puedes configurar el Agent para que actualice sus claves de API y aplicación en intervalos regulares sin necesidad de reiniciar. Esto depende de que la clave API y la clave de la aplicación se extraigan como secretos.

Para activarlo, configura `secret_refresh_interval` (en segundos) en tu archivo `datadog.yaml`:
```yaml
api_key: ENC[<secret_handle>]

secret_backend_command: /path/to/your/executable
secret_refresh_interval: 3600  # refresh every hour
```

En forma predeterminada, el Agent distribuye de manera aleatoria tu primera actualización en la ventana `secret_refresh_interval` especificada. Esto significa que
significa que resuelve la clave de API al inicio, luego la actualiza en el primer intervalo y en cada intervalo posterior.
Esto evita tener una flota de Agents actualizando tu clave de API/aplicación al mismo tiempo.

Para evitar tiempos de inactividad, sólo invalida la clave de API y la clave de la aplicación anteriores cuando toda tu flota de Agents haya
extraído las claves actualizadas de tu solución de gestión de secretos. Puedes realizar un rastreo del uso de tus claves de API en la page (página) [Fleet
Management] (https://app.datadoghq.com/fleet).

Puedes desactivar este comportamiento configurando:
```yaml
secret_refresh_scatter: false
```

Para actualizar manualmente, utiliza:
```
datadog-agent secret refresh
```

## Solucionar problemas

### Mostrar una lista con los secretos detectados

El comando `secret` de la CLI del Agent muestra los errores relacionados con tu configuración. Por ejemplo, puede indicar si los derechos del ejecutable son incorrectos. También genera una lista con los identificadores que encuentra y sus localizaciones.

En Linux, el comando dicta la modalidad de archivo, el propietario y el grupo del ejecutable. En Windows, se muestran los derechos de la lista de control de acceso.

{{< tabs >}}
{{% tab "Linux" %}}

Ejemplo en Linux:

```sh
datadog-agent secret
=== Checking executable rights ===
Executable path: /path/to/you/executable
Check Rights: OK, the executable has the correct rights

Rights Detail:
file mode: 100700
Owner username: dd-agent
Group name: dd-agent

=== Secrets stats ===
Number of secrets decrypted: 3
Secrets handle decrypted:
- api_key: from datadog.yaml
- db_prod_user: from postgres.yaml
- db_prod_password: from postgres.yaml
```

{{% /tab %}}
{{% tab "Windows" %}}

Ejemplo en Windows (desde un PowerShell del administrador):
```powershell
PS C:\> & "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" secret
=== Checking executable rights ===
Executable path: C:\path\to\you\executable.exe
Check Rights: OK, the executable has the correct rights

Rights Detail:
Acl list:
stdout:

Path   : Microsoft.PowerShell.Core\FileSystem::C:\path\to\you\executable.exe
Owner  : BUILTIN\Administrators
Group  : WIN-ITODMBAT8RG\None
Access : NT AUTHORITY\SYSTEM Allow  FullControl
         BUILTIN\Administrators Allow  FullControl
         WIN-ITODMBAT8RG\ddagentuser Allow  ReadAndExecute, Synchronize
Audit  :
Sddl   : O:BAG:S-1-5-21-2685101404-2783901971-939297808-513D:PAI(A;;FA;;;SY)(A;;FA;;;BA)(A;;0x1200
         a9;;;S-1-5-21-2685101404-2783901971-939297808-1001)

=== Secrets stats ===
Number of secrets decrypted: 3
Secrets handle decrypted:
- api_key: from datadog.yaml
- db_prod_user: from sqlserver.yaml
- db_prod_password: from sqlserver.yaml
```

{{% /tab %}}
{{< /tabs >}}

### Consultar las configuraciones después de introducir los secretos

Para consultar cómo se resuelven las configuraciones del check, puedes utilizar el comando `configcheck`:

```shell
sudo -u dd-agent -- datadog-agent configcheck

=== a check ===
Source: File Configuration Provider
Instance 1:
host: <decrypted_host>
port: <decrypted_port>
password: <obfuscated_password>
~
===

=== another check ===
Source: File Configuration Provider
Instance 1:
host: <decrypted_host2>
port: <decrypted_port2>
password: <obfuscated_password2>
~
===
```

**Nota**: El Agent debe [reiniciarse][6] para detectar cambios en los archivos de configuración.

### Depuración del secret_backend_command

Para probar un comando o depurarlo fuera del Agent, puedes imitar la forma en que el Agent lo ejecuta:

{{< tabs >}}
{{% tab "Linux" %}}
**Linux**

```bash
sudo -u dd-agent bash -c "echo '{\"version\": \"1.0\", \"secrets\": [\"secret1\", \"secret2\"]}' | /path/to/the/secret_backend_command"
```

El usuario `dd-agent` se crea durante la instalación del Datadog Agent.

{{% /tab %}}
{{% tab "Windows" %}}

##### Errores relacionados con los derechos

Los siguientes errores indican que falta algo en tu configuración.

1. Si más grupos o usuarios de los necesarios tienen derechos sobre el ejecutable, se generará un log de error similar al siguiente:
   ```
   error while decrypting secrets in an instance: Invalid executable 'C:\decrypt.exe': other users/groups than LOCAL_SYSTEM, Administrators or ddagentuser have rights on it
   ```

2. Si `ddagentuser` no tiene derechos de lectura y ejecución sobre el archivo, se generará un log de error similar al siguiente:
   ```
   error while decrypting secrets in an instance: could not query ACLs for C:\decrypt.exe
   ```

3. Tu ejecutable debe ser una aplicación válida de Win32. Si no lo es, se generará el siguiente log de error:
   ```
   error while running 'C:\decrypt.py': fork/exec C:\decrypt.py: %1 is not a valid Win32 application.
   ```

Datadog tiene un [script de Powershell][8] para ayudarte a configurar el permiso correcto en tu ejecutable. Ejemplo de cómo usarlo:

```powershell
.\Set-SecretPermissions.ps1 -SecretBinaryPath C:\secrets\decrypt_secrets.exe
ddagentuser SID: S-1-5-21-3139760116-144564943-2741514060-1076
=== Checking executable permissions ===
Executable path: C:\secrets\decrypt_secrets.exe
Executable permissions: OK, the executable has the correct permissions

Permissions Detail:

stdout:
Path   : Microsoft.PowerShell.Core\FileSystem::C:\secrets\decrypt_secrets.exe
Owner  : BUILTIN\Administrators
Group  : BUILTIN\Administrators
Access : NT AUTHORITY\SYSTEM Allow  FullControl
         BUILTIN\Administrators Allow  FullControl
         DESKTOP-V03BB2P\ddagentuser Allow  ReadAndExecute, Synchronize
Audit  :
Sddl   : O:BAG:BAD:PAI(A;;FA;;;SY)(A;;FA;;;BA)(A;;0x1200a9;;;S-1-5-21-3139760116-144564943-2741514
         060-1076)
stderr:


=== Secrets stats ===
Number of secrets resolved: 0
Secrets handle resolved:
```

##### Probar el ejecutable

El Agent ejecuta tu ejecutable durante la recuperación de tus secretos. El Datadog Agent opera con el usuario `ddagentuser`, que no tiene derechos específicos, pero forma parte del grupo `Performance Monitor Users`. La contraseña se genera de forma aleatoria durante la instalación y no se guarda en ninguna parte.

Esto significa que tu ejecutable podría funcionar con tu usuario predeterminado o tu usuario de desarrollo, excepto si lo ejecuta el Agent, ya que `ddagentuser` tiene derechos más restringidos.

Para probar tu ejecutable en las mismas condiciones que el Agent, actualiza la contraseña del `ddagentuser` en tu interfaz de desarrollo. De esta forma, podrás autenticarte como `ddagentuser` y operar con tu ejecutable en un contexto igual al del Agent.

Para hacerlo, sigue estos pasos:

1. Elimina `ddagentuser` de la lista `Local Policies/User Rights Assignement/Deny Log on locally` de la `Local Security Policy`.
2. Establece una contraseña nueva para `ddagentuser` (ya que la que se generó durante la instalación no se queda guardada). En PowerShell, ejecuta:
    ```powershell
    $user = [ADSI]"WinNT://./ddagentuser";
    $user.SetPassword("a_new_password")
    ```
3. Actualiza la contraseña que vaya a usar el servicio del `DatadogAgent` en el gestor de control de servicios. En PowerShell, ejecuta:
    ```powershell
    sc.exe config DatadogAgent password= "a_new_password"
    ```

Ahora, puedes iniciar sesión como `ddagentuser` para probar tu ejecutable. Datadog incluye un [script de PowerShell][7] para que puedas probar tu
ejecutable como otro usuario. Te permite cambiar los contextos de usuario y reproduce la forma en la que el Agent opera con tu ejecutable.

Ejemplo de uso:

```powershell
.\secrets_tester.ps1 -user ddagentuser -password a_new_password -executable C:\path\to\your\executable.exe -payload '{"version": "1.0", "secrets": ["secret_ID_1", "secret_ID_2"]}'
Creating new Process with C:\path\to\your\executable.exe
Waiting a second for the process to be up and running
Writing the payload to Stdin
Waiting a second so the process can fetch the secrets
stdout:
{"secret_ID_1":{"value":"secret1"},"secret_ID_2":{"value":"secret2"}}
stderr: None
exit code:
0
```
[7]: https://github.com/DataDog/datadog-agent/blob/master/docs/public/secrets/secrets_tester.ps1
[8]: https://github.com/DataDog/datadog-agent/blob/master/docs/public/secrets/Set-SecretPermissions.ps1

{{% /tab %}}
{{< /tabs >}}

### El Agent no se inicia

Lo primero que hace el Agent al iniciarse es cargar `datadog.yaml` y descifrar los secretos que contiene; este paso es anterior al de la configuración de los logs. Por esta razón, en plataformas como Windows, los errores que se producen al cargar `datadog.yaml` no se redactan en los logs, sino en `stderr`. Esta situación puede darse cuando el ejecutable que recibe el Agent para leer los secretos devuelve un error.

Si tienes secretos en `datadog.yaml` y el Agent no se inicia:

* Prueba iniciar el Agent manualmente para poder ver `stderr`.
* Elimina los secretos de `datadog.yaml` y prueba primero con secretos de un archivo de configuración del check.

### Probar los permisos de Kubernetes
Al leer secretos directamente de Kubernetes, puedes comprobar tus permisos con el comando `kubectl auth`. Utiliza el siguiente formato general:

```
kubectl auth can-i get secret/<SECRET_NAME> -n <SECRET_NAMESPACE> --as system:serviceaccount:<AGENT_NAMESPACE>:<AGENT_SERVICE_ACCOUNT>
```

Considera el ejemplo anterior [Kubernetes Secrets](#example-reading-a-kubernetes-secret-across-namespaces), donde el secreto `Secret:database-secret` existe en `Namespace: database` y la cuenta de servicio `ServiceAccount:datadog-agent` existe en `Namespace: default`.

En este caso, utiliza el siguiente comando:

```
kubectl auth can-i get secret/database-secret -n database --as system:serviceaccount:default:datadog-agent
```

Este comando indica si el Agent tiene los permisos correctos para ver este secreto.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/kubernetes/integrations/
[2]: https://kubernetes.io/docs/tasks/inject-data-application/distribute-credentials-secure/#create-a-pod-that-has-access-to-the-secret-data-through-a-volume
[3]: https://docs.docker.com/engine/swarm/secrets/
[4]: https://github.com/DataDog/datadog-secret-backend
[5]: https://github.com/DataDog/datadog-secret-backend/blob/main/docs/aws/secrets.md
[6]: /es/agent/configuration/agent-commands/#restart-the-agent