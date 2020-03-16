import com.datadog.api.v2.client.api.SLOApi;

public class SLOApiExample {

    public static void main(String[] args) {
        SLOApi apiInstance = new SLOApi();
        String ids = ids_example; // String | A comma separated list of the IDs of the service level objectives objects (e.g. "id1,id2,id3").
        try {
            CheckCanDeleteServiceLevelObjectiveResponse result = apiInstance.checkCanDeleteSLO(ids);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling SLOApi#checkCanDeleteSLO");
            e.printStackTrace();
        }
    }
}