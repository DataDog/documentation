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
        Long idOffset = 789; // Long | TODO.
        Long page = 789; // Long | The page to start paginating from. If this argument is not specified, the request returns all monitors without pagination.
        Integer pageSize = 56; // Integer | The number of monitors to return per page. If the page argument is not specified, the default behavior returns all monitors without a `page_size` limit. However, if page is specified and `page_size` is not, the argument defaults to 100.
        try {
            array[Monitor] result = apiInstance.listMonitors(groupStates, name, tags, monitorTags, withDowntimes, idOffset, page, pageSize);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling MonitorsApi#listMonitors");
            e.printStackTrace();
        }
    }
}