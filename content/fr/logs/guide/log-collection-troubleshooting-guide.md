---
aliases:
- /fr/logs/faq/log-collection-troubleshooting-guide
further_reading:
- link: /logs/log_collection/
  tag: Documentation
  text: Apprendre à recueillir vos logs
- link: /logs/explorer/
  tag: Documentation
  text: Apprendre à explorer vos logs
- link: /logs/guide//logs-not-showing-expected-timestamp/
  tag: Guide
  text: Pourquoi mes logs n'ont-ils pas le timestamp attendu ?
- link: /logs/guide/logs-show-info-status-for-warnings-or-errors/
  tag: Guide
  text: Pourquoi mes logs s'affichent avec un statut Info même lorsqu'il s'agit d'un
    avertissement ou d'une erreur ?
kind: guide
title: Guide de dépannage pour la collecte de logs
---

Plusieurs problèmes courants peuvent survenir lors de [l'envoi de nouveaux logs à Datadog][1] via le collecteur de logs dans `dd-agent`. Si vous rencontrez des problèmes lors de l'envoi de nouveaux logs à Datadog, la liste suivante peut vous aider à les corriger. Si vous ne parvenez pas à résoudre votre problème, [contactez l'assistance Datadog][2] pour obtenir de l'aide.

## Redémarrez l'Agent

Les modifications de la configuration de `datadog-agent` prennent uniquement effet une fois [l'Agent Datadog redémarré][3].

## Le trafic sortant du port 10516 est bloqué

L'Agent Datadog envoie ses logs à Datadog par TCP via le port 10516. Si cette connexion n'est pas disponible, les logs ne sont pas envoyés et une erreur est enregistrée dans le fichier `agent.log`.

Vous pouvez tester manuellement votre connexion avec OpenSSL, GnuTLS ou un autre client SSL/TLS. Pour OpenSSL, exécutez la commande suivante :

```shell
openssl s_client -connect intake.logs.datadoghq.com:10516
```

Pour GnuTLS, exécutez la commande suivante :

```shell
gnutls-cli intake.logs.datadoghq.com:10516
```

Envoyez ensuite un log comme suit :

```text
<CLÉ_API> Ceci est un message test
```

- Si vous ne pouvez pas ouvrir le port 10516, vous pouvez configurer l'Agent Datadog de façon à envoyer des logs via HTTPS en ajoutant ce qui suit à `datadog.yaml` :

```yaml
logs_config:
  force_use_http: true
```

Consultez la [section Envoyer des logs via HTTPS][4] pour en savoir plus.

## Vérifier le statut de l'Agent

Il est souvent utile de consulter les résultats de la [commande statut de l'Agent][5] pour mieux comprendre votre problème.

## Aucun nouveau log créé

L'Agent Datadog recueille uniquement les logs qui ont été écrits une fois qu'il a commencé à les recueillir (en les suivant ou en les écoutant). Afin de vous assurer que la collecte de logs est bien configurée, vérifiez que de nouveaux logs ont été écrits.

## Problèmes d'autorisation lors du suivi de fichiers de log

LʼAgent Datadog n'est pas exécuté en mode root (et le faire est déconseillé, de façon générale). Lorsque vous configurez votre Agent afin de suivre des fichiers de log (pour les logs personnalisés ou pour les intégrations), vous devez vous assurer que l'utilisateur de lʼAgent bénéficie d'un accès aux fichiers de log.

L'utilisateur par défaut de lʼAgent par système d'exploitation :
| Système d'exploitation | Utilisateur par défaut de Agent 
| --------------- | ------------------ |
| Linux | `datadog-agent` |
| MacOS | `datadog-agent` |
| Windows | `ddagentuser` |

Si lʼAgent ne dispose pas des autorisations nécessaires, il se peut que l'un des messages d'erreur suivants s'affiche lorsque vous vérifiez [lʼétat de lʼAgent][5] :
- Le fichier n'existe pas.
- L'accès est refusé.
- Impossible de trouver de fichier correspondant au modèle `<path/to/filename>`. Vérifiez que tous ses sous-répertoires sont exécutables.

Pour corriger l'erreur, donnez à l'utilisateur de lʼAgent Datadog les droits de lecture et d'exécution sur le fichier du log et ses sous-répertoires.

{{< tabs >}}
{{% tab "Linux" %}}
1. Lancez la commande `namei` pour obtenir plus d'informations sur les autorisations du fichier :
   ```
   > namei -m /path/to/log/file
   ```

   Dans l'exemple suivant, l'utilisateur de lʼAgent n'a pas les autorisations `execute` sur le répertoire `application` ni les permissions de lecture sur le fichier `error.log`.

   ```
   > namei -m /var/log/application/error.log
   > f: /var/log/application/
   drwxr-xr-x /
   drwxr-xr-x var
   drwxrwxr-x log
   drw-r--r-- application
   -rw-r----- error.log
   ```

1. Rendre le dossier de logs et ses enfants lisibles :

   ```bash
   sudo chmod o+rx /path/to/logs
   ```

**Remarque** : assurez-vous que ces autorisations sont correctement configurées dans votre configuration de rotation de log. Dans le cas contraire, à la prochaine rotation de log, l'Agent Datadog peut perdre ses autorisations de lecture. Définissez les autorisations sur `644` dans la configuration de la rotation de log pour vous assurer que l'Agent dispose d'un accès en lecture aux fichiers.

{{% /tab %}}

{{% tab "Windows (cmd)" %}}
1. Lancez la commande `icacls` sur le dossier du log pour obtenir plus d'informations sur les autorisations du fichier :
   ```
   icacls path/to/logs/file /t
   ```
   L'option `/t` permet d'exécuter la commande de manière récursive sur les fichiers et les sous-dossiers.

   Dans l'exemple suivant, le répertoire `test` et ses enfants ne sont pas accessibles pour `ddagentuser` :

   ```powershell
   PS C:\Users\Administrator> icacls C:\test\ /t
   C:\test\ NT AUTHORITY\SYSTEM:(OI)(CI)(F)
          BUILTIN\Administrators:(OI)(CI)(F)
          CREATOR OWNER:(OI)(CI)(IO)(F)

   C:\test\file.log NT AUTHORITY\SYSTEM:(F)
          BUILTIN\Administrators:(F)

   C:\test\file2.log NT AUTHORITY\SYSTEM:(F)
          BUILTIN\Administrators:(F)
   ```

1. Utilisez la commande `icacls` pour accorder à `ddagentuser` les autorisations nécessaires (y compris les factures) :
   ```
   icacls "path\to\folder" /grant "ddagentuser:(OI)(CI)(RX)" /t
   ```

   Si l'application utilise la rotation des logs, les droits d'héritage `(OI)` et `(CI)` garantissent que tous les futurs fichiers de logs créés dans le répertoire héritent des autorisations du dossier parent.

1. Exécutez à nouveau `icacls` pour vérifier que `ddagentuser` dispose des autorisations correctes :
   ```powershell
   icacls path/to/logs/file /t
   ```

   Dans l'exemple suivant, `ddagentuser` figure dans les autorisations des fichiers :
   ```powershell
   PS C:\Users\Administrator> icacls C:\test\ /t
   C:\test\ EC2-ABCD\ddagentuser:(OI)(CI)(RX)
          NT AUTHORITY\SYSTEM:(OI)(CI)(F)
          BUILTIN\Administrators:(OI)(CI)(F)
          CREATOR OWNER:(OI)(CI)(IO)(F)

   C:\test\file.log NT AUTHORITY\SYSTEM:(F)
                  BUILTIN\Administrators:(F)
                  EC2-ABCD\ddagentuser:(RX)

   C:\test\file2.log NT AUTHORITY\SYSTEM:(F)
                  BUILTIN\Administrators:(F)
                  EC2-ABCD\ddagentuser:(RX)
   Successfully processed 3 files; Failed processing 0 files
   ```

1. Redémarrez les service de lʼAgent et vérifiez son état pour voir si le problème est résolu :

   ```powershell
   & "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" restart-service
   & "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" status
   ```

{{% /tab %}}

{{% tab "Windows (PowerShell)" %}}

1. Récupèrez les autorisations ACL pour le fichier :
   ```powershell
   PS C:\Users\Administrator> get-acl C:\app\logs | fl

   Path   : Microsoft.PowerShell.Core\FileSystem::C:\app\logs
   Owner  : BUILTIN\Administrators
   Group  : EC2-ABCD\None
   Access : NT AUTHORITY\SYSTEM Allow  FullControl
            BUILTIN\Administrators Allow  FullControl
   ...
   ```
   Dans cet exemple, le répertoire `application` n'est pas exécutable par lʼAgent.

1. Exécutez ce script PowerShell pour donner des privilèges de lecture et d'exécution à `ddagentuser` :
   ```powershell
   $acl = Get-Acl <path\to\logs\folder>
   $AccessRule = New-Object System.Security.AccessControl.FileSystemAccessRule("ddagentuser","ReadAndExecute","Allow")
   $acl.SetAccessRule($AccessRule)
   $acl | Set-Acl <path\to\logs\folder>
   ```

1. Récupérez à nouveau les autorisations ACL du fichier pour vérifier si `ddagentuser` possède les bonnes autorisations :
   ```powershell
   PS C:\Users\Administrator> get-acl C:\app\logs | fl
   Path   : Microsoft.PowerShell.Core\FileSystem::C:\app\logs
   Owner  : BUILTIN\Administrators
   Group  : EC2-ABCD\None
   Access : EC2-ABCD\ddagentuser Allow  ReadAndExecute, Synchronize
            NT AUTHORITY\SYSTEM Allow  FullControl
            BUILTIN\Administrators Allow  FullControl
   ...
   ```

1. Redémarrez les service de lʼAgent et vérifiez son état pour voir si le problème est résolu :
   ```powershell
   & "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" restart-service
   & "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" status
   ```


{{% /tab %}}

{{< /tabs >}}

## Problème d'autorisation et Journald

Lorsque vous recueillez des logs à partir de Journald, assurez-vous que l'utilisateur de l'Agent Datadog est ajouté au groupe systemd en suivant les instructions de l'[intégration Journald][7].

Remarque : Journald envoie une charge utile vide si les autorisations du fichier sont incorrectes. Il n'est donc pas possible de générer ou d'envoyer un message d'erreur explicite dans ce cas.

## Problèmes de configuration

Nous vous conseillons de vérifier plusieurs fois les problèmes de configuration les plus courants dans l'implémentation de votre `datadog-agent` :

1. Vérifiez si la clé d'API `api_key` est définie dans `datadog.yaml`.

2. Vérifiez que votre `datadog.yaml` contient la ligne `logs_enabled: true`

3. Par défaut, l'Agent ne recueille aucun log. Vérifiez qu'au moins un fichier .yaml du répertoire `conf.d/` de l'Agent inclut une section logs et les valeurs adéquates.

4. Des erreurs peuvent se produire durant le parsing de vos fichiers de configuration .yaml. Le format YAML étant relativement rigide, utilisez un [validateur YAML][8] en cas de doute.

### Rechercher des erreurs dans les logs de l'Agent

Les logs peuvent contenir une erreur capable d'expliquer le problème. Pour rechercher des erreurs, exécutez la commande suivante :

```shell
sudo grep -i error /var/log/datadog/agent.log
```

## Environnement Docker

Consulter le [guide de dépannage pour la collecte de logs Docker][9]

## Environnement sans serveur

Consulter le [guide de dépannage pour la collecte de logs Lambda][10]

## Filtrage inattendu de logs

Vérifiez si les logs apparaîssent dans le [Live Tail de Datadog][11].

S'ils apparaissent dans le Live Tail, recherchez dans la page de configuration des index la présence dʼun [filtre d'exclusion][12] qui pourrait correspondre à vos logs.
S'ils n'apparaissent pas dans le Live Tail, il se peut qu'ils aient été abandonnés si leur timestamp remonte à plus de 18 heures. Vous pouvez vérifier quels sont les `service` et `source` susceptibles d'être affectés par la métrique `datadog.estimated_usage.logs.drop_count`.

## Logs tronqués

Les logs dont la taille dépasse 1 Mo sont tronqués. Vous pouvez vérifier le `service` et la `source` concernés grâce aux métriques `datadog.estimated_usage.logs.truncated_count` et `datadog.estimated_usage.logs.truncated_bytes`.


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/
[2]: /fr/help/
[3]: /fr/agent/configuration/agent-commands/#restart-the-agent
[4]: /fr/agent/logs/log_transport?tab=https#enforce-a-specific-transport
[5]: /fr/agent/configuration/agent-commands/#agent-status-and-information
[7]: /fr/integrations/journald/
[8]: https://codebeautify.org/yaml-validator
[9]: /fr/logs/guide/docker-logs-collection-troubleshooting-guide/
[10]: /fr/logs/guide/lambda-logs-collection-troubleshooting-guide/
[11]: https://app.datadoghq.com/logs/livetail
[12]: /fr/logs/indexes/#exclusion-filters