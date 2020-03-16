import com.datadog.api.v2.client.api.EventsApi;

public class EventsApiExample {

    public static void main(String[] args) {
        EventsApi apiInstance = new EventsApi();
        Long start = 789; // Long | POSIX timestamp.
        Long end = 789; // Long | POSIX timestamp.
        EventPriority priority = ; // EventPriority | Priority of your events: **low** or **normal**.
        String sources = sources_example; // String | A comma separated string of sources.
        String tags = tags_example; // String | A comma separated list indicating what tags, if any, should be used to filter the list of monitorsby scope, e.g. host:host0.
        Boolean unaggregated = true; // Boolean | Set unaggregated to `true` to return all events within the specified [`start`,`end`] timeframe. Otherwise if an event is aggregated to a parent event with a timestamp outside of the timeframe, it won't be available in the output.
        try {
            EventListResponse result = apiInstance.listEvents(start, end, priority, sources, tags, unaggregated);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling EventsApi#listEvents");
            e.printStackTrace();
        }
    }
}