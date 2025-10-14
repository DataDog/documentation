---
algolia:
  tags:
  - api
cascade:
  algolia:
    category: API
    rank: 10
    subcategory: Références sur les API
further_reading:
- link: /api/latest/using-the-api/
  tag: Documentation
  text: Utiliser l'API
- link: /api/latest/scopes/
  tag: Documentation
  text: Contextes d'autorisation
- link: /api/latest/rate-limits/
  tag: Documentation
  text: Limites de débit
title: Références sur les API
type: api
---

{{< h2 >}}Références sur les API{{< /h2 >}}

L'API Datadog est une API HTTP REST. Elle utilise des URL orientées ressources pour appeler l'API, applique des codes de statut afin d'indiquer la réussite ou l'échec des requêtes, renvoie un objet JSON à partir de toutes les requêtes et tire profit des codes de réponse HTTP standard. Utilisez l'API Datadog pour accéder à la plateforme Datadog par programmation.

### Prise en main

Authentifiez-vous auprès de l'API avec une [clé d'API][1] en utilisant l'en-tête `DD-API-KEY`. Pour certains endpoints, vous devez également utiliser une [clé d'application][2], qui repose sur l'en-tête `DD-APPLICATION-KEY`.

Pour essayer l'API [![Run in Postman][3]](https://god.gw.postman.com/run-collection/20651290-809b13c1-4ada-46c1-af65-ab276c434068?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D20651290-809b13c1-4ada-46c1-af65-ab276c434068%26entityType%3Dcollection%26workspaceId%3Dbf049f54-c695-4e91-b879-0cad1854bafa)

**Remarque** : pour vous authentifier à l'API Datadog via Postman, ajoutez vos clés API et d'application Datadog aux **variables de collection** de la collection Datadog API.

La section [Utiliser l'API][4] présente le fonctionnement des endpoints.

**Remarques** :
   - Ajoutez vos clés API et d'application dans l'onglet **Variables** de la collection Datadog API.
   - Les exemples de code cURL supposent l'utilisation de BASH et des coreutils GNU. Sous macOS, vous pouvez installer coreutils avec le [gestionnaire de paquets Homebrew][5] : `brew install coreutils`.

### Bibliothèques client

Par défaut, la documentation dédiée à l'API Datadog propose des exemples en cURL. Sélectionnez l'une de nos [bibliothèques client][6] officielles dans chaque endpoint pour voir des exemples de code pour cette bibliothèque. Pour installer chaque bibliothèque :

{{< programming-lang-wrapper langs="java,python-legacy,python,ruby-legacy,ruby,go,typescript,rust" class="api-reference" >}}

{{< programming-lang lang="java" >}}
#### Installation
Maven - Ajoutez cette dépendance au fichier POM de votre projet :
```xml
<dependency>
  <groupId>com.datadoghq</groupId>
  <artifactId>datadog-api-client</artifactId>
  <version>{{< sdk-version "datadog-api-client-java" >}}</version>
  <scope>compile</scope>
</dependency>
```

 Gradle - Ajoutez cette dépendance au fichier de build de votre projet :
```gradle
compile "com.datadoghq:datadog-api-client:{{< sdk-version "datadog-api-client-java" >}}"
```

#### Utilisation

```java
import com.datadog.api.client.ApiClient;
import com.datadog.api.client.ApiException;
import com.datadog.api.client.Configuration;
import com.datadog.api.<VERSION>.client.api.*;
import com.datadog.api.<VERSION>.client.model.*;
```
 **Remarque** : remplacez `<VERSION>` par v1 ou v2 en fonction des endpoints que vous souhaitez utiliser.

#### Exemples

`pom.xml` Maven pour les exemples en cours d'exécution :
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
Assurez-vous que la variable `CLASSPATH` contienne toutes les dépendances.

```sh
export CLASSPATH=$(mvn -q exec:exec -Dexec.executable=echo -Dexec.args="%classpath")
```

`build.gradle` Gradle pour les exemples en cours d'exécution :
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
Lancez l'exemple en exécutant la commande `gradle run`.

{{< /programming-lang >}}

{{< programming-lang lang="python-legacy" >}}
#### Installation
```sh
pip install datadog
```
#### Utilisation
```python
import datadog
```
{{< /programming-lang >}}

{{< programming-lang lang="python" >}}
#### Installation
```console
pip3 install datadog-api-client
```
#### Utilisation
```python
import datadog_api_client
```
{{< /programming-lang >}}

{{< programming-lang lang="ruby-legacy" >}}
#### Installation
```sh
gem install dogapi
```
#### Utilisation
```ruby
require 'dogapi'
```
{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}
#### Installation
```sh
gem install datadog_api_client -v {{< sdk-version "datadog-api-client-ruby" >}}
```
#### Utilisation
```ruby
require 'datadog_api_client'
```
{{< /programming-lang >}}

{{< programming-lang lang="go" >}}
#### Installation
```sh
go mod init main && go get github.com/DataDog/datadog-api-client-go/v2/api/datadog
```
#### Utilisation
```go
import (
        "github.com/DataDog/datadog-api-client-go/v2/api/datadog"
        "github.com/DataDog/datadog-api-client-go/v2/api/datadog<VERSION>"
)
```
 **Remarque** : remplacez `<VERSION>` par `V1` ou `V2` en fonction des endpoints que vous souhaitez utiliser.
{{< /programming-lang >}}

{{< programming-lang lang="typescript" >}}
#### Installation
Le package est sous [@datadog/datadog-api-client][1] et peut être installé via NPM ou Yarn :

```js
# NPM
npm install @datadog/datadog-api-client

# Yarn
yarn add @datadog/datadog-api-client
```

#### Utilisation
```js
import { <VERSION> } from 'datadog-api-client';
```
 **Remarque** : remplacez `<VERSION>` par v1 ou v2 en fonction des endpoints que vous souhaitez utiliser.

[1]: https://www.npmjs.com/package/@datadog/datadog-api-client
{{< /programming-lang >}}

{{< programming-lang lang="rust" >}}
#### Installation
Exécutez `cargo add datadog-api-client` ou ajoutez ce qui suit à `Cargo.toml` sous `[dependencies]` :

```
datadog-api-client = "0"
```

#### Utilisation
Essayez l'extrait suivant pour valider votre clé d'API Datadog :
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

Vous pouvez également consulter directement les bibliothèques :

{{< partial name="api/sdk-languages.html" >}}
</br>
Vous préférez démarrer avec l’application ? Consultez la [documentation générale de prise en main][7] de Datadog.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/fr/account_management/api-app-keys/#api-keys
[2]: https://docs.datadoghq.com/fr/account_management/api-app-keys/#application-keys
[3]: https://run.pstmn.io/button.svg
[4]: /fr/api/v1/using-the-api/
[5]: https://brew.sh
[6]: https://docs.datadoghq.com/fr/developers/community/libraries/
[7]: /fr/getting_started/application/