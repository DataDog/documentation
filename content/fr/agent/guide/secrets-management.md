---
further_reading:
- link: /agent/autodiscovery/
  tag: Documentation
  text: Autodiscovery
kind: documentation
title: Gestion des secrets
---

Pour éviter de stocker des secrets en texte brut dans les fichiers de configuration de l'Agent, vous pouvez utiliser le paquet de gestion des secrets.

L'Agent peut se servir du package `secrets` pour appeler un exécutable fourni par l'utilisateur afin de gérer la récupération et le déchiffrement de secrets, qui sont ensuite chargés en mémoire par l'Agent. Cette approche permet aux utilisateurs d'exploiter n'importe quel backend de gestion des secrets (comme HashiCorp Vault ou AWS Secrets Manager), et de sélectionner leur méthode d'authentification préférée pour établir un processus de confiance initial. Par souci de commodité, des [scripts auxiliaires](#scripts-auxiliaires-pour-autodiscovery) sont fournis de base avec les déploiements conteneurisés de l'Agent. Ils peuvent être utilisés pour cet exécutable.

Depuis la version 6.12, le paquet de gestion des secrets est le plus souvent disponible sur Linux pour les métriques, l'APM et la surveillance des processus, ainsi que sur Windows pour les métriques et l'APM.

## Utiliser des secrets

### Définir des secrets dans des configurations

Utilisez la notation `ENC[]` pour indiquer un secret en tant que valeur d'un champ YAML dans votre configuration.

Les secrets sont pris en charge dans tous les backends de configuration (par exemple, file, etcd, consul) et toutes les variables d'environnement.

Ils sont également pris en charge dans `datadog.yaml`. L'Agent charge d'abord la configuration principale, puis recharge après le déchiffrement des secrets. Cela signifie que les secrets ne peuvent pas être utilisés dans les paramètres `secret_*`.

Les secrets sont toujours des chaînes. Vous ne pouvez donc pas les utiliser pour définir un entier ou une valeur booléenne.

Exemple :

```yaml
instances:
  - server: db_prod
    # deux handles de secret valides
    user: "ENC[db_prod_user]"
    password: "ENC[db_prod_password]"

    # Le handle `ENC[]` doit correspondre à l'intégralité de la valeur YAML, ce qui signifie que
    # ce qui suit n'est PAS détecté en tant que handle de secret :
    password2: "db-ENC[prod_password]"
```

Cet exemple compte deux secrets : `db_prod_user` et `db_prod_password`. Il s'agit des _handles_ des secrets. Chacun permet d'identifier de façon unique un secret dans votre backend de gestion de secrets.

Tous les caractères peuvent être ajoutés entre les crochets, tant que la configuration YAML est valide. Cela signifie que les guillemets doivent être échappés. Par exemple :

```text
"ENC[{\"env\": \"prod\", \"check\": \"postgres\", \"id\": \"user_password\"}]"
```

Dans l'exemple ci-dessus, le handle de secret est la chaîne `{"env": "prod", "check": "postgres", "id": "user_password"}`.

Il n'est pas nécessaire d'échapper les caractères `[` et `]` de l'expression. Par exemple :

```text
“ENC[user_array[1234]]”
```

Dans l'exemple ci-dessus, le handle de secret est la chaîne `user_array[1234]`.

Les secrets sont résolus après la résolution des template variables [Autodiscovery][1], ce qui signifie que vous pouvez les utiliser dans un handle de secret. Exemple :

```yaml
instances:
  - server: %%host%%
    user: ENC[db_prod_user_%%host%%]
    password: ENC[db_prod_password_%%host%%]
```

### Fournir un exécutable

Pour récupérer des secrets, vous devez fournir un exécutable capable de s'authentifier auprès de votre backend de gestion de secrets et d'y récupérer des secrets.

L'Agent met en mémoire cache interne les secrets pour réduire le nombre d'appels. Cela s'avère très utile dans un environnement conteneurisé, par exemple. L'Agent appelle l'exécutable chaque fois qu'il accède à un fichier de configuration de check qui contient au moins un handle de secret pour lequel le secret n'est pas encore chargé en mémoire. Ainsi, les secrets qui ont déjà été chargés en mémoire ne déclenchent pas d'appels supplémentaires de l'exécutable. En pratique, cela signifie que l'Agent appelle l'exécutable fourni par l'utilisateur une fois par fichier contenant un handle de secret au démarrage. Il peut effectuer ultérieurement des appels supplémentaires vers l'exécutable en cas de redémarrage de l'Agent ou de l'instance, ou si l'Agent charge de façon dynamique un nouveau check contenant un handle de secret (par exemple, via Autodiscovery).

L'APM et la surveillance de processus s'exécutent dans leur propre processus/service, et les processus ne partagent pas de mémoire. Ainsi, chaque processus doit pouvoir charger/déchiffrer des secrets. De ce fait, si `datadog.yaml` contient des secrets, chaque processus peut appeler l'exécutable une fois. Par exemple, le stockage de `api_key` en tant que secret dans le fichier `datadog.yaml` avec l'APM et la surveillance de processus activés peut provoquer 3 appels vers le backend de secret.

De par sa nature, l'exécutable fourni par l'utilisateur doit implémenter tout mécanisme de gestion d'erreurs qu'un utilisateur peut exiger. Inversement, l'Agent doit être redémarré si un secret doit être actualisé en mémoire (par exemple, en cas de révocation de mot de passe).

L'utilisation d'un exécutable fourni par l'utilisateur présent un certain nombre d'avantages :

* L'Agent ne peut pas tenter de charger en mémoire des paramètres pour lesquels il n'existe pas de handle de secret.
* L'utilisateur peut limiter la visibilité de l'Agent afin d'autoriser uniquement l'accès aux secrets requis (par exemple, en limitant la liste des secrets accessibles dans le backend de gestion de clés).
* Vous êtes libre d'autoriser comme bon vous semble des utilisateurs à exploiter un backend de gestion de secrets, sans avoir à reconstruire l'Agent.
* Vous pouvez faire en sorte que chaque utilisateur puisse résoudre le problème de confiance initial entre l'Agent et le backend de gestion de secrets. Cette solution permet de tirer parti de la méthode d'authentification préférée de chaque utilisateur et de s'adapter à leur workflow d'intégration continue.

#### Configuration

Définissez la variable suivante dans `datadog.yaml` :

```yaml
secret_backend_command: <CHEMIN_EXÉCUTABLE>
```

#### Exigences de sécurité de l'Agent

L'Agent lance l'exécutable `secret_backend_command` en tant que sous-processus. Les modèles d'exécution Linux et Windows diffèrent.

{{< tabs >}}
{{% tab "Linux" %}}

Sur Linux, l'exécutable défini en tant que `secret_backend_command` doit respecter les règles suivantes :

* Il doit appartenir au même utilisateur qui exécute l'Agent (`dd-agent` par défaut, ou `root` à l'intérieur d'un conteneur).
* Il ne doit avoir aucun droit pour un groupe ou un autre élément.
* Il doit prévoir au moins des droits d'exécution pour le propriétaire.

{{% /tab %}}
{{% tab "Windows" %}}

Sur Windows, l'exécutable défini en tant que `secret_backend_command` doit respecter les règles suivantes :

* Il doit prévoir des droits de lecture et d'exécution pour `ddagentuser` (l'utilisateur servant à exécuter l'Agent).
* Il ne doit avoir aucun droit pour un utilisateur ou un groupe, à l'exception du groupe `Administrator`, du compte Local System intégré ou du contexte de l'utilisateur de l'Agent (par défaut, `ddagentuser`).
* Il doit être une application Win32 valide exécutable par l'Agent (un script PowerShell ou Python ne fonctionnera pas, par exemple).

{{% /tab %}}
{{< /tabs >}}

**Remarque** : l'exécutable partage les mêmes variables d'environnement que l'Agent.

N'indiquez jamais d'informations dans `stderr`. Si le binaire se termine avec un code de statut différent de `0`, l'Agent enregistre la sortie de l'erreur standard de l'exécutable afin de faciliter le dépannage.

#### L'API de l'exécutable

L'exécutable suit une API simple : il lit le JSON à partir de l'entrée standard et génère une sortie JSON contenant les secrets déchiffrés dans la sortie standard.

Si le code de sortie de l'exécutable est différent de `0`, la configuration d'intégration en cours de déchiffrement est considérée comme invalide, et est ignorée.

##### Exemple d'entrée d'API

L'exécutable reçoit une charge utile JSON depuis l'entrée standard, qui contient la liste des secrets à récupérer :

```json
{"version": "1.0", "secrets": ["secret1", "secret2"]}
```

* `version` : chaîne contenant la version du format (actuellement 1.0).
* `secrets` (liste de chaînes) : chaque chaîne est un handle d'une configuration correspondant à un secret à récupérer.

##### Exemple de sortie d'API

L'exécutable est censé générer une charge utile JSON dans la sortie standard, avec les secrets récupérés :

```json
{
  "secret1": {"value": "secret_value", "error": null},
  "secret2": {"value": null, "error": "impossible de récupérer le secret"}
}
```

La charge utile attendue correspond à un objet JSON. Chacune de ses clés représente l'un des handles demandés dans la charge utile d'entrée. La valeur de chaque handle correspond à un objet JSON avec 2 champs :

* `value` (chaîne) : la véritable valeur du secret à utiliser dans les configurations de check (peut être null en cas d'erreur).
* `error` (chaîne) : le message d'erreur, le cas échéant. Si l'erreur est différente de null, la configuration d'intégration qui utilise ce handle est considérée comme invalide, et est ignorée.

##### Exemple d'exécutable

L'exemple suivant décrit un programme Go test conçu pour ajouter `déchiffré_` en préfixe de chaque secret :

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
    fmt.Fprintf(os.Stderr, "Impossible de lire stdin : %s", err)
    os.Exit(1)
  }
  secrets := secretsPayload{}
  json.Unmarshal(data, &secrets)

  res := map[string]map[string]string{}
  for _, handle := range secrets.Secrets {
    res[handle] = map[string]string{
      "value": "déchiffre_" + handle,
    }
  }

  output, err := json.Marshal(res)
  if err != nil {
    fmt.Fprintf(os.Stderr, "Impossible de sérialiser res : %s", err)
    os.Exit(1)
  }
  fmt.Printf(string(output))
}
```

Cela met à jour cette configuration (dans le fichier du check) :

```yaml
instances:
  - server: db_prod
    user: ENC[db_prod_user]
    password: ENC[db_prod_password]
```

En la remplaçant par ce qui suit (dans la mémoire de l'Agent) :

```yaml
instances:
  - server: db_prod
    user: decrypted_db_prod_user
    password: decrypted_db_prod_password
```

## Scripts auxiliaires pour Autodiscovery

De nombreuses intégrations Datadog requièrent des identifiants pour récupérer des métriques. Pour éviter de coder en dur ces identifiants au sein d'un [modèle Autodiscovery][1], vous pouvez utiliser la fonction de gestion de secrets pour les dissocier du modèle.

Depuis la version 7.32.0, le [script auxiliaire][2] est disponible dans l'image du conteneur de l'Agent sous le nom de `/readsecret_multiple_providers.sh`. Vous pouvez l'utiliser pour récupérer des secrets à partir de fichiers en plus des secrets Kubernetes. Les deux scripts fournis pour les versions précédentes (`readsecret.sh` et `readsecret.py`) sont pris en charge, mais peuvent uniquement lire les secrets à partir de fichiers.

### Script pour lire des secrets à partir de plusieurs fournisseurs

#### Utilisation de plusieurs fournisseurs
Le script `readsecret_multiple_providers.sh` vous permet de lire des secrets à partir des deux fichiers, ainsi que les secrets Kubernetes. Ces secrets doivent respecter le format `ENC[fournisseur@un/chemin]`. Exemple :

| Fournisseur               | Format                                           |
|------------------------|--------------------------------------------------|
| Lecture depuis des fichiers        | `ENC[fichier@/chemin/vers/fichier]`                        |
| Secrets Kubernetes     | `ENC[secret_k8@espace_nommage/nom/clé]` |

Pour utiliser cet exécutable, définissez la variable d'environnement `DD_SECRET_BACKEND_COMMAND` comme indiqué ci-dessous :
```
DD_SECRET_BACKEND_COMMAND=/readsecret_multiple_providers.sh
```

#### Exemple de lecture depuis un fichier
L'Agent peut lire un fichier spécifique en tenant compte du chemin fourni. Ce fichier peut être récupéré à partir de [secrets Kubernetes](#secrets-kubernetes), de [secrets Docker Swarm](#secrets-docker-swarm) ou de toute autre méthode personnalisée.

Si le conteneur de l'Agent inclut un fichier `/etc/secret-volume/password` composé du mot de passe en texte clair, vous pouvez faire référence à ce fichier avec la notation `ENC[file@/etc/secret-volume/password]`.

##### Secrets Kubernetes
Avec Kubernetes, vous pouvez [exposer des secrets sous forme de fichiers][3] au sein d'un pod. Par exemple, si un secret `Secret: test-secret` comprend les données `db_prod_password: example`, ce secret est monté sur le conteneur de l'Agent selon la configuration suivante :
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
Dans cet exemple, le conteneur de l'Agent contient le fichier `/etc/secret-volume/db_prod_password`, avec le contenu de `example`. Pour y faire référence dans la configuration, il suffit d'utiliser `ENC[file@/etc/secret-volume/db_prod_password]`.

**Remarques :**
- Le secret doit exister dans le même espace de nommage que le pod sur lequel il est monté.
- Le script peut accéder à tous les sous-dossiers, y compris au contenu sensible de `/var/run/secrets/kubernetes.io/serviceaccount/token`. Ainsi, Datadog recommande d'utiliser un dossier distinct au lieu de `/var/run/secrets`.

##### Secrets Docker Swarm
Les [secrets Docker Swarm][4] sont montés dans le dossier `/run/secrets`. Par exemple, le secret Docker `db_prod_passsword` est situé dans `/run/secrets/db_prod_password`, dans le conteneur de l'Agent. Pour y faire référence dans la configuration, utilisez `ENC[file@/run/secrets/db_prod_password]`.

#### Exemple de lecture depuis un secret Kubernetes
Avec la configuration suivante, l'Agent peut lire directement des secrets Kubernetes depuis ses espaces de nommages et ceux d'*autres fournisseurs*. Pour y parvenir, le `ServiceAccount` de l'Agent doit toutefois posséder des autorisations avec des `Roles` et `RoleBindings` adéquats.

Si `Secret: database-secret` existe dans l'espace de nommage `Namespace: database` et contient les données `password: example`, vous pouvez y faire référence dans la configuration en utilisant `ENC[k8s_secret@database/database-secret/password]`. Cette configuration permet à l'Agent de récupérer ce secret directement depuis Kubernetes. Cela s'avère particulièrement utile pour un secret qui existe dans un espace de nommage autre que celui de l'Agent.

Pour cela, vous devez attribuer manuellement des autorisations supplémentaires au compte de service de l'Agent. Prenons l'exemple de la stratégie RBAC suivante :
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
  namespace: example
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
Ce `Role` permet d'accéder à `Secret: database-secret` dans l'espace de nommage `Namespace: database`. Le `RoleBinding` associe l'autorisation au compte de service `ServiceAccount: datadog-agent` dans l'espace de nommage `Namespace: default`. Vous devez effectuer manuellement cet ajout dans votre cluster pour vos ressources déployées.

### (Obsolète) Scripts pour la lecture à partir de fichiers
Depuis la version 7.32 de l'Agent Datadog, le script `readsecret_multiple_providers.sh` est inclus. Datadog vous conseille d'utiliser ce script à la place des scripts `/readsecret.py` et `/readsecret.sh` de la version 6.12 de l'Agent. Veuillez noter que vous pouvez toujours utiliser les scripts `/readsecret.py` et `/readsecret.sh` inclus pour lire des fichiers.

#### Utilisation
Ces scripts requièrent un dossier transmis en tant qu'argument. Les handles de secret sont interprétés comme des noms de fichiers relatifs à ce dossier. Pour éviter toute fuite de données sensibles, ces scripts refusent d'accéder à un fichier en dehors du dossier racine spécifié (y compris les cibles d'URL dynamiques).

Ces scripts ne sont pas compatibles avec [les opérations avec SCC restreintes OpenShift][5]. De plus, pour que les scripts fonctionnent, l'Agent doit s'exécuter en tant qu'utilisateur `root`.

##### Docker
Les [secrets Docker Swarm][4] sont montés dans le dossier `/run/secrets`. Pour lire ces secrets, passez les variables d'environnement suivantes au conteneur de votre Agent :

```
DD_SECRET_BACKEND_COMMAND=/readsecret.py
DD_SECRET_BACKEND_ARGUMENTS=/run/secrets
```

Avec cette configuration, l'Agent Datadog lit les fichiers de secret situés dans le répertoire `/run/secrets`. Par exemple, la configuration `ENC[password]` indique à l'Agent de chercher le fichier `/run/secrets/password`.

##### Kubernetes
Avec Kubernetes, vous pouvez [exposer des secrets sous forme de fichiers][3] au sein d'un pod. Par exemple, si vos secrets sont montés dans `/etc/secret-volume`, utilisez les variables d'environnement suivantes :

```
DD_SECRET_BACKEND_COMMAND=/readsecret.py
DD_SECRET_BACKEND_ARGUMENTS=/etc/secret-volume
```

Avec cette configuration, l'Agent Datadog lit les fichiers de secret situés dans le répertoire `/etc/secret-volume`. Par exemple, la configuration `ENC[password]` indique à l'Agent de chercher le fichier `/etc/secret-volume/password`.

## Dépannage

### Énumérer les secrets détectés

La commande `secret` dans l'interface de ligne de commande de l'Agent indique les erreurs liées à votre configuration. Elle peut par exemple indiquer si les droits sur l'exécutable sont incorrects. Il répertorie également tous les handles trouvés et leur emplacement.

Sous Linux, la commande affiche le mode de fichier, le propriétaire et le groupe de l'exécutable. Sous Windows, les droits ACL sont énumérés.

{{< tabs >}}
{{% tab "Linux" %}}

Exemple sous Linux :

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

Exemple sous Windows (en tant qu'administrateur Powershell)  :

```powershell
PS C:\> & '%PROGRAMFILES%\Datadog\Datadog Agent\embedded\agent.exe' secret
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


### Affichage des configurations après l'injection des secrets

Pour vérifier rapidement comment les configurations du check sont résolues, vous pouvez utiliser la commande `configcheck` :

```shell
sudo -u dd-agent -- datadog-agent configcheck

=== un check ===
Source: File Configuration Provider
Instance 1:
host: <déchiffré_host>
port: <déchiffré_port>
password: <déchiffré_motdepasse>
~
===

=== un autre check ===
Source: File Configuration Provider
Instance 1:
host: <déchiffré_host2>
port: <déchiffré_port2>
password: <déchiffré_motdepasse2>
~
===
```

**Remarque** : vous devez [redémarrer][6] l'Agent pour prendre en compte les modifications apportées aux fichiers de configuration.

### Débugging de secret_backend_command

Pour tester une commande ou la déboguer en dehors de l'Agent, vous pouvez reproduire la façon dont l'Agent l'exécute :

{{< tabs >}}
{{% tab "Linux" %}}
#### Linux

```bash
sudo su dd-agent - bash -c "echo '{\"version\": \"1.0\", \"secrets\": [\"secret1\", \"secret2\"]}' | /chemin/vers/la/secret_backend_command"
```

L'utilisateur `dd-agent` est créé lors de l'installation de l'Agent Datadog,


{{% /tab %}}
{{% tab "Windows" %}}
#### Windows

##### Erreurs associées aux droits

Si vous rencontrez l'une des erreurs suivantes, cela signifie que votre configuration est incomplète. Consultez les [instructions Windows](#windows).

1. Si un autre groupe ou utilisateur dispose de droits sur l'exécutable, une erreur similaire à ce qui suit est enregistrée :
   ```
   error while decrypting secrets in an instance: Invalid executable 'C:\decrypt.exe': other users/groups than LOCAL_SYSTEM, Administrators or ddagentuser have rights on it
   ```

2. Si `ddagentuser` ne possède pas de droit de lecture ou d'exécution sur le fichier, une erreur semblable à celle-ci est enregistrée :
   ```
   error while decrypting secrets in an instance: could not query ACLs for C:\decrypt.exe
   ```

3. Votre exécutable doit être une application Win32 valide. Dans le cas contraire, l'erreur suivante est enregistrée :
   ```
   error while running 'C:\decrypt.py': fork/exec C:\decrypt.py: %1 is not a valid Win32 application.
   ```

##### Tester votre exécutable

Votre exécutable est exécuté par l'Agent lors de la récupération de vos secrets. L'Agent Datadog s'exécute à l'aide de l'utilisateur `ddagentuser`. Cet utilisateur ne possède pas de droit spécifique, mais il fait partie du groupe `Performance Monitor Users`. Le mot de passe de cet utilisateur est généré de manière aléatoire lors de l'installation et n'est jamais enregistré.

Par conséquent, votre exécutable peut fonctionner avec votre utilisateur par défaut ou votre utilisateur de développement, mais ne fonctionne pas lorsqu'il est exécuté par l'Agent, car `ddagentuser` dispose de droits plus restreints.

Pour tester votre exécutable dans les mêmes conditions que l'Agent, mettez à jour le mot de passe de `ddagentuser` dans votre interface de développement. De cette façon, vous pouvez vous authentifier en tant que `ddagentuser` et exécuter votre exécutable avec le même contexte que l'Agent.

Pour ce faire, suivez ces étapes :

1. Supprimez `ddagentuser` de la liste `Local Policies/User Rights Assignement/Deny Log on locally` dans `Local Security Policy`.
2. Définissez un nouveau mot de passe pour `ddagentuser` (car celui généré lors de l'installation n'est jamais enregistré nulle part). Dans Powershell, exécutez la commande suivante :
    ```powershell
    $user = [ADSI]"WinNT://./ddagentuser";
    $user.SetPassword("a_new_password")
    ```
3. Mettez à jour le mot de passe à utiliser par le service `DatadogAgent` dans le gestionnaire de contrôle des services. Dans Powershell, exécutez la commande suivante :
    ```powershell
    sc.exe config DatadogAgent password= "a_new_password"
    ```

Vous pouvez désormais vous connecter en tant que `ddagentuser` pour tester votre exécutable. Datadog possède un [script Powershell][7] pour vous aider à tester votre exécutable à partir d'un autre utilisateur. Il vous permet de changer de contexte utilisateur et reproduire la façon dont votre Agent exécute l'exécutable.

Exemple d'utilisation :

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


### L'Agent refuse de démarrer

Au démarrage, l'Agent commence par charger `datadog.yaml`, puis déchiffre tous les secrets qu'il contient. Cette étape est effectuée avant même de configurer la journalisation. Cela signifie que sur les plateformes telles que Windows, les erreurs survenant lors du chargement de `datadog.yaml` ne sont pas écrites dans les logs, mais sur `stderr`. Cela peut se produire lorsque l'exécutable fourni à l'Agent pour les secrets renvoie une erreur.

Si votre fichier `datadog.yaml` contient des secrets et que l'Agent refuse de démarrer :

* Essayez de démarrer manuellement l'Agent pour afficher `stderr`.
* Supprimez les secrets de `datadog.yaml` et testez d'abord les secrets dans un fichier de configuration de check.

### Tester les autorisations Kubernetes
Pour la lecture de secrets directement depuis Kubernetes, vous pouvez vérifier vos autorisations avec la commande `kubectl auth`. Utilisez le format suivant :

```
kubectl auth can-i get secret/<NOM_SECRET> -n <ESPACE_DE_NOMMAGE_SECRET> --as system:serviceaccount:<ESPACE_DE_NOMMAGE_AGENT>:<COMPTE_DE_SERVICE_AGENT>
```

Reprenons l'[exemple de secrets Kubernetes](#exemple-de-lecture-depuis-un-secret-Kubernetes), où le secret `Secret:database-secret` existe dans l'espace de nommage `Namespace: database` et le compte de service `ServiceAccount:datadog-agent` existe dans l'espace de nommage `Namespace: default`.

Pour cet exemple, utilisez la commande suivante :

```
kubectl auth can-i get secret/database-secret -n database --as system:serviceaccount:default:datadog-agent
```

Cette commande indique si l'Agent dispose des autorisations adéquates pour accéder à ce secret.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/kubernetes/integrations/
[2]: https://github.com/DataDog/datadog-agent/blob/main/Dockerfiles/agent/secrets-helper/readsecret_multiple_providers.sh
[3]: https://kubernetes.io/docs/tasks/inject-data-application/distribute-credentials-secure/#create-a-pod-that-has-access-to-the-secret-data-through-a-volume
[4]: https://docs.docker.com/engine/swarm/secrets/
[5]: https://github.com/DataDog/datadog-agent/blob/6.4.x/Dockerfiles/agent/OPENSHIFT.md#restricted-scc-operations
[6]: /fr/agent/guide/agent-commands/#restart-the-agent