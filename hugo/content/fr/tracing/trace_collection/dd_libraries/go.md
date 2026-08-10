---
aliases:
- /fr/tracing/go/
- /fr/tracing/languages/go
- /fr/agent/apm/go/
- /fr/tracing/setup/go
- /fr/tracing/setup_overview/go
- /fr/tracing/setup_overview/setup/go
- /fr/tracing/trace_collection/automatic_instrumentation/dd_libraries/go
code_lang: go
code_lang_weight: 20
further_reading:
- link: https://github.com/DataDog/dd-trace-go/tree/v1
  tag: Code source
  text: Code source SDK
- link: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/ddtrace
  tag: Site externe
  text: Documentation de l'API SDK
- link: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/ddtrace
  tag: Site externe
  text: Documentation de l'API SDK pour v2
- link: https://github.com/DataDog/orchestrion
  tag: Code source
  text: Code source Orchestrion
- link: /tracing/glossary/
  tag: Documentation
  text: Explorer vos services, ressources et traces
title: Tracer des applications Go
type: multi-code-lang
---
## Exigences de compatibilité {#compatibility-requirements}

Le Go Tracer nécessite Go `1.18+` et Datadog Agent `>= 5.21.1`. Pour une liste complète des versions de Go et du support des frameworks de Datadog (y compris les versions héritées et de maintenance), consultez la page [Exigences de compatibilité][1].

{{% tracing-go-v2 %}}

## Prise en main {#getting-started}

Avant de commencer, assurez-vous d'avoir déjà [installé et configuré Datadog Agent][5].

Il existe deux façons d'instrumenter votre application Go :

1. **Instrumentation à la compilation** :
   - Assure une couverture maximale de votre instrumentation de traçage.
   - Ne nécessite pas de modifications du code source, ce qui est idéal pour une intégration au niveau CI/CD.
1. **Instrumentation manuelle** :

   Utilisez dd-trace-go en conjonction avec nos packages d'intégration pour générer automatiquement des spans concernant les bibliothèques de votre choix. Cette option :
   - Vous donne un contrôle total sur les parties de votre application qui sont tracées.
   - Nécessite de modifier le code source de l'application.

Référez-vous aux instructions dans la section correspondant à votre préférence ci-dessous :

{{< tabs >}}

{{% tab "Instrumentation à la compilation" %}}

### Aperçu {#overview}

[Orchestrion][6] ajoute automatiquement l'instrumentation aux applications Go lors de la compilation, éliminant ainsi le besoin de modifications de code. Il fournit une couverture de traçage complète et permet des fonctionnalités de sécurité exclusives :

- Couverture de traçage complète :
   - Instrumente votre code et toutes les dépendances, y compris la bibliothèque standard Go
   - Instrumente votre code lors de la compilation, empêchant les lacunes dans la couverture de traçage dues à une instrumentation manuelle négligée
- Fonctionnalité exclusive de [Protection des applications et API][7] **Prévention des exploits**. [Prévention des exploits][15] est une mise en œuvre de la protection des applications en cours d'exécution (RASP) et inclut des méthodes RASP telles que l'inclusion de fichiers locaux (LFI).

### Exigences {#requirements}

- Prend en charge les deux dernières versions du Go runtime (correspondant à [la politique de publication officielle de Go][8]).
- Les applications doivent être gérées à l'aide de [modules Go][10]. Le vendoring de modules est pris en charge.


### Installer Orchestrion {#install-orchestrion}

Pour installer et configurer Orchestrion :

1. Installer Orchestrion :
   ```sh
   go install github.com/DataDog/orchestrion@latest
   ```
   <div class="alert alert-info">Assurez-vous que <code>$(go env GOBIN)</code> ou <code>$(go env GOPATH)/bin</code> est dans votre <code>$PATH</code>.</div>

1. Enregistrez Orchestrion dans le `go.mod` de votre projet :
   ```sh
   orchestrion pin
   ```
   Référez-vous à la sortie de `orchestrion pin -help` pour plus d'informations sur les options de personnalisation disponibles.
1. Engagez les modifications dans votre système de contrôle de version (sauf si vous intégrez `orchestrion` directement dans votre pipeline CI/CD) :
   ```sh
   git add go.mod go.sum orchestrion.tool.go
   git commit -m "chore: enable orchestrion"
   ```

   Vous pouvez maintenant gérer votre dépendance à `orchestrion` comme toute autre dépendance en utilisant le fichier `go.mod`.

### Utilisation {#usage}

Utilisez l'une de ces méthodes pour activer Orchestrion dans votre processus de construction :

#### Placez `orchestrion` avant vos commandes `go` habituelles : {#prepend-orchestrion-to-your-usual-go-commands}
  ```sh
  orchestrion go build .
  orchestrion go run .
  orchestrion go test ./...
  ```
#### Ajoutez l'argument `-toolexec="orchestrion toolexec"` à vos commandes `go` : {#add-the-toolexecorchestrion-toolexec-argument-to-your-go-commands}
   ```sh
   go build -toolexec="orchestrion toolexec" .
   go run -toolexec="orchestrion toolexec" .
   go test -toolexec="orchestrion toolexec" ./...
   ```
#### Modifiez la variable d'environnement `$GOFLAGS` pour injecter Orchestrion, et utilisez les commandes `go` normalement : {#modify-the-goflags-environment-variable-to-inject-orchestrion-and-use-go-commands-normally}
   ```sh
   # Make sure to include the quotes as shown below, as these are required for
   # the Go toolchain to parse GOFLAGS properly!
   export GOFLAGS="${GOFLAGS} '-toolexec=orchestrion toolexec'"
   go build .
   go run .
   go test ./...
   ```

### Personnalisation de la trace {#trace-customization}

#### Configuration du tagging de service unifié {#setting-up-unified-service-tagging}

Les applications instrumentées par `orchestrion` prennent en charge le tagging de service unifié (UST). Vous pouvez définir des tags UST pour vos traces en définissant la variable d'environnement correspondante dans l'environnement **runtime** de votre application :

| Tag unifié | Environnement  |
|-------------|--------------|
| `env`       | `DD_ENV`     |
| `service`   | `DD_SERVICE` |
| `version`   | `DD_VERSION` |

Pour plus d'informations, référez-vous à la [documentation sur le tagging de service unifié][14].

#### Configuration du Traceur {#tracer-configuration}

Référez-vous à [Configuration de la Bibliothèque][16] pour les instructions de configuration.

#### Créez des spans de trace personnalisés {#create-custom-trace-spans}

Des spans de trace personnalisés peuvent être créés automatiquement pour toute fonction annotée avec le commentaire de directive `//dd:span` :

{{<code-block lang="go" filename="example.go" collapsible="true">}}
//dd:span custom_tag:tag_value
func CriticalPathFunction() {
  // ... implementation details ...
}
{{</code-block>}}

Cela fonctionne également avec des expressions littérales de fonction :

{{<code-block lang="go" filename="example.go" collapsible="true">}}
//dd:span custom_tag:tag_value
handler := func(w http.ResponseWriter, r *http.Request) {
  // ... implementation details ...
}
{{</code-block>}}

#### Nom de l'Opération {#operation-name}

Le nom de l'opération (`span.name`) est déterminé automatiquement en utilisant la priorité suivante :
1. Une balise explicite `span.name:customOperationName` spécifiée comme argument de directive
2. Le nom déclaré de la fonction (cela ne s'applique pas aux expressions littérales de fonction, qui sont anonymes)
3. La valeur de la toute première balise fournie à la liste des arguments de directive

{{<code-block lang="go" filename="example.go" collapsible="true">}}
//dd:span tag-name:spanName other-tag:bar span.name:operationName
func tracedFunction() {
  // This function will be represented as a span named "operationName"
}

//dd:span tag-name:spanName other-tag:bar
func otherTracedFunction() {
  // This function will be represented as a span named "otherTracedFunction"
}

//dd:span tag-name:spanName other-tag:bar
tracedFunction := func() {
  // This function will be represented as a span named "spanName"
}
{{</code-block>}}

#### Résultats d'erreur {#error-results}

Si la fonction annotée renvoie un `error` résultat, toute erreur renvoyée par la fonction sera automatiquement attachée au span de trace correspondant :

{{<code-block lang="go" filename="example.go" collapsible="true">}}
//dd:span
func failableFunction() (any, error) {
  // This span will have error information attached automatically.
  return nil, errors.ErrUnsupported
}
{{</code-block>}}

#### Empêchez l'instrumentation de certaines parties du code {#prevent-instrumentation-of-some-code}

Vous pouvez utiliser la directive `//orchestrion:ignore` pour empêcher `orchestrion` d'effectuer _toute_ modification sur le code annoté.

Cela peut être utilisé pour empêcher l'instrumentation côté appelant d'être appliquée à des emplacements spécifiques :

{{<code-block lang="go" filename="example.go" collapsible="true">}}
import "database/sql"

// Caller-side instrumentation normally happens within this function...
func normal() {
  // The following assignment will NOT be modified to add any caller-side
  // instrumentation as it is opted out by the orchestrion:ignore directive:
  //orchestrion:ignore
  db, err := sql.Open("driver-name", "database=example")
  // ...
}

// Caller-side instrumentation will NOT happen in the following function
// as it is annotated with orchestrion:ignore.
//orchestrion:ignore
func excluded() {
  // The following assignment will NOT be modified to add any caller-side
  // instrumentation as the surrounding context is excluded by an
  // orchestrion:ignore directive:
  db, err := sql.Open("driver-name", "database=example")
  // ...
}
{{</code-block>}}

Une partie de l'instrumentation effectuée par `orchestrion` est réalisée côté appelé (ou côté bibliothèque), ce qui signifie que l'intégration est ajoutée directement au sein de la dépendance elle-même. Dans de tels cas, il n'est pas possible de se désinscrire localement de telles intégrations.

#### Utilisez le SDK {#use-the-sdk}

Vous pouvez utiliser le [SDK][4] dans votre application construite avec Orchestrion. Ceci est utile pour instrumenter des frameworks qui ne sont pas encore pris en charge par Orchestrion. Cependant, soyez conscient que cela peut entraîner des intervalles de trace dupliqués à l'avenir à mesure que le support d'Orchestrion s'élargit. Consultez les [notes de version][11] lors de la mise à jour de votre dépendance `orchestrion` pour rester informé des nouvelles fonctionnalités et ajuster votre instrumentation manuelle si nécessaire.

#### Utilisez le profileur continu {#use-the-continuous-profiler}

Votre application construite avec Orchestrion inclut l'instrumentation du [profileur continu][12].
Pour activer le profileur, définissez la variable d'environnement `DD_PROFILING_ENABLED=true` à l'exécution.

#### Supprimer les intégrations {#remove-integrations}

Vous pouvez supprimer les intégrations en modifiant les imports dans le fichier `orchestrion.tool.go`.
Vous pouvez également créer votre propre fichier `orchestrion.tool.go` avant d'exécuter `orchestrion`.
Vous pourriez faire cela si vous ne souhaitez pas une intégration,
ou si vous souhaitez réduire le nombre de dépendances transitives pour les intégrations que votre programme n'utilise pas.
Par défaut, Orchestrion importe `github.com/DataDog/dd-trace-go/orchestrion/all/v2`,
ce qui importe chaque bibliothèque pour laquelle il existe une intégration Orchestrion.
Vous pouvez remplacer cet import par des imports uniquement des intégrations que vous souhaitez utiliser.
Voir [le code source du SDK][17] pour la liste des intégrations prises en charge.

**Remarque**: Si vous choisissez d'importer des intégrations spécifiques, vous devez mettre à jour manuellement `orchestrion.tool.go` chaque fois que vous souhaitez ajouter une nouvelle intégration.

### Construction avec Docker {#building-with-docker}

Pour plus d'informations sur la façon de créer une image Docker adaptée, voir [Créer un Dockerfile pour APM pour Go][18].

### Dépannage {#troubleshooting}

Pour dépanner les builds que `orchestrion` gère, consultez [Dépannage de l'instrumentation de compilation Go][13].

[4]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/ddtrace
[6]: https://github.com/DataDog/orchestrion
[7]: /fr/security/application_security/exploit-prevention
[8]: https://go.dev/doc/devel/release#policy
[10]: https://pkg.go.dev/cmd/go#hdr-Modules__module_versions__and_more
[11]: https://github.com/DataDog/orchestrion/releases
[12]: /fr/profiler
[13]: /fr/tracing/troubleshooting/go_compile_time/
[14]: /fr/getting_started/tagging/unified_service_tagging/
[15]: /fr/security/application_security/exploit-prevention/
[16]: /fr/tracing/trace_collection/library_config/go/#traces
[17]: https://github.com/DataDog/dd-trace-go/blob/main/orchestrion/all/orchestrion.tool.go
[18]: /fr/tracing/guide/orchestrion_dockerfile/

{{% /tab %}}

{{% tab "Instrumentation manuelle" %}}

### Ajoutez le SDK à votre application {#add-the-sdk-to-your-application}

Tout d'abord, importez et démarrez le SDK dans votre code en suivant la documentation [Configuration de la bibliothèque][3]. Référez-vous à la [documentation de l'API][6] (ou à la [documentation de l'API v1][4]) pour les instructions de configuration et les détails sur l'utilisation de l'API.

### Activez les intégrations Go pour créer des spans {#activate-go-integrations-to-create-spans}

Activez [les intégrations Go][1] pour générer des spans. Datadog dispose d'une série de packages modulables qui offrent un support prêt à l'emploi pour instrumenter une série de bibliothèques et de frameworks. Une liste de ces packages peut être trouvée sur la page [Exigences de compatibilité][1]. Importez ces packages dans votre application et suivez les instructions de configuration énumérées à côté de chaque intégration.

[1]: /fr/tracing/compatibility_requirements/go
[3]: /fr/tracing/trace_collection/library_config/go/
[4]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace
[6]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/ddtrace

{{% /tab %}}

{{< /tabs >}}

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/compatibility_requirements/go
[5]: /fr/tracing/trace_collection/automatic_instrumentation/?tab=datadoglibraries#install-and-configure-the-agent