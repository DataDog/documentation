---
title: CoScreen Optimization and Troubleshooting
is_beta: false
---

### Why does the audio quality degrade when using the microphone of my Bluetooth headset as input in CoScreen, Zoom, and other tools?

If you're using a Bluetooth headset, the playback quality may degrade when your headset's microphone is selected as an audio input device. You may notice this if you play audio (for example, play a YouTube video) while you are in a CoScreen session. This can occur because your Bluetooth headset has switched to using a different Bluetooth profile.

When only playing audio, Bluetooth headsets typically use the [A2DP profile][2], which is optimized for high audio quality but does not support using the microphone. If you choose your headset microphone as audio input (for example, during a CoScreen session or Zoom meeting) the headset switches to a different profile, usually [HFP][3] or [HSP][4], which supports microphone usage but has lower sound quality. Most Bluetooth headsets can use only one profile at a time.

To avoid this issue, you can use a different audio input—such as a laptop's built-in microphone. You may need to restart your application to regain high  quality audio.

### How can I optimize my screen sharing quality and remote control latency?

You can influence a few key factors behind the quality of the windows you and your peers share.

#### Network bandwidth and stability

* Make sure every participant has a fast and stable internet connection with at least 5Mbps upload and download.
* Make sure your system does not have a packet loss of more than 2 percent. Video conferencing becomes unstable above that threshold, regardless of provider. Run a [packet loss test][1]. If you see issues, try restarting your router or modem, move closer to your router, or test with an alternative internet connection.
* CoScreen works fastest if only two participants can connect peer-to-peer (that is, directly, without having a corporate proxy or firewall between them). As soon as there are three or more participants, or a direct connection cannot be established, the traffic is routed through a globally distributed video infrastructure, ensuring connectivity in all circumstances.

#### Screen resolution
CoScreen supports high-resolution screen sharing, even if you and your peers have ultra-high display resolutions of 4k or above. Ensure that your network bandwidth and CPU can handle the corresponding load. If there are issues, try lower resolutions on both ends.

#### CPU
Sharing windows can take up to 60 percent of one CPU core on older systems because CoScreen captures them at a much higher quality than many other tools. Check your CPU allocation.

### Firewalls and SSL
If your organization uses a corporate firewall or SSL inspection, the CoScreen client might not be able to connect to the CoScreen server and would therefore be unable to establish a connection between you and your team members. Contact support for a list of URLs to allowlist.

### Troubleshooting on macOS

#### The side panel UI is grayed out, and a connection is never established

You may encounter a problem where the UI is stuck in the grayed out joining phase, but you never receive the "Unable to connect to CoScreen" dialog. Because CoScreen expects to live on a single non-fixed desktop. This problem may occur if you have configured the application to reside specifically on more than one desktop.

To resolve this issue:

1. Right-click on the CoScreen application icon and go to _Options_.
2. Ensure that _Assign To_ is set to _None_.
3. Exist _Options_ and rejoin the CoScreen.

{{< img src="coscreen/assign-to-none.png" alt="Screenshot of macOS dock. Right-clicking on the CoScreen brings up a menu, and hovering over 'Options' opens up a second menu. Under 'Assign To', the user has selected 'None.'" style="width:60%;" >}}

### Troubleshooting on Windows

#### How does CoScreen work with Windows administrator mode?

If you run CoScreen in administrator mode and share an app that was also launched in administrator mode, all remote users are able to control the shared window. However, if you are running CoScreen in non-administrator mode and share an app that was launched in admin mode, then remote users cannot control that window.

#### The CoScreen UI appears small

If the CoScreen UI appears to be smaller than other apps on your Windows computer, it is related to the scaling factor configured under display settings and how it interacts with CoScreen. You can decrease the scaling and resolution of your screen to improve the experience.

#### My voice is hard to understand, or sounds robotic

Some devices use a Realtek voice recognition feature that may cause your voice to sound robotic when using CoScreen. If you are experiencing issues with the audibility of your voice, open the Realtek Audio Console and untick the option **Voice Recognition** to see if the situation improves.

{{< img src="coscreen/windows_screenshot.png" alt="Screenshot of Windows dialog for Realtek Audio Console. The 'Voice Recognition' toggle is set to off." style="width:70%;" >}}

[1]: https://packetlosstest.com/
[2]: https://www.bluetooth.com/specifications/specs/advanced-audio-distribution-profile-1-4/
[3]: https://www.bluetooth.com/specifications/specs/hands-free-profile/
[4]: https://www.bluetooth.com/specifications/specs/headset-profile-1-2/