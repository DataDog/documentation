---
algolia:
  tags:
  - secretos
  - secretos ejecutables
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

Para evitar que se guarden secretos como texto sin formato en los archivos de configuración del Agent, puedes utilizar el paquete de gestión de secretos.

El Agent puede utilizar el paquete `secrets` para invocar un archivo ejecutable proporcionado por el usuario, con el objetivo de gestionar la recuperación y el descifrado de secretos, que luego el mismo Agent suele cargar en su memoria. Este proceso permite al usuario utilizar cualquier servicio de backend de gestión de secretos (como HashiCorp Vault o AWS Secrets Manager) y elegir su método de autenticación preferido para establecer el proceso de confianza inicial. Para facilitar las cosas, los [scripts auxiliares](#helper-scripts-for-autodiscovery) que pueden utilizarse para este archivo ejecutable incluyen de base despliegues contenedorizados del Agent.

A partir de la versión 6.12, el paquete de gestión de secretos suele estar disponible en Linux para métricas, APM y monitorización de procesos, y en Windows, para métricas y APM.

## Uso de los secretos

### Definir los secretos en las configuraciones

Utiliza la notación `ENC[]` para indicar un secreto como valor de un campo YAML en tu configuración.

Los secretos son compatibles con cualquier backend de configuración (p. ej., files, etcd o consul) y con todas las variables de entorno.

También son compatibles con `datadog.yaml`. El Agent carga primero la configuración principal y, después de descifrar los datos secretos, la vuelve a cargar de nuevo. De esta forma, dichos secretos no se pueden utilizar en los parámetros `secret_*`.

Los secretos siempre son cadenas, así que no puedes utilizarlos para definir un entero o un valor boleano.

Ejemplo:

```yaml
instances:
  - server: db_prod
    # two valid secret handles
    user: "ENC[db_prod_user]"
    password: "ENC[db_prod_password]"

    # The `ENC[]` handle must be the entire YAML value, which means that
    # the following is NOT detected as a secret handle:
    password2: "db-ENC[prod_password]"
```

Este ejemplo incluye dos secretos: `db_prod_user` y `db_prod_password`. Se trata de los _identificadores_ de secretos, y sirven para determinarlos de forma única dentro de tu backend de gestión de secretos.

Entre paréntesis, puedes añadir todo tipo de caracteres, siempre y cuando la configuración del YAML sea válida. Por esta razón, las comillas deben utilizarse como secuencia de escape. Ejemplo:

```text
"ENC[{\"env\": \"prod\", \"check\": \"postgres\", \"id\": \"user_password\"}]"
```

En el ejemplo anterior, la cadena `{"env": "prod", "check": "postgres", "id": "user_password"}` es el identificador de secretos.

No es necesario establecer una secuencia de escape para los caracteres `[` y `]` de la expresión. Ejemplo:

```text
"ENC[user_array[1234]]"
```

En el ejemplo anterior, la cadena `user_array[1234]` es el identificador de secretos.

Los secretos se determinan una vez que se determinan las variables de plantilla de [Autodiscovery][1]. Esto te permite usarlos en un identificador de secretos. Ejemplo:

```yaml
instances:
  - server: %%host%%
    user: ENC[db_prod_user_%%host%%]
    password: ENC[db_prod_password_%%host%%]
```

### Proporcionar un archivo ejecutable

Para ver los secretos, es necesario que proporciones un ejecutable que pueda autenticarse en tu backend de gestión de secretos y permita recuperarlos.

El Agent oculta secretos internamente en su memoria para reducir la cantidad de invocaciones (lo cual es útil en entornos contenedorizados, por ejemplo). El Agent invoca el ejecutable siempre que accede a un archivo de configuración de un check que contiene al menos un identificador de secretos, si dichos secretos no están cargados en la memoria. Concretamente, si los secretos ya se han cargado en la memoria, no se activan las invocaciones adicionales del ejecutable. En la práctica, lo que ocurre es que el Agent invoca el ejecutable proporcionado por el usuario una vez por cada archivo si, al iniciar el archivo, detecta que contiene un identificador de secretos. Además, puede que vuelva a invocarlo posteriormente si el Agent o la instancia se reinician o si el Agent carga de forma dinámica un nuevo check que contenga un identificador de secretos (por ejemplo, de Autodiscovery).

APM y Process Monitoring ejecutan su propio proceso/servicio y, como los procesos no comparten memoria, cada uno debe poder cargar o descifrar sus correspondientes secretos. De hecho, si  `datadog.yaml` contiene secretos, cada proceso podría invocar el ejecutable una vez. Por ejemplo, si guardas `api_key` como secreto en el archivo `datadog.yaml` y tienes activadas las herramientas APM y Process Monitoring, se podría invocar el backend de secretos tres veces.

De forma predeterminada, el ejecutable que proporciona el usuario debe incluir los mecanismos necesarios de gestión de errores. En cambio, el Agent debe reiniciarse si un secreto se tiene que actualizar en la memoria (por ejemplo, si se revoca una contraseña).

El uso de un ejecutable proporcionado por el usuario presenta varias ventajas:

* Garantiza que el Agent no intente cargar parámetros en la memoria para los que no existe un identificador de secretos.
* Permite al usuario limitar la visibilidad del Agent a los secretos que necesita (por ejemplo, restringe la lista de secretos a los que puede acceder en el backend de gestión de claves).
* Te da flexibilidad y libertad para que autorices a los usuarios a utilizar cualquier backend de gestión de secretos sin tener que volver a crear el Agent.
* Habilita que los usuarios resuelvan el problema de confianza inicial del Agent en sus backends de gestión de secretos. Este proceso permite aplicar el método de autenticación preferido del usuario y se ajusta a su flujo de integración continuo.

#### Configuración

Establece la siguiente variable en `datadog.yaml`:

```yaml
secret_backend_command: <EXECUTABLE_PATH>
```

#### Requisitos de seguridad del Agent

El Agent ejecuta el ejecutable `secret_backend_command` como un subproceso. Los patrones de ejecución son diferentes para Linux y Windows.

{{< tabs >}}
{{% tab "Linux" %}}

En Linux, el ejecutable configurado como `secret_backend_command`:

* debe pertenecer al mismo usuario que está ejecutando el Agent (`dd-agent` de forma predeterminada o `root` dentro de un contenedor);
* no debe tener derechos para un grupo u otro tipo de elemento;
* debe contar, como mínimo, con derechos de ejecución para el propietario.

{{% /tab %}}
{{% tab "Windows" %}}

En Windows, el ejecutable configurado como `secret_backend_command`:

* debe tener derechos de lectura/ejecución para `ddagentuser` (el usuario que se utiliza para ejecutar el Agent);
* no debe tener derechos para ningún usuario o grupo, excepto el grupo `Administrators`, la cuenta integrada del sistema local o el contexto de usuario del Agent (por defecto, `ddagentuser`);
* debe ser una aplicación Win32 válida para que el Agent pueda ejecutarla (por ejemplo, un script PowerShell o Python no funcionaría).

{{% /tab %}}
{{< /tabs >}}

**Nota**: El ejecutable comparte las mismas variables de entorno que el Agent.

Nunca indiques información confidencial en `stderr`. Si el archivo binario tiene un código de estado distinto de `0`, el Agent creará un log de salida de error estándar del ejecutable para facilitar la resolución del problema.

#### La API del ejecutable

El ejecutable sigue una API simple, significa que lee el JSON de la entrada estándar y produce un JSON de salida con los secretos descifrados que se añade a la salida estándar.

Si el código de salida del ejecutable es distinto de `0`, la configuración de la integración que se está descifrando se considera errónea y se descarta.

##### Ejemplo de entrada de la API

El ejecutable recibe una carga útil JSON procedente de la entrada estándar que contiene la lista de secretos que hay que recuperar:

```json
{"version": "1.0", "secrets": ["secret1", "secret2"]}
```

* `version`: es una cadena que contiene la versión de formato (actualmente, 1.0).
* `secrets`: es una lista de cadenas; cada cadena representa un identificador de una configuración correspondiente a un secreto que hay que recuperar.

##### Ejemplo de salida de la API

Se espera que el ejecutable genere una carga útil JSON en la salida estándar que contenga los secretos recuperados:

```json
{
  "secret1": {"value": "secret_value", "error": null},
  "secret2": {"value": null, "error": "could not fetch the secret"}
}
```

La carga útil prevista es un objeto JSON, donde cada una de las claves representa uno de los identificadores solicitados en la carga útil de entrada. El valor de cada uno de esos indicadores es un objeto JSON con 2 campos:

* `value` (cadena): el valor del secreto que debe utilizarse en las configuraciones del check (puede ser "null" en caso de error).
* `error` (cadena): el mensaje de error, si corresponde. Si el error no es "null", la configuración de integración que utiliza este identificador se considera errónea y se descarta.

##### Ejemplo de ejecutable

A continuación, te presentamos un programa Go de prueba en el que se añade un prefijo `decrypted_` a cada secreto:

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

Esta acción actualiza la configuración (en el archivo del check):

```yaml
instances:
  - server: db_prod
    user: ENC[db_prod_user]
    password: ENC[db_prod_password]
```

con lo siguiente (en la memoria del Agent):

```yaml
instances:
  - server: db_prod
    user: decrypted_db_prod_user
    password: decrypted_db_prod_password
```

## Scripts auxiliares para Autodiscovery

Muchas de las integraciones de Datadog requieren de credenciales para recuperar métricas. Para evitar tener que codificarlas en una [plantilla del Autodiscovery][1], puedes separarlas de la propia plantilla mediante la gestión de secretos.

A partir de la versión 7.32.0, el [script auxiliar][2] está disponible en la imagen del contenedor del Agent como `/readsecret_multiple_providers.sh`, y puedes utilizarlo para recuperar secretos de archivos, además de secretos de Kubernetes. Los dos scripts de las versiones anteriores (`readsecret.sh` y  `readsecret.py`) también son compatibles, pero solo pueden leer secretos de archivos.

### Script para leer secretos de varios proveedores

#### Uso de varios proveedores
El script `readsecret_multiple_providers.sh` puede utilizarse para leer secretos de ambos archivos, así como secretos de Kubernetes, que deben tener el formato `ENC[provider@some/path]`. Ejemplo:

| Proveedor               | Formato                                           |
|------------------------|--------------------------------------------------|
| Lectura de archivos        | `ENC[file@/path/to/file]`                        |
| Secretos de Kubernetes     | `ENC[k8s_secret@some_namespace/some_name/a_key]` |

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

#### Ejemplo de lectura de un archivo
El Agent puede leer un archivo específico teniendo en cuenta la ruta indicada. Este archivo puede recuperarse a partir de [secretos de Kubernetes](#kubernetes-secrets), [secretos de Docker Swarm](#docker-swarm-secrets) o mediante cualquier otro método personalizado.

Si el contenedor del Agent incluye un archivo `/etc/secret-volume/password` compuesto por una contraseña de texto sin formato, puedes hacer referencia a este fichero con una notación como `ENC[file@/etc/secret-volume/password]`.

##### Secretos de Kubernetes
Con Kubernetes, puedes [exponer los secretos como archivos][3] dentro de un pod. Por ejemplo, si un secreto como`Secret: test-secret` incluye los datos `db_prod_password: example`, dicho secreto se integra en el contenedor del Agent con la siguiente configuración:
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
En este ejemplo, el contenedor del Agent incluye el archivo `/etc/secret-volume/db_prod_password` con el contenido de `example`. Para referirnos a él en la configuración, se utiliza `ENC[file@/etc/secret-volume/db_prod_password]`.

**Notas:**
- El secreto debe existir en el mismo espacio de nombres que el pod en el que se va a integrar.
- El script puede acceder a todas las subcarpetas, así como al contenido confidencial de `/var/run/secrets/kubernetes.io/serviceaccount/token`. Por este motivo, Datadog recomienda utilizar una carpeta exclusiva en vez de `/var/run/secrets`.

##### Secretos de Docker Swarm
Los [secretos de Docker Swarm][4] se integran en la carpeta `/run/secrets`. Por ejemplo, el secreto de Docker `db_prod_passsword` se ubica en `/run/secrets/db_prod_password`, en el contenedor del Agent. En la configuración, podríamos referirnos a él con `ENC[file@/run/secrets/db_prod_password]`.

#### Ejemplo de lectura de un secreto de Kubernetes
La siguiente configuración permite al Agent leer secretos de Kubernetes directamente en su propio espacio de nombres, así como en *otros*. Ten en cuenta que, para hacer esto, la `ServiceAccount` del Agent debe tener los `Roles` y `RoleBindings` apropiados.

Si `Secret: database-secret` existe en `Namespace: database` y contiene los datos `password: example`, nos referiremos a él en la configuración con `ENC[k8s_secret@database/database-secret/password]`. Esta configuración permite al Agent recuperar el secreto directamente desde el Kubernetes, lo que resulta particularmente útil cuando nos referimos a un secreto que está en un espacio de nombres diferente al del Agent.

Para realizar esta acción, tendrás que conceder permisos adicionales manualmente a la cuenta de servicio del Agent. Puedes tomar la siguiente política de configuración del control de acceso basado en roles (RBAC) como ejemplo:
```yaml
apiVersion: rbac.authorization.k8s.io/v1
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
Este `Role` permite acceder al `Secret: database-secret` en el `Namespace: database`. El `RoleBinding` asocia esta autorización a la `ServiceAccount: datadog-agent` en el `Namespace: default`. Es necesario que lo añadas manualmente a tu clúster en lo que respecta a los recursos desplegados.

Además de estos permisos, tienes que activar el script para que pueda leer secretos de varios proveedores `"/readsecret_multiple_providers.sh"` al usar el proveedor de secretos de Kubernetes.

### Scripts (legacy) para leer secretos de archivos
Datadog Agent v7.32 incluye el script `readsecret_multiple_providers.sh`. Datadog recomienda que utilices este script en lugar de los scripts `/readsecret.py` y `/readsecret.sh` del Agent v6.12. No obstante, ten en cuenta que `/readsecret.py` y `/readsecret.sh` siguen estando disponibles en el Agent para leer archivos.

#### Java
Estos scripts necesitan una carpeta como argumento. Los identificadores secretos se interpretan como nombres de archivo relativos a esta carpeta. Para evitar la filtración de información sensible, estos scripts rechazan el acceso a cualquier archivo fuera de la carpeta raíz especificada (incluidos los objetivos de enlaces simbólicos).

Estos scripts no son compatibles con las [operaciones SCC restringidas de OpenShift][5] y requieren que el Agent se ejecute como usuario `root`.

##### Docker
[Los secretos de Docker Swarm][4] se integran en la carpeta `/run/secrets`. Para leerlos, es necesario que pases las siguientes variables de entorno a tu contenedor del Agent:

```
DD_SECRET_BACKEND_COMMAND=/readsecret.py
DD_SECRET_BACKEND_ARGUMENTS=/run/secrets
```

Con esta configuración, el Datadog Agent lee los archivos de secretos ubicados en el directorio `/run/secrets`. Por ejemplo, la configuración `ENC[password]` serviría para que el Agent busque el archivo `/run/secrets/password`.

##### Sensitive Data Scanner
Con Kubernetes, puedes [exponer los secretos como archivos][3] dentro de un pod. Por ejemplo, si tus secretos se integran en `/etc/secret-volume`, utiliza las siguientes variables de entorno:

```
DD_SECRET_BACKEND_COMMAND=/readsecret.py
DD_SECRET_BACKEND_ARGUMENTS=/etc/secret-volume
```

Con esta configuración, el Datadog Agent lee los archivos de secretos ubicados en el directorio `/etc/secret-volume`. Por ejemplo, la configuración `ENC[password]` serviría para que el Agent busque el archivo `/etc/secret-volume/password`.

## Solucionar problemas

### Mostrar una lista con los secretos detectados

El comando `secret` de la CLI del Agent muestra los errores relacionados con tu configuración. Por ejemplo, puede indicar si los derechos del ejecutable son incorrectos. También genera una lista con los identificadores que encuentra y sus localizaciones.

En Linux, el comando dicta la modalidad de archivo, el propietario y el grupo del ejecutable. En Windows, se muestran los derechos de la lista de control de acceso.

{{< tabs >}}
{{% tab "Linux" %}}

Ejemplo en Linux:

```shell
$> datadog-agent secret
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
#### Linux

```bash
sudo -u dd-agent bash -c "echo '{\"version\": \"1.0\", \"secrets\": [\"secret1\", \"secret2\"]}' | /path/to/the/secret_backend_command"
```

El usuario `dd-agent` se crea durante la instalación del Datadog Agent.


{{% /tab %}}
{{% tab "Windows" %}}
#### Windows

##### Errores relacionados con derechos

Si te encuentras con uno de los siguientes errores, entonces algo falta en tu configuración. Consulta las [instrucciones de Windows](#Windows).

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

Toma el [ejemplo de los secretos de Kubernetes](#read-from-kubernetes-secret-example) anterior, en el que el secreto `Secret:database-secret` está en el `Namespace: database` y la cuenta de servicio `ServiceAccount:datadog-agent` en el `Namespace: default`.

En este caso, utiliza el siguiente comando:

```
kubectl auth can-i get secret/database-secret -n database --as system:serviceaccount:default:datadog-agent
```

Este comando indica si el Agent tiene los permisos correctos para ver este secreto.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/kubernetes/integrations/
[2]: https://github.com/DataDog/datadog-agent/blob/main/Dockerfiles/agent/secrets-helper/readsecret_multiple_providers.sh
[3]: https://kubernetes.io/docs/tasks/inject-data-application/distribute-credentials-secure/#create-a-pod-that-has-access-to-the-secret-data-through-a-volume
[4]: https://docs.docker.com/engine/swarm/secrets/
[5]: https://github.com/DataDog/datadog-agent/blob/6.4.x/Dockerfiles/agent/OPENSHIFT.md#restricted-scc-operations
[6]: /es/agent/configuration/agent-commands/#restart-the-agent
[7]: https://github.com/DataDog/datadog-agent/blob/master/docs/agent/secrets_scripts/secrets_tester.ps1