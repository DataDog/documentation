---
algolia:
  tags:
  - secrets
  - secrets executable
  - secrets provider
  - list secrets
aliases:
- /fr/agent/faq/kubernetes-secrets
- /fr/agent/guide/secrets-management
further_reading:
- link: /agent/autodiscovery/
  tag: Documentation
  text: Autodiscovery
title: Gestion des secrets
---

## Section Overview

L'Agent Datadog vous permet de gérer les secrets de manière sécurisée en s'intégrant à n'importe quelle solution externe de gestion des secrets (comme HashiCorp Vault, AWS Secrets Manager, Azure Key Vault ou une solution personnalisée). Plutôt que de coder en dur des valeurs sensibles telles que des clés d'API ou des mots de passe en clair dans les fichiers de configuration, l'Agent peut les récupérer dynamiquement au moment de l'exécution.

### Fonctionnement

Pour faire référence à un secret dans votre configuration, utilisez la notation `ENC[<secret_id>]`. Cela indique à l'Agent de résoudre la valeur à l'aide de l'exécutable de récupération de secrets configuré. Le secret est récupéré et chargé en mémoire, mais n'est jamais écrit sur le disque ni envoyé au backend Datadog.

Par exemple, la configuration suivante montre deux secrets définis avec `ENC[]` :
```
instances:
  - server: db_prod
    user: "ENC[db_prod_user]"
    password: "ENC[db_prod_password]"
```

Le handle du secret doit constituer l'intégralité de la valeur du champ YAML, et il est toujours résolu en tant que chaîne de caractères. Ainsi, des configurations du type `password: "db-ENC[prod_password]"` ne sont pas reconnues comme des secrets.

Vous pouvez utiliser n'importe quel caractère à l'intérieur des crochets `ENC[]`, à condition que le YAML reste valide. Si l'identifiant de votre secret contient des caractères spéciaux ou est une chaîne JSON, assurez-vous de bien l'échapper. Par exemple :
```
"ENC[{\"env\": \"prod\", \"check\": \"postgres\", \"id\": \"user_password\"}]"
```

Il est également possible d'utiliser des variables [Autodiscovery][1] dans les handles de secret. L'Agent résout d'abord ces variables, puis le secret. Par exemple :
```
instances:
  - server: %%host%%
    user: ENC[db_prod_user_%%host%%]
    password: ENC[db_prod_password_%%host%%]
```

**Remarque :** vous ne pouvez pas utiliser la syntaxe `ENC[]` dans les paramètres `secret_*` comme `secret_backend_command`.

### Exigences de sécurité de l'Agent

L'Agent exécute l'exécutable fourni en tant que sous-processus. Les modes d'exécution diffèrent selon le système (Linux ou Windows).

{{< tabs >}}
{{% tab "Linux" %}}

Sous Linux, l'exécutable doit :

* Il doit appartenir au même utilisateur qui exécute l'Agent (`dd-agent` par défaut, ou `root` à l'intérieur d'un conteneur).
* ne pas avoir de droits pour `group` ou `other`.
* Il doit prévoir au moins des droits d'exécution pour le propriétaire.

{{% /tab %}}
{{% tab "Windows" %}}

Sous Windows, l'exécutable doit :

* Il doit prévoir des droits de lecture et d'exécution pour `ddagentuser` (l'utilisateur servant à exécuter l'Agent).
* ne pas avoir de droits pour un autre utilisateur ou groupe que `Administrators`, `Local System` ou le contexte utilisateur de l'Agent (`ddagentuser` par défaut).
* être une application Win32 valide pour que l'Agent puisse l'exécuter (par exemple, un script PowerShell ou Python ne fonctionne pas).

{{% /tab %}}
{{< /tabs >}}

**Remarque** : l'exécutable partage les mêmes variables d'environnement que l'Agent.

## Fournir un exécutable de récupération de secrets

Pour récupérer les secrets, l'Agent utilise un exécutable externe que vous fournissez. Celui-ci est utilisé lorsqu'un nouveau
secret est découvert, puis mis en cache pendant tout le cycle de vie de l'Agent. Si vous devez mettre à jour ou faire tourner un secret, vous devez redémarrer l'Agent pour qu'il le recharge.

L'Agent envoie à cet exécutable une charge utile JSON via l'entrée standard, contenant une liste de handles de secrets. L'exécutable récupère chaque secret et les renvoie au format JSON via la sortie standard.

Voici ce que l'Agent envoie à votre exécutable sur STDIN :
```
{
  "version": "1.0",
  "secrets": ["secret1", "secret2"]
}
```

* `version` (chaîne) : la version du format.
* `secrets` (liste de chaînes) : chaque chaîne est un handle de secret à récupérer.


L'exécutable doit répondre via STDOUT :
```
{
  "secret1": {"value": "decrypted_value", "error": null},
  "secret2": {"value": null, "error": "could not fetch the secret"}
}
```

* `value` (chaîne) : la valeur du secret à utiliser dans les configurations. Peut être `null` en cas d'erreur.
* `error` (chaîne) : un message d'erreur ou `null`.

Si un secret ne peut pas être résolu (retour d'un code de sortie non nul ou champ error non nul), la configuration correspondante est ignorée par l'Agent.

**Ne jamais afficher d'informations sensibles sur `stderr`**. Si le binaire se termine avec un code de sortie différent de `0`, l'Agent journalise la sortie d'erreur standard de l'exécutable pour faciliter le dépannage.

## Options de récupération des secrets

### Option 1 : Utiliser le script intégré pour Kubernetes et Docker

Pour les environnements conteneurisés, les images conteneur de l'Agent Datadog incluent un script intégré `/readsecret_multiple_providers.sh` à partir de la version v7.32.0. Ce script permet de lire les secrets depuis :

* Fichiers : `ENC[file@/path/to/file]`
* Secrets Kubernetes : `ENC[k8s_secret@namespace/secret-name/key]`

{{< tabs >}}
{{% tab "Helm" %}}

Pour utiliser cet exécutable avec le chart Helm, définissez-le comme suit :
```yaml
datadog:
  [...]
  secretBackend:
    command: "/readsecret_multiple_providers.sh"
```

{{% /tab %}}
{{% tab "DaemonSet" %}}

Pour utiliser cet exécutable, définissez la variable d'environnement `DD_SECRET_BACKEND_COMMAND` comme indiqué ci-dessous :
```
DD_SECRET_BACKEND_COMMAND=/readsecret_multiple_providers.sh
```

{{% /tab %}}
{{< /tabs >}}

#### Exemple : Lecture depuis des fichiers montés

Kubernetes permet [d'exposer des secrets sous forme de fichiers][2] dans un pod. L'Agent peut les lire pour résoudre les secrets.

Dans Kubernetes, vous pouvez monter un secret en tant que volume comme ceci :
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

Vous pouvez ensuite référencer le secret ainsi :
```
password: ENC[file@/etc/secret-volume/password]
```

**Remarques :**
- Le secret doit exister dans le même espace de nommage que le pod sur lequel il est monté.
- Le script peut accéder à tous les sous-dossiers, y compris au contenu sensible de `/var/run/secrets/kubernetes.io/serviceaccount/token`. Ainsi, Datadog recommande d'utiliser un dossier distinct au lieu de `/var/run/secrets`.

Les [secrets Docker Swarm][3] sont montés dans le dossier `/run/secrets`. Par exemple, le secret Docker `db_prod_passsword` est situé dans `/run/secrets/db_prod_password`, dans le conteneur de l'Agent. Pour y faire référence dans la configuration, utilisez `ENC[file@/run/secrets/db_prod_password]`.

#### Exemple : Lecture d'un secret Kubernetes dans un autre espace de nommage

Si vous souhaitez que l'Agent lise un secret situé dans un espace de nommage différent, utilisez le préfixe `k8s_secret@`. Par exemple :
```
password: ENC[k8s_secret@database/database-secret/password]
```

Dans ce cas, vous devez configurer manuellement les droits RBAC pour autoriser le compte de service de l'Agent à lire le secret :
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

Ce `Role` permet d'accéder à `Secret: database-secret` dans l'espace de nommage `Namespace: database`. Le `RoleBinding` associe l'autorisation au compte de service `ServiceAccount: datadog-agent` dans l'espace de nommage `Namespace: default`. Vous devez effectuer manuellement cet ajout dans votre cluster pour vos ressources déployées.

### Option 2 : Utiliser un exécutable précompilé

Si vous utilisez un gestionnaire de secrets standard comme `AWS Secrets Manager`, `AWS SSM`, etc., vous pouvez utiliser l'exécutable précompilé [datadog-secret-backend][4].

Voici comment le configurer :

1. **Créez votre secret** dans AWS Secrets Manager. L'`ARN` du secret dans AWS fait office de handle. Exemple :
  ```
  arn:aws:secretsmanager:us-east-2:111122223333:secret:AgentAPIKey
  ```
2. **Attribuez à votre instance EC2 les autorisations IAM** nécessaires pour lire le secret :
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

3. Téléchargez la dernière version de [datadog-secret-backend][5] sur votre instance EC2 et créez le fichier de configuration `datadog-secret-backend.yaml` à côté du binaire. Exemple de configuration pour un backend de type `aws.secrets` nommé `staging-aws` :
   ```
   backends:
     staging-aws:
       backend_type: aws.secrets
   ```
4. Appliquez les droits d'accès corrects comme décrit dans les [exigences de sécurité de l'Agent](#exigences-de-securite-de-l-agent).
   ```sh
   chown dd-agent:dd-agent datadog-secret-backend
   chmod 500 datadog-secret-backend
   ```
5. Configurez l'Agent pour utiliser le binaire afin de résoudre les secrets, puis utilisez le secret AWS (ici en tant que `api_key`) :
   ```
   api_key: ENC[staging-aws:arn:aws:secretsmanager:us-east-2:111122223333:secret:AgentAPIKey]

   secret_backend_command: /path/to/datadog-secret-backend
   ```
   Le préfixe `staging-aws:` correspond à la clé définie dans votre configuration de backend.
6. Redémarrez l'Agent.

Vous pouvez consulter la liste des secrets résolus par l'Agent en exécutant la commande `datadog-agent secrets` localement sur votre instance EC2.

### Option 3 : Créer votre propre exécutable personnalisé

Vous pouvez également développer votre propre exécutable de récupération de secrets dans le langage de votre choix, à condition de respecter le format d'entrée/sortie décrit ci-dessus.

Voici un exemple en Go qui renvoie des secrets fictifs :
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

Ce mécanisme transforme votre configuration :

```yaml
instances:
  - server: db_prod
    user: ENC[db_prod_user]
    password: ENC[db_prod_password]
```

En la structure suivante en mémoire :

```yaml
instances:
  - server: db_prod
    user: decrypted_db_prod_user
    password: decrypted_db_prod_password
```

## Actualiser les clés API/APP à l'exécution

À partir de la version v7.67 de l'Agent, vous pouvez configurer l'actualisation automatique des clés API et APP à intervalles réguliers, sans redémarrage. Cela repose sur le fait que la clé API et la clé APP sont extraites en tant que secrets.

Pour activer cette fonction, ajoutez le paramètre `secret_refresh_interval` (en secondes) à votre fichier `datadog.yaml` :
```yaml
api_key: ENC[<secret_handle>]

secret_backend_command: /path/to/your/executable
secret_refresh_interval: 3600  # refresh every hour
```

Par défaut, l'Agent répartit aléatoirement sa première actualisation dans la fenêtre `secret_refresh_interval` définie. Cela
signifie qu'il résout la clé API au démarrage, puis l'actualise une première fois dans l'intervalle spécifié, puis à chaque intervalle suivant.
Cela permet d'éviter que l'ensemble des Agents actualisent leur clé API/APP en même temps.

Pour éviter les interruptions de service, n'invalidez l'ancienne clé API ou APP que lorsque l'intégralité de votre parc d'Agents a
récupéré les nouvelles clés via votre solution de gestion des secrets. Vous pouvez suivre l'utilisation de vos clés API dans la page [Fleet
Management](https://app.datadoghq.com/fleet).

Vous pouvez désactiver ce comportement en ajoutant :
```yaml
secret_refresh_scatter: false
```

Pour effectuer une actualisation manuelle, utilisez :
```
datadog-agent secret refresh
```

### Activer l'actualisation du collector DDOT
Si vous utilisez le [collector DDOT][7] et souhaitez activer l'actualisation API/APP, ajoutez également cette configuration à votre fichier `datadog.yaml` :
```
agent_ipc:
  port: 5051
  config_refresh_interval: 3600
```

Cela permet au collector DDOT de rester synchronisé avec l'Agent après chaque actualisation des secrets. Comme l'Agent vérifie périodiquement l'état de sa configuration, le collector DDOT utilise ce paramètre pour récupérer régulièrement les valeurs mises à jour.

## Dépannage

### Énumérer les secrets détectés

La commande `secret` dans l'interface de ligne de commande de l'Agent indique les erreurs liées à votre configuration. Elle peut par exemple indiquer si les droits sur l'exécutable sont incorrects. Il répertorie également tous les handles trouvés et leur emplacement.

Sous Linux, la commande affiche le mode de fichier, le propriétaire et le groupe de l'exécutable. Sous Windows, les droits ACL sont énumérés.

{{< tabs >}}
{{% tab "Linux" %}}

Exemple sous Linux :

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

Exemple sous Windows (en tant qu'administrateur PowerShell)  :
```powershell
PS C:\> & "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" secret
=== Checking executable rights ===
Executable path: C:\chemin\vers\votre\exécutable.exe
Check Rights: OK, the executable has the correct rights

Rights Detail:
Acl list:
stdout:

Path   : Microsoft.PowerShell.Core\FileSystem::C:\chemin\vers\votre\exécutable.exe
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

=== a check ===
Source: File Configuration Provider
Instance 1:
host: <host_décrypté>
port: <port_décrypté>
password: <mot_de_passe_obfusqué>
~
===

=== another check ===
Source: File Configuration Provider
Instance 1:
host: <host_décrypté_2>
port: <port_décrypté_2>
password: <mot_de_passe_obfusqué_2>
~
===
```

**Remarque** : vous devez [redémarrer][6] l'Agent pour prendre en compte les modifications apportées aux fichiers de configuration.

### Débugging de secret_backend_command

Pour tester une commande ou la déboguer en dehors de l'Agent, vous pouvez reproduire la façon dont l'Agent l'exécute :

{{< tabs >}}
{{% tab "Linux" %}}
**Linux**

```bash
sudo -u dd-agent bash -c "echo '{\"version\": \"1.0\", \"secrets\": [\"secret1\", \"secret2\"]}' | /chemin/vers/la/secret_backend_command"
```

L'utilisateur `dd-agent` est créé lors de l'installation de l'Agent Datadog,

{{% /tab %}}
{{% tab "Windows" %}}

##### Erreurs liées aux droits

Les erreurs suivantes indiquent qu'une étape de configuration est manquante.

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

Datadog fournit un [script PowerShell][8] pour vous aider à appliquer les permissions correctes à votre exécutable. Exemple d'utilisation :

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

##### Tester votre exécutable

Votre exécutable est exécuté par l'Agent lors de la récupération de vos secrets. L'Agent Datadog s'exécute à l'aide de l'utilisateur `ddagentuser`. Cet utilisateur ne possède pas de droit spécifique, mais il fait partie du groupe `Performance Monitor Users`. Le mot de passe de cet utilisateur est généré de manière aléatoire lors de l'installation et n'est jamais enregistré.

Par conséquent, votre exécutable peut fonctionner avec votre utilisateur par défaut ou votre utilisateur de développement, mais ne fonctionne pas lorsqu'il est exécuté par l'Agent, car `ddagentuser` dispose de droits plus restreints.

Pour tester votre exécutable dans les mêmes conditions que l'Agent, mettez à jour le mot de passe de `ddagentuser` dans votre interface de développement. De cette façon, vous pouvez vous authentifier en tant que `ddagentuser` et exécuter votre exécutable avec le même contexte que l'Agent.

Pour ce faire, suivez ces étapes :

1. Supprimez `ddagentuser` de la liste `Local Policies/User Rights Assignement/Deny Log on locally` dans `Local Security Policy`.
2. Définissez un nouveau mot de passe pour `ddagentuser` (celui généré lors de l'installation n'est pas conservé). Dans PowerShell, exécutez :
    ```powershell
    $user = [ADSI]"WinNT://./ddagentuser";
    $user.SetPassword("a_new_password")
    ```
3. Mettez à jour le mot de passe utilisé par le service `DatadogAgent` dans le Service Control Manager. Dans PowerShell, exécutez :
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
[7]: https://github.com/DataDog/datadog-agent/blob/master/docs/public/secrets/secrets_tester.ps1
[8]: https://github.com/DataDog/datadog-agent/blob/master/docs/public/secrets/Set-SecretPermissions.ps1

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

Prenons l'[exemple précédent de secret Kubernetes](#exemple-lecture-d-un-secret-kubernetes-dans-un-autre-espace-de-nommage), où le secret `Secret:database-secret` se trouve dans le `Namespace: database` et le compte de service `ServiceAccount:datadog-agent` dans le `Namespace: default`.

Pour cet exemple, utilisez la commande suivante :

```
kubectl auth can-i get secret/database-secret -n database --as system:serviceaccount:default:datadog-agent
```

Cette commande indique si l'Agent dispose des autorisations adéquates pour accéder à ce secret.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/kubernetes/integrations/
[2]: https://kubernetes.io/docs/tasks/inject-data-application/distribute-credentials-secure/#create-a-pod-that-has-access-to-the-secret-data-through-a-volume
[3]: https://docs.docker.com/engine/swarm/secrets/
[4]: https://github.com/DataDog/datadog-secret-backend
[5]: https://github.com/DataDog/datadog-secret-backend/blob/main/docs/aws/secrets.md
[6]: /fr/agent/configuration/agent-commands/#restart-the-agent
[7]: /fr/opentelemetry/setup/ddot_collector/