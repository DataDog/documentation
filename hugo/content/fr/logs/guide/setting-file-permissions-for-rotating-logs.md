---
aliases:
- /fr/logs/faq/setting-file-permissions-for-rotating-logs
further_reading:
- link: /logs/guide/log-parsing-best-practice/
  tag: FAQ
  text: 'Parsing de log : bonnes pratiques à adopter'
- link: /logs/log_configuration/processors
  tag: Documentation
  text: Apprendre à traiter vos logs
- link: /logs/log_configuration/parsing
  tag: Documentation
  text: En savoir plus sur le parsing

title: Définir les autorisations de fichier pour la rotation des logs (Linux)
---

L'Agent Datadog s'exécute avec l'utilisateur `dd-agent` et le groupe `dd-agent`. Cela l'empêche d'accéder aux logs dans `/var/log`, car ils sont uniquement accessibles par l'utilisateur root (ou un sudo administrateur).

## Définir des autorisations avec des ACL

Afin d'autoriser l'accès en lecture seule pour `datadog-agent` uniquement, [créez des listes de contrôle d'accès (ACL) et modifiez logrotate pour configurer de façon définitive les modifications d'autorisation][1].

### Vérifier que les ACL sont activées sur votre système

[Les ACL doivent être activées][2] sur votre système de fichiers pour pouvoir définir les autorisations avec les méthodes présentées dans cet article. Vérifiez que les ACL sont activées avec les commandes `getfacl` et `setfacl`, afin de définir les autorisations de l'utilisateur `datadog-agent` sur un répertoire test, par exemple :

```shell
mkdir /var/log/test-dir
getfacl /var/log/test-dir/
setfacl -m u:dd-agent:rx /var/log/test-dir
getfacl /var/log/test-dir/
```

Les autorisations définies pour `datadog-agent` apparaissent dans le résultat de la commande getfacl si les ACL sont activées.

{{< img src="logs/faq/setting_file_permission.png" alt="Définition des autorisations de fichier" >}}

### Accorder des autorisations de lecture et d'exécution à dd-agent sur les répertoires de log

Une fois que vous avez vérifié que les ACL sont activées, accordez les autorisations de lecture et d'exécution à l'utilisateur `datadog-agent` sur les répertoires appropriés afin de recueillir des logs. Par exemple, pour accorder l'accès à `/var/log/apache`, exécutez :

```shell
setfacl -m u:dd-agent:rx /var/log/apache
```

[En savoir plus sur la configuration des ACL sur Linux][3]

### Définir des autorisations pour la rotation des fichiers de log

Il ne suffit pas de [définir des autorisations][4] une fois pour qu'elles soient appliquées de façon définitive. En effet, le réglage de l'ACL n'est appliqué qu'une seule fois par logrotate. Pour appliquer une solution permanente, ajoutez une règle à logrotate afin de réinitialiser l'ACL dans un nouveau fichier :

```shell
sudo touch /etc/logrotate.d/dd-agent_ACLs
```

Exemple de fichier :

```text
/var/log/apache/*.log {
 postrotate
 /usr/bin/setfacl -m g:dd-agent:rx /var/log/apache/access.log
 /usr/bin/setfacl -m g:dd-agent:rx /var/log/apache/error.log
 endscript
}
```

Vérifiez le statut ACL d'un fichier avec :

```text
getfacl /var/log/apache/access.log
```

**Remarque** : si vous utilisez **PostgreSQL v10** ou une version antérieure, définissez les autorisations sur **0700**. À partir de **PostgreSQL v11**, vous pouvez les définir sur **0700** ou **0750**. Si vous essayez de démarrer un serveur alors que les autorisations de son répertoire de base ne sont pas définies sur 0700 ou 750, le processus postmaster échouera.

**Remarque** : le répertoire de logging de PostgreSQL ne peut pas figurer dans le même répertoire que l'installation PostgreSQL de base.

## Définir des autorisations en l'absence d'ACL

En l'absence d'ACL dans un système, définissez vos autorisations en fonction des droits d'accès des groupes.

Par exemple, si votre service MySQL rédige des données aux emplacements suivants :

```text
/var/log/mysql/mysql_error.log
/var/log/mysql/mysql-slow.log
```

Leurs autorisations sont associées par défaut à l'utilisateur « mysql » et au groupe « mysql ». Ce schéma de journalisation empêche l'accès au fichier de log à n'importe quel utilisateur ne faisant pas partie du groupe « mysql ». Voici un exemple de message pouvant s'afficher.

```text
$ ls -l /var/log | grep -i mysql
drwxr-x--- 2 mysql mysql 4096 Feb 20 06:25 mysql
```

Ici, la solution la plus simple consiste à autoriser à tous les utilisateurs l'accès au fichier de la configuration logrotate :

```text
/var/log/mysql/mysql_error.log /var/log/mysql/mysql-slow.log {

        daily
        rotate 7
        missingok
        create 644 mysql adm
        compress
}
```

Toutes les applications tierces courantes possèdent une nomenclature semblable. Ainsi, vous évitez d'accorder un accès privilégié à un compte individuel et suivez une bonne pratique, ce qui facilite le contrôle de vos règles d'audit.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://help.ubuntu.com/community/FilePermissionsACLs
[2]: https://www.tecmint.com/secure-files-using-acls-in-linux
[3]: http://xmodulo.com/configure-access-control-lists-acls-linux.html
[4]: http://bencane.com/2012/05/27/acl-using-access-control-lists-on-linux