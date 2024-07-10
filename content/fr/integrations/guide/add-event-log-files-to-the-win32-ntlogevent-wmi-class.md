---
aliases:
- /fr/integrations/faq/comment-ajouter-des-fichiers-de-logs-d-evenements-a-la-classe-wmi-win32-ntlogevent

title: Ajouter des fichiers de logs d'événements à la classe WMI Win32_NTLogEvent
---

Tous les logs dʼévénement ne sont pas dans la classe WMI Win32_NTLogEvent. Comme lʼintégration Event Viewer ne peut récupérer que les événements de cette classe, modifiez le registre Windows pour ajouter des logs dʼévénements qui se trouvent en dehors du contexte de cette classe.

La première étape consiste à vérifier si le logfile est accessible via Win32_NTLogEvent à l'aide de la requête WMI suivante dans Powershell. (Il s'agit de la même requête que celle exécutée par lʼAgent pour collecter ces événements).

```text
$ Get-WmiObject -Query "Select EventCode,SourceName,TimeGenerated,Type,InsertionStrings,Message,Logfile from Win32_NTLogEvent WHERE ( LogFile = '<LogFileName>' )" | select -First 1
```

S'il n'y a pas de résultat, le fichier de log n'est pas accessible et vous devez l'ajouter par le biais du registre Windows.

Localisez les logs dʼévénement que vous voulez surveiller dans lʼEvent Viewer. Localisez le fichier de log et cliquez sur "properties" dans la section "Actions" pour trouver le chemin d'accès et le nom complet du log. Par exemple, voici comment configurer la surveillance du fichier de log "Operational" situé dans le dossier Microsoft/Windows/TaskScheduler :
{{< img src="integrations/guide/windows_event_logs_with_wmi/event_viewer_1.png" alt="Le visualiseur dʼévénements Windows affichant un fichier sélectionné nommé Fichier et lʼoption permettant de modifier la chaîne. Le champ Value data: est mis en évidence et affiche le chemin du log" >}}

Ouvrez le registre Windows. (Recherchez regedit.exe, le nom par défaut de lʼéditeur de registre). Dans l'éditeur de registre, localisez le dossier EventLog dans le chemin suivant :

```text
\HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\EventLog\
```

Créez une nouvelle clé avec le nom du log dʼévénement que vous voulez surveiller. Utilisez la syntaxe chemin-vers-le-dossier/NomDeFichierDeLog (comme dans le nom complet trouvé dans lʼEvent Viewer).
{{< img src="integrations/guide/windows_event_logs_with_wmi/event_viewer_2.png" alt="Le dossier EventLog développé et sur lequel lʼutilisateur effectue un clic droit pour afficher son sous-menu. New est sélectionné dans le sous-menu et cela ouvre un nouveau sous-menu. Key est mis en évidence avec une zone rouge." >}}

{{< img src="integrations/guide/windows_event_logs_with_wmi/event_viewer_3.png" alt="Le dossier EventLog développé pour afficher Microsoft-Windows-TaskScheduler/Operational, mis en évidence avec une zone rouge" >}}

Après avoir créé la clé, ajoutez-y trois valeurs. Tout d'abord, ajoutez le chemin d'accès au fichier de log sous la forme d'une valeur de chaîne (REG_SZ) nommée "File" :
{{< img src="integrations/guide/windows_event_logs_with_wmi/event_viewer_4.png" alt="Le visualiseur dʼévénements Windows affichant un fichier sélectionné nommé file et lʼoption permettant de modifier la chaîne. Le champ Value data: est mis en évidence et affiche le chemin du log" >}}

Ajoutez ensuite le nom complet du fichier de log en tant que valeur de chaîne (REG_SZ) nommée "Primary Module" :
{{< img src="integrations/guide/windows_event_logs_with_wmi/event_viewer_5.png" alt="Le visualiseur dʼévénements Windows affichant un fichier sélectionné nommé Primary Module et lʼoption permettant de modifier la chaîne. Le champ Value data: est mis en évidence et affiche le nom complet" >}}

Enfin, ajoutez le chemin d'accès au DLL Windows Event Log Api (wevtapi.dll), qui doit se trouver à l'adresse `%SystemRoot%\system32\wevtapi.dll` en tant que valeur de chaîne extensible avec le nom "DisplayNameFile" :
{{< img src="integrations/guide/windows_event_logs_with_wmi/event_viewer_6.png" alt="Le visualiseur dʼévénements Windows affichant un fichier sélectionné nommé DisplayNameFile et lʼoption permettant de modifier la chaîne. Le champ Value data: est mis en évidence" >}}

Les changements devraient être immédiats. Pour confirmer que le log dʼévénement est accessible via la classe WMI Win32_NTLogEvent, reformulez la requête ci-dessus. Vous pouvez alors reprendre l'ajout dʼévénements au fichier de configuration de lʼintégration Event Viewer.

Remarque : s'il n'y a toujours pas dʼévénements lors de l'exécution de la requête, vérifiez le visualiseur dʼévénements pour confirmer qu'il y a des événements dans le fichier de log. Assurez-vous également que le log dʼévénement  n'est pas désactivé et que des événements récents sont disponibles.
{{< img src="integrations/guide/windows_event_logs_with_wmi/event_viewer_7.png" alt="Le visualiseur dʼévénements de Windows affichant la liste des actions sur la droite. Lʼaction dʼactivation de log est mise en évidence avec une note pour activer le log à cet endroit" >}}