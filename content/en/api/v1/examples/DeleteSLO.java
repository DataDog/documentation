import com.datadog.api.v1.client.api.SLOApi;

public class SLOApiExample {

    public static void main(String[] args) {
        SLOApi apiInstance = new SLOApi();
        String sloId = sloId_example; // String | The id of the service level objective
        try {
            ServiceLevelObjectiveDeleted result = apiInstance.deleteSLO(sloId);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling SLOApi#deleteSLO");
            e.printStackTrace();
        }
    }
}