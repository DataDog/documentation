import com.datadog.api.v1.client.api.MonitorsApi;

public class MonitorsApiExample {

    public static void main(String[] args) {
        MonitorsApi apiInstance = new MonitorsApi();
        String groupStates = groupStates_example; // String | When specified, shows additional information about the group states.
Choose one or more from `all`, `alert`, `warn`, and `no data`.
        String name = name_example; // String | A string to filter monitors by name.
        String tags = tags_example; // String | A comma separated list indicating what tags, if any, should be used to filter the list of monitorsby scope.
For example, `host:host0`.
        String monitorTags = monitorTags_example; // String | A comma separated list indicating what service and/or custom tags, if any, should be used to filter the list of monitors.
Tags created in the Datadog UI automatically have the service key prepended. For example, `service:my-app`.
        Boolean withDowntimes = true; // Boolean | If this argument is set to true, then the returned data includes all current downtimes for each monitor.
        try {
            array[Monitor] result = apiInstance.getAllMonitors(groupStates, name, tags, monitorTags, withDowntimes);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling MonitorsApi#getAllMonitors");
            e.printStackTrace();
        }
    }
}