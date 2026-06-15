---
app_id: wlan
app_uuid: dbf0f387-cef7-4694-9001-b7bb5c1c1274
assets:
  dashboards:
    Wi-Fi Overview: assets/dashboards/wlan_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: system.wlan.rssi
      metadata_path: metadata.csv
      prefix: system.wlan.
    source_type_id: 45933791
    source_type_name: wlan
  monitors:
    Many channel swap events detected: assets/monitors/wlan_excessive_channel_swap.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- windows
- métricas
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/wlan/README.md
display_on_public_website: true
draft: false
git_integration_title: wlan
integration_id: wlan
integration_title: wlan (Wi-Fi)
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: wlan
public_title: wlan (Wi-Fi)
short_description: Monitoriza métricas de Wi-Fi como la intensidad de la señal, el
  estado de la conexión y más.
supported_os:
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Windows
  - Category::Metrics
  - Submitted Data Type::Metrics
  - Offering::Integration
  configuration: README.md#Configuración
  description: Monitoriza métricas de Wi-Fi como la intensidad de la señal, el estado
    de la conexión y más.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: wlan (Wi-Fi)
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

Este check monitoriza redes LAN (WLAN) inalámbricas basadas en estándares [IEEE 802.11][1], comúnmente denominadas Wi-Fi.

Recopila métricas Wi-Fi clave, incluyendo la información sobre puntos de acceso (AP) como [SSID][2]#SSID) y [BSSID][2]) (como etiquetas), telemetría de calidad de señal como [RSSI][3] y [Ruido][4]_y_Fuerza_de_señal_inalámbrica), velocidad de transmisión y recuento de transiciones ([Roaming][5] e [Swapping][6] entre AP, por ejemplo). Estas métricas ayudan a identificar proactivamente problemas generales de la red inalámbrica, como puntos de acceso sobrecargados, así como a solucionar problemas retrospectivos de bajo rendimiento de la red en hosts individuales.

## Configuración

### Requisito previo

#### Windows

A partir de Windows 11 24H2 (Otoño 2024), de acuerdo con [Cambios en el comportamiento de la API para el acceso y la localización Wi-Fi][7], el check WLAN (que utiliza las API Wlan de Windows), requiere el consentimiento del usuario o del administrador. Si `Settings > Privacy & security > Location` del host no ha sido habilitado, este check WLAN fallará a la hora de informar de la telemetría WLAN/Wi-Fi.

Es necesario activar los siguientes parámetros:
- **Settings > Privacy & Security > Location > Location Services** (Configuración > Privacidad y seguridad > Localización > Servicios de localización)
- **Settings > Privacy & security > Location > Let desktop apps access your location** (Configuración > Privacidad y seguridad > Localización > Permitir que las aplicaciones de escritorio accedan a tu localización)

Puedes comprobar si la API de localización no está desactivada ejecutando el comando `netsh wlan show interface`, que no informará de ninguna conexión de interfaz Wi-Fi aunque tengas conexión.

Un administrador también puede habilitar estos parámetros mediante:
- [Registro][8]
- [Política de grupo][8]
- [InTune][8]


#### macOS

Al igual que en Windows, la recopilación de telemetría Wi-Fi en macOS requiere el consentimiento del usuario a través de los servicios de localización. Sin embargo, a diferencia de Windows, macOS no proporciona un mecanismo bien definido para que los administradores habiliten el acceso a la localización a procesos específicos como el Datadog Agent a escala.

Para solucionar este problema, los clientes pueden adaptar el script `add_datadog_agent_to_plist.sh` proporcionado en el **Apéndice** para conceder acceso de localización al proceso del Agent. Esta secuencia de comandos requiere acceso **root** y se puede desplegar en una flota de Mac de empresa mediante una solución MDM como Jamf.

### Instalación

El check WLAN está incluido en el [Datadog Agent][9], pero no está configurado. Consulta la siguiente sección para configurarlo.

### Configuración

La configuración se encuentra en el archivo `wlan.d/conf.yaml` en la carpeta `conf.d/` en la raíz del [directorio de configuración de tu Agent][10]. Consulta el [ejemplo wlan.d/conf.yaml][11] para ver todas las opciones de configuración disponibles. Cuando termines de editar el archivo de configuración, [reinicia el Agent][12] para cargar la nueva configuración.

#### Etiquetas

El check etiqueta automáticamente las métricas emitidas con SSID, BSSID, dirección MAC, tipo de Wi-Fi (A, B, G, N, AC), autenticación Wi-Fi (Open, WEP, WPA, WPA2, WPA3). Como se indica en [Empezando con las etiquetas][13] los caracteres en mayúsculas en los valores de las etiquetas se sustituyen por caracteres en minúsculas y los caracteres especiales se sustituyen por guiones bajos.

### Validación

[Ejecuta el subcomando de estado del Agent][14] y busca `wlan` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "wlan" >}}


### Eventos

WLAN no incluye eventos.

## Terminología

### Roaming

`Roaming` se refiere a la capacidad de un dispositivo de cambiar sin interrupciones de un punto de acceso a Wi-Fi a otro mientras se desplaza, sin perder la conexión. Esto ocurre cuando el dispositivo encuentra una señal más potente o fiable en un punto de acceso diferente, lo que garantiza un acceso continuo a Internet. Un evento `Roaming` se detecta cuando el *BSSID* del router o punto de acceso conectado cambia, pero su *SSID* sigue siendo el mismo.  Cuando el *SSID* del router o punto de acceso no se emite, la detección de roaming no es posible. Cuando se detecta un evento `Roaming`, la métrica `system.wlan.roaming_events` se incrementa. El cambio a un router con un *SSID* diferente no se considera `Roaming`.

### Channel Swap

`Channel Swap` se refiere al proceso de cambiar el canal Wi-Fi que un router o punto de acceso utiliza para emitir su señal. Este cambio intenta mejorar la intensidad de la señal, reducir las interferencias u optimizar el rendimiento, especialmente en zonas con muchas redes Wi-Fi en competencia. El evento `Channel Swap` se detecta cuando el *BSSID* del router o punto de acceso conectado es el mismo, pero su canal ha cambiado. Cuando el *BSSID* del router o punto de acceso conectado cambia (lo que lo convierte en un evento `Roaming` si el router o punto de acceso tiene el mismo *SSID*), no se considera un evento `Channel Swap` aunque el canal haya cambiado.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][16].

## Anexo

**add_datadog_agent_to_plist.sh**

``script de shell
#!/usr/bin/env bash
# Script para añadir/actualizar la clave autorizada en `locationd/clients.plist` para el Datadog Agent (requiere acceso root)
# Usage: bash add_datadaog_agent_to_plist.sh [AGENT_BIN_PATH]
# AGENT_BIN_PATH: optional - the agent binary path - default: /opt/datadog-agent/bin/agent/agent

# Configuración
PLIST_PATH="/var/db/locationd/clients.plist"
DEFAULT_PATTERN="/opt/datadog-agent/bin/agent/agent"
BACKUP_PATH="${PLIST_PATH}.bak"

# Función para restaurar la copia de seguridad si algo va mal
restore_backup() {
  echo "[ERROR] Restoring backup..."
  sudo cp "$BACKUP_PATH" "$PLIST_PATH"
  sudo plutil -convert binary1 "$PLIST_PATH"
  echo "[INFO] Backup restored. Exiting."
  exit 1
}

# Configurar la gestión de errores
trap restore_backup ERR

# Comprobar si se ha proporcionado un argumento
if [ -n "$1" ]; then
  PATTERN="$1"
  echo "[INFO] Using provided pattern via CLI argument: $PATTERN"
else
  # Mensaje para que el patrón busque
  read -p "Enter the pattern to search for [${DEFAULT_PATTERN}]: " PATTERN
  PATTERN=${PATTERN:-$DEFAULT_PATTERN}
fi

# Hacer copia de seguridad del archivo original
echo "[INFO] Backing up $PLIST_PATH to $BACKUP_PATH"
sudo cp "$PLIST_PATH" "$BACKUP_PATH"

# Convertir plist a XML para facilitar el análisis
sudo plutil -convert xml1 "$PLIST_PATH"

echo "[INFO] Searching for entry containing: $PATTERN"

# Buscar la primera clave cuyo bloque contenga el patrón, xargs elimina los espacios en blanco iniciales y finales
KEY_LINE=$(grep "$PATTERN" "$PLIST_PATH" | grep "<key>" | head -n1 | xargs)
if [ -z "$KEY_LINE" ]; then
  echo "[ERROR] No entry found containing pattern: $PATTERN"
  restore_backup
fi

# Extraer la clave de la línea
KEY=${KEY_LINE#<key>}
KEY=${KEY%</key>}

if [ -z "$KEY" ]; then
  echo "[ERROR] Could not determine the key for the matching entry."
  restore_backup
fi

echo "[INFO] Processing key: $KEY"

# Obtener el número de línea que contenga <key>$KEY</key>
key_line=$(grep -n "<key>$KEY</key>" "$PLIST_PATH" | cut -d: -f1 | head -n1)
if [ -z "$key_line" ]; then
  echo "[ERROR] Key not found."
  restore_backup
fi

# Obtener el número de línea de <dict> después de la clave
dict_start=$(tail -n +$((key_line + 1)) "$PLIST_PATH" | grep -n "<dict>" | head -n1 | cut -d: -f1)
dict_start=$((key_line + dict_start))

# Obtener el número de línea de </dict> coincidente
dict_end=$(tail -n +$((dict_start + 1)) "$PLIST_PATH" | grep -n "</dict>" | head -n1 | cut -d: -f1)
dict_end=$((dict_start + dict_end))

echo "[INFO] Found block from line $dict_start to $dict_end"

# Comprobar si <key>Autorizado</key> existe en el bloque
auth_line=$(sed -n "${dict_start},${dict_end}p" "$PLIST_PATH" | grep -n "<key>Authorized</key>" | cut -d: -f1)

if [ -z "$auth_line" ]; then
  # <key>Autorizado</key> no encontrado, añadirlo antes de </dict>
  echo "[INFO] Adding <key>Authorized</key><true/> to the block"
  sed -i "" "${dict_end}i\\
        <key>Authorized</key>\\
        <true/>\\
" "$PLIST_PATH"
else
  # <key>Autorizado</key> encontrado, buscar su valor en la línea siguiente
  auth_line=$((dict_start + auth_line - 1))
  value_line=$((auth_line + 1))

  # Comprobar si la siguiente línea contiene <false/>
  if grep -q "<false/>" <(sed -n "${value_line}p" "$PLIST_PATH"); then
    echo "[INFO] Changing <false/> to <true/>"
    sed -i "" "${value_line}s/<false\/>/<true\/>/" "$PLIST_PATH"
  else
    echo "[INFO] <key>Authorized</key> already exists with correct value"
  fi
fi

# Volver a convertir plist a binario para uso del sistema
sudo plutil -convert binary1 "$PLIST_PATH"
echo "[INFO] Changes applied successfully."
echo "[INFO] To apply changes, either reboot or run: sudo killall locationd"
trap - ERR
```

[1]: https://en.wikipedia.org/wiki/IEEE_802.11
[2]: https://en.wikipedia.org/wiki/Service_set_(802.11_network
[3]: https://en.wikipedia.org/wiki/Received_signal_strength_indicator
[4]: https://documentation.meraki.com/MR/Wi-Fi_Basics_and_Best_Practices/Signal-to-Noise_Ratio_(SNR
[5]: https://www.netally.com/tech-tips/what-is-wifi-roaming/
[6]: https://superuser.com/questions/122441/how-can-i-get-the-same-ssid-for-multiple-access-points
[7]: https://learn.microsoft.com/en-us/windows/win32/nativewifi/wi-fi-access-location-changes
[8]: https://learn.microsoft.com/en-us/troubleshoot/windows-client/shell-experience/cannot-set-timezone-automatically?WT.mc_id=WDIT-MVP-5000497#use-registry-editor
[9]: https://app.datadoghq.com/account/settings/agent/latest
[10]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/
[11]: https://github.com/DataDog/datadog-agent/blob/main/poc/cmd/agent/dist/conf.d/wlan.d/conf.yaml.example
[12]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[13]: https://docs.datadoghq.com/es/getting_started/tagging/
[14]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[15]: https://github.com/DataDog/integrations-core/blob/master/wlan/metadata.csv
[16]: https://docs.datadoghq.com/es/help/