Use this processor to remap logs to Open Cybersecurity Schema Framework (OCSF) events. OCSF schema event classes are set for a specific log source and type. You can add multiple mappings to one processor. **Note**: Datadog recommends that the OCSF processor be the last processor in your pipeline, so that remapping is done after the logs have been processed by all the other processors.

To set up this processor:

Click **Manage mappings**. This opens a modal:

- If you have already added mappings, click on a mapping in the list to edit or delete it. You can use the search bar to find a mapping by its name. Click **Add Mapping** if you want to add another mapping. Select **Library Mapping** or **Custom Mapping** and click **Continue**.
- If you have not added any mappings yet, select **Library Mapping** or **Custom Mapping**. Click **Continue**.