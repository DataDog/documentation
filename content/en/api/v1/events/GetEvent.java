import com.datadog.api.v1.client.api.EventsApi;

public class EventsApiExample {

    public static void main(String[] args) {
        EventsApi apiInstance = new EventsApi();
        Long eventId = 789; // Long | The id of the event.
        try {
            EventResponse result = apiInstance.getEvent(eventId);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling EventsApi#getEvent");
            e.printStackTrace();
        }
    }
}