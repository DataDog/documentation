---
algolia:
  tags:
  - api
cascade:
  algolia:
    category: API
    rank: 10
    subcategory: Referencia de API
further_reading:
- link: /api/latest/using-the-api/
  tag: Documentación
  text: Uso de la API
- link: /api/latest/scopes/
  tag: Documentación
  text: Contextos de autorización
- link: /api/latest/rate-limits/
  tag: Documentación
  text: Límites de frecuencias
title: Referencia de API
type: api
---

{{< h2 >}}Referencia de API{{< /h2 >}}

La API Datadog es una API REST HTTP. La API utiliza URL orientadas a recursos para llamar a la API, utiliza códigos de estado para indicar el éxito o el fracaso de las solicitudes, devuelve JSON de todas las solicitudes y utiliza códigos de respuesta HTTP estándar. Utiliza la API Datadog para acceder a la plataforma Datadog mediante programación.

### Empezando

Autentícate en la API con una [clave de API][1] utilizando la cabecera `DD-API-KEY`. Para algunos endpoints, también necesitas una [clave de aplicación][2], que utiliza la cabecera `DD-APPLICATION-KEY`.

Para probar la API [![Ejecuta en Postman][3]](https://god.gw.postman.com/run-collection/20651290-809b13c1-4ada-46c1-af65-ab276c434068?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D20651290-809b13c1-4ada-46c1-af65-ab276c434068%26entityType%3Dcollection%26workspaceId%3Dbf049f54-c695-4e91-b879-0cad1854bafa)

**Nota**: Para autenticarse en la API Datadog a través de Postman, añade tus valores de clave de API y de clave de aplicación Datadog a las **variables de recopilación** de la recopilación de la API Datadog.

El [uso de la API][4] es una guía de los endpoints.

**Notas**:
   - Añade tus valores de API y de clave de aplicación a la pestaña **Variables** de la recopilación de la API Datadog.
   - Los ejemplos de código cURL suponen el uso de coreutils BASH y GNU. En macOS, puedes instalar coreutils con el [Gestor de paquetes Homebrew][5]: `brew install coreutils`

### Bibliotecas cliente

Por defecto, los documentos de la API Datadog muestran ejemplos en cURL. Selecciona uno de nuestros lenguajes oficiales de [bibliotecas cliente][6] en cada endpoint para ver ejemplos de código de ese biblioteca. Para instalar cada biblioteca:

{{< programming-lang-wrapper langs="java,python-legacy,python,ruby-legacy,ruby,go,typescript,rust" class="api-reference" >}}

{{< programming-lang lang="java" >}}
#### Instalación
Maven - Añade esta dependencia al modelo de objetos de proyecto (POM) de tu proyecto:
```xml
<dependency>
  <groupId>com.datadoghq</groupId>
  <artifactId>datadog-api-client</artifactId>
  <version>{{< sdk-version "datadog-api-client-java" >}}</version>
  <scope>compile</scope>
</dependency>
```

Gradle - Añade esta dependencia al archivo de compilación de tu proyecto:
```gradle
compile "com.datadoghq:datadog-api-client:{{< sdk-version "datadog-api-client-java" >}}"
```

#### Utilización

```java
import com.datadog.api.client.ApiClient;
import com.datadog.api.client.ApiException;
import com.datadog.api.client.Configuration;
import com.datadog.api.<VERSION>.client.api.*;
import com.datadog.api.<VERSION>.client.model.*;
```
**Nota**: Sustituye `<VERSION>` por v1 o v2, en función de los endpoints que quieras utilizar.

#### Ejemplos

Maven `pom.xml` para ejecutar ejemplos:
```xml
<project>
  <modelVersion>4.0.0</modelVersion>
  <groupId>com.example</groupId>
  <artifactId>example</artifactId>
  <version>1</version>
  <dependencies>
    <dependency>
      <groupId>com.datadoghq</groupId>
      <artifactId>datadog-api-client</artifactId>
      <version>{{< sdk-version "datadog-api-client-java" >}}</version>
      <scope>compile</scope>
    </dependency>
  </dependencies>
</project>
```
Asegúrate de que la variable `CLASSPATH` contiene todas las dependencias.

```sh
export CLASSPATH=$(mvn -q exec:exec -Dexec.executable=echo -Dexec.args="%classpath")
```

Gradle `build.gradle` para ejecutar ejemplos:
```gradle
plugins {
    id 'java'
    id 'application'
}

repositories {
    jcenter()
}

dependencies {
    implementation 'com.datadoghq:datadog-api-client:{{< sdk-version "datadog-api-client-java" >}}'
}

application {
    mainClassName = 'Example.java'
}
```
Ejemplo de ejecución con el comando `gradle run`.

{{< /programming-lang >}}

{{< programming-lang lang="python-legacy" >}}
#### Instalación
```sh
pip install datadog
```
#### Utilización
```python
import datadog
```
{{< /programming-lang >}}

{{< programming-lang lang="python" >}}
#### Instalación
```console
pip3 install datadog-api-client
```
#### Utilización
```python
import datadog_api_client
```
{{< /programming-lang >}}

{{< programming-lang lang="ruby-legacy" >}}
#### Instalación
```sh
gem install dogapi
```
#### Utilización
```ruby
require 'dogapi'
```
{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}
#### Instalación
```sh
gem install datadog_api_client -v {{< sdk-version "datadog-api-client-ruby" >}}
```
#### Utilización
```ruby
require 'datadog_api_client'
```
{{< /programming-lang >}}

{{< programming-lang lang="go" >}}
#### Instalación
```sh
go mod init main && go get github.com/DataDog/datadog-api-client-go/v2/api/datadog
```
#### Utilización
```go
import (
        "github.com/DataDog/datadog-api-client-go/v2/api/datadog"
        "github.com/DataDog/datadog-api-client-go/v2/api/datadog<VERSION>"
)
```
**Nota**: Sustituye `<VERSION>` por `V1` o `V2`, en función de los endpoints que quieras utilizar.
{{< /programming-lang >}}

{{< programming-lang lang="typescript" >}}
#### Instalación
El paquete está en [@datadog/datadog-api-client][1] y se puede instalar a través de NPM o Yarn:

```js
# NPM
npm install @datadog/datadog-api-client

# Yarn
yarn add @datadog/datadog-api-client
```

#### Utilización
```js
import { <VERSION> } from 'datadog-api-client';
```
**Nota**: Sustituye `<VERSION>` por v1 o v2, en función de los endpoints que quieras utilizar.

[1]: https://www.npmjs.com/package/@datadog/datadog-api-client
{{< /programming-lang >}}

{{< programming-lang lang="rust" >}}
#### Instalación
Ejecuta `cargo add datadog-api-client` o añade lo siguiente a `Cargo.toml` en `[dependencies]`:

```
datadog-api-client = "0"
```

#### Utilización
Prueba el siguiente fragmento para validar la clave de tu API Datadog:
```rust
use datadog_api_client::datadog::Configuration;
use datadog_api_client::datadogV1::api_authentication::AuthenticationAPI;

#[tokio::main]
async fn main() {
    let configuration = Configuration::new();
    let api = AuthenticationAPI::with_config(configuration);
    let resp = api.validate().await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
```

[1]: https://crates.io/crates/datadog-api-client
[2]: https://docs.rs/datadog-api-client/latest/datadog_api_client/
{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

O consulta directamente en las bibliotecas:

{{< partial name="api/sdk-languages.html" >}}
</br>
¿Estás intentando empezar con la aplicación? Consulta los [documentos "Empezando con"][7] de Datadog.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/es/account_management/api-app-keys/#api-keys
[2]: https://docs.datadoghq.com/es/account_management/api-app-keys/#application-keys
[3]: https://run.pstmn.io/button.svg
[4]: /es/api/v1/using-the-api/
[5]: https://brew.sh
[6]: https://docs.datadoghq.com/es/developers/community/libraries/
[7]: /es/getting_started/application/